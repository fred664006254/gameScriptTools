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
var AcWipeBossSelectScrollItem = (function (_super) {
    __extends(AcWipeBossSelectScrollItem, _super);
    function AcWipeBossSelectScrollItem() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcWipeBossSelectScrollItem.prototype, "api", {
        get: function () {
            return Api.wipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossSelectScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_WIPEBOSS, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossSelectScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_WIPEBOSS, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcWipeBossSelectScrollItem.prototype.recoveryHandler = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSRECOVER, this.refresh, this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSRECOVER, { servantId: this._servantInfo[0], activeId: this.vo.aidAndCode });
    };
    AcWipeBossSelectScrollItem.prototype.refresh = function (e) {
        var data = e.data;
        if (data.ret) {
            App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSRECOVER, this.refresh, this);
            if (this._useBtn) {
                var _a = this._useBtn, x = _a.x, y = _a.y;
                this._useBtn.dispose();
                var useBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "gotowar", this.clickBtnHandler, this);
                useBtn.setPosition(x, y);
                this.addChild(useBtn);
                this._useBtn = useBtn;
            }
            App.CommonUtil.showTip(LanguageManager.getlocal("dailybossRecoveryBattleSuccessDesc"));
        }
    };
    AcWipeBossSelectScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSRECOVER, this.refresh, this);
        _super.prototype.dispose.call(this);
    };
    return AcWipeBossSelectScrollItem;
}(BossSelectedScrollItem));
__reflect(AcWipeBossSelectScrollItem.prototype, "AcWipeBossSelectScrollItem");
//# sourceMappingURL=AcWipeBossSelectScrollItem.js.map