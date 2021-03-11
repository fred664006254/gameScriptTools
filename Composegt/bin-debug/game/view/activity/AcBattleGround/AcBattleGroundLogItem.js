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
 对战信息logitem
 * author qianjun
 */
var AcBattleGroundLogItem = (function (_super) {
    __extends(AcBattleGroundLogItem, _super);
    function AcBattleGroundLogItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcBattleGroundLogItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundLogItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundLogItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundLogItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_BATTLEGROUND;
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundLogItem.prototype.initItem = function (index, data, itemparam) {
        var _this = this;
        var view = this;
        this.width = 620;
        this.height = 118 + this.getSpaceY();
        // childInfo.total
        this._data = data;
        this._code = itemparam;
        this._itemIndex = index;
        var nameTxt = ComponentManager.getTextField(index + 1 + ". " + data.playerName + "<font color=0xfedb38>" + LanguageManager.getlocal("atkraceyamenid", [data.uid]) + "</font>", 20, TextFieldConst.COLOR_WHITE);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, nameTxt, view, [0, 5]);
        view.addChild(nameTxt);
        var textStr = '';
        if (1) {
            //击败｜｜全歼
            var str = "";
            if (data.info.type == 1) {
                str = LanguageManager.getlocal("atkracebeat");
            }
            else {
                str = LanguageManager.getlocal("atkraceAnnihilation");
            }
            //描述    
            var servantName = Config.ServantCfg.getServantItemById(data.info.sid).name;
            //  (1随机 2复仇 3挑战 4追杀 5出师令)
            if (data.info.atype && data.info.atype == 2) {
                if (data.info.streak && data.info.streak >= 3) {
                    textStr = LanguageManager.getlocal("acBattleStraight_1", [servantName, str, data.info.uname2, data.info.fightnum, data.info.streak]);
                }
                else {
                    textStr = LanguageManager.getlocal("acBattleDescription_1", [servantName, str, data.info.uname2, data.info.fightnum]);
                }
            }
            else if (data.info.atype == 4) {
                if (data.info.streak && data.info.streak >= 3) {
                    textStr = LanguageManager.getlocal("acBattleStraight_4_2", [servantName, str, data.info.uname2, data.info.fightnum, data.info.streak]);
                }
                else {
                    textStr = LanguageManager.getlocal("acBattleDescription_4", [servantName, str, data.info.uname2, data.info.fightnum]);
                }
            }
            else {
                if (data.info.streak && data.info.streak >= 3) {
                    textStr = LanguageManager.getlocal("acBattleStraight", [servantName, str, data.info.uname2, data.info.fightnum, data.info.streak]);
                }
                else {
                    textStr = LanguageManager.getlocal("acBattleDescription", [servantName, str, data.info.uname2, data.info.fightnum]);
                }
            }
        }
        var descTxt = ComponentManager.getTextField(textStr, 18, TextFieldConst.COLOR_WHITE);
        descTxt.width = 450;
        descTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descTxt, nameTxt, [24, nameTxt.textHeight + 10]);
        view.addChild(descTxt);
        var timeTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acBattileGroundTime"), [App.DateUtil.getFormatBySecond(data.time, 2)]), 18, 0xc68739);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, timeTxt, view, [descTxt.x, 10]);
        view.addChild(timeTxt);
        var line = BaseBitmap.create("atkrace_xian_1");
        line.width = view.width;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, line, view);
        this.addChild(line);
        var challBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "atkraceChallengeViewTitle", function () {
            if (!_this.vo.getAttendQuality()) {
                App.CommonUtil.showTip(LanguageManager.getlocal(_this.getDefaultCn("acBattleRoundNoAttend")));
                return;
            }
            if (_this.vo.isActyEnd()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
                return;
            }
            if (view.vo.getCurperiod() == 3) {
                App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime4"));
                return;
            }
            if (!_this.vo.getJoinIn()) {
                App.CommonUtil.showTip(LanguageManager.getlocal(_this.getDefaultCn("acBattleGroundTip4")));
                return;
            }
            var tmp = [];
            tmp.type = 1; //挑战
            tmp.battleground = true;
            tmp.uid = data.uid;
            tmp.code = _this._code;
            AtkraceChallengeItem.data = tmp;
            ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECHALLENGEVIEW);
        }, this);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, challBtn, view, [0, 20]);
        challBtn.visible = data.uid != Api.playerVoApi.getPlayerID();
        this.addChild(challBtn);
    };
    AcBattleGroundLogItem.prototype.clickItemHandler = function (event) {
        this.showUserInfo();
    };
    AcBattleGroundLogItem.prototype.getDefaultCn = function (cnName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (LanguageManager.checkHasKey(cnName + "-" + this.code)) {
            return cnName + "-" + this.code;
        }
        else {
            return cnName + "-" + defaultCode;
        }
    };
    AcBattleGroundLogItem.prototype.showUserInfo = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT, { ruid: this._data.uid });
    };
    AcBattleGroundLogItem.prototype.userShotCallback = function (event) {
        var data = event.data.data.data;
        // if(String(data.ruid) == this._chatData.sender)
        // {
        ViewController.getInstance().openView(ViewConst.COMMON.RANKUSERINFOVIEW, data);
        // }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
    };
    AcBattleGroundLogItem.prototype.cancelBlock = function () {
        var data = this._data;
        if (data.type == 'choosevisit') {
            var itemid = 1411;
            var info = Api.adultVoApi.getAdultInfoVoById(this._data.childid);
            var itemUseCount = Api.adultVoApi.getVisitUseByQuality(info.aquality);
            var itemCount = Api.itemVoApi.getItemNumInfoVoById(itemid);
            var itemCfg = Config.ItemCfg.getItemCfgById(itemid);
            var message = LanguageManager.getlocal("adultvisiconfirm", [itemCfg.name + "x" + itemUseCount, this._data.name]);
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, {
                confirmCallback: this.useItemConfirmCallbackHandler,
                handler: this,
                icon: itemCfg.icon,
                iconBg: itemCfg.iconBg,
                num: itemCount,
                useNum: itemUseCount,
                msg: message,
                id: itemid
            });
        }
        else {
            //this.request(NetRequestConst.REQUEST_RADULT_PROPOSE, { childId: this._adultInfoVo.id });
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_CHOOSE_SADUNMARRY, { "fuid": this._data.uid, "childId": this._data.id });
            // NetManager.request(NetRequestConst.REQUEST_RADULT_PROPOSE, {
            // 	childId : this._data.childid, 
            // 	fuid : this._data.uid ,
            // 	protype : 2
            // });
            // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_CLICKMARRY,{"id":this._data.id,"childId":this._data.childId});
        }
    };
    AcBattleGroundLogItem.prototype.useItemConfirmCallbackHandler = function (evt) {
        NetManager.request(NetRequestConst.REQUEST_SADUN_VISIT, {
            childId: this._data.childid,
            fuid: this._data.uid,
            protype: 3
        });
        Api.adultVoApi.setVisitId(this._data.uid);
        //App.CommonUtil.showTip(LanguageManager.getlocal('adultissendVisit'));
    };
    AcBattleGroundLogItem.prototype.doShield = function () {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CANCEBLOCK, { "uid": this._data.uid, "name": this._data.name });
    };
    AcBattleGroundLogItem.prototype.getSpaceY = function () {
        return 0;
    };
    AcBattleGroundLogItem.prototype.dispose = function () {
        this._data = null;
        // this._applyBtn = null;
        // this._cancelApplyBtn = null;
        this._itemIndex = null;
        this._nameTf = null;
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundLogItem;
}(ScrollListItem));
__reflect(AcBattleGroundLogItem.prototype, "AcBattleGroundLogItem");