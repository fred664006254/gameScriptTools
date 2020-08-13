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
var AcSingleDay2019DetailView = (function (_super) {
    __extends(AcSingleDay2019DetailView, _super);
    function AcSingleDay2019DetailView() {
        var _this = _super.call(this) || this;
        _this._tabHeight = 0;
        return _this;
    }
    AcSingleDay2019DetailView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    Object.defineProperty(AcSingleDay2019DetailView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019DetailView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019DetailView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019DetailView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019DetailView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcSingleDay2019DetailView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "specialview_commoni_namebg", "newsingledaytab2topbg-" + code, "newsingledaytab2bg-" + code, "newsingledaytab2bottombg-" + code, "acmidautumnview_titlebg", "progress3", "progress3_bg",
            "activity_rank_rightBg", "newsingledaytab3bg-" + code, "acsingleday_skinbg1_1",
            "acsingleday_skinbg1_2",
            "acsingleday_skinbg2_1", "servant_detailBtn", "servant_detailBtn_down",
            "acsingleday_skinbg2_2",
            "acsingleday_skinitemIconbg", "acarcadeview_fire1", "acsearchproofview_common_skintxt", "acwealthcarpview_skineffect1",
            "acsingleday_skinnamebg",
            "acsingleday_skinnameb2", "tailor_get_light", "common_shopmark", "shopview_line", "acsingledayitembg", "shopview_corner"
        ]);
    };
    AcSingleDay2019DetailView.prototype.getTabbarTextArr = function () {
        var code = this.getUiCode();
        return ['1', '2', '3', '4', '5'];
    };
    AcSingleDay2019DetailView.prototype.getRuleInfo = function () {
        return null;
    };
    AcSingleDay2019DetailView.prototype.getTitleStr = function () {
        return null;
    };
    AcSingleDay2019DetailView.prototype.getTitleBgName = function () {
        return null;
    };
    AcSingleDay2019DetailView.prototype.getBgName = function () {
        return "newsingledaydetaiilbg-" + this.getUiCode();
    };
    Object.defineProperty(AcSingleDay2019DetailView.prototype, "tabHeight", {
        get: function () {
            var view = this;
            return view._tabHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019DetailView.prototype, "tabWidth", {
        get: function () {
            var view = this;
            return view.width;
        },
        enumerable: true,
        configurable: true
    });
    // 初始化tabbarGroup
    AcSingleDay2019DetailView.prototype.initTabbarGroup = function () {
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
    AcSingleDay2019DetailView.prototype.getTabbarName = function () {
        var arr = [];
        for (var i = 1; i <= 5; ++i) {
            arr.push("newsingledaytab" + i + "-" + this.getUiCode());
        }
        return arr;
    };
    AcSingleDay2019DetailView.prototype.setTabBarPosition = function () {
        var view = this;
        if (view.tabbarGroup) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view.tabbarGroup, view);
        }
    };
    AcSingleDay2019DetailView.prototype.getRequestData = function () {
        return {
            requestType: NetRequestConst.REQUEST_ACTIVITY_SDNEWGETRANK,
            requestData: {
                activeId: this.acTivityId
            }
        };
    };
    AcSingleDay2019DetailView.prototype.receiveData = function (data) {
        if (data.data.data) {
            this.vo.setRankInfo(data.data.data);
        }
    };
    AcSingleDay2019DetailView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
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
        var tarbg = BaseBitmap.create("newsingledaytabbg-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tarbg, view);
        view.addChildAt(tarbg, view.getChildIndex(view.tabbarGroup) - 1);
        view._tabHeight = view.height - tarbg.y - tarbg.height;
        var tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if (tab) {
            view.clickTabbarHandler({ index: tab - 1 });
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
        view.freshView();
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
    AcSingleDay2019DetailView.prototype.freshView = function () {
        var view = this;
        if (view.vo.getpublicRedhot1()) {
            view.tabbarGroup.addRedPoint(0);
        }
        else {
            view.tabbarGroup.removeRedPoint(0);
        }
        if (view.vo.getpublicRedhot2()) {
            view.tabbarGroup.addRedPoint(1);
        }
        else {
            view.tabbarGroup.removeRedPoint(1);
        }
    };
    AcSingleDay2019DetailView.prototype.hide = function () {
        var view = this;
        var tabview = view.tabViewData[0];
        if (tabview && tabview.getStop()) {
            return;
        }
        _super.prototype.hide.call(this);
    };
    AcSingleDay2019DetailView.prototype.clickTabbarHandler = function (data) {
        var view = this;
        var tabview = view.tabViewData[0];
        if (tabview && tabview.getStop()) {
            view.selectedTabIndex = 0;
            view.tabbarGroup.selectedIndex = 0;
            return;
        }
        else {
            _super.prototype.clickTabbarHandler.call(this, data);
        }
    };
    AcSingleDay2019DetailView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_PRANK), view.prankCallback, view);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_ZRANK), view.zrankCallback, view);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE,view.hide,view);
        view._tabHeight = 0;
        _super.prototype.dispose.call(this);
    };
    return AcSingleDay2019DetailView;
}(CommonView));
__reflect(AcSingleDay2019DetailView.prototype, "AcSingleDay2019DetailView");
//# sourceMappingURL=AcSingleDay2019DetailView.js.map