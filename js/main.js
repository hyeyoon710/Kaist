// * main.js를 head 태그에서 연결한 경우 body 요소가 생성 전이라 js가 실행되지 않음
// * 아래의 3가지 방법 중 한 가지를 이용
// window.onload = function() {//js 실행문} => JS
// $(document).ready(function() {//js 실행문}) => jQuery
// script 태그에 defer 속성을 추가 ex) <script defer src="#">

/* Popup */
$('#popup').draggable();
$('.btn_popup_close').click(function(){
  $('#popup').hide();
})

/* header language */
$('.lang_wrap button').click(function(){
  // $('.lang_wrap ul').css({
    //   'display':'flex',
    //   'opacity':'1'
    // })
    // $('.lang_wrap button i').css({
      //   'transform':'rotate(180deg)'
      // })
      $('.lang_wrap button, .lang_wrap ul').toggleClass('open')
    })

/* all menu */
$('.btn_allmenu_open').click(function(){
  $('.allmenu_popup').css({'display':'flex'})
  $('html,body').css({'overflow':'hidden'})
  $('header .search_popup').hide()
})
$('.btn_allmenu_close').click(function(){
  $('.allmenu_popup').hide()
  $('html,body').css({'overflow':'auto'})
  $('header').removeClass('on')
})

/* header 'on' style 추가 */
$('header .btn_search_open').click(function(){
  // 헤더에 on 클래스 추가 / 제거
  $('header').toggleClass('on')
  // search_popup을 보였다 안 보였다
  $('header .search_popup').toggle()
})

// 문서 전체의 스크롤 위치값(초기값 0)이 10이상이 되면
// 헤더 on 클래스를 추가, 다시 0이 되면 on 클래스 제거
//** 여러 상황에서 서로 다른 행동하려면 조건문 if

// 스크롤 위치값 $(window).scrollTop()
$(window).scroll(function(){ //스크롤링이 될 때마다
  if($(window).scrollTop() >= 10) {
    $('header').addClass('on')
  }
  else {
    $('header').removeClass('on')
  }
  // console.log($(window).scrollTop());
})

// #gnb .dep1의 직접자손li에게 마우스 오버 되었을 때
// $('#gnb .dep1>li').mouseover(function(){
//   // gnb에 dep2를 보임
//   $('#gnb .dep2').show()
// })
// $('#gnb .dep1>li').mouseout(function(){
//   // gnb에 dep2를 보임
//   $('#gnb .dep2').hide()
// })

// method(parameter, parameter, parameter, ...)
// hover() <= jQuery 이벤트메소드 : mouseover + mouseout
// click(function(){}), mouseover(function(){})
// hover(function(){}, function(){})
// hover(function(){}, function(){})


$('#gnb .dep1>li').hover(function(){
  $(this).children('.dep2_wrap').stop().slideDown()
  // $(this).children('.dep2_wrap').stop().show();
  $('header').addClass('on')
  }, function(){
  $('#gnb .dep2_wrap').stop().slideUp();
  $('header').removeClass('on')
})

// 패밀리사이트 버튼(.family_wrap>button)을
// 클릭하면 => 이벤트
// 패밀리 리스트(.family_wrap>ul)가
// 보였다안보였다 toggle()
// 위쪽으로 늘었다가 줄어들었다 애니메이션 animate({})
// 보였다(true) 안보였다(false)
let s = false;
$(".family_wrap button").click(function(){
  // $(".family_wrap ul").toggle(500)
  // css({prop : val, prop, : val})

  // if(s == false) { //s가 false와 같은지
  //   $(".family_wrap ul").animate({'height' : '11.5em'})
  //   s = true;
  // }
  // else { //s가 true와 같은지
  //   $(".family_wrap ul").animate({'height' : '0'})
  //   s = false;
  // }
  $('.family_wrap>ul').slideToggle()
  console.log(s)
})

const swiper = new Swiper('.main_swiper',{
  effect: 'fade',
  autoplay: true,
  loop: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
})
function resetProgressBar() {
  const progressBar = document.querySelector('.progress .bar');
  progressBar.style.animation = 'none';  // 애니메이션 초기화
  void progressBar.offsetWidth;          // 리플로우를 트리거해서 애니메이션 리셋
  progressBar.style.animation = '';      // 애니메이션 재적용
  progressBar.style.animationPlayState = 'running'; // 자동 재생 상태에서도 재시작
}

// swiper 네비게이션 버튼 클릭 시 progress bar 리셋하기
document.querySelector('.swiper-button-next').addEventListener('click', resetProgressBar);
document.querySelector('.swiper-button-prev').addEventListener('click', resetProgressBar);

$('.main_visual .auto-play').click(function(){
  $(this).hide();
  $('.main_visual .auto-stop').show()
  swiper.autoplay.start();
  $('.progress .bar').css('animation-play-state', 'running')
})
$('.main_visual .auto-stop').click(function(){
  $(this).hide();
  $('.main_visual .auto-play').show()
  swiper.autoplay.stop();
  $('.progress .bar').css('animation-play-state', 'paused')
})

$('.swiper-pagination span').click(function() {
  // alert($(this).index())
  $('.bar span').css({
    'animation' : 'swiper_flow 3s linear'
  })
})

const facultySwiper = new Swiper('.faculty_swiper',{
  spaceBetween: 40,
  slidesPerView: 'auto',
  autoplay: {
    delay: 0,
  },
  speed: 4000,
  loop: true,
})

// ** News **
// 1. tabs의 li를 클릭했을 때, active 클래스값을 가진 요소
// 2. 해당 li의 속성(attribute) 중 'data-news' 속성의 값을 get
// 3. content_box 중 가져온 'data-news' 속성의 값과 동일한 값을 가진 요소를 찾아서
// 찾은 그 박스를 보여주고, 나머지 박스는 안 보임

$('.news_wrap .tabs li').click(function(){

  $(this).addClass('active');
  $('.news_wrap .tabs li').not(this).removeClass('active'); //.not() -> 제외 할 때 쓰는 메소드

  // index 활용(우선 활용)
  // const i = $(this).index(); //0~4 (index는 0부터 시작)
  // $('.news_wrap .content_box').hide();
  // $('.news_wrap .content_box').eq(i).show() //eq -> 몇 번째 순서

  // $(this).attr('data-news') //이벤트 발생한 요소의 'data-news' 속성을 get
  const tabName = $(this).attr('data-news');
  // console.log(tabName)

  // 변수 tabName의 값을 content_box의 클래스로 찾기
  // index가 동일하지 않은 경우
  // $('.news_wrap .content_box').not('.' + tabName).hide()
  // $('.news_wrap .' + tabName).show()

  // * content_box의 data-news 속성을 이용
  // content_box 중 'data-news' 속성의 값과 변수 tabName의 값이 동일한 요소를 찾아서
  $('.news_wrap .content_box').hide();
  $('.news_wrap .content_box').filter('[data-news = ' + tabName + ']').show();

})

//sample
// const samp = 'btn_news_more';
// $('.news_wrap .' + samp).css({'background' : 'pink'})


// 원래는 DB에서 게시글이 있는지 없는지 확인 => 개발자영역
// ul에게 li자손의 존재여부 확인

// sub - location - button
// let isShow = false;
// $('.sub .lnb_wrap button').click(function(){
//   // 랭귀지, 패밀리사이트의 경우 사용
//   // $('.sub .lnb_wrap ul').hide()
//   // $(this).next().toggle()
//   // $('.sub .lnb_wrap ul').not($(this).next()).hide()
//   // $(this).next().css({'display' : 'flex'})
//   // isShow = (isShow == false) ? true: false;


//   // 클릭한 버튼의 동생 ul의 display 속성이 none와 같다면
//   let a = $(this).next().css('display') // = 클릭한 버튼의 동생 ul의 display 속성의
//   console.log(a);

//   // if(ul의 display : none)
//   if(a == 'none'){
//     $(this).next().css({'display' : 'flex'})
//     $('.sub .lnb_wrap ul').not($(this).next()).hide()
//   } else {
//     $('.sub .lnb_wrap ul').hide()
//   }
// })

$('.sub .lnb_wrap button').click(function(){
  //클릭한 버튼의 동생 ul
  let nextEl = $(this).next()

  //동생 ul의 css 속성 중 display가 none과 같다면
  if(nextEl.css('display') == 'none'){
    nextEl.css('display', 'flex')
    $('.sub .lnb_wrap ul').not(nextEl).css('display' , 'none')
    // $(this).children('i').css('transform' , 'rotate(180deg)')
  } else {
    $('.sub .lnb_wrap ul').css('display' , 'none')
  }
})

let pos = ['main_visual', 'earth_wrap', 'course_wrap', 'faculty_wrap', 'news_wrap']

$('.main_nav a').click(function() {
  let n = $(this).index()
  $('html').animate({
    scrollTop : $(`.${pos[n]}`).offset().top
  })
})

$(window).scroll(function() {
  for(let i = 0; i < pos.length; i++) {
    if($(window).scrollTop() >= $(`.${pos[i]}`).offset().top - 110) {
    $('.main_nav a').removeClass('active')
    $('.main_nav a').eq(i).addClass('active')
    }
  }
})

//*** 섹션마다 스크롤 시 fade 효과
$('.scroll_fade').css({
  opacity: 0,
  transform: 'translateY(30px)',
  transition: 'opacity 0.6s ease, transform 2s ease'

});
$(window).on('scroll', function() {
  $('.scroll_fade').each(function() {
      let windowHeight = $(window).height();
      let scrollTop = $(window).scrollTop();
      let offsetTop = $(this).offset().top;

     //화면의 30% 지점에서 보이도록
     if (scrollTop + windowHeight * 0.7 > offsetTop) {
        $(this).css({
            opacity: 1,
           transform: 'translateY(0)' //원래 위치로 이동
        });
      }
  });
});




