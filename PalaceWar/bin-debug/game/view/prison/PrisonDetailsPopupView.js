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
        var public_9_bg4 = BaseBitmap.create("public_9_bg4");
        public_9_bg4.x = public_9_bg4.x + 25 + GameData.popupviewOffsetX;
        public_9_bg4.y = public_9_bg4.y + 20;
        public_9_bg4.width = 520;
        public_9_bg4.height = 300;
        this.addChildToContainer(public_9_bg4);
        var public_9_wifebg = BaseLoadBitmap.create("searchbinfowifebg");
        public_9_wifebg.x = public_9_wifebg.x + 35 + GameData.popupviewOffsetX;
        public_9_wifebg.y = public_9_wifebg.y + 55;
        this.addChildToContainer(public_9_wifebg);
        // var newIndex = this.index+20;
        var prisonHead = BaseLoadBitmap.create("story_npc_" + this.param.data);
        prisonHead.x += 35 + GameData.popupviewOffsetX;
        prisonHead.y += 25;
        prisonHead.scaleX = 0.5;
        prisonHead.scaleY = 0.5;
        this.addChildToContainer(prisonHead);
        var public_9_probiginnerbg = BaseBitmap.create("public_9_probiginnerbg");
        public_9_probiginnerbg.width = 256;
        public_9_probiginnerbg.height = 258;
        public_9_probiginnerbg.x = 270 + GameData.popupviewOffsetX;
        public_9_probiginnerbg.y = 45;
        this.addChildToContainer(public_9_probiginnerbg);
        //创建滚动窗口内容面板
        var scrollPanel = new BaseDisplayObjectContainer();
        //惩罚消耗
        this.prisonPenaltyConsumptionTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this.prisonPenaltyConsumptionTxt.text = LanguageManager.getlocal("prisonPenaltyConsumption", [this.PrisonItemCfg.cost + ""]);
        // this.prisonPenaltyConsumptionTxt.setPosition(public_9_probiginnerbg.x+10,public_9_probiginnerbg.height/4+10);  
        // this.addChildToContainer(this.prisonPenaltyConsumptionTxt);
        this.prisonPenaltyConsumptionTxt.setPosition(10, public_9_probiginnerbg.height / 4 + 10 - 45);
        scrollPanel.addChild(this.prisonPenaltyConsumptionTxt);
        //惩罚上限
        this.prisonPunishmentOnlineTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        if (this.PrisonItemCfg.num == 0) {
            var str = LanguageManager.getlocal("prisonerInfinite");
            this.prisonPunishmentOnlineTxt.text = LanguageManager.getlocal("prisonPunishmentOnline", [str]);
        }
        else {
            this.prisonPunishmentOnlineTxt.text = LanguageManager.getlocal("prisonPunishmentOnline", [this.PrisonItemCfg.num]);
        }
        // this.prisonPunishmentOnlineTxt.setPosition(this.prisonPenaltyConsumptionTxt.x,public_9_probiginnerbg.height/4+40);
        // this.addChildToContainer(this.prisonPunishmentOnlineTxt);
        this.prisonPunishmentOnlineTxt.setPosition(this.prisonPenaltyConsumptionTxt.x, public_9_probiginnerbg.height / 4 + 40);
        scrollPanel.addChild(this.prisonPunishmentOnlineTxt);
        //有几率获得
        this.prisonProbabilityTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this.prisonProbabilityTxt.text = LanguageManager.getlocal("dailyTask_rewardTip");
        // this.prisonProbabilityTxt.setPosition(this.prisonPenaltyConsumptionTxt.x,this.prisonPunishmentOnlineTxt.y+40);
        // this.addChildToContainer(this.prisonProbabilityTxt);
        this.prisonProbabilityTxt.setPosition(this.prisonPenaltyConsumptionTxt.x, this.prisonPunishmentOnlineTxt.y + 40);
        scrollPanel.addChild(this.prisonProbabilityTxt);
        //奖励文字 
        this.dropTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        this.nameArr = [];
        this.dropTxt.width = public_9_probiginnerbg.width - 11;
        // this.dropTxt.height =public_9_probiginnerbg.height;
        this.dropTxt.text = this.getItemStr();
        // this.dropTxt.setPosition(this.prisonPenaltyConsumptionTxt.x,this.prisonPunishmentOnlineTxt.y+70);
        // this.addChildToContainer(this.dropTxt);
        this.dropTxt.setPosition(this.prisonPenaltyConsumptionTxt.x, this.prisonPunishmentOnlineTxt.y + 70);
        scrollPanel.addChild(this.dropTxt);
        scrollPanel.height = this.dropTxt.y + this.dropTxt.height + 10;
        //创建滚动窗口
        var rect = new egret.Rectangle(0, 0, 256, 258);
        var scrollView = ComponentManager.getScrollView(scrollPanel, rect);
        scrollView.horizontalScrollPolicy = "off";
        //填充scrollview 触发点击
        var touchPanel = BaseBitmap.create("public_9_probiginnerbg");
        touchPanel.alpha = 0;
        touchPanel.width = scrollPanel.width;
        touchPanel.height = scrollPanel.height;
        touchPanel.x = 0;
        touchPanel.y = 0;
        scrollPanel.addChild(touchPanel);
        scrollView.x = 270 + GameData.popupviewOffsetX;
        scrollView.y = 45;
        this.addChildToContainer(scrollView);
        // scrollView.setPosition(this.prisonPenaltyConsumptionTxt.x,this.prisonPunishmentOnlineTxt.y+70);
        // this.addChildToContainer(scrollView);
        //添加滚动条
        // let rect = new egret.Rectangle(0,0,256, 258);
        // let scrollView = ComponentManager.getScrollView(this.dropTxt,rect);
        //名字底图
        var nameBottom = BaseLoadBitmap.create("prisonview_namebg");
        nameBottom.width = 200;
        nameBottom.height = 52;
        nameBottom.x = public_9_wifebg.x + 10;
        nameBottom.y = 260;
        this.addChildToContainer(nameBottom);
        //囚犯名字
        this.prisonNameTex = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this.prisonNameTex.text = LanguageManager.getlocal("prisonerName" + num);
        this.prisonNameTex.setPosition(nameBottom.width / 2 + nameBottom.x - this.prisonNameTex.width / 2, nameBottom.y + 6);
        this.addChildToContainer(this.prisonNameTex);
        //囚犯官职
        this.officeTex = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this.officeTex.text = LanguageManager.getlocal("prisonerOffice" + num);
        this.officeTex.setPosition(nameBottom.width / 2 + nameBottom.x - this.officeTex.width / 2, nameBottom.y + 30);
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
        return 400;
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
//# sourceMappingURL=PrisonDetailsPopupView.js.map