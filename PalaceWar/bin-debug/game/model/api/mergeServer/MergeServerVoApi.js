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
var MergeServerVoApi = /** @class */ (function (_super) {
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
     * 通过zid获得区服
     */
    MergeServerVoApi.prototype.getSeverName = function (zid) {
        var str = '';
        if (this.isMergeSever(zid)) {
            var newzoneid = this.mergeZidCfg[zid].split('-');
            str = LanguageManager.getlocal("mergeServer", [newzoneid[0], zid.toString()]);
        }
        else {
            str = LanguageManager.getlocal("ranserver2", [zid.toString()]);
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
    MergeServerVoApi.prototype.getFuByZid = function (sid) {
        if (!sid) {
            sid = this.getTrueZid();
        }
        if (this.mergeZidCfg[sid]) {
            var newzoneid = this.mergeZidCfg[sid].split('-');
            return Number(newzoneid[1]);
        }
        else {
            return sid;
        }
    };
    MergeServerVoApi.prototype.getRankServerName = function (uid) {
        var server = "";
        var zid = Api.mergeServerVoApi.getTrueZid(uid);
        var qu = Api.mergeServerVoApi.getQuByZid(zid);
        if (qu > 0) {
            // server = LanguageManager.getlocal("mergeServer",[String(data[1]),String(data[0])]);
            server = LanguageManager.getlocal("mergeServerOnlyqu", [String(qu)]);
        }
        else {
            // "ranserver2":"{1}服",
            server = LanguageManager.getlocal("ranserver2", [String(zid)]);
        }
        return server;
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
//# sourceMappingURL=MergeServerVoApi.js.map