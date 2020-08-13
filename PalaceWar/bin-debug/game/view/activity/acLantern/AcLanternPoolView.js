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
 * 奖励预览
 * author qianjun
 */
var AcLanternPoolView = (function (_super) {
    __extends(AcLanternPoolView, _super);
    function AcLanternPoolView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcLanternPoolView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLanternPoolView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLanternPoolView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLanternPoolView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcLanternPoolView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
            case 3:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcLanternPoolView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "public_textbrownbg",
        ]);
    };
    AcLanternPoolView.prototype.getBgName = function () {
        return "popupview_bg3";
    };
    AcLanternPoolView.prototype.getCloseBtnName = function () {
        return "popupview_closebtn2";
    };
    AcLanternPoolView.prototype.initView = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        var tipbg = BaseBitmap.create("public_textbrownbg");
        tipbg.width = 510;
        view.addChildToContainer(tipbg);
        tipbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - tipbg.width / 2, 10);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("aclanterntip6", view.getUiCode())), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipbg);
        view.addChildToContainer(tipTxt);
        var rewards = view.cfg.getWealthGod();
        var rewardArr = GameData.getRewardItemIcons(rewards, true, true); //view.cfg.getWealthGod()
        var listbg = BaseBitmap.create("public_9_bg94");
        listbg.width = 520;
        listbg.height = 260;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, tipbg, [0, tipbg.height + 55]);
        view.addChildToContainer(listbg);
        var tip2Txt = ComponentManager.getTextField(LanguageManager.getlocal("dailyTask_rewardTip"), 18, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip2Txt, listbg, [3, -tip2Txt.height - 2]);
        view.addChildToContainer(tip2Txt);
        var scrolNode = new BaseDisplayObjectContainer();
        view.addChildToContainer(scrolNode);
        for (var i in rewardArr) {
            var icon = rewardArr[i];
            var idx = Number(i);
            icon.x = 9 + (idx % 4) * (108 + 20);
            icon.y = 5 + Math.floor(idx / 4) * (108 + 8);
            scrolNode.addChild(icon);
        }
        scrolNode.height = Math.ceil(rewardArr.length / 4) * (108 + 8);
        scrolNode.width = listbg.width - 20;
        var rect = new egret.Rectangle(listbg.x + 10, listbg.y + 5, listbg.width - 20, listbg.height - 10);
        var scrollview = ComponentManager.getScrollView(scrolNode, rect);
        scrollview.bounces = false;
        scrollview.x = listbg.x + 10;
        scrollview.y = listbg.y + 12;
        scrollview.horizontalScrollPolicy = 'off';
        this.addChildToContainer(scrollview);
        var btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", function () {
            view.hide();
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, listbg, [0, listbg.height + 25]);
        this.addChildToContainer(btn);
    };
    AcLanternPoolView.prototype.getShowHeight = function () {
        return 540;
    };
    AcLanternPoolView.prototype.getTitleStr = function () {
        return "motherdaypoolreward-" + this.getUiCode();
    };
    AcLanternPoolView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcLanternPoolView;
}(PopupView));
__reflect(AcLanternPoolView.prototype, "AcLanternPoolView");
//# sourceMappingURL=AcLanternPoolView.js.map