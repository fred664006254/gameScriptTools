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
var AtkracecrossVoApi = /** @class */ (function (_super) {
    __extends(AtkracecrossVoApi, _super);
    function AtkracecrossVoApi() {
        var _this = _super.call(this) || this;
        _this.zonerankinfos = null;
        _this._prankinfos = null;
        _this._merank = 0;
        _this._mepoint = 0;
        _this.isCanJoin = false;
        _this.revengeIdx = 0;
        _this._flagRankInfo = null;
        _this.newcrossCode = null;
        /**
         * 江湖名望 席位数据
         */
        _this._fameMapInfo = {};
        return _this;
    }
    AtkracecrossVoApi.prototype.getNewCrossVo = function () {
        var crossVo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace", this.newcrossCode);
        return crossVo;
    };
    AtkracecrossVoApi.prototype.getNewCrossCfg = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode("newCrossServerAtkRace", this.newcrossCode);
        return cfg;
    };
    AtkracecrossVoApi.prototype.setZoneRankInfo = function (data) {
        this.zonerankinfos = data.atkranks;
        // this._iszonewin =  data.iszonewin;
    };
    AtkracecrossVoApi.prototype.setPRankInfo = function (data) {
        this._prankinfos = data.atkrank;
        this._merank = data.merank;
        this._mepoint = data.mepoint;
        this.zonerankinfos = data.zrank;
    };
    Object.defineProperty(AtkracecrossVoApi.prototype, "prankinfos", {
        get: function () {
            return this._prankinfos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AtkracecrossVoApi.prototype, "merank", {
        get: function () {
            return this._merank;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AtkracecrossVoApi.prototype, "mepoint", {
        get: function () {
            return this._mepoint;
        },
        enumerable: true,
        configurable: true
    });
    AtkracecrossVoApi.prototype.setFlagRankInfo = function (data) {
        this._flagRankInfo = data;
    };
    Object.defineProperty(AtkracecrossVoApi.prototype, "flagRankInfo", {
        get: function () {
            return this._flagRankInfo;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 战斗信息
     */
    AtkracecrossVoApi.prototype.getMyFightInfo = function () {
        return this.atkracecrossVo.ainfo;
    };
    AtkracecrossVoApi.prototype.getUseTimes = function () {
        var useids = this.atkracecrossVo.info.asids;
        return useids.length;
    };
    AtkracecrossVoApi.prototype.getUseTimes2 = function () {
        var i = 1;
        var useids = this.atkracecrossVo.info.asids;
        if (useids.length >= 30) {
            i = 1 + Math.floor(useids.length / 30);
        }
        return i;
    };
    AtkracecrossVoApi.prototype.getUseServantsTimes = function (sid) {
        var g = 0;
        var useids = this.atkracecrossVo.info.asids;
        if (useids.length >= 1) {
            for (var i = 0; i < useids.length; i++) {
                if (sid == useids[i]) {
                    g++;
                }
            }
        }
        return g;
    };
    /**
     * 武馆信息息
     */
    AtkracecrossVoApi.prototype.getMyInfo = function () {
        if (this.atkracecrossVo) {
            return this.atkracecrossVo.info;
        }
        return null;
    };
    /**
     * 江湖名望
    */
    AtkracecrossVoApi.prototype.setFameMapInfo = function (data) {
        if (data) {
            for (var k in data) {
                var row = Number(k) * 10 + 1;
                for (var i = 0; i < data[k].length; i++) {
                    var num = row + i;
                    if (!this._fameMapInfo[num]) {
                        this._fameMapInfo[num] = {};
                    }
                    this._fameMapInfo[num] = data[k][i];
                }
            }
        }
    };
    AtkracecrossVoApi.prototype.setClearFameMapInfo = function (floor) {
        if (this._fameMapInfo && this._fameMapInfo[floor]) {
            this._fameMapInfo[floor] = null;
        }
    };
    AtkracecrossVoApi.prototype.getFameMapInfoByFloor = function (floor) {
        if (this._fameMapInfo && this._fameMapInfo[floor]) {
            return this._fameMapInfo[floor];
        }
        return null;
    };
    AtkracecrossVoApi.prototype.clearFameMapInfo = function () {
        this._fameMapInfo = {};
    };
    //江湖名望 席位数据
    AtkracecrossVoApi.prototype.getMyFameSeatInfo = function () {
        var atkInfo = this.getMyInfo();
        if (atkInfo && atkInfo.director) {
            return atkInfo.director;
        }
        return null;
    };
    /**
    //  * 获取区服
    //  */
    // public getMydinfo(index:number):number
    // {
    // 	return this.atkracecrossVo.info[index].zid; 
    // }
    AtkracecrossVoApi.prototype.isShowNpc = function () {
        return Api.servantVoApi.getServantCountLevel60Plus() >= 1 && Api.servantVoApi.getServantCount() >= Config.AtkraceCfg.getUnlock();
        // return true;
    };
    AtkracecrossVoApi.prototype.getLockedString = function () {
        return LanguageManager.getlocal("atkraceUnlcok", [Config.AtkraceCfg.getUnlock().toString()]);
    };
    AtkracecrossVoApi.prototype.getPoint = function () {
        return this.atkracecrossVo.point;
    };
    AtkracecrossVoApi.prototype.getRewardc = function () {
        return this.atkracecrossVo.rewardc;
    };
    AtkracecrossVoApi.prototype.getLastKillerInfo = function () {
        return this.atkracecrossVo.info.lastKillerInfo;
    };
    AtkracecrossVoApi.prototype.checkNpcMessage = function () {
        var flag = false;
        if (this.atkracecrossVo && this.isShowNpc()) {
            if (this.atkracecrossVo.ainfo && this.atkracecrossVo.ainfo.mesid) {
                flag = true;
            }
            else {
                var maxCount = Config.AtkraceCfg.getDailyNum();
                var myNum = this.atkracecrossVo.info.num;
                if (this.isCanJoin && myNum < maxCount) {
                    var countDownTime = this.atkracecrossVo.info.lasttime + Config.AtkraceCfg.getIntervalTime() - GameData.serverTime;
                    if (countDownTime <= 0) {
                        flag = true;
                    }
                }
            }
        }
        return flag;
    };
    AtkracecrossVoApi.prototype.dateErrorHandle = function (type) {
        if (type === void 0) { type = 1; }
        if (type == 1) {
            var atkraceView = ViewController.getInstance().getView(ViewConst.COMMON.ATKRACECROSSVIEW);
            if (atkraceView) {
                atkraceView.refreshServant();
            }
            var rewardPopupView = ViewController.getInstance().getView(ViewConst.POPUP.ATKRACECROSSREWARDPOPUPVIEW);
            if (rewardPopupView) {
                rewardPopupView.hide();
            }
            var autoFightPopupView = ViewController.getInstance().getView(ViewConst.POPUP.ATKRACECROSSAUTOFIGHTPOPUPVIEW);
            if (autoFightPopupView) {
                autoFightPopupView.hide();
            }
            var buyPopupView = ViewController.getInstance().getView(ViewConst.POPUP.ATKRACECROSSBUYPOPUPVIEW);
            if (buyPopupView) {
                buyPopupView.hide();
            }
            var agreePopupDialog = ViewController.getInstance().getView(ViewConst.POPUP.ATKRACECROSSAGREEPOPUPDIALOG);
            if (agreePopupDialog) {
                agreePopupDialog.hide();
            }
            var arrestView = ViewController.getInstance().getView(ViewConst.COMMON.ATKRACECROSSARRESTVIEW);
            if (arrestView) {
                arrestView.hide();
            }
            App.CommonUtil.showTip(LanguageManager.getlocal("atkracedesErrorTip1"));
        }
        else {
            var atkraceView = ViewController.getInstance().getView(ViewConst.COMMON.NEWATKRACECROSSVIEW);
            if (atkraceView) {
                atkraceView.refreshServant();
            }
            var rewardPopupView = ViewController.getInstance().getView(ViewConst.POPUP.NEWATKRACECROSSREWARDPOPUPVIEW);
            if (rewardPopupView) {
                rewardPopupView.hide();
            }
            var autoFightPopupView = ViewController.getInstance().getView(ViewConst.POPUP.NEWATKRACECROSSAUTOFIGHTPOPUPVIEW);
            if (autoFightPopupView) {
                autoFightPopupView.hide();
            }
            var buyPopupView = ViewController.getInstance().getView(ViewConst.POPUP.NEWATKRACECROSSBUYPOPUPVIEW);
            if (buyPopupView) {
                buyPopupView.hide();
            }
            var agreePopupDialog = ViewController.getInstance().getView(ViewConst.POPUP.NEWATKRACECROSSAGREEPOPUPDIALOG);
            if (agreePopupDialog) {
                agreePopupDialog.hide();
            }
            var arrestView = ViewController.getInstance().getView(ViewConst.COMMON.NEWATKRACECROSSARRESTVIEW);
            if (arrestView) {
                arrestView.hide();
            }
            App.CommonUtil.showTip(LanguageManager.getlocal("atkracedesErrorTip2"));
        }
    };
    AtkracecrossVoApi.prototype.dispose = function () {
        this.zonerankinfos = null;
        this.isCanJoin = false;
        this.revengeIdx = 0;
        this.newcrossCode = null;
        this._fameMapInfo = [];
        _super.prototype.dispose.call(this);
    };
    return AtkracecrossVoApi;
}(BaseVoApi));
//# sourceMappingURL=AtkracecrossVoApi.js.map