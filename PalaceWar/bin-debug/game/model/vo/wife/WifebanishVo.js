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
 * 红颜省亲vo
 * author shaoliang
 * date 2019/2/20
 * @class WifebanishVo
 */
var WifebanishVo = (function (_super) {
    __extends(WifebanishVo, _super);
    function WifebanishVo() {
        var _this = _super.call(this) || this;
        _this.pos_num = Config.BanishCfg.getDefaultSeatNum();
        _this.wifeBanishInfoVo = null;
        return _this;
    }
    WifebanishVo.prototype.initData = function (data) {
        if (data) {
            if (data.pos_num != null) {
                this.pos_num = data.pos_num;
            }
            this.wifeBanishInfoVo = {};
            if (data.info) {
                for (var key in data.info) {
                    if (this.wifeBanishInfoVo[key]) {
                        this.wifeBanishInfoVo[key].initData(data.info[key]);
                    }
                    else {
                        var wifeInfoVo = new WifeBanishInfoVo();
                        wifeInfoVo.id = String(key);
                        wifeInfoVo.initData(data.info[key]);
                        this.wifeBanishInfoVo[key] = wifeInfoVo;
                    }
                }
            }
        }
    };
    WifebanishVo.prototype.dispose = function () {
        this.pos_num = Config.BanishCfg.getDefaultSeatNum();
        this.wifeBanishInfoVo = null;
    };
    return WifebanishVo;
}(BaseVo));
__reflect(WifebanishVo.prototype, "WifebanishVo");
var WifeBanishInfoVo = (function (_super) {
    __extends(WifeBanishInfoVo, _super);
    function WifeBanishInfoVo() {
        var _this = _super.call(this) || this;
        _this.wifeId = null;
        _this.id = null;
        _this.et = 0;
        return _this;
    }
    WifeBanishInfoVo.prototype.initData = function (data) {
        if (data) {
            this.wifeId = data.wifeId;
            this.et = data.st + Config.BanishCfg.getExileTime();
        }
    };
    WifeBanishInfoVo.prototype.dispose = function () {
        this.id = null;
        this.wifeId = null;
        this.et = 0;
    };
    return WifeBanishInfoVo;
}(BaseVo));
__reflect(WifeBanishInfoVo.prototype, "WifeBanishInfoVo");
//# sourceMappingURL=WifebanishVo.js.map