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
 * 兑换商店
 * author yangchengguo
 * date 2019.8.20
 * @class AcSweetGiftRewardPopViewTab3
 */
var AcSweetGiftRewardPopViewTab3 = (function (_super) {
    __extends(AcSweetGiftRewardPopViewTab3, _super);
    function AcSweetGiftRewardPopViewTab3() {
        var _this = _super.call(this) || this;
        _this._gemTF = null;
        _this._scrollList = null;
        _this.initView();
        return _this;
    }
    AcSweetGiftRewardPopViewTab3.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETSHOP, this.requestCallback, this);
        this.height = 670;
        this.width = 520;
        var itembg = BaseBitmap.create("specialview_commoni_namebg");
        this.addChild(itembg);
        var needIconScale = 1;
        var itemGem = BaseBitmap.create("public_icon1");
        // itemGem.width = 100;
        // itemGem.height = 100;
        itemGem.setScale(needIconScale);
        this.addChild(itemGem);
        this._gemTF = ComponentManager.getTextField(String(Api.playerVoApi.getPlayerGem()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        itembg.width = itemGem.width * needIconScale + 20 + this._gemTF.width;
        itembg.setPosition(30 + 1 + this.width / 2 - itembg.width / 2, 70);
        itemGem.setPosition(itembg.x, itembg.y + itembg.height / 2 - itemGem.height / 2 * needIconScale);
        this._gemTF.setPosition(itemGem.x + itemGem.width * needIconScale, itembg.y + itembg.height / 2 - this._gemTF.height / 2);
        this.addChild(this._gemTF);
        var dataList = this.vo.getSortShopCfg();
        var rect = new egret.Rectangle(0, 0, 520, this.height - 35 - itembg.height - 10);
        var scrollList = ComponentManager.getScrollList(AcSweetGiftRewardTab3ScrollItem, dataList, rect, { aid: this.aid, code: this.code });
        scrollList.setPosition(30, 75 + itembg.height);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    };
    AcSweetGiftRewardPopViewTab3.prototype.requestCallback = function (event) {
        var rData = event.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rewards = rData.rewards;
        var rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
    };
    AcSweetGiftRewardPopViewTab3.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        var dataList = this.vo.getSortShopCfg();
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code });
        this._gemTF.text = String(Api.playerVoApi.getPlayerGem());
    };
    Object.defineProperty(AcSweetGiftRewardPopViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSweetGiftRewardPopViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcSweetGiftRewardPopViewTab3.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETSHOP, this.requestCallback, this);
        this._gemTF = null;
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcSweetGiftRewardPopViewTab3;
}(AcCommonViewTab));
__reflect(AcSweetGiftRewardPopViewTab3.prototype, "AcSweetGiftRewardPopViewTab3");
//# sourceMappingURL=AcSweetGiftRewardPopViewTab3.js.map