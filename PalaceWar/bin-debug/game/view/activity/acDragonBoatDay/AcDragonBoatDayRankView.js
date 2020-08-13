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
 * 活动排名
 * author qianjun
 */
var AcDragonBoatDayRankView = (function (_super) {
    __extends(AcDragonBoatDayRankView, _super);
    function AcDragonBoatDayRankView() {
        var _this = _super.call(this) || this;
        _this._topBg = null;
        _this._curTabIdx = 0;
        _this._acCDTxt = null;
        return _this;
    }
    Object.defineProperty(AcDragonBoatDayRankView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDragonBoatDayRankView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDragonBoatDayRankView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcDragonBoatDayRankView.prototype.getTypeCode = function () {
        var code = this.param.data.code;
        if (code == '6') {
            code = '3';
        }
        return code;
    };
    AcDragonBoatDayRankView.prototype.initView = function () {
        var tabName = ["acPunishRankRewardPopupViewTitle", "acPunishRankTab1"];
        var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, tabName, this.tabBtnClickHandler, this);
        tabbarGroup.x = 35 + GameData.popupviewOffsetX;
        tabbarGroup.y = 15;
        this.addChildToContainer(tabbarGroup);
        var contentBg = BaseBitmap.create("public_9_probiginnerbg");
        contentBg.width = 518;
        contentBg.height = 522;
        contentBg.x = this.viewBg.x + this.viewBg.width / 2 - contentBg.width / 2;
        contentBg.y = 60;
        this.addChildToContainer(contentBg);
        var bottomBg = BaseBitmap.create("public_9_probiginnerbg");
        bottomBg.width = 518;
        bottomBg.x = this.viewBg.x + this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = contentBg.y + contentBg.height + 5;
        this.addChildToContainer(bottomBg);
        var rankV = "10000+";
        var addV = 0;
        if (this._acData.myrankArr.myrank) {
            rankV = String(this._acData.myrankArr.myrank);
            addV = this._acData.myrankArr.value;
        }
        var myRankStr = LanguageManager.getlocal("acPunishMyrank1", [rankV]);
        this._myRankTF = ComponentManager.getTextField(myRankStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._myRankTF.textAlign = egret.HorizontalAlign.LEFT;
        this._myRankTF.x = bottomBg.x + 60;
        this._myRankTF.y = bottomBg.y + 15;
        this.addChildToContainer(this._myRankTF);
        this._acCDTxt = ComponentManager.getTextField(myRankStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._acCDTxt.x = bottomBg.x + 280;
        this._acCDTxt.y = bottomBg.y + 15;
        this.addChildToContainer(this._acCDTxt);
        //初始化 时间
        var acCfg = this.cfg;
        var deltaT = this.vo.et - GameData.serverTime - 86400 * 1;
        if (this._acCDTxt && deltaT > 0) {
            this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
        }
        this._sendDesc = ComponentManager.getTextField(LanguageManager.getlocal("acRanktip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._sendDesc.x = (518 - this._sendDesc.textWidth) / 2 + bottomBg.x;
        this._sendDesc.y = bottomBg.y + 50;
        this._sendDesc.lineSpacing = 6;
        this._sendDesc.textAlign = egret.HorizontalAlign.CENTER;
        this.addChildToContainer(this._sendDesc);
        var dataList = new Array();
        var cfg = this.cfg;
        for (var i in cfg.rankReward) {
            dataList.push(cfg.rankReward[i]);
        }
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 508, contentBg.height - 20);
        this._scrollList = ComponentManager.getScrollList(AcDragonBoatRankRewardScrollItem, dataList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(contentBg.x + 5, contentBg.y + 10);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        bottomBg.height = this._sendDesc.textHeight + this._sendDesc.y + 17 - bottomBg.y;
        //个人榜单	
        var bg2 = BaseBitmap.create("public_9_bg24");
        bg2.width = contentBg.width;
        bg2.height = 40;
        bg2.x = contentBg.x;
        bg2.y = contentBg.y;
        this.addChildToContainer(bg2);
        this._topBg = bg2;
        this._topBg.visible = false;
        this._titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._titleTxt1.x = contentBg.x + 40;
        this._titleTxt1.y = contentBg.y + 8;
        this.addChildToContainer(this._titleTxt1);
        this._titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title2"), this._titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._titleTF.x = contentBg.x + 175;
        this._titleTF.y = this._titleTxt1.y;
        this.addChildToContainer(this._titleTF);
        this._titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("DragonBoatDayZziNum_" + this.param.data.code), this._titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._titleTxt3.x = contentBg.x + 430 - this._titleTxt3.width / 2;
        this._titleTxt3.y = this._titleTxt1.y;
        this.addChildToContainer(this._titleTxt3);
        this._titleTxt3.visible = this._titleTxt1.visible = this._titleTF.visible = false;
        this._nickNameTF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._nickNameTF.text = LanguageManager.getlocal("acRank_mynick") + Api.playerVoApi.getPlayerName();
        this._nickNameTF.x = bottomBg.x + 66;
        this._nickNameTF.y = bottomBg.y + (bottomBg.height - this._nickNameTF.textHeight * 2 - 20) / 2;
        this._nickNameTF.visible = false;
        this.addChildToContainer(this._nickNameTF);
        this._scoreTF = ComponentManager.getTextField("", this._nickNameTF.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._scoreTF.text = LanguageManager.getlocal("DragonBoatDayMYRankNum_" + this.param.data.code, [this.vo.getZongzi().toString()]);
        this._scoreTF.x = this._nickNameTF.x + 214;
        this._scoreTF.y = this._nickNameTF.y + this._nickNameTF.textHeight + 20;
        this._scoreTF.visible = false;
        this.addChildToContainer(this._scoreTF);
        this._sendTip = ComponentManager.getTextField(LanguageManager.getlocal("DragonBoatDayTip_" + this.param.data.code, [this.cfg.rankNeed.toString()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._sendTip.x = this._nickNameTF.x + 214;
        this._sendTip.y = this._nickNameTF.y;
        this._sendTip.visible = false;
        this.addChildToContainer(this._sendTip);
        var rankList = [];
        if (this._acData.rankArr) {
            for (var i in this._acData.rankArr) {
                rankList.push(this._acData.rankArr[i]);
            }
        }
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, 508, contentBg.height - 60);
        this._scrollList2 = ComponentManager.getScrollList(AcDragonBoatDayRankItem, rankList, rect2);
        this.addChildToContainer(this._scrollList2);
        this._scrollList2.setPosition(contentBg.x + 5, contentBg.y + 50);
        this._scrollList2.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        this._scrollList2.visible = false;
    };
    AcDragonBoatDayRankView.prototype.tick = function () {
        var cfg = this.cfg;
        var deltaT = this.vo.et - GameData.serverTime - 86400 * 1;
        if (this._acCDTxt && deltaT > 0) {
            this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
            return true;
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
        }
        return false;
    };
    AcDragonBoatDayRankView.prototype.tabBtnClickHandler = function (params) {
        this._curTabIdx = params.index;
        this.refreshRankList();
    };
    AcDragonBoatDayRankView.prototype.refreshRankList = function () {
        this._acCDTxt.visible = this._sendDesc.visible = this._scrollList.visible = this._curTabIdx == 0;
        this._topBg.visible = this._titleTxt3.visible = this._titleTxt1.visible = this._titleTF.visible = this._nickNameTF.visible = this._sendTip.visible = this._scoreTF.visible = this._scrollList2.visible = !this._scrollList.visible;
        this._myRankTF.y = this._curTabIdx == 0 ? (this._acCDTxt.y) : (this._nickNameTF.y + 42);
    };
    AcDragonBoatDayRankView.prototype.getRequestData = function () {
        // ["activity.getdragonrank"] = "划龙舟活动排行榜",
        // --返回 data.rankArr 所有人排行信息
        // --返回 data.myrankArr 我的排行信息
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_DBRANK, requestData: { activeId: this.acTivityId } };
    };
    //请求回调
    AcDragonBoatDayRankView.prototype.receiveData = function (data) {
        if (data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_DBRANK) {
            this._acData = data.data.data;
            //this._acVo = <AcMayDayVo>Api.acVoApi.getActivityVoByAidAndCode(AcMayDayRankPopupView.aid,AcMayDayRankPopupView.code);
        }
    };
    AcDragonBoatDayRankView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AcDragonBoatDayRankView.prototype.dispose = function () {
        this._sendDesc = this._sendDesc = null;
        // 未婚滑动列表
        this._scrollList = null;
        this._scrollList2 = null;
        this._myRankTF = null;
        this._nickNameTF = this._acCDTxt = null;
        this._selectChildData = null;
        this._sendTip = null;
        this._sendDesc = null;
        this._scoreTF = null;
        this._titleTxt1 = null;
        this._titleTF = null;
        this._titleTxt3 = null;
        _super.prototype.dispose.call(this);
    };
    return AcDragonBoatDayRankView;
}(PopupView));
__reflect(AcDragonBoatDayRankView.prototype, "AcDragonBoatDayRankView");
//# sourceMappingURL=AcDragonBoatDayRankView.js.map