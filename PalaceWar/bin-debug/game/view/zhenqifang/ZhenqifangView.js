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
/*
author : qianjun
date : 2018.4.14
desc :
*/
var ZhenqifangView = (function (_super) {
    __extends(ZhenqifangView, _super);
    function ZhenqifangView() {
        var _this = _super.call(this) || this;
        _this._tabHeight = 0;
        _this._topbg = null;
        _this._levelbg = null;
        _this._levelTxt = null;
        _this._progressBar = null;
        _this._taskNumBg = null;
        _this._taskNumTxt = null;
        _this._prevLevel = 0;
        return _this;
    }
    Object.defineProperty(ZhenqifangView.prototype, "cfg", {
        get: function () {
            return Config.ZhenqifangCfg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZhenqifangView.prototype, "api", {
        get: function () {
            return Api.zhenqifangVoApi;
        },
        enumerable: true,
        configurable: true
    });
    /*
    *重写标题、规则
    */
    ZhenqifangView.prototype.getTitleStr = function () {
        var view = this;
        return "zhenqifangtitle";
    };
    ZhenqifangView.prototype.getRuleInfo = function () {
        var view = this;
        return "zhenqifangrule";
    };
    ZhenqifangView.prototype.setTabBarPosition = function () {
        if (this.tabbarGroup) {
            var tabX = 0;
            var tabY = 0;
            if (egret.is(this, "PopupView")) {
                tabX = this.viewBg.x + 30;
                tabY = this.viewBg.y + 60;
            }
            else {
                tabX = 15;
                tabY = this.titleBg ? this.titleBg.y + this.titleBg.height + 157 : 100;
            }
            this.tabbarGroup.setPosition(tabX, tabY - 18);
        }
    };
    ZhenqifangView.prototype.getTabbarGroupY = function () {
        return 205;
    };
    ZhenqifangView.prototype.getTitleButtomY = function () {
        return this.titleBg.y + this.titleBg.height;
    };
    ZhenqifangView.prototype.receiveData = function (data) {
        if (data.ret) {
            var rData = data.data;
            if (rData.ret == 0) {
                var cmd = rData.cmd;
            }
        }
    };
    ZhenqifangView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ZQF_GETINFO, requestData: {} };
    };
    /**
     * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
     */
    // protected getReportTipData():{title:{key:string,param?:string[]},msg:{key:string,param?:string[]}}
    // {
    //     let key = `BattlePass-${this.code}report-${Api.playerVoApi.getPlayerID()}-${this.vo.st}`;
    //     let storage = LocalStorageManager.get(key);
    //     if (!storage) {
    //         LocalStorageManager.set(key, `1`);
    //         return {title:{key:`battlepassreporttitle-${this.code}`},msg:{key:`battlepassreportmsg-${this.code}`}};
    //     }
    //     else{
    //         return null;
    //     }
    // }
    ZhenqifangView.prototype.getResourceList = function () {
        var arr = [];
        arr = [
            "arena_bottom", "servant_bottombg", "battle_info_costbg", "battlepassfntbg-1", "progress5", "progress3_bg", "wifechatwodrsbg", "rankactivenamebg", "childview_addicon", "discussclose", "discussclose_down", "achievement_state1", "zqfliang",
        ];
        return _super.prototype.getResourceList.call(this).concat(arr);
    };
    ZhenqifangView.prototype.getTabbarTextArr = function () {
        return [
            "zhenqifangtab1",
            "zhenqifangtab2"
        ];
    };
    Object.defineProperty(ZhenqifangView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    ZhenqifangView.prototype.getContainerY = function () {
        return 0;
    };
    ZhenqifangView.prototype.getBigFrame = function () {
        return null;
    };
    /*
    * 初始化
    */
    ZhenqifangView.prototype.initView = function () {
        var view = this;
        view.width = GameConfig.stageWidth;
        view.container.width = view.width;
        view.height = GameConfig.stageHeigth;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ZQF_DATAREFRESH, this.freshView, this);
        // App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.showUpgradeEffect, view);
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_BATTLEPASS_JUMP, view.jump, view);
        var topBg = BaseBitmap.create("zqftopbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, view.container, [0, 0], true);
        view.addChildToContainer(topBg);
        view._topbg = topBg;
        var bottomBg = BaseBitmap.create("arena_bottom");
        bottomBg.height = 95;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        view.addChild(bottomBg);
        var midtop = BaseBitmap.create("servant_bottombg");
        midtop.width = 640;
        midtop.height = bottomBg.y - 89 - topBg.height;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, midtop, topBg, [0, topBg.height]);
        view.addChildToContainer(midtop);
        view._tabHeight = midtop.height + bottomBg.height - 74;
        var tipNumBgGroup = new BaseDisplayObjectContainer();
        view.addChildToContainer(tipNumBgGroup);
        view._taskNumBg = tipNumBgGroup;
        var tipNumBg = BaseBitmap.create("battle_info_costbg");
        tipNumBg.width = 227;
        tipNumBg.height = 34;
        tipNumBgGroup.addChild(tipNumBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, tipNumBgGroup, topBg, [20, topBg.height + 25]);
        var chaishinumTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        chaishinumTxt.height = 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, chaishinumTxt, tipNumBgGroup, [30, 0], true);
        tipNumBgGroup.addChild(chaishinumTxt);
        view._taskNumTxt = chaishinumTxt;
        //等级部分
        var level = view.api.ZhenqifangLevel;
        view._prevLevel = level;
        var levelbg = BaseBitmap.create("battlepassfntbg-1");
        view.addChildToContainer(levelbg);
        view._levelbg = levelbg;
        var levelTxt = ComponentManager.getTextField(LanguageManager.getlocal("zhenqifanglevel", [level.toString()]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        levelbg.width = levelTxt.width + 25;
        view.addChildToContainer(levelTxt);
        view._levelTxt = levelTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, levelbg, topBg, [170, 44]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, levelTxt, levelbg);
        //经验进度
        var progressbar = ComponentManager.getProgressBar("progress5", "progress3_bg", 285);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, progressbar, levelbg, [levelbg.width + 5, 0]);
        view.addChildToContainer(progressbar);
        view._progressBar = progressbar;
        //详情按钮
        var detailBtn = ComponentManager.getButton("zqfdetail", "", function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ZHENQIFANGBUILDLEVELDETAILVIEW);
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, detailBtn, progressbar, [progressbar.width + 15, 0]);
        view.addChildToContainer(detailBtn);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("zhenqifangtip1"), 18);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, progressbar, [0, progressbar.height + 15]);
        view.addChildToContainer(tipTxt);
        //商城
        var shopBtn = ComponentManager.getButton("zqfshop", "", function () {
            //打开商城
            ViewController.getInstance().openView(ViewConst.COMMON.ZHENQIFANGSHOPVIEW);
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, shopBtn, topBg, [30, 0]);
        view.addChildToContainer(shopBtn);
        var shopeff = ComponentManager.getCustomMovieClip("zqfbuildtxt", 8, 100);
        shopeff.width = 110;
        shopeff.height = 60;
        shopeff.x = 25;
        shopeff.y = 66;
        shopeff.playWithTime(-1);
        view.addChildToContainer(shopeff);
        shopeff.blendMode = egret.BlendMode.ADD;
        view.freshView();
        if (Api.rookieVoApi.getIsGuiding()) {
            // let guideview =  ViewController.getInstance().getView(`RookieView`);
            // if(guideview){
            //     guideview.hide();
            // }
            // Api.rookieVoApi.insertWaitingGuide({"idx":"zhenqifang_4"},true);
            // Api.rookieVoApi.checkWaitingGuide();
            RookieCfg.rookieCfg["zhenqifang_7"].clickRect.x = 140;
            RookieCfg.rookieCfg["zhenqifang_7"].clickRect.y = this.container.y + this.getTabbarGroupY() + 120;
            RookieCfg.rookieCfg["zhenqifang_7"].handPos.x = RookieCfg.rookieCfg["zhenqifang_7"].clickRect.x + 30;
            RookieCfg.rookieCfg["zhenqifang_7"].handPos.y = RookieCfg.rookieCfg["zhenqifang_7"].clickRect.y + 30;
            RookieCfg.rookieCfg["zhenqifang_9"].clickRect.x = 250;
            RookieCfg.rookieCfg["zhenqifang_9"].clickRect.y = this.container.y + this.getTabbarGroupY() + 346 + 2;
            RookieCfg.rookieCfg["zhenqifang_9"].handPos.x = RookieCfg.rookieCfg["zhenqifang_9"].clickRect.x + 58;
            RookieCfg.rookieCfg["zhenqifang_9"].handPos.y = RookieCfg.rookieCfg["zhenqifang_9"].clickRect.y + 18 + 4;
            RookieCfg.rookieCfg["zhenqifang_11"].clickRect.x = 250;
            RookieCfg.rookieCfg["zhenqifang_11"].clickRect.y = this.container.y + this.getTabbarGroupY() + 346 + 2;
            RookieCfg.rookieCfg["zhenqifang_11"].handPos.x = RookieCfg.rookieCfg["zhenqifang_11"].clickRect.x + 58;
            RookieCfg.rookieCfg["zhenqifang_11"].handPos.y = RookieCfg.rookieCfg["zhenqifang_11"].clickRect.y + 18;
            Api.rookieVoApi.checkNextStep();
        }
        view.tick();
    };
    Object.defineProperty(ZhenqifangView.prototype, "tabHeight", {
        get: function () {
            var view = this;
            return view._tabHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZhenqifangView.prototype, "tabWidth", {
        get: function () {
            var view = this;
            return view.width;
        },
        enumerable: true,
        configurable: true
    });
    ZhenqifangView.prototype.freshView = function () {
        var view = this;
        var level = view.api.ZhenqifangLevel;
        if (level > view._prevLevel) {
            SoundManager.playEffect(SoundConst.EFFECT_UPD);
            var upgradeClip_1 = ComponentManager.getCustomMovieClip("servant_upgrade_frame", 5, 100);
            upgradeClip_1.width = 213;
            upgradeClip_1.height = 208;
            upgradeClip_1.setScale(0.6);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, upgradeClip_1, this._levelbg, [0, -10]);
            this.addChildToContainer(upgradeClip_1);
            upgradeClip_1.playWithTime(-1);
            //egret.Tween.get(servant_upgrade_word,{loop:false}).to({y:this._levelbg.y - 150},800).to({alpha:0},100);
            var upBg = BaseBitmap.create("battlelvup");
            upBg.setScale(0.5);
            this.addChildToContainer(upBg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, upBg, this._levelbg, [0, 0]);
            egret.Tween.get(upBg).to({ y: this._levelbg.y - 30 }, 700).call(function (upBg) {
                BaseBitmap.release(upBg);
                upBg = null;
            }, this, [upBg]);
            egret.Tween.get(this, { loop: false }).wait(500).call(function () {
                this._levelTxt.text = LanguageManager.getlocal("zhenqifanglevel", [level.toString()]);
                //字体刷新加个延时
                this.container.removeChild(upgradeClip_1);
                upgradeClip_1 = null;
            });
        }
        view._prevLevel = level;
        var curcfg = view.cfg.getTaskHouseCfgByLevel(level);
        view._levelTxt.text = LanguageManager.getlocal("zhenqifanglevel", [level.toString()]);
        view._levelbg.width = view._levelTxt.width + 25;
        App.DisplayUtil.setLayoutPosition(LayoutConst.left, view._levelbg, view._topbg, [170, 30]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._levelTxt, view._levelbg);
        //进度
        if (level == Object.keys(view.cfg.taskHouse).length) {
            view._progressBar.setPercentage(1);
            view._progressBar.setText(LanguageManager.getlocal("zhenqifangtip2"));
        }
        else {
            var curexp = view.api.curBuildExp;
            var nextcfg = view.cfg.getTaskHouseCfgByLevel(level + 1);
            var nextexp = nextcfg.needExp;
            view._progressBar.setPercentage(curexp / nextexp);
            view._progressBar.setText(LanguageManager.getlocal("zhenqifanglevelexp", [curexp.toString(), nextexp]));
        }
        //差事上限
        var tasknum = 0;
        var taskmax = 0;
        var str = "";
        if (this.selectedTabIndex == 0) {
            tasknum = view.api.curTaskNum;
            taskmax = curcfg.taskSlotIndiv;
        }
        else {
            tasknum = view.api.curFTaskNum;
            taskmax = curcfg.taskSlotFid;
        }
        if (tasknum == taskmax) {
            str = "zhenqifangcdtip13";
            //App.CommonUtil.addIconToBDOC(view._taskNumBg);
        }
        else {
            str = "zhenqifangtasknum";
            //App.CommonUtil.removeIconFromBDOC(view._taskNumBg);
        }
        view._taskNumTxt.text = LanguageManager.getlocal(str, [tasknum.toString(), taskmax.toString()]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._taskNumTxt, view._taskNumBg, [30, 0], true);
    };
    ZhenqifangView.prototype.clickTabbarHandler = function (data) {
        var view = this;
        var index = data.index;
        var level = view.api.ZhenqifangLevel;
        var curcfg = view.cfg.getTaskHouseCfgByLevel(level);
        //差事上限
        var tasknum = 0;
        var taskmax = 0;
        var str = "";
        if (index == 0) {
            tasknum = view.api.curTaskNum;
            taskmax = curcfg.taskSlotIndiv;
        }
        else {
            tasknum = view.api.curFTaskNum;
            taskmax = curcfg.taskSlotFid;
        }
        if (tasknum >= taskmax) {
            str = "zhenqifangcdtip13";
            //App.CommonUtil.addIconToBDOC(view._taskNumBg);
        }
        else {
            str = "zhenqifangtasknum";
            //App.CommonUtil.removeIconFromBDOC(view._taskNumBg);
        }
        view._taskNumTxt.text = LanguageManager.getlocal(str, [tasknum.toString(), taskmax.toString()]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._taskNumTxt, view._taskNumBg, [30, 0], true);
        _super.prototype.clickTabbarHandler.call(this, data);
    };
    ZhenqifangView.prototype.tick = function () {
        var view = this;
        for (var i = 1; i < 3; ++i) {
            if (Api.zhenqifangVoApi.getRedPoint(i)) {
                view.tabbarGroup.addRedPoint(i - 1);
            }
            else {
                view.tabbarGroup.removeRedPoint(i - 1);
            }
        }
    };
    ZhenqifangView.prototype.dispose = function () {
        var view = this;
        Api.zhenqifangVoApi.sendList = [];
        Api.zhenqifangVoApi.friendsendList = [];
        view._topbg = null;
        view._prevLevel = 0;
        view._levelbg = null;
        view._levelTxt = null;
        view._progressBar = null;
        view._taskNumBg = null;
        view._taskNumTxt = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ZQF_DATAREFRESH, this.freshView, this);
        // App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.showUpgradeEffect, view);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_BATTLEPASS_JUMP, view.jump, view);
        _super.prototype.dispose.call(this);
    };
    return ZhenqifangView;
}(CommonView));
__reflect(ZhenqifangView.prototype, "ZhenqifangView");
//# sourceMappingURL=ZhenqifangView.js.map