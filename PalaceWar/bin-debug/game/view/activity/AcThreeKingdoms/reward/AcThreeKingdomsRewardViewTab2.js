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
//赛季阵营
var AcThreeKingdomsRewardViewTab2 = (function (_super) {
    __extends(AcThreeKingdomsRewardViewTab2, _super);
    //private _countDownText:BaseTextField = null;
    function AcThreeKingdomsRewardViewTab2(param) {
        var _this = _super.call(this) || this;
        _this._nodeContainer = null;
        _this._rankTxt = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsRewardViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRewardViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRewardViewTab2.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRewardViewTab2.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRewardViewTab2.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsRewardViewTab2.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    Object.defineProperty(AcThreeKingdomsRewardViewTab2.prototype, "uiCode", {
        get: function () {
            var baseview = ViewController.getInstance().getView('AcConquerMainLandDetailView');
            var code = baseview.getUiCode();
            return code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsRewardViewTab2.prototype.getListType = function () {
        return 1;
    };
    AcThreeKingdomsRewardViewTab2.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_GETKINGDOMSREWARDS, view.rewardCallback, view);
        var baseview = ViewController.getInstance().getView('AcThreeKingdomsRewardView');
        view.height = baseview.tabHeight;
        view.width = baseview.tabWidth;
        var code = view.getUiCode();
        var juzhou = BaseBitmap.create(App.CommonUtil.getResByCode("threekingdomsjzhou", code));
        view.addChild(juzhou);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, juzhou, view, [0, 0], true);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRanktip19", code), [view.vo.acTimeAndHour]), 20, TextFieldConst.COLOR_BROWN);
        tipTxt.lineSpacing = 10;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        tipTxt.width = 560;
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, juzhou, [0, 33]);
        var dateTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRanktip2", code), [view.vo.acTimeAndHour]), 20, TextFieldConst.COLOR_BROWN);
        view.addChild(dateTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, dateTxt, tipTxt, [0, tipTxt.textHeight + 10]);
        view._nodeContainer = new BaseDisplayObjectContainer();
        view._nodeContainer.width = view.width;
        var str = '';
        var rankList = view.cfg.kingdom2;
        var tmpX = 20;
        var scroStartY = 3;
        for (var index = 0; index < rankList.length; index++) {
            var id = index;
            var rItem = rankList[index];
            var key = index + 1;
            var winBottomBg = BaseBitmap.create("public_alphabg");
            winBottomBg.width = view.width;
            winBottomBg.y = scroStartY;
            winBottomBg.x = 0;
            this._nodeContainer.addChild(winBottomBg);
            var winbg = BaseBitmap.create("tombrewardrankbg-1");
            winbg.y = scroStartY;
            winbg.x = GameConfig.stageWidth / 2 - winbg.width / 2;
            this._nodeContainer.addChild(winbg);
            var line1 = BaseBitmap.create("public_line3");
            line1.width = 480;
            line1.x = GameConfig.stageWidth / 2 - line1.width / 2;
            line1.y = winbg.y + winbg.height / 2 - line1.height / 2;
            this._nodeContainer.addChild(line1);
            var rewardStr = rItem.getReward;
            var rIcons = GameData.getRewardItemIcons(rewardStr, true);
            var rank = rItem.id;
            var txt = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_LIGHT_YELLOW);
            txt.text = LanguageManager.getlocal("acRank_rank6", [key.toString()]);
            // if (Number(key) < 4)
            // {
            // 	txt.text = LanguageManager.getlocal("acRank_rank6",[key.toString()]);
            // }else
            // {
            // 	if(rank[0] < rank[1]){
            // 		txt.text = txt.text =LanguageManager.getlocal("acRank_rank4",[String(rank[0]),String(rank[1]) ] );
            // 	}
            // 	else{
            // 		txt.text =LanguageManager.getlocal("acRank_rank6", [rank[0].toString()]);
            // 	}
            // }
            txt.x = GameConfig.stageWidth / 2 - txt.width / 2;
            txt.y = winbg.y + winbg.height / 2 - txt.height / 2;
            this._nodeContainer.addChild(txt);
            var len = rIcons.length;
            var startY = winbg.y + winbg.height + 10;
            tmpX = 20;
            scroStartY = startY;
            for (var innerIdx = 0; innerIdx < len; innerIdx++) {
                var element = rIcons[innerIdx];
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
            winBottomBg.height = scroStartY - winBottomBg.y - 10;
            this._nodeContainer.height = winBottomBg.y + winBottomBg.height + 10;
        }
        // 膜拜背景
        var bottomBg = BaseBitmap.create("arena_bottom");
        bottomBg.height = 135;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view, [0, 0], true);
        view.addChild(bottomBg);
        //返回
        var backBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, App.CommonUtil.getCnByCode("acThreeKingdomsRanktip11", code), function () {
            baseview.hide();
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, backBtn, bottomBg, [25, 0]);
        view.addChild(backBtn);
        //我的阵营
        var myKingdomTxt = ComponentManager.getTextField(LanguageManager.getlocal("acThreeKingdomsRanktip4-" + code, [LanguageManager.getlocal("acThreeKingdomsTeam" + view.vo.getMyKingdoms() + "-" + code)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myKingdomTxt, bottomBg, [25, 35]);
        view.addChild(myKingdomTxt);
        //奖励
        // let rewardBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode(`DragonBoatDayLq`, code), ()=>{
        // 	if(view.vo.getCurPeriod() != 3){
        // 		App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRanktip23`,code)));
        // 		return;
        // 	}
        // 	if(!view.vo.getMyKingdoms()){
        // 		App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip43`, code)));
        // 		return;
        //     }
        // 	NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_GETKINGDOMSREWARDS,{
        //         activeId:view.acTivityId,
        //     });
        // }, view);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rewardBtn, bottomBg, [25,0]);
        // view.addChild(rewardBtn);
        // rewardBtn.setGray(view.vo.getCurPeriod() != 3 || !view.vo.getMyKingdoms());
        //赛季排名
        var rankstr = "";
        var rankV = view.vo.getMyZrankSeason();
        if (!this.vo.getMyKingdoms()) {
            rankstr = LanguageManager.getlocal("acThreeKingdomsTeam0-" + code);
        }
        else if (rankV == 0) {
            rankstr = LanguageManager.getlocal("atkracedes4");
        }
        else {
            rankstr = rankV.toString();
        }
        var color = String(0x21eb39);
        if (view.vo.getCurPeriod() == 1) {
            rankstr = LanguageManager.getlocal('acBattleRoundNotStart-1');
        }
        var txt3 = ComponentManager.getTextField(LanguageManager.getlocal("acThreeKingdomsRanktip5-" + code, [rankstr]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, txt3, myKingdomTxt, [0, myKingdomTxt.textHeight + 20]);
        view.addChild(txt3);
        // TickManager.addTick(this.tick,this);
        // let vo = this.vo;
        // this._countDownText = ComponentManager.getTextField("",20);
        // this.tick();
        // this._countDownText.x =  txt3.x;
        // this._countDownText.y = txt3.y + 35;		
        // this.addChild(this._countDownText);
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomBg.y - juzhou.height - 7);
        var scrollView = ComponentManager.getScrollView(this._nodeContainer, rect);
        scrollView.y = juzhou.y + juzhou.height;
        scrollView.horizontalScrollPolicy = "off";
        this.addChild(scrollView);
    };
    // public tick():void{	
    // 	if (this._countDownText)
    // 	{
    // 		let countDownTime = this.vo.getCountDown();
    // 		if(countDownTime > 0) {
    // 			this._countDownText.text = LanguageManager.getlocal(`acFourPeople_acCD`, [App.DateUtil.getFormatBySecond(countDownTime)]);
    // 		}
    // 		else{
    // 			this._countDownText.text = LanguageManager.getlocal("acPunishEnd");
    // 		}
    // 	}
    // }
    AcThreeKingdomsRewardViewTab2.prototype.rewardCallback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var rData = evt.data.data.data;
            if (!rData.round) {
                var rewards = rData.rewards;
                var rewardList = GameData.formatRewardItem(rewards);
                // App.CommonUtil.playRewardFlyAction(rewardList,  view._collectBtn.localToGlobal(view._collectBtn.width/2 + 50,20));
                ViewController.getInstance().openView(ViewConst.POPUP.ACDESTROYSAMESHOWREWARDVIEW, {
                    rewards: rewards,
                });
            }
        }
    };
    AcThreeKingdomsRewardViewTab2.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_GETKINGDOMSREWARDS, view.rewardCallback, view);
        this._nodeContainer = null;
        this._rankTxt = null;
        //this._countDownText = null;
        // TickManager.removeTick(this.tick,this);
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsRewardViewTab2;
}(CommonViewTab));
__reflect(AcThreeKingdomsRewardViewTab2.prototype, "AcThreeKingdomsRewardViewTab2");
//# sourceMappingURL=AcThreeKingdomsRewardViewTab2.js.map