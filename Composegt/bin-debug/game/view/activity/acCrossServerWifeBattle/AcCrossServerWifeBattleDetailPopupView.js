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
var AcCrossServerWifeBattleDetailPopupView = (function (_super) {
    __extends(AcCrossServerWifeBattleDetailPopupView, _super);
    function AcCrossServerWifeBattleDetailPopupView() {
        return _super.call(this) || this;
    }
    AcCrossServerWifeBattleDetailPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkracecross_explain_bg", "atkracecross_explain_pic", "accrossserverwifebattle_desctitle"
        ]);
    };
    AcCrossServerWifeBattleDetailPopupView.prototype.getTitleStr = function () {
        return "atkracecrossDetailTitle";
    };
    Object.defineProperty(AcCrossServerWifeBattleDetailPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWifeBattleDetailPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWifeBattleDetailPopupView.prototype, "api", {
        get: function () {
            return Api.crossImacyVoApi;
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWifeBattleDetailPopupView.prototype.initView = function () {
        var typeBg = BaseBitmap.create("public_tc_bg01");
        typeBg.width = 540;
        typeBg.height = 664;
        typeBg.setPosition(this.viewBg.width / 2 - typeBg.width / 2, 12);
        this.addChildToContainer(typeBg);
        var map = "accrossserverwifebattle_desctitle-" + this.vo.code;
        if (!RES.hasRes(map)) {
            map = "accrossserverwifebattle_desctitle";
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
        var serverRank = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerWifeBattleOpenDesc3-" + this.vo.code), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        serverRank.setPosition(topPic.x + 15, topPic.y + topPic.height + 15);
        this.addChildToContainer(serverRank);
        var rankDesc = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerWifeBattleDetailDesc1-" + this.vo.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        rankDesc.setPosition(serverRank.x, serverRank.y + 32);
        rankDesc.width = 480;
        rankDesc.lineSpacing = 6;
        this.addChildToContainer(rankDesc);
        //个人排名
        var persionRank = ComponentManager.getTextField(LanguageManager.getlocal("acPunishRankRewardTab1"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        persionRank.setPosition(serverRank.x, rankDesc.y + 87);
        this.addChildToContainer(persionRank);
        var persionDesc = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerWifeBattleDetailDesc2-" + this.vo.code), 19, TextFieldConst.COLOR_WHITE);
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
        if (crossVo.isCanJoin) {
            bottomDesc.text = LanguageManager.getlocal("acCrossServerWifeBattleOpenDesc1-" + crossVo.code);
        }
        else {
            bottomDesc.text = LanguageManager.getlocal("acCrossServerWifeBattleOpenDesc2-" + crossVo.code);
        }
        var closeButton = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "sysConfirm", this.hide, this);
        closeButton.setPosition(this.viewBg.width / 2 - closeButton.width / 2, typeBg.y + typeBg.height + 20);
        this.addChildToContainer(closeButton);
    };
    AcCrossServerWifeBattleDetailPopupView.prototype.hide = function () {
        AcCrossServerWifeBattleView.isOpenWin = false;
        _super.prototype.hide.call(this);
    };
    AcCrossServerWifeBattleDetailPopupView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    AcCrossServerWifeBattleDetailPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWifeBattleDetailPopupView;
}(PopupView));
__reflect(AcCrossServerWifeBattleDetailPopupView.prototype, "AcCrossServerWifeBattleDetailPopupView");
