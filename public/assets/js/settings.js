//网站图标上传及预览
$('#setBox').on('change', '#file', function() {
        var file = this.files[0];
        var formData = new FormData();
        formData.append('logo', file);
        $.ajax({
            type: 'post',
            url: '/upload',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                console.log(response);
                $('#previewImg').prop('src', response[0].logo);
                $('#hiddenFile').val(response[0].logo);
            }
        })
    })
    //网站配置
$('#setBox').on('submit', '#setForm', function() {
    var formData = $(this).serialize();
    console.log(formData);
    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function(re) {
            location.reload();
        }
    })
    return false;
})

//获取网站配置
$.ajax({
    type: 'get',
    url: '/settings',
    success: function(response) {
        $('#previewImg').prop('src', response.logo);
        $('#hiddenFile').val(response.logo);
        $('input[name="title"]').val(response.title);
        $('input[name="comment"]').prop('checked', response.comment);
        $('input[name="review"]').prop('checked', response.review);
    }
})