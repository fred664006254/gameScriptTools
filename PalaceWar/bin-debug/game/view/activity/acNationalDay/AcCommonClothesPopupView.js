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
 * 通用门客 红颜 门客皮肤 红颜皮肤预览
 * author ycg
 * date 2019.9.16
 * @class AcCommonClothesPopupView
 */
var AcCommonClothesPopupView = (function (_super) {
    __extends(AcCommonClothesPopupView, _super);
    function AcCommonClothesPopupView() {
        var _this = _super.call(this) || this;
        //_clothesContainer1 _clothesContainer2 适用于tabbar情况 1第一个tab  2第二个tab
        _this._clothesContainer1 = null;
        _this._clothesContainer2 = null;
        return _this;
    }
    /**
     * 参数为 数组格式 [{id: "0", type: "", topMsg: "", title:"", bgName:""}]
     * id: 衣装id, 必传
     * type : "servant"|"wife"|"servantSkin"|"wifeSkin" 其中一种 必传
     * topMsg: 顶部消息 必传
     * title 标题或者标签 可选择
     * bgName 衣装背景图 可选择 尺寸须统一
     * scale 缩放比例
     */
    AcCommonClothesPopupView.prototype.initView = function () {
        var data = this.param.data;
        var tabName = [];
        if (data.length == 2) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].title) {
                    tabName.push(data[i].title);
                }
                else {
                    tabName.push(this.getTitleNameByType(data[i].type));
                }
            }
            var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, tabName, this.tabBtnClickHandler, this);
            tabbarGroup.setPosition(35, 10);
            this.addChildToContainer(tabbarGroup);
            if (data[0].type == "servantSkin" || data[0].type == "wifeSkin") {
                this._clothesContainer1 = this.getSkinView(data[0].id, data[0].bgName, data[0].topMsg);
            }
            else {
                this._clothesContainer1 = this.getClothesView(data[0].id, data[0].bgName, data[0].topMsg, data[0].scale);
            }
            this._clothesContainer1.setPosition(this.viewBg.x + this.viewBg.width / 2 - this._clothesContainer1.width / 2, tabbarGroup.y + tabbarGroup.height);
            this.addChildToContainer(this._clothesContainer1);
            if (data[1].type == "servantSkin" || data[1].type == "wifeSkin") {
                this._clothesContainer2 = this.getSkinView(data[1].id, data[1].bgName, data[1].topMsg);
            }
            else {
                this._clothesContainer2 = this.getClothesView(data[1].id, data[1].bgName, data[1].topMsg, data[1].scale);
            }
            this._clothesContainer2.setPosition(this.viewBg.x + this.viewBg.width / 2 - this._clothesContainer2.width / 2, tabbarGroup.y + tabbarGroup.height);
            this.addChildToContainer(this._clothesContainer2);
            this._clothesContainer2.visible = false;
        }
        else {
            var container = null;
            if (data[0].type == "servantSkin" || data[0].type == "wifeSkin") {
                container = this.getSkinView(data[0].id, data[0].bgName, data[0].topMsg);
            }
            else {
                container = this.getClothesView(data[0].id, data[0].bgName, data[0].topMsg);
            }
            container.setPosition(this.viewBg.x + this.viewBg.width / 2 - container.width / 2, 3);
            this.addChildToContainer(container);
        }
    };
    AcCommonClothesPopupView.prototype.tabBtnClickHandler = function (params) {
        if (params.index == 0) {
            this._clothesContainer1.visible = true;
            this._clothesContainer2.visible = false;
        }
        else {
            this._clothesContainer1.visible = false;
            this._clothesContainer2.visible = true;
        }
    };
    //佳人或者门客皮肤
    AcCommonClothesPopupView.prototype.getSkinView = function (skinId, bgName, topMsg) {
        var view = this;
        var container = new BaseDisplayObjectContainer();
        container.width = 544;
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        var isWifeskin = false;
        var bgStr = "acthrowarrowview_wifeskinbg";
        if (skinCfg) {
            isWifeskin = true;
            bgStr = "acthrowarrowview_wifeskinbg";
        }
        else {
            // bgStr = "luckdrawshowbg-1";
            bgStr = "acthrowarrowview_wifeskinbg";
            skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        }
        if (bgName) {
            bgStr = bgName;
        }
        var bg = BaseLoadBitmap.create(bgStr);
        bg.width = 544;
        bg.height = 400;
        container.addChild(bg);
        var rect = new egret.Rectangle(0, 0, 544, 364);
        var maskContan = new BaseDisplayObjectContainer();
        maskContan.width = 544;
        maskContan.height = 364;
        maskContan.mask = rect;
        maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y + 30);
        container.addChild(maskContan);
        if (isWifeskin) {
            var boneName = undefined;
            var wife = null;
            if (skinCfg && skinCfg.bone) {
                boneName = skinCfg.bone + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                wife.setScale(0.53); //0.53
                wife.anchorOffsetY = wife.height;
                wife.anchorOffsetX = wife.width / 2;
                wife.x = maskContan.width / 2;
                wife.y = maskContan.y + maskContan.height - 12;
                wife.mask = new egret.Rectangle(-354, -665, 914, 685);
                maskContan.addChild(wife);
            }
            else {
                wife = BaseLoadBitmap.create(skinCfg.body);
                wife.width = 640;
                wife.height = 840;
                wife.setScale(0.45);
                wife.anchorOffsetY = wife.height;
                wife.anchorOffsetX = wife.width / 2;
                wife.x = maskContan.width / 2;
                wife.y = maskContan.y + maskContan.height;
                maskContan.addChild(wife);
            }
            var skinnamebg = BaseBitmap.create("skin_detail_namebg");
            skinnamebg.setPosition(bg.x, bg.y + 30);
            container.addChild(skinnamebg);
            var skinNameTxt = ComponentManager.getTextField(skinCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
            skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
            container.addChild(skinNameTxt);
            var wifecfg = Config.WifeCfg.getWifeCfgById(skinCfg.wifeId);
            var wifeNameTxt = ComponentManager.getTextField(wifecfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
            wifeNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - wifeNameTxt.width / 2, skinNameTxt.y + 28);
            container.addChild(wifeNameTxt);
            var buttomBg = BaseBitmap.create("public_9_probiginnerbg");
            buttomBg.width = 530;
            buttomBg.height = 276;
            buttomBg.setPosition(container.width / 2 - buttomBg.width / 2, bg.y + bg.height - 3);
            container.addChild(buttomBg);
            var buttomBg2 = BaseBitmap.create("public_9_bg14");
            buttomBg2.width = 525;
            buttomBg2.height = 274;
            buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
            container.addChild(buttomBg2);
            //佳人皮肤描述
            var skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            skinTipTxt.width = 480;
            skinTipTxt.lineSpacing = 3;
            skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
            container.addChild(skinTipTxt);
            var descBg = BaseBitmap.create("public_9_managebg");
            descBg.width = 505;
            descBg.height = 120;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, skinTipTxt, [0, skinTipTxt.textHeight + 10]);
            container.addChild(descBg);
            //皮肤属性
            var addValues = Api.wifeSkinVoApi.getWifeSkinProAdd(skinId, true);
            //getWifeSkinProAdd
            var txt = [
                {
                    txtKey: "skinLvuptxt2",
                    value: addValues[0],
                },
                {
                    txtKey: "skinLvuptxt3",
                    value: addValues[1],
                },
                {
                    txtKey: "skinLvuptxt4",
                    value: addValues[2],
                },
                {
                    txtKey: "skinLvuptxt5",
                    value: addValues[3],
                },
                {
                    txtKey: "skinLvuptxt6",
                    value: addValues[4],
                },
                {
                    txtKey: "skinLvuptxt7",
                    value: addValues[5],
                }
            ];
            for (var i in txt) {
                var tmp = txt[i];
                var str = String(tmp.value);
                if (Number(i) < 4 && tmp.value == 0) {
                    str = addValues[Number(i) + 6] * 100 + "%";
                }
                var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("" + tmp.txtKey) + ("\uFF1A<font color=0x3e9b00>+" + str + "</font>"), 20, TextFieldConst.COLOR_BLACK);
                tipTxt.x = descBg.x + (Number(i) % 2 == 0 ? 15 : 285);
                tipTxt.y = descBg.y + Math.floor(Number(i) / 2) * 20 + (Math.floor(Number(i) / 2) + 1) * 15;
                container.addChild(tipTxt);
            }
            var buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("skin_servantInTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, buttomBg2.y + buttomBg2.height - buttomTipTxt.height - 28);
            container.addChild(buttomTipTxt);
        }
        else {
            var boneName = undefined;
            if (skinCfg && skinCfg.bone) {
                boneName = skinCfg.bone + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                var servantIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                servantIcon.scaleY = 0.8;
                servantIcon.scaleX = 0.8;
                servantIcon.anchorOffsetY = servantIcon.height;
                servantIcon.anchorOffsetX = servantIcon.width / 2;
                servantIcon.x = maskContan.width / 2;
                servantIcon.y = maskContan.y + maskContan.height - 5; //-5
                maskContan.addChild(servantIcon);
            }
            else {
                var skinImg = BaseLoadBitmap.create(skinCfg.body);
                skinImg.width = 405;
                skinImg.height = 467;
                skinImg.anchorOffsetY = skinImg.height;
                skinImg.anchorOffsetX = skinImg.width / 2;
                skinImg.setScale(0.85);
                skinImg.x = maskContan.width / 2;
                skinImg.y = maskContan.y + maskContan.height - 5;
                maskContan.addChild(skinImg);
            }
            var skinnamebg = BaseBitmap.create("skin_detail_namebg");
            skinnamebg.setPosition(bg.x, bg.y + 30);
            container.addChild(skinnamebg);
            var skinNameTxt = ComponentManager.getTextField(skinCfg.getSkinName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
            skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
            container.addChild(skinNameTxt);
            var servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
            var servantNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
            servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
            container.addChild(servantNameTxt);
            var buttomBg = BaseBitmap.create("public_9_probiginnerbg");
            buttomBg.width = 530;
            buttomBg.height = 295;
            buttomBg.setPosition(container.width / 2 - buttomBg.width / 2, bg.y + bg.height - 3);
            container.addChild(buttomBg);
            var buttomBg2 = BaseBitmap.create("public_9_bg14");
            buttomBg2.width = 525;
            buttomBg2.height = 289;
            buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
            container.addChild(buttomBg2);
            var skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            skinTipTxt.width = 480;
            skinTipTxt.lineSpacing = 3;
            skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
            container.addChild(skinTipTxt);
            var addAbility = skinCfg.addAbility;
            for (var index = 0; index < addAbility.length; index++) {
                var bnode = new ServantChangeSkinBookItem();
                bnode.initItem(index, addAbility[index], [skinCfg.id]);
                bnode.setPosition(skinTipTxt.x - 5 + index % 2 * 245, skinTipTxt.y + skinTipTxt.height + 15 + Math.floor(index / 2) * 92);
                container.addChild(bnode);
            }
        }
        if (topMsg) {
            var topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
            topbg.width = 544;
            topbg.height = 36;
            topbg.setPosition(container.width / 2 - topbg.width / 2, 0);
            container.addChild(topbg);
            var topDesc = ComponentManager.getTextField(topMsg, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
            container.addChild(topDesc);
        }
        return container;
    };
    //门客或者佳人
    AcCommonClothesPopupView.prototype.getClothesView = function (clothesId, bgName, topMsg, scale) {
        var container = new BaseDisplayObjectContainer();
        container.width = 544;
        var view = this;
        var isWife = false;
        var clothesCfg = Config.WifeCfg.getWifeCfgById(clothesId);
        // let bgStr = "sevendayssignupview_infobg_2";
        var bgStr = "acthrowarrowview_wifeskinbg";
        if (clothesCfg) {
            isWife = true;
            bgStr = "acthrowarrowview_wifeskinbg";
        }
        else {
            clothesCfg = Config.ServantCfg.getServantItemById(clothesId);
            bgStr = "acthrowarrowview_wifeskinbg";
        }
        if (bgName) {
            bgStr = bgName;
        }
        var bg = BaseLoadBitmap.create(bgStr);
        bg.width = 544;
        bg.height = 400;
        ;
        container.addChild(bg);
        var rect = new egret.Rectangle(0, 0, bg.width, bg.height);
        var maskContan = new BaseDisplayObjectContainer();
        maskContan.width = bg.width;
        maskContan.height = bg.height;
        maskContan.mask = rect;
        maskContan.setPosition(bg.x, bg.y);
        container.addChild(maskContan);
        var buttomBg_ = BaseBitmap.create("public_9_probiginnerbg");
        buttomBg_.width = 536;
        buttomBg_.height = 254;
        buttomBg_.setPosition(container.width / 2 - buttomBg_.width / 2, bg.y + bg.height - 3);
        container.addChild(buttomBg_);
        var buttomBg = BaseBitmap.create("public_9_bg14");
        buttomBg.width = 530;
        buttomBg.height = 244;
        buttomBg.setPosition(bg.x + bg.width / 2 - buttomBg.width / 2, buttomBg_.y + 5);
        container.addChild(buttomBg);
        var descBg = BaseBitmap.create("public_9_managebg");
        descBg.width = 520;
        descBg.height = 134;
        descBg.setPosition(buttomBg.x + buttomBg.width / 2 - descBg.width / 2, buttomBg.y + buttomBg.height / 2 - descBg.height / 2 + 40);
        container.addChild(descBg);
        if (isWife) {
            var boneName = undefined;
            if (clothesCfg && clothesCfg.bone) {
                boneName = clothesCfg.bone + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(clothesCfg.bone);
                if (scale) {
                    droWifeIcon.setScale(scale);
                }
                else {
                    droWifeIcon.setScale(0.55);
                }
                droWifeIcon.anchorOffsetY = droWifeIcon.height;
                droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
                droWifeIcon.x = maskContan.width / 2;
                droWifeIcon.y = maskContan.y + maskContan.height + 5; //+5
                maskContan.addChild(droWifeIcon);
            }
            else {
                var wifeImg = BaseLoadBitmap.create(clothesCfg.body);
                wifeImg.width = 640;
                wifeImg.height = 840;
                wifeImg.anchorOffsetY = wifeImg.height;
                wifeImg.anchorOffsetX = wifeImg.width / 2;
                wifeImg.setScale(0.43);
                wifeImg.x = maskContan.width / 2;
                wifeImg.y = maskContan.y + maskContan.height + 5;
                maskContan.addChild(wifeImg);
            }
            var skinnamebg = BaseBitmap.create("skin_detail_namebg");
            skinnamebg.setPosition(bg.x, bg.y + 30);
            container.addChild(skinnamebg);
            var skinNameTxt = ComponentManager.getTextField(clothesCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
            skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 60 - skinNameTxt.height / 2);
            container.addChild(skinNameTxt);
            // let buttomBg = BaseBitmap.create("public_9_bg14");
            // buttomBg.width = 536;
            // buttomBg.height = 244;
            // buttomBg.setPosition(bg.x + bg.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
            // container.addChild(buttomBg);
            // let descBg = BaseBitmap.create(`public_9_managebg`);
            // descBg.width = 520;
            // descBg.height = 134;
            // descBg.setPosition(buttomBg.x + buttomBg.width / 2 - descBg.width / 2, buttomBg.y + buttomBg.height / 2 - descBg.height / 2 + 40);
            // container.addChild(descBg);
            //初始魅力
            var initialCharmStr = LanguageManager.getlocal('acCommonWifePopupViewcCharm', [clothesCfg.glamour + '']);
            var initialCharmTxt = ComponentManager.getTextField(initialCharmStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            initialCharmTxt.setPosition(buttomBg.x + 30, buttomBg.y + 30);
            container.addChild(initialCharmTxt);
            //加成门客
            var servantCfg = Config.ServantCfg.getServantItemById(clothesCfg.servantId);
            var servantAddStr = LanguageManager.getlocal('acCommonWifePopupViewcServant', [servantCfg.name]);
            var servantAddTxt = ComponentManager.getTextField(servantAddStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            servantAddTxt.setPosition(buttomBg.x + 30, initialCharmTxt.y + 30);
            container.addChild(servantAddTxt);
            // let wifeDescStr = LanguageManager.getlocal('wifeDesc_' + wifeId);
            var wifeDescTxt = ComponentManager.getTextField(clothesCfg.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            wifeDescTxt.lineSpacing = 3;
            wifeDescTxt.width = descBg.width - 40;
            wifeDescTxt.setPosition(descBg.x + 20, descBg.y + descBg.height / 2 - wifeDescTxt.height / 2);
            container.addChild(wifeDescTxt);
        }
        else {
            var dagonBonesName = "servant_full2_" + clothesId;
            var boneName = undefined;
            if (clothesCfg && dagonBonesName) {
                boneName = dagonBonesName + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                var servantIcon = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
                if (scale) {
                    servantIcon.setScale(scale);
                }
                else {
                    servantIcon.setScale(0.7);
                }
                servantIcon.anchorOffsetY = servantIcon.height;
                servantIcon.anchorOffsetX = servantIcon.width / 2;
                servantIcon.x = maskContan.width / 2;
                servantIcon.y = maskContan.y + maskContan.height - 5;
                maskContan.addChild(servantIcon);
            }
            else {
                var servantImg = BaseLoadBitmap.create(clothesCfg.fullIcon);
                servantImg.width = 405;
                servantImg.height = 467;
                servantImg.anchorOffsetY = servantImg.height;
                servantImg.anchorOffsetX = servantImg.width / 2;
                servantImg.setScale(0.8);
                servantImg.x = maskContan.width / 2;
                servantImg.y = maskContan.y + maskContan.height + 5;
                maskContan.addChild(servantImg);
            }
            var skinnamebg = BaseBitmap.create("skin_detail_namebg");
            skinnamebg.setPosition(bg.x, bg.y + 30);
            container.addChild(skinnamebg);
            var skinNameTxt = ComponentManager.getTextField(clothesCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
            skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 60 - skinNameTxt.height / 2);
            container.addChild(skinNameTxt);
            var aptitudeTF = ComponentManager.getTextField(LanguageManager.getlocal("acCommonServantPopupViewcAptitude", [String(Api.servantVoApi.getServantAptitude(clothesCfg.id))]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            aptitudeTF.setPosition(buttomBg.x + 30, buttomBg.y + 30);
            container.addChild(aptitudeTF);
            var speciality = clothesCfg.speciality;
            var str = "";
            for (var i = 0; i < speciality.length; i++) {
                str += LanguageManager.getlocal("servantInfo_speciality" + speciality[i]) + "，";
            }
            var servantTF = ComponentManager.getTextField(LanguageManager.getlocal("acCommonServantPopupViewcAdvantage", [str.substr(0, str.length - 1)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            servantTF.setPosition(buttomBg.x + 30, aptitudeTF.y + 30);
            container.addChild(servantTF);
            var servantDescTxt = ComponentManager.getTextField(clothesCfg.story, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            servantDescTxt.lineSpacing = 3;
            servantDescTxt.width = descBg.width - 40;
            servantDescTxt.setPosition(descBg.x + 20, descBg.y + descBg.height / 2 - servantDescTxt.height / 2);
            container.addChild(servantDescTxt);
        }
        if (topMsg) {
            var topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
            topbg.width = 544;
            topbg.height = 36;
            topbg.setPosition(container.width / 2 - topbg.width / 2, 0);
            container.addChild(topbg);
            var topDesc = ComponentManager.getTextField(topMsg, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
            container.addChild(topDesc);
        }
        return container;
    };
    AcCommonClothesPopupView.prototype.getTitleNameByType = function (type) {
        if (type == "servant") {
            return "acCommonClothesServantTitle";
        }
        else if (type == "wife") {
            return "acCommonClothesWifeTitle";
        }
        else if (type == "servantSkin") {
            return "acCommonClothesServantSkinTitle";
        }
        else if (type == "wifeSkin") {
            return "acCommonClothesWifeSkinTitle";
        }
    };
    AcCommonClothesPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "skin_detail_namebg",
        ]);
    };
    AcCommonClothesPopupView.prototype.getTitleStr = function () {
        var titleStr = "acCommonClothesTitle";
        var data = this.param.data;
        if (data && data.length < 2) {
            if (data[0].title) {
                titleStr = data[0].title;
            }
            else {
                titleStr = this.getTitleNameByType(data[0].type);
            }
        }
        return titleStr;
    };
    AcCommonClothesPopupView.prototype.dispose = function () {
        this._clothesContainer1 = null;
        this._clothesContainer2 = null;
        _super.prototype.dispose.call(this);
    };
    return AcCommonClothesPopupView;
}(PopupView));
__reflect(AcCommonClothesPopupView.prototype, "AcCommonClothesPopupView");
//# sourceMappingURL=AcCommonClothesPopupView.js.map