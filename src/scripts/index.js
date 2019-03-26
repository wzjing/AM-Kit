import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-light.css';
import '../stylesheets/stylesheet.scss';

import iconRun from '../assets/img/run.svg'
import 'codemirror/mode/javascript/javascript.js'
import CodeMirror from 'codemirror/lib/codemirror.js';
import {getProperty} from "./lib/animation";

document.querySelector('.icon-play').innerHTML = iconRun;

let editor = CodeMirror.fromTextArea(document.querySelector('#editor'), {
    mode: 'javascript',
    theme: 'base16-light'
});

let canvas = document.querySelector('#graph');
let width = getProperty(canvas, 'width').get();
let height = getProperty(canvas, 'height').get();
canvas.widget = width;
canvas.height = height;
let ctx = canvas.getContext('2d');

ctx.strokeStyle = "#000000";
ctx.fillStyle = "#989898";
ctx.moveTo(0, 100);
ctx.lineTo(100, 100);
ctx.lineTo(100, 200);
ctx.stroke();