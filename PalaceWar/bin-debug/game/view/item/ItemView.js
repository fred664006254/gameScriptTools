/**
 * 道具
 * author dmj
 * date 2017/9/22
 * @class ItemView
 */
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
var ItemView = (function (_super) {
    __extends(ItemView, _super);
    function ItemView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(ItemView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    ItemView.prototype.getBigFrame = function () {
        return "commonview_bigframe";
    };
    ItemView.prototype.initTabbarGroup = function () {
        var tabbg = BaseBitmap.create("commonview_tabbar_bg");
        tabbg.x = 10;
        tabbg.y = 94;
        this.addChild(tabbg);
        var tabBarTextArr = this.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            if (this.addTabbarGroupBg()) {
                var bg = BaseBitmap.create("commonview_tabbar_bg");
                this.addChild(bg);
                this.tabbarGroupBg = bg;
            }
            this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(), tabBarTextArr, this.clickTabbarHandler, this);
            var tabBarX = (this instanceof PopupView) ? 30 : 15;
            this.addChild(this.tabbarGroup);
            this.setTabBarPosition();
            this.container.y = this.getTitleButtomY();
            if (this.uiType == "2") {
                this.tabbarGroup.setSpace(0);
                this.tabbarGroup.x += 5;
                this.tabbarGroup.setColor(0xe1ba86, 0x472c26);
                this.setBigFameY(0);
            }
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
        }
        this.tabbarGroup.y = this.titleBg.y + this.titleBg.height + 10 - 14;
        this.container.y = this.getTitleButtomY();
        if (this.getTabbarName() == ButtonConst.BTN2_TAB || this.getTabbarName() == ButtonConst.BTN_BIG_TAB2) {
            this.tabbarGroup.addZshi();
        }
    };
    ItemView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ITEM_DOCOMPOSE, this.checkRedPoint, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ITEM_GETCOMPOSE, this.checkRedPoint, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM), this.checkRedPoint, this);
        this.checkRedPoint();
        this.bigframe.height = GameConfig.stageHeigth - this.container.y + 60;
        this.bigframe.y = -60;
        // NetManager.request(NetRequestConst.REQUEST_ITEM_GETMODEL,{});
    };
    ItemView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ITEM_GETMODEL, requestData: {} };
    };
    // protected getRuleInfo():string
    // {
    // 	return "itemRuleInfo";
    // }
    ItemView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "itemtab_bg", "itemtab_arrow1", "itemtab_arrow2",
            "common_shopmark", "recharge_fnt", "titlelv_fnt",
            "commonview_tabbar_bg", "commonview_screen", "commonview_itembg", "commonview_bottom_bar",
            "commonview_bigframe", "commonview_smalltitlebg", "acchristmasview_smalldescbg",
        ]);
    };
    ItemView.prototype.getTabbarTextArr = function () {
        return ["itemBtn", "composeBtn",
            "fashionBtn", "dressBtn",
        ];
    };
    ItemView.prototype.hide = function () {
        _super.prototype.hide.call(this);
        Api.rookieVoApi.checkNextStep();
    };
    ItemView.prototype.checkRedPoint = function () {
        if (Api.itemVoApi.checkRedPoint()) {
            this.tabbarGroup.addRedPoint(1);
            this.tabbarGroup.setRedPos(1, 120, 0);
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
    };
    ItemView.prototype.switchToTop = function (data) {
        if (data && data.tab) {
            if (!this.param) {
                this.param = {};
            }
            this.param.data = data.data;
            this.tabbarGroup.selectedIndex = Number(data.tab);
            this.clickTabbarHandler({ index: data.tab });
        }
        _super.prototype.switchToTop.call(this);
    };
    ItemView.prototype.changeTab = function () {
        _super.prototype.changeTab.call(this);
        this.param = null;
    };
    ItemView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ITEM_DOCOMPOSE, this.checkRedPoint, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ITEM_GETCOMPOSE, this.checkRedPoint, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM), this.checkRedPoint, this);
        _super.prototype.dispose.call(this);
    };
    // 大于等于5时，需要弹2次确认板
    ItemView.MAX_NUM = 5;
    return ItemView;
}(CommonView));
__reflect(ItemView.prototype, "ItemView");
//# sourceMappingURL=ItemView.js.map