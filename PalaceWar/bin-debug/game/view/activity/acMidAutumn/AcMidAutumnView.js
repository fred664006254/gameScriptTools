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
    AcMidAutumnView.prototype.getContainerY = function () {
        return 0;
    };
    /**获取资源数组 */
    AcMidAutumnView.prototype.getResourceList = function () {
        var list = [];
        if (this.code == "5" || this.code == '6') {
            list = [
                'herosavebeauty_rewordshowbtn-5', 'herosavebeauty_rewordshowbtn-5_down', 'herosavebeauty_dongzhuo_1-5', 'herosavebeauty_dongzhuo_2-5',
            ];
        }
        return _super.prototype.getResourceList.call(this).concat(["common_box_1", "common_box_2", "common_box_3", "common_boxbg", "common_numbg",
            "progress7_bg", "progress7", "acturantable_taskbox_light", "gress3", "gress2", "gress1",
            'herosavebeauty_introbtn', 'herosavebeauty_introbtn_down', 'herosavebeauty_rewordshowbtn_down', 'herosavebeauty_rewordshowbtn',
            'herosavebeauty_dongzhuo_1', 'herosavebeauty_dongzhuo_2', 'herosavebeauty_introbtn-5', 'herosavebeauty_introbtn-5_down'
        ]).concat(list);
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
        return [
            "acMidAutumnTitleTab1" + this.getLangCode(),
            "acMidAutumnTitleTab2",
            "acMidAutumnTitleTab3",
        ];
    };
    AcMidAutumnView.prototype.getLangCode = function () {
        var code = '';
        if (this.code == '3' || this.code == '4' || this.code == '5' || this.code == '6') {
            code = '-' + this.code;
        }
        return code;
    };
    AcMidAutumnView.prototype.getRuleInfo = function () {
        if (this.code == '3' || this.code == '4' || this.code == "5" || this.code == '6') {
            if (Api.switchVoApi.checkServantRefuseBattle()) {
                return "acMidAutumnRule-" + this.code + "_with_OpenRefusal";
            }
            return "acMidAutumnRule-" + this.code;
        }
        else {
            if (Api.switchVoApi.checkServantRefuseBattle()) {
                return "acMidAutumnRule_with_OpenRefusal";
            }
            return "acMidAutumnRule";
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
//# sourceMappingURL=AcMidAutumnView.js.map