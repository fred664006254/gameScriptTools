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
var AcBattleGroundChallengeItem = (function (_super) {
    __extends(AcBattleGroundChallengeItem, _super);
    function AcBattleGroundChallengeItem() {
        var _this = _super.call(this) || this;
        //挑战界面的Itme
        _this._needNum = 0;
        _this._itemNum = 0;
        _this._servantId = "";
        _this.haveNumber = 0;
        _this.servantid = "";
        _this._mainTaskHandKey = null;
        _this._data = null;
        return _this;
    }
    AcBattleGroundChallengeItem.prototype.initItem = function (index, data) {
        var _this = this;
        this._needNum = 1; //需要的挑战书数量
        this._data = data;
        this._servantId = data.servantId;
        var servantInfoObj = data;
        var bottomBg = BaseBitmap.create("public_9_probiginnerbg");
        bottomBg.width = 510;
        bottomBg.height = 120;
        bottomBg.x = 9;
        this.addChild(bottomBg);
        var deltaScale = 0.55;
        var cardbg = BaseLoadBitmap.create("servant_cardbg_" + servantInfoObj.clv);
        cardbg.width = 194;
        cardbg.height = 192;
        cardbg.setScale(deltaScale);
        cardbg.x = 20;
        cardbg.y = 8;
        cardbg.name = "cardbg";
        this.addChild(cardbg);
        var config = Config.ServantCfg.getServantItemById(data.servantId);
        var res = "";
        if (data.equip && data.equip != "") {
            res = "skin_half_" + data.equip;
        }
        else {
            res = config.halfIcon;
        }
        var servantImg = BaseLoadBitmap.create(res);
        servantImg.width = 180;
        servantImg.height = 177;
        servantImg.x = cardbg.x + cardbg.width / 2 - servantImg.width / 2 - 5;
        servantImg.y = cardbg.y + cardbg.height / 2 - servantImg.height / 2 - 2;
        servantImg.setScale(deltaScale);
        this.addChild(servantImg);
        //名字
        var nameTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_QUALITY_BLUE);
        nameTxt.textColor = ServantScrollItem.getQualityColor(servantInfoObj.clv);
        nameTxt.text = config.name;
        nameTxt.x = 140;
        nameTxt.y = 10;
        this.addChild(nameTxt);
        var tiptxt = ComponentManager.getTextField(LanguageManager.getlocal("battlegroundcheertip19-1", [data.name]), 20);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tiptxt, nameTxt, [nameTxt.textWidth, 0]);
        this.addChild(tiptxt);
        //等级
        var levelTxt = ComponentManager.getTextField("atkraceChallengeleve", 20);
        levelTxt.text = LanguageManager.getlocal("atkraceChallengeleve", [servantInfoObj.lv + ""]);
        levelTxt.width = 200;
        levelTxt.x = nameTxt.x;
        levelTxt.y = nameTxt.y + 25;
        this.addChild(levelTxt);
        //资质
        var qualityTxt = ComponentManager.getTextField("atkraceChallengequality", 20);
        qualityTxt.text = LanguageManager.getlocal("atkraceChallengequality", [servantInfoObj.ability + ""]);
        qualityTxt.x = levelTxt.x;
        qualityTxt.y = levelTxt.y + 25;
        this.addChild(qualityTxt);
        //属性
        var infoAttrTxt = ComponentManager.getTextField("atkraceChallengeinfoAttr", 20);
        infoAttrTxt.text = LanguageManager.getlocal("atkraceChallengeinfoAttr", [servantInfoObj.fullattr + ""]);
        infoAttrTxt.x = qualityTxt.x;
        infoAttrTxt.y = qualityTxt.y + 25;
        this.addChild(infoAttrTxt);
        //type 1挑战按钮  //2复仇   //3追杀
        var obj = [];
        obj._servantId = this._servantId;
        var challengeBtn;
        if (AtkraceChallengeItem.data.type == 1) {
            challengeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "atkraceChallenge", this.challengBtnHandler, this, obj);
        }
        else if (AtkraceChallengeItem.data.type == 2) {
            challengeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "atkraceRevenge", this.challengBtnHandler, this, obj);
        }
        else if (AtkraceChallengeItem.data.type == 3) {
            challengeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "atkraceVisitTab3", this.challengBtnHandler, this, obj);
        }
        challengeBtn.setScale(0.85);
        challengeBtn.x = 400;
        challengeBtn.y = 45;
        this.addChild(challengeBtn);
        if (data.isbattle) {
            challengeBtn.visible = false;
            var usedTxt = ComponentManager.getTextField("gonetowar3", 20, 0xff0000);
            usedTxt.text = LanguageManager.getlocal("gonetowar3");
            usedTxt.width = 200;
            usedTxt.x = 430;
            usedTxt.y = 50;
            this.addChild(usedTxt);
        }
        if (AtkraceChallengeItem.data.type == 1) {
            egret.callLater(function () {
                _this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(challengeBtn, challengeBtn.width / 2, challengeBtn.height / 2, [challengeBtn], 603, true, function () {
                    if (index === 0) {
                        this.parent.setChildIndex(this, 100);
                        return true;
                    }
                    else {
                        return false;
                    }
                }, _this);
            }, this);
        }
    };
    AcBattleGroundChallengeItem.prototype.challengBtnHandler = function (curr) {
        // console.log(AtkraceChallengeItem.data.uid+"a~~~~~~~~~~~~~~");
        var myAtkInfo = null;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEGROUND, AtkraceChallengeItem.data.code);
        myAtkInfo = vo.getMyFightInfo();
        if (myAtkInfo && myAtkInfo.mesid && myAtkInfo.mesid.sid) {
            // let servantInfoObj:ServantInfoVo = Api.servantVoApi.getServantObj(myAtkInfo.mesid.sid);
            var str = LanguageManager.getlocal("atkraceHisbattledes2", [LanguageManager.getlocal("servant_name" + myAtkInfo.mesid.sid)]);
            App.CommonUtil.showTip(str);
        }
        else {
            if (AtkraceChallengeItem.data.type == 3) {
                var haveNumber = Api.itemVoApi.getItemNumInfoVoById(1553);
                var message = LanguageManager.getlocal("acBattleGroundTip20-1", [1 + ""]);
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: message,
                    title: "itemUseConstPopupViewTitle",
                    touchMaskClose: true,
                    callback: this.confirmCallbackHandler,
                    handler: this,
                    needClose: 1,
                    needCancel: true
                });
            }
            else {
                var haveNumber = Api.itemVoApi.getItemNumInfoVoById(1552);
                var message = LanguageManager.getlocal("acBattleGroundTip21-1", [1 + ""]);
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: message,
                    title: "itemUseConstPopupViewTitle",
                    touchMaskClose: true,
                    callback: this.confirmCallbackHandler,
                    handler: this,
                    needClose: 1,
                    needCancel: true
                });
            }
        }
    };
    AcBattleGroundChallengeItem.prototype.confirmCallbackHandler = function () {
        // 挑战接口
        // 参数 fuid 指定挑战人
        // --参数 servantid 选择自己门客
        // let maxCount:number = Config.AtkraceCfg.getDailyNum();
        // let myInfo:AtkraceInfoVo = Api.atkraceVoApi.getMyInfo();
        if (AtkraceChallengeItem.data.type == 1) {
            if (Api.itemVoApi.getItemNumInfoVoById(1552) >= 1 && Api.itemVoApi.getItemNumInfoVoById(2212) >= 1) {
                var vo = Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEGROUND, AtkraceChallengeItem.data.code);
                if (vo.isActyEnd()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
                    return;
                }
                NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_CHALLENGE, {
                    "fuid": AtkraceChallengeItem.data.uid,
                    "servantid": this._servantId,
                    "activeId": AcConst.AID_BATTLEGROUND + "-" + AtkraceChallengeItem.data.code,
                    "supportsid": this._data.servantId,
                    "supportuid": this._data.uid,
                });
                // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_CHALLENGE), this.challengeCallback, this);
            }
            else {
                if (Api.itemVoApi.getItemNumInfoVoById(1552) <= 0) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("challengedes"));
                }
                else {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acBattleGroundTip19-1"));
                }
            }
        }
        else if (AtkraceChallengeItem.data.type == 2) {
            if (Api.itemVoApi.getItemNumInfoVoById(1552) >= 1 && Api.itemVoApi.getItemNumInfoVoById(2212) >= 1) {
                var vo = Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEGROUND, AtkraceChallengeItem.data.code);
                if (vo.isActyEnd()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
                    return;
                }
                NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_REVENGE, {
                    "fuid": AtkraceChallengeItem.data.uid,
                    "servantid": this._servantId,
                    "fKey": AtkraceChallengeItem.data.fkey,
                    "activeId": AcConst.AID_BATTLEGROUND + "-" + AtkraceChallengeItem.data.code,
                    ownuid: AtkraceChallengeItem.data.ownuid,
                    supportsid: this._data.servantId,
                    supportuid: this._data.uid
                });
                // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_REVENGE), this.challengeCallback, this);
            }
            else {
                //挑战令不足
                if (Api.itemVoApi.getItemNumInfoVoById(1552) <= 0) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("challengedes"));
                }
                else {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acBattleGroundTip19-1"));
                }
            }
        }
        else if (AtkraceChallengeItem.data.type == 3) {
            //追杀令牌
            if (Api.itemVoApi.getItemNumInfoVoById(1553) >= 1 && Api.itemVoApi.getItemNumInfoVoById(2212) >= 1) {
                var vo = Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEGROUND, AtkraceChallengeItem.data.code);
                if (vo.isActyEnd()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
                    return;
                }
                NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_KILL, {
                    "fuid": AtkraceChallengeItem.data.uid,
                    "servantid": this._servantId,
                    "activeId": AcConst.AID_BATTLEGROUND + "-" + AtkraceChallengeItem.data.code,
                    supportsid: this._data.servantId,
                    supportuid: this._data.uid
                });
                // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_KILL), this.challengeCallback, this);
            }
            else {
                if (Api.itemVoApi.getItemNumInfoVoById(1553) <= 0) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("killdes"));
                }
                else {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acBattleGroundTip19-1"));
                }
                //追杀令不足
            }
        }
    };
    //查看更多 挑战回调
    AcBattleGroundChallengeItem.prototype.challengeCallback = function (data) {
    };
    AcBattleGroundChallengeItem.prototype.dispose = function () {
        this._needNum = 0;
        this._itemNum = 0;
        this._servantId = "";
        this.servantid = "";
        this.haveNumber = 0;
        AtkraceChallengeItem.data = [];
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        _super.prototype.dispose.call(this);
    };
    AcBattleGroundChallengeItem.prototype.isBattleing = function (servantId) {
        //let myInfo:AtkraceInfoVo = Api.atkraceVoApi.getMyInfo();
        var myInfo = null;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEGROUND, AtkraceChallengeItem.data.code);
        myInfo = vo.getMyInfo();
        for (var key in myInfo.asids) {
            if (myInfo.asids[key] == servantId)
                return false;
        }
        return true;
    };
    return AcBattleGroundChallengeItem;
}(ScrollListItem));
__reflect(AcBattleGroundChallengeItem.prototype, "AcBattleGroundChallengeItem");
//# sourceMappingURL=AcBattleGroundChallengeItem.js.map