$.ajax({
    type: 'get',
    url: '/posts',
    success: function(response) {
        var html = template('postsTpl', response);
        $("#postsTbody").html(html);
        var pageHtml = template('pageTpl', response);
        $("#pageUl").html(pageHtml);
    }
})

//分页
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: { page: page },
        success: function(response) {
            var html = template('postsTpl', response);
            $("#postsTbody").html(html);
            var pageHtml = template('pageTpl', response);
            $("#pageUl").html(pageHtml);

        }
    })
}
//获取分类
$.ajax({
        type: 'get',
        url: '/categories',
        success: function(response) {
            var html = template('selectTpl', { data: response });
            $('#select').html(html);
        }
    })
    //筛选
$('#selectForm').on('submit', function() {
        var formData = $(this).serialize();
        console.log(formData);
        $.ajax({
                type: 'get',
                url: '/posts',
                data: formData,
                success: function(response) {
                    var html = template('postsTpl', response);
                    $("#postsTbody").html(html);
                    var pageHtml = template('pageTpl', response);
                    $("#pageUl").html(pageHtml);
                }
            })
            //阻止默认提交
        return false;
    })
    //通过事件委托删除
$('#postsTbody').on("click", "#deleteBtn", function() {
    var id = $(this).attr('data-id');
    console.log(id);
    if (confirm('亲，您确定删除吗？')) {
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function() {
                location.reload();
            }
        })
    }

})