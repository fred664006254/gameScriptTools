var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 *兑换
 * author dky
 * date 2017/12/7
 * @class AllianceExScrollItem
 */
var AllianceExScrollItem = /** @class */ (function (_super) {
    __extends(AllianceExScrollItem, _super);
    function AllianceExScrollItem() {
        var _this = _super.call(this) || this;
        _this._mainTaskHandKey = null;
        return _this;
    }
    AllianceExScrollItem.prototype.initItem = function (index, data) {
        var _this = this;
        this.width = 172 + this.getSpaceX();
        this.height = 229 + this.getSpaceY();
        ;
        var key = (index + 1).toString();
        this._key = String(data.id);
        this._itemIndex = index;
        this._itemData = data;
        var bgContainer = new BaseDisplayObjectContainer();
        var itemBg = BaseBitmap.create("public_9_bg4");
        itemBg.width = 170;
        itemBg.height = 228;
        bgContainer.addChild(itemBg);
        var itemBg2 = BaseBitmap.create("public_9_cell_title");
        itemBg2.width = 170 - 6;
        itemBg2.x = 3;
        itemBg2.y = 3;
        // itemBg2.height = 218;
        bgContainer.addChild(itemBg2);
        var shopId = data.sell;
        var itemCfg = data;
        var iconModel = GameData.formatRewardItem(itemCfg.content)[0];
        var itemName = ComponentManager.getTextField(iconModel.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        itemName.setPosition(itemBg.width / 2 - itemName.width / 2, 7);
        bgContainer.addChild(itemName);
        var itemIcon = GameData.getItemIcon(iconModel, true);
        itemIcon.setPosition(itemBg.width / 2 - itemIcon.width / 2, 35);
        itemIcon.name = "icon";
        bgContainer.addChild(itemIcon);
        itemIcon.getChildByName("numLb").visible = false;
        if (itemIcon.getChildByName("numbg")) {
            itemIcon.getChildByName("numbg").visible = false;
        }
        var myAcVo = Api.allianceVoApi.getMyAllianceVo();
        var acVo = Api.allianceVoApi.getAllianceVo();
        var maxNum = 1;
        if (data.limitNum) {
            maxNum = data.limitNum;
        }
        else {
            maxNum = acVo.level - data.needAllianceLv + 1;
        }
        if (maxNum < 1) {
            maxNum = 1;
        }
        var num = 0;
        if (myAcVo.shop && myAcVo.shop[(data.id).toString()]) {
            num = myAcVo.shop[(data.id).toString()];
        }
        var leftNum = maxNum - num;
        var titlevo = Api.itemVoApi.getTitleInfoVoById(4015);
        var titlecfg = Config.TitleCfg.getTitleCfgById(4015);
        if (itemCfg.content.indexOf("4015") > -1) {
            if (Api.switchVoApi.checkOpenTitleLv()) {
                if (titlevo && (titlevo.lv >= titlecfg.lvLimit)) {
                    leftNum = 0;
                }
            }
            else {
                if (titlevo && titlevo.num > 0) {
                    leftNum = 0;
                }
            }
        }
        var color = TextFieldConst.COLOR_QUALITY_GREEN;
        if (leftNum <= 0) {
            color = TextFieldConst.COLOR_WARN_RED;
        }
        var numStr = LanguageManager.getlocal("todayBuyNum", [color.toString(), leftNum.toString()]);
        // this._numTF = ComponentManager.getTextField(leftNum.toString(),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
        // // this._numTF.setPosition(itemName.x + itemName.width + 5,itemName.y);
        // this._numTF.setPosition(itemIcon.x + itemIcon.width - 8 - this._numTF.width, itemIcon.y + itemIcon.height - 8 - this._numTF.height );
        // bgContainer.addChild(this._numTF);
        // redSp.setPosition(itemIcon.x + itemIcon.width - 8 - this._numTF.width, itemIcon.y + itemIcon.height - 8 - this._numTF.height );
        this._numTF = ComponentManager.getTextField(numStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._numTF.setPosition(itemBg.width / 2 - this._numTF.width / 2, itemIcon.y + itemIcon.height + 3);
        bgContainer.addChild(this._numTF);
        this._exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "exchange", this.chooseBtnClick, this);
        if (PlatformManager.checkIsEnLang()) {
            this._exchangeBtn.setText(data.needContribution + "", false);
        }
        else {
            this._exchangeBtn.setText(data.needContribution + LanguageManager.getlocal("allianceBuildScore2"), false);
        }
        this._exchangeBtn.setPosition(itemBg.width / 2 - this._exchangeBtn.width / 2, itemBg.height - this._exchangeBtn.height - 8);
        this._exchangeBtn.setColor(TextFieldConst.COLOR_BLACK);
        bgContainer.addChild(this._exchangeBtn);
        if (acVo.level - data.needAllianceLv < 0) {
            var maskBg = BaseBitmap.create("public_itemmask");
            // maskBg.x = this.width/2 - maskBg.width/2-5;
            maskBg.width = 170;
            maskBg.height = 228;
            // maskBg.y = 80;
            bgContainer.addChild(maskBg);
            var intimacyBg = BaseBitmap.create("public_numbg");
            intimacyBg.x = this.width / 2 - intimacyBg.width / 2 - 5;
            intimacyBg.height = 50;
            intimacyBg.y = 80;
            bgContainer.addChild(intimacyBg);
            var lockText = ComponentManager.getTextField(LanguageManager.getlocal("allianceExchangeLock", [data.needAllianceLv]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            lockText.width = 80;
            lockText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
            lockText.textAlign = egret.HorizontalAlign.CENTER;
            lockText.setPosition(itemBg.width / 2 - lockText.width / 2, intimacyBg.y + 5);
            bgContainer.addChild(lockText);
            if (PlatformManager.checkIsEnLang()) {
                intimacyBg.height = lockText.height + 10;
                // intimacyBg.x = lockText.x + lockText.width / 2 - intimacyBg.width/2;
                // intimacyBg.y = lockText.y + lockText.height / 2 - intimacyBg.height/2;
            }
        }
        if (leftNum <= 0) {
            this._exchangeBtn.setEnable(false);
        }
        if (acVo.level >= data.needAllianceLv && leftNum > 0) {
            var curTaskId = Api.mainTaskVoApi.getCurMainTaskId();
            var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(curTaskId);
            if (taskCfg) {
                if (taskCfg.questType == 701) {
                    var baseView = ViewController.getInstance().getView("AllianceExPopupView");
                    var taskIndex = baseView.getMainTaskCanChangeIndex();
                    if (taskIndex > -1 && taskIndex == index) {
                        egret.callLater(function () {
                            _this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(_this, itemBg.x + itemBg.width / 2 - 10, itemBg.y + itemBg.height / 2 + 50, [_this._exchangeBtn], 701, true, function () {
                                this.parent.setChildIndex(this, 100);
                                return true;
                            }, _this);
                        }, this, null);
                    }
                }
            }
        }
        // if ( Api.dinnerVoApi.getBuyInfo()[key+1] == 1) {
        // 	App.DisplayUtil.changeToGray(itemIcon);
        // 	App.DisplayUtil.changeToGray(this._exchangeBtn);
        // }
        this.addChild(bgContainer);
    };
    AllianceExScrollItem.prototype.chooseBtnClick = function () {
        var myVo = Api.allianceVoApi.getMyAllianceVo();
        var acVo = Api.allianceVoApi.getAllianceVo();
        if (acVo.level - this._itemData.needAllianceLv < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceExchangeLock", [this._itemData.needAllianceLv]));
            return;
        }
        var maxNum = 1;
        if (this._itemData.limitNum) {
            maxNum = this._itemData.limitNum;
        }
        else {
            maxNum = acVo.level - this._itemData.needAllianceLv + 1;
        }
        if (maxNum < 1) {
            maxNum = 1;
        }
        var num = 0;
        if (myVo.shop[(this._itemData.id).toString()]) {
            num = myVo.shop[(this._itemData.id).toString()];
        }
        var leftNum = maxNum - num;
        var titlevo = Api.itemVoApi.getTitleInfoVoById(4015);
        if (!Api.switchVoApi.checkOpenTitleLv() && this._itemData.content.indexOf("4015") > -1 && (titlevo && titlevo.num > 0)) {
            leftNum = 0;
        }
        if (leftNum <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip1"));
            return;
        }
        if (this._itemData.needContribution > myVo.ctv) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceNoCon"));
            return;
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_PUNISH_EXITEM, { "key": this._itemData.id, "index": this._itemIndex });
    };
    AllianceExScrollItem.prototype.refreshData = function (index) {
        var myVo = Api.allianceVoApi.getMyAllianceVo();
        var acVo = Api.allianceVoApi.getAllianceVo();
        var maxNum = 1;
        if (this._itemData.limitNum) {
            maxNum = this._itemData.limitNum;
        }
        else {
            maxNum = acVo.level - this._itemData.needAllianceLv + 1;
        }
        var num = 0;
        if (myVo.shop[(this._itemData.id).toString()]) {
            num = myVo.shop[(this._itemData.id).toString()];
        }
        var leftNum = maxNum - num;
        var titlevo = Api.itemVoApi.getTitleInfoVoById(4015);
        var titlecfg = Config.TitleCfg.getTitleCfgById(4015);
        if (this._itemData.content.indexOf("4015") > -1) {
            if (Api.switchVoApi.checkOpenTitleLv()) {
                if (titlevo && (titlevo.lv >= titlecfg.lvLimit)) {
                    leftNum = 0;
                }
            }
            else {
                if (titlevo && titlevo.num > 0) {
                    leftNum = 0;
                }
            }
        }
        var color = TextFieldConst.COLOR_QUALITY_GREEN;
        if (leftNum <= 0) {
            color = TextFieldConst.COLOR_WARN_RED;
        }
        var numStr = LanguageManager.getlocal("todayBuyNum", [color.toString(), leftNum.toString()]);
        // let numStr = LanguageManager.getlocal("acPunishBuyItemLimit",[leftNum.toString()]);
        this._numTF.text = numStr;
        if (leftNum <= 0) {
            this._exchangeBtn.setEnable(false);
        }
    };
    AllianceExScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AllianceExScrollItem.prototype.getSpaceX = function () {
        return 5;
    };
    AllianceExScrollItem.prototype.dispose = function () {
        this._numTF = null;
        this._key = null;
        this._itemData = null;
        this._itemIndex = null;
        this._exchangeBtn = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceExScrollItem;
}(ScrollListItem));
//# sourceMappingURL=AllianceExScrollItem.js.map