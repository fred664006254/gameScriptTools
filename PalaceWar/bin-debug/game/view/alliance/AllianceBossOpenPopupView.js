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
 * 开启副本
 * author yanyuling
 * date 2017/12/06
 * @class AllianceBossOpenPopupView
 */
var AllianceBossOpenPopupView = (function (_super) {
    __extends(AllianceBossOpenPopupView, _super);
    function AllianceBossOpenPopupView() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._isElite = false;
        _this._needAsset = null;
        _this._needGem = null;
        return _this;
    }
    AllianceBossOpenPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_OPENBOSS), this.openBtnHandlerCallBack, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        this._data = this.param.data;
        if (String(this._data).indexOf("e") >= 0) {
            this._isElite = true;
        }
        var bossName = LanguageManager.getlocal("allianceBoss_monsterName" + this._data);
        this._topTipTF = ComponentManager.getTextField(LanguageManager.getlocal("allianceBossOpen_tip", [bossName]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._topTipTF.x = 30 + GameData.popupviewOffsetX;
        this._topTipTF.y = 20;
        this._nodeContainer.addChild(this._topTipTF);
        var bg1 = BaseBitmap.create("public_9_bg4");
        bg1.width = 520;
        bg1.height = 290;
        bg1.x = this.viewBg.width / 2 - bg1.width / 2;
        bg1.y = this._topTipTF.x + 20;
        this._nodeContainer.addChild(bg1);
        if (this._isElite) {
            var bossCfg = Config.AllianceelitebossCfg.getAllianceCfgByLv(this._data);
            this._needAsset = bossCfg.eliteNeedAsset;
            this._needGem = bossCfg.eliteNeedGem;
            bg1.height = 310;
            var eliteTF = ComponentManager.getTextField(LanguageManager.getlocal("allianceBossOpen_tip7"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
            eliteTF.setPosition(bg1.x + bg1.width / 2 - eliteTF.width / 2, bg1.y + bg1.height - eliteTF.height - 10);
            this._nodeContainer.addChild(eliteTF);
        }
        else {
            var bossCfg = Config.AlliancebossCfg.getAllianceCfgByLv(this._data);
            this._needAsset = bossCfg.needAsset;
            this._needGem = bossCfg.needGem;
        }
        this._needAsset;
        var txtCfg = [
            {
                iconStr: "1_0_0",
                txt1: LanguageManager.getlocal("allianceBossOpen_txt1"),
                txt2: LanguageManager.getlocal("allianceBossOpen_txt2", [String(this._needAsset)]),
                txt3: LanguageManager.getlocal("allianceBossOpen_txt3", [String(Api.allianceVoApi.getAllianceVo().wealth)]),
            },
            {
                iconStr: "1_0_0",
                txt1: LanguageManager.getlocal("allianceBossOpen_txt4"),
                txt2: LanguageManager.getlocal("allianceBossOpen_txt5", [String(this._needGem)]),
                txt3: LanguageManager.getlocal("allianceBossOpen_txt6", [String(Api.playerVoApi.getPlayerGem())]),
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
            this._nodeContainer.addChild(bg);
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
            this._nodeContainer.addChild(icon);
            var openBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "useBtn", this.openBtnHandler, this, [index + 1]);
            openBtn.x = bg.x + bg.width - openBtn.width - 20;
            openBtn.y = bg.y + bg.height / 2 - openBtn.height / 2;
            this._nodeContainer.addChild(openBtn);
            var tmpX = icon.x + icon.width + 10;
            var tmpY = icon.y;
            for (var index2 = 1; index2 <= 3; index2++) {
                var txt = ComponentManager.getTextField(element["txt" + index2], 20);
                txt.x = tmpX;
                txt.y = tmpY;
                tmpY += txt.height + 10;
                this._nodeContainer.addChild(txt);
                if (index2 == 2) {
                    if (index == 0 && this._needAsset > Api.allianceVoApi.getAllianceVo().wealth) {
                        txt.text = LanguageManager.getlocal("allianceBossOpen_txt2_1", [String(this._needAsset)]);
                    }
                    if (index == 1 && this._needGem > Api.playerVoApi.getPlayerGem()) {
                        txt.text = LanguageManager.getlocal("allianceBossOpen_txt5_1", [String(this._needGem)]);
                    }
                }
            }
        }
    };
    AllianceBossOpenPopupView.prototype.openBtnHandlerCallBack = function (event) {
        if (!event.data.ret) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg1"));
            this.hide();
            return;
        }
        var rdata = event.data.data;
        if (rdata.data.allianceFlag == 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg1"));
            this.hide();
            return;
        }
        if (rdata.ret == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip6"));
            this.hide();
        }
    };
    AllianceBossOpenPopupView.prototype.openBtnHandler = function (params) {
        var myAllVo = Api.allianceVoApi.getMyAllianceVo();
        var allVo = Api.allianceVoApi.getAllianceVo();
        // let bossCfg = Config.AlliancebossCfg.getAllianceCfgByLv(this._data )
        if (params == 1) {
            if (myAllVo.po > 2) {
                App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip2"));
                return;
            }
            if (allVo.wealth < this._needAsset) {
                App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip3"));
                return;
            }
        }
        else {
            if (myAllVo.po > 3) {
                App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip4"));
                return;
            }
            if (Api.playerVoApi.getPlayerGem() < this._needGem) {
                App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip5"));
                return;
            }
            var limitBossId_1 = Api.allianceVoApi.getLimitlessBossId();
            if (String(this._data) == limitBossId_1 && (Api.allianceVoApi.checkLimitlessBossIsEnd() || !Api.allianceVoApi.checkOpenLimitlessBoss())) {
                App.CommonUtil.showTip(LanguageManager.getlocal("allianceBoss_limitlessTip"));
                return;
            }
            /**
             * 元宝消耗确认框
             */
            var rewardStr = LanguageManager.getlocal("allianceBossOpen_costTip", ["" + this._needGem]);
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
        var limitBossId = Api.allianceVoApi.getLimitlessBossId();
        if (String(this._data) == limitBossId && (Api.allianceVoApi.checkLimitlessBossIsEnd() || !Api.allianceVoApi.checkOpenLimitlessBoss())) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceBoss_limitlessTip"));
            return;
        }
        this.doOPenReq(params);
    };
    AllianceBossOpenPopupView.prototype.doOPenReq = function (params) {
        if (typeof (params) != "number") {
            params = 2;
        }
        if (this._isElite) {
            NetManager.request(NetRequestConst.REQUEST_ALLIANCE_OPENBOSS, { bossId: this._data, openType: params, elite: 1 });
        }
        else {
            NetManager.request(NetRequestConst.REQUEST_ALLIANCE_OPENBOSS, { bossId: this._data, openType: params });
        }
    };
    // protected getBgExtraHeight():number
    // {
    // 	return -130;
    // }
    AllianceBossOpenPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AllianceBossOpenPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_OPENBOSS), this.openBtnHandlerCallBack, this);
        this._nodeContainer = null;
        this._topTipTF = null;
        this._data = null;
        this._isElite = false;
        this._needAsset = null;
        this._needGem = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceBossOpenPopupView;
}(PopupView));
__reflect(AllianceBossOpenPopupView.prototype, "AllianceBossOpenPopupView");
//# sourceMappingURL=AllianceBossOpenPopupView.js.map