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
  * 马超排行榜Tab2
  * author 张朝阳
  * date 2019/1/14
  * @class AcMaChaoRankPopupViewTab2
  */
var AcMaChaoRankPopupViewTab2 = (function (_super) {
    __extends(AcMaChaoRankPopupViewTab2, _super);
    function AcMaChaoRankPopupViewTab2() {
        var _this = _super.call(this) || this;
        _this._rewardAcTimeTF = null;
        _this._buttomBg = null;
        _this._rewardMyRankTF = null;
        egret.callLater(_this.initView, _this);
        return _this;
    }
    AcMaChaoRankPopupViewTab2.prototype.initView = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var rewardList = cfg.rankItemListCfg;
        var buttomBg = BaseBitmap.create("public_9_probiginnerbg");
        buttomBg.width = 524;
        buttomBg.height = 520;
        buttomBg.setPosition(24, 55);
        this.addChild(buttomBg);
        var rewardRect = new egret.Rectangle(0, 0, 516, 510);
        var rewardScrollList = ComponentManager.getScrollList(AcMaChaoRankRewardScrollItem, rewardList, rewardRect);
        rewardScrollList.setPosition(buttomBg.x + 4, buttomBg.y + 5);
        this.addChild(rewardScrollList);
        this._buttomBg = BaseBitmap.create("public_9_bg1");
        this._buttomBg.width = 516;
        this._buttomBg.height = 105;
        this._buttomBg.setPosition(rewardScrollList.x, rewardScrollList.y + rewardScrollList.height + 10);
        this.addChild(this._buttomBg);
        // 我的排名 rankorder2
        var rankStr = "";
        var myRank = this.param.data.rankData.myrankArr.myrank;
        if (myRank && myRank <= 100) {
            rankStr = LanguageManager.getlocal("acMaChaoRankPopupViewTab2Rank-" + this.code, [myRank]);
        }
        else {
            rankStr = LanguageManager.getlocal("acMaChaoRankPopupViewTab2Rank-" + this.code, [LanguageManager.getlocal("acMaChaoRankPopupViewTab2Unrank-" + this.code)]);
        }
        this._rewardMyRankTF = ComponentManager.getTextField(rankStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._rewardMyRankTF.setPosition(this._buttomBg.x + 30, this._buttomBg.y + 15);
        this.addChild(this._rewardMyRankTF);
        // 活动倒计时 
        this._rewardAcTimeTF = ComponentManager.getTextField(LanguageManager.getlocal("acMaChaoRankPopupViewTab2Time-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._rewardAcTimeTF.setPosition(this._buttomBg.x + this._buttomBg.width - this._rewardAcTimeTF.width - 30, this._rewardMyRankTF.y);
        this.addChild(this._rewardAcTimeTF);
        // 奖励发送 
        var rewardMailTF = ComponentManager.getTextField(LanguageManager.getlocal("acMaChaoRankPopupViewTab2Tip-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        rewardMailTF.textAlign = egret.HorizontalAlign.CENTER;
        rewardMailTF.setPosition(this._buttomBg.x + this._buttomBg.width / 2 - rewardMailTF.width / 2, this._rewardAcTimeTF.y + this._rewardAcTimeTF.height + 15);
        this.addChild(rewardMailTF);
        TickManager.addTick(this.tick, this);
        this.tick();
    };
    /**
     * 时间倒计时
     */
    AcMaChaoRankPopupViewTab2.prototype.tick = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var deltaT = vo.et - GameData.serverTime - 86400 * 1;
        if (this._rewardAcTimeTF && (!vo.checkIsInEndShowTime())) {
            this._rewardAcTimeTF.text = LanguageManager.getlocal("acMaChaoRankPopupViewTab2Time-" + this.code, [App.DateUtil.getFormatBySecond(deltaT, 1)]);
            this._rewardAcTimeTF.setPosition(this._buttomBg.x + this._buttomBg.width - this._rewardAcTimeTF.width - 30, this._rewardMyRankTF.y);
        }
        else {
            this._rewardAcTimeTF.text = LanguageManager.getlocal("acMaChaoRankPopupViewTab2Time-" + this.code, [LanguageManager.getlocal("acMaChaoRankPopupViewTab2TimeEnd-" + this.code)]);
            this._rewardAcTimeTF.setPosition(this._buttomBg.x + this._buttomBg.width - this._rewardAcTimeTF.width - 30, this._rewardMyRankTF.y);
        }
    };
    AcMaChaoRankPopupViewTab2.prototype.dispose = function () {
        TickManager.removeTick(this.tick, this);
        this._rewardAcTimeTF = null;
        this._buttomBg = null;
        this._rewardAcTimeTF = null;
        _super.prototype.dispose.call(this);
    };
    return AcMaChaoRankPopupViewTab2;
}(AcCommonViewTab));
__reflect(AcMaChaoRankPopupViewTab2.prototype, "AcMaChaoRankPopupViewTab2");
//# sourceMappingURL=AcMaChaoRankPopupViewTab2.js.map