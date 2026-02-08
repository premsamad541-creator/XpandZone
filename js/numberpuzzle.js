// NUMBER PUZZLE
function loadNumberPuzzle(container) {
    let tiles = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    let moves = 0;

    container.innerHTML = '<div style="text-align:center"><div style="font-size:22px;margin-bottom:20px">Moves: <span id="npMoves">0</span></div><div id="npGrid" style="display:grid;grid-template-columns:repeat(3,75px);gap:5px;background:#1a1f3a;padding:10px;border-radius:15px;width:fit-content;margin:0 auto 20px"></div><button onclick="shufflePuzzle()" style="padding:10px 30px;background:#00ff88;border:none;border-radius:20px;font-weight:bold;cursor:pointer;color:#0a0e27">Shuffle</button></div>';

    function render() {
        const grid = document.getElementById('npGrid');
        grid.innerHTML = '';
        tiles.forEach((num, index) => {
            const tile = document.createElement('div');
            tile.style.cssText = 'width:75px;height:75px;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:bold;cursor:pointer;border-radius:8px;transition:0.2s';
            if(num === 0) {
                tile.style.background = 'transparent';
                tile.style.cursor = 'default';
            } else {
                tile.style.background = '#00ff88';
                tile.style.color = '#0a0e27';
                tile.textContent = num;
                tile.onmouseover = function() { if(num !== 0) this.style.transform = 'scale(1.05)'; };
                tile.onmouseout = function() { this.style.transform = 'scale(1)'; };
            }
            tile.onclick = function() {
                const emptyIndex = tiles.indexOf(0);
                const canMove = [index - 1, index + 1, index - 3, index + 3].includes(emptyIndex);
                const sameRow = Math.floor(index / 3) === Math.floor(emptyIndex / 3);
                
                if(canMove && (Math.abs(index - emptyIndex) === 3 || sameRow)) {
                    [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
                    moves++;
                    document.getElementById('npMoves').textContent = moves;
                    render();
                    
                    if(tiles.join('') === '123456780') {
                        confetti();
                        setTimeout(() => alert('You Won! Moves: ' + moves), 100);
                    }
                }
            };
            grid.appendChild(tile);
        });
    }

    window.shufflePuzzle = function() {
        for(let i = 0; i < 100; i++) {
            const emptyIndex = tiles.indexOf(0);
            const possible = [];
            if(emptyIndex % 3 > 0) possible.push(emptyIndex - 1);
            if(emptyIndex % 3 < 2) possible.push(emptyIndex + 1);
            if(emptyIndex > 2) possible.push(emptyIndex - 3);
            if(emptyIndex < 6) possible.push(emptyIndex + 3);
            const randomIndex = possible[Math.floor(Math.random() * possible.length)];
            [tiles[emptyIndex], tiles[randomIndex]] = [tiles[randomIndex], tiles[emptyIndex]];
        }
        moves = 0;
        document.getElementById('npMoves').textContent = moves;
        render();
    };

    render();
}
