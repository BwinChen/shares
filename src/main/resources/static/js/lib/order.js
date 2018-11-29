utils.IE();

$(function(){

  // 加载模版
  $('#header').html(headerTpl(Render.header));
  $('#footer').html(footTpl());

  // 订单
  var user = APP.getUser();
  if (user) {
    // 初始化用户信息
    APP.setInit(user);

    // 订单列表
    var order_no,             //- 订单号
        order_status,         //- 订单状态
        order_from = 'qzt',   //- 订单来源
        order_rows = 5,      //- 订单显示条数
        order_page = 0;       //- 订单页码

    // 订单请求
    var orderRequest = function () {
      $.ajax({
        url: HOST.ORDER + API.getOrderByUserId,
        data: {
          userId: user.id,
          token: user.token,
          rows: order_rows,
          page: order_page + 1,
          orderStatus: order_status,
          likeOrderNo: order_no,
          orderFrom: order_from
        },
        type: 'GET',
        dataType: 'json',
        beforeSend: function () {
          $.showLoading();
          if (order_page === 0) {
            $('#pagination').html('');
          }
        },
        error: function (e) {
          $.toast('请求失败，请稍后重试！');
        },
        success: function (res) {
          if (res.success) {
            var total = res.data.total;
            var list = res.data.list;

            if ( 0 === list.length ) {
              //- 没有数据的情况

              // 没数据模版
              var ordernoTpl = template(globalTpl.ordernodata.funToStr());
              $('.order-con').html(ordernoTpl);
            } else {
              //- 有数据的情况

              // 列表模版
              var orderTpl = template(globalTpl.orderitem.funToStr());
              // 数据源
              var orderData = {
                count: list.length,
                list: list
              }
              $('.order-con').html(orderTpl(orderData));

              //- 第1页执行
              if (order_page === 0) {
                paginate(total);
              }
            }
          }
        },
        complete: function () {
          $.hideLoading();
        }
      })
    }

    // 初始化分页
    var paginate = function (total) {
      $('#pagination').pagination(total, {
        num_edge_entries: 1,            //- 边缘页数
        items_per_page: order_rows,          //- 每页显示项
        num_display_entries: 4,         //- 主体页数
        callback: function (page, jq){
          //- 分页回调方法
          order_page = page;
          orderRequest();
        }
      })
    }

    // 初始化
    orderRequest();

    // 立即支付 按钮
    $('.order-con').on('click', '.m-btn', function () {
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
    $('.order-con').on('click', '.m-btn-text', function () {
      var obj = $(this);
      var _data = {
        id: obj.attr('data-id'),
        status: obj.attr('data-status'),
        load: 'reload'
      }
      layer.open(ordercalSet(_data));
      return false;
    });

    // 搜索点击事件
    $('.inline-btn').on('click', function () {
      var val = $('.preview-input').val();
      order_no = $.trim(val);
      order_page = 0;
      orderRequest();
      return false;
    });

    // 切换
    $('.m-tabs').find('.m-tab').on('click', function () {
      var status = $(this).attr('data-id');
      var orderno = $('.preview-input').val();
      $(this).addClass('on').siblings().removeClass('on');
      if (status == 0) {
        order_status = '';
      } else {
        order_status = status;
      }
      order_no = $.trim(orderno);
      order_page = 0;
      orderRequest();
      return false;
    });

    // 查找文本框 回车搜索事件
    $('.preview-input').on('keypress', function(event) {
      if (event.keyCode === 13) {
        $('.inline-btn').click();
      }
    }).maxlength().placeholder();

  } else {
    window.location.href = './index.html';
  }

});