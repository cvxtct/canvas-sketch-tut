const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080]
};

const text = 'Attila';
    let fontSize = 200;
    let fontFamily = 'serif';

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';
    context.font = `${fontSize}px ${fontFamily}`;
    context.textBaseLine = 'top ';
    context.textAling = 'center';
  

    const metrics = context.measureText(text);
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft+ metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    console.log(metrics);

    const x = (width - mw) * 0.5 - mx;
    const y = (height - mh) * 0.5 - my;


    context.save();
    context.translate(x, y);

    context.beginPath();
    context.rect(mx, my, mw, mh);
    context.stroke();

    context.fillText(text, 0, 0);
    context.restore();
  

  };
};

canvasSketch(sketch, settings);