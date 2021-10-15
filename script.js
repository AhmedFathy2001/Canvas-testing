const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = document.body.innerHeight;
    circleArray = [];
    init();
});

let ctx = canvas.getContext('2d');

let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 40;

let colorArray = [
    '#F72585',
    '#B5179E',
    '#7209B7',
    '#560BAD',
    '#480CA8',
    '#3A0CA3',
    '#3F37C9',
    '#4361EE',
    '#4895EF',
    '#4CC9F0'
]

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});
document.addEventListener('mouseout', (e) => {
    mouse.x = undefined;
    mouse.y = undefined;
});
class Circle {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    }
    draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
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
        circleArray.push(new Circle(x, y, dx, dy, radius));
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