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
var AcCrossPowerDetailPopupView = (function (_super) {
    __extends(AcCrossPowerDetailPopupView, _super);
    function AcCrossPowerDetailPopupView() {
        return _super.call(this) || this;
    }
    AcCrossPowerDetailPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkracecross_explain_bg", "atkracecross_explain_pic", "crossserverinti_detailbg-1"
        ]);
    };
    AcCrossPowerDetailPopupView.prototype.getTitleStr = function () {
        return "atkracecrossDetailTitle";
    };
    Object.defineProperty(AcCrossPowerDetailPopupView.prototype, "api", {
        get: function () {
            return Api.crossPowerVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossPowerDetailPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossPowerDetailPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossPowerDetailPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcCrossPowerDetailPopupView.prototype.getUiCode = function () {
        var code = "1";
        switch (Number(this.code)) {
            default:
                code = "1";
                if (this.vo.checkIsFengyun()) {
                    code = "7";
                }
                break;
        }
        return code;
    };
    AcCrossPowerDetailPopupView.prototype.initView = function () {
        var typeBg = BaseBitmap.create("public_9_bg4");
        typeBg.width = 524;
        typeBg.height = 664;
        typeBg.setPosition(this.viewBg.width / 2 - typeBg.width / 2, 12);
        this.addChildToContainer(typeBg);
        var topPic = BaseBitmap.create(App.CommonUtil.getResByCode("crosspowerdetailbg", this.getUiCode()));
        topPic.setPosition(this.viewBg.width / 2 - topPic.width / 2, typeBg.y + 4);
        this.addChildToContainer(topPic);
        //区服排名
        var serverRank = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("crossImacyOpenDesc3", this.getUiCode())), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BROWN);
        serverRank.setPosition(topPic.x + 5, topPic.y + topPic.height + 8);
        this.addChildToContainer(serverRank);
        var rankBg = BaseBitmap.create("atkracecross_explain_bg");
        rankBg.width = 518;
        rankBg.height = 35;
        rankBg.setPosition(this.viewBg.width / 2 - rankBg.width / 2, serverRank.y + serverRank.height + 8);
        this.addChildToContainer(rankBg);
        var rankDescStr = App.CommonUtil.getCnByCode("crossPowerDetailDesc1", this.getUiCode());
        var rankDesc = ComponentManager.getTextField(LanguageManager.getlocal(rankDescStr), TextFieldConst.FONTSIZE_CONTENT_SMALL);
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
        var persionDesc = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("crossPowerDetailDesc2", this.getUiCode())), 19);
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
            var str = App.CommonUtil.getCnByCode("crossPowerOpenDesc1", this.getUiCode());
            bottomDesc.text = LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn(str, this.vo.isCrossLeague()));
        }
        else {
            var str = App.CommonUtil.getCnByCode("crossPowerOpenDesc2", this.getUiCode());
            // bottomDesc.text = LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn(`crossPowerOpenDesc2-${this.getUiCode()}`,this.vo.isCrossLeague()));
            bottomDesc.text = LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn(str, this.vo.isCrossLeague()));
        }
        var closeButton = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "sysConfirm", this.hide, this);
        closeButton.setPosition(this.viewBg.width / 2 - closeButton.width / 2, typeBg.y + typeBg.height + 20);
        this.addChildToContainer(closeButton);
    };
    AcCrossPowerDetailPopupView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    AcCrossPowerDetailPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCrossPowerDetailPopupView;
}(PopupView));
__reflect(AcCrossPowerDetailPopupView.prototype, "AcCrossPowerDetailPopupView");
//# sourceMappingURL=AcCrossPowerDetailPopupView.js.map