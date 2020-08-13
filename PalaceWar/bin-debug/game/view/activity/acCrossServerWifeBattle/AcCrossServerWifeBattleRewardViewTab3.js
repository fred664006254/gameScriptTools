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
//
var AcCrossServerWifeBattleRewardViewTab3 = (function (_super) {
    __extends(AcCrossServerWifeBattleRewardViewTab3, _super);
    function AcCrossServerWifeBattleRewardViewTab3(param) {
        var _this = _super.call(this) || this;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcCrossServerWifeBattleRewardViewTab3.prototype, "cfg", {
        // private get api() : CrossServerWipeBossVoApi{
        //     return Api.crossServerWipeBossVoApi;
        // }
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWifeBattleRewardViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWifeBattleRewardViewTab3.prototype.getListType = function () {
        return 1;
    };
    AcCrossServerWifeBattleRewardViewTab3.prototype.initView = function () {
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
        var view = this;
        var listbg = BaseBitmap.create("public_9_bg24");
        listbg.width = 624;
        listbg.height = GameConfig.stageHeigth - 275;
        listbg.setPosition(8, 0);
        this.addChild(listbg);
        var rankList = [];
        if (this.vo.test) {
            for (var i = 1; i <= 5; ++i) {
                rankList.push({
                    zid: i,
                    point: i * 100
                });
            }
        }
        // if(view.api.getRankInfo().rankList.length){
        // 	rankList = view.api.getRankInfo().rankList;
        // }
        if (this.vo.rankData && this.vo.rankData.zidrankarr) {
            rankList = this.vo.rankData.zidrankarr;
        }
        var titleBg = BaseBitmap.create("ladder_itemtitlebg");
        titleBg.width = 598;
        titleBg.height = 40;
        titleBg.setPosition(21, 10);
        this.addChild(titleBg);
        var titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = titleBg.x + 40;
        titleTxt1.y = 17;
        view.addChild(titleTxt1);
        var titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("serverListServer2"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt3.x = titleBg.x + 234;
        titleTxt3.y = 17;
        view.addChild(titleTxt3);
        var titleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("acPunish_score"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt4.x = titleBg.x + 434;
        titleTxt4.y = 17;
        view.addChild(titleTxt4);
        // 膜拜背景
        var bottomBg = BaseBitmap.create("emparena_bottom");
        bottomBg.height = 120;
        bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width / 2;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 142;
        this.addChild(bottomBg);
        var bottomText1 = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_name", [Api.playerVoApi.getPlayerName()]), 20, TextFieldConst.COLOR_WHITE);
        bottomText1.setPosition(65, bottomBg.y + 30);
        this.addChild(bottomText1);
        var bottomText2 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WHITE);
        bottomText2.text = LanguageManager.getlocal("acLadder_Score", [String(this.vo.getRankMyScore())]);
        bottomText2.setPosition(bottomText1.x, bottomBg.y + 73);
        this.addChild(bottomText2);
        var bottomText3 = ComponentManager.getTextField("server", 20, TextFieldConst.COLOR_WHITE);
        bottomText3.setPosition(bottomText1.x + 320, bottomText1.y);
        bottomText3.text = LanguageManager.getlocal("acLadder_server", [String(Api.mergeServerVoApi.getTrueZid())]);
        this.addChild(bottomText3);
        var ranknum = this.vo.getRankServerRank();
        var rankstr;
        if (ranknum) {
            rankstr = String(ranknum);
        }
        else {
            rankstr = LanguageManager.getlocal("atkracedes4");
        }
        // if(!this.vo.isCanJoin){
        // 	rankstr = LanguageManager.getlocal('crossImacyNoAccess');
        // }
        var bottomText4 = ComponentManager.getTextField("rank", 20, TextFieldConst.COLOR_WHITE);
        bottomText4.text = LanguageManager.getlocal("acLadder_rank", [rankstr]);
        bottomText4.setPosition(bottomText3.x, bottomText2.y);
        this.addChild(bottomText4);
        var rect = new egret.Rectangle(0, 0, 610, bottomBg.y - 3 - 55);
        var scrollList = ComponentManager.getScrollList(AcCrossServerWifeBattleRankScrollItem1, rankList, rect, { aid: this.param.data.aid, code: this.param.data.code });
        scrollList.x = 15;
        scrollList.y = titleBg.y + titleBg.height + 10;
        scrollList.horizontalScrollPolicy = "off";
        view.addChild(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
    };
    AcCrossServerWifeBattleRewardViewTab3.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWifeBattleRewardViewTab3;
}(CommonViewTab));
__reflect(AcCrossServerWifeBattleRewardViewTab3.prototype, "AcCrossServerWifeBattleRewardViewTab3");
//# sourceMappingURL=AcCrossServerWifeBattleRewardViewTab3.js.map