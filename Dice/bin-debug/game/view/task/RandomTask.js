var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RandomTask = (function () {
    function RandomTask(view, index) {
        this.view = view;
        this.index = index;
    }
    RandomTask.prototype.dispose = function () {
        this._rebg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rewardOnclick, this);
        this._bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bgOnclick, this);
        this._bg = null;
        this._title = null;
        this.randomProgress = null;
        this.infoImg = null;
        this.infoTxt = null;
        this._rebg = null;
        this._rewardBtn = null;
    };
    RandomTask.prototype.initView = function () {
        var taskinfovo = Api.DailytaskVoApi.getRandomTaskByIndex(this.index);
        var taskcfg = Config.DailytaskCfg.getRandomTaskByID(taskinfovo.id);
        this.taskIndex = taskinfovo.index;
        this._bg = BaseBitmap.create("taskachievement");
        this._bg.width = 495;
        this._bg.y = 10;
        // this._bg.height = 168;
        this.view.addChild(this._bg);
        this._title = ComponentMgr.getTextField('1', TextFieldConst.SIZE_28, ColorEnums.white);
        this.view.addChild(this._title);
        this._title.x = 14;
        this._title.y = this._bg.y + 15;
        this._title.text = this.taskTitle = LangMger.getlocal("random_task_title");
        this._title.strokeColor = 0x08131A;
        var refreshBtn = ComponentMgr.getButton("ab_task_refresh_btn", "", this.refreshBtnHandler, this);
        this.view.addChild(refreshBtn);
        refreshBtn.x = this._bg.width - refreshBtn.width - 10;
        refreshBtn.y = this._bg.y + 1;
        refreshBtn.setEnable(Api.DailytaskVoApi.canRefresh(this.index));
        refreshBtn.visible = Api.DailytaskVoApi.canRefresh(this.index);
        this.randomProgress = ComponentMgr.getProgressBar("ab_task_view_progress", "ab_task_progress_bg", 471);
        this.view.addChild(this.randomProgress);
        this.randomProgress.x = 13;
        this.randomProgress.y = this._bg.y + this._bg.height - this.randomProgress.height - 10;
        var rewardBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, LangMger.getlocal("taskviewreward"), this.bgOnclick, this);
        this.view.addChild(rewardBtn);
        rewardBtn.x = 327;
        rewardBtn.y = this._bg.y + 75;
        this._rewardBtn = rewardBtn;
        this.infoImg = BaseBitmap.create("task_view_had_ward");
        this.view.addChild(this.infoImg);
        this.infoImg.setPosition(354, 79);
        var deseTask = ComponentMgr.getTextField('11', TextFieldConst.SIZE_CONTENT_COMMON, ColorEnums.white);
        this.infoTxt = deseTask;
        var startX = 13;
        var startY = this._bg.y + 65;
        var rewardvo = GameData.formatRewardItem(taskcfg.rewardStr);
        var _loop_1 = function (index) {
            var rewardBg = BaseBitmap.create("ab_task_xuxian_bg");
            this_1.view.addChild(rewardBg);
            rewardBg.x = startX + 100 * index;
            rewardBg.y = startY;
            rewardBg.touchEnabled = true;
            if (index == 0) {
                this_1._rebg = rewardBg;
            }
            var item = rewardvo[index];
            var rewarditem = GameData.getItemIcon(item, item.num, false);
            rewarditem.setScale(0.8);
            var num = rewarditem.getChildByName("numTxt");
            num.y = 90;
            this_1.view.addChild(rewarditem);
            rewardBg.addTouchTap(function () {
                if (item.type === 100) {
                    var dicecfg = Config.DiceCfg.getCfgById(item.id);
                    ViewController.getInstance().openView(ViewConst.BUYDICECONFIRMPOPUPVIEW, {
                        title: dicecfg.name,
                        handler: null,
                        needCancel: false,
                        needClose: 1,
                        id: "100_" + dicecfg.id + "_" + item.num,
                        costnum: LangMger.getlocal("sysconfirm"),
                        // costIcon : `ab_mainui_gem`,
                        touchMaskClose: true
                    });
                }
                else if (item.type == 1 || item.type == 2) {
                    ViewController.getInstance().openView(ViewConst.SIGNSHOWPOPVIEW, {
                        title: item.name,
                        handler: null,
                        needCancel: false,
                        needClose: 1,
                        param: item,
                        costnum: LangMger.getlocal("sysconfirm"),
                    });
                }
            }, this_1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rewarditem, rewardBg, [0, 0]);
        };
        var this_1 = this;
        for (var index = 0; index < rewardvo.length; index++) {
            _loop_1(index);
        }
        this.update();
    };
    RandomTask.prototype.refreshBtnHandler = function () {
        var msg = LangMger.getlocal("random_task_fresh_tip", [this.taskTitle, "1"]);
        ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
            title: LangMger.getlocal("random_task_fresh_title"),
            msg: msg,
            needCancel: true,
            handler: this,
            callback: this.refreshTask
        });
    };
    RandomTask.prototype.refreshTask = function () {
        NetManager.request(NetConst.TASK_FRESH, { keyPos: this.taskIndex + 1 });
    };
    RandomTask.prototype.rewardOnclick = function (event) {
        this.bgOnclick(event);
    };
    RandomTask.prototype.bgOnclick = function (event) {
        var status = Api.DailytaskVoApi.getTaskInfoVo().taskInfo[this.index].f;
        var taskId = Api.DailytaskVoApi.getTaskInfoVo().taskInfo[this.index].id;
        Api.DailytaskVoApi.setTouchTaskIndex(this.taskIndex);
        switch (status) {
            case 0:
            case 2:
                // NetManager.request(NetConst.TASK_GET_REWARDS, {taskId:taskId});
                break;
            case 1:
                Api.UserinfoVoApi.setFreshInfo(true, new egret.Point(this._rebg.localToGlobal().x + this._rebg.width, this._rebg.localToGlobal().y + this._rebg.height / 2));
                App.MsgHelper.dispEvt(MsgConst.REWARD_RANDOM_TASK, { taskID: taskId, index: this.index });
                break;
            default:
                break;
        }
    };
    RandomTask.prototype.update = function () {
        var taskinfovo = Api.DailytaskVoApi.getRandomTaskByIndex(this.index);
        var status = taskinfovo.f;
        var cfg = Config.DailytaskCfg.getRandomTaskByID(taskinfovo.id); // taskinfovo.id
        this._title.text = this.taskTitle = this.getTaskDes(cfg);
        var progress = taskinfovo.v / cfg.value;
        if (cfg.taskType == "1007") {
            this.randomProgress.setPercentage(taskinfovo.f == 1 ? 1 : 0, (taskinfovo.f == 1 ? 1 : 0) + "/" + 1);
        }
        else {
            this.randomProgress.setPercentage(progress, taskinfovo.v + "/" + cfg.value);
        }
        var txt = this.getTaskDes(cfg);
        switch (status) {
            case 0:
                this.infoTxt.text = txt;
                this._rewardBtn.setEnable(false);
                this.infoImg.visible = false;
                break;
            case 1:
                this._rewardBtn.setEnable(true);
                this.infoImg.visible = false;
                break;
            case 2:
                this.infoImg.visible = true;
                this._rewardBtn.visible = false;
                break;
            default:
                break;
        }
    };
    RandomTask.prototype.getTaskDes = function (cfg) {
        var perStr = "task_des_";
        var des = "";
        var need1 = '';
        var need2 = '';
        switch (cfg.taskType) {
            case "1001":
                var lzname = LangMger.getlocal("dice" + cfg.need1 + "_name");
                var need2str = LangMger.getlocal("task_fight_modle_" + cfg.need2);
                des = LangMger.getlocal(perStr + cfg.taskType, [String(cfg.value), lzname, need2str]);
                break;
            case "1002":
            case "1005":
            case "1007":
                need1 = LangMger.getlocal("task_fight_modle_" + cfg.need1);
                des = LangMger.getlocal(perStr + cfg.taskType, [String(cfg.value), need1]);
                break;
            case "1003":
                need1 = LangMger.getlocal("task_fight_modle_" + cfg.need1);
                need2 = String(cfg.need2);
                des = LangMger.getlocal(perStr + cfg.taskType, [String(cfg.value), need1, need2]);
                break;
            case "1004":
            case "1006":
            case "1008":
                des = LangMger.getlocal(perStr + cfg.taskType, [String(cfg.value)]);
                break;
            default:
                break;
        }
        return des;
    };
    return RandomTask;
}());
__reflect(RandomTask.prototype, "RandomTask");
//# sourceMappingURL=RandomTask.js.map