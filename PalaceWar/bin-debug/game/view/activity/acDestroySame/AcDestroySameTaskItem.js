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
var AcDestroySameTaskItem = (function (_super) {
    __extends(AcDestroySameTaskItem, _super);
    function AcDestroySameTaskItem() {
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
    Object.defineProperty(AcDestroySameTaskItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDestroySameTaskItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDestroySameTaskItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDestroySameTaskItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_DESTROYSAME;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDestroySameTaskItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcDestroySameTaskItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
                code = "4";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcDestroySameTaskItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        var code = view.getUiCode();
        view.width = 530;
        view.height = 170;
        this._data = data;
        this._curIdx = Number(data.taskId);
        var wordsBg = BaseBitmap.create("public_9_bg14");
        wordsBg.width = view.width;
        wordsBg.height = 170;
        this.addChild(wordsBg);
        var bottom2 = BaseBitmap.create("activity_charge_red");
        // bottom2.width =170;
        bottom2.y = 5;
        this.addChild(bottom2);
        var taskbg = BaseBitmap.create("destroysametaskbg");
        taskbg.x = wordsBg.width - taskbg.width - 3;
        taskbg.y = 2;
        this.addChild(taskbg);
        var tasknum = this.cfg.task[this._data.id1 - 1].length;
        var taskTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("AcDestroySameTip6", this.code, code), [this._data.id2, "" + tasknum]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, taskTxt2, taskbg, [0, 4]);
        this.addChild(taskTxt2);
        var param = [];
        param.push(data.value);
        if (Number(data.questType) == 1028) {
            var cfg = Config.SearchCfg.getPersonItemCfgByPersonId(data.value2);
            if (cfg && cfg.name) {
                param.push(cfg.name);
            }
        }
        var taskstr = "taskDesc" + data.questType;
        var taskTxt = ComponentManager.getTextField(LanguageManager.getlocal(taskstr, param), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        if (Number(data.questType) == 1101) {
            var typecolor = data.parameter2;
            // if(Number(code) == 4){
            // 	let color = [];
            // 	switch(Number(view._code)){
            // 		case 4:
            // 		case 5:
            // 			color = [3,1,2];
            // 			break;
            // 		case 6:
            // 		case 7:
            // 			color = [2,4,3];
            // 			break;
            // 		case 8:
            // 		case 9:
            // 			color = [1,2,4];
            // 			break;
            // 		case 10:
            // 		case 11:
            // 			color = [4,3,1];
            // 			break;
            // 	}
            // 	typecolor = color[data.parameter2 - 1];
            // }
            param = [data.parameter1, LanguageManager.getlocal(App.CommonUtil.getCnByCode("AcDestroysameicontype" + typecolor, this.code, code)), data.value];
            taskTxt.text = LanguageManager.getlocal(taskstr, param);
        }
        taskTxt.width = bottom2.width;
        taskTxt.x = bottom2.x + 10;
        taskTxt.y = bottom2.y + 10;
        this.addChild(taskTxt);
        var str = data.getReward;
        if (data.specialReward) {
            str = "1029_0_" + data.specialReward + "_" + this.getUiCode() + "|" + data.getReward;
        }
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
        if (data.questType == 111) {
            needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr", [1 + "", data.value + ""]);
        }
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
    AcDestroySameTaskItem.prototype.collectHandler = function (evt) {
        var vo = this.vo;
        if (!vo) {
            return;
        }
        var taskNum = vo.getTask(this._data.id1, this._data.id2);
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
            this.vo.taskid = this._data.id1 + "_" + this._data.id2;
            this.vo.lastpos = this._needTxt.localToGlobal(this._needTxt.width, 20);
            NetManager.request(NetRequestConst.REQUEST_DESTROYSAME_TASK, {
                "activeId": this.acTivityId,
                "pos": [this._data.id1, this._data.id2]
            });
        }
        else {
            if (Number(this._data.questType) == 1101) {
                var baseview = ViewController.getInstance().getView("AcDestroySamePopupView");
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
    AcDestroySameTaskItem.prototype.update = function () {
        var vo = this.vo;
        if (!vo) {
            return;
        }
        if (this._needTxt) {
            var taskNum = vo.getTask(this._data.id1, this._data.id2);
            if (taskNum >= this._data.value) {
                this._needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr", [taskNum + "", this._data.value + ""]);
            }
            else {
                this._needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr2", [taskNum + "", this._data.value + ""]);
            }
        }
        if (this._goBtn3) {
            if (taskNum >= this._data.value) {
                if (vo.isGetTaskReward(this._data.id1, this._data.id2)) {
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
                if (this._data.questType == 111) {
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
            }
        }
        if (this._goBtn2) {
            if (!vo.isInActivity()) {
                this._goBtn2.setEnable(false);
            }
        }
        // if(Number(this._data.questType) == 111){
        // 	let cfg = Config.SearchCfg.getPersonItemCfgByPersonId(data.value2);
        // 	if(cfg && cfg.name){
        // 		param.push(cfg.name);
        // 	}
        // }
    };
    AcDestroySameTaskItem.prototype.getSpaceY = function () {
        return 0;
    };
    AcDestroySameTaskItem.prototype.dispose = function () {
        this._goBtn3 = null;
        this._collectflag = null;
        this._data = null;
        this._goBtn2 = null;
        this._needTxt = null;
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this); 		
        _super.prototype.dispose.call(this);
    };
    return AcDestroySameTaskItem;
}(ScrollListItem));
__reflect(AcDestroySameTaskItem.prototype, "AcDestroySameTaskItem");
//# sourceMappingURL=AcDestroySameTaskItem.js.map