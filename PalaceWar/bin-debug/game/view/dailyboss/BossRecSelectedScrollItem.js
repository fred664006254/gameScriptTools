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
var BossRecSelectedScrollItem = (function (_super) {
    __extends(BossRecSelectedScrollItem, _super);
    function BossRecSelectedScrollItem() {
        return _super.call(this) || this;
    }
    // protected checkUseBtn(bg:BaseBitmap):void
    // {
    // 	if (this._servantInfo[1] ==1){
    // 		let useBtn:BaseButton = ComponentManager.getButton(this.getBtnResName(),this.getBtnLocalName(),this.confirmRecoveryHandler,this);
    // 		useBtn.setColor(TextFieldConst.COLOR_BLACK);
    // 		useBtn.x = bg.width - useBtn.width - 10;
    // 		useBtn.y = bg.height/2 - useBtn.height/2;
    // 		this.addChild(useBtn);
    // 		this._useBtn=useBtn;
    // 	}
    // 	else if(this._servantInfo[1]==2)
    // 	{
    // 		let goneIcon:BaseBitmap = BaseBitmap.create("boss_gotowar");
    // 		goneIcon.setPosition(382,8);
    // 		this.addChild(goneIcon);
    // 	}
    // 	else {
    // 		let useBtn:BaseButton = ComponentManager.getButton(this.getBtnResName(),this.getBtnLocalName(),this.clickBtnHandler,this);
    // 		useBtn.setColor(TextFieldConst.COLOR_BLACK);
    // 		useBtn.x = bg.width - useBtn.width - 10;
    // 		useBtn.y = bg.height/2 - useBtn.height/2;
    // 		this.addChild(useBtn);
    // 		this._useBtn=useBtn;
    // 	}
    // }
    // private confirmRecoveryHandler():void
    // {
    // 	let itemId:string=Config.DailybossCfg.needItem;
    // 	let hasNum:number=Api.itemVoApi.getItemNumInfoVoById(Number(itemId));
    // 	let itemUseCount = 1;
    // 	let itemCount = hasNum;
    // 	let itemCfg = Config.ItemCfg.getItemCfgById(Number(itemId));
    // 	let message: string = LanguageManager.getlocal("useItemMsg", [itemCfg.name + "x" +itemUseCount, LanguageManager.getlocal("dailybossRecoveryBattleNumDesc")]);
    // 	ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { confirmCallback: this.recoveryHandler, handler: this, icon: itemCfg.icon,iconBg: itemCfg.iconBg, num: itemCount, useNum:itemUseCount,msg: message });
    // }
    BossRecSelectedScrollItem.prototype.recoveryHandler = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_DAILYBOSS_RECOVER, this.refresh, this);
        NetManager.request(NetRequestConst.REQUEST_DAILYBOSS_RECOVER, { servantId: this._servantInfo[0] });
    };
    BossRecSelectedScrollItem.prototype.refresh = function (e) {
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
    // protected getBtnLocalName():string
    // {
    // 	if (this._servantInfo[1] == 1){
    // 		return "manageRecoveryBtn";
    // 	}
    // 	else {
    // 		return "gotowar";
    // 	}
    // }
    BossRecSelectedScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_DAILYBOSS_RECOVER, this.refresh, this);
        // this._useBtn=null;
        _super.prototype.dispose.call(this);
    };
    return BossRecSelectedScrollItem;
}(BossSelectedScrollItem));
__reflect(BossRecSelectedScrollItem.prototype, "BossRecSelectedScrollItem");
//# sourceMappingURL=BossRecSelectedScrollItem.js.map