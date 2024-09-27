class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.isRunning = false;

        this.bindEvents();
    }

    bindEvents() {
        document.getElementById('start-button').addEventListener('click', () => this.startGame());
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        document.getElementById('jump-button').addEventListener('click', () => this.model.jump());
        document.getElementById('jump-button').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.model.jump();
        });
    }

    startGame() {
        this.isRunning = true;
        document.getElementById('start-button').style.display = 'none';
        document.getElementById('jump-button').style.display = 'block';
        this.gameLoop();
    }

    gameLoop() {
        if (!this.isRunning) return;

        this.model.updatePlayerPosition();
        this.model.addObstacle();
        this.model.updateObstacles();
        this.model.updateScore();

        if (this.model.checkCollision()) {
            this.endGame();
            return;
        }

        this.view.clear();
        this.view.drawPlayer(this.model.player);
        this.view.drawObstacles(this.model.obstacles);
        this.view.updateScore(this.model.score);

        // 逐漸增加障礙物頻率
        this.model.obstacleFrequency = Math.min(0.02, this.model.obstacleFrequency + 0.00001);

        requestAnimationFrame(() => this.gameLoop());
    }

    handleKeyPress(e) {
        if (e.code === 'Space') {
            this.model.jump();
        }
    }

    endGame() {
        this.isRunning = false;
        alert('遊戲結束！你的分數是: ' + this.model.score);
        document.getElementById('start-button').style.display = 'block';
        document.getElementById('jump-button').style.display = 'none';
        this.model = new GameModel();
    }
}

// 初始化遊戲
window.onload = () => {
    const canvas = document.getElementById('game-canvas');
    const model = new GameModel();
    const view = new GameView(canvas);
    const controller = new GameController(model, view);
};