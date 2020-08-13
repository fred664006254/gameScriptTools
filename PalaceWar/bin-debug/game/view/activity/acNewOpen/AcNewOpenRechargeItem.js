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
var AcNewOpenRechargeItem = (function (_super) {
    __extends(AcNewOpenRechargeItem, _super);
    function AcNewOpenRechargeItem() {
        var _this = _super.call(this) || this;
        _this._code = null;
        return _this;
    }
    Object.defineProperty(AcNewOpenRechargeItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewOpenRechargeItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewOpenRechargeItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewOpenRechargeItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_NEWOPEN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewOpenRechargeItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcNewOpenRechargeItem.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcNewOpenRechargeItem.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        this._code = itemParam;
        var bg = BaseBitmap.create("public_scrollitembg");
        bg.x = GameConfig.stageWidth / 2 - bg.width / 2;
        bg.height = 210;
        this.addChild(bg);
        var titleBg = BaseBitmap.create("acnewopen_reward_title-" + this.getTypeCode());
        this.addChild(titleBg);
        titleBg.x = bg.x + bg.width / 2 - titleBg.width / 2;
        bg.y = titleBg.y + 13;
        var titleTxtStr = LanguageManager.getlocal("acNewOpenType2", ["" + data.needGem]);
        var titleTxt = ComponentManager.getTextField(titleTxtStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        titleTxt.x = bg.x + bg.width / 2 - titleTxt.width / 2;
        titleTxt.y = titleBg.y + 14;
        this.addChild(titleTxt);
        var str = "1053_0_" + data.specialGift + "_" + this.getTypeCode() + "|" + data.getReward;
        var rewardIconList = GameData.getRewardItemIcons(str, true, false);
        var scale = 0.9;
        var itemHeight = 108;
        var itemWidth = 108;
        var spaceX = 10;
        var spaceY = 10;
        var stX = bg.x + 36;
        var stY = bg.y + 45;
        var offHeight = 85;
        var rewardBg = BaseBitmap.create("public_scrolllistbg");
        rewardBg.width = bg.width - 40;
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
        var times = data.maxNum - this.vo.isGetRecharge(data.id);
        var timestr = times > 0 ? LanguageManager.getlocal("acDuanWuBuyTaskTimes", [String(times), String(data.maxNum)]) : LanguageManager.getlocal("acDuanWuBuyTaskTimes2", [String(0), String(data.maxNum)]);
        //进度条
        var progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 385);
        progress.setPosition(bg.x + 15, bg.y + bg.height - progress.height - 15);
        this.addChild(progress);
        var currNum = this.vo.getChargeNum() - this.vo.isGetRecharge(data.id) * data.needGem;
        if (currNum > data.needGem || this.vo.isGetRecharge(data.id) >= data.maxNum) {
            currNum = data.needGem;
        }
        var progressStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acLotusDetailProcessNum", this.getTypeCode()), [String(currNum), String(data.needGem)]);
        progress.setPercentage(currNum / data.needGem, progressStr, TextFieldConst.COLOR_WHITE);
        var timesText = ComponentManager.getTextField(timestr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        timesText.setPosition(progress.x + progress.width / 2 - timesText.width / 2, rewardBg.y + rewardBg.height + 15);
        this.addChild(timesText);
        if (this.vo.isGetRecharge(data.id) >= data.maxNum) {
            var reviceBM = BaseBitmap.create("collectflag");
            reviceBM.anchorOffsetX = reviceBM.width / 2;
            reviceBM.anchorOffsetY = reviceBM.height / 2;
            reviceBM.setScale(0.7);
            reviceBM.setPosition(bg.x + bg.width - reviceBM.width * 0.7 / 2 - 10, bg.y + bg.height - reviceBM.height * 0.7 / 2);
            this.addChild(reviceBM);
        }
        else {
            if (currNum < data.needGem) {
                var reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_RED, "taskGoBtn", function () {
                    if ((!_this.vo.isStart)) {
                        _this.vo.showAcEndTip();
                        return;
                    }
                    if (!_this.vo.isInActivity()) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                        return;
                    }
                    ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
                }, this);
                reviceBtn.setPosition(bg.x + bg.width - reviceBtn.width - 15, bg.y + bg.height - reviceBtn.height - 15);
                this.addChild(reviceBtn);
            }
            else {
                var reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "taskCollect", function () {
                    if ((!_this.vo.isStart)) {
                        _this.vo.showAcEndTip();
                        return;
                    }
                    _this.vo.lastidx = data.id;
                    NetManager.request(NetRequestConst.REQUEST_ACTIVITY_NEWOPENRINFOREWARDS, { activeId: _this.vo.aidAndCode, rkey: data.id });
                }, this);
                reviceBtn.setPosition(bg.x + bg.width - reviceBtn.width - 15, bg.y + bg.height - reviceBtn.height - 15);
                this.addChild(reviceBtn);
            }
        }
    };
    AcNewOpenRechargeItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcNewOpenRechargeItem.prototype.dispose = function () {
        this._code = null;
        _super.prototype.dispose.call(this);
    };
    return AcNewOpenRechargeItem;
}(ScrollListItem));
__reflect(AcNewOpenRechargeItem.prototype, "AcNewOpenRechargeItem");
//# sourceMappingURL=AcNewOpenRechargeItem.js.map