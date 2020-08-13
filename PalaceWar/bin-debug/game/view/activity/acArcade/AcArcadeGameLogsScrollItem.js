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
  * 拉霸机奖池item
  * author 张朝阳
  * date 2019/6/12
  * @class AcArcadeGameLogsScrollItem
  */
var AcArcadeGameLogsScrollItem = (function (_super) {
    __extends(AcArcadeGameLogsScrollItem, _super);
    function AcArcadeGameLogsScrollItem() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._aidAndCode = null;
        return _this;
    }
    /**
     * 初始化itemview
     */
    AcArcadeGameLogsScrollItem.prototype.initItem = function (index, data, itemParam) {
        this._itemData = data;
        this._aidAndCode = itemParam;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        this.width = 520;
        this.height = 165;
        var lotteryTime = this._itemData[0];
        var rewards = GameData.formatRewardItem(this._itemData[1])[0];
        var lotteryRewards = this._itemData[2];
        var lotteryRewards1 = this._itemData[2][0];
        var lotteryRewards2 = this._itemData[2][1];
        var lotteryRewards3 = this._itemData[2][2];
        var score = 0;
        if (lotteryRewards1 == lotteryRewards2 && lotteryRewards1 == lotteryRewards3 && lotteryRewards2 == lotteryRewards3) {
            score = cfg.getScoreForType("0");
        }
        else if (lotteryRewards1 == lotteryRewards2 || lotteryRewards1 == lotteryRewards3 || lotteryRewards2 == lotteryRewards3) {
            score = cfg.getScoreForType("1");
        }
        else if (lotteryRewards1 != lotteryRewards2 && lotteryRewards1 != lotteryRewards3 && lotteryRewards2 != lotteryRewards3) {
            score = cfg.getScoreForType("2");
        }
        var time = App.DateUtil.getFormatBySecond(this._itemData[3], 2);
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = this.width;
        bg.height = this.height;
        this.addChild(bg);
        var titleBg = BaseBitmap.create("accarnivalview_tab_red");
        titleBg.y = 7;
        this.addChild(titleBg);
        // 0: 2
        // 1: "6_1021_1"
        // 2: Array(3)
        // 0: "6_1552_1"
        // 1: "6_1362_1"
        // 2: "6_1751_1"
        // length: 3
        // __proto__: Array(0)
        // 3: 1560848800
        // length: 4
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeGameLogViewLotteryTitle-" + this._aidAndCode.code, [String(lotteryTime), String(score)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + 25, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        titleBg.width = titleTF.width + 50;
        var timeTF = ComponentManager.getTextField(time, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
        timeTF.setPosition(bg.x + bg.width - timeTF.width - 30, titleBg.y + titleBg.height - timeTF.height);
        this.addChild(timeTF);
        var line = BaseBitmap.create("public_line1");
        line.setPosition(bg.x + bg.width / 2 - line.width / 2, titleBg.y + titleBg.height + 2);
        this.addChild(line);
        var down = BaseBitmap.create("acarcadeview_logdown-1");
        down.setPosition(bg.x + 20, line.y + line.height + 3);
        this.addChild(down);
        for (var i = 0; i < lotteryRewards.length; i++) {
            var scale = 0.45;
            var container = GameData.getItemIcon(GameData.formatRewardItem(this._itemData[2][i])[0]);
            container.setScale(scale);
            container.setPosition(down.x + (container.width * scale + 8) * i + 6, down.y + down.height / 2 - container.height * scale / 2);
            this.addChild(container);
            var numLb = container.getChildByName("numLb");
            var magnifierIcon = container.getChildByName("magnifierIcon");
            if (numLb) {
                numLb.visible = false;
            }
            if (container.getChildByName("numbg")) {
                container.getChildByName("numbg").visible = false;
            }
            if (magnifierIcon) {
                magnifierIcon.visible = false;
            }
        }
        var up = BaseBitmap.create("acarcadeview_logup-1");
        up.setPosition(down.x, down.y);
        this.addChild(up);
        var rewardsTF = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeGameLogViewRewardsDesc-" + this._aidAndCode.code, [rewards.name, String(rewards.num), String(score)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        rewardsTF.width = 290;
        rewardsTF.setPosition(up.x + up.width + 25, up.y + up.height / 2 - rewardsTF.height / 2);
        this.addChild(rewardsTF);
    };
    AcArcadeGameLogsScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcArcadeGameLogsScrollItem.prototype.dispose = function () {
        this._itemData = null;
        _super.prototype.dispose.call(this);
    };
    return AcArcadeGameLogsScrollItem;
}(ScrollListItem));
__reflect(AcArcadeGameLogsScrollItem.prototype, "AcArcadeGameLogsScrollItem");
//# sourceMappingURL=AcArcadeGameLogsScrollItem.js.map