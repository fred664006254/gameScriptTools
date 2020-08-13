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
var AcDechuanshidaiRewardPoolView = (function (_super) {
    __extends(AcDechuanshidaiRewardPoolView, _super);
    function AcDechuanshidaiRewardPoolView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcDechuanshidaiRewardPoolView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDechuanshidaiRewardPoolView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDechuanshidaiRewardPoolView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDechuanshidaiRewardPoolView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcDechuanshidaiRewardPoolView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 2:
                code = '1';
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcDechuanshidaiRewardPoolView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcDechuanshidaiRewardPoolView.prototype.initView = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acDechuanshidaitip6-" + view.getUiCode()), 20, TextFieldConst.COLOR_BLACK);
        tipTxt.setPosition(this.viewBg.x + this.viewBg.width / 2 - tipTxt.width / 2, 10);
        view.addChildToContainer(tipTxt);
        var rewardArr = GameData.getRewardItemIcons(view.cfg.getWealthGod(), true, true); //view.cfg.getWealthGod()
        var listbg = BaseBitmap.create("public_9_probiginnerbg");
        listbg.width = 520;
        listbg.height = 360;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, tipTxt, [0, tipTxt.textHeight + 10]);
        view.addChildToContainer(listbg);
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
        scrollview.y = listbg.y + 5;
        scrollview.horizontalScrollPolicy = 'off';
        this.addChildToContainer(scrollview);
        var btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", function () {
            view.hide();
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, listbg, [0, listbg.height + 25]);
        this.addChildToContainer(btn);
    };
    AcDechuanshidaiRewardPoolView.prototype.getShowHeight = function () {
        return 560;
    };
    AcDechuanshidaiRewardPoolView.prototype.getTitleStr = function () {
        return "motherdaypoolreward-" + this.getUiCode();
    };
    AcDechuanshidaiRewardPoolView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcDechuanshidaiRewardPoolView;
}(PopupView));
__reflect(AcDechuanshidaiRewardPoolView.prototype, "AcDechuanshidaiRewardPoolView");
//# sourceMappingURL=AcDechuanshidaiRewardPoolView.js.map