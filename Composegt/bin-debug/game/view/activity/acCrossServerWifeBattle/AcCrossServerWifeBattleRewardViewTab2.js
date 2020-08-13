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
//
var AcCrossServerWifeBattleRewardViewTab2 = (function (_super) {
    __extends(AcCrossServerWifeBattleRewardViewTab2, _super);
    function AcCrossServerWifeBattleRewardViewTab2(param) {
        var _this = _super.call(this) || this;
        _this._nodeContainer = null;
        _this._countDownText = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcCrossServerWifeBattleRewardViewTab2.prototype, "cfg", {
        // private get api() : CrossServerWipeBossVoApi{
        //     return Api.crossServerWipeBossVoApi;
        // }
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWifeBattleRewardViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWifeBattleRewardViewTab2.prototype.getListType = function () {
        return 1;
    };
    AcCrossServerWifeBattleRewardViewTab2.prototype.initView = function () {
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
        var view = this;
        view._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var str = '';
        var zidNum = this.vo.getPkzidNum();
        if (zidNum == 2) {
            this.initDoubleServer(zidNum);
        }
        else {
            this.initMultiServer(zidNum);
        }
    };
    AcCrossServerWifeBattleRewardViewTab2.prototype.initDoubleServer = function (zidNum) {
        var rankList = this.cfg.getServerRankRewards(); //this.vo.getArr('personRankReward');
        var tmpX = 20;
        var scroStartY = 8;
        for (var index = 0; index < rankList.length; index++) {
            var id = index;
            var rItem = rankList[index];
            var key = index + 1; //rItem.id;
            var winBottomBg = BaseBitmap.create("rechargevie_db_01");
            winBottomBg.width = 628;
            winBottomBg.y = scroStartY;
            winBottomBg.x = 6;
            this._nodeContainer.addChild(winBottomBg);
            // let rIcons = rItem.rewardIcons;
            var rIcons = GameData.formatRewardItem(rItem.reward);
            //  GameData.getItemIcon(this._rewardArrList[count],true,true);
            var rank = rItem.rank;
            var winbg = null;
            var txt = null;
            var offY = 0;
            var offH = 0;
            if (key == 1) {
                var titleBg = BaseBitmap.create("public_up3");
                titleBg.width = 620;
                titleBg.height = 160;
                titleBg.x = GameConfig.stageWidth / 2 - titleBg.width / 2;
                titleBg.y = scroStartY + 5;
                this._nodeContainer.addChild(titleBg);
                winbg = BaseBitmap.create("accrossserverwipeboss_first");
                winbg.y = scroStartY;
                winbg.x = GameConfig.stageWidth / 2 - winbg.width / 2;
                this._nodeContainer.addChild(winbg);
                offY = 35;
                offH = 90;
                var firstData = this.vo.getRankFirstPlayer();
                if (firstData) {
                    // console.log(firstData);
                    // console.log(firstData.info);
                    // console.log(firstData.info.pic);
                    // console.log(firstData.info.ptitle)
                    var playerHead = Api.playerVoApi.getPlayerCircleHead(firstData.info ? firstData.info.pic : null, firstData.info ? firstData.info.ptitle : null);
                    playerHead.x = 50;
                    playerHead.y = winbg.y + winbg.height - 30;
                    this._nodeContainer.addChild(playerHead);
                    var playerName = ComponentManager.getTextField(firstData.name, 20, TextFieldConst.COLOR_BROWN);
                    playerName.x = playerHead.x + playerHead.width + 25;
                    playerName.y = winbg.y + winbg.height + 5;
                    this._nodeContainer.addChild(playerName);
                    var playerScore = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundDetailsViewScore", [String(firstData.point)]), 20, TextFieldConst.COLOR_BROWN);
                    playerScore.x = playerName.x;
                    playerScore.y = playerName.y + playerName.height + 15;
                    this._nodeContainer.addChild(playerScore);
                    var serverText = null;
                    if (this.vo.getQuByZid(firstData.zid) > 0) {
                        serverText = ComponentManager.getTextField(LanguageManager.getlocal("mergeServer", [String(this.vo.getQuByZid(firstData.zid)), String(firstData.zid)]), 20, TextFieldConst.COLOR_WARN_GREEN);
                    }
                    else {
                        // "ranserver2":"{1}服",
                        serverText = ComponentManager.getTextField(LanguageManager.getlocal("ranserver2", [String(firstData.zid)]), 20, TextFieldConst.COLOR_WARN_GREEN);
                    }
                    serverText.x = playerName.x + playerName.width + 150;
                    serverText.y = playerName.y; //serverText.y + serverText.height/2 - serverText.height/2;
                    this._nodeContainer.addChild(serverText);
                }
                else {
                    var noData = ComponentManager.getTextField(LanguageManager.getlocal("acPunishNoData"), 30, TextFieldConst.COLOR_BROWN);
                    noData.x = GameConfig.stageWidth / 2 - noData.width / 2;
                    noData.y = winbg.y + 100;
                    this._nodeContainer.addChild(noData);
                }
                // let vipImg = BaseLoadBitmap.create("vip_icon_"+firstData.vip);
                // vipImg.width = 65;
                // vipImg.height = 27;
                // vipImg.x = playerName.x + playerName.width + 5;
                // vipImg.y = playerName.y + playerName.height/2 - vipImg.height/2;
                // this._nodeContainer.addChild(vipImg);
            }
            else {
                winbg = BaseBitmap.create("public_ts_bg01");
                winbg.width = 250;
                winbg.y = scroStartY + 13;
                winbg.x = GameConfig.stageWidth / 2 - winbg.width / 2;
                this._nodeContainer.addChild(winbg);
                txt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_BROWN);
                if (Number(key) < 4) {
                    txt.text = LanguageManager.getlocal("acRank_rank6", [String(key)]);
                }
                else {
                    if (rank[0] < rank[1]) {
                        txt.text = txt.text = LanguageManager.getlocal("acRank_rank4", [String(rank[0]), String(rank[1])]);
                    }
                    else {
                        txt.text = LanguageManager.getlocal("acRank_rank6", [rank[0].toString()]);
                    }
                }
                txt.x = GameConfig.stageWidth / 2 - txt.width / 2;
                txt.y = winbg.y + winbg.height / 2 - txt.height / 2;
                this._nodeContainer.addChild(txt);
            }
            // let line1 = BaseBitmap.create("public_line3");
            // line1.width = 480;
            // line1.x = GameConfig.stageWidth/2 - line1.width/2;
            // line1.y = winbg.y + winbg.height/2 - line1.height/2;
            // this._nodeContainer.addChild(line1);
            var len = rIcons.length;
            var startY = winbg.y + winbg.height + 10 + offH;
            tmpX = 20;
            // tmpX = (winBottomBg.width - len * 106 - (len - 1) * 15)/2;
            scroStartY = startY;
            for (var innerIdx = 0; innerIdx < len; innerIdx++) {
                // var element = rIcons[innerIdx];
                var element = GameData.getItemIcon(rIcons[innerIdx], true, false);
                element.x = tmpX;
                element.y = scroStartY;
                tmpX += (element.width + 15);
                if (tmpX >= GameConfig.stageWidth) {
                    tmpX = 20;
                    scroStartY += element.height + 15;
                    element.x = tmpX;
                    element.y = scroStartY;
                    tmpX += (element.width + 15);
                }
                element.cacheAsBitmap = true;
                this._nodeContainer.addChild(element);
            }
            scroStartY += 130;
            winBottomBg.height = scroStartY - winBottomBg.y - 2;
        }
        // 膜拜背景
        var bottomBg = BaseBitmap.create("adult_lowbg");
        // bottomBg.width = 628
        // bottomBg.height = 120;
        // bottomBg.x = 6;
        bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width / 2;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 162;
        this.addChild(bottomBg);
        // let rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'acPunishRankTab1', view.rankCLick, view);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rankBtn, bottomBg, [35,0]);
        // view.addChild(rankBtn);
        var txt3 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        var rankstr = '';
        var rankV = this.vo.getMyRank();
        if (rankV == 0) {
            rankstr = LanguageManager.getlocal('atkracedes4');
        }
        else {
            rankstr = rankV.toString();
        }
        if (!this.vo.isCanJoin) {
            rankstr = LanguageManager.getlocal('crossImacyNoAccess');
        }
        txt3.text = LanguageManager.getlocal("accrossserverwipeBossRank1", [rankstr]);
        txt3.x = bottomBg.x + 30;
        txt3.y = bottomBg.y + 17;
        this.addChild(txt3);
        TickManager.addTick(this.tick, this);
        var vo = this.vo;
        this._countDownText = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.tick();
        this._countDownText.x = txt3.x;
        this._countDownText.y = txt3.y + 30;
        this.addChild(this._countDownText);
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomBg.y - 3);
        var scrollView = ComponentManager.getScrollView(this._nodeContainer, rect);
        scrollView.y = -3;
        scrollView.horizontalScrollPolicy = "off";
        this.addChild(scrollView);
        var bottomBgFrame = BaseBitmap.create("public_9v_bg03");
        bottomBgFrame.width = 640;
        bottomBgFrame.height = GameConfig.stageHeigth - 69 - 83;
        bottomBgFrame.x = 0;
        bottomBgFrame.y = 0;
        this.addChild(bottomBgFrame);
    };
    AcCrossServerWifeBattleRewardViewTab2.prototype.initMultiServer = function (zidNum) {
        var rankList = this.cfg.getMulServerPRankRewards(zidNum); //this.vo.getArr('personRankReward');
        var tmpX = 20;
        var scroStartY = 8;
        var rList = Object.keys(rankList);
        rList.sort(function (a, b) {
            return Number(a) - Number(b);
        });
        for (var index = 0; index < rList.length; index++) {
            var id = index;
            var key = rList[index];
            var rItem = rankList[key];
            // let key =  index+1;//rItem.id;
            var winBottomBg = BaseBitmap.create("rechargevie_db_01");
            winBottomBg.width = 628;
            winBottomBg.y = scroStartY;
            winBottomBg.x = 6;
            this._nodeContainer.addChild(winBottomBg);
            // let rIcons = rItem.rewardIcons;
            var rIcons = GameData.formatRewardItem(rItem.reward);
            var rank = rItem.rank;
            var winbg = null;
            var txt = null;
            var offY = 0;
            var offH = 0;
            if (Number(key) == 1) {
                var titleBg = BaseBitmap.create("public_up3");
                titleBg.width = 620;
                titleBg.height = 160;
                titleBg.x = GameConfig.stageWidth / 2 - titleBg.width / 2;
                titleBg.y = scroStartY + 5;
                this._nodeContainer.addChild(titleBg);
                winbg = BaseBitmap.create("accrossserverwipeboss_first");
                winbg.y = scroStartY;
                winbg.x = GameConfig.stageWidth / 2 - winbg.width / 2;
                this._nodeContainer.addChild(winbg);
                offY = 35;
                offH = 90;
                var firstData = this.vo.getRankFirstPlayer();
                if (firstData) {
                    var playerHead = Api.playerVoApi.getPlayerCircleHead(firstData.info ? firstData.info.pic : null, firstData.info ? firstData.info.ptitle : null);
                    playerHead.x = 50;
                    playerHead.y = winbg.y + winbg.height - 30;
                    this._nodeContainer.addChild(playerHead);
                    var playerName = ComponentManager.getTextField(firstData.name, 20, TextFieldConst.COLOR_BROWN);
                    playerName.x = playerHead.x + playerHead.width + 25;
                    playerName.y = winbg.y + winbg.height + 5;
                    this._nodeContainer.addChild(playerName);
                    var playerScore = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundDetailsViewScore", [String(firstData.point)]), 20, TextFieldConst.COLOR_BROWN);
                    playerScore.x = playerName.x;
                    playerScore.y = playerName.y + playerName.height + 15;
                    this._nodeContainer.addChild(playerScore);
                    var serverText = null;
                    if (this.vo.getQuByZid(firstData.zid) > 0) {
                        serverText = ComponentManager.getTextField(LanguageManager.getlocal("mergeServer", [String(this.vo.getQuByZid(firstData.zid)), String(firstData.zid)]), 20, TextFieldConst.COLOR_WARN_GREEN);
                    }
                    else {
                        // "ranserver2":"{1}服",
                        serverText = ComponentManager.getTextField(LanguageManager.getlocal("ranserver2", [String(firstData.zid)]), 20, TextFieldConst.COLOR_WARN_GREEN);
                    }
                    serverText.x = playerName.x + playerName.width + 150;
                    serverText.y = playerName.y; //serverText.y + serverText.height/2 - serverText.height/2;
                    this._nodeContainer.addChild(serverText);
                }
                else {
                    var noData = ComponentManager.getTextField(LanguageManager.getlocal("acPunishNoData"), 30, TextFieldConst.COLOR_BROWN);
                    noData.x = GameConfig.stageWidth / 2 - noData.width / 2;
                    noData.y = winbg.y + 100;
                    this._nodeContainer.addChild(noData);
                }
                // let vipImg = BaseLoadBitmap.create("vip_icon_"+firstData.vip);
                // vipImg.width = 65;
                // vipImg.height = 27;
                // vipImg.x = playerName.x + playerName.width + 5;
                // vipImg.y = playerName.y + playerName.height/2 - vipImg.height/2;
                // this._nodeContainer.addChild(vipImg);
            }
            else {
                winbg = BaseBitmap.create("public_ts_bg01");
                winbg.width = 250;
                winbg.y = scroStartY + 13;
                winbg.x = GameConfig.stageWidth / 2 - winbg.width / 2;
                this._nodeContainer.addChild(winbg);
                txt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_BROWN);
                if (Number(key) < 4) {
                    txt.text = LanguageManager.getlocal("acRank_rank6", [String(key)]);
                }
                else {
                    if (rank[0] < rank[1]) {
                        txt.text = txt.text = LanguageManager.getlocal("acRank_rank4", [String(rank[0]), String(rank[1])]);
                    }
                    else {
                        txt.text = LanguageManager.getlocal("acRank_rank6", [rank[0].toString()]);
                    }
                }
                txt.x = GameConfig.stageWidth / 2 - txt.width / 2;
                txt.y = winbg.y + winbg.height / 2 - txt.height / 2;
                this._nodeContainer.addChild(txt);
            }
            // let line1 = BaseBitmap.create("public_line3");
            // line1.width = 480;
            // line1.x = GameConfig.stageWidth/2 - line1.width/2;
            // line1.y = winbg.y + winbg.height/2 - line1.height/2;
            // this._nodeContainer.addChild(line1);
            var len = rIcons.length;
            var startY = winbg.y + winbg.height + 10 + offH;
            tmpX = 20;
            // tmpX = (winBottomBg.width - len * 106 - (len - 1) * 15)/2;
            scroStartY = startY;
            for (var innerIdx = 0; innerIdx < len; innerIdx++) {
                // var element = rIcons[innerIdx];
                var element = GameData.getItemIcon(rIcons[innerIdx], true, false);
                element.x = tmpX;
                element.y = scroStartY;
                tmpX += (element.width + 15);
                if (tmpX >= GameConfig.stageWidth) {
                    tmpX = 20;
                    scroStartY += element.height + 15;
                    element.x = tmpX;
                    element.y = scroStartY;
                    tmpX += (element.width + 15);
                }
                element.cacheAsBitmap = true;
                this._nodeContainer.addChild(element);
            }
            scroStartY += 130;
            winBottomBg.height = scroStartY - winBottomBg.y - 2;
        }
        // 膜拜背景
        var bottomBg = BaseBitmap.create("adult_lowbg");
        // bottomBg.width = 628
        // bottomBg.height = 120;
        // bottomBg.x = 6;
        bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width / 2;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 162;
        this.addChild(bottomBg);
        // let rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'acPunishRankTab1', view.rankCLick, view);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rankBtn, bottomBg, [35,0]);
        // view.addChild(rankBtn);
        var txt3 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        var rankstr = '';
        var rankV = this.vo.getMyRank();
        if (rankV == 0) {
            rankstr = LanguageManager.getlocal('atkracedes4');
        }
        else {
            rankstr = rankV.toString();
        }
        if (!this.vo.isCanJoin) {
            rankstr = LanguageManager.getlocal('crossImacyNoAccess');
        }
        txt3.text = LanguageManager.getlocal("accrossserverwipeBossRank1", [rankstr]);
        txt3.x = bottomBg.x + 30;
        txt3.y = bottomBg.y + 17;
        this.addChild(txt3);
        TickManager.addTick(this.tick, this);
        var vo = this.vo;
        this._countDownText = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.tick();
        this._countDownText.x = txt3.x;
        this._countDownText.y = txt3.y + 30;
        this.addChild(this._countDownText);
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomBg.y - 3);
        var scrollView = ComponentManager.getScrollView(this._nodeContainer, rect);
        scrollView.y = -3;
        scrollView.horizontalScrollPolicy = "off";
        this.addChild(scrollView);
        var bottomBgFrame = BaseBitmap.create("public_9v_bg03");
        bottomBgFrame.width = 640;
        bottomBgFrame.height = GameConfig.stageHeigth - 69 - 83;
        bottomBgFrame.x = 0;
        bottomBgFrame.y = 0;
        this.addChild(bottomBgFrame);
    };
    AcCrossServerWifeBattleRewardViewTab2.prototype.tick = function () {
        if (this._countDownText) {
            var countDownTime = this.vo.getCountDownTime();
            if (countDownTime > 0) {
                this._countDownText.text = LanguageManager.getlocal("accrossserverwipeBoss_acCD", [App.DateUtil.getFormatBySecond(countDownTime)]);
            }
            else {
                this._countDownText.text = LanguageManager.getlocal("acPunishEnd");
            }
        }
    };
    AcCrossServerWifeBattleRewardViewTab2.prototype.rankCLick = function () {
        var view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERWIPEBOSSRANKIEW, {
            aid: view.param.data.aid,
            code: view.param.data.code,
            index: 0
        });
    };
    AcCrossServerWifeBattleRewardViewTab2.prototype.getCountTimeStr = function (time) {
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    AcCrossServerWifeBattleRewardViewTab2.prototype.dispose = function () {
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
        this._nodeContainer = null;
        this._countDownText = null;
        TickManager.removeTick(this.tick, this);
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWifeBattleRewardViewTab2;
}(CommonViewTab));
__reflect(AcCrossServerWifeBattleRewardViewTab2.prototype, "AcCrossServerWifeBattleRewardViewTab2");
