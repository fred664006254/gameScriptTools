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
 * desc:奖励弹窗
*/
var AcBattleGroundDetailsView = (function (_super) {
    __extends(AcBattleGroundDetailsView, _super);
    function AcBattleGroundDetailsView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcBattleGroundDetailsView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundDetailsView.prototype.getTabbarTextArr = function () {
        return [
            "acBattleGroundDetailsViewTab1",
            "acBattleGroundDetailsViewTab2",
            "acBattleGroundDetailsViewTab3",
            "acBattleGroundDetailsViewTab4",
        ];
    };
    AcBattleGroundDetailsView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkracecross_rewatdbg1",
            "atkracecross_rewatdbg2",
            "atkracecross_rewatdbg3",
            "wifeview_bottombg",
            "acwipeboss_scoreicon1",
            "acwipeboss_scoreicon2",
            "adult_lowbg",
            "rechargevie_db_01",
            "acwipeboss_namebg",
            "battleground_first",
            "public_9_wordbg",
            "rank_biao",
            "atkracecross_laifa",
            "atkracecross_laifa_text",
            "skin_myskinInfobg",
            "battleground_curtime",
            "battleground_timeover"
        ]);
    };
    AcBattleGroundDetailsView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_BATTLEGROUND_GETANK, requestData: {
                activeId: view.vo.aidAndCode,
                test: 1
            } };
    };
    AcBattleGroundDetailsView.prototype.initTabbarGroup = function () {
        this.selectedTabIndex = this.param.data.index;
        _super.prototype.initTabbarGroup.call(this);
    };
    // (有页签加锁时，需要重新该方法)检查该页签条件是否满足切换条件
    AcBattleGroundDetailsView.prototype.checkTabCondition = function (index) {
        if (this.vo.isStart == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (index == 1 && Api.playerVoApi.getPlayerAllianceId() == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceNoAlliance"));
            return false;
        }
        if (index == 1 && !this.vo.getAttendQuality()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acBattleAllDes"));
            return false;
        }
        return true;
    };
    AcBattleGroundDetailsView.prototype.receiveData = function (data) {
        if (data.ret) {
            var rankData = data.data.data;
            this.vo.setRankData(rankData);
        }
    };
    // protected getTitleStr():string{
    // 	return 'itemDropDesc_1011';
    // }
    AcBattleGroundDetailsView.prototype.initView = function () {
        var index = this.param.data.index;
    };
    AcBattleGroundDetailsView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundDetailsView;
}(CommonView));
__reflect(AcBattleGroundDetailsView.prototype, "AcBattleGroundDetailsView");
