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
var AcThreeKingdomsCityWarRewardView = (function (_super) {
    __extends(AcThreeKingdomsCityWarRewardView, _super);
    function AcThreeKingdomsCityWarRewardView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcThreeKingdomsCityWarRewardView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsCityWarRewardView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsCityWarRewardView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsCityWarRewardView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsCityWarRewardView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsCityWarRewardView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcThreeKingdomsCityWarRewardView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "tombrewardrankbg-1", "arena_bottom"
        ]);
    };
    AcThreeKingdomsCityWarRewardView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcThreeKingdomsCityWarRewardView.prototype.getTitleBgName = function () {
        return App.CommonUtil.getResByCode("threekingdomsrankviewtitle", this.getUiCode());
    };
    AcThreeKingdomsCityWarRewardView.prototype.getTitleStr = function () {
        return null;
    };
    AcThreeKingdomsCityWarRewardView.prototype.getBgName = function () {
        return "public_9_bg92";
    };
    AcThreeKingdomsCityWarRewardView.prototype.getRequestData = function () {
        return {
            requestType: NetRequestConst.REQUEST_THREEKINGDOMS_GETRANK,
            requestData: {
                activeId: this.acTivityId,
                round: this.vo.getCurWeek()
            }
        };
    };
    AcThreeKingdomsCityWarRewardView.prototype.receiveData = function (data) {
        if (data.ret) {
            var rdata = data.data.data;
            this.vo.prankroundarr = rdata;
        }
    };
    AcThreeKingdomsCityWarRewardView.prototype.initView = function () {
        var view = this;
        var code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var nodeContainer = new BaseDisplayObjectContainer();
        nodeContainer.width = view.width;
        var str = '';
        var rankList = view.cfg.cityRankReward;
        var tmpX = 20;
        var scroStartY = 3;
        for (var index = 0; index < rankList.length; index++) {
            var id = index;
            var rItem = rankList[index];
            var key = index + 1;
            var winBottomBg = BaseBitmap.create("public_alphabg");
            winBottomBg.width = view.width;
            winBottomBg.y = scroStartY;
            winBottomBg.x = 0;
            nodeContainer.addChild(winBottomBg);
            var winbg = BaseBitmap.create("tombrewardrankbg-1");
            winbg.y = scroStartY;
            winbg.x = GameConfig.stageWidth / 2 - winbg.width / 2;
            nodeContainer.addChild(winbg);
            var line1 = BaseBitmap.create("public_line3");
            line1.width = 480;
            line1.x = GameConfig.stageWidth / 2 - line1.width / 2;
            line1.y = winbg.y + winbg.height / 2 - line1.height / 2;
            nodeContainer.addChild(line1);
            var rewardStr = "1046_1_" + rItem.specialReward2 + "|" + rItem.getReward;
            var rIcons = GameData.getRewardItemIcons(rewardStr, true);
            var rank = rItem.rank;
            var txt = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_LIGHT_YELLOW);
            if (rank[0] < rank[1]) {
                txt.text = txt.text = LanguageManager.getlocal("acRank_rank4", [String(rank[0]), String(rank[1])]);
            }
            else {
                txt.text = LanguageManager.getlocal("acRank_rank6", [rank[0].toString()]);
            }
            txt.x = GameConfig.stageWidth / 2 - txt.width / 2;
            txt.y = winbg.y + winbg.height / 2 - txt.height / 2;
            nodeContainer.addChild(txt);
            var len = rIcons.length;
            var startY = winbg.y + winbg.height + 10;
            tmpX = 20;
            scroStartY = startY;
            for (var innerIdx = 0; innerIdx < len; innerIdx++) {
                var element = rIcons[innerIdx];
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
                nodeContainer.addChild(element);
            }
            scroStartY += 130;
            winBottomBg.height = scroStartY - winBottomBg.y - 10;
            nodeContainer.height = winBottomBg.y + winBottomBg.height + 10;
        }
        // 膜拜背景
        var bottomBg = BaseBitmap.create("arena_bottom");
        bottomBg.height = 135;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view, [0, 0], true);
        view.addChild(bottomBg);
        //本轮个人攻城分数
        var myKingdomTxt = ComponentManager.getTextField(LanguageManager.getlocal("acThreeKingdomsRanktip9-" + code, [App.StringUtil.changeIntToText(view.param.data.mypoint)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myKingdomTxt, bottomBg, [25, 35]);
        view.addChild(myKingdomTxt);
        //本轮个人攻城分数排名
        var color = String(0x21eb39);
        var txt3 = ComponentManager.getTextField(LanguageManager.getlocal("acThreeKingdomsRanktip5-" + code, [view.param.data.rankstr]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, txt3, myKingdomTxt, [0, myKingdomTxt.textHeight + 20]);
        view.addChild(txt3);
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - bottomBg.height - this.getContainerY() - 10);
        var scrollView = ComponentManager.getScrollView(nodeContainer, rect);
        scrollView.y = -3;
        scrollView.horizontalScrollPolicy = "off";
        this.addChildToContainer(scrollView);
    };
    AcThreeKingdomsCityWarRewardView.prototype.getContainerY = function () {
        return 85;
    };
    AcThreeKingdomsCityWarRewardView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsCityWarRewardView;
}(CommonView));
__reflect(AcThreeKingdomsCityWarRewardView.prototype, "AcThreeKingdomsCityWarRewardView");
//# sourceMappingURL=AcThreeKingdomsCityWarRewardView.js.map