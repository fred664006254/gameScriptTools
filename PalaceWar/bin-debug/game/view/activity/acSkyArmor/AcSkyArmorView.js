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
    author : wxz
    date : 2020/6/22
    desc : 天魔铠甲--吕布衣装
*/
var AcSkyArmorView = /** @class */ (function (_super) {
    __extends(AcSkyArmorView, _super);
    function AcSkyArmorView() {
        var _this = _super.call(this) || this;
        _this._detailBtn = null;
        _this._timeCountTxt = null;
        _this._timebg = null;
        _this._freeBtn = null;
        _this._jinglianBtn1 = null;
        _this._isMove = false;
        _this._infobg = null;
        _this._proNumBg = null;
        _this._proNumTxt = null;
        _this._imgsArr = null;
        _this._scrollView = null;
        _this._proContainer = null;
        _this._qiaojiEffect = null;
        _this._payTxt = null;
        _this._haveTxt = null;
        _this._exchangeNumTxt = null;
        _this._kaijiaImg = null;
        _this._tempAwards = null;
        _this._isShowEffect = false;
        _this._isTen = false;
        return _this;
    }
    // 标题背景名称
    AcSkyArmorView.prototype.getTitleBgName = function () {
        return "acskyarmor_title-" + this.typeCode;
    };
    AcSkyArmorView.prototype.getTitleStr = function () {
        return null;
    };
    AcSkyArmorView.prototype.getBgName = function () {
        return "acskyarmor_bg-" + this.typeCode;
    };
    AcSkyArmorView.prototype.getRuleInfo = function () {
        return "acSkyArmorRuleInfo-" + this.typeCode;
    };
    AcSkyArmorView.prototype.getRuleInfoParam = function () {
        return ["" + this.cfg.needGem, this.cfg.change.needItem.split("_")[2]];
    };
    Object.defineProperty(AcSkyArmorView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSkyArmorView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSkyArmorView.prototype, "acTivityId", {
        get: function () {
            "";
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSkyArmorView.prototype, "typeCode", {
        get: function () {
            if (this.code == "2") {
                return "1";
            }
            return this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcSkyArmorView.prototype.clickImg = function (e) {
        if (!this.vo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        var name = (e.currentTarget).name;
        var id = parseInt(name.split("_")[1]);
        ViewController.getInstance().openView(ViewConst.POPUP.ACSKYARMORREWARDPOPVIEWTAB2, { id: id, aid: this.aid, code: this.code });
    };
    AcSkyArmorView.prototype.initView = function () {
        var _this = this;
        var code = this.code;
        var typecode = this.typeCode;
        this.width = GameConfig.stageWidth;
        this.height = GameConfig.stageHeigth;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACSKYARMOR_PLAY, this.attackCallback, this);
        var infoBg = BaseBitmap.create("acliangbiographyview_common_acbg");
        infoBg.width = GameConfig.stageWidth;
        infoBg.height = 130;
        infoBg.setPosition(this.titleBg.x + this.titleBg.width / 2 - infoBg.width / 2, this.titleBg.y + this.titleBg.height);
        this.addChildToContainer(infoBg);
        this._infobg = infoBg;
        var numbg = BaseBitmap.create("acskyarmor_zhu1");
        numbg.x = 25;
        numbg.y = infoBg.y + infoBg.height;
        this.addChild(numbg);
        numbg.touchEnabled = true;
        numbg.addTouchTap(function () {
            if (_this.vo.isStart) {
                ViewController.getInstance().openView(ViewConst.POPUP.ACSKYARMORREWARDPOPVIEWTAB2, { aid: _this.aid, code: _this.code });
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            }
        }, this);
        var numbg2 = BaseBitmap.create("acskyarmornumbg");
        numbg2.width = numbg.width + 30;
        numbg2.height = 24;
        numbg2.x = numbg.x + numbg.width / 2 - numbg2.width / 2;
        numbg2.y = numbg.y + numbg.height - numbg2.height / 2 - 15;
        this.addChild(numbg2);
        this._proNumBg = numbg2;
        var proNumTxt = ComponentManager.getTextField(LanguageManager.getlocal("acskyarmor_pronumtxt", ["0"]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        proNumTxt.width = 200;
        proNumTxt.textAlign = egret.HorizontalAlign.CENTER;
        proNumTxt.x = numbg2.x + numbg2.width / 2 - proNumTxt.width / 2;
        proNumTxt.y = numbg2.y + numbg2.height / 2 - proNumTxt.height / 2;
        this.addChild(proNumTxt);
        this._proNumTxt = proNumTxt;
        var countX = 0;
        this._imgsArr = [];
        this._proContainer = new BaseDisplayObjectContainer();
        this._proContainer.height = 160;
        var str = this.cfg.change.needItem;
        var itemCfg = Config.ItemCfg.getItemCfgById(str.split("_")[1]);
        var itemicon = BaseLoadBitmap.create("itemicon" + itemCfg.id);
        itemicon.width = 60;
        itemicon.height = 60;
        itemicon.x = 5;
        itemicon.y = numbg2.y + numbg2.height + 5;
        this.addChild(itemicon);
        var exchangebg = BaseBitmap.create("acskyarmornumbg");
        exchangebg.width = 210;
        exchangebg.height = 32;
        exchangebg.x = itemicon.x + itemicon.width - 15;
        exchangebg.y = itemicon.y + itemicon.height / 2 - exchangebg.height / 2;
        this.addChild(exchangebg);
        var exchangeNumTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSkyArmorExchangeNumTxt", ["0", "0"]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        exchangeNumTxt.x = itemicon.x + itemicon.width + 5;
        exchangeNumTxt.y = itemicon.y + itemicon.height / 2 - exchangeNumTxt.height / 2;
        this.addChild(exchangeNumTxt);
        this._exchangeNumTxt = exchangeNumTxt;
        var datas = this.vo.getSortAchievementCfg(false);
        var count = 0;
        for (var i = 0; i < datas.length; i++) {
            var img = BaseBitmap.create("acskyarmor_zhu2");
            img.x = 30 + i * 85;
            this._proContainer.addChild(img);
            img.touchEnabled = true;
            img.name = "img_" + datas[i].id;
            img.addTouchTap(this.clickImg, this);
            this._imgsArr.push(img);
            var num = datas[i].needNum;
            var txt = ComponentManager.getTextField(String(num), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            txt.x = img.x + img.width / 2 - txt.width / 2;
            txt.y = img.y + img.height - 5;
            this._proContainer.addChild(txt);
        }
        this._proContainer.width = this._proContainer.width + 30;
        var scrollView = ComponentManager.getScrollView(this._proContainer, new egret.Rectangle(0, 0, GameConfig.stageWidth - (numbg.x + numbg.width + 15), this._proContainer.height));
        scrollView.setPosition(numbg.x + numbg.width + 15, numbg.y);
        scrollView.bounces = false;
        this._scrollView = scrollView;
        this.addChild(scrollView);
        var curId = this.freshProImags();
        this._scrollView.scrollLeft = this._proContainer.width - this._scrollView.width;
        if (curId < 7) {
            this._isMove = true;
            egret.Tween.get(this._scrollView).wait(300).to({ scrollLeft: 0 }, 500).call(function () {
                egret.Tween.removeTweens(_this._scrollView);
                _this._isMove = false;
            }, this);
        }
        //活动时间   
        var timeTxt = ComponentManager.getTextField(this.vo.getAcTimeAndHour(), 18, TextFieldConst.COLOR_WHITE);
        timeTxt.x = this._infobg.x + 15;
        timeTxt.y = this._infobg.y + 8;
        this.addChild(timeTxt);
        var needNum = this.vo.getWifeNeed();
        var infoTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSkyArmorInfo-" + typecode, [String(this.cfg.needGem), String(needNum)]), 18, TextFieldConst.COLOR_WHITE);
        infoTxt.x = timeTxt.x;
        infoTxt.y = timeTxt.y + timeTxt.height + 6;
        infoTxt.lineSpacing = 4;
        infoTxt.width = 600;
        this.addChild(infoTxt);
        var paynum = this.cfg.needGem - (this.vo.buyGem % this.cfg.needGem);
        var payTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSkyArmorPayDesc", [String(paynum)]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        payTxt.x = timeTxt.x;
        payTxt.y = infoTxt.y + infoTxt.height + 10;
        this.addChild(payTxt);
        this._payTxt = payTxt;
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
        var botbg = BaseBitmap.create("acskyarmor_bot-" + typecode);
        botbg.x = GameConfig.stageWidth / 2 - botbg.width / 2;
        botbg.y = GameConfig.stageHeigth - botbg.height;
        ViewController.getInstance().openView(ViewConst.COMMON.ACSKYARMORSTORYVIEW, { aid: this.aid, code: this.code });
        this.showPreEffect(botbg.y, function () {
            var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
            skinTxtEffect.width = 208;
            skinTxtEffect.height = 154;
            skinTxtEffect.setPosition(60, botbg.y - 100);
            skinTxtEffect.blendMode = egret.BlendMode.ADD;
            _this.addChild(skinTxtEffect);
            skinTxtEffect.playWithTime(-1);
            var skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
            skinTxt.anchorOffsetX = skinTxt.width / 2;
            skinTxt.anchorOffsetY = skinTxt.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
            _this.addChild(skinTxt);
            egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
            var skinTxt1 = BaseBitmap.create("acwealthcarpview_servantskintxt");
            skinTxt1.anchorOffsetX = skinTxt1.width / 2;
            skinTxt1.anchorOffsetY = skinTxt1.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt1, skinTxtEffect);
            _this.addChild(skinTxt1);
            skinTxt1.blendMode = egret.BlendMode.ADD;
            skinTxt1.alpha = 0;
            egret.Tween.get(skinTxt1, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
            skinTxt1.addTouchTap(function () {
                if (_this.vo.isStart) {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACSKYARMORREWARDPOPVIEWTAB4, { aid: _this.aid, code: _this.code });
                }
                else {
                    App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                }
            }, _this);
            _this.addChild(botbg);
            var detailBtn = ComponentManager.getButton("skyarmorbtn-" + typecode, "", function () {
                if (_this.vo.isStart) {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACSKYARMORREWARDPOPVIEW, { aid: _this.aid, code: _this.code });
                }
                else {
                    App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                }
            }, _this, null);
            detailBtn.setPosition(botbg.x + botbg.width / 2 - detailBtn.width / 2, botbg.y - detailBtn.height + 30);
            _this.addChild(detailBtn);
            _this._detailBtn = detailBtn;
            // 精炼按钮
            var jinglianBtn1 = ComponentManager.getButton("acskyarmorbtn1", "", _this.jinglianBtnHandle1, _this);
            _this.addChild(jinglianBtn1);
            _this.setLayoutPosition(LayoutConst.leftbottom, jinglianBtn1, botbg, [45, 10]);
            var jinglianBtn10 = ComponentManager.getButton("acskyarmorbtn10", "", _this.jinglianBtnHandle10, _this);
            _this.addChild(jinglianBtn10);
            _this.setLayoutPosition(LayoutConst.rightbottom, jinglianBtn10, botbg, [45, 10]);
            _this._jinglianBtn1 = jinglianBtn1;
            _this._freeBtn = ComponentManager.getButton("acskyarmorbtnfree", "", _this.jinglianBtnHandle1, _this);
            _this._freeBtn.x = jinglianBtn1.x;
            _this._freeBtn.y = jinglianBtn1.y;
            _this.addChild(_this._freeBtn);
            var kaijia = BaseBitmap.create("acskyarmor_kaijia");
            kaijia.x = GameConfig.stageWidth / 2 - kaijia.width / 2;
            kaijia.y = infoBg.y + infoBg.height + 220 - (1136 - GameConfig.stageHeigth) / 2;
            _this.addChild(kaijia);
            var posy = kaijia.y;
            egret.Tween.get(kaijia, { loop: true }).to({ y: posy - 5 }, 1000).wait(100).to({ y: posy }, 1000).wait(100);
            _this._kaijiaImg = kaijia;
            _this._haveTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSkyArmorTimesTxt", [String(_this.vo.v)]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            _this._haveTxt.textAlign = egret.HorizontalAlign.CENTER;
            _this._haveTxt.lineSpacing = 3;
            _this._haveTxt.x = GameConfig.stageWidth / 2 - _this._haveTxt.width / 2;
            _this._haveTxt.y = GameConfig.stageHeigth - _this._haveTxt.height - 23;
            _this.addChild(_this._haveTxt);
            var con = _this.vo.getAuraCon();
            con.x = GameConfig.stageWidth - con.width * con.scaleX - 30;
            con.y = botbg.y - con.height * con.scaleY + 20;
            _this.addChild(con);
            _this.initEffect();
            _this.freshView();
        });
    };
    AcSkyArmorView.prototype.closeHandler = function () {
        if (this._isMove) {
            return;
        }
        this.hide();
    };
    AcSkyArmorView.prototype.initEffect = function () {
        if ((!Api.switchVoApi.checkCloseBone()) && App.CommonUtil.check_dragon()) {
            if (!this._qiaojiEffect) {
                this._qiaojiEffect = App.DragonBonesUtil.getLoadDragonBones("skyarmor_refine", 0, "idle");
                this._qiaojiEffect.setPosition(325, 525 - (1136 - GameConfig.stageHeigth) / 2);
                this.addChild(this._qiaojiEffect);
                this._qiaojiEffect.visible = false;
            }
        }
    };
    AcSkyArmorView.prototype.freshView = function () {
        if (this._isShowEffect) {
            return;
        }
        this.freshFreeLab();
        this.freshRed();
        this.freshProImags();
        var paynum = this.cfg.needGem - (this.vo.buyGem % this.cfg.needGem);
        this._payTxt.text = LanguageManager.getlocal("acSkyArmorPayDesc", [String(paynum)]);
        this._haveTxt.text = LanguageManager.getlocal("acSkyArmorTimesTxt", [String(this.vo.v)]);
        var exchangeNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.change.needItem.split("_")[1]);
        var leftNum = this.cfg.specialLimit - this.vo.specialNum;
        this._exchangeNumTxt.text = LanguageManager.getlocal("acSkyArmorExchangeNumTxt", ["" + exchangeNum, "" + leftNum]);
    };
    AcSkyArmorView.prototype.receiveData = function (data) {
        if (!data.ret) {
            this._isShowEffect = false;
            this.closeOpenTouch(true);
            App.CommonUtil.showTip(data.data.ret);
            return;
        }
    };
    AcSkyArmorView.prototype.attackCallback = function (event) {
        var rData = event.data.data.data;
        if (!event.data.ret) {
            this._isShowEffect = false;
            this.closeOpenTouch(true);
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        this._tempAwards = rData.rewards;
        this.showEffect();
    };
    AcSkyArmorView.prototype.showEffect = function () {
        var _this = this;
        if ((!Api.switchVoApi.checkCloseBone()) && App.CommonUtil.check_dragon()) {
            this._kaijiaImg.visible = false;
            this._qiaojiEffect.visible = true;
            var name_1 = this._isTen ? "10ci" : "1ci";
            this._qiaojiEffect.playDragonMovie(name_1, 1);
            this._qiaojiEffect.setDragonBoneEventListener(dragonBones.AnimationEvent.COMPLETE, function () {
                _this._kaijiaImg.visible = true;
                _this._qiaojiEffect.visible = false;
                _this.showRewards();
            }, 1);
        }
        else {
            this.showRewards();
        }
    };
    AcSkyArmorView.prototype.showRewards = function () {
        if (this._tempAwards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": this._tempAwards, "isPlayAni": true, "callback": null, "handler": null });
        }
        this.closeOpenTouch(true);
        this._isShowEffect = false;
        this.freshView();
    };
    AcSkyArmorView.prototype.freshProImags = function () {
        var curId = 10000;
        var curnum = this.vo.getAchieveNum();
        this._proNumTxt.text = LanguageManager.getlocal("acskyarmor_pronumtxt", [String(curnum)]);
        this._proNumTxt.x = this._proNumBg.x + this._proNumBg.width / 2 - this._proNumTxt.width / 2;
        var datas = this.vo.getSortAchievementCfg(false);
        for (var i = 0; i < this._imgsArr.length; i++) {
            if (this.vo.isGetAchievementById(String(datas[i].id))) {
                if (this._imgsArr[i]["eff"]) {
                    this._imgsArr[i]["eff"].dispose();
                    this._imgsArr[i]["eff"] = null;
                }
                App.DisplayUtil.changeToGray(this._imgsArr[i]);
            }
            else {
                if (curnum >= datas[i].needNum) //可领取
                 {
                    if (!this._imgsArr[i]["eff"]) {
                        var effect = ComponentManager.getCustomMovieClip("acskyarmorach", 10);
                        effect.width = 160;
                        effect.x = this._imgsArr[i].x + this._imgsArr[i].width / 2 - effect.width / 2;
                        effect.y = this._imgsArr[i].y - 40;
                        effect.playWithTime(-1);
                        this._proContainer.addChild(effect);
                        effect.blendMode = egret.BlendMode.ADD;
                        this._imgsArr[i]["eff"] = effect;
                    }
                }
            }
            if (curnum < datas[i].needNum && curId == 10000) {
                curId = datas[i].id;
            }
        }
        return curId;
    };
    AcSkyArmorView.prototype.closeOpenTouch = function (b) {
        this.touchChildren = b;
        this.touchEnabled = true;
    };
    AcSkyArmorView.prototype.jinglianBtnHandle1 = function () {
        this.jinglianBtnHandle(1);
    };
    AcSkyArmorView.prototype.jinglianBtnHandle10 = function () {
        this.jinglianBtnHandle(2);
    };
    AcSkyArmorView.prototype.jinglianBtnHandle = function (type) {
        if (!this.vo.isInActivity() || this.vo.checkIsInEndShowTime() || !this.vo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        var cost = type == 1 ? this.cfg.cost1 : this.cfg.cost10;
        if (type == 1 && this.vo.isfree > 0) {
            cost = 0;
        }
        var have = this.vo.getProcess();
        if (have < cost) {
            var message = LanguageManager.getlocal("acskyarmorconfirmDesc");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                msg: message,
                title: "itemUseConstPopupViewTitle",
                touchMaskClose: true,
                callback: function () {
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
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
        this.request(NetRequestConst.REQUEST_ACSKYARMOR_PLAY, {
            activeId: this.vo.aidAndCode,
            isFree: cost == 0 ? 1 : 0,
            isTenPlay: type == 1 ? 0 : 1
        });
    };
    AcSkyArmorView.prototype.freshFreeLab = function () {
        if (this.vo.isfree > 0) {
            this._freeBtn.visible = true;
            this._jinglianBtn1.visible = false;
        }
        else {
            this._freeBtn.visible = false;
            this._jinglianBtn1.visible = true;
        }
    };
    AcSkyArmorView.prototype.freshRed = function () {
        if (this.vo.isShowAchieveDot() || this.vo.showExchangeWifeDot()) {
            App.CommonUtil.addIconToBDOC(this);
            var detailRed = this.getChildByName("reddot");
            if (detailRed) {
                detailRed.setPosition(this._detailBtn.x + 140, this._detailBtn.y + 30);
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this);
        }
    };
    AcSkyArmorView.prototype.tick = function () {
        this._timeCountTxt.setString(this.vo.getAcCountDown());
        this._timeCountTxt.x = this._timebg.x + this._timebg.width / 2 - this._timeCountTxt.width / 2;
    };
    AcSkyArmorView.prototype.showPreEffect = function (y, func) {
        var _this = this;
        var skinid = this.cfg.show;
        var skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinid);
        var boneName = undefined;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
        if (skinCfg) {
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                ResourceManager.loadResources(this.getBonesResArr(skinCfg.bone), null, function () {
                    var servSkin = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                    _this.addChild(servSkin);
                    servSkin.setScale(0.9);
                    servSkin.setPosition(120, y + 10 + (1136 - GameConfig.stageHeigth) / 2);
                    func();
                }, null, this);
            }
            else {
                var servSkin = BaseLoadBitmap.create(skinCfg.body);
                this.addChild(servSkin);
                servSkin.setScale(1.05);
                servSkin.setPosition(-40, y - 450 + (1136 - GameConfig.stageHeigth) / 3);
                func();
            }
        }
        else {
            func();
        }
    };
    AcSkyArmorView.prototype.getBonesResArr = function (name) {
        return [name + "_ske", name + "_tex_json", name + "_tex_png"];
    };
    //根据资源名字得到完整资源名字
    AcSkyArmorView.prototype.getDefaultRes = function (resName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (ResourceManager.hasRes(resName + "-" + this.code)) {
            return resName + "-" + this.code;
        }
        else {
            return resName + "-" + defaultCode;
        }
    };
    AcSkyArmorView.prototype.getDefaultResList = function (resArr) {
        var arr = [];
        for (var i = 0; i < resArr.length; i++) {
            var element = resArr[i];
            var defRes = this.getDefaultRes(element);
            arr.push(defRes);
        }
        return arr;
    };
    AcSkyArmorView.prototype.getResourceList = function () {
        var typecode = this.typeCode;
        // let eff1 = this.effectRes("acskyarmorach",8);
        var eff1 = [];
        var arr = ["acskyarmorcode" + typecode, "acliangbiographyview_common_acbg", "acwealthcarpview_servantskintxt",
            "skin_detail_namebg"
        ];
        var servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(this.cfg.show);
        if (servantSkinCfg.specialAura) {
            arr.push("servant_aura_Icon" + servantSkinCfg.specialAuraCfg.auraIcon);
        }
        var baseList = arr.concat(eff1);
        return _super.prototype.getResourceList.call(this).concat(baseList).concat(this.getBonesResArr("skyarmor_refine"));
    };
    AcSkyArmorView.prototype.effectRes = function (name, num, b) {
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
    AcSkyArmorView.prototype.getProbablyInfo = function () {
        return "acSkyArmorProbablyInfo-" + this.typeCode;
    };
    AcSkyArmorView.prototype.getRuleBtnName = function () {
        return ButtonConst.BTN2_RULE;
    };
    AcSkyArmorView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACSKYARMOR_PLAY, this.attackCallback, this);
        this._timeCountTxt = null;
        this._isShowEffect = false;
        this._payTxt = null;
        this._infobg = null;
        this._proNumTxt = null;
        this._scrollView = null;
        this._proContainer = null;
        this._detailBtn = null;
        this._freeBtn = null;
        this._jinglianBtn1 = null;
        this._haveTxt = null;
        this._exchangeNumTxt = null;
        for (var i = 0; i < this._imgsArr.length; i++) {
            if (this._imgsArr[i]["eff"]) {
                this._imgsArr[i]["eff"].dispose();
                this._imgsArr[i]["eff"] = null;
            }
            this._imgsArr[i].dispose();
            this._imgsArr[i] = null;
        }
        this._imgsArr = null;
        if (this._qiaojiEffect) {
            this._qiaojiEffect.dispose();
            this._qiaojiEffect = null;
        }
        _super.prototype.dispose.call(this);
    };
    return AcSkyArmorView;
}(AcCommonView));
//# sourceMappingURL=AcSkyArmorView.js.map