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
 * 场景奖励预览
 * author qianjun
 */
var AcTreasureHuntOfficeView = (function (_super) {
    __extends(AcTreasureHuntOfficeView, _super);
    function AcTreasureHuntOfficeView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcTreasureHuntOfficeView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureHuntOfficeView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureHuntOfficeView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureHuntOfficeView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcTreasureHuntOfficeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "treasurescenebg-" + this.code, 'servant_detailBtn'
        ]);
    };
    AcTreasureHuntOfficeView.prototype.initView = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        var bg = BaseBitmap.create("treasurescenebg-" + view.code);
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
        view.addChildToContainer(bg);
        var detailBtn = ComponentManager.getButton("servant_detailBtn", "", view.detailBtnHandler, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, detailBtn, bg, [5, 35]);
        view.addChildToContainer(detailBtn);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acTreasureOfficeTip1-" + view.code), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, bg, [0, 5]);
        var line = BaseBitmap.create("public_line3");
        line.width = 400;
        view.addChildToContainer(line);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, tipTxt, [0, tipTxt.textHeight + 15]);
        var tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acTreasureOfficeTip2-" + view.code), 22, TextFieldConst.COLOR_WHITE);
        view.addChildToContainer(tipTxt2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt2, line);
        var tipTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acTreasureOfficeTip3-" + view.code), 20, TextFieldConst.COLOR_WHITE);
        view.addChildToContainer(tipTxt3);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt3, tipTxt2, [0, tipTxt2.textHeight + 5]);
        var tipTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("acTreasureOfficeTip4-" + view.code), 20, TextFieldConst.COLOR_WHITE);
        view.addChildToContainer(tipTxt4);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipTxt4, bg, [0, 10]);
    };
    AcTreasureHuntOfficeView.prototype.detailBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.CHANGEBGDETAILPOPUPVIEW, {
            scene: 'searchScene',
            key: '302',
        });
    };
    AcTreasureHuntOfficeView.prototype.getShowHeight = function () {
        return 805;
    };
    AcTreasureHuntOfficeView.prototype.getShowWidth = function () {
        return 560;
    };
    AcTreasureHuntOfficeView.prototype.getTitleStr = function () {
        return "acTreasureOfficeTitle-" + this.code;
    };
    AcTreasureHuntOfficeView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcTreasureHuntOfficeView;
}(PopupView));
__reflect(AcTreasureHuntOfficeView.prototype, "AcTreasureHuntOfficeView");
//# sourceMappingURL=AcTreasureHuntOfficeView.js.map