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
 * @class AllianceInfinityOpenPopupView
 */
var AllianceInfinityOpenPopupView = (function (_super) {
    __extends(AllianceInfinityOpenPopupView, _super);
    function AllianceInfinityOpenPopupView() {
        return _super.call(this) || this;
    }
    AllianceInfinityOpenPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ALLIANCE_OPENINFINITY), this.openBtnHandlerCallBack, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var bossName = LanguageManager.getlocal("allianceBoss_infinity");
        this._topTipTF = ComponentManager.getTextField(LanguageManager.getlocal("allianceBossOpen_tip", [bossName]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._topTipTF.x = 50;
        this._topTipTF.y = 20;
        this._nodeContainer.addChild(this._topTipTF);
        var bg1 = BaseBitmap.create("public_tc_bg01");
        bg1.width = 520;
        bg1.height = 150;
        bg1.x = this.viewBg.width / 2 - bg1.width / 2;
        bg1.y = this._topTipTF.x + 20;
        this._nodeContainer.addChild(bg1);
        var infinityNeedAsset = Config.AlliancebaseCfg.infinityNeedAsset;
        var txtCfg = [
            {
                iconStr: "1_0_0",
                txt1: LanguageManager.getlocal("allianceBossOpen_txt1"),
                txt2: LanguageManager.getlocal("allianceBossOpen_txt2", ["" + infinityNeedAsset]),
                txt3: LanguageManager.getlocal("allianceBossOpen_txt3", ["" + Api.allianceVoApi.getAllianceVo().wealth]),
            },
        ];
        var startX = bg1.x + 10;
        var startY = bg1.y + 10;
        for (var index = 0; index < txtCfg.length; index++) {
            var element = txtCfg[index];
            var bg = BaseBitmap.create("public_tc_bg03");
            bg.width = 500;
            bg.height = 126;
            bg.y = startY;
            bg.x = startX;
            this._nodeContainer.addChild(bg);
            startY += bg.height + 10;
            var icon = GameData.getRewardItemIcons(element.iconStr)[0];
            icon.x = bg.x + 15;
            icon.y = bg.y + 10;
            this._nodeContainer.addChild(icon);
            var openBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "useBtn", this.openBtnHandler, this, [index + 1]);
            openBtn.x = bg.x + bg.width - openBtn.width - 20;
            openBtn.y = bg.y + bg.height / 2 - openBtn.height / 2;
            this._nodeContainer.addChild(openBtn);
            var tmpX = icon.x + icon.width + 10;
            var tmpY = icon.y + 10;
            for (var index2 = 1; index2 <= 3; index2++) {
                var txt = ComponentManager.getTextField(element["txt" + index2], 20);
                txt.setColor(TextFieldConst.COLOR_BROWN);
                txt.x = tmpX;
                txt.y = tmpY;
                tmpY += txt.height + 15;
                this._nodeContainer.addChild(txt);
                if (index2 == 2) {
                    if (index == 0 && infinityNeedAsset > Api.allianceVoApi.getAllianceVo().wealth) {
                        txt.text = LanguageManager.getlocal("allianceBossOpen_txt2_1", ["" + infinityNeedAsset]);
                    }
                }
            }
        }
        this._nodeContainer.height += 30;
    };
    AllianceInfinityOpenPopupView.prototype.openBtnHandlerCallBack = function (event) {
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
    AllianceInfinityOpenPopupView.prototype.openBtnHandler = function (params) {
        var allVo = Api.allianceVoApi.getAllianceVo();
        if (allVo.wealth < Config.AlliancebaseCfg.infinityNeedAsset) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip3"));
            return;
        }
        NetManager.request(NetRequestConst.REQUST_ALLIANCE_OPENINFINITY, {});
    };
    // protected getBgExtraHeight():number
    // {
    // 	return -130;
    // }
    AllianceInfinityOpenPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AllianceInfinityOpenPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ALLIANCE_OPENINFINITY), this.openBtnHandlerCallBack, this);
        this._nodeContainer = null;
        this._topTipTF = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceInfinityOpenPopupView;
}(PopupView));
__reflect(AllianceInfinityOpenPopupView.prototype, "AllianceInfinityOpenPopupView");
