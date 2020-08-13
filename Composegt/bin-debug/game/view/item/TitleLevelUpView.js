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
        var _this = _super.call(this) || this;
        _this._myContiner = null;
        return _this;
    }
    TitleLevelUpView.prototype.initView = function () {
        var lv = this.param.data.lv;
        var titleId = Number(this.param.data.titleId);
        var titleInfo = Api.itemVoApi.getTitleInfoVoById(titleId);
        this.initHeadContainer();
        var congratulation = ComponentManager.getTextField(this.getCongratulationString(), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        congratulation.x = GameConfig.stageWidth / 2 - congratulation.width / 2;
        congratulation.y = this.viewBg.y + 165;
        congratulation.textAlign = egret.HorizontalAlign.CENTER;
        this.addChildToContainer(congratulation);
        var innerbg = BaseBitmap.create("public_lvupcenter");
        innerbg.width = 390;
        innerbg.height = 202;
        innerbg.x = this.viewBg.width / 2 - innerbg.width / 2;
        innerbg.y = this.viewBg.y + 200;
        this.addChildToContainer(innerbg);
        this._myContiner = new BaseDisplayObjectContainer();
        this._myContiner.width = 390;
        var containerBg = BaseBitmap.create("public_alphabg");
        containerBg.width = 390;
        containerBg.height = 200;
        this._myContiner.addChild(containerBg);
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, 390, 200);
        var scrollView = ComponentManager.getScrollView(this._myContiner, rect2);
        scrollView.setPosition(innerbg.x + innerbg.width / 2 - scrollView.width / 2, innerbg.y);
        this.addChildToContainer(scrollView);
        var startY = 20;
        var valueTab = this.getInfoTab();
        for (var index = 0; index < valueTab.length; index++) {
            var infoTab = valueTab[index];
            var Txt1 = null;
            var Txt2 = null;
            var Txt3 = null;
            Txt1 = ComponentManager.getTextField(infoTab[0], 18, TextFieldConst.COLOR_BROWN);
            Txt1.x = 20;
            Txt1.y = startY;
            this._myContiner.addChild(Txt1);
            Txt2 = ComponentManager.getTextField(infoTab[1], 18, TextFieldConst.COLOR_BROWN);
            Txt2.x = Txt1.x + 110;
            Txt2.y = Txt1.y;
            this._myContiner.addChild(Txt2);
            var color1 = TextFieldConst.COLOR_WARN_GREEN;
            if (index > 0) {
                if (infoTab[2] == infoTab[1]) {
                    color1 = TextFieldConst.COLOR_BROWN;
                }
            }
            Txt3 = ComponentManager.getTextField(infoTab[2], 18, color1);
            Txt3.x = Txt1.x + 275;
            Txt3.y = Txt1.y;
            this._myContiner.addChild(Txt3);
            var arrowSp = BaseBitmap.create("public_arrow");
            arrowSp.x = Txt1.x + 200;
            arrowSp.y = Txt1.y + Txt1.height / 2 - arrowSp.height / 2;
            this._myContiner.addChild(arrowSp);
            startY += 21;
        }
        this._myContiner.height = startY + 30;
        containerBg.height = this._myContiner.height;
        var tipTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("titleLvupTiptxt1"), 18, TextFieldConst.COLOR_BROWN);
        tipTxt1.lineSpacing = 5;
        tipTxt1.width = 380;
        tipTxt1.x = this.viewBg.x + this.viewBg.width / 2 - tipTxt1.width / 2;
        tipTxt1.y = innerbg.y + innerbg.height + 10;
        this.addChildToContainer(tipTxt1);
        var tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("titleLvupTiptxt2", [Api.itemVoApi.getTitleInfoVoById(titleId).name]), 18, TextFieldConst.COLOR_BROWN);
        if (lv >= titleInfo.lvLimit) {
            tipTxt2.text = LanguageManager.getlocal("skinnextMax");
        }
        tipTxt2.lineSpacing = 5;
        tipTxt2.width = 380;
        tipTxt2.x = this.viewBg.x + this.viewBg.width / 2 - tipTxt2.width / 2;
        tipTxt2.y = tipTxt1.y + tipTxt1.height + 5;
        this.addChildToContainer(tipTxt2);
        var okBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "skinLvupOkBtn", this.hide, this);
        okBtn.x = GameConfig.stageWidth / 2 - okBtn.width / 2;
        okBtn.y = innerbg.y + innerbg.height + 110;
        this.addChildToContainer(okBtn);
    };
    TitleLevelUpView.prototype.getCongratulationString = function () {
        var titleId = Number(this.param.data.titleId);
        var lv = this.param.data.lv;
        return LanguageManager.getlocal("levelUpCongratulation", [Api.itemVoApi.getTitleInfoVoById(titleId).name, String(lv)]);
    };
    TitleLevelUpView.prototype.initHeadContainer = function () {
        var iconAni = BaseBitmap.create("mainui_iconani");
        iconAni.anchorOffsetX = iconAni.width / 2;
        iconAni.anchorOffsetY = iconAni.height / 2;
        iconAni.setScale(1.7);
        iconAni.y = this.viewBg.y + 55 + 51;
        this.addChildToContainer(iconAni);
        var titleId = Number(this.param.data.titleId);
        // let playerHead:BaseDisplayObjectContainer = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(),titleId);
        var playerHead = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(), titleId);
        playerHead.x = this.viewBg.width / 2 - playerHead.width / 2;
        playerHead.y = this.viewBg.y + 50;
        this.addChildToContainer(playerHead);
        var head = playerHead.getChildByName("myHead");
        iconAni.x = playerHead.x + playerHead.width / 2 + 3;
        egret.Tween.get(iconAni, { loop: true })
            .to({ rotation: 360 }, 1000);
    };
    TitleLevelUpView.prototype.getInfoTab = function () {
        var lv = this.param.data.lv;
        var titleId = Number(this.param.data.titleId);
        var titleInfo = Api.itemVoApi.getTitleInfoVoById(titleId);
        var info = [];
        info.push([LanguageManager.getlocal("skinLvuptxt1", [String(lv - 1)]), "", LanguageManager.getlocal("skinLvuptxt1", [String(lv)])]);
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
    TitleLevelUpView.prototype.getCloseBtnName = function () {
        return null;
    };
    TitleLevelUpView.prototype.getTitleStr = function () {
        return null;
    };
    /**
     * 重写 初始化viewbg
     */
    TitleLevelUpView.prototype.initBg = function () {
        this.viewBg = BaseLoadBitmap.create("itemview_titlelvupbg");
        this.viewBg.width = 640;
        this.viewBg.height = 650;
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
        var title = BaseLoadBitmap.create("itemview_titlelvup");
        title.width = 640;
        title.height = 208;
        title.x = this.viewBg.width / 2 - title.width / 2;
        title.y = this.viewBg.y - title.height + 40 + 75;
        this.addChild(title);
    };
    TitleLevelUpView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    TitleLevelUpView.prototype.dispose = function () {
        this._myContiner = null;
        _super.prototype.dispose.call(this);
    };
    return TitleLevelUpView;
}(BaseView));
__reflect(TitleLevelUpView.prototype, "TitleLevelUpView");
