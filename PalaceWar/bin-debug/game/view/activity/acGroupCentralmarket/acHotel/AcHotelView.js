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
  * 客栈活动
  * @author 张朝阳
  * date 2018/12/7
  * @class AcHotelView
  */
var AcHotelView = (function (_super) {
    __extends(AcHotelView, _super);
    function AcHotelView() {
        return _super.call(this) || this;
    }
    // private aid:string ="";
    // private code:string =""; 
    AcHotelView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        // this.aid = this.param.data.aid;
        // this.code =this.param.data.code;
        var topBg = BaseLoadBitmap.create("acmidautumnview_topbg");
        topBg.height = 70;
        topBg.width = 640;
        topBg.setPosition(0, -68);
        this.addChildToContainer(topBg);
        var butttomBg = BaseLoadBitmap.create("dragonboattab1bg");
        butttomBg.width = 640;
        butttomBg.height = GameConfig.stageHeigth - topBg.height - this.getTabbarGroupY() - this.getContainerY() - 70;
        butttomBg.setPosition(topBg.x, topBg.y + topBg.height - 8);
        this.addChildToContainer(butttomBg);
        this.refreshView();
    };
    AcHotelView.prototype.refreshView = function () {
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
     * 设置tabbar 的文本
     */
    AcHotelView.prototype.getTabbarTextArr = function () {
        if (this.code == "1") {
            return [
                "acHotelTitleTab1",
                "acHotelTitleTab2",
                "acHotelTitleTab3",
            ];
        }
        return [
            "acHotelTitleTab1-" + this.code,
            "acHotelTitleTab2-" + this.code,
            "acHotelTitleTab3-" + this.code,
        ];
    };
    AcHotelView.prototype.tick = function () {
        if (this.tabViewData && this.tabViewData[0]) {
            this.tabViewData[0].tick();
        }
    };
    AcHotelView.prototype.getRuleInfo = function () {
        if (this.code == "1") {
            if (Api.switchVoApi.checkServantRefuseBattle()) {
                return "acHotelRuleInfo_withOpenRefusal";
            }
            return "acHotelRuleInfo";
        }
        return "acHotelRuleInfo-" + this.code;
    };
    AcHotelView.prototype.getTitleStr = function () {
        return "acHotelView-" + this.code + "_Title";
    };
    AcHotelView.prototype.getResourceList = function () {
        var arr = [];
        if (this.code == "1") {
            arr = [
                "achotelview_bowlani1",
                "achotelview_bowlani2",
                "achotelview_idle",
                "achotelview_jarsani1",
                "achotelview_jarsani2"
            ];
        }
        else {
            arr = [
                "achotelview-" + this.getUiCode(),
                "achotelview_bowlani1-" + this.getUiCode(),
                "achotelview_bowlani2-" + this.getUiCode(),
                "achotelview_idle-" + this.getUiCode(),
                "achotelview_jarsani1-" + this.getUiCode(),
                "achotelview_jarsani2-" + this.getUiCode()
            ];
        }
        return _super.prototype.getResourceList.call(this).concat([
            "progress7", "progress7_bg", "common_box_1", "common_box_2", "common_box_3", "common_boxbg", "common_numbg",
            "acturantable_taskbox_light",
        ]).concat(arr);
    };
    AcHotelView.prototype.getUiCode = function () {
        // if (this.code == "3") {
        // 	return "2"
        // }
        return this.code;
    };
    AcHotelView.prototype.getProbablyInfo = function () {
        var ruleStr = this.getClassName().toLowerCase().replace("view", "") + "ProbablyInfo" + this.code;
        if (LanguageManager.checkHasKey(ruleStr)) {
            return ruleStr;
        }
        else {
        }
        return "";
    };
    AcHotelView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        _super.prototype.dispose.call(this);
    };
    return AcHotelView;
}(AcCommonView));
__reflect(AcHotelView.prototype, "AcHotelView");
//# sourceMappingURL=AcHotelView.js.map