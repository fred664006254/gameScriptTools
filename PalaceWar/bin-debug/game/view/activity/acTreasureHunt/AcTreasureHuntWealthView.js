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
 * 财神庙奖励预览
 * author qianjun
 */
var AcTreasureHuntWealthView = (function (_super) {
    __extends(AcTreasureHuntWealthView, _super);
    function AcTreasureHuntWealthView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcTreasureHuntWealthView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureHuntWealthView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureHuntWealthView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureHuntWealthView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcTreasureHuntWealthView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcTreasureHuntWealthView.prototype.initView = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        var bg = BaseBitmap.create("treasurewealthtop-" + view.code);
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
        view.addChildToContainer(bg);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acTreasureWealthTip-" + view.code), 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, bg, [0, bg.height + 10]);
        view.addChildToContainer(tipTxt);
        var row = Math.min(Math.ceil(view.cfg.wealthGod.length / 5), 4);
        var height = 108 * 0.9 * row + (row - 1) * 8 + 5;
        var listbg = BaseBitmap.create("public_9_probiginnerbg");
        listbg.width = 530;
        listbg.height = height + 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, tipTxt, [0, tipTxt.textHeight + 10]);
        view.addChildToContainer(listbg);
        for (var i in view.cfg.wealthGod) {
            var reward = view.cfg.wealthGod[i][0];
            var rIcon = GameData.getRewardItemIcons(reward, true, true);
            var icon = rIcon[0];
            var idx = Number(i);
            icon.setScale(0.9);
            icon.x = listbg.x + (listbg.width - (Math.min(5, view.cfg.wealthGod.length)) * 108 * 0.9 - (Math.min(5, view.cfg.wealthGod.length) - 1) * 8) / 2 + (idx % 5) * (108 * 0.9 + 8);
            icon.y = listbg.y + 5 + Math.floor(idx / 5) * (108 * 0.9 + 5);
            view.addChildToContainer(icon);
        }
    };
    AcTreasureHuntWealthView.prototype.getShowHeight = function () {
        var row = Math.min(Math.ceil(this.cfg.wealthGod.length / 5), 4);
        var height = 108 * 0.9 * row + (row - 1) * 8 + 5;
        return 335 + height;
    };
    AcTreasureHuntWealthView.prototype.getShowWidth = function () {
        return 560;
    };
    AcTreasureHuntWealthView.prototype.getTitleStr = function () {
        return "acTreasureWealthTitle-" + this.code;
    };
    AcTreasureHuntWealthView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcTreasureHuntWealthView;
}(PopupView));
__reflect(AcTreasureHuntWealthView.prototype, "AcTreasureHuntWealthView");
//# sourceMappingURL=AcTreasureHuntWealthView.js.map