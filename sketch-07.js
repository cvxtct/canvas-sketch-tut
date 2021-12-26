const context = require('bluebird/js/release/context');
const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [5080, 2080],
  // animate: true
};

let manager;

let text = 'a';
let fontSize = 100;
let fontFamily = 'serif';

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {
  const cell = 20;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
  
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols , rows);

    // fontSize = cols * 1.2;

    typeContext.fillStyle = 'white';
    typeContext.font = `${fontSize}px ${fontFamily}`;
    typeContext.textBaseLine = 'top ';
    typeContext.textAling = 'center';

    const metrics = typeContext.measureText(text);
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft+ metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    console.log(metrics);

    const tx = (cols - mw) * 0.5 - mx;
    const ty = (rows - mh) * 0.5 - my;

    typeContext.save();
    typeContext.translate(tx, ty);

    typeContext.beginPath();
    typeContext.rect(mx, my, mw, mh);
    typeContext.stroke();

    typeContext.fillText(text, 0, 0);
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;
    console.log(typeData);

    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.textBaseLine = 'middle';
    context.textAling = 'top';

    context.drawImage(typeCanvas, 0, 0);

    for ( let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor( i / cols);
      
      const x = col * cell;
      const y = row * cell; 

      // rgb channel
      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      const glyph = getGlyph(r);

      context.font = `${cell * 2}px ${fontFamily}`;
      if (Math.random() < 0.2) context.font = `${cell * 6}px ${fontFamily}`;

      context.fillStyle = `rgb(${r}, ${g}, ${b})`;

      context.save();
      context.translate(x, y);
      context.translate(cell * 0.5, cell * 0.5);

      // context.fillRect(0, 0, cell, cell);

      context.fillText(glyph, 0, 0);
      context.restore();
    }
  };
};

// const loadImage = (path) => {
//   var img = new Image();
//   img.onload = function() {
//     context.drawImage(img, 20,20,50,50)
//   };
//   img.src = path;
//   return img;
// }

// loadImage('assets/img/sum.png');

// TODO use math symbols here!
 // var img_01 = new Image();
    // img_01.src = './assets/img/sum.png'
    // return typeContext.drawImage(img_01, 10,10);
const getGlyph = (v) => {

  if (v < 50) {
    return '%';
  };
  if (v < 100) {
    return ' *';
  }
  if (v < 110) return '#';
  if (v < 120) return ',';
  if (v < 130) return 'z';
  if (v < 150) {
   return '+';
  }
  if (v < 200) {
    return '.';
  }
  if ( v < 220) return '@';

  //const glyps = [img_01, img_02];
  const glyps = '%. + * z,#'.split('');

  return random.pick(glyps);
};

const onKeyUp = (e) => {
  //console.log(e);
  text = e.key.toUpperCase();
  manager.render();
};

document.addEventListener('keyup', onKeyUp);

const start = async () => {
  manager = await canvasSketch(sketch, settings);
};

start();

// const url = 'https://picsum.photos/200';
// const url = 'assets/img/sum.png'

// const loadMeSomeImage = (url) => {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.onload = () => resolve(img);
//     img.onerror = () => reject();
//     img.src = url;
//   })
// };

// const rn = async () => {
//   const img = await loadMeSomeImage(url);
//   console.log('image width'. img.width);
//   console.log('this line');
// };

// rn();
