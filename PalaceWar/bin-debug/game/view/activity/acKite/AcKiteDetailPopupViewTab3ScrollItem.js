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
 * 任务奖励item
 * @author ycg
 */
var AcKiteDetailPopupViewTab3ScrollItem = (function (_super) {
    __extends(AcKiteDetailPopupViewTab3ScrollItem, _super);
    function AcKiteDetailPopupViewTab3ScrollItem() {
        var _this = _super.call(this) || this;
        _this.itemParam = null;
        _this._itemData = null;
        return _this;
    }
    Object.defineProperty(AcKiteDetailPopupViewTab3ScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcKiteDetailPopupViewTab3ScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcKiteDetailPopupViewTab3ScrollItem.prototype, "aid", {
        get: function () {
            return this.itemParam.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcKiteDetailPopupViewTab3ScrollItem.prototype, "code", {
        get: function () {
            return this.itemParam.code;
        },
        enumerable: true,
        configurable: true
    });
    AcKiteDetailPopupViewTab3ScrollItem.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcKiteDetailPopupViewTab3ScrollItem.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        this.itemParam = itemParam;
        this._itemData = data;
        this.width = 530;
        //item bg
        var bg = BaseBitmap.create("public_popupscrollitembg");
        bg.x = this.width / 2 - bg.width / 2;
        this.addChild(bg);
        var titleBg = BaseBitmap.create(this.getDefaultRes("ackite_tasktitlebg"));
        this.addChild(titleBg);
        titleBg.x = bg.x + bg.width / 2 - titleBg.width / 2;
        bg.y = titleBg.y + 5;
        //title txt
        var titleTxtStr = "";
        if (data.group == 1) {
        }
        else {
            if (data.questType) {
                titleTxtStr = LanguageManager.getlocal("taskDesc" + data.questType, ["" + data.value]);
            }
        }
        var titleTxt = ComponentManager.getTextField(titleTxtStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        titleTxt.x = this.width / 2 - titleTxt.width / 2;
        titleTxt.y = titleBg.y + 10;
        this.addChild(titleTxt);
        var rewards = data.getReward;
        if (this._itemData.specialGift) {
            rewards = "1052_0_" + data.specialGift + "_" + this.getTypeCode() + "|" + rewards;
        }
        var rewardIconList = GameData.getRewardItemIcons(rewards, true, true);
        var scale = 0.8;
        var itemHeight = 108;
        var itemWidth = 108;
        var spaceX = 10;
        var spaceY = 10;
        var stX = bg.x + (bg.width - (itemWidth * scale + spaceX) * 5 + spaceX) / 2;
        var stY = bg.y + 45;
        var offHeight = 90;
        var rewardBg = BaseBitmap.create("public_scrolllistbg");
        rewardBg.width = bg.width - 20;
        rewardBg.x = bg.x + bg.width / 2 - rewardBg.width / 2;
        rewardBg.y = stY - 10;
        this.addChild(rewardBg);
        for (var i = 0; i < rewardIconList.length; i++) {
            var rewardDB = rewardIconList[i];
            rewardDB.setScale(scale);
            rewardDB.setPosition(stX + ((rewardDB.width * scale + spaceX) * (i % 5)), stY + ((rewardDB.height * scale + spaceY) * Math.floor(i / 5)));
            this.addChild(rewardDB);
        }
        var bgHeight = (rewardIconList.length % 5 == 0 ? rewardIconList.length / 5 : Math.ceil(rewardIconList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + stY + offHeight;
        if (bgHeight > bg.height) {
            bg.height = bgHeight;
        }
        rewardBg.height = (rewardIconList.length % 5 == 0 ? rewardIconList.length / 5 : Math.ceil(rewardIconList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + 20;
        //进度条
        var progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 320);
        progress.setPosition(bg.x + 15, bg.y + bg.height - progress.height - 25);
        this.addChild(progress);
        var currNum = this.vo.getTaskNum(data.questType);
        var progressStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteDetailProcess", this.getTypeCode()), [String(currNum), String(data.value)]);
        progress.setPercentage(currNum / data.value, progressStr, TextFieldConst.COLOR_WHITE);
        if (this.vo.getTaskStatus(data.id)) {
            var reviceBM = BaseBitmap.create("collectflag");
            reviceBM.anchorOffsetX = reviceBM.width / 2;
            reviceBM.anchorOffsetY = reviceBM.height / 2;
            reviceBM.setScale(0.7);
            reviceBM.setPosition(bg.x + bg.width - reviceBM.width * 0.7 / 2 - 10, bg.y + bg.height - reviceBM.height * 0.7 / 2);
            this.addChild(reviceBM);
        }
        else {
            if (this.vo.getTaskNum(data.questType) >= data.value) {
                var reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", function () {
                    if ((!_this.vo.isStart)) {
                        _this.vo.showAcEndTip();
                        return;
                    }
                    NetManager.request(NetRequestConst.REQUEST_ACKITE_GETTASKREWARD, { activeId: _this.vo.aidAndCode, taskId: data.id });
                }, this);
                reviceBtn.setPosition(bg.x + bg.width - reviceBtn.width - 15, bg.y + bg.height - reviceBtn.height - 15);
                this.addChild(reviceBtn);
                reviceBtn.setColor(TextFieldConst.COLOR_BLACK);
            }
            else {
                if (data.questType == 111) {
                    var reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", function () {
                        if ((!_this.vo.isInActivity())) {
                            _this.vo.showAcEndTip();
                            return;
                        }
                    }, this);
                    reviceBtn.setPosition(bg.x + bg.width - reviceBtn.width - 15, bg.y + bg.height - reviceBtn.height - 15);
                    this.addChild(reviceBtn);
                    reviceBtn.setEnable(false);
                    reviceBtn.setColor(TextFieldConst.COLOR_BLACK);
                }
                else {
                    var goBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, "taskGoBtn", this.taskGoBtnHandler, this);
                    goBtn.setPosition(bg.x + bg.width - goBtn.width - 15, bg.y + bg.height - goBtn.height - 15);
                    this.addChild(goBtn);
                    goBtn.setColor(TextFieldConst.COLOR_BLACK);
                    if (!this.vo.isInActivity()) {
                        goBtn.setGray(true);
                    }
                }
            }
        }
        this.height = bg.y + bg.height + this.getSpaceY();
    };
    AcKiteDetailPopupViewTab3ScrollItem.prototype.taskGoBtnHandler = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (!vo.isInActivity()) {
            vo.showAcEndTip();
            return;
        }
        if (this._itemData.group == 3) {
            ViewController.getInstance().openView("ShopView");
            return;
        }
        if (!this._itemData.openType) {
            return;
        }
        var openType = this._itemData.openType;
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
            var viewName = App.StringUtil.firstCharToUper(openType);
            if (openType == "alliance") {
                var allid = Api.playerVoApi.getPlayerAllianceId();
                if (!allid || allid <= 0) {
                    viewName = "AllianceCreate";
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
    //根据资源名字得到完整资源名字
    AcKiteDetailPopupViewTab3ScrollItem.prototype.getDefaultRes = function (resName, defaultCode) {
        defaultCode = defaultCode ? defaultCode : "1";
        if (ResourceManager.hasRes(resName + "-" + this.code)) {
            return resName + "-" + this.code;
        }
        else if (ResourceManager.hasRes(resName + "-" + defaultCode)) {
            return resName + "-" + defaultCode;
        }
        else {
            return resName;
        }
    };
    AcKiteDetailPopupViewTab3ScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcKiteDetailPopupViewTab3ScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcKiteDetailPopupViewTab3ScrollItem.prototype.dispose = function () {
        this.itemParam = null;
        this._itemData = null;
        _super.prototype.dispose.call(this);
    };
    return AcKiteDetailPopupViewTab3ScrollItem;
}(ScrollListItem));
__reflect(AcKiteDetailPopupViewTab3ScrollItem.prototype, "AcKiteDetailPopupViewTab3ScrollItem");
//# sourceMappingURL=AcKiteDetailPopupViewTab3ScrollItem.js.map