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
 * 属下门客
 */
var AcBattleGroundChallengeViewTab1 = (function (_super) {
    __extends(AcBattleGroundChallengeViewTab1, _super);
    function AcBattleGroundChallengeViewTab1(data) {
        var _this = _super.call(this) || this;
        _this.servantList = [];
        _this._scrollList = null;
        _this.challengebookNum = 0;
        _this._data = [];
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcBattleGroundChallengeViewTab1.prototype.initView = function () {
        var _bg = BaseBitmap.create("public_9_bg4");
        _bg.width = 528;
        _bg.height = 590;
        _bg.x = 20;
        _bg.y = 55;
        this.addChild(_bg);
        // 出使条件
        var missionTxt = ComponentManager.getTextField("atkracechallengedes", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        missionTxt.text = LanguageManager.getlocal("atkracechallengedes");
        missionTxt.x = _bg.x + 10;
        missionTxt.y = _bg.y + 15;
        this.addChild(missionTxt);
        // 挑战书
        this.challengebookNum = Api.itemVoApi.getItemNumInfoVoById(1552);
        var challengeBookTxt = ComponentManager.getTextField("atkracechallengebook", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        challengeBookTxt.text = LanguageManager.getlocal("atkracechallengebook", [this.challengebookNum + ""]);
        challengeBookTxt.x = missionTxt.x + 400;
        challengeBookTxt.y = missionTxt.y;
        if (PlatformManager.checkIsTextHorizontal()) {
            challengeBookTxt.x = 570 - challengeBookTxt.width - 10;
        }
        this.addChild(challengeBookTxt);
        if (AtkraceChallengeItem.data.type == 3) {
            // 追杀令
            this.challengebookNum = Api.itemVoApi.getItemNumInfoVoById(1553);
            challengeBookTxt.text = LanguageManager.getlocal("atkracekill", [this.challengebookNum + ""]);
            if (PlatformManager.checkIsThSp()) {
                challengeBookTxt.x = this.x + this.width - challengeBookTxt.width - 30;
            }
        }
        else {
            //挑战书
            this.challengebookNum = Api.itemVoApi.getItemNumInfoVoById(1552);
            challengeBookTxt.text = LanguageManager.getlocal("atkracechallengebook", [this.challengebookNum + ""]);
        }
        if (PlatformManager.checkIsTextHorizontal()) {
            challengeBookTxt.x = this.x + this.width - challengeBookTxt.width - 30;
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
        //let keys = idList2.concat(idList1);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 528, 535);
        this._scrollList = ComponentManager.getScrollList(AtkraceChallengeItem, keys, rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(20, missionTxt.y + missionTxt.height + 10);
    };
    AcBattleGroundChallengeViewTab1.prototype.isBattleing = function (servantId) {
        //let myInfo:AtkraceInfoVo = Api.atkraceVoApi.getMyInfo();
        var myInfo = null;
        if (AtkraceChallengeItem.data.battleground) {
            var vo = Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEGROUND, AtkraceChallengeItem.data.code);
            myInfo = vo.getMyInfo();
        }
        else {
            myInfo = Api.atkraceVoApi.getMyInfo();
        }
        for (var key in myInfo.asids) {
            if (myInfo.asids[key] == servantId)
                return true;
        }
        return false;
    };
    AcBattleGroundChallengeViewTab1.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundChallengeViewTab1;
}(PopupViewTab));
__reflect(AcBattleGroundChallengeViewTab1.prototype, "AcBattleGroundChallengeViewTab1");
//# sourceMappingURL=AcBattleGroundChallengeViewTab1.js.map