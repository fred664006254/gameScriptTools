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
 * 子嗣vo
 * author dmj
 * date 2017/9/23
 * @class ChildrenInfoVo
 */
var ChildInfoVo = (function (_super) {
    __extends(ChildInfoVo, _super);
    function ChildInfoVo() {
        var _this = _super.call(this) || this;
        // id
        _this.id = "";
        // 母亲id
        _this.motherId = 0;
        // 子嗣的名称
        _this.name = "";
        // level
        _this.level = 0;
        // exp
        _this.exp = 0;
        // 性别 1男，2女
        _this.sex = 0;
        // 品质
        _this.quality = 0;
        // 出生时间
        _this.bts = 0;
        // 子嗣的形象1~5
        _this.character = 0;
        _this.lastLevel = 0;
        _this.lastExp = 0;
        return _this;
    }
    // todo  根据配置添加get方法，比如，子嗣头像，子嗣当前阶段，当前升级需要经验等
    ChildInfoVo.prototype.initData = function (data) {
        if (data) {
            if (data.mother != null) {
                this.motherId = Number(data.mother);
            }
            if (data.name != null) {
                this.name = String(data.name);
            }
            if (data.vigour) {
                this.vigour = data.vigour;
            }
            if (data.lv != null) {
                this.lastLevel = this.lastLevel == 0 ? Number(data.lv) : this.level;
                this.level = Number(data.lv);
            }
            if (data.sex != null) {
                this.sex = Number(data.sex);
            }
            if (data.quality != null) {
                this.quality = Number(data.quality);
            }
            if (this.attrVo == null) {
                this.attrVo = new ChildAttrVo();
                // this.attrVo.initData(data.attr)
            }
            if (data.attr != null) {
                this.attrVo.initData(data.attr);
            }
            if (data.exp != null) {
                this.lastExp = this.exp;
                this.exp = Number(data.exp);
            }
            if (data.bts != null) {
                this.bts = Number(data.bts);
            }
            if (data.character != null) {
                this.character = Number(data.character);
            }
        }
    };
    ChildInfoVo.prototype.dispose = function () {
        this.id = "";
        this.motherId = 0;
        this.name = "";
        this.vigour = 0;
        this.level = 0;
        this.sex = 0;
        this.quality = 0;
        this.exp = 0;
        this.bts = 0;
        this.lastExp = 0;
        this.lastLevel = 0;
        if (this.attrVo) {
            this.attrVo.dispose();
            this.attrVo = null;
        }
    };
    return ChildInfoVo;
}(BaseVo));
__reflect(ChildInfoVo.prototype, "ChildInfoVo");
