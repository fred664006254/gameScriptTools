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
var NewAtkraceCrossChallengeItem = (function (_super) {
    __extends(NewAtkraceCrossChallengeItem, _super);
    function NewAtkraceCrossChallengeItem() {
        var _this = _super.call(this) || this;
        //挑战界面的Itme
        _this._needNum = 0;
        _this._itemNum = 0;
        _this._servantId = "";
        _this.haveNumber = 0;
        _this.servantid = "";
        _this.curr_index = 0;
        return _this;
    }
    NewAtkraceCrossChallengeItem.prototype.initItem = function (index, servantId) {
        this.curr_index = index;
        this._needNum = 1; //需要的挑战书数量
        this._servantId = servantId;
        var servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
        var bottomBg = BaseBitmap.create("public_9_probiginnerbg");
        bottomBg.width = 510;
        bottomBg.height = 120;
        bottomBg.x = 9;
        this.addChild(bottomBg);
        var deltaScale = 0.55;
        var cardbg = BaseLoadBitmap.create(servantInfoObj.qualityBoxImgPath);
        cardbg.width = 194;
        cardbg.height = 192;
        cardbg.setScale(deltaScale);
        cardbg.x = 20;
        cardbg.y = 8;
        cardbg.name = "cardbg";
        this.addChild(cardbg);
        var servantImg = BaseLoadBitmap.create(servantInfoObj.halfImgPath);
        servantImg.width = 180;
        servantImg.height = 177;
        servantImg.x = cardbg.x + cardbg.width / 2 - servantImg.width / 2 - 5;
        servantImg.y = cardbg.y + cardbg.height / 2 - servantImg.height / 2 - 2;
        servantImg.setScale(deltaScale);
        this.addChild(servantImg);
        // if (Api.switchVoApi.checkOpenExile()) {
        // 	if (servantInfoObj.banishSt) {
        // 		let exileBM = BaseBitmap.create("public_servantexilelogo");
        // 		exileBM.setScale(deltaScale);
        // 		exileBM.setPosition(cardbg.x + cardbg.width * deltaScale - exileBM.width * deltaScale, cardbg.y);
        // 		this.addChild(exileBM);
        // 	}
        // }
        //名字
        var nameTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_QUALITY_BLUE);
        nameTxt.textColor = ServantScrollItem.getQualityColor(servantInfoObj.clv);
        nameTxt.text = servantInfoObj.servantName;
        nameTxt.x = 140;
        nameTxt.y = 10;
        this.addChild(nameTxt);
        //等级
        var levelTxt = ComponentManager.getTextField("atkraceChallengeleve", 20);
        levelTxt.text = LanguageManager.getlocal("atkraceChallengeleve", [servantInfoObj.level + ""]);
        levelTxt.width = 200;
        levelTxt.x = nameTxt.x;
        levelTxt.y = nameTxt.y + 25;
        this.addChild(levelTxt);
        //资质
        var qualityTxt = ComponentManager.getTextField("atkraceChallengequality", 20);
        qualityTxt.text = LanguageManager.getlocal("atkraceChallengequality", [servantInfoObj.getAllBookValue() + ""]);
        qualityTxt.x = levelTxt.x;
        qualityTxt.y = levelTxt.y + 25;
        this.addChild(qualityTxt);
        //属性
        var infoAttrTxt = ComponentManager.getTextField("atkraceChallengeinfoAttr", 20);
        infoAttrTxt.text = LanguageManager.getlocal("atkraceChallengeinfoAttr", [servantInfoObj.getTotalByWeaponSpecial(6) + ""]);
        infoAttrTxt.x = qualityTxt.x;
        infoAttrTxt.y = qualityTxt.y + 25;
        this.addChild(infoAttrTxt);
        //type 1挑战按钮  //2复仇   //3追杀
        var obj = [];
        obj._servantId = servantId;
        var challengeBtn;
        if (AtkraceCrossChallengeItem.data.type == 1) {
            challengeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "atkraceChallenge", this.challengBtnHandler, this, obj);
        }
        else if (AtkraceCrossChallengeItem.data.type == 2) {
            challengeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "atkraceRevenge", this.challengBtnHandler, this, obj);
        }
        else if (AtkraceCrossChallengeItem.data.type == 3) {
            challengeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "atkraceVisitTab3", this.challengBtnHandler, this, obj);
        }
        challengeBtn.setScale(0.85);
        challengeBtn.x = 400;
        challengeBtn.y = 45;
        this.addChild(challengeBtn);
        challengeBtn.visible = this.isBattleing(servantId);
        if (challengeBtn.visible == false) {
            //已出使
            var usedTxt = ComponentManager.getTextField("gonetowar2", 20, 0xff0000);
            usedTxt.text = LanguageManager.getlocal("gonetowar2");
            usedTxt.width = 200;
            usedTxt.x = 410;
            usedTxt.y = 50;
            this.addChild(usedTxt);
        }
    };
    NewAtkraceCrossChallengeItem.prototype.challengBtnHandler = function (curr) {
        var crossVo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace");
        if (GameData.serverTime > crossVo.et - 86400) {
            // console.log(".....");//只能领奖不能打 
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (Api.atkracecrossVoApi.isCanJoin == false) {
            var crossVo_1 = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace");
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn("atkraceNoDes", crossVo_1.isCrossLeague())));
            return;
        }
        // console.log(AtkraceChallengeItem.data.uid+"a~~~~~~~~~~~~~~");
        var myAtkInfo = Api.atkracecrossVoApi.getMyFightInfo();
        if (myAtkInfo && myAtkInfo.mesid && myAtkInfo.mesid.sid) {
            // let servantInfoObj:ServantInfoVo = Api.servantVoApi.getServantObj(myAtkInfo.mesid.sid);
            var str = LanguageManager.getlocal("atkraceHisbattledes2", [LanguageManager.getlocal("servant_name" + myAtkInfo.mesid.sid)]);
            App.CommonUtil.showTip(str);
        }
        else {
            if (AtkraceCrossChallengeItem.data.type == 3) {
                var useNum = Api.atkracecrossVoApi.getUseTimes2();
                var haveNumber = Api.itemVoApi.getItemNumInfoVoById(1553);
                this.haveNumber = haveNumber;
                var message = LanguageManager.getlocal("atkraceKillbook", [useNum + ""]);
                ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { confirmCallback: this.confirmCallbackHandler, handler: this, icon: "itemicon1553", iconBg: "itembg_1", num: haveNumber, msg: message, id: 1553, useNum: useNum });
            }
            else {
                var useNum = Api.atkracecrossVoApi.getUseTimes2();
                var haveNumber = Api.itemVoApi.getItemNumInfoVoById(1552);
                this.haveNumber = haveNumber;
                var message = LanguageManager.getlocal("atkraceUseChallengebook", [useNum + ""]);
                ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { confirmCallback: this.confirmCallbackHandler, handler: this, icon: "itemicon1552", iconBg: "itembg_1", num: haveNumber, msg: message, id: 1552, useNum: useNum });
            }
        }
    };
    NewAtkraceCrossChallengeItem.prototype.confirmCallbackHandler = function () {
        // 挑战接口
        // 参数 fuid 指定挑战人
        // --参数 servantid 选择自己门客
        // let maxCount:number = Config.AtkraceCfg.getDailyNum();
        // let myInfo:AtkraceInfoVo = Api.atkraceVoApi.getMyInfo();
        var crossVo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace");
        var currActiveId = crossVo.aidAndCode;
        if (GameData.serverTime > crossVo.et - 86400) {
            // console.log(".....");//只能领奖不能打 
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var times1 = Api.atkracecrossVoApi.getUseTimes();
        var times2 = Api.servantVoApi.getServantCount();
        if (times1 >= times2) {
            App.CommonUtil.showTip(LanguageManager.getlocal("newatkraceFightNumLess"));
            return;
        }
        if (AtkraceCrossChallengeItem.data.type == 1) {
            if (this.haveNumber >= this._needNum) {
                var zid = AtkraceCrossChallengeItem.data.zid;
                NetManager.request(NetRequestConst.REQUEST_NEWATKRACECROSS_CHALLENGE, { "fuid": AtkraceCrossChallengeItem.data.uid, "fzid": zid + "", "servantid": this._servantId, "activeId": "" + currActiveId });
                // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_CHALLENGE), this.challengeCallback, this);
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("challengedes"));
            }
        }
        else if (AtkraceCrossChallengeItem.data.type == 2) {
            if (this.haveNumber >= this._needNum) {
                NetManager.request(NetRequestConst.REQUEST_NEWATKRACECROSS_REVENGE, { "fuid": AtkraceCrossChallengeItem.data.uid, "fzid": AtkraceCrossChallengeItem.data.zid + "", "servantid": this._servantId, "activeId": "" + currActiveId, "fKey": Api.atkracecrossVoApi.revengeIdx });
                ViewController.getInstance().hideView(ViewConst.COMMON.NEWATKRACECROSSVISITVIEW);
            }
            else {
                //挑战令不足
                App.CommonUtil.showTip(LanguageManager.getlocal("challengedes"));
            }
        }
        else if (AtkraceCrossChallengeItem.data.type == 3) {
            //追杀令牌
            if (Api.itemVoApi.getItemNumInfoVoById(1553) >= 1) {
                var zid = AtkraceCrossChallengeItem.zid;
                NetManager.request(NetRequestConst.REQUEST_NEWATKRACECROSS_KILL, { "fuid": AtkraceCrossChallengeItem.data.uid, "fzid": zid + "", "servantid": this._servantId, "activeId": "" + currActiveId });
                ViewController.getInstance().hideView(ViewConst.COMMON.NEWATKRACECROSSVISITVIEW);
            }
            else {
                //追杀令不足
                App.CommonUtil.showTip(LanguageManager.getlocal("killdes"));
            }
        }
    };
    //查看更多 挑战回调
    NewAtkraceCrossChallengeItem.prototype.challengeCallback = function (data) {
    };
    NewAtkraceCrossChallengeItem.prototype.dispose = function () {
        this._needNum = 0;
        this._itemNum = 0;
        this._servantId = "";
        this.servantid = "";
        this.haveNumber = null;
        AtkraceCrossChallengeItem.data = [];
        AtkraceCrossChallengeItem.zid = null;
        _super.prototype.dispose.call(this);
    };
    NewAtkraceCrossChallengeItem.prototype.isBattleing = function (servantId) {
        var myInfo = Api.atkracecrossVoApi.getMyInfo();
        var fighttime = Api.atkracecrossVoApi.getUseServantsTimes(servantId);
        if (fighttime < Api.atkracecrossVoApi.getUseTimes2()) {
            return true;
        }
        return false;
    };
    NewAtkraceCrossChallengeItem.data = [];
    NewAtkraceCrossChallengeItem.zid = 0;
    return NewAtkraceCrossChallengeItem;
}(ScrollListItem));
__reflect(NewAtkraceCrossChallengeItem.prototype, "NewAtkraceCrossChallengeItem");
//# sourceMappingURL=NewAtkraceCrossChallengeItem.js.map