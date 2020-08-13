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
 * 红颜系统vo
 * author dmj
 * date 2017/9/22
 * @class WifeVo
 */
var WifeVo = (function (_super) {
    __extends(WifeVo, _super);
    function WifeVo() {
        var _this = _super.call(this) || this;
        // 红颜vo列表
        _this.wifeInfoVoObj = null;
        /**精力剩余次数 */
        _this.energy_num = 0;
        /**精力最后一次更新时间戳 */
        _this.energy_st = 0;
        return _this;
    }
    WifeVo.prototype.initData = function (data) {
        if (data) {
            if (data.energy != null) {
                if (data.energy.st != null) {
                    this.energy_st = data.energy.st;
                }
                if (data.energy.num != null) {
                    this.energy_num = data.energy.num;
                }
            }
            if (data.info) {
                if (this.wifeInfoVoObj == null) {
                    this.wifeInfoVoObj = {};
                }
                for (var key in data.info) {
                    if (this.wifeInfoVoObj[key]) {
                        this.wifeInfoVoObj[key].initData(data.info[key]);
                    }
                    else {
                        var wifeInfoVo = new WifeInfoVo();
                        wifeInfoVo.id = Number(key);
                        wifeInfoVo.initData(data.info[key]);
                        this.wifeInfoVoObj[key] = wifeInfoVo;
                    }
                }
            }
        }
        /**
         * 检测修身相关红点
         */
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_PRACTICE_RED);
    };
    WifeVo.prototype.dispose = function () {
        if (this.wifeInfoVoObj) {
            for (var key in this.wifeInfoVoObj) {
                (this.wifeInfoVoObj[key]);
                {
                    this.wifeInfoVoObj[key].dispose();
                    this.wifeInfoVoObj[key] = null;
                }
            }
        }
        this.energy_num = 0;
        this.energy_st = 0;
        this.wifeInfoVoObj = null;
    };
    return WifeVo;
}(BaseVo));
__reflect(WifeVo.prototype, "WifeVo");
