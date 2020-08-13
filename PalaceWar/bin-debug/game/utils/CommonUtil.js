/**
 * 公共方法类
 * author dmj
 * date 2017/9/27
 * @class CommonUtil
 */
var App;
(function (App) {
    var CommonUtil = /** @class */ (function () {
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
                    LayerManager.msgLayer.addChild(rewardFly);
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
                var msgText = ComponentManager.getTextField(message, TextFieldConst.FONTSIZE_TITLE_SMALL);
                msgText.setPosition(tipBg.x + (tipBg.width - msgText.width) / 2, tipBg.y + (tipBg.height - msgText.height) / 2);
                msgText.textAlign = egret.HorizontalAlign.CENTER;
                msgText.name = "msgText";
                msgText.lineSpacing = 2;
                txtLine = msgText.numLines;
                tipContainer_1.addChild(msgText);
                tipContainer_1.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
                LayerManager.msgLayer.addChild(tipContainer_1);
                CommonUtil._tipContainer = tipContainer_1;
            }
            else {
                var tipBg = tipContainer.getChildByName("tipBg");
                if (!tipBg.texture || !tipBg.texture.bitmapData) {
                    tipBg.texture = ResourceManager.getRes("public_tipbg");
                }
                var msgText = CommonUtil._tipContainer.getChildByName("msgText");
                msgText.text = message;
                msgText.setPosition(tipBg.x + (tipBg.width - msgText.width) / 2, tipBg.y + (tipBg.height - msgText.height) / 2);
                tipContainer.setScale(1);
                tipContainer.alpha = 1;
                egret.Tween.removeTweens(tipContainer);
                tipContainer.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
                txtLine = msgText.numLines;
                if (!LayerManager.msgLayer.contains(tipContainer)) {
                    LayerManager.msgLayer.addChild(tipContainer);
                }
            }
            egret.Tween.get(CommonUtil._tipContainer).to({ scaleX: 1.1, scaleY: 1.1 }, 100).to({ scaleX: 1, scaleY: 1 }, 70).wait(1300 * txtLine).to({ alpha: 0 }, 200).call(function (tipContainer) {
                if (tipContainer) {
                    egret.Tween.removeTweens(tipContainer);
                    if (LayerManager.msgLayer.contains(tipContainer)) {
                        LayerManager.msgLayer.removeChild(tipContainer);
                    }
                    tipContainer.setScale(1);
                    tipContainer.alpha = 1;
                }
            }.bind(this, CommonUtil._tipContainer), this);
        };
        CommonUtil.showCollectEffect = function (resKey, startPoint, endPoint, callback, callbackThisObj, callbackParams) {
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
        CommonUtil.createMainUIIcon = function (iconUrl, iconNameStr, isShow, extType, BigIcon, timeStr, aid) {
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
                var iconAni = ComponentManager.getCustomMovieClip("left_iconbg_", 5, 100);
                iconAni.playWithTime(-1);
                iconContainer_1.addChild(iconAni);
                iconAni.width = 129;
                iconAni.height = 130;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconAni, iconbg);
                var icon = ComponentManager.getCustomMovieClip(iconmame, 5, 100);
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
                            if (PlatformManager.checkIsEnLang()) {
                                defaultW = 110;
                            }
                            iconName_1.setPosition(container.width / 2 - (iconName_1.width ? iconName_1.width : defaultW) / 2, 90);
                            if (timeStr) {
                                var timeTF = iconContainer_1.getChildByName(aid_1 + "_TF");
                                var timeBg = iconContainer_1.getChildByName(aid_1 + "_Bg");
                                if ((!timeTF) && (!timeBg)) {
                                    timeBg = BaseBitmap.create("public_9_bg89");
                                    timeBg.name = aid_1 + "_Bg";
                                    timeTF = ComponentManager.getTextField(timeStr, 20, TextFieldConst.COLOR_WARN_RED3);
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
                if (iconNameStr == "share_icon_name" && PlatformManager.checkIsAiweiyouSp() == true) {
                    iconNameStr = "share_icon_name_aiweiyou";
                }
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
                if (PlatformManager.checkIsRuSp()) {
                    if (iconUrl == "sevendayssignup1_icon" || iconUrl == "sevendayssignup2_icon" || iconUrl == "sevendayssignup7_icon") {
                        iconUrl += "_ru";
                        iconNameStr = "sevendayssignup_name_ru";
                    }
                }
                if (PlatformManager.checkIsEnSp()) {
                    if (iconUrl == "sevendayssignup1_icon" || iconUrl == "sevendayssignup2_icon" || iconUrl == "sevendayssignup7_icon") {
                        iconUrl += "_en";
                        iconNameStr = "sevendayssignup_name_en";
                    }
                }
                // let aid = iconUrl.split(`_`)[1];
                var vo = Api.acVoApi.getActivityVoByAidAndCode(aid);
                if (vo && vo.zids && vo.isCrossLeague()) { //
                    if (RES.hasRes(iconUrl + "_crossleague")) {
                        iconUrl += "_crossleague";
                    }
                }
                var icon = BaseLoadBitmap.create(iconUrl);
                icon.name = 'icon';
                iconContainer_2.addChild(icon);
                //加载完图片重新设置尺寸
                var iconName_2 = BaseLoadBitmap.create(iconNameStr, null, { callback: function (container) {
                        if (container) {
                            var defaultW = 88;
                            if (PlatformManager.checkIsEnLang()) {
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
                        if (bdoc["_buttonName"] && (bdoc["_buttonName"] == "btn2_normal_yellow" || bdoc["_buttonName"] == "btn2_normal_red" || bdoc["_buttonName"] == "btn2_normal_blue")) {
                            reddot.x = 145;
                        }
                        else if (bdoc["_buttonName"] && (bdoc["_buttonName"] == "btn2_small_yellow" || bdoc["_buttonName"] == "btn2_small_red" || bdoc["_buttonName"] == "btn2_small_blue")) {
                            reddot.x = 117;
                        }
                        else if (bdoc["_buttonName"] && (bdoc["_buttonName"] == "btn2_big_yellow" || bdoc["_buttonName"] == "btn2_big_red" || bdoc["_buttonName"] == "btn2_big_blue")) {
                            reddot.x = 163;
                        }
                        else if (bdoc && bdoc["name"] == "ChangebgIcon") {
                            reddot.x = bdoc.width - reddot.width - 15;
                        }
                        else {
                            reddot.x = bdoc.width - reddot.width + 5;
                        }
                    }
                    else {
                        reddot.x = 0;
                    }
                    reddot.y = -5;
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
            var wordsText = ComponentManager.getTextField(talkStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
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
         * 播放天恩赐福动画
         * @param key 名字
         */
        CommonUtil.showGodbless = function (key) {
            var godBless = new GodBless();
            LayerManager.msgLayer.addChild(godBless);
            godBless.show(key);
        };
        /**
         * 播放皇帝登录动画
         */
        CommonUtil.showGodLoginFlaunt = function (godName) {
            var godLogin = new GodLogin();
            LayerManager.msgLayer.addChild(godLogin);
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
            if (PlatformManager.checkIsKRSp() && App.DeviceUtil.isIOS()) {
                moneyKey = "anyMoneyDollar"; // 韩国ios显示美元
            }
            return LanguageManager.getlocal(moneyKey, [money.toString()]);
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
            var layerY = (GameConfig.stage.stageHeight - GameConfig.stageHeigth) * 0.5;
            var topBg = LayerManager.maskLayer.getChildByName("fill_screen_top");
            if (!topBg) {
                topBg = BaseBitmap.create("fill_screen_top");
                LayerManager.msgLayer.addChild(topBg);
                topBg.y = -topBg.height;
            }
            var buttomBg = LayerManager.maskLayer.getChildByName("fill_screen_buttom");
            if (!buttomBg) {
                buttomBg = BaseBitmap.create("fill_screen_buttom");
                LayerManager.msgLayer.addChild(buttomBg);
                buttomBg.y = GameConfig.stageHeigth;
            }
        };
        CommonUtil.getAge = function (identityCard) {
            var len = (identityCard + "").length;
            if (len == 0) {
                return 0;
            }
            else {
                if ((len != 15) && (len != 18)) //身份证号码只能为15位或18位其它不合法
                 {
                    return 0;
                }
            }
            var strBirthday = "";
            if (len == 18) //处理18位的身份证号码从号码中得到生日和性别代码
             {
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
                    if (PlatformManager.checkIsWanbaSp()) {
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
            if (App.DeviceUtil.IsHtml5() && LocalStorageManager.get("gametest1000")) {
                var curl = window.location.href;
                var newUrl = App.CommonUtil.getTestUrl();
                if (curl != newUrl) {
                    LocalStorageManager.set("gametest1000", curl);
                    window.location.href = newUrl;
                }
            }
        };
        /**
         * 从测试切到正式
         */
        CommonUtil.checkAndJumpToBack = function () {
            if (App.DeviceUtil.IsHtml5()) {
                var gameUrl = LocalStorageManager.get("gametest1000");
                var curl = window.location.href;
                LocalStorageManager.remove("gametest1000");
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
         * 退帮、踢人、解散帮会前检验
         */
        CommonUtil.canNotQuitAlliance = function () {
            var arr = [AcConst.AID_BATTLEGROUND, AcConst.AID_TOMB, AcConst.AID_RANKACTIVE, AcConst.AID_CROSSSERVERHEGEMONY];
            for (var i in arr) {
                var aid = arr[i];
                var notQuit = false;
                var vo = null;
                switch (aid) {
                    case AcConst.AID_BATTLEGROUND:
                        vo = Api.acVoApi.getActivityVoByAidAndCode(aid);
                        notQuit = vo && vo.isInActy();
                        break;
                    case AcConst.AID_TOMB:
                        vo = Api.acVoApi.getActivityVoByAidAndCode(aid);
                        notQuit = vo && vo.isInActy();
                        break;
                    case AcConst.AID_RANKACTIVE:
                        vo = Api.acVoApi.checkActivityStartByAidAndType(aid, "14");
                        if (vo && vo.et && vo.config.extraTime && (GameData.serverTime < (vo.et - vo.config.extraTime * 86400))) {
                            notQuit = true;
                        }
                        break;
                    case AcConst.AID_CROSSSERVERHEGEMONY:
                        vo = Api.acVoApi.getActivityVoByAidAndCode(aid);
                        notQuit = vo && vo.isNotQuitAlliance();
                    default:
                        vo = Api.acVoApi.getActivityVoByAidAndCode(aid);
                        notQuit = vo && !vo.isEnd;
                        break;
                }
                if (notQuit) {
                    return notQuit;
                }
            }
            return false;
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
                tlv: tlv
            };
            return obj;
        };
        /*
        *统一获取称号图片和特效
        */
        CommonUtil.getTitlePic = function (title, level) {
            if (level === void 0) { level = 0; }
            var titleinfo = this.getTitleData(title);
            var group = null;
            if (titleinfo.title != "") {
                group = new BaseDisplayObjectContainer();
                var titleimg_1 = BaseLoadBitmap.create("user_title_" + titleinfo.title + "_3");
                titleimg_1.width = 155;
                titleimg_1.height = 59;
                group.addChild(titleimg_1);
                titleimg_1.name = "titleimg";
                if (!level || level == 0) {
                    level = titleinfo.tlv;
                }
                var titleconfig = Config.TitleCfg.getTitleCfgById(titleinfo.title);
                if (Api.switchVoApi.checkTitleUpgrade()) {
                    //添加特效
                    if (level && titleconfig) {
                        var isdi = titleconfig.isTitle == 1 && titleconfig.titleType == 1;
                        var iswang = titleconfig.isTitle == 1 && titleconfig.titleType == 2;
                        var ishuang = titleconfig.isTitle == 1 && titleconfig.titleType == 7;
                        var cfg = null;
                        if (isdi) {
                            cfg = Config.TitleupgradeCfg.diList[level - 1];
                        }
                        if (iswang) {
                            cfg = Config.TitleupgradeCfg.wangList[level - 1];
                        }
                        if (ishuang) {
                            cfg = Config.TitleupgradeCfg.huangList[level - 1];
                        }
                        if (cfg) {
                            if (cfg.title1) {
                                if (RES.hasRes("user_title_" + titleinfo.title + "_3_" + cfg.title1)) {
                                    var txt1 = BaseLoadBitmap.create("user_title_" + titleinfo.title + "_txt");
                                    txt1.width = 155;
                                    txt1.height = 59;
                                    txt1.anchorOffsetX = txt1.width / 2;
                                    txt1.anchorOffsetY = txt1.height / 2;
                                    txt1.x = txt1.width / 2;
                                    txt1.y = txt1.height / 2;
                                    group.addChild(txt1);
                                    titleimg_1.setload("user_title_" + titleinfo.title + "_3_" + cfg.title1);
                                }
                            }
                            if (cfg.title2) {
                                if (cfg.title2 > 1) {
                                    var txt2 = BaseLoadBitmap.create("user_title_" + titleinfo.title + "_txt");
                                    txt2.width = 155;
                                    txt2.height = 59;
                                    txt2.anchorOffsetX = txt2.width / 2;
                                    txt2.anchorOffsetY = txt2.height / 2;
                                    txt2.x = txt2.width / 2;
                                    txt2.y = txt2.height / 2;
                                    group.addChild(txt2);
                                    txt2.blendMode = egret.BlendMode.ADD;
                                    txt2.alpha = 0;
                                    egret.Tween.get(txt2, { loop: true }).to({ alpha: 0.7 }, 400).to({ alpha: 0 }, 400);
                                }
                                var effName = titleinfo.title + "titleeff" + cfg.title2;
                                var num = 0;
                                if (App.CommonUtil.titleframecfg[title]) {
                                    num = App.CommonUtil.titleframecfg[title];
                                }
                                if (RES.hasRes(effName + "1")) {
                                    var clip_1 = ComponentManager.getCustomMovieClip(effName, num ? num : 10, 130);
                                    var skinTxtEffectBM_1 = BaseLoadBitmap.create(effName + "1", null, {
                                        callback: function () {
                                            clip_1.width = skinTxtEffectBM_1.width;
                                            clip_1.height = skinTxtEffectBM_1.height;
                                            clip_1.playWithTime(-1);
                                            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, clip_1, titleimg_1);
                                            group.addChildAt(clip_1, 0);
                                            // clip.blendMode = egret.BlendMode.ADD;
                                        },
                                        callbackThisObj: this
                                    });
                                }
                            }
                        }
                        else {
                        }
                    }
                }
                else {
                }
                if (titleconfig && titleconfig.changePic) {
                    var tmp = 1;
                    for (var i in titleconfig.changePic) {
                        var tmplv = Number(titleconfig.changePic[i]);
                        if (level >= tmplv) {
                            tmp = Number(i) + 1;
                        }
                    }
                    var piclv = 1;
                    var efflv = 1;
                    if (tmp == 3 || tmp == 4) {
                        piclv = 2;
                        efflv = 3;
                    }
                    else if (tmp == 5) {
                        piclv = 3;
                        efflv = 5;
                    }
                    titleimg_1.setload("user_title_" + titleinfo.title + "_3_" + piclv);
                    if (tmp >= 4) {
                        var txt2 = BaseLoadBitmap.create("user_title_" + titleinfo.title + "_3_" + piclv);
                        txt2.width = 155;
                        txt2.height = 59;
                        txt2.anchorOffsetX = txt2.width / 2;
                        txt2.anchorOffsetY = txt2.height / 2;
                        txt2.x = txt2.width / 2;
                        txt2.y = txt2.height / 2;
                        group.addChild(txt2);
                        txt2.blendMode = egret.BlendMode.ADD;
                        txt2.alpha = 0;
                        egret.Tween.get(txt2, { loop: true }).to({ alpha: 0.7 }, 400).to({ alpha: 0 }, 400);
                    }
                    var effName = titleinfo.title + "titleeff" + efflv;
                    var num = 0;
                    if (App.CommonUtil.titleframecfg[title]) {
                        num = App.CommonUtil.titleframecfg[title];
                    }
                    if (RES.hasRes(effName)) {
                        var clip_2 = ComponentManager.getCustomMovieClip(effName, num ? num : 10, 130);
                        var skinTxtEffectBM_2 = BaseLoadBitmap.create(effName + "1", null, {
                            callback: function () {
                                clip_2.width = skinTxtEffectBM_2.width;
                                clip_2.height = skinTxtEffectBM_2.height;
                                clip_2.playWithTime(-1);
                                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, clip_2, titleimg_1, [-2, -3]);
                                group.addChildAt(clip_2, 0);
                                // clip.blendMode = egret.BlendMode.ADD;
                            },
                            callbackThisObj: this
                        });
                    }
                }
                if (titleinfo.title == "6011") //人中吕布称号不需升级，有特效
                 {
                    var effName = titleinfo.title + "titleeff";
                    var num = 0;
                    if (App.CommonUtil.titleframecfg[title]) {
                        num = App.CommonUtil.titleframecfg[title];
                    }
                    if (RES.hasRes(effName + "1")) {
                        var clip_3 = ComponentManager.getCustomMovieClip(effName, num ? num : 10, 130);
                        var skinTxtEffectBM_3 = BaseLoadBitmap.create(effName + "1", null, {
                            callback: function () {
                                clip_3.width = skinTxtEffectBM_3.width;
                                clip_3.height = skinTxtEffectBM_3.height;
                                clip_3.playWithTime(-1);
                                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, clip_3, titleimg_1);
                                group.addChildAt(clip_3, 0);
                                // clip.blendMode = egret.BlendMode.ADD;
                            },
                            callbackThisObj: this
                        });
                    }
                }
            }
            return group;
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
        CommonUtil.getHeadEffect = function (titleid) {
            var loop = 1;
            var effname = "head_" + titleid + "_effect";
            if (!RES.hasRes(effname)) {
                return null;
            }
            while (RES.hasRes("" + effname + loop)) {
                ++loop;
            }
            var eff = ComponentManager.getCustomMovieClip(effname, loop - 1, 100);
            eff.blendMode = egret.BlendMode.ADD;
            eff.playWithTime(-1);
            var img = BaseLoadBitmap.create(effname + "1", null, {
                callback: function () {
                    eff.width = img.width;
                    eff.height = img.height;
                    eff.anchorOffsetX = eff.width / 2;
                    eff.anchorOffsetY = eff.height / 2;
                },
                callbackThisObj: this
            });
            return eff;
        };
        CommonUtil.getHeadPic = function (ptitle, level, isitem, showTitleEff, showTitleEffNum) {
            if (level === void 0) { level = 0; }
            if (isitem === void 0) { isitem = null; }
            if (showTitleEff === void 0) { showTitleEff = false; }
            if (showTitleEffNum === void 0) { showTitleEffNum = 0; }
            var titleinfo = this.getPtitleInfo(ptitle);
            var title = titleinfo.ptitle;
            if (!level) {
                level = titleinfo.plv;
            }
            var group = null;
            group = new BaseDisplayObjectContainer();
            //道具界面专用
            if (isitem) {
                group.width = 100;
                group.height = 100;
                var itemicon_1 = BaseLoadBitmap.create(isitem.icon);
                itemicon_1.width = 100;
                itemicon_1.height = 100;
                group.addChild(itemicon_1);
                var titleconfig = Config.TitleCfg.getTitleCfgById(title);
                if (titleconfig && titleconfig.changePic) {
                    var tmp = 1;
                    for (var i in titleconfig.changePic) {
                        var tmplv = Number(titleconfig.changePic[i]);
                        if (level >= tmplv) {
                            tmp = Number(i) + 1;
                        }
                    }
                    if (RES.hasRes("itemicon" + title + "_" + tmp)) {
                        itemicon_1.setload("itemicon" + title + "_" + tmp);
                    }
                    var effName = "head_" + title + "_" + tmp + "effect";
                    var num_1 = 0;
                    if (App.CommonUtil.titleframecfg[title]) {
                        num_1 = App.CommonUtil.titleframecfg[title];
                    }
                    //titleconfig.changePicFlame;
                    if (RES.hasRes(effName)) {
                        var clip_4 = ComponentManager.getCustomMovieClip(effName, num_1 ? num_1 : 10, 130);
                        clip_4.blendMode = egret.BlendMode.ADD;
                        var skinTxtEffectBM_4 = BaseLoadBitmap.create(effName + "1", null, {
                            callback: function () {
                                clip_4.width = skinTxtEffectBM_4.width;
                                clip_4.height = skinTxtEffectBM_4.height;
                                clip_4.setScale(0.77);
                                clip_4.playWithTime(-1);
                                if (num_1) {
                                    // clip.y = -3;
                                    clip_4.anchorOffsetX = clip_4.width / 2;
                                    clip_4.anchorOffsetY = clip_4.height / 2;
                                    clip_4.setScale(0.78);
                                    clip_4.x = 50 + 4;
                                    clip_4.y = 50 - 1;
                                }
                                else {
                                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, clip_4, itemicon_1, [-2, 0]);
                                }
                                // if(Number(title) == 4033){
                                // 	clip.x = tmp == 3 ? -4 : 10;
                                // 	clip.y =tmp == 3 ? 2 : 0;
                                // }
                                group.addChild(clip_4);
                            },
                            callbackThisObj: this
                        });
                    }
                }
            }
            else {
                var titleimg_2 = BaseLoadBitmap.create("head_circle_bg_" + title);
                titleimg_2.width = 103;
                titleimg_2.height = 100;
                group.addChild(titleimg_2);
                titleimg_2.name = "titleimg";
                if (title.indexOf("head_circle_bg") > -1) {
                    titleimg_2.setload(title);
                }
                else if (title != "" && title != "-1") {
                    if (!level || level == 0) {
                        level = 1;
                    }
                    var titleconfig = Config.TitleCfg.getTitleCfgById(title);
                    if (titleconfig && titleconfig.changePic) {
                        var tmp = 1;
                        for (var i in titleconfig.changePic) {
                            var tmplv = Number(titleconfig.changePic[i]);
                            if (level >= tmplv) {
                                tmp = Number(i) + 1;
                            }
                        }
                        titleimg_2.setload("head_circle_bg_" + title + "_" + tmp);
                        var effName = "head_" + title + "_" + tmp + "effect";
                        var num_2 = 0;
                        if (App.CommonUtil.titleframecfg[title]) {
                            num_2 = App.CommonUtil.titleframecfg[title];
                        }
                        if (RES.hasRes(effName)) {
                            var clip_5 = ComponentManager.getCustomMovieClip(effName, num_2 ? num_2 : 10, 130);
                            clip_5.blendMode = egret.BlendMode.ADD;
                            var skinTxtEffectBM_5 = BaseLoadBitmap.create(effName + "1", null, {
                                callback: function () {
                                    clip_5.width = skinTxtEffectBM_5.width;
                                    clip_5.height = skinTxtEffectBM_5.height;
                                    clip_5.playWithTime(-1);
                                    if (num_2) {
                                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, clip_5, titleimg_2);
                                    }
                                    else {
                                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, clip_5, titleimg_2, [-5, 0]);
                                    }
                                    group.addChild(clip_5);
                                },
                                callbackThisObj: this
                            });
                        }
                    }
                    if (showTitleEff) {
                        var effName = "head_" + title + "_effect";
                        var num = showTitleEffNum;
                        if (RES.hasRes(effName + "1")) {
                            var clip_6 = ComponentManager.getCustomMovieClip(effName, num, 130);
                            clip_6.blendMode = egret.BlendMode.ADD;
                            var skinTxtEffectBM_6 = BaseLoadBitmap.create(effName + "1", null, {
                                callback: function () {
                                    clip_6.width = skinTxtEffectBM_6.width;
                                    clip_6.height = skinTxtEffectBM_6.height;
                                    clip_6.playWithTime(-1);
                                    clip_6.y = -3;
                                    group.addChild(clip_6);
                                },
                                callbackThisObj: this
                            });
                        }
                    }
                }
                else {
                    var headBg = "head_circle_bg";
                    titleimg_2.setload(headBg);
                }
            }
            return group;
        };
        /*
        *统一获取皇特效
        */
        CommonUtil.getHuangEffect = function (titleid, level) {
            var view = this;
            var obj = {};
            var cfg = Config.TitleupgradeCfg.huangList[level - 1];
            ;
            var titleconfig = Config.TitleCfg.getTitleCfgById(titleid);
            var xialevel = 0;
            //下面特效
            if (cfg) {
                if (cfg.shoulder) {
                    xialevel = cfg.shoulder;
                    var group = new BaseDisplayObjectContainer();
                    var clip = ComponentManager.getCustomMovieClip("titlehuangeffxia_" + xialevel + "_eff", 15, 100);
                    clip.blendMode = egret.BlendMode.NORMAL;
                    clip.width = 72;
                    clip.height = 72;
                    clip.setScale(9);
                    clip.playWithTime(-1);
                    group.name = "xia";
                    obj["xia"] = group;
                    group.addChild(clip);
                    group.anchorOffsetX = group.width / 2;
                    group.anchorOffsetY = group.height / 2;
                }
                //背部特效
                if (cfg.head) {
                    var group = new BaseDisplayObjectContainer();
                    var clip = ComponentManager.getCustomMovieClip("titlehuangeffhou_" + cfg.head + "_eff", 15, 100);
                    clip.blendMode = egret.BlendMode.ADD;
                    clip.width = 318;
                    clip.height = 359;
                    clip.setScale(3);
                    clip.playWithTime(-1);
                    group.name = "hou";
                    obj["hou"] = group;
                    group.addChild(clip);
                    group.anchorOffsetX = group.width / 2;
                    group.anchorOffsetY = group.height / 2;
                    var leftguanggroup = new BaseDisplayObjectContainer();
                    var guang = BaseLoadBitmap.create("titlehuangeffshoulderlight");
                    guang.width = guang.height = 72;
                    guang.setScale(2);
                    leftguanggroup.addChild(guang);
                    leftguanggroup.anchorOffsetX = leftguanggroup.width / 2;
                    leftguanggroup.anchorOffsetY = leftguanggroup.height / 2;
                    egret.Tween.get(guang, { loop: true }).to({ alpha: 0 }, 750).to({ alpha: 1 }, 750);
                    leftguanggroup.name = "leftlight";
                    obj["leftlight"] = leftguanggroup;
                    var rightguanggroup = new BaseDisplayObjectContainer();
                    var guang2 = BaseLoadBitmap.create("titlehuangeffshoulderlight");
                    guang2.width = guang2.height = 72;
                    guang2.setScale(2);
                    rightguanggroup.addChild(guang2);
                    rightguanggroup.anchorOffsetX = rightguanggroup.width / 2;
                    rightguanggroup.anchorOffsetY = rightguanggroup.height / 2;
                    guang2.alpha = 0.2;
                    egret.Tween.get(guang2, { loop: true }).to({ alpha: 0 }, 100).to({ alpha: 1 }, 800).to({ alpha: 0.2 }, 600);
                    rightguanggroup.name = "rightlight";
                    obj["rightlight"] = rightguanggroup;
                }
                //地面特效
                if (cfg.body) {
                    var group = new BaseDisplayObjectContainer();
                    var clip = ComponentManager.getCustomMovieClip("titlehuangeffdimian_" + cfg.body + "_eff", 15, 100);
                    clip.blendMode = egret.BlendMode.NORMAL;
                    clip.width = 72;
                    clip.height = 72;
                    clip.setScale(9);
                    clip.playWithTime(-1);
                    group.name = "dimian";
                    obj["dimian"] = group;
                    group.addChild(clip);
                    group.anchorOffsetX = group.width / 2;
                    group.anchorOffsetY = group.height / 2;
                }
                //龙特效
                if (cfg.dragon) {
                    if ((!Api.switchVoApi.checkCloseBone()) && App.CommonUtil.check_dragon() && RES.hasRes("huangdi_dragon_3151_part1_ske")) {
                        var group = new BaseDisplayObjectContainer();
                        var db1 = App.DragonBonesUtil.getLoadDragonBones("huangdi_dragon_3151_part1");
                        group.addChild(db1);
                        group.name = "db1";
                        obj["db1"] = group;
                        group.anchorOffsetX = group.width / 2;
                        group.anchorOffsetY = group.height / 2;
                        var group2 = new BaseDisplayObjectContainer();
                        var db2 = App.DragonBonesUtil.getLoadDragonBones("huangdi_dragon_3151_part2");
                        group2.addChild(db2);
                        group2.name = "db2";
                        obj["db2"] = group2;
                        group2.anchorOffsetX = group2.width / 2;
                        group2.anchorOffsetY = group2.height / 2;
                    }
                }
            }
            return obj;
        };
        /**
         *获取人物龙骨
         titleid 穿着服装
         pic 头像
         level 服装等级
        */
        CommonUtil.getPlayerDragonRole = function (titleid, pic, level, isHideEffect) {
            if (!level) {
                level = 1;
            }
            var group = new BaseDisplayObjectContainer();
            var loadIdx = 0;
            var dbNode1 = new BaseDisplayObjectContainer(); //下层可变特效
            dbNode1.name = "dbNode1";
            group.addChild(dbNode1);
            var dbNode2 = new BaseDisplayObjectContainer(); //上层可变
            dbNode2.name = "dbNode2";
            var dbNode3 = new BaseDisplayObjectContainer(); //上层不可变
            dbNode3.name = "dbNode3";
            group.addChild(dbNode3);
            var myHair = null;
            var tcfg = Config.TitleCfg.getTitleCfgById(titleid);
            var resPath = "palace_db_" + titleid + (tcfg.titleType == 7 ? "_" + Api.playerVoApi.getUserSex(pic) : "");
            var role = App.DragonBonesUtil.getLoadDragonBones(resPath, 0, "idle", function () {
                group.width = role.width;
                group.height = role.height;
                if (tcfg.titleType != 7) {
                    loadIdx++;
                    if (loadIdx >= 3) {
                        if (role) {
                            role.visible = true;
                        }
                        if (myHead) {
                            myHead.visible = true;
                        }
                        if (myHair) {
                            myHair.visible = true;
                        }
                    }
                }
                //添加特效
                //皇位特效
                var cfg = null;
                if (!isHideEffect) {
                    if (tcfg.titleType == 7) {
                        var effobj = App.CommonUtil.getHuangEffect(titleid, level);
                        if (effobj["xia"]) {
                            group.addChild(effobj["xia"]);
                            effobj["xia"].setPosition(role.x, role.y + role.height - effobj["xia"].anchorOffsetY);
                        }
                        if (effobj["hou"]) {
                            group.addChildAt(effobj["hou"], group.getChildIndex(role) - 1);
                            effobj["hou"].setPosition(role.x, role.y + 250);
                        }
                        if (effobj["leftlight"]) {
                            group.addChild(effobj["leftlight"]);
                            effobj["leftlight"].setPosition(role.x - 80, role.y + 160);
                        }
                        if (effobj["rightlight"]) {
                            group.addChild(effobj["rightlight"]);
                            effobj["rightlight"].setPosition(role.x + 80, role.y + 160);
                        }
                        if (effobj["dimian"]) {
                            group.addChildAt(effobj["dimian"], group.getChildIndex(role) - 1);
                            effobj["dimian"].setPosition(role.x, role.y + effobj["dimian"].height);
                        }
                        if (effobj["db1"]) {
                            group.addChild(effobj["db1"]);
                            effobj["db1"].setPosition(role.x, role.y);
                        }
                        if (effobj["db2"]) {
                            group.addChildAt(effobj["db2"], group.getChildIndex(role) - 1);
                            effobj["db2"].setPosition(role.x, role.y);
                        }
                    }
                    else {
                        var roleNode1 = dbNode1.getChildByName("roleNode1");
                        var roleNode2 = dbNode2.getChildByName("roleNode2");
                        if (roleNode1 && roleNode1 instanceof BaseLoadDragonBones) {
                            roleNode1.stop();
                            roleNode1.dispose();
                        }
                        if (roleNode2 && roleNode2 instanceof BaseLoadDragonBones) {
                            roleNode2.stop();
                            roleNode2.dispose();
                        }
                        dbNode1.removeChildren(); //下层可变特效
                        dbNode2.removeChildren(); //上层可变
                        dbNode3.removeChildren(); //上层不可变
                        var isdi = tcfg.isTitle == 1 && tcfg.titleType == 1;
                        var iswang = tcfg.isTitle == 1 && tcfg.titleType == 2;
                        var ishuang = tcfg.isTitle == 1 && tcfg.titleType == 7;
                        if (isdi) {
                            cfg = Config.TitleupgradeCfg.diList[level - 1];
                        }
                        if (iswang) {
                            cfg = Config.TitleupgradeCfg.wangList[level - 1];
                        }
                        if (ishuang) {
                            cfg = Config.TitleupgradeCfg.huangList[level - 1];
                        }
                        var xialevel = 0;
                        if (cfg && cfg.shoulder) {
                            xialevel = 1;
                        }
                        if (cfg && cfg.head) {
                            xialevel = 2;
                        }
                        if (cfg && cfg.body) {
                            xialevel = 3;
                        }
                        if (cfg && cfg.dragon) {
                            xialevel = 4;
                        }
                        if (xialevel >= 1) {
                            if (xialevel > 1) {
                                var xiapath = "huangdi_" + xialevel + "xia";
                                var roleNode1_1 = App.DragonBonesUtil.getLoadDragonBones(xiapath);
                                if (xialevel == 2) {
                                    roleNode1_1.y = 160;
                                }
                                else if (xialevel == 3) {
                                    roleNode1_1.y = 160;
                                }
                                else if (xialevel == 4) {
                                    roleNode1_1.y = 180;
                                }
                                dbNode1.addChild(roleNode1_1);
                                roleNode1_1.name = "roleNode1";
                                roleNode1_1.x = 0;
                            }
                            var shangpath = "huangdi_" + (xialevel >= 3 ? 3 : xialevel) + "shang";
                            if (xialevel == 1) {
                                shangpath = "huangdi_1";
                            }
                            var roleNode2_1 = App.DragonBonesUtil.getLoadDragonBones(shangpath);
                            roleNode2_1.name = "roleNode2";
                            roleNode2_1.y = 200;
                            dbNode2.addChild(roleNode2_1);
                            roleNode2_1.x = 0;
                        }
                    }
                }
            }, this);
            group.addChild(role);
            group.addChild(dbNode2);
            if (loadIdx == 0) {
                role.visible = false;
            }
            if (tcfg.titleType == 7) {
                role.visible = true;
            }
            var hairPic = "user_hair" + pic;
            if (pic <= 5 || (!ResourceManager.hasRes(hairPic))) {
                hairPic = "user_hair" + 7;
            }
            var rect12 = egret.Rectangle.create();
            rect12.setTo(0, 0, 85, 140);
            myHair = BaseLoadBitmap.create(hairPic, rect12, { callback: function () {
                    loadIdx++;
                    if (loadIdx >= 3) {
                        if (role) {
                            role.visible = true;
                        }
                        if (myHead) {
                            myHead.visible = true;
                        }
                        if (myHair) {
                            myHair.visible = true;
                        }
                    }
                }, callbackThisObj: this });
            myHair.visible = false;
            myHair.name = "myHair";
            group.addChild(myHair);
            myHair.anchorOffsetX = myHair.width / 2;
            // roleNode.width = 470;
            // roleNode.height = 429;
            role.setScale(tcfg.titleType == 7 ? 1 : 1.4);
            var rect1 = egret.Rectangle.create();
            rect1.setTo(0, 0, 136, 143);
            var myHead = BaseLoadBitmap.create("user_head" + pic, rect1, { callback: function () {
                    loadIdx++;
                    if (loadIdx >= 3) {
                        if (role) {
                            role.visible = true;
                        }
                        if (myHead) {
                            myHead.visible = true;
                        }
                        if (myHair) {
                            myHair.visible = true;
                        }
                    }
                }, callbackThisObj: this });
            if (loadIdx == 0) {
                myHead.visible = false;
            }
            myHead.width = 136;
            myHead.height = 143;
            myHead.anchorOffsetX = myHead.width / 2;
            group.addChild(myHead);
            myHead.setPosition(role.x, role.y - 35);
            myHair.setPosition(role.x, role.y - 35);
            return group;
        };
        /*
        * 跳转界面 适用于最新任务 taskdesc+taskid
        **/
        CommonUtil.goTaskView = function (type) {
            var openType = type.split('|')[0];
            var openTypeTab = type.split('|')[1];
            var viewName = App.StringUtil.firstCharToUper(openType);
            var str = '';
            if (openType == "") {
                PlayerBottomUI.getInstance().show();
            }
            else {
                if (openType == "acBattlePass" && Number(openTypeTab) == 4) {
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_BATTLEPASS_JUMP, Number(openTypeTab));
                    return;
                }
                if (Api[openType + "VoApi"] && Api[openType + "VoApi"].isShowNpc) {
                    var isShowNpc = Api[openType + "VoApi"].isShowNpc();
                    if (!isShowNpc) {
                        var lockedStr = Api[openType + "VoApi"].getLockedString ? Api[openType + "VoApi"].getLockedString() : LanguageManager.getlocal("dailyTask_" + openType + "Tip");
                        App.CommonUtil.showTip(lockedStr ? lockedStr : LanguageManager.getlocal("sysWaitOpen"));
                        return;
                    }
                }
                if (egret.getDefinitionByName(viewName + "View")) {
                    var aid = '';
                    var isActy = false;
                    switch (openType) {
                        case "acRankActive":
                            aid = "rankActive";
                            isActy = true;
                            break;
                        default:
                            break;
                    }
                    if (openType == 'alliance') {
                        var allid = Api.playerVoApi.getPlayerAllianceId();
                        if (!allid || allid <= 0) {
                            str = "AllianceCreateView";
                        }
                    }
                    else {
                        str = viewName + "View";
                    }
                    if (isActy) {
                        if (!Api.acVoApi.checkActivityStartByAid(aid)) {
                            App.CommonUtil.showTip(LanguageManager.getlocal("battlepassquesttip1"));
                            return;
                        }
                        else {
                            str = "RankActiveView";
                        }
                    }
                }
                else if (egret.getDefinitionByName(viewName + "PopupView")) { //可以跳转
                    str = viewName + "PopupView";
                }
                else {
                    if (openType == "recharge") {
                        str = viewName + "VipView";
                    }
                }
                if (openTypeTab && Number(openTypeTab)) {
                    str += "|" + openTypeTab;
                }
                ViewController.getInstance().openView(str);
            }
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
        *
        *prev  资源前缀 分隔符"-"以前的字符串
        *iscross 是否是跨服
        */
        CommonUtil.getCrossLeagueRes = function (prev, iscross) {
            var resname = "" + prev + (iscross ? "_multicross" : "");
            if (!RES.hasRes(resname)) {
                //返回默认code资源
                resname = "" + prev;
            }
            return resname;
        };
        /*
    *
    *prev  资源前缀 分隔符"-"以前的字符串
    *iscross 是否是跨服
    */
        CommonUtil.getCrossLeagueCn = function (prev, iscross) {
            var newkey = "" + prev + (iscross ? "_crossleague" : "");
            if (!LanguageManager.checkHasKey(newkey)) {
                //返回默认code的cnkey
                newkey = "" + prev;
            }
            return newkey;
        };
        /*
        *根据code获得cnkey  key严格命名以 必须 xxx-code 结尾 如 xxx-1, xxx-2,xxxx-3
        *prev  key前缀 分隔符"-"以前的字符串
        *code 传入code
        */
        CommonUtil.getCnByCode = function (prev, code, defaultcode) {
            if (defaultcode === void 0) { defaultcode = "1"; }
            var newkey = prev + "-" + code;
            if (!LanguageManager.checkHasKey(newkey)) {
                //返回默认code的cnkey
                newkey = prev + "-" + defaultcode;
                if (!LanguageManager.checkHasKey(newkey)) {
                    newkey = prev + "-1";
                    if (!LanguageManager.checkHasKey(newkey)) {
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
         * 获取门客衣装标签  type  门客皮肤标签  1：无标签 2：王爷标签 3：帝王标签 4：流芳百世  5：名传千古  6：独断万载    7：元宵（活动专属） 8：春季专属 9：泼水节专属
         */
        CommonUtil.getServantSkinFlagById = function (skinId) {
            if (!skinId) {
                return null;
            }
            var skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
            var bgName = "";
            if (skinCfg && skinCfg.type != 1) {
                bgName = "servant_skin_title_" + skinCfg.type;
                if (ResourceManager.hasRes(bgName)) {
                    var container = new BaseDisplayObjectContainer();
                    container.width = 162;
                    container.height = 62;
                    var flag = BaseLoadBitmap.create(bgName);
                    flag.width = 162;
                    flag.height = 62;
                    container.addChild(flag);
                    var titleEffStr = "servant_skin_titleeffect" + skinCfg.type;
                    if (ResourceManager.hasRes(titleEffStr)) {
                        var frames_1 = 10;
                        var effW = 280;
                        var effH = 103;
                        if (skinCfg.type == 2) { // 147 64
                            frames_1 = 13;
                            effW = 147;
                            effH = 64;
                        }
                        else if (skinCfg.type == 3) {
                            frames_1 = 16; // 167, 65
                            effW = 167;
                            effH = 65;
                        }
                        else if (skinCfg.type == 13) {
                            frames_1 = 15; // 167, 65
                            effW = 250;
                            effH = 200;
                        }
                        var titleEffect = ComponentManager.getCustomMovieClip(titleEffStr + "_", frames_1, 70);
                        titleEffect.setPosition(flag.x + flag.width / 2 - effW / 2, flag.y + flag.height / 2 - effH / 2);
                        titleEffect.playWithTime(0);
                        container.addChild(titleEffect);
                        titleEffect.blendMode = egret.BlendMode.ADD;
                    }
                    return container;
                }
            }
            return null;
        };
        /**
         * 获取红颜衣装标签 type  红颜标签  1：无标签 2：初级标签 3：中级标签 4：高级标签  8：春季专属 9：泼水节专属
         */
        CommonUtil.getWifeSkinFlagById = function (skinId) {
            if (!skinId) {
                return null;
            }
            var skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
            var bgName = "";
            if (skinCfg && skinCfg.type != 1) {
                bgName = "wife_skin_title" + skinCfg.type;
                if (ResourceManager.hasRes(bgName)) {
                    var container = new BaseDisplayObjectContainer();
                    container.width = 162;
                    container.height = 62;
                    var flag = BaseLoadBitmap.create(bgName);
                    flag.width = 162;
                    flag.height = 62;
                    container.addChild(flag);
                    var titleEffStr = "wifeskin_titleeff" + skinCfg.type;
                    if (ResourceManager.hasRes(titleEffStr)) {
                        var frames_2 = 10;
                        var effW = 280;
                        var effH = 103;
                        if (skinCfg.type == 2) { // 147 64
                            effW = 280;
                            effH = 107;
                        }
                        else if (skinCfg.type == 3) {
                            effW = 250;
                            effH = 96;
                        }
                        else if (skinCfg.type == 4) {
                            effW = 280;
                            effH = 103;
                        }
                        else if (skinCfg.type == 13) {
                            frames_2 = 15;
                            effW = 250;
                            effH = 200;
                        }
                        var titleEffect = ComponentManager.getCustomMovieClip(titleEffStr + "_", frames_2, 70);
                        titleEffect.setPosition(flag.x + flag.width / 2 - effW / 2, flag.y + flag.height / 2 - effH / 2);
                        titleEffect.playWithTime(0);
                        container.addChild(titleEffect);
                        titleEffect.blendMode = egret.BlendMode.ADD;
                    }
                    return container;
                }
            }
            return null;
        };
        /**
         * 门客衣装光环
         */
        CommonUtil.getServantSkinAuraById = function (skinId) {
            if (!skinId) {
                return null;
            }
            var skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
            if (skinCfg && skinCfg.specialAuraCfg) {
                var auraId = skinCfg.specialAuraCfg.auraIcon;
                var iconImg = "servant_aura_Icon" + auraId;
                if (ResourceManager.hasRes(iconImg)) {
                    var container = new BaseDisplayObjectContainer();
                    container.width = 107;
                    container.height = 106;
                    var auraIcon = BaseLoadBitmap.create(iconImg);
                    container.addChild(auraIcon);
                    auraIcon.width = 107;
                    auraIcon.height = 106;
                    var effect = ComponentManager.getCustomMovieClip("acskyarmor_titleeff", 10, 150);
                    effect.width = 257;
                    effect.height = 257;
                    effect.x = container.width / 2 - effect.width / 2;
                    effect.y = container.height / 2 - effect.height / 2;
                    effect.playWithTime(-1);
                    container.addChild(effect);
                    effect.blendMode = egret.BlendMode.ADD;
                    if (ResourceManager.hasRes("servant_aura_attrbg" + auraId)) {
                        var attrBg = BaseLoadBitmap.create("servant_aura_attrbg" + auraId);
                        attrBg.width = 98;
                        attrBg.height = 59;
                        attrBg.setPosition(auraIcon.x + auraIcon.width / 2 - attrBg.width / 2, auraIcon.y + auraIcon.height + 3);
                        container.addChild(attrBg);
                    }
                    container.addTouchTap(function () {
                        ViewController.getInstance().openView(ViewConst.POPUP.SKINAURAINFOPOPUPVIEW, skinId);
                    }, this);
                    return container;
                }
            }
            return null;
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
            4026: 10,
            4044: 10
        };
        return CommonUtil;
    }());
    App.CommonUtil = CommonUtil;
})(App || (App = {}));
//# sourceMappingURL=CommonUtil.js.map