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
var AcDoubleSeventhExchangeView = (function (_super) {
    __extends(AcDoubleSeventhExchangeView, _super);
    function AcDoubleSeventhExchangeView() {
        var _this = _super.call(this) || this;
        _this._clickHand = null;
        return _this;
    }
    Object.defineProperty(AcDoubleSeventhExchangeView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDoubleSeventhExchangeView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDoubleSeventhExchangeView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDoubleSeventhExchangeView.prototype, "uicode", {
        get: function () {
            return this.param.data.uicode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDoubleSeventhExchangeView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDoubleSeventhExchangeView.prototype, "aidAndCode", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcDoubleSeventhExchangeView.prototype.getTabbarTextArr = function () {
        var code = this.uicode;
        return [
            "exchangeSceneTab1",
            "exchangeSceneTab2",
        ];
    };
    AcDoubleSeventhExchangeView.prototype.getTitleStr = function () {
        return "acTreasureOfficeTitle-1";
    };
    AcDoubleSeventhExchangeView.prototype.getShowHeight = function () {
        return 795 + 8;
    };
    AcDoubleSeventhExchangeView.prototype.getOffsetX = function () {
        return 34;
    };
    AcDoubleSeventhExchangeView.prototype.getShowWidth = function () {
        return 560;
    };
    AcDoubleSeventhExchangeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "scene_preview_bg_" + this.cfg.getExchangeSceneId(), "progress3", "progress3_bg",
            "acenjoynight_exchangebb2", "acenjoynight_exchangebb1", "servant_detailBtn",
            "scene_exchange_topbg", "scene_exchange_itembg", "acenjoynight_got", "guide_hand"
        ]);
    };
    Object.defineProperty(AcDoubleSeventhExchangeView.prototype, "requestStr", {
        get: function () {
            return NetRequestConst.REQUST_ACTIVITY_GETDOUBLESEVENTHEXCHANGE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDoubleSeventhExchangeView.prototype, "sceneType", {
        get: function () {
            return "searchScene";
        },
        enumerable: true,
        configurable: true
    });
    AcDoubleSeventhExchangeView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(this.requestStr), this.useCallback, this);
        this.useCallback(null);
        //  this.showHand();
    };
    AcDoubleSeventhExchangeView.prototype.useCallback = function (event) {
        var view = this;
        var scenesid = this.cfg.getExchangeSceneId();
        if (Api.otherInfoVoApi.isHasSceneNotAboutUnlock(scenesid, this.sceneType)) {
            App.DisplayUtil.changeToNormal(this.tabbarGroup.getTabBar(1));
            this.tabbarGroup.setLocked(1, false);
            if (event && event.data.ret && event.data.data.data.rewards == "20_303_1") {
                this.showHand();
            }
            if (this.vo.isCanExchange()) {
                this.tabbarGroup.addRedPoint(1);
            }
            else {
                this.tabbarGroup.removeRedPoint(1);
            }
        }
        else {
            App.DisplayUtil.changeToGray(this.tabbarGroup.getTabBar(1));
            this.tabbarGroup.setLocked(1, true);
        }
    };
    AcDoubleSeventhExchangeView.prototype.showHand = function () {
        this._clickHand = BaseBitmap.create("guide_hand");
        this._clickHand.x = 290;
        this._clickHand.y = GameConfig.stageHeigth / 2 - 320;
        this.addChild(this._clickHand);
        egret.Tween.get(this._clickHand, { loop: true })
            .to({ scaleX: 0.9, scaleY: 0.9 }, 500)
            .to({ scaleX: 1, scaleY: 1 }, 500);
    };
    AcDoubleSeventhExchangeView.prototype.clickTabbarHandler = function (data) {
        var index = Number(data.index);
        if (index == 1) {
            var view = this;
            var scenesid = this.cfg.getExchangeSceneId();
            if (!Api.otherInfoVoApi.isHasSceneNotAboutUnlock(scenesid, this.sceneType)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("exchangeScene_noScene"));
                return;
            }
            if (this._clickHand) {
                this._clickHand.dispose();
                this._clickHand = null;
            }
        }
        _super.prototype.clickTabbarHandler.call(this, data);
    };
    AcDoubleSeventhExchangeView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(this.requestStr), this.useCallback, this);
        this._clickHand = null;
        _super.prototype.dispose.call(this);
    };
    return AcDoubleSeventhExchangeView;
}(PopupView));
__reflect(AcDoubleSeventhExchangeView.prototype, "AcDoubleSeventhExchangeView");
//# sourceMappingURL=AcDoubleSeventhExchangeView.js.map