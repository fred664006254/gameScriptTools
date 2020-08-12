/**
 * 组件管理类
 * author dmj
 * date 2017/9/11
 * @class ComponentManager
 */
var ComponentMgr;
(function (ComponentMgr) {
    /**
     * 获取按钮
     * @param buttonName   按钮图片名称
     * @param textStr      按钮文字对应的key
     * @param callback     点击回调函数
     * @param handler
     * @param param        参数
     * @param noDownImgType 没有按钮资源时候，按下状态处理 0缩放处理，1透明处理，3不处理
     */
    function getButton(buttonName, textStr, callback, handler, param, noDownImgType, fontSize, fontColor, buttonWidth) {
        var textSize = fontSize;
        var textColor = ColorEnums.white;
        textSize = TextFieldConst.SIZE_BUTTON_COMMON;
        if (!isNaN(fontColor)) {
            textColor = fontColor;
        }
        if (!isNaN(fontSize)) {
            textSize = fontSize;
        }
        var btn = new BaseButton();
        btn.init(buttonName, textStr, callback, handler, param, textSize, noDownImgType, buttonWidth);
        btn.setColor(textColor);
        return btn;
    }
    ComponentMgr.getButton = getButton;
    /**
     * 获取tabbar组件
     * @param buttonName     按钮图片名称
     * @param textArr        所有按钮显示文字
     * @param callback       按钮回调函数
     * @param handler        按钮所属对象
     * @param param          参数
     */
    function getTabBarGroup(buttonName, textArr, callback, handler, param, aligh, buttonWidth, showPic, showWidth, showHeight) {
        var color = ColorEnums.white;
        var selectedColor = ColorEnums.white;
        var tbg = new TabBarGroup();
        tbg.init(buttonName, textArr, callback, handler, param, aligh, buttonWidth, showPic, showWidth, showHeight);
        tbg.setColor(color, selectedColor);
        return tbg;
    }
    ComponentMgr.getTabBarGroup = getTabBarGroup;
    function getScroTabBarGroup(buttonName, textArr, callback, handler, param, aligh, buttonWidth, showPic, showWidth, showHeight) {
        var color = ColorEnums.black;
        var selectedColor = ColorEnums.black;
        var tbg = new TabBarGroup();
        tbg.initScro(buttonName, textArr, callback, handler, param, aligh, buttonWidth, showPic, showWidth, showHeight);
        tbg.setColor(color, selectedColor);
        return tbg;
    }
    ComponentMgr.getScroTabBarGroup = getScroTabBarGroup;
    function getTabBarChatGroup(buttonName, textArr, callback, handler, param, aligh) {
        var color = ColorEnums.black;
        var selectedColor = ColorEnums.black;
        var tbg = new TabBarChatGroup();
        tbg.init(buttonName, textArr, callback, handler, param, aligh);
        tbg.setColor(color, selectedColor);
        return tbg;
    }
    ComponentMgr.getTabBarChatGroup = getTabBarChatGroup;
    function getTabBarScrollGroup(textArr, callback, handler, param, aligh, linenum) {
        var color = ColorEnums.black;
        var selectedColor = ColorEnums.black;
        var tbg = new TabBarScrollGroup();
        tbg.initScroll(textArr, callback, handler, linenum);
        tbg.setColor(color, selectedColor);
        return tbg;
    }
    ComponentMgr.getTabBarScrollGroup = getTabBarScrollGroup;
    function getTabBarScrollBtnGroup(textArr, callback, handler, param, aligh, linenum, maxnum) {
        var color = ColorEnums.black;
        var selectedColor = ColorEnums.black;
        var tbg = new TabBarScrollBtnGroup();
        tbg.initScroll(textArr, callback, handler, linenum, maxnum);
        tbg.setColor(color, selectedColor);
        return tbg;
    }
    ComponentMgr.getTabBarScrollBtnGroup = getTabBarScrollBtnGroup;
    /**
     * 获取ProgressBar组件
     * @param barName     	进度条图片名称
     * @param barBgName     进度条背景图片名称
     * @param barWidth      进度条宽度
     */
    function getProgressBar(barName, barBgName, barWidth) {
        var bar = new ProgressBar();
        bar.init(barName, barBgName, barWidth);
        return bar;
    }
    ComponentMgr.getProgressBar = getProgressBar;
    /**
     * 获取CustomMovieClip组件
     * @param imageNamePre   图片名称前缀
     * @param frameCount     帧数，从第1帧开始计算的数量
     * @param frameRate      帧频 (毫秒)
     */
    function getCustomMovieClip(imageNamePre, frameCount, frameRate, effectClass) {
        var clip = new (effectClass || CustomMovieClip)();
        clip.setFramesByNamePre(imageNamePre, frameCount);
        clip.playFrameRate = frameRate;
        return clip;
    }
    ComponentMgr.getCustomMovieClip = getCustomMovieClip;
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
    ComponentMgr.getScrollView = getScrollView;
    /**
     * 获取自定义文本
     * @param textStr       文本
     * @param fontSize      字体大小必填，通过TextFieldConst.ts获取
     * @param color         字体颜色
     * @param autoStroke 是否自动加描边
     */
    function getTextField(textStr, fontSize, color, autoStroke) {
        if (autoStroke === void 0) { autoStroke = true; }
        var tf = new BaseTextField(autoStroke);
        tf.text = textStr;
        if (!isNaN(color)) {
            tf.setColor(color);
        }
        //如果是英文版本 按照单词换行
        if (PlatMgr.checkIsEnLang() || PlatMgr.checkIsPtLang() || PlatMgr.checkIsRuLang()) {
            tf.wordWrap = true;
        }
        // DEBUG: 小鸟项目还没有使用效果字体，先整体加粗
        tf.bold = true;
        // tf.stroke = 2;
        tf.size = fontSize;
        return tf;
    }
    ComponentMgr.getTextField = getTextField;
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
    ComponentMgr.getScrollList = getScrollList;
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
    ComponentMgr.getDragProgressBar = getDragProgressBar;
    function getTextureText(txtStr, texturePre) {
        var txt = new TextureText();
        txt.init(texturePre);
        txt.setString(txtStr);
        return txt;
    }
    ComponentMgr.getTextureText = getTextureText;
    /**
     * 获取自定义文本
     * @param textStr       文本
     * @param fontName      fnt
     */
    function getBitmapText(textStr, fontName, fontColor, fontSize, isBMfont) {
        if (isBMfont) {
            var bt = new BaseBitmapText();
            bt.font = ResMgr.getRes(fontName);
            bt.text = textStr;
            return bt;
        }
        else {
            if (fontColor == undefined) {
                fontColor = ColorEnums.white;
            }
            if (fontSize == undefined) {
                fontSize = TextFieldConst.SIZE_TITLE_SMALL;
            }
            var tf = ComponentMgr.getTextField(textStr, fontSize, fontColor);
            return tf;
        }
    }
    ComponentMgr.getBitmapText = getBitmapText;
    /**
     * 获取CircleProgressBar组件
     * @param barName     	进度条图片名称

     */
    function getCircleProgressBar(barName) {
        var bar = new CircleProgressBar();
        bar.init(barName);
        return bar;
    }
    ComponentMgr.getCircleProgressBar = getCircleProgressBar;
    /**
     * 获得复选框
     * @param desc 文字
     */
    function getCheckBox(desc, res, fontsize) {
        var checkBox = new CheckBox();
        checkBox.init(desc, res, fontsize);
        return checkBox;
    }
    ComponentMgr.getCheckBox = getCheckBox;
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
    ComponentMgr.getResBar = getResBar;
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
        container.width = width;
        container.height = height;
        var tf = new BaseTextField();
        container.addChild(tf);
        tf.name = "textField";
        tf.size = fontSize;
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
        tf.textAlign = egret.HorizontalAlign.CENTER;
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
                tf.text = "";
            }
            else {
                tf.text = initStr;
            }
            var placeholderTxt_1;
            // if (App.DeviceUtil.isWXgame()) {
            placeholderTxt_1 = ComponentMgr.getTextField(placeholder, fontSize);
            // placeholderTxt.border=true;
            placeholderTxt_1.textColor = placeholderColor;
            placeholderTxt_1.x = tf.x + (tf.width - placeholderTxt_1.width) / 2;
            placeholderTxt_1.y = tf.y + (tf.height - placeholderTxt_1.height) / 2;
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
    ComponentMgr.getInputTextField = getInputTextField;
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
        if (color === void 0) { color = ColorEnums.black; }
        var namelabel = new NameLabel();
        namelabel.init(name, String(bgtype), size, color);
        return namelabel;
    }
    ComponentMgr.getNameLabel = getNameLabel;
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
        var serverTxt = ComponentMgr.getTextField(str, fontSize, textColor);
        if (serverTxt.textWidth > showWidth) {
            var arr = str.split("、");
            var newstr = "";
            for (var i = 1; i < 7; ++i) {
                newstr += arr[i - 1] + "\u3001";
            }
            newstr = newstr.substring(0, newstr.length - 1) + LangMger.getlocal("serverlistwait");
            serverTxt.text = "<u>" + newstr + "</u>";
            serverTxt.addTouchTap(function () {
                var msg = LangMger.getlocal("serverListServer4", [str]);
                var msgTF = ComponentMgr.getTextField(msg, TextFieldConst.SIZE_CONTENT_COMMON);
                msgTF.width = 480;
                msgTF.lineSpacing = 10;
                msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
                var height = msgTF.textHeight + 30;
                ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
                    title: LangMger.getlocal("serverListServer5"),
                    msg: LangMger.getlocal("serverListServer4", [str]),
                    handler: _this,
                    needCancel: false,
                    height: height
                });
            }, toughObj, null);
        }
        return serverTxt;
    }
    ComponentMgr.getLimitLengthServerName = getLimitLengthServerName;
})(ComponentMgr || (ComponentMgr = {}));
//# sourceMappingURL=ComponentMgr.js.map