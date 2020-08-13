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
 * author:qianjun
 * desc:进入跨服亲密活动
*/
var AcCrossServerIntimacyEnterView = (function (_super) {
    __extends(AcCrossServerIntimacyEnterView, _super);
    function AcCrossServerIntimacyEnterView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._scoreTextTab = [];
        _this._countDownText = null;
        _this._serverList = null;
        _this._atkracedes1 = null;
        _this._atkracedes2 = null;
        _this._posArr = [];
        _this._chatTxt = null;
        _this.awardBtn = null;
        _this._zhalan = null;
        _this._cheerBtn = null;
        _this._pRankContainer = null;
        _this._servRankContainer = null;
        _this._middleContainer = null;
        _this._isCanJoin = false;
        _this._cdType = 0;
        return _this;
    }
    Object.defineProperty(AcCrossServerIntimacyEnterView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerIntimacyEnterView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerIntimacyEnterView.prototype, "api", {
        get: function () {
            return Api.crossImacyVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerIntimacyEnterView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerIntimacyEnterView.prototype.getUiCode = function () {
        var code = "1";
        switch (Number(this.code)) {
            default:
                code = "1";
                if (this.vo.checkIsTianjiao()) {
                    code = "7";
                }
                break;
        }
        return code;
    };
    AcCrossServerIntimacyEnterView.prototype.getResourceList = function () {
        var list = [];
        if (this.vo.checkIsTianjiao()) {
            list = [
                "crossserverintititle-" + this.getUiCode(),
                "accrosspower_rankbg1-" + this.getUiCode(),
                "accrosspower_rankbg2-" + this.getUiCode(),
                "accrosspower_rankbg3-" + this.getUiCode(),
                "accrossintimacy_cheerbtnicon-" + this.getUiCode(),
                "accrosspower_cheerbtntxt-" + this.getUiCode(),
            ];
        }
        return _super.prototype.getResourceList.call(this).concat([
            "crossserverintienterbg-1", "atkracecross_award_text", "atkracecross_award", "atkracecross_top",
            "rankinglist_rankbg", , "forpeople_bottom", "atkracecross_rankbg", "atkracecross_rank", "atkracecross_explain",
            ,
            "arena_rank", "arena_rank_text", "commonview_bigframe",
            "dinner_line", "accshegemonyprank1", "accshegemonyprank2", "accshegemonyprank3"
        ]).concat(list);
    };
    AcCrossServerIntimacyEnterView.prototype.getBgName = function () {
        if (this.getUiCode() == "7") {
            return "crossserverintibg-7";
        }
        return "crossserverintienterbg-" + this.param.data.getUiCode;
    };
    AcCrossServerIntimacyEnterView.prototype.getTitleStr = function () {
        if (this.getUiCode() == "7") {
            return null;
        }
        return App.CommonUtil.getCrossLeagueCn("crossImacyTitle-" + this.getUiCode(), this.vo.isCrossLeague());
    };
    AcCrossServerIntimacyEnterView.prototype.getTitleBgName = function () {
        if (this.getUiCode() == "7") {
            return "crossserverintititle-7";
        }
        return "commonview_titlebg" + this.uiType;
    };
    // 初始化背景
    AcCrossServerIntimacyEnterView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 640, 1136);
            this.viewBg = BaseLoadBitmap.create(bgName, rect);
            this.viewBg.setPosition(0, (GameConfig.stageHeigth - this.viewBg.height) * 0.1);
            if (this.getUiCode() == "7") {
                this.viewBg.y = 0;
            }
            this.addChild(this.viewBg);
        }
    };
    AcCrossServerIntimacyEnterView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_ZRANK, requestData: {} };
    };
    AcCrossServerIntimacyEnterView.prototype.receiveData = function (data) {
        var view = this;
        view.api.setZoneRankInfo(data.data.data);
    };
    AcCrossServerIntimacyEnterView.prototype.initView = function () {
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_REFRESH), this.refreshServant, this);
        var view = this;
        var vo = view.vo;
        //当前时间段
        view._cdType = vo.judgeTimeProcess();
        //顶部
        if (this.getUiCode() != "7") {
            var zrankinfo = view.api.zonerankinfos;
            var arr = [];
            for (var i in zrankinfo) {
                arr.push(zrankinfo[i]);
            }
            if (arr.length) {
                if (zrankinfo.length == 2) {
                    view.init_top1();
                }
                else {
                    view.init_top2();
                }
            }
            else {
                view.init_top2();
            }
        }
        //中间
        view.init_middle();
        //底部个人排行榜
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_PRANK, {});
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_PRANK), this.useCallback, this);
        if (this.getUiCode() == "7") {
            this.setBigFameY(0);
            if (!view.vo.isInAcPreTime()) {
                view._middleContainer.visible = false;
            }
        }
    };
    //两区对战
    AcCrossServerIntimacyEnterView.prototype.init_top1 = function () {
        var view = this;
        var api = view.api;
        var topBg = BaseLoadBitmap.create("atkracecross_top");
        topBg.x = 0;
        topBg.y = 89;
        this.addChild(topBg);
        var zonerankinfos = api.zonerankinfos;
        var myServerInfo;
        var otherSerInfo;
        if (zonerankinfos.length) {
            if (Api.mergeServerVoApi.judgeIsSameServer(zonerankinfos[0].zid, Api.mergeServerVoApi.getTrueZid())) {
                myServerInfo = zonerankinfos[0];
                otherSerInfo = zonerankinfos[1];
            }
            else {
                myServerInfo = zonerankinfos[1];
                otherSerInfo = zonerankinfos[0];
            }
            var serverName1 = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, myServerInfo.zid);
            var serverId1 = ComponentManager.getTextField(serverName1, TextFieldConst.FONTSIZE_CONTENT_COMMON);
            serverId1.setPosition(56 - serverId1.width / 2, topBg.y + 46);
            this.addChild(serverId1);
            var serverName2 = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, otherSerInfo.zid);
            var serverId2 = ComponentManager.getTextField(serverName2, TextFieldConst.FONTSIZE_CONTENT_COMMON);
            serverId2.setPosition(GameConfig.stageWidth - 56 - serverId2.width / 2, serverId1.y);
            this.addChild(serverId2);
            this._scoreTextTab.length = 0;
            var serverScore1 = ComponentManager.getBitmapText(String(myServerInfo.point), TextFieldConst.FONTNAME_ITEMTIP);
            serverScore1.setPosition(114, topBg.y + 67);
            this.addChild(serverScore1);
            this._scoreTextTab.push(serverScore1);
            var serverScore2 = ComponentManager.getBitmapText(String(otherSerInfo.point), TextFieldConst.FONTNAME_ITEMTIP);
            serverScore2.setPosition(GameConfig.stageWidth - 110 - serverScore2.width, serverScore1.y);
            this.addChild(serverScore2);
            this._scoreTextTab.push(serverScore2);
        }
    };
    //区服排行
    AcCrossServerIntimacyEnterView.prototype.init_top2 = function () {
        var view = this;
        var api = view.api;
        var zonerankinfos = api.zonerankinfos;
        var topBg = BaseBitmap.create("atkracecross_rankbg");
        topBg.y = 89;
        topBg.height = 224;
        this.addChild(topBg);
        var serverText = BaseBitmap.create("atkracecross_rank");
        serverText.setPosition(GameConfig.stageWidth / 2 - serverText.width / 2, topBg.y + 8);
        this.addChild(serverText);
        var rankText = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText.setPosition(GameConfig.stageWidth / 2 - 155 - rankText.width / 2, topBg.y + 50);
        this.addChild(rankText);
        var qufuText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceServerDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        qufuText.setPosition(GameConfig.stageWidth / 2 - qufuText.width / 2, rankText.y);
        this.addChild(qufuText);
        var pointText = ComponentManager.getTextField(LanguageManager.getlocal("croessImacyScore-" + this.getUiCode()), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        pointText.setPosition(GameConfig.stageWidth / 2 + 155 - pointText.width / 2, rankText.y);
        this.addChild(pointText);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 640, 144);
        var arr = [];
        for (var _i = 0, zonerankinfos_1 = zonerankinfos; _i < zonerankinfos_1.length; _i++) {
            var unit = zonerankinfos_1[_i];
            arr.push({
                zid: unit.zid,
                point: unit.point,
                type: 'enterIn'
            });
        }
        this._serverList = ComponentManager.getScrollList(AcCorssImacyServerItem, arr, rect);
        this.addChild(this._serverList);
        this._serverList.y = topBg.y + 80;
        //描述
        var atkracedes = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes5"), 20);
        atkracedes.x = (GameConfig.stageWidth - atkracedes.textWidth) / 2;
        atkracedes.y = this._serverList.y + 50;
        this.addChild(atkracedes);
        this._atkracedes1 = atkracedes;
        this._atkracedes1.visible = arr.length == 0;
    };
    AcCrossServerIntimacyEnterView.prototype.init_middle = function () {
        var view = this;
        var api = this.api;
        var vo = this.vo;
        var middleContainer = new BaseDisplayObjectContainer();
        this.addChild(middleContainer);
        this._middleContainer = middleContainer;
        var wordsBg = BaseBitmap.create("public_9_wordbg2");
        wordsBg.height = 125;
        middleContainer.width = wordsBg.width;
        middleContainer.height = wordsBg.height;
        middleContainer.x = (GameConfig.stageWidth - wordsBg.width) / 2;
        middleContainer.y = GameConfig.stageHeigth / 2 - 125 / 2;
        middleContainer.addChild(wordsBg);
        var countDownTime = view.api.getCountDownTime();
        var str = LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn(vo.getIsCanJoin() ? App.CommonUtil.getCnByCode("croessImacyJoin", this.getUiCode()) : App.CommonUtil.getCnByCode("croessImacyNotJoin", this.getUiCode()), vo.isCrossLeague()), [LanguageManager.getlocal("crossIntimacyCDTime" + view._cdType) + vo.getCountTimeStr(countDownTime)]);
        var wordsText = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        wordsText.lineSpacing = 6;
        wordsText.setPosition(wordsBg.x + wordsBg.width / 2 - wordsText.textWidth / 2, wordsBg.y + (125 - 78) / 2 + 7);
        wordsText.textAlign = egret.HorizontalAlign.CENTER;
        this._countDownText = wordsText;
        middleContainer.addChild(wordsText);
    };
    AcCrossServerIntimacyEnterView.prototype.tick = function () {
        var view = this;
        var vo = view.vo;
        if (vo.checkZoneRewardDeddot()) {
            App.CommonUtil.addIconToBDOC(view.awardBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view.awardBtn);
        }
        if (view.getUiCode() == "7" && view._cheerBtn) {
            if (vo.isCheerRedDot()) {
                App.CommonUtil.addIconToBDOC(view._cheerBtn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(view._cheerBtn);
            }
        }
        if (this._chatTxt) {
            var showStr = Api.chatVoApi.getLastAcCrossMessage();
            if (!showStr) {
                showStr = "";
            }
            else {
                var zonename = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, showStr.zoneid);
                showStr = LanguageManager.getlocal('acCrossServeDes', [zonename]) + showStr.sendername + ":" + (showStr.content.message.length > 15 ? (showStr.content.message.substring(0, 16) + "...") : showStr.content.message);
            }
            var emoticonStr = Api.emoticonVoApi.chatStrChangeLocal(showStr);
            if (emoticonStr) {
                showStr = emoticonStr;
            }
            this._chatTxt.text = showStr;
        }
        if (view._countDownText) {
            if (view.getUiCode() == "7" && (!view.vo.isInAcPreTime())) {
                view._middleContainer.visible = false;
                return;
            }
            view._middleContainer.visible = true;
            var countDownTime = view.api.getCountDownTime();
            if (countDownTime <= 0) {
                view._cdType = view.vo.judgeTimeProcess();
                if (view._cdType == 4) {
                    view.hide();
                    App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime4"));
                    return;
                }
            }
            view._countDownText.text = LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn(vo.getIsCanJoin() ? App.CommonUtil.getCnByCode("croessImacyJoin", this.getUiCode()) : App.CommonUtil.getCnByCode("croessImacyNotJoin", this.getUiCode()), this.vo.isCrossLeague()), [LanguageManager.getlocal("crossIntimacyCDTime" + view._cdType) + vo.getCountTimeStr(countDownTime)]);
        }
    };
    AcCrossServerIntimacyEnterView.prototype.refreshEnterBtn = function () {
    };
    //前三名信息
    AcCrossServerIntimacyEnterView.prototype.showTopRankInfo = function () {
        if (this.vo.isInAcPreTime()) {
            return;
        }
        var arr = [];
        for (var i in this.api.prankinfos) {
            var unit = this.api.prankinfos[i];
            arr.push(unit);
        }
        if (arr.length < 3) {
            return;
        }
        var count = 3;
        //信息
        var infoPos = [232, 20, 444];
        var rolePosX = [80, -115, 310];
        for (var i = 0; i < count; i++) {
            var bg = BaseBitmap.create(App.CommonUtil.getResByCode("accrosspower_rankbg" + (i + 1), this.getUiCode(), "7"));
            bg.x = infoPos[i];
            if (i == 0) {
                // bg.x = GameConfig.stageWidth/2 - bg.width/2;
                bg.y = GameConfig.stageHeigth - 560;
            }
            else {
                // bg.x = GameConfig.stageWidth/2 + (i%2 == 0 ? 1 : -1) * 200;
                bg.y = GameConfig.stageHeigth - 545;
            }
            this.addChild(bg);
            var name_1 = ComponentManager.getTextField(arr[i].name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            name_1.setPosition(bg.x + bg.width / 2 - name_1.width / 2, bg.y + 30);
            this.addChild(name_1);
            var sidname = '';
            if (arr[i].uid) {
                sidname = Api.mergeServerVoApi.getAfterMergeSeverName(arr[i].uid);
            }
            else {
                sidname = LanguageManager.getlocal("ranserver2", [arr[i].zid.toString()]);
            }
            var server = ComponentManager.getTextField(sidname, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            server.setPosition(bg.x + bg.width / 2 - server.width / 2, name_1.y + name_1.height + 4);
            this.addChild(server);
            var power = ComponentManager.getTextField(arr[i].point, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_GREEN);
            power.setPosition(bg.x + bg.width / 2 - power.width / 2, bg.y + 80);
            this.addChild(power);
            var rank = BaseBitmap.create("accshegemonyprank" + (i + 1));
            rank.setPosition(bg.x + bg.width / 2 - rank.width / 2, power.y + power.height + 2);
            this.addChild(rank);
            var role = this.getRoleContainer(arr[i]);
            if (i == 0) {
                role.setScale(0.7);
                role.y = GameConfig.stageHeigth - 750;
            }
            else {
                role.setScale(0.65);
                role.y = GameConfig.stageHeigth - 730;
            }
            role.x = rolePosX[i];
            this.addChildAt(role, this.getChildIndex(this._zhalan) - 1);
        }
    };
    //底部
    AcCrossServerIntimacyEnterView.prototype.initBottom = function () {
        var personRankCon = new BaseDisplayObjectContainer();
        this._pRankContainer = personRankCon;
        var bottomBg = BaseBitmap.create("public_9_downbg");
        bottomBg.height = 200;
        bottomBg.width = 620;
        bottomBg.x = 10;
        personRankCon.width = GameConfig.stageWidth;
        personRankCon.height = bottomBg.height;
        personRankCon.setPosition(0, GameConfig.stageHeigth - 200);
        personRankCon.addChild(bottomBg);
        //个人排行榜
        var rankListText = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankListText.setPosition(30, bottomBg.y + 20);
        personRankCon.addChild(rankListText);
        //玩家昵称
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.setPosition(rankListText.x + rankListText.textWidth + 100, rankListText.y);
        personRankCon.addChild(nameText);
        //标题区服
        var quText = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        quText.setPosition(nameText.x + nameText.textWidth + 100, rankListText.y);
        personRankCon.addChild(quText);
        //亲密涨幅
        var scoreText = ComponentManager.getTextField(LanguageManager.getlocal("croessImacyScore-" + this.getUiCode()), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreText.setPosition(quText.x + quText.textWidth + 100, rankListText.y);
        personRankCon.addChild(scoreText);
        if (PlatformManager.checkIsEnLang()) {
            rankListText.x = 40 + (44 - rankListText.width) / 2;
            nameText.x = 184 + (88 - nameText.width) / 2;
            quText.x = 372 + (44 - quText.width) / 2;
            scoreText.x = 516 + (88 - scoreText.width) / 2;
        }
        //列表数据
        var scroRect = new egret.Rectangle(bottomBg.x, rankListText.y + rankListText.textHeight, bottomBg.width, 100);
        var arr = [];
        for (var i in this.api.prankinfos) {
            var unit = this.api.prankinfos[i];
            unit.type = 'enterIn';
            unit.imacy = true;
            arr.push(unit);
        }
        this._scrollList = ComponentManager.getScrollList(AcCorssImacyPRankItem, arr, scroRect);
        this._scrollList.x = personRankCon.width / 2 - this._scrollList.width / 2 - 20;
        this._scrollList.y = rankListText.y + rankListText.textHeight + 10;
        personRankCon.addChild(this._scrollList);
        //描述
        var atkracedes = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes5"), 20);
        atkracedes.x = (GameConfig.stageWidth - atkracedes.textWidth) / 2;
        atkracedes.y = this._scrollList.y + 50;
        personRankCon.addChild(atkracedes);
        this._atkracedes2 = atkracedes;
        this._atkracedes2.visible = arr.length == 0;
        //分割线
        var lineImg = BaseBitmap.create("dinner_line");
        lineImg.x = (bottomBg.width - lineImg.width) / 2;
        lineImg.y = this._scrollList.y + scroRect.height + 7;
        personRankCon.addChild(lineImg);
        if (PlatformManager.checkIsKRSp()) {
            if (this.getUiCode() == "7") {
                nameText.x += 12;
                quText.x += 23;
                scoreText.x += 5;
            }
        }
        else if (PlatformManager.checkIsRuLang()) {
            if (this.getUiCode() == "7") {
                nameText.x += 20;
                quText.x += 40;
                scoreText.x -= 20;
            }
        }
        //自己排名
        var rankStr;
        var meRank = this.api.merank;
        if (meRank) {
            if (meRank > 300) {
                rankStr = "10000+";
            }
            else {
                rankStr = meRank.toString();
            }
        }
        else {
            rankStr = LanguageManager.getlocal(this.vo.getIsCanJoin() ? "atkracedes4" : "crossImacyNoAccess"); // this._merank.toString();
        }
        var rank = ComponentManager.getTextField(rankStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
        rank.setPosition(rankListText.x + (rankListText.textWidth - rank.textWidth) / 2, lineImg.y + lineImg.height + 10);
        personRankCon.addChild(rank);
        //自己名字
        var name = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
        name.setPosition(nameText.x + (nameText.textWidth - name.textWidth) / 2, rank.y);
        personRankCon.addChild(name);
        //自己区服
        var currZid = Api.mergeServerVoApi.getTrueZid();
        var servaername = Api.mergeServerVoApi.getAfterMergeSeverName();
        var serveText = ComponentManager.getTextField(servaername, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
        serveText.setPosition(quText.x + (quText.textWidth - serveText.textWidth) / 2, name.y);
        personRankCon.addChild(serveText);
        //自己分数
        var str = "";
        var mePoint = this.api.mepoint;
        if (mePoint) {
            str = mePoint.toString();
        }
        else {
            str = "0";
        }
        var qinmiText = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
        qinmiText.setPosition(scoreText.x + (scoreText.textWidth - qinmiText.textWidth) / 2, serveText.y);
        personRankCon.addChild(qinmiText);
        var chatContainer = new BaseDisplayObjectContainer();
        var chatbg = null;
        if (1) {
            //跨服聊天消息
            chatbg = BaseBitmap.create(ResourceManager.getRes("mainui_chatbg"));
            chatbg.width = GameConfig.stageWidth;
            chatbg.height = 35;
            if (this.getUiCode() == "7") {
                chatbg.width = 620;
            }
            chatbg.x = GameConfig.stageWidth / 2 - chatbg.width / 2;
            chatContainer.width = GameConfig.stageWidth;
            chatContainer.height = chatbg.height;
            chatContainer.setPosition(0, personRankCon.y - 7 - chatbg.height);
            chatContainer.addChild(chatbg);
            chatbg.touchEnabled = true;
            chatbg.addTouchTap(this.chatBgClickHandler, this);
            var chatIcon = BaseBitmap.create(ResourceManager.getRes("mainui_chatIcon"));
            chatIcon.anchorOffsetX = chatIcon.width / 2;
            chatIcon.anchorOffsetY = chatIcon.height / 2;
            chatIcon.x = chatIcon.width / 2 + 10;
            chatIcon.y = chatbg.y + chatbg.height / 2;
            chatContainer.addChild(chatIcon);
            egret.Tween.get(chatIcon, {
                loop: true,
            }).to({ scaleX: 0.8, scaleY: 0.8 }, 1000).to({ scaleX: 1, scaleY: 1.0 }, 1000); //设置2000毫秒内 rotation 属性变为360
            var showStr = Api.chatVoApi.getLastAcCrossMessage();
            if (!showStr) {
                showStr = "";
            }
            else {
                var zonename = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, showStr.zoneid);
                showStr = LanguageManager.getlocal('acCrossServeDes', [zonename]) + showStr.sendername + ":" + (showStr.content.message.length > 15 ? (showStr.content.message.substring(0, 16) + "...") : showStr.content.message);
            }
            var emoticonStr = Api.emoticonVoApi.chatStrChangeLocal(showStr);
            if (emoticonStr) {
                showStr = emoticonStr;
            }
            this._chatTxt = ComponentManager.getTextField(showStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
            // this._chatTxt.x = chatIcon.x + 20;
            // this._chatTxt.y = chatIcon.y - this._chatTxt.height/2;
            this._chatTxt.width = 480;
            this._chatTxt.height = 20;
            // this._chatTxt.lineSpacing = 50;
            this.setLayoutPosition(LayoutConst.leftverticalCenter, this._chatTxt, chatbg, [chatIcon.x + chatIcon.width + 5, 0]);
            chatContainer.addChild(this._chatTxt);
        }
        if (this.getUiCode() == "7") {
            var zhalan = BaseBitmap.create("crossserverintizhalan-7");
            zhalan.y = GameConfig.stageHeigth - 240 - zhalan.height + 255;
            this.addChild(zhalan);
            this._zhalan = zhalan;
            this.showTopRankInfo();
        }
        this.addChild(chatContainer);
        this.addChild(personRankCon);
        var btnContainer = new BaseDisplayObjectContainer();
        btnContainer.width = GameConfig.stageWidth;
        this.addChild(btnContainer);
        //活动奖励按钮
        var awardBg = ComponentManager.getButton("forpeople_bottom", null, this.rewardHandle, this, null, 0);
        btnContainer.height = awardBg.height;
        btnContainer.setPosition(0, personRankCon.y - 10 - awardBg.height - chatContainer.height);
        if (this.getUiCode() == "7") {
            btnContainer.setPosition(0, 100);
            var frame = BaseBitmap.create("commonview_bigframe");
            frame.width = GameConfig.stageWidth;
            frame.height = 302;
            frame.y = GameConfig.stageHeigth - frame.height;
            this.addChild(frame);
        }
        // awardBg.setPosition(0,bottomBg.y - 10 - awardBg.height - (chatbg ? chatbg.height : 0));
        btnContainer.addChild(awardBg);
        this.awardBtn = awardBg;
        var awardIcon = BaseBitmap.create("atkracecross_award");
        awardIcon.setPosition(awardBg.width / 2 - awardIcon.width / 2, awardBg.height / 2 - awardIcon.height / 2 - 5);
        awardBg.addChild(awardIcon);
        var awardText = BaseBitmap.create("atkracecross_award_text");
        awardText.setPosition(awardBg.width / 2 - awardText.width / 2, awardIcon.y + awardIcon.height - 30);
        awardBg.addChild(awardText);
        //排行榜按钮
        var rankBg = ComponentManager.getButton("forpeople_bottom", null, this.rankHandle, this, null, 0);
        rankBg.setPosition(GameConfig.stageWidth - rankBg.width - 5, awardBg.y);
        btnContainer.addChild(rankBg);
        var rankIcon = BaseBitmap.create("arena_rank");
        rankIcon.setPosition(rankBg.width / 2 - rankIcon.width / 2, rankBg.height / 2 - rankIcon.height / 2 - 5);
        rankBg.addChild(rankIcon);
        var rankText = BaseBitmap.create("arena_rank_text");
        rankText.setPosition(rankBg.width / 2 - rankText.width / 2, rankIcon.y + rankIcon.height - 30);
        rankBg.addChild(rankText);
        //详情按钮
        var ruleBg = ComponentManager.getButton("forpeople_bottom", null, this.clickDetailBtnHandler, this);
        btnContainer.addChildAt(ruleBg, 100);
        var ruleicon = BaseBitmap.create("atkracecross_explain");
        ruleBg.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, ruleicon, ruleBg, [0, 0], true);
        ruleBg.addChild(ruleicon);
        if (LocalStorageManager.get(LocalStorageConst.LOCAL_IMACY_RULE) == '') {
            this.clickDetailBtnHandler(1);
            LocalStorageManager.set(LocalStorageConst.LOCAL_IMACY_RULE, '1');
        }
        if (PlatformManager.hasSpcialCloseBtn()) {
            this.setLayoutPosition(LayoutConst.horizontalCentertop, ruleBg, rankBg, [0, -ruleBg.height - 10]);
        }
        else {
            ruleBg.x = 122;
            ruleBg.y = awardBg.y;
        }
        if (this.getUiCode() == "7") {
            //活动助威按钮
            var cheerBg = ComponentManager.getButton("forpeople_bottom", null, this.cheerHandler, this, null, 0);
            cheerBg.setPosition(rankBg.x - cheerBg.width - 23, awardBg.y);
            btnContainer.addChild(cheerBg);
            this._cheerBtn = cheerBg;
            var cheerIcon = BaseBitmap.create(App.CommonUtil.getResByCode("accrossintimacy_cheerbtnicon", this.getUiCode()));
            cheerIcon.setPosition(cheerBg.width / 2 - cheerIcon.width / 2, cheerBg.height / 2 - cheerIcon.height / 2 - 5);
            cheerBg.addChild(cheerIcon);
            var cheerText = BaseBitmap.create(App.CommonUtil.getResByCode("accrosspower_cheerbtntxt", this.getUiCode()));
            cheerText.setPosition(awardBg.width / 2 - cheerText.width / 2, cheerIcon.y + cheerIcon.height - 30);
            cheerBg.addChild(cheerText);
            chatContainer.setPosition(0, GameConfig.stageHeigth - chatContainer.height - 10);
            personRankCon.y = chatContainer.y - personRankCon.height;
            this.initServerRank();
            //tab
            var tabTextArr = [
                App.CommonUtil.getCnByCode("acCrossserverPowerPlayerRank", this.getUiCode()),
                App.CommonUtil.getCnByCode("acCrossserverPowerServerRank", this.getUiCode())
            ];
            var tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(), tabTextArr, this.tabbarGroupClick, this);
            tabbarGroup.setSpace(0);
            tabbarGroup.setPosition(GameConfig.stageWidth / 2 - tabbarGroup.width / 2, personRankCon.y - tabbarGroup.height + 4);
            this.addChild(tabbarGroup);
            tabbarGroup.selectedIndex = 0;
            tabbarGroup.setColor(0xe1ba86, 0x472c26);
            if (this.getTabbarName() == ButtonConst.BTN2_TAB || this.getTabbarName() == ButtonConst.BTN_BIG_TAB2) {
                tabbarGroup.addZshi();
            }
            this.tabbarGroupClick({ index: 0 });
            //btncon
        }
    };
    AcCrossServerIntimacyEnterView.prototype.cheerHandler = function () {
        if (!this.vo.isStart) {
            this.vo.showAcEndTip();
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERINITMACYCHEERVIEW2, {
            aid: this.param.data.aid,
            code: this.param.data.code,
        });
    };
    AcCrossServerIntimacyEnterView.prototype.chatBgClickHandler = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.CHATACTIVITYCROSSVIEW, { activeID: this.vo.aidAndCode });
    };
    AcCrossServerIntimacyEnterView.prototype.useCallback = function (event) {
        Api.crossImacyVoApi.setPRankInfo(event.data.data.data);
        if (!this._scrollList) {
            this.initBottom();
        }
    };
    AcCrossServerIntimacyEnterView.prototype.tabbarGroupClick = function (data) {
        App.LogUtil.log("tabbarGroupClick " + data.index);
        if (data.index == 0) {
            this._pRankContainer.visible = true;
            this._servRankContainer.visible = false;
        }
        else if (data.index == 1) {
            this._pRankContainer.visible = false;
            this._servRankContainer.visible = true;
        }
    };
    //底部区服排行
    AcCrossServerIntimacyEnterView.prototype.initServerRank = function () {
        var container = new BaseDisplayObjectContainer();
        this.addChild(container);
        this._servRankContainer = container;
        var bottomBg = BaseBitmap.create("public_9_downbg");
        bottomBg.height = 200;
        bottomBg.width = 620;
        bottomBg.x = 10;
        container.addChild(bottomBg);
        container.width = GameConfig.stageWidth;
        container.height = bottomBg.height;
        container.setPosition(this._pRankContainer.x, this._pRankContainer.y);
        bottomBg.x = container.width / 2 - bottomBg.width / 2;
        var rankText = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText.setPosition(GameConfig.stageWidth / 2 - 155 - rankText.width / 2, bottomBg.y + 20);
        container.addChild(rankText);
        var qufuText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceServerDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        qufuText.setPosition(GameConfig.stageWidth / 2 - qufuText.width / 2, rankText.y);
        container.addChild(qufuText);
        var pointText = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("croessImacyScore", this.getUiCode())), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        pointText.setPosition(GameConfig.stageWidth / 2 + 155 - pointText.width / 2, rankText.y);
        container.addChild(pointText);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 640, 124);
        var zonerankinfos = this.api.zonerankinfos;
        var arr = [];
        for (var _i = 0, zonerankinfos_2 = zonerankinfos; _i < zonerankinfos_2.length; _i++) {
            var unit = zonerankinfos_2[_i];
            arr.push({
                zid: unit.zid,
                point: unit.point,
                type: 'enterIn'
            });
        }
        var serverList = ComponentManager.getScrollList(AcCorssImacyServerItem, arr, rect);
        container.addChild(serverList);
        serverList.y = pointText.y + pointText.height + 10;
        serverList.x = container.width / 2 - serverList.width / 2;
        serverList.setEmptyTip(LanguageManager.getlocal("atkracedes5"));
    };
    AcCrossServerIntimacyEnterView.prototype.rankHandle = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERINTIMACYRANKLISTVIEW, {
            aid: this.param.data.aid,
            code: this.param.data.code
        });
    };
    AcCrossServerIntimacyEnterView.prototype.rewardHandle = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERINTIMACYREWARDVIEW, {
            aid: this.param.data.aid,
            code: this.param.data.code
        });
    };
    AcCrossServerIntimacyEnterView.prototype.refreshServant = function () {
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_PRANK, {});
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_ZRANK, {});
    };
    AcCrossServerIntimacyEnterView.prototype.clickDetailBtnHandler = function (param) {
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERDETAILPOPUPVIEW, {
            aid: this.param.data.aid,
            code: this.param.data.code,
            getUiCode: this.param.data.getUiCode,
        });
    };
    AcCrossServerIntimacyEnterView.prototype.getRoleContainer = function (data) {
        if (!data) {
            return null;
        }
        var titleData = App.CommonUtil.getTitleData(data.title);
        var curLevel = 1;
        if (titleData.clv) {
            curLevel = titleData.clv;
        }
        var titleconfig = null;
        var curTitleId = null;
        if (titleData.clothes) {
            titleconfig = Config.TitleCfg.getTitleCfgById(titleData.clothes);
            curTitleId = titleData.clothes;
        }
        if (titleconfig && titleconfig.isTitle == 1 && (titleconfig.titleType == 1 || titleconfig.titleType == 2 || titleconfig.titleType == 7)) {
            curTitleId = titleData.clothes;
            curLevel = titleData.tlv;
            if (curLevel == 0) {
                curLevel = 1;
            }
        }
        var userContainer = null;
        App.LogUtil.log("EmperorOutFirstAniView:curTitleId " + curTitleId);
        if (curTitleId) {
            userContainer = new BaseDisplayObjectContainer();
            userContainer.name = "userContainer";
            this.addChildToContainer(userContainer);
            var role = null;
            var tcfg = Config.TitleCfg.getTitleCfgById(curTitleId);
            var resPath = "palace_db_" + curTitleId + (tcfg.titleType == 7 ? "_" + Api.playerVoApi.getUserSex(data.pic) : "");
            if ((!Api.switchVoApi.checkCloseBone()) && App.CommonUtil.check_dragon() && ResourceManager.hasRes(resPath + "_ske")) {
                App.LogUtil.log("aaa dragonbone ");
                role = App.CommonUtil.getPlayerDragonRole(curTitleId, data.pic, curLevel, true);
                role.x = 340; //w432, h508
                role.y = 35;
                userContainer.addChild(role);
                role.name = 'role';
                userContainer.height = 790;
            }
            else {
                role = Api.playerVoApi.getPlayerPortrait(Number(curTitleId), data.pic, null, null, null, null, null, true);
                role.y = -30;
                var isnew = Api.playerVoApi.getNewPalaceRole(curTitleId);
                if (isnew) {
                    role.x = 0;
                }
                else {
                    role.x = 155;
                }
                userContainer.addChild(role);
                userContainer.height = 765;
            }
        }
        else {
            userContainer = new BaseDisplayObjectContainer();
            // let role = Api.playerVoApi.getPlayerPortrait(Number(data.level), data.pic,0,false,null,null,curLevel);
            var role = Api.playerVoApi.getPlayerPortrait(Number(data.level), data.pic);
            role.width = 300;
            role.y = -30;
            role.x = 190;
            userContainer.name = "userContainer";
            userContainer.addChild(role);
            userContainer.height = 765;
        }
        return userContainer;
    };
    AcCrossServerIntimacyEnterView.prototype.hide = function () {
        _super.prototype.hide.call(this);
        ViewController.getInstance().hideAllView();
    };
    AcCrossServerIntimacyEnterView.prototype.dispose = function () {
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_REFRESH), this.refreshServant, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_PRANK), this.useCallback, this);
        this._scrollList = null;
        this._scoreTextTab = [];
        this._scoreTextTab.length = 0;
        this._countDownText = null;
        this._serverList = null;
        this._isCanJoin = false;
        this._atkracedes1 = null;
        this._atkracedes2 = null;
        this._chatTxt = null;
        this.awardBtn = null;
        this._pRankContainer = null;
        this._servRankContainer = null;
        this._middleContainer = null;
        this._cheerBtn = null;
        this._zhalan = null;
        Api.chatVoApi.clearAcCrossChatList();
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerIntimacyEnterView;
}(CommonView));
__reflect(AcCrossServerIntimacyEnterView.prototype, "AcCrossServerIntimacyEnterView");
//# sourceMappingURL=AcCrossServerIntimacyEnterView.js.map