var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcTombVo = /** @class */ (function (_super) {
    __extends(AcTombVo, _super);
    function AcTombVo() {
        var _this = _super.call(this) || this;
        _this.ainfo = null; // 活动商铺各项购买数量
        _this.binfo = null; //积分商城各项购买数量
        _this.cinfo = null; //出战过的门客状态 servantId = nil 未出战，1已出战，0使用了出战令，2使用出战令后再次已出战
        _this.buysearch = 0; //元宝购买探索的次数
        _this.search = null; //剩余探索次数和上次更新探索次数的时间{v: 5, lasttime: 0}
        _this.shopscore = 0; //商店积分
        _this.totalShopScore = 0; //商店积分
        _this.bossMaxHp = {};
        _this.score = 0;
        _this.info = null;
        _this._clickIdx = 0;
        _this._clickType = '';
        _this._enermy = [];
        _this._killed = [];
        _this._killLog = [];
        _this._bossInfo = {};
        _this._rankInfo = {};
        _this._bossNumInfo = {};
        _this.moviePlay = false;
        _this.zidarr = [];
        _this.map = [];
        _this._curKillNum = 0;
        _this.clickIdx = -1;
        return _this;
    }
    AcTombVo.prototype.initData = function (data) {
        _super.prototype.initData.call(this, data);
        this.ainfo = data.ainfo;
        this.binfo = data.binfo;
        this.cinfo = data.cinfo;
        this.buysearch = data.buysearch;
        this.search = data.search;
        this.shopscore = data.shopscore;
        this.score = data.score;
        this.info = data.info;
        this.totalShopScore = data.totalShopScore;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_TOMB_REFRESH);
    };
    AcTombVo.prototype.dispose = function () {
        this.ainfo = null;
        this.binfo = null;
        this.cinfo = null;
        this.buysearch = 0;
        this.search = null;
        this.shopscore = 0;
        this.bossMaxHp = null;
        this.score = 0;
        this.info = null;
        this._bossInfo = {};
        this._bossNumInfo = {};
        this._clickIdx = 0;
        this._clickType = '';
        this._enermy = [];
        this._killLog = [];
        this._killed = [];
        this._rankInfo = {};
        this.moviePlay = false;
        this.zidarr = [];
        this.map = [];
        this._curKillNum = 0;
        this.clickIdx = -1;
        this.totalShopScore = 0;
        _super.prototype.dispose.call(this);
    };
    AcTombVo.prototype.gettotalShopScore = function () {
        var num = 0;
        if (this.totalShopScore) {
            num = this.totalShopScore;
        }
        return num;
    };
    AcTombVo.prototype.getServantFightInfo = function (servantId) {
        var v = 0;
        if (this.cinfo && this.cinfo[servantId]) {
            v = this.cinfo[servantId];
        }
        return v;
    };
    Object.defineProperty(AcTombVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcTombVo.prototype.getpublicRedhot1 = function () {
        var flag = false;
        //有探索次数
        if (this.isInActTime() && this.isInFightTime() && this.search.v > 0) {
            flag = true;
        }
        return flag;
    };
    AcTombVo.prototype.getpublicRedhot2 = function () {
        var flag = false;
        //有可积分兑换的
        if (!this.isEnd && this.getActPoints() > 0) {
            var arr = this.getArr('scoreMarket');
            for (var i in arr) {
                var unit = arr[i];
                var curNum = unit.limit - this.getPointChangeLimitnum(unit.id);
                if (this.getActPoints() >= unit.costScore && curNum > 0) {
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    };
    AcTombVo.prototype.getBuySearchNum = function () {
        return this.buysearch;
    };
    Object.defineProperty(AcTombVo.prototype, "isShowRedDot", {
        get: function () {
            if (this.getAttendQUality()) {
                for (var i = 1; i < 3; ++i) {
                    if (this["getpublicRedhot" + i]()) {
                        return true;
                    }
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 鳌拜活动 今日加成
    */
    AcTombVo.prototype.getMyAdd = function () {
        var effect = this.cfg.actMarket[0].effect;
        var num = 0;
        if (this.ainfo && this.ainfo[1]) {
            num = this.ainfo[1];
        }
        return num * 100 * effect;
    };
    Object.defineProperty(AcTombVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 1 准备期 2 进行中 3 活动已结束
    */
    AcTombVo.prototype.getCurPeriod = function () {
        var timeNumber = 3600 * 2;
        var period = 0;
        var st = this.st + timeNumber;
        var et = this.et - 86400;
        if (GameData.serverTime < st) {
            period = 1;
        }
        else if (GameData.serverTime >= st && GameData.serverTime < et) {
            period = 2;
        }
        else if (GameData.serverTime >= et) {
            period = 3;
        }
        return period;
    };
    AcTombVo.prototype.getActDayTimeCount = function (code) {
        var period = this.getCurPeriod();
        var et = 0;
        var today0 = App.DateUtil.getWeeTs(GameData.serverTime);
        var timeNumber = 3600 * 2;
        var st = this.st + timeNumber;
        var cfg = this.cfg;
        var key = '';
        var opentime = this.cfg.actTime;
        var dayst = today0 + opentime[0] * 3600;
        var dayet = today0 + (opentime[0] + (this.cfg.actTime[1] - this.cfg.actTime[0])) * 3600;
        if (period == 1) {
            et = dayst + 24 * 3600;
            ;
            key = "tombtime5";
        }
        else if (period == 2) {
            if (GameData.serverTime >= dayst && GameData.serverTime < dayet) {
                et = dayet;
                key = "tombtime6";
            }
            else {
                if (GameData.serverTime < dayst) {
                    et = dayst;
                }
                else {
                    et = dayst + 24 * 3600;
                }
                key = "tombtime5";
            }
        }
        else {
            if (this.isEnd) {
                key = "tombtime8";
            }
            else {
                key = "tombtime7";
                et = this.et;
            }
        }
        return LanguageManager.getlocal(key + "-" + code, [App.DateUtil.getFormatBySecond(et - GameData.serverTime)]);
    };
    AcTombVo.prototype.getCountDownTime = function () {
        var period = this.getCurPeriod();
        var timeNumber = 3600 * 2;
        var st = this.st + timeNumber;
        var et = this.et - 86400;
        var time = 0;
        if (period == 1) {
            time = st - GameData.serverTime;
        }
        else if (period == 2) {
            time = et - GameData.serverTime;
        }
        return time;
    };
    AcTombVo.prototype.isActivityEnd = function () {
        return GameData.serverTime >= this.et;
    };
    /*
    *活动周期内
    */
    AcTombVo.prototype.isInActy = function () {
        var flag = false;
        if (GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400) {
            flag = true;
        }
        return flag;
    };
    AcTombVo.prototype.isInActTime = function () {
        return this.getCurPeriod() == 2;
    };
    AcTombVo.prototype.isInFightTime = function () {
        var cfg = this.cfg;
        var today0 = App.DateUtil.getWeeTs(GameData.serverTime);
        var flag = false;
        var opentime = this.cfg.actTime;
        if (GameData.serverTime >= (today0 + opentime[0] * 3600) && GameData.serverTime < (today0 + (opentime[0] + (this.cfg.actTime[1] - this.cfg.actTime[0])) * 3600)) {
            flag = true;
        }
        return flag;
    };
    AcTombVo.prototype.getNextOpenTime = function () {
        var cfg = this.cfg;
        var today0 = App.DateUtil.getWeeTs(GameData.serverTime);
        var time = 0;
        var opentime = this.cfg.actTime;
        if (GameData.serverTime < (today0 + opentime[0] * 3600)) {
            time = today0 + opentime[0] * 3600 - GameData.serverTime;
        }
        else {
            time = today0 + opentime[0] * 3600 + 3600 * 24 - GameData.serverTime;
        }
        return time;
    };
    AcTombVo.prototype.getArr = function (key) {
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
                        if (currObj.idvRank || currObj.needGem || currObj.limit || currObj.killPool || currObj.alnRank) {
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
    //获取元宝商店限购物品次数
    AcTombVo.prototype.getShopBuyLimitnum = function (id) {
        var info = this.ainfo;
        var buyNum = 0;
        if (info && info[id]) {
            buyNum += info[id];
        }
        return buyNum;
    };
    //获取积分兑换物品次数
    AcTombVo.prototype.getPointChangeLimitnum = function (id) {
        var info = this.binfo;
        var buyNum = 0;
        if (info && info[id]) {
            buyNum += info[id];
        }
        return buyNum;
    };
    AcTombVo.prototype.getActPoints = function () {
        return this.shopscore;
    };
    /**
     * 剩余探索数
     * 1鳌拜未出现 2鳌拜出现未被击杀 3鳌拜出现被击杀
    */
    AcTombVo.prototype.getTanSuoNum = function () {
        var obj = {};
        var lasttime = this.search.lasttime;
        var timecost = this.cfg.renewTime[Math.min(Api.playerVoApi.getPlayerLevel(), this.cfg.renewTime.length) - 1];
        var base = this.search.v;
        var num = Math.min(base + Math.floor((GameData.serverTime - lasttime) / timecost), this.cfg.initialExplore);
        var killAll = this.getIsKillAll();
        obj['killAll'] = killAll;
        if (num > 0) {
            obj['num'] = num;
        }
        else {
            obj['time'] = lasttime + timecost - GameData.serverTime;
        }
        return obj;
    };
    /**
     * 鳌拜活动 宝箱钥匙
    */
    AcTombVo.prototype.getTombBoxKeyNum = function (boxId) {
        var itemid = this.cfg.getBossNpcItemCfgById(boxId).needKey;
        return Api.itemVoApi.getItemNumInfoVoById(itemid);
    };
    /**
     */
    AcTombVo.prototype.getTombMaxHp = function (id) {
        if (this.bossMaxHp && this.bossMaxHp[id]) {
            return this.bossMaxHp[id];
        }
        else {
            var cfg = this.cfg.getBossNpcItemCfgById(id);
            return cfg.bossHP;
        }
    };
    AcTombVo.prototype.getAllianceInfoNum = function () {
        var count = 0;
        if (this._enermy && this._enermy.length) {
            count = this._enermy.length;
        }
        return count;
    };
    /**
     * 个人排名
     */
    AcTombVo.prototype.getMyPrank = function () {
        var rank = 0;
        if (this._rankInfo.myrank && this._rankInfo.myrank.myrank) {
            rank = this._rankInfo.myrank.myrank;
        }
        return rank;
    };
    /**
     * 本服排名
     */
    AcTombVo.prototype.getMyAllPrank = function () {
        var rank = 0;
        if (this._rankInfo.allimyrank && this._rankInfo.allimyrank.myrank) {
            rank = this._rankInfo.allimyrank.myrank;
        }
        return rank;
    };
    /**
     * 本服积分
     */
    AcTombVo.prototype.getMyAScore = function () {
        var value = 0;
        if (this._rankInfo.allimyrank && this._rankInfo.allimyrank.value) {
            value = this._rankInfo.allimyrank.value;
        }
        return value;
    };
    /**
     * 个人积分
     */
    AcTombVo.prototype.getMyPScore = function () {
        var value = 0;
        if (this._rankInfo.myrank && this._rankInfo.myrank.value) {
            value = this._rankInfo.myrank.value;
        }
        return value;
    };
    /**
     * 个人积分
     */
    AcTombVo.prototype.getMyAlliMemPrank = function () {
        var rank = 0;
        if (this._rankInfo.allirank && this._rankInfo.allirank.myrank) {
            rank = this._rankInfo.allirank.myrank.myrank;
        }
        return rank;
    };
    /**
     * 总格子层数
     */
    AcTombVo.prototype.getFloorNum = function () {
        return this.cfg.totRows + 1;
    };
    /**
     * 格子数据
     */
    AcTombVo.prototype.getFloorData = function (index) {
        if (index === void 0) { index = 0; }
        var arr = [];
        var self = this;
        var floorNum = self.getFloorNum(); //index + 30
        for (var i = index; i < floorNum; ++i) {
            arr.push({
                id: i
            });
        }
        return arr;
    };
    AcTombVo.prototype.getBoxDataByFloor = function (floor) {
        var arr = [];
        for (var i = 0; i < 6; ++i) {
            arr.push({
                floor: floor,
                id: (floor - 1) * 6 + 1 + i
            });
        }
        return arr;
    };
    //对应格子数据 
    // alive: 1 bossId: 100020098 foe: 2 refresh: 1553616000 rewards: ""
    AcTombVo.prototype.getBoxDataById = function (id) {
        if (id == 0) {
            var num = this.getTombBlood(7, 1);
            return {
                alive: num === 0 ? 0 : 1,
                bossId: 1,
                foe: 7,
                rewards: '',
                refresh: 1
            };
        }
        else {
            if (this.map[id - 1]) {
                return this.map[id - 1];
            }
            else {
                return null;
            }
        }
    };
    //1未挖掘 2已挖掘 3空盒子
    AcTombVo.prototype.getBoxStatusById = function (boxId) {
        var status = 1;
        var data = this.getBoxDataById(boxId);
        if (data && Object.keys(data).length) {
            var cfg = this.cfg.getBossNpcItemCfgById(data.foe);
            if (cfg) {
                status = 2;
            }
            else {
                status = 3;
            }
        }
        return status; //App.MathUtil.getRandom(1,4);
    };
    AcTombVo.prototype.getBoxRewardById = function (boxId) {
        var flag = false;
        var data = this.getBoxDataById(boxId);
        if (data && data.alive == 0) {
            flag = true;
        }
        return flag;
    };
    AcTombVo.prototype.getMyAlliMemScore = function () {
        var value = 0;
        if (this._rankInfo.allirank && this._rankInfo.allirank.myrank) {
            value = this._rankInfo.allirank.myrank.value;
        }
        return value;
    };
    AcTombVo.prototype.setClickIdx = function (type, index) {
        this._clickIdx = index;
        this._clickType = type;
    };
    AcTombVo.prototype.getClickIdx = function () {
        return this._clickIdx;
    };
    AcTombVo.prototype.getClickType = function () {
        return this._clickType;
    };
    AcTombVo.prototype.getIsKillAll = function () {
        var flag = false;
        return flag;
    };
    AcTombVo.prototype.getTombKiller = function (type, key) {
        var str = '';
        if (this._bossInfo && this._bossInfo[type] && this._bossInfo[type][key] && this._bossInfo[type][key].killer && this._bossInfo[type][key].killer.name) {
            str = this._bossInfo[type][key].killer.name;
        }
        return str;
    };
    AcTombVo.prototype.getTombKillerRewards = function (type, key) {
        var str = '';
        if (this._bossInfo && this._bossInfo[type] && this._bossInfo[type][key] && this._bossInfo[type][key].killer && this._bossInfo[type][key].killer.rewards) {
            str = this._bossInfo[type][key].killer.rewards;
        }
        return str;
    };
    AcTombVo.prototype.getTombKillUid = function (type, key) {
        var uid = 0;
        if (this._bossInfo && this._bossInfo[type] && this._bossInfo[type][key] && this._bossInfo[type][key].killer && this._bossInfo[type][key].killer.uid) {
            uid = this._bossInfo[type][key].killer.uid;
        }
        return uid;
    };
    AcTombVo.prototype.getTombKillZid = function (type, key) {
        var zid = 0;
        if (this._bossInfo && this._bossInfo[type] && this._bossInfo[type][key] && this._bossInfo[type][key].killer && this._bossInfo[type][key].killer.zid) {
            zid = this._bossInfo[type][key].killer.zid;
        }
        return zid;
    };
    AcTombVo.prototype.getTombKillNum = function (type, key) {
        var num = 0;
        if (this._bossInfo && this._bossInfo[type] && this._bossInfo[type][key] && this._bossInfo[type][key].joinnum) {
            num = this._bossInfo[type][key].joinnum;
        }
        return num;
    };
    //获取当前已杀怪物的数量
    AcTombVo.prototype.getCurKillNum = function () {
        var num = this._curKillNum;
        return num;
    };
    /**
     * 获取排名信息
    */
    AcTombVo.prototype.getWipeInfo = function () {
        var arr = [];
        if (this._rankInfo && this._rankInfo.rankList) {
            arr = this._rankInfo.rankList;
        }
        return arr;
    };
    /**
     * 获取对应怪物的击杀信息
    */
    AcTombVo.prototype.getWipeDamageInfo = function (foeId, bosskey) {
        var obj = [];
        if (this._bossInfo && this._bossInfo[foeId]) {
            var unit = this._bossInfo[foeId][bosskey];
            if (unit && unit.damagelog) {
                for (var i in unit.damagelog) {
                    obj.push({
                        name: unit.damagelog[i].name,
                        score: unit.damagelog[i].damage,
                        uid: unit.damagelog[i].uid
                    });
                }
                obj.sort(function (a, b) {
                    return b.score - a.score;
                });
            }
        }
        return obj;
    };
    /**
     * 获取帮会敌情信息
     * 1未击杀 2已击杀
    */
    AcTombVo.prototype.setEnermyInfo = function (info) {
        this._enermy = [];
        if (info.enemy) {
            this._enermy = info.enemy;
        }
        this._killed = [];
        if (info.killed) {
            this._killed = info.killed;
        }
        if (info.bossMaxHpArr) {
            for (var i in info.bossMaxHpArr) {
                this.bossMaxHp[Number(i) + 1] = Number(info.bossMaxHpArr[i]);
            }
        }
    };
    AcTombVo.prototype.getWipeBossAllianceInfo = function (type) {
        var arr = [];
        if (type == 1) {
            for (var i in this._enermy) {
                var unit = this._enermy[i];
                if (unit.findname) {
                    arr.push({
                        findname: unit.findname,
                        curBlood: unit.bosshp,
                        type: type,
                        bosstype: unit.foe,
                        bosskey: unit.id,
                        x: unit.x,
                        y: unit.y,
                        id: (Number(unit.x) - 1) * 6 + Number(unit.y)
                    });
                }
            }
        }
        else {
            for (var i in this._killed) {
                var unit = this._killed[i];
                if (unit.findname && unit.killer.name && unit.killer.rewards) {
                    arr.push({
                        findname: unit.findname,
                        killername: unit.killer.name,
                        type: type,
                        bosstype: unit.foe,
                        bosskey: unit.id,
                        rewardsidx: unit.killer.rewards
                    });
                }
            }
        }
        return arr;
    };
    /**
     * 总boss信息 1未开启 2已发现
    */
    AcTombVo.prototype.getFinalbossStatusById = function () {
        var flag = 1;
        if (this.getOpenEndlessBoss()) {
            flag = 2;
        }
        else {
            flag = this.getCurKillNum() < this.cfg.needKillNum ? 1 : 2;
        }
        return flag;
    };
    /**
     * 鳌拜活动 击杀信息
    */
    AcTombVo.prototype.setKillLog = function (info) {
        this._killLog = [];
        this._killLog = info;
        this._killLog.sort(function (a, b) {
            return b.ts - a.ts;
        });
    };
    AcTombVo.prototype.getShowFightInfo = function (index) {
        var msg = null;
        if (this._killLog.length) {
            var unit = this._killLog[index];
            if (unit) {
                msg = {
                    name: unit.name,
                    reward: unit.rewards,
                    servantId: unit.servantId,
                    bossId: unit.bosstype
                };
            }
        }
        return msg;
    };
    /**
     * 获取血量信息
     *
    */
    AcTombVo.prototype.setBossInfo = function (info, append) {
        if (append === void 0) { append = false; }
        if (!this._bossInfo[info.bosstype]) {
            this._bossInfo[info.bosstype] = {};
        }
        if (!this._bossInfo[info.bosstype][info.bosskey]) {
            this._bossInfo[info.bosstype][info.bosskey] = {};
        }
        this._bossInfo[info.bosstype][info.bosskey].bosshp = Number(info.bosshp);
        if (append) {
            for (var i in info.damagelog) {
                this._bossInfo[info.bosstype][info.bosskey].damagelog.push(info.damagelog[i]);
            }
        }
        else {
            this._bossInfo[info.bosstype][info.bosskey].damagelog = [];
            if (info.damagelog && info.damagelog.length) {
                this._bossInfo[info.bosstype][info.bosskey].damagelog = info.damagelog;
            }
        }
        if (info.killer) {
            this._bossInfo[info.bosstype][info.bosskey].killer = info.killer;
        }
        if (info.killnum) {
            this._curKillNum = info.killnum;
        }
        if (info.joinnum) {
            this._bossInfo[info.bosstype][info.bosskey].joinnum = info.joinnum;
        }
        if (info.bossNum) {
            this._bossNumInfo = info.bossNum;
        }
        if (typeof info.bossMaxHp != "undefined") {
            this.bossMaxHp[info.bosstype] = info.bossMaxHp;
        }
    };
    AcTombVo.prototype.getTombBlood = function (type, key) {
        if (this._bossInfo[type] && this._bossInfo[type][key]) {
            return this._bossInfo[type][key].bosshp;
        }
        return NaN;
    };
    /**
     * 获取排行信息
     *
    */
    AcTombVo.prototype.setRankInfo = function (info) {
        this._rankInfo.rankList = info.rankList;
        this._rankInfo.myrank = info.myrank;
        this._rankInfo.allirankList = info.allirankList;
        this._rankInfo.allimyrank = info.allimyrank;
        this._rankInfo.allirank = info.allirank;
    };
    AcTombVo.prototype.getRankInfo = function () {
        return this._rankInfo;
    };
    AcTombVo.prototype.getAlliMemInfo = function () {
        var tmp = [];
        if (this._rankInfo.allirank && this._rankInfo.allirank.rankList) {
            tmp = this._rankInfo.allirank.rankList;
        }
        return tmp;
    };
    /**
     * 获取参加区服
     *
    */
    AcTombVo.prototype.getCrossServer = function () {
        var serveStr = '';
        var map = [];
        var isFk = PlatformManager.checkIsFkylcSp();
        for (var i in this.zidarr) {
            var zidname = isFk ? Api.mergeServerVoApi.getSeverName(Number(this.zidarr[i])) : Api.mergeServerVoApi.getAfterMergeSeverName(null, true, Number(this.zidarr[i]));
            if (map.indexOf(zidname) == -1) {
                map.push(zidname);
                serveStr += (zidname + ('、'));
            }
        }
        serveStr = serveStr.substring(0, serveStr.length - 1);
        return serveStr;
    };
    AcTombVo.prototype.setZidInfo = function (data) {
        this.zidarr = [];
        this.zidarr = data;
    };
    /**
     * 参加资格
     *
    */
    AcTombVo.prototype.getAttendQUality = function () {
        var flag = false;
        if (this.info && this.info.iscanjoin) {
            flag = true;
        }
        return flag;
    };
    /**
     * 是否开启不死天官
     *
    */
    AcTombVo.prototype.getOpenEndlessBoss = function () {
        var flag = false;
        if (this.getAttendQUality() && Api.switchVoApi.checkOpenTombEndLess() && this.getLastBossNum() <= 0) {
            flag = true;
        }
        return flag;
    };
    AcTombVo.prototype.setMapInfo = function (data) {
        //data {0 : [{}]
        for (var i in data) {
            var index = Number(i);
            var indexArr = data[i];
            for (var j in indexArr) {
                var floorNum = index * 10 + Number(j);
                var floor = indexArr[j];
                for (var k in floor) {
                    var box = floor[k]; //
                    var boxId = floorNum * 6 + Number(k);
                    if (!this.map[boxId]) {
                        this.map[boxId] = {};
                    }
                    this.map[boxId] = box;
                }
            }
        }
    };
    AcTombVo.prototype.clearMapInfo = function () {
        this.map = [];
    };
    /**
     * 根据id转化为index,x,y
     */
    AcTombVo.prototype.getParamMap = function (id) {
        var floor = Math.ceil(id / 6);
        var index = Math.floor((floor - 1) / 10);
        var obj = {
            index: id == 0 ? 0 : index,
            x: id == 0 ? 0 : (floor - index * 10),
            y: id == 0 ? 0 : (id - (floor - 1) * 6)
        };
        return obj;
    };
    AcTombVo.prototype.getBossNumInfo = function () {
        return this._bossNumInfo;
    };
    AcTombVo.prototype.getLastBossNum = function () {
        var num = 0;
        if (this._bossNumInfo && this._bossNumInfo[0]) {
            num = this._bossNumInfo[0];
        }
        return Number(num);
    };
    AcTombVo.prototype.getLastBoxNum = function () {
        var num = 0;
        if (this._bossNumInfo && this._bossNumInfo[1]) {
            num = this._bossNumInfo[1];
        }
        return num;
    };
    return AcTombVo;
}(AcBaseVo));
//# sourceMappingURL=AcTombVo.js.map