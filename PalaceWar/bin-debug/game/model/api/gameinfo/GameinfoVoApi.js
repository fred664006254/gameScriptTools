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
var GameinfoVoApi = (function (_super) {
    __extends(GameinfoVoApi, _super);
    function GameinfoVoApi() {
        return _super.call(this) || this;
    }
    GameinfoVoApi.prototype.getRegdt = function () {
        return this.gameinfoVo ? this.gameinfoVo.regdt : 0;
    };
    GameinfoVoApi.prototype.getGuideStep = function () {
        return this.gameinfoVo ? this.gameinfoVo.newerflag : 0;
    };
    GameinfoVoApi.prototype.getDownType = function () {
        if (this.gameinfoVo && this.gameinfoVo.info && this.gameinfoVo.info.downType) {
            return this.gameinfoVo.info.downType;
        }
        else {
            return "";
        }
    };
    GameinfoVoApi.prototype.getRealnameRewards = function () {
        if (this.gameinfoVo && this.gameinfoVo.info && this.gameinfoVo.info.realnameRewards != null) {
            return this.gameinfoVo.info.realnameRewards;
        }
        else {
            return null;
        }
    };
    //"玩家性别 1男2女",
    GameinfoVoApi.prototype.getSexnum = function () {
        return Api.playerVoApi.getUserSex(Api.playerVoApi.getPlayePicId());
        // let num = 0;
        // if(this.gameinfoVo.sexnum){
        // 	num = this.gameinfoVo.sexnum;
        // }
        // return num;
    };
    //"玩家性别 1代表是女，不存在则为男",
    GameinfoVoApi.prototype.setSexnum = function (num) {
        if (!this.gameinfoVo.sexnum) {
            this.gameinfoVo.sexnum = 0;
        }
        this.gameinfoVo.sexnum = num;
    };
    //"性转开关 大于等于1为开 否则为关",
    GameinfoVoApi.prototype.getSexswitch = function () {
        if (!this.gameinfoVo) {
            return 0;
        }
        return this.gameinfoVo.sexswitch;
    };
    //"性转开关 大于等于1为开 否则为关",
    GameinfoVoApi.prototype.setSexswitch = function (sex) {
        this.gameinfoVo.sexswitch = sex;
    };
    //"性转默认值 1代表有 不存在则为没有"
    GameinfoVoApi.prototype.getSexdefault = function () {
        return this.gameinfoVo.sexdefault;
    };
    GameinfoVoApi.prototype.setSexdefault = function () {
        this.gameinfoVo.sexdefault = 1;
    };
    return GameinfoVoApi;
}(BaseVoApi));
__reflect(GameinfoVoApi.prototype, "GameinfoVoApi");
//# sourceMappingURL=GameinfoVoApi.js.map