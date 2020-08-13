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
* 物资供应
* date 2020.5.27
* author ycg
* @name SixSection1RechargeView
*/
var SixSection1RechargeView = (function (_super) {
    __extends(SixSection1RechargeView, _super);
    function SixSection1RechargeView() {
        var _this = _super.call(this) || this;
        _this._topBg = null;
        _this._timeDown = null;
        _this._scrollList = null;
        _this._timeNum = 0;
        _this._isCross = false;
        return _this;
    }
    SixSection1RechargeView.prototype.getTitleStr = function () {
        return null;
    };
    SixSection1RechargeView.prototype.getTitleBgName = function () {
        return "sixsection1_rechargetitlebg";
    };
    SixSection1RechargeView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    SixSection1RechargeView.prototype.getRuleInfo = function () {
        return "";
    };
    // protected getRuleBtnName():string
    // {	
    // 	return ButtonConst.BTN2_RULE;
    // }
    SixSection1RechargeView.prototype.getBigFrame = function () {
        return "commonview_bigframe";
    };
    SixSection1RechargeView.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat("progress3", "progress3_bg", "public_scrollitembg", "public_line3", "public_scrolllistbg", "collectflag").concat(list);
    };
    SixSection1RechargeView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_SIXSECTION1_SHOW, requestData: {
                show: 0
            } };
    };
    SixSection1RechargeView.prototype.receiveData = function (data) {
        if (data.ret) {
            // this.refreshView();
        }
    };
    SixSection1RechargeView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SIXSECTION1_GETRECHARGE, this.getRewardCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SIXSECTION1_MODEL_REFRESH, this.refreshView, this);
        var topBg = BaseBitmap.create("sixsection1_rechargetopbg");
        topBg.setPosition(this.titleBg.x + this.titleBg.width / 2 - topBg.width / 2, this.titleBg.y + this.titleBg.height - 7);
        this.addChildToContainer(topBg);
        this._topBg = topBg;
        var info = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1RechargeDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        info.setPosition(topBg.x + 222, topBg.y + 44);
        this.addChildToContainer(info);
        info.width = 400;
        info.lineSpacing = 7;
        this._timeNum = App.DateUtil.getWeeTs(GameData.serverTime);
        var timeDown = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1RechargeTimeDown", ["" + this.getDayTimeDown()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        timeDown.setPosition(topBg.x + topBg.width - 20 - timeDown.width, topBg.y + 182);
        this.addChildToContainer(timeDown);
        this._timeDown = timeDown;
        this.setBigFameY(topBg.y + topBg.height);
        this.setBigFameCorner(2);
        var dataList = Api.sixsection1VoApi.getSortRechargeCfg();
        var scrollList = ComponentManager.getScrollList(SixSection1RechargeScrollItem, dataList, new egret.Rectangle(0, 0, GameConfig.stageWidth - 20, GameConfig.stageHeigth - topBg.y - topBg.height - 20), {});
        scrollList.setPosition(10, topBg.y + topBg.height + 10);
        this.addChildToContainer(scrollList);
        scrollList.horizontalScrollPolicy = "off";
        this._scrollList = scrollList;
        this._isCross = false;
    };
    SixSection1RechargeView.prototype.getDayTimeDown = function () {
        var et = this._timeNum + 86400;
        if (GameData.serverTime >= et) {
            this._timeNum = App.DateUtil.getWeeTs(GameData.serverTime);
            this.resetList();
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    SixSection1RechargeView.prototype.tick = function () {
        if (!Api.sixsection1VoApi.isInPeriousTime()) {
            this._timeDown.text = LanguageManager.getlocal("sixSection1EndTip");
            this._timeDown.x = this._topBg.x + this._topBg.width - 20 - this._timeDown.width;
            return;
        }
        this._timeDown.text = LanguageManager.getlocal("sixSection1RechargeTimeDown", ["" + this.getDayTimeDown()]);
        this._timeDown.x = this._topBg.x + this._topBg.width - 20 - this._timeDown.width;
    };
    SixSection1RechargeView.prototype.getRewardCallback = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        var rData = evt.data.data.data;
        var rewardVoList = GameData.formatRewardItem(rData.rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
        // this.refreshView();
    };
    SixSection1RechargeView.prototype.refreshView = function () {
        if (this._scrollList) {
            var data = Api.sixsection1VoApi.getSortRechargeCfg();
            this._scrollList.refreshData(data);
        }
    };
    //重置list
    SixSection1RechargeView.prototype.resetList = function () {
        // let data = Config.Sixsection1Cfg.getRechargeList();
        // this._scrollList.refreshData(data);
        this._isCross = true;
        if (this._isCross) {
            this._isCross = false;
            if (Api.sixsection1VoApi.isInPeriousTime()) {
                this.request(NetRequestConst.REQUEST_SIXSECTION1_SHOW, { show: 0 });
            }
        }
    };
    SixSection1RechargeView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SIXSECTION1_GETRECHARGE, this.getRewardCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SIXSECTION1_MODEL_REFRESH, this.refreshView, this);
        this._timeDown = null;
        this._scrollList = null;
        this._timeNum = 0;
        this._isCross = false;
        _super.prototype.dispose.call(this);
    };
    return SixSection1RechargeView;
}(CommonView));
__reflect(SixSection1RechargeView.prototype, "SixSection1RechargeView");
//# sourceMappingURL=SixSection1RechargeView.js.map