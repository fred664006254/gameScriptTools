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
 * 军团成员vo
 * author dky
 * date 2017/11/30
 * @class AllianceMemberVo
 */
var AllianceMemberVo = (function (_super) {
    __extends(AllianceMemberVo, _super);
    function AllianceMemberVo() {
        var _this = _super.call(this) || this;
        // 成员vo列表
        _this.memberInfoVoObj = null;
        return _this;
    }
    AllianceMemberVo.prototype.initData = function (data) {
        if (data) {
            this.memberInfoVoObj = null;
            if (data) {
                if (this.memberInfoVoObj == null) {
                    this.memberInfoVoObj = {};
                }
                for (var key in data) {
                    if (this.memberInfoVoObj[key]) {
                        this.memberInfoVoObj[key].initData(data[key]);
                    }
                    else {
                        var allianceInfoVo = new AllianceMemberInfoVo();
                        allianceInfoVo.id = key;
                        allianceInfoVo.initData(data[key]);
                        this.memberInfoVoObj[key] = allianceInfoVo;
                    }
                }
                for (var key in this.memberInfoVoObj) {
                    if (!data[key]) {
                        delete this.memberInfoVoObj[key];
                    }
                }
            }
        }
    };
    AllianceMemberVo.prototype.dispose = function () {
        if (this.memberInfoVoObj) {
            for (var key in this.memberInfoVoObj) {
                (this.memberInfoVoObj[key]);
                {
                    this.memberInfoVoObj[key].dispose();
                    this.memberInfoVoObj[key] = null;
                }
            }
        }
    };
    return AllianceMemberVo;
}(BaseVo));
__reflect(AllianceMemberVo.prototype, "AllianceMemberVo");
