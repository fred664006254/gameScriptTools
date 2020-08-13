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
 * desc : 活动 任务itemrender
 */
var AcDechuanshidaiTaskItem = (function (_super) {
    __extends(AcDechuanshidaiTaskItem, _super);
    function AcDechuanshidaiTaskItem() {
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
    Object.defineProperty(AcDechuanshidaiTaskItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDechuanshidaiTaskItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDechuanshidaiTaskItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDechuanshidaiTaskItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_DECHUANSHIDAI;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDechuanshidaiTaskItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcDechuanshidaiTaskItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcDechuanshidaiTaskItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        var code = view.getUiCode();
        view.width = 530;
        view.height = 180;
        this._data = data;
        this._curIdx = Number(data.sortId);
        var wordsBg = BaseBitmap.create("public_9_bg14");
        wordsBg.width = view.width;
        wordsBg.height = view.height;
        this.addChild(wordsBg);
        var bottom2 = BaseBitmap.create("activity_charge_red");
        // bottom2.width =170;
        bottom2.y = 5;
        this.addChild(bottom2);
        var param = [];
        param.push(data.value);
        var taskstr = "taskDesc" + data.questType;
        var taskTxt = ComponentManager.getTextField(LanguageManager.getlocal(taskstr, param), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        taskTxt.width = bottom2.width;
        taskTxt.x = bottom2.x + 10;
        taskTxt.y = bottom2.y + 10;
        this.addChild(taskTxt);
        var str = data.getReward;
        var iconList = GameData.getRewardItemIcons(str, true);
        if (iconList && iconList.length > 0) {
            //额外赠送ICON
            var startX = 20;
            var startY = 65;
            var l = iconList.length;
            var _icon;
            for (var i = 0; i < l; i++) {
                var icon = iconList[i];
                icon.setScale(0.8);
                icon.setPosition(startX + i * (icon.width * icon.scaleX + 12), startY);
                this.addChild(icon);
            }
        }
        //领取
        this._goBtn3 = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskGoBtn", this.collectHandler, this);
        this._goBtn3.x = 345;
        this._goBtn3.y = 80;
        this.addChild(this._goBtn3);
        //前往
        this._goBtn2 = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "taskGoBtn", this.collectHandler, this);
        this._goBtn2.x = 345;
        this._goBtn2.y = 80;
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
        var collectflag = BaseBitmap.create("collectflag");
        collectflag.x = 355;
        collectflag.y = 50;
        collectflag.scaleX = 0.7;
        collectflag.scaleY = 0.7;
        collectflag.visible = false;
        this.addChild(collectflag);
        this._collectflag = collectflag;
        this.update();
    };
    AcDechuanshidaiTaskItem.prototype.collectHandler = function (evt) {
        var vo = this.vo;
        if (!vo) {
            return;
        }
        if (this._data.day > this.vo.getCurDays()) {
            var time = App.DateUtil.getWeeTs(GameData.serverTime) + (this._data.day - this.vo.getCurDays()) * 3600 * 24 - GameData.serverTime;
            App.CommonUtil.showTip(LanguageManager.getlocal("acDechuanshidaitip9-" + this.getUiCode(), [App.DateUtil.getFormatBySecond(time)]));
            return;
        }
        // if(this._data.day > this.vo.getCurDays()){
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("acnewNoOpenDes"));
        // 	return;
        // }
        var taskNum = vo.getTask(this._data.questType, this._data.day);
        // if(vo.isStart==false)
        // {
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
        // 	return;
        // }   
        if (this.vo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if (taskNum >= this._data.value) {
            this.vo.lastidx = this._data.index;
            this.vo.lastpos = this._needTxt.localToGlobal(this._needTxt.width, 20);
            this.vo.lastday = this._data.day;
            NetManager.request(NetRequestConst.REQUEST_DECHUAN_DAILYTASK, {
                activeId: this.acTivityId,
                questType: this._data.questType,
                diffday: this._data.day
            });
        }
        else {
            if (this._data.day < this.vo.getCurDays() || !this.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acDechuanshidaitip11-" + this.getUiCode()));
                return;
            }
            if (Number(this._data.questType) == 1002) {
                var baseview = ViewController.getInstance().getView("AcDechuanshidaiTaskView");
                baseview.hide();
                //ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
                return;
            }
            if (!this._data.openType) {
                return;
            }
            var openType = this._data.openType;
            if (!openType || openType === "") {
                return;
            }
            App.CommonUtil.goTaskView(openType);
        }
    };
    AcDechuanshidaiTaskItem.prototype.update = function () {
        var vo = this.vo;
        if (!vo) {
            return;
        }
        if (this._needTxt) {
            var taskNum = vo.getTask(this._data.questType, this._data.day);
            if (taskNum >= this._data.value) {
                this._needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr", [taskNum + "", this._data.value + ""]);
            }
            else {
                this._needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr2", [taskNum + "", this._data.value + ""]);
            }
        }
        if (this._goBtn3) {
            if (taskNum >= this._data.value) {
                if (vo.isGetTaskReward(this._data.questType, this._data.day)) {
                    this._goBtn3.visible = false;
                    this._needTxt.visible = false;
                    this._collectflag.visible = true;
                    this._goBtn2.visible = false;
                }
                else {
                    this._goBtn2.visible = false;
                    this._goBtn3.visible = true;
                    this._goBtn3.setText("realnamedes6");
                    this._goBtn3.setGray(false);
                    App.DisplayUtil.changeToNormal(this._goBtn3);
                }
            }
            else {
                if (this._data.questType == 1) {
                    this._goBtn3.visible = true;
                    this._goBtn3.setText("realnamedes6");
                    this._goBtn3.setEnable(false);
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
                this._goBtn3.setGray(!(this._data.day == this.vo.getCurDays()));
                if (!vo.isInActivity()) {
                    this._goBtn2.setGray(true);
                }
            }
        }
        if (this._goBtn2) {
            if (this._data.day > this.vo.getCurDays()) {
                this._goBtn2.setText("acbattlenobegun");
            }
            else {
                this._goBtn2.setText("taskGoBtn");
            }
            this._goBtn2.setGray(!(this._data.day == this.vo.getCurDays()));
            if (!vo.isInActivity()) {
                this._goBtn2.setGray(true);
            }
        }
    };
    AcDechuanshidaiTaskItem.prototype.getSpaceY = function () {
        return 0;
    };
    AcDechuanshidaiTaskItem.prototype.dispose = function () {
        this._goBtn3 = null;
        this._collectflag = null;
        this._data = null;
        this._goBtn2 = null;
        this._needTxt = null;
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this); 		
        _super.prototype.dispose.call(this);
    };
    return AcDechuanshidaiTaskItem;
}(ScrollListItem));
__reflect(AcDechuanshidaiTaskItem.prototype, "AcDechuanshidaiTaskItem");
//# sourceMappingURL=AcDechuanshidaiTaskItem.js.map