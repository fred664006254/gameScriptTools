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
var TitleupgradeVoApi = (function (_super) {
    __extends(TitleupgradeVoApi, _super);
    function TitleupgradeVoApi() {
        return _super.call(this) || this;
    }
    TitleupgradeVoApi.prototype.formatData = function (data) {
        _super.prototype.formatData.call(this, data);
    };
    TitleupgradeVoApi.prototype.checkPalaceMessage = function () {
        var flag = false;
        if (Api.switchVoApi.checkTitleUpgrade()) {
            var arr = Config.TitleupgradeCfg.getDiOrder().concat(Config.TitleupgradeCfg.getWangOrder()).concat(Config.TitleupgradeCfg.getHuangOrder());
            for (var i in arr) {
                if (this.canTitleLevelUp(arr[i]) && this.isinTitle(arr[i])) {
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    };
    TitleupgradeVoApi.prototype.checkNpcMessage = function () {
        var flag = false;
        if (Api.switchVoApi.checkTitleUpgrade()) {
            var arr = Config.TitleupgradeCfg.getDiOrder().concat(Config.TitleupgradeCfg.getWangOrder()).concat(Config.TitleupgradeCfg.getHuangOrder());
            for (var i in arr) {
                if (this.canTitleLevelUp(arr[i])) {
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    };
    TitleupgradeVoApi.prototype.isunlock = function (titleid) {
        var flag = false;
        if (this.getTitleInfo(titleid).level > 0 || this.isinTitle(titleid)) {
            flag = true;
        }
        return flag;
    };
    //是否在位
    TitleupgradeVoApi.prototype.isinTitle = function (titleid) {
        var flag = false;
        var titleCfg = Config.TitleCfg.getTitleCfgById(titleid);
        var titleVo = Api.itemVoApi.getTitleInfoVoById(Number(titleid));
        //自己有的戴着 并且物品栏有的
        if (titleCfg.isTitle == 1 && titleVo.num > -1) {
            flag = true;
        }
        return flag;
    };
    TitleupgradeVoApi.prototype.getTitleInfo = function (titleid) {
        var obj = null;
        obj = Api.itemVoApi.getTitleUpgradeInfo(titleid);
        return obj;
    };
    TitleupgradeVoApi.prototype.canTitleLevelUp = function (titleid, level) {
        if (level === void 0) { level = 0; }
        var obj = false;
        if (Config.TitleCfg) {
            var titlecfg = Config.TitleCfg.getTitleCfgById(titleid);
            if (titlecfg && (titlecfg.titleType == 1 || titlecfg.titleType == 2 || titlecfg.titleType == 7)) {
                var isdi = titlecfg.titleType == 1;
                var arr = [];
                switch (titlecfg.titleType) {
                    case 1:
                        arr = Config.TitleupgradeCfg.diList;
                        break;
                    case 2:
                        arr = Config.TitleupgradeCfg.wangList;
                        break;
                    case 7:
                        arr = Config.TitleupgradeCfg.huangList;
                        break;
                }
                var info = this.getTitleInfo(titleid);
                var curlv = info.level;
                if (level) {
                    if (arr[level - 1]) {
                        if (curlv < level && info.num >= arr[level - 1].timesNeed) {
                            obj = true;
                        }
                    }
                }
                else {
                    for (var i in arr) {
                        if (curlv < Number(i) + 1 && info.num >= arr[i].timesNeed) {
                            obj = true;
                            break;
                        }
                    }
                }
            }
        }
        return obj;
    };
    TitleupgradeVoApi.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return TitleupgradeVoApi;
}(BaseVoApi));
__reflect(TitleupgradeVoApi.prototype, "TitleupgradeVoApi");
//# sourceMappingURL=TitleupgradeVoApi.js.map