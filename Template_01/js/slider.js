$(document).ready(function(){
    $('.slider').slick({
        dots: false,
        arrows: false,
        infinite: false, 
        slidesToShow: 5,
        slidesToScroll: 1, 
        centerMode: true,
        centerPadding: '100px',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    centerPadding: '10px',
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});