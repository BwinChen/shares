utils.IE();

$(function(){

  // 加载模版
  $('#header').html(headerTpl(Render.header));
  $('#footer').html(footerTpl());

  // 错误模版
  var errSet = function (message) {
    return $.extend(true,{},Render.layeropts,{
      type: 1,
      title: false,
      closeBtn: 0,
      offset: 'auto',
      area: 'auto',
      zIndex: 9000,
      content: '<div class="toast" style="transform: translate(-50%, -50%);"><p style="margin-bottom: 20px; line-height: 24px;">' + message + '</p><div class="toast-btn" style="width: 100px; height: 30px; background: #fff; margin: 0 auto; line-height: 30px; color: #00c198; text-align: center; font-size: 14px; cursor: pointer;">知道了</div></div>',
      success: function (layero, index) {
        $('.toast-btn').on('click', function () {
          layer.close(index);
          window.location.href = './index.html';
          return false;
        });
      }
    });
  };

  // 判断用户是否登录
  var user = APP.getUser();

  // 初始化、加载用户信息
  APP.setInit(user);

  // 首页
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

  // 识图确认字体图层
  var getComm = function (formData, type, cont) {
    var g_formData = formData;
    var g_type = type;
    var g_cont = cont;
    $.ajax({
      url: HOST.FONTRE + API.getFontComponents,
      data: g_formData,
      type: 'POST',
      dataType: 'json',
      beforeSend: function () {
        $.showLoading(g_cont);
      },
      error: function (e) {
        // $.toast('请求失败，请稍后重试！');
        layer.open(errSet('请求失败，请稍后重试'));
      },
      success: function (result) {
        if (result.success) {
          // 设置title
          Render.title = document.title;
          document.title = '确认字体|' + Render.title;

          if (result.url) {
            $('#oriimg').attr('src', result.url);
            $('#oriimg-visi').attr('src', result.url);
            $('#oriimg-search').attr('src', result.url);
          }
          // 是否显示反白
          if (result.show == 'R') {
            $('#font-need-revert').show();
          }

          if (g_type == 2) {
            Render.cus.path = result.path;
            Render.cus.data = result.data;

            // 原始识图列表模块
            var _confirmlistTpl = template(globalTpl.confirmlist.funToStr());
            // 数据源
            var _data = {
              list: Render.cus.data,
              count: result.data.length
            }
            // 渲染
            $('#imgs').html(_confirmlistTpl(_data));

            // 切换
            $('#confirm .font-title-box').html('原始拆字');
            $('#confirm .font-title-tips').html('请拼出正确的单字');
            $('#btns .font-confirm-btn').eq(0).hide().end().eq(1).show();

            // 拖拽
            setDrag($('div[id^="drag_c"]'));
          } else {
            Render.sug.data = result.data;
            Render.sug.path = result.path;
            // 自动识图列表模块
            var _confirmslistTpl = template(globalTpl.confirmslist.funToStr());
            // 数据源
            var _data = {
              list: Render.sug.data,
              count: result.data.length
            }
            // 渲染
            $('#imgs').html(_confirmslistTpl(_data));

            // 拖拽
            setDrag($('div[id^="drag_s"]'));
          }
        } else {
          // $.toast(result.error);
          layer.open(errSet(result.error));
        }
      },
      complete: function () {
        $.hideLoading();
      }
    });
  }
  // 识图
  var _path = utils.getParam('path');
  if (_path == '') {
    window.location.href = './index.html';
  } else {
    var formDate = {
      'path': _path,
      'merge_type': 1
    }
    getComm(formDate, 1, '正在智能拆分文字');
  }
  // 拖拽
  var setDrag = function (obj) {
    obj.draggable({
      revert: 'invalid',
      containment: $('document'),
      helper: 'original',
      opacity: 0.8,
      cursor: 'move',
      zIndex: 999,
      start: function(){
        $(this).addClass('confirm-drag-source');
      },
      stop: function(){
        $(this).removeClass('confirm-drag-source');
      }
    });
    obj.droppable({
      accept: obj, hoverClass: 'confirm-drag-target', drop: function (event, ui) {
        var _dst = $(this);
        var _src = ui.draggable;
        // 获取当前合并参数
        var _dstImgData = _dst.find('.confirmImg').find('img').attr('src');
        _dstImgData = _dstImgData.replace('data:image/png;base64,', '');
        var _dstImgBox = _dst.find('.confirmImg').attr('data-imgbox');
        var _srcImgBox = _src.find('.confirmImg').attr('data-imgbox');
        var _srcImgData = _src.find('.confirmImg').find('img').attr('src');
        _srcImgData = _srcImgData.replace('data:image/png;base64,', '');
        // 获取合并后数据
        $.ajax({
          url: HOST.FONTRE + API.mergeFontComponents,
          data: {
            dstImgData: _dstImgData,
            srcImgData: _srcImgData,
            dstImgBox: _dstImgBox,
            srcImgBox: _srcImgBox
          },
          type: 'POST',
          dataType: 'json',
          beforeSend: function () {
            // 请求时预先隐藏
            _src.css('display', 'none');
          },
          complete: function () {
            // 请求完成后显示
            _src.css('display', 'block');
          },
          success: function(res){
            if (res.success) {
              // 删除图层
              _src.remove();
              // 更新数据
              var imgsData = 'data:image/png;base64,' + res.data.imgData;
              _dst.find('.confirmImg').find('img').attr('src', imgsData);
              _dst.find('.confirmImg').attr('data-imgbox', res.data.imgBox);
              // 选中当前层
              /*
              if ($('#imgs').find('.on').length < 5) {
                _dst.addClass('on');
                if ($('#imgs').find('.on').length > 0) {
                  $('#confirm .font-confirm').addClass('on');
                }
              }
              */
            } else {
              $.toast(res.error);
              _src.css({top: 0, left: 0});
            }
          },
          error: function(e){
            $.toast('合并失败：' + e);
          }
        });
      }
    });
  }
  var searchFontData = function (imgBoxArr, imgPath) {
    $.ajax({
      url: HOST.FONTRE + API.confirmFontComponents,
      data: {
        imgBox: imgBoxArr.join(';'),
        path: imgPath
      },
      type: 'POST',
      dataType: 'json',
      beforeSend: function () {
        $('#confirm').addClass('ihide');
        $('#searchs').removeClass('ihide');
        document.title = '搜索结果|' + Render.title;
      },
      error: function (e) {
        $.toast('请求失败，请稍后重试！');
        $('#searchs').find('.loading').hide();
        $('#searchs').find('.nodata').find('p').html('请求失败，请稍后重试！');
        $('#searchs').find('.nodata').show();
        $('#search_loading').hide();
        $('#search_res').show();
      },
      success: function(res) {
        if (res.success) {
          if (res.data.length > 0) {
            // 分组存储
            Render.fontdata = utils.getArrFont(res.data, searchs_rows);
            // 获取总数
            Render.fonttotal = res.data.length;
            // 设置预览值
            if (res.text != '') {
              searchs_previewText = res.text;
              $('.preview-input').val(res.text);
            }
            // 请求字体列表
            searchFont();
          } else {
            $('#searchs').find('.loading').hide();
            //- 没有数据的情况
            $('#searchs').find('.nodata').find('p').html('我们的字体库暂无匹配字体');
            $('#searchs').find('.nodata').show();
            $('#search_loading').hide();
            $('#search_res').show();
          }
        } else {
          $.toast(res.error);
          // 搜索出错
          $('#searchs').find('.loading').hide();
          $('#searchs').find('.nodata').find('p').html(res.error);
          $('#searchs').find('.nodata').show();
          $('#search_loading').hide();
          $('#search_res').show();
        }
      }
    })
  }
  // 智能识图 原始拆字 按钮
  $('#confirm .sugbtn .char a').on('click', function(){
    var rformData = {
      'path': _path,
      'merge_type': 0
    };
    if (Render.revert != '') {
      rformData['bNeedRevertBack'] = 1
    }
    getComm(rformData, 2, '正在原始拆分文字');
    return false;
  });
  // 智能识图 开始搜索 按钮
  $('#confirm .sugbtn .search a').on('click', function(){
    // 获取当前选中imgBox、path
    var len = $('#imgs').find('.on').length;
    if (len < 1) {
      $.toast('请选择至少一个完整单字');
      return false;
    }
    var imgBoxArr = [];
    $.each($('#imgs').find('.on'), function(i, n){
      imgBoxArr.push($(n).find('.confirmImg').attr('data-imgbox'));
    })
    var imgPath = Render.sug.path;
    // 请求搜索结果
    searchFontData(imgBoxArr, imgPath);
    return false;
  });
  // 原始拆分 重新拆分 按钮
  $('#confirm .cusbtn .rset a').on('click', function(){
    // 原始识图列表模块
    var _confirmlistTpl = template(globalTpl.confirmlist.funToStr());
    // 数据源
    var _data = {
      list: Render.cus.data,
      count: Render.cus.data.length
    }
    // 渲染
    $('#imgs').html(_confirmlistTpl(_data));
    $.toast('重新拆分完成');

    // 拖拽
    setDrag($('div[id^="drag_c"]'));
    return false;
  });
  // 原始拆分 开始搜索 按钮
  $('#confirm .cusbtn .search a').on('click', function(){
    // 获取当前选中imgBox、path
    var len = $('#imgs').find('.on').length;
    if (len < 1) {
      $.toast('请选择至少一个完整单字');
      return false;
    }
    var imgBoxArr = [];
    $.each($('#imgs').find('.on'), function(i, n){
      imgBoxArr.push($(n).find('.confirmImg').attr('data-imgbox'));
    })
    var imgPath = Render.cus.path;
    // 请求搜索结果
    searchFontData(imgBoxArr, imgPath);
    return false;
  });
  // 确认页面 回车事件
  $(document).on('keypress', function(event) {
    if (event.keyCode === 13 && !($('#confirm').hasClass('ihide'))) {
      // 获取当前选中imgBox、path
      var len = $('#imgs').find('.on').length;
      if (len < 1) {
        $.toast('请选择至少一个完整单字');
        return false;
      }
      var imgBoxArr = [];
      $.each($('#imgs').find('.on'), function(i, n){
        imgBoxArr.push($(n).find('.confirmImg').attr('data-imgbox'));
      })
      var imgPath = Render.sug.path;
      // 请求搜索结果
      searchFontData(imgBoxArr, imgPath);
      return false;
    }
  });
  // 字体确认 事件
  $('#imgs').on('click', '.confirmImg-item .check', function(){
    var obj = $(this).parent();
    var nums = $('#imgs').find('.on').length;
    if (!obj.hasClass('on')) {
      if (nums < 5) {
        obj.addClass('on');
        if ($('#imgs').find('.on').length > 0) {
          $('#confirm .font-confirm').addClass('on');
        }
      } else {
        $.toast('最多只能选择5个！');
      }
    } else {
      obj.removeClass('on');
      if ($('#imgs').find('.on').length < 1) {
        $('#confirm .font-confirm').removeClass('on');
      }
    }
    return false;
  }).on('click', '.confirmImg-item a', function(){
    var nums = $('#imgs').find('.on').length;
    if ($(this).parent().parent().hasClass('sure')) {
      if (nums < 5) {
        $(this).parent().parent().parent().addClass('on');
        if ($('#imgs').find('.on').length > 0) {
          $('#confirm .font-confirm').addClass('on');
        }
      } else {
        $.toast('最多只能选择5个！');
      }
    } else {
      $(this).parent().parent().parent().removeClass('on');
      if ($('#imgs').find('.on').length < 1) {
        $('#confirm .font-confirm').removeClass('on');
      }
    }
    return false;
  }).on('click', '.confirmImg', function(){
    var obj = $(this).parent();
    var nums = $('#imgs').find('.on').length;
    if (!obj.hasClass('on')) {
      if (nums < 5) {
        obj.addClass('on');
        if ($('#imgs').find('.on').length > 0) {
          $('#confirm .font-confirm').addClass('on');
        }
      } else {
        $.toast('最多只能选择5个！');
      }
    } else {
      obj.removeClass('on');
      if ($('#imgs').find('.on').length < 1) {
        $('#confirm .font-confirm').removeClass('on');
      }
    }
  });
  // 字体旋转纠正
  // 旋转滑轮模块mouseleave事件
  $('#imgs').on('mouseleave', '.confirmCorrect-rotate-box', function(){
    // console.log('rotateout', $(this).parent().parent().parent().parent().attr('data-imgbox'));
    // 清空操作、重置
    Render.rotateStartLeft = 0;
    Render.rotateStartX = 0;
    // 重置+-按钮
    $(this).find('.rotate-slider-redu').addClass('dise');
    $(this).find('.rotate-slider-incr').removeClass('dise');
    // 重置当前滑轮位置
    $(this).find('.rotate-slider-handler').css('left', '0px');
    // 重置当前旋转显示值
    $(this).find('.rotate-slider-val').html(0);
    // 清空图片旋转值
    $(this).parent().parent().parent().parent().parent().find('.confirmCorr-image').css('transform','');
    // 清空确定值
    $(this).find('.rotate-btn').attr('data-rotate', '');
  });
  // 旋转滑轮点击事件
  $('#imgs').on('mousedown', '.rotate-slider-handler', function(e){
    if (!Render.rotateFlag) {
      Render.rotateFlag = true;
      Render.rotateStartLeft = parseInt($(this).css('left'));
      Render.rotateStartX = parseInt(e.pageX);
      // console.log('down', 'mouse', Render.rotateStartX, 'start', Render.rotateStartLeft, 'left', parseInt($(this).css('left')));
    }
  });
  // 旋转滑轮拖动事件
  $('#imgs').on('mousemove', '.rotate-slider-inner', function(e){
    if (Render.rotateFlag) {
      // 计算偏移值
      var dist = Render.rotateStartLeft + e.pageX - Render.rotateStartX;
      dist = dist < 0 ? 0 : dist > 180 ? 180 : dist;
      // 监听设置按钮
      if (dist == 0) {
        $(this).prev().addClass('dise');
      }
      if (dist == 180) {
        $(this).next().addClass('dise');
      }
      if (dist > 0) {
        $(this).prev().removeClass('dise');
      }
      if (dist < 180) {
        $(this).next().removeClass('dise');
      }
      // 旋转度值
      var rotateValue = dist < 0 ? 0 : dist > 180 ? 360 : dist * 2;
      // 滑轮位置
      $(this).find('.rotate-slider-handler').css('left', dist + 'px');
      // 显示旋转度
      $(this).parent().find('.rotate-slider-val').html(rotateValue);
      // 图形旋转
      $(this).parent().parent().parent().parent().parent().parent().find('.confirmCorr-image').css({transform: 'rotate('+rotateValue+'deg)'});
      // 赋值
      $(this).next().next().attr('data-rotate', rotateValue);
      // console.log('move', 'mouse', Render.rotateStartX, 'start', Render.rotateStartLeft, 'left', parseInt($(this).find('.rotate-slider-handler').css('left')), '=', e.pageX, '==', dist);
    }
  });
  // 旋转滑轮点出事件
  $('#imgs').on('mouseup', '.rotate-slider-inner', function(e){
    // 设置不滚动
    Render.rotateFlag = false;
    // 当前位置
    // var dist = parseInt($(this).find('.rotate-slider-handler').css('left'));
    // console.log('up', 'mouse', Render.rotateStartX, 'start', Render.rotateStartLeft, 'left', parseInt($(this).css('left')), '=', e.pageX, '==', dist);
  });
  // 旋转-按钮
  $('#imgs').on('click', '.rotate-slider-redu', function(){
    var obj = $(this);
    // 当前滑轮位置
    var dist = parseInt(obj.next().find('.rotate-slider-handler').css('left')) - 1;
    // 当前旋转度值
    var rotateValue = dist < 0 ? 0 : dist > 180 ? 360 : dist * 2;
    if (!obj.hasClass('dise')) {
      // console.log('-', dist, rotateValue);
      // 设置
      var newDist = dist < 0 ? 0 : dist > 180 ? 180 : dist;
      // 判断
      if (newDist == 0) {
        obj.addClass('dise');
      }
      if (newDist < 180) {
        obj.next().next().removeClass('dise');
      }
      // 旋转度值
      var newrotateValue = newDist < 0 ? 0 : newDist > 180 ? 360 : newDist * 2;
      // 滑轮位置
      obj.next().find('.rotate-slider-handler').css('left', newDist + 'px');
      // 显示旋转度
      obj.prev().find('.rotate-slider-val').html(newrotateValue);
      // 图形旋转
      obj.parent().parent().parent().parent().parent().parent().find('.confirmCorr-image').css({transform: 'rotate('+newrotateValue+'deg)'});
      // 赋值
      obj.next().next().next().attr('data-rotate', newrotateValue);
    }
    return false;
  });
  // 旋转+按钮
  $('#imgs').on('click', '.rotate-slider-incr', function(){
    var obj = $(this);
    // 当前滑轮位置
    var dist = parseInt(obj.prev().find('.rotate-slider-handler').css('left')) + 1;
    // 当前旋转度值
    var rotateValue = dist < 0 ? 0 : dist > 180 ? 360 : dist * 2;
    if (!obj.hasClass('dise')) {
      // console.log('+', dist, rotateValue);
      // 设置
      var newDist = dist < 0 ? 0 : dist > 180 ? 180 : dist;
      // 判断
      if (newDist > 0) {
        obj.prev().prev().removeClass('dise');
      }
      if (newDist == 180) {
        obj.addClass('dise');
      }
      // 旋转度值
      var newrotateValue = newDist < 0 ? 0 : newDist > 180 ? 360 : newDist * 2;
      // 滑轮位置
      obj.prev().find('.rotate-slider-handler').css('left', newDist + 'px');
      // 显示旋转度
      obj.prev().prev().prev().find('.rotate-slider-val').html(newrotateValue);
      // 图形旋转
      obj.parent().parent().parent().parent().parent().parent().find('.confirmCorr-image').css({transform: 'rotate('+newrotateValue+'deg)'});
      // 赋值
      obj.next().attr('data-rotate', newrotateValue);
    }
    return false;
  });
  // 旋转确认按钮
  $('#imgs').on('click', '.rotate-btn', function(){
    var rotate = $(this).attr('data-rotate');
    console.log($(this).parent().parent().parent().parent().parent().attr('data-imgbox'), '当前旋转角度', rotate);
    alert($(this).parent().parent().parent().parent().parent().attr('data-imgbox')+'。当前旋转角度：'+rotate+'，请求接口blabla...');
    // 请求接口
    // 成功，清空字体旋转操作、重置数据
    return false;
  });
  // 字体倾斜纠正
  // 倾斜滑轮模块mouseleave事件
  $('#imgs').on('mouseleave', '.confirmCorrect-skew-box', function(){
    // console.log('skewout', $(this).parent().parent().parent().parent().attr('data-imgbox'));
    // 清空操作、重置
    Render.skewStartLeft = 0;
    Render.skewStartX = 0;
    // 重置+-按钮
    $(this).find('.skew-slider-redu').removeClass('dise');
    $(this).find('.skew-slider-incr').removeClass('dise');
    // 重置当前滑轮位置
    $(this).find('.skew-slider-handler').css('left', '90px');
    // 重置当前倾斜显示值
    $(this).find('.skew-slider-val').html(0);
    // 清空图片倾斜值
    $(this).parent().parent().parent().parent().parent().find('.confirmCorr-image').css('transform','');
    // 清空确定值
    $(this).find('.skew-btn').attr('data-skew', '');
  });
  // 倾斜滑轮点击事件
  $('#imgs').on('mousedown', '.skew-slider-handler', function(e){
    if (!Render.skewFlag) {
      Render.skewFlag = true;
      Render.skewStartLeft = parseInt($(this).css('left'));
      Render.skewStartX = parseInt(e.pageX);
      // console.log('down', 'mouse', Render.skewStartX, 'start', Render.skewStartLeft, 'left', parseInt($(this).css('left')));
    }
  });
  // 倾斜滑轮拖动事件
  $('#imgs').on('mousemove', '.skew-slider-inner', function(e){
    if (Render.skewFlag) {
      // 计算偏移值
      var dist = Render.skewStartLeft + e.pageX - Render.skewStartX;
      dist = dist < 0 ? 0 : dist > 180 ? 180 : dist;
      // 监听设置按钮
      if (dist == 0) {
        $(this).prev().addClass('dise');
      }
      if (dist == 180) {
        $(this).next().addClass('dise');
      }
      if (dist > 0) {
        $(this).prev().removeClass('dise');
      }
      if (dist < 180) {
        $(this).next().removeClass('dise');
      }
      // 倾斜度值
      var skewValue = dist < 0 ? -45 : dist > 180 ? 45 : dist / 2 - 45;
      // 滑轮位置
      $(this).find('.skew-slider-handler').css('left', dist + 'px');
      // 显示倾斜度
      $(this).parent().find('.skew-slider-val').html(skewValue);
      // 图形倾斜
      $(this).parent().parent().parent().parent().parent().parent().find('.confirmCorr-image').css({transform: 'skewX('+(0 - skewValue)+'deg)'});
      // 赋值
      $(this).next().next().attr('data-skew', skewValue);
      // console.log('move', 'mouse', Render.skewStartX, 'start', Render.skewStartLeft, 'left', parseInt($(this).find('.skew-slider-handler').css('left')), '=', e.pageX, '==', dist);
    }
  });
  // 倾斜滑轮点出事件
  $('#imgs').on('mouseup', '.skew-slider-inner', function(e){
    // 设置不滚动
    Render.skewFlag = false;
    // 当前位置
    // var dist = parseInt($(this).find('.skew-slider-handler').css('left'));
    // console.log('up', 'mouse', Render.skewStartX, 'start', Render.skewStartLeft, 'left', parseInt($(this).css('left')), '=', e.pageX, '==', dist);
  });
  // 倾斜-按钮
  $('#imgs').on('click', '.skew-slider-redu', function(){
    var obj = $(this);
    // 当前滑轮位置
    var dist = parseInt(obj.next().find('.skew-slider-handler').css('left')) - 1;
    // 当前倾斜度值
    var skewValue = dist < 0 ? -45 : dist > 180 ? 45 : dist / 2 - 45;
    if (!obj.hasClass('dise')) {
      // console.log('-', dist, skewValue);
      // 设置
      var newDist = dist < 0 ? 0 : dist > 180 ? 180 : dist;
      // 判断
      if (newDist == 0) {
        obj.addClass('dise');
      }
      if (newDist < 180) {
        obj.next().next().removeClass('dise');
      }
      // 倾斜度值
      var newSkewValue = newDist < 0 ? -45 : newDist > 180 ? 45 : newDist / 2 - 45;
      // 滑轮位置
      obj.next().find('.skew-slider-handler').css('left', newDist + 'px');
      // 显示倾斜度
      obj.prev().find('.skew-slider-val').html(newSkewValue);
      // 图形倾斜
      obj.parent().parent().parent().parent().parent().parent().find('.confirmCorr-image').css({transform: 'skewX('+(0 - newSkewValue)+'deg)'});
      // 赋值
      obj.next().next().next().attr('data-skew', newSkewValue);
    }
    return false;
  });
  // 倾斜+按钮
  $('#imgs').on('click', '.skew-slider-incr', function(){
    var obj = $(this);
    // 当前滑轮位置
    var dist = parseInt(obj.prev().find('.skew-slider-handler').css('left')) + 1;
    // 当前倾斜度值
    var skewValue = dist < 0 ? -45 : dist > 180 ? 45 : dist / 2 - 45;
    if (!obj.hasClass('dise')) {
      // console.log('+', dist, skewValue);
      // 设置
      var newDist = dist < 0 ? 0 : dist > 180 ? 180 : dist;
      // 判断
      if (newDist > 0) {
        obj.prev().prev().removeClass('dise');
      }
      if (newDist == 180) {
        obj.addClass('dise');
      }
      // 倾斜度值
      var newSkewValue = newDist < 0 ? -45 : newDist > 180 ? 45 : newDist / 2 - 45;
      // 滑轮位置
      obj.prev().find('.skew-slider-handler').css('left', newDist + 'px');
      // 显示倾斜度
      obj.prev().prev().prev().find('.skew-slider-val').html(newSkewValue);
      // 图形倾斜
      obj.parent().parent().parent().parent().parent().parent().find('.confirmCorr-image').css({transform: 'skewX('+(0 - newSkewValue)+'deg)'});
      // 赋值
      obj.next().attr('data-skew', newSkewValue);
    }
    return false;
  });
  // 倾斜确认按钮
  $('#imgs').on('click', '.skew-btn', function(){
    var skew = $(this).attr('data-skew');
    console.log($(this).parent().parent().parent().parent().parent().attr('data-imgbox'), '当前倾斜角度', skew);
    alert($(this).parent().parent().parent().parent().parent().attr('data-imgbox')+'。当前倾斜角度：'+skew+'，请求接口blabla...');
    // 请求接口
    // 成功，清空字体倾斜操作、重置数据
    return false;
  });
  // 怎么拼切换
  $('#font-attr-img').hover(function(){
    $('#font-attr-hover').attr('src', './image/common/confirm-attr-two.gif')
  }, function(){
    $('#font-attr-hover').attr('src', './image/common/confirm-attr-one.gif')
  });
  // 反白纠正
  $('#font-need-revert .gre').on('click', function(){
    if (Render.revert == '') {
      var isType = $('#confirm .font-title-box').html(), g_type;
      var g_formData = {
        'path': _path,
        'bNeedRevertBack': 1
      }
      if (isType == '智能拆字') {
        g_type = 1;
        g_formData['merge_type'] = 1;
      } else {
        g_type = 2;
        g_formData['merge_type'] = 0;
      }
      Render.revert = 1;
      getComm(g_formData, g_type, '正在反白纠正文字');
    } else {
      $.toast('已反白纠正');
    }
    return false;
  });


  // 识图搜索字体列表层
  // 字体图层搜索字体
  var searchs_size,
      searchs_height,
      searchs_previewText,
      searchs_page = 0,
      searchs_rows = 10,
      searchs_list = [];
  var se_total = $('#searchs').find('#total');
  var se_sizeSelect = $('#searchs .search-cont').find('.size-select');
  var se_sizeItem = $('.size-item.on', se_sizeSelect);
  var se_fontMain = $('.search-cont').find('.font-main');
  var se_fontAttr = $('.search-cont').find('.font-attr-con');
  var se_previewBtn = $('#searchs').find('#previewBtn');
  var se_fontAttrBox = $('.search-cont').find('.font-attr');
  var se_fontAttrTop;

  // 初始化字体选择
  searchs_size = se_sizeItem.data('size');
  searchs_height = se_sizeItem.data('height');
  se_sizeSelect.find('.text').html(se_sizeItem.html());

  // 关闭字体选择
  var closeSerSizeSelect = function () {
    if (se_sizeSelect.hasClass('on')) {
      se_sizeSelect.click();
    }
  }
  // 初始化分页
  var paginates = function (total) {
    // 设置总数
    se_total.html(total);

    $('#pagination').pagination(total, {
      num_edge_entries: 1,            //- 边缘页数
      items_per_page: searchs_rows,          //- 每页显示项
      num_display_entries: 4,         //- 主体页数
      callback: function (page, jq){
        //- 分页回调方法
        searchs_page = page;
        searchFont(1);
      }
    })
  }
  // 字体搜索请求
  var searchFont = function(s_type) {
    var s_load = s_type;
    var per = searchs_page;
    $.ajax({
      url: HOST.FONT + API.getPreviewAndFonts,
      data: {
        fontId: Render.fontdata[per].md5,
        text: searchs_previewText,
        fontSize: searchs_size,
        height: searchs_height
      },
      type: 'GET',
      dataType: 'json',
      beforeSend: function () {
        if (s_load) {
          $.showLoading();
        }
        if (searchs_list.length == 0 && searchs_page == 0) {
          $('#pagination').hide();
        }
        // se_total.html(0);
      },
      error: function (e) {
        $.toast('请求失败，请稍后重试！');
        $('#searchs').find('.loading').hide();
        $('#searchs').find('.nodata').find('p').html('请求失败，请稍后重试！');
        $('#searchs').find('.nodata').show();
        $('#search_loading').hide();
        $('#search_res').show();
      },
      success: function (result) {
        if (result.is_success) {
          var list = result.data.list;
          $('#searchs').find('.loading').hide();
          if ( 0 === list.length ) {
            //- 没有数据的情况
            $('#searchs').find('.nodata').find('p').html('我们的字体库暂无匹配字体');
            $('#searchs').find('.nodata').show();
            $('#search_loading').hide();
            $('#search_res').show();
          } else {
            //- 有数据的情况

            // 字体列表模版
            var _fontListTpl = template(globalTpl.searchlist.funToStr());
            // 过滤字符串大小写
            list.map(function(i, x){
              i.file_type = i.file_type.toLowerCase();
            });
            // 字体数据源
            var fontData = {
              count: list.length,
              list: list,
              simi: Render.fontdata[per].simi
            }
            // 渲染
            se_fontMain.html(_fontListTpl(fontData));
            $('#searchs').find('.search-cont').show();
            // 显示浮窗
            $('#original').css({left: $('#searchs .back').offset().left - 45, top: $('#searchs .back').offset().top - 180 });
            $('#original').addClass('don');

            // 获取字体属性top值
            se_fontAttrTop = se_fontAttrBox.offset().top;
            // 设置浮窗值
            se_fontAttrBox.css({left: $('#searchs .back').offset().left - 50});

            // 切换title
            $('#search_loading').hide();
            $('#search_res').show();

            //- 第1页执行
            if (searchs_page === 0) {
              if (Render.fonttotal > searchs_rows) {
                $('#pagination').show();
              }
              paginates(Render.fonttotal);
            }
          }
          searchs_list = list;
        } else {
          //- error info...
        }
      },
      complete: function () {
        $.hideLoading();
      }
    });
  }
  $(document.body).on('click', function () {
    // 关闭字体选择
    closeSerSizeSelect();
  });
  // 字体大小选择
  se_sizeSelect.on('click', function(event) {
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
      searchs_height = $this.data('height');
      searchs_size = $this.data('size');

      //- 切换样式
      $this.sibToggleClass('on');

      if (searchs_list.length > 0) {
        //- 发起请求
        searchFont(1);
      }
    }

    se_sizeSelect.toggleClass('on');
    $select.toggle().siblings('.icon-arrow').toggleClass('on');
  });
  // 字体点击事件
  se_fontMain.on('click', '.font-item', function (event) {
    event.stopPropagation();
    closeSerSizeSelect();

    var obj = $(this);
    var index = $(this).index();
    if (obj.hasClass('on')) return;
    obj.sibToggleClass('on');

    // 字体详情
    var search_attr_data = searchs_list[index];
    search_attr_data.file_size_text = utils.bytesToSize(search_attr_data.file_size);

    // 字体详情模版
    var _fontAttrListTpl = template(globalTpl.searchattrlist.funToStr());

    se_fontAttr.html(_fontAttrListTpl(search_attr_data));

    // 字体值为空时显示“无”
    $('.font-attr-content p', se_fontAttr).each(function() {
      $(this).text($(this).text() || '无')
    })
  });

  // 预览点击事件
  se_previewBtn.on('click', function () {
    var $input = $(this).siblings('input');
    var val = $input.val();
    var placeholder = $input.attr('placeholder');
    var items = se_fontMain.children('.font-item').length;
    if (0 != items) {
      if (!val || val === placeholder) {
        $.toast(placeholder);
      } else {
        if (val == searchs_previewText) return;
        val = $.trim(val);
        searchs_previewText = val;
        searchFont(1);
      }
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
  // 重新上传 按钮
  $('#confirm .font-reset a.rese, #searchs .font-reset a.rese').on('click', function(){
    window.location.replace('./index.html');
    return false;
  });
  // 返回上一步 按钮
  $('#searchs .font-reset a.back').on('click', function(){
    document.title = '确认字体|' + Render.title;
    // 清零
    Render.fontdata = [];
    Render.fonttotal = '';
    searchs_previewText = '';
    searchs_page = 0;
    var fontattrTpl = template(globalTpl.searchattrnone.funToStr());
    $('#confirm').removeClass('ihide');
    $('#searchs').addClass('ihide').find('.font-attr-con').html(fontattrTpl()).end().find('.preview-input').val('').end().find('.loading').show().end().find('.search-cont').hide().end().find('.nodata').hide();
    $('#searchs').find('#total').html(0);
    $('#search_loading').show();
    $('#search_res').hide();
    return false;
  });
  // 预览文本框、查找文本框 回车搜索事件
  $('#searchs .preview-input').on('keypress', function(event) {
    if (event.keyCode === 13) {
      $(this).siblings('.preview-btn').click();
    }
  }).maxlength().placeholder();

  // 收藏字体 按钮
  se_fontMain.on('click', '.font-collect i', function () {
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
        };
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

  // 回到顶部
  $('#gotop').on('click', function(){
    $('html,body').animate({scrollTop : '0px'}, 800);
    return false;
  })
  // 上传图拖拽
  $('#original').draggable({
    revert: 'valid',
    containment: $('#app-confirm'),
    helper: 'original',
    opacity: 0.8,
    cursor: 'move'
  });
  $(window).scroll(function () {
    var i = $(document).scrollTop();
    if (!window.XMLHttpRequest) {
      ( i > 350) ? $('#gotop').fadeIn(400) : $('#gotop').fadeOut(200)
    } else {
      ( i > 350) ? $('#gotop').fadeIn(400) : $('#gotop').fadeOut(200)
    }
    if (i > 276) {
      $('#original').css({
        visibility: 'visible'
      })
    } else {
      $('#original').css({
        visibility: 'hidden'
      })
    }
    // 字体属性 自动置顶
    if ( se_fontMain.find('.font-item').length > 0 ) {
        se_fontAttrBox.toggleClass('fixed', $(this).scrollTop() > se_fontAttrTop);
    }
  });

});