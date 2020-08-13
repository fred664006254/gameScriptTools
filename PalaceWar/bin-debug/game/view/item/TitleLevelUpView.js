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
var TitleLevelUpView = (function (_super) {
    __extends(TitleLevelUpView, _super);
    function TitleLevelUpView() {
        return _super.call(this) || this;
    }
    TitleLevelUpView.prototype.initView = function () {
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var bg = BaseBitmap.create("public_9_wordbg");
        bg.y = 58;
        this._nodeContainer.addChild(bg);
        var skin_lvup_light = BaseBitmap.create("skin_lvup_light");
        skin_lvup_light.x = GameConfig.stageWidth / 2 - skin_lvup_light.width / 2;
        this._nodeContainer.addChild(skin_lvup_light);
        var skin_lvup_word = BaseBitmap.create("skin_lvup_word");
        skin_lvup_word.x = GameConfig.stageWidth / 2 - skin_lvup_word.width / 2;
        this._nodeContainer.addChild(skin_lvup_word);
        var light = BaseBitmap.create("tailor_get_light");
        light.setScale(0.5);
        light.anchorOffsetX = light.width / 2;
        light.anchorOffsetY = light.height / 2;
        light.x = GameConfig.stageWidth / 2;
        light.y = 40 + light.height / 2 - 105;
        egret.Tween.get(light, { loop: true }).to({ rotation: 360 }, 5000);
        this._nodeContainer.addChild(light);
        var light2 = BaseBitmap.create("tailor_get_light");
        light2.setScale(0.5);
        light2.anchorOffsetX = light2.width / 2;
        light2.anchorOffsetY = light2.height / 2;
        light2.x = light.x;
        light2.y = light.y;
        egret.Tween.get(light2, { loop: true }).to({ rotation: -360 }, 5000);
        this._nodeContainer.addChild(light2);
        this.initHeadContainer();
        var congratulation = ComponentManager.getTextField(this.getCongratulationString(), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        congratulation.width = 540;
        congratulation.x = GameConfig.stageWidth / 2 - congratulation.width / 2;
        congratulation.lineSpacing = 6;
        congratulation.y = 226;
        congratulation.textAlign = egret.HorizontalAlign.CENTER;
        this._nodeContainer.addChild(congratulation);
        var lineSp = BaseBitmap.create("skin_lvup_line");
        lineSp.width = 600;
        lineSp.x = GameConfig.stageWidth / 2 - lineSp.width / 2;
        lineSp.y = congratulation.y + congratulation.height + 15;
        this._nodeContainer.addChild(lineSp);
        var innerbg = BaseBitmap.create("dinner_list_bg");
        innerbg.width = 584;
        innerbg.x = GameConfig.stageWidth / 2 - innerbg.width / 2;
        innerbg.y = lineSp.y + 18;
        this._nodeContainer.addChild(innerbg);
        var startY = innerbg.y + 20;
        var valueTab = this.getInfoTab();
        for (var index = 0; index < valueTab.length; index++) {
            var infoTab = valueTab[index];
            var Txt1 = ComponentManager.getTextField(infoTab[0], 22, TextFieldConst.COLOR_QUALITY_GRAY);
            Txt1.x = innerbg.x + 50;
            Txt1.y = startY;
            this._nodeContainer.addChild(Txt1);
            var Txt2 = ComponentManager.getTextField(infoTab[1], 20);
            Txt2.x = Txt1.x + 180;
            Txt2.y = Txt1.y;
            this._nodeContainer.addChild(Txt2);
            var arrowSp = BaseBitmap.create("servant_arrow");
            arrowSp.x = Txt1.x + 285;
            arrowSp.y = Txt1.y + Txt1.height / 2 - arrowSp.height / 2;
            this._nodeContainer.addChild(arrowSp);
            var Txt3 = ComponentManager.getTextField(infoTab[2], 20, 0x21eb39);
            Txt3.x = Txt1.x + 375;
            Txt3.y = Txt1.y;
            this._nodeContainer.addChild(Txt3);
            if (index > 0) {
                Txt2.x -= 30;
                Txt3.x -= 30;
            }
            if (index < valueTab.length - 1) {
                var lineSp_1 = BaseBitmap.create("rankinglist_line");
                lineSp_1.x = GameConfig.stageWidth / 2 - lineSp_1.width / 2;
                lineSp_1.y = Txt1.y + 30;
                this._nodeContainer.addChild(lineSp_1);
                startY += 15;
            }
            startY += 30;
        }
        innerbg.height = startY - innerbg.y + 10;
        var tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("skinLvupTiptxt2"), 20, TextFieldConst.COLOR_WARN_YELLOW);
        tipTxt2.multiline = true;
        tipTxt2.lineSpacing = 10;
        tipTxt2.width = 540;
        tipTxt2.x = GameConfig.stageWidth / 2 - tipTxt2.width / 2;
        tipTxt2.y = innerbg.y + innerbg.height + 20;
        this._nodeContainer.addChild(tipTxt2);
        bg.height = tipTxt2.y + tipTxt2.height + 30 - bg.y;
        var okBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "skinLvupOkBtn", this.hide, this);
        okBtn.x = GameConfig.stageWidth / 2 - okBtn.width / 2;
        okBtn.y = bg.y + bg.height + 10;
        this._nodeContainer.addChild(okBtn);
        this._nodeContainer.y = GameConfig.stageHeigth / 2 - this._nodeContainer.height / 2;
    };
    TitleLevelUpView.prototype.getTitleStr = function () {
        return null;
    };
    TitleLevelUpView.prototype.getCongratulationString = function () {
        var titleId = Number(this.param.data.titleId);
        var lv = this.param.data.lv;
        return LanguageManager.getlocal("levelUpCongratulation", ["", Api.itemVoApi.getTitleInfoVoById(titleId).name, String(lv)]);
    };
    TitleLevelUpView.prototype.initHeadContainer = function () {
        var titleId = Number(this.param.data.titleId);
        var lv = this.param.data.lv;
        var titleInfo = Api.itemVoApi.getTitleInfoVoById(titleId);
        var playerHead;
        if (titleInfo.type == 4 && titleInfo.isTitle == 4) {
            playerHead = App.CommonUtil.getTitlePic(titleId, lv); // BaseLoadBitmap.create(titleInfo.titleIcon3);
            playerHead.x = this.viewBg.width / 2 - 77;
            // playerHead  = App.CommonUtil.getTitlePic(titleInfo.id, lv);
            // playerHead.x = this.viewBg.width/2 - playerHead.width/2;
            playerHead.y = 131;
            this._nodeContainer.addChild(playerHead);
        }
        else if (titleInfo.type == 4 && titleInfo.isTitle == 5) {
            playerHead = Api.playerVoApi.getPlayerCircleHead(titleInfo.id);
            playerHead.x = this.viewBg.width / 2 - playerHead.width / 2;
            playerHead.y = 110;
            this._nodeContainer.addChild(playerHead);
        }
        else if (titleInfo.type == 4 && titleInfo.isTitle == 6) {
            playerHead = BaseLoadBitmap.create(titleInfo.icon);
            playerHead.x = this.viewBg.width / 2 - 50;
            playerHead.y = 110;
            this._nodeContainer.addChild(playerHead);
        }
        else {
            playerHead = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(), { ptitle: titleInfo.id, plv: lv });
            playerHead.x = this.viewBg.width / 2 - playerHead.width / 2;
            playerHead.y = 110;
            this._nodeContainer.addChild(playerHead);
        }
        // let playerHead:BaseDisplayObjectContainer = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(),titleId);
        // playerHead.x = this.viewBg.width/2 - playerHead.width/2;
        // playerHead.y = 110;
        // this._nodeContainer.addChild(playerHead);
    };
    TitleLevelUpView.prototype.getParent = function () {
        return LayerManager.panelLayer;
    };
    TitleLevelUpView.prototype.getInfoTab = function () {
        var lv = this.param.data.lv;
        var titleId = Number(this.param.data.titleId);
        var titleInfo = Api.itemVoApi.getTitleInfoVoById(titleId);
        var info = [];
        info.push([LanguageManager.getlocal("skinLvuptxt1"), String(lv - 1), String(lv)]);
        var v1 = titleInfo.lvUpEffect1;
        var v2 = titleInfo.lvUpEffect2;
        var v3 = titleInfo.atkEffect;
        var o1 = titleInfo.effect1;
        var o2 = titleInfo.effect2;
        var o3 = titleInfo.atkEffect;
        if (o1) {
            for (var i = 2; i <= 5; i++) {
                var value1 = "+" + (v1 * (lv - 2) + o1);
                var value2 = "+" + (v1 * (lv - 1) + o1);
                info.push([LanguageManager.getlocal("skinLvuptxt" + i), value1, value2]);
            }
        }
        if (o2) {
            for (var i = 2; i <= 5; i++) {
                var value1 = "+" + (v2 * (lv - 2) + o2) * 100 + "%";
                var value2 = "+" + (v2 * (lv - 1) + o2) * 100 + "%";
                info.push([LanguageManager.getlocal("skinLvuptxt" + i), value1, value2]);
            }
        }
        if (o3) {
            for (var i = 8; i <= 8; i++) {
                var value1 = "+" + Math.round((v3 * (lv - 1)) * 100) + "%";
                var value2 = "+" + Math.round((v3 * lv) * 100) + "%";
                info.push([LanguageManager.getlocal("skinLvuptxt" + i), value1, value2]);
            }
        }
        return info;
    };
    TitleLevelUpView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "skin_lvup_word", "rankinglist_line", "dinner_list_bg", "servant_arrow", "skin_lvup_light", "skin_lvup_line", "tailor_get_light",
        ]);
    };
    TitleLevelUpView.prototype.hide = function () {
        _super.prototype.hide.call(this);
        Api.itemVoApi.checkWaitingTitleLvUp();
    };
    TitleLevelUpView.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return TitleLevelUpView;
}(BaseView));
__reflect(TitleLevelUpView.prototype, "TitleLevelUpView");
//# sourceMappingURL=TitleLevelUpView.js.map