/**
 * 英文版新手引导剧情
 * author shaoliang
 * date 2019/9/17
 * @class RookieEnStoryView
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
var RookieEnStoryView = (function (_super) {
    __extends(RookieEnStoryView, _super);
    function RookieEnStoryView() {
        var _this = _super.call(this) || this;
        _this._sectionNode = null;
        _this._isPlaying = false;
        _this._curIdx = 0;
        _this._tipNode = null;
        _this._titleBg = null;
        _this._titleText = null;
        _this._descText = null;
        _this._descContent = null;
        _this._isCodon = false;
        _this._codonLength = 0;
        _this._playingTab = [];
        _this._effectName = null;
        _this._cfg = {
            "4": { t: 0.2, n: "MarcoPolo" },
            "5": { t: 0.2, n: "storyNPCName1" },
            "6": { t: 0.5, n: "MarcoPolo" },
            "7": { t: 0.2, n: "MarcoPolo" },
            "9": { t: 0.2, n: "storyNPCName1" },
        };
        return _this;
    }
    RookieEnStoryView.prototype.getTitleBgName = function () {
        return null;
    };
    RookieEnStoryView.prototype.getTitleStr = function () {
        return null;
    };
    RookieEnStoryView.prototype.getBgName = function () {
        return "acbeautyvoteview_black";
    };
    RookieEnStoryView.prototype.getResourceList = function () {
        var guidePic = [];
        return guidePic.concat([
            "story_en_section1_1", "story_en_section1_2", "story_en_section1_3",
            "story_en_sprite1_1", "story_en_sprite1_2", "story_en_sprite1_3",
            "story_en_section2_1", "story_en_section2_2", "story_en_section2_3",
            "story_en_sprite2_1", "story_en_sprite2_2", "story_en_sprite2_3", "story_en_sprite2_4",
            "story_en_section3_1", "story_en_section3_2", "story_en_section3_3",
            "story_en_sprite3_1", "story_en_sprite3_2", "story_en_sprite3_3", "story_en_sprite3_4",
            "guide_tex_json", "guide_tex_png", "guide_ske", "acbeautyvoteview_black",
            "story_en_final_bg", "acliangbiographyview_common_acbg", "guideNameBg"
        ]);
    };
    RookieEnStoryView.prototype.initView = function () {
        this.addTouchTap(this.clickPage, this);
        SoundManager.playBg(SoundConst.MUSIC_ROOKIE_ENSTORY);
        this._tipNode = new BaseDisplayObjectContainer();
        this.addChild(this._tipNode);
        var tipbg = BaseBitmap.create("acliangbiographyview_common_acbg");
        tipbg.height = 170;
        tipbg.width = GameConfig.stageWidth;
        tipbg.setPosition(0, GameConfig.stageHeigth);
        tipbg.scaleY = -1;
        this._tipNode.addChild(tipbg);
        var continueText = ComponentManager.getTextField(LanguageManager.getlocal("clickContinue"), 20);
        continueText.setPosition(tipbg.x + tipbg.width - continueText.width - 50, tipbg.y - continueText.height - 20);
        continueText.textColor = TextFieldConst.COLOR_WARN_GREEN;
        this._tipNode.addChild(continueText);
        this.textAnim(continueText);
        this._titleBg = BaseBitmap.create("guideNameBg");
        this._titleBg.setPosition(25, tipbg.y - tipbg.height - 50);
        this._tipNode.addChild(this._titleBg);
        this._titleBg.visible = false;
        this._titleText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this._titleText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        this._titleText.setPosition(30, tipbg.y - tipbg.height - 42);
        this._tipNode.addChild(this._titleText);
        this._descText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._descText.width = GameConfig.stageWidth - 60;
        this._descText.lineSpacing = 8;
        this._descText.setPosition(30, tipbg.y - tipbg.height + 38);
        this._tipNode.addChild(this._descText);
        this._curIdx = 0;
        this.clickPage();
    };
    RookieEnStoryView.prototype.textAnim = function (t) {
        egret.Tween.removeTweens(t);
        var oldx = t.x;
        var oldy = t.y;
        var newx = t.x - t.width * 0.1;
        var newy = t.y - t.height * 0.1;
        egret.Tween.get(t).to({ scaleX: 1.2, scaleY: 1.2, x: newx, y: newy }, 600).to({ scaleX: 1, scaleY: 1, x: oldx, y: oldy }, 600).to({ scaleX: 1.2, scaleY: 1.2, x: newx, y: newy }, 600).to({ scaleX: 1, scaleY: 1, x: oldx, y: oldy }, 600).call(this.textAnim, this, [t]);
    };
    RookieEnStoryView.prototype.textShootAnim = function () {
        if (this._isCodon == false) {
            return;
        }
        this._codonLength += 1;
        if (this._codonLength > this._descContent.length) {
            this._isCodon = false;
            this._descText.text = this._descContent;
        }
        else {
            this._descText.text = this._descContent.substr(0, this._codonLength);
            egret.Tween.get(this._descText).wait(100).call(this.textShootAnim, this);
        }
    };
    RookieEnStoryView.prototype.clickPage = function () {
        if (this._curIdx == 10) {
            // this.hide();
            return;
        }
        else if (this._curIdx == 11) {
            if (this._isCodon == true) {
                this._isCodon = false;
                this._descText.text = this._descContent;
            }
            else {
                this.showOldGuide();
            }
            return;
        }
        if (this._isCodon == false && this._isPlaying == false) {
            this._curIdx++;
            this._playingTab.length = 0;
            this["showPage" + this._curIdx]();
            this.showText();
            PlatformManager.analyticsNewGuide(this._curIdx + 3);
        }
        else {
            if (this._isCodon == true) {
                this._isCodon = false;
                this._descText.text = this._descContent;
            }
            if (this._isPlaying == true) {
                this._isPlaying = false;
                for (var i = 0; i < this._playingTab.length; i++) {
                    egret.Tween.removeTweens(this._playingTab[i]);
                }
                this["skipPage" + this._curIdx]();
            }
        }
    };
    RookieEnStoryView.prototype.skipPage1 = function () {
        this._playingTab[0].alpha = 1;
        this._playingTab[1].alpha = 1;
        this._playingTab[1].x = 329;
    };
    RookieEnStoryView.prototype.showPage1 = function () {
        this._isPlaying = true;
        this._sectionNode = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._sectionNode);
        var section1 = BaseBitmap.create("story_en_section1_1");
        this._sectionNode.addChild(section1);
        var sprite1 = BaseBitmap.create("story_en_sprite1_1");
        sprite1.x = 385;
        this._sectionNode.addChild(sprite1);
        this._playingTab.push(section1);
        this._playingTab.push(sprite1);
        section1.alpha = 0;
        sprite1.alpha = 0;
        var view = this;
        egret.Tween.get(sprite1).to({ alpha: 1 }, 1000);
        egret.Tween.get(sprite1).wait(500).to({ x: 347 }, 1000).to({ x: 329 }, 1000).call(function () {
            view._isPlaying = false;
        });
        egret.Tween.get(section1).to({ alpha: 1 }, 1000).wait(1000);
        if (this._effectName) {
            SoundManager.stopEffect(this._effectName);
        }
        this.playmyEffect("rookieenstorydesc1");
    };
    RookieEnStoryView.prototype.playmyEffect = function (effanme) {
        if (Api.switchVoApi.checkOpenRookTalkEffect()) {
            this._effectName = effanme;
            SoundManager.playEffect(this._effectName);
        }
    };
    RookieEnStoryView.prototype.skipPage2 = function () {
        this._playingTab[0].alpha = 1;
        this._playingTab[1].alpha = 1;
        this._playingTab[1].x = 282;
        this._playingTab[1].y = 429;
    };
    RookieEnStoryView.prototype.showPage2 = function () {
        this._isPlaying = true;
        var section2 = BaseBitmap.create("story_en_section1_2");
        section2.y = 250;
        this._sectionNode.addChild(section2);
        var sprite2 = BaseBitmap.create("story_en_sprite1_2");
        sprite2.setPosition(313, 453);
        this._sectionNode.addChild(sprite2);
        section2.alpha = 0;
        sprite2.alpha = 0;
        this._playingTab.push(section2);
        this._playingTab.push(sprite2);
        var view = this;
        egret.Tween.get(sprite2).to({ alpha: 1, x: 289, y: 435 }, 1000).to({ x: 282, y: 429 }, 1000).call(function () {
            view._isPlaying = false;
        });
        egret.Tween.get(section2).to({ alpha: 1 }, 1000);
        if (this._effectName) {
            SoundManager.stopEffect(this._effectName);
        }
        this.playmyEffect("rookieenstorydesc2");
    };
    RookieEnStoryView.prototype.skipPage3 = function () {
        this._playingTab[1].alpha = 1;
        this._playingTab[0].y = 511;
        this._playingTab[1].y = 519;
        egret.Tween.get(this._playingTab[1], { loop: true }).to({ y: 516 }, 1000).to({ y: 519 }, 1000);
    };
    RookieEnStoryView.prototype.showPage3 = function () {
        this._isPlaying = true;
        var section3 = BaseBitmap.create("story_en_section1_3");
        section3.y = 1136;
        this._sectionNode.addChild(section3);
        var sprite3 = BaseBitmap.create("story_en_sprite1_3");
        sprite3.setPosition(0, 511);
        this._sectionNode.addChild(sprite3);
        this._playingTab.push(section3);
        this._playingTab.push(sprite3);
        sprite3.alpha = 0;
        var view = this;
        egret.Tween.get(section3).to({ y: 582 }, 200);
        egret.Tween.get(sprite3).wait(500).to({ alpha: 1 }, 500);
        egret.Tween.get(sprite3).wait(500).to({ y: 519 }, 1500).call(function () {
            view._isPlaying = false;
            egret.Tween.get(sprite3, { loop: true }).to({ y: 516 }, 1000).to({ y: 519 }, 1000);
        });
        if (this._effectName) {
            SoundManager.stopEffect(this._effectName);
        }
        this.playmyEffect("rookieenstorydesc3");
    };
    RookieEnStoryView.prototype.skipPage4 = function () {
        this._playingTab[0].x = 0;
        this._playingTab[1].alpha = 1;
        this._playingTab[2].alpha = 1;
    };
    RookieEnStoryView.prototype.showPage4 = function () {
        this._sectionNode.dispose();
        this._sectionNode = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._sectionNode);
        this._isPlaying = true;
        var section1 = BaseBitmap.create("story_en_section2_1");
        section1.x = -640;
        this._sectionNode.addChild(section1);
        //马克
        var sprite1 = BaseBitmap.create("story_en_sprite2_2");
        sprite1.x = 640 - sprite1.width;
        sprite1.y = 32;
        this._sectionNode.addChild(sprite1);
        //我
        var sprite2 = BaseBitmap.create("story_en_sprite2_1");
        this._sectionNode.addChild(sprite2);
        this._playingTab.push(section1);
        this._playingTab.push(sprite1);
        this._playingTab.push(sprite2);
        sprite1.alpha = 0;
        sprite2.alpha = 0;
        var view = this;
        egret.Tween.get(section1).to({ x: 0 }, 300);
        egret.Tween.get(sprite1).wait(300).to({ alpha: 1 }, 300);
        egret.Tween.get(sprite2).wait(900).to({ alpha: 1 }, 300).call(function () {
            view._isPlaying = false;
        });
        if (this._effectName) {
            SoundManager.stopEffect(this._effectName);
        }
        this.playmyEffect("rookieenstorydesc4");
    };
    RookieEnStoryView.prototype.skipPage5 = function () {
        this._playingTab[0].x = 0;
        this._playingTab[1].alpha = 1;
    };
    RookieEnStoryView.prototype.showPage5 = function () {
        this._isPlaying = true;
        var section1 = BaseBitmap.create("story_en_section2_2");
        section1.x = 640;
        section1.y = 347;
        this._sectionNode.addChild(section1);
        //我
        var sprite1 = BaseBitmap.create("story_en_sprite2_3");
        sprite1.x = 640 - sprite1.width;
        sprite1.y = section1.y - 22;
        this._sectionNode.addChild(sprite1);
        this._playingTab.push(section1);
        this._playingTab.push(sprite1);
        sprite1.alpha = 0;
        var view = this;
        egret.Tween.get(section1).to({ x: 0 }, 300);
        egret.Tween.get(sprite1).wait(300).to({ alpha: 1 }, 300).call(function () {
            view._isPlaying = false;
        });
        if (this._effectName) {
            SoundManager.stopEffect(this._effectName);
        }
        this.playmyEffect("rookieenstorydesc5");
    };
    RookieEnStoryView.prototype.skipPage6 = function () {
        this._playingTab[0].y = 673;
        this._playingTab[1].x = 0;
    };
    RookieEnStoryView.prototype.showPage6 = function () {
        this._isPlaying = true;
        var section1 = BaseBitmap.create("story_en_section2_3");
        section1.y = 1136;
        this._sectionNode.addChild(section1);
        //马克
        var sprite1 = BaseBitmap.create("story_en_sprite2_4");
        sprite1.x = -454;
        sprite1.y = 622;
        this._sectionNode.addChild(sprite1);
        this._playingTab.push(section1);
        this._playingTab.push(sprite1);
        var view = this;
        egret.Tween.get(section1).to({ y: 673 }, 500);
        egret.Tween.get(sprite1).to({ x: 0 }, 500).call(function () {
            view._isPlaying = false;
        });
        if (this._effectName) {
            SoundManager.stopEffect(this._effectName);
        }
        this.playmyEffect("rookieenstorydesc6");
    };
    RookieEnStoryView.prototype.skipPage7 = function () {
        this._playingTab[0].alpha = 1;
        this._playingTab[1].alpha = 1;
    };
    RookieEnStoryView.prototype.showPage7 = function () {
        this._sectionNode.dispose();
        this._sectionNode = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._sectionNode);
        this._isPlaying = true;
        var section1 = BaseBitmap.create("story_en_section3_1");
        this._sectionNode.addChild(section1);
        //马克 & 我
        var sprite1 = BaseBitmap.create("story_en_sprite3_1");
        sprite1.y = 15;
        this._sectionNode.addChild(sprite1);
        this._playingTab.push(section1);
        this._playingTab.push(sprite1);
        sprite1.alpha = 0;
        section1.alpha = 0;
        var view = this;
        egret.Tween.get(section1).to({ alpha: 1 }, 500);
        egret.Tween.get(sprite1).wait(400).to({ alpha: 1 }, 600).call(function () {
            view._isPlaying = false;
        });
        if (this._effectName) {
            SoundManager.stopEffect(this._effectName);
        }
        this.playmyEffect("rookieenstorydesc7");
    };
    RookieEnStoryView.prototype.skipPage8 = function () {
        this._playingTab[0].x = 0;
        this._playingTab[1].alpha = 1;
        this._playingTab[2].alpha = 1;
    };
    RookieEnStoryView.prototype.showPage8 = function () {
        this._isPlaying = true;
        var section1 = BaseBitmap.create("story_en_section3_2");
        section1.setPosition(640, 406);
        this._sectionNode.addChild(section1);
        //我
        var sprite1 = BaseBitmap.create("story_en_sprite3_2");
        sprite1.setPosition(640 - sprite1.width, section1.y + 22);
        this._sectionNode.addChild(sprite1);
        //表
        var sprite2 = BaseBitmap.create("story_en_sprite3_3");
        sprite2.setPosition(261, 572);
        this._sectionNode.addChild(sprite2);
        this._playingTab.push(section1);
        this._playingTab.push(sprite1);
        this._playingTab.push(sprite2);
        sprite1.alpha = 0;
        sprite2.alpha = 0;
        var view = this;
        egret.Tween.get(section1).to({ x: 0 }, 200);
        egret.Tween.get(sprite1).wait(200).to({ alpha: 1 }, 600).call(function () {
            view._isPlaying = false;
        });
        egret.Tween.get(sprite2).wait(200).to({ alpha: 1 }, 600);
        egret.Tween.get(sprite2).wait(200).to({ x: 288, y: 577 }, 6400);
        if (this._effectName) {
            SoundManager.stopEffect(this._effectName);
        }
        this.playmyEffect("rookieenstorydesc8");
    };
    RookieEnStoryView.prototype.skipPage9 = function () {
        this._playingTab[0].y = 626;
        this._playingTab[1].y = 626 + 77;
        this._playingTab[1].alpha = 1;
    };
    RookieEnStoryView.prototype.showPage9 = function () {
        this._isPlaying = true;
        var section1 = BaseBitmap.create("story_en_section3_3");
        section1.y = 1136;
        this._sectionNode.addChild(section1);
        //表
        var sprite1 = BaseBitmap.create("story_en_sprite3_4");
        sprite1.y = 626 + 77;
        this._sectionNode.addChild(sprite1);
        this._playingTab.push(section1);
        this._playingTab.push(sprite1);
        sprite1.alpha = 0;
        var view = this;
        egret.Tween.get(section1).to({ y: 626 }, 200);
        egret.Tween.get(sprite1).wait(200).to({ alpha: 1 }, 600).call(function () {
            view._isPlaying = false;
        });
        if (this._effectName) {
            SoundManager.stopEffect(this._effectName);
        }
        this.playmyEffect("rookieenstorydesc9");
    };
    //
    RookieEnStoryView.prototype.showPage10 = function () {
        var _this = this;
        var finalBg = BaseBitmap.create("story_en_final_bg");
        this.addChild(finalBg);
        finalBg.alpha = 0;
        var view = this;
        // this._sectionNode.anchorOffsetX = 320;
        // this._sectionNode.anchorOffsetY = 568;
        // this._sectionNode.x = 320;
        // this._sectionNode.y = 568;
        var posx = 203 - 320 - 20;
        var posy = -1136 * 2.15 - 568 + 830 + 150;
        if (this._effectName) {
            SoundManager.stopEffect(this._effectName);
        }
        egret.Tween.get(this._sectionNode).to({ x: posx, y: posy, scaleX: 3.15, scaleY: 3.15 }, 2800).call(function () {
            egret.Tween.get(finalBg).to({ alpha: 1 }, 1000);
            if (!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon()) {
                _this.playmyEffect("rookieenstorydesc10");
                SoundManager.playBg("effect_enstory_battlegrond");
                var dragonBone_1 = App.DragonBonesUtil.getLoadDragonBones("guide", 1);
                dragonBone_1.x = 320;
                dragonBone_1.y = 568;
                view.addChild(dragonBone_1);
                dragonBone_1.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function () {
                    dragonBone_1.dispose();
                }, view);
            }
        }).to({ alpha: 0 }, 1000).call(function () {
            view.showPage11();
        });
    };
    RookieEnStoryView.prototype.showPage11 = function () {
        PlatformManager.analyticsNewGuide(13);
        SoundManager.playBg(SoundConst.MUSIC_ROOKIE_ENSTORY2);
        this._sectionNode.dispose();
        this._sectionNode = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._sectionNode);
        this._curIdx = 11;
        var continueText = ComponentManager.getTextField(LanguageManager.getlocal("clickContinue"), 20);
        continueText.setPosition(GameConfig.stageWidth - continueText.width - 50, GameConfig.stageHeigth - continueText.height - 20);
        continueText.textColor = TextFieldConst.COLOR_WARN_GREEN;
        this.addChild(continueText);
        this.textAnim(continueText);
        var descBg = BaseBitmap.create("public_9_bg86");
        descBg.width = 500;
        descBg.setPosition(70, 260);
        this.addChild(descBg);
        this._descContent = LanguageManager.getlocal("rookieEnStoryDesc10");
        this._descText = ComponentManager.getTextField(this._descContent, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WHITE);
        this._descText.width = GameConfig.stageWidth - 300;
        this._descText.lineSpacing = 6;
        // this._descText.textAlign = egret.HorizontalAlign.CENTER;
        this._descText.setPosition(150, descBg.y + 15);
        this.addChild(this._descText);
        descBg.height = this._descText.height + 30;
        this._descText.text = "";
        this._codonLength = 0;
        this._isCodon = true;
        egret.Tween.get(this._descText).call(this.textShootAnim2, this);
    };
    RookieEnStoryView.prototype.showText = function () {
        var cfg = this._cfg[String(this._curIdx)];
        if (this._curIdx > 9) {
            return;
        }
        this._isCodon = true;
        this._codonLength = 0;
        this._descText.text = "";
        var dt = 300;
        if (cfg && cfg.t) {
            dt = cfg.t * 1000;
        }
        this._descContent = LanguageManager.getlocal("rookieEnStoryDesc" + this._curIdx);
        if (this._curIdx == 9 && Api.switchVoApi.checkOpenBlueWife() && Api.playerVoApi.getUserSex(Api.playerVoApi.getPlayePicId()) == 2) {
            this._descContent = LanguageManager.getlocal("rookieEnStoryDesc9_male");
        }
        egret.Tween.get(this._descText).wait(dt).call(this.textShootAnim, this);
        if (cfg && cfg.n) {
            this._titleText.text = LanguageManager.getlocal(cfg.n);
            this._titleText.x = this._titleBg.x + this._titleBg.width / 2 - this._titleText.width / 2;
            this._titleBg.visible = true;
        }
        else {
            this._titleText.text = "";
            this._titleBg.visible = false;
        }
    };
    RookieEnStoryView.prototype.textShootAnim2 = function () {
        if (this._isCodon == false) {
            return;
        }
        this._codonLength += 1;
        if (this._codonLength > this._descContent.length) {
            this._isCodon = false;
            this._descText.text = this._descContent;
        }
        else {
            this._descText.text = this._descContent.substr(0, this._codonLength);
            egret.Tween.get(this._descText).wait(100).call(this.textShootAnim2, this);
        }
    };
    RookieEnStoryView.prototype.showOldGuide = function () {
        Api.rookieVoApi.isInGuiding = true;
        RookieCfg.rookieCfg["1"].descId = 919001;
        RookieCfg.rookieCfg["2"].descId = 919002;
        RookieCfg.rookieCfg["3"].descId = 919004;
        RookieCfg.rookieCfg["4"].descId = 919003;
        // RookieCfg.rookieCfg["2"].nextId = "4";
        RookieCfg.rookieCfg["1"].nameId = null;
        ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW, { idx: "1", f: this.param.data.f, o: this.param.data.o });
        this.hide();
    };
    RookieEnStoryView.prototype.dispose = function () {
        this._sectionNode = null;
        this._isPlaying = false;
        this._curIdx = 0;
        this._tipNode = null;
        this._titleBg = null;
        this._titleText = null;
        this._descText = null;
        this._descContent = null;
        this._isCodon = false;
        this._codonLength = 0;
        if (this._descText) {
            egret.Tween.removeTweens(this._descText);
        }
        this._descText = null;
        this._playingTab.length = 0;
        if (this._effectName) {
            SoundManager.stopEffect(this._effectName);
        }
        this._effectName = null;
        _super.prototype.dispose.call(this);
    };
    return RookieEnStoryView;
}(BaseView));
__reflect(RookieEnStoryView.prototype, "RookieEnStoryView");
//# sourceMappingURL=RookieEnStoryView.js.map