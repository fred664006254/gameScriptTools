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
var DailyPackageScrollItem = (function (_super) {
    __extends(DailyPackageScrollItem, _super);
    function DailyPackageScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this.gemTF = null;
        _this._gobtnTypeNum = 0;
        _this._tmpVo = null;
        _this._tadayTaskTxt = null;
        _this._tadayPackageTxt = null;
        _this._goBtn2 = null;
        _this._collectflag = null;
        _this._goBtn3 = null;
        _this.public_dot = null;
        _this._code = "";
        _this._currDay = 0;
        return _this;
    }
    DailyPackageScrollItem.prototype.initItem = function (index, data, itemParam) {
        this._data = data;
        this._code = itemParam.code;
        this._currDay = itemParam.currDay;
        var tmpVo = Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_NEWYEARCRACKER, this._code);
        this._tmpVo = tmpVo;
        var wordsBg = BaseBitmap.create("public_9_bg14");
        wordsBg.width = 600;
        wordsBg.height = 152;
        this.addChild(wordsBg);
        //任务红色底
        var bottom2 = BaseBitmap.create("acnewyear_bottom2");
        this.addChild(bottom2);
        //任务
        var taskTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        var num = index + 1;
        taskTxt.text = LanguageManager.getlocal("acNewYearViewTask" + num);
        taskTxt.width = 30;
        taskTxt.x = 10;
        taskTxt.y = 30;
        taskTxt.lineSpacing = 5;
        if (PlatformManager.checkIsTextHorizontal()) {
            taskTxt.textAlign = egret.HorizontalAlign.CENTER;
            taskTxt.setPosition(bottom2.x + bottom2.width / 2 - taskTxt.width / 2, wordsBg.y + wordsBg.height / 2 - taskTxt.height / 2);
        }
        this.addChild(taskTxt);
        //中国结
        var chineseknot = BaseBitmap.create("crackericon2-" + this._code);
        this.addChild(chineseknot);
        //中国结数量
        var buyNumTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
        buyNumTxt.text = "+" + data.specialReward;
        this.addChild(buyNumTxt);
        //中国节
        chineseknot.x = 450;
        chineseknot.y = 0;
        buyNumTxt.x = 495;
        buyNumTxt.y = 14;
        //	已领取 
        var collectflag = BaseBitmap.create("collectflag");
        collectflag.x = 450;
        collectflag.y = 50;
        collectflag.scaleX = 0.7;
        collectflag.scaleY = 0.7;
        this.addChild(collectflag);
        collectflag.visible = false;
        collectflag.touchEnabled = false;
        this._collectflag = collectflag;
        var line = BaseBitmap.create("public_line1");
        line.x = 50;
        line.y = 44;
        this.addChild(line);
        //任务：1／10
        var tadayTaskTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
        var num1 = 0;
        tadayTaskTxt.text = LanguageManager.getlocal("acNewYearDailyquestType" + data.questType, [num1 + "", data.value + ""]);
        tadayTaskTxt.x = 60;
        tadayTaskTxt.y = 15;
        this._tadayTaskTxt = tadayTaskTxt;
        this.addChild(tadayTaskTxt);
        //可获得
        var needNumTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
        needNumTxt.text = LanguageManager.getlocal("acNewYearViewneedNum");
        needNumTxt.x = 60;
        needNumTxt.y = 80;
        this.addChild(needNumTxt);
        var iconList = GameData.getRewardItemIcons(data.getReward, true);
        if (iconList && iconList.length > 0) {
            //额外赠送ICON
            var startX = 150;
            var startY = 50;
            var l = iconList.length;
            var _icon;
            for (var i = 0; i < l; i++) {
                var icon = iconList[i];
                icon.scaleX = 0.78;
                icon.scaleY = 0.78;
                icon.setPosition(startX + i * (icon.width * icon.scaleX + 12), startY);
                this.addChild(icon);
            }
        }
        //前往
        this._goBtn2 = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "taskGoBtn", this.collectHandler, this);
        this._goBtn2.x = 440;
        this._goBtn2.y = 70;
        this.addChild(this._goBtn2);
        //领取
        this._goBtn3 = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.collectHandler, this);
        this._goBtn3.x = 440;
        this._goBtn3.y = 70;
        this._goBtn3.visible = false;
        this.addChild(this._goBtn3);
        this.public_dot = BaseBitmap.create("public_dot2");
        this.addChild(this.public_dot);
        this.public_dot.x = this._goBtn3.x + this._goBtn3.width - 20;
        this.public_dot.y = this._goBtn3.y - 3;
        this.public_dot.visible = false;
        this.update();
    };
    DailyPackageScrollItem.prototype.onPackageHandler = function (evt) {
        var tmpVo = Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_NEWYEARCRACKER, this._code);
        if (tmpVo.isStart == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var data = {};
        data.reward = this._data.reward;
        data.isShowBtnType = 2;
        data.code = this._code;
        ViewController.getInstance().openView(ViewConst.POPUP.ACNEWYEARPOPUPVIEW, data);
    };
    DailyPackageScrollItem.prototype.collectHandler = function (evt) {
        var tmpVo = Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_NEWYEARCRACKER, this._code);
        if (tmpVo.isStart == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this._gobtnTypeNum > 0 && this._gobtnTypeNum == 1) {
            // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GETRACKERTASKREWARDS),this.refreshUIInfo,this);
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_GETRACKERTASKREWARDS, { "activeId": AcConst.AID_NEWYEARCRACKER + "-" + this._code, "questType": this._data.questType + "", "ftype": 1, "diffday": this._currDay });
            return;
        }
        else {
            if (this._currDay > tmpVo.getCurDay()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acnewNoOpenDes"));
                return;
            }
            if (this._currDay < tmpVo.getCurDay() || this._tmpVo.checkIsInEndShowTime()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acnewEndDes"));
                return;
            }
        }
        if (this._data.questType == "1004") {
            App.CommonUtil.showTip(LanguageManager.getlocal("acnewyearReloginDes"));
            return;
        }
        var openType = this._data.openType;
        var viewName = App.StringUtil.firstCharToUper(openType);
        if (openType == "level" || openType == "arrival" || openType == "") {
            PlayerBottomUI.getInstance().show();
        }
        else {
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
            if (egret.getDefinitionByName(viewName + "View")) {
                ViewController.getInstance().openView(viewName + "View");
            }
            else if (egret.getDefinitionByName(viewName + "PopupView")) {
                ViewController.getInstance().openView(viewName + "PopupView");
            }
            else {
                if (openType == "recharge") {
                    ViewController.getInstance().openView(viewName + "Vip" + "View");
                }
            }
        }
    };
    DailyPackageScrollItem.prototype.refreshUIInfo = function (evt) {
        if (evt.data.ret == true) {
            // this.update();  
        }
    };
    DailyPackageScrollItem.prototype.update = function () {
        // 0不可领 1未领取 2已领取
        if (this._data && this._data.questType) {
            var gobtnTypeNum = this._tmpVo.getIdflag(this._data.questType, this._currDay);
            this._gobtnTypeNum = gobtnTypeNum;
        }
        if (gobtnTypeNum == 2) {
            if (this._collectflag) {
                App.DisplayUtil.changeToNormal(this._collectflag);
                this._collectflag.visible = true;
            }
            if (this._goBtn2) {
                this._goBtn2.visible = false;
            }
            if (this._goBtn3) {
                this._goBtn3.visible = false;
                this.public_dot.visible = false;
            }
        }
        else if (gobtnTypeNum == 1) {
            if (this._goBtn3) {
                this._goBtn3.visible = true;
                this.public_dot.visible = true;
            }
            if (this._goBtn2) {
                this._goBtn2.visible = false;
            }
        }
        var num1 = 0;
        {
            var obj = this._tmpVo.taskinfo[this._currDay];
            if (obj && obj[this._data.questType] && obj[this._data.questType].v) {
                num1 = obj[this._data.questType].v;
                this._tadayTaskTxt.text = LanguageManager.getlocal("acNewYearDailyquestType" + this._data.questType, [num1 + "", this._data.value]);
            }
        }
        if (this._currDay != this._tmpVo.getCurDay() || this._tmpVo.checkIsInEndShowTime()) {
            if (this._goBtn2) {
                App.DisplayUtil.changeToGray(this._goBtn2);
            }
            if (this._goBtn) {
                App.DisplayUtil.changeToGray(this._goBtn);
            }
            if (this._collectflag) {
                App.DisplayUtil.changeToGray(this._collectflag);
            }
        }
        // if(GameData.serverTime>this._tmpVo.et-86400)
        // {	
        // 	if(this._goBtn2)
        // 	{
        // 		this._goBtn2.touchEnabled =false;
        // 		App.DisplayUtil.changeToGray(this._goBtn2);  
        // 	}
        // 	if(this._goBtn)
        // 	{
        // 		this._goBtn.touchEnabled =false
        // 		App.DisplayUtil.changeToGray(this._goBtn);
        // 	}  
        // }
    };
    DailyPackageScrollItem.prototype.getSpaceY = function () {
        return 0;
    };
    DailyPackageScrollItem.prototype.dispose = function () {
        this._goBtn3 = null;
        this._goBtn2 = null;
        this._goBtn = null;
        this._tadayTaskTxt = null;
        this._collectflag = null;
        this._code = null;
        // NewYear2ScrollItem.TADAY =0;
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM,this.update,this);  
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYNEWYEARGIFT),this.useCallback,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GETRACKERTASKREWARDS), this.refreshUIInfo, this);
        _super.prototype.dispose.call(this);
    };
    DailyPackageScrollItem.TADAY = 0;
    return DailyPackageScrollItem;
}(ScrollListItem));
__reflect(DailyPackageScrollItem.prototype, "DailyPackageScrollItem");
//# sourceMappingURL=DailyPackageScrollItem.js.map