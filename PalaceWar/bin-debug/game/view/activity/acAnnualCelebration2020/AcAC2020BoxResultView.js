/**
 * 骰子结果展示
 * author shaoliang
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
var AcAC2020BoxResultView = (function (_super) {
    __extends(AcAC2020BoxResultView, _super);
    function AcAC2020BoxResultView() {
        return _super.call(this) || this;
    }
    AcAC2020BoxResultView.prototype.getResourceList = function () {
        var rewardPic = _super.prototype.getResourceList.call(this);
        return rewardPic.concat([]);
    };
    Object.defineProperty(AcAC2020BoxResultView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAC2020BoxResultView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcAC2020BoxResultView.prototype.getTitleBgName = function () {
        return null;
    };
    AcAC2020BoxResultView.prototype.getTitleStr = function () {
        return null;
    };
    AcAC2020BoxResultView.prototype.getBgName = function () {
        return "public_9_viewmask";
    };
    Object.defineProperty(AcAC2020BoxResultView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAC2020BoxResultView.prototype, "uicode", {
        get: function () {
            return this.param.data.uicode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAC2020BoxResultView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcAC2020BoxResultView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AcAC2020BoxResultView.prototype.isShowMask = function () {
        return true;
    };
    AcAC2020BoxResultView.prototype.initView = function () {
        this._maskBmp.alpha = 0;
        this.viewBg.height = 400;
        this.viewBg.y = GameConfig.stageHeigth / 2 - this.viewBg.height / 2;
        var view = this;
        var code = view.uicode;
        var result = view.param.data.result;
        // view.addTouchTap(view.hide,view);
        var effectClip;
        if (view.param.data.aidice) {
            effectClip = ComponentManager.getCustomMovieClip("aidice_effect", 18, 50);
        }
        else {
            effectClip = ComponentManager.getCustomMovieClip("treasurebox1-", 18, 50);
        }
        effectClip.width = 100;
        effectClip.height = 100;
        effectClip.anchorOffsetX = effectClip.width / 2;
        effectClip.anchorOffsetY = effectClip.height / 2;
        effectClip.alpha = 0;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, effectClip, view.viewBg, [0, -300]);
        view.addChild(effectClip);
        effectClip.setStopFrame(view.param.data.skip ? (11 + result) : 0);
        var speed = 3;
        egret.Tween.get(effectClip).to({ y: 0 }, 300 / speed).to({ alpha: 1, y: GameConfig.stageHeigth / 2 + 100 }, (GameConfig.stageHeigth / 2 + 100) / speed).to({ y: GameConfig.stageHeigth / 2 }, GameConfig.stageHeigth / 2 / speed).wait(100).call(function () {
            if (view.param.data.skip) {
                effectClip.setStopFrame(11 + result);
                egret.Tween.get(effectClip).wait(300).to({ alpha: 0, scaleX: 8, scaleY: 8 }, 400).call(function () {
                    view.hide();
                }, view);
            }
            else {
                effectClip.setEndFrameAndPlay(12);
                effectClip.setEndCallBack(function () {
                    effectClip.setStopFrame(11 + result);
                    egret.Tween.get(effectClip).wait(200).to({ alpha: 0, scaleX: 8, scaleY: 8 }, 400).call(function () {
                        view.hide();
                    }, view);
                }, view);
                effectClip.playWithTime(1);
            }
        }, view);
    };
    AcAC2020BoxResultView.prototype.touchTap = function () {
        this.hide();
    };
    AcAC2020BoxResultView.prototype.hide = function () {
        _super.prototype.hide.call(this);
        if (this.param.data.confirmCallback) {
            this.param.data.confirmCallback.apply(this.param.data.handler, []);
        }
    };
    AcAC2020BoxResultView.prototype.dispose = function () {
        this.removeTouchTap();
        _super.prototype.dispose.call(this);
    };
    return AcAC2020BoxResultView;
}(BaseView));
__reflect(AcAC2020BoxResultView.prototype, "AcAC2020BoxResultView");
//# sourceMappingURL=AcAC2020BoxResultView.js.map