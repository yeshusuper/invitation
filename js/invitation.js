$(function () {
    var js_typewriter_btn1 = $(".typewriter__btn_1"),
        js_btn1 = $(".js_btn1"),
        js_btn1_current = $(".js_btn1_current"),
        js_btn2 = $(".js_btn2"),
        js_btn2_current = $(".js_btn2_current"),
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
                }, 500)
                js_sound_upend.get(0).play();
            } else
                js_sound_up.get(0).play();
        }
    });
    js_sound_upend.on("ended", function () {
        if (soundPlaying)
            js_sound_up.get(0).play();
    });

    js_typewriter_btn1.on("touchstart", function () {
        js_btn1.hide();
        js_btn1_current.show();
        soundPlaying = true;
        soundLinePlaying = false;
        js_sound_up.get(0).play();
        writeAnimation();
    }).on("touchend", function () {
        js_btn1.show();
        js_btn1_current.hide();
        soundPlaying = false;
        soundLinePlaying = false;
        js_sound_up.get(0).pause();
        js_letter.stop(true, false);
        needlesTimer && clearInterval(needlesTimer);
        currentNeedle && currentNeedle.removeClass("needle_current") && setNeedleRotate(currentNeedle);
    });
    function writeAnimation() {
        var bottom = parseInt(js_letter.css("bottom"));
        var v = (412 - bottom) * 10;
        js_letter.stop(true, false).animate({ bottom: "412px" }, v, "linear", function () {
            soundPlaying = false;
        });
        needlesTimer && clearInterval(needlesTimer);
        needlesTimer = setInterval(function () {
            currentNeedle && currentNeedle.removeClass("needle_current") && setNeedleRotate(currentNeedle);
            currentNeedle = needles.eq(parseInt(Math.random() * needle_count) - 1)
                .css("transform", "")
                .addClass("needle_current");
        }, 200);
    }

    js_btn2.on("touchstart", function () {
        js_btn2.hide();
        js_btn2_current.show();

    });
    js_btn2_current.on("touchend", function () {
        js_btn2.show();
        js_btn2_current.hide();
    });
    $(".js_address").magnificPopup({
        type: 'image'
    });
});