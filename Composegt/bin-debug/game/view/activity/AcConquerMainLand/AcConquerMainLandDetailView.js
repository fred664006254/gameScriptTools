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
    AcConquerMainLandDetailView.prototype.getBgName = function () {
        return "commonview_woodbg";
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
            'commonview_border2', 'popupview_bg3', 'commonview_bottom', 'commonview_border1', "commonview_woodbg",
            'mainland_detailtab1_topbg', 'mainland_detailtab1_itembg', 'mainland_detailtab1_itemtitle',
            "mainland_detailtab1_itemround", 'mainland_detailtab1_itemtop', "mainland_detail_shengzi",
            "rechargevie_db_01", "public_v_huawen01", "acarrowfirsttop", "commonview_border3",
            "accrossserverwipeboss_rankbg", "accrossserverwipeboss_rank1",
            "servant_cardbg_0", "progress_type3_bg", "progress_type1_yellow2", "btn_lookdetail",
            "wifeview_bottombg", "mltaskmidbg-" + code, "activity_charge_red", "collectflag", "arena_bottom",
            "alliance_taskAttrbg2", "alliance_taskAttrbg1", "mainlandinfight" + code + "-",
            "mainland_armystate_redtitle"
        ]);
    };
    AcConquerMainLandDetailView.prototype.getTabbarTextArr = function () {
        var code = this.getUiCode();
        var arr = [
            "acConquerMainDetailTab1-" + code,
            "acConquerMainDetailTab2-" + code,
        ];
        if (this.vo.isCanJoin()) {
            arr = arr.concat([
                "acConquerMainDetailTab3-" + code,
                "acConquerMainDetailTab4-" + code
            ]);
        }
        return arr;
    };
    AcConquerMainLandDetailView.prototype.getTabbarGroupY = function () {
        return 10;
    };
    AcConquerMainLandDetailView.prototype.getRuleInfo = function () {
        return "AcConquerMainLandRule-" + this.getUiCode();
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
        //先初始化边界
        var border = BaseBitmap.create("commonview_border1");
        var bottom = BaseBitmap.create("commonview_bottom");
        border.width = GameConfig.stageWidth;
        border.height = GameConfig.stageHeigth - 69;
        border.x = 0;
        border.y = GameConfig.stageHeigth - border.height;
        this.addChild(border);
        bottom.x = 0;
        bottom.y = GameConfig.stageHeigth - bottom.height;
        this.addChild(bottom);
        var tabBarTextArr = this.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            //有问题
            this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(), tabBarTextArr, this.clickTabbarHandler, this, null, true);
            this.tabbarGroup.setSpace(10);
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
        return arr;
    };
    AcConquerMainLandDetailView.prototype.setTabBarPosition = function () {
        var view = this;
        if (view.tabbarGroup) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view.tabbarGroup, view.titleBg, [8, view.titleBg.height + 12]);
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
        view.tick();
    };
    AcConquerMainLandDetailView.prototype.tick = function () {
        var view = this;
    };
    AcConquerMainLandDetailView.prototype.prankCallback = function (evt) {
        var view = this;
        if (evt.data.data.data) {
            view.vo.setPrankinfo(evt.data.data.data);
        }
    };
    AcConquerMainLandDetailView.prototype.zrankCallback = function (evt) {
        var view = this;
        if (evt.data.data.data) {
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
