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
 * 才情分页签
 * author qianjun
 */
var WifeTalentView = (function (_super) {
    __extends(WifeTalentView, _super);
    function WifeTalentView() {
        return _super.call(this) || this;
    }
    WifeTalentView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["acsweetgift_make_infobg-1", "progress3", "progress3_bg", "qingyuanitemtitlebg",
            "wifebattleview_updown",
            "qingyuanitemtitlebg",
            "wifestatus_headbg",
            "wifestatus_namebg",
            "wifetalentnumbg",
            "wifetalenttopbg",
            "wifetalentbg2",
            "wifetalentbg1",
            "wifeview_artistryicon"
        ]);
    };
    WifeTalentView.prototype.initView = function () {
        var view = this;
        if (this.checkHaveBuff()) {
            var key = "wifebattleactivity-" + Api.playerVoApi.getPlayerID();
            var storage = LocalStorageManager.get(key);
            LocalStorageManager.set(key, "1");
        }
        var bottomBg = BaseLoadBitmap.create("servant_bottombg");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth - 75;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - this.getTitleButtomY();
        this.addChildToContainer(bottomBg);
        var tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if (tab) {
            view.clickTabbarHandler({ index: tab - 1 });
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
    };
    WifeTalentView.prototype.checkHaveBuff = function () {
        var modelList = Api.acVoApi.getRanActives();
        for (var i in modelList) {
            var unit = modelList[i];
            if (unit.atype == "22") {
                var t = unit.et - GameData.serverTime - 86400 * 1;
                if (t > 0) {
                    return true;
                }
            }
        }
        return false;
    };
    WifeTalentView.prototype.getTabbarTextArr = function () {
        var tabArr = [
            "wifeTalentPlusPopupViewTab1",
            "wifeTalentPlusPopupViewTab2",
        ];
        if (this.checkHaveBuff()) {
            tabArr.push("wifeTalentPlusPopupViewTab3");
        }
        return tabArr;
    };
    WifeTalentView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return WifeTalentView;
}(CommonView));
__reflect(WifeTalentView.prototype, "WifeTalentView");
//# sourceMappingURL=WifeTalentView.js.map