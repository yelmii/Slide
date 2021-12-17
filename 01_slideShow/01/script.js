$(function(){
    var interval=3000
    var slideshow=$('.slideshow');
    slideshow.each(function(){
        var container=$(this);
        function switchImg(){
            var imgs=container.find('img');
            var first=imgs.eq(0);
            var second=imgs.eq(1);
            first.fadeOut().appendTo(container);
            second.fadeIn();
        }
        setInterval(switchImg,interval)
    })
})