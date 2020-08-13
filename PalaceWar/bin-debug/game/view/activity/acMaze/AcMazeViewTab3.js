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
  * 赵云活动Tab3
  * author 张朝阳
  * date 2018/7/7
  * @class AcMazeViewTab3
  */
var AcMazeViewTab3 = (function (_super) {
    __extends(AcMazeViewTab3, _super);
    function AcMazeViewTab3() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcMazeViewTab3.prototype, "cfg", {
        /**
         * 配置文件数据
         */
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcMazeView.AID, AcMazeView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMazeViewTab3.prototype, "vo", {
        /**
         * 服务器返回数据
         */
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcMazeView.AID, AcMazeView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    AcMazeViewTab3.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMC, this.refreshView, this);
        var bg = BaseBitmap.create("public_9_bg43");
        bg.width = 620;
        bg.height = GameConfig.stageHeigth - this.getViewTitleButtomY() - 25;
        bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, 10);
        this.addChild(bg);
        var rect = new egret.Rectangle(0, 0, bg.width, bg.height);
        this._scrollList = ComponentManager.getScrollList(AcMazeRechargeScrollItem, null, rect);
        this._scrollList.setPosition(bg.x + 10, bg.y);
        this.addChild(this._scrollList);
        this.refreshView();
    };
    AcMazeViewTab3.prototype.refreshView = function () {
        var rechargeData = this.vo.getSortRecharge();
        rechargeData.sort(function (a, b) { return a.sortId - b.sortId; });
        this._scrollList.refreshData(rechargeData);
    };
    AcMazeViewTab3.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMC, this.refreshView, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcMazeViewTab3;
}(AcCommonViewTab));
__reflect(AcMazeViewTab3.prototype, "AcMazeViewTab3");
//# sourceMappingURL=AcMazeViewTab3.js.map