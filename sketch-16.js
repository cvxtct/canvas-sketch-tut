const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [2080, 2080]
};


const sketch = () => {
  return ({ context, width, height, playhead }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.fillStyle = 'black';

    const cx = width * 0.3;
    //const cy = height * 0.5;
    
    let raise_rad = 0;
    
    for (let i = 1; i < 8; i++) {
      let radius = cx  + raise_rad;
      console.log("rad", radius);
      context.beginPath();
      context.lineWidth = 40;
      //context.rotate(45 * Math.PI / 10);
      //context.rotate(Math.PI / 1);
      //context.arc(width / 2, height / 2, radius , 11,  Math.PI + (Math.PI * i) / 4);
      context.arc(width / 2, height / 2, radius , 16 * (i  / 0.5),  11);  
      context.stroke();
      //raise_rad += raise_rad / (Math.PI / i + (Math.PI * i)) * 1.9;
      raise_rad += 43;
      context.stroke();
    }; 
  }
};

canvasSketch(sketch, settings);
