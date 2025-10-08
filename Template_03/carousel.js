function caroPrev(e) {
    e.target.parentNode.parentNode.getElementsByClassName('carousel')[0].scrollBy(-322, 0)
}

function caroNext(e) {
    e.target.parentNode.parentNode.getElementsByClassName('carousel')[0].scrollBy(322, 0)
}