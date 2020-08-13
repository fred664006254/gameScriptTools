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
var AcCrossServerWipeBossAllianceInfoViewTab2 = (function (_super) {
    __extends(AcCrossServerWipeBossAllianceInfoViewTab2, _super);
    function AcCrossServerWipeBossAllianceInfoViewTab2(data) {
        var _this = _super.call(this) || this;
        _this._sortBtn = null;
        _this._list = null;
        _this._sortType = 1;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcCrossServerWipeBossAllianceInfoViewTab2.prototype, "api", {
        get: function () {
            return Api.crossServerWipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossAllianceInfoViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossAllianceInfoViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWipeBossAllianceInfoViewTab2.prototype.initView = function () {
        var view = this;
        view.width = 526;
        view.height = 526;
        var tmpRect = new egret.Rectangle(0, 0, 505, view.height - 20);
        var arr = view.api.getWipeBossAllianceInfo(2);
        arr.sort(function (a, b) {
            return (b.bosstype - a.bosstype);
        });
        var scrollList = ComponentManager.getScrollList(AcCrossServerWipeBossAllianceInfoScrollItem, arr, tmpRect, view.param.data.code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [46, 65]);
        view.addChild(scrollList);
        view._list = scrollList;
        scrollList.setEmptyTip(LanguageManager.getlocal('acPunishNoData'));
        // let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acwipeBossAllInfoSort1", view.sortHandle,view)
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, scrollList, [0,scrollList.height + 50]);
        // view.addChild(btn);
        // view._sortType = 1;
        // view._sortBtn = btn;
    };
    AcCrossServerWipeBossAllianceInfoViewTab2.prototype.sortHandle = function () {
        var view = this;
        var list = view._list;
        var arr = list._dataList;
        arr.sort(function (a, b) {
            return view._sortType == 1 ? (a.bosstype - b.bosstype) : (b.bosstype - a.bosstype);
        });
        list.refreshData(arr, view.param.data.code);
        view._sortType = 3 - view._sortType;
        view._sortBtn.setText("accrossserverwipeBossAllInfoSort" + view._sortType);
    };
    AcCrossServerWipeBossAllianceInfoViewTab2.prototype.rankClick = function () {
        var view = this;
        // if(view.api.getCurpeirod() < 8){
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip6"));
        // 	return;
        // }
        ViewController.getInstance().openView(ViewConst.POPUP.CROSSSERVERSERVANTRANKVIEW);
        //
    };
    AcCrossServerWipeBossAllianceInfoViewTab2.prototype.rewardClick = function () {
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
    AcCrossServerWipeBossAllianceInfoViewTab2.prototype.getrewardCallback = function (evt) {
        var view = this;
        var rdata = evt.data.data;
        if (rdata.ret != 0) {
            return;
        }
        //view.api.initData(evt.data.data.data);
        var rewards = rdata.data.rewards;
        var rewardList = GameData.formatRewardItem(rewards);
        //let pos = this._rewardBtn.localToGlobal(this._rewardBtn.width/2,this._rewardBtn.height/2)
        //App.CommonUtil.playRewardFlyAction(rewardList,pos);
    };
    AcCrossServerWipeBossAllianceInfoViewTab2.prototype.dispose = function () {
        var view = this;
        view._list = null;
        view._sortBtn = null;
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVANTPK,view.update,view);
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_SERVANTPK_GETPREWARD),view.getrewardCallback,view);
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWipeBossAllianceInfoViewTab2;
}(CommonViewTab));
__reflect(AcCrossServerWipeBossAllianceInfoViewTab2.prototype, "AcCrossServerWipeBossAllianceInfoViewTab2");
