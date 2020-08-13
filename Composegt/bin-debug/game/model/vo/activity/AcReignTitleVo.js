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
var AcReignTitleVo = (function (_super) {
    __extends(AcReignTitleVo, _super);
    function AcReignTitleVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //第几次获取头像
        _this.getnum = null;
        //文字数量信息{"1":1}
        _this.titleinfo = null;
        //任务信息  {'day1'={"1":1}}{第1天={任务类型=进度}}
        _this.taskinfo = null;
        //阶段奖励信息  {'day1'={"1":1}}{第1天={id=领取}}
        _this.flags = null;
        _this.reignTitle = null;
        _this.showHand = null;
        return _this;
    }
    AcReignTitleVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REIGNTITLE_REFRESHVO);
    };
    Object.defineProperty(AcReignTitleVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcReignTitleVo.prototype.ifSendFirst = function () {
        return this.reignTitle == 1;
    };
    AcReignTitleVo.prototype.checkShowHand = function () {
        return this.showHand != 1;
    };
    Object.defineProperty(AcReignTitleVo.prototype, "isShowRedDot", {
        get: function () {
            var canChange = this.canChange();
            if (canChange) {
                return true;
            }
            for (var i = 1; i <= 4; i++) {
                var result = this.canCollectTask(i);
                if (result) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcReignTitleVo.prototype.canCollectTask = function (day) {
        var curDay = this.getCurDay();
        var dayTaskList = this.cfg["dayTask" + day];
        for (var key in dayTaskList) {
            var itemData = dayTaskList[key];
            var value = 0;
            if (this.taskinfo["day" + day] && this.taskinfo["day" + day][String(itemData.questType)]) {
                value = this.taskinfo["day" + day] && this.taskinfo["day" + day][String(itemData.questType)];
            }
            var collect = 0;
            var flags = this.flags;
            if (flags["day" + day] && flags["day" + day][String(Number(key) + 1)]) {
                collect = flags["day" + day][String(Number(key) + 1)];
            }
            if (itemData.questType == 1001) {
                if (curDay < day) {
                    // status = 0;
                }
                else {
                    if (value >= itemData.value) {
                        if (collect == 1) {
                            // status = 3;
                        }
                        else {
                            // status = 2;
                            return true;
                        }
                    }
                }
            }
            else {
                //0 未开启，1 跳转 / 未达成，2 可领取，3已经领取，4补领  
                if (curDay < day) {
                    // status = 0;
                }
                else if (curDay > day) {
                    if (value >= itemData.value) {
                        if (collect == 1) {
                            // status = 3;
                        }
                        else {
                            // status = 2;
                            return true;
                        }
                    }
                }
                else {
                    if (value >= itemData.value) {
                        if (collect == 1) {
                            // status = 3;
                        }
                        else {
                            // status = 2;
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };
    //可以兑换头像
    AcReignTitleVo.prototype.canChange = function () {
        var needCount = this.cfg.reignTitleLevelNeed[this.getnum];
        var itemCount1 = this.titleinfo["1"] == null ? 0 : this.titleinfo["1"];
        var itemCount2 = this.titleinfo["2"] == null ? 0 : this.titleinfo["2"];
        var itemCount3 = this.titleinfo["3"] == null ? 0 : this.titleinfo["3"];
        var itemCount4 = this.titleinfo["4"] == null ? 0 : this.titleinfo["4"];
        if (itemCount1 >= needCount && itemCount2 >= needCount && itemCount3 >= needCount && itemCount4 >= needCount) {
            return true;
        }
        else {
            return false;
        }
    };
    AcReignTitleVo.prototype.getCurDay = function () {
        var curDay = 1;
        var acSt = App.DateUtil.getWeeTs(this.st);
        var todaySt = App.DateUtil.getWeeTs(GameData.serverTime);
        curDay = (todaySt - acSt) / 86400 + 1;
        return curDay;
    };
    AcReignTitleVo.prototype.getUnlockTimeStr = function (day) {
        // let deltaT = this.acVo.et - GameData.serverTime;
        var curDay = this.getCurDay();
        if (curDay < day) {
            //未解锁
            var acSt = App.DateUtil.getWeeTs(this.st);
            var unlockSt = App.DateUtil.getWeeTs(acSt + 86400 * (day - 1));
            var deltaT = unlockSt - GameData.serverTime;
            return App.DateUtil.getFormatBySecond(deltaT, 8);
        }
        else {
            return null;
        }
    };
    AcReignTitleVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    AcReignTitleVo.prototype.isAcTimeOut = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    AcReignTitleVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcReignTitleVo;
}(AcBaseVo));
__reflect(AcReignTitleVo.prototype, "AcReignTitleVo");
