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
var AcChessVo = (function (_super) {
    __extends(AcChessVo, _super);
    function AcChessVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.map = {
            arr: null,
        };
        _this.rankInfo = { merank: 0, mepoint: 0, rank: {} };
        _this.isfree = 0;
        _this.checkerboard = 1;
        _this.slimit = 0;
        return _this;
    }
    AcChessVo.prototype.initData = function (data) {
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
    Object.defineProperty(AcChessVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcChessVo.prototype, "isShowRedDot", {
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
            if (this.isCangetChargeReward() || this.isCangetAchieveReward() || this.isShowTaskRewardRedDot()) {
                return true;
            }
            if (this.isfree > 0) {
                return true;
            }
            if (this.showExchangeDot()) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcChessVo.prototype.showExchangeDot = function () {
        var str = this.cfg.change.needItem;
        var itemCfg = Config.ItemCfg.getItemCfgById(str.split("_")[1]);
        var have = Api.itemVoApi.getItemNumInfoVoById(itemCfg.id);
        var need = parseInt(str.split("_")[2]);
        return have >= need;
    };
    Object.defineProperty(AcChessVo.prototype, "acCountDown", {
        get: function () {
            var et = this.et - (this.config.extraTime || 0) * 86400;
            if (et < GameData.serverTime) {
                return LanguageManager.getlocal("acChess_timeEnd");
            }
            return LanguageManager.getlocal("acChess_timeCount", [App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1)]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcChessVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et;
            if (this.config && this.config.extraTime) {
                et = this.et - this.config.extraTime * 86400;
            }
            return LanguageManager.getlocal("acChess_time", [App.DateUtil.getOpenLocalTime(this.st, et, true)]);
        },
        enumerable: true,
        configurable: true
    });
    AcChessVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    //任务
    AcChessVo.prototype.getSortTaskCfg = function () {
        var data = this.cfg.getTaskCfg();
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
    AcChessVo.prototype.getSortRechargeCfg = function () {
        var rechargeData = this.cfg.getRechargeCfg();
        for (var i = 0; i < rechargeData.length; i++) {
            if (this.isGetRechargeById(String(rechargeData[i].id))) {
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
    AcChessVo.prototype.getSortAchievementCfg = function (sort) {
        if (sort === void 0) { sort = true; }
        var data = this.cfg.getAchieveCfg();
        for (var i = 0; i < data.length; i++) {
            if (this.isGetAchievementById(String(data[i].id))) {
                data[i].sortId = data.length + Number(data[i].id);
            }
            else if (this.getProcess() >= data[i].needNum) {
                data[i].sortId = (Number(data[i].id)) - data.length - 1;
            }
            else {
                data[i].sortId = Number(data[i].id);
            }
        }
        if (sort) {
            data.sort(function (a, b) { return a.sortId - b.sortId; });
        }
        else {
            data.sort(function (a, b) { return a.needNum - b.needNum; });
        }
        return data;
    };
    //任务是否已完成
    AcChessVo.prototype.isGetTaskById = function (fid, sid) {
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
    AcChessVo.prototype.getTaskNumByType = function (fid, sid) {
        // if (this.task && this.task.v && this.task.v[type]){
        //     return this.task.v[type];
        // }
        // return 0;
        if (this.task && this.task[fid] && this.task[fid][sid]) {
            return this.task[fid][sid]["v"];
        }
        return 0;
    };
    AcChessVo.prototype.getFNum = function (fid) {
        var data = this.cfg.getTaskCfg();
        var count = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].fid == fid) {
                count++;
            }
        }
        return count;
    };
    //是否显示任务奖励红点
    AcChessVo.prototype.isShowTaskRewardRedDot = function () {
        var data = this.cfg.getTaskCfg();
        for (var i = 0; i < data.length; i++) {
            if (this.isGetTaskById(data[i].fid, data[i].sid) == false && this.getTaskNumByType(data[i].fid, data[i].sid) >= data[i].value) {
                return true;
            }
        }
        return false;
    };
    //是否有可领取充值奖励
    AcChessVo.prototype.isCangetChargeReward = function () {
        var data = this.cfg.getRechargeCfg();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetRechargeById(String(data[i].id))) {
                if (this.getChargeNum() >= data[i].needGem) {
                    return true;
                }
            }
        }
        return false;
    };
    //是否有可领取进度奖励
    AcChessVo.prototype.isCangetAchieveReward = function () {
        var data = this.cfg.getAchieveCfg();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetAchievementById(String(data[i].id))) {
                if (this.getProcess() >= data[i].needNum) {
                    return true;
                }
            }
        }
        return false;
    };
    //是否已领取充值奖励
    AcChessVo.prototype.isGetRechargeById = function (id) {
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]) {
            return true;
        }
        return false;
    };
    //是否已领取进度奖励
    AcChessVo.prototype.isGetAchievementById = function (id) {
        if (this.rewards && this.rewards[id]) {
            return true;
        }
        return false;
    };
    //充值元宝数
    AcChessVo.prototype.getChargeNum = function () {
        if (this.rinfo && this.rinfo.v) {
            return this.rinfo.v;
        }
        return 0;
    };
    //当前分数
    AcChessVo.prototype.getProcess = function () {
        return this.ainfo.v;
    };
    AcChessVo.prototype.getTimes = function () {
        return this.v;
    };
    AcChessVo.prototype.getFree = function () {
        return this.isfree;
    };
    AcChessVo.prototype.getNeedMoney2 = function () {
        var dataList = this.getSortRechargeCfg();
        for (var i = 0; i < dataList.length; i++) {
            var strArr = dataList[i].getReward.split("|");
            for (var j = 0; j < strArr.length; j++) {
                if (strArr[j].split("_")[1] == String(this.cfg.show2)) {
                    return dataList[i].needGem;
                }
            }
        }
        return 0;
    };
    AcChessVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcChessVo;
}(AcBaseVo));
__reflect(AcChessVo.prototype, "AcChessVo");
//# sourceMappingURL=AcChessVo.js.map