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
* 商店
* date 2020.6.15
* author ycg
* @name AcPowerFullDetailViewTab1
*/
var AcPowerFullDetailViewTab1 = /** @class */ (function (_super) {
    __extends(AcPowerFullDetailViewTab1, _super);
    function AcPowerFullDetailViewTab1(data) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._gemTf = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcPowerFullDetailViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcPowerFullDetailViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcPowerFullDetailViewTab1.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcPowerFullDetailViewTab1.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcPowerFullDetailViewTab1.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcPowerFullDetailViewTab1.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACPOWERFULL_SHOPBUY, this.requestCallback, this);
        var bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 695;
        bg.setPosition(26, 53);
        this.addChild(bg);
        var moneyBg = BaseBitmap.create("specialview_commoni_namebg");
        this.addChild(moneyBg);
        var needIconScale = 1;
        var gemIcon = BaseBitmap.create("public_icon1");
        gemIcon.setScale(needIconScale);
        this.addChild(gemIcon);
        this._gemTf = ComponentManager.getTextField(String(Api.playerVoApi.getPlayerGem()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        moneyBg.width = gemIcon.width * needIconScale + 40 + this._gemTf.width;
        moneyBg.setPosition(bg.x + bg.width / 2 - moneyBg.width / 2, bg.y + 6);
        gemIcon.setPosition(moneyBg.x + 15, moneyBg.y + moneyBg.height / 2 - gemIcon.height / 2 * needIconScale);
        this._gemTf.setPosition(gemIcon.x + gemIcon.width * needIconScale, moneyBg.y + moneyBg.height / 2 - this._gemTf.height / 2);
        this.addChild(this._gemTf);
        var dataList = this.cfg.getShopItemList();
        var rect = new egret.Rectangle(0, 0, 524, 645);
        var scrollList = ComponentManager.getScrollList(AcPowerFullDetailTab1ScrollItem, dataList, rect, { aid: this.aid, code: this.code });
        scrollList.setPosition(bg.x + 3, bg.y + 45);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    };
    AcPowerFullDetailViewTab1.prototype.requestCallback = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        var rData = evt.data.data.data;
        var rewards = rData.rewards;
        var rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
        }
    };
    AcPowerFullDetailViewTab1.prototype.refreshView = function () {
        var dataList = this.cfg.getShopItemList();
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code });
        this._gemTf.text = "" + Api.playerVoApi.getPlayerGem();
    };
    AcPowerFullDetailViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACPOWERFULL_SHOPBUY, this.requestCallback, this);
        this._scrollList = null;
        this._gemTf = null;
        _super.prototype.dispose.call(this);
    };
    return AcPowerFullDetailViewTab1;
}(CommonViewTab));
//# sourceMappingURL=AcPowerFullDetailViewTab1.js.map