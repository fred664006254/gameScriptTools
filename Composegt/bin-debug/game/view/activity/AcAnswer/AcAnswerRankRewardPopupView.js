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
 * @class AcAnswerRankRewardPopupView
 */
var AcAnswerRankRewardPopupView = (function (_super) {
    __extends(AcAnswerRankRewardPopupView, _super);
    function AcAnswerRankRewardPopupView() {
        var _this = _super.call(this) || this;
        _this._acCDTxt = null;
        _this._merank = 0;
        _this._mepoint = 0;
        _this._rankInfo = 0;
        _this._aid = '';
        _this._code = '';
        return _this;
    }
    AcAnswerRankRewardPopupView.prototype.initView = function () {
        this._aid = this.param.data.aid;
        this._code = this.param.data.code;
        this._acVo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        // let contentBg = BaseBitmap.create("public_tc_bg01");
        // contentBg.width = 540;
        // contentBg.height = 700;
        // contentBg.x = this.viewBg.width / 2 - contentBg.width / 2;
        // contentBg.y = 45;
        // this.addChildToContainer(contentBg);
        var dataList = new Array();
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        var _len = cfg.totalRanking.length;
        if (!_len)
            _len = 9;
        for (var index = 0; index < _len; index++) {
            dataList.push(cfg.totalRanking[index.toString()]);
        }
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth - 20, GameConfig.stageHeigth - 110 - 76);
        this._scrollList = ComponentManager.getScrollList(AcAnswerRankRewardScrollItem, dataList, rect, { rankInfo: this._rankInfo, cfg: this._acVo.config });
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(this.x + 10, 0);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        var bottomBgFrame = BaseBitmap.create("public_9v_bg03");
        bottomBgFrame.width = GameConfig.stageWidth;
        bottomBgFrame.height = GameConfig.stageHeigth - 110 - 53;
        bottomBgFrame.x = 0;
        bottomBgFrame.y = -20;
        this.addChildToContainer(bottomBgFrame);
        var bottomBg = BaseBitmap.create("adult_lowbg");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = 110;
        bottomBg.x = this.x;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 80;
        bottomBg.addTouchTap(function () { }, this);
        this.addChildToContainer(bottomBg);
        var rankStr;
        if (this._merank) {
            if (this._merank > 300) {
                rankStr = "10000+";
            }
            else {
                rankStr = this._merank.toString();
            }
        }
        else {
            rankStr = LanguageManager.getlocal("atkracedes4"); // this._merank.toString();
        }
        var myRankStr = LanguageManager.getlocal("acRank_myrank1", [rankStr]);
        this._myRankTF = ComponentManager.getTextField(myRankStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._myRankTF.x = bottomBg.x + 45;
        this._myRankTF.y = bottomBg.y + 15;
        this.addChildToContainer(this._myRankTF);
        this._acCDTxt = ComponentManager.getTextField(myRankStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._acCDTxt.x = 330;
        this._acCDTxt.y = bottomBg.y + 15;
        this.addChildToContainer(this._acCDTxt);
        //初始化 时间
        var acCfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        var deltaT = this._acVo.et - GameData.serverTime - 86400 * acCfg.extraTime;
        if (this._acCDTxt && deltaT > 0) {
            this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
        }
        this._myBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acPunishRankPopupViewTitle", this.rankBtnClick, this);
        this._myBtn.x = this._myRankTF.x;
        this._myBtn.y = this._myRankTF.y + this._myRankTF.height + 13;
        this.addChildToContainer(this._myBtn);
        var sendDesc = ComponentManager.getTextField(LanguageManager.getlocal("acRanktip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        sendDesc.x = 330;
        if (PlatformManager.checkIsJPSp()) {
            sendDesc.x = GameConfig.stageWidth - sendDesc.width - 15;
        }
        sendDesc.y = bottomBg.y + 60;
        this.addChildToContainer(sendDesc);
    };
    AcAnswerRankRewardPopupView.prototype.rankBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACANSWERRANKPOPUPVIEW, { activeId: this._acVo.aidAndCode, score: this._acVo.tscore });
    };
    AcAnswerRankRewardPopupView.prototype.tick = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        var deltaT = this._acVo.et - GameData.serverTime - 86400 * cfg.extraTime;
        if (this._acCDTxt && deltaT > 0) {
            this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
            return true;
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
        }
        return false;
    };
    AcAnswerRankRewardPopupView.prototype.refreshRankList = function () {
        this._scrollList.visible = true;
        this._myBtn.visible = true;
        this._myRankTF.visible = true;
    };
    AcAnswerRankRewardPopupView.prototype.getRequestData = function () {
        this._aid = this.param.data.aid;
        this._code = this.param.data.code;
        this._acVo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        return { requestType: NetRequestConst.REQUEST_ACTIVITY2S_NEWANSWERRANK, requestData: { activeId: this._acVo.aidAndCode } };
    };
    AcAnswerRankRewardPopupView.prototype.receiveData = function (data) {
        if (data.ret && data.data.data.rank) {
            this._rankInfo = data.data.data.rank;
            this._merank = data.data.data.merank;
            this._mepoint = this.param.data.score;
        }
    };
    AcAnswerRankRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rechargevie_db_01",
            "accrossserverwipeboss_first",
            "accrossserverwipeboss_rank1",
            "adult_lowbg"
        ]);
    };
    AcAnswerRankRewardPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AcAnswerRankRewardPopupView.prototype.dispose = function () {
        // 未婚滑动列表
        this._scrollList = null;
        this._myBtn = null;
        this._myRankTF = null;
        this._acVo = null;
        this._merank = null;
        this._mepoint = null;
        this._rankInfo = null;
        _super.prototype.dispose.call(this);
    };
    return AcAnswerRankRewardPopupView;
}(CommonView));
__reflect(AcAnswerRankRewardPopupView.prototype, "AcAnswerRankRewardPopupView");
