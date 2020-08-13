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
var AcWipeBossAllianceInfoViewTab1 = (function (_super) {
    __extends(AcWipeBossAllianceInfoViewTab1, _super);
    function AcWipeBossAllianceInfoViewTab1(data) {
        var _this = _super.call(this) || this;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcWipeBossAllianceInfoViewTab1.prototype, "api", {
        get: function () {
            return Api.wipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossAllianceInfoViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossAllianceInfoViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcWipeBossAllianceInfoViewTab1.prototype.initView = function () {
        var view = this;
        view.width = 526;
        view.height = 526;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_SERVANTPK_GETPREWARD),view.getrewardCallback,view);
        //App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SERVANTPK,view.update,view);
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
        // let Bg = BaseBitmap.create("public_9_bg4");
        // Bg.width = 628;
        // Bg.height = 526;
        // view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, Bg, view);
        // view.addChild(Bg);
        var tmpRect = new egret.Rectangle(0, 0, 505, view.height - 20);
        var arr = view.api.getWipeBossAllianceInfo(1);
        arr.sort(function (a, b) {
            var cfga = view.cfg.getBossNpcItemCfgById(a.bosstype);
            var cfgb = view.cfg.getBossNpcItemCfgById(b.bosstype);
            if (cfga.type == cfgb.type) {
                return cfgb.id - cfga.id;
            }
            else {
                return cfga.type - cfgb.type;
            }
        });
        var scrollList = ComponentManager.getScrollList(AcWipeBossAllianceInfoScrollItem, arr, tmpRect, view.param.data.code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [22, 65]);
        view.addChild(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal('acPunishNoData'));
    };
    AcWipeBossAllianceInfoViewTab1.prototype.rankClick = function () {
        var view = this;
        // if(view.api.getCurpeirod() < 8){
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip6"));
        // 	return;
        // }
        ViewController.getInstance().openView(ViewConst.POPUP.CROSSSERVERSERVANTRANKVIEW);
        //
    };
    AcWipeBossAllianceInfoViewTab1.prototype.rewardClick = function () {
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
    AcWipeBossAllianceInfoViewTab1.prototype.getrewardCallback = function (evt) {
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
    AcWipeBossAllianceInfoViewTab1.prototype.dispose = function () {
        var view = this;
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVANTPK,view.update,view);
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_SERVANTPK_GETPREWARD),view.getrewardCallback,view);
        _super.prototype.dispose.call(this);
    };
    return AcWipeBossAllianceInfoViewTab1;
}(CommonViewTab));
__reflect(AcWipeBossAllianceInfoViewTab1.prototype, "AcWipeBossAllianceInfoViewTab1");
//# sourceMappingURL=AcWipeBossAllianceInfoViewTab1.js.map