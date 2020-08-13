/**
 * 八王称帝api
 * author shaoliang
 * date 2018/5/9
 * @class EmperorwarVoApi
 */
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
var EmperorwarVoApi = (function (_super) {
    __extends(EmperorwarVoApi, _super);
    function EmperorwarVoApi() {
        var _this = _super.call(this) || this;
        _this.emperorwarVo = null;
        _this.emperorwarActiveVo = null;
        _this._countDownTime = 0;
        _this._type = 0;
        _this._getEmpBmData = [];
        //时间阶段判断 1还未开始 2报名阶段 3助威阶段 4战斗 5结束回放阶段
        _this.freshFight = false;
        _this.curBuzhen = null;
        return _this;
    }
    EmperorwarVoApi.prototype.isInShow = function () {
        var flag = false;
        var desc = GameData.serverTime - this.emperorwarActiveVo.version;
        if (desc >= 0 - 24 * 3600 && desc < 24 * 3600 * 3) {
            flag = true;
        }
        return flag;
    };
    EmperorwarVoApi.prototype.formatData = function (data) {
        this.setActiveInfo(data);
        //this.setDataInfo(data);
    };
    EmperorwarVoApi.prototype.setActiveInfo = function (info) {
        if (!this.emperorwarActiveVo) {
            this.emperorwarActiveVo = new EmperorwarActiveVo();
        }
        this.emperorwarActiveVo.initData(info);
    };
    EmperorwarVoApi.prototype.setDataInfo = function (info) {
        if (!this.emperorwarVo) {
            this.emperorwarVo = new EmperorwarVo();
        }
        this.emperorwarVo.initData(info);
    };
    EmperorwarVoApi.prototype.getCountDownTime = function () {
        this.getTimeCD();
        return this._countDownTime;
    };
    EmperorwarVoApi.prototype.setCountDownTime = function (time) {
        this._countDownTime = time;
    };
    EmperorwarVoApi.prototype.isNotEmptyData = function (str) {
        var arr = str.split('_');
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var unit = arr_1[_i];
            var data = this.getBmDataByKV('numb', unit);
            if (data && data.uid) {
                return true;
            }
        }
        return false;
    };
    EmperorwarVoApi.prototype.isInCalSignTime = function () {
        var zhuweistart = this.emperorwarActiveVo.getPeriod(1);
        var signEnd = zhuweistart - 300;
        if (GameData.serverTime >= signEnd && GameData.serverTime < zhuweistart) {
            return true;
        }
        return false;
    };
    Object.defineProperty(EmperorwarVoApi.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    EmperorwarVoApi.prototype.getRoundFightMsg = function () {
        var fightstart1 = this.emperorwarActiveVo.getPeriod(2);
        var fightstart2 = this.emperorwarActiveVo.getPeriod(3);
        var fightstart3 = this.emperorwarActiveVo.getPeriod(4);
        var arr = [this.emperorwarActiveVo.getPeriod(2), this.emperorwarActiveVo.getPeriod(3), this.emperorwarActiveVo.getPeriod(4)];
        for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
            var time = arr_2[_i];
            if (GameData.serverTime > time && GameData.serverTime == (time + 1199)) {
                if (!this.freshFight) {
                    this.freshFight = true;
                    NetManager.request(NetRequestConst.REQUEST_EMPEROR_BMLIST, {
                        version: this.emperorwarActiveVo.version,
                        sort: 2 // 1报名时间排序 2消耗人望币排序
                    });
                    break;
                }
            }
        }
    };
    EmperorwarVoApi.prototype.isShowFightFu = function () {
        var fightstart1 = this.emperorwarActiveVo.getPeriod(2);
        var fightstart2 = this.emperorwarActiveVo.getPeriod(3);
        var fightstart3 = this.emperorwarActiveVo.getPeriod(4);
        var arr = [this.emperorwarActiveVo.getPeriod(2), this.emperorwarActiveVo.getPeriod(3), this.emperorwarActiveVo.getPeriod(4)];
        for (var _i = 0, arr_3 = arr; _i < arr_3.length; _i++) {
            var time = arr_3[_i];
            if (GameData.serverTime >= (time + 840) && GameData.serverTime < (time + 1199)) {
                return true;
            }
        }
        return false;
    };
    EmperorwarVoApi.prototype.getEmperorEndCD = function () {
        var view = this;
        var cd = null;
        view.judge_time();
        if (view._type > 1 && view._type < 5) {
            var end = this.emperorwarActiveVo.getPeriod(5); //battlestart + 3 * cfg.battlelastTime;
            cd = App.DateUtil.getFormatBySecond(end - GameData.serverTime, 1);
        }
        return cd;
    };
    EmperorwarVoApi.prototype.getTimeCD = function () {
        var start = this.emperorwarActiveVo.getPeriod(0); //this.emperorwarActiveVo.version;
        var zhuweistart = this.emperorwarActiveVo.getPeriod(1); //start + (24 + (cfg.cheerTime - cfg.auctionTime)) * 3600;
        var battlestart = this.emperorwarActiveVo.getPeriod(2); //zhuweistart + (24 + (cfg.battleTime - cfg.cheerTime)) * 3600;
        var end = this.emperorwarActiveVo.getPeriod(5); //battlestart + 3 * cfg.battlelastTime;
        var type = 0;
        if (GameData.serverTime < start) {
            type = 1;
        }
        if (GameData.serverTime >= start && GameData.serverTime < zhuweistart) {
            type = 2;
        }
        if (GameData.serverTime >= zhuweistart && GameData.serverTime < battlestart) {
            type = 3;
        }
        if (GameData.serverTime >= battlestart && GameData.serverTime < end) {
            type = 4;
        }
        if (GameData.serverTime >= end) {
            type = 5;
        }
        switch (type) {
            case 1:
                this._countDownTime = start - GameData.serverTime;
                break;
            case 2:
                this._countDownTime = zhuweistart - GameData.serverTime - (this.isInCalSignTime() ? 0 : 300);
                break;
            case 3:
                this._countDownTime = battlestart - GameData.serverTime;
                break;
            case 4:
                var fightperiod = this.getFightPeriod2();
                var nexfightstart = this.emperorwarActiveVo.getPeriod(fightperiod + 2);
                this._countDownTime = nexfightstart - GameData.serverTime;
                break;
            case 5:
                this._countDownTime = 0;
                break;
        }
        this._type = type;
    };
    EmperorwarVoApi.prototype.judge_time = function () {
        //起始时间
        var cfg = Config.EmperorwarCfg;
        if (this.emperorwarActiveVo.periods.length > 0) {
            this.getTimeCD();
        }
        else {
            this._type = 5;
            this._countDownTime = 0;
        }
        return this._type;
    };
    //战争时间段
    EmperorwarVoApi.prototype.getFightPeriod = function () {
        var bmstart = this.emperorwarActiveVo.getPeriod(0);
        var zhuweistart = this.emperorwarActiveVo.getPeriod(1);
        var fightstart1 = this.emperorwarActiveVo.getPeriod(2);
        var fightstart2 = this.emperorwarActiveVo.getPeriod(3);
        var fightstart3 = this.emperorwarActiveVo.getPeriod(4);
        var fightend = this.emperorwarActiveVo.getPeriod(5);
        var nowtime = GameData.serverTime;
        var period = -1;
        if (nowtime >= bmstart && nowtime < fightstart1 + 1199) {
            period = 0;
        }
        else if (nowtime >= fightstart1 + 1199 && nowtime < fightstart2 + 1199) {
            period = 1;
        }
        else if (nowtime >= fightstart2 + 1199 && nowtime < fightstart3 + 1199) {
            period = 2;
        }
        else if (nowtime >= fightstart3 + 1199 && nowtime < fightend) {
            period = 3;
        }
        return period;
    };
    EmperorwarVoApi.prototype.getFightPeriod2 = function () {
        var fightstart1 = this.emperorwarActiveVo.getPeriod(2);
        var fightstart2 = this.emperorwarActiveVo.getPeriod(3);
        var fightstart3 = this.emperorwarActiveVo.getPeriod(4);
        var fightend = this.emperorwarActiveVo.getPeriod(5);
        var nowtime = GameData.serverTime;
        var period = -1;
        if (nowtime >= fightstart1 && nowtime < fightstart2) {
            period = 1;
        }
        else if (nowtime >= fightstart2 && nowtime < fightstart3) {
            period = 2;
        }
        else if (nowtime >= fightstart3 && nowtime < fightend) {
            period = 3;
        }
        return period;
    };
    //时间转格式
    EmperorwarVoApi.prototype.getCountTimeStr = function (num) {
        var time = num;
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    //是否已经报名
    EmperorwarVoApi.prototype.isSignForWar = function () {
        if (this._type > 1 && this._type < 5) {
            return this.emperorwarVo.bmst > 0;
        }
        else {
            return false;
        }
    };
    //是否已经报名
    EmperorwarVoApi.prototype.getSelfNumb = function () {
        return this.emperorwarVo.numb;
    };
    //是否已经获得资格
    EmperorwarVoApi.prototype.isCanJoinWar = function () {
        if (this._type > 1 && this._type < 5) {
            return this.emperorwarVo.numb > 0;
        }
        else {
            return false;
        }
    };
    Object.defineProperty(EmperorwarVoApi.prototype, "curCheer", {
        //当前人气值
        get: function () {
            return this.emperorwarVo.getcheer;
        },
        enumerable: true,
        configurable: true
    });
    //设置报名数据
    EmperorwarVoApi.prototype.setBmListData = function (data) {
        var view = this;
        if (data.length) {
            view._getEmpBmData = data.slice();
        }
        else {
            view._getEmpBmData = [];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_EMPEROR_FRESHPLAYERDATA);
    };
    //获取数据
    EmperorwarVoApi.prototype.getBmlistData = function (type) {
        var arr = [];
        for (var _i = 0, _a = this._getEmpBmData; _i < _a.length; _i++) {
            var unit = _a[_i];
            var condition = type ? (type == 'up' ? (unit.numb > 0) : (unit.numb <= 0)) : true;
            if (condition) {
                arr.push(unit);
            }
        }
        return arr;
    };
    //是否助威过
    EmperorwarVoApi.prototype.isHaveZhuWei = function () {
        return this.emperorwarVo.cheerid > 0;
    };
    //获取当前助威次数
    EmperorwarVoApi.prototype.getZhuweiNum = function () {
        return Number(this.emperorwarVo.cheernum);
    };
    //获取当前助威的uid
    EmperorwarVoApi.prototype.getZhuweiID = function () {
        return Number(this.emperorwarVo.cheerid);
    };
    //根据key－value查找对应数据
    EmperorwarVoApi.prototype.getBmDataByKV = function (key, value) {
        var obj = null;
        for (var _i = 0, _a = this._getEmpBmData; _i < _a.length; _i++) {
            var unit = _a[_i];
            if (unit[key] == value) {
                obj = unit;
                break;
            }
        }
        return obj;
    };
    //门客布阵信息
    EmperorwarVoApi.prototype.getServantInfo = function () {
        var info = this.emperorwarVo.info;
        return info.sinfo;
    };
    //设置门客布阵信息
    EmperorwarVoApi.prototype.set_emperorWarBuzhen = function (buzhen) {
        var view = this;
        var info = view.emperorwarVo.info;
        info.sinfo = {};
        info.sinfo = buzhen;
    };
    //是否需要自动选择
    EmperorwarVoApi.prototype.isCanAutoSelect = function (info) {
        for (var i in info) {
            if (info[i] == '') {
                return true;
            }
        }
        return false;
    };
    //是否已上阵
    EmperorwarVoApi.prototype.haveInBuzhen = function (servantId) {
        var view = this;
        var info = view.curBuzhen;
        for (var i in info) {
            var id = info[i];
            if (Number(id) == Number(servantId)) {
                return true;
            }
        }
        return false;
    };
    //是否已上阵
    EmperorwarVoApi.prototype.buzhewnIsChange = function (buzhen) {
        var view = this;
        var info = view.emperorwarVo.info;
        for (var i in info.sinfo) {
            var id = info.sinfo[i];
            if (id !== buzhen[i]) {
                return true;
            }
        }
        return false;
    };
    EmperorwarVoApi.prototype.cannotSetBuzhen = function () {
        var arr = [2, 3, 4];
        var period = this.getFightPeriod2() + 1;
        if (period == 0) {
            return false;
        }
        var fightstart = this.emperorwarActiveVo.getPeriod(period);
        if (GameData.serverTime >= (fightstart + 840)) {
            return true;
        }
        return false;
    };
    EmperorwarVoApi.prototype.getVersion = function () {
        return this.emperorwarActiveVo.version;
    };
    EmperorwarVoApi.prototype.getet = function () {
        return this.emperorwarActiveVo.et;
    };
    EmperorwarVoApi.prototype.getThisRoundIn = function (numb, period) {
        var data = this.getBmDataByKV('numb', numb);
        var std = 0;
        if (!data) {
            return false;
        }
        //status 1报名 2入选 3胜一场 4胜二场 5冠军
        switch (period) {
            case 0:
                std = 2;
                break;
            case 1:
                std = 3;
                break;
            case 2:
                std = 4;
                break;
            case 3:
                std = 5;
                break;
        }
        return data.status >= std;
    };
    //获取对阵信息
    EmperorwarVoApi.prototype.getVsinfo = function (period) {
        var vs = { 1: [1, 8], 2: [4, 5], 3: [2, 7], 4: [3, 6] };
        var vsarr;
        switch (period) {
            case 0:
            case 1:
                vsarr = {};
                vsarr = vs;
                break;
            case 2:
                vsarr = {};
                for (var i = 1; i <= 4; ++i) {
                    var winner = this.compareFightInfo(vs[i]);
                    if (i < 3) {
                        if (!vsarr[1]) {
                            vsarr[1] = [];
                        }
                        vsarr[1].push(winner);
                    }
                    else {
                        if (!vsarr[2]) {
                            vsarr[2] = [];
                        }
                        vsarr[2].push(winner);
                    }
                }
                break;
            case 3:
                vsarr = {};
                vsarr[1] = [];
                var round3 = this.getVsinfo(2);
                for (var i = 1; i <= 2; ++i) {
                    vsarr[1].push(this.compareFightInfo(round3[i]));
                }
                break;
        }
        return vsarr;
    };
    EmperorwarVoApi.prototype.getRoundWinner = function (period) {
        var winarr = [];
        var vs = { 1: [1, 8], 2: [4, 5], 3: [2, 7], 4: [3, 6] };
        switch (period) {
            case 1:
                for (var i = 1; i <= 4; ++i) {
                    var winner = this.compareFightInfo(vs[i]);
                    if (winner) {
                        winarr.push(winner);
                    }
                }
                break;
            case 2:
                var lastround = this.getVsinfo(2);
                for (var i in lastround) {
                    var winner = this.compareFightInfo(lastround[i]);
                    if (winner) {
                        winarr.push(winner);
                    }
                }
                break;
            case 3:
                var data = this.getBmlistData();
                if (data.length) {
                    data.sort(function (a, b) {
                        return b.status - a.status;
                    });
                    winarr.push(data[0].numb);
                }
                break;
        }
        return winarr;
    };
    EmperorwarVoApi.prototype.getWinnerEmpData = function () {
        var data = this.getBmlistData();
        data.sort(function (a, b) {
            return b.status - a.status;
        });
        return data[0];
    };
    //比对战斗信息 status 1报名 2入选 3胜一场 4胜二场 5冠军
    EmperorwarVoApi.prototype.compareFightInfo = function (twoPlayer) {
        var player1 = this.getBmDataByKV('numb', twoPlayer[0]);
        var player2 = this.getBmDataByKV('numb', twoPlayer[1]);
        var winnumb = 0;
        if (player1 && player2) {
            if (player1.status == player2.status) {
                winnumb = 0;
            }
            else {
                winnumb = player1.status > player2.status ? twoPlayer[0] : twoPlayer[1];
            }
        }
        else if (player1) {
            winnumb = twoPlayer[0];
        }
        else if (player2) {
            winnumb = twoPlayer[1];
        }
        return winnumb;
    };
    //获取限购物品次数
    EmperorwarVoApi.prototype.getBuyLimitnum = function (id) {
        var info = this.emperorwarVo.info;
        var binfo = info.buyinfo;
        var buyNum = 0;
        if (binfo && binfo[id]) {
            buyNum += binfo[id];
        }
        return buyNum;
    };
    //判断类型 控制入口
    EmperorwarVoApi.prototype.openEmpView = function () {
        var start = this.emperorwarActiveVo.getPeriod(0); //this.emperorwarActiveVo.version;
        var zhuweistart = this.emperorwarActiveVo.getPeriod(1); //start + (24 + (cfg.cheerTime - cfg.auctionTime)) * 3600;
        var battlestart = this.emperorwarActiveVo.getPeriod(2); //zhuweistart + (24 + (cfg.battleTime - cfg.cheerTime)) * 3600;
        var end = this.emperorwarActiveVo.getPeriod(5); //battlestart + 3 * cfg.battlelastTime;
        var type = 0;
        if (GameData.serverTime < start) {
            type = 1;
        }
        if (GameData.serverTime >= start && GameData.serverTime < zhuweistart) {
            type = 2;
        }
        if (GameData.serverTime >= zhuweistart && GameData.serverTime < battlestart) {
            type = 3;
        }
        if (GameData.serverTime >= battlestart && GameData.serverTime < end) {
            type = 4;
        }
        if (GameData.serverTime >= end) {
            type = 5;
        }
        if (type == 5) {
            ViewController.getInstance().openView(ViewConst.COMMON.EMPERORWARENDSHOWVIEW);
        }
        else {
            ViewController.getInstance().openView(ViewConst.COMMON.EMPERORWARENTERVIEW);
        }
    };
    EmperorwarVoApi.prototype.judgeType = function () {
        var start = this.emperorwarActiveVo.getPeriod(0); //this.emperorwarActiveVo.version;
        var zhuweistart = this.emperorwarActiveVo.getPeriod(1); //start + (24 + (cfg.cheerTime - cfg.auctionTime)) * 3600;
        var battlestart = this.emperorwarActiveVo.getPeriod(2); //zhuweistart + (24 + (cfg.battleTime - cfg.cheerTime)) * 3600;
        var end = this.emperorwarActiveVo.getPeriod(5); //battlestart + 3 * cfg.battlelastTime;
        var type = 0;
        if (GameData.serverTime < start) {
            type = 1;
        }
        if (GameData.serverTime >= start && GameData.serverTime < zhuweistart) {
            type = 2;
        }
        if (GameData.serverTime >= zhuweistart && GameData.serverTime < battlestart) {
            type = 3;
        }
        if (GameData.serverTime >= battlestart && GameData.serverTime < end) {
            type = 4;
        }
        if (GameData.serverTime >= end) {
            type = 5;
        }
        return type;
    };
    //获取此次报名消耗的人望币
    EmperorwarVoApi.prototype.getCurSignRWB = function () {
        return this.emperorwarVo.pemcost;
    };
    Object.defineProperty(EmperorwarVoApi.prototype, "version", {
        get: function () {
            return this.emperorwarActiveVo.version;
        },
        enumerable: true,
        configurable: true
    });
    EmperorwarVoApi.prototype.dispose = function () {
        if (this.emperorwarVo) {
            this.emperorwarVo.dispose();
            this.emperorwarVo = null;
        }
        if (this.emperorwarActiveVo) {
            this.emperorwarActiveVo.dispose();
            this.emperorwarActiveVo = null;
        }
        _super.prototype.dispose.call(this);
    };
    return EmperorwarVoApi;
}(BaseVoApi));
__reflect(EmperorwarVoApi.prototype, "EmperorwarVoApi");
//# sourceMappingURL=EmperorwarVoApi.js.map