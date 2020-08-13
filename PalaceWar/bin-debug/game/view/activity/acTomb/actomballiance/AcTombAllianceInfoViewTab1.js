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
var AcTombAllianceInfoViewTab1 = (function (_super) {
    __extends(AcTombAllianceInfoViewTab1, _super);
    function AcTombAllianceInfoViewTab1(data) {
        var _this = _super.call(this) || this;
        _this._sortBtn = null;
        _this._sortType = 1;
        _this._list = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcTombAllianceInfoViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombAllianceInfoViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombAllianceInfoViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombAllianceInfoViewTab1.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombAllianceInfoViewTab1.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcTombAllianceInfoViewTab1.prototype.initView = function () {
        var view = this;
        view.width = 526;
        view.height = 526;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_TOMB_FRESH, view.getrewardCallback, view);
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_SERVANTPK_GETPREWARD),view.getrewardCallback,view);
        //App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SERVANTPK,view.update,view);
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
        // let Bg = BaseBitmap.create("public_9_bg4");
        // Bg.width = 628;
        // Bg.height = 526;
        // view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, Bg, view);
        // view.addChild(Bg);
        var tmpRect = new egret.Rectangle(0, 0, 505, view.height - 20);
        var arr = view.vo.getWipeBossAllianceInfo(1);
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
        view._sortType = 2;
        var scrollList = ComponentManager.getScrollList(AcTombAllianceInfoScrollItem, arr, tmpRect, view.param.data.code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [22, 65]);
        view.addChild(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal('acPunishNoData'));
        view._list = scrollList;
        var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "acwipeBossAllInfoSort1", view.sortHandle, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, scrollList, [0, scrollList.height + 50]);
        view.addChild(btn);
        view._sortType = 1;
        view._sortBtn = btn;
    };
    AcTombAllianceInfoViewTab1.prototype.sortHandle = function () {
        var view = this;
        var list = view._list;
        view._sortType = 3 - view._sortType;
        var arr = list._dataList;
        arr.sort(function (a, b) {
            var cfga = view.cfg.getBossNpcItemCfgById(a.bosstype);
            var cfgb = view.cfg.getBossNpcItemCfgById(b.bosstype);
            if (cfga.type == cfgb.type) {
                return view._sortType == 1 ? (cfgb.id - cfga.id) : (cfga.id - cfgb.id);
            }
            else {
                return view._sortType == 1 ? (cfga.type - cfgb.type) : (cfgb.type - cfga.type);
            }
        });
        list.refreshData(arr, view.param.data.code);
        view._sortBtn.setText("acwipeBossAllInfoSort" + view._sortType);
    };
    AcTombAllianceInfoViewTab1.prototype.rankClick = function () {
        var view = this;
        // if(view.api.getCurpeirod() < 8){
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip6"));
        // 	return;
        // }
        ViewController.getInstance().openView(ViewConst.POPUP.CROSSSERVERSERVANTRANKVIEW);
        //
    };
    AcTombAllianceInfoViewTab1.prototype.rewardClick = function () {
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
    AcTombAllianceInfoViewTab1.prototype.getrewardCallback = function () {
        var view = this;
        var item = view._list.getItemByIndex(view.vo.clickIdx);
        if (item) {
            view.vo.clickIdx = -1;
            item.confirmCallbackHandler();
        }
    };
    AcTombAllianceInfoViewTab1.prototype.dispose = function () {
        var view = this;
        view._sortBtn = null;
        view._list = null;
        view._sortType = 1;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_TOMB_FRESH, view.getrewardCallback, view);
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVANTPK,view.update,view);
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_SERVANTPK_GETPREWARD),view.getrewardCallback,view);
        _super.prototype.dispose.call(this);
    };
    return AcTombAllianceInfoViewTab1;
}(CommonViewTab));
__reflect(AcTombAllianceInfoViewTab1.prototype, "AcTombAllianceInfoViewTab1");
//# sourceMappingURL=AcTombAllianceInfoViewTab1.js.map