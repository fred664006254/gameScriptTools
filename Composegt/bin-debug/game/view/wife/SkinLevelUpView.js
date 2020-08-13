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
var SkinLevelUpView = (function (_super) {
    __extends(SkinLevelUpView, _super);
    function SkinLevelUpView() {
        var _this = _super.call(this) || this;
        _this._skinId = null;
        _this._wifeId = null;
        _this._lv = 1;
        _this._skinInfoVo = null;
        _this._skinCfg = null;
        _this._myContiner = null;
        return _this;
    }
    SkinLevelUpView.prototype.initView = function () {
        this._wifeId = this.param.data.wifeId;
        this._skinId = this.param.data.skinId;
        this._skinCfg = Config.WifeskinCfg.getWifeCfgById(this._skinId);
        this._skinInfoVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this._wifeId);
        this._lv = this.param.data.lv;
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
            Txt3 = ComponentManager.getTextField(infoTab[2], 18, TextFieldConst.COLOR_WARN_GREEN);
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
        var tipTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("skinLvupTiptxt1"), 18, TextFieldConst.COLOR_BROWN);
        tipTxt1.lineSpacing = 5;
        tipTxt1.width = 380;
        tipTxt1.x = this.viewBg.x + this.viewBg.width / 2 - tipTxt1.width / 2;
        tipTxt1.y = innerbg.y + innerbg.height + 10;
        this.addChildToContainer(tipTxt1);
        var titleId = Number(this.param.data.titleId);
        var tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("skinLvupTiptxt2", [this._skinCfg.name, this._skinCfg.wifeName]), 18, TextFieldConst.COLOR_BROWN);
        if (this._lv >= this._skinCfg.lvLimit) {
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
    SkinLevelUpView.prototype.getCongratulationString = function () {
        return LanguageManager.getlocal("levelUpCongratulation", [this._skinCfg.name, String(this._lv)]);
    };
    SkinLevelUpView.prototype.initHeadContainer = function () {
        var iconAni = BaseBitmap.create("mainui_iconani");
        iconAni.anchorOffsetX = iconAni.width / 2;
        iconAni.anchorOffsetY = iconAni.height / 2;
        iconAni.setScale(1.45);
        iconAni.setPosition(this.viewBg.width / 2, this.viewBg.y + 55 + 48);
        this.addChildToContainer(iconAni);
        egret.Tween.get(iconAni, { loop: true })
            .to({ rotation: 360 }, 1000);
        var iconBg = BaseBitmap.create("wifeview_hongyantyouxiang1");
        iconBg.x = this.viewBg.width / 2 - iconBg.width / 2;
        iconBg.y = this.viewBg.y + 55;
        iconBg.name = "bg2";
        this.addChildToContainer(iconBg);
        var iconStr = "";
        if (this._skinCfg) {
            iconStr = this._skinCfg.icon;
        }
        else {
            var cfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
            iconStr = cfg.icon;
        }
        var icon = BaseLoadBitmap.create(iconStr);
        icon.width = 205;
        icon.height = 192;
        icon.setScale(0.5);
        icon.x = iconBg.x + iconBg.width / 2 - icon.width * icon.scaleX / 2;
        icon.y = iconBg.y + iconBg.height / 2 - icon.height * icon.scaleY / 2;
        var iconMask = BaseBitmap.create("wifeview_iconmask");
        iconMask.x = iconBg.x;
        iconMask.y = iconBg.y;
        this.addChildToContainer(iconMask);
        icon.mask = iconMask;
        this.addChildToContainer(icon);
    };
    SkinLevelUpView.prototype.createObj = function (index, type, value1, value2) {
        var obj = null;
        if (type == 1) {
            obj = [LanguageManager.getlocal("skinLvuptxt" + index), "+" + (value1 + (this._lv - 2) * value2), "+" + (value1 + (this._lv - 1) * value2)];
        }
        else {
            obj = [LanguageManager.getlocal("skinLvuptxt" + index), "+" + (value1 + (this._lv - 2) * value2) * 100 + "%", "+" + (value1 + (this._lv - 1) * value2) * 100 + "%"];
        }
        return obj;
    };
    SkinLevelUpView.prototype.getInfoTab = function () {
        var info = [];
        info.push([LanguageManager.getlocal("skinLvuptxt1", [String(this._lv - 1)]), "", LanguageManager.getlocal("skinLvuptxt1", [String(this._lv)])]);
        if (this._skinCfg.atkLvUpAdd && this._skinCfg.atkLvUpAdd[0] == 1) {
            var obj = this.createObj(2, 1, (this._skinCfg.atkAdd && this._skinCfg.atkAdd[0] == 1) ? this._skinCfg.atkAdd[1] : 0, this._skinCfg.atkLvUpAdd[1]);
            info.push(obj);
        }
        if (this._skinCfg.inteLvUpAdd && this._skinCfg.inteLvUpAdd[0] == 1) {
            var obj = this.createObj(3, 1, (this._skinCfg.inteAdd && this._skinCfg.inteAdd[0] == 1) ? this._skinCfg.inteAdd[1] : 0, this._skinCfg.inteLvUpAdd[1]);
            info.push(obj);
        }
        if (this._skinCfg.politicsLvUpAdd && this._skinCfg.politicsLvUpAdd[0] == 1) {
            var obj = this.createObj(4, 1, (this._skinCfg.politicsAdd && this._skinCfg.politicsAdd[0] == 1) ? this._skinCfg.politicsAdd[1] : 0, this._skinCfg.politicsLvUpAdd[1]);
            info.push(obj);
        }
        if (this._skinCfg.charmLvUpAdd && this._skinCfg.charmLvUpAdd[0] == 1) {
            var obj = this.createObj(5, 1, (this._skinCfg.charmAdd && this._skinCfg.charmAdd[0] == 1) ? this._skinCfg.charmAdd[1] : 0, this._skinCfg.charmLvUpAdd[1]);
            info.push(obj);
        }
        //////////////////
        if (this._skinCfg.atkLvUpAdd && this._skinCfg.atkLvUpAdd[0] == 2) {
            var obj = this.createObj(2, 2, (this._skinCfg.atkAdd && this._skinCfg.atkAdd[0] == 2) ? this._skinCfg.atkAdd[1] : 0, this._skinCfg.atkLvUpAdd[1]);
            info.push(obj);
        }
        if (this._skinCfg.inteLvUpAdd && this._skinCfg.inteLvUpAdd[0] == 2) {
            var obj = this.createObj(3, 2, (this._skinCfg.inteAdd && this._skinCfg.inteAdd[0] == 2) ? this._skinCfg.inteAdd[1] : 0, this._skinCfg.inteLvUpAdd[1]);
            info.push(obj);
        }
        if (this._skinCfg.politicsLvUpAdd && this._skinCfg.politicsLvUpAdd[0] == 2) {
            var obj = this.createObj(4, 2, (this._skinCfg.politicsAdd && this._skinCfg.politicsAdd[0] == 2) ? this._skinCfg.politicsAdd[1] : 0, this._skinCfg.politicsLvUpAdd[1]);
            info.push(obj);
        }
        if (this._skinCfg.charmLvUpAdd && this._skinCfg.charmLvUpAdd[0] == 2) {
            var obj = this.createObj(5, 2, (this._skinCfg.charmAdd && this._skinCfg.charmAdd[0] == 2) ? this._skinCfg.charmAdd[1] : 0, this._skinCfg.charmLvUpAdd[1]);
            info.push(obj);
        }
        if (this._skinCfg.wifeIntimacy && this._skinCfg.wifeLvUpIntimacy) {
            var obj = this.createObj(6, 1, this._skinCfg.wifeIntimacy, this._skinCfg.wifeLvUpIntimacy);
            info.push(obj);
        }
        if (this._skinCfg.wifeGlamour && this._skinCfg.wifeLvUpGlamour) {
            var obj = this.createObj(7, 1, this._skinCfg.wifeGlamour, this._skinCfg.wifeLvUpGlamour);
            info.push(obj);
        }
        // let v1:number = titleInfo.lvUpEffect1;
        // let v2:number = titleInfo.lvUpEffect2;
        // let v3:number = titleInfo.atkEffect;
        // let o1:number = titleInfo.effect1;
        // let o2:number = titleInfo.effect2;
        // let o3:number = titleInfo.atkEffect;
        // if (o1)
        // {	
        //     for (let i:number = 2; i<=5; i++)
        //     {	
        // 		let value1:string = "+"+ (v1*(lv-2)+o1);
        //         let value2:string = "+"+ (v1*(lv-1)+o1);
        // 		info.push([LanguageManager.getlocal("skinLvuptxt"+i),value1,value2]);
        //     }
        // }
        // if (o2)
        // {	
        //     for (let i:number = 2; i<=5; i++)
        //     {	
        // 		let value1:string = "+"+(v2*(lv-2)+o2)*100+"%";
        //         let value2:string = "+"+(v2*(lv-1)+o2)*100+"%";
        // 		info.push([LanguageManager.getlocal("skinLvuptxt"+i),value1,value2]);
        //     }
        // }
        // if(o3){
        // 	for (let i:number = 8; i<=8; i++)
        //     {	
        // 		let value1:string = "+"+Math.round((v3*(lv-1))*100)+"%";
        //         let value2:string = "+"+Math.round((v3*lv)*100)+"%";
        // 		info.push([LanguageManager.getlocal("skinLvuptxt"+i),value1,value2]);
        //     }
        // }
        return info;
    };
    SkinLevelUpView.prototype.getCloseBtnName = function () {
        return null;
    };
    SkinLevelUpView.prototype.getTitleStr = function () {
        return null;
    };
    /**
     * 重写 初始化viewbg
     */
    SkinLevelUpView.prototype.initBg = function () {
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
    SkinLevelUpView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifeview_hongyantyouxiang1",
            "wifeview_iconmask"
        ]);
    };
    SkinLevelUpView.prototype.dispose = function () {
        this._skinId = null;
        this._wifeId = null;
        this._lv = 1;
        this._skinInfoVo = null;
        this._skinCfg = null;
        this._myContiner = null;
        _super.prototype.dispose.call(this);
    };
    return SkinLevelUpView;
}(BaseView));
__reflect(SkinLevelUpView.prototype, "SkinLevelUpView");
