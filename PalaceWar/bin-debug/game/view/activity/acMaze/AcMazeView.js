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
  * 赵云活动
  * author 张朝阳
  * date 2018/7/7
  * @class AcMazeView
  */
var AcMazeView = (function (_super) {
    __extends(AcMazeView, _super);
    function AcMazeView() {
        var _this = _super.call(this) || this;
        _this._mazeTab = null;
        _this._taskTab = null;
        _this._rechargeTab = null;
        _this._bg = null;
        _this._line = null;
        _this._lingBg = null;
        return _this;
    }
    Object.defineProperty(AcMazeView.prototype, "vo", {
        /**
         * 服务器返回数据
         */
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcMazeView.AID, AcMazeView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    /**获取资源数组 */
    AcMazeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["acmazeview_infobg", "acmazeview_maze", "acmazeview_bg", "acturntable_rankicon_down", "acturntable_rankicon",
            "activity_charge_red", "accarnivalview_tab_red", "signin_had_get", "progress5", "progress3_bg", "acmazeline", "acmazeten",
            "critmyspeed1", "critmyspeed2", "critmyspeed3", "critmyspeed4", "critmyspeed5", "critmyflash1", "critmyflash2", "critmyflash3",
            "acmazeline", "atkrace_crit_bg", "atkrace_crit_text", "acmazeten", "acmazeview_line",
            "dragonboattarbg", "acmazeview_buttombg"
        ]);
    };
    AcMazeView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZELOTTERY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMC, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMB, this.refreshView, this);
        AcMazeView.AID = this.aid;
        AcMazeView.CODE = this.code;
        AcMazeView.ACTIVEID = AcMazeView.AID + "-" + AcMazeView.CODE;
        var bottomBg = BaseLoadBitmap.create("servant_bottombg");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth - 75;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - this.getTitleButtomY();
        this.addChildToContainer(bottomBg);
        this._bg = BaseBitmap.create("acmazeview_bg");
        this._bg.setPosition(0, GameConfig.stageHeigth - this._bg.height - 120);
        this.addChildToContainer(this._bg);
        this._lingBg = BaseBitmap.create("dragonboattarbg");
        this._lingBg.y = -70;
        this.addChildToContainer(this._lingBg);
        this._line = BaseBitmap.create("acmazeview_line");
        this._line.y = -8;
        this.addChildToContainer(this._line);
        this._mazeTab = this.tabbarGroup.getChildAt(0);
        this._taskTab = this.tabbarGroup.getChildAt(1);
        this._rechargeTab = this.tabbarGroup.getChildAt(2);
        this.refreshView();
    };
    AcMazeView.prototype.refreshView = function () {
        if (this.vo.isFree) {
            App.CommonUtil.addIconToBDOC(this._mazeTab);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._mazeTab);
        }
        if (this.vo.isHaveTaskRedDot()) {
            App.CommonUtil.addIconToBDOC(this._taskTab);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._taskTab);
        }
        if (this.vo.isHaveRechargeRedDot()) {
            App.CommonUtil.addIconToBDOC(this._rechargeTab);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._rechargeTab);
        }
    };
    /**
     * tabbar 的监听事件
     */
    AcMazeView.prototype.clickTabbarHandler = function (data) {
        _super.prototype.clickTabbarHandler.call(this, data);
        if (data.index == 0) {
            this._bg.setVisible(true);
        }
        else {
            this._bg.setVisible(false);
        }
    };
    /**
     * 设置tabbar 的文本
     */
    AcMazeView.prototype.getTabbarTextArr = function () {
        return [
            "AcMazeViewTitle",
            "AcMazeViewTaskTitle",
            "acRechargeViewTitle",
        ];
    };
    AcMazeView.prototype.getSoundBgName = function () {
        return SoundConst.MUSIC_CHALLENGE;
    };
    AcMazeView.prototype.getTitleStr = function () {
        return "AcMazeViewTitle";
    };
    AcMazeView.prototype.getRuleInfo = function () {
        return "acMazeRule";
    };
    AcMazeView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZELOTTERY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMC, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMB, this.refreshView, this);
        this._mazeTab = null;
        this._taskTab = null;
        this._rechargeTab = null;
        this._bg = null;
        this._line = null;
        _super.prototype.dispose.call(this);
    };
    AcMazeView.AID = null;
    AcMazeView.CODE = null;
    AcMazeView.ACTIVEID = null;
    AcMazeView.TASKID = null;
    AcMazeView.RECHARGEID = null;
    return AcMazeView;
}(AcCommonView));
__reflect(AcMazeView.prototype, "AcMazeView");
//# sourceMappingURL=AcMazeView.js.map