const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [1080, 1080],
  // animate: true
  // duration: 300,
  // fps: 24
};

let text = ' ';

const degToRad = (degrees) => {
  return degrees / 180 * Math.PI;
};

const randomRange = (min, max) => {
  return Math.random() * (max - min) + min;
}


const sketch = () => {
  return ({ context, width, height, playhead }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.fillStyle = 'black';

    const cx = width * 0.5;
    const cy = height * 0.5;

    const w = width * 0.01;
    const h = height * 0.1;

    let x, y;

    const num = random.range(10, 40);
    const radius = width * 0.3;
  

    for (let i = 0; i < num; i++) {
      
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      context.save();
      context.translate(x, y);
      //context.rotate(random.range(1, -angle));
      context.rotate(-angle);
      context.scale(random.range(0.1, 1), random.range(0.2, 1.3));

      context.beginPath();
      context.rect(-w * 0.5, random.range(0, -h * 1.8), w, h);
      context.rect(1,1,20,140);
    
      context.fill();
      context.restore();
      context.save();
      //context.translate(w, h);
      context.rotate(0);
      context.lineWidth = random.range(5, 14);
      context.save();

      context.translate(x,y);
      context.beginPath();
      context.rotate(Math.PI*9.6 / random.range(1,2));
     
      context.fill();
      context.restore();
      context.save();
      context.arc(width / 2, height / 2, radius * random.range(0.7, 1.6), slice * random.range(1, -8), slice * random.range(0, 5));
      context.stroke();
    };  


  var sin = Math.sin(Math.PI / 6);
  var cos = Math.cos(Math.PI / 6);
  context.translate(width / 2, height / 2);
  for (var i = 1; i <= 12; i++) {
    c = Math.floor(255 / 12 * i);
    // context.font = '14px sans';
    // res = text.concat("//// " , grd, '°');
    context.fillRect(100, 1, 400, 1)
    context.beginPath();
    context.arc(200, random.range(50, 250), random.range(10, 30), 0, 2 * Math.PI);
    context.lineWidth = 1;
    // context.fillText(res, 300, 1);
    context.transform(cos, sin, -sin, cos, 0, 0);
    context.fillStyle = "gray";
    context.stroke();
  }

  context.setTransform(-1, 0, 0, 1, 100, 100);

  }
};


canvasSketch(sketch, settings);
