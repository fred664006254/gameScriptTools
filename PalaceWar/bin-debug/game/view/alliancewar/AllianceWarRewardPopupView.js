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
 * 	领取奖励界面
 * @author 张朝阳
 * date 2018/10/16
 * @class AllianceWarRewardPopupView
 */
var AllianceWarRewardPopupView = (function (_super) {
    __extends(AllianceWarRewardPopupView, _super);
    function AllianceWarRewardPopupView() {
        var _this = _super.call(this) || this;
        _this._myRank = null;
        _this._receiveAllianceBtn = null;
        _this._receiveAllianceBM = null;
        _this._tipTxt = null;
        _this._receiveMySelfBtn = null;
        _this._receiveMySelfBM = null;
        _this._notMyReceiveTxt = null;
        return _this;
    }
    AllianceWarRewardPopupView.prototype.initView = function () {
        //监听 model事件
        App.MessageHelper.addNetMessage("myalliancewar", this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ALLIANCEWAR_GETREWARDS, this.receiveRewardHandle, this);
        var bg = BaseBitmap.create("public_9_bg32");
        bg.width = 520;
        bg.height = 695;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this.viewBg.y + 15);
        this.addChildToContainer(bg);
        var tinfo = Api.allianceWarVoApi.getOtherInfo();
        var topTipStr = "";
        if (tinfo.name) {
            topTipStr = LanguageManager.getlocal("allianceWarRewardPopupViewTopTip", [tinfo.zid, tinfo.name, tinfo.level]);
        }
        else {
            topTipStr = LanguageManager.getlocal("allianceWarRewardPopupViewTopTip2");
        }
        var topTip = ComponentManager.getTextField(topTipStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
        topTip.setPosition(bg.x + bg.width / 2 - topTip.width / 2, bg.y + 10);
        this.addChildToContainer(topTip);
        //帮会奖励相关
        var bg1 = BaseBitmap.create("public_9_bg14");
        bg1.width = 502;
        bg1.height = 246;
        bg1.setPosition(bg.x + bg.width / 2 - bg1.width / 2, topTip.y + topTip.height + 5);
        this.addChildToContainer(bg1);
        var leftFlower1 = BaseBitmap.create("acsevenhuawen");
        leftFlower1.setPosition(bg1.x + 10, bg1.y + bg1.height - leftFlower1.height - 10);
        this.addChildToContainer(leftFlower1);
        var rightFlower1 = BaseBitmap.create("acsevenhuawen");
        rightFlower1.setPosition(bg1.x + bg1.width - rightFlower1.width - 10, leftFlower1.y);
        this.addChildToContainer(rightFlower1);
        var titleBg1 = BaseBitmap.create("acsevenitemtopbg");
        titleBg1.setPosition(bg1.x + bg1.width / 2 - titleBg1.width / 2, bg1.y + 5);
        this.addChildToContainer(titleBg1);
        var titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRewardPopupViewRewardTitle1"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        titleTxt1.setPosition(titleBg1.x + titleBg1.width / 2 - titleTxt1.width / 2, titleBg1.y + titleBg1.height / 2 - titleTxt1.height / 2);
        this.addChildToContainer(titleTxt1);
        var leftLine1 = BaseBitmap.create("acsevenitemzshi");
        leftLine1.anchorOffsetX = leftLine1.width / 2;
        leftLine1.anchorOffsetY = leftLine1.height / 2;
        leftLine1.setPosition(titleTxt1.x - leftLine1.width / 2 - 10, titleTxt1.y + titleTxt1.height / 2);
        this.addChildToContainer(leftLine1);
        var rightLine1 = BaseBitmap.create("acsevenitemzshi");
        rightLine1.anchorOffsetX = rightLine1.width / 2;
        rightLine1.anchorOffsetY = rightLine1.height / 2;
        rightLine1.rotation = 180;
        rightLine1.setPosition(titleTxt1.x + titleTxt1.width + rightLine1.width / 2 + 10, leftLine1.y);
        this.addChildToContainer(rightLine1);
        var allianceReward = this.getAllianceReward();
        var allianceVoList = GameData.formatRewardItem(allianceReward);
        var scaleValue = 0.8;
        var offsetHeight = 0;
        for (var i = 0; i < allianceVoList.length; i++) {
            var itemDB = GameData.getItemIcon(allianceVoList[i], false, true);
            itemDB.setScale(scaleValue);
            var offsetWidth = (bg1.width - allianceVoList.length * itemDB.width * scaleValue) / (allianceVoList.length + 1);
            itemDB.setPosition(bg1.x + offsetWidth + (itemDB.width * scaleValue + offsetWidth) * i, titleBg1.y + titleBg1.height + 15);
            this.addChildToContainer(itemDB);
            offsetHeight = itemDB.height * scaleValue;
        }
        this._receiveAllianceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "friendsBtnTxt9", this.receiveAllianceBtnClick, this);
        this._receiveAllianceBtn.setPosition(bg1.x + bg1.width / 2 - this._receiveAllianceBtn.width / 2, titleBg1.y + titleBg1.height + 15 + offsetHeight + 20);
        this.addChildToContainer(this._receiveAllianceBtn);
        this._receiveAllianceBM = BaseBitmap.create("signin_had_get");
        this._receiveAllianceBM.setPosition(this._receiveAllianceBtn.x + this._receiveAllianceBtn.width / 2 - this._receiveAllianceBM.width / 2, this._receiveAllianceBtn.y + this._receiveAllianceBtn.height / 2 - this._receiveAllianceBM.height / 2);
        this.addChildToContainer(this._receiveAllianceBM);
        this._tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(""), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
        this._tipTxt.setPosition(this._receiveAllianceBtn.x + this._receiveAllianceBtn.width / 2 - this._tipTxt.width / 2, this._receiveAllianceBtn.y + this._receiveAllianceBtn.height + 10);
        this.addChildToContainer(this._tipTxt);
        //个人奖励相关
        var bg2 = BaseBitmap.create("public_9_bg14");
        bg2.width = 502;
        bg2.height = 222;
        bg2.setPosition(bg.x + bg.width / 2 - bg2.width / 2, bg1.y + bg1.height + 10);
        this.addChildToContainer(bg2);
        var leftFlower2 = BaseBitmap.create("acsevenhuawen");
        leftFlower2.setPosition(bg2.x + 10, bg2.y + bg2.height - leftFlower2.height - 10);
        this.addChildToContainer(leftFlower2);
        var rightFlower2 = BaseBitmap.create("acsevenhuawen");
        rightFlower2.setPosition(bg2.x + bg2.width - rightFlower2.width - 10, leftFlower2.y);
        this.addChildToContainer(rightFlower2);
        var titleBg2 = BaseBitmap.create("acsevenitemtopbg");
        titleBg2.setPosition(bg2.x + bg2.width / 2 - titleBg2.width / 2, bg2.y + 5);
        this.addChildToContainer(titleBg2);
        var titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRewardPopupViewRewardTitle2"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        titleTxt2.setPosition(titleBg2.x + titleBg2.width / 2 - titleTxt2.width / 2, titleBg2.y + titleBg2.height / 2 - titleTxt2.height / 2);
        this.addChildToContainer(titleTxt2);
        var leftLine2 = BaseBitmap.create("acsevenitemzshi");
        leftLine2.anchorOffsetX = leftLine2.width / 2;
        leftLine2.anchorOffsetY = leftLine2.height / 2;
        leftLine2.setPosition(titleTxt2.x - leftLine2.width / 2 - 10, titleTxt2.y + titleTxt2.height / 2);
        this.addChildToContainer(leftLine2);
        var rightLine2 = BaseBitmap.create("acsevenitemzshi");
        rightLine2.anchorOffsetX = rightLine2.width / 2;
        rightLine2.anchorOffsetY = rightLine2.height / 2;
        rightLine2.rotation = 180;
        rightLine2.setPosition(titleTxt2.x + titleTxt2.width + rightLine2.width / 2 + 10, leftLine2.y);
        this.addChildToContainer(rightLine2);
        var myselfReward = this.getMyselfReward();
        var myselfVoList = GameData.formatRewardItem(myselfReward);
        for (var i = 0; i < myselfVoList.length; i++) {
            var itemDB = GameData.getItemIcon(myselfVoList[i], false, true);
            itemDB.setScale(scaleValue);
            var offsetWidth = (bg2.width - myselfVoList.length * itemDB.width * scaleValue) / (myselfVoList.length + 1);
            itemDB.setPosition(bg2.x + offsetWidth + (itemDB.width * scaleValue + offsetWidth) * i, titleBg2.y + titleBg2.height + 15);
            this.addChildToContainer(itemDB);
        }
        this._receiveMySelfBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "friendsBtnTxt9", this.receiveMySelfBtnClick, this);
        this._receiveMySelfBtn.setPosition(bg2.x + bg2.width / 2 - this._receiveMySelfBtn.width / 2, titleBg2.y + titleBg2.height + 15 + offsetHeight + 20);
        this.addChildToContainer(this._receiveMySelfBtn);
        this._receiveMySelfBM = BaseBitmap.create("signin_had_get");
        this._receiveMySelfBM.setPosition(this._receiveMySelfBtn.x + this._receiveMySelfBtn.width / 2 - this._receiveMySelfBM.width / 2, this._receiveMySelfBtn.y + this._receiveMySelfBtn.height / 2 - this._receiveMySelfBM.height / 2);
        this.addChildToContainer(this._receiveMySelfBM);
        //未参战提示
        this._notMyReceiveTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRewardPopupViewNotRewardTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED3);
        this._notMyReceiveTxt.setPosition(this._receiveMySelfBtn.x + this._receiveMySelfBtn.width / 2 - this._notMyReceiveTxt.width / 2, this._receiveMySelfBtn.y + this._receiveMySelfBtn.height / 2 - this._notMyReceiveTxt.height / 2);
        this.addChildToContainer(this._notMyReceiveTxt);
        //下方提示相关
        //帮派提示相关
        var tipTitleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRewardPopupViewRewardTitle1"), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTitleTxt1.setPosition(bg2.x, bg2.y + bg2.height + 10);
        this.addChildToContainer(tipTitleTxt1);
        var tipWinTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRewardPopupViewRewardWinDesc1"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
        tipWinTxt1.setPosition(tipTitleTxt1.x, tipTitleTxt1.y + tipTitleTxt1.height + 5);
        this.addChildToContainer(tipWinTxt1);
        var tipLoseTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRewardPopupViewRewardloseDesc1"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
        tipLoseTxt1.setPosition(tipWinTxt1.x, tipWinTxt1.y + tipWinTxt1.height + 3);
        this.addChildToContainer(tipLoseTxt1);
        //个人提示相关
        var tipTitleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRewardPopupViewRewardTitle2"), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTitleTxt2.setPosition(tipLoseTxt1.x, tipLoseTxt1.y + tipLoseTxt1.height + 10);
        this.addChildToContainer(tipTitleTxt2);
        var tipWinTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRewardPopupViewRewardWinDesc2"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
        tipWinTxt2.setPosition(tipTitleTxt2.x, tipTitleTxt2.y + tipTitleTxt2.height + 5);
        this.addChildToContainer(tipWinTxt2);
        var tipLoseTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRewardPopupViewRewardloseDesc2"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
        tipLoseTxt2.setPosition(tipWinTxt2.x, tipWinTxt2.y + tipWinTxt2.height + 3);
        this.addChildToContainer(tipLoseTxt2);
        this.refreshView();
    };
    AllianceWarRewardPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        var buttomTip = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRewardPopupViewButtomTip"), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        buttomTip.setPosition(this.viewBg.x + this.viewBg.width - buttomTip.width, this.viewBg.y + this.viewBg.height);
        this.addChild(buttomTip);
    };
    AllianceWarRewardPopupView.prototype.refreshView = function () {
        if (Api.allianceWarVoApi.isReceiveAllianceReward()) {
            this._receiveAllianceBtn.setVisible(false);
            this._receiveAllianceBM.setVisible(true);
            if (Api.allianceWarVoApi.getReceiveRewardName()) {
                this._tipTxt.text = LanguageManager.getlocal("allianceWarRewardPopupViewRewardTip2", [Api.allianceWarVoApi.getReceiveRewardName()]);
            }
            else {
                this._tipTxt.text = LanguageManager.getlocal("allianceWarRewardPopupViewRewardTip3");
            }
            this._tipTxt.setPosition(this._receiveAllianceBtn.x + this._receiveAllianceBtn.width / 2 - this._tipTxt.width / 2, this._receiveAllianceBtn.y + this._receiveAllianceBtn.height + 10);
        }
        else {
            this._receiveAllianceBtn.setVisible(true);
            this._receiveAllianceBM.setVisible(false);
            this._tipTxt.text = LanguageManager.getlocal("allianceWarRewardPopupViewRewardTip1");
            this._tipTxt.setPosition(this._receiveAllianceBtn.x + this._receiveAllianceBtn.width / 2 - this._tipTxt.width / 2, this._receiveAllianceBtn.y + this._receiveAllianceBtn.height + 10);
            if (Api.allianceVoApi.getMyAllianceVo().po == 1 || Api.allianceVoApi.getMyAllianceVo().po == 2) {
                this._receiveAllianceBtn.setEnable(true);
            }
            else {
                this._receiveAllianceBtn.setEnable(false);
            }
        }
        if (!Api.allianceWarVoApi.getOldInfo()) {
            this._notMyReceiveTxt.setVisible(true);
            this._receiveMySelfBtn.setVisible(false);
            this._receiveMySelfBM.setVisible(false);
            return;
        }
        else {
            this._notMyReceiveTxt.setVisible(false);
        }
        if (Api.allianceWarVoApi.isReceiveMyReward()) {
            this._receiveMySelfBtn.setVisible(false);
            this._receiveMySelfBM.setVisible(true);
        }
        else {
            this._receiveMySelfBtn.setVisible(true);
            this._receiveMySelfBM.setVisible(false);
        }
    };
    AllianceWarRewardPopupView.prototype.receiveRewardHandle = function (event) {
        if (event && event.data && !event.data.ret) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarRewardPopupViewReciveRewardTip"));
            this.request(NetRequestConst.REQYEST_ALLIANCEWAR_GETMYALLIANCEINFO, null);
        }
        if (event.data.ret) {
            var data = event.data.data.data.rewards;
            var voList = GameData.formatRewardItem(data);
            App.CommonUtil.playRewardFlyAction(voList);
        }
    };
    /**
     * 领取帮会
     */
    AllianceWarRewardPopupView.prototype.receiveAllianceBtnClick = function () {
        if (Api.allianceVoApi.getMyAllianceVo().po == 1 || Api.allianceVoApi.getMyAllianceVo().po == 2) {
            this.request(NetRequestConst.REQUEST_ALLIANCEWAR_GETREWARDS, { isalliance: 1 });
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarRewardPopupViewShowTip"));
        }
    };
    /**
     * 领取自己的奖励
     */
    AllianceWarRewardPopupView.prototype.receiveMySelfBtnClick = function () {
        this.request(NetRequestConst.REQUEST_ALLIANCEWAR_GETREWARDS, { isalliance: 0 });
    };
    AllianceWarRewardPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQYEST_ALLIANCEWAR_GETRANK, requestData: {} };
    };
    AllianceWarRewardPopupView.prototype.receiveData = function (data) {
        if (data.ret) {
            this._myRank = data.data.data.myrank;
        }
    };
    /**
    * 获得个人奖励
    */
    AllianceWarRewardPopupView.prototype.getMyselfReward = function () {
        var addRankList = Config.AlliancewarCfg.getRankAdd();
        var AliiianceRank = 10000;
        var cfgKey = null;
        var reward = "";
        var tinfo = Api.allianceWarVoApi.getOtherInfo();
        for (var key in addRankList) {
            if (this._myRank >= addRankList[key].minRank && this._myRank <= addRankList[key].maxRank) {
                AliiianceRank = this._myRank;
                cfgKey = key;
                break;
            }
        }
        if (Api.allianceWarVoApi.isWin()) {
            var level = 0;
            if (tinfo.level) {
                level = tinfo.level;
            }
            else {
                level = Api.allianceVoApi.getAllianceVo().level;
            }
            if (cfgKey) {
                reward += "21_0_" + String(Config.AlliancewarCfg.addContribution * level + addRankList[cfgKey].reward_member) + "|" + Config.AlliancewarCfg.extraReward;
            }
            else {
                reward += "21_0_" + String(Config.AlliancewarCfg.addContribution * level) + "|" + Config.AlliancewarCfg.extraReward;
            }
        }
        else {
            reward += "21_0_" + Config.AlliancewarCfg.addContribution;
        }
        return reward;
        // return this.myalliancewar.servant[servantId];
    };
    /**
     * 获得帮会奖励
     */
    AllianceWarRewardPopupView.prototype.getAllianceReward = function () {
        var addRankList = Config.AlliancewarCfg.getRankAdd();
        var AliiianceRank = 10000;
        var cfgKey = null;
        var reward = "";
        var tinfo = Api.allianceWarVoApi.getOtherInfo();
        for (var key in addRankList) {
            if (this._myRank >= addRankList[key].minRank && this._myRank <= addRankList[key].maxRank) {
                AliiianceRank = this._myRank;
                cfgKey = key;
                break;
            }
        }
        if (Api.allianceWarVoApi.isWin()) {
            var level = 0;
            if (tinfo.level) {
                level = tinfo.level;
            }
            else {
                level = Api.allianceVoApi.getAllianceVo().level;
            }
            if (cfgKey) {
                reward += "22_0_" + String(Config.AlliancewarCfg.addExp * level + addRankList[cfgKey].reward_guild);
            }
            else {
                reward += "22_0_" + String(Config.AlliancewarCfg.addExp * level);
            }
        }
        else {
            reward += "22_0_" + Config.AlliancewarCfg.addExp;
        }
        return reward;
    };
    AllianceWarRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acsevenhuawen", "acsevenitemtopbg", "signin_had_get"
        ]);
    };
    AllianceWarRewardPopupView.prototype.getTitleStr = function () {
        return "allianceWarRewardPopupViewTitle";
    };
    AllianceWarRewardPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage("myalliancewar", this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ALLIANCEWAR_GETREWARDS, this.receiveRewardHandle, this);
        this._myRank = null;
        this._receiveAllianceBtn = null;
        this._receiveAllianceBM = null;
        this._tipTxt = null;
        this._receiveMySelfBtn = null;
        this._receiveMySelfBM = null;
        this._notMyReceiveTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceWarRewardPopupView;
}(PopupView));
__reflect(AllianceWarRewardPopupView.prototype, "AllianceWarRewardPopupView");
//# sourceMappingURL=AllianceWarRewardPopupView.js.map