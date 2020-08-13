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
var AcBattleGroundChallengeViewTab2 = (function (_super) {
    __extends(AcBattleGroundChallengeViewTab2, _super);
    function AcBattleGroundChallengeViewTab2(data) {
        var _this = _super.call(this) || this;
        _this.servantList = [];
        _this._scrollList = null;
        _this.challengebookNum = 0;
        _this._data = [];
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcBattleGroundChallengeViewTab2.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEGROUND_SUPLIST), this.freshlist, this);
        var _bg = BaseBitmap.create("public_9_bg4");
        _bg.width = 528;
        _bg.height = 590;
        _bg.x = 20;
        _bg.y = 55;
        this.addChild(_bg);
        // 出使条件
        var havenum = Api.itemVoApi.getItemNumInfoVoById("2212");
        var missionTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        missionTxt.text = LanguageManager.getlocal("acBattleGroundTip18-1", [havenum.toString()]);
        missionTxt.x = _bg.x + 10;
        missionTxt.y = _bg.y + 15;
        this.addChild(missionTxt);
        var missionTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(AtkraceChallengeItem.data.type == 3 ? "acBattleGroundTip17-1" : "acBattleGroundTip22-1", [LanguageManager.getlocal("itemName_1552"), LanguageManager.getlocal("itemName_2212")]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        missionTxt2.x = missionTxt.x;
        missionTxt2.y = missionTxt.y + missionTxt.textHeight + 5;
        this.addChild(missionTxt2);
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
        var keys = [];
        //let keys = idList2.concat(idList1);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 528, 515);
        this._scrollList = ComponentManager.getScrollList(AcBattleGroundChallengeItem, keys, rect);
        this.addChild(this._scrollList);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("battlegroundcheertip20-1"));
        this._scrollList.setPosition(20, missionTxt2.y + missionTxt2.height + 10);
        NetManager.request(NetRequestConst.REQUEST_BATTLEGROUND_SUPLIST, {
            activeId: AcConst.AID_BATTLEGROUND + "-" + AtkraceChallengeItem.data.code
        });
    };
    AcBattleGroundChallengeViewTab2.prototype.freshlist = function (evt) {
        if (evt.data.ret && evt.data.data.data) {
            var vo = Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEGROUND, AtkraceChallengeItem.data.code);
            var list = evt.data.data.data.supportlist;
            if (list) {
                var arr = [];
                for (var i in list) {
                    for (var j in list[i]) {
                        var unit = list[i][j];
                        unit.servantId = j;
                        unit.uid = i;
                        unit.isbattle = vo.getIsCheerServantFight(Number(i), Number(j));
                        arr.push(unit);
                    }
                }
                arr.sort(function (a, b) {
                    if (a.isbattle && b.isbattle) {
                        return b.fullattr - a.fullattr;
                    }
                    else if (a.isbattle) {
                        return 1;
                    }
                    else if (b.isbattle) {
                        return -1;
                    }
                    else {
                        return b.fullattr - a.fullattr;
                    }
                });
                this._scrollList.refreshData(arr);
            }
        }
    };
    AcBattleGroundChallengeViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEGROUND_SUPLIST), this.freshlist, this);
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundChallengeViewTab2;
}(PopupViewTab));
__reflect(AcBattleGroundChallengeViewTab2.prototype, "AcBattleGroundChallengeViewTab2");
//# sourceMappingURL=AcBattleGroundChallengeViewTab2.js.map