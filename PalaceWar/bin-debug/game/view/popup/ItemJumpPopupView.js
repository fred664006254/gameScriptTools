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
 * 道具不足跳转弹板
 * author dky
 * date 2018/3/26
 * @class ItemJumpPopupView
 */
var ItemJumpPopupView = (function (_super) {
    __extends(ItemJumpPopupView, _super);
    function ItemJumpPopupView() {
        return _super.call(this) || this;
    }
    ItemJumpPopupView.prototype.initView = function () {
        if (this.param.data.cancelCallback) {
            this._cancelCallback = this.param.data.cancelCallback;
        }
        this._confirmCallback = this.param.data.confirmCallback;
        this._handler = this.param.data.handler;
        // let iconPic:string = this.param.data.icon;
        // let iconBg:string = this.param.data.iconBg;
        // let msg:string = this.param.data.msg;
        // let num = this.param.data.num;
        var itemCfg = Config.ItemCfg.getItemCfgById(Number(this.param.data.itemId));
        var iconPic = itemCfg.icon;
        var iconBg = itemCfg.iconBg;
        var msg = LanguageManager.getlocal("itemJumpDesc", [itemCfg.name]);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 224;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        var temX = this.viewBg.x + this.viewBg.width / 2 - 50;
        var temY = 29;
        var temW = 100;
        var temH = 100;
        var itembg = BaseBitmap.create(iconBg);
        itembg.x = temX;
        itembg.y = temY;
        this.addChildToContainer(itembg);
        // let icon:BaseBitmap = BaseLoadBitmap.create(iconPic);
        // icon.x = temX;
        // icon.y = temY;
        // this.addChildToContainer(icon);
        //点击物品增加文字说明 添加物品iconitem
        var iconItem = GameData.getItemIcon(itemCfg, true);
        iconItem.x = temX;
        iconItem.y = temY;
        this.addChildToContainer(iconItem);
        // let numTF:BaseTextField = ComponentManager.getTextField(num.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);;
        // numTF.x = temX + 98 - numTF.width;
        // numTF.y = temY + 98 - numTF.height;
        // this.addChildToContainer(numTF);
        var msgTF = ComponentManager.getTextField(msg, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        msgTF.width = 480;
        msgTF.setColor(TextFieldConst.COLOR_BLACK);
        msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
        msgTF.x = this.viewBg.x + this.viewBg.width / 2 - msgTF.width / 2;
        msgTF.y = temY + temH + 25;
        this.addChildToContainer(msgTF);
        this._cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "cancelBtn", this.clickCancelHandler, this);
        this._cancelBtn.x = this.viewBg.x + this.viewBg.width / 2 - 50 - this._cancelBtn.width;
        this._cancelBtn.y = bg.y + bg.height + 25;
        this._cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(this._cancelBtn);
    };
    ItemJumpPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width / 2 + 50, this._cancelBtn.y);
    };
    ItemJumpPopupView.prototype.clickConfirmHandler = function (data) {
        // if(this.param.data.useNum && this.param.data.useNum > this.param.data.num)
        // {
        // 	if(this.param.data.icon == "itemicon1"){
        // 		App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"))
        // 	}
        // 	else{
        // 		App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"))
        // 	}
        // 	this.hide();
        // 	return;
        // }
        // App.LogUtil.log("clickConfirmHandler");
        // if(this._confirmCallback)
        // {
        // 	this._confirmCallback.apply(this._handler,[]);
        // }
        ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
        this.hide();
    };
    ItemJumpPopupView.prototype.getConfirmBtnStr = function () {
        return "sysConfirm";
    };
    // protected getContainerY():number
    // {
    // 	return 0;
    // }
    ItemJumpPopupView.prototype.clickCancelHandler = function (param) {
        if (this._cancelCallback) {
            this._cancelCallback.apply(this._handler, []);
        }
        this.hide();
    };
    ItemJumpPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    ItemJumpPopupView.prototype.getTitleStr = function () {
        return "itemUseConstPopupViewTitle";
    };
    ItemJumpPopupView.prototype.getConfirmBtnName = function () {
        return ButtonConst.BTN_NORMAL_YELLOW;
    };
    ItemJumpPopupView.prototype.dispose = function () {
        this._cancelCallback = null;
        this._confirmCallback = null;
        this._handler = null;
        this._cancelBtn = null;
        _super.prototype.dispose.call(this);
    };
    return ItemJumpPopupView;
}(PopupView));
__reflect(ItemJumpPopupView.prototype, "ItemJumpPopupView");
//# sourceMappingURL=ItemJumpPopupView.js.map