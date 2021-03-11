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
 * 帝王成就api
 */
var EmperorAchieveVoApi = (function (_super) {
    __extends(EmperorAchieveVoApi, _super);
    function EmperorAchieveVoApi() {
        var _this = _super.call(this) || this;
        _this.emperorAchieveVo = null;
        _this.isShowAni = true;
        return _this;
    }
    /**帝王成就 */
    //是否领取帝王成就
    EmperorAchieveVoApi.prototype.isGetKingAchieveByType = function (id, type) {
        var data = this.emperorAchieveVo.achieveKing1;
        if (type == 2) {
            data = this.emperorAchieveVo.achieveKing2;
        }
        if (data.flags && data.flags[id]) {
            return true;
        }
        return false;
    };
    //是否有可领取的成就奖励
    EmperorAchieveVoApi.prototype.isCanGetKingAchieveByType = function (id, type) {
        var data = this.kingAchieveCfg.getKing1CfgList();
        var currNum = this.getKingAchieveNum(type);
        if (type == 2) {
            data = this.kingAchieveCfg.getKing2CfgList();
        }
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == String(id) && data[i].needNum <= currNum) {
                return true;
            }
        }
        return false;
    };
    //帝王成就当前进度
    EmperorAchieveVoApi.prototype.getKingAchieveNum = function (type) {
        var data = this.emperorAchieveVo.achieveKing1;
        if (type == 2) {
            data = this.emperorAchieveVo.achieveKing2;
        }
        if (data.v) {
            return data.v;
        }
        return 0;
    };
    //帝王成就当前就行的id
    EmperorAchieveVoApi.prototype.getCurrKingAchieveId = function (type) {
        var data = this.kingAchieveCfg.getKing1CfgList();
        var currNum = this.getKingAchieveNum(type);
        if (type == 2) {
            data = this.kingAchieveCfg.getKing2CfgList();
        }
        for (var i = 0; i < data.length; i++) {
            if (data[i].needNum > currNum) {
                return i;
            }
        }
        return data.length - 1;
    };
    //成就红点
    EmperorAchieveVoApi.prototype.isShowKingAchieveRedDotByType = function (type) {
        var data = this.kingAchieveCfg.getKing1CfgList();
        var currNum = this.getKingAchieveNum(type);
        if (type == 2) {
            data = this.kingAchieveCfg.getKing2CfgList();
        }
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetKingAchieveByType(data[i].id, type) && currNum >= data[i].needNum) {
                return true;
            }
        }
        return false;
    };
    //是否可以出巡
    EmperorAchieveVoApi.prototype.isShowAchieveOutRedDot = function () {
        var playerUid = Api.playerVoApi.getPlayerID();
        if (this.isUnlockOutFunc() && this.emperorAchieveVo.outingst == 0 && this.isInOutTime() || this.isShowOutRedDotByUid(playerUid)) {
            return true;
        }
        return false;
    };
    EmperorAchieveVoApi.prototype.isShowKingAchieveRedDot = function () {
        return this.isShowKingAchieveRedDotByType(1) || this.isShowKingAchieveRedDotByType(2) || this.isShowAchieveOutRedDot();
    };
    //是否已解锁出巡功能
    EmperorAchieveVoApi.prototype.isUnlockOutFunc = function () {
        var data = this.kingAchieveCfg.getKing1CfgList();
        var type = 1;
        var id = null;
        for (var i = 0; i < data.length; i++) {
            if (data[i].unlock == 1) {
                id = data[i].id;
                break;
            }
        }
        if (id) {
            if (this.isGetKingAchieveByType(id, type)) {
                return true;
            }
        }
        else {
            var data_1 = this.kingAchieveCfg.getKing2CfgList();
            type = 2;
            for (var i = 0; i < data_1.length; i++) {
                if (data_1[i].unlock == 1) {
                    id = data_1[i].id;
                    break;
                }
            }
            if (id) {
                if (this.isGetKingAchieveByType(id, type)) {
                    return true;
                }
            }
        }
        return false;
    };
    Object.defineProperty(EmperorAchieveVoApi.prototype, "kingAchieveCfg", {
        //帝王成就配置
        get: function () {
            return Config.EmperorachieveCfg;
        },
        enumerable: true,
        configurable: true
    });
    /**end ******************/
    /**帝王出巡 */
    //是否可以点击出巡
    EmperorAchieveVoApi.prototype.isInOutTime = function () {
        var time0Day = App.DateUtil.getWeeTs(GameData.serverTime);
        if (time0Day + this.emperorOutCfg.phrase[0] * 3600 <= GameData.serverTime && time0Day + this.emperorOutCfg.phrase[1] * 3600 > GameData.serverTime) {
            return true;
        }
        return false;
    };
    //是否在出巡时间内
    EmperorAchieveVoApi.prototype.isInOuting = function (outSt) {
        var et = outSt + this.emperorOutCfg.lastTime;
        if (GameData.serverTime < et && GameData.serverTime >= outSt) {
            return true;
        }
        return false;
    };
    //本地化出巡时间
    EmperorAchieveVoApi.prototype.localOutTime = function () {
        var stHour = App.DateUtil.formatSvrHourByLocalTimeZone(this.emperorOutCfg.phrase[0]).hour;
        var etHour = App.DateUtil.formatSvrHourByLocalTimeZone(this.emperorOutCfg.phrase[1]).hour;
        return { st: stHour, et: etHour };
    };
    //是否显示出巡按钮
    EmperorAchieveVoApi.prototype.isShowEmperorOutIcon = function () {
        if (this.emperorAchieveVo.outingList.length > 0) {
            var data = this.emperorAchieveVo.outingList;
            for (var i = 0; i < data.length; i++) {
                if (this.isInOuting(data[i].st)) {
                    return true;
                }
            }
        }
        return false;
    };
    EmperorAchieveVoApi.prototype.setShowAni = function (isShow) {
        this.isShowAni = isShow;
    };
    //是否显示出巡动画
    EmperorAchieveVoApi.prototype.isShowEmpOutAni = function () {
        var playerLv = Api.playerVoApi.getPlayerLevel();
        if (!this.emperorAchieveVo.shownotice && this.isShowEmperorOutIcon() && this.isShowAni && playerLv >= this.emperorOutCfg.lvNeed2) {
            return true;
        }
        return false;
    };
    //是否显示巡游红点
    EmperorAchieveVoApi.prototype.isShowEmpOutRedDot = function () {
        if (this.isShowEmperorOutIcon() && this.isShowOutRedDot()) {
            return true;
        }
        return false;
    };
    EmperorAchieveVoApi.prototype.isShowOutRedDot = function () {
        var data = this.getOutList();
        var playerId = Api.playerVoApi.getPlayerID();
        for (var i = 0; i < data.length; i++) {
            if (this.isInOuting(data[i].st)) {
                if (this.isShowSendWordRedDot(data[i].uid)) {
                    return true;
                }
                else {
                    var isAuthor = false;
                    if (data[i].uid == playerId) {
                        isAuthor = true;
                    }
                    if (this.isHavePopularRewardByuid(data[i].uid, isAuthor) && !this.isFirstSendWordByUid(data[i].uid)) {
                        return true;
                    }
                }
            }
        }
        if (this.isHaveBonusReward()) {
            return true;
        }
        return false;
    };
    //是否显示出巡红点by uid
    EmperorAchieveVoApi.prototype.isShowOutRedDotByUid = function (uid) {
        var data = this.getOutList();
        var playerId = Api.playerVoApi.getPlayerID();
        for (var i = 0; i < data.length; i++) {
            if (data[i].uid == uid && this.isInOuting(data[i].st)) {
                if (this.isInOuting(data[i].st)) {
                    var isAuthor = false;
                    if (data[i].uid == playerId) {
                        isAuthor = true;
                    }
                    if (this.isShowSendWordRedDot(data[i].uid) || this.isHavePopularRewardByuid(data[i].uid, isAuthor) || (!isAuthor && this.isCanGetBonusReward(data[i].uid))) {
                        return true;
                    }
                }
                break;
            }
        }
        return false;
    };
    //出巡列表
    EmperorAchieveVoApi.prototype.getOutList = function () {
        return this.emperorAchieveVo.outingList;
    };
    //获取某个人的出巡信息
    EmperorAchieveVoApi.prototype.getOutDataByuid = function (uid) {
        var data = this.getOutList();
        for (var i = 0; i < data.length; i++) {
            if (data[i].uid == uid) {
                return data[i];
            }
        }
        return null;
    };
    //出巡倒计时
    EmperorAchieveVoApi.prototype.getOutTimeCountDown = function (st) {
        // let time0Day = App.DateUtil.getWeeTs(GameData.serverTime);
        var et = st + this.emperorOutCfg.lastTime;
        var time = et - GameData.serverTime;
        if (time <= 0) {
            time = 0;
        }
        return { timeStr: App.DateUtil.getFormatBySecond(time, 1), time: time };
    };
    //人气值
    EmperorAchieveVoApi.prototype.getCurrPopularByuid = function (uid) {
        return this.emperorAchieveVo.getPopularScoreByUid(uid);
    };
    //是否未发过言
    EmperorAchieveVoApi.prototype.isFirstSendWordByUid = function (uid) {
        var data = this.emperorAchieveVo.barrage;
        if (data && data[uid] && data[uid] > 0) {
            return false;
        }
        return true;
    };
    //发言红点
    EmperorAchieveVoApi.prototype.isShowSendWordRedDot = function (uid) {
        var playerLevel = Api.playerVoApi.getPlayerLevel();
        var pUid = Api.playerVoApi.getPlayerID();
        var needLevel = this.emperorOutCfg.lvNeed;
        if (uid == pUid) {
            return this.isFirstSendWordByUid(uid);
        }
        else {
            if (needLevel <= playerLevel && this.isFirstSendWordByUid(uid)) {
                return true;
            }
        }
        return false;
    };
    //发言列表
    EmperorAchieveVoApi.prototype.getRandBarragePool = function () {
        var data = this.emperorAchieveVo.barragePool;
        data.sort(function (a, b) { return a - b; });
        return data;
    };
    //获取当前最大弹幕数量
    EmperorAchieveVoApi.prototype.getMaxBarrageNumByUid = function (uid) {
        var curScore = this.getCurrPopularByuid(uid);
        var data = this.emperorOutCfg.barrage;
        var rangeArr = null;
        for (var i = 0; i < data.length; i++) {
            rangeArr = data[i].popularityRange;
            if (curScore >= rangeArr[0] && curScore <= rangeArr[1]) {
                return data[i].barrageNum;
            }
        }
        return data[data.length - 1].barrageNum;
    };
    //人气奖励相关
    EmperorAchieveVoApi.prototype.isGetPopularReward = function (uid, id) {
        var info = this.emperorAchieveVo.getPopularityRwd;
        if (info && info[uid] && info[uid][id]) {
            return true;
        }
        return false;
    };
    //是否有可领取奖励
    EmperorAchieveVoApi.prototype.isHavePopularRewardByuid = function (uid, isAuthor) {
        var dataCfg = this.emperorOutCfg.getAchievement1CfgList();
        if (isAuthor) {
            dataCfg = this.emperorOutCfg.getAchievement2CfgList();
        }
        var score = this.getCurrPopularByuid(uid);
        for (var i = 0; i < dataCfg.length; i++) {
            if (!this.isGetPopularReward(uid, dataCfg[i].id) && score >= dataCfg[i].needPopularity) {
                return true;
            }
        }
        return false;
    };
    //排序后的人气
    EmperorAchieveVoApi.prototype.getSortOutAchieveCfg = function (uid, data) {
        var _data = [];
        for (var i = 0; i < data.length; i++) {
            _data.push(data[i]);
        }
        var curScore = this.getCurrPopularByuid(uid);
        for (var i = 0; i < _data.length; i++) {
            if (this.isGetPopularReward(uid, _data[i].id)) {
                _data[i].sortId = _data.length + Number(_data[i].id);
            }
            else if (curScore >= _data[i].needPopularity) {
                _data[i].sortId = Number(_data[i].id) - _data.length;
            }
            else {
                _data[i].sortId = Number(_data[i].id);
            }
        }
        _data.sort(function (a, b) { return a.sortId - b.sortId; });
        return _data;
    };
    //请安列表
    EmperorAchieveVoApi.prototype.sortWishListData = function (data) {
        // let allianceVo = Api.allianceVoApi.getAllianceVo();
        var myAllianceId = Api.playerVoApi.getPlayerAllianceId();
        if (!myAllianceId) {
            myAllianceId = 0;
        }
        App.LogUtil.log("sortWishListData: " + myAllianceId);
        var list = [];
        for (var i = 0; i < data.length; i++) {
            var isSame = 0;
            if (data[i].mygid != 0 && data[i].mygid == myAllianceId) {
                isSame = 1;
            }
            var _data = { isSame: isSame, data: data[i] };
            list.push(_data);
        }
        list.sort(function (a, b) {
            if (a.data.value == b.data.value) {
                if (a.isSame == b.isSame) {
                    if (a.data.level == b.data.level) {
                        return a.data.uid - b.data.uid;
                    }
                    else {
                        return b.data.level - a.data.level;
                    }
                }
                else {
                    return b.isSame - a.isSame;
                }
            }
            else {
                return b.data.value - a.data.value;
            }
        });
        return list;
    };
    //获取赏赐数据
    EmperorAchieveVoApi.prototype.getBonusData = function () {
        return this.emperorAchieveVo.bonus;
    };
    //是否可领取赏赐奖励
    EmperorAchieveVoApi.prototype.isCanGetBonusReward = function (uid) {
        if (this.emperorAchieveVo.getBonus && this.emperorAchieveVo.getBonus[uid] == 1) {
            return true;
        }
        return false;
    };
    //是否有赏赐奖励可领取
    EmperorAchieveVoApi.prototype.isHaveBonusReward = function () {
        var data = this.getOutList();
        var playerUid = Api.playerVoApi.getPlayerID();
        for (var i = 0; i < data.length; i++) {
            if (data[i].uid != playerUid && this.isCanGetBonusReward(data[i].uid)) {
                return true;
            }
        }
        return false;
    };
    //当前已发言数量
    EmperorAchieveVoApi.prototype.getBarrageNumByUid = function (uid) {
        if (this.emperorAchieveVo.barrageNum && this.emperorAchieveVo.barrageNum[uid]) {
            return this.emperorAchieveVo.barrageNum[uid];
        }
        return 0;
    };
    //是否已达最大发言数量
    EmperorAchieveVoApi.prototype.isMaxBarrageNum = function (uid) {
        var curNum = this.getBarrageNumByUid(uid);
        if (curNum >= this.emperorOutCfg.barrageTimes) {
            return true;
        }
        return false;
    };
    //被赏赐的数据
    EmperorAchieveVoApi.prototype.getBonusTextDataByUid = function (uid) {
        var data = this.getOutDataByuid(uid);
        var _data = [];
        var bonus = data.data.bonus;
        if (!bonus) {
            return null;
        }
        for (var key in bonus) {
            _data.push(bonus[key]);
        }
        return _data;
    };
    Object.defineProperty(EmperorAchieveVoApi.prototype, "emperorOutCfg", {
        //出巡配置
        get: function () {
            return Config.EmperoroutingCfg;
        },
        enumerable: true,
        configurable: true
    });
    EmperorAchieveVoApi.prototype.dispose = function () {
        this.isShowAni = true;
        _super.prototype.dispose.call(this);
    };
    return EmperorAchieveVoApi;
}(BaseVoApi));
__reflect(EmperorAchieveVoApi.prototype, "EmperorAchieveVoApi");
//# sourceMappingURL=EmperorAchieveVoApi.js.map