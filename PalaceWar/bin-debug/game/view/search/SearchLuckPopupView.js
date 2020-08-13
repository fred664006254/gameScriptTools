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
var SearchLuckPopupView = (function (_super) {
    __extends(SearchLuckPopupView, _super);
    function SearchLuckPopupView() {
        var _this = _super.call(this) || this;
        _this._itemList = [];
        _this._lastDonateIndex = -1;
        return _this;
    }
    SearchLuckPopupView.prototype.isShowOpenAni = function () {
        if (Api.rookieVoApi.isGuiding) {
            return false;
        }
        return true;
    };
    SearchLuckPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress3"
        ]);
    };
    /**
     * 需要屏蔽的cn字库
     */
    SearchLuckPopupView.prototype.shieldCn = function () {
        return PlatformManager.checkIsThSp() || PlatformManager.checkIsEnLang();
    };
    SearchLuckPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
        var resArr = [ItemEnums.gold, ItemEnums.food, ItemEnums.gem];
        for (var i = 0; i < 3; i++) {
            var resBar = ComponentManager.getResBar(resArr[i], true, 175);
            resBar.setPosition(20 + i * (resBar.width + 5) + GameData.popupviewOffsetX, 5);
            this.addChildToContainer(resBar);
        }
        var bg1 = BaseBitmap.create("public_9_probiginnerbg");
        bg1.width = this.viewBg.width - 40 - GameData.popupviewOffsetX * 2;
        bg1.height = 151;
        bg1.setPosition((this.viewBg.width - bg1.width) / 2, 55);
        this.addChildToContainer(bg1);
        var icon = BaseBitmap.create("searchluckicon");
        icon.setPosition(bg1.x + 5 + GameData.popupviewOffsetX, bg1.y + (bg1.height - icon.height) / 2);
        this.addChildToContainer(icon);
        var iconEffect = BaseBitmap.create("searchluckiconbg");
        iconEffect.anchorOffsetX = iconEffect.width / 2;
        iconEffect.anchorOffsetY = iconEffect.height / 2;
        egret.Tween.get(iconEffect, { loop: true }).to({ rotation: 360 }, 8000);
        iconEffect.setPosition(icon.x + icon.width / 2 - 0.5, icon.y + icon.height / 2 - 3);
        this.addChildToContainer(iconEffect);
        var curTxt = ComponentManager.getTextField(LanguageManager.getlocal("searchLuckcurNum") + Api.searchVoApi.getCurLuckNum(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        curTxt.setPosition(icon.x + icon.width + 10, icon.y + 20);
        this.addChildToContainer(curTxt);
        this._curTxt = curTxt;
        var luckProgress = ComponentManager.getProgressBar("progress3", "progress3_bg", 300);
        luckProgress.setPosition(curTxt.x, curTxt.y + curTxt.height + 10);
        this.addChildToContainer(luckProgress);
        var value = Api.searchVoApi.getCurLuckNum() / Api.searchVoApi.getMaxLuckNum();
        luckProgress.setPercentage(value);
        this._luckProgress = luckProgress;
        var luckDesc = ComponentManager.getTextField(LanguageManager.getlocal("searchLuckDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
        luckDesc.setPosition(curTxt.x, luckProgress.y + luckProgress.height + 20);
        this.addChildToContainer(luckDesc);
        var bg2 = BaseBitmap.create("public_9_probiginnerbg");
        bg2.width = bg1.width;
        bg2.height = 105;
        bg2.setPosition(bg1.x, bg1.y + bg1.height + 5);
        this.addChildToContainer(bg2);
        var autoLuckTxt = null;
        if (this.shieldCn()) {
            autoLuckTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        }
        else {
            autoLuckTxt = ComponentManager.getTextField(LanguageManager.getlocal("searchLuckAutoDonate"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        }
        autoLuckTxt.lineSpacing = 2;
        autoLuckTxt.width = TextFieldConst.FONTSIZE_CONTENT_SMALL + 4;
        autoLuckTxt.setPosition(bg2.x + 15, bg2.y + (bg2.height - autoLuckTxt.height) / 2);
        this.addChildToContainer(autoLuckTxt);
        var luckSetTxt = ComponentManager.getTextField(LanguageManager.getlocal("searchLuckSetNumDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        var numBg = BaseBitmap.create("public_9_bg5");
        numBg.width = 100;
        numBg.setPosition(120 + GameData.popupviewOffsetX, bg2.y + bg2.height - numBg.height - 20);
        this.addChildToContainer(numBg);
        if (!this._curShowNum) {
            this._curShowNum = Api.searchVoApi.getAutosetValue();
        }
        var numTxt = ComponentManager.getTextField(String(this._curShowNum), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_WHITE);
        numTxt.textAlign = egret.HorizontalAlign.CENTER;
        numTxt.setPosition(numBg.x + (numBg.width - numTxt.width) / 2, numBg.y + (numBg.height - numTxt.height) / 2);
        numTxt.name = "numTxt";
        this.addChildToContainer(numTxt);
        this._numTxt = numTxt;
        luckSetTxt.setPosition(numBg.x + (numBg.width - luckSetTxt.width) / 2, numBg.y - luckSetTxt.height - 5);
        this.addChildToContainer(luckSetTxt);
        var reduceBtn = ComponentManager.getButton("button_del1", "", this.checkNumBtnHandler, this, [-1]);
        reduceBtn.setPosition(numBg.x - reduceBtn.width - 8, numBg.y + (numBg.height - reduceBtn.height) / 2);
        this.addChildToContainer(reduceBtn);
        var addBtn = ComponentManager.getButton("button_add1", "", this.checkNumBtnHandler, this, [1]);
        addBtn.setPosition(numBg.x + numBg.width + 8, reduceBtn.y);
        this.addChildToContainer(addBtn);
        var selectBox = ComponentManager.getCheckBox();
        selectBox.setPosition(addBtn.x + addBtn.width + 40, bg2.y + 10);
        this.addChildToContainer(selectBox);
        selectBox.setSelected(Boolean(Api.searchVoApi.getGoldOpen()));
        this._goldCheckBox = selectBox;
        var select1Txt = ComponentManager.getTextField(LanguageManager.getlocal("searchLuckAutoDonateFood"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        select1Txt.setPosition(selectBox.x + selectBox.width + 5, selectBox.y + (selectBox.height - select1Txt.height) / 2);
        this.addChildToContainer(select1Txt);
        var select2Box = ComponentManager.getCheckBox();
        select2Box.setPosition(selectBox.x, selectBox.y + selectBox.height + 10);
        this.addChildToContainer(select2Box);
        select2Box.setSelected(Boolean(Api.searchVoApi.getFoodOpen()));
        this._foodCheckBox = select2Box;
        var select2Txt = ComponentManager.getTextField(LanguageManager.getlocal("searchLuckAutoDonateGold"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        select2Txt.setPosition(select1Txt.x, select2Box.y + (select2Box.height - select2Txt.height) / 2);
        this.addChildToContainer(select2Txt);
        var searchLuckFreeLocalStr = Config.VipCfg.getVipCfgByLevel(Api.playerVoApi.getPlayerVipLevel()).searchLuckFreeLocalStr;
        var changeLuckTxt = ComponentManager.getTextField(searchLuckFreeLocalStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        changeLuckTxt.setPosition(bg2.x + bg2.width - changeLuckTxt.width, bg2.y + bg2.height + 5);
        this.addChildToContainer(changeLuckTxt);
        var bg3 = BaseBitmap.create("public_9_probiginnerbg");
        bg3.width = bg1.width;
        bg3.height = 406;
        bg3.setPosition(bg1.x, changeLuckTxt.y + changeLuckTxt.height + 5);
        this.addChildToContainer(bg3);
        var types = Api.searchVoApi.getDonateTypes();
        var l = types.length;
        var itemsH = 0;
        for (var i = 0; i < l; i++) {
            var item = new SearchLuckDonateItem(i, this.donateHandler, this);
            item.setPosition(bg3.x + (bg3.width - item.width) / 2, bg3.y + 5 + (item.height + 3) * i);
            this.addChildToContainer(item);
            itemsH += item.height + 3;
            this._itemList.push(item);
        }
        bg3.height = 5 + itemsH + 5;
    };
    SearchLuckPopupView.prototype.donateHandler = function (index) {
        this._lastDonateIndex = index;
        this.request(NetRequestConst.REQUEST_SEARCH_BUY, { useflag: index + 1 });
    };
    SearchLuckPopupView.prototype.receiveData = function (data) {
        if (!data.ret) {
            return;
        }
        if (NetRequestConst.REQUEST_SEARCH_BUY) {
            if (this._itemList) {
                var l = this._itemList.length;
                for (var i = 0; i < l; i++) {
                    this._itemList[i].refresh();
                }
                if (this._lastDonateIndex > -1) {
                    this._itemList[this._lastDonateIndex].showRewardTip();
                }
            }
            this._curTxt.text = LanguageManager.getlocal("searchLuckcurNum") + Api.searchVoApi.getCurLuckNum();
            egret.Tween.removeTweens(this._luckProgress);
            var value = Api.searchVoApi.getCurLuckNum() / Api.searchVoApi.getMaxLuckNum();
            egret.Tween.get(this._luckProgress).to({ percent: value }, 200);
        }
    };
    SearchLuckPopupView.prototype.checkNumBtnHandler = function (valueNum) {
        if (this._numTxt) {
            var num = Number(this._numTxt.text);
            num += valueNum;
            if (num > Config.SearchbaseCfg.resAddMax) {
                App.CommonUtil.showTip(LanguageManager.getlocal("searchLuckAutoMaxNumDesc", [Config.SearchbaseCfg.resAddMax.toString()]));
            }
            num = Math.max(1, Math.min(Config.SearchbaseCfg.resAddMax, num));
            this._numTxt.text = String(num);
            this._curShowNum = num;
        }
    };
    SearchLuckPopupView.prototype.getTitleStr = function () {
        return "searchLuck";
    };
    SearchLuckPopupView.prototype.doGuide = function () {
        this.hide();
    };
    SearchLuckPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
        if (this._curShowNum) {
            var isChange = false;
            if (Api.searchVoApi.getAutosetValue() != this._curShowNum) {
                isChange = true;
            }
            var foodOpen = this._foodCheckBox.checkSelected() ? 1 : 0;
            if (foodOpen != Api.searchVoApi.getFoodOpen()) {
                isChange = true;
            }
            var goldOpen = this._goldCheckBox.checkSelected() ? 1 : 0;
            if (goldOpen != Api.searchVoApi.getGoldOpen()) {
                isChange = true;
            }
            if (isChange) {
                this.request(NetRequestConst.REQUEST_SEARCH_SET, { luckynum: this._curShowNum, foodopen: foodOpen, goldopen: goldOpen });
            }
        }
        this._curShowNum = NaN;
        this._luckProgress = null;
        this._itemList.length = 0;
        this._goldCheckBox = null;
        this._foodCheckBox = null;
        this._curTxt = null;
        _super.prototype.dispose.call(this);
    };
    return SearchLuckPopupView;
}(PopupView));
__reflect(SearchLuckPopupView.prototype, "SearchLuckPopupView");
var SearchLuckDonateItem = (function (_super) {
    __extends(SearchLuckDonateItem, _super);
    function SearchLuckDonateItem(index, donateHandler, donateThisObj) {
        var _this = _super.call(this) || this;
        _this._index = index;
        _this._donateHandler = donateHandler;
        _this._donateThisObj = donateThisObj;
        _this.init();
        return _this;
    }
    SearchLuckDonateItem.prototype.init = function () {
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 520;
        bg.height = 128;
        this.addChild(bg);
        var type = Api.searchVoApi.getDonateTypes()[this._index];
        var icon = GameData.getRewardItemIconByIdAndType(ItemEnums[type]);
        icon.setPosition(20, bg.y + (bg.height - icon.height) / 2);
        this.addChild(icon);
        var itemVo = icon.bindData;
        var txtSpaceY = 10;
        var titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("searchLuckDonateTypeDesc", [itemVo.name]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        titleTxt.setPosition(icon.x + icon.width + 5, icon.y + txtSpaceY);
        this.addChild(titleTxt);
        var donateNumTxt = ComponentManager.getTextField(this.getDonateNumDesc(type), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        donateNumTxt.setPosition(titleTxt.x, titleTxt.y + titleTxt.height + txtSpaceY);
        this.addChild(donateNumTxt);
        this._donateNumTxt = donateNumTxt;
        var addValue = Config.SearchbaseCfg.resAddLuck;
        if (type == "gem") {
            addValue = Config.SearchbaseCfg.gemAddLuck;
        }
        var luckEffectTxt = ComponentManager.getTextField(LanguageManager.getlocal("searchLuckEffectDesc", [LanguageManager.getlocal("searchLuck") + "+" + addValue]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        luckEffectTxt.setPosition(donateNumTxt.x, donateNumTxt.y + donateNumTxt.height + txtSpaceY);
        this.addChild(luckEffectTxt);
        var donateBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "searchLuckDonateBtn", this.donateHandler, this);
        donateBtn.setPosition(bg.x + bg.width - donateBtn.width - 20, bg.y + (bg.height - donateBtn.height) / 2);
        this.addChild(donateBtn);
        this._donateBtn = donateBtn;
    };
    SearchLuckDonateItem.prototype.getDonateNumDesc = function (type) {
        var color = TextFieldConst.COLOR_BLACK;
        var costStr;
        if (type == ItemEnums[RewardItemConst.TYPE_GEM] && Api.searchVoApi.getSearchLuckFreeNum() > 0) {
            costStr = LanguageManager.getlocal("sysFreeDesc");
        }
        else {
            if (!Api.searchVoApi.checkCostEnough(type)) {
                color = TextFieldConst.COLOR_WARN_RED2;
            }
            costStr = App.StringUtil.formatStringColor(Api.searchVoApi.getDonateCost(type).toString(), color);
        }
        var paramsArr = [Config.RewardCfg.getNameByTypeAndId(type), costStr];
        return LanguageManager.getlocal("searchLuckDonateNumDesc", paramsArr);
    };
    SearchLuckDonateItem.prototype.refresh = function () {
        var type = Api.searchVoApi.getDonateTypes()[this._index];
        if (this._donateNumTxt) {
            this._donateNumTxt.text = this.getDonateNumDesc(type);
        }
        if (this._donateBtn && type == ItemEnums[RewardItemConst.TYPE_GEM]) {
            this._donateBtn.setText("searchLuckDonateBtn");
        }
    };
    SearchLuckDonateItem.prototype.showRewardTip = function () {
        var type = Api.searchVoApi.getDonateTypes()[this._index];
        var addValue = Config.SearchbaseCfg.resAddLuck;
        if (type == "gem") {
            addValue = Config.SearchbaseCfg.gemAddLuck;
        }
        var pos = this.localToGlobal(this.width / 2, this.height / 2);
        App.CommonUtil.playRewardFlyAction([{ tipMessage: LanguageManager.getlocal("searchLuck") + "+" + addValue }], pos);
    };
    SearchLuckDonateItem.prototype.donateHandler = function () {
        var type = Api.searchVoApi.getDonateTypes()[this._index];
        var addValue = Config.SearchbaseCfg.resAddLuck;
        if (type == "gem") {
            addValue = Config.SearchbaseCfg.gemAddLuck;
        }
        if (Api.searchVoApi.getCurLuckNum() >= Api.searchVoApi.getMaxLuckByType(type)) {
            var tipStr = void 0;
            if (type == "gem") {
                tipStr = LanguageManager.getlocal("searchLuckGemMaxDesc");
            }
            else {
                tipStr = LanguageManager.getlocal("searchLuckResMaxDesc");
            }
            App.CommonUtil.showTip(tipStr);
        }
        else {
            if (type == ItemEnums[RewardItemConst.TYPE_GEM] && Api.searchVoApi.getSearchLuckFreeNum() > 0) {
                this.confirmDonateHandler();
            }
            else {
                if (Api.searchVoApi.checkCostEnough(type, true)) {
                    if (type == ItemEnums[RewardItemConst.TYPE_GEM]) {
                        var gem = Api.playerVoApi.getPlayerGem();
                        var needGem = Api.searchVoApi.getDonateCost(type);
                        var message = LanguageManager.getlocal("useItemGemConfirmDesc", [App.StringUtil.toString(needGem) + Config.RewardCfg.getNameByTypeAndId(type)]);
                        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { useNum: needGem, confirmCallback: this.confirmDonateHandler, handler: this, icon: Config.RewardCfg.getIconByTypeAndId(type), iconBg: "itembg_1", num: gem, msg: message, id: 1 });
                    }
                    else {
                        this.confirmDonateHandler();
                    }
                }
            }
        }
    };
    SearchLuckDonateItem.prototype.confirmDonateHandler = function () {
        if (this._donateHandler) {
            this._donateHandler.call(this._donateThisObj, this._index);
        }
    };
    SearchLuckDonateItem.prototype.dispose = function () {
        this._donateHandler = null;
        this._donateThisObj = null;
        this._donateNumTxt = null;
        this._index = NaN;
        this._donateBtn = null;
        _super.prototype.dispose.call(this);
    };
    return SearchLuckDonateItem;
}(BaseDisplayObjectContainer));
__reflect(SearchLuckDonateItem.prototype, "SearchLuckDonateItem");
//# sourceMappingURL=SearchLuckPopupView.js.map