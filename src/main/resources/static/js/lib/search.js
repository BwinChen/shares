utils.IE();

// 模版加载

var loadingTpl = template(globalTpl.loading.funToStr());
var fontattrTpl = template(globalTpl.searchattrnone.funToStr());

$(function(){

  // 加载模版
  $('#header').html(headerTpl(Render.header));
  $('#footer').html(footTpl());
  $('.font-main').html(loadingTpl());
  $('.font-attr-con').html(fontattrTpl());

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

  // 字体搜索页面
  // 获取地址栏查找的字体名称
  var search_fn = utils.getParam('fn');
  var search_size,          //- 字体
      search_height,        //- 字体图片高度
      search_top,           //- 下载按钮 top 偏移值
      search_font,          //- 查找字体名称
      search_previewText,   //- 图片预览文字
      search_page = 0,      //- 页码
      search_rows = 10,     //- 每页显示条数
      search_list = [];     //- 列表数据缓存容器
  var $total = $('#total');               //- 搜索结果总数
  var $font = $('#font');                 //- 查找字体值
  var $sizeSelect = $('.size-select');    //- 字体大小选择
  var $sizeitem = $('.size-item.on', $sizeSelect);
  var $fontMain = $('.font-main');        //- 字体列表
  var $fontAttr = $('.font-attr-con');        //- 字体属性
  var $previewBtn = $('#previewBtn');     //- 预览字体按钮
  var $searchBtn = $('#searchBtn');       //- 查找字体按钮
  var $fontAttrBox = $('.font-attr');

  // 初始化字体选择
  search_height = $sizeitem.data('height');
  search_size = $sizeitem.data('size');
  search_top = $sizeitem.data('top');
  $sizeSelect.find('.text').html($sizeitem.html());
  // 关闭字体选择
  var closeSizeSelect = function () {
    if ($sizeSelect.hasClass('on')) {
      $sizeSelect.click();
    }
  }
  // 初始化分页
  var paginate = function (total) {
    // 设置总数
    $total.html(total);
    $('#pagination').pagination(total, {
      num_edge_entries: 1,            //- 边缘页数
      items_per_page: search_rows,          //- 每页显示项
      num_display_entries: 4,         //- 主体页数
      callback: function (page, jq){
        //- 分页回调方法
        search_page = page;
        request(1);
      }
    })
  }
  // 字体列表请求方法
  var request = function (s_type) {
    var s_load = s_type;
    $.ajax({
      url: HOST.WEB_SERVER + API.searchFontname,
      data: {
        offest: search_page,
        fetch_size: search_rows,
        fontSize: search_size,
        height: search_height,
        fontName: search_font,
        text: search_previewText
      },
      type: 'POST',
      dataType: 'json',
      beforeSend: function () {
        if (s_load) {
          $.showLoading();
        }
        if (search_list.length == 0 && search_page == 0) {
          $('#pagination').hide();
        }
        $font.html(search_font);
        $('.font-name').html(search_font);
      },
      error: function (e) {
        $.toast('请求失败，请稍后重试！');
      },
      success: function (result) {
        if (result.is_success) {
          var total = result.data.total;
          var list = result.data.list;

          if ( 0 === list.length ) {
            //- 没有数据的情况

            // 字体无数据模版
            var _fontNodataTpl = template(globalTpl.searchnodata.funToStr());
            // 字体未选择模版
            var _fontAttrNoneTpl = template(globalTpl.searchattrnone.funToStr());
            // 渲染
            $fontMain.html(_fontNodataTpl({ font: search_font }));
            $fontAttr.html(_fontAttrNoneTpl());

            $total.html(0);
          } else {
            //- 有数据的情况

            // 字体列表模版
            var _fontListTpl = template(globalTpl.searchslist.funToStr());
            // 过滤字符串大小写
            list.map(function(i, x){
              i.file_type = i.file_type.toLowerCase();
            });
            // 字体数据源
            var fontData = {
              count: list.length,
              list: list
            }
            // 渲染
            $fontMain.html(_fontListTpl(fontData));

            //- 第1页执行
            if (search_page === 0) {
              if (total > search_rows) {
                $('#pagination').show();
              }
              paginate(total);
            }
          }
          search_list = list;
        }
      },
      complete: function () {
        $.hideLoading();
      }
    });
  }

  $(document.body).on('click', function () {
    // 关闭字体选择
    closeSizeSelect();
  })

  // 初始化
  if (search_fn) {
    $('.search-input').val(search_fn);
    search_font = search_fn;
    // 搜索
    request();
  } else {
    // 字体无搜索词模版
    var _fontNoneTpl = template(globalTpl.searchnone.funToStr());
    $fontMain.html(_fontNoneTpl());
  }
  // 字体大小选择
  $sizeSelect.on('click', function(event) {
    event.stopPropagation();
    $(this).toggleClass('on')
           .find('i').toggleClass('on').end()
           .find('ul').toggle();
  }).on('click', 'ul > li', function(event) {
    event.stopPropagation()

    var $this = $(this);
    var $select = $this.parent();

    //- 如果选中当前已经选中的项，则不执行
    if ( !$this.hasClass('on') ) {
      var val = $this.html();
      $select.siblings('.text').html(val);

      //- 更新全局变量值
      search_height = $this.data('height');
      search_size = $this.data('size');
      search_top = $this.data('top');

      //- 切换样式
      $this.sibToggleClass('on');

      if (search_list.length > 0) {
        //- 发起请求
        request(1);
      }
    }

    $sizeSelect.toggleClass('on');
    $select.toggle().siblings('.icon-arrow').toggleClass('on');
  });
  // 字体点击事件
  $fontMain.on('click', '.font-item', function (event) {
    event.stopPropagation();
    closeSizeSelect();

    var obj = $(this);
    var index = $(this).index();
    if (obj.hasClass('on')) return;
    obj.sibToggleClass('on');

    // 字体详情
    var search_attr_data = search_list[index];
    search_attr_data.file_size_text = utils.bytesToSize(search_attr_data.file_size);

    // 字体详情模版
    var _fontAttrListTpl = template(globalTpl.searchattrlist.funToStr());

    $fontAttr.html(_fontAttrListTpl(search_attr_data));

    // 字体值为空时显示“无”
    $('.font-attr-content p', $fontAttr).each(function() {
      $(this).text($(this).text() || '无')
    })
  });
  // 字体属性自动置顶
  var fontAttrTop = $fontAttrBox.offset().top;
  $(window).scroll(function(){
      if ( $fontMain.find('.font-item').length > 0 ) {
          $fontAttrBox.toggleClass('fixed', $(this).scrollTop() > fontAttrTop);
      }
  });
  // 预览点击事件
  $previewBtn.on('click', function () {
    var $input = $(this).siblings('input');
    var val = $input.val();
    var placeholder = $input.attr('placeholder');
    var items = $fontMain.children('.font-item').length;
    if (0 != items) {
      if (!val || val === placeholder) {
        $.toast(placeholder);
      } else {
        if (val == search_previewText) return;
        val = $.trim(val);
        search_previewText = val;
        request(1);
      }
    }
  });
  // 搜索点击事件
  $searchBtn.on('click', function (){
    var ptext = $('.preview-input').val();
    var $input = $(this).siblings('input');
    var val = $input.val();
    var placeholder = $input.attr('placeholder');
    if (!val || val === placeholder) {
      $.toast(placeholder);
    } else {
      if (val === search_font) return;
      val = $.trim(val);
      search_font = val;
      ptext = $.trim(ptext);
      search_previewText = ptext;
      search_page = 0;
      search_list = [];
      request(1);
    }
  });
  // 预览字体简繁转换
  $('.jftrans').on('click', function () {
    var type = $(this).data('type');

    var $input = $('.preview-input');
    var val = $input.val();
    var placeholder = $input.attr('placeholder');
    if (val && val != placeholder) {
      $input.val(utils.transformJF(val, type));
    }
  });

  // 预览文本框、查找文本框 回车搜索事件
  $('.preview-input, .search-input').on('keypress', function(event) {
      if (event.keyCode === 13) {
          $(this).siblings('.font-search-click').click();
      }
  }).maxlength().placeholder();

  // 收藏字体 按钮
  $fontMain.on('click', '.font-collect i', function () {
    var obj = $(this);
    var _id = obj.attr('data-id');
    if (!obj.hasClass('dis')) {
      obj.addClass('dis');
      if (Render.header.user) {
        // 弹出收藏列表
        var datas = {
          userid: Render.header.user.id,
          token: Render.header.user.token,
          fontid: _id
        }
        layer.open(fontcollectsSet(datas));
        obj.removeClass('dis');
      } else {
        // 还未登录
        obj.removeClass('dis');
        layer.open(loginSetup());
      }
    }
    return false;
  });

});