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
 * 三国Item
 * author ycg
 * date 2020.1.14
 * @class AcThreekingdomsRechargeAchieveScrollItem
 */
var AcThreekingdomsRechargeAchieveScrollItem = (function (_super) {
    __extends(AcThreekingdomsRechargeAchieveScrollItem, _super);
    function AcThreekingdomsRechargeAchieveScrollItem() {
        return _super.call(this) || this;
    }
    AcThreekingdomsRechargeAchieveScrollItem.prototype.initItem = function (index, data, itemParam) {
        var aid = itemParam.aid;
        var code = itemParam.code;
        var id = itemParam.id;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
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
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acThreekingdomsRechargekillItemInfo-" + this.getTypeCode(code), [String(data.specialnum)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
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
        var progressBar = ComponentManager.getProgressBar("progress3", "progress3_bg", 375 - 20);
        progressBar.setPosition(rewardbg.x + 2, rewardbg.y + rewardbg.height + 32);
        this.addChild(progressBar);
        var percent = vo.getProcessNum() / data.specialnum;
        var textStr = LanguageManager.getlocal("acThreekingdomsRechargeKillProNum-" + this.getTypeCode(code), ["" + vo.getProcessNum(), "" + data.specialnum]);
        var textColor = TextFieldConst.COLOR_WHITE;
        progressBar.setPercentage(percent, textStr, textColor);
        if (vo.isGetAchieveRewardById(data.id)) {
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
                NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMSRECHARGE_REWARDS, { activeId: vo.aidAndCode, rkey: Number(data.id) });
            }, this);
            receiveBtn.setPosition(bg.x + bg.width - receiveBtn.width - 10, progressBar.y + progressBar.height / 2 - receiveBtn.height / 2);
            this.addChild(receiveBtn);
            if (vo.getProcessNum() >= data.specialnum) {
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
    AcThreekingdomsRechargeAchieveScrollItem.prototype.getTypeCode = function (code) {
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
    AcThreekingdomsRechargeAchieveScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcThreekingdomsRechargeAchieveScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcThreekingdomsRechargeAchieveScrollItem;
}(ScrollListItem));
__reflect(AcThreekingdomsRechargeAchieveScrollItem.prototype, "AcThreekingdomsRechargeAchieveScrollItem");
//# sourceMappingURL=AcThreekingdomsRechargeAchieveScrollItem.js.map