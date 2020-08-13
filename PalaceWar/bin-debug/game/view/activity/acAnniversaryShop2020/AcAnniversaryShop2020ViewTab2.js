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
 * 超值礼包 tab2
 * date 2019.11.28
 * author ycg
 * @class AcAnniversaryShop2020ViewTab2
 */
var AcAnniversaryShop2020ViewTab2 = (function (_super) {
    __extends(AcAnniversaryShop2020ViewTab2, _super);
    function AcAnniversaryShop2020ViewTab2() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.initView();
        return _this;
    }
    AcAnniversaryShop2020ViewTab2.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        var parentView = ViewController.getInstance().getView("AcAnniversaryShop2020View");
        this.width = GameConfig.stageWidth;
        this.height = parentView.getTabViewHeight();
        var bgStr = ResourceManager.hasRes("anniversaryshop_siglegfit_bottombg-" + this.getTypeCode()) ? "anniversaryshop_siglegfit_bottombg-" + this.getTypeCode() : "anniversaryshop_siglegfit_bottombg-1";
        var bg = BaseBitmap.create(bgStr);
        bg.width = this.width;
        bg.height = this.height - 10;
        this.addChild(bg);
        var dataList = this.cfg.shop2DataList;
        App.LogUtil.log("datalist.lenth:" + dataList.length + "this.height: " + this.height);
        var rect = new egret.Rectangle(0, 0, this.width - 12, this.height - 35);
        var scrollList = ComponentManager.getScrollList(AcAnniversaryShop2020Tab2ScrollItem, dataList, rect, { aid: this.aid, code: this.code, dataLength: dataList.length - 1 });
        scrollList.setPosition(6, 10);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        var itemCfg = Config.ItemCfg.getItemCfgById(this.cfg.itemId);
        var icon = BaseLoadBitmap.create(itemCfg.icon);
        icon.width = 100;
        icon.height = 100;
        // icon.setPosition(itemNum.x - icon.width, itemNumBg.y + itemNumBg.height/2 - icon.height/2);
        icon.setPosition(this.width - icon.width - 20, this.height - 120);
        icon.name = "icon";
        this.addChild(icon);
        var itemNumBg = BaseBitmap.create("public_9_bg80");
        this.addChild(itemNumBg);
        itemNumBg.name = "itemNumBg";
        var currNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.itemId);
        var itemNum = ComponentManager.getTextField("" + currNum, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        itemNumBg.width = itemNum.width + 40 > itemNumBg.width ? itemNum.width + 40 : itemNumBg.width;
        itemNumBg.setPosition(icon.x + icon.width / 2 - itemNumBg.width / 2, icon.y + icon.height - itemNumBg.height + 15);
        itemNum.setPosition(itemNumBg.x + itemNumBg.width / 2 - itemNum.width / 2, itemNumBg.y + itemNumBg.height / 2 - itemNum.height / 2);
        this.addChild(itemNum);
        itemNum.name = "itemNum";
    };
    AcAnniversaryShop2020ViewTab2.prototype.getTypeCode = function () {
        return this.code;
    };
    AcAnniversaryShop2020ViewTab2.prototype.refreshView = function () {
        if (this._scrollList) {
            var data = this.cfg.shop2DataList;
            this._scrollList.refreshData(data, { aid: this.aid, code: this.code, dataLength: data.length - 1 });
            this.freshItemInfo();
        }
    };
    AcAnniversaryShop2020ViewTab2.prototype.freshItemInfo = function () {
        var icon = this.getChildByName("icon");
        var itemNumBg = this.getChildByName("itemNumBg");
        var itemNum = this.getChildByName("itemNum");
        var currNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.itemId);
        // itemNum.text = LanguageManager.getlocal("acAnniversaryShop2020_price-"+this.getTypeCode(), [""+currNum]);
        itemNum.text = "" + currNum;
        itemNumBg.width = itemNum.width + 40 > itemNumBg.width ? itemNum.width + 40 : itemNumBg.width;
        itemNumBg.setPosition(icon.x + icon.width / 2 - itemNumBg.width / 2, icon.y + icon.height - itemNumBg.height + 15);
        itemNum.setPosition(itemNumBg.x + itemNumBg.width / 2 - itemNum.width / 2, itemNumBg.y + itemNumBg.height / 2 - itemNum.height / 2);
    };
    Object.defineProperty(AcAnniversaryShop2020ViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnniversaryShop2020ViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcAnniversaryShop2020ViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcAnniversaryShop2020ViewTab2;
}(AcCommonViewTab));
__reflect(AcAnniversaryShop2020ViewTab2.prototype, "AcAnniversaryShop2020ViewTab2");
//# sourceMappingURL=AcAnniversaryShop2020ViewTab2.js.map