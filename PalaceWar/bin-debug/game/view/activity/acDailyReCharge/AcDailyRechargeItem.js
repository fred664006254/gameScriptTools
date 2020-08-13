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
 * author : qianjun
 * desc : 累计充值itemrender
 */
var AcDailyRechargeItem = (function (_super) {
    __extends(AcDailyRechargeItem, _super);
    function AcDailyRechargeItem() {
        var _this = _super.call(this) || this;
        _this.progressBar = null;
        _this._btn = null;
        _this._collectFlag = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcDailyRechargeItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDailyRechargeItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDailyRechargeItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDailyRechargeItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_DAILYRECHARGE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDailyRechargeItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcDailyRechargeItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcDailyRechargeItem.prototype.initItem = function (index, data, code) {
        var _this = this;
        var temW = 600;
        var temH = 256 + 5;
        var view = this;
        view._data = data;
        view._code = code;
        var uicode = view.getUiCode();
        var curday = this.vo.getNowDay();
        view.width = temW;
        view.height = temH;
        var bgres = "dailyrecharge" + this.cfg.getReardType() + "bg";
        var bg = BaseBitmap.create(App.CommonUtil.getResByCode(bgres, uicode));
        view.addChild(bg);
        var Txt1 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("AcDailyRechargeTip2", code), [data.id.toString()]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        Txt1.textAlign = egret.HorizontalAlign.CENTER;
        Txt1.width = 22;
        view.addChild(Txt1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, Txt1, bg, [19, 50]);
        var descbg = BaseBitmap.create(App.CommonUtil.getResByCode("dailyrechargelistnamebg", uicode));
        descbg.width = 356;
        view.addChild(descbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descbg, bg, [57, 20]);
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("AcDailyRechargeTip3", code), [data.needGem.toString()]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(descTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, descTxt, descbg, [15, 1]);
        var rewardBg = BaseBitmap.create("public_scrolllistbg");
        rewardBg.width = 380;
        rewardBg.height = 115;
        rewardBg.x = bg.x + 54;
        rewardBg.y = bg.y + 70;
        this.addChild(rewardBg);
        var reward = "";
        var scroStartY = rewardBg.y + 10;
        var tmpX = rewardBg.x + 8;
        var deltaS = 0.8;
        var contentList = GameData.getRewardItemIcons(data.getReward, true);
        for (var index_1 = 1; index_1 < contentList.length; index_1++) {
            var iconItem = contentList[index_1];
            iconItem.setScale(deltaS);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * deltaS + 4);
            if (tmpX > rewardBg.x + rewardBg.width) {
                tmpX = rewardBg.x + 8;
                scroStartY += iconItem.height * deltaS + 5;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width * deltaS + 4);
            }
            this.addChild(iconItem);
        }
        scroStartY += 100;
        rewardBg.height = scroStartY - rewardBg.y;
        rewardBg.width -= 5;
        var specialreward = GameData.formatRewardItem(data.getReward)[0];
        if (specialreward.type == 6 || specialreward.type == 11) {
            var rewardDB = GameData.getItemIcon(specialreward, true, false);
            rewardDB.x = bg.x + 507 - rewardDB.width / 2 + 15;
            rewardDB.y = bg.y + 135 - rewardDB.height / 2 - 35;
            var b = rewardDB.getChildByName("iconBg");
            if (b) {
                b.setRes("ac_firstsightlove_special_itembg");
                b.x = -10;
                b.y = -16;
            }
            var numLb = rewardDB.getChildByName("numLb");
            numLb.x = 80;
            numLb.y = 80;
            this.addChild(rewardDB);
            var numbg = rewardDB.getChildByName("numbg");
            if (numbg) {
                numbg.setRes("dailyrechargenumbg");
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, numbg, numLb, [0, -5]);
            }
            var anim = ComponentManager.getCustomMovieClip("acrechargeboxspview_rewardanim", 10, 70);
            anim.x = rewardDB.x + rewardDB.width / 2 - 190 / 2;
            anim.y = rewardDB.y + rewardDB.height / 2 - 190 / 2;
            anim.blendMode = egret.BlendMode.ADD;
            this.addChild(anim);
            anim.playWithTime(-1);
        }
        else if (specialreward.type == 10) {
            //红颜
            var mask = BaseBitmap.create("public_9_viewmask");
            mask.width = 200;
            mask.height = 230;
            mask.x = this.width - mask.width - 6 + 16;
            mask.y = 10;
            this.addChild(mask);
            mask.visible = false;
            var scaleNum = 0.29;
            var wifeBM = BaseLoadBitmap.create("wife_full_" + specialreward.id);
            wifeBM.width = 640;
            wifeBM.height = 840;
            wifeBM.setScale(scaleNum);
            wifeBM.x = mask.x + mask.width / 2 - wifeBM.width * scaleNum / 2;
            wifeBM.y = mask.y + mask.height - wifeBM.height * scaleNum;
            // wifeBM.mask = mask;
            this.addChild(wifeBM);
            //衣装预览
            var btnContainer = this.getSkinBtnContainer(specialreward, true);
            this.addChild(btnContainer);
            btnContainer.setPosition(this.width - 190, bg.y + 87);
        }
        else if (specialreward.type == 16) {
            //红颜皮肤
            var mask = BaseBitmap.create("public_9_viewmask");
            mask.width = 200;
            mask.height = 230;
            mask.x = this.width - mask.width - 4;
            mask.y = 10;
            this.addChild(mask);
            mask.visible = false;
            var scaleNum = 0.29;
            var wifeBM = BaseLoadBitmap.create("wife_skin_" + specialreward.id);
            wifeBM.width = 640;
            wifeBM.height = 840;
            wifeBM.setScale(scaleNum);
            wifeBM.x = 420;
            wifeBM.y = 8;
            // wifeBM.mask = mask;
            this.addChild(wifeBM);
            //衣装预览
            var btnContainer = this.getSkinBtnContainer(specialreward);
            this.addChild(btnContainer);
            btnContainer.setPosition(this.width - 190, bg.y + 87);
        }
        else if (specialreward.type == 8) {
            //门客
            var mask = BaseBitmap.create("public_9_viewmask");
            mask.width = 200;
            mask.height = 230;
            mask.x = this.width - mask.width - 4;
            mask.y = 10;
            this.addChild(mask);
            mask.visible = false;
            var scaleNum = 0.55;
            var wifeBM = BaseLoadBitmap.create("servant_full_" + specialreward.id);
            wifeBM.width = 405;
            wifeBM.height = 467;
            wifeBM.setScale(scaleNum);
            wifeBM.x = mask.x + mask.width / 2 - wifeBM.width * scaleNum / 2;
            wifeBM.y = mask.y + mask.height - wifeBM.height * scaleNum;
            // wifeBM.mask = mask;
            this.addChild(wifeBM);
            //衣装预览
            var btnContainer = this.getSkinBtnContainer(specialreward, true);
            this.addChild(btnContainer);
            btnContainer.setPosition(this.width - 190, bg.y + 87);
        }
        else if (specialreward.type == 19) {
            //门客皮肤
            var mask = BaseBitmap.create("public_9_viewmask");
            mask.width = 200;
            mask.height = 230;
            mask.x = this.width - mask.width - 4;
            mask.y = 10;
            this.addChild(mask);
            mask.visible = false;
            var scaleNum = 0.55;
            var wifeBM = BaseLoadBitmap.create("skin_full_" + specialreward.id);
            wifeBM.width = 405;
            wifeBM.height = 467;
            wifeBM.setScale(scaleNum);
            wifeBM.x = 420;
            wifeBM.y = 8;
            // wifeBM.mask = mask;
            this.addChild(wifeBM);
            //衣装预览
            var btnContainer = this.getSkinBtnContainer(specialreward);
            this.addChild(btnContainer);
            btnContainer.setPosition(this.width - 190, bg.y + 87);
        }
        var bool = false;
        if (this.vo.getNowFlag()) {
            bool = data.id > curday;
        }
        else {
            bool = data.id > (curday + 1);
        }
        var chargenum = 0;
        if (this.vo.getNowDay() >= data.id) {
            chargenum = data.needGem;
        }
        else {
            chargenum = bool ? 0 : view.vo.getChargeNum();
        }
        var progressBar = ComponentManager.getProgressBar("progress17", "progress17_bg", 345);
        view.addChild(progressBar);
        progressBar.setPercentage(chargenum / data.needGem);
        progressBar.setText(chargenum + "/" + data.needGem);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progressBar, rewardBg, [0, rewardBg.height + 20]);
        this.progressBar = progressBar;
        var btnstyle = data.needGem > chargenum ? ButtonConst.BTN2_SMALL_RED : ButtonConst.BTN2_SMALL_YELLOW;
        var btnstr = data.needGem > chargenum ? "allianceBtnGo" : "taskCollect";
        var buyBtn = ComponentManager.getButton(btnstyle, btnstr, function () {
            if (view.vo.isEnd) {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("atkracecrossCDTime3", code)));
                return;
            }
            var curday = _this.vo.getNowDay();
            var bool = false;
            if (_this.vo.getNowFlag()) {
                bool = data.id > curday;
            }
            else {
                bool = data.id > (curday + 1);
            }
            if (_this.vo.getNowDay() >= data.id) {
                chargenum = data.needGem;
            }
            else {
                chargenum = bool ? 0 : view.vo.getChargeNum();
            }
            if (bool) {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("AcDailyRechargeTip4", code)));
                return;
            }
            else {
                if (data.needGem <= chargenum) {
                    //发消息
                    view.vo.lastpos = buyBtn.localToGlobal(buyBtn.width / 2 + 50, 20);
                    view.vo.lastidx = view._index;
                    NetManager.request(NetRequestConst.REQUEST_DAILYRECHARGE_GEREWARD, {
                        activeId: _this.acTivityId,
                        rkey: data.id
                    });
                }
                else {
                    if (view.vo.isInActivity()) {
                        view.goRechargeHandler();
                    }
                    else {
                        App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("atkracecrossCDTime3", code)));
                    }
                }
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, buyBtn, progressBar, [progressBar.width + 30, 0]);
        view.addChild(buyBtn);
        view._btn = buyBtn;
        var collectFlag = BaseBitmap.create("collectflag");
        collectFlag.anchorOffsetX = collectFlag.width / 2;
        collectFlag.anchorOffsetY = collectFlag.height / 2;
        collectFlag.setScale(0.7);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, collectFlag, buyBtn, [-30, -20]);
        view.addChild(collectFlag);
        view._collectFlag = collectFlag;
        if (view.vo.isGetRecharge(data.id)) {
            collectFlag.visible = true;
            buyBtn.visible = false;
            progressBar.setPercentage(1);
            progressBar.setText(LanguageManager.getlocal("bookRoomServant_studyComplete"));
        }
        else {
            collectFlag.visible = false;
            buyBtn.visible = true;
            //今日已标记
            var bool_1 = false;
            if (this.vo.getNowFlag()) {
                bool_1 = data.id > curday;
            }
            else {
                bool_1 = data.id > (curday + 1);
            }
            if (bool_1) {
                buyBtn.setGray(true);
                buyBtn.setText("acRechargeBoxSPPopupViewLock", true);
            }
        }
    };
    AcDailyRechargeItem.prototype.update = function (show) {
        if (show === void 0) { show = false; }
        var view = this;
        var data = view._data;
        var progressBar = view.progressBar;
        var bool = false;
        var curday = view.vo.getNowDay();
        if (this.vo.getNowFlag()) {
            bool = data.id > curday;
        }
        else {
            bool = data.id > (curday + 1);
        }
        var chargenum = 0;
        if (this.vo.getNowDay() >= data.id) {
            chargenum = data.needGem;
        }
        else {
            chargenum = bool ? 0 : view.vo.getChargeNum();
        }
        progressBar.setPercentage(chargenum / data.needGem);
        progressBar.setText(chargenum + "/" + data.needGem);
        var btnstyle = data.needGem > chargenum ? ButtonConst.BTN2_SMALL_RED : ButtonConst.BTN2_SMALL_YELLOW;
        var btnstr = data.needGem > chargenum ? "allianceBtnGo" : "taskCollect";
        view._btn.setText(btnstr);
        view._btn.setBtnBitMap(btnstyle);
        if (view.vo.isGetRecharge(data.id)) {
            progressBar.setPercentage(1);
            progressBar.setText(LanguageManager.getlocal("bookRoomServant_studyComplete"));
            view._collectFlag.visible = true;
            view._btn.visible = false;
            if (show) {
                view._collectFlag.alpha = 0;
                view._collectFlag.setScale(1.3);
                egret.Tween.get(view._collectFlag).to({ scaleX: 0.7, scaleY: 0.7, alpha: 1 }, 300).call(function () {
                    egret.Tween.removeTweens(view._collectFlag);
                }, view);
            }
        }
        else {
            view._collectFlag.visible = false;
            view._btn.visible = true;
            //今日已标记
            if (bool) {
                view._btn.setGray(true);
                view._btn.setText("acRechargeBoxSPPopupViewLock", true);
            }
            else {
                view._btn.setGray(false);
            }
        }
    };
    //衣装预览按钮
    AcDailyRechargeItem.prototype.getSkinBtnContainer = function (rewardvo, isOther) {
        var _this = this;
        var container = new BaseDisplayObjectContainer();
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        skinTxtEffect.width = 208;
        skinTxtEffect.height = 154;
        skinTxtEffect.setPosition(0, 0);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        container.addChild(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        var skinTxtStr = (rewardvo.type == 19 || rewardvo.type == 16) ? "acwealthcarpview_servantskintxt" : "acgiftreturnview_common_skintxt";
        if (isOther) {
            skinTxtStr = "acgiftreturnview_common_skintxt";
        }
        var skinTxt = BaseBitmap.create(skinTxtStr);
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
        container.addChild(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        var skinTxteffect = BaseBitmap.create(skinTxtStr);
        skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
        skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxteffect, skinTxtEffect);
        container.addChild(skinTxteffect);
        skinTxteffect.blendMode = egret.BlendMode.ADD;
        skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        //透明点击区域
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = 160;
        touchPos.height = 40;
        touchPos.setPosition(25, 57);
        container.addChild(touchPos);
        var showType = rewardvo.type + "_" + rewardvo.id + "_1";
        touchPos.addTouchTap(function () {
            var topMsg = LanguageManager.getlocal(App.CommonUtil.getCnByCode("AcDailyRechargeTip1", _this.getUiCode()), [_this.cfg.recharge[1].needGem, String(Object.keys(_this.cfg.recharge).length), rewardvo.name]);
            var data = { data: [
                    { idType: showType, topMsg: topMsg, scale: rewardvo.type == 16 ? 0.6 : 0.8 },
                ] };
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
        }, this);
        return container;
    };
    AcDailyRechargeItem.prototype.goRechargeHandler = function () {
        if (this.vo.isInActivity()) {
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
        }
    };
    AcDailyRechargeItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcDailyRechargeItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcDailyRechargeItem.prototype.dispose = function () {
        this.progressBar = null;
        this._btn = null;
        this._data = null;
        this._collectFlag = null;
        _super.prototype.dispose.call(this);
    };
    return AcDailyRechargeItem;
}(ScrollListItem));
__reflect(AcDailyRechargeItem.prototype, "AcDailyRechargeItem");
//# sourceMappingURL=AcDailyRechargeItem.js.map