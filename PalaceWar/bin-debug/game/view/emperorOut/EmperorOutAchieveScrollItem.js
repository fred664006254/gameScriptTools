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
 * 奖励Item
 * author yangchengguo
 * date 2019.9.5
 * @class EmperorOutAchieveScrollItem
 */
var EmperorOutAchieveScrollItem = (function (_super) {
    __extends(EmperorOutAchieveScrollItem, _super);
    function EmperorOutAchieveScrollItem() {
        return _super.call(this) || this;
    }
    EmperorOutAchieveScrollItem.prototype.initItem = function (index, data, itemParam) {
        var id = itemParam.id;
        var uid = itemParam.uid;
        var isAuthor = itemParam.isAuthor;
        App.LogUtil.log("EmperorOutAchieveScrollItem: " + uid);
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
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutAchieveItemInfo", [String(data.needPopularity)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
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
            rewardDB.setPosition(rewardbg.x + 5 + ((rewardDB.width - 8) * (i % 5)), rewardbg.y + 10 + ((rewardDB.height - 8) * Math.floor(i / 5)));
            this.addChild(rewardDB);
            itemHeight = rewardDB.height;
        }
        rewardbg.height = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) * itemHeight;
        bg.height += rewardbg.height;
        var progressBar = ComponentManager.getProgressBar("progress3", "progress3_bg", 375);
        progressBar.setPosition(rewardbg.x + 2, rewardbg.y + rewardbg.height + 32);
        this.addChild(progressBar);
        var currScore = Api.emperorAchieveVoApi.getCurrPopularByuid(uid);
        var percent = currScore / data.needPopularity;
        var textStr = LanguageManager.getlocal("emperorOutViewCurrScore", ["" + currScore, "" + data.needPopularity]);
        var textColor = TextFieldConst.COLOR_WHITE;
        progressBar.setPercentage(percent, textStr, textColor);
        var titelTxt = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutAchieveCurrProgress"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        titelTxt.setPosition(progressBar.x + progressBar.width / 2 - titelTxt.width / 2, progressBar.y - titelTxt.height - 5);
        this.addChild(titelTxt);
        // let status = vo.getAchievementStatusById(data.id);
        if (Api.emperorAchieveVoApi.isGetPopularReward(uid, data.id)) {
            var flagScale = 0.6;
            var flag = BaseBitmap.create("collectflag");
            flag.setScale(flagScale);
            flag.setPosition(bg.x + bg.width - flag.width * flagScale - 10, progressBar.y + progressBar.height / 2 - flag.height * flagScale / 2);
            this.addChild(flag);
        }
        else {
            var receiveBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, 'taskCollect', function () {
                var outData = Api.emperorAchieveVoApi.getOutDataByuid(uid);
                if (!outData || !Api.emperorAchieveVoApi.isInOuting(outData.st)) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("emperorOutListEnd"));
                    return;
                }
                if (Api.emperorAchieveVoApi.isFirstSendWordByUid(uid)) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("emperorOutAchieveGetRewardTip"));
                    return;
                }
                NetManager.request(NetRequestConst.REQUEST_EMPERORACHIEVE_GETPOPULARRWD, { fuid: uid, rkey: data.id });
            }, this);
            receiveBtn.setPosition(bg.x + bg.width - receiveBtn.width, progressBar.y + progressBar.height / 2 - receiveBtn.height / 2);
            this.addChild(receiveBtn);
            var currPopular = Api.emperorAchieveVoApi.getCurrPopularByuid(uid);
            if (data.needPopularity <= currPopular) {
                receiveBtn.setEnable(true);
                if (Api.emperorAchieveVoApi.isFirstSendWordByUid(uid)) {
                    receiveBtn.setGray(true);
                }
                else {
                    receiveBtn.setGray(false);
                }
            }
            else {
                receiveBtn.setEnable(false);
            }
        }
        this.height = bg.height;
        if (id == data.id) {
            var light = BaseBitmap.create("public_9_bg57");
            light.width = bg.width + 12;
            light.height = bg.height + 16;
            light.setPosition(bg.x - 6, bg.y - 8);
            this.addChild(light);
            egret.Tween.get(light, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
        }
    };
    EmperorOutAchieveScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    EmperorOutAchieveScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return EmperorOutAchieveScrollItem;
}(ScrollListItem));
__reflect(EmperorOutAchieveScrollItem.prototype, "EmperorOutAchieveScrollItem");
//# sourceMappingURL=EmperorOutAchieveScrollItem.js.map