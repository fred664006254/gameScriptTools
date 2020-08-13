/**
 * 擂台 缉捕
 * author shaoliang
 * date 2017/11/26
 * @class AtkraceArrestView
 */
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
var AtkraceArrestView = /** @class */ (function (_super) {
    __extends(AtkraceArrestView, _super);
    function AtkraceArrestView() {
        var _this = _super.call(this) || this;
        _this._servantInfoArray = [];
        _this._isShowBuy = false;
        _this._mainTaskHandKey = null;
        return _this;
    }
    AtkraceArrestView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkrace_arrest_bg", "atkrace_enemy_bg", "atkrace_my_bg", "atkrace_name_bg",
            "atkrace_one_key", "atkrace_temp_property", "atkrace_text_bg", "atkrace_vs", "progress7_bg", "progress8",
            "signin_had_get"
        ]);
    };
    AtkraceArrestView.prototype.initView = function () {
        this.container.y = this.getTitleButtomY();
        var containerHeight = GameConfig.stageHeigth - this.container.y;
        //中间的对战
        var middleBg = BaseBitmap.create("atkrace_arrest_bg");
        middleBg.y = containerHeight / 2 - middleBg.height / 2;
        this.addChildToContainer(middleBg);
        var middleVs = BaseBitmap.create("atkrace_vs");
        middleVs.setPosition(GameConfig.stageWidth / 2 - middleVs.height / 2 + 41, containerHeight / 2 - middleVs.height / 2);
        this.addChildToContainer(middleVs);
        var myAtkInfo = Api.atkraceVoApi.getMyFightInfo();
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
        if (!Api.rookieVoApi.isInGuiding && (!Api.rookieVoApi.isGuiding) && this._servantInfoArray && this._servantInfoArray.length > 0) {
            var item = this._servantInfoArray[0];
            if (item) {
                this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(this.container, item.x + item.width / 2 - 10, item.y + item.height / 2, [item], 601, true, function () {
                    return true;
                }, this);
            }
        }
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
        this._playerScore = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_score", [Api.playerVoApi.getPlayerName(), Api.atkraceVoApi.getPoint().toString()]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
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
    AtkraceArrestView.prototype.resetServantInfo = function () {
        if (this._servantInfoArray.length > 0) {
            for (var k in this._servantInfoArray) {
                this._servantInfoArray[k].dispose();
            }
            this._servantInfoArray.length = 0;
        }
        var index = 0;
        var myAtkInfo = Api.atkraceVoApi.getMyFightInfo();
        for (var key in myAtkInfo.fids) {
            var container = new BaseDisplayObjectContainer();
            this.addChildToContainer(container);
            this._servantInfoArray.push(container);
            container.name = key;
            var sinfo = myAtkInfo.fids[key];
            var tmpCfg = Config.ServantCfg.getServantItemById(key);
            var cardbg = BaseLoadBitmap.create("servant_cardbg_" + sinfo.clv);
            cardbg.width = 194;
            cardbg.height = 192;
            cardbg.setPosition(15 + (cardbg.width + 14) * index, 62);
            container.addChild(cardbg);
            index++;
            cardbg.name = "cardbg" + index;
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
    AtkraceArrestView.prototype.resetInfoText = function () {
        var myAtkInfo = Api.atkraceVoApi.getMyFightInfo();
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
        this._playerScore.text = LanguageManager.getlocal("atkrace_score", [Api.playerVoApi.getPlayerName(), Api.atkraceVoApi.getPoint().toString()]);
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
    AtkraceArrestView.prototype.tempPropertyClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEBUYPOPUPVIEW, { f: this.resetInfoText, o: this });
    };
    //一键缉捕
    AtkraceArrestView.prototype.oneKeyClick = function () {
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
        var myAtkInfo = Api.atkraceVoApi.getMyFightInfo();
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
    AtkraceArrestView.prototype.realOneKey = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEAUTOFIGHTPOPUPVIEW, { f: this.hide, o: this });
    };
    //开始对战
    AtkraceArrestView.prototype.vsClick = function (event, key) {
        Api.rookieVoApi.checkNextStep();
        var myAtkInfo = Api.atkraceVoApi.getMyFightInfo();
        this._key = key;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        if (myAtkInfo.fightnum == 0 && this._isShowBuy == false && (myAtkInfo.tmpattr == null || (myAtkInfo.tmpattr.atk == 0 && myAtkInfo.tmpattr.blood == 0))) {
            this._isShowBuy = true;
            var itemId = Config.AtkraceCfg.getFightAdd();
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
    AtkraceArrestView.prototype.realFight = function () {
        ViewController.getInstance().openView(ViewConst.BATTLE.ATKRACEBATTLEVIEW, { f: this.resetBattleInfo, o: this, servantid: this._key, f2: this.battleEnd });
    };
    //战斗胜利回调 刷新 打开购买属性
    AtkraceArrestView.prototype.resetBattleInfo = function () {
        this.resetInfoText();
        this.resetServantInfo();
        this.tempPropertyClick();
    };
    //战斗结束回掉 关掉板子
    AtkraceArrestView.prototype.battleEnd = function () {
        this.hide();
    };
    //请求回调
    AtkraceArrestView.prototype.receiveData = function (data) {
    };
    AtkraceArrestView.prototype.dispose = function () {
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
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        _super.prototype.dispose.call(this);
    };
    return AtkraceArrestView;
}(CommonView));
//# sourceMappingURL=AtkraceArrestView.js.map