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
  * 任务item
  * author 张朝阳
  * date 2019/7/16
  * @class AcRyeHarvestActivityRewardTaskScrollItem
  */
var AcRyeHarvestActivityRewardTaskScrollItem = (function (_super) {
    __extends(AcRyeHarvestActivityRewardTaskScrollItem, _super);
    function AcRyeHarvestActivityRewardTaskScrollItem() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._aidAndCode = null;
        return _this;
    }
    /**
     * 初始化itemview
     */
    AcRyeHarvestActivityRewardTaskScrollItem.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        this._itemData = data;
        this._aidAndCode = itemParam;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        var itembg = BaseBitmap.create("public_9_bg14");
        itembg.width = 520;
        // itembg.height = 80;
        this.addChild(itembg);
        var titleBg = BaseBitmap.create("activity_charge_red");
        titleBg.y = 7;
        titleBg.x = 3;
        this.addChild(titleBg);
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acRyeHarvestActivityRewardTaskScrollItemTaskType" + this._itemData.questType + "-" + this._aidAndCode.code, [String(this._itemData.value)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + 25, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        // titleBg.width = titleTF.width + 50;
        var rewards = this._itemData.getReward;
        if (this._itemData.specialReward) {
            var uicode = itemParam.code == "4" ? "3" : itemParam.code;
            rewards = "1007_0_" + this._itemData.specialReward + "_" + uicode + "|" + this._itemData.getReward;
        }
        var rewardVoList = GameData.formatRewardItem(rewards);
        var rewardScale = 0.83;
        var itemHeight = 0;
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
            rewardDB.setScale(rewardScale);
            rewardDB.setPosition(itembg.x + (i % 5) * (rewardDB.width * rewardScale + 10) + 15, titleBg.y + titleBg.height + Math.floor(i / 5) * (rewardDB.height * rewardScale + 15) + 10);
            this.addChild(rewardDB);
            itemHeight = rewardDB.height * rewardScale + 15;
        }
        var offsetH = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) * itemHeight;
        itembg.height += offsetH - 20;
        this.height = itembg.height;
        if (vo.getTaskFlag(String(this._aidAndCode.dayId), this._itemData.questType)) {
            var reviceBM = BaseBitmap.create("collectflag");
            reviceBM.anchorOffsetX = reviceBM.width / 2;
            reviceBM.anchorOffsetY = reviceBM.height / 2;
            reviceBM.setScale(0.7);
            reviceBM.setPosition(itembg.x + 425, this.y + this.height / 2);
            this.addChild(reviceBM);
        }
        else {
            var needTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
            needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr", [1 + "", data.value + ""]);
            if (vo.getTaskValue(String(this._aidAndCode.dayId), this._itemData.questType) >= this._itemData.value) {
                needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr", [vo.getTaskValue(String(this._aidAndCode.dayId), this._itemData.questType), this._itemData.value]);
                var reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", function () {
                    var v = Api.acVoApi.getActivityVoByAidAndCode(_this._aidAndCode.aid, _this._aidAndCode.code);
                    if ((!v.isStart)) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                        return;
                    }
                    NetManager.request(NetRequestConst.REQUEST_RYEHARVEST_GETRYEHARVESTTASK, { activeId: vo.aidAndCode, taskId: Number(data.id), diffday: _this._aidAndCode.dayId });
                }, this);
                reviceBtn.setPosition(itembg.x + 425 - reviceBtn.width / 2, itembg.y + itembg.height - reviceBtn.height - 30);
                this.addChild(reviceBtn);
            }
            else {
                needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr2", [vo.getTaskValue(String(this._aidAndCode.dayId), this._itemData.questType), this._itemData.value]);
                if (this._itemData.questType == "1004") {
                    var reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", function () { }, this);
                    reviceBtn.setPosition(itembg.x + 425 - reviceBtn.width / 2, itembg.y + itembg.height - reviceBtn.height - 30);
                    this.addChild(reviceBtn);
                    reviceBtn.setEnable(false);
                }
                else {
                    var goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskGoBtn", this.goBtnClick, this);
                    goBtn.setPosition(itembg.x + 425 - goBtn.width / 2, itembg.y + itembg.height - goBtn.height - 30);
                    this.addChild(goBtn);
                    if (this._aidAndCode.dayId != Number(vo.getNowDayTask())) {
                        goBtn.setEnable(false);
                    }
                    if ((!vo.isStart) || (vo.checkIsInEndShowTime())) {
                        goBtn.setEnable(false);
                    }
                }
            }
            needTxt.setPosition(itembg.x + 425 - needTxt.width / 2, itembg.y + 70);
            this.addChild(needTxt);
        }
    };
    AcRyeHarvestActivityRewardTaskScrollItem.prototype.goBtnClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        if (vo.checkIsInEndShowTime() || vo.isStart == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var openType = this._itemData.openType;
        var viewName = App.StringUtil.firstCharToUper(openType);
        if (Api[openType + "VoApi"] && Api[openType + "VoApi"].isShowNpc) {
            var isShowNpc = Api[openType + "VoApi"].isShowNpc();
            if (!isShowNpc) {
                var lockedStr = Api[openType + "VoApi"].getLockedString ? Api[openType + "VoApi"].getLockedString() : LanguageManager.getlocal("dailyTask_" + openType + "Tip");
                App.CommonUtil.showTip(lockedStr ? lockedStr : LanguageManager.getlocal("sysWaitOpen"));
                return;
            }
        }
        if (openType == "alliance") {
            Api.allianceVoApi.openMainView();
            return;
        }
        if (openType == "studyatk") {
            Api.studyatkVoApi.openMainView();
            return;
        }
        if (Number(this._itemData.questType) == 951 || Number(this._itemData.questType) == 952 || Number(this._itemData.questType) == 961 || Number(this._itemData.questType) == 953) {
            viewName = "Dailyboss";
        }
        if (egret.getDefinitionByName(viewName + "View")) {
            if (Number(this._itemData.questType) == 801) {
                ViewController.getInstance().openView(viewName + "View|1");
            }
            else if (Number(this._itemData.questType) == 802) {
                ViewController.getInstance().openView(viewName + "View|2");
            }
            else if (Number(this._itemData.questType) == 302) {
                ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW);
            }
            else {
                ViewController.getInstance().openView(viewName + "View");
            }
        }
        else if (egret.getDefinitionByName(viewName + "PopupView")) {
            ViewController.getInstance().openView(viewName + "PopupView");
        }
    };
    AcRyeHarvestActivityRewardTaskScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcRyeHarvestActivityRewardTaskScrollItem.prototype.dispose = function () {
        this._itemData = null;
        _super.prototype.dispose.call(this);
    };
    return AcRyeHarvestActivityRewardTaskScrollItem;
}(ScrollListItem));
__reflect(AcRyeHarvestActivityRewardTaskScrollItem.prototype, "AcRyeHarvestActivityRewardTaskScrollItem");
