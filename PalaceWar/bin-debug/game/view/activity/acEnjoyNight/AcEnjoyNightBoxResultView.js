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
var AcEnjoyNightBoxResultView = (function (_super) {
    __extends(AcEnjoyNightBoxResultView, _super);
    function AcEnjoyNightBoxResultView() {
        return _super.call(this) || this;
    }
    AcEnjoyNightBoxResultView.prototype.getResourceList = function () {
        var rewardPic = _super.prototype.getResourceList.call(this);
        return rewardPic.concat([]);
    };
    Object.defineProperty(AcEnjoyNightBoxResultView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightBoxResultView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcEnjoyNightBoxResultView.prototype.getTitleBgName = function () {
        return null;
    };
    AcEnjoyNightBoxResultView.prototype.getTitleStr = function () {
        return null;
    };
    AcEnjoyNightBoxResultView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    Object.defineProperty(AcEnjoyNightBoxResultView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightBoxResultView.prototype, "uicode", {
        get: function () {
            return this.param.data.uicode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightBoxResultView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcEnjoyNightBoxResultView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AcEnjoyNightBoxResultView.prototype.isShowMask = function () {
        return true;
    };
    AcEnjoyNightBoxResultView.prototype.initView = function () {
        var view = this;
        var code = view.uicode;
        var result = view.param.data.result;
        // view.addTouchTap(view.hide,view);
        var effectClip = ComponentManager.getCustomMovieClip("treasurebox" + code + "-", 18, 50);
        effectClip.width = 100;
        effectClip.height = 100;
        effectClip.anchorOffsetX = effectClip.width / 2;
        effectClip.anchorOffsetY = effectClip.height / 2;
        effectClip.alpha = 0;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, effectClip, view.viewBg, [0, -300]);
        view.addChild(effectClip);
        effectClip.setStopFrame(view.param.data.skip ? (11 + result) : 0);
        var speed = 2;
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
    AcEnjoyNightBoxResultView.prototype.touchTap = function () {
        this.hide();
    };
    AcEnjoyNightBoxResultView.prototype.hide = function () {
        _super.prototype.hide.call(this);
        if (this.param.data.confirmCallback) {
            this.param.data.confirmCallback.apply(this.param.data.handler, []);
        }
    };
    AcEnjoyNightBoxResultView.prototype.dispose = function () {
        this.removeTouchTap();
        _super.prototype.dispose.call(this);
    };
    return AcEnjoyNightBoxResultView;
}(BaseView));
__reflect(AcEnjoyNightBoxResultView.prototype, "AcEnjoyNightBoxResultView");
//# sourceMappingURL=AcEnjoyNightBoxResultView.js.map