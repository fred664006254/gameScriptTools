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
  * 赵云排行榜Tab2
  * author 张朝阳
  * date 2018/7/10
  * @class AcMazeRankPopupViewTab2
  */
var AcMazeRankPopupViewTab2 = (function (_super) {
    __extends(AcMazeRankPopupViewTab2, _super);
    function AcMazeRankPopupViewTab2() {
        var _this = _super.call(this) || this;
        _this._rewardAcTimeTF = null;
        _this._buttomBg = null;
        _this._rewardMyRankTF = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcMazeRankPopupViewTab2.prototype, "cfg", {
        /**
         * 配置文件数据
         */
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcMazeView.AID, AcMazeView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMazeRankPopupViewTab2.prototype, "vo", {
        /**
         * 服务器返回数据
         */
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcMazeView.AID, AcMazeView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    AcMazeRankPopupViewTab2.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZERANK, this.rankClickHandler, this);
        TickManager.addTick(this.tick, this);
        var rewardList = this.cfg.rankReward;
        var rewardRect = new egret.Rectangle(0, 0, 516, 520);
        var rewardScrollList = ComponentManager.getScrollList(AcMazeRankRewardScrollItem, rewardList, rewardRect);
        rewardScrollList.setPosition(30, 55);
        this.addChild(rewardScrollList);
        this._buttomBg = BaseBitmap.create("public_9_probiginnerbg");
        this._buttomBg.width = 516;
        this._buttomBg.height = 112;
        this._buttomBg.setPosition(rewardScrollList.x, rewardScrollList.y + rewardScrollList.height + 10);
        this.addChild(this._buttomBg);
        this._rewardMyRankTF = ComponentManager.getTextField(LanguageManager.getlocal("rankorder2", [LanguageManager.getlocal("atkracedes4")]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._rewardMyRankTF.setPosition(this._buttomBg.x + 30, this._buttomBg.y + 15);
        this.addChild(this._rewardMyRankTF);
        // 活动倒计时 
        this._rewardAcTimeTF = ComponentManager.getTextField(LanguageManager.getlocal("acFourPeople_acCD"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._rewardAcTimeTF.setPosition(this._buttomBg.x + this._buttomBg.width - this._rewardAcTimeTF.width - 10, this._rewardMyRankTF.y);
        this.addChild(this._rewardAcTimeTF);
        // 奖励发送 
        var rewardMailTF = ComponentManager.getTextField(LanguageManager.getlocal("acRanktip3"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        if (PlatformManager.checkIsEnLang()) {
            rewardMailTF.textAlign = egret.HorizontalAlign.CENTER;
        }
        rewardMailTF.setPosition(this._buttomBg.x + this._buttomBg.width / 2 - rewardMailTF.width / 2, this._buttomBg.y + this._buttomBg.height - rewardMailTF.height - 10);
        this.addChild(rewardMailTF);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETMAZERANK, { "activeId": AcMazeView.ACTIVEID });
        this.tick();
    };
    /**
     * 时间倒计时
     */
    AcMazeRankPopupViewTab2.prototype.tick = function () {
        var cfg = this.cfg;
        var deltaT = this.vo.et - GameData.serverTime - 86400 * 1;
        if (this._rewardAcTimeTF && deltaT > 0) {
            this._rewardAcTimeTF.text = LanguageManager.getlocal("acFourPeople_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
            this._rewardAcTimeTF.setPosition(this._buttomBg.x + this._buttomBg.width - this._rewardAcTimeTF.width - 10, this._rewardMyRankTF.y);
            return true;
        }
        else {
            this._rewardAcTimeTF.text = LanguageManager.getlocal("acFourPeople_acCD", [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
            this._rewardAcTimeTF.setPosition(this._buttomBg.x + this._buttomBg.width - this._rewardAcTimeTF.width - 10, this._rewardMyRankTF.y);
        }
        return false;
    };
    AcMazeRankPopupViewTab2.prototype.rankClickHandler = function (event) {
        var data = event.data.data.data;
        var myRank = data.myrankArr.myrank;
        var str;
        if (myRank == null) {
            str = LanguageManager.getlocal("atkracedes4");
        }
        else if (myRank > 10000) {
            str = "10000+";
        }
        else {
            str = myRank;
        }
        this._rewardMyRankTF.text = LanguageManager.getlocal("rankorder2", [str]);
    };
    AcMazeRankPopupViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZERANK, this.rankClickHandler, this);
        TickManager.removeTick(this.tick, this);
        this._rewardAcTimeTF = null;
        this._buttomBg = null;
        this._rewardAcTimeTF = null;
        _super.prototype.dispose.call(this);
    };
    return AcMazeRankPopupViewTab2;
}(AcCommonViewTab));
__reflect(AcMazeRankPopupViewTab2.prototype, "AcMazeRankPopupViewTab2");
//# sourceMappingURL=AcMazeRankPopupViewTab2.js.map