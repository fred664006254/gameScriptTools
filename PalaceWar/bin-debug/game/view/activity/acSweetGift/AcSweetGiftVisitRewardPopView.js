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
 * 活动奖励
 * author yangchengguo
 * date 2019.8.21
 * @class AcSweetGiftVisitRewardPopView
 */
var AcSweetGiftVisitRewardPopView = (function (_super) {
    __extends(AcSweetGiftVisitRewardPopView, _super);
    function AcSweetGiftVisitRewardPopView() {
        var _this = _super.call(this) || this;
        _this._visitedFlag = null;
        _this._visitBtn = null;
        return _this;
    }
    AcSweetGiftVisitRewardPopView.prototype.initView = function () {
        var _this = this;
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETVISIT, this.requestCallback, this);
        var dataList = this.cfg.getAchievementList();
        var data = dataList[Number(this.id) - 1];
        // let topStr1 = LanguageManager.getlocal("sweetgiftVisitGetScoreInfo-"+this.code, [String(data.needNum)]);
        // let topTxt1 = ComponentManager.getTextField(topStr1, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        // topTxt1.setPosition(this.viewBg.x + this.viewBg.width/2 - topTxt1.width/2, 10);
        // this.addChildToContainer(topTxt1);
        var buildingName = LanguageManager.getlocal("sweetgiftBuildingName-" + this.code + "_" + this.id);
        var topStr2 = LanguageManager.getlocal("sweetgiftVisitGetRewardInfo-" + this.code, [buildingName]);
        var topTxt2 = ComponentManager.getTextField(topStr2, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        // topTxt2.setPosition(this.viewBg.x + this.viewBg.width/2 - topTxt2.width/2, topTxt1.y + topTxt1.height + 5);
        topTxt2.setPosition(this.viewBg.x + this.viewBg.width / 2 - topTxt2.width / 2, 15);
        this.addChildToContainer(topTxt2);
        var listbg = BaseBitmap.create("public_9_probiginnerbg");
        listbg.width = 520;
        // listbg.height = 350;
        listbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - listbg.width / 2, topTxt2.y + topTxt2.height + 5);
        this.addChildToContainer(listbg);
        var scrolNode = new BaseDisplayObjectContainer();
        this.addChildToContainer(scrolNode);
        var rewardArr = GameData.getRewardItemIcons(data.getReward, true, true);
        for (var i in rewardArr) {
            var icon = rewardArr[i];
            var idx = Number(i);
            icon.x = 9 + (idx % 4) * (108 + 19);
            icon.y = 7 + Math.floor(idx / 4) * (108 + 8);
            scrolNode.addChild(icon);
        }
        scrolNode.height = Math.ceil(rewardArr.length / 4) * (108 + 8);
        scrolNode.width = listbg.width - 20;
        listbg.height = Math.ceil(rewardArr.length / 4) * (108 + 8) + 20;
        var rect = new egret.Rectangle(listbg.x + 10, listbg.y + 5, listbg.width - 20, listbg.height - 10);
        var scrollview = ComponentManager.getScrollView(scrolNode, rect);
        scrollview.bounces = false;
        scrollview.x = listbg.x + 10;
        scrollview.y = listbg.y + 5;
        scrollview.horizontalScrollPolicy = 'off';
        this.addChildToContainer(scrollview);
        var visited = BaseBitmap.create("ac_sweetgift_visited");
        visited.setPosition(listbg.x + listbg.width / 2 - visited.width / 2, listbg.y + listbg.height + 10);
        this.addChildToContainer(visited);
        this._visitedFlag = visited;
        visited.visible = false;
        var visitBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "sweetgiftVisitName-" + this.code, function () {
            if ((!_this.vo.isStart)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETVISIT, { activeId: _this.vo.aidAndCode, rkey: Number(data.id) });
        }, this);
        visitBtn.setPosition(listbg.x + listbg.width / 2 - visitBtn.width / 2, listbg.y + listbg.height + 30);
        visitBtn.name = "visitBtn";
        this.addChildToContainer(visitBtn);
        this._visitBtn = visitBtn;
        visitBtn.visible = false;
        if (this.vo.isGetAchievementById(this.id)) {
            visited.visible = true;
        }
        else {
            if (this.vo.getScore() >= data.needNum) {
                visitBtn.visible = true;
            }
            else {
                var scoreBg = BaseBitmap.create("luckydrawiconbg-1");
                scoreBg.height = 40;
                scoreBg.setPosition(listbg.x + listbg.width / 2 - scoreBg.width / 2, listbg.y + listbg.height + 25);
                this.addChildToContainer(scoreBg);
                var scoreIcon = BaseBitmap.create("ac_sweetgift_gift_icon-" + this.getTypeCode());
                scoreIcon.setScale(1);
                scoreIcon.setPosition(scoreBg.x + 80, scoreBg.y + scoreBg.height / 2 - scoreIcon.height / 2);
                this.addChildToContainer(scoreIcon);
                var score = ComponentManager.getTextField(this.vo.getScore() + "/" + data.needNum, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
                score.setPosition(scoreIcon.x + scoreIcon.width * 1 + 8, scoreBg.y + scoreBg.height / 2 - score.height / 2 + 5);
                this.addChildToContainer(score);
            }
        }
    };
    AcSweetGiftVisitRewardPopView.prototype.requestCallback = function (event) {
        var rData = event.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rewards = rData.rewards;
        var rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (this.vo.isGetAchievementById(this.id)) {
            this._visitedFlag.visible = true;
            this._visitBtn.visible = false;
        }
    };
    AcSweetGiftVisitRewardPopView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    Object.defineProperty(AcSweetGiftVisitRewardPopView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSweetGiftVisitRewardPopView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSweetGiftVisitRewardPopView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSweetGiftVisitRewardPopView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSweetGiftVisitRewardPopView.prototype, "id", {
        get: function () {
            return this.param.data.id;
        },
        enumerable: true,
        configurable: true
    });
    AcSweetGiftVisitRewardPopView.prototype.getBgExtraHeight = function () {
        return 10;
    };
    // protected getShowHeight():number{
    // 	return 550;
    // }
    /**标题 */
    AcSweetGiftVisitRewardPopView.prototype.getTitleStr = function () {
        return "sweetgiftVisitRewardTitle";
    };
    AcSweetGiftVisitRewardPopView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "ac_sweetgift_visited", "luckydrawiconbg-1",
            "ac_sweetgift_gift_icon-" + this.getTypeCode(),
        ]);
    };
    AcSweetGiftVisitRewardPopView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETVISIT, this.requestCallback, this);
        this._visitBtn = null;
        this._visitedFlag = null;
        _super.prototype.dispose.call(this);
    };
    return AcSweetGiftVisitRewardPopView;
}(PopupView));
__reflect(AcSweetGiftVisitRewardPopView.prototype, "AcSweetGiftVisitRewardPopView");
//# sourceMappingURL=AcSweetGiftVisitRewardPopView.js.map