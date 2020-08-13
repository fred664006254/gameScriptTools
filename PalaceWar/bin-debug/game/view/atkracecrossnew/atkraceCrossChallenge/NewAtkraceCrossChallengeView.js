var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NewAtkraceCrossChallengeView = /** @class */ (function (_super) {
    __extends(NewAtkraceCrossChallengeView, _super);
    function NewAtkraceCrossChallengeView() {
        var _this = _super.call(this) || this;
        //挑战界面  //复仇  
        _this.servantList = [];
        _this._scrollList = null;
        _this.challengebookNum = 0;
        _this._data = [];
        _this._costItem = 0;
        return _this;
    }
    NewAtkraceCrossChallengeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    NewAtkraceCrossChallengeView.prototype.getTitleStr = function () {
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
    NewAtkraceCrossChallengeView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        //  var a  =  this.titleTF.y;
        var _bg = BaseBitmap.create("public_9_bg4");
        _bg.width = 528;
        _bg.height = 550;
        _bg.x = 55;
        _bg.y = this.titleTF.y + 65;
        this.addChild(_bg);
        /**
         * "atkraceinfo":{"allianceId":1100004,"level":20,"power":5615925218,"snum":83,"pic":3906,"rank":3,"name":"vip","iscankill":0,"point":-83},"fzid":11},
         *
         */
        var info = this.param.data.info;
        var pointDiff = info.point - Api.atkracecrossVoApi.getPoint();
        var acCfg = Api.atkracecrossVoApi.getNewCrossCfg();
        var descstr1 = "";
        if (info.rank <= acCfg.lowerLimit3) {
            descstr1 = LanguageManager.getlocal("newatkraceServant_point5", [String(acCfg.lowerLimit3)]);
        }
        else if (info.point <= acCfg.lowerLimit1) {
            descstr1 = LanguageManager.getlocal("newatkraceServant_point4", [String(acCfg.lowerLimit1)]);
        }
        else if (pointDiff >= acCfg.lowerLimit2) {
            descstr1 = LanguageManager.getlocal("newatkraceServant_point3", [String(acCfg.lowerLimit2)]);
        }
        else if (pointDiff < 0) {
            descstr1 = LanguageManager.getlocal("newatkraceServant_point2", [String(-pointDiff)]);
        }
        else {
            descstr1 = LanguageManager.getlocal("newatkraceServant_point1", [String(pointDiff)]);
        }
        var duishouName = LanguageManager.getlocal("newatkraceServantChallengeDes1_" + AtkraceCrossChallengeItem.data.type, [info.name, descstr1]);
        // 对方名字
        var missionTxt = ComponentManager.getTextField(duishouName, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        missionTxt.x = _bg.x + 20;
        missionTxt.y = _bg.y - 24;
        this.addChild(missionTxt);
        //出战次数
        var times1 = Api.atkracecrossVoApi.getUseTimes();
        var times2 = Api.servantVoApi.getServantCount();
        var fighttimestr = LanguageManager.getlocal("newatkraceServantChallengeDes2", [String(times2 - times1), String(times2)]);
        var timesText = ComponentManager.getTextField(fighttimestr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        timesText.x = missionTxt.x;
        timesText.y = missionTxt.y + missionTxt.height + 6;
        this.addChild(timesText);
        // 挑战书
        this.challengebookNum = Api.itemVoApi.getItemNumInfoVoById(1552);
        var numstr = LanguageManager.getlocal("atkracechallengebook", [this.challengebookNum + ""]);
        if (AtkraceCrossChallengeItem.data.type == 3) {
            // 追杀令
            this.challengebookNum = Api.itemVoApi.getItemNumInfoVoById(1553);
            numstr = LanguageManager.getlocal("atkracekill", [this.challengebookNum + ""]);
        }
        else {
            //挑战书
            this.challengebookNum = Api.itemVoApi.getItemNumInfoVoById(1552);
            numstr = LanguageManager.getlocal("atkracechallengebook", [this.challengebookNum + ""]);
        }
        this._costItem = Api.atkracecrossVoApi.getUseTimes2();
        numstr += LanguageManager.getlocal("newatkraceServantChallengeDes3", [String(this._costItem)]);
        var challengeBookTxt = ComponentManager.getTextField(numstr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        challengeBookTxt.x = missionTxt.x;
        challengeBookTxt.y = timesText.y + timesText.height + 6;
        this.addChild(challengeBookTxt);
        _bg.y = challengeBookTxt.y + challengeBookTxt.height + 7;
        // if(PlatformManager.checkIsTextHorizontal())
        // {
        //     challengeBookTxt.setPosition(_bg.x + _bg.width - challengeBookTxt.width - 10,missionTxt.y)
        // }
        var idList = Api.atkracecrossVoApi.getNewCrossVo().getSids();
        var idList1 = [];
        var idList2 = [];
        for (var index = 0; index < idList.length; index++) {
            var key = idList[index];
            if (this.isBattleing(key)) {
                idList1.push(key);
            }
            else {
                idList2.push(key);
            }
        }
        var keys = idList1.concat(idList2);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 528, _bg.height - 15);
        this._scrollList = ComponentManager.getScrollList(NewAtkraceCrossChallengeItem, keys, rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(55, _bg.y + 5);
    };
    NewAtkraceCrossChallengeView.prototype.initView = function () {
    };
    NewAtkraceCrossChallengeView.prototype.isBattleing = function (servantId) {
        var myInfo = Api.atkracecrossVoApi.getMyInfo();
        var fighttime = Api.atkracecrossVoApi.getUseServantsTimes(servantId);
        if (fighttime < this._costItem) {
            return true;
        }
        return false;
    };
    NewAtkraceCrossChallengeView.prototype.getShowHeight = function () {
        return 720;
    };
    NewAtkraceCrossChallengeView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.challengebookNum = 0;
        this.servantList = [];
        this._data = null;
    };
    return NewAtkraceCrossChallengeView;
}(PopupView));
//# sourceMappingURL=NewAtkraceCrossChallengeView.js.map