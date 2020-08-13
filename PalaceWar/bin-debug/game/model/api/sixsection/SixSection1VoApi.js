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
/**
 * 皇城六部
 * author ycg
 * date 2020.5.7
 * @class SixSectionVoApi
 */
var SixSection1VoApi = /** @class */ (function (_super) {
    __extends(SixSection1VoApi, _super);
    function SixSection1VoApi() {
        var _this = _super.call(this) || this;
        _this._mapInfo = {};
        _this._titleInfo = {};
        _this._buildCfg = [];
        _this._directorCfg = [];
        _this._logList = [];
        return _this;
    }
    Object.defineProperty(SixSection1VoApi.prototype, "st", {
        get: function () {
            return this.sixSection1Vo.version;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SixSection1VoApi.prototype, "realSt", {
        get: function () {
            return this.st + this.cfg.openTime * 3600;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SixSection1VoApi.prototype, "et", {
        get: function () {
            return this.st + this.cfg.lastTime * 86400;
        },
        enumerable: true,
        configurable: true
    });
    //是否在可进行时间内
    SixSection1VoApi.prototype.isInPeriousTime = function () {
        var svTime = GameData.serverTime;
        if (svTime > this.realSt && svTime < this.et) {
            return true;
        }
        return false;
    };
    //是否在活动时间内
    SixSection1VoApi.prototype.getTimePeriousStatus = function () {
        //1 未开启 2 已结束  3 已结束
        var svTime = GameData.serverTime;
        if (svTime < this.realSt) {
            return 1;
        }
        else if (svTime >= this.st && svTime < this.et) {
            return 2;
        }
        else {
            return 3;
        }
    };
    //兵部是否处于开启状态
    SixSection1VoApi.prototype.isOpenSixSection1 = function () {
        if (Api.switchVoApi.checkOpenSixSection() && Api.switchVoApi.checkOpenHouseBtnUp() && Api.switchVoApi.checkOpenSixSectionBuilding(1) && this.isCanPlayByLvlimit() && this.isInPeriousTime() && this.checkServantLimit()) {
            return true;
        }
        return false;
    };
    //影响力
    SixSection1VoApi.prototype.getInfluenceData = function () {
        if (this.sixSection1Vo) {
            return this.sixSection1Vo.influence;
        }
    };
    //当前兵部头衔
    SixSection1VoApi.prototype.getCurrTitleId = function () {
        if (this.sixSection1Vo) {
            if (this.sixSection1Vo.director && this.sixSection1Vo.director.attackst) {
                if (this.sixSection1Vo.director.fuid) {
                    return null;
                }
                return this.sixSection1Vo.director.x;
            }
        }
        return null;
    };
    //某个席位的数据
    SixSection1VoApi.prototype.getSeatDataByPos = function (floor, index) {
        var data = this.getMapInfoByFloor(floor);
        if (data && data.length > 0) {
            return data[index];
        }
        return null;
    };
    //已使用门客
    SixSection1VoApi.prototype.getUseServant = function () {
        if (this.sixSection1Vo) {
            // return this.sixSection1Vo.info.usesid;
            var buildCfg = this.formatBuildCfg();
            var data = this.sixSection1Vo.build;
            if (!data) {
                return [];
            }
            var list = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].fuid || data[i].et) {
                }
                else {
                    var seatData = buildCfg[data[i].x - 1];
                    var endTime = data[i].st + data[i].remain * 3600 / seatData.baseCfg.shujijingyanSpeed;
                    if (GameData.serverTime < endTime) {
                        for (var k = 0; k < data[i].sids.length; k++) {
                            list.push(data[i].sids[k]);
                        }
                    }
                }
            }
            return list;
        }
        return [];
    };
    //是否使用过该门客
    SixSection1VoApi.prototype.isUsedServant = function (id) {
        // if (this.sixSection1Vo && this.sixSection1Vo.info.usesid && this.sixSection1Vo.info.usesid[id]){
        //     return true;
        // }
        if (this.isInSeatServant(id)) {
            return true;
        }
        return false;
    };
    //门客是否在席位中
    SixSection1VoApi.prototype.isInSeatServant = function (id) {
        if (!this.sixSection1Vo) {
            return false;
        }
        var buildCfg = this.formatBuildCfg();
        var data = this.sixSection1Vo.build;
        for (var i = 0; i < data.length; i++) {
            if (data[i].fuid || data[i].et) {
            }
            else {
                var seatData = buildCfg[data[i].x - 1];
                var endTime = data[i].st + data[i].remain * 3600 / seatData.baseCfg.shujijingyanSpeed;
                if (GameData.serverTime < endTime) {
                    for (var k = 0; k < data[i].sids.length; k++) {
                        if (Number(id) == Number(data[i].sids[k])) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };
    //查看过的阵容
    SixSection1VoApi.prototype.getLookedZhenRong = function (line, index) {
        if (this.sixSection1Vo && this.sixSection1Vo.info.investigate) {
            var mapInfo = this.getSeatDataByPos(line, index);
            if (mapInfo) {
                var data = this.sixSection1Vo.info.investigate;
                for (var i = 0; i < data.length; i++) {
                    if (mapInfo.attackst == data[i].attackst && line == data[i].x && index + 1 == data[i].y) {
                        return data[i];
                    }
                }
            }
        }
        return null;
    };
    //格式化建筑数据 每行是一个item
    SixSection1VoApi.prototype.formatBuildCfg = function () {
        if (this._buildCfg.length > 0) {
            return this._buildCfg;
        }
        var data = [];
        // let baseData = this.sixSectionVo.formatBuildCfg();
        var baseData = this.cfg.getBuildList();
        var lineNum = 1;
        for (var i = 0; i < baseData.length; i++) {
            var baseCfg = baseData[i];
            var rowNum = Math.ceil(baseCfg.seatNumber / baseCfg.perMaxSeat);
            var seatIndex = 0;
            for (var k = 0; k < rowNum; k++) {
                var isFirst = false;
                var isLast = false;
                var seatNum = baseCfg.perMaxSeat;
                if (k == rowNum - 1 && baseCfg.seatNumber % baseCfg.perMaxSeat > 0) {
                    seatNum = baseCfg.seatNumber % baseCfg.perMaxSeat;
                }
                if (k == 0) {
                    isFirst = true;
                }
                else if (k == rowNum - 1) {
                    isLast = true;
                }
                seatIndex = k * baseCfg.perMaxSeat;
                var cfg = { lineNum: lineNum, seatNum: seatNum, baseCfg: baseCfg, isFirst: isFirst, seatIndex: seatIndex, isLast: isLast };
                lineNum += 1;
                data.push(cfg);
                this._buildCfg.push(cfg);
            }
        }
        // console.log("buildCfg ", data);
        return this._buildCfg;
    };
    SixSection1VoApi.prototype.getBuildCfgByLine = function (line) {
        var buildCfg = this.formatBuildCfg();
        if (buildCfg && buildCfg[line - 1]) {
            return buildCfg[line - 1];
        }
        return null;
    };
    SixSection1VoApi.prototype.setMapInfo = function (data) {
        if (data) {
            for (var k in data) {
                var row = Number(k) * 10 + 1;
                for (var i = 0; i < data[k].length; i++) {
                    var num = row + i;
                    if (!this._mapInfo[num]) {
                        this._mapInfo[num] = {};
                    }
                    this._mapInfo[num] = data[k][i];
                }
            }
        }
        // console.log("setMapinfo ",this._mapInfo);
    };
    SixSection1VoApi.prototype.getMapInfoByFloor = function (floor) {
        if (this._mapInfo && this._mapInfo[floor]) {
            return this._mapInfo[floor];
        }
        return null;
    };
    SixSection1VoApi.prototype.clearBuildMapInfo = function () {
        this._mapInfo = {};
    };
    //格式化头衔数据 每行是一个item
    SixSection1VoApi.prototype.formatTitleCfg = function () {
        if (this._directorCfg.length > 0) {
            return this._directorCfg;
        }
        // let baseData = this.sixSectionVo.formatBuildCfg();
        var baseData = this.cfg.getDirectorList();
        // console.log("formatTitleCfg ", baseData);
        var lineNum = 1;
        for (var i = 0; i < baseData.length; i++) {
            var baseCfg = baseData[i];
            var rowNum = Math.ceil(baseCfg.seatNumber / baseCfg.perMaxSeat);
            for (var k = 0; k < rowNum; k++) {
                var isFirst = false;
                var isLast = false;
                var seatNum = baseCfg.perMaxSeat;
                if (k == rowNum - 1 && baseCfg.seatNumber % baseCfg.perMaxSeat > 0) {
                    seatNum = baseCfg.seatNumber % baseCfg.perMaxSeat;
                }
                if (k == 0) {
                    isFirst = true;
                }
                if (k == rowNum - 1) {
                    isLast = true;
                }
                var seatIndex = k * baseCfg.perMaxSeat;
                var cfg = { lineNum: lineNum, seatNum: seatNum, baseCfg: baseCfg, isFirst: isFirst, seatIndex: seatIndex, isLast: isLast };
                lineNum += 1;
                // data.push(cfg);
                this._directorCfg.push(cfg);
            }
        }
        // console.log("formatTitleCfg ", this._directorCfg);
        return this._directorCfg;
    };
    SixSection1VoApi.prototype.getTitleCfgByLine = function (line) {
        var data = this.formatTitleCfg();
        if (data && data[line - 1]) {
            return data[line - 1];
        }
        return null;
    };
    SixSection1VoApi.prototype.setTitleInfo = function (data) {
        if (data) {
            for (var k in data) {
                var row = Number(k) * 10 + 1;
                for (var i = 0; i < data[k].length; i++) {
                    var num = row + i;
                    if (!this._titleInfo[num]) {
                        this._titleInfo[num] = {};
                    }
                    this._titleInfo[num] = data[k][i];
                }
            }
        }
    };
    SixSection1VoApi.prototype.setClearTitleInfo = function (floor) {
        if (this._titleInfo && this._titleInfo[floor]) {
            this._titleInfo[floor] = null;
        }
    };
    SixSection1VoApi.prototype.getTitleInfoByFloor = function (floor) {
        if (this._titleInfo && this._titleInfo[floor]) {
            return this._titleInfo[floor];
        }
        return null;
    };
    SixSection1VoApi.prototype.clearTitleMapInfo = function () {
        this._titleInfo = {};
    };
    //返回经过排序后的id  属性 >资质 > 等级
    SixSection1VoApi.prototype.getServantInfoIdListWithSort = function () {
        //排序数据，刷新列表
        var servantListObj = Api.servantVoApi.getServantInfoList();
        var keys = Object.keys(servantListObj);
        //总属性排序
        keys.sort(function (a, b) {
            var servantA = servantListObj[a];
            var servantB = servantListObj[b];
            // if (Api.switchVoApi.checkOpenExile()) {
            // 	if (servantA.banishSt && (!servantB.banishSt)) {
            // 		return 1;
            // 	}
            // 	else if (servantA.banishSt && servantB.banishSt) {
            // 		if (servantA.total == servantB.total) {
            // 			return Number(b) - Number(a);
            // 		} else {
            // 			if (Number(servantB.total) == Number(servantA.total)) {
            // 				return Number(b) - Number(a);
            // 			}
            // 			return Number(servantB.total) - Number(servantA.total);
            // 		}
            // 	}
            // 	else if ((!servantA.banishSt) && servantB.banishSt) {
            // 		return -1;
            // 	}
            // 	else if ((!servantA.banishSt) && (!servantB.banishSt)) {
            // 		if (servantA.total == servantB.total) {
            // 			return Number(b) - Number(a);
            // 		} else {
            // 			if (Number(servantB.total) == Number(servantA.total)) {
            // 				return Number(b) - Number(a);
            // 			}
            // 			return Number(servantB.total) - Number(servantA.total);
            // 		}
            // 	}
            // }
            // else {
            if (servantA.total == servantB.total) {
                var bookAv = servantA.getTotalBookValue();
                var bookBv = servantB.getTotalBookValue();
                if (Number(bookAv) == Number(bookBv)) {
                    if (servantA.level == servantB.level) {
                        return Number(b) - Number(a);
                    }
                    else {
                        return servantB.level - servantA.level;
                    }
                }
                else {
                    return Number(bookBv) - Number(bookAv);
                }
            }
            else {
                return Number(servantB.total) - Number(servantA.total);
            }
            // }
        });
        return keys;
    };
    //获取玩家最高级称号，相同按sortiD取，没有显示官品
    SixSection1VoApi.prototype.getPlayerMaxTitleStr = function () {
        var titleInfo = Api.itemVoApi.getTitleInfo();
        if (!titleInfo) {
            return Api.playerVoApi.getPlayerOffice();
        }
        var id = this.getMaxTitle(titleInfo);
        if (!id) {
            return Api.playerVoApi.getPlayerOffice();
        }
        return LanguageManager.getlocal("palace_titleName" + id);
    };
    SixSection1VoApi.prototype.getMaxTitle = function (data) {
        if (!data) {
            return null;
        }
        var v = -1;
        var sortId = 0;
        var id = 0;
        for (var k in data) {
            var cfg = Config.TitleCfg.getTitleCfgById(k);
            if (cfg) {
                if (cfg.isTitle == 1) {
                    // let titleType = cfg.titleType;
                    // if (cfg.titleType == 7){
                    //     titleType = 0;
                    // }
                    // if (v == -1)
                    // {
                    //     v = titleType;
                    //     id = Number(k);
                    //     sortId = cfg.sortId;
                    // }
                    // else if (v == titleType){
                    //     if (sortId > cfg.sortId){
                    //         sortId = cfg.sortId;
                    //         id = Number(k);
                    //     }
                    // }
                    // else if (v > titleType)
                    // {
                    //     v = titleType;
                    //     sortId = cfg.sortId;
                    //     id = Number(k);
                    // }
                    if (sortId == 0) {
                        sortId = cfg.sortId;
                        id = Number(k);
                    }
                    else if (cfg.sortId < sortId) {
                        sortId = cfg.sortId;
                        id = Number(k);
                    }
                }
            }
        }
        if (id) {
            var cfg = Config.TitleCfg.getTitleCfgById(id);
            if (cfg.titleType == 3 || cfg.titleType == 4) {
                return null;
            }
        }
        return id;
    };
    //0 可以抢夺 1 对方称号较高 2对方官品较高
    SixSection1VoApi.prototype.getCanHoldStatus = function (holdTitleId, officeLv) {
        var titleInfo = Api.itemVoApi.getTitleInfo();
        var pTitle = this.getMaxTitle(titleInfo);
        if (pTitle && holdTitleId) {
            var pCfg = Config.TitleCfg.getTitleCfgById(pTitle);
            var pType = pCfg.titleType;
            var hCfg = Config.TitleCfg.getTitleCfgById(holdTitleId);
            var hType = hCfg.titleType;
            var pLv = Api.playerVoApi.getPlayerLevel();
            if (pType == hType) {
                if (pLv >= officeLv) {
                    return 0;
                }
                else if (pLv < officeLv) {
                    return 2;
                }
            }
            else {
                if (pType == 7) {
                    return 0;
                }
                else if (hType == 7) {
                    return 1;
                }
                if ((pType == 3 || pType == 4) && (hType == 3 || hType == 4)) {
                    if (pLv >= officeLv) {
                        return 0;
                    }
                    else if (pLv < officeLv) {
                        return 2;
                    }
                }
                if ((pType <= 4 && hType <= 4) || (pType >= 5 && hType >= 5)) {
                    if (pType < hType) {
                        return 0;
                    }
                }
                else if (pType >= 5 && hType < 5) {
                    if (hType > 2) {
                        return 0;
                    }
                }
                else if (hType >= 5 && pType < 5) {
                    if (pType < 3) {
                        return 0;
                    }
                }
                return 1;
            }
        }
        else if (pTitle && !holdTitleId) {
            var pCfg = Config.TitleCfg.getTitleCfgById(pTitle);
            var pType = pCfg.titleType;
            if (pType != 4 && pType != 3) {
                return 0;
            }
            else {
                var pLv = Api.playerVoApi.getPlayerLevel();
                if (pLv >= officeLv) {
                    return 0;
                }
                else {
                    return 2;
                }
            }
        }
        else if (!pTitle && holdTitleId) {
            var hCfg = Config.TitleCfg.getTitleCfgById(holdTitleId);
            var hType = hCfg.titleType;
            if (hType != 4 && hType != 3) {
                return 1;
            }
            else {
                var pLv = Api.playerVoApi.getPlayerLevel();
                if (pLv >= officeLv) {
                    return 0;
                }
                else {
                    return 2;
                }
            }
        }
        else {
            var pLv = Api.playerVoApi.getPlayerLevel();
            if (pLv >= officeLv) {
                return 0;
            }
            else {
                return 2;
            }
        }
    };
    //我的据点
    SixSection1VoApi.prototype.getSortMyBuildData = function () {
        if (!this.sixSection1Vo) {
            return null;
        }
        var buildCfg = this.formatBuildCfg();
        var data = this.sixSection1Vo.build;
        var buildData = [];
        for (var i = 0; i < data.length; i++) {
            var seatData = buildCfg[data[i].x - 1];
            //不可采集
            var status_1 = 1;
            //被抢夺 或已结束
            if (data[i].fuid || data[i].et) {
                status_1 = 2;
            }
            else {
                var endTime = data[i].st + data[i].remain * 3600 / seatData.baseCfg.shujijingyanSpeed;
                if (GameData.serverTime >= endTime) {
                    //已结算
                    status_1 = 2;
                }
                else {
                    var collSt = data[i].st;
                    if (data[i].collectSt) {
                        collSt = data[i].collectSt;
                    }
                    var getTime = collSt + seatData.baseCfg.minGetTime * 60;
                    var getInfoNum = Math.floor((GameData.serverTime - collSt) * seatData.baseCfg.shujijingyanSpeed / 3600);
                    if (GameData.serverTime > getTime && getInfoNum >= 1) {
                        //可采集
                        status_1 = 0;
                    }
                    else {
                        status_1 = 1;
                    }
                }
            }
            buildData[i] = { data: data[i], status: status_1, baseCfg: seatData };
        }
        buildData.sort(function (a, b) {
            if (a.status == b.status) {
                return b.data.attackst - a.data.attackst;
            }
            return a.status - b.status;
        });
        return buildData;
    };
    //结算的据点
    SixSection1VoApi.prototype.getResultSeat = function () {
        if (!this.sixSection1Vo) {
            return null;
        }
        var directorList = [];
        var dirData = this.sixSection1Vo.director;
        if (dirData && dirData.show && dirData.show == 1) {
            var data_1 = { data: dirData, type: "director" };
            directorList.push(data_1);
        }
        var data = this.sixSection1Vo.build;
        var list = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].show == 1) {
                var status_2 = 0;
                if (data[i].fname || data[i].fres) {
                    status_2 = 1;
                }
                list.push({ data: data[i], status: status_2, type: "build" });
            }
        }
        if (list.length > 1) {
            list.sort(function (a, b) {
                if (a.status == b.status) {
                    return a.data.et - b.data.et;
                }
                else {
                    return b.status - a.status;
                }
            });
        }
        if (directorList.length > 0) {
            var data_2 = directorList.concat(list);
            return data_2;
        }
        return list;
    };
    //抢夺记录
    SixSection1VoApi.prototype.setLogList = function (data) {
        this._logList = data;
    };
    SixSection1VoApi.prototype.getLogList = function () {
        return this._logList;
    };
    //头衔抢夺次数
    SixSection1VoApi.prototype.getHoldTitleFreeNum = function () {
        if (this.sixSection1Vo && this.sixSection1Vo.info.dFreeTime) {
            return this.sixSection1Vo.info.dFreeTime;
        }
        return 0;
    };
    //编号查询的数据
    SixSection1VoApi.prototype.getSearchInfo = function () {
        if (this.sixSection1Vo && this.sixSection1Vo.info.search) {
            return this.sixSection1Vo.info.search;
        }
        return null;
    };
    /**充值相关 */
    SixSection1VoApi.prototype.getSortRechargeCfg = function () {
        var dataCfg = this.cfg.getRechargeList();
        var cfgLen = dataCfg.length;
        var currRecharge = this.getRechargeNum();
        var data = [];
        for (var i = 0; i < cfgLen; i++) {
            if (this.isGetRechargeById(dataCfg[i].id)) {
                dataCfg[i].sortId = dataCfg[i].id;
            }
            else {
                if (currRecharge >= dataCfg[i].needGem) {
                    dataCfg[i].sortId = dataCfg[i].id - cfgLen - 1;
                }
                else {
                    dataCfg[i].sortId = dataCfg[i].id + cfgLen;
                }
            }
            data[i] = dataCfg[i];
        }
        return data.sort(function (a, b) { return a.sortId - b.sortId; });
    };
    //是否已领取
    SixSection1VoApi.prototype.isGetRechargeById = function (id) {
        if (this.sixSection1Vo && this.sixSection1Vo.info.rinfo && this.sixSection1Vo.info.rinfo.flags[id]) {
            return true;
        }
        return false;
    };
    //是否可领取
    SixSection1VoApi.prototype.getRechargeNum = function () {
        if (this.sixSection1Vo && this.sixSection1Vo.info.rinfo && this.sixSection1Vo.info.rinfo.v) {
            return this.sixSection1Vo.info.rinfo.v;
        }
        return 0;
    };
    //可派遣对大队伍数量
    SixSection1VoApi.prototype.getHoldTeamMaxNum = function () {
        return Config.Sixsection1Cfg.maxTeamNum;
    };
    //当前已派遣的次数
    SixSection1VoApi.prototype.getHoldTeamNum = function () {
        var count = 0;
        if (this.sixSection1Vo && this.sixSection1Vo.build) {
            var data = this.sixSection1Vo.build;
            var buildCfg = this.formatBuildCfg();
            for (var i = 0; i < data.length; i++) {
                if (data[i].fuid || data[i].et) {
                }
                else {
                    var seatData = buildCfg[data[i].x - 1];
                    var endTime = data[i].st + data[i].remain * 3600 / seatData.baseCfg.shujijingyanSpeed;
                    if (GameData.serverTime < endTime) {
                        count++;
                    }
                }
            }
        }
        return count;
    };
    SixSection1VoApi.prototype.checkHoldTeamLimit = function () {
        if (this.getHoldTeamNum() >= this.getHoldTeamMaxNum()) {
            return true;
        }
        return false;
    };
    //兵部门客数量是否大于30
    SixSection1VoApi.prototype.getServantLimit = function () {
        return Config.Sixsection1Cfg.maxServantNum;
    };
    SixSection1VoApi.prototype.checkServantLimit = function () {
        if (Api.servantVoApi) {
            var servantCount = Api.servantVoApi.getServantCount();
            if (servantCount >= this.getServantLimit()) {
                return true;
            }
        }
        return false;
    };
    //武力前30门客
    SixSection1VoApi.prototype.getServantList = function () {
        if (this.sixSection1Vo && this.sixSection1Vo.info.sids) {
            return this.sixSection1Vo.info.sids;
        }
        return [];
    };
    SixSection1VoApi.prototype.getSortServantList = function () {
        var list = this.getServantList();
        if (list && list.length >= this.getServantLimit()) {
            list.sort(function (a, b) {
                var aVo = Api.servantVoApi.getServantObj(a);
                var bVo = Api.servantVoApi.getServantObj(b);
                var bookLv1 = aVo.getTotalBookValue(1);
                var bookLv2 = bVo.getTotalBookValue(1);
                if (bookLv1 == bookLv2) {
                    if (aVo.level == bVo.level) {
                        return Number(b) - Number(a);
                    }
                    else {
                        return bVo.level - aVo.level;
                    }
                }
                return bookLv2 - bookLv1;
            });
            return list;
        }
        return [];
    };
    SixSection1VoApi.prototype.getBuffBookValueCount = function (bv) {
        var v = 0;
        var allSids = Api.servantVoApi.getServantInfoIdListWithSort(0);
        var selSids = this.getServantList();
        for (var i = 0; i < allSids.length; i++) {
            var oneid = allSids[i];
            if (GameData.isInArray(oneid, selSids) == false) {
                var servantObj = Api.servantVoApi.getServantObj(oneid);
                if (servantObj.getTotalBookValue() >= bv) {
                    v++;
                }
            }
        }
        return v;
    };
    //加成 总值
    SixSection1VoApi.prototype.getBaseBuff = function () {
        var buffAtk = 0;
        var buffCrit = 0;
        var baseBuff = Config.Sixsection1Cfg.baseBuff;
        for (var k in baseBuff) {
            var onebuff = baseBuff[k];
            var needv = onebuff["1"].needAbility;
            var servantCount = this.getBuffBookValueCount(needv);
            var oneValue1 = 0;
            var oneValue2 = 0;
            for (var j in onebuff) {
                var threebuff = onebuff[j];
                if (servantCount >= threebuff.servantNum) {
                    if (threebuff.addAtk) {
                        oneValue1 = threebuff.addAtk;
                    }
                    if (threebuff.addCrit) {
                        oneValue2 = threebuff.addCrit;
                    }
                }
                else {
                    break;
                }
            }
            buffAtk += oneValue1;
            buffCrit += oneValue2;
        }
        return [buffAtk, buffCrit];
    };
    //
    SixSection1VoApi.prototype.getBaseBuffListById = function (k) {
        var v = [];
        var baseBuff = Config.Sixsection1Cfg.baseBuff;
        var onebuff = baseBuff[k];
        for (var j in onebuff) {
            var threebuff = onebuff[j];
            v.push(threebuff);
        }
        return v;
    };
    SixSection1VoApi.prototype.getBaseBuffList = function () {
        var v = [];
        var baseBuff = Config.Sixsection1Cfg.baseBuff;
        for (var k in baseBuff) {
            var onebuff = baseBuff[k];
            var needv = onebuff["1"].needAbility;
            var servantCount = this.getBuffBookValueCount(needv);
            var oneValue1 = 0;
            var oneValue2 = 0;
            var level = 0;
            var onetype = onebuff["1"].addAtk > 0 ? 1 : 2;
            for (var j in onebuff) {
                var threebuff = onebuff[j];
                if (servantCount >= threebuff.servantNum) {
                    if (threebuff.addAtk) {
                        oneValue1 = threebuff.addAtk;
                    }
                    else if (threebuff.addCrit) {
                        oneValue2 = threebuff.addCrit;
                    }
                    level = Number(j);
                }
                else {
                    break;
                }
            }
            var onev = { id: k, needv: needv, lv: level, type: onetype, v1: oneValue1, v2: oneValue2, maxLv: Object.keys(onebuff).length, sc: servantCount };
            v.push(onev);
        }
        return v;
    };
    //充值红点
    // public isCanGetRechargeReward():boolean{
    //     let data = this.cfg.getRechargeList();
    //     let currRecharge = this.getRechargeNum();
    //     for (let i=0; i < data.length; i++){
    //         if (!this.isGetRechargeById(data[i].id) && currRecharge >= data[i].needGem){
    //             return true;
    //         }
    //     }
    //     return false;
    // }
    //官品限制条件
    SixSection1VoApi.prototype.isCanPlayByLvlimit = function () {
        var needLv = Config.Sixsection1Cfg.needLv;
        var pLv = Api.playerVoApi.getPlayerLevel();
        if (needLv <= pLv) {
            return true;
        }
        return false;
    };
    /**红点相关 */
    //结算红点
    SixSection1VoApi.prototype.checkSeatResultRed = function () {
        if (!Api.sixsection1VoApi.isInPeriousTime()) {
            return false;
        }
        var list = this.getResultSeat();
        if (list && list.length > 0) {
            return true;
        }
        return false;
    };
    //充值可领取红点
    SixSection1VoApi.prototype.checkRechargeRed = function () {
        if (!Api.sixsection1VoApi.isInPeriousTime()) {
            return false;
        }
        var data = this.cfg.getRechargeList();
        var currRecharge = this.getRechargeNum();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetRechargeById(data[i].id) && currRecharge >= data[i].needGem) {
                return true;
            }
        }
        return false;
    };
    //可采集红点
    SixSection1VoApi.prototype.checkMySeatRed = function () {
        if (!Api.sixsection1VoApi.isInPeriousTime()) {
            return false;
        }
        var data = this.getSortMyBuildData();
        for (var i = 0; i < data.length; i++) {
            if (data[i].status == 0) {
                return true;
            }
        }
        return false;
    };
    //防守红点
    SixSection1VoApi.prototype.checkSeatDefenRed = function () {
        if (!Api.sixsection1VoApi.isInPeriousTime()) {
            return false;
        }
        if (this.sixSection1Vo && this.sixSection1Vo.info.dinfoRP) {
            return true;
        }
        return false;
    };
    //仇人红点
    SixSection1VoApi.prototype.checkSeatEnemyRed = function () {
        if (!Api.sixsection1VoApi.isInPeriousTime()) {
            return false;
        }
        if (this.sixSection1Vo && this.sixSection1Vo.info.einfoRP) {
            return true;
        }
        return false;
    };
    //席位信息红点
    SixSection1VoApi.prototype.checkSeatInfoRed = function () {
        return this.checkMySeatRed() || this.checkSeatDefenRed() || this.checkSeatEnemyRed();
    };
    //无头衔显示红点
    SixSection1VoApi.prototype.checkTitleRed = function () {
        if (!Api.sixsection1VoApi.isInPeriousTime()) {
            return false;
        }
        var titleId = this.getCurrTitleId();
        if (titleId) {
            return false;
        }
        return true;
    };
    //红点
    SixSection1VoApi.prototype.checkRedPoint = function () {
        if (this.sixSection1Vo) {
            return this.isCanPlayByLvlimit() && this.checkServantLimit() && (this.checkSeatInfoRed() || this.checkTitleRed() || this.checkRechargeRed());
        }
        return false;
    };
    Object.defineProperty(SixSection1VoApi.prototype, "cfg", {
        get: function () {
            return Config.Sixsection1Cfg;
        },
        enumerable: true,
        configurable: true
    });
    SixSection1VoApi.prototype.dispose = function () {
        this._mapInfo = {};
        this._buildCfg = [];
        this._directorCfg = [];
        this._logList = [];
        _super.prototype.dispose.call(this);
    };
    return SixSection1VoApi;
}(BaseVoApi));
//# sourceMappingURL=SixSection1VoApi.js.map