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
 * 泰国泼水节
 * date 2020.3.3
 * @author ycg
 * @class AcGroupPoshuiVo
 */
var AcGroupPoshuiVo = (function (_super) {
    __extends(AcGroupPoshuiVo, _super);
    function AcGroupPoshuiVo() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcGroupPoshuiVo.prototype, "isShowRedDot", {
        get: function () {
            var acVoList = this.getAcVoList();
            for (var key in acVoList) {
                var acVo = acVoList[key];
                if (acVo && acVo.isShowRedDot == true && acVo.isStart) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    return AcGroupPoshuiVo;
}(AcGroupBaseVo));
__reflect(AcGroupPoshuiVo.prototype, "AcGroupPoshuiVo");
//# sourceMappingURL=AcGroupPoshuiVo.js.map