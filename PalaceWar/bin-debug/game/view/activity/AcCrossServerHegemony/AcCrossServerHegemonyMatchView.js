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
 *
 * desc:奖励弹窗
*/
var AcCrossServerHegemonyMatchView = (function (_super) {
    __extends(AcCrossServerHegemonyMatchView, _super);
    function AcCrossServerHegemonyMatchView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcCrossServerHegemonyMatchView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerHegemonyMatchView.prototype.getRequestData = function () {
        if (this.param.data.aid && this.param.data.code) {
            return { requestType: NetRequestConst.REQUEST_ACHEGEMONY_GETWEEDOUTINFO, requestData: { activeId: this.param.data.aid + "-" + this.param.data.code } };
        }
        // return null;
    };
    AcCrossServerHegemonyMatchView.prototype.receiveData = function (data) {
        if (!data.ret) {
            return;
        }
        var pkinfo = data.data.data.pkinfo;
        // console.log(pkinfo);
        if (pkinfo) {
            Api.crossServerHegemonyVoApi.setPkinfo(pkinfo);
        }
    };
    AcCrossServerHegemonyMatchView.prototype.getTabbarTextArr = function () {
        var status = this.vo.getCurStatus();
        // if(status == 15){
        //     return [
        //         "acCrossServerHegemonyMatchTab1",
        //         "acCrossServerHegemonyMatchTab2",
        //         "acCrossServerHegemonyMatchTab3",
        //         "acCrossServerHegemonyMatchTab5",
        //     ];
        // } else {
        //     return [
        //         "acCrossServerHegemonyMatchTab1",
        //         "acCrossServerHegemonyMatchTab2",
        //         "acCrossServerHegemonyMatchTab3",
        //         "acCrossServerHegemonyMatchTab4",
        //     ];
        // }
        return [
            "acCrossServerHegemonyMatchTab1",
            "acCrossServerHegemonyMatchTab2",
            "acCrossServerHegemonyMatchTab3",
            "acCrossServerHegemonyMatchTab6",
        ];
    };
    Object.defineProperty(AcCrossServerHegemonyMatchView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerHegemonyMatchView.prototype.getBigFrame = function () {
        return "commonview_bigframe";
    };
    AcCrossServerHegemonyMatchView.prototype.addTabbarGroupBg = function () {
        return true;
    };
    AcCrossServerHegemonyMatchView.prototype.getCloseBtnName = function () {
        return ButtonConst.COMMON_CLOSE_1;
    };
    AcCrossServerHegemonyMatchView.prototype.tick = function () {
        // console.log(this.tabViewData);
        // 	console.log(1111);
        for (var key in this.tabViewData) {
            this.tabViewData[key].tick();
        }
    };
    AcCrossServerHegemonyMatchView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "accshegemony_matchfirstbg",
            "accshegemony_matchfirsttitle",
            "accshegemony_matchfirst_lightbg",
            "accshegemony_matchlastbg",
            "accshegemony_matchline",
            "accshegemony_matchline1_1",
            "accshegemony_matchline1_2",
            "accshegemony_matchline1_3",
            "accshegemony_matchline2_1",
            "accshegemony_matchline2_2",
            "accshegemony_matchline2_3",
            "accshegemony_matchline3_1",
            "accshegemony_matchline3_2",
            "accshegemony_matchline3_3",
            "accshegemony_matchline4_1",
            "accshegemony_matchline4_2",
            "accshegemony_matchline4_3",
            "accshegemony_matchline4_5",
            "accshegemony_matchnamebg1",
            "accshegemony_matchnamebg2",
            "accshegemony_matchredbg",
            "achegemonymatch_titlebg-1",
            "achegemonymatch_bg-1",
        ]);
    };
    // 背景图名称
    AcCrossServerHegemonyMatchView.prototype.getBgName = function () {
        return ResourceManager.hasRes("achegemonymatch_bg-" + this.param.data.code) ? "achegemonymatch_bg-" + this.param.data.code : "achegemonymatch_bg-1";
    };
    AcCrossServerHegemonyMatchView.prototype.getTitleBgName = function () {
        return ResourceManager.hasRes("achegemonymatch_titlebg-" + this.param.data.code) ? "achegemonymatch_titlebg-" + this.param.data.code : "achegemonymatch_titlebg-1";
    };
    AcCrossServerHegemonyMatchView.prototype.getTitleStr = function () {
        return "";
    };
    AcCrossServerHegemonyMatchView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcCrossServerHegemonyMatchView.prototype.initView = function () {
        App.LogUtil.log("matchview initView");
        this.tabbarGroup.setSpace(0);
        this.setTabBarPosition();
        this.tabbarGroup.x = GameConfig.stageWidth / 2 - this.tabbarGroup.width / 2;
        this.tabbarGroup.y = this.titleBg.y + this.titleBg.height - 12;
        if (this.tabbarGroupBg) {
            this.tabbarGroupBg.x = GameConfig.stageWidth / 2 - this.tabbarGroupBg.width / 2;
            this.tabbarGroupBg.y = this.titleBg.y + this.titleBg.height - 3;
        }
        this.setBigFameY(-(this.tabbarGroup.y + this.tabbarGroup.height));
        this.setBigFameHeight(GameConfig.stageHeigth - 5);
        var tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if (tab) {
            this.clickTabbarHandler({ index: tab - 1 });
            this.selectedTabIndex = tab - 1;
            this.tabbarGroup.selectedIndex = tab - 1;
        }
    };
    AcCrossServerHegemonyMatchView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonyMatchView;
}(CommonView));
__reflect(AcCrossServerHegemonyMatchView.prototype, "AcCrossServerHegemonyMatchView");
//# sourceMappingURL=AcCrossServerHegemonyMatchView.js.map