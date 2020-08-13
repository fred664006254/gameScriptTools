var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 天魔铠甲 排行榜
 * author wxz
 * date 2020.6.22
 * @class AcSkyArmorRankDetailPopupView
 */
var AcSkyArmorRankDetailPopupView = /** @class */ (function (_super) {
    __extends(AcSkyArmorRankDetailPopupView, _super);
    function AcSkyArmorRankDetailPopupView() {
        var _this = _super.call(this) || this;
        _this._rankData = null;
        return _this;
    }
    Object.defineProperty(AcSkyArmorRankDetailPopupView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    AcSkyArmorRankDetailPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ACSKYARMOR_GETRANK, requestData: { activeId: this.vo.aidAndCode } };
    };
    AcSkyArmorRankDetailPopupView.prototype.receiveData = function (data) {
        if (!data.ret) {
            return;
        }
        this._rankData = data.data.data;
    };
    AcSkyArmorRankDetailPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 575;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 5;
        this.addChildToContainer(bg);
        var rankbg = BaseBitmap.create("public_popupscrollitembg");
        rankbg.width = 510;
        rankbg.height = 540;
        rankbg.x = this.viewBg.x + this.viewBg.width / 2 - rankbg.width / 2;
        rankbg.y = 30;
        this.addChildToContainer(rankbg);
        var topContainer = new BaseDisplayObjectContainer();
        topContainer.width = 510;
        topContainer.height = 35;
        topContainer.setPosition(this.viewBg.x + this.viewBg.width / 2 - topContainer.width / 2, bg.y + 10);
        this.addChildToContainer(topContainer);
        // 排行榜的topbg 
        var rankTopBg = BaseBitmap.create("public_9_bg37");
        rankTopBg.width = topContainer.width;
        rankTopBg.height = 35;
        topContainer.addChild(rankTopBg);
        // 排名 
        var rankTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acSkyArmorRankListRank", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankTF.setPosition(rankTopBg.x + 47, rankTopBg.y + rankTopBg.height / 2 - rankTF.height / 2 + 3);
        topContainer.addChild(rankTF);
        // 玩家昵称 
        var rankPlayNameTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acSkyArmorRankListTopName", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankPlayNameTF.setPosition(rankTopBg.x + rankTopBg.width / 2 - rankPlayNameTF.width / 2 - 10, rankTF.y);
        topContainer.addChild(rankPlayNameTF);
        // 积分
        var scoreTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acSkyArmorRankListTopScoreName", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreTF.setPosition(rankTopBg.x + rankTopBg.width - scoreTF.width - 48, rankTF.y);
        topContainer.addChild(scoreTF);
        //排行榜的ScrollList
        var data = this._rankData.rankArr;
        var rect = new egret.Rectangle(0, 0, topContainer.width, bg.height - topContainer.height - 30);
        var rankScrollList = ComponentManager.getScrollList(AcSkyArmorRankDetailItem, data, rect, { aid: this.aid, code: this.code });
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
        var rankNiceNameTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acSkyArmorRankListPlayerName", this.getTypeCode()), [nickName]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankNiceNameTF.setPosition(bottomBg.x + 30, bottomBg.y + 30);
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
                score = this.vo.getAchieveNum();
            }
        }
        else {
            //未上榜
            myRank = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acSkyArmorRankNotInRank", this.getTypeCode()));
            score = this.vo.getAchieveNum();
        }
        var myRankTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acSkyArmorRankListPlayerRank", this.getTypeCode()), [String(myRank)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myRankTF.setPosition(rankNiceNameTF.x, rankNiceNameTF.y + rankNiceNameTF.height + 15);
        this.addChildToContainer(myRankTF);
        //积分
        var myScoreTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acSkyArmorRanklistPlayerScore", this.getTypeCode()), [String(score)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myScoreTF.setPosition(bottomBg.width - 100, myRankTF.y);
        this.addChildToContainer(myScoreTF);
        var tip = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acSkyArmorRankListTip", this.getTypeCode()), ["" + this.cfg.needTime]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tip.setPosition(bottomBg.x + bottomBg.width - tip.width + 10, bottomBg.y + bottomBg.height + 30);
        this.addChildToContainer(tip);
    };
    Object.defineProperty(AcSkyArmorRankDetailPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSkyArmorRankDetailPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSkyArmorRankDetailPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSkyArmorRankDetailPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcSkyArmorRankDetailPopupView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcSkyArmorRankDetailPopupView.prototype.getShowHeight = function () {
        return 780;
    };
    AcSkyArmorRankDetailPopupView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acSkyArmorRankTitle", this.getTypeCode());
    };
    AcSkyArmorRankDetailPopupView.prototype.getResourceList = function () {
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
    AcSkyArmorRankDetailPopupView.prototype.dispose = function () {
        this._rankData = null;
        _super.prototype.dispose.call(this);
    };
    return AcSkyArmorRankDetailPopupView;
}(PopupView));
//# sourceMappingURL=AcSkyArmorRankDetailPopupView.js.map