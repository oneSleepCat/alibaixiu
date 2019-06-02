// 添加表单提交事件
$('#categoriesForm').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
            type: 'post',
            url: '/categories',
            data: formData,
            success: function() {
                location.reload();
                console.log(123)
            }
        })
        //阻止表单默认提交
    return false;
})

//从服务器获取分类信息
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(data) {
        var html = template('categoriesTpl', { data });
        $('#tbody').html(html);
    }
})

//通过事件委托给编辑按钮添加点击事件，根据ID获取信息，渲染到左侧进行修改
$('#tbody').on('click', '.editCategories', function() {
        //根据id从服务区获取名称和图标信息
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'get',
            url: '/categories/' + id,
            success: function(response) {
                var html = template('editCategoriesTpl', response);
                $('#editCategoriesBox').html(html);
            }
        })
    })
    //通过事件委托，给修改按钮添加事件
$('#editCategoriesBox').on('submit', '#categoriesFormSure', function() {
    //获取表单信息
    var formData = $(this).serialize();
    console.log(formData);
    //获取id
    var id = $(this).attr('data-id');
    console.log(id)
    $.ajax({
            type: 'put',
            url: '/categories/' + id,
            data: formData,
            success: function() {
                location.reload();
            }
        })
        //阻止默认提交
    return false;
})

//通过事件委托给删除按钮添加点击事件
$('#tbody').on('click', '.deleteCategories', function() {
    var id = $(this).attr('data-id');
    if (confirm('亲，您确认要删除吗？')) {
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function() {
                location.reload();
            }
        })
    }
})

//设置全选按钮
//当有多个用户选中时，显示批量删除选项
var selectAll = $('#selectAll');
selectAll.on('change', function() {
    //获取全选按钮的选中状态
    var status = $(this).prop('checked');
    if (status) {
        //显示批量删除按钮
        $('#deleteMany').show();
    } else {
        //隐藏批量删除按钮
        $('#deleteMany').hide();
    }
    //获取所有用户的选择按钮
    $('#tbody').find('input').prop('checked', status)
})
$('#tbody').on('change', '.userStatus', function() {
        //获取所有用户，筛选出选中的用户
        //判断选中用户的数量和所有的用户数量是否一致
        // 一致说明全选
        var inputs = $('#tbody').find('input');
        if (inputs.length == inputs.filter(':checked').length) {
            selectAll.prop('checked', true);
        } else {
            selectAll.prop('checked', false);
        }
        if (inputs.filter(':checked').length > 0) {
            //显示批量删除按钮
            $('#deleteMany').show();
        } else {
            //隐藏批量删除按钮
            $('#deleteMany').hide();
        }
    })
    //批量删除
$('#deleteBox').on('click', '#deleteMany', function() {
    //设置一个空数组，用来存放被选中用户的id
    var arr = [];
    var checkedUser = $('#tbody').find('input').filter(':checked');
    //循环复选框，将复选框上的id添加到数组中
    checkedUser.each(function(index, element) {
        arr.push($(element).attr('data-id'));
    })
    var isDelete = confirm('是否确认删除？');
    if (isDelete) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/categories/' + arr.join('-'),
            success: function(response) {
                location.reload();
            }
        })
    }
})