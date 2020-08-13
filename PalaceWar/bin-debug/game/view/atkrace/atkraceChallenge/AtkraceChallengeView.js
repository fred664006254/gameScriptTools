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
var AtkraceChallengeView = (function (_super) {
    __extends(AtkraceChallengeView, _super);
    function AtkraceChallengeView() {
        var _this = _super.call(this) || this;
        //挑战界面  //复仇  
        _this.servantList = [];
        _this._scrollList = null;
        _this.challengebookNum = 0;
        _this._data = [];
        return _this;
    }
    AtkraceChallengeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AtkraceChallengeView.prototype.getTitleStr = function () {
        //type 1挑战按钮  //2复仇   //3追杀
        if (AtkraceChallengeItem.data) {
            if (AtkraceChallengeItem.data.type == 1) {
                return "atkraceChallenge";
            }
            else if (AtkraceChallengeItem.data.type == 2) {
                return "atkraceRevenge";
            }
            else if (AtkraceChallengeItem.data.type == 3) {
                return "atkraceVisitTab3";
            }
        }
    };
    AtkraceChallengeView.prototype.resetBgSize = function () {
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
        this.setLayoutPosition(LayoutConst.lefttop, missionTxt, _bg, [1, -24]);
        // missionTxt.x = _bg.x+20;
        // missionTxt.y = _bg.y-24;
        this.addChild(missionTxt);
        // 挑战书
        this.challengebookNum = Api.itemVoApi.getItemNumInfoVoById(1552);
        var challengeBookTxt = ComponentManager.getTextField("atkracechallengebook", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        challengeBookTxt.text = LanguageManager.getlocal("atkracechallengebook", [this.challengebookNum + ""]);
        this.setLayoutPosition(LayoutConst.righttop, challengeBookTxt, _bg, [3, -24]);
        // challengeBookTxt.x =missionTxt.x+400;
        // challengeBookTxt.y = missionTxt.y;
        if (PlatformManager.checkIsTextHorizontal()) {
            challengeBookTxt.x = 570 - challengeBookTxt.width - 10;
        }
        this.addChild(challengeBookTxt);
        if (AtkraceChallengeItem.data.type == 3) {
            // 追杀令
            this.challengebookNum = Api.itemVoApi.getItemNumInfoVoById(1553);
            challengeBookTxt.text = LanguageManager.getlocal("atkracekill", [this.challengebookNum + ""]);
            if (PlatformManager.checkIsThSp()) {
                challengeBookTxt.x = this.viewBg.x + this.viewBg.width - challengeBookTxt.width - 30;
            }
        }
        else {
            //挑战书
            this.challengebookNum = Api.itemVoApi.getItemNumInfoVoById(1552);
            challengeBookTxt.text = LanguageManager.getlocal("atkracechallengebook", [this.challengebookNum + ""]);
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
        rect.setTo(0, 0, 528, _bg.height - 15);
        this._scrollList = ComponentManager.getScrollList(AtkraceChallengeItem, keys, rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(55, _bg.y + 5);
    };
    AtkraceChallengeView.prototype.initView = function () {
    };
    // public isBattleing(servantId:string)
    //  {
    // 	let myInfo:AtkraceInfoVo = Api.atkraceVoApi.getMyInfo();
    //     for (var key in myInfo.asids) {
    //         if(myInfo.asids[key] == servantId)
    //             return true;
    //     }
    //     return false;
    // }
    AtkraceChallengeView.prototype.isBattleing = function (servantId) {
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
    AtkraceChallengeView.prototype.getShowHeight = function () {
        return 660;
    };
    AtkraceChallengeView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.challengebookNum = 0;
        this.servantList = [];
        this._data = null;
    };
    return AtkraceChallengeView;
}(PopupView));
__reflect(AtkraceChallengeView.prototype, "AtkraceChallengeView");
//# sourceMappingURL=AtkraceChallengeView.js.map