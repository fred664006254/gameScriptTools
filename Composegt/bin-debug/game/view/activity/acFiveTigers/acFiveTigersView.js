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
 * 五虎活动
 * @author hyd
 */
var AcFiveTigersView = (function (_super) {
    __extends(AcFiveTigersView, _super);
    function AcFiveTigersView() {
        var _this = _super.call(this) || this;
        _this._isShake = false;
        _this._isPlayAni = false;
        _this._rewards = null;
        _this._otherRewards = null;
        _this._showTip = null;
        _this._isWin = false;
        _this._skinContainer = null;
        _this._userItem = null;
        // 吕布的缩放值
        _this.lvbuScale = 0.9;
        // 吕布的x
        _this.lvbuX = 0;
        // 吕布的y
        _this.lvbuY = 0;
        return _this;
    }
    Object.defineProperty(AcFiveTigersView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcFiveTigersView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    // 标题背景名称
    AcFiveTigersView.prototype.getTitleBgName = function () {
        return this.getDefaultRes("fivetigers_titlebg", this.defcode);
    };
    AcFiveTigersView.prototype.getTitleStr = function () {
        return null;
    };
    Object.defineProperty(AcFiveTigersView.prototype, "activityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcFiveTigersView.prototype.initBg = function () {
        this._bigBg = new BaseDisplayObjectContainer();
        this._bigBg.height = 1136;
        this._bigBg.width = 640;
        this.addChild(this._bigBg);
        this._bigBg.touchEnabled = true;
        this._bigBg.y = GameConfig.stageHeigth - 1136;
        var bigBg = BaseLoadBitmap.create(this.getDefaultRes("fivetigers_bg", this.defcode));
        bigBg.height = 1156;
        bigBg.width = 660;
        bigBg.setPosition(-10, -10);
        this._bigBg.addChild(bigBg);
        this._enemy = BaseLoadBitmap.create(this.getDefaultRes("fivetigers_enemy", this.defcode));
        this._enemy.height = 384;
        this._enemy.width = 927;
        this._enemy.anchorOffsetX = this._enemy.width / 2;
        this._enemy.anchorOffsetY = this._enemy.height / 2;
        this._enemy.setPosition(this._bigBg.x + this._bigBg.width / 2, this._bigBg.height - 600);
        this._bigBg.addChild(this._enemy);
    };
    Object.defineProperty(AcFiveTigersView.prototype, "defcode", {
        get: function () {
            var defcode = this.code;
            return defcode;
        },
        enumerable: true,
        configurable: true
    });
    AcFiveTigersView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETFIVETIGERBOXREWARD, this.receiveBoxHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETFIVETIGERREWARD, this.getRewardHandler, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_FIVETIGERS_REFRESHVO, this.refreshData, this);
        var titletxt = BaseBitmap.create(this.getDefaultRes("fivetigers_titlename", this.defcode));
        titletxt.x = GameConfig.stageWidth / 2 - titletxt.width / 2;
        titletxt.y = 5;
        this.addChild(titletxt);
        this.lvbuNode = new BaseDisplayObjectContainer();
        this.lvbuNode.width = 640;
        this.lvbuNode.height = 482;
        this.lvbuNode.anchorOffsetX = 320;
        this.lvbuNode.setScale(this.lvbuScale);
        this.lvbuNode.x = 320;
        this.lvbuNode.y = GameConfig.stageHeigth - this.lvbuNode.height * this.lvbuScale;
        this.lvbuX = this.lvbuNode.x;
        this.lvbuY = this.lvbuNode.y;
        this.addChild(this.lvbuNode);
        // 五虎
        if (App.DeviceUtil.CheckWebglRenderMode() && App.CommonUtil.check_dragon()) {
            this.boneNode = App.DragonBonesUtil.getLoadDragonBones(Config.ServantskinCfg.getServantSkinItemById(this.cfg.servantSkinID).bone);
            this.boneNode.x = 320;
            this.boneNode.y = this.lvbuNode.height - 60;
            this.lvbuNode.addChild(this.boneNode);
            this.boneNode.setScale(0.65);
            var maskShape = BaseBitmap.create("public_9v_bg01");
            maskShape.width = 640;
            maskShape.height = 800;
            maskShape.x = this.lvbuNode.width / 2 - maskShape.width / 2;
            maskShape.y = this.lvbuNode.height - maskShape.height;
            this.lvbuNode.addChild(maskShape);
            this.boneNode.mask = maskShape;
        }
        else {
            this.lvbuImg = BaseLoadBitmap.create(Config.ServantskinCfg.getServantSkinItemById(this.cfg.servantSkinID).body);
            this.lvbuImg.width = 640;
            this.lvbuImg.height = 482;
            this.lvbuImg.setScale(0.8);
            this.lvbuImg.x = 320 - this.lvbuImg.width * 0.8 / 2;
            this.lvbuImg.y = this.lvbuNode.height - this.lvbuImg.height * 0.8 - 70;
            this.lvbuNode.addChild(this.lvbuImg);
        }
        if (App.DeviceUtil.CheckWebglRenderMode() && App.CommonUtil.check_dragon()) {
            this._userItem = App.DragonBonesUtil.getLoadDragonBones("baimazhizhan");
            this._userItem.x = 0;
            this._userItem.y = GameConfig.stageHeigth + 100;
            this.addChild(this._userItem);
        }
        //活动规则背景图片
        var acruleTxtBg = BaseBitmap.create(this.getDefaultRes("fivetigers_descbg", this.defcode));
        acruleTxtBg.y = this.titleBg.height;
        this.addChild(acruleTxtBg);
        //活动时间   
        var actimeText = ComponentManager.getTextField(this.vo.acTimeAndHour, 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        actimeText.x = 10;
        actimeText.y = acruleTxtBg.y + 5;
        this.addChild(actimeText);
        //剩余时间
        this.acCdTxt = ComponentManager.getTextField(this.vo.acCountDown, 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.acCdTxt.x = GameConfig.stageWidth - 10 - this.acCdTxt.width;
        this.acCdTxt.y = actimeText.y;
        this.addChild(this.acCdTxt);
        //活动规则文本
        var acruleTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acFiveTigers_desc"), [String(this.cfg.cost), "1", String(this.cfg.exchangeNum)]), 18);
        acruleTxt.width = 620;
        acruleTxt.lineSpacing = 5;
        acruleTxt.x = actimeText.x;
        acruleTxt.y = actimeText.y + actimeText.height + 5;
        this.addChild(acruleTxt);
        this.numBg = BaseBitmap.create(this.getDefaultRes("fivetigers_progresshead", this.defcode));
        // 血条
        this.bloodBar = ComponentManager.getProgressBar("fivetigers_progresscontent", "fivetigers_progressbg", 500);
        this.bloodBar.x = GameConfig.stageWidth / 2 - this.bloodBar.width / 2 + this.numBg.width / 2 - 10;
        this.bloodBar.y = acruleTxtBg.y + acruleTxtBg.height + 30;
        this.bloodBar.y = acruleTxtBg.y + acruleTxtBg.height + 30;
        this.addChild(this.bloodBar);
        //已经攻击次数
        this.numBg.x = this.bloodBar.x - this.numBg.width + 15;
        this.addChild(this.numBg);
        this.numBg.y = this.bloodBar.y + this.bloodBar.height / 2 - this.numBg.height / 2 - 2;
        this.numText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acFiveTigers_progresstitle", this.defcode), [String(this.vo.lotterysnum)]), 18, 0xffedb4);
        this.numText.textAlign = egret.HorizontalAlign.CENTER;
        this.numText.lineSpacing = 7;
        this.numText.x = this.numBg.x + this.numBg.width / 2 - this.numText.width / 2;
        this.numText.y = this.numBg.y + this.numBg.height / 2 - this.numText.height / 2;
        this.addChild(this.numText);
        this.initBox();
        this._skinContainer = new BaseDisplayObjectContainer();
        this.addChild(this._skinContainer);
        // 底部背景
        var buttomBg = BaseBitmap.create("fivetigers_bottombg");
        buttomBg.y = GameConfig.stageHeigth - buttomBg.height;
        this.addChild(buttomBg);
        // 攻击
        this.atkButton = ComponentManager.getButton("acredlotuswarrior_btn-1", null, this.atkClick, this);
        this.atkButton.y = buttomBg.y + buttomBg.height - this.atkButton.height - 27;
        this.addChild(this.atkButton);
        this.atkButton.x = buttomBg.x + buttomBg.width / 2 - this.atkButton.width / 2;
        this.btnText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acFiveTigers_btn")), 30, TextFieldConst.COLOR_BROWN);
        this.btnText.x = this.atkButton.x + this.atkButton.width / 2 - this.btnText.width / 2;
        this.btnText.y = this.atkButton.y + this.atkButton.height / 2 - this.btnText.height / 2;
        this.addChild(this.btnText);
        //可攻击次数
        this.atkCountTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acFiveTigers_atkvalue"), [String(this.vo.lotterynum)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.atkCountTxt.x = this.atkButton.x + this.atkButton.width / 2 - this.atkCountTxt.width / 2;
        this.atkCountTxt.y = this.btnText.y + this.btnText.height + 27;
        this.addChild(this.atkCountTxt);
        var btnBg = BaseBitmap.create("mainui_bottombtnbg");
        btnBg.setPosition(GameConfig.stageWidth - btnBg.width - 10, GameConfig.stageHeigth - btnBg.height - 100);
        this.addChild(btnBg);
        var infoBtn = ComponentManager.getButton("chasebandit_showbtn-1", null, this.infoBtnListener, this);
        infoBtn.x = btnBg.x + btnBg.width / 2 - infoBtn.width / 2;
        infoBtn.y = btnBg.y + btnBg.height / 2 - infoBtn.height / 2;
        this.addChild(infoBtn);
        var infoTxt = BaseBitmap.create("moonnight_showbtntxt-1");
        infoTxt.x = infoBtn.x + infoBtn.width / 2 - infoTxt.width / 2 + 2;
        infoTxt.y = infoBtn.y + 50;
        this.addChild(infoTxt);
        this.refreshData();
        this.checkIsWin();
        this.randomSay();
        if (this.vo.lotterysnum < this.cfg.exchangeNum) {
            ViewController.getInstance().openView(ViewConst.POPUP.ACFIVETIGERSREPORTVIEW, { aid: this.aid, code: this.code });
        }
    };
    AcFiveTigersView.prototype.attackHandle = function () {
        var _this = this;
        var moveTime1 = 150;
        var moveTime2 = 150;
        var scaleTo = 0.3;
        var moveX = this.lvbuNode.x + this.lvbuNode.width / 2 - this.lvbuNode.width * 0.85 / 2;
        var moveY = GameConfig.stageHeigth - 600;
        var moveTo = egret.Point.create(moveX, moveY);
        egret.Tween.get(this.lvbuNode)
            .to({ y: moveTo.y, scaleX: scaleTo, scaleY: scaleTo, }, moveTime1, egret.Ease.backIn) //elasticInOut
            .call(function () {
            _this.showCode7Ani();
        }, this)
            .wait(50)
            .call(this.playShake, this)
            .to({ x: this.lvbuX, y: this.lvbuY, scaleX: this.lvbuScale, scaleY: this.lvbuScale }, moveTime2, egret.Ease.sineOut)
            .wait(500)
            .call(this.stopShake, this)
            .call(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
                "rewards": _this._rewards,
                "otherRewards": _this._otherRewards,
                "isPlayAni": true,
                showTip: _this._showTip
            });
        }, this);
    };
    AcFiveTigersView.prototype.randomSay = function () {
        if (this.vo.lotterysnum < this.cfg.exchangeNum) {
            var self_1 = this;
            var rndSay = Math.floor(Math.random() * 5) + 1;
            var rndSayBg_1 = BaseBitmap.create("childview_talkbg");
            var txtCn = this.getDefaultCn("acFiveTigers_talk" + rndSay, this.defcode);
            var rndSayTxt_1 = ComponentManager.getTextField(LanguageManager.getlocal(txtCn), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            rndSayTxt_1.width = 220;
            rndSayBg_1.width = rndSayTxt_1.width + 30;
            rndSayBg_1.height = rndSayTxt_1.height + 30;
            rndSayBg_1.x = 140 - rndSayBg_1.width / 2;
            rndSayBg_1.y = GameConfig.stageHeigth - 420 - rndSayBg_1.height / 2;
            self_1.addChild(rndSayBg_1);
            rndSayTxt_1.x = rndSayBg_1.x + rndSayBg_1.scaleX * rndSayBg_1.width / 2 - rndSayTxt_1.width / 2;
            rndSayTxt_1.y = rndSayBg_1.y + 20;
            self_1.addChild(rndSayTxt_1);
            egret.Tween.get(rndSayBg_1)
                .wait(2000)
                .call(function () {
                rndSayBg_1.visible = false;
                rndSayTxt_1.visible = false;
            })
                .wait(5000)
                .call(function () {
                self_1.randomSay();
                if (rndSayBg_1) {
                    self_1.removeChild(rndSayBg_1);
                }
                if (rndSayTxt_1) {
                    self_1.removeChild(rndSayTxt_1);
                }
            });
        }
    };
    AcFiveTigersView.prototype.getSoundBgName = function () {
        return SoundConst.MUSIC_ALLIANCEBOSSBATTLE;
    };
    AcFiveTigersView.prototype.checkIsWin = function () {
        var isWin = false;
        if (this.vo.lotterysnum >= this.cfg.exchangeNum) {
            isWin = true;
        }
        if (!this._isWin && isWin) {
            this._isWin = true;
            this.atkButton.setEnable(false);
            this.btnText.text = LanguageManager.getlocal(this.getDefaultCn("acFiveTigers_btn"));
            this.btnText.x = this.atkButton.x + this.atkButton.width / 2 - this.btnText.width / 2;
            this.btnText.y = this.atkButton.y + this.atkButton.height / 2 - this.btnText.height / 2;
            App.DisplayUtil.changeToGray(this.btnText);
            this.atkCountTxt.visible = false;
            this._enemy.visible = false;
        }
    };
    AcFiveTigersView.prototype.playShake = function () {
        var _this = this;
        if (this._isShake) {
            return;
        }
        this._isShake = true;
        var posX = this.x;
        var posY = this.y;
        egret.Tween.get(this._bigBg, { loop: true }).call(function () {
            var randomX = 10 * Math.random() - 5;
            var randomY = 10 * Math.random() - 5;
            _this.x = posX + randomX;
            _this.y = posY + randomY;
        }, this).wait(20);
    };
    AcFiveTigersView.prototype.stopShake = function () {
        this._isShake = false;
        this.x = 0;
        this.y = 0;
        egret.Tween.removeTweens(this._bigBg);
    };
    /**
     * 宝箱的返回数据
     */
    AcFiveTigersView.prototype.receiveBoxHandle = function (event) {
        var ret = event.data.ret;
        var data = event.data.data.data;
        if (ret) {
            var rewards = data.rewards;
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "isPlayAni": true });
            this.refreshData();
        }
    };
    //进度条物品箱
    AcFiveTigersView.prototype.initBox = function () {
        var _this = this;
        var max = this.vo.maxHelmetNeedNum();
        var helmetNum = this.cfg.progress;
        var _loop_1 = function (i) {
            var helmetObj = helmetNum[i];
            var str = '';
            var flagObj = new BaseDisplayObjectContainer();
            flagObj.width = 58;
            flagObj.height = 58;
            flagObj.name = "flag" + i;
            flagObj.x = this_1.bloodBar.x + this_1.bloodBar.width * (helmetObj.needNum / max) - flagObj.width / 2 - 5;
            flagObj.y = this_1.bloodBar.y + this_1.bloodBar.height / 2 - flagObj.height / 2 + 5;
            this_1.addChild(flagObj);
            var flagBg = BaseBitmap.create("acredlotuswarrior_flagbg-1");
            flagBg.x = 0;
            flagBg.y = 0;
            flagBg.name = "flagBg";
            flagObj.addChild(flagBg);
            flagBg.visible = false;
            flagObj["light"] = BaseBitmap.create("dailytask_box_light");
            flagObj["light"].anchorOffsetX = flagObj["light"].width / 2;
            flagObj["light"].anchorOffsetY = flagObj["light"].height / 2;
            flagObj["light"].x = flagObj.width / 2;
            flagObj["light"].y = flagObj.height / 2 - 5;
            flagObj.addChild(flagObj["light"]);
            flagObj["flag"] = BaseBitmap.create(this_1.getDefaultRes("fivetigers_flag1", this_1.defcode));
            flagObj["flag"].x = flagObj.width / 2 - flagObj["flag"].width / 2;
            flagObj["flag"].y = flagObj.height / 2 - flagObj["flag"].height / 2;
            flagObj["flag"].name = "flag";
            flagObj["flag"].scaleX = 0.8;
            flagObj["flag"].scaleY = 0.8;
            flagObj["flag"].x = flagObj.width / 2 - flagObj["flag"].width * 0.8 / 2;
            flagObj["flag"].y = flagObj.height / 2 - flagObj["flag"].height * 0.8 / 2 - 10;
            flagObj.addChild(flagObj["flag"]);
            flagObj["flagbreak"] = BaseBitmap.create(this_1.getDefaultRes("fivetigers_flagbreak", this_1.defcode));
            flagObj["flagbreak"].x = flagObj.width / 2 - flagObj["flagbreak"].width / 2;
            flagObj["flagbreak"].y = flagObj.height / 2 - flagObj["flagbreak"].height / 2;
            flagObj["flagbreak"].name = "flagbreak";
            flagObj.addChild(flagObj["flagbreak"]);
            flagObj["flagbreak"].scaleX = 0.8;
            flagObj["flagbreak"].scaleY = 0.8;
            flagObj["flagbreak"].x = flagObj.width / 2 - flagObj["flagbreak"].width * 0.8 / 2;
            flagObj["flagbreak"].y = flagObj.height / 2 - flagObj["flagbreak"].height * 0.8 / 2 - 10;
            if (this_1.vo.checkBoxCollected(i)) {
                //已经领取了
                flagObj["light"].visible = false;
                egret.Tween.removeTweens(flagObj["light"]);
                flagObj["flag"].visible = false;
                flagObj["flagbreak"].visible = true;
            }
            else {
                if (this_1.vo.lotterysnum >= helmetObj.needNum) {
                    flagObj["light"].visible = true;
                    flagObj["flag"].setRes(this_1.getDefaultRes("fivetigers_flag2", this_1.defcode));
                    egret.Tween.get(flagObj["light"], { loop: true }).to({ rotation: flagObj["light"].rotation + 360 }, 10000);
                }
                else {
                    flagObj["flag"].setRes(this_1.getDefaultRes("fivetigers_flag1", this_1.defcode));
                    egret.Tween.removeTweens(flagObj["light"]);
                    flagObj["light"].visible = false;
                }
                flagObj["flag"].visible = true;
                flagObj["flagbreak"].visible = false;
            }
            var curidx = i;
            flagObj.addTouchTap(function () {
                if (!_this.vo.isInActivity()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                    return;
                }
                var voNum = _this.vo.lotterysnum;
                var isRevice = _this.vo.checkBoxCollected(curidx);
                var needNum = helmetObj.needNum;
                if (needNum <= voNum) {
                    if (!isRevice) {
                        NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETFIVETIGERBOXREWARD, { activeId: _this.activityId, gid: curidx + 1 });
                        return;
                    }
                }
                var rewardList = helmetObj.getReward;
                var itemcfg = {
                    needNum: helmetObj.needNum,
                    getReward: helmetObj.getReward
                };
                ViewController.getInstance().openView(ViewConst.POPUP.ACFIVETIGERSREWARDINFOPOPUPVIEW, { "code": _this.code, "aid": _this.aid, "itemCfg": itemcfg });
            }, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < helmetNum.length; i++) {
            _loop_1(i);
        }
    };
    AcFiveTigersView.prototype.infoBtnListener = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.SERVANTSKINCHANGEVIEW, { servantId: this.cfg.servantID, skinId: this.cfg.servantSkinID, isDisplay: true });
    };
    AcFiveTigersView.prototype.tick = function () {
        this.acCdTxt.text = this.vo.acCountDown;
        this.acCdTxt.x = GameConfig.stageWidth - 10 - this.acCdTxt.width;
        // if(this.vo.acCountDown[this.vo.acCountDown.length-2] == "0"){
        //     this.attackHandle();
        // }
    };
    // 刷新数据
    AcFiveTigersView.prototype.refreshData = function () {
        var helmetNum = this.cfg.progress;
        this.atkCountTxt.text = LanguageManager.getlocal(this.getDefaultCn("acFiveTigers_atkvalue"), [String(this.vo.lotterynum)]);
        if (this.vo.lotterynum >= 10) {
            this.btnText.text = LanguageManager.getlocal(this.getDefaultCn("acFiveTigers_btnten"));
        }
        else {
            this.btnText.text = LanguageManager.getlocal(this.getDefaultCn("acFiveTigers_btn"));
        }
        this.btnText.x = this.atkButton.x + this.atkButton.width / 2 - this.btnText.width / 2;
        this.atkCountTxt.x = this.atkButton.x + this.atkButton.width / 2 - this.atkCountTxt.width / 2;
        this.bloodBar.setPercentage(this.vo.lotterysnum / this.cfg.exchangeNum);
        for (var i = 0; i < helmetNum.length; i++) {
            var flagObj = this.getChildByName("flag" + i);
            if (this.vo.checkBoxCollected(i)) {
                flagObj["light"].visible = false;
                egret.Tween.removeTweens(flagObj["light"]);
                flagObj["flag"].visible = false;
                flagObj["flagbreak"].visible = true;
            }
            else {
                if (this.vo.lotterysnum >= helmetNum[i].needNum) {
                    flagObj["flag"].setRes(this.getDefaultRes("fivetigers_flag2", this.defcode));
                    flagObj["light"].visible = true;
                    egret.Tween.get(flagObj["light"], { loop: true }).to({ rotation: flagObj["light"].rotation + 360 }, 10000);
                }
                else {
                    flagObj["flag"].setRes(this.getDefaultRes("fivetigers_flag1", this.defcode));
                    egret.Tween.removeTweens(flagObj["light"]);
                    flagObj["light"].visible = false;
                }
                flagObj["flag"].visible = true;
                flagObj["flagbreak"].visible = false;
            }
        }
        this.numText.text = LanguageManager.getlocal(this.getDefaultCn("acFiveTigers_progresstitle", this.defcode), [String(this.vo.lotterysnum)]);
        this.numText.x = this.numBg.x + this.numBg.width / 2 - this.numText.width / 2;
    };
    AcFiveTigersView.prototype.atkClick = function () {
        if (this._isPlayAni) {
            return;
        }
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        //已经胜利了
        if (this.vo.lotterysnum >= this.cfg.exchangeNum) {
            App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acFiveTigers_win")));
            return;
        }
        if (this.vo.lotterynum <= 0) {
            var message = LanguageManager.getlocal(this.getDefaultCn("acFiveTigers_countnotenough"), ["" + this.cfg.cost]);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: message,
                callback: function () {
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                },
                handler: this,
                needCancel: true
            });
            return;
        }
        this._isPlayAni = true;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETFIVETIGERREWARD, { activeId: this.aid + "-" + this.code });
    };
    // 获得奖励
    AcFiveTigersView.prototype.getRewardHandler = function (event) {
        if (event.data.data.cmd === NetRequestConst.REQUEST_ACTIVITY2S_GETFIVETIGERREWARD) {
            if (event.data.data.ret === 0) {
                var data = event.data.data.data;
                this._rewards = data.rewards;
                this._otherRewards = data.otherrewards;
                this._showTip = null;
                this.attackHandle();
                this.checkIsWin();
            }
            else {
                App.CommonUtil.showTip(event.data.data.ret);
            }
        }
    };
    AcFiveTigersView.prototype.showCode7Ani = function () {
        var _this = this;
        egret.Tween.get(this._enemy).to({ alpha: 0 }, 800, egret.Ease.sineIn);
        if (this._userItem) {
            this._userItem.playDragonMovie("attack", 1);
            this._effectCount = 1;
            // this._userItem.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, () => {
            //     if(this._effectCount) return;
            // }, this);
        }
        setTimeout(function () {
            egret.Tween.get(_this._enemy).to({ alpha: 1 }, 800, egret.Ease.sineIn)
                .call(function () {
                _this._isPlayAni = false;
            });
            if (_this._userItem) {
                _this._userItem.playDragonMovie('appear', 1);
                _this._effectCount = 0;
            }
        }, 2000);
    };
    AcFiveTigersView.prototype.getResourceList = function () {
        var resTab = [];
        resTab = [
            "fivetigers_bottombg",
            "fivetigers_progresscontent",
            "fivetigers_progressbg",
            "acredlotuswarrior_sermask",
            "chasebandit_showbtn-1",
            "moonnight_showbtntxt-1",
            "dailytask_box_light",
            "acredlotuswarrior_flagbg-1",
            "acredlotuswarrior_btn-1",
            "childview_talkbg"
        ];
        return _super.prototype.getResourceList.call(this).concat([
            this.getDefaultRes("fivetigers_titlename", this.defcode),
            this.getDefaultRes("fivetigers_titlebg", this.defcode),
            this.getDefaultRes("fivetigers_progresshead", this.defcode),
            this.getDefaultRes("fivetigers_descbg", this.defcode),
            this.getDefaultRes("fivetigers_enemy", this.defcode),
            this.getDefaultRes("fivetigers_flag1", this.defcode),
            this.getDefaultRes("fivetigers_flag2", this.defcode),
            this.getDefaultRes("fivetigers_flagbreak", this.defcode),
        ]).concat(resTab);
    };
    AcFiveTigersView.prototype.hide = function () {
        if (!this._isPlayAni) {
            _super.prototype.hide.call(this);
        }
    };
    AcFiveTigersView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETFIVETIGERBOXREWARD, this.receiveBoxHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETFIVETIGERREWARD, this.getRewardHandler, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FIVETIGERS_REFRESHVO, this.refreshData, this);
        this.bloodBar = null;
        this.acCdTxt = null;
        this.atkButton = null;
        this.numBg = null;
        this.numText = null;
        this.atkCountTxt = null;
        this.btnText = null;
        this._bigBg = null;
        this._isShake = false;
        this._isPlayAni = false;
        this._rewards = null;
        this._otherRewards = null;
        this._showTip = null;
        this._isWin = false;
        this._skinContainer = null;
        this._userItem = null;
        // 吕布容器
        if (this.lvbuNode) {
            egret.Tween.removeTweens(this.lvbuNode);
        }
        this.lvbuNode = null;
        this.boneNode = null;
        this.lvbuImg = null;
        if (this._enemy) {
            egret.Tween.removeTweens(this._enemy);
        }
        this._enemy = null;
        // 吕布的x
        this.lvbuX = 0;
        // 吕布的y
        this.lvbuY = 0;
        this._effectCount = 0;
        _super.prototype.dispose.call(this);
    };
    return AcFiveTigersView;
}(AcCommonView));
__reflect(AcFiveTigersView.prototype, "AcFiveTigersView");
