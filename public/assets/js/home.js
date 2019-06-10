$.ajax({
    type: 'get',
    url: '/slides',
    success: function(response) {
        var html = template('slideTpl', { data: response });
        $('#swipeBox').html(html);
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function(index) {
                // index++;

                $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
        });

        // 上/下一张
        $('.swipe .arrow').on('click', function() {
            var _this = $(this);

            if (_this.is('.prev')) {
                swiper.prev();
            } else if (_this.is('.next')) {
                swiper.next();
            }
        })
    }
})

//获取最新发布
$.ajax({
    type: 'get',
    url: '/posts/lasted',
    success: function(response) {
        var html = template('nowTpl', { data: response });
        $('#nowBox').html(html);
    }
})

//获取热门推荐内容
$.ajax({
    type: 'get',
    url: '/posts/recommend',
    success: function(response) {
        var html = template("indexHotTpl", { data: response });
        $("#hotArticle").html(html);
    }
})