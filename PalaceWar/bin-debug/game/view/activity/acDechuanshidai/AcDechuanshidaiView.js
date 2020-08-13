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
desc : 德川时代
*/
var AcDechuanshidaiView = (function (_super) {
    __extends(AcDechuanshidaiView, _super);
    function AcDechuanshidaiView() {
        var _this = _super.call(this) || this;
        _this._timeCountTxt = null;
        _this._stop = false;
        _this._detailbtn = null;
        _this._useTxt = null;
        _this._wifeContainer = null;
        _this._servantContainer = null;
        _this._isShowWife = false;
        _this._skinTxt = null;
        _this._skinTxtEffect = null;
        return _this;
    }
    Object.defineProperty(AcDechuanshidaiView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDechuanshidaiView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDechuanshidaiView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcDechuanshidaiView.prototype.getUiCode = function () {
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
    AcDechuanshidaiView.prototype.getRuleInfo = function () {
        var code = this.getUiCode();
        if (Api.switchVoApi.checkServantRefuseBattle()) {
            return "acDechuanshidairule-" + code + "_withOpenRefusal";
        }
        return "acDechuanshidairule-" + code;
    };
    AcDechuanshidaiView.prototype.getProbablyInfo = function () {
        return "acDechuanshidaiProbablyinfo-" + this.getUiCode();
    };
    AcDechuanshidaiView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    // 背景图名称
    AcDechuanshidaiView.prototype.getBgName = function () {
        var code = this.getUiCode();
        return "dechuanbg-" + code;
    };
    AcDechuanshidaiView.prototype.initBg = function () {
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
    AcDechuanshidaiView.prototype.getTitleBgName = function () {
        return "dechuantitle-" + this.getUiCode();
    };
    AcDechuanshidaiView.prototype.getTitleStr = function () {
        return null;
    };
    /**
     * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
     */
    AcDechuanshidaiView.prototype.getReportTipData = function () {
        return { title: { key: "acDechuanshidaireporttitle-" + this.getUiCode() }, msg: { key: "acDechuanshidaireportmsg-" + this.getUiCode() } };
    };
    AcDechuanshidaiView.prototype.getResourceList = function () {
        var view = this;
        var code = view.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "dechuancode1", "acwealthcarpview_skineffect1", "arena_bottom", "wife_btnbg", "acthrowstone_common_wife_txt", "acthrowstone_common_servant_txt",
        ]);
    };
    AcDechuanshidaiView.prototype.getContainerY = function () {
        return 92;
    };
    AcDechuanshidaiView.prototype.initView = function () {
        var view = this;
        var code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        view.container.width = view.width;
        view.container.height = view.height - 92;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACDESTORYSAME_MAKELINE, view.makePointLine, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DECHUAN_REMIND), view.attackCallback, view);
        //top背景图
        var topbg = BaseBitmap.create("dechuantopbg-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, topbg, view.titleBg, [0]);
        view.addChildToContainer(topbg);
        var timeTxt = ComponentManager.getTextField("" + view.vo.getAcLocalTime(true, String(0xffffff)), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        // 423 205
        timeTxt.width = 390;
        timeTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, topbg, [10, 20]);
        view.addChildToContainer(timeTxt);
        //倒计时位置 
        var str = view.vo.isInActivity() ? "acLuckyDrawTopTip2-1" : "acLaborDaytime-1";
        var tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]), 18);
        view.addChildToContainer(tip2Text);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip2Text, timeTxt, [0, timeTxt.textHeight + 7]);
        view._timeCountTxt = tip2Text;
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acDechuanshidaidesc-" + code), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.width = 610;
        tipTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, tip2Text, [0, tip2Text.textHeight + 7]);
        view.addChildToContainer(tipTxt);
        //活动详情
        var detailbtn = ComponentManager.getButton("dechuandetailbtn-" + code, "", function () {
            if (view._stop) {
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACDECHUANSHIDAIPOPUPVIEW, {
                aid: view.aid,
                code: view.code
            });
        }, view);
        view.addChildToContainer(detailbtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, detailbtn, topbg, [15, topbg.height + 10]);
        view._detailbtn = detailbtn;
        //奖池展示
        var rewardbtn = ComponentManager.getButton("dechuanrewardbtn-" + code, "", function () {
            if (view._stop) {
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACDECHUANSHIDAIREWARDPOOLVIEW, {
                aid: view.aid,
                code: view.code
            });
        }, view);
        view.addChildToContainer(rewardbtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, rewardbtn, topbg, [15, topbg.height + 10]);
        var bottombg = BaseBitmap.create("arena_bottom");
        bottombg.height = 145;
        view.addChildToContainer(bottombg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view.container, [0, 0], true);
        //人物形象
        var dikukang1 = BaseBitmap.create("dechuandikuang-" + code);
        view.addChildToContainer(dikukang1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, dikukang1, bottombg, [0, bottombg.height + 30]);
        //红颜
        this._wifeContainer = this.createWifeOrServant(this.cfg.getSkin(code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._wifeContainer, dikukang1);
        this.addChildToContainer(this._wifeContainer);
        this._wifeContainer.visible = false;
        //门客
        this._servantContainer = this.createWifeOrServant(this.cfg.getServant(code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._servantContainer, dikukang1);
        this.addChildToContainer(this._servantContainer);
        var dikukang2 = BaseBitmap.create("dechuandikuang2-" + code);
        view.addChildToContainer(dikukang2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, dikukang2, dikukang1);
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        // this._effect.setScale(2);
        skinTxtEffect.width = 208;
        skinTxtEffect.height = 154;
        var skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, skinTxtEffect, dikukang1, [0, 50]);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        var skinTxt = BaseBitmap.create("acthrowstone_common_servant_txt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
        this.addChildToContainer(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        this._skinTxt = skinTxt;
        var skinTxteffect = BaseBitmap.create("acthrowstone_common_servant_txt");
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
            if (view._isShowWife) {
                ViewController.getInstance().openView(ViewConst.POPUP.ACDECHUANSHIDAIPOPUPVIEW4, {
                    aid: view.aid,
                    code: view.code
                });
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.ACDECHUANSHIDAIPOPUPVIEW3, {
                    aid: view.aid,
                    code: view.code
                });
            }
        }, ViewController);
        var pos = {
            1: [14, 135],
            2: [460, 135],
            3: [59, 394],
            4: [414, 394],
        };
        var _loop_1 = function (i) {
            var lightbg = ComponentManager.getButton("dechuanbtnlightbg-" + code, "", null, null, null, 3);
            view.addChildToContainer(lightbg);
            lightbg.name = "lightbg" + i;
            lightbg.setPosition(dikukang2.x + pos[i][0], dikukang2.y + pos[i][1]);
            var group = new BaseDisplayObjectContainer();
            view.addChildToContainer(group);
            group.width = lightbg.width;
            group.height = lightbg.height;
            group.name = "group" + i;
            group.setPosition(dikukang2.x + pos[i][0], dikukang2.y + pos[i][1]);
            var img = BaseLoadBitmap.create("dechuantype" + i + "-" + code);
            img.width = 100;
            img.height = 100;
            view.addChildToContainer(img);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, img, lightbg);
            img.addTouchTap(function () {
                ViewController.getInstance().openView(ViewConst.POPUP["ACDECHUANSHIDAITASKVIEW" + i], {
                    aid: view.aid,
                    code: view.code
                });
            }, view);
            var wife_btnbg = BaseBitmap.create("wife_btnbg");
            wife_btnbg.name = "wife_btnbg" + i;
            view.addChildToContainer(wife_btnbg);
            wife_btnbg.width = 100;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, wife_btnbg, lightbg, [0, lightbg.height]);
            var typeTxt = ComponentManager.getTextField("X" + view.vo.dayNumById(i), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            typeTxt.name = "typeTxt" + i;
            view.addChildToContainer(typeTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, typeTxt, wife_btnbg);
            lightbg.visible = view.vo.getCurDays() == i;
        };
        for (var i = 1; i < 5; ++i) {
            _loop_1(i);
        }
        //回忆
        var destroyone = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acDechuanshidaicost1-" + code, function () {
            //消耗一次
            if (view._stop) {
                return;
            }
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (view.vo.getFreeNum() == 0 && Api.playerVoApi.getPlayerGem() < (view.cfg.cost)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acDechuanshidaitip1-" + code));
            }
            else {
                //
                view._stop = true;
                NetManager.request(NetRequestConst.REQUEST_DECHUAN_REMIND, {
                    activeId: view.acTivityId,
                    isFree: view.vo.getFreeNum() > 0 ? 1 : 0,
                    isTenPlay: 0
                });
            }
        }, view, null, 0);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, destroyone, bottombg, [75, 30]);
        view.addChildToContainer(destroyone);
        var useIcon = BaseLoadBitmap.create("itemicon1");
        useIcon.width = useIcon.height = 100;
        useIcon.setScale(0.4);
        view.addChildToContainer(useIcon);
        var useTxt = ComponentManager.getTextField("X" + view.cfg.cost, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(useTxt);
        view._useTxt = useTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, useIcon, destroyone, [25, -useIcon.height * useIcon.scaleY - 3]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, useTxt, useIcon, [useIcon.width * useIcon.scaleX, 0]);
        var destroyall = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acDechuanshidaicost10-" + code, function () {
            //消耗10次
            if (view._stop) {
                return;
            }
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (Api.playerVoApi.getPlayerGem() < (view.cfg.cost * 10 * view.cfg.discount)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acDechuanshidaitip1-" + code));
            }
            else {
                //
                view._stop = true;
                NetManager.request(NetRequestConst.REQUEST_DECHUAN_REMIND, {
                    activeId: view.acTivityId,
                    isFree: 0,
                    isTenPlay: 1
                });
            }
        }, view, null, 0);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, destroyall, bottombg, [75, 30]);
        view.addChildToContainer(destroyall);
        var alluseIcon = BaseLoadBitmap.create("itemicon1");
        alluseIcon.width = alluseIcon.height = 100;
        alluseIcon.setScale(0.4);
        view.addChildToContainer(alluseIcon);
        var alluseTxt2 = ComponentManager.getTextField("X" + (view.cfg.cost * 10 * view.cfg.discount).toFixed(0), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(alluseTxt2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, alluseIcon, destroyall, [(destroyall.width - alluseIcon.width * alluseIcon.scaleX - alluseTxt2.width) / 2, -alluseIcon.height * alluseIcon.scaleY - 3]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, alluseTxt2, alluseIcon, [alluseIcon.width * alluseIcon.scaleX, 0]);
        view.freshView();
    };
    AcDechuanshidaiView.prototype.freshView = function () {
        var view = this;
        if (view.vo.getpublicRedhot1() || view.vo.getpublicRedhot4()) {
            App.CommonUtil.addIconToBDOC(view._detailbtn);
        }
        if (!view.vo.getpublicRedhot1() && !view.vo.getpublicRedhot4()) {
            App.CommonUtil.removeIconFromBDOC(view._detailbtn);
        }
        if (view.vo.getFreeNum()) {
            view._useTxt.text = LanguageManager.getlocal("sysFreeDesc");
        }
        else {
            view._useTxt.text = "X " + view.cfg.cost;
        }
        for (var i = 1; i < 5; ++i) {
            var lightbg = view.container.getChildByName("lightbg" + i);
            var wife_btnbg = view.container.getChildByName("wife_btnbg" + i);
            var typeTxt = view.container.getChildByName("typeTxt" + i);
            typeTxt.text = "X" + view.vo.dayNumById(i);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, typeTxt, wife_btnbg);
            lightbg.visible = view.vo.getCurDays() == i;
            var group = view.container.getChildByName("group" + i);
            if (view.vo.getDayTaskReward(i)) {
                App.CommonUtil.addIconToBDOC(group);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(group);
            }
        }
    };
    AcDechuanshidaiView.prototype.tick = function () {
        var view = this;
        var str = view.vo.isInActivity() ? "acLuckyDrawTopTip2-1" : "acLaborDaytime-1";
        view._timeCountTxt.text = LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]);
    };
    AcDechuanshidaiView.prototype.hide = function () {
        if (this._stop) {
            return;
        }
        _super.prototype.hide.call(this);
    };
    AcDechuanshidaiView.prototype.attackCallback = function (evt) {
        var view = this;
        var data = evt.data.data.data;
        view._stop = false;
        if (data) {
            ViewController.getInstance().openView(ViewConst.POPUP.ACMOTHERDAYREWARDSHOWVIEW, {
                aid: view.aid,
                code: view.code,
                rewards: data.rewards,
                msg: LanguageManager.getlocal("acDechuanshidaitip4-" + this.getUiCode()),
            });
        }
        view.changeWifeStatus();
    };
    //创建门客或红颜
    AcDechuanshidaiView.prototype.createWifeOrServant = function (skinId) {
        var wifeCfg = Config.WifeCfg.getWifeCfgById(skinId);
        var servantCfg = Config.ServantCfg.getServantItemById(skinId);
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
            var servantCfg_1 = Config.ServantCfg.getServantItemById(skinId);
            var dagonBonesName = "servant_full2_" + skinId;
            var boneName = undefined;
            var servant = null;
            if (servantCfg_1 && dagonBonesName) {
                boneName = dagonBonesName + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                servant = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
                servant.mask = new egret.Rectangle(-354, -609, 914, 580);
                servant.x = 302;
                servant.y = 520;
            }
            else {
                servant = BaseLoadBitmap.create(servantCfg_1.fullIcon);
                servant.width = 405;
                servant.height = 467;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, servant, container, [0, 0], true);
            }
            container.addChild(servant);
        }
        return container;
    };
    //切换红颜
    AcDechuanshidaiView.prototype.changeWifeStatus = function () {
        this._isShowWife = !this._isShowWife;
        this._skinTxt.alpha = 0;
        this._skinTxtEffect.alpha = 0;
        var skinResStr = "acthrowstone_common_wife_txt";
        if (this._isShowWife) {
            this._wifeContainer.visible = true;
            this._servantContainer.visible = false;
        }
        else {
            this._wifeContainer.visible = false;
            this._servantContainer.visible = true;
            skinResStr = "acthrowstone_common_servant_txt";
        }
        this._skinTxt.setRes(skinResStr);
        this._skinTxtEffect.setRes(skinResStr);
        this._skinTxt.alpha = 1;
        this._skinTxtEffect.alpha = 1;
    };
    AcDechuanshidaiView.prototype.dispose = function () {
        var view = this;
        view._timeCountTxt = null;
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACDESTORYSAME_MAKELINE, view.makePointLine, view);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DECHUAN_REMIND), view.attackCallback, view);
        view._stop = false;
        view._detailbtn = null;
        view._useTxt = null;
        view._wifeContainer = null;
        view._servantContainer = null;
        view._isShowWife = false;
        view._skinTxt = null;
        view._skinTxtEffect = null;
        _super.prototype.dispose.call(this);
    };
    return AcDechuanshidaiView;
}(AcCommonView));
__reflect(AcDechuanshidaiView.prototype, "AcDechuanshidaiView");
//# sourceMappingURL=AcDechuanshidaiView.js.map