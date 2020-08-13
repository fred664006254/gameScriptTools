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
        _this._aid = "";
        _this._code = "";
        return _this;
    }
    AcPunishExPopupView.prototype.initView = function () {
        this._aid = this.param.data.aid;
        this._code = this.param.data.code;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_PUNISH_EXITEM, this.doBuy, this);
        this._pointText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        this._pointText.y = 11;
        this.addChildToContainer(this._pointText);
        // this._pointText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
        // this._pointText.y = 11;
        // this.addChildToContainer(this._pointText);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 540, 710);
        var dataList = new Array();
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        for (var index = 1; index < 20; index++) {
            var tmpData = cfg.shop[index.toString()];
            if (tmpData) {
                tmpData["aid"] = this._aid;
                tmpData["code"] = this._code;
                //元宵节头像
                if (tmpData.sell == "11_4017_1" && Api.switchVoApi.checkIsTitleState("4017") == false) {
                    continue;
                }
                else if (tmpData.sell == "11_4009_1" && Api.switchVoApi.checkIsTitleState("4009") == false) {
                    continue;
                }
                else if (tmpData.sell == "11_6001_1" && Api.switchVoApi.checkIsTitleState("6001") == false) {
                    continue;
                }
                else if (tmpData.sell == "10_214_1" && Api.switchVoApi.checkIsWifeLocked("214") == false) {
                    continue;
                }
                else {
                    tmpData.key = index;
                    dataList.push(tmpData);
                }
            }
            else {
                break;
            }
        }
        this._scrollList = ComponentManager.getScrollList(AcPunishExScrollItem, dataList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(23 + GameData.popupviewOffsetX, 40);
        this.resetPointText();
    };
    AcPunishExPopupView.prototype.doBuy = function (event) {
        var data = event.data;
        this._index = data.index;
        this.request(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHSHOP, { activeId: this._aid + "-" + this._code, itemKey: data.key });
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
        var acVo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
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
        this._aid = "";
        this._code = "";
        _super.prototype.dispose.call(this);
    };
    return AcPunishExPopupView;
}(PopupView));
__reflect(AcPunishExPopupView.prototype, "AcPunishExPopupView");
//# sourceMappingURL=AcPunishExPopupView.js.map