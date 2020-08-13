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
//
var EmperorWarRewardViewTab3 = (function (_super) {
    __extends(EmperorWarRewardViewTab3, _super);
    function EmperorWarRewardViewTab3() {
        var _this = _super.call(this) || this;
        _this._collectBtn = null;
        _this._progress = null;
        _this._descTxt = null;
        _this._man = null;
        _this._bg = null;
        _this._layoutNum = 0;
        _this.initView();
        return _this;
    }
    Object.defineProperty(EmperorWarRewardViewTab3.prototype, "cfg", {
        get: function () {
            return Config.EmperorwarCfg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmperorWarRewardViewTab3.prototype, "api", {
        get: function () {
            return Api.emperorwarVoApi;
        },
        enumerable: true,
        configurable: true
    });
    EmperorWarRewardViewTab3.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_EXCHANGESERVANT), this.collectBtnCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SERVANTBONE, this.refreashBone, this);
        var viewbg = view.getViewBg();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth - 143;
        this._bg = BaseBitmap.create('empservantrole');
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._bg, view);
        view.addChild(this._bg);
        var servantInfoObj = Config.ServantCfg.getServantItemById(view.cfg.servant);
        SoundManager.playEffect(servantInfoObj.sound);
        if (App.CommonUtil.check_dragon()) {
            // if(this._man)
            // {
            // 	this._man.dispose();
            // 	this._man = null;
            // }
            this._man = App.DragonBonesUtil.getLoadDragonBones("servant_full2_" + view.cfg.servant, 0);
            // man.scaleX = -0.6;
            // man.scaleY = 0.6;
            this._man.width = 388;
            this._man.height = 676;
            // man.setAnchorOffset(-man.width,-man.height);
            this._man.anchorOffsetX = -this._man.width / 2;
            this._man.anchorOffsetY = -this._man.height / 2;
            this._man.setScale(1.3);
            view.setLayoutPosition(LayoutConst.horizontalCentertop, this._man, view, [0, 130], true);
            view.addChild(this._man);
        }
        else {
            this._bg.setRes('empservantrole2');
        }
        var bottombg = BaseBitmap.create('empservantbottom');
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view);
        view.addChild(bottombg);
        this._layoutNum = this.getChildIndex(bottombg);
        var progress = ComponentManager.getProgressBar("progress7", "progress7_bg", 355);
        var curNum = Api.itemVoApi.getItemNumInfoVoById(view.cfg.itemNeed);
        progress.setPercentage(curNum / view.cfg.exchangeNum, curNum + "/" + view.cfg.exchangeNum);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, progress, bottombg, [120, 120]);
        view.addChild(progress);
        view._progress = progress;
        var desctxt = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarServantDesc"), 20);
        desctxt.width = 350;
        desctxt.lineSpacing = 5;
        view.setLayoutPosition(LayoutConst.lefttop, desctxt, bottombg, [125, 97]);
        view.addChild(desctxt);
        desctxt.visible = false;
        view._descTxt = desctxt;
        var collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, 'emperorWarCollect', view.collectBtnClick, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, collectBtn, bottombg, [27, 105]);
        view.addChild(collectBtn);
        view._collectBtn = collectBtn;
        var icon = BaseLoadBitmap.create("itemicon" + view.cfg.itemNeed);
        icon.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, view.cfg.itemNeed);
        }, view);
        icon.width = icon.height = 100;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, bottombg, [25, 80]);
        view.addChild(icon);
        if (Api.servantVoApi.getServantObj(String(view.cfg.servant))) {
            collectBtn.setText('allianceBtnCheck');
            progress.visible = false;
            desctxt.visible = true;
        }
        else {
            collectBtn.setEnable(curNum >= view.cfg.exchangeNum);
            if (curNum >= view.cfg.exchangeNum) {
                App.CommonUtil.addIconToBDOC(collectBtn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(collectBtn);
            }
        }
        var line1 = BaseBitmap.create('empblueline');
        line1.width = 400;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line1, bottombg, [0, 184]);
        view.addChild(line1);
        var txt1 = ComponentManager.getTextField(LanguageManager.getlocal('empServantDesc3'), 22, 0xfcf3b4);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt1, line1);
        view.addChild(txt1);
        var line2 = BaseBitmap.create('empblueline');
        line2.width = 400;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line2, line1, [0, line1.height + 90]);
        view.addChild(line2);
        var txt2 = ComponentManager.getTextField(LanguageManager.getlocal('practiceAbilityViewTitle'), 22, 0xfcf3b4);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt2, line2);
        view.addChild(txt2);
        //光环
        var servant = Config.ServantCfg.getServantItemById(view.cfg.servant);
        for (var i in servant.aura) {
            if (Number(i) > 2) {
                break;
            }
            var unit = servant.aura[i];
            var text = ComponentManager.getTextField(LanguageManager.getlocal("empServantDesc" + i, [LanguageManager.getlocal("servant_fourPeopleaura" + unit.auraIcon), String(unit.growAtt * 100)]), 20);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, text, bottombg, [50, 224 + (Number(i) - 1) * (20 + 10)]);
            view.addChild(text);
        }
        var ability = servant.ability;
        var tmpY = txt2.y + txt2.textHeight + 20;
        for (var i = 0; i < ability.length; i++) {
            var aid = ability[i];
            var tmpAcfg = GameConfig.config.abilityCfg[aid];
            var attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_attrNameTxt" + aid), 20);
            attrTxt.x = 190 * (i % 3) + 40;
            attrTxt.y = tmpY + Math.floor(i / 3) * (20 + 10);
            view.addChild(attrTxt);
            var starsIcon = BaseBitmap.create("servant_star");
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, starsIcon, attrTxt, [attrTxt.width, 0]);
            view.addChild(starsIcon);
            var attrValueTxt = ComponentManager.getTextField("x" + tmpAcfg.num.toString(), 20);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, attrValueTxt, starsIcon, [starsIcon.width, 0]);
            view.addChild(attrValueTxt);
        }
        // if (PlatformManager.checkIsEnLang()){
        // 	//英文版每行两条属性
        // 	for (var i = 0; i < ability.length; i++) {
        // 		let aid = ability[i];
        // 		let tmpAcfg = GameConfig.config.abilityCfg[aid];
        // 		let attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_attrNameTxt" + aid), 20);
        // 		attrTxt.x = 315 * (i % 2) + 15;
        // 		attrTxt.y = 265 + Math.floor(i / 2) * 28;
        // 		this.addChild(attrTxt);
        // 		let starsIcon: BaseBitmap = BaseBitmap.create("servant_star");
        // 		starsIcon.x = attrTxt.x + 235//attrTxt.width;// + 125;
        // 		starsIcon.y = attrTxt.y - 4;
        // 		this.addChild(starsIcon);
        // 		let attrValueTxt = ComponentManager.getTextField("x" + tmpAcfg.num.toString(), 20);
        // 		attrValueTxt.x = starsIcon.x + 35;
        // 		attrValueTxt.y = attrTxt.y;
        // 		this.addChild(attrValueTxt)
        // 	}
        // } else {
        //}
        if (servant.quality2) {
            var cornerImg = Api.servantVoApi.getCornerMarkerContainer(servant.quality2);
            cornerImg.x = 475 + 70;
            cornerImg.y = 290 + 70;
            cornerImg.setScale(1.3);
            this.addChild(cornerImg);
        }
        // //特殊光环
        // this.speciaLaura();
    };
    EmperorWarRewardViewTab3.prototype.collectBtnClick = function () {
        var view = this;
        if (Api.servantVoApi.getServantObj(String(view.cfg.servant))) {
            if (this._man) {
                this._man.stop();
                this._man.dispose();
                this._man = null;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW, view.cfg.servant);
        }
        else {
            var curNum = Api.itemVoApi.getItemNumInfoVoById(view.cfg.itemNeed);
            if (curNum < view.cfg.exchangeNum) {
                return;
            }
            else {
                NetManager.request(NetRequestConst.REQUEST_EMPEROR_EXCHANGESERVANT, {
                    version: view.api.getVersion(),
                });
            }
        }
    };
    EmperorWarRewardViewTab3.prototype.collectBtnCallback = function (evt) {
        var view = this;
        var data = evt.data.data.data;
        if (data) {
            ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW, view.cfg.servant);
            view._collectBtn.setText("allianceBtnCheck");
            App.CommonUtil.removeIconFromBDOC(view._collectBtn);
            view._progress.visible = false;
            view._descTxt.visible = true;
        }
    };
    EmperorWarRewardViewTab3.prototype.speciaLaura = function () {
        //九宫格
        var bg1 = BaseBitmap.create("fourfloor");
        bg1.y = +70;
        bg1.x = 180;
        bg1.width = 312;
        bg1.height = 110;
        bg1.x = this.width - bg1.width - 20;
        bg1.y = 20;
        this.addChild(bg1);
        //特殊光环文字
        var lauraImg = BaseBitmap.create("fourpecialaura");
        this.addChild(lauraImg);
        lauraImg.x = bg1.x + 90;
        lauraImg.y = bg1.y + 12;
        //武力描述
        var forceText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), 18);
        var message = LanguageManager.getlocal("acFourPeoplea_force" + AcFourPeopleScrollItem.CODE);
        forceText.x = bg1.x + 16;
        forceText.y = bg1.y + 50;
        forceText.text = message;
        forceText.width = bg1.width;
        this.addChild(forceText);
        //属性描述
        var forceText2 = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), 18);
        var message2 = LanguageManager.getlocal("acFourPeoplea_attribute" + AcFourPeopleScrollItem.CODE);
        forceText2.x = bg1.x + 16;
        forceText2.y = bg1.y + 80;
        forceText2.width = bg1.width;
        forceText2.text = message2;
        this.addChild(forceText2);
        if (PlatformManager.checkIsTextHorizontal()) {
            lauraImg.y -= 6;
            forceText.y -= 12;
            forceText2.y -= 2;
        }
        if (PlatformManager.checkIsEnLang()) {
            forceText.width = bg1.width - 32;
            forceText2.width = bg1.width - 32;
            bg1.height += 15;
        }
    };
    EmperorWarRewardViewTab3.prototype.refreashBone = function () {
        if (this._man) {
            this._man.resume();
        }
        else {
            if (App.CommonUtil.check_dragon()) {
                if (this._man) {
                    this._man.dispose();
                    this._man = null;
                }
                this._man = App.DragonBonesUtil.getLoadDragonBones("servant_full2_" + this.cfg.servant, 0);
                // man.scaleX = -0.6;
                // man.scaleY = 0.6;
                this._man.width = 388;
                this._man.height = 676;
                // man.setAnchorOffset(-man.width,-man.height);
                this._man.anchorOffsetX = -this._man.width / 2;
                this._man.anchorOffsetY = -this._man.height / 2;
                this._man.setScale(1.3);
                this.setLayoutPosition(LayoutConst.horizontalCentertop, this._man, this, [0, 130], true);
                this.addChildAt(this._man, this._layoutNum - 1);
            }
            else {
                this._bg.setRes('empservantrole2');
            }
        }
    };
    EmperorWarRewardViewTab3.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SERVANTBONE, this.refreashBone, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_EXCHANGESERVANT), this.collectBtnCallback, this);
        view._collectBtn = null;
        view._progress = null;
        view._descTxt = null;
        this._bg = null;
        if (this._man) {
            this._man.stop();
            this._man.dispose();
            this._man = null;
        }
        this._layoutNum = 0;
        _super.prototype.dispose.call(this);
    };
    return EmperorWarRewardViewTab3;
}(CommonViewTab));
__reflect(EmperorWarRewardViewTab3.prototype, "EmperorWarRewardViewTab3");
//# sourceMappingURL=EmperorWarRewardViewTab3.js.map