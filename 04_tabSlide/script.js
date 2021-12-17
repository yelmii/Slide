$(function () {
    //탭버튼별 카운트 변수
    var cnt = [0, 0, 0, 0];
    //슬라이드 너비
    var slideW = 400;
    //current 현재 보여지는 슬라이드 변수
    var c = 0;
    cnt[c] = 0; 
    //탭버튼 클릭이벤트
    $('.tab-button').each(function (idx) {
        $(this).on({
            click: function () {
                c = idx;
                console.log(c, cnt);
                //페이지버튼(인디케이터) 초기값
                pageEventFn(cnt[c])
                //슬라이드 탭버튼별 그룹
                $('.slide-view').stop().hide();
                $('.slide-view').eq(c).stop().fadeIn();
                //탭버튼 활성화
                $('.tab-button').removeClass('addTab');
                $(this).addClass('addTab');

            }
        })
    });
    //메인슬라이드 이동
    function mainSlideFn() {
        $('.slide-wrap').eq(c).stop()
            .animate({
                    left: -(slideW * cnt[c])
                }, 1000,
                function () {
                    
                    if (cnt[c] > 5) {
                        cnt[c] = 0
                    }console.log(cnt[c]);
                    if (cnt[c] < 0) {
                        cnt[c] = 5
                    }
                    $('.slide-wrap').eq(c).stop().animate({
                        left: -(slideW * cnt[c])
                    }, 0);
                });
        pageEventFn(cnt[c]);
    }

    //다음카운트
    function nextCountFn() {
        cnt[c]++;
        mainSlideFn()
    }
    //이전카운트
    function prevCountFn() {
        cnt[c]--;
        mainSlideFn()
    }
    $('.next-btn').on({
        click: function () {
            if (!$('.slide-wrap').eq(c).is(':animated')) {
                nextCountFn();
            }
        }
    })
    $('.prev-btn').on({
        click: function () {
            if (!$('.slide-wrap').eq(c).is(':animated')) {
                prevCountFn();
            }
        }
    })
    //pageEvent 인디케이터
    function pageEventFn(z) {
        if (z > 5) {
            z = 0
        }
        if (z < 0) {
            z = 5
        }
        $('.page-btn').removeClass('addPage');
        $('.page-btn').eq(z).addClass('addPage');
    }

    //페이지버튼 클릭이벤트
    $('.page-btn').each(function (idx) {
        $(this).on({
            click: function () {                
                cnt[c] = idx;
                mainSlideFn();
            }
        })
    });
    /* 터치스와이프 */
    $('.slide-container').swipe({
        swipeLeft:function(){
            if(!$('.slide-wrap').eq(c).is(':animated')){
                nextCountFn();
            }
        },
        swipeRight:function(){
            if(!$('.slide-wrap').eq(c).is(':animated')){
                prevCountFn();
            }
        }
        
    })















});