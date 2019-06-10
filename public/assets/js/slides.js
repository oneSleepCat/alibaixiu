//图片上传及预览
$('#file').on('change', function() {
    var file = this.files[0];
    var formData = new FormData();
    formData.append('image', file);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            $('#hiddenFile').val(response[0].image);
            $('#previewImg').attr('src', response[0].image);
            $('#previewImg').show();
        }
    })
})

$('#addSlidesFormBox').on('submit', '#addSlidesForm', function() {
        var formData = $(this).serialize();
        $.ajax({
                type: 'post',
                url: '/slides',
                data: formData,
                success: function(response) {
                    console.log(response);
                    location.reload();
                }
            })
            //阻止默认提交
        return false;
    })
    //获取轮播图列表
$.ajax({
    type: 'get',
    url: '/slides',
    success: function(response) {
        var html = template('slidesTpl', { data: response });
        $('#tBody').html(html);
    }
})

//删除
$('#tBody').on('click', '#deleteLogin', function() {
    var id = $(this).attr('data-id');
    if (confirm('小主，您要离开我吗？')) {
        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function() {
                location.reload();
            }
        })
    }
})