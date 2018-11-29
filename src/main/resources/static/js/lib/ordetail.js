utils.IE();

$(function(){

  // 加载模版
  $('#header').html(headerTpl(Render.header));
  $('#footer').html(footTpl());

  // 订单详情
  // 判断用户是否登录
  var user = APP.getUser();
  if (user) {
    // 初始化、加载用户信息
    $.ajax({
      url: HOST.USER + API.getUser,
      data: {
        userId: user.id,
        token: user.token
      },
      type: 'GET',
      dataType: 'json',
      beforeSend: function () {
        $.showLoading();
      },
      error: function (e) {
        $.toast('请求失败，请稍后重试！');
      },
      success: function (res) {
        if (res.success) {
          APP.setUser(res.data);
          APP.setInit(res.data);
        }
      },
      complete: function () {
        $.hideLoading();
      }
    });

    // 订单编号
    var order_no = utils.getParam('orderNo');

    // 订单详情请求
    var orderRequest = function () {
      $.ajax({
        url: HOST.ORDER + API.getOrderByOrderNo,
        data: {
          orderNo: order_no
        },
        type: 'GET',
        dataType: 'json',
        beforeSend: function () {
          $.showLoading();
        },
        error: function (e) {
          $.toast('请求失败，请稍后重试！');
        },
        success: function (res) {
          if (res.success) {
            // 详情模版
            var ordetailTpl = template(globalTpl.ordetail.funToStr());
            $('.trade').html(ordetailTpl(res.data));
          }
        },
        complete: function () {
          $.hideLoading();
        }
      })
    }

    // 初始化
    orderRequest();

    // 立即支付 按钮
    $('.trade').on('click', '.m-btn', function () {
      var obj = $(this);
      var _data = {
        id: obj.attr('data-id'),
        text: obj.attr('data-text'),
        price: obj.attr('data-price')
      }
      // 设置orderNo
      Render.orderNo = obj.attr('data-no');
      layer.open(orderSetup(_data));
      return false;
    });

    // 取消 按钮
    $('.trade').on('click', '.cancel-btn', function () {
      var obj = $(this);
      var _data = {
        id: obj.attr('data-id'),
        status: obj.attr('data-status'),
        load: 'none'
      }
      layer.open(ordercalSet(_data));
      return false;
    });
  } else {
    window.location.href = './index.html';
  }

});