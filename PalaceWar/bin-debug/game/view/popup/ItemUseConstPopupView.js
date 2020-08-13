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
        var _this = _super.call(this) || this;
        _this._mainTaskHandKey = null;
        return _this;
    }
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
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = data.height || 224;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        var temX = this.viewBg.x + this.viewBg.width / 2 - 50;
        var temY = 29;
        var temW = 100;
        var temH = 100;
        var itembg = BaseBitmap.create(iconBg);
        itembg.width = 108;
        itembg.height = 108;
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
        // let numTF:BaseTextField = ComponentManager.getTextField(useNum.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);;
        // numTF.x = temX + 98 - numTF.width;
        // numTF.y = temY + 98 - numTF.height;
        // this.addChildToContainer(numTF);
        var numLb = ComponentManager.getTextField(String(useNum), 16, TextFieldConst.COLOR_WHITE);
        numLb.name = "numLb";
        var numbg = BaseBitmap.create("public_9_itemnumbg");
        if (useNum > 99) {
            numbg.width = numLb.width + 18;
        }
        numbg.name = "numbg";
        numbg.setPosition(itembg.x + itembg.width - numbg.width - 4, itembg.y + itembg.height - numbg.height - 4);
        numLb.setPosition(itembg.x + itembg.width - numLb.width - 12, numbg.y + numbg.height / 2 - numLb.height / 2);
        this.addChildToContainer(numbg);
        this.addChildToContainer(numLb);
        //换行添加当前拥有数目
        // msg += `\n${cur_have}`;
        var msgTF = ComponentManager.getTextField(msg, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        msgTF.width = 480;
        msgTF.setColor(TextFieldConst.COLOR_BLACK);
        msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
        msgTF.x = this.viewBg.x + this.viewBg.width / 2 - msgTF.width / 2;
        msgTF.y = temY + temH + 25;
        msgTF.lineSpacing = 6;
        this.addChildToContainer(msgTF);
        var cur_have = LanguageManager.getlocal(num >= useNum ? "itemUseNewTip" : "itemUseNewTip2", [itemCfg.name, App.StringUtil.toString(num)]);
        var haveTxt = ComponentManager.getTextField(cur_have, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        haveTxt.width = 480;
        haveTxt.textAlign = TextFieldConst.ALIGH_CENTER;
        haveTxt.x = this.viewBg.x + this.viewBg.width / 2 - haveTxt.width / 2;
        haveTxt.y = msgTF.y + msgTF.textHeight + 25;
        this.addChildToContainer(haveTxt);
        // msgTF.lineSpacing = data.linespacing || 20;
        if (haveTxt.y > 208) {
            haveTxt.y = 208;
        }
        this._cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "cancelBtn", this.clickCancelHandler, this);
        this._cancelBtn.x = this.viewBg.x + this.viewBg.width / 2 - this._cancelBtn.width - 50;
        this._cancelBtn.y = bg.y + bg.height + 24;
        this._cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(this._cancelBtn);
    };
    ItemUseConstPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.setConfirmBtnPosition(this.viewBg.width / 2 + 50, this._cancelBtn.y);
        if (this.param && this.param.data.isMainTask) {
            var taskId = Api.mainTaskVoApi.getCurMainTaskId();
            var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
            if (taskCfg && taskCfg.questType == 302) {
                this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(this.container, this.viewBg.width / 2 + 50 + 70, this._cancelBtn.y + 10, [this], taskCfg.questType, true, function () {
                    return true;
                }, this);
            }
        }
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
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    ItemUseConstPopupView.prototype.getConfirmBtnName = function () {
        return ButtonConst.BTN_NORMAL_YELLOW;
    };
    ItemUseConstPopupView.prototype.getBgExtraHeight = function () {
        return 30;
    };
    ItemUseConstPopupView.prototype.dispose = function () {
        this._cancelCallback = null;
        this._confirmCallback = null;
        this._handler = null;
        this._cancelBtn = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        _super.prototype.dispose.call(this);
    };
    return ItemUseConstPopupView;
}(PopupView));
__reflect(ItemUseConstPopupView.prototype, "ItemUseConstPopupView");
//# sourceMappingURL=ItemUseConstPopupView.js.map