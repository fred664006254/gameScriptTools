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
            return Config.AcCfg.getCfgByActivityIdAndCode(AcCrossServerIntimacyView.AID, AcCrossServerIntimacyView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerDetailPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcCrossServerIntimacyView.AID, AcCrossServerIntimacyView.CODE);
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
    AcCrossServerDetailPopupView.prototype.initView = function () {
        var typeBg = BaseBitmap.create("public_tc_bg01");
        typeBg.width = 540;
        typeBg.height = 664;
        typeBg.setPosition(this.viewBg.width / 2 - typeBg.width / 2, 12);
        this.addChildToContainer(typeBg);
        var map = "crossserverinti_detailbg-" + this.vo.code;
        if (!RES.hasRes(map)) {
            map = "crossserverinti_detailbg-1";
        }
        var topPic = BaseBitmap.create(map);
        topPic.setPosition(this.viewBg.width / 2 - topPic.width / 2, typeBg.y + 4);
        this.addChildToContainer(topPic);
        var innerBg = BaseBitmap.create("public_tc_srkbg05");
        innerBg.width = typeBg.width - 20;
        innerBg.height = 350;
        innerBg.setPosition(this.viewBg.width / 2 - innerBg.width / 2, topPic.y + topPic.height + 5);
        this.addChildToContainer(innerBg);
        //区服排名
        var serverRank = ComponentManager.getTextField(LanguageManager.getlocal("crossImacyOpenDesc3-" + this.vo.code), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        serverRank.setPosition(topPic.x + 15, topPic.y + topPic.height + 15);
        this.addChildToContainer(serverRank);
        var rankDesc = ComponentManager.getTextField(LanguageManager.getlocal("crossImacyDetailDesc1-" + this.vo.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        rankDesc.setPosition(serverRank.x, serverRank.y + 32);
        rankDesc.width = 480;
        rankDesc.lineSpacing = 6;
        this.addChildToContainer(rankDesc);
        //个人排名
        var persionRank = ComponentManager.getTextField(LanguageManager.getlocal("acPunishRankRewardTab1"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        persionRank.setPosition(serverRank.x, rankDesc.y + 87);
        this.addChildToContainer(persionRank);
        var persionDesc = ComponentManager.getTextField(LanguageManager.getlocal("crossImacyDetailDesc2-" + this.vo.code), 19, TextFieldConst.COLOR_WHITE);
        persionDesc.setPosition(persionRank.x, persionRank.y + 32);
        persionDesc.width = rankDesc.width;
        persionDesc.lineSpacing = 6;
        this.addChildToContainer(persionDesc);
        var crossVo = this.vo;
        var timeDesc = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossTime", [crossVo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        timeDesc.x = persionDesc.x;
        timeDesc.y = persionDesc.y + 60;
        this.addChildToContainer(timeDesc);
        //底部描述
        var bottomBg = BaseBitmap.create("public_tc_bg03");
        bottomBg.width = typeBg.width - 20;
        bottomBg.height = 90;
        bottomBg.setPosition(this.viewBg.width / 2 - bottomBg.width / 2, typeBg.y + typeBg.height - bottomBg.height - 10);
        this.addChildToContainer(bottomBg);
        var bottomDesc = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
        bottomDesc.setPosition(bottomBg.x + 10, bottomBg.y + 12);
        bottomDesc.width = bottomBg.width - 20;
        bottomDesc.height = bottomBg.height - 24;
        bottomDesc.lineSpacing = 6;
        bottomDesc.textAlign = egret.HorizontalAlign.CENTER;
        bottomDesc.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChildToContainer(bottomDesc);
        if (crossVo.getIsCanJoin()) {
            bottomDesc.text = LanguageManager.getlocal("crossImacyOpenDesc1-" + crossVo.code);
        }
        else {
            bottomDesc.text = LanguageManager.getlocal("crossImacyOpenDesc2-" + crossVo.code);
        }
        var closeButton = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "sysConfirm", this.hide, this);
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
