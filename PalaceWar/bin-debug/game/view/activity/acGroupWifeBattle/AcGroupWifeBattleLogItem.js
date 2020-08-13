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
/**
 对战信息logitem
 * author qianjun
 */
var AcGroupWifeBattleLogItem = /** @class */ (function (_super) {
    __extends(AcGroupWifeBattleLogItem, _super);
    function AcGroupWifeBattleLogItem() {
        var _this = _super.call(this) || this;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcGroupWifeBattleLogItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleLogItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleLogItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleLogItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_BATTLEGROUND;
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleLogItem.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcGroupWifeBattleLogItem.prototype.initItem = function (index, data, itemparam) {
        this._code = itemparam;
        _super.prototype.initItem.call(this, index, data, itemparam);
    };
    //挑战
    AcGroupWifeBattleLogItem.prototype.challengBtnHandler = function (evt) {
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
            App.CommonUtil.showTip(LanguageManager.getlocal("acGroupWifeBattleTip4-" + this.getUiCode()));
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
    AcGroupWifeBattleLogItem.prototype.dispose = function () {
        this._code = '';
        _super.prototype.dispose.call(this);
    };
    return AcGroupWifeBattleLogItem;
}(AtkLogScrollItem));
//# sourceMappingURL=AcGroupWifeBattleLogItem.js.map