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
var AcXingcunTaskPopupView = (function (_super) {
    __extends(AcXingcunTaskPopupView, _super);
    function AcXingcunTaskPopupView() {
        return _super.call(this) || this;
    }
    AcXingcunTaskPopupView.prototype.initView = function () {
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var day = this.param.data.day;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
        var task = cfg.dailyTask["" + day];
        AcXingcunTaskPopupView.THEDAY = day;
        task.sort(function (dataA, dataB) {
            return Number(dataA.id) < Number(dataB.id);
        });
        var tmpList = [];
        for (var index = 0; index < task.length; index++) {
            var element = task[index]; //过滤第一条任务
            if (element.questType != 1001) {
                tmpList.push(task[index]);
            }
        }
        // task.shift();
        var titleImg = BaseLoadBitmap.create("xingcun_day" + day);
        titleImg.width = 154;
        titleImg.height = 68;
        titleImg.x = GameConfig.stageWidth / 2 - titleImg.width / 2;
        titleImg.y = 30;
        this.addChildToContainer(titleImg);
        var rect = new egret.Rectangle(0, 0, 560, 700);
        var scrollView = ComponentManager.getScrollList(AcXingcunTaskScrollItem, tmpList, rect);
        scrollView.horizontalScrollPolicy = "off";
        scrollView.x = GameConfig.stageWidth / 2 - scrollView.width / 2;
        scrollView.y = 112;
        this.addChildToContainer(scrollView);
    };
    AcXingcunTaskPopupView.prototype.getShowHeight = function () {
        return 850;
    };
    AcXingcunTaskPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    // 背景图名称
    AcXingcunTaskPopupView.prototype.getBgName = function () {
        return "xingcun_bg2";
    };
    // 标题背景名称
    AcXingcunTaskPopupView.prototype.getTitleBgName = function () {
        return null;
    };
    AcXingcunTaskPopupView.prototype.getTitleStr = function () {
        return null;
    };
    // 关闭按钮图标名称
    AcXingcunTaskPopupView.prototype.getCloseBtnName = function () {
        return "btn_lantern";
    };
    AcXingcunTaskPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    AcXingcunTaskPopupView.THEDAY = 1;
    return AcXingcunTaskPopupView;
}(PopupView));
__reflect(AcXingcunTaskPopupView.prototype, "AcXingcunTaskPopupView");
