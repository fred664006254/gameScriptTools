var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* 皇城六部 mainui
* date 2020.5.7
* author ycg
* @name SixSectionView
*/
var SixSectionView = /** @class */ (function (_super) {
    __extends(SixSectionView, _super);
    function SixSectionView() {
        var _this = _super.call(this) || this;
        _this._buildList = [];
        return _this;
    }
    SixSectionView.prototype.getBgName = function () {
        return "sixsectionmainui_bg";
    };
    SixSectionView.prototype.getTitleStr = function () {
        return null;
    };
    SixSectionView.prototype.getTitleBgName = function () {
        return "";
    };
    SixSectionView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    SixSectionView.prototype.getRuleInfo = function () {
        return "sixSectionRuleInfo";
    };
    SixSectionView.prototype.getExtraRuleInfo = function () {
        var str = LanguageManager.getlocal("sixSectionRuleInfo");
        if (Api.switchVoApi.checkOpenSixSectionBuilding(1)) {
            var param = LanguageManager.getlocal("officialTitle" + Config.Sixsection1Cfg.needLv);
            str += LanguageManager.getlocal("sixSectionRuleInfoBuild1", [param]);
        }
        return str;
    };
    SixSectionView.prototype.getProbablyInfo = function () {
        return "";
    };
    SixSectionView.prototype.getRuleBtnName = function () {
        return ButtonConst.BTN2_RULE;
    };
    // protected getCloseBtnName():string
    // {
    // 	return ButtonConst.COMMON_CLOSE_2;
    // }
    SixSectionView.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat("sixsectionmainui", "sixsection1").concat(list);
    };
    //建筑顶部居中对齐 标签顶部居中对齐
    SixSectionView.prototype.getBuildPosCfg = function () {
        return [
            { id: 0, build: { x: 0, y: 92, scale: 4 }, nameBg: { x: 320, y: 300 } },
            { id: 1, build: { x: 0, y: 377, scale: 4 }, nameBg: { x: 122, y: 469 } },
            { id: 2, build: { x: 394, y: 370, scale: 4 }, nameBg: { x: 518, y: 469 } },
            { id: 3, build: { x: 44, y: 561, scale: 4 }, nameBg: { x: 102, y: 690 } },
            { id: 4, build: { x: 356, y: 456, scale: 4 }, nameBg: { x: 538, y: 690 } },
            { id: 5, build: { x: 0, y: 764, scale: 4 }, nameBg: { x: 82, y: 970 } },
            { id: 6, build: { x: 378, y: 766, scale: 4 }, nameBg: { x: 558, y: 970 } },
        ];
    };
    SixSectionView.prototype.initView = function () {
        var _this = this;
        this.setLayoutPosition(LayoutConst.righttop, this.closeBtn, this, [0, 0]);
        var bgContainer = new BaseDisplayObjectContainer();
        bgContainer.width = GameConfig.stageWidth;
        var bgScrollView = ComponentManager.getScrollView(bgContainer, new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth));
        this.addChildToContainer(bgScrollView);
        bgScrollView.bounces = false;
        var titleBg = BaseBitmap.create("sixsectionmainui_titblebg");
        titleBg.setPosition(GameConfig.stageWidth / 2 - titleBg.width / 2, 0);
        this.addChildToContainer(titleBg);
        var bg = BaseBitmap.create("sixsectionmainui_bg");
        bgContainer.addChild(bg);
        bgContainer.height = bg.height;
        bgScrollView.setScrollTop(bg.height - bgScrollView.height);
        var buildCfg = this.getBuildPosCfg();
        var count = buildCfg.length;
        var _loop_1 = function (i) {
            var posCfg = buildCfg[i];
            var build = BaseBitmap.create("sixsectionmainui_build" + (posCfg.id + 1));
            build.setPosition(posCfg.build.x, posCfg.build.y);
            bgContainer.addChild(build);
            var nameContainer = new BaseDisplayObjectContainer();
            bgContainer.addChild(nameContainer);
            var nameBgImg = "sixsectionmainui_buildname" + (buildCfg[i].id + 1);
            // if (i == 0){
            //     nameBgImg = "sixsectionmainui_buildnamebg1";
            // }
            var nameBg = BaseBitmap.create(nameBgImg);
            nameContainer.width = nameBg.width;
            nameContainer.height = nameBg.height;
            nameContainer.addChild(nameBg);
            // nameBg.anchorOffsetX = nameBg.width/2;
            nameContainer.setPosition(posCfg.nameBg.x - nameContainer.width / 2, posCfg.nameBg.y);
            var timeContainer = new BaseDisplayObjectContainer();
            bgContainer.addChild(timeContainer);
            var timeBg = BaseBitmap.create("public_itemtipbg2");
            timeContainer.addChild(timeBg);
            timeContainer.height = timeBg.height;
            var time = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
            timeContainer.addChild(time);
            time.y = timeBg.height / 2 - time.size / 2;
            timeContainer.setPosition(nameContainer.x, nameContainer.y + nameContainer.height);
            timeContainer.visible = false;
            // let nameStr = "sixSectionBuildName"+(posCfg.id + 1);
            if (!this_1.checkBuildIsOpen(posCfg.id)) {
                // App.DisplayUtil.changeToGray(nameBg);
                // nameStr = "sixSectionBuildNotOpen1";
                nameBg.setRes("sixsectionmainui_buildname_notopen");
            }
            else {
                if (this_1.checkIsInBuildTime(posCfg.id)) {
                    timeContainer.visible = true;
                    time.text = this_1.getTimeCountDown(posCfg.id);
                    timeBg.width = time.width + 40;
                    time.x = timeBg.x + timeBg.width / 2 - time.width / 2;
                    time.y = timeBg.y + timeBg.height / 2 - time.height / 2;
                    timeContainer.setPosition(nameContainer.x + nameContainer.width / 2 - timeBg.width / 2, nameContainer.y + nameContainer.height);
                }
                else {
                    // nameStr = "sixSectionBuildNotOpen2";
                    App.DisplayUtil.changeToGray(nameBg);
                }
            }
            // let name = ComponentManager.getTextField(LanguageManager.getlocal(nameStr), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            // name.anchorOffsetX = name.width/2;
            // name.setPosition(nameBg.x + nameBg.width/2, nameBg.y + nameBg.height/2 - name.height/2);
            // nameContainer.addChild(name);
            build.alpha = 0;
            build.setScale(4);
            build.addTouch(function (event) {
                switch (event.type) {
                    case egret.TouchEvent.TOUCH_BEGIN:
                        build.alpha = 0.5;
                        break;
                    case egret.TouchEvent.TOUCH_TAP:
                        build.alpha = 0.5;
                        break;
                    case egret.TouchEvent.TOUCH_CANCEL:
                        build.alpha = 0;
                        break;
                    case egret.TouchEvent.TOUCH_END:
                        build.alpha = 0;
                        _this.buildClick(i);
                        break;
                }
            }, this_1);
            var builds = { build: build, nameContainer: nameContainer, nameBg: nameBg, timeContainer: timeContainer, timeBg: timeBg, time: time };
            this_1._buildList[i] = builds;
        };
        var this_1 = this;
        for (var i = 0; i < count; i++) {
            _loop_1(i);
        }
        this.checkBuildRedPoint();
    };
    SixSectionView.prototype.buildClick = function (index) {
        App.LogUtil.log("buildClick " + index);
        if (this.checkBuildIsOpen(index)) {
            if (this.checkIsInBuildTime(index)) {
                if (index == 1) {
                    var pLv = Api.playerVoApi.getPlayerLevel();
                    var needLv = Config.Sixsection1Cfg.needLv;
                    NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_CLICK, { stype: 1 });
                    if (pLv < needLv) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("sixSectionBuildNotOpenTip2", [LanguageManager.getlocal("officialTitle" + needLv)]));
                        return;
                    }
                    if (!Api.sixsection1VoApi.checkServantLimit()) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("sixSectionBuildNotOpenTip3", ["" + Api.sixsection1VoApi.getServantLimit()]));
                        return;
                    }
                }
                var className = "SixSection" + index + "View";
                ViewController.getInstance().openView(className);
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("sixSectionBuildNotOpenTip3_" + index));
            }
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSectionBuildNotOpenTip1"));
        }
    };
    SixSectionView.prototype.freshBuild = function () {
        var buildCfg = this.getBuildPosCfg();
        for (var i = 0; i < this._buildList.length; i++) {
            var buildData = this._buildList[i];
            if (this.checkBuildIsOpen(buildCfg[i].id)) {
                // buildData.name.text = LanguageManager.getlocal("sixSectionBuildName"+(buildCfg[i].id + 1));
                // buildData.name.anchorOffsetX = buildData.name.width/2;
                buildData.nameBg.setRes("sixsectionmainui_buildname" + (buildCfg[i].id + 1));
                if (this.checkIsInBuildTime(buildCfg[i].id)) {
                    App.DisplayUtil.changeToNormal(buildData.nameBg);
                    buildData.timeContainer.visible = true;
                    buildData.time.text = this.getTimeCountDown(buildCfg[i].id);
                    buildData.timeBg.width = buildData.time.width + 40;
                    buildData.time.x = buildData.timeBg.x + buildData.timeBg.width / 2 - buildData.time.width / 2;
                    // buildData.time.y = buildData.timeBg.y + buildData.timeBg.height/2 - buildData.time.height/2;
                    buildData.timeContainer.x = buildData.nameContainer.x + buildData.nameContainer.width / 2 - buildData.timeBg.width / 2;
                }
                else {
                    buildData.timeContainer.visible = false;
                    App.DisplayUtil.changeToGray(buildData.nameBg);
                }
            }
            else {
                buildData.timeContainer.visible = false;
                // App.DisplayUtil.changeToGray(buildData.nameBg);
                // buildData.name.text = LanguageManager.getlocal("sixSectionBuildNotOpen1");
                // buildData.name.anchorOffsetX = buildData.name.width/2;
                buildData.nameBg.setRes("sixsectionmainui_buildname_notopen");
            }
        }
    };
    //开关是否打开
    SixSectionView.prototype.checkBuildIsOpen = function (buildId) {
        if (Api.switchVoApi.checkOpenSixSectionBuilding(buildId)) {
            return true;
        }
        return false;
    };
    //是否在开启时间内
    SixSectionView.prototype.checkIsInBuildTime = function (buildId) {
        if (Number(buildId) == 1) {
            return Api.sixsection1VoApi && Api.sixsection1VoApi.isInPeriousTime();
        }
        return false;
    };
    //红点
    SixSectionView.prototype.checkBuildRedPoint = function () {
        for (var i = 0; i < this._buildList.length; i++) {
            var apiName = "sixsection" + i + "VoApi";
            if (Api[apiName] && Api[apiName].checkRedPoint()) {
                App.CommonUtil.addIconToBDOC(this._buildList[i].nameContainer);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._buildList[i].nameContainer);
            }
        }
    };
    //功能倒计时
    SixSectionView.prototype.getTimeCountDown = function (id) {
        var str = "";
        if (Number(id) == 1) {
            var et = Api.sixsection1VoApi.et - GameData.serverTime;
            if (et < 0) {
                et = 0;
            }
            str = App.DateUtil.getFormatBySecond(et, 17);
        }
        return str;
    };
    SixSectionView.prototype.tick = function () {
        this.freshBuild();
        this.checkBuildRedPoint();
    };
    SixSectionView.prototype.dispose = function () {
        this._buildList = [];
        _super.prototype.dispose.call(this);
    };
    return SixSectionView;
}(CommonView));
//# sourceMappingURL=SixSectionView.js.map