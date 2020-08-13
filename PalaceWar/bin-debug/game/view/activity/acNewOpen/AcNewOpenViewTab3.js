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
var AcNewOpenViewTab3 = (function (_super) {
    __extends(AcNewOpenViewTab3, _super);
    function AcNewOpenViewTab3() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._numTxt = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcNewOpenViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewOpenViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewOpenViewTab3.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcNewOpenViewTab3.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.updateText, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_NEWOPENSHOPBUY), this.updateText, this);
        var numbg = BaseBitmap.create("public_9_resbg");
        var rectd = new egret.Rectangle(0, 0, 40, 40);
        var icon = BaseBitmap.create(App.CommonUtil.getResByCode("acnewopen_specialitem2", this.uiType));
        var numTxt = ComponentManager.getTextField(String(this.vo.getSpecialNum()), 20);
        numbg.setPosition(245, 10);
        this.addChild(numbg);
        icon.setPosition(numbg.x - 3, numbg.y + numbg.height / 2 - icon.height / 2);
        view.addChild(icon);
        numTxt.setPosition(icon.x + icon.width + 10, icon.y + icon.height / 2 - numTxt.height / 2 + 2);
        view.addChild(numTxt);
        view._numTxt = numTxt;
        var vo = this.vo;
        var taskArr = this.vo.getShopArr();
        var tmpRect = new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 383 - 68);
        var scrollList = ComponentManager.getScrollList(AcNewOpenShopItem, taskArr, tmpRect, view.code);
        view._scrollList = scrollList;
        view._scrollList.y = 60;
        view.addChild(scrollList);
        scrollList.bounces = false;
    };
    AcNewOpenViewTab3.prototype.update = function () {
        if (!this.vo) {
            return;
        }
        var taskArr = this.vo.getShopArr();
        this._scrollList.refreshData(taskArr, this.code);
        this.vo.lastpos = null;
    };
    AcNewOpenViewTab3.prototype.updateText = function () {
        this._numTxt.text = String(this.vo.getSpecialNum());
    };
    AcNewOpenViewTab3.prototype.rewardCallBack = function (evt) {
        var view = this;
        var rData = evt.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rewards = rData.rewards;
        var rewardList = GameData.formatRewardItem(rewards);
        var pos = this.vo.lastpos;
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
        this.vo.lastidx = null;
    };
    AcNewOpenViewTab3.prototype.dispose = function () {
        var view = this;
        this._scrollList = null;
        this._numTxt = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.updateText, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_NEWOPENSHOPBUY), this.updateText, this);
        _super.prototype.dispose.call(this);
    };
    return AcNewOpenViewTab3;
}(AcCommonViewTab));
__reflect(AcNewOpenViewTab3.prototype, "AcNewOpenViewTab3");
//# sourceMappingURL=AcNewOpenViewTab3.js.map