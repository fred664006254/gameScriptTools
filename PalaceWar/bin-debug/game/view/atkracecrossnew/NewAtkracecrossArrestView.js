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
var NewAtkracecrossArrestView = /** @class */ (function (_super) {
    __extends(NewAtkracecrossArrestView, _super);
    function NewAtkracecrossArrestView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        _this._servantInfoArray = [];
        _this._isShowBuy = false;
        return _this;
    }
    NewAtkracecrossArrestView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkrace_arrest_bg", "atkrace_enemy_bg", "atkrace_my_bg", "atkrace_name_bg",
            "atkrace_one_key", "atkrace_temp_property", "atkrace_text_bg", "atkrace_vs", "progress7_bg", "progress8",
            "signin_had_get", "newcrossatkrace_battleinfobg"
        ]);
    };
    NewAtkracecrossArrestView.prototype.getTitleStr = function () {
        return "atkraceArrestViewTitle";
    };
    NewAtkracecrossArrestView.prototype.initView = function () {
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        this.container.y = this.getTitleButtomY();
        var containerHeight = GameConfig.stageHeigth - this.container.y;
        //中间的对战
        var middleBg = BaseBitmap.create("atkrace_arrest_bg");
        middleBg.y = containerHeight / 2 - middleBg.height / 2;
        this.addChildToContainer(middleBg);
        var middleVs = BaseBitmap.create("atkrace_vs");
        middleVs.setPosition(GameConfig.stageWidth / 2 - middleVs.height / 2 + 41, containerHeight / 2 - middleVs.height / 2);
        this.addChildToContainer(middleVs);
        var myAtkInfo = Api.atkracecrossVoApi.getMyFightInfo();
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
        this._playerScore = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_score", [Api.playerVoApi.getPlayerName(), Api.atkracecrossVoApi.getPoint().toString()]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
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
        var servantFullImg = BaseLoadBitmap.create(Api.servantVoApi.getFullImgPathWithId(myInfo.sid));
        servantFullImg.width = 405 * 0.8;
        servantFullImg.height = 467 * 0.8;
        servantFullImg.y = containerHeight - servantFullImg.height - 25;
        this.addChildToContainer(servantFullImg);
        this._progressBar = ComponentManager.getProgressBar("progress8", "progress7_bg", GameConfig.stageWidth);
        this._progressBar.y = containerHeight - this._progressBar.height;
        this.addChildToContainer(this._progressBar);
        if (Api.switchVoApi.checkAutoAtkracecross()) {
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
        //江湖名望
        var fameBg = BaseBitmap.create("newcrossatkrace_battleinfobg");
        this.addChildToContainer(fameBg);
        fameBg.width = 320;
        fameBg.x = GameConfig.stageWidth / 4 - fameBg.width / 2;
        var isShowAtkInfo = true;
        var baseAtkStr = "";
        var extraAtkStr = "";
        var acVo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace", Api.atkracecrossVoApi.newcrossCode);
        if (myAtkInfo.director) {
            var myInfo_1 = acVo.getFameCfgByLine(myAtkInfo.director.x);
            if (myAtkInfo.fdirector) {
                if (myAtkInfo.director.x < myAtkInfo.fdirector.x) {
                    baseAtkStr = LanguageManager.getlocal("newatkrackcross_BattleFameAtk", ["" + Math.floor(myInfo_1.baseCfg.baseBuff * 100)]);
                    extraAtkStr = LanguageManager.getlocal("newatkrackcross_BattleFameExtraAtk", ["" + Math.floor(myInfo_1.baseCfg.addBuff * 100)]);
                }
                else if (myAtkInfo.director.x == myAtkInfo.fdirector.x) {
                    isShowAtkInfo = false;
                    baseAtkStr = LanguageManager.getlocal("newatkrackcross_BattleFameExtraTip2");
                    if (myAtkInfo.director.y < myAtkInfo.fdirector.y) {
                        isShowAtkInfo = true;
                        baseAtkStr = LanguageManager.getlocal("newatkrackcross_BattleFameAtk", ["" + Math.floor(myInfo_1.baseCfg.baseBuff * 100)]);
                        extraAtkStr = LanguageManager.getlocal("newatkrackcross_BattleFameExtraTip3", ["" + Math.floor(myInfo_1.baseCfg.addBuff * 100)]);
                    }
                    else if (myAtkInfo.director.y > myAtkInfo.fdirector.y) {
                        isShowAtkInfo = true;
                        baseAtkStr = LanguageManager.getlocal("newatkrackcross_BattleFameAtk", ["" + Math.floor(myInfo_1.baseCfg.baseBuff * 100)]);
                        extraAtkStr = LanguageManager.getlocal("newatkrackcross_BattleFameExtraTip4");
                    }
                }
                else {
                    baseAtkStr = LanguageManager.getlocal("newatkrackcross_BattleFameAtk", ["" + Math.floor(myInfo_1.baseCfg.baseBuff * 100)]);
                    extraAtkStr = LanguageManager.getlocal("newatkrackcross_BattleFameExtraTip1");
                }
            }
            else {
                baseAtkStr = LanguageManager.getlocal("newatkrackcross_BattleFameAtk", ["" + Math.floor(myInfo_1.baseCfg.baseBuff * 100)]);
                extraAtkStr = LanguageManager.getlocal("newatkrackcross_BattleFameExtraAtk", ["" + Math.floor(myInfo_1.baseCfg.addBuff * 100)]);
            }
        }
        else {
            isShowAtkInfo = false;
            if (myAtkInfo.fdirector) {
                baseAtkStr = LanguageManager.getlocal("newatkrackcross_BattleFameExtraTip1");
            }
            else {
                baseAtkStr = LanguageManager.getlocal("newatkrackcross_BattleFameExtraTip2");
            }
        }
        var fameAtk = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this.addChildToContainer(fameAtk);
        var fameExtraAtk = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        fameExtraAtk.width = 240;
        fameExtraAtk.lineSpacing = 5;
        this.addChildToContainer(fameExtraAtk);
        if (isShowAtkInfo) {
            fameAtk.visible = true;
            fameExtraAtk.visible = true;
            fameAtk.text = baseAtkStr;
            fameExtraAtk.text = extraAtkStr;
            fameBg.height = fameAtk.height + fameExtraAtk.height + 35;
            fameBg.y = this._progressBar.y - 40 - fameBg.height;
            fameAtk.setPosition(fameBg.x + 40, fameBg.y + 20);
            fameExtraAtk.setPosition(fameAtk.x, fameAtk.y + fameAtk.height + 5);
        }
        else {
            fameAtk.visible = true;
            fameExtraAtk.visible = false;
            fameAtk.text = baseAtkStr;
            fameBg.y = this._progressBar.y - 40 - fameBg.height;
            fameAtk.setPosition(fameBg.x + fameBg.width / 2 - fameAtk.width / 2, fameBg.y + fameBg.height / 2 - fameAtk.height / 2 + 5);
        }
        this.resetInfoText();
    };
    NewAtkracecrossArrestView.prototype.resetServantInfo = function () {
        if (this._servantInfoArray.length > 0) {
            for (var k in this._servantInfoArray) {
                this._servantInfoArray[k].dispose();
            }
            this._servantInfoArray.length = 0;
        }
        var index = 0;
        var myAtkInfo = Api.atkracecrossVoApi.getMyFightInfo();
        for (var key in myAtkInfo.fids) {
            var container = new BaseDisplayObjectContainer();
            this.addChildToContainer(container);
            this._servantInfoArray.push(container);
            var sinfo = myAtkInfo.fids[key];
            var tmpCfg = Config.ServantCfg.getServantItemById(key);
            var cardbg = BaseLoadBitmap.create("servant_cardbg_" + sinfo.clv);
            cardbg.width = 194;
            cardbg.height = 192;
            cardbg.setPosition(15 + (cardbg.width + 14) * index, 62);
            container.addChild(cardbg);
            index++;
            cardbg.addTouchTap(this.vsClick, this, [key]);
            var imgName = tmpCfg.halfIcon;
            if (sinfo.equip) {
                imgName = Config.ServantskinCfg.getServantSkinItemById(sinfo.equip).icon;
            }
            var servantImg = BaseLoadBitmap.create(imgName);
            servantImg.width = 180;
            servantImg.height = 177;
            servantImg.x = cardbg.x + cardbg.width / 2 - servantImg.width / 2;
            servantImg.y = cardbg.y + cardbg.height / 2 - servantImg.height / 2 - 2;
            container.addChild(servantImg);
        }
    };
    NewAtkracecrossArrestView.prototype.resetInfoText = function () {
        var myAtkInfo = Api.atkracecrossVoApi.getMyFightInfo();
        var myInfo = myAtkInfo.mesid;
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
        this._playerScore.text = LanguageManager.getlocal("atkrace_score", [Api.playerVoApi.getPlayerName(), Api.atkracecrossVoApi.getPoint().toString()]);
        var addInfo = Api.atkraceVoApi.getDecreePolicyAddAttrInfo();
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
    NewAtkracecrossArrestView.prototype.tempPropertyClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.NEWATKRACECROSSBUYPOPUPVIEW, { f: this.resetInfoText, o: this });
    };
    //一键缉捕
    NewAtkracecrossArrestView.prototype.oneKeyClick = function () {
        var myAtkInfo = Api.atkracecrossVoApi.getMyFightInfo();
        if (myAtkInfo.fightnum == 0 && this._isShowBuy == false && (myAtkInfo.tmpattr == null || (myAtkInfo.tmpattr.atk == 0 && myAtkInfo.tmpattr.blood == 0))) {
            this._isShowBuy = true;
            var itemId = Config.AtkraceCfg.getFightAdd();
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
    };
    NewAtkracecrossArrestView.prototype.realOneKey = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.NEWATKRACECROSSAUTOFIGHTPOPUPVIEW, { f: this.hide, o: this });
    };
    //开始对战
    NewAtkracecrossArrestView.prototype.vsClick = function (event, key) {
        var myAtkInfo = Api.atkracecrossVoApi.getMyFightInfo();
        this._key = key;
        if (myAtkInfo.fightnum == 0 && this._isShowBuy == false && (myAtkInfo.tmpattr == null || (myAtkInfo.tmpattr.atk == 0 && myAtkInfo.tmpattr.blood == 0))) {
            this._isShowBuy = true;
            var itemCfg = Config.AcCfg.getCfgByActivityIdAndCode("newCrossServerAtkRace", Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace").code);
            var itemId = itemCfg.getFightAdd();
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
    NewAtkracecrossArrestView.prototype.realFight = function () {
        ViewController.getInstance().openView(ViewConst.BATTLE.NEWATKRACECROSSBATTLEVIEW, { f: this.resetBattleInfo, o: this, servantid: this._key, f2: this.battleEnd });
    };
    //战斗胜利回调 刷新 打开购买属性
    NewAtkracecrossArrestView.prototype.resetBattleInfo = function () {
        this.resetInfoText();
        this.resetServantInfo();
        this.tempPropertyClick();
    };
    //战斗结束回掉 关掉板子
    NewAtkracecrossArrestView.prototype.battleEnd = function () {
        this.hide();
    };
    NewAtkracecrossArrestView.prototype.hide = function () {
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        _super.prototype.hide.call(this);
    };
    //请求回调
    NewAtkracecrossArrestView.prototype.receiveData = function (data) {
    };
    NewAtkracecrossArrestView.prototype.dispose = function () {
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
        this._callbackF = null;
        this._obj = null;
        this._decreeAddTxt = null;
        _super.prototype.dispose.call(this);
    };
    return NewAtkracecrossArrestView;
}(CommonView));
//# sourceMappingURL=NewAtkracecrossArrestView.js.map