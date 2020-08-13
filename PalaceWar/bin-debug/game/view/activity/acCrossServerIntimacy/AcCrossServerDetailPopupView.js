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
 * author:qianjun
 * desc:规则详情弹窗
*/
var AcCrossServerDetailPopupView = (function (_super) {
    __extends(AcCrossServerDetailPopupView, _super);
    function AcCrossServerDetailPopupView() {
        return _super.call(this) || this;
    }
    AcCrossServerDetailPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkracecross_explain_bg", "atkracecross_explain_pic", "crossserverinti_detailbg-1"
        ]);
    };
    AcCrossServerDetailPopupView.prototype.getTitleStr = function () {
        return "atkracecrossDetailTitle";
    };
    Object.defineProperty(AcCrossServerDetailPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerDetailPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerDetailPopupView.prototype, "api", {
        get: function () {
            return Api.crossImacyVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerDetailPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerDetailPopupView.prototype.getUiCode = function () {
        var code = "1";
        switch (Number(this.code)) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                code = "1";
                break;
        }
        return code;
    };
    AcCrossServerDetailPopupView.prototype.initView = function () {
        var typeBg = BaseBitmap.create("public_9_bg4");
        typeBg.width = 524;
        typeBg.height = 664;
        typeBg.setPosition(this.viewBg.width / 2 - typeBg.width / 2, 12);
        this.addChildToContainer(typeBg);
        var topPic = BaseBitmap.create("crossserverinti_detailbg-1");
        topPic.setPosition(this.viewBg.width / 2 - topPic.width / 2, typeBg.y + 4);
        this.addChildToContainer(topPic);
        //区服排名
        var serverRank = ComponentManager.getTextField(LanguageManager.getlocal("crossImacyOpenDesc3-" + this.getUiCode()), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BROWN);
        serverRank.setPosition(topPic.x + topPic.width / 2 - serverRank.width / 2, topPic.y + topPic.height + 8);
        this.addChildToContainer(serverRank);
        var rankBg = BaseBitmap.create("atkracecross_explain_bg");
        rankBg.width = 518;
        rankBg.height = 35;
        rankBg.setPosition(this.viewBg.width / 2 - rankBg.width / 2, serverRank.y + serverRank.height + 8);
        this.addChildToContainer(rankBg);
        var rankDesc = ComponentManager.getTextField(LanguageManager.getlocal("crossImacyDetailDesc1-" + this.getUiCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        rankDesc.setPosition(rankBg.x + 20, rankBg.y + 8);
        rankDesc.width = rankBg.width - 40;
        rankDesc.lineSpacing = 6;
        this.addChildToContainer(rankDesc);
        //个人排名
        var persionRank = ComponentManager.getTextField(LanguageManager.getlocal("acPunishRankRewardTab1"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BROWN);
        persionRank.setPosition(serverRank.x, rankBg.y + rankBg.height + 12);
        this.addChildToContainer(persionRank);
        var persionBg = BaseBitmap.create("atkracecross_explain_bg");
        persionBg.width = 518;
        persionBg.height = 65;
        persionBg.setPosition(this.viewBg.width / 2 - persionBg.width / 2, persionRank.y + persionRank.height + 8);
        this.addChildToContainer(persionBg);
        var persionDesc = ComponentManager.getTextField(LanguageManager.getlocal("crossImacyDetailDesc2-" + this.getUiCode()), 19);
        persionDesc.setPosition(persionBg.x + 20, persionBg.y + 12);
        persionDesc.width = rankBg.width - 40;
        persionDesc.lineSpacing = 6;
        this.addChildToContainer(persionDesc);
        //活动日期
        var dateBg = BaseBitmap.create("atkracecross_explain_bg");
        dateBg.width = 518;
        dateBg.height = 45;
        dateBg.setPosition(this.viewBg.width / 2 - dateBg.width / 2, persionBg.y + persionBg.height + 12);
        this.addChildToContainer(dateBg);
        var crossVo = this.vo;
        var timeDesc = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossTime", [crossVo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        timeDesc.x = persionDesc.x;
        timeDesc.y = dateBg.y + 10;
        this.addChildToContainer(timeDesc);
        //底部描述
        var bottomBg = BaseBitmap.create("public_9_bg41");
        bottomBg.width = 492;
        bottomBg.height = 136;
        bottomBg.setPosition(this.viewBg.width / 2 - bottomBg.width / 2, dateBg.y + dateBg.height + 12);
        this.addChildToContainer(bottomBg);
        var bottomDesc = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
        bottomDesc.setPosition(bottomBg.x + 20, bottomBg.y + 12);
        bottomDesc.width = bottomBg.width - 40;
        bottomDesc.height = bottomBg.height - 24;
        bottomDesc.lineSpacing = 6;
        bottomDesc.textAlign = egret.HorizontalAlign.CENTER;
        bottomDesc.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChildToContainer(bottomDesc);
        if (crossVo.getIsCanJoin()) {
            if (this.vo.checkIsTianjiao()) {
                bottomDesc.text = LanguageManager.getlocal("crossImacyOpenDesc1-" + this.getUiCode() + "_tianjiao");
            }
            else {
                bottomDesc.text = LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn("crossImacyOpenDesc1-" + this.getUiCode(), this.vo.isCrossLeague()));
            }
        }
        else {
            if (this.vo.checkIsTianjiao()) {
                bottomDesc.text = LanguageManager.getlocal("crossImacyOpenDesc2-" + this.getUiCode() + "_tianjiao");
            }
            else {
                bottomDesc.text = LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn("crossImacyOpenDesc2-" + this.getUiCode(), this.vo.isCrossLeague()));
            }
        }
        var closeButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "sysConfirm", this.hide, this);
        closeButton.setPosition(this.viewBg.width / 2 - closeButton.width / 2, typeBg.y + typeBg.height + 20);
        this.addChildToContainer(closeButton);
    };
    AcCrossServerDetailPopupView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    AcCrossServerDetailPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerDetailPopupView;
}(PopupView));
__reflect(AcCrossServerDetailPopupView.prototype, "AcCrossServerDetailPopupView");
//# sourceMappingURL=AcCrossServerDetailPopupView.js.map