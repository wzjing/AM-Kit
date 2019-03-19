import {AnimationPlayer} from "./libs/AnimationPlayer";
import {AcceleratedInterpolator} from "./libs/interpolators";
import '../stylesheets/stylesheet.scss'

// Test
window.onload = () => {
    console.log('OnLoad');
    let player = new AnimationPlayer(document.querySelector('.animation-player'));
    player.addInterpolator(AcceleratedInterpolator);

    player.onPlay = () => {
        console.log('Play')
    };

    player.onReset = () => {
        console.log('Reset')
    };
};