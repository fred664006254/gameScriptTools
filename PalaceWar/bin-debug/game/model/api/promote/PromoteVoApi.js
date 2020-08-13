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
var PromoteVoApi = (function (_super) {
    __extends(PromoteVoApi, _super);
    function PromoteVoApi() {
        var _this = _super.call(this) || this;
        _this._promoteList = []; //{uid = 10001,vip = 1,level =3,pic = 4,name = "aa"}
        _this._promotePlayerList = []; //{uid = 10001,vip = 1,level =3,pic = 4,name = "aa"}
        _this._showNotice = false;
        _this._ishaveking = 0;
        return _this;
    }
    PromoteVoApi.prototype.formatData = function (data) {
        var view = this;
        if (!view._promoteVo) {
            view._promoteVo = new PromoteVo();
        }
        view._promoteVo.initData(data);
    };
    PromoteVoApi.prototype.initListData = function (data) {
        if (data && data.promoteList) {
            this._promoteList = [];
            this._promoteList = data.promoteList;
        }
    };
    PromoteVoApi.prototype.initPlayerListData = function (data) {
        if (data && data.userList) {
            this._promotePlayerList = [];
            for (var i in data.userList) {
                //userList = { 1 = {uid,权势,名称,称号,头像}}
                var unit = data.userList[i];
                this._promotePlayerList.push({
                    'uid': unit[0],
                    'power': unit[1],
                    'name': unit[2],
                    'title': unit[3],
                    'pic': unit[4],
                    'phototitle': unit[5]
                });
            }
        }
    };
    PromoteVoApi.prototype.getPromoteList = function () {
        return this.arr2obj(this._promoteList, 'position');
    };
    PromoteVoApi.prototype.getPromotePlayerList = function () {
        return this._promotePlayerList;
    };
    PromoteVoApi.prototype.isKing = function () {
        return this._promoteVo.king == 1;
    };
    PromoteVoApi.prototype.getKingEndtime = function () {
        return this._promoteVo.et;
    };
    PromoteVoApi.prototype.isInPromoteList = function (uid) {
        var list = this.arr2obj(this._promoteList, 'uid');
        if (list[uid]) {
            return true;
        }
        return false;
    };
    PromoteVoApi.prototype.getSelfPosition = function () {
        return this._promoteVo.position;
    };
    PromoteVoApi.prototype.isPositionEmpty = function () {
        if (!this._promoteList.length) {
            return false;
        }
        var list = this.arr2obj(this._promoteList, 'position');
        for (var i = 1; i < 8; ++i) {
            if (!list[i] || !list[i].uid) {
                return true;
            }
        }
        return false;
    };
    PromoteVoApi.prototype.arr2obj = function (arr, key) {
        var obj = {};
        if (arr) {
            var ln = arr.length;
            if (ln) {
                for (var i = 0; i < ln; i++) {
                    var cd = arr[i];
                    obj[cd[key]] = cd;
                }
            }
        }
        return obj;
    };
    PromoteVoApi.prototype.getSpid = function () {
        return this._promoteVo.spinfo.spid;
    };
    PromoteVoApi.prototype.getSinfo = function () {
        return this._promoteVo.spinfo;
    };
    PromoteVoApi.prototype.getSpidLastTimes = function () {
    };
    PromoteVoApi.prototype.getGdinfo = function () {
        return this._promoteVo.gdinfo;
    };
    PromoteVoApi.prototype.isDuringDiscussionTime = function () {
        var leveeTime = Config.PolicyCfg.leveeTime;
        var serSecs = GameData.serverTime;
        var dayZeroSec = App.DateUtil.getWeeTs(serSecs);
        if (serSecs >= dayZeroSec + leveeTime[0] * 60 * 60 && serSecs <= dayZeroSec + leveeTime[1] * 60 * 60) {
            return true;
        }
        return false;
    };
    PromoteVoApi.prototype.getDecreeAddInfo = function (paperType, policyType) {
        var decreeId = this.getGdinfo().gdid;
        var policyId = this.getSpid();
        if (Number(decreeId) == 0 && Number(policyId) == 0) {
            return null;
        }
        var times = 0;
        var extent = 0;
        var decdg = Config.PolicyCfg.getGovDecreeById(decreeId);
        var paperStr = "";
        if (paperType == decdg.type) {
            paperStr = LanguageManager.getlocal("decreePaperTxt");
            times = decdg.addTimes1;
            extent = decdg.addExtent1;
            if (!this.isKing()) {
                times = decdg.addTimes2;
                extent = decdg.addExtent2;
            }
        }
        var strKey = "decreeAttrAddTxt0";
        var policyStr = "";
        if (Number(policyId) > 0 && policyType == Number(policyId)) {
            policyStr = LanguageManager.getlocal("decreePolicyTxt") + ",";
            var policyCfg = Config.PolicyCfg.getPolicyById(policyId);
            if (Api.palaceVoApi.isInKingsHouse()) {
                times += policyCfg.emAddTimes;
                extent += policyCfg.emAddExtent;
            }
            else {
                times += policyCfg.addTimes;
                extent += policyCfg.addExtent;
            }
            // strKey = "decreeAttrAddTxt2";
        }
        if (paperType == 6 || paperType == 7) {
            strKey = "decreeAttrAddTxt" + paperType;
        }
        var useTimes = Api.promoteVoApi.getGdinfo().effinfo[decdg.id] || 0;
        return { addTimes: times, addExtent: extent, strKey: strKey, lastTimes: times - useTimes };
    };
    /**
     * type: 政令类型不同，作用的数据类型不同
     * 1 日前X次 经营银两
     * 2 日前X次 经营粮食
     * 3 日前X次 经营士兵
     * 4 日前X次 关卡+武力
     * 5 日前X次 擂台+攻击力
     * 6 日前X次 征伐+武力
     * 7 日前X次宠信红颜，减少Y的元宝消耗
     * 8 每日前X次商贸，智力提升Y
     */
    PromoteVoApi.prototype.getDecreeAddAttrInfo = function (paperType) {
        var decreeId = this.getGdinfo().gdid;
        if (Number(decreeId) == 0) {
            return null;
        }
        var times = 0;
        var extent = 0;
        var decdg = Config.PolicyCfg.getGovDecreeById(decreeId);
        if (paperType == decdg.type) {
            if (this.ismore()) {
                extent = decdg.leveeTimeEff1;
                times = decdg.addTimes1;
                if (!this.isKing()) {
                    times = decdg.addTimes2;
                    extent = decdg.leveeTimeEff2;
                }
            }
            else {
                extent = decdg.addExtent1;
                times = decdg.addTimes1;
                if (!this.isKing()) {
                    times = decdg.addTimes2;
                    extent = decdg.addExtent2;
                }
            }
        }
        return { addTimes: times, addExtent: extent };
    };
    /**
     * 目前国策在不同的大功能下起作用
     */
    PromoteVoApi.prototype.getPolicyAddAttrInfo = function () {
        var policyId = this.getSpid();
        var policyCfg = Config.PolicyCfg.getPolicyById(policyId);
        var times = 0;
        var extent = 0;
        if (Api.palaceVoApi.isInKingsHouse()) {
            times = policyCfg.emAddTimes;
            extent = policyCfg.emAddExtent;
        }
        else {
            times = policyCfg.addTimes;
            extent = policyCfg.addExtent;
        }
        return { addTimes: times, addExtent: extent };
    };
    PromoteVoApi.prototype.getDecreePolicyAddAttrInfo = function (policyStr, decreeType) {
        var policyId = this.getSpid();
        var times = 0;
        var extent = 0;
        var strKey = "";
        var strKey2 = "";
        var useTimes = 0;
        var suTimes = 0;
        var duTimes = 0;
        if (policyStr && Number(policyId) > 0) {
            var policyCfg = Config.PolicyCfg.getPolicyById(policyId);
            if (policyStr == policyCfg.type2) {
                var attrInfo = this.getPolicyAddAttrInfo();
                suTimes = Api.promoteVoApi.getSinfo().effinfo[policyId];
                if (!suTimes)
                    suTimes = 0;
                // if(suTimes < attrInfo.addTimes)
                {
                    times += attrInfo.addTimes;
                    extent += attrInfo.addExtent;
                    strKey2 = LanguageManager.getlocal("decree_rescriptTxt1");
                    if (PlatformManager.checkIsThSp()) {
                        strKey2 = strKey2.replace(/\n/g, "");
                    }
                    //大臣加成
                    var selfPos = this.getSelfPosition();
                    if (selfPos > 0) {
                        var promoCfg = Config.PromoteCfg.positionList[selfPos - 1];
                        if (promoCfg && promoCfg["effect1"]) {
                            if (Number(policyId) == 2) {
                                times += promoCfg["effect" + policyId];
                            }
                            else {
                                extent += promoCfg["effect" + policyId];
                            }
                        }
                    }
                }
                // useTimes += suTimes;
            }
        }
        var decreeId = this.getGdinfo().gdid;
        strKey = "decreeAttrAddTxt0";
        if (Number(decreeId) > 0) {
            var decdg = Config.PolicyCfg.getGovDecreeById(decreeId);
            if (decreeType == decdg.type) {
                var attrInfo = this.getDecreeAddAttrInfo(decreeType);
                duTimes = Api.promoteVoApi.getGdinfo().effinfo[decreeId];
                if (!duTimes)
                    duTimes = 0;
                // if(duTimes < attrInfo.addTimes){
                times += attrInfo.addTimes;
                extent += attrInfo.addExtent;
                // strKey = "decreeAttrAddTxt2";
                if (strKey2 != "") {
                    if (PlatformManager.checkIsThSp()) {
                        var str = LanguageManager.getlocal("decree_rescriptTxt2");
                        str = str.replace(/\n/g, "");
                        strKey2 = strKey2 + "," + str;
                    }
                    else {
                        strKey2 = strKey2 + "," + LanguageManager.getlocal("decree_rescriptTxt2");
                    }
                }
                else {
                    if (PlatformManager.checkIsThSp()) {
                        var str = LanguageManager.getlocal("decree_rescriptTxt2");
                        str = str.replace(/\n/g, "");
                        strKey2 = str;
                    }
                    else {
                        strKey2 = LanguageManager.getlocal("decree_rescriptTxt2");
                    }
                }
                // }
            }
        }
        useTimes = Math.max(suTimes, duTimes);
        // if( !policyStr || Number(policyId) == 0)
        // {
        // }else
        if (decreeType == 6 || decreeType == 7) {
            strKey = "decreeAttrAddTxt" + decreeType;
        }
        return { addTimes: times, addExtent: extent, strKey: strKey, strKey2: strKey2, lastTimes: times - useTimes };
    };
    PromoteVoApi.prototype.isShowRedForPolicyRead = function () {
        if (Number(this._promoteVo.spinfo.spid) != 0 && this._promoteVo.spinfo.isread != 1) {
            return true;
        }
        return false;
    };
    PromoteVoApi.prototype.isShowRedForDecreeRead = function () {
        if (Number(this._promoteVo.gdinfo.gdid) != 0 && this._promoteVo.gdinfo.isread != 1) {
            return true;
        }
        return false;
    };
    PromoteVoApi.prototype.ismore = function () {
        return this._promoteVo.gdinfo.ismore == 1;
    };
    PromoteVoApi.prototype.dispose = function () {
        this._ishaveking = 0;
        _super.prototype.dispose.call(this);
    };
    return PromoteVoApi;
}(BaseVoApi));
__reflect(PromoteVoApi.prototype, "PromoteVoApi");
//# sourceMappingURL=PromoteVoApi.js.map