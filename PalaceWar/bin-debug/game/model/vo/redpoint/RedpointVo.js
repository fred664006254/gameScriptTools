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
var RedpointVo = (function (_super) {
    __extends(RedpointVo, _super);
    function RedpointVo() {
        var _this = _super.call(this) || this;
        _this.info = null;
        return _this;
    }
    RedpointVo.prototype.initData = function (data) {
        if (data) {
            if (data.info) {
                this.info = data.info;
            }
        }
    };
    RedpointVo.prototype.checkHavePointByAid = function (aid, type) {
        var flag = false;
        if (this.info && this.info[aid]) {
            var unit = this.info[aid];
            for (var i in unit) {
                //i 对应具体的功能 后期做扩展
                if (unit[i] && unit[i] == 1) {
                    flag = type ? (type == i) : true;
                    break;
                }
            }
        }
        return flag;
    };
    RedpointVo.prototype.dispose = function () {
        this.info = null;
    };
    return RedpointVo;
}(BaseVo));
__reflect(RedpointVo.prototype, "RedpointVo");
//# sourceMappingURL=RedpointVo.js.map