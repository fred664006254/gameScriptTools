var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 修身提升
 * author shaoliang
 * date 2020.04.08
 * @class WifeSkillPopupViewTab2
 */
var WifeSkillPopupViewTab2 = /** @class */ (function (_super) {
    __extends(WifeSkillPopupViewTab2, _super);
    function WifeSkillPopupViewTab2() {
        var _this = _super.call(this) || this;
        _this._wifeId = null;
        _this._wifeExp = null;
        _this._scrollList = null;
        _this._exchangeBtn = null;
        _this._index = 0;
        _this._isSkill2 = true;
        _this.initView();
        return _this;
    }
    WifeSkillPopupViewTab2.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_WIFE_SKILL2UPD, this.doGive, this);
        var parentView = ViewController.getInstance().getView("WifeSkillPopupView");
        this._wifeId = parentView.getWifeId();
        var id = this._wifeId;
        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
        var cfg = Config.WifeCfg.getWifeCfgById(id);
        this.width = 574;
        var bg2 = BaseBitmap.create("public_9_bg4");
        bg2.width = 528;
        bg2.height = 670;
        bg2.setPosition(26.5, 58);
        this.addChild(bg2);
        var headBg = BaseBitmap.create("skin_head_bg");
        headBg.x = 20 + 25;
        headBg.y = 68;
        headBg.setScale(0.85);
        this.addChild(headBg);
        var headPic = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(), Api.playerVoApi.getPlayerPtitle());
        headPic.setPosition(34 + 25, 75);
        this.addChild(headPic);
        var nameTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeMultiSkillSlimInfo"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        nameTF.x = 150 + 25;
        nameTF.y = headPic.y + 10;
        this.addChild(nameTF);
        var expStr = LanguageManager.getlocal("wifeExp") + " " + this._wifeInfoVo.exp.toString();
        this._wifeExp = ComponentManager.getTextField(expStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        this._wifeExp.x = nameTF.x;
        this._wifeExp.y = nameTF.y + nameTF.height + 15;
        this.addChild(this._wifeExp);
        var tipTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkilTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
        tipTF.x = nameTF.x;
        tipTF.y = this._wifeExp.y + this._wifeExp.height + 15;
        this.addChild(tipTF);
        var bottomBg = BaseBitmap.create("public_9_bg94");
        bottomBg.width = 508;
        bottomBg.height = 528;
        bottomBg.x = bg2.x + bg2.width / 2 - bottomBg.width / 2;
        bottomBg.y = tipTF.y + tipTF.height + 15;
        this.addChild(bottomBg);
        var dataList = cfg.wifeSkill2;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 525, 495);
        this._scrollList = ComponentManager.getScrollList(WifeSkillScrollItem2, dataList, rect, { id: id, isSkill2: true });
        this.addChild(this._scrollList);
        this._scrollList.setPosition(bottomBg.x + 5, bottomBg.y + 5);
        if (Api.switchVoApi.checkWifeExpExchangeOpen()) {
            var exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "wifeSkillExcange", this.exchangeBtnClick, this);
            exchangeBtn.setPosition(this.width / 2 - exchangeBtn.width / 2, bottomBg.y + 513);
            this.addChild(exchangeBtn);
            this._exchangeBtn = exchangeBtn;
            if (Api.wifeVoApi.hasTransformRed(id) && Api.wifeVoApi.hasTransformRed2(id)) {
                App.CommonUtil.addIconToBDOC(exchangeBtn);
            }
            this.checkExchange();
        }
    };
    WifeSkillPopupViewTab2.prototype.checkExchange = function () {
        if (!this._exchangeBtn) {
            return;
        }
        if (Api.wifeVoApi.isAllSkillLevelMax(this._wifeInfoVo.id) && Api.wifeVoApi.isAllSkill2LevelMax(this._wifeInfoVo.id)) {
            this._exchangeBtn.visible = true;
            if (Api.wifeVoApi.hasTransformRed(this._wifeInfoVo.id) && Api.wifeVoApi.hasTransformRed2(this._wifeInfoVo.id)) {
                App.CommonUtil.addIconToBDOC(this._exchangeBtn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._exchangeBtn);
            }
        }
        else {
            this._exchangeBtn.visible = false;
        }
    };
    WifeSkillPopupViewTab2.prototype.exchangeBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.WIFEEXPEXCHANGEPOPUPVIEW, { id: this._wifeInfoVo.id, callback: this.exchangeCallback, handler: this });
    };
    WifeSkillPopupViewTab2.prototype.exchangeCallback = function (num2) {
        this.request(NetRequestConst.REQUEST_WIFE_SKILLEXPEXCHANGE, { wifeId: this.param.data.id.toString(), num: num2 });
    };
    WifeSkillPopupViewTab2.prototype.doGive = function (event) {
        App.LogUtil.log("dogive tab2");
        var data = event.data;
        this._index = data.index;
        this.request(NetRequestConst.REQUEST_WIFE_UPGRADESKILL, { wifeId: this.param.data.id.toString(), key: data.index, wifeSkill2: 1 });
    };
    //请求回调
    WifeSkillPopupViewTab2.prototype.receiveData = function (data) {
        if (data.ret) {
            if (data.data.cmd == NetRequestConst.REQUEST_WIFE_UPGRADESKILL) {
                if (data.data.data && data.data.data.rewards) {
                    // if (this._isSkill2){
                    var rewards = GameData.formatRewardItem(data.data.data.rewards);
                    if (rewards && rewards.length > 0) {
                        App.CommonUtil.playRewardFlyAction(rewards);
                    }
                    // }	
                }
                // if (this._isSkill2){
                var index = this._index;
                var wideItem = this._scrollList.getItemByIndex(index);
                wideItem.refreshData(index, this.param.data.id);
                var id = this.param.data.id;
                this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
                var expStr = LanguageManager.getlocal("wifeExp") + " " + this._wifeInfoVo.exp.toString();
                this._wifeExp.text = expStr;
                App.CommonUtil.showTip(LanguageManager.getlocal("wifeSkillUpdSuccess"));
                this.checkExchange();
                // }
            }
            else if (data.data.cmd == NetRequestConst.REQUEST_WIFE_SKILLEXPEXCHANGE) {
                if (data.data.data && data.data.data.rewards) {
                    var rewards = GameData.formatRewardItem(data.data.data.rewards);
                    if (rewards && rewards.length > 0) {
                        App.CommonUtil.playRewardFlyAction(rewards);
                    }
                    var id = this.param.data.id;
                    this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
                    var expStr = LanguageManager.getlocal("wifeExp") + " " + this._wifeInfoVo.exp.toString();
                    this._wifeExp.text = expStr;
                    this.checkExchange();
                }
            }
        }
    };
    WifeSkillPopupViewTab2.prototype.refreshview = function () {
        var id = this.param.data.id;
        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
        var expStr = LanguageManager.getlocal("wifeExp") + " " + this._wifeInfoVo.exp.toString();
        this._wifeExp.text = expStr;
    };
    WifeSkillPopupViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_WIFE_SKILLUPD, this.refreshview, this);
        this._wifeId = null;
        this._wifeInfoVo = null;
        this._wifeExp = null;
        this._scrollList = null;
        this._isSkill2 = true;
        _super.prototype.dispose.call(this);
    };
    return WifeSkillPopupViewTab2;
}(CommonViewTab));
//# sourceMappingURL=WifeSkillPopupViewTab2.js.map