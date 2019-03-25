import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-light.css';
import '../stylesheets/stylesheet.scss';

import 'codemirror/mode/javascript/javascript.js'
import CodeMirror from 'codemirror/lib/codemirror.js';
import iconRun from '../assets/img/run.svg'

document.querySelector('.icon-play').innerHTML = iconRun;

let editor = CodeMirror.fromTextArea(document.querySelector('#editor'), {
    mode: 'javascript',
    theme: 'base16-light'
});

