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
//本轮个人
var AcThreeKingdomsRewardViewTab3 = (function (_super) {
    __extends(AcThreeKingdomsRewardViewTab3, _super);
    //private _countDownText:BaseTextField = null;
    function AcThreeKingdomsRewardViewTab3(param) {
        var _this = _super.call(this) || this;
        _this._nodeContainer = null;
        _this._rankTxt = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsRewardViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRewardViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRewardViewTab3.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRewardViewTab3.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRewardViewTab3.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsRewardViewTab3.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    Object.defineProperty(AcThreeKingdomsRewardViewTab3.prototype, "uiCode", {
        get: function () {
            var baseview = ViewController.getInstance().getView('AcConquerMainLandDetailView');
            var code = baseview.getUiCode();
            return code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsRewardViewTab3.prototype.getListType = function () {
        return 1;
    };
    AcThreeKingdomsRewardViewTab3.prototype.initView = function () {
        var view = this;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_PRANK), view.prankCallback, view);
        var baseview = ViewController.getInstance().getView('AcThreeKingdomsRewardView');
        view.height = baseview.tabHeight;
        view.width = baseview.tabWidth;
        var code = view.getUiCode();
        var juzhou = BaseBitmap.create(App.CommonUtil.getResByCode("threekingdomsjzhou", code));
        view.addChild(juzhou);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, juzhou, view, [0, 0], true);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRanktip22", code), [view.vo.acTimeAndHour]), 20, TextFieldConst.COLOR_BROWN);
        tipTxt.lineSpacing = 10;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        tipTxt.width = 560;
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, juzhou, [0, 33]);
        //本周六的第一场攻城战
        var week = view.vo.getCurWeek();
        var start = view.vo.activeSt + (week - 1) * (7 * 86400);
        var unit = view.cfg.activeTime[0];
        //周六
        var st = start + (1 - 1) * 86400 + unit.popularityRange[0] * 3600;
        unit = view.cfg.activeTime[4];
        var et = start + (7 - 1) * 86400 + unit.popularityRange[1] * 3600;
        var timeparam = App.DateUtil.getFormatBySecond(st, 15) + "-" + App.DateUtil.getFormatBySecond(et, 15);
        var dateTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRanktip21", code), [timeparam]), 20, TextFieldConst.COLOR_BROWN);
        view.addChild(dateTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, dateTxt, tipTxt, [0, tipTxt.textHeight + 10]);
        view._nodeContainer = new BaseDisplayObjectContainer();
        view._nodeContainer.width = view.width;
        var str = '';
        var rankList = view.cfg.person1;
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
            var rank = rItem.rank;
            var txt = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_LIGHT_YELLOW);
            // txt.text = LanguageManager.getlocal("acRank_rank6",[key.toString()]);
            if (Number(key) < 4) {
                txt.text = LanguageManager.getlocal("acRank_rank6", [key.toString()]);
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
        //我的个人本轮分数
        var mypoint = this.vo.getMyPrankRoundPoints();
        var myKingdomTxt = ComponentManager.getTextField(LanguageManager.getlocal("acThreeKingdomsRanktip9-" + code, [App.StringUtil.changeIntToText(mypoint)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myKingdomTxt, bottomBg, [25, 35]);
        view.addChild(myKingdomTxt);
        //赛季排名
        var rankstr = "";
        var rankV = view.vo.getMyPrankRoundRank();
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
    // private prankCallback(evt : egret.Event):void{
    // 	if(evt.data.data.data){
    // 		this.vo.setPrankinfo(evt.data.data.data);
    // 		let rankstr = '';
    // 		let rankV = this.vo.getMyPrank();
    // 		if(rankV == 0){
    // 			rankstr = LanguageManager.getlocal('atkracedes4');
    // 		}
    // 		else{
    // 			rankstr = rankV.toString();
    // 		}
    // 		let color = String(0x21eb39);
    // 		if(this.vo.getCurPeriod() == 1){
    // 			rankstr = LanguageManager.getlocal('acBattleRoundNotStart-1');
    // 		}
    // 		else{
    // 			if(!this.vo.isCanJoin()){
    // 				rankstr = LanguageManager.getlocal('crossImacyNoAccess');
    // 				color = String(0xff3c3c);
    // 			}
    // 		}
    // 		this._rankTxt.text = LanguageManager.getlocal(`acConquerMainLandrank1-${this.uiCode}`, [color,rankstr]);
    //     }
    // }
    AcThreeKingdomsRewardViewTab3.prototype.dispose = function () {
        var view = this;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_PRANK), view.prankCallback, view);
        this._nodeContainer = null;
        this._rankTxt = null;
        //this._countDownText = null;
        // TickManager.removeTick(this.tick,this);
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsRewardViewTab3;
}(CommonViewTab));
__reflect(AcThreeKingdomsRewardViewTab3.prototype, "AcThreeKingdomsRewardViewTab3");
//# sourceMappingURL=AcThreeKingdomsRewardViewTab3.js.map