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
var AtkraceFightInfoPopupView = (function (_super) {
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
        return _this;
    }
    /**生成新标头 */
    AtkraceFightInfoPopupView.prototype.isHaveTitle = function () {
        return true;
    };
    AtkraceFightInfoPopupView.prototype.initView = function () {
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        // let titleBg:BaseBitmap = BaseBitmap.create("public_tc_bg02");
        // titleBg.setPosition(55,12);
        // this.addChildToContainer(titleBg);
        var resBar = ComponentManager.getResBar(1, true, 175);
        resBar.setPosition(120, 30);
        this.addChildToContainer(resBar);
        var moraleBg = BaseBitmap.create("public_hb_bg01");
        moraleBg.setPosition(380, 30);
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
        var moraleText = ComponentManager.getTextField(moStr, 20, TextFieldConst.COLOR_WARN_YELLOW_NEW);
        moraleText.setPosition(moraleIcon.x + 50, moraleBg.y + moraleBg.height / 2 - moraleText.height / 2);
        this.addChildToContainer(moraleText);
        moraleBg.width = moraleText.width + 70;
        var typeBg = BaseBitmap.create("public_9v_bg12");
        typeBg.width = 530;
        typeBg.height = 450;
        typeBg.setPosition(this.viewBg.width / 2 - typeBg.width / 2, 80);
        this.addChildToContainer(typeBg);
        var typeBg2 = BaseBitmap.create("public_9v_bg12");
        typeBg2.width = 530;
        typeBg2.height = 155;
        typeBg2.setPosition(this.viewBg.width / 2 - typeBg2.width / 2, typeBg.y + typeBg.height + 10);
        this.addChildToContainer(typeBg2);
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, 500, 430);
        this._myContiner = new BaseDisplayObjectContainer();
        this._scrollView = ComponentManager.getScrollView(this._myContiner, rect2);
        this._scrollView.setPosition(typeBg.x, typeBg.y + 10);
        this._scrollView.horizontalScrollPolicy = "off";
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
                var lackText = ComponentManager.getTextField(LanguageManager.getlocal(lackKey, [costStr, buffStr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
                lackText.setPosition(45, scrollY_1);
                lackText.width = 470;
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
                    var lackText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFightLack" + lackNum), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED_NEW);
                    lackText.setPosition(45, scrollY_1);
                    lackText.width = 470;
                    scrollContiner.addChild(lackText);
                    scrollY_1 += lackText.height + 7;
                }
            }
            var fightNumT = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFightNum", [String(index)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
            fightNumT.setPosition(25, scrollY_1);
            scrollContiner.addChild(fightNumT);
            var resultStr = void 0;
            if (Number(fightInfo[1]) == 1) {
                resultStr = LanguageManager.getlocal("atkraceFightWin");
                winCount++;
                pushAwardsVo(GameData.formatRewardItem("14_1_2")[0]);
                scoreCount += 2;
            }
            else {
                resultStr = LanguageManager.getlocal("atkraceFightFail");
                if (!Api.switchVoApi.checkOpenAtkraceScoreFix()) {
                    scoreCount--;
                }
            }
            var servatName = Config.ServantCfg.getServantItemById(fightInfo[0]).name;
            var fightServant = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFightServant", [servatName, resultStr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
            fightServant.setPosition(fightNumT.x + fightNumT.width + 18, scrollY_1);
            fightServant.width = 430;
            scrollContiner.addChild(fightServant);
            scrollY_1 += fightServant.height + 7;
            if (Number(fightInfo[1]) == 1) {
                var gain = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFightGain"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
                gain.setPosition(fightNumT.x + fightNumT.width - gain.width, scrollY_1);
                scrollContiner.addChild(gain);
                var score = "atkraceFightGoods";
                if (Api.switchVoApi.checkOpenAtkraceScoreFix()) {
                    score = "atkraceFightGoods2";
                }
                var goods = ComponentManager.getTextField(LanguageManager.getlocal(score), TextFieldConst.FONTSIZE_CONTENT_COMMON);
                goods.setPosition(fightServant.x, scrollY_1);
                goods.lineSpacing = 6;
                scrollContiner.addChild(goods);
                scrollY_1 += goods.height + 7;
            }
            if (fightInfo[2]) {
                var awardVo = GameData.formatRewardItem(fightInfo[2])[0];
                var award = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFightAward", [awardVo.message]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
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
            var winAll = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFightWinAll"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
            winAll.setPosition(25, scrollY);
            winAll.width = 470;
            scrollContiner2.addChild(winAll);
            scrollY += winAll.height + 7;
        }
        var fightEnd = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFightEnd", [Config.ServantCfg.getServantItemById(this._sid).name, String(winCount)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        fightEnd.setPosition(25, scrollY);
        fightEnd.width = 470;
        scrollContiner2.addChild(fightEnd);
        scrollY += fightEnd.height + 7;
        if (winCount > 0) {
            var wardStr = LanguageManager.getlocal("atkraceFightGoodsAll", [String(scoreCount), String(winCount)]);
            for (var n = 0; n < awardsVoTab.length; n++) {
                wardStr += ("\n" + awardsVoTab[n].message);
            }
            var awardAll = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFightAwardAll"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
            awardAll.setPosition(fightEnd.x, scrollY);
            scrollContiner2.addChild(awardAll);
            var wardAllText = ComponentManager.getTextField(wardStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN_NEW);
            wardAllText.setPosition(18 + awardAll.width + 10, scrollY);
            wardAllText.width = 470 - awardAll.width;
            wardAllText.lineSpacing = 6;
            scrollContiner2.addChild(wardAllText);
            scrollY += wardAllText.height + 7;
        }
        containerBg.height = scrollY;
        containerY += scrollY;
        this._scrollContainerTab.push(scrollContiner2);
        egret.Tween.get(this._myContiner).wait(200).call(this.showOneContainer, this);
        //下部信息
        // let line:BaseBitmap = BaseBitmap.create("public_line1");
        // line.setPosition(this.viewBg.width/2-line.width/2,typeBg.y+455);
        // this.addChildToContainer(line);
        // let posY:number=line.y+line.height+ 20;
        var infoDesc2 = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_2"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        infoDesc2.setPosition(90, typeBg2.y + 25);
        this.addChildToContainer(infoDesc2);
        var infoDesc3 = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_3"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        infoDesc3.setPosition(400, infoDesc2.y);
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
        // posY +=infoDesc2.height + 12;
        var infoText2 = ComponentManager.getTextField(atkAdd.toString() + "%", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN_NEW);
        infoText2.setPosition(infoDesc2.x + infoDesc2.width, infoDesc2.y);
        this.addChildToContainer(infoText2);
        var infoText3 = ComponentManager.getTextField(skillAdd.toString() + "%", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN_NEW);
        infoText3.setPosition(infoDesc3.x + infoDesc3.width, infoDesc3.y);
        this.addChildToContainer(infoText3);
        var bloodText = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_property3"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        bloodText.setPosition(infoDesc2.x, infoDesc2.y + 60);
        this.addChildToContainer(bloodText);
        var tempAttr = Number(myInfo.attr);
        tempAttr = tempAttr > 0 ? tempAttr : 0;
        //血量具体
        var bloodText2 = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_property3"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED_NEW);
        bloodText2.setPosition(bloodText.width + bloodText.x + 20, bloodText.y);
        bloodText2.text = tempAttr + "/" + myInfo.fullattr;
        this.addChildToContainer(bloodText2);
        var progressBar = ComponentManager.getProgressBar("progress_type3_red", "progress_type3_bg", 470);
        progressBar.x = this.viewBg.width / 2 - progressBar.width / 2;
        // progressBar.y = bloodText.y - progressBar.height/2 + bloodText.height/2;
        progressBar.y = typeBg2.y + 115;
        this.addChildToContainer(progressBar);
        // progressBar.setText( tempAttr + "/"+ myInfo.fullattr);
        progressBar.setPercentage(tempAttr / myInfo.fullattr);
        this._myConfirmBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "sysConfirm", this.hide, this);
        this._myConfirmBtn.setPosition(this.viewBg.width / 2 - this._myConfirmBtn.width / 2, typeBg2.y + typeBg2.height);
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
    };
    // 计算背景高度时使用，在container高度的基础上添加该高度
    AtkraceFightInfoPopupView.prototype.getBgExtraHeight = function () {
        return 25;
    };
    AtkraceFightInfoPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    AtkraceFightInfoPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            // "progress_type1_red","progress_type1_bg"
            "progress_type3_red", "progress_type3_bg"
        ]);
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
        _super.prototype.dispose.call(this);
    };
    return AtkraceFightInfoPopupView;
}(PopupView));
__reflect(AtkraceFightInfoPopupView.prototype, "AtkraceFightInfoPopupView");
