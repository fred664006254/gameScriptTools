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
var ScenePerson = (function (_super) {
    __extends(ScenePerson, _super);
    function ScenePerson() {
        var _this = _super.call(this) || this;
        _this._cfg = null;
        _this._curIdx = 0;
        _this._name = [];
        return _this;
    }
    ScenePerson.prototype.init = function (name, sceneId) {
        this._cfg = Config.SceneeffectCfg.getEffectCfg(name, sceneId);
        this._name = name.split("_");
        this._myClip = ComponentManager.getCustomMovieClip();
        this._myClip.frameRate = 167;
        this.addChild(this._myClip);
        if (name == "dageng_2") {
            this._myClip.setScale(1.3);
        }
        this.showAnim();
    };
    ScenePerson.prototype.showAnim = function () {
        var cfglength = this._cfg.length;
        if (this._curIdx >= cfglength) {
            this._curIdx = 0;
        }
        if (this._myClip.isPlaying == true) {
            this._myClip.stop();
        }
        this._myClip.setEndCallBack(null, null);
        var curCfg = this._cfg[this._curIdx];
        this._myClip.visible = true;
        if (curCfg.wait) {
            this._myClip.visible = false;
            egret.Tween.get(this._myClip).wait(curCfg.wait * 1000).call(this.animCallback, this);
        }
        else {
            if (curCfg.pos) {
                this.x = curCfg.pos.x;
                this.y = curCfg.pos.y;
            }
            if (curCfg.scalex) {
                this.scaleX = curCfg.scalex;
            }
            var framess = [];
            for (var i = 1; i <= curCfg.frames; i++) {
                if (this._name[0] == "cruise" && this._name[1] == "2") {
                    var realIdx = this._curIdx == 0 ? 1 : 0;
                    framess.push("scene_ef_" + this._name[0] + "_" + realIdx + "_" + i);
                }
                else {
                    var reskey = this._curIdx;
                    if (curCfg.framekey != null) {
                        reskey = curCfg.framekey;
                    }
                    framess.push("scene_ef_" + this._name[0] + "_" + reskey + "_" + i);
                }
            }
            this._myClip.frameImages = framess;
            this._myClip.setStopFrame(0);
            if (cfglength == 1) {
                this._myClip.playWithTime(0);
            }
            else if (curCfg.endcall == true) {
                this._myClip.setEndCallBack(this.animCallback, this);
                this._myClip.playWithTime(1);
            }
            else if (curCfg.pos2) {
                this._myClip.playWithTime(0);
                egret.Tween.get(this).to({ x: curCfg.pos2.x, y: curCfg.pos2.y }, curCfg.movetime * 1000).call(this.animCallback, this);
            }
            else if (curCfg.timeinter) {
                this._myClip.playWithTime(0);
                var t = App.MathUtil.getRandom(curCfg.timeinter[0], curCfg.timeinter[1]);
                egret.Tween.get(this._myClip).wait(t * 1000).call(this.animCallback, this);
            }
        }
    };
    ScenePerson.prototype.animCallback = function () {
        this._curIdx++;
        this.showAnim();
    };
    ScenePerson.prototype.dispose = function () {
        egret.Tween.removeTweens(this._myClip);
        this._myClip.dispose();
        this._myClip = null;
        this._cfg = null;
        this._curIdx = 0;
        this._name.length = 0;
        _super.prototype.dispose.call(this);
    };
    return ScenePerson;
}(BaseDisplayObjectContainer));
__reflect(ScenePerson.prototype, "ScenePerson");
//# sourceMappingURL=ScenePerson.js.map