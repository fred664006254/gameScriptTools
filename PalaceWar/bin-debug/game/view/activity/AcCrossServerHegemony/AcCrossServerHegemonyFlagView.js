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
 *
 * desc:奖励弹窗
*/
var AcCrossServerHegemonyFlagView = (function (_super) {
    __extends(AcCrossServerHegemonyFlagView, _super);
    function AcCrossServerHegemonyFlagView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcCrossServerHegemonyFlagView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerHegemonyFlagView.prototype.getBigFrame = function () {
        return "commonview_bigframe";
    };
    AcCrossServerHegemonyFlagView.prototype.getTitleBgName = function () {
        return ResourceManager.hasRes("achegemonyflag_titlebg-" + this.param.data.code) ? "achegemonyflag_titlebg-" + this.param.data.code : "achegemonyflag_titlebg-1";
    };
    AcCrossServerHegemonyFlagView.prototype.getTitleStr = function () {
        return "";
    };
    AcCrossServerHegemonyFlagView.prototype.addTabbarGroupBg = function () {
        return true;
    };
    AcCrossServerHegemonyFlagView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcCrossServerHegemonyFlagView.prototype.getCloseBtnName = function () {
        return ButtonConst.COMMON_CLOSE_1;
    };
    AcCrossServerHegemonyFlagView.prototype.getTabbarTextArr = function () {
        return [
            "acCrossServerHegemonyFlagTab4",
            "acCrossServerHegemonyFlagTab3",
            "acCrossServerHegemonyFlagTab1",
            "acCrossServerHegemonyFlagTab2",
        ];
    };
    Object.defineProperty(AcCrossServerHegemonyFlagView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyFlagView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    /**
 * 获取活动配置
 */
    AcCrossServerHegemonyFlagView.prototype.getRequestData = function () {
        if (this.param.data.aid && this.param.data.code) {
            return { requestType: NetRequestConst.REQUEST_ACHEGEMONY_GETWARFLAGRANK, requestData: { activeId: this.param.data.aid + "-" + this.param.data.code } };
        }
    };
    AcCrossServerHegemonyFlagView.prototype.receiveData = function (data) {
        if (!data.ret) {
            return;
        }
        var rankData = data.data.data;
        // console.log(rankData);
        if (rankData) {
            Api.crossServerHegemonyVoApi.setFlagRankData(rankData);
        }
    };
    AcCrossServerHegemonyFlagView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "accshegemony_taskitemtitlebg", "ac_skinoflibai_chargeitem_red", "ac_skinoflibai_chargeitem_green", "arena_bottom", "accshegemony_ranktitlebg",
            "achegemonyflag_titlebg-1", "accshegemony_alliancecharge_lock", "accshegemony_alliancecharge_infobg",
        ]);
    };
    // 背景图名称
    // protected getBgName():string
    // {
    // 	return "commonview_woodbg";
    // }
    AcCrossServerHegemonyFlagView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH, this.refreshRed, this);
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETWARFLAGSCORE,this.refreshRed,this);
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_USEWARFLAG,this.refreshRed,this);
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_EXCHANGEFLAGSHOP,this.refreshRed,this);
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETTASKREWARD,this.refreshRed,this);
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_EXCHANGEFLAGSHOP,this.refreshRed,this);
        this.tabbarGroup.setSpace(0);
        this.setTabBarPosition();
        this.tabbarGroup.x = GameConfig.stageWidth / 2 - this.tabbarGroup.width / 2;
        this.tabbarGroup.y = this.titleBg.y + this.titleBg.height - 12;
        if (this.tabbarGroupBg) {
            this.tabbarGroupBg.x = GameConfig.stageWidth / 2 - this.tabbarGroupBg.width / 2;
            this.tabbarGroupBg.y = this.titleBg.y + this.titleBg.height - 3;
        }
        this.setBigFameY(-(this.tabbarGroup.y + this.tabbarGroup.height));
        this.setBigFameHeight(GameConfig.stageHeigth - 5);
        if (!this.vo.isCanJoin()) {
            var unit = this.tabbarGroup.getTabBar(0);
            App.DisplayUtil.changeToGray(unit);
            this.selectedTabIndex = 1;
            this.tabbarGroup.selectedIndex = 1;
        }
        this.refreshRed();
    };
    AcCrossServerHegemonyFlagView.prototype.checkTabCondition = function (index) {
        var view = this;
        if (index == 0) {
            if (view.vo.isCanJoin()) {
                return true;
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyAllianceRechargeNotTip"));
                return false;
            }
        }
        return true;
    };
    AcCrossServerHegemonyFlagView.prototype.refreshRed = function () {
        if (this.vo.checkTaskRed()) {
            this.tabbarGroup.addRedPoint(1);
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
        //人气榜
        if (this.vo.canGetScore() > 0) {
            this.tabbarGroup.addRedPoint(2);
        }
        else {
            this.tabbarGroup.removeRedPoint(2);
        }
        if (this.vo.isCanGetAllianceRechargeReward()) {
            this.tabbarGroup.addRedPoint(0);
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
        }
    };
    // private canGetScore():number{
    //     let rankData = Api.crossServerHegemonyVoApi.getFlagRankData().rank;
    //     let needGetNum = 0;
    //     for(let i = 0;i < rankData.length; i++){
    //         let rData = rankData[i];
    //         if(Number(rData.endflag) != 0){
    //             if(this.vo.checkGetFlagByAid(rData.aid)){
    //                 let sendFlagNum = this.vo.getFlagNumByAid(rData.aid);
    //                 let rebate = this.cfg.getFlagRebateByRank(i + 1);
    //                 needGetNum += sendFlagNum * rebate;
    //             }
    //         }
    //     }
    //     return needGetNum * this.cfg.flagScoreNum;
    // }
    AcCrossServerHegemonyFlagView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH, this.refreshRed, this);
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETWARFLAGSCORE,this.refreshRed,this);
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_USEWARFLAG,this.refreshRed,this);
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_EXCHANGEFLAGSHOP,this.refreshRed,this);
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETTASKREWARD,this.refreshRed,this);
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_EXCHANGEFLAGSHOP,this.refreshRed,this);
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonyFlagView;
}(CommonView));
__reflect(AcCrossServerHegemonyFlagView.prototype, "AcCrossServerHegemonyFlagView");
//# sourceMappingURL=AcCrossServerHegemonyFlagView.js.map