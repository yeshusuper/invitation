$(function () {
    var js_typewriter_btn1 = $(".typewriter__btn_1"),
        js_typewriter_btn2 = $(".typewriter__btn_2"),
        js__rocker = $(".js__rocker"),
        js_letter = $(".letter"),
        js_needle = $(".js_needle"),
        js_sound_up = $("#sound_up"),
        js_sound_upend = $("#sound_upend");

    var needle_r = 3, needle_r_start = -66, needle_count = 44;
    setNeedleRotate(js_needle, needle_r_start);
    for (var i = 0; i < needle_count - 1; i++) {
        var n = js_needle.clone();
        js_needle.before(n);
        setNeedleRotate(n, needle_r_start += needle_r);
    }
    var needles = $(".needle"), needlesTimer = null, currentNeedle = null;

    function setNeedleRotate(needle, r) {
        if (r === undefined)
            r = needle.data("rotate")
        else
            needle.data("rotate", r);
        needle.css("transform", "rotate(" + r + "deg)")
    }

    var soundPlaying = false,
        soundLinePlaying = false,
        timerLine = 1;

    js_sound_up.on("ended", function () {
        if (soundPlaying) {
            if (timerLine++ % 2 == 0) {
                soundLinePlaying = false;
                js__rocker.addClass("typewriter__rocker__move");
                setTimeout(function () {
                    js__rocker.removeClass("typewriter__rocker__move");
                }, 200);
                js_sound_upend.get(0).play();
            }
            setTimeout(function () {
                soundPlaying && js_sound_up.get(0).play();
            }, 500)
        }
    });

    js_typewriter_btn1.on("touchstart", function () {
        $(this).addClass("typewriter__btn_1_current");
        soundPlaying = true;
        soundLinePlaying = false;
        js_sound_up.get(0).play();
        writeAnimation();
        return false;
    }).on("touchend", function () {
        $(this).removeClass("typewriter__btn_1_current");
        writeStop();
        return false;
    });
    
    var letterY, letterMaxY = 348, letterMinY = -1409;
    function getLetterBottom() {
        return parseInt(js_letter.css("bottom"));
    }

    function writeAnimation(force) {
        if (force || getLetterBottom() < letterMaxY) {
            animationStop();
            needlesTimer = setInterval(function () {
                if (currentNeedle) {
                    currentNeedle.removeClass("needle_current") && setNeedleRotate(currentNeedle);
                    currentNeedle = null;
                } else {
                    currentNeedle = needles.eq(parseInt(Math.random() * needle_count) - 1)
                        .css("transform", "")
                        .addClass("needle_current");
                }
                var bottom = getLetterBottom();
                if (bottom < letterMaxY) {
                    js_letter.css("bottom", letterMaxY - bottom > 30 ? "+=30px" : letterMaxY);
                } else {
                    writeStop();
                    if(bottom >= letterMaxY)
                        $(".js_address").click();
                }
            }, 200);
        } else {
            js_letter.css("bottom", letterMinY + "px");
            writeAnimation(true);
        }
    }
    function animationStop() {
        needlesTimer && clearInterval(needlesTimer);
        if (currentNeedle) {
            currentNeedle.removeClass("needle_current") && setNeedleRotate(currentNeedle);
            currentNeedle = null;
        }
    }

    function writeStop() {
        soundPlaying = false;
        soundLinePlaying = false;
        try{
            js_sound_up.get(0).pause();
        }catch(ex){}
        animationStop();
    }
    $(".js_address").magnificPopup({
        type: 'image'
    });
    $("img").on("tounchstart,touchend,taphold", function(){ return false; });
});