/**
 * 门客信息，道具部分
 * author yanyuling
 * date 2017/11/20
 * @class ServantInfoItemsScrollItem
 */
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
var ServantInfoItemsScrollItem = (function (_super) {
    __extends(ServantInfoItemsScrollItem, _super);
    function ServantInfoItemsScrollItem() {
        var _this = _super.call(this) || this;
        _this._lastUseNum = 0;
        _this._isRequsting = false;
        _this._mainTaskHandKey = null;
        _this._numbg = null;
        _this._itembg = null;
        return _this;
    }
    ServantInfoItemsScrollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM), this.useBtnHandlerCallBaclk, this);
        var itemInfoVo = data;
        this._itemId = itemInfoVo.id;
        var bottomBg = BaseBitmap.create("public_9_managebg");
        bottomBg.width = 592;
        bottomBg.height = 84; //126;
        this.addChild(bottomBg);
        var scaleNum = 0.85;
        var itembg = BaseBitmap.create(itemInfoVo.iconBg);
        itembg.x = 0; //10
        itembg.y = 0; //bottomBg.height/2 - itembg.height/2;
        this.addChild(itembg);
        itembg.scaleX = scaleNum;
        itembg.scaleY = scaleNum;
        this._itembg = itembg;
        var item = BaseLoadBitmap.create(itemInfoVo.icon);
        // item.scaleX = item.scaleY = itembg.width/115;
        item.x = itembg.x + itembg.width / 2 - 100 / 2;
        item.y = itembg.y + itembg.height / 2 - 100 / 2;
        this.addChild(item);
        item.scaleX = scaleNum;
        item.scaleY = scaleNum;
        var numLb = ComponentManager.getTextField(String(itemInfoVo.num), 16, TextFieldConst.COLOR_WHITE);
        numLb.name = "numLb";
        var numbg = BaseBitmap.create("public_9_itemnumbg");
        if (itemInfoVo.num > 99) {
            numbg.width = numLb.width + 18;
        }
        numbg.name = "numbg";
        numbg.setPosition(itembg.x + itembg.width * scaleNum - numbg.width - 4, itembg.y + itembg.height * scaleNum - numbg.height - 4);
        numLb.setPosition(itembg.x + itembg.width * scaleNum - numLb.width - 12, numbg.y + numbg.height / 2 - numLb.height / 2);
        this.addChild(numbg);
        this.addChild(numLb);
        this._numTF = numLb;
        this._numbg = numbg;
        var nameBg = BaseBitmap.create("public_numbg");
        nameBg.x = itembg.x + itembg.width + 5;
        nameBg.y = itembg.y + 5;
        this.addChild(nameBg);
        nameBg.visible = false;
        var itemName = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        itemName.textColor = TextFieldConst.COLOR_BROWN;
        itemName.text = LanguageManager.getlocal("itemName_" + itemInfoVo.id);
        itemName.x = nameBg.x + 10; //nameBg.x  + nameBg.width/2 -itemName.width/2;
        itemName.y = nameBg.y + nameBg.height / 2 - itemName.height / 2;
        this.addChild(itemName);
        var itemDescTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        itemDescTxt.multiline = true;
        itemDescTxt.width = 315;
        itemDescTxt.text = LanguageManager.getlocal("servant_itemEffect", [LanguageManager.getlocal("itemDesc_" + itemInfoVo.id)]);
        itemDescTxt.x = nameBg.x + 10;
        // itemDescTxt.textColor =TextFieldConst.COLOR_BLACK;
        itemDescTxt.y = nameBg.y + nameBg.height + 3;
        this.addChild(itemDescTxt);
        var useBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "useBtn", this.useBtnHandler, this);
        useBtn.x = bottomBg.x + bottomBg.width - 140;
        useBtn.y = bottomBg.y + bottomBg.height / 2 - useBtn.height / 2;
        this.addChild(useBtn);
        egret.callLater(function () {
            this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(useBtn, useBtn.width / 2, useBtn.height / 2, [useBtn], 107, true, function () {
                if (index === 0 && ServantInfoItemsScrollItem.servantId === Api.servantVoApi.getIdOfTotalMax()) {
                    this.parent.setChildIndex(this, 100);
                    return true;
                }
                else {
                    return false;
                }
            }, this);
        }, this);
    };
    ServantInfoItemsScrollItem.prototype.showTipAfterUse = function (rewardsStr) {
        var addStr = "";
        var rewardTab = App.StringUtil.splitString(rewardsStr, "_");
        if (rewardTab[0] == "7") {
            addStr = LanguageManager.getlocal("servantInfo_speciality" + rewardTab[1]) + "+" + rewardTab[2];
        }
        else {
            addStr = LanguageManager.getlocal("servantRewardType" + rewardTab[0], [rewardTab[2]]);
        }
        App.CommonUtil.showTip(addStr);
    };
    ServantInfoItemsScrollItem.prototype.useBtnHandlerCallBaclk = function (event) {
        if (event && !this._isRequsting) {
            this._isRequsting = false;
            return;
        }
        if (event.data.data.ret != 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("servantinfo_itemuseFailed"));
            return;
        }
        var rdata = event.data.data.data;
        var rewardList = GameData.formatRewardItem(rdata.rewards);
        App.CommonUtil.playRewardFlyAction(rewardList);
        if (this._lastUseNum > 0) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRSH_SERVANT_ITEM_USE, this._lastUseNum);
            this._lastUseNum = 0;
        }
        var num = 0;
        if (this._itemId) {
            num = Api.itemVoApi.getItemNumInfoVoById(this._itemId);
        }
        if (num > 0) {
            this._numTF.text = num.toString();
            if (num > 99) {
                this._numbg.width = this._numTF.width + 18;
            }
            else {
                this._numbg.width = 35;
            }
            // this._numbg.setPosition(112-this._numbg.width-4,112-this._numbg.height-4);
            // this._numTF.setPosition(112-this._numTF.width-10, this._numbg.y+this._numbg.height/2-this._numTF.height/2 );
            var numbg = this._numbg;
            var numLb = this._numTF;
            var itembg = this._itembg;
            var scaleNum = 0.85;
            this._numbg.setPosition(itembg.x + itembg.width * scaleNum - numbg.width - 4, itembg.y + itembg.height * scaleNum - numbg.height - 4);
            this._numTF.setPosition(itembg.x + itembg.width * scaleNum - numLb.width - 12, numbg.y + numbg.height / 2 - numLb.height / 2);
        }
        else {
            this._itemId = null;
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST);
        }
    };
    ServantInfoItemsScrollItem.prototype.doUseRequest = function (num) {
        this._lastUseNum = num;
        var tmpServantId = ServantInfoItemsScrollItem.servantId;
        NetManager.request(NetRequestConst.REQUEST_USE_ITEM, { itemId: this._itemId, itemNum: num, servantId: tmpServantId });
    };
    ServantInfoItemsScrollItem.prototype.useBtnHandler = function () {
        /**
         * 需要刷新父UI的道具总数量
         */
        var num = Api.itemVoApi.getItemNumInfoVoById(this._itemId);
        this._isRequsting = true;
        if (num >= 5) {
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSEPOPUPVIEW, { itemId: this._itemId, callback: this.doUseRequest, handler: this });
            return;
        }
        this.doUseRequest(1);
    };
    ServantInfoItemsScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM), this.useBtnHandlerCallBaclk, this);
        this._lastUseNum = 0;
        this._numTF = null;
        this._itemId = null;
        this._isRequsting = false;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        this._numbg = null;
        this._itembg = null;
        _super.prototype.dispose.call(this);
    };
    ServantInfoItemsScrollItem.servantId = "";
    return ServantInfoItemsScrollItem;
}(ScrollListItem));
__reflect(ServantInfoItemsScrollItem.prototype, "ServantInfoItemsScrollItem");
//# sourceMappingURL=ServantInfoItemsScrollItem.js.map