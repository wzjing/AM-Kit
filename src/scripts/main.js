import {AnimationPlayer} from './libs/AnimationPlayer.js'
import {offsetX} from './libs/AnimationUtil.js'

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
    console.log(`opacity: ${playerEl.property('opacity').get()}`);
    console.log(`padding: ${playerEl.property('padding').get()}`);
    console.log(`Margin: ${playerEl.property('margin').get()}`);
    console.log(`Background-Color: ${playerEl.property('background-color')}`);

};