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
var AdvertiseVo = (function (_super) {
    __extends(AdvertiseVo, _super);
    function AdvertiseVo() {
        var _this = _super.call(this) || this;
        // need dispose var start
        _this.info = null;
        _this.lastday = null;
        return _this;
    }
    Object.defineProperty(AdvertiseVo.prototype, "Info", {
        // need dispose end
        get: function () {
            return this.info;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdvertiseVo.prototype, "Lastday", {
        get: function () {
            return this.lastday;
        },
        enumerable: true,
        configurable: true
    });
    AdvertiseVo.prototype.initData = function (data) {
        if (data) {
            for (var key in data) {
                if (data.hasOwnProperty(key))
                    this[key] = data[key];
            }
        }
    };
    AdvertiseVo.prototype.dispose = function () {
        // dispose start
        this.info = null;
        this.lastday = null;
        // dispose end
    };
    return AdvertiseVo;
}(BaseVo));
__reflect(AdvertiseVo.prototype, "AdvertiseVo");
//# sourceMappingURL=AdvertiseVo.js.map