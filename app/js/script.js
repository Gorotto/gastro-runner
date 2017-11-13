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
});
