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
 * 巾帼英雄进度item
 * author ycg
 * date 2019.11.11
 * @class AcHeroineAchievementScrollItem
 */
var AcHeroineAchievementScrollItem = (function (_super) {
    __extends(AcHeroineAchievementScrollItem, _super);
    function AcHeroineAchievementScrollItem() {
        return _super.call(this) || this;
    }
    AcHeroineAchievementScrollItem.prototype.initItem = function (index, data, itemParam) {
        var aid = itemParam.aid;
        var code = itemParam.code;
        var id = itemParam.id;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
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
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acHeroineFightRewardInfo-" + this.getTypeCode(code), [String(data.ratetime)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
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
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true);
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
        progressBar.scaleX = 0.95;
        var currRate = vo.getScore() / cfg.totalHP;
        if (currRate > 1) {
            currRate = 1;
        }
        var textStr = LanguageManager.getlocal("acHeroineFightRewardProgressNum-" + this.getTypeCode(code), ["" + (currRate * 100).toFixed(0), "" + data.ratetime]);
        var textColor = TextFieldConst.COLOR_WHITE;
        var perRate = currRate * 100 / data.ratetime;
        progressBar.setPercentage(perRate, textStr, textColor);
        if (vo.isGetAchievementById(data.id)) {
            var flagScale = 0.6;
            var flag = BaseBitmap.create("collectflag");
            flag.setScale(flagScale);
            flag.setPosition(bg.x + bg.width - flag.width * flagScale - 10, progressBar.y + progressBar.height / 2 - flag.height * flagScale / 2);
            this.addChild(flag);
        }
        else {
            var receiveBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, 'taskCollect', function () {
                if (!vo.isStart) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                    return;
                }
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACHEROINE_PLAYSTORY, { id: data.id });
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_HEROINE_GETREWARD, { activeId: vo.aidAndCode, rkey: Number(data.id) });
            }, this);
            receiveBtn.setPosition(bg.x + bg.width - receiveBtn.width - 10, progressBar.y + progressBar.height / 2 - receiveBtn.height / 2);
            this.addChild(receiveBtn);
            var currRate_1 = vo.getScore() * 100 / cfg.totalHP;
            if (currRate_1 >= data.ratetime) {
                receiveBtn.setEnable(true);
            }
            else {
                receiveBtn.setEnable(false);
            }
        }
        this.height = bg.height;
        if (id == data.id) {
            var light = BaseBitmap.create("public_9_bg57");
            light.width = bg.width + 10;
            light.height = bg.height + 14;
            light.setPosition(bg.x - 6, bg.y - 6);
            this.addChild(light);
            egret.Tween.get(light, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
        }
    };
    AcHeroineAchievementScrollItem.prototype.getTypeCode = function (code) {
        if (code == "2") {
            return "1";
        }
        else if (code == "4") {
            return "3";
        }
        else if (code == "6") {
            return "5";
        }
        else if (code == "8") {
            return "7";
        }
        else if (code == "10") {
            return "9";
        }
        return code;
    };
    AcHeroineAchievementScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcHeroineAchievementScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcHeroineAchievementScrollItem;
}(ScrollListItem));
__reflect(AcHeroineAchievementScrollItem.prototype, "AcHeroineAchievementScrollItem");
//# sourceMappingURL=AcHeroineAchievementScrollItem.js.map