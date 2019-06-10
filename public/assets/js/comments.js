//获取评论列表
$.ajax({
    type: 'get',
    url: '/comments',
    success: function(response) {
        console.log(response);
        var html = template('commentListTpl', response);
        $('#tBody').html(html);

        var html = template('pageTal', response);
        $('#pageTplBox').html(html);
    }
})

//分页功能


function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/comments',
        data: { page: page },
        success: function(response) {
            var html = template('commentListTpl', response);
            $('#tBody').html(html);

            var html = template('pageTal', response);
            $('#pageTplBox').html(html);
        }
    })
}

//给批准按钮添加点击事件
$('#tBody').on('click', '.status', function() {
    var id = $(this).attr('data-id');
    var state = $(this).attr('data-state');
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: state == 0 ? 1 : 0
        },
        success: function() {
            location.reload();
        }
    })
})

//给删除按钮添加点击事件
$('#tBody').on('click', '.delete', function() {
    var id = $(this).attr('data-id');
    if (confirm('小主，您要赶我走吗？')) {
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function() {
                location.reload();
            }
        })
    }

})