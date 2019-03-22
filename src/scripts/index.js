import '../stylesheets/stylesheet.scss'
import * as monaco from 'monaco-editor';

self.MonacoEnvironment = {
    getWorkerUrl: function (moduleId, label) {
        if (label === 'typescript' || label === 'javascript') {
            return './ts.worker.bundle.js';
        }
        return './editor.worker.bundle.js';
    }
};

// Test
window.onload = () => {
    monaco.editor.create(document.querySelector('.code-editor'), {
        value: [
            'function x() {',
            '\tconsole.log("Hello world!");',
            '}'
        ].join('\n'),
        language: 'javascript'
    });
};