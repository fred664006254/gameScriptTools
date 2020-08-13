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
var LadderTaskViewItem1 = (function (_super) {
    __extends(LadderTaskViewItem1, _super);
    function LadderTaskViewItem1() {
        var _this = _super.call(this) || this;
        _this._progress = null;
        _this._receiveBM = null;
        _this._receiveBtn = null;
        _this._rechargeBtn = null;
        _this._itemData = null;
        //任务类型
        _this._type = 0;
        //任务在配置中的位置
        _this._taskType = 0;
        return _this;
    }
    LadderTaskViewItem1.prototype.initItem = function (index, data, itemparam) {
        this._itemData = data;
        this._type = this._itemData.taskType;
        this._taskType = itemparam;
        this.width = 608;
        var itembg = BaseBitmap.create("public_9_bg14");
        itembg.width = this.width;
        itembg.height = 210;
        this.addChild(itembg);
        var titleBg = BaseLoadBitmap.create("acmidautumnview_titlebg");
        titleBg.width = 600;
        titleBg.height = 35;
        titleBg.setPosition(itembg.x + itembg.width / 2 - titleBg.width / 2, itembg.y + 5);
        this.addChild(titleBg);
        var titleTFKey = "taskDesc" + this._itemData.taskType;
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal(titleTFKey, [String(this._itemData.value)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        var itemTopLine = BaseBitmap.create("public_line3");
        itemTopLine.width += titleTF.width;
        itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
        this.addChild(itemTopLine);
        var rewardBg = BaseBitmap.create("public_9_managebg");
        // 113 X 420;
        rewardBg.width = 405;
        rewardBg.height = 113;
        rewardBg.setPosition(titleBg.x + 10, titleBg.y + titleBg.height + 5);
        this.addChild(rewardBg);
        var rewardArr = GameData.formatRewardItem(this._itemData.getReward);
        var itemHeight;
        for (var i = 0; i < rewardArr.length; i++) {
            var rewardItem = GameData.getItemIcon(rewardArr[i], true);
            rewardItem.anchorOffsetX = rewardItem.width / 2;
            rewardItem.anchorOffsetY = rewardItem.height / 2;
            rewardItem.setScale(0.9);
            rewardItem.setPosition(rewardBg.x + rewardItem.width / 2 + i % 4 * (rewardItem.width - 5), rewardBg.y + rewardItem.height / 2 + (Math.floor((i) / 4)) * rewardItem.height + 3);
            this.addChild(rewardItem);
            itemHeight = rewardItem.height;
        }
        rewardBg.height += (Math.ceil(rewardArr.length / 4) - 1) * itemHeight;
        itembg.height += (Math.ceil(rewardArr.length / 4) - 1) * itemHeight;
        this._progress = ComponentManager.getProgressBar("progress7", "progress7_bg", 576);
        this._progress.setPosition(itembg.x + 10, itembg.y + itembg.height - this._progress.height - 22);
        this.addChild(this._progress);
        var textkey;
        if (this._type == 1003) {
            textkey = "acCarnivalToChargeBtnText";
        }
        else {
            textkey = "allianceBtnGo";
        }
        this._rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, textkey, this.rechargeHandler, this);
        this._rechargeBtn.setPosition(itembg.x + itembg.width - this._rechargeBtn.width - 15, itembg.y + itembg.height / 2 - this._rechargeBtn.height / 2);
        this.addChild(this._rechargeBtn);
        this._receiveBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "ac_recharge_Btntxt2", this.receiveHandler, this);
        this._receiveBtn.setPosition(this._rechargeBtn.x + this._rechargeBtn.width / 2 - this._receiveBtn.width / 2, this._rechargeBtn.y + this._rechargeBtn.height / 2 - this._receiveBtn.height / 2);
        this.addChild(this._receiveBtn);
        if (this._taskType != 1 && Api.laddertournamentVoApi.acVo.checkShow() == false) {
            App.DisplayUtil.changeToGray(this._receiveBtn);
        }
        this._receiveBM = BaseBitmap.create("collectflag");
        this._receiveBM.anchorOffsetX = this._receiveBM.width / 2;
        this._receiveBM.anchorOffsetY = this._receiveBM.height / 2;
        this._receiveBM.setScale(0.6);
        this._receiveBM.setPosition(this._rechargeBtn.x + this._rechargeBtn.width / 2, this._rechargeBtn.y + this._rechargeBtn.height / 2);
        this.addChild(this._receiveBM);
        this.refreshView();
    };
    /**
     * 刷新UI
     */
    LadderTaskViewItem1.prototype.refreshView = function () {
        this.refreshProgress();
        this.refreshBtn();
    };
    /**
     * 刷新进度
     */
    LadderTaskViewItem1.prototype.refreshProgress = function () {
        var laddervoapi = Api.laddertournamentVoApi;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(laddervoapi.aid, laddervoapi.code);
        var textkey;
        if (this._type == 1003) {
            textkey = "acCarnivalProgressText";
        }
        else {
            textkey = "AcMazeViewTaskPlan";
        }
        var percentTxt = LanguageManager.getlocal(textkey, [String(vo.getValue(this._type)), String(this._itemData.value)]);
        var percent = vo.getValue(this._type) / this._itemData.value;
        this._progress.setText(percentTxt);
        this._progress.setPercentage(percent);
    };
    /**
     * 更新Btn
     */
    LadderTaskViewItem1.prototype.refreshBtn = function () {
        var laddervoapi = Api.laddertournamentVoApi;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(laddervoapi.aid, laddervoapi.code);
        if (vo.isReward(this._taskType, this._itemData.id)) {
            this._receiveBM.setVisible(true);
            this._rechargeBtn.setVisible(false);
            this._receiveBtn.setVisible(false);
        }
        else {
            if (vo.getValue(this._type) < this._itemData.value) {
                this._receiveBM.setVisible(false);
                this._rechargeBtn.setVisible(true);
                this._receiveBtn.setVisible(false);
            }
            else {
                this._receiveBM.setVisible(false);
                this._rechargeBtn.setVisible(false);
                this._receiveBtn.setVisible(true);
            }
        }
    };
    /**
     * 打开充值界面
     */
    LadderTaskViewItem1.prototype.rechargeHandler = function (event) {
        var laddervoapi = Api.laddertournamentVoApi;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(laddervoapi.aid, laddervoapi.code);
        var deltaT = vo.et - GameData.serverTime - 86400 * laddervoapi.cfg.extraTime;
        if (deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this._type == 1003) {
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        }
        else if (this._type == 1009) {
            ViewController.getInstance().openView(ViewConst.COMMON.SERVANTVIEW);
        }
        else if (this._type == 1010) {
            ViewController.getInstance().openView(ViewConst.COMMON.WIFEVIEW_TAB1);
        }
        else if (this._type == 603) {
            if (Api.atkraceVoApi.isShowNpc() == false) {
                App.CommonUtil.showTip(Api.atkraceVoApi.getLockedString());
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.ATKRACEVIEW);
        }
    };
    /**
     * 领取按钮
     */
    LadderTaskViewItem1.prototype.receiveHandler = function () {
        if (this._taskType != 1 && Api.laddertournamentVoApi.acVo.checkShow() == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acLadder_needUnlock"));
            return;
        }
        var laddervoapi = Api.laddertournamentVoApi;
        var activityId = laddervoapi.aidAndCode;
        laddervoapi.taskReward = this._itemData.getReward;
        NetManager.request(NetRequestConst.REQUEST_LT_GETASK, { "activeId": activityId, "pos": [this._taskType, Number(this._itemData.id)] });
    };
    LadderTaskViewItem1.prototype.getSpaceY = function () {
        return 5;
    };
    LadderTaskViewItem1.prototype.dispose = function () {
        this._progress = null;
        this._receiveBM = null;
        this._receiveBtn = null;
        this._rechargeBtn = null;
        this._itemData = null;
        this._type = 0;
        this._taskType = 0;
        _super.prototype.dispose.call(this);
    };
    return LadderTaskViewItem1;
}(ScrollListItem));
__reflect(LadderTaskViewItem1.prototype, "LadderTaskViewItem1");
//# sourceMappingURL=LadderTaskViewItem1.js.map