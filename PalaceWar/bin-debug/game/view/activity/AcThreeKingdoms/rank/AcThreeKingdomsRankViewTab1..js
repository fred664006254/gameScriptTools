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
var AcThreeKingdomsRankViewTab1 = (function (_super) {
    __extends(AcThreeKingdomsRankViewTab1, _super);
    function AcThreeKingdomsRankViewTab1(data) {
        var _this = _super.call(this) || this;
        _this._tabHeight = 0;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsRankViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab1.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab1.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsRankViewTab1.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcThreeKingdomsRankViewTab1.prototype.getTabbarTextArr = function () {
        var arr = [];
        for (var i = 1; i < 5; ++i) {
            arr.push(App.CommonUtil.getCnByCode("acThreeKingdomsRank1Tab" + i, this.getUiCode()));
        }
        return arr;
    };
    Object.defineProperty(AcThreeKingdomsRankViewTab1.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsRankViewTab1.prototype.checkTabCondition = function (index) {
        var view = this;
        if (index < 3) {
            return true;
        }
        if (view.vo.getMyKingdoms()) {
            return true;
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("acThreeKingdomsTip43-" + view.getUiCode()));
            return false;
        }
    };
    // 页签图名称
    AcThreeKingdomsRankViewTab1.prototype.getTabbarName = function () {
        return ButtonConst.BTN_TAB2;
    };
    AcThreeKingdomsRankViewTab1.prototype.addTabbarGroupBg = function () {
        return true;
    };
    // protected setTabBarPosition():void
    // {
    // 	if(this.tabbarGroup)
    // 	{
    // 		let tabX:number=0;
    // 		let tabY:number=0;
    // 		if(egret.is(this,"PopupView"))
    // 		{
    // 			tabX=this.viewBg.x+30;
    // 			tabY=this.viewBg.y+60;
    // 		}
    // 		else
    // 		{
    // 			tabX=15;
    // 			tabY=this.titleBg?this.titleBg.y+this.titleBg.height+8:100;
    // 		}
    // 		tabY+=(this.getTabbarGroupY()+3-16);
    // 		this.tabbarGroup.setPosition((this.width - this.tabbarGroup.width)/2,tabY);
    // 		if(this.tabbarGroupBg){
    // 			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this.tabbarGroupBg, this.tabbarGroup, [-0,-8 + 16]);
    // 		}
    // 	}
    // }
    AcThreeKingdomsRankViewTab1.prototype.getBigFrame = function () {
        return "commonview_bigframe";
    };
    AcThreeKingdomsRankViewTab1.prototype.initView = function () {
        var view = this;
        var baseview = ViewController.getInstance().getView(ViewConst.COMMON.ACTHREEKINGDOMSRANKVIEW);
        view.height = baseview.tabHeight;
        view.width = baseview.tabWidth;
        view.initTabbarGroup();
        var tabArr = this.getTabbarTextArr();
        if (tabArr && tabArr.length > 0) {
            this.changeTab();
        }
        for (var i = 0; i < 4; ++i) {
            var unit = view.tabbarGroup.getTabBar(i);
            unit.x = 150 * i;
            if (i > 2 && !this.vo.getMyKingdoms()) {
                App.DisplayUtil.changeToGray(unit);
            }
        }
        this.tabbarGroupBg.x = 10;
        this.tabbarGroupBg.y = 4;
        this.tabbarGroup.setColor(0xe1ba86, 0x472c26);
    };
    AcThreeKingdomsRankViewTab1.prototype.setTabBarPosition = function () {
        this.tabbarGroup.x = 20;
        this.tabbarGroup.y = -5;
    };
    AcThreeKingdomsRankViewTab1.prototype.getTabbarGroupY = function () {
        return this.tabbarGroup.y + this.tabbarGroup.height - this.y;
    };
    AcThreeKingdomsRankViewTab1.prototype.rewardCallBack = function (evt) {
        var view = this;
        // let rData = evt.data.data.data;
        // if(!rData){
        //     App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
        //     return;
        // }
        // let rewards = rData.rewards;
        // let cfg = view.cfg.recharge[view.vo.lastidx];
        // let str = `1011_0_${cfg.specialItem}_${this.code}|` + rewards;
        // let rewardList =  GameData.formatRewardItem(str);
        // let pos = this.vo.lastpos;
        // App.CommonUtil.playRewardFlyAction(rewardList,pos);
        // this.vo.lastidx = null;
    };
    AcThreeKingdomsRankViewTab1.prototype.update = function () {
        // let view = this;
        // if(!view.vo){
        // 	return;
        // }
        // let arr = view.updateArr(view.vo.getArr("recharge"));
        // view._scrollList.refreshData(arr,view.code);
    };
    AcThreeKingdomsRankViewTab1.prototype.dispose = function () {
        var view = this;
        view._tabHeight = 0;
        // App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ARENACHARGE),this.rewardCallBack,this);
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsRankViewTab1;
}(CommonViewTab));
__reflect(AcThreeKingdomsRankViewTab1.prototype, "AcThreeKingdomsRankViewTab1");
//# sourceMappingURL=AcThreeKingdomsRankViewTab1..js.map