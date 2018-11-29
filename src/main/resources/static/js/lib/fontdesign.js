utils.IE();

$(function(){

  // 加载模版
  $('#header').html(headerTpl(Render.header));
  $('#footer').html(footTpl());

  // 字体单
  var font_tag,           //- 字体单类别
      font_rows = 40,     //- 字体单显示条数
      font_page = 0;      //- 字体单页码

  // 字体设计师列表请求
  // todo: 后台需要新增字体设计师列表接口
  var fontRequest = function () {
    $.ajax({
      url: HOST.WEB_SERVER + API.getFontList,
      data: {
        pageCount: font_rows,
        pageIndex: font_page + 1,
        tag: font_tag
      },
      type: 'GET',
      dataType: 'json',
      beforeSend: function () {
        if (font_page === 0) {
          $('#pagination').html('');
        } else {
          $.showLoading();
        }
      },
      error: function (e) {
        $.toast('请求失败，请稍后重试！');
      },
      success: function (res) {
        if (res.is_success) {
          var total = res.data.length;
          var list = res.data;

          if (0 === list.length) {
            //- 没有数据的情况
            // 没有数据模版
            var fontnoTpl = template(globalTpl.fontlistnodata.funToStr());
            $('.fontlist-list').html(fontnoTpl);
          } else {
            //- 有数据的情况
            // 列表模版
            var fontTpl = template(globalTpl.fontlistdata.funToStr());

            // 根据用户信息查询用户是否收藏
            if (Render.header.user) {
              // 请求用户收藏列表
              $.ajax({
                url: HOST.WEB_SERVER + API.getCollectFontListIdsByUserId,
                data: {
                  userId: Render.header.user.id
                },
                type: 'GET',
                dataType: 'json',
                success: function (cres) {
                  var _user = null;
                  // 获取用户收藏字体单列表
                  if (cres.is_success) {
                    if (cres.data) {
                      _user = cres.data;
                    }
                  }
                  // 数据源
                  var fontData = {
                    count: list.length,
                    list: list,
                    user: _user
                  }
                  $('.fontlist-list').html(fontTpl(fontData));
                }
              })
            } else {
              // 数据源
              var fontData = {
                count: list.length,
                list: list,
                user: Render.header.user
              }
              $('.fontlist-list').html(fontTpl(fontData));
            }

            //- 第1页执行
            if (font_page === 0) {
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
      items_per_page: font_rows,          //- 每页显示项
      num_display_entries: 4,         //- 主体页数
      callback: function (page, jq){
        //- 分页回调方法
        font_page = page;
        fontRequest();
      }
    })
  }

  // 判断用户是否登录
  var user = APP.getUser();
  // 初始化、加载用户信息
  APP.setInit(user);

  fontRequest();

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

});