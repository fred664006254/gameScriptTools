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
var AcConquerMainLandDetailView = (function (_super) {
    __extends(AcConquerMainLandDetailView, _super);
    function AcConquerMainLandDetailView() {
        var _this = _super.call(this) || this;
        _this._tabHeight = 0;
        return _this;
    }
    AcConquerMainLandDetailView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    Object.defineProperty(AcConquerMainLandDetailView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandDetailView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "aobaidescnamebg", "accrackerpopbg-1", "tombrewardrankbg-1", "wifeview_bottombg",
            "mltaskmidbg-" + code, "activity_charge_red", "progress3", "progress3_bg", "collectflag", "arena_bottom", "dinner_detail",
            "specialview_commoni_namebg", "alliance_taskAttrbg2", "alliance_taskAttrbg1", "alliance_taskAttrbg5", "servant_namebg", "mainlandinfight" + code + "-"
        ]);
    };
    AcConquerMainLandDetailView.prototype.getTabbarTextArr = function () {
        var code = this.getUiCode();
        return ["acBattlePassTab1-" + code,
            "acBattlePassTab2-" + code,
            "acBattlePassTab3-" + code,
            "acBattlePassTab4-" + code
        ];
    };
    AcConquerMainLandDetailView.prototype.getRuleInfo = function () {
        return this.vo.getThisCn("AcConquerMainLandRule");
    };
    AcConquerMainLandDetailView.prototype.getTitleStr = function () {
        return "acConquerMainLand-" + this.getUiCode() + "_Title";
    };
    Object.defineProperty(AcConquerMainLandDetailView.prototype, "tabHeight", {
        get: function () {
            var view = this;
            return view._tabHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailView.prototype, "tabWidth", {
        get: function () {
            var view = this;
            return view.width;
        },
        enumerable: true,
        configurable: true
    });
    // 初始化tabbarGroup
    AcConquerMainLandDetailView.prototype.initTabbarGroup = function () {
        var tabBarTextArr = this.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(), tabBarTextArr, this.clickTabbarHandler, this, null, null, null, true);
            this.tabbarGroup.setSpace(0);
            var tabBarX = (this instanceof PopupView) ? 30 : 15;
            this.addChild(this.tabbarGroup);
            this.setTabBarPosition();
            this.container.y = this.getTitleButtomY();
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
            // this.changeTab();
        }
    };
    // 页签图名称
    AcConquerMainLandDetailView.prototype.getTabbarName = function () {
        var arr = [];
        for (var i = 1; i < 5; ++i) {
            arr.push("mldetailtarbar" + i + "-" + this.getUiCode());
        }
        if (this.vo.checkIsJJL) {
            arr[arr.length - 1] = "mldetailtarbar5-" + this.getUiCode();
        }
        return arr;
    };
    AcConquerMainLandDetailView.prototype.setTabBarPosition = function () {
        var view = this;
        if (view.tabbarGroup) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view.tabbarGroup, view.titleBg, [0, view.titleBg.height]);
        }
    };
    AcConquerMainLandDetailView.prototype.getRequestData = function () {
        return {
            requestType: NetRequestConst.REQUEST_MAINLAND_GETMYTEAMINFO,
            requestData: {
                activeId: this.acTivityId
            }
        };
    };
    AcConquerMainLandDetailView.prototype.receiveData = function (data) {
        if (data.data.data) {
            this.vo.setMyTeamInfo(data.data.data.allteam);
            var score = 0;
            if (data.data.data.myscore && data.data.data.myscore.score) {
                score = data.data.data.myscore.score;
            }
            this.vo.setMyScore(score);
        }
    };
    AcConquerMainLandDetailView.prototype.initView = function () {
        var view = this;
        var code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_PRANK), view.prankCallback, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_ZRANK), view.zrankCallback, view);
        NetManager.request(NetRequestConst.REQUEST_MAINLAND_PRANK, {
            activeId: view.acTivityId,
        });
        NetManager.request(NetRequestConst.REQUEST_MAINLAND_ZRANK, {
            activeId: view.acTivityId,
        });
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE, view.hide, view);
        var tarbg = BaseBitmap.create("mldetailtarbarbg-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tarbg, view.titleBg, [0, view.titleBg.height]);
        view.addChildAt(tarbg, view.getChildIndex(view.tabbarGroup) - 1);
        view._tabHeight = view.height - tarbg.y - tarbg.height;
        var tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if (tab) {
            view.clickTabbarHandler({ index: tab - 1 });
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
        if (view.vo.getpublicRedhot1()) {
            view.tabbarGroup.addRedPoint(2);
        }
        else {
            view.tabbarGroup.removeRedPoint(2);
        }
        if (view.vo.getpublicRedhot3()) {
            view.tabbarGroup.addRedPoint(3);
        }
        else {
            view.tabbarGroup.removeRedPoint(3);
        }
        view.tick();
    };
    AcConquerMainLandDetailView.prototype.tick = function () {
        var view = this;
        if (view.vo.getpublicRedhot1() || view.vo.getpublicRedhot2()) {
            view.tabbarGroup.addRedPoint(2);
        }
        else {
            view.tabbarGroup.removeRedPoint(2);
        }
        if (view.vo.getpublicRedhot3()) {
            view.tabbarGroup.addRedPoint(3);
        }
        else {
            view.tabbarGroup.removeRedPoint(3);
        }
    };
    AcConquerMainLandDetailView.prototype.prankCallback = function (evt) {
        var view = this;
        if (evt.data.ret && evt.data.data.data) {
            view.vo.setPrankinfo(evt.data.data.data);
        }
    };
    AcConquerMainLandDetailView.prototype.zrankCallback = function (evt) {
        var view = this;
        if (evt.data.ret && evt.data.data.data) {
            view.vo.setZrankinfo(evt.data.data.data);
        }
    };
    AcConquerMainLandDetailView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_PRANK), view.prankCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_ZRANK), view.zrankCallback, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE, view.hide, view);
        view._tabHeight = 0;
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandDetailView;
}(CommonView));
__reflect(AcConquerMainLandDetailView.prototype, "AcConquerMainLandDetailView");
//# sourceMappingURL=AcConquerMainLandDetailView.js.map