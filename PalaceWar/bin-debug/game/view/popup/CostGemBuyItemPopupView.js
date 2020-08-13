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
// TypeScript file
/**
 * 确认是否消耗元宝购买物品提示弹出框
 * author jiang
 * date 2018/4/10
 *
 * this.param.data 参数如下
 * data.useNum ->物品价格
 * data.confirmCallback ->确认按钮回调函数
 * data.cancelCallback  ->取消按钮回调函数
 * data.handler ->target
 * data.num ->玩家的元宝数量
 * data.msg ->显示消息
 * data.1   ->消耗物品id  1为元宝
 *
 * @class CostGemBuyItemPopupView
 */
var CostGemBuyItemPopupView = (function (_super) {
    __extends(CostGemBuyItemPopupView, _super);
    function CostGemBuyItemPopupView() {
        return _super.call(this) || this;
    }
    //初始化view
    CostGemBuyItemPopupView.prototype.initView = function () {
        var data = this.param.data;
        //消耗的物品id  传入1 元宝
        var itemid = data.id;
        if (data.cancelCallback) {
            this._cancelCallback = data.cancelCallback;
        }
        this._confirmCallback = data.confirmCallback;
        this._handler = data.handler;
        //弹出窗显示的字符串
        var msg = data.msg;
        //弹出窗口显示的玩家元宝数量
        var num = data.num;
        var useNum = data.useNum || 0;
        //背景
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
        //物品icon
        var item = data.goods;
        var icon = GameData.getRewardItemIcons(item, true, false)[0];
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, icon, bg, [0, 10]);
        this.addChildToContainer(icon);
        //点击物品增加文字说明 添加物品iconitem
        var itemCfg = Config.ItemCfg.getItemCfgById(Number(itemid));
        if (!itemCfg) {
            itemCfg = GameData.getRewardItemVoByIdAndType(itemid);
        }
        //信息显示
        var cur_have = LanguageManager.getlocal("itemUseNewTip", [itemCfg.name, App.StringUtil.toString(num)]);
        //添加空行
        msg += "\n\n" + cur_have;
        var msgTF = ComponentManager.getTextField(msg, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        msgTF.width = 480;
        msgTF.setColor(TextFieldConst.COLOR_BLACK);
        msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
        msgTF.x = this.viewBg.x + this.viewBg.width / 2 - msgTF.width / 2;
        msgTF.y = icon.y + icon.height + 15;
        msgTF.lineSpacing = 6;
        this.addChildToContainer(msgTF);
        //取消按钮
        this._cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "cancelBtn", this.clickCancelHandler, this);
        this._cancelBtn.x = this.viewBg.x + this.viewBg.width / 4 - this._cancelBtn.width / 2;
        this._cancelBtn.y = bg.y + bg.height + 15;
        this._cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(this._cancelBtn);
    };
    CostGemBuyItemPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width / 4 * 3 - this._cancelBtn.width / 2 - 35, this._cancelBtn.y);
    };
    CostGemBuyItemPopupView.prototype.clickConfirmHandler = function (data) {
        //判断元宝数是否足够
        if (this.param.data.useNum && this.param.data.useNum > this.param.data.num) {
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            this.hide();
            return;
        }
        App.LogUtil.log("clickConfirmHandler");
        if (this._confirmCallback) {
            this._confirmCallback.apply(this._handler, []);
        }
        this.hide();
    };
    CostGemBuyItemPopupView.prototype.getConfirmBtnStr = function () {
        return "sysConfirm";
    };
    // protected getContainerY():number
    // {
    // 	return 0;
    // }
    CostGemBuyItemPopupView.prototype.clickCancelHandler = function (param) {
        if (this._cancelCallback) {
            this._cancelCallback.apply(this._handler, []);
        }
        this.hide();
    };
    CostGemBuyItemPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    //显示的title
    CostGemBuyItemPopupView.prototype.getTitleStr = function () {
        return "itemUseConstPopupViewTitle";
    };
    CostGemBuyItemPopupView.prototype.getConfirmBtnName = function () {
        return ButtonConst.BTN_NORMAL_YELLOW;
    };
    CostGemBuyItemPopupView.prototype.dispose = function () {
        this._cancelCallback = null;
        this._confirmCallback = null;
        this._handler = null;
        this._cancelBtn = null;
        _super.prototype.dispose.call(this);
    };
    return CostGemBuyItemPopupView;
}(PopupView));
__reflect(CostGemBuyItemPopupView.prototype, "CostGemBuyItemPopupView");
//# sourceMappingURL=CostGemBuyItemPopupView.js.map