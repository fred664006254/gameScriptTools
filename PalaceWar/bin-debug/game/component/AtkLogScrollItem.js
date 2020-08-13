var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 战报列表item实现，适用于擂台，跨服擂台，绝地擂台等类似功能更多战报的item
 * author 陈可
 * date 2019/6/5
 * @class AtkLogCommonItem
 */
var AtkLogScrollItem = /** @class */ (function (_super) {
    __extends(AtkLogScrollItem, _super);
    function AtkLogScrollItem() {
        var _this = _super.call(this) || this;
        _this.data = 0;
        _this.challengeBtn = null;
        return _this;
    }
    AtkLogScrollItem.prototype.initItem = function (index, data, itemParam) {
        var olddata = data;
        if (data && data.info) {
            data = data.info;
        }
        this.data = data;
        var hasStartTime = false;
        if (data.startts) {
            hasStartTime = true;
        }
        var wordsBg = BaseBitmap.create("public_9_bg25");
        wordsBg.width = 640;
        wordsBg.height = hasStartTime ? 140 : 124;
        wordsBg.x = 0;
        wordsBg.y = 0;
        wordsBg.visible = false;
        this.addChild(wordsBg);
        var startY = 15;
        var rankinglist_line = BaseBitmap.create("rankinglist_line");
        // rankinglist_line.y =wordsBg.height+4;
        rankinglist_line.x = 15;
        this.addChild(rankinglist_line);
        var rankImg = BaseBitmap.create("rankinglist_rankbg");
        rankImg.setPosition(10.5, startY);
        this.addChild(rankImg);
        var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        rankTxt.text = String(index + 1);
        rankTxt.setPosition(rankImg.x + (rankImg.width - rankTxt.width) / 2, rankImg.y + (rankImg.height - rankTxt.height) / 2);
        this.addChild(rankTxt);
        //名称  
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        if (data.type == "director") {
            nameTxt.text = data.uinfo.name + LanguageManager.getlocal("atkraceyamenid", [data.uinfo.uid]);
        }
        else {
            nameTxt.text = data.name + LanguageManager.getlocal("atkraceyamenid", [data.uid]);
        }
        if (data.weedout) {
            nameTxt.text += "<font color=0xff3c3c>\u3010" + LanguageManager.getlocal("battlestaut3") + "\u3011</font>";
        }
        nameTxt.x = rankImg.x + rankImg.width + 11;
        nameTxt.y = rankTxt.y;
        this.addChild(nameTxt);
        //描述    
        var describeTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        describeTxt.lineSpacing = 2;
        describeTxt.text = "";
        describeTxt.width = 450;
        describeTxt.x = nameTxt.x;
        describeTxt.y = nameTxt.y + nameTxt.height + 5;
        this.addChild(describeTxt);
        //同帮会
        if (data.allianceId && Api.playerVoApi.getPlayerAllianceId() && data.allianceId == Api.playerVoApi.getPlayerAllianceId() && data.uid != Api.playerVoApi.getPlayerID()) {
            var allianceTxt = ComponentManager.getTextField(LanguageManager.getlocal('atkrace_log_sameAlliance'), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
            allianceTxt.x = nameTxt.x + nameTxt.width;
            allianceTxt.y = nameTxt.y;
            this.addChild(allianceTxt);
        }
        if (data.type == "director") {
            var vo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace", Api.atkracecrossVoApi.newcrossCode);
            var defenInfo = data.fuinfo;
            var fameCfg = vo.getFameCfgByLine(data.x);
            var fameName = LanguageManager.getlocal("newatkrackcross_fameTitleName" + (fameCfg.baseCfg.index + 1));
            var fameStr = fameName;
            if (data.x > 1) {
                var seatCount = fameCfg.seatCount + data.y;
                fameStr = LanguageManager.getlocal("newatkrackcross_famePtitleSeat", [fameName, seatCount]);
            }
            describeTxt.text = LanguageManager.getlocal("newatkrackcross_fameHoldLog2", [defenInfo.name, fameStr]);
            var startTimeTxt = ComponentManager.getTextField(LanguageManager.getlocal("startBattleTimeDesc", [App.DateUtil.getFormatBySecond(data.fightst, 2)]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
            startTimeTxt.x = describeTxt.x;
            startTimeTxt.y = describeTxt.y + describeTxt.height + 5;
            this.addChild(startTimeTxt);
            rankinglist_line.y = startTimeTxt.y + startTimeTxt.height + 15;
        }
        else {
            //击败｜｜全歼
            var str = "";
            if (data.type == 1) {
                str = LanguageManager.getlocal("atkracebeat");
            }
            else {
                str = LanguageManager.getlocal("atkraceAnnihilation");
            }
            var servantName = Config.ServantCfg.getServantItemById(data.sid).name;
            //  (1随机 2复仇 3挑战 4追杀 5出师令)
            if (data.atype && data.atype == 2) {
                if (data.streak && data.streak >= 3) {
                    describeTxt.text = LanguageManager.getlocal("actrackStraight_1", [LanguageManager.getlocal(data.support == 1 ? "actracksupport" : "actrackservant"), servantName, str, data.uname2, data.fightnum, data.streak]);
                }
                else {
                    describeTxt.text = LanguageManager.getlocal("actrackDescription_1", [LanguageManager.getlocal(data.support == 1 ? "actracksupport" : "actrackservant"), servantName, str, data.uname2, data.fightnum]);
                }
            }
            else if (data.atype == 4) {
                if (data.streak && data.streak >= 3) {
                    describeTxt.text = LanguageManager.getlocal("actrackStraight_4_2", [LanguageManager.getlocal(data.support == 1 ? "actracksupport" : "actrackservant"), servantName, str, data.uname2, data.fightnum, data.streak]);
                }
                else {
                    describeTxt.text = LanguageManager.getlocal("actrackDescription_4", [LanguageManager.getlocal(data.support == 1 ? "actracksupport" : "actrackservant"), servantName, str, data.uname2, data.fightnum]);
                }
            }
            else if (data.atype == 3) {
                if (data.streak && data.streak >= 3) {
                    describeTxt.text = LanguageManager.getlocal("actrackStraight_3", [LanguageManager.getlocal(data.support == 1 ? "actracksupport" : "actrackservant"), servantName, str, data.uname2, data.fightnum, data.streak]);
                }
                else {
                    describeTxt.text = LanguageManager.getlocal("actrackDescription_3", [LanguageManager.getlocal(data.support == 1 ? "actracksupport" : "actrackservant"), servantName, str, data.uname2, data.fightnum]);
                }
            }
            else {
                if (data.streak && data.streak >= 3) {
                    describeTxt.text = LanguageManager.getlocal("actrackStraight", [LanguageManager.getlocal(data.support == 1 ? "actracksupport" : "actrackservant"), servantName, str, data.uname2, data.fightnum, data.streak]);
                }
                else {
                    describeTxt.text = LanguageManager.getlocal("actrackDescription", [LanguageManager.getlocal(data.support == 1 ? "actracksupport" : "actrackservant"), servantName, str, data.uname2, data.fightnum]);
                }
            }
            var startTimeTxt = null;
            if (hasStartTime) {
                startTimeTxt = ComponentManager.getTextField(LanguageManager.getlocal("startBattleTimeDesc", [App.DateUtil.getFormatBySecond(data.startts, 2)]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
                startTimeTxt.x = describeTxt.x;
                startTimeTxt.y = describeTxt.y + describeTxt.height + 5;
                this.addChild(startTimeTxt);
            }
            //时间  
            var timerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
            timerTxt.text = LanguageManager.getlocal("endTimeDesc", [App.DateUtil.getFormatBySecond(data.st, 2)]);
            timerTxt.x = describeTxt.x;
            if (startTimeTxt) {
                timerTxt.y = startTimeTxt.y + startTimeTxt.height + 5;
            }
            else {
                timerTxt.y = describeTxt.y + describeTxt.height + 5;
            }
            this.addChild(timerTxt);
            rankinglist_line.y = timerTxt.y + timerTxt.height + 15;
            wordsBg.height = rankinglist_line.y + rankinglist_line.height + 10;
            //挑战按钮
            var challengeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "atkraceChallenge", this.challengBtnHandler, this);
            this.challengeBtn = challengeBtn;
            challengeBtn.setScale(0.85);
            challengeBtn.x = 510;
            challengeBtn.y = rankinglist_line.y - challengeBtn.height - 15;
            this.addChild(challengeBtn);
            var isShowBtn = true;
            if (Api.playerVoApi.getPlayerID() == data.uid) {
                isShowBtn = false;
            }
            else if (this.checkIsCross() && Api.mergeServerVoApi.judgeIsSameServer(data.zid, Api.mergeServerVoApi.getTrueZid())) {
                isShowBtn = false;
            }
            this.challengeBtn.visible = isShowBtn;
            if (olddata.expired || data.expired) {
                var expired = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_timeout"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
                expired.x = describeTxt.x;
                expired.y = timerTxt.y + timerTxt.height + 5;
                this.addChild(expired);
                rankinglist_line.y += 28;
                wordsBg.height += 28;
            }
        }
    };
    /**
     * 是否是跨服
     */
    AtkLogScrollItem.prototype.checkIsCross = function () {
        return false;
    };
    //挑战
    AtkLogScrollItem.prototype.challengBtnHandler = function (evt) {
    };
    AtkLogScrollItem.prototype.getSpaceY = function () {
        return 1;
    };
    AtkLogScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    AtkLogScrollItem.prototype.dispose = function () {
        this.challengeBtn = null;
        this.data = null;
        _super.prototype.dispose.call(this);
    };
    return AtkLogScrollItem;
}(ScrollListItem));
//# sourceMappingURL=AtkLogScrollItem.js.map