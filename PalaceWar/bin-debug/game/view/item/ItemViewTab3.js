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
var ItemViewTab3 = (function (_super) {
    __extends(ItemViewTab3, _super);
    function ItemViewTab3() {
        var _this = _super.call(this) || this;
        // 当前选中的索引
        _this._selectedIndex = 0;
        // 当前选中的itemvo
        _this._selectedItemInfoVo = null;
        // 道具选中框
        _this._selectedBg = null;
        // 当前选中道具名称文本
        _this._selectedNameTextF = null;
        // 道具icon
        _this._selectedIcon = null;
        // 道具iconbg
        _this._selectedIconBg = null;
        // 描述文本
        _this._selectedDescTextF = null;
        // 掉落文本
        _this._selectedDropTextF = null;
        // 使用按钮
        _this._useBtn = null;
        _this._errorTF = null;
        _this._detailBtn = null;
        _this._itemLv = null;
        _this._headEffect = null;
        _this._itemInfoVoList = [];
        _this._titleTypes = [];
        _this._typeContainer = null;
        _this._iconContainer = null;
        _this._curTitleTypeIdx = 0;
        _this._topTabItem = null;
        _this._titleId = null;
        _this._numbg = null;
        // this.initView();
        egret.callLater(_this.initView, _this);
        return _this;
    }
    ItemViewTab3.prototype.getListType = function () {
        return 3;
    };
    ItemViewTab3.prototype.getNetRequestConst = function () {
        return NetRequestConst.REQUEST_ITEM_TITLE;
    };
    ItemViewTab3.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_TITLEUPGRADE_MODEL, this.upgradeCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(this.getNetRequestConst()), this.useCallback, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ITEM, this.refresh, this);
        var allVoList = Api.itemVoApi.getTitleVoListByType(this.getListType());
        for (var k in allVoList) {
            var typeKey = allVoList[k].titleKey;
            if (!GameData.isInArray(typeKey, this._titleTypes)) {
                if (typeKey == "1_5") {
                    var idx = -1;
                    for (var i = 0; i < this._titleTypes.length; i++) {
                        if (this._titleTypes[i] == "1_3" || this._titleTypes[i] == "1_4") {
                            idx = i;
                            break;
                        }
                    }
                    if (idx >= 0) {
                        this._titleTypes.splice(idx, 0, typeKey);
                        continue;
                    }
                }
                else if (typeKey == "1_6") {
                    var idx = -1;
                    for (var i = 0; i < this._titleTypes.length; i++) {
                        if (this._titleTypes[i] == "1_3" || this._titleTypes[i] == "1_4") {
                            idx = i;
                            break;
                        }
                    }
                    if (idx >= 0) {
                        this._titleTypes.splice(idx, 0, typeKey);
                        continue;
                    }
                }
                //皇位排在第一位
                if (typeKey == "1_7") {
                    this._titleTypes.unshift(typeKey);
                }
                else {
                    this._titleTypes.push(typeKey);
                }
            }
        }
        this.createTypeContainer();
    };
    ItemViewTab3.prototype.createTypeContainer = function () {
        this._typeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._typeContainer);
        var bg1 = BaseBitmap.create("public_9_bg23");
        bg1.width = GameConfig.stageWidth - 20;
        bg1.x = 10;
        bg1.height = GameConfig.stageHeigth - 150;
        // this._typeContainer.addChild(bg1);
        var scrollContiner = new BaseDisplayObjectContainer();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth, bg1.height);
        var scrollView = ComponentManager.getScrollView(scrollContiner, rect);
        this._typeContainer.addChild(scrollView);
        for (var i = 0; i < this._titleTypes.length; i++) {
            var tab = new ItemViewTabItem();
            tab.initItem("item_title_" + this._titleTypes[i]);
            tab.setPosition(GameConfig.stageWidth / 2 - tab.width / 2, 10 + i * (tab.height + 5));
            scrollContiner.addChild(tab);
            tab.addTouchTap(this.clickTabHandle, this, [i]);
        }
        if (this.param && this.param.data && this.param.data.titleId) {
            this._titleId = this.param.data.titleId;
            this.clickTabHandle(null, this.param.data.idx);
        }
    };
    ItemViewTab3.prototype.clickTabHandle = function (event, idx) {
        this._curTitleTypeIdx = idx;
        this.showIconContainer();
    };
    ItemViewTab3.prototype.showTypeContainer = function () {
        this.removeChild(this._iconContainer);
        this.addChild(this._typeContainer);
    };
    ItemViewTab3.prototype.showIconContainer = function () {
        this.removeChild(this._typeContainer);
        if (!this._iconContainer) {
            this._iconContainer = new BaseDisplayObjectContainer();
            var allVoList = Api.itemVoApi.getTitleVoListByType(this.getListType());
            this._itemInfoVoList.length = 0;
            this._selectedIndex = 0;
            for (var k in allVoList) {
                var typeKey = allVoList[k].titleKey;
                if (typeKey == this._titleTypes[this._curTitleTypeIdx]) {
                    this._itemInfoVoList.push(allVoList[k]);
                }
            }
            for (var i = 0; i < this._itemInfoVoList.length; i++) {
                if (this._titleId && this._titleId == this._itemInfoVoList[i].id) {
                    this._selectedIndex = i;
                    break;
                }
            }
            this._selectedItemInfoVo = this._itemInfoVoList[0];
            var bg1 = BaseBitmap.create("public_9_bg23");
            bg1.width = GameConfig.stageWidth - 20;
            bg1.x = 10;
            bg1.height = GameConfig.stageHeigth - 445;
            bg1.name = "bg1";
            // this._iconContainer.addChild(bg1);
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 640 - 30, bg1.height - 80);
            this._scrollList = ComponentManager.getScrollList(TitleScrollItem, this._itemInfoVoList, rect, null, null, true);
            this._iconContainer.addChild(this._scrollList);
            this._scrollList.setPosition(20, bg1.y + 60);
            this._scrollList.addTouchTap(this.clickItemHandler, this);
            this._errorTF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            this._errorTF.x = bg1.x + bg1.width / 2 - this._errorTF.width / 2;
            this._errorTF.y = bg1.y + bg1.height / 2 - this._errorTF.height / 2;
            this._iconContainer.addChild(this._errorTF);
            this.initButtomContainer(bg1);
        }
        else {
            this._selectedIndex = 0;
            this.refreshWhenSwitchBack();
        }
        if (this._topTabItem) {
            this._topTabItem.dispose();
        }
        this._topTabItem = new ItemViewTabItem();
        this._topTabItem.initItem("item_title_" + this._titleTypes[this._curTitleTypeIdx], 2);
        this._topTabItem.setPosition(GameConfig.stageWidth / 2 - this._topTabItem.width / 2, 10);
        this._iconContainer.addChild(this._topTabItem);
        this._topTabItem.addTouchTap(this.showTypeContainer, this);
        this.addChild(this._iconContainer);
    };
    ItemViewTab3.prototype.initButtomContainer = function (bg1) {
        this._buttomContainer = new BaseDisplayObjectContainer();
        this._buttomContainer.y = bg1.y + bg1.height + 8 - 26;
        this._iconContainer.addChild(this._buttomContainer);
        var bar = BaseBitmap.create("commonview_bottom_bar");
        this._buttomContainer.addChild(bar);
        this._bottomBg = BaseBitmap.create("commonview_screen");
        this._bottomBg.y = bar.height - 7;
        this._buttomContainer.addChild(this._bottomBg);
        var line1 = BaseBitmap.create("commonview_smalltitlebg");
        line1.x = GameConfig.stageWidth / 2 - line1.width / 2;
        line1.y = 30;
        this._buttomContainer.addChild(line1);
        var itembg = BaseBitmap.create("commonview_itembg");
        itembg.setPosition(20, 63);
        this._buttomContainer.addChild(itembg);
        var numbg = BaseBitmap.create("public_9_bg80");
        numbg.alpha = 0.6;
        numbg.width = 136;
        numbg.height = 32;
        numbg.setPosition(itembg.x + itembg.width / 2 - numbg.width / 2, itembg.y + 163);
        this._buttomContainer.addChild(numbg);
        this._numbg = numbg;
        numbg.visible = false;
        this._selectedNameTextF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._buttomContainer.addChild(this._selectedNameTextF);
        this._selectedIconBg = BaseBitmap.create(this._selectedItemInfoVo.iconBg);
        this._selectedIconBg.x = itembg.x + itembg.width / 2 - this._selectedIconBg.width / 2;
        this._selectedIconBg.y = this._bottomBg.y + 90;
        this._buttomContainer.addChild(this._selectedIconBg);
        this._selectedIcon = BaseLoadBitmap.create(this._selectedItemInfoVo.icon);
        this._selectedIcon.x = this._selectedIconBg.x + 5;
        this._selectedIcon.y = this._selectedIconBg.y + 3;
        this._buttomContainer.addChild(this._selectedIcon);
        this._selectedIcon.visible = false;
        // if (this._selectedItemInfoVo.icon == "itemicon4016")
        // {
        // 	this._headEffect = ComponentManager.getCustomMovieClip("headcircle_anim",10,100);
        // 	this._headEffect.x = this._selectedIconBg.x+ 2;
        // 	this._headEffect.y = this._selectedIconBg.y+ 2; 
        // 	this._headEffect.setScale(0.76);
        // 	this._buttomContainer.addChild(this._headEffect);
        // 	this._headEffect.playWithTime(0);
        // }
        if (this._selectedItemInfoVo.icon == "itemicon4020") {
            this._headEffect = ComponentManager.getCustomMovieClip("title_effect4020_", 10, 100);
            this._headEffect.x = this._selectedIconBg.x + 2;
            this._headEffect.y = this._selectedIconBg.y + 2;
            this._headEffect.setScale(0.76);
            this._buttomContainer.addChild(this._headEffect);
            this._headEffect.playWithTime(0);
        }
        this._selectedDescTextF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._selectedDescTextF.x = 222;
        this._selectedDescTextF.width = 382;
        this._selectedDescTextF.y = 78;
        this._selectedDescTextF.lineSpacing = 4;
        this._buttomContainer.addChild(this._selectedDescTextF);
        this._selectedDropTextF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._selectedDropTextF.x = this._selectedDescTextF.x;
        this._selectedDropTextF.width = this._selectedDescTextF.width;
        this._selectedDropTextF.y = this._selectedDescTextF.y + 77;
        this._selectedDropTextF.lineSpacing = 4;
        this._buttomContainer.addChild(this._selectedDropTextF);
        this._useBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW, "useBtn", this.clickUseBtnHandler, this);
        this._useBtn.x = 394 - this._useBtn.width / 2;
        this._useBtn.y = GameConfig.stageHeigth - this._useBtn.height - 185;
        this._useBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._iconContainer.addChild(this._useBtn);
        this._useBtn.visible = false;
        if (Api.playerVoApi.getTitleid() != 0) {
            var titleIndex = Api.itemVoApi.getCurTitleIndex();
            this._curChooseScrollItem = this._scrollList.getItemByIndex(titleIndex);
        }
        this._itemLv = ComponentManager.getTextField(" ", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._itemLv.x = numbg.x;
        this._itemLv.width = numbg.width;
        this._itemLv.textAlign = egret.HorizontalAlign.CENTER;
        this._itemLv.y = numbg.y + 6;
        this._buttomContainer.addChild(this._itemLv);
        this._itemLv.visible = false;
        this._detailBtn = ComponentManager.getButton("title_details", null, this.clickDetailHandler, this);
        this._detailBtn.setPosition(numbg.x + numbg.width / 2 - this._detailBtn.width / 2 - 4, numbg.y + numbg.height + 2);
        this._buttomContainer.addChild(this._detailBtn);
        this._detailBtn.visible = false;
        this.updateItem(this._selectedIndex);
    };
    ItemViewTab3.prototype.clickItemHandler = function (event) {
        var index = Number(event.data);
        if (!this._itemInfoVoList[index]) {
            return;
        }
        this.updateItem(index);
    };
    ItemViewTab3.prototype.clickDetailHandler = function (event) {
        ViewController.getInstance().openView(ViewConst.COMMON.TITLEUPGRADELLEVELUPVIEW, {
            titleid: this._selectedItemInfoVo.id
        });
        // ViewController.getInstance().openView(ViewConst.POPUP.TITLELEVELDETAILPOPUPVIEW,{info:this._selectedItemInfoVo});
        // ViewController.getInstance().openView(ViewConst.COMMON.TITLELEVELUPVIEW,{titleId:"4004",lv:2});
    };
    ItemViewTab3.prototype.refreshWhenSwitchBack = function () {
        if (!this._iconContainer) {
            return;
        }
        var allVoList = Api.itemVoApi.getTitleVoListByType(this.getListType());
        this._itemInfoVoList.length = 0;
        for (var k in allVoList) {
            var typeKey = allVoList[k].titleKey;
            if (typeKey == this._titleTypes[this._curTitleTypeIdx]) {
                this._itemInfoVoList.push(allVoList[k]);
            }
        }
        this._scrollList.refreshData(this._itemInfoVoList);
        this._scrollList.setScrollTop(0);
        this._selectedItemInfoVo = this._itemInfoVoList[this._selectedIndex];
        this._selectedBg = null;
        this.updateItem(this._selectedIndex);
    };
    ItemViewTab3.prototype.refresh = function () {
        this.refreshWhenSwitchBack();
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGE_IMG);
    };
    // 刷新数据
    ItemViewTab3.prototype.updateItem = function (index) {
        this._buttomContainer.visible = true;
        if (this._selectedBg == null) {
            this._selectedBg = BaseBitmap.create("itembg_selected");
            this._selectedBg.x = 4;
            this._selectedBg.y = 4;
        }
        if (this._selectedIndex && this._selectedIndex == index && this._selectedItemInfoVo) {
            if (this._selectedBg) {
                if (this._curTitleScrollItem && !this._curTitleScrollItem.contains(this._selectedBg)) {
                    this._curTitleScrollItem.addChild(this._selectedBg);
                }
            }
        }
        this._selectedIndex = index;
        this._selectedItemInfoVo = this._itemInfoVoList[this._selectedIndex];
        this._curTitleScrollItem = this._scrollList.getItemByIndex(this._selectedIndex);
        if (this._curTitleScrollItem && !this._curTitleScrollItem.contains(this._selectedBg)) {
            this._curTitleScrollItem.addChild(this._selectedBg);
        }
        this._selectedNameTextF.text = this._selectedItemInfoVo.name;
        this._selectedDescTextF.text = LanguageManager.getlocal("effectTitle") + this._selectedItemInfoVo.desc;
        this._selectedDropTextF.text = LanguageManager.getlocal("dropTitle") + this._selectedItemInfoVo.dropDesc;
        this._useBtn.visible = (this._selectedItemInfoVo.num == 0 || this._selectedItemInfoVo.num == 1 || this._selectedItemInfoVo.num == 2);
        if (this._selectedItemInfoVo.num == 0) {
            this._useBtn.setText("useBtn");
        }
        else if (this._selectedItemInfoVo.num == 1) {
            this._useBtn.setText("titleEquip");
        }
        else if (this._selectedItemInfoVo.num == 2) {
            this._useBtn.setText("titleTakeoff");
        }
        this._selectedIconBg.visible = true;
        this._selectedIconBg.texture = ResourceManager.getRes(this._selectedItemInfoVo.iconBg);
        this._selectedIcon.visible = true;
        this._selectedIcon.setload(this._selectedItemInfoVo.icon);
        this._selectedNameTextF.x = this._bottomBg.width / 2 - this._selectedNameTextF.width / 2;
        this._selectedNameTextF.y = this._bottomBg.y + 26;
        if (this._headEffect) {
            this._headEffect.dispose();
            this._headEffect = null;
        }
        // if (this._selectedItemInfoVo.icon == "itemicon4016" && !this._headEffect)
        // {
        // 	this._headEffect = ComponentManager.getCustomMovieClip("headcircle_anim",10,100);
        // 	this._headEffect.x = this._selectedIconBg.x+ 2;
        // 	this._headEffect.y = this._selectedIconBg.y+ 2; 
        // 	this._headEffect.setScale(0.76);
        // 	this._buttomContainer.addChild(this._headEffect);
        // 	this._headEffect.playWithTime(0);
        // }
        if (this._selectedItemInfoVo.icon == "itemicon4020" && !this._headEffect) {
            this._headEffect = ComponentManager.getCustomMovieClip("title_effect4020_", 10, 100);
            this._headEffect.x = this._selectedIconBg.x + 2;
            this._headEffect.y = this._selectedIconBg.y + 2;
            this._headEffect.setScale(0.76);
            this._buttomContainer.addChild(this._headEffect);
            this._headEffect.playWithTime(0);
        }
        if (Api.switchVoApi.checkTitleUpgrade() && this._selectedItemInfoVo.isTitle == 1 && (this._selectedItemInfoVo.titleType < 3 || this._selectedItemInfoVo.titleType == 7) && this._selectedItemInfoVo.lv > 0) {
            this._detailBtn.visible = true;
            this._itemLv.visible = true;
            this._itemLv.text = LanguageManager.getlocal("itemLevel", [String(this._selectedItemInfoVo.lv)]);
            // this._itemLv.x = 95 - this._itemLv.width/2;
            this._numbg.visible = true;
        }
        else {
            this._numbg.visible = false;
            this._detailBtn.visible = false;
            this._itemLv.visible = false;
        }
    };
    // 点击使用按钮
    ItemViewTab3.prototype.clickUseBtnHandler = function (param) {
        if (this._selectedItemInfoVo) {
            this.sendRequest(this._selectedItemInfoVo);
        }
    };
    // 数据请求
    ItemViewTab3.prototype.sendRequest = function (itemVo) {
        if (itemVo.num == 2) {
            this.request(NetRequestConst.REQUEST_ITEM_DROPTITLE, { "titleId": itemVo.id });
        }
        else {
            var data = { "titleid": itemVo.id, "status": itemVo.num + 1 };
            NetManager.request(this.getNetRequestConst(), data);
        }
    };
    ItemViewTab3.prototype.receiveData = function (data) {
        if (data.ret && data.data.cmd == NetRequestConst.REQUEST_ITEM_DROPTITLE) {
            App.CommonUtil.showTip(LanguageManager.getlocal("titleTakeoffSuccess"));
            this.refresh();
        }
    };
    // 刷新道具数量
    ItemViewTab3.prototype.useCallback = function (event) {
        if (event && event.data && event.data.ret) {
            var rdata = event.data.data.data;
            if (rdata && rdata.rewards) {
                var rewardList = GameData.formatRewardItem(rdata.rewards);
                App.CommonUtil.playRewardFlyAction(rewardList);
            }
            if (Api.playerVoApi.getTitleid() != 0) {
                if (this._curChooseScrollItem) {
                    this._curChooseScrollItem.update();
                }
                // let titleIndex:number = Api.itemVoApi.getCurTitleIndex();
                // this._curChooseScrollItem = <TitleScrollItem>this._scrollList.getItemByIndex(titleIndex);
            }
            if (this._selectedItemInfoVo) {
                if (this._selectedItemInfoVo.num >= 0) {
                    if (this._selectedItemInfoVo.num == 1) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("recoverLeftSuccess"));
                    }
                    else if (this._selectedItemInfoVo.num == 2) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("equipSuccess"));
                    }
                    if (this._curTitleScrollItem) {
                        this._curTitleScrollItem.update();
                    }
                }
                this.updateItem(this._selectedIndex);
            }
        }
    };
    ItemViewTab3.prototype.upgradeCallback = function () {
        var view = this;
        view._itemLv.text = LanguageManager.getlocal("itemLevel", [String(this._selectedItemInfoVo.lv)]);
    };
    ItemViewTab3.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(this.getNetRequestConst()), this.useCallback, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ITEM, this.refresh, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_TITLEUPGRADE_MODEL, this.upgradeCallback, this);
        this._selectedIndex = 0;
        if (this._selectedItemInfoVo) {
            this._selectedItemInfoVo = null;
        }
        if (this._selectedBg) {
            if (this._selectedBg.parent && this._selectedBg.parent.contains(this._selectedBg)) {
                this._selectedBg.parent.removeChild(this._selectedBg);
            }
            BaseBitmap.release(this._selectedBg);
            this._selectedBg = null;
        }
        if (this._selectedNameTextF) {
            this._buttomContainer.removeChild(this._selectedNameTextF);
            this._selectedNameTextF.dispose();
            this._selectedNameTextF = null;
        }
        if (this._selectedIcon) {
            this._buttomContainer.removeChild(this._selectedIcon);
            BaseBitmap.release(this._selectedIcon);
            this._selectedIcon = null;
        }
        if (this._selectedIconBg) {
            this._buttomContainer.removeChild(this._selectedIconBg);
            BaseBitmap.release(this._selectedIconBg);
            this._selectedIconBg = null;
        }
        if (this._selectedDescTextF) {
            this._buttomContainer.removeChild(this._selectedDescTextF);
            this._selectedDescTextF.dispose();
            this._selectedDescTextF = null;
        }
        if (this._selectedDropTextF) {
            this._buttomContainer.removeChild(this._selectedDropTextF);
            this._selectedDropTextF.dispose();
            this._selectedDropTextF = null;
        }
        if (this._useBtn) {
            this._useBtn.dispose();
            this._useBtn = null;
        }
        if (this._curTitleScrollItem) {
            this._curTitleScrollItem = null;
        }
        if (this._scrollList) {
            this._scrollList.dispose();
            this._scrollList = null;
        }
        if (this._errorTF) {
            this._errorTF.dispose();
            this._errorTF = null;
        }
        if (this._buttomContainer) {
            this._buttomContainer.dispose();
            this._buttomContainer = null;
        }
        this._itemInfoVoList = [];
        this._curChooseScrollItem = null;
        this._detailBtn = null;
        this._itemLv = null;
        this._headEffect = null;
        this._titleTypes.length = 0;
        this._typeContainer.dispose();
        this._typeContainer = null;
        if (this._iconContainer) {
            this._iconContainer.dispose();
        }
        this._iconContainer = null;
        this._curTitleTypeIdx = 0;
        if (this._topTabItem) {
            this._topTabItem.dispose();
        }
        this._topTabItem = null;
        this._titleId = null;
        this._numbg = null;
        _super.prototype.dispose.call(this);
    };
    return ItemViewTab3;
}(CommonViewTab));
__reflect(ItemViewTab3.prototype, "ItemViewTab3");
//# sourceMappingURL=ItemViewTab3.js.map