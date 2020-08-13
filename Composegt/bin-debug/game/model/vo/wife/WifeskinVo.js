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
 * 红颜皮肤系统vo
 * author dky
 * date 2018/3/2
 * @class WifeskinVo
 */
var WifeskinVo = (function (_super) {
    __extends(WifeskinVo, _super);
    function WifeskinVo() {
        var _this = _super.call(this) || this;
        // 皮肤vo列表
        _this.wifeSkinInfoVoObj = null;
        return _this;
    }
    WifeskinVo.prototype.initData = function (data) {
        if (data) {
            if (data.info) {
                if (this.wifeSkinInfoVoObj == null) {
                    this.wifeSkinInfoVoObj = {};
                }
                for (var key in data.info) {
                    if (this.wifeSkinInfoVoObj[key]) {
                        this.wifeSkinInfoVoObj[key].initData(data.info[key]);
                    }
                    else {
                        var wifeInfoVo = new WifeskinInfoVo();
                        wifeInfoVo.id = String(key);
                        wifeInfoVo.initData(data.info[key]);
                        this.wifeSkinInfoVoObj[key] = wifeInfoVo;
                    }
                }
            }
        }
    };
    WifeskinVo.prototype.dispose = function () {
        if (this.wifeSkinInfoVoObj) {
            for (var key in this.wifeSkinInfoVoObj) {
                (this.wifeSkinInfoVoObj[key]);
                {
                    this.wifeSkinInfoVoObj[key].dispose();
                    this.wifeSkinInfoVoObj[key] = null;
                }
            }
        }
        this.wifeSkinInfoVoObj = null;
    };
    return WifeskinVo;
}(BaseVo));
__reflect(WifeskinVo.prototype, "WifeskinVo");
