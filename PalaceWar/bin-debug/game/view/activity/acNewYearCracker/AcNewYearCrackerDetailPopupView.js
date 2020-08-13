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
 * 活动详情介绍
 * author qianjun
 */
var AcNewYearCrackerDetailPopupView = (function (_super) {
    __extends(AcNewYearCrackerDetailPopupView, _super);
    function AcNewYearCrackerDetailPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcNewYearCrackerDetailPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewYearCrackerDetailPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewYearCrackerDetailPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewYearCrackerDetailPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcNewYearCrackerDetailPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "accrackerpopdescbg-" + this.code, "accrackerdetailbg1-" + this.code, "accrackerdetailbg2-" + this.code
        ]);
    };
    AcNewYearCrackerDetailPopupView.prototype.initView = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        var descbg = BaseBitmap.create("accrackerpopdescbg-" + view.code);
        descbg.setPosition(view.viewBg.x + view.viewBg.width / 2 - descbg.width / 2, 0);
        view.addChildToContainer(descbg);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acNewYearCrackerDetailTip-" + view.code), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.lineSpacing = 5;
        tipTxt.width = 475;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, descbg, [0, 10]);
        view.addChildToContainer(tipTxt);
        var bg = BaseBitmap.create("accrackerpopbg-" + view.code);
        bg.width = 530;
        bg.height = 538;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, descbg, [0, descbg.height + 8]);
        view.addChildToContainer(bg);
        var scene1 = BaseBitmap.create("accrackerdetailbg1-" + view.code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scene1, bg, [0, 5]);
        view.addChildToContainer(scene1);
        var scene2 = BaseBitmap.create("accrackerdetailbg2-" + view.code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scene2, scene1, [0, scene1.height]);
        view.addChildToContainer(scene2);
        var btn1 = ComponentManager.getButton("accrackerckan-" + view.code, '', function () {
            //打开爆竹奖励界面
            //打开奖励弹窗
            ViewController.getInstance().openView(ViewConst.POPUP.ACNEWYEARCRACKERREWARDPOPUPVIEW, {
                aid: view.aid,
                code: view.code,
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, btn1, scene1, [85, 15]);
        view.addChildToContainer(btn1);
        var tipTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acNewYearCrackerDetailTip1-" + view.code), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt1.lineSpacing = 5;
        tipTxt1.width = 275;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt1, scene1, [210, 85]);
        view.addChildToContainer(tipTxt1);
        var btn2 = ComponentManager.getButton("accrackerckan-" + view.code, '', function () {
            //打开任务奖励界面
            //打开奖励弹窗
            ViewController.getInstance().openView(ViewConst.COMMON.ACNEWYEARDAILYPACKAGEVIEW, {
                aid: view.aid,
                code: view.code,
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, btn2, scene2, [80, 15]);
        view.addChildToContainer(btn2);
        var tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acNewYearCrackerDetailTip2-" + view.code), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt2.lineSpacing = 5;
        tipTxt2.width = 275;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt2, scene2, [42, 85]);
        view.addChildToContainer(tipTxt2);
    };
    AcNewYearCrackerDetailPopupView.prototype.getShowHeight = function () {
        return 745;
    };
    AcNewYearCrackerDetailPopupView.prototype.getShowWidth = function () {
        return 560;
    };
    AcNewYearCrackerDetailPopupView.prototype.getTitleStr = function () {
        return "acNewYearCrackerDetailTitle-" + this.code;
    };
    AcNewYearCrackerDetailPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcNewYearCrackerDetailPopupView;
}(PopupView));
__reflect(AcNewYearCrackerDetailPopupView.prototype, "AcNewYearCrackerDetailPopupView");
//# sourceMappingURL=AcNewYearCrackerDetailPopupView.js.map