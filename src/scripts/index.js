import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-light.css';
import '../stylesheets/index.scss';
import '../stylesheets/editor.scss'

import iconRun from '../assets/img/run.svg'
import 'codemirror/mode/javascript/javascript.js'
import CodeMirror from 'codemirror/lib/codemirror.js';
import {getProperty} from "./lib/animation";

document.querySelector('.icon-play').innerHTML = iconRun;

let editor = new CodeMirror(document.querySelector('#editor'), {
    mode: 'javascript',
    theme: 'infinity',
    value: `
/* value from [0, 1] */

function println(num, subfix) {
  console.log(\`\${num} \${subfix}\`);
}

function interpolator(value) {
  let v = Math.sin(value * Math.PI/2);
  console.log(\`current: \${v}\`);
  for(let i=0; i<10; i++) {
    println(i, 'times');
  }
  return v;
}
`
});

let canvas = document.querySelector('#graph');
let w = getProperty(canvas, 'width').get();
let h = getProperty(canvas, 'height').get();
console.log(`Size: [${w} x ${h}]`);
let ctx = canvas.getContext('2d');
ctx.canvas.width = w;
ctx.canvas.height = h;
let x = (p) => {return w*p};
let y = (p) => {return h*p};

ctx.strokeStyle = '#000000';
ctx.lineWidth = 0.5;
ctx.beginPath();
let margin = y(0.1);
ctx.moveTo(margin, margin);
ctx.lineTo(margin, h-margin);
ctx.lineTo(w-margin, h-margin);
ctx.stroke();
ctx.strokeStyle = '#003bf3';
ctx.textAlign = 'center';
ctx.font = 'normal 12px';
ctx.strokeText('v', margin/2, margin, margin/2);