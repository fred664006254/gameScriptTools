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
 * 皮肤
 * author yanyuling
 * date 2018/08/13
 * @class SkinView
 */
var SkinView = (function (_super) {
    __extends(SkinView, _super);
    function SkinView() {
        var _this = _super.call(this) || this;
        _this._skinNetData = undefined;
        return _this;
    }
    Object.defineProperty(SkinView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    SkinView.prototype.getContainerY = function () {
        return 0;
    };
    SkinView.prototype.getBigFrame = function () {
        return null;
    };
    SkinView.prototype.init = function () {
        if (Api.itemVoApi.getItemNumInfoVoById("1562") > 0 && Api.switchVoApi.checkOpenExchangeSkin()) {
            var showguide = LocalStorageManager.get(LocalStorageConst.LOCAL_GUIDE_SKIN + Api.playerVoApi.getPlayerID());
            if (!showguide || showguide == "") {
                Api.rookieVoApi.isInGuiding = true;
                Api.rookieVoApi.curGuideKey = "skin";
                ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW, { idx: "skin_1", f: null, o: this });
                this.selectedTabIndex = this.getTabbarTextArr().length - 1;
                LocalStorageManager.set(LocalStorageConst.LOCAL_GUIDE_SKIN + Api.playerVoApi.getPlayerID(), "1");
            }
        }
        _super.prototype.init.call(this);
    };
    SkinView.prototype.getTabbarTextArr = function () {
        var view = this;
        var topTab = [];
        if (Api.switchVoApi.checkOpenServantSkin()) {
            topTab.push("skinViewTab1");
        }
        if (!Api.switchVoApi.checkCloseWifeskin()) {
            topTab.push("skinViewTab2");
        }
        topTab.push("skinViewTab3");
        if (Api.switchVoApi.checkOpenExchangeSkin()) {
            topTab.push("skinViewTab4");
        }
        return topTab;
    };
    SkinView.prototype.getTabViewHeight = function () {
        return GameConfig.stageHeigth - this.tabbarGroup.y - this.tabbarGroup.height;
    };
    SkinView.prototype.initView = function () {
        // ViewController.getInstance().openView(ViewConst.COMMON.SKINLEVELUPVIEW,{skinId:"1011"});
        var toptabBg = BaseBitmap.create("dragonboattarbg");
        toptabBg.y = 81;
        this.addChild(toptabBg);
        this.setChildIndex(toptabBg, 3);
        var innerbg = BaseBitmap.create("public_9_bg20");
        innerbg.width = GameConfig.stageWidth - 4;
        innerbg.height = GameConfig.stageHeigth - toptabBg.y - toptabBg.height;
        innerbg.y = toptabBg.y + toptabBg.height;
        innerbg.x = 2;
        this.addChild(innerbg);
        this.tick();
        var index = 0;
        // this._curTabIdx = params.index;
        if (!Api.switchVoApi.checkOpenServantSkin()) {
            index++;
        }
        if (Api.switchVoApi.checkCloseWifeskin() && index > 1) {
            index++;
        }
        if (Api.rookieVoApi.curGuideKey != "skin") {
            this.selectedTabIndex = index;
        }
        //this.clickTabbarHandler({index : 0});
    };
    SkinView.prototype.clickTabbarHandler = function (data) {
        App.LogUtil.log("index: " + data.index);
        var index = Number(data.index);
        // this._curTabIdx = params.index;
        if (!Api.switchVoApi.checkOpenServantSkin()) {
            index++;
        }
        if (Api.switchVoApi.checkCloseWifeskin() && index > 0) {
            index++;
        }
        if (this.checkTabCondition(index) == false) {
            // 重新checkTabCondition方法处理
            this.tabbarGroup.selectedIndex = this.selectedTabIndex;
            return;
        }
        this.lastSelectedTabIndex = this.selectedTabIndex;
        this.selectedTabIndex = index;
        this.changeTab();
    };
    SkinView.prototype.receiveData = function (data) {
        if (data.ret) {
            var rData = data.data;
            if (rData.ret == 0) {
                this._skinNetData = rData.data;
            }
        }
    };
    SkinView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUST_CROSSSKIN_GETSKINFIRST, requestData: {} };
    };
    SkinView.prototype.getExtraRuleInfo = function () {
        var msg = "";
        if (Api.switchVoApi.checkOpenServantSkin()) {
            msg += LanguageManager.getlocal("skinviewrule1") + "\n\n";
        }
        if (!Api.switchVoApi.checkCloseWifeskin()) {
            msg += LanguageManager.getlocal("skinviewrule2") + "\n\n";
        }
        msg += LanguageManager.getlocal("skinviewrule3") + "\n\n";
        if (Api.switchVoApi.checkOpenExchangeSkin()) {
            msg += LanguageManager.getlocal("skinviewrule4") + "\n\n";
        }
        return msg;
    };
    SkinView.prototype.getRuleInfo = function () {
        return '1';
    };
    SkinView.prototype.tick = function () {
        if (Api.skinVoApi.checkNpcMessage2()) {
            this.tabbarGroup.addRedPoint(this.getTabbarTextArr().length - 1);
        }
        else {
            this.tabbarGroup.removeRedPoint(this.getTabbarTextArr().length - 1);
        }
    };
    SkinView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "skin_bottombg",
            "skin_box_namebg",
            "skin_boxbg", "skin_boxbg2", "dragonboattarbg",
            "skin_myskinInfobg",
            "skin_myskinInfobg2",
            "skin_mytab1_down",
            "skin_mytab1",
            "skin_exchange1",
            "skin_exchange2",
            "arena_bottom"
        ]);
    };
    SkinView.prototype.setTabBarPosition = function () {
        if (this.tabbarGroup) {
            var tabX = 0;
            var tabY = 0;
            tabX = 15;
            tabY = this.titleBg ? this.titleBg.y + this.titleBg.height + 8 - 20 : 100;
            tabY += 8;
            this.tabbarGroup.setPosition(tabX, tabY);
        }
    };
    SkinView.prototype.dispose = function () {
        this._skinNetData = null;
        _super.prototype.dispose.call(this);
    };
    return SkinView;
}(CommonView));
__reflect(SkinView.prototype, "SkinView");
//# sourceMappingURL=SkinView.js.map