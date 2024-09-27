class GameModel {
    constructor() {
        this.score = 0;
        this.player = {
            x: 50,
            y: 350,  // 修改初始 y 位置
            width: 30,
            height: 50,
            speed: 5,
            jumpForce: 10,
            gravity: 0.5,
            isJumping: false
        };
        this.obstacles = [];
        this.gameWidth = 800;
        this.gameHeight = 400;
        this.obstacleFrequency = 0.005;  // 新增障礙物頻率控制
    }

    updateScore() {
        this.score += 1;
    }

    addObstacle() {
        if (Math.random() < this.obstacleFrequency) {  // 使用新的頻率控制
            this.obstacles.push({
                x: this.gameWidth,
                y: this.gameHeight - 50,
                width: 30,
                height: 50
            });
        }
    }

    updatePlayerPosition() {
        if (this.player.isJumping) {
            this.player.y -= this.player.jumpForce;
            this.player.jumpForce -= this.player.gravity;
            if (this.player.y >= this.gameHeight - this.player.height) {
                this.player.y = this.gameHeight - this.player.height;
                this.player.isJumping = false;
                this.player.jumpForce = 10;
            }
        }
    }

    updateObstacles() {
        this.obstacles = this.obstacles.filter(obstacle => {
            obstacle.x -= 5;
            return obstacle.x + obstacle.width > 0;
        });
    }

    checkCollision() {
        return this.obstacles.some(obstacle =>
            this.player.x < obstacle.x + obstacle.width &&
            this.player.x + this.player.width > obstacle.x &&
            this.player.y < obstacle.y + obstacle.height &&
            this.player.y + this.player.height > obstacle.y
        );
    }

    jump() {
        if (!this.player.isJumping) {
            this.player.isJumping = true;
        }
    }
}