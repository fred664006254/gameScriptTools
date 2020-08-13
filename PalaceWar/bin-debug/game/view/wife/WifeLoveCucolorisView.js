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
  * 红颜剪影
  * @author 张朝阳
  * date 2019/7/10
  * @class WifeLoveCucolorisView
  */
var WifeLoveCucolorisView = (function (_super) {
    __extends(WifeLoveCucolorisView, _super);
    function WifeLoveCucolorisView() {
        return _super.call(this) || this;
    }
    WifeLoveCucolorisView.prototype.initView = function () {
        var _this = this;
        this.alpha = 0;
        egret.Tween.get(this).to({ alpha: 1 }, 200).wait(2200).call(function () {
            // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFELOVEANI_CLICK);
        }, this).to({ alpha: 0 }, 400).call(function () {
            egret.Tween.removeTweens(_this);
        }, this);
        var bg = BaseLoadBitmap.create("wifelovecucolorisview_bg");
        this.addChildToContainer(bg);
        var light = BaseLoadBitmap.create("wifelovecucolorisview_light");
        light.width = 640;
        light.height = 785;
        this.addChildToContainer(light);
        light.alpha = 0;
        egret.Tween.get(light).wait(200).to({ alpha: 1 }, 1600);
        var man = BaseLoadBitmap.create("wifelovecucolorisview_man");
        man.width = 273;
        man.height = 772;
        man.setPosition(88, 273);
        this.addChildToContainer(man);
        egret.Tween.get(man).wait(200).to({ x: 114, y: 283 }, 1600).to({ x: 116, y: 290 }, 500);
        var woman = BaseLoadBitmap.create("wifelovecucolorisview_woman");
        woman.width = 251;
        woman.height = 660;
        woman.setPosition(299, 412);
        this.addChildToContainer(woman);
        egret.Tween.get(woman).wait(200).to({ x: 286, y: 390 }, 1600).to({ x: 283, y: 381 }, 500);
        var left = BaseLoadBitmap.create("wifelovecucolorisview_left");
        left.width = 347;
        left.height = 1136;
        left.setPosition(-300, 0);
        this.addChildToContainer(left);
        egret.Tween.get(left).to({ x: -68 }, 300).to({ x: 0 }, 1800);
        var right = BaseLoadBitmap.create("wifelovecucolorisview_right");
        right.width = 340;
        right.height = 1136;
        right.setPosition(593, 0);
        this.addChildToContainer(right);
        egret.Tween.get(right).to({ x: 361 }, 300).to({ x: 294 }, 1800).call(function () {
            // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFELOVEANI_CLICK);
            // egret.Tween.get(this).to({ alpha: 0 }, 400).call(() => {
            // 	egret.Tween.removeTweens(this);
            _this.closeView();
            // });
        }, this);
        // this.addTouchTap(this.closeView, this);
    };
    WifeLoveCucolorisView.prototype.closeView = function () {
        this.hide();
    };
    WifeLoveCucolorisView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    WifeLoveCucolorisView.prototype.getTitleBgName = function () {
        return null;
    };
    WifeLoveCucolorisView.prototype.getTitleStr = function () {
        return null;
    };
    WifeLoveCucolorisView.prototype.getBgName = function () {
        return null;
    };
    WifeLoveCucolorisView.prototype.dispose = function () {
        // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFELOVEANI_CLICK);
        _super.prototype.dispose.call(this);
    };
    return WifeLoveCucolorisView;
}(BaseView));
__reflect(WifeLoveCucolorisView.prototype, "WifeLoveCucolorisView");
//# sourceMappingURL=WifeLoveCucolorisView.js.map