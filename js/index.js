


(function ($) {
    var GETCLASSES = "http://imoocnote.calfnote.com/inter/getClasses.php";

    // 自定义helper 处理equal判断逻辑
    // 参数一：自定义helper的名称，
    // 参数二：定义function 方法的参数 就是在hbs页面中{{#equal v1 v2}}，
    // 如果只有一个v1的话 function函数定义的形参数就是1个
    // function 的第二个参数options  如果定义的是块helper就需要传递该参数  options是一些配置项
    Handlebars.registerHelper("equal", function (v1, v2, options) {
        if (v1 == v2) {
            //fn 是个函数 函数执行的结果就是编译的结果
            return options.fn(this);
        } else {
            //inverse 就是取反 对应hbs模板中的{{#else}}
            return options.inverse(this);
        }
    });

    // 判断学习时间 的时长 显示不同的style样式
    Handlebars.registerHelper("long", function (v1, options) {
        if (v1.indexOf('小时') != -1) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });


    $.getJSON(GETCLASSES, {
        curPage: 1
    },
        function (data, textStatus, jqXHR) {
            renderTemplate("#classitem", "#classes", data.data)
            console.log(formatPag(data))
            renderTemplate("#pag-template", "#pag", formatPag(data))
        }
    );


    /**
     * 生成handlebars模板页面
     * @param {*} hbsId 模板引擎界面的id
     * @param {*} el    模板引擎生成的页面挂载的元素
     * @param {*} data  模板引擎生成HTML页面的数据源
     */
    function renderTemplate(hbsId, el, data) {
        var t = $(hbsId).html();
        var f = Handlebars.compile(t);
        var html = f(data);
        $(el).html(html);
    }

    function formatPag(pageData) {
        var arr = [];
        var total = parseInt(pageData.totalCount);
        var cur = parseInt(pageData.curPage);
        // 处理到首页的逻辑
        var toLeft = {};
        toLeft.index = 1;
        toLeft.text = '&laquo;';
        if (cur != 1) {
            toLeft.clickable = true;
        }
        arr.push(toLeft);
        // 处理到上一页的逻辑
        var pre = {};
        pre.index = cur - 1;
        pre.text = '&lsaquo;';
        if (cur != 1) {
            pre.clickable = true;
        }
        arr.push(pre);
        // 处理到cur页前的逻辑
        if (cur <= 5) {
            for (var i = 1; i < cur; i++) {
                var pag = {};
                pag.text = i;
                pag.index = i;
                pag.clickable = true;
                arr.push(pag);
            }
        } else {
            // 如果cur>5，那么cur前的页面显示_
            var pag = {};
            pag.text = 1;
            pag.index = 1;
            pag.clickable = true;
            arr.push(pag);
            var pag = {};
            pag.text = '...';
            arr.push(pag);
            for (var i = cur - 2; i < cur; i++) {
                var pag = {};
                pag.text = i;
                pag.index = i;
                pag.clickable = true;
                arr.push(pag);
            }
        }
        // 处理到cur页的逻辑
        var pag = {};
        pag.text = cur;
        pag.index = cur;
        pag.cur = true;
        arr.push(pag);
        // 处理到cur页后到逻辑
        if (cur >= total - 4) {
            for (var i = cur + 1; i <= total; i++) {
                var pag = {};
                pag.text = i;
                pag.index = i;
                pag.clickable = true;
                arr.push(pag);
            }
        } else {
            // 如果cur<total - 4，那么cur后到页要显示_
            for (var i = cur + 1; i <= cur + 2; i++) {
                var pag = {};
                pag.text = i;
                pag.index = i;
                pag.clickable = true;
                arr.push(pag);
            }
            var pag = {};
            pag.text = '...';
            arr.push(pag);
            var pag = {};
            pag.text = total;
            pag.index = total;
            pag.clickable = true;
            arr.push(pag);
        }
        // 处理到下一页的逻辑
        var next = {};
        next.index = cur + 1;
        next.text = '&rsaquo;';
        if (cur != total) {
            next.clickable = true;
        }
        arr.push(next);
        // 处理到尾页的逻辑
        var toRight = {};
        toRight.index = total;
        toRight.text = '&raquo;';
        if (cur != total) {
            toRight.clickable = true;
        }
        arr.push(toRight);
        //console.log(arr);
        return arr;
    };





})(jQuery)