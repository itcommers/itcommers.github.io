$(document).ready(function(){

$('#btn-menu').click(function(){
  $('#mob-cont').toggleClass('active');
  $('#overlay').fadeToggle();
  $(this).toggleClass('active');
});

$('#overlay, .modal-close, .modal-cont, #mob-cont a').click(function(e){
  e.stopPropagation();
  $('#overlay, .modal-cont:not(.popup-desc)').fadeOut();
  $('.popup-desc').removeClass('shown');
  $('#mob-cont, #btn-menu').removeClass('active');
});

$('.popup-in').click(function(e){
  e.stopPropagation();
});

//вызов попапа описания кухни
$('.item').click(function(){
  $(this).next('.popup-desc').addClass('shown');
  $('#overlay').fadeIn();
});  

//попап Описание работы
$('.work-popup-btn').click(function(){
  $(this).parents('.popup-desc').css('visibility', 'hidden');
  $(this).parents('.popup-desc').next('.work-popup').fadeIn();
  $('#overlay').off();
  $('#overlay').click(function(){
    $('.work-popup').fadeOut();
    $('.popup-desc.shown').css('visibility', 'visible');
    $(this).addClass('listener');
    $('#overlay.listener').click(function(){
      $('#overlay, .modal-cont:not(.popup-desc)').fadeOut();
      $('.popup-desc').removeClass('shown');
      $('#mob-cont, #btn-menu').removeClass('active');
      $(this).removeClass('listener');
    });
  });
});


$('.work-popup-close').off();
$('.work-popup-close').click(function(e){
  $(this).parents('.work-popup').fadeOut();
  $('.popup-desc.shown').css('visibility', 'visible');
  $('#overlay').addClass('listener');
  $('#overlay.listener').click(function(){
    $('#overlay, .modal-cont:not(.popup-desc)').fadeOut();
    $('.popup-desc').removeClass('shown');
    $('#mob-cont, #btn-menu').removeClass('active');
    $(this).removeClass('listener');
  });
});



//попап Заказать рассчет
$('.order-calculate').click(function(e){
  e.stopPropagation();
  $('#calculate-popup, #overlay').fadeIn();
});

//попап Перезвонить
$('.order-recall').click(function(){
  $('#recall-popup, #overlay').fadeIn();
  $(this).parents('.popup-desc').removeClass('shown');
  $('#mob-cont, #btn-menu').removeClass('active');
});

//попап Заказать каталог
$('.catalog-btn').click(function(){
  $('#catalog-popup, #overlay').fadeIn();
});

//радио - другое расположение
$('#other-desc').focus(function(){
  $('.other-desc-radio').prop("checked", true);
});
$('input[name="scheme"]').change(function(){
  if(!$('.other-desc-radio').prop('checked')) {
    $('#other-desc').val('');
  }
});

//размеры кухни в попап - инпуты (не type="num")
$('.num-input').on('keyup', function(){
  this.value = this.value.replace(/[^0-9]/ig,'');
});

//фиксированное меню
var fixNav = function(){
  if(window.innerWidth > 991) {
    var hNavOffset = $('#h-top').outerHeight();
    var pageIsScrolled = $(window).scrollTop();
    if(pageIsScrolled > hNavOffset) {
      $('#h-nav').addClass('fixed');
    } else {
      $('#h-nav').removeClass('fixed');
    }
  } else {
    $('#h-nav').removeClass('fixed');
  };
};
fixNav();
$(window).scroll(fixNav);

//скролл страницы
$('nav a').click(function(){
  var el = $(this).attr('href');
  var dest = $(el).offset().top;
  $('html, body').animate({'scrollTop': dest}, 1000);
  return false;
});

$('a[data-tab]').click(function(){
  var tabNum = $(this).attr('data-tab');
  $('#tab-'+ tabNum +'-anchor').click();
});

//Перекомпоновка окна Описание работы на мобильном
var asideReplace = function(){
  $('.popup-desc-aside').each(function(){
    var thisParent = $(this).parents('.popup-desc-in');
    var elemPlaceBefore = thisParent.find('.similar-block');
    if(window.innerWidth < 768) {
      $(this).insertBefore(elemPlaceBefore);
      $(this).addClass('replaced');
      thisParent.find('.popup-desc-main').addClass('fullwidth');
    } else {
      $(this).appendTo(thisParent);
      $(this).removeClass('replaced');
      thisParent.find('.popup-desc-main').removeClass('fullwidth');
    };
  });
 }; 
asideReplace();
$(window).resize(asideReplace);

//slick.js slider   http://kenwheeler.github.io/slick/
$('#top-slider').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  dots: true,
  appendDots:$('#dots-holder'),
});
$('#top-prev').click(function(){
    $('#top-slider').slick('slickPrev');
});
$('#top-next').click(function(){
    $('#top-slider').slick('slickNext');
});
$('#top-slider').css('opacity', '1');

//слайдер О нас
$('#about-lg-slider').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  asNavFor: '#about-sm-slider',
  dots: false
});
$('#about-prev').click(function(){
    $('#about-lg-slider').slick('slickPrev');
});
$('#about-next').click(function(){
    $('#about-lg-slider').slick('slickNext');
});

$('#about-sm-slider').slick({
  infinite: true,
  slidesToShow: 9,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  dots: false,
  asNavFor: '#about-lg-slider',
  focusOnSelect: true,
  centerMode: true,
  centerPadding: '0px',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 6
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 4,
      }
    }
  ]
});

//слайдер Также покупают
$('.similar-slider').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  dots: false,
  responsive: [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 380,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ]
});
$('.similar-arr.prev').click(function(){
  var relSlider = $(this).parents('.similar-block').find('.similar-slider');
  relSlider.slick('slickPrev');
});
$('.similar-arr.next').click(function(){
  var relSlider = $(this).parents('.similar-block').find('.similar-slider');
  relSlider.slick('slickNext');
});

// табы https://github.com/jellekralt/Responsive-Tabs
$('#tabs-container').responsiveTabs({
  startCollapsed: 'accordion',
  rotate: false
});
$('.r-tabs-accordion-title').click(function(){
    var scrollFit = $(this).offset().top;
    $('html, body').animate({'scrollTop': scrollFit}, 1000);
});

// разделитель групп разрядов
$('.price span').each(function(){
  var str = $(this).text();
  $(this).html(str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
});

// fancybox http://fancyapps.com/fancybox/3/
$('.fancy').fancybox({
  loop: true
});

//Анимация при скролле
var scrollAnim = function(){
  if(window.innerWidth > 767 ) {

    var pageIsScrolled = $(window).scrollTop();
    var windowHeight = $(window).height();
    var scrolledToWindowBottom = pageIsScrolled + windowHeight;
    // flying objects
    $('.e').each(function(i, el){
      var thisPosition = $(this).offset().top;
      var thisVisible = scrolledToWindowBottom - thisPosition;
      if(thisVisible > 0 && thisVisible < windowHeight) {
        $(this).css('transform', 'translateY('+thisVisible/2.2+'px)');
        if(i % 2 == 0) {
          $(this).find('i').css('transform', 'rotate('+thisVisible/2.2+'deg)');
        } else {
          $(this).find('i').css('transform', 'rotate('+ -thisVisible/2.2+'deg)');
        };
      };
    });
  };
};
scrollAnim();
$(window).scroll(scrollAnim).resize(scrollAnim);

// https://github.com/digitalBush/jquery.maskedinput
$('input[type="tel"]').mask("+7 (999) 999-99-99");


//пагинация (фильтры) внутренней
// catalog pagination https://github.com/luis-almeida/jPages
// if($('#pagination-container').length > 0){
//   $("#pagination").jPages({
//     containerID : "pagination-container",
//     perPage: 9,
//   });
// };


});
