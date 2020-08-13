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
  * 赵云活动Tab2
  * author 张朝阳
  * date 2018/7/7
  * @class AcMazeViewTab2
  */
var AcMazeViewTab2 = (function (_super) {
    __extends(AcMazeViewTab2, _super);
    function AcMazeViewTab2() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcMazeViewTab2.prototype, "cfg", {
        /**
         * 配置文件数据
         */
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcMazeView.AID, AcMazeView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMazeViewTab2.prototype, "vo", {
        /**
         * 服务器返回数据
         */
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcMazeView.AID, AcMazeView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    AcMazeViewTab2.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMB, this.refreshData, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACMAZE_TASK, this.refreshData, this);
        var bg = BaseBitmap.create("public_9_bg43");
        bg.width = 620;
        bg.height = GameConfig.stageHeigth - this.getViewTitleButtomY() - 25;
        bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, 10);
        this.addChild(bg);
        var rect = new egret.Rectangle(0, 0, bg.width, bg.height);
        this._scrollList = ComponentManager.getScrollList(AcMazeTaskScrollItem, null, rect);
        this._scrollList.setPosition(bg.x + 10, bg.y);
        this.addChild(this._scrollList);
        this.refreshData();
    };
    AcMazeViewTab2.prototype.refreshData = function () {
        var taskData = this.vo.getSortTask();
        taskData.sort(function (a, b) { return a.sortId - b.sortId; });
        this._scrollList.refreshData(taskData);
    };
    AcMazeViewTab2.prototype.refreshWhenSwitchBack = function () {
        this.refreshData();
    };
    AcMazeViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMB, this.refreshData, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACMAZE_TASK, this.refreshData, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcMazeViewTab2;
}(AcCommonViewTab));
__reflect(AcMazeViewTab2.prototype, "AcMazeViewTab2");
//# sourceMappingURL=AcMazeViewTab2.js.map