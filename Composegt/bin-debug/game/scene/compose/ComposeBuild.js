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
var ComposeBuild = (function (_super) {
    __extends(ComposeBuild, _super);
    function ComposeBuild(group) {
        var _this = _super.call(this) || this;
        _this._group = group;
        _this.init();
        return _this;
    }
    ComposeBuild.prototype.init = function () {
        // this.flyYun(null,null)
        var cfg = Config.MapinfoCfg.getStartPosCfgByGroup(this._group);
        if (cfg) {
            var rect = egret.Rectangle.create();
            if (cfg.building) {
                rect.setTo(0, 0, 368, 252);
            }
            else {
                rect.setTo(0, 0, ComposeStatus.cellBgSize.w, ComposeStatus.cellBgSize.h);
            }
            var build = BaseLoadBitmap.create(cfg.buildRes, rect);
            this._build = build;
            build.setPosition(-build.width / 2, -build.height / 2);
            this.addChild(build);
            build.addTouchTap(this.goChallenge, this);
        }
        if (Api.composemapVoApi.checkUnlock(this._group) == false || (!cfg.building)) {
            var nextUnlockGroup = Api.composemapVoApi.getNextUnlockGroup();
            if (nextUnlockGroup == this._group && Api.composemapVoApi.checkOpenUnlock()) {
                if (!cfg.building) {
                    // this.initYun();
                    this.initTip();
                }
                this.initAtk(!!cfg.building);
            }
            else {
                // this.initYun();
            }
        }
    };
    // private initYun():void
    // {
    // 	let yun1=BaseLoadBitmap.create("composeyun1");
    // 	let yun2=BaseLoadBitmap.create("composeyun2");
    // 	this._lyun=yun1;
    // 	this._ryun=yun2;
    // 	yun2.setPosition(-135,-15);
    // 	yun1.setPosition(yun2.x-43,yun2.y+56);
    // 	this.addChild(yun1);
    // 	this.addChild(yun2);
    // }
    ComposeBuild.prototype.initTip = function () {
        if (!this._tipBg) {
            var unlockStr = Api.composemapVoApi.getUnlockStrByGroup(this._group);
            if (unlockStr) {
                var textContainer = new BaseDisplayObjectContainer();
                this.addChild(textContainer);
                var bg = BaseLoadBitmap.create("composelocktipbg", new egret.Rectangle(0, 0, 151, 70));
                this._tipBg = bg;
                textContainer.addChild(bg);
                var txt = ComponentManager.getTextField(unlockStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON - 1, TextFieldConst.COLOR_BROWN_NEW);
                txt.lineSpacing = 3;
                txt.textAlign = egret.HorizontalAlign.CENTER;
                this._tipTxt = txt;
                txt.width = bg.width - 16;
                bg.setPosition(-bg.width / 2, -90 - 22); //ComposeStatus.cellCfg.h-bg.height/2);
                txt.setPosition(bg.x + 8, bg.y + 8);
                textContainer.addChild(txt);
                textContainer.width = 151;
                textContainer.height = 70;
                // textContainer.anchorOffsetX = textContainer.width/2;
                // textContainer.anchorOffsetY = textContainer.height/2;
                // textContainer.x =  textContainer.width/2;
                // textContainer.y = textContainer.height/2;
                egret.Tween.get(textContainer, {
                    loop: true,
                }).to({ scaleX: 0.9, scaleY: 0.9 }, 1000).to({ scaleX: 1, scaleY: 1.0 }, 1000);
            }
        }
    };
    ComposeBuild.prototype.initAtk = function (isbuild) {
        // if(isbuild)
        // {
        // 	if(!this._effect)
        // 	{
        // 		this._effect=ComponentManager.getCustomMovieClip("compose_b",7);
        // 		this._effect.setScale(3.8);
        // 		this._effect.setPosition(-140,ComposeStatus.cellBgSize.h*2-380-35);
        // 		this._effect.playWithTime(0);
        // 		this.addChild(this._effect);
        // 	}
        // }
        // else
        // {
        this.initTip();
        // }
        if (!this._atkBtn) {
            // let atkBtn=ComponentManager.getButton("btn_composeatk","",()=>{
            // 	ViewController.getInstance().openView(ViewConst.COMMON.CHALLENGEVIEW);
            // },this);
            var atkBtn = App.DragonBonesUtil.getLoadDragonBones("gongjianniu");
            this._atkBtn = atkBtn;
            atkBtn.setPosition(-atkBtn.width / 2, ComposeStatus.cellBgSize.h * 2 - atkBtn.height - 55 - 50 - 22);
            this.addChild(atkBtn);
            atkBtn.addTouchTap(this.goChallenge, this);
        }
        else {
            this._atkBtn.visible = true;
        }
    };
    ComposeBuild.prototype.goChallenge = function () {
        if (!Api.challengeVoApi.getChannelIslock()) {
            App.CommonUtil.showTip(Api.challengeVoApi.getChannelLockStr());
            return;
        }
        Api.rookieVoApi.checkNextStep();
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_COMPOSE_HIDEUNLOCK);
        ViewController.getInstance().openView(ViewConst.COMMON.CHALLENGEVIEW);
    };
    ComposeBuild.prototype.isUnlocked = function () {
        return Api.composemapVoApi.checkUnlock(this._group);
    };
    ComposeBuild.prototype.setAttackStatus = function () {
        var _this = this;
        var cfg = Config.MapinfoCfg.getStartPosCfgByGroup(this._group);
        // if(cfg.building)
        // {
        // 	this.flyYun(()=>{
        // 		this.initAtk(true);
        // 	},this);
        // }
        // else
        // {
        this.initAtk(false);
        this._atkBtn.alpha = 0;
        this._tipBg.visible = false;
        this._tipTxt.visible = false;
        egret.Tween.get(this._atkBtn).to({ alpha: 1 }, 1000).call(function () {
            _this._atkBtn && egret.Tween.removeTweens(_this._atkBtn);
            _this._tipBg.visible = true;
            _this._tipTxt.visible = true;
        }, this);
        // }
    };
    ComposeBuild.prototype.unlockEffect = function (callback, thisObj) {
        var effect = ComponentManager.getCustomMovieClip("compose_unlock", 10, 200);
        effect.setScale(2);
        effect.blendMode = egret.BlendMode.ADD;
        effect.setPosition(-91, -215);
        this.addChild(effect);
        var playing = true;
        var t = -1;
        var clear = function () {
            playing = false;
            effect && effect.dispose();
            if (callback) {
                callback.apply(thisObj);
            }
            if (t != -1) {
                egret.clearTimeout(t);
                t = -1;
            }
        };
        t = egret.setTimeout(function () {
            if (playing) {
                clear();
            }
        }, this, 3000);
        effect.setEndCallBack(function () {
            clear();
        }, this);
        effect.playWithTime(1);
        var unlockbmp = BaseLoadBitmap.create("composeunlock");
        unlockbmp.width = 223;
        unlockbmp.height = 40;
        unlockbmp.anchorOffsetX = unlockbmp.width * 0.5;
        unlockbmp.anchorOffsetY = unlockbmp.height * 0.5;
        unlockbmp.setScale(0.1);
        unlockbmp.alpha = 0;
        var initX = 0;
        var initY = 0;
        egret.Tween.get(unlockbmp).wait(800).to({ scaleX: 1.1, scaleY: 1.1, alpha: 1 }, 100).to({ scaleX: 1, scaleY: 1 }, 50).to({ y: initX - 50 }, 500).to({ y: initX - 75, alpha: 0 }, 250).call(function () {
            unlockbmp && unlockbmp.dispose();
        }, this);
        this.addChild(unlockbmp);
    };
    ComposeBuild.prototype.setUnlockStatus = function (callback, thisObj) {
        var _this = this;
        var cfg = Config.MapinfoCfg.getStartPosCfgByGroup(this._group);
        this.touchChildren = false;
        this.name = null;
        // if(!cfg.building)
        // {
        // this._build&&(this._build.visible=false);
        this._atkBtn && (this._atkBtn.touchChildren = false);
        // this._tipBg.visible = false;
        // this._tipTxt.visible = false;
        this.unlockEffect(function () {
            if (!cfg.building) {
                _this.dispose();
            }
            if (callback) {
                callback.apply(thisObj);
            }
            Api.composemapVoApi.setunlockedStatusById(cfg.id);
        }, this);
        // }
        // else
        // {
        // 	this._atkBtn&&this._atkBtn.dispose();
        // 	this._tipBg&&this._tipBg.dispose();
        // 	this._tipTxt&&this._tipTxt.dispose();
        // 	this._effect&&this._effect.dispose();
        // 	this._effect=null;
        // 	this._atkBtn=null;
        // 	this._tipBg=null;
        // 	this._tipTxt=null;
        // 	let effect=ComponentManager.getCustomMovieClip("compose_bulk",9,200);
        // 	effect.setPosition(0,0);
        // 	effect.setScale(4.5);
        // 	effect.setPosition(-220,-190);
        // 	effect.blendMode=egret.BlendMode.ADD;
        // 	this.addChild(effect);
        // 	effect.setEndCallBack(()=>{
        // 		effect&&effect.dispose();
        // 		if(callback)
        // 		{
        // 			callback.apply(thisObj);
        // 		}
        // 	},this);
        // 	effect.playWithTime(1);
        // }
    };
    ComposeBuild.prototype.dispose = function () {
        this._atkBtn = this._tipBg = this._tipTxt = this._build = this._effect = null;
        _super.prototype.dispose.call(this);
    };
    return ComposeBuild;
}(BaseDisplayObjectContainer));
__reflect(ComposeBuild.prototype, "ComposeBuild");
