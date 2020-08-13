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
 * 帮会建设
 * author dky
 * date 2017/12/5
 * @class AllianceBuildPopupView
 */
var AllianceBuildPopupView = (function (_super) {
    __extends(AllianceBuildPopupView, _super);
    function AllianceBuildPopupView() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        return _this;
    }
    AllianceBuildPopupView.prototype.initView = function () {
        Api.mainTaskVoApi.checkShowGuide("AllianceBuildPopupView");
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ALLIANCE_BUILD, this.doBuy, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, this.checkData, this);
        //
        var icon1Bg = BaseBitmap.create("public_hb_bg01");
        icon1Bg.x = 40;
        icon1Bg.y = 15;
        this.addChildToContainer(icon1Bg);
        var icon1 = BaseBitmap.create("public_icon1");
        // icon1.setScale(0.5);
        icon1.x = icon1Bg.x;
        icon1.y = icon1Bg.y + icon1Bg.height / 2 - icon1.height / 2;
        this.addChildToContainer(icon1);
        var gem = Api.playerVoApi.getPlayerGemStr();
        this._text1 = ComponentManager.getTextField(gem, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._text1.x = icon1Bg.x + 50;
        this._text1.y = icon1Bg.y + icon1Bg.height / 2 - this._text1.height / 2;
        this.addChildToContainer(this._text1);
        var addGoldBtn = ComponentManager.getButton("mainui_btn1", "", this.addGoldBtnClickHandler, this);
        addGoldBtn.x = icon1Bg.x + icon1Bg.width;
        addGoldBtn.y = icon1Bg.y + icon1Bg.height / 2 - addGoldBtn.height / 2;
        this.addChildToContainer(addGoldBtn);
        if (Api.switchVoApi.checkClosePay() || PlatformManager.checkHideIconByIP()) {
            addGoldBtn.visible = false;
        }
        var allianecVo = Api.allianceVoApi.getAllianceVo();
        var bNum = allianecVo.info.donateNum ? allianecVo.info.donateNum : 0;
        bNum = allianecVo.maxmn - bNum;
        if (bNum < 0) {
            bNum = 0;
        }
        var buildStr = LanguageManager.getlocal("allianceBuildTime", [bNum, allianecVo.maxmn.toString()]);
        this._buildTimeTF = ComponentManager.getTextField(buildStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._buildTimeTF.x = this.viewBg.width - this._buildTimeTF.width - 50;
        this._buildTimeTF.y = icon1Bg.y + icon1Bg.height / 2 - this._buildTimeTF.height / 2;
        if (bNum <= 0) {
            this._buildTimeTF.text = LanguageManager.getlocal("allianceBuildTime2", [bNum, allianecVo.maxmn.toString()]);
        }
        this.addChildToContainer(this._buildTimeTF);
        var bottomBg = BaseBitmap.create("public_tc_bg01");
        bottomBg.width = 530;
        bottomBg.height = 555;
        bottomBg.x = this.viewBg.x + this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = 75;
        this.addChildToContainer(bottomBg);
        var list1 = new Array();
        for (var index = 0; index < 4; index++) {
            list1.push(index);
        }
        this._dataList = new Array();
        var cfg = Config.AlliancebaseCfg.contributeList;
        for (var index = 1; index < 6; index++) {
            this._dataList.push(cfg[index.toString()]);
        }
        // let list = Config.WifebaseCfg.wifeGift;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, bottomBg.width - 20, bottomBg.height - 20);
        this._scrollList = ComponentManager.getScrollList(AllianceBuildScrollItem, this._dataList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(bottomBg.x + 10, bottomBg.y + 10);
    };
    AllianceBuildPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "dinnertypepopupview",
            "dinner_gems_1",
            "dinner_gems_2",
            "dinner_gems_3",
        ]);
    };
    AllianceBuildPopupView.prototype.addGoldBtnClickHandler = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    AllianceBuildPopupView.prototype.doBuy = function (event) {
        var data = event.data;
        this._index = data.index;
        this.request(NetRequestConst.REQUEST_ALLIANCE_DONATE, { donatetype: data.key });
    };
    //请求回调
    AllianceBuildPopupView.prototype.receiveData = function (data) {
        if (data.ret == false) {
            return;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_DONATE) {
            // if(data.data.data && data.data.data.rewards)
            // {
            // 	let rewards= GameData.formatRewardItem(data.data.data.rewards);
            // 	if(rewards&&rewards.length>0)
            // 	{
            // 		App.CommonUtil.playRewardFlyAction(rewards);
            // 	}
            // }
            this._scrollList.refreshData(this._dataList);
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceBuildSuccess"));
            var gem = Api.playerVoApi.getPlayerGemStr();
            this._text1.text = gem;
            var cfg = Config.AlliancebaseCfg.contributeList;
            var doData = cfg[data.data.data.donatetype];
            var itemDescStr = LanguageManager.getlocal("allianceBuildGet", [doData.exp, doData.asset, doData.contribution]);
            var pos = egret.Point.create(320, GameConfig.stageHeigth / 2);
            if (data.data.data.donateMaxFlag) {
                App.CommonUtil.playRewardFlyAction([
                    // 	{
                    // tipMessage:LanguageManager.getlocal("allianceBuildGet1")+"+"+doData.exp},
                    // {tipMessage:LanguageManager.getlocal("allianceBuildGet2")+"+"+doData.asset},
                    { tipMessage: LanguageManager.getlocal("allianceBuildGet3") + "+" + doData.contribution },
                ], pos);
            }
            else {
                App.CommonUtil.playRewardFlyAction([
                    {
                        tipMessage: LanguageManager.getlocal("allianceBuildGet1") + "+" + doData.exp
                    },
                    { tipMessage: LanguageManager.getlocal("allianceBuildGet2") + "+" + doData.asset },
                    { tipMessage: LanguageManager.getlocal("allianceBuildGet3") + "+" + doData.contribution },
                ], pos);
            }
        }
    };
    AllianceBuildPopupView.prototype.refreshHandler = function () {
    };
    AllianceBuildPopupView.prototype.hide = function () {
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
    AllianceBuildPopupView.prototype.checkData = function () {
        this._text1.text = Api.playerVoApi.getPlayerGemStr();
        var allianecVo = Api.allianceVoApi.getAllianceVo();
        var bNum = allianecVo.info.donateNum ? allianecVo.info.donateNum : 0;
        bNum = allianecVo.maxmn - bNum;
        if (bNum < 0) {
            bNum = 0;
        }
        var buildStr = LanguageManager.getlocal("allianceBuildTime", [bNum, allianecVo.maxmn.toString()]);
        this._buildTimeTF.text = buildStr;
        if (bNum <= 0) {
            this._buildTimeTF.text = LanguageManager.getlocal("allianceBuildTime2", [bNum, allianecVo.maxmn.toString()]);
        }
    };
    AllianceBuildPopupView.prototype.dispose = function () {
        Api.mainTaskVoApi.hideGuide();
        // 未婚滑动列表
        this._scrollList = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ALLIANCE_BUILD, this.doBuy, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, this.checkData, this);
        this._text1 = null;
        this._index = null;
        this._dataList = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceBuildPopupView;
}(PopupView));
__reflect(AllianceBuildPopupView.prototype, "AllianceBuildPopupView");
