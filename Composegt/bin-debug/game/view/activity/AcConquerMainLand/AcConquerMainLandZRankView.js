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
 * 区服活动排名
 * author qianjun
 */
var AcConquerMainLandZRankView = (function (_super) {
    __extends(AcConquerMainLandZRankView, _super);
    // 滑动列表
    function AcConquerMainLandZRankView() {
        return _super.call(this) || this;
    }
    AcConquerMainLandZRankView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    Object.defineProperty(AcConquerMainLandZRankView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandZRankView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandZRankView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandZRankView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandZRankView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandZRankView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "rank_1", "rank_2", "rank_3"
        ]);
    };
    AcConquerMainLandZRankView.prototype.getRequestData = function () {
        return {
            requestType: NetRequestConst.REQUEST_MAINLAND_ZRANK,
            requestData: {
                activeId: this.acTivityId
            }
        };
    };
    AcConquerMainLandZRankView.prototype.receiveData = function (data) {
        if (data.data.data) {
            this.vo.setZrankinfo(data.data.data);
        }
    };
    AcConquerMainLandZRankView.prototype.isHaveTitle = function () {
        return true;
    };
    AcConquerMainLandZRankView.prototype.initView = function () {
        var view = this;
        var code = view.getUiCode();
        var contentBg = BaseBitmap.create("public_9v_bg12");
        contentBg.width = view.getShowWidth() - 60;
        contentBg.height = 530;
        contentBg.x = view.viewBg.x + view.viewBg.width / 2 - contentBg.width / 2;
        contentBg.y = 70;
        view.addChildToContainer(contentBg);
        var bottomBg = BaseBitmap.create("public_9v_bg12");
        bottomBg.width = contentBg.width;
        bottomBg.height = 86;
        bottomBg.x = this.viewBg.x + this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = contentBg.y + contentBg.height + 5;
        view.addChildToContainer(bottomBg);
        var myNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("crossranserver") + Api.mergeServerVoApi.getAfterMergeSeverName(null, true, Api.mergeServerVoApi.getTrueZid()), 22, TextFieldConst.COLOR_BROWN_NEW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myNameTxt, bottomBg, [25, 10]);
        view.addChildToContainer(myNameTxt);
        var rankV = view.vo.getMyServerRank();
        var addV = App.StringUtil.changeIntToText(view.vo.getMyServerScore());
        var str = '';
        if (rankV == 0) {
            str = LanguageManager.getlocal('atkracedes4');
        }
        else {
            str = rankV.toString();
        }
        if (!view.vo.isCanJoin()) {
            str = LanguageManager.getlocal('crossImacyNoAccess');
        }
        var myRankStr = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandPlayerRank", [str.toString()]), 22, TextFieldConst.COLOR_BROWN_NEW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, myRankStr, bottomBg, [25, 10]);
        view.addChildToContainer(myRankStr);
        var scoreStr = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandScoreRank-" + code, [addV.toString()]), 22, TextFieldConst.COLOR_BROWN_NEW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, scoreStr, bottomBg, [65, 10]);
        view.addChildToContainer(scoreStr);
        var titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = this.x + 120;
        titleTxt1.y = this.y + 30;
        view.addChildToContainer(titleTxt1);
        var titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("atkraceServerDesc"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt2.x = this.x + 260;
        titleTxt2.y = titleTxt1.y;
        view.addChildToContainer(titleTxt2);
        var titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandScore-" + code), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt3.x = this.x + 400;
        titleTxt3.y = titleTxt1.y;
        view.addChildToContainer(titleTxt3);
        // let tmp = [];
        // for(let i = 1; i < 10; ++ i){
        // 	tmp.push({
        // 		zid : i,
        // 		value : App.MathUtil.getRandom(1,9999999),
        // 	});
        // }
        // let rankList = tmp;//[{}];
        var rankList = view.vo.getZrankList();
        var arr = [];
        for (var i in rankList) {
            var unit = rankList[i];
            unit.pos = [
                { width: titleTxt1.textWidth, x: titleTxt1.x - 30 },
                { width: titleTxt2.textWidth, x: titleTxt2.x - 30 },
                { width: titleTxt3.textWidth, x: titleTxt3.x - 30 },
            ];
            arr.push(unit);
        }
        // let rankInfo = view.vo.getRankInfo();
        // if(rankInfo.rankList && rankInfo.rankList.length){
        // 	rankList = rankInfo.rankList;
        // }
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, contentBg.width, contentBg.height - 10);
        var scrollList = ComponentManager.getScrollList(AcConquerMainLandZRankItem, arr, rect2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, contentBg, [0, 0]);
        view.addChildToContainer(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
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
    AcConquerMainLandZRankView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        // let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`loctombranktip-${this.code}`),22,TextFieldConst.COLOR_LIGHT_YELLOW);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, tipTxt, this.viewBg, [0,this.viewBg.height]);
        // this.addChild(tipTxt);
        // tipTxt.visible = false;
        // this._tipTxt = tipTxt;
    };
    AcConquerMainLandZRankView.prototype.getShowWidth = function () {
        return 585;
    };
    AcConquerMainLandZRankView.prototype.getShowHeight = function () {
        return 798;
    };
    AcConquerMainLandZRankView.prototype.getTitleStr = function () {
        return 'acArrowRankViewTitle';
    };
    AcConquerMainLandZRankView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AcConquerMainLandZRankView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandZRankView;
}(PopupView));
__reflect(AcConquerMainLandZRankView.prototype, "AcConquerMainLandZRankView");
