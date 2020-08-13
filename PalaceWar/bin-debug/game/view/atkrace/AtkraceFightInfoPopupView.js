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
var AtkraceFightInfoPopupView = /** @class */ (function (_super) {
    __extends(AtkraceFightInfoPopupView, _super);
    function AtkraceFightInfoPopupView() {
        var _this = _super.call(this) || this;
        _this._agreeType = 0;
        _this._fightName = null;
        _this._sid = null;
        _this._callbackF = null;
        _this._obj = null;
        _this._myContiner = null;
        _this._scrollView = null;
        _this._scrollContainerTab = [];
        _this._showedIndx = 0;
        _this._myConfirmBtn = null;
        _this._fameAdd = 1; //擂台功勋加成类型
        return _this;
    }
    AtkraceFightInfoPopupView.prototype.initView = function () {
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        if (this.param.data && this.param.data.fameAdd) {
            this._fameAdd = this.param.data.fameAdd;
        }
        var gemsBg = BaseBitmap.create("public_9_resbg");
        gemsBg.setPosition(32 + GameData.popupviewOffsetX, 12);
        this.addChildToContainer(gemsBg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 45, 45);
        var goldIcon = BaseLoadBitmap.create("itemicon1", rect);
        goldIcon.setPosition(gemsBg.x - 1, gemsBg.y + gemsBg.height / 2 - 45 / 2);
        this.addChildToContainer(goldIcon);
        var goldText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGemStr(), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        goldText.setPosition(goldIcon.x + 50, gemsBg.y + gemsBg.height / 2 - goldText.height / 2);
        this.addChildToContainer(goldText);
        gemsBg.width = goldText.width + 70;
        var moraleBg = BaseBitmap.create("public_9_resbg");
        moraleBg.setPosition(280 + GameData.popupviewOffsetX, 12);
        this.addChildToContainer(moraleBg);
        var moraleIcon = BaseBitmap.create("atkrace_morale");
        moraleIcon.setPosition(moraleBg.x + 3, moraleBg.y + moraleBg.height / 2 - 45 / 2);
        this.addChildToContainer(moraleIcon);
        var moStr = Api.atkraceVoApi.getMyInfo().morale.toString();
        if (this.param.data.type == 2) {
            moStr = Api.atkracecrossVoApi.getMyInfo().morale.toString();
        }
        else if (this.param.data.type == 3) {
            moStr = this.param.data.morale;
        }
        var moraleText = ComponentManager.getTextField(moStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        moraleText.setPosition(moraleIcon.x + 50, moraleBg.y + moraleBg.height / 2 - moraleText.height / 2);
        this.addChildToContainer(moraleText);
        moraleBg.width = moraleText.width + 70;
        var typeBg = BaseBitmap.create("public_9_probiginnerbg");
        typeBg.width = 528;
        typeBg.height = 554;
        typeBg.setPosition(this.viewBg.width / 2 - typeBg.width / 2, 65);
        this.addChildToContainer(typeBg);
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, 528, 450);
        this._myContiner = new BaseDisplayObjectContainer();
        this._scrollView = ComponentManager.getScrollView(this._myContiner, rect2);
        this._scrollView.setPosition(typeBg.x, typeBg.y + 10);
        this.addChildToContainer(this._scrollView);
        var infoTab = this.param.data.info;
        //结束后的临时属性 tmpattr:临时属性{blood血量加成:,atk攻击加成:,skill技能加成, list:[2:xx,3:xx,4:xx], isbuy：级别_id},
        var tmpatt = infoTab.respTmpAttr;
        //mesid:我出战门客 {sid:id,attr:当前属性,ability:总资质,lv:等级,s1lv:技能1等级,s2lv:技能2等级,fullattr:满血,clv:爵位}},
        var myInfo = infoTab.respMesid;
        this._sid = myInfo.sid;
        this._fightName = infoTab.oppoName;
        var info = infoTab.info;
        var pos = infoTab.pos;
        //test data
        // info= [["1004",1,null,"seniorAtt_1"],["1004",1,"15_1_4",null],["1004",1,null,"seniorAtt_1"],
        // ["1004",1,null,"seniorAtt_1"],["1004",1,null,"seniorAtt_1"],["1037",2,null,null]];
        // tmpatt= {atk:555,skill:12};
        // myInfo= {sid:"1004",attr:8888,fullattr:9999};
        // this._fightName= "暗示法";
        // pos = 1;
        //已经战斗了几场
        var fightNum = infoTab.fightNum;
        var index = 1;
        var containerY = 0;
        var winCount = 0;
        var scoreCount = 0;
        var fameCount = 0;
        var awardsVoTab = [];
        function pushAwardsVo(v) {
            var isHasnot = true;
            for (var i = 0; i < awardsVoTab.length; i++) {
                var tempV = awardsVoTab[i];
                if (tempV.type == v.type && tempV.id == v.id) {
                    isHasnot = false;
                    awardsVoTab[i].num += v.num;
                    break;
                }
            }
            if (isHasnot) {
                awardsVoTab.push(v);
            }
        }
        // let isScoreProtect = false;
        // if (fightNum == 1 && infoTab.winScore == 2 || fightNum>1 && infoTab.winScore>=0)
        // {
        // 	isScoreProtect = true;
        // }
        for (var k in info) {
            var fightInfo = info[k];
            var scrollY_1 = 10;
            var scrollContiner = new BaseDisplayObjectContainer();
            // scrollContiner.y = containerY;
            if (index == 1) {
                this._myContiner.addChild(scrollContiner);
            }
            var containerBg_1 = BaseBitmap.create("public_alphabg");
            containerBg_1.width = rect2.width - 20;
            containerBg_1.height = 80;
            containerBg_1.x = 10;
            scrollContiner.addChild(containerBg_1);
            if (fightInfo[3]) {
                var tmpT = App.StringUtil.splitString(fightInfo[3], "_");
                var buffStr = null;
                var costStr = null;
                var isShiqi = false;
                if (tmpT[0] == "1") {
                    var buffInfo = Config.AtkraceCfg.getInitAtt(tmpT[1]);
                    buffStr = LanguageManager.getlocal("atkrace_property_lv" + tmpT[1], [LanguageManager.getlocal("atkrace_property1")]);
                    if (buffInfo.costPoint) {
                        costStr = LanguageManager.getlocal("atkraceBuffCost", [String(buffInfo.costPoint)]);
                    }
                    else {
                        costStr = LanguageManager.getlocal("thanksgivingAcer", [String(buffInfo.costGem)]);
                    }
                }
                else if (tmpT[0] == "2") {
                    var buffInfo = Config.AtkraceCfg.getSeniorAtt(tmpT[1]);
                    buffStr = LanguageManager.getlocal("atkrace_property_lv3", [LanguageManager.getlocal("atkrace_property" + buffInfo.att)]);
                    costStr = LanguageManager.getlocal("thanksgivingAcer", [String(buffInfo.costGem)]);
                }
                else if (tmpT[0] == "3") {
                    var buffInfo = Config.AtkraceCfg.getMediumAtt(tmpT[1]);
                    buffStr = LanguageManager.getlocal("atkrace_property_lv2", [LanguageManager.getlocal("atkrace_property" + buffInfo.att)]);
                    costStr = LanguageManager.getlocal("atkraceBuffCost", [String(buffInfo.costPoint)]);
                    isShiqi = true;
                }
                else {
                    var buffInfo = Config.AtkraceCfg.getJuniorAtt(tmpT[1]);
                    buffStr = LanguageManager.getlocal("atkrace_property_lv1", [LanguageManager.getlocal("atkrace_property" + buffInfo.att)]);
                    costStr = LanguageManager.getlocal("atkraceBuffCost", [String(buffInfo.costPoint)]);
                    isShiqi = true;
                }
                var lackKey = "atkraceFightBuy";
                if (isShiqi && pos == 1) {
                    lackKey = "atkraceFightBuy2";
                }
                var lackText = ComponentManager.getTextField(LanguageManager.getlocal(lackKey, [costStr, buffStr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
                lackText.setPosition(18, scrollY_1);
                lackText.width = 490;
                scrollContiner.addChild(lackText);
                scrollY_1 += lackText.height + 7;
            }
            else if (fightNum == 0 && index == 1) {
            }
            else {
                var lackNum = 0;
                if (pos == 1) {
                    lackNum = 1;
                }
                else if (pos == 2 || pos == 3) {
                    lackNum = 2;
                }
                if (lackNum > 0) {
                    var lackText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFightLack" + lackNum), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED);
                    lackText.setPosition(18, scrollY_1);
                    lackText.width = 490;
                    scrollContiner.addChild(lackText);
                    scrollY_1 += lackText.height + 7;
                }
            }
            var fightNumT = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFightNum", [String(index)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            fightNumT.setPosition(18, scrollY_1);
            scrollContiner.addChild(fightNumT);
            var resultStr = void 0;
            if (Number(fightInfo[1]) == 1) {
                resultStr = LanguageManager.getlocal("atkraceFightWin");
                winCount++;
                pushAwardsVo(GameData.formatRewardItem("14_1_2")[0]);
                scoreCount += 2;
                if (this._fameAdd) {
                    fameCount += Number(Config.AtkraceCfg['reputation' + this._fameAdd]);
                }
            }
            else {
                resultStr = LanguageManager.getlocal("atkraceFightFail");
                scoreCount--;
            }
            var servatName = Config.ServantCfg.getServantItemById(fightInfo[0]).name;
            var fightServant = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFightServant", [servatName, resultStr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            fightServant.setPosition(fightNumT.x + fightNumT.width + 12, scrollY_1);
            fightServant.width = 430;
            scrollContiner.addChild(fightServant);
            if (PlatformManager.checkIsEnLang()) {
                fightServant.width = 400;
            }
            scrollY_1 += fightServant.height + 7;
            if (Number(fightInfo[1]) == 1) {
                var gain = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFightGain"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
                gain.setPosition(fightNumT.x + fightNumT.width - gain.width, scrollY_1);
                scrollContiner.addChild(gain);
                var goodsStr = LanguageManager.getlocal("atkraceFightGoods");
                if (fightInfo[4] != null) {
                    goodsStr = LanguageManager.getlocal("atkraceFightGoods2", [String(fightInfo[4])]);
                }
                if (Api.switchVoApi.checkServantFame()) {
                    var serverStr = '';
                    if (Number(Config.AtkraceCfg['reputation' + this._fameAdd]) > Number(Config.AtkraceCfg.reputation1)) {
                        serverStr = LanguageManager.getlocal('atkraceFameCrossAdd', [LanguageManager.getlocal('atkraceFameAddSource' + this._fameAdd)]);
                    }
                    goodsStr = LanguageManager.getlocal("atkraceFightGoodsWithFame", [Config.AtkraceCfg.reputation1 + '', serverStr]);
                    if (fightInfo[4] != null) {
                        goodsStr = LanguageManager.getlocal("atkraceFightGoodsWithFame2", [Config.AtkraceCfg.reputation1 + '', serverStr, String(fightInfo[4])]);
                    }
                }
                var goods = ComponentManager.getTextField(goodsStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
                goods.setPosition(fightServant.x, scrollY_1);
                goods.lineSpacing = 6;
                scrollContiner.addChild(goods);
                scrollY_1 += goods.height + 7;
            }
            if (fightInfo[2]) {
                var awardVo = GameData.formatRewardItem(fightInfo[2])[0];
                var award = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFightAward", [awardVo.message]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
                award.setPosition(fightServant.x, scrollY_1);
                scrollContiner.addChild(award);
                scrollY_1 += award.height + 12;
                pushAwardsVo(awardVo);
            }
            index++;
            containerBg_1.height = scrollY_1;
            containerY += scrollY_1;
            this._scrollContainerTab.push(scrollContiner);
        }
        if (info[info.length - 1][1] == 1) {
            this._agreeType = 4;
        }
        else {
            if (fightNum > 0 || info.length > 1) {
                this._agreeType = 3;
            }
            else {
                this._agreeType = 2;
            }
        }
        //战斗总结
        var scrollY = 10;
        var scrollContiner2 = new BaseDisplayObjectContainer();
        var containerBg = BaseBitmap.create("public_alphabg");
        containerBg.width = rect2.width - 20;
        containerBg.height = 80;
        containerBg.x = 10;
        scrollContiner2.addChild(containerBg);
        if (this._agreeType == 4) {
            var winAll = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFightWinAll"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
            winAll.setPosition(18, scrollY);
            winAll.width = 490;
            scrollContiner2.addChild(winAll);
            scrollY += winAll.height + 7;
        }
        var fightEnd = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFightEnd", [Config.ServantCfg.getServantItemById(this._sid).name, String(winCount)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        fightEnd.setPosition(18, scrollY);
        fightEnd.width = 490;
        scrollContiner2.addChild(fightEnd);
        scrollY += fightEnd.height + 7;
        if (winCount > 0) {
            var thescore = scoreCount;
            if (infoTab.winScore != null) {
                thescore = infoTab.winScore;
            }
            var wardStr = LanguageManager.getlocal("atkraceFightGoodsAll", [String(thescore), String(winCount)]);
            if (thescore < 0) {
                wardStr = LanguageManager.getlocal("atkraceFightGoodsAll2", [String(thescore), String(winCount)]);
            }
            if (Api.switchVoApi.checkServantFame() && this._fameAdd && fameCount) {
                wardStr = LanguageManager.getlocal("atkraceFightGoodsAllWithFame", [String(thescore), String(winCount), String(fameCount)]);
                if (thescore < 0) {
                    wardStr = LanguageManager.getlocal("atkraceFightGoodsAllWithFame2", [String(thescore), String(winCount), String(fameCount)]);
                }
            }
            for (var n = 0; n < awardsVoTab.length; n++) {
                wardStr += ("\n" + awardsVoTab[n].message);
            }
            var awardAll = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFightAwardAll"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
            awardAll.setPosition(18, scrollY);
            scrollContiner2.addChild(awardAll);
            var wardAllText = ComponentManager.getTextField(wardStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
            wardAllText.setPosition(18 + awardAll.width + 10, scrollY);
            wardAllText.width = 490 - awardAll.width;
            wardAllText.lineSpacing = 6;
            scrollContiner2.addChild(wardAllText);
            scrollY += wardAllText.height + 7;
        }
        containerBg.height = scrollY;
        containerY += scrollY;
        this._scrollContainerTab.push(scrollContiner2);
        egret.Tween.get(this._myContiner).wait(200).call(this.showOneContainer, this);
        //下部信息
        var line = BaseBitmap.create("public_line1");
        line.setPosition(this.viewBg.width / 2 - line.width / 2, typeBg.y + 462);
        this.addChildToContainer(line);
        var posY = line.y + line.height + 20;
        var infoDesc2 = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_2"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        infoDesc2.setPosition(38 + GameData.popupviewOffsetX, posY);
        this.addChildToContainer(infoDesc2);
        var infoDesc3 = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_3"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        infoDesc3.setPosition(280 + GameData.popupviewOffsetX, infoDesc2.y);
        this.addChildToContainer(infoDesc3);
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
        posY += infoDesc2.height + 12;
        var infoText2 = ComponentManager.getTextField(atkAdd.toString() + "%", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
        infoText2.setPosition(infoDesc2.x + infoDesc2.width, infoDesc2.y);
        this.addChildToContainer(infoText2);
        var infoText3 = ComponentManager.getTextField(skillAdd.toString() + "%", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_GREEN);
        infoText3.setPosition(infoDesc3.x + infoDesc3.width, infoDesc3.y);
        this.addChildToContainer(infoText3);
        var bloodText = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_property3"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        bloodText.setPosition(infoDesc2.x, posY);
        this.addChildToContainer(bloodText);
        var progressBar = ComponentManager.getProgressBar("progress8", "progress7_bg", 440);
        progressBar.x = bloodText.x + bloodText.width + 20;
        progressBar.y = bloodText.y - progressBar.height / 2 + bloodText.height / 2;
        this.addChildToContainer(progressBar);
        var tempAttr = Number(myInfo.attr);
        tempAttr = tempAttr > 0 ? tempAttr : 0;
        progressBar.setText(Math.floor(tempAttr + 0.5) + "/" + myInfo.fullattr);
        progressBar.setPercentage(tempAttr / myInfo.fullattr);
        this._myConfirmBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "sysConfirm", this.hide, this);
        this._myConfirmBtn.setPosition(this.viewBg.width / 2 - this._myConfirmBtn.width / 2, typeBg.y + 20 + typeBg.height);
        this.addChildToContainer(this._myConfirmBtn);
        this._myConfirmBtn.setEnable(false);
    };
    AtkraceFightInfoPopupView.prototype.showOneContainer = function () {
        // this._scrollContainerTab[this._showedIndx].visible = true;
        this._showedIndx++;
        if (this._scrollContainerTab.length > this._showedIndx) {
            this._scrollContainerTab[this._showedIndx].y = this._myContiner.height;
            this._myContiner.addChild(this._scrollContainerTab[this._showedIndx]);
            var moveH = this._myContiner.height - 450;
            moveH = moveH < 0 ? 0 : moveH;
            this._scrollView.setScrollTop(moveH, 200);
            egret.Tween.get(this._myContiner).wait(200).call(this.showOneContainer, this);
            // this._scrollContainerTab[this._showedIndx].visible = false;
        }
        else {
            this._myConfirmBtn.setEnable(true);
        }
    };
    AtkraceFightInfoPopupView.prototype.hide = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEAGREEPOPUPVIEW, { type: this._agreeType, name: this._fightName, sid: this._sid });
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        _super.prototype.hide.call(this);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESET_ATKRACE);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESET_ATKRACECROSS);
    };
    // 计算背景高度时使用，在container高度的基础上添加该高度
    AtkraceFightInfoPopupView.prototype.getBgExtraHeight = function () {
        return 15;
    };
    AtkraceFightInfoPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    AtkraceFightInfoPopupView.prototype.dispose = function () {
        egret.Tween.removeTweens(this._myContiner);
        this._myContiner = null;
        this._agreeType = 0;
        this._fightName = null;
        this._sid = null;
        this._scrollView = null;
        this._scrollContainerTab.length = 0;
        this._showedIndx = 0;
        this._myConfirmBtn = null;
        this._fameAdd = 1;
        _super.prototype.dispose.call(this);
    };
    return AtkraceFightInfoPopupView;
}(PopupView));
//# sourceMappingURL=AtkraceFightInfoPopupView.js.map