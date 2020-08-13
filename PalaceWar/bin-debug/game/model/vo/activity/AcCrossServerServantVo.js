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
var AcCrossServerServantVo = (function (_super) {
    __extends(AcCrossServerServantVo, _super);
    function AcCrossServerServantVo() {
        var _this = _super.call(this) || this;
        _this.preward = 0;
        _this.zreward = 0;
        _this.sid = 0;
        _this.sinfo1 = {};
        _this.sinfo2 = {};
        _this.tinfo = {};
        _this.maxsid = '';
        _this.pkzids = [];
        _this.selfRank = null;
        return _this;
    }
    AcCrossServerServantVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        if (GameData.serverTime >= (this.et - 86400) && this.selfRank == null) {
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_SERVANTPK_GETINFO), this.infoCallback, this);
            NetManager.request(NetRequestConst.REQUST_SERVANTPK_GETINFO, {
                activeId: this.aid + "-" + this.code,
            });
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_SERVANTPK);
    };
    AcCrossServerServantVo.prototype.infoCallback = function (evt) {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_SERVANTPK_GETINFO), this.infoCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_SERVANTPK_RANK), this.rankCallback, this);
        NetManager.request(NetRequestConst.REQUST_SERVANTPK_RANK, {
            activeId: this.aid + "-" + this.code,
            sid: evt.data.data.data.maxsid
        });
    };
    AcCrossServerServantVo.prototype.rankCallback = function (evt) {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_SERVANTPK_RANK), this.rankCallback, this);
        this.selfRank = 99999;
        if (evt.data.data.data.menum) {
            this.selfRank = evt.data.data.data.menum;
        }
    };
    Object.defineProperty(AcCrossServerServantVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerServantVo.prototype, "isShowRedDot", {
        get: function () {
            if (!this.cfg) {
                return false;
            }
            return this.getpublicRedhot1() || this.getpublicRedhot2();
        },
        enumerable: true,
        configurable: true
    });
    /*
    *1开始时间  2结束时间前12h 3结束时间前7h 4结束时间前2h 5结束时间前30min 6结束时间前10min 7结束前3min 8展示期
    */
    AcCrossServerServantVo.prototype.getCurpeirod = function () {
        var period = 1;
        var st = this.st;
        var et = this.et - 86400;
        var period_arr = [
            st, et - this.cfg.countDown[0], et - this.cfg.countDown[1], et - this.cfg.countDown[2], et - this.cfg.countDown[3], et - this.cfg.countDown[4], et - this.cfg.countDown[5], et
        ];
        // let period_arr = [
        // 	st, et - this.cfg.cou, et - 7 * 3600, et - 2 * 3600, et - 30 * 60, et - 10 * 60, et
        // ];
        for (var i in period_arr) {
            var time = period_arr[i];
            if (GameData.serverTime >= time) {
                period = Number(i) + 1;
            }
        }
        if (GameData.serverTime >= et) {
            period = 8;
        }
        return period;
    };
    AcCrossServerServantVo.prototype.getpublicRedhot1 = function () {
        var flag = false;
        if (this.getCurpeirod() == 8 && Number(this.sid) && (Number(this.maxsid) == this.sid) && this.selfRank <= 500) {
            flag = this.preward == 0;
        }
        return flag;
    };
    AcCrossServerServantVo.prototype.getpublicRedhot2 = function () {
        var flag = false;
        if (this.getCurpeirod() == 8 && Number(this.sid)) {
            flag = this.zreward == 0;
        }
        return flag;
    };
    AcCrossServerServantVo.prototype.dispose = function () {
        this.v = 0;
    };
    return AcCrossServerServantVo;
}(AcBaseVo));
__reflect(AcCrossServerServantVo.prototype, "AcCrossServerServantVo");
//# sourceMappingURL=AcCrossServerServantVo.js.map