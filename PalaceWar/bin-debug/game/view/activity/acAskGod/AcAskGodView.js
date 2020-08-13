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
    date : 2020/7/20
    desc : 求签问卜
*/
var AcAskGodView = /** @class */ (function (_super) {
    __extends(AcAskGodView, _super);
    function AcAskGodView() {
        var _this = _super.call(this) || this;
        _this._timeCountTxt = null;
        _this._timebg = null;
        _this._freeLab = null;
        _this._numCon1 = null;
        _this._isMove = false;
        _this._infobg = null;
        _this._proNumTxt = null;
        _this._imgsArr = null;
        _this._scrollView = null;
        _this._proContainer = null;
        _this._qiaojiEffect = null;
        _this._bitong = null;
        _this._exchangeNumTxt = null;
        _this._skybg1 = null;
        _this._skybg2 = null;
        _this._moveArr = [[315, 370], [113, 410], [271, 484]];
        _this._tempAwards = null;
        _this._tempOtherAwards = null;
        _this._awardsCountObj = null;
        _this._isShowEffect = false;
        _this._isTen = false;
        _this._isfiveTen = false;
        _this._tickCount = 0;
        _this._denglongEff = null;
        _this._denglongFlag = false;
        _this._speed1 = 1;
        _this._speed2 = 1;
        return _this;
    }
    // 标题背景名称
    AcAskGodView.prototype.getTitleBgName = function () {
        return "acaskgod_title-" + this.typeCode;
    };
    AcAskGodView.prototype.getTitleStr = function () {
        return null;
    };
    AcAskGodView.prototype.getBgName = function () {
        return "acaskgod_bg-" + this.typeCode;
    };
    AcAskGodView.prototype.getRuleInfo = function () {
        return "acAskGodRuleInfo-" + this.typeCode;
    };
    Object.defineProperty(AcAskGodView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAskGodView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAskGodView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAskGodView.prototype, "typeCode", {
        get: function () {
            if (this.code == "2") {
                return "1";
            }
            return this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcAskGodView.prototype.initBg = function () {
        this._skybg1 = BaseBitmap.create("acaskgod_sky-" + this.typeCode);
        this._skybg1.x = 0;
        this._skybg1.y = 140;
        this.addChild(this._skybg1);
        this._skybg2 = BaseBitmap.create("acaskgod_sky-" + this.typeCode);
        this._skybg2.x = this._skybg1.x + this._skybg1.width - 5;
        this._skybg2.y = this._skybg1.y;
        this.addChild(this._skybg2);
        this.viewBg = BaseBitmap.create(this.getBgName());
        this.addChild(this.viewBg);
        var kuangbg = BaseBitmap.create("acaskgod_bg2-" + this.typeCode);
        this.addChild(kuangbg);
    };
    AcAskGodView.prototype.initTitle = function () {
        _super.prototype.initTitle.call(this);
        this._infobg = BaseBitmap.create("acaskgod_infobg-" + this.typeCode);
        this._infobg.x = GameConfig.stageWidth / 2 - this._infobg.width / 2;
        this._infobg.y = this.titleBg.y + this.titleBg.height - 10;
        this.addChild(this._infobg);
    };
    AcAskGodView.prototype.clickImg = function (e) {
        var name = (e.currentTarget).name;
        var id = parseInt(name.split("_")[1]);
        ViewController.getInstance().openView(ViewConst.POPUP.ACASKGODACHREWARDPOPVIEW, { aid: this.aid, code: this.code, id: id });
    };
    AcAskGodView.prototype.initView = function () {
        var _this = this;
        var code = this.code;
        var typecode = this.typeCode;
        this.width = GameConfig.stageWidth;
        this.height = GameConfig.stageHeigth;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACASKGOD_DIVINE, this.attackCallback, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterHandel, this);
        this._exchangeBtn = ComponentManager.getButton("acaskgod_exchangebtn", "", function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACASKGODSKINREWARDPOPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        this._exchangeBtn.x = GameConfig.stageWidth - this._exchangeBtn.width - 80;
        this._exchangeBtn.y = 500;
        this.addChild(this._exchangeBtn);
        egret.Tween.get(this._exchangeBtn, { loop: true }).to({ x: this._moveArr[0][0], y: this._moveArr[0][1] }, 15000).
            to({ x: this._moveArr[1][0], y: this._moveArr[1][1] }, 15000).
            to({ x: this._moveArr[2][0], y: this._moveArr[2][1] }, 15000).
            to({ x: GameConfig.stageWidth - this._exchangeBtn.width - 80, y: 500 }, 15000);
        var numbg = BaseBitmap.create("acaskgod_achbg-" + typecode);
        numbg.x = 10;
        numbg.y = this.titleBg.y + this.titleBg.height + 130;
        this.addChild(numbg);
        numbg.touchEnabled = true;
        numbg.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACASKGODACHREWARDPOPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        var proNumTxt = ComponentManager.getTextField(LanguageManager.getlocal("acAskGod_pronumtxt", ["0"]), 18, TextFieldConst.COLOR_BROWN);
        proNumTxt.lineSpacing = 3;
        proNumTxt.width = numbg.width;
        proNumTxt.textAlign = egret.HorizontalAlign.CENTER;
        proNumTxt.x = numbg.x;
        proNumTxt.y = numbg.y + 77;
        this.addChild(proNumTxt);
        this._proNumTxt = proNumTxt;
        var countX = 0;
        this._imgsArr = [];
        this._proContainer = new BaseDisplayObjectContainer();
        this._proContainer.height = 170;
        var datas = this.vo.getSortAchievementCfg(false);
        var count = 0;
        for (var i = 0; i < datas.length; i++) {
            var num = datas[i].needNum;
            var img = BaseBitmap.create("acaskgod_achicon-" + this.typeCode);
            img.x = 25 + i * 90;
            this._proContainer.addChild(img);
            img.touchEnabled = true;
            img.name = "img_" + datas[i].id;
            img.addTouchTap(this.clickImg, this);
            this._imgsArr.push(img);
            var txt = ComponentManager.getTextField(String(num), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            txt.x = img.x + img.width / 2 - txt.width / 2;
            txt.y = img.y + img.height - 3;
            this._proContainer.addChild(txt);
        }
        this._proContainer.width += 60;
        var scrollView = ComponentManager.getScrollView(this._proContainer, new egret.Rectangle(0, 0, GameConfig.stageWidth - (numbg.x + numbg.width + 5), this._proContainer.height));
        scrollView.setPosition(numbg.x + numbg.width + 5, numbg.y);
        scrollView.bounces = false;
        this._scrollView = scrollView;
        this.addChild(scrollView);
        var str = this.cfg.special.specialItem;
        var itemCfg = Config.ItemCfg.getItemCfgById(str.split("_")[1]);
        var itemicon = BaseLoadBitmap.create("itemicon" + itemCfg.id);
        itemicon.width = 60;
        itemicon.height = 60;
        itemicon.x = 5;
        itemicon.y = numbg.y + numbg.height + 10;
        this.addChild(itemicon);
        var exchangebg = BaseBitmap.create("acaskgod_numbg");
        exchangebg.width = 210;
        exchangebg.height = 32;
        exchangebg.x = itemicon.x + itemicon.width - 25;
        exchangebg.y = itemicon.y + itemicon.height / 2 - exchangebg.height / 2;
        this.addChild(exchangebg);
        var exchangeNumTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSkyArmorExchangeNumTxt", ["0", "0"]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        exchangeNumTxt.x = itemicon.x + itemicon.width + 5;
        exchangeNumTxt.y = itemicon.y + itemicon.height / 2 - exchangeNumTxt.height / 2;
        this.addChild(exchangeNumTxt);
        this._exchangeNumTxt = exchangeNumTxt;
        var curId = this.freshProImags();
        this._scrollView.scrollLeft = this._proContainer.width - this._scrollView.width;
        if (curId < 6) {
            this._isMove = true;
            egret.Tween.get(this._scrollView).wait(300).to({ scrollLeft: 0 }, 500).call(function () {
                egret.Tween.removeTweens(_this._scrollView);
                _this._isMove = false;
            }, this);
        }
        //活动时间   
        var timeTxt = ComponentManager.getTextField(this.vo.getAcTimeAndHour(), 18, TextFieldConst.COLOR_WHITE);
        timeTxt.x = this._infobg.x + 30;
        timeTxt.y = this._infobg.y + 25;
        this.addChild(timeTxt);
        // let needNum = this.vo.getWifeNeed();
        var infoTxt = ComponentManager.getTextField(LanguageManager.getlocal("acAskGodInfo-" + typecode), 18, TextFieldConst.COLOR_WHITE);
        infoTxt.x = timeTxt.x;
        infoTxt.y = timeTxt.y + timeTxt.height + 4;
        infoTxt.lineSpacing = 4;
        infoTxt.width = 590;
        this.addChild(infoTxt);
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
        var botbg = BaseBitmap.create("acaskgod_desk-" + typecode);
        botbg.x = GameConfig.stageWidth / 2 - botbg.width / 2;
        botbg.y = GameConfig.stageHeigth - botbg.height;
        this.addChild(botbg);
        // 前进按钮
        var drinkTeaBtn1 = ComponentManager.getButton("acaskgodbtn1", "", this.drinkTeaBtnHandle1, this);
        this.addChild(drinkTeaBtn1);
        this.setLayoutPosition(LayoutConst.leftbottom, drinkTeaBtn1, botbg, [70, 55]);
        var drinkTeaBtn10 = ComponentManager.getButton("acaskgodbtn10", "", this.drinkTeaBtnHandle10, this);
        this.addChild(drinkTeaBtn10);
        this.setLayoutPosition(LayoutConst.rightbottom, drinkTeaBtn10, botbg, [70, 55]);
        var butCon1 = new BaseDisplayObjectContainer();
        this.addChild(butCon1);
        var buyTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acAskGodBuyTips"), 20, TextFieldConst.COLOR_WHITE);
        butCon1.addChild(buyTxt1);
        var butIcon1 = BaseBitmap.create("itemicon" + this.cfg.getReward.split("_")[1]);
        butIcon1.setScale(0.4);
        butIcon1.x = buyTxt1.x + buyTxt1.width + 2;
        butCon1.addChild(butIcon1);
        var buyTxt2 = ComponentManager.getTextField("*" + this.cfg.getReward.split("_")[2], 20, TextFieldConst.COLOR_WHITE);
        buyTxt2.verticalAlign = egret.VerticalAlign.MIDDLE;
        buyTxt2.x = butIcon1.x + butIcon1.width * butIcon1.scaleX + 2;
        butCon1.addChild(buyTxt2);
        buyTxt1.y = butIcon1.y + butIcon1.height * butIcon1.scaleY / 2 - buyTxt1.height / 2;
        buyTxt2.y = butIcon1.y + butIcon1.height * butIcon1.scaleY / 2 - buyTxt2.height / 2;
        var butCon2 = new BaseDisplayObjectContainer();
        this.addChild(butCon2);
        var buyTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acAskGodBuyTips"), 20, TextFieldConst.COLOR_WHITE);
        butCon2.addChild(buyTxt3);
        var butIcon2 = BaseBitmap.create("itemicon" + this.cfg.getReward.split("_")[1]);
        butIcon2.setScale(0.4);
        butIcon2.x = buyTxt3.x + buyTxt3.width + 2;
        butCon2.addChild(butIcon2);
        var buyTxt4 = ComponentManager.getTextField("*" + parseInt(this.cfg.getReward.split("_")[2]) * 10, 20, TextFieldConst.COLOR_WHITE);
        buyTxt4.verticalAlign = egret.VerticalAlign.MIDDLE;
        buyTxt4.x = butIcon2.x + butIcon2.width * butIcon2.scaleX + 2;
        butCon2.addChild(buyTxt4);
        buyTxt3.y = butIcon2.y + butIcon2.height * butIcon2.scaleY / 2 - buyTxt3.height / 2;
        buyTxt4.y = butIcon2.y + butIcon2.height * butIcon2.scaleY / 2 - buyTxt4.height / 2;
        butCon1.x = drinkTeaBtn1.x + drinkTeaBtn1.width / 2 - butCon1.width / 2 + 10;
        butCon1.y = drinkTeaBtn1.y + drinkTeaBtn1.height + 5;
        butCon2.x = drinkTeaBtn10.x + drinkTeaBtn10.width / 2 - butCon2.width / 2 + 10;
        butCon2.y = butCon1.y;
        var numCon1 = new BaseDisplayObjectContainer();
        this.addChild(numCon1);
        var currNum1 = ComponentManager.getBitmapText("" + this.cfg.cost, "acblessingmammon_fnt");
        numCon1.addChild(currNum1);
        var icon1 = BaseBitmap.create("itemicon1");
        icon1.setScale(0.4);
        icon1.x = currNum1.x + currNum1.width + 2;
        icon1.y = currNum1.y + currNum1.height / 2 - icon1.height * icon1.scaleY / 2;
        numCon1.addChild(icon1);
        var numCon2 = new BaseDisplayObjectContainer();
        this.addChild(numCon2);
        var currNum2 = ComponentManager.getBitmapText("" + this.cfg.cost10, "acblessingmammon_fnt");
        numCon2.addChild(currNum2);
        var icon2 = BaseBitmap.create("itemicon1");
        icon2.setScale(0.4);
        icon2.x = currNum2.x + currNum2.width + 2;
        icon2.y = currNum2.y + currNum2.height / 2 - icon2.height * icon2.scaleY / 2;
        numCon2.addChild(icon2);
        numCon1.setScale(0.7);
        numCon2.setScale(0.7);
        numCon1.x = drinkTeaBtn1.x + drinkTeaBtn1.width / 2 - numCon1.width / 2 + 30;
        numCon2.x = drinkTeaBtn10.x + drinkTeaBtn10.width / 2 - numCon2.width / 2 + 30;
        numCon1.y = butCon1.y - numCon1.height * numCon1.scaleY + 10;
        numCon2.y = numCon1.y;
        this._numCon1 = numCon1;
        var freeLab = ComponentManager.getTextField(LanguageManager.getlocal("acskysound_freetxt"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        freeLab.x = drinkTeaBtn1.x + drinkTeaBtn1.width / 2 - freeLab.width / 2;
        freeLab.y = numCon1.y;
        this.addChild(freeLab);
        this._freeLab = freeLab;
        var bitong = BaseBitmap.create("acaskgod_bitong-" + typecode);
        bitong.x = GameConfig.stageWidth / 2 - bitong.width / 2;
        bitong.y = botbg.y - 290;
        this.addChild(bitong);
        this._bitong = bitong;
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        skinTxtEffect.width = 208;
        skinTxtEffect.height = 154;
        skinTxtEffect.setPosition(bitong.x + bitong.width / 2 - 104, bitong.y + bitong.height - 120);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        this.addChild(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        var skinTxt = BaseBitmap.create("acaskgod_rewardtxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
        this.addChild(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        var skinTxt1 = BaseBitmap.create("acaskgod_rewardtxt");
        skinTxt1.anchorOffsetX = skinTxt1.width / 2;
        skinTxt1.anchorOffsetY = skinTxt1.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt1, skinTxtEffect);
        this.addChild(skinTxt1);
        skinTxt1.blendMode = egret.BlendMode.ADD;
        skinTxt1.alpha = 0;
        egret.Tween.get(skinTxt1, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        skinTxt1.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACASKGODPREREWARDPOPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        this.freshView();
    };
    AcAskGodView.prototype.closeHandler = function () {
        if (this._isMove) {
            return;
        }
        this.hide();
    };
    AcAskGodView.prototype.freshView = function () {
        if (this._isShowEffect) {
            return;
        }
        this.freshFreeLab();
        this.freshRed();
        this.freshProImags();
        var exchangeNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.special.specialItem.split("_")[1]);
        var leftNum = this.cfg.special.specialLimit - this.vo.slimit;
        leftNum = leftNum < 0 ? 0 : leftNum;
        this._exchangeNumTxt.text = LanguageManager.getlocal("acSkyArmorExchangeNumTxt", ["" + exchangeNum, "" + leftNum]);
    };
    AcAskGodView.prototype.receiveData = function (data) {
        if (!data.ret) {
            this._isShowEffect = false;
            this.closeOpenTouch(true);
            App.CommonUtil.showTip(data.data.ret);
            return;
        }
    };
    AcAskGodView.prototype.attackCallback = function (event) {
        var rData = event.data.data.data;
        if (!event.data.ret) {
            this._isShowEffect = false;
            this.closeOpenTouch(true);
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        this._tempAwards = "";
        this._tempOtherAwards = "";
        this._awardsCountObj = {};
        if (rData.rewardsList && rData.rewardsList.length > 0) {
            for (var i = 0; i < rData.rewardsList.length; i++) {
                if (i == rData.rewardsList.length - 1) {
                    this._tempAwards += rData.rewardsList[i].dropRew;
                    this._tempOtherAwards += rData.rewardsList[i].oneReward;
                }
                else {
                    this._tempAwards += rData.rewardsList[i].dropRew + "|";
                    this._tempOtherAwards += rData.rewardsList[i].oneReward + "|";
                }
                var pool = this.cfg.basePool;
                for (var j = 0; j < pool.length; j++) {
                    if (pool[j][0] == rData.rewardsList[i].dropRew) {
                        if (this._awardsCountObj[pool[j][2]]) {
                            this._awardsCountObj[pool[j][2]]++;
                        }
                        else {
                            this._awardsCountObj[pool[j][2]] = 1;
                        }
                        break;
                    }
                }
            }
        }
        this.showEffect();
    };
    AcAskGodView.prototype.showEffect = function () {
        var _this = this;
        var b = false;
        var specialId = parseInt(this.cfg.special.specialItem.split("_")[1]);
        if (!b && (!Api.switchVoApi.checkCloseBone()) && App.CommonUtil.check_dragon()) {
            this._bitong.visible = false;
            if (!this._qiaojiEffect) {
                this._qiaojiEffect = App.DragonBonesUtil.getLoadDragonBones("qiuqianxuyuan", 1, "idle");
                this._qiaojiEffect.setPosition(GameConfig.stageWidth / 2 - 3, 1046 - (1136 - GameConfig.stageHeigth));
                this.addChildAt(this._qiaojiEffect, this.getChildIndex(this._bitong));
            }
            this._qiaojiEffect.visible = true;
            this._qiaojiEffect.playDragonMovie("idle", 1);
            this._qiaojiEffect.setDragonBoneEventListener(dragonBones.AnimationEvent.COMPLETE, function () {
                _this._qiaojiEffect.visible = false;
                _this._bitong.visible = true;
                if (_this._tempAwards) {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACASKGODREWARDPOPUPVIEW, { "specialId": specialId, "rewards": _this._tempAwards, "isPlayAni": true, "callback": null, "handler": null, otherRewards: _this._tempOtherAwards, isSameOtherAdd: true, isTen: _this._isTen, paramObj: _this._awardsCountObj });
                }
                _this.closeOpenTouch(true);
                _this._isShowEffect = false;
                _this.freshView();
            }, 1);
        }
        else {
            if (this._tempAwards) {
                ViewController.getInstance().openView(ViewConst.POPUP.ACASKGODREWARDPOPUPVIEW, { "specialId": specialId, "rewards": this._tempAwards, "isPlayAni": true, "callback": null, "handler": null, otherRewards: this._tempOtherAwards, isSameOtherAdd: true, isTen: this._isTen, paramObj: this._awardsCountObj });
            }
            this.closeOpenTouch(true);
            this._isShowEffect = false;
            this.freshView();
        }
    };
    AcAskGodView.prototype.freshProImags = function () {
        var curId = 10000;
        var curnum = this.vo.getAchieveNum();
        this._proNumTxt.text = LanguageManager.getlocal("acAskGod_pronumtxt", [String(curnum)]);
        var datas = this.vo.getSortAchievementCfg(false);
        for (var i = 0; i < this._imgsArr.length; i++) {
            if (this.vo.isGetAchievementById(String(datas[i].id))) {
                this._imgsArr[i].setRes("acaskgod_achicon2-" + this.typeCode);
                if (this._imgsArr[i]["eff"]) {
                    this._imgsArr[i]["eff"].dispose();
                    this._imgsArr[i]["eff"] = null;
                }
            }
            else {
                App.DisplayUtil.changeToNormal(this._imgsArr[i]);
                if (curnum >= datas[i].needNum) //可领取
                 {
                    if (!this._imgsArr[i]["eff"]) {
                        var effect = ComponentManager.getCustomMovieClip("askgodeff_", 15);
                        effect.width = 62;
                        effect.height = 208;
                        effect.x = this._imgsArr[i].x + this._imgsArr[i].width / 2 - effect.width / 2;
                        effect.y = this._imgsArr[i].y + this._imgsArr[i].height / 2 - effect.height / 2;
                        effect.playWithTime(-1);
                        this._proContainer.addChild(effect);
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
    AcAskGodView.prototype.closeOpenTouch = function (b) {
        this.touchChildren = b;
        this.touchEnabled = true;
    };
    AcAskGodView.prototype.drinkTeaBtnHandle1 = function () {
        this.drinkTeaBtnHandle(1);
    };
    AcAskGodView.prototype.drinkTeaBtnHandle10 = function () {
        this.drinkTeaBtnHandle(2);
    };
    AcAskGodView.prototype.drinkTeaBtnHandle = function (type) {
        if (!this.vo.isInActivity() || this.vo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        var cost = type == 1 ? this.cfg.cost : this.cfg.cost10;
        if (type == 1 && this.vo.isfree > 0) {
            cost = 0;
        }
        var have = Api.playerVoApi.getPlayerGem();
        if (have < cost) {
            var message = LanguageManager.getlocal("acAskGodConfirmDesc");
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
        this.request(NetRequestConst.REQUEST_ACASKGOD_DIVINE, {
            activeId: this.vo.aidAndCode,
            isFree: cost == 0 ? 1 : 0,
            isTenPlay: type == 1 ? 0 : 1
        });
    };
    AcAskGodView.prototype.freshFreeLab = function () {
        if (this.vo.isfree > 0) {
            this._freeLab.visible = true;
            this._numCon1.visible = false;
        }
        else {
            this._freeLab.visible = false;
            this._numCon1.visible = true;
        }
    };
    AcAskGodView.prototype.freshRed = function () {
        if (this.vo.showExchangeDot()) {
            App.CommonUtil.addIconToBDOC(this._exchangeBtn);
            var detailRed = this.getChildByName("reddot");
            if (detailRed) {
                // detailRed.setPosition(this._exchangeBtn.x+60, this._exchangeBtn.y);
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._exchangeBtn);
        }
    };
    AcAskGodView.prototype.tick = function () {
        this._timeCountTxt.setString(this.vo.getAcCountDown());
        this._timeCountTxt.x = this._timebg.x + this._timebg.width / 2 - this._timeCountTxt.width / 2;
        this._tickCount++;
        if (this._tickCount % 14 == 0) {
            this.showdenglong();
        }
    };
    AcAskGodView.prototype.showdenglong = function () {
        if (!this._denglongEff) {
            this._denglongEff = ComponentManager.getCustomMovieClip("askgodeff2_", 10);
            this._denglongEff.width = 100;
            this._denglongEff.height = 100;
            this._denglongEff.playWithTime(-1);
            this.addChildAt(this._denglongEff, this.getChildIndex(this.titleBg) - 1);
        }
        this._denglongEff.visible = true;
        this._denglongEff.x = this._exchangeBtn.x + this._exchangeBtn.width / 2 - this._denglongEff.width / 2;
        this._denglongEff.y = this._exchangeBtn.y;
        this._denglongFlag = true;
    };
    AcAskGodView.prototype.enterHandel = function () {
        this._skybg1.x -= this._speed1;
        this._skybg2.x -= this._speed1;
        if (this._skybg1.x <= -this._skybg1.width) {
            this.swapChildren(this._skybg1, this._skybg2);
            this._skybg1.x = this._skybg2.x + this._skybg2.width - 5;
        }
        if (this._skybg2.x <= -this._skybg2.width) {
            this.swapChildren(this._skybg1, this._skybg2);
            this._skybg2.x = this._skybg1.x + this._skybg1.width - 5;
        }
        if (this._denglongFlag) {
            this._denglongEff.y -= this._speed2;
            if (this._denglongEff.y < 0) {
                this._denglongEff.visible = false;
                this._denglongFlag = false;
            }
        }
    };
    AcAskGodView.prototype.getBonesResArr = function (name) {
        return [name + "_ske", name + "_tex_json", name + "_tex_png"];
    };
    //根据资源名字得到完整资源名字
    AcAskGodView.prototype.getDefaultRes = function (resName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (ResourceManager.hasRes(resName + "-" + this.code)) {
            return resName + "-" + this.code;
        }
        else {
            return resName + "-" + defaultCode;
        }
    };
    AcAskGodView.prototype.getDefaultResList = function (resArr) {
        var arr = [];
        for (var i = 0; i < resArr.length; i++) {
            var element = resArr[i];
            var defRes = this.getDefaultRes(element);
            arr.push(defRes);
        }
        return arr;
    };
    AcAskGodView.prototype.getResourceList = function () {
        var rewardArr = [
            "ac_skinoflibai_chargeitem_red", "ac_skinoflibai_chargeitem_green", "public_popupscrollitembg", "public_scrolllistbg", "progress5", "progress3_bg", "progress3", "collectflag", "ackite_processtitlebg-1", "ac_skinoflibai_poolrewardbg-1", "ackite_tasktitlebg-1", "ackite_skintopbg", "ackite_skintopline", "activity_charge_red", "destroysametaskbg", "servant_star",
            "skin_detail_namebg", "servantweaponshowbg", "specialview_commoni_namebg", "tailor_get_light",
            "acskysound_exchangebg", "dechuanchangearrow-1", "acblessingmammon_fnt", "itemicon1", "mainui_bubble"
        ];
        var eff1 = [];
        var arr = ["acaskgodcode" + this.typeCode, "itemicon" + this.cfg.getReward.split("_")[1]];
        var baseList = arr.concat(eff1);
        return _super.prototype.getResourceList.call(this).concat(baseList).concat(this.getBonesResArr("qiuqianxuyuan")).concat(rewardArr);
    };
    AcAskGodView.prototype.effectRes = function (name, num, b) {
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
    AcAskGodView.prototype.getProbablyInfo = function () {
        return "acAskGodProbablyInfo-" + this.typeCode;
    };
    AcAskGodView.prototype.getRuleBtnName = function () {
        return ButtonConst.BTN2_RULE;
    };
    AcAskGodView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACASKGOD_DIVINE, this.attackCallback, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterHandel, this);
        this._timeCountTxt = null;
        this._isShowEffect = false;
        this._freeLab = null;
        this._numCon1 = null;
        this._infobg = null;
        this._scrollView = null;
        this._proContainer = null;
        this._bitong = null;
        this._skybg1 = null;
        this._skybg2 = null;
        if (this._exchangeBtn) {
            this._exchangeBtn.dispose();
            this._exchangeBtn = null;
        }
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
        if (this._denglongEff) {
            this._denglongEff.dispose();
            this._denglongEff = null;
        }
        this._denglongFlag = false;
        this._tickCount = 0;
        this._isMove = false;
        _super.prototype.dispose.call(this);
    };
    return AcAskGodView;
}(AcCommonView));
//# sourceMappingURL=AcAskGodView.js.map