const blockRowCount = 3;
const blockColumnCount = 6;
const blockWidth = 75;
const blockHeight = 20;
const blockPadding = 50;
const blockOffsetTop = 30;
const blockOffsetLeft = 30;

const bricks =[];
for(let c = 0; c < blockColumnCount; c++) {
    bricks[c] = [];
    for(let r = 0; r < blockRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

function drawBlocks() {
    for(let c = 0; c < blockColumnCount; c++) {
        for(let r = 0; r < blockRowCount; r++) {
            if(bricks[c][r]. status == 1) {
                let brickX = (c * (blockWidth + blockPadding)) + blockOffsetLeft;
                let brickY = (r * (blockHeight+ blockPadding)) + blockOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, blockWidth, blockHeight);
                ctx.fillStyle = "lime";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for(let c = 0; c < blockColumnCount; c++) {
        for (let r = 0; r < blockRowCount; r++) {
            let b = bricks[c][r];
            if (b.status == 1) {
                if (ball.x > b.x && ball.x < b.x + blockWidth && ball.y > b.y && ball.y < b.y + blockHeight) {
                    ball.vy = -ball.vy;
                    b.status = 0;
                    score += 1;
                    if(score == blockRowCount * blockColumnCount){
                        alert("CLEAR");
                        document.location.reload()
                    }
                }
            }
        }
    }
}

class Block {

    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.half_width = width / 2;
        this.half_height = height / 2;
        this.color = color;
    }

    draw(ctx) {
                ctx.save();

                ctx.translate(this.x, this.y);

                ctx.beginPath();
                ctx.moveTo(this.half_width, 0);
                ctx.lineTo(this.half_width, this.half_height);
                ctx.lineTo(-this.half_width, this.half_height);
                ctx.lineTo(-this.half_width, -this.half_height);
                ctx.lineTo(this.half_width, -this.half_height);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.closePath();
                ctx.restore();
             }


    collide(ball) {
        let result = true;
        const top = this.y - this.half_height;
        const bottom = this.y + this.half_height;
        // ボールがブロックより上か下にある場合、何もしない
        if (top > ball.bottom || bottom < ball.top) {
            return false;
        }

        const left = this.x - this.half_width;
        const right = this.x + this.half_width;

        if (left < ball.right && right > ball.left) {
            if (ball.rightBottom.x < left && ball.rightBottom.y > top
                && ball.rightBottom.y < bottom) {
                // ブロックの左上角より下側であたったら上に戻さない
                ball.reboundHorizontal(left - ball.right);
            } else if (ball.leftBottom.x > right && ball.leftBottom.y > top
                && ball.leftBottom.y < bottom) {
                // ブロックの右上角より下側であたったら上に戻さない
                ball.reboundHorizontal(ball.left - right);
            } else if (ball.rightTop.x < left && ball.rightTop.y < bottom
                && ball.rightTop.y > top) {
                // ブロックの左下角より上側であたったら下に戻さない
                ball.reboundHorizontal(left - ball.right);
            } else if (ball.leftTop.x > right && ball.leftTop.y < bottom
                && ball.leftTop.y > top) {
                // ブロックの右下角より上側であたったら下に戻さない
                ball.reboundHorizontal(ball.left - right);
            } else if (ball.bottom > top && ball.top < top) {
                // ブロックの上にあたった
                ball.reboundVertical(ball.bottom - top);
            } else {
                // ブロックの下に当たった
                ball.reboundVertical(ball.top - bottom);
            }
        } else {
            result = false;
        }

        return result;
    }
}


