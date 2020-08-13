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
 * 皇城六部vo
 * author ycg
 * date 2020.5.7
 * @class SixSection1Vo
 */
var SixSection1Vo = (function (_super) {
    __extends(SixSection1Vo, _super);
    function SixSection1Vo() {
        return _super.call(this) || this;
    }
    SixSection1Vo.prototype.initData = function (data) {
        if (data) {
            if (data.build) {
                this.build = data.build;
            }
            if (data.dinfo) {
                this.dinfo = data.dinfo;
            }
            if (data.director) {
                this.director = data.director;
            }
            if (data.einfo) {
                this.einfo = data.einfo;
            }
            if (data.info) {
                this.info = data.info;
            }
            if (data.influence) {
                this.influence = data.influence;
            }
            if (data.version) {
                this.version = data.version;
            }
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SIXSECTION1_MODEL_REFRESH, {});
        }
        this.formatBuildCfg();
        this.formatTitleCfg();
    };
    SixSection1Vo.prototype.getCrossServerNum = function () {
        if (this.info && this.info.zidNum) {
            return this.info.zidNum;
        }
        return 1;
    };
    SixSection1Vo.prototype.formatBuildCfg = function () {
        var data = this.cfg.getBuildList();
        var stNum = 1;
        for (var i = 1; i < data.length; i++) {
            data[i].seatNumber += (this.getCrossServerNum() - 1) * data[i].addSeat;
            data[i].rowMaxNum = Math.ceil(data[i].seatNumber / data[i].perMaxSeat);
            data[i].stRowNum = stNum;
            stNum = stNum + data[i].rowMaxNum;
        }
        return data;
    };
    SixSection1Vo.prototype.formatTitleCfg = function () {
        var data = this.cfg.getDirectorList();
        var stNum = 1;
        for (var i = 1; i < data.length; i++) {
            data[i].seatNumber += (this.getCrossServerNum() - 1) * data[i].addSeat;
            data[i].rowMaxNum = Math.ceil(data[i].seatNumber / data[i].perMaxSeat);
            data[i].stRowNum = stNum;
            stNum = stNum + data[i].rowMaxNum;
        }
        return data;
    };
    Object.defineProperty(SixSection1Vo.prototype, "cfg", {
        get: function () {
            return Config.Sixsection1Cfg;
        },
        enumerable: true,
        configurable: true
    });
    SixSection1Vo.prototype.dispose = function () {
        // this.sinfo = [];
        // this.winfo = [];
        // this.showTime = 0;
    };
    return SixSection1Vo;
}(BaseVo));
__reflect(SixSection1Vo.prototype, "SixSection1Vo");
//# sourceMappingURL=SixSection1Vo.js.map