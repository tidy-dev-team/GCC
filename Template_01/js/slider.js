$(document).ready(function () {
    const $slider = $('.slider');
  
    $slider.on('init reInit afterChange', function (e, slick, cur) {
      const i = typeof cur === 'number' ? cur : slick.currentSlide;
      slick.$slides.removeClass('is-active');
      slick.$slides.eq(i).addClass('is-active');
    });
  
    $slider.slick({
      dots: false,
      arrows: false,
      infinite: false,
      slidesToShow: 4,          // <= show 5
      slidesToScroll: 1,
      centerMode: false,          // we’ll handle gutters with CSS
      variableWidth: true,     // keep equal widths so 5 always fit
      responsive: [
        { breakpoint: 1280, settings: { slidesToShow: 4 } },
        { breakpoint: 1024, settings: { slidesToShow: 3 } },
        { breakpoint: 768,  settings: { slidesToShow: 1, centerPadding: '40px' } }
      ]
    });
  });
  