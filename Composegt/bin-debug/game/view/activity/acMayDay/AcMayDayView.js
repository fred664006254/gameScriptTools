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
author : qianjun
date : 2018.4.14
desc : 转盘活动
*/
var AcMayDayView = (function (_super) {
    __extends(AcMayDayView, _super);
    function AcMayDayView() {
        var _this = _super.call(this) || this;
        _this.public_dot1 = null;
        _this.public_dot2 = null;
        _this.public_dot3 = null;
        return _this;
    }
    Object.defineProperty(AcMayDayView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcMayDayView.AID, AcMayDayView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMayDayView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcMayDayView.AID, AcMayDayView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    AcMayDayView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM, this.update, this);
        AcMayDayView.AID = view.aid;
        AcMayDayView.CODE = view.code;
        view._nodeContainer = new BaseDisplayObjectContainer();
        view.addChildToContainer(view._nodeContainer);
        //红点1
        var public_dot1 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot1);
        ;
        public_dot1.x = 135;
        public_dot1.y = this.tabbarGroup.y;
        this.public_dot1 = public_dot1;
        //红点2
        var public_dot2 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot2);
        ;
        public_dot2.x = 135 + 149; //295;
        public_dot2.y = this.tabbarGroup.y;
        this.public_dot2 = public_dot2;
        //红点3
        var public_dot3 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot3);
        ;
        public_dot3.x = public_dot2.x + 149; //455;
        public_dot3.y = this.tabbarGroup.y;
        this.public_dot3 = public_dot3;
        public_dot1 = public_dot2 = public_dot3 = null;
        this.update();
        if (PlatformManager.checkHideIconByIP()) {
            this.tabbarGroup.setLocked(1, true);
        }
    };
    // (有页签加锁时，需要重新该方法)检查该页签条件是否满足切换条件
    AcMayDayView.prototype.checkTabCondition = function (index) {
        if (index == 1 && PlatformManager.checkHideIconByIP()) {
            return false;
        }
        return true;
    };
    AcMayDayView.prototype.clickTabbarHandler = function (data) {
        var view = this;
        _super.prototype.clickTabbarHandler.call(this, data);
        // let picNmae = Number(data.index) + 1;
        // view._topName.visible = false;
        // view._descBg.visible = view._topMan.visible = (picNmae == 1);
        // if(ResourceManager.getRes(`acturntable_top_bg${picNmae}_${this.code}`)){
        //     view._topBg.setload(`acturntable_top_bg${picNmae}_${this.code}`);
        // }
        // else{
        //     view._topBg.setload(`acturntable_top_bg${picNmae}_1`);
        // }
        // view._activityDescText.text =  LanguageManager.getlocal(`AcTurnTableViewTabDesc${picNmae}_${this.code}`);
        // if(ResourceManager.getRes(`acturntable_tab${picNmae}_${this.code}text`)){
        //     view._topName.setload(`acturntable_tab${picNmae}_${this.code}text`, null, {callback : ()=>{
        //         view._topName.x = picNmae == 3 ? (GameConfig.stageWidth - 440) : (GameConfig.stageWidth - 351 - 19);
        //         if(Number(view.code) == 1){
        //             view._topName.y = picNmae == 1 ? -245 : -210;
        //         }
        //         else{
        //             view._topName.x = picNmae == 3 ? (GameConfig.stageWidth - 340) : (GameConfig.stageWidth - 351 - 19);
        //             view._topName.y = picNmae == 3 ? -230 : -210;
        //         }
        //         view._topName.visible = true;
        //     },callbackThisObj : this});
        // }
        // else{
        //     view._topName.setload(`acturntable_tab${picNmae}_1text`, null, {callback : ()=>{
        //         view._topName.x = picNmae == 3 ? (GameConfig.stageWidth - 440) : (GameConfig.stageWidth - 351 - 19);
        //         view._topName.y = picNmae == 1 ? -245 : -210;
        //         view._topName.visible = true;
        //     },callbackThisObj : this});
        // }
        // view._activityTimerText.y = picNmae == 1 ? -140 : -150;
        // view._activityDescText.y = picNmae == 1 ? -110 : -120;
    };
    AcMayDayView.prototype.getTabbarTextArr = function () {
        return ["AcTurnTableViewTab1_" + this.code,
            "AcTurnTableViewTab2_" + this.code,
            "AcTurnTableViewTab3_" + this.code
        ];
    };
    AcMayDayView.prototype.hide = function () {
        // let curTab = this.getSelectedTab();
        if (!AcMayDayView._isCircleRun) {
            _super.prototype.hide.call(this);
        }
        // 	if (!this._isCircleRun){
        //         super.hide();
        //     }
    };
    AcMayDayView.prototype.getTabbarGroupY = function () {
        return 0; //232
    };
    AcMayDayView.prototype.getTitleButtomY = function () {
        return 148;
    };
    AcMayDayView.prototype.getTitleBgName = function () {
        return "commonview_db_04";
    };
    AcMayDayView.prototype.getRuleInfo = function () {
        return "acMatDatRule" + this.code;
    };
    AcMayDayView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "activity_charge_red",
            "itemeffect",
            "collectflag",
            "dailytask_box1_1", "dailytask_box1_2", "dailytask_box1_3",
            "dailytask_box2_1", "dailytask_box2_2", "dailytask_box2_3",
            "dailytask_box_light", "acturntable_bg", "acturntable_point",
            "acturntable_rankicon_2",
            "progress_type1_yellow", "progress_type1_bg",
            "rank_biao", "acnewyear_middlebg",
            "acturntable_bg2", "acturntable_on", "acturntable_pointcircle",
            "acturntable_7zhe", "dailytask_dt_02", "dailytask_dt_01", "dailytask_dt_03",
            "prisonview_1"
        ]);
    };
    AcMayDayView.prototype.update = function () {
        //第一页 红点
        var vo = this.vo;
        if (!vo) {
            return;
        }
        if (this.public_dot1) {
            this.public_dot1.visible = vo.getpublicRedhot1();
        }
        //第二页 红点
        if (this.public_dot2) {
            this.public_dot2.visible = vo.getpublicRedhot2();
        }
        //第三页 红点
        if (this.public_dot3) {
            this.public_dot3.visible = vo.getpublicRedhot3();
        }
    };
    AcMayDayView.prototype.dispose = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM, this.update, this);
        this._nodeContainer = null;
        this.public_dot1 = null;
        this.public_dot2 = null;
        this.public_dot3 = null;
        _super.prototype.dispose.call(this);
    };
    AcMayDayView.AID = null;
    AcMayDayView.CODE = null;
    AcMayDayView._isCircleRun = false;
    return AcMayDayView;
}(AcCommonView));
__reflect(AcMayDayView.prototype, "AcMayDayView");
