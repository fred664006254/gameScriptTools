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
 * 排行榜Api
 * author yanyuling
 * date 2017/10/26
 * @class RankVoApi
 */
var RankVoApi = (function (_super) {
    __extends(RankVoApi, _super);
    function RankVoApi() {
        return _super.call(this) || this;
    }
    RankVoApi.prototype.getRankListByTabIdx = function (idx) {
        if (idx == 0) {
            return this.rankVo.pinfoList;
        }
        else if (idx == 1) {
            return this.rankVo.cinfoList;
        }
        else if (idx == 2) {
            return this.rankVo.iinfoList;
        }
        return this.rankVo.pinfoList;
    };
    RankVoApi.prototype.getcInfoList = function () {
        return this.rankVo.cinfoList;
    };
    RankVoApi.prototype.getiInfoList = function () {
        return this.rankVo.iinfoList;
    };
    RankVoApi.prototype.getpInfoList = function () {
        return this.rankVo.pinfoList;
    };
    RankVoApi.prototype.getcRank = function () {
        return this.rankVo.crank;
    };
    RankVoApi.prototype.getimacy = function () {
        return this.rankVo.imacy;
    };
    RankVoApi.prototype.getcid = function () {
        return this.rankVo.cid;
    };
    RankVoApi.prototype.getprank = function () {
        return this.rankVo.prank;
    };
    RankVoApi.prototype.getirank = function () {
        return this.rankVo.irank;
    };
    RankVoApi.prototype.getanum = function () {
        if (!this.rankVo) {
            return 0;
        }
        return this.rankVo.anum;
    };
    RankVoApi.prototype.getapnum = function () {
        if (!this.rankVo) {
            return 0;
        }
        return this.rankVo.apnum;
    };
    RankVoApi.prototype.getCrossAllianceRankList = function () {
        return this.rankVo.ainfo;
    };
    RankVoApi.prototype.getCrossPowerList = function () {
        return this.rankVo.apinfo;
    };
    RankVoApi.prototype.checkNpcMessage = function () {
        var maxIdx = 3;
        if (Api.switchVoApi.checkOpenCrossRank()) {
            maxIdx = 5;
        }
        for (var index = 0; index < maxIdx; index++) {
            var V = Api.otherInfoVoApi.isRankVisited(index);
            if (V == 0) {
                return true;
            }
        }
        if (Api.switchVoApi.checkOpenBiography() && GameData.bioHave && !Api.otherInfoVoApi.isRankVisited(5)) {
            return true;
        }
        return false;
    };
    return RankVoApi;
}(BaseVoApi));
__reflect(RankVoApi.prototype, "RankVoApi");
//# sourceMappingURL=RankVoApi.js.map