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
var AcCrossServerIntimacyVo = /** @class */ (function (_super) {
    __extends(AcCrossServerIntimacyVo, _super);
    function AcCrossServerIntimacyVo() {
        var _this = _super.call(this) || this;
        _this.info = null;
        _this.shop = null;
        _this.shop2 = null;
        _this.task = null;
        _this.voteinfo = null;
        _this.votegetinfo = null;
        _this.zids = 0;
        return _this;
    }
    AcCrossServerIntimacyVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MODEL_ACTIVITY);
    };
    AcCrossServerIntimacyVo.prototype.checkIsTianjiao = function () {
        var zoneNum = 11;
        if (this.zids && this.zids >= zoneNum) {
            return true;
        }
    };
    AcCrossServerIntimacyVo.prototype.getCheerEndTime = function () {
        var et = this.et - this.cfg.extraTime * 86400 - this.cfg.lastTime * 3600;
        return et;
    };
    Object.defineProperty(AcCrossServerIntimacyVo.prototype, "isShowRedDot", {
        get: function () {
            var flag = false;
            if ((this.judgeTimeProcess() == 3 && !this.isGettZonereward()) || this.isCheerRedDot()) {
                flag = true;
            }
            return flag;
        },
        enumerable: true,
        configurable: true
    });
    //活动开始时间
    AcCrossServerIntimacyVo.prototype.isInAcPreTime = function () {
        var time0 = App.DateUtil.getWeeTs(this.st);
        if (GameData.serverTime >= time0 + 86400) {
            return false;
        }
        return true;
    };
    Object.defineProperty(AcCrossServerIntimacyVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st + 7200, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerIntimacyVo.prototype.getEndTimeDown = function () {
        var et = this.et;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    AcCrossServerIntimacyVo.prototype.isInActivity = function () {
        var et = this.et;
        if (this.config && this.config.extraTime) {
            et = this.et - this.config.extraTime * 86400;
        }
        if (GameData.serverTime >= this.st && GameData.serverTime <= et) {
            return true;
        }
        return false;
    };
    AcCrossServerIntimacyVo.prototype.checkZoneRewardDeddot = function () {
        if (this.checkIsTianjiao()) {
            if (this.checkIsInEndShowTime() && (!this.isGettZonereward())) {
                return true;
            }
        }
        else {
            if (this.judgeTimeProcess() == 3 && !this.isGettZonereward()) {
                return true;
            }
        }
        return false;
    };
    AcCrossServerIntimacyVo.prototype.getExchangeItemNum = function () {
        if (this.cfg.change && this.cfg.change.needNum) {
            var needItemVo = GameData.formatRewardItem(this.cfg.change.needNum)[0];
            var currData = Api.itemVoApi.getItemInfoVoById(needItemVo.id);
            if (currData && currData.num) {
                return currData.num;
            }
        }
        return 0;
    };
    //助威红点
    AcCrossServerIntimacyVo.prototype.isCheerRedDot = function () {
        if (!this.checkIsTianjiao()) {
            return false;
        }
        return this.checkExchangeRedDot() || this.checkCheerUpRedDot() || this.checkTaskRedDot() || this.checkShopRedDot();
    };
    //战旗使用数量
    AcCrossServerIntimacyVo.prototype.isLimitFightFlagNum = function (uid) {
        if (this.voteinfo) {
            if (this.voteinfo[uid]) {
                return false;
            }
            else {
                var currNum = Object.keys(this.voteinfo).length;
                if (currNum + 1 > this.cfg.flagPeopleNum) {
                    return true;
                }
            }
        }
        return false;
    };
    //助威
    AcCrossServerIntimacyVo.prototype.getVoteNumByUid = function (uid) {
        if (this.voteinfo && this.voteinfo[uid]) {
            return this.voteinfo[uid];
        }
        return 0;
    };
    AcCrossServerIntimacyVo.prototype.getSortTaskCfg = function () {
        var cfg = this.cfg.getTaskList();
        var data = [];
        for (var i = 0; i < cfg.length; i++) {
            if (this.isGetTaskReward(cfg[i].id)) {
                cfg[i].sortId = cfg[i].id + cfg.length;
            }
            else {
                var taskNum = this.getTaskNum(cfg[i].questType);
                if (taskNum >= cfg[i].value) {
                    cfg[i].sortId = cfg[i].id - cfg.length;
                }
                else {
                    cfg[i].sortId = cfg[i].id;
                }
            }
            data.push(cfg[i]);
        }
        return data.sort(function (a, b) { return a.sortId - b.sortId; });
    };
    AcCrossServerIntimacyVo.prototype.getShowSkinId = function () {
        // let rewardVo = GameData.formatRewardItem(this.cfg.change.getItem)[0];
        // let itemCfg = Config.ItemCfg.getItemCfgById(rewardVo.id);
        // if (itemCfg.servantSkinID){
        // 	return itemCfg.servantSkinID;
        // }
        // return rewardVo.id;
        return 3061;
    };
    //个人奖励是否领取
    AcCrossServerIntimacyVo.prototype.isGetPreward = function () {
        return this.info.preward == 1;
    };
    //获取区域排名
    AcCrossServerIntimacyVo.prototype.isGettZonereward = function () {
        return this.info.zonereward == 1;
    };
    //获取当前亲密排行榜自己的分数
    AcCrossServerIntimacyVo.prototype.getCurPoints = function () {
        return Number(this.info.v);
    };
    //自己的参赛资格
    AcCrossServerIntimacyVo.prototype.getIsCanJoin = function () {
        return this.info.iscanjoin;
    };
    //当前时间阶段 0即将开始  1:准备开始倒计时  2:结束倒计时   3:展示期 4:活动结束
    AcCrossServerIntimacyVo.prototype.judgeTimeProcess = function () {
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
    //衣装界面可兑换 红点
    AcCrossServerIntimacyVo.prototype.checkExchangeRedDot = function () {
        if (this.isStart) {
            if (this.cfg.change && this.cfg.change.needNum) {
                var needItemVo = GameData.formatRewardItem(this.cfg.change.needNum)[0];
                var currData = Api.itemVoApi.getItemInfoVoById(needItemVo.id);
                if (currData && currData.num >= needItemVo.num) {
                    return true;
                }
            }
        }
        return false;
    };
    //战旗使用时间
    AcCrossServerIntimacyVo.prototype.isInFightFlagUseTime = function () {
        var et = this.et - this.cfg.extraTime * 86400 - this.cfg.lastTime * 3600;
        if (GameData.serverTime >= et) {
            return false;
        }
        return true;
    };
    //战旗数量
    AcCrossServerIntimacyVo.prototype.getFightFlagNum = function () {
        if (this.special) {
            return this.special;
        }
        return 0;
    };
    //是否已领取人气币
    AcCrossServerIntimacyVo.prototype.isGetFlagScore = function () {
        if (this.votegetinfo && Object.keys(this.votegetinfo).length > 0) {
            return true;
        }
        return false;
    };
    //是否有人气币可领取
    AcCrossServerIntimacyVo.prototype.isCanGetFlagScore = function () {
        var et = this.et;
        if (this.cfg && this.cfg.extraTime) {
            et = this.et - this.cfg.extraTime * 86400;
        }
        if (GameData.serverTime >= et && GameData.serverTime < this.et) {
            if (this.voteinfo && Object.keys(this.voteinfo).length > 0) {
                return true;
            }
        }
        return false;
    };
    //task
    AcCrossServerIntimacyVo.prototype.getTaskNum = function (type) {
        if (this.task && this.task.v && this.task.v[type]) {
            return this.task.v[type];
        }
        return 0;
    };
    //是否已领取任务奖励
    AcCrossServerIntimacyVo.prototype.isGetTaskReward = function (id) {
        if (this.task && this.task.flags && this.task.flags[id]) {
            return true;
        }
        return false;
    };
    //人气币数量
    AcCrossServerIntimacyVo.prototype.getFlagScore = function () {
        if (this.shopScore) {
            return this.shopScore;
        }
        return 0;
    };
    //shop
    AcCrossServerIntimacyVo.prototype.getShopBuyNumById = function (id) {
        if (this.shop && this.shop[id]) {
            return this.shop[id];
        }
        return 0;
    };
    //shop2
    AcCrossServerIntimacyVo.prototype.getShop2BuyNumById = function (id) {
        if (this.shop2 && this.shop2[id]) {
            return this.shop2[id];
        }
        return 0;
    };
    //助威红点
    AcCrossServerIntimacyVo.prototype.checkCheerUpRedDot = function () {
        if (this.isInFightFlagUseTime()) {
            if (this.getFightFlagNum() > 0) {
                return true;
            }
        }
        if (this.checkIsInEndShowTime() && (!this.isGetFlagScore()) && this.isCanGetFlagScore()) {
            return true;
        }
        return false;
    };
    //任务红点
    AcCrossServerIntimacyVo.prototype.checkTaskRedDot = function () {
        if (Api.playerVoApi.getPlayerLevel() < this.cfg.needLv) {
            return false;
        }
        var data = this.cfg.getTaskList();
        for (var i = 0; i < data.length; i++) {
            var taskNum = this.getTaskNum(data[i].questType);
            if (!this.isGetTaskReward(data[i].id) && taskNum >= data[i].value) {
                return true;
            }
        }
        return false;
    };
    //积分商店红点
    AcCrossServerIntimacyVo.prototype.checkShopRedDot = function () {
        var score = this.getFlagScore();
        if (score > 0) {
            var data = this.cfg.getShopList();
            for (var i = 0; i < data.length; i++) {
                var buyNum = this.getShopBuyNumById(data[i].id);
                if (data[i].limitNum > buyNum && score >= data[i].cost) {
                    return true;
                }
            }
        }
        // if(this.checkIsInEndShowTime())
        // {
        // 	let have = this.getExchangeItemNum();
        // 	if (have > 0){
        // 		let data = this.cfg.getShop2List();
        // 		for (let i=0; i < data.length; i++){
        // 			let buyNum = this.getShop2BuyNumById(data[i].id);
        // 			if (data[i].limitNum > buyNum && have >= data[i].cost){
        // 				return true;
        // 			}
        // 		}
        // 	}
        // }
        return false;
    };
    //时间转格式
    AcCrossServerIntimacyVo.prototype.getCountTimeStr = function (num) {
        var time = num;
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    Object.defineProperty(AcCrossServerIntimacyVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerIntimacyVo.prototype.dispose = function () {
        this.info = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerIntimacyVo;
}(AcBaseVo));
//# sourceMappingURL=AcCrossServerIntimacyVo.js.map