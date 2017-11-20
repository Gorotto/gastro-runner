

  if ($('#map').length > 0) {
  google.maps.event.addDomListener(window, 'load', init);
  function init() {
      var mapOptions = {

          zoom: 15,
          center: new google.maps.LatLng(49.234728, 28.466794),
          styles: [{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"administrative.neighborhood","elementType":"labels.icon","stylers":[{"visibility":"on"}]}]
      };
      var mapElement = document.getElementById('map');
      var map = new google.maps.Map(mapElement, mapOptions);
      var marker = new google.maps.Marker({
          position: new google.maps.LatLng(49.234728, 28.466794),
          map: map,
          title: 'Snazzy!'
      });
  }
  }

$(document).ready(function(){

  /*spoiler*/
  $(".faq__item--title").click(function (event) {
      $(this).next(".faq__item--hide").slideToggle();
        if(  $(this).children().hasClass('chevron-icon--rotate') ){
           $(this).parent('.faq__item').find('.chevron-icon').removeClass('chevron-icon--rotate');
         }else{
             $(this).parent('.faq__item').find('.chevron-icon').addClass('chevron-icon--rotate');
         }
         return false;
    });
  /*spoiler*/

  /*datetimepicker*/
  if ($('.datepicker-inner').length > 0) {
    $('.datepicker-inner').datetimepicker({
     timepicker:false,
     todayButton: false,
     format:'d.m.Y',
     defaultTime:'00:00'
    });
    jQuery.datetimepicker.setLocale('ru');
  }
  /*datetimepicker*/


  /*Select Box js*/
  $('.drop-menu').click(function () {
          $(this).attr('tabindex', 1).focus();
          $(this).toggleClass('active');
          $(this).find('.dropeddown').slideToggle(300);
      });
      $('.drop-menu').focusout(function () {
          $(this).removeClass('active');
          $(this).find('.dropeddown').slideUp(300);
      });
      $('.drop-menu .dropeddown li').click(function () {
          $(this).parents('.drop-menu').find('span').text($(this).text());
          $(this).parents('.drop-menu').find('input').attr('value', $(this).attr('id'));
      });
  /*End Select Box js*/



  /*modal*/
  var overlay = $('#overlay');
   var open_modal = $('.open_modal');
   var close = $('.modal_close, #overlay');
   var modal = $('.modal_div');

    open_modal.click( function(event){
        event.preventDefault();
        var div = $(this).attr('href');
        overlay.fadeIn(400,
            function(){
                $(div)
                    .css('display', 'block')
                    .animate({opacity: 1}, 200);
        });
    });

    close.click( function(){
           modal // все модальные окна
            .animate({opacity: 0}, 200,
                function(){
                    $(this).css('display', 'none');
                    overlay.fadeOut(400); 
                }
            );
    })

  /*modal*/

  var windowWidth = $(window).width();

  $(".toggle_mnu").click(function () {
      $(".sandwich").toggleClass("active");
  });

  if (windowWidth < 1000) {
      $(".header__menu ul a").click(function () {
          $(".header__menu").fadeOut(500);
          $(".sandwich").toggleClass("active").append("<span>");
      });

      $(".toggle_mnu").click(function () {
          if ($(".header__menu").is(":visible")) {
              $(".header__menu").fadeOut(500);
              $(".header__menu li a").removeClass("fadeInUp animated");
          } else {
              $(".header__menu").fadeIn(500);
              $(".header__menu li a").addClass("fadeInUp animated");
          }
      });
  }

});
