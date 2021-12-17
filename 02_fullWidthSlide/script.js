$(function(){
    /* 
        좌우로 움직이기
        슬라이드 배너 변수로 잡기 visual
        현재 보고있는 이미지 current
        마우스 올리면 정지시킬 이름 setIntervalId
    */
    var visual=$('.slide>ul.slideUl>li');
    var current=0;
    var setIntervalId;
    var leftBtn=$('.btnImg .prev');
    var rightBtn=$('.btnImg .next');
    var button=$('.buttonList>li');
    /* 버튼이 슬라이드의 index를 얻어와서 바뀌어야함
        1. 시간마다 바뀔때 index <- 슬라이드한테 얻어옴
        2. 자기를 클릭했을때 index -> 슬라이드한테 전달
        3. 좌우버튼을 클릭할 때 index <-
    */
    //시간마다 슬라이드를 (움직이는) 함수
    function timer(){
        setIntervalId=setInterval(function(){
            //현재 보고있는 슬라이드 요소의 index 번호
            var prev=visual.eq(current);
            var prevBtn=button.eq(current);
            //움직이는 함수 move
            move(prev,0,'-100%');
            prevBtn.removeClass('on');
            current++;
            if(current==visual.length){current=0}
            var next=visual.eq(current);
            var nextBtn=button.eq(current);
            move(next,'100%',0);
            nextBtn.addClass('on');
        },3000);
    };
    timer();
    function move(target,start,end){
        target.css('left',start).stop().animate({left:end},500)
    };
    //좌우버튼 클릭시
    rightBtn.click(function(){
        var prev=visual.eq(current);
        var prevBtn=button.eq(current);
        move(prev,0,'-100%');
        prevBtn.removeClass('on');
        current++;
        if(current==visual.length){current=0}
        var next=visual.eq(current);
        var nextBtn=button.eq(current);
        move(next,'100%',0);
        nextBtn.addClass('on')
    });
    leftBtn.click(function(){
        var prev=visual.eq(current);
        var prevBtn=button.eq(current);
        move(prev,0,'100%');
        prevBtn.removeClass('on');
        current--;
        if(current == -visual.length){current=0}
        var next=visual.eq(current);
        var nextBtn=button.eq(current);
        move(next,'-100%','0');
        nextBtn.addClass('on');
    });
    
    button.click(function(){
        var tg=$(this);
        var i=tg.index();
        button.removeClass('on');
        tg.addClass('on');
        move1(i);
    });
    function move1(i){
        if(current==i) return;
        var currentEl=visual.eq(current);
        var nextEl=visual.eq(i);
        currentEl.css('left',0).stop().animate({left:'-100%'},500);
        nextEl.css('left','100%').stop().animate({left:'0%'},500);
        current=i;
    };
    $('#wrap').on({
        mouseover:function(){
            clearInterval(setIntervalId);
        },
        mouseout:function(){
            timer();
        }
    });
});