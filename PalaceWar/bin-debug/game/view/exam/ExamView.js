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
 * 科举答题
 * author yangchengguo
 * date 2019.7.22
 * @class ExamView
 */
var ExamView = (function (_super) {
    __extends(ExamView, _super);
    function ExamView() {
        var _this = _super.call(this) || this;
        _this.SATURDAY = 6;
        _this.SUNDAY = 0;
        /**倒计时背景 */
        // public _countDownTimeBg = null;
        /** 活动结束倒计时*/
        // public _examCountDownTime = null;
        /**玩家排名 */
        _this._playerRank = null;
        /**玩家积分 */
        _this._playerScore = null;
        /**新科状元头像 */
        _this._roleTitle = null;
        /**新科状元btn */
        _this._titleBtn = null;
        _this._isShowRank = false;
        /**会试 */
        _this._meetExam = null;
        /**殿试 */
        _this._impreialExam = null;
        /**排行榜数据 */
        _this._rankData = null;
        /**等待结束显示信息 */
        _this._waitContainer = null;
        _this._playerRankContainer = null;
        _this._playerRankBg = null;
        _this._roleTitleIcon = null;
        _this._numberOneContainer = null;
        return _this;
    }
    ExamView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_EXAM_RANK, this.rankBtnHandler, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_EXAM_FRESH, this.refreshUI, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_RANK_USERSHOT, this.updateNumberOne, this);
        //刷新自己的排行
        NetManager.request(NetRequestConst.REQUEST_EXAM_RANK, {});
        //顶部背景
        var topBg = BaseBitmap.create("examview_infobg");
        topBg.y = this.titleBg.height - 7;
        this.addChildToContainer(topBg);
        var roleTitle = BaseBitmap.create("examview_role_title");
        roleTitle.y = topBg.y + topBg.height - roleTitle.height - 5;
        this.addChildToContainer(roleTitle);
        this._roleTitle = roleTitle;
        //称号
        var titleIcon = BaseBitmap.create("examview_champion_title1");
        titleIcon.setPosition(this._roleTitle.x + this._roleTitle.width / 2 - titleIcon.width / 2 + 0, this._roleTitle.y + this._roleTitle.height / 2 - titleIcon.height / 2 + 40);
        this.addChildToContainer(titleIcon);
        this._roleTitleIcon = titleIcon;
        //活动时间
        var examEndTimeStr = Api.examVoApi.getStartAndEndTime();
        var examEndTime = ComponentManager.getTextField(LanguageManager.getlocal("examinationTime", [examEndTimeStr.st, examEndTimeStr.et]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        examEndTime.setPosition(roleTitle.width + 7, roleTitle.y + 5);
        this.addChildToContainer(examEndTime);
        //活动介绍
        var examDesc = new BaseTextField();
        examDesc.text = LanguageManager.getlocal("examinationInfo-1");
        examDesc.width = 385;
        examDesc.height = 110;
        examDesc.lineSpacing = 3;
        examDesc.wordWrap = true;
        examDesc.size = TextFieldConst.FONTSIZE_CONTENT_COMMON;
        examDesc.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        examDesc.x = examEndTime.x;
        examDesc.y = examEndTime.y + examEndTime.height + 10;
        this.addChildToContainer(examDesc);
        //玩家个人排名信息
        var playerRankContainer = new BaseDisplayObjectContainer();
        playerRankContainer.setPosition(0, topBg.y + topBg.height + 3);
        playerRankContainer.width = GameConfig.stageWidth;
        this.addChildToContainer(playerRankContainer);
        this._playerRankContainer = playerRankContainer;
        var playerRankBg = BaseBitmap.create("qingyuanitemtitlebg");
        playerRankBg.y = 3;
        playerRankContainer.addChild(playerRankBg);
        this._playerRankBg = playerRankBg;
        var rankStr = LanguageManager.getlocal("examinationNotInRank");
        var playerRank = ComponentManager.getTextField(LanguageManager.getlocal("examinationMyRank", [rankStr]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_WHITE);
        playerRankContainer.addChild(playerRank);
        this._playerRank = playerRank;
        var playerScore = ComponentManager.getTextField(LanguageManager.getlocal("examinationMyScore", [String(Api.examVoApi.getScore())]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_WHITE);
        playerRankContainer.addChild(playerScore);
        this._playerScore = playerScore;
        playerRankBg.width = playerRank.width + playerScore.width + 120;
        playerRankBg.x = GameConfig.stageWidth / 2 - playerRankBg.width / 2;
        playerRank.setPosition(GameConfig.stageWidth / 2 - 15 - playerRank.width, playerRankBg.y + playerRankBg.height / 2 - playerRank.height / 2);
        playerScore.setPosition(GameConfig.stageWidth / 2 + 15, playerRank.y);
        var examBg = BaseBitmap.create("examview_bg");
        this.addChildToContainer(examBg);
        var examInfo1 = Api.examVoApi.getExamPhaseByDay(this.SATURDAY);
        var examSat = new ExamBannerItem();
        examSat.initItem(examInfo1);
        examSat.setPosition(GameConfig.stageWidth / 2 - examSat.width / 2, playerRankContainer.y + playerRankBg.height + 17);
        this.addChildToContainer(examSat);
        this._meetExam = examSat;
        var examInfo2 = Api.examVoApi.getExamPhaseByDay(this.SUNDAY);
        var examSun = new ExamBannerItem();
        examSun.initItem(examInfo2);
        examSun.setPosition(GameConfig.stageWidth / 2 - examSat.width / 2, examSat.y + examSat.height + 5);
        this.addChildToContainer(examSun);
        this._impreialExam = examSun;
        var bottomBg = BaseBitmap.create("arena_bottom");
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height;
        this.addChildToContainer(bottomBg);
        //bg高度适配
        examBg.height = GameConfig.stageHeigth - bottomBg.height - topBg.y - topBg.height - 8;
        examBg.y = topBg.y + topBg.height + 15;
        var rankBtn = ComponentManager.getButton("btn_big_yellow", "examinationRankBtnName", this.rankBtnClick, this);
        rankBtn.x = GameConfig.stageWidth / 2 - rankBtn.width / 2;
        rankBtn.y = GameConfig.stageHeigth - bottomBg.height + (bottomBg.height / 2 - rankBtn.height / 2);
        this.addChildToContainer(rankBtn);
        TimerManager.doTimer(1000, 0, this.timeTick, this);
        this.showWaitView();
    };
    ExamView.prototype.showWaitView = function () {
        if (Api.examVoApi.isFinishExamByDay(this.SUNDAY) && (Api.examVoApi.getEndTimeByDay(this.SUNDAY) > GameData.serverTime)) {
            if (!this._waitContainer) {
                this._waitContainer = new BaseDisplayObjectContainer();
                // this._waitContainer.setPosition(GameConfig.stageWidth/2, GameConfig.stageHeigth/2);
                this.addChildToContainer(this._waitContainer);
                var tipBg = BaseBitmap.create("wifestatus_namebg");
                this._waitContainer.addChild(tipBg);
                var waitInfo1 = ComponentManager.getTextField(LanguageManager.getlocal("examinationFinished"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
                this._waitContainer.addChild(waitInfo1);
                var waitInfo2 = ComponentManager.getTextField(LanguageManager.getlocal("examinationWait"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_YELLOW);
                this._waitContainer.addChild(waitInfo2);
                tipBg.width = (waitInfo1.width > waitInfo2.width ? waitInfo1.width : waitInfo2.width) + 90;
                tipBg.height = waitInfo1.height + waitInfo2.height + 60;
                this._waitContainer.setPosition(GameConfig.stageWidth / 2, this._meetExam.y + this._meetExam.height);
                tipBg.setPosition(-tipBg.width / 2, -tipBg.height / 2);
                waitInfo1.setPosition(tipBg.x + tipBg.width / 2 - waitInfo1.width / 2, tipBg.y + 20);
                waitInfo2.setPosition(tipBg.x + tipBg.width / 2 - waitInfo2.width / 2, tipBg.y + tipBg.height - waitInfo2.height - 20);
            }
        }
    };
    ExamView.prototype.removeWaitView = function () {
        if (this._waitContainer) {
            this.container.removeChild(this._waitContainer);
            this._waitContainer = null;
        }
    };
    ExamView.prototype.timeTick = function () {
        if (Api.examVoApi.getEndTimeByDay(this.SUNDAY) <= GameData.serverTime) {
            if (Api.examVoApi.isFinishExamByDay(this.SUNDAY)) {
                this._impreialExam.setBannerItemState(this._impreialExam.BANNER_TYPE_JOINED);
            }
            else {
                this._impreialExam.setBannerItemState(this._impreialExam.BANNER_TYPE_END);
            }
            this.showNumberoneView();
            this.removeWaitView();
            TimerManager.remove(this.timeTick, this);
        }
        if (Api.examVoApi.getEndTimeByDay(this.SATURDAY) <= GameData.serverTime) {
            if (Api.examVoApi.isFinishExamByDay(this.SATURDAY)) {
                this._meetExam.setBannerItemState(this._meetExam.BANNER_TYPE_JOINED);
            }
            else {
                this._meetExam.setBannerItemState(this._meetExam.BANNER_TYPE_END);
            }
        }
    };
    ExamView.prototype.refreshUI = function (event) {
        this._isShowRank = false;
        NetManager.request(NetRequestConst.REQUEST_EXAM_RANK, {});
        var scoreNum = Api.examVoApi.getScore();
        this._playerScore.text = LanguageManager.getlocal("examinationMyScore", [String(scoreNum)]);
        var currWidth = this._playerRank.width > this._playerScore.width ? this._playerRank.width : this._playerScore.width;
        this._playerRankBg.width = currWidth * 2 + 90;
        this._playerRankBg.x = GameConfig.stageWidth / 2 - this._playerRankBg.width / 2;
        var examType = event.data.examType;
        if (examType == 0) {
            this._meetExam.setBannerItemState(this._meetExam.BANNER_TYPE_JOINED);
        }
        else {
            this._impreialExam.setBannerItemState(this._impreialExam.BANNER_TYPE_JOINED);
        }
        this.showWaitView();
    };
    ExamView.prototype.showNumberoneView = function () {
        if (!this._rankData || this._rankData.rankArr || this._rankData.rankArr[0] == null) {
            return;
        }
        if (this._numberOneContainer) {
            return;
        }
        var level = this._rankData.rankArr[0].level;
        var pic = this._rankData.rankArr[0].pic;
        // let rect = new egret.Rectangle(0, 0, 239, 149);
        var rect = new egret.Rectangle(0, 0, 300, 220);
        var container = Api.playerVoApi.getPlayerPortrait(level, pic);
        // container.setPosition(this._roleTitle.x - 40,this._roleTitle.y);
        container.setPosition(this._roleTitle.x - 10, this.titleBg.height);
        container.setScale(0.7);
        container.mask = rect;
        this.addChildToContainer(container);
        this._numberOneContainer = container;
        this._roleTitle.visible = false;
        this._roleTitleIcon.visible = false;
        container.addTouchTap(this.titleBtnClick, this);
        var titleIcon = BaseBitmap.create("examview_champion_title1");
        titleIcon.width = 155;
        titleIcon.height = 59;
        titleIcon.setPosition(this._roleTitle.x + this._roleTitle.width / 2 - titleIcon.width / 2 - 20, this._roleTitle.y + this._roleTitle.height / 2 - titleIcon.height / 2 + 40);
        this.addChildToContainer(titleIcon);
    };
    ExamView.prototype.titleBtnClick = function () {
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT, { ruid: this._rankData.rankArr[0].uid });
    };
    ExamView.prototype.updateNumberOne = function (event) {
        if (!event.data.ret) {
            return;
        }
        var data = event.data.data.data;
        ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
    };
    /**点击排行榜 */
    ExamView.prototype.rankBtnClick = function () {
        this._isShowRank = true;
        NetManager.request(NetRequestConst.REQUEST_EXAM_RANK, {});
    };
    /**打开排行榜 */
    ExamView.prototype.rankBtnHandler = function (event) {
        if (event.data.ret) {
            var data = event.data.data.data;
            this._rankData = data;
            if (this._isShowRank == true) {
                ViewController.getInstance().openView(ViewConst.POPUP.EXAMRANKPOPUPVIEW, { "rankArr": data.rankArr, "myrankArr": data.myrankArr });
                this._isShowRank = false;
            }
            else {
                var myRank = null;
                if (data.myrankArr && data.myrankArr.myrank) {
                    myRank = data.myrankArr.myrank;
                }
                if (myRank == null) {
                    myRank = LanguageManager.getlocal("examinationNotInRank");
                }
                else if (myRank > 10000) {
                    myRank = "10000+";
                }
                this._playerRank.text = LanguageManager.getlocal("examinationMyRank", [String(myRank)]);
                var currWidth = this._playerRank.width > this._playerScore.width ? this._playerRank.width : this._playerScore.width;
                this._playerRankBg.width = currWidth * 2 + 90;
                this._playerRank.x = GameConfig.stageWidth / 2 - 15 - this._playerRank.width;
                this._playerRankBg.x = GameConfig.stageWidth / 2 - this._playerRankBg.width / 2;
                if (Api.examVoApi.getEndTimeByDay(this.SUNDAY) <= GameData.serverTime) {
                    this.showNumberoneView();
                }
            }
        }
    };
    ExamView.prototype.getRuleInfo = function () {
        return "examinationRuleInfo";
    };
    ExamView.prototype.getRuleInfoParam = function () {
        var pahseSat = Api.examVoApi.getExamPhaseByDay(this.SATURDAY);
        var pahseSun = Api.examVoApi.getExamPhaseByDay(this.SUNDAY);
        return [
            String(App.DateUtil.formatSvrHourByLocalTimeZone(pahseSat.time[0] / 3600).hour), String(App.DateUtil.formatSvrHourByLocalTimeZone(pahseSat.time[1] / 3600).hour), String(App.DateUtil.formatSvrHourByLocalTimeZone(pahseSun.time[0] / 3600).hour), String(App.DateUtil.formatSvrHourByLocalTimeZone(pahseSun.time[1] / 3600).hour)
        ];
    };
    ExamView.prototype.getTitleBgName = function () {
        return "examview_titlebg1";
    };
    ExamView.prototype.getTitleStr = function () {
        return null;
    };
    ExamView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "examview_titlebg1",
            "forpeople_top",
            "fill_screen_buttom",
            "examview_infobg",
            "examview_bg",
            "qingyuanitemtitlebg",
            "countrywarrewardview_itembg",
            "btn_big_yellow",
            "arena_bottom",
            "wifestatus_namebg",
            "examview_imperial_bg1",
            "examview_meet_bg1",
            "examview_role_title",
            "examview_start_test1",
            "public_9_powertipbg2",
            "examview_champion_title1",
            "examview_btnbg",
            "examview_btninfo",
            "examview_effect_lampholderflash",
            "examview_effect_lampholderlight",
            "examview_light",
            "examvieweffect_lampholderbright"
        ]);
    };
    ExamView.prototype.dispose = function () {
        // this._countDownTimeBg = null;
        // this._examCountDownTime = null;
        this._playerRank = null;
        this._playerScore = null;
        this._roleTitle = null;
        this._titleBtn = null;
        this._isShowRank = false;
        this._impreialExam = null;
        this._meetExam = null;
        this._rankData = null;
        this._waitContainer = null;
        this._playerRankContainer = null;
        this._playerRankBg = null;
        this._roleTitleIcon = null;
        this._numberOneContainer = null;
        TimerManager.remove(this.timeTick, this);
        App.MessageHelper.removeEventListener(NetRequestConst.REQUEST_EXAM_RANK, this.rankBtnHandler, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_EXAM_FRESH, this.refreshUI, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.updateNumberOne, this);
        _super.prototype.dispose.call(this);
    };
    return ExamView;
}(CommonView));
__reflect(ExamView.prototype, "ExamView");
//# sourceMappingURL=ExamView.js.map