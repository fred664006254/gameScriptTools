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
var MainUITop = (function (_super) {
    __extends(MainUITop, _super);
    function MainUITop(data) {
        var _this = _super.call(this) || this;
        // private headImg:BaseLoadBitmap;
        // private headBg:BaseBitmap;
        _this._headContainer = null;
        _this._isShowName = data ? data.showName : false;
        egret.callLater(_this.show, _this);
        return _this;
    }
    MainUITop.prototype.getResourceList = function () {
        return [
            "mainui_topinfobg",
            "mainui_topresbg"
        ];
    };
    MainUITop.prototype.getParent = function () {
        return null;
    };
    // protected preInit():void
    // {
    // 	this.init();
    // }
    MainUITop.prototype.show = function (data) {
        _super.prototype.show.call(this, data);
    };
    MainUITop.prototype.init = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI, this.refresh, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHANGE_IMG, this.changeImgNotify, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, this.refresh, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_REFRESH_SPECIAL_AVATAR, this.changeImgNotify, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED, this.refreshUpgradeClip, this);
        var curButtomY = 0;
        var isShowTopName = false;
        if (this._isShowName) {
            isShowTopName = true;
            var nameBg = BaseBitmap.create("mainui_topnamebg");
            nameBg.touchEnabled = true;
            this.addChild(nameBg);
            curButtomY = nameBg.y + nameBg.height - 5;
            this._nickNameText = ComponentManager.getTextField("1", 26, TextFieldConst.COLOR_BLACK);
            this._nickNameText.width = 200;
            this._nickNameText.textAlign = egret.HorizontalAlign.CENTER;
            var _a = App.CommonUtil.getCenterPos(nameBg, this._nickNameText, false), x = _a.x, y = _a.y;
            this._nickNameText.setPosition(x, y - 1);
            this._nickNameText.text = Api.playerVoApi.getPlayerName();
            this.addChild(this._nickNameText);
        }
        var topinfobg = BaseBitmap.create("mainui_topinfobg");
        topinfobg.touchEnabled = true;
        topinfobg.y = curButtomY;
        this.addChildAt(topinfobg, 0);
        curButtomY = topinfobg.y + topinfobg.height;
        var headBg = BaseBitmap.create("mainui_headbg");
        headBg.setPosition(60, App.CommonUtil.getCenterY(topinfobg, headBg, false));
        headBg.name = "headBg";
        this.addChild(headBg);
        // let headImg = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId());
        // // BaseLoadBitmap.create(Api.playerVoApi.getUserHeadImgPath()); 
        // headImg.width = 112;
        // headImg.height = 135;
        // headImg.setPosition(3,headBg.y-5);
        // this.addChild(headImg);
        // headImg.addTouchTap(this.roleHeadClickHandler,this);
        // this.headImg = <BaseLoadBitmap>headImg.getChildByName("myHead");
        // this.headBg = <BaseBitmap>headImg.getChildByName("myBody");
        this._headContainer = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(), Api.playerVoApi.getPlayerPtitle());
        this._headContainer.setPosition(3, headBg.y - 10);
        this.addChild(this._headContainer);
        this._headContainer.addTouchTap(this.roleHeadClickHandler, this);
        //势力 官职
        this._powerValueText = ComponentManager.getTextField(LanguageManager.getlocal("mainui_shili") + Api.playerVoApi.getPlayerPowerStr(), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xfdf2e8);
        this._powerValueText.setPosition(this._headContainer.x + 100, headBg.y + 12);
        this.addChild(this._powerValueText);
        this._officerText = ComponentManager.getTextField(LanguageManager.getlocal("mainui_officer") + Api.playerVoApi.getPlayerOffice(), this._powerValueText.size, this._powerValueText.textColor);
        this._officerText.x = this._powerValueText.x;
        this._officerText.y = this._powerValueText.y + 42;
        this.addChild(this._officerText);
        var cfg = (_b = {},
            _b["0"] = {
                iconImg: "public_icon2",
                iconValue: Api.playerVoApi.getPlayerGold(),
            },
            _b["1"] = {
                iconImg: "public_icon4",
                iconValue: Api.playerVoApi.getSoldier(),
            },
            _b["2"] = {
                iconImg: "public_icon3",
                iconValue: Api.playerVoApi.getFood(),
            },
            _b["3"] = {
                iconImg: "public_icon1",
                iconValue: Api.playerVoApi.getPlayerGem(),
            },
            _b);
        for (var i = 0; i < 4; i++) {
            var iconBg = BaseBitmap.create("mainui_topresbg");
            iconBg.setPosition(headBg.x + headBg.width + i % 2 * 150, headBg.y + 10 + Math.floor(i / 2) * 42);
            this.addChild(iconBg);
            curButtomY = iconBg.y + iconBg.height / 2;
            var tmpCfg = cfg[i.toString()];
            var resImg = BaseBitmap.create(tmpCfg.iconImg);
            resImg.setPosition(iconBg.x - resImg.width / 2, iconBg.y + iconBg.height - resImg.height + 5);
            this.addChild(resImg);
            var resValueText = ComponentManager.getTextField(App.StringUtil.changeIntToText(tmpCfg.iconValue), TextFieldConst.FONTSIZE_CONTENT_SMALL, this._powerValueText.textColor);
            resValueText.setPosition(resImg.x + resImg.width + 5, App.CommonUtil.getCenterY(iconBg, resValueText, false));
            this.addChild(resValueText);
            if (i == 0) {
                this._goldValueText = resValueText;
            }
            else if (i == 1) {
                this._soldierValueText = resValueText;
            }
            else if (i == 2) {
                this._foodValueText = resValueText;
            }
            else if (i == 3) {
                this._gemValueText = resValueText;
            }
        }
        //购买金币按钮
        // btn1
        var addGoldBtn = ComponentManager.getButton("mainui_btn1", "", this.addGoldBtnClickHandler, this);
        addGoldBtn.x = GameConfig.stageWidth - 52;
        addGoldBtn.y = curButtomY - addGoldBtn.height / 2;
        this.addChild(addGoldBtn);
        if (Api.switchVoApi.checkClosePay() || Api.switchVoApi.checkIsOlyShenheFile()) {
            addGoldBtn.visible = false;
        }
        this.refreshUpgradeClip();
        var _b;
    };
    MainUITop.prototype.refreshUpgradeClip = function () {
        var curLv = Api.playerVoApi.getPlayerLevel();
        var nextLvCfg = Config.LevelCfg.getCfgByLevel((curLv + 1).toString());
        var qingyuanflag = false;
        //情缘绘卷红点
        if (Api.switchVoApi.checkOpenOfficialCareer() && Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv()) {
            if (Api.encounterVoApi.isShowNpc() && Api.switchVoApi.checkOpenQingYuanHuiJuan()) {
                if (Api.practiceVoApi.isPracticeOPen()) {
                    qingyuanflag = true;
                }
            }
            else {
                qingyuanflag = false;
            }
        }
        var titleupgradeflag = false;
        //帝王霸业红点
        if (Api.switchVoApi.checkOpenOfficialCareer() && Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv()) {
            if ((Api.titleupgradeVoApi.checkNpcMessage() || (Api.switchVoApi.checkOpenEmperorsAchievement() && Api.emperorAchieveVoApi.isShowKingAchieveRedDot())) && Api.switchVoApi.checkTitleUpgrade()) {
                if (Api.practiceVoApi.isPracticeOPen()) {
                    titleupgradeflag = true;
                }
            }
            else {
                titleupgradeflag = false;
            }
        }
        if (nextLvCfg && Api.playerVoApi.getPlayerExp() >= nextLvCfg.exp || Api.practiceVoApi.isShowRedForPBottom() || Api.prestigeVoApi.isShowRedForPBottom() || (qingyuanflag || titleupgradeflag)) {
            if (!this._upgradeClip) {
                this._upgradeClip = ComponentManager.getCustomMovieClip("mainui_fg", 10, 100);
                this._upgradeClip.anchorOffsetX = this._upgradeClip.width / 2;
                this._upgradeClip.anchorOffsetY = this._upgradeClip.height;
                this._upgradeClip.x = -17;
                this._upgradeClip.y = -13;
                if (this._isShowName) {
                    this._upgradeClip.y = 38;
                }
                var tmpIdx = this.getChildIndex(this.getChildByName("headBg"));
                this.addChildAt(this._upgradeClip, tmpIdx);
                this._upgradeClip.playWithTime(0);
            }
        }
        else {
            if (this._upgradeClip) {
                this._upgradeClip.stop();
                this.removeChild(this._upgradeClip);
                this._upgradeClip = null;
            }
        }
    };
    MainUITop.prototype.addGoldBtnClickHandler = function () {
        // App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
        // ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIEW);
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        //test code
        // NetManager.request("test.wbpushmsg",{fuid:1000000023}); //Api.playerVoApi.getPlayerID()
    };
    MainUITop.prototype.roleHeadClickHandler = function () {
        PlayerBottomUI.getInstance().show();
        // ViewController.getInstance().openView(ViewConst.COMMON.PLAYERVIEW);
    };
    MainUITop.prototype.refresh = function () {
        this._gemValueText.text = Api.playerVoApi.getPlayerGemStr();
        this._soldierValueText.text = Api.playerVoApi.getSoldierStr();
        this._foodValueText.text = Api.playerVoApi.getFoodStr();
        this._goldValueText.text = Api.playerVoApi.getPlayerGoldStr();
        this._officerText.text = LanguageManager.getlocal("mainui_officer") + Api.playerVoApi.getPlayerOffice();
        this._powerValueText.text = LanguageManager.getlocal("mainui_shili") + Api.playerVoApi.getPlayerPowerStr();
        if (this._isShowName) {
            this._nickNameText.text = Api.playerVoApi.getPlayerName();
            this._nickNameText.x = this.width / 2 - this._nickNameText.width / 2;
        }
        this.refreshUpgradeClip();
    };
    MainUITop.prototype.changeImgNotify = function () {
        // let res = "user_head" + Api.playerVoApi.getPlayePicId();
        // this.headImg.setload(res);
        // let headBg = Api.playerVoApi.getVipHeadBg() ;
        // if(headBg){
        // 	this.headBg.texture = ResourceManager.getRes(headBg);	
        // }
        var headName = Api.playerVoApi.getUserHeadImgPath();
        var headbginfo = Api.playerVoApi.getPlayerPtitle();
        this._headContainer.setRes(headName, headbginfo);
    };
    MainUITop.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI, this.refresh, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHANGE_IMG, this.changeImgNotify, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, this.refresh, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_REFRESH_SPECIAL_AVATAR, this.changeImgNotify, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED, this.refreshUpgradeClip, this);
        // this.headImg=null;
        this._nickNameText = null;
        this._powerValueText = null;
        this._officerText = null;
        this._soldierValueText = null;
        this._foodValueText = null;
        this._goldValueText = null;
        this._gemValueText = null;
        this._isShowName = false;
        this._upgradeClip = null;
        // this.headBg = null;
        this._headContainer = null;
        _super.prototype.dispose.call(this);
    };
    return MainUITop;
}(BaseLoadDisplayObjectContiner));
__reflect(MainUITop.prototype, "MainUITop");
//# sourceMappingURL=MainUITop.js.map