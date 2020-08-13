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
 * 修身UI
 * author yanyuling
 * date 2018/04/16
 * @class PracticeView
 */
var PracticeView = (function (_super) {
    __extends(PracticeView, _super);
    function PracticeView() {
        var _this = _super.call(this) || this;
        _this._isLvupEnable = false;
        _this._refreshTxtList = [];
        _this._lvBeforeBuy = 0;
        _this._sbookItems = null;
        _this._practiceSkillItem = null;
        _this._rewardTabBar = null;
        return _this;
    }
    PracticeView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UPGRADE), this.levelupCallBackHandler, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UNLOCK), this.levelupCallBackHandler, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_BUY), this.levelupCallBackHandler, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.PRACTICE_UPSKILLEXP), this.checkRedPoints, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED, this.checkRedPoints, this);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_INDEX),this.checkRedPoints,this);
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED,this.checkRedPoints,this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var servant_infobg = BaseBitmap.create("practice_bg");
        servant_infobg.y = -20;
        this._nodeContainer.addChild(servant_infobg);
        var userContainer = Api.playerVoApi.getMyPortrait();
        userContainer.x = GameConfig.stageWidth / 2 - userContainer.width / 2;
        userContainer.name = "userContainer";
        this._nodeContainer.addChild(userContainer);
        this._bottomnodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._bottomnodeContainer);
        var btHeight = PlayerBottomUI.getInstance().showHeight;
        var servant_mask = BaseBitmap.create("servant_mask");
        servant_mask.width = GameConfig.stageWidth;
        //蓝色背景图
        var servantBlueBg = BaseBitmap.create("playerview_probg");
        servantBlueBg.x = 0;
        servantBlueBg.y = 0;
        servantBlueBg.height = 125;
        var bottomInfoY = 0; // 457;
        var bottomBg = BaseBitmap.create("servant_bottombg");
        bottomBg.height = 390;
        bottomBg.x = 0;
        bottomBg.y = servantBlueBg.y + servantBlueBg.height - 10;
        var tabarArr = ["servant_info_tab1"];
        if (Api.switchVoApi.checkOpenSeat()) {
            tabarArr = ["servant_info_tab1", "servant_info_tab2"];
        }
        var rewardTabBar = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, tabarArr, this.onTabClick, this);
        rewardTabBar.setPosition(20, bottomBg.y + 23);
        this._rewardTabBar = rewardTabBar;
        this.checkRedPoints();
        // if(Api.practiceVoApi.isShowRedForPBottom() && Api.practiceVoApi.isPracticeUnlock())
        // { 
        // 	this._rewardTabBar.addRedPoint(0);  
        // }else
        // {
        // 	this._rewardTabBar.removeRedPoint(0); 
        // }
        var targetHeight = GameConfig.stageHeigth - this.container.y; //- //btHeight - innerbg.y - innerbg.height;
        this._bottomnodeContainer.y = targetHeight - 15;
        var infoH = servant_infobg.y + servant_infobg.height;
        if (this._bottomnodeContainer.y > infoH) {
            this._bottomnodeContainer.y = infoH - 65;
            bottomBg.height = 305 + GameConfig.stageHeigth - 960; // targetHeight - bottomBg.y-550+960-GameConfig.stageHeigth;
        }
        this._bottomnodeContainer.addChild(servant_mask);
        this._bottomnodeContainer.addChild(bottomBg);
        this._bottomnodeContainer.addChild(rewardTabBar);
        // this._bottomnodeContainer.addChild(innerbg);
        this._bottomnodeContainer.addChild(servantBlueBg);
        var playerview_powerbg = BaseBitmap.create("playerview_powerbg");
        playerview_powerbg.x = GameConfig.stageWidth / 2 - playerview_powerbg.width / 2;
        playerview_powerbg.y = -60;
        this._bottomnodeContainer.addChild(playerview_powerbg);
        var myPowerImg = BaseBitmap.create("player_power2");
        myPowerImg.x = playerview_powerbg.x + 30;
        myPowerImg.y = playerview_powerbg.y + 20;
        this._bottomnodeContainer.addChild(myPowerImg);
        var titleText1 = ComponentManager.getTextField("" + Api.playerVoApi.getPlayerPower(), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleText1.name = "powerTxt";
        titleText1.x = myPowerImg.x + myPowerImg.width + 5;
        titleText1.y = myPowerImg.y + myPowerImg.height / 2 - titleText1.height / 2;
        this._bottomnodeContainer.addChild(titleText1);
        //等级蓝色背景图
        var servant_levebg = BaseBitmap.create("servant_levebg2");
        servant_levebg.x = 5;
        servant_levebg.y = servantBlueBg.y;
        this._bottomnodeContainer.addChild(servant_levebg);
        //等级 文字不变
        var lvText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        lvText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        lvText.text = LanguageManager.getlocal("servant_infoLv");
        lvText.x = servant_levebg.x + 17;
        lvText.y = servant_levebg.y + 10;
        this._bottomnodeContainer.addChild(lvText);
        var lvValueText = ComponentManager.getTextField("123", 42);
        lvValueText.name = "lvValueText";
        lvValueText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        lvValueText.text = "12";
        lvValueText.anchorOffsetX = lvValueText.width / 2;
        lvValueText.x = servant_levebg.x + servant_levebg.width / 2;
        lvValueText.y = lvText.y + 25;
        this._bottomnodeContainer.addChild(lvValueText);
        var attrCfg = [
            {
                icon: "playerview_pro1",
                value: "100",
            },
            {
                icon: "playerview_pro2",
                value: "100",
            },
            {
                icon: "playerview_pro4",
                value: "100",
            },
            {
                icon: "playerview_pro5",
                value: "100",
            },
        ];
        for (var i = 0; i < 4; i++) {
            var img = attrCfg[i].icon;
            var attribute = BaseBitmap.create(img);
            var num = i % 2;
            attribute.x = 120;
            if (i % 2 == 1) {
                attribute.x = GameConfig.stageWidth / 2; // + 50;
            }
            if (PlatformManager.checkIsEnLang()) {
                attribute.x -= 25;
            }
            attribute.y = servant_levebg.y + 15 + 25 * Math.floor(i / 2);
            if (i >= 2) {
                attribute.y = attribute.y + 4;
            }
            this._bottomnodeContainer.addChild(attribute);
            var valueTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
            valueTxt.text = "100";
            valueTxt.x = attribute.x + attribute.width + 5;
            valueTxt.y = attribute.y + attribute.height / 2 - valueTxt.height / 2;
            this._bottomnodeContainer.addChild(valueTxt);
            this._refreshTxtList.push(valueTxt);
        }
        this._progressBar = ComponentManager.getProgressBar("progress3", "progress3_bg", 620);
        this._progressBar.x = 10;
        this._progressBar.y = bottomBg.y + 10 - 40;
        this._progressBar.setTextSize(18);
        this._bottomnodeContainer.addChild(this._progressBar);
        var levelupBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "servantInfoLevelup", this.levelupBtnClickHandler, this);
        levelupBtn.x = 480;
        levelupBtn.y = this._progressBar.y - 63; //this._progressBar.y + this._progressBar.height/2 - levelupBtn.height/2-80;
        levelupBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._bottomnodeContainer.addChild(levelupBtn);
        this._levelupBtn = levelupBtn;
        var sbookItems = new ServantInfoBookItems();
        sbookItems.y = bottomBg.y + 15;
        sbookItems.init("", bottomBg.y + bottomBg.height - 150, true);
        this._bottomnodeContainer.addChild(sbookItems);
        this._sbookItems = sbookItems;
        //修身技能列表
        var practiceSkillItem = new PracticeSkillsItem();
        practiceSkillItem.y = bottomBg.y + 15;
        practiceSkillItem.init("", bottomBg.y + bottomBg.height - 150);
        this._bottomnodeContainer.addChild(practiceSkillItem);
        practiceSkillItem.visible = false;
        this._practiceSkillItem = practiceSkillItem;
        this.refreshTxtValue();
    };
    PracticeView.prototype.checkRedPoints = function () {
        if (Api.practiceVoApi.isShowRedForPBottom2() && Api.practiceVoApi.isPracticeUnlock()) {
            this._rewardTabBar.addRedPoint(0);
        }
        else {
            this._rewardTabBar.removeRedPoint(0);
        }
        if (Api.switchVoApi.checkOpenSeat()) {
            if (Api.practiceVoApi.skillRed()) {
                this._rewardTabBar.addRedPoint(1);
            }
            else {
                this._rewardTabBar.removeRedPoint(1);
            }
        }
    };
    PracticeView.prototype.refreshTxtValue = function () {
        var isLvMax = Api.practiceVoApi.getLevel() == Config.PracticeBaseCfg.commonMaxLv();
        if (Api.practiceVoApi.isPracticeLvupEnable() && !isLvMax) {
            App.CommonUtil.addIconToBDOC(this._levelupBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._levelupBtn);
        }
        if (isLvMax) {
            this._levelupBtn.setEnable(false);
        }
        PlayerBottomUI.getInstance().checkRedPoints();
        var powerTxt = this._bottomnodeContainer.getChildByName("powerTxt");
        var lvValueText = this._bottomnodeContainer.getChildByName("lvValueText");
        powerTxt.text = "" + Api.practiceVoApi.getPower();
        lvValueText.text = "" + Api.practiceVoApi.getLevel();
        lvValueText.anchorOffsetX = lvValueText.width / 2;
        var attrV = Api.practiceVoApi.geAttrValues();
        this._refreshTxtList[0].text = "" + attrV[0];
        this._refreshTxtList[1].text = "" + attrV[1];
        this._refreshTxtList[2].text = "" + attrV[2];
        this._refreshTxtList[3].text = "" + attrV[3];
        this.refreshProgress();
    };
    PracticeView.prototype.refreshProgress = function () {
        var isLvMax = Api.practiceVoApi.getLevel() == Config.PracticeBaseCfg.commonMaxLv();
        var value = Api.practiceVoApi.getProgressValue();
        if (isLvMax) {
            this._progressBar.setText(LanguageManager.getlocal("practice_expV", ["" + value.v1]));
        }
        else {
            this._progressBar.setText(LanguageManager.getlocal("practice_expV", [value.v1 + "/" + value.v2]));
        }
        var per = value.v1 / value.v2;
        per = per < 1 ? per : 1;
        this._progressBar.setPercentage(per);
        this._isLvupEnable = false;
        if (per >= 1 && !isLvMax) {
            this._isLvupEnable = true;
        }
    };
    PracticeView.prototype.onTabClick = function (data) {
        if (data.index == 0) {
            this._sbookItems.visible = true;
            this._practiceSkillItem.visible = false;
        }
        else {
            this._sbookItems.visible = false;
            this._practiceSkillItem.visible = true;
        }
    };
    PracticeView.prototype.levelupCallBackHandler = function (event) {
        var rdata = event.data.data;
        if (rdata.ret != 0) {
            return;
        }
        if (rdata.cmd == NetRequestConst.REQUEST_REQUEST_BUY) {
            // this.refreshProgress();
            App.CommonUtil.showTip(LanguageManager.getlocal("practice_batchBuySuccessTip"));
            var newLv = Api.practiceVoApi.getLevel();
            if (this._lvBeforeBuy < newLv) {
                this.showUpgradeEffect(newLv - this._lvBeforeBuy);
            }
            this.refreshTxtValue();
            this._lvBeforeBuy = newLv;
            return;
        }
        if (rdata.cmd == NetRequestConst.REQUEST_REQUEST_UNLOCK) {
            this.refreshTxtValue();
            this.checkRedPoints();
            return;
        }
        this.refreshTxtValue();
        this.showUpgradeEffect(1);
    };
    //播放升级成功动画
    PracticeView.prototype.showUpgradeEffect = function (addLv) {
        SoundManager.playEffect(SoundConst.EFFECT_UPD);
        var servant_upgrade_word = ComponentManager.getBitmapText(LanguageManager.getlocal("servant_xLv", [String(addLv)]), TextFieldConst.FONTNAME_BOSS_SCORE, TextFieldConst.COLOR_LIGHT_YELLOW, TextFieldConst.FONTSIZE_TITLE_BIG);
        servant_upgrade_word.x = 240;
        servant_upgrade_word.y = 200;
        var upgradeClip = ComponentManager.getCustomMovieClip("servant_upgrade_frame", 5, 100);
        upgradeClip.setScale(2);
        upgradeClip.x = 110;
        upgradeClip.y = 20;
        this._nodeContainer.addChild(upgradeClip);
        upgradeClip.playWithTime(1);
        var txtBg = null;
        var offsetY = 0;
        if (PlatformManager.checkIsThSp()) {
            var clip = BaseBitmap.create("servant_upgrade_frame1");
            servant_upgrade_word.x = upgradeClip.x + clip.width - servant_upgrade_word.width / 2;
            servant_upgrade_word = servant_upgrade_word;
            servant_upgrade_word.bold = true;
            txtBg = BaseLoadBitmap.create("public_9_powertipbg2");
            txtBg.height = 49;
            txtBg.width = servant_upgrade_word.width + 90;
            txtBg.setPosition(servant_upgrade_word.x + servant_upgrade_word.width / 2 - txtBg.width / 2, servant_upgrade_word.y + servant_upgrade_word.height / 2 - txtBg.height / 2);
            this._nodeContainer.addChild(txtBg);
            offsetY = txtBg.y - 50;
        }
        this._nodeContainer.addChild(servant_upgrade_word);
        egret.Tween.get(servant_upgrade_word, { loop: false }).to({ y: 150 }, 800).to({ alpha: 0 }, 100);
        if (txtBg) {
            egret.Tween.get(txtBg, { loop: false }).to({ y: offsetY }, 800).to({ alpha: 0 }, 100);
        }
        var tmpthis = this;
        egret.Tween.get(this, { loop: false }).wait(500).call(function () {
            //字体刷新加个延时
            tmpthis.refreshTxtValue();
            tmpthis._nodeContainer.removeChild(upgradeClip);
            upgradeClip = null;
            tmpthis._nodeContainer.removeChild(servant_upgrade_word);
            servant_upgrade_word = null;
            if (txtBg) {
                tmpthis._nodeContainer.removeChild(txtBg);
            }
        });
    };
    PracticeView.prototype.levelupBtnClickHandler = function () {
        if (this._isLvupEnable == false) {
            // ViewController.getInstance().openView(ViewConst.POPUP.PRACTICEBATCHBUYPOPUPVIEW);
            ViewController.getInstance().openView(ViewConst.POPUP.PRACTICEBUYPOPUPVIEW);
            this._lvBeforeBuy = Api.practiceVoApi.getLevel();
        }
        else {
            if (Api.practiceVoApi.getLevel() == Config.PracticeBaseCfg.commonMaxLv()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("practice_topLvTip"));
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_REQUEST_UPGRADE, {});
        }
    };
    PracticeView.prototype.getRuleInfo = function () {
        if (Api.switchVoApi.checkOpenSeat()) {
            return "practiceRuleInfo_withNewMonthYear";
        }
        return "practiceRuleInfo";
    };
    PracticeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "playerpromo_abitopbg", "playerview_probg",
            "servant_levebg2", "servant_infoLv", "servant_attribute1", "servant_attribute2",
            "servant_attribute3", "servant_attribute4", "progress3", "progress3_bg",
            "playerview_pro1", "playerview_pro2", "playerview_pro4", "playerview_pro5",
            "playerview_powerbg", "playerview_power_img",
            "servant_infoPro1", "servant_infoPro2", "servant_infoPro3", "servant_infoPro4",
            "servant_xLv", "servant_upgrade_frame", "player_power2", "practice_bg", "servant_star",
            "servant_bottombg",
            "practice_skill_1",
            "practice_skill_2",
        ]);
    };
    PracticeView.prototype.closeHandler = function () {
        PlayerBottomUI.getInstance().hide(true);
        _super.prototype.hide.call(this);
    };
    PracticeView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UPGRADE), this.levelupCallBackHandler, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UNLOCK), this.levelupCallBackHandler, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_BUY), this.levelupCallBackHandler, this);
        ViewController.getInstance().hideView(ViewConst.POPUP.RULEINFOPOPUPVIEW);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED, this.checkRedPoints, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.PRACTICE_UPSKILLEXP), this.checkRedPoints, this);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_INDEX),this.checkRedPoints,this);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED,this.checkRedPoints,this);
        this._nodeContainer = null;
        this._bottomnodeContainer = null;
        this._scrollList = null;
        this._progressBar = null;
        this._levelupBtn = null;
        this._isLvupEnable = false;
        this._refreshTxtList = [];
        this._lvBeforeBuy = 0;
        this._practiceSkillItem = null;
        this._sbookItems = null;
        _super.prototype.dispose.call(this);
    };
    return PracticeView;
}(CommonView));
__reflect(PracticeView.prototype, "PracticeView");
//# sourceMappingURL=PracticeView.js.map