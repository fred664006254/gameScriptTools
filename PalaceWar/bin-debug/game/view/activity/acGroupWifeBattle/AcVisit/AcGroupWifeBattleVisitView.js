/**
 * 风华群芳--来访消息主界面
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcGroupWifeBattleVisitView = /** @class */ (function (_super) {
    __extends(AcGroupWifeBattleVisitView, _super);
    function AcGroupWifeBattleVisitView() {
        var _this = _super.call(this) || this;
        _this._mainTaskHandKey = null;
        return _this;
    }
    Object.defineProperty(AcGroupWifeBattleVisitView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleVisitView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleVisitView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleVisitView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleVisitView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleVisitView.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcGroupWifeBattleVisitView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rankinglist_rankbg",
            "atkraceVisitbg",
            "atkracevipbg",
            "office_fnt",
        ]);
    };
    AcGroupWifeBattleVisitView.prototype.getTitleStr = function () {
        return "acBattileGroundVisit-" + this.getUiCode();
    };
    AcGroupWifeBattleVisitView.prototype.getShowHeight = function () {
        return 750 + 10;
    };
    AcGroupWifeBattleVisitView.prototype.initView = function () {
        var _this = this;
        var tabBar1 = this.tabbarGroup.getTabBar(1);
        var tabBar2 = this.tabbarGroup.getTabBar(2);
        egret.callLater(function () {
            _this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(_this, _this.container.x + tabBar1.x + tabBar1.width / 2, _this.container.y + tabBar1.y + tabBar1.height / 2, [tabBar1, tabBar2], 603, true, function () {
                return true;
            }, _this);
        }, this);
    };
    AcGroupWifeBattleVisitView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattleTip14-" + this.getUiCode(), [Config.GameprojectCfg.deleteEmail.toString()]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, tipTxt, this.viewBg, [GameData.popupviewOffsetX, this.viewBg.height + 15]);
        this.addChild(tipTxt);
    };
    AcGroupWifeBattleVisitView.prototype.getOffsetX = function () {
        return 35;
    };
    AcGroupWifeBattleVisitView.prototype.getOffsetY = function () {
        return -2;
    };
    AcGroupWifeBattleVisitView.prototype.getTabbarTextArr = function () {
        return [
            "atkraceVisitTab1",
            "atkraceVisitTab2",
            "acGroupWifeBattleVisitTip1-" + this.getUiCode(),
        ];
    };
    AcGroupWifeBattleVisitView.prototype.dispose = function () {
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        _super.prototype.dispose.call(this);
    };
    return AcGroupWifeBattleVisitView;
}(PopupView));
//# sourceMappingURL=AcGroupWifeBattleVisitView.js.map