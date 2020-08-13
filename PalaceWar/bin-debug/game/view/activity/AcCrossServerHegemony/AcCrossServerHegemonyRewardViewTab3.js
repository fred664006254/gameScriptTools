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
//
var AcCrossServerHegemonyRewardViewTab3 = (function (_super) {
    __extends(AcCrossServerHegemonyRewardViewTab3, _super);
    function AcCrossServerHegemonyRewardViewTab3(data) {
        var _this = _super.call(this) || this;
        _this._list = null;
        _this._scoreText = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcCrossServerHegemonyRewardViewTab3.prototype, "api", {
        get: function () {
            return Api.crossServerHegemonyVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyRewardViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyRewardViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerHegemonyRewardViewTab3.prototype.initView = function () {
        // let view = this;
        // this.width = 600;
        // this.height = 610;
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH,this.update,this);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIPEBOSS_SHOPBUY),view.collectHandlerCallBack,view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_EXCHANGEFIGHTSHOP, this.refreshData, this);
        var bg = BaseBitmap.create("common_9_bg");
        bg.width = GameConfig.stageWidth;
        bg.height = GameConfig.stageHeigth - 89 - 60;
        bg.setPosition(0, 0);
        this.addChild(bg);
        // let redBg = BaseBitmap.create("accshegemony_mainredbg");
        // redBg.x = GameConfig.stageWidth/2 - redBg.width/2;
        // redBg.y = bg.y + 9;
        // this.addChild(redBg);
        var redBg = BaseBitmap.create("accshegemony_ranktitlebg");
        redBg.width = 600;
        redBg.x = GameConfig.stageWidth / 2 - redBg.width / 2;
        redBg.y = bg.y + 9;
        this.addChild(redBg);
        this._scoreText = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyRewardFightScoreTxt", [this.vo.resultscore]), 24, TextFieldConst.COLOR_WARN_YELLOW);
        this._scoreText.x = redBg.x + redBg.width / 2 - this._scoreText.width / 2;
        this._scoreText.y = redBg.y + redBg.height / 2 - this._scoreText.height / 2;
        this.addChild(this._scoreText);
        var tmpRect = new egret.Rectangle(0, 0, 612, GameConfig.stageHeigth - 221); //240
        var shopList = this.cfg.getFightScoreShopList();
        var scrollList = ComponentManager.getScrollList(AcCrossServerHegemonyRewardScrollItem3, shopList, tmpRect, { aid: this.param.data.aid, code: this.param.data.code });
        //32.5
        //56.5
        // view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [46.5, 65]);
        scrollList.x = GameConfig.stageWidth / 2 - scrollList.width / 2;
        scrollList.y = 51; //70
        this.addChild(scrollList);
        this._list = scrollList;
    };
    AcCrossServerHegemonyRewardViewTab3.prototype.rankClick = function () {
        var view = this;
        // if(view.api.getCurpeirod() < 8){
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip6"));
        // 	return;
        // }
        ViewController.getInstance().openView(ViewConst.POPUP.CROSSSERVERSERVANTRANKVIEW);
        //
    };
    AcCrossServerHegemonyRewardViewTab3.prototype.rewardClick = function () {
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
    AcCrossServerHegemonyRewardViewTab3.prototype.refreshData = function (event) {
        var shopList = this.cfg.getFightScoreShopList();
        this._list.refreshData(shopList, { aid: this.param.data.aid, code: this.param.data.code });
        this._scoreText.text = LanguageManager.getlocal("acCrossServerHegemonyRewardFightScoreTxt", [this.vo.resultscore]);
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
    AcCrossServerHegemonyRewardViewTab3.prototype.update = function (evt) {
        if (this.api.getScoreClickType() == 'a') {
            return;
        }
        // let arr = view.vo.getArr('scoreMarket');
        // view._list.refreshData(arr, view.param.data.code);
        var index = this.api.getScoreClickIdx();
        var item = this._list.getItemByIndex(index);
        item.update();
    };
    AcCrossServerHegemonyRewardViewTab3.prototype.collectHandlerCallBack = function (evt) {
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
    AcCrossServerHegemonyRewardViewTab3.prototype.dispose = function () {
        // let view = this;
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH,view.update,view);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIPEBOSS_SHOPBUY),view.collectHandlerCallBack,view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_EXCHANGEFIGHTSHOP, this.refreshData, this);
        this._list = null;
        this._scoreText = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonyRewardViewTab3;
}(CommonViewTab));
__reflect(AcCrossServerHegemonyRewardViewTab3.prototype, "AcCrossServerHegemonyRewardViewTab3");
//# sourceMappingURL=AcCrossServerHegemonyRewardViewTab3.js.map