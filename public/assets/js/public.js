//获取随机推荐
$.ajax({
        type: 'get',
        url: '/posts/random',
        success: function(response) {
            var html = template('randomTpl', { data: response });
            $('#randomBox').html(html);
        }
    })
    //最新评论
$.ajax({
    type: 'get',
    url: '/comments/lasted',
    success: function(response) {
        var html = template('newCommentsTpl', { data: response });
        $('#commentsBox').html(html);
    }
})

// 获取分类
$.ajax({
    type: 'get',
    url: '/categories/',
    success: function(response) {
        var html = template('indexBavTpl', { data: response });
        $('#navBox').html(html);
    }
})

// 从浏览器地址栏获取参数

function getUrlParams(name) {
    var params = location.search.substr(1).split('&');
    for (var i = 0; i < params.length; i++) {
        var data = params[i].split('=')[0];
        if (data == name) {
            return params[i].split('=')[1];
        }
    }
    return -1;
}
//处理时间格式
function formateDate(date) {
    //将传入的时间日期字符串转换成日期对象
    date = new Date(date);
    var year = date.getFullYear();
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var date = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return year + "-" + month + "-" + date;
}
//给搜索表单添加提交事件
$('.searchForm').on('submit', function() {
    var key = $(this).find('.keys').val();
    location.href = 'search.html?key=' + key;
    return false;
})