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
var DailybossView = (function (_super) {
    __extends(DailybossView, _super);
    function DailybossView() {
        var _this = _super.call(this) || this;
        _this._scrollContiner = undefined;
        _this._infoTab = [];
        _this._bannerTab = [];
        return _this;
    }
    Object.defineProperty(DailybossView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    DailybossView.prototype.getContainerY = function () {
        return 14;
    };
    DailybossView.prototype.getBigFrame = function () {
        return null;
    };
    // protected getResourceList():string[]
    // {
    // 	let resArray:string[] = ["dailyboss_underway"];
    // 	for (let i:number = 0; i < this._infoTab.length; i++)
    // 	{
    // 		resArray.push("dailyboss_"+this._infoTab[i].name)
    // 	}
    // 	return super.getResourceList().concat(resArray);
    // }
    DailybossView.prototype.getRequestData = function () {
        var view = this;
        if (Api.switchVoApi.checkOpenCountryWar()) {
            return { requestType: NetRequestConst.REQUEST_COUNTRYWAY_GETMODEL, requestData: null };
        }
        else {
            return null;
        }
    };
    DailybossView.prototype.receiveData = function (rdata) {
        var view = this;
        if (!rdata.ret) {
            return;
        }
        var api = Api.countryWarVoApi;
        if (rdata.data.data.countrywar) {
            api.formatData(rdata.data.data.countrywar);
        }
        if (rdata.data.data.announce) {
            api.setAnnouce(rdata.data.data.announce);
        }
        if (rdata.data.data.numpercity) {
            api.setMyCityInfo(rdata.data.data.numpercity);
        }
        if (rdata.data.data.tnumpercity) {
            api.setEnermyCityInfo(rdata.data.data.tnumpercity);
        }
        if (rdata.data.data.history) {
            api.setHistoryInfo(rdata.data.data.history);
        }
    };
    DailybossView.prototype.initView = function () {
        this._infoTab.push({ name: "boss1", });
        if (Api.switchVoApi.checkNewDailyBoss()) {
            this._infoTab.push({ name: "bossnew", });
        }
        else {
            this._infoTab.push({ name: "boss2", });
        }
        if (Api.switchVoApi.checkOpenCountryWar() && !Api.countryWarVoApi.isNotCross()) {
            this._infoTab.push({ name: "countryWar", });
        }
        var vo = Api.acVoApi.getActivityVoByAidAndCode("ladderTournament");
        if (vo && vo.isStart) {
            this._infoTab.push({ name: "ladderTournament", });
        }
        var bottomBg = BaseBitmap.create("public_9_bg22");
        bottomBg.y = -15;
        bottomBg.height = GameConfig.stageHeigth - this.getTitleButtomY() - 5;
        this.addChildToContainer(bottomBg);
        this._scrollContiner = new BaseDisplayObjectContainer();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 5, GameConfig.stageWidth, bottomBg.height - 50);
        var scrollView = ComponentManager.getScrollView(this._scrollContiner, rect);
        this.addChildToContainer(scrollView);
        for (var i = 0; i < this._infoTab.length; i++) {
            var banner = new DailybossBanner();
            banner.init(this._infoTab[i], i, this.bannerCallback, this, this.removeCallback);
            this._scrollContiner.addChild(banner);
            banner.y = 233 * i;
            this._bannerTab.push(banner);
        }
        this.tick();
    };
    DailybossView.prototype.removeCallback = function (idx) {
        this._bannerTab[idx].dispose();
        this._bannerTab.splice(idx, 1);
        for (var i = 0; i < this._infoTab.length; i++) {
            var banner = this._bannerTab[i];
            banner.y = 233 * i;
        }
    };
    DailybossView.prototype.bannerCallback = function (name) {
        if (name == "boss1") {
            ViewController.getInstance().openView(ViewConst.COMMON.DAILYBOSSDETILVIEW, { bname: name, type: 1 });
        }
        else if (name == "boss2") {
            ViewController.getInstance().openView(ViewConst.COMMON.DAILYBOSSDETILVIEW, { bname: name, type: 2 });
        }
        else if (name == "bossnew") {
            ViewController.getInstance().openView(ViewConst.COMMON.DAILYBOSSNEWVIEW, {});
        }
        else if (name == "countryWar") {
            if (Api.countryWarVoApi.getEnermyZid() !== 0) {
                ViewController.getInstance().openView(ViewConst.COMMON.COUNTRYWARENTERVIEW);
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("CountryWarCityTip3"));
                return;
            }
        }
        else if (name == "ladderTournament") {
            var vo = Api.acVoApi.getActivityVoByAidAndCode("ladderTournament");
            if (vo) {
                Api.acVoApi.openActivityViewByAid(vo.aid, vo.code, vo.atype);
            }
        }
    };
    DailybossView.prototype.tick = function () {
        for (var i = 0; i < this._bannerTab.length; i++) {
            this._bannerTab[i].tick();
        }
    };
    DailybossView.prototype.getTitleStr = function () {
        return "dailybossTitle";
    };
    DailybossView.prototype.getRuleInfo = function () {
        return "DailyAbyssEntranceRuleInfo";
    };
    DailybossView.prototype.dispose = function () {
        this._scrollContiner = null;
        this._infoTab.length = 0;
        this._bannerTab.length = 0;
        _super.prototype.dispose.call(this);
    };
    return DailybossView;
}(CommonView));
__reflect(DailybossView.prototype, "DailybossView");
//# sourceMappingURL=DailybossView.js.map