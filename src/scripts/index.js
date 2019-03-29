import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/idea.css';
import '../stylesheets/index.scss';
import '../stylesheets/editor.scss'

import iconRun from '../assets/img/run.svg';
import iconOval from '../assets/img/oval.svg';
import iconTriangle from '../assets/img/triangle.svg';
import 'codemirror/mode/javascript/javascript.js';
import CodeMirror from 'codemirror/lib/codemirror.js';
import {getProperty} from "./lib/animation";

let editor;

function initEditor() {
    document.querySelector('.icon-play').innerHTML = iconRun;
    editor = new CodeMirror(document.querySelector('#editor'), {
        mode: 'javascript',
        theme: 'infinity',
        value: `/* value from [0, 1] */

function println(num, subfix) {
  console.log(\`\${num} \${subfix}\`);
}

function interpolator(value) {
  let v = Math.sin(value * Math.PI);
  console.log(\`current: \${v}\`);
  return v;
}`
    });
}

function drawGraph() {
    let canvas = document.querySelector('#graph');
    let w = getProperty(canvas, 'width').get();
    let h = getProperty(canvas, 'height').get();
    console.log(`Size: [${w} x ${h}]`);
    let ctx = canvas.getContext('2d');
    canvas.width = w;
    canvas.height = h;

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    let margin = h * 0.15;
    ctx.moveTo(margin, margin);
    ctx.lineTo(margin, h - margin);
    ctx.lineTo(w - margin, h - margin);
    ctx.stroke();
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.font = '14px Arial';
    ctx.textBaseline = 'middle';
    ctx.fillText('s', margin / 2, margin);
    ctx.fillText('t', w - margin, h - margin / 2, 48);

    let x = (p) => {
        return (w - 2 * margin) * p + margin
    };
    let y = (p) => {
        return h - (h - 2 * margin) * p - margin
    };
    // draw graph
    ctx.strokeStyle = '#2979FF';
    ctx.moveTo(x(0), y(0));
    ctx.beginPath();
    for (let i = 0; i < 1; i += 0.1) {
        // ctx.arc(x(i), y(interpolator(i)), 3, 0, 360, false);
        ctx.lineTo(x(i), y(interpolator(i)));
    }
    ctx.stroke();
    ctx.closePath();
}

function run() {
    if (editor !== null) {
        let code = editor.getValue();
        if (/function interpolator\([_a-z0-9]+\)/.test(code)) {
            document.querySelector('#interpolator').innerHTML = code;
            drawGraph();
        } else {
            window.alert('Wrong format, no interpolator function found');
        }
    }
}

window.onload = () => {
    initEditor();
    document.querySelector('.code-editor-run').addEventListener('click', () => {
        run();
    });
    document.querySelector('.icon-oval').innerHTML = iconOval;
    document.querySelector('.icon-triangle').innerHTML = iconTriangle;
    document.querySelector('#shape-triangle').setAttribute('transform', 'rotate(12, 12, 30)');
};

