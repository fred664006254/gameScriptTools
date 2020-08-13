var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 邮件详情弹板
 * author dmj
 * date 2017/11/1
 * @class MailDetailPopupView
 */
var MailDetailPopupView = (function (_super) {
    __extends(MailDetailPopupView, _super);
    function MailDetailPopupView() {
        var _this = _super.call(this) || this;
        // 领取按钮
        _this._collectFlag = null;
        _this._index = 0;
        // private _contentTF:BaseTextField = null;
        _this._txtCountainer = null;
        /**是否拥有了这个门客 */
        _this._isHavehero = [];
        /**
         * 是否拥有这个红颜
         */
        _this._isHaveWife = false;
        /**是否有红颜皮肤 */
        _this._isNotHaveWifeSkin = [];
        /**是否有门客皮肤 */
        _this._isHaveServantSkin = false;
        /**是否有这个称号 */
        _this._isHaveTitle = false;
        /**是否有这个表情 */
        _this._isHaveEmoticon = [];
        _this._isHasScence = false;
        _this._strTotch = "";
        return _this;
    }
    MailDetailPopupView.prototype.initView = function () {
        this._txtCountainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._txtCountainer);
        this._mailInfoVo = Api.mailVoApi.getMailInfoVoById(this.param.data.mid);
        this._index = Number(this.param.data.index);
        var temX = 40;
        var bg = BaseBitmap.create("public_9_bg93");
        bg.width = 520;
        bg.height = 600;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 10;
        this.addChildToContainer(bg);
        this._bg = bg;
        var titleBg = BaseBitmap.create("public_9_bg95");
        this.addChildToContainer(titleBg);
        // let titleTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("title")+"："+this._mailInfoVo.title,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        var titleTF = ComponentManager.getTextField(this._mailInfoVo.title, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        // titleTF.x = temX;
        // titleTF.y = 30;
        titleBg.width = titleTF.width + 60;
        titleBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - titleBg.width / 2, bg.y + 10);
        titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2 + 2);
        this.addChildToContainer(titleTF);
        var timeTitle = ComponentManager.getTextField(LanguageManager.getlocal("time") + "：", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        timeTitle.x = bg.x + 20;
        timeTitle.y = 65;
        this.addChildToContainer(timeTitle);
        var timeTF = ComponentManager.getTextField(this._mailInfoVo.timeStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x635346);
        timeTF.x = timeTitle.x + timeTitle.width;
        timeTF.y = timeTitle.y;
        this.addChildToContainer(timeTF);
        var temH = 410;
        var touch = this._mailInfoVo.touch;
        if (touch == "") {
            bg.height = 660;
            temH = 508 + 60;
        }
        var bg2 = BaseBitmap.create("public_9_bg94");
        bg2.width = 496;
        bg2.height = temH;
        bg2.x = this.viewBg.x + this.viewBg.width / 2 - bg2.width / 2;
        bg2.y = timeTF.y + timeTF.height + 5;
        this.addChildToContainer(bg2);
        var contentTF;
        var scrollView;
        var scrollRect = new egret.Rectangle(0, 0, bg2.width - 20, 390);
        if (this._mailInfoVo.content) {
            contentTF = ComponentManager.getTextField((App.DeviceUtil.isWyw() ? "\n" : "") + this._mailInfoVo.content, TextFieldConst.FONTSIZE_CONTENT_SMALL - 2, 0x635346);
            contentTF.x = 0;
            contentTF.y = App.DeviceUtil.isWyw() ? -13 : 8;
            contentTF.width = bg2.width - 20;
            contentTF.lineSpacing = 5;
            contentTF.cacheAsBitmap = true;
            contentTF.touchEnabled = true;
            // this.addChildToContainer(contentTF);
            this._txtCountainer.addChild(contentTF);
            // this.addChild(contentTF);
            contentTF.height += 10;
            scrollView = ComponentManager.getScrollView(this._txtCountainer, scrollRect);
            // scrollView.x=50;
            // scrollView.y=100;//250;
            scrollView.x = bg2.x + 10;
            scrollView.y = bg2.y + 7;
            this.addChildToContainer(scrollView);
            // this.addChild(scrollView);
            scrollView.height = temH - 20;
        }
        if (touch != "") {
            var rewardVoList = GameData.formatRewardItem(this._mailInfoVo.touch);
            this._rewardItemVoList = GameData.formatRewardItem(this._mailInfoVo.touch);
            for (var i = 0; i < this._rewardItemVoList.length; i++) {
                var rewardItemvo = this._rewardItemVoList[i];
                if (rewardItemvo.type == 8 && Api.servantVoApi.getServantObj(String(rewardItemvo.id)) != null) {
                    this._isHavehero.push(true);
                }
                else {
                    this._isHavehero.push(false);
                }
                if (rewardItemvo.type == 10 && Api.wifeVoApi.getWifeInfoVoById(String(rewardItemvo.id)) != null) {
                    this._isHaveWife = true;
                }
                if (rewardItemvo.type == 16) {
                    if (Api.wifeSkinVoApi.isOwnSkinOfSkinId(String(rewardItemvo.id))) {
                        this._isNotHaveWifeSkin.push(0);
                    }
                    else {
                        var nid = Number(rewardItemvo.id);
                        if (GameData.isInArray(nid, this._isNotHaveWifeSkin)) {
                            this._isNotHaveWifeSkin.push(0);
                        }
                        else {
                            this._isNotHaveWifeSkin.push(nid);
                        }
                    }
                }
                else {
                    this._isNotHaveWifeSkin.push(1);
                }
                if (rewardItemvo.type == 19 && Api.servantVoApi.isOwnSkinOfSkinId(String(rewardItemvo.id))) {
                    this._isHaveServantSkin = true;
                }
                if (rewardItemvo.type == 11 && Api.itemVoApi.isHasTitle(rewardItemvo.id)) {
                    this._isHaveTitle = true;
                }
                if (rewardItemvo.type == 20) {
                    var senceid = String(rewardItemvo.id);
                    var sceneName = null;
                    if (senceid[0] == "1") {
                        sceneName = "homeScene";
                    }
                    else if (senceid[0] == "2") {
                        sceneName = "cityScene";
                    }
                    else if (senceid[0] == "3") {
                        sceneName = "searchScene";
                    }
                    if (Api.otherInfoVoApi.isHasSceneNotAboutUnlock(senceid, sceneName)) {
                        this._isHasScence = true;
                    }
                }
                if (rewardItemvo.type == 24 && Api.emoticonVoApi.isEmoticonUnlock(String(rewardItemvo.id))) {
                    this._isHaveEmoticon.push(true);
                }
                else {
                    this._isHaveEmoticon.push(false);
                }
            }
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAIL_GET_REWARDS), this.useCallback, this);
            var rect = egret.Rectangle.create();
            if (rewardVoList.length > 5) {
                bg2.height -= 100;
                // if(contentTF)
                // {
                // 	let scrollRect:egret.Rectangle = new egret.Rectangle(contentTF.x,contentTF.y,contentTF.width,bg2.height - 20);
                // 	contentTF.scrollRect = scrollRect;
                // }
                rect.setTo(0, 0, bg2.width, 200);
                if (scrollView) {
                    scrollView.height -= 100;
                }
            }
            else {
                rect.setTo(0, 0, bg2.width, 110);
            }
            var scrollListContainer = new BaseDisplayObjectContainer();
            scrollListContainer.width = rect.width;
            scrollListContainer.height = rect.height;
            scrollListContainer.x = bg2.x + 2;
            scrollListContainer.y = bg2.y + bg2.height + 5;
            this.addChildToContainer(scrollListContainer);
            this._scrollList = ComponentManager.getScrollList(MailRewardScrollItem, rewardVoList, rect);
            scrollListContainer.addChild(this._scrollList);
        }
        if (this._mailInfoVo.istouch == 1) {
            if (this._mailInfoVo.hadget == 0) {
                // this._getBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"taskCollect",this.getRewardHanlder,this)
                // this._getBtn.x = this.viewBg.x + this.viewBg.width/2 - this._getBtn.width/2;
                // this._getBtn.y = bg.x + bg.height - this._getBtn.height - 20;
                // this.addChildToContainer(this._getBtn);
            }
            else {
                // let pt = this.container.localToGlobal(this._bg.x,this._bg.y);
                var hasGetSp = BaseBitmap.create("collectflag");
                hasGetSp.setScale(0.6);
                hasGetSp.x = this.width / 2 - hasGetSp.width / 2 * 0.6;
                hasGetSp.y = GameConfig.stageHeigth / 2 + this.getShowHeight() / 2 - hasGetSp.height * 0.6 - 10;
                this.addChild(hasGetSp);
            }
        }
    };
    MailDetailPopupView.prototype.getBgName = function () {
        return "popupview_bg3";
    };
    MailDetailPopupView.prototype.getCloseBtnName = function () {
        return "popupview_closebtn2";
    };
    MailDetailPopupView.prototype.clickConfirmHandler = function (data) {
        NetManager.request(NetRequestConst.REQUEST_MAIL_GET_REWARDS, { "mailId": this.param.data.mid });
    };
    MailDetailPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width / 2 - 84, this._bg.y + this._bg.height + 5);
    };
    MailDetailPopupView.prototype.getShowHeight = function () {
        return 760;
    };
    MailDetailPopupView.prototype.getBgExtraHeight = function () {
        if (this._mailInfoVo.touch == "") {
            return 30;
        }
        return 86;
    };
    MailDetailPopupView.prototype.getConfirmBtnName = function () {
        return ButtonConst.BTN2_NORMAL_YELLOW;
    };
    MailDetailPopupView.prototype.getConfirmBtnStr = function () {
        if (this._mailInfoVo.istouch == 1) {
            if (this._mailInfoVo.hadget == 0) {
                return "taskCollect";
            }
        }
        return "";
    };
    MailDetailPopupView.prototype.useCallback = function (event) {
        var rData = event.data;
        if (!rData.ret) {
            return;
        }
        this._mailInfoVo = Api.mailVoApi.getMailInfoVoById(this.param.data.mid);
        this.openRewardView();
        if (this._mailInfoVo && this._mailInfoVo.hadget == 1) {
            this.playGetRewardAni();
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGE_IMG);
        if (rData.data.data.rewards) {
            Api.biographyVoApi.checkShowBiographyRewars(rData.data.data.rewards);
        }
    };
    MailDetailPopupView.prototype.openRewardView = function () {
        var touch = null;
        var servantName = "";
        var servantList = [];
        var rewardsArr = this._mailInfoVo.touch.split("|");
        var touchNum = 0;
        var wifeTouch = null;
        var wifeName = null;
        var wifeSkinTouch = null;
        var wifeSkinName = null;
        var wifeSkinList = [];
        var wifeSkinTouchNum = 0;
        var servantSkinTouch = null;
        var servantSkinName = null;
        var titleTouch = null;
        var titleName = null;
        var sceneTouch = null;
        var sceneName = null;
        var emoticonName = null;
        var emoticonTouch = null;
        var emoticonTouchNum = 0;
        var emoticonList = [];
        this._strTotch = "";
        for (var i = 0; i < this._rewardItemVoList.length; i++) {
            if (this._rewardItemVoList[i].type == 8 && this._isHavehero[i]) {
                var rewardItemvo = this._rewardItemVoList[i];
                var servantReward = Config.ServantCfg.getServantItemById(rewardItemvo.id);
                if (servantReward.exchange != null) {
                    servantName = servantName + servantReward.name + ",";
                    servantList.push(servantReward.id);
                    touch = servantReward.exchange;
                    var rewardsVo = GameData.formatRewardItem(servantReward.exchange)[0];
                    touchNum += rewardsVo.num;
                    // rewardsArr[i] = servantReward.exchange;
                    rewardsArr[i] = servantReward.exchange;
                }
            }
            if (this._rewardItemVoList[i].type == 10 && this._isHaveWife) {
                var rewardItemvo = this._rewardItemVoList[i];
                var wife = Config.WifeCfg.getWifeCfgById(rewardItemvo.id);
                if (wife.exchange != null) {
                    wifeName = wife.name;
                    wifeTouch = wife.exchange;
                    rewardsArr[i] = wife.exchange;
                }
            }
            if (this._rewardItemVoList[i].type == 16 && !this._isNotHaveWifeSkin[i]) {
                var rewardItemvo = this._rewardItemVoList[i];
                var wifeSkin = Config.WifeskinCfg.getWifeCfgById(rewardItemvo.id);
                if (wifeSkin.itemNum != null) {
                    if (wifeSkinName && wifeSkinName.indexOf(wifeSkin.name) < 0) {
                        wifeSkinName = wifeSkinName + wifeSkin.name + ",";
                    }
                    else {
                        wifeSkinName = wifeSkin.name + ",";
                    }
                    wifeSkinList.push(wifeSkin.id);
                    var exchange = wifeSkin.exchange;
                    var rewardsVo = GameData.formatRewardItem(exchange)[0];
                    wifeSkinTouchNum += rewardsVo.num;
                    wifeSkinTouch = exchange; //"6_2101_" + wifeSkin.itemNum;
                    rewardsArr[i] = exchange; //"6_2101_" + wifeSkin.itemNum;
                }
            }
            if (this._rewardItemVoList[i].type == 19 && this._isHaveServantSkin) {
                var rewardItemvo = this._rewardItemVoList[i];
                var servantSkin = Config.ServantskinCfg.getServantSkinItemById(String(rewardItemvo.id));
                if (servantSkin.returnItem != null) {
                    servantSkinName = servantSkin.getSkinName();
                    servantSkinTouch = servantSkin.returnItem;
                    rewardsArr[i] = servantSkin.returnItem;
                }
            }
            if (this._rewardItemVoList[i].type == 11 && this._isHaveTitle) {
                var rewardItemvo = this._rewardItemVoList[i];
                var titelCfg = Config.TitleCfg.getTitleCfgById(rewardItemvo.id);
                if (titelCfg.exchange != null) {
                    titleName = titelCfg.name;
                    titleTouch = titelCfg.exchange;
                    rewardsArr[i] = titelCfg.exchange;
                }
            }
            if (this._rewardItemVoList[i].type == 20 && this._isHasScence) {
                var rewardItemvo = this._rewardItemVoList[i];
                var senceid = String(rewardItemvo.id);
                var sceneType = null;
                if (senceid[0] == "1") {
                    sceneType = "homeScene";
                }
                else if (senceid[0] == "2") {
                    sceneType = "cityScene";
                }
                else if (senceid[0] == "3") {
                    sceneType = "searchScene";
                }
                var sceneCfg = Config.SceneCfg.getSceneCfgBySceneName(sceneType, senceid).personalityCfg;
                if (sceneCfg.exchange) {
                    sceneTouch = sceneCfg.exchange;
                    sceneName = LanguageManager.getlocal("changebg_name_" + senceid);
                    rewardsArr[i] = sceneCfg.exchange;
                }
            }
            if (this._rewardItemVoList[i].type == 24 && this._isHaveEmoticon[i]) {
                var rewardItemvo = this._rewardItemVoList[i];
                var emoticonCfg = Config.EmoticonCfg.getEmoticonCfgById(String(rewardItemvo.id));
                if (emoticonCfg.exchange != null) {
                    emoticonList.push(String(rewardItemvo.id));
                    emoticonName = LanguageManager.getlocal("emoticonName");
                    emoticonTouch = emoticonCfg.exchange;
                    rewardsArr[i] = emoticonCfg.exchange;
                    var rewardsVo = GameData.formatRewardItem(emoticonCfg.exchange)[0];
                    emoticonTouchNum += (rewardsVo.num * rewardItemvo.num);
                }
            }
            // if(rewardsArr[i] != "")
            this._strTotch = this._strTotch + rewardsArr[i] + "|";
        }
        var allName = null;
        var alltouch = null;
        if (servantList.length > 0) {
            // touch = touch.substr(0,7) + String(servantList.length * 10);
            touch = touch.substr(0, 7) + String(touchNum);
            // ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD,{"name":servantName.substring(0,servantName.length - 1),"touch":touch,"message":"servantChangeOtherRewardTip"})
            // this._mailInfoVo.touch = touch;
            // this._strTotch = this._strTotch + touch;
        }
        if (wifeSkinList.length > 0) {
            wifeSkinTouch = wifeSkinTouch.substr(0, wifeSkinTouch.length - 1) + String(wifeSkinTouchNum);
            wifeSkinName = wifeSkinName.substr(0, wifeSkinName.length - 1);
        }
        if (emoticonList.length > 0) {
            emoticonTouch = emoticonTouch.substr(0, emoticonTouch.length - 1) + String(emoticonTouchNum);
            if (emoticonList.length == 1) {
                emoticonName = LanguageManager.getlocal("emoticonName_" + emoticonList[0]);
            }
        }
        if (servantList.length > 0 || wifeName || wifeSkinName || servantSkinName || titleName || sceneName || emoticonName) {
            if (touch) {
                if (wifeName) {
                    alltouch = touch + "|" + wifeTouch;
                    allName = servantName + wifeName;
                    if (wifeSkinName) {
                        allName += "," + wifeSkinName;
                        alltouch += "|" + wifeSkinTouch;
                    }
                    if (servantSkinName) {
                        allName += "," + servantSkinName;
                        alltouch += "|" + servantSkinTouch;
                    }
                    if (titleName) {
                        allName += "," + titleName;
                        alltouch += "|" + titleTouch;
                    }
                    if (sceneName) {
                        allName += "," + sceneName;
                        alltouch += "|" + sceneTouch;
                    }
                    if (emoticonName) {
                        allName += "," + emoticonName;
                        alltouch += "|" + emoticonTouch;
                    }
                }
                else {
                    alltouch = touch;
                    allName = servantName.substring(0, servantName.length - 1);
                    if (wifeSkinName) {
                        allName += "," + wifeSkinName;
                        alltouch += "|" + wifeSkinTouch;
                    }
                    if (servantSkinName) {
                        allName += "," + servantSkinName;
                        alltouch += "|" + servantSkinTouch;
                    }
                    if (titleName) {
                        allName += "," + titleName;
                        alltouch += "|" + titleTouch;
                    }
                    if (sceneName) {
                        allName += "," + sceneName;
                        alltouch += "|" + sceneTouch;
                    }
                    if (emoticonName) {
                        allName += "," + emoticonName;
                        alltouch += "|" + emoticonTouch;
                    }
                }
            }
            else {
                if (wifeName) {
                    alltouch = wifeTouch;
                    allName = wifeName;
                    if (wifeSkinName) {
                        allName += "," + wifeSkinName;
                        alltouch += "|" + wifeSkinTouch;
                    }
                    if (servantSkinName) {
                        allName += "," + servantSkinName;
                        alltouch += "|" + servantSkinTouch;
                    }
                    if (titleName) {
                        allName += "," + titleName;
                        alltouch += "|" + titleTouch;
                    }
                    if (sceneName) {
                        allName += "," + sceneName;
                        alltouch += "|" + sceneTouch;
                    }
                    if (emoticonName) {
                        allName += "," + emoticonName;
                        alltouch += "|" + emoticonTouch;
                    }
                }
                else {
                    if (wifeSkinName) {
                        allName = wifeSkinName;
                        alltouch = wifeSkinTouch;
                        if (servantSkinName) {
                            allName += "," + servantSkinName;
                            alltouch += "|" + servantSkinTouch;
                        }
                        if (titleName) {
                            allName += "," + titleName;
                            alltouch += "|" + titleTouch;
                        }
                        if (sceneName) {
                            allName += "," + sceneName;
                            alltouch += "|" + sceneTouch;
                        }
                        if (emoticonName) {
                            allName += "," + emoticonName;
                            alltouch += "|" + emoticonTouch;
                        }
                    }
                    else {
                        if (servantSkinName) {
                            allName = servantSkinName;
                            alltouch = servantSkinTouch;
                            if (titleName) {
                                allName += "," + titleName;
                                alltouch += "|" + titleTouch;
                            }
                            if (emoticonName) {
                                allName += "," + emoticonName;
                                alltouch += "|" + emoticonTouch;
                            }
                        }
                        else {
                            if (titleName) {
                                allName = titleName;
                                alltouch = titleTouch;
                                if (sceneName) {
                                    allName += "," + sceneName;
                                    alltouch += "|" + sceneTouch;
                                }
                                if (emoticonName) {
                                    allName += "," + emoticonName;
                                    alltouch += "|" + emoticonTouch;
                                }
                            }
                            else {
                                if (sceneName) {
                                    allName = sceneName;
                                    alltouch = sceneTouch;
                                    if (emoticonName) {
                                        allName += "," + emoticonName;
                                        alltouch += "|" + emoticonTouch;
                                    }
                                }
                                else {
                                    if (emoticonName) {
                                        allName = emoticonName;
                                        alltouch = emoticonTouch;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "name": allName, "touch": alltouch, "message": "changeOtherRewardTip" });
        }
        // else{
        this._strTotch = this._strTotch.substring(0, this._strTotch.length - 1);
        // }
    };
    MailDetailPopupView.prototype.playGetRewardAni = function () {
        this.setConfirmBtnVisible(false);
        if (this._collectFlag == null) {
            // let pt = this.container.localToGlobal(this._bg.x,this._bg.y);
            this._collectFlag = BaseBitmap.create("collectflag");
            this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
            this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
            this._collectFlag.x = this.width / 2;
            // this._collectFlag.y = pt.y + this._bg.height + 105 - 63;
            this._collectFlag.y = GameConfig.stageHeigth / 2 + this.getShowHeight() / 2 - this._collectFlag.height * 0.6 * 0.5 - 10;
            this.addChild(this._collectFlag);
        }
        this._collectFlag.setScale(1.2);
        egret.Tween.get(this._collectFlag, { loop: false }).to({ scaleX: 0.6, scaleY: 0.6 }, 400).wait(600);
        var rewardVoList = GameData.formatRewardItem(this._strTotch);
        if (rewardVoList) {
            // this._scrollList.refreshData(rewardVoList);
            var runPos = new egret.Point(this._collectFlag.x, this._collectFlag.y - 40);
            App.CommonUtil.playRewardFlyAction(rewardVoList, runPos);
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_MAIL_REFRESH, null);
    };
    MailDetailPopupView.prototype.dispose = function () {
        if (this._mailInfoVo.touch == '') {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_MAIL_REFRESH, null);
        }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAIL_GET_REWARDS), this.useCallback, this);
        this._collectFlag = null;
        this._mailInfoVo = null;
        this._bg = null;
        this._scrollList = null;
        this._index = 0;
        this._txtCountainer = null;
        this._isHavehero = [];
        this._rewardItemVoList = null;
        this._strTotch = "";
        this._isHaveWife = false;
        this._isNotHaveWifeSkin.length = 0;
        this._isHaveServantSkin = false;
        this._isHaveTitle = false;
        this._isHasScence = false;
        _super.prototype.dispose.call(this);
    };
    return MailDetailPopupView;
}(PopupView));
__reflect(MailDetailPopupView.prototype, "MailDetailPopupView");
//# sourceMappingURL=MailDetailPopupView.js.map