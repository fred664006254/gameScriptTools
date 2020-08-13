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
 * 珍器坊api
 * author shaoliang & qianjun
 * date 2019/7/22
 */
var ZhenqifangVoApi = (function (_super) {
    __extends(ZhenqifangVoApi, _super);
    function ZhenqifangVoApi() {
        var _this = _super.call(this) || this;
        _this.selIdx = 0;
        _this.freshlist = false;
        _this.freshfriendlist = false;
        _this.freshshop = false;
        _this.sendList = [];
        _this.friendsendList = {};
        _this.friendobj = {};
        _this.otherinfo = null;
        return _this;
    }
    Object.defineProperty(ZhenqifangVoApi.prototype, "ZhenqifangLevel", {
        get: function () {
            return this.zhenqifangVo.level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZhenqifangVoApi.prototype, "ZhenqifangTaskFreshTime", {
        get: function () {
            return this.zhenqifangVo.freeitask;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZhenqifangVoApi.prototype, "curBuildExp", {
        get: function () {
            return this.zhenqifangVo.exp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZhenqifangVoApi.prototype, "curFreeNum", {
        get: function () {
            return this.zhenqifangVo.freefresh;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZhenqifangVoApi.prototype, "curTaskNum", {
        get: function () {
            var num = 0;
            var task = this.zhenqifangVo.itask;
            if (task && task.length) {
                num = task.length;
            }
            return num;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZhenqifangVoApi.prototype, "curFTaskNum", {
        get: function () {
            var num = 0;
            var task = this.zhenqifangVo.ftask;
            if (task && task.length) {
                num = task.length;
            }
            return num;
        },
        enumerable: true,
        configurable: true
    });
    ZhenqifangVoApi.prototype.getCurTaskarr = function () {
        var task = this.zhenqifangVo.itask;
        var cfg = Config.ZhenqifangCfg;
        var arr = [];
        if (task && task.length) {
            for (var i in task) {
                var unit = task[i];
                if (unit) {
                    arr.push({
                        friend: 0,
                        type: unit.quality,
                        data: cfg.indivT[unit.quality][unit.taskId],
                        st: unit.start,
                        svtInfo: unit.svtInfo,
                        taskId: unit.taskId,
                        getReward: unit.getReward,
                        cts: unit.cts,
                        time: unit.time,
                        first: unit.first,
                    });
                }
            }
        }
        //任务数量
        var level = this.ZhenqifangLevel;
        var curcfg = cfg.getTaskHouseCfgByLevel(level);
        if (arr.length < curcfg.taskSlotIndiv) {
            arr.push({
                empty: true
            });
        }
        return arr;
    };
    ZhenqifangVoApi.prototype.getCurFTaskarr = function () {
        var task = this.zhenqifangVo.ftask;
        var cfg = Config.ZhenqifangCfg;
        var arr = [];
        if (task && task.length) {
            for (var i in task) {
                var unit = task[i];
                if (unit) {
                    arr.push({
                        friend: 1,
                        type: unit.quality,
                        data: cfg.fridT[unit.quality][unit.taskId],
                        st: unit.start,
                        svtInfo: unit.svtInfo,
                        taskId: unit.taskId,
                        getReward: unit.getReward,
                        cts: unit.cts,
                        time: unit.time,
                        index: unit.index
                    });
                }
            }
        }
        return arr;
    };
    ZhenqifangVoApi.prototype.haveInBuzhen = function (servantid, isfriend, uid) {
        if (isfriend === void 0) { isfriend = false; }
        if (uid === void 0) { uid = 0; }
        var task = [];
        for (var i in this.zhenqifangVo.itask) {
            task.push(this.zhenqifangVo.itask[i]);
        }
        // for(let i in this.zhenqifangVo.ftask){
        // 	task.push(this.zhenqifangVo.ftask[i]);
        // }
        if (task) {
            for (var i in task) {
                var unit = task[i];
                if (unit.svtInfo) {
                    for (var j in unit.svtInfo) {
                        var tmp = unit.svtInfo[j];
                        if (isfriend) {
                            // if(tmp.sid && Number(tmp.sid) == Number(servantid) && tmp.friend == 1 && tmp.uid == uid){
                            // 	return true;
                            // }
                        }
                        else {
                            if (tmp.sid && Number(tmp.sid) == Number(servantid)) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    };
    ZhenqifangVoApi.prototype.getShopNum = function (id) {
        var num = 0;
        if (this.zhenqifangVo.shop && this.zhenqifangVo.shop[id]) {
            num = this.zhenqifangVo.shop[id];
        }
        return num;
    };
    ZhenqifangVoApi.prototype.getFriendSupportTimes = function (uid) {
        var num = 0;
        if (this.zhenqifangVo.friend && this.zhenqifangVo.friend[uid]) {
            num = this.zhenqifangVo.friend[uid];
        }
        return num;
    };
    ZhenqifangVoApi.prototype.checkNpcMessage = function () {
        var flag = false;
        if (Api.switchVoApi.checkZhenQiFangOpen() && this.isShowNpc()) {
            //任务满了没
            if (this.getTaskMax(1) || this.getTaskMax(2)) {
                flag = true;
            }
            //可领取的
            if (this.getRedPoint(1) || this.getRedPoint(2)) {
                flag = true;
            }
        }
        return flag;
    };
    ZhenqifangVoApi.prototype.getTaskMax = function (tasktype) {
        var flag = false;
        var level = this.ZhenqifangLevel;
        var curcfg = Config.ZhenqifangCfg.getTaskHouseCfgByLevel(level);
        var tasknum = tasktype == 1 ? this.curTaskNum : this.curFTaskNum;
        var taskmax = tasktype == 1 ? curcfg.taskSlotIndiv : curcfg.taskSlotFid;
        var insend = 0;
        var task = tasktype == 1 ? this.zhenqifangVo.itask : this.zhenqifangVo.ftask;
        for (var i in task) {
            var unit = task[i];
            if (unit.start > 0) {
                ++insend;
            }
        }
        if (insend < task.length) {
            if (tasktype == 1) {
                var servantlist = Api.servantVoApi.getServantInfoListWithSort(1);
                if ((servantlist.length - insend * 5) >= 5) {
                    flag = true;
                }
            }
            else {
                flag = true;
            }
        }
        return flag;
    };
    ZhenqifangVoApi.prototype.isShowNpc = function () {
        // return true;
        if (Config.ServantweaponCfg.lvNeed <= Api.playerVoApi.getPlayerLevel()) {
            return true;
        }
        return false;
    };
    ZhenqifangVoApi.prototype.getRedPoint = function (tasktype) {
        //1个人 2好友
        var flag = false;
        //领奖
        var task = tasktype == 1 ? this.zhenqifangVo.itask : this.zhenqifangVo.ftask;
        for (var i in task) {
            var unit = task[i];
            var cfg = Config.ZhenqifangCfg.getTaskCfgById(unit.quality, unit.taskId);
            var num = unit.start + unit.time - GameData.serverTime;
            if (num <= 0 && unit.start > 0) {
                flag = true;
                break;
            }
        }
        //有任务可以做
        if (this.getTaskMax(tasktype)) {
            flag = true;
        }
        return flag;
    };
    ZhenqifangVoApi.prototype.canGetTakReward = function (tasktype) {
        //1个人 2好友
        var flag = false;
        //领奖
        var task = tasktype == 1 ? this.zhenqifangVo.itask : this.zhenqifangVo.ftask;
        for (var i in task) {
            var unit = task[i];
            var cfg = Config.ZhenqifangCfg.getTaskCfgById(unit.quality, unit.taskId);
            var num = unit.start + unit.time - GameData.serverTime;
            if (num <= 0 && unit.start > 0) {
                flag = true;
                break;
            }
        }
        return flag;
    };
    ZhenqifangVoApi.prototype.getTaskData = function (friend, idx) {
        var arr = friend ? this.getCurFTaskarr() : this.getCurTaskarr();
        return arr[idx];
    };
    ZhenqifangVoApi.prototype.getInitial = function () {
        var flag = false;
        if (this.zhenqifangVo && this.zhenqifangVo.info && this.zhenqifangVo.info.initialGuide && this.zhenqifangVo.info.initialGuide == 1) {
            flag = true;
        }
        return flag;
    };
    ZhenqifangVoApi.prototype.getFriendHistoryList = function () {
        var obj = null;
        if (this.zhenqifangVo && this.zhenqifangVo.info && this.zhenqifangVo.info.historySlist) {
            for (var i in this.zhenqifangVo.info.historySlist) {
                var list = this.zhenqifangVo.info.historySlist[i];
                var isdelete = false;
                for (var j in list) {
                    var unit = list[j];
                    unit.id = unit.sid;
                    if (!Api.friendVoApi.isFriendByUid(unit.uid) && !Api.friendVoApi.isSadunByUid(unit.uid)) {
                        isdelete = true;
                        break;
                    }
                }
                if (!isdelete) {
                    if (!obj) {
                        obj = {};
                    }
                    obj[i] = list;
                }
            }
        }
        return obj;
    };
    ZhenqifangVoApi.prototype.getIsInFuidUseList = function (uid) {
        var flag = false;
        if (this.zhenqifangVo && this.zhenqifangVo.info && this.zhenqifangVo.info.fuidInUse && this.zhenqifangVo.info.fuidInUse[uid]) {
            flag = true;
        }
        return flag;
    };
    //管家一键处理
    ZhenqifangVoApi.prototype.getBatchTaskObject = function () {
        var servantObj = {};
        var taskArray = this.getCurTaskarr();
        var canselectservant = [];
        var haveservant = [];
        for (var i = 0; i < taskArray.length; i++) {
            var oneTask = taskArray[i];
            if (oneTask.svtInfo) {
                var arr = oneTask.svtInfo;
                for (var k in arr) {
                    if (arr[Number(k)].sid) {
                        haveservant.push(Number(arr[Number(k)].sid));
                    }
                }
            }
        }
        var servantlist = Api.servantVoApi.getServantInfoListWithSort(1);
        for (var i in servantlist) {
            var sid = Number(servantlist[i].servantId);
            if (haveservant.indexOf(sid) == -1) {
                canselectservant.push(sid);
            }
        }
        // let servantIdx:number = 0;
        for (var i = 0; i < taskArray.length; i++) {
            var oneTask = taskArray[i];
            if (oneTask.st == 0) {
                if (canselectservant.length >= oneTask.svtInfo.length) {
                    var idArry = [];
                    var _loop_1 = function (j) {
                        /**
                         * note:"total"
                           requirement:3500000
                         */
                        var oneSvtInfo = oneTask.svtInfo[j];
                        var tmp = [];
                        if (oneSvtInfo.note) {
                            for (var i_1 in canselectservant) {
                                var info = Api.servantVoApi.getServantObj(canselectservant[i_1]);
                                if (info[oneSvtInfo.note] >= oneSvtInfo.requirement) {
                                    tmp.push(canselectservant[i_1]);
                                }
                            }
                            if (tmp.length) {
                                tmp.sort(function (a, b) {
                                    var infoa = Api.servantVoApi.getServantObj(a);
                                    var infob = Api.servantVoApi.getServantObj(b);
                                    return infoa[oneSvtInfo.note] - infob[oneSvtInfo.note];
                                });
                            }
                            else {
                                canselectservant.sort(function (a, b) {
                                    var infoa = Api.servantVoApi.getServantObj(a);
                                    var infob = Api.servantVoApi.getServantObj(b);
                                    return infoa[oneSvtInfo.note] - infob[oneSvtInfo.note];
                                });
                            }
                        }
                        else {
                            canselectservant.sort(function (a, b) {
                                var infoa = Api.servantVoApi.getServantObj(a);
                                var infob = Api.servantVoApi.getServantObj(b);
                                return infoa.total - infob.total;
                            });
                        }
                        var sid = tmp.length ? tmp[0] : canselectservant[0];
                        canselectservant.splice(canselectservant.indexOf(sid), 1);
                        idArry.push({ sid: String(sid) });
                        // idArry.push({sid:String(canselectservant[servantIdx+j])});
                    };
                    for (var j = 0; j < oneTask.svtInfo.length; j++) {
                        _loop_1(j);
                    }
                    servantObj[i + 1] = idArry;
                    // servantIdx+=oneTask.svtInfo.length;
                }
            }
        }
        return servantObj;
    };
    ZhenqifangVoApi.prototype.getBatchTaskObject2 = function () {
        var servantObj = {};
        var canselectservant = [];
        var historylist = Api.zhenqifangVoApi.getFriendHistoryList();
        var haveservant = [];
        var taskArray = this.getCurFTaskarr();
        for (var i = 0; i < taskArray.length; i++) {
            var oneTask = taskArray[i];
            if (oneTask.svtInfo) {
                var arr = oneTask.svtInfo;
                for (var k in arr) {
                    if (arr[Number(k)].sid) {
                        haveservant.push(Number(arr[Number(k)].uid));
                    }
                }
            }
        }
        for (var i in historylist) {
            var oneInfo = historylist[i];
            for (var j in oneInfo) {
                var sid = oneInfo[j].sid;
                var info = { sid: Number(sid), uid: Number(oneInfo[j].uid) };
                if (sid && haveservant.indexOf(Number(oneInfo[j].uid)) == -1) {
                    canselectservant.push(info);
                }
            }
        }
        var servantIdx = 0;
        for (var i = 0; i < taskArray.length; i++) {
            var oneTask = taskArray[i];
            if (oneTask.st == 0) {
                if (canselectservant.length - servantIdx >= oneTask.svtInfo.length) {
                    var idArry = [];
                    for (var j = 0; j < oneTask.svtInfo.length; j++) {
                        idArry.push({ sid: String(canselectservant[servantIdx + j].sid), uid: String(canselectservant[servantIdx + j].uid) });
                    }
                    servantObj[i + 1] = idArry;
                    servantIdx += oneTask.svtInfo.length;
                }
            }
        }
        return servantObj;
    };
    ZhenqifangVoApi.prototype.dispose = function () {
        this.zhenqifangVo = null;
        this.freshlist = false;
        this.freshfriendlist = false;
        this.freshshop = false;
        this.selIdx = -1;
        this.sendList = [];
        this.friendsendList = {};
        this.otherinfo = null;
        this.friendobj = {};
        _super.prototype.dispose.call(this);
    };
    return ZhenqifangVoApi;
}(BaseVoApi));
__reflect(ZhenqifangVoApi.prototype, "ZhenqifangVoApi");
//# sourceMappingURL=ZhenqifangVoApi.js.map