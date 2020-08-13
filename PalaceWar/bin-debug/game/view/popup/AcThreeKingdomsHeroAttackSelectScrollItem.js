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
var AcThreeKingdomsHeroAttackSelectScrollItem = (function (_super) {
    __extends(AcThreeKingdomsHeroAttackSelectScrollItem, _super);
    function AcThreeKingdomsHeroAttackSelectScrollItem() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcThreeKingdomsHeroAttackSelectScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_THREEKINGDOMS, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsHeroAttackSelectScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_THREEKINGDOMS, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsHeroAttackSelectScrollItem.prototype, "acTivityId", {
        get: function () {
            return AcConst.AID_THREEKINGDOMS + "-" + this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsHeroAttackSelectScrollItem.prototype.recoveryHandler = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_HERORECOVERY, this.refresh, this);
        NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_HERORECOVERY, { sid: this._servantInfo[0], activeId: this.vo.aidAndCode });
    };
    AcThreeKingdomsHeroAttackSelectScrollItem.prototype.refresh = function (e) {
        var data = e.data;
        if (data.ret) {
            App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_HERORECOVERY, this.refresh, this);
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
    AcThreeKingdomsHeroAttackSelectScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_HERORECOVERY, this.refresh, this);
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsHeroAttackSelectScrollItem;
}(BossSelectedScrollItem));
__reflect(AcThreeKingdomsHeroAttackSelectScrollItem.prototype, "AcThreeKingdomsHeroAttackSelectScrollItem");
//# sourceMappingURL=AcThreeKingdomsHeroAttackSelectScrollItem.js.map