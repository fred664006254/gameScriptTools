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
        return _super.call(this) || this;
    }
    AllianceTaskScrollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_FIGHT), this.refreshUiInfo, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_EXTRA), this.refreshUiInfo, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_OPENALLIANCETASK), this.refreshUiInfo, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ALLIANCETASK_BATCHFIGHT, this.refreshUiInfo, this);
        this._taskId = data;
        var bg = BaseBitmap.create("alliance_taskbg");
        bg.width = 625;
        this.addChild(bg);
        var cfg = Config.AlliancetaskCfg.getAllianceTaskById(this._taskId);
        var taskimg = BaseLoadBitmap.create("allianceTask_img" + this._taskId);
        taskimg.width = 587;
        taskimg.height = 206;
        taskimg.x = 30;
        taskimg.y = 40;
        this.addChild(taskimg);
        var attrbg = BaseBitmap.create("alliance_taskAttrbg" + cfg.type);
        attrbg.x = taskimg.x + 15;
        attrbg.y = taskimg.y + 5;
        this.addChild(attrbg);
        var attrWordbg = BaseBitmap.create("alliance_taskAttrWord" + cfg.type);
        attrWordbg.x = attrbg.x - 20;
        attrWordbg.y = attrbg.y + attrbg.height / 2 - attrWordbg.height / 2;
        this.addChild(attrWordbg);
        // let attrWord = BaseBitmap.create("public_icon"+(cfg.type+7));
        // attrWord.x = attrWordbg.x + attrWordbg.width/2 - attrWord.width/2;
        // attrWord.y = attrWordbg.y + attrWordbg.height/2 - attrWord.height/2;
        // this.addChild(attrWord);
        var taskNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceTaskName" + this._taskId), 18);
        taskNameTxt.x = attrbg.x + 40;
        taskNameTxt.y = attrbg.y + attrbg.height / 2 - taskNameTxt.height / 2;
        this.addChild(taskNameTxt);
        var rewardTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BROWN);
        this._rewardTxt = rewardTxt;
        this._rewardTxt.text = LanguageManager.getlocal("allianceTaskrewardStr", ["" + cfg.totalNum]);
        rewardTxt.x = taskimg.x + 10;
        rewardTxt.y = taskimg.y + taskimg.height + 15;
        this.addChild(rewardTxt);
        // buf
        var curBufId = Api.allianceTaskVoApi.getCurrentBuffId();
        if (curBufId) {
            var bufCfg = Config.AlliancetaskCfg.getAllianceTaskBuffById(curBufId);
            if (bufCfg) {
                var taskcfg = Config.AlliancetaskCfg.getAllianceTaskById(this._taskId);
                if (bufCfg.type.indexOf(taskcfg.type) >= 0) {
                    var addvStr = (Api.allianceTaskVoApi.getBuffBuyTimes(curBufId) * bufCfg.value * 100).toFixed(1) + "%";
                    var upBF = ComponentManager.getBitmapText(addvStr, "studyatk_upfnt");
                    upBF.x = rewardTxt.x + rewardTxt.width + 100 - upBF.width / 2;
                    upBF.y = rewardTxt.y + rewardTxt.height / 2 - upBF.height / 2;
                    this.addChild(upBF);
                    var studyatk_uparrow = BaseBitmap.create("studyatk_uparrow");
                    studyatk_uparrow.x = upBF.x + upBF.width;
                    studyatk_uparrow.y = upBF.y + upBF.height / 2 - studyatk_uparrow.height / 2;
                    this.addChild(studyatk_uparrow);
                }
            }
        }
        this._progress = ComponentManager.getProgressBar("progress_type1_yellow2", "progress_type3_bg", 400);
        this._progress.x = rewardTxt.x;
        this._progress.y = rewardTxt.y + 28;
        this._progress.setPercentage(0.5);
        this.addChild(this._progress);
        var goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceBtnGo", this.goBtnHandler, this);
        goBtn.x = this._progress.x + this._progress.width + 40;
        goBtn.y = this._progress.y + this._progress.height - goBtn.height + 5;
        this.addChild(goBtn);
        this._goBtn = goBtn;
        var statbgPic = BaseBitmap.create("alliance_task_statebg");
        statbgPic.x = taskimg.x + taskimg.width - 88 - statbgPic.width / 2;
        statbgPic.y = bg.y + bg.height / 2 - statbgPic.height / 2;
        this.addChild(statbgPic);
        this.statbgPic = statbgPic;
        var statPic = BaseBitmap.create("achievement_state1");
        statPic.x = statbgPic.x;
        statPic.y = statbgPic.y;
        this.addChild(statPic);
        this.statPic = statPic;
        this.refreshUiInfo();
    };
    AllianceTaskScrollItem.prototype.refreshUiInfo = function () {
        var taskinfo = Api.allianceTaskVoApi.getAllianceTaskInfo(this._taskId);
        var cfg = Config.AlliancetaskCfg.getAllianceTaskById(this._taskId);
        if (taskinfo) {
            this._progress.setPercentage(taskinfo.v / cfg.value);
            if (taskinfo.v >= cfg.value) {
                this._progress.setText(LanguageManager.getlocal("bookRoomServant_studyComplete"));
                this._goBtn.setText("allianceBtnCheck");
            }
            else {
                this._goBtn.setText("allianceBtnGo");
                this._progress.setText(LanguageManager.getlocal("allianceTaskProgressTxt", [String(Math.floor(taskinfo.v / cfg.value * 10000) / 100) + "%"]));
            }
            this.statPic.visible = true;
            this.statbgPic.visible = true;
            if (taskinfo.flag == 0) {
                this.statPic.texture = ResourceManager.getRes("achievement_state1");
            }
            else {
                this.statPic.texture = ResourceManager.getRes("isover");
            }
            this.statPic.setScale(this.statbgPic.width / this.statPic.width);
        }
        else {
            this._goBtn.setText("allianceBtnOpen");
            this._progress.setPercentage(0);
            this._progress.setText(LanguageManager.getlocal("allianceTaskProgressTxt", ["0%"]));
            this.statPic.visible = false;
            this.statbgPic.visible = false;
        }
        this._rewardTxt.text = LanguageManager.getlocal("allianceTaskrewardStr", ["" + cfg.totalNum]);
    };
    AllianceTaskScrollItem.prototype.goBtnHandler = function () {
        if (this._progress.getPercent() >= 1) {
            ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCETASKRANKPOPUPVIEW, { taskId: this._taskId });
            return;
        }
        var tws = App.DateUtil.getWeeTs(GameData.serverTime);
        if (GameData.serverTime + 1800 >= tws + 86400) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceTaskoutTimeTip"));
            return;
        }
        var taskinfo = Api.allianceTaskVoApi.getAllianceTaskInfo(this._taskId);
        if (taskinfo && taskinfo.openflag == 1) {
            ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCETASKDETAILVIEW, { taskId: this._taskId });
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCETASKOPENVIEW, { taskId: this._taskId });
        }
    };
    AllianceTaskScrollItem.prototype.getSpaceY = function () {
        return 2;
    };
    AllianceTaskScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_FIGHT), this.refreshUiInfo, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_EXTRA), this.refreshUiInfo, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_OPENALLIANCETASK), this.refreshUiInfo, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ALLIANCETASK_BATCHFIGHT, this.refreshUiInfo, this);
        this._progress = null;
        this._taskId = "";
        this._rewardTxt = null;
        this._goBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceTaskScrollItem;
}(ScrollListItem));
__reflect(AllianceTaskScrollItem.prototype, "AllianceTaskScrollItem");
