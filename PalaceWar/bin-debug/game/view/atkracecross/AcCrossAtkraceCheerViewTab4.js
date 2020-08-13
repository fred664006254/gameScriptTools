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
//人气商店
var AcCrossAtkraceCheerViewTab4 = /** @class */ (function (_super) {
    __extends(AcCrossAtkraceCheerViewTab4, _super);
    function AcCrossAtkraceCheerViewTab4(data) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._scoreNum = null;
        _this._timeDown = null;
        _this._info1 = null;
        _this._info2 = null;
        _this._scoreNum1 = null;
        _this._scoreIcon1 = null;
        _this._scoreIcon2 = null;
        _this._index = -1;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcCrossAtkraceCheerViewTab4.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "7";
                break;
        }
        return code;
    };
    Object.defineProperty(AcCrossAtkraceCheerViewTab4.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossAtkraceCheerViewTab4.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossAtkraceCheerViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossAtkraceCheerViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossAtkraceCheerViewTab4.prototype.initView = function () {
        var baseView = ViewController.getInstance().getView("AcCrossAtkraceCheerView");
        this.height = baseView.tabHeight;
        this.width = GameConfig.stageWidth;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_ATKRACEG_SHOPBUY, this.refreshData, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_ATKRACEG_SHOP2EXCHANGE, this.refreshData, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this.initTabbarGroup();
        var moveY = 70;
        var code = this.getUiCode();
        var infoBg = BaseBitmap.create(App.CommonUtil.getResByCode("accrosspower_juanzhou", code));
        this.addChild(infoBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, infoBg, this, [0, 5 + moveY], true);
        //积分
        var scoreNumBg = BaseBitmap.create("public_9_resbg");
        this.addChild(scoreNumBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scoreNumBg, infoBg, [0, 15]);
        var scoreIcon = BaseBitmap.create(App.CommonUtil.getResByCode("accrosspower_flagicon", this.getUiCode()));
        scoreIcon.setScale(1);
        this.addChild(scoreIcon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, scoreIcon, scoreNumBg, [-3, 0]);
        this._scoreIcon2 = scoreIcon;
        var scoreNum = ComponentManager.getTextField("" + this.vo.getFlagScore(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreNum.x = scoreNumBg.x + 55;
        scoreNum.y = scoreNumBg.y + scoreNumBg.height / 2 - scoreNum.height / 2 + 3;
        this.addChild(scoreNum);
        this._scoreNum = scoreNum;
        var needId = this.cfg.change.needNum.split("_")[1];
        var have = Api.itemVoApi.getItemNumInfoVoById(needId);
        var scoreIcon1 = BaseLoadBitmap.create("itemicon" + needId);
        scoreIcon1.setScale(0.5);
        this.addChild(scoreIcon1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, scoreIcon1, scoreNumBg, [-3, -3]);
        this._scoreIcon1 = scoreIcon1;
        var scoreNum1 = ComponentManager.getTextField("" + have, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreNum1.x = scoreNumBg.x + 55;
        scoreNum1.y = scoreNumBg.y + scoreNumBg.height / 2 - scoreNum1.height / 2 + 3;
        this.addChild(scoreNum1);
        this._scoreNum1 = scoreNum1;
        //描述
        var infoStr = "acCrossserverPowerCheerScoreShopInfo1";
        if (this.vo.checkIsInEndShowTime()) {
            infoStr = "acCrossserverPowerCheerScoreShopInfo2";
        }
        var info = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(infoStr, this.getUiCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        info.textAlign = TextFieldConst.ALIGH_CENTER;
        if (!this.vo.checkIsInEndShowTime()) {
            info.textAlign = TextFieldConst.ALIGH_LEFT;
        }
        info.width = infoBg.width - 56;
        info.lineSpacing = 5;
        info.anchorOffsetX = info.width / 2;
        info.x = infoBg.x + infoBg.width / 2;
        info.y = scoreNumBg.y + scoreNumBg.height + 10;
        this.addChild(info);
        this._info2 = info;
        this._info1 = ComponentManager.getTextField(LanguageManager.getlocal("croessServerAtkraceExchangeTxt"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        if (this._info1.numLines > 1) {
            this._info1.textAlign = TextFieldConst.ALIGH_LEFT;
        }
        else {
            this._info1.textAlign = TextFieldConst.ALIGH_CENTER;
        }
        this._info1.setPosition(GameConfig.stageWidth / 2 - this._info1.width / 2, info.y);
        this.addChild(this._info1);
        if (this.vo.checkIsInEndShowTime()) {
            var timeDown = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerCheerScoreShopTimeDown", this.getUiCode()), ["" + this.vo.getEndTimeDown()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            timeDown.anchorOffsetX = timeDown.width / 2;
            timeDown.x = infoBg.x + infoBg.width / 2;
            timeDown.y = info.y + info.height + 10;
            this.addChild(timeDown);
            this._timeDown = timeDown;
            TickManager.addTick(this.tick, this);
        }
        var tmpRect = new egret.Rectangle(0, 0, 612, this.height - infoBg.y - infoBg.height - 10);
        var scrollList = ComponentManager.getScrollList(AcCrossAtkraceCheerViewScrollItem4, [], tmpRect, { aid: this.aid, code: this.code });
        scrollList.x = GameConfig.stageWidth / 2 - scrollList.width / 2;
        scrollList.y = infoBg.y + infoBg.height + 5;
        this.addChild(scrollList);
        this._scrollList = scrollList;
        this.tabbarHandler(0);
        this.checkRed();
    };
    AcCrossAtkraceCheerViewTab4.prototype.tick = function () {
        if (this._timeDown) {
            this._timeDown.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerCheerScoreShopTimeDown", this.getUiCode()), ["" + this.vo.getEndTimeDown()]);
            this._timeDown.anchorOffsetX = this._timeDown.width / 2;
        }
        if (this.vo.checkIsAtEndShowTime()) {
            this.freshList();
        }
    };
    AcCrossAtkraceCheerViewTab4.prototype.refreshData = function (event) {
        if (event) {
            if (event.data && event.data.ret) {
                var data = event.data.data.data;
                var rewards = data.rewards;
                var rList = GameData.formatRewardItem(rewards);
                App.CommonUtil.playRewardFlyAction(rList);
            }
        }
        this.checkRed();
    };
    AcCrossAtkraceCheerViewTab4.prototype.checkRed = function () {
        if (this.vo.checkShopRedDot()) {
            this.tabbarGroup.addRedPoint(1);
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
    };
    AcCrossAtkraceCheerViewTab4.prototype.refreshView = function () {
        this.freshList();
        this._scoreNum.text = "" + this.vo.getFlagScore();
        var needId = this.cfg.change.needNum.split("_")[1];
        var have = Api.itemVoApi.getItemNumInfoVoById(needId);
        this._scoreNum1.text = "" + have;
    };
    AcCrossAtkraceCheerViewTab4.prototype.formatFlagScoreShopCfg = function () {
        var data = this.cfg.getShopList();
        var list = [];
        for (var i = 0; i < data.length; i++) {
            var itemArr = GameData.formatRewardItem(data[i].sell);
            if (itemArr.length > 0) {
                list.push(data[i]);
            }
        }
        return list;
    };
    AcCrossAtkraceCheerViewTab4.prototype.formatFlagScoreShop2Cfg = function () {
        var data = this.cfg.getShop2List();
        var list = [];
        for (var i = 0; i < data.length; i++) {
            var itemArr = GameData.formatRewardItem(data[i].sell);
            if (itemArr.length > 0) {
                list.push(data[i]);
            }
        }
        return list;
    };
    AcCrossAtkraceCheerViewTab4.prototype.getTabbarTextArr = function () {
        return ["croessServerAtkraceTab1", "croessServerAtkraceTab2"];
    };
    AcCrossAtkraceCheerViewTab4.prototype.initTabbarGroup = function () {
        var tabBarTextArr = this.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            var tabbg = BaseBitmap.create("commonview_tabbar_bg");
            tabbg.x = 10;
            tabbg.y = 10;
            this.addChild(tabbg);
            this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(), tabBarTextArr, this.clickTabbarHandler, this);
            this.tabbarGroup.setSpace(0);
            this.addChild(this.tabbarGroup);
            this.setTabBarPosition();
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
            this.tabbarGroup.y = 0;
            this.tabbarGroup.x = (this.width - this.tabbarGroup.width) / 2;
            this.tabbarGroup.setColor(0xe1ba86, 0x472c26);
            this.tabbarGroup.addZshi();
        }
    };
    AcCrossAtkraceCheerViewTab4.prototype.clickTabbarHandler = function (data) {
        _super.prototype.clickTabbarHandler.call(this, data);
        var index = Number(data.index);
        this.tabbarHandler(index);
    };
    AcCrossAtkraceCheerViewTab4.prototype.tabbarHandler = function (index) {
        if (this._index == index) {
            return;
        }
        this._index = index;
        if (index == 0) {
            this._info1.visible = true;
            this._info2.visible = false;
            this._scoreIcon1.visible = true;
            this._scoreIcon2.visible = false;
            this._scoreNum1.visible = true;
            this._scoreNum.visible = false;
            this.freshList();
        }
        else {
            this._info1.visible = false;
            this._info2.visible = true;
            this._scoreIcon1.visible = false;
            this._scoreIcon2.visible = true;
            this._scoreNum1.visible = false;
            this._scoreNum.visible = true;
            this.freshList();
        }
    };
    AcCrossAtkraceCheerViewTab4.prototype.freshList = function () {
        if (this._index == 0) {
            var shopList = this.formatFlagScoreShop2Cfg();
            this._scrollList.refreshData(shopList, { aid: this.aid, code: this.code });
        }
        else {
            var shopList = this.formatFlagScoreShopCfg();
            this._scrollList.refreshData(shopList, { aid: this.aid, code: this.code });
        }
    };
    AcCrossAtkraceCheerViewTab4.prototype.addTabbarGroupBg = function () {
        return true;
    };
    AcCrossAtkraceCheerViewTab4.prototype.getTabbarName = function () {
        return ButtonConst.BTN_BIG_TAB2;
    };
    AcCrossAtkraceCheerViewTab4.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_ATKRACEG_SHOPBUY, this.refreshData, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_ATKRACEG_SHOP2EXCHANGE, this.refreshData, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        TickManager.removeTick(this.tick, this);
        this._scrollList = null;
        this._scoreNum = null;
        this._timeDown = null;
        this._scoreNum1 = null;
        this._scoreIcon1 = null;
        this._scoreIcon2 = null;
        this._info1 = null;
        this._info2 = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossAtkraceCheerViewTab4;
}(CommonViewTab));
//# sourceMappingURL=AcCrossAtkraceCheerViewTab4.js.map