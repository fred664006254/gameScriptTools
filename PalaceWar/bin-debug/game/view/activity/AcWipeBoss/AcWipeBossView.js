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
    AcWipeBossView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "aobaibg1", "aobaibg2", "aobaibg3", "aobaibg4"
        ]);
    };
    AcWipeBossView.prototype.initTitle = function () {
        return null;
    };
    AcWipeBossView.prototype.getBgName = function () {
        return "aobaibg1";
    };
    AcWipeBossView.prototype.getCloseBtnName = function () {
        return ButtonConst.POPUP_CLOSE_BTN_1;
    };
    AcWipeBossView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseLoadBitmap.create(bgName);
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.viewBg.y = GameConfig.stageHeigth - 1136;
        }
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
        var title = BaseBitmap.create('aobaititle');
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, title, view, [0, 25]);
        view.addChild(title);
        var descbg = BaseBitmap.create('public_9_downbg');
        descbg.width = 604;
        descbg.height = 106;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, title, [0, title.height]);
        view.addChild(descbg);
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossDesc'), 22);
        descTxt.width = descbg.width - 20;
        descTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descbg);
        view.addChild(descTxt);
        var endGroup = new BaseDisplayObjectContainer();
        endGroup.width = 189;
        endGroup.height = 35;
        endGroup.visible = false;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, endGroup, view, [0, 150]);
        view.addChild(endGroup);
        view._endGroup = endGroup;
        var endBg = BaseBitmap.create('aobaibottom');
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, endBg, endGroup, [0, 0], true);
        endGroup.addChild(endBg);
        var endTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossEnd'), 20, TextFieldConst.COLOR_WARN_RED3);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, endTxt, endBg);
        endGroup.addChild(endTxt);
        var enterbtn = ComponentManager.getButton('aobaikswjian', '', view.enterInHandler, view, null, 3);
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
        var bottomBg = BaseBitmap.create("public_9_wordbg2");
        bottomBg.height = 180;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        view.addChild(bottomBg);
        //说明文本
        var xqingTxt = ComponentManager.getTextField(LanguageManager.getlocal('acmidAutumnAcInfoTitle'), 25, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, xqingTxt, bottomBg, [30, 15]);
        view.addChild(xqingTxt);
        var dateTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossDate', [view.vo.acTimeAndHour]), 20, TextFieldConst.COLOR_WARN_GREEN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, dateTxt, xqingTxt, [0, xqingTxt.textHeight + 10]);
        view.addChild(dateTxt);
        var time1 = view.cfg.actTime[0];
        var time2 = view.cfg.actTime[1];
        var zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(time1).hour;
        var zoneStr2 = App.DateUtil.formatSvrHourByLocalTimeZone(time2).hour;
        var timeTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossTime', [zoneStr + "", zoneStr2 + ""]), 20, TextFieldConst.COLOR_WARN_GREEN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, dateTxt, [0, dateTxt.textHeight + 10]);
        view.addChild(timeTxt);
        //按钮
        var shopBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'acwipeBossShop', view.shopClick, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, shopBtn, bottomBg, [50, 10]);
        view.addChild(shopBtn);
        view._shopBtn = shopBtn;
        var rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'acwipeBossRank', view.rankClick, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, rankBtn, bottomBg, [50, 10]);
        view.addChild(rankBtn);
        if (!PlatformManager.hasSpcialCloseBtn()) {
            // App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, view.closeBtn, view, [-15,-15]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, view.closeBtn, view, [15, 15]);
        }
        else {
            // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view.closeBtn, view, [-15,-15]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view.closeBtn, view, [0, 0]);
        }
        if (view.vo.getpublicRedhot2()) {
            App.CommonUtil.addIconToBDOC(view._shopBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._shopBtn);
        }
        view.setChildIndex(view._ruleBtn, 9999);
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
    AcWipeBossView.prototype.getRuleInfoParam = function () {
        var zoneStr = 0;
        zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(0).hour;
        return [zoneStr + "", zoneStr + "", zoneStr + ""];
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
//# sourceMappingURL=AcWipeBossView.js.map