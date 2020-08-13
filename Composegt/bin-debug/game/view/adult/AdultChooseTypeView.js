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
 * 选择提亲道具
 * author dky
 * date 201710/30
 * @class AdultChooseTypeView
 */
var AdultChooseTypeView = (function (_super) {
    __extends(AdultChooseTypeView, _super);
    function AdultChooseTypeView() {
        return _super.call(this) || this;
    }
    AdultChooseTypeView.prototype.initView = function () {
        var childId = this.param.data.childId;
        var childInfo = Api.adultVoApi.getAdultInfoVoById(childId);
        var costItemId = Config.AdultCfg.getItemCfgById(childInfo.aquality).needItem;
        var itemInfo = Api.itemVoApi.getItemInfoVoById(Number(costItemId));
        var itemListCfg = Config.ItemCfg.getItemCfgById;
        var itemCfg = Config.ItemCfg.getItemCfgById(Number(costItemId));
        var itemNum = 0;
        if (itemInfo) {
            itemNum = itemInfo.num;
        }
        // itemInfo.ic
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 520;
        bg.height = 315;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 45;
        this.addChildToContainer(bg);
        var bg1 = BaseBitmap.create("public_tc_bg03");
        bg1.width = 500;
        bg1.height = 140;
        bg1.x = this.viewBg.x + this.viewBg.width / 2 - bg1.width / 2;
        bg1.y = 58;
        this.addChildToContainer(bg1);
        var cor11 = BaseBitmap.create("public_tcdw_bg01");
        cor11.x = bg1.x;
        cor11.y = bg1.y + 2;
        this.addChildToContainer(cor11);
        var descText = ComponentManager.getTextField(LanguageManager.getlocal("adultChooseTypeDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        descText.x = bg1.x + bg1.width / 2 - descText.width / 2;
        descText.y = 15;
        this.addChildToContainer(descText);
        var cor22 = BaseBitmap.create("public_tcdw_bg02");
        cor22.x = bg1.x + bg1.width - cor22.width;
        cor22.y = bg1.y + 2;
        this.addChildToContainer(cor22);
        var bg2 = BaseBitmap.create("public_tc_bg03");
        bg2.width = 500;
        bg2.height = 140;
        bg2.x = this.viewBg.x + this.viewBg.width / 2 - bg2.width / 2;
        bg2.y = bg1.y + bg1.height + 10;
        this.addChildToContainer(bg2);
        var cor1 = BaseBitmap.create("public_tcdw_bg01");
        cor1.x = bg2.x;
        cor1.y = bg2.y + 2;
        this.addChildToContainer(cor1);
        var cor2 = BaseBitmap.create("public_tcdw_bg02");
        cor2.x = bg2.x + bg2.width - cor2.width;
        cor2.y = bg2.y + 2;
        this.addChildToContainer(cor2);
        var selecte1dIconBg = BaseBitmap.create("itembg_1");
        selecte1dIconBg.x = bg1.x + 20;
        selecte1dIconBg.y = bg1.y + 15;
        this.addChildToContainer(selecte1dIconBg);
        var selected1Icon = BaseLoadBitmap.create("itemicon1");
        selected1Icon.x = selecte1dIconBg.x + 5;
        selected1Icon.y = selecte1dIconBg.y + 5;
        this.addChildToContainer(selected1Icon);
        var selecte2dIconBg = BaseBitmap.create(itemCfg.iconBg);
        selecte2dIconBg.x = bg2.x + 20;
        selecte2dIconBg.y = bg2.y + 15;
        this.addChildToContainer(selecte2dIconBg);
        var selected2Icon = BaseLoadBitmap.create(itemCfg.icon);
        selected2Icon.x = selecte2dIconBg.x + 5;
        selected2Icon.y = selecte2dIconBg.y + 5;
        this.addChildToContainer(selected2Icon);
        var cost1Str = LanguageManager.getlocal("adultChooseCost") + Config.AdultCfg.getItemCfgById(childInfo.aquality).needGem + LanguageManager.getlocal("gemName");
        var cost1TF = ComponentManager.getTextField(cost1Str, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        cost1TF.x = selecte1dIconBg.x + selecte1dIconBg.width + 15;
        cost1TF.y = selecte1dIconBg.y + 20;
        this.addChildToContainer(cost1TF);
        var cost2Str = LanguageManager.getlocal("adultChooseCost") + itemCfg.name;
        var cost2TF = ComponentManager.getTextField(cost2Str, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        cost2TF.x = cost1TF.x;
        cost2TF.y = selecte2dIconBg.y + 20;
        this.addChildToContainer(cost2TF);
        var have1Str = LanguageManager.getlocal("adultChooseNum") + Api.playerVoApi.getPlayerGem();
        var have1TF = ComponentManager.getTextField(have1Str, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        have1TF.x = selecte1dIconBg.x + selecte1dIconBg.width + 15;
        have1TF.y = selecte1dIconBg.y + 70;
        this.addChildToContainer(have1TF);
        var have2Str = LanguageManager.getlocal("adultChooseNum") + itemNum;
        var have2TF = ComponentManager.getTextField(have2Str, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        have2TF.x = cost1TF.x;
        have2TF.y = selecte2dIconBg.y + 70;
        this.addChildToContainer(have2TF);
        var choose1Btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE, "adultChoose", this.choose1Handler, this);
        choose1Btn.x = 415;
        choose1Btn.y = bg1.y + bg1.height / 2 - choose1Btn.height / 2;
        // choose1Btn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(choose1Btn);
        var choose2Btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE, "adultChoose", this.choose2Handler, this);
        choose2Btn.x = 415;
        choose2Btn.y = bg2.y + bg2.height / 2 - choose2Btn.height / 2;
        // choose2Btn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(choose2Btn);
    };
    AdultChooseTypeView.prototype.choose1Handler = function (param) {
        var childId = this.param.data.childId;
        var childInfo = Api.adultVoApi.getAdultInfoVoById(childId);
        var cost = Config.AdultCfg.getItemCfgById(childInfo.aquality).needGem;
        if (cost > Api.playerVoApi.getPlayerGem()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            return;
        }
        this.param.data.confirmCallback.apply(this.param.data.handler, [1]);
        this.hide();
    };
    AdultChooseTypeView.prototype.choose2Handler = function (param) {
        var childId = this.param.data.childId;
        var childInfo = Api.adultVoApi.getAdultInfoVoById(childId);
        var costItemId = Config.AdultCfg.getItemCfgById(childInfo.aquality).needItem;
        var itemInfo = Api.itemVoApi.getItemInfoVoById(Number(costItemId));
        var itemListCfg = Config.ItemCfg.getItemCfgById;
        var itemCfg = Config.ItemCfg.getItemCfgById(Number(costItemId));
        var itemNum = 0;
        if (itemInfo) {
            itemNum = itemInfo.num;
        }
        if (itemNum <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
            return;
        }
        this.param.data.confirmCallback.apply(this.param.data.handler, [2]);
        this.hide();
    };
    // protected getContainerY():number
    // {
    // 	return 0;
    // }
    // protected resetBgSize():void
    // {
    // 	super.resetBgSize();
    // 	this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/4*3 - this._cancelBtn.width/2 - 35,this._cancelBtn.y);
    // }
    // protected getConfirmBtnStr():string
    // {
    // 	return "sysConfirm";
    // }
    // protected getConfirmBtnName():string
    // {
    // 	return ButtonConst.BTN_NORMAL_YELLOW;
    // }
    AdultChooseTypeView.prototype.getTitleStr = function () {
        //  this._type = this.param.data.type 
        return "adultChooseTypeViewTitle";
    };
    // protected getResourceList():string[]
    // {
    // 	return super.getResourceList().concat(["shield_cn"]);
    // }
    AdultChooseTypeView.prototype.dispose = function () {
        this._type = null;
        this._useCallback = null;
        this._handler = null;
        this._cancelBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AdultChooseTypeView;
}(PopupView));
__reflect(AdultChooseTypeView.prototype, "AdultChooseTypeView");
