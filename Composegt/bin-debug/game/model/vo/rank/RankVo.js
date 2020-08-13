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
 * 排行榜vo
 * author yanyuling
 * date 2017/10/26
 * @class RankVo
 */
var RankVo = (function (_super) {
    __extends(RankVo, _super);
    function RankVo() {
        var _this = _super.call(this) || this;
        /**
         * 关卡榜信息
         */
        _this.cinfoList = [];
        /**
         * 亲密度榜信息
         */
        _this.iinfoList = [];
        /**
         * 势力榜信息
         */
        _this.pinfoList = [];
        /**
         * 个人排行信息
         */
        _this.crank = 0;
        _this.lv = 0;
        _this.imacy = 0;
        _this.name = "";
        _this.cid = 0;
        _this.power = 0;
        _this.irank = 0;
        _this.prank = 0;
        //跨服部分信息
        _this.anum = 0;
        _this.apnum = 0;
        _this.ainfo = [];
        _this.apinfo = [];
        return _this;
    }
    RankVo.prototype.initData = function (data) {
        if (data.minfo) {
            this.lv = Number(data.minfo.lv);
            this.imacy = data.minfo.imacy;
            this.name = data.minfo.name;
            this.cid = data.minfo.cid;
            this.power = data.minfo.power;
            if (data.minfo.prank) {
                this.prank = data.minfo.prank;
            }
            if (data.minfo.crank) {
                this.crank = data.minfo.crank;
            }
            if (data.minfo.irank) {
                this.irank = data.minfo.irank;
            }
        }
        if (data.pinfo) {
            this.initMyData(data.pinfo, this.pinfoList);
        }
        if (data.iinfo) {
            this.initMyData(data.iinfo, this.iinfoList);
        }
        if (data.cinfo) {
            this.initMyData(data.cinfo, this.cinfoList);
        }
        //跨服部分
        if (data.anum != null) {
            this.anum = data.anum;
        }
        if (data.apnum != null) {
            this.apnum = data.apnum;
        }
        if (data.ainfo) {
            this.ainfo = data.ainfo;
        }
        if (data.apinfo) {
            this.apinfo = data.apinfo;
        }
    };
    RankVo.prototype.initMyData = function (dataInfo, rankUVoList) {
        for (var index = 0; index < dataInfo.length; index++) {
            var element = dataInfo[index];
            var tmpVo = rankUVoList[index];
            if (!tmpVo) {
                tmpVo = new RankUserVo();
                rankUVoList.push(tmpVo);
            }
            tmpVo.initData(element);
        }
    };
    RankVo.prototype.dispose = function () {
        this.crank = 0;
        this.lv = 0;
        this.imacy = 0;
        this.name = "";
        this.cid = 0;
        this.power = 0;
        this.irank = 0;
        this.prank = 0;
        this.cinfoList = [];
        this.iinfoList = [];
        this.pinfoList = [];
        this.anum = 0;
        this.apnum = 0;
    };
    return RankVo;
}(BaseVo));
__reflect(RankVo.prototype, "RankVo");
