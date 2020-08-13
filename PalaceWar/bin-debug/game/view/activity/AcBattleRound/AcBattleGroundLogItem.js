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
 对战信息logitem
 * author qianjun
 */
var AcBattleGroundLogItem = (function (_super) {
    __extends(AcBattleGroundLogItem, _super);
    function AcBattleGroundLogItem() {
        var _this = _super.call(this) || this;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcBattleGroundLogItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundLogItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundLogItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundLogItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_BATTLEGROUND;
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundLogItem.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcBattleGroundLogItem.prototype.initItem = function (index, data, itemparam) {
        this._code = itemparam;
        _super.prototype.initItem.call(this, index, data, itemparam);
    };
    //挑战
    AcBattleGroundLogItem.prototype.challengBtnHandler = function (evt) {
        if (!this.vo.getAttendQuality()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acBattleRoundNoAttend-" + this.getUiCode()));
            return;
        }
        if (this.vo.isActyEnd()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
            return;
        }
        if (this.vo.getCurperiod() == 3) {
            App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime4"));
            return;
        }
        if (!this.vo.getJoinIn()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acBattleGroundTip4-" + this.getUiCode()));
            return;
        }
        var tmp = [];
        tmp.type = 1; //挑战
        tmp.battleground = true;
        tmp.uid = this.data.uid;
        tmp.code = this._code;
        AtkraceChallengeItem.data = tmp;
        ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDCHALLENGEVIEW);
    };
    // public getSpaceY():number
    // {
    // 	return 0;
    // }
    AcBattleGroundLogItem.prototype.dispose = function () {
        this._code = '';
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundLogItem;
}(AtkLogScrollItem));
__reflect(AcBattleGroundLogItem.prototype, "AcBattleGroundLogItem");
//# sourceMappingURL=AcBattleGroundLogItem.js.map