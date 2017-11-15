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

});
