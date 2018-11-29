var globalTpl = {
    'app': (function () {
        /*
            <div id="header"><%:=headerTpl%></div>
            <div id="content"><%:=contentTpl%></div>
            <div id="footer"><%:=footerTpl%></div>
        */
    }),
    'header': (function () {
        /*
            <div class="header">
                <div class="wrap clearfix">
                    <div class="headerLeft">
                        <h1 class="headerLogo">
                            <a href="index.html">
                                <i></i>
                            </a>
                        </h1>
                        <ul class="clearfix headerNav">
                            <li>
                                <a href="index.html">首页</a>
                            </li>
                            <li>
                                <a href="font.html">字体助手</a>
                            </li>
                            <li>
                                <a href="fontlist.html">字体单<i class="i-new"></i></a>
                            </li>
                            <li><a href="member.html">VIP中心<i class="i-hot"></i></a></li>
                            <li>
                                <a href="javascript:;">官方Q群</a>
                                <div class="pop">
                                    <div class="pop-main">
                                        <div class="pop-contact">
                                            <div class="contact wqq">
                                                <div class="t"><i class="qq"></i><b>官方QQ交流群</b></div>
                                                <p><span>群①:225735907(满)</span><a href="http://shang.qq.com/wpa/qunwpa?idkey=9e3f632e3bf573c366f3d626af8dc4a92a59b90ada81fc1fe9ad62fa23287cdc" target="_blank">+加入</a></p>
                                                <p><span>群②:2021671(满)</span><a href="http://shang.qq.com/wpa/qunwpa?idkey=7a665dd9a982c38f1705751467dd63b765cb704aac1f2b88c4afe751b387c6d2" target="_blank">+加入</a></p>
                                                <p><span>群③:87440505(满)</span><a href="http://shang.qq.com/wpa/qunwpa?idkey=9fb5ec9a1f0145cd02c2ddda865ac199549a56edd0d7a36aee7d2690e46b00f3" target="_blank">+加入</a></p>
                                                <p><span>群④:413931395</span><a href="http://shang.qq.com/wpa/qunwpa?idkey=d1a1bf0f5d3ac97c889c2460691670ba5e3293b0e75d48a1c45466b7721417d2" target="_blank">+加入</a></p>
                                                <p><span>群⑤:325647803</span><a href="http://shang.qq.com/wpa/qunwpa?idkey=cb7fc6d73220af90271b45a1fc4b5c004fb4404ae6bf6f4460876ce70617b2f4" target="_blank">+加入</a></p>
                                            </div>
                                            <div class="contact wsina">
                                                <div class="t"><i class="sina"></i><b>新浪微博</b></div>
                                                <p><a href="http://weibo.com/u/2616851981" target="_blank">关注“求字体网”</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <%if (!user){ %>
                    <div class="headerRight">
                        <ul class="clearfix">
                            <li><a class="l loginBtn" href="javascript:void(0);">登录</a></li>
                            <li><a class="r regBtn" href="javascript:void(0);">注册</a></li>
                        </ul>
                    </div>
                    <% }else{ %>
                    <div class="headerUser">
                        <img src="<%= user.headPortraitPath ? user.headPortraitPath : 'image/common/avatar-head.png' %>" id="avatar">
                        <% if (user.vip){ %>
                        <i class="vicon <%= user.vipLevel == 1 ? 'vip' : 'svip' %>"></i>
                        <% }else{ %>
                        <i class="vicon"></i>
                        <% } %>
                        <div class="pop w120">
                            <ul class="clearfix user-nav">
                                <li><a href="myfonts.html">我的字体单</a></li>
                                <li><a href="order.html">我的订单</a></li>
                                <li><a href="user.html">个人中心</a></li>
                                <li><a href="javascript:void(0);" class="J_logout">退出</a></li>
                            </ul>
                        </div>
                    </div>
                    <% } %>
                </div>
            </div>
        */
    }),
    'footer': (function () {
        /*
            <div class="footer">
                <div class="wrap">
                    <div>
                        <p class="footer_link">
                            <span class="ft-lt">友情链接</span>
                            <a href="http://www.uisdc.com" target="_blank">优设网</a>
                            <a href="http://www.epinv.com/online" target="_blank">亿品元素</a>
                            <a href="http://www.yiihuu.com" target="_blank">翼狐网</a>
                            <a href="http://www.90sheji.com" target="_blank">90设计网</a>
                            <a href="http://www.chuangzaoshi.com" target="_blank" rel="nofollow">创造狮</a>
                            <a href="http://www.ziti163.com" target="_blank" rel="nofollow">逐浪字体</a>
                            <a href="http://www.17ziti.com" target="_blank">字体之家</a>
                            <a href="http://www.yegenyou.com/?u=2373" target="_blank">叶根友字体</a>
                            <a href="http://www.rrxiu.net" target="_blank">H5制作工具</a>
                        </p>
                        <div class="footer_copy">
                            <span class="ft-i">©</span><span>2012 - 2018</span>
                            <a class="ft-mr" href="http://www.qiuziti.com">www.qiuziti.com</a>
                            <a href="contact.html">联系我们</a><span class="ft-line">|</span>
                            <a href="law.html">隐私声明</a><span class="ft-line">|</span>
                            <a href="thanks.html">特别鸣谢</a>
                            <span>闽ICP备120030510号</span>
                        </div>
                    </div>
                </div>
            </div>
        */
    }),
    'foot': (function () {
        /*
            <div class="footer">
                <div class="wrap">
                    <div>
                        <div class="footer_copy">
                            <span class="ft-i">©</span><span>2012 - 2018</span>
                            <a class="ft-mr" href="http://www.qiuziti.com">www.qiuziti.com</a>
                            <a href="contact.html">联系我们</a><span class="ft-line">|</span>
                            <a href="law.html">隐私声明</a><span class="ft-line">|</span>
                            <a href="thanks.html">特别鸣谢</a>
                            <span>闽ICP备120030510号</span>
                        </div>
                    </div>
                </div>
            </div>
        */
    }),
    // 首页模版
    // 首页原始拆字
    'confirmlist': (function () {
        /*
            <% for (var i=0; i<count; i++) { %>
            <div class="confirmImg-item" id="drag_c<%= i %>">
                <i class="check"></i>
                <div class="confirmImg" data-imgbox="<%= list[i].imgBox %>">
                    <img class="confirmCorr-image" src="data:image/png;base64,<%= list[i].imgData %>" />
                </div>
                <div class="confirmPop sure">
                    <p><span>本图中有完整黑色单字，请点击</span><a href="#">确认单字</a></p>
                </div>
                <div class="confirmPop cancel">
                    <p><span>选错了？请点击</span><a href="#">取消选择</a></p>
                </div>
                <div class="confirmInfo">可拖动图片拼成完整单字</div>
                <div class="confirmCorrect" data-imgbox="<%= list[i].imgBox %>">
                    <div class="confirmCorrect-box">
                        <span>文字不正？调整一下</span>
                        <button class="rotate">
                            旋转纠正
                            <div class="confirmCorrect-rotate">
                                <div class="confirmCorrect-rotate-box">
                                    <div class="rotate-slider-value">
                                        <div class="rotate-slider-title">旋转</div>
                                        <div class="rotate-slider-values"><b class="rotate-slider-val">0</b>°</div>
                                    </div>
                                    <div class="rotate-slider-redu dise"></div>
                                    <div class="rotate-slider-inner">
                                        <div class="rotate-slider-handler">
                                            <div class="rotate-slider-handler-i"></div>
                                        </div>
                                        <div class="rotate-slider-line"></div>
                                    </div>
                                    <div class="rotate-slider-incr"></div>
                                    <div class="rotate-btn">确定</div>
                                </div>
                                <div class="confirmCorrect-rotate-mask"></div>
                            </div>
                        </button>
                        <button class="skew">
                            倾斜纠正
                            <div class="confirmCorrect-skew">
                                <div class="confirmCorrect-skew-box">
                                    <div class="skew-slider-value">
                                        <div class="skew-slider-title">倾斜</div>
                                        <div class="skew-slider-values"><b class="skew-slider-val">0</b>°</div>
                                    </div>
                                    <div class="skew-slider-redu"></div>
                                    <div class="skew-slider-inner">
                                        <div class="skew-slider-handler" style="left: 90px;">
                                            <div class="skew-slider-handler-i"></div>
                                        </div>
                                        <div class="skew-slider-line"></div>
                                    </div>
                                    <div class="skew-slider-incr"></div>
                                    <div class="skew-btn">确定</div>
                                </div>
                                <div class="confirmCorrect-skew-mask"></div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <% } %>
         */
    }),
    // 首页智能拆字
    'confirmslist': (function () {
        /*
            <% for (var i=0; i<count; i++) { %>
            <div class="confirmImg-item" id="drag_s<%= i %>">
                <i class="check"></i>
                <div class="confirmImg" data-imgbox="<%= list[i].imgBox %>">
                    <img class="confirmCorr-image" src="data:image/png;base64,<%= list[i].imgData %>" />
                </div>
                <div class="confirmPop sure">
                    <p><span>本图中有完整黑色单字，请点击</span><a href="#">确认单字</a></p>
                </div>
                <div class="confirmPop cancel">
                    <p><span>选错了？请点击</span><a href="#">取消选择</a></p>
                </div>
                <div class="confirmInfo">可拖动图片拼成完整单字</div>
                <div class="confirmCorrect" data-imgbox="<%= list[i].imgBox %>">
                    <div class="confirmCorrect-box">
                        <span>文字不正？调整一下</span>
                        <button class="rotate">
                            旋转纠正
                            <div class="confirmCorrect-rotate">
                                <div class="confirmCorrect-rotate-box">
                                    <div class="rotate-slider-value">
                                        <div class="rotate-slider-title">旋转</div>
                                        <div class="rotate-slider-values"><b class="rotate-slider-val">0</b>°</div>
                                    </div>
                                    <div class="rotate-slider-redu dise"></div>
                                    <div class="rotate-slider-inner">
                                        <div class="rotate-slider-handler">
                                            <div class="rotate-slider-handler-i"></div>
                                        </div>
                                        <div class="rotate-slider-line"></div>
                                    </div>
                                    <div class="rotate-slider-incr"></div>
                                    <div class="rotate-btn">确定</div>
                                </div>
                                <div class="confirmCorrect-rotate-mask"></div>
                            </div>
                        </button>
                        <button class="skew">
                            倾斜纠正
                            <div class="confirmCorrect-skew">
                                <div class="confirmCorrect-skew-box">
                                    <div class="skew-slider-value">
                                        <div class="skew-slider-title">倾斜</div>
                                        <div class="skew-slider-values"><b class="skew-slider-val">0</b>°</div>
                                    </div>
                                    <div class="skew-slider-redu"></div>
                                    <div class="skew-slider-inner">
                                        <div class="skew-slider-handler" style="left: 90px;">
                                            <div class="skew-slider-handler-i"></div>
                                        </div>
                                        <div class="skew-slider-line"></div>
                                    </div>
                                    <div class="skew-slider-incr"></div>
                                    <div class="skew-btn">确定</div>
                                </div>
                                <div class="confirmCorrect-skew-mask"></div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <% } %>
         */
    }),
    // 首页自动识图无数据
    'confirmsnodata': (function () {
        /*
            <div class="nodata">
                <div class="nodata-title" style="font-size: 14px; padding-bottom: 135px;">该图片没有计算机建议拼字</div>
            </div>
         */
    }),
    // 首页识图初始化
    'confirmloading': (function () {
        /*
            <div class="loading">
                <img src="image/common/loading.gif" alt=""><span class="loading-text">正在分析您上传的图片中...</span>
            </div>
         */
    }),
    // 字体助手or字体同步
    'fontdown': (function () {
        /*
        <div class="banner font-banner">
             <div class="banner-box">
                <div class="font-banner-txt">
                    <div class="t1">链图云字体助手</div>
                    <div class="t2">您的字体管理专家</div>
                    <div class="t3">
                        <span>大小：<%= data.file_size %></span></span><span class="line">|</span>
                        <span>当前版本：<%= data.version_num %></span><span class="line">|</span>
                        <span>适应系统：XP/vista/win7/win8/win10</span><span class="line">|</span>
                        <span>更新时间：<%= data.create_time %></span>
                    </div>
                    <div class="t-ban">
                        <a class="middle J_down_font" href="<%= link.pan %>"><i class="down i"></i><span class="s">网盘线路</span></a>
                        <a class="middle J_down_font" href="<%= link.down1 %>"><i class="down i"></i><span class="s">下载线路1</span></a>
                        <a class="middle J_down_font" href="<%= link.down2 %>"><i class="down i"></i><span class="s">下载线路2</span></a>
                    </div>
                </div>
                <img src="image/temp/font.png"/>
             </div>
        </div>
        */
    }),
    // download页面模版
    // 主体
    'fontdownload': (function () {
        /*
            <div class="download-top">
                <h1 class="font-name"><%= font_name %></h1>
            </div>
            <div class="download-info">
                <p>文件大小<label class="c-value"><%= file_size_text %></label></p>
                <p>字符数<label class="c-value"><%= char_size %></label> </p>
                <p>格式<label class="c-value"><%= file_type %></label></p>
                <p>语言<label class="c-value"><%= language %></label></p>
                <p>版本<label class="c-value"><%= version %></label></p>
            </div>
            <% if (download_level != 0) { %>
            <div class="download-handle">
                <span class="d-tip">应版权方要求，本站暂不提供该字体下载</span>
                <a href="<%= font_company_url %>" target="_blank" class="fr"><i class="i3 i"></i><span class="s"><%= btn_text %></span></a>
            </div>
            <% } else { %>
            <div class="download-handle">
                <a class="c" data-url="<%= url %>" id="vipDownload"><i class="i1 i"></i><span class="s">VIP线路下载</span></a>
                <a class="c" id="cloudDownload"><i class="i2 i"></i><span  class="s">云字体(VIP)</span></a>
                <a data-url="<%= url %>" id="ptDownload"><i class="i3 i"></i><span class="s">普通线路下载</span></a>
            </div>
            <% } %>
            <div class="download-txt">
                <div class="m-block">
                    <div class="b-title"><i class="i1"></i><span>特别说明</span></div>
                    <div class="b-content">本站所有资源仅供学习与参考，请勿用于商业用途，否则产生的一切后果由您自己承担！<br>如有侵犯您的版权，请及时联系qiuziti#qq.com(#换@)，我们将尽快处理。</div>
                </div>
                <div class="m-block">
                    <div class="b-title"><i class="i2"></i><span>字体安装</span></div>
                    <div class="b-content">Windows用户：可直接将字体文件复制到C:\\Windows\\Fonts文件夹即可完成安装，或者双击字体文件点击“安装”按钮。<br />Mac用户：可直接将字体文件复制到在应用程序或者launchpad中的字体册中即可完成安装，或者双击字体文件，点击“安装”按钮。</div>
                </div>
            </div>
         */
    }),
    // 主体错误
    'fontdownloaderr': (function () {
        /*
            <div class="nodata" style="margin: 270px auto;">
                <div class="nodata-title" style="font-size: 14px;"><%= text %></div>
            </div>
         */
    }),
    // 云字体弹窗
    'fontlayermain': (function () {
        /*
            <div class="layer-cloud">
                <div class="downloadss">
                    <div class="font-preview">
                        <div class="preview-bar">
                            <input type="text" class="preview-input" maxlength="60" placeholder="请输入您需要转换的文字">
                            <span class="preview-btn" id="previewBtn">预览</span>
                        </div>
                        <a href="javascript:;" class="jftrans" data-type='jt'>简</a>
                        <a href="javascript:;" class="jftrans" data-type='ft'>繁</a>
                    </div>
                    <div class="download-handle">
                        <a class="c" id="svgDownload"><i class="i1 i"></i><span class="s">下载SVG文件</span></a>
                        <span class="layer-span">SVG格式文件可以在AI和CDR软件中打开编辑</span>
                    </div>
                    <div class="download-image">
                        <div class="loading preview-loading" style="padding: 65px 0;">
                          <img src="image/common/loading.gif" alt=""><span class="loading-text">预览图加载中...</span>
                        </div>
                        <img id="fontImage" src="" alt="" />
                    </div>
                    <div class="download-txt open">
                        <div class="m-block">
                            <div class="b-title"><i class="i1"></i><span>云字体说明</span></div>
                            <div class="b-content">
                            只需几个文字却要下载整个字体；<br>
                            字体下载好了可Win10中好多字体总是安装失败；<br>
                            终于安装成功了却在PS等编辑软件中根本找不到这个字体；<br>
                            好不容易找到了这个字体却发现它根本不支持我要的字浪费了时间；<br>
                            ......<br>
                            云字体功能就是为这些场景而生，输入您要的文字后马上就可下载字体矢量文件，无需下载和安装字体，就这么简单！
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        */
    }),
    'loading': (function () {
        /*
            <div class="loading">
              <img src="image/common/loading.gif" alt=""><span class="loading-text">正在加载中...</span>
            </div>
        */
    }),
    'empty': (function () {
        /*
            <div class="empty">
            </div>
        */
    }),
    // search页面模版
    // font-main 对应：地址栏无搜索关键词
    'searchnone': (function () {
      /*
        <div class="nodata">
            <div class="nodata-title">没有可以显示的内容<br/>右上角搜索框输入字体名搜索吧~</div>
        </div>
       */
    }),
    // font-main 对应：字体列表
    // 识图字体列表
    'searchlist': (function () {
      /*
        <% for (var i=0; i<count; i++) { %>
        <div class="font-item">
          <div class="font-item-box">
            <div class="font-info">
                <% if(!list[i].font_image){ %>
                  <div class="font-pic"><img src="http://www.qiuziti.com/img/def_preview.png"/></div>
                <% } else { %>
                  <div class="font-pic"><img src="data:image/png;base64,<%= list[i].font_image %>"/></div>
                <% } %>
                <div class="font-txt">
                    <% if(list[i].file_type == 'ttf') { %>
                    <span class="middle"><i class="ttf"></i><span class="s"><%= list[i].font_name %></span></span>
                    <% } else if (list[i].file_type == 'otf') { %>
                    <span class="middle"><i class="otf"></i><span class="s"><%= list[i].font_name %></span></span>
                    <% } else { %>
                    <span class="middle"><i></i><span class="s"><%= list[i].font_name %></span></span>
                    <% } %>
                    <span class="la">语言：<%= list[i].language %></span>
                    <span class="si">相似度：<b><%= simi[i] %>%</b></span>
                    <span class="font-collect">收藏：<i data-id="<%= list[i].id %>"></i></span>
                </div>
            </div>
            <div class="font-btn"><a class="font-down" href="./download.html?id=<%= list[i].font_id %>&font=<%= list[i].font_name %>" target="_blank"><i class="icon-down"></i><span>下载</span></a></div>
          </div>
        </div>
        <% } %>
       */
    }),
    // 搜索字体列表
    'searchslist': (function () {
      /*
        <% for (var i=0; i<count; i++) { %>
        <div class="font-item">
          <div class="font-item-box">
            <div class="font-info">
                <% if(!list[i].font_image){ %>
                  <div class="font-pic"><img src="http://www.qiuziti.com/img/def_preview.png"/></div>
                <% } else { %>
                  <div class="font-pic"><img src="data:image/png;base64,<%= list[i].font_image %>"/></div>
                <% } %>
                <div class="font-txt">
                    <% if(list[i].file_type == 'ttf') { %>
                    <span class="middle"><i class="ttf"></i><span class="s"><%= list[i].font_name %></span></span>
                    <% } else if (list[i].file_type == 'otf') { %>
                    <span class="middle"><i class="otf"></i><span class="s"><%= list[i].font_name %></span></span>
                    <% } else { %>
                    <span class="middle"><i></i><span class="s"><%= list[i].font_name %></span></span>
                    <% } %>
                    <span class="la">语言：<%= list[i].language %></span>
                    <span class="font-collect">收藏：<i data-id="<%= list[i].id %>"></i></span>
                </div>
            </div>
            <div class="font-btn"><a class="font-down" href="./download.html?id=<%= list[i].font_id %>&font=<%= list[i].font_name %>" target="_blank"><i class="icon-down"></i><span>下载</span></a></div>
          </div>
        </div>
        <% } %>
       */
    }),
    // 字体列表 type: 1 搜索字体列表，2 识图字体列表，3 字体单字体列表
    'fontlislist': (function () {
      /*
        <% for (var i=0; i<count; i++) { %>
        <div class="font-item" data-url="./download.html?id=<%= list[i].font_id %>&font=<%= list[i].font_name %>">
          <div class="font-item-box">
            <div class="font-sample">
                <% if (list[i].font_effect_img_path) { %>
                <img src="<%= list[i].font_effect_img_path %>" />
                <% } else { %>
                <img src="./image/common/fontlist-default.jpg" />
                <% } %>
                <div class="tit">9张样张</div>
            </div>
            <div class="font-info">
                <div class="font-txt">
                    <% if(list[i].file_type == 'ttf') { %>
                    <span class="middle"><i class="ttf"></i><span class="s"><%= list[i].font_name %></span></span>
                    <% } else if (list[i].file_type == 'otf') { %>
                    <span class="middle"><i class="otf"></i><span class="s"><%= list[i].font_name %></span></span>
                    <% } else { %>
                    <span class="middle"><i></i><span class="s"><%= list[i].font_name %></span></span>
                    <% } %>
                    <% if (type == 2) { %>
                    <span class="si">相似度：<b><%= simi[i] %>%</b></span>
                    <% } %>
                    <!-- span class="pay">¥5</span -->
                </div>
                <% if(!list[i].font_image){ %>
                  <div class="font-pic"><img src="http://www.qiuziti.com/img/def_preview.png"/></div>
                <% } else { %>
                  <div class="font-pic"><img src="data:image/png;base64,<%= list[i].font_image %>"/></div>
                <% } %>
            </div>
            <div class="font-btn">
                <% if (list[i].download_level == 0) { %>
                <a class="font-down" href="./download.html?id=<%= list[i].font_id %>&font=<%= list[i].font_name %>" target="_blank"></a>
                <% } else if (list[i].download_level == 1) { %>
                <a class="font-gw" href="<%= list[i].font_company_url %>" target="_blank">官</a>
                <% } else { %>
                <a class="font-pay"></a>
                <% } %>
                <a class="font-collect" data-id="<%= list[i].id %>"></a>
                <% if (created) { %>
                <a class="font-delete" data-id="<%= list[i].id %>"></a>
                <% } %>
            </div>
          </div>
        </div>
        <% } %>
      */
    }),
    // 字体图表 type: 1 搜索字体列表，2 识图字体列表，3 字体单字体列表
    'fontpislist': (function () {
      /*
        <% for (var i=0; i<count; i++) { %>
        <div class="font-pisitem" data-url="./download.html?id=<%= list[i].font_id %>&font=<%= list[i].font_name %>">
            <div class="pic">
                <% if (list[i].font_effect_img_path) { %>
                <img src="<%= list[i].font_effect_img_path %>" />
                <% } else { %>
                <img src="./image/common/fontlist-default.jpg" />
                <% } %>
            </div>
            <div class="tit">
                <p class="fl"><%= list[i].font_name %></p>
                <p class="fr">
                <% if (type == 2) { %>
                    <span class="si">相似度：<b><%= simi[i] %>%</b></span>
                <% } %>
                    <!-- span class="pay">¥5</span -->
                </p>
            </div>
            <div class="ban">
                <p class="fl">共9张样张</p>
                <p class="fr">
                <% if (list[i].download_level == 0) { %>
                    <a class="font-down" href="./download.html?id=<%= list[i].font_id %>&font=<%= list[i].font_name %>" target="_blank"></a>
                <% } else if (list[i].download_level == 1) { %>
                    <a class="font-gw" href="<%= list[i].font_company_url %>" target="_blank">官</a>
                <% } else { %>
                    <a class="font-pay"></a>
                <% } %>
                    <a class="font-collect" data-id="<%= list[i].id %>"></a>
                <% if (created) { %>
                    <a class="font-delete" data-id="<%= list[i].id %>"></a>
                <% } %>
                </p>
            </div>
        </div>
        <% } %>
      */
    }),
    // font-main 对应：未找到字体
    'searchnodata': (function () {
      /*
        <div class="font-empty">
            <p>未找到含有<span> <%= font %> </span>关键字的字体</p>
            <p>如果您有找到这个字体欢迎通过邮件发送给我们，邮箱：qiuziti@qq.com</p>
        </div>
       */
    }),
    // font-attr 对应：字体详情
    'searchattrlist': (function () {
      /*
        <div class="font-attr-content">
            <div class="font-attr-item">
                <span>文件名称</span>
                <p><%= font_name %></p>
            </div>
            <div class="font-attr-item">
              <span>字体家族</span>
              <p><%= family %></p>
            </div>
            <div class="font-attr-item">
              <span>文件大小</span>
              <p><%= file_size_text %></p>
            </div>
            <div class="font-attr-item">
              <span>PostScript名称</span>
              <p><%= postscript_name %></p>
            </div>
            <div class="font-attr-item">
              <span>风格</span>
              <p><%= font_style %></p>
            </div>
            <div class="font-attr-item">
              <span>格式</span>
              <p><%= file_type %></p>
            </div>
            <div class="font-attr-item">
              <span>语言</span>
              <p><%= language %></p>
            </div>
            <div class="font-attr-item">
              <span>版本</span>
              <p><%= version %></p>
            </div>
            <div class="font-attr-item">
              <span>字符集</span>
              <p><%= charset %></p>
            </div>
            <div class="font-attr-item">
              <span>字符数</span>
              <p><%= char_size %></p>
            </div>
            <div class="font-attr-item">
              <span>版权</span>
              <p><%= copyright %></p>
            </div>
        </div>
       */
    }),
    // font-attr 对应：未选中字体
    'searchattrnone': (function () {
      /*
        <div class="font-attr-empty">
          <i></i>
          <p>未选中字体</p>
        </div>
       */
    }),
    // 用户中心模版
    // 登录
    'login': (function () {
        /*
            <div class="login-body">
                <div class="login-msg-body">
                    <div class="login-warning">
                        <i></i><span>公共场所不建议自动登录，以防账号丢失</span>
                    </div>
                </div>
                <div class="login-input-blur">
                    <div class="login-input">
                        <div class="username-icon login-bg user-pic"></div>
                        <input id="lgnLoginCode" name="loginCode" type="tel" placeholder="请输入邮箱、手机号码或链图云帐号" maxlength="120" />
                        <div class="log-input-msg"></div>
                    </div>
                </div>
                <div class="login-input-blur">
                    <div class="login-input">
                        <div class="username-icon login-bg pass-pic"></div>
                        <input id="lgnPwd" name="password" type="password" placeholder="请输入密码" maxlength="16" />
                        <div class="log-input-msg"></div>
                    </div>
                </div>
                <div class="login-codes">
                    <input id="inputCode" type="text" placeholder="请输入验证码" maxLength="4" />
                    <span id="code" class="my-code"></span>
                </div>
                <div class="login-btn">
                    <input id="logSubmit" type="button" value="登录" />
                </div>
                <div class="login-extra">
                    <a href="javascript:void(0)">忘记密码？</a>
                </div>
                <div class="third-party-div">
                    <p>其他方式登录</p>
                    <span style="display:none;"><i class="base-icon icon-third-party wx-party"></i><a></a></span>
                    <span><a id="qqLoginBtn"></a></span>
                    <span style="display:none;"><a id="wb_connect_btn"></a></span>
                </div>
            </div>
         */
    }),
    // 注册
    'register': (function () {
        /*
        <div class="register-body">
            <div class="waringBox">
                <div class="log-msg">
                    <span>注：已注册</span><a href="http://www.zhaoyinqian.com" title="找印前">找印前</a><span>的用户可以直接登录！</span>
                </div>
                <span class="other"><span>切换&nbsp;</span><a href="javascript:void(0)">手机注册</a></span>
            </div>
            <div class="regist-info">
                <div class="regist-emails on">
                    <div class="regist-input">
                        <input name="loginEmail" type="text" class="regist-email" placeholder="请输入真实邮箱以便验证" maxlength="" />
                        <div class="log-input-msg"><i></i><span>请输入真实邮箱以便验证</span></div>
                    </div>
                </div>
                <div class="regist-phones">
                    <div class="regist-input">
                        <input name="loginPhone" type="tel" class="regist-phone" placeholder="请输入手机号码" maxlength="11" />
                        <div class="log-input-msg"><i></i><span>请输入手机号码</span></div>
                    </div>
                    <div id="regist-valicode" class="regist-input1 ihide">
                        <div class="sms">
                            <input type="text" class="input1 regist-code" placeholder="请输入验证码" maxlength="4" />
                            <span id="code" class="my-code"></span>
                        </div>
                        <div class="log-input-msg"><i></i><span>验证码输入有误，请重新验证！</span></div>
                    </div>
                    <div class="regist-input1">
                        <div class="sms">
                            <input type="tel" class="input1 regist-phonecode" placeholder="短信校验码" maxlength="6" />
                            <input type="hidden" class="regist-phonekey" />
                            <input type="button" class="buttonfont" value="获取短信验证码" />
                        </div>
                        <div class="log-input-msg"><i></i><span>请输入短信校验码</span></div>
                    </div>
                </div>
                <div class="regist-input">
                    <input name="password" type="password" class="regist-password" placeholder="请输入6-16个字符、字母加数字或者符号的组合" maxlength="16" />
                    <div class="log-input-msg"><i></i><span>6-16个字符，请使用字母加数字或者符号的组合</span></div>
                </div>
                <div class="regist-input">
                    <input name="truePassword" type="password" class="regist-repassword" placeholder="请重复输入密码" maxlength="16" />
                    <div class="log-input-msg"><i></i><span>请重复输入密码</span></div>
                </div>
            </div>
            <input class="regist-commit" type="button" value="同意协议并注册" />
            <div class="regist-xieyi">
                <label for="xieyi"><a class="color-main" href="javascript:void(0)">《链图云服务协议》</a></label>
                <span class="login-font"><span>已有账号，</span><a href="javascript:void(0)" title="登录" class="loginBtn">登录</a></span>
            </div>
        </div>
         */
    }),
    // 忘记密码
    'forget': (function () {
        /*
        <div class="forget">
            <span class="alert-title">请输入注册的手机号/邮箱</span>
            <div class="forgotpwd-input">
                <div class="username-icon login-bg user-pic"></div>
                <input class="input forget-user" type="text" placeholder="手机号/邮箱" maxlength="120" />
                <div class="log-input-msg">
                    <i></i><span>公共场所不建议自动登录，以防账号丢失</span>
                </div>
            </div>
            <div class="login-codes ihide">
                <input type="text" class="forget-code" placeholder="请输入图形验证码" maxlength="4" />
                <span id="focode" class="my-code"></span>
                <div class="log-input-msg"><i></i><span>验证码输入有误，请重新验证！</span></div>
            </div>
            <input type="button" value="下一步" class="recommend" />
        </div>
         */
    }),
    // 验证帐号
    'valiaccount': (function () {
        /*
        <div class="forget">
            <% if (vtype == 1) { %>
            <span class="alert-title">您正在为账号 <b><%= user %></b> 修改<% if (tova == 'phone') { %>手机号<% } else if (tova == 'email') { %>邮箱<% } else { %>登录密码<% } %>，为保护账号安全，需通过手机 <b><%= utils.encPhone(account) %></b> 验证身份</span>
            <div class="login-codes">
                <input type="text" class="forget-code" placeholder="请输入图形验证码" maxlength="4" />
                <span id="focode" class="my-code"></span>
                <div class="log-input-msg"><i></i><span>验证码输入有误，请重新验证！</span></div>
            </div>
            <% } else { %>
            <span class="alert-title">您正在为账号 <b><%= user %></b> 修改<% if (tova == 'phone') { %>手机号<% } else if (tova == 'email') { %>邮箱<% } else { %>登录密码<% } %>，为保护账号安全，需通过邮箱 <b><%= utils.encEmail(account) %></b> 验证身份</span>
            <% } %>
            <input type="hidden" class="forget-account" value="<%= account %>" />
            <input type="button" value="立即验证" class="recommend" />
        </div>
         */
    }),
    // 验证验证码
    'validation': (function () {
        /*
        <div class="forget">
            <% if (type == 1) { %>
            <span class="alert-title">验证码已发至手机 <b><%= utils.encPhone(user) %></b></span>
            <% } else { %>
            <span class="alert-title">验证码已发至邮箱 <b><%= utils.encEmail(user) %></b></span>
            <% } %>
            <input type="hidden" class="forget-user" value="<%= user %>" />
            <input type="hidden" class="forget-key" value="<%= key %>" />
            <input type="hidden" class="forget-userid" value="<%= userId %>" />
            <% if (type == 1) { %>
            <div class="login-codes ihide">
                <input type="text" class="forget-tcode" placeholder="请输入图形验证码" maxlength="4" />
                <span id="code" class="my-code"></span>
                <div class="log-input-msg"><i></i><span>验证码输入有误，请重新验证！</span></div>
            </div>
            <% } %>
            <div class="forgotpwd-input1">
                <div class="forgotpwd">
                    <% if (type == 1) { %>
                    <input class="input1 forget-code" type="text" placeholder="请输入短信验证码" maxlength="6" />
                    <% } else { %>
                    <input class="input1 forget-code" type="text" placeholder="请输入邮箱验证码" maxlength="6" />
                    <% } %>
                    <input type="button" class="valibtn buttonfont" value="获取验证码" />
                </div>
                <div class="log-input-msg"><i></i><span>验证码输入有误，请重新验证！</span></div>
            </div>
            <input type="button" value="下一步" class="recommend" />
        </div>
         */
    }),
    // 修改/绑定 验证
    'validations': (function () {
        /*
        <div class="forget">
        <% if (tip == 'update') { %>
            <% if (type == 1) { %>
            <span class="alert-title">输入真实的手机号，以便验证激活</span>
            <% } else { %>
            <span class="alert-title">输入真实的邮箱，以便验证激活</span>
            <% } %>
        <% } %>
            <input type="hidden" class="forget-key" />
            <div class="forgotpwd-input">
                <div class="username-icon login-bg user-pic"></div>
                <% if (type == 1) { %>
                <input class="input forget-user" type="text" placeholder="请输入要绑定的新手机" maxlength="120" />
                <% } else { %>
                <input class="input forget-user" type="text" placeholder="请输入要绑定的新邮箱" maxlength="120" />
                <% } %>
                <div class="log-input-msg">
                    <i></i><span>公共场所不建议自动登录，以防账号丢失</span>
                </div>
            </div>
            <% if (type == 1) { %>
            <div class="login-codes ihide">
                <input type="text" class="forget-tcode" placeholder="请输入图形验证码" maxlength="4" />
                <span id="code" class="my-code"></span>
                <div class="log-input-msg"><i></i><span>验证码输入有误，请重新验证！</span></div>
            </div>
            <% } %>
            <div class="forgotpwd-input1">
                <div class="forgotpwd">
                    <% if (type == 1) { %>
                    <input class="input1 forget-code" type="text" placeholder="请输入短信验证码" maxlength="6" />
                    <% } else { %>
                    <input class="input1 forget-code" type="text" placeholder="请输入邮箱验证码" maxlength="6" />
                    <% } %>
                    <input type="button" class="valisbtn buttonfont" value="获取验证码" />
                </div>
                <div class="log-input-msg"><i></i><span>验证码输入有误，请重新验证！</span></div>
            </div>
            <input type="button" value="立即绑定" class="recommend" />
        </div>
         */
    }),
    // 找回密码
    'find': (function () {
        /*
        <div class="forget">
            <span>请输入6-12的字符（请使用字母加数字或者符号的组合）作为密码</span>
            <input type="hidden" class="forget-user" value="<%= userCode %>" />
            <input type="hidden" class="forget-userid" value="<%= userId %>" />
            <input type="hidden" class="forget-key" value="<%= key %>" />
            <input type="hidden" class="forget-code" value="<%= code %>" />
            <div class="forgotpwd-input">
                <input class="input forget-password" type="password" placeholder="请输入新的登录密码" maxlength="16" />
                <div class="log-input-msg"><i></i><span>密码格式不对，请重新输入</span></div>
            </div>
            <div class="forgotpwd-input">
                <input class="input forget-repassword" type="password" placeholder="再次输入登录密码确认" maxlength="16" />
                <div class="log-input-msg"><i></i><span>密码格式不对，请重新输入</span></div>
            </div>
            <input type="button" value="重置" class="recommend" />
        </div>
         */
    }),
    // VIP中心模版
    // 订单列表
    'orderitem': (function () {
        /*
            <div class="order-list">
                <% for (var i=0; i<count; i++) { %>
                    <% if (list[i].status == 0) { %>
                        <div class="order-item wait">
                            <div class="item-top"><span class="order-date"><%= utils.getTime(list[i].createTime, 'YY-MM-DD') %></span>订单编号：<%= list[i].orderNo %></div>
                            <div class="item-content">
                                <div class="item-firstbox">
                                    <div class="g-item-box">
                                        <div class="box-img">
                                            <img src="image/common/vip_logo_mini.png" alt="" />
                                        </div>
                                        <div class="box-price"><%= list[i].money %>元</div>
                                        <div class="box-info">
                                            <p class="info-title"><%= list[i].orderTitle %></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="item-box">
                                    <p class="status">请在<label>30分钟</label>内付款</p>
                                    <a href="./ordetail.html?orderNo=<%= list[i].orderNo %>" class="detail">订单详情</a>
                                </div>
                                <div class="item-box">
                                    <div class="m-btn w110" data-no="<%= list[i].orderNo %>" data-id="<%= list[i].id %>" data-text="<%= list[i].orderTypeText %>" data-price="<%= list[i].money %>">立即支付</div>
                                    <p class="m-btn-text" data-id="<%= list[i].id %>" data-status="-1">取消订单</p>
                                </div>
                            </div>
                        </div>
                    <% } else if (list[i].status < 0) { %>
                        <div class="order-item">
                            <div class="item-top"><span class="order-date"><%= utils.getTime(list[i].createTime, 'YY-MM-DD') %></span>订单编号：<%= list[i].orderNo %></div>
                            <div class="item-content">
                                <div class="item-firstbox">
                                    <div class="g-item-box">
                                        <div class="box-img">
                                            <img src="image/common/vip_logo_mini.png" alt="" />
                                        </div>
                                        <div class="box-price"><%= list[i].money %>元</div>
                                        <div class="box-info">
                                            <p class="info-title"><%= list[i].orderTitle %></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="item-box">
                                    <p class="status g-cl-gray">交易取消</p>
                                    <a href="./ordetail.html?orderNo=<%= list[i].orderNo %>" class="detail">订单详情</a>
                                </div>
                                <div class="item-box"></div>
                            </div>
                        </div>
                    <% } else if (list[i].status == 4) { %>
                        <div class="order-item">
                            <div class="item-top"><span class="order-date"><%= utils.getTime(list[i].createTime, 'YY-MM-DD') %></span>订单编号：<%= list[i].orderNo %></div>
                            <div class="item-content">
                                <div class="item-firstbox">
                                    <div class="g-item-box">
                                        <div class="box-img">
                                            <img src="image/common/vip_logo_mini.png" alt="" />
                                        </div>
                                        <div class="box-price"><%= list[i].money %>元</div>
                                        <div class="box-info">
                                            <p class="info-title"><%= list[i].orderTitle %></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="item-box">
                                    <p class="status"><label>交易成功</label></p>
                                    <a href="./ordetail.html?orderNo=<%= list[i].orderNo %>" class="detail">订单详情</a>
                                </div>
                                <div class="item-box"></div>
                            </div>
                        </div>
                    <% } %>
                <% } %>
            </div>
         */
    }),
    // 订单无数据
    'ordernodata': (function () {
        /*
        <div class="order-nodata">
            <img src="image/common/null.png" width="174" height="100" />
            <p>您当前没有订单</p>
        </div>
         */
    }),
    // 订单确认
    'ordersure': (function () {
        /*
            <div class="popup-content">
                <div class="order-item">
                    <img src="image/common/vip_logo_mini.png" alt="" />
                    <span class="item-title">求字体VIP-<%= text %></span>
                    <span class="item-price right">&yen;<%= price %></span>
                </div>

                <div class="order-info">
                    <div class="info-left left"><i class="m-icons icon-agree"></i><a href="http://www.lianty.com/lty/dist/#/agreement" target="_blank">同意《付费会员服务协议》</a></div>
                    <div class="info-price right">需支付：<label class="price">&yen;<%= price %></label></div>
                </div>

                <div class="order-pay">
                    <div class="pay-title">选择支付方式</div>
                    <div class="pay-types">
                        <div class="pay-type left on" data-type="1">
                            <p class="m-icons icon-wxpay"></p>
                            <i class="m-icons icon-select"></i>
                        </div>
                        <div class="pay-type left" data-type="2">
                            <p class="m-icons icon-alipay"></p>
                            <i class="m-icons icon-select"></i>
                        </div>
                    </div>
                </div>

                <div class="order-btns">
                    <div class="m-btn w130 cosure" data-id="<%= id %>" data-text="<%= text %>">立即支付</div>
                    <div class="m-btn w130 common">取消</div>
                </div>
            </div>
        */
    }),
    // 订单取消
    'ordercancel': (function () {
        /*
            <div class="popup-content">
                <div class="order-info" style="margin: 20px auto; padding: 30px 0; text-align: center; font-size: 16px;">
                    有些东西错过了就不再，真的不想买了吗？
                </div>
                <div class="order-btns">
                    <div class="m-btn w130 cosure" data-id="<%= id %>" data-status="<%= status %>">取消订单</div>
                    <div class="m-btn w130 common">关闭</div>
                </div>
            </div>
         */
    }),
    'ordetail': (function () {
        /*
            <% if (status == 0) { %>
            <div class="trade-box">
                <div class="tbox-inner">
                    <div class="ts-status"><i class="m-icons icon-trade-warn left"></i><span>待支付</span></div>
                    <div class="ts-info">
                        <div class="info-item">为避免系统自动取消订单，请在<label class="item-label blue"><%= utils.getTime(createTime + 1800000) %></label>前进行付款</div>
                        <div class="info-item">订单编号：<%= orderNo %></div>
                        <div class="info-item">下单时间：<%= utils.getTime(createTime) %></div>
                    </div>
                    <div class="trade-func">
                        <div class="cancel-btn cursor" data-id="<%= id %>" data-status="-1">取消订单</div>
                        <div class="m-btn w130" data-no="<%= orderNo %>" data-id="<%= id %>" data-text="<%= orderTypeText %>" data-price="<%= money %>">立即支付</div>
                    </div>
                </div>
            </div>
            <% } else if (status == 4) { %>
            <div class="trade-box">
                <div class="tbox-inner">
                    <div class="ts-status"><i class="m-icons icon-trade-ok left"></i><span>交易成功</span></div>
                    <div class="ts-info">
                        <div class="info-item">订单编号：<%= orderNo %></div>
                        <div class="info-item">付款时间：<%= utils.getTime(payTime) %></div>
                    </div>
                </div>
            </div>
            <% } else if (status < 0) { %>
            <div class="trade-box">
                <div class="tbox-inner">
                    <div class="ts-status"><i class="m-icons icon-trade-error left"></i><span>交易取消</span></div>
                    <div class="ts-info">
                        <% if (status == -3) { %>
                        <div class="info-item">取消原因：买家未付款，系统自动取消订单</div>
                        <% } else if (status == -1) { %>
                        <div class="info-item">取消原因：买家取消订单</div>
                        <% } %>
                        <div class="info-item">订单编号：<%= orderNo %></div>
                        <div class="info-item">失效时间：<%= utils.getTime(closeTime) %></div>
                    </div>
                </div>
            </div>
            <% } %>

            <!-- 商品信息 -->
            <div class="goods-box">
                <div class="gbox-top">
                    <span class="left">商品信息</span>
                    <span class="right">价格</span>
                </div>
                <div class="gbox-list">
                    <div class="list-item">
                        <div class="g-item-box">
                            <div class="box-img">
                                <img src="image/common/vip_logo_mini.png" alt="" />
                            </div>
                            <div class="box-price"><%= money %>元</div>
                            <div class="box-info">
                                <p class="info-title"><%= orderTitle %></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="gbox-bottom">
                    <span class="b-total">总计：</span>
                    <span class="b-price"><%= money %>元</span>
                </div>
            </div>
         */
    }),
    // 微信支付
    'weixin': (function () {
        /*
        <div class="popup-contentwx">
            <div class="c-item left">
                <div class="item-top">
                    <i class="m-icons icon-scan left"></i>
                    <span>请使用微信扫一扫<br/>扫描二维码支付</span>
                </div>
                <input type="hidden" id="source" value="<%= data %>" />
                <div class="item-qrcode" id="qrcode"></div>
                <div class="item-tip">二维码有效时长为30分钟，请尽快支付！</div>
            </div>
            <div class="c-image left"><img src="image/common/wechat_scan.png" alt="" /></div>
        </div>
         */
    }),
    // 字体单模版
    // 字体单-列表
    'fontlistdata': (function () {
        /*
        <% for (var i=0; i<count; i++) { %>
        <li class="fontlist-item">
            <a href="./fontdetail.html?id=<%= list[i].id %>">
                <div class="pic">
                    <% if (list[i].oss_key == '') { %>
                    <img src="image/common/fontlist-default.png" />
                    <% } else { %>
                    <img src="<%= HOST.WEB_SERVER + API.getImgByOSSKey %>?oss_key=<%= list[i].oss_key %>" />
                    <% } %>
                </div>
                <div class="tit"><span><%= list[i].list_name %></span></div>
                <div class="ban">
                    <p class="fl">共<%= list[i].font_count %>款字体</p>
                    <p class="fr">
                        <span class="collect <% if (userid && userid.id == list[i].create_user) { %>dis-collect<% } %>" data-id="<%= list[i].id %>">
                        <% if (user) { %>
                            <% if (utils.isInArr(user, list[i].id)) { %>
                            <i class="cur"></i>
                            <% } else { %>
                            <i></i>
                            <% } %>
                        <% } else { %>
                            <i></i>
                        <% } %>
                            <%= list[i].collect_count %>
                        </span>
                        <span class="share" data-id="<%= list[i].id %>" data-total="<%= list[i].font_count %>" data-title="<%= list[i].list_name %>" data-key="<%= list[i].oss_key %>"  data-name="<%= list[i].nick_name %>">
                            <i></i>
                            <%= list[i].share_count %>
                        </span>
                    </p>
                </div>
            </a>
        </li>
        <% } %>
         */
    }),
    // 字体单-详细列表
    'fontlistsdata': (function () {
        /*
        <% for (var i=0; i<count; i++) { %>
        <li class="fontlist-item">
            <a href="./fontdetail.html?id=<%= list[i].id %>">
                <div class="pic">
                    <% if (list[i].oss_key == '') { %>
                    <img src="image/common/fontlist-default.png" />
                    <% } else { %>
                    <img src="<%= HOST.WEB_SERVER + API.getImgByOSSKey %>?oss_key=<%= list[i].oss_key %>" />
                    <% } %>
                </div>
                <div class="tit"><span><%= list[i].list_name %></span></div>
                <div class="ban">
                    <p class="fl">共<%= list[i].font_count %>款字体</p>
                    <p class="fr">
                        <span class="collect <% if (userid && userid.id == list[i].create_user) { %>dis-collect<% } %>" data-id="<%= list[i].id %>">
                        <% if (user) { %>
                            <% if (utils.isInArr(user, list[i].id)) { %>
                            <i class="cur"></i>
                            <% } else { %>
                            <i></i>
                            <% } %>
                        <% } else { %>
                            <i></i>
                        <% } %>
                            <%= list[i].collect_count %>
                        </span>
                        <span class="share" data-id="<%= list[i].id %>" data-total="<%= list[i].font_count %>" data-title="<%= list[i].list_name %>" data-key="<%= list[i].oss_key %>" data-name="<%= list[i].nick_name %>">
                            <i></i>
                            <%= list[i].share_count %>
                        </span>
                    </p>
                </div>
                <div class="bnt">
                    <p class="fl">
                        <span class="edit" data-id="<%= list[i].id %>" data-listName="<%= list[i].list_name %>" data-tag="<%= list[i].tag %>" data-brief="<%= list[i].brief %>" data-coverImg="<%= list[i].oss_key %>">编辑</span>
                        <span class="delete" data-id="<%= list[i].id %>">删除</span>
                    </p>
                    <p class="fr"><%= utils.getTime(list[i].create_time, 'YY-MM-DD') %></p>
                </div>
            </a>
        </li>
        <% } %>
         */
    }),
    // 字体单-创建与编辑
    'fontedit': (function () {
        /*
        <div class="fontlist-edit">
            <div class="fontlist-edit-cont">
                <div class="fl">
                    <div class="fontlist-editbox">
                        <span>标题</span>
                        <input class="fontlist-name" type="text" placeholder="请输入你的字体单标题" <% if (type) { %> value="<%= listName %>" <% } %> />
                    </div>
                    <div class="fontlist-editbox">
                        <span>标签</span>
                        <% if (type) { %>
                            <p class="fontlist-tag" data-arr="<%= tag %>"><% var arr = tag.split(','); for (i=0,len=arr.length;i<len;i++) { %> <% if (i==len-1) { %> <i><%= arr[i] %></i> <% } else { %> <i><%= arr[i] %></i> / <% } %> <% } %></p>
                        <% } else { %>
                            <p class="fontlist-tag" data-arr="标签"></p>
                        <% } %>
                        <a class="fontlist-tag-btn" href="javscript:void(0);">选择标签</a>
                    </div>
                    <div class="fontlist-editbox">
                        <span>简介</span>
                        <textarea class="fontlist-brief" type="text" placeholder="请简要介绍一下你的字体单"><% if (type) { %><%= brief %><% } %></textarea>
                    </div>
                </div>
                <div class="fr">
                    <div class="fontlist-pic">
                    <% if (type && coverImg ) { %>
                        <img src="<%= HOST.WEB_SERVER + API.getImgByOSSKey %>?oss_key=<%= coverImg %>" data-img="<%= coverImg %>" />
                    <% } else { %>
                        <img src="image/common/fontlist-default.png" />
                    <% } %>
                    </div>
                    <div class="fontlist-pic-btn">
                        编辑封面
                        <input class="fontlist-pic-upload" type="file" />
                    </div>
                </div>
            </div>
            <% if (type) { %>
            <div class="fontlist-edit-btns">
                <span class="fl">
                    <a href="javascript:void(0);" class="save">保存</a>
                    <a href="javascript:void(0);" class="cancel">取消</a>
                </span>
                <span class="fr">
                    <a href="javascript:void(0);" class="delete">删除字体单</a>
                </span>
            </div>
            <% } else { %>
            <div class="fontlist-edit-btn">
                <a href="javascript:void(0);" class="save">保存</a>
                <a href="javascript:void(0);" class="cancel">取消</a>
            </div>
            <% } %>
        </div>
         */
    }),
    // 字体单-选择标签
    'fonttag': (function () {
        /*
        <div class="fontlist-select-tag">
            <div class="fontlist-select-box">
                <div class="fontlist-select-style">
                    <span>字体风格</span>
                    <ul>
                        <% if (tagArr.length == 0) { %>
                            <% for (i=0,len=tagItem.length; i<len; i++) { %>
                                <li><%= tagItem[i] %></li>
                            <% } %>
                        <% } else { %>
                            <% for (i=0,len=tagItem.length; i<len; i++) { %>
                                <% if (tagArr.indexOf(tagItem[i]) > -1) { %>
                                    <li class="active"><%= tagItem[i] %></li>
                                <% } else { %>
                                    <li><%= tagItem[i] %></li>
                                <% } %>
                            <% } %>
                        <% } %>
                    </ul>
                </div>
            </div>
            <div class="fontlist-select-btn">
                <a href="javascript:void(0);">保存并关闭</a>
            </div>
        </div>
         */
    }),
    // 字体单-无数据
    'fontlistnodata': (function () {
        /*
        <div class="fontlist-nodata">
            <img src="image/common/null.png" width="174" height="100" />
            <p>暂无数据...</p>
        </div>
         */
    }),
    // 字体单详情-头部信息
    'fontdetailheader': (function () {
        /*
        <div class="pic">
            <% if (font.oss_key == '') { %>
            <img src="image/common/fontlist-default.png" />
            <% } else { %>
            <img src="<%= HOST.WEB_SERVER + API.getImgByOSSKey %>?oss_key=<%= font.oss_key %>" data-img="<%= font.oss_key %>" />
            <% } %>
        </div>
        <div class="con">
            <h2><span><%= font.list_name %></span><% if (isCreater) { %><i class="edit" data-id="<%= font.id %>"></i><% } %></h2>
            <div class="creatd">
                <span class="users"><% if (font.head_portrait_path) { %><img src="<%= font.head_portrait_path %>" id="avatar" /><% } else { %><img src="image/common/avatar-head.png" id="avatar" /><% } %><i><% if (font.nick_name) { %><%= font.nick_name %><% } else { %>XXX<% } %></i></span><span class="times">创建于<%= utils.getTime(font.create_time, 'YY-MM-DD') %></span><span class="total">共 <b><%= font.font_count %>款</b> 字体</span>
            </div>
            <div class="btns">
                <!-- a class="down" href="javascript:void(0);"><i></i>打包下载</a -->
                <% if (isCreater) { %>
                <a class="collect dis-collect" href="javascript:void(0);" data-id="<%= font.id %>">
                    <% if (user) { %>
                        <% if (utils.isInArr(user, font.id)) { %>
                        <i class="cur"></i>
                        <% } else { %>
                        <i></i>
                        <% } %>
                    <% } else { %>
                        <i></i>
                    <% } %>
                    已收藏(<%= font.collect_count %>)
                </a>
                <% } else { %>
                <a class="collect" href="javascript:void(0);" data-id="<%= font.id %>">
                    <% if (user) { %>
                        <% if (utils.isInArr(user, font.id)) { %>
                        <i class="cur"></i>
                        <% } else { %>
                        <i></i>
                        <% } %>
                    <% } else { %>
                        <i></i>
                    <% } %>
                    已收藏(<%= font.collect_count %>)
                </a>
                <% } %>
                <a class="share" href="javascript:void(0);" data-id="<%= font.id %>" data-total="<%= font.font_count %>" data-title="<%= font.list_name %>" data-key="<%= font.oss_key %>" data-name="<%= font.nick_name %>"><i></i>分享</a>
            </div>
            <div class="tag">
                <p data-arr="<%= font.tag %>">标签：<% var arr = font.tag.split(','); for (i=0,len=arr.length;i<len;i++) { %> <% if (i==len-1) { %> <i><%= arr[i] %></i> <% } else { %> <i><%= arr[i] %></i> / <% } %> <% } %></p>
            </div>
            <div class="info <% if (utils.checkLong(font.brief) < 1) { %>ihide<% } %>">
                <p>简介：
                <% if (utils.checkLong(font.brief) > 108) { %>
                    <%= font.brief %>
                    </p>
                    <span class="arrow"></span>
                <% } else { %>
                    <%= font.brief %>
                    </p>
                <% } %>
            </div>
        </div>
         */
    }),
    // 字体单详情-无数据（未登录、未创建）
    'fontdetailunnodata': (function () {
        /*
        <div class="fontlist-nodata">
            <img src="image/common/fonts-null.png" width="162" height="94" />
            <p>暂无数据...</p>
        </div>
         */
    }),
    // 字体单详情-无数据（登录、创建者）
    'fontdetailinnodata': (function () {
        /*
        <div class="fontlist-nodata">
            <img src="image/common/fonts-null.png" width="162" height="94" />
            <h2>赶快去收藏你喜欢的字体</h2>
            <p>在字体列表点击“<i class="addf"></i>”将字体加入字体画板</p>
        </div>
         */
    }),
    // 字体单-收藏字体列表
    'fontcollectlist': (function () {
        /*
        <div class="fontlist-collect">
            <div class="fontlist-collect-cont ihide">
                <ul>
                    <li class="edit ihide">
                        <span class="icon"><i></i></span>
                        <span class="inpt"><input class="fontlist-create-name" type="text" /></span>
                        <span class="btn">
                            <a href="javascript:void(0);" class="fontlist-collect-add">新建</a>
                            <a href="javascript:void(0);" class="fontlist-collect-cancel">取消</a>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="fontlist-collect-nodata">
                <div class="loading" style="padding:114px 0px;">
                  <img style="margin-top:0px;" src="image/common/loading.gif" alt=""><span class="loading-text">正在加载中...</span>
                </div>
            </div>
            <div class="fontlist-collect-btn ihide">
                <p class="fontlist-collect-create"><i></i>创建字体单</p>
            </div>
        </div>
         */
    }),
    // 分享模版
    'share': (function () {
        /*
            <div class="box_spreads">
                <div class="btn"></div>
            </div>
         */
    }),
    // 上传字体样张模版
    'fontpicupload': (function () {
        /*
        <div class="font-pic-upload">
            <p>请上传含有“ <b><%= font %></b> ”字体的图片</p>
            <div class="font-pic-upload-box">
                <input type="file" name="font_uploaded_file" class="font-pic-upload-file" multiple="" />
                <div class="font-pic-upload-btn">上传字体样张</div>
                <p>点击或 拖拽文件到这里上传</p>
                <i>请上传72分辨率，宽大于320像素的JPG、PNG图片</i>
            </div>
        </div>
         */
    })
}