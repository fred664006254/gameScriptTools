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
var NewRebackVo = (function (_super) {
    __extends(NewRebackVo, _super);
    function NewRebackVo() {
        var _this = _super.call(this) || this;
        _this.code = "";
        _this.info = {}; //--{uid = {uid,name,power}}
        _this.rinfo = {}; //= {invite = {},power={}},
        _this.iuid = 0; //--绑定者ID
        _this.oinfo = {}; //= {red=1},--初始红点为1 点击getinfo后为0
        return _this;
    }
    NewRebackVo.prototype.initData = function (data) {
        if (data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
    };
    NewRebackVo.prototype.dispose = function () {
        this.code = "";
        this.info = {}; //--{uid = {uid,name,power}}
        this.rinfo = {}; //= {invite = {},power={}},
        this.iuid = 0; //--绑定者ID
        this.oinfo = {}; //= {red=1},--初始红点为1 点击getinfo后为0
    };
    return NewRebackVo;
}(BaseVo));
__reflect(NewRebackVo.prototype, "NewRebackVo");
//# sourceMappingURL=NewRebackVo.js.map