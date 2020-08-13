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
  * 中秋活动奖励查看的弹板
  * @author 张朝阳
  * date 2019/6/27
  * @class AcWealthCarpLotteryRewardsPopupView
  */
var AcWealthCarpLotteryRewardsPopupView = (function (_super) {
    __extends(AcWealthCarpLotteryRewardsPopupView, _super);
    function AcWealthCarpLotteryRewardsPopupView() {
        var _this = _super.call(this) || this;
        _this._scollList = null;
        _this.aid = null;
        _this.code = null;
        _this.rankList = null;
        _this._isQualification = false;
        _this._countDownTime = null;
        _this._data = null;
        return _this;
    }
    AcWealthCarpLotteryRewardsPopupView.prototype.initView = function () {
        var _this = this;
        var rewards = this.param.data.rewards;
        this.aid = this.param.data.aid;
        this.code = this.param.data.code;
        this.rankList = this.param.data.luckyinfo;
        this._isQualification = this.param.data.isQualification;
        // this._data = this.param.data.data;
        for (var i = 0; i < this.rankList.length; i++) {
            if (this.rankList[i].lucky == 1) {
                this._data = this.rankList[i];
                break;
            }
        }
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var bgContainer = new BaseDisplayObjectContainer();
        bgContainer.width = 544;
        bgContainer.height = 396;
        bgContainer.setPosition(this.viewBg.x + this.viewBg.width / 2 - bgContainer.width / 2, 0);
        this.addChildToContainer(bgContainer);
        bgContainer.mask = new egret.Rectangle(0, 0, 544, 392);
        var bg = BaseLoadBitmap.create("acwealthcarpview_common_lotterybg");
        bg.width = 544;
        bg.height = 396;
        bgContainer.addChild(bg);
        if (vo.checkIsInEndShowTime()) {
            if (this._data && this._data.pic) {
                var picId = this._data.level;
                // if(this._data.title){
                // 	let info = App.CommonUtil.getTitleData(this._data.title);
                // 	if(info.title != ``){
                // 		picId = info.title;
                // 	}
                // }
                var player = Api.playerVoApi.getPlayerPortrait(Number(picId), this._data.pic);
                player.setPosition(0, bg.y + 20);
                bgContainer.addChild(player);
            }
            else {
                var personBM = BaseLoadBitmap.create("acwealthcarpview_common_bady");
                personBM.width = 291;
                personBM.height = 357;
                personBM.setPosition(0, bg.y + bg.height - personBM.height);
                bgContainer.addChild(personBM);
            }
        }
        else {
            var personBM = BaseLoadBitmap.create("acwealthcarpview_common_bady");
            personBM.width = 291;
            personBM.height = 357;
            personBM.setPosition(0, bg.y + bg.height - personBM.height);
            bgContainer.addChild(personBM);
        }
        // 225 180
        var descBg = BaseBitmap.create("specialview_commoni_namebg");
        descBg.width = 225;
        descBg.height = 180;
        descBg.setPosition(bg.x + bg.width - descBg.width, bg.y + 70);
        bgContainer.addChild(descBg);
        var qualificationStr = this._isQualification ? LanguageManager.getlocal("acWealthCarpLotteryRewardsPopupViewQualification-" + this.code) : LanguageManager.getlocal("acWealthCarpLotteryRewardsPopupViewUnQualification-" + this.code);
        var qualificationTF = ComponentManager.getTextField(qualificationStr, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WHITE);
        qualificationTF.textAlign = egret.HorizontalAlign.CENTER;
        qualificationTF.setPosition(descBg.x + descBg.width / 2 - qualificationTF.width / 2, descBg.y + 20);
        bgContainer.addChild(qualificationTF);
        var lotteryTF = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpLotteryRewardsPopupViewLotteryNum-" + this.code, [String(this.rankList.length ? this.rankList.length : 0)]), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WHITE);
        lotteryTF.textAlign = egret.HorizontalAlign.CENTER;
        lotteryTF.setPosition(descBg.x + descBg.width / 2 - lotteryTF.width / 2, descBg.y + 110);
        bgContainer.addChild(lotteryTF);
        var rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acWealthCarpLotteryRewardsPopupViewRankBtn-" + this.code, function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACWEALTHCARPRANKPOPUPVIEW, { aid: _this.aid, code: _this.code, rewards: rewards, luckyinfo: _this.rankList });
        }, this);
        rankBtn.setPosition(descBg.x + descBg.width / 2 - rankBtn.width / 2, bg.y + bg.height - rankBtn.height - 15);
        bgContainer.addChild(rankBtn);
        var toptip = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpViewRankPopupViewTopTip-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        toptip.setPosition(this.viewBg.x + this.viewBg.width / 2 - toptip.width / 2, bgContainer.y + bgContainer.height + 10);
        this.addChildToContainer(toptip);
        var rewardbg = BaseBitmap.create("public_9_bg4");
        rewardbg.width = 530;
        rewardbg.height = 205;
        rewardbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - rewardbg.width / 2, toptip.y + toptip.height + 5);
        this.addChildToContainer(rewardbg);
        var emptybg = BaseLoadBitmap.create("acwealthcarpview_10emptybg");
        emptybg.width = 503;
        emptybg.height = 186;
        emptybg.setPosition(rewardbg.x + rewardbg.width / 2 - emptybg.width / 2, rewardbg.y + rewardbg.height / 2 - emptybg.height / 2);
        this.addChildToContainer(emptybg);
        var rewardVoList = GameData.formatRewardItem(rewards);
        var rewardScale = 0.85;
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
            rewardDB.setScale(rewardScale);
            rewardDB.setPosition(emptybg.x + (i % 5) * (rewardDB.width * rewardScale + 10) + 3, emptybg.y + Math.floor(i / 5) * (rewardDB.height * rewardScale + 4));
            this.addChildToContainer(rewardDB);
        }
        var txtbg = BaseBitmap.create("public_itemtipbg2");
        this.addChildToContainer(txtbg);
        // 153
        if (!vo.checkIsInEndShowTime()) {
            this._countDownTime = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpLotteryRewardsPopupViewCountDown-" + this.code, [vo.acCountDown]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_RED);
            this._countDownTime.setPosition(153 - this._countDownTime.width / 2 + GameData.popupviewOffsetX, bgContainer.y + bgContainer.height - 23 - this._countDownTime.height / 2);
            this.addChildToContainer(this._countDownTime);
            txtbg.width = 72 + this._countDownTime.width;
            txtbg.setPosition(this._countDownTime.x + this._countDownTime.width / 2 - txtbg.width / 2, this._countDownTime.y + this._countDownTime.height / 2 - txtbg.height / 2);
        }
        else {
            var nameStr = "";
            if (this._data && this._data.pic) {
                nameStr = this._data.name;
                ;
            }
            else {
                nameStr = LanguageManager.getlocal("acWealthCarpRankPopupViewNoBigReward-" + this.code);
            }
            var bigRewardTF = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpRankPopupViewBigReward-" + this.code, [nameStr]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            bigRewardTF.setPosition(153 - bigRewardTF.width / 2, bgContainer.y + bgContainer.height - 23 - bigRewardTF.height / 2);
            this.addChildToContainer(bigRewardTF);
            txtbg.width = 72 + bigRewardTF.width;
            txtbg.setPosition(bigRewardTF.x + bigRewardTF.width / 2 - txtbg.width / 2, bigRewardTF.y + bigRewardTF.height / 2 - txtbg.height / 2);
        }
    };
    AcWealthCarpLotteryRewardsPopupView.prototype.tick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (this._countDownTime) {
            if (vo.checkIsInEndShowTime()) {
                this._countDownTime.text = LanguageManager.getlocal("acWealthCarpLotteryRewardsPopupViewRefreshView-" + this.code);
            }
            else {
                this._countDownTime.text = LanguageManager.getlocal("acWealthCarpLotteryRewardsPopupViewCountDown-" + this.code, [vo.acCountDown]);
            }
            this._countDownTime.x = 153 - this._countDownTime.width / 2 + GameData.popupviewOffsetX;
        }
    };
    AcWealthCarpLotteryRewardsPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "specialview_commoni_namebg"
        ]);
    };
    AcWealthCarpLotteryRewardsPopupView.prototype.getTitleStr = function () {
        return "acWealthCarpLotteryRewardsPopupViewTitle-" + this.param.data.code;
    };
    AcWealthCarpLotteryRewardsPopupView.prototype.dispose = function () {
        this._scollList = null;
        this.aid = null;
        this.code = null;
        this.rankList = null;
        this._isQualification = false;
        this._countDownTime = null;
        this._data = null;
        _super.prototype.dispose.call(this);
    };
    return AcWealthCarpLotteryRewardsPopupView;
}(PopupView));
__reflect(AcWealthCarpLotteryRewardsPopupView.prototype, "AcWealthCarpLotteryRewardsPopupView");
//# sourceMappingURL=AcWealthCarpLotteryRewardsPopupView.js.map