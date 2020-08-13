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
 * author wxz
 * date 2020.6.15
 * @class AcAskGodSkinRewardPopView
 */
var AcAskGodSkinRewardPopView = /** @class */ (function (_super) {
    __extends(AcAskGodSkinRewardPopView, _super);
    function AcAskGodSkinRewardPopView(data) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._numTxt = null;
        return _this;
    }
    AcAskGodSkinRewardPopView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACASKGOD_SHOPEXCHANGE, this.changeHandle, this);
        var itembg = BaseBitmap.create("acaskgod_numbg2");
        itembg.setPosition(GameConfig.stageWidth / 2 - itembg.width / 2, 10);
        this.addChildToContainer(itembg);
        var dataList = this.cfg.getShopList();
        var icon = BaseBitmap.create("itemicon" + dataList[0].needItem);
        icon.setScale(0.45);
        icon.x = GameConfig.stageWidth / 2 - 40;
        icon.y = itembg.y + itembg.height / 2 - icon.height * icon.scaleY / 2;
        this.addChildToContainer(icon);
        var have = Api.itemVoApi.getItemNumInfoVoById(dataList[0].needItem);
        var numTxt = ComponentManager.getTextField(String(have), 20, TextFieldConst.COLOR_WHITE);
        numTxt.x = icon.x + icon.width * icon.scaleX + 5;
        numTxt.y = itembg.y + itembg.height / 2 - numTxt.height / 2;
        this.addChildToContainer(numTxt);
        this._numTxt = numTxt;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 650;
        bg.setPosition(55, itembg.y + itembg.height + 10);
        this.addChildToContainer(bg);
        var rect = new egret.Rectangle(0, 0, 520, 640);
        var scrollList = ComponentManager.getScrollList(AcAskGodSkinRewardScrollItem, dataList, rect, { aid: this.aid, code: this.code });
        scrollList.setPosition(60, bg.y + 5);
        this.addChildToContainer(scrollList);
        this._scrollList = scrollList;
        // this.freshView();
    };
    AcAskGodSkinRewardPopView.prototype.freshView = function () {
        var dataList = this.cfg.getShopList();
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code });
        var have = Api.itemVoApi.getItemNumInfoVoById(dataList[0].needItem);
        this._numTxt.text = String(have);
    };
    AcAskGodSkinRewardPopView.prototype.changeHandle = function (event) {
        if (!event.data.ret) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rdata = event.data.data.data;
        var replacerewards = rdata.replacerewards;
        if (replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
        }
        if (rdata.rewards) {
            var rewardVoList = GameData.formatRewardItem(rdata.rewards);
            App.CommonUtil.playRewardFlyAction(rewardVoList);
        }
        this.freshView();
    };
    Object.defineProperty(AcAskGodSkinRewardPopView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcAskGodSkinRewardPopView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    Object.defineProperty(AcAskGodSkinRewardPopView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAskGodSkinRewardPopView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAskGodSkinRewardPopView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcAskGodSkinRewardPopView.prototype.getShowHeight = function () {
        return 800;
    };
    AcAskGodSkinRewardPopView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.container.x = 0;
    };
    AcAskGodSkinRewardPopView.prototype.getTitleStr = function () {
        return "acAskGodExchangeTitle-" + this.getTypeCode();
    };
    AcAskGodSkinRewardPopView.prototype.getResourceList = function () {
        var arr = [];
        var dataList = this.cfg.getShopList();
        for (var i = 0; i < dataList.length; i++) {
            var type = parseInt(dataList[i].getReward.split("_")[0]);
            var id = parseInt(dataList[i].getReward.split("_")[1]);
            if (type == 6) {
                var itemCfg = Config.ItemCfg.getItemCfgById(id);
                var getStr = itemCfg.getRewards;
                if (getStr && getStr.split("_")[0] == "19") {
                    var itemSerCfg = Config.ServantskinCfg.getServantSkinItemById(getStr.split("_")[1]);
                    arr.push(itemSerCfg.body);
                }
                else {
                    arr.push(itemCfg.icon);
                }
            }
            else if (type == 11) {
                var itemCfg = Config.TitleCfg.getTitleCfgById(id);
                arr.push(itemCfg.icon);
            }
            else if (type == 16) {
                var itemCfg = Config.WifeskinCfg.getWifeCfgById(id);
                arr.push(itemCfg.body);
            }
            else if (type == 19) {
                var itemCfg = Config.ServantskinCfg.getServantSkinItemById(id);
                arr.push(itemCfg.body);
            }
            if (arr.indexOf("itemicon" + dataList[i].needItem) < 0) {
                arr.push("itemicon" + dataList[i].needItem);
            }
        }
        return _super.prototype.getResourceList.call(this).concat(arr).concat(["servant_info_detail"]);
        ;
    };
    AcAskGodSkinRewardPopView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACASKGOD_SHOPEXCHANGE, this.changeHandle, this);
    };
    return AcAskGodSkinRewardPopView;
}(PopupView));
//# sourceMappingURL=AcAskGodSkinRewardPopView.js.map