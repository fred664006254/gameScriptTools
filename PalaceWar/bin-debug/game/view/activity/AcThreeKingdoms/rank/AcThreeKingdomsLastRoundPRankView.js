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
 * 上轮个人活动排名
 * author qianjun
 */
var AcThreeKingdomsLastRoundPRankView = (function (_super) {
    __extends(AcThreeKingdomsLastRoundPRankView, _super);
    function AcThreeKingdomsLastRoundPRankView() {
        var _this = _super.call(this) || this;
        // 滑动列表
        _this.info = null;
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsLastRoundPRankView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsLastRoundPRankView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsLastRoundPRankView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsLastRoundPRankView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsLastRoundPRankView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsLastRoundPRankView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcThreeKingdomsLastRoundPRankView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcThreeKingdomsLastRoundPRankView.prototype.getRequestData = function () {
        return {
            requestType: NetRequestConst.REQUEST_THREEKINGDOMS_GETRANK,
            requestData: {
                activeId: this.acTivityId,
                round: Math.max(this.vo.getCurWeek() - 1, 1)
            }
        };
    };
    AcThreeKingdomsLastRoundPRankView.prototype.receiveData = function (data) {
        if (data.ret) {
            var rdata = data.data.data;
            this.info = rdata;
        }
    };
    AcThreeKingdomsLastRoundPRankView.prototype.initView = function () {
        var view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var code = view.getUiCode();
        var juzhou = BaseBitmap.create(App.CommonUtil.getResByCode("threekingdomsjzhou", code));
        view.addChild(juzhou);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, juzhou, view.titleBg, [0, view.titleBg.height]);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRanktip7", code)), 20, TextFieldConst.COLOR_BROWN);
        tipTxt.lineSpacing = 10;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        tipTxt.width = 560;
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, juzhou, [0, 30]);
        var dateTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRanktip2", code), [view.vo.acTimeAndHour]), 20, TextFieldConst.COLOR_BROWN);
        view.addChild(dateTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, dateTxt, tipTxt, [0, tipTxt.textHeight + 10]);
        //膜拜背景
        var bottomBg = BaseBitmap.create("arena_bottom");
        bottomBg.height = 135;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view, [0, 0], true);
        view.addChild(bottomBg);
        //排名列表
        var title = BaseBitmap.create("qingyuanitemtitlebg");
        title.width = 610;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, title, juzhou, [0, juzhou.height + 7]);
        this.addChild(title);
        var rankText = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText.setPosition(42, title.y + 8);
        this.addChild(rankText);
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.setPosition(115, rankText.y);
        this.addChild(nameText);
        var titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_rank_title3"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt.setPosition(275, rankText.y);
        this.addChild(titleTxt);
        var serverTxt = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        serverTxt.setPosition(400, rankText.y);
        this.addChild(serverTxt);
        var scoreText = ComponentManager.getTextField(LanguageManager.getlocal("acThreeKingdomsRanktip8-1"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreText.setPosition(475, rankText.y);
        this.addChild(scoreText);
        var rankarr = view.info.rankArr;
        var myrankarr = view.info.myrankArr;
        var mypoint = 0;
        var rankV = 0;
        if (myrankarr && myrankarr.myrank) {
            rankV = myrankarr.myrank;
        }
        if (myrankarr && myrankarr.value) {
            mypoint = myrankarr.value;
        }
        var myKingdomTxt = ComponentManager.getTextField(LanguageManager.getlocal("acThreeKingdomsRanktip16-" + code, [App.StringUtil.changeIntToText(mypoint)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myKingdomTxt, bottomBg, [25, 35]);
        view.addChild(myKingdomTxt);
        //本轮个人排名
        var rankstr = "";
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
        var txt3 = ComponentManager.getTextField(LanguageManager.getlocal("acThreeKingdomsRanktip15-" + code, [rankstr]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, txt3, myKingdomTxt, [0, myKingdomTxt.textHeight + 20]);
        view.addChild(txt3);
        var list = ComponentManager.getScrollList(AcThreeKingdomsPrankItem, rankarr, new egret.Rectangle(0, 0, 610, bottomBg.y - title.y - title.height - 10));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, title, [0, title.height + 5]);
        view.addChild(list);
        list.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
    };
    // protected getRequestData():{requestType:string,requestData:any}
    // {	
    // 	let view = this;
    // 	return {requestType:NetRequestConst.REQUEST_ACTIVITY_LOCTOMBRANK,requestData:{
    // 		activeId : view.vo.aidAndCode,
    // 	}};
    // }
    // protected receiveData(data:{ret:boolean,data:any}):void
    // {
    // 	let view = this;
    // 	view.vo.setRankInfo(data.data.data);
    // }
    // private userShotCallback(event : egret.Event):void{
    //     if(event.data.ret){
    //         let data = event.data.data.data;
    // 		if(event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT)
    // 		{
    // 			data["crossZone"] = 1;
    // 			data['zid'] = Api.mergeServerVoApi.getTrueZid(data.ruid);
    // 		}
    // 		ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,data);
    //     }
    // }
    AcThreeKingdomsLastRoundPRankView.prototype.getTitleStr = function () {
        return 'rankViewTitle';
    };
    AcThreeKingdomsLastRoundPRankView.prototype.dispose = function () {
        var view = this;
        view.info = null;
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsLastRoundPRankView;
}(CommonView));
__reflect(AcThreeKingdomsLastRoundPRankView.prototype, "AcThreeKingdomsLastRoundPRankView");
//# sourceMappingURL=AcThreeKingdomsLastRoundPRankView.js.map