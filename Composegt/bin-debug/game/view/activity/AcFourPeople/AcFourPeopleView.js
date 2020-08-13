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
var AcFourPeopleView = (function (_super) {
    __extends(AcFourPeopleView, _super);
    function AcFourPeopleView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._fourPeopleInfoVoList = null;
        _this._activityTimerText = null;
        _this._acCDTxt = null;
        _this._ruleText = null;
        _this._inOrderText = null;
        return _this;
    }
    AcFourPeopleView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "forpeople_bottom",
            "forpeople_qualifications",
            "servant_star",
            "achievement_state3",
            "recharge_fnt",
            "fourfloor",
            "fourpecialaura",
            "fourpeople_mask",
            "fourpeople_bottom",
            "fourpeople_bg_4_namebg",
            "fourpeople_4_waitting",
            "forpeople_qualifications2",
            'fourpeople_topbg_' + this.code, 'fourpeople_txt_' + this.code,
        ]);
    };
    AcFourPeopleView.prototype.initView = function () {
        // let maskSp = new egret.Shape();
        // maskSp.graphics.beginFill(0x000000);
        // maskSp.graphics.drawRect(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 180);
        // maskSp.graphics.endFill();
        // maskSp.y = 180;
        // this.addChildToContainer(maskSp);
        if (ResourceManager.hasRes("fourpeople_txt_" + this.code)) {
            var titletxt = BaseBitmap.create("fourpeople_txt_" + this.code);
            titletxt.x = GameConfig.stageWidth / 2 - titletxt.width / 2;
            // titletxt.y = 5;
            this.addChild(titletxt);
        }
        this.showText();
        this.showList();
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_EXCHANGEFOURPEOPLE), this.useCallback, this);
        //初始化 时间
        var deltaT = this.acVo.et - GameData.serverTime;
        var cdStrK = "acFourPeople_acCD";
        if (this.code == "4") {
            cdStrK = "acFourPeople_acCD2";
        }
        if (this._acCDTxt && deltaT > 0) {
            this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [App.DateUtil.getFormatBySecond(deltaT, 1)]);
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
        }
    };
    AcFourPeopleView.prototype.showText = function () {
        //顶部背景图片
        // if(this.code == "4"){
        var forpeople_top = BaseLoadBitmap.create('fourpeople_descbg_' + this.code);
        forpeople_top.width = 640;
        forpeople_top.height = 146;
        this.addChildToContainer(forpeople_top);
        forpeople_top.y = 72;
        // }
        //活动时间   
        this._activityTimerText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._activityTimerText.x = 30;
        this._activityTimerText.y = 109 - 22;
        this._activityTimerText.text = this.acVo.getAcLocalTime(true);
        this.addChildToContainer(this._activityTimerText);
        var deltaY = 11;
        if (PlatformManager.checkIsViSp()) {
            // this._activityTimerText.x = 10;
            deltaY = 5;
        }
        //倒计时文本 
        var acCDTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [""]);
        acCDTxt.x = this._activityTimerText.x;
        acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + deltaY;
        this.addChildToContainer(acCDTxt);
        this._acCDTxt = acCDTxt;
        //规则
        this._ruleText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._ruleText.x = 30;
        this._ruleText.y = this._acCDTxt.y + this._activityTimerText.height + deltaY;
        this._ruleText.text = LanguageManager.getlocal("acFourPeopleRule" + this.code);
        this.addChildToContainer(this._ruleText);
        if (PlatformManager.checkIsViSp()) {
            this._ruleText.multiline = true;
            this._ruleText.width = GameConfig.stageWidth - this._ruleText.x - 15;
            this._ruleText.lineSpacing = 2;
        }
        //谋士令
        this._inOrderText = ComponentManager.getTextField(LanguageManager.getlocal("acFourPeopleInOrder" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._inOrderText.x = 30;
        this._inOrderText.y = this._ruleText.y + this._ruleText.height + deltaY;
        this.addChildToContainer(this._inOrderText);
    };
    AcFourPeopleView.prototype.addChildToContainer = function (obj) {
        if (obj) {
            this.container.addChild(obj);
            this.container.y = 0;
        }
    };
    AcFourPeopleView.prototype.showList = function () {
        this._fourPeopleInfoVoList = [];
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        this._fourPeopleInfoVoList = cfg.getPeopleList();
        AcFourPeopleScrollItem.CODE = this.code;
        this._scrollList = null;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 640, GameConfig.stageHeigth - 225);
        this._scrollList = ComponentManager.getScrollList(AcFourPeopleScrollItem, this._fourPeopleInfoVoList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(0, 220 - 4);
    };
    AcFourPeopleView.prototype.tick = function () {
        var deltaT = this.acVo.et - GameData.serverTime;
        var cdStrK = "acFourPeople_acCD";
        if (this.code == "4") {
            cdStrK = "acFourPeople_acCD2";
        }
        if (this._acCDTxt && deltaT > 0) {
            this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [App.DateUtil.getFormatBySecond(deltaT, 1)]);
            return true;
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
        }
        return false;
    };
    AcFourPeopleView.prototype.useCallback = function (event) {
        if (event.data.ret == true) {
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            var arr = cfg.getPeopleList();
            this._scrollList.refreshData(arr);
        }
    };
    AcFourPeopleView.prototype.getSheepType = function () {
        return 1;
    };
    // 标题背景名称
    AcFourPeopleView.prototype.getTitleBgName = function () {
        return 'fourpeople_topbg_' + this.code;
    };
    AcFourPeopleView.prototype.getTitleStr = function () {
        return null;
    };
    AcFourPeopleView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_EXCHANGEFOURPEOPLE), this.useCallback, this);
        this._scrollList = null;
        this._activityTimerText = null;
        this._acCDTxt = null;
        this._inOrderText = null;
        this._ruleText = null;
        this._fourPeopleInfoVoList = null;
        _super.prototype.dispose.call(this);
    };
    return AcFourPeopleView;
}(AcCommonView));
__reflect(AcFourPeopleView.prototype, "AcFourPeopleView");
