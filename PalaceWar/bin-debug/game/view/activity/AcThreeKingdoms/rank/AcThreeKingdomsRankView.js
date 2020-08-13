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
var AcThreeKingdomsRankView = (function (_super) {
    __extends(AcThreeKingdomsRankView, _super);
    function AcThreeKingdomsRankView() {
        var _this = _super.call(this) || this;
        _this._tabHeight = 0;
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsRankView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsRankView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcThreeKingdomsRankView.prototype.getBgName = function () {
        return "public_9_bg92";
    };
    AcThreeKingdomsRankView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "threekingdomsrankview", "mldetailtarbarbg-1", "arena_bottom", "qingyuanitemtitlebg", "specialview_commoni_namebg", "alliance_taskwotdbg1",
            "collectflag", "commonview_bigframe", "common_titlebg", "public_textbrownbg", "threekingdomspranklistbg1", "threekingdomspranklistbg2", "threekingdomspranklistbg3"
        ]);
    };
    AcThreeKingdomsRankView.prototype.getTabbarTextArr = function () {
        var code = this.getUiCode();
        return ["acBattlePassTab1-" + code,
            "acBattlePassTab2-" + code,
            "acBattlePassTab3-" + code,
            "acBattlePassTab4-" + code
        ];
    };
    AcThreeKingdomsRankView.prototype.getRuleInfo = function () {
        return "acThreeKingdomsRankRule-" + this.getUiCode();
    };
    AcThreeKingdomsRankView.prototype.getTitleBgName = function () {
        return App.CommonUtil.getResByCode("threekingdomsrankviewtitle", this.getUiCode());
    };
    AcThreeKingdomsRankView.prototype.getTitleStr = function () {
        return null;
    };
    Object.defineProperty(AcThreeKingdomsRankView.prototype, "tabHeight", {
        get: function () {
            var view = this;
            return view._tabHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankView.prototype, "tabWidth", {
        get: function () {
            var view = this;
            return view.width;
        },
        enumerable: true,
        configurable: true
    });
    // 初始化tabbarGroup
    AcThreeKingdomsRankView.prototype.initTabbarGroup = function () {
        var tabBarTextArr = this.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(), tabBarTextArr, this.clickTabbarHandler, this, null, null, null, true);
            this.tabbarGroup.setSpace(0);
            var tabBarX = (this instanceof PopupView) ? 30 : 15;
            this.addChild(this.tabbarGroup);
            this.setTabBarPosition();
            this.container.y = this.getTitleButtomY();
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
            for (var i = 0; i < 4; ++i) {
                var unit = this.tabbarGroup.getTabBar(i);
                if (i > 0 && !this.vo.getMyKingdoms()) {
                    App.DisplayUtil.changeToGray(unit);
                }
            }
            // this.changeTab();
        }
    };
    AcThreeKingdomsRankView.prototype.checkTabCondition = function (index) {
        var view = this;
        if (index == 0) {
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
    AcThreeKingdomsRankView.prototype.getTabbarName = function () {
        var arr = [];
        for (var i = 1; i < 5; ++i) {
            arr.push("threekingdomsrankviewtab" + i);
        }
        return arr;
    };
    AcThreeKingdomsRankView.prototype.setTabBarPosition = function () {
        var view = this;
        if (view.tabbarGroup) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view.tabbarGroup, view.titleBg, [0, view.titleBg.height]);
        }
    };
    // 关闭按钮图标名称
    AcThreeKingdomsRankView.prototype.getCloseBtnName = function () {
        if (Api.switchVoApi.checkOpenShenheGame() && PlatformCfg.shenheFunctionName == this.getClassName().toLowerCase().replace("view", "")) {
            return "";
        }
        return ButtonConst.COMMON_CLOSE_1;
    };
    AcThreeKingdomsRankView.prototype.getRequestData = function () {
        return {
            requestType: NetRequestConst.REQUEST_THREEKINGDOMS_SEASONRANK,
            requestData: {
                activeId: this.acTivityId,
            }
        };
    };
    AcThreeKingdomsRankView.prototype.receiveData = function (data) {
        if (data.ret) {
            var rdata = data.data.data;
            this.vo.prankseasonarr = rdata;
        }
    };
    AcThreeKingdomsRankView.prototype.initView = function () {
        var view = this;
        var code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_PRANK), view.prankCallback, view);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_ZRANK), view.zrankCallback, view);
        // NetManager.request(NetRequestConst.REQUEST_MAINLAND_PRANK,{
        //     activeId : view.acTivityId, 
        // });
        // NetManager.request(NetRequestConst.REQUEST_MAINLAND_ZRANK,{
        //     activeId : view.acTivityId, 
        // });
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE,view.hide,view);
        var tarbg = BaseBitmap.create("mldetailtarbarbg-1");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tarbg, view.titleBg, [0, view.titleBg.height]);
        view.addChildAt(tarbg, view.getChildIndex(view.tabbarGroup) - 1);
        view._tabHeight = view.height - tarbg.y - tarbg.height;
        var tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if (tab) {
            view.clickTabbarHandler({ index: tab - 1 });
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
        this.bigframe.height = GameConfig.stageHeigth - this.container.y + 60;
        this.bigframe.y = -60;
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
        view.tick();
    };
    AcThreeKingdomsRankView.prototype.tick = function () {
        var view = this;
        if (view.vo.getpublicRedhot4()) {
            view.tabbarGroup.addRedPoint(1);
        }
        else {
            view.tabbarGroup.removeRedPoint(1);
        }
        if (view.vo.getpublicRedhot6()) {
            view.tabbarGroup.addRedPoint(2);
        }
        else {
            view.tabbarGroup.removeRedPoint(2);
        }
        if (view.vo.getpublicRedhot8()) {
            view.tabbarGroup.addRedPoint(3);
        }
        else {
            view.tabbarGroup.removeRedPoint(3);
        }
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
    AcThreeKingdomsRankView.prototype.getBigFrame = function () {
        return "commonview_bigframe";
    };
    AcThreeKingdomsRankView.prototype.dispose = function () {
        var view = this;
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_PRANK), view.prankCallback, view);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_ZRANK), view.zrankCallback, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE, view.hide, view);
        view._tabHeight = 0;
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsRankView;
}(CommonView));
__reflect(AcThreeKingdomsRankView.prototype, "AcThreeKingdomsRankView");
//# sourceMappingURL=AcThreeKingdomsRankView.js.map