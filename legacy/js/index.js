function enter() {
    var name = $.trim($('#name').val());
    //console.log("输入框内容: " + name);
    if (is_empty($.trim(name)) || name == "输入框内容") {
        layer.msg("请先输入管道名");
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
    if (!all_work(1, 24)) {
        layer.msg('本页问题没有全部完成，请完成后保存');
        return;
    }
    //console.log(checkValue);
    $(".page1").hide();
    $(".index").show();
    window.scrollTo(0, 0);
}

function SaveAndBack2() {
    if (!all_work(25, 49)) {
        layer.msg('本页问题没有全部完成，请完成后保存');
        return;
    }
    $(".page2").hide();
    $(".index").show();
    window.scrollTo(0, 0);
}

function SaveAndBack3() {
    if (!all_work(50, 68)) {
        layer.msg('本页问题没有全部完成，请完成后保存');
        return;
    }
    $(".page3").hide();
    $(".index").show();
    window.scrollTo(0, 0);
}

function SaveAndBack4() {
    if (!all_work(69, 88)) {
        layer.msg('本页问题没有全部完成，请完成后保存');
        return;
    }
    $(".page4").hide();
    $(".index").show();
    window.scrollTo(0, 0);
}

function SaveAndBack5() {
    if (!all_work(89, 98)) {
        layer.msg('本页问题没有全部完成，请完成后保存');
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
        layer.msg("请先输入管道名");
        return;
    }
    if (!all_work(1, 98)) {
        layer.msg('问题没有全部完成');
        return;
    }
    score = 0;
    score1 = 0;
    score2 = 0;
    score3 = 0;
    score4 = 0;
    score5 = 0;
    score6 = 0;
    for (i = 1; i <= 24; i++) {
        var n = String(i);
        score1 += parseFloat($("#" + n).val());
    }
    for (i = 25; i <= 49; i++) {
        var n = String(i);
        score2 += parseFloat($("#" + n).val());
    }
    for (i = 50; i <= 68; i++) {
        var n = String(i);
        score3 += parseFloat($("#" + n).val());
    }
    for (i = 69; i <= 88; i++) {
        var n = String(i);
        score4 += parseFloat($("#" + n).val());
    }
    for (i = 89; i <= 96; i++) {
        var n = String(i);
        score5 += parseFloat($("#" + n).val());
    }
    for (i = 97; i <= 98; i++) {
        var n = String(i);
        score6 += parseFloat($("#" + n).val());
    }
    score = (0.53 * score1 + 0.30 * score2 + 0.11 * score3 + 0.06 * score4) / (7 / (score5 / score6));
    //alert(name + "\n管段风险评价结果为：" + "第三方破坏" + score1 + "分；腐蚀" + score2 + "分；设计因素" + score3 + "分；误操作因素" + score4 + "分；相对风险综合" + score + "分");
    score = score.toFixed(2);
    score1 = score1.toFixed(2);
    score2 = score2.toFixed(2);
    score3 = score3.toFixed(2);
    score4 = score4.toFixed(2);
    output(score, score1, score2, score3, score4, name)
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
        //console.log(i);
        //console.log(checkValue);
        if (is_empty(checkValue)) {
            return false;
        }
    }
    return true;
}

/**
 * 进入模拟模式
 */
function work_all(a, b) {
    for (i = a; i <= b; i++) {
        var n = String(i);
        $("#" + n).get(0).selectedIndex = 2;;
        //console.log($("#" + n).val());
    }
    //alert("已载入模拟数据，可直接点击计算");

    $("#moni").show();
    layer.msg("已载入模拟数据，可直接点击计算");
}

function output(score, score1, score2, score3, score4, name = '默认') {
    layui.use('layer', function () {
        var layer = layui.layer;
        layer.open({
            type: 1,
            title: [name + '管段风险评价结果为：'],
            closeBtn: 0,
            shadeClose: true,
            skin: 'layui-layer-lanlayui-layer-molv',
            content: '<div style="margin:10px;"><table class="layui-table"><colgroup><col><col></colgroup><thead><tr><th>项目</th><th>分数</th></tr></thead><tbody><tr><td>第三方破坏</td><td>' + score1 + '</td></tr><tr><td>腐蚀</td><td>' + score2 + '</td></tr><tr><td>设计因素</td><td>' + score3 + '</td></tr><tr><td>误操作因素</td><td>' + score4 + '</td></tr><tr><td>相对风险综合</td><td>' + score + '</td></tr></tbody></table></div>'
        });
    });
}