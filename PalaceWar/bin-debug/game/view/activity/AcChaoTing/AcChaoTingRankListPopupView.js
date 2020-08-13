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
 * 朝廷诏令排行榜
 * author ycg
 * date 2020.3.24
 * @class AcChaoTingRankListPopupView
 */
var AcChaoTingRankListPopupView = (function (_super) {
    __extends(AcChaoTingRankListPopupView, _super);
    function AcChaoTingRankListPopupView() {
        var _this = _super.call(this) || this;
        _this._rankData = null;
        return _this;
    }
    Object.defineProperty(AcChaoTingRankListPopupView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    AcChaoTingRankListPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ACCHAOTING_GETRANK, requestData: { activeId: this.vo.aidAndCode } };
    };
    AcChaoTingRankListPopupView.prototype.receiveData = function (data) {
        if (!data.ret) {
            return;
        }
        // console.log(data.data.data);
        this._rankData = data.data.data;
    };
    AcChaoTingRankListPopupView.prototype.initView = function () {
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
        var rankTF = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingRankListRank"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankTF.setPosition(rankTopBg.x + 47, rankTopBg.y + rankTopBg.height / 2 - rankTF.height / 2 + 3);
        topContainer.addChild(rankTF);
        // 玩家昵称 
        var rankPlayNameTF = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingRankListTopName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankPlayNameTF.setPosition(rankTopBg.x + rankTopBg.width / 2 - rankPlayNameTF.width / 2 - 10, rankTF.y);
        topContainer.addChild(rankPlayNameTF);
        // 积分
        var scoreTF = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingRankListTopToolNumName-" + this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreTF.setPosition(rankTopBg.x + rankTopBg.width - scoreTF.width - 45, rankTF.y);
        topContainer.addChild(scoreTF);
        //排行榜的ScrollList
        var data = this._rankData.rankArr;
        var rect = new egret.Rectangle(0, 0, topContainer.width, bg.height - topContainer.height);
        var rankScrollList = ComponentManager.getScrollList(AcChaoTingRankScrollItem, data, rect);
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
        var rankNiceNameTF = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingRankListPlayerName", [nickName]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankNiceNameTF.setPosition(bottomBg.x + 40, bottomBg.y + 30);
        this.addChildToContainer(rankNiceNameTF);
        // 我的排名 
        var myRank = null;
        if (this._rankData && this._rankData.myrankArr && this._rankData.myrankArr.myrank) {
            myRank = this._rankData.myrankArr.myrank;
            if (myRank > 10000) {
                myRank = "10000+";
            }
        }
        else {
            //未上榜
            myRank = LanguageManager.getlocal("acChaotingRankNotInRank");
        }
        var myRankTF = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingRankListPlayerRank", [String(myRank)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myRankTF.setPosition(rankNiceNameTF.x, rankNiceNameTF.y + rankNiceNameTF.height + 15);
        this.addChildToContainer(myRankTF);
        //积分
        var score = this.vo.getToolNum();
        var myScoreTF = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingRanklistPlayerToolNum-" + this.getTypeCode(), [String(score)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myScoreTF.setPosition(bottomBg.width - 170, myRankTF.y);
        this.addChildToContainer(myScoreTF);
        var tip = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingfRankListTip-" + this.getTypeCode(), ["" + this.cfg.number]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tip.setPosition(bottomBg.x + bottomBg.width - tip.width + 10, bottomBg.y + bottomBg.height + 30);
        this.addChildToContainer(tip);
        // if (this.vo.getToolNum() < this.cfg.number){
        //     App.CommonUtil.showTip(LanguageManager.getlocal("acChaotingfRankListTip-"+this.getTypeCode(), [""+this.cfg.number]));
        // }
    };
    Object.defineProperty(AcChaoTingRankListPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcChaoTingRankListPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcChaoTingRankListPopupView.prototype.getTypeCode = function () {
        return this.code;
    };
    Object.defineProperty(AcChaoTingRankListPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcChaoTingRankListPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcChaoTingRankListPopupView.prototype.getShowHeight = function () {
        return 780;
    };
    AcChaoTingRankListPopupView.prototype.getTitleStr = function () {
        return "acChaotingRankListPopupTitle";
    };
    AcChaoTingRankListPopupView.prototype.getResourceList = function () {
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
    AcChaoTingRankListPopupView.prototype.dispose = function () {
        this._rankData = null;
        _super.prototype.dispose.call(this);
    };
    return AcChaoTingRankListPopupView;
}(PopupView));
__reflect(AcChaoTingRankListPopupView.prototype, "AcChaoTingRankListPopupView");
//# sourceMappingURL=AcChaoTingRankListPopupView.js.map