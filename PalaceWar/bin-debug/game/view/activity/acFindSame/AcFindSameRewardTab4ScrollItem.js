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
var AcFindSameRewardTab4ScrollItem = (function (_super) {
    __extends(AcFindSameRewardTab4ScrollItem, _super);
    function AcFindSameRewardTab4ScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._needTxt = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcFindSameRewardTab4ScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.code.aid, this.code.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcFindSameRewardTab4ScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.code.aid, this.code.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcFindSameRewardTab4ScrollItem.prototype, "aid", {
        get: function () {
            return "findSame";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcFindSameRewardTab4ScrollItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcFindSameRewardTab4ScrollItem.prototype.initItem = function (index, data, itemparam) {
        var _this = this;
        var view = this;
        view._code = itemparam;
        var code = this.code.code;
        view.width = 530;
        view.height = 170;
        this._data = data;
        var wordsBg = BaseBitmap.create("public_popupscrollitembg");
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
        var param = [];
        param.push(data.value);
        if (Number(data.questType) == 1028) {
            var cfg = Config.SearchCfg.getPersonItemCfgByPersonId(data.value2);
            if (cfg && cfg.name) {
                param.push(cfg.name);
            }
        }
        var titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("findsamequestType" + data.questType, [String(data.value)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt.x = bottom2.x + 10;
        titleTxt.y = bottom2.y + 13;
        this.addChild(titleTxt);
        var currNum = this.vo.getTaskNumByType(data.fid, data.sid);
        var needStrKey = "findsame_taskprocess1";
        if (currNum >= data.value) {
            needStrKey = "findsame_taskprocess2";
        }
        var needText = ComponentManager.getTextField(LanguageManager.getlocal(needStrKey, ["" + data.sid, "" + this.vo.getFNum(data.fid)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, needText, taskbg, [0, taskbg.height / 2 - needText.height / 2 + 5]);
        this.addChild(needText);
        var needStrKey2 = "findsame_taskpro1";
        if (currNum >= data.value) {
            needStrKey2 = "findsame_taskpro2";
        }
        var needText2 = ComponentManager.getTextField(LanguageManager.getlocal(needStrKey2, ["" + currNum, "" + data.value]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, needText2, taskbg, [0, taskbg.height / 2 - needText.height / 2 + 50]);
        this.addChild(needText2);
        if (currNum >= data.value) {
            if (this.vo.isGetTaskById(data.fid, data.sid)) {
                //已领取
                var collectflag = BaseBitmap.create("collectflag");
                collectflag.setScale(0.7);
                collectflag.setPosition(this.width - collectflag.width * 0.7 - 5, this.height - collectflag.height * 0.7);
                this.addChild(collectflag);
                needText2.visible = false;
            }
            else {
                //可领取 未领取
                var reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", function () {
                    if ((!_this.vo.isStart)) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                        return;
                    }
                    NetManager.request(NetRequestConst.REQUEST_FINDSAME_GETTASK, { activeId: _this.vo.aidAndCode, pos: [data.fid, data.sid] });
                }, this);
                reviceBtn.setPosition(this.width - reviceBtn.width - 15, this.height - reviceBtn.height - 25);
                this.addChild(reviceBtn);
            }
        }
        else {
            //未完成
            if (data.questType == 1004) {
                var reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", function () {
                }, this);
                reviceBtn.setPosition(this.width - reviceBtn.width - 15, this.height - reviceBtn.height - 25);
                this.addChild(reviceBtn);
                reviceBtn.setGray(true);
                reviceBtn.setEnable(false);
            }
            else {
                var goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "taskGoBtn", this.taskGoBtnHandler, this);
                goBtn.setPosition(this.width - goBtn.width - 15, this.height - goBtn.height - 25);
                this.addChild(goBtn);
                if ((!this.vo.isStart) || (this.vo.checkIsInEndShowTime())) {
                    goBtn.setGray(true);
                }
                if (this._data.openType) {
                    goBtn.setGray(false);
                    goBtn.setEnable(true);
                    goBtn.setText("taskGoBtn");
                }
                else {
                    goBtn.setGray(true);
                    goBtn.setEnable(false);
                    goBtn.setText("taskCollect");
                }
            }
        }
        var rewards = data.getReward;
        if (data.specialTime) {
            rewards = "1056_0_" + data.specialTime + "_" + code + "|" + data.getReward;
        }
        var str = rewards;
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
        // this.update();
    };
    AcFindSameRewardTab4ScrollItem.prototype.update = function () {
        var vo = this.vo;
        if (!vo) {
            return;
        }
        if (this._needTxt) {
            var taskNum = this.vo.getTaskNumByType(this._data.fid, this._data.sid);
            if (taskNum >= this._data.value) {
                this._needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr", [taskNum + "", this._data.value + ""]);
            }
            else {
                this._needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr2", [taskNum + "", this._data.value + ""]);
            }
        }
    };
    AcFindSameRewardTab4ScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcFindSameRewardTab4ScrollItem.prototype.taskGoBtnHandler = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.code.aid, this.code.code);
        if (vo.checkIsInEndShowTime() || (!vo.isStart)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (!this._data.openType) {
            return;
        }
        var openType = this._data.openType;
        if (openType == "") {
            PlayerBottomUI.getInstance().show();
        }
        else {
            var viewName = App.StringUtil.firstCharToUper(openType);
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
    };
    AcFindSameRewardTab4ScrollItem.prototype.dispose = function () {
        this._data = null;
        this._needTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcFindSameRewardTab4ScrollItem;
}(ScrollListItem));
__reflect(AcFindSameRewardTab4ScrollItem.prototype, "AcFindSameRewardTab4ScrollItem");
//# sourceMappingURL=AcFindSameRewardTab4ScrollItem.js.map