import {Animation, Color} from './lib/animation';
import '../stylesheets/stylesheet.scss'

let CodeMirror = require('codemirror');

// Test
window.onload = () => {
    let editor = CodeMirror(document.querySelector('.code-editor'), {
        value: "function myScript(){return 100;}\n",
        mode:  "javascript"
    });
};