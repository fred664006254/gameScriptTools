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
 * 踏青狂欢item
 */
var Celebration3ScrollItem = (function (_super) {
    __extends(Celebration3ScrollItem, _super);
    function Celebration3ScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._goBtn2 = null;
        _this._goBtn3 = null;
        _this._needTxt = null;
        _this._collectflag = null;
        return _this;
    }
    Celebration3ScrollItem.prototype.initItem = function (index, data) {
        this._data = data;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_SPRING_ITEM, this.update, this);
        var wordsBg = BaseBitmap.create("public_9_bg14");
        wordsBg.width = 598;
        wordsBg.height = 170;
        this.addChild(wordsBg);
        var bottom2 = BaseBitmap.create("activity_charge_red");
        // bottom2.width =170;
        this.addChild(bottom2);
        var taskTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        if (data.questType == 1) {
            taskTxt.text = LanguageManager.getlocal("acSpringceleBrationLand1", [data.value + ""]);
        }
        else if (data.questType == 2) {
            taskTxt.text = LanguageManager.getlocal("acSpringceleBrationquestType2", [data.value + ""]);
        }
        else {
            taskTxt.text = LanguageManager.getlocal("acSpringceleBrationquestType" + data.questType, [data.value + ""]);
        }
        taskTxt.width = bottom2.width;
        taskTxt.x = bottom2.x + 15;
        taskTxt.y = bottom2.y + 10;
        this.addChild(taskTxt);
        var iconList = GameData.getRewardItemIcons(data.getReward, true);
        if (iconList && iconList.length > 0) {
            //额外赠送ICON
            var startX = 20;
            var startY = 50;
            var l = iconList.length;
            var _icon;
            for (var i = 0; i < l; i++) {
                var icon = iconList[i];
                icon.setPosition(startX + i * (icon.width * icon.scaleX + 12), startY);
                this.addChild(icon);
            }
        }
        //领取
        this._goBtn3 = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskGoBtn", this.collectHandler, this);
        this._goBtn3.x = 420;
        this._goBtn3.y = 75;
        this.addChild(this._goBtn3);
        //前往
        this._goBtn2 = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "taskGoBtn", this.collectHandler, this);
        this._goBtn2.x = 420;
        this._goBtn2.y = 75;
        this._goBtn2.visible = false;
        this.addChild(this._goBtn2);
        //当前进度（0／1）
        var needTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
        needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr", [1 + "", data.value + ""]);
        needTxt.width = this._goBtn3.width;
        needTxt.x = this._goBtn3.x;
        needTxt.y = this._goBtn3.y - 30;
        needTxt.textAlign = "center";
        this._needTxt = needTxt;
        this.addChild(needTxt);
        if (data.questType == 1) {
            needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr", [1 + "", data.value + ""]);
        }
        var collectflag = BaseBitmap.create("collectflag");
        collectflag.x = 450;
        collectflag.y = 50;
        collectflag.scaleX = 0.7;
        collectflag.scaleY = 0.7;
        collectflag.visible = false;
        this.addChild(collectflag);
        this._collectflag = collectflag;
        this.update();
    };
    Celebration3ScrollItem.prototype.collectHandler = function (evt) {
        var springCelebrateVo = Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID, AcSpringCelebrateView.CODE);
        if (!springCelebrateVo) {
            return;
        }
        var taskNum = springCelebrateVo.getTask(this._data.questType);
        if (springCelebrateVo.isStart == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (taskNum >= this._data.value) {
            NetManager.request(NetRequestConst.ACTIVITY_GETSPRINGITEMC, { "activeId": AcSpringCelebrateView.AID + "-" + AcSpringCelebrateView.CODE, "taskId": "" + this._data.key });
        }
        else {
            if (springCelebrateVo.isExchange() == true) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_SPRING_ITEM);
                return;
            }
            if (this._data.questType == 2) {
                App.MessageHelper.dispatchEvent(MessageConst.RESFESH_SPRING_TAB);
                return;
            }
            if (!this._data.openType) {
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
        }
    };
    Celebration3ScrollItem.prototype.update = function () {
        var acSpringVo = Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID, AcSpringCelebrateView.CODE);
        if (!acSpringVo) {
            return;
        }
        if (this._needTxt) {
            var taskNum = acSpringVo.getTask(this._data.questType);
            if (taskNum >= this._data.value) {
                this._needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr", [taskNum + "", this._data.value + ""]);
            }
            else {
                this._needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr2", [taskNum + "", this._data.value + ""]);
            }
        }
        if (this._goBtn3) {
            if (taskNum >= this._data.value) {
                if (acSpringVo.isGetRecharge(this._data.key)) {
                    this._goBtn3.visible = false;
                    this._needTxt.visible = false;
                    this._collectflag.visible = true;
                    this._goBtn2.visible = false;
                }
                else {
                    this._goBtn2.visible = false;
                    this._goBtn3.visible = true;
                    this._goBtn3.setText("realnamedes6");
                    App.DisplayUtil.changeToNormal(this._goBtn3);
                }
            }
            else {
                if (this._data.questType == 1) {
                    this._goBtn3.visible = true;
                    this._goBtn3.setText("realnamedes6");
                    App.DisplayUtil.changeToGray(this._goBtn3);
                }
                else {
                    // App.DisplayUtil.changeToNormal(this._goBtn2); 
                    this._goBtn3.visible = false;
                    this._goBtn2.visible = true;
                    if (acSpringVo.isExchange() == true) {
                        App.DisplayUtil.changeToGray(this._goBtn2);
                        this._goBtn2.touchEnabled = false;
                    }
                }
            }
        }
    };
    Celebration3ScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    Celebration3ScrollItem.prototype.dispose = function () {
        this._goBtn3 = null;
        this._collectflag = null;
        this._data = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_SPRING_ITEM, this.update, this);
        _super.prototype.dispose.call(this);
    };
    return Celebration3ScrollItem;
}(ScrollListItem));
__reflect(Celebration3ScrollItem.prototype, "Celebration3ScrollItem");
//# sourceMappingURL=Celebration3ScrollItem.js.map