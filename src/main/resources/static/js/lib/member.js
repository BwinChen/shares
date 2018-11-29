utils.IE();

$(function(){

  // 加载模版
  $('#header').html(headerTpl(Render.header));
  $('#footer').html(footTpl());

  // 判断用户是否登录
  var user = APP.getUser();
  // 初始化、加载用户信息
  APP.setInit(user);

  // 登录 按钮
  $(document).on('click', '.loginBtn', function () {
    // 登录弹窗
    layer.open(loginSet());
    return false;
  });

  // 注册 按钮
  $(document).on('click', '.regBtn', function () {
    layer.open(regSet());
    return false;
  });

  // 查询基础信息
  $.ajax({
    url: HOST.ORDER + API.getTorderByType,
    data: {
      type: 1
    },
    type: 'GET',
    dataType: 'json',
    success: function (result) {
      if (result.success) {
        var forever = $('.buy-list').find('.forever');
        var year = $('.buy-list').find('.year');
        var month = $('.buy-list').find('.last');
        var foreverData = {};
        var yearData = {};
        var monthData = {};
        result.data.map(function(i, x){
          if (i.code == 'lty_vip_1') {
            monthData = i;
          } else if (i.code == 'lty_vip_12') {
            yearData = i;
          } else if (i.code == 'lty_vip_for_evel') {
            foreverData = i;
          }
        })
        forever.find('.top-btn').find('.buy-btn').attr('data-id', foreverData.id);
        forever.find('.top-btn').find('.buy-btn').attr('data-text', foreverData.text);
        forever.find('.top-btn').find('.buy-btn').attr('data-price', foreverData.price);
        forever.find('.top-title').find('del').html('原价：'+foreverData.historyPrice+'元');
        forever.find('.top-title').find('.tflag').html('限时'+utils.getDiscount(foreverData.historyPrice, foreverData.price)+'折');
        forever.find('.top-price').find('.tprice label').html('¥'+foreverData.price);

        year.find('.top-btn').find('.buy-btn').attr('data-id', yearData.id);
        year.find('.top-btn').find('.buy-btn').attr('data-text', yearData.text);
        year.find('.top-btn').find('.buy-btn').attr('data-price', yearData.price);
        year.find('.top-title').find('del').html('原价：'+yearData.historyPrice+'元');
        year.find('.top-title').find('.tflag').html('限时'+utils.getDiscount(yearData.historyPrice, yearData.price)+'折');
        year.find('.top-price').find('.tprice label').html('¥'+yearData.price);

        month.find('.top-btn').find('.buy-btn').attr('data-id', monthData.id);
        month.find('.top-btn').find('.buy-btn').attr('data-text', monthData.text);
        month.find('.top-btn').find('.buy-btn').attr('data-price', monthData.price);
        month.find('.top-title').find('del').html('原价：'+monthData.historyPrice+'元');
        month.find('.top-title').find('.tflag').html('限时'+utils.getDiscount(monthData.historyPrice, monthData.price)+'折');
        month.find('.top-price').find('.tprice label').html('¥'+monthData.price);
      }
    }
  });

  // 立即开通按钮
  $('.forever .buy-btn, .year .buy-btn, .last .buy-btn').on('click', function () {
    var obj = $(this);
    if (Render.header.user) {
      var _data = {
        id: obj.attr('data-id'),
        text: obj.attr('data-text'),
        price: obj.attr('data-price')
      }
      layer.open(orderSetup(_data));
    } else {
      APP.toast({txt:'请先登录', time:'1000'}, function() {
        layer.open(loginSet());
      });
    }
  });
});