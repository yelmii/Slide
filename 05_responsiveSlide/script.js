var slideWrapper=$('.slide_wrapper'), //최상위박스
slides=slideWrapper.find('.slides'), //움직일 ul
slide=slides.find('li'), //슬라이드요소
currentIdx=0, //보고있는애
slideCount=slide.length, //슬라이드요소개수
slideWidth=200, //슬라이드요소 너비
slideMargin=30, //슬라이드요소 여백
responsiveMargin,
moveAmt, //움직일 양
maxSlides=3,//보일갯수
newSlides,//사본 슬라이드
newSlidesWidth,//사본 슬라이드의 너비
prevBtn=slideWrapper.find('.prev'),
nextBtn=slideWrapper.find('.next');

newSlidesWidth=slideWidth;
//사본슬라이드 뒤에생성
slides.append(slide.clone().addClass('clone'));
//사본슬라이드 앞에생성
slides.prepend(slide.clone().addClass('clone'));

//가로배열
function slideLayout(sw,sm){
    newSlides=$('.slide_wrapper li');
    moveAmt=sw+sm;
    newSlides.each(function(idx){
        $(this).css({left:moveAmt*idx+'px', width:sw+'px'})
        console.log(idx);
    });
}
slideLayout(slideWidth,slideMargin);
//원본중앙정렬
function setSlidePos(){
    var ulMoveamt=-moveAmt * slideCount+'px';
    console.log(`-moveAmt:${moveAmt}*slideCount:${slideCount}=ulMoveamt${ulMoveamt}`)
    slides.css({transform:'translateX('+ulMoveamt+')'})
}
setSlidePos();
//좌우버튼 슬라이드 작동
nextBtn.click(function(){
    moveSlide(currentIdx+1)
})
prevBtn.click(function(){
    moveSlide(currentIdx-1)
})

//슬라이드 이동함수
function moveSlide(num){
    slides.stop().animate({left:moveAmt*-num+'px'},500,function(){
        if(currentIdx==slideCount || currentIdx==-slideCount){
            slides.css({left:'0px'});
            currentIdx=0
        }
    });
    currentIdx=num;
}

//자동슬라이드
var timer='';
function autoSlide(){
    if(timer==''){
        timer=setInterval(function(){
            moveSlide(currentIdx+1)
        },3000)
    }
};
autoSlide();
function stopSlide(){
    clearInterval(timer);
    timer='';
};
slideWrapper.mouseenter(function(){
    stopSlide();
});
slideWrapper.mouseleave(function(){
    autoSlide();
});

//반응형
$(window).resize(function(){
    if($(this).width()<700){
        responsiveMargin=20;
        newSlidesWidth=(slides.width()-responsiveMargin*(maxSlides-1))/maxSlides;
    }else{
        newSlidesWidth=slideWidth;
        responsiveMargin=slideMargin;
    }
    if($(this).width()<=500){
        newSlidesWidth=slides.width();
        responsiveMargin=0
    }
    slideLayout(newSlidesWidth,responsiveMargin);
    setSlidePos();
})