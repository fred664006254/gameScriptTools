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
 * 	计策item相关
 * author 张朝阳
 * date 2018/11/19
 * @class CountryWarPlanItem
 */
var CountryWarPlanItem = (function (_super) {
    __extends(CountryWarPlanItem, _super);
    function CountryWarPlanItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._cityId = null;
        return _this;
    }
    CountryWarPlanItem.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        this._cityId = itemParam.cityId;
        this._data = data;
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 530;
        bg.height = 105;
        this.addChild(bg);
        var itemNum = Api.itemVoApi.getItemNumInfoVoById(data.item);
        var itemCfg = Config.ItemCfg.getItemCfgById(data.item);
        var itemDescTxt = ComponentManager.getTextField(itemCfg.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        itemDescTxt.width = 260;
        var num = Math.floor(itemDescTxt.height / itemDescTxt.size);
        if (num > 2) {
            var offNum = num - 2;
            bg.height += offNum * ((itemDescTxt.size + 3) * offNum);
        }
        itemDescTxt.lineSpacing = 3;
        var scaleValue = 0.75;
        var itemDB = itemCfg.getIconContainer();
        itemDB.setScale(scaleValue);
        itemDB.setPosition(bg.x + 20, bg.y + bg.height / 2 - itemDB.height * scaleValue / 2);
        this.addChild(itemDB);
        if (itemNum && itemNum > 0) {
            var numbg = BaseBitmap.create("public_9_itemnumbg");
            itemDB.addChild(numbg);
            var itemNumTxt = ComponentManager.getTextField(String(itemNum), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            itemDB.addChild(itemNumTxt);
            if (itemNum > 99) {
                numbg.width = itemNumTxt.width + 18;
            }
            numbg.name = "numbg";
            numbg.setPosition(68, 85);
            itemNumTxt.setPosition(numbg.x + 15, numbg.y);
            // itemNumTxt.setPosition(itemDB.x + itemDB.width * scaleValue - 6 - itemNumTxt.width, itemDB.y + itemDB.height * scaleValue - 6 - itemNumTxt.height);
        }
        var itemNameTxt = ComponentManager.getTextField(itemCfg.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        itemNameTxt.setPosition(itemDB.x + itemDB.width * scaleValue + 15, bg.y + 15);
        this.addChild(itemNameTxt);
        // let itemDescTxt = ComponentManager.getTextField(itemCfg.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        // itemDescTxt.width = 260;
        // itemDescTxt.lineSpacing = 3;
        itemDescTxt.setPosition(itemNameTxt.x, itemNameTxt.y + itemNameTxt.height + 5);
        this.addChild(itemDescTxt);
        var useBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "useBtn", function () {
            //使用计策
            if (Api.switchVoApi.checkOpenServerMaintain()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("mergeServerTip"));
                return;
            }
            var desc1 = LanguageManager.getlocal("countryWarPlanDesc1");
            var titleKey = "countryWarOrderUseTitle";
            ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARCONFIRMPOPUPVIEW, { type: 3, desc1: desc1, titleKey: titleKey, callbackHandle: _this.usePlanCallback, handle: _this });
        }, this);
        useBtn.setPosition(bg.x + bg.width - useBtn.width - 15, bg.y + bg.height / 2 - useBtn.height / 2);
        this.addChild(useBtn);
        var buyBtn = null;
        if (data.cost && itemNum <= 0) {
            //购买计策
            var playerNum_1 = Api.playerVoApi.getPlayerGem();
            buyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "", function () {
                if (Api.countryWarVoApi.isPlanLimit(_this._data.id, data.limit)) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("CountryWarPlanLimitTip"));
                    return;
                }
                ViewController.getInstance().openView(ViewConst.POPUP.COSTGEMBUYITEMSLIDERPOPUPVIEW, {
                    "confirmCallback": _this.buyPlanCallback,
                    "maxNum": data.limit,
                    "shopItemCost": data.cost,
                    "shopItemName": itemCfg.name,
                    "handler": _this,
                    "playerNum": playerNum_1,
                    "id": 1,
                });
                // NetManager.request(NetRequestConst.REQUEST_COUNTRYWAY_BUYSTRATAGEM,{straId:data.id});
            }, this);
            buyBtn.setPosition(useBtn.x + useBtn.width / 2 - buyBtn.width / 2, useBtn.y + useBtn.height / 2 - buyBtn.height / 2);
            buyBtn.setText(String(data.cost), false);
            buyBtn.addTextIcon("public_icon1");
            this.addChild(buyBtn);
        }
        var useBM = BaseBitmap.create("awused");
        useBM.setPosition(useBtn.x + useBtn.width / 2 - useBM.width / 2, useBtn.y + useBtn.height / 2 - useBM.height / 2);
        this.addChild(useBM);
        var servant = Api.countryWarVoApi.isCityHaveServant(Api.countryWarVoApi.getServerCityId(this._cityId));
        if (servant.stra && servant.stra == data.id) {
            useBM.setVisible(true);
            useBtn.setVisible(false);
            if (buyBtn) {
                buyBtn.setVisible(false);
            }
        }
        else {
            useBM.setVisible(false);
            if (itemNum <= 0) {
                if (buyBtn) {
                    buyBtn.setVisible(true);
                    useBtn.setVisible(false);
                }
                else {
                    useBtn.setVisible(true);
                    useBtn.setEnable(false);
                }
            }
            else {
                if (buyBtn) {
                    buyBtn.setVisible(false);
                }
                useBtn.setVisible(true);
            }
        }
    };
    /**
     * 使用计策回调
     */
    CountryWarPlanItem.prototype.usePlanCallback = function () {
        if (Api.switchVoApi.checkOpenServerMaintain()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("mergeServerTip"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_COUNTRYWAY_SELECTSTRATAGEM, { straId: this._data.id, city: Api.countryWarVoApi.getServerCityId(this._cityId) });
    };
    /**
     * 买计策回调
     */
    CountryWarPlanItem.prototype.buyPlanCallback = function () {
        NetManager.request(NetRequestConst.REQUEST_COUNTRYWAY_BUYSTRATAGEM, { straId: this._data.id });
    };
    CountryWarPlanItem.prototype.dispose = function () {
        this._data = null;
        this._cityId = null;
        _super.prototype.dispose.call(this);
    };
    return CountryWarPlanItem;
}(ScrollListItem));
__reflect(CountryWarPlanItem.prototype, "CountryWarPlanItem");
//# sourceMappingURL=CountryWarPlanItem.js.map