/**
 * 绝对擂台 缉捕
 * author qianjun
 * @class AtkraceArrestView
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
var AcBattleGroundArrestView = (function (_super) {
    __extends(AcBattleGroundArrestView, _super);
    function AcBattleGroundArrestView() {
        var _this = _super.call(this) || this;
        _this._servantInfoArray = [];
        _this._isShowBuy = false;
        return _this;
    }
    Object.defineProperty(AcBattleGroundArrestView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundArrestView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundArrestView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundArrestView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundArrestView.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcBattleGroundArrestView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkrace_arrest_bg", "atkrace_enemy_bg", "atkrace_my_bg", "atkrace_name_bg",
            "atkrace_one_key", "atkrace_temp_property", "atkrace_text_bg", "atkrace_vs", "progress7_bg", "progress8",
            "signin_had_get", "atkrace_morale"
        ]);
    };
    AcBattleGroundArrestView.prototype.getTitleStr = function () {
        return "acBattleGroundArrestTitle-" + this.getUiCode();
    };
    AcBattleGroundArrestView.prototype.initView = function () {
        this.container.y = this.getTitleButtomY();
        var containerHeight = GameConfig.stageHeigth - this.container.y;
        //中间的对战
        var middleBg = BaseBitmap.create("atkrace_arrest_bg");
        middleBg.y = containerHeight / 2 - middleBg.height / 2;
        this.addChildToContainer(middleBg);
        var middleVs = BaseBitmap.create("atkrace_vs");
        middleVs.setPosition(GameConfig.stageWidth / 2 - middleVs.height / 2 + 41, containerHeight / 2 - middleVs.height / 2);
        this.addChildToContainer(middleVs);
        var myAtkInfo = this.vo.getMyFightInfo();
        //顶部敌人信息
        var topBg = BaseBitmap.create("atkrace_enemy_bg");
        this.addChildToContainer(topBg);
        this._scoreText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._scoreText.setPosition(22, 22);
        this.addChildToContainer(this._scoreText);
        var curcount = Object.keys(myAtkInfo.sids).length;
        var total = myAtkInfo.total;
        this._servantCount = ComponentManager.getTextField(LanguageManager.getlocal("servant_count") + "(" + curcount + "/" + total + ")", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._servantCount.setPosition(GameConfig.stageWidth - this._servantCount.width - 22, this._scoreText.y);
        this.addChildToContainer(this._servantCount);
        //门客形象
        this.resetServantInfo();
        var tempProperty = ComponentManager.getButton("atkrace_text_bg", null, this.tempPropertyClick, this);
        tempProperty.setPosition(19, 295);
        this.addChildToContainer(tempProperty);
        var tempPropertyText = BaseBitmap.create("atkrace_temp_property");
        tempPropertyText.setPosition(tempProperty.width / 2 - tempPropertyText.width / 2, tempProperty.height / 2 - tempPropertyText.height / 2);
        tempProperty.addChild(tempPropertyText);
        // let oneKey:BaseButton = ComponentManager.getButton("atkrace_text_bg",null,this.oneKeyClick,this);
        // oneKey.setPosition(GameConfig.stageWidth - tempProperty.x - oneKey.width,tempProperty.y);
        // this.addChildToContainer(oneKey);
        // let oneKeyText = BaseBitmap.create("atkrace_one_key");
        // oneKeyText.setPosition(oneKey.width/2 - oneKeyText.width/2, oneKey.height/2 - oneKeyText.height/2)
        // oneKey.addChild(oneKeyText);
        //底部我方信息
        var bottomBg = BaseBitmap.create("atkrace_my_bg");
        bottomBg.y = containerHeight - bottomBg.height;
        this.addChildToContainer(bottomBg);
        var nameBg = BaseBitmap.create("atkrace_name_bg");
        nameBg.width = 270;
        nameBg.height = 35;
        nameBg.setPosition(320, bottomBg.y + 23);
        this.addChildToContainer(nameBg);
        var myInfo = myAtkInfo.mesid;
        this._playerScore = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_score", [Api.playerVoApi.getPlayerName(), this.vo.getPoint().toString()]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._playerScore.setPosition(345, nameBg.y + nameBg.height / 2 - this._playerScore.height / 2);
        this.addChildToContainer(this._playerScore);
        var servantName = LanguageManager.getlocal("servant_name" + myInfo.sid);
        var servantLv = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_level", [servantName, myInfo.lv.toString()]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        servantLv.setPosition(this._playerScore.x, this._playerScore.y + 50);
        this.addChildToContainer(servantLv);
        var infoDesc1 = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_1"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        infoDesc1.setPosition(this._playerScore.x, servantLv.y + 40);
        this.addChildToContainer(infoDesc1);
        var infoDesc2 = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_2"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        infoDesc2.setPosition(this._playerScore.x, infoDesc1.y + 35);
        this.addChildToContainer(infoDesc2);
        var infoDesc3 = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_3"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        infoDesc3.setPosition(this._playerScore.x, infoDesc2.y + 35);
        this.addChildToContainer(infoDesc3);
        this._infoText1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        this._infoText1.setPosition(infoDesc1.x + infoDesc1.width, infoDesc1.y);
        this.addChildToContainer(this._infoText1);
        this._infoText2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, this._infoText1.textColor);
        this._infoText2.setPosition(infoDesc2.x + infoDesc2.width, infoDesc2.y);
        this.addChildToContainer(this._infoText2);
        this._infoText3 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, this._infoText1.textColor);
        this._infoText3.setPosition(infoDesc3.x + infoDesc3.width, infoDesc3.y);
        this.addChildToContainer(this._infoText3);
        this._decreeAddTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this._decreeAddTxt.setPosition(infoDesc3.x, infoDesc3.y + 35);
        this.addChildToContainer(this._decreeAddTxt);
        var ishelp = myAtkInfo.support == 1;
        var downPic = "";
        if (ishelp) {
            downPic = Config.ServantCfg.getServantItemById(myInfo.sid).fullIcon;
            if (myInfo.equip && myInfo.equip != "") {
                downPic = "skin_full_" + myInfo.equip;
            }
        }
        else {
            downPic = Api.servantVoApi.getFullImgPathWithId(myInfo.sid);
        }
        var servantFullImg = BaseLoadBitmap.create(downPic);
        servantFullImg.width = 405 * 0.8;
        servantFullImg.height = 467 * 0.8;
        servantFullImg.y = containerHeight - servantFullImg.height - 25;
        this.addChildToContainer(servantFullImg);
        this._progressBar = ComponentManager.getProgressBar("progress8", "progress7_bg", GameConfig.stageWidth);
        this._progressBar.y = containerHeight - this._progressBar.height;
        this.addChildToContainer(this._progressBar);
        if (Api.switchVoApi.checkAutoAtkrace()) {
            if (Api.playerVoApi.getPlayerVipLevel() < 6) {
                var reachText = ComponentManager.getTextField(LanguageManager.getlocal("autoAtkraceLock"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
                reachText.setPosition(GameConfig.stageWidth - reachText.width - 20, bottomBg.y - reachText.height - 20);
                var blackBgRect = BaseBitmap.create("public_itemtipbg");
                blackBgRect.scaleX = -1;
                blackBgRect.width = reachText.width + 55;
                blackBgRect.height = 36;
                blackBgRect.x = GameConfig.stageWidth;
                blackBgRect.y = reachText.y - 7;
                this.addChildToContainer(blackBgRect);
                this.addChildToContainer(reachText);
            }
            else {
                var autoFight = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "autoAtkrace", this.oneKeyClick, this);
                autoFight.setPosition(GameConfig.stageWidth - autoFight.width - 20, bottomBg.y - 20 - autoFight.height);
                this.addChildToContainer(autoFight);
            }
        }
        this.resetInfoText();
    };
    AcBattleGroundArrestView.prototype.resetServantInfo = function () {
        if (this._servantInfoArray.length > 0) {
            for (var k in this._servantInfoArray) {
                this._servantInfoArray[k].dispose();
            }
            this._servantInfoArray.length = 0;
        }
        var index = 0;
        var myAtkInfo = this.vo.getMyFightInfo();
        for (var key in myAtkInfo.fids) {
            var container = new BaseDisplayObjectContainer();
            this.addChildToContainer(container);
            this._servantInfoArray.push(container);
            var tmpCfg = Config.ServantCfg.getServantItemById(key);
            var sinfo = myAtkInfo.fids[key];
            var res = "";
            if (sinfo.equip && sinfo.equip != "") {
                res = "skin_half_" + sinfo.equip;
            }
            else {
                res = tmpCfg.halfIcon;
            }
            var cardbg = BaseLoadBitmap.create("servant_cardbg_" + sinfo.clv);
            cardbg.width = 194;
            cardbg.height = 192;
            cardbg.setPosition(15 + (cardbg.width + 14) * index, 62);
            container.addChild(cardbg);
            index++;
            cardbg.addTouchTap(this.vsClick, this, [key]);
            var servantImg = BaseLoadBitmap.create(res);
            servantImg.width = 180;
            servantImg.height = 177;
            servantImg.x = cardbg.x + cardbg.width / 2 - servantImg.width / 2;
            servantImg.y = cardbg.y + cardbg.height / 2 - servantImg.height / 2 - 2;
            container.addChild(servantImg);
        }
    };
    AcBattleGroundArrestView.prototype.resetInfoText = function () {
        var myAtkInfo = this.vo.getMyFightInfo();
        var myInfo = myAtkInfo.mesid;
        if (!myInfo) {
            return;
        }
        this._infoText1.text = myInfo.ability.toString();
        var tmpatt = myAtkInfo.tmpattr;
        var atkAdd = 0;
        var skillAdd = 0;
        if (tmpatt) {
            if (tmpatt.atk) {
                atkAdd = Math.floor(tmpatt.atk * 100);
            }
            if (tmpatt.skill) {
                skillAdd = Math.floor(tmpatt.skill * 100);
            }
        }
        this._infoText2.text = atkAdd.toString() + "%";
        this._infoText3.text = skillAdd.toString() + "%";
        var total = myAtkInfo.total;
        var curcount = total - myAtkInfo.fightnum;
        this._servantCount.text = LanguageManager.getlocal("servant_count") + "(" + curcount + "/" + total + ")";
        var nameStr = myAtkInfo.fname;
        if (myAtkInfo.uid == "robot") {
            nameStr = LanguageManager.getlocal("atkRaceRobotName" + myAtkInfo.fname);
        }
        this._scoreText.text = LanguageManager.getlocal("atkrace_score", [nameStr, myAtkInfo.fpoint.toString()]);
        var attrValue = Math.ceil(myInfo.attr);
        this._progressBar.setText(String(attrValue) + "/" + myInfo.fullattr);
        this._progressBar.setPercentage(myInfo.attr / myInfo.fullattr);
        this._playerScore.text = LanguageManager.getlocal("atkrace_score", [Api.playerVoApi.getPlayerName(), this.vo.getPoint().toString()]);
        var addInfo = this.vo.getDecreePolicyAddAttrInfo();
        if (addInfo) {
            if (addInfo.lastTimes > 0) {
                var textc = this._infoText1.textColor;
                var addV = App.StringUtil.changeIntToText(Math.floor(addInfo.addExtent * 100)) + "%";
                var addVStr = "<font color=" + textc + ">" + addV + "</font>";
                this._decreeAddTxt.text = LanguageManager.getlocal(addInfo.strKey, [addInfo.strKey2, addVStr]);
            }
            else {
                this._decreeAddTxt.text = "";
            }
        }
    };
    //临时属性
    AcBattleGroundArrestView.prototype.tempPropertyClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDBUYPOPUPVIEW, {
            f: this.resetInfoText,
            o: this,
            aid: this.aid,
            code: this.code
        });
    };
    //一键缉捕
    AcBattleGroundArrestView.prototype.oneKeyClick = function () {
        if (!this.vo.getAttendQuality()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acBattleRoundNoAttend-" + this.getUiCode()));
            return;
        }
        if (this.vo.isActyEnd()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
            return;
        }
        if (this.vo.getCurperiod() == 3) {
            App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime4"));
            return;
        }
        //每轮结束前x分钟，不允许玩家点击一键挑战，x分数读数值配置
        if (this.vo.getCountCD() <= this.cfg.disableTime * 60) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acBattleGroundTip5-" + this.getUiCode(), [this.cfg.disableTime.toString()]));
            return;
        }
        //test code
        // ViewController.getInstance().openView(ViewConst.BATTLE.ATKRACEBATTLEVIEW,{f:this.resetInfoText,o:this});
        // ViewController.getInstance().openView(ViewConst.BASE.BATTLEWIN,{f:this.oneKeyClick,o:this,type:2});
        // ViewController.getInstance().openView(ViewConst.BASE.PROMPTVIEW,{type:4,f:this.oneKeyClick,o:this});
        // ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEFIGHTINFOPOPUPVIEW,
        // 	{info:{info:{},
        // 		pos:1,
        // 		respTmpAttr:{},
        // 		respMesid:{},
        // 		fightNum:0,
        // 		oppoName:"123123",
        // 		},
        // 	f:this.hide,
        // 	o:this,
        // });
        var myAtkInfo = this.vo.getMyFightInfo();
        if (myAtkInfo.fightnum == 0 && this._isShowBuy == false && (myAtkInfo.tmpattr == null || (myAtkInfo.tmpattr.atk == 0 && myAtkInfo.tmpattr.blood == 0))) {
            this._isShowBuy = true;
            var itemId = this.cfg.getFightAdd();
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: LanguageManager.getlocal("atkrace_no_property"),
                callback: this.realOneKey,
                handler: this,
                needCancel: true
            });
        }
        else {
            this.realOneKey();
        }
        // battleground.batchfight
    };
    AcBattleGroundArrestView.prototype.realOneKey = function () {
        if (!this.vo.getAttendQuality()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acBattleRoundNoAttend-" + this.getUiCode()));
            return;
        }
        if (this.vo.isActyEnd()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
            return;
        }
        if (this.vo.getCurperiod() == 3) {
            App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime4"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDAUTOFIGHTVIEW, { f: this.hide, o: this, aid: this.aid, code: this.code });
    };
    //开始对战
    AcBattleGroundArrestView.prototype.vsClick = function (event, key) {
        var myAtkInfo = this.vo.getMyFightInfo();
        this._key = key;
        if (myAtkInfo.fightnum == 0 && this._isShowBuy == false && (myAtkInfo.tmpattr == null || (myAtkInfo.tmpattr.atk == 0 && myAtkInfo.tmpattr.blood == 0))) {
            this._isShowBuy = true;
            var itemId = this.cfg.getFightAdd();
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: LanguageManager.getlocal("atkrace_no_property"),
                callback: this.realFight,
                handler: this,
                needCancel: true
            });
        }
        else {
            this.realFight();
        }
    };
    AcBattleGroundArrestView.prototype.realFight = function () {
        var _this = this;
        var myAtkInfo = this.vo.getMyFightInfo();
        ViewController.getInstance().openView(ViewConst.BATTLE.ACBATTLEGROUNDFIGHTVIEW, {
            f: this.resetBattleInfo,
            o: this,
            servantid: this._key,
            f2: this.battleEnd,
            aid: this.aid,
            code: this.code,
            support: myAtkInfo.support == 1,
            f3: function () {
                App.CommonUtil.showTip(LanguageManager.getlocal("acBattleGroundTip1-" + _this.getUiCode()));
                _this.hide();
            },
        });
    };
    //战斗胜利回调 刷新 打开购买属性
    AcBattleGroundArrestView.prototype.resetBattleInfo = function () {
        this.resetInfoText();
        this.resetServantInfo();
        this.tempPropertyClick();
    };
    //战斗结束回掉 关掉板子
    AcBattleGroundArrestView.prototype.battleEnd = function () {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_BATTLEGROUND_BATTLEEND);
        this.hide();
    };
    //请求回调
    AcBattleGroundArrestView.prototype.receiveData = function (data) {
    };
    AcBattleGroundArrestView.prototype.dispose = function () {
        this._infoText1 = null;
        this._infoText2 = null;
        this._infoText3 = null;
        this._servantCount = null;
        this._servantInfoArray.length = 0;
        this._scoreText = null;
        this._progressBar = null;
        this._isShowBuy = false;
        this._key = null;
        this._playerScore = null;
        this._decreeAddTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundArrestView;
}(CommonView));
__reflect(AcBattleGroundArrestView.prototype, "AcBattleGroundArrestView");
//# sourceMappingURL=AcBattleGroundArrestView.js.map