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
 * 上轮阵营排名
 * author qianjun
 */
var AcThreeKingdomsLastRoundZRankView = (function (_super) {
    __extends(AcThreeKingdomsLastRoundZRankView, _super);
    function AcThreeKingdomsLastRoundZRankView() {
        var _this = _super.call(this) || this;
        // 滑动列表
        _this.info = null;
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsLastRoundZRankView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsLastRoundZRankView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsLastRoundZRankView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsLastRoundZRankView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsLastRoundZRankView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsLastRoundZRankView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcThreeKingdomsLastRoundZRankView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    // protected getRequestData():{requestType:string,requestData:any}{	
    // 	return {
    //         requestType:NetRequestConst.REQUEST_THREEKINGDOMS_GOVERMENTINFO,
    //         requestData:{
    //             activeId : this.acTivityId
    //         }
    //     };
    // }
    // protected receiveData(data:{ret:boolean,data:any}):void{
    //     if(data.ret){
    //         let rdata = data.data.data;
    //         this.vo.setMeetingInfo(rdata);
    //     }
    // }
    AcThreeKingdomsLastRoundZRankView.prototype.initView = function () {
        var view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var code = view.getUiCode();
        var juzhou = BaseBitmap.create(App.CommonUtil.getResByCode("threekingdomsjzhou", code));
        view.addChild(juzhou);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, juzhou, view, [0, view.titleBg.height]);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRanktip1", code)), 20, TextFieldConst.COLOR_BROWN);
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
        //我的阵营
        var myKingdomTxt = ComponentManager.getTextField(LanguageManager.getlocal("acThreeKingdomsRanktip4-" + code, [LanguageManager.getlocal("acThreeKingdomsTeam" + view.vo.getMyKingdoms() + "-" + code)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myKingdomTxt, bottomBg, [25, 35]);
        view.addChild(myKingdomTxt);
        //本轮排名
        var arr = [{ kingdomid: 1, value: view.vo.getLastRoundPoint(1) }, { kingdomid: 2, value: view.vo.getLastRoundPoint(2) }, { kingdomid: 3, value: view.vo.getLastRoundPoint(3) }];
        arr.sort(function (a, b) {
            return b.value - a.value;
        });
        var rankstr = "";
        var rankV = 0;
        for (var i = 0; i < arr.length; ++i) {
            if (arr[i].kingdomid == view.vo.getMyKingdoms()) {
                rankV = Number(i) + 1;
                break;
            }
        }
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
        //排名列表
        var list = ComponentManager.getScrollList(AcThreeKingdomsZrankItem, arr, new egret.Rectangle(0, 0, 614, bottomBg.y - juzhou.y - juzhou.height - 10));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, juzhou, [0, juzhou.height + 10]);
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
    AcThreeKingdomsLastRoundZRankView.prototype.getTitleStr = function () {
        return 'rankViewTitle';
    };
    AcThreeKingdomsLastRoundZRankView.prototype.dispose = function () {
        var view = this;
        view.info = null;
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsLastRoundZRankView;
}(CommonView));
__reflect(AcThreeKingdomsLastRoundZRankView.prototype, "AcThreeKingdomsLastRoundZRankView");
//# sourceMappingURL=AcThreeKingdomsLastRoundZRankView.js.map