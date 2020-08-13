/**
 * 骰子结果展示
 * author qianjun
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
var AcTreasureHuntBoxResultView = (function (_super) {
    __extends(AcTreasureHuntBoxResultView, _super);
    function AcTreasureHuntBoxResultView() {
        return _super.call(this) || this;
    }
    AcTreasureHuntBoxResultView.prototype.getResourceList = function () {
        var rewardPic = _super.prototype.getResourceList.call(this);
        return rewardPic.concat([]);
    };
    Object.defineProperty(AcTreasureHuntBoxResultView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureHuntBoxResultView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcTreasureHuntBoxResultView.prototype.getTitleBgName = function () {
        return null;
    };
    AcTreasureHuntBoxResultView.prototype.getTitleStr = function () {
        return null;
    };
    AcTreasureHuntBoxResultView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    Object.defineProperty(AcTreasureHuntBoxResultView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureHuntBoxResultView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcTreasureHuntBoxResultView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AcTreasureHuntBoxResultView.prototype.isShowMask = function () {
        return true;
    };
    AcTreasureHuntBoxResultView.prototype.initView = function () {
        var view = this;
        var code = view.code;
        var result = view.param.data.result;
        // view.addTouchTap(view.hide,view);
        var effectClip = ComponentManager.getCustomMovieClip("treasurebox" + code + "-", 18, 100);
        effectClip.width = 100;
        effectClip.height = 100;
        effectClip.anchorOffsetX = effectClip.width / 2;
        effectClip.anchorOffsetY = effectClip.height / 2;
        effectClip.alpha = 0;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, effectClip, view.viewBg, [0, -300]);
        view.addChild(effectClip);
        effectClip.setStopFrame(view.param.data.skip ? (11 + result) : 0);
        var speed = 2;
        egret.Tween.get(effectClip).to({ y: 0 }, 300 / speed).to({ alpha: 1, y: GameConfig.stageHeigth / 2 + 100 }, (GameConfig.stageHeigth / 2 + 100) / speed).to({ y: GameConfig.stageHeigth / 2 }, GameConfig.stageHeigth / 2 / speed).wait(200).call(function () {
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
                    egret.Tween.get(effectClip).wait(300).to({ alpha: 0, scaleX: 8, scaleY: 8 }, 400).call(function () {
                        view.hide();
                    }, view);
                }, view);
                effectClip.playWithTime(1);
            }
        }, view);
    };
    AcTreasureHuntBoxResultView.prototype.touchTap = function () {
        this.hide();
    };
    AcTreasureHuntBoxResultView.prototype.hide = function () {
        _super.prototype.hide.call(this);
        if (this.param.data.confirmCallback) {
            this.param.data.confirmCallback.apply(this.param.data.handler, []);
        }
    };
    AcTreasureHuntBoxResultView.prototype.dispose = function () {
        this.removeTouchTap();
        _super.prototype.dispose.call(this);
    };
    return AcTreasureHuntBoxResultView;
}(BaseView));
__reflect(AcTreasureHuntBoxResultView.prototype, "AcTreasureHuntBoxResultView");
//# sourceMappingURL=AcTreasureHuntBoxResultView.js.map