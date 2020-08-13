/**
 * 组件管理类
 * author dmj
 * date 2017/9/11
 * @class ComponentManager
 */
var ComponentManager;
(function (ComponentManager) {
    var _skillDetailPanel;
    /**
     * 门客技能详情
     */
    function getSkillDetail() {
        if (!_skillDetailPanel) {
            _skillDetailPanel = new ServantSkillDetail();
        }
        return _skillDetailPanel;
    }
    ComponentManager.getSkillDetail = getSkillDetail;
    /**
     * 门客技能图标
     * @param skill 技能信息
     * @param showDetail 是否点击展示详情
     * @param effect 是否流光特效
     */
    function getSkillIcon(skill, showDetail, effect) {
        if (showDetail === void 0) { showDetail = true; }
        if (effect === void 0) { effect = false; }
        return new ServantSkillIcon(skill, showDetail, effect);
    }
    ComponentManager.getSkillIcon = getSkillIcon;
    /**
     * 门客技能条
     * @param servantId 门客ID
     * @param iconSize 技能图标大小
     * @param showDetail 是否点击显示详情
     */
    function getSkillBar(servantId, iconSize, showDetail) {
        if (iconSize === void 0) { iconSize = 72; }
        if (showDetail === void 0) { showDetail = true; }
        return new ServantSkillBar(servantId, iconSize, showDetail);
    }
    ComponentManager.getSkillBar = getSkillBar;
    /**
     * 获取按钮
     * @param buttonName   按钮图片名称
     * @param textStr      按钮文字对应的key
     * @param callback     点击回调函数
     * @param handler
     * @param param        参数
     * @param noDownImgType 没有按钮资源时候，按下状态处理 0缩放处理，1透明处理，3不处理
     * @param fontTextSize  按钮文字大小
     */
    function getButton(buttonName, textStr, callback, handler, param, noDownImgType, fontTextSize) {
        var fontSize = TextFieldConst.FONTSIZE_BUTTON_COMMON;
        if (PlatformManager.checkIsViSp()) {
            fontSize = TextFieldConst.FONTSIZE_CONTENT_SMALL;
        }
        var textColor = TextFieldConst.COLOR_WHITE;
        if (buttonName == ButtonConst.BTN_BIG_YELLOW || buttonName == ButtonConst.BTN_NORMAL_YELLOW || buttonName == ButtonConst.BTN_SMALL_YELLOW) {
            textColor = TextFieldConst.COLOR_BTN_YELLOW;
        }
        else if (buttonName == ButtonConst.BTN_BIG_ORANGE || buttonName == ButtonConst.BTN_NORMAL_ORANGE || buttonName == ButtonConst.BTN_SMALL_ORANGE) {
            textColor = TextFieldConst.COLOR_BTN_ORANGE;
        }
        else if (buttonName == ButtonConst.BTN_BIG_BLUE || buttonName == ButtonConst.BTN_NORMAL_BLUE || buttonName == ButtonConst.BTN_SMALL_BLUE) {
            textColor = TextFieldConst.COLOR_BTN_BLUE;
        }
        switch (buttonName) {
            case ButtonConst.BTN_SMALL_BLUE:
            case ButtonConst.BTN_SMALL_ORANGE:
            case ButtonConst.BTN_SMALL_YELLOW:
                // case ButtonConst.BTN_SMALL_RED:
                fontSize = TextFieldConst.FONTSIZE_CONTENT_COMMON;
                break;
            default:
                fontSize = TextFieldConst.FONTSIZE_BUTTON_COMMON;
                break;
        }
        // textColor=0;
        var btn = new BaseButton();
        btn.init(buttonName, textStr, callback, handler, param, fontTextSize || fontSize, noDownImgType);
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
    function getTabBarGroup(buttonName, textArr, callback, handler, param, showPic) {
        var color = TextFieldConst.COLOR_TABBAR;
        var selectedColor = TextFieldConst.COLOR_TABBAR;
        if (buttonName == ButtonConst.BTN_WINTAB) {
            color = TextFieldConst.COLOR_WINTABBAR;
            selectedColor = TextFieldConst.COLOR_WINTABBARSEL;
        }
        else if (buttonName == ButtonConst.BTN_WINTAB_OLD) {
            color = TextFieldConst.COLOR_WINTABBAR;
            selectedColor = TextFieldConst.COLOR_WINTABBARSEL;
        }
        var tbg = new TabBarGroup();
        tbg.init(buttonName, textArr, callback, handler, param, showPic);
        tbg.setColor(color, selectedColor);
        // if(GameData.isUseNewUI)
        // {
        tbg.setSpace(-9);
        // }
        if (buttonName == ButtonConst.BTN_TAB) {
            var tabbarBg1 = BaseBitmap.create("commonview_biaoqianbg03");
            tabbarBg1.x = -22;
            var tabbarBg = BaseBitmap.create("commonview_biaoqianbg04");
            tabbarBg.x = -22;
            tbg.addChildAt(tabbarBg, 0);
            tbg.addChildAt(tabbarBg1, 0);
        }
        return tbg;
    }
    ComponentManager.getTabBarGroup = getTabBarGroup;
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
     * 获取NewProgressBar组件,支持进度条动画
     * @param barName     	进度条图片名称
     * @param barBgName     进度条背景图片名称
     * @param barWidth      进度条宽度
     * @param barHeight     进度条高度
     */
    function getNewProgressBar(barName, barBgName, barWidth) {
        var bar = new NewProgressBar();
        bar.init(barName, barBgName, barWidth);
        return bar;
    }
    ComponentManager.getNewProgressBar = getNewProgressBar;
    /**
     * 获取CustomMovieClip组件
     * @param imageNamePre   图片名称前缀
     * @param frameCount     帧数
     * @param frameRate      帧频 (毫秒)
     */
    function getCustomMovieClip(imageNamePre, frameCount, frameRate) {
        var clip = new CustomMovieClip();
        var resArr = [];
        if (imageNamePre && frameCount) {
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
        var tf = new BaseTextField();
        tf.text = textStr;
        tf.size = fontSize;
        if (!isNaN(color)) {
            tf.setColor(color);
        }
        if (PlatformManager.checkIsViSp()) {
            tf.wordWrap = true;
        }
        return tf;
    }
    ComponentManager.getTextField = getTextField;
    /**
     * 获取滑动列表
     * @param scrollListClass 滑动列表元素类，继承ScrollListItem类，重写initItem方法实现
     * @param dataList 滑动列表数据
     * @param scrollRect 滑动列表相对父容器的位置和显示区域
     */
    function getScrollList(scrollListClass, dataList, scrollRect, itemParam, maxPageNum, noFly) {
        if (itemParam === void 0) { itemParam = NaN; }
        if (maxPageNum === void 0) { maxPageNum = 20; }
        if (noFly === void 0) { noFly = false; }
        var scrollList = new ScrollList(maxPageNum);
        scrollList.init(scrollListClass, dataList, scrollRect, itemParam);
        if (!noFly) {
            scrollList.playEnterFlyAni();
        }
        return scrollList;
    }
    ComponentManager.getScrollList = getScrollList;
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
    function getDragProgressBar(barName, barBgName, maxNum, callback, callbackThisObject, callbackParams, minNum, barWidth) {
        if (minNum === void 0) { minNum = 1; }
        var dragProgressBar = new DragProgressBar();
        dragProgressBar.init(barName, barBgName, barWidth);
        dragProgressBar.setDragPercent(minNum, maxNum, minNum);
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
        // let bt:BaseBitmapText = new BaseBitmapText();
        // bt.font = ResourceManager.getRes(fontName);
        // bt.text = textStr;
        // return bt;
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
    function getCheckBox(desc, noTouch, textSize, textColor, selectDownRes, selectRes) {
        var checkBox = new CheckBox();
        checkBox.init(desc, noTouch, textSize, textColor, selectDownRes, selectRes);
        return checkBox;
    }
    ComponentManager.getCheckBox = getCheckBox;
    /**
     * 获取资源条
     * @param type 资源类型
     * @param isAutoRefresh 是否自己刷新
     * @param width 宽度
     */
    function getResBar(type, isAutoRefresh, width, color) {
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
     * 获取yes no开关
     * @param 初始开关
     * @param callback 值变化回调
     * @param callbackThisObject 回调用户对象
     * @param callbackParams 回调自定义参数，回调第二个参数开始
     */
    function getSwith(open, callback, callbackThisObject, callbackParams, minNum, barWidth) {
        if (minNum === void 0) { minNum = 1; }
        var container = new BaseDisplayObjectContainer();
        var soundBB = BaseBitmap.create("btn_swicth_new");
        soundBB.x = 0;
        soundBB.y = 0;
        container.addChild(soundBB);
        // soundBB.addTouchTap(this.sonndHander,this);
        var soundState = ComponentManager.getTextField("ON", 18, TextFieldConst.COLOR_WHITE);
        soundState.x = soundBB.x + 25;
        soundState.y = soundBB.y + soundBB.height / 2 - soundState.height / 2;
        container.addChild(soundState);
        soundBB.addTouchTap(function (event, soundBB, container, soundState, callback, callbackThisObject) {
            var color = TextFieldConst.COLOR_WHITE;
            var str = soundState.text;
            if (str == "OFF") {
                str = "ON";
            }
            else {
                str = "OFF";
            }
            if (str == "OFF") {
                soundBB.skewY = 180;
                soundBB.x = soundBB.x + soundBB.width;
                soundState.x = soundBB.x - 55;
                color = 0xead39c;
            }
            else {
                soundBB.skewY = 0;
                soundBB.x = 0;
                soundState.x = soundBB.x + 25;
            }
            soundState.text = str;
            soundState.textColor = color;
            var opp = true;
            if (str == "OFF") {
                opp = false;
            }
            callback.apply(callbackThisObject, [opp]);
        }, callbackThisObject, [soundBB, container, soundState, callback, callbackThisObject]);
        var color = TextFieldConst.COLOR_WHITE;
        if (!open) {
            soundBB.skewY = 180;
            soundBB.x = soundBB.x + soundBB.width;
            soundState.x = soundBB.x - 55;
            soundState.text = "OFF";
            soundState.textColor = 0xead39c;
        }
        else {
        }
        return container;
    }
    ComponentManager.getSwith = getSwith;
})(ComponentManager || (ComponentManager = {}));
