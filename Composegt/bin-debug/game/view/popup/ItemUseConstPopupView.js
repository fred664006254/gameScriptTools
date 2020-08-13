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
 * 确认取消弹板
 * author dmj
 * date 2017/10/10
 * @class ItemUseConstPopupView
 */
var ItemUseConstPopupView = (function (_super) {
    __extends(ItemUseConstPopupView, _super);
    function ItemUseConstPopupView() {
        return _super.call(this) || this;
    }
    // 计算背景高度时使用，在container高度的基础上添加该高度
    ItemUseConstPopupView.prototype.getBgExtraHeight = function () {
        return 30;
    };
    ItemUseConstPopupView.prototype.initView = function () {
        var data = this.param.data;
        var itemid = data.id;
        if (data.cancelCallback) {
            this._cancelCallback = data.cancelCallback;
        }
        this._confirmCallback = data.confirmCallback;
        this._handler = data.handler;
        var iconPic = data.icon;
        var iconBg = data.iconBg;
        var msg = data.msg;
        var num = data.num;
        var useNum = data.useNum || 0;
        var bg = BaseBitmap.create("public_9v_bg12");
        bg.width = 520;
        // bg.height = 284;
        bg.height = 350;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 15;
        this.addChildToContainer(bg);
        // let bg2:BaseBitmap = BaseBitmap.create("public_tc_bg03");
        // bg2.width = 510;
        // bg2.height = 134;
        // bg2.x = this.viewBg.x + this.viewBg.width/2 - bg2.width/2;
        // bg2.y = bg.y + 10;
        // this.addChildToContainer(bg2);
        // let cor1 = BaseBitmap.create("public_tcdw_bg01");
        // cor1.x = bg2.x;
        // cor1.y = bg2.y;
        // this.addChildToContainer(cor1);
        // let cor2 = BaseBitmap.create("public_tcdw_bg02");
        // cor2.x = bg2.x + bg2.width-cor2.width;
        // cor2.y = bg2.y;
        // this.addChildToContainer(cor2);
        var itemB = BaseBitmap.create("itemview_daoju_bg02");
        itemB.x = this.viewBg.width / 2 - itemB.width / 2;
        itemB.y = bg.y + 5;
        this.addChildToContainer(itemB);
        var temX = itemB.x + itemB.width / 2 - 50 - 2; //this.viewBg.x + this.viewBg.width/2 - 50;
        var temY = itemB.y + itemB.height / 2 - 50; //29;
        var temW = 100;
        var temH = 100;
        var itembg = BaseBitmap.create(iconBg);
        itembg.x = temX;
        itembg.y = temY;
        this.addChildToContainer(itembg);
        //点击物品增加文字说明 添加物品iconitem
        var itemCfg = Config.ItemCfg.getItemCfgById(Number(itemid));
        if (!itemCfg) {
            itemCfg = GameData.getRewardItemVoByIdAndType(itemid);
        }
        var iconItem = GameData.getItemIcon(itemCfg, true);
        iconItem.x = temX;
        iconItem.y = temY;
        this.addChildToContainer(iconItem);
        //中间改为消耗数量
        var numTF = ComponentManager.getTextField(useNum.toString(), TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
        ;
        numTF.x = temX + 98 - numTF.width;
        numTF.y = temY + 98 - numTF.height;
        this.addChildToContainer(numTF);
        //换行添加当前拥有数目
        var cur_have = LanguageManager.getlocal(num >= useNum ? "itemUseNewTip" : "itemUseNewTip2", [itemCfg.name, App.StringUtil.toString(num)]);
        msg += "\n" + cur_have;
        var msgTF = ComponentManager.getTextField(msg, TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
        msgTF.width = 480;
        msgTF.setColor(TextFieldConst.COLOR_BROWN_NEW);
        msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
        msgTF.x = this.viewBg.x + this.viewBg.width / 2 - msgTF.width / 2;
        msgTF.y = temY + temH + 45;
        msgTF.lineSpacing = 10;
        this.addChildToContainer(msgTF);
        var line = BaseBitmap.create("public_line4");
        line.width = 460;
        line.x = this.viewBg.width / 2 - line.width / 2;
        line.y = (msgTF.y + msgTF.height + 20) > 264 ? msgTF.y + msgTF.height + 20 : 264; //this._cancelBtn.y - 10 - line.height;
        this.addChildToContainer(line);
        this._cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_ORANGE, "cancelBtn", this.clickCancelHandler, this);
        this._cancelBtn.x = this.viewBg.x + this.viewBg.width / 4 - this._cancelBtn.width / 2 + 20;
        // this._cancelBtn.y = bg.y + bg.height + 15;
        this._cancelBtn.y = line.y + line.height + 15; //bg.y + bg.height - 18 - this._cancelBtn.height;
        // this._cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(this._cancelBtn);
        bg.height = this._cancelBtn.y + this._cancelBtn.height + 20 - bg.y;
    };
    ItemUseConstPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width / 4 * 3 - this._cancelBtn.width / 2 - 35, this._cancelBtn.y);
    };
    ItemUseConstPopupView.prototype.clickConfirmHandler = function (data) {
        if (this.param.data.useNum && this.param.data.useNum > this.param.data.num) {
            if (this.param.data.icon == "itemicon1") {
                App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
            }
            this.hide();
            return;
        }
        App.LogUtil.log("clickConfirmHandler");
        if (this._confirmCallback) {
            this._confirmCallback.apply(this._handler, []);
        }
        this.hide();
    };
    ItemUseConstPopupView.prototype.getConfirmBtnStr = function () {
        return "sysConfirm";
    };
    // protected getContainerY():number
    // {
    // 	return 0;
    // }
    ItemUseConstPopupView.prototype.clickCancelHandler = function (param) {
        if (this._cancelCallback) {
            this._cancelCallback.apply(this._handler, []);
        }
        this.hide();
    };
    ItemUseConstPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "itemview_daoju_bg02"
        ]);
    };
    ItemUseConstPopupView.prototype.getConfirmBtnName = function () {
        return ButtonConst.BTN_NORMAL_YELLOW;
    };
    ItemUseConstPopupView.prototype.dispose = function () {
        this._cancelCallback = null;
        this._confirmCallback = null;
        this._handler = null;
        this._cancelBtn = null;
        _super.prototype.dispose.call(this);
    };
    return ItemUseConstPopupView;
}(PopupView));
__reflect(ItemUseConstPopupView.prototype, "ItemUseConstPopupView");
