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
var AcThreeKingdomsVo = /** @class */ (function (_super) {
    __extends(AcThreeKingdomsVo, _super);
    function AcThreeKingdomsVo() {
        var _this = _super.call(this) || this;
        //真正开始时间
        _this.listred = false;
        _this.activeSt = 0;
        _this.activeEt = 0;
        _this.kingdom = 0;
        _this._buildinginfo = [];
        _this.food = 0;
        _this.goods = 0;
        _this.attackNum = null;
        _this.myBuildinfo = null;
        _this.mainlandScore = [];
        _this.troopNum = [];
        _this.selectServant = {};
        _this.cityTask = [];
        _this.lastidx = 0;
        _this.lastpos = null;
        _this.heroUseSids = null;
        _this.heroRewards = null;
        _this.heroJoin = null;
        _this.rinfo = null;
        _this.meetinginfo = null;
        _this.round = 1;
        _this.joinkingdomTS = 0;
        _this._roundMainlandScore = {};
        _this.cityRewardFlags = null;
        _this.rankActiveRwd = null;
        _this.numinkingdom = [];
        _this.zidgroup = [];
        _this.heroHpList = null;
        _this.prankroundarr = null;
        _this.zrankroundarr = null;
        _this.prankseasonarr = null;
        _this.zrankseasonarr = null;
        _this.tmpinfo = {};
        return _this;
    }
    AcThreeKingdomsVo.prototype.initData = function (data) {
        _super.prototype.initData.call(this, data);
        this.activeSt = data.activeSt;
        if (data.activeEt) {
            this.activeEt = data.activeEt;
        }
        else {
            this.activeEt = this.activeSt + 29 * 86400;
        }
        if (data.kingdom) {
            this.kingdom = data.kingdom;
        }
        this.food = data.food;
        this.goods = data.goods;
        this.attackNum = data.attackNum;
        this.cityTask = data.cityTask;
        this.heroUseSids = data.heroUseSids;
        this.heroRewards = data.heroRewards;
        this.heroJoin = data.heroJoin;
        this.rinfo = data.rinfo;
        this.round = data.round;
        this.joinkingdomTS = data.joinkingdomTS;
        this.cityRewardFlags = data.cityRewardFlags;
        this.rankActiveRwd = data.rankActiveRwd; //{
        this.heroHpList = data.heroHpList;
        // crossServerWifeBattle : {
        // 	st : 1593100800,
        // 	et : 1593439200,
        // 	myrank : 1,
        // 	flag : 0
        // }
        //};//
    };
    /*参赛资格*/
    AcThreeKingdomsVo.prototype.isCanJoin = function () {
        return Api.playerVoApi.getPlayerLevel() >= this.config.lvNeed && Api.playerVoApi.getPlayerPower() >= this.config.powerNeed;
    };
    //军政厅限时军需 充值有可领取奖励 或者 开启时第一次有引导性红点
    AcThreeKingdomsVo.prototype.getpublicRedhot1 = function () {
        var flag = false;
        if (this.getTodayWeek() > 5 && this.getMyKingdoms() && this.getCurPeriod() == 2) {
            var cfg = this.config;
            var totalcharge = this.getChargeNum();
            for (var i in cfg.recharge) {
                var unit = cfg.recharge[i];
                if (totalcharge >= unit.needGem && !this.isGetRecharge(unit.id)) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                //开启时第一次有引导性红点
                var key = ServerCfg.selectServer.zid + "_pId_" + Api.playerVoApi.getPlayerID() + AcConst.AID_THREEKINGDOMS + "limitred" + this.getCurWeek();
                var value = LocalStorageManager.get(key);
                if (value) {
                }
                else {
                    flag = true;
                }
            }
        }
        return flag;
    };
    //派遣任务可领奖 有任务可派遣
    AcThreeKingdomsVo.prototype.getpublicRedhot2 = function () {
        var flag = false;
        if (this.getTodayWeek() < 6 && this.getMyKingdoms() && this.getCurPeriod() == 2) {
            for (var i = 1; i < 6; ++i) {
                var taskinfo = this.getCityTaskStaus(i);
                if (taskinfo && (taskinfo.status == 3 || (taskinfo.status == 1 && this.isInTaskTime()))) {
                    if (taskinfo.status == 3) {
                        flag = true;
                    }
                    else {
                        if (i == 1) {
                            flag = this.getCurWeek() > 1;
                        }
                        else {
                            flag = true;
                        }
                    }
                }
                if (flag) {
                    break;
                }
            }
        }
        return flag;
    };
    //攻城期有免费出站次数、激战期第一次提醒
    AcThreeKingdomsVo.prototype.getpublicRedhot3 = function () {
        var flag = false;
        if (this.getTodayWeek() > 5 && this.isInWarTime() && this.getCurWarPeriod() == 3 && this.getCurPeriod() == 2 && this.getMyKingdoms() && this.getMyResource() > 0) {
            //开启时第一次有引导性红点
            var key = ServerCfg.selectServer.zid + "_pId_" + Api.playerVoApi.getPlayerID() + AcConst.AID_THREEKINGDOMS + "fightwarperiod3" + this.getTodayWeek();
            var value = LocalStorageManager.get(key);
            if (value) {
            }
            else {
                flag = true;
            }
        }
        if (this.getTodayWeek() > 5 && this.isInWarTime() && ((this.isFightFree(1) && this.getCurWarPeriod() < 3) || (this.isFightFree(2) && this.getCurWarPeriod() == 3)) && this.getCurPeriod() == 2 && this.getMyKingdoms()) {
            flag = true;
        }
        return flag;
    };
    //攻下城池后可领取奖励
    AcThreeKingdomsVo.prototype.getpublicRedhot4 = function () {
        var flag = false;
        if (this.getTodayWeek() > 5 && this.getMyKingdoms() && this.getCurPeriod() >= 2) {
            //激战期
            if (this.canGetCenterCityWarReward(1) || this.canGetCenterCityWarReward(2)) {
                flag = true;
            }
            for (var i = 1; i < 5; ++i) {
                var num = i;
                for (var j = 1; j < 7; ++j) {
                    if (this.canGetCityWarReward(j, num)) {
                        flag = true;
                        break;
                    }
                }
            }
        }
        return flag;
    };
    //开启时第一次有引导性红点
    AcThreeKingdomsVo.prototype.getpublicRedhot5 = function () {
        var flag = false;
        if (this.getTodayWeek() < 6 && this.getCurWeek() > 3 && this.getMyKingdoms() && this.getCurPeriod() == 2) {
            if (this.isInTuxiTime()) {
                //开启时第一次有引导性红点
                var key = ServerCfg.selectServer.zid + "_pId_" + Api.playerVoApi.getPlayerID() + AcConst.AID_THREEKINGDOMS + "tuxi" + this.getCurWeek() + "_" + this.getTodayWeek();
                var value = LocalStorageManager.get(key);
                if (value) {
                }
                else {
                    flag = true;
                }
            }
        }
        return flag;
    };
    //神将突袭有可领取奖励
    AcThreeKingdomsVo.prototype.getpublicRedhot8 = function () {
        var flag = false;
        if (this.getTodayWeek() < 6 && this.getCurWeek() > 3 && this.getMyKingdoms() && this.getCurPeriod() == 2) {
            var herolist = this.heroHpList;
            for (var i = 1; i <= 5; ++i) {
                if (this.canGetHeroAttackReward(i)) {
                    if (this.isGetHeroWinReward(i)) {
                    }
                    else {
                        if (i <= this.getTodayWeek()) {
                            if (herolist && typeof herolist[i] != "undefined") {
                                flag = herolist[i] <= 0;
                                if (flag) {
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        return flag;
    };
    //跨服冲榜能获得物资
    AcThreeKingdomsVo.prototype.getpublicRedhot6 = function () {
        if (this.isSelectedKindom() == false) {
            return false;
        }
        var flag = false;
        var info = this.getCrossActivity();
        for (var i in info) {
            var unit = info[i].activity;
            for (var j in unit) {
                var data = unit[j];
                var weekst = data.weekst;
                var weeket = data.weeket;
                var acet = data.acet;
                var acst = data.acst;
                var start = data.start;
                var end = data.end;
                if (this.isGetFoodReward(data.aid)) {
                }
                else {
                    //是否过期
                    if (GameData.serverTime >= end && acet < end) {
                    }
                    else {
                        //结算时间在上周日21:30之后，本周一之前 计入本轮
                        if (acet > start && acet > weekst && GameData.serverTime >= weekst) {
                            return true;
                        }
                    }
                }
            }
        }
        return flag;
    };
    //普通战有军令时，军令有红点，玩家点击一次（打开军令框后）消失
    AcThreeKingdomsVo.prototype.getpublicRedhot7 = function () {
        var flag = false;
        if (this.getTodayWeek() > 5 && this.getMyKingdoms() && this.getCurPeriod() == 2 && this.isInWarTime() && this.getCurWarPeriod() > 0 && this.getCurWarPeriod() < 3) {
            var info = this.getOrderInfo();
            if (info.state == 2) {
                //开启时第一次有引导性红点
                var key = ServerCfg.selectServer.zid + "_pId_" + Api.playerVoApi.getPlayerID() + AcConst.AID_THREEKINGDOMS + "order" + this.getCurWeek() + this.getTodayWeek() + this.getCurWarPeriod();
                var value = LocalStorageManager.get(key);
                if (value) {
                }
                else {
                    flag = true;
                }
            }
        }
        return flag;
    };
    AcThreeKingdomsVo.prototype.canGetCityWarReward = function (cityid, num) {
        var flag = false;
        var citywarinfo = this.getCityWarInfo(cityid, num);
        //周六
        var week = this.getCurWeek();
        var start = this.activeSt + (week - 1) * (7 * 86400);
        var unit = this.config.activeTime[num % 2 == 1 ? 2 : 3];
        var tmp = num < 3 ? 6 : 7;
        var st = start + (tmp - 1) * 86400 + unit.popularityRange[0] * 3600;
        var et = start + (tmp - 1) * 86400 + unit.popularityRange[1] * 3600;
        //奖励
        if (citywarinfo.kingdoms == this.getMyKingdoms() && !citywarinfo.ischange && !this.isGetCityReward(cityid, num) && (GameData.serverTime < this.et && GameData.serverTime >= et)) {
            flag = true;
        }
        return flag;
    };
    AcThreeKingdomsVo.prototype.canGetCenterCityWarReward = function (type) {
        var flag = false;
        //周六
        //本周激战期
        var week = this.getCurWeek();
        var start = this.activeSt + (week - 1) * (7 * 86400);
        var unit = this.config.activeTime[4];
        var isjingzhou = type == 1;
        var tmp = isjingzhou ? 6 : 7;
        var st = start + (tmp - 1) * 86400 + unit.popularityRange[0] * 3600;
        var et = start + (tmp - 1) * 86400 + unit.popularityRange[1] * 3600;
        //奖励
        var centercitywarinfo = this.getCenterCityWarInfo(isjingzhou ? 1 : 2);
        if (centercitywarinfo.kingdoms == this.getMyKingdoms() && !centercitywarinfo.ischange && !this.isGetCenterCityReward(type) && (GameData.serverTime < this.et && GameData.serverTime >= et)) {
            flag = true;
        }
        return flag;
    };
    Object.defineProperty(AcThreeKingdomsVo.prototype, "isShowRedDot", {
        get: function () {
            for (var i = 1; i <= 8; ++i) {
                if (this["getpublicRedhot" + i]()) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.activeEt; // - 0.5 * 3600;
            return App.DateUtil.getOpenLocalTime(this.activeSt, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.activeSt && GameData.serverTime < this.activeEt;
    };
    //活动阶段 1未开始 2进行中 3展示期 4已结束
    AcThreeKingdomsVo.prototype.getCurPeriod = function () {
        var period = 0;
        if (GameData.serverTime < this.activeSt) {
            period = 1;
        }
        else if (GameData.serverTime >= this.activeEt && GameData.serverTime < this.et) {
            period = 3;
        }
        else if (GameData.serverTime >= this.et) {
            period = 4;
        }
        else {
            period = 2;
        }
        return period;
    };
    //轮次阶段 1未开始 2进行中 3休战中 4已结束
    AcThreeKingdomsVo.prototype.getCurRound = function () {
        var period = this.getCurPeriod();
        var round = 0;
        if (period == 1) {
            round = 1;
        }
        else if (period == 2) {
            if (this.isInRest()) {
                if (this.isLastWeek() && this.getTodayWeek() == 7 && this.isTodayWarEnd()) {
                    round = 4;
                }
                else {
                    round = 3;
                }
            }
            else {
                round = 2;
            }
        }
        else {
            round = 4;
        }
        return round;
    };
    //处于休息阶段
    AcThreeKingdomsVo.prototype.isInRest = function () {
        var flag = false;
        var cfg = this.config.activeTime;
        var week = this.getCurWeek();
        //本周周一活动开始时间
        var st = this.activeSt + (week - 1) * (7 * 86400) + cfg[0].popularityRange[0] * 3600;
        //本周周日活动结束时间
        var et = this.activeSt + (week - 1) * (7 * 86400) + 6 * 86400 + cfg[4].popularityRange[1] * 3600;
        flag = GameData.serverTime >= et; //GameData.serverTime < st || 
        return flag;
    };
    //下轮开启时间
    AcThreeKingdomsVo.prototype.getNextRoundSt = function () {
        var flag = false;
        var week = this.getCurWeek();
        var cfg = this.config.activeTime;
        var st = this.activeSt + (week) * (7 * 86400) + cfg[0].popularityRange[0] * 3600;
        return App.DateUtil.getFormatBySecond(st, 10);
    };
    /**
     * 获取倒计时
    */
    AcThreeKingdomsVo.prototype.getCountDown = function () {
        var period = this.getCurPeriod();
        var et = 0;
        switch (period) {
            case 1:
                et = this.activeSt;
                break;
            case 2:
                et = this.activeEt;
                break;
            case 3:
                et = this.et;
                break;
            case 4:
                et = 0;
                break;
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 17);
    };
    /**
     * 获取轮次倒计时
    */
    AcThreeKingdomsVo.prototype.getRoundDown = function () {
        var round = this.getCurRound();
        var et = 0;
        if (round == 2) {
            var week = this.getCurWeek();
            var cfg = this.config.activeTime;
            //本周周日活动结束时间
            et = this.activeSt + (week - 1) * (7 * 86400) + 6 * 86400 + cfg[4].popularityRange[1] * 3600;
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 17);
    };
    /**
     * 获取当前周数
    */
    AcThreeKingdomsVo.prototype.getCurWeek = function () {
        var week = 0;
        if (this.getCurPeriod() >= 3) {
            week = Math.ceil((this.activeEt - 1 - this.activeSt) / (7 * 86400));
        }
        else {
            week = Math.ceil((GameData.serverTime - this.activeSt) / (7 * 86400));
        }
        return Math.max(week, 1);
    };
    /**
     * 是否最后一周
    */
    AcThreeKingdomsVo.prototype.isLastWeek = function () {
        var week = this.getCurWeek();
        var nextweekst = this.activeSt + (week) * 7 * 86400;
        return this.activeEt <= nextweekst;
    };
    /**
     * 判断现在是星期几
    */
    AcThreeKingdomsVo.prototype.getTodayWeek = function () {
        var prepare = this.activeSt + (this.getCurWeek() - 1) * 86400 * 7;
        var Today = Math.floor((GameData.serverTime - prepare) / 86400);
        return Today + 1;
    };
    /**
     * 周日晚上九点半以后不可更换阵营
    */
    AcThreeKingdomsVo.prototype.getWeekendLock = function () {
        var week1 = this.getTodayWeek();
        if (week1 == 7) {
            var daytime = GameData.serverTime - App.DateUtil.getWeeTs(GameData.serverTime);
            if (daytime > 21.5 * 3600) {
                return true;
            }
        }
        return false;
    };
    /**
     * 本周攻城战开启时间
    */
    AcThreeKingdomsVo.prototype.getWarFightTimeSt = function (type) {
        //type 1开启倒计时 2开启时间戳
        var week = this.getCurWeek();
        //本周周六攻城开始时间
        var st = this.activeSt + (week - 1) * (7 * 86400) + 5 * 86400 + this.config.activeTime[2].popularityRange[0] * 3600;
        return type == 1 ? App.DateUtil.getFormatBySecond(st - GameData.serverTime) : App.DateUtil.getFormatBySecond(st, 10);
    };
    /**
     * 是否处于神将突袭的时间段
    */
    AcThreeKingdomsVo.prototype.isInTuxiTime = function () {
        if (this.getCurPeriod() == 2) {
            var timest = this.config.activeTime[1].popularityRange[0];
            var timeet = this.config.activeTime[1].popularityRange[1];
            var nowtime = (GameData.serverTime - App.DateUtil.getWeeTs(GameData.serverTime)) / 3600;
            return this.getCurWeek() == 4 && this.getTodayWeek() < 6 && nowtime >= timest && nowtime < timeet;
        }
        else {
            return false;
        }
    };
    /**
     * 今日神将突袭是否已结束
    */
    AcThreeKingdomsVo.prototype.isTuxiEnd = function () {
        var timeet = this.config.activeTime[1].popularityRange[1];
        var nowtime = (GameData.serverTime - App.DateUtil.getWeeTs(GameData.serverTime)) / 3600;
        return nowtime >= timeet;
    };
    /**
     * 神将突袭倒计时
    */
    AcThreeKingdomsVo.prototype.getTuxiTimeCD = function (type) {
        //type 1 神将突袭开启倒计时 2 神将突袭剩余倒计时
        var timest = App.DateUtil.getWeeTs(GameData.serverTime) + this.config.activeTime[1].popularityRange[0] * 3600;
        var timeet = App.DateUtil.getWeeTs(GameData.serverTime) + this.config.activeTime[1].popularityRange[1] * 3600;
        var nowtime = (GameData.serverTime - App.DateUtil.getWeeTs(GameData.serverTime)) / 3600;
        var et = 0;
        if (type == 2) {
            et = timeet;
        }
        else {
            et = timest;
            if (this.isTuxiEnd()) {
                et += 86400;
            }
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime));
    };
    /**
     * 是否处于攻城战的时间段
    */
    AcThreeKingdomsVo.prototype.isInWarTime = function () {
        var flag = false;
        if (this.getCurPeriod() == 2) {
            for (var i = 3; i < 6; ++i) {
                var cfg = this.config.activeTime[i - 1];
                var timest = cfg.popularityRange[0];
                var timeet = cfg.popularityRange[1];
                var nowtime = (GameData.serverTime - App.DateUtil.getWeeTs(GameData.serverTime)) / 3600;
                if (this.getTodayWeek() > 5 && nowtime >= timest && nowtime < timeet) {
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    };
    /**
     * 处于攻城战的阶段 0第一场未开始 1 攻城战第一场 2攻城战第二场 3攻城战第三场-赤壁，荆州
    */
    AcThreeKingdomsVo.prototype.getCurWarPeriod = function () {
        var cueWarPeriod = 0;
        for (var i = 3; i < 6; ++i) {
            var cfg = this.config.activeTime[i - 1];
            var timest = cfg.popularityRange[0];
            var nowtime = (GameData.serverTime - App.DateUtil.getWeeTs(GameData.serverTime)) / 3600;
            if (this.getTodayWeek() > 5 && nowtime >= timest) {
                cueWarPeriod = i - 2;
            }
        }
        return cueWarPeriod;
    };
    /**
     * 今日攻城战是否已结束
    */
    AcThreeKingdomsVo.prototype.isTodayWarEnd = function () {
        var timeet = this.config.activeTime[4].popularityRange[1];
        var nowtime = (GameData.serverTime - App.DateUtil.getWeeTs(GameData.serverTime)) / 3600;
        return nowtime >= timeet;
    };
    /**
     * 今日攻城战倒计时
    */
    AcThreeKingdomsVo.prototype.getWarTimeCD = function (type) {
        //type 1 攻城战开启倒计时 2 攻城战剩余倒计时
        var et = 0;
        for (var i = 3; i < 6; ++i) {
            var cfg = this.config.activeTime[i - 1];
            var timest = App.DateUtil.getWeeTs(GameData.serverTime) + cfg.popularityRange[0] * 3600;
            var timeet = App.DateUtil.getWeeTs(GameData.serverTime) + cfg.popularityRange[1] * 3600;
            if (type == 1) {
                if (GameData.serverTime < timest) {
                    et = timest;
                    break;
                }
            }
            else {
                if (GameData.serverTime >= timest && GameData.serverTime < timeet) {
                    et = timeet;
                    break;
                }
            }
        }
        if (type == 1) {
            if (this.isTodayWarEnd()) {
                et = App.DateUtil.getWeeTs(GameData.serverTime) + this.config.activeTime[2].popularityRange[0] * 3600 + 86400;
            }
        }
        return App.DateUtil.getFormatBySecond(et - GameData.serverTime);
    };
    /*
    * 最后一条记录
    **/
    AcThreeKingdomsVo.prototype.getLastChargeLog = function () {
        var obj = {
            name: '测试1'
        };
        return obj;
    };
    /*
    * 战斗记录
    **/
    AcThreeKingdomsVo.prototype.getWarLog = function () {
        var arr = [];
        return arr;
    };
    /*
    *是否已经选择阵营
    **/
    AcThreeKingdomsVo.prototype.isSelectedKindom = function () {
        return this.kingdom > 0;
    };
    /*
    *自己的阵营
    **/
    AcThreeKingdomsVo.prototype.getMyKingdoms = function () {
        return this.kingdom;
    };
    /*
    *获取参赛区服
    **/
    AcThreeKingdomsVo.prototype.getPkzidsStr = function () {
        var zidObj = null;
        var zid = [];
        var qu = [];
        var arr = [];
        for (var i in this.zidgroup) {
            zid.push(Number(this.zidgroup[i]));
        }
        // for(let i = 1; i <= 100; ++i){
        // 	arr.push(i);
        // }
        // for(let i = 99; i >= 0; --i){
        // 	let rid = App.MathUtil.getRandom(0,i+1);
        // 	let tmp = arr[i];
        // 	arr[i] = arr[rid];
        // 	arr[rid] = tmp;
        // }
        // for(let i in arr){
        // 	if(Math.random() > 0.8){
        // 		qu.push(arr[i]);
        // 	}
        // 	else{
        // 		zid.push(arr[i]);
        // 	}
        // }
        // let tset = [];
        // for(let i =0;i< tset.length;i++){
        // 	zidObj = tset[i];
        // 	if(zidObj.qu){
        // 		qu.push(Number(zidObj.qu));
        // 	} else {
        // 		zid.push(Number(zidObj.zid));
        // 	}
        // }
        return App.StringUtil.formatMultiServerServerAndZid(qu, zid);
    };
    /*
    *获取推荐区服 人数最少
    三个阵营权势一样，就是随机1个，给推荐阵营标签，其余无标签
    三个权势不一样，就权势最低的一个，给推荐阵营标签，其余无标签
    玩家点开选择阵营按钮，默认选中的是，推荐阵营
    **/
    AcThreeKingdomsVo.prototype.getRecommandTeam = function () {
        var arr = [];
        for (var i = 1; i < 4; ++i) {
            arr.push({
                kid: i,
                num: this.getKingdomsInfo(i).num
            });
        }
        arr.sort(function (a, b) {
            return a.num - b.num;
        });
        return arr[0].kid;
    };
    /*
    *获取本轮阵营分数
    **/
    AcThreeKingdomsVo.prototype.getPoint = function (team) {
        var num = 0;
        if (this.mainlandScore) {
            for (var i in this.mainlandScore) {
                var unit = this.mainlandScore[i];
                num += unit[team - 1];
            }
        }
        return num;
    };
    /*
    *获取上轮阵营分数
    **/
    AcThreeKingdomsVo.prototype.getLastRoundPoint = function (team) {
        var num = 0;
        if (this.prankseasonarr && this.prankseasonarr.seasonScore) {
            var scorearr = this.prankseasonarr.seasonScore;
            var arr = [0, 0, 0];
            var unit = scorearr[this.getCurWeek() - 1 - 1];
            for (var j in unit) {
                arr[j] += unit[j];
            }
            num = arr[team - 1];
        }
        return num;
    };
    /*
    *获取某个阵营在某座城市的阵营分数
    **/
    AcThreeKingdomsVo.prototype.getCityPoint = function (kingdom, cityid, kid) {
        var num = 0;
        var mainland = (kingdom - 1) * 2 + (cityid - 3);
        if (kingdom == 0) {
            mainland = 7;
        }
        if (this.mainlandScore && this.mainlandScore[mainland - 1] && this.mainlandScore[mainland - 1][kid - 1]) {
            num = this.mainlandScore[mainland - 1][kid - 1];
        }
        return num;
    };
    /*
    *获取某个阵营在某座城市的预估每秒获得分数
    **/
    AcThreeKingdomsVo.prototype.getCityPerCore = function (kingdom, cityid, kid) {
        var num = 0;
        if (this._buildinginfo) {
            for (var i in this._buildinginfo) {
                var info = this._buildinginfo[i];
                if (Number(info.kingdom) == kid && info.uid) {
                    ++num;
                }
            }
        }
        return num * (kingdom == 0 ? this.config.campScore2 : this.config.campScore1);
    };
    /*
    *获取某个阵营在某座城市中的某个据点的玩家信息
    **/
    AcThreeKingdomsVo.prototype.getJudianPlayerInfo = function (kingdom, cityid, id) {
        var obj = null;
        if (this._buildinginfo) {
            for (var i in this._buildinginfo) {
                var info = this._buildinginfo[i];
                if (Number(info.building) == id && info.uid) {
                    obj = {
                        uid: info.uid,
                        pic: info.pic,
                        zid: info.zid,
                        ptitleid: info.ptitle,
                        titleid: info.title,
                        name: info.name,
                        kingdomid: info.kingdom,
                        army: info.totalattr,
                        max: info.fullattr
                    };
                    break;
                }
            }
        }
        // if(Math.random() > 0.4){
        // 	obj = {
        // 		uid : 100001,
        // 		pic :App.MathUtil.getRandom(1,6),
        // 		ptitleid : 4000 + id,
        // 		titleid : 3000 + id,
        // 		name : '玩家名',
        // 		kingdomid : App.MathUtil.getRandom(1,4),
        // 		army : App.StringUtil.changeIntToText(App.MathUtil.getRandom(10000000,20000000)),
        // 	};
        // }
        return obj;
    };
    /*
    *获取某个阵营在某座城市中的某个据点的名字
    **/
    AcThreeKingdomsVo.prototype.getCityName = function (kingdom, cityid, id) {
        var cityName = '';
        var code = "1";
        //固定前缀
        var partname1 = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acthreekingdom" + kingdom + "_" + cityid, code), [id.toString()]);
        var tmp = id % 8 == 0 ? 8 : (id % 8);
        var partname2 = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acmainlandcityPos" + tmp, code));
        cityName = partname1;
        return cityName;
    };
    /*
    *获取某个阵营在某座城市中的援兵加成数据百分比
    **/
    AcThreeKingdomsVo.prototype.getCityYuanBingPercent = function (kingdom, cityid, kid, isCentercity) {
        var num = 0;
        var add = this.getAddBuff(3, isCentercity, kingdom, cityid, kid);
        if (add.length) {
            num = add[0].add;
        }
        return num;
    };
    /*
    *获取某个阵营在某座城市中的援军数
    **/
    AcThreeKingdomsVo.prototype.getCityKingdomArmy = function (kingdom, cityid, kid) {
        var num = 0;
        //
        var mainland = (kingdom - 1) * 2 + (cityid - 3);
        if (kingdom == 0) {
            mainland = 7;
        }
        if (this.troopNum && this.troopNum[mainland - 1] && this.troopNum[mainland - 1][kid - 1]) {
            num = this.troopNum[mainland - 1][kid - 1];
        }
        return num;
    };
    /*
    * //buff加成 1城防 2神将 3援军 4神器
    **/
    AcThreeKingdomsVo.prototype.getAddBuff = function (type, iscenter, fromkid, cityid, findkid) {
        var add = [];
        if (type == 2) {
            var curexp = this.getHeroCheerExp();
            var curadd = 0;
            for (var i in this.config.heroList) {
                var cfg = this.config.heroList[i];
                if (curexp >= cfg.needExp) {
                    curadd = cfg.addAtk;
                }
            }
            if (curadd > 0) {
                add.push({
                    add: curadd,
                    addType: 1
                });
            }
        }
        else if (type == 3) {
            var armynum = this.getCityKingdomArmy(fromkid, cityid, findkid);
            var add1 = 0;
            var add2 = 0;
            //援军数
            var uidata = iscenter ? this.config.troop2 : this.config.troop1;
            for (var index = 0; index < uidata.length; index++) {
                var element = uidata[index];
                if (armynum >= (element.needNum * 100000000)) {
                    add1 = element.addAtk;
                }
            }
            //对应排名
            var rankdata = iscenter ? this.config.troopRank1 : this.config.troopRank2;
            var point = [
                {
                    kid: 1,
                    num: this.getCityKingdomArmy(fromkid, cityid, 1)
                },
                {
                    kid: 2,
                    num: this.getCityKingdomArmy(fromkid, cityid, 2)
                },
                {
                    kid: 3,
                    num: this.getCityKingdomArmy(fromkid, cityid, 3)
                },
            ];
            point.sort(function (a, b) {
                if (a.num == b.num) {
                    return a.kid - b.kid;
                }
                else {
                    return b.num - a.num;
                }
            });
            var rank = 0;
            for (var i = 0; i < point.length; ++i) {
                if (point[i].kid == findkid) {
                    rank = i + 1;
                    break;
                }
            }
            for (var index = 0; index < rankdata.length; index++) {
                var element = rankdata[index];
                if (armynum < (element.needNum * 100000000)) {
                    break;
                }
                add2 = element["rank" + rank];
            }
            if ((add1 + add2) > 0) {
                add.push({
                    add: add1 + add2,
                    addType: 1
                });
            }
        }
        else if (type == 4) {
            var slist = Api.servantVoApi.getServantInfoList();
            var num = 1; //Object.keys(slist).length;
            var atktotal = 0;
            var bloodtotal = 0;
            var crittotal = 0;
            for (var i in slist) {
                var unit = slist[i];
                var weaponinfo = Api.weaponVoApi.getWeaponInfoVoByServantId(unit.servantId);
                if (weaponinfo && weaponinfo.cfg && weaponinfo.cfg.attributeType1) {
                    if (weaponinfo.cfg.attributeType1 == 4) {
                        atktotal += (Number(weaponinfo.getAttributeValueType1()) * num);
                    }
                    else if (weaponinfo.cfg.attributeType1 == 5) {
                        bloodtotal += (Number(weaponinfo.getAttributeValueType1()) * num);
                    }
                    else if (weaponinfo.cfg.attributeType1 == 6) {
                        var critnum = Number(weaponinfo.getAttributeValueType1().split("%")[0]) / 100;
                        crittotal += (critnum * num);
                    }
                }
            }
            if (atktotal > 0) {
                add.push({
                    add: atktotal,
                    addType: 1
                });
            }
            if (bloodtotal) {
                add.push({
                    add: bloodtotal,
                    addType: 2
                });
            }
            if (crittotal) {
                add.push({
                    add: crittotal,
                    addType: 3
                });
            }
        }
        return add;
    };
    /*
    *1属性总加成 2资质总加成
    **/
    AcThreeKingdomsVo.prototype.getAddBuffNum = function (type) {
        var add = type * 100;
        return add;
    };
    /*
    *兵力基础值
    **/
    AcThreeKingdomsVo.prototype.getMyArmyNum = function () {
        var num = 0;
        var slist = Api.servantVoApi.getServantInfoList();
        for (var i in slist) {
            var unit = slist[i];
            num += (unit.total);
        }
        return num * this.config.hpBase;
    };
    /*
    *攻击力基础值
    **/
    AcThreeKingdomsVo.prototype.getMyAtkNum = function () {
        var num = 0;
        var slist = Api.servantVoApi.getServantInfoList();
        for (var i in slist) {
            var unit = slist[i];
            num += (unit.getTotalBookValue());
        }
        return num * this.config.atkBase;
    };
    /*
    *自己的粮草数量 普通攻城
    **/
    AcThreeKingdomsVo.prototype.getMyFood = function () {
        return this.food;
    };
    /*
    *自己的军资数量 激战攻城
    **/
    AcThreeKingdomsVo.prototype.getMyResource = function () {
        return this.goods;
    };
    /*
    *自己的军队是否已经派遣出去了
    **/
    AcThreeKingdomsVo.prototype.isSendArmy = function () {
        var flag = false;
        if (this.myBuildinfo && this.myBuildinfo.building) {
            flag = true;
        }
        return flag;
    };
    /*
    *自己的军队占领的据点信息
    **/
    AcThreeKingdomsVo.prototype.myArmyInfo = function () {
        var obj = {};
        if (this.isSendArmy()) {
            obj = {
                kingdomid: this.myBuildinfo.mainland == 7 ? 0 : Math.ceil(this.myBuildinfo.mainland / 2),
                cityid: this.myBuildinfo.mainland - (Math.ceil(this.myBuildinfo.mainland / 2) - 1) * 2 + 3,
                judianid: this.myBuildinfo.building
            };
        }
        return obj;
    };
    /*
    *本轮还有免费次数吗
    **/
    AcThreeKingdomsVo.prototype.isFightFree = function (type) {
        var freemax = this.config.getFightNum(type);
        var num = 0;
        if (this.attackNum && this.attackNum.num) {
            num = this.attackNum.num;
        }
        return num < freemax;
    };
    /*
    *本轮还有的出战次数
    **/
    AcThreeKingdomsVo.prototype.getMyFightNum = function (type) {
        var freemax = this.config.getFightNum(type);
        var num = freemax;
        if (this.attackNum) {
            num = Math.min(freemax, freemax - (this.attackNum.num));
        }
        return num;
    };
    /*
    *出战CD时间 为0则无cd
    **/
    AcThreeKingdomsVo.prototype.getFightCD = function (iscenter) {
        var num = 0;
        if (this.attackNum && this.attackNum.st) {
            num = this.attackNum.st + (iscenter ? this.config.coldTime2 : this.config.coldTime1) - GameData.serverTime;
        }
        return num;
    };
    AcThreeKingdomsVo.prototype.setBuildingInfo = function (info) {
        this._buildinginfo = [];
        if (info && info.length) {
            this._buildinginfo = info;
        }
    };
    AcThreeKingdomsVo.prototype.setBuildingInfoById = function (info) {
        for (var i in info) {
            var buildid = 0;
            var unit = info[i];
            if (unit && unit.building) {
                var flag = true;
                for (var j in this._buildinginfo) {
                    var tmp = this._buildinginfo[j];
                    if (tmp.building == unit.building && tmp.mainland == unit.mainland) {
                        this._buildinginfo[j] = null;
                        this._buildinginfo[j] = unit;
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    this._buildinginfo.push(unit);
                }
            }
        }
    };
    //阵营赛季分数
    AcThreeKingdomsVo.prototype.getMyZrankSeasonPoints = function (mykid) {
        if (mykid === void 0) { mykid = 0; }
        var rank = 0;
        if (!mykid) {
            mykid = this.getMyKingdoms();
        }
        if (mykid) {
            if (this.prankseasonarr && this.prankseasonarr.seasonScore) {
                var scorearr = this.prankseasonarr.seasonScore;
                var arr = [0, 0, 0];
                for (var i in scorearr) {
                    var unit = scorearr[i];
                    for (var j in unit) {
                        if (!arr[j]) {
                            arr[j] = 0;
                        }
                        arr[j] += Number(unit[j]);
                    }
                }
                rank = arr[mykid - 1];
            }
        }
        else {
            rank = 0;
        }
        return rank;
    };
    //阵营本轮分数
    AcThreeKingdomsVo.prototype.getMyZrankRoundPoints = function (mykid) {
        if (mykid === void 0) { mykid = 0; }
        var rank = 0;
        if (!mykid) {
            mykid = this.getMyKingdoms();
        }
        if (mykid) {
            if (this.prankseasonarr && this.prankseasonarr.seasonScore) {
                var scorearr = this.prankseasonarr.seasonScore;
                var arr = [0, 0, 0];
                var unit = scorearr[scorearr.length - 1];
                for (var j in unit) {
                    arr[j] += unit[j];
                }
                rank = arr[mykid - 1];
            }
        }
        else {
            rank = 0;
        }
        return rank;
    };
    //阵营赛季排名
    AcThreeKingdomsVo.prototype.getMyZrankSeason = function () {
        var rank = 0;
        var mykid = this.getMyKingdoms();
        if (mykid) {
            if (this.prankseasonarr && this.prankseasonarr.seasonScore) {
                var arr = [{ kingdomid: 1, value: this.getMyZrankSeasonPoints(1) }, { kingdomid: 2, value: this.getMyZrankSeasonPoints(2) }, { kingdomid: 3, value: this.getMyZrankSeasonPoints(3) }];
                arr.sort(function (a, b) {
                    return b.value - a.value;
                });
                for (var i = 0; i < 3; ++i) {
                    if (arr[i].kingdomid == mykid) {
                        rank = Number(i) + 1;
                        break;
                    }
                }
            }
        }
        else {
            rank = 0;
        }
        return rank;
    };
    //阵营本轮排名
    AcThreeKingdomsVo.prototype.getMyZrankRound = function () {
        var rank = 0;
        var mykid = this.getMyKingdoms();
        if (mykid) {
            var arr = [{ kingdomid: 1, value: this.getMyZrankRoundPoints(1) }, { kingdomid: 2, value: this.getMyZrankRoundPoints(2) }, { kingdomid: 3, value: this.getMyZrankRoundPoints(3) }];
            arr.sort(function (a, b) {
                return b.value - a.value;
            });
            for (var i = 0; i < 3; ++i) {
                if (arr[i].kingdomid == mykid) {
                    rank = Number(i) + 1;
                    break;
                }
            }
        }
        else {
            rank = 0;
        }
        return rank;
    };
    //个人本轮分数
    AcThreeKingdomsVo.prototype.getMyPrankRoundPoints = function () {
        var rank = 0;
        if (this.getMyKingdoms()) {
            if (this.prankroundarr && this.prankroundarr.myrankArr && this.prankroundarr.myrankArr.value) {
                rank = this.prankroundarr.myrankArr.value;
            }
        }
        else {
            rank = 0;
        }
        return rank;
    };
    //个人赛季分数
    AcThreeKingdomsVo.prototype.getMyPrankSeasonPoints = function () {
        var rank = 0;
        if (this.getMyKingdoms()) {
            if (this.prankseasonarr && this.prankseasonarr.myrankArr && this.prankseasonarr.myrankArr.value) {
                rank = this.prankseasonarr.myrankArr.value;
            }
        }
        else {
            rank = 0;
        }
        return rank;
    };
    //个人本轮排名
    AcThreeKingdomsVo.prototype.getMyPrankRoundRank = function () {
        var rank = 0;
        if (this.getMyKingdoms()) {
            if (this.prankroundarr && this.prankroundarr.myrankArr && this.prankroundarr.myrankArr.myrank) {
                rank = this.prankroundarr.myrankArr.myrank;
            }
        }
        else {
            rank = 0;
        }
        return rank;
    };
    //个人赛季排名
    AcThreeKingdomsVo.prototype.getMyPrankSeaonRank = function () {
        var rank = 0;
        if (this.getMyKingdoms()) {
            if (this.prankseasonarr && this.prankseasonarr.myrankArr && this.prankseasonarr.myrankArr.myrank) {
                rank = this.prankseasonarr.myrankArr.myrank;
            }
        }
        else {
            rank = 0;
        }
        return rank;
    };
    AcThreeKingdomsVo.prototype.setMapInfo = function (data) {
        if (data.mainlandScore) {
            this.mainlandScore = data.mainlandScore;
        }
        if (data.troopNum) {
            this.troopNum = data.troopNum;
        }
        if (data.myBuildinfo) {
            this.myBuildinfo = data.myBuildinfo;
        }
        if (data.zidgroup) {
            this.zidgroup = data.zidgroup;
        }
        if (data.numinkingdom) {
            this.numinkingdom = data.numinkingdom;
        }
        if (data.roundMainlandScore) {
            this._roundMainlandScore = data.roundMainlandScore;
        }
    };
    //当前这一轮的各城市信息
    AcThreeKingdomsVo.prototype.getCurRoundCityWarInfo = function (kingdomid, cityId) {
        //cityid 城市 num 第几场 1 2周六 3 4周日
        var score = [];
        score.push(this.getCityPoint(kingdomid, cityId, 1));
        score.push(this.getCityPoint(kingdomid, cityId, 2));
        score.push(this.getCityPoint(kingdomid, cityId, 3));
        var kingdoms = 0;
        var max = 0;
        for (var i = 0; i < score.length; ++i) {
            var kid = Number(i) + 1;
            if (score[i] > max) {
                max = score[i];
                kingdoms = kid;
            }
        }
        return {
            kingdoms: kingdoms
        };
    };
    //当前这一轮的中心城市信息
    AcThreeKingdomsVo.prototype.getCurRoundCenterCityWarInfo = function () {
        //cityid 城市 num 第几场 1 2周六 3 4周日
        var score = [];
        score.push(this.getCityPoint(0, 0, 1));
        score.push(this.getCityPoint(0, 0, 2));
        score.push(this.getCityPoint(0, 0, 3));
        var kingdoms = 0;
        var max = 0;
        for (var i = 0; i < score.length; ++i) {
            var kid = Number(i) + 1;
            if (score[i] > max) {
                max = score[i];
                kingdoms = kid;
            }
        }
        return {
            kingdoms: kingdoms
        };
    };
    AcThreeKingdomsVo.prototype.getCityTaskStaus = function (cityid) {
        var status = 0;
        var info = null;
        if (this.cityTask) {
            info = this.cityTask[cityid == 1 ? 4 : (cityid - 2)];
        }
        var level = 1;
        var et = 0;
        var arr = null;
        if (info) {
            level = info.lv;
            var cfg = this.config.taskList[level - 1];
            if (typeof info.sids == "undefined") {
                status = 1;
            }
            else {
                if (info.flag && info.flag == 1) {
                    status = 4;
                }
                else {
                    et = info.st + cfg.needTime;
                    status = GameData.serverTime < et ? 2 : 3;
                }
            }
            arr = info.sids;
        }
        //1可派遣 2已派遣 3可领取 4已完成
        return {
            status: status,
            et: et,
            level: level,
            servantArr: arr
        };
    };
    AcThreeKingdomsVo.prototype.getIsAllTaskFinish = function () {
        var flag = true;
        for (var i = 1; i <= 5; ++i) {
            if (i == 1 && this.getCurWeek() == 1) {
                continue;
            }
            var info = this.getCityTaskStaus(i);
            if (info.status < 3) {
                flag = false;
                break;
            }
        }
        return flag;
    };
    AcThreeKingdomsVo.prototype.getServantAttend = function (sid) {
        var flag = false;
        for (var i = 1; i <= 5; ++i) {
            var info = this.getCityTaskStaus(i);
            if (info.servantArr && info.servantArr.indexOf(String(sid)) > -1) {
                flag = true;
                break;
            }
        }
        return flag;
    };
    //获取大都督信息
    AcThreeKingdomsVo.prototype.getGeneralPlayerInfo = function () {
        var obj = null;
        // if(Math.random() > 0.4){
        // 	obj = {
        // 		uid : 100001,
        // 		pic :App.MathUtil.getRandom(1,6),
        // 		ptitleid : 4000 + id,
        // 		titleid : 3000 + id,
        // 		name : '玩家名',
        // 		kingdomid : App.MathUtil.getRandom(1,4),
        // 		army : App.StringUtil.changeIntToText(App.MathUtil.getRandom(10000000,20000000)),
        // 	};
        // }
        // obj = {
        // 	kingdomid : App.MathUtil.getRandom(1,4),
        // 	army : App.StringUtil.changeIntToText(App.MathUtil.getRandom(10000000,20000000)),
        // };
        obj = this.getOfficalInfo(1);
        return obj;
    };
    /**
     * 是否处于派遣任务时间段
    */
    AcThreeKingdomsVo.prototype.isInTaskTime = function () {
        if (this.getCurPeriod() == 2) {
            var timest = this.config.activeTime[0].popularityRange[0];
            var timeet = this.config.activeTime[0].popularityRange[1];
            var nowtime = (GameData.serverTime - App.DateUtil.getWeeTs(GameData.serverTime)) / 3600;
            return this.getTodayWeek() < 6 && nowtime >= timest && nowtime < timeet;
        }
        else {
            return false;
        }
    };
    /**
     * 派遣任务时间已结束
    */
    AcThreeKingdomsVo.prototype.isTaskTimeEnd = function () {
        var timest = this.config.activeTime[0].popularityRange[0];
        var timeet = this.config.activeTime[0].popularityRange[1];
        var nowtime = (GameData.serverTime - App.DateUtil.getWeeTs(GameData.serverTime)) / 3600;
        return this.getTodayWeek() < 6 && nowtime >= timeet;
    };
    /**
     * 获取对应职位信息 1大都督 2尚书 3主簿
    */
    AcThreeKingdomsVo.prototype.getOfficalInfo = function (type) {
        var obj = null;
        // if(this.meetinginfo && this.meetinginfo.rankArr && this.meetinginfo.rankArr[type - 1]){
        var unit = this.meetinginfo.rankArr[type - 1];
        if (unit) { //unit
            obj = {
                uid: unit.uid,
                pic: unit.pic ? unit.pic : 1,
                ptitleid: unit.ptitle,
                title: type == 1 ? Api.playerVoApi.getTitleInfo() : unit.title,
                name: unit.name,
                level: unit.level,
                clothes: type == 1 ? Api.playerVoApi.getTitleInfo() : unit.title.clothes
            };
            // if(type <= 2){
            // 	obj.title = {
            // 		title : 3001,
            // 		tlv : 5,
            // 		clothes : 3001,
            // 		clv : 6,
            // 	};
            // }
        }
        //}
        return obj;
    };
    /**
     * 自己是否担任本阵营的高官
    */
    AcThreeKingdomsVo.prototype.getIsMyOffical = function () {
        var flag = false;
        for (var i = 1; i < 4; ++i) {
            var info = this.getOfficalInfo(i);
            if (info && Number(info.uid) == Api.playerVoApi.getPlayerID()) {
                flag = true;
                break;
            }
        }
        return flag;
    };
    /**
     * 获取当前正在生效的军令详情  1未生效 2发布中
    */
    AcThreeKingdomsVo.prototype.getOrderInfo = function () {
        var state = 1;
        var obj = null;
        var targetcity = 0;
        var targetkingdom = 0;
        var targetweekday = 0;
        var targetround = 0;
        var targetnum = 0;
        //是否在普通攻城期
        if (this.isInWarTime() && this.getCurWarPeriod() < 3) {
            var id = this.getTodayWeek() == 6 ? (this.getCurWarPeriod() == 1 ? 1 : 2) : (this.getCurWarPeriod() == 1 ? 3 : 4);
            var info = this.getOrderCityInfo(id);
            if (info) {
                state = 2;
                targetkingdom = info.targetkingdom;
                targetcity = info.targetcity;
                targetweekday = this.getTodayWeek();
                targetround = this.getCurWarPeriod();
                targetnum = id;
            }
        }
        else {
            state = 1;
        }
        return {
            state: state,
            targetcity: targetcity,
            targetkingdom: targetkingdom,
            targetweekday: targetweekday,
            targetround: targetround,
            targetnum: targetnum
        };
    };
    /**
     * 获取当前4个军令对应的详情 1 2 3 4
    */
    AcThreeKingdomsVo.prototype.getOrderCityInfo = function (i) {
        var obj = null;
        var day = i < 3 ? 6 : 7;
        var ftype = i % 2 == 1 ? 3 : 4;
        if (this.meetinginfo && this.meetinginfo.order && this.meetinginfo.order[day] && this.meetinginfo.order[day][ftype]) {
            var cityid = this.meetinginfo.order[day][ftype];
            obj = {
                targetcity: cityid,
                targetkingdom: Math.ceil(cityid / 2)
            };
        }
        return obj;
    };
    /**
     * 获取神将助威信息
    */
    AcThreeKingdomsVo.prototype.getHeroCheerExp = function () {
        var exp = 0;
        if (this.meetinginfo && this.meetinginfo.heroexp) {
            exp = this.meetinginfo.heroexp;
        }
        return exp;
    };
    /**
     * 获取阵营信息
    */
    AcThreeKingdomsVo.prototype.getKingdomsInfo = function (i) {
        var num = 0;
        if (this.numinkingdom && this.numinkingdom[i - 1]) {
            num = Number(this.numinkingdom[i - 1]);
        }
        return {
            num: num
        };
    };
    /**
     * 获取自己密信数量
    */
    AcThreeKingdomsVo.prototype.getMyLetterNum = function () {
        var rewardvo = GameData.formatRewardItem(this.config.change)[0];
        return Api.itemVoApi.getItemNumInfoVoById(rewardvo.id);
    };
    /**
     * 今日是否已转过
    */
    AcThreeKingdomsVo.prototype.getHasTodayChange = function () {
        var flag = false;
        var today0 = App.DateUtil.getWeeTs(GameData.serverTime);
        if (this.joinkingdomTS >= today0) {
            flag = true;
        }
        return flag;
    };
    /*
    *限时军需 今日充值数
    */
    AcThreeKingdomsVo.prototype.getChargeNum = function () {
        var num = 0;
        if (this.rinfo && this.rinfo.v) {
            num = this.rinfo.v;
        }
        return num;
    };
    /*
    *限时军需 今日领取
    */
    AcThreeKingdomsVo.prototype.isGetRecharge = function (id) {
        var flag = false;
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]) {
            flag = true;
        }
        return flag;
    };
    /*
    *限时军需 是否在充值时间内
    */
    AcThreeKingdomsVo.prototype.isInChargeTime = function () {
        var flag = false;
        if (this.getTodayWeek() > 5) {
            flag = true;
        }
        return flag;
    };
    /*
    *判断周一-周五神将击败奖励是否已领取
    */
    AcThreeKingdomsVo.prototype.isGetHeroWinReward = function (day) {
        var flag = false;
        if (this.heroRewards && this.heroRewards[day]) {
            flag = true;
        }
        return flag;
    };
    /*
    *神将突袭门客的已经战斗次数
    */
    AcThreeKingdomsVo.prototype.getServantFightInfo = function (servantId) {
        var v = 0;
        if (this.heroUseSids && this.heroUseSids[this.getTodayWeek()] && this.heroUseSids[this.getTodayWeek()][servantId] && this.heroUseSids[this.getTodayWeek()][servantId]) {
            v = this.heroUseSids[this.getTodayWeek()][servantId];
        }
        return v;
    };
    /*
    *神将突袭神将的资源
    */
    AcThreeKingdomsVo.prototype.getHeroAttackNpcPic = function (iskill) {
        //魏国 周一到周五 关羽 张飞 孙策 周瑜 吕布
        //蜀国 周一到周五 张辽 曹操 孙策 周瑜 吕布
        //吴国 周一到周五 张辽 曹操 关羽 张飞 吕布
        var arr = {
            1: [2014, 2015, 1038, 1037, 1033],
            2: [1038, 1037, 1058, 1020, 1033],
            3: [1058, 1020, 2014, 2015, 1033]
        };
        var sid = arr[this.getMyKingdoms()][this.getTodayWeek() - 1];
        if (!sid) {
            sid = 1033;
        }
        var cfg = Config.ServantCfg.getServantItemById(sid);
        return {
            pic: cfg.fullIcon,
            kingdom: (this.getMyKingdoms() + Math.ceil(this.getTodayWeek() / 2)) % 3 == 0 ? 3 : ((this.getMyKingdoms() + Math.ceil(this.getTodayWeek() / 2)) % 3),
            name: "" + (iskill ? LanguageManager.getlocal(App.CommonUtil.getCnByCode("acthreekingdomsheroattacktip4", this.code.toString())) : "") + cfg.name
        };
    };
    /*
    *转换过阵营去打突袭
    **/
    AcThreeKingdomsVo.prototype.canGetHeroAttackReward = function (day) {
        var flag = false;
        if (this.heroJoin && this.heroJoin[day] && this.heroJoin[day][this.getMyKingdoms()]) {
            flag = this.heroJoin[day][this.getMyKingdoms()];
        }
        return flag;
    };
    /*
    *激战期结果 1荆州 2赤壁
    **/
    AcThreeKingdomsVo.prototype.getCenterCityWarInfo = function (type) {
        //type 
        var week = this.getCurWeek();
        var cfg = this.config.activeTime;
        //本周周日活动结束时间
        var et = this.activeSt + (week - 1) * (7 * 86400) + (type == 1 ? 5 : 6) * 86400 + cfg[4].popularityRange[1] * 3600;
        var score = [];
        var kingdoms = 0;
        var day = type == 1 ? 6 : 7;
        var ftype = 5;
        if (this._roundMainlandScore && this._roundMainlandScore[day] && this._roundMainlandScore[day][ftype] && this._roundMainlandScore[day][ftype][6]) {
            score = this._roundMainlandScore[day][ftype][6];
            var max = 0;
            for (var i = 0; i < score.length; ++i) {
                var kid = Number(i) + 1;
                if (score[i] > max) {
                    max = score[i];
                    kingdoms = kid;
                }
            }
        }
        return {
            kingdoms: kingdoms,
            ischange: this.joinkingdomTS > et
        };
    };
    /*
    *激战期奖励已领取 1荆州 2赤壁
    **/
    AcThreeKingdomsVo.prototype.isGetCenterCityReward = function (type) {
        var day = type == 1 ? 6 : 7;
        var ftype = 5;
        var flag = false;
        var week = this.getCurWeek();
        if (this.cityRewardFlags && this.cityRewardFlags[week] && this.cityRewardFlags[week][day] && this.cityRewardFlags[week][day][ftype] && this.cityRewardFlags[week][day][ftype][7]) {
            flag = true;
        }
        return flag;
    };
    /*
    *普通攻城期结果
    **/
    AcThreeKingdomsVo.prototype.getCityWarInfo = function (cityid, num) {
        //cityid 城市 num 第几场 1 2周六 3 4周日
        var week = this.getCurWeek();
        var cfg = this.config.activeTime;
        //本周周日活动结束时间
        var et = this.activeSt + (week - 1) * (7 * 86400) + (num < 3 ? 5 : 6) * 86400 + cfg[num % 2 == 1 ? 2 : 3].popularityRange[1] * 3600;
        var score = [];
        var kingdoms = 0;
        var day = num < 3 ? 6 : 7;
        var ftype = num % 2 == 1 ? 3 : 4;
        if (this._roundMainlandScore && this._roundMainlandScore[day] && this._roundMainlandScore[day][ftype] && this._roundMainlandScore[day][ftype][cityid - 1]) {
            score = this._roundMainlandScore[day][ftype][cityid - 1];
            var max = 0;
            for (var i = 0; i < score.length; ++i) {
                var kid = Number(i) + 1;
                if (score[i] > max) {
                    max = score[i];
                    kingdoms = kid;
                }
            }
            if (max == 0) {
                kingdoms = Math.ceil(cityid / 2);
            }
        }
        return {
            kingdoms: kingdoms,
            ischange: this.joinkingdomTS > et
        };
    };
    /*
    *普通攻城期 奖励已领取
    **/
    AcThreeKingdomsVo.prototype.isGetCityReward = function (cityid, num) {
        var day = num < 3 ? 6 : 7;
        var ftype = num % 2 == 1 ? 3 : 4;
        var flag = false;
        var week = this.getCurWeek();
        if (this.cityRewardFlags && this.cityRewardFlags[week] && this.cityRewardFlags[week][day] && this.cityRewardFlags[week][day][ftype] && this.cityRewardFlags[week][day][ftype][cityid]) {
            flag = true;
        }
        return flag;
    };
    /**
    *跨服活动相关信息
    */
    AcThreeKingdomsVo.prototype.getCrossActivity = function () {
        // let arr = [
        // 	AcConst.AID_ACCROSSSERVERPOWER,
        // 	AcConst.AID_ACCROSSSERVERINTIMACY,
        // 	AcConst.AID_ACCROSSSERVERATKRACE,
        // 	AcConst.AID_BATTLEGROUND,
        // 	AcConst.AID_TOMB,
        // 	AcConst.AID_CONQUERMAINLAND,
        // 	AcConst.AID_ACCROSSSERVERWIFEBATTLE
        // ];
        // let date = [
        // 	1581696000,1582128000,1582812000,1582898400,1583071200,1583416800,1583503200
        // ]
        if (!this.config) {
            return {};
        }
        var info = [];
        for (var i = 1; i <= 4; ++i) {
            //第1-4周 从上一轮的激战期结束后开始计算
            var weekst = this.activeSt + (i - 1) * (7 * 86400);
            var weeket = weekst + 7 * 86400;
            var start = weekst - 86400 + this.config.activeTime[4].popularityRange[1] * 3600;
            var end = weekst + 6 * 86400 + this.config.activeTime[4].popularityRange[1] * 3600;
            var tmp = [];
            for (var j in this.rankActiveRwd) {
                var unit = this.rankActiveRwd[j];
                var acst = unit.st;
                var acet = unit.et - 1 * 86400;
                if (acet >= start && acet < end && GameData.serverTime >= acet) {
                    if (i == 1 && acet < weekst) {
                        continue;
                    }
                    tmp.push({
                        aid: j,
                        acet: acet,
                        acst: acst,
                        start: start,
                        end: end,
                        weekst: weekst,
                        weeket: weeket,
                        rank: unit.myrank
                    });
                }
            }
            info.push({
                week: i,
                weekst: weekst,
                weeket: weeket,
                activity: tmp,
                start: start,
                end: end
            });
        }
        var curweek = this.getCurWeek();
        info.sort(function (a, b) {
            if (a.week == curweek && b.curweek != curweek) {
                return -1;
            }
            else if (b.week == curweek && a.curweek != curweek) {
                return 1;
            }
            else {
                if (a.week > curweek && b.week < curweek) {
                    return -1;
                }
                else if (b.week > curweek && a.week < curweek) {
                    return 1;
                }
                else {
                    return a.week - b.week;
                }
            }
        });
        return info;
    };
    /*
    *跨服冲榜活动奖励领取
    **/
    AcThreeKingdomsVo.prototype.isGetFoodReward = function (aid) {
        var flag = false;
        if (this.rankActiveRwd && this.rankActiveRwd[aid] && this.rankActiveRwd[aid].flag) {
            flag = true;
        }
        return flag;
    };
    /*
    *军政厅消息
    **/
    AcThreeKingdomsVo.prototype.setMeetingInfo = function (data) {
        this.meetinginfo = data;
    };
    /*
    *城池积分数据 num 第几场战斗 1 2 3 4 5 6  3、6中心城战斗
    **/
    AcThreeKingdomsVo.prototype.setMainLandScore = function (data) {
        this._roundMainlandScore = data;
    };
    AcThreeKingdomsVo.prototype.dispose = function () {
        this.listred = false;
        this.activeSt = 0;
        this.activeEt = 0;
        this.kingdom = 0;
        this._buildinginfo = [];
        this.food = 0;
        this.goods = 0;
        this.attackNum = null;
        this.myBuildinfo = null;
        this.mainlandScore = [];
        this.troopNum = [];
        this.selectServant = {};
        this.cityTask = [];
        this.lastidx = 0;
        this.lastpos = null;
        this.heroUseSids = null;
        this.heroRewards = null;
        this.heroJoin = null;
        this.rinfo = null;
        this.meetinginfo = null;
        this.round = 1;
        this.joinkingdomTS = 0;
        this._roundMainlandScore = {};
        this.cityRewardFlags = null;
        this.rankActiveRwd = null;
        this.numinkingdom = [];
        this.zidgroup = [];
        this.prankroundarr = null;
        this.zrankroundarr = null;
        this.prankseasonarr = null;
        this.zrankseasonarr = null;
        this.tmpinfo = {};
        this.listred = false;
        this.heroHpList = null;
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsVo;
}(AcBaseVo));
//# sourceMappingURL=AcThreeKingdomsVo.js.map