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
 * 	七日好礼item
 * author 张朝阳
 * date 2019/3/19
 * @class SevenDaysSignUpTaskScrollItem
 */
var SevenDaysSignUpTaskScrollItem = (function (_super) {
    __extends(SevenDaysSignUpTaskScrollItem, _super);
    function SevenDaysSignUpTaskScrollItem() {
        return _super.call(this) || this;
    }
    SevenDaysSignUpTaskScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    SevenDaysSignUpTaskScrollItem.prototype.initItem = function (index, data, itemParam) {
        var isEnSp = Api.sevenDaysSignupLoginVoApi.isEnSp();
        this.width = 610;
        this.height = 190;
        var bgstr = isEnSp ? "public_popupscrollitembg" : "public_9_bg14";
        var itembg = BaseBitmap.create(bgstr);
        itembg.width = this.width;
        itembg.height = this.height;
        itembg.setPosition(this.x + this.width / 2 - itembg.width / 2, 0);
        this.addChild(itembg);
        var titlebgStr = isEnSp ? "shopview_itemtitle" : "activity_charge_red";
        var titleBg = BaseBitmap.create(titlebgStr);
        titleBg.setPosition(itembg.x, itembg.y + 5);
        this.addChild(titleBg);
        var rewardbg = null;
        if (isEnSp) {
            titleBg.width = 370;
            rewardbg = BaseBitmap.create("public_scrolllistbg");
            this.addChild(rewardbg);
        }
        var titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("sevenDaysSignUpViewTab2tasktype_" + data.questType, [String(data.value), data.need]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        if (data.openType == "level") {
            var str = LanguageManager.getlocal("officialTitle" + data.value);
            titleTxt.text = LanguageManager.getlocal("sevenDaysSignUpViewTab2tasktype_" + data.questType, [str]);
        }
        titleTxt.setPosition(titleBg.x + 20, titleBg.y + titleBg.height / 2 - titleTxt.height / 2);
        this.addChild(titleTxt);
        var rewards = data.getReward;
        var rewardsVoList = GameData.formatRewardItem(rewards);
        for (var i = 0; i < rewardsVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardsVoList[i], true, true);
            rewardDB.setPosition(itembg.x + i * (rewardDB.width + 5) + 20, titleBg.y + titleBg.height + 5);
            if (isEnSp) {
                rewardDB.setPosition(rewardDB.x + 10, rewardDB.y + 13);
                if (i == 0) {
                    rewardbg.x = rewardDB.x - 10;
                    rewardbg.y = rewardDB.y - 10;
                    rewardbg.height = rewardDB.y + rewardDB.height + 10 - rewardbg.y;
                }
                if (i == rewardsVoList.length - 1) {
                    rewardbg.width = rewardDB.x + rewardDB.width + 10 - rewardbg.x;
                }
            }
            this.addChild(rewardDB);
        }
        // Api.sevenDaysSignupLoginVoApi.nowDay()
        if (itemParam.day <= Api.sevenDaysSignupLoginVoApi.nowDay()) {
            var value = Api.sevenDaysSignupLoginVoApi.taskValue(itemParam.day, Number(data.id));
            var isSuccess = Api.sevenDaysSignupLoginVoApi.checkTaskSuccess(itemParam.day, Number(data.id));
            var isReceive = Api.sevenDaysSignupLoginVoApi.checkTaskReceive(itemParam.day, Number(data.id));
            if (isReceive) {
                var receiveBMScale = 0.69;
                var receiveBM = BaseBitmap.create("collectflag");
                receiveBM.setScale(receiveBMScale);
                receiveBM.setPosition(itembg.x + itembg.width - receiveBM.width * receiveBMScale - 30, itembg.y + itembg.height - receiveBM.height * receiveBMScale - 30);
                this.addChild(receiveBM);
            }
            else {
                if (isSuccess) {
                    var receiveBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", function () {
                        if (Api.sevenDaysSignupLoginVoApi.checkTimeEnd()) {
                            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                            return;
                        }
                        NetManager.request(NetRequestConst.REQUEST_SEVENDAYSIGN_GETSEVENDAYSIGNTASKREWARD, { "rKey": Number(data.id), "rDay": itemParam.day });
                    }, this);
                    receiveBtn.setPosition(itembg.x + itembg.width - receiveBtn.width - 30, itembg.y + itembg.height - receiveBtn.height - 30);
                    this.addChild(receiveBtn);
                    var dayTxt = ComponentManager.getTextField(LanguageManager.getlocal("sevenDaysSignUpViewValueTip1", [String(value), data.value]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
                    if (data.openType == "level") {
                        var str = LanguageManager.getlocal("officialTitle" + Api.playerVoApi.getPlayerLevel());
                        dayTxt.text = LanguageManager.getlocal("sevenDaysSignUpViewTab2taskLevelValue1", [str]);
                    }
                    dayTxt.setPosition(receiveBtn.x + receiveBtn.width / 2 - dayTxt.width / 2, receiveBtn.y - dayTxt.height - 5);
                    this.addChild(dayTxt);
                }
                else {
                    var goBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "sevenDaysSignUpViewgoBtn", this.goBtnClick, this, [data.openType]);
                    goBtn.setPosition(itembg.x + itembg.width - goBtn.width - 30, itembg.y + itembg.height - goBtn.height - 30);
                    this.addChild(goBtn);
                    var dayTxt = ComponentManager.getTextField(LanguageManager.getlocal("sevenDaysSignUpViewValueTip2", [String(value), data.value]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
                    if (data.openType == "level") {
                        var str = LanguageManager.getlocal("officialTitle" + Api.playerVoApi.getPlayerLevel());
                        dayTxt.text = LanguageManager.getlocal("sevenDaysSignUpViewTab2taskLevelValue2", [str]);
                    }
                    dayTxt.setPosition(goBtn.x + goBtn.width / 2 - dayTxt.width / 2, goBtn.y - dayTxt.height - 5);
                    this.addChild(dayTxt);
                }
            }
        }
        else {
            var unBegin = BaseBitmap.create("sevendayssignupview_common_unbegin");
            unBegin.setPosition(itembg.x + itembg.width - unBegin.width - 30, itembg.y + itembg.height - unBegin.height - 30);
            this.addChild(unBegin);
        }
    };
    SevenDaysSignUpTaskScrollItem.prototype.goBtnClick = function (data) {
        if (Api.sevenDaysSignupLoginVoApi.checkTimeEnd()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var openType = data;
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
        else if (openType == "challenge") {
            ViewController.getInstance().openView(ViewConst.COMMON.CHALLENGEVIEW);
        }
        else if (openType == "servant") {
            ViewController.getInstance().openView(ViewConst.COMMON.SERVANTVIEW);
        }
        else if (openType == "level") {
            // ViewController.getInstance().openView(ViewConst.COMMON.PLAYERVIEW);
            PlayerBottomUI.getInstance().show();
        }
        else if (openType == "bookroom") {
            ViewController.getInstance().openView(ViewConst.COMMON.BOOKROOMVIEW);
        }
    };
    SevenDaysSignUpTaskScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return SevenDaysSignUpTaskScrollItem;
}(ScrollListItem));
__reflect(SevenDaysSignUpTaskScrollItem.prototype, "SevenDaysSignUpTaskScrollItem");
//# sourceMappingURL=SevenDaysSignUpTaskScrollItem.js.map