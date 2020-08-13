/**
 * 门客详情new 换装
 * author shaoliang
 * date 2019/7/26
 * @class ServantNewUISkinItem
 */
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
var ServantNewUISkinItem = (function (_super) {
    __extends(ServantNewUISkinItem, _super);
    function ServantNewUISkinItem() {
        var _this = _super.call(this) || this;
        _this._servantId = null;
        _this._servantSkinId = null;
        _this._scrollView = null;
        _this._emptyNode = null;
        _this._nodeContainer = null;
        _this._textTab = [];
        _this._descText = null;
        return _this;
    }
    ServantNewUISkinItem.prototype.init = function (servantId, bottomH) {
        var _this = this;
        this._servantId = servantId;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SERVANTSKIN_AURA, this.checkServantRed, this);
        this._emptyNode = new BaseDisplayObjectContainer();
        this.addChild(this._emptyNode);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        // let blackBg = BaseBitmap.create("public_9_bg11");
        // blackBg.width = GameConfig.stageWidth;
        // blackBg.height = bottomH;
        // this._emptyNode.addChild(blackBg);
        var textbg = BaseLoadBitmap.create("bookroom_cdbg");
        textbg.height = 40;
        textbg.y = bottomH / 2 - textbg.height / 2 - 10;
        this._emptyNode.addChild(textbg);
        var noSkinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinNoAdd"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        noSkinTipTxt.x = GameConfig.stageWidth / 2 - noSkinTipTxt.width / 2;
        noSkinTipTxt.y = bottomH / 2 - noSkinTipTxt.height / 2 - 10;
        this._emptyNode.addChild(noSkinTipTxt);
        textbg.width = noSkinTipTxt.width + 60;
        textbg.x = noSkinTipTxt.x - 30;
        var line1 = BaseBitmap.create("servant_title_bg");
        line1.width = 440;
        line1.x = GameConfig.stageWidth / 2 - line1.width / 2;
        line1.y = 20;
        this._nodeContainer.addChild(line1);
        var itemTip = ComponentManager.getTextField(LanguageManager.getlocal("servantskinaura"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        // itemTip.textColor = TextFieldConst.COLOR_BROWN;
        itemTip.y = line1.y + 8;
        itemTip.x = GameConfig.stageWidth / 2 - itemTip.width / 2;
        this._nodeContainer.addChild(itemTip);
        var scrollHeight = 64;
        //皮肤光环
        if (Api.switchVoApi.checkOpenServantSkinAura()) {
            scrollHeight = 136;
            var attrbg = BaseBitmap.create("public_9_managebg");
            attrbg.width = 590;
            attrbg.height = 66;
            attrbg.setPosition(25, 60);
            this._nodeContainer.addChild(attrbg);
            for (var i = 0; i < 4; i++) {
                var text = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_WARN_RED2);
                text.setPosition(50 + i % 2 * 190, 72 + Math.floor(i / 2) * 27);
                this._nodeContainer.addChild(text);
                this._textTab.push(text);
            }
            var levelupBtn = ComponentManager.getButton("servant_aura", "", function () {
                //打开升级弹窗
                ViewController.getInstance().openView(ViewConst.POPUP.SERVANTSKINAURAPOPUPVIEW, {
                    servantId: _this._servantId,
                    skinId: _this._servantSkinId
                });
            }, this);
            levelupBtn.setScale(0.9);
            levelupBtn.name = 'levelupBtn';
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, levelupBtn, attrbg, [30, 0]);
            this._nodeContainer.addChild(levelupBtn);
        }
        // this._descText =  ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        // this._descText.width = 580;
        // this._descText.lineSpacing = 5;
        // this._descText.setPosition(30,scrollHeight);
        // this._nodeContainer.addChild(this._descText);
        // scrollHeight += 50;
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomH - scrollHeight - 10);
        var scrollView = ComponentManager.getScrollList(ServantChangeSkinBookItem, [], rect);
        scrollView.y = scrollHeight;
        scrollView.x = 24;
        this._scrollView = scrollView;
        this._nodeContainer.addChild(scrollView);
        this._nodeContainer.visible = false;
    };
    //切换皮肤时刷新
    ServantNewUISkinItem.prototype.refreshWithSkinId = function (sid) {
        if (sid == this._servantSkinId) {
            return;
        }
        this._servantSkinId = sid;
        if (!sid || sid == "0") {
            this._nodeContainer.visible = false;
            this._emptyNode.visible = true;
        }
        else {
            this._nodeContainer.visible = true;
            this._emptyNode.visible = false;
            var cfg = Config.ServantskinCfg.getServantSkinItemById(this._servantSkinId);
            var servant = Api.servantVoApi.getServantObj(this._servantId);
            if (Api.switchVoApi.checkOpenServantSkinAura()) {
                if (cfg && cfg.aura) {
                    for (var j = 1; j <= 4; j++) {
                        var i = String(j);
                        var unit = cfg.aura[i];
                        var index = Number(i);
                        var value = '0';
                        var skinvo = servant.getSkinInfobyId(this._servantSkinId);
                        var curLevel = skinvo ? skinvo.getSkinAuraLv(Number(i) - 1) : 0;
                        if (cfg.aura[i].growAtt >= 1) {
                            var tmp = cfg.aura[i].growAtt * curLevel;
                            value = App.MathUtil.strip(tmp) + '';
                        }
                        else {
                            var tmp = cfg.aura[i].growAtt * 100 * curLevel;
                            value = App.MathUtil.strip(tmp) + '%';
                        }
                        this._textTab[j - 1].text = LanguageManager.getlocal("servantSkinAuraAdd" + index, [String(TextFieldConst.COLOR_BROWN), value]);
                    }
                }
            }
            //    this._descText.text = LanguageManager.getlocal("servantSkinEffect"+this._servantSkinId);
            var ability = cfg.ability;
            this._scrollView.refreshData(ability, [this._servantSkinId, true]);
            var levelupBtn = this._nodeContainer.getChildByName("levelupBtn");
            if (levelupBtn) {
                if (Api.servantVoApi.isShowAuralevelUpRed(this._servantId, this._servantSkinId)) {
                    App.CommonUtil.addIconToBDOC(levelupBtn);
                }
                else {
                    App.CommonUtil.removeIconFromBDOC(levelupBtn);
                }
            }
        }
    };
    ServantNewUISkinItem.prototype.checkServantRed = function () {
        var levelupBtn = this._nodeContainer.getChildByName("levelupBtn");
        if (levelupBtn) {
            if (Api.servantVoApi.isShowAuralevelUpRed(this._servantId, this._servantSkinId)) {
                App.CommonUtil.addIconToBDOC(levelupBtn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(levelupBtn);
            }
        }
    };
    ServantNewUISkinItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVANTSKIN_AURA, this.checkServantRed, this);
        this._scrollView = null;
        this._servantId = null;
        this._servantSkinId = null;
        this._emptyNode = null;
        this._nodeContainer = null;
        this._emptyNode = null;
        this._textTab.length = 0;
        this._descText = null;
        _super.prototype.dispose.call(this);
    };
    return ServantNewUISkinItem;
}(BaseDisplayObjectContainer));
__reflect(ServantNewUISkinItem.prototype, "ServantNewUISkinItem");
//# sourceMappingURL=ServantNewUISkinItem.js.map