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
 * 选择红颜弹板
 * @class WifeSelectedPopupView
 */
var WifeSelectedPopupView = (function (_super) {
    __extends(WifeSelectedPopupView, _super);
    function WifeSelectedPopupView() {
        var _this = _super.call(this) || this;
        // 道具id	
        _this._itemId = 0;
        _this._nameTF = null;
        _this._scrollList = null;
        _this._callback = null;
        _this._handler = null;
        _this._selectedServantId = 0;
        _this._type = 0;
        _this._itemType = 0;
        return _this;
    }
    WifeSelectedPopupView.prototype.getType = function () {
        return Number(this.param.data.type);
    };
    WifeSelectedPopupView.prototype.getResourceList = function () {
        var resArr = ['wife_banishing', "wife_banishing_text"];
        // if(this.getType()==ServantSelectedPopupView.TYPE_BATTLE||this.getType()==ServantSelectedPopupView.TYPE_BATTLE_REC1||this.getType()==ServantSelectedPopupView.TYPE_ALLIANCE||this.getType()==ServantSelectedPopupView.TYPE_WIPEBOSS)
        // {
        // 	resArr.push("boss_gotowar");
        // }
        return _super.prototype.getResourceList.call(this).concat(resArr);
    };
    /**
     * 需要传的参数{callback：回调函数，handler:回调函数所属对下，type：面板类型（1，2，3），itemId：使用道具时传}
     */
    WifeSelectedPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SELECTED_WIFE, this.clickItemHandler, this);
        this._callback = this.param.data.callback;
        this._handler = this.param.data.handler;
        var type = Number(this.param.data.type);
        this._type = type;
        var msgName = "";
        var msgDesc = "";
        switch (type) {
            case WifeSelectedPopupView.TYPE_USE_ITEM:
                App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM), this.useCallback, this);
                this._itemId = Number(this.param.data.itemId);
                WifeSelectedPopupView.USE_TYOE_ITEMID = this._itemId;
                var itemInfoVo = Api.itemVoApi.getItemInfoVoById(this._itemId);
                msgName = itemInfoVo.name + "x" + itemInfoVo.num;
                msgDesc = itemInfoVo.desc;
                break;
            default:
                break;
        }
        if (this._itemId == 1359) {
            this._itemType = 2;
        }
        if (msgName) {
            this._nameTF = ComponentManager.getTextField(msgName, TextFieldConst.FONTSIZE_CONTENT_SMALL);
            this._nameTF.x = 35 + GameData.popupviewOffsetX;
            this._nameTF.y = 15;
            this._nameTF.setColor(TextFieldConst.COLOR_BLACK);
            this.addChildToContainer(this._nameTF);
        }
        if (msgDesc) {
            var descTF = ComponentManager.getTextField(msgDesc, TextFieldConst.FONTSIZE_CONTENT_SMALL);
            descTF.textAlign = TextFieldConst.ALIGH_RIGHT;
            descTF.x = this.viewBg.width - 35 - descTF.width - GameData.popupviewOffsetX;
            descTF.y = 15;
            descTF.setColor(TextFieldConst.COLOR_BLACK);
            this.addChildToContainer(descTF);
        }
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 640;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 45;
        this.addChildToContainer(bg);
        if (!msgName && !msgDesc) {
            bg.height += 30;
            bg.y -= 30;
        }
        var wifeInfoVoList;
        if (this._itemType == 2) {
            wifeInfoVoList = Api.wifeVoApi.getWifeNotSkillLevelMaxList();
        }
        else {
            wifeInfoVoList = Api.wifeVoApi.getWifeInfoVoList(true);
        }
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, bg.width - 10, bg.height - 20);
        var list = null;
        switch (type) {
            default:
                list = ComponentManager.getScrollList(WifeSelectedScrollItem, wifeInfoVoList, rect, this._itemType);
                break;
        }
        list.setPosition(bg.x + 10, bg.y + 10);
        this.addChildToContainer(list);
        list.setEmptyTip(LanguageManager.getlocal("wifeSkillLevelAllMax"));
        this._scrollList = list;
    };
    /** 发送请求返回数据后，对数据进行刷新 */
    WifeSelectedPopupView.prototype.useCallback = function (event) {
        if (this._type == WifeSelectedPopupView.TYPE_USE_ITEM) {
            var itemInfoVo = Api.itemVoApi.getItemInfoVoById(this._itemId);
            this._nameTF.text = itemInfoVo.name + "x" + itemInfoVo.num;
            var curItemScrollItem = this._scrollList.getItemByIndex(this._index);
            curItemScrollItem.update();
        }
    };
    /**点击具体门客按钮事件 */
    WifeSelectedPopupView.prototype.clickItemHandler = function (event) {
        var data = event.data;
        this._index = Number(data.index);
        this._selectedServantId = Number(data.id);
        switch (this._type) {
            case WifeSelectedPopupView.TYPE_USE_ITEM:
                var itemInfoVo = Api.itemVoApi.getItemInfoVoById(this._itemId);
                if (itemInfoVo.num >= ItemView.MAX_NUM) {
                    ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSEPOPUPVIEW, { itemId: itemInfoVo.id, callback: this.callbackHandler, handler: this });
                }
                else {
                    if (itemInfoVo.num <= 0) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
                    }
                    else {
                        this.callbackHandler(1, this._itemId);
                    }
                }
                break;
        }
    };
    /**回调函数处理，使用道具时会用 */
    WifeSelectedPopupView.prototype.callbackHandler = function (itemNum, itemId) {
        var data = {};
        if (this._type == WifeSelectedPopupView.TYPE_USE_ITEM) {
            data = [itemNum, itemId, this._selectedServantId];
        }
        this._callback.apply(this._handler, data);
    };
    WifeSelectedPopupView.prototype.getBgExtraHeight = function () {
        return 40;
    };
    WifeSelectedPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SELECTED_WIFE, this.clickItemHandler, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM), this.useCallback, this);
        this._itemId = 0;
        this._nameTF = null;
        this._scrollList = null;
        this._callback = null;
        this._handler = null;
        this._selectedServantId = 0;
        this._index = 0;
        this._type = 0;
        this._itemType = 0;
        _super.prototype.dispose.call(this);
    };
    /**使用道具时 */
    WifeSelectedPopupView.TYPE_USE_ITEM = 1;
    WifeSelectedPopupView.USE_TYOE_ITEMID = 0;
    return WifeSelectedPopupView;
}(PopupView));
__reflect(WifeSelectedPopupView.prototype, "WifeSelectedPopupView");
//# sourceMappingURL=WifeSelectedPopupView.js.map