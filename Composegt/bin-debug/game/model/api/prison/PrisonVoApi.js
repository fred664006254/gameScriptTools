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
var PrisonVoApi = (function (_super) {
    __extends(PrisonVoApi, _super);
    function PrisonVoApi() {
        var _this = _super.call(this) || this;
        _this.currPrison = 0;
        return _this;
    }
    //获取名望
    PrisonVoApi.prototype.getMypre = function () {
        return this.prisonVo.mypre;
    };
    //获取名望上限
    PrisonVoApi.prototype.getMaxpre = function () {
        return this.prisonVo.maxpre;
    };
    //获取每日产出
    PrisonVoApi.prototype.getDailypre = function () {
        return this.prisonVo.dailypre;
    };
    //获取牢房囚犯列表 
    PrisonVoApi.prototype.getPrisonInfo = function () {
        // return this.prisonVo.info;
        var prisonArr = [];
        for (var key in this.prisonVo.info) {
            prisonArr.push(this.prisonVo.info[key]);
        }
        return prisonArr;
    };
    //获取当前可以惩罚牢房囚个数 
    PrisonVoApi.prototype.getcurrPrisonNumber = function () {
        var currPrisonIdArr = [];
        for (var key in this.prisonVo.info) {
            if (this.prisonVo.info[key] != 0) {
                currPrisonIdArr.push(key);
            }
        }
        return currPrisonIdArr.length;
    };
    //获取牢房中囚犯id 返回剩余惩罚次数
    PrisonVoApi.prototype.getIndexPrisonNum = function (id) {
        if (id === void 0) { id = 0; }
        var num = 0;
        for (var key in this.prisonVo.info) {
            if ("" + id == key) {
                return this.prisonVo.info[key];
            }
        }
    };
    // 获取当前的囚犯Id
    PrisonVoApi.prototype.getCurrPrisonId = function () {
        var currPrisonId = 0;
        for (var key in this.prisonVo.info) {
            if (this.prisonVo.info[key] != 0) {
                currPrisonId = Number(key);
                this.currPrison = currPrisonId;
                break;
            }
        }
        return currPrisonId;
    };
    //获取当前犯人第几个
    PrisonVoApi.prototype.getPrisonTitleStr = function () {
        // let boo= Api.switchVoApi.checkOpenNewPrison();
        // if(boo)
        // {
        // 	return  "prisonerIndex"+this.currPrison+"_hexieType";
        // }
        // else
        // {
        return "prisonerIndex" + this.currPrison;
        // }
    };
    //获取当前犯人名字
    PrisonVoApi.prototype.getPrisonName = function () {
        return "prisonerName" + this.currPrison;
    };
    PrisonVoApi.prototype.isShowNpc = function () {
        var boo = false;
        var unlock = Config.PrisonCfg.getIndexPrisonItemCfg(1).unlock;
        if (Api.challengeVoApi.getCurChannelId() > unlock) {
            boo = true;
        }
        else {
            boo = false;
        }
        return boo;
    };
    PrisonVoApi.prototype.getLockedString = function () {
        var unlock = Config.PrisonCfg.getIndexPrisonItemCfg(1).unlock;
        return LanguageManager.getlocal("prisonUnlockDesc", [Api.challengeVoApi.getBigChannelIdByCid2(unlock) + ""]);
    };
    PrisonVoApi.prototype.checkNpcMessage = function () {
        var cost = 0;
        if (Config.PrisonCfg.getIndexPrisonItemCfg(this.getCurrPrisonId()) != null) {
            cost = Config.PrisonCfg.getIndexPrisonItemCfg(this.getCurrPrisonId()).cost;
        }
        if (this.getcurrPrisonNumber() >= 1 && this.prisonVo.mypre >= cost && cost > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    PrisonVoApi.prototype.dispose = function () {
        this.currPrison = 0;
        _super.prototype.dispose.call(this);
    };
    return PrisonVoApi;
}(BaseVoApi));
__reflect(PrisonVoApi.prototype, "PrisonVoApi");
