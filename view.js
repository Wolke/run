class GameView {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // 添加背景漸變
        let gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, "#87CEEB");
        gradient.addColorStop(1, "#E0F6FF");
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawPlayer(player) {
        this.ctx.save();
        this.ctx.translate(player.x + player.width / 2, player.y + player.height / 2);

        // 繪製身體
        this.ctx.fillStyle = '#FF6347';
        this.ctx.fillRect(-player.width / 2, -player.height / 2, player.width, player.height);

        // 繪製眼睛
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(-5, -10, 5, 0, Math.PI * 2);
        this.ctx.arc(5, -10, 5, 0, Math.PI * 2);
        this.ctx.fill();

        // 繪製瞳孔
        this.ctx.fillStyle = 'black';
        this.ctx.beginPath();
        this.ctx.arc(-5, -10, 2, 0, Math.PI * 2);
        this.ctx.arc(5, -10, 2, 0, Math.PI * 2);
        this.ctx.fill();

        // 繪製嘴巴
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(0, 5, 5, 0, Math.PI);
        this.ctx.stroke();

        this.ctx.restore();
    }

    drawObstacles(obstacles) {
        obstacles.forEach(obstacle => {
            this.ctx.save();
            this.ctx.translate(obstacle.x + obstacle.width / 2, obstacle.y + obstacle.height / 2);

            // 繪製主體
            this.ctx.fillStyle = '#4CAF50';
            this.ctx.fillRect(-obstacle.width / 2, -obstacle.height / 2, obstacle.width, obstacle.height);

            // 添加一些細節
            this.ctx.fillStyle = '#45a049';
            for (let i = 0; i < 3; i++) {
                this.ctx.beginPath();
                this.ctx.moveTo(-obstacle.width / 2, -obstacle.height / 2 + i * obstacle.height / 3);
                this.ctx.lineTo(obstacle.width / 2, -obstacle.height / 2 + (i + 1) * obstacle.height / 3);
                this.ctx.lineTo(-obstacle.width / 2, -obstacle.height / 2 + (i + 2) * obstacle.height / 3);
                this.ctx.fill();
            }

            this.ctx.restore();
        });
    }

    updateScore(score) {
        document.getElementById('score-value').textContent = score;
    }
}