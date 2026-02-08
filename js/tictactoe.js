// TIC TAC TOE
function loadTicTacToe(container) {
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    container.innerHTML = '<div style="text-align:center"><div id="tttStatus" style="font-size:24px;margin-bottom:20px">Player X Turn</div><div id="tttBoard" style="display:grid;grid-template-columns:repeat(3,90px);gap:8px;justify-content:center;margin-bottom:20px"></div><button onclick="resetTTT()" style="padding:10px 30px;background:#00ff88;border:none;border-radius:20px;font-weight:bold;cursor:pointer;color:#0a0e27">Reset</button></div>';

    const boardEl = document.getElementById('tttBoard');
    for(let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.style.cssText = 'width:90px;height:90px;background:#1a1f3a;border:2px solid #00ff88;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:40px;font-weight:bold';
        cell.dataset.index = i;
        cell.onclick = function() {
            const index = this.dataset.index;
            if(board[index] === '' && gameActive) {
                board[index] = currentPlayer;
                this.textContent = currentPlayer;
                this.style.color = currentPlayer === 'X' ? '#00ff88' : '#ff006e';
                
                if(checkWinner()) {
                    document.getElementById('tttStatus').textContent = 'Player ' + currentPlayer + ' Wins! 🎉';
                    gameActive = false;
                    confetti();
                } else if(board.every(cell => cell !== '')) {
                    document.getElementById('tttStatus').textContent = 'Draw! 🤝';
                    gameActive = false;
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    document.getElementById('tttStatus').textContent = 'Player ' + currentPlayer + ' Turn';
                }
            }
        };
        boardEl.appendChild(cell);
    }

    function checkWinner() {
        const patterns = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
        return patterns.some(p => board[p[0]] !== '' && board[p[0]] === board[p[1]] && board[p[1]] === board[p[2]]);
    }

    window.resetTTT = function() {
        currentPlayer = 'X';
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        document.querySelectorAll('#tttBoard div').forEach(c => c.textContent = '');
        document.getElementById('tttStatus').textContent = 'Player X Turn';
    };
}
