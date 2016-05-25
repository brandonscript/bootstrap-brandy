$("a[href^='#'].sg-nav-link").on('click', function(e) {
   // prevent default anchor click behavior
   e.preventDefault();
   // animate
   $('html, body').animate({
       scrollTop: $(this.hash).offset().top
     }, 500, function(){

       // when done, add hash to url
       // (default click behaviour)
       window.location.hash = this.hash;
     });

});
