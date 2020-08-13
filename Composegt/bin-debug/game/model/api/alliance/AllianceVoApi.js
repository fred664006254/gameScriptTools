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
 * 帮会api
 * author dky
 * date 2017/11/27
 * @class AllianceVoApi
 */
var AllianceVoApi = (function (_super) {
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
        if (Api.composemapVoApi.getMaxLv() >= Config.AlliancebaseCfg.unlock) {
            boo = true;
        }
        else {
            boo = false;
        }
        return boo;
    };
    AllianceVoApi.prototype.getLockedString = function () {
        return LanguageManager.getlocal("composeUnlockFuncDesc", [Config.AlliancebaseCfg.unlock + ""]);
    };
    AllianceVoApi.prototype.getIsDonatet = function () {
        var myVo = Api.allianceVoApi.getMyAllianceVo();
        if (myVo.donate.id) {
            if (myVo.donate.et > App.DateUtil.getWeeTs(GameData.serverTime)) {
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
            var bossCfg = Config.AlliancebossCfg.getAllianceCfgByLv(data[4]);
            // 财富  
            if (data[3] == 1) {
                var bossName = LanguageManager.getlocal("allianceBoss_monsterName" + data[4]);
                str = LanguageManager.getlocal("alliancelogdes" + data[0], [bossCfg.needAsset + "", bossName]);
                return str;
            }
            else {
                var bossName = LanguageManager.getlocal("allianceBoss_monsterName" + data[4]);
                str = LanguageManager.getlocal("alliancelogdes" + 12, [bossCfg.needGem + "", bossName]);
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
            var bossCfg = Config.AlliancebossCfg.getAllianceCfgByLv(data[3]);
            var bossName = LanguageManager.getlocal("allianceBoss_monsterName" + data[3]);
            var itemvo = GameData.formatRewardItem(data[4]);
            str = LanguageManager.getlocal("alliancelogdes" + data[0], [bossName, bossCfg.addExp + "", bossCfg.addAsset + "", data[5] + "", itemvo[0]._name + "x" + itemvo[0].num + ""]);
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
        if (data[0] == 51) {
            var timeStr = App.DateUtil.getFormatBySecond(data[1], 6);
            var cost = Config.AlliancebaseCfg.infinityNeedAsset;
            var oname = LanguageManager.getlocal("allianceBoss_infinity");
            str = LanguageManager.getlocal("alliancelogdes51", ["" + cost, oname]);
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
    //是否隐藏帮会QQ
    AllianceVoApi.prototype.isHideQQ = function () {
        if (PlatformManager.checkIsJPSp()) {
            return true;
        }
        return false;
    };
    AllianceVoApi.prototype.getAllianceTaskPKTimes = function (servantId) {
        if (this._myAllianceVo.lastday < App.DateUtil.getWeeTs(GameData.serverTime)) {
            return 0;
        }
        var taskservant = this._myAllianceVo.info.taskservant;
        if (taskservant && taskservant[servantId]) {
            return taskservant[servantId];
        }
        return 0;
    };
    AllianceVoApi.prototype.dispose = function () {
        this._allianceVo = null;
        this._myAllianceVo = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceVoApi;
}(BaseVoApi));
__reflect(AllianceVoApi.prototype, "AllianceVoApi");
