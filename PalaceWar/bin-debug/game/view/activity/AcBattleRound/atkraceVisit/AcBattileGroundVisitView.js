/**
 * 来访消息主界面
 */
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
var AcBattileGroundVisitView = (function (_super) {
    __extends(AcBattileGroundVisitView, _super);
    function AcBattileGroundVisitView() {
        var _this = _super.call(this) || this;
        _this._mainTaskHandKey = null;
        return _this;
    }
    Object.defineProperty(AcBattileGroundVisitView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattileGroundVisitView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattileGroundVisitView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattileGroundVisitView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattileGroundVisitView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattileGroundVisitView.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcBattileGroundVisitView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rankinglist_rankbg",
            "atkraceVisitbg",
            "atkracevipbg",
            "office_fnt",
        ]);
    };
    AcBattileGroundVisitView.prototype.getTitleStr = function () {
        return "acBattileGroundVisit-" + this.getUiCode();
    };
    AcBattileGroundVisitView.prototype.getShowHeight = function () {
        return 750 + 10;
    };
    AcBattileGroundVisitView.prototype.initView = function () {
        var _this = this;
        var tabBar1 = this.tabbarGroup.getTabBar(1);
        var tabBar2 = this.tabbarGroup.getTabBar(2);
        egret.callLater(function () {
            _this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(_this, _this.container.x + tabBar1.x + tabBar1.width / 2, _this.container.y + tabBar1.y + tabBar1.height / 2, [tabBar1, tabBar2], 603, true, function () {
                return true;
            }, _this);
        }, this);
    };
    AcBattileGroundVisitView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundTip14-" + this.getUiCode(), [Config.GameprojectCfg.deleteEmail.toString()]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, tipTxt, this.viewBg, [GameData.popupviewOffsetX, this.viewBg.height + 15]);
        this.addChild(tipTxt);
    };
    AcBattileGroundVisitView.prototype.getOffsetX = function () {
        return 35;
    };
    AcBattileGroundVisitView.prototype.getOffsetY = function () {
        return -2;
    };
    AcBattileGroundVisitView.prototype.getTabbarTextArr = function () {
        return [
            "atkraceVisitTab1",
            "atkraceVisitTab2",
            "atkraceVisitTab3",
        ];
    };
    AcBattileGroundVisitView.prototype.dispose = function () {
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        _super.prototype.dispose.call(this);
    };
    return AcBattileGroundVisitView;
}(PopupView));
__reflect(AcBattileGroundVisitView.prototype, "AcBattileGroundVisitView");
//# sourceMappingURL=AcBattileGroundVisitView.js.map