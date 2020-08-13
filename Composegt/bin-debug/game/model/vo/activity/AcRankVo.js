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
 * 活动排名通用vo
 * author dmj
 * date 2017/11/9
 * @class AcRankVo
 */
var AcRankVo = (function (_super) {
    __extends(AcRankVo, _super);
    function AcRankVo() {
        var _this = _super.call(this) || this;
        _this.acRankInfoVoObj = {};
        return _this;
    }
    AcRankVo.prototype.initData = function (data) {
        if (this.acRankInfoVoObj == null) {
            this.acRankInfoVoObj = {};
        }
        if (data.activeId) {
            if (this.acRankInfoVoObj[data.activeId]) {
                this.acRankInfoVoObj[data.activeId].initData(data);
            }
            else {
                var acRankInfoVo = new AcRankInfoVo();
                acRankInfoVo.initData(data);
                this.acRankInfoVoObj[data.activeId] = acRankInfoVo;
            }
        }
    };
    AcRankVo.prototype.dispose = function () {
        this.acRankInfoVoObj = null;
    };
    return AcRankVo;
}(BaseVo));
__reflect(AcRankVo.prototype, "AcRankVo");
