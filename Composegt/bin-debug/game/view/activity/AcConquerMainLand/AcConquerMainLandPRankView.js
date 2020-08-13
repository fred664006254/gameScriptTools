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
 * 个人活动排名
 * author qianjun
 */
var AcConquerMainLandPRankView = (function (_super) {
    __extends(AcConquerMainLandPRankView, _super);
    // 滑动列表
    function AcConquerMainLandPRankView() {
        return _super.call(this) || this;
    }
    AcConquerMainLandPRankView.prototype.getUiCode = function () {
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
    Object.defineProperty(AcConquerMainLandPRankView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandPRankView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandPRankView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandPRankView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandPRankView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandPRankView.prototype.isHaveTitle = function () {
        return true;
    };
    AcConquerMainLandPRankView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "rank_1", "rank_2", "rank_3"
        ]);
    };
    AcConquerMainLandPRankView.prototype.getRequestData = function () {
        return {
            requestType: NetRequestConst.REQUEST_MAINLAND_PRANK,
            requestData: {
                activeId: this.acTivityId
            }
        };
    };
    AcConquerMainLandPRankView.prototype.receiveData = function (data) {
        if (data.data.data) {
            this.vo.setPrankinfo(data.data.data);
        }
    };
    AcConquerMainLandPRankView.prototype.initView = function () {
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
        var myNameTxt = ComponentManager.getTextField(LanguageManager.getlocal('acConquerMainLandPrankPlayerName-1', [Api.playerVoApi.getPlayerName()]), 22, TextFieldConst.COLOR_BROWN_NEW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myNameTxt, bottomBg, [25, 10]);
        view.addChildToContainer(myNameTxt);
        var rankV = view.vo.getMyPrank();
        var addV = App.StringUtil.changeIntToText(view.vo.getMyPScore());
        var str = '';
        if (rankV == 0) {
            str = LanguageManager.getlocal('atkracedes4');
        }
        else {
            str = rankV.toString();
        }
        var color = TextFieldConst.COLOR_WARN_GREEN;
        if (!view.vo.isCanJoin()) {
            str = LanguageManager.getlocal('crossImacyNoAccess');
            color = 0xff3c3c;
        }
        var myRankStr = ComponentManager.getTextField(LanguageManager.getlocal("acwipeBossPlayerRank", [str.toString()]), 22, color);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, myRankStr, bottomBg, [25, 10]);
        view.addChildToContainer(myRankStr);
        var scoreStr = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandScoreRank-" + code, [addV.toString()]), 22, TextFieldConst.COLOR_BROWN_NEW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, scoreStr, bottomBg, [65, 10]);
        view.addChildToContainer(scoreStr);
        var titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = this.x + 90;
        titleTxt1.y = this.y + 30;
        if (PlatformManager.checkIsViSp()) {
            titleTxt1.x -= 10;
        }
        view.addChildToContainer(titleTxt1);
        var titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title2"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt2.x = this.x + 155;
        if (PlatformManager.checkIsViSp()) {
            titleTxt2.x += 25;
        }
        titleTxt2.y = titleTxt1.y;
        view.addChildToContainer(titleTxt2);
        var titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("atkraceServerDesc"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt3.x = this.x + 275;
        titleTxt3.y = titleTxt1.y;
        view.addChildToContainer(titleTxt3);
        var titleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandScore-" + code), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt4.x = this.x + 355;
        titleTxt4.y = titleTxt1.y;
        view.addChildToContainer(titleTxt4);
        var titleTxt5 = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandScoreAdd-" + code), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt5.x = this.x + 479;
        titleTxt5.y = titleTxt1.y;
        view.addChildToContainer(titleTxt5);
        // let tmp = [];
        // for(let i = 1; i < 10; ++ i){
        // 	tmp.push({
        // 		name : `玩家${i}`,
        // 		zid : i,
        // 		value : App.MathUtil.getRandom(1,9999999),
        // 		add : App.MathUtil.getRandom(1,9999999),
        // 	});
        // }
        var arr = [];
        var rankList = view.vo.getPrankList();
        for (var i in rankList) {
            var unit = rankList[i];
            unit.pos = [
                { width: titleTxt1.textWidth, x: titleTxt1.x - 30 },
                { width: titleTxt2.textWidth, x: titleTxt2.x - 30 },
                { width: titleTxt3.textWidth, x: titleTxt3.x - 30 },
                { width: titleTxt4.textWidth, x: titleTxt4.x - 30 },
                { width: titleTxt5.textWidth, x: titleTxt5.x - 30 }
            ];
            arr.push(unit);
        }
        // let rankInfo = view.vo.getRankInfo();
        // if(rankInfo.rankList && rankInfo.rankList.length){
        // 	rankList = rankInfo.rankList;
        // }
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, contentBg.width, contentBg.height - 10);
        var scrollList = ComponentManager.getScrollList(AcConquerMainLandPRankItem, arr, rect2, this.code);
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
    AcConquerMainLandPRankView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        // let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`loctombranktip-${this.code}`),22,TextFieldConst.COLOR_LIGHT_YELLOW);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, tipTxt, this.viewBg, [0,this.viewBg.height]);
        // this.addChild(tipTxt);
        // tipTxt.visible = false;
        // this._tipTxt = tipTxt;
    };
    AcConquerMainLandPRankView.prototype.getShowWidth = function () {
        return 585;
    };
    AcConquerMainLandPRankView.prototype.getShowHeight = function () {
        return 798;
    };
    AcConquerMainLandPRankView.prototype.getTitleStr = function () {
        return 'acArrowRankViewTitle';
    };
    AcConquerMainLandPRankView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AcConquerMainLandPRankView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandPRankView;
}(PopupView));
__reflect(AcConquerMainLandPRankView.prototype, "AcConquerMainLandPRankView");
