/**
 * 皮肤展示界面
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
var AtkraceshowskinView = (function (_super) {
    __extends(AtkraceshowskinView, _super);
    function AtkraceshowskinView() {
        return _super.call(this) || this;
    }
    AtkraceshowskinView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AtkraceshowskinView.prototype.getTitleBgName = function () {
        return null;
    };
    AtkraceshowskinView.prototype.getBgName = function () {
        return null;
    };
    AtkraceshowskinView.prototype.getTitleStr = function () {
        return null;
    };
    AtkraceshowskinView.prototype.initView = function () {
        var _this = this;
        var view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        //背景黑框
        var bg = BaseBitmap.create("skinshoweffecthei");
        bg.anchorOffsetX = bg.width / 2;
        bg.anchorOffsetY = bg.height / 2;
        view.addChild(bg);
        bg.x = view.width / 2;
        bg.y = view.height / 2;
        bg.alpha = 0;
        egret.Tween.get(bg).to({ alpha: 0.5, scaleX: 100, scaleY: 100 }, 170).call(function () {
            egret.Tween.removeTweens(bg);
        }, view);
        //glows glown
        var glows = BaseBitmap.create("skinshoweffectglow_s");
        glows.anchorOffsetX = glows.width / 2;
        glows.anchorOffsetY = glows.height / 2;
        view.addChild(glows);
        glows.alpha = 0;
        glows.x = 327;
        glows.y = view.height / 2 - 73;
        egret.Tween.get(glows, { loop: true }).to({ rotation: 360 }, 4330);
        egret.Tween.get(glows).wait(670).to({ alpha: 1, scaleX: 2, scaleY: 2 }, 230);
        var glown = BaseBitmap.create("skinshowglow_n");
        glown.anchorOffsetX = glown.width / 2;
        glown.anchorOffsetY = glown.height / 2;
        view.addChild(glown);
        glown.alpha = 0;
        glown.x = 327;
        glown.y = view.height / 2 - 73;
        egret.Tween.get(glown, { loop: true }).to({ rotation: -360 }, 4330);
        egret.Tween.get(glown).wait(670).to({ alpha: 1, scaleX: 2, scaleY: 2 }, 230);
        //人物形象
        var id = view.param.data.skinId;
        var skincfg = Config.ServantskinCfg.getServantSkinItemById(id);
        var pic = BaseLoadBitmap.create(skincfg.body);
        pic.width = 405;
        pic.height = 467;
        pic.anchorOffsetX = pic.width / 2;
        pic.anchorOffsetY = pic.height / 2;
        view.addChild(pic);
        pic.y = view.height / 2 - 123;
        pic.x = 875;
        egret.Tween.get(pic).wait(370).to({ x: 318 }, 200).call(function () {
            egret.Tween.removeTweens(pic);
        }, view);
        //框1
        var kuang1 = BaseBitmap.create("skinshowkuang1");
        kuang1.anchorOffsetX = kuang1.width / 2;
        kuang1.anchorOffsetY = kuang1.height / 2;
        view.addChild(kuang1);
        kuang1.y = view.height - 395;
        kuang1.x = 320;
        kuang1.scaleY = 0;
        egret.Tween.get(kuang1).wait(170).to({ scaleX: 4.25, scaleY: 0.2 }, 30).to({ scaleX: 2.62, scaleY: 1.4 }, 70).to({ scaleX: 1, scaleY: 1 }, 100).call(function () {
            egret.Tween.removeTweens(kuang1);
        }, view);
        //框2
        var kuang2 = BaseBitmap.create("skinshowkuang2");
        kuang2.anchorOffsetX = kuang2.width / 2;
        kuang2.anchorOffsetY = kuang2.height / 2;
        view.addChild(kuang2);
        kuang2.y = view.height - 469;
        kuang2.x = -237;
        egret.Tween.get(kuang2).wait(400).to({ x: 334.5 }, 170).call(function () {
            egret.Tween.removeTweens(kuang2);
        }, view);
        //文字1
        var txt1 = ComponentManager.getTextField(LanguageManager.getlocal("servantShowSkinDesc" + skincfg.id), 20, TextFieldConst.COLOR_BLACK);
        txt1.anchorOffsetX = txt1.width / 2;
        txt1.anchorOffsetY = txt1.height / 2;
        view.addChild(txt1);
        txt1.y = view.height - 396.5;
        txt1.x = -124;
        egret.Tween.get(txt1).wait(470).to({ x: 320 }, 160).call(function () {
            egret.Tween.removeTweens(txt1);
        }, view);
        var txt2 = ComponentManager.getTextField(skincfg.name, 20, TextFieldConst.COLOR_BLACK);
        txt2.anchorOffsetX = txt2.width / 2;
        txt2.anchorOffsetY = txt2.height / 2;
        view.addChild(txt2);
        txt2.y = view.height - 473.5;
        txt2.x = 340;
        txt2.alpha = 0;
        egret.Tween.get(txt2).wait(630).to({ alpha: 1 }, 200).call(function () {
            egret.Tween.removeTweens(txt2);
        }, view);
        //glow
        var glow = BaseBitmap.create("skinshoweffectglow");
        glow.anchorOffsetX = glow.width / 2;
        glow.anchorOffsetY = glow.height / 2;
        view.addChild(glow);
        glow.y = view.height - 472.5;
        glow.x = 332;
        glow.alpha = 0;
        egret.Tween.get(glow).wait(1000).to({ alpha: 1 }, 330).to({ alpha: 0 }, 340).wait(800).call(function () {
            egret.Tween.removeTweens(glow);
            _this.hide();
        }, view);
        glow.blendMode = egret.BlendMode.ADD;
        //xulie
        var clip = ComponentManager.getCustomMovieClip("skinshoweffect", 10, 70);
        clip.blendMode = egret.BlendMode.ADD;
        clip.width = 499;
        clip.height = 146;
        clip.anchorOffsetX = glow.width / 2;
        clip.anchorOffsetY = glow.height / 2;
        view.addChild(clip);
        clip.y = view.height - 475.5;
        clip.x = 357;
        egret.Tween.get(clip).wait(1330).call(function () {
            egret.Tween.removeTweens(clip);
            clip.playWithTime(1);
            clip.setEndCallBack(function () {
                clip.dispose();
                clip = null;
            }, view);
        }, view);
    };
    AtkraceshowskinView.prototype.getCloseBtnName = function () {
        return null;
    };
    AtkraceshowskinView.prototype.dispose = function () {
        var view = this;
        var callback = view.param.data.callback;
        var callbackThisObj = view.param.data.callbackThisObj;
        _super.prototype.dispose.call(this);
        if (callback) {
            callback.apply(callbackThisObj);
        }
    };
    return AtkraceshowskinView;
}(PopupView));
__reflect(AtkraceshowskinView.prototype, "AtkraceshowskinView");
//# sourceMappingURL=AtkraceshowskinView.js.map