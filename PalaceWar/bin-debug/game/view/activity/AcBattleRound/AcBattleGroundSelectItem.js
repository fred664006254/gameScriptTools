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
    AcBattleGroundSelectItem.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcBattleGroundSelectItem.prototype.initItem = function (index, bData, itemparam) {
        var _this = this;
        this.width = 520;
        this.height = 120 + this.getSpaceY();
        // childInfo.total
        this._data = bData;
        this._code = itemparam;
        this._itemIndex = index;
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = this.width;
        bg.height = this.height - this.getSpaceY();
        this.addChild(bg);
        var iconContainer = new BaseDisplayObjectContainer();
        this.addChild(iconContainer);
        var headContainer = Api.playerVoApi.getPlayerCircleHead(Number(bData.pic), bData.ptitle);
        iconContainer.addChild(headContainer);
        iconContainer.width = 103;
        iconContainer.height = 100;
        var nameStr = bData.name;
        this._nameTf = ComponentManager.getTextField(nameStr, 20, TextFieldConst.COLOR_WARN_YELLOW2);
        this.setLayoutPosition(LayoutConst.lefttop, this._nameTf, bg, [iconContainer.x + iconContainer.width + 15, 15]);
        this.addChild(this._nameTf);
        this.setLayoutPosition(LayoutConst.leftverticalCenter, iconContainer, bg, [15, -1]);
        var rankTxt = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundSelectRank-" + this.getUiCode(), [bData.rank]), 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rankTxt, this._nameTf, [0, this._nameTf.textHeight + 17]);
        this.addChild(rankTxt);
        var scoreTxt = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundSelectScore-" + this.getUiCode(), [bData.score]), 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, scoreTxt, rankTxt, [0, rankTxt.textHeight + 8]);
        this.addChild(scoreTxt);
        var tmp = [];
        tmp.uid = bData.uid;
        tmp.battleground = true;
        tmp.code = this._code;
        var killBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "atkraceVisitTab3", function () {
            if (!_this.vo.getAttendQuality()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acBattleRoundNoAttend-" + _this.getUiCode()));
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
            ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDCHALLENGEVIEW);
        }, this);
        killBtn.setScale(0.8);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, killBtn, bg, [11, 15]);
        this.addChild(killBtn);
        var challBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "atkraceChallengeViewTitle", function () {
            if (!_this.vo.getAttendQuality()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acBattleRoundNoAttend-" + _this.getUiCode()));
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
            ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDCHALLENGEVIEW);
        }, this);
        challBtn.setScale(0.8);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, challBtn, killBtn, [killBtn.width * killBtn.scaleX + 7, 0]);
        this.addChild(challBtn);
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
        ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
        // }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
    };
    AcBattleGroundSelectItem.prototype.getSpaceY = function () {
        return 0;
    };
    AcBattleGroundSelectItem.prototype.dispose = function () {
        this._data = null;
        this._itemIndex = null;
        this._nameTf = null;
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundSelectItem;
}(ScrollListItem));
__reflect(AcBattleGroundSelectItem.prototype, "AcBattleGroundSelectItem");
//# sourceMappingURL=AcBattleGroundSelectItem.js.map