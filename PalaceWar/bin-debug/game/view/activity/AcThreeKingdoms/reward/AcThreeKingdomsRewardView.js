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
var AcThreeKingdomsRewardView = (function (_super) {
    __extends(AcThreeKingdomsRewardView, _super);
    function AcThreeKingdomsRewardView() {
        var _this = _super.call(this) || this;
        _this._tabHeight = 0;
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsRewardView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRewardView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRewardView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRewardView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRewardView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsRewardView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    Object.defineProperty(AcThreeKingdomsRewardView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    // 关闭按钮图标名称
    AcThreeKingdomsRewardView.prototype.getCloseBtnName = function () {
        if (Api.switchVoApi.checkOpenShenheGame() && PlatformCfg.shenheFunctionName == this.getClassName().toLowerCase().replace("view", "")) {
            return "";
        }
        return ButtonConst.COMMON_CLOSE_1;
    };
    AcThreeKingdomsRewardView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "tombrewardrankbg-1", "arena_bottom"
        ]);
    };
    AcThreeKingdomsRewardView.prototype.getTabbarTextArr = function () {
        var arr = [];
        for (var i = 1; i < 5; ++i) {
            arr.push(App.CommonUtil.getCnByCode("acThreeKingdomsRank1Tab" + i, this.getUiCode()));
        }
        return arr;
    };
    AcThreeKingdomsRewardView.prototype.getRuleInfo = function () {
        return "acThreeKingdomsRewardRule-" + this.getUiCode();
    };
    AcThreeKingdomsRewardView.prototype.getTitleBgName = function () {
        return App.CommonUtil.getResByCode("threekingdomsrankviewtitle", this.getUiCode());
    };
    AcThreeKingdomsRewardView.prototype.getTitleStr = function () {
        return null;
    };
    Object.defineProperty(AcThreeKingdomsRewardView.prototype, "tabHeight", {
        get: function () {
            var view = this;
            return view._tabHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRewardView.prototype, "tabWidth", {
        get: function () {
            var view = this;
            return view.width;
        },
        enumerable: true,
        configurable: true
    });
    // 页签图名称
    AcThreeKingdomsRewardView.prototype.getTabbarName = function () {
        return ButtonConst.BTN_TAB2;
    };
    AcThreeKingdomsRewardView.prototype.addTabbarGroupBg = function () {
        return true;
    };
    AcThreeKingdomsRewardView.prototype.getBigFrame = function () {
        return "commonview_bigframe";
    };
    AcThreeKingdomsRewardView.prototype.getBgName = function () {
        return "public_9_bg92";
    };
    AcThreeKingdomsRewardView.prototype.setTabBarPosition = function () {
        _super.prototype.setTabBarPosition.call(this);
        this.tabbarGroupBg.x = 5;
        this.tabbarGroupBg.y = 95;
    };
    AcThreeKingdomsRewardView.prototype.getContainerY = function () {
        return 152;
    };
    AcThreeKingdomsRewardView.prototype.getRequestData = function () {
        return {
            requestType: NetRequestConst.REQUEST_THREEKINGDOMS_GETRANK,
            requestData: {
                activeId: this.acTivityId,
                round: this.vo.getCurWeek()
            }
        };
    };
    AcThreeKingdomsRewardView.prototype.receiveData = function (data) {
        if (data.ret) {
            var rdata = data.data.data;
            this.vo.prankroundarr = rdata;
        }
    };
    AcThreeKingdomsRewardView.prototype.initView = function () {
        var view = this;
        var code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        view._tabHeight = view.height - view.tabbarGroup.y - view.tabbarGroup.height;
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_PRANK), view.prankCallback, view);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_ZRANK), view.zrankCallback, view);
        // NetManager.request(NetRequestConst.REQUEST_MAINLAND_PRANK,{
        //     activeId : view.acTivityId, 
        // });
        // NetManager.request(NetRequestConst.REQUEST_MAINLAND_ZRANK,{
        //     activeId : view.acTivityId, 
        // });
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE,view.hide,view);
        for (var i = 0; i < 4; ++i) {
            var unit = view.tabbarGroup.getTabBar(i);
            unit.x = 150 * i;
        }
        var tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if (tab) {
            view.clickTabbarHandler({ index: tab - 1 });
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
        // if(view.vo.getpublicRedhot1()){
        //     view.tabbarGroup.addRedPoint(2)
        // }
        // else{
        //     view.tabbarGroup.removeRedPoint(2)
        // }
        // if(view.vo.getpublicRedhot3()){
        //     view.tabbarGroup.addRedPoint(3)
        // }
        // else{
        //     view.tabbarGroup.removeRedPoint(3)
        // }
        // view.tick();
    };
    AcThreeKingdomsRewardView.prototype.closeHandler = function () {
        var baseview = ViewController.getInstance().getView('AcThreeKingdomsRankView');
        if (baseview) {
            baseview.hide();
        }
        this.hide();
    };
    // private prankCallback(evt : egret.Event):void{
    //     let view = this;
    //     if(evt.data.data.data){
    //         view.vo.setPrankinfo(evt.data.data.data);
    //     }
    // }
    // private zrankCallback(evt : egret.Event):void{
    //     let view = this;
    //     if(evt.data.data.data){
    //         view.vo.setZrankinfo(evt.data.data.data);
    //     }
    // }
    AcThreeKingdomsRewardView.prototype.dispose = function () {
        var view = this;
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_PRANK), view.prankCallback, view);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_ZRANK), view.zrankCallback, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE, view.hide, view);
        view._tabHeight = 0;
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsRewardView;
}(CommonView));
__reflect(AcThreeKingdomsRewardView.prototype, "AcThreeKingdomsRewardView");
//# sourceMappingURL=AcThreeKingdomsRewardView.js.map