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
  * 中秋活动
  * @author 张朝阳
  * date 2018/8/28
  * @class AcMidAutumnView
  */
var AcMidAutumnView = (function (_super) {
    __extends(AcMidAutumnView, _super);
    function AcMidAutumnView() {
        var _this = _super.call(this) || this;
        _this._midBg = null;
        _this._butttomBg = null;
        return _this;
    }
    /**获取资源数组 */
    AcMidAutumnView.prototype.getResourceList = function () {
        var baseRes = ["dailytask_box1_1", "dailytask_box1_2", "dailytask_box1_3", "common_numbg",
            "dailytask_dt_02", "dailytask_dt_01", "collectflag", "activity_db_01", "dailytask_dt_03", "atkrace_arrest_bg_di", "progress_type3_bg", "progress_type3_yellow"];
        if (this.code == "1" || this.code == "5" || this.code == "8") {
            return _super.prototype.getResourceList.call(this).concat(baseRes);
        }
        else {
            if (this.code == "7" || this.code == "9") {
                return _super.prototype.getResourceList.call(this).concat(baseRes).concat(["acmidautumnview6"]);
            }
            else {
                return _super.prototype.getResourceList.call(this).concat(baseRes).concat(["acmidautumnview" + this.code]);
            }
        }
        // return super.getResourceList().concat(["gress3","gress2","gress1","activity_db_01","dailytask_dt_03",
        // "atkrace_arrest_bg_di",
        // "progress_type3_bg","progress_type3_yellow",
        // ]);
    };
    AcMidAutumnView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACMIDAUTUMN_TASKANDRECHARGE, this.refreshView, this);
        var topBg = BaseLoadBitmap.create("acmidautumnview_topbg");
        topBg.height = 70;
        topBg.width = 640;
        topBg.setPosition(0, -this.getTabbarGroupY() - this.getContainerY() - 60 - 5);
        this.addChildToContainer(topBg);
        this._butttomBg = BaseLoadBitmap.create("dragonboattab1bg");
        this._butttomBg.width = 640;
        this._butttomBg.height = GameConfig.stageHeigth - topBg.height - this.getTabbarGroupY() - this.getContainerY() - 70;
        this._butttomBg.setPosition(topBg.x, topBg.y + topBg.height - 8);
        this.addChildToContainer(this._butttomBg);
        this.refreshView();
    };
    // protected changeTab():void
    // {
    // 	if(this.code == "1"){
    // 		super.changeTab();
    // 	} else {
    // 		let tabveiwClass:any = egret.getDefinitionByName(this.getClassName() + "Tab" + (this.selectedTabIndex+1));
    // 		if(tabveiwClass)
    // 		{
    // 			let commViewTab:ViewTab=<ViewTab>this.tabViewData[this.selectedTabIndex];
    // 			if(commViewTab)
    // 			{
    // 				this.addChild(commViewTab);
    // 				commViewTab.refreshWhenSwitchBack();
    // 			}
    // 			else
    // 			{
    // 				let tabView:ViewTab = new tabveiwClass(this.param);
    // 				tabView.setPosition(this.container.x,this.container.y + this.getTabbarGroupY());
    // 				this.tabViewData[this.selectedTabIndex] = tabView;
    // 				tabView["param"]=this.param;
    // 				this.addChild(tabView);
    // 				// this.addChild(tabView);
    // 			}
    // 			if(this.lastSelectedTabIndex != null && this.tabViewData[this.lastSelectedTabIndex])
    // 			{
    // 				this.removeChild(this.tabViewData[this.lastSelectedTabIndex]);
    // 			}
    // 		}
    // 	}
    // }
    /**
     * 刷新UI
     */
    AcMidAutumnView.prototype.refreshView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (vo.isFree || vo.isHaveBoxDot()) {
            this.addRedPoint(0);
        }
        else {
            this.removeRedPoint(0);
        }
        if (vo.isHaveTaskRedDot()) {
            this.addRedPoint(1);
        }
        else {
            this.removeRedPoint(1);
        }
        if (vo.isHaveRechargeRedDot()) {
            this.addRedPoint(2);
        }
        else {
            this.removeRedPoint(2);
        }
    };
    /**
     * tabbar 的监听事件
     */
    AcMidAutumnView.prototype.clickTabbarHandler = function (data) {
        _super.prototype.clickTabbarHandler.call(this, data);
    };
    /**
     * 设置tabbar 的文本
     */
    AcMidAutumnView.prototype.getTabbarTextArr = function () {
        if (this.code == "1") {
            if (PlatformManager.checkHideIconByIP()) {
                return [
                    "acMidAutumnTitleTab1",
                    "acMidAutumnTitleTab2",
                ];
            }
            return [
                "acMidAutumnTitleTab1",
                "acMidAutumnTitleTab2",
                "acMidAutumnTitleTab3",
            ];
        }
        else {
            if (PlatformManager.checkHideIconByIP()) {
                return [
                    "acMidAutumnTitleTab1_" + this.code,
                    "acMidAutumnTitleTab2",
                ];
            }
            return [
                "acMidAutumnTitleTab1_" + this.code,
                "acMidAutumnTitleTab2",
                "acMidAutumnTitleTab3",
            ];
        }
    };
    AcMidAutumnView.prototype.getRuleInfo = function () {
        if (this.code == "1") {
            return "acMidAutumnRule";
        }
        else {
            return "acMidAutumnRule" + this.code;
        }
    };
    AcMidAutumnView.prototype.dispose = function () {
        this._midBg = null;
        this._butttomBg = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACMIDAUTUMN_TASKANDRECHARGE, this.refreshView, this);
        _super.prototype.dispose.call(this);
    };
    return AcMidAutumnView;
}(AcCommonView));
__reflect(AcMidAutumnView.prototype, "AcMidAutumnView");
