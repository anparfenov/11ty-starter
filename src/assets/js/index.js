import anime from "animejs";

setTimeout(() => {
    const lineEl = document.querySelector('.js-c-animation_line');
    const lineBBox = lineEl.getBoundingClientRect();

    anime({
        targets: "#animated",
        translateX: lineBBox.width,
        easing: 'linear',
        backgroundColor: "#4C5270",
        duration: 5000,
        loop: true,
    });
}, 1000)
