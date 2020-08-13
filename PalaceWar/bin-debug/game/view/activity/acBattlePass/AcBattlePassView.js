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
/*
author : qianjun
date : 2018.4.14
desc :
*/
var AcBattlePassView = /** @class */ (function (_super) {
    __extends(AcBattlePassView, _super);
    function AcBattlePassView() {
        var _this = _super.call(this) || this;
        _this._timeCdTxt = null;
        _this._levelTxt = null;
        _this._levelbg = null;
        _this._progressBar = null;
        _this._tabHeight = 0;
        _this._buyBtn = null;
        _this._prevLevel = 0;
        _this._timebg = null;
        return _this;
    }
    AcBattlePassView.prototype.getTabbarName = function () {
        return ButtonConst.BTN2_TAB;
    };
    AcBattlePassView.prototype.getBgName = function () {
        return "public_9_bg92";
    };
    Object.defineProperty(AcBattlePassView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattlePassView.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            case 2:
                code = '1';
                break;
            case 7:
                code = '4';
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcBattlePassView.prototype.getNewCode = function () {
        if (this.vo.isNewUi()) {
            return "8";
        }
        return this.getUiCode();
    };
    /*
    *重写标题、规则
    */
    AcBattlePassView.prototype.getTitleStr = function () {
        if (this.code == "1") {
            var code = this.getUiCode();
            return "acBattlePassTitle-" + code;
        }
        else {
            return null;
        }
    };
    AcBattlePassView.prototype.getTitleBgName = function () {
        if (this.code == "1") {
            return _super.prototype.getTitleBgName.call(this);
        }
        else {
            var code = this.getUiCode();
            return this.getResByCode("battlepasstitle", code); //`battlepasstitle`;
        }
    };
    AcBattlePassView.prototype.getRuleInfo = function () {
        var view = this;
        var code = view.code;
        return this.getCnByCode("acBattlePassRuleInfo", code);
    };
    AcBattlePassView.prototype.getRuleBtnName = function () {
        return ButtonConst.BTN2_RULE;
    };
    AcBattlePassView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcBattlePassView.prototype.getExtraRuleInfo = function () {
        if (this.code != "1") {
            var params = [];
            if (Api.switchVoApi.checkServantRefuseBattle()) {
                params.push(LanguageManager.getlocal("acBattlePassRuleInfo-" + this.code + "_part1"));
            }
            else {
                params.push("");
            }
            return LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassRuleInfo", this.code), params);
        }
        return null;
    };
    /**
     * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
     */
    AcBattlePassView.prototype.getReportTipData = function () {
        if (Number(this.code) == 4 || Number(this.code) == 5 || Number(this.code) == 7) {
            return null;
        }
        var key = "BattlePass-" + this.code + "report-" + Api.playerVoApi.getPlayerID() + "-" + this.vo.st;
        var storage = LocalStorageManager.get(key);
        if (!storage) {
            LocalStorageManager.set(key, "1");
            return { title: { key: this.getCnByCode("battlepassreporttitle", this.code) }, msg: { key: this.getCnByCode("battlepassreportmsg", this.code) } };
        }
        else {
            return null;
        }
    };
    AcBattlePassView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        var arr = [];
        arr = [
            "battlepass1", "progress5", "progress3_bg", "arena_bottom", "servant_bottombg", "acsingledayitembg", "acchristmasview_smalldescbg",
            "acarcherview_numBg", "acwealthcomingview_numbg", "progress13", "progress13_bg", "servant_upgrade_frame", "levelup_lizi", "levelup_lizi_json",
            "decree_wordbg", "alliance_taskAttrbg1", "battlepassgreen", "commonview_bigframe", "battlepass_fnt", "commonview_tabbar_bg",
            "countrywarrewardview_itembg", "public_popupscrollitembg", "shopview_itemtitle", "battlepassprobggreen",
            "alliance_taskAttrbg3", "acbattlepasslockeff" + (Number(code) != 4 ? 3 : code), "acbattlepasslockeff" + (Number(code) != 4 ? 3 : code) + "1"
        ];
        if (RES.hasRes("battlepass" + code)) {
            arr.push("battlepass" + code);
        }
        return _super.prototype.getResourceList.call(this).concat(arr);
    };
    AcBattlePassView.prototype.getTabbarTextArr = function () {
        var code = this.getUiCode();
        var arr = [];
        for (var i = 1; i < 5; ++i) {
            arr.push(this.getCnByCode("acBattlePassTab" + i, code));
        }
        return arr;
    };
    AcBattlePassView.prototype.initBg = function () {
        _super.prototype.initBg.call(this);
        var framebg = BaseBitmap.create("commonview_bigframe");
        framebg.x = 0;
        framebg.y = 75;
        framebg.width = GameConfig.stageWidth;
        framebg.height = GameConfig.stageHeigth - 95 - framebg.y + 10;
        this.addChild(framebg);
    };
    AcBattlePassView.prototype.initTabbarGroup = function () {
        var tabbg = BaseBitmap.create("commonview_tabbar_bg");
        tabbg.name = "babbg";
        tabbg.x = 10;
        tabbg.y = 265;
        tabbg.height = 65;
        this.addChild(tabbg);
        _super.prototype.initTabbarGroup.call(this);
    };
    /*
    * 初始化
    */
    AcBattlePassView.prototype.initView = function () {
        var _this = this;
        var view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_BATTLEPASS_JUMP, view.jump, view);
        var code = view.getUiCode();
        view._prevLevel = view.vo.getLevel();
        var newcode = this.vo.isNewUi() ? "8" : code;
        //顶部提示和描述
        var topBg = BaseBitmap.create(this.getResByCode("battlepasstop", newcode));
        topBg.height = 183;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, view.titleBg, [0, view.titleBg.height - 7]);
        view.addChild(topBg);
        var timeTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("AcTurnTableViewTime", [view.vo.acTimeAndHour]), 18);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTipTxt, topBg, [20, 25]);
        view.addChild(timeTipTxt);
        var topTip1Txt = ComponentManager.getTextField(LanguageManager.getlocal(this.getCnByCode("acBattlePassTopTip1", code)), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        topTip1Txt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, topTip1Txt, timeTipTxt, [0, timeTipTxt.textHeight + 7]);
        view.addChild(topTip1Txt);
        var timebg = BaseBitmap.create("public_9_bg61");
        view.addChild(timebg);
        view._timebg = timebg;
        var timeCdTxt = ComponentManager.getTextField(LanguageManager.getlocal(view.vo.isInActivity() ? "acConquerMainLandActCD-1" : "acBattlePassTimeEnd", [String(0xffffff), App.DateUtil.getFormatBySecond(view.vo.getCountDown(), 17)]), 18);
        view.addChild(timeCdTxt);
        view._timeCdTxt = timeCdTxt;
        timebg.width = timeCdTxt.width + 50;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, timebg, timeTipTxt, [timeTipTxt.textWidth + 10, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, timeCdTxt, timebg);
        //政令等级以及进度
        var levelbg = BaseBitmap.create(this.getResByCode("battlepasslevelbg", code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, levelbg, topBg, [30, 107]);
        view.addChild(levelbg);
        view._levelbg = levelbg;
        var fontname = this.vo.isNewUi() ? "battlepass_fnt" : TextFieldConst.FONTNAME_ITEMTIP;
        var numTxt = ComponentManager.getBitmapText("", fontname);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, numTxt, levelbg, [0, 15]);
        view.addChild(numTxt);
        view._levelTxt = numTxt;
        var numbg = BaseBitmap.create(this.getResByCode("battlepassfntbg", code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, numbg, levelbg, [0, -5]);
        view.addChild(numbg);
        var fntTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.getCnByCode("acBattlePassLevel", code)), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, fntTxt, numbg, [0, 0]);
        view.addChild(fntTxt);
        var progressbar = ComponentManager.getProgressBar("progress5", "progress3_bg", 360);
        progressbar.setPercentage(0);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, progressbar, levelbg, [levelbg.width + 20, 0]);
        view.addChild(progressbar);
        view._progressBar = progressbar;
        var buyBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, this.getCnByCode("acBattlePassBuy", code), function () {
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal(_this.getCnByCode("acBattlePassExpiredBuy", code)));
                return;
            }
            if (view.vo.getLevel() >= view.cfg.maxlevel) {
                App.CommonUtil.showTip(LanguageManager.getlocal(_this.getCnByCode("acBattlePassMaxLevel", code)));
                return;
            }
            //购买战令等级
            ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEPASSBUYLEVELVIEW, {
                code: view.code,
                aid: view.aid
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, buyBtn, progressbar, [progressbar.width + 5, 0]);
        view.addChild(buyBtn);
        if (view.vo.getLevel() >= view.cfg.maxlevel) {
            App.DisplayUtil.changeToGray(buyBtn);
        }
        else {
            App.DisplayUtil.changeToNormal(buyBtn);
        }
        view._buyBtn = buyBtn;
        //中部区域
        var bottomBg = BaseBitmap.create("arena_bottom");
        bottomBg.height = 95;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        view.addChild(bottomBg);
        var midtop = BaseBitmap.create("servant_bottombg");
        midtop.width = 660;
        midtop.height = bottomBg.y - topBg.y - topBg.height + 3;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, midtop, topBg, [0, topBg.height - 3]);
        view.addChild(midtop);
        view._tabHeight = midtop.height - 80;
        if (this.vo.isNewUi()) {
            midtop.visible = false;
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view.tabbarGroup, midtop, [0, 5]);
        if (this.vo.isNewUi()) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view.tabbarGroup, midtop, [0, -3]);
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view.container, view.tabbarGroup, [-17.5, view.tabbarGroup.height]);
        view.setChildIndex(view.tabbarGroup, 99);
        view.setChildIndex(view.closeBtn, 99);
        view.freshView();
        this.setBigFameY(topBg.y + topBg.height);
        this.setBigFameHeight(bottomBg.y - topBg.y - topBg.height);
    };
    AcBattlePassView.prototype.tick = function () {
        var view = this;
        view._timeCdTxt.text = LanguageManager.getlocal(view.vo.isInActivity() ? "acConquerMainLandActCD-1" : "acBattlePassTimeEnd", [String(0xffffff), App.DateUtil.getFormatBySecond(view.vo.getCountDown(), 17)]);
        //App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, timebg, timeTipTxt, [timeTipTxt.textWidth + 30, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._timeCdTxt, view._timebg);
    };
    Object.defineProperty(AcBattlePassView.prototype, "tabHeight", {
        get: function () {
            var view = this;
            return view._tabHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassView.prototype, "tabWidth", {
        get: function () {
            var view = this;
            return view.width;
        },
        enumerable: true,
        configurable: true
    });
    AcBattlePassView.prototype.freshView = function () {
        var view = this;
        var code = view.getUiCode();
        var vo = view.vo;
        if (!vo) {
            return;
        }
        //红点
        for (var i = 0; i < 4; ++i) {
            if (vo["checkRedPoint" + (i + 1)]) {
                view.tabbarGroup.addRedPoint(i);
            }
            else {
                view.tabbarGroup.removeRedPoint(i);
            }
        }
        //等级
        var curLevel = view.vo.getLevel();
        if (view._prevLevel != curLevel) {
            view.showUpgradeEffect(curLevel - view._prevLevel);
        }
        else {
            view._levelTxt.text = curLevel.toString();
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._levelTxt, view._levelbg, [0, 15]);
        }
        view._prevLevel = curLevel;
        //进度
        var nextLevel = curLevel + 1;
        var cfg = view.cfg.battlePass[nextLevel - 1];
        if (cfg) {
            view._progressBar.setPercentage(Math.min(1, view.vo.getCurExp() / cfg.expNeed));
            view._progressBar.setText(LanguageManager.getlocal(this.getCnByCode("acBattlePassLevelExp", code), [view.vo.getCurExp().toString(), cfg.expNeed.toString()]));
        }
        else {
            view._progressBar.setPercentage(1);
            view._progressBar.setText(LanguageManager.getlocal(this.getCnByCode("acBattlePassMaxLevel", code)));
        }
        if (view.vo.getLevel() >= view.cfg.maxlevel || !view.vo.isInActivity()) {
            App.DisplayUtil.changeToGray(view._buyBtn);
        }
        else {
            App.DisplayUtil.changeToNormal(view._buyBtn);
        }
    };
    //播放升级成功动画
    AcBattlePassView.prototype.showUpgradeEffect = function (addLv) {
        SoundManager.playEffect(SoundConst.EFFECT_UPD);
        // let servant_upgrade_word = ComponentManager.getBitmapText(LanguageManager.getlocal("servant_xLv",[String(addLv)]),TextFieldConst.FONTNAME_BOSS_SCORE,TextFieldConst.COLOR_LIGHT_YELLOW,TextFieldConst.FONTSIZE_TITLE_BIG);
        // servant_upgrade_word.x = this._levelbg.x;
        // servant_upgrade_word.y = this._levelbg.y;
        var upgradeClip = ComponentManager.getCustomMovieClip("servant_upgrade_frame", 5, 100);
        upgradeClip.setScale(0.6);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, upgradeClip, this, [-5, this._levelbg.y - 40 - 20]);
        this.addChild(upgradeClip);
        upgradeClip.playWithTime(1);
        //egret.Tween.get(servant_upgrade_word,{loop:false}).to({y:this._levelbg.y - 150},800).to({alpha:0},100);
        var upBg = BaseBitmap.create("battlelvup");
        upBg.setScale(0.5);
        this.addChild(upBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, upBg, this._levelbg, [0, 20]);
        egret.Tween.get(upBg).to({ y: this._levelbg.y - 10 }, 700).call(function (upBg) {
            BaseBitmap.release(upBg);
            upBg = null;
        }, this, [upBg]);
        var tmpthis = this;
        egret.Tween.get(this, { loop: false }).wait(500).call(function () {
            this._levelTxt.text = this.vo.getLevel().toString();
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._levelTxt, this._levelbg, [0, 15]);
            //字体刷新加个延时
            tmpthis.removeChild(upgradeClip);
            upgradeClip = null;
        });
    };
    AcBattlePassView.prototype.jump = function () {
        var view = this;
        view.clickTabbarHandler({ index: 3 });
        view.selectedTabIndex = 3;
        this.tabbarGroup.selectedIndex = 3;
    };
    AcBattlePassView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_BATTLEPASS_JUMP, view.jump, view);
        view._prevLevel = null;
        view._levelbg = null;
        view._timeCdTxt = null;
        view._levelTxt = null;
        view._progressBar = null;
        view._tabHeight = 0;
        view._buyBtn = null;
        view._prevLevel = 0;
        view._timebg = null;
        _super.prototype.dispose.call(this);
    };
    return AcBattlePassView;
}(AcCommonView));
//# sourceMappingURL=AcBattlePassView.js.map