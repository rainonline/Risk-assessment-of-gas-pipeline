function enter() {
    var name = $.trim($('#name').val());
    //console.log("输入框内容: " + name);
    if (is_empty($.trim(name)) || name == "输入框内容") {
        alert("请先输入管道名");
        return;
    }

    $(".hello").hide();
    $(".index").show();

}

function show_page1() {
    $(".index").hide();
    $(".page1").show();
}

function show_page2() {
    $(".index").hide();
    $(".page2").show();
}

function show_page3() {
    $(".index").hide();
    $(".page3").show();
}

function show_page4() {
    $(".index").hide();
    $(".page4").show();
}

function show_page5() {
    $(".index").hide();
    $(".page5").show();
}

function SaveAndBack1() {
    if (!all_work(1, 27)) {
        alert('本页问题没有全部完成，请完成后保存');
        return;
    }
    //console.log(checkValue);
    $(".page1").hide();
    $(".index").show();
    window.scrollTo(0, 0);
}

function SaveAndBack2() {
    if (!all_work(28, 54)) {
        alert('本页问题没有全部完成，请完成后保存');
        return;
    }
    $(".page2").hide();
    $(".index").show();
    window.scrollTo(0, 0);
}

function SaveAndBack3() {
    if (!all_work(55, 77)) {
        alert('本页问题没有全部完成，请完成后保存');
        return;
    }
    $(".page3").hide();
    $(".index").show();
    window.scrollTo(0, 0);
}

function SaveAndBack4() {
    if (!all_work(78, 98)) {
        alert('本页问题没有全部完成，请完成后保存');
        return;
    }
    $(".page4").hide();
    $(".index").show();
    window.scrollTo(0, 0);
}

function SaveAndBack5() {
    if (!all_work(99, 108)) {
        alert('本页问题没有全部完成，请完成后保存');
        return;
    }
    $(".page5").hide();
    $(".index").show();
    window.scrollTo(0, 0);
}

function back1() {
    $(".page1").hide();
    $(".index").show();
    window.scrollTo(0, 0);
}

function back2() {
    $(".page2").hide();
    $(".index").show();
    window.scrollTo(0, 0);
}

function back3() {
    $(".page3").hide();
    $(".index").show();
    window.scrollTo(0, 0);
}

function back4() {
    $(".page4").hide();
    $(".index").show();
    window.scrollTo(0, 0);
}

function back5() {
    $(".page5").hide();
    $(".index").show();
    window.scrollTo(0, 0);
}

function figureOut() {
    var name = $.trim($('#name').val());
    //console.log("输入框内容: " + name);
    if (is_empty($.trim(name)) || name == "输入框内容") {
        alert("请先输入管道名");
        return;
    }
    if (!all_work(1, 108)) {
        alert('问题没有全部完成');
        return;
    }
    score = 0;
    for (i = 1; i <= 108; i++) {
        var n = String(i);
        score += parseFloat($("#" + n).val());
        console.log("score= " + score);
    }
    alert("你的得分为" + score);
    return;

}

/**
 * 判断变量是否为空
 * @param {*} value
 * @return 为空返回true，不为空返回false
 */
function is_empty(value) {
    if (value == null || value == undefined || value == "") {
        return true;
    } else {
        return false;
    }
}

/**
 * 判断指定范围内select是否取到值
 * @param {int} a  启示id
 * @param {int} b  结束id
 * @return 全部取到值返回true，否则返回false
 */
function all_work(a, b) {
    for (i = a; i <= b; i++) {
        //alert(jQuery.type(i));
        var n = String(i);
        var checkValue = $("#" + n).val();
        console.log(i);
        console.log(checkValue);
        if (is_empty(checkValue)) {
            return false;
        }
    }
    return true;
}

