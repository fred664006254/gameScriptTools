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
var AcTombSelectScrollItem = (function (_super) {
    __extends(AcTombSelectScrollItem, _super);
    function AcTombSelectScrollItem() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcTombSelectScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_TOMB, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombSelectScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_TOMB, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombSelectScrollItem.prototype, "acTivityId", {
        get: function () {
            return AcConst.AID_TOMB + "-" + this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcTombSelectScrollItem.prototype.recoveryHandler = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_TOMBRECOVERSERVANT, this.refresh, this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_TOMBRECOVERSERVANT, { servantId: this._servantInfo[0], activeId: this.vo.aidAndCode });
    };
    AcTombSelectScrollItem.prototype.refresh = function (e) {
        var data = e.data;
        if (data.ret) {
            App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_TOMBRECOVERSERVANT, this.refresh, this);
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
    AcTombSelectScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_TOMBRECOVERSERVANT, this.refresh, this);
        _super.prototype.dispose.call(this);
    };
    return AcTombSelectScrollItem;
}(BossSelectedScrollItem));
__reflect(AcTombSelectScrollItem.prototype, "AcTombSelectScrollItem");
//# sourceMappingURL=AcTombSelectScrollItem.js.map