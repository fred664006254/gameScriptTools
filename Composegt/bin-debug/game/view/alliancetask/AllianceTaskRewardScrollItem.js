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
        return _this;
    }
    AllianceTaskRewardScrollItem.prototype.initItem = function (index, data, ismon) {
        this._taskId = data;
        var cfgData;
        var rewardStr;
        var cellType;
        var cellValue;
        var titleStr;
        if (ismon) {
            cfgData = Config.AlliancetaskCfg.getAllianceMonTTaskById(this._taskId);
            rewardStr = cfgData.monthReward;
            cellType = 1;
            cellValue = cfgData.missionNum;
            titleStr = LanguageManager.getlocal("allianceTaskMonName", [cellValue]);
        }
        else {
            cfgData = Config.AlliancetaskCfg.getAllianceTaskById(this._taskId);
            rewardStr = cfgData.completeReward + "|101_1_" + cfgData.addExp;
            cellType = cfgData.type;
            cellValue = cfgData.value;
            titleStr = LanguageManager.getlocal("allianceTaskName" + this._taskId);
        }
        var bg = BaseBitmap.create("public_tc_bg03");
        bg.width = 524;
        bg.height = 130;
        bg.x = 3;
        this.addChild(bg);
        var attrbg = BaseBitmap.create("alliance_taskAttrbg" + cellType);
        attrbg.x = bg.x;
        attrbg.y = bg.y;
        this.addChild(attrbg);
        var taskNameTxt = ComponentManager.getTextField(titleStr, 18);
        taskNameTxt.x = attrbg.x + 10;
        taskNameTxt.y = attrbg.y + attrbg.height / 2 - taskNameTxt.height / 2;
        this.addChild(taskNameTxt);
        var startX = 15;
        var startY = attrbg.y + attrbg.height + 2;
        startX += 5;
        startY += 5;
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
        var nowNum = 0;
        if (ismon) {
            nowNum = Api.allianceTaskVoApi.getAllianceMonTaskOverNum();
        }
        else {
            var taskinfo = Api.allianceTaskVoApi.getAllianceTaskInfo(this._taskId);
            if (taskinfo) {
                nowNum = taskinfo.v;
            }
        }
        if (!ismon) {
            var _progress = ComponentManager.getProgressBar("progress_type1_yellow2", "progress_type3_bg", 488);
            _progress.setTextSize(18);
            _progress.x = bg.x + bg.width / 2 - _progress.width / 2;
            _progress.y = startY;
            _progress.setPercentage(nowNum / cellValue);
            if (nowNum >= cellValue) {
                _progress.setText(LanguageManager.getlocal("bookRoomServant_studyComplete"));
            }
            else {
                _progress.setText(LanguageManager.getlocal("allianceTaskProgressTxt", [String(Math.floor(nowNum / cellValue * 10000) / 100) + "%"]));
            }
            this.addChild(_progress);
            bg.height = _progress.y + _progress.height + 15;
        }
        if (ismon) {
            if (nowNum >= cellValue) {
                var collectImageStr = "isover";
                var collectFlag = BaseBitmap.create(collectImageStr);
                collectFlag.x = bg.x + bg.width - 70 - collectFlag.width / 2;
                collectFlag.y = bg.y + bg.height / 2 - collectFlag.height / 2;
                this.addChild(collectFlag);
            }
            else {
                var taskNameTxt_1 = ComponentManager.getTextField(LanguageManager.getlocal("allianceTaskMonthProgress", [nowNum, cellValue]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
                taskNameTxt_1.textAlign = egret.HorizontalAlign.CENTER;
                taskNameTxt_1.x = bg.x + bg.width - 70 - taskNameTxt_1.width / 2;
                taskNameTxt_1.y = bg.y + bg.height / 2 - taskNameTxt_1.height / 2;
                this.addChild(taskNameTxt_1);
            }
        }
        else {
            var collectImageStr = "notover";
            if (nowNum >= cellValue) {
                collectImageStr = "isover";
            }
            var collectFlag = BaseBitmap.create(collectImageStr);
            collectFlag.x = bg.x + bg.width - 70 - collectFlag.width / 2;
            collectFlag.y = bg.y + bg.height / 2 - collectFlag.height / 2;
            this.addChild(collectFlag);
        }
    };
    AllianceTaskRewardScrollItem.prototype.getSpaceY = function () {
        return 2;
    };
    AllianceTaskRewardScrollItem.prototype.dispose = function () {
        this._taskId = null;
        this._requsting = false;
        this._collectBtn = null;
        this._collectFlag = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceTaskRewardScrollItem;
}(ScrollListItem));
__reflect(AllianceTaskRewardScrollItem.prototype, "AllianceTaskRewardScrollItem");
