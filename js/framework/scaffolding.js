(function($){
    $("a[href^='#'].sg-nav-link").on('click', function(e) {
        // prevent default anchor click behavior
        e.preventDefault()
        var hash = this.hash.replace('#','')
        // animate
        $('html, body').animate({
            scrollTop: $(this.hash).offset().top
        }, 'slow', function() {
            // when done, add hash to url
            // (default click behaviour)
            window.location.hash = hash
        })
    })
}(jQuery))