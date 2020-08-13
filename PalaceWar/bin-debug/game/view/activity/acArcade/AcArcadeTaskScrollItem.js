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
  * 电玩的任务item
  * author 张朝阳
  * date 2019/6/12
  * @class AcArcadeTaskScrollItem
  */
var AcArcadeTaskScrollItem = (function (_super) {
    __extends(AcArcadeTaskScrollItem, _super);
    function AcArcadeTaskScrollItem() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._aidAndCode = null;
        return _this;
    }
    /**
     * 初始化itemview
     */
    AcArcadeTaskScrollItem.prototype.initItem = function (index, data, itemParam) {
        this._itemData = data;
        this._aidAndCode = itemParam;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        this.width = 608;
        this.height = 165;
        var itembg = BaseBitmap.create("public_9_bg14");
        itembg.width = this.width;
        itembg.height = this.height;
        this.addChild(itembg);
        var titleBg = BaseBitmap.create("activity_charge_red");
        titleBg.y = 7;
        // bottom2.width =170;
        this.addChild(titleBg);
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeTaksTitleType" + this._itemData.questType + "-" + this._aidAndCode.code, [String(this._itemData.value)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + 25, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        titleBg.width = titleTF.width + 50;
        var rewards = this._itemData.getReward;
        if (this._itemData.specialGift) {
            rewards = "1018_0_" + this._itemData.specialGift + "_" + itemParam.code + "|" + this._itemData.getReward;
        }
        var rewardArr = GameData.formatRewardItem(rewards);
        for (var i = 0; i < rewardArr.length; i++) {
            var scale = 0.85;
            var rewardItem = GameData.getItemIcon(rewardArr[i], true);
            rewardItem.setScale(scale);
            rewardItem.setPosition(20 + (rewardItem.width * scale + 8) * i, titleBg.y + titleBg.height + 5);
            this.addChild(rewardItem);
        }
        if (vo.getTaskFlag(this._itemData.id)) {
            var reviceBM = BaseBitmap.create("collectflag");
            reviceBM.anchorOffsetX = reviceBM.width / 2;
            reviceBM.anchorOffsetY = reviceBM.height / 2;
            reviceBM.setScale(0.7);
            reviceBM.setPosition(itembg.x + itembg.width - reviceBM.width * 0.7 / 2 - 20, itembg.y + itembg.height - reviceBM.height / 2 * 0.7);
            this.addChild(reviceBM);
        }
        else {
            if (vo.getTaskValue(this._itemData.questType) >= this._itemData.value || this._itemData.questType == "1") {
                var reviceBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", function () {
                    if (!vo.isStart) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                        return;
                    }
                    NetManager.request(NetRequestConst.REQUST_ACTIVITY_ARCADEGETTASKRWD, { activeId: vo.aidAndCode, rkey: data.id });
                }, this);
                reviceBtn.setPosition(itembg.x + itembg.width - reviceBtn.width - 15, itembg.y + itembg.height - reviceBtn.height - 20);
                this.addChild(reviceBtn);
                if (this._itemData.questType == "1" && vo.getTaskValue(this._itemData.questType) < this._itemData.value) {
                    reviceBtn.setEnable(false);
                }
            }
            else {
                var goBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "taskGoBtn", this.goBtnClick, this);
                goBtn.setPosition(itembg.x + itembg.width - goBtn.width - 15, itembg.y + itembg.height - goBtn.height - 20);
                this.addChild(goBtn);
                if ((!vo.isStart) || (vo.checkIsInEndShowTime())) {
                    goBtn.setGray(true);
                }
            }
        }
        var scheduleNum = vo.getTaskValue(this._itemData.questType);
        var scheduleStr = scheduleNum >= data.value ? LanguageManager.getlocal("springcelebrationNeedStr", [String(scheduleNum), String(this._itemData.value)]) : LanguageManager.getlocal("springcelebrationNeedStr2", [String(scheduleNum), String(this._itemData.value)]);
        var scheduleTF = ComponentManager.getTextField(scheduleStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        scheduleTF.setPosition(this.x + this.width - 90 - scheduleTF.width / 2, this.height / 2 - scheduleTF.height);
        this.addChild(scheduleTF);
    };
    /**
     * 前往的Click
     */
    AcArcadeTaskScrollItem.prototype.goBtnClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        var deltaT = vo.et - GameData.serverTime - 86400 * 1;
        if (deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var openType = this._itemData.openType;
        if (Api[openType + "VoApi"] && Api[openType + "VoApi"].isShowNpc) {
            var isShowNpc = Api[openType + "VoApi"].isShowNpc();
            if (!isShowNpc) {
                var lockedStr = Api[openType + "VoApi"].getLockedString ? Api[openType + "VoApi"].getLockedString() : LanguageManager.getlocal("dailyTask_" + openType + "Tip");
                App.CommonUtil.showTip(lockedStr ? lockedStr : LanguageManager.getlocal("sysWaitOpen"));
                return;
            }
        }
        if (openType == "wife") {
            ViewController.getInstance().openView(ViewConst.COMMON.WIFEVIEW_TAB1);
        }
        else if (openType == "child") {
            ViewController.getInstance().openView(ViewConst.COMMON.CHILDVIEW);
        }
        else if (openType == "search") {
            ViewController.getInstance().openView(ViewConst.COMMON.SEARCHVIEW);
        }
        else if (openType == "atkrace") {
            ViewController.getInstance().openView(ViewConst.COMMON.ATKRACEVIEW);
        }
        else if (openType == "affair") {
            ViewController.getInstance().openView(ViewConst.COMMON.AFFAIRVIEW);
        }
        else if (openType == "shop") {
            ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
        }
    };
    /**
     * 获得
     */
    AcArcadeTaskScrollItem.prototype.getTitleStr = function (type) {
        var strTop = null;
        var valueStr = String(this._itemData.value);
        switch (Number(this._itemData.questType)) {
            case 1:
                {
                    strTop = LanguageManager.getlocal("acChristmasTaksTitleType1", [valueStr]);
                    break;
                }
            case 1002:
                {
                    strTop = LanguageManager.getlocal("acChristmasTaksTitleType2", [valueStr]);
                    break;
                }
            case 301:
                {
                    strTop = LanguageManager.getlocal("acChristmasTaksTitleType3", [valueStr]);
                    break;
                }
            case 402:
                {
                    strTop = LanguageManager.getlocal("acChristmasTaksTitleType4", [valueStr]);
                    break;
                }
            case 303:
                {
                    strTop = LanguageManager.getlocal("acChristmasTaksTitleType5", [valueStr]);
                    break;
                }
            case 601:
                {
                    strTop = LanguageManager.getlocal("acChristmasTaksTitleType6", [valueStr]);
                    break;
                }
        }
        return strTop;
    };
    AcArcadeTaskScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcArcadeTaskScrollItem.prototype.dispose = function () {
        this._itemData = null;
        _super.prototype.dispose.call(this);
    };
    return AcArcadeTaskScrollItem;
}(ScrollListItem));
__reflect(AcArcadeTaskScrollItem.prototype, "AcArcadeTaskScrollItem");
//# sourceMappingURL=AcArcadeTaskScrollItem.js.map