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
    AcArcadeGameLogsScrollItem.prototype.getCnCode = function () {
        var code = this._aidAndCode.code;
        if (code == "2" || code == "3") {
            code = "1";
        }
        return code;
    };
    /**
     * 初始化itemview
     */
    AcArcadeGameLogsScrollItem.prototype.initItem = function (index, data, itemParam) {
        this._itemData = data;
        this._aidAndCode = itemParam;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        this.width = 520;
        this.height = 185;
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
        var bg = BaseBitmap.create("activity_db_01");
        bg.width = this.width;
        bg.height = this.height;
        this.addChild(bg);
        var public_up3 = BaseBitmap.create("public_up3"); //arcadegame_topbg_2
        public_up3.width = 510;
        public_up3.height = 33;
        public_up3.setPosition(bg.x + bg.width / 2 - public_up3.width / 2, bg.y + 6);
        this.addChild(public_up3);
        var titleBg = BaseBitmap.create("activity_charge_red");
        titleBg.width = 384;
        titleBg.y = public_up3.y - 3;
        titleBg.x = bg.x;
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
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeGameLogViewLotteryTitle-" + this.getCnCode(), [String(lotteryTime), String(score)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + 25, titleBg.y + titleBg.height / 2 - titleTF.height / 2 + 1);
        this.addChild(titleTF);
        titleBg.width = titleTF.width + 50;
        var timeTF = ComponentManager.getTextField(time, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
        timeTF.setPosition(bg.x + bg.width - timeTF.width - 25, public_up3.y + public_up3.height / 2 - timeTF.height / 2);
        this.addChild(timeTF);
        // let line = BaseBitmap.create("public_line1");
        // line.setPosition(bg.x + bg.width / 2 - line.width / 2, titleBg.y + titleBg.height + 2);
        // this.addChild(line);
        var down = BaseBitmap.create("acarcadeview_logdown-1");
        down.setScale(0.6);
        down.setPosition(bg.x + 15, titleBg.y + titleBg.height + 8);
        this.addChild(down);
        for (var i = 0; i < lotteryRewards.length; i++) {
            var scale = 0.55;
            var container = GameData.getItemIcon(GameData.formatRewardItem(this._itemData[2][i])[0]);
            container.setScale(scale);
            container.setPosition(down.x + (container.width * scale + 24) * i + 17, down.y + down.height / 2 * down.scaleX - container.height * scale / 2);
            // container.setPosition(down.x + (container.width * scale + 8) * i + 6, down.y + down.height / 2 - container.height * scale / 2);
            this.addChild(container);
            var numLb = container.getChildByName("numLb");
            var magnifierIcon = container.getChildByName("magnifierIcon");
            if (numLb) {
                numLb.visible = false;
            }
            if (magnifierIcon) {
                magnifierIcon.visible = false;
            }
        }
        var rewardsTF = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeGameLogViewRewardsDesc-" + this.getCnCode(), [rewards.name, String(rewards.num), String(score)]), 20, TextFieldConst.COLOR_BROWN);
        rewardsTF.width = 290;
        rewardsTF.setPosition(down.x + down.width * down.scaleX + 20, down.y + down.height / 2 * down.scaleX - rewardsTF.height / 2);
        this.addChild(rewardsTF);
    };
    AcArcadeGameLogsScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcArcadeGameLogsScrollItem.prototype.dispose = function () {
        this._itemData = null;
        this._aidAndCode = null;
        _super.prototype.dispose.call(this);
    };
    return AcArcadeGameLogsScrollItem;
}(ScrollListItem));
__reflect(AcArcadeGameLogsScrollItem.prototype, "AcArcadeGameLogsScrollItem");
