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
 * 成年成亲vo
 * author dky
 * date 2017/10/31
 * @class AdultMarryInfoVo
 */
var AdultMarryInfoVo = (function (_super) {
    __extends(AdultMarryInfoVo, _super);
    function AdultMarryInfoVo() {
        var _this = _super.call(this) || this;
        // id
        _this.id = "";
        // 母亲id
        _this.motherId = 0;
        // 子嗣的名称
        _this.name = "";
        // level
        _this.level = 0;
        // 性别 1男，2女
        _this.sex = 0;
        // 品质
        _this.quality = 0;
        // 身份
        _this.aquality = 0;
        // 自己小孩总属性值
        _this.total = 0;
        // 伴侣总属性值
        _this.ftotal = 0;
        // 伴侣的名字
        _this.fname = "";
        // 伴侣父亲的名字
        _this.funame = "";
        // 伴侣父亲的uid
        _this.fuid = 0;
        // 伴侣属性
        _this.fattr = 0;
        // 结婚的时间
        _this.mts = 0;
        //是否互访
        _this.visit = 0;
        _this.visitname = '';
        return _this;
    }
    // todo  根据配置添加get方法，比如，子嗣头像，子嗣当前阶段，当前升级需要经验等
    AdultMarryInfoVo.prototype.initData = function (data) {
        if (data) {
            if (data.mother) {
                this.motherId = Number(data.mother);
            }
            if (data.name) {
                this.name = String(data.name);
            }
            if (data.vigour) {
                this.vigour = data.vigour;
            }
            if (data.lv) {
                this.level = Number(data.lv);
            }
            if (data.sex) {
                this.sex = Number(data.sex);
            }
            if (data.quality) {
                this.quality = Number(data.quality);
            }
            if (data.aquality) {
                this.aquality = Number(data.aquality);
            }
            if (this.attrVo == null) {
                this.attrVo = new AdultAttrVo();
                // this.attrVo.initData(data.attr)
            }
            if (data.attr) {
                this.attrVo.initData(data.attr);
            }
            if (data.pro) {
                this.pro = data.pro;
            }
            if (data.total) {
                this.total = data.total;
            }
            if (data.ftotal) {
                this.ftotal = data.ftotal;
            }
            if (data.fname) {
                this.fname = data.fname;
            }
            if (data.funame) {
                this.funame = data.funame;
            }
            if (data.funame) {
                this.funame = data.funame;
            }
            if (data.fattr) {
                this.fattr = data.fattr;
            }
            if (data.mts) {
                this.mts = data.mts;
            }
            if (data.visit) {
                this.visit = data.visit;
            }
            if (data.visitname) {
                this.visitname = data.visitname;
            }
        }
    };
    AdultMarryInfoVo.prototype.dispose = function () {
        this.id = "";
        this.motherId = 0;
        this.name = "";
        this.vigour = 0;
        this.level = 0;
        this.sex = 0;
        this.quality = 0;
        if (this.attrVo) {
            this.attrVo.dispose();
            this.attrVo = null;
        }
    };
    return AdultMarryInfoVo;
}(BaseVo));
__reflect(AdultMarryInfoVo.prototype, "AdultMarryInfoVo");
