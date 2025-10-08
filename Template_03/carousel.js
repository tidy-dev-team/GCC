function caroPrev(e) {
    window.caro = e.target.parentNode.parentNode.getElementsByClassName('carousel')[0];
    window.caro.scrollBy(-322, 0);
}

function caroNext(e) {
    window.caro = e.target.parentNode.parentNode.getElementsByClassName('carousel')[0];
    window.caro.scrollBy(322, 0);
}

function caroCheck(e) {
    if (window.caro == undefined) {
        window.caro = e.target;
    }

    window.caro.parentNode.getElementsByClassName('btn-icon')[0].classList.remove('disabled');
    window.caro.parentNode.getElementsByClassName('btn-icon')[1].classList.remove('disabled');

    setInterval(function () {
        if (window.caro.scrollLeft == 0) {
            window.caro.parentNode.getElementsByClassName('btn-icon')[0].classList.add('disabled');
        }

        if (window.caro.scrollLeft + window.caro.clientWidth >= window.caro.scrollWidth) {
            window.caro.parentNode.getElementsByClassName('btn-icon')[1].classList.add('disabled');
        }
    }, 10);
}