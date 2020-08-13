/**
 * 议事阁系统api
 * author qianjun
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
var CountryWarVoApi = (function (_super) {
    __extends(CountryWarVoApi, _super);
    function CountryWarVoApi() {
        var _this = _super.call(this) || this;
        _this.basetime = 0; // 1542124800
        _this.getrewards = {};
        _this.info = {};
        _this.lastYm = '';
        _this.lastday = 0;
        _this.nowturn = {};
        _this.randcity = 0;
        _this.rest = {};
        _this.servant = {};
        _this.announce = {};
        _this.init = false;
        _this.reback = false;
        _this.result = false;
        /**
         * 该城市双方派遣的信息
         */
        _this._mycityInfo = {};
        _this._enermycityInfo = {};
        _this._history = {};
        _this._winnum = 0;
        return _this;
    }
    CountryWarVoApi.prototype.formatData = function (data) {
        var self = this;
        self.basetime = data.basetime;
        self.getrewards = data.getrewards;
        self.info = data.info;
        self.lastYm = data.lastYm;
        self.lastday = data.lastday;
        self.nowturn = data.nowturn;
        self.randcity = data.randcity;
        self.rest = data.rest;
        self.servant = data.servant;
        self.init = true;
    };
    /**计策是否上线 */
    CountryWarVoApi.prototype.isPlanLimit = function (planId, limit) {
        if (this.info && this.info.buystra && this.info.buystra[planId]) {
            if (this.info.buystra[planId] >= limit) {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    };
    /**
     * 门客站的小红点
     */
    CountryWarVoApi.prototype.countryWarRedPoint = function () {
        var flag = false;
        if (Api.switchVoApi.checkOpenCountryWar() && this.isPlayerSerVantLevel()) {
            if (this.getEnermyZid() > 0) {
                if (this.isShowRewardRedPoint()) {
                    flag = true;
                }
                else if (this.getCurpeirod() == 1 && this.getEmptyServant()) {
                    var arr = this.getRandCity();
                    for (var i in arr) {
                        if (this.isPlayerSendServant(arr[i])) {
                            flag = true;
                            break;
                        }
                    }
                }
            }
            else if (this.getIslunkong()) {
                if (this.isShowRewardRedPoint()) {
                    flag = true;
                }
            }
        }
        return flag;
    };
    /**
     * 玩家是否满足派遣门客等级
     */
    CountryWarVoApi.prototype.isPlayerSerVantLevel = function () {
        if (Api.playerVoApi.getPlayerLevel() >= Config.CountrywarCfg.unlock) {
            return true;
        }
        return false;
    };
    /**
 * 玩家是否有未派遣门客
 */
    CountryWarVoApi.prototype.isPlayerSendServant = function (cityId) {
        var flag = false;
        if (Api.playerVoApi.getPlayerLevel() >= Config.CountrywarCfg.unlock && this.getCurpeirod() == 1) {
            var servantInfoVoList = Api.servantVoApi.getServantInfoListWithSort(1);
            for (var i in servantInfoVoList) {
                var servantInfo = servantInfoVoList[i];
                var power = Config.CountrywarCfg.cityLowestPower[cityId].power;
                if (servantInfo.total >= power && !Api.countryWarVoApi.isServantRest(servantInfo.servantId)) {
                    flag = true;
                }
            }
        }
        return flag;
    };
    /**
     * 奖励的小红点
     */
    CountryWarVoApi.prototype.isShowRewardRedPoint = function () {
        if (Api.countryWarVoApi.getIslunkong()) {
            if (this.getCurpeirod() == 3 && !Api.countryWarVoApi.isReceiveZidReward() && Api.countryWarVoApi.isPlayerSerVantLevel()) {
                return true;
            }
        }
        else {
            if (this.isFightSuccess() && this.getCurpeirod() == 3 && (this.isReceiveZidReward() == false || this.isRankReward() == false)) {
                return true;
            }
        }
        return false;
    };
    /**
     * 区服奖励是否领取
     */
    CountryWarVoApi.prototype.isReceiveZidReward = function () {
        var key = this.basetime + this.nowturn.readyTime;
        if (this.getrewards[key]) {
            if (this.getrewards[key][0] == 0) {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    };
    /**
     * 区服奖励是否领取
     */
    CountryWarVoApi.prototype.isRankReward = function () {
        var key = this.basetime + this.nowturn.readyTime;
        if (this.getrewards[key]) {
            if (this.getrewards[key][1] == 0) {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    };
    CountryWarVoApi.prototype.setAnnouce = function (data) {
        var self = this;
        this.announce = data; //text name
    };
    CountryWarVoApi.prototype.checkNpcMessage = function () {
        return false;
    };
    CountryWarVoApi.prototype.isShowNpc = function () {
        var cfg = Config.CountrywarCfg;
        return Api.playerVoApi.getPlayerLevel() >= cfg.unlock;
    };
    /*readytime wartime resulttime endtime
    *龙队 虎队
    */
    CountryWarVoApi.prototype.isRedTeam = function (type) {
        var team = 0;
        if (this.info.team) {
            team = this.info.team;
        }
        if (type == 'left') {
            return team == 0;
        }
        else {
            return !(team == 0);
        }
    };
    CountryWarVoApi.prototype.getLockedString = function () {
        var unlock = Config.CountrywarCfg.unlock;
        return Api.playerVoApi.getPlayerOfficeByLevel(unlock);
    };
    /*readytime wartime resulttime endtime
    *1备战期 2战斗展示期 3战斗奖励结算
    */
    CountryWarVoApi.prototype.getCurpeirod = function () {
        var nowturn = this.nowturn;
        var baseTime = this.basetime;
        var arr = [];
        arr.push(this.basetime + this.nowturn.readyTime);
        arr.push(this.basetime + this.nowturn.warTime);
        arr.push(this.basetime + this.nowturn.resultTime);
        arr.push(this.basetime + this.nowturn.endTime);
        var period = 1;
        for (var i in arr) {
            if (GameData.serverTime < arr[i]) {
                period = Number(i);
                break;
            }
        }
        return period;
    };
    /*readytime wartime resulttime endtime
    *1备战期 2战斗展示期 3战斗奖励结算
    */
    CountryWarVoApi.prototype.canCheckVs = function () {
        var flag = true;
        var wartime = this.basetime + this.nowturn.warTime;
        if (this.getCurpeirod() == 2) {
            if (GameData.serverTime < (wartime + 3600)) {
                flag = false;
            }
        }
        return flag;
    };
    /**
     * 获取倒计时
    */
    CountryWarVoApi.prototype.getCountTime = function () {
        var period = this.getCurpeirod();
        var et = 0;
        // 1备战期 2战斗展示期 3战斗奖励结算
        switch (period) {
            case 1:
                et = this.basetime + this.nowturn.warTime;
                break;
            case 2:
                et = this.basetime + this.nowturn.resultTime;
                break;
            case 3:
                et = this.basetime + this.nowturn.endTime;
                break;
        }
        return et - GameData.serverTime;
    };
    CountryWarVoApi.prototype.getCountStr = function (special) {
        if (special === void 0) { special = false; }
        var str = '';
        var param = [];
        var period = this.getCurpeirod();
        //派遣阶段
        if (this.getEnermyZid() == 0) {
            str = "CountryWarCountdown_2";
        }
        else {
            if (period < 3) {
                str = special ? "CountryWarCD2Txt" + period : "CountryWarCDTxt" + period;
                if (this.getIslunkong()) {
                    str = "CountryWarCountdown_5";
                }
            }
            else {
                str = "CountryWarCountdown_6";
                if (this.getIslunkong()) {
                    str = "CountryWarCountdown_" + (this.isPlayerSerVantLevel() ? 7 : 8);
                }
            }
        }
        if (this.getIslunkong() || this.getEnermyZid() == 0) {
            param.push(App.DateUtil.getFormatBySecond(this.getCountEndTime()));
        }
        else {
            param.push(App.DateUtil.getFormatBySecond(this.getCountTime()));
        }
        return LanguageManager.getlocal(str, param);
    };
    CountryWarVoApi.prototype.getCountEndTime = function () {
        var et = this.basetime + this.nowturn.endTime;
        return et - GameData.serverTime;
    };
    /**
     *flag 是否精确到小时
    */
    CountryWarVoApi.prototype.acTimeAndHour = function (flag) {
        var st = this.basetime + this.nowturn.readyTime;
        var et = this.basetime + this.nowturn.endTime;
        if (!flag) {
            et -= 1;
        }
        return App.DateUtil.getOpenLocalTime(st, et, flag);
    };
    /**
     * 是否参加了此次战斗
     */
    CountryWarVoApi.prototype.canJoinThisWar = function () {
        var cfg = Config.CountrywarCfg;
        var flag = Api.playerVoApi.getPlayerLevel() >= cfg.unlock;
        return flag;
    };
    /**
     * 敌方服zid
     */
    CountryWarVoApi.prototype.getEnermyZid = function () {
        var zid = 0;
        if (this.info && this.info.match) {
            zid = Number(this.info.match);
        }
        return zid;
    };
    /**
     * 是否轮空
     */
    CountryWarVoApi.prototype.getIslunkong = function () {
        return this.getEnermyZid() == -1;
    };
    /**
     * 不在跨服区间内
     */
    CountryWarVoApi.prototype.isNotCross = function () {
        return this.getEnermyZid() == -2;
    };
    /**
     * 获得战斗的事件
     */
    CountryWarVoApi.prototype.getWarTime = function () {
        return this.basetime + this.nowturn.warTime;
    };
    /**
     * 本轮输赢
     */
    CountryWarVoApi.prototype.getIsWin = function () {
        var maxnum = Config.CountrywarCfg.cityNum;
        return this._winnum * 2 > maxnum;
    };
    /**
     * 城市输赢
     */
    CountryWarVoApi.prototype.getCityIsWin = function (cityId) {
        var flag = false;
        var et = this.basetime + this.nowturn.readyTime;
        if (this._history[et]) {
            var cityIndex = this.getCityIndex(cityId);
            if (this._history[et][cityIndex] > 0) {
                flag = true;
            }
        }
        return flag;
    };
    CountryWarVoApi.prototype.getCityResult = function (cityId) {
        var flag = 0;
        var et = this.basetime + this.nowturn.readyTime;
        if (this._history[et]) {
            var cityIndex = this.getCityIndex(cityId);
            flag = this._history[et][cityIndex];
        }
        return flag;
    };
    /**
     * 公告内容
     */
    CountryWarVoApi.prototype.getNotice = function () {
        var str = LanguageManager.getlocal("dinnerMsgPopupEmptyTip");
        if (this.announce.text) {
            str = this.announce.text;
        }
        return str;
    };
    CountryWarVoApi.prototype.canEditNotice = function () {
        var flag = false;
        if (Api.switchVoApi.checkCloseCountryWarEditBtn()) {
            return flag;
        }
        var cfg = Config.CountrywarCfg;
        //头像的cfg
        var titleCfg = Config.TitleCfg.getTitleCfg();
        for (var k in titleCfg) {
            var v = titleCfg[k];
            var titleVo = Api.itemVoApi.getTitleInfoVoById(Number(k));
            //自己有的戴着 并且物品栏有的 帝位、王位
            if (v.isTitle == 1 && titleVo.num > -1 && (v.titleType < 3 || v.titleType == 7)) {
                flag = true;
                break;
            }
        }
        return flag;
    };
    CountryWarVoApi.prototype.getEditCost = function () {
        var cost = 0;
        var cfg = Config.CountrywarCfg;
        var costnum = Math.min(this.info.announcetimes - cfg.announceFreeNum, cfg.announceCost.length - 1);
        if (costnum >= 0) {
            cost = cfg.announceCost[costnum];
        }
        return cost;
    };
    /*
    * 获取本日加成的门客队列
    */
    CountryWarVoApi.prototype.getServantInfo = function () {
        var arr = [];
        var cfg = Config.CountrywarCfg;
        var keys = this.info.upservant;
        var servantPool = cfg.servantPool[keys[0]];
        var rid = keys[1] - 1;
        var temp = servantPool.servantAddArr[rid];
        for (var i in temp.servant) {
            var unit = temp.servant[i];
            var servantItemCfg = Config.ServantCfg.getServantItemById(unit);
            var powerUp = temp.powerUp[i];
            if (unit) {
                arr.push({ servantItemCfg: servantItemCfg, powerUp: powerUp });
            }
        }
        return arr;
    };
    CountryWarVoApi.prototype.getServantAddPower = function (cfg) {
        var arr = [];
        for (var i in cfg.servant) {
            var unit = cfg.servant[i];
            var servantItemCfg = Config.ServantCfg.getServantItemById(unit);
            var powerUp = cfg.powerUp[i];
            if (unit) {
                arr.push({ servantItemCfg: servantItemCfg, powerUp: powerUp });
            }
        }
        return arr;
    };
    /**
     * 	本日是否 这个门客是否享受加成
     */
    CountryWarVoApi.prototype.isHaveServant = function (servantId) {
        var servantCfgList = this.getServantInfo();
        for (var i = 0; i < servantCfgList.length; i++) {
            if (servantCfgList[i].servantItemCfg.id == servantId) {
                return servantCfgList[i];
            }
        }
        return null;
    };
    /**
     * 获得门客 加成
     */
    CountryWarVoApi.prototype.getServantPower = function (servantId) {
    };
    /**
     * 获取城市组id
     */
    CountryWarVoApi.prototype.getRandCity = function () {
        this.randcity = 1;
        var rid = this.randcity - 1;
        return Config.CountrywarCfg.cityRandom[rid];
    };
    /**
     * 真实城市id转索引 1-10  => 1-5
    */
    CountryWarVoApi.prototype.getCityIndex = function (cityId) {
        var arr = this.getRandCity();
        return arr.indexOf(cityId) + 1;
    };
    CountryWarVoApi.prototype.getTeamNum = function (type) {
        var isLeft = type == 'left';
        var num = 0;
        if (isLeft) {
            num = App.MathUtil.getRandom();
        }
        else {
            num = App.MathUtil.getRandom();
        }
        return num;
    };
    /**
     * 该城市是否参与本次战斗
     */
    CountryWarVoApi.prototype.getJoinCityWar = function (cityId) {
        return this.getRandCity().indexOf(cityId) > -1;
    };
    CountryWarVoApi.prototype.setMyCityInfo = function (data) {
        this._mycityInfo = data;
    };
    CountryWarVoApi.prototype.setEnermyCityInfo = function (data) {
        this._enermycityInfo = data;
    };
    CountryWarVoApi.prototype.getCityInfo = function (cityId) {
        var cityIndex = this.getCityIndex(cityId);
        var num1 = this._mycityInfo[cityIndex] ? this._mycityInfo[cityIndex] : 0;
        var num2 = this._enermycityInfo[cityIndex] ? this._enermycityInfo[cityIndex] : 0;
        return [num1, num2];
    };
    /**
     * 本轮战斗中赢了几场
     */
    CountryWarVoApi.prototype.setHistoryInfo = function (data) {
        this._history = {};
        this._history = data;
        var et = this.basetime + this.nowturn.readyTime;
        var winnum = 0;
        if (this._history[et]) {
            var cityarr = this.getRandCity();
            for (var i in cityarr) {
                var cityIndex = Number(i) + 1;
                if (this._history[et][cityIndex] > 0) {
                    ++winnum;
                }
            }
        }
        this._winnum = winnum;
    };
    CountryWarVoApi.prototype.getWinNum = function () {
        return this._winnum;
    };
    /**
     * 本轮战斗中是否取胜
     */
    CountryWarVoApi.prototype.getThisWarWin = function () {
        return this.getIsWin() ? 1 : 2;
    };
    /** 服务器所需要的cityId 和前端用的转换 */
    CountryWarVoApi.prototype.getServerCityId = function (cityId, isSercerId) {
        for (var i = 0; i < this.getRandCity().length; i++) {
            if (isSercerId) {
                if (i == (cityId - 1)) {
                    return this.getRandCity()[i];
                }
            }
            else {
                if (this.getRandCity()[i] == cityId) {
                    return i + 1;
                }
            }
        }
    };
    /**
     * 门客数据
     */
    CountryWarVoApi.prototype.getServant = function () {
        return this.servant;
    };
    /**
     * 门客是否在休息中
     */
    CountryWarVoApi.prototype.isServantRest = function (servantId) {
        if (this.rest && this.rest[servantId]) {
            return true;
        }
        else {
            return false;
        }
    };
    /**获得撤回门客的次数 */
    CountryWarVoApi.prototype.getCancelServantTimes = function () {
        if (this.info && this.info.canceltimes) {
            return this.info.canceltimes;
        }
        return 0;
    };
    /**门客是否处于派遣 */
    CountryWarVoApi.prototype.isUseServant = function (servantId) {
        if (this.servant) {
            for (var key in this.servant) {
                if (servantId == this.servant[key].servant) {
                    return true;
                }
            }
            return false;
        }
        return false;
    };
    /**
     * 这个城又没有门客
     */
    CountryWarVoApi.prototype.isCityHaveServant = function (cityId) {
        if (this.servant[cityId]) {
            return this.servant[cityId];
        }
        return null;
    };
    /**
     * 派遣的门客信息
     */
    CountryWarVoApi.prototype.myServantInfo = function () {
        // let rid = App.MathUtil.getRandom(0,3);
        var obj = {};
        var source = this.servant;
        for (var i in source) {
            var unit = source[i];
            var cityId = Number(i);
            obj[unit.servant] = {
                cityId: this.getRandCity()[cityId - 1],
                plan: unit.stra ? unit.stra : 0
            };
        }
        return obj;
    };
    /**
     * 是否有派遣的门客
     */
    CountryWarVoApi.prototype.getEmptyServant = function () {
        var flag = false;
        if (this.isPlayerSerVantLevel()) {
            flag = Object.keys(this.servant).length < Config.CountrywarCfg.cityTotNum;
        }
        return flag;
    };
    /**
     * 是否参战成功
     */
    CountryWarVoApi.prototype.isFightSuccess = function () {
        if (Object.keys(this.servant).length > 0) {
            return true;
        }
        return false;
    };
    CountryWarVoApi.prototype.getServantCityKey = function (servantId) {
        for (var key in this.servant) {
            if (this.servant[key].servant == servantId) {
                return key;
            }
        }
        return null;
    };
    /**
     * 获得一个月及今日的配置文件
     */
    CountryWarVoApi.prototype.getOneMonthCfg = function () {
        return this.timeCfg();
    };
    /**
     * 获得小的时间段
     */
    CountryWarVoApi.prototype.timeCfg = function () {
        var timeList = this.getTimeList();
        var readyTime = Config.CountrywarCfg.readyTime;
        var startTimeTmp = 0;
        for (var key in readyTime) {
            if (GameData.serverTime > (this.basetime + readyTime[key].readyTime)) {
                startTimeTmp = this.basetime + readyTime[key].readyTime;
            }
        }
        var date = App.DateUtil.getServerDate(startTimeTmp);
        var nowMonth = date.getMonth() + 1;
        // let servantDateList:{startMonth:number,startDate:number,endMonth:number,endDate:number,week:number}[] = [];
        var servantFightInfoList = [];
        var nextServantFightInfoList = [];
        var lastServantFightInfoList = [];
        var nowServantFightInfo = null;
        var index = 0;
        for (var i = 0; i < timeList.length; i++) {
            var timeItem = timeList[i];
            for (var key in readyTime) {
                var readyTimeItem = readyTime[key];
                var startTime = timeItem.time + readyTimeItem.readyTime;
                var wartime = timeItem.time + readyTimeItem.warTime;
                var endTime = timeItem.time + readyTimeItem.endTime;
                var startDate = App.DateUtil.getServerDate(startTime);
                var endDate = App.DateUtil.getServerDate(endTime);
                var startMonth = startDate.getMonth() + 1;
                var endMonth = endDate.getMonth() + 1;
                if (startMonth == nowMonth) {
                    // let servantDate = {startMonth:startMonth,startDate:startDate.getDate(),endMonth:endMonth,endDate:endDate.getDate(),week:startDate.getDay()};
                    // servantDateList.push(servantDate);
                    var servantFightInfo = { startTime: startTime, endTime: endTime, cfg: Config.CountrywarCfg.servantPool[this.info.upservant[0]].servantAddArr[index] };
                    if (startTime <= GameData.serverTime && GameData.serverTime < endTime) {
                        nowServantFightInfo = servantFightInfo;
                    }
                    else if (endTime < GameData.serverTime) {
                        lastServantFightInfoList.unshift(servantFightInfo);
                    }
                    else if (startTime >= GameData.serverTime) {
                        nextServantFightInfoList.push(servantFightInfo);
                    }
                    index++;
                }
            }
        }
        servantFightInfoList.push(nowServantFightInfo);
        for (var i = 0; i < nextServantFightInfoList.length; i++) {
            servantFightInfoList.push(nextServantFightInfoList[i]);
        }
        for (var i = 0; i < lastServantFightInfoList.length; i++) {
            servantFightInfoList.push(lastServantFightInfoList[lastServantFightInfoList.length - 1 - i]);
        }
        return servantFightInfoList;
    };
    /**
     * 获得参战门客的总势力值
     */
    CountryWarVoApi.prototype.getAllServantPower = function () {
        var power = 0;
        for (var key in this.servant) {
            power += this.servant[key].totalattr;
        }
        return Math.floor(power);
    };
    /**
     * h获得整个大的时间段
     */
    CountryWarVoApi.prototype.getTimeList = function () {
        var timeList = [];
        var nowMonth = 0;
        var isLast = true;
        var isNext = true;
        for (var i = 0; i < 6; i++) {
            if (i == 0) {
                var nowTime = this.basetime;
                var readyTime = Config.CountrywarCfg.readyTime;
                var startTime = 0;
                for (var key in readyTime) {
                    if (GameData.serverTime > (nowTime + readyTime[key].readyTime)) {
                        startTime = nowTime + readyTime[key].readyTime;
                    }
                }
                var date = App.DateUtil.getServerDate(startTime);
                nowMonth = date.getMonth() + 1;
                var time = { time: nowTime, month: nowMonth, date: date.getDate() };
                timeList.push(time);
            }
            else {
                var lastTime = this.basetime - i * 7 * 86400;
                var lastDate = App.DateUtil.getServerDate(lastTime);
                var lastMonth = lastDate.getMonth() + 1;
                if (lastMonth <= nowMonth && isLast) {
                    var time = { time: lastTime, month: lastMonth, date: lastDate.getDate() };
                    timeList.unshift(time);
                    if (lastMonth < nowMonth) {
                        isLast = false;
                        // continue;
                    }
                }
                var nextTime = this.basetime + i * 7 * 86400;
                var nextDate = App.DateUtil.getServerDate(nextTime);
                var nextMonth = nextDate.getMonth() + 1;
                if (nextMonth >= nowMonth && isNext) {
                    var time = { time: nextTime, month: nextMonth, date: nextDate.getDate() };
                    timeList.push(time);
                    if (nextMonth > nowMonth) {
                        isNext = false;
                        // continue;
                    }
                }
            }
        }
        return timeList;
    };
    /**
     * 本月是否有门客加成
     */
    CountryWarVoApi.prototype.checkMonthServant = function (servantId) {
        var oneMonthCfg = this.getOneMonthCfg();
        for (var i = 0; i < oneMonthCfg.length; i++) {
            if (oneMonthCfg[i] && oneMonthCfg[i].cfg && oneMonthCfg[i].cfg.servant) {
                for (var j = 0; j < oneMonthCfg[i].cfg.servant.length; j++) {
                    if (servantId == oneMonthCfg[i].cfg.servant[j]) {
                        return oneMonthCfg[i];
                    }
                }
            }
        }
        return null;
    };
    CountryWarVoApi.prototype.dispose = function () {
        this.basetime = 0; // 1542124800
        this.getrewards = {};
        this.info = {};
        this.lastYm = '';
        this.lastday = 0;
        this.nowturn = {};
        this.randcity = 0;
        this.rest = {};
        this.servant = {};
        this.announce = {};
        this.init = false;
        this.reback = false;
        this.result = false;
        _super.prototype.dispose.call(this);
    };
    return CountryWarVoApi;
}(BaseVoApi));
__reflect(CountryWarVoApi.prototype, "CountryWarVoApi");
//# sourceMappingURL=CountryWarVoApi.js.map