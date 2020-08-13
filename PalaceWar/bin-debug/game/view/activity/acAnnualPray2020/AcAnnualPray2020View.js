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
desc : 周年祈愿
*/
var AcAnnualPray2020View = (function (_super) {
    __extends(AcAnnualPray2020View, _super);
    function AcAnnualPray2020View() {
        var _this = _super.call(this) || this;
        _this._stop = false;
        _this._detailbtn = null;
        _this._useTxt = null;
        _this._wifeContainer = null;
        // public _servantContainer:BaseDisplayObjectContainer = null;
        _this._isShowWife = true;
        _this._skinTxt = null;
        _this._skinTxtEffect = null;
        _this.timebg = null;
        _this._cdText = null;
        _this._progressBar = null;
        _this._startPercent = 0;
        _this._maxLength = 1;
        _this._curLuckyTxt = null;
        _this._numDescTF = null;
        _this._boxRewardImg = null;
        _this._boxLightBM = null;
        _this._lightBall = null;
        _this._progressBg = null;
        _this._progressTF = null;
        _this._progressBM = null;
        _this._progressLight = null;
        /**鞭炮的 Container*/
        _this._bangerContainer = null;
        _this._bangerInfo = [];
        _this._isPlay = false;
        _this._redDot = null;
        _this._redPackLqEff = null;
        _this._haveTxtBg = null;
        _this._haveTxt = null;
        _this._itemicon = null;
        _this._descTxt = null;
        _this.tenplay = false;
        _this._oldTotal = 0;
        _this.lihuaCfg = {
            1: { color: "red", framenum: 10, firenum: 10, width: 500, height: 500 },
            2: { color: "purple", framenum: 12, firenum: 10, width: 450, height: 450 },
            3: { color: "blue", framenum: 11, firenum: 10, width: 450, height: 450 },
            4: { color: "green", framenum: 11, firenum: 10, width: 400, height: 400 },
        };
        return _this;
    }
    Object.defineProperty(AcAnnualPray2020View.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualPray2020View.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualPray2020View.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcAnnualPray2020View.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcAnnualPray2020View.prototype.getRuleInfo = function () {
        var code = this.getUiCode();
        if (Api.switchVoApi.checkServantRefuseBattle()) {
            return "acAnnualPrayrule-" + code + "_withOpenRefusal";
        }
        return "acAnnualPrayrule-" + code;
    };
    AcAnnualPray2020View.prototype.getProbablyInfo = function () {
        return App.CommonUtil.getCnByCode("acAnnualPrayProbablyinfo", this.getUiCode());
    };
    AcAnnualPray2020View.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    // 背景图名称
    AcAnnualPray2020View.prototype.getBgName = function () {
        var code = this.getUiCode();
        return App.CommonUtil.getResByCode("annualpraybg", code);
    };
    AcAnnualPray2020View.prototype.preInit = function () {
        _super.prototype.preInit.call(this);
        var view = this;
        var localkey = this.acTivityId + this.vo.et + Api.playerVoApi.getPlayerID();
        var lastTime = 0;
        var timeStr = LocalStorageManager.get(localkey);
        if (timeStr && timeStr != "") {
            lastTime = Number(timeStr);
        }
        if (App.DateUtil.checkIsToday(lastTime)) {
            LocalStorageManager.set(localkey, String(GameData.serverTime));
            ViewController.getInstance().openView(ViewConst.BASE.ACANNUALPRAYPREVVIEW, {
                aid: view.aid,
                code: view.code,
            });
        }
    };
    AcAnnualPray2020View.prototype.initBg = function () {
        var view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseLoadBitmap.create(bgName);
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            this.viewBg.width = 640;
            this.viewBg.height = 1136;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
        }
    };
    AcAnnualPray2020View.prototype.getTitleBgName = function () {
        var code = this.getUiCode();
        return App.CommonUtil.getResByCode("annualpraytitle", code);
    };
    AcAnnualPray2020View.prototype.getTitleStr = function () {
        return null;
    };
    /**
     * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
     */
    AcAnnualPray2020View.prototype.getReportTipData = function () {
        return { title: { key: App.CommonUtil.getCnByCode("acannualprayreporttitle", this.getUiCode()) }, msg: { key: App.CommonUtil.getCnByCode("acDechuanshidaireportmsg", this.getUiCode()) } };
    };
    AcAnnualPray2020View.prototype.getResourceList = function () {
        var view = this;
        var code = view.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "annualpraycode1", "acwealthcarpview_skineffect1", "arena_bottom", "wife_btnbg",
            "acwealthcomingview_progresslight", "acgiftreturnview_common_skintxt", "acsearchproofview_common_skintxt",
            "progress12", "progress12_bg", "acwealthcomingview_numbg", "acwealthcomingview_box_1", "acwealthcomingview_box_light", "acwealthcomingview_lightball", "acwealthcomingview_box_2",
            "boxboomeffect", "boxrewardfly-1", 'specialview_commoni_namebg', "acworshipview_box1", "acworshipview_box2", "acworshipview_box3"
        ]);
    };
    AcAnnualPray2020View.prototype.getContainerY = function () {
        return 83;
    };
    AcAnnualPray2020View.prototype.initView = function () {
        var _this = this;
        var view = this;
        var code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        view.container.width = view.width;
        view.container.height = view.height - 83;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACDESTORYSAME_MAKELINE, view.makePointLine, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ANNUALPRAY_PRAY), view.attackCallback, view);
        var dikukang1 = BaseBitmap.create(App.CommonUtil.getResByCode("annualpraynpcbg", code));
        view.addChildToContainer(dikukang1);
        //top背景图
        var topbg = BaseBitmap.create(App.CommonUtil.getResByCode("annualpraytopbg", code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, topbg, view.titleBg, [0]);
        view.addChildToContainer(topbg);
        var titleTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        // this._effect.setScale(2);
        var titleTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
        titleTxtEffect.setPosition(-30, topbg.y + 25);
        titleTxtEffect.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(titleTxtEffect);
        titleTxtEffect.playWithTime(-1);
        var titleTxt = BaseBitmap.create("acgiftreturnview_common_skintxt");
        titleTxt.anchorOffsetX = titleTxt.width / 2;
        titleTxt.anchorOffsetY = titleTxt.height / 2;
        titleTxt.setPosition(topbg.x + 65, topbg.y + 100);
        this.addChildToContainer(titleTxt);
        egret.Tween.get(titleTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        var titleTxteffect = BaseBitmap.create("acgiftreturnview_common_skintxt");
        titleTxteffect.anchorOffsetX = titleTxteffect.width / 2;
        titleTxteffect.anchorOffsetY = titleTxteffect.height / 2;
        titleTxteffect.setPosition(titleTxt.x, titleTxt.y);
        this.addChildToContainer(titleTxteffect);
        titleTxteffect.blendMode = egret.BlendMode.ADD;
        titleTxteffect.alpha = 0;
        egret.Tween.get(titleTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        //透明点击区域
        var titletouchPos = BaseBitmap.create("public_alphabg");
        titletouchPos.width = 180;
        titletouchPos.height = 176;
        titletouchPos.setPosition(topbg.x, topbg.y);
        view.addChildToContainer(titletouchPos);
        titletouchPos.addTouchTap(function () {
            if (view._stop) {
                return;
            }
            var topMsg = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acAnnualPrayPrayTip11", code));
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONTITLEPOPUPVIEW, { titleId: _this.getUiCode() == "1" ? "4039" : '', topMsg: topMsg });
        }, ViewController);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acAnnualPraydesc", code)), 18);
        tipTxt.width = 520;
        tipTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, topbg, [130, 18]);
        view.addChildToContainer(tipTxt);
        var timeTxt = ComponentManager.getTextField("" + view.vo.getAcLocalTime(true, String(0xffffff)), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, tipTxt, [0, tipTxt.textHeight + 7]);
        view.addChildToContainer(timeTxt);
        //奖励进度
        var progressbg = BaseBitmap.create(App.CommonUtil.getResByCode("annualprayprogressbg", code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progressbg, topbg, [0, topbg.height - 5]);
        view.addChildToContainer(progressbg);
        //次数this._bg
        var numbg = BaseBitmap.create("acwealthcomingview_numbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, numbg, progressbg, [12, 0]);
        view.addChildToContainer(numbg);
        //进度条
        var progressbar = ComponentManager.getProgressBar("progress12", "progress12_bg", 445);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, progressbar, progressbg, [numbg.width, 0]);
        var v = view.cfg.getTotalProgress();
        view._startPercent = Math.min(1, view.vo.getPrayNum() / v); //this._maxLength * view.vo.getLuckyProgress() / cfg.luckyProcess;
        progressbar.setPercentage(view._startPercent);
        view._progressBar = progressbar;
        view.addChildToContainer(progressbar);
        //财运TF
        var numDescTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acAnnualPrayPrayNum", code)), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        if (PlatformManager.checkIsEnLang()) {
            numDescTF.size = 16;
        }
        numDescTF.setPosition(numbg.x + numbg.width / 2 - numDescTF.width / 2, numbg.y + 28);
        view.addChildToContainer(numDescTF);
        view._numDescTF = numDescTF;
        //数量TF
        view._curLuckyTxt = ComponentManager.getTextField(view.vo.getPrayNum().toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        view._curLuckyTxt.width = 60;
        view._curLuckyTxt.textAlign = egret.HorizontalAlign.CENTER;
        view._curLuckyTxt.setPosition(numDescTF.x + numDescTF.width / 2 - view._curLuckyTxt.width / 2, numDescTF.y + numDescTF.height + 2);
        view.addChildToContainer(view._curLuckyTxt);
        //奖励宝箱
        this._boxRewardImg = BaseBitmap.create("acwealthcomingview_box_1");
        this._boxRewardImg.anchorOffsetX = this._boxRewardImg.width / 2;
        this._boxRewardImg.anchorOffsetY = this._boxRewardImg.height;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, this._boxRewardImg, progressbg, [12, -8]);
        this.addChildToContainer(this._boxRewardImg);
        this._boxRewardImg.addTouchTap(function () {
            if (view._isPlay) {
                return;
            }
            // ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKYDRAWREWARDPOPUPVIEW, {
            //     aid: this.aid, 
            //     code: this.code, 
            // });
            ViewController.getInstance().openView(ViewConst.POPUP.ACANNUALPRAYPOPUPVIEW2, {
                aid: _this.aid,
                code: _this.code,
            });
        }, this);
        //宝箱光 584 816  582.5 810
        this._boxLightBM = BaseBitmap.create("acwealthcomingview_box_light");
        this._boxLightBM.anchorOffsetX = this._boxLightBM.width / 2 - 1.5;
        this._boxLightBM.anchorOffsetY = this._boxLightBM.height / 2 + this._boxRewardImg.width / 2 - 2 + 3;
        this._boxLightBM.setPosition(this._boxRewardImg.x, this._boxRewardImg.y);
        this.addChildToContainer(this._boxLightBM);
        this._boxLightBM.alpha = 0;
        this._redDot = BaseBitmap.create("public_dot2");
        this._redDot.setPosition(this._boxRewardImg.x + this._boxRewardImg.width / 2 - this._redDot.width / 2, this._boxRewardImg.y - this._boxRewardImg.height + this._redDot.height / 2);
        this.addChildToContainer(this._redDot);
        this._redPackLqEff = ComponentManager.getCustomMovieClip("newyeargiftlqeff", 6);
        this._redPackLqEff.blendMode = egret.BlendMode.ADD;
        this._redPackLqEff.width = 134;
        this._redPackLqEff.height = 110;
        this._redPackLqEff.playWithTime(-1);
        this.addChildToContainer(this._redPackLqEff);
        this._redPackLqEff.setPosition(this._boxRewardImg.x - 67, this._boxRewardImg.y - 95);
        if (view.vo.getpublicRedhot3()) {
            this._boxRewardImg.setRes("acwealthcomingview_box_2");
        }
        else {
            this._boxRewardImg.setRes("acwealthcomingview_box_1");
        }
        this._redPackLqEff.visible = this._redDot.visible = view.vo.getpublicRedhot3();
        //文字
        var boxWordBM = BaseBitmap.create(App.CommonUtil.getResByCode("annualprayrewardtitle", code));
        boxWordBM.setPosition(this._boxRewardImg.x - boxWordBM.width / 2, this._boxRewardImg.y - boxWordBM.height / 2);
        this.addChildToContainer(boxWordBM);
        this._lightBall = BaseBitmap.create("acwealthcomingview_lightball");
        this._lightBall.anchorOffsetX = this._lightBall.width / 2;
        this._lightBall.anchorOffsetY = this._lightBall.height / 2;
        this._lightBall.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(this._lightBall);
        this._lightBall.alpha = 0;
        //进度文本
        var curJindu = view.vo.getPrayNum();
        var next = view.cfg.getTotalProgress();
        var progressstr = curJindu + "/" + next;
        if (curJindu >= view.cfg.getTotalProgress()) {
            progressstr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acAnnualPrayPrayTip1", code));
        }
        this._progressTF = ComponentManager.getTextField(progressstr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._progressTF.setPosition(this._progressBar.x + this._progressBar.width / 2 - this._progressTF.width / 2, this._progressBar.y + this._progressBar.height + 7);
        this.addChildToContainer(this._progressTF);
        this._progressLight = BaseBitmap.create("acwealthcomingview_progresslight");
        this._progressLight.anchorOffsetX = this._progressLight.width;
        this._progressLight.anchorOffsetY = this._progressLight.height / 2;
        this._progressLight.setPosition(this._progressBar.x + this._progressBar.width * this._startPercent, this._progressBar.y + this._progressBar.height / 2);
        this.addChildToContainer(this._progressLight);
        this._progressLight.setVisible(false);
        //活动详情
        var detailbtn = ComponentManager.getButton(App.CommonUtil.getResByCode("anualpraydetailbtn", code), "", function () {
            if (view._stop) {
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACANNUALPRAYPOPUPVIEW, {
                aid: view.aid,
                code: view.code
            });
        }, view);
        view.addChildToContainer(detailbtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, detailbtn, progressbg, [15, progressbg.height + 10]);
        view._detailbtn = detailbtn;
        //奖池展示
        var rewardbtn = ComponentManager.getButton(App.CommonUtil.getResByCode("anualprayrewardbtn", code), "", function () {
            if (view._stop) {
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACANNUALPRAYREWARDPOOLVIEW, {
                aid: view.aid,
                code: view.code
            });
        }, view);
        view.addChildToContainer(rewardbtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, rewardbtn, progressbg, [15, progressbg.height + 10]);
        var bottombg = BaseBitmap.create(App.CommonUtil.getResByCode("annualpraybottombg", code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view.container, [0, -40], true);
        //人物形象
        // let cal = (bottombg.height + dikukang1.height - 30) - (view.container.height - progressbg.y - progressbg.height)
        // if(cal > 0){
        //     App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view.container, [0,-cal-10], true);
        // }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, dikukang1, bottombg, [0, bottombg.height - 50]);
        //红颜
        this._wifeContainer = this.createWifeOrServant(this.cfg.getSkin(code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._wifeContainer, dikukang1, [0, 40]);
        this.addChildToContainer(this._wifeContainer);
        // this._wifeContainer.visible = false;
        //门客
        // this._servantContainer = this.createWifeOrServant(this.cfg.getServant(code));
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._servantContainer, dikukang1, [0,40]);
        // this.addChildToContainer(this._servantContainer);
        view.addChildToContainer(bottombg);
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        // this._effect.setScale(2);
        skinTxtEffect.width = 208;
        skinTxtEffect.height = 154;
        var skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, skinTxtEffect, dikukang1, [0, 30]);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        var skinTxt = BaseBitmap.create("acsearchproofview_common_skintxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
        this.addChildToContainer(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        this._skinTxt = skinTxt;
        var skinTxteffect = BaseBitmap.create("acsearchproofview_common_skintxt");
        skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
        skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, skinTxteffect, skinTxt);
        this.addChildToContainer(skinTxteffect);
        skinTxteffect.blendMode = egret.BlendMode.ADD;
        skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        this._skinTxtEffect = skinTxteffect;
        //透明点击区域
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = 160;
        touchPos.height = 80;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, touchPos, skinTxtEffect);
        view.addChildToContainer(touchPos);
        touchPos.addTouchTap(function () {
            if (view._stop) {
                return;
            }
            var wifeSkinId = _this.cfg.getSkin(code);
            //let servantSkinId = this.cfg.getServant(code);
            var wifetitleId = Config.WifeskinCfg.formatRewardItemVoStr(wifeSkinId);
            //let servanttitleId = Config.ServantskinCfg.formatRewardItemVoStr(servantSkinId);
            var title = "acCommonServantSkinPopupViewTitle";
            var data = null;
            var topMsg1 = LanguageManager.getlocal("acAnnualPrayPrayTip4-" + code);
            var topMsg2 = LanguageManager.getlocal("acAnnualPrayPrayTip2-" + code);
            if (view._isShowWife) {
                data = { data: [
                        { idType: wifetitleId, topMsg: topMsg1, bgName: "", scale: 0.6, title: "skinViewTab2" },
                    ] };
            }
            else {
                data = { data: [
                        //{idType: servanttitleId, topMsg:topMsg2, bgName:"", scale: 0.8, title:`skinViewTab1`},
                        { idType: wifetitleId, topMsg: topMsg1, bgName: "", scale: 0.6, title: "skinViewTab2" },
                    ] };
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
        }, ViewController);
        var descBg = BaseBitmap.create(App.CommonUtil.getResByCode("annualpraybottomdescbg", code));
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(this._isShowWife ? "acAnnualPrayPrayTip4" : "acAnnualPrayPrayTip2", code)), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(descBg);
        view.addChildToContainer(descTxt);
        view._descTxt = descTxt;
        descBg.width = descTxt.width + 40;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, bottombg, [0, -descBg.height + 10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descBg);
        for (var i = 1; i < 5; ++i) {
            var group = new BaseDisplayObjectContainer();
            view.addChildToContainer(group);
            group.width = 110;
            group.height = 145;
            group.name = "group" + i;
            group.x = bottombg.x + (40 + (i - 1) * (110 + 45));
            group.y = bottombg.y + 20;
            //鞭炮底层闪耀光
            var crackbg = BaseBitmap.create(App.CommonUtil.getResByCode("annualpraycrackbg", code));
            crackbg.setPosition(-35, -25);
            group.addChild(crackbg);
            crackbg.name = "crackbg" + i;
            var img = BaseLoadBitmap.create(App.CommonUtil.getResByCode("annualpraycrack" + i, code));
            img.width = 100;
            img.height = 100;
            group.addChild(img);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, img, group, [0, 0], true);
            var lightbg = BaseBitmap.create(App.CommonUtil.getResByCode("annualpraycracklight", code));
            group.addChild(lightbg);
            lightbg.name = "lightbg" + i;
            lightbg.setScale(0.9);
            lightbg.setPosition(18, 15);
            //App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lightbg, img);
            var wife_btnbg = BaseBitmap.create("wife_btnbg");
            wife_btnbg.name = "wife_btnbg" + i;
            group.addChild(wife_btnbg);
            wife_btnbg.width = 100;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, wife_btnbg, img, [-5, img.height - 5]);
            var typeTxt = ComponentManager.getTextField("X" + view.vo.dayNumById(i), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            typeTxt.name = "typeTxt" + i;
            group.addChild(typeTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, typeTxt, wife_btnbg);
        }
        //回忆
        var destroyone = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, App.CommonUtil.getCnByCode("acAnnualPrayPrayCost1", code), function () {
            //消耗一次
            if (view._stop) {
                return;
            }
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (view.vo.getFreeNum() == 0 && view.vo.getCrackNum() < (view.cfg.cost)) {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acAnnualPrayPrayTip6", code)));
            }
            else {
                //
                view._stop = true;
                view.tenplay = false;
                view._oldTotal = view.vo.getPrayNum();
                NetManager.request(NetRequestConst.REQUEST_ANNUALPRAY_PRAY, {
                    activeId: view.acTivityId,
                    isFree: view.vo.getFreeNum() > 0 ? 1 : 0,
                    isTenPlay: 0
                });
            }
        }, view, null, 0);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, destroyone, view.container, [80, 27], true);
        view.addChildToContainer(destroyone);
        var useIcon = BaseBitmap.create(App.CommonUtil.getResByCode("annualpraycrackitemicon2", code));
        view.addChildToContainer(useIcon);
        var useTxt = ComponentManager.getTextField("X" + view.cfg.cost, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(useTxt);
        view._useTxt = useTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, useIcon, destroyone, [25, -useIcon.height - 3]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, useTxt, useIcon, [useIcon.width, 0]);
        var destroyall = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, App.CommonUtil.getCnByCode("acAnnualPrayPrayCost10", code), function () {
            //消耗10次
            if (view._stop) {
                return;
            }
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (view.vo.getCrackNum() < (view.cfg.cost * 10)) {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acAnnualPrayPrayTip6", code)));
            }
            else {
                //
                view._stop = true;
                view.tenplay = true;
                view._oldTotal = view.vo.getPrayNum();
                NetManager.request(NetRequestConst.REQUEST_ANNUALPRAY_PRAY, {
                    activeId: view.acTivityId,
                    isFree: 0,
                    isTenPlay: 1
                });
            }
        }, view, null, 0);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, destroyall, view.container, [80, 27], true);
        view.addChildToContainer(destroyall);
        var alluseIcon = BaseBitmap.create(App.CommonUtil.getResByCode("annualpraycrackitemicon2", code));
        view.addChildToContainer(alluseIcon);
        var alluseTxt2 = ComponentManager.getTextField("X" + (view.cfg.cost * 10).toFixed(0), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(alluseTxt2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, alluseIcon, destroyall, [(destroyall.width - alluseIcon.width - alluseTxt2.width) / 2, -alluseIcon.height - 3]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, alluseTxt2, alluseIcon, [alluseIcon.width, 0]);
        var haveTxtbg = BaseBitmap.create("specialview_commoni_namebg");
        view.addChildToContainer(haveTxtbg);
        view._haveTxtBg = haveTxtbg;
        var itemicon = BaseBitmap.create(App.CommonUtil.getResByCode("annualpraycrackitemicon2", code));
        view.addChildToContainer(itemicon);
        view._itemicon = itemicon;
        var haveTxt = ComponentManager.getTextField("" + view.vo.getCrackNum(), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(haveTxt);
        view._haveTxt = haveTxt;
        haveTxtbg.width = haveTxt.width + 80;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, haveTxtbg, bottombg, [0, 180]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, itemicon, haveTxtbg, [7, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, haveTxt, haveTxtbg);
        this._bangerContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._bangerContainer);
        this.initBanger();
        this.refreshBanger(this._startPercent);
        //倒计时位置 
        var timebg = BaseBitmap.create("public_9_bg61");
        view.addChildToContainer(timebg);
        timebg.x = 380;
        timebg.y = topbg.y + topbg.height - (timebg.height / 2);
        this.timebg = timebg;
        var str = view.vo.isInActivity() ? "acLuckyDrawTopTip2-1" : "acLaborDaytime-1";
        var tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]), 20);
        view.addChildToContainer(tip2Text);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tip2Text, timebg);
        // if(timebg.width<270)
        // {
        //     timebg.width = 270;
        //     timebg.x =350;
        //     tip2Text.x = this.timebg.x+(timebg.width-tip2Text.width )*0.5;
        // }
        this._cdText = tip2Text;
        this.container.setChildIndex(this._progressBM, 99);
        this.tick();
        view.freshView();
    };
    AcAnnualPray2020View.prototype.freshView = function () {
        var view = this;
        if (view.vo.getpublicRedhot1() || view.vo.getpublicRedhot3() || view.vo.getpublicRedhot4()) {
            App.CommonUtil.addIconToBDOC(view._detailbtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._detailbtn);
        }
        if (view.vo.getFreeNum()) {
            view._useTxt.text = LanguageManager.getlocal("sysFreeDesc");
        }
        else {
            view._useTxt.text = "X " + view.cfg.cost;
        }
        view._haveTxt.text = view.vo.getCrackNum().toString();
        view._haveTxtBg.width = view._haveTxt.width + 80;
        view._haveTxtBg.x = (GameConfig.stageWidth - view._haveTxtBg.width) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._itemicon, view._haveTxtBg, [7, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._haveTxt, view._haveTxtBg);
        view._curLuckyTxt.text = view.vo.getPrayNum().toString();
        view._curLuckyTxt.setPosition(view._numDescTF.x + view._numDescTF.width / 2 - view._curLuckyTxt.width / 2, view._numDescTF.y + view._numDescTF.height + 2);
        for (var i = 1; i < 5; ++i) {
            var group = view.container.getChildByName("group" + i);
            var wife_btnbg = group.getChildByName("wife_btnbg" + i);
            var typeTxt = group.getChildByName("typeTxt" + i);
            typeTxt.text = "X" + view.vo.dayNumById(i);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, typeTxt, wife_btnbg);
        }
        //进度条
        if (view.vo.getpublicRedhot3()) {
            this._boxRewardImg.setRes("acwealthcomingview_box_2");
        }
        else {
            this._boxRewardImg.setRes("acwealthcomingview_box_1");
        }
        this._redPackLqEff.visible = this._redDot.visible = view.vo.getpublicRedhot3();
        var curJindu = view.vo.getPrayNum();
        var next = view.cfg.getTotalProgress();
        var progressstr = curJindu + "/" + next;
        if (curJindu >= view.cfg.getTotalProgress()) {
            progressstr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acAnnualPrayPrayTip1", this.getUiCode()));
        }
        this._progressTF.text = progressstr;
        view._progressTF.setPosition(this._progressBar.x + this._progressBar.width / 2 - this._progressTF.width / 2, this._progressBar.y + this._progressBar.height + 7);
        this.refreshBanger(this._startPercent);
    };
    /**初始化鞭炮相关 */
    AcAnnualPray2020View.prototype.initBanger = function () {
        var _this = this;
        var view = this;
        for (var i = 0; i < this._bangerInfo.length; i++) {
            this._bangerContainer.removeChild(this._bangerInfo[i].bangerBM);
            this._bangerInfo[i].bangerBM.dispose();
        }
        this._bangerInfo.length = 0;
        var procsscfg = view.cfg.processingReward;
        var v = view.cfg.getTotalProgress();
        var _loop_1 = function (i) {
            // if(Number(i) == procsscfg.length - 1){
            // }
            var value = procsscfg[i].ratetime;
            var p = value / v;
            var bangerBM = BaseBitmap.create("acworshipview_box2");
            bangerBM.anchorOffsetX = bangerBM.width / 2;
            bangerBM.anchorOffsetY = bangerBM.height / 2;
            bangerBM.setPosition(this_1._progressBar.x + this_1._progressBar.width * this_1._maxLength * p, this_1._progressBar.y + this_1._progressBar.height / 2 - 7);
            this_1._bangerContainer.addChild(bangerBM);
            bangerBM.addTouchTap(function () {
                if (view._isPlay) {
                    return;
                }
                //奖励预览
                // ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKYDRAWREWARDPOPUPVIEW, {
                //     aid: this.aid, 
                //     code: this.code, 
                //     id: Number(i)
                // });
                _this.vo.showId = Number(i);
                ViewController.getInstance().openView(ViewConst.POPUP.ACANNUALPRAYPOPUPVIEW2, {
                    aid: _this.aid,
                    code: _this.code,
                    id: Number(i)
                });
            }, this_1);
            var isPlayAni = view.vo.getPrayNum() >= value ? false : true;
            this_1._bangerInfo.push({ id: i, bangerBM: bangerBM, value: procsscfg[i].ratetime, isPlayAni: isPlayAni, percent: Math.round(this_1._maxLength * p * 1000) });
        };
        var this_1 = this;
        for (var i in procsscfg) {
            _loop_1(i);
        }
        this._progressBM = BaseBitmap.create(App.CommonUtil.getResByCode("annualprayprogresspoint", this.getUiCode()));
        this._progressBM.anchorOffsetX = this._progressBM.width / 2;
        this._progressBM.anchorOffsetY = this._progressBM.height;
        this._progressBM.setPosition(this._progressBar.x + this._progressBar.width * this._startPercent, this._progressBar.y - 10);
        this.addChildToContainer(this._progressBM);
    };
    AcAnnualPray2020View.prototype.refreshBangerHandele = function () {
        this.refreshBanger(this._startPercent);
    };
    /**刷新 鞭炮 */
    AcAnnualPray2020View.prototype.refreshBanger = function (percent) {
        var view = this;
        var percentTmp = Math.round(percent * 1000);
        for (var i = 0; i < this._bangerInfo.length; i++) {
            if (percentTmp >= this._bangerInfo[i].percent) {
                if (this.vo.isGetJinduAward(this._bangerInfo[i].id)) {
                    this._bangerInfo[i].bangerBM.setRes("acworshipview_box3");
                }
                else {
                    this._bangerInfo[i].bangerBM.setRes("acworshipview_box1");
                }
                if (this._bangerInfo[i].isPlayAni) {
                    this._bangerInfo[i].isPlayAni = false;
                    //播放动画
                    this.playBangerAni(this._bangerInfo[i].bangerBM, this._bangerInfo[i].bangerBM.x, this._bangerInfo[i].bangerBM.y, this._boxRewardImg.x, this._boxRewardImg.y - this._boxRewardImg.height / 2);
                }
            }
            else {
                this._bangerInfo[i].bangerBM.setRes("acworshipview_box2");
            }
        }
    };
    /**鞭炮的动画 */
    AcAnnualPray2020View.prototype.playBangerAni = function (bangerBM, startPosX, startPosY, endPosX, endPosY) {
        var _this = this;
        //bangerBM.setVisible(false);
        var boomEffect = ComponentManager.getCustomMovieClip("boxboomeffect", 8, 70);
        boomEffect.anchorOffsetX = 65;
        boomEffect.anchorOffsetY = 60;
        var boom = BaseBitmap.create("boxrewardfly-1");
        boomEffect.setScale(1.25);
        boom.setScale(1.25);
        boomEffect.setPosition(startPosX - boom.width * 1.25 / 2, startPosY - boom.height * 1.25 / 2);
        this.addChildToContainer(boomEffect);
        boomEffect.playWithTime(1);
        boomEffect.setEndCallBack(function () {
            _this.container.removeChild(boomEffect);
            boomEffect.dispose();
            _this._lightBall.setPosition(startPosX, startPosY);
            _this._lightBall.alpha = 1;
            _this._lightBall.setScale(0.1);
            _this._lightBall.rotation = 0;
            var distanceX = endPosX - startPosX;
            var distanceY = endPosY - startPosY;
            egret.Tween.get(_this._lightBall).to({
                rotation: 360 * 0.14,
                scaleX: 0.8,
                scaleY: 0.8,
                x: startPosX + distanceX * 0.3,
                y: startPosY + distanceY * 0.3
            }, 140).to({
                rotation: 360 * 0.54,
                scaleX: 1,
                scaleY: 1,
                x: startPosX + distanceX * 1,
                y: startPosY + distanceY * 1
            }, 400).call(function () {
                if (_this.vo.getpublicRedhot3()) {
                    _this._boxRewardImg.setRes("acwealthcomingview_box_2");
                }
                else {
                    _this._boxRewardImg.setRes("acwealthcomingview_box_1");
                }
                _this._redDot.visible = _this._redPackLqEff.visible = false;
                _this._boxRewardImg.setScale(1.1);
                _this._boxLightBM.setScale(1.1);
                _this._boxLightBM.alpha = 1;
                egret.Tween.get(_this._boxRewardImg).to({
                    scaleX: 1,
                    scaleY: 1,
                }, 750).call(function () {
                    _this._redPackLqEff.visible = _this._redDot.visible = _this.vo.getpublicRedhot3();
                    egret.Tween.removeTweens(_this._boxRewardImg);
                    // bangerBM.setVisible(true);
                    var startPercentTmp = Math.round(_this._startPercent * 1000);
                    var maxLengthTmp = Math.round(_this._maxLength * 1000);
                    console.log("startPercentTmp:  " + startPercentTmp);
                    console.log("maxLengthTmp:  " + maxLengthTmp);
                }, _this);
                egret.Tween.get(_this._boxLightBM).to({
                    scaleX: 1,
                    scaleY: 1,
                    alpha: 0,
                }, 750).call(function () {
                    egret.Tween.removeTweens(_this._boxLightBM);
                }, _this);
            }, _this).to({
                scaleX: 1.3,
                scaleY: 1,
                rotation: 360 * 1,
                alpha: 0,
            }, 460).call(function () {
                egret.Tween.removeTweens(_this._lightBall);
            }, _this);
        }, this);
    }; /**
     * 进度条的动画
     */
    AcAnnualPray2020View.prototype.playProgressBarAni = function (startPercent, endPercent, speed) {
        var _this = this;
        this._isPlay = true;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        //每次初始化
        this._progressBar.setPercentage(startPercent);
        egret.Tween.removeTweens(this._progressBar);
        this._progressBM.setPosition(this._progressBar.x + this._progressBar.width * startPercent, this._progressBar.y);
        this._progressLight.setPosition(this._progressBar.x + this._progressBar.width * startPercent, this._progressBar.y + this._progressBar.height / 2);
        var startTemp = Math.round(startPercent * 1000);
        var endTemp = Math.round(endPercent * 1000);
        var maxTemp = Math.round(this._maxLength * 1000);
        var everyTimeValue = speed;
        var op = true;
        egret.Tween.get(this._progressBar, { loop: true }).wait(0.1).call(function () {
            _this._progressLight.setVisible(true);
            if (op) {
                //增量动画
                startPercent += everyTimeValue;
                _this.refreshBanger(startPercent);
                startTemp = Math.round(startPercent * 1000);
                if (startTemp > endTemp) {
                    egret.Tween.removeTweens(_this._progressBar);
                    _this._progressLight.setVisible(false);
                    if (startTemp > maxTemp) {
                        _this._isPlay = false;
                        egret.Tween.removeTweens(_this._progressBar);
                        _this._progressLight.setVisible(false);
                        return;
                    }
                    else {
                        _this._isPlay = false;
                    }
                    return;
                }
            }
            if (startTemp > maxTemp) {
                _this.refreshBanger(startPercent);
                egret.Tween.removeTweens(_this._progressBar);
                _this._progressLight.setVisible(false);
                _this._isPlay = false;
                return;
            }
            _this.refreshBanger(startPercent);
            _this._progressBar.setPercentage(startPercent);
            _this._progressBM.setPosition(_this._progressBar.x + _this._progressBar.width * startPercent, _this._progressBar.y);
            _this._progressLight.setPosition(_this._progressBar.x + _this._progressBar.width * startPercent, _this._progressBar.y + _this._progressBar.height / 2);
            _this._startPercent = startPercent;
            _this._isPlay = false;
        }, this);
    };
    AcAnnualPray2020View.prototype.tick = function () {
        var view = this;
        if (view._cdText) {
            var str = '';
            if (view.vo.isInActivity()) {
                str = App.DateUtil.getFormatBySecond(view.vo.getCountDown());
            }
            else {
                str = "<font color=0x21eb39>" + LanguageManager.getlocal("acPunishEnd") + "</font>";
            }
            view._cdText.text = LanguageManager.getlocal("acLuckyDrawTopTip2-" + view.code, [str]);
            if (this.timebg) {
                this.timebg.width = view._cdText.width + 50;
                this.timebg.x = 380;
                this._cdText.x = this.timebg.x + (this.timebg.width - this._cdText.width) * 0.5;
            }
        }
    };
    AcAnnualPray2020View.prototype.hide = function () {
        if (this._stop) {
            return;
        }
        _super.prototype.hide.call(this);
    };
    AcAnnualPray2020View.prototype.attackCallback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var data = evt.data.data.data;
            if (data) {
                var index = 0;
                var reawrdarr = GameData.formatRewardItem(data.rewards);
                if (view.tenplay) {
                    view.showLihua(index, data.rewards, 8);
                }
                else {
                    var unit = reawrdarr[0];
                    view.showLihua(unit.id, data.rewards, 1);
                }
            }
        }
        else {
            view._stop = false;
        }
    };
    AcAnnualPray2020View.prototype.showLihua = function (id, rewards, playtimes) {
        var _this = this;
        var view = this;
        //获取播放点
        var index = id == 0 ? ((9 - playtimes) % 4 == 0 ? 4 : (9 - playtimes) % 4) : id;
        var group = view.container.getChildByName("group" + index);
        if (playtimes > 0) {
            var end_1 = false;
            var cfg = this.lihuaCfg[index];
            var fireeff_1 = ComponentManager.getCustomMovieClip("newyearlihua" + cfg.color + "fire", cfg.firenum, 70);
            fireeff_1.width = 150;
            fireeff_1.height = 500;
            fireeff_1.playWithTime(1);
            this.addChildToContainer(fireeff_1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, fireeff_1, group, [0, -420]);
            fireeff_1.setEndCallBack(function () {
                fireeff_1.dispose();
                fireeff_1 = null;
            }, view);
            var lihua_1 = ComponentManager.getCustomMovieClip("newyearlihua" + cfg.color, cfg.framenum, 70);
            lihua_1.width = cfg.width;
            lihua_1.height = cfg.height;
            this.addChildToContainer(lihua_1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, lihua_1, group, [0, -620]);
            lihua_1.setEndCallBack(function () {
                lihua_1.dispose();
                lihua_1 = null;
                if ((id == 0 && end_1) || (id > 0 && playtimes == 1)) {
                    --playtimes;
                    _this.showLihua(id, rewards, playtimes);
                }
            }, view);
            egret.Tween.get(lihua_1).wait((cfg.firenum - 3) * 70).call(function () {
                lihua_1.playWithTime(1);
                egret.Tween.removeTweens(lihua_1);
            }, view);
            egret.Tween.get(lihua_1).wait((2 * 70)).call(function () {
                if (id == 0) {
                    if (playtimes > 1) {
                        --playtimes;
                        _this.showLihua(id, rewards, playtimes);
                    }
                    else {
                        end_1 = true;
                    }
                }
            }, view);
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.ACANNUALPRAYGETREWARDPOPUPVIEW, {
                aid: view.aid,
                code: view.code,
                rewards: rewards,
                index: id,
                add: view.vo.getPrayNum() - view._oldTotal,
                callFunc: function () {
                    var endPercent = Math.min(1, view.vo.getPrayNum() / view.cfg.getTotalProgress());
                    view.playProgressBarAni(view._startPercent, endPercent, 0.005);
                    view._stop = false;
                    view.changeWifeStatus();
                },
                callObj: this
            });
        }
    };
    //创建门客或红颜
    AcAnnualPray2020View.prototype.createWifeOrServant = function (skinId) {
        var wifeCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        var servantCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        var isWife = false;
        if (wifeCfg) {
            isWife = true;
        }
        var container = new BaseDisplayObjectContainer();
        container.width = 604;
        container.height = 550;
        if (isWife) {
            var boneName = undefined;
            if (wifeCfg && wifeCfg.bone) {
                boneName = wifeCfg.bone + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
                droWifeIcon.anchorOffsetY = droWifeIcon.height;
                droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
                droWifeIcon.x = 302;
                droWifeIcon.y = 470;
                droWifeIcon.mask = new egret.Rectangle(-354, -800, 914, 820);
                droWifeIcon.setScale(0.75);
                container.addChild(droWifeIcon);
            }
            else {
                var wifeImg = BaseLoadBitmap.create(wifeCfg.body);
                wifeImg.width = 640;
                wifeImg.height = 840;
                wifeImg.setScale(0.52);
                container.addChild(wifeImg);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, wifeImg, container, [0, 0], true);
            }
        }
        else {
            var dagonBonesName = "servant_full2_" + skinId;
            var boneName = undefined;
            var servant = null;
            if (servantCfg && dagonBonesName) {
                boneName = dagonBonesName + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                servant = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
                servant.mask = new egret.Rectangle(-354, -609, 914, 580);
                servant.x = 302;
                servant.y = 520;
            }
            else {
                servant = BaseLoadBitmap.create(servantCfg.body);
                servant.width = 405;
                servant.height = 467;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, servant, container, [0, 0], true);
            }
            container.addChild(servant);
        }
        return container;
    };
    //切换红颜
    AcAnnualPray2020View.prototype.changeWifeStatus = function () {
        // this._isShowWife = !this._isShowWife;
        // this._skinTxt.alpha = 0;
        // this._skinTxtEffect.alpha = 0;
        // let skinResStr = "acthrowstone_common_wife_txt";
        // if (this._isShowWife){
        //     this._wifeContainer.visible = true;
        //     this._servantContainer.visible = false;
        // }
        // else{
        //     this._wifeContainer.visible = false;
        //     this._servantContainer.visible = true;
        //     skinResStr = "acthrowstone_common_servant_txt";
        // }
        // this._skinTxt.setRes(skinResStr);
        // this._skinTxtEffect.setRes(skinResStr);
        // this._skinTxt.alpha = 1;
        // this._skinTxtEffect.alpha = 1;
        // this._descTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(this._isShowWife ? `acAnnualPrayPrayTip4`:`acAnnualPrayPrayTip2`, this.getUiCode()));
        // this._descTxt.x = (GameConfig.stageWidth - this._descTxt.textWidth) / 2;
    };
    AcAnnualPray2020View.prototype.dispose = function () {
        var view = this;
        view._cdText = null;
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACDESTORYSAME_MAKELINE, view.makePointLine, view);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ANNUALPRAY_PRAY), view.attackCallback, view);
        view._stop = false;
        view._detailbtn = null;
        view._useTxt = null;
        view._wifeContainer = null;
        // view._servantContainer = null;
        view._isShowWife = true;
        view._skinTxt = null;
        view._skinTxtEffect = null;
        view._startPercent = 0;
        view._maxLength = 1;
        view._curLuckyTxt = null;
        view._boxRewardImg = null;
        view._boxLightBM = null;
        view._lightBall = null;
        view._progressBg = null;
        view._progressTF = null;
        view._progressBM = null;
        view._progressLight = null;
        /**鞭炮的 Container*/
        view._bangerContainer.dispose();
        view._bangerContainer = null;
        view._bangerInfo = [];
        view._redDot = null;
        view._haveTxt = null;
        view._haveTxtBg = null;
        view._itemicon = null;
        view._descTxt = null;
        view.tenplay = false;
        view._oldTotal = 0;
        view._redPackLqEff.dispose();
        view._redPackLqEff = null;
        _super.prototype.dispose.call(this);
    };
    return AcAnnualPray2020View;
}(AcCommonView));
__reflect(AcAnnualPray2020View.prototype, "AcAnnualPray2020View");
//# sourceMappingURL=AcAnnualPray2020View.js.map