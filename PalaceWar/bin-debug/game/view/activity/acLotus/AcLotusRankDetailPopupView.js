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
 * 排行榜
 * author ycg
 * date 2020.4.2
 * @class AcLotusRankDetailPopupView
 */
var AcLotusRankDetailPopupView = (function (_super) {
    __extends(AcLotusRankDetailPopupView, _super);
    function AcLotusRankDetailPopupView() {
        var _this = _super.call(this) || this;
        _this._rankData = null;
        return _this;
    }
    Object.defineProperty(AcLotusRankDetailPopupView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    AcLotusRankDetailPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ACLOTUS_GETRANK, requestData: { activeId: this.vo.aidAndCode } };
    };
    AcLotusRankDetailPopupView.prototype.receiveData = function (data) {
        if (!data.ret) {
            return;
        }
        this._rankData = data.data.data;
    };
    AcLotusRankDetailPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg36");
        bg.width = 520;
        bg.height = 575;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 5;
        this.addChildToContainer(bg);
        var topContainer = new BaseDisplayObjectContainer();
        topContainer.width = 520;
        topContainer.height = 35;
        topContainer.setPosition(this.viewBg.x + this.viewBg.width / 2 - topContainer.width / 2, bg.y);
        this.addChildToContainer(topContainer);
        // 排行榜的topbg 
        var rankTopBg = BaseBitmap.create("public_9_bg37");
        rankTopBg.width = topContainer.width;
        rankTopBg.height = 35;
        topContainer.addChild(rankTopBg);
        // 排名 
        var rankTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acLotusRankListRank", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankTF.setPosition(rankTopBg.x + 47, rankTopBg.y + rankTopBg.height / 2 - rankTF.height / 2 + 3);
        topContainer.addChild(rankTF);
        // 玩家昵称 
        var rankPlayNameTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acLotusRankListTopName", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankPlayNameTF.setPosition(rankTopBg.x + rankTopBg.width / 2 - rankPlayNameTF.width / 2 - 10, rankTF.y);
        topContainer.addChild(rankPlayNameTF);
        // 积分
        var scoreTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acLotusRankListTopScoreName", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreTF.setPosition(rankTopBg.x + rankTopBg.width - scoreTF.width - 48, rankTF.y);
        topContainer.addChild(scoreTF);
        //排行榜的ScrollList
        var data = this._rankData.rankArr;
        var rect = new egret.Rectangle(0, 0, topContainer.width, bg.height - topContainer.height);
        var rankScrollList = ComponentManager.getScrollList(AcLotusRankDetailItem, data, rect, { aid: this.aid, code: this.code });
        rankScrollList.setPosition(topContainer.x, topContainer.y + topContainer.height);
        this.addChildToContainer(rankScrollList);
        rankScrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        // 底部bg 
        var bottomBg = BaseBitmap.create("public_9_bg1");
        bottomBg.width = 520;
        bottomBg.height = 112;
        bottomBg.setPosition(bg.x + bg.width / 2 - bottomBg.width / 2, bg.y + bg.height + 5);
        this.addChildToContainer(bottomBg);
        //昵称
        var nickName = Api.playerVoApi.getPlayerName();
        var rankNiceNameTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acLotusRankListPlayerName", this.getTypeCode()), [nickName]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankNiceNameTF.setPosition(bottomBg.x + 40, bottomBg.y + 30);
        this.addChildToContainer(rankNiceNameTF);
        // 我的排名 
        var myRank = null;
        var score = 0;
        if (this._rankData && this._rankData.myrankArr && this._rankData.myrankArr.myrank) {
            myRank = this._rankData.myrankArr.myrank;
            if (myRank > 10000) {
                myRank = "10000+";
            }
            if (this._rankData.myrankArr.value) {
                score = this._rankData.myrankArr.value;
            }
            else {
                score = this.vo.getProcessNum();
            }
        }
        else {
            //未上榜
            myRank = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acLotusRankNotInRank", this.getTypeCode()));
            score = this.vo.getProcessNum();
        }
        var myRankTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acLotusRankListPlayerRank", this.getTypeCode()), [String(myRank)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myRankTF.setPosition(rankNiceNameTF.x, rankNiceNameTF.y + rankNiceNameTF.height + 15);
        this.addChildToContainer(myRankTF);
        //积分
        var myScoreTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acLotusRanklistPlayerScore", this.getTypeCode()), [String(score)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myScoreTF.setPosition(bottomBg.width - 170, myRankTF.y);
        this.addChildToContainer(myScoreTF);
        var tip = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acLotusRankListTip", this.getTypeCode()), ["" + this.cfg.needTimes]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tip.setPosition(bottomBg.x + bottomBg.width - tip.width + 10, bottomBg.y + bottomBg.height + 30);
        this.addChildToContainer(tip);
    };
    Object.defineProperty(AcLotusRankDetailPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLotusRankDetailPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLotusRankDetailPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLotusRankDetailPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcLotusRankDetailPopupView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcLotusRankDetailPopupView.prototype.getShowHeight = function () {
        return 780;
    };
    AcLotusRankDetailPopupView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acLotusRankTitle", this.getTypeCode());
    };
    AcLotusRankDetailPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rankinglist_rankn1",
            "rankinglist_rankn2",
            "rankinglist_rankn3",
            "rankbgs_1",
            "rankbgs_2",
            "rankbgs_3",
            "rankbgs_4",
            "rank_line",
        ]);
    };
    AcLotusRankDetailPopupView.prototype.dispose = function () {
        this._rankData = null;
        _super.prototype.dispose.call(this);
    };
    return AcLotusRankDetailPopupView;
}(PopupView));
__reflect(AcLotusRankDetailPopupView.prototype, "AcLotusRankDetailPopupView");
//# sourceMappingURL=AcLotusRankDetailPopupView.js.map