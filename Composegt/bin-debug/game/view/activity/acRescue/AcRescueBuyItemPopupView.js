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
 * 购买道具
 * author dky
 * date 2017/11/21
 * @class AcRescueBuyItemPopupView
 */
var AcRescueBuyItemPopupView = (function (_super) {
    __extends(AcRescueBuyItemPopupView, _super);
    function AcRescueBuyItemPopupView() {
        var _this = _super.call(this) || this;
        _this._bottomNodeList = [];
        _this._topNodeList = [];
        _this._index = 0;
        _this._tabbarGroup = undefined;
        return _this;
    }
    AcRescueBuyItemPopupView.prototype.initView = function () {
        // App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.checkData,this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.checkData, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.refreshHandler, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_USERESCUEITEM), this.checkData, this);
        var tabName = ["rescueShoptab1", "rescueShoptab2", "acPunishExPopupViewTitle"];
        var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_WINTAB, tabName, this.tabBtnClickHandler, this);
        tabbarGroup.setSpace(3);
        tabbarGroup.x = 40;
        tabbarGroup.y = 60;
        this.addChildToContainer(tabbarGroup);
        this._tabbarGroup = tabbarGroup;
        for (var index = 0; index < tabName.length; index++) {
            var tmpNode = new BaseDisplayObjectContainer();
            tmpNode.x = tabbarGroup.x - 1;
            tmpNode.y = tabbarGroup.y + tabbarGroup.height - 3;
            this._bottomNodeList.push(tmpNode);
            this.addChildToContainer(tmpNode);
            var topNode = new BaseDisplayObjectContainer();
            this._topNodeList.push(topNode);
            this.addChildToContainer(topNode);
        }
        var goldBar = ComponentManager.getResBar(ItemEnums.gem, true);
        goldBar.setPosition(40, 15);
        this._topNodeList[0].addChild(goldBar);
        var addGoldBtn = ComponentManager.getButton("mainui_btn1", "", this.addGoldBtnClickHandler, this);
        addGoldBtn.x = goldBar.x + goldBar.width - 20;
        addGoldBtn.y = goldBar.y + goldBar.height / 2 - addGoldBtn.height / 2 - 7;
        this._topNodeList[0].addChild(addGoldBtn);
        if (PlatformManager.checkHideIconByIP()) {
            addGoldBtn.visible = false;
        }
        // if(Api.switchVoApi.checkPunishVip()){
        // let itemName:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acPunishBuyItemDesc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        // itemName.setPosition(this.viewBg.width - itemName.width - 50,goldBar.y + goldBar.height/2 - addGoldBtn.height/2 + 10);
        // this._topNodeList[0].addChild(itemName);
        // }
        var txtBg1 = BaseBitmap.create("public_tc_bg02");
        txtBg1.x = this.viewBg.width / 2 - txtBg1.width / 2;
        txtBg1.y = 10;
        this.addChildToContainer(txtBg1);
        this._topNodeList[1].addChild(txtBg1);
        var txtBg2 = BaseBitmap.create("public_tc_bg02");
        txtBg2.x = this.viewBg.width / 2 - txtBg2.width / 2;
        txtBg2.y = 10;
        this.addChildToContainer(txtBg2);
        this._topNodeList[2].addChild(txtBg2);
        var acVo = Api.acVoApi.getActivityVoByAidAndCode(AcRescueBuyItemPopupView.aid, AcRescueBuyItemPopupView.code);
        this._powerText = ComponentManager.getTextField(LanguageManager.getlocal("rescuePower") + acVo.power, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._powerText.setPosition(this.viewBg.width / 2 - this._powerText.width / 2, goldBar.y + goldBar.height / 2 - addGoldBtn.height / 2 + 10);
        this._topNodeList[1].addChild(this._powerText);
        this._scoreText = ComponentManager.getTextField(LanguageManager.getlocal("pointNumber") + ":" + acVo.score, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._scoreText.setPosition(this.viewBg.width / 2 - this._scoreText.width / 2, goldBar.y + goldBar.height / 2 - addGoldBtn.height / 2 + 10);
        this._topNodeList[2].addChild(this._scoreText);
        this.initShopInfo(this._bottomNodeList[0]);
        this.initCangKuInfo(this._bottomNodeList[1]);
        this.initExInfo(this._bottomNodeList[2]);
        tabbarGroup.selectedIndex = this.param.tab ? parseInt(this.param.tab) : 0;
        this.tabBtnClickHandler({ index: this.param.tab ? parseInt(this.param.tab) : 0 });
        // this.initItemsInfo(this._bottomNodeList[2],bottomH);
    };
    AcRescueBuyItemPopupView.prototype.initShopInfo = function (tmpNode) {
        var acRescueBuyItemPopup1 = new AcRescueBuyItemPopup1();
        tmpNode.addChild(acRescueBuyItemPopup1);
    };
    AcRescueBuyItemPopupView.prototype.initCangKuInfo = function (tmpNode) {
        var acRescueBuyItemPopup2 = new AcRescueBuyItemPopup2();
        tmpNode.addChild(acRescueBuyItemPopup2);
        tmpNode["acRescueBuyItemPopup2"] = acRescueBuyItemPopup2;
    };
    AcRescueBuyItemPopupView.prototype.initExInfo = function (tmpNode) {
        var acRescueBuyItemPopup3 = new AcRescueBuyItemPopup3();
        tmpNode.addChild(acRescueBuyItemPopup3);
    };
    AcRescueBuyItemPopupView.prototype.tabBtnClickHandler = function (params) {
        for (var index = 0; index < this._bottomNodeList.length; index++) {
            this._bottomNodeList[index].visible = false;
            this._topNodeList[index].visible = false;
            if (this._bottomNodeList[index].acRescueBuyItemPopup2 && this._bottomNodeList[index].acRescueBuyItemPopup2.refreshUI2) {
                this._bottomNodeList[index].acRescueBuyItemPopup2.refreshUI2();
            }
        }
        this._bottomNodeList[params.index].visible = true;
        this._topNodeList[params.index].visible = true;
    };
    // protected getTabbarTextArr():Array<string>
    // {
    // 	return ["rescueShoptab1","rescueShoptab2",
    // 	"acPunishExPopupViewTitle",
    // 	];
    // }
    AcRescueBuyItemPopupView.prototype.addGoldBtnClickHandler = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        // this.hide();
    };
    AcRescueBuyItemPopupView.prototype.refreshHandler = function () {
        // this._scrollList.refreshData(this._dataList);
    };
    AcRescueBuyItemPopupView.prototype.checkData = function () {
        var acVo = Api.acVoApi.getActivityVoByAidAndCode(AcRescueBuyItemPopupView.aid, AcRescueBuyItemPopupView.code);
        // this._topNodeList[1].addChild(this._powerText);
        var power = this._powerText.text;
        this._powerText.text = LanguageManager.getlocal("rescuePower") + acVo.power;
        this._scoreText.text = LanguageManager.getlocal("pointNumber") + ":" + acVo.score;
        // this._
    };
    AcRescueBuyItemPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    // protected getTabbarTextArr():Array<string>
    // {
    // 	return ["wifeViewTab1Title",
    // 			"wifeViewTab2Title"
    // 	];
    // }
    // protected getRuleInfo():string
    // {
    // 	return "wife_description";
    // }
    AcRescueBuyItemPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            // "progress2_bg","progress2"
            "progress4tc_01", "progress4tc_02"
        ]);
    };
    AcRescueBuyItemPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.refreshHandler, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.checkData, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_USERESCUEITEM), this.checkData, this);
        // 未婚滑动列表
        this._scrollList = null;
        // App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.checkData,this);
        // this._text1 = null;
        this._index = null;
        this._dataList = null;
        this._tabbarGroup = null;
        this._bottomNodeList = [];
        this._topNodeList = [];
        this._powerText = null;
        this._scoreText = null;
        // this.
        _super.prototype.dispose.call(this);
    };
    AcRescueBuyItemPopupView.aid = "";
    AcRescueBuyItemPopupView.code = "";
    return AcRescueBuyItemPopupView;
}(PopupView));
__reflect(AcRescueBuyItemPopupView.prototype, "AcRescueBuyItemPopupView");
