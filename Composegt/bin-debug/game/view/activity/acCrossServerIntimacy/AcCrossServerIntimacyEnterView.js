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
    // private ismoveYboo:Boolean =false;
    function AcCrossServerIntimacyEnterView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._scoreTextTab = [];
        _this._countDownText = null;
        _this._serverList = null;
        _this._atkracedes1 = null;
        _this._atkracedes2 = null;
        _this._isCanJoin = false;
        _this._cdType = 0;
        return _this;
    }
    Object.defineProperty(AcCrossServerIntimacyEnterView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcCrossServerIntimacyView.AID, AcCrossServerIntimacyView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerIntimacyEnterView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcCrossServerIntimacyView.AID, AcCrossServerIntimacyView.CODE);
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
    AcCrossServerIntimacyEnterView.prototype.isShowOpenAni = function () {
        return false;
    };
    //根据资源名字得到完整资源名字
    AcCrossServerIntimacyEnterView.prototype.getDefaultRes = function (resName, defaultCode) {
        // let crossVo = this.vo;//Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
        defaultCode = defaultCode || "1";
        if (ResourceManager.hasRes(resName + "-" + this.param.data.code)) {
            return resName + "-" + this.param.data.code;
        }
        else {
            return resName + "-" + defaultCode;
        }
    };
    AcCrossServerIntimacyEnterView.prototype.getResourceList = function () {
        var baseRes = [
            "crossserverintienterbg-1", "atkracecross_award_text", "atkracecross_award", "atkracecross_top",
            "rankinglist_rankbg", , "forpeople_bottom", "atkracecross_rankbg", "atkracecross_rank", "atkracecross_explain",
            ,
            "arena_rank", "arena_rank_text",
            "dinner_line", "rankinglist_rank1", "rankinglist_rank2", "rankinglist_rank3", "public_9_wordbg2",
            "punish_rank_icon", "punish_rank_name", "punish_reward_icon", "atkracecross_rewatdbg3",
        ];
        var resList = null;
        if (this.cfg.specialReward) {
            resList = baseRes.concat([
                "crossserverintibg_special",
                "atkracecross_namebg",
                "atkracecross_showbtnbg",
                // "atkracecross_showbtnicon",
                this.getDefaultRes("crossserverinti_showbtnicon", "10"),
                "atkracecross_showbtntxt",
                "atkracecross_threetip",
                "atkracecross_threetipflower",
            ]);
        }
        else {
            resList = baseRes;
        }
        return _super.prototype.getResourceList.call(this).concat(resList);
        // return super.getResourceList().concat([
        // "crossserverintienterbg-1","atkracecross_award_text","atkracecross_award","atkracecross_top",
        // "rankinglist_rankbg",,"forpeople_bottom","atkracecross_rankbg","atkracecross_rank","atkracecross_explain",
        // ,"arena_rank","arena_rank_text",
        //  "dinner_line", "rankinglist_rank1", "rankinglist_rank2", "rankinglist_rank3", "public_9_wordbg2",
        //  "punish_rank_icon","punish_rank_name","punish_reward_icon","atkracecross_rewatdbg3",
        // ]);
    };
    AcCrossServerIntimacyEnterView.prototype.getBgName = function () {
        return "crossserverintienterbg-1";
    };
    AcCrossServerIntimacyEnterView.prototype.getTitleStr = function () {
        return "crossImacyTitle-" + AcCrossServerIntimacyView.CODE;
    };
    AcCrossServerIntimacyEnterView.prototype.createSpecial = function (y) {
        // let crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
        // let cfg = Config.AcCfg.getCfgByActivityIdAndCode("crossServerAtkRace", crossVo.code);
        var rewardItemVo = GameData.formatRewardItem(this.cfg.specialReward);
        var tip = BaseBitmap.create("atkracecross_threetip");
        tip.x = GameConfig.stageWidth / 2 - tip.width / 2;
        tip.y = y;
        this.addChild(tip);
        var btn = ComponentManager.getButton("atkracecross_showbtnbg", null, this.detailBtnClick, this);
        btn.x = tip.x - btn.width + 135;
        btn.y = tip.y + tip.height / 2 - btn.height / 2;
        this.addChild(btn);
        var btnIcon = BaseBitmap.create(this.getDefaultRes("crossserverinti_showbtnicon", "10"));
        btnIcon.x = btn.width / 2 - btnIcon.width / 2;
        btnIcon.y = btn.height / 2 - btnIcon.height / 2;
        btn.addChild(btnIcon);
        var btnTxt = BaseBitmap.create("atkracecross_showbtntxt");
        btnTxt.x = btn.width / 2 - btnTxt.width / 2;
        btnTxt.y = btn.height - btnTxt.y - 40;
        btn.addChild(btnTxt);
    };
    AcCrossServerIntimacyEnterView.prototype.detailBtnClick = function () {
        var rewardItemVo = GameData.formatRewardItem(this.cfg.specialReward);
        ViewController.getInstance().openView(ViewConst.COMMON.SERVANTWIFEDETAILVIEW, { servantId: rewardItemVo[0].id, wifeId: rewardItemVo[0].id });
    };
    // 初始化背景
    AcCrossServerIntimacyEnterView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 640, 1136);
            this.viewBg = BaseLoadBitmap.create(bgName, rect);
            this.viewBg.setPosition(0, (GameConfig.stageHeigth - this.viewBg.height) * 0.1);
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
        var zrankinfo = view.api.zonerankinfos;
        var arr = [];
        for (var i in zrankinfo) {
            arr.push(zrankinfo[i]);
        }
        if (arr.length) {
            if (zrankinfo.length > 2) {
                view.init_top2();
            }
            else {
                view.init_top1();
            }
        }
        else {
            view.init_top2();
        }
        //中间
        view.init_middle();
        //底部个人排行榜
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_PRANK, {});
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_PRANK), this.useCallback, this);
        var ruleBg = BaseBitmap.create("commonview_titlebg02");
        ruleBg.x = 0;
        ruleBg.y = 0;
        this.addChild(ruleBg);
        var ruleBtn = ComponentManager.getButton("btn_rule", "", this.clickDetailBtnHandler, this);
        ruleBtn.x = 3 + (PlatformManager.hasSpcialCloseBtn() ? 90 : 0);
        ruleBtn.y = 0;
        this.addChild(ruleBtn);
        if (LocalStorageManager.get(LocalStorageConst.LOCAL_IMACY_RULE) == '') {
            view.clickDetailBtnHandler(1);
            LocalStorageManager.set(LocalStorageConst.LOCAL_IMACY_RULE, '1');
        }
    };
    //两区对战
    AcCrossServerIntimacyEnterView.prototype.init_top1 = function () {
        var view = this;
        var api = view.api;
        // this.ismoveYboo =true;
        var topBg = BaseBitmap.create("atkracecross_top");
        topBg.x = 0;
        topBg.y = this.container.y - 35;
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
            serverId1.setPosition(56 - serverId1.width / 2, topBg.y + 76);
            this.addChild(serverId1);
            var serverName2 = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, otherSerInfo.zid);
            var serverId2 = ComponentManager.getTextField(serverName2, TextFieldConst.FONTSIZE_CONTENT_COMMON);
            serverId2.setPosition(GameConfig.stageWidth - 56 - serverId2.width / 2, serverId1.y);
            this.addChild(serverId2);
            this._scoreTextTab.length = 0;
            var serverScore1 = ComponentManager.getBitmapText(String(myServerInfo.point), TextFieldConst.FONTNAME_ITEMTIP);
            serverScore1.setPosition(114, topBg.y + 85);
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
        var topBg = BaseBitmap.create("public_v_bg01");
        topBg.y = this.container.y - 20;
        // topBg.width = GameConfig.stageWidth+40;
        topBg.height = 224;
        this.addChild(topBg);
        var serverText = BaseBitmap.create("atkracecross_rank");
        serverText.setPosition(GameConfig.stageWidth / 2 - serverText.width / 2, topBg.y + 8);
        this.addChild(serverText);
        var huaImg1 = BaseBitmap.create("public_v_huawen01");
        huaImg1.setPosition(GameConfig.stageWidth / 2 - huaImg1.width - 80, serverText.y + serverText.height / 2 - huaImg1.height / 2);
        this.addChild(huaImg1);
        var huaImg2 = BaseBitmap.create("public_v_huawen01");
        huaImg2.anchorOffsetX = huaImg2.width;
        huaImg2.scaleX = -1;
        huaImg2.setPosition(GameConfig.stageWidth / 2 + 80, huaImg1.y);
        this.addChild(huaImg2);
        var winbg = BaseBitmap.create("atkracecross_rewatdbg3");
        winbg.width = GameConfig.stageWidth;
        winbg.y = serverText.y + serverText.height + 5;
        winbg.x = GameConfig.stageWidth / 2 - winbg.width / 2;
        this.addChild(winbg);
        var rankText = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText.setPosition(GameConfig.stageWidth / 2 - 155 - rankText.width / 2, winbg.y + winbg.height / 2 - rankText.height / 2);
        this.addChild(rankText);
        var qufuText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceServerDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        qufuText.setPosition(GameConfig.stageWidth / 2 - qufuText.width / 2, rankText.y);
        this.addChild(qufuText);
        var pointText = ComponentManager.getTextField(LanguageManager.getlocal("croessImacyScore-" + this.vo.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        pointText.setPosition(GameConfig.stageWidth / 2 + 155 - pointText.width / 2, rankText.y);
        this.addChild(pointText);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 640, 144);
        var arr = [];
        for (var _i = 0, zonerankinfos_1 = zonerankinfos; _i < zonerankinfos_1.length; _i++) {
            var unit = zonerankinfos_1[_i];
            unit.type = 'enterIn';
            arr.push(unit);
        }
        this._serverList = ComponentManager.getScrollList(AcCorssImacyServerItem, arr, rect);
        this.addChild(this._serverList);
        this._serverList.y = winbg.height + winbg.y + 5;
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
        var wordsBg = BaseBitmap.create("public_9_downbg");
        wordsBg.width = 450;
        wordsBg.height = 180;
        wordsBg.x = (GameConfig.stageWidth - wordsBg.width) / 2;
        wordsBg.y = GameConfig.stageHeigth / 2 - 125 / 2;
        // GameConfig.stageHeigth - 200 - wordsBg.height
        this.addChild(wordsBg);
        var countDownTime = view.api.getCountDownTime();
        var str = LanguageManager.getlocal(vo.getIsCanJoin() ? "croessImacyJoin-" + AcCrossServerIntimacyView.CODE : "croessImacyNotJoin-" + AcCrossServerIntimacyView.CODE, ["\n" + LanguageManager.getlocal("crossIntimacyCDTime" + view._cdType) + vo.getCountTimeStr(countDownTime)]);
        var wordsText = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        wordsText.lineSpacing = 6;
        wordsText.anchorOffsetX = wordsText.textWidth / 2;
        wordsText.setPosition(wordsBg.x + wordsBg.width / 2, wordsBg.y + (125 - 78) / 2);
        wordsText.textAlign = egret.HorizontalAlign.CENTER;
        this._countDownText = wordsText;
        this.addChild(wordsText);
        if (this.cfg.specialReward) {
            this.createSpecial(wordsBg.y - 85);
        }
        this.tick();
    };
    AcCrossServerIntimacyEnterView.prototype.tick = function () {
        var view = this;
        var vo = view.vo;
        if (view._countDownText) {
            var countDownTime = view.api.getCountDownTime();
            if (countDownTime <= 0) {
                view._cdType = view.vo.judgeTimeProcess();
                if (view._cdType == 4) {
                    view.hide();
                    App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime4"));
                    return;
                }
            }
            if (view._cdType >= 3) {
                view._countDownText.text = LanguageManager.getlocal("crossImacyOpenDesc_over-" + AcCrossServerIntimacyView.CODE, ["\n" + LanguageManager.getlocal("crossIntimacyCDTime" + view._cdType) + vo.getCountTimeStr(countDownTime)]);
            }
            else {
                view._countDownText.text = LanguageManager.getlocal(vo.getIsCanJoin() ? "croessImacyJoin-" + AcCrossServerIntimacyView.CODE : "croessImacyNotJoin-" + AcCrossServerIntimacyView.CODE, ["\n" + LanguageManager.getlocal("crossIntimacyCDTime" + view._cdType) + vo.getCountTimeStr(countDownTime)]);
            }
            view._countDownText.anchorOffsetX = view._countDownText.textWidth / 2;
        }
    };
    AcCrossServerIntimacyEnterView.prototype.refreshEnterBtn = function () {
    };
    //底部
    AcCrossServerIntimacyEnterView.prototype.initBottom = function () {
        var bottomBg = BaseBitmap.create("public_v_bg01");
        bottomBg.height = 200;
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.y = GameConfig.stageHeigth - 200;
        this.addChild(bottomBg);
        var winbg2 = BaseBitmap.create("atkracecross_rewatdbg3");
        winbg2.width = GameConfig.stageWidth;
        winbg2.y = bottomBg.y + 5;
        winbg2.x = GameConfig.stageWidth / 2 - winbg2.width / 2;
        this.addChild(winbg2);
        //个人排行榜
        var rankListText = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankListText.setPosition(40, bottomBg.y + 20);
        // if(this.ismoveYboo)
        // {
        rankListText.y = bottomBg.y + 10;
        // }
        rankListText.textAlign = "left";
        this.addChild(rankListText);
        //玩家昵称
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.setPosition(224, rankListText.y);
        nameText.x = 224 - nameText.width / 2;
        this.addChild(nameText);
        //标题区服
        var quText = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        quText.setPosition(390, rankListText.y);
        quText.x = 390 - quText.width / 2;
        this.addChild(quText);
        //亲密涨幅
        var scoreText = ComponentManager.getTextField(LanguageManager.getlocal("croessImacyScore-" + AcCrossServerIntimacyView.CODE), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreText.setPosition(500, rankListText.y);
        scoreText.textAlign = "right";
        this.addChild(scoreText);
        //列表数据
        var scroRect = new egret.Rectangle(bottomBg.x, rankListText.y + rankListText.textHeight, bottomBg.width, 100);
        var arr = [];
        for (var i in this.api.prankinfos) {
            var unit = this.api.prankinfos[i];
            unit.type = 'enterIn';
            arr.push(unit);
        }
        if (!this._scrollList) {
            this._scrollList = ComponentManager.getScrollList(AcCorssImacyPRankItem, arr, scroRect);
            this._scrollList.x = bottomBg.x;
            this._scrollList.y = rankListText.y + rankListText.textHeight + 10;
            this.addChild(this._scrollList);
        }
        //描述
        var atkracedes = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes5"), 20);
        atkracedes.x = (GameConfig.stageWidth - atkracedes.textWidth) / 2;
        atkracedes.y = this._scrollList.y + 50;
        this.addChild(atkracedes);
        this._atkracedes2 = atkracedes;
        this._atkracedes2.visible = arr.length == 0;
        //分割线
        var lineImg = BaseBitmap.create("dinner_line");
        lineImg.x = (bottomBg.width - lineImg.width) / 2;
        lineImg.y = this._scrollList.y + scroRect.height + 7;
        this.addChild(lineImg);
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
        var rank = ComponentManager.getTextField(rankStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
        rank.setPosition(rankListText.x + (rankListText.textWidth - rank.textWidth) / 2, lineImg.y + lineImg.height + 10);
        this.addChild(rank);
        //自己名字
        var name = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
        name.setPosition(nameText.x + (nameText.textWidth - name.textWidth) / 2, rank.y);
        this.addChild(name);
        //自己区服
        var currZid = Api.mergeServerVoApi.getTrueZid();
        var servaername = Api.mergeServerVoApi.getAfterMergeSeverName();
        var serveText = ComponentManager.getTextField(servaername, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
        serveText.setPosition(quText.x + (quText.textWidth - serveText.textWidth) / 2, name.y);
        this.addChild(serveText);
        //自己分数
        var str = "";
        var mePoint = this.api.mepoint;
        if (mePoint) {
            str = mePoint.toString();
        }
        else {
            str = "0";
        }
        var qinmiText = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
        qinmiText.setPosition(scoreText.x + (scoreText.textWidth - qinmiText.textWidth) / 2, serveText.y);
        this.addChild(qinmiText);
        //活动奖励按钮
        var awardBg = ComponentManager.getButton("mainui_bottombtnbg", null, this.rewardHandle, this, null, 0);
        awardBg.setPosition(10, bottomBg.y - 10 - awardBg.height);
        this.addChild(awardBg);
        var awardIcon = BaseBitmap.create("punish_reward_icon");
        awardIcon.setPosition(awardBg.width / 2 - awardIcon.width / 2, awardBg.height / 2 - awardIcon.height / 2 - 5);
        awardBg.addChild(awardIcon);
        var awardText = BaseBitmap.create("atkracecross_award_text");
        awardText.setPosition(awardBg.width / 2 - awardText.width / 2, awardIcon.y + awardIcon.height - 30);
        awardBg.addChild(awardText);
        //排行榜按钮
        var rankBg = ComponentManager.getButton("mainui_bottombtnbg", null, this.rankHandle, this, null, 0);
        rankBg.setPosition(GameConfig.stageWidth - rankBg.width - 15, awardBg.y);
        this.addChild(rankBg);
        var rankIcon = BaseBitmap.create("punish_rank_icon");
        rankIcon.setPosition(rankBg.width / 2 - rankIcon.width / 2, rankBg.height / 2 - rankIcon.height / 2 - 5);
        rankBg.addChild(rankIcon);
        var rankText = BaseBitmap.create("punish_rank_name");
        // rankText.setPosition(rankBg.width/2-rankText.width/2,rankIcon.y + rankIcon.height -30);
        rankBg.addChild(rankText);
        this.setLayoutPosition(LayoutConst.horizontalCenter, rankText, rankIcon);
        rankText.y = rankIcon.y + rankIcon.height - 30;
    };
    AcCrossServerIntimacyEnterView.prototype.useCallback = function (event) {
        Api.crossImacyVoApi.setPRankInfo(event.data.data.data);
        if (!this._scrollList) {
            this.initBottom();
        }
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
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERDETAILPOPUPVIEW);
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
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerIntimacyEnterView;
}(CommonView));
__reflect(AcCrossServerIntimacyEnterView.prototype, "AcCrossServerIntimacyEnterView");
