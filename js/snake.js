// SNAKE GAME
function loadSnakeGame(container) {
    container.innerHTML = '<div style="text-align:center"><div style="font-size:24px;font-weight:bold;margin-bottom:20px">Score: <span id="snakeScore">0</span></div><canvas id="snakeCanvas" width="400" height="400" style="border:3px solid #00ff88;border-radius:10px"></canvas><div style="margin-top:15px;color:#a0a8c5">Use Arrow Keys to Move</div></div>';
    
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    const box = 20;
    let snake = [{x: 10 * box, y: 10 * box}];
    let food = {x: Math.floor(Math.random() * 19 + 1) * box, y: Math.floor(Math.random() * 19 + 1) * box};
    let score = 0;
    let d;

    document.onkeydown = function(event) {
        if(event.keyCode == 37 && d != 'RIGHT') d = 'LEFT';
        else if(event.keyCode == 38 && d != 'DOWN') d = 'UP';
        else if(event.keyCode == 39 && d != 'LEFT') d = 'RIGHT';
        else if(event.keyCode == 40 && d != 'UP') d = 'DOWN';
    };

    function draw() {
        ctx.fillStyle = '#1a1f3a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for(let i = 0; i < snake.length; i++) {
            ctx.fillStyle = i == 0 ? '#00ff88' : '#00d4ff';
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }

        ctx.fillStyle = '#ff006e';
        ctx.fillRect(food.x, food.y, box, box);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if(d == 'LEFT') snakeX -= box;
        if(d == 'UP') snakeY -= box;
        if(d == 'RIGHT') snakeX += box;
        if(d == 'DOWN') snakeY += box;

        if(snakeX == food.x && snakeY == food.y) {
            score++;
            document.getElementById('snakeScore').textContent = score;
            food = {x: Math.floor(Math.random() * 19 + 1) * box, y: Math.floor(Math.random() * 19 + 1) * box};
        } else {
            snake.pop();
        }

        let newHead = {x: snakeX, y: snakeY};

        if(snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
            clearInterval(game);
            alert('Game Over! Score: ' + score);
            closeGame();
        }

        snake.unshift(newHead);
    }

    function collision(head, array) {
        for(let i = 0; i < array.length; i++) {
            if(head.x == array[i].x && head.y == array[i].y) return true;
        }
        return false;
    }

    let game = setInterval(draw, 100);
}
