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
 选择对战信息列表
 * author qianjun
 */
var AcBattleGroundSelectItem = (function (_super) {
    __extends(AcBattleGroundSelectItem, _super);
    function AcBattleGroundSelectItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcBattleGroundSelectItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundSelectItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundSelectItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundSelectItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_BATTLEGROUND;
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundSelectItem.prototype.initItem = function (index, bData, itemparam) {
        var _this = this;
        this.width = 520;
        this.height = 140 + this.getSpaceY();
        // childInfo.total
        this._data = bData;
        this._code = itemparam;
        this._itemIndex = index;
        var bg = BaseBitmap.create("public_listbg");
        bg.width = this.width;
        bg.height = this.height - this.getSpaceY();
        this.addChild(bg);
        var leftBg = BaseBitmap.create("public_left");
        leftBg.width = 130;
        leftBg.height = 120;
        leftBg.x = 5.5;
        leftBg.y = 5.5;
        this.addChild(leftBg);
        var iconContainer = new BaseDisplayObjectContainer();
        this.addChild(iconContainer);
        var headContainer = Api.playerVoApi.getPlayerCircleHead(Number(bData.pic), Number(bData.ptitle));
        iconContainer.addChild(headContainer);
        iconContainer.width = 103;
        iconContainer.height = 100;
        var nameStr = bData.name + " " + Api.mergeServerVoApi.getAfterMergeSeverName(bData.uid);
        this._nameTf = ComponentManager.getTextField(nameStr, 20, TextFieldConst.COLOR_BROWN);
        this.setLayoutPosition(LayoutConst.lefttop, this._nameTf, bg, [leftBg.x + leftBg.width + 15, 30]);
        this.addChild(this._nameTf);
        this.setLayoutPosition(LayoutConst.leftverticalCenter, iconContainer, bg, [15, -8]);
        var rankTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundSelectRank"), [bData.rank]), 20, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rankTxt, this._nameTf, [0, this._nameTf.textHeight + 17]);
        this.addChild(rankTxt);
        var scoreTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundSelectScore"), [bData.score]), 20, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, scoreTxt, rankTxt, [0, rankTxt.textHeight + 8]);
        this.addChild(scoreTxt);
        var tmp = [];
        tmp.uid = bData.uid;
        tmp.battleground = true;
        tmp.code = this._code;
        var killBtn = ComponentManager.getButton(ButtonConst.BTN_COMMON, "atkraceVisitTab3", function () {
            if (!_this.vo.getAttendQuality()) {
                App.CommonUtil.showTip(LanguageManager.getlocal(_this.getDefaultCn("acBattleRoundNoAttend")));
                return;
            }
            if (_this.vo.isActyEnd()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
                return;
            }
            if (_this.vo.getCurperiod() == 3) {
                App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime4"));
                return;
            }
            //追杀
            tmp.type = 3; //追杀
            AtkraceChallengeItem.data = tmp;
            ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECHALLENGEVIEW);
        }, this);
        killBtn.setScale(0.65);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, killBtn, bg, [15, 20]);
        this.addChild(killBtn);
        var challBtn = ComponentManager.getButton(ButtonConst.BTN_COMMON, "atkraceChallengeViewTitle", function () {
            if (!_this.vo.getAttendQuality()) {
                App.CommonUtil.showTip(LanguageManager.getlocal(_this.getDefaultCn("acBattleRoundNoAttend")));
                return;
            }
            if (_this.vo.isActyEnd()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
                return;
            }
            if (_this.vo.getCurperiod() == 3) {
                App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime4"));
                return;
            }
            //挑战
            tmp.type = 1; //挑战
            AtkraceChallengeItem.data = tmp;
            ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECHALLENGEVIEW);
        }, this);
        challBtn.setScale(0.65);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, challBtn, killBtn, [0, killBtn.height * killBtn.scaleX + 10]);
        this.addChild(challBtn);
    };
    AcBattleGroundSelectItem.prototype.getDefaultCn = function (cnName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (LanguageManager.checkHasKey(cnName + "-" + this.code)) {
            return cnName + "-" + this.code;
        }
        else {
            return cnName + "-" + defaultCode;
        }
    };
    AcBattleGroundSelectItem.prototype.clickItemHandler = function (event) {
        this.showUserInfo();
    };
    AcBattleGroundSelectItem.prototype.showUserInfo = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT, { ruid: this._data.uid });
    };
    AcBattleGroundSelectItem.prototype.userShotCallback = function (event) {
        var data = event.data.data.data;
        // if(String(data.ruid) == this._chatData.sender)
        // {
        ViewController.getInstance().openView(ViewConst.COMMON.RANKUSERINFOVIEW, data);
        // }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
    };
    AcBattleGroundSelectItem.prototype.cancelBlock = function () {
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
    AcBattleGroundSelectItem.prototype.useItemConfirmCallbackHandler = function (evt) {
        NetManager.request(NetRequestConst.REQUEST_SADUN_VISIT, {
            childId: this._data.childid,
            fuid: this._data.uid,
            protype: 3
        });
        Api.adultVoApi.setVisitId(this._data.uid);
        //App.CommonUtil.showTip(LanguageManager.getlocal('adultissendVisit'));
    };
    AcBattleGroundSelectItem.prototype.doShield = function () {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CANCEBLOCK, { "uid": this._data.uid, "name": this._data.name });
    };
    AcBattleGroundSelectItem.prototype.getSpaceY = function () {
        return 0;
    };
    AcBattleGroundSelectItem.prototype.dispose = function () {
        this._data = null;
        // this._applyBtn = null;
        // this._cancelApplyBtn = null;
        this._itemIndex = null;
        this._nameTf = null;
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundSelectItem;
}(ScrollListItem));
__reflect(AcBattleGroundSelectItem.prototype, "AcBattleGroundSelectItem");
