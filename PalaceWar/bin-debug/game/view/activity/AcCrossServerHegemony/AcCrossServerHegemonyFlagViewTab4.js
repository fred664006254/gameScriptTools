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
//人气商店
var AcCrossServerHegemonyFlagViewTab4 = (function (_super) {
    __extends(AcCrossServerHegemonyFlagViewTab4, _super);
    function AcCrossServerHegemonyFlagViewTab4(data) {
        var _this = _super.call(this) || this;
        _this._list = null;
        _this._scoreText = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcCrossServerHegemonyFlagViewTab4.prototype, "api", {
        get: function () {
            return Api.crossServerHegemonyVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyFlagViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyFlagViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerHegemonyFlagViewTab4.prototype.initView = function () {
        // let view = this;
        // this.width = 600;
        // this.height = 610;
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH,this.update,this);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIPEBOSS_SHOPBUY),view.collectHandlerCallBack,view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_EXCHANGEFLAGSHOP, this.refreshData, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH, this.refreshData, this);
        var redBg = BaseBitmap.create("accshegemony_ranktitlebg");
        redBg.width = 620;
        redBg.x = GameConfig.stageWidth / 2 - redBg.width / 2;
        redBg.y = 14;
        this.addChild(redBg);
        this._scoreText = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagScoreTxt", [String(this.vo.getScore())]), 24, TextFieldConst.COLOR_WARN_YELLOW);
        this._scoreText.x = redBg.x + redBg.width / 2 - this._scoreText.width / 2;
        this._scoreText.y = redBg.y + redBg.height / 2 - this._scoreText.height / 2;
        this.addChild(this._scoreText);
        var tmpRect = new egret.Rectangle(0, 0, 612, GameConfig.stageHeigth - 99 - redBg.height - 60 - 10);
        var shopList = this.formatFlagScoreShopCfg();
        var scrollList = ComponentManager.getScrollList(AcCrossServerHegemonyFlagScrollList4, shopList, tmpRect, { aid: this.param.data.aid, code: this.param.data.code });
        //32.5
        //56.5
        // view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [46.5, 65]);
        scrollList.x = GameConfig.stageWidth / 2 - scrollList.width / 2;
        scrollList.y = redBg.y + redBg.height + 5;
        this.addChild(scrollList);
        this._list = scrollList;
    };
    AcCrossServerHegemonyFlagViewTab4.prototype.refreshData = function (event) {
        var shopList = this.formatFlagScoreShopCfg();
        this._list.refreshData(shopList, { aid: this.param.data.aid, code: this.param.data.code });
        this._scoreText.text = LanguageManager.getlocal("acCrossServerHegemonyFlagScoreTxt", [String(this.vo.getScore())]);
        this._scoreText.x = this.width / 2 - this._scoreText.width / 2;
        if (event) {
            if (event.data && event.data.ret) {
                var data = event.data.data.data;
                var rewards = data.rewards;
                var rList = GameData.formatRewardItem(rewards);
                App.CommonUtil.playRewardFlyAction(rList);
            }
        }
    };
    AcCrossServerHegemonyFlagViewTab4.prototype.formatFlagScoreShopCfg = function () {
        var data = this.cfg.getFlagScoreShopList();
        var list = [];
        for (var i = 0; i < data.length; i++) {
            var itemArr = GameData.formatRewardItem(data[i].sell);
            if (itemArr.length > 0) {
                list.push(data[i]);
            }
        }
        return list;
    };
    AcCrossServerHegemonyFlagViewTab4.prototype.rankClick = function () {
        var view = this;
        // if(view.api.getCurpeirod() < 8){
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip6"));
        // 	return;
        // }
        ViewController.getInstance().openView(ViewConst.POPUP.CROSSSERVERSERVANTRANKVIEW);
        //
    };
    AcCrossServerHegemonyFlagViewTab4.prototype.rewardClick = function () {
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
    AcCrossServerHegemonyFlagViewTab4.prototype.update = function (evt) {
        if (this.api.getScoreClickType() == 'a') {
            return;
        }
        // let arr = view.vo.getArr('scoreMarket');
        // view._list.refreshData(arr, view.param.data.code);
        var index = this.api.getScoreClickIdx();
        var item = this._list.getItemByIndex(index);
        item.update();
    };
    AcCrossServerHegemonyFlagViewTab4.prototype.collectHandlerCallBack = function (evt) {
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
    AcCrossServerHegemonyFlagViewTab4.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_EXCHANGEFLAGSHOP, this.refreshData, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH, this.refreshData, this);
        // let view = this;
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH,view.update,view);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIPEBOSS_SHOPBUY),view.collectHandlerCallBack,view);
        this._list = null;
        this._scoreText = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonyFlagViewTab4;
}(CommonViewTab));
__reflect(AcCrossServerHegemonyFlagViewTab4.prototype, "AcCrossServerHegemonyFlagViewTab4");
//# sourceMappingURL=AcCrossServerHegemonyFlagViewTab4.js.map