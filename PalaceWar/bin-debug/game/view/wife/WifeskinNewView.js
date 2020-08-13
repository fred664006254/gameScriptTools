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
/**
 * 红颜换皮肤界面
 * author qianjun
 * date 2018/3/2
 * @class WifeskinView
 */
var WifeskinNewView = (function (_super) {
    __extends(WifeskinNewView, _super);
    function WifeskinNewView() {
        return _super.call(this) || this;
    }
    WifeskinNewView.prototype.getTabbarTextArr = function () {
        return [
            "wifeskintab1",
            "wifeskintab2"
        ];
    };
    // 初始化tabbarGroup
    WifeskinNewView.prototype.initTabbarGroup = function () {
        var tabBarTextArr = this.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(), tabBarTextArr, this.clickTabbarHandler, this, null, TabBarGroup.ALIGN_VERTICAL, null, true);
            this.tabbarGroup.setSpace(0);
            var tabBarX = (this instanceof PopupView) ? 30 : 15;
            this.addChild(this.tabbarGroup);
            this.setTabBarPosition();
            this.container.y = this.getTitleButtomY();
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
            // this.changeTab();
        }
    };
    WifeskinNewView.prototype.changeTab = function () {
        _super.prototype.changeTab.call(this);
        this.setChildIndex(this.tabbarGroup, 999);
    };
    WifeskinNewView.prototype.getTitleButtomY = function () {
        return 89;
    };
    WifeskinNewView.prototype.setTabBarPosition = function () {
        _super.prototype.setTabBarPosition.call(this);
        this.tabbarGroup.x = GameConfig.stageWidth - this.tabbarGroup.width;
        this.tabbarGroup.y = this.titleBg.y + this.titleBg.height + 100;
    };
    // 页签图名称
    WifeskinNewView.prototype.getTabbarName = function () {
        var arr = [];
        for (var i = 1; i < 3; ++i) {
            arr.push("wifeskintab" + i);
        }
        return arr;
    };
    WifeskinNewView.prototype.checkTabCondition = function (index) {
        var view = this;
        var id = this.param.data.id;
        if (index == 1) {
            var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(id);
            var canlevelup = false;
            if (wifeSkinVo && wifeSkinVo.skin) {
                for (var i in wifeSkinVo.skin) {
                    var wifeskincfg = Config.WifeskinCfg.getWifeCfgById(i);
                    if (wifeskincfg && wifeskincfg.levelUp) {
                        for (var j in wifeskincfg.levelUp) {
                            var unit = wifeskincfg.levelUp[j];
                            if (unit && typeof unit.levelUpUnlock == "number" && Number(unit.levelUpUnlock) > 0) {
                                canlevelup = true;
                                break;
                            }
                        }
                        if (canlevelup) {
                            break;
                        }
                    }
                }
            }
            if (canlevelup) {
                return true;
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("wifeskinleveluptip6"));
                return false;
            }
        }
        else {
            return true;
        }
    };
    WifeskinNewView.prototype.getTitleStr = function () {
        return "wifeskinViewTitle";
    };
    WifeskinNewView.prototype.tick = function () {
        var view = this;
        var id = this.param.data.id;
        var wifecfg = Config.WifeCfg.getWifeCfgById(id);
        var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(id);
        var canlevelup = false;
        var haveskin = false;
        if (wifeSkinVo && wifeSkinVo.skin) {
            for (var i in wifeSkinVo.skin) {
                var wifeskincfg = Config.WifeskinCfg.getWifeCfgById(i);
                if (wifeskincfg && wifeskincfg.levelUp) {
                    if (Api.wifeSkinVoApi.getSkinOneRed(id, wifeskincfg.id)) {
                        canlevelup = true;
                    }
                    for (var j in wifeskincfg.levelUp) {
                        var unit = wifeskincfg.levelUp[j];
                        if (unit && typeof unit.levelUpUnlock == "number" && Number(unit.levelUpUnlock) > 0) {
                            haveskin = true;
                            break;
                        }
                    }
                }
            }
        }
        if (haveskin) {
            view.tabbarGroup.setLocked(1, false);
        }
        else {
            view.tabbarGroup.setLocked(1, true);
        }
        //红点
        // let tabview : any = this.tabViewData[0];
        // if(tabview && tabview._skinId){
        // 	if(Api.wifeSkinVoApi.getSkinOneRed(id, tabview._skinId)){
        // 		canlevelup = true;
        // 	}
        // }
        if (canlevelup) {
            view.tabbarGroup.addRedPoint(0);
            view.tabbarGroup.setRedPos(0, 70, 0);
        }
        else {
            view.tabbarGroup.removeRedPoint(0);
        }
    };
    WifeskinNewView.prototype.initView = function () {
        var view = this;
        view.tick();
        // let tarbg = BaseBitmap.create(`wifeskintabbg`);
        // tarbg.width = GameConfig.stageWidth;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHILD_GUIDE, view.doGuide, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIFENEWSKIN_CHANGESKIN, view.tick, view);
        //view.tabbarGroup.x = (GameConfig.stageWidth - view.tabbarGroup.width) / 2;
        // tarbg.x= 0;
        // tarbg.y = 87;
        // view.addChildAt(tarbg, view.getChildIndex(view.tabbarGroup)-1);
    };
    WifeskinNewView.prototype.clickTabbarHandler = function (data) {
        App.LogUtil.log("index: " + data.index);
        var index = Number(data.index);
        if (this.tabViewData[1 - index]) {
            this.tabViewData[1 - index].clearDB();
        }
        _super.prototype.clickTabbarHandler.call(this, data);
    };
    WifeskinNewView.prototype.clickChangeToBg = function (bgid) {
        var view = this;
        view.clickTabbarHandler({ index: 1 });
        view.selectedTabIndex = 1;
        view.tabbarGroup.selectedIndex = 1;
        var tabview = this.tabViewData[this.selectedTabIndex];
        if (tabview) {
            tabview.changeSelect(bgid);
        }
    };
    WifeskinNewView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifeview_namebg", "wifeview_namebg", "wifeview_bottombg2", "wifeskin_descbg", "wifeskin_barbg", "wifeskin_bottombg", "tailor_iconBtn", "tailor_iconBtn_down", "wifeview_in", "wifeview_noget", "wifeview_skingetbg",
            "wifeskintab1", "wifeskintab1_down", "skin_box_namebg", "acliangbiographyview_common_acbg", "skin_detail_probg", "skin_detail_pronamebg", "wifeskintabbg", "wifeskinrope", "wifeskinropetop", "mlservantselected-1", "wifebgitemmask", "wifeskintab2", "wifeskintab2_down",
        ]);
    };
    WifeskinNewView.prototype.getRuleInfo = function () {
        return "wifeskin_description_wifeskinlevelup";
    };
    WifeskinNewView.prototype.doGuide = function () {
        this.hide();
    };
    WifeskinNewView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SERVANTBONE);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHILD_GUIDE, this.doGuide, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIFENEWSKIN_CHANGESKIN, view.tick, view);
        _super.prototype.dispose.call(this);
    };
    return WifeskinNewView;
}(CommonView));
__reflect(WifeskinNewView.prototype, "WifeskinNewView");
//# sourceMappingURL=WifeskinNewView.js.map