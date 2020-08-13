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
var AcLocTombAllianceInfoViewTab1 = (function (_super) {
    __extends(AcLocTombAllianceInfoViewTab1, _super);
    function AcLocTombAllianceInfoViewTab1(data) {
        var _this = _super.call(this) || this;
        _this._sortBtn = null;
        _this._list = null;
        _this._sortType = 1;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcLocTombAllianceInfoViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombAllianceInfoViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombAllianceInfoViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombAllianceInfoViewTab1.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombAllianceInfoViewTab1.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcLocTombAllianceInfoViewTab1.prototype.initView = function () {
        var view = this;
        view.width = 526;
        view.height = 526;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LOCTOMB_FRESH, view.getrewardCallback, view);
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
        var scrollList = ComponentManager.getScrollList(AcLocTombAllianceInfoScrollItem, arr, tmpRect, view.param.data.code);
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
    AcLocTombAllianceInfoViewTab1.prototype.rankClick = function () {
        var view = this;
        // if(view.api.getCurpeirod() < 8){
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip6"));
        // 	return;
        // }
        ViewController.getInstance().openView(ViewConst.POPUP.CROSSSERVERSERVANTRANKVIEW);
        //
    };
    AcLocTombAllianceInfoViewTab1.prototype.sortHandle = function () {
        var view = this;
        var list = view._list;
        var arr = list._dataList;
        view._sortType = 3 - view._sortType;
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
    AcLocTombAllianceInfoViewTab1.prototype.rewardClick = function () {
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
    AcLocTombAllianceInfoViewTab1.prototype.getrewardCallback = function () {
        var view = this;
        var item = view._list.getItemByIndex(view.vo.clickIdx);
        if (item) {
            view.vo.clickIdx = -1;
            item.confirmCallbackHandler();
        }
    };
    AcLocTombAllianceInfoViewTab1.prototype.dispose = function () {
        var view = this;
        view._list = null;
        view._sortBtn = null;
        view._sortType = 1;
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVANTPK,view.update,view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LOCTOMB_FRESH, view.getrewardCallback, view);
        _super.prototype.dispose.call(this);
    };
    return AcLocTombAllianceInfoViewTab1;
}(CommonViewTab));
__reflect(AcLocTombAllianceInfoViewTab1.prototype, "AcLocTombAllianceInfoViewTab1");
//# sourceMappingURL=AcLocTombAllianceInfoViewTab1.js.map