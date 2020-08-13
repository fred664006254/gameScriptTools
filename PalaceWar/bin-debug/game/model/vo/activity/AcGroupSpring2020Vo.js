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
 * 金鼠闹春
 * @author 钱竣
 * @class AcGroupSpring2020Vo
 */
var AcGroupSpring2020Vo = (function (_super) {
    __extends(AcGroupSpring2020Vo, _super);
    function AcGroupSpring2020Vo() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcGroupSpring2020Vo.prototype, "isShowRedDot", {
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
    return AcGroupSpring2020Vo;
}(AcGroupBaseVo));
__reflect(AcGroupSpring2020Vo.prototype, "AcGroupSpring2020Vo");
//# sourceMappingURL=AcGroupSpring2020Vo.js.map