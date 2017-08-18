import '../css/index.css';
import '../motion/good.json';

import * as bodymovin from 'bodymovin';

const container = document.getElementById('container');

const anim = bodymovin.loadAnimation({
    container,
    renderer: 'svg',
    autoplay: false,
    loop: false,
    path: 'motion/good.json'
});

container && container.addEventListener('click', _ => anim.goToAndPlay(0, true), false);