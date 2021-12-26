const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 3048, 2048 ],
  animate: true
};

const animate = () => {
  console.log('domestika');
  requestAnimationFrame(animate);
};
animate();

const sketch = () => {

  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    

   for (let i = 0; i <3; i++) {
    //for (let j = 0; j < 10; j++) {
    context.save();
    context.beginPath();
    context.translate(i * 950 , i);
    context.translate(-180 , i);
    const n = random.noise2D(i + frame * 100, i, 0.0001);
    console.log(n);
    const angle = n * Math.PI * 0.1;
    context.moveTo(width / 4 , height / 2);
    context.lineTo(width / 3, 1024);
    // context.lineTo(n , j * 1000 / random.range(1, n));
    const scale = math.mapRange(n, -10, n * 1000, 1000, n * i);
    context.lineWidth =  scale;
    context.scale(n * 0.5,  n * 0.5);
  
    context.stroke();
    context.restore();
    context.save();
		//context.translate(x, y);
		
    //context.translate(width /2, height /2);
    context.beginPath();
    context.stroke();
    context.restore();
    context.save();
   
   //};
 };

 

  };
};

canvasSketch(sketch, settings);


