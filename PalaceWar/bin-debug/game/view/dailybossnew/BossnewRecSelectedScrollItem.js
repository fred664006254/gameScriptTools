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
var BossnewRecSelectedScrollItem = (function (_super) {
    __extends(BossnewRecSelectedScrollItem, _super);
    function BossnewRecSelectedScrollItem() {
        return _super.call(this) || this;
    }
    BossnewRecSelectedScrollItem.prototype.recoveryHandler = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_NEWBOSS_RECOVER, this.refresh, this);
        NetManager.request(NetRequestConst.REQUEST_NEWBOSS_RECOVER, { servantId: this._servantInfo[0] });
    };
    BossnewRecSelectedScrollItem.prototype.refresh = function (e) {
        var data = e.data;
        if (data.ret) {
            App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_DAILYBOSS_RECOVER, this.refresh, this);
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
    BossnewRecSelectedScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_NEWBOSS_RECOVER, this.refresh, this);
        _super.prototype.dispose.call(this);
    };
    return BossnewRecSelectedScrollItem;
}(BossSelectedScrollItem));
__reflect(BossnewRecSelectedScrollItem.prototype, "BossnewRecSelectedScrollItem");
//# sourceMappingURL=BossnewRecSelectedScrollItem.js.map