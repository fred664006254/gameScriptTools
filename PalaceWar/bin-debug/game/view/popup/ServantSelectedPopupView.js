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
 * 选择门客弹板
 * author dmj
 * date 2017/9/28
 * @class ServantSelectedPopupView
 */
var ServantSelectedPopupView = (function (_super) {
    __extends(ServantSelectedPopupView, _super);
    function ServantSelectedPopupView() {
        var _this = _super.call(this) || this;
        // 道具id	
        _this._itemId = 0;
        _this._nameTF = null;
        _this._scrollList = null;
        _this._callback = null;
        _this._handler = null;
        _this._selectedServantId = 0;
        _this._type = 0;
        return _this;
    }
    ServantSelectedPopupView.prototype.getType = function () {
        return Number(this.param.data.type);
    };
    ServantSelectedPopupView.prototype.getResourceList = function () {
        var resArr = [];
        if (this.getType() == ServantSelectedPopupView.TYPE_BATTLE || this.getType() == ServantSelectedPopupView.TYPE_BATTLE_REC1 || this.getType() == ServantSelectedPopupView.TYPE_BATTLE_NEWBOSS || this.getType() == ServantSelectedPopupView.TYPE_ALLIANCE || this.getType() == ServantSelectedPopupView.TYPE_WIPEBOSS || this.getType() == ServantSelectedPopupView.TYPE_TOMB || this.getType() == ServantSelectedPopupView.TYPE_LOCTOMB || this.getType() == ServantSelectedPopupView.TYPE_THREEKINGDOMS) {
            resArr.push("boss_gotowar");
        }
        return _super.prototype.getResourceList.call(this).concat(resArr);
    };
    /**
     * 需要传的参数{callback：回调函数，handler:回调函数所属对下，type：面板类型（1，2，3），itemId：使用道具时传}
     */
    ServantSelectedPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SELECTED_SERVANT, this.clickItemHandler, this);
        this._callback = this.param.data.callback;
        this._handler = this.param.data.handler;
        var type = Number(this.param.data.type);
        this._type = type;
        var msgName = "";
        var msgDesc = "";
        switch (type) {
            case ServantSelectedPopupView.TYPE_USE_ITEM:
                App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM), this.useCallback, this);
                this._itemId = Number(this.param.data.itemId);
                ServantSelectedPopupView.USE_TYOE_ITEMID = this._itemId;
                var itemInfoVo = Api.itemVoApi.getItemInfoVoById(this._itemId);
                msgName = itemInfoVo.name + "x" + itemInfoVo.num;
                msgDesc = itemInfoVo.desc;
                break;
            default:
                break;
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
        var servantInfoVoList = Api.servantVoApi.getServantInfoListWithSort(2);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, bg.width - 10, bg.height - 20);
        var list = null;
        switch (type) {
            case ServantSelectedPopupView.TYPE_BATTLE:
                list = ComponentManager.getScrollList(BossSelectedScrollItem, this.param.data.info, rect);
                break;
            case ServantSelectedPopupView.TYPE_BATTLE_REC1:
                list = ComponentManager.getScrollList(BossRecSelectedScrollItem, this.param.data.info, rect);
                break;
            case ServantSelectedPopupView.TYPE_BATTLE_NEWBOSS:
                list = ComponentManager.getScrollList(BossnewRecSelectedScrollItem, this.param.data.info, rect);
                break;
            case ServantSelectedPopupView.TYPE_ALLIANCE:
                list = ComponentManager.getScrollList(AllianceBossSelectScrollItem, this.param.data.info, rect);
                break;
            case ServantSelectedPopupView.TYPE_WIPEBOSS:
                list = ComponentManager.getScrollList(AcWipeBossSelectScrollItem, this.param.data.info, rect, this.param.data.code);
                break;
            case ServantSelectedPopupView.TYPE_EMPWAR:
                list = ComponentManager.getScrollList(EmperorWarSelectServantItem, this.param.data.info, rect);
                break;
            case ServantSelectedPopupView.TYPE_TOMB:
                list = ComponentManager.getScrollList(AcTombSelectScrollItem, this.param.data.info, rect, this.param.data.code);
                break;
            case ServantSelectedPopupView.TYPE_LOCTOMB:
                list = ComponentManager.getScrollList(AcLocTombSelectScrollItem, this.param.data.info, rect, this.param.data.code);
                break;
            case ServantSelectedPopupView.TYPE_THREEKINGDOMS:
                list = ComponentManager.getScrollList(AcThreeKingdomsHeroAttackSelectScrollItem, this.param.data.info, rect, this.param.data.code);
                break;
            default:
                list = ComponentManager.getScrollList(ServantSelectedScrollItem, servantInfoVoList, rect);
                break;
        }
        list.setPosition(bg.x + 10, bg.y + 10);
        this.addChildToContainer(list);
        this._scrollList = list;
    };
    /** 发送请求返回数据后，对数据进行刷新 */
    ServantSelectedPopupView.prototype.useCallback = function (event) {
        if (this._type == ServantSelectedPopupView.TYPE_USE_ITEM) {
            var itemInfoVo = Api.itemVoApi.getItemInfoVoById(this._itemId);
            this._nameTF.text = itemInfoVo.name + "x" + itemInfoVo.num;
            var curItemScrollItem = this._scrollList.getItemByIndex(this._index);
            curItemScrollItem.update();
        }
    };
    /**点击具体门客按钮事件 */
    ServantSelectedPopupView.prototype.clickItemHandler = function (event) {
        var data = event.data;
        this._index = Number(data.index);
        this._selectedServantId = Number(data.id);
        switch (this._type) {
            case ServantSelectedPopupView.TYPE_USE_ITEM:
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
            case ServantSelectedPopupView.TYPE_BATTLE:
            case ServantSelectedPopupView.TYPE_BATTLE_REC1:
            case ServantSelectedPopupView.TYPE_BATTLE_NEWBOSS:
            case ServantSelectedPopupView.TYPE_ALLIANCE:
            case ServantSelectedPopupView.TYPE_EMPWAR:
            case ServantSelectedPopupView.TYPE_WIPEBOSS:
            case ServantSelectedPopupView.TYPE_TOMB:
            case ServantSelectedPopupView.TYPE_LOCTOMB:
            case ServantSelectedPopupView.TYPE_THREEKINGDOMS:
                Api.dailybossVoApi.needcheckweapon = 1;
                this._callback.apply(this._handler, [data]);
                this.hide();
                break;
            case ServantSelectedPopupView.TYPE_STUDY:
                this._callback.apply(this._handler, data);
                break;
        }
    };
    /**回调函数处理，使用道具时会用 */
    ServantSelectedPopupView.prototype.callbackHandler = function (itemNum, itemId) {
        var data = {};
        if (this._type == ServantSelectedPopupView.TYPE_USE_ITEM) {
            data = [itemNum, itemId, this._selectedServantId];
        }
        this._callback.apply(this._handler, data);
    };
    ServantSelectedPopupView.prototype.getBgExtraHeight = function () {
        return 40;
    };
    ServantSelectedPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SELECTED_SERVANT, this.clickItemHandler, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM), this.useCallback, this);
        this._itemId = 0;
        this._nameTF = null;
        this._scrollList = null;
        this._callback = null;
        this._handler = null;
        this._selectedServantId = 0;
        this._index = 0;
        this._type = 0;
        _super.prototype.dispose.call(this);
    };
    /**使用道具时 */
    ServantSelectedPopupView.TYPE_USE_ITEM = 1;
    /**战斗时 */
    ServantSelectedPopupView.TYPE_BATTLE = 2;
    /**学习时 */
    ServantSelectedPopupView.TYPE_STUDY = 3;
    /**
     * 战斗，可以恢复一次
     */
    ServantSelectedPopupView.TYPE_BATTLE_REC1 = 4;
    /**帮会  */
    ServantSelectedPopupView.TYPE_ALLIANCE = 5;
    ServantSelectedPopupView.USE_TYOE_ITEMID = 0;
    /**称帝战上阵 */
    ServantSelectedPopupView.TYPE_EMPWAR = 6;
    /**围剿鳌拜 */
    ServantSelectedPopupView.TYPE_WIPEBOSS = 7;
    /**跨服皇陵 */
    ServantSelectedPopupView.TYPE_TOMB = 8;
    /**东海皇陵 */
    ServantSelectedPopupView.TYPE_LOCTOMB = 9;
    ServantSelectedPopupView.TYPE_BATTLE_NEWBOSS = 10;
    /**三国争霸 */
    ServantSelectedPopupView.TYPE_THREEKINGDOMS = 11;
    return ServantSelectedPopupView;
}(PopupView));
__reflect(ServantSelectedPopupView.prototype, "ServantSelectedPopupView");
//# sourceMappingURL=ServantSelectedPopupView.js.map