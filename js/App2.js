const {PI, floor, ceil} = Math;

class App {
    constructor() {
        this.c = document.querySelector("#myCanvas");
        window.addEventListener("resize", this.resizeCanvas.bind(this));
        this.ctx = this.c.getContext("2d");
        this.resizeCanvas();

        document.querySelector("#clearBtn").addEventListener("click", (e) => {
            this.ctx.clearRect(0, 0, this.c.width, this.c.height);
        });

        this.isDrag = false;
        this.prevPoint = { x: 0, y: 0 };

        this.c.addEventListener("mousedown", this.downHandle.bind(this));
        this.c.addEventListener("mousemove", this.moveHandle.bind(this));
        this.c.addEventListener("mouseup", this.upHandle.bind(this));

        this.color = document.querySelector("#color");
        this.type = [];
        this.type.push(document.querySelector("#erase"));
        this.type.push(document.querySelector("#draw"));

       /* this.type[0].addEventListener("click", (e) => this.cross.style.visibility = 'visible');
        this.type[1].addEventListener("click", (e) => this.cross.style.visibility = 'hidden');

        this.cross = document.querySelector("#crosshair");*/

        this.draw(35);

    }

    draw(p){
        this.ctx.beginPath();
        this.ctx.arc(100, 100, 70, 0, 2 * PI);
        this.ctx.fillStyle = "#ddd";
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.moveTo(100,100);
        this.ctx.arc(100,100,70, -PI / 2, -PI / 2 + p * 2 * PI / 100);
        this.ctx.fillStyle = "rgb(0,132,255)";
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.arc(100, 100, 50, 0, 2 * PI);
        this.ctx.fillStyle = "#fff";
        this.ctx.fill();

        this.ctx.fillStyle = "#000";
        this.ctx.font = '20px Arial';
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(p + "%", 100, 100);
    }

    downHandle(e) {
        this.isDrag = true;
        this.prevPoint.x = e.offsetX;
        this.prevPoint.y = e.offsetY;
    }

    moveHandle(e) {
        if (!this.isDrag) {
            return;
        }

        /*if(this.type[0].checked){
            this.cross.style.top = e.clientY + 'px';
            this.cross.style.left = e.clientX + 'px';
        }*/

        if (this.type[0].checked) {
            this.ctx.clearRect(e.offsetX, e.offsetY, 10, 10);
        } else {
            this.ctx.beginPath();
            this.ctx.strokeStyle = this.color.value;
            this.ctx.moveTo(this.prevPoint.x, this.prevPoint.y);
            this.ctx.lineTo(e.offsetX, e.offsetY);
            this.ctx.stroke();

            this.prevPoint.x = e.offsetX;
            this.prevPoint.y = e.offsetY;
        }
    }

    upHandle(e) {
        this.isDrag = false;
    }

    /*draw(){
        this.ctx.beginPath();
        this.ctx.strokeStyle = "#00f";
        this.ctx.moveTo(100, 100);
        this.ctx.lineTo(200, 100);
        this.ctx.moveTo(250, 100);
        this.ctx.lineTo(350, 100);
        this.ctx.stroke();


        this.ctx.beginPath();
        this.ctx.strokeStyle = "#f00";
        this.ctx.moveTo(180,150);
        this.ctx.lineTo(270,150);
        this.ctx.lineTo(225,200);
        this.ctx.lineTo(180,150);
        this.ctx.stroke();
    }

    draw2(){
        this.ctx.beginPath();
        this.ctx.strokeStyle= "#00f";
        this.ctx.fillStyle="#f00";
        this.ctx.moveTo(10, 10);
        this.ctx.lineTo(50,10);
        this.ctx.lineTo(50, 60);
        this.ctx.lineTo(10,60);
        this.ctx.closePath();
        this.ctx.lineWidth = 5;
        this.ctx.stroke();
        this.ctx.fill();
    }*/

    resizeCanvas() {
        this.c.width = this.c.clientWidth;
        this.c.height = this.c.clientHeight;
    }
}

window.onload = function () {
    let app = new App();
}