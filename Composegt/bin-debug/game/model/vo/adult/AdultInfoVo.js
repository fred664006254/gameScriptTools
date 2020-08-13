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
 * 成年vo
 * author dky
 * date 2017/9/23
 * @class AdultInfoVo
 */
var AdultInfoVo = (function (_super) {
    __extends(AdultInfoVo, _super);
    function AdultInfoVo() {
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
        // 科举时间
        _this.ts = 0;
        //拜访的对象
        _this.visit = 0;
        _this.shareCd = 0;
        return _this;
    }
    // todo  根据配置添加get方法，比如，子嗣头像，子嗣当前阶段，当前升级需要经验等
    AdultInfoVo.prototype.initData = function (data) {
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
            if (data.ts) {
                this.ts = data.ts;
            }
            if (data.visit) {
                this.visit = data.visit;
            }
            if (data.shareCd != null) {
                this.shareCd = data.shareCd;
            }
        }
    };
    AdultInfoVo.prototype.dispose = function () {
        this.id = "";
        this.motherId = 0;
        this.name = "";
        this.vigour = 0;
        this.level = 0;
        this.sex = 0;
        this.quality = 0;
        this.shareCd = 0;
        if (this.attrVo) {
            this.attrVo.dispose();
            this.attrVo = null;
        }
    };
    return AdultInfoVo;
}(BaseVo));
__reflect(AdultInfoVo.prototype, "AdultInfoVo");
