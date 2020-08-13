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
 * 帮会api
 * author dky
 * date 2017/11/27
 * @class AllianceVoApi
 */
var AllianceVoApi = /** @class */ (function (_super) {
    __extends(AllianceVoApi, _super);
    function AllianceVoApi() {
        return _super.call(this) || this;
    }
    AllianceVoApi.prototype.formatData = function (data) {
        if (this._allianceVo == null) {
            this._allianceVo = new AllianceVo();
        }
        this._allianceVo.initData(data);
        _super.prototype.formatData.call(this, data);
    };
    AllianceVoApi.prototype.formatData2 = function (data) {
        if (this._myAllianceVo == null) {
            this._myAllianceVo = new MyAllianceVo();
        }
        if (data.alliance_chat == 0) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK, {});
        }
        if (data.alliance_chat == 1) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ALLIANCE_BEJOIN, {});
            Api.chatVoApi.clearChat();
            NetManager.chatServerLogin(null, null);
        }
        this._myAllianceVo.initData(data);
        _super.prototype.formatData.call(this, data);
    };
    AllianceVoApi.prototype.formatData3 = function (data) {
        if (this._allianceMemberVo == null) {
            this._allianceMemberVo = new AllianceMemberVo();
        }
        this._allianceMemberVo.initData(data);
        _super.prototype.formatData.call(this, data);
    };
    AllianceVoApi.prototype.getAllianceVo = function () {
        return this._allianceVo;
    };
    AllianceVoApi.prototype.getMyAllianceVo = function () {
        return this._myAllianceVo;
    };
    AllianceVoApi.prototype.getAllianceMemberVo = function () {
        return this._allianceMemberVo;
    };
    /**获取成员列表 */
    AllianceVoApi.prototype.getAllianceMemberInfoVoList = function () {
        var arr = new Array();
        var allianceInfoVoObj = this._allianceMemberVo.memberInfoVoObj;
        for (var key in allianceInfoVoObj) {
            arr.push(allianceInfoVoObj[key]);
        }
        arr.sort(function (a, b) {
            if (a.po == b.po) {
                return b.power - a.power;
            }
            return Number(a.po) - Number(b.po);
            // return 0;
        });
        return arr;
    };
    /**获取转让帮主列表 */
    AllianceVoApi.prototype.getAllianceTurnVoList = function () {
        var arr = new Array();
        var allianceInfoVoObj = this._allianceMemberVo.memberInfoVoObj;
        for (var key in allianceInfoVoObj) {
            var lastDay = (GameData.serverTime - allianceInfoVoObj[key].logindt) / 86400;
            if (allianceInfoVoObj[key].po != 1 && lastDay < 3) {
                arr.push(allianceInfoVoObj[key]);
            }
        }
        return arr;
    };
    /**获取成员Id获取成员列表 */
    AllianceVoApi.prototype.getAllianceMemberInfoById = function (id) {
        var arr;
        var allianceInfoVoObj = this._allianceMemberVo.memberInfoVoObj;
        for (var key in allianceInfoVoObj) {
            if (allianceInfoVoObj[key].uid == id) {
                return allianceInfoVoObj[key];
            }
        }
        return null;
    };
    /**获取副帮主数量 */
    AllianceVoApi.prototype.getAlliancePo2Num = function () {
        var num = 0;
        var memList = this.getAllianceMemberInfoVoList();
        for (var index = 0; index < memList.length; index++) {
            var element = memList[index];
            if (element.po == 2) {
                num++;
            }
        }
        return num;
    };
    /**获取精英 */
    AllianceVoApi.prototype.getAlliancePo3Num = function () {
        var num = 0;
        var memList = this.getAllianceMemberInfoVoList();
        for (var index = 0; index < memList.length; index++) {
            var element = memList[index];
            if (element.po == 3) {
                num++;
            }
        }
        return num;
    };
    AllianceVoApi.prototype.isShowNpc = function () {
        var boo = false;
        if (Api.playerVoApi.getPlayerLevel() >= Config.AlliancebaseCfg.unlock) {
            boo = true;
        }
        else {
            boo = false;
        }
        return boo;
    };
    /**
     * 当前是否可以打开 帮会view， 如果已开启可以打开
     */
    AllianceVoApi.prototype.getOpenViewMessage = function () {
        if (!this.isShowNpc()) {
            return this.getLockedString();
        }
        else {
            if (Api.unlocklist2VoApi.checkShowOpenFunc()) {
                if (Api.unlocklist2VoApi.isInNeedShowEffect("alliance")) {
                    return this.getLockedString();
                }
            }
        }
        return null;
    };
    AllianceVoApi.prototype.checkNpcMessage = function () {
        if (this.isShowNpc()) {
            var vo = this.getAllianceVo();
            var myAllianceVo = this.getMyAllianceVo();
            if (myAllianceVo && myAllianceVo.po <= 2 && vo && vo.apply && vo.apply[0] || (Api.allianceWeekVoApi && Api.allianceWeekVoApi.checkInBattleRedDot()) || this.checkDonateRed()) {
                return true;
            }
        }
        return false;
    };
    //每日建设红点
    AllianceVoApi.prototype.checkDonateRed = function () {
        var mgid = Api.playerVoApi.getPlayerAllianceId();
        if (!mgid) {
            return false;
        }
        if (Api.switchVoApi.checkOpenMonthcardDonate()) {
            if (Api.shopVoApi.ifBuyMonthCard()) {
                if (!Api.allianceVoApi.getIsMonthcardDonatet()) {
                    return true;
                }
            }
            else {
                if (!this.getIsDonatet()) {
                    return true;
                }
            }
        }
        else {
            if (!this.getIsDonatet()) {
                return true;
            }
        }
        return false;
    };
    AllianceVoApi.prototype.isShowFreeBuidRed = function () {
        if (Api.switchVoApi.checkOpenMonthcardDonate() && Api.shopVoApi.ifBuyMonthCard() && !Api.allianceVoApi.getIsMonthcardDonatet()) {
            return true;
        }
        return false;
    };
    AllianceVoApi.prototype.getLockedString = function () {
        return LanguageManager.getlocal("reachLvelUnlockDesc", [Api.playerVoApi.getPlayerOfficeByLevel(Config.AlliancebaseCfg.unlock)]);
    };
    AllianceVoApi.prototype.getIsDonatet = function () {
        var myVo = Api.allianceVoApi.getMyAllianceVo();
        if (myVo && myVo.donate.id) {
            if (myVo.donate.et >= App.DateUtil.getWeeTs(GameData.serverTime)) {
                return true;
            }
        }
        return false;
    };
    AllianceVoApi.prototype.getIsMonthcardDonatet = function () {
        var myVo = Api.allianceVoApi.getMyAllianceVo();
        if (myVo && myVo.donate.monthcardDonate) {
            if (myVo.donate.monthcardEt >= App.DateUtil.getWeeTs(GameData.serverTime)) {
                return true;
            }
        }
        return false;
    };
    AllianceVoApi.prototype.getStr = function (data) {
        var cfg = Config.AlliancebaseCfg.contributeList;
        var str = "";
        // 成功创建了 {1} 帮会
        if (data[0] == 1) {
            str = LanguageManager.getlocal("alliancelogdes" + data[0], [data[3]]);
            return str;
        }
        // "帮会成功升级至 {1}",
        if (data[0] == 2) {
            str = LanguageManager.getlocal("alliancelogdes" + data[0], [data[3]]);
            return str;
        }
        // "进行了 {1}，获得帮会经验{2}，帮会财富{3}，个人贡献{4}",
        if (data[3] && data[0] == 4) {
            var currcfg = cfg[data[3]];
            var str1 = LanguageManager.getlocal("allianceBuildName" + data[3]);
            str = LanguageManager.getlocal("alliancelogdes" + data[0], [str1, currcfg.exp + "", currcfg.asset + "", currcfg.contribution + ""]);
            if (data[4]) {
                str = LanguageManager.getlocal("alliancelogdes4_1", [str1, currcfg.contribution + ""]);
            }
            return str;
        }
        // "花费 {1} 帮会财富，开启了 {2}，各位大人赶快前往抵御BOSS",
        if (data[0] == 5) {
            var needAsset = null;
            var needGem = null;
            if (String(data[4]).indexOf("e") < 0) {
                var bossCfg_1 = Config.AlliancebossCfg.getAllianceCfgByLv(data[4]);
                needAsset = bossCfg_1.needAsset;
                needGem = bossCfg_1.needGem;
            }
            else {
                var bossCfg_2 = Config.AllianceelitebossCfg.getAllianceCfgByLv(data[4]);
                needAsset = bossCfg_2.eliteNeedAsset;
                needGem = bossCfg_2.eliteNeedGem;
            }
            // 财富  
            if (data[3] == 1) {
                var bossName = LanguageManager.getlocal("allianceBoss_monsterName" + data[4]);
                str = LanguageManager.getlocal("alliancelogdes" + data[0], [needAsset + "", bossName]);
                return str;
            }
            else // 元宝
             {
                var bossName = LanguageManager.getlocal("allianceBoss_monsterName" + data[4]);
                str = LanguageManager.getlocal("alliancelogdes" + 12, [needGem + "", bossName]);
                return str;
            }
        }
        // 将帮会改名为 {1}"
        if (data[0] == 6) {
            // 财富  
            str = LanguageManager.getlocal("alliancelogdes" + data[0], [data[3]]);
            return str;
        }
        // "alliancelogdes7":"击杀了 {1}，帮会经验+{2}，帮会财富+{3}，个人贡献+{4}，{5}",5是道具 一个
        if (data[0] == 7) {
            var bossName = LanguageManager.getlocal("allianceBoss_monsterName" + data[3]);
            var itemvo = GameData.formatRewardItem(data[4]);
            var bossCfg = null;
            if (String(data[3]).indexOf("e") >= 0) {
                bossCfg = Config.AllianceelitebossCfg.getAllianceCfgByLv(data[3]);
                str = LanguageManager.getlocal("alliancelogdes" + data[0], [bossName, "0", "0", String(data[5]), itemvo[0]._name + "x" + itemvo[0].num + ""]);
            }
            else {
                bossCfg = Config.AlliancebossCfg.getAllianceCfgByLv(data[3]);
                str = LanguageManager.getlocal("alliancelogdes" + data[0], [bossName, bossCfg.addExp + "", bossCfg.addAsset + "", data[5] + "", itemvo[0]._name + "x" + itemvo[0].num + ""]);
            }
            return str;
        }
        //  "alliancelogdes10":"被 {1} 移出帮会",
        if (data[0] == 10) {
            str = LanguageManager.getlocal("alliancelogdes" + data[0], [data[3]]);
            return str;
        }
        // "alliancelogdes11":"将 {1} 职位变更为 {2}",
        if (data[0] == 11) {
            var str2 = LanguageManager.getlocal("allianceMemberPo" + data[3]);
            str = LanguageManager.getlocal("alliancelogdes" + data[0], [data[4], str2]);
            return str;
        }
        // 帮主长期离线自动禅让，显示格式 【帮主名称】由于长期离线，帮主之位自动转让给【新帮主名称】”
        if (data[0] == 12) {
            str = LanguageManager.getlocal("alliancelogdes15", [data[2], data[3]]);
            return str;
        }
        if (data[0] == 16) {
            str = LanguageManager.getlocal("alliancelogdes16", [data[2], LanguageManager.getlocal("allianceWeekEndViewNpcName" + data[3])]);
            return str;
        }
        //花费 {1} 帮会财富，购买了帮会策略 {2}，今日帮会任务{3}加成 {4}
        if (data[0] == 17) {
            var buffId = data[3];
            var buffcfg = Config.AlliancetaskCfg.getAllianceTaskBuffById("" + buffId);
            // let bnum = Api.allianceTaskVoApi.getBuffBuyTimes(buffId);
            var bnum = Number(data[4]);
            var costV = data[5];
            var addV = (buffcfg.value * 100); //(addV).toFixed(1)
            if (bnum > 0) {
                addV *= bnum;
            }
            var addStr = "";
            if (buffcfg.type.length == 1) {
                addStr = LanguageManager.getlocal("servantInfo_speciality" + buffcfg.type[0]);
            }
            else {
                addStr = LanguageManager.getlocal("servantInfo_speciality7");
            }
            // if(bnum < buffcfg.costAsset.length){
            // 	costV = buffcfg.costAsset[bnum -1];
            // }else{
            // 	costV = buffcfg.costAsset[buffcfg.costAsset.length -1];
            // }
            var buffName = LanguageManager.getlocal("allianceTaskBuffName" + buffId);
            str = LanguageManager.getlocal("alliancelogdes" + data[0], [costV + "", buffName, addStr, "" + ((addV).toFixed(1))]);
            return str;
        }
        if (data[0] == 18) {
            //领取了帮会任务 {1} 完成奖励，帮会财富增加 {2}
            var taskData = Config.AlliancetaskCfg.getAllianceTaskById("" + data[3]);
            var taskName = LanguageManager.getlocal("allianceTaskName" + data[3]);
            str = LanguageManager.getlocal("alliancelogdes" + data[0], [taskName, "" + taskData.completeAsset]);
            return str;
        }
        if (data[0] == 19) {
            //花费 {1} 帮会财富，购买了帮会加成，今日勤王除恶战斗加成提升至{3}
            var addV = Math.round(Number(data[3]) * Config.AllianceweekendCfg.powerUp.powerAdd * 100);
            str = LanguageManager.getlocal("alliancelogdes" + data[0], [data[4], "" + addV]);
            return str;
        }
        str = LanguageManager.getlocal("alliancelogdes" + data[0]);
        return str;
    };
    AllianceVoApi.prototype.getBossStr = function (data) {
        var str = LanguageManager.getlocal("alliancelogdes13", [data.name, data.dps]);
        return str;
    };
    AllianceVoApi.prototype.openMainView = function () {
        if (this.getOpenViewMessage()) {
            App.CommonUtil.showTip(this.getOpenViewMessage());
            return;
        }
        if (Api.playerVoApi.getPlayerAllianceId() == 0) {
            ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCECREATEVIEW);
        }
        else {
            ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCEVIEW);
        }
    };
    AllianceVoApi.prototype.getServantInfoValue = function (k) {
        var v = this._myAllianceVo.servant[k];
        if (v == null) {
            v = 0;
        }
        return v;
    };
    AllianceVoApi.prototype.getBossHp = function (k) {
        var v = 0;
        if (this._allianceVo.boss && this._allianceVo.boss[k]) {
            v = this._allianceVo.boss[k];
        }
        return v;
    };
    /** 获取加入帮会时间 */
    AllianceVoApi.prototype.getJoinTime = function () {
        if (this._myAllianceVo && this._myAllianceVo.joint) {
            return this._myAllianceVo.joint;
        }
        return 0;
    };
    /** 今日帮会踢人次数 */
    AllianceVoApi.prototype.getKickCount = function () {
        if (this._allianceVo && this._allianceVo.info && this._allianceVo.info.kickNum) {
            return this._allianceVo.info.kickNum;
        }
        return 0;
    };
    AllianceVoApi.prototype.getDecreePolicyAddAttrInfo = function () {
        return Api.promoteVoApi.getDecreePolicyAddAttrInfo("alliance", 10);
    };
    AllianceVoApi.prototype.getExpLog = function () {
        return this._allianceVo.explog;
    };
    AllianceVoApi.prototype.getAllianceTaskPKTimes = function (servantId) {
        var taskservant = this._myAllianceVo.info.taskservant;
        if (taskservant && taskservant[servantId]) {
            return taskservant[servantId];
        }
        return 0;
    };
    AllianceVoApi.prototype.isShowConfirmWhenJoin = function () {
        var regdt = Api.gameinfoVoApi.getRegdt();
        if (GameData.serverTime - regdt >= 60 * 60 * 24 * 7) {
            return true;
        }
        return false;
    };
    /**帮会累计充值 跳转到正在进行的活动 */
    AllianceVoApi.prototype.getInProgressRechargeTotal = function (arr) {
        for (var i in arr) {
            var vo = Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_AllIANCERECHARGETOTAL, arr[i].bindData.code);
            if (vo.isActivityPeriod()) {
                return arr[i];
            }
        }
        return arr[0];
    };
    /**帮会充值 跳转到正在进行的活动 */
    AllianceVoApi.prototype.getInProgressRechargeCount = function (arr) {
        for (var i in arr) {
            var vo = Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_AllIANCERECHARGECOUNT, arr[i].bindData.code);
            if (vo.isActivityPeriod()) {
                return arr[i];
            }
        }
        return arr[0];
    };
    /**boss是否能开启精英 */
    AllianceVoApi.prototype.checkBossCanOpenElite = function (bossId) {
        var eliteNeedLv = Config.AlliancebaseCfg.eliteNeedLv;
        var alliVo = this._allianceVo;
        var eliteBossId = 'e' + bossId;
        var maxEliteBossLv = Config.AllianceelitebossCfg.getMaxLength();
        if (alliVo.level >= eliteNeedLv
            && alliVo.boss.clear
            && Number(bossId) <= maxEliteBossLv
            && alliVo.boss[eliteBossId] == null) {
            return true;
        }
        else {
            return false;
        }
    };
    /**获取无限boss开启等级 */
    AllianceVoApi.prototype.getLimitlessBossOpenLevel = function () {
        var data = Config.AlliancebossCfg.getAllainceCfgIdList();
        for (var key in data) {
            var cfg = Config.AlliancebossCfg.getAllianceCfgByLv(data[key]);
            if (cfg.attribution1) {
                return cfg.needAllianceLv;
            }
        }
        return 0;
    };
    /**获取无限boss id */
    AllianceVoApi.prototype.getLimitlessBossId = function () {
        var data = Config.AlliancebossCfg.getAllainceCfgIdList();
        for (var key in data) {
            var cfg = Config.AlliancebossCfg.getAllianceCfgByLv(data[key]);
            if (cfg.attribution1) {
                return data[key];
            }
        }
        return null;
    };
    /**是否能开启无限boss */
    AllianceVoApi.prototype.checkOpenLimitlessBoss = function () {
        var needLv = this.getLimitlessBossOpenLevel();
        var alliVo = this._allianceVo;
        if (needLv > 0 && alliVo && alliVo.level >= needLv && alliVo.boss.eliteClear) {
            return true;
        }
        return false;
    };
    /**当日无限boss是否结束 */
    AllianceVoApi.prototype.checkLimitlessBossIsEnd = function () {
        var nextDay = App.DateUtil.getWeeTs(GameData.serverTime) + 86400;
        var et = nextDay - 30 * 60;
        if (GameData.serverTime >= et && GameData.serverTime < nextDay) {
            return true;
        }
        return false;
    };
    AllianceVoApi.prototype.dispose = function () {
        this._allianceVo = null;
        this._myAllianceVo = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceVoApi;
}(BaseVoApi));
//# sourceMappingURL=AllianceVoApi.js.map