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
 * author : qianjun
 * date : 2018.4.14
 * desc : 转盘活动 节日任务itemrender
 */
var AcMayDay3ScrollItem = (function (_super) {
    __extends(AcMayDay3ScrollItem, _super);
    function AcMayDay3ScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._goBtn2 = null;
        _this._goBtn3 = null;
        _this._needTxt = null;
        _this._collectflag = null;
        _this._curIdx = 0;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcMayDay3ScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_ACMAYDAY, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMayDay3ScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACMAYDAY, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMayDay3ScrollItem.prototype, "acTivityId", {
        get: function () {
            return AcConst.AID_ACMAYDAY + "-" + this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcMayDay3ScrollItem.prototype.initItem = function (index, data, itemParam) {
        this._data = data;
        this._curIdx = index;
        this._code = itemParam;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMC), this.eventCollectHandlerCallBack, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM, this.update, this);
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
        taskTxt.x = bottom2.x + 20;
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
        this._goBtn3.y = 60;
        this.addChild(this._goBtn3);
        //前往
        this._goBtn2 = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "taskGoBtn", this.collectHandler, this);
        this._goBtn2.x = 420;
        this._goBtn2.y = 60;
        this._goBtn2.visible = false;
        this.addChild(this._goBtn2);
        if (PlatformManager.checkIsEnLang()) {
            this._goBtn2.y = 90;
            this._goBtn3.y = 90;
        }
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
    AcMayDay3ScrollItem.prototype.collectHandler = function (evt) {
        var vo = this.vo;
        if (!vo) {
            return;
        }
        var taskNum = vo.getTask(this._data.questType);
        // if(vo.isStart==false)
        // {
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
        // 	return;
        // }   
        if (this.vo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
        if (taskNum >= this._data.value) {
            AcMayDay3ScrollItem._lastReqIdx = this._curIdx;
            AcMayDay3ScrollItem._lastPos = this._needTxt.localToGlobal(this._needTxt.width, 20);
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMC, { "activeId": this.acTivityId, "taskId": "" + this._data.key });
        }
        else {
            if (this._data.questType == 2) {
                ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
                return;
            }
            if (!this._data.openType) {
                return;
            }
            var openType = this._data.openType;
            var viewName = App.StringUtil.firstCharToUper(openType);
            if (openType == "") {
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
    AcMayDay3ScrollItem.prototype.eventCollectHandlerCallBack = function (event) {
        var rData = event.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
        if (AcMayDay3ScrollItem._lastReqIdx != this._curIdx) {
            return;
        }
        AcMayDay3ScrollItem._lastReqIdx = null;
        this.update();
        var rewards = rData.rewards;
        var rewardList = GameData.formatRewardItem(rewards);
        var pos = AcMayDay3ScrollItem._lastPos;
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    };
    AcMayDay3ScrollItem.prototype.update = function () {
        var vo = this.vo;
        if (!vo) {
            return;
        }
        if (this._needTxt) {
            var taskNum = vo.getTask(this._data.questType);
            if (taskNum >= this._data.value) {
                this._needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr", [taskNum + "", this._data.value + ""]);
            }
            else {
                this._needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr2", [taskNum + "", this._data.value + ""]);
            }
        }
        if (this._goBtn3) {
            if (taskNum >= this._data.value) {
                if (vo.isGetTaskReward(this._data.key)) {
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
                    // if(vo.isExchange()==true)
                    // { 
                    // 	App.DisplayUtil.changeToGray(this._goBtn2);
                    // 	this._goBtn2.touchEnabled =false; 
                    // }
                }
            }
        }
    };
    AcMayDay3ScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AcMayDay3ScrollItem.prototype.dispose = function () {
        this._goBtn3 = null;
        this._collectflag = null;
        this._data = null;
        this._goBtn2 = null;
        this._needTxt = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMC), this.eventCollectHandlerCallBack, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM, this.update, this);
        _super.prototype.dispose.call(this);
    };
    AcMayDay3ScrollItem._lastReqIdx = null;
    AcMayDay3ScrollItem._lastPos = null;
    return AcMayDay3ScrollItem;
}(ScrollListItem));
__reflect(AcMayDay3ScrollItem.prototype, "AcMayDay3ScrollItem");
//# sourceMappingURL=AcMayDay3ScrollItem.js.map