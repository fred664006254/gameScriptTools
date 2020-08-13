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
 * desc:东海皇陵进入界面
*/
var AcLocTombView = (function (_super) {
    __extends(AcLocTombView, _super);
    function AcLocTombView() {
        var _this = _super.call(this) || this;
        _this._enterBtn = null;
        _this._shopBtn = null;
        _this._tipBg = null;
        _this._tipTxt = null;
        _this._period = 1;
        _this._movieGroup = null;
        _this._isMove = false;
        return _this;
    }
    Object.defineProperty(AcLocTombView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcLocTombView.prototype.getResourceList = function () {
        var code = this.code;
        return _super.prototype.getResourceList.call(this).concat([
            "tombcode" + code, "acluckycarpviewcommonwordbg",
            'tombboat_ske', 'tombboat_tex_json', 'tombboat_tex_png',
            'whirlpool_ske', 'whirlpool_tex_json', 'whirlpool_tex_png', "tombbg6-" + code
            //"aobaibg1","aobaibg2","aobaibg3","aobaibg4"
        ]);
    };
    AcLocTombView.prototype.initBg = function () {
        var view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        view._movieGroup = new BaseDisplayObjectContainer();
        view._movieGroup.width = view.width;
        view._movieGroup.height = view.height;
        view._movieGroup.anchorOffsetX = view._movieGroup.width / 2;
        view._movieGroup.anchorOffsetY = view._movieGroup.height / 2;
        view.addChildAt(view._movieGroup, 2);
        view._movieGroup.x = view._movieGroup.anchorOffsetX;
        view._movieGroup.y = view._movieGroup.anchorOffsetY;
        var whirlpool = null;
        if (App.CommonUtil.check_dragon()) {
            whirlpool = App.DragonBonesUtil.getLoadDragonBones('whirlpool', 0);
            whirlpool.x = 320;
            whirlpool.y = 520;
            whirlpool.playDragonMovie("bg", 0);
            view._movieGroup.addChild(whirlpool);
            var tombboat = App.DragonBonesUtil.getLoadDragonBones('tombboat', 0);
            tombboat.x = 320;
            tombboat.y = 520;
            view._movieGroup.addChild(tombboat);
            tombboat.playDragonMovie("bowen", 0);
        }
        else {
            whirlpool = BaseBitmap.create("tombbg6-" + view.code);
            whirlpool.x = 0;
            whirlpool.y = -40;
            view._movieGroup.addChild(whirlpool);
        }
    };
    AcLocTombView.prototype.getTitleStr = function () {
        return "loctombtitle-" + this.code;
    };
    /**
     * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
     */
    AcLocTombView.prototype.getReportTipData = function () {
        return { title: { key: "acPunishReportView-1" }, msg: { key: "loctombreport-" + this.code } };
    };
    AcLocTombView.prototype.initView = function () {
        var view = this;
        var code = view.code;
        view._period = view.vo.getCurPeriod();
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LOCTOMB_REFRESH, view.freshView, view);
        //底部
        view._isMove = false;
        var vo = view.vo;
        var bottomBg = BaseBitmap.create("tombdetailbg2-" + code);
        view.addChild(bottomBg);
        //按钮
        var shopBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'acwipeBossShop', view.shopClick, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, shopBtn, view, [80, 15]);
        view.addChild(shopBtn);
        view._shopBtn = shopBtn;
        var rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'emperorReward', view.rankClick, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, rankBtn, view, [80, 15]);
        view.addChild(rankBtn);
        if (view.vo.getpublicRedhot2()) {
            App.CommonUtil.addIconToBDOC(view._shopBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._shopBtn);
        }
        //底部详细信息
        var detailBg = BaseBitmap.create("tombdetailbg-" + code);
        view.addChild(detailBg);
        //活动日期
        var dateTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossDate', [view.vo.acTimeAndHour]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(dateTxt);
        //活动时间
        var opentime = view.cfg.getActTime();
        var timeTxt = ComponentManager.getTextField(LanguageManager.getlocal("loctombtime1-" + code, [opentime[0].toString(), opentime[1].toString()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(timeTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, detailBg, view, [0, 100]);
        bottomBg.height = GameConfig.stageHeigth - detailBg.y;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, dateTxt, detailBg, [25, 90]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, dateTxt, [0, dateTxt.textHeight + 8]);
        var detailTxt = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossDetailTitle"), 20, TextFieldConst.COLOR_WARN_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, detailTxt, detailBg, [0, 35]);
        view.addChild(detailTxt);
        //倒计时
        var timeCDbg = BaseBitmap.create("public_itemtipbg2");
        view._tipBg = timeCDbg;
        view.addChild(timeCDbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, timeCDbg, bottomBg, [0, -timeCDbg.height - 7]);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(""), 20, TextFieldConst.COLOR_WARN_GREEN);
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        view.addChild(tipTxt);
        view._tipTxt = tipTxt;
        view.freshText();
        //进入按钮
        var enterbtn = ComponentManager.getButton("tombchallenge-" + code, '', view.enterInHandler, view, null, 3);
        enterbtn.anchorOffsetX = enterbtn.width / 2;
        enterbtn.anchorOffsetY = enterbtn.height / 2;
        enterbtn.x = 310;
        enterbtn.y = 380;
        //0,(detailBg.y - view.titleBg.y - view.titleBg.height - enterbtn.height) / 2 + view.titleBg.height
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, enterbtn, view, [320,380]);
        egret.Tween.get(enterbtn, { loop: true }).to({ scaleX: 0.8, scaleY: 0.8 }, 800).to({ scaleX: 1, scaleY: 1 }, 800);
        view.addChild(enterbtn);
        view._enterBtn = enterbtn;
        //中部
        view.freshView();
    };
    AcLocTombView.prototype.freshText = function () {
        var view = this;
        var period = view.vo.getCurPeriod();
        var str = view.vo.getActDayTimeCount();
        view._tipTxt.text = str;
        view._tipBg.width = view._tipTxt.textWidth + 100;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, view._tipBg, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._tipTxt, view._tipBg);
    };
    AcLocTombView.prototype.shopClick = function () {
        var view = this;
        if (view.vo.isEnd) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACLOCTOMBSHOPVIEW, {
            aid: view.aid,
            code: view.code
        });
    };
    AcLocTombView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_LOCTOMBINFO, requestData: {
                activeId: view.vo.aidAndCode,
            } };
    };
    AcLocTombView.prototype.receiveData = function (data) {
        var view = this;
        view.vo.setZidInfo(data.data.data.zidgroup);
    };
    AcLocTombView.prototype.rankClick = function () {
        var view = this;
        if (view.vo.isEnd) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACLOCTOMBREWARDVIEW, {
            aid: view.aid,
            code: view.code
        });
    };
    AcLocTombView.prototype.freshView = function () {
        var view = this;
        if (!view.vo.isInActTime() || !view.vo.isInFightTime()) {
            view._enterBtn.visible = false;
        }
    };
    AcLocTombView.prototype.getRuleInfo = function () {
        return "loctombrule-" + this.code;
    };
    AcLocTombView.prototype.getRuleInfoParam = function () {
        var time = App.DateUtil.formatSvrHourByLocalTimeZone(24).hour;
        return [this.cfg.initialExplore.toString(), time.toString(), this.cfg.needKillNum.toString()];
    };
    AcLocTombView.prototype.getSoundBgName = function () {
        return SoundConst.MUSIC_TOMBWHIRLPOOL;
    };
    AcLocTombView.prototype.tick = function () {
        var view = this;
        if (!view.vo.isInActTime() || !view.vo.isInFightTime()) {
            view._enterBtn.visible = false;
        }
        if (view.vo.isInFightTime() && view.vo.isInActTime() && !view._isMove) {
            view._enterBtn.visible = true;
        }
        if (view.vo.getpublicRedhot2()) {
            App.CommonUtil.addIconToBDOC(view._shopBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._shopBtn);
        }
        view.freshText();
        var period = view.vo.getCurPeriod();
        if (period != view._period) {
            view.freshView();
        }
        view._period = period;
        //view.freshView();
    };
    AcLocTombView.prototype.enterInHandler = function () {
        var _this = this;
        var view = this;
        var period = view.vo.getCurPeriod();
        if (period <= 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime0"));
        }
        else if (period == 2) {
            view._isMove = true;
            var tmpX_1 = view._movieGroup.x;
            var tmpY_1 = view._movieGroup.y;
            view._enterBtn.visible = false;
            egret.Tween.get(view._movieGroup).to({ scaleX: 1.7, scaleY: 1.7 }, 1000).call(function () {
                ViewController.getInstance().openView(ViewConst.COMMON.ACLOCTOMBSEAVIEW, {
                    aid: _this.aid,
                    code: _this.code
                });
            }, view).wait(1000).call(function () {
                egret.Tween.removeTweens(view._movieGroup);
                view._movieGroup.setScale(1);
                view._movieGroup.alpha = 1;
                view._movieGroup.x = tmpX_1;
                view._movieGroup.y = tmpY_1;
                view._enterBtn.visible = true;
                view._isMove = false;
            }, view);
        }
        else if (period == 3) {
            App.CommonUtil.showTip(LanguageManager.getlocal("loctombtimetip3-" + view.code));
        }
    };
    AcLocTombView.prototype.dispose = function () {
        var view = this;
        view._isMove = false;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LOCTOMB_REFRESH, view.freshView, view);
        view._enterBtn = null;
        view._shopBtn = null;
        view._period = 1;
        view._movieGroup = null;
        _super.prototype.dispose.call(this);
    };
    return AcLocTombView;
}(AcCommonView));
__reflect(AcLocTombView.prototype, "AcLocTombView");
//# sourceMappingURL=AcLocTombView.js.map