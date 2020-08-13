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
var ItemViewTab1 = (function (_super) {
    __extends(ItemViewTab1, _super);
    function ItemViewTab1() {
        var _this = _super.call(this) || this;
        // 当前选中的索引
        _this._selectedIndex = null;
        // 当前选中的itemvo
        _this._selectedItemInfoVo = null;
        // 道具选中框
        _this._selectedBg = null;
        // 当前选中道具名称文本
        _this._selectedNameTextF = null;
        // 数量文本
        _this._selectedNumTextF = null;
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
        _this._itemInfoVoList = null;
        _this._errorTF = null;
        _this._lastUseNum = 0;
        _this.initView();
        return _this;
    }
    ItemViewTab1.prototype.getListType = function () {
        return 1;
    };
    ItemViewTab1.prototype.getNetRequestConst = function () {
        return NetRequestConst.REQUEST_USE_ITEM;
    };
    ItemViewTab1.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(this.getNetRequestConst()), this.useCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_CHANGENAME), this.useCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_CHANGEPIC), this.useCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHANGE_IMG, this.changeImgNotify, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICR_ITEM_COMPOUND, this.refreshItemsAfterCompound, this);
        this._itemInfoVoList = Api.itemVoApi.getItemVoListByType(this.getListType());
        if (this._itemInfoVoList.length > 0 && this._itemInfoVoList[0]) {
            this._selectedIndex = 0;
            this._selectedItemInfoVo = this._itemInfoVoList[0];
        }
        else {
            this._selectedIndex = -1;
        }
        // let bottom = BaseBitmap.create("public_daoju_bg01");
        // bottom.x = GameConfig.stageWidth/2 - bottom.width/2;
        // bottom.y = GameConfig.stageHeigth - 153 - bottom.height;   //bg1.height + 228 + 40;
        // this.addChild(bottom);
        // let dotbg = BaseBitmap.create("itemview_daoju_bg03");
        // dotbg.x = GameConfig.stageWidth / 2 - dotbg.width/2;
        // dotbg.y = GameConfig.stageHeigth - 153 - bottom.height - dotbg.height;
        // this.addChild(dotbg);
        var border = BaseBitmap.create("commonview_border1");
        border.width = GameConfig.stageWidth;
        border.height = GameConfig.stageHeigth - 69 - 89;
        border.x = 0;
        border.y = 0; //69 + 89;
        var bottom = BaseBitmap.create("commonview_bottom");
        bottom.x = 0;
        bottom.y = GameConfig.stageHeigth - bottom.height - 69 - 89 + 5;
        this._buttomContainer = new BaseDisplayObjectContainer();
        var bottomPanel = BaseBitmap.create("itemview_detailbg");
        bottomPanel.x = GameConfig.stageWidth / 2 - bottomPanel.width / 2;
        bottomPanel.y = bottom.y - bottomPanel.height + 10;
        this._bottomContent = bottomPanel;
        var leftItem = BaseBitmap.create("commonview_item1");
        leftItem.scaleX = -1;
        leftItem.x = leftItem.width;
        leftItem.y = bottomPanel.y;
        var rightItem = BaseBitmap.create("commonview_item1");
        rightItem.x = border.x + border.width - rightItem.width;
        rightItem.y = bottomPanel.y;
        var line = BaseBitmap.create("commonview_border2");
        line.width = 640;
        line.x = GameConfig.stageWidth / 2 - line.width / 2;
        line.y = bottomPanel.y - line.height + 8;
        var bg1 = BaseBitmap.create("commonview_woodbg");
        bg1.width = GameConfig.stageWidth;
        bg1.height = GameConfig.stageHeigth; //line.y - border.y+30;
        this.addChild(bg1);
        this.addChild(border);
        this.addChild(bottom);
        this.addChild(this._buttomContainer);
        this._buttomContainer.addChild(bottomPanel);
        this._buttomContainer.addChild(leftItem);
        this._buttomContainer.addChild(rightItem);
        this._buttomContainer.addChild(line);
        this._buttomContainer.visible = false;
        // let flower = BaseBitmap.create("public_daoju_bg02");
        // flower.x = GameConfig.stageWidth - flower.width;
        // flower.y  = GameConfig.stageHeigth - 153 - bottom.height - dotbg.height;
        // this.addChild(flower);
        // let bg1:BaseBitmap = BaseBitmap.create("public_9v_bg02");//
        // // bg1.y = 5;
        // bg1.width = GameConfig.stageWidth;
        // // bg1.x = 10;
        // bg1.height = GameConfig.stageHeigth - 153 - bottom.height - dotbg.height -228 ;//_bottomBgLeft.height ->228
        // bg1.name="bg1";
        // this.addChild(bg1);
        // this._border = BaseBitmap.create("public_9v_bg03");
        // this._border.width = GameConfig.stageWidth;
        // this._border.height = bg1.height;
        // this.addChild(this._border);
        var rect = new egret.Rectangle(); //egret.Rectangle.create();
        rect.setTo(0, 0, 640 - 30, line.y - border.y);
        //添加空数据
        var blankMaxNum = 0;
        var blankList = [];
        var emptyItemInfoVo = null;
        if (this._itemInfoVoList.length <= 0) {
            blankMaxNum = 0;
        }
        else {
            blankMaxNum = 25;
        }
        if (this._itemInfoVoList.length <= blankMaxNum) {
            for (var i = this._itemInfoVoList.length; i < blankMaxNum; i++) {
                emptyItemInfoVo = new ItemInfoVo();
                emptyItemInfoVo.id = -1;
                blankList.push(emptyItemInfoVo);
            }
        }
        else {
            var maxLength = Math.ceil(this._itemInfoVoList.length / 5) * 5;
            for (var i = this._itemInfoVoList.length; i < maxLength; i++) {
                emptyItemInfoVo = new ItemInfoVo();
                emptyItemInfoVo.id = -1;
                blankList.push(emptyItemInfoVo);
            }
        }
        this._scrollList = ComponentManager.getScrollList(ItemScrollItem, this._itemInfoVoList.concat(blankList), rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(20, border.y + 10);
        this._scrollList.addTouchTap(this.clickItemHandler, this);
        this._errorTF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._errorTF.x = border.x + border.width / 2 - this._errorTF.width / 2;
        this._errorTF.y = border.y + border.height / 2 - this._errorTF.height / 2;
        this.addChild(this._errorTF);
        // this.initButtomContainer(bg1);
        // this.noItemTip();
        if (this._selectedItemInfoVo) {
            this.initButtomContainer(border);
        }
        else {
            this.noItemTip();
        }
    };
    // 背景图名称
    // protected getBgName():string
    // {
    // 	return "commonview_woodbg";
    // }
    ItemViewTab1.prototype.initButtomContainer = function (bg1) {
        // this._buttomContainer = new BaseDisplayObjectContainer();
        // this._buttomContainer.y =  bg1.y + bg1.height + 2;
        // this.addChild(this._buttomContainer);
        // this._bottomBgLeft = BaseBitmap.create("itemview_daoju_bg01");
        // this._bottomBgLeft.x = 0;
        // this._bottomBgLeft.y = 0;
        // this._buttomContainer.addChild(this._bottomBgLeft);
        // this._bottomBgRight = BaseBitmap.create("itemview_daoju_bg01");
        // this._bottomBgRight.scaleX = -1;
        // this._bottomBgRight.x = GameConfig.stageWidth;
        // this._bottomBgRight.y = 0;
        // this._buttomContainer.addChild(this._bottomBgRight);
        // let line1 = BaseBitmap.create("public_v_huawen01");
        // line1.x = 150 ;
        // line1.y = this._bottomBgLeft.y + 30;
        // this._buttomContainer.addChild(line1);
        // let line2 = BaseBitmap.create("public_v_huawen01");
        // line2.scaleX = -1;
        // line2.x = 628;
        // line2.y = line1.y;
        // this._buttomContainer.addChild(line2);
        this._buttomContainer.visible = true;
        if (PlatformManager.checkIsViSp()) {
            this._selectedNameTextF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        }
        else {
            this._selectedNameTextF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL);
        }
        this._buttomContainer.addChild(this._selectedNameTextF);
        // let bg5:BaseBitmap = BaseBitmap.create("public_9v_bg09");
        // bg5.x = 90;
        // bg5.y = this._bottomBgLeft.y + 55; //65
        // bg5.width = 500;
        // bg5.height = 133;
        // this._buttomContainer.addChild(bg5);
        var itemBg = BaseBitmap.create("itemview_daoju_bg02");
        itemBg.x = 10;
        itemBg.y = this._bottomContent.y + 20; // this._bottomContent.height/2 - itemBg.height / 2;
        this._buttomContainer.addChild(itemBg);
        if (this._selectedItemInfoVo && this._selectedItemInfoVo.iconBg && this._selectedItemInfoVo.icon) {
            this._selectedIconBg = BaseBitmap.create(this._selectedItemInfoVo.iconBg);
            this._selectedIconBg.x = itemBg.x + itemBg.width / 2 - this._selectedIconBg.width / 2;
            this._selectedIconBg.y = itemBg.y + itemBg.height / 2 - this._selectedIconBg.height / 2;
            this._buttomContainer.addChild(this._selectedIconBg);
            this._selectedIcon = BaseLoadBitmap.create(this._selectedItemInfoVo.icon);
            this._selectedIcon.x = itemBg.x + itemBg.width / 2 - 50;
            this._selectedIcon.y = itemBg.y + itemBg.height / 2 - 50;
            // this._selectedIcon.x = 50;
            // this._selectedIcon.y = this._bottomBgLeft.height / 2 - this._selectedIconBg.width / 2;
            this._buttomContainer.addChild(this._selectedIcon);
            this._selectedIcon.visible = false;
        }
        this._selectedNumTextF = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_WHITE);
        this._buttomContainer.addChild(this._selectedNumTextF);
        if (PlatformManager.checkIsViSp()) {
            this._selectedDescTextF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        }
        else {
            this._selectedDescTextF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        }
        this._selectedDescTextF.lineSpacing = 5;
        this._selectedDescTextF.x = 230; //bg5.x + 50;
        // this._selectedDescTextF.stroke = 2;
        this._selectedDescTextF.width = 380;
        if (PlatformManager.checkIsViSp()) {
            this._selectedDescTextF.y = this._bottomContent.y + 77 - 18;
        }
        else {
            this._selectedDescTextF.y = this._bottomContent.y + 70;
        }
        this._buttomContainer.addChild(this._selectedDescTextF);
        if (PlatformManager.checkIsViSp()) {
            this._selectedDropTextF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        }
        else {
            this._selectedDropTextF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        }
        this._selectedDropTextF.x = 230;
        // this._selectedDropTextF.stroke = 2;
        this._selectedDropTextF.width = 380;
        this._selectedDropTextF.y = this._selectedDescTextF.y + this._selectedDescTextF.height + 10; // bg5.y + 65;
        this._buttomContainer.addChild(this._selectedDropTextF);
        this._useBtn = ComponentManager.getButton("btn_big_yellow2", "useBtn", this.clickUseBtnHandler, this);
        this._useBtn.setColor(0x6f2f00);
        this._useBtn.x = GameConfig.stageWidth / 2 - this._useBtn.width * this._useBtn.scaleX / 2;
        this._useBtn.y = GameConfig.stageHeigth - this._useBtn.height - 200;
        this.addChild(this._useBtn);
        this._useBtn.visible = false;
        this.updateItem(this._selectedIndex);
    };
    ItemViewTab1.prototype.clickItemHandler = function (event) {
        var index = Number(event.data);
        this.updateItem(index);
    };
    // 刷新数据
    /**
     *
     * @param index
     * @param ifRefresh 是否需要强制刷新 true，强制刷新
     */
    ItemViewTab1.prototype.updateItem = function (index, ifRefresh) {
        if (ifRefresh === void 0) { ifRefresh = false; }
        if (index >= this._itemInfoVoList.length) {
            return;
        }
        if (this._selectedIndex == -1) {
            if (this._buttomContainer) {
                this._buttomContainer.visible = false;
            }
            this.noItemTip();
            if (this._selectedNameTextF) {
                this._selectedNameTextF.text = "";
            }
            if (this._selectedNumTextF) {
                this._selectedNumTextF.text = "";
            }
            if (this._selectedDescTextF) {
                this._selectedDescTextF.text = "";
            }
            if (this._selectedDropTextF) {
                this._selectedDropTextF.text = "";
            }
            if (this._useBtn) {
                this._useBtn.visible = false;
            }
            if (this._selectedIcon) {
                this._selectedIcon.visible = false;
            }
            if (this._selectedIconBg) {
                this._selectedIconBg.visible = false;
            }
            return;
        }
        this._buttomContainer.visible = true;
        if (this._selectedIndex && this._selectedIndex == index && this._selectedItemInfoVo && ifRefresh == false) {
            if (this._selectedBg) {
                if (this._curItemScrollItem && !this._curItemScrollItem.contains(this._selectedBg)) {
                    this._curItemScrollItem.addChild(this._selectedBg);
                }
            }
            this._selectedNumTextF.text = String(this._selectedItemInfoVo.num);
            this._selectedNumTextF.x = 165 - this._selectedNumTextF.width + 10;
            /**
             * 蛮王
             */
            if (this._selectedItemInfoVo.id == 1950) {
                if (Api.servantVoApi.isOwnServantDailyBoss()) {
                    this._useBtn.visible = false;
                }
                else {
                    this._useBtn.visible = true;
                }
            }
            /**
             * kehan
             */
            if (this._selectedItemInfoVo.id == 1961) {
                if (Api.servantVoApi.getServantObj("1055")) {
                    this._useBtn.visible = false;
                }
                else {
                    this._useBtn.visible = true;
                }
            }
            /**
             * 海盗
             */
            if (this._selectedItemInfoVo.id == 1951) {
                if (Api.servantVoApi.getServantObj("1056")) {
                    this._useBtn.visible = false;
                }
                else {
                    this._useBtn.visible = true;
                }
            }
            return;
        }
        if (this._selectedBg == null) {
            this._selectedBg = BaseBitmap.create("itembg_selected");
            // if(!GameData.isUseNewUI)
            // {
            // 	this._selectedBg.x = 4;
            // 	this._selectedBg.y = 4;
            // }
            // else
            // {
            this._selectedBg.x = -3;
            this._selectedBg.y = -3;
            // }
        }
        else {
            if (this._curItemScrollItem && this._curItemScrollItem.contains(this._selectedBg)) {
                this._curItemScrollItem.removeChild(this._selectedBg);
            }
        }
        this._selectedIndex = index;
        this._selectedItemInfoVo = this._itemInfoVoList[this._selectedIndex];
        this._curItemScrollItem = this._scrollList.getItemByIndex(this._selectedIndex);
        if (this._curItemScrollItem && !this._curItemScrollItem.contains(this._selectedBg)) {
            this._curItemScrollItem.addChild(this._selectedBg);
        }
        if (this._selectedItemInfoVo && this._selectedItemInfoVo.name) {
            this._selectedNameTextF.text = this._selectedItemInfoVo.name;
            this._selectedNameTextF.setColor(this._selectedItemInfoVo.qualityColor);
            this._selectedNumTextF.text = String(this._selectedItemInfoVo.num);
            this._selectedDescTextF.text = LanguageManager.getlocal("effectTitle") + this._selectedItemInfoVo.desc;
            this._selectedNumTextF.x = 165 - this._selectedNumTextF.width + 10;
            this._selectedDropTextF.text = LanguageManager.getlocal("dropTitle") + this._selectedItemInfoVo.dropDesc;
            if (PlatformManager.checkIsViSp()) {
                this._selectedDropTextF.y = this._selectedDescTextF.y + this._selectedDescTextF.height + 5;
            }
            else {
                this._selectedDropTextF.y = this._selectedDescTextF.y + this._selectedDescTextF.height + 10;
            }
            this._useBtn.visible = this._selectedItemInfoVo.isShowUseBtn;
        }
        /**
         * 蛮王
         */
        if (this._selectedItemInfoVo.id == 1950) {
            if (Api.servantVoApi.isOwnServantDailyBoss()) {
                this._useBtn.visible = false;
            }
            else {
                this._useBtn.visible = true;
            }
        }
        /**
         * kehan
         */
        if (this._selectedItemInfoVo.id == 1961) {
            if (Api.servantVoApi.getServantObj("1055")) {
                this._useBtn.visible = false;
            }
            else {
                this._useBtn.visible = true;
            }
        }
        /**
         * 海盗
         */
        if (this._selectedItemInfoVo.id == 1951) {
            if (Api.servantVoApi.getServantObj("1056")) {
                this._useBtn.visible = false;
            }
            else {
                this._useBtn.visible = true;
            }
        }
        this._selectedIconBg.visible = true;
        if (this._selectedItemInfoVo && this._selectedItemInfoVo.iconBg) {
            this._selectedIconBg.texture = ResourceManager.getRes(this._selectedItemInfoVo.iconBg);
            this._selectedIcon.visible = true;
            // this._selectedIcon.texture = BaseLoadBitmap.create(this._selectedItemInfoVo.icon).texture;
            this._selectedIcon.setload(this._selectedItemInfoVo.icon);
        }
        this._selectedNumTextF.x = 165 - this._selectedNumTextF.width + 10;
        // this._selectedNumTextF.x = this._selectedIcon.x + 20;
        this._selectedNumTextF.y = this._bottomContent.y + 140 + 8;
        this._selectedNameTextF.x = 230; //GameConfig.stageWidth / 2 - this._selectedNameTextF.width/2 + 70;
        this._selectedNameTextF.y = this._bottomContent.y + 33;
    };
    // 点击使用按钮
    ItemViewTab1.prototype.clickUseBtnHandler = function (param) {
        var num = 1;
        if (this._selectedItemInfoVo) {
            var data = void 0;
            var itemId = this._selectedItemInfoVo.id;
            //condition
            var itemCfg = Config.ItemCfg.getItemCfgById(itemId);
            if (itemCfg.condition && itemCfg.target) {
                switch (itemCfg.target) {
                    case 2:
                        var servantVo = Api.servantVoApi.getServantObj(String(itemCfg.condition));
                        if (!servantVo) {
                            App.CommonUtil.showTip(LanguageManager.getlocal("itemConditionTip_" + itemCfg.id));
                            return;
                        }
                        break;
                    case 3:
                        var WifeVo_1 = Api.wifeVoApi.getWifeInfoVoById(String(itemCfg.condition));
                        if (!WifeVo_1) {
                            App.CommonUtil.showTip(LanguageManager.getlocal("itemConditionTip_" + itemCfg.id));
                            return;
                        }
                        break;
                }
            }
            //粮草速率为负 不让用
            if (itemCfg.rateRewards && (itemCfg.rateRewards.split("_")[0] == "31" || itemCfg.rateRewards.split("_")[0] == "41")) {
                var ratetype = "";
                var paramStr = "";
                if (itemCfg.rateRewards.split("_")[0] == "31") {
                    ratetype = "food";
                    paramStr = LanguageManager.getlocal("affair_rewardType2");
                }
                else if (itemCfg.rateRewards.split("_")[0] == "41") {
                    ratetype = "soldier";
                    paramStr = LanguageManager.getlocal("soldier");
                }
                if (Api.levyVoApi.getTotalRawAddRate(ratetype) <= 0) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("rateRewardUseTip", [paramStr]));
                    return;
                }
            }
            /**
             * 特殊道具
             */
            if (itemId == 1021 || itemId == 1029 || itemId == 1361 || itemId == 1362 || itemId == 2103 || itemId == 2104 || itemId == 2105 || itemId == 2106 || itemId == 2125) {
                if ((itemId == 1361 || itemId == 1362) && Api.wifeVoApi.getWifeNum() == 0) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("itemUse_noWifeTip"));
                    return;
                }
                //个人贡献 没有帮派不能使用
                if ((itemId == 2125) && Api.playerVoApi.getPlayerAllianceId() == 0) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("itemUseNeedAlliance"));
                    return;
                }
                //春季送礼活动特殊道具
                if (itemId == 2103 || itemId == 2104 || itemId == 2105 || itemId == 2106) {
                    //过期 
                    if (Api.itemVoApi.isEnd(itemId) == true) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acspringTouchdes2"));
                        return;
                    }
                    if (Api.itemVoApi.isStart(itemId) == false) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acspringTouchdes"));
                        return;
                    }
                }
                if (this._selectedItemInfoVo.num >= ItemView.MAX_NUM) {
                    ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSEPOPUPVIEW, { itemId: this._selectedItemInfoVo.id, callback: this.sendRequest, handler: this });
                }
                else {
                    this.sendRequest(num, this._selectedItemInfoVo.id);
                }
                return;
            }
            if ((this._selectedItemInfoVo instanceof ItemInfoVo) && this._selectedItemInfoVo.target == 2 && !itemCfg.condition) {
                ViewController.getInstance().openView(ViewConst.POPUP.SERVANTSELECTEDPOPUPVIEW, { type: ServantSelectedPopupView.TYPE_USE_ITEM, "itemId": this._selectedItemInfoVo.id, callback: this.sendRequest, handler: this });
                // todo 使用门客道具
                // let servantId:number = 
                // data = {"itemId":this._selectedItemInfoVo.id,"itemNum":num,"servantId":servantId};
            }
            else if (this._selectedItemInfoVo.id == 1902) {
                //改形象
                //  ViewController.getInstance().openView(ViewConst.COMMON.GUIDECREATEUSERVIEW,{changeImg:true,callBack:this.sendRequest,obj:this});
                ViewController.getInstance().openView(ViewConst.COMMON.CREATEUSERVIEW, { changeImg: true, callBack: this.sendRequest, obj: this });
            }
            else if ((this._selectedItemInfoVo instanceof ItemInfoVo) && this._selectedItemInfoVo.id == 1901) {
                //改名卡
                ViewController.getInstance().openView(ViewConst.POPUP.USERNAMEPOPUPVIEW);
            }
            else {
                var itemCfg_1 = Config.ItemCfg.getItemCfgById(this._selectedItemInfoVo.id);
                if (this._selectedItemInfoVo.num >= ItemView.MAX_NUM && this._selectedItemInfoVo.id != 1950 && this._selectedItemInfoVo.id != 1961 && this._selectedItemInfoVo.id != 1951 && itemCfg_1.chipType != "6") {
                    ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSEPOPUPVIEW, { itemId: this._selectedItemInfoVo.id, callback: this.sendRequest, handler: this });
                }
                else {
                    this.sendRequest(num, this._selectedItemInfoVo.id);
                }
            }
        }
    };
    ItemViewTab1.prototype.changeImgNotify = function () {
        this.updateItem(this._selectedIndex, true);
        if (this._selectedItemInfoVo && this._selectedItemInfoVo.num > 0) {
            if (this._curItemScrollItem) {
                this._curItemScrollItem.update();
            }
        }
    };
    //合成后刷新
    ItemViewTab1.prototype.refreshItemsAfterCompound = function () {
        var ifRefresh = false;
        if (this._selectedItemInfoVo.num > 0) {
            if (this._curItemScrollItem) {
                this._curItemScrollItem.update();
            }
            this._itemInfoVoList = Api.itemVoApi.getItemVoListByType(1);
            //添加空数据
            var blankMaxNum = 0;
            var blankList = [];
            var emptyItemInfoVo = null;
            if (this._itemInfoVoList.length <= 0) {
                blankMaxNum = 0;
            }
            else {
                blankMaxNum = 25;
            }
            if (this._itemInfoVoList.length <= blankMaxNum) {
                for (var i = this._itemInfoVoList.length; i < blankMaxNum; i++) {
                    emptyItemInfoVo = new ItemInfoVo();
                    emptyItemInfoVo.id = -1;
                    blankList.push(emptyItemInfoVo);
                }
            }
            else {
                var maxLength = Math.ceil(this._itemInfoVoList.length / 5) * 5;
                for (var i = this._itemInfoVoList.length; i < maxLength; i++) {
                    emptyItemInfoVo = new ItemInfoVo();
                    emptyItemInfoVo.id = -1;
                    blankList.push(emptyItemInfoVo);
                }
            }
            if (this._curItemScrollItem && this._curItemScrollItem.contains(this._selectedBg)) {
                this._curItemScrollItem.removeChild(this._selectedBg);
            }
            this._scrollList.refreshData(this._itemInfoVoList.concat(blankList));
            ifRefresh = true;
        }
        else {
            ifRefresh = true;
            this._itemInfoVoList = Api.itemVoApi.getItemVoListByType(1);
            if (this._curItemScrollItem && this._curItemScrollItem.contains(this._selectedBg)) {
                this._curItemScrollItem.removeChild(this._selectedBg);
            }
            //添加空数据
            var blankMaxNum = 0;
            var blankList = [];
            var emptyItemInfoVo = null;
            if (this._itemInfoVoList.length <= 0) {
                blankMaxNum = 0;
            }
            else {
                blankMaxNum = 25;
            }
            if (this._itemInfoVoList.length <= blankMaxNum) {
                for (var i = this._itemInfoVoList.length; i < blankMaxNum; i++) {
                    emptyItemInfoVo = new ItemInfoVo();
                    emptyItemInfoVo.id = -1;
                    blankList.push(emptyItemInfoVo);
                }
            }
            else {
                var maxLength = Math.ceil(this._itemInfoVoList.length / 5) * 5;
                for (var i = this._itemInfoVoList.length; i < maxLength; i++) {
                    emptyItemInfoVo = new ItemInfoVo();
                    emptyItemInfoVo.id = -1;
                    blankList.push(emptyItemInfoVo);
                }
            }
            this._scrollList.refreshData(this._itemInfoVoList.concat(blankList));
            if (this._itemInfoVoList.length > this._selectedIndex) {
                this._selectedItemInfoVo = this._itemInfoVoList[this._selectedIndex];
            }
            else if (this._selectedIndex > 0) {
                this._selectedIndex -= 1;
                this._selectedItemInfoVo = this._itemInfoVoList[this._selectedIndex];
            }
            else {
                this._selectedIndex = -1;
                this._selectedItemInfoVo = null;
            }
        }
        this.updateItem(this._selectedIndex, ifRefresh);
    };
    // 数据请求
    ItemViewTab1.prototype.sendRequest = function (itemNum, itemId, servantId) {
        this._lastUseNum = itemNum;
        var data = { "itemNum": itemNum, "itemId": itemId };
        if (servantId) {
            data["servantId"] = servantId;
        }
        NetManager.request(this.getNetRequestConst(), data);
    };
    //检测是否有活的道具转换碎片的情况
    ItemViewTab1.prototype.checkHaveExchange = function (reward) {
        var itemId = this._selectedItemInfoVo.id;
        //检测是否有活的道具转换碎片的情况
        var itemCfg = Config.ItemCfg.getItemCfgById(itemId);
        var cfgReward = itemCfg.getRewards;
        Api.servantVoApi.checkServantChangeRewards(cfgReward, reward, null, true);
    };
    // 刷新道具数量
    ItemViewTab1.prototype.useCallback = function (event) {
        var rdata = event.data.data.data;
        var ifRefresh = false;
        var isGetItem = false;
        if (rdata && rdata.rewards) {
            var rewardList = GameData.formatRewardItem(rdata.rewards);
            // let list = [];
            for (var i = 0; i < rewardList.length; i++) {
                var rewardItemVo = rewardList[i];
                if (rewardItemVo.type == 6) {
                    isGetItem = true;
                    break;
                }
            }
            App.CommonUtil.playRewardFlyAction(rewardList);
            //检测是否有活的道具转换碎片的情况
            this.checkHaveExchange(rdata.rewards);
        }
        var itemId = this._selectedItemInfoVo.id;
        /**
         * 特殊道具
         */
        if (rdata && rdata.servantArr) {
            ViewController.getInstance().openView(ViewConst.BASE.ITEMUSESUCCESSVIEW, [rdata.servantArr, this._lastUseNum, this._selectedItemInfoVo]);
        }
        if (rdata && rdata.wifeArr && (itemId == 1361 || itemId == 1362 || itemId == 1363)) {
            ViewController.getInstance().openView(ViewConst.BASE.ITEMUSESUCCESSVIEW, [rdata.wifeArr, this._lastUseNum, this._selectedItemInfoVo]);
        }
        if (this._selectedItemInfoVo.num > 0 && isGetItem == false) {
            if (this._curItemScrollItem) {
                this._curItemScrollItem.update();
            }
        }
        else {
            ifRefresh = true;
            this._itemInfoVoList = Api.itemVoApi.getItemVoListByType(1);
            if (this._curItemScrollItem && this._curItemScrollItem.contains(this._selectedBg)) {
                this._curItemScrollItem.removeChild(this._selectedBg);
            }
            //添加空数据
            var blankMaxNum = 0;
            var blankList = [];
            var emptyItemInfoVo = null;
            if (this._itemInfoVoList.length <= 0) {
                blankMaxNum = 0;
            }
            else {
                blankMaxNum = 25;
            }
            if (this._itemInfoVoList.length <= blankMaxNum) {
                for (var i = this._itemInfoVoList.length; i < blankMaxNum; i++) {
                    emptyItemInfoVo = new ItemInfoVo();
                    emptyItemInfoVo.id = -1;
                    blankList.push(emptyItemInfoVo);
                }
            }
            else {
                var maxLength = Math.ceil(this._itemInfoVoList.length / 5) * 5;
                for (var i = this._itemInfoVoList.length; i < maxLength; i++) {
                    emptyItemInfoVo = new ItemInfoVo();
                    emptyItemInfoVo.id = -1;
                    blankList.push(emptyItemInfoVo);
                }
            }
            if (this._curItemScrollItem && this._curItemScrollItem.contains(this._selectedBg)) {
                this._curItemScrollItem.removeChild(this._selectedBg);
            }
            this._scrollList.refreshData(this._itemInfoVoList.concat(blankList));
            // this._scrollList.refreshData(this._itemInfoVoList);
            if (this._itemInfoVoList.length > this._selectedIndex) {
                this._selectedItemInfoVo = this._itemInfoVoList[this._selectedIndex];
            }
            else if (this._selectedIndex > 0) {
                this._selectedIndex -= 1;
                this._selectedItemInfoVo = this._itemInfoVoList[this._selectedIndex];
            }
            else {
                this._selectedIndex = -1;
                this._selectedItemInfoVo = null;
            }
        }
        this.updateItem(this._selectedIndex, ifRefresh);
    };
    // 暂无道具
    ItemViewTab1.prototype.noItemTip = function () {
        if (this._itemInfoVoList.length <= 0) {
            this._errorTF.text = LanguageManager.getlocal("itemNotHasDesc");
            this._errorTF.x = GameConfig.stageWidth / 2 - this._errorTF.width / 2;
            this._errorTF.y = GameConfig.stageHeigth / 2 - 69 - 89; //GameConfig.stageHeigth -610;
            // this._border.height = GameConfig.stageHeigth - 89 - 69 - 8;
            // if(this.getChildByName("bg1"))
            // {
            // 	this.getChildByName("bg1").height=GameConfig.stageHeigth - 170;
            // }
        }
        else {
            this._errorTF.text = "";
        }
    };
    ItemViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(this.getNetRequestConst()), this.useCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_CHANGENAME), this.useCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_CHANGEPIC), this.useCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHANGE_IMG, this.changeImgNotify, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICR_ITEM_COMPOUND, this.refreshItemsAfterCompound, this);
        this._selectedIndex = null;
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
        if (this._selectedNumTextF) {
            this._buttomContainer.removeChild(this._selectedNumTextF);
            this._selectedNumTextF.dispose();
            this._selectedNumTextF = null;
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
            this.removeChild(this._useBtn);
            this._useBtn.dispose();
            this._useBtn = null;
        }
        if (this._curItemScrollItem) {
            this._curItemScrollItem = null;
        }
        if (this._scrollList) {
            this.removeChild(this._scrollList);
            this._scrollList.dispose();
            this._scrollList = null;
        }
        if (this._errorTF) {
            this.removeChild(this._errorTF);
            this._errorTF.dispose();
            this._errorTF = null;
        }
        // if(this._bg4)
        // {
        // 	this._buttomContainer.removeChild(this._bg4);
        // 	this._bg4.dispose();
        // 	this._bg4 = null;
        // }
        this._bottomContent = null;
        if (this._buttomContainer) {
            this.removeChild(this._buttomContainer);
            this._buttomContainer.dispose();
            this._buttomContainer = null;
        }
        this._itemInfoVoList = null;
        this._lastUseNum = 0;
        this._border = null;
        _super.prototype.dispose.call(this);
    };
    return ItemViewTab1;
}(CommonViewTab));
__reflect(ItemViewTab1.prototype, "ItemViewTab1");
