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
var EnjoyNightRewardScrollItem = (function (_super) {
    __extends(EnjoyNightRewardScrollItem, _super);
    function EnjoyNightRewardScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._needTxt = null;
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
    EnjoyNightRewardScrollItem.prototype.initItem = function (index, data, itemData) {
        this._data = data;
        this.itemData = itemData;
        this.taskId = data.id;
        var wordsBg = BaseBitmap.create("public_9_bg14");
        wordsBg.width = 600;
        this.addChild(wordsBg);
        var bottom2 = BaseBitmap.create("accarnivalview_tab_red");
        bottom2.y = 10;
        bottom2.x = 2;
        bottom2.width = 285;
        this.addChild(bottom2);
        var rewarStr = data.getReward;
        if (data.specialGift) {
            var newrewarStr = "1019_0_" + data.specialGift + "_" + this.itemData.uicode + '' + "|" + rewarStr;
            rewarStr = newrewarStr;
        }
        this.tempStr = rewarStr;
        var rewardArr = GameData.formatRewardItem(rewarStr);
        wordsBg.height = 250 + Math.floor((rewardArr.length - 1) / 5) * 122;
        var scroStartY = 65;
        var tmpX = 14;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true);
            iconItem.setPosition(12 + (index % 5) * 117, 65 + Math.floor(index / 5) * 122);
            this.addChild(iconItem);
        }
        this._progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 422);
        this._progress.setPosition(wordsBg.x + 15, wordsBg.y + wordsBg.height - this._progress.height - 25);
        this.addChild(this._progress);
        //领取
        this._goBtn3 = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.collectHandler, this);
        this._goBtn3.x = 455;
        this._goBtn3.y = this._progress.y + this._progress.height / 2 - this._goBtn3.height / 2;
        this.addChild(this._goBtn3);
        //当前充值进度（0／1）
        var needTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        needTxt.text = LanguageManager.getlocal("acWorshipChargePopupViewItemTitle-1", [data.needGem + ""]);
        needTxt.width = bottom2.width;
        needTxt.x = bottom2.x + 15;
        needTxt.y = bottom2.y + 10;
        this._needTxt = needTxt;
        this.addChild(needTxt);
        this.update();
    };
    EnjoyNightRewardScrollItem.prototype.refreshProgress = function () {
        var myRechargeNum = this.vo.getRechargeNum();
        var percentTxt = LanguageManager.getlocal("acCarnivalProgressText", [myRechargeNum + "", String(this._data.needGem)]);
        var percent = myRechargeNum / this._data.needGem;
        this._progress.setText(percentTxt);
        this._progress.setPercentage(percent);
    };
    EnjoyNightRewardScrollItem.prototype.collectHandler = function (evt) {
        if (this.vo.isStart == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this._data.needGem <= this.vo.getRechargeNum()) {
            this.vo.tmpReward = this.tempStr;
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTGETRECHARGERWD, { "activeId": this.itemData.aid + "-" + this.itemData.uicode, "rechargeId": this.taskId });
        }
        else {
            if (!this.vo.isInActy()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        }
    };
    EnjoyNightRewardScrollItem.prototype.update = function () {
        if (!this.vo) {
            return;
        }
        this.refreshProgress();
        var myRechargeNum = this.vo.getRechargeNum();
        if (this.vo && this.vo.getRechargeFlag(this.taskId) == false) {
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
        else {
            if (myRechargeNum >= this._data.needGem) {
                this._goBtn3.setText("taskCollect");
                this._needTxt.text = LanguageManager.getlocal("acWorshipChargePopupViewItemTitle-1", [this._data.needGem + ""]);
            }
            else {
                this._needTxt.text = LanguageManager.getlocal("acWorshipChargePopupViewItemTitle-1", [this._data.needGem + ""]);
                this._goBtn3.setText("vipshopbtn");
                if (!this.vo.isInActy()) {
                    App.DisplayUtil.changeToGray(this._goBtn3);
                }
            }
        }
    };
    Object.defineProperty(EnjoyNightRewardScrollItem.prototype, "vo", {
        get: function () {
            var springCelebrateVo = Api.acVoApi.getActivityVoByAidAndCode(this.itemData.aid, this.itemData.code);
            return springCelebrateVo;
        },
        enumerable: true,
        configurable: true
    });
    EnjoyNightRewardScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    EnjoyNightRewardScrollItem.prototype.dispose = function () {
        this._progress = null;
        this._data = null;
        this._needTxt = null;
        this._goBtn3 = null;
        this.taskId = null;
        this.tempStr = '';
        _super.prototype.dispose.call(this);
    };
    return EnjoyNightRewardScrollItem;
}(ScrollListItem));
__reflect(EnjoyNightRewardScrollItem.prototype, "EnjoyNightRewardScrollItem");
//# sourceMappingURL=EnjoyNightRewardScrollItem.js.map