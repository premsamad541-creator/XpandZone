// Main application logic

function renderGames(gamesToShow) {
    const container = document.getElementById('gamesContainer');
    container.innerHTML = '';

    const categories = {};
    gamesToShow.forEach(game => {
        if (!categories[game.category]) {
            categories[game.category] = [];
        }
        categories[game.category].push(game);
    });

    for (const [category, categoryGames] of Object.entries(categories)) {
        const section = document.createElement('section');
        section.className = 'games-section';
        
        const categoryEmoji = category === 'action' ? '⚔️' : '🧩';
        section.innerHTML = '<h2 class="section-title">' + categoryEmoji + ' ' + category.charAt(0).toUpperCase() + category.slice(1) + ' Games</h2><div class="games-grid" id="grid-' + category + '"></div>';
        container.appendChild(section);

        const grid = document.getElementById('grid-' + category);
        categoryGames.forEach(game => {
            const card = document.createElement('div');
            card.className = 'game-card';
            
            const gradients = [
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
            ];
            const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

            card.innerHTML = '<div class="game-thumbnail" style="background: ' + randomGradient + ';"><span>' + game.icon + '</span><div class="game-badge">PLAY</div></div><div class="game-info"><h3 class="game-title">' + game.title + '</h3><p class="game-description">' + game.description + '</p><button class="play-btn">▶ Play Now</button></div>';

            card.querySelector('.play-btn').onclick = function() {
                playGame(game.gameId, game.title);
            };

            grid.appendChild(card);
        });
    }
}

function playGame(gameId, title) {
    document.getElementById('gameTitle').textContent = title;
    document.getElementById('gameModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = '';
    
    if (gameId === 'snake') {
        loadSnakeGame(gameArea);
    } else if (gameId === 'memory') {
        loadMemoryGame(gameArea);
    } else if (gameId === 'tictactoe') {
        loadTicTacToe(gameArea);
    } else if (gameId === 'colormatch') {
        loadColorMatch(gameArea);
    } else if (gameId === 'numberpuzzle') {
        loadNumberPuzzle(gameArea);
    }
}

function closeGame() {
    document.getElementById('gameModal').classList.remove('active');
    document.body.style.overflow = 'auto';
    document.getElementById('gameArea').innerHTML = '';
}

// Category filter
const pills = document.querySelectorAll('.pill');
pills.forEach(pill => {
    pill.addEventListener('click', function() {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        
        const category = pill.dataset.category;
        if (category === 'all') {
            renderGames(games);
        } else {
            renderGames(games.filter(g => g.category === category));
        }
    });
});

// Search
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    renderGames(games.filter(g => 
        g.title.toLowerCase().includes(searchTerm) ||
        g.description.toLowerCase().includes(searchTerm)
    ));
});

// ESC to close
document.addEventListener('keydown', function(e) {
    if(e.key === 'Escape') closeGame();
});

// Initial render
renderGames(games);
