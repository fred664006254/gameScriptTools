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
/*
author : qianjun
desc : 帮会争顶活动预热界面
*/
var AcBattleGroundView = (function (_super) {
    __extends(AcBattleGroundView, _super);
    function AcBattleGroundView() {
        var _this = _super.call(this) || this;
        _this._midBtn = null;
        _this._period = 1;
        _this._cdBg = null;
        _this._cdText = null;
        _this._needFresh = false;
        _this._attendText = null;
        _this._timeText = null;
        _this._detailBg = null;
        _this._data = [];
        return _this;
    }
    Object.defineProperty(AcBattleGroundView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    //REQUST_ACTIVITY_BATTLEGROUND
    //根据资源名字得到完整资源名字
    AcBattleGroundView.prototype.getDefaultRes = function (resName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (ResourceManager.hasRes(resName + "-" + this.code)) {
            return resName + "-" + this.code;
        }
        else {
            return resName + "-" + defaultCode;
        }
    };
    AcBattleGroundView.prototype.getDefaultCn = function (cnName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (LanguageManager.checkHasKey(cnName + "-" + this.code)) {
            if (Api.switchVoApi.checkOpenAtkraceScoreFix() && LanguageManager.checkHasKey(cnName + "-" + this.code + "_2")) {
                return cnName + "-" + this.code + "_2";
            }
            return cnName + "-" + this.code;
        }
        else {
            return cnName + "-" + defaultCode;
        }
    };
    Object.defineProperty(AcBattleGroundView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundView.prototype.getTitleStr = function () {
        return null;
    };
    AcBattleGroundView.prototype.initTitle = function () {
    };
    AcBattleGroundView.prototype.getResourceList = function () {
        var ret = _super.prototype.getResourceList.call(this);
        ret = ret.concat([
            // `crosspowerenterbg-1`,
            "punish_rank_icon",
            "punish_rank_name",
            "battleground_detailbtn",
            "battleground_detailtxt",
            "btn_enter_race",
            this.getDefaultRes("battlegroundshowbg")
        ]);
        return ret;
    };
    // 背景图名称
    AcBattleGroundView.prototype.getBgName = function () {
        return this.getDefaultRes("battlegroundshowbg"); //`crosspowerenterbg-1`;
    };
    AcBattleGroundView.prototype.getRuleInfo = function () {
        return this.getDefaultCn("acBattleRoundRule");
        // "acBattleRoundRule-1":"<font color=0xfeffc7><font color=0x00ff00>【风云擂台战】</font>获得参赛资格的玩家以帮会为单位参与活动，每轮淘汰一定名次外的玩家，直到所有剩余玩家为同一帮会时，活动结束。\n\n<font color=0x00ff00>【战斗规则】</font>玩家可通过随机挑战或在大地图中选择其他帮会的玩家进行挑战与追杀，战斗规则和擂台规则基本一致。\n\n<font color=0x00ff00>【积分规则】</font>随机挑战、使用挑战书进行挑战或复仇时，每击败对手一名门客，自己+2分，对手-1分；失败时停止战斗，对手+2分，自己-1分。\n使用追杀令进行追杀时，对手的扣分翻倍，每击败对手一名门客，自己+2分，对手-2分；失败时停止战斗，对手+2分，自己-1分。\n\n<font color=0x00ff00>【比赛轮次】</font>活动分若干轮次进行，每轮结束时会强制终止当前所有正在进行的战斗，并淘汰指定排名外的玩家。\n每轮结束后，会将晋级玩家的分数归0，并重置所有门客的出战状态。\n每轮结束前30分钟不能使用一键挑战功能。士气值可以继承至下轮战斗继续使用，活动结束后清零。\n每轮比赛结束后有最多数分钟的结算时间，在结算时间内不能战斗，排行榜上的分数和名次不会显示，请大人稍作等待。\n\n<font color=0x00ff00>【资格与限制】</font>风云擂台战的活动参与资格会在前一个帮会冲榜类活动结束后产生，之后新加入帮会的成员不会获得风云擂台战参赛资格；风云擂台战活动结束前，有参赛资格帮会的成员无法主动离开帮会，也无法被踢出帮会，帮主亦不能解散帮会。\n\n<font color=0x00ff00>【来访消息】</font>在风云擂台战活动中，全帮会的来访消息是共享的，玩家能看到同帮会其他成员的被挑战消息，复仇列表上的信息将在任意一名帮会成员进行复仇后移除。此外，活动每个新轮次开始后，已淘汰的玩家会从列表上移除。\n\n<font color=0x00ff00>【活动结束】</font>在本活动中，若晋级玩家全为同帮会成员时，比赛会提前结束，以前一轮的排名作为最终比赛结果。玩家获得的奖励将通过邮件发送，发奖时以帮会成员的实际职位进行发奖，时间为活动的正常结束时间，奖励邮件不会提前发奖，请大人耐心等待并注意查收。</font>",
        // "acBattleRoundRule-1":"<font color=0xfeffc7><font color=0x00ff00>【风云擂台战】</font>获得参赛资格的玩家以帮会为单位参与活动，每轮淘汰一定名次外的玩家，直到所有剩余玩家为同一帮会时，活动结束。\n\n<font color=0x00ff00>【战斗规则】</font>玩家可通过随机挑战或在大地图中选择其他帮会的玩家进行挑战与追杀，战斗规则和擂台规则基本一致。\n\n<font color=0x00ff00>【积分规则】</font>随机挑战、使用挑战书进行挑战或复仇时，每击败对手一名门客，自己+2分，对手-1分；失败时停止战斗，对手+2分，自己-1分。\n使用追杀令进行追杀时，对手的扣分翻倍，每击败对手一名门客，自己+2分，对手-2分；失败时停止战斗，对手+2分，自己-1分。\n活动期间玩家的积分下限为{1}分，达到下限后，玩家不再扣分，而对手正常加分。\n\n<font color=0x00ff00>【比赛轮次】</font>活动分若干轮次进行，每轮结束时会强制终止当前所有正在进行的战斗，并淘汰指定排名外的玩家。\n每轮结束后，会将晋级玩家的分数归0，并重置所有门客的出战状态。\n每轮结束前{2}分钟不能使用一键挑战功能。士气值可以继承至下轮战斗继续使用，活动结束后清零。\n每轮比赛结束后有最多数分钟的结算时间，在结算时间内不能战斗，排行榜上的分数和名次不会显示，请大人稍作等待。\n\n<font color=0x00ff00>【资格与限制】</font>风云擂台战的活动参与资格会在前一个帮会冲榜类活动结束后产生，之后新加入帮会的成员不会获得风云擂台战参赛资格；风云擂台战活动结束前，有参赛资格帮会的成员无法主动离开帮会，也无法被踢出帮会，帮主亦不能解散帮会。\n\n<font color=0x00ff00>【来访消息】</font>在风云擂台战活动中，全帮会的来访消息是共享的，玩家能看到同帮会其他成员的被挑战消息，复仇列表上的信息将在任意一名帮会成员进行复仇后移除。此外，活动每个新轮次开始后，已淘汰的玩家会从列表上移除。\n\n<font color=0x00ff00>【活动结束】</font>在本活动中，若晋级玩家全为同帮会成员时，比赛会提前结束，以前一轮的排名作为最终比赛结果。玩家获得的奖励将通过邮件发送，发奖时以帮会成员的实际职位进行发奖，发奖时间为活动的正常结束时间，奖励邮件不会提前发奖，请大人耐心等待并注意查收。</font>",
    };
    AcBattleGroundView.prototype.getRuleParam = function () {
        var tmp = [];
        tmp.push(this.cfg.lowestScore.toString());
        tmp.push(this.cfg.disableTime.toString());
        return tmp;
    };
    AcBattleGroundView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND, requestData: {
                activeId: view.vo.aidAndCode,
            } };
        // if(this.vo.checkIsCal()){
        //     return null;
        // } else {
        // }
    };
    AcBattleGroundView.prototype.receiveData = function (data) {
        var view = this;
        view._data = [];
        if (data.data.data) {
            if (data.data.data.waiting) {
                view.vo.setWaiting(data.data.data.waiting);
            }
            else {
                view.vo.setWaiting(0);
            }
            view.vo.setRaceInfo(data.data.data.battleground);
            if (data.data.data.myrankArr) {
                view.vo.setRank(data.data.data.myrankArr);
            }
            if (data.data.data.pkzids) {
                view.vo.setPkzids(data.data.data.pkzids);
            }
            if (data.data.data.alive) {
                view.vo.setAlive(data.data.data.alive);
            }
            else {
                view.vo.setAlive(0);
            }
            if (data.data.data.onelist) {
                this.vo.onelist = data.data.data.onelist;
            }
            if (data.data.data.map) {
                view.vo.setMap(data.data.data.map);
            }
            //弹窗
            if (!this.vo.isChampWin()) {
                if (data.data.data.popflag) {
                    ViewController.getInstance().openView("AcBattleGroundNextPopupView", {
                        aid: view.aid,
                        code: view.code
                    });
                }
            }
            if (view._needFresh) {
                view._needFresh = false;
            }
        }
        //view.api.setBossNumInfo(data.data.data);
    };
    AcBattleGroundView.prototype.initBg = function () {
        this.height = GameConfig.stageHeigth;
        this.width = GameConfig.stageWidth;
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseBitmap.create(bgName);
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            this.viewBg.y = 0 - Math.floor((1136 - GameConfig.stageHeigth) / 2);
        }
    };
    AcBattleGroundView.prototype.initView = function () {
        // if(this.vo.checkIsCal()){
        //     let secound = this.vo.newRoundSecond();
        //     egret.Tween.get(this)
        //     .wait(secound * 1000)
        //     .call(()=>{
        //         let equestData=this.getRequestData();
        //         if(equestData)
        //         {
        //             this.request(equestData.requestType,equestData.requestData);
        //         }
        //     });
        // }
        var _this = this;
        var view = this;
        view.vo.init = false;
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASUREBOXPLAY),view.playBoxCallback,view);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var code = view.code;
        view._period = view.vo.getCurperiod();
        //顶部
        // let titleBg = BaseLoadBitmap.create(this.getDefaultRes("battleground_titlebg"));
        var titleBg = ComponentManager.getCustomMovieClip("battlegroundtitlebganim", 5, 150);
        titleBg.width = 550;
        titleBg.height = 240;
        titleBg.x = GameConfig.stageWidth / 2 - titleBg.width / 2 + 30;
        titleBg.y = 10;
        titleBg.playWithTime(-1);
        this.addChild(titleBg);
        var title = BaseLoadBitmap.create(this.getDefaultRes("battleground_title"));
        title.width = 360;
        title.height = 110;
        title.x = titleBg.x + titleBg.width / 2 - title.width / 2 - 30; //GameConfig.stageWidth/2;
        title.y = titleBg.y + titleBg.height / 2 - title.height / 2;
        this.addChild(title);
        var descbg = BaseBitmap.create('public_9v_bg05');
        descbg.width = 328;
        descbg.height = 90;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, titleBg, [0, titleBg.height + 180]);
        //底部
        var bottomBg = BaseBitmap.create("public_bottombg1");
        bottomBg.height = 100;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        view.addChild(bottomBg);
        var timeCdTxt = ComponentManager.getTextField(LanguageManager.getlocal("AcTurnTableViewTime", [view.vo.acTimeAndHour]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(timeCdTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeCdTxt, bottomBg, [20, 20]);
        var serverText = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundDetailsViewServerList", [this.vo.getPkzidsStr()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChild(serverText);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, serverText, timeCdTxt, [0, timeCdTxt.textHeight + 7]);
        //顶部提示
        view.initTopTip();
        var detailBtnBg = BaseBitmap.create("mainui_bottombtnbg");
        this.addChild(detailBtnBg);
        //活动详情
        var detailBtn = ComponentManager.getButton("battleground_detailbtn", null, function () {
            if (_this.vo.isStart == false) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (_this.vo.checkIsCal() || _this.vo.isWaiting()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acBattleGroundViewIsCal"));
                return;
            }
            else {
                ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEGROUNDDETAILSVIEW, {
                    aid: view.aid,
                    code: view.code,
                });
                //活动详情界面
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, detailBtn, bottomBg, [15, bottomBg.height + 5]);
        view.addChild(detailBtn);
        detailBtnBg.setPosition(detailBtn.x + detailBtn.width / 2 - detailBtnBg.width / 2, detailBtn.y + detailBtn.height / 2 - detailBtnBg.width / 2);
        var detailTxt = BaseBitmap.create("battleground_detailtxt");
        this.addChild(detailTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, detailTxt, detailBtn);
        var rankBg = BaseBitmap.create("mainui_bottombtnbg");
        this.addChild(rankBg);
        //排行榜
        var rankBtn = ComponentManager.getButton("punish_rank_icon", null, function () {
            if (_this.vo.isStart == false) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (_this.vo.checkIsCal() || _this.vo.isWaiting()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acBattleGroundViewIsCal"));
                return;
            }
            //排行榜界面
            ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLERANKPOPUPVIEW, {
                aid: view.aid,
                code: view.code
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, rankBtn, bottomBg, [15, bottomBg.height + 5]);
        view.addChild(rankBtn);
        rankBg.setPosition(rankBtn.x + rankBtn.width / 2 - rankBg.width / 2, rankBtn.y + rankBtn.height / 2 - rankBg.width / 2);
        var rankTxt = BaseBitmap.create("punish_rank_name");
        this.addChild(rankTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, rankTxt, rankBtn);
        // btn_enter_race
        //中部按钮
        var midBtn = ComponentManager.getButton("btn_enter_race", null, function () {
            var str = '';
            // if(1==1){
            //         ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEGROUNDMAPVIEW,{
            //             aid : view.aid,
            //             code : view.code
            //         });
            //         return;
            // }
            if (_this.vo.isStart == false) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (_this.vo.checkIsCal() || _this.vo.isWaiting()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acBattleGroundViewIsCal"));
                return;
            }
            switch (view.vo.getCurperiod()) {
                case 1:
                    str = _this.getDefaultCn("acBattleRoundNotStart"); //`acBattleRoundNotStart-${code}`
                    break;
                case 2:
                case 3:
                    ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEGROUNDMAPVIEW, {
                        aid: view.aid,
                        code: view.code
                    });
                    return;
                case 4:
                    str = 'date_error';
                    break;
            }
            App.CommonUtil.showTip(LanguageManager.getlocal(str));
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, midBtn, view, [0, 280]);
        view.addChild(midBtn);
        view._midBtn = midBtn;
        view.setChildIndex(view.closeBtn, 9999);
        var detailBg = BaseBitmap.create("public_lockbg");
        detailBg.scaleX = 2;
        detailBg.scaleY = 2;
        this.addChild(detailBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, detailBg, bottomBg, [0, -150]);
        this._detailBg = detailBg;
        var attendTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn(this.vo.getAttendQuality() ? "acBattleRoundQuality" : "acBattleRoundNoQuality")), 20);
        // let attendTxt = ComponentManager.getTextField(LanguageManager.getlocal(`${view.vo.getAttendQuality() ? `acBattleRoundQuality` : `acBattleRoundNoQuality`}-${code}`), 20);
        view.addChild(attendTxt);
        view._attendText = attendTxt;
        if (view.vo.isWaiting()) {
            attendTxt.text = LanguageManager.getlocal(this.getDefaultCn("acBattleRoundCDTxt10"));
        }
        if (this.vo.getCurperiod() == 1) {
            attendTxt.text = LanguageManager.getlocal("acbattlenobegun2");
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, attendTxt, detailBg, [0, 15]);
        this._timeText = ComponentManager.getTextField("", 20, 0x21eb39);
        this.addChild(this._timeText);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._timeText, detailBg, [0, 15]);
    };
    AcBattleGroundView.prototype.tick = function () {
        var view = this;
        var curPeriod = view.vo.getCurperiod();
        var code = view.code;
        // if(curPeriod == 4){
        //     App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundCDTxt5-${code}`));
        //     view.hide();
        //     return;
        // }
        if (this._timeText) {
            var countDownTime = this.vo.getCountDownTime();
            if (countDownTime > 0) {
                this._timeText.text = LanguageManager.getlocal("acBattleGroundAcCD", [App.DateUtil.getFormatBySecond(countDownTime)]);
            }
            else {
                this._timeText.text = LanguageManager.getlocal("acPunishEnd");
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._timeText, this._detailBg, [0, 10]);
        }
        if ((!this.vo.checkIsCal()) && curPeriod !== view._period) {
            this._needFresh = true;
            this.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND, { activeId: view.acTivityId });
        }
        view.freshText();
        view._period = curPeriod;
        if (view.vo.isWaiting()) {
            view._attendText.text = LanguageManager.getlocal(this.getDefaultCn("acBattleRoundCDTxt10"));
        }
        else {
            view._attendText.text = LanguageManager.getlocal(this.getDefaultCn("" + (view.vo.getAttendQuality() ? "acBattleRoundQuality" : "acBattleRoundNoQuality")));
        }
        if (this.vo.getCurperiod() == 1) {
            view._attendText.text = LanguageManager.getlocal("acbattlenobegun2");
        }
        if (curPeriod == 4) {
            this._attendText.text = LanguageManager.getlocal("acPunishEnd");
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this._attendText, this._detailBg, [0, 15]);
    };
    AcBattleGroundView.prototype.initTopTip = function () {
        var view = this;
        var code = view.code;
        var tipBg = BaseBitmap.create("public_9v_bg05");
        tipBg.width = 350;
        tipBg.height = 90;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipBg, view, [0, 300]);
        view.addChild(tipBg);
        view._cdBg = tipBg;
        // tipBg.addTouchTap(()=>{
        //     ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEDETAILSVIEW,{
        //         aid : view.aid,
        //         code : view.code,
        //         type: "rank"
        //     });
        // },view);
        var tipTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.lineSpacing = 5;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        view.addChild(tipTxt);
        view._cdText = tipTxt;
        view.freshText();
    };
    AcBattleGroundView.prototype.freshText = function () {
        var view = this;
        var code = view.code;
        var period = view.vo.getCurperiod();
        //提示板信息
        var cd = App.DateUtil.getFormatBySecond(view.vo.getCountCD());
        var str = this.getDefaultCn("acBattleRoundCDTxt" + view._period);
        var param = [];
        var myRank = view.vo.getMyRank();
        if (view.vo.isWaiting()) {
            view._cdText.text = LanguageManager.getlocal(this.getDefaultCn("acBattleGroundTip8"));
        }
        else {
            switch (period) {
                case 1:
                    param.push(cd);
                    break;
                case 2:
                    param.push(cd);
                    var curRound = view.vo.getCurRound();
                    var need = view.cfg.weedOut[curRound - 1].btmLine;
                    if (period == 2 && view.cfg.weedOut.length == view.vo.getCurRound()) {
                        //最后一轮
                        str = this.getDefaultCn("acBattleRoundCDTxt4");
                    }
                    else {
                        param.push(need);
                    }
                    if (view.vo.getAttendQuality()) {
                        //没被淘汰
                        if (view.vo.getJoinIn()) {
                            param.push(LanguageManager.getlocal(this.getDefaultCn("acBattleRoundRank"), [myRank.toString()]));
                        }
                        else {
                            param.push(LanguageManager.getlocal(this.getDefaultCn("acBattleRoundCDTxt5")));
                        }
                    }
                    else {
                        param.push(LanguageManager.getlocal(this.getDefaultCn("acBattleRoundNoAttend")));
                    }
                    break;
                case 3:
                case 4:
                    str = this.getDefaultCn("acBattleRoundCDTxt3");
                    param.push(view.vo.getWinnerAlliance().name);
                    var tyle = 1;
                    if (view.vo.getWinnerAlliance().mid == Number(Api.playerVoApi.getPlayerAllianceId())) {
                        tyle = 9;
                    }
                    else if (view.vo.getAttendQuality()) {
                        tyle = 7;
                    }
                    else {
                        tyle = 8;
                    }
                    param.push(LanguageManager.getlocal(this.getDefaultCn("acBattleRoundCDTxt" + tyle)));
                    break;
            }
            if (this._needFresh) {
                view._cdText.text = LanguageManager.getlocal(this.getDefaultCn("acBattleGroundTip8"));
            }
            else {
                view._cdText.text = LanguageManager.getlocal(str, param);
            }
        }
        view._cdBg.width = 350; // view._cdText.textWidth + 30;
        view._cdBg.height = 100; //view._cdText.textHeight + 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._cdBg, view, [0, 300]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._cdText, view._cdBg, [0, -5]);
    };
    AcBattleGroundView.prototype.dispose = function () {
        var view = this;
        egret.Tween.removeTweens(this);
        view._midBtn = null;
        view._period = 1;
        if (view._cdBg) {
            view._cdBg.removeTouchTap();
        }
        view._cdBg = null;
        view._cdText = null;
        view._needFresh = false;
        this._period = 1;
        this._attendText = null;
        this._timeText = null;
        this._detailBg = null;
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_DOUBLESEVEN_GETREWARD),view.getrewardCallback,view);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH,this.fresh_jindu,this); 
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundView;
}(AcCommonView));
__reflect(AcBattleGroundView.prototype, "AcBattleGroundView");
