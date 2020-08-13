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
var EncounterVo = (function (_super) {
    __extends(EncounterVo, _super);
    function EncounterVo() {
        var _this = _super.call(this) || this;
        _this.info = null; //   info = {lv=1,eIndex={}}, --激活信息1：激活1个效果
        _this.buff = null; // buff = {—服务端使用    servant = {}, --门客信息 wife = {}, --红颜信息 all_Child = 0,--所有子嗣信息 
        return _this;
    }
    EncounterVo.prototype.initData = function (data) {
        this.info = data.info;
        this.buff = data.buff;
    };
    EncounterVo.prototype.dispose = function () {
    };
    return EncounterVo;
}(BaseVo));
__reflect(EncounterVo.prototype, "EncounterVo");
//# sourceMappingURL=EncounterVo.js.map