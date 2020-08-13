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
 * 每日建设
 * author dky
 * date 2017/12/6
 * @class AllianceBuildScrollItem
 */
var AllianceBuildScrollItem = /** @class */ (function (_super) {
    __extends(AllianceBuildScrollItem, _super);
    function AllianceBuildScrollItem() {
        var _this = _super.call(this) || this;
        _this._type = 0;
        _this._mainTaskHandKey = null;
        return _this;
    }
    AllianceBuildScrollItem.prototype.initItem = function (index, data) {
        // let cfg = Config.WifebaseCfg.wifeGift
        var _this = this;
        var type = 0;
        var posy = 0;
        this._itemIndex = index;
        this._itemData = data;
        this.width = 525;
        if (Api.switchVoApi.checkOpenMonthcardDonate()) {
            if (index == 2) {
                if (Api.shopVoApi.ifBuyMonthCard()) {
                    //可免费
                    type = 1;
                }
                else {
                    //没购买
                    type = 2;
                }
            }
            if (index < 2 && Api.shopVoApi.ifBuyMonthCard()) {
                type = 3;
            }
            this._type = type;
        }
        this.height = posy + 126 + this.getSpaceY();
        var key = (index + 1).toString();
        var bgBg = BaseBitmap.create("public_9_bg14");
        bgBg.width = this.width;
        bgBg.height = 126;
        bgBg.y = posy;
        this.addChild(bgBg);
        this._key = key;
        // let textColor = TextFieldConst.COLOR_WARN_GREEN2;
        // 	if(key == "1")
        // 	{
        // 		textColor = TextFieldConst.COLOR_WARN_GREEN2;
        // 	}else if(key == "2"){
        // 		textColor = TextFieldConst.COLOR_QUALITY_BLUE;
        // 	}else if(key == "3"){
        // 		textColor = TextFieldConst.COLOR_QUALITY_PURPLE;
        // 	}else if(key == "4"){
        // 		textColor = TextFieldConst.COLOR_WARN_RED2;
        // 	}else if(key == "5"){
        // 		textColor = TextFieldConst.COLOR_WARN_YELLOW2;
        // 	}
        var itemName = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW2);
        itemName.text = LanguageManager.getlocal("allianceBuildName" + key);
        // itemName.textColor = textColor;
        itemName.setPosition(120 + 10, bgBg.y + 10);
        this.addChild(itemName);
        var score = LanguageManager.getlocal("allianceBuildCost");
        var itemScore = ComponentManager.getTextField(score, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        itemScore.setPosition(itemName.x, itemName.y + itemName.height + 7);
        this.addChild(itemScore);
        if (index < 3) {
            var iconBg = BaseBitmap.create("itembg_5");
            iconBg.setPosition(15, bgBg.y + bgBg.height / 2 * bgBg.scaleY - iconBg.width / 2);
            this.addChild(iconBg);
            var itemBB = BaseBitmap.create("dinner_gems_" + key);
            itemBB.setPosition(18, bgBg.y + bgBg.height / 2 * bgBg.scaleY - itemBB.width / 2);
            this.addChild(itemBB);
            if (type == 1) {
                var costNum = ComponentManager.getTextField(LanguageManager.getlocal("monthcardFree"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
                costNum.setPosition(190, itemScore.y);
                costNum.width = 260;
                this.addChild(costNum);
            }
            else {
                var costIcon = BaseLoadBitmap.create("itemicon1");
                costIcon.x = 190;
                costIcon.y = bgBg.y + 28;
                costIcon.setScale(0.4);
                this.addChild(costIcon);
                var costNum = ComponentManager.getTextField(data.needGem.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
                costNum.setPosition(235, itemScore.y);
                costNum.width = 260;
                this.addChild(costNum);
            }
        }
        else {
            var itemCfg = Config.ItemCfg.getItemCfgById(data.needItem);
            var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(data.needItem));
            var itemIcon = itemCfg.getIconContainer(true, hasNum);
            itemIcon.setPosition(15, bgBg.y + bgBg.height / 2 * bgBg.scaleY - itemIcon.width / 2 + 1);
            itemIcon.name = "icon";
            this.addChild(itemIcon);
            // this._numTF = ComponentManager.getTextField( hasNum.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
            // this._numTF.setPosition(itemIcon.x + itemIcon.width - 8 - this._numTF.width,itemIcon.y + itemIcon.height - 8 - this._numTF.height );
            // this.addChild(this._numTF);
            // itemName.text = itemCfg.name;
            // let score =  ;
            var it = ComponentManager.getTextField(itemCfg.name + "x1", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
            it.setPosition(itemScore.x + itemScore.width + 0, itemName.y + itemName.height + 7);
            this.addChild(it);
        }
        var itemDescStr = LanguageManager.getlocal("allianceBuildGet", [data.exp, data.asset, data.contribution]);
        //acPunishBuyItemGet
        var itemDesc = ComponentManager.getTextField(itemDescStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        itemDesc.setPosition(itemName.x, itemScore.y + itemScore.height + 7);
        itemDesc.width = 375;
        this.addChild(itemDesc);
        var isDenate = Api.allianceVoApi.getIsDonatet();
        if (type == 1) {
            isDenate = Api.allianceVoApi.getIsMonthcardDonatet();
        }
        if (isDenate) {
            var mVo = Api.allianceVoApi.getMyAllianceVo();
            if (this._key == mVo.donate.id || type == 1) {
                var donatetDesc = ComponentManager.getTextField(LanguageManager.getlocal("allianceBuildToday"), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WARN_RED);
                donatetDesc.x = 400;
                donatetDesc.y = bgBg.y + 25;
                this.addChild(donatetDesc);
            }
        }
        else {
            var str = "allianceBuild";
            if (type == 1) {
                str = "sysFreeDesc";
            }
            var chooseBtn_1 = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, str, this.chooseBtnClick, this);
            chooseBtn_1.x = 390 - 13;
            chooseBtn_1.y = bgBg.y + 10;
            this.addChild(chooseBtn_1);
            chooseBtn_1.setColor(TextFieldConst.COLOR_BLACK);
            if (type == 1) {
                App.CommonUtil.addIconToBDOC(chooseBtn_1);
            }
            else if (type == 3) {
                chooseBtn_1.visible = false;
            }
            var currTaskId = Api.mainTaskVoApi.getCurMainTaskId();
            if (currTaskId) {
                var taskCfg_1 = Config.MaintaskCfg.getTaskCfgByTaskId(currTaskId);
                if (taskCfg_1) {
                    if (index == 0 && (taskCfg_1.questType == 702 || taskCfg_1.questType == 703)) {
                        egret.callLater(function () {
                            _this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(_this, chooseBtn_1.x + chooseBtn_1.width / 2 - 10, bgBg.y + 10, [chooseBtn_1], taskCfg_1.questType, true, function () {
                                this.parent.setChildIndex(this, 100);
                                return true;
                            }, _this, 0.7);
                        }, this, null);
                    }
                }
            }
        }
        if (type == 3) {
            var graybg = BaseBitmap.create("public_9_bg8");
            graybg.width = bgBg.width;
            graybg.height = bgBg.height;
            this.addChild(graybg);
        }
    };
    AllianceBuildScrollItem.prototype.chooseBtnClick = function () {
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        if (this._itemIndex > 2) {
            var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(this._itemData.needItem));
            if (hasNum <= 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
                return;
            }
        }
        else {
            var cost = this._itemData.needGem.toString();
            if (cost > Api.playerVoApi.getPlayerGem() && this._type != 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
                return;
            }
        }
        var allianceVo = Api.allianceVoApi.getAllianceVo();
        var bNum = allianceVo.info.donateNum ? allianceVo.info.donateNum : 0;
        if (bNum >= allianceVo.maxmn) {
            var rewardStr = GameData.getRewardsStr(Api.adultVoApi._refuseData);
            var msg = LanguageManager.getlocal("allianceBuildTip");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "dailyTaskName19",
                msg: msg,
                callback: this.doBuild,
                handler: this,
                needCancel: true
            });
            return;
        }
        var monthCard = null;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ALLIANCE_BUILD, { monthcard: this._type == 1 ? 1 : null, "key": this._key, "index": this._itemIndex });
    };
    AllianceBuildScrollItem.prototype.doBuild = function () {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ALLIANCE_BUILD, { monthcard: this._type == 1 ? 1 : null, "key": this._key, "index": this._itemIndex });
    };
    AllianceBuildScrollItem.prototype.getBtnClickHandler = function () {
        // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ACH_GETREWARD,{"achId":this._achInfo.id});
    };
    AllianceBuildScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AllianceBuildScrollItem.prototype.dispose = function () {
        this._key = null;
        this._itemData = null;
        this._itemIndex = null;
        this._numTF = null;
        this._type = 0;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceBuildScrollItem;
}(ScrollListItem));
//# sourceMappingURL=AllianceBuildScrollItem.js.map