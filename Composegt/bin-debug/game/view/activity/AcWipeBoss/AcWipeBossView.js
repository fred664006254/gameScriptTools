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
 * author:qianjun
 * desc:围剿鳌拜活动首页
*/
var AcWipeBossView = (function (_super) {
    __extends(AcWipeBossView, _super);
    function AcWipeBossView() {
        var _this = _super.call(this) || this;
        _this._enterBtn = null;
        _this._endGroup = null;
        _this._shopBtn = null;
        return _this;
    }
    Object.defineProperty(AcWipeBossView.prototype, "api", {
        get: function () {
            return Api.wipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcWipeBossView.prototype.isShowOpenAni = function () {
        return false;
    };
    AcWipeBossView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acwipeboss_activeshopbtn",
            "acwipeboss_activeshoptxt",
            "acwipeboss_enterbtn",
            "acwipeboss_rankrewardbtn",
            "acwipeboss_rankrewardtxt",
            "acwipeboss_redbg"
        ]);
    };
    AcWipeBossView.prototype.initTitle = function () {
        return null;
    };
    // protected getBgName():string
    // {
    // 	return "acwipeboss_bg1";
    // }
    AcWipeBossView.prototype.getCloseBtnName = function () {
        return ButtonConst.COMMON_CLOSE_1;
    };
    AcWipeBossView.prototype.initBg = function () {
        this.viewBg = BaseLoadBitmap.create("acwipeboss_bg1");
        this.viewBg.width = 640;
        this.viewBg.height = 1136;
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    AcWipeBossView.prototype.getTitleStr = function () {
        return null;
    };
    AcWipeBossView.prototype.getBossNum = function (event) {
        var view = this;
        view.api.setBossNumInfo(event.data.data.data);
    };
    AcWipeBossView.prototype.initView = function () {
        var view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSNUM), view.getBossNum, view);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSNUM, {
            activeId: this.vo.aidAndCode,
        });
        //NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GERACTIVITYPOWER, {});
        var title = BaseLoadBitmap.create('acwipeboss_title');
        title.width = 456;
        title.height = 160;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, title, view, [0, 25]);
        view.addChild(title);
        var descbg = BaseBitmap.create('public_itemtipbg2');
        descbg.width = 604;
        descbg.height = 106;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, title, [0, title.height]);
        view.addChild(descbg);
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossDesc'), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt.width = descbg.width - 20;
        descTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descbg);
        view.addChild(descTxt);
        var endGroup = new BaseDisplayObjectContainer();
        endGroup.width = 210;
        endGroup.height = 70;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, endGroup, view, [0, 0]);
        view.addChild(endGroup);
        view._endGroup = endGroup;
        var endBg = BaseBitmap.create('public_9v_bg05');
        endBg.width = 210;
        endBg.height = 70;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, endBg, endGroup, [0, 0], true);
        endGroup.addChild(endBg);
        var endTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossEnd'), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        endGroup.addChild(endTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, endTxt, endBg, [0, 0]);
        endGroup.visible = false;
        var enterbtn = ComponentManager.getButton('acwipeboss_enterbtn', '', view.enterInHandler, view, null, 3);
        enterbtn.anchorOffsetX = enterbtn.width / 2;
        enterbtn.anchorOffsetY = enterbtn.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, enterbtn, view);
        egret.Tween.get(enterbtn, { loop: true }).to({ scaleX: 0.8, scaleY: 0.8 }, 800).to({ scaleX: 1, scaleY: 1 }, 800);
        view.addChild(enterbtn);
        view._enterBtn = enterbtn;
        //中部
        view.freshView();
        //底部
        var vo = view.vo;
        var bottomBg = BaseBitmap.create("public_bottombg1");
        bottomBg.height = 100;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        view.addChild(bottomBg);
        if (this.cfg.crossServerPassNum && this.cfg.crossServerPassNum > 0) {
            var redbg = BaseBitmap.create("acwipeboss_redbg");
            redbg.x = 0;
            redbg.y = bottomBg.y - 100 - redbg.height;
            this.addChild(redbg);
            var redtext = ComponentManager.getTextField(LanguageManager.getlocal("acwipeBoss_passNum", [String(this.cfg.crossServerPassNum)]), 24, TextFieldConst.COLOR_WHITE);
            redtext.x = redbg.x + redbg.width / 2 - redtext.width / 2;
            redtext.y = redbg.y + redbg.height / 2 - redtext.height / 2;
            // redtext.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.addChild(redtext);
        }
        //说明文本
        var dateTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossDate', [view.vo.acTimeAndHour]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, dateTxt, bottomBg, [30, 20]);
        view.addChild(dateTxt);
        var timeTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossTime', [view.cfg.actTime[0].toString(), view.cfg.actTime[1].toString()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, dateTxt, [0, dateTxt.textHeight + 15]);
        view.addChild(timeTxt);
        var rankBtn = ComponentManager.getButton("acwipeboss_rankrewardbtn", "", view.rankClick, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, rankBtn, bottomBg, [15, bottomBg.height + 5]);
        view.addChild(rankBtn);
        var rankTxt = BaseBitmap.create("acwipeboss_rankrewardtxt");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, rankTxt, rankBtn, [0, 0]);
        view.addChild(rankTxt);
        //按钮
        var shopBtn = ComponentManager.getButton("acwipeboss_activeshopbtn", "", view.shopClick, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, shopBtn, bottomBg, [15, bottomBg.height + 5]);
        view.addChild(shopBtn);
        view._shopBtn = shopBtn;
        var shopTxt = BaseBitmap.create("acwipeboss_activeshoptxt");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, shopTxt, shopBtn, [0, 0]);
        view.addChild(shopTxt);
        if (!PlatformManager.hasSpcialCloseBtn()) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, view.closeBtn, view, [0, 0]);
        }
        else {
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view.closeBtn, view, [0, 0]);
        }
        if (view.vo.getpublicRedhot2()) {
            App.CommonUtil.addIconToBDOC(view._shopBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._shopBtn);
        }
    };
    AcWipeBossView.prototype.shopClick = function () {
        var view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSSHOPVIEW, {
            aid: view.aid,
            code: view.code
        });
    };
    AcWipeBossView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETRANK, requestData: {
                activeId: view.vo.aidAndCode,
            } };
    };
    AcWipeBossView.prototype.receiveData = function (data) {
        var view = this;
        view.api.setRankInfo(data.data.data);
    };
    AcWipeBossView.prototype.rankClick = function () {
        var view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSREWARDVIEW, {
            aid: view.aid,
            code: view.code
        });
    };
    AcWipeBossView.prototype.freshView = function () {
        var view = this;
        if (!view.vo.isInTansuoTime()) {
            view._enterBtn.visible = false;
            view._endGroup.visible = true;
        }
    };
    AcWipeBossView.prototype.getRuleInfo = function () {
        return 'acwipeBossRuleInfo';
    };
    AcWipeBossView.prototype.getSoundBgName = function () {
        return SoundConst.MUSIC_ALLIANCEBOSSBATTLE;
    };
    AcWipeBossView.prototype.tick = function () {
        var view = this;
        if (!view.vo.isInTansuoTime()) {
            view._enterBtn.visible = false;
            view._endGroup.visible = true;
        }
        if (view.vo.getpublicRedhot2()) {
            App.CommonUtil.addIconToBDOC(view._shopBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._shopBtn);
        }
        //view.freshView();
    };
    AcWipeBossView.prototype.enterInHandler = function () {
        var view = this;
        if (Api.playerVoApi.getPlayerLevel() >= view.cfg.needLv) {
            if (view.vo.isInTansuoTime()) {
                ViewController.getInstance().openView(ViewConst.COMMON.ACWIPEBOSSENTERVIEW, {
                    aid: this.aid,
                    code: this.code
                });
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime0"));
            }
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossOpenTip", [Api.playerVoApi.getPlayerOfficeByLevel(view.cfg.needLv)]));
        }
    };
    AcWipeBossView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSNUM), view.getBossNum, view);
        view._endGroup.dispose();
        view._endGroup = null;
        egret.Tween.removeTweens(view._enterBtn);
        view._enterBtn.removeTouchTap();
        view._enterBtn = null;
        view._shopBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcWipeBossView;
}(AcCommonView));
__reflect(AcWipeBossView.prototype, "AcWipeBossView");
