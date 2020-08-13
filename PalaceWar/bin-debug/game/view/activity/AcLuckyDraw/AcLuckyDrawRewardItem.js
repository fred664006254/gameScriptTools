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
 * 次数奖励Item
 * author 钱俊
 */
var AcLuckyDrawRewardItem = (function (_super) {
    __extends(AcLuckyDrawRewardItem, _super);
    function AcLuckyDrawRewardItem() {
        var _this = _super.call(this) || this;
        _this.itemParam = null;
        return _this;
    }
    Object.defineProperty(AcLuckyDrawRewardItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLuckyDrawRewardItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLuckyDrawRewardItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLuckyDrawRewardItem.prototype, "aid", {
        get: function () {
            return this.itemParam.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLuckyDrawRewardItem.prototype, "code", {
        get: function () {
            return this.itemParam.code;
        },
        enumerable: true,
        configurable: true
    });
    AcLuckyDrawRewardItem.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        // getReward
        // value
        //id
        this.itemParam = itemParam;
        this.width = 530;
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 524;
        bg.height = 140;
        this.addChild(bg);
        var titleBg = BaseLoadBitmap.create("countrywarrewardview_itembg");
        titleBg.width = 508;
        titleBg.height = 35;
        titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 10);
        this.addChild(titleBg);
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acLuckyDrawLuckyNumReward-" + this.code, [String(data.needNum)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        var itemTopLine = BaseBitmap.create("public_line3");
        itemTopLine.width += titleTF.width;
        itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
        this.addChild(itemTopLine);
        var rewardVoList = GameData.formatRewardItem(data.getReward);
        var scale = 0.85;
        var itemHeight = 0;
        var rewardbg = BaseBitmap.create("public_9_managebg");
        rewardbg.width = 502;
        rewardbg.setPosition(titleBg.x + titleBg.width / 2 - rewardbg.width / 2, titleBg.y + titleBg.height + 3);
        this.addChild(rewardbg);
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
            rewardDB.setScale(scale);
            rewardDB.setPosition(rewardbg.x + 5 + ((rewardDB.width - 8) * (i % 5)), rewardbg.y + 5 + ((rewardDB.height - 8) * Math.floor(i / 5)));
            this.addChild(rewardDB);
            itemHeight = rewardDB.height;
        }
        rewardbg.height = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) * itemHeight;
        bg.height += rewardbg.height;
        var progressBar = ComponentManager.getProgressBar("progress3", "progress3_bg", 375);
        progressBar.setPosition(rewardbg.x + 2, rewardbg.y + rewardbg.height + 32);
        this.addChild(progressBar);
        var percent = this.vo.getLuckyProgress() / data.needNum;
        var textStr = this.vo.getLuckyProgress() + "/" + data.needNum;
        var textColor = TextFieldConst.COLOR_WHITE;
        progressBar.setPercentage(percent, textStr, textColor);
        progressBar.scaleX = 0.95;
        var titelTxt = ComponentManager.getTextField(LanguageManager.getlocal("acWealthComingLuckRewardPopupViewItemProgress"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        titelTxt.setPosition(progressBar.x + progressBar.width / 2 - titelTxt.width / 2, progressBar.y - titelTxt.height - 5);
        this.addChild(titelTxt);
        if (this.vo.isGetJinduAward(data.id)) {
            var flagScale = 0.6;
            var flag = BaseBitmap.create("collectflag");
            flag.setScale(flagScale);
            flag.setPosition(bg.x + bg.width - flag.width * flagScale - 10, progressBar.y + progressBar.height / 2 - flag.height * flagScale / 2);
            this.addChild(flag);
        }
        else {
            var receiveBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, 'taskCollect', function () {
                if (_this.vo.isActyEnd()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                    return;
                }
                if (_this.vo.getLuckyProgress() < data.needNum) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acLuckyDrawTip2-" + _this.code));
                    return;
                }
                //领取奖励
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_LUCKYDRAWGETACHIRWD, {
                    activeId: _this.acTivityId,
                    idx: data.id + 1
                });
            }, this);
            receiveBtn.setPosition(bg.x + bg.width - receiveBtn.width - 10, progressBar.y + progressBar.height / 2 - receiveBtn.height / 2);
            this.addChild(receiveBtn);
            if (this.vo.getLuckyProgress() >= data.needNum) {
                App.CommonUtil.addIconToBDOC(receiveBtn);
                receiveBtn.setGray(this.vo.isActyEnd());
                if (this.vo.isActyEnd()) {
                    App.CommonUtil.removeIconFromBDOC(receiveBtn);
                }
            }
            else {
                receiveBtn.setGray(true);
            }
        }
        this.height = bg.height;
        if (this.itemParam.id == data.id) {
            var light = BaseBitmap.create("public_9_bg57");
            light.width = bg.width + 10;
            light.height = bg.height + 14;
            light.setPosition(bg.x - 6, bg.y - 6);
            this.addChild(light);
            egret.Tween.get(light, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
        }
    };
    AcLuckyDrawRewardItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcLuckyDrawRewardItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcLuckyDrawRewardItem;
}(ScrollListItem));
__reflect(AcLuckyDrawRewardItem.prototype, "AcLuckyDrawRewardItem");
//# sourceMappingURL=AcLuckyDrawRewardItem.js.map