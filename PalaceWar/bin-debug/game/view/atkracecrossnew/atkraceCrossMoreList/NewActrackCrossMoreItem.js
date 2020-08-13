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
var NewActrackCrossMoreItem = /** @class */ (function (_super) {
    __extends(NewActrackCrossMoreItem, _super);
    function NewActrackCrossMoreItem() {
        var _this = _super.call(this) || this;
        _this.zid = 0;
        _this._info = null;
        return _this;
    }
    NewActrackCrossMoreItem.prototype.initItem = function (index, data, itemParam) {
        this.zid = data.info.zid;
        _super.prototype.initItem.call(this, index, data, itemParam);
    };
    /**
     * 是否是跨服
     */
    NewActrackCrossMoreItem.prototype.checkIsCross = function () {
        return true;
    };
    //挑战
    NewActrackCrossMoreItem.prototype.challengBtnHandler = function (evt) {
        var crossVo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace");
        if (GameData.serverTime > crossVo.et - 86400) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (Api.atkracecrossVoApi.isCanJoin == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn("newatkraceNoDes", crossVo.isCrossLeague())));
            return;
        }
        if (crossVo.getSids().length == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn("newatkraceServantLess30Tip", crossVo.isCrossLeague())));
            return;
        }
        var data = [];
        data.type = 1; //挑战
        data.uid = this.data.uid;
        data.zid = this.zid;
        AtkraceCrossChallengeItem.data = data;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_GETINFO), this.useCallback, this);
        NetManager.request(NetRequestConst.REQUEST_NEWATKRACECROSS_GETINFO, { "fuid": this.data.uid });
    };
    NewActrackCrossMoreItem.prototype.useCallback = function (data) {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_GETINFO), this.useCallback, this);
        if (data.data.ret == true) {
            var atkraceinfo = data.data.data.data.atkraceinfo;
            this._info = atkraceinfo;
            var acCfg = Api.atkracecrossVoApi.getNewCrossCfg();
            var pointDiff = Api.atkracecrossVoApi.getPoint() - this._info.point;
            if (this._info.rank > acCfg.lowerLimit3 && this._info.point <= acCfg.lowerLimit1) {
                var tipstr = LanguageManager.getlocal("newatkraceServantChallengeTp2", [String(acCfg.lowerLimit1)]);
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    title: "acthrowstoneTipTitle",
                    msg: tipstr,
                    callback: this.realAttack,
                    handler: this,
                    needCancel: true
                });
            }
            else if (this._info.rank > acCfg.lowerLimit3 && pointDiff >= acCfg.lowerLimit2) {
                var tipstr = LanguageManager.getlocal("newatkraceServantChallengeTp1", [String(acCfg.lowerLimit2)]);
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    title: "acthrowstoneTipTitle",
                    msg: tipstr,
                    callback: this.realAttack,
                    handler: this,
                    needCancel: true
                });
            }
            else {
                this.realAttack();
            }
        }
    };
    NewActrackCrossMoreItem.prototype.realAttack = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.NEWATKRACECROSSCHALLENGEVIEW, { info: this._info });
    };
    NewActrackCrossMoreItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_GETINFO), this.useCallback, this);
        this.zid = 0;
        this._info = null;
        _super.prototype.dispose.call(this);
    };
    return NewActrackCrossMoreItem;
}(AtkLogScrollItem));
//# sourceMappingURL=NewActrackCrossMoreItem.js.map