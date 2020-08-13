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
        _this._txtCountainer = null;
        /**
         * 是否拥有这个红颜
         */
        _this._isHaveWife = false;
        _this._isHaveSerSkin = false;
        /**是否拥有了这个门客 */
        _this._isHavehero = [];
        _this._strTotch = "";
        return _this;
    }
    MailDetailPopupView.prototype.initView = function () {
        this._txtCountainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._txtCountainer);
        // this._txtCountainer.x =30;
        // this._txtCountainer.width =640;
        var title = BaseBitmap.create("maildetail_title");
        title.x = GameConfig.stageWidth / 2 - title.width / 2;
        title.y = this.viewBg.y - 60 + 68;
        this.addChildToContainer(title);
        this._mailInfoVo = Api.mailVoApi.getMailInfoVoById(this.param.data.mid);
        this._index = Number(this.param.data.index);
        var temX = this.viewBg.x + 85;
        // let bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
        // bg.width = 520;
        // bg.height = 600;
        // bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
        // bg.y = 10;
        // this.addChildToContainer(bg);
        // this._bg = bg;
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("title") + "：" + this._mailInfoVo.title, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        titleTF.x = temX;
        titleTF.y = this.viewBg.y - 60 + 134;
        this.addChildToContainer(titleTF);
        var timeTF = ComponentManager.getTextField(LanguageManager.getlocal("time") + "：" + this._mailInfoVo.timeStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        timeTF.x = temX;
        timeTF.y = titleTF.y + titleTF.height + 5;
        this.addChildToContainer(timeTF);
        var temH = 410;
        var touch = this._mailInfoVo.touch;
        var contentH = 490;
        // if(touch == "")
        // {
        // 	bg.height = 660;
        // 	temH = 508 + 60;
        // }
        // let bg2:BaseBitmap = BaseBitmap.create("public_tc_bg03");
        // bg2.width = 496;
        // bg2.height = temH;
        // bg2.x = this.viewBg.x + this.viewBg.width/2 - bg2.width/2;
        // bg2.y = timeTF.y + timeTF.height + 10;
        // this.addChildToContainer(bg2);
        var contentTF;
        var scrollRect;
        if (this._mailInfoVo.content) {
            // let xtCountainer=new BaseDisplayObjectContainer();
            // xtCountainer.height=bg2.height
            contentTF = ComponentManager.getTextField("\n" + this._mailInfoVo.content, TextFieldConst.FONTSIZE_CONTENT_SMALL - 2, TextFieldConst.COLOR_BROWN_NEW);
            contentTF.x = 0;
            contentTF.y = -15;
            contentTF.width = 480;
            contentTF.lineSpacing = 5;
            contentTF.cacheAsBitmap = true;
            contentTF.touchEnabled = true;
            this._txtCountainer.addChild(contentTF);
            this._txtCountainer.addChild(contentTF);
            scrollRect = new egret.Rectangle(0, 0, 480, contentH);
            var scrollView = ComponentManager.getScrollView(this._txtCountainer, scrollRect);
            scrollView.x = this.viewBg.width / 2 - scrollView.width / 2;
            scrollView.y = timeTF.y + timeTF.height + 15; //100;//250;
            this.addChildToContainer(scrollView);
            // scrollView.height =bg2.height-30; 
        }
        if (touch != "") {
            var rewardVoList = GameData.formatRewardItem(this._mailInfoVo.touch);
            this._rewardItemVoList = GameData.formatRewardItem(this._mailInfoVo.touch);
            for (var i = 0; i < this._rewardItemVoList.length; i++) {
                var rewardItemvo = this._rewardItemVoList[i];
                if (Api.servantVoApi.getServantObj(String(rewardItemvo.id)) != null) {
                    this._isHavehero.push(true);
                }
                else {
                    this._isHavehero.push(false);
                }
                if (Api.wifeVoApi.getWifeInfoVoById(String(rewardItemvo.id)) != null) {
                    this._isHaveWife = true;
                }
                if (Api.servantVoApi.isOwnSkinOfSkinId(String(rewardItemvo.id)) == true) {
                    this._isHaveSerSkin = true;
                }
            }
            // let rewardVoList:Array<RewardItemVo> = GameData.formatRewardItem(this._mailInfoVo.touch);
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAIL_GET_REWARDS), this.useCallback, this);
            var rewardBg = BaseBitmap.create("maildetail_rewardbg");
            rewardBg.height = 100;
            var rect = egret.Rectangle.create();
            if (rewardVoList.length > 5) {
                rewardBg.height += 100;
                if (scrollView) {
                    scrollView.height = contentH - rewardBg.height - 10; //bg2.height-30; 
                }
                // if(contentTF)
                // {
                // 	let scrollRect:egret.Rectangle = new egret.Rectangle(contentTF.x,contentTF.y,contentTF.width,bg2.height - 20);
                // 	contentTF.scrollRect = scrollRect;
                // }
                rect.setTo(0, 0, rewardBg.width - 30, 200);
            }
            else {
                rect.setTo(0, 0, rewardBg.width - 30, 100);
                if (scrollView) {
                    scrollView.height = contentH - rewardBg.height - 10; //bg2.height-30; 
                }
            }
            rewardBg.x = this.viewBg.width / 2 - rewardBg.width / 2;
            rewardBg.y = this.viewBg.y - 60 + 700 - rewardBg.height;
            this.addChildToContainer(rewardBg);
            var scrollListContainer = new BaseDisplayObjectContainer();
            scrollListContainer.width = rect.width;
            scrollListContainer.height = rect.height;
            scrollListContainer.x = rewardBg.x + rewardBg.width / 2 - scrollListContainer.width / 2; //bg2.x + 2;
            scrollListContainer.y = rewardBg.y + rewardBg.height / 2 - scrollListContainer.height / 2;
            this.addChildToContainer(scrollListContainer);
            this._scrollList = ComponentManager.getScrollList(MailRewardScrollItem, rewardVoList, rect);
            scrollListContainer.addChild(this._scrollList);
            scrollListContainer.x = this.viewBg.width / 2 - scrollListContainer.width / 2 + 6;
            this._scrollList.y = 3;
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
                var hasGetSp = BaseBitmap.create("achievement_state3");
                // hasGetSp.setScale(0.6);
                hasGetSp.x = this.width / 2 - hasGetSp.width / 2 * 0.6 - 20;
                hasGetSp.y = this.viewBg.y - 60 + 710 + 50; //GameConfig.stageHeigth/2 + this.getShowHeight()/2 - hasGetSp.height*0.6 - 64;
                this.addChild(hasGetSp);
            }
        }
        this.closeBtn.x = this.viewBg.x + 500;
        this.closeBtn.y = this.viewBg.y + 66;
        var item = BaseBitmap.create("maildetail_item");
        item.x = GameConfig.stageWidth - item.width;
        item.y = this.viewBg.y - 60 + 690;
        this.addChildToContainer(item);
    };
    MailDetailPopupView.prototype.isShowOpenAni = function () {
        return false;
    };
    MailDetailPopupView.prototype.clickConfirmHandler = function (data) {
        NetManager.request(NetRequestConst.REQUEST_MAIL_GET_REWARDS, { "mailId": this.param.data.mid });
    };
    MailDetailPopupView.prototype.initBg = function () {
        this.viewBg = BaseLoadBitmap.create("maildetail_bg");
        this.viewBg.width = 640;
        this.viewBg.height = 844;
        this.viewBg.x = GameConfig.stageWidth / 2 - this.viewBg.width / 2;
        this.viewBg.y = GameConfig.stageHeigth / 2 - this.viewBg.height / 2;
        // this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2,GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    MailDetailPopupView.prototype.getTitleBgName = function () {
        return null;
    };
    MailDetailPopupView.prototype.getCloseBtnName = function () {
        return "btn_win_closebtn";
    };
    MailDetailPopupView.prototype.getTitleStr = function () {
        return null;
    };
    MailDetailPopupView.prototype.getConfirmBtnName = function () {
        return ButtonConst.BTN_NORMAL_YELLOW;
    };
    MailDetailPopupView.prototype.resetBgSize = function () {
        // super.resetBgSize();
        this.setConfirmBtnPosition(GameConfig.stageWidth / 2 - 187 / 2, this.viewBg.y - 60 + 710);
    };
    MailDetailPopupView.prototype.getConfirmBtnStr = function () {
        if (this._mailInfoVo.istouch == 1) {
            if (this._mailInfoVo.hadget == 0) {
                return "taskCollect";
            }
        }
        return "";
    };
    MailDetailPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "maildetail_item",
            "maildetail_rewardbg",
            "achievement_state3",
            "maildetail_title"
        ]);
    };
    ;
    MailDetailPopupView.prototype.useCallback = function (event) {
        this._mailInfoVo = Api.mailVoApi.getMailInfoVoById(this.param.data.mid);
        this.openRewardView();
        if (this._mailInfoVo && this._mailInfoVo.hadget == 1) {
            this.playGetRewardAni();
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGE_IMG);
    };
    MailDetailPopupView.prototype.openRewardView = function () {
        var touch = null;
        var servantName = "";
        var servantList = [];
        var rewardsArr = this._mailInfoVo.touch.split("|");
        var touchNum = 0;
        var wifeTouch = null;
        var wifeName = null;
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
            if (this._rewardItemVoList[i].type == 19 && this._isHaveSerSkin) {
                var rewardItemvo = this._rewardItemVoList[i];
                var skincfg = Config.ServantskinCfg.getServantSkinItemById(rewardItemvo.id);
                if (skincfg.exchange != null) {
                    wifeName = skincfg.getSkinName();
                    wifeTouch = skincfg.exchange;
                    rewardsArr[i] = skincfg.exchange;
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
        if (servantList.length > 0 || wifeName) {
            if (touch) {
                if (wifeName) {
                    alltouch = touch + "|" + wifeTouch;
                    allName = servantName + wifeName;
                }
                else {
                    alltouch = touch;
                    allName = servantName.substring(0, servantName.length - 1);
                }
            }
            else {
                alltouch = wifeTouch;
                allName = wifeName;
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
            this._collectFlag = BaseBitmap.create("achievement_state3"); //achievement_state3
            this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
            this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
            this._collectFlag.x = this.width / 2;
            // this._collectFlag.y = pt.y + this._bg.height + 105 - 63;
            // this._collectFlag.y = GameConfig.stageHeigth/2 + this.getShowHeight()/2 - this._collectFlag.height*0.6*0.5 - 45;
            this._collectFlag.x = this.width / 2 - this._collectFlag.width / 2 * 0.6 - 20 + this._collectFlag.width / 2;
            this._collectFlag.y = this.viewBg.y - 60 + 710 + 50 + this._collectFlag.height / 2;
            this.addChild(this._collectFlag);
        }
        this._collectFlag.setScale(1.4);
        egret.Tween.get(this._collectFlag, { loop: false }).to({ scaleX: 1, scaleY: 1 }, 400).wait(600);
        var rewardVoList = GameData.formatRewardItem(this._mailInfoVo.touch);
        if (rewardVoList) {
            // this._scrollList.refreshData(rewardVoList);
            var runPos = new egret.Point(this._collectFlag.x, this._collectFlag.y - 40);
            App.CommonUtil.playRewardFlyAction(rewardVoList, runPos);
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_MAIL_REFRESH, null);
    };
    MailDetailPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAIL_GET_DETAIL), this.useCallback, this);
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
        this._isHaveSerSkin = false;
        _super.prototype.dispose.call(this);
    };
    return MailDetailPopupView;
}(PopupView));
__reflect(MailDetailPopupView.prototype, "MailDetailPopupView");
