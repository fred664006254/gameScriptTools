/**
 * 换装成功
 * author shaoliang
 * date 2019/9/9
 * @class ServantNewChangeSkin
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
var ServantNewChangeSkin = (function (_super) {
    __extends(ServantNewChangeSkin, _super);
    function ServantNewChangeSkin() {
        return _super.call(this) || this;
    }
    ServantNewChangeSkin.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkraceshowskinview", "servant_changeskin_text", "servant_changeskin_orange",
            "servant_name_advanced", "specialvieweffect",
        ]);
    };
    ServantNewChangeSkin.prototype.getTitleBgName = function () {
        return null;
    };
    ServantNewChangeSkin.prototype.getBgName = function () {
        return null;
    };
    ServantNewChangeSkin.prototype.getTitleStr = function () {
        return null;
    };
    ServantNewChangeSkin.prototype.initView = function () {
        var _this = this;
        var view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        //背景黑框
        var bg = BaseBitmap.create("skinshoweffecthei");
        bg.anchorOffsetX = bg.width / 2;
        bg.anchorOffsetY = bg.height / 2;
        view.addChild(bg);
        var servantNode = new BaseDisplayObjectContainer();
        servantNode.y = 120;
        view.addChild(servantNode);
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
        servantNode.addChild(glows);
        glows.alpha = 0;
        glows.x = 327;
        glows.y = view.height / 2 - 73;
        egret.Tween.get(glows, { loop: true }).to({ rotation: 360 }, 4330);
        egret.Tween.get(glows).wait(670).to({ alpha: 1, scaleX: 2, scaleY: 2 }, 230);
        var glown = BaseBitmap.create("skinshowglow_n");
        glown.anchorOffsetX = glown.width / 2;
        glown.anchorOffsetY = glown.height / 2;
        servantNode.addChild(glown);
        glown.alpha = 0;
        glown.x = 327;
        glown.y = view.height / 2 - 73;
        egret.Tween.get(glown, { loop: true }).to({ rotation: -360 }, 4330);
        egret.Tween.get(glown).wait(670).to({ alpha: 1, scaleX: 2, scaleY: 2 }, 230);
        //人物形象
        var id = view.param.data.servantId;
        var sid = view.param.data.skinId;
        var servantcfg = Config.ServantCfg.getServantItemById(id);
        var picstr;
        var descstr;
        var namestr;
        if (sid) {
            var skincfg = Config.ServantskinCfg.getServantSkinItemById(sid);
            picstr = skincfg.body;
            descstr = LanguageManager.getlocal("servantShowSkinDesc" + skincfg.id);
            // descstr = LanguageManager.getlocal(`effect_servant_${id}_2_cn`);
            namestr = LanguageManager.getlocal("servant_newui_skinname", [skincfg.name, servantcfg.name]);
        }
        else {
            picstr = servantcfg.fullIcon;
            descstr = servantcfg.words;
            namestr = servantcfg.name;
        }
        var pic = BaseLoadBitmap.create(picstr);
        pic.width = 405;
        pic.height = 467;
        pic.anchorOffsetX = pic.width / 2;
        pic.anchorOffsetY = pic.height / 2;
        servantNode.addChild(pic);
        pic.y = view.height / 2 - 123;
        pic.x = 875;
        egret.Tween.get(pic).wait(370).to({ x: 318 }, 200).call(function () {
            egret.Tween.removeTweens(pic);
        }, view);
        //框1
        var kuang1 = BaseBitmap.create("servant_changeskin_orange");
        kuang1.anchorOffsetX = kuang1.width / 2;
        kuang1.anchorOffsetY = kuang1.height / 2;
        servantNode.addChild(kuang1);
        kuang1.y = pic.y + 202;
        kuang1.x = 320;
        kuang1.scaleY = 0;
        egret.Tween.get(kuang1).wait(170).to({ scaleX: 4.25, scaleY: 0.2 }, 30).to({ scaleX: 2.62, scaleY: 1.4 }, 70).to({ scaleX: 1, scaleY: 1 }, 100).call(function () {
            egret.Tween.removeTweens(kuang1);
        }, view);
        //框2
        var kuang2 = new BaseDisplayObjectContainer();
        if (sid) {
            var nameBg = BaseBitmap.create("servant_name_advanced");
            // nameBg.setPosition(118,400);
            kuang2.addChild(nameBg);
            var clip = ComponentManager.getCustomMovieClip("servant_name_ef", 12);
            clip.x = nameBg.x - 8;
            clip.y = nameBg.y - 16;
            kuang2.addChild(clip);
            clip.playWithTime(0);
            if (PlatformManager.checkIsEnSp() || PlatformManager.checkIsRuSp()) {
                clip.x = nameBg.x - 11;
                clip.y = nameBg.y - 19;
            }
            var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
            nameTxt.width = 180;
            nameTxt.textAlign = egret.HorizontalAlign.CENTER;
            nameTxt.multiline = true;
            nameTxt.text = namestr;
            nameTxt.textColor = TextFieldConst.COLOR_QUALITY_WHITE;
            nameTxt.setPosition(nameBg.x + 15, nameBg.y + 14);
            kuang2.addChild(nameTxt);
        }
        else {
            var nameBg = BaseLoadBitmap.create("wifestatus_namebg");
            nameBg.width = 220;
            nameBg.height = 30;
            // nameBg.setPosition(128,409);
            kuang2.addChild(nameBg);
            var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
            nameTxt.width = 180;
            nameTxt.textAlign = egret.HorizontalAlign.CENTER;
            nameTxt.multiline = true;
            nameTxt.text = namestr;
            nameTxt.textColor = TextFieldConst.COLOR_QUALITY_WHITE;
            nameTxt.setPosition(nameBg.x + 20, nameBg.y + nameBg.height / 2 - nameTxt.height / 2);
            kuang2.addChild(nameTxt);
        }
        kuang2.anchorOffsetX = kuang2.width / 2;
        kuang2.anchorOffsetY = kuang2.height / 2;
        servantNode.addChild(kuang2);
        kuang2.y = kuang1.y - 74;
        kuang2.x = -237;
        egret.Tween.get(kuang2).wait(400).to({ x: 334.5 }, 170).call(function () {
            egret.Tween.removeTweens(kuang2);
        }, view);
        //文字1
        var txt1 = ComponentManager.getTextField(descstr, 20, TextFieldConst.COLOR_WHITE);
        txt1.width = 320;
        txt1.textAlign = TextFieldConst.ALIGH_CENTER;
        txt1.anchorOffsetX = txt1.width / 2;
        txt1.anchorOffsetY = txt1.height / 2;
        servantNode.addChild(txt1);
        // txt1.y = kuang1.y -2;
        txt1.lineSpacing = 4;
        txt1.x = -124;
        txt1.y = kuang1.y;
        egret.Tween.get(txt1).wait(470).to({ x: 300 }, 160).call(function () {
            egret.Tween.removeTweens(txt1);
        }, view);
        // let txt2 = ComponentManager.getTextField(namestr, 20, TextFieldConst.COLOR_BLACK);
        // txt2.anchorOffsetX = txt2.width / 2;
        // txt2.anchorOffsetY = txt2.height / 2;
        // servantNode.addChild(txt2);
        // txt2.y = view.height - 473.5;
        // txt2.x = 340;
        // txt2.alpha = 0;
        // egret.Tween.get(txt2).wait(630).to({alpha : 1},200).call(()=>{
        //     egret.Tween.removeTweens(txt2);
        // }, view);
        //glow
        var glow = BaseBitmap.create("skinshoweffectglow");
        glow.anchorOffsetX = glow.width / 2;
        glow.anchorOffsetY = glow.height / 2;
        servantNode.addChild(glow);
        glow.y = kuang1.y - 80;
        glow.x = 332;
        glow.alpha = 0;
        egret.Tween.get(glow).wait(1000).to({ alpha: 1 }, 330).to({ alpha: 0 }, 340).wait(800).call(function () {
            egret.Tween.removeTweens(glow);
            _this.hide();
        }, view);
        glow.blendMode = egret.BlendMode.ADD;
        //xulie
        // let clip = ComponentManager.getCustomMovieClip(`skinshoweffect`, 10, 70);
        // clip.blendMode = egret.BlendMode.ADD;
        // clip.width = 499;
        // clip.height = 146;
        // clip.anchorOffsetX = glow.width / 2;
        // clip.anchorOffsetY = glow.height / 2;
        // servantNode.addChild(clip);
        // clip.y = view.height - 475.5;
        // clip.x = 357;
        // egret.Tween.get(clip).wait(1330).call(()=>{
        //     egret.Tween.removeTweens(clip);
        //     clip.playWithTime(1);
        //     clip.setEndCallBack(()=>{
        //         clip.dispose();
        //         clip = null;
        //     }, view);
        // }, view);
        //上面
        var titley = 130;
        var moveClip = ComponentManager.getCustomMovieClip("specialvieweffect", 10, 70);
        var moveClipBM = BaseBitmap.create("specialvieweffect1");
        moveClip.scaleX = 1.15;
        moveClip.scaleY = 1.2;
        moveClip.setPosition(GameConfig.stageWidth / 2 - moveClipBM.width * 1.15 / 2, titley - moveClipBM.height * 1.2 / 2 - 10);
        this.addChild(moveClip);
        moveClip.playWithTime(-1);
        moveClip.setVisible(false);
        var constlight = BaseBitmap.create("specialview_effect_constlight");
        constlight.anchorOffsetX = constlight.width / 2;
        constlight.anchorOffsetY = constlight.height / 2;
        constlight.setPosition(GameConfig.stageWidth / 2, titley);
        this.addChild(constlight);
        constlight.blendMode = egret.BlendMode.ADD;
        constlight.scaleX = 1.4;
        egret.Tween.get(constlight, { loop: true }).to({ scaleX: 1.6 }, 1000).to({ scaleX: 1.4 }, 1000);
        constlight.setVisible(false);
        var topArtTxt = BaseBitmap.create("servant_changeskin_text");
        topArtTxt.anchorOffsetX = topArtTxt.width / 2;
        topArtTxt.anchorOffsetY = topArtTxt.height / 2;
        topArtTxt.setPosition(GameConfig.stageWidth / 2, titley);
        this.addChild(topArtTxt);
        var topArtTxtEffect = BaseBitmap.create("servant_changeskin_text");
        topArtTxtEffect.anchorOffsetX = topArtTxtEffect.width / 2;
        topArtTxtEffect.anchorOffsetY = topArtTxtEffect.height / 2;
        topArtTxtEffect.setPosition(topArtTxt.x, topArtTxt.y);
        this.addChild(topArtTxtEffect);
        topArtTxtEffect.blendMode = egret.BlendMode.ADD;
        topArtTxtEffect.setVisible(false);
        constlight.setVisible(false);
        topArtTxt.setVisible(false);
        topArtTxtEffect.setVisible(false);
        topArtTxtEffect.alpha = 1;
        moveClip.setVisible(false);
        topArtTxt.setScale(5);
        egret.Tween.get(topArtTxt).wait(330).call(function () {
            topArtTxt.setVisible(true);
        }, this).to({ scaleX: 0.7, scaleY: 0.7 }, 160).call(function () {
            moveClip.setVisible(true);
            constlight.setVisible(true);
            topArtTxtEffect.setScale(0.7);
            topArtTxtEffect.setVisible(true);
            egret.Tween.get(topArtTxtEffect).to({ scaleX: 1.1, scaleY: 1.1 }, 70).to({ scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 200).call(function () {
                egret.Tween.removeTweens(topArtTxtEffect);
            }, _this);
        }, this).to({ scaleX: 1.1, scaleY: 1.1 }, 70).to({ scaleX: 1, scaleY: 1 }, 70).call(function () {
            egret.Tween.removeTweens(topArtTxt);
        }, this);
        // let servantVo = Api.servantVoApi.getServantObj(id);
        // this.playEffect(servantVo.sound2,true);
    };
    ServantNewChangeSkin.prototype.getCloseBtnName = function () {
        return null;
    };
    ServantNewChangeSkin.prototype.dispose = function () {
        var view = this;
        var callback = view.param.data.callback;
        var callbackThisObj = view.param.data.callbackThisObj;
        _super.prototype.dispose.call(this);
        if (callback) {
            callback.apply(callbackThisObj);
        }
    };
    return ServantNewChangeSkin;
}(PopupView));
__reflect(ServantNewChangeSkin.prototype, "ServantNewChangeSkin");
//# sourceMappingURL=ServantNewChangeSkin.js.map