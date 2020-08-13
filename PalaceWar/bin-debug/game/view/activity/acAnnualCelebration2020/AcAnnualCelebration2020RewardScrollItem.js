// TypeScript file
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
var AcAnnualCelebration2020RewardScrollItem = (function (_super) {
    __extends(AcAnnualCelebration2020RewardScrollItem, _super);
    function AcAnnualCelebration2020RewardScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._goBtn3 = null;
        _this.taskId = 0;
        _this.itemData = null;
        _this.tempStr = "";
        /**
        * 充值进度条
        */
        _this._progress = null;
        return _this;
    }
    AcAnnualCelebration2020RewardScrollItem.prototype.initItem = function (index, data, itemData) {
        this._data = data;
        this.itemData = itemData;
        this.taskId = data.id;
        var wordsBg = BaseBitmap.create("newsingledaytab2bottombg-1");
        // wordsBg.width = 600;
        this.addChild(wordsBg);
        var view = this;
        var bottom2 = BaseBitmap.create("acmidautumnview_titlebg");
        bottom2.width = view.width - 20;
        bottom2.y = 6;
        bottom2.x = 10;
        this.addChild(bottom2);
        var line = BaseBitmap.create("public_line3");
        view.addChild(line);
        var maxcircle = this.cfg.getMaxCircle();
        var roundTxt = ComponentManager.getTextField(LanguageManager.getlocal(data.id >= maxcircle ? "acTreasureRoundNum2-1" : "acTreasureRoundNum-1", [data.needNum]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        line.width = roundTxt.textWidth + 280;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, line, bottom2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, roundTxt, line);
        view.addChild(roundTxt);
        var rewarStr = data.getReward;
        this.tempStr = rewarStr;
        var rewardArr = GameData.formatRewardItem(rewarStr);
        wordsBg.height = 240 + Math.floor((rewardArr.length - 1) / 5) * 122;
        var posx = 15;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true);
            iconItem.setPosition(12 + posx + (index % 5) * 117, 55 + Math.floor(index / 5) * 122);
            this.addChild(iconItem);
        }
        this._progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 422);
        this._progress.setPosition(wordsBg.x + 15 + posx, wordsBg.y + wordsBg.height - this._progress.height - 25);
        this.addChild(this._progress);
        //领取
        this._goBtn3 = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.collectHandler, this);
        this._goBtn3.x = 455 + posx;
        this._goBtn3.y = this._progress.y + this._progress.height / 2 - this._goBtn3.height / 2;
        this.addChild(this._goBtn3);
        this.update();
    };
    AcAnnualCelebration2020RewardScrollItem.prototype.update = function () {
        if (!this.vo) {
            return;
        }
        var myRechargeNum = this.vo.getCircleNum();
        var maxcircle = this.cfg.getMaxCircle();
        if (this.taskId >= maxcircle) {
            this.taskId = this.vo.getMaxGetIndex();
            if (!this.vo.getCircleFlag(this.taskId)) {
                this.taskId += 1;
            }
        }
        this.refreshProgress();
        if (this.vo && this.vo.getCircleFlag(this.taskId) == false) {
            if (this._goBtn3.visible == true) {
                this._goBtn3.visible = false;
                var collectflag = BaseBitmap.create("collectflag");
                collectflag.x = this._goBtn3.x;
                collectflag.y = this._goBtn3.y - 30;
                collectflag.scaleX = 0.7;
                collectflag.scaleY = 0.7;
                this.addChild(collectflag);
            }
        }
        if (myRechargeNum < this.taskId) {
            App.DisplayUtil.changeToGray(this._goBtn3);
        }
    };
    AcAnnualCelebration2020RewardScrollItem.prototype.refreshProgress = function () {
        var myRechargeNum = this.vo.getCircleNum();
        var percentTxt = LanguageManager.getlocal("acPunishStoreUseNum-12", [myRechargeNum + "", String(this.taskId)]);
        var percent = myRechargeNum / this.taskId;
        this._progress.setText(percentTxt);
        this._progress.setPercentage(percent);
    };
    AcAnnualCelebration2020RewardScrollItem.prototype.collectHandler = function (evt) {
        if (this.vo.isStart == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this.taskId <= this.vo.getCircleNum()) {
            this.vo.tmpReward = this.tempStr;
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_ANNUALCELEBRATION2020CIRCLE, { "activeId": this.itemData.aid + "-" + this.itemData.uicode, "circleId": this.taskId });
        }
        else {
            if (!this.vo.isInActy()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            App.CommonUtil.showTip(LanguageManager.getlocal("acAC2020_taskcannot"));
            // ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        }
    };
    Object.defineProperty(AcAnnualCelebration2020RewardScrollItem.prototype, "vo", {
        get: function () {
            var springCelebrateVo = Api.acVoApi.getActivityVoByAidAndCode(this.itemData.aid, this.itemData.code);
            return springCelebrateVo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualCelebration2020RewardScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.itemData.aid, this.itemData.code);
        },
        enumerable: true,
        configurable: true
    });
    AcAnnualCelebration2020RewardScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AcAnnualCelebration2020RewardScrollItem.prototype.dispose = function () {
        this._progress = null;
        this._data = null;
        this._goBtn3 = null;
        this.taskId = null;
        this.tempStr = '';
        _super.prototype.dispose.call(this);
    };
    return AcAnnualCelebration2020RewardScrollItem;
}(ScrollListItem));
__reflect(AcAnnualCelebration2020RewardScrollItem.prototype, "AcAnnualCelebration2020RewardScrollItem");
//# sourceMappingURL=AcAnnualCelebration2020RewardScrollItem.js.map