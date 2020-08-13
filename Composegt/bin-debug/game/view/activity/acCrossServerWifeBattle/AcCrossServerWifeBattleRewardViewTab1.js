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
var AcCrossServerWifeBattleRewardViewTab1 = (function (_super) {
    __extends(AcCrossServerWifeBattleRewardViewTab1, _super);
    function AcCrossServerWifeBattleRewardViewTab1(param) {
        var _this = _super.call(this) || this;
        _this._nodeContainer = null;
        _this._countDownText = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcCrossServerWifeBattleRewardViewTab1.prototype, "cfg", {
        // private get api() : CrossServerWipeBossVoApi{
        //     return Api.crossServerWipeBossVoApi;
        // }
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWifeBattleRewardViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWifeBattleRewardViewTab1.prototype.getListType = function () {
        return 2;
    };
    AcCrossServerWifeBattleRewardViewTab1.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_GETZIDREWARD), this.collectHandlerCallBack, this);
        var view = this;
        view._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var zidNum = this.vo.getPkzidNum();
        if (zidNum == 2) {
            this.initDoubleServer(zidNum);
        }
        else {
            this.initMultiServer(zidNum);
        }
    };
    AcCrossServerWifeBattleRewardViewTab1.prototype.createCollectFlag = function () {
        if (!this._collectFlag) {
            this._collectFlag = BaseBitmap.create("collectflag");
            this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
            this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
            this._collectFlag.x = this._collectBtn.x + this._collectBtn.width / 2;
            this._collectFlag.y = this._collectBtn.y + this._collectBtn.height / 2;
            this.addChild(this._collectFlag);
        }
    };
    AcCrossServerWifeBattleRewardViewTab1.prototype.collectHandlerCallBack = function (event) {
        var rdata = event.data.data;
        if (rdata.ret != 0) {
            return;
        }
        this._collectBtn.visible = false;
        var rewards = rdata.data.rewards;
        var rewardList = GameData.formatRewardItem(rewards);
        // let pos = this._collectBtn.localToGlobal(this._collectBtn.width/2,this._collectBtn.height/2)
        // App.CommonUtil.playRewardFlyAction(rewardList,pos);
        App.CommonUtil.playRewardFlyAction(rewardList);
        this.createCollectFlag();
        this._collectFlag.setScale(1.0);
        this._collectFlag.visible = false;
        this._collectFlag.setScale(1.3);
        this._collectFlag.visible = true;
        egret.Tween.get(this._collectFlag, { loop: false }).to({ scaleX: 0.75, scaleY: 0.75 }, 300);
    };
    AcCrossServerWifeBattleRewardViewTab1.prototype.initDoubleServer = function (zidNum) {
        var winBottomBg = BaseBitmap.create("public_9v_bg02");
        winBottomBg.width = 628;
        winBottomBg.y = 3;
        winBottomBg.x = 6;
        this._nodeContainer.addChild(winBottomBg);
        var winbg = BaseBitmap.create("atkracecross_rewatdbg1");
        winbg.y = winBottomBg.y;
        winbg.x = GameConfig.stageWidth / 2 - winbg.width / 2;
        this._nodeContainer.addChild(winbg);
        var line1 = BaseBitmap.create("public_line3");
        line1.width = 480;
        line1.x = GameConfig.stageWidth / 2 - line1.width / 2;
        line1.y = winbg.y + winbg.height / 2 - line1.height / 2;
        this._nodeContainer.addChild(line1);
        var txt1 = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossActivityRewardTxt1"), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt1.x = GameConfig.stageWidth / 2 - txt1.width / 2;
        ;
        txt1.y = winbg.y + winbg.height / 2 - txt1.height / 2;
        this._nodeContainer.addChild(txt1);
        var cfg = this.cfg;
        var winItemArr = cfg.getWinServerRewards();
        var tmpX = winBottomBg.x + 15;
        var scroStartY = winbg.y + winbg.height + 5;
        for (var index = 0; index < winItemArr.length; index++) {
            var element = winItemArr[index];
            element.x = tmpX;
            element.y = scroStartY;
            tmpX += (element.width + 15);
            //换行处理
            if (tmpX - 5 >= winBottomBg.x + winBottomBg.width) {
                tmpX = winBottomBg.x + 15;
                scroStartY += element.height + 10;
                element.x = tmpX;
                element.y = scroStartY;
                tmpX += (element.width + 15);
            }
            this._nodeContainer.addChild(element);
        }
        scroStartY += 120;
        winBottomBg.height = scroStartY;
        scroStartY += 20;
        /**
         * 奖励物资
         */
        var failBottomBg = BaseBitmap.create("public_9v_bg02");
        failBottomBg.width = winBottomBg.width;
        failBottomBg.y = scroStartY;
        failBottomBg.x = winBottomBg.x;
        this._nodeContainer.addChild(failBottomBg);
        var failbg = BaseBitmap.create("atkracecross_rewatdbg1");
        failbg.y = failBottomBg.y;
        failbg.x = winbg.x;
        this._nodeContainer.addChild(failbg);
        var line2 = BaseBitmap.create("public_line3");
        line2.width = line1.width;
        line2.x = line1.x;
        line2.y = failbg.y + failbg.height / 2 - line2.height / 2;
        this._nodeContainer.addChild(line2);
        var txt2 = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossActivityRewardTxt2"), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt2.x = GameConfig.stageWidth / 2 - txt2.width / 2;
        txt2.y = failbg.y + failbg.height / 2 - txt2.height / 2;
        this._nodeContainer.addChild(txt2);
        var lossItemArr = cfg.getLossServerRewards();
        tmpX = 20;
        scroStartY = failbg.y + failbg.height + 5;
        for (var index = 0; index < lossItemArr.length; index++) {
            var element = lossItemArr[index];
            element.x = tmpX;
            element.y = scroStartY;
            tmpX += (element.width + 15);
            //换行处理
            if (tmpX - 5 >= winBottomBg.x + winBottomBg.width) {
                tmpX = 20;
                scroStartY += element.height + 10;
                element.x = tmpX;
                element.y = scroStartY;
                tmpX += (element.width + 15);
            }
            this._nodeContainer.addChild(element);
        }
        scroStartY += 120;
        failBottomBg.height = scroStartY - failBottomBg.y;
        // 膜拜背景
        var bottomBg = BaseBitmap.create("wifeview_bottombg");
        // bottomBg.width = 628
        // bottomBg.height = 120;
        // bottomBg.x = 6;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 150;
        this.addChild(bottomBg);
        var txt3 = ComponentManager.getTextField("", 20);
        // if(this.api.zonerankinfos.length == 2){
        if (this.vo.isServerRankFirst()) {
            txt3.text = LanguageManager.getlocal("atkracecrossActivityRewardTxt3");
        }
        else {
            txt3.text = LanguageManager.getlocal("atkracecrossActivityRewardTxt4");
        }
        // }
        txt3.x = bottomBg.x + 30;
        txt3.y = bottomBg.y + 25;
        this.addChild(txt3);
        TickManager.addTick(this.tick, this);
        var vo = this.vo;
        this._countDownText = ComponentManager.getTextField("", 20);
        this.tick();
        this._countDownText.x = txt3.x;
        this._countDownText.y = txt3.y + 35;
        this.addChild(this._countDownText);
        // let vo =  Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
        this._collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.collectHandler, this);
        this._collectBtn.x = bottomBg.x + bottomBg.width - 150;
        this._collectBtn.y = bottomBg.y + bottomBg.height / 2 - this._collectBtn.height / 2;
        this._collectBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._collectBtn.setEnable(false);
        this.addChild(this._collectBtn);
        var crossVo = this.vo;
        if (crossVo.isGettZonereward()) {
            this._collectBtn.visible = false;
            this.createCollectFlag();
            this._collectFlag.setScale(0.75);
        }
        else {
            if (GameData.serverTime >= vo.st && GameData.serverTime <= vo.et && GameData.serverTime + 86400 > vo.et) {
                this._collectBtn.setEnable(true);
            }
            else {
                txt3.text = LanguageManager.getlocal("atkracecrossActivityRewardTxt6");
            }
        }
    };
    AcCrossServerWifeBattleRewardViewTab1.prototype.collectHandler = function () {
        var crossVo = this.vo;
        var cdType = this.vo.judgeTimeProcess();
        if (cdType == 4) {
            // acCrossServerWifeBattleCDTime4
            App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerWifeBattleCDTime4"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_GETZIDREWARD, { activeId: crossVo.aid + "-" + crossVo.code });
    };
    AcCrossServerWifeBattleRewardViewTab1.prototype.initMultiServer = function (zidNum) {
        var str = '';
        var rankList = this.cfg.getMulServerRewards(zidNum); //this.vo.getArr('serverRankReward');
        var tmpX = 20;
        var scroStartY = 8;
        for (var index = 0; index < rankList.length; index++) {
            var id = index;
            var rItem = rankList[index];
            var key = index + 1; //rItem.id;
            if (rItem.rank[0] > zidNum) {
                break;
            }
            if (rItem.rank[0] <= zidNum && rItem.rank[1] > zidNum) {
                rItem.rank[1] = zidNum;
            }
            var winBottomBg = BaseBitmap.create("rechargevie_db_01");
            winBottomBg.width = 628;
            winBottomBg.y = scroStartY;
            winBottomBg.x = 6;
            this._nodeContainer.addChild(winBottomBg);
            var offH = 0;
            var winbg = null;
            var rIcons = GameData.formatRewardItem(rItem.reward); //rItem.rewardIcons;
            if (key == 1) {
                var titleBg = BaseBitmap.create("public_up3");
                titleBg.width = 620;
                titleBg.height = 110;
                titleBg.x = GameConfig.stageWidth / 2 - titleBg.width / 2;
                titleBg.y = scroStartY + 15;
                this._nodeContainer.addChild(titleBg);
                winbg = BaseBitmap.create("accrossserverwipeboss_rankbg");
                winbg.x = GameConfig.stageWidth / 2 - winbg.width / 2;
                winbg.y = titleBg.y + 25;
                this._nodeContainer.addChild(winbg);
                var red1 = BaseBitmap.create("accrossserverwipeboss_rank1");
                red1.x = winbg.x - red1.width / 2;
                red1.y = winbg.y + winbg.height / 2 - red1.height / 2;
                this._nodeContainer.addChild(red1);
                var server = this.vo.getFirstServerName();
                var serverTxt = ComponentManager.getTextField(server, 24, TextFieldConst.COLOR_LIGHT_YELLOW);
                serverTxt.x = winbg.x + winbg.width / 2 - serverTxt.width / 2;
                serverTxt.y = winbg.y + winbg.height / 2 - serverTxt.height / 2;
                this._nodeContainer.addChild(serverTxt);
                offH = 45;
            }
            else {
                winbg = BaseBitmap.create("public_ts_bg01");
                winbg.width = 250;
                winbg.y = scroStartY + 13;
                winbg.x = GameConfig.stageWidth / 2 - winbg.width / 2;
                this._nodeContainer.addChild(winbg);
                // let rank = rItem.rank
                var txt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_BROWN);
                if (Number(key) < 4) {
                    txt.text = LanguageManager.getlocal("acRank_rank6", [String(key)]);
                }
                else {
                    // if(rank[0] < rank[1]){
                    // 	txt.text = txt.text =LanguageManager.getlocal("acRank_rank4",[String(rank[0]),String(rank[1]) ] );
                    // }
                    // else{
                    // 	txt.text =LanguageManager.getlocal("acRank_rank6", [rank[0].toString()]);
                    // }
                    if (rItem.rank[0] < rItem.rank[1]) {
                        txt.text = txt.text = LanguageManager.getlocal("acRank_rank4", [String(rItem.rank[0]), String(rItem.rank[1])]);
                    }
                    else {
                        txt.text = LanguageManager.getlocal("acRank_rank6", [rItem.rank[0].toString()]);
                    }
                }
                txt.x = GameConfig.stageWidth / 2 - txt.width / 2;
                txt.y = winbg.y + winbg.height / 2 - txt.height / 2;
                this._nodeContainer.addChild(txt);
            }
            // let descbg = BaseBitmap.create('accrossserverwipeboss_namebg');
            // descbg.width = 250;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, winbg, [0,winbg.height + 10]);
            // view._nodeContainer.addChild(descbg);
            // let alltxt = ComponentManager.getTextField(LanguageManager.getlocal('acRank_alliance_masterget1'),22,TextFieldConst.COLOR_LIGHT_YELLOW);
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, alltxt, descbg);
            // view._nodeContainer.addChild(alltxt);
            var len = rIcons.length;
            var startY = winbg.y + winbg.height + 10 + offH;
            // tmpX = (winBottomBg.width - len * 106 - (len - 1) * 15)/2;
            tmpX = 20;
            scroStartY = startY;
            for (var innerIdx = 0; innerIdx < len; innerIdx++) {
                var element = GameData.getItemIcon(rIcons[innerIdx], true, false); //rIcons[innerIdx];
                element.x = tmpX;
                element.y = scroStartY;
                tmpX += (element.width + 15);
                if (tmpX >= GameConfig.stageWidth) {
                    // tmpX = (winBottomBg.width - len * 106 - (len - 1) * 15)/2;
                    // scroStartY += element.height + 15;
                    // element.x = tmpX;
                    // element.y = scroStartY;
                    // tmpX +=  (element.width+15);
                    tmpX = 20;
                    scroStartY += element.height + 15;
                    element.x = tmpX;
                    element.y = scroStartY;
                    tmpX += (element.width + 15);
                }
                this._nodeContainer.addChild(element);
            }
            // let orddescbg = BaseBitmap.create('accrossserverwipeboss_namebg');
            // orddescbg.width = 250;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, orddescbg, winbg, [0,winbg.height + 10]);
            // view._nodeContainer.addChild(orddescbg);
            // orddescbg.y = scroStartY + 106 + 15;
            // let ordtxt = ComponentManager.getTextField(LanguageManager.getlocal('acRank_alliance_memberget'),22,TextFieldConst.COLOR_LIGHT_YELLOW);
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, ordtxt, orddescbg);
            // view._nodeContainer.addChild(ordtxt);
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
        // let rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'acCrossServerWipeBoss_rankTabTitle2', view.rankCLick, view);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rankBtn, bottomBg, [35,0]);
        // view.addChild(rankBtn);
        var rankstr = '';
        var rankV = this.vo.getMyServerRank();
        if (rankV == 0) {
            rankstr = LanguageManager.getlocal('atkracedes4');
        }
        else {
            rankstr = rankV.toString();
        }
        var txt3 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt3.text = LanguageManager.getlocal("accrossserverwipeBossRank2", [rankstr]);
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
        this._collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.collectHandler, this);
        this._collectBtn.x = bottomBg.x + bottomBg.width - 150;
        this._collectBtn.y = bottomBg.y + bottomBg.height / 2 - this._collectBtn.height / 2;
        this._collectBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._collectBtn.setEnable(false);
        this.addChild(this._collectBtn);
        var crossVo = this.vo;
        if (crossVo.isGettZonereward()) {
            this._collectBtn.visible = false;
            this.createCollectFlag();
            this._collectFlag.setScale(0.75);
        }
        else {
            if (GameData.serverTime >= vo.st && GameData.serverTime <= vo.et && GameData.serverTime + 86400 > vo.et) {
                this._collectBtn.setEnable(true);
            }
            else {
                txt3.text = LanguageManager.getlocal("atkracecrossActivityRewardTxt6");
            }
        }
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomBg.y - 5);
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
    AcCrossServerWifeBattleRewardViewTab1.prototype.tick = function () {
        /*
        if (this._countDownText)
        {
            let countDownTime = this.vo.getCountDownTime();
            if(countDownTime > 0) {
                this._countDownText.text = LanguageManager.getlocal(`accrossserverwipeBoss_acCD`, [App.DateUtil.getFormatBySecond(countDownTime)]);
            }
            else{
                this._countDownText.text = LanguageManager.getlocal("acPunishEnd");
            }
        }
        */
        if (this._countDownText) {
            // view.api.setCountDownTime(view._countDownTime);
            // this._countDownText.text = this.vo.getCountTimeStr(this._countDownTime);
            // if (this._countDownTime <= 0) {
            var cdType = this.vo.judgeTimeProcess();
            var countDownTime = 0;
            if (cdType == 2) {
                // this._enterBtn.setEnable(true);
                countDownTime = this.vo.et - 86400 - GameData.serverTime;
            }
            else if (cdType == 3) {
                countDownTime = this.vo.et - GameData.serverTime;
            }
            else if (cdType == 4) {
                // this._enterBtn.setEnable(false);
                // this.hide();
                // App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerWifeBattleCDTime4"));
                // return;
            }
            this._countDownText.text = LanguageManager.getlocal("acCrossServerWifeBattleCDTime" + cdType, [this.vo.getCountTimeStr(countDownTime)]);
            // }
        }
    };
    AcCrossServerWifeBattleRewardViewTab1.prototype.rankCLick = function () {
        var view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERWIPEBOSSRANKIEWTAB2, {
            aid: view.param.data.aid,
            code: view.param.data.code,
            index: 1,
        });
    };
    AcCrossServerWifeBattleRewardViewTab1.prototype.getCountTimeStr = function (time) {
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    AcCrossServerWifeBattleRewardViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_GETZIDREWARD), this.collectHandlerCallBack, this);
        this._nodeContainer = null;
        this._countDownText = null;
        this._collectBtn = null;
        this._collectFlag = null;
        TickManager.removeTick(this.tick, this);
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWifeBattleRewardViewTab1;
}(CommonViewTab));
__reflect(AcCrossServerWifeBattleRewardViewTab1.prototype, "AcCrossServerWifeBattleRewardViewTab1");
