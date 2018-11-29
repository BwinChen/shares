utils.IE();

// 模版加载

var loadingTpl = template(globalTpl.loading.funToStr());

var fontdetailheadTpl = template(globalTpl.fontdetailheader.funToStr());

$(function(){

  // 加载模版
  $('#header').html(headerTpl(Render.header));
  $('#footer').html(footTpl());
  $('.font-main').html(loadingTpl());

  // 编辑字体单模块
  var fontESet = function (data) {
    return $.extend(true,{},Render.layeropts,{
      type: 1,
      title: data.type ? '编辑字体单' : '创建字体单',
      offset: 'auto',
      area: '798px',
      zIndex: 9000,
      content: fonteditTpl(data),
      success: function (layero, index) {

        // 选择标签 按钮
        $('.fontlist-tag-btn').on('click', function () {
          // 获取当前标签内容
          var tag = $('.fontlist-tag').attr('data-arr'), tagArr = [];
          // 判断当前是否有数据
          if (!(tag.indexOf('标签') > -1)) {
            tagArr = tag.split(',');
          }
          var c_data = {
            tagItem: ['简约','现代','古典','中国风','手写风','优雅','端庄','有趣','卡通','尖锐','有力','豪放'],
            tagArr: tagArr
          }
          // 打开选择标签弹窗
          layer.open(fontagSet(c_data));
          return false;
        });

        // 选择封面 按钮
        $('.fontlist-pic-upload').on('change', function (lat) {
          var _file = lat.target.files[0];
          // 检测图片格式和大小
          if (_file.size > 1024*1024) {
            $.toast('文件大小不超过1M');
            return;
          }
          if (!/(jpg|jpeg|png)$/.test(_file.type)) {
            $.toast('只允许上传jpg、png格式图片');
            return;
          }
          if (_file) {
            var formData = new FormData();
            formData.append('coverImgFile', _file);
            // 上传封面图
            $.ajax({
              url: HOST.WEB_SERVER + API.uploadFontListImg,
              data: formData,
              type: 'POST',
              dataType: 'json',
              processData: false,
              contentType : false,
              beforeSend: function () {
                $.showLoading('正在上传图片');
              },
              error: function (e) {
                $.toast('请求失败，请稍后重试！');
              },
              success: function (result) {
                if (result.is_success) {
                  // 设置
                  var _img = HOST.WEB_SERVER + '/getImgByOSSKey?oss_key=' + result.data;
                  $('.fontlist-pic').find('img').attr('src', _img).attr('data-img', result.data);
                } else {
                  $.toast(result.error);
                }
              },
              complete: function () {
                $.hideLoading();
              }
            });
          }
        }).on('click', function () {
          $(this).val('');
        });

        // 取消 按钮
        $('.fontlist-edit-btn .cancel, .fontlist-edit-btns .cancel').on('click', function () {
          layer.close(index);
          return false;
        });

        // 保存 按钮
        $('.fontlist-edit-btns .save').on('click', function () {
          var obj = $(this);
          var listName = $('.fontlist-name').val();
          var tag = $('.fontlist-tag').attr('data-arr');
          var brief = $('.fontlist-brief').val();
          var coverImg = $('.fontlist-pic').find('img').attr('data-img');
          if (!obj.hasClass('dis-save')) {
            obj.addClass('dis-save');
            if (!$.trim(listName)) {
              $.toast('标题不存在');
              obj.removeClass('dis-save');
              return false;
            } else if (tag.indexOf('标签') > -1) {
              $.toast('标签不存在');
              obj.removeClass('dis-save');
              return false;
            } else {
              var coverImgState = '';
              if (coverImg !== data.coverImg) {
                coverImgState = 'Update';
              }
              $.ajax({
                url: HOST.WEB_SERVER + API.upFontListDetail,
                data: {
                  userId: Render.header.user.id,
                  id: data.id,
                  listName: $.trim(listName),
                  tag: tag,
                  brief: brief,
                  coverImg: coverImg,
                  coverImgState: coverImgState
                },
                type: 'POST',
                dataType: 'json',
                beforeSend: function () {
                  $.showLoading('正在编辑字体单');
                },
                error: function (e) {
                  $.toast('请求失败，请稍后重试！');
                },
                success: function (result) {
                  if (result.is_success) {
                    layer.close(index);
                    // 编辑保存
                    APP.toast({txt:'编辑成功',time:'1000'},function(){
                      window.location.reload();
                    });
                  } else {
                    $.toast(result.error);
                  }
                },
                complete: function () {
                  $.hideLoading();
                }
              });
            }
          }
          return false;
        });

        // 删除字体单
        $('.fontlist-edit-btns .delete').on('click', function () {
          layer.confirm('确认删除当前字体单？', {
            btn: ['确认', '取消']
          }, function(){
            // 删除操作
            $.ajax({
              url: HOST.WEB_SERVER + API.deleteFontList,
              data: {
                userId: Render.header.user.id,
                ids: data.id
              },
              type: 'POST',
              dataType: 'json',
              beforeSend: function () {
                $.showLoading('正在删除字体单');
              },
              error: function (e) {
                $.toast('删除失败，请稍后重试！');
              },
              success: function (result) {
                if (result.is_success) {
                  // 取消默认收藏
                  $.ajax({
                    url: HOST.WEB_SERVER + API.upFontListToUser,
                    data: {
                      fontListIds: data.id,
                      userId: Render.header.user.id,
                      type: 'DEL'
                    },
                    type: 'GET',
                    dataType: 'json',
                    error: function (e) {
                      $.toast('请求失败，请稍后重试！');
                    },
                    success: function (res) {
                      if (res.is_success) {
                        layer.close(index);
                        APP.toast({txt:'成功删除了该字体单',time:'500'},function(){
                          window.location.href = './fontlist.html';
                        });
                      }
                    }
                  });
                } else {
                  $.toast(result.error);
                }
              },
              complete: function () {
                $.hideLoading();
              }
            })
          });
          return false;
        });
      }
    });
  };

  // 判断用户是否登录
  var user = APP.getUser();
  // 初始化、加载用户信息
  APP.setInit(user);

  // 设置title
  Render.title = document.title;

  // 字体搜索页面
  // 获取地址栏查找的字体单id
  var search_id = utils.getParam('id');
  var search_size = 36,          //- 字体大小
      search_height = 52,        //- 字体图片高度
      search_previewText,   //- 图片预览文字
      search_page = 0,      //- 页码
      search_rows = 12,     //- 每页显示条数
      search_list = [];     //- 列表数据缓存容器
  var $fontMain = $('.font-main');        //- 字体列表
  var $previewBtn = $('#previewBtn');     //- 预览字体按钮
  var search_type = $('.font-listype').find('.active').index();    //- 获取数据展示类型

  // 初始化分页
  var paginate = function (total) {
    $('#pagination').pagination(total, {
      num_edge_entries: 1,            //- 边缘页数
      items_per_page: search_rows,          //- 每页显示项
      num_display_entries: 5,         //- 主体页数
      callback: function (page, jq){
        //- 分页回调方法
        search_page = page;
        searchFont(1);
      }
    })
  }
  // 字体单详情请求方法
  // todo: 区分 VIP打包下载（字体单中全部是免费下载字体）、付费打包下载（字体单中有付费下载字体） 显示。
  // 1、判断是否有付费字体，做区分展示
  // 2、提示未登录用户先进行登录
  // 3.1、VIP打包下载 时，非VIP用户，先开通VIP。
  // 3.2、付费打包下载 时，直接跳转至 订单中心页面。
  var flRequest = function (fid, uid) {
    $.ajax({
      url: HOST.WEB_SERVER + API.getFontDetailById,
      data: {
        id: fid,
        userId: uid
      },
      async: false,
      type: 'GET',
      dataType: 'json',
      error: function (e) {
        $.toast('请求失败，请稍后重试！');
      },
      success: function (result) {
        if (result.is_success && result.data) {
          // 设置标题
          document.title = '“' + result.data.list_name + '”' + Render.title;
          // 设置是否是创建者
          Render.isCreater = result.data.is_create;
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
                var _data = {
                  font: result.data,
                  user: _user,
                  isCreater: Render.isCreater
                }
                $('.fontde-header').html(fontdetailheadTpl(_data));
              }
            })
          } else {
            var _data = {
              font: result.data,
              user: Render.header.user,
              isCreater: Render.isCreater
            }
            $('.fontde-header').html(fontdetailheadTpl(_data));
          }
        } else {
          APP.toast({txt:'你访问的页面被丢到外太空了。。',time:'2000'},function(){
            window.location.href = './fontlist.html';
          });
        }
      }
    })
  }
  // 字体单内字体MD5列表请求方法
  var searchFontMD5 = function () {
    $.ajax({
      url: HOST.WEB_SERVER + API.getFontIdByFontListId,
      data: {
        id: search_id
      },
      type: 'GET',
      dataType: 'json',
      error: function (e) {
        $.toast('请求失败，请稍后重试！');
      },
      success: function (result) {
        if (result.is_success) {
          if (result.data.total > 0) {
            // 有数据

            // 分组存储
            Render.fontdata = utils.getArrSampleFont(result.data.list, search_rows);
            // 获取总数
            Render.fonttotal = result.data.total;

            if (!(Render.fonttotal>12)) {
              search_page = 0;
            }

            // 显示字体列表层
            $('.fontde-nores').addClass('ihide');
            $('.fontde-res').removeClass('ihide');

            // 请求字体单中字体列表
            searchFont();
          } else {
            // 无数据

            // 显示字体无列表层
            $('.fontde-nores').removeClass('ihide');
            $('.fontde-res').addClass('ihide');

            // 字体单无数据模版
            if (Render.isCreater) {
              var _fontNodataTpl = template(globalTpl.fontdetailinnodata.funToStr());
              $('.fontde-nores').html(_fontNodataTpl())
            } else {
              var _fontNodataTpl = template(globalTpl.fontdetailunnodata.funToStr());
              $('.fontde-nores').html(_fontNodataTpl())
            }
          }
        } else {
          $.toast(result.error);

          // 显示字体无列表层
          $('.fontde-nores').removeClass('ihide');
          $('.fontde-res').addClass('ihide');

          // 字体单无数据模版
          if (Render.isCreater) {
            var _fontNodataTpl = template(globalTpl.fontdetailinnodata.funToStr());
            $('.fontde-nores').html(_fontNodataTpl())
          } else {
            var _fontNodataTpl = template(globalTpl.fontdetailunnodata.funToStr());
            $('.fontde-nores').html(_fontNodataTpl())
          }
        }
      }
    });
  }
  // 字体MD5列表搜索请求
  // todo: 接口需新增原创字体类别、下载等级、字体样例
  var searchFont = function(s_type) {
    var s_load = s_type;
    var per = search_page;
    $.ajax({
      url: HOST.FONT + API.getPreviewAndFonts,
      data: {
        fontId: Render.fontdata[per].md5,
        text: search_previewText,
        fontSize: search_size,
        height: search_height
      },
      type: 'GET',
      dataType: 'json',
      beforeSend: function () {
        if (s_load) {
          $.showLoading();
        }
        if (search_list.length == 0 && search_page == 0) {
          $('#pagination').hide();
        }
        // se_total.html(0);
      },
      error: function (e) {
        $.toast('请求失败，请稍后重试！');
      },
      success: function (result) {
        if (result.is_success) {
          var list = result.data.list;
          if ( 0 === list.length ) {
            //- 没有数据的情况

            // 字体无数据模版
            if (Render.isCreater) {
              var _fontNodataTpl = template(globalTpl.fontdetailinnodata.funToStr());
              $('.fontde-nores').html(_fontNodataTpl())
            } else {
              var _fontNodataTpl = template(globalTpl.fontdetailunnodata.funToStr());
              $('.fontde-nores').html(_fontNodataTpl())
            }
          } else {
            //- 有数据的情况

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
            // 字体数据源
            var fontData = {
              type: 3,
              count: list.length,
              list: list,
              created: Render.isCreater
            }
            Render.fontdatas = fontData;
            // 字体列表模版
            var _fontListTpl;
            if (search_type) {
              _fontListTpl = template(globalTpl.fontpislist.funToStr());
            } else {
              _fontListTpl = template(globalTpl.fontlislist.funToStr());
            }
            // 渲染
            $fontMain.html(_fontListTpl(Render.fontdatas));

            //- 第1页执行
            if (search_page === 0) {
              if (Render.fonttotal > search_rows) {
                $('#pagination').show();
              }
              paginate(Render.fonttotal);
            }
          }
          search_list = list;
        } else {
          //- error info...
        }
      },
      complete: function () {
        $.hideLoading();
      }
    });
  }

  // 初始化
  var search_userid = Render.header.user ? Render.header.user.id : '';
  if (search_id) {
    // 获取字体单详情
    flRequest(search_id, search_userid);
    // 搜索
    searchFontMD5();
  }

  // 简介内容详情切换
  $('.fontde-header').on('click', '.arrow', function () {
    var obj = $(this);
    if (!obj.hasClass('up')) {
      obj.addClass('up');
      obj.prev().css('height', 'auto');
    } else {
      obj.removeClass('up');
      obj.prev().css('height', '18px');
    }
    return false;
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

  // 预览文本框、查找文本框 回车搜索事件
  $('.preview-input').on('keypress', function(event) {
      if (event.keyCode === 13) {
          $(this).siblings('.font-search-click').click();
      }
  }).maxlength().placeholder();

  // 登录 按钮
  $(document).on('click', '.loginBtn', function () {
    // 登录弹窗
    layer.open(loginSet('reload'));
    return false;
  });
  // 注册 按钮
  $(document).on('click', '.regBtn', function () {
    layer.open(regSet('reload'));
    return false;
  });

  // 收藏字体单 按钮
  $(document).on('click', '.collect', function () {
    var obj = $(this);
    var id = obj.attr('data-id');
    // 判断用户是否登录
    if (Render.header.user) {
      // 判断是否是创建者
      if (!Render.isCreater) {
        if (!obj.hasClass('collect-dis')) {
          obj.addClass('collect-dis');
          if (obj.find('i').hasClass('cur')) {
            // 取消收藏
            $.ajax({
              url: HOST.WEB_SERVER + API.upFontListToUser,
              data: {
                fontListIds: id,
                userId: Render.header.user.id,
                type: 'DEL'
              },
              type: 'GET',
              dataType: 'json',
              beforeSend: function () {
                $.showLoading();
              },
              error: function (e) {
                $.toast('请求失败，请稍后重试！');
                obj.removeClass('collect-dis');
              },
              success: function (res) {
                if (res.is_success) {
                  APP.toast({txt:'已取消收藏',time:'1000'},function(){
                    // 刷新
                    flRequest(search_id, search_userid);
                  });
                } else {
                  $.toast(res.error);
                  obj.removeClass('collect-dis');
                }
              },
              complete: function () {
                $.hideLoading();
              }
            });
          } else {
            // 添加收藏
            $.ajax({
              url: HOST.WEB_SERVER + API.upFontListToUser,
              data: {
                fontListIds: id,
                userId: Render.header.user.id,
                type: 'ADD'
              },
              type: 'GET',
              dataType: 'json',
              beforeSend: function () {
                $.showLoading();
              },
              error: function (e) {
                $.toast('请求失败，请稍后重试！');
                obj.removeClass('collect-dis');
              },
              success: function (res) {
                if (res.is_success) {
                  APP.toast({txt:'已收藏到“我的字体单”中',time:'1000'},function(){
                    // 刷新
                    flRequest(search_id, search_userid);
                  });
                } else {
                  $.toast(res.error);
                  obj.removeClass('collect-dis');
                }
              },
              complete: function () {
                $.hideLoading();
              }
            });
          }
        }
      }
    } else {
      APP.toast({txt:'请先登录', time: '1000'}, function(){
        layer.open(loginSet('reload'));
      });
    }
    return false;
  });

  // 分享 按钮
  $(document).on('click', '.share', function () {
    var obj = $(this);
    var id = obj.attr('data-id');
    var oss_key = obj.attr('data-key');
    var cont = obj.attr('data-title');
    var num = obj.attr('data-total');
    var name = obj.attr('data-name');
    var title = document.title;
    var _url = HOST.BEN + '/fontdetail.html?id=' + id;
    var pic = HOST.BEN + '/image/common/fontlist-default.png';
    if (oss_key != '') {
      pic = HOST.WEB_SERVER + API.getImgByOSSKey + '?oss_key=' + oss_key;
    }
    layer.open(shareSet(title,'分享字体单：“'+cont+'”字体合集，by '+name+'，里面包含了'+num+'款字体，快来看哦，字体还可以下载。', _url, pic));
    return false;
  });

  // 编辑字体单介绍 按钮
  $(document).on('click', '.edit', function () {
    var listName = $('.fontde-header').find('h2').find('span').html();
    var tag = $('.fontde-header').find('.tag').find('p').attr('data-arr');
    var con = $('.fontde-header').find('.info').find('p').html();
    var coverImgKey = $('.fontde-header').find('.pic').find('img').attr('data-img');
    // 处理简介
    var brief = $.trim(con.replace('简介：',''));
    var id = $(this).attr('data-id');
    var data = {
      type: 1,
      id: id,
      listName: listName,
      tag: tag,
      brief: brief,
      coverImg: coverImgKey
    }
    layer.open(fontESet(data));
    return false;
  });

  // 切换展示类型
  $('.font-listype li').on('click', function () {
    var obj = $(this);
    var index = $(this).index();
    if (!obj.hasClass('active')) {
      obj.addClass('active').siblings().removeClass('active');
      search_type = index;
      // 字体列表模版
      var _fontListTpl;
      if (index) {
        $('.font-preview').addClass('ihide');
        _fontListTpl = template(globalTpl.fontpislist.funToStr());
      } else {
        $('.font-preview').removeClass('ihide');
        _fontListTpl = template(globalTpl.fontlislist.funToStr());
      }
      // 渲染
      $fontMain.html(_fontListTpl(Render.fontdatas));
    }
    return false;
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
  });

  // 回到顶部
  $('#gotop').on('click', function(){
    $('html,body').animate({scrollTop : '0px'}, 800);
    return false;
  });

  // 收藏字体 按钮
  $fontMain.on('click', '.font-collect', function () {
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
        layer.open(loginSetup('reload'));
      }
    }
    return false;
  });

  // 删除字体 按钮
  $fontMain.on('click', '.font-delete', function() {
    var obj = $(this);
    var _id = obj.attr('data-id');
    if (!obj.hasClass('dis')) {
      obj.addClass('dis');
      $.ajax({
        url: HOST.WEB_SERVER + API.upFontToFontList,
        data: {
          fontIds: _id,
          id: search_id,
          token: Render.header.user.token,
          type: 'DEL'
        },
        type: 'GET',
        dataType: 'json',
        beforeSend: function () {
          $.showLoading('正在删除字体..');
        },
        error: function (e) {
          $.toast('删除失败，请稍后重试！');
        },
        success: function (result) {
          if (result.is_success) {
            // 删除成功
            obj.removeClass('dis');
            // 刷新
            searchFontMD5();
          } else {
            $.toast(result.error);
          }
        },
        complete: function () {
          $.hideLoading();
        }
      });
    }
    return false;
  });

});