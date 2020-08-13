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
var EmperorWarDetailPopupView = (function (_super) {
    __extends(EmperorWarDetailPopupView, _super);
    function EmperorWarDetailPopupView() {
        return _super.call(this) || this;
    }
    EmperorWarDetailPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkracecross_explain_bg", "atkracecross_explain_pic", "crossserverinti_detailbg-1", "emprulebg"
        ]);
    };
    EmperorWarDetailPopupView.prototype.getTitleStr = function () {
        return "atkracecrossDetailTitle";
    };
    Object.defineProperty(EmperorWarDetailPopupView.prototype, "api", {
        get: function () {
            return Api.emperorwarVoApi;
        },
        enumerable: true,
        configurable: true
    });
    EmperorWarDetailPopupView.prototype.initView = function () {
        var view = this;
        var typeBg = BaseBitmap.create("public_9_bg4");
        typeBg.width = 524;
        typeBg.height = 664;
        typeBg.setPosition(this.viewBg.width / 2 - typeBg.width / 2, 12);
        this.addChildToContainer(typeBg);
        var topPic = BaseBitmap.create("emprulebg");
        topPic.setPosition(this.viewBg.width / 2 - topPic.width / 2, typeBg.y + 4);
        this.addChildToContainer(topPic);
        //区服排名
        var serverRank = ComponentManager.getTextField(LanguageManager.getlocal("emperorReward"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BROWN);
        serverRank.setPosition(topPic.x + 5, topPic.y + topPic.height + 8);
        this.addChildToContainer(serverRank);
        var rankBg = BaseBitmap.create("atkracecross_explain_bg");
        rankBg.width = 518;
        rankBg.height = 35;
        rankBg.setPosition(this.viewBg.width / 2 - rankBg.width / 2, serverRank.y + serverRank.height + 8);
        this.addChildToContainer(rankBg);
        var rankDesc = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarRule5"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        rankDesc.setPosition(rankBg.x + 20, rankBg.y + 8);
        rankDesc.width = rankBg.width - 40;
        rankDesc.lineSpacing = 6;
        this.addChildToContainer(rankDesc);
        //个人排名
        var persionRank = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarRule4"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BROWN);
        persionRank.setPosition(serverRank.x, rankBg.y + rankBg.height + 12);
        this.addChildToContainer(persionRank);
        var persionBg = BaseBitmap.create("atkracecross_explain_bg");
        persionBg.width = 518;
        persionBg.height = 65;
        persionBg.setPosition(this.viewBg.width / 2 - persionBg.width / 2, persionRank.y + persionRank.height + 8);
        this.addChildToContainer(persionBg);
        var persionDesc = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarRule1"), 19);
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
        var timeDesc = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossTime", [App.DateUtil.getOpenLocalTime(view.api.getVersion(), view.api.emperorwarActiveVo.getPeriod(5), true)]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        //LanguageManager.getlocal("atkracecrossTime",[crossVo.acTimeAndHour])
        timeDesc.x = persionDesc.x;
        timeDesc.y = dateBg.y + 10;
        this.addChildToContainer(timeDesc);
        //底部描述
        var bottomBg = BaseBitmap.create("public_9_bg41");
        bottomBg.width = 492;
        bottomBg.height = 160;
        if (PlatformManager.checkIsEnSp()) {
            bottomBg.height = 180;
        }
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
        if (view.api.isCanJoinWar()) {
            bottomDesc.text = LanguageManager.getlocal("emperorWarRule2");
        }
        else {
            bottomDesc.text = LanguageManager.getlocal("emperorWarRule3");
        }
        bottomDesc.textAlign = egret.HorizontalAlign.LEFT;
        var closeButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "sysConfirm", this.hide, this);
        closeButton.setPosition(this.viewBg.width / 2 - closeButton.width / 2, typeBg.y + typeBg.height + 20);
        this.addChildToContainer(closeButton);
    };
    EmperorWarDetailPopupView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    EmperorWarDetailPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return EmperorWarDetailPopupView;
}(PopupView));
__reflect(EmperorWarDetailPopupView.prototype, "EmperorWarDetailPopupView");
//# sourceMappingURL=EmperorWarDetailPopupView.js.map