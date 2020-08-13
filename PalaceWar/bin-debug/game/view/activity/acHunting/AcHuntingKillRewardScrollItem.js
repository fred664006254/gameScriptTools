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
  * 东郊狩猎击杀奖励
  * author yangchengguo
  * date 2019.8.6
  * @class AcHuntingKillRewardScrollItem
  */
var AcHuntingKillRewardScrollItem = (function (_super) {
    __extends(AcHuntingKillRewardScrollItem, _super);
    function AcHuntingKillRewardScrollItem() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._aidAndCode = null;
        return _this;
    }
    /**
     * 初始化itemview
     */
    AcHuntingKillRewardScrollItem.prototype.initItem = function (index, data, itemParam) {
        this._itemData = data;
        this._aidAndCode = itemParam;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        var itembg = BaseBitmap.create("public_9_bg14");
        itembg.width = 520;
        this.addChild(itembg);
        var titleBg = BaseBitmap.create("common_titlebg");
        titleBg.y = 7;
        titleBg.x = 5;
        this.addChild(titleBg);
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("achuntingKillTitle_" + data.id + "-" + this._aidAndCode.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleBg.width = titleTF.width + 60;
        titleBg.height = 30;
        titleTF.setPosition(titleBg.x + 25, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        var rewardDesc = ComponentManager.getTextField(LanguageManager.getlocal("achuntingKillInfo_" + data.id + "-" + this._aidAndCode.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        rewardDesc.setPosition(titleBg.x + itembg.width / 2 - rewardDesc.width / 2, titleBg.y + titleBg.height + 3);
        this.addChild(rewardDesc);
        itembg.height += rewardDesc.height + 5;
        var rewards = this._itemData.getReward;
        var rewardVoList = GameData.formatRewardItem(rewards);
        var rewardScale = 0.83;
        var itemHeight = 0;
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
            rewardDB.setScale(rewardScale);
            rewardDB.setPosition(itembg.x + (i % 5) * (rewardDB.width * rewardScale + 10) + 15, rewardDesc.y + rewardDesc.height + 5 + Math.floor(i / 5) * (rewardDB.height * rewardScale + 15) + 10);
            this.addChild(rewardDB);
            itemHeight = rewardDB.height * rewardScale + 15;
        }
        var offsetH = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) * itemHeight;
        itembg.height += offsetH - 20;
        //进度条
        var progress = ComponentManager.getProgressBar("progress8", "progress3_bg", 320);
        itembg.height += progress.height + 25;
        progress.setPosition(itembg.x + 15, itembg.y + itembg.height - progress.height - 25);
        this.addChild(progress);
        var currBlood = vo.getBossRemainBloodById(data.id);
        if (this._aidAndCode.code == "4") {
            if (currBlood == 0) {
                currBlood = data.npcHp;
            }
            else if (currBlood == data.npcHp) {
                currBlood = 0;
            }
            else {
                currBlood = data.npcHp - currBlood;
            }
        }
        if (currBlood < 0) {
            currBlood = 0;
        }
        progress.setPercentage(currBlood / data.npcHp, LanguageManager.getlocal("achuntingKillBlood-" + this._aidAndCode.code, [String(currBlood), String(data.npcHp)]), TextFieldConst.COLOR_WHITE);
        this.height = itembg.height;
        if (vo.isGetKillRewardById(data.id)) {
            var reviceBM = BaseBitmap.create("collectflag");
            reviceBM.anchorOffsetX = reviceBM.width / 2;
            reviceBM.anchorOffsetY = reviceBM.height / 2;
            reviceBM.setScale(0.7);
            reviceBM.setPosition(itembg.x + itembg.width - reviceBM.width * 0.7 / 2 - 10, this.y + this.height - reviceBM.height * 0.7 / 2);
            this.addChild(reviceBM);
        }
        else {
            if (vo.getBossId() > data.id) {
                var reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", function () {
                    if ((!vo.isStart)) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                        return;
                    }
                    NetManager.request(NetRequestConst.REQUEST_ACTIVITY_KILLREWARD, { activeId: vo.aidAndCode, rkey: Number(data.id) });
                }, this);
                reviceBtn.setPosition(itembg.x + itembg.width - reviceBtn.width - 15, itembg.y + itembg.height - reviceBtn.height - 15);
                this.addChild(reviceBtn);
            }
            else {
                var chargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", function () {
                    if (vo.checkIsInEndShowTime() || (!vo.isStart)) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                        return;
                    }
                }, this);
                chargeBtn.setPosition(itembg.x + itembg.width - chargeBtn.width - 15, itembg.y + itembg.height - chargeBtn.height - 15);
                this.addChild(chargeBtn);
                chargeBtn.setGray(true);
            }
        }
    };
    AcHuntingKillRewardScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcHuntingKillRewardScrollItem.prototype.dispose = function () {
        this._itemData = null;
        _super.prototype.dispose.call(this);
    };
    return AcHuntingKillRewardScrollItem;
}(ScrollListItem));
__reflect(AcHuntingKillRewardScrollItem.prototype, "AcHuntingKillRewardScrollItem");
//# sourceMappingURL=AcHuntingKillRewardScrollItem.js.map