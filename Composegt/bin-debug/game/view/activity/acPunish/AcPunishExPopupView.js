/**
 * 积分兑换道具板子
 * author dky
 * date 2017/11/20
 * @class AcPunishExPopupView
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
var AcPunishExPopupView = (function (_super) {
    __extends(AcPunishExPopupView, _super);
    function AcPunishExPopupView() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        return _this;
    }
    AcPunishExPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_PUNISH_EXITEM, this.doBuy, this);
        this._pointText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._pointText.y = 11;
        this.addChildToContainer(this._pointText);
        // this._pointText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
        // this._pointText.y = 11;
        // this.addChildToContainer(this._pointText);
        var bg1 = BaseBitmap.create("public_tc_bg01");
        bg1.width = 540;
        bg1.height = 670;
        bg1.x = this.viewBg.width / 2 - bg1.width / 2;
        bg1.y = 50;
        this.addChildToContainer(bg1);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, bg1.width - 20, bg1.height - 20);
        var dataList = new Array();
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        for (var index = 1; index < 20; index++) {
            if (cfg.shop[index.toString()]) {
                dataList.push(cfg.shop[index.toString()]);
            }
            else {
                break;
            }
        }
        this._scrollList = ComponentManager.getScrollList(AcPunishExScrollItem, dataList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(bg1.x + 10, bg1.y + 10);
        this.resetPointText();
    };
    AcPunishExPopupView.prototype.doBuy = function (event) {
        var data = event.data;
        this._index = data.index;
        this.request(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHSHOP, { activeId: this.param.data.aid + "-" + this.param.data.code, itemKey: data.key });
    };
    //请求回调
    AcPunishExPopupView.prototype.receiveData = function (data) {
        if (data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHSHOP) {
            if (data.data.data && data.data.data.rewards) {
                var rewards = GameData.formatRewardItem(data.data.data.rewards);
                if (rewards && rewards.length > 0) {
                    App.CommonUtil.playRewardFlyAction(rewards);
                }
            }
            var index = this._index;
            var wideItem = this._scrollList.getItemByIndex(index);
            wideItem.refreshData(index);
            // this._pointText.text = gem.toString();
            this.resetPointText();
        }
    };
    AcPunishExPopupView.prototype.resetPointText = function () {
        var acVo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        this._pointText.text = LanguageManager.getlocal("acPunishShopScore1", [acVo.score.toString()]);
        this._pointText.x = this.viewBg.width / 2 - this._pointText.width / 2;
        // this._pointText.text = App.DateUtil.getFormatBySecond(1,2)
    };
    AcPunishExPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_PUNISH_EXITEM, this.doBuy, this);
        // this._pointText = null;
        // this._isLoading = false;
        // this._buyClickId = null;
        this._index = null;
        _super.prototype.dispose.call(this);
    };
    AcPunishExPopupView.aid = "";
    AcPunishExPopupView.code = "";
    return AcPunishExPopupView;
}(PopupView));
__reflect(AcPunishExPopupView.prototype, "AcPunishExPopupView");
