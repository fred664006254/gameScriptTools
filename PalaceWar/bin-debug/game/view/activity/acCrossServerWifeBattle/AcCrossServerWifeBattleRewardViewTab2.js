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
var AcCrossServerWifeBattleRewardViewTab2 = (function (_super) {
    __extends(AcCrossServerWifeBattleRewardViewTab2, _super);
    function AcCrossServerWifeBattleRewardViewTab2(param) {
        var _this = _super.call(this) || this;
        _this._nodeContainer = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcCrossServerWifeBattleRewardViewTab2.prototype, "cfg", {
        // private get api() : CrossServerWipeBossVoApi{
        //     return Api.crossServerWipeBossVoApi;
        // }
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWifeBattleRewardViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWifeBattleRewardViewTab2.prototype.getListType = function () {
        return 1;
    };
    AcCrossServerWifeBattleRewardViewTab2.prototype.initView = function () {
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
        var view = this;
        view._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var str = '';
        var zidNum = this.vo.getPkzidNum();
        if (zidNum == 2) {
            this.initDoubleServer(zidNum);
        }
        else {
            this.initMultiServer(zidNum);
        }
    };
    AcCrossServerWifeBattleRewardViewTab2.prototype.initDoubleServer = function (zidNum) {
        var rankList = this.cfg.getServerRankRewards(); //this.vo.getArr('personRankReward');
        var tmpX = 20;
        var scroStartY = 0;
        for (var index = 0; index < rankList.length; index++) {
            var id = index;
            var rItem = rankList[index];
            var key = index + 1; //rItem.id;
            var winBottomBg = BaseBitmap.create("public_9_bg23");
            winBottomBg.width = 628;
            winBottomBg.y = scroStartY;
            winBottomBg.x = 6;
            this._nodeContainer.addChild(winBottomBg);
            var winbg = BaseBitmap.create("tombrewardrankbg-1");
            winbg.y = scroStartY;
            winbg.x = GameConfig.stageWidth / 2 - winbg.width / 2;
            this._nodeContainer.addChild(winbg);
            winbg.y = scroStartY;
            var line1 = BaseBitmap.create("public_line3");
            line1.width = 480;
            line1.x = GameConfig.stageWidth / 2 - line1.width / 2;
            line1.y = winbg.y + winbg.height / 2 - line1.height / 2;
            this._nodeContainer.addChild(line1);
            // let rIcons = rItem.rewardIcons;
            var rIcons = GameData.formatRewardItem(rItem.reward);
            //  GameData.getItemIcon(this._rewardArrList[count],true,true);
            var rank = rItem.rank;
            var txt = null;
            var offY = 0;
            var offH = 0;
            txt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
            if (Number(key) < 4) {
                txt.text = LanguageManager.getlocal("acRank_rank6", [String(key)]);
            }
            else {
                if (rank[0] < rank[1]) {
                    txt.text = txt.text = LanguageManager.getlocal("acRank_rank4", [String(rank[0]), String(rank[1])]);
                }
                else {
                    txt.text = LanguageManager.getlocal("acRank_rank6", [rank[0].toString()]);
                }
            }
            txt.x = GameConfig.stageWidth / 2 - txt.width / 2;
            txt.y = winbg.y + winbg.height / 2 - txt.height / 2;
            this._nodeContainer.addChild(txt);
            var len = rIcons.length;
            var startY = winbg.y + winbg.height + 10 + offH;
            tmpX = 20;
            // tmpX = (winBottomBg.width - len * 106 - (len - 1) * 15)/2;
            scroStartY = startY;
            for (var innerIdx = 0; innerIdx < len; innerIdx++) {
                // var element = rIcons[innerIdx];
                var element = GameData.getItemIcon(rIcons[innerIdx], true, true);
                element.x = tmpX;
                element.y = scroStartY;
                tmpX += (element.width + 15);
                if (tmpX >= GameConfig.stageWidth) {
                    tmpX = 20;
                    scroStartY += element.height + 15;
                    element.x = tmpX;
                    element.y = scroStartY;
                    tmpX += (element.width + 15);
                }
                element.cacheAsBitmap = true;
                this._nodeContainer.addChild(element);
            }
            scroStartY += 130;
            winBottomBg.height = scroStartY - winBottomBg.y - 2;
        }
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
        var bottomText4 = ComponentManager.getTextField("rank", 20, TextFieldConst.COLOR_WHITE);
        bottomText4.text = LanguageManager.getlocal("acLadder_rank", [rankstr]);
        bottomText4.setPosition(bottomText3.x, bottomText2.y);
        this.addChild(bottomText4);
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomBg.y - 3);
        var scrollView = ComponentManager.getScrollView(this._nodeContainer, rect);
        scrollView.y = 0;
        scrollView.horizontalScrollPolicy = "off";
        this.addChild(scrollView);
    };
    AcCrossServerWifeBattleRewardViewTab2.prototype.initMultiServer = function (zidNum) {
        var rankList = this.cfg.getMulServerPRankRewards(); //this.vo.getArr('personRankReward');
        var tmpX = 20;
        var scroStartY = 0;
        for (var index = 0; index < rankList.length; index++) {
            var id = index;
            var rItem = rankList[index];
            var key = index + 1; //rItem.id;
            var winBottomBg = BaseBitmap.create("public_9_bg23");
            winBottomBg.width = 628;
            winBottomBg.y = scroStartY;
            winBottomBg.x = 6;
            this._nodeContainer.addChild(winBottomBg);
            var winbg = BaseBitmap.create("tombrewardrankbg-1");
            winbg.y = scroStartY;
            winbg.x = GameConfig.stageWidth / 2 - winbg.width / 2;
            this._nodeContainer.addChild(winbg);
            winbg.y = scroStartY;
            var line1 = BaseBitmap.create("public_line3");
            line1.width = 480;
            line1.x = GameConfig.stageWidth / 2 - line1.width / 2;
            line1.y = winbg.y + winbg.height / 2 - line1.height / 2;
            this._nodeContainer.addChild(line1);
            // let rIcons = rItem.rewardIcons;
            var rIcons = GameData.formatRewardItem(rItem.reward);
            var rank = rItem.rank;
            var txt = null;
            var offY = 0;
            var offH = 0;
            txt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
            if (Number(key) < 4) {
                txt.text = LanguageManager.getlocal("acRank_rank6", [String(key)]);
            }
            else {
                if (rank[0] < rank[1]) {
                    txt.text = txt.text = LanguageManager.getlocal("acRank_rank4", [String(rank[0]), String(rank[1])]);
                }
                else {
                    txt.text = LanguageManager.getlocal("acRank_rank6", [rank[0].toString()]);
                }
            }
            txt.x = GameConfig.stageWidth / 2 - txt.width / 2;
            txt.y = winbg.y + winbg.height / 2 - txt.height / 2;
            this._nodeContainer.addChild(txt);
            var len = rIcons.length;
            var startY = winbg.y + winbg.height + 10 + offH;
            tmpX = 20;
            // tmpX = (winBottomBg.width - len * 106 - (len - 1) * 15)/2;
            scroStartY = startY;
            for (var innerIdx = 0; innerIdx < len; innerIdx++) {
                // var element = rIcons[innerIdx];
                var element = GameData.getItemIcon(rIcons[innerIdx], true, true);
                element.x = tmpX;
                element.y = scroStartY;
                tmpX += (element.width + 15);
                if (tmpX >= GameConfig.stageWidth) {
                    tmpX = 20;
                    scroStartY += element.height + 15;
                    element.x = tmpX;
                    element.y = scroStartY;
                    tmpX += (element.width + 15);
                }
                element.cacheAsBitmap = true;
                this._nodeContainer.addChild(element);
            }
            scroStartY += 130;
            winBottomBg.height = scroStartY - winBottomBg.y - 2;
        }
        // 膜拜背景
        var bottomBg = BaseBitmap.create("emparena_bottom");
        bottomBg.height = 120;
        bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width / 2;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 142;
        this.addChild(bottomBg);
        // let rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'acPunishRankTab1', view.rankCLick, view);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rankBtn, bottomBg, [35,0]);
        // view.addChild(rankBtn);
        // 
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
        var bottomText4 = ComponentManager.getTextField("rank", 20, TextFieldConst.COLOR_WHITE);
        bottomText4.text = LanguageManager.getlocal("acLadder_rank", [rankstr]);
        bottomText4.setPosition(bottomText3.x, bottomText2.y);
        this.addChild(bottomText4);
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomBg.y - 3);
        var scrollView = ComponentManager.getScrollView(this._nodeContainer, rect);
        scrollView.y = 0;
        scrollView.horizontalScrollPolicy = "off";
        this.addChild(scrollView);
    };
    AcCrossServerWifeBattleRewardViewTab2.prototype.dispose = function () {
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWifeBattleRewardViewTab2;
}(CommonViewTab));
__reflect(AcCrossServerWifeBattleRewardViewTab2.prototype, "AcCrossServerWifeBattleRewardViewTab2");
//# sourceMappingURL=AcCrossServerWifeBattleRewardViewTab2.js.map