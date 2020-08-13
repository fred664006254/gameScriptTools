/*
    author : weixiaozhe
    date : 2020/5/18
    desc : 青莲茶香
*/
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
var AcDrinkTeaView = (function (_super) {
    __extends(AcDrinkTeaView, _super);
    function AcDrinkTeaView() {
        var _this = _super.call(this) || this;
        _this._timeCountTxt = null;
        _this._timebg = null;
        _this._icon1 = null;
        _this._costTxt1 = null;
        _this._freeLab = null;
        _this._icon0 = null;
        _this._haveTxt = null;
        _this._haveTxt2 = null;
        _this._infobg = null;
        _this._capImg = null;
        _this._daochaEffect = null;
        _this._chongziEffect = null;
        _this.flowerList = [];
        _this.flowerPos1 = [
            { x: 33, y: 387, nameX: 36, nameY: 65, lightY: 30, lightScale: 1., glowId: 3, glowScale: 1.56, glowX: 0, glowY: -2, effectScaleX: 0.7, effectScaleY: 0.7, effectR: 0, effectX: 30, effectY: 26 },
            { x: 114, y: 326, nameX: 36, nameY: 70, lightY: 30, lightScale: 1, glowId: 1, glowScale: 1.52, glowX: 0, glowY: 0, effectScaleX: 0.7, effectScaleY: 0.7, effectR: -10, effectX: 30, effectY: 26 },
            { x: 194, y: 374, nameX: 45, nameY: 77, lightY: 34, lightScale: 1.2, glowId: 3, glowScale: 2, glowX: 0, glowY: -6, effectScaleX: 0.8, effectScaleY: 0.8, effectR: -10, effectX: 40, effectY: 40 },
            { x: 285, y: 330, nameX: 45, nameY: 88, lightY: 35, lightScale: 1.2, glowId: 1, glowScale: 2, glowX: 0, glowY: -3, effectScaleX: 0.8, effectScaleY: 0.8, effectR: 10, effectX: 42, effectY: 30 },
            { x: 406, y: 357, nameX: 49, nameY: 87, lightY: 35, lightScale: 1.2, glowId: 4, glowScale: 2, glowX: 0, glowY: -26, effectScaleX: 1, effectScaleY: 1, effectR: 0, effectX: 40, effectY: 32 },
            { x: 502, y: 399, nameX: 62, nameY: 104, lightY: 45, lightScale: 1.2, glowId: 5, glowScale: 2, glowX: -2, glowY: -21, effectScaleX: 1.1, effectScaleY: 1.1, effectR: 0, effectX: 52, effectY: 40 },
            { x: 510, y: 559, nameX: 73, nameY: 117, lightY: 60, lightScale: 1.4, glowId: 2, glowScale: 2, glowX: -7, glowY: -17, effectScaleX: 1.2, effectScaleY: 1.3, effectR: -20, effectX: 45, effectY: 75 },
        ];
        _this._tempAwards = null;
        _this._isShowEffect = false;
        _this._isTen = false;
        return _this;
    }
    // 标题背景名称
    AcDrinkTeaView.prototype.getTitleBgName = function () {
        return "drinktea_title-" + this.typeCode;
    };
    AcDrinkTeaView.prototype.getTitleStr = function () {
        return null;
    };
    AcDrinkTeaView.prototype.getBgName = function () {
        return "acdrinktea_bg-" + this.typeCode;
    };
    AcDrinkTeaView.prototype.getRuleInfo = function () {
        return "acDrinkTeaRuleInfo-" + this.typeCode;
    };
    Object.defineProperty(AcDrinkTeaView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDrinkTeaView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDrinkTeaView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDrinkTeaView.prototype, "typeCode", {
        get: function () {
            if (this.code == "2") {
                return "1";
            }
            return this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcDrinkTeaView.prototype.initBg = function () {
        var view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        this.viewBg = BaseBitmap.create(this.getBgName());
        this.addChild(this.viewBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
        this._infobg = BaseBitmap.create("acthreekingofwife_infobg-1");
        this._infobg.x = GameConfig.stageWidth / 2 - this._infobg.width / 2;
        this._infobg.y = 0;
        this.addChild(this._infobg);
        this.titleBg = BaseBitmap.create(this.getTitleBgName());
        this.addChild(this.titleBg);
        this.setLayoutPosition(LayoutConst.horizontalCentertop, this.titleBg, this, [0, 0]);
    };
    AcDrinkTeaView.prototype.initView = function () {
        var _this = this;
        var code = this.code;
        var typecode = this.typeCode;
        this.width = GameConfig.stageWidth;
        this.height = GameConfig.stageHeigth;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_DRINKTEA_DRINKTEA, this.attackCallback, this);
        //活动时间   
        var timeTxt = ComponentManager.getTextField(this.vo.getAcTimeAndHour(), 18, TextFieldConst.COLOR_WHITE);
        timeTxt.x = this.titleBg.x + 20;
        timeTxt.y = this.titleBg.y + this.titleBg.height + 10;
        this.addChild(timeTxt);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acDrinkTeaTips-" + typecode, [String(this.vo.getNeedMoney())]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.x = timeTxt.x;
        tipTxt.y = timeTxt.y + timeTxt.height + 10;
        tipTxt.width = GameConfig.stageWidth - tipTxt.x - 5;
        tipTxt.lineSpacing = 5;
        this.addChild(tipTxt);
        //倒计时位置 
        var timebg = BaseBitmap.create("public_9_bg61");
        timebg.width = 260;
        this.addChild(timebg);
        this.setLayoutPosition(LayoutConst.rightbottom, timebg, this._infobg, [10, -timebg.height / 2]);
        this._timebg = timebg;
        var timeCountTxt = ComponentManager.getTextField(this.vo.getAcCountDown(), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, timeCountTxt, timebg, [0, 0]);
        this.addChild(timeCountTxt);
        this._timeCountTxt = timeCountTxt;
        var botbg = BaseBitmap.create("acdrinktea_desk-" + typecode);
        botbg.x = GameConfig.stageWidth / 2 - botbg.width / 2;
        botbg.y = GameConfig.stageHeigth - botbg.height;
        this.initFlowers();
        this.showPreEffect(botbg.y, function () {
            _this.addChild(botbg);
            var capImg = BaseBitmap.create("acdrinktea_cap-" + typecode);
            capImg.x = GameConfig.stageWidth / 2 - capImg.width / 2 + 40;
            capImg.y = botbg.y - 10;
            _this.addChild(capImg);
            _this._capImg = capImg;
            _this._daochaEffect = App.DragonBonesUtil.getLoadDragonBones("daocha", 1, "daocha1");
            _this._daochaEffect.setPosition(_this._capImg.x + 28.5, _this._capImg.y + 274);
            _this.addChild(_this._daochaEffect);
            _this._daochaEffect.visible = false;
            var item2 = BaseBitmap.create("acdrinktea_chahe");
            _this.setLayoutPosition(LayoutConst.righttop, item2, botbg, [70, 75]);
            _this.addChild(item2);
            var itembg2 = BaseBitmap.create("acdrinktea_txtbg-" + typecode);
            itembg2.width = 120;
            itembg2.x = item2.x + item2.width / 2 - itembg2.width / 2;
            itembg2.y = item2.y + item2.height - itembg2.height / 2;
            _this.addChild(itembg2);
            var iconscale = 0.9;
            var icon0 = BaseBitmap.create("acdrinktea_iconsmall-" + typecode);
            icon0.setScale(0.8);
            icon0.x = itembg2.x + itembg2.width / 2 - icon0.width * icon0.scaleX / 2;
            icon0.y = itembg2.y + itembg2.height / 2 - icon0.height * icon0.scaleY / 2;
            _this.addChild(icon0);
            var comtxt = ComponentManager.getTextField(LanguageManager.getlocal("acDrinkTeaItemTxt"), 18, TextFieldConst.COLOR_WHITE);
            comtxt.x = icon0.x - comtxt.width;
            comtxt.y = itembg2.y + itembg2.height / 2 - comtxt.height / 2;
            _this.addChild(comtxt);
            var haveTxt = ComponentManager.getTextField("" + String(_this.vo.getProcess()), 18, TextFieldConst.COLOR_WHITE);
            haveTxt.x = icon0.x + icon0.width * icon0.scaleX;
            haveTxt.y = comtxt.y;
            _this.addChild(haveTxt);
            _this._haveTxt = haveTxt;
            var item22 = BaseBitmap.create("acdrinktea_taozi");
            _this.setLayoutPosition(LayoutConst.lefttop, item22, botbg, [70, 70]);
            item22.y = item2.y - 5;
            item22.setScale(0.85);
            _this.addChild(item22);
            var itembg22 = BaseBitmap.create("acdrinktea_txtbg-" + typecode);
            itembg22.width = 120;
            itembg22.x = item22.x + item22.width * item22.scaleX / 2 - itembg22.width / 2;
            itembg22.y = itembg2.y;
            _this.addChild(itembg22);
            var comtxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acDrinkTeaItemTxt2", [String(_this.vo.getAchieveNum())]), 18, TextFieldConst.COLOR_WHITE);
            comtxt2.x = itembg22.x + itembg22.width / 2 - comtxt2.width / 2;
            comtxt2.y = itembg22.y + itembg22.height / 2 - comtxt2.height / 2;
            _this.addChild(comtxt2);
            _this._haveTxt2 = comtxt2;
            // 前进按钮
            var drinkTeaBtn1 = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acDrinkTea_btn1", _this.drinkTeaBtnHandle1, _this);
            _this.addChild(drinkTeaBtn1);
            _this.setLayoutPosition(LayoutConst.leftbottom, drinkTeaBtn1, botbg, [35, 0]);
            var drinkTeaBtn10 = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acDrinkTea_btn10", _this.drinkTeaBtnHandle10, _this);
            _this.addChild(drinkTeaBtn10);
            _this.setLayoutPosition(LayoutConst.rightbottom, drinkTeaBtn10, botbg, [35, 0]);
            var icon1 = BaseBitmap.create("acdrinktea_iconsmall-" + typecode);
            icon1.setScale(iconscale);
            icon1.x = drinkTeaBtn1.x + drinkTeaBtn1.width / 2 - icon1.width * icon1.scaleX + 5;
            icon1.y = drinkTeaBtn1.y - icon1.height * icon1.scaleY + 7;
            _this.addChild(icon1);
            var costTxt1 = ComponentManager.getTextField(String(_this.cfg.cost1), 22, TextFieldConst.COLOR_WHITE);
            costTxt1.x = icon1.x + icon1.width * icon1.scaleX - 2;
            costTxt1.y = icon1.y + icon1.height * icon1.scaleY / 2 - costTxt1.height / 2 + 2;
            _this.addChild(costTxt1);
            var freeLab = ComponentManager.getTextField(LanguageManager.getlocal("acChess_free"), 24, TextFieldConst.COLOR_WHITE);
            freeLab.x = drinkTeaBtn1.x + drinkTeaBtn1.width / 2 - freeLab.width / 2;
            freeLab.y = drinkTeaBtn1.y - freeLab.height - 5;
            _this.addChild(freeLab);
            var icon10 = BaseBitmap.create("acdrinktea_iconsmall-" + typecode);
            icon10.setScale(iconscale);
            icon10.x = drinkTeaBtn10.x + drinkTeaBtn10.width / 2 - icon10.width * icon10.scaleX + 5;
            icon10.y = icon1.y;
            _this.addChild(icon10);
            var costTxt10 = ComponentManager.getTextField(String(_this.cfg.cost10), 22, TextFieldConst.COLOR_WHITE);
            costTxt10.x = icon10.x + icon10.width * icon10.scaleX - 2;
            costTxt10.y = costTxt1.y;
            _this.addChild(costTxt10);
            _this._icon1 = icon1;
            _this._costTxt1 = costTxt1;
            _this._freeLab = freeLab;
            //活动详情
            var detailBtnBg = ResourceManager.hasRes("drinkteabtn-" + _this.code) ? "drinkteabtn-" + _this.code : "drinkteabtn-1";
            var detailBtn = ComponentManager.getButton(detailBtnBg, "", function () {
                ViewController.getInstance().openView(ViewConst.POPUP.ACDRINKTEAREWARDPOPVIEW, { aid: _this.aid, code: _this.code });
            }, _this, null);
            detailBtn.setPosition(10, 230);
            _this.addChild(detailBtn);
            _this._detailBtn = detailBtn;
            _this.freshView();
        });
    };
    AcDrinkTeaView.prototype.initFlowers = function () {
        if (App.CommonUtil.check_dragon() && RES.hasRes("yinghuochong_ske")) {
            this._chongziEffect = App.DragonBonesUtil.getLoadDragonBones("yinghuochong");
            this._chongziEffect.x = GameConfig.stageWidth / 2;
            this._chongziEffect.y = 936 - (1136 - GameConfig.stageHeigth) / 2;
            ;
            this.addChild(this._chongziEffect);
        }
        var datas = this.cfg.getAchieveList();
        datas.sort(function (a, b) {
            return a.id - b.id;
        });
        for (var i = 0; i < this.flowerPos1.length; i++) {
            var flowerPos = this.flowerPos1[i];
            var flowerNode = new BaseDisplayObjectContainer();
            var flower = BaseBitmap.create(this.getDefaultRes("acdrinktea_flower" + (i + 1)));
            flower.name = "flower";
            flowerNode.width = flower.width;
            flowerNode.height = flower.height;
            flowerNode.anchorOffsetX = flowerNode.width / 2;
            flowerNode.anchorOffsetY = flowerNode.height;
            flowerNode.x = flowerPos.x + 35;
            flowerNode.y = flowerPos.y + 100 - (1136 - GameConfig.stageHeigth) / 2;
            if (i == 0) {
                flowerNode.y = flowerNode.y < 420 ? 420 : flowerNode.y;
            }
            flower.touchEnabled = true;
            var light1 = BaseBitmap.create("acdrinktea_light");
            light1.name = "light1";
            light1.anchorOffsetX = light1.width / 2;
            light1.anchorOffsetY = light1.height / 2;
            light1.setScale(flowerPos.lightScale);
            flowerNode.addChild(light1);
            light1.x = flowerNode.width / 2;
            light1.y = flowerPos.lightY;
            light1.alpha = 0.3;
            light1.visible = false;
            light1.blendMode = egret.BlendMode.ADD;
            var light2 = BaseBitmap.create("acdrinktea_light");
            light2.name = "light2";
            light2.anchorOffsetX = light2.width / 2;
            light2.anchorOffsetY = light2.height / 2;
            light2.setScale(flowerPos.lightScale * 0.8);
            flowerNode.addChild(light2);
            light2.x = flowerNode.width / 2;
            light2.y = flowerPos.lightY;
            light2.alpha = 0.5;
            light2.visible = false;
            light2.blendMode = egret.BlendMode.ADD;
            flowerNode.addChild(flower);
            this.addChild(flowerNode);
            this.flowerList.push(flowerNode);
            var glow = BaseBitmap.create("acdrinktea_glow_" + flowerPos.glowId);
            glow.name = "glow";
            glow.setScale(flowerPos.glowScale);
            glow.x = flower.x + flower.width / 2 - glow.width * glow.scaleX / 2 + flowerPos.glowX;
            glow.y = flower.y + flowerPos.glowY;
            flowerNode.addChild(glow);
            glow.blendMode = egret.BlendMode.ADD;
            var effect = ComponentManager.getCustomMovieClip("acdrinktea_effect", 8, 80);
            effect.name = "effect";
            effect.anchorOffsetX = 192 / 2;
            effect.anchorOffsetY = 123 / 2;
            effect.scaleX = flowerPos.effectScaleX;
            effect.scaleY = flowerPos.effectScaleY;
            effect.x = flowerPos.effectX;
            effect.y = flowerPos.effectY;
            effect.rotation = flowerPos.effectR;
            flowerNode.addChild(effect);
            effect.playWithTime(-1);
            effect.blendMode = egret.BlendMode.ADD;
            var nameBg = BaseBitmap.create(this.getDefaultRes("acdrinktea_txtbg"));
            nameBg.x = flowerNode.x - flowerNode.width / 2 + flowerPos.nameX - nameBg.width / 2;
            nameBg.y = flowerNode.y - flowerNode.height + flowerPos.nameY - nameBg.height / 2;
            this.addChild(nameBg);
            var countTxt = ComponentManager.getTextField(String(datas[i]["needNum"]), 18, TextFieldConst.COLOR_WARN_YELLOW);
            countTxt.x = nameBg.x + nameBg.width / 2 - countTxt.width / 2;
            countTxt.y = nameBg.y + nameBg.height / 2 - countTxt.height / 2;
            this.addChild(countTxt);
            flower.addTouchTap(this.boxClick, this, [datas[i].id]);
            var randomT = 800 + Math.floor(Math.random() * 1000);
            var randomR = 1.5 + Math.random();
            egret.Tween.get(flowerNode, { loop: true })
                .to({ rotation: randomR }, randomT, egret.Ease.quadOut)
                .to({ rotation: -randomR }, randomT * 2, egret.Ease.quadInOut)
                .to({ rotation: 0 }, randomT, egret.Ease.quadIn);
        }
    };
    AcDrinkTeaView.prototype.initEffect = function () {
    };
    AcDrinkTeaView.prototype.boxClick = function (event, id) {
        if (!this.vo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        AcDrinkTeaView.IS_SHOW_PROCESS = id;
        ViewController.getInstance().openView(ViewConst.POPUP.ACDRINKTEAREWARDPOPVIEWTAB2, { aid: this.aid, code: this.code });
    };
    AcDrinkTeaView.prototype.refreshFlowers = function () {
        var datas = this.cfg.getAchieveList();
        datas.sort(function (a, b) {
            return a.id - b.id;
        });
        var len = datas.length;
        for (var i = 0; i < len; i++) {
            var progObj = datas[i];
            var status_1 = this.vo.getAchieveStatus(i);
            var flowerNode = this.flowerList[i];
            var flower = flowerNode.getChildByName("flower");
            var light1 = flowerNode.getChildByName("light1");
            var light2 = flowerNode.getChildByName("light2");
            var glow = flowerNode.getChildByName("glow");
            var effect = flowerNode.getChildByName("effect");
            if (status_1 == 2) {
                if (light1.visible) {
                    continue;
                }
                egret.Tween.removeTweens(light1);
                egret.Tween.removeTweens(light2);
                egret.Tween.get(light1, { loop: true })
                    .to({ rotation: 360 }, 16000);
                egret.Tween.get(light2, { loop: true })
                    .to({ rotation: -360 }, 24000);
                light1.visible = true;
                light2.visible = true;
                glow.visible = true;
                effect.visible = true;
            }
            else if (status_1 == 3) {
                egret.Tween.removeTweens(light1);
                egret.Tween.removeTweens(light2);
                light1.visible = false;
                light2.visible = false;
                glow.visible = false;
                effect.visible = false;
                flower.setRes(this.getDefaultRes("acdrinktea_flowermask" + (i + 1)));
            }
            else {
                egret.Tween.removeTweens(light1);
                egret.Tween.removeTweens(light2);
                light1.visible = false;
                light2.visible = false;
                glow.visible = false;
                effect.visible = false;
            }
        }
    };
    AcDrinkTeaView.prototype.freshView = function () {
        if (this._isShowEffect) {
            return;
        }
        this._haveTxt.text = String(this.vo.getProcess());
        this._haveTxt2.text = LanguageManager.getlocal("acDrinkTeaItemTxt2", [String(this.vo.getAchieveNum())]);
        this.freshFreeLab();
        this.freshRed();
        this.refreshFlowers();
    };
    AcDrinkTeaView.prototype.receiveData = function (data) {
        if (!data.ret) {
            this._isShowEffect = false;
            this.closeOpenTouch(true);
            App.CommonUtil.showTip(data.data.ret);
            return;
        }
    };
    AcDrinkTeaView.prototype.attackCallback = function (event) {
        var _this = this;
        var rData = event.data.data.data;
        if (!event.data.ret) {
            this._isShowEffect = false;
            this.closeOpenTouch(true);
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        this._tempAwards = rData.rewards;
        this._capImg.visible = false;
        var name = this._isTen ? "daocha2" : "daocha1";
        this._daochaEffect.visible = true;
        this._daochaEffect.playDragonMovie(name, 1);
        this._daochaEffect.setDragonBoneEventListener(dragonBones.AnimationEvent.COMPLETE, function () {
            // this._daochaEffect.playDragonMovie("dingzhen",1);
            if (_this._tempAwards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": _this._tempAwards, "isPlayAni": true, "callback": null, "handler": null });
            }
            _this._daochaEffect.visible = false;
            _this._capImg.visible = true;
            _this.closeOpenTouch(true);
            _this._isShowEffect = false;
            _this.freshView();
        }, 1);
    };
    AcDrinkTeaView.prototype.closeOpenTouch = function (b) {
        this.touchChildren = b;
        this.touchEnabled = true;
        // this._maskBmp.visible = true;
        // this._maskBmp.touchEnabled = true;
    };
    AcDrinkTeaView.prototype.drinkTeaBtnHandle1 = function () {
        this.drinkTeaBtnHandle(1);
    };
    AcDrinkTeaView.prototype.drinkTeaBtnHandle10 = function () {
        this.drinkTeaBtnHandle(2);
    };
    AcDrinkTeaView.prototype.drinkTeaBtnHandle = function (type) {
        var _this = this;
        if (!this.vo.isInActivity() || this.vo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        var cost = type == 1 ? this.cfg.cost1 : this.cfg.cost10;
        if (type == 1 && this.vo.isfree > 0) {
            cost = 0;
        }
        var have = this.vo.getProcess();
        if (have < cost) {
            var message = LanguageManager.getlocal("acDrinkTeaDesc-" + this.typeCode);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                msg: message,
                title: "itemUseConstPopupViewTitle",
                touchMaskClose: true,
                callback: function () {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACDRINKTEAREWARDPOPVIEW, { aid: _this.aid, code: _this.code });
                },
                handler: this,
                needClose: 1,
                needCancel: true
            });
            return;
        }
        this._isShowEffect = true;
        this._isTen = type == 2;
        this.closeOpenTouch(false);
        this.request(NetRequestConst.REQUEST_DRINKTEA_DRINKTEA, {
            activeId: this.vo.aidAndCode,
            isTenPlay: type == 1 ? 0 : 1
        });
    };
    AcDrinkTeaView.prototype.freshFreeLab = function () {
        if (this.vo.isfree > 0) {
            this._freeLab.visible = true;
            this._icon1.visible = false;
            this._costTxt1.visible = false;
        }
        else {
            this._freeLab.visible = false;
            this._icon1.visible = true;
            this._costTxt1.visible = true;
        }
    };
    AcDrinkTeaView.prototype.freshRed = function () {
        if (this.vo.isShowRechargeDot() || this.vo.isShowAchieveDot()) {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
            var detailRed = this._detailBtn.getChildByName("reddot");
            if (detailRed) {
                detailRed.setPosition(70, 0);
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }
    };
    AcDrinkTeaView.prototype.tick = function () {
        this._timeCountTxt.setString(this.vo.getAcCountDown());
        this._timeCountTxt.x = this._timebg.x + this._timebg.width / 2 - this._timeCountTxt.width / 2;
    };
    AcDrinkTeaView.prototype.showPreEffect = function (y, func) {
        var _this = this;
        var servantSkinId = this.cfg.show;
        var skinCfg = Config.ServantskinCfg.getServantSkinItemById(servantSkinId);
        var boneName = undefined;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
        var fun1 = function () {
            var baseCon = new BaseDisplayObjectContainer();
            var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
            skinTxtEffect.setPosition(0, 0);
            skinTxtEffect.blendMode = egret.BlendMode.ADD;
            baseCon.addChild(skinTxtEffect);
            skinTxtEffect.playWithTime(-1);
            skinTxtEffect.addTouchTap(function () {
                ViewController.getInstance().openView(ViewConst.POPUP.ACDRINKTEAREWARDPOPVIEWTAB4, { aid: _this.aid, code: _this.code });
            }, _this);
            var skinTxt1 = BaseBitmap.create("acsearchproofview_common_skintxt");
            skinTxt1.setPosition(skinTxtEffect.x + skinTxtEffect.width / 2 - skinTxt1.width / 2 + 105, skinTxtEffect.y + skinTxtEffect.height / 2 - skinTxt1.height / 2 + 75);
            baseCon.addChild(skinTxt1);
            egret.Tween.get(skinTxt1, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
            var skinTxteffect = BaseBitmap.create("acsearchproofview_common_skintxt");
            skinTxteffect.setPosition(skinTxt1.x, skinTxt1.y);
            baseCon.addChild(skinTxteffect);
            skinTxteffect.blendMode = egret.BlendMode.ADD;
            skinTxteffect.alpha = 0;
            egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
            baseCon.setPosition(220, y - 120);
            _this.addChild(baseCon);
            if (func) {
                func();
            }
        };
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            ResourceManager.loadResources(this.getBonesResArr(skinCfg.bone), null, function () {
                var servant = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                _this.addChild(servant);
                servant.setScale(1);
                servant.setPosition(320, y + 60);
                fun1();
            }, null, this);
        }
        else {
            var servant = BaseLoadBitmap.create(skinCfg.body);
            this.addChild(servant);
            servant.setScale(1);
            servant.setPosition(120, y - 420);
            fun1();
        }
    };
    AcDrinkTeaView.prototype.getBonesResArr = function (name) {
        return [name + "_ske", name + "_tex_json", name + "_tex_png"];
    };
    //根据资源名字得到完整资源名字
    AcDrinkTeaView.prototype.getDefaultRes = function (resName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (ResourceManager.hasRes(resName + "-" + this.code)) {
            return resName + "-" + this.code;
        }
        else {
            return resName + "-" + defaultCode;
        }
    };
    AcDrinkTeaView.prototype.getDefaultResList = function (resArr) {
        var arr = [];
        for (var i = 0; i < resArr.length; i++) {
            var element = resArr[i];
            var defRes = this.getDefaultRes(element);
            arr.push(defRes);
        }
        return arr;
    };
    AcDrinkTeaView.prototype.getResourceList = function () {
        var codeRes = this.getDefaultResList([
            "acdrinktea_bg",
            "acdrinktea_cap",
            "acdrinktea_desk",
            "acdrinktea_txtbg",
            "drinktea_title",
            "drinkteabtn",
            "acdrinktea_specialitem",
            "acdrinktea_iconsmall",
        ]);
        var eff1 = this.effectRes("acdrinktea_flower", 7);
        var eff2 = this.effectRes("acdrinktea_flowermask", 7);
        var eff3 = this.effectRes("acdrinktea_glow_", 5, true);
        var eff4 = this.effectRes("acdrinktea_effect", 8, true);
        var arr = ["acthreekingofwife_infobg-1", "acsearchproofview_common_skintxt", "acdrinktea_taozi",
            "acdrinktea_chahe", "acdrinktea_light"];
        var baseList = arr.concat(eff1).concat(eff2).concat(eff3).concat(eff4);
        return _super.prototype.getResourceList.call(this).concat(baseList).concat(codeRes).concat(this.getBonesResArr("daocha"));
    };
    AcDrinkTeaView.prototype.effectRes = function (name, num, b) {
        if (b === void 0) { b = false; }
        var arr = [];
        for (var i = 1; i <= num; i++) {
            arr.push(name + String(i));
        }
        if (b) {
            return arr;
        }
        return this.getDefaultResList(arr);
    };
    AcDrinkTeaView.prototype.getProbablyInfo = function () {
        return "acDrinkTeaProbablyInfo-" + this.typeCode;
    };
    AcDrinkTeaView.prototype.getReportTipData = function () {
        var key = this.acTivityId + "report-" + Api.playerVoApi.getPlayerID() + "-" + this.vo.st + "-" + App.DateUtil.getWeeTs(GameData.serverTime);
        var storage = LocalStorageManager.get(key);
        if (!storage) {
            LocalStorageManager.set(key, "1");
            return { title: { key: this.getCnByCode("acDrinkTeaReportTitle", this.typeCode) }, msg: { key: this.getCnByCode("acDrinkTeaReportMsg", this.typeCode) } };
        }
        else {
            return null;
        }
    };
    AcDrinkTeaView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_DRINKTEA_DRINKTEA, this.attackCallback, this);
        this._timeCountTxt = null;
        this._isShowEffect = false;
        this._haveTxt = null;
        this._haveTxt2 = null;
        this._icon0 = null;
        this._icon1 = null;
        this._freeLab = null;
        this._infobg = null;
        this._capImg = null;
        this.flowerList = [];
        if (this._daochaEffect) {
            this._daochaEffect.dispose();
            this._daochaEffect = null;
        }
        if (this._chongziEffect) {
            this._chongziEffect.dispose();
            this._chongziEffect = null;
        }
        _super.prototype.dispose.call(this);
    };
    AcDrinkTeaView.IS_SHOW_PROCESS = -1;
    return AcDrinkTeaView;
}(AcCommonView));
__reflect(AcDrinkTeaView.prototype, "AcDrinkTeaView");
//# sourceMappingURL=AcDrinkTeaView.js.map