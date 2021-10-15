const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 8;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 8;
    circleArray = [];
    init();
});

let ctx = canvas.getContext('2d');

let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 40;


window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});
document.addEventListener('mouseout', (e) => {
    mouse.x = undefined;
    mouse.y = undefined;
});
class Circle {
    constructor(x, y, dx, dy, radius, r, g, b) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.r = r;
        this.g = g;
        this.b = b
    }
    draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        const rgb = `rgb(${this.r},${this.g},${this.b})`;
        ctx.strokeStyle = rgb;
        ctx.stroke();
        ctx.fillStyle = rgb;
        ctx.fill();
    }

    update = function() {
        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) this.dx = -(this.dx);
        if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) this.dy = -(this.dy);

        this.x += this.dx;
        this.y += this.dy;

        // interactivity

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) this.radius += 2;
        } else if (this.radius > this.minRadius) {
            this.radius -= 2;
        }

        this.draw();
    }
}


let circleArray = [];

function init() {

    for (let index = 0; index < 800; index++) {
        let radius = (Math.random() * 10) + 5;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 3;
        let dy = (Math.random() - 0.5) * 3;
        const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
        const r = randomBetween(0, 255);
        const g = randomBetween(0, 255);
        const b = randomBetween(0, 255);
        circleArray.push(new Circle(x, y, dx, dy, radius, r, g, b));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let index = 0; index < circleArray.length; index++) {
        circleArray[index].update();
    }
}
animate();

init();