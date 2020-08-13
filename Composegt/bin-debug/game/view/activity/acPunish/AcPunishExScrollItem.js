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
 *兑换
 * author dky
 * date 2017/11/21
 * @class AcPunishExScrollItem
 */
var AcPunishExScrollItem = (function (_super) {
    __extends(AcPunishExScrollItem, _super);
    function AcPunishExScrollItem() {
        return _super.call(this) || this;
    }
    AcPunishExScrollItem.prototype.initItem = function (index, data) {
        this.width = 167 + this.getSpaceX();
        this.height = 254 + this.getSpaceY();
        ;
        var key = (index + 1).toString();
        this._key = key;
        this._itemIndex = index;
        this._itemData = data;
        var bgContainer = new BaseDisplayObjectContainer();
        var itemBg = BaseBitmap.create("public_listbg");
        itemBg.width = 167;
        itemBg.height = 254;
        bgContainer.addChild(itemBg);
        var itemBg2 = BaseBitmap.create("public_up3");
        // itemBg2.skewX=180;
        itemBg2.width = 167 - 10;
        itemBg2.height = 30;
        itemBg2.x = 5;
        itemBg2.y = 4;
        // itemBg2.height = 218;
        bgContainer.addChild(itemBg2);
        var shopId = data.sell;
        var itemCfg = data;
        var iconModel = GameData.formatRewardItem(itemCfg.sell)[0];
        var itemName = ComponentManager.getTextField(iconModel.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        itemName.setPosition(itemBg.width / 2 - itemName.width / 2, 7);
        bgContainer.addChild(itemName);
        var itemIcon = GameData.getItemIcon(iconModel, true);
        itemIcon.setPosition(itemBg.width / 2 - itemIcon.width / 2, 45);
        itemIcon.name = "icon";
        bgContainer.addChild(itemIcon);
        itemIcon.getChildByName("numLb").visible = false;
        var acVo = Api.acVoApi.getActivityVoByAidAndCode(AcPunishExPopupView.aid, AcPunishExPopupView.code);
        var maxNum = data.limit;
        var num = 0;
        if (acVo.shop[(index + 1).toString()]) {
            num = acVo.shop[(index + 1).toString()];
        }
        var leftNum = maxNum - num;
        if (Api.wifeVoApi.getWifeInfoVoById(iconModel.id)) {
            leftNum = 0;
        }
        var color = TextFieldConst.COLOR_QUALITY_GREEN;
        if (leftNum <= 0) {
            color = TextFieldConst.COLOR_WARN_RED;
        }
        var numStr = LanguageManager.getlocal("buyNum", [color.toString(), leftNum.toString()]);
        // this._numTF = ComponentManager.getTextField(leftNum.toString(),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
        // // this._numTF.setPosition(itemName.x + itemName.width + 5,itemName.y);
        // this._numTF.setPosition(itemIcon.x + itemIcon.width - 8 - this._numTF.width, itemIcon.y + itemIcon.height - 8 - this._numTF.height );
        // bgContainer.addChild(this._numTF);
        // redSp.setPosition(itemIcon.x + itemIcon.width - 8 - this._numTF.width, itemIcon.y + itemIcon.height - 8 - this._numTF.height );
        this._numTF = ComponentManager.getTextField(numStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._numTF.setPosition(itemBg.width / 2 - this._numTF.width / 2, itemIcon.y + itemIcon.height + 5);
        this._numTF.setColor(TextFieldConst.COLOR_BROWN);
        bgContainer.addChild(this._numTF);
        this._exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "exchange", this.chooseBtnClick, this);
        this._exchangeBtn.setText(itemCfg.cost + LanguageManager.getlocal("pointNumber"), false);
        this._exchangeBtn.setPosition(itemBg.width / 2 - this._exchangeBtn.width / 2, itemBg.height - this._exchangeBtn.height - 18);
        // this._exchangeBtn.setColor(TextFieldConst.COLOR_BLACK);
        bgContainer.addChild(this._exchangeBtn);
        if (leftNum <= 0) {
            // this._exchangeBtn.setEnable(false);
            this._exchangeBtn.setGray(true);
        }
        // if ( Api.dinnerVoApi.getBuyInfo()[key+1] == 1) {
        // 	App.DisplayUtil.changeToGray(itemIcon);
        // 	App.DisplayUtil.changeToGray(this._exchangeBtn);
        // }
        this.addChild(bgContainer);
    };
    AcPunishExScrollItem.prototype.chooseBtnClick = function () {
        var acVo = Api.acVoApi.getActivityVoByAidAndCode(AcPunishExPopupView.aid, AcPunishExPopupView.code);
        var maxNum = this._itemData.limit;
        var num = 0;
        if (acVo.shop[(this._itemIndex + 1).toString()]) {
            num = acVo.shop[(this._itemIndex + 1).toString()];
        }
        var leftNum = maxNum - num;
        var iconModel = GameData.formatRewardItem(this._itemData.sell)[0];
        if (Api.wifeVoApi.getWifeInfoVoById(iconModel.id)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishGetWife"));
            return;
        }
        if (leftNum <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip1"));
            return;
        }
        if (this._itemData.cost > acVo.score) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip2"));
            return;
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_PUNISH_EXITEM, { "key": this._key, "index": this._itemIndex });
    };
    AcPunishExScrollItem.prototype.refreshData = function (index) {
        var acVo = Api.acVoApi.getActivityVoByAidAndCode(AcPunishExPopupView.aid, AcPunishExPopupView.code);
        var maxNum = this._itemData.limit;
        var num = 0;
        if (acVo.shop[(index + 1).toString()]) {
            num = acVo.shop[(index + 1).toString()];
        }
        var leftNum = maxNum - num;
        var color = TextFieldConst.COLOR_QUALITY_GREEN;
        if (leftNum <= 0) {
            color = TextFieldConst.COLOR_WARN_RED;
        }
        var numStr = LanguageManager.getlocal("buyNum", [color.toString(), leftNum.toString()]);
        // let numStr = LanguageManager.getlocal("acPunishBuyItemLimit",[leftNum.toString()]);
        this._numTF.text = numStr;
        if (leftNum <= 0) {
            this._exchangeBtn.setEnable(false);
        }
    };
    AcPunishExScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcPunishExScrollItem.prototype.getSpaceX = function () {
        return 9;
    };
    AcPunishExScrollItem.prototype.dispose = function () {
        this._numTF = null;
        this._key = null;
        this._itemData = null;
        this._itemIndex = null;
        _super.prototype.dispose.call(this);
    };
    return AcPunishExScrollItem;
}(ScrollListItem));
__reflect(AcPunishExScrollItem.prototype, "AcPunishExScrollItem");
