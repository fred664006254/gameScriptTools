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
    /**生成新标头 */
    AtkraceChallengeView.prototype.isHaveTitle = function () {
        return true;
    };
    AtkraceChallengeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "popupview_bg3"
        ]);
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
        //  let _bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
        // _bg.width = 528;
        // _bg.height = 550;
        // _bg.x = 55
        // _bg.y = this.titleTF.y+80;
        // this.addChild(_bg);
        // 出使条件
        var missionTxt = ComponentManager.getTextField("atkracechallengedes", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW_NEW);
        missionTxt.text = LanguageManager.getlocal("atkracechallengedes");
        missionTxt.x = 55 + 20;
        missionTxt.y = 32;
        this.addChildToContainer(missionTxt);
        // 挑战书
        this.challengebookNum = Api.itemVoApi.getItemNumInfoVoById(1552);
        var challengeBookTxt = ComponentManager.getTextField("atkracechallengebook", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW_NEW);
        challengeBookTxt.text = LanguageManager.getlocal("atkracechallengebook", [this.challengebookNum + ""]);
        challengeBookTxt.x = missionTxt.x + 370;
        challengeBookTxt.y = missionTxt.y;
        this.addChildToContainer(challengeBookTxt);
        if (AtkraceChallengeItem.data.type == 3) {
            // 追杀令
            this.challengebookNum = Api.itemVoApi.getItemNumInfoVoById(1553);
            challengeBookTxt.text = LanguageManager.getlocal("atkracekill", [this.challengebookNum + ""]);
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
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 520, 560);
        this._scrollList = ComponentManager.getScrollList(AtkraceChallengeItem, keys, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(this.viewBg.width / 2 - this._scrollList.width / 2, 80);
    };
    AtkraceChallengeView.prototype.initView = function () {
        // let newTitleBg = BaseBitmap.create("popupview_bg3");
        // newTitleBg.x = this.viewBg.width/2 - newTitleBg.width/2;
        // newTitleBg.y = this.viewBg.y-5;
        // newTitleBg.name = "newTitleBg";
        // this.addChildToContainer(newTitleBg);
        // newTitleBg.height = 600;
        var bg = this.container.getChildByName("newTitleBg");
        bg.height = 658;
    };
    AtkraceChallengeView.prototype.isBattleing = function (servantId) {
        var myInfo = Api.atkraceVoApi.getMyInfo();
        for (var key in myInfo.asids) {
            if (myInfo.asids[key] == servantId)
                return true;
        }
        return false;
    };
    AtkraceChallengeView.prototype.getShowHeight = function () {
        return 750;
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
