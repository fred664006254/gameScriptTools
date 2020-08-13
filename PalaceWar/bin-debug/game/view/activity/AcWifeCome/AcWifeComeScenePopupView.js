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
 * 红颜来了场景奖励预览
 * author ycg
 */
var AcWifeComeScenePopupView = (function (_super) {
    __extends(AcWifeComeScenePopupView, _super);
    function AcWifeComeScenePopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcWifeComeScenePopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWifeComeScenePopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWifeComeScenePopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWifeComeScenePopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcWifeComeScenePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acwifecomeview_scenebg-" + this.code, 'servant_detailBtn'
        ]);
    };
    AcWifeComeScenePopupView.prototype.initView = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        var bg = BaseBitmap.create("acwifecomeview_scenebg-" + this.code);
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
        view.addChildToContainer(bg);
        var detailBtn = ComponentManager.getButton("servant_detailBtn", "", view.detailBtnHandler, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, detailBtn, bg, [5, 35]);
        view.addChildToContainer(detailBtn);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acWifeComeOfficeTip1-" + view.code), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, bg, [0, 5]);
        var line = BaseBitmap.create("public_line3");
        line.width = 400;
        view.addChildToContainer(line);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, tipTxt, [0, tipTxt.textHeight + 15]);
        var tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acWifeComeOfficeTip2-" + view.code), 22, TextFieldConst.COLOR_WHITE);
        view.addChildToContainer(tipTxt2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt2, line);
        var tipTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acWifeComeOfficeTip3-" + view.code), 20, TextFieldConst.COLOR_WHITE);
        view.addChildToContainer(tipTxt3);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt3, tipTxt2, [0, tipTxt2.textHeight + 5]);
        var tipTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("acWifeComeOfficeTip4-" + view.code), 20, TextFieldConst.COLOR_WHITE);
        view.addChildToContainer(tipTxt4);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipTxt4, bg, [0, 5]);
    };
    AcWifeComeScenePopupView.prototype.detailBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.CHANGEBGDETAILPOPUPVIEW, {
            scene: 'homeScene',
            key: this.cfg.sceneID,
        });
    };
    AcWifeComeScenePopupView.prototype.getShowHeight = function () {
        return 795 + 10;
    };
    AcWifeComeScenePopupView.prototype.getShowWidth = function () {
        return 560;
    };
    AcWifeComeScenePopupView.prototype.getTitleStr = function () {
        return "acWifeComeOfficeTitle-" + this.code;
    };
    AcWifeComeScenePopupView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcWifeComeScenePopupView;
}(PopupView));
__reflect(AcWifeComeScenePopupView.prototype, "AcWifeComeScenePopupView");
//# sourceMappingURL=AcWifeComeScenePopupView.js.map