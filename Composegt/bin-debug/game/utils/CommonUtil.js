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
            var _loop_1 = function (i) {
                var play = function () {
                    var item = list[i];
                    var rewardFly = new RewardFly();
                    var subNode = undefined;
                    if (subNodeList && subNodeList[i]) {
                        subNode = subNodeList[i];
                    }
                    rewardFly.init(item.icon, item.tipMessage, item.type);
                    if (startPoint) {
                        rewardFly.setPosition(startPoint.x, startPoint.y);
                    }
                    else {
                        rewardFly.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2 - 100);
                    }
                    LayerManager.msgLayer.addChild(rewardFly);
                };
                egret.setTimeout(play, this_1, waitTime * i);
            };
            var this_1 = this;
            for (var i = 0; i < list.length; i++) {
                _loop_1(i);
            }
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
                tipBg.width = 634;
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
        CommonUtil.createMainUIIcon = function (iconUrl, iconNameStr, isShow, extType) {
            if (iconNameStr == "share_icon_name" && PlatformManager.checkIsAiweiyouSp() == true) {
                iconNameStr = "share_icon_name_aiweiyou";
            }
            var iconContainer = new BaseDisplayObjectContainer();
            var iconBg = BaseBitmap.create("mainui_bottombtnbg");
            iconContainer.addChild(iconBg);
            iconContainer.width = iconBg.width;
            iconContainer.height = iconBg.height;
            iconContainer.anchorOffsetX = iconBg.width / 2;
            iconContainer.anchorOffsetY = iconBg.height / 2;
            iconContainer.name = iconNameStr;
            if (extType) {
                var iconExtBg_1 = BaseLoadBitmap.create("ac_icon_bg" + extType, null, { callback: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        iconExtBg_1.setPosition(iconBg.x + (iconBg.width - iconExtBg_1.width) / 2, iconBg.y + (iconBg.height - iconExtBg_1.height) / 2);
                        iconContainer.addChildAt(iconExtBg_1, 1);
                    }, callbackThisObj: CommonUtil });
            }
            if (isShow) {
                var iconAni = BaseBitmap.create("mainui_iconani");
                iconAni.anchorOffsetX = iconAni.width / 2;
                iconAni.anchorOffsetY = iconAni.height / 2;
                iconAni.setPosition(iconContainer.width / 2, iconContainer.height / 2);
                iconContainer.addChild(iconAni);
                egret.Tween.get(iconAni, { loop: true })
                    .to({ rotation: 360 }, 1000);
            }
            var icon = BaseLoadBitmap.create(iconUrl);
            iconContainer.addChild(icon);
            var iconName = BaseLoadBitmap.create(iconNameStr, null, { callback: function (container) {
                    if (container) {
                        iconName.setPosition(container.width / 2 - (iconName.width ? iconName.width : 88) / 2, 50);
                        if (iconNameStr == "rechargevip_icon_name") {
                            iconName.setPosition(20, 50);
                        }
                    }
                }, callbackThisObj: this, callbackParams: [iconContainer] });
            iconContainer.addChild(iconName);
            // iocnName.setPosition(-8.5,50);
            //加载完图片重新设置尺寸
            iconContainer.addTouch(function (event, iconContainer) {
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
            }, this, [iconContainer]);
            return iconContainer;
        };
        /**
         * 添加红点提示
         * @param bdoc 父容器
         * @param icon 需要在父容器上添加的图片名字，默认是 public_dot2
         * @param isLeft 父容器上的图片是否是在父容器左上角。默认是在右上角
         */
        CommonUtil.addIconToBDOC = function (bdoc, icon, isLeft, offX, offY) {
            if (bdoc && bdoc.getChildByName("reddot")) {
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
                if (offX) {
                    reddot.x = reddot.x + offX;
                }
                if (offY) {
                    reddot.y = reddot.y + offY;
                }
                // reddot.y = 3;
                bdoc.addChild(reddot);
                reddot.name = "reddot";
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
                // moneyKey = "anyMoneyDollar"; // 韩国ios显示美元
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
         * 判断支持龙骨
         */
        CommonUtil.check_dragon = function () {
            return App.DeviceUtil.CheckWebglRenderMode();
            // return false;
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
            var regName = /^[\u4e00-\u9fa5]{2,6}$/;
            if (!regName.test(name)) {
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
        CommonUtil.setImageColor = function (image, color) {
            // 将16进制颜色分割成rgb值
            var spliceColor = function (color) {
                var result = { r: -1, g: -1, b: -1 };
                result.b = color % 256;
                result.g = Math.floor((color / 256)) % 256;
                result.r = Math.floor((color / 256) / 256);
                return result;
            };
            var result = spliceColor(color);
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            colorMatrix[0] = result.r / 255;
            colorMatrix[6] = result.g / 255;
            colorMatrix[12] = result.b / 255;
            var colorFilter = new egret.ColorMatrixFilter(colorMatrix);
            image.filters = [colorFilter];
        };
        /**
         * 获取通用框体□
         * 请先加载资源:"commonview_border1","commonview_border2","commonview_bottom"
         * @param height - 可选,默认300
         * @param width - 可选,默认屏幕宽度
        */
        CommonUtil.getCommonBorderFrame = function (height, width) {
            var borderContainer = new BaseDisplayObjectContainer();
            var _width = width || GameConfig.stageWidth;
            var _height = height || 300;
            var bottomBorder = BaseBitmap.create("commonview_border1");
            var bottomTop = BaseBitmap.create("commonview_border2");
            var bottomB = BaseBitmap.create("commonview_bottom");
            //侧
            bottomBorder.width = _width;
            bottomBorder.height = _height;
            bottomBorder.x = 0;
            bottomBorder.y = 15;
            borderContainer.addChild(bottomBorder);
            //顶
            bottomTop.width = _width;
            bottomTop.scaleY = -1;
            bottomTop.x = 0;
            bottomTop.y = bottomBorder.y + 25;
            borderContainer.addChild(bottomTop);
            //底
            bottomB.width = _width;
            bottomB.x = 0;
            bottomB.y = _height - bottomB.height + 15;
            borderContainer.addChild(bottomB);
            return borderContainer;
        };
        CommonUtil.clearData = function (data) {
            if (data && typeof data == "object") {
                for (var key in data) {
                    delete data[key];
                }
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
        return CommonUtil;
    }());
    App.CommonUtil = CommonUtil;
    __reflect(CommonUtil.prototype, "App.CommonUtil");
})(App || (App = {}));
