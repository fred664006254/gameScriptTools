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
  * 勤王除恶--帮会加成
  * @author 张朝阳
  * date 2019/4/17
  * @class AllianceWeekEndAdditionPopupView
  */
var AllianceWeekEndAdditionPopupView = (function (_super) {
    __extends(AllianceWeekEndAdditionPopupView, _super);
    function AllianceWeekEndAdditionPopupView() {
        var _this = _super.call(this) || this;
        _this._needAsset = null;
        _this._needGem = null;
        return _this;
    }
    AllianceWeekEndAdditionPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_BUYBUFF, this.buyBuffHandle, this);
        this._topTipTF = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndAdditionPopupViewServantAddition", [String(Api.allianceWeekVoApi.getAdditionBuff())]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._topTipTF.x = 30 + GameData.popupviewOffsetX;
        this._topTipTF.y = 30;
        this.addChildToContainer(this._topTipTF);
        var bg1 = BaseBitmap.create("public_9_bg4");
        bg1.width = 520;
        bg1.height = 290;
        bg1.x = this.viewBg.width / 2 - bg1.width / 2;
        bg1.y = this._topTipTF.x + 20;
        this.addChildToContainer(bg1);
        this._needAsset = Config.AllianceweekendCfg.powerUp.needAsset[Api.allianceWeekVoApi.getbuffValue()] ? Config.AllianceweekendCfg.powerUp.needAsset[Api.allianceWeekVoApi.getbuffValue()] : Config.AllianceweekendCfg.powerUp.needAsset[Config.AllianceweekendCfg.powerUp.needAsset.length - 1];
        this._needGem = Config.AllianceweekendCfg.powerUp.needGem[Api.allianceWeekVoApi.getbuffValue()] ? Config.AllianceweekendCfg.powerUp.needGem[Api.allianceWeekVoApi.getbuffValue()] : Config.AllianceweekendCfg.powerUp.needGem[Config.AllianceweekendCfg.powerUp.needGem.length - 1];
        var txtCfg = [
            {
                iconStr: "1_0_0",
                txt1: LanguageManager.getlocal("allianceWeekEndAdditionPopupView_weekEnd_txt1", [String(Api.allianceWeekVoApi.getNextAdditionBuff())]),
                txt2: LanguageManager.getlocal("allianceWeekEndAdditionPopupView_weekEnd_txt2", [String(this._needAsset)]),
                txt3: LanguageManager.getlocal("allianceWeekEndAdditionPopupView_weekEnd_txt3", [String(Api.allianceVoApi.getAllianceVo().wealth)]),
            },
            {
                iconStr: "1_0_0",
                txt1: LanguageManager.getlocal("allianceWeekEndAdditionPopupView_weekEnd_txt4", [String(Api.allianceWeekVoApi.getNextAdditionBuff())]),
                txt2: LanguageManager.getlocal("allianceWeekEndAdditionPopupView_weekEnd_txt5", [String(this._needGem)]),
                txt3: LanguageManager.getlocal("allianceWeekEndAdditionPopupView_weekEnd_txt6", [String(Api.playerVoApi.getPlayerGem())]),
            },
        ];
        var startX = bg1.x + 10;
        var startY = bg1.y + 10;
        for (var index = 0; index < txtCfg.length; index++) {
            var element = txtCfg[index];
            var bg = BaseBitmap.create("public_9_probiginnerbg");
            bg.width = 500;
            bg.height = 126;
            bg.y = startY;
            bg.x = startX;
            this.addChildToContainer(bg);
            startY += bg.height + 10;
            var icon = void 0;
            if (index == 0) {
                icon = BaseBitmap.create("allianceview_treasure");
            }
            else {
                icon = GameData.getRewardItemIcons(element.iconStr)[0];
            }
            icon.x = bg.x + 10;
            icon.y = bg.y + 10;
            this.addChildToContainer(icon);
            var openBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceWeekEndAdditionPopupViewUseBtn", this.openBtnHandler, this, [index + 1]);
            openBtn.x = bg.x + bg.width - openBtn.width - 20;
            openBtn.y = bg.y + bg.height / 2 - openBtn.height / 2;
            this.addChildToContainer(openBtn);
            var tmpX = icon.x + icon.width + 10;
            var tmpY = icon.y + 5;
            for (var index2 = 1; index2 <= 3; index2++) {
                var txt = ComponentManager.getTextField(element["txt" + index2], 20);
                txt.x = tmpX;
                txt.y = tmpY;
                tmpY += txt.height + 10;
                this.addChildToContainer(txt);
                // if (index2 == 2) {
                // 	if (index == 0 && this._needAsset > Api.allianceVoApi.getAllianceVo().wealth) {
                // 		txt.text = LanguageManager.getlocal("allianceBossOpen_txt2_1", [String(this._needAsset)]);
                // 	}
                // 	if (index == 1 && this._needGem > Api.playerVoApi.getPlayerGem()) {
                // 		txt.text = LanguageManager.getlocal("allianceBossOpen_txt5_1", [String(this._needGem)]);
                // 	}
                // }
            }
        }
        var desc = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndAdditionPopupViewDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        desc.width = 500;
        desc.setPosition(bg1.x + bg1.width / 2 - desc.width / 2, bg1.y + bg1.height);
        this.addChildToContainer(desc);
        bg1.height += desc.height + 20;
    };
    AllianceWeekEndAdditionPopupView.prototype.openBtnHandler = function (params) {
        if (!Api.allianceWeekVoApi.checkBattleTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceWeekEndViewUnBattleBuffTip"));
            return;
        }
        if (Api.allianceWeekVoApi.getbuffValue() >= Config.AllianceweekendCfg.powerUp.limit) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceWeekEndAdditionPopupViewBuffMaxTip"));
            return;
        }
        var myAllVo = Api.allianceVoApi.getMyAllianceVo();
        var allVo = Api.allianceVoApi.getAllianceVo();
        // let bossCfg = Config.AlliancebossCfg.getAllianceCfgByLv(this._data )
        if (params == 1) {
            // if (myAllVo.po > 2) {
            // 	App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip2"));
            // 	return;
            // }
            if (allVo.wealth < this._needAsset) {
                App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip3"));
                return;
            }
        }
        else {
            // if (myAllVo.po > 3) {
            // 	App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip4"));
            // 	return;
            // }
            if (Api.playerVoApi.getPlayerGem() < this._needGem) {
                App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip5"));
                return;
            }
            /**
             * 元宝消耗确认框
             */
            var rewardStr = LanguageManager.getlocal("allianceWeekEndAdditionPopupView_costTip", [String(this._needGem)]);
            // let msg = LanguageManager.getlocal("adultMarryCancalMsg",[rewardStr])
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: rewardStr,
                callback: this.doOPenReq,
                handler: this,
                needCancel: true
            });
            return;
        }
        this.doOPenReq(params);
    };
    AllianceWeekEndAdditionPopupView.prototype.doOPenReq = function (params) {
        if (typeof (params) != "number") {
            params = 2;
        }
        if (Api.allianceWeekVoApi.getbuffValue() >= Config.AllianceweekendCfg.powerUp.limit) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceWeekEndAdditionPopupViewBuffMaxTip"));
            return;
        }
        NetManager.request(NetRequestConst.REQYEST_ALLIANCEWEEK_BUYBUFF, { openType: params });
        // if (params == 1) {
        // NetManager.request(NetRequestConst.REQYEST_ALLIANCEWEEK_BUYBUFF, { openType: params });
        // }
        // else {
        // 	NetManager.request(NetRequestConst.REQYEST_ALLIANCEWEEK_BUYBUFF, { bossId: this._data, openType: params });
        // }
    };
    /**购买buff 回调 */
    AllianceWeekEndAdditionPopupView.prototype.buyBuffHandle = function (event) {
        if (event.data.ret) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceWeekEndAdditionPopupViewbuyBuffTip"));
            this.hide();
        }
    };
    AllianceWeekEndAdditionPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AllianceWeekEndAdditionPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_BUYBUFF, this.buyBuffHandle, this);
        this._topTipTF = null;
        this._needAsset = null;
        this._needGem = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceWeekEndAdditionPopupView;
}(PopupView));
__reflect(AllianceWeekEndAdditionPopupView.prototype, "AllianceWeekEndAdditionPopupView");
//# sourceMappingURL=AllianceWeekEndAdditionPopupView.js.map