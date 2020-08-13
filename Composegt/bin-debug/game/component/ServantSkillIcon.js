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
var ServantSkillIcon = (function (_super) {
    __extends(ServantSkillIcon, _super);
    function ServantSkillIcon(skill, showDetail, effect) {
        if (showDetail === void 0) { showDetail = true; }
        if (effect === void 0) { effect = false; }
        var _this = _super.call(this) || this;
        _this.isGray = false;
        _this.skillInfo = skill;
        _this.showDetail = showDetail;
        _this.showEffect = effect;
        _this.initView(skill);
        return _this;
    }
    ServantSkillIcon.prototype.initView = function (skill) {
        this._skillId = skill.skillid;
        this._icon = BaseLoadBitmap.create(skill.icon);
        this._icon.width = this._icon.height = 108;
        this.addChild(this._icon);
        if (this.showEffect) {
            this.addEffect();
        }
        this.addTouchTap(this.onTouchTap, this);
    };
    ServantSkillIcon.prototype.onTouchTap = function (e) {
        if (!this.showDetail)
            return;
        ComponentManager.getSkillDetail().showSkill(this.skillInfo, this.getLayer(), this.localToGlobal(), this._icon.width);
    };
    Object.defineProperty(ServantSkillIcon.prototype, "Size", {
        set: function (size) {
            this.width = this.height = size;
            this._icon.width = this._icon.height = size;
            if (this._effect) {
                this._effect.setPosition(this._icon.width / 2, this._icon.height / 2);
                this._effect.setScale(size / 74);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServantSkillIcon.prototype, "Gray", {
        set: function (g) {
            if (this.isGray == g)
                return;
            this.isGray = g;
            if (this.isGray) {
                App.DisplayUtil.changeToGray(this);
            }
            else {
                App.DisplayUtil.changeToNormal(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServantSkillIcon.prototype, "skillId", {
        get: function () {
            return this._skillId;
        },
        enumerable: true,
        configurable: true
    });
    ServantSkillIcon.prototype.localToGlobal = function () {
        return _super.prototype.localToGlobal.call(this);
    };
    Object.defineProperty(ServantSkillIcon.prototype, "isSkillIcon", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServantSkillIcon.prototype, "Effect", {
        set: function (effect) {
            if (this.showEffect == effect)
                return;
            this.showEffect = effect;
            if (this.showEffect) {
                this.addEffect();
            }
            else {
                this.removeEffect();
            }
        },
        enumerable: true,
        configurable: true
    });
    ServantSkillIcon.prototype.addEffect = function () {
        if (!this._effect) {
            this._effect = ComponentManager.getCustomMovieClip("cmpsbuyeffect", 10, 120);
            this._effect.blendMode = egret.BlendMode.ADD;
            this.addChild(this._effect);
            this._effect.anchorOffsetX = 133 / 2;
            this._effect.anchorOffsetY = 132 / 2;
            this._effect.setPosition(this._icon.width / 2, this._icon.height / 2);
            this._effect.setScale(this._icon.width / 74);
            this._effect.playWithTime(-1);
        }
    };
    ServantSkillIcon.prototype.removeEffect = function () {
        if (this._effect) {
            this._effect.dispose();
            this._effect = null;
        }
    };
    ServantSkillIcon.prototype.dispose = function () {
        this._icon = null;
        this._effect = null;
        _super.prototype.dispose.call(this);
    };
    return ServantSkillIcon;
}(BaseDisplayObjectContainer));
__reflect(ServantSkillIcon.prototype, "ServantSkillIcon");
