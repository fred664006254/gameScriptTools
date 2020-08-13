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
 * 成年系统vo
 * author dky
 * date 2017/10/28
 * @class AdultVo
 */
var AdultVo = (function (_super) {
    __extends(AdultVo, _super);
    function AdultVo() {
        var _this = _super.call(this) || this;
        // 子嗣扩展槽
        _this.posnum = 0;
        // 子嗣vo列表
        _this.adultInfoVoObj = null;
        return _this;
    }
    AdultVo.prototype.initData = function (data) {
        if (data) {
            this.adultInfoVoObj = null;
            if (data.posnum) {
                this.posnum = Number(data.posnum);
            }
            if (data) {
                if (this.adultInfoVoObj == null) {
                    this.adultInfoVoObj = {};
                }
                for (var key in data) {
                    if (this.adultInfoVoObj[key]) {
                        this.adultInfoVoObj[key].initData(data[key]);
                    }
                    else {
                        var adultInfoVo = new AdultInfoVo();
                        adultInfoVo.id = key;
                        adultInfoVo.initData(data[key]);
                        this.adultInfoVoObj[key] = adultInfoVo;
                    }
                }
                for (var key in this.adultInfoVoObj) {
                    if (!data[key]) {
                        delete this.adultInfoVoObj[key];
                    }
                }
            }
        }
    };
    AdultVo.prototype.dispose = function () {
        if (this.adultInfoVoObj) {
            for (var key in this.adultInfoVoObj) {
                (this.adultInfoVoObj[key]);
                {
                    this.adultInfoVoObj[key].dispose();
                    this.adultInfoVoObj[key] = null;
                }
            }
        }
        this.posnum = 0;
        this.adultInfoVoObj = null;
    };
    return AdultVo;
}(BaseVo));
__reflect(AdultVo.prototype, "AdultVo");
