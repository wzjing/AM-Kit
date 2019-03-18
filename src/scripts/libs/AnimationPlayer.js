import {Animation} from "./Animation";

class AnimationPlayer {

    set onPlay(value) {
        this.onPlay_ = value
    }

    set onReset(value) {
        this.onReset_ = value
    }

    constructor(el) {
        // noinspection JSUnusedGlobalSymbols
        this.htmlEl_ = el;
        this.graphCanvasEl_ = el.querySelector('.graph-canvas');
        this.graphCanvas_ = this.graphCanvasEl_.getContext('2d');
        this.animationObjectEl_ = el.querySelector('.animation-object');
        this.controlEl_ = el.querySelector('.animation-control');

        this.axesWidth_ = 1;
        this.gridWidth_ = 1;
        this.strokeCount = 5;
        this.axesColor = '#000000';
        this.strokeColor = '#989898';
        this.graphTrackColor = '#989898';
        this.graphColor = '#009688';

        this.playState_ = 0;
        this.playProgress = 0;

        this.initGraph_();
        this.initControl_();
    }

    initGraph_() {
        if (this.graphCanvas_ !== undefined) {
            this.drawGraph_(this.graphCanvas_);
        } else {
            console.log('Graph canvas is null');
        }
    }

    initControl_() {
        this.controlPlayEl_ = this.controlEl_.querySelector('.control-play');
        this.controlResetEl_ = this.controlEl_.querySelector('.control-reset');
        this.controlPlayEl_.addEventListener('click', () => {
            if (this.playState_ === 0) {
                this.controlPlayEl_.classList.remove('animation-control--hide');
                this.controlResetEl_.classList.remove('animation-control--hide');
                this.controlPlayEl_.classList.add('animation-control--hide');
                this.playState_ = 1;
                this.startAnimation();
                if (this.onPlay_ !== undefined) {
                    this.onPlay_()
                }
            }
        });

        this.controlResetEl_.addEventListener('click', () => {
            if (this.playState_ === 1) {
                this.controlPlayEl_.classList.remove('animation-control--hide');
                this.controlResetEl_.classList.remove('animation-control--hide');
                this.controlResetEl_.classList.add('animation-control--hide');
                this.playState_ = 0;
                this.resetAnimation();
                if (this.onReset_ !== undefined) {
                    this.onReset_()
                }
            }
        });
    }

    drawGraph_(canvas) {

        let width = this.graphCanvasEl_.width;
        let height = this.graphCanvasEl_.height;
        this.axesWidth_ = width / 100;
        this.gridWidth_ = this.axesWidth_ / 2;

        canvas.clearRect(0, 0, width, height);

        // Draw Grid
        canvas.beginPath();
        canvas.strokeStyle = this.strokeColor;
        canvas.lineWidth = this.gridWidth_;
        for (let i = 0; i < this.strokeCount; i++) {
            if (i === 0) {
                canvas.moveTo(0, i * height / this.strokeCount + this.gridWidth_ / 2);
                canvas.lineTo(width, i * height / this.strokeCount + this.gridWidth_ / 2);
            } else {
                canvas.moveTo(0, i * height / this.strokeCount);
                canvas.lineTo(width, i * height / this.strokeCount);
            }
        }
        for (let i = 1; i <= this.strokeCount; i++) {
            if (i === this.strokeCount) {
                canvas.moveTo(i * width / this.strokeCount - this.gridWidth_ / 2, 0);
                canvas.lineTo(i * width / this.strokeCount - this.gridWidth_ / 2, height);
            } else {
                canvas.moveTo(i * width / this.strokeCount, 0);
                canvas.lineTo(i * width / this.strokeCount, height);
            }
        }
        canvas.stroke();

        // Draw Axes
        canvas.beginPath();
        canvas.strokeStyle = this.axesColor;
        canvas.lineWidth = this.axesWidth_;
        canvas.moveTo(this.axesWidth_ / 2, 0);
        canvas.lineTo(this.axesWidth_ / 2, height - this.axesWidth_ / 2);
        canvas.lineTo(width, height - this.axesWidth_ / 2);
        canvas.stroke();

        // Draw graph
        if (this.interpolator_ !== undefined) {
            // Graph Track
            canvas.beginPath();
            canvas.strokeStyle = this.graphTrackColor;
            canvas.lineWidth = width / 100;
            canvas.moveTo(0, height);
            let count = 40;
            for (let i = 1; i <= count; i++) {
                // console.log(`Indexing(${width * i/count}, ${height * (1-this.interpolator_(i/count))})`)
                canvas.lineTo(width * i / count, height * (1 - this.interpolator_(i / count)) - canvas.lineWidth / 2);
            }
            canvas.stroke();

            // Graph
            canvas.beginPath();
            canvas.strokeStyle = this.graphColor;
            canvas.lineWidth = width / 80;
            canvas.moveTo(0, height);
            for (let i = 1; i <= count * this.playProgress; i++) {
                // console.log(`Indexing(${width * i/count}, ${height * (1-this.interpolator_(i/count))})`)
                canvas.lineTo(width * i / count, height * (1 - this.interpolator_(i / count)) - canvas.lineWidth / 2);
            }
            canvas.stroke();
        }
    }

    startAnimation() {
        if (this.animationObjectEl_) {
            this.animationListener_ = value => {
                this.playProgress = value;
                this.invalidate();
            };
            const start = getProperty(this.animationObjectEl_, 'left').get();
            let anim = new Animation(this.animationObjectEl_, 'left', start, start+200);
            anim.listener = (value, ratio) => this.animationListener_(ratio);
            anim.duration = 300;
            anim.interpolator = this.interpolator_;
            anim.start();
        }
    }

    stopAnimation() {
        if (this.animationObjectEl_) {
            if (this.animationObjectEl_.timer) {
                clearInterval(this.animationObjectEl_.timer);
                this.animationListener_ = null;
                this.playProgress = 0;
            }
        }
    }

    resetAnimation() {
        this.stopAnimation();
        if (this.animationObjectEl_) {
            this.animationObjectEl_.style.left = '';
            this.playProgress = 0;
            this.invalidate();
        }
    }

    addInterpolator(interpolator) {
        this.interpolator_ = interpolator;
        this.invalidate();
    }

    invalidate() {
        this.drawGraph_(this.graphCanvas_)
    }

}

export {
    AnimationPlayer
}