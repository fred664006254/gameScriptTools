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
 * 转盘活动排名
 * author qianjun
 * @class AcPunishRankPopupView
 */
var AcMayDayRankPopupView = (function (_super) {
    __extends(AcMayDayRankPopupView, _super);
    function AcMayDayRankPopupView() {
        var _this = _super.call(this) || this;
        _this._topBg = null;
        _this._curTabIdx = 0;
        _this._acCDTxt = null;
        _this._acVo = null;
        return _this;
    }
    Object.defineProperty(AcMayDayRankPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcMayDayView.AID, AcMayDayView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMayDayRankPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcMayDayView.AID, AcMayDayView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    AcMayDayRankPopupView.prototype.initView = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var tabName = ["acPunishRankRewardPopupViewTitle", "acPunishRankTab1"];
        var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_WINTAB, tabName, this.tabBtnClickHandler, this);
        tabbarGroup.setSpace(15);
        var tabX = 0;
        var tabY = 0;
        // tabX = this.viewBg.x + 43;
        // tabY = this.viewBg.y + 60;
        tabX = 55;
        tabY = 10;
        tabbarGroup.setPosition(tabX, tabY);
        // tabbarGroup.x = 35;
        // tabbarGroup.y = 15;
        this.addChildToContainer(tabbarGroup);
        var outBg = BaseBitmap.create("public_tc_bg01");
        outBg.width = 540;
        outBg.height = 637;
        outBg.x = this.viewBg.width / 2 - outBg.width / 2;
        outBg.y = 55;
        this.addChildToContainer(outBg);
        this._contentBg = BaseBitmap.create("public_tc_bg03");
        this._contentBg.width = 520;
        this._contentBg.height = 518;
        this._contentBg.x = this.viewBg.x + this.viewBg.width / 2 - this._contentBg.width / 2;
        this._contentBg.y = 65;
        this._contentBg.visible = false;
        this.addChildToContainer(this._contentBg);
        var bottomBg = BaseBitmap.create("public_tc_bg03");
        bottomBg.width = 520;
        bottomBg.x = this.viewBg.x + this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = this._contentBg.y + this._contentBg.height + 8;
        this.addChildToContainer(bottomBg);
        var rankV = "10000+";
        var addV = 0;
        if (this._acData.myrankArr.myrank) {
            rankV = String(this._acData.myrankArr.myrank);
            addV = this._acData.myrankArr.value;
        }
        var myRankStr = LanguageManager.getlocal("acPunishMyrank1", [rankV]);
        this._myRankTF = ComponentManager.getTextField(myRankStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._myRankTF.textAlign = egret.HorizontalAlign.LEFT;
        this._myRankTF.x = bottomBg.x + 30;
        this._myRankTF.y = bottomBg.y + 20;
        this.addChildToContainer(this._myRankTF);
        this._acCDTxt = ComponentManager.getTextField(myRankStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._acCDTxt.y = bottomBg.y + 20;
        this.addChildToContainer(this._acCDTxt);
        //初始化 时间
        var acCfg = this.cfg;
        var deltaT = this._acVo.et - GameData.serverTime - 86400 * 1;
        if (this._acCDTxt && deltaT > 0) {
            this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
        }
        this._acCDTxt.x = bottomBg.x + bottomBg.width - this._acCDTxt.width - 30;
        this._sendDesc = ComponentManager.getTextField(LanguageManager.getlocal(this.vo.code == 1 ? "acRanktip3" : "acRanktip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._sendDesc.x = bottomBg.x + bottomBg.width / 2 - this._sendDesc.width / 2;
        this._sendDesc.y = bottomBg.y + 55;
        this._sendDesc.lineSpacing = 6;
        this._sendDesc.textAlign = egret.HorizontalAlign.CENTER;
        this.addChildToContainer(this._sendDesc);
        var dataList = new Array();
        var cfg = this.cfg;
        for (var index = 0; index < cfg.rankReward.length; index++) {
            dataList.push(cfg.rankReward[index.toString()]);
        }
        var colorstr = App.StringUtil.formatStringColor(LanguageManager.getlocal("acPunishNoData"), TextFieldConst.COLOR_BROWN);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 520, this._contentBg.height);
        this._scrollList = ComponentManager.getScrollList(AcMayDayRankRewardScrollItem, dataList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(outBg.x + outBg.width / 2 - this._scrollList.width / 2, this._contentBg.y);
        this._scrollList.setEmptyTip(colorstr);
        bottomBg.height = this._sendDesc.textHeight + this._sendDesc.y + 15 - bottomBg.y;
        //个人榜单	
        this._topBg = BaseBitmap.create("rank_biao");
        // this._topBg.width = this._contentBg.width;
        // this._topBg.height = 40;
        this._topBg.x = this._contentBg.x + this._contentBg.width / 2 - this._topBg.width / 2;
        this._topBg.y = this._contentBg.y + 10;
        this.addChildToContainer(this._topBg);
        this._topBg.visible = false;
        this._titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._titleTxt1.x = this._contentBg.x + 60;
        this._titleTxt1.y = this._topBg.y + this._topBg.height / 2 - this._titleTxt1.height / 2;
        this.addChildToContainer(this._titleTxt1);
        this._titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title2"), this._titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._titleTF.x = this._contentBg.x + 175;
        this._titleTF.y = this._titleTxt1.y;
        this.addChildToContainer(this._titleTF);
        this._titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acMayDayRankCishu"), this._titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._titleTxt3.x = this._contentBg.x + 430 - this._titleTxt3.width / 2;
        this._titleTxt3.y = this._titleTxt1.y;
        this.addChildToContainer(this._titleTxt3);
        this._titleTxt3.visible = this._titleTxt1.visible = this._titleTF.visible = false;
        this._nickNameTF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._nickNameTF.text = LanguageManager.getlocal("acMayDayRankPopupViewNickname", [Api.playerVoApi.getPlayerName()]);
        this._nickNameTF.x = bottomBg.x + 30;
        this._nickNameTF.y = bottomBg.y + 20;
        this._nickNameTF.visible = false;
        this.addChildToContainer(this._nickNameTF);
        //"allianceBossRank_title5":"玩家昵称 : <font color=0x13851e>{1}</font>",
        this._sendTip = ComponentManager.getTextField(LanguageManager.getlocal("acMayDayRankPopupViewTip", [this.cfg.rankNeedNum.toString()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._sendTip.x = bottomBg.x + bottomBg.width - this._sendTip.width - 30;
        this._sendTip.y = this._nickNameTF.y;
        this._sendTip.visible = false;
        this.addChildToContainer(this._sendTip);
        this._scoreTF = ComponentManager.getTextField("", this._nickNameTF.size, TextFieldConst.COLOR_BROWN);
        this._scoreTF.text = LanguageManager.getlocal("acMayDayMYRankNum", [this.vo.getTurnTotal().toString()]);
        this._scoreTF.x = this._sendTip.x;
        this._scoreTF.y = bottomBg.y + 55;
        this._scoreTF.visible = false;
        this.addChildToContainer(this._scoreTF);
        var rankList = [];
        if (this._acData.rankArr) {
            for (var i in this._acData.rankArr) {
                rankList.push(this._acData.rankArr[i]);
            }
        }
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, 510, this._contentBg.height - 60);
        this._scrollList2 = ComponentManager.getScrollList(AcMayDayRankScrollItem, rankList, rect2);
        this.addChildToContainer(this._scrollList2);
        this._scrollList2.setPosition(this._contentBg.x + 5, this._contentBg.y + 50);
        this._scrollList2.setEmptyTip(colorstr);
        this._scrollList2.visible = false;
    };
    AcMayDayRankPopupView.prototype.tick = function () {
        var cfg = this.cfg;
        var deltaT = this._acVo.et - GameData.serverTime - 86400 * 1;
        if (this._acCDTxt && deltaT > 0) {
            this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
            return true;
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
        }
        return false;
    };
    AcMayDayRankPopupView.prototype.tabBtnClickHandler = function (params) {
        this._curTabIdx = params.index;
        this.refreshRankList();
    };
    AcMayDayRankPopupView.prototype.refreshRankList = function () {
        this._acCDTxt.visible = this._sendDesc.visible = this._scrollList.visible = this._curTabIdx == 0;
        this._topBg.visible = this._contentBg.visible = this._titleTxt3.visible = this._titleTxt1.visible = this._titleTF.visible = this._nickNameTF.visible = this._sendTip.visible = this._scoreTF.visible = this._scrollList2.visible = !this._scrollList.visible;
        this._myRankTF.y = this._curTabIdx == 0 ? (this._acCDTxt.y) : (this._sendDesc.y);
    };
    Object.defineProperty(AcMayDayRankPopupView.prototype, "acTivityId", {
        /**
     * 获取活动配置
     */
        get: function () {
            return AcMayDayView.AID + "-" + AcMayDayView.CODE;
        },
        enumerable: true,
        configurable: true
    });
    AcMayDayRankPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYRANK, requestData: { activeId: this.acTivityId } };
    };
    //请求回调
    AcMayDayRankPopupView.prototype.receiveData = function (data) {
        if (data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYRANK) {
            this._acData = data.data.data;
            this._acVo = Api.acVoApi.getActivityVoByAidAndCode(AcMayDayRankPopupView.aid, AcMayDayRankPopupView.code);
        }
    };
    AcMayDayRankPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AcMayDayRankPopupView.prototype.dispose = function () {
        this._sendDesc = this._sendDesc = null;
        // 未婚滑动列表
        this._scrollList = null;
        this._scrollList2 = null;
        this._myRankTF = null;
        this._nickNameTF = this._acCDTxt = null;
        this._selectChildData = null;
        this._acVo = null;
        this._sendTip = null;
        this._sendDesc = null;
        this._scoreTF = null;
        this._titleTxt1 = null;
        this._titleTF = null;
        this._titleTxt3 = null;
        this._contentBg = null;
        _super.prototype.dispose.call(this);
    };
    AcMayDayRankPopupView.aid = "";
    AcMayDayRankPopupView.code = "";
    return AcMayDayRankPopupView;
}(PopupView));
__reflect(AcMayDayRankPopupView.prototype, "AcMayDayRankPopupView");
