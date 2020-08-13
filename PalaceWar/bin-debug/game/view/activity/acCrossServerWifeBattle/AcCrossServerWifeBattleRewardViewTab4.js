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
var AcCrossServerWifeBattleRewardViewTab4 = (function (_super) {
    __extends(AcCrossServerWifeBattleRewardViewTab4, _super);
    function AcCrossServerWifeBattleRewardViewTab4(param) {
        var _this = _super.call(this) || this;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcCrossServerWifeBattleRewardViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWifeBattleRewardViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWifeBattleRewardViewTab4.prototype.getListType = function () {
        return 1;
    };
    AcCrossServerWifeBattleRewardViewTab4.prototype.initView = function () {
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
        var view = this;
        var listbg = BaseBitmap.create("public_9_bg24");
        listbg.width = 624;
        listbg.height = GameConfig.stageHeigth - 275;
        listbg.setPosition(8, 0);
        this.addChild(listbg);
        var titleBg = BaseBitmap.create("ladder_itemtitlebg");
        titleBg.width = 598;
        titleBg.height = 40;
        titleBg.setPosition(21, 10);
        this.addChild(titleBg);
        var titleText1 = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleText1.setPosition(85 - titleText1.width / 2, 17);
        this.addChild(titleText1);
        var titleText2 = ComponentManager.getTextField(LanguageManager.getlocal("palace_history_title2"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleText2.setPosition(193 - titleText2.width / 2, titleText1.y);
        this.addChild(titleText2);
        var titleText3 = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_rank_title3"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleText3.setPosition(335 - titleText3.width / 2, titleText1.y);
        this.addChild(titleText3);
        var titleText4 = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleText4.setPosition(455 - titleText4.width / 2, titleText1.y);
        this.addChild(titleText4);
        var titleText5 = ComponentManager.getTextField(LanguageManager.getlocal("acPunish_score"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleText5.setPosition(555 - titleText5.width / 2, titleText1.y);
        this.addChild(titleText5);
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
        var ranknum = this.vo.getRankMyRank();
        var rankstr;
        if (ranknum) {
            rankstr = String(ranknum);
        }
        else {
            if (this.vo.isCanJoin) {
                rankstr = LanguageManager.getlocal("emperorWarCheerNot");
            }
            else {
                rankstr = LanguageManager.getlocal("atkracedes4");
            }
        }
        if (!this.vo.isCanJoin) {
            rankstr = LanguageManager.getlocal('crossImacyNoAccess');
        }
        var bottomText4 = ComponentManager.getTextField("acLadder_rank", 20, TextFieldConst.COLOR_WHITE);
        bottomText4.text = LanguageManager.getlocal("acLadder_rank", [rankstr]);
        bottomText4.setPosition(bottomText3.x, bottomText2.y);
        this.addChild(bottomText4);
        var rankList = [];
        if (this.vo.rankData && this.vo.rankData.rankarr) {
            rankList = this.vo.rankData.rankarr;
        }
        if (this.vo.test) {
            for (var i = 1; i <= 5; ++i) {
                rankList.push({
                    zid: i,
                    point: i * 100,
                    name: "\u73A9\u5BB6" + i,
                    titile: {
                        titile: 3201 + i,
                        lv: i
                    }
                });
            }
        }
        var rect = new egret.Rectangle(0, 0, 610, bottomBg.y - 3 - 55);
        var scrollList = ComponentManager.getScrollList(AcCrossServerWifeBattleRankScrollItem2, rankList, rect, { aid: this.param.data.aid, code: this.param.data.code });
        scrollList.x = 15;
        scrollList.y = titleBg.y + titleBg.height + 5;
        scrollList.horizontalScrollPolicy = "off";
        view.addChild(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
    };
    AcCrossServerWifeBattleRewardViewTab4.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWifeBattleRewardViewTab4;
}(CommonViewTab));
__reflect(AcCrossServerWifeBattleRewardViewTab4.prototype, "AcCrossServerWifeBattleRewardViewTab4");
//# sourceMappingURL=AcCrossServerWifeBattleRewardViewTab4.js.map