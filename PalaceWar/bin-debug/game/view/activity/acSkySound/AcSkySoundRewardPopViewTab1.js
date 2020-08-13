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
 * 活动奖励
 * author wxz
 * date 2020.6.15
 * @class AcSkySoundRewardPopViewTab1
 */
var AcSkySoundRewardPopViewTab1 = (function (_super) {
    __extends(AcSkySoundRewardPopViewTab1, _super);
    function AcSkySoundRewardPopViewTab1() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._botTxt1 = null;
        _this._botTxt2 = null;
        _this._botTxt3 = null;
        _this.initView();
        return _this;
    }
    AcSkySoundRewardPopViewTab1.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACSKYSOUND_EXCHANGE, this.requestCallback, this);
        var rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 640;
        rewardBg.setPosition(25, 55);
        this.addChild(rewardBg);
        var bot = BaseBitmap.create("public_9_bg1");
        bot.width = 530;
        bot.height = 60;
        bot.x = rewardBg.x;
        bot.y = rewardBg.y + rewardBg.height + 5;
        this.addChild(bot);
        var dataList = this.vo.getSortExchangeCfg();
        var rect = new egret.Rectangle(0, 0, 530, 628);
        var scrollList = ComponentManager.getScrollList(AcSkySoundRewardTab1ScrollItem, dataList, rect, { aid: this.aid, code: this.code });
        scrollList.setPosition(25, 62);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        var nameArr = ["costSpecial2", "costSpecial4", "costSpecial8"];
        for (var i = 0; i < nameArr.length; i++) {
            var bgimg = BaseBitmap.create("public_9_resbg");
            bgimg.width = 120;
            if (i == 0) {
                bgimg.x = bot.x + 20;
                bgimg.y = bot.y + bot.height / 2 - bgimg.height / 2;
                this.addChild(bgimg);
                var img = BaseBitmap.create("acskysound_yf1-1");
                img.setScale(0.5);
                img.x = bgimg.x;
                img.y = bgimg.y + bgimg.height / 2 - img.height * img.scaleY / 2;
                this.addChild(img);
                this._botTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acskysound_numtxt", ["0"]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
                this._botTxt1.x = bgimg.x + 50;
                this._botTxt1.y = bgimg.y + bgimg.height / 2 - this._botTxt1.height / 2;
                this.addChild(this._botTxt1);
            }
            else if (i == 1) {
                bgimg.x = bot.x + bot.width / 2 - bgimg.width / 2;
                bgimg.y = bot.y + bot.height / 2 - bgimg.height / 2;
                this.addChild(bgimg);
                var img = BaseBitmap.create("acskysound_yf2-1");
                img.setScale(0.5);
                img.x = bgimg.x;
                img.y = bgimg.y + bgimg.height / 2 - img.height * img.scaleY / 2;
                this.addChild(img);
                this._botTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acskysound_numtxt", ["0"]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
                this._botTxt2.x = bgimg.x + 50;
                this._botTxt2.y = bgimg.y + bgimg.height / 2 - this._botTxt2.height / 2;
                this.addChild(this._botTxt2);
            }
            else if (i == 2) {
                bgimg.x = bot.x + bot.width - bgimg.width - 20;
                bgimg.y = bot.y + bot.height / 2 - bgimg.height / 2;
                this.addChild(bgimg);
                var img = BaseBitmap.create("acskysound_yf3-1");
                img.setScale(0.5);
                img.x = bgimg.x;
                img.y = bgimg.y + bgimg.height / 2 - img.height * img.scaleY / 2;
                this.addChild(img);
                this._botTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acskysound_numtxt", ["0"]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
                this._botTxt3.x = bgimg.x + 50;
                this._botTxt3.y = bgimg.y + bgimg.height / 2 - this._botTxt3.height / 2;
                this.addChild(this._botTxt3);
            }
        }
        this.refreshView();
    };
    AcSkySoundRewardPopViewTab1.prototype.requestCallback = function (event) {
        var rData = event.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var replacerewards = rData.replacerewards;
        if (replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
        }
        var rewards = rData.rewards;
        if (rData.specialGift) {
            rewards = "1058_0_" + rData.specialGift + "_" + this.code + "|" + rewards;
        }
        var rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
    };
    AcSkySoundRewardPopViewTab1.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        var dataList = this.vo.getSortExchangeCfg();
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code });
        var num = this.vo.getSpecialNum("costSpecial2");
        this._botTxt1.text = LanguageManager.getlocal("acskysound_numtxt", [String(num)]);
        num = this.vo.getSpecialNum("costSpecial4");
        this._botTxt2.text = LanguageManager.getlocal("acskysound_numtxt", [String(num)]);
        num = this.vo.getSpecialNum("costSpecial8");
        this._botTxt3.text = LanguageManager.getlocal("acskysound_numtxt", [String(num)]);
    };
    Object.defineProperty(AcSkySoundRewardPopViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSkySoundRewardPopViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcSkySoundRewardPopViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACSKYSOUND_EXCHANGE, this.requestCallback, this);
        this._scrollList = null;
        this._botTxt1 = null;
        this._botTxt2 = null;
        this._botTxt3 = null;
        _super.prototype.dispose.call(this);
    };
    return AcSkySoundRewardPopViewTab1;
}(AcCommonViewTab));
__reflect(AcSkySoundRewardPopViewTab1.prototype, "AcSkySoundRewardPopViewTab1");
//# sourceMappingURL=AcSkySoundRewardPopViewTab1.js.map