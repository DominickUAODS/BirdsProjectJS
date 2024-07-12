//canvas.height = 500;
//canvas.width = 500;

canvas.height = 200;
canvas.width = 200;

const ctx = canvas.getContext("2d");

ctx.fillStyle = "orange";
ctx.strokeStyle = "aqua";
ctx.lineWidth = 1;

//ctx.fillRect(50, 50, 100, 100);

//canvas.height = 500;
//canvas.width = 500;

//ctx.strokeRect(60, 60, 100, 100);

//ctx.clearRect(40, 40, 30, 30);
//ctx.clearRect(0, 0, 500, 500); // очищаем все полотно


// ctx.beginPath();
// ctx.moveTo(10,10);
// ctx.lineTo(50,0);
// ctx.lineTo(50,50);
// //arc
// //rect

// ctx.stroke();
// ctx.fill();

// ctx.closePath();

// ctx.strokeText("text from canvas", 50, 50);
// ctx.fillText("text from canvas", 50, 100);


// let x = 0;
// let y = 0;

// ctx.strokeRect(x, y, 30, 30);

// setInverval(() =>{
//     ctx.clearRect(x, y, canvas.width, canvas.height)
//     x+=15;
//     ctx.stroke(x, y, 30, 30);

// }, 100 )


canvas.height = 200
canvas.width = 200
const ctx = canvas.getContext("2d")
 
ctx.fillStyle = "orange";
ctx.strokeStyle = "aqua";
ctx.lineWidth = 1;
 
let x = 0;
let y = 0;
 
ctx.strokeRect(x, y, 30, 30);
 
setInterval(() => {
  ctx.clearRect(x, y, canvas.width, canvas.height);
  x += 15;
  ctx.strokeRect(x, y, 30, 30);
}, 100)