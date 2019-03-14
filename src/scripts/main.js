import {AnimationPlayer} from './libs/AnimationPlayer.js'
import {Color} from './libs/Color';
import {Animation} from './libs/Animation';
import './libs/AnimationUtil';

// Test
window.onload = () => {
    // console.log('OnLoad');
    // let player = new AnimationPlayer(document.querySelector('.animation-player'));
    // player.addInterpolator((value) => {
    //     return (-0.11 / (value + 0.1) + 1.1) * value * value
    // });
    //
    // player.onPlay = () => {
    //     console.log('Play')
    // };
    //
    // player.onReset = () => {
    //     console.log('Reset')
    // };
    let playerEl = document.querySelector('.animation-player');
    let anim = new Animation(playerEl, 'margin-left', 0, 100)
    anim.duration = 1000;
    anim.start();
};