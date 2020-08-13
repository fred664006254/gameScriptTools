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
//充值奖励
var AcCrossServerHegemonyFlagViewTab1 = (function (_super) {
    __extends(AcCrossServerHegemonyFlagViewTab1, _super);
    function AcCrossServerHegemonyFlagViewTab1(data) {
        var _this = _super.call(this) || this;
        _this._list = null;
        _this._scoreText = null;
        _this._totalNum = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcCrossServerHegemonyFlagViewTab1.prototype, "api", {
        get: function () {
            return Api.crossServerHegemonyVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyFlagViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyFlagViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerHegemonyFlagViewTab1.prototype.initView = function () {
        // let view = this;
        // this.width = 600;
        // this.height = 610;
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH,this.update,this);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIPEBOSS_SHOPBUY),view.collectHandlerCallBack,view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETALLIANCECHARGERDW, this.refreshData, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH, this.refreshData, this);
        var topBg = BaseBitmap.create("public_9_bg1");
        topBg.width = 620;
        topBg.setPosition(GameConfig.stageWidth / 2 - topBg.width / 2, 10);
        this.addChild(topBg);
        var topInfo = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyRechargeTaskInfo"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        topInfo.width = topBg.width - 20;
        topInfo.lineSpacing = 4;
        this.addChild(topInfo);
        topInfo.setPosition(topBg.x + topBg.width / 2 - topInfo.width / 2, topBg.y + 10);
        var totalNum = this.vo.getAllianceTotalRecharge();
        var totalRecharge = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyRechargeAllianceCurrTotal", ["" + totalNum]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        totalRecharge.setPosition(topInfo.x + topInfo.width / 2 - totalRecharge.width / 2, topInfo.y + topInfo.height + 7);
        this.addChild(totalRecharge);
        this._totalNum = totalRecharge;
        topBg.height = topInfo.height + totalRecharge.height + 27;
        var tmpRect = new egret.Rectangle(0, 0, 620, GameConfig.stageHeigth - 99 - 60 - 10 - topBg.height);
        var rechargeList = this.vo.getSortAllianceRechargeData();
        var scrollList = ComponentManager.getScrollList(AcCrossServerHegemonyFlagScrollList1, rechargeList, tmpRect, { aid: this.param.data.aid, code: this.param.data.code, requestEvent: NetRequestConst.REQUEST_ACRECOVERY_CHARGE });
        //32.5
        //56.5
        // view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [46.5, 65]);
        scrollList.x = GameConfig.stageWidth / 2 - scrollList.width / 2;
        scrollList.y = 10 + topBg.height;
        this.addChild(scrollList);
        this._list = scrollList;
    };
    AcCrossServerHegemonyFlagViewTab1.prototype.refreshData = function (event) {
        var rechargeList = this.vo.getSortAllianceRechargeData();
        this._list.refreshData(rechargeList, { aid: this.param.data.aid, code: this.param.data.code });
        if (event) {
            if (event.data && event.data.ret) {
                var data = event.data.data.data;
                var rewards = data.rewards;
                var rList = GameData.formatRewardItem(rewards);
                App.CommonUtil.playRewardFlyAction(rList);
            }
        }
        this._totalNum.text = LanguageManager.getlocal("acCrossServerHegemonyRechargeAllianceCurrTotal", ["" + this.vo.getAllianceTotalRecharge()]);
        this._totalNum.x = GameConfig.stageWidth / 2 - this._totalNum.width / 2;
    };
    AcCrossServerHegemonyFlagViewTab1.prototype.rankClick = function () {
        var view = this;
        // if(view.api.getCurpeirod() < 8){
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip6"));
        // 	return;
        // }
        ViewController.getInstance().openView(ViewConst.POPUP.CROSSSERVERSERVANTRANKVIEW);
        //
    };
    AcCrossServerHegemonyFlagViewTab1.prototype.rewardClick = function () {
        var view = this;
        // if(view.api.getCurpeirod() < 8){
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip6"));
        // 	return;
        // }
        // else{
        // 	if(view.api.getIsWinner()){
        // 		NetManager.request(NetRequestConst.REQUST_SERVANTPK_GETPREWARD,{
        // 			activeId:view.api.vo.aidAndCode,
        // 		})
        // 	}
        // 	else{
        // 		App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip7"));
        // 		return;
        // 	}
        // }
    };
    AcCrossServerHegemonyFlagViewTab1.prototype.update = function (evt) {
        if (this.api.getScoreClickType() == 'a') {
            return;
        }
        // let arr = view.vo.getArr('scoreMarket');
        // view._list.refreshData(arr, view.param.data.code);
        var index = this.api.getScoreClickIdx();
        var item = this._list.getItemByIndex(index);
        item.update();
    };
    AcCrossServerHegemonyFlagViewTab1.prototype.collectHandlerCallBack = function (evt) {
        var view = this;
        var data = evt.data;
        if (data.data.ret < 0 || view.api.getScoreClickType() == 'a') {
            return;
        }
        var index = view.api.getScoreClickIdx();
        var rewardList = GameData.formatRewardItem(data.data.data.rewards);
        var item = view._list.getItemByIndex(index);
        var pos = item.localToGlobal(67, 195);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    };
    AcCrossServerHegemonyFlagViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETALLIANCECHARGERDW, this.refreshData, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH, this.refreshData, this);
        // let view = this;
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH,view.update,view);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIPEBOSS_SHOPBUY),view.collectHandlerCallBack,view);
        this._list = null;
        this._scoreText = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonyFlagViewTab1;
}(CommonViewTab));
__reflect(AcCrossServerHegemonyFlagViewTab1.prototype, "AcCrossServerHegemonyFlagViewTab1");
//# sourceMappingURL=AcCrossServerHegemonyFlagViewTab1.js.map