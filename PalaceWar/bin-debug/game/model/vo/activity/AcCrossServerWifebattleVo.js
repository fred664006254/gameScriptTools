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
var AcCrossServerWifeBattleVo = (function (_super) {
    __extends(AcCrossServerWifeBattleVo, _super);
    function AcCrossServerWifeBattleVo() {
        var _this = _super.call(this) || this;
        // info.iscanjoin"] = "跨服群芳会活动 活动资格标识(大于等于1时代表有资格)",
        _this.actInfo = null;
        _this.info = null;
        // public ainfo:any = null;
        _this.wifebattlecross = null;
        _this.pkzids = null;
        _this.rankData = null;
        _this._rankInfo = {};
        _this.buff = 1;
        _this.test = false;
        return _this;
    }
    Object.defineProperty(AcCrossServerWifeBattleVo.prototype, "isShowRedDot", {
        get: function () {
            if (this.judgeTimeProcess() < 2 || this.judgeTimeProcess() == 4) {
                return false;
            }
            //可领取奖励 可领取奖励、有可以出战的时候
            if (this.canLqAaward() || (this.isCanJoin && this.checkCanCDSearch() && this.checkHaveSearchCount() && this.judgeTimeProcess() == 2)) {
                return true;
            }
            //无数据时候依据红点model
            if ((!this.wifebattlecross || !this.wifebattlecross.info || !this.wifebattlecross.info.lasttime) && this.isCanJoin && Api.redpointVoApi.checkHaveRedPointByAid(this.aid, "canSearch") && this.judgeTimeProcess() == 2) {
                return true;
            }
            //cd到了、可出战
            //canSearch
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWifeBattleVo.prototype.canLqAaward = function () {
        return this.judgeTimeProcess() == 3 && !this.isGettZonereward();
    };
    AcCrossServerWifeBattleVo.prototype.initData = function (data) {
        console.log("AcCrossServerWifeBattleVo", data);
        for (var key in data) {
            this[key] = data[key];
        }
    };
    //获取区域排名
    AcCrossServerWifeBattleVo.prototype.isGettZonereward = function () {
        return this.info ? this.info.zonereward == 1 : false;
    };
    AcCrossServerWifeBattleVo.prototype.setRankData = function (rankData) {
        // console.log("rankdata--->",rankData);
        this.rankData = rankData;
    };
    //是否是第一名
    AcCrossServerWifeBattleVo.prototype.isServerRankFirst = function () {
        var flag = false;
        if (this.rankData && this.rankData.zrank == 1) {
            flag = true;
        }
        return flag;
    };
    AcCrossServerWifeBattleVo.prototype.getRankServerRank = function () {
        var num = 0;
        if (this.rankData && this.rankData.zrank) {
            num = this.rankData.zrank;
        }
        return num;
    };
    AcCrossServerWifeBattleVo.prototype.getRankServerScore = function () {
        var num = 0;
        if (this.rankData && this.rankData.zpoint) {
            num = this.rankData.zpoint;
        }
        return num;
    };
    AcCrossServerWifeBattleVo.prototype.getRankMyName = function () {
        return Api.playerVoApi.getPlayerName();
    };
    AcCrossServerWifeBattleVo.prototype.getRankMyRank = function () {
        var num = 0;
        if (this.rankData && this.rankData.merank) {
            num = this.rankData.merank;
        }
        return num;
    };
    AcCrossServerWifeBattleVo.prototype.getRankMyServer = function () {
        return Api.mergeServerVoApi.getRankServerName();
    };
    AcCrossServerWifeBattleVo.prototype.getRankMyScore = function () {
        var num = 0;
        if (this.rankData && this.rankData.mepoint) {
            num = this.rankData.mepoint;
        }
        return num;
    };
    AcCrossServerWifeBattleVo.prototype.setActInfo = function (actInfo) {
        // this.actInfo = actInfo;
        this.pkzids = actInfo.pkzids;
        this.buff = actInfo.buff;
        this.wifebattlecross = actInfo.wifebattlecross;
    };
    AcCrossServerWifeBattleVo.prototype.getPkzidNum = function () {
        if (this.test) {
            return 3;
        }
        else {
            return this.pkzids.length;
        }
    };
    AcCrossServerWifeBattleVo.prototype.getPkzid = function () {
        return this.pkzids;
    };
    AcCrossServerWifeBattleVo.prototype.setWifebattleInfo = function (wifeBattleInfo) {
        this.wifebattlecross = wifeBattleInfo;
    };
    //得到对手位分最高的弹出提示信息
    AcCrossServerWifeBattleVo.prototype.getEnemyMaxInfo = function () {
        if (this.wifebattlecross && this.wifebattlecross.ainfo && this.wifebattlecross.ainfo.maxwifeinfo) {
            if (this.wifebattlecross.ainfo.maxwifeinfo.sexflag && this.wifebattlecross.ainfo.maxwifeinfo.sexflag >= 1) {
                return { wifeid: this.wifebattlecross.ainfo.maxwifeinfo.wifeid, skin: this.wifebattlecross.ainfo.maxwifeinfo.maleskin, sexflag: this.wifebattlecross.ainfo.maxwifeinfo.sexflag };
            }
            else {
                return { wifeid: this.wifebattlecross.ainfo.maxwifeinfo.wifeid, skin: this.wifebattlecross.ainfo.maxwifeinfo.skin };
            }
        }
        else {
            return null;
        }
    };
    // public setInfo(info:any):void{
    // 	this.info = info;
    // }
    //检测当前红颜是否需要弹出搜寻框
    AcCrossServerWifeBattleVo.prototype.isShowWifeSearch = function () {
        if (this.wifebattlecross && this.wifebattlecross.ainfo && this.wifebattlecross.ainfo.handle == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    Object.defineProperty(AcCrossServerWifeBattleVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    //检测是否已经有没攻击的敌人
    AcCrossServerWifeBattleVo.prototype.checkHaveEnemy = function () {
        if (this.wifebattlecross && this.wifebattlecross.ainfo && this.wifebattlecross.ainfo.uid) {
            return true;
        }
        else {
            return false;
        }
    };
    //检测是否到时间可以搜索
    AcCrossServerWifeBattleVo.prototype.checkCanCDSearch = function () {
        if (this.wifebattlecross && this.wifebattlecross.info && typeof this.wifebattlecross.info.lasttime != "undefined") {
            if (GameData.serverTime - this.wifebattlecross.info.lasttime > Config.WifebattleCfg.intervalTime) {
                return true;
            }
        }
        return false;
    };
    //CD显示
    AcCrossServerWifeBattleVo.prototype.getCDStr = function () {
        if (this.wifebattlecross && this.wifebattlecross.info && this.wifebattlecross.info.num >= Config.WifebattleCfg.dailyNum) {
            //今日次数用完
            return LanguageManager.getlocal("wifeBattleSearchDesc2");
        }
        else {
            if (!this.checkCanCDSearch()) {
                if (this.test) {
                    return "";
                }
                var time = this.wifebattlecross.info.lasttime + Config.WifebattleCfg.intervalTime - GameData.serverTime;
                var timeStr = App.DateUtil.getFormatBySecond(time, 3);
                return LanguageManager.getlocal('wifeBattleSearchDesc', [timeStr]);
            }
            else {
                return "";
            }
        }
    };
    AcCrossServerWifeBattleVo.prototype.checkHaveSearchCount = function () {
        if (this.wifebattlecross && this.wifebattlecross.info && this.wifebattlecross.info.num < Config.WifebattleCfg.dailyNum) {
            return true;
        }
        else {
            return false;
        }
    };
    //当前时间阶段 0即将开始  1:准备开始倒计时  2:结束倒计时   3:展示期 4:活动结束
    AcCrossServerWifeBattleVo.prototype.judgeTimeProcess = function () {
        var timeNumber = 3600 * 2;
        var timeNumber2 = 3600 * 24;
        var type = 0;
        if (GameData.serverTime < this.st) {
            type = 0;
        }
        else if (GameData.serverTime >= this.st && GameData.serverTime < (this.st + timeNumber)) {
            type = 1;
        }
        else if (GameData.serverTime >= (this.st + timeNumber) && GameData.serverTime < (this.et - timeNumber2)) {
            type = 2;
        }
        else if ((GameData.serverTime >= (this.et - timeNumber2)) && GameData.serverTime < this.et) {
            type = 3;
        }
        else if (GameData.serverTime >= this.et) {
            type = 4;
        }
        return type;
    };
    AcCrossServerWifeBattleVo.prototype.getCountTimeStr = function (num) {
        var time = num;
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    AcCrossServerWifeBattleVo.prototype.getPkzidsStr = function () {
        if (this.test) {
            return "1,2";
        }
        var zidObj = null;
        var zid = [];
        var qu = [];
        for (var i = 0; i < this.pkzids.length; i++) {
            zidObj = this.pkzids[i];
            if (zidObj.qu) {
                qu.push(Number(zidObj.qu));
            }
            else {
                zid.push(Number(zidObj.zid));
            }
        }
        return App.StringUtil.formatMultiServerServerAndZid(qu, zid);
    };
    AcCrossServerWifeBattleVo.prototype.getArr = function (key) {
        var arr = [];
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!cfg) {
            return [];
        }
        var list = cfg;
        for (var i in list) {
            if (i == key) {
                for (var key2 in list[i]) {
                    if (list[i][key2]) {
                        var currObj = list[i][key2];
                        if (currObj.rank || currObj.needGem || currObj.limit || currObj.bossScore) {
                            list[i][key2].key = Number(key2) + 1;
                            if (list[i][key2].key) {
                                arr.push(list[i][key2]);
                            }
                        }
                    }
                }
            }
        }
        return arr;
    };
    //得到区服排名第一名的服务器名称
    AcCrossServerWifeBattleVo.prototype.getFirstServerName = function () {
        var serverText = "";
        var serverrankList = [];
        if (this.rankData && this.rankData.zidrankarr) {
            serverrankList = this.rankData.zidrankarr;
        }
        //[];//]//this._rankInfo.serverrankList;
        if (serverrankList.length > 0) {
            var first = serverrankList[0];
            if (this.getQuByZid(first.zid) > 0) {
                // serverText = LanguageManager.getlocal("mergeServer",[String(first[1]),String(first[0])]);
                serverText = LanguageManager.getlocal("mergeServerOnlyqu", [String(this.getQuByZid(first.zid))]);
            }
            else {
                serverText = LanguageManager.getlocal("ranserver2", [String(first.zid)]);
            }
        }
        return serverText;
    };
    AcCrossServerWifeBattleVo.prototype.getQuByZid = function (zid) {
        var zidObj = null;
        if (this.test) {
            return Number(zid);
        }
        for (var i = 0; i < this.pkzids.length; i++) {
            zidObj = this.pkzids[i];
            if (Number(zidObj.zid) == Number(zid)) {
                return zidObj.qu;
            }
        }
        return 0;
    };
    //区服排名
    AcCrossServerWifeBattleVo.prototype.getMyServerRank = function () {
        var rank = 0;
        // let myZid = this._rankInfo.serverrank.myrank.zid;
        // let myQu = this._rankInfo.serverrank.myrank.qu;
        var myZid = Api.mergeServerVoApi.getTrueZid();
        var myQu = Api.mergeServerVoApi.getQuByZid(myZid);
        var serverrankList = [];
        if (this.rankData && this.rankData.zidrankarr) {
            serverrankList = this.rankData.zidrankarr;
        }
        var listObj = null;
        for (var i = 0; i < serverrankList.length; i++) {
            listObj = serverrankList[i];
            if (listObj.zid == myZid) {
                rank = i + 1;
                break;
            }
        }
        return rank;
    };
    AcCrossServerWifeBattleVo.prototype.getCountDownTime = function () {
        var et = this.et - 86400;
        return et - GameData.serverTime;
    };
    //我在所有个人的排行
    AcCrossServerWifeBattleVo.prototype.getMyRank = function () {
        var rank = 0;
        if (this.rankData && this.rankData.merank) {
            rank = this.rankData.merank;
        }
        return rank;
    };
    AcCrossServerWifeBattleVo.prototype.getRankFirstPlayer = function () {
        if (this.rankData && this.rankData.rankarr && this.rankData.rankarr.length > 0) {
            return this.rankData.rankarr[0];
        }
        return null;
    };
    Object.defineProperty(AcCrossServerWifeBattleVo.prototype, "isCanJoin", {
        //是否有资格参加
        get: function () {
            return this.test ? true : (this.info && this.info.iscanjoin >= 1);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWifeBattleVo.prototype.getZidrankarr = function () {
        var rankList = [];
        if (this.test) {
            for (var i = 1; i <= 5; ++i) {
                rankList.push({
                    zid: i,
                    point: i * 100
                });
            }
        }
        if (this.rankData && this.rankData.zidrankarr) {
            rankList = this.rankData.zidrankarr;
        }
        return rankList;
    };
    AcCrossServerWifeBattleVo.prototype.dispose = function () {
        this.info = null;
        this.actInfo = null;
        // public ainfo:any = null;
        this.wifebattlecross = null;
        this.pkzids = null;
        this.rankData = null;
        this._rankInfo = {};
        this.buff = 1;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWifeBattleVo;
}(AcBaseVo));
__reflect(AcCrossServerWifeBattleVo.prototype, "AcCrossServerWifeBattleVo");
//# sourceMappingURL=AcCrossServerWifebattleVo.js.map