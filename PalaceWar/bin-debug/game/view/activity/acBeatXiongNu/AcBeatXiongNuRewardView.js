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
 * desc:兔宝商铺奖励
*/
var AcBeatXiongNuRewardView = (function (_super) {
    __extends(AcBeatXiongNuRewardView, _super);
    function AcBeatXiongNuRewardView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcBeatXiongNuRewardView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBeatXiongNuRewardView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBeatXiongNuRewardView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcBeatXiongNuRewardView.prototype.getUiCode = function () {
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
    Object.defineProperty(AcBeatXiongNuRewardView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBeatXiongNuRewardView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBeatXiongNuRewardView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcBeatXiongNuRewardView.prototype.getResourceList = function () {
        var view = this;
        var arr = [];
        return _super.prototype.getResourceList.call(this).concat([
            "progress5", "progress3", "progress3_bg", "ac_skinoflibai_chargeitem_red", "ac_skinoflibai_chargeitem_green", "collectflag", "wife_btnbg",
            "activity_charge_red", "shopview_corner", "shopview_line", "skin_detail_namebg", "countrywarrewardview_itembg", "acthreekingdomrecharge_topbg"
        ]).concat(arr);
    };
    AcBeatXiongNuRewardView.prototype.getTabbarTextArr = function () {
        var code = this.getUiCode();
        return [
            "acRechargeViewTitle",
            "acLuckyDrawTab1",
            "motherdaypoolreward-1",
            "acCommonWifeSkinRewardPopupViewTitle"
        ];
    };
    AcBeatXiongNuRewardView.prototype.getTabbarName = function () {
        return ButtonConst.BTN2_SMALL_TAB;
    };
    AcBeatXiongNuRewardView.prototype.initTabbarGroup = function () {
        var tabBarTextArr = this.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(), tabBarTextArr, this.clickTabbarHandler, this);
            this.addChild(this.tabbarGroup);
            this.setTabBarPosition();
            this.container.y = this.getTitleButtomY();
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
            if (this.uiType == "2") {
                this.tabbarGroup.setSpace(0);
                this.tabbarGroup.setColor(0xe1ba86, 0x472c26);
            }
            this.container.x = 45;
        }
    };
    // protected getContainerY():number{
    // }
    AcBeatXiongNuRewardView.prototype.setTabBarPosition = function () {
        _super.prototype.setTabBarPosition.call(this);
        // this.tabbarGroup.setScale(0.88);
        this.tabbarGroup.x = 63;
        this.tabbarGroup.y -= 16;
        // this.tabbarGroup.y;
    };
    AcBeatXiongNuRewardView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("atkracecrossDetailTitle", this.getUiCode());
    };
    AcBeatXiongNuRewardView.prototype.clickTabbarHandler = function (data) {
        var view = this;
        _super.prototype.clickTabbarHandler.call(this, data);
    };
    // protected getRequestData():{requestType:string,requestData:any}
    // {	
    // 	// let view = this;
    // 	// return {requestType:NetRequestConst.REQUEST_ACTIVITY_ARENARANK,requestData:{
    // 	// 	activeId : view.vo.aidAndCode,
    // 	// }};
    // }
    // protected receiveData(data:{ret:boolean,data:any}):void
    // {
    // 	let view = this;
    // 	//view.vo.setRankInfo(data.data.data);
    // }
    AcBeatXiongNuRewardView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        var tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if (tab) {
            view.clickTabbarHandler({ index: tab - 1 });
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
        var key = AcConst.AID_BEATXIONGNU + "-" + this.code + "report-" + Api.playerVoApi.getPlayerID() + "-" + this.vo.st + "-hand";
        var storage = LocalStorageManager.get(key);
        if (!storage) {
            LocalStorageManager.set(key, "1");
        }
    };
    AcBeatXiongNuRewardView.prototype.getShowWidth = function () {
        return 630;
    };
    AcBeatXiongNuRewardView.prototype.getShowHeight = function () {
        return 860;
    };
    AcBeatXiongNuRewardView.prototype.freshView = function () {
        var view = this;
        if (view.vo.getpublicRedhot1()) {
            view.tabbarGroup.addRedPoint(0);
        }
        else {
            view.tabbarGroup.removeRedPoint(0);
        }
        if (view.vo.getpublicRedhot3()) {
            view.tabbarGroup.addRedPoint(1);
        }
        else {
            view.tabbarGroup.removeRedPoint(1);
        }
        // let code = this.getUiCode();
        // for(let i = 1; i <= 4; ++ i){
        //     let haveTxt = <BaseTextField>this.getChildByName(`haveTxt${i}`);
        //     haveTxt.text = `X${this.vo.dayNumById(i)}`;
        // }
    };
    AcBeatXiongNuRewardView.prototype.resetBgSize = function () {
        this.viewBg.width = 630;
        _super.prototype.resetBgSize.call(this);
        // let descbg = BaseBitmap.create(`public_9_bg1`);
        // descbg.width = 540;
        // descbg.height = 50;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, descbg, this.viewBg, [0,25]);
        // this.addChild(descbg);
        // let code = this.getUiCode();
        // for(let i = 1; i <= 4; ++ i){
        //     let img = BaseLoadBitmap.create(`dechuantype${i}-${code}`);
        //     img.width = 100;
        //     img.height = 100;
        //     img.setScale(0.4);
        //     this.addChild(img);
        //     App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, img, descbg, [20 + (i - 1)*135,0]);
        //     let haveTxt = ComponentManager.getTextField(`X${this.vo.dayNumById(i)}`, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        //     this.addChild(haveTxt);
        //     haveTxt.name = `haveTxt${i}`;
        //     App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, haveTxt, img, [img.width*img.scaleX+3,0]);
        // }
        this.freshView();
    };
    AcBeatXiongNuRewardView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        _super.prototype.dispose.call(this);
    };
    return AcBeatXiongNuRewardView;
}(PopupView));
__reflect(AcBeatXiongNuRewardView.prototype, "AcBeatXiongNuRewardView");
//# sourceMappingURL=AcBeatXiongNuRewardView.js.map