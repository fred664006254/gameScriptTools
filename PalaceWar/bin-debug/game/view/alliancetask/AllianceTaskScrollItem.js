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
 *帮会任务
 * author yanyuling
 * date 2018/07/20
 * @class AllianceTaskScrollItem
 */
var AllianceTaskScrollItem = (function (_super) {
    __extends(AllianceTaskScrollItem, _super);
    function AllianceTaskScrollItem() {
        var _this = _super.call(this) || this;
        _this._joinIcon1 = null;
        _this._joinIcon2 = null;
        _this._isLimitlessTask = false;
        return _this;
    }
    AllianceTaskScrollItem.prototype.initItem = function (index, data) {
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_FIGHT),this.refreshUiInfo,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_EXTRA), this.refreshUiInfo, this);
        this._taskId = data;
        var limitlessTaskId = Api.allianceTaskVoApi.getLimitlessTaskId();
        var bgStr = "alliance_taskbg";
        if (this._taskId == limitlessTaskId) {
            this._isLimitlessTask = true;
            bgStr = "alliance_taskbg5";
        }
        var bg = BaseBitmap.create(bgStr);
        this.addChild(bg);
        var cfg = Config.AlliancetaskCfg.getAllianceTaskById(this._taskId);
        var taskimg = BaseLoadBitmap.create("allianceTask_img" + this._taskId);
        taskimg.width = 578;
        taskimg.height = 182;
        taskimg.x = 30;
        taskimg.y = 15;
        this.addChild(taskimg);
        var attrbg = BaseBitmap.create("alliance_taskAttrbg" + cfg.type);
        attrbg.x = taskimg.x + 7;
        attrbg.y = taskimg.y;
        this.addChild(attrbg);
        var attrWordbg = BaseBitmap.create("alliance_taskAttrWordbg");
        attrWordbg.x = attrbg.x - 12;
        attrWordbg.y = attrbg.y + attrbg.height / 2 - attrWordbg.height / 2;
        this.addChild(attrWordbg);
        var attrWordImg = "public_icon" + (cfg.type + 7);
        if (this._isLimitlessTask) {
            attrWordImg = "public_icon13";
        }
        var attrWord = BaseBitmap.create(attrWordImg);
        attrWord.x = attrWordbg.x + attrWordbg.width / 2 - attrWord.width / 2;
        attrWord.y = attrWordbg.y + attrWordbg.height / 2 - attrWord.height / 2;
        this.addChild(attrWord);
        var taskNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceTaskName" + this._taskId), 18);
        taskNameTxt.x = attrbg.x + 40;
        taskNameTxt.y = attrbg.y + attrbg.height / 2 - taskNameTxt.height / 2;
        this.addChild(taskNameTxt);
        var rewardTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BROWN);
        this._rewardTxt = rewardTxt;
        if (this._isLimitlessTask) {
            this._rewardTxt.text = LanguageManager.getlocal("allianceTaskrewardStr1");
        }
        else {
            this._rewardTxt.text = LanguageManager.getlocal("allianceTaskrewardStr", ["" + cfg.totalNum]);
        }
        rewardTxt.x = taskimg.x + 10;
        rewardTxt.y = taskimg.y + taskimg.height + 4;
        this.addChild(rewardTxt);
        this._progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 430);
        this._progress.x = rewardTxt.x;
        this._progress.y = rewardTxt.y + 22;
        this._progress.setPercentage(0.5);
        this.addChild(this._progress);
        var goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceBtnGo", this.goBtnHandler, this);
        goBtn.x = this._progress.x + this._progress.width;
        goBtn.y = this._progress.y + this._progress.height - goBtn.height + 2;
        this.addChild(goBtn);
        this._goBtn = goBtn;
        this._joinIcon1 = BaseBitmap.create("alliance_join1");
        this._joinIcon1.setPosition(this.width - this._joinIcon1.width, 0);
        this.addChild(this._joinIcon1);
        this._joinIcon2 = BaseBitmap.create("alliance_join2");
        this._joinIcon2.setPosition(this.width - this._joinIcon2.width, 0);
        this.addChild(this._joinIcon2);
        this.refreshUiInfo();
        // if (this._isLimitlessTask)
        // {
        // 	this._joinIcon1.visible = false;
        // 	this._joinIcon2.visible = false;
        // }
    };
    AllianceTaskScrollItem.prototype.refreshUiInfo = function () {
        var taskinfo = Api.allianceTaskVoApi.getAllianceTaskInfo(this._taskId);
        var cfg = Config.AlliancetaskCfg.getAllianceTaskById(this._taskId);
        var isJoon = false;
        if (this._isLimitlessTask) {
            this._progress.setPercentage(1);
            this._progress.setText(LanguageManager.getlocal("allianceTaskProgressTxt1"));
            if (taskinfo) {
                if (taskinfo.uids && taskinfo.uids[Api.playerVoApi.getPlayerID()]) {
                    isJoon = true;
                }
            }
        }
        else {
            if (taskinfo) {
                this._progress.setPercentage(taskinfo.v / cfg.value);
                if (taskinfo.v >= cfg.value) {
                    this._progress.setText(LanguageManager.getlocal("bookRoomServant_studyComplete"));
                    this._goBtn.setText("allianceBtnCheck");
                }
                else {
                    this._progress.setText(LanguageManager.getlocal("allianceTaskProgressTxt", [taskinfo.v + "/" + cfg.value]));
                }
                if (taskinfo.uids && taskinfo.uids[Api.playerVoApi.getPlayerID()]) {
                    isJoon = true;
                }
            }
            else {
                this._progress.setPercentage(0);
                this._progress.setText(LanguageManager.getlocal("allianceTaskProgressTxt", ["0/" + cfg.value]));
            }
            this._rewardTxt.text = LanguageManager.getlocal("allianceTaskrewardStr", ["" + cfg.totalNum]);
        }
        // if (this._isLimitlessTask)
        // {
        // 	this._joinIcon1.visible = false;
        // 	this._joinIcon2.visible = false;
        // }
        // else
        // {
        this._joinIcon1.visible = !isJoon;
        this._joinIcon2.visible = isJoon;
        // }
    };
    AllianceTaskScrollItem.prototype.goBtnHandler = function () {
        if (!this._isLimitlessTask) {
            if (this._progress.getPercent() >= 1) {
                ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCETASKRANKPOPUPVIEW, { taskId: this._taskId });
                return;
            }
        }
        var tws = App.DateUtil.getWeeTs(GameData.serverTime);
        if (GameData.serverTime + 1800 >= tws + 86400) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceTaskoutTimeTip"));
            return;
        }
        if (this._isLimitlessTask && !Api.allianceTaskVoApi.isOpenLimitlessTask()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceTaskoutTimeTip"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCETASKDETAILVIEW, { taskId: this._taskId });
    };
    AllianceTaskScrollItem.prototype.getSpaceY = function () {
        return 2;
    };
    AllianceTaskScrollItem.prototype.dispose = function () {
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_FIGHT),this.refreshUiInfo,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_EXTRA), this.refreshUiInfo, this);
        this._progress = null;
        this._taskId = "";
        this._rewardTxt = null;
        this._goBtn = null;
        this._joinIcon1 = null;
        this._joinIcon2 = null;
        this._isLimitlessTask = false;
        _super.prototype.dispose.call(this);
    };
    return AllianceTaskScrollItem;
}(ScrollListItem));
__reflect(AllianceTaskScrollItem.prototype, "AllianceTaskScrollItem");
//# sourceMappingURL=AllianceTaskScrollItem.js.map