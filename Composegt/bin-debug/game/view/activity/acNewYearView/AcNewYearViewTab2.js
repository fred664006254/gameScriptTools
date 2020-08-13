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
var AcNewYearViewTab2 = (function (_super) {
    __extends(AcNewYearViewTab2, _super);
    function AcNewYearViewTab2() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        _this._bottomBg = null;
        _this._cfgObj = null;
        _this._dailyTask_arr = [];
        _this._currDayNum = 0;
        _this._leftBtn = null;
        _this.num = 0;
        _this._tadayNumTxt = null;
        _this.public_dot2 = null;
        _this._bigArr = [];
        _this._tadayTaskTxt = null;
        _this._lastNumTxt = null;
        _this._afterTxt = null;
        _this.btntype = 0;
        _this._lastNum = 0;
        _this._afterNum = 0;
        _this.currNewDay = 0;
        _this._curr_acNewYearVo = null;
        _this.rechargevie_effects = null;
        _this.big_package = null;
        _this.initView();
        return _this;
    }
    AcNewYearViewTab2.prototype.initView = function () {
        var downTitleLine = BaseBitmap.create("acnewyear_middlebg");
        if (AcNewYearView.CODE == "10" || AcNewYearView.CODE == "11") {
            downTitleLine.setPosition(6, -299);
        }
        else {
            downTitleLine.setPosition(6, -297);
        }
        this.addChild(downTitleLine);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM, this.update, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD), this.refreshUIInfo, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST, this.restList, this);
        var curr_acNewYearVo = Api.acVoApi.getActivityVoByAidAndCode(AcNewYearView.AID);
        this._curr_acNewYearVo = curr_acNewYearVo;
        var taDaynum = curr_acNewYearVo.diffday;
        if (taDaynum > 7) {
            taDaynum = 7;
        }
        this.currNewDay = taDaynum;
        NewYear2ScrollItem.TADAY = taDaynum;
        this.num = taDaynum - 1;
        this.showDayNum();
        var bottomBg = BaseBitmap.create("public_9v_bg04");
        bottomBg.width = 625;
        bottomBg.height = GameConfig.stageHeigth - 470;
        bottomBg.x = 5;
        bottomBg.y = -160;
        bottomBg.visible = false;
        this._bottomBg = bottomBg;
        this.addChild(bottomBg);
        this.showBtn();
    };
    AcNewYearViewTab2.prototype.showEff = function () {
        this.rechargevie_effects = BaseBitmap.create("rechargevie_effects");
        this.addChild(this.rechargevie_effects);
        this.rechargevie_effects.anchorOffsetX = this.rechargevie_effects.width / 2;
        this.rechargevie_effects.anchorOffsetY = this.rechargevie_effects.height / 2;
        this.rechargevie_effects.setPosition(555, -410);
        this.rechargevie_effects.visible = false;
    };
    AcNewYearViewTab2.prototype.restList = function () {
        this.refreshList();
    };
    AcNewYearViewTab2.prototype.removeEff = function () {
        if (this.rechargevie_effects) {
            egret.Tween.removeTweens(this.rechargevie_effects);
            this.rechargevie_effects.visible = false;
        }
        if (this.big_package) {
            this.big_package.rotation = 0;
            egret.Tween.removeTweens(this.big_package);
        }
        this.public_dot2.visible = false;
    };
    AcNewYearViewTab2.prototype.showBtn = function () {
        var currY = 235;
        //描述
        var taskTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        taskTxt.text = LanguageManager.getlocal("acNewYeartab2des_" + AcNewYearView.CODE);
        taskTxt.width = 450;
        taskTxt.x = 30;
        this.addChild(taskTxt);
        //今日任务进度
        var tadayTaskTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tadayTaskTxt.text = LanguageManager.getlocal("acNewYeartask_des", ["0", "0"]);
        tadayTaskTxt.width = 400;
        tadayTaskTxt.x = taskTxt.x;
        tadayTaskTxt.y = -454;
        taskTxt.y = tadayTaskTxt.y + tadayTaskTxt.textHeight + 5;
        this.addChild(tadayTaskTxt);
        this._tadayTaskTxt = tadayTaskTxt;
        var bottomBg = BaseBitmap.create("forpeople_bottom");
        bottomBg.x = 500;
        bottomBg.y = -480;
        this.addChild(bottomBg);
        bottomBg.visible = false;
        this.showEff();
        //箱子
        var big_package = BaseBitmap.create("acnewyear_big_package");
        big_package.x = bottomBg.x + 5 + big_package.width / 2;
        big_package.y = -425; //bottomBg.y+big_package.height/2;;
        big_package.scaleX = 0.9;
        big_package.scaleY = 0.9;
        big_package.anchorOffsetX = big_package.width / 2;
        big_package.anchorOffsetY = big_package.height / 2;
        big_package.addTouchTap(this.packageHandler, this);
        this.big_package = big_package;
        this.addChild(big_package);
        //点击查看
        var acnewyear_look = BaseBitmap.create("acnewyear_look");
        acnewyear_look.x = bottomBg.x; //+8;
        acnewyear_look.y = -415; //bottomBg.y+bottomBg.height-acnewyear_look.width/2+10;
        this.addChild(acnewyear_look);
        var leftBtn = ComponentManager.getButton("btn_leftpage", "", this.eventCollectHandler, this);
        leftBtn.x = 60;
        leftBtn.scaleX = leftBtn.scaleY = 0.5;
        leftBtn.y = -285;
        leftBtn.addTouchTap(this.onClickHandler, this);
        this._leftBtn = leftBtn;
        this.addChild(leftBtn);
        this.public_dot2 = BaseBitmap.create("public_dot2");
        this.addChild(this.public_dot2);
        this.public_dot2.x = 571; //acnewyear_look.x+acnewyear_look.width-10;  
        this.public_dot2.y = -460; //acnewyear_look.y-75; 
        this.public_dot2.visible = false;
        //前天 文本 
        var lastTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        var num1 = 0;
        if (this._currDayNum == 0) {
            this._lastNum = 7;
            this._afterNum = 2;
        }
        lastTxt.text = LanguageManager.getlocal("newayearDate" + this._lastNum);
        lastTxt.width = 120;
        lastTxt.x = 150;
        lastTxt.y = -280;
        lastTxt.textAlign = "center";
        lastTxt.alpha = 0.5;
        this._lastNumTxt = lastTxt;
        this.addChild(lastTxt);
        //今日 文本 
        var tadayNumTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON);
        var num = this._currDayNum + 1;
        tadayNumTxt.text = LanguageManager.getlocal("newayearDate" + num);
        tadayNumTxt.width = 120;
        tadayNumTxt.x = 250;
        tadayNumTxt.y = lastTxt.y;
        tadayNumTxt.textAlign = "center";
        this._tadayNumTxt = tadayNumTxt;
        this.addChild(tadayNumTxt);
        var afterTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        var num2 = num += 1;
        afterTxt.text = LanguageManager.getlocal("newayearDate" + num2);
        afterTxt.width = 120;
        afterTxt.x = 350;
        afterTxt.y = tadayNumTxt.y;
        afterTxt.textAlign = "center";
        afterTxt.alpha = 0.5;
        this._afterTxt = afterTxt;
        this.addChild(afterTxt);
        var rightBtn = ComponentManager.getButton("btn_leftpage", "", this.eventCollectHandler, this);
        rightBtn.x = GameConfig.stageWidth - 60;
        rightBtn.y = leftBtn.y; //15-currY;  
        rightBtn.addTouchTap(this.onClickHandler, this);
        rightBtn.scaleX = -0.5;
        rightBtn.scaleY = 0.5;
        this.addChild(rightBtn);
        this._cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(AcNewYearView.AID, AcNewYearView.CODE);
        var dailyTask_arr = this._cfgObj.itemListCfg.dailyTask;
        this._dailyTask_arr = [];
        for (var key in dailyTask_arr) {
            if (Number(key)) {
                this._dailyTask_arr.push(dailyTask_arr[key]);
            }
        }
        var arr = [];
        arr = this.getCurrDayData(this._currDayNum);
        this._tadayTaskTxt.text = LanguageManager.getlocal("acNewYeartask_des", ["0", arr.length + ""]);
        var tmpRect = null;
        if (AcNewYearView.CODE == "10" || AcNewYearView.CODE == "11") {
            tmpRect = new egret.Rectangle(0, 0, 606, this._bottomBg.height - 60);
        }
        else {
            tmpRect = new egret.Rectangle(0, 0, 600, this._bottomBg.height - 60);
        }
        var scrollList = ComponentManager.getScrollList(NewYear2ScrollItem, arr, tmpRect);
        scrollList.y = -230; //this._bottomBg.y+10;
        scrollList.x = GameConfig.stageWidth / 2 - scrollList.width / 2;
        this._scrollList = scrollList;
        this.addChild(scrollList);
        this.refreshList();
        this.update();
    };
    AcNewYearViewTab2.prototype.refreshUIInfo = function () {
        if (this._curr_acNewYearVo.taskinfo[this.currNewDay + ""].dayFlag == 2) {
            this.public_dot2.visible = false;
            this.removeEff();
        }
    };
    AcNewYearViewTab2.prototype.refreshList = function () {
        var tmpVo = Api.acVoApi.getActivityVoByAidAndCode(AcNewYearView.AID, AcNewYearView.CODE);
        var arr = [];
        if (this._currDayNum < this.currNewDay - 1) {
            AcNewYearViewTab2.showBtnStatus = 0;
        }
        else if (this._currDayNum == this.currNewDay - 1) {
            AcNewYearViewTab2.showBtnStatus = 1;
        }
        else {
            AcNewYearViewTab2.showBtnStatus = 2;
        }
        if (this._currDayNum == this.currNewDay - 1) {
            AcNewYearViewTab2.isStarBoo = true;
            if (tmpVo.taskinfo[this.currNewDay + ""].dayFlag == 1) {
                this.playEff();
                this.btntype = 1;
            }
        }
        else {
            AcNewYearViewTab2.isStarBoo = false;
            this.removeEff();
        }
        arr = this.getCurrDayData(this._currDayNum);
        this._scrollList.refreshData(arr);
        var num = this._currDayNum + 1;
        this._lastNumTxt.text = LanguageManager.getlocal("newayearDate" + this._lastNum);
        this._tadayNumTxt.text = LanguageManager.getlocal("newayearDate" + num);
        this._tadayTaskTxt.text = LanguageManager.getlocal("acNewYeartask_des", [tmpVo.getTaskLength() + "", arr.length + ""]);
        this._afterTxt.text = LanguageManager.getlocal("newayearDate" + this._afterNum);
    };
    AcNewYearViewTab2.prototype.packageHandler = function () {
        var tmpVo = Api.acVoApi.getActivityVoByAidAndCode(AcNewYearView.AID, AcNewYearView.CODE);
        if (tmpVo.isStart == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var data = {};
        if (this._bigArr.length > 1) {
            data.reward = this._bigArr[0].reward;
        }
        data.isShowBtnType = this.btntype;
        ViewController.getInstance().openView(ViewConst.POPUP.ACNEWYEARPOPUPVIEW, data);
    };
    AcNewYearViewTab2.prototype.onClickHandler = function (event, params) {
        var tmpVo = Api.acVoApi.getActivityVoByAidAndCode(AcNewYearView.AID, AcNewYearView.CODE);
        if (tmpVo.isStart == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (event.currentTarget == this._leftBtn) {
            this.num -= 1;
        }
        else {
            this.num += 1;
        }
        this.showDayNum();
        this.refreshList();
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_NEWYEAR_REDHOT);
    };
    AcNewYearViewTab2.prototype.showDayNum = function () {
        if (this.num < 0) {
            this.num = 7 + this.num;
        }
        if (this.num > 6) {
            this.num = 7 - this.num;
        }
        this._currDayNum = this.num;
        this._lastNum = this.num;
        this._afterNum = this.num + 2;
        if (this.num == 0) {
            this._lastNum = 7;
            this._afterNum = 2;
        }
        if (this._afterNum > 7) {
            this._afterNum = 1;
        }
        NewYear2ScrollItem.TADAY = this.num + 1;
    };
    AcNewYearViewTab2.prototype.showHotRed = function () {
        this.playEff();
    };
    AcNewYearViewTab2.prototype.playEff = function () {
        if (this.rechargevie_effects) {
            this.rechargevie_effects.visible = true;
            egret.Tween.get(this.rechargevie_effects, { loop: true }).to({ rotation: this.rechargevie_effects.rotation + 360 }, 10000);
        }
        if (this.big_package) {
            egret.Tween.get(this.big_package, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
        }
        this.public_dot2.visible = true;
    };
    AcNewYearViewTab2.prototype.update = function () {
        var tmpVo = Api.acVoApi.getActivityVoByAidAndCode(AcNewYearView.AID, AcNewYearView.CODE);
        if (tmpVo.getTaskLength()) {
            var arr = this.getCurrDayData(this._currDayNum);
            this._tadayTaskTxt.text = LanguageManager.getlocal("acNewYeartask_des", [tmpVo.getTaskLength() + "", arr.length + ""]);
            if (this._curr_acNewYearVo.taskinfo[this.currNewDay + ""].dayFlag == 1) {
                this.showHotRed();
                this.btntype = 1;
            }
            else {
                this.btntype = 0;
            }
        }
        if (tmpVo.diffday != this.currNewDay) {
            this.currNewDay = tmpVo.diffday;
            if (tmpVo.diffday > 7) {
                this.currNewDay = 7;
            }
            else {
                this.num += 1;
            }
            this.showDayNum();
            this.refreshList();
        }
    };
    AcNewYearViewTab2.prototype.eventCollectHandler = function () {
    };
    AcNewYearViewTab2.prototype.getCurrDayData = function (num) {
        if (num === void 0) { num = 0; }
        var arr = [];
        arr = this._dailyTask_arr[num];
        var newArr = [];
        for (var key in arr) {
            if (arr[key].sortId) {
                if (PlatformManager.checkHideIconByIP()) {
                    if (arr[key].openType && arr[key].openType == "recharge" && arr[key].questType != "1002") {
                    }
                    else {
                        newArr.push(arr[key]);
                    }
                }
                else {
                    newArr.push(arr[key]);
                }
            }
            else {
                this._bigArr.push(arr[key]);
            }
        }
        newArr.sort(function (a, b) {
            if (a.sortId > b.sortId)
                return 1;
            else if (a.sortId == b.sortId)
                return 0;
            return -1;
        });
        return newArr;
    };
    // 页签类型
    AcNewYearViewTab2.prototype.getSheepType = function () {
        return 2;
    };
    AcNewYearViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM, this.update, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD), this.refreshUIInfo, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST, this.restList, this);
        this._scrollList = null;
        this._newYearInfoVoList = null;
        this._index = 0;
        AcNewYearViewTab2.isStarBoo = false;
        this.btntype = 0;
        this._lastNum = 0;
        this._afterNum = 0;
        this._tadayTaskTxt = null;
        this._lastNumTxt = null;
        this._afterTxt = null;
        this.currNewDay = 0;
        _super.prototype.dispose.call(this);
    };
    AcNewYearViewTab2.isStarBoo = false;
    AcNewYearViewTab2.showBtnStatus = 0; // 0-> 当前之前天  1->当前天 2->之后天
    return AcNewYearViewTab2;
}(CommonViewTab));
__reflect(AcNewYearViewTab2.prototype, "AcNewYearViewTab2");
