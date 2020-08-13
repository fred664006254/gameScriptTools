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
var AcNewOpenTaskItem = (function (_super) {
    __extends(AcNewOpenTaskItem, _super);
    function AcNewOpenTaskItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._goBtn3 = null;
        _this._needTxt = null;
        _this._collectflag = null;
        _this._curIdx = 0;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcNewOpenTaskItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewOpenTaskItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewOpenTaskItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewOpenTaskItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_NEWOPEN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewOpenTaskItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcNewOpenTaskItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            case 3:
            case 4:
                code = "4";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcNewOpenTaskItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        var code = view.getUiCode();
        this._data = data;
        this._curIdx = Number(data.taskId);
        var wordsBg = BaseBitmap.create("public_scrollitembg");
        wordsBg.height = 170;
        wordsBg.x = GameConfig.stageWidth / 2 - wordsBg.width / 2;
        this.addChild(wordsBg);
        var bottom2 = BaseBitmap.create("shopview_itemtitle");
        bottom2.x = wordsBg.x;
        bottom2.y = 8;
        this.addChild(bottom2);
        var taskbg = BaseBitmap.create("destroysametaskbg");
        taskbg.x = wordsBg.x + wordsBg.width - taskbg.width;
        taskbg.y = 2;
        this.addChild(taskbg);
        var tasknum = Object.keys(this.cfg.task[this._data.id1]).length;
        var taskTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("AcDestroySameTip6", this.code, code), [this._data.id2, "" + tasknum]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, taskTxt2, taskbg, [0, 4]);
        this.addChild(taskTxt2);
        var param = [];
        if (data.questType == 1) {
            param.push(LanguageManager.getlocal("officialTitle" + data.value));
        }
        else {
            param.push(String(data.value));
        }
        param.push(String(data.peopleNum));
        var taskstr = "acNewOpenTaskType" + data.questType;
        var taskTxt = ComponentManager.getTextField(LanguageManager.getlocal(taskstr, param), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        taskTxt.x = bottom2.x + 10;
        taskTxt.y = bottom2.y + bottom2.height / 2 - taskTxt.height / 2;
        this.addChild(taskTxt);
        bottom2.width = taskTxt.width + 55;
        var str = data.getReward;
        var iconList = GameData.getRewardItemIcons(str, true);
        if (iconList && iconList.length > 0) {
            //额外赠送ICON
            var startX = 20 + wordsBg.x;
            var startY = 54;
            var l = iconList.length;
            var _icon = void 0;
            for (var i = 0; i < l; i++) {
                var icon = iconList[i];
                icon.setScale(0.9);
                icon.setPosition(startX + i * (icon.width * icon.scaleX + 12), startY);
                this.addChild(icon);
            }
        }
        //领取
        this._goBtn3 = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", this.collectHandler, this);
        this._goBtn3.x = 447 + wordsBg.x;
        this._goBtn3.y = 90;
        this.addChild(this._goBtn3);
        //当前进度（0／1）
        var needTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        needTxt.width = this._goBtn3.width;
        needTxt.x = this._goBtn3.x;
        needTxt.y = this._goBtn3.y - 25;
        needTxt.textAlign = "center";
        this._needTxt = needTxt;
        this.addChild(needTxt);
        var collectflag = BaseBitmap.create("collectflag");
        collectflag.x = 475;
        collectflag.y = 55;
        collectflag.scaleX = 0.7;
        collectflag.scaleY = 0.7;
        collectflag.visible = false;
        this.addChild(collectflag);
        this._collectflag = collectflag;
        this.update();
    };
    AcNewOpenTaskItem.prototype.collectHandler = function (evt) {
        var vo = this.vo;
        if (!vo) {
            return;
        }
        var taskNum = vo.getTask(this._data.id1, Number(this._data.id2) - 1);
        if (this.vo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if (taskNum >= this._data.peopleNum) {
            this.vo.taskid = this._data.id1 + "_" + this._data.id2;
            this.vo.lastpos = this._needTxt.localToGlobal(this._needTxt.width - 70, 20);
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_NEWOPENTASKREWARDS, {
                activeId: this.acTivityId,
                rkey: this._data.id1 + 1,
                rNum: this._data.id2
            });
        }
        else {
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
    AcNewOpenTaskItem.prototype.update = function () {
        var vo = this.vo;
        if (!vo) {
            return;
        }
        var taskNum = vo.getTask(this._data.id1, Number(this._data.id2) - 1);
        if (this._needTxt) {
            if (taskNum >= this._data.peopleNum) {
                this._needTxt.text = LanguageManager.getlocal("acNewOpenNeedStr", [taskNum + "", this._data.peopleNum + ""]);
            }
            else {
                this._needTxt.text = LanguageManager.getlocal("acNewOpenNeedStr2", [taskNum + "", this._data.peopleNum + ""]);
            }
        }
        if (this._goBtn3) {
            if (taskNum >= this._data.peopleNum) {
                if (vo.isGetTaskReward(this._data.id1, Number(this._data.id2) - 1)) {
                    this._goBtn3.visible = false;
                    this._needTxt.visible = false;
                    this._collectflag.visible = true;
                }
                else {
                    this._goBtn3.visible = true;
                    this._goBtn3.setText("realnamedes6");
                    App.DisplayUtil.changeToNormal(this._goBtn3);
                }
            }
            else {
                this._goBtn3.setEnable(false);
            }
        }
    };
    AcNewOpenTaskItem.prototype.getSpaceY = function () {
        return 8;
    };
    AcNewOpenTaskItem.prototype.dispose = function () {
        this._goBtn3 = null;
        this._collectflag = null;
        this._data = null;
        this._needTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcNewOpenTaskItem;
}(ScrollListItem));
__reflect(AcNewOpenTaskItem.prototype, "AcNewOpenTaskItem");
//# sourceMappingURL=AcNewOpenTaskItem.js.map