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
var AcFindSameVo = (function (_super) {
    __extends(AcFindSameVo, _super);
    function AcFindSameVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.map = {
            arr: null,
        };
        _this.rankInfo = { merank: 0, mepoint: 0, rank: {} };
        _this.isfree = 0;
        return _this;
    }
    AcFindSameVo.prototype.initData = function (data) {
        console.log("AcLinkgameVo:init", data);
        for (var key in data) {
            if (key == "map") {
                this.map.arr = data[key];
                continue;
            }
            this[key] = data[key];
            if (key == "ainfo") {
                this.rewards = data[key]["flags"];
            }
        }
        App.MessageHelper.dispatchEvent("1234567");
    };
    AcFindSameVo.prototype.setRankInfo = function (data) {
        this.rankInfo = {
            merank: data.merank,
            rank: data.rank,
            mepoint: data.mepoint
        };
    };
    Object.defineProperty(AcFindSameVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcFindSameVo.prototype, "isShowRedDot", {
        get: function () {
            // if (this.checkIsInEndShowTime()) {
            // 	return false; // 到展示期了
            // } else if (this.firstOpen != 1) { // 今日还没有打开过活动
            // 	return true;
            // } else if (this.inGaming()) { // 正在进行游戏中
            // 	return true;
            // } else if (this.anum < this.cfg.playtime && this.point >= this.getCurGameIndex() * this.cfg.livenessNeed){ // 有次数且活跃够
            // 	return true;
            // }
            // return false;
            return this.isCangetChargeReward() || this.isCangetAchieveReward() || this.isShowTaskRewardRedDot();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcFindSameVo.prototype, "acCountDown", {
        get: function () {
            var et = this.et - (this.config.extraTime || 0) * 86400;
            if (et < GameData.serverTime) {
                return LanguageManager.getlocal("findsame_timeEnd");
            }
            return LanguageManager.getlocal("findsame_timeCount", [App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1)]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcFindSameVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et;
            if (this.config && this.config.extraTime) {
                et = this.et - this.config.extraTime * 86400;
            }
            return LanguageManager.getlocal("findsame_time", [App.DateUtil.getOpenLocalTime(this.st, et, true)]);
        },
        enumerable: true,
        configurable: true
    });
    AcFindSameVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    /** 今日剩余次数 */
    AcFindSameVo.prototype.getCount = function () {
        if (this.inGaming()) {
            return this.cfg.playtime - this.anum + 1;
        }
        else {
            return this.cfg.playtime - this.anum;
        }
    };
    /** 是否正在游戏中 */
    AcFindSameVo.prototype.inGaming = function () {
        if (this.map && this.map.arr && Object.keys(this.map.arr).length > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    /** 将要进行的，或正在进行的，是玩家今天第几次游戏 */
    AcFindSameVo.prototype.getCurGameIndex = function () {
        if (this.inGaming()) {
            return this.anum;
        }
        else {
            return this.anum + 1;
        }
    };
    /** 扫描，找到能连接的 */
    AcFindSameVo.prototype.scanForLink = function () {
        for (var i1 = 0; i1 < Object.keys(this.map.arr).length; i1++) {
            var pos1 = parseInt(Object.keys(this.map.arr)[i1]);
            for (var i2 = 0; i2 < Object.keys(this.map.arr).length; i2++) {
                var pos2 = parseInt(Object.keys(this.map.arr)[i2]);
                var p1 = { x: pos1 % this.cfg.GRID_WIDTH, y: Math.floor(pos1 / this.cfg.GRID_WIDTH) };
                var p2 = { x: pos2 % this.cfg.GRID_WIDTH, y: Math.floor(pos2 / this.cfg.GRID_WIDTH) };
                var ret = this.checkLink(p1, p2);
                if (ret) {
                    return [p1, p2];
                }
            }
        }
        return false; // 没找到（需要后端重置了）
    };
    /** 检测两个点是否可以连接（是否可消除）*/
    AcFindSameVo.prototype.checkLink = function (p1, p2) {
        // 两个点是同一个点，不能消除
        if (p1.x == p2.x && p1.y == p2.y) {
            return false;
        }
        // 两个点，不是同一个物品，不能消除
        if (this.map.arr[p1.x + p1.y * this.cfg.GRID_WIDTH] != this.map.arr[p2.x + p2.y * this.cfg.GRID_WIDTH]) {
            return false;
        }
        // 转折点数组
        var t1Arr = [];
        var t2Arr = [];
        t1Arr.push(p1);
        for (var x = p1.x - 1; x >= 0; x--) {
            var p = { x: x, y: p1.y };
            if (this.checkEmpty(p)) {
                t1Arr.push(p);
            }
            else {
                break;
            }
        }
        for (var x = p1.x + 1; x < this.cfg.GRID_WIDTH; x++) {
            var p = { x: x, y: p1.y };
            if (this.checkEmpty(p)) {
                t1Arr.push(p);
            }
            else {
                break;
            }
        }
        for (var y = p1.y - 1; y >= 0; y--) {
            var p = { x: p1.x, y: y };
            if (this.checkEmpty(p)) {
                t1Arr.push(p);
            }
            else {
                break;
            }
        }
        for (var y = p1.y + 1; y < this.cfg.GRID_HEIGHT; y++) {
            var p = { x: p1.x, y: y };
            if (this.checkEmpty(p)) {
                t1Arr.push(p);
            }
            else {
                break;
            }
        }
        t2Arr.push(p2);
        for (var x = p2.x - 1; x >= 0; x--) {
            var p = { x: x, y: p2.y };
            if (this.checkEmpty(p)) {
                t2Arr.push(p);
            }
            else {
                break;
            }
        }
        for (var x = p2.x + 1; x < this.cfg.GRID_WIDTH; x++) {
            var p = { x: x, y: p2.y };
            if (this.checkEmpty(p)) {
                t2Arr.push(p);
            }
            else {
                break;
            }
        }
        for (var y = p2.y - 1; y >= 0; y--) {
            var p = { x: p2.x, y: y };
            if (this.checkEmpty(p)) {
                t2Arr.push(p);
            }
            else {
                break;
            }
        }
        for (var y = p2.y + 1; y < this.cfg.GRID_HEIGHT; y++) {
            var p = { x: p2.x, y: y };
            if (this.checkEmpty(p)) {
                t2Arr.push(p);
            }
            else {
                break;
            }
        }
        for (var t1Index = 0; t1Index < t1Arr.length; t1Index++) {
            var t1 = t1Arr[t1Index];
            for (var t2Index = 0; t2Index < t2Arr.length; t2Index++) {
                var t2 = t2Arr[t2Index];
                if (this.checkTwoPointOneLine(t1, t2)) {
                    return [t1, t2];
                }
            }
        }
        return false;
    };
    // 判断一个位置是不是空的
    AcFindSameVo.prototype.checkEmpty = function (p) {
        if (this.map.arr[p.x + p.y * this.cfg.GRID_WIDTH]) {
            return false;
        }
        else {
            return true;
        }
    };
    // 检测两个点是否可以相连（直线相连）(p1的xy都不大于p2的xy，且p1p2的xy，至少有一个是相同的)
    AcFindSameVo.prototype.checkTwoPointOneLine = function (p1, p2) {
        var pos1;
        var pos2;
        if (p1.x == p2.x) {
            if (p1.y > p2.y) {
                pos1 = p2;
                pos2 = p1;
            }
            else {
                pos1 = p1;
                pos2 = p2;
            }
        }
        else if (p1.y == p2.y) {
            if (p1.x > p2.x) {
                pos1 = p2;
                pos2 = p1;
            }
            else {
                pos1 = p1;
                pos2 = p2;
            }
        }
        else {
            return false;
        }
        if (!pos1) {
            console.log("not pos1");
        }
        if (pos1.x == pos2.x) {
            // x相同
            for (var y = pos1.y + 1; y <= pos2.y - 1; y++) {
                if (!this.checkEmpty({ x: pos1.x, y: y })) {
                    return false;
                }
            }
        }
        else {
            // y相同
            for (var x = pos1.x + 1; x <= pos2.x - 1; x++) {
                if (!this.checkEmpty({ x: x, y: pos1.y })) {
                    return false;
                }
            }
        }
        return true;
    };
    AcFindSameVo.prototype.getAvgConfig = function () {
        return this.cfg.getDialogByBuildId();
    };
    //任务
    AcFindSameVo.prototype.getSortTaskCfg = function () {
        var data = this.cfg.getTaskList();
        var obj = {};
        for (var i = 0; i < data.length; i++) {
            if (obj[data[i].fid]) {
                if (this.isGetTaskById(obj[data[i].fid].fid, obj[data[i].fid].sid)) {
                    obj[data[i].fid] = data[i];
                }
            }
            else {
                obj[data[i].fid] = data[i];
            }
            if (this.isGetTaskById(data[i].fid, data[i].sid)) {
                data[i].sortId = data.length + Number(data[i].id);
            }
            else if (this.getTaskNumByType(data[i].fid, data[i].sid) >= data[i].value) {
                data[i].sortId = (Number(data[i].id)) - data.length - 1;
            }
            else {
                data[i].sortId = Number(data[i].id);
            }
        }
        var arr = [];
        for (var item in obj) {
            if (this.isGetTaskById(obj[item].fid, obj[item].sid)) {
                obj[item].sordId = 2;
            }
            else if (this.getTaskNumByType(obj[item].fid, obj[item].sid) >= obj[item].value) {
                obj[item].sortId = 1;
            }
            else {
                obj[item].sortId = 0;
            }
            arr.push(obj[item]);
        }
        arr.sort(function (a, b) {
            if (a.sortId != b.sortId) {
                return b.sortId - a.sortId;
            }
            else {
                return b.id - a.id;
            }
        });
        return arr;
    };
    //获得充值奖励的配置
    AcFindSameVo.prototype.getSortRechargeCfg = function () {
        var rechargeData = this.cfg.getRechargeList();
        for (var i = 0; i < rechargeData.length; i++) {
            if (this.isGetRechargeById(rechargeData[i].id)) {
                rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
            }
            else if (this.getChargeNum() >= rechargeData[i].needGem) {
                rechargeData[i].sortId = (Number(rechargeData[i].id)) - rechargeData.length - 1;
            }
            else {
                rechargeData[i].sortId = Number(rechargeData[i].id);
            }
        }
        rechargeData.sort(function (a, b) { return a.sortId - b.sortId; });
        return rechargeData;
    };
    //进度奖励
    AcFindSameVo.prototype.getSortAchievementCfg = function () {
        var data = this.cfg.getAchievementList();
        for (var i = 0; i < data.length; i++) {
            if (this.isGetAchievementById(data[i].id)) {
                data[i].sortId = data.length + Number(data[i].id);
            }
            else if (this.getProcess() >= data[i].needNum) {
                data[i].sortId = (Number(data[i].id)) - data.length - 1;
            }
            else {
                data[i].sortId = Number(data[i].id);
            }
        }
        data.sort(function (a, b) { return a.sortId - b.sortId; });
        return data;
    };
    //任务是否已完成
    AcFindSameVo.prototype.isGetTaskById = function (fid, sid) {
        // if (this.task && this.task.flags && this.task.flags[id])
        // {
        //     return true;
        // }
        if (this.task && this.task[fid] && this.task[fid][sid] && this.task[fid][sid]["f"]) {
            return true;
        }
        return false;
    };
    //任务完成数量
    AcFindSameVo.prototype.getTaskNumByType = function (fid, sid) {
        // if (this.task && this.task.v && this.task.v[type]){
        //     return this.task.v[type];
        // }
        // return 0;
        if (this.task && this.task[fid] && this.task[fid][sid]) {
            return this.task[fid][sid]["v"];
        }
        return 0;
    };
    AcFindSameVo.prototype.getFNum = function (fid) {
        var data = this.cfg.getTaskList();
        var count = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].fid == fid) {
                count++;
            }
        }
        return count;
    };
    //是否显示任务奖励红点
    AcFindSameVo.prototype.isShowTaskRewardRedDot = function () {
        var data = this.cfg.getTaskList();
        for (var i = 0; i < data.length; i++) {
            if (this.isGetTaskById(data[i].fid, data[i].sid) == false && this.getTaskNumByType(data[i].fid, data[i].sid) >= data[i].value) {
                return true;
            }
        }
        return false;
    };
    //是否有可领取充值奖励
    AcFindSameVo.prototype.isCangetChargeReward = function () {
        var data = this.cfg.getRechargeList();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetRechargeById(data[i].id)) {
                if (this.getChargeNum() >= data[i].needGem) {
                    return true;
                }
            }
        }
        return false;
    };
    //是否有可领取进度奖励
    AcFindSameVo.prototype.isCangetAchieveReward = function () {
        var data = this.cfg.getAchievementList();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetAchievementById(data[i].id)) {
                if (this.getProcess() >= data[i].needNum) {
                    return true;
                }
            }
        }
        return false;
    };
    //是否已领取充值奖励
    AcFindSameVo.prototype.isGetRechargeById = function (id) {
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]) {
            return true;
        }
        return false;
    };
    //是否已领取进度奖励
    AcFindSameVo.prototype.isGetAchievementById = function (id) {
        if (this.rewards && this.rewards[id]) {
            return true;
        }
        return false;
    };
    //充值元宝数
    AcFindSameVo.prototype.getChargeNum = function () {
        if (this.rinfo && this.rinfo.v) {
            return this.rinfo.v;
        }
        return 0;
    };
    //当前分数
    AcFindSameVo.prototype.getProcess = function () {
        return this.ainfo.v;
    };
    AcFindSameVo.prototype.getTimes = function () {
        return this.v;
    };
    AcFindSameVo.prototype.getFree = function () {
        return this.isfree;
    };
    AcFindSameVo.prototype.getNeedMoney1 = function () {
        var rechargeData = this.cfg.getRechargeList();
        if (rechargeData && rechargeData.length > 0) {
            for (var i = 0; i < rechargeData.length; i++) {
                var rewards = rechargeData[i].getReward.split("|");
                for (var key in rewards) {
                    var id = rewards[key].split("_")[1];
                    var itemCfg = Config.ItemCfg.getItemCfgById(id);
                    if (itemCfg) {
                        if (itemCfg.getRewards && itemCfg.getRewards.split("_")[1] && itemCfg.getRewards.split("_")[1] == String(this.cfg.show1)) {
                            return rechargeData[i].needGem;
                        }
                    }
                }
            }
        }
        return 0;
    };
    AcFindSameVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcFindSameVo;
}(AcBaseVo));
__reflect(AcFindSameVo.prototype, "AcFindSameVo");
//# sourceMappingURL=AcFindSameVo.js.map