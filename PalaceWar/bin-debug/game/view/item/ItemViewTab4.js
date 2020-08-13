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
var ItemViewTab4 = (function (_super) {
    __extends(ItemViewTab4, _super);
    function ItemViewTab4(param) {
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
    ItemViewTab4.prototype.getListType = function () {
        return 4;
    };
    ItemViewTab4.prototype.getNetRequestConst = function () {
        return NetRequestConst.REQUEST_ITEM_TITLE;
    };
    ItemViewTab4.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(this.getNetRequestConst()), this.useCallback, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ITEM, this.refresh, this);
        var allVoList = Api.itemVoApi.getTitleVoListByType(this.getListType());
        for (var k in allVoList) {
            var typeKey = allVoList[k].titleKey;
            if (!GameData.isInArray(typeKey, this._titleTypes)) {
                this._titleTypes.push(typeKey);
            }
        }
        GameData.arrayPutItemLast("5", this._titleTypes);
        GameData.arrayPutItemLast("7", this._titleTypes);
        GameData.arrayPutItemLast("8", this._titleTypes);
        this.createTypeContainer();
    };
    ItemViewTab4.prototype.createTypeContainer = function () {
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
    ItemViewTab4.prototype.clickTabHandle = function (event, idx) {
        this._curTitleTypeIdx = idx;
        this.showIconContainer();
    };
    ItemViewTab4.prototype.showTypeContainer = function () {
        this.removeChild(this._iconContainer);
        this.addChild(this._typeContainer);
    };
    ItemViewTab4.prototype.showIconContainer = function () {
        this.removeChild(this._typeContainer);
        if (!this._iconContainer) {
            this._iconContainer = new BaseDisplayObjectContainer();
            var allVoList = Api.itemVoApi.getTitleVoListByType(this.getListType());
            this._itemInfoVoList.length = 0;
            this._selectedIndex = 0;
            var needIndex = 0;
            for (var k in allVoList) {
                var typeKey = allVoList[k].titleKey;
                if (typeKey == this._titleTypes[this._curTitleTypeIdx]) {
                    this._itemInfoVoList.push(allVoList[k]);
                    if (this._titleId && this._titleId == String(allVoList[k].id)) {
                        this._selectedIndex = needIndex;
                    }
                    needIndex++;
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
            this._scrollList = ComponentManager.getScrollList(TitleScrollItem, this._itemInfoVoList, rect, null, 35, true);
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
    ItemViewTab4.prototype.initButtomContainer = function (bg1) {
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
        var tfg = Config.TitleCfg.getTitleCfgById(this._selectedItemInfoVo.id);
        if (tfg && tfg.isChangePic()) {
            var lv = this._selectedItemInfoVo.lv;
            if (Api.switchVoApi.checkOpenChangeTitle()) {
                if (tfg.isTitle == 2) {
                    var pTitle = Api.playerVoApi.getPlayerPtitle();
                    if (pTitle.ptitle && pTitle.ptitle == String(this._selectedItemInfoVo.id)) {
                        lv = pTitle.plv;
                    }
                }
                else if (tfg.isTitle == 1 || tfg.isTitle == 4) {
                    var titleData = Api.playerVoApi.getTitleInfo();
                    if (titleData.title && titleData.title == String(this._selectedItemInfoVo.id)) {
                        lv = titleData.tlv;
                    }
                }
            }
            this._selectedIcon = App.CommonUtil.getHeadPic(this._selectedItemInfoVo.id, lv, this._selectedItemInfoVo);
        }
        else {
            this._selectedIcon = BaseLoadBitmap.create(this._selectedItemInfoVo.icon);
        }
        this._selectedIcon.x = this._selectedIconBg.x + 5;
        this._selectedIcon.y = this._selectedIconBg.y + 3;
        this._buttomContainer.addChild(this._selectedIcon);
        this._selectedIcon.visible = false;
        var eff = App.CommonUtil.getHeadEffect(this._selectedItemInfoVo.id.toString());
        if (eff && !this._headEffect) {
            this._buttomContainer.addChild(eff);
            this._headEffect = eff;
            eff.setScale(0.78);
            eff.setPosition(this._selectedIcon.x + 100 / 2 + 4, (this._selectedIcon.y + 100 / 2 - 1));
        }
        // if (this._selectedItemInfoVo.icon == "itemicon4016")
        // {
        // 	this._headEffect = ComponentManager.getCustomMovieClip("headcircle_anim",10,100);
        // 	this._headEffect.x = this._selectedIconBg.x+ 2;
        // 	this._headEffect.y = this._selectedIconBg.y+ 2; 
        // 	this._headEffect.setScale(0.76);
        // 	this._buttomContainer.addChild(this._headEffect);
        // 	this._headEffect.playWithTime(0);
        // }
        // if (this._selectedItemInfoVo.icon == "itemicon4020")
        // {
        // 	this._headEffect = ComponentManager.getCustomMovieClip("title_effect4020_",10,100);
        // 	this._headEffect.x = this._selectedIconBg.x+ 2;
        // 	this._headEffect.y = this._selectedIconBg.y+ 2; 
        // 	this._headEffect.setScale(0.76);
        // 	this._buttomContainer.addChild(this._headEffect);
        // 	this._headEffect.playWithTime(0);
        // }
        // else if (this._selectedItemInfoVo.icon == "itemicon4026" && !this._headEffect)
        // {
        // 	App.LogUtil.log("this._selectedIconBg.x:"+this._selectedIconBg.x + "this._selectedIconBg.y:"+this._selectedIconBg.y);
        // 	this._headEffect = ComponentManager.getCustomMovieClip("head_4026_effect",12,100);
        // 	this._headEffect.x = this._selectedIconBg.x - 9;
        // 	this._headEffect.y = this._selectedIconBg.y - 12; 
        // 	this._headEffect.setScale(0.76);
        // 	this._buttomContainer.addChild(this._headEffect);
        // 	this._headEffect.playWithTime(0);
        // }
        // else if (this._selectedItemInfoVo.icon == "itemicon4031" && !this._headEffect)
        // {
        // 	this._headEffect = ComponentManager.getCustomMovieClip("head_4031_effect",8,100);
        // 	this._headEffect.x = this._selectedIconBg.x+ 2;
        // 	this._headEffect.y = this._selectedIconBg.y-8; 
        // 	this._headEffect.setScale(0.76);
        // 	this._buttomContainer.addChild(this._headEffect);
        // 	this._headEffect.playWithTime(0);
        // }	
        // else if (this._selectedItemInfoVo.icon == "itemicon4032" && !this._headEffect)
        // {
        // 	this._headEffect = ComponentManager.getCustomMovieClip("head_4032_effect",8,100);
        // 	this._headEffect.x = this._selectedIconBg.x + 8;
        // 	this._headEffect.y = this._selectedIconBg.y + 3; 
        // 	this._headEffect.setScale(0.76);
        // 	this._buttomContainer.addChild(this._headEffect);
        // 	this._headEffect.playWithTime(0);
        // }
        // else if ("itemicon4035" ==this._selectedItemInfoVo.icon && !this._headEffect)
        // {
        // 	this._headEffect = ComponentManager.getCustomMovieClip("head_4035_effect",8,100);
        // 	this._headEffect.x = this._selectedIconBg.x+10;
        // 	this._headEffect.y = this._selectedIconBg.y+10; 
        // 	this._headEffect.setScale(0.76);
        // 	this._buttomContainer.addChild(this._headEffect);
        // 	this._headEffect.playWithTime(0);
        // }
        // else if ("itemicon4034" ==this._selectedItemInfoVo.icon && !this._headEffect)
        // {
        // 	this._headEffect = ComponentManager.getCustomMovieClip("head_4034_effect",10,100);
        // 	this._headEffect.x = this._selectedIconBg.x+12;
        // 	this._headEffect.y = this._selectedIconBg.y+5; 
        // 	this._headEffect.setScale(0.76);
        // 	this._buttomContainer.addChild(this._headEffect);
        // 	this._headEffect.playWithTime(0);
        // }
        // else if ("itemicon4036" ==this._selectedItemInfoVo.icon && !this._headEffect)
        // {
        // 	this._headEffect = ComponentManager.getCustomMovieClip("head_4036_effect",10,100);
        // 	this._headEffect.x = this._selectedIconBg.x+12;
        // 	this._headEffect.y = this._selectedIconBg.y+5; 
        // 	this._headEffect.setScale(0.76);
        // 	this._buttomContainer.addChild(this._headEffect);
        // 	this._headEffect.playWithTime(0);
        // }
        // else if ("itemicon4037" ==this._selectedItemInfoVo.icon && !this._headEffect)
        // {
        // 	this._headEffect = ComponentManager.getCustomMovieClip("head_4037_effect",8,100);
        // 	this._headEffect.x = this._selectedIconBg.x+12;
        // 	this._headEffect.y = this._selectedIconBg.y+5; 
        // 	this._headEffect.setScale(0.76);
        // 	this._buttomContainer.addChild(this._headEffect);
        // 	this._headEffect.playWithTime(0);
        // }
        // else if ("itemicon4039" ==this._selectedItemInfoVo.icon && !this._headEffect)
        // {
        // 	this._headEffect = ComponentManager.getCustomMovieClip("head_4039_effect",8,100);
        // 	this._headEffect.x = this._selectedIconBg.x+20;
        // 	this._headEffect.y = this._selectedIconBg.y+11; 
        // 	this._headEffect.setScale(0.76);
        // 	this._buttomContainer.addChild(this._headEffect);
        // 	this._headEffect.playWithTime(0);
        // }
        // else if ("itemicon4041" ==this._selectedItemInfoVo.icon && !this._headEffect)
        // {
        // 	this._headEffect = ComponentManager.getCustomMovieClip("head_4041_effect",10,100);
        // 	this._headEffect.x = this._selectedIconBg.x+10;
        // 	this._headEffect.y = this._selectedIconBg.y+8; 
        // 	this._headEffect.setScale(0.76);
        // 	this._buttomContainer.addChild(this._headEffect);
        // 	this._headEffect.playWithTime(0);
        // }
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
        this._detailBtn = ComponentManager.getButton("item_details", null, this.clickDetailHandler, this);
        this._detailBtn.setPosition(numbg.x + numbg.width / 2 - this._detailBtn.width / 2 - 4, numbg.y + numbg.height + 2);
        this._buttomContainer.addChild(this._detailBtn);
        this._detailBtn.visible = false;
        this.updateItem(this._selectedIndex);
    };
    ItemViewTab4.prototype.clickItemHandler = function (event) {
        var index = Number(event.data);
        if (!this._itemInfoVoList[index]) {
            return;
        }
        this.updateItem(index);
    };
    ItemViewTab4.prototype.clickDetailHandler = function (event) {
        ViewController.getInstance().openView(ViewConst.POPUP.TITLELEVELDETAILPOPUPVIEW, { info: this._selectedItemInfoVo });
        // ViewController.getInstance().openView(ViewConst.COMMON.TITLELEVELUPVIEW,{titleId:"4004",lv:2});
    };
    ItemViewTab4.prototype.refreshWhenSwitchBack = function () {
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
    ItemViewTab4.prototype.refresh = function () {
        this.refreshWhenSwitchBack();
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGE_IMG);
    };
    // 刷新数据
    ItemViewTab4.prototype.updateItem = function (index) {
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
        if (!this._curTitleScrollItem) {
            if (this._selectedIndex >= 0) {
                this._scrollList.setScrollTopByIndex(this._selectedIndex);
            }
            this._curTitleScrollItem = this._scrollList.getItemByIndex(this._selectedIndex);
        }
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
        var tfg = Config.TitleCfg.getTitleCfgById(this._selectedItemInfoVo.id);
        if (tfg && tfg.isChangePic()) {
            this._selectedIcon.dispose();
            this._selectedIcon = null;
            var lv = this._selectedItemInfoVo.lv;
            if (Api.switchVoApi.checkOpenChangeTitle()) {
                if (tfg.isTitle == 2) {
                    var pTitle = Api.playerVoApi.getPlayerPtitle();
                    if (pTitle.ptitle && pTitle.ptitle == String(this._selectedItemInfoVo.id)) {
                        lv = pTitle.plv;
                    }
                }
                else if (tfg.isTitle == 1 || tfg.isTitle == 4) {
                    var titleData = Api.playerVoApi.getTitleInfo();
                    if (titleData.title && titleData.title == String(this._selectedItemInfoVo.id)) {
                        lv = titleData.tlv;
                    }
                }
            }
            this._selectedIcon = App.CommonUtil.getHeadPic(this._selectedItemInfoVo.id, lv, this._selectedItemInfoVo);
            // this._selectedIcon.x = 50;
            // this._selectedIcon.y = this._bottomBg.y + 78;
            this._selectedIcon.x = this._selectedIconBg.x + 5;
            this._selectedIcon.y = this._selectedIconBg.y + 3;
            this._buttomContainer.addChild(this._selectedIcon);
        }
        else {
            this._selectedIcon.dispose();
            this._selectedIcon = null;
            this._selectedIcon = BaseLoadBitmap.create(this._selectedItemInfoVo.icon);
            // this._selectedIcon.x = 50;
            // this._selectedIcon.y = this._bottomBg.y + 78;
            this._selectedIcon.x = this._selectedIconBg.x + 5;
            this._selectedIcon.y = this._selectedIconBg.y + 3;
            this._buttomContainer.addChild(this._selectedIcon);
        }
        this._selectedIcon.visible = true;
        this._selectedNameTextF.x = this._bottomBg.width / 2 - this._selectedNameTextF.width / 2;
        this._selectedNameTextF.y = this._bottomBg.y + 26;
        if (this._headEffect) {
            this._headEffect.dispose();
            this._headEffect = null;
        }
        var eff = App.CommonUtil.getHeadEffect(this._selectedItemInfoVo.id.toString());
        if (eff && !this._headEffect) {
            this._buttomContainer.addChild(eff);
            this._headEffect = eff;
            eff.setScale(0.78);
            eff.setPosition(this._selectedIcon.x + 100 / 2 + 4, (this._selectedIcon.y + 100 / 2 - 1));
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
        // if (this._selectedItemInfoVo.icon == "itemicon4020" && !this._headEffect)
        // {
        // 	this._headEffect = ComponentManager.getCustomMovieClip("title_effect4020_",10,100);
        // 	this._headEffect.x = this._selectedIconBg.x+ 2;
        // 	this._headEffect.y = this._selectedIconBg.y+ 2; 
        // 	this._headEffect.setScale(0.76);
        // 	this._buttomContainer.addChild(this._headEffect);
        // 	this._headEffect.playWithTime(0);
        // }
        // else if (this._selectedItemInfoVo.icon == "itemicon4026" && !this._headEffect)
        // {
        // 	this._headEffect = ComponentManager.getCustomMovieClip("head_4026_effect",12,100);
        // 	App.LogUtil.log("this._selectedIconBg.x:"+this._selectedIconBg.x + "this._selectedIconBg.y:"+this._selectedIconBg.y);
        // 	this._headEffect.x = this._selectedIconBg.x - 9;
        // 	this._headEffect.y = this._selectedIconBg.y - 12; 
        // 	this._headEffect.setScale(0.76);
        // 	this._buttomContainer.addChild(this._headEffect);
        // 	this._headEffect.playWithTime(0);
        // }
        // else if (this._selectedItemInfoVo.icon == "itemicon4031" && !this._headEffect)
        // {
        // 	this._headEffect = ComponentManager.getCustomMovieClip("head_4031_effect",8,100);
        // 	this._headEffect.x = this._selectedIconBg.x+ 2;
        // 	this._headEffect.y = this._selectedIconBg.y- 8; 
        // 	this._headEffect.setScale(0.76);
        // 	this._buttomContainer.addChild(this._headEffect);
        // 	this._headEffect.playWithTime(0);
        // }
        // else if (this._selectedItemInfoVo.icon == "itemicon4032" && !this._headEffect)
        // {
        // 	this._headEffect = ComponentManager.getCustomMovieClip("head_4032_effect",8,100);
        // 	this._headEffect.x = this._selectedIconBg.x + 8;
        // 	this._headEffect.y = this._selectedIconBg.y + 3; 
        // 	this._headEffect.setScale(0.76);
        // 	this._buttomContainer.addChild(this._headEffect);
        // 	this._headEffect.playWithTime(0);
        // }
        // else if ("itemicon4035" ==this._selectedItemInfoVo.icon && !this._headEffect)
        // {
        // 	this._headEffect = ComponentManager.getCustomMovieClip("head_4035_effect",8,100);
        // 	this._headEffect.x = this._selectedIconBg.x+10;
        // 	this._headEffect.y = this._selectedIconBg.y+10; 
        // 	this._headEffect.setScale(0.76);
        // 	this._buttomContainer.addChild(this._headEffect);
        // 	this._headEffect.playWithTime(0);
        // }
        // else if ("itemicon4034" ==this._selectedItemInfoVo.icon && !this._headEffect)
        // {
        // 	this._headEffect = ComponentManager.getCustomMovieClip("head_4034_effect",10,100);
        // 	this._headEffect.x = this._selectedIconBg.x+12;
        // 	this._headEffect.y = this._selectedIconBg.y+5; 
        // 	this._headEffect.setScale(0.76);
        // 	this._buttomContainer.addChild(this._headEffect);
        // 	this._headEffect.playWithTime(0);
        // }
        // else if ("itemicon4036" ==this._selectedItemInfoVo.icon && !this._headEffect)
        // {
        // 	this._headEffect = ComponentManager.getCustomMovieClip("head_4036_effect",10,100);
        // 	this._headEffect.x = this._selectedIconBg.x+12;
        // 	this._headEffect.y = this._selectedIconBg.y+5; 
        // 	this._headEffect.setScale(0.76);
        // 	this._buttomContainer.addChild(this._headEffect);
        // 	this._headEffect.playWithTime(0);
        // }
        // else if ("itemicon4037" ==this._selectedItemInfoVo.icon && !this._headEffect)
        // {
        // 	this._headEffect = ComponentManager.getCustomMovieClip("head_4037_effect",8,100);
        // 	this._headEffect.x = this._selectedIconBg.x+12;
        // 	this._headEffect.y = this._selectedIconBg.y+5; 
        // 	this._headEffect.setScale(0.76);
        // 	this._buttomContainer.addChild(this._headEffect);
        // 	this._headEffect.playWithTime(0);
        // }
        // else if ("itemicon4039" ==this._selectedItemInfoVo.icon && !this._headEffect)
        // {
        // 	this._headEffect = ComponentManager.getCustomMovieClip("head_4039_effect",8,100);
        // 	this._headEffect.x = this._selectedIconBg.x+20;
        // 	this._headEffect.y = this._selectedIconBg.y+11; 
        // 	this._headEffect.setScale(0.76);
        // 	this._buttomContainer.addChild(this._headEffect);
        // 	this._headEffect.playWithTime(0);
        // }
        // else if ("itemicon4041" ==this._selectedItemInfoVo.icon && !this._headEffect)
        // {
        // 	this._headEffect = ComponentManager.getCustomMovieClip("head_4041_effect",10,100);
        // 	this._headEffect.x = this._selectedIconBg.x+10;
        // 	this._headEffect.y = this._selectedIconBg.y+8; 
        // 	this._headEffect.setScale(0.76);
        // 	this._buttomContainer.addChild(this._headEffect);
        // 	this._headEffect.playWithTime(0);
        // }
        if (Api.switchVoApi.checkOpenTitleLv() && this._selectedItemInfoVo.isLvUp == 1) {
            this._detailBtn.visible = true;
            this._itemLv.visible = true;
            this._itemLv.text = LanguageManager.getlocal("itemLevel", [String(this._selectedItemInfoVo.lv)]);
            this._numbg.visible = true;
        }
        else {
            this._numbg.visible = false;
            this._detailBtn.visible = false;
            this._itemLv.visible = false;
        }
    };
    // 点击使用按钮
    ItemViewTab4.prototype.clickUseBtnHandler = function (param) {
        if (this._selectedItemInfoVo) {
            this.sendRequest(this._selectedItemInfoVo);
        }
    };
    // 数据请求
    ItemViewTab4.prototype.sendRequest = function (itemVo) {
        if (itemVo.num == 2) {
            this.request(NetRequestConst.REQUEST_ITEM_DROPTITLE, { "titleId": itemVo.id });
        }
        else {
            var data = { "titleid": itemVo.id, "status": itemVo.num + 1 };
            NetManager.request(this.getNetRequestConst(), data);
        }
    };
    ItemViewTab4.prototype.receiveData = function (data) {
        if (data.ret && data.data.cmd == NetRequestConst.REQUEST_ITEM_DROPTITLE) {
            App.CommonUtil.showTip(LanguageManager.getlocal("titleTakeoffSuccess"));
            this.refresh();
        }
    };
    // 刷新道具数量
    ItemViewTab4.prototype.useCallback = function (event) {
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
    ItemViewTab4.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(this.getNetRequestConst()), this.useCallback, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ITEM, this.refresh, this);
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
    return ItemViewTab4;
}(CommonViewTab));
__reflect(ItemViewTab4.prototype, "ItemViewTab4");
//# sourceMappingURL=ItemViewTab4.js.map