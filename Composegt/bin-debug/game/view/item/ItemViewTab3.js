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
        _this._selectedIndex = null;
        // 当前选中的itemvo
        _this._selectedItemInfoVo = null;
        // 道具选中框
        _this._selectedBg = null;
        // 当前选中道具名称文本
        _this._selectedNameTextF = null;
        // 道具icon
        _this._selectedIcon = null;
        // 头像框特效
        _this._headEffect = null;
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
        _this._detailBtn = null;
        _this._itemLv = null;
        _this._itemLvBg = null;
        /** 当前第几个页签 1委任状，2称号，3头像框，4头像 */
        _this.curGroup = 1;
        // 是否有头像
        _this.hasHead = false;
        _this.initView();
        return _this;
    }
    ItemViewTab3.prototype.getListType = function () {
        return 3;
    };
    ItemViewTab3.prototype.getNetRequestConst = function () {
        return NetRequestConst.REQUEST_ITEM_TITLE;
    };
    ItemViewTab3.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(this.getNetRequestConst()), this.useCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ITEM_CHANGEPORTRAIT), this.usePortraitCallback, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ITEM, this.refresh, this);
        this.curGroup = 1;
        this._itemInfoVoList = this.getList();
        this._selectedIndex = 0;
        this._selectedItemInfoVo = this._itemInfoVoList[0];
        // let bottom = BaseBitmap.create("public_daoju_bg01");
        // bottom.x = GameConfig.stageWidth/2 - bottom.width/2;
        // bottom.y = GameConfig.stageHeigth - 153 - bottom.height;   //bg1.height + 228 + 40;
        // this.addChild(bottom);
        // let dotbg = BaseBitmap.create("itemview_daoju_bg03");
        // dotbg.x = GameConfig.stageWidth / 2 - dotbg.width/2;
        // dotbg.y = GameConfig.stageHeigth - 153 - bottom.height - dotbg.height;
        // this.addChild(dotbg);
        // let flower = BaseBitmap.create("public_daoju_bg02");
        // flower.x = GameConfig.stageWidth - flower.width;
        // flower.y  = GameConfig.stageHeigth - 153 - bottom.height - dotbg.height;
        // this.addChild(flower);
        // let bg1:BaseBitmap = BaseBitmap.create("public_9v_bg02");
        // bg1.width = GameConfig.stageWidth;
        // bg1.x = 10;
        // bg1.height = GameConfig.stageHeigth - 153 - bottom.height - dotbg.height -228 ;//_bottomBgLeft.height ->228
        // bg1.name="bg1";
        // this.addChild(bg1);
        // let border = BaseBitmap.create("public_9v_bg03");
        // border.width = GameConfig.stageWidth;
        // border.height = bg1.height;
        // this.addChild(border);
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
        // this._buttomContainer.visible = false;
        var btnArr = ["itemsubtab1", "itemsubtab2", "itemsubtab3"];
        var btnNameArr = ["fashionBtn1", "fashionBtn2", "fashionBtn3"];
        var tabCount = 3;
        if (this.hasHead) {
            btnArr.push("itemsubtab4");
            btnNameArr.push("fashionBtn4");
            tabCount += 1;
        }
        this.tabbarGroup = ComponentManager.getTabBarGroup(btnArr, btnNameArr, this.clickTabbarHandler, this);
        this.tabbarGroup.setSpace(11);
        for (var i = 0; i < tabCount; i++) {
            var tabBar = this.tabbarGroup.getTabBar(i);
            tabBar.setTextOffX(20);
        }
        this.addChild(this.tabbarGroup);
        this.tabbarGroup.x = 22;
        // this.setTabBarPosition();
        // this.container.y = this.getTitleButtomY();
        // this.tabbarGroup.selectedIndex=this._selectedTabIndex;
        var rect = egret.Rectangle.create();
        // rect.setTo(0,0,640 - 30,bg1.height - 30 - this.tabbarGroup.height);
        rect.setTo(0, 0, 640 - 30, line.y - border.y - this.tabbarGroup.height);
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
            for (var i_1 = this._itemInfoVoList.length; i_1 < blankMaxNum; i_1++) {
                emptyItemInfoVo = new ItemInfoVo();
                emptyItemInfoVo.id = -1;
                blankList.push(emptyItemInfoVo);
            }
        }
        else {
            var maxLength = Math.ceil(this._itemInfoVoList.length / 5) * 5;
            for (var i_2 = this._itemInfoVoList.length; i_2 < maxLength; i_2++) {
                emptyItemInfoVo = new ItemInfoVo();
                emptyItemInfoVo.id = -1;
                blankList.push(emptyItemInfoVo);
            }
        }
        this._scrollList = ComponentManager.getScrollList(TitleScrollItem, this._itemInfoVoList.concat(blankList), rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(20, bg1.y + 10 + this.tabbarGroup.height);
        this._scrollList.addTouchTap(this.clickItemHandler, this);
        this._errorTF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._errorTF.x = bg1.x + bg1.width / 2 - this._errorTF.width / 2;
        this._errorTF.y = bg1.y + bg1.height / 2 - this._errorTF.height / 2;
        this.addChild(this._errorTF);
        this.initButtomContainer(border);
    };
    ItemViewTab3.prototype.showEmpriorMoreInfo = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.PALACEEMPERORMOREVIEW, { titleId: this._selectedItemInfoVo.id });
    };
    ItemViewTab3.prototype.initButtomContainer = function (bg1) {
        // this._buttomContainer = new BaseDisplayObjectContainer();
        // this._buttomContainer.y = bg1.y + bg1.height + 2;
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
            this._selectedNameTextF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x469b7b);
        }
        else {
            this._selectedNameTextF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, 0x469b7b);
        }
        this._buttomContainer.addChild(this._selectedNameTextF);
        // let bg5:BaseBitmap = BaseBitmap.create("public_9v_bg09");
        // bg5.x = 90;
        // bg5.y = this._bottomBgLeft.y + 55;
        // bg5.width = 500;
        // bg5.height = 133;
        // this._buttomContainer.addChild(bg5);
        var itemBg = BaseBitmap.create("itemview_daoju_bg02");
        itemBg.x = 10;
        itemBg.y = this._bottomContent.y + 20; //this._bottomBgLeft.height/2 - itemBg.height / 2;
        this._buttomContainer.addChild(itemBg);
        this._selectedIconBg = BaseBitmap.create(this._selectedItemInfoVo.iconBg);
        this._selectedIconBg.name = "_selectedIconBg";
        this._selectedIconBg.x = itemBg.x + itemBg.width / 2 - this._selectedIconBg.width / 2;
        this._selectedIconBg.y = itemBg.y + itemBg.height / 2 - this._selectedIconBg.height / 2;
        this._buttomContainer.addChild(this._selectedIconBg);
        this._selectedIcon = BaseLoadBitmap.create(this._selectedItemInfoVo.icon);
        this._selectedIcon.x = itemBg.x + itemBg.width / 2 - 50;
        this._selectedIcon.y = itemBg.y + itemBg.height / 2 - 50;
        this._buttomContainer.addChild(this._selectedIcon);
        this._selectedIcon.visible = false;
        if (PlatformManager.checkIsViSp()) {
            this._selectedDescTextF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        }
        else {
            this._selectedDescTextF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        }
        this._selectedDescTextF.lineSpacing = 5;
        this._selectedDescTextF.x = 230;
        // this._selectedDescTextF.stroke = 2;
        this._selectedDescTextF.width = 380;
        // this._selectedDescTextF.y = bg5.y + 20;
        this._selectedDescTextF.y = this._bottomContent.y + 70; //bg5.y + 30-20;
        this._buttomContainer.addChild(this._selectedDescTextF);
        if (PlatformManager.checkIsViSp()) {
            this._selectedDropTextF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        }
        else {
            this._selectedDropTextF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        }
        this._selectedDropTextF.x = 230;
        // this._selectedDropTextF.stroke = 2;
        this._selectedDropTextF.width = 380;
        this._selectedDropTextF.y = this._selectedDescTextF.y + this._selectedDescTextF.height + 10; //bg5.y + 95;
        this._buttomContainer.addChild(this._selectedDropTextF);
        this._useBtn = ComponentManager.getButton("btn_big_yellow2", "useBtn", this.clickUseBtnHandler, this);
        this._useBtn.setColor(0x6f2f00);
        this._useBtn.x = GameConfig.stageWidth / 2 - this._useBtn.width * this._useBtn.scaleX / 2;
        this._useBtn.y = GameConfig.stageHeigth - this._useBtn.height - 200; //160;		
        this.addChild(this._useBtn);
        this._useBtn.visible = false;
        if (Api.playerVoApi.getTitleid() != 0) {
            var titleIndex = Api.itemVoApi.getCurTitleIndex();
            this._curChooseScrollItem = this._scrollList.getItemByIndex(titleIndex);
        }
        this._itemLvBg = BaseBitmap.create("public_lvupbigbg");
        this._itemLvBg.x = this._selectedIconBg.x + this._selectedIconBg.width / 2 - this._itemLvBg.width / 2;
        this._itemLvBg.y = this._selectedIconBg.y + this._selectedIconBg.height - 3;
        this._buttomContainer.addChild(this._itemLvBg);
        this._itemLvBg.visible = false;
        this._itemLv = ComponentManager.getTextField(" ", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._itemLv.x = this._itemLvBg.x + this._itemLvBg.width / 2 - this._itemLv.width / 2;
        this._itemLv.y = this._itemLvBg.y + this._itemLvBg.height / 2 - this._itemLv.height / 2;
        this._buttomContainer.addChild(this._itemLv);
        this._itemLv.visible = false;
        this._detailBtn = ComponentManager.getButton("btn_lookdetail", null, this.clickDetailHandler, this);
        this._detailBtn.x = GameConfig.stageWidth - 25 - this._detailBtn.width;
        this._detailBtn.y = this._bottomContent.y + 20;
        this._buttomContainer.addChild(this._detailBtn);
        this._detailBtn.visible = false;
        this.updateItem(this._selectedIndex);
    };
    ItemViewTab3.prototype.clickItemHandler = function (event) {
        var index = Number(event.data);
        this.updateItem(index);
    };
    ItemViewTab3.prototype.clickDetailHandler = function (event) {
        var titlecfg = Config.TitleCfg.getTitleCfgById(this._selectedItemInfoVo.id);
        if (titlecfg && titlecfg.emperorLvUpNeed && titlecfg.emperorLvUpNeed.length > 0) {
            ViewController.getInstance().openView(ViewConst.COMMON.PALACEEMPERORMOREVIEW, { titleId: this._selectedItemInfoVo.id });
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.TITLELEVELDETAILPOPUPVIEW, { info: this._selectedItemInfoVo });
        }
        // ViewController.getInstance().openView(ViewConst.COMMON.TITLELEVELUPVIEW,{titleId:this._selectedItemInfoVo.id,lv:2});
    };
    ItemViewTab3.prototype.refreshWhenSwitchBack = function () {
        this._itemInfoVoList = this.getList();
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
        if (index >= this._itemInfoVoList.length) {
            return;
        }
        this._buttomContainer.visible = true;
        if (this._selectedBg == null) {
            this._selectedBg = BaseBitmap.create("itembg_selected");
            this._selectedBg.x = -3;
            this._selectedBg.y = -3;
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
        this._selectedNameTextF.setColor(this._selectedItemInfoVo.qualityColor);
        this._selectedDescTextF.text = LanguageManager.getlocal("effectTitle") + this._selectedItemInfoVo.desc;
        this._selectedDropTextF.text = LanguageManager.getlocal("dropTitle") + this._selectedItemInfoVo.dropDesc;
        this._selectedDropTextF.y = this._selectedDescTextF.y + this._selectedDescTextF.height + 10;
        // this._useBtn.visible = (this._selectedItemInfoVo.isShowUseBtn && this._selectedItemInfoVo.num > 0 && this._selectedItemInfoVo.id != Api.playerVoApi.getTitleid());
        if (this._selectedItemInfoVo.num == 0) {
            this._useBtn.setText("useBtn");
        }
        else if (this._selectedItemInfoVo.num == 1) {
            this._useBtn.setText("titleEquip");
        }
        else if (this._selectedItemInfoVo.num == 2) {
            this._useBtn.setText("titleDisboard");
        }
        if (this._selectedItemInfoVo.itemCfg.group == 4) {
            // 头像
            // this._useBtn.visible = Api.playerVoApi.getPlayePicId() != this._selectedItemInfoVo.id;
            this._useBtn.visible = true;
            if (Api.playerVoApi.getPlayePicId() != this._selectedItemInfoVo.id) {
                this._useBtn.setText("titleEquip");
            }
            else {
                this._useBtn.setText("titleDisboard");
            }
        }
        else {
            this._useBtn.visible = (this._selectedItemInfoVo.num == 0 || this._selectedItemInfoVo.num == 1 || this._selectedItemInfoVo.num == 2);
        }
        //  if(this._selectedItemInfoVo.id == 4001){
        // 	this._useBtn.visible = false;
        //  }
        this._selectedIconBg.visible = true;
        this._selectedIconBg.texture = ResourceManager.getRes(this._selectedItemInfoVo.iconBg);
        this._selectedIcon.visible = true;
        this._selectedIcon.setload(this._selectedItemInfoVo.icon);
        if (this._selectedItemInfoVo.icon.indexOf("user_head") > -1) {
            this._selectedIcon.setScale(0.7);
        }
        else {
            this._selectedIcon.setScale(1);
        }
        if (this._selectedItemInfoVo.icon == "itemicon4111") {
            if (!this._headEffect) {
                var headEffect = ComponentManager.getCustomMovieClip("ryeharvestheadeffect1-", 14, 70);
                headEffect.playWithTime(0);
                headEffect.x = this._selectedIcon.x + 100 * this._selectedIcon.scaleX / 2 - 150 / 2 + 2;
                headEffect.y = this._selectedIcon.y + 100 * this._selectedIcon.scaleY / 2 - 145 / 2;
                this._buttomContainer.addChild(headEffect);
                this._headEffect = headEffect;
            }
            this._headEffect.visible = true;
        }
        else if (this._headEffect) {
            this._headEffect.visible = false;
        }
        this._selectedNameTextF.x = 230; //GameConfig.stageWidth / 2 - this._selectedNameTextF.width/2 + 70;
        this._selectedNameTextF.y = this._bottomContent.y + 33; //this._bottomBgLeft.y + 28;
        if (Api.switchVoApi.checkOpenTitleLv() && this._selectedItemInfoVo.isLvUp == 1) {
            this._detailBtn.visible = true;
            if (this._selectedItemInfoVo.num == -1) {
                // this._detailBtn.setEnable(false);
                this._detailBtn.visible = false;
            }
            else {
                this._detailBtn.setEnable(true);
            }
            var itemCfg = this._selectedItemInfoVo.itemCfg;
            if (itemCfg.emperorLvUpNeed && itemCfg.emperorLvUpNeed.length > 0 && this._selectedItemInfoVo.tnum > 0) {
                this._detailBtn.setEnable(true);
                this._itemLv.visible = true;
                this._itemLvBg.visible = true;
            }
            else {
                this._itemLv.visible = false;
                this._itemLvBg.visible = false;
            }
            this._itemLv.text = "Lv." + String(this._selectedItemInfoVo.lv);
            this._itemLv.x = this._itemLvBg.x + this._itemLvBg.width / 2 - this._itemLv.width / 2;
            this._itemLv.y = this._itemLvBg.y + this._itemLvBg.height / 2 - this._itemLv.height / 2;
        }
        else {
            this._detailBtn.visible = false;
            this._itemLv.visible = false;
            this._itemLvBg.visible = false;
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
        if (this._selectedItemInfoVo.num == 2) {
            var dtype = this.curGroup;
            if (dtype > 1) {
                dtype = dtype - 1;
            }
            var data = { "titleid": itemVo.id, dtype: dtype };
            NetManager.request(NetRequestConst.REQUEST_ITEM_UNSET, data);
            App.CommonUtil.showTip(LanguageManager.getlocal("unsetSuccess"));
            return;
        }
        if (itemVo.itemCfg.group == 4) {
            // 头像
            // console.log("head");
            if (Api.playerVoApi.getPlayePicId() != this._selectedItemInfoVo.id) {
                var data = { "pic": itemVo.id };
                NetManager.request(NetRequestConst.REQUEST_ITEM_CHANGEPORTRAIT, data);
            }
            else {
                var data = { "titleid": itemVo.id, dtype: 3 };
                NetManager.request(NetRequestConst.REQUEST_ITEM_UNSET, data);
                App.CommonUtil.showTip(LanguageManager.getlocal("unsetSuccess"));
            }
        }
        else {
            var data = { "titleid": itemVo.id, "status": itemVo.num + 1 };
            NetManager.request(this.getNetRequestConst(), data);
        }
    };
    // 刷新道具数量
    ItemViewTab3.prototype.useCallback = function (event) {
        var rdata = event.data.data.data;
        if (rdata && rdata.rewards) {
            var rewardList = GameData.formatRewardItem(rdata.rewards);
            App.CommonUtil.playRewardFlyAction(rewardList);
        }
        if (Api.playerVoApi.getTitleid() != 0) {
            if (this._curChooseScrollItem) {
                this._curChooseScrollItem.update();
            }
            var titleIndex = Api.itemVoApi.getCurTitleIndex();
            this._curChooseScrollItem = this._scrollList.getItemByIndex(titleIndex);
        }
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
        else {
            this._itemInfoVoList = Api.itemVoApi.getTitleVoListByType(1);
            if (this._curTitleScrollItem && this._curTitleScrollItem.contains(this._selectedBg)) {
                this._curTitleScrollItem.removeChild(this._selectedBg);
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
            this._selectedItemInfoVo = this._itemInfoVoList[this._selectedIndex];
        }
        this.updateItem(this._selectedIndex);
    };
    ItemViewTab3.prototype.getList = function () {
        var list = Api.itemVoApi.getTitleVoListByType(this.getListType());
        var retList = [];
        for (var index = 0; index < list.length; index++) {
            var element = list[index];
            if (element.itemCfg.group == this.curGroup) {
                retList.push(element);
            }
            if (element.itemCfg.group == 4) {
                this.hasHead = true; // 有头像
            }
        }
        return retList;
    };
    ItemViewTab3.prototype.clickTabbarHandler = function (data) {
        App.LogUtil.log("index: " + data.index);
        this.curGroup = data.index + 1;
        this.refresh();
        this._scrollList.setScrollTop(0);
    };
    ItemViewTab3.prototype.usePortraitCallback = function (event) {
        if (event.data.data.ret == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("equipSuccess"));
        }
        this.refresh();
    };
    ItemViewTab3.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(this.getNetRequestConst()), this.useCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ITEM_CHANGEPORTRAIT), this.usePortraitCallback, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ITEM, this.refresh, this);
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
        if (this._curTitleScrollItem) {
            this._curTitleScrollItem = null;
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
        this._bottomContent = null;
        if (this._buttomContainer) {
            this.removeChild(this._buttomContainer);
            this._buttomContainer.dispose();
            this._buttomContainer = null;
        }
        this._itemInfoVoList = null;
        this._curChooseScrollItem = null;
        this._detailBtn = null;
        this._itemLv = null;
        this._itemLvBg = null;
        this.curGroup = 1;
        this._headEffect = null;
        _super.prototype.dispose.call(this);
    };
    return ItemViewTab3;
}(CommonViewTab));
__reflect(ItemViewTab3.prototype, "ItemViewTab3");
