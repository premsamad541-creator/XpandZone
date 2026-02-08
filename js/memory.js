// MEMORY GAME
function loadMemoryGame(container) {
    const emojis = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎸', '🎺'];
    const cards = [...emojis, ...emojis];
    cards.sort(() => Math.random() - 0.5);

    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;

    container.innerHTML = '<div style="text-align:center"><div style="font-size:20px;margin-bottom:20px">Moves: <span id="memMoves">0</span> | Matched: <span id="memMatched">0</span></div><div id="memGrid" style="display:grid;grid-template-columns:repeat(4,90px);gap:10px;justify-content:center"></div></div>';

    const grid = document.getElementById('memGrid');
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.style.cssText = 'width:90px;height:90px;background:#1a1f3a;border:2px solid #00ff88;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:35px';
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.onclick = function() {
            if(flippedCards.length < 2 && !this.classList.contains('flipped')) {
                this.textContent = this.dataset.emoji;
                this.style.background = '#00d4ff';
                this.classList.add('flipped');
                flippedCards.push(this);

                if(flippedCards.length === 2) {
                    moves++;
                    document.getElementById('memMoves').textContent = moves;
                    setTimeout(() => {
                        if(flippedCards[0].dataset.emoji === flippedCards[1].dataset.emoji) {
                            matchedPairs++;
                            document.getElementById('memMatched').textContent = matchedPairs;
                            flippedCards = [];
                            if(matchedPairs === emojis.length) {
                                confetti();
                                setTimeout(() => alert('You Won! Moves: ' + moves), 200);
                            }
                        } else {
                            flippedCards.forEach(c => {
                                c.textContent = '';
                                c.style.background = '#1a1f3a';
                                c.classList.remove('flipped');
                            });
                            flippedCards = [];
                        }
                    }, 500);
                }
            }
        };
        grid.appendChild(card);
    });
}
