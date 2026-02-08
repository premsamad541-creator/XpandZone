// COLOR MATCH
function loadColorMatch(container) {
    let score = 0;
    let timeLeft = 30;
    let correctColor;

    container.innerHTML = '<div style="text-align:center"><div style="font-size:22px;margin-bottom:20px">Score: <span id="cmScore">0</span> | Time: <span id="cmTime" style="color:#ff006e">30</span>s</div><div id="cmTarget" style="width:180px;height:180px;border-radius:15px;margin:20px auto;border:4px solid #00ff88"></div><div id="cmOptions" style="display:grid;grid-template-columns:repeat(3,80px);gap:12px;justify-content:center"></div></div>';

    function generate() {
        const colors = [];
        for(let i = 0; i < 6; i++) {
            colors.push('#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'));
        }
        correctColor = colors[Math.floor(Math.random() * 6)];
        document.getElementById('cmTarget').style.background = correctColor;

        const opts = document.getElementById('cmOptions');
        opts.innerHTML = '';
        colors.forEach(color => {
            const opt = document.createElement('div');
            opt.style.cssText = 'width:80px;height:80px;border-radius:10px;cursor:pointer;border:3px solid transparent';
            opt.style.background = color;
            opt.onmouseover = function() { this.style.borderColor = '#fff'; };
            opt.onmouseout = function() { this.style.borderColor = 'transparent'; };
            opt.onclick = function() {
                if(color === correctColor) {
                    score++;
                    document.getElementById('cmScore').textContent = score;
                    generate();
                } else {
                    score = Math.max(0, score - 1);
                    document.getElementById('cmScore').textContent = score;
                }
            };
            opts.appendChild(opt);
        });
    }

    const timer = setInterval(() => {
        timeLeft--;
        document.getElementById('cmTime').textContent = timeLeft;
        if(timeLeft === 0) {
            clearInterval(timer);
            alert('Time Up! Final Score: ' + score);
            closeGame();
        }
    }, 1000);

    generate();
}
