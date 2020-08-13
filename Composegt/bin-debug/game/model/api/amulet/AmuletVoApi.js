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
var AmuletVoApi = (function (_super) {
    __extends(AmuletVoApi, _super);
    function AmuletVoApi() {
        var _this = _super.call(this) || this;
        _this.amuletVo = null;
        return _this;
    }
    AmuletVoApi.prototype.getAmuListBySerId = function (serid) {
        return this.amuletVo.getAmuListById(serid);
    };
    AmuletVoApi.prototype.getAmuletNum = function (serid, amuid) {
        var resNum = 0;
        var amu = this.amuletVo.getAmuListById(serid);
        if (amu) {
            if (amu[amuid]) {
                resNum = amu.amuletList[amuid].amuletNum || 0;
            }
            else {
                for (var key in amu.amuletList) {
                    if (amu.amuletList.hasOwnProperty(key)) {
                        resNum += amu.amuletList[key].amuletNum;
                    }
                }
            }
        }
        return resNum;
    };
    AmuletVoApi.prototype.isServantOwnAmulate = function (serid) {
        var amu = this.amuletVo.getAmuListById(serid);
        if (!amu) {
            return false;
        }
        var amuletList = amu.amuletList;
        for (var key in amuletList) {
            if (amuletList.hasOwnProperty(key)) {
                var element = amuletList[key];
                if (element.amuletNum >= 0) {
                    return true;
                }
            }
        }
    };
    AmuletVoApi.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AmuletVoApi;
}(BaseVoApi));
__reflect(AmuletVoApi.prototype, "AmuletVoApi");
