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
 * 子嗣系统api
 * author dky
 * date 2017/10/28
 * @class AdultVoApi
 */
var AdultVoApi = (function (_super) {
    __extends(AdultVoApi, _super);
    function AdultVoApi() {
        var _this = _super.call(this) || this;
        // 子嗣扩展槽
        _this.posnum = 0;
        _this.param = null;
        _this._receiveInfo = null;
        _this._getvisitInfo = null;
        return _this;
    }
    AdultVoApi.prototype.checkNpcMessage = function () {
        // let propNum:number = -1;
        // if (this._adultVo && this._adultVo.adultInfoVoObj)
        // {
        // 	for (let k in this._adultVo.adultInfoVoObj)
        // 	{
        // 		let info = this._adultVo.adultInfoVoObj[k];
        // 		if (info.visit == 0)
        // 		{
        // 			let itemUseCount = Api.adultVoApi.getVisitUseByQuality(info.aquality);
        // 			if (propNum == -1)
        // 			{
        // 				propNum = itemUseCount;
        // 			}
        // 			else if (propNum>itemUseCount)
        // 			{
        // 				propNum = itemUseCount;
        // 			}
        // 		}
        // 	}
        // }
        //this._adultVo.adultInfoVoObj;
        if ((this._marryList && this._marryList.length && this._marryList.length > 0 || (this.getVisitNum() > 0) || this.getReceiveData().length > 0)) {
            // return LanguageManager.getlocal("adultTipMessage");
            return true;
        }
        return false;
    };
    /**
     * 检测是否显示子嗣Npc
     */
    AdultVoApi.prototype.isShowNpc = function () {
        if (this.getAdultNum() > 0 || this.getAdultMarryNum() > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    AdultVoApi.prototype.getLockedString = function () {
        return LanguageManager.getlocal("reachConditionsUnlockDesc");
    };
    AdultVoApi.prototype.formatData = function (data) {
        if (this._adultVo == null) {
            this._adultVo = new AdultVo();
        }
        if (this._adultMarryVo == null) {
            this._adultMarryVo = new AdultMarryVo();
        }
        if (this._sadunVo == null) {
            this._sadunVo = new SadunVo();
        }
        this._adultVo.initData(data.info);
        this._adultMarryVo.initData(data.minfo);
        this._marryList = data.marry;
        this._refuseData = data.refuse;
        _super.prototype.formatData.call(this, data);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULTFRESH);
    };
    AdultVoApi.prototype.formatMinfo = function (data) {
        if (this._adultMarryVo == null) {
            this._adultMarryVo = new AdultMarryVo();
        }
        this._adultMarryVo.initData(data.minfo);
    };
    // 获取子嗣扩展槽
    AdultVoApi.prototype.getChildPosNum = function () {
        var num = Api.childVoApi.getChildPosNum();
        return num;
    };
    // 获取成年子嗣数量
    AdultVoApi.prototype.getAdultNum = function () {
        var num = this.getAdultVoList().length;
        return num;
    };
    // 获取成年结婚子嗣数量
    AdultVoApi.prototype.getAdultMarryNum = function () {
        var num = this.getAdultMarryVoList().length;
        return num;
    };
    // 获取子嗣数组
    AdultVoApi.prototype.getAdultVoList = function () {
        var arr = new Array();
        if (!this._adultVo) {
            return arr;
        }
        var adultInfoVoObj = this._adultVo.adultInfoVoObj;
        for (var key in adultInfoVoObj) {
            arr.push(adultInfoVoObj[key]);
        }
        // todo对数组进行排序
        arr.sort(function (a, b) {
            if (a.aquality == b.aquality) {
                return Number(b.attrVo.attTotal) - Number(a.attrVo.attTotal);
                // return Number(a.ts) - Number(b.ts);
            }
            else {
                return Number(b.aquality) - Number(a.aquality);
            }
            // return 0;
        });
        return arr;
    };
    // 获取成亲子嗣数组
    AdultVoApi.prototype.getAdultMarryVoList = function () {
        var arr = new Array();
        if (!this._adultMarryVo) {
            return arr;
        }
        var adultInfoVoObj = this._adultMarryVo.adultInfoVoObj;
        for (var key in adultInfoVoObj) {
            arr.push(adultInfoVoObj[key]);
        }
        arr.sort(function (a, b) {
            return Number(b.mts) - Number(a.mts);
            // return 0;
        });
        return arr;
    };
    /**
     * 根据性别资质获取可以联姻的子嗣列表
     * @param id 子嗣id
     */
    AdultVoApi.prototype.getAdultVoListById = function (quality, sex) {
        var arr = this.getAdultVoList();
        var arr2 = new Array();
        for (var index = 0; index < arr.length; index++) {
            var element = arr[index];
            if (element.aquality == quality && element.sex != sex && !this.getAdultIsInMarry(element.id) && this.notInVisit(element.id)) {
                arr2.push(element);
            }
        }
        return arr2;
    };
    /**
     * 根据性别资质获取可以联姻的子嗣列表/属性降序
     * @param id 子嗣id
     */
    AdultVoApi.prototype.getAdultVoListByIdByAttr = function (quality, sex) {
        var arr = this.getAdultVoListById(quality, sex);
        arr.sort(function (a, b) {
            return Number(b.attrVo.attTotal) - Number(a.attrVo.attTotal);
            // return 0;
        });
        return arr;
    };
    /**
     * 根据子嗣id获取子嗣vo
     * @param id 子嗣id
     */
    AdultVoApi.prototype.getAdultInfoVoById = function (id) {
        var adultInfoVoObj = this._adultVo ? this._adultVo.adultInfoVoObj : null;
        if (adultInfoVoObj && adultInfoVoObj[id]) {
            return adultInfoVoObj[id];
        }
        return null;
    };
    /**
     * 根据子嗣id获取成亲子嗣vo
     * @param id 子嗣id
     */
    AdultVoApi.prototype.getAdultMarryInfoVoById = function (id) {
        var adultInfoVoObj = this._adultMarryVo ? this._adultMarryVo.adultInfoVoObj : null;
        if (adultInfoVoObj && adultInfoVoObj[id]) {
            return adultInfoVoObj[id];
        }
        return null;
    };
    /**
     * 根据子嗣id获取子嗣列表位置
     * @param id 子嗣id
     */
    AdultVoApi.prototype.getAdultIndexVoById = function (id) {
        var adultVolist = this.getAdultVoList();
        for (var i = 0; i < adultVolist.length; i++) {
            if (id == adultVolist[i].id) {
                return i;
            }
        }
        return 0;
    };
    /**
     * 根据子嗣id获取结婚子嗣列表位置
     * @param id 子嗣id
     */
    AdultVoApi.prototype.getAdultMarryIndexVoById = function (id) {
        var adultVolist = this.getAdultMarryVoList();
        for (var i = 0; i < adultVolist.length; i++) {
            if (id == adultVolist[i].id) {
                return i;
            }
        }
        return 0;
    };
    // 获取子嗣是否在提亲
    AdultVoApi.prototype.getAdultIsInMarry = function (id) {
        var adultInfoVo = this.getAdultInfoVoById(id);
        var lastTime = 0;
        if (adultInfoVo && adultInfoVo.pro && adultInfoVo.pro[0] && adultInfoVo.pro[1] < 3) {
            lastTime = adultInfoVo.pro[0] - GameData.serverTime;
        }
        if (lastTime > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    // 获取子嗣图片
    AdultVoApi.prototype.getAdultPic = function (id) {
        var adultInfoVo = this.getAdultInfoVoById(id);
        var childPic = "adult_boy";
        if (adultInfoVo.sex == 2) {
            childPic = "adult_girl";
        }
        if (Api.switchVoApi.checkOpenAdultImage() && adultInfoVo.aquality != 7) {
            childPic = "adult_" + adultInfoVo.sex + "_" + adultInfoVo.aquality;
        }
        return childPic;
    };
    // 获取子嗣图片
    AdultVoApi.prototype.getAdultHalfPic = function (sex, aquality) {
        var childPic = "child_state_3_1";
        if (sex == 2) {
            childPic = "child_state_3_2";
        }
        if (Api.switchVoApi.checkOpenAdultImage() && aquality != 7) {
            childPic = "child_state_3_" + sex + "_" + aquality;
        }
        return childPic;
    };
    // 获取子嗣说的话
    AdultVoApi.prototype.getAdultWord = function (id) {
        var childInfoVo = this.getAdultInfoVoById(id);
        var childCfg = GameConfig.config.childCfg[childInfoVo.quality.toString()];
        //刷新等级
        var childState = childInfoVo.level / childCfg.lv;
        var childWords = "";
        var wordIndex = 1;
        if (childState < 0.4) {
            wordIndex = App.MathUtil.getRandom(1, 3);
            childWords = LanguageManager.getlocal("child_words1_" + wordIndex);
        }
        else if (childState >= 0.4 || childState < 1) {
            wordIndex = App.MathUtil.getRandom(1, 5);
            childWords = LanguageManager.getlocal("child_words2_" + wordIndex);
        }
        else {
        }
        return childWords;
    };
    //判断某玩家是否已经正在拜访
    AdultVoApi.prototype.isUidInVisit = function (uid) {
        if (this._sadunVo.info && this._sadunVo.info[uid]) {
            return this._sadunVo.info[uid].visiting != '';
        }
        else {
            return false;
        }
    };
    //判断某子嗣是否已在拜访中 或者已拜访过
    AdultVoApi.prototype.isChildCanVisit = function (childid) {
        if (this.getAdultIsInMarry(childid)) {
            return false;
        }
        var flag1 = this.isVisited(childid);
        var flag2 = this.notInVisit(childid);
        if (!flag1 && flag2) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * 获取某子嗣拜访所需要的礼物数目
     */
    AdultVoApi.prototype.getVisitUseByQuality = function (quality) {
        var cfg = Config.SadunCfg;
        return cfg.visitNeedGift[quality - 1];
    };
    /**
     * 判断是否是亲家
     */
    AdultVoApi.prototype.judgeIsSudan = function (uid) {
        var flag = false; //
        if (this._sadunVo.info) {
            if (this._sadunVo.info[uid] && this._sadunVo.info[uid].times >= Config.SadunCfg.needNum) {
                flag = true;
            }
        }
        return flag;
    };
    AdultVoApi.prototype.getLyinnum = function (uid) {
        var num = 0;
        if (this._sadunVo.info && this._sadunVo.info[uid]) {
            num = this._sadunVo.info[uid].times;
        }
        return num;
    };
    AdultVoApi.prototype.getFreiendNums = function (uid) {
        var quality = 1;
        var percent = 0;
        var friendnums = 0;
        if (this._sadunVo.info && this._sadunVo.info[uid]) {
            friendnums = this._sadunVo.info[uid].friend;
            for (var i in Config.SadunCfg.friendlinessList) {
                var unit = Config.SadunCfg.friendlinessList[i];
                if (friendnums < unit.needFriendliness) {
                    quality = Number(i) - 1;
                    percent = friendnums / unit.needFriendliness;
                    break;
                }
            }
            if (friendnums >= 5000) {
                quality = 5;
                percent = 1;
            }
        }
        return {
            num: friendnums,
            quality: quality,
            percent: percent
        };
    };
    //好友中用到的,
    AdultVoApi.prototype.getFreiendNums2 = function (friendnums) {
        var quality = 1;
        var percent = 0;
        for (var i in Config.SadunCfg.friendlinessList) {
            var unit = Config.SadunCfg.friendlinessList[i];
            if (friendnums < unit.needFriendliness) {
                quality = Number(i) - 1;
                percent = friendnums / unit.needFriendliness;
                break;
            }
        }
        if (friendnums >= 5000) {
            quality = 5;
            percent = 1;
        }
        return {
            num: friendnums,
            quality: quality,
            percent: percent
        };
    };
    //获取访等级 0 无访问 1拜访过 2来访问过 3互访过
    AdultVoApi.prototype.getVisitLevel = function (childInfo) {
        var flag1 = 0;
        var flag2 = 0;
        var flag3 = 0;
        var info = this.getAdultVoList();
        var uid = childInfo.uid;
        for (var i in info) {
            if (info[i] && info[i].visit == uid) {
                flag1 = 1;
                break;
            }
        }
        if (childInfo.visit && childInfo.visit == Api.playerVoApi.getPlayerID()) {
            flag2 = 1;
        }
        if (flag1 && flag2) {
            return 3;
        }
        else if (flag1) {
            return 1;
        }
        else if (flag2) {
            return 2;
        }
        //return flag1 + flag2;
    };
    AdultVoApi.prototype.getVisitNum = function () {
        if (this._sadunVo.receive) {
            return Object.keys(this._sadunVo.receive).length;
        }
        else {
            return 0;
        }
    };
    AdultVoApi.prototype.getALlMarryPlayerInfo = function () {
        var arr1 = [];
        var arr2 = [];
        if (this._sadunVo.info) {
            for (var i in this._sadunVo.info) {
                var unit = this._sadunVo.info[i];
                if (unit.times >= Config.SadunCfg.needNum) {
                    arr1.push(unit);
                }
                else {
                    arr2.push(unit);
                }
            }
        }
        return {
            sadun: arr1,
            notsadun: arr2
        };
    };
    AdultVoApi.prototype.judgeWifeIsInReceive = function (wifeid) {
        if (this._sadunVo.wife && this._sadunVo.wife[wifeid]) {
            return this._sadunVo.wife[wifeid] ? true : false;
        }
        else {
            return false;
        }
    };
    AdultVoApi.prototype.init_sadun_data = function (data) {
        if (data && Object.keys(data).length) {
            if (this._sadunVo == null) {
                this._sadunVo = new SadunVo();
            }
            this._sadunVo.initData(data);
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_SUDANFRESH);
        }
    };
    AdultVoApi.prototype.getQinjiaInfo = function () {
        return this._sadunVo.info;
    };
    AdultVoApi.prototype.notInVisit = function (cid) {
        var adultInfoVo = this.getAdultInfoVoById(cid);
        var flag = true;
        if (adultInfoVo.pro && adultInfoVo.pro[1] == 3 && adultInfoVo.pro[0]) {
            var lastTime = GameData.serverTime - adultInfoVo.pro[0];
            if (lastTime < 0) {
                flag = false;
            }
        }
        return flag;
    };
    AdultVoApi.prototype.isVisited = function (cid) {
        var adultInfoVo = this.getAdultInfoVoById(cid);
        var visited = false;
        if (adultInfoVo.visit) {
            visited = true;
        }
        return visited;
    };
    AdultVoApi.prototype.getChildVisitTarget = function (cid) {
        if (this._sadunVo.info) {
            for (var i in this._sadunVo.info) {
                var unit = this._sadunVo.info[i];
                if (unit.visiting == cid) {
                    return i;
                }
            }
        }
        return null;
    };
    AdultVoApi.prototype.setVisitId = function (uid) {
        this._visitid = uid;
    };
    AdultVoApi.prototype.getVisitId = function () {
        return this._visitid;
    };
    AdultVoApi.prototype.getSadunInfoByUid = function (uid) {
        if (this._sadunVo.info && this._sadunVo.info[uid]) {
            return this._sadunVo.info[uid];
        }
        else {
            return { name: '' };
        }
    };
    AdultVoApi.prototype.getVisitRequestList = function () {
        if (this._sadunVo.receive) {
            return this._sadunVo.receive;
        }
        else {
            return [];
        }
    };
    AdultVoApi.prototype.isUidVisited = function (uid) {
        var arr1 = this.getAdultVoList();
        for (var i in arr1) {
            var unit = arr1[i];
            if (unit.visit && unit.visit == uid) {
                return true;
            }
        }
        return false;
    };
    AdultVoApi.prototype.getReceiveData = function () {
        var arr = [];
        if (this._sadunVo.visited) {
            for (var i in this._sadunVo.visited) {
                var unit = this._sadunVo.visited[i];
                arr.push({
                    visitwife: unit.visitwife,
                    oldattr: unit.oldattr,
                    childid: i,
                    nowattr: unit.nowattr,
                    cname: unit.cname
                });
            }
        }
        return arr;
    };
    AdultVoApi.prototype.clearReceiveData = function () {
        if (this._sadunVo.visited) {
            this._sadunVo.visited = {};
        }
    };
    AdultVoApi.prototype.setReceiveWifeInfo = function (info) {
        this._receiveInfo = null;
        this._receiveInfo = info;
    };
    AdultVoApi.prototype.getReceiveWifeInfo = function () {
        return this._receiveInfo;
    };
    AdultVoApi.prototype.setVisitInfo = function (info) {
        this._getvisitInfo = null;
        this._getvisitInfo = info;
    };
    //是否来访
    AdultVoApi.prototype.isLaifang = function (uid) {
        if (this._getvisitInfo) {
            return typeof this._getvisitInfo[uid] != 'undefined' && this._getvisitInfo[uid] == 1;
        }
        return false;
    };
    AdultVoApi.prototype.getSadunRefuse = function () {
        if (this._sadunVo.refuse) {
            return this._sadunVo.refuse;
        }
        else {
            return '';
        }
    };
    AdultVoApi.prototype.clearSadunRefuse = function () {
        if (this._sadunVo.refuse) {
            this._sadunVo.refuse = '';
        }
    };
    AdultVoApi.prototype.isSadunCanVisit = function (uid, propNum) {
        if (propNum == -1) {
            return false;
        }
        if (Api.switchVoApi.checkopenSadun()) {
            var adultvolist = Api.adultVoApi.getAdultVoList();
            if (this._sadunVo.info && adultvolist.length > 0) {
                for (var i in this._sadunVo.info) {
                    var flag = false;
                    if (uid) {
                        flag = this.isChildCanVisit(uid);
                    }
                    else {
                        for (var j in adultvolist) {
                            if (this.isChildCanVisit(adultvolist[j].id)) {
                                flag = true;
                                break;
                            }
                        }
                    }
                    if (this._sadunVo.info[i].times >= Config.SadunCfg.needNum && this._sadunVo.info[i].visiting == '' && flag && Api.itemVoApi.getItemNumInfoVoById("1411") >= propNum) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    AdultVoApi.prototype.isCanSendVisit = function () {
        var cfg = Config.SadunCfg;
        var info = this.getAdultVoList();
        var count = 0;
        for (var i in info) {
            var unit = info[i];
            if (unit.pro && unit.pro[1] == 3) {
                ++count;
            }
        }
        return count < cfg.maxReception;
    };
    AdultVoApi.prototype.dispose = function () {
        this._adultVo = null;
        this.posnum = 0;
        this._marryList = null;
        this._refuseData = null;
        this.param = null;
        _super.prototype.dispose.call(this);
    };
    return AdultVoApi;
}(BaseVoApi));
__reflect(AdultVoApi.prototype, "AdultVoApi");
//# sourceMappingURL=AdultVoApi.js.map