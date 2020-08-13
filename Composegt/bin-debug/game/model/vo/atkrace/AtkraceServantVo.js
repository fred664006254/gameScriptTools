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
var AtkraceServantVo = (function (_super) {
    __extends(AtkraceServantVo, _super);
    function AtkraceServantVo() {
        var _this = _super.call(this) || this;
        /**
         * 当前属性
         */
        _this.attr = 0;
        /**
         * 满血
         */
        _this.fullattr = 0;
        /**
         * 总资质
         */
        _this.ability = 0;
        /**
         * 等级
         */
        _this.lv = 0;
        /**
         * 门客id
         */
        _this.sid = null;
        /**
         * 技能1等级
         */
        _this.s1lv = 0;
        /**
         * 技能2等级
         */
        _this.s2lv = 0;
        /**
         * 爵位
         */
        _this.clv = 0;
        _this.skin = null;
        return _this;
    }
    AtkraceServantVo.prototype.initData = function (data) {
        if (data) {
            this.attr = data.attr;
            this.fullattr = data.fullattr;
            this.ability = data.ability;
            this.lv = data.lv;
            this.sid = data.sid;
            this.s1lv = data.s1lv;
            this.s2lv = data.s2lv;
            this.skin = data.skin;
            if (this.clv != null) {
                this.clv = data.clv;
            }
        }
    };
    AtkraceServantVo.prototype.dispose = function () {
        this.id = null;
        this.attr = 0;
        this.fullattr = 0;
        this.ability = 0;
        this.lv = 0;
        this.sid = null;
        this.s1lv = 0;
        this.s2lv = 0;
        this.clv = 0;
        this.skin = null;
    };
    return AtkraceServantVo;
}(BaseVo));
__reflect(AtkraceServantVo.prototype, "AtkraceServantVo");
