var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 公共方法类
 * author dmj
 * date 2017/9/27
 * @class CommonUtil
 */
var App;
(function (App) {
    var CommonUtil = (function () {
        function CommonUtil() {
        }
        /**
         * 背包使用道具后飘字动画
         * 对icon、文字数组进行缓动，目前是向上移动（可扩展）
         * @param list icon：图标，message：文字
         * @param startPoint 开始位置相对全局坐标，可选，不传的话为屏幕中心
         */
        CommonUtil.playRewardFlyAction = function (list, startPoint, waitTime, subNodeList, isHalve) {
            if (waitTime === void 0) { waitTime = 800; }
            var timeOutArray = [];
            var _loop_1 = function (i) {
                var play = function () {
                    var item = list[i];
                    var rewardFly = new RewardFly();
                    var subNode = undefined;
                    if (subNodeList && subNodeList[i]) {
                        subNode = subNodeList[i];
                    }
                    rewardFly.init(item.icon, item.tipMessage, item.type, subNode, isHalve, item);
                    if (startPoint) {
                        rewardFly.setPosition(startPoint.x, startPoint.y);
                    }
                    else {
                        rewardFly.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2 - 100);
                    }
                    LayerMgr.msgLayer.addChild(rewardFly);
                    // if(CommonUtil.timeOutArr&&CommonUtil.timeOutArr.length>0)
                    // {
                    // egret.clearTimeout(CommonUtil.timeOutArr.shift());
                    // }
                };
                var timeoutCount = egret.setTimeout(play, this_1, waitTime * i);
                // CommonUtil.timeOutArr.push(timeoutCount);
                timeOutArray.push(timeoutCount);
            };
            var this_1 = this;
            for (var i = 0; i < list.length; i++) {
                _loop_1(i);
            }
            return timeOutArray;
        };
        /**
         * 游戏内提示
         * @param message 需要提示的文字
         */
        CommonUtil.showTip = function (message) {
            var tipContainer = CommonUtil._tipContainer;
            var txtLine = 1;
            if (!tipContainer) {
                var tipContainer_1 = new BaseDisplayObjectContainer();
                var tipBg = BaseBitmap.create("public_tipbg");
                tipBg.setPosition(-tipBg.width / 2, -tipBg.height / 2);
                tipBg.name = "tipBg";
                tipContainer_1.addChild(tipBg);
                var msgText = ComponentMgr.getTextField(message, TextFieldConst.SIZE_TITLE_SMALL);
                msgText.setPosition(tipBg.x + (tipBg.width - msgText.width) / 2, tipBg.y + (tipBg.height - msgText.height) / 2);
                msgText.textAlign = egret.HorizontalAlign.CENTER;
                msgText.name = "msgText";
                msgText.lineSpacing = 2;
                txtLine = msgText.numLines;
                tipContainer_1.addChild(msgText);
                tipContainer_1.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
                LayerMgr.msgLayer.addChild(tipContainer_1);
                CommonUtil._tipContainer = tipContainer_1;
            }
            else {
                var tipBg = tipContainer.getChildByName("tipBg");
                if (!tipBg.texture || !tipBg.texture.bitmapData) {
                    tipBg.texture = ResMgr.getRes("public_tipbg");
                }
                var msgText = CommonUtil._tipContainer.getChildByName("msgText");
                msgText.text = message;
                msgText.setPosition(tipBg.x + (tipBg.width - msgText.width) / 2, tipBg.y + (tipBg.height - msgText.height) / 2);
                tipContainer.setScale(1);
                tipContainer.alpha = 1;
                egret.Tween.removeTweens(tipContainer);
                tipContainer.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
                txtLine = msgText.numLines;
                if (!LayerMgr.msgLayer.contains(tipContainer)) {
                    LayerMgr.msgLayer.addChild(tipContainer);
                }
            }
            egret.Tween.get(CommonUtil._tipContainer).to({ scaleX: 1.1, scaleY: 1.1 }, 100).to({ scaleX: 1, scaleY: 1 }, 70).wait(1300 * txtLine).to({ alpha: 0 }, 200).call(function (tipContainer) {
                if (tipContainer) {
                    egret.Tween.removeTweens(tipContainer);
                    if (LayerMgr.msgLayer.contains(tipContainer)) {
                        LayerMgr.msgLayer.removeChild(tipContainer);
                    }
                    tipContainer.setScale(1);
                    tipContainer.alpha = 1;
                }
            }.bind(this, CommonUtil._tipContainer), this);
        };
        CommonUtil.showCollectEffect = function (resKey, startPoint, endPoint, callback, callbackThisObj, callbackParams) {
            if (resKey != "task_power") {
                SoundMgr.playEffect(SoundConst.EFFECT_MONEY);
            }
            var collectEffect = new CollectEffect();
            collectEffect.start(resKey, startPoint, endPoint, callback, callbackThisObj, callbackParams);
        };
        /**
         * 获取居中对齐位置
         * @param referenceContainer 参考对象，可以为父容器，也可以为同级显示对象，通过第三个参数来判断
         * @param childDisplayObject 需要布局的对象
         * @param isParent 是否是父容器，如果不是则为同级参考对象
         */
        CommonUtil.getCenterPos = function (referenceContainer, childDisplayObject, isParent) {
            return { x: CommonUtil.getCenterX(referenceContainer, childDisplayObject, isParent), y: CommonUtil.getCenterY(referenceContainer, childDisplayObject, isParent) };
        };
        /**
         * 获取X居中对齐位置
         * @param referenceContainer 参考对象，可以为父容器，也可以为同级显示对象，通过第三个参数来判断
         * @param childDisplayObject 需要布局的对象
         * @param isParent 是否是父容器，如果不是则为同级参考对象
         */
        CommonUtil.getCenterX = function (referenceContainer, childDisplayObject, isParent) {
            var x = 0;
            var scaleX = 1;
            if (!isParent) {
                x = referenceContainer.x;
                scaleX = referenceContainer.scaleX;
            }
            x += (referenceContainer.width * scaleX - referenceContainer.anchorOffsetX - childDisplayObject.width * childDisplayObject.scaleX + childDisplayObject.anchorOffsetX) * 0.5;
            return x;
        };
        /**
         * 获取Y居中对齐位置
         * @param referenceContainer 参考对象，可以为父容器，也可以为同级显示对象，通过第三个参数来判断
         * @param childDisplayObject 需要布局的对象
         * @param isParent 是否是父容器，如果不是则为同级参考对象
         */
        CommonUtil.getCenterY = function (referenceContainer, childDisplayObject, isParent) {
            var y = 0;
            var scaleY = 1;
            if (!isParent) {
                y = referenceContainer.y;
                scaleY = referenceContainer.scaleY;
            }
            y += (referenceContainer.height * scaleY - referenceContainer.anchorOffsetY - childDisplayObject.height * childDisplayObject.scaleY + childDisplayObject.anchorOffsetY) * 0.5;
            return y;
        };
        CommonUtil.getContainerByLeftHalfRes = function (leftRes) {
            var container = new BaseDisplayObjectContainer();
            var leftBmp = BaseBitmap.create(leftRes);
            container.addChild(leftBmp);
            var rightBmp = BaseBitmap.create(leftRes);
            rightBmp.scaleX = -1;
            rightBmp.x = leftBmp.x + leftBmp.width + rightBmp.width;
            container.addChild(rightBmp);
            return container;
        };
        CommonUtil.getContainerByLeftTopRes = function (resUrl) {
            var container = new BaseDisplayObjectContainer();
            for (var i = 0; i < 4; i++) {
                var bmp = BaseBitmap.create(resUrl);
                var xx = 0;
                var yy = 0;
                if (i % 2 == 1) {
                    bmp.scaleX = -1;
                    xx = bmp.width * 2;
                }
                if (Math.floor(i / 2) > 0) {
                    bmp.scaleY = -1;
                    yy = bmp.height * 2;
                }
                bmp.setPosition(xx, yy);
                container.addChild(bmp);
            }
            return container;
        };
        CommonUtil.createMainUIIcon = function (iconUrl, iconNameStr, isShow, extType, BigIcon, timeStr) {
            if (BigIcon) {
                var iconContainer_1 = new BaseDisplayObjectContainer();
                iconContainer_1.width = 129;
                iconContainer_1.height = 130;
                iconContainer_1.anchorOffsetX = iconContainer_1.width / 2;
                iconContainer_1.anchorOffsetY = iconContainer_1.height / 2;
                iconContainer_1.name = iconNameStr;
                var aid_1 = BigIcon.aid;
                var iconbg = BaseBitmap.create("public_lefticon_bg");
                iconContainer_1.addChild(iconbg);
                var iconmame = "left_" + aid_1 + "_";
                var iconAni = ComponentMgr.getCustomMovieClip("left_iconbg_", 5, 100);
                iconAni.playWithTime(-1);
                iconContainer_1.addChild(iconAni);
                iconAni.width = 129;
                iconAni.height = 130;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconAni, iconbg);
                var icon = ComponentMgr.getCustomMovieClip(iconmame, 5, 100);
                icon.playWithTime(-1);
                iconContainer_1.addChild(icon);
                icon.width = 129;
                icon.height = 130;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, iconbg);
                //加载完图片重新设置尺寸
                var icontext = "left_" + aid_1 + "_txt";
                var iconName_1 = BaseLoadBitmap.create(icontext, null, { callback: function (container) {
                        if (container) {
                            var defaultW = 105;
                            if (PlatMgr.checkIsEnLang()) {
                                defaultW = 110;
                            }
                            iconName_1.setPosition(container.width / 2 - (iconName_1.width ? iconName_1.width : defaultW) / 2, 90);
                            if (timeStr) {
                                var timeTF = iconContainer_1.getChildByName(aid_1 + "_TF");
                                var timeBg = iconContainer_1.getChildByName(aid_1 + "_Bg");
                                if ((!timeTF) && (!timeBg)) {
                                    timeBg = BaseBitmap.create("public_9_bg89");
                                    timeBg.name = aid_1 + "_Bg";
                                    timeTF = ComponentMgr.getTextField(timeStr, 20);
                                    timeTF.name = aid_1 + "_TF";
                                    timeBg.width = timeTF.width + 30;
                                    timeBg.height = 25;
                                    timeBg.setPosition(iconName_1.x + iconName_1.width / 2 - timeBg.width / 2, iconName_1.y + iconName_1.height);
                                    timeTF.setPosition(timeBg.x + timeBg.width / 2 - timeTF.width / 2, timeBg.y + timeBg.height / 2 - timeTF.height / 2);
                                    iconContainer_1.addChild(timeBg);
                                    iconContainer_1.addChild(timeTF);
                                }
                            }
                        }
                    }, callbackThisObj: this, callbackParams: [iconContainer_1] });
                iconContainer_1.addChild(iconName_1);
                iconContainer_1.addTouch(function (event, iconContainer) {
                    switch (event.type) {
                        case egret.TouchEvent.TOUCH_BEGIN:
                            iconContainer.setScale(0.95);
                            break;
                        case egret.TouchEvent.TOUCH_CANCEL:
                            iconContainer.setScale(1);
                            break;
                        case egret.TouchEvent.TOUCH_END:
                            iconContainer.setScale(1);
                            break;
                    }
                }, this, [iconContainer_1]);
                return iconContainer_1;
            }
            else {
                var iconContainer_2 = new BaseDisplayObjectContainer();
                var iconBg_1 = BaseBitmap.create("mainui_bottombtnbg");
                iconContainer_2.addChild(iconBg_1);
                iconContainer_2.width = iconBg_1.width;
                iconContainer_2.height = iconBg_1.height;
                iconContainer_2.anchorOffsetX = iconBg_1.width / 2;
                iconContainer_2.anchorOffsetY = iconBg_1.height / 2;
                iconContainer_2.name = iconNameStr;
                if (extType) {
                    var iconExtBg_1 = BaseLoadBitmap.create("ac_icon_bg" + extType, null, { callback: function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            iconExtBg_1.setPosition(iconBg_1.x + (iconBg_1.width - iconExtBg_1.width) / 2, iconBg_1.y + (iconBg_1.height - iconExtBg_1.height) / 2);
                            iconContainer_2.addChildAt(iconExtBg_1, 1);
                        }, callbackThisObj: CommonUtil });
                }
                if (isShow) {
                    var iconAni = BaseBitmap.create("mainui_iconani");
                    iconAni.anchorOffsetX = iconAni.width / 2;
                    iconAni.anchorOffsetY = iconAni.height / 2;
                    iconAni.setPosition(iconContainer_2.width / 2, iconContainer_2.height / 2);
                    iconContainer_2.addChild(iconAni);
                    egret.Tween.get(iconAni, { loop: true })
                        .to({ rotation: 360 }, 1000);
                }
                if (PlatMgr.checkIsRuSp()) {
                    if (iconUrl == "sevendayssignup1_icon" || iconUrl == "sevendayssignup2_icon" || iconUrl == "sevendayssignup7_icon") {
                        iconUrl += "_ru";
                        iconNameStr = "sevendayssignup_name_ru";
                    }
                }
                var icon = BaseLoadBitmap.create(iconUrl);
                icon.name = 'icon';
                iconContainer_2.addChild(icon);
                //加载完图片重新设置尺寸
                var iconName_2 = BaseLoadBitmap.create(iconNameStr, null, { callback: function (container) {
                        if (container) {
                            var defaultW = 88;
                            if (PlatMgr.checkIsEnLang()) {
                                defaultW = 110;
                            }
                            iconName_2.setPosition(container.width / 2 - (iconName_2.width ? iconName_2.width : defaultW) / 2, 50);
                        }
                    }, callbackThisObj: this, callbackParams: [iconContainer_2] });
                iconContainer_2.addChild(iconName_2);
                // iocnName.setPosition(-8.5,50);
                iconContainer_2.addTouch(function (event, iconContainer) {
                    switch (event.type) {
                        case egret.TouchEvent.TOUCH_BEGIN:
                            iconContainer.setScale(0.95);
                            break;
                        case egret.TouchEvent.TOUCH_CANCEL:
                            iconContainer.setScale(1);
                            break;
                        case egret.TouchEvent.TOUCH_END:
                            iconContainer.setScale(1);
                            break;
                    }
                }, this, [iconContainer_2]);
                return iconContainer_2;
            }
        };
        /**
         * 添加红点提示
         * @param bdoc 父容器
         * @param icon 需要在父容器上添加的图片名字，默认是 public_dot2
         * @param isLeft 父容器上的图片是否是在父容器左上角。默认是在右上角
         */
        CommonUtil.addIconToBDOC = function (bdoc, icon, isLeft) {
            if (bdoc) {
                if (bdoc.getChildByName("reddot")) {
                    var reddot = bdoc.getChildByName("reddot");
                    if (reddot) {
                        reddot.visible = true;
                    }
                }
                else {
                    if (!icon) {
                        icon = "public_dot2";
                    }
                    var reddot = BaseBitmap.create(icon);
                    if (!isLeft) {
                        reddot.x = bdoc.width - reddot.width;
                    }
                    else {
                        reddot.x = 0;
                    }
                    // reddot.y = 3;
                    bdoc.addChild(reddot);
                    reddot.name = "reddot";
                }
            }
        };
        /**
         * 移除红点提示
         * @param bdoc 父容器
         */
        CommonUtil.removeIconFromBDOC = function (bdoc) {
            if (bdoc && bdoc.getChildByName("reddot")) {
                var reddot = bdoc.getChildByName("reddot");
                if (reddot) {
                    reddot.visible = false;
                }
            }
        };
        CommonUtil.createTalkContainer = function (talkStr, isNpcAtLeft, offX) {
            if (isNpcAtLeft === void 0) { isNpcAtLeft = true; }
            var talkContainer = new BaseDisplayObjectContainer();
            //说的话背景
            var talkBg = BaseBitmap.create("public_npc_talkbg");
            talkContainer.addChild(talkBg);
            //箭头
            var talkArrow = BaseBitmap.create("public_npc_talkarrow");
            if (isNpcAtLeft == false) {
                talkArrow.skewY = 1;
            }
            //说的话
            var wordsText = ComponentMgr.getTextField(talkStr, TextFieldConst.SIZE_CONTENT_COMMON);
            talkBg.width = wordsText.width + 26;
            // talkBg.height = 50;
            if (isNpcAtLeft) {
                if (offX) {
                    if (!isNaN(offX.lx)) {
                        talkBg.setPosition(talkArrow.x - 33, talkArrow.y - talkBg.height + 2);
                    }
                    else if (!isNaN(offX.rx)) {
                        talkBg.setPosition(talkArrow.x + talkArrow.width - talkBg.width + 33, talkArrow.y - talkBg.height + 2);
                    }
                    else {
                        talkBg.setPosition(talkArrow.x - talkBg.width / 2, talkArrow.y - talkBg.height + 2);
                    }
                }
                else {
                    talkBg.setPosition(talkArrow.x - talkBg.width / 2, talkArrow.y - talkBg.height + 2);
                }
            }
            else {
                if (offX) {
                    if (!isNaN(offX.lx)) {
                        talkBg.setPosition(talkArrow.x - talkArrow.width - 33, talkArrow.y - talkBg.height + 2);
                    }
                    else if (!isNaN(offX.rx)) {
                        talkBg.setPosition(talkArrow.x - talkBg.width + 33, talkArrow.y - talkBg.height + 2);
                    }
                    else {
                        talkBg.setPosition(talkArrow.x - talkBg.width / 2, talkArrow.y - talkBg.height + 2);
                    }
                }
                else {
                    talkBg.setPosition(talkArrow.x - talkBg.width / 2, talkArrow.y - talkBg.height + 2);
                }
            }
            talkContainer.addChild(talkArrow);
            wordsText.width = talkBg.width - 26;
            wordsText.x = talkBg.x + 13;
            wordsText.y = talkBg.y + (talkBg.height - wordsText.height) / 2;
            talkContainer.addChild(wordsText);
            return talkContainer;
        };
        /**
         * 播放皇帝登录动画
         */
        CommonUtil.showGodLoginFlaunt = function (godName) {
            var godLogin = new GodLogin();
            LayerMgr.msgLayer.addChild(godLogin);
            godLogin.show(godName);
        };
        /**
         * 添加点击缩小效果
         * @param obj 对象
         * @param callback 回调
         */
        CommonUtil.addTouchScaleEffect = function (obj, callback, handler) {
            obj.addTouch(function (event, obj, callback, handler) {
                var scale = 0.9;
                switch (event.type) {
                    case egret.TouchEvent.TOUCH_BEGIN:
                        obj.setScale(0.9);
                        obj.x += (obj.width * (1 - scale)) / 2;
                        obj.y += (obj.height * (1 - scale)) / 2;
                        break;
                    case egret.TouchEvent.TOUCH_END:
                        obj.setScale(1);
                        obj.x -= (obj.width * (1 - scale)) / 2;
                        obj.y -= (obj.height * (1 - scale)) / 2;
                        callback.apply(handler);
                        break;
                    case egret.TouchEvent.TOUCH_CANCEL:
                        obj.setScale(1);
                        obj.x -= (obj.width * (1 - scale)) / 2;
                        obj.y -= (obj.height * (1 - scale)) / 2;
                        // callback.apply(handler);
                        break;
                }
            }, CommonUtil, [obj, callback, handler]);
        };
        /**
         * 获取带单位的货币字符串
         * @param money 钱数，不带单位
         */
        CommonUtil.getMoneyString = function (money) {
            var moneyKey = "anyMoney";
            if (PlatMgr.checkIsKRSp() && App.DeviceUtil.isIOS()) {
                moneyKey = "anyMoneyDollar"; // 韩国ios显示美元
            }
            return LangMger.getlocal(moneyKey, [money.toString()]);
        };
        /**
         * 比较两个版本号的大小，1前者大，0相等，-1后者大
         * 注意，1.0小于1.0.0
         */
        CommonUtil.compareVersion = function (v1, v2) {
            var v1Arr = v1.split(".");
            var v2Arr = v2.split(".");
            var maxLen = Math.max(v1Arr.length, v2Arr.length);
            for (var i = 0; i < maxLen; i++) {
                var v1value = v1Arr[i];
                var v2value = v2Arr[i];
                if (v1value === undefined) {
                    return -1;
                }
                if (v2value === undefined) {
                    return 1;
                }
                if (parseInt(v1value) > parseInt(v2value)) {
                    return 1;
                }
                else if (parseInt(v1value) < parseInt(v2value)) {
                    return -1;
                }
            }
            return 0;
        };
        // 获取url参数，对egret.getOption的封装，对于不支持的平台返回空字符串
        CommonUtil.getOption = function (keyName) {
            return egret.getOption(keyName) || "";
        };
        // public static formatSeaScreen(target:egret.DisplayObject):void
        // {
        // 	if(App.DeviceUtil.checkIsSeascreen()&&GameConfig.stage.stageHeight==GameConfig.stageHeigth)
        // 	{
        // 		if (App.DeviceUtil.isWXgame()) {
        // 			target.scaleY=(window.screen.availHeight-GameConfig.seaScreenTopH)/window.screen.availHeight;
        // 		} else {
        // 			target.scaleY=(document.documentElement.clientHeight-GameConfig.seaScreenTopH)/document.documentElement.clientHeight;
        // 		}
        // 		target.y=GameConfig.seaScreenTopH;
        // 	}
        // }
        // /**
        //  * 适配iPhone X 底部栏
        //  */
        // public static formatIphoneXButtom(target:egret.DisplayObject,isSetScaleY?:boolean):boolean
        // {
        // 	if(App.DeviceUtil.checkIsIphoneX()&&GameConfig.stage.stageHeight==GameConfig.stageHeigth)
        // 	{
        // 		if(!isSetScaleY)
        // 		{
        // 			target.y-=GameConfig.iphoneXButtomH;
        // 		}
        // 		else
        // 		{
        // 			target.scaleY=(GameConfig.stageHeigth-GameConfig.iphoneXButtomH)/GameConfig.stageHeigth;
        // 		}
        // 		return true;
        // 	}
        // 	return false;
        // }
        /**
         * 判断是否支持网格动画龙骨
         */
        CommonUtil.check_dragon = function () {
            return App.DeviceUtil.CheckWebglRenderMode();
            // if (!!window["WebGLRenderingContext"]) {//支持龙骨
            //     ret = 1;//完全支持
            //     if (egret.Capabilities.renderMode == "canvas") {//canvas 不支持蒙皮
            //         ret = 2;//不支持蒙皮
            //     }
            // }
            // return ret;
        };
        CommonUtil.formatFullScreenBg = function () {
            if (!App.DeviceUtil.checkIsFullscreen()) {
                return;
            }
            var layerY = GameData.layerPosY || (GameConfig.stage.stageHeight - GameConfig.stageHeigth) * 0.5;
            var topBg = LayerMgr.maskLayer.getChildByName("fill_screen_top");
            if (!topBg) {
                topBg = BaseLoadBitmap.create("fill_screen_top");
                LayerMgr.msgLayer.addChild(topBg);
                // topBg.y=0-topBg.height;
                // 图片在未渲染时无法获取宽高，故此处直接赋值
                topBg.y = -183;
            }
            var buttomBg = LayerMgr.maskLayer.getChildByName("fill_screen_buttom");
            if (!buttomBg) {
                buttomBg = BaseLoadBitmap.create("fill_screen_buttom");
                LayerMgr.msgLayer.addChild(buttomBg);
                buttomBg.y = GameConfig.stageHeigth;
            }
        };
        CommonUtil.formatIpadScreenBg = function () {
            if (App.DeviceUtil.checkIsIpadScreen() || GameConfig.stage.scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                var layerX = GameData.layerPosX || (GameConfig.stage.stageWidth - GameConfig.stageWidth) / 2;
                var __mask = new egret.Shape();
                __mask.graphics.beginFill(0x000000, 1);
                __mask.graphics.drawRect(0, 0, layerX, GameConfig.stageHeigth);
                __mask.graphics.drawRect(layerX + GameConfig.stageWidth, 0, layerX, GameConfig.stageHeigth);
                __mask.graphics.endFill();
                LayerMgr.msgLayer.addChild(__mask);
                __mask.x = -layerX;
                // let __leftImg: BaseLoadBitmap = BaseLoadBitmap.create('fill_screen_buttom')
                // __leftImg.width = layerX;
                // __leftImg.height = GameConfig.stageHeigth;
                // __leftImg.x = -layerX;
                // __leftImg.y = 0;
                // LayerMgr.msgLayer.addChild(__leftImg);
                // let __rightImg: BaseLoadBitmap = BaseLoadBitmap.create('fill_screen_buttom')
                // __rightImg.width = layerX;
                // __rightImg.height = GameConfig.stageHeigth;
                // __rightImg.x = GameConfig.stageWidth;
                // __rightImg.y = 0;
                // LayerMgr.msgLayer.addChild(__rightImg);
            }
        };
        CommonUtil.getAge = function (identityCard) {
            var len = (identityCard + "").length;
            if (len == 0) {
                return 0;
            }
            else {
                if ((len != 15) && (len != 18)) {
                    return 0;
                }
            }
            var strBirthday = "";
            if (len == 18) {
                strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
            }
            if (len == 15) {
                strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
            }
            //时间字符串里，必须是“/”
            var birthDate = new Date(strBirthday);
            var nowDateTime = new Date();
            var age = nowDateTime.getFullYear() - birthDate.getFullYear();
            //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
            if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        };
        /** 是否是有效姓名 */
        CommonUtil.isTrueName = function (name) {
            var regName = /^[\u4e00-\u9fa5,·]{2,15}$/;
            if (!regName.test(name)) {
                return false;
            }
            return true;
        };
        /** 是否是有效手机 */
        CommonUtil.isPhoneNum = function (num) {
            var regName = /^1[34578]\d{9}$/;
            if (!regName.test(num)) {
                return false;
            }
            return true;
        };
        /** 是否是有效验证码 */
        CommonUtil.isCerCode = function (num) {
            var regName = /^[0-9]{4,6}$/;
            if (!regName.test(num)) {
                return false;
            }
            return true;
        };
        // 身份证号验证，来源于网络 https://www.jb51.net/article/23651.htm
        CommonUtil.isCardNo = function (idcard) {
            //验证身份证号方法 
            // var Errors=new Array("验证通过!","身份证号码位数不对!","身份证号码出生日期超出范围或含有非法字符!","身份证号码校验错误!","身份证地区非法!"); 
            var area = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "xinjiang", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
            var Y, JYM;
            var S, M;
            var idcard_array = new Array();
            idcard_array = idcard.split("");
            if (area[parseInt(idcard.substr(0, 2))] == null)
                return false;
            var ereg;
            if (idcard.length === 15) {
                if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
                    ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性 
                }
                else {
                    ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性 
                }
                if (ereg.test(idcard))
                    return true;
                else
                    return false;
            }
            else if (idcard.length === 18) {
                if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0)) {
                    ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式 
                }
                else {
                    ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式 
                }
                if (ereg.test(idcard)) {
                    S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
                    Y = S % 11;
                    M = "F";
                    JYM = "10X98765432";
                    M = JYM.substr(Y, 1);
                    if (M == idcard_array[17])
                        return true;
                    else
                        return false;
                }
                else
                    return false;
            }
            else {
                return false;
            }
        };
        // public static getLanguageResKey():string
        // {
        // 	let languageResKey:string=PlatformManager.getSpid();
        // 	if(PlatformManager.checkIsLocal()||PlatformManager.checkIsIOSShenheSp())
        // 	{
        // 		let tmpcnName:string=App.CommonUtil.getOption("language");
        // 		if(tmpcnName&&RES.hasRes(tmpcnName))
        // 		{
        // 			languageResKey=tmpcnName;
        // 		}
        // 		else
        // 		{
        // 			if(PlatformManager.checkIOSShenheOtherLanguage())
        // 			{
        // 				languageResKey=PlatformManager.checkIOSShenheOtherLanguage();
        // 			}
        // 		}
        // 	}
        // 	else if (PlatformManager.checkIsZjlySp())
        // 	{
        // 		languageResKey="zjly";
        // 	}
        // 	return languageResKey;
        // }
        CommonUtil.overwriteAlert = function () {
            var tmpAlert = window.alert;
            window.alert = function (message) {
                if (message && String(message).indexOf("sound decode error:") == 0 && String(message).indexOf("http://edn.egret.com/cn/docs/page/156") > -1) {
                    console.log("sound decode error");
                }
                else {
                    tmpAlert(message);
                }
            };
        };
        /**
         * 获取当前渠道测试地址url
         */
        CommonUtil.getTestUrl = function () {
            var testUrl = "";
            if (App.DeviceUtil.IsHtml5()) {
                var curl = window.location.href;
                testUrl = curl;
                var pathName = window.location.pathname;
                var testpathName = pathName;
                if (pathName.indexOf("gt_test") < 0 && pathName.indexOf("gt_local") < 0 && pathName.indexOf("gt_iosshenhe") < 0 && pathName.indexOf("gt_plat") < 0) {
                    if (PlatMgr.checkIsWanbaSp()) {
                        if (pathName.indexOf("home?") > -1) {
                            testpathName = pathName.replace("home?", "gt_testwanba/?");
                        }
                        else if (pathName.indexOf("home") > -1) {
                            testpathName = pathName.replace("home", "gt_testwanba/");
                        }
                    }
                    else {
                        testpathName = pathName.replace("gt_", "gt_test");
                    }
                    testUrl = curl.replace(pathName, testpathName);
                }
            }
            return testUrl;
        };
        /**
         * 检测是否可以切换1000服
         */
        CommonUtil.checkAndJumpToTest = function () {
            if (App.DeviceUtil.IsHtml5() && LocalStorageMgr.get("gametest1000")) {
                var curl = window.location.href;
                var newUrl = App.CommonUtil.getTestUrl();
                if (curl != newUrl) {
                    LocalStorageMgr.set("gametest1000", curl);
                    window.location.href = newUrl;
                }
            }
        };
        /**
         * 从测试切到正式
         */
        CommonUtil.checkAndJumpToBack = function () {
            if (App.DeviceUtil.IsHtml5()) {
                var gameUrl = LocalStorageMgr.get("gametest1000");
                var curl = window.location.href;
                LocalStorageMgr.remove("gametest1000");
                if (gameUrl && gameUrl != curl) {
                    window.location.href = gameUrl;
                }
            }
            else if (App.DeviceUtil.isRuntime2()) {
                RSDKHelper.setRuntime2State({ game_mark: "" });
            }
        };
        /**
         * 清理timeout计时器
         */
        CommonUtil.clear = function () {
            while (CommonUtil.timeOutArr.length > 0) {
                egret.clearTimeout(CommonUtil.timeOutArr.shift());
            }
        };
        /**
         * title转换
        */
        CommonUtil.getTitleData = function (info) {
            var clothes = "";
            var titleid = "";
            var clv = 0;
            var tlv = 0;
            if (info) {
                if ((typeof info == "number" && info != 0)) {
                    titleid = info.toString();
                }
                else if ((typeof info == "string" && info != "")) {
                    if (info.split("_")[1]) {
                        clothes = info.split("_")[0];
                        titleid = info.split("_")[1];
                    }
                    else {
                        titleid = info.split("_")[0];
                    }
                }
                else if (typeof info == "object") {
                    if (info.clothes) {
                        clothes = info.clothes;
                    }
                    if (info.title) {
                        titleid = info.title;
                    }
                    if (info.clv) {
                        clv = info.clv;
                    }
                    if (info.tlv) {
                        tlv = info.tlv;
                    }
                }
            }
            var obj = {
                clothes: clothes,
                title: titleid,
                clv: clv,
                tlv: tlv,
            };
            return obj;
        };
        /*
        *统一获取称号图片和特效
        */
        CommonUtil.getPtitleInfo = function (ptitleinfo) {
            //let ptitleinfo = this.playerVo.ptitle;
            var pid = "";
            var plv = 1;
            if (ptitleinfo) {
                if (typeof ptitleinfo == "string" || typeof ptitleinfo == "number") {
                    pid = String(ptitleinfo);
                }
                if (typeof ptitleinfo == "object") {
                    if (ptitleinfo.ptitle) {
                        pid = ptitleinfo.ptitle;
                    }
                    if (ptitleinfo.plv) {
                        plv = ptitleinfo.plv;
                    }
                }
            }
            return {
                ptitle: String(pid), plv: plv
            };
        };
        /*
        *根据code获得资源图  资源必须严格命名 以xxx-code 结尾 如 xxx-1, xxx-2,xxxx-3
        *prev  资源前缀 分隔符"-"以前的字符串
        *code 传入code
        */
        CommonUtil.getResByCode = function (prev, code, defaultcode) {
            if (defaultcode === void 0) { defaultcode = "1"; }
            var resname = prev + "-" + code;
            if (!RES.hasRes(resname)) {
                //返回默认code资源
                resname = prev + "-" + defaultcode;
                if (!RES.hasRes(resname)) {
                    resname = prev + "-1";
                    if (!RES.hasRes(resname)) {
                        resname = "" + prev;
                    }
                }
            }
            return resname;
        };
        /*
        *根据code获得cnkey  key严格命名以 必须 xxx-code 结尾 如 xxx-1, xxx-2,xxxx-3
        *prev  key前缀 分隔符"-"以前的字符串
        *code 传入code
        */
        CommonUtil.getCnByCode = function (prev, code, defaultcode) {
            if (defaultcode === void 0) { defaultcode = "1"; }
            var newkey = prev + "-" + code;
            if (!LangMger.checkHasKey(newkey)) {
                //返回默认code的cnkey
                newkey = prev + "-" + defaultcode;
                if (!LangMger.checkHasKey(newkey)) {
                    newkey = prev + "-1";
                    if (!LangMger.checkHasKey(newkey)) {
                        newkey = "" + prev;
                    }
                }
            }
            return newkey;
        };
        /**
         * 获取节日专属标记
        */
        CommonUtil.getSkinFromType = function (skinId) {
            var flag = '';
            var res = null;
            var w = 0;
            var h = 0;
            switch (Number(skinId)) {
                case 10334:
                case 10561:
                    flag = "lanternzshuflag";
                    w = 129;
                    h = 45;
                    break;
                case 10344:
                    flag = "acrecover_skintitle";
                    w = 162;
                    h = 62;
                    break;
            }
            if (flag != "") {
                res = BaseLoadBitmap.create(flag);
                res.width = w;
                res.height = h;
            }
            return res;
        };
        /**
         * 获取双子类型的龙骨
        */
        CommonUtil.getDoubleGragon = function (wifeid) {
            var group = null;
            var flag = false;
            switch (Number(wifeid)) {
                case 236:
                    flag = true;
                    break;
            }
            if (flag) {
                group = new BaseDisplayObjectContainer();
                var wife1 = App.DragonBonesUtil.getLoadDragonBones("wife_full_" + wifeid + "_1");
                var wife2 = App.DragonBonesUtil.getLoadDragonBones("wife_full_" + wifeid + "_2");
                group.addChild(wife2);
                group.addChild(wife1);
            }
            return group;
        };
        /**打开输入测试账号面板 */
        CommonUtil.showAccountPanel = function () {
            var _this = this;
            App.LogUtil.log("初始化输入账号界面");
            this._maskSp = new egret.Shape();
            this._maskSp.graphics.beginFill(ColorEnums.black, 0.5);
            this._maskSp.graphics.drawRect(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth);
            this._maskSp.graphics.endFill();
            this._maskSp.touchEnabled = true;
            LayerMgr.maskLayer.addChild(this._maskSp);
            this._accountPanel = new BaseDisplayObjectContainer();
            LayerMgr.maskLayer.addChild(this._accountPanel);
            var bg = new egret.Shape();
            bg.graphics.beginFill(ColorEnums.black, 1);
            bg.graphics.drawRect(0, 0, 400, 250);
            bg.graphics.endFill();
            this._accountPanel.addChild(bg);
            this._accountPanel.x = GameConfig.stageWidth / 2 - bg.width / 2;
            this._accountPanel.y = GameConfig.stageHeigth / 2 - bg.height / 2;
            var usernameTF = new BaseTextField();
            usernameTF.x = 20;
            usernameTF.y = 50;
            usernameTF.text = "账号：";
            this._accountPanel.addChild(usernameTF);
            var usernameBg = new egret.Shape();
            usernameBg.graphics.beginFill(ColorEnums.white, 1);
            usernameBg.graphics.drawRect(0, 0, 250, 50);
            usernameBg.graphics.endFill();
            usernameBg.graphics.beginFill(ColorEnums.black, 1);
            usernameBg.graphics.drawRect(1, 1, 248, 48);
            usernameBg.graphics.endFill();
            usernameBg.x = 110;
            usernameBg.y = usernameTF.y + usernameTF.height / 2 - usernameBg.height / 2;
            this._accountPanel.addChild(usernameBg);
            var usernameInput = new BaseTextField();
            usernameInput.type = egret.TextFieldType.INPUT;
            usernameInput.width = 250;
            usernameInput.height = usernameTF.height;
            usernameInput.x = 120;
            usernameInput.y = 50;
            usernameInput.maxChars = 100;
            usernameInput.text = LoginMgr.getLocalUserName();
            var username = usernameInput.text;
            this._accountPanel.addChild(usernameInput);
            usernameInput.addEventListener(egret.TextEvent.CHANGE, function (event) {
                username = event.target.text;
            }, this, false, 2);
            var btn = new BaseShape();
            btn.graphics.beginFill(0xff0000);
            btn.graphics.drawRoundRect(0, 0, 100, 40, 8, 8);
            btn.graphics.endFill();
            btn.x = this._accountPanel.width / 2 - btn.width / 2;
            btn.y = this._accountPanel.height - 70;
            this._accountPanel.addChild(btn);
            btn.addTouchTap(function () {
                if (username.length > 100) {
                    App.CommonUtil.showTip("账号不能超过100位字符");
                    return;
                }
                else if (username.length < 3) {
                    App.CommonUtil.showTip("账号最少三个字符");
                    return;
                }
                if (_this._accountPanel) {
                    _this._accountPanel.dispose();
                    _this._accountPanel = null;
                }
                if (_this._maskSp && LayerMgr.maskLayer.contains(_this._maskSp)) {
                    LayerMgr.maskLayer.removeChild(_this._maskSp);
                    _this._maskSp = null;
                }
                PlatMgr.userId = usernameInput.text;
                PlatMgr.isLogin = true;
                LoginMgr.loginGame();
            }, this);
            App.LogUtil.log("初始化输入账号界面成功");
        };
        /**
         * 宝箱类卡片扩展气泡提示
         * boxid : 宝箱id
         * cardType : 卡片类型
         * point : 坐标
         */
        CommonUtil.showBoxExtendTip = function (boxid, cardType, point) {
            var view = this;
            if (!point) {
                point = new egret.Point(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
            }
            var exttip = new BoxExtendTip();
            exttip.init(boxid, cardType, point);
            LayerMgr.msgLayer.addChild(exttip);
        };
        /**
         * 文字扩展气泡提示
         * str : 文字内容
         * point : 坐标
         */
        CommonUtil.showExtendTip = function (str, point, top, width, textAlign, hideTime) {
            var view = this;
            if (!point) {
                point = new egret.Point(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
            }
            var exttip = new ExtendTip();
            exttip.init(str, point, top, width, textAlign, hideTime);
            LayerMgr.msgLayer.addChild(exttip);
        };
        /**
         * 文字扩展气泡提示
         * str : 文字内容
         * secound : secound秒后销毁
         * point : 坐标
         */
        CommonUtil.showExtendTipForSecound = function (str, secound, point, top) {
            var view = this;
            if (!point) {
                point = new egret.Point(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
            }
            var exttip = new ExtendTip();
            exttip.init(str, point, top);
            LayerMgr.msgLayer.addChild(exttip);
            egret.Tween.get(exttip).wait(secound * 1000).call(function () {
                exttip.dispose();
            });
        };
        /**
         * 获取骰子icon以及特效
         * id : 骰子id
         */
        CommonUtil.getDiceIconById = function (id, scale, isbig, isNewStatus) {
            var container = new BaseDisplayObjectContainer();
            // container.width = BattleStatus.diceSize.width;
            // container.height = BattleStatus.diceSize.height;
            container.setScale(scale);
            var cfg = Config.DiceCfg.getCfgById(id);
            var icon = BaseLoadBitmap.create(Config.DiceCfg.getIconById(id, isbig));
            // icon.width = BattleStatus.diceSize.width;
            // icon.height = BattleStatus.diceSize.height;
            icon.name = "diceicon";
            container.addChild(icon);
            container.width = icon.width;
            container.height = icon.height;
            if (isNewStatus) {
                var newState = BaseBitmap.create("dicenewget");
                // App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, newState, container, [0,0]);
                container.addChild(newState);
            }
            // if(scale == DiceScaleEnum.scale_53){
            // 	let shadow = BaseBitmap.create(`diceshadow${cfg.quality == 4 ? 2 : 1}`);
            // 	shadow.setScale(1/scale);
            // 	shadow.name = `shadow`;
            // 	App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, shadow, icon, [-4,-1]);
            // 	container.addChildAt(shadow,0);
            // }
            // let starres = `dicestar${id}`;
            // if(!RES.hasRes(starres)){
            // 	starres = `dicestar101`;
            // }
            // let star = BaseLoadBitmap.create(starres,null,{
            // 	callback : ()=>{
            // 		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, star, icon);
            // 	},
            // 	callbackThisObj : this
            // });
            // container.addChild(star);
            return container;
        };
        //object深度复制，规避js原有的引用传递
        CommonUtil.object_clone = function (source) {
            var data = {};
            for (var key in source) {
                if (source[key] == null) {
                    continue;
                }
                if (this.getType(source[key]) == 'object') {
                    data[key] = this.object_clone(source[key]);
                }
                else if (this.getType(source[key]) == "array") {
                    data[key] = this.arr_clone(source[key]);
                }
                else {
                    data[key] = source[key];
                }
            }
            return data;
        };
        //arr深度复制,对所有复杂arr均有效，规避js原有的引用传递
        CommonUtil.arr_clone = function (source) {
            var destination = [];
            for (var key in source) {
                var p = parseInt(key);
                if (this.getType(source[p]) == "array") {
                    destination[p] = [];
                    arguments.callee(destination[p], source[p]);
                }
                else if (this.getType(source[p]) == "object") {
                    destination[p] = {};
                    destination[p] = this.object_clone(source[p]);
                }
                else {
                    destination[p] = source[p];
                }
            }
            return destination;
        };
        CommonUtil.getType = function (o) {
            var _t;
            return ((_t = typeof (o)) == "object" ? o == null && "null" || Object.prototype.toString.call(o).slice(8, -1) : _t).toLowerCase();
        };
        /**
         *
         * @param id 广告ID
         * @param obj 回调对象
         */
        CommonUtil.watchAd = function (id, obj) {
            if (!Api.SwitchVoApi.getADSwitchStatus()) {
                App.CommonUtil.showTip(LangMger.getlocal("watchAdfailuretip"));
                return false;
            }
            if (Api.AdvertiseVoApi.getAdNumByID(id) <= 0 || Api.AdvertiseVoApi.getAdCurCD(id) > 0) {
                // App.CommonUtil.showTip(LangMger.getlocal("watchAdfailuretip3"));
                return false;
            }
            else {
                if (PlatMgr.checkIsUseSDK()) {
                    obj = obj || this;
                    PlatMgr.checkHasAd({
                        callbackSucceed: function () {
                            console.log("game:checkHasAd succ callback");
                            if (App.DeviceUtil.isRuntime2()) {
                                SoundMgr.stopBgByName("music_ready");
                            }
                            PlatMgr.showAd(null, {
                                callbackSucceed: function () {
                                    console.log("game:showAd succ callback");
                                    // App.CommonUtil.showTip("观看广告");
                                    if (App.DeviceUtil.isRuntime2()) {
                                        SoundMgr.playBg("music_ready");
                                    }
                                    Api.AdvertiseVoApi.setAdtype(id);
                                    NetManager.request(NetConst.ADVERTISE_WATCH, { advType: parseInt(id[id.length - 1]) });
                                },
                                callbackFailure: function () {
                                    console.log("game:showAd fail callback");
                                    if (App.DeviceUtil.isRuntime2()) {
                                        SoundMgr.playBg("music_ready");
                                    }
                                    // App.CommonUtil.showTip(LangMger.getlocal("watchAdfailuretip2"));
                                },
                                callbackError: function () {
                                    console.log("game:showAd error callback");
                                    if (App.DeviceUtil.isRuntime2()) {
                                        SoundMgr.playBg("music_ready");
                                    }
                                    App.CommonUtil.showTip(LangMger.getlocal("watchAdfailuretip2"));
                                }
                            }, obj);
                        },
                        callbackFailure: function () {
                            console.log("game:checkHasAd fail callback");
                            App.CommonUtil.showTip(LangMger.getlocal("watchAdfailuretip"));
                        }
                    }, obj);
                }
                else {
                    if (true) {
                        App.CommonUtil.showTip("\u6CA1\u6709 sdk \u770B\u5E7F\u544A");
                    }
                    Api.AdvertiseVoApi.setAdtype(id);
                    NetManager.request(NetConst.ADVERTISE_WATCH, { advType: parseInt(id[id.length - 1]) });
                }
                return true;
            }
        };
        /**
         * 数值在一段时间能变化
         * @param initNum 初始数值
         * @param endNum 最终数值
         * @param time 变化事件，单位毫秒
         */
        CommonUtil.changeNumTween = function (initNum, endNum, time, cb) {
            var d = (endNum - initNum) <= 1 ? 1 : endNum - initNum;
            var dt = time / d;
            dt = (dt > 50) ? 50 : dt;
            var step = 1;
            var curnum = initNum;
            var timer = setInterval(function () {
                if (curnum > endNum) {
                    clearInterval(timer);
                }
                else {
                    cb && cb(curnum);
                }
                curnum += step;
            }, dt);
        };
        /**
         * 发送引导步骤
         */
        CommonUtil.sendNewGuideId = function (guideid) {
            if (!Api.GameinfoVoApi.getIsFinishNewGuide()) {
                var id = GuideCfg.anlyizeCfg[guideid];
                if (id) {
                    if (id == GuideCfg.rookieCfg["guideSteps"]) {
                        PlatMgr.analyticsCompleteNewGuide();
                        NetManager.request(NetConst.REQUEST_USER_NEWERGUILD, { step: id });
                    }
                    else {
                        PlatMgr.analyticsNewGuide(id);
                        NetManager.request(NetConst.REQUEST_USER_NEWERGUILD, { step: Number(guideid) });
                    }
                }
            }
        };
        CommonUtil.sendAnlyId = function (id) {
            if (!Api.GameinfoVoApi.getIsFinishNewGuide()) {
                PlatMgr.analyticsNewGuide(id);
            }
        };
        /**
         * 钻石不足时的通用逻辑
         */
        CommonUtil.gemNotEnough = function (type) {
            switch (type) {
                case 1:
                    ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
                        title: LangMger.getlocal("sysTip"),
                        msg: LangMger.getlocal("sysgemNotEnough"),
                        needCancel: false,
                    });
                    break;
                case 2:
                    App.CommonUtil.showTip(LangMger.getlocal("sysgemNotEnough"));
                    break;
                default:
                    break;
            }
        };
        CommonUtil.prototype.playEffect = function (target, options) {
            options = options || {};
            if (options.initNum == options.num)
                return;
            var time = options.time, //总时间--毫秒为单位 
            finalNum = options.num, //要显示的真实数值
            regulator = options.regulator || 100, //调速器，改变regulator的数值可以调节数字改变的速度          
            step = (finalNum - options.initNum) / (time / regulator), /*每30ms增加的数值--*/ count = options.initNum, //计数器       
            initial = options.initNum;
            var timer = setInterval(function () {
                count = count + step;
                if (count >= finalNum && options.initNum < finalNum) {
                    clearInterval(timer);
                    count = finalNum;
                }
                if (count <= finalNum && options.initNum > finalNum) {
                    clearInterval(timer);
                    count = finalNum;
                }
                //t未发生改变的话就直接返回         
                var t = Math.floor(count);
                if (t == initial)
                    return;
                initial = t;
                target.text = initial + "";
            }, 30);
        };
        /**
         * 设置localstorage，并在key上拼接UID
         * 注意：请确保能取到UID，否则不会存储并return false
         * @param key localstorage_key
         * @param data localstorage_key对应value
         */
        CommonUtil.setLocalStorageWithUid = function (key, data) {
            var __uid = Api.UserinfoVoApi.getUid();
            if (!__uid)
                return false;
            localStorage.setItem(key + "_" + __uid, data);
            return true;
        };
        /**
         * 以拼接UID的key读取localstorage
         * 注意：请确保能取到UID，否则直接按读取不到处理
         * @param key localstorage_key
         */
        CommonUtil.getLocalStorageWithUid = function (key) {
            var __uid = Api.UserinfoVoApi.getUid();
            if (!__uid) {
                return null;
            }
            return localStorage.getItem(key + "_" + __uid);
        };
        /**
         * 以拼接UID的key移除localstorage
         * 注意：请确保能取到UID，否则不做任何处理
         * @param key localstorage_key
         */
        CommonUtil.removeLocalStorageWithUid = function (key) {
            var __uid = Api.UserinfoVoApi.getUid();
            if (!__uid)
                return false;
            localStorage.removeItem(key + "_" + __uid);
        };
        /**
         *计时器缓存
         *
         * @static
         * @type {number[]}
         * @memberof CommonUtil
         */
        CommonUtil.timeOutArr = [];
        CommonUtil.titleframecfg = {
            4038: 8,
            6006: 8,
            4033: 10,
            4016: 10,
            6007: 10,
            4040: 8,
            3151: 8,
        };
        return CommonUtil;
    }());
    App.CommonUtil = CommonUtil;
    __reflect(CommonUtil.prototype, "App.CommonUtil");
})(App || (App = {}));
//# sourceMappingURL=CommonUtil.js.map