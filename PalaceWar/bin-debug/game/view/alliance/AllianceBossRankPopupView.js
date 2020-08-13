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
 * 副本伤害排行
 * author yanyuling
 * date 2017/12/07
 * @class AllianceBossRankPopupView
 */
var AllianceBossRankPopupView = (function (_super) {
    __extends(AllianceBossRankPopupView, _super);
    function AllianceBossRankPopupView() {
        var _this = _super.call(this) || this;
        _this._isElite = false;
        return _this;
    }
    AllianceBossRankPopupView.prototype.initView = function () {
        this._bossId = this.param.data;
        if (this._bossId.indexOf("e") >= 0) {
            this._isElite = true;
        }
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_GETBOSSRANK), this.netCallBack, this);
        NetManager.request(NetRequestConst.REQUEST_ALLIANCE_GETBOSSRANK, { bossId: this._bossId });
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.height = 800;
        this.addChildToContainer(this._nodeContainer);
        var startY = 20;
        this._topTipTF = ComponentManager.getTextField("haha", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._topTipTF.x = 30 + GameData.popupviewOffsetX;
        this._topTipTF.y = startY;
        this._topTipTF.visible = false;
        this._nodeContainer.addChild(this._topTipTF);
        startY += 30;
        var bg1 = BaseBitmap.create("public_9_bg32");
        bg1.width = 520;
        bg1.height = 700 - 35;
        bg1.x = this.viewBg.width / 2 - bg1.width / 2;
        bg1.y = startY;
        this._nodeContainer.addChild(bg1);
        bg1.name = "bg1";
        var bg2 = BaseBitmap.create("public_9_bg33");
        bg2.width = bg1.width;
        bg2.height = 40;
        bg2.x = bg1.x;
        bg2.y = bg1.y;
        this._nodeContainer.addChild(bg2);
        bg2.name = "bg2";
        var bg3 = BaseBitmap.create("public_9_bg1");
        bg3.width = bg1.width;
        bg3.height = 100 - 4;
        bg3.x = bg1.x;
        bg3.y = bg1.y + bg1.height + 9;
        this._nodeContainer.addChild(bg3);
        bg3.name = "bg3";
    };
    AllianceBossRankPopupView.prototype.initContentAfterNet = function (uidata) {
        var bg1 = this._nodeContainer.getChildByName("bg1");
        var bg2 = this._nodeContainer.getChildByName("bg2");
        var bg3 = this._nodeContainer.getChildByName("bg3");
        var titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("allianceBossRank_title1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = bg2.x + 30;
        titleTxt1.y = bg2.y + 8;
        this._nodeContainer.addChild(titleTxt1);
        var titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("allianceBossRank_title2"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt2.x = bg2.x + 220;
        titleTxt2.y = titleTxt1.y;
        this._nodeContainer.addChild(titleTxt2);
        // let titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("allianceBossRank_title3"),titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        // titleTxt3.x = bg2.x+ 340 - titleTxt3.width/2;
        // titleTxt3.y = titleTxt1.y;
        // this._nodeContainer.addChild(titleTxt3);
        var titleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("allianceBossRank_title4"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt4.x = bg2.x + 450 - titleTxt4.width / 2;
        titleTxt4.y = titleTxt1.y;
        this._nodeContainer.addChild(titleTxt4);
        var bossName = LanguageManager.getlocal("allianceBoss_monsterName" + this._bossId);
        var allianceBosskill = uidata.allianceBosskill;
        var limitlessBossId = Api.allianceVoApi.getLimitlessBossId();
        if (limitlessBossId == this._bossId) {
            this._topTipTF.text = LanguageManager.getlocal("allianceBossRank_topTip1", [bossName]);
        }
        else if (allianceBosskill.length > 0) {
            if (this._isElite) {
                this._topTipTF.text = LanguageManager.getlocal("allianceBossRank_topTip", [allianceBosskill[1], bossName, "0", "0"]);
            }
            else {
                var bossCfg = Config.AlliancebossCfg.getAllianceCfgByLv(this._bossId);
                this._topTipTF.text = LanguageManager.getlocal("allianceBossRank_topTip", [allianceBosskill[1], bossName, String(bossCfg.addAsset), String(bossCfg.addExp)]);
            }
        }
        else {
            if (this._isElite) {
                this._topTipTF.text = LanguageManager.getlocal("allianceBossRank_topTip", ["", bossName, "0", "0"]);
            }
            else {
                var bossCfg = Config.AlliancebossCfg.getAllianceCfgByLv(this._bossId);
                this._topTipTF.text = LanguageManager.getlocal("allianceBossRank_topTip", ["", bossName, String(bossCfg.addAsset), String(bossCfg.addExp)]);
            }
        }
        this._topTipTF.x = this.viewBg.width / 2 - this._topTipTF.width / 2;
        this._topTipTF.visible = true;
        if (PlatformManager.checkIsEnLang()) {
            this._topTipTF.width = 500;
            this._topTipTF.size = 18;
            this._topTipTF.x = this.viewBg.width / 2 - this._topTipTF.width / 2;
            if (this._topTipTF.height > 30) {
                this._topTipTF.y -= 5;
            }
        }
        var dataList = uidata.allianceBossRank;
        var myName = Api.playerVoApi.getPlayerName();
        var myrData = [LanguageManager.getlocal("atkracedes4"), "0", "0"];
        for (var key in dataList) {
            if (dataList[key][0] == myName) {
                myrData[0] = String(Number(key) + 1);
                myrData[1] = dataList[key][1];
                myrData[2] = dataList[key][2];
                break;
            }
        }
        var nickTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nickTxt.text = LanguageManager.getlocal("allianceBossRank_title5", [Api.playerVoApi.getPlayerName()]);
        nickTxt.x = bg3.x + 20;
        nickTxt.y = bg3.y + 20;
        this._nodeContainer.addChild(nickTxt);
        var myRankTxt = ComponentManager.getTextField("", nickTxt.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        myRankTxt.text = LanguageManager.getlocal("allianceBossRank_title6", [myrData[0]]);
        myRankTxt.x = myRankTxt.x + 320;
        myRankTxt.y = nickTxt.y;
        this._nodeContainer.addChild(myRankTxt);
        var hurtvalueTxt = ComponentManager.getTextField("", nickTxt.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        hurtvalueTxt.text = LanguageManager.getlocal("allianceBossRank_title7", [myrData[2]]);
        hurtvalueTxt.x = nickTxt.x;
        hurtvalueTxt.y = nickTxt.y + 40;
        this._nodeContainer.addChild(hurtvalueTxt);
        var addvalueTxt = ComponentManager.getTextField("", nickTxt.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        addvalueTxt.text = LanguageManager.getlocal("allianceBossRank_title8", [myrData[1]]);
        addvalueTxt.x = myRankTxt.x;
        addvalueTxt.y = hurtvalueTxt.y;
        this._nodeContainer.addChild(addvalueTxt);
        var topTipTxt = "allianceBossRank_topTip";
        var rect = new egret.Rectangle(0, 0, this.viewBg.width, bg1.height - 60);
        var scrollView = ComponentManager.getScrollList(AllianceBossRankScrollItem, dataList, rect);
        scrollView.setEmptyTip(LanguageManager.getlocal("allianceBossRank_emptyTip"));
        scrollView.x = GameData.popupviewOffsetX;
        scrollView.y = bg2.y + 50;
        this._nodeContainer.addChild(scrollView);
    };
    AllianceBossRankPopupView.prototype.netCallBack = function (event) {
        if (!event.data.ret) {
            return;
        }
        var rdata = event.data.data;
        if (rdata.ret == 0) {
            this.initContentAfterNet(rdata.data);
        }
    };
    AllianceBossRankPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            ,
            "searchbinfowifebg", "progress5", "progress3_bg", "alliance_effect",
        ]);
    };
    AllianceBossRankPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_GETBOSSRANK), this.netCallBack, this);
        // 未婚滑动列表
        this._scrollList = null;
        this._nodeContainer = null;
        this._topTipTF = null;
        this._bossId = null;
        this._isElite = false;
        _super.prototype.dispose.call(this);
    };
    return AllianceBossRankPopupView;
}(PopupView));
__reflect(AllianceBossRankPopupView.prototype, "AllianceBossRankPopupView");
//# sourceMappingURL=AllianceBossRankPopupView.js.map