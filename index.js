let canvas = document.getElementById('game'),
ctx = canvas.getContext('2d'),
ballRadius = 9,
x = canvas.width / (Math.floor(Math.random() * Math.random() * 10) + 3),
y = canvas.height - 40,
dx = 2,
dy = -2

let paddleHeight = 12,
paddleWidth = 72

//Начальное положение лопатки
let paddleX = (canvas.width - paddleWidth) / 2

//Bricks
let rowCount = 5,
columnCount = 9,
brickWidth = 54,
brickHeight = 18,
brickPadding = 12,
topOffset = 40,
leftOffset = 33,
score = 0

//Набор кирпичей
let bricks = []
for(let c = 0; c < columnCount; c++) {
    bricks[c] = []
    for(let r = 0; r < rowCount; r++) {
        bricks[c][r] = {x: 0, y: 0, status: 1}
    }
}

//Прослушиватель событий перемещения мыши и функция
document.addEventListener('mousemove', mouseMoveHandler, false)

//Перемещение лопатки с помощью мыши
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2
    }
}

//Рисование лопатки
function drawPaddle() {
    ctx.beginPath()
    ctx.roundRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight, 30)
    ctx.fillStyle = '#ccc'
    ctx.fill()
    ctx.closePath()
}

//Рисование мяча
function drawBall() {
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = '#ccc'
    ctx.fill()
    ctx.closePath()
}

//Рисование кирпичей
function drawBricks() {
    for(let c = 0; c < columnCount; c++){
        for(let r = 0; r < rowCount; r++){
            if(bricks[c][r].status === 1){
                let brickX = (c * (brickWidth + brickPadding)) + leftOffset
                let brickY = (r * (brickHeight + brickPadding)) + topOffset
                bricks[c][r].x = brickX
                bricks[c][r].y = brickY
                ctx.beginPath()
                ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 30)
                ctx.fillStyle = '#ccc'
                ctx.fill()
                ctx.closePath()
            }
        }
    }
}

//Оценка игры
function trackScore() {
    ctx.font = 'bold 16px sans-serif'
    ctx.fillStyle = '#ccc'
    ctx.fillText('Баллы : ' + score, 8, 24)
}

//Проверка попадания мяча в кирпичи
function hitDetection() {
    for(let c = 0; c < columnCount; c++){
        for(let r = 0; r < rowCount; r++){
            let b = bricks[c][r]
            if(b.status === 1){
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                    dy = -dy
                    b.status = 0
                    score++
                    if(score === rowCount * columnCount){
                        alert('Победа!')
                        document.location.reload()
                    }
                }
            }
        }
    }
}

//Основная функция
function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    trackScore()
    drawBricks()
    drawBall()
    drawPaddle()
    hitDetection()

    //Обнаружение левой и правой стен
    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
        dx = -dx
    }

    //Обнаружить верхнюю стену
    if(y + dy < ballRadius){
        dy = -dy
    } else if (y + dy > canvas.height - ballRadius){
        //Обнаружение удара лопаткой
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy
        } else {
            alert('Игра окончена!')
            document.location.reload()
        }
    }

    //Нижняя стенка
    if(y + dy > canvas.height - ballRadius || y + dy < ballRadius){
        dy = -dy
    }

    //Движение мяча
    x += dx
    y += dy

}

setInterval(init, 10)