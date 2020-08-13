/**
 * 任务item
 * author ycg
 * date 2020.3.24
 * @class AcChaoTingViewTabScrollItem3
 */
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
var AcChaoTingViewTabScrollItem3 = (function (_super) {
    __extends(AcChaoTingViewTabScrollItem3, _super);
    function AcChaoTingViewTabScrollItem3() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._aid = null;
        _this._code = null;
        _this._vo = null;
        return _this;
    }
    AcChaoTingViewTabScrollItem3.prototype.initItem = function (index, data, itemParam) {
        this._itemData = data;
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        this._vo = vo;
        this.width = 640;
        var bgImg = ResourceManager.hasRes("acchaoting_itembg-" + this.getTypeCode()) ? "acchaoting_itembg-" + this.getTypeCode() : "acchaoting_itembg-1";
        var bg = BaseBitmap.create(bgImg);
        bg.x = this.width / 2 - bg.width / 2;
        this.addChild(bg);
        var topBgImg = ResourceManager.hasRes("acchaoting_itemtitlebg-" + this.getTypeCode()) ? "acchaoting_itemtitlebg-" + this.getTypeCode() : "acchaoting_itemtitlebg-1";
        var topBg = BaseBitmap.create(topBgImg);
        topBg.y = 0;
        topBg.x = this.width / 2 - topBg.width / 2;
        bg.y = topBg.y + 13;
        this.addChild(topBg);
        var topName = ComponentManager.getTextField(LanguageManager.getlocal("taskDesc" + data.questType, ["" + data.value]), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        topName.setPosition(topBg.x + topBg.width / 2 - topName.width / 2, topBg.y + 17);
        this.addChild(topName);
        var rewardVoList = GameData.formatRewardItem(data.getReward);
        var scale = 0.95;
        var itemHeight = 108;
        var itemWidth = 108;
        var spaceX = 14;
        var spaceY = 12;
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
            rewardDB.setScale(scale);
            rewardDB.setPosition(bg.x + 21 + ((rewardDB.width * scale + spaceX) * (i % 5)), bg.y + 45 + ((rewardDB.height * scale + spaceY) * Math.floor(i / 5)));
            this.addChild(rewardDB);
        }
        var rHeight = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.ceil(rewardVoList.length / 5)) * (itemHeight * scale + spaceY) - spaceY;
        var bgH = bg.y + 45 + rHeight + 70;
        if (bgH > bg.height) {
            bg.height = bgH;
        }
        this.height = bgH + 13 + this.getSpaceY();
        var progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 420);
        progress.setPosition(bg.x + 15, bg.y + bg.height - progress.height - 25);
        this.addChild(progress);
        var currNum = vo.getTaskNum(data.questType);
        var progressStr = "" + currNum + "/" + data.value;
        progress.setPercentage(currNum / data.value, progressStr, TextFieldConst.COLOR_WHITE);
        if (vo.isGetTaskRewardById(data.id)) {
            var collectflag = BaseBitmap.create("collectflag");
            collectflag.setScale(0.7);
            collectflag.setPosition(bg.x + bg.width - collectflag.width * 0.7 - 10, bg.y + bg.height - collectflag.height * 0.7);
            this.addChild(collectflag);
        }
        else {
            if (currNum >= data.value) {
                var reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", function () {
                    if ((!vo.isStart)) {
                        vo.showAcEndTip();
                        return;
                    }
                    NetManager.request(NetRequestConst.REQUEST_ACCHAOTING_GETTASK, { activeId: vo.aidAndCode, taskId: data.id });
                }, this);
                reviceBtn.setPosition(bg.x + bg.width - reviceBtn.width - 15, bg.y + bg.height - reviceBtn.height - 15);
                this.addChild(reviceBtn);
            }
            else {
                if (data.questType == 111) {
                    var reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", function () {
                        if ((!vo.isInActivity())) {
                            vo.showAcEndTip();
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
                    if (!vo.isInActivity()) {
                        goBtn.setGray(true);
                    }
                }
            }
        }
    };
    AcChaoTingViewTabScrollItem3.prototype.taskGoBtnHandler = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        if (!vo.isInActivity()) {
            vo.showAcEndTip();
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
    AcChaoTingViewTabScrollItem3.prototype.getTypeCode = function () {
        return this._code;
    };
    AcChaoTingViewTabScrollItem3.prototype.getSpaceY = function () {
        return 5;
    };
    AcChaoTingViewTabScrollItem3.prototype.dispose = function () {
        this._itemData = null;
        this._aid = null;
        this._code = null;
        this._vo = null;
        _super.prototype.dispose.call(this);
    };
    return AcChaoTingViewTabScrollItem3;
}(ScrollListItem));
__reflect(AcChaoTingViewTabScrollItem3.prototype, "AcChaoTingViewTabScrollItem3");
//# sourceMappingURL=AcChaoTingViewTabScrollItem3.js.map