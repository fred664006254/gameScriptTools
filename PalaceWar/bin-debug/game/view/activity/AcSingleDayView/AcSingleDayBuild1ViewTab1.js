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
var AcSingleDayBuild1ViewTab1 = (function (_super) {
    __extends(AcSingleDayBuild1ViewTab1, _super);
    function AcSingleDayBuild1ViewTab1(param) {
        var _this = _super.call(this) || this;
        _this._cdtxt = null;
        _this._cdImg = null;
        _this._cdBg = null;
        _this._tipbg = null;
        _this._tiptxt = null;
        _this._redNumtxt = null;
        _this._midGroup = null;
        _this._redGroup = null;
        _this._redPt = null;
        _this._getRedPt = false;
        _this._cd = 4;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcSingleDayBuild1ViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDayBuild1ViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDayBuild1ViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcSingleDayBuild1ViewTab1.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SINGLEDAY_GETREDPT), view.getRedPtCallBack, view);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth - view.y - 110;
        var bgmask = BaseBitmap.create('public_9_bg20');
        bgmask.width = view.width;
        bgmask.height = view.height - 147;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bgmask, view, [0, 0]);
        view.addChild(bgmask);
        var midGroup = new BaseDisplayObjectContainer();
        midGroup.width = view.width;
        midGroup.height = GameConfig.stageHeigth;
        midGroup.y = -view.y;
        view.addChild(midGroup);
        midGroup.visible = false;
        view._midGroup = midGroup;
        var redGroup = new BaseDisplayObjectContainer();
        redGroup.width = view.width;
        redGroup.height = GameConfig.stageHeigth;
        view.addChild(redGroup);
        redGroup.visible = false;
        view._redGroup = redGroup;
        if (view.vo.isInActivity()) {
            var _loop_1 = function (i) {
                var redImg = BaseBitmap.create('acsingleday_couponIcon');
                redImg.x = App.MathUtil.getRandom(30, GameConfig.stageWidth - redImg.width - 30);
                redImg.y = -152;
                redImg.alpha = 0;
                redGroup.addChild(redImg);
                var startX = redImg.x;
                egret.Tween.get(redImg, { loop: true }).wait(i * 700).
                    to({ y: 0 }, redImg.height * 10).
                    to({ alpha: 1, y: 100, x: startX + 30, rotation: 30 }, 700).
                    to({ y: 200, x: startX, rotation: 0 }, 700).
                    to({ y: 300, x: startX - 30, rotation: -30 }, 700).
                    to({ y: 400, x: startX, rotation: 0 }, 700).
                    to({ y: 500, x: startX + 30, rotation: 30 }, 700).
                    to({ y: 600, x: startX, rotation: 0 }, 700).
                    to({ y: 700, x: startX - 30, rotation: -30 }, 700).
                    to({ y: 800, x: startX, rotation: 0 }, 700).
                    call(function () {
                    redImg.x = App.MathUtil.getRandom(30, GameConfig.stageWidth - redImg.width - 30);
                    redImg.y = -redImg.height;
                    redImg.alpha = 0;
                    startX = redImg.x;
                }, view);
            };
            for (var i = 0; i < 20; ++i) {
                _loop_1(i);
            }
        }
        var light = BaseBitmap.create("tailor_get_light");
        light.anchorOffsetX = light.width / 2;
        light.anchorOffsetY = light.height / 2;
        light.x = GameConfig.stageWidth / 2;
        egret.Tween.get(light, { loop: true }).to({ rotation: 360 }, 5000);
        redGroup.addChild(light);
        var light2 = BaseBitmap.create("tailor_get_light");
        light2.anchorOffsetX = light2.width / 2;
        light2.anchorOffsetY = light2.height / 2;
        light2.x = light.x;
        egret.Tween.get(light2, { loop: true }).to({ rotation: -360 }, 5000);
        redGroup.addChild(light2);
        var redbg = BaseBitmap.create('acsingledayredpt');
        redbg.anchorOffsetX = redbg.width / 2;
        redbg.anchorOffsetY = redbg.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, redbg, redGroup, [0, 250], true);
        redGroup.addChild(redbg);
        redbg.addTouchTap(function () {
            view.showRedReward();
        }, view);
        egret.Tween.get(redbg, { loop: true }).to({ rotation: -10 }, 100).to({ rotation: 0 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 100).wait(1500);
        light.y = redbg.y + 20;
        light2.y = light.y;
        var redTxtbg = BaseBitmap.create('public_numbg');
        redGroup.addChild(redTxtbg);
        var redTxt = ComponentManager.getTextField(LanguageManager.getlocal('acSingleDayGetRed2', [(view.cfg.couponLimit - view.vo.getCurNum()).toString(), view.cfg.couponLimit.toString()]), 22, 0xfff7e8);
        redTxtbg.width = redTxt.textWidth + 30;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, redTxtbg, redbg, [0, 20]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, redTxt, redTxtbg);
        redGroup.addChild(redTxt);
        view._redNumtxt = redTxt;
        var cdbg = BaseBitmap.create('acsingleday_cdbg');
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cdbg, bgmask, [0, 300]);
        midGroup.addChild(cdbg);
        view._cdBg = cdbg;
        var cdTxt = ComponentManager.getTextField(LanguageManager.getlocal('activitycddesc', [App.DateUtil.getFormatBySecond(view.vo.getCountDownCD())]), 20, 0x3e1f0f);
        cdTxt.textAlign = egret.HorizontalAlign.CENTER;
        cdTxt.lineSpacing = 8;
        cdTxt.visible = false;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cdTxt, cdbg);
        midGroup.addChild(cdTxt);
        view._cdtxt = cdTxt;
        var cdImg = BaseBitmap.create('acsingleday_cd_num3');
        cdImg.visible = false;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cdImg, cdbg);
        midGroup.addChild(cdImg);
        view._cdImg = cdImg;
        var tipbg = BaseBitmap.create('public_tipbg');
        midGroup.addChild(tipbg);
        view._tipbg = tipbg;
        var rewarddesc = ComponentManager.getTextField(LanguageManager.getlocal('activityredrewarddesc'), 20, TextFieldConst.COLOR_WARN_GREEN);
        rewarddesc.textAlign = egret.HorizontalAlign.CENTER;
        rewarddesc.lineSpacing = 5;
        midGroup.addChild(rewarddesc);
        view._tiptxt = rewarddesc;
        view._tipbg.visible = view._tiptxt.visible = view.vo.isInActivity();
        var line = BaseBitmap.create("acsingledayline");
        this.addChild(line);
        tipbg.height = rewarddesc.textHeight + 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipbg, cdbg, [0, -tipbg.height - 30]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, rewarddesc, tipbg, [0, 20]);
        TickManager.addTick(view.tick, view);
        view.tick();
    };
    AcSingleDayBuild1ViewTab1.prototype.getRedPtCallBack = function (evt) {
        var view = this;
        if (evt.data.data.data.redPtKey) {
            //展示
            //ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rewards,"otherRewards":otherReward,"isPlayAni":true});
            ViewController.getInstance().openView(ViewConst.POPUP.ACSINGLEDAYGETREDPTPOPUPVIEW, {
                id: evt.data.data.data.redPtKey,
                aid: this.param.data.aid,
                code: this.param.data.code
            });
        }
        view._getRedPt = false;
        view._redGroup.visible = true;
    };
    //红包雨
    AcSingleDayBuild1ViewTab1.prototype.showRedReward = function () {
        var view = this;
        if (!view._getRedPt) {
            if (view.vo.getIsCollectMax()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acSingleDayGetTip1", [view.cfg.couponLimit.toString(), App.DateUtil.getFormatBySecond(view.vo.getCountDownCD())]));
                view._getRedPt = false;
            }
            else {
                NetManager.request(NetRequestConst.REQUEST_SINGLEDAY_GETREDPT, { activeId: view.acTivityId });
            }
        }
        // if(view._showRed){
        // 	view._redGroup.visible = true;
        // 	egret.Tween.get(view._redGroup).wait(5000).call(()=>{
        // 	},view);
        // }
        // else{
        // 	view._showRed = true;
        // 	for(let i = 0; i < 10; ++ i){
        // 		let redImg = BaseBitmap.create('acsingleday_couponIcon');
        // 		redImg.x = App.MathUtil.getRandom(30,GameConfig.stageWidth - redImg.width - 30);
        // 		redImg.y = redImg.y;
        // 		redImg.alpha = 0;
        // 		view._redGroup.addChild(redImg);
        // 		let startX = redImg.x;
        // 		egret.Tween.get(redImg,{loop : true}).wait(i * 1000).
        // 		to({alpha : 1, y : 0}, redImg.height * 10).
        // 		to({y : 100, x : startX - 30}, 1000).
        // 		to({y : 200, x : startX}, 1000).
        // 		to({y : 300, x : startX + 30}, 1000).
        // 		to({y : 400, x : startX}, 1000).
        // 		to({y : 500, x : startX - 30}, 1000).
        // 		to({y : 600, x : startX}, 1000).
        // 		to({y : 700, x : startX + 30}, 1000).call(()=>{
        // 			redImg.x = App.MathUtil.getRandom(30,GameConfig.stageWidth - redImg.width - 30);
        // 			redImg.y = -redImg.height;
        // 			redImg.alpha = 0;
        // 			startX = redImg.x;
        // 		},view);
        // 	}
        // }
    };
    AcSingleDayBuild1ViewTab1.prototype.hide = function () {
        var view = this;
        if (!view._getRedPt) {
            _super.prototype.hide.call(this);
        }
    };
    AcSingleDayBuild1ViewTab1.prototype.tick = function () {
        var view = this;
        if (view.vo.getIsCollectMax()) {
            view._midGroup.visible = true;
        }
        else {
            view._midGroup.visible = view.vo.getCurPeriod() > 1;
        }
        view._redGroup.visible = !view._midGroup.visible;
        view._tipbg.visible = view._tiptxt.visible = view.vo.isInActivity();
        if (view.vo.isInActivity()) {
            if (view._redNumtxt) {
                view._redNumtxt.text = LanguageManager.getlocal('acSingleDayGetRed2', [(view.cfg.couponLimit - view.vo.getCurNum()).toString(), view.cfg.couponLimit.toString()]);
            }
            if (GameData.serverTime >= (view.vo.et - 86400 + view.cfg.startTime + view.cfg.luckyPacketCD) && (view.vo.getIsCollectMax() || (GameData.serverTime >= (view.vo.et - 86400 + view.cfg.startTime + view.cfg.luckyPacketCD + view.cfg.luckyPacketPurchase)))) {
                view._midGroup.visible = true;
                view._redGroup.visible = false;
                view._cdtxt.visible = true;
                view._cdtxt.text = LanguageManager.getlocal('acSingleDayRedPtEnd');
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._cdtxt, view._cdBg);
            }
            else {
                var cd = view.vo.getCountDownCD();
                view._cdtxt.visible = cd > 3;
                view._cdImg.visible = !view._cdtxt.visible;
                if (cd > 3) {
                    view._cdtxt.text = LanguageManager.getlocal('activitycddesc', [App.DateUtil.getFormatBySecond(cd)]);
                }
                else {
                    if (cd == 0) {
                        view._midGroup.visible = false;
                        view._redGroup.visible = true;
                    }
                    else {
                        view._cdImg.setRes("acsingleday_cd_num" + cd);
                    }
                }
            }
        }
        else {
            view._midGroup.visible = true;
            view._redGroup.visible = false;
            view._cdtxt.visible = true;
            view._cdtxt.text = LanguageManager.getlocal('acSingleDayRedPtEnd');
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._cdtxt, view._cdBg);
        }
    };
    AcSingleDayBuild1ViewTab1.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SINGLEDAY_GETREDPT), view.getRedPtCallBack, view);
        view._getRedPt = false;
        TickManager.removeTick(view.tick, view);
        view._cdtxt = null;
        view._cdImg = null;
        view._midGroup = null;
        view._redGroup = null;
        view._redNumtxt = null;
    };
    return AcSingleDayBuild1ViewTab1;
}(CommonViewTab));
__reflect(AcSingleDayBuild1ViewTab1.prototype, "AcSingleDayBuild1ViewTab1");
//# sourceMappingURL=AcSingleDayBuild1ViewTab1.js.map