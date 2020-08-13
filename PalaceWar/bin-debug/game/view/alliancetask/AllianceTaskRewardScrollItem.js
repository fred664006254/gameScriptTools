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
 *帮会任务奖励
 * author yanyuling
 * date 2018/07/20
 * @class AllianceTaskRewardScrollItem
 */
var AllianceTaskRewardScrollItem = (function (_super) {
    __extends(AllianceTaskRewardScrollItem, _super);
    function AllianceTaskRewardScrollItem() {
        var _this = _super.call(this) || this;
        _this._requsting = false;
        _this._joinIcon = null;
        _this._rewardText = null;
        _this._rewardTxt = null;
        return _this;
    }
    AllianceTaskRewardScrollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_REWARD), this.collectCallBack, this);
        this._taskId = data;
        var cfgData = Config.AlliancetaskCfg.getAllianceTaskById(this._taskId);
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 524;
        bg.height = 130;
        bg.x = 3;
        this.addChild(bg);
        var attrbg = BaseBitmap.create("alliance_taskAttrbg" + cfgData.type);
        attrbg.x = bg.x + 3;
        attrbg.y = bg.y + 5;
        this.addChild(attrbg);
        var taskNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceTaskName" + this._taskId), 18);
        taskNameTxt.x = attrbg.x + 10;
        taskNameTxt.y = attrbg.y + attrbg.height / 2 - taskNameTxt.height / 2;
        this.addChild(taskNameTxt);
        var startX = 15;
        var startY = attrbg.y + attrbg.height + 2;
        var rewardBg = BaseBitmap.create("public_9_managebg");
        rewardBg.width = 275;
        rewardBg.height = 107;
        rewardBg.x = startX;
        rewardBg.y = startY;
        this.addChild(rewardBg);
        startX += 5;
        startY += 5;
        var rewardStr = cfgData.completeReward;
        var rewardArr = GameData.getRewardItemIcons(rewardStr, true);
        var deltalW = 90;
        var deltaH = 90;
        for (var index = 0; index < rewardArr.length; index++) {
            var element = rewardArr[index];
            element.setScale(0.78);
            if (index % 4 == 0 && index > 0) {
                startX = 20;
                startY += deltaH;
            }
            element.x = startX;
            element.y = startY;
            startX += deltalW;
            this.addChild(element);
        }
        startY += deltaH;
        rewardBg.height = startY - rewardBg.y;
        this._progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 488);
        this._progress.setTextSize(18);
        this._progress.x = rewardBg.x + 5;
        this._progress.y = rewardBg.y + rewardBg.height + 5;
        this._progress.setPercentage(0.5);
        this.addChild(this._progress);
        bg.height = this._progress.y + this._progress.height + 15;
        var collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.collectBtnHandler, this);
        collectBtn.x = bg.x + bg.width - 152;
        collectBtn.y = bg.y + bg.height / 2 - collectBtn.height / 2 + 15;
        this.addChild(collectBtn);
        this._collectBtn = collectBtn;
        var rewardTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BROWN);
        rewardTxt.text = LanguageManager.getlocal("allianceBuildGet2") + "+" + cfgData.completeAsset;
        if (PlatformManager.checkIsTextHorizontal()) {
            rewardTxt.x = bg.x + bg.width - rewardTxt.width - 35;
        }
        else {
            rewardTxt.x = collectBtn.x + collectBtn.width / 2 - rewardTxt.width / 2;
        }
        rewardTxt.y = collectBtn.y - 25;
        this.addChild(rewardTxt);
        this._rewardTxt = rewardTxt;
        this._rewardText = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BLACK);
        if (!PlatformManager.checkIsTextHorizontal()) {
            this._rewardText.width = 140;
            this._rewardText.lineSpacing = 5;
            this._rewardText.textAlign = egret.HorizontalAlign.CENTER;
            this._rewardText.setPosition(380, rewardTxt.y + rewardTxt.height + 7);
        }
        this.addChild(this._rewardText);
        this.refreshCollectStatus();
    };
    AllianceTaskRewardScrollItem.prototype.refreshCollectStatus = function () {
        var cfgData = Config.AlliancetaskCfg.getAllianceTaskById(this._taskId);
        var taskinfo = Api.allianceTaskVoApi.getAllianceTaskInfo(this._taskId);
        var flag = 0;
        var isJoon = false;
        if (taskinfo) {
            flag = taskinfo.flag;
            this._progress.setPercentage(taskinfo.v / cfgData.value);
            if (taskinfo.v >= cfgData.value) {
                this._progress.setText(LanguageManager.getlocal("bookRoomServant_studyComplete"));
            }
            else {
                this._progress.setText(LanguageManager.getlocal("allianceTaskProgressTxt", [taskinfo.v + "/" + cfgData.value]));
            }
            if (taskinfo.uids && taskinfo.uids[Api.playerVoApi.getPlayerID()]) {
                isJoon = true;
            }
        }
        else {
            this._progress.setPercentage(0);
            this._progress.setText(LanguageManager.getlocal("allianceTaskProgressTxt", ["0/" + cfgData.value]));
        }
        if (!this._joinIcon) {
            var iconStr = isJoon ? "alliance_join4" : "alliance_join3";
            this._joinIcon = BaseBitmap.create(iconStr);
            this._joinIcon.setPosition(452 - this._joinIcon.width / 2, 20);
            if (PlatformManager.checkIsTextHorizontal()) {
                this._joinIcon.x = this._rewardTxt.x + this._rewardTxt.width / 2 - this._joinIcon.width / 2;
            }
            this.addChild(this._joinIcon);
            // this._joinIcon.visible = false;
        }
        this._collectBtn.visible = false;
        this._rewardText.visible = false;
        if (flag == 2) {
            this.makeCollectFlag();
            this._collectFlag.setScale(0.7);
        }
        else if (flag == 1) {
            if (Api.allianceVoApi.getMyAllianceVo().po < 3) {
                this._collectBtn.visible = true;
            }
            else {
                this._rewardText.visible = true;
                this._rewardText.text = LanguageManager.getlocal("alliancetask_wait_reward");
                if (PlatformManager.checkIsTextHorizontal()) {
                    this._rewardText.setPosition(this._rewardTxt.x + this._rewardTxt.width - this._rewardText.width, this._rewardTxt.y + this._rewardTxt.height + 7);
                    this._rewardTxt.x = this._rewardText.x + this._rewardText.width / 2 - this._rewardTxt.width / 2;
                    if (this._joinIcon) {
                        this._joinIcon.x = this._rewardTxt.x + this._rewardTxt.width / 2 - this._joinIcon.width / 2;
                    }
                }
            }
        }
        else {
            this._rewardText.visible = true;
            this._rewardText.text = LanguageManager.getlocal("alliancetask_undone");
            if (PlatformManager.checkIsTextHorizontal()) {
                this._rewardText.setPosition(this._rewardTxt.x + this._rewardTxt.width / 2 - this._rewardText.width / 2, this._rewardTxt.y + this._rewardTxt.height + 7);
            }
        }
    };
    AllianceTaskRewardScrollItem.prototype.makeCollectFlag = function () {
        if (this._collectFlag == null) {
            this._collectFlag = BaseBitmap.create("collectflag");
            this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
            this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
            this._collectFlag.x = this._collectBtn.x + this._collectBtn.width / 2;
            this._collectFlag.y = this._collectBtn.y + this._collectBtn.height / 2;
            this.addChild(this._collectFlag);
        }
    };
    AllianceTaskRewardScrollItem.prototype.collectCallBack = function (event) {
        if (!this._requsting) {
            return;
        }
        if (event && event.data && event.data.ret) {
            var rdata = event.data.data;
            this._requsting = false;
            this.refreshCollectStatus();
            this.makeCollectFlag();
            this._collectFlag.setScale(1.3);
            this._collectFlag.visible = true;
            egret.Tween.get(this._collectFlag, { loop: false }).to({ scaleX: 0.7, scaleY: 0.7 }, 400).wait(600);
            if (event.data.data.data.taskcantget) {
                App.CommonUtil.showTip(LanguageManager.getlocal("allianceTaskrewardTip"));
                return;
            }
            var cfgData = Config.AlliancetaskCfg.getAllianceTaskById(this._taskId);
            var pos = egret.Point.create(320, GameConfig.stageHeigth / 2);
            App.CommonUtil.playRewardFlyAction([{
                    tipMessage: LanguageManager.getlocal("allianceBuildGet2") + "+" + cfgData.completeAsset
                },
            ], pos);
        }
    };
    AllianceTaskRewardScrollItem.prototype.collectBtnHandler = function () {
        if (Api.allianceTaskVoApi.isInNotGetTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("alliancetask_getRewardTip"));
            return;
        }
        if (Api.allianceVoApi.getMyAllianceVo().po > 2) {
            App.CommonUtil.showTip(LanguageManager.getlocal("alliancetask_rewardTip1"));
            return;
        }
        var taskinfo = Api.allianceTaskVoApi.getAllianceTaskInfo(this._taskId);
        if (!taskinfo || taskinfo.flag != 1) {
            return;
        }
        this._requsting = true;
        NetManager.request(NetRequestConst.REQUEST_ALLIANCETASK_REWARD, { tid: this._taskId });
    };
    AllianceTaskRewardScrollItem.prototype.getSpaceY = function () {
        return 2;
    };
    AllianceTaskRewardScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_REWARD), this.collectCallBack, this);
        this._progress = null;
        this._taskId = null;
        this._requsting = false;
        this._collectBtn = null;
        this._collectFlag = null;
        this._joinIcon = null;
        this._rewardText = null;
        this._rewardTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceTaskRewardScrollItem;
}(ScrollListItem));
__reflect(AllianceTaskRewardScrollItem.prototype, "AllianceTaskRewardScrollItem");
//# sourceMappingURL=AllianceTaskRewardScrollItem.js.map