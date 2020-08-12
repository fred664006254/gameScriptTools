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
/*
 *@description: 任务弹版
 *@author: hwc
 *@date: 2020-04-11 13:44:26
 *@version
 */
var TaskPopupView = (function (_super) {
    __extends(TaskPopupView, _super);
    function TaskPopupView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // protected getEventArr():string[]{
    // 	return [
    //         MsgConst.MODEL_DAILYTASK, NetConst.TASK_GET_REWARDS, MsgConst.REWARD_RANDOM_TASK,
    // 	];
    // }
    // protected eventCallBack(evt : egret.Event):void{
    // 	let view = this;
    // 	switch(evt.type){
    //         case MsgConst.MODEL_DAILYTASK:
    //             // view.refreshList();
    //             break;
    //         case NetConst.TASK_GET_REWARDS:
    //             view.openRewardPopupview(evt);
    //             break;
    //         case MsgConst.REWARD_RANDOM_TASK:
    //             view.rewardRandomTask(evt);
    //             break;
    //     }
    // }
    TaskPopupView.prototype.initView = function () {
    };
    TaskPopupView.prototype.initTabbarGroup = function () {
        var tabs = this.getTabbarTextArr();
        if (tabs && tabs.length > 0) {
            this.tabbarGroup = ComponentMgr.getTabBarGroup(this.getTabbarName(), tabs, this.clickTabbarHandler, this, null, null, null, null, 520, 90);
            this.addChild(this.tabbarGroup);
            this.setTabBarPosition();
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
            if (!Api.SwitchVoApi.checkAchievement()) {
                this.tabbarGroup.setLocked(1, true);
            }
        }
    };
    // (有页签加锁时，需要重新该方法)检查该页签条件是否满足切换条件
    TaskPopupView.prototype.checkTabCondition = function (index) {
        //暂时将皮肤页面置灰
        if (index == 1)
            return !!Api.SwitchVoApi.checkAchievement();
        else
            return true;
    };
    TaskPopupView.prototype.getTabbarTextArr = function () {
        var tem = [LangMger.getlocal("readytask")];
        if (!!Api.SwitchVoApi.checkAchievement()) {
            tem.push(LangMger.getlocal("achievement"));
        }
        return tem;
    };
    TaskPopupView.prototype.getTabbarName = function () {
        return "tasktabbtn";
    };
    TaskPopupView.prototype.setTabBarPosition = function () {
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, this.tabbarGroup, this._titleBg, [33, this._titleBg.height + 4]);
    };
    TaskPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.viewBg.touchEnabled = true;
        var bg2 = BaseBitmap.create("taskviewbg2");
        this.addChildAt(bg2, this.getChildIndex(this.container));
        bg2.width = 506;
        bg2.height = 700;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg2, this.viewBg, [0, 135]);
        this.addRedPoint();
    };
    TaskPopupView.prototype.getMsgConstEventArr = function () {
        return [
            MsgConst.MODEL_ACHIEVEMENT, MsgConst.MODEL_DAILYTASK,
        ];
    };
    TaskPopupView.prototype.msgEventCallBack = function (evt) {
        switch (evt.type) {
            case MsgConst.MODEL_DAILYTASK:
            case MsgConst.MODEL_ACHIEVEMENT:
                this.addRedPoint();
                break;
            default:
                break;
        }
    };
    TaskPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "dicecardlevel1",
            "ab_readyscene_war_progress"
        ]);
    };
    TaskPopupView.prototype.clickTabbarHandler = function (data) {
        _super.prototype.clickTabbarHandler.call(this, data);
        var selidx = data.index;
        var arr = this.getTabbarTextArr();
        for (var index = 0; index < arr.length; index++) {
            var item = this.tabbarGroup.getTabBar(index);
            var reddot = item.getChildByName("reddot");
            if (reddot) {
                if (index === selidx) {
                    reddot.setPosition(220, 10);
                }
                else {
                    reddot.setPosition(220, 20);
                }
            }
        }
    };
    TaskPopupView.prototype.addRedPoint = function () {
        if ((Api.AchievementVoApi.getAchCanRewardNum() > 0) && !!Api.SwitchVoApi.checkAchievement()) {
            this.tabbarGroup.addRedPoint(1);
            var item = this.tabbarGroup.getTabBar(1);
            var reddot = item.getChildByName("reddot");
            if (this.tabbarGroup.selectedIndex == 1) {
                reddot.setPosition(220, 10);
            }
            else {
                reddot.setPosition(220, 20);
            }
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
        if (Api.DailytaskVoApi.getDailyBox() > 0) {
            this.tabbarGroup.addRedPoint(0);
            var item = this.tabbarGroup.getTabBar(0);
            var reddot = item.getChildByName("reddot");
            reddot.setPosition(210, 10);
            if (this.tabbarGroup.selectedIndex == 0) {
                reddot.setPosition(220, 10);
            }
            else {
                reddot.setPosition(220, 20);
            }
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
        }
    };
    TaskPopupView.prototype.initBg = function () {
        this.viewBg = BaseBitmap.create(this.getBgName());
        this.addChild(this.viewBg);
        this.viewBg.width = this.getShowWidth();
        this.viewBg.touchEnabled = true;
    };
    TaskPopupView.prototype.getBgName = function () {
        return "taskviewbg";
    };
    TaskPopupView.prototype.getShowHeight = function () {
        return 845;
    };
    // protected getCloseBtnName(){
    //     return "task_closebtn";
    // }
    TaskPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return TaskPopupView;
}(PopupView));
__reflect(TaskPopupView.prototype, "TaskPopupView");
//# sourceMappingURL=TaskPopupView.js.map