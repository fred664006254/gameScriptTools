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
 * 春节活动
 */
var AcNewYearView = (function (_super) {
    __extends(AcNewYearView, _super);
    function AcNewYearView() {
        var _this = _super.call(this) || this;
        _this._activityTimerText = null;
        _this._activityDesText = null;
        _this._activityDesText2 = null;
        _this._chineseknot = null;
        _this.lastType = 0;
        _this._topBg = null;
        _this._topBg2 = null;
        _this.curr_acNewYearVo = null;
        _this.public_dot1 = null;
        _this.public_dot2 = null;
        return _this;
    }
    AcNewYearView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST, this.isShowRedhot, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_NEWYEAR_REDHOT, this.isShowRedhot, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD), this.isShowRedhot, this);
        AcNewYearView.AID = this.aid;
        AcNewYearView.CODE = this.code;
        // acnewyear_titletxt-10
        if (this.code == "10" || this.code == "11") {
            var titletxt = BaseBitmap.create("acnewyear_titletxt-10");
            titletxt.x = GameConfig.stageWidth / 2 - titletxt.width / 2;
            titletxt.y = 5;
            this.addChild(titletxt);
        }
        var curr_acNewYearVo = Api.acVoApi.getActivityVoByAidAndCode(this.aid);
        this.curr_acNewYearVo = curr_acNewYearVo;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var topBg = BaseLoadBitmap.create("acnewyear_topbg_" + this.code);
        topBg.width = GameConfig.stageWidth + 18;
        topBg.y = -380;
        this.addChild(topBg);
        this._nodeContainer.addChild(topBg);
        this._topBg = topBg;
        var topBg2 = BaseLoadBitmap.create("acnewyear_topbg2_" + this.code);
        topBg2.width = GameConfig.stageWidth + 18;
        topBg2.y = -380;
        this._nodeContainer.addChild(topBg2);
        this._topBg2 = topBg2;
        this._topBg2.visible = false;
        AcNewYearView.topBgHeight = GameConfig.stageHeigth - topBg.height - topBg.y - this.container.y + 5;
        var flag = BaseBitmap.create("oneyear_flag");
        flag.x = GameConfig.stageWidth - flag.width - 60;
        flag.y = 35;
        this.addChild(flag);
        //最底部背景
        // let bottomBg = BaseBitmap.create("servant_bottombg");
        // bottomBg.width = GameConfig.stageWidth+16;
        // bottomBg.height = GameConfig.stageHeigth - topBg.height - topBg.y -this.container.y+9;
        // bottomBg.x = -8; 
        // bottomBg.y = topBg.height + topBg.y-4; 
        // this._nodeContainer.addChild(bottomBg);
        var bg1 = BaseBitmap.create("public_9v_bg02");
        bg1.width = 640;
        bg1.height = GameConfig.stageHeigth - 485;
        bg1.x = 0;
        bg1.y = 445;
        this.addChild(bg1);
        var bg2 = BaseBitmap.create("public_9v_bg02");
        bg2.width = 640;
        bg2.height = 675; // GameConfig.stageHeigth - 285;
        bg2.x = 0;
        bg2.y = 445;
        this.addChild(bg2);
        var bottomBg = BaseBitmap.create("public_9v_bg03");
        bottomBg.width = 640;
        bottomBg.height = GameConfig.stageHeigth - 445;
        bottomBg.x = 0;
        bottomBg.y = 445;
        this.addChild(bottomBg);
        //活动时间   
        this._activityTimerText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._activityTimerText.x = 30;
        this._activityTimerText.y = -162;
        this._activityTimerText.text = curr_acNewYearVo.acTimeAndHour;
        this.addChildToContainer(this._activityTimerText);
        //攀升描述   
        this._activityDesText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._activityDesText.x = 80;
        this._activityDesText.y = -122;
        this._activityDesText.text = LanguageManager.getlocal("newayearactivityDes_" + this.code);
        this.addChildToContainer(this._activityDesText);
        //中国结
        var chineseknot = BaseBitmap.create("acnewyear_chineseknot2_" + this.code);
        chineseknot.x = this._activityDesText.x + this._activityDesText.width + 10;
        chineseknot.y = this._activityDesText.y - 16;
        if (this.code == "10" || this.code == "11") {
            chineseknot.y = this._activityDesText.y - 10;
        }
        this._chineseknot = chineseknot;
        this._nodeContainer.addChild(chineseknot);
        //攀升描述2   
        this._activityDesText2 = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._activityDesText2.x = chineseknot.x + chineseknot.width + 10;
        this._activityDesText2.y = -122;
        this._activityDesText2.text = LanguageManager.getlocal("newyeargiftdes_" + this.code);
        this.addChildToContainer(this._activityDesText2);
        var tabName = [];
        var tabY = bottomBg.y + 24;
        var tabX = 15;
        this.public_dot1 = BaseBitmap.create("public_dot2");
        this.addChild(this.public_dot1);
        this.public_dot1.x = 135;
        this.public_dot1.y = 370; //this.tabbarGroup.y;  
        this.public_dot1.visible = this.curr_acNewYearVo.firstRed();
        this.public_dot2 = BaseBitmap.create("public_dot2");
        this.addChild(this.public_dot2);
        this.public_dot2.x = 285;
        this.public_dot2.y = 370;
        this.public_dot2.visible = this.curr_acNewYearVo.secondRed();
    };
    AcNewYearView.prototype.isShowRedhot = function () {
        // if(AcNewYearViewTab2.isStarBoo==true)
        // {
        this.public_dot2.visible = this.curr_acNewYearVo.secondRed();
        this.public_dot1.visible = this.curr_acNewYearVo.firstRed();
        // }
        // else
        // {
        //     this.public_dot2.visible = false; 
        // }
    };
    AcNewYearView.prototype.clickTabbarHandler = function (data) {
        _super.prototype.clickTabbarHandler.call(this, data);
        this.acEnd();
        if (data.index == 1) {
            this._topBg2.visible = true;
            this._topBg.visible = true;
            this._activityTimerText.visible = false;
            this._chineseknot.visible = false;
            this._activityDesText.visible = false;
            this._activityDesText2.visible = false;
        }
        else {
            this._topBg2.visible = false;
            this._topBg.visible = true;
            this._activityTimerText.visible = true;
            this._chineseknot.visible = true;
            this._activityDesText.visible = true;
            this._activityDesText2.visible = true;
        }
    };
    AcNewYearView.prototype.acEnd = function () {
        if (this.curr_acNewYearVo.isStart == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
    };
    AcNewYearView.prototype.getTabbarTextArr = function () {
        return ["acNewYearViewTab1",
            "acNewYearViewTab2_" + this.code,
        ];
    };
    AcNewYearView.prototype.getTabbarGroupY = function () {
        return 295;
    };
    AcNewYearView.prototype.getTitleBgName = function () {
        if (this.code == "10" || this.code == "11") {
            return "acrechargeboxspview_title_bg7";
        }
        else {
            return _super.prototype.getTitleBgName.call(this);
        }
    };
    AcNewYearView.prototype.goToRechargeHandler = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    AcNewYearView.prototype.getTitleStr = function () {
        // return  this.code == "10" || this.code == "7" ? "" : super.getTitleStr();
        if (this.code == "10" || this.code == "11") {
            return "";
        }
        else {
            return _super.prototype.getTitleStr.call(this);
        }
    };
    AcNewYearView.prototype.getResourceList = function () {
        var resList = _super.prototype.getResourceList.call(this).concat([
            "acnewyear_big_package",
            "acnewyear_bottom",
            "acnewyear_bottom2",
            "acnewyear_bottom3",
            "acnewyear_chineseknot_1",
            "acnewyear_chineseknot_2",
            "acnewyear_chineseknot_7",
            "acnewyear_chineseknot_8",
            "acnewyear_box",
            "acnewyear_chineseknot2_1",
            "acnewyear_chineseknot2_2",
            "acnewyear_chineseknot2_7",
            "acnewyear_chineseknot2_8",
            "acnewyear_chineseknot2_9",
            "acnewyear_look",
            "acnewyear_small_package",
            // "acnewyear_topbg_1", 
            // "acnewyear_topbg2_1",  
            // "acnewyear_topbg_2", 
            // "acnewyear_topbg2_2",  
            // "acnewyear_topbg_7", 
            // "acnewyear_topbg2_7", 
            "progress_type1_yellow", "progress_type1_bg",
            "servant_bottombg",
            "progress6_bg",
            "forpeople_bottom",
            "rechargevie_effects",
            "activity_charge_red",
            "activity_db_01",
            "acnewyear_middlebg"
        ]);
        if (this.code == "10" || this.code == "11") {
            return resList.concat([
                "acrechargeboxspview_title_bg7",
                "acnewyear_titletxt-10",
                "acnewyear_progressbg",
                "acnewyear_itembg",
                "acnewyear_floorbg",
                "acnewyear_floor",
                "acnewyear_chineseknot2_10",
                "oneyear_flag",
                // "progress_bloodbg",
                // "progress_type1_yellow2",
                "progress_type1_yellow2",
                "progress_type3_bg",
                // "progress_bloodbg",
                "dailytask_box_light",
                "acnewyear_cloud"
            ]);
        }
        else {
            return resList;
        }
    };
    AcNewYearView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST, this.isShowRedhot, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_NEWYEAR_REDHOT, this.isShowRedhot, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD), this.isShowRedhot, this);
        this._nodeContainer = null;
        this.lastType = 0;
        this._activityTimerText = null;
        this._activityDesText = null;
        this._chineseknot = null;
        this._topBg = null;
        this._topBg2 = null;
        AcNewYearView.topBgHeight = 0;
        _super.prototype.dispose.call(this);
    };
    AcNewYearView.AID = null;
    AcNewYearView.CODE = null;
    AcNewYearView.topBgHeight = 0;
    return AcNewYearView;
}(AcCommonView));
__reflect(AcNewYearView.prototype, "AcNewYearView");
