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
 * 活动排名
 * author qianjun
 */
var AcWipeBossKillInfoView = (function (_super) {
    __extends(AcWipeBossKillInfoView, _super);
    // 滑动列表
    function AcWipeBossKillInfoView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcWipeBossKillInfoView.prototype, "api", {
        get: function () {
            return Api.wipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossKillInfoView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossKillInfoView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcWipeBossKillInfoView.prototype.initView = function () {
        var view = this;
        var contentBg = BaseBitmap.create("public_tc_bg01");
        contentBg.width = 528;
        contentBg.height = 610;
        contentBg.x = view.viewBg.x + view.viewBg.width / 2 - contentBg.width / 2;
        contentBg.y = 30;
        view.addChildToContainer(contentBg);
        var rankList = [];
        for (var i in this._log) {
            var unit = this._log[i];
            rankList.push({
                uid: 1,
                name: unit.name,
                time: unit.ts,
                reward: unit.rewards,
                servantId: unit.servantId,
                bosstype: unit.bosstype
            });
        }
        // "ts":1537341139,"name":"宇文玥任天野","bosstype":1,"rewards":"6_1208_1","servantId":"1039"
        // if(this._acData.rankArr)
        // {
        //     for(let i in this._acData.rankArr){
        //         rankList.push(this._acData.rankArr[i]);
        //     }
        // }
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, 510, 590);
        var scrollList = ComponentManager.getScrollList(AcWipeBossKillInfoScrollItem, rankList, rect2, view.param.data.code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scrollList, contentBg);
        view.addChildToContainer(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
    };
    // protected getRequestData():{requestType:string,requestData:any}
    // {
    // 	// ["activity.getdragonrank"] = "划龙舟活动排行榜",
    // 	// --返回 data.rankArr 所有人排行信息
    // 	// --返回 data.myrankArr 我的排行信息
    // 	return {requestType:NetRequestConst.REQUEST_ACTIVITY_DBRANK,requestData:{activeId : this.acTivityId}};
    // }
    AcWipeBossKillInfoView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rankinglist_line", "rankinglist_rankbg"
        ]);
    };
    AcWipeBossKillInfoView.prototype.getShowHeight = function () {
        return 760;
    };
    AcWipeBossKillInfoView.prototype.getTitleStr = function () {
        return 'acwipeBossAllKillInfo';
    };
    AcWipeBossKillInfoView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSKILLLOG, requestData: {
                activeId: view.vo.aidAndCode,
            } };
    };
    //请求回调
    AcWipeBossKillInfoView.prototype.receiveData = function (data) {
        // if(data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_DBRANK)
        // {
        // 	this._acData  = data.data.data;
        // 	//this._acVo = <AcMayDayVo>Api.acVoApi.getActivityVoByAidAndCode(AcMayDayRankPopupView.aid,AcMayDayRankPopupView.code);
        // }
        this._log = [];
        if (data.data.data.killlog && data.data.data.killlog.length) {
            this._log = data.data.data.killlog;
            this.api.setKillLog(this._log);
        }
    };
    AcWipeBossKillInfoView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AcWipeBossKillInfoView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcWipeBossKillInfoView;
}(PopupView));
__reflect(AcWipeBossKillInfoView.prototype, "AcWipeBossKillInfoView");
