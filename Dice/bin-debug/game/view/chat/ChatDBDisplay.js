/*
 *@description: 表情龙骨播放
 *@author: hwc
 *@date: 2020-04-22 14:10:09
 *@version 0.0.1
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
var ChatDBDisplay = (function (_super) {
    __extends(ChatDBDisplay, _super);
    function ChatDBDisplay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bg = null;
        _this.type = 1;
        _this.db = null;
        _this.num = 0;
        _this.cb = null;
        return _this;
    }
    ChatDBDisplay.prototype.dispose = function () {
        this.db && this.db.dispose();
        this.bg.dispose();
        _super.prototype.dispose.call(this);
    };
    ChatDBDisplay.prototype.init = function (type, cb) {
        var view = this;
        this.cb = cb;
        var mask = BaseBitmap.create("public_alphabg");
        mask.height = 80;
        mask.width = 150;
        this.addChild(mask);
        mask.x = -10;
        mask.y = 100;
        mask.addTouchTap(function () { }, view);
        this.type = type;
        var url = (this.type == 1) ? "chatview_exp_bg1" : "chatview_exp_bg2";
        var bg = BaseBitmap.create(url);
        this.addChild(bg);
        this.bg = bg;
        this.touchEnabled = false;
        this.touchChildren = false;
        // mask.width = bg.width + 20;
        // mask.height = bg.height + 30;
    };
    ChatDBDisplay.prototype.displayDB = function (url) {
        var soundEffectName = this.getEffectName(url);
        soundEffectName && SoundMgr.playEffect(soundEffectName);
        var db = App.DragonBonesUtil.getLoadDragonBones(url);
        db.width = 81;
        db.height = 103;
        db.x = 50;
        db.y = (this.type == 1) ? 70 : 90;
        this.addChild(db);
        db.playDragonMovie("idle", 1);
        this.db = db;
        this.num = 0;
        db.setDragonBoneEventListener(dragonBones.EventObject.LOOP_COMPLETE, this.DBListener, this);
    };
    ChatDBDisplay.prototype.getEffectName = function (url) {
        switch (url) {
            case "dianzan": return SoundConst.EFFECT_EMOJI_1001;
            case "fennu": return SoundConst.EFFECT_EMOJI_1002;
            case "daku": return SoundConst.EFFECT_EMOJI_1003;
            case "daxiao": return SoundConst.EFFECT_EMOJI_1004;
            case "koubizi": return SoundConst.EFFECT_EMOJI_1005;
            case "kaixin": return SoundConst.EFFECT_EMOJI_2001;
            case "juqi": return SoundConst.EFFECT_EMOJI_2002;
            case "leile": return SoundConst.EFFECT_EMOJI_2003;
            case "wanku": return SoundConst.EFFECT_EMOJI_2004;
            case "xuanyao": return SoundConst.EFFECT_EMOJI_2005;
            default: return null;
        }
    };
    ChatDBDisplay.prototype.DBListener = function () {
        if (this.num > 3) {
            this.cb && this.cb();
            this.removeChild(this.db);
            this.db.dispose();
            this.db = null;
            // this.visible =false;
            this.parent.removeChild(this);
        }
        this.num++;
    };
    return ChatDBDisplay;
}(BaseDisplayObjectContainer));
__reflect(ChatDBDisplay.prototype, "ChatDBDisplay");
//# sourceMappingURL=ChatDBDisplay.js.map