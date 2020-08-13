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
 * 拳霸天下 shopItem
 * author ycg
 * date 2019.9.25
 * @class AcPunishShopScrollItem
 */
var AcPunishShopScrollItem = (function (_super) {
    __extends(AcPunishShopScrollItem, _super);
    function AcPunishShopScrollItem() {
        var _this = _super.call(this) || this;
        _this._code = null;
        _this._aid = null;
        _this._dragProgressBar = null;
        _this._numBg = null;
        _this._selectedNumTF = null;
        _this._dragMaxNum = 0;
        _this._useNum = 1;
        _this._data = null;
        _this._vo = null;
        _this._buyButton = null;
        return _this;
    }
    AcPunishShopScrollItem.prototype.initItem = function (index, data, param) {
        this._itemIndex = index;
        this._aid = param.aid;
        this._code = param.code;
        this._data = data;
        var type = param.type;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        this._vo = vo;
        var itemData = data.data;
        var itemBg = BaseBitmap.create("public_9_bg14");
        itemBg.width = 530;
        this.addChild(itemBg);
        var itemCfg = null;
        var itemIcon = null;
        var itemName = null;
        if (type == 2) {
            itemCfg = GameData.formatRewardItem(itemData.sell)[0];
            itemIcon = GameData.getItemIcon(itemCfg, true);
            itemIcon.getChildByName("numLb").visible = false;
            if (itemIcon.getChildByName("numbg")) {
                itemIcon.getChildByName("numbg").visible = false;
            }
            itemName = ComponentManager.getTextField(itemCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, itemCfg.nameColor);
        }
        else {
            // App.LogUtil.log("itemdata.ite: "+itemData.item+"  type: "+type);
            itemCfg = Config.ItemCfg.getItemCfgById(itemData.item);
            itemIcon = itemCfg.getIconContainer(true);
            itemName = itemCfg.nameTxt;
        }
        itemBg.height = 148;
        itemIcon.setPosition(20, 20);
        itemIcon.name = "icon";
        this.addChild(itemIcon);
        var itemNameBg = BaseBitmap.create("public_9_bg15");
        itemNameBg.setPosition(itemIcon.x + itemIcon.width - 3, itemIcon.y);
        this.addChild(itemNameBg);
        // let itemName:BaseTextField = itemCfg.nameTxt;
        itemNameBg.width = 160;
        itemName.setPosition(itemNameBg.x + itemNameBg.width / 2 - itemName.width / 2, itemNameBg.y + itemNameBg.height / 2 - itemName.height / 2);
        this.addChild(itemName);
        if (type == 0) {
            //itemCfg.desc
            var itemDesc = ComponentManager.getTextField(itemCfg.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            itemDesc.setPosition(itemNameBg.x + 8, itemNameBg.y + itemNameBg.height + 4);
            itemDesc.width = 240;
            itemDesc.lineSpacing = 2;
            this.addChild(itemDesc);
            //购买消耗
            var moneyIconStr = "";
            var moneyNum = 0;
            if (itemData.costGold) {
                moneyIconStr = "public_icon2";
                moneyNum = itemData.costGold;
            }
            else if (itemData.costGem) {
                moneyIconStr = "public_icon1";
                moneyNum = itemData.costGem;
            }
            var btnName = ButtonConst.BTN_SMALL_YELLOW;
            var btnText = "";
            if (!moneyIconStr) {
                btnName = ButtonConst.BTN_SMALL_RED;
                btnText = "acPunishBuyItemGoNow";
            }
            var buyBtn = ComponentManager.getButton(btnName, btnText, this.shopBuyBtnClick, this, [index]);
            buyBtn.setPosition(itemBg.width - 15 - buyBtn.width, itemBg.height / 2 - 10);
            this.addChild(buyBtn);
            this._buyButton = buyBtn;
            this.checkBtnRed();
            // let state = this._vo.inDayOpenState();
            if (!this._vo.isInActivity()) {
                buyBtn.setGray(true);
            }
            else {
                buyBtn.setGray(false);
            }
            if (moneyIconStr) {
                var moneyIcon = BaseBitmap.create(moneyIconStr);
                moneyIcon.y = buyBtn.y + buyBtn.height / 2 - moneyIcon.height / 2;
                this.addChild(moneyIcon);
                var moneyNumInfo = ComponentManager.getTextField("" + moneyNum, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
                moneyIcon.x = buyBtn.x + buyBtn.width / 2 - moneyIcon.width / 2 - moneyNumInfo.width / 2;
                moneyNumInfo.setPosition(moneyIcon.x + moneyIcon.width, buyBtn.y + buyBtn.height / 2 - moneyNumInfo.height / 2);
                this.addChild(moneyNumInfo);
                if (!this._vo.isInActivity()) {
                    App.DisplayUtil.changeToGray(moneyIcon);
                    App.DisplayUtil.changeToGray(moneyNumInfo);
                }
                else {
                    App.DisplayUtil.changeToNormal(moneyIcon);
                    App.DisplayUtil.changeToNormal(moneyNumInfo);
                }
            }
            else {
                buyBtn.setColor(TextFieldConst.COLOR_BLACK);
            }
            //购买限制
            if (itemData.buyLimit) {
                var maxNum = 0;
                var isNeedVipIcon = false;
                if (typeof (itemData.buyLimit) == "number") {
                    maxNum = itemData.buyLimit;
                }
                else {
                    if (Api.switchVoApi.checkPunishVip()) {
                        maxNum = itemData.buyLimit[Math.min(Api.playerVoApi.getPlayerVipLevel(), itemData.buyLimit.length - 1)];
                        isNeedVipIcon = true;
                    }
                    else {
                        maxNum = itemData.buyLimit[0];
                    }
                }
                var usenum = 0;
                if (vo.item[String(index + 1)]) {
                    usenum = vo.item[String(index + 1)];
                }
                var num = maxNum - usenum;
                var buyNum = ComponentManager.getTextField(LanguageManager.getlocal("acPunishBuyItemLimit3", ["" + num]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
                buyNum.x = buyBtn.x + buyBtn.width / 2 - buyNum.width / 2;
                buyNum.y = buyBtn.y - buyNum.height - 5;
                this.addChild(buyNum);
                if (Api.playerVoApi.getPlayerVipLevel() > 0 && isNeedVipIcon) {
                    var vipIcon = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(Api.playerVoApi.getPlayerVipLevel()).icon);
                    this.addChild(vipIcon);
                    vipIcon.setScale(0.8);
                    vipIcon.setPosition(buyNum.x - 5, buyNum.y - buyNum.height - 7);
                }
            }
            else {
                buyBtn.y = itemBg.y + itemBg.height / 2 - buyBtn.height / 2 + 5;
            }
        }
        else if (type == 1) {
            var itemDesc = ComponentManager.getTextField(itemCfg.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            itemDesc.setPosition(itemNameBg.x + 8, itemNameBg.y + itemNameBg.height + 4);
            itemDesc.width = 240;
            itemDesc.lineSpacing = 2;
            this.addChild(itemDesc);
            var useBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acPunishStoreUse-" + this.getTypeCode(), this.storeUseBtnClick, this, [index]);
            useBtn.setPosition(itemBg.width - 20 - useBtn.width, itemBg.y + 75);
            this.addChild(useBtn);
            //存储上限
            var useLimit = null;
            if (itemData.canUseNum) {
                var itemUseNum = vo.getToolUseNum(data.id);
                var currUseNum_1 = itemData.canUseNum - itemUseNum;
                if (currUseNum_1 < 0) {
                    currUseNum_1 = 0;
                }
                useLimit = ComponentManager.getTextField(LanguageManager.getlocal("acPunishHaveLimit-" + this.getTypeCode(), ["" + itemUseNum, "" + itemData.canUseNum]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
                useLimit.x = useBtn.x + useBtn.width + 12 - useLimit.width;
                useLimit.y = 20;
                this.addChild(useLimit);
            }
            //增加体力
            if (itemData.getEnergy) {
                var addEnergy = ComponentManager.getTextField(LanguageManager.getlocal("acPunishAddEnergy-" + this.getTypeCode(), ["" + itemData.getEnergy]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
                addEnergy.x = useBtn.x + useBtn.width / 2 - addEnergy.width / 2;
                addEnergy.y = useBtn.y - addEnergy.height - 5;
                this.addChild(addEnergy);
                if (useLimit) {
                    addEnergy.x = useLimit.x;
                }
            }
            var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(itemData.item));
            this._dragMaxNum = hasNum;
            var currUseNum = 1;
            if (itemData.canUseNum) {
                var itemUseNum = vo.getToolUseNum(data.id);
                currUseNum = itemData.canUseNum - itemUseNum;
                this._dragMaxNum = currUseNum;
                if (hasNum < currUseNum) {
                    this._dragMaxNum = hasNum;
                }
            }
            var state = this._vo.inDayOpenState();
            if (hasNum == 0 || currUseNum == 0 || state != 3) {
                useBtn.setGray(true);
            }
            else {
                useBtn.setGray(false);
            }
            var maxNum = this._dragMaxNum;
            var selectNum = 1;
            if (maxNum == 0) {
                maxNum = 100000;
                selectNum = 0;
            }
            else {
                selectNum = maxNum;
            }
            //进度条
            this._dragProgressBar = ComponentManager.getDragProgressBar("progress2", "progress2_bg", maxNum, this.dragCallback, this);
            this._dragProgressBar.setPosition(itemIcon.x + 50, itemIcon.y + itemIcon.height + 25);
            this.addChild(this._dragProgressBar);
            itemBg.height += (this._dragProgressBar.height + 20);
            this._numBg = BaseBitmap.create("public_9_bg5");
            this._numBg.width = 90;
            this._numBg.setPosition(itemBg.width - 20 - this._numBg.width, this._dragProgressBar.y + this._dragProgressBar.height / 2 - this._numBg.height / 2 - 5);
            this.addChild(this._numBg);
            this._selectedNumTF = ComponentManager.getTextField(LanguageManager.getlocal("acPunishStoreUseNum-" + this.getTypeCode(), ["" + selectNum, "" + this._dragMaxNum]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
            this._selectedNumTF.setPosition(this._numBg.x + this._numBg.width / 2 - this._selectedNumTF.width / 2, this._numBg.y + this._numBg.height / 2 - this._selectedNumTF.height / 2 + 3);
            this.addChild(this._selectedNumTF);
            if (selectNum > 0) {
                this._dragProgressBar.setDragPercent(selectNum, maxNum);
            }
        }
        else if (type == 2) {
            var needScore = ComponentManager.getTextField(LanguageManager.getlocal("acPunishNeedScore-" + this.getTypeCode(), ["" + itemData.cost]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            needScore.x = itemNameBg.x + 8;
            needScore.y = itemNameBg.y + itemNameBg.height + 10;
            this.addChild(needScore);
            var maxNum = itemData.limit;
            var useNum = 0;
            if (vo.shop[String(index + 1)]) {
                useNum = vo.shop[String(index + 1)];
            }
            var num = maxNum - useNum;
            var iconModel = GameData.formatRewardItem(itemData.sell)[0];
            if (index == 0 && Api.servantVoApi.getServantObj("" + iconModel.id)) {
                num = 0;
            }
            var exchangeNum = ComponentManager.getTextField(LanguageManager.getlocal("acPunishCanChangeNum-" + this.getTypeCode(), ["" + num]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            exchangeNum.x = needScore.x;
            exchangeNum.y = needScore.y + needScore.height + 15;
            this.addChild(exchangeNum);
            var exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acPunishChangeBtnName-" + this.getTypeCode(), this.exchangeBtnClick, this, [index]);
            exchangeBtn.setPosition(itemBg.width - 15 - exchangeBtn.width, itemBg.height / 2 - exchangeBtn.height / 2);
            this.addChild(exchangeBtn);
            if (num > 0 && vo.score >= itemData.cost) {
                exchangeBtn.setGray(false);
            }
            else {
                exchangeBtn.setGray(true);
            }
        }
    };
    AcPunishShopScrollItem.prototype.checkBtnRed = function () {
        if (this._itemIndex == 0) {
            var acVo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
            if (acVo.checkHasGoldenTimes()) {
                App.CommonUtil.addIconToBDOC(this._buyButton);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._buyButton);
            }
        }
    };
    /**
     * 滑动条的监听事件
     */
    AcPunishShopScrollItem.prototype.dragCallback = function (curNum) {
        App.LogUtil.log("dragcall: ** " + curNum);
        this._useNum = curNum;
        if (this._dragMaxNum == 0) {
            this._dragProgressBar.setDragPercent(0, 1);
        }
        this._selectedNumTF.text = LanguageManager.getlocal("acPunishStoreUseNum-" + this.getTypeCode(), ["" + this._useNum, "" + this._dragMaxNum]);
        this._selectedNumTF.x = this._numBg.x + this._numBg.width / 2 - this._selectedNumTF.width / 2;
    };
    //商店购买按钮
    AcPunishShopScrollItem.prototype.shopBuyBtnClick = function (index) {
        // let acVo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        // let state = this._vo.inDayOpenState();
        // if (state == 1){
        //     App.CommonUtil.showTip(LanguageManager.getlocal("acPunishNotOpen"));
        //     return;
        // }
        // else if (state == 2 || state == 4){
        //     App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
        //     return;
        // }
        if (!this._vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var itemData = this._data.data;
        if (index != 2 && index != 3) {
            var maxNum = 0;
            if (itemData.buyLimit) {
                if (typeof (itemData.buyLimit) == "number") {
                    maxNum = itemData.buyLimit;
                }
                else {
                    if (Api.switchVoApi.checkPunishVip()) {
                        maxNum = itemData.buyLimit[Math.min(Api.playerVoApi.getPlayerVipLevel(), itemData.buyLimit.length - 1)];
                    }
                    else {
                        maxNum = itemData.buyLimit[0];
                    }
                }
            }
            var num = 0;
            if (this._vo.item[String(index + 1)]) {
                num = this._vo.item[String(index + 1)];
            }
            var leftNum = maxNum - num;
            if (!num) {
                leftNum = maxNum;
            }
            if (leftNum <= 0) {
                if (Api.switchVoApi.checkPunishVip() && index == 1) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acPunishBuyItemBuyTip2"));
                }
                else {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acPunishBuyItemBuyTip"));
                }
                return;
            }
            if (itemData.costGold) {
                if (Api.playerVoApi.getPlayerGold() < itemData.costGold) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_levelupTip3"));
                    return;
                }
            }
            else if (itemData.costGem) {
                if (Api.playerVoApi.getPlayerGem() < itemData.costGem) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
                    return;
                }
            }
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHITEM, { activeId: this._vo.aidAndCode, itemKey: this._data.id });
        }
        if (index == 2) {
            ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB2, {});
        }
        else if (index == 3) {
            if (Api.acVoApi.checkActivityStartByAid("dailyCharge")) {
                ViewController.getInstance().openView(ViewConst.COMMON.ACRECHARGEVIEW, { code: "1" });
            }
            else {
                ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1, {});
            }
        }
    };
    //仓库使用按钮
    AcPunishShopScrollItem.prototype.storeUseBtnClick = function (index) {
        var state = this._vo.inDayOpenState();
        if (state == 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishNotOpen"));
            return;
        }
        else if (state == 2 || state == 4) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        App.LogUtil.log("index: " + index);
        var itemData = this._data.data;
        // let vo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        if (itemData.canUseNum) {
            var itemUseNum = this._vo.getToolUseNum(this._data.id);
            if (itemData.canUseNum <= itemUseNum) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishCanNotUseTool-" + this.getTypeCode()));
                return;
            }
        }
        var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(itemData.item));
        if (hasNum <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishNotHaveTool-" + this.getTypeCode()));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_PUNISHADDENERGY, { activeId: this._vo.aidAndCode, itemKey: this._data.id, useNum: this._useNum });
    };
    //积分兑换按钮
    AcPunishShopScrollItem.prototype.exchangeBtnClick = function (index) {
        if (!this._vo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        // let vo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        var itemData = this._data.data;
        var maxNum = itemData.limit;
        var useNum = 0;
        if (this._vo.shop[String(index + 1)]) {
            useNum = this._vo.shop[String(index + 1)];
        }
        var num = maxNum - useNum;
        var iconModel = GameData.formatRewardItem(itemData.sell)[0];
        if (index == 0 && Api.servantVoApi.getServantObj("" + iconModel.id)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishServantGet-" + this.getTypeCode()));
            return;
        }
        if (num <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip1"));
            return;
        }
        if (itemData.cost > this._vo.score) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip2"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHSHOP, { activeId: this._vo.aidAndCode, itemKey: this._data.id });
    };
    AcPunishShopScrollItem.prototype.getTypeCode = function () {
        if (this._code == "13") {
            return "12";
        }
        return this._code;
    };
    AcPunishShopScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcPunishShopScrollItem.prototype.dispose = function () {
        this._dragProgressBar = null;
        this._aid = null;
        this._code = null;
        this._numBg = null;
        this._selectedNumTF = null;
        this._data = null;
        this._dragMaxNum = 0;
        this._useNum = 0;
        this._vo = null;
        this._itemIndex = null;
        this._buyButton = null;
        _super.prototype.dispose.call(this);
    };
    return AcPunishShopScrollItem;
}(ScrollListItem));
__reflect(AcPunishShopScrollItem.prototype, "AcPunishShopScrollItem");
//# sourceMappingURL=AcPunishShopScrollItem.js.map