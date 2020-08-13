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
var AtkraceCrossChallengeView = (function (_super) {
    __extends(AtkraceCrossChallengeView, _super);
    function AtkraceCrossChallengeView() {
        var _this = _super.call(this) || this;
        //挑战界面  //复仇  
        _this.servantList = [];
        _this._scrollList = null;
        _this.challengebookNum = 0;
        _this._data = [];
        return _this;
    }
    AtkraceCrossChallengeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AtkraceCrossChallengeView.prototype.getTitleStr = function () {
        //type 1挑战按钮  //2复仇   //3追杀
        if (AtkraceCrossChallengeItem.data) {
            if (AtkraceCrossChallengeItem.data.type == 1) {
                return "atkraceCrossChallenge";
            }
            else if (AtkraceCrossChallengeItem.data.type == 2) {
                return "atkraceCrossRevenge";
            }
            else if (AtkraceCrossChallengeItem.data.type == 3) {
                return "atkraceCrossVisitTab3";
            }
        }
    };
    AtkraceCrossChallengeView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        //  var a  =  this.titleTF.y;
        var _bg = BaseBitmap.create("public_9_bg4");
        _bg.width = 528;
        _bg.height = 550;
        _bg.x = 55;
        _bg.y = this.titleTF.y + 65;
        this.addChild(_bg);
        // 出使条件
        var missionTxt = ComponentManager.getTextField("atkracechallengedes", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        missionTxt.text = LanguageManager.getlocal("atkracechallengedes");
        missionTxt.x = _bg.x + 20;
        missionTxt.y = _bg.y - 24;
        this.addChild(missionTxt);
        // 挑战书
        this.challengebookNum = Api.itemVoApi.getItemNumInfoVoById(1552);
        var challengeBookTxt = ComponentManager.getTextField("atkracechallengebook", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        challengeBookTxt.text = LanguageManager.getlocal("atkracechallengebook", [this.challengebookNum + ""]);
        challengeBookTxt.x = missionTxt.x + 400;
        challengeBookTxt.y = missionTxt.y;
        this.addChild(challengeBookTxt);
        if (AtkraceCrossChallengeItem.data.type == 3) {
            // 追杀令
            this.challengebookNum = Api.itemVoApi.getItemNumInfoVoById(1553);
            challengeBookTxt.text = LanguageManager.getlocal("atkracekill", [this.challengebookNum + ""]);
        }
        else {
            //挑战书
            this.challengebookNum = Api.itemVoApi.getItemNumInfoVoById(1552);
            challengeBookTxt.text = LanguageManager.getlocal("atkracechallengebook", [this.challengebookNum + ""]);
        }
        if (PlatformManager.checkIsTextHorizontal()) {
            challengeBookTxt.setPosition(_bg.x + _bg.width - challengeBookTxt.width - 10, missionTxt.y);
        }
        var idList = Api.servantVoApi.getServantCountLevel60PlusList();
        var idList1 = [];
        var idList2 = [];
        for (var index = 0; index < idList.length; index++) {
            var key = idList[index];
            if (!this.isBattleing(key)) {
                idList1.push(key);
            }
            else {
                idList2.push(key);
            }
        }
        var keys = idList1.concat(idList2);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 528, _bg.height - 15);
        this._scrollList = ComponentManager.getScrollList(AtkraceCrossChallengeItem, keys, rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(55, _bg.y + 5);
    };
    AtkraceCrossChallengeView.prototype.initView = function () {
    };
    AtkraceCrossChallengeView.prototype.isBattleing = function (servantId) {
        var myInfo = Api.atkracecrossVoApi.getMyInfo();
        for (var key in myInfo.asids) {
            if (myInfo.asids[key] == servantId)
                return true;
        }
        return false;
    };
    AtkraceCrossChallengeView.prototype.getShowHeight = function () {
        return 660;
    };
    AtkraceCrossChallengeView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.challengebookNum = 0;
        this.servantList = [];
        this._data = null;
    };
    return AtkraceCrossChallengeView;
}(PopupView));
__reflect(AtkraceCrossChallengeView.prototype, "AtkraceCrossChallengeView");
//# sourceMappingURL=AtkraceCrossChallengeView.js.map