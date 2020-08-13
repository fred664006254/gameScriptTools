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
var MergeServerVoApi = (function (_super) {
    __extends(MergeServerVoApi, _super);
    function MergeServerVoApi() {
        var _this = _super.call(this) || this;
        _this.mergeZidCfg = null;
        return _this;
    }
    MergeServerVoApi.prototype.formatData = function (data) {
        // super.formatData(data);
        this.mergeZidCfg = data;
    };
    /**
     * 是否属于合服区
    */
    MergeServerVoApi.prototype.isMergeSever = function (sid) {
        //let sid = Number(ServerCfg.selectServer.zid);
        for (var i in this.mergeZidCfg) {
            if (this.mergeZidCfg[i] && Number(i) == Number(sid)) {
                return true;
            }
        }
        return false;
    };
    //根据zid 得到合服之后的区
    MergeServerVoApi.prototype.getQuByZid = function (zid) {
        if (this.mergeZidCfg[zid]) {
            var newzoneid = this.mergeZidCfg[zid].split('-');
            return newzoneid[0];
        }
        else {
            return 0;
        }
    };
    /**
     * 获取合服后的区服名
     * uid 玩家uid 判断真正服
     * onlyQu 是否只返回区
     * zid 只返回区时传入合服后的服来判断
    */
    MergeServerVoApi.prototype.getAfterMergeSeverName = function (uid, onlyQu, zid) {
        if (onlyQu === void 0) { onlyQu = false; }
        if (zid === void 0) { zid = 0; }
        if (!uid) {
            uid = Api.playerVoApi.getPlayerID();
        }
        var trueZid = onlyQu ? zid : this.getTrueZid(uid);
        var str = '';
        if (this.isMergeSever(trueZid)) {
            var newzoneid = this.mergeZidCfg[trueZid].split('-');
            if (onlyQu) {
                str = LanguageManager.getlocal("mergeServerOnlyqu", [newzoneid[0]]);
            }
            else {
                str = LanguageManager.getlocal("mergeServer", [newzoneid[0], trueZid.toString()]);
            }
        }
        else {
            str = LanguageManager.getlocal("ranserver2", [trueZid.toString()]);
        }
        return str;
    };
    /**
     * 获取真正区服
    */
    MergeServerVoApi.prototype.getTrueZid = function (uid) {
        if (!uid) {
            uid = Api.playerVoApi.getPlayerID();
        }
        return Math.floor(uid / 1000000);
        ;
    };
    MergeServerVoApi.prototype.isInMergeZone = function () {
        return this.isMergeSever(this.getTrueZid());
    };
    /**
     * 判断是否同服
    */
    MergeServerVoApi.prototype.judgeIsSameServer = function (zid1, zid2) {
        var ismerge1 = this.isMergeSever(zid1);
        var ismerge2 = this.isMergeSever(zid2);
        if (ismerge1 && ismerge2) {
            return this.mergeZidCfg[zid1] == this.mergeZidCfg[zid2];
        }
        else if (!ismerge1 && !ismerge2) {
            return Number(zid1) == Number(zid2);
        }
        else {
            return false;
        }
    };
    MergeServerVoApi.prototype.dispose = function () {
        this.mergeZidCfg = null;
        _super.prototype.dispose.call(this);
    };
    return MergeServerVoApi;
}(BaseVoApi));
__reflect(MergeServerVoApi.prototype, "MergeServerVoApi");
