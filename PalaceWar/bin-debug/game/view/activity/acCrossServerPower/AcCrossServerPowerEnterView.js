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
 * desc:进入跨服权势活动
*/
var AcCrossServerPowerEnterView = (function (_super) {
    __extends(AcCrossServerPowerEnterView, _super);
    function AcCrossServerPowerEnterView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._scoreTextTab = [];
        _this._countDownText = null;
        _this._serverList = null;
        _this._atkracedes1 = null;
        _this._atkracedes2 = null;
        _this._chatTxt = null;
        _this.awardBtn = null;
        _this._isCanJoin = false;
        _this._cdType = 0;
        _this._pRankContainer = null;
        _this._servRankContainer = null;
        _this._middleContainer = null;
        _this._cheerBtn = null;
        _this._topBg = null;
        return _this;
    }
    Object.defineProperty(AcCrossServerPowerEnterView.prototype, "api", {
        get: function () {
            return Api.crossPowerVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerPowerEnterView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerPowerEnterView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerPowerEnterView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerPowerEnterView.prototype.getUiCode = function () {
        var code = "1";
        switch (Number(this.code)) {
            default:
                code = "1";
                if (this.vo.checkIsFengyun()) {
                    code = "7";
                }
                break;
        }
        return code;
    };
    AcCrossServerPowerEnterView.prototype.getResourceList = function () {
        var list = [];
        if (this.vo.checkIsFengyun()) {
            list = [
                "accrosspower_titlebg-" + this.getUiCode(),
                "crosspowerbgtop-" + this.getUiCode(),
                "accrosspower_cheerbtn-" + this.getUiCode(),
                "accrosspower_rankbg1-" + this.getUiCode(),
                "accrosspower_rankbg2-" + this.getUiCode(),
                "accrosspower_rankbg3-" + this.getUiCode(),
                "accrosspower_cheerbtnicon-" + this.getUiCode(),
                "accrosspower_cheerbtntxt-" + this.getUiCode(),
            ];
        }
        return _super.prototype.getResourceList.call(this).concat([
            "crossserverintienterbg-1", "atkracecross_award_text", "atkracecross_award", "atkracecross_top",
            "rankinglist_rankbg", , "forpeople_bottom", "atkracecross_rankbg", "atkracecross_rank", "atkracecross_explain",
            ,
            "arena_rank", "arena_rank_text", "crosspowerdetailbg-1",
            "dinner_line", "rankinglist_rank1", "rankinglist_rank2", "rankinglist_rank3", "crosspowerbg", "commonview_bigframe", , "accshegemonyprank1", "accshegemonyprank2", "accshegemonyprank3",
        ]).concat(list);
    };
    AcCrossServerPowerEnterView.prototype.getBgName = function () {
        return "crosspowerbg-" + this.getUiCode();
    };
    AcCrossServerPowerEnterView.prototype.getTitleBgName = function () {
        if (this.getUiCode() == "7") {
            return App.CommonUtil.getResByCode("accrosspower_titlebg", this.getUiCode());
        }
        return "commonview_titlebg" + this.uiType;
    };
    AcCrossServerPowerEnterView.prototype.getTitleStr = function () {
        if (this.getUiCode() == "7") {
            return null;
        }
        return App.CommonUtil.getCrossLeagueCn("crossPowerTitle-" + this.getUiCode(), this.vo.isCrossLeague());
    };
    AcCrossServerPowerEnterView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    // 初始化背景
    AcCrossServerPowerEnterView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseLoadBitmap.create(bgName);
            this.viewBg.y = (GameConfig.stageHeigth - 1136);
            if (this.getUiCode() == "7") {
                this.viewBg.y = 0;
            }
            this.addChild(this.viewBg);
        }
    };
    AcCrossServerPowerEnterView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_ZRANK, requestData: {} };
    };
    AcCrossServerPowerEnterView.prototype.receiveData = function (data) {
        var view = this;
        view.api.setZoneRankInfo(data.data.data);
    };
    AcCrossServerPowerEnterView.prototype.initView = function () {
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_REFRESH), this.refreshServant, this);
        var view = this;
        var vo = view.vo;
        if (this.getUiCode() == "7") {
            var topBg = BaseBitmap.create(App.CommonUtil.getResByCode("crosspowerbgtop", this.getUiCode(), "7"));
            topBg.y = GameConfig.stageHeigth - topBg.height;
            this._topBg = topBg;
            this.addChild(topBg);
            var frame = BaseBitmap.create("commonview_bigframe");
            frame.width = GameConfig.stageWidth;
            frame.height = 302;
            frame.y = GameConfig.stageHeigth - frame.height;
            this.addChild(frame);
        }
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
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_PRANK, { index: 1 });
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_PRANK), this.useCallback, this);
        if (LocalStorageManager.get(LocalStorageConst.LOCAL_POWER_RULE) == '') {
            view.clickDetailBtnHandler(1);
            LocalStorageManager.set(LocalStorageConst.LOCAL_POWER_RULE, '1');
        }
        if (this.getUiCode() == "7") {
            this.setBigFameY(0);
            if (!view.vo.isInAcPreTime()) {
                view._middleContainer.visible = false;
            }
        }
    };
    //两区对战
    AcCrossServerPowerEnterView.prototype.init_top1 = function () {
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
    AcCrossServerPowerEnterView.prototype.init_top2 = function () {
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
        var pointText = ComponentManager.getTextField(LanguageManager.getlocal("croessPowerScore-" + this.getUiCode()), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
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
    AcCrossServerPowerEnterView.prototype.init_middle = function () {
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
        // let str = LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn(vo.getIsCanJoin() ? `croessPowerJoin-${this.getUiCode()}` : `croessPowerNotJoin-${this.getUiCode()}`, vo.isCrossLeague()), [LanguageManager.getlocal(`crossIntimacyCDTime${view._cdType}`) + vo.getCountTimeStr(countDownTime)]);
        var str = LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn(vo.getIsCanJoin() ? App.CommonUtil.getCnByCode("croessPowerJoin", this.getUiCode()) : App.CommonUtil.getCnByCode("croessPowerNotJoin", this.getUiCode()), vo.isCrossLeague()), [LanguageManager.getlocal("crossIntimacyCDTime" + view._cdType) + vo.getCountTimeStr(countDownTime)]);
        var wordsText = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        wordsText.lineSpacing = 6;
        wordsText.setPosition(wordsBg.x + wordsBg.width / 2 - wordsText.textWidth / 2, wordsBg.y + (125 - 78) / 2 + 7);
        wordsText.textAlign = egret.HorizontalAlign.CENTER;
        this._countDownText = wordsText;
        middleContainer.addChild(wordsText);
    };
    AcCrossServerPowerEnterView.prototype.tick = function () {
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
            view._countDownText.text = LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn(vo.getIsCanJoin() ? App.CommonUtil.getCnByCode("croessPowerJoin", this.getUiCode()) : App.CommonUtil.getCnByCode("croessPowerNotJoin", this.getUiCode()), this.vo.isCrossLeague()), [LanguageManager.getlocal("crossIntimacyCDTime" + view._cdType) + vo.getCountTimeStr(countDownTime)]);
        }
    };
    AcCrossServerPowerEnterView.prototype.refreshEnterBtn = function () {
    };
    //前三名信息
    AcCrossServerPowerEnterView.prototype.showTopRankInfo = function () {
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
            this.addChildAt(role, this.getChildIndex(this._topBg) - 1);
        }
    };
    //底部
    AcCrossServerPowerEnterView.prototype.initBottom = function () {
        var personRankCon = new BaseDisplayObjectContainer();
        this.addChild(personRankCon);
        this._pRankContainer = personRankCon;
        var bottomBg = BaseBitmap.create("public_9_downbg");
        bottomBg.height = 200;
        bottomBg.width = GameConfig.stageWidth;
        // bottomBg.y = GameConfig.stageHeigth - 200;
        // this.addChild(bottomBg);
        personRankCon.width = GameConfig.stageWidth;
        personRankCon.height = bottomBg.height;
        personRankCon.setPosition(0, GameConfig.stageHeigth - 200);
        personRankCon.addChild(bottomBg);
        if (this.getUiCode() == "7") {
            bottomBg.width = 620;
        }
        bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width / 2;
        //个人排行榜
        var rankListText = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankListText.setPosition(30, bottomBg.y + 20);
        personRankCon.addChild(rankListText);
        if (this.getUiCode() == "7") {
            rankListText.x = 40;
        }
        //玩家昵称
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.setPosition(rankListText.x + rankListText.textWidth + 100, rankListText.y);
        personRankCon.addChild(nameText);
        //标题区服
        var quText = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        quText.setPosition(nameText.x + nameText.textWidth + 100, rankListText.y);
        personRankCon.addChild(quText);
        //亲密涨幅
        var scoreText = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("croessPowerScore", this.getUiCode())), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreText.setPosition(quText.x + quText.textWidth + 100, rankListText.y);
        personRankCon.addChild(scoreText);
        //列表数据
        var scroRect = new egret.Rectangle(bottomBg.x, rankListText.y + rankListText.textHeight, bottomBg.width, 100);
        var arr = [];
        for (var i in this.api.prankinfos) {
            var unit = this.api.prankinfos[i];
            unit.type = 'enterIn';
            unit.crosspower = true;
            arr.push(unit);
        }
        this._scrollList = ComponentManager.getScrollList(AcCorssImacyPRankItem, arr, scroRect);
        this._scrollList.x = personRankCon.width / 2 - this._scrollList.width / 2 - 10;
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
        if (PlatformManager.checkIsEnSp()) {
            if (this.getUiCode() == "7") {
                quText.x += 34;
                scoreText.x += 56;
            }
            else {
                rankListText.x -= 18;
                nameText.x -= 42;
                quText.x -= 31;
                scoreText.x -= 13;
            }
        }
        else if (PlatformManager.checkIsThSp()) {
            if (this.getUiCode() == "7") {
                rankListText.x -= 6;
                quText.x += 6;
                scoreText.x += 15;
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
        //let currZid:any = Api.mergeServerVoApi.getTrueZid();//ServerCfg.selectServer.zid;
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
        this.addChild(chatContainer);
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
            // chatbg.x = 0;
            // chatbg.y = bottomBg.y - 10 - chatbg.height - 3;
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
            this._chatTxt.width = 480;
            this._chatTxt.height = 20;
            this.setLayoutPosition(LayoutConst.leftverticalCenter, this._chatTxt, chatbg, [chatIcon.x + chatIcon.width + 5, 0]);
            chatContainer.addChild(this._chatTxt);
        }
        if (this.getUiCode() == "7") {
            this.showTopRankInfo();
        }
        //活动奖励按钮
        var btnContainer = new BaseDisplayObjectContainer();
        btnContainer.width = GameConfig.stageWidth;
        this.addChild(btnContainer);
        var awardBg = ComponentManager.getButton("forpeople_bottom", null, this.rewardHandle, this, null, 0);
        btnContainer.height = awardBg.height;
        btnContainer.setPosition(0, personRankCon.y - 10 - awardBg.height - chatContainer.height);
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
        rankBg.setPosition(GameConfig.stageWidth - rankBg.width - 10, awardBg.y);
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
            var cheerIcon = BaseBitmap.create(App.CommonUtil.getResByCode("accrosspower_cheerbtnicon", this.getUiCode()));
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
            btnContainer.y = personRankCon.y - 60 - btnContainer.height;
        }
    };
    AcCrossServerPowerEnterView.prototype.getTabbarName = function () {
        return ButtonConst.BTN_BIG_TAB2;
    };
    AcCrossServerPowerEnterView.prototype.tabbarGroupClick = function (data) {
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
    AcCrossServerPowerEnterView.prototype.initServerRank = function () {
        var container = new BaseDisplayObjectContainer();
        this.addChild(container);
        this._servRankContainer = container;
        var bottomBg = BaseBitmap.create("public_9_downbg");
        bottomBg.height = 200;
        bottomBg.width = 620;
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
        var pointText = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("croessPowerScore", this.getUiCode())), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
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
    AcCrossServerPowerEnterView.prototype.chatBgClickHandler = function () {
        if (this.getUiCode() == "7") {
            var notChat = true;
            var playerLv = Api.playerVoApi.getPlayerLevel();
            if (this.vo.getIsCanJoin() || playerLv >= this.cfg.needLv) {
                notChat = false;
            }
            var tipStr = "";
            if (notChat) {
                if (!this.vo.getIsCanJoin()) {
                    tipStr = LanguageManager.getlocal("acCrossServerPowerAcNotChat1");
                    if (playerLv < this.cfg.needLv) {
                        var lv = LanguageManager.getlocal("officialTitle" + this.cfg.needLv);
                        tipStr = LanguageManager.getlocal("acCrossServerPowerAcNotChat2", [lv]);
                    }
                }
            }
            ViewController.getInstance().openView(ViewConst.COMMON.CHATACTIVITYCROSSVIEW, { activeID: this.vo.aidAndCode, notChat: notChat, sendTip: tipStr });
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.CHATACTIVITYCROSSVIEW, { activeID: this.vo.aidAndCode });
    };
    AcCrossServerPowerEnterView.prototype.useCallback = function (event) {
        if (event.data.ret == false) {
            return;
        }
        Api.crossPowerVoApi.setPRankInfo(event.data.data.data);
        if (!this._scrollList) {
            this.initBottom();
        }
    };
    AcCrossServerPowerEnterView.prototype.rankHandle = function () {
        if (!this.vo.isStart) {
            this.vo.showAcEndTip();
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERPOWERRANKLISTVIEW, {
            aid: this.param.data.aid,
            code: this.param.data.code,
        });
    };
    AcCrossServerPowerEnterView.prototype.rewardHandle = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERPOWERREWARDVIEW, {
            aid: this.param.data.aid,
            code: this.param.data.code,
        });
    };
    AcCrossServerPowerEnterView.prototype.cheerHandler = function () {
        if (!this.vo.isStart) {
            this.vo.showAcEndTip();
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERPOWERCHEERVIEW2, {
            aid: this.param.data.aid,
            code: this.param.data.code,
        });
    };
    AcCrossServerPowerEnterView.prototype.refreshServant = function () {
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_PRANK, {});
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_ZRANK, {});
    };
    AcCrossServerPowerEnterView.prototype.clickDetailBtnHandler = function (param) {
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSPOWERDETAILPOPUPVIEW, {
            aid: this.param.data.aid,
            code: this.param.data.code,
            getUiCode: this.param.data.getUiCode,
        });
    };
    AcCrossServerPowerEnterView.prototype.getRoleContainer = function (data) {
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
            var role = Api.playerVoApi.getPlayerPortrait(Number(data.level), data.pic, 0, false, null, null, curLevel, true);
            role.width = 300;
            role.y = -30;
            role.x = 190;
            userContainer.name = "userContainer";
            userContainer.addChild(role);
            userContainer.height = 765;
        }
        return userContainer;
    };
    AcCrossServerPowerEnterView.prototype.hide = function () {
        _super.prototype.hide.call(this);
        ViewController.getInstance().hideAllView();
    };
    AcCrossServerPowerEnterView.prototype.dispose = function () {
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_REFRESH), this.refreshServant, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_PRANK), this.useCallback, this);
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
        this._topBg = null;
        Api.chatVoApi.clearAcCrossChatList();
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerPowerEnterView;
}(CommonView));
__reflect(AcCrossServerPowerEnterView.prototype, "AcCrossServerPowerEnterView");
//# sourceMappingURL=AcCrossServerPowerEnterView.js.map