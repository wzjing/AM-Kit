import '../stylesheets/stylesheet.scss';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';

import 'codemirror/mode/javascript/javascript.js'
import CodeMirror from 'codemirror/lib/codemirror.js';

let editor = CodeMirror.fromTextArea(document.querySelector('#editor'), {
    mode: 'javascript',
    theme: 'dracula'
});

