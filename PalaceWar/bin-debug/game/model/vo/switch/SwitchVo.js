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
var SwitchVo = (function (_super) {
    __extends(SwitchVo, _super);
    function SwitchVo() {
        var _this = _super.call(this) || this;
        _this.switchList = {};
        _this.changeOpen = [350, 200];
        _this.openWeapon = false;
        if (PlatformManager.checkIsKRSp()) {
            _this.changeOpen[0] = 250;
        }
        return _this;
    }
    SwitchVo.prototype.initData = function (data) {
        for (var key in data) {
            if (key.split("_")[0] == "challengeOpen") {
                var keys = key.split("_");
                if (Number(keys[1]) > this.changeOpen[0]) {
                    this.changeOpen[0] = Number(keys[1]);
                }
                if (Number(keys[2]) > this.changeOpen[1]) {
                    this.changeOpen[1] = Number(keys[2]);
                }
            }
            else if (key != "lockinfo") {
                this.switchList[key] = data[key] ? Number(data[key]) : 0;
            }
            else {
                this.switchList[key] = data[key];
            }
            if (!this.openWeapon && key.split("_")[0] == "weapon" && key.split("_")[1] == "name") {
                this.openWeapon = true;
            }
        }
    };
    SwitchVo.prototype.dispose = function () {
        this.switchList = {};
        if (PlatformManager.checkIsKRSp()) {
            this.changeOpen = [200, 200];
        }
        else {
            this.changeOpen = [350, 200];
        }
        this.openWeapon = false;
    };
    return SwitchVo;
}(BaseVo));
__reflect(SwitchVo.prototype, "SwitchVo");
//# sourceMappingURL=SwitchVo.js.map