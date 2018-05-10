var autoCloseMS = 3000, jdURL = "https://sale.jd.com/m/act/FkV306G1lvD.html", timer, counter = 0;
function showRule() {
    // trackEvent("click", "Button", "start")
    $(".index").fadeOut(1000);
    $('.rule').fadeIn(10);
    aniRule();
    setTimeout(closerule, 4000)
    //$('#r_start').one('click',function(){
    //closerule();
    //});
}


function showBtn2() {
    setTimeout(function () {
        $(".status").show(); TweenMax.to(".status", 1, { css: { left: '0' }, ease: Elastic.easeOut.config(1, 0.7) });

        $("#BTN2").show(); TweenMax.to("#BTN2", 1, { css: { right: '2vmin' }, ease: Elastic.easeOut.config(1, 0.7), delay: 0.6 });
    }, 1500)

}

function closeBtn2() {
    $(".status").fadeOut(500);
    $("#BTN2").fadeOut(500)
}

function showGo() {
    $(".index").show();
    TweenMax.to(".index div", 1.5, { css: { transform: 'scale(1,1)' }, ease: Elastic.easeOut.config(1, 0.7) });
}


$(document).ready(function () {
    $('.ending div:eq(1) img:eq(1)').one('click', function () {
        // trackEvent('click', 'Button', 'again')
        setTimeout(function () { window.location.href = jdURL }, 300);
    });

    $('.ending div:eq(1) img:eq(0)').one('click', function () {
        // trackEvent('click', 'Button', 'lottery')
        // setTimeout(function () { window.location.href = h5URL + "?" + Math.random() }, 300);
        setTimeout(function () { window.location.href = window.location.href + "?" + Math.random() }, 300);
    });
});

function closerule() {
    aniCloseRule()
    setTimeout(function () { playFrame(scenes["INDEX"].camera, 'INTRO') }, 2000)
}

function showCard(cid) {
    createjs.Sound.play("sfxCard");
    // $('.card div img').attr('src', imagePath + 'assets/images/' + cid + '.png');
    $('.card div img').attr('src',  'assets/images/' + cid + '.png');
    $('.card').fadeIn(500);
    aniCard();
    timer = setTimeout(closecard, autoCloseMS);
    $('.card').one('click', function () {
        closecard();
    });

}

function aniRule() {

    $("#r_click img").addClass("RULECLICKANI");
    TweenMax.to("#r_mobile", 1.5, {
        css: { transform: 'scale(1,1)' }, ease: Elastic.easeOut.config(1, 0.7), delay: 0.3, onComplete: function () {
            $("#r_mobile").addClass("RULEQQANI")
        }
    });
    TweenMax.to("#r_rule", 1.5, { css: { transform: 'scale(1,1)' }, ease: Elastic.easeOut.config(1, 0.7) });
    TweenMax.to("#r_start", 1.5, { css: { transform: 'scale(1,1)' }, ease: Elastic.easeOut.config(1, 0.7), delay: 0.6 });
}

function aniCloseRule() {
    $('#LOGO').fadeOut(500);
    $("#r_click img").removeClass("RULECLICKANI");
    $("#r_mobile").removeClass("RULEQQANI")
    TweenMax.to("#r_mobile", 1, { css: { top: '-500vh' }, ease: Back.easeIn.config(0.7, 0.5) });
    TweenMax.to("#r_rule", 1, { css: { top: '-100vh' }, ease: Back.easeIn.config(0.7, 0.5), delay: 0.2 });
    TweenMax.to("#r_start", 1, {
        css: { top: '-100vh' }, ease: Back.easeIn.config(0.7, 0.5), delay: 0.4, onComplete: function () {
            $('.rule').fadeOut(500);
            timer = setTimeout(aniRuleReset, 500);
        }
    });
}

function aniRuleReset() {
    clearTimeout(timer);
    TweenMax.set("#r_mobile", { clearProps: "all" });
    TweenMax.set("#r_rule", { clearProps: "all" });
    TweenMax.set("#r_start", { clearProps: "all" });
}

function aniCard() {
    TweenMax.to("#c_feature", 1.5, { css: { transform: 'scale(1,1)' }, ease: Elastic.easeOut.config(1, 0.7) });
    TweenMax.to("#c_snow", 1.5, { css: { transform: 'scale(1,1)' }, ease: Elastic.easeOut.config(1, 0.7) });

}

function aniCollectCard() {
    $("#CARD").removeClass("CARDANI");
    TweenMax.to("#c_feature", .8, {
        css: { transform: 'scale(0.1,0.1)', bottom: '-5vh', left: '-35vw' }, ease: Power3.easeInOut, onComplete: function () {
            $('.card div').css({ display: 'none' });
            $('.card').fadeOut(200);
            clearTimeout(timer);
            $("#CARD").addClass("CARDANI")
            counter = Math.min(++counter, 25);
            $('.status div:eq(1) span:eq(0)').html(counter);
            $('.ending div:eq(2)').html(counter);
            timer = setTimeout(aniCollectCardReset, 500);
            speedTo(1)
            freeMouse()
        }
    });
    TweenMax.to("#c_snow", .8, { css: { transform: 'scale(0.1,0.1)', bottom: '-5vh', left: '-45vw' }, ease: Power3.easeInOut });
}

function aniCollectCardReset() {
    clearTimeout(timer);
    TweenMax.set("#c_feature", { clearProps: "all" });
    TweenMax.set("#c_snow", { clearProps: "all" });
}

function closecard() {
    aniCollectCard();

}

function closeending() {
    $('.ending').fadeOut(500);
    //再加入繼續玩動畫,跳JD
}

var bgmOpened = true
function closeBGM() {
    bgm.pause();
    $("#BTN1").css({ backgroundPosition: "0%" })
    bgmOpened = false;
}

function openBGM() {
    bgm.play()
    $("#BTN1").css({ backgroundPosition: "100%" })
    bgmOpened = true;
}

function audioAutoPlay() {
    bgm = document.getElementById("bgm-music");
    bgm.play();
    document.addEventListener("WeixinJSBridgeReady", function () {
        bgm.play();
    });
}

$('#BTN1').bind('click', function () {
    if (bgmOpened) {
        closeBGM()
    } else {
        openBGM()
    }
});
audioAutoPlay();

function showRot() {
    if ($(window).width() > $(window).height()) {
        $("#ROT").show()
    } else {
        $("#ROT").hide()
    }
}
showRot()
window.addEventListener('resize', showRot)

var userAgent = window.navigator.userAgent,
platform = window.navigator.platform,
macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
iosPlatforms = ['iPhone', 'iPad', 'iPod']
os = 'win'
if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'mac';
} else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'ios';
} else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'win';
} else if (/Android/.test(userAgent)) {
    os = 'android';
} else if (!os && /Linux/.test(platform)) {
    os = 'linux';
}

document.onTouchMove = function(){return false}
function trackBtn(s1,s2){
    console.log(s1, s2)
}