/**
 * 组件管理类
 * author dmj
 * date 2017/9/11
 * @class ComponentManager
 */
var ComponentManager;
(function (ComponentManager) {
    /**
     * 获取按钮
     * @param buttonName   按钮图片名称
     * @param textStr      按钮文字对应的key
     * @param callback     点击回调函数
     * @param handler
     * @param param        参数
     * @param noDownImgType 没有按钮资源时候，按下状态处理 0缩放处理，1透明处理，3不处理
     */
    function getButton(buttonName, textStr, callback, handler, param, noDownImgType, fontSize, fontColor) {
        var textSize = fontSize;
        var textColor = TextFieldConst.COLOR_WHITE;
        if (!fontSize) {
            switch (buttonName) {
                case ButtonConst.BTN_SMALL_BLUE:
                case ButtonConst.BTN_SMALL_YELLOW:
                case ButtonConst.BTN_SMALL_RED:
                    textSize = TextFieldConst.FONTSIZE_CONTENT_COMMON;
                    break;
                default:
                    textSize = TextFieldConst.FONTSIZE_BUTTON_COMMON;
                    break;
            }
        }
        textColor = 0;
        if (fontColor) {
            textColor = fontColor;
        }
        var btn = new BaseButton();
        btn.init(buttonName, textStr, callback, handler, param, textSize, noDownImgType);
        btn.setColor(textColor);
        return btn;
    }
    ComponentManager.getButton = getButton;
    /**
     * 获取tabbar组件
     * @param buttonName     按钮图片名称
     * @param textArr        所有按钮显示文字
     * @param callback       按钮回调函数
     * @param handler        按钮所属对象
     * @param param          参数
     */
    function getTabBarGroup(buttonName, textArr, callback, handler, param, aligh, buttonWidth, showPic, showWidth, showHeight) {
        var color = TextFieldConst.COLOR_TABBAR;
        var selectedColor = TextFieldConst.COLOR_TABBAR_SELECT;
        var tbg = new TabBarGroup();
        tbg.init(buttonName, textArr, callback, handler, param, aligh, buttonWidth, showPic, showWidth, showHeight);
        tbg.setColor(color, selectedColor);
        return tbg;
    }
    ComponentManager.getTabBarGroup = getTabBarGroup;
    function getScroTabBarGroup(buttonName, textArr, callback, handler, param, aligh, buttonWidth, showPic, showWidth, showHeight) {
        var color = TextFieldConst.COLOR_TABBAR;
        var selectedColor = TextFieldConst.COLOR_TABBAR_SELECT;
        var tbg = new TabBarGroup();
        tbg.initScro(buttonName, textArr, callback, handler, param, aligh, buttonWidth, showPic, showWidth, showHeight);
        tbg.setColor(color, selectedColor);
        return tbg;
    }
    ComponentManager.getScroTabBarGroup = getScroTabBarGroup;
    function getTabBarChatGroup(buttonName, textArr, callback, handler, param, aligh) {
        var color = TextFieldConst.COLOR_TABBAR;
        var selectedColor = TextFieldConst.COLOR_TABBAR_SELECT;
        var tbg = new TabBarChatGroup();
        tbg.init(buttonName, textArr, callback, handler, param, aligh);
        tbg.setColor(color, selectedColor);
        return tbg;
    }
    ComponentManager.getTabBarChatGroup = getTabBarChatGroup;
    function getTabBarScrollGroup(textArr, callback, handler, param, aligh, linenum) {
        var color = TextFieldConst.COLOR_TABBAR;
        var selectedColor = TextFieldConst.COLOR_TABBAR_SELECT;
        var tbg = new TabBarScrollGroup();
        tbg.initScroll(textArr, callback, handler, linenum);
        tbg.setColor(color, selectedColor);
        return tbg;
    }
    ComponentManager.getTabBarScrollGroup = getTabBarScrollGroup;
    function getTabBarScrollBtnGroup(textArr, callback, handler, param, aligh, linenum, maxnum) {
        var color = TextFieldConst.COLOR_TABBAR;
        var selectedColor = TextFieldConst.COLOR_TABBAR_SELECT;
        var tbg = new TabBarScrollBtnGroup();
        tbg.initScroll(textArr, callback, handler, linenum, maxnum);
        tbg.setColor(color, selectedColor);
        return tbg;
    }
    ComponentManager.getTabBarScrollBtnGroup = getTabBarScrollBtnGroup;
    /**
     * 获取ProgressBar组件
     * @param barName     	进度条图片名称
     * @param barBgName     进度条背景图片名称
     * @param barWidth      进度条宽度
     * @param barHeight     进度条高度
     */
    function getProgressBar(barName, barBgName, barWidth) {
        var bar = new ProgressBar();
        bar.init(barName, barBgName, barWidth);
        return bar;
    }
    ComponentManager.getProgressBar = getProgressBar;
    /**
     * 获取CustomMovieClip组件
     * @param imageNamePre   图片名称前缀
     * @param frameCount     帧数
     * @param frameRate      帧频 (毫秒)
     */
    function getCustomMovieClip(imageNamePre, frameCount, frameRate) {
        var clip = new CustomMovieClip();
        clip.imageNamePre = imageNamePre;
        var resArr = [];
        //遍历帧数
        if (imageNamePre) {
            if (!frameCount) {
                var jsondata = RES.getRes(imageNamePre);
                if (jsondata && jsondata._textureMap && Object.keys(jsondata._textureMap).length) {
                    frameCount = Object.keys(jsondata._textureMap).length;
                }
            }
            for (var i = 1; i <= frameCount; i++) {
                resArr.push(imageNamePre + i);
            }
            clip.frameImages = resArr;
        }
        clip.playFrameRate = frameRate;
        return clip;
    }
    ComponentManager.getCustomMovieClip = getCustomMovieClip;
    /**
     * 给显示对象添加滑动，注意这个不是滑动列表，如果要使用滑动列表请调用ComponentManager.getScrollList
     * @param content 需要添加滑动的对象
     * @param scrollRect 设置content坐标，设置可显示区域大小 使用egret.Rectangle.create()生成，然后用setto修改
     */
    function getScrollView(content, scrollRect) {
        var scrollView = new ScrollView();
        scrollView.setContent(content);
        scrollView.width = scrollRect.width;
        scrollView.height = scrollRect.height;
        scrollView.x = scrollRect.x;
        scrollView.y = scrollRect.y;
        return scrollView;
    }
    ComponentManager.getScrollView = getScrollView;
    /**
     * 获取自定义文本
     * @param textStr       文本
     * @param fontSize      字体大小必填，通过TextFieldConst.ts获取
     * @param color         字体颜色
     */
    function getTextField(textStr, fontSize, color) {
        if (textStr == undefined || textStr == null) {
            textStr = "";
        }
        var tf = new BaseTextField();
        if (PlatformManager.checkIsThSp()) {
            tf.fontFamily = TTFManager.TH_FONTNAME;
            tf.text = "";
            textStr = String(textStr);
            if (textStr && textStr.indexOf("<") > -1 && textStr.indexOf(">") > -1) {
                try {
                    tf.textFlow = (new egret.HtmlTextParser).parser(textStr);
                }
                catch (e) {
                    tf.text = textStr;
                }
            }
            else {
                tf.text = textStr;
            }
            // tf.textFlow = (new egret.HtmlTextParser).parser(String(textStr));			
        }
        else {
            tf.text = textStr;
        }
        tf.size = fontSize;
        if (color) {
            tf.setColor(color);
        }
        //如果是英文版本 按照单词换行
        if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsPtLang() || PlatformManager.checkIsRuLang()) {
            tf.wordWrap = true;
        }
        // tf.fontFamily = "Trirong";
        return tf;
    }
    ComponentManager.getTextField = getTextField;
    /**
     * 获取滑动列表
     * @param scrollListClass 滑动列表元素类，继承ScrollListItem类，重写initItem方法实现
     * @param dataList 滑动列表数据
     * @param scrollRect 滑动列表相对父容器的位置和显示区域
     * @param itemParam 刷新元素对象的参数，分别原样传到scrollListItem的initData方法，默认值是NaN，传NaN或者不传的话不刷新
     * @param maxPageNum 默认初始化数量 默认20
     */
    function getScrollList(scrollListClass, dataList, scrollRect, itemParam, maxPageNum, isFill, useHeight) {
        if (itemParam === void 0) { itemParam = NaN; }
        if (maxPageNum === void 0) { maxPageNum = 20; }
        if (isFill === void 0) { isFill = false; }
        if (useHeight === void 0) { useHeight = false; }
        var scrollList = new ScrollList(maxPageNum);
        scrollList.init(scrollListClass, dataList, scrollRect, itemParam, isFill, useHeight);
        return scrollList;
    }
    ComponentManager.getScrollList = getScrollList;
    /**
     * 获取排行榜滑动列表
     * @param scrollListClass 滑动列表元素类，继承ScrollListItem类，重写initItem方法实现
     * @param dataList 滑动列表数据
     * @param scrollRect 滑动列表相对父容器的位置和显示区域
     * @param itemParam 刷新元素对象的参数，分别原样传到scrollListItem的initData方法，默认值是NaN，传NaN或者不传的话不刷新
     * @param maxPageNum 默认初始化数量 默认20
     * @param request {requestType:string, requestParam:any} requestType: 网络请求名字  requestParam：请求参数 包含 page
     * @param onePageNum 一页显示多少条数据
     */
    function getRankScrollList(scrollListClass, dataList, scrollRect, itemParam, request, onePageNum, maxPageNum, isFill, useHeight) {
        if (itemParam === void 0) { itemParam = NaN; }
        if (onePageNum === void 0) { onePageNum = 100; }
        if (maxPageNum === void 0) { maxPageNum = 20; }
        if (isFill === void 0) { isFill = false; }
        if (useHeight === void 0) { useHeight = false; }
        var scrollList = new RankScrollList(maxPageNum);
        scrollList.initRankScrollList(scrollListClass, dataList, scrollRect, itemParam, isFill, useHeight, request, onePageNum);
        return scrollList;
    }
    ComponentManager.getRankScrollList = getRankScrollList;
    /**
     * 获取拖动进度条
     * @param barName 进度条资源名
     * @param barBgName 进度条背景资源名
     * @param maxNum 最大值
     * @param callback 值变化回调
     * @param callbackThisObject 回调用户对象
     * @param callbackParams 回调自定义参数，回调第二个参数开始
     * @param minNum 最小值 默认为1
     */
    function getDragProgressBar(barName, barBgName, maxNum, callback, callbackThisObject, callbackParams, minNum, barWidth, curNum) {
        if (minNum === void 0) { minNum = 1; }
        if (curNum === void 0) { curNum = 1; }
        var dragProgressBar = new DragProgressBar();
        dragProgressBar.init(barName, barBgName, barWidth);
        dragProgressBar.setDragPercent(curNum, maxNum, minNum);
        dragProgressBar.setCallBack(callback, callbackThisObject, callbackParams);
        return dragProgressBar;
    }
    ComponentManager.getDragProgressBar = getDragProgressBar;
    /**
     * 获取自定义文本
     * @param textStr       文本
     * @param fontName      fnt
     */
    function getBitmapText(textStr, fontName, fontColor, fontSize, isBMfont) {
        if (Api.switchVoApi.checkOpenBMFont() || isBMfont) {
            var bt = new BaseBitmapText();
            bt.font = ResourceManager.getRes(fontName);
            bt.text = textStr;
            return bt;
        }
        else {
            if (fontColor == undefined) {
                fontColor = TextFieldConst.COLOR_LIGHT_YELLOW;
            }
            if (fontSize == undefined) {
                fontSize = TextFieldConst.FONTSIZE_TITLE_SMALL;
            }
            var tf = ComponentManager.getTextField(textStr, fontSize, fontColor);
            return tf;
        }
    }
    ComponentManager.getBitmapText = getBitmapText;
    /**
     * 获取CircleProgressBar组件
     * @param barName     	进度条图片名称

     */
    function getCircleProgressBar(barName) {
        var bar = new CircleProgressBar();
        bar.init(barName);
        return bar;
    }
    ComponentManager.getCircleProgressBar = getCircleProgressBar;
    /**
     * 获得复选框
     * @param desc 文字
     */
    function getCheckBox(desc, res, fontsize, txtColor) {
        var checkBox = new CheckBox();
        checkBox.init(desc, res, fontsize, txtColor);
        return checkBox;
    }
    ComponentManager.getCheckBox = getCheckBox;
    /**
     * 获取资源条
     * @param type 资源类型
     * @param isAutoRefresh 是否自己刷新
     * @param width 宽度
     */
    function getResBar(type, isAutoRefresh, width) {
        var resBar = new ResBar();
        resBar.init(type, isAutoRefresh, width);
        return resBar;
    }
    ComponentManager.getResBar = getResBar;
    /**
     * 获取输入框
     * @param fontSize      字体大小必填，通过TextFieldConst.ts获取
     * @param textColor     文本颜色
     * @param bgName        输入框背景
     * @param witdh         背景宽
     * @param height        背景高
     * @param placeholder   占位文本
     * @param placeholderColor        占位文本颜色
     * @param initStr        初始化文本
     */
    function getInputTextField(textColor, fontSize, width, height, bgName, placeholder, placeholderColor, initStr) {
        var container = new BaseDisplayObjectContainer();
        var tf = new BaseTextField();
        container.addChild(tf);
        tf.name = "textField";
        tf.size = fontSize;
        if (PlatformManager.checkIsThSp()) {
            tf.fontFamily = TTFManager.TH_FONTNAME;
        }
        var tfBg = BaseBitmap.create(bgName);
        tfBg.width = width;
        tfBg.height = height;
        container.addChild(tfBg);
        tf.type = egret.TextFieldType.INPUT;
        tf.width = width - 10;
        tf.height = height - 20 < fontSize + 6 ? fontSize + 6 : height - 20;
        tf.x = tfBg.x + tfBg.width / 2 - tf.width / 2;
        tf.y = tfBg.y + tfBg.height / 2 - tf.height / 2;
        container.addChild(tf);
        if (initStr && initStr != "") {
            tf.bindData = true;
            if (App.DeviceUtil.isWXgame()) {
                tf.text = initStr;
            }
        }
        else {
            tf.bindData = false;
        }
        // 微信不显示这个文本
        // placeholder = App.DeviceUtil.isWXgame()? "" : placeholder;
        if (placeholder) {
            if (!initStr || initStr == "") {
                // if (!App.DeviceUtil.isWXgame()) {
                // 	tf.text = placeholder;
                // 	tf.textColor = placeholderColor;
                // }
                tf.text = "";
            }
            else {
                tf.text = initStr;
            }
            var placeholderTxt_1;
            // if (App.DeviceUtil.isWXgame()) {
            placeholderTxt_1 = ComponentManager.getTextField(placeholder, fontSize);
            // placeholderTxt.border=true;
            placeholderTxt_1.textColor = placeholderColor;
            placeholderTxt_1.x = tf.x;
            placeholderTxt_1.y = tf.y;
            placeholderTxt_1.width = tf.width;
            placeholderTxt_1.height = tf.height;
            placeholderTxt_1.touchEnabled = false;
            // container.addChild(placeholderTxt);
            container.addChildAt(placeholderTxt_1, container.getChildIndex(tf));
            if (initStr) {
                placeholderTxt_1.visible = false;
            }
            // }
            tf.addEventListener(egret.FocusEvent.FOCUS_IN, function (e) {
                // if(tf.text == placeholder && tf.textColor == placeholderColor){
                // 	//删除占位
                // 	tf.text = "";
                // 	tf.textColor = textColor;
                // }
                // if (!App.DeviceUtil.isWXgame()) {
                // 	if(tf.bindData == false){
                // 		//删除占位
                // 		tf.text = "";
                // 		tf.textColor = textColor;
                // 	}
                // } else {
                placeholderTxt_1.visible = false;
                // }
            }, null);
            tf.addEventListener(egret.FocusEvent.FOCUS_OUT, function (e) {
                // if (!App.DeviceUtil.isWXgame()) {
                // 	if(tf.text == ""){
                // 		//出现占位
                // 		tf.bindData = false;
                // 		tf.text = placeholder;
                // 		tf.textColor = placeholderColor;
                // 	}else{
                // 		tf.bindData = true;
                // 	}
                // } else {
                if (!tf.text) {
                    if (placeholderTxt_1) {
                        placeholderTxt_1.visible = true;
                    }
                    tf.bindData = false;
                }
                else {
                    tf.bindData = true;
                }
                // }
            }, null);
        }
        else {
            tf.textColor = textColor;
        }
        return container;
    }
    ComponentManager.getInputTextField = getInputTextField;
    /**
     *  获得人物头像框及头像
     * @param headName 头像的名字
     * @param headbgName 头像框的名字
     *
     */
    function getHeadContainer(headName, headinfo, needCircle) {
        if (needCircle === void 0) { needCircle = false; }
        var headContainer = new HeadContainer();
        headContainer.init(headName, headinfo, needCircle);
        return headContainer;
    }
    ComponentManager.getHeadContainer = getHeadContainer;
    /**
     *  获得 名称框
     * @param name 头像的名字
     * @param bgtype 背景图片类型
     * @param size 文本字号
     * @param color 文本颜色
     *
     */
    function getNameLabel(name, bgtype, size, color) {
        if (bgtype === void 0) { bgtype = "1"; }
        if (size === void 0) { size = 20; }
        if (color === void 0) { color = TextFieldConst.COLOR_BLACK; }
        var namelabel = new NameLabel();
        namelabel.init(name, String(bgtype), size, color);
        return namelabel;
    }
    ComponentManager.getNameLabel = getNameLabel;
    /**
     * 根据等级获取新的vip图标
     * @param vipLevel vip等级
     */
    function getVipIcon2(vipLevel) {
        var vipIcon2 = new VipIcon2();
        vipIcon2.init(vipLevel);
        return vipIcon2;
    }
    ComponentManager.getVipIcon2 = getVipIcon2;
    /**传入宽度 超出宽度 在行末显示「等 整个文字下方加下划线。点击后，展开一个弹框，告知玩家所有参赛区服。
     * str : 参赛区服字符
     * fontsize 文字大小
     * showWidth 规定宽度
     * toughObj 触摸对象
     * textColor 文字颜色
    */
    function getLimitLengthServerName(str, fontSize, showWidth, toughObj, textColor) {
        var _this = this;
        if (textColor === void 0) { textColor = 0xffffff; }
        var serverTxt = ComponentManager.getTextField(str, fontSize, textColor);
        if (serverTxt.textWidth > showWidth) {
            var arr = str.split("、");
            var newstr = "";
            for (var i = 1; i < 7; ++i) {
                newstr += arr[i - 1] + "\u3001";
            }
            newstr = newstr.substring(0, newstr.length - 1) + LanguageManager.getlocal("serverlistwait");
            serverTxt.text = "<u>" + newstr + "</u>";
            serverTxt.addTouchTap(function () {
                var msg = LanguageManager.getlocal("serverListServer4", [str]);
                var msgTF = ComponentManager.getTextField(msg, TextFieldConst.FONTSIZE_CONTENT_COMMON);
                msgTF.width = 480;
                msgTF.lineSpacing = 10;
                msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
                var height = msgTF.textHeight + 30;
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    title: "serverListServer5",
                    msg: LanguageManager.getlocal("serverListServer4", [str]),
                    handler: _this,
                    needCancel: false,
                    height: height
                });
            }, toughObj, null);
        }
        return serverTxt;
    }
    ComponentManager.getLimitLengthServerName = getLimitLengthServerName;
})(ComponentManager || (ComponentManager = {}));
//# sourceMappingURL=ComponentManager.js.map