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
 * 元旦活动 item
 */
var TreasureRewardScrollItem = (function (_super) {
    __extends(TreasureRewardScrollItem, _super);
    function TreasureRewardScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._needTxt = null;
        _this._goBtn3 = null;
        _this.cu_index = 0;
        _this.taskId = "";
        _this.itemData = null;
        _this.tempStr = "";
        /**
        * 充值进度条
        */
        _this._progress = null;
        return _this;
    }
    TreasureRewardScrollItem.prototype.initItem = function (index, data, itemData) {
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASUREHUNTGETTASKREWARDS),this.update,this); 
        // App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY,this.update,this);
        this._data = data;
        this.itemData = itemData;
        this.cu_index = Number(data.questType);
        this.taskId = data.name;
        var wordsBg = BaseBitmap.create("public_9_bg14");
        wordsBg.width = 588;
        wordsBg.height = 170;
        this.addChild(wordsBg);
        var bottom2 = BaseBitmap.create("activity_charge_red");
        bottom2.width = 405;
        this.addChild(bottom2);
        var rewarStr = data.getReward;
        if (data.specialReward) {
            var newrewarStr = "1003_0_" + data.specialReward + "_" + this.itemData.code + '' + "|" + rewarStr;
            rewarStr = newrewarStr;
        }
        this.tempStr = rewarStr;
        var rewardArr = GameData.formatRewardItem(rewarStr);
        var scroStartY = 80;
        var tmpX = 14;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true, true);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            iconItem.setScale(0.78);
            tmpX += (iconItem.width - 8);
            if (tmpX > wordsBg.width - 128) {
                tmpX = 14;
                scroStartY += iconItem.height - 5;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width - 8);
            }
            this.addChild(iconItem);
        }
        scroStartY += 130;
        wordsBg.height = scroStartY + 20;
        this.height = wordsBg.height;
        this._progress = ComponentManager.getProgressBar("progress7", "progress7_bg", 376);
        this._progress.setPosition(wordsBg.x + 10, this.height - 50);
        this.addChild(this._progress);
        //领取
        this._goBtn3 = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", this.collectHandler, this);
        this._goBtn3.x = 410;
        this._goBtn3.y = this.height / 2 - this._goBtn3.height / 2; //75; 
        this.addChild(this._goBtn3);
        //当前充值进度（0／1）
        var needTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        needTxt.text = LanguageManager.getlocal("acTreasureRewardes", [data.value + ""]);
        needTxt.width = bottom2.width;
        needTxt.x = bottom2.x + 15;
        needTxt.y = bottom2.y + 10;
        this._needTxt = needTxt;
        this.addChild(needTxt);
        this.update();
    };
    TreasureRewardScrollItem.prototype.refreshProgress = function () {
        var myRechargeNum = this.vo.getAinfoV();
        var percentTxt = LanguageManager.getlocal("acCarnivalProgressText", [myRechargeNum + "", String(this._data.value)]);
        var percent = myRechargeNum / this._data.value;
        this._progress.setText(percentTxt);
        this._progress.setPercentage(percent);
    };
    TreasureRewardScrollItem.prototype.collectHandler = function (evt) {
        if (this.vo.isStart == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (!this.vo.isInActy()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
            return;
        }
        if (this._data.value <= this.vo.getAinfoV()) {
            var newRechargeNum = this.taskId;
            this.vo.tmpReward = this.tempStr;
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_TREASUREHUNTGETTASKREWARDS, { "activeId": this.itemData.aid + "-" + this.itemData.code, "taskId": newRechargeNum });
        }
        else {
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        }
    };
    TreasureRewardScrollItem.prototype.update = function () {
        if (!this.vo) {
            return;
        }
        if (!this.vo.isInActy()) {
            App.DisplayUtil.changeToGray(this._goBtn3);
            return;
        }
        this.refreshProgress();
        var myRechargeNum = this.vo.getAinfoV();
        if (this.vo && this.vo.getReceiveType(this.taskId) == false) {
            if (this._goBtn3.visible == true) {
                this._goBtn3.visible = false;
                var collectflag = BaseBitmap.create("collectflag");
                collectflag.x = 450;
                collectflag.y = 50;
                collectflag.scaleX = 0.7;
                collectflag.scaleY = 0.7;
                this.addChild(collectflag);
            }
        }
        else {
            if (myRechargeNum >= this._data.value) {
                this._goBtn3.setText("taskCollect");
                this._needTxt.text = LanguageManager.getlocal("acTreasureRewardes", [this._data.value + ""]);
            }
            else {
                this._needTxt.text = LanguageManager.getlocal("acTreasureRewardes", [this._data.value + ""]);
                this._goBtn3.setText("vipshopbtn");
            }
        }
    };
    Object.defineProperty(TreasureRewardScrollItem.prototype, "vo", {
        get: function () {
            var springCelebrateVo = Api.acVoApi.getActivityVoByAidAndCode(this.itemData.aid, this.itemData.code);
            return springCelebrateVo;
        },
        enumerable: true,
        configurable: true
    });
    TreasureRewardScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    TreasureRewardScrollItem.prototype.dispose = function () {
        this._progress = null;
        this._data = null;
        this._needTxt = null;
        this._goBtn3 = null;
        this.cu_index = 0;
        this.taskId = null;
        this.tempStr = '';
        // App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.update,this);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASUREHUNTGETTASKREWARDS),this.update,this); 
        _super.prototype.dispose.call(this);
    };
    return TreasureRewardScrollItem;
}(ScrollListItem));
__reflect(TreasureRewardScrollItem.prototype, "TreasureRewardScrollItem");
//# sourceMappingURL=TreasureRewardScrollItem.js.map