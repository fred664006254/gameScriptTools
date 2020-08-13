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
var AcMoonNightCloud = (function (_super) {
    __extends(AcMoonNightCloud, _super);
    function AcMoonNightCloud() {
        var _this = _super.call(this) || this;
        _this.cloudL1 = null;
        _this.cloudR1 = null;
        _this.init();
        return _this;
    }
    AcMoonNightCloud.prototype.init = function () {
        this.width = 100;
        this.height = 100;
        this.cloudL1 = BaseBitmap.create("moonnight_cloud22-1");
        this.cloudR1 = BaseBitmap.create("moonnight_cloud21-1");
        this.cloudL1.anchorOffsetX = this.cloudL1.width / 2;
        this.cloudL1.anchorOffsetY = this.cloudL1.height / 2;
        this.cloudR1.anchorOffsetX = this.cloudR1.width / 2;
        this.cloudR1.anchorOffsetY = this.cloudR1.height / 2;
        // this.cloudL2 = BaseBitmap.create("moonnight_cloud21-1");
        // this.cloudR2 = BaseBitmap.create("moonnight_cloud22-1");
        this.cloudL1.x = 10;
        this.cloudL1.y = 0 + 30;
        this.addChild(this.cloudL1);
        this.cloudR1.x = this.width - 10;
        this.cloudR1.y = this.height - 30;
        this.addChild(this.cloudR1);
    };
    AcMoonNightCloud.prototype.playIdle = function () {
        egret.Tween.get(this.cloudL1, { loop: true })
            .to({ x: 0 }, 1000)
            .to({ x: 20 }, 2000)
            .to({ x: 10 }, 1000);
        egret.Tween.get(this.cloudR1, { loop: true })
            .to({ x: this.width - 10 + 10 }, 1000)
            .to({ x: this.width - 10 - 10 }, 2000)
            .to({ x: this.width - 10 }, 1000);
    };
    AcMoonNightCloud.prototype.playDiss = function () {
        if (this.cloudL1) {
            egret.Tween.removeTweens(this.cloudL1);
        }
        if (this.cloudR1) {
            egret.Tween.removeTweens(this.cloudR1);
        }
        egret.Tween.get(this.cloudL1)
            .to({ alpha: 0, x: -100 }, 1000);
        egret.Tween.get(this.cloudR1)
            .to({ alpha: 0, x: this.width + 100 }, 1000);
    };
    AcMoonNightCloud.prototype.dispose = function () {
        if (this.cloudL1) {
            egret.Tween.removeTweens(this.cloudL1);
        }
        if (this.cloudR1) {
            egret.Tween.removeTweens(this.cloudR1);
        }
        this.cloudL1 = null;
        this.cloudR1 = null;
        _super.prototype.dispose.call(this);
    };
    return AcMoonNightCloud;
}(BaseDisplayObjectContainer));
__reflect(AcMoonNightCloud.prototype, "AcMoonNightCloud");
