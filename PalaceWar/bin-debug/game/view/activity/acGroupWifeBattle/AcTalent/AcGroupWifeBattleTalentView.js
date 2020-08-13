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
 * 才情分页签
 * author qianjun----wxz
 */
var AcGroupWifeBattleTalentView = /** @class */ (function (_super) {
    __extends(AcGroupWifeBattleTalentView, _super);
    function AcGroupWifeBattleTalentView() {
        return _super.call(this) || this;
    }
    AcGroupWifeBattleTalentView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["acsweetgift_make_infobg-1", "progress3", "progress3_bg", "qingyuanitemtitlebg",
            "wifebattleview_updown",
            "qingyuanitemtitlebg",
            "wifestatus_headbg",
            "wifestatus_namebg",
            "wifetalentnumbg",
            "wifetalenttopbg",
            "acgroupwifebattle_itembg2",
            "acgroupwifebattle_itembg1",
            "wifeview_artistryicon",
            "commonview_tabbar_bg",
            "public_popupscrollitembg"
        ]);
    };
    AcGroupWifeBattleTalentView.prototype.initTabbarGroup = function () {
        var tabbg = BaseBitmap.create("commonview_tabbar_bg");
        tabbg.x = 10;
        tabbg.y = 90;
        this.addChild(tabbg);
        _super.prototype.initTabbarGroup.call(this);
    };
    AcGroupWifeBattleTalentView.prototype.initView = function () {
        var view = this;
        this.bigframe.height = GameConfig.stageHeigth - this.container.y + 60;
        this.bigframe.y = -60;
        var code = this.getUiCode();
        var bottomleft = BaseBitmap.create("acgroupwifebattlecorner-" + code);
        bottomleft.setPosition(0, GameConfig.stageHeigth - bottomleft.height);
        view.addChild(bottomleft);
        var bottomright = BaseBitmap.create("acgroupwifebattlecorner-" + code);
        bottomright.scaleX = -1;
        bottomright.setPosition(GameConfig.stageWidth, GameConfig.stageHeigth - bottomright.height);
        view.addChild(bottomright);
        if (this.checkHaveBuff()) {
            var key = "wifebattleactivity-" + Api.playerVoApi.getPlayerID();
            var storage = LocalStorageManager.get(key);
            LocalStorageManager.set(key, "1");
        }
        // let bottomBg = BaseLoadBitmap.create("servant_bottombg");
        // bottomBg.width = GameConfig.stageWidth;
        // bottomBg.height = GameConfig.stageHeigth - 75;
        // bottomBg.y = GameConfig.stageHeigth - bottomBg.height - this.getTitleButtomY()
        // this.addChildToContainer(bottomBg); 
        var tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if (tab) {
            view.clickTabbarHandler({ index: tab - 1 });
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
    };
    AcGroupWifeBattleTalentView.prototype.checkHaveBuff = function () {
        return true;
    };
    AcGroupWifeBattleTalentView.prototype.getTitleStr = function () {
        return "wifeBattleftalentup";
    };
    AcGroupWifeBattleTalentView.prototype.getTabbarTextArr = function () {
        var tabArr = [
            "acGroupWifeBattleTalentTab1",
            "wifeTalentPlusPopupViewTab2",
        ];
        if (this.checkHaveBuff()) {
            tabArr.push("wifeTalentPlusPopupViewTab3");
        }
        return tabArr;
    };
    Object.defineProperty(AcGroupWifeBattleTalentView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleTalentView.prototype.getRuleBtnName = function () {
        return ButtonConst.BTN2_RULE;
    };
    AcGroupWifeBattleTalentView.prototype.getRuleInfo = function () {
        var code = this.getUiCode();
        // if(Api.switchVoApi.checkServantRefuseBattle() && this.getUiCode() == '1' &&Api.switchVoApi.checkOpenAtkracegChangegpoint()){
        // 	return "acBattleRoundRule-1_newRule_withOpenRefusal";
        // }
        // return Api.switchVoApi.checkOpenAtkracegChangegpoint() ? (`acBattleRoundRule-${code}_newRule`) : (`acBattleRoundRule-${code}`);
        return "acGroupWifeBattleRule-" + code;
    };
    AcGroupWifeBattleTalentView.prototype.getRuleInfoParam = function () {
        return this.vo.getRuleInfoParam();
    };
    Object.defineProperty(AcGroupWifeBattleTalentView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleTalentView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleTalentView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleTalentView.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcGroupWifeBattleTalentView.prototype.getBigFrame = function () {
        return "commonview_bigframe";
    };
    AcGroupWifeBattleTalentView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcGroupWifeBattleTalentView;
}(CommonView));
//# sourceMappingURL=AcGroupWifeBattleTalentView.js.map