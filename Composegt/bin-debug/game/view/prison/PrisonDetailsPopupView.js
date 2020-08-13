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
var PrisonDetailsPopupView = (function (_super) {
    __extends(PrisonDetailsPopupView, _super);
    //囚犯详情
    function PrisonDetailsPopupView() {
        var _this = _super.call(this) || this;
        _this.prisonPenaltyConsumptionTxt = null;
        _this.prisonPunishmentOnlineTxt = null;
        _this.prisonProbabilityTxt = null;
        _this.dropTxt = null;
        _this.nameArr = [];
        _this.itemNameStr = '';
        _this.PrisonItemCfg = null;
        _this.index = 0;
        _this.prisonNameTex = null;
        _this.officeTex = null;
        return _this;
    }
    PrisonDetailsPopupView.prototype.getTitleStr = function () {
        if (Api.switchVoApi.checkOpenNewPrison()) {
            return "prisonDetailsPopupViewTitle_laoyiType";
        }
        else {
            return "prisonDetailsPopupViewTitle";
        }
    };
    PrisonDetailsPopupView.prototype.initView = function () {
        var num = this.param.data - 20;
        this.PrisonItemCfg = Config.PrisonCfg.getIndexPrisonItemCfg(num);
        this.index = this.param.data;
        var detailFntSize = TextFieldConst.FONTSIZE_CONTENT_COMMON;
        if (PlatformManager.checkIsViSp()) {
            detailFntSize = TextFieldConst.FONTSIZE_ACTIVITY_COMMON;
        }
        var public_9_bg4 = BaseBitmap.create("public_tc_bg01");
        public_9_bg4.width = 536;
        public_9_bg4.height = 386;
        public_9_bg4.x = this.viewBg.width / 2 - public_9_bg4.width / 2; //40;
        public_9_bg4.y = 10;
        this.addChildToContainer(public_9_bg4);
        var public_9_wifebg = BaseBitmap.create("public_tcdw_bg03");
        public_9_wifebg.anchorOffsetX = public_9_wifebg.width / 2;
        public_9_wifebg.anchorOffsetY = public_9_wifebg.height / 2;
        public_9_wifebg.scaleX = 5;
        public_9_wifebg.scaleY = 5;
        public_9_wifebg.x = 190;
        public_9_wifebg.y = 200;
        this.addChildToContainer(public_9_wifebg);
        var prisonHead = BaseLoadBitmap.create("story_npc_" + this.param.data);
        prisonHead.x = 45;
        prisonHead.y = 10;
        prisonHead.scaleX = 0.7;
        prisonHead.scaleY = 0.7;
        this.addChildToContainer(prisonHead);
        var public_9_probiginnerbg = BaseBitmap.create("public_tc_bg03");
        public_9_probiginnerbg.width = 226;
        public_9_probiginnerbg.height = 362;
        public_9_probiginnerbg.x = 340;
        public_9_probiginnerbg.y = public_9_bg4.y + 10;
        this.addChildToContainer(public_9_probiginnerbg);
        //惩罚消耗
        this.prisonPenaltyConsumptionTxt = ComponentManager.getTextField("", detailFntSize, TextFieldConst.COLOR_BROWN);
        this.prisonPenaltyConsumptionTxt.text = LanguageManager.getlocal("prisonPenaltyConsumption", [this.PrisonItemCfg.cost + ""]);
        this.addChildToContainer(this.prisonPenaltyConsumptionTxt);
        this.prisonPenaltyConsumptionTxt.x = public_9_probiginnerbg.x + 30;
        if (PlatformManager.checkIsViSp()) {
            this.prisonPenaltyConsumptionTxt.x = public_9_probiginnerbg.x + 15;
        }
        this.prisonPenaltyConsumptionTxt.y = public_9_probiginnerbg.y + 40;
        //惩罚上限
        this.prisonPunishmentOnlineTxt = ComponentManager.getTextField("", detailFntSize, TextFieldConst.COLOR_BROWN);
        if (this.PrisonItemCfg.num == 0) {
            var str = LanguageManager.getlocal("prisonerInfinite");
            this.prisonPunishmentOnlineTxt.text = LanguageManager.getlocal("prisonPunishmentOnline", [str]);
        }
        else {
            this.prisonPunishmentOnlineTxt.text = LanguageManager.getlocal("prisonPunishmentOnline", [this.PrisonItemCfg.num]);
        }
        this.prisonPunishmentOnlineTxt.setPosition(this.prisonPenaltyConsumptionTxt.x, this.prisonPenaltyConsumptionTxt.y + 30);
        this.addChildToContainer(this.prisonPunishmentOnlineTxt);
        var public_biaoti = BaseBitmap.create("public_biaoti2");
        public_biaoti.x = 360;
        public_biaoti.y = 135;
        public_biaoti.width = 180;
        this.addChildToContainer(public_biaoti);
        //有几率获得
        this.prisonProbabilityTxt = ComponentManager.getTextField("", detailFntSize, TextFieldConst.COLOR_BROWN);
        this.prisonProbabilityTxt.text = LanguageManager.getlocal("dailyTask_rewardTip");
        this.prisonProbabilityTxt.setPosition(public_biaoti.x + 30, public_biaoti.y + 8);
        this.addChildToContainer(this.prisonProbabilityTxt);
        //奖励文字 
        this.dropTxt = ComponentManager.getTextField("", detailFntSize, TextFieldConst.COLOR_WARN_GREEN);
        this.nameArr = [];
        this.dropTxt.width = public_9_probiginnerbg.width - 11;
        if (PlatformManager.checkIsViSp()) {
            this.dropTxt.width = public_9_probiginnerbg.width - 21;
        }
        this.dropTxt.height = public_9_probiginnerbg.height;
        this.dropTxt.text = this.getItemStr();
        this.dropTxt.x = 355;
        this.dropTxt.y = 185;
        // this.dropTxt.setPosition(this.prisonPenaltyConsumptionTxt.x,this.prisonPunishmentOnlineTxt.y+70);
        this.addChildToContainer(this.dropTxt);
        //名字底图
        var nameBottom = BaseBitmap.create("public_tc_hd01");
        nameBottom.width = 294;
        nameBottom.height = 76;
        nameBottom.x = public_9_bg4.x + 3;
        nameBottom.y = 318;
        this.addChildToContainer(nameBottom);
        //囚犯名字
        this.prisonNameTex = ComponentManager.getTextField("", detailFntSize, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.prisonNameTex.text = LanguageManager.getlocal("prisonerName" + num);
        this.prisonNameTex.setPosition(nameBottom.width / 2 + nameBottom.x - this.prisonNameTex.width / 2, nameBottom.y + 6);
        this.addChildToContainer(this.prisonNameTex);
        var huawen = BaseBitmap.create("public_huawen_bg");
        huawen.x = 110;
        huawen.y = 354;
        this.addChildToContainer(huawen);
        var offFntSize = TextFieldConst.FONTSIZE_CONTENT_SMALL;
        if (PlatformManager.checkIsViSp()) {
            offFntSize = TextFieldConst.FONTSIZE_ACTIVITY_COMMON;
        }
        //囚犯官职
        this.officeTex = ComponentManager.getTextField("", offFntSize, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.officeTex.text = LanguageManager.getlocal("prisonerOffice" + num);
        this.officeTex.setPosition(nameBottom.width / 2 + nameBottom.x - this.officeTex.width / 2, nameBottom.y + 50);
        this.addChildToContainer(this.officeTex);
    };
    //获取拼接文字
    PrisonDetailsPopupView.prototype.getItemStr = function () {
        this.nameArr = [];
        this.itemNameStr = "";
        for (var i = 0; i < this.PrisonItemCfg.drop.length; i++) {
            var rewardVo = GameData.getRewardItemVoByIdAndType(this.PrisonItemCfg.drop[i]);
            if (this.nameArr.indexOf(rewardVo.name) == -1) {
                this.nameArr.push(rewardVo.name);
            }
        }
        for (var j = 0; j < this.nameArr.length; j++) {
            this.itemNameStr = this.itemNameStr.concat(this.nameArr[j] + ".");
        }
        return this.itemNameStr;
    };
    PrisonDetailsPopupView.prototype.getShowHeight = function () {
        return 500;
    };
    PrisonDetailsPopupView.prototype.dispose = function () {
        this.prisonPenaltyConsumptionTxt = null;
        this.prisonPunishmentOnlineTxt = null;
        this.dropTxt = null;
        this.nameArr = [];
        this.itemNameStr = "";
        this.PrisonItemCfg = null;
        this.index = 0;
        _super.prototype.dispose.call(this);
    };
    return PrisonDetailsPopupView;
}(PopupView));
__reflect(PrisonDetailsPopupView.prototype, "PrisonDetailsPopupView");
