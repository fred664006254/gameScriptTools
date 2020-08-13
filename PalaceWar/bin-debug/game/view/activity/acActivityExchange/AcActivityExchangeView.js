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
var AcActivityExchangeView = (function (_super) {
    __extends(AcActivityExchangeView, _super);
    function AcActivityExchangeView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcActivityExchangeView.prototype, "Vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcActivityExchangeView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.updateList, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACEXCHANGE_EXCHANGE), this.onRewardGet, this);
        this._banner = BaseLoadBitmap.create("acactivityexchange-1_banner");
        this.addChildToContainer(this._banner);
        this._banner.height = 245;
        this._banner.y = this.titleBg.height - 6;
        this._listBg = BaseLoadBitmap.create("acactivityexchange-1_bigframe");
        this.addChildToContainer(this._listBg);
        this._listBg.width = GameConfig.stageWidth;
        this._listBg.height = GameConfig.stageHeigth - this._banner.y - this._banner.height;
        this._listBg.x = 0;
        this._listBg.y = this._banner.y + this._banner.height;
        this._timeLabel = ComponentManager.getTextField(this.Vo.getAcTimeAndHour(), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, 0xfdf3b5);
        this.addChildToContainer(this._timeLabel);
        this._timeLabel.width = 340;
        this._timeLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        this._timeLabel.setPosition(264, this._banner.y + 168);
        this._djsBg = BaseLoadBitmap.create("public_9_bg61");
        this.addChildToContainer(this._djsBg);
        this._djsBg.width = 270;
        this._djsBg.height = 28;
        this._djsBg.setPosition(GameConfig.stageWidth - 270, this._banner.y + this._banner.height - 28);
        this._djsLabel = ComponentManager.getTextField(this.Vo.getAcCountDown(), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, 0xfdf3b5);
        this.addChildToContainer(this._djsLabel);
        this._djsLabel.width = 270;
        this._djsLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        this._djsLabel.setPosition(GameConfig.stageWidth - 270, this._banner.y + this._banner.height - 24);
        this.updateList();
    };
    AcActivityExchangeView.prototype.formatListData = function () {
        var _this = this;
        this._list_db = [];
        this.Vo.config.AllCfgItems.forEach(function (v) {
            _this._list_db.push({
                aid: _this.aid,
                code: _this.code,
                itemCfg: v
            });
        });
    };
    AcActivityExchangeView.prototype.updateList = function () {
        this.formatListData();
        if (!this.listview) {
            var list_w = 602;
            var list_h = this._listBg.height - 30;
            this.listview = ComponentManager.getScrollList(AcActivityExchangeItem, [], new egret.Rectangle(0, 0, list_w, list_h));
            this.addChildToContainer(this.listview);
            this.listview.x = (GameConfig.stageWidth - list_w) / 2;
            this.listview.y = this._listBg.y + 15;
        }
        this.listview.refreshData(this._list_db);
    };
    AcActivityExchangeView.prototype.getTitleBgName = function () {
        return "acactivityexchange-1_title";
    };
    AcActivityExchangeView.prototype.getTitleStr = function () {
        return "";
    };
    AcActivityExchangeView.prototype.getRuleInfo = function () {
        return "acActivityExchangeRule-" + this.getUiCode();
    };
    AcActivityExchangeView.prototype.onRewardGet = function (e) {
        if (e.data.ret) {
            var __rews = e.data.data.data.rewards;
            var rewardList = GameData.formatRewardItem(__rews);
            App.CommonUtil.playRewardFlyAction(rewardList, this.Vo.buyPoint);
        }
    };
    AcActivityExchangeView.prototype.tick = function () {
        this._djsLabel.text = this.Vo.getAcCountDown();
    };
    AcActivityExchangeView.prototype.dispose = function () {
        this._banner = null;
        this.listview = null;
        this._list_db = null;
        this._listBg = null;
        this._timeLabel = null;
        this._djsBg = null;
        this._djsLabel = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.updateList, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACEXCHANGE_EXCHANGE), this.onRewardGet, this);
        _super.prototype.dispose.call(this);
    };
    return AcActivityExchangeView;
}(AcCommonView));
__reflect(AcActivityExchangeView.prototype, "AcActivityExchangeView");
//# sourceMappingURL=AcActivityExchangeView.js.map