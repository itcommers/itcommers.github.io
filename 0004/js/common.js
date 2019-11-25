$(document).ready(function(){

//фиксированный хедер и расположение кнопки корзины
$('.cart-link').css('opacity', '1');
var headerSticky = function(){
  if($(window).outerWidth() > 767) {
    $('#cart-link').removeClass('fixed');
    var headerTopHeight = $('#header-top').outerHeight();
    var headerBottomHeight = $('#header-bottom').outerHeight();
    if($(window).scrollTop() > headerTopHeight) {
      $('.header-bottom').addClass('sticky');
      $('body').css('padding-top', headerBottomHeight + 'px');
      $('#cart-link').appendTo('#header-bottom-wrapper');
    } else {
      $('.header-bottom').removeClass('sticky');
      $('body').css('padding-top', '0');
      $('#cart-link').insertBefore('#auth-btn');
    }
  } else {
    $('#cart-link').appendTo('body').addClass('fixed');
    $('body').css('padding-top', '0');
  };
};
headerSticky();
$(window).scroll(headerSticky).resize(headerSticky);

// моб навигация (<=767px)
$('.btn-menu').click(function(){
  $('#overlay').fadeIn();
  $('.tooltip').slideUp();
  $('#mob-cont').addClass('active');
});
$('#mob-nav a, #overlay, #close').click(function(){
  $('#overlay').fadeOut();
  $('#mob-cont').removeClass('active');
});
$('#mob-cont .call-btn, #mob-cont .map-call').click(function(){
   $('#mob-cont').removeClass('active');
});

// смена изображения при выборе диаметра
$('.size-switch input[type="radio"]').change(function(){
  var thisVal = $(this).val();
  var thisItemImg = $(this).parents('.item, .card-outer').find('.product-img');
  thisItemImg.attr('src', 'img/pizza/' + thisVal +'.jpg');
});

// аккордеон вакансий
$('.vac-heading').click(function(){
  if($(this).hasClass('active')) {
    $(this).parent('li').find('ul').slideUp();
    $(this).removeClass('active');
  } else {
    $('.vac-accordion').find('ul').slideUp();
    $('.vac-heading.active').removeClass('active');
    $(this).addClass('active');
    $(this).parent('li').find('ul').slideDown();
  }
});

// модальные окна
$('.call-btn').click(function(){
  $('#overlay').css('display', 'block');
  $('#callback-modal').css('display', 'block');
});
$('#auth-btn').click(function(){
  $('#overlay').css('display', 'block');
  $('#authorization-modal').css('display', 'block');
});
$('#to-registration').click(function(){
  $('#authorization-modal').css('display', 'none');
  $('#registration-modal').delay(400).css('display', 'block');
});
$('#to-authorization').click(function(){
  $('#registration-modal').css('display', 'none');
  $('#authorization-modal').delay(400).css('display', 'block');
});
$('#to-recover').click(function(){
  $('#authorization-modal').css('display', 'none');
  $('#recover-modal').delay(400).css('display', 'block');
});
$('#comment-btn').click(function(){
  $('#overlay').css('display', 'block');
  $('#comment-modal').css('display', 'block');
});
$('.map-call').click(function(){
  $('#map-modal').css('display', 'block');
  $('#overlay').css('display', 'block');
});
$('#map-close').click(function(){
  $('#map-modal').css('display', 'none');
  $('#overlay').css('display', 'none');
});


// тултипы (добавить/удалить ингридиенты; информация о товаре)
$('.ingredients-btn').click(function(){
  $(this).parents('.ingredients-control').find('.ingredients-tooltip').slideToggle();
});
$('.ingr-counter .plus').click(function(){
  var thisQuantity = $(this).parents('.ingr-counter-cont').find('.ingr-quant');
  var thisQuantityNum = parseInt(thisQuantity.html());
  thisQuantity.html(thisQuantityNum + 1);
  $(this).parents('.ingr-counter-cont').find('.minus, .ingr-quant').css('display', 'inline-block');
});
$('.ingr-counter .minus').click(function(){
  var thisQuantity = $(this).parents('.ingr-counter-cont').find('.ingr-quant');
  var thisQuantityNum = parseInt(thisQuantity.html());
  if(thisQuantityNum > 0) {
    thisQuantity.html(thisQuantityNum - 1);
  };
  if(thisQuantityNum == 1) {
      $(this).parents('.ingr-counter-cont').find('.minus, .ingr-quant').css('display', 'none');
    }
});
$('.info-btn').click(function(){
  $(this).parents('.product-heading').find('.info-tooltip').slideToggle();
  $(this).toggleClass('active');
});
$('.tooltip-close').click(function(){
  $(this).parents('.tooltip').slideUp();
  $(this).parents('.product-heading').find('.info-btn').removeClass('active');
});
$('#header-bottom').click(function(){
  $('.tooltip').slideUp();
  $('#overlay').fadeOut();
});

// товар - анимация перемещения в корзину
$('.to-cart').click(function(e){
  e.preventDefault();
  var cartIconPosX = $('#cart-link').offset().left;
  var cartIconPosY = $('#cart-link').offset().top;
  var thisItemImg = $(this).parents('.item, .card-outer').find('.product-img');
  var imgHeight = thisItemImg.outerHeight();
  var imgWidth = thisItemImg.outerWidth();
  var btnWidth = $(this).outerWidth();
  var offsetTop = $(this).offset().top - imgHeight;
  var offsetLeft = $(this).offset().left - imgWidth + btnWidth/2;
  thisItemImg.clone()
  .css({'position': 'absolute', 'z-index': '20', top: offsetTop, left: offsetLeft})
  .appendTo('body')
  .animate({
    top: cartIconPosY +8,
    left: cartIconPosX + 8,
    width: 40,
    height: 40
  }, 300, 'linear', function(){
    $(this).remove();
  });
});

//счетчик при нажатии "в корзину"
$('.to-cart').click(function(e){
  e.preventDefault();
  $(this).css('display', 'none');
  $(this).parents('.to-cart-wrap').find('.cart-counter-wrap').css('display', 'block');
});
$('.cart-plus').click(function(){
  var thisCartQuantity = $(this).parents('.cart-counter').find('.cart-quant');
  var thisCartQuantityNum = parseInt(thisCartQuantity.html());
  if(thisCartQuantityNum <90) {
    thisCartQuantity.html(thisCartQuantityNum + 1);
  };
});
$('.cart-minus').click(function(){
  var thisCartQuantity = $(this).parents('.cart-counter').find('.cart-quant');
  var thisCartQuantityNum = parseInt(thisCartQuantity.html());
  if(thisCartQuantityNum > 1) {
    thisCartQuantity.html(thisCartQuantityNum - 1);
  } else {
    $(this).parents('.cart-counter-wrap').css('display', 'none');
    $(this).parents('.to-cart-wrap').find('.to-cart').css('display', 'block');
  };
});

// фильтры каталога
$('#choose-btn').click(function(){
  $('#components-dropdown').slideToggle();
});
$('#components-close').click(function(){
  $('#components-dropdown').slideUp();
});
$('#components-list input[type="checkbox"]').change(function(){
  var thisValue = $(this).val();
  if($(this).prop('checked')) {
    var thisHtml = $(this).siblings('label').html();
    $('#chosen-list').append('<li class="chosen-item" data-component="' + thisValue + '"><span class="chosen-name">' + thisHtml + '</span><span class="cancel-chosen">X</span></li>');
  } else {
    $('#chosen-list li[data-component="' + thisValue + '"]').remove();
  }
  $('.cancel-chosen').click(function(){
    var thisData = $(this).parents('.chosen-item').attr('data-component');
    $('#components-list input[type="checkbox"][value="' + thisData + '"]').prop('checked', false);
    $(this).parents('.chosen-item').remove();
  });
});
$('#filter-reset').click(function(){
  $('#components-list input[type="checkbox"]').prop('checked', false);
  $('.chosen-item').remove();
});
$('#filter-apply').click(function(){
  $('#components-dropdown').slideUp();
});

// количество единицы товара (страница корзины), удаление строки
$('.cart-item-quant .plus').click(function(){
  var thisQuantity = $(this).parents('.cart-item-quant').find('.current-quant');
  var thisQuantityNum = parseInt(thisQuantity.html());
  if(thisQuantityNum <90) {
    thisQuantity.html(thisQuantityNum + 1);
  };
});
$('.cart-item-quant .minus').click(function(){
  var thisQuantity = $(this).parents('.cart-item-quant').find('.current-quant');
  var thisQuantityNum = parseInt(thisQuantity.html());
  if(thisQuantityNum > 1) {
    thisQuantity.html(thisQuantityNum - 1);
  };
});
$('.cart-item-del').click(function(){
  $(this).parents('.cart-item').remove();
});

//decoration of current page link in navigation
$('a').each(function(){
  var location = window.location.href;
  var link = this.href
  if(location == link) {
    $(this).addClass('active');
  };
});

// overlay click events
$('#overlay').click(function(){
  $('.modal').css('display', 'none');
  $(this).css('display', 'none');
});


// masked phone input https://github.com/digitalBush/jquery.maskedinput
$('input[type="tel"]').mask("+7 (999) 999-99-99");
$('#date-input').mask("99.99.9999");

});
