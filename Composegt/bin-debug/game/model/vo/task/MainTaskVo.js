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
 * 主线任务vo
 * author yanyuling
 * date 2017/10/13
 * @class MainTaskVo
 */
var MainTaskVo = (function (_super) {
    __extends(MainTaskVo, _super);
    function MainTaskVo() {
        var _this = _super.call(this) || this;
        _this.task = {};
        return _this;
    }
    MainTaskVo.prototype.initData = function (data) {
        var oldId = this.taskId;
        if (data.info) {
            this.value = data.info.v;
            var curTaskId = this.taskId;
            this.taskId = data.info.id;
            if (curTaskId != this.taskId && this.taskId == "3" && curTaskId == "2") {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND);
            }
            // else if(this.taskId == "3" && curTaskId == "3"&&Api.mainTaskVoApi.isCurTaskReach()&&this.value==4){
            // 	App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_TASK_SHOWHAND);
            // }
            if (Number(this.taskId) > 2 && Number(this.taskId) <= 10 && Api.mainTaskVoApi.isCurTaskReach()) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_TASK_SHOWHAND);
            }
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI);
        }
        if (oldId && oldId != this.taskId) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_MAINTASK_GUIDE);
        }
        if (data.task) {
            this.task = data.task;
        }
    };
    MainTaskVo.prototype.dispose = function () {
        this.value = 0;
        this.taskId = null;
        this.task = {};
    };
    return MainTaskVo;
}(BaseVo));
__reflect(MainTaskVo.prototype, "MainTaskVo");
