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
var DailybossnewVo = (function (_super) {
    __extends(DailybossnewVo, _super);
    function DailybossnewVo() {
        var _this = _super.call(this) || this;
        /**
         * 门客是否攻击过具体信息{'1001':1} 1已经攻击过 可以恢复 2已经攻击过且不能恢复
         */
        _this.servant = {};
        return _this;
    }
    DailybossnewVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    DailybossnewVo.prototype.dispose = function () {
        this.score = 0;
        this.info = null;
        this.shop = null;
        this.servant = {};
    };
    return DailybossnewVo;
}(BaseVo));
__reflect(DailybossnewVo.prototype, "DailybossnewVo");
//# sourceMappingURL=DailybossnewVo.js.map