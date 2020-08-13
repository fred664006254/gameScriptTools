var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 粮草奖励展示
 * author 钱竣
 */
var AcThreeKingdomsRankFoodRewardView = /** @class */ (function (_super) {
    __extends(AcThreeKingdomsRankFoodRewardView, _super);
    function AcThreeKingdomsRankFoodRewardView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcThreeKingdomsRankFoodRewardView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankFoodRewardView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankFoodRewardView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankFoodRewardView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankFoodRewardView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsRankFoodRewardView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcThreeKingdomsRankFoodRewardView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acThreeKingdomsRank3Tip2", this.getUiCode());
    };
    AcThreeKingdomsRankFoodRewardView.prototype.getBgName = function () {
        return "popupview_bg3";
    };
    AcThreeKingdomsRankFoodRewardView.prototype.getCloseBtnName = function () {
        return "popupview_closebtn2";
    };
    AcThreeKingdomsRankFoodRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    // protected getRequestData():{requestType:string,requestData:any}
    // {	
    // 	let childInfo = Api.adultVoApi.getAdultInfoVoById(this.param.data.childid);
    // 	return {requestType:NetRequestConst.REQUEST_SADUN_GETVISITME,requestData:{ aquality: childInfo.aquality ,sex : childInfo.sex}};
    // }
    // protected receiveData(data:{ret:boolean,data:any}):void
    // {	
    // 	if(data.ret){
    // 		Api.adultVoApi.setVisitInfo(data.data.data.visitedmelist);
    // 	}
    // }
    AcThreeKingdomsRankFoodRewardView.prototype.getShowHeight = function () {
        return 780;
    };
    AcThreeKingdomsRankFoodRewardView.prototype.initView = function () {
        var view = this;
        var arr = [];
        var tmp = [
            AcConst.AID_ACCROSSSERVERPOWER,
            AcConst.AID_ACCROSSSERVERINTIMACY,
            AcConst.AID_ACCROSSSERVERATKRACE,
            AcConst.AID_NEWACCROSSSERVERATKRACE,
            AcConst.AID_BATTLEGROUND,
            AcConst.AID_TOMB,
            AcConst.AID_CONQUERMAINLAND,
            AcConst.AID_ACCROSSSERVERWIFEBATTLE
        ];
        for (var i = 0; i < 8; ++i) {
            // let unit = view.cfg.odds[i];
            arr.push({
                index: Number(i),
                show: i == 0,
                aid: tmp[i]
            });
        }
        var tmpRect = new egret.Rectangle(0, 0, 528, 685);
        var scrollList = ComponentManager.getScrollList(AcThreeKingdomsRankFoodRewardItem, arr, tmpRect, view.code);
        view.addChildToContainer(scrollList);
        scrollList.x = 50;
    };
    AcThreeKingdomsRankFoodRewardView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsRankFoodRewardView;
}(PopupView));
//# sourceMappingURL=AcThreeKingdomsRankFoodRewardView.js.map