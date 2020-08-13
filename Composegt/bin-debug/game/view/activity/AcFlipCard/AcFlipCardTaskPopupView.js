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
 * author yanyuling
 */
var AcFlipCardTaskPopupView = (function (_super) {
    __extends(AcFlipCardTaskPopupView, _super);
    function AcFlipCardTaskPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcFlipCardTaskPopupView.prototype, "acVo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcFlipCardTaskPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_FLIPCARD_TASK_REFRESH, this.refreshTaskRed, this);
        var bg1 = BaseBitmap.create("public_tc_bg01");
        bg1.width = 540;
        bg1.height = 620;
        bg1.x = 42;
        bg1.y = 10;
        this.addChildToContainer(bg1);
        var rect = new egret.Rectangle(0, 0, bg1.width - 20, bg1.height - 20);
        var scrollView = ComponentManager.getScrollList(AcFlipCardTaskScrollItem, [], rect);
        scrollView.horizontalScrollPolicy = "off";
        scrollView.x = bg1.x + 10;
        scrollView.y = bg1.y + 10;
        this.addChildToContainer(scrollView);
        this.scrollView = scrollView;
        this.refreshTaskRed();
    };
    AcFlipCardTaskPopupView.prototype.refreshTaskRed = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        var task = cfg.task;
        var list1 = [];
        var list2 = [];
        var list3 = [];
        for (var index = 0; index < task.length; index++) {
            var element = task[index];
            var openType = element.openType;
            if (element.questType == "1") {
                var openDay = App.DateUtil.getActivityDay(this.acVo.et, this.acVo.st);
                if (openDay < element.value) {
                    continue;
                }
            }
            //任务进度
            var taskNum = this.acVo.gettTaskNum("" + element.questType);
            var newTaskNum = element.value;
            if (this.acVo.getTaskStatus("" + (element.id))) {
                list3.push(element);
            }
            else {
                if (taskNum >= newTaskNum) {
                    list1.push(element);
                }
                else {
                    list2.push(element);
                }
            }
        }
        var list = list1.concat(list2).concat(list3);
        this.scrollView.refreshData(list);
    };
    AcFlipCardTaskPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acchristmasview_1_red"
        ]);
    };
    // protected getShowHeight():number
    // {
    // 	return 850;
    // }
    // 标题背景名称
    AcFlipCardTaskPopupView.prototype.getTitleBgName = function () {
        return null;
    };
    AcFlipCardTaskPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FLIPCARD_TASK_REFRESH, this.refreshTaskRed, this);
        this.scrollView = null;
        _super.prototype.dispose.call(this);
    };
    return AcFlipCardTaskPopupView;
}(PopupView));
__reflect(AcFlipCardTaskPopupView.prototype, "AcFlipCardTaskPopupView");
