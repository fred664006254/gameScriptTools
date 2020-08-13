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
 * 情缘 奖励item
 * author ycg
 * date 2020.4.7
 * @class QingyuanNewItemRewardTab1
 */
var QingyuanNewItemRewardTab1 = (function (_super) {
    __extends(QingyuanNewItemRewardTab1, _super);
    function QingyuanNewItemRewardTab1(data) {
        var _this = _super.call(this) || this;
        _this.param = data;
        _this.initView();
        return _this;
    }
    QingyuanNewItemRewardTab1.prototype.initView = function () {
        var _this = this;
        this.width = 620;
        var offH = 0;
        var offY = 0;
        var data = this.param.data.collect;
        var isOpen = this.param.data.collectOpen;
        App.LogUtil.log("tab1 " + isOpen);
        var len = 1;
        if (isOpen) {
            len = data.length;
        }
        var sortData = Api.encounterVoApi.getSortProcessData(this.param.data.type, data);
        for (var i = 0; i < len; i++) {
            var container = this.getItemContainer(sortData[i]);
            container.setPosition(this.width / 2 - container.width / 2, offY);
            offY = container.height + offY;
            this.addChild(container);
        }
        var openBtnImg = isOpen ? "qingyuannew_itemoffbtn" : "qingyuannew_itemopenbtn";
        var openBtn = ComponentManager.getButton(openBtnImg, "", function () {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ENCOUNTER_FRESHUI, { type: _this.param.data.type, tabType: 1, isFreshData: true });
        }, this);
        this.addChild(openBtn);
        openBtn.setPosition(this.width - openBtn.width - 20, -openBtn.height + 40);
        this.height = offY;
    };
    QingyuanNewItemRewardTab1.prototype.getItemContainer = function (itemData) {
        var _this = this;
        var container = new BaseDisplayObjectContainer();
        container.width = 620;
        var titleBg = BaseBitmap.create("qingyuannew_gearitemtitlebg");
        titleBg.setPosition(container.width / 2 - titleBg.width / 2, 0);
        container.addChild(titleBg);
        var have = Api.encounterVoApi.getActiveBuffNum(this.param.data.type);
        var currNum = Api.encounterVoApi.getCurrHaveNum(this.param.data.type);
        var showNum = currNum;
        if (currNum > itemData.task_Value) {
            showNum = itemData.task_Value;
        }
        var numTitleStr = LanguageManager.getlocal("qingyuantasktitlenum" + itemData.index);
        var currHaveNumKey = "qingyuantaskprocess1";
        if (currNum >= itemData.task_Value) {
            currHaveNumKey = "qingyuantaskprocess2";
        }
        var currNumStr = LanguageManager.getlocal(currHaveNumKey, ["" + currNum, "" + itemData.task_Value]);
        var titleTxt = ComponentManager.getTextField(numTitleStr + LanguageManager.getlocal("qingyuantasktype" + itemData.type + "_" + this.param.data.kind, ["" + itemData.task_Value]) + currNumStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt.setPosition(titleBg.x + 35, titleBg.y + titleBg.height / 2 - titleTxt.height / 2);
        container.addChild(titleTxt);
        var isOpen = this.param.data.collectOpen;
        if (!isOpen) {
            container.height = titleBg.y + titleBg.height + 15;
            return container;
        }
        var txtcolor = have >= itemData.id ? TextFieldConst.COLOR_BROWN : TextFieldConst.COLOR_BROWN;
        var strarr = this.getAddStr(itemData.data);
        // console.log(itemData.data);
        // console.log(strarr);
        if (strarr.length > 0) {
            var rewardTitle = ComponentManager.getTextField(LanguageManager.getlocal("qingyuantaskreward"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            rewardTitle.setPosition(titleBg.x + 35, titleBg.y + titleBg.height + 15);
            container.addChild(rewardTitle);
        }
        var attrSize = TextFieldConst.FONTSIZE_ACTIVITY_COMMON;
        if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsRuLang() || PlatformManager.checkIsThSp()) {
            attrSize = 16;
        }
        var offY = 0;
        for (var i in strarr) {
            var isdouble = Number(i) % 2 == 0;
            var addtxt = ComponentManager.getTextField(strarr[i], attrSize, txtcolor);
            // addtxt.x = isdouble ? 30 : (container.width - addtxt.width - 30);
            // addtxt.y = titleBg.y + titleBg.height + 10 + Math.floor(Number(i) / 2) * 30 + 5;
            // addtxt.x = titleBg.x + 35;
            // addtxt.y = titleBg.y + titleBg.height + 15  + 25 + Number(i) * 30 + 5;
            addtxt.x = isdouble ? titleBg.x + 35 : titleBg.x + titleBg.width / 2 + 50 - 15;
            addtxt.y = titleBg.y + titleBg.height + 15 + 25 + Math.floor(Number(i) / 2) * 30 + 5;
            addtxt.name = "str" + i;
            container.addChild(addtxt);
            offY = addtxt.y + addtxt.height;
        }
        if (itemData.reward) {
            if (offY == 0) {
                offY = titleBg.y + titleBg.height - 5;
            }
            var rewardIcons = GameData.getRewardItemIcons(itemData.reward, true, true);
            var rowCount = 5;
            var count = Math.ceil(rewardIcons.length / rowCount) * rowCount;
            var scale = 0.9;
            var spaceX = 12;
            var spaceY = 10;
            var itemHeight = 108;
            var itemWidth = 108;
            for (var i = 0; i < count; i++) {
                var rewardDB = null;
                if (rewardIcons[i]) {
                    rewardDB = rewardIcons[i];
                }
                else {
                    rewardDB = BaseBitmap.create("itembg_0");
                }
                rewardDB.setScale(scale);
                rewardDB.setPosition(titleBg.x + 34 + ((rewardDB.width * scale + spaceX) * (i % rowCount)), offY + 20 + ((rewardDB.height * scale + spaceY) * Math.floor(i / rowCount)));
                container.addChild(rewardDB);
            }
            offY = offY + 30 + (rewardIcons.length % rowCount == 0 ? rewardIcons.length / rowCount : Math.ceil(rewardIcons.length / rowCount)) * (itemHeight * scale + spaceY) - spaceY;
        }
        else {
            offY = offY + 10;
        }
        container.height = offY + 20 + 60;
        var collectBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", function () {
            var getIndex = Api.encounterVoApi.getCurrCanGetIndex(_this.param.data.type);
            App.LogUtil.log("getIndex " + getIndex);
            if (getIndex) {
                NetManager.request(NetRequestConst.REQUEST_ENCOUNTER_ACTIVATE, {
                    encounterId: _this.param.data.type,
                    eIndex: getIndex
                });
            }
        }, this);
        container.addChild(collectBtn);
        // collectBtn.setPosition(container.width - collectBtn.width - 30, titleBg.y + titleBg.height + (container.height - titleBg.y - titleBg.height)/2 - collectBtn.height/2);
        collectBtn.setPosition(container.width / 2 - collectBtn.width / 2, container.height - 15 - collectBtn.height);
        var collectFlag = BaseBitmap.create("collectflag");
        collectFlag.setScale(0.65);
        collectFlag.setPosition(container.width / 2 - collectFlag.width * collectFlag.scaleX / 2, container.height - 0 - collectFlag.height * collectFlag.scaleY);
        // collectFlag.setPosition(container.width - collectFlag.width * collectFlag.scaleX - 25, collectBtn.y + collectBtn.height/2 - collectFlag.height * collectFlag.scaleY/2);
        container.addChild(collectFlag);
        if (Number(itemData.id) <= have) {
            //已领取
            collectBtn.visible = false;
            collectFlag.visible = true;
        }
        else {
            collectFlag.visible = false;
            if (currNum > have && Number(itemData.id) <= currNum) {
                if ((have + 1) == Number(itemData.id)) {
                    //可领取
                    collectBtn.setEnable(true);
                }
                else {
                    collectBtn.setEnable(false);
                }
            }
            else {
                //不可领取
                collectBtn.setEnable(false);
            }
        }
        return container;
    };
    QingyuanNewItemRewardTab1.prototype.getAddStr = function (data) {
        var dataList = data;
        var attrstring = ["strength", "intelligence", "politics", "charm", "all", "strength_Constant", "intelligence_Constant",
            "politics_Constant", "charm_Constant", "all_Constant", "wife_Intimacy", "wife_Charm", "wife_exp", "wife_Child"];
        var strarr = [];
        for (var i = 0; i < dataList.length; i++) {
            var name_1 = "";
            var sid = dataList[i].id;
            if (Config.ServantCfg.getServantItemById(sid)) {
                name_1 = Config.ServantCfg.getServantItemById(sid).name;
            }
            else if (Config.WifeCfg.getWifeCfgById(sid)) {
                name_1 = Config.WifeCfg.getWifeCfgById(sid).name;
            }
            else if (Config.ServantskinCfg.getServantSkinItemById(sid)) {
                name_1 = Config.ServantskinCfg.getServantSkinItemById(sid).name;
            }
            else if (Config.WifeskinCfg.getWifeCfgById(sid)) {
                name_1 = Config.WifeskinCfg.getWifeCfgById(sid).name;
            }
            var unit = dataList[i];
            for (var k in attrstring) {
                var attrstr = attrstring[k];
                var num = unit[attrstr];
                if (num > 0) {
                    //处理
                    if (num < 1) {
                        num *= 100;
                    }
                    strarr.push("" + name_1 + LanguageManager.getlocal("qingyuanadd" + attrstr, [num.toString()]));
                }
            }
            if (unit.specialType) {
                var num = App.StringUtil.changeIntToText2(unit.specialValue);
                strarr.push("" + name_1 + LanguageManager.getlocal("qingyuanspecailadd" + unit.specialType, [num.toString()]));
            }
        }
        var childall = this.data.all_Child;
        if (childall) {
            if (childall < 1) {
                childall *= 100;
            }
            strarr.push("" + LanguageManager.getlocal("qingyuanaddall_Child", [childall.toString()]));
        }
        // if(this.data.reward){
        // 	let rewardvo = GameData.formatRewardItem(this.data.reward)[0];
        // 	strarr.push(
        // 		`${LanguageManager.getlocal(`qingyuanaddgetrewards`, [rewardvo.itemType, rewardvo.name, rewardvo.num.toString()])}`
        // 	);
        // }
        return strarr;
    };
    QingyuanNewItemRewardTab1.prototype.activateCallback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            // let rData = evt.data.data.data;
            // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ENCOUNTER_MODEL);
            // if(rData.rewards){
            //     let rewardList =  GameData.formatRewardItem(rData.rewards);
            //     App.CommonUtil.playRewardFlyAction(rewardList);
            // }
            // if (rData.replacerewards) {
            //     ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
            // }
        }
    };
    Object.defineProperty(QingyuanNewItemRewardTab1.prototype, "data", {
        get: function () {
            return this.param.data;
        },
        enumerable: true,
        configurable: true
    });
    QingyuanNewItemRewardTab1.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ENCOUNTER_ACTIVATE, this.activateCallback, this);
        _super.prototype.dispose.call(this);
    };
    return QingyuanNewItemRewardTab1;
}(CommonViewTab));
__reflect(QingyuanNewItemRewardTab1.prototype, "QingyuanNewItemRewardTab1");
//# sourceMappingURL=QingyuanNewItemRewardTab1.js.map