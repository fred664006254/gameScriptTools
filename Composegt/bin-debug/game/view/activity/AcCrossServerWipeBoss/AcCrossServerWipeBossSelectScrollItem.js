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
var AcCrossServerWipeBossSelectScrollItem = (function (_super) {
    __extends(AcCrossServerWipeBossSelectScrollItem, _super);
    function AcCrossServerWipeBossSelectScrollItem() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcCrossServerWipeBossSelectScrollItem.prototype, "api", {
        get: function () {
            return Api.crossServerWipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossSelectScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_CROSSSERVERWIPEBOSS, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossSelectScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_CROSSSERVERWIPEBOSS, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWipeBossSelectScrollItem.prototype.recoveryHandler = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIPEBOSS_RECOVER, this.refresh, this);
        NetManager.request(NetRequestConst.REQUEST_WIPEBOSS_RECOVER, { servantId: this._servantInfo[0], activeId: this.vo.aidAndCode });
    };
    AcCrossServerWipeBossSelectScrollItem.prototype.refresh = function (e) {
        var data = e.data;
        if (data.ret) {
            App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIPEBOSS_RECOVER, this.refresh, this);
            if (this._useBtn) {
                var _a = this._useBtn, x = _a.x, y = _a.y;
                this._useBtn.dispose();
                var useBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "gotowar", this.clickBtnHandler, this);
                useBtn.setPosition(x, y);
                this.addChild(useBtn);
                this._useBtn = useBtn;
            }
            App.CommonUtil.showTip(LanguageManager.getlocal("dailybossRecoveryBattleSuccessDesc"));
        }
    };
    AcCrossServerWipeBossSelectScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIPEBOSS_RECOVER, this.refresh, this);
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWipeBossSelectScrollItem;
}(BossSelectedScrollItem));
__reflect(AcCrossServerWipeBossSelectScrollItem.prototype, "AcCrossServerWipeBossSelectScrollItem");
