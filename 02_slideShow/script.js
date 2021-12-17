$(function(){
    var interval=1000
    var slideshow=$('.slideshow');
    slideshow.each(function(){
        var container=$(this);
        var timer;
        function switchImg(){
            var anchors=container.find('a');
            var first=anchors.eq(0);
            var second=anchors.eq(1);
            first.fadeOut().appendTo(container);
            second.fadeIn();
        }
        //마우스 호버시 정지/재생
        //움직이고 있는 setInterval을 정지시키려면 이름이 필요함.
        //정지시킬때 clearInterval()사용

        //startTimer()시간마다 실행시켜주는 함수
        function startTimer(){
            timer=setInterval(switchImg,interval);
        }
        function stopTimer(){
            clearInterval(timer);
        }
        container.find('a').hover(
            function(){stopTimer();},
            function(){startTimer();}
        );
        startTimer();
    });
})