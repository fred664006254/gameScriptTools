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
 * 8 门客 10红颜 16 红颜皮肤 19 门客皮肤 类型使用rewardItemvo中的类型
 * author ycg
 * date 2019.10.10
 * @class AcCommonRewardClothesView BaseLoadDisplayObjectContiner
 */
var AcCommonRewardClothesView = /** @class */ (function (_super) {
    __extends(AcCommonRewardClothesView, _super);
    function AcCommonRewardClothesView(params) {
        var _this = _super.call(this) || this;
        _this.data = null;
        if (params) {
            _this.data = params;
        }
        return _this;
        // egret.callLater(this.initView, this);
    }
    AcCommonRewardClothesView.prototype.initView = function () {
        // if (this.data){
        //     let container = null;
        //     let idType = (this.data.idType).split("_");
        //     if (idType[0] == "8" || idType[0] == "10"){
        //         container = this.getClothesView(idType[1], this.data.bgName, this.data.topMsg, this.data.scale);
        //     }
        //     else if (idType[0] == "16" || idType[0] == "19"){
        //         container = this.getSkinView(idType[1], this.data.bgName, this.data.topMsg);
        //     }
        //     this.width = container.width;
        //     container.setPosition(0,0);
        //     this.addChild(container);
        // }
    };
    AcCommonRewardClothesView.prototype.init = function () {
        if (this.data) {
            var container = null;
            var idType = (this.data.idType).split("_");
            if (idType[0] == "8" || idType[0] == "10") {
                container = this.getClothesView(idType[1], this.data.bgName, this.data.topMsg, this.data.scale, this.data.offY);
            }
            else if (idType[0] == "16" || idType[0] == "19") {
                container = this.getSkinView(idType[1], this.data.bgName, this.data.topMsg, this.data.scale, this.data.offY);
            }
            this.width = container.width;
            container.setPosition(0, 0);
            this.addChild(container);
        }
    };
    //佳人或者门客皮肤
    AcCommonRewardClothesView.prototype.getSkinView = function (skinId, bgName, topMsg, scale, offY) {
        var view = this;
        var container = new BaseDisplayObjectContainer();
        container.width = 540;
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        var isWifeskin = false;
        var skinBgEffBone = null;
        var bgStr = "acthrowarrowview_wifeskinbg";
        if (skinCfg) {
            isWifeskin = true;
            bgStr = "acthrowarrowview_wifeskinbg";
        }
        else {
            // bgStr = "luckdrawshowbg-1";
            bgStr = "previewbg_servantskin";
            skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
            var skinBg = skinCfg.getSkinPreviewBg();
            if (skinBg && ResourceManager.hasRes(skinBg)) {
                bgStr = skinBg;
            }
            skinBgEffBone = skinCfg.getSkinEffectBone();
        }
        // if (bgName){
        //     bgStr = bgName;
        // }
        var bg = BaseLoadBitmap.create(bgStr);
        bg.width = 540; // 544
        bg.height = 395;
        container.addChild(bg);
        var rect = new egret.Rectangle(5, 0, 540 - 10, 364 - 6);
        var maskContan = new BaseDisplayObjectContainer();
        maskContan.width = 540 - 10; // 544
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
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon() && Api.wifeVoApi.isHaveBone(boneName)) {
                wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                if (scale) {
                    wife.setScale(scale);
                }
                else {
                    wife.setScale(0.53); //0.53
                }
                wife.anchorOffsetY = wife.height;
                wife.anchorOffsetX = wife.width / 2;
                wife.x = maskContan.width / 2;
                wife.y = maskContan.y + maskContan.height - 22;
                if (offY) {
                    wife.y += offY;
                }
                // wife.mask = new egret.Rectangle(-354,-665,914,685-6-4);
                maskContan.mask = new egret.Rectangle(0, 0, bg.width, 359 - 1);
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
            var skinTitle = App.CommonUtil.getWifeSkinFlagById(skinId);
            if (skinTitle) {
                skinTitle.setPosition(bg.x + bg.width / 2 - skinTitle.width / 2, bg.y + bg.height - skinTitle.height - 10);
                container.addChild(skinTitle);
            }
            var wifecfg = Config.WifeCfg.getWifeCfgById(skinCfg.wifeId);
            var wifeNameTxt = ComponentManager.getTextField(wifecfg.getName(false), TextFieldConst.FONTSIZE_BUTTON_COMMON);
            wifeNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - wifeNameTxt.width / 2, skinNameTxt.y + 28);
            container.addChild(wifeNameTxt);
            var buttomBg = BaseBitmap.create("public_9_probiginnerbg");
            buttomBg.width = 530;
            buttomBg.height = 276;
            buttomBg.setPosition(container.width / 2 - buttomBg.width / 2, bg.y + bg.height - 3);
            container.addChild(buttomBg);
            buttomBg.visible = false;
            // let buttomBg2 = BaseBitmap.create("public_9_bg14");
            var buttomBg2 = BaseBitmap.create("public_9_bg93");
            buttomBg2.width = 530; //525
            buttomBg2.height = 276; //274
            buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2 + 5);
            container.addChild(buttomBg2);
            //佳人皮肤描述
            var skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            skinTipTxt.width = 480;
            skinTipTxt.lineSpacing = 3;
            skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
            container.addChild(skinTipTxt);
            // let descBg = BaseBitmap.create(`public_9_managebg`);
            var descBg = BaseBitmap.create("public_scrolllistbg");
            descBg.width = 505;
            descBg.height = 120;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, skinTipTxt, [0, skinTipTxt.textHeight + 10]);
            container.addChild(descBg);
            //皮肤属性
            // let addValues = Api.wifeSkinVoApi.getWifeSkinProAdd(skinId, true);
            //getWifeSkinProAdd
            // let txt = [
            // 	{
            // 		txtKey:"skinLvuptxt2",
            // 		value: addValues[0] ,
            // 	},
            // 	{
            // 		txtKey:"skinLvuptxt3",
            // 		value: addValues[1] ,
            // 	},
            // 	{
            // 		txtKey:"skinLvuptxt4",
            // 		value: addValues[2] ,
            // 	},
            // 	{
            // 		txtKey:"skinLvuptxt5",
            // 		value: addValues[3] ,
            // 	},
            // 	{
            // 		txtKey:"skinLvuptxt6",
            // 		value: addValues[4] ,
            // 	},
            // 	{
            // 		txtKey:"skinLvuptxt7",
            // 		value: addValues[5] ,
            // 	}
            // ];
            // let txtArr = txt;
            // let servantName = "";
            // for(let i in txtArr){
            // 	let tmp = txtArr[i];
            // 	let str = String(tmp.value);
            // 	if(Number(i) < 4 && tmp.value == 0){
            // 		str = addValues[Number(i) + 6] * 100 + "%";
            //     }
            //     let tipStr = "";
            //     if (servantName && Number(i) < 4){
            //         tipStr = LanguageManager.getlocal(tmp.txtKey, [servantName, str]);
            //     }
            //     else{
            //         tipStr = LanguageManager.getlocal(`${tmp.txtKey}`)+`：<font color=0x3e9b00>+${str}</font>`;
            //     }
            // 	let tipTxt = ComponentManager.getTextField(tipStr, 20, TextFieldConst.COLOR_BLACK);
            // 	tipTxt.x = descBg.x + (Number(i) % 2 == 0 ? 15 : 285);
            // 	tipTxt.y = descBg.y + Math.floor(Number(i) / 2) * 20 + (Math.floor(Number(i) / 2) + 1) * 15;
            // 	container.addChild(tipTxt);
            // }
            var group = new BaseDisplayObjectContainer();
            group.width = descBg.width;
            container.addChild(group);
            var attrSize = TextFieldConst.FONTSIZE_CONTENT_SMALL;
            if (PlatformManager.checkIsThSp() && skinId == "2241") {
                attrSize = 18;
            }
            // App.LogUtil.log("dealAttrChangeInfo: aa "+PlatformManager.checkIsThSp()+ " size: "+attrSize + " skinId: "+skinId);
            var attrInfo = this.dealAttrChangeInfo(skinId);
            for (var i = 0; i < attrInfo.length; i++) {
                var tipTxt = ComponentManager.getTextField(attrInfo[i], attrSize, TextFieldConst.COLOR_BROWN);
                if (PlatformManager.checkIsThSp() && skinId == "2241") {
                    tipTxt.x = (Number(i) % 2 == 0 ? 10 : 280);
                }
                else {
                    tipTxt.x = (Number(i) % 2 == 0 ? 15 : 285);
                }
                tipTxt.y = Math.floor(Number(i) / 2) * 20 + (Math.floor(Number(i) / 2) + 1) * 15;
                group.addChild(tipTxt);
            }
            var mask = BaseBitmap.create("public_alphabg");
            mask.alpha = 0;
            mask.width = group.width;
            mask.height = group.height;
            group.addChild(mask);
            var scrollView = ComponentManager.getScrollView(group, new egret.Rectangle(0, 0, descBg.width, descBg.height));
            scrollView.setPosition(descBg.x, descBg.y);
            container.addChild(scrollView);
            var buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("skin_servantInTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, buttomBg2.y + buttomBg2.height - buttomTipTxt.height - 28);
            container.addChild(buttomTipTxt);
        }
        else {
            if (skinBgEffBone) {
                var skinEffBoneName = skinBgEffBone + "_ske";
                if (!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon() && skinEffBoneName && RES.hasRes(skinEffBoneName)) {
                    var skinEff = App.DragonBonesUtil.getLoadDragonBones(skinBgEffBone);
                    skinEff.setScale(0.8);
                    skinEff.setPosition(maskContan.width / 2, 140);
                    maskContan.addChild(skinEff);
                }
            }
            var boneName = undefined;
            if (skinCfg && skinCfg.bone) {
                boneName = skinCfg.bone + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                var servantIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                if (scale) {
                    servantIcon.setScale(scale);
                }
                else {
                    servantIcon.setScale(0.8); //0.8
                }
                servantIcon.anchorOffsetY = servantIcon.height;
                servantIcon.anchorOffsetX = servantIcon.width / 2;
                servantIcon.x = maskContan.width / 2;
                servantIcon.y = maskContan.y + maskContan.height - 5; //-5
                if (offY) {
                    servantIcon.y += offY;
                }
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
            var skinAura = App.CommonUtil.getServantSkinAuraById(skinId);
            if (skinAura) {
                skinAura.setScale(0.8);
                container.addChild(skinAura);
                skinAura.setPosition(bg.x + bg.width - skinAura.width * skinAura.scaleX - 20, bg.y + 45);
            }
            //titleeff
            // if (skinCfg && skinCfg.type >= 2){
            //     let titleEff = this.getTitleContainer(skinCfg.type);
            //     titleEff.setPosition(bg.x + bg.width/2 - titleEff.width/2, bg.y + bg.height - titleEff.height - 10);
            //     container.addChild(titleEff);
            // }
            var titleEff = App.CommonUtil.getServantSkinFlagById(skinId);
            if (titleEff) {
                titleEff.setPosition(bg.x + bg.width / 2 - titleEff.width / 2, bg.y + bg.height - titleEff.height - 10);
                container.addChild(titleEff);
            }
            var buttomBg = BaseBitmap.create("public_9_probiginnerbg");
            buttomBg.width = 530;
            buttomBg.height = 295;
            buttomBg.setPosition(container.width / 2 - buttomBg.width / 2, bg.y + bg.height - 3);
            container.addChild(buttomBg);
            buttomBg.visible = false;
            // let buttomBg2 = BaseBitmap.create("public_9_bg14");
            var buttomBg2 = BaseBitmap.create(this.data.listbg ? this.data.listbg : "public_9_bg93");
            buttomBg2.width = 530; //525
            buttomBg2.height = 295; //289
            buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2 + 10); // +5
            container.addChild(buttomBg2);
            var skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            skinTipTxt.width = 480;
            skinTipTxt.lineSpacing = 3;
            skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
            container.addChild(skinTipTxt);
            var addAbility = skinCfg.addAbility;
            for (var index = 0; index < addAbility.length; index++) {
                var bnode = new ServantChangeSkinBookItem();
                bnode.initItem(index, addAbility[index], [skinCfg.id, null, "public_scrolllistbg"]);
                bnode.setPosition(skinTipTxt.x - 5 + index % 2 * 245, skinTipTxt.y + skinTipTxt.height + 15 + Math.floor(index / 2) * 92);
                container.addChild(bnode);
            }
        }
        if (topMsg) {
            // let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
            var topbg = BaseBitmap.create("acthreekingdomrecharge_topbg");
            // topbg.width = 540; //544
            // topbg.height = 29; //36
            topbg.setPosition(container.width / 2 - topbg.width / 2, 0);
            container.addChild(topbg);
            var topDesc = ComponentManager.getTextField(topMsg, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            App.LogUtil.log("topbg.y " + topbg.y + " topbg.height " + topbg.height / 2 + "  topDesc.heigh " + topDesc.height / 2);
            topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2 + 2);
            App.LogUtil.log("topDesc.y " + topDesc.y);
            // topDesc.y = topbg.y+6;
            container.addChild(topDesc);
            var topbgLine = BaseBitmap.create("acthreekingdomrecharge_topbgline");
            topbgLine.setPosition(container.width / 2 - topbgLine.width / 2, topbg.y + topbg.height);
            container.addChild(topbgLine);
        }
        return container;
    };
    //门客或者佳人
    AcCommonRewardClothesView.prototype.getClothesView = function (clothesId, bgName, topMsg, scale, offY) {
        var container = new BaseDisplayObjectContainer();
        container.width = 540;
        var view = this;
        var isWife = false;
        var clothesCfg = Config.WifeCfg.getWifeCfgById(clothesId);
        // let bgStr = "sevendayssignupview_infobg_2";
        var rectOffH = 0;
        var bgStr = "acthrowarrowview_wifeskinbg";
        if (clothesCfg) {
            isWife = true;
            bgStr = "acthrowarrowview_wifeskinbg";
            rectOffH = 7;
        }
        else {
            clothesCfg = Config.ServantCfg.getServantItemById(clothesId);
            bgStr = "acthreekingdomrecharge_skinbg";
            rectOffH = 0;
        }
        var bg = BaseLoadBitmap.create(bgStr);
        bg.width = 540;
        bg.height = 400;
        ;
        container.addChild(bg);
        var rect = new egret.Rectangle(0, 0, bg.width, bg.height - rectOffH);
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
        buttomBg_.visible = false;
        // let buttomBg = BaseBitmap.create("public_9_bg14");
        var buttomBg = BaseBitmap.create("public_9_bg93");
        buttomBg.width = 530;
        buttomBg.height = 244;
        buttomBg.setPosition(bg.x + bg.width / 2 - buttomBg.width / 2, buttomBg_.y + 5);
        container.addChild(buttomBg);
        var descBg = BaseBitmap.create("public_scrolllistbg"); //public_9_managebg
        descBg.width = 520;
        descBg.height = 134;
        descBg.setPosition(buttomBg.x + buttomBg.width / 2 - descBg.width / 2, buttomBg.y + buttomBg.height / 2 - descBg.height / 2 + 40);
        container.addChild(descBg);
        if (isWife) {
            var boneName = undefined;
            if (clothesCfg && clothesCfg.bone) {
                boneName = clothesCfg.bone + "_ske";
            }
            var doubleGragon = App.CommonUtil.getDoubleGragon(clothesId);
            if (!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon() && (boneName && Api.wifeVoApi.isHaveBone(boneName) || doubleGragon)) {
                if (doubleGragon) {
                    if (scale) {
                        doubleGragon.setScale(scale);
                    }
                    else {
                        doubleGragon.setScale(0.55);
                    }
                    doubleGragon.x = maskContan.width / 2;
                    doubleGragon.y = maskContan.y + maskContan.height - 2; //+5
                    if (offY) {
                        doubleGragon.y += offY;
                    }
                    maskContan.addChild(doubleGragon);
                }
                else {
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
                    droWifeIcon.y = maskContan.y + maskContan.height - 2; //+5
                    if (offY) {
                        droWifeIcon.y += offY;
                    }
                    maskContan.addChild(droWifeIcon);
                }
            }
            else {
                var wifeImg = BaseLoadBitmap.create(clothesCfg.body);
                wifeImg.width = 640;
                wifeImg.height = 840;
                wifeImg.anchorOffsetY = wifeImg.height;
                wifeImg.anchorOffsetX = wifeImg.width / 2;
                wifeImg.setScale(0.43);
                wifeImg.x = maskContan.width / 2;
                wifeImg.y = maskContan.y + maskContan.height;
                maskContan.addChild(wifeImg);
            }
            var skinnamebg = BaseBitmap.create("skin_detail_namebg");
            skinnamebg.setPosition(bg.x, bg.y + 30);
            container.addChild(skinnamebg);
            var skinNameTxt = ComponentManager.getTextField(clothesCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
            skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 60 - skinNameTxt.height / 2);
            container.addChild(skinNameTxt);
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
            //只针对港台特殊需求，后续务再使用
            if (this.data.otherTip) {
                var otherTip = ComponentManager.getTextField(this.data.otherTip, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
                otherTip.setPosition(buttomBg.x + buttomBg.width - otherTip.width - 70, buttomBg.y + 45);
                container.addChild(otherTip);
            }
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
                if (offY) {
                    servantIcon.y += offY;
                }
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
                servantImg.y = maskContan.y + maskContan.height;
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
            var servantCfg = Config.ServantCfg.getServantItemById(clothesCfg.id);
            if (servantCfg.quality2) {
                var cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
                cornerImg.x = 455;
                cornerImg.y = 313;
                cornerImg.setScale(1.3);
                container.addChild(cornerImg);
            }
        }
        if (topMsg) {
            // let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
            // topbg.width = 544;
            // topbg.height = 36;
            var topbg = BaseBitmap.create("acthreekingdomrecharge_topbg");
            topbg.setPosition(container.width / 2 - topbg.width / 2, 0);
            container.addChild(topbg);
            var topDesc = ComponentManager.getTextField(topMsg, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2 + 2);
            // topDesc.y = topbg.y + 6;
            container.addChild(topDesc);
            var topbgLine = BaseBitmap.create("acthreekingdomrecharge_topbgline");
            topbgLine.setPosition(container.width / 2 - topbgLine.width / 2, topbg.y + topbg.height);
            container.addChild(topbgLine);
        }
        return container;
    };
    AcCommonRewardClothesView.prototype.dealAttrChangeInfo = function (skinId) {
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        // let skinCfg = GameConfig.config.wifeskinCfg[this._curSkinId];
        var resultStr = [];
        var atkAdd = skinCfg.atkAdd;
        var inteAdd = skinCfg.inteAdd;
        var politicsAdd = skinCfg.politicsAdd;
        var charmAdd = skinCfg.charmAdd;
        var wifeIntimacy = skinCfg.wifeIntimacy;
        var wifeGlamour = skinCfg.wifeGlamour;
        var childReduce = skinCfg.childReduce;
        var searchReduce = skinCfg.searchReduce;
        var wifeReduce = skinCfg.wifeReduce;
        var atkAdd2 = skinCfg.atkAdd2;
        var inteAdd2 = skinCfg.inteAdd2;
        var politicsAdd2 = skinCfg.politicsAdd2;
        var charmAdd2 = skinCfg.charmAdd2;
        if (atkAdd) {
            if (atkAdd[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd1", [atkAdd[1]]));
            }
            else if (atkAdd[0] == 2) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd1", [atkAdd[1] * 100 + "%"]));
            }
            else if (atkAdd[0] == 3) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd14", [atkAdd[1]]));
            }
            else if (atkAdd[0] == 4) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd14", [atkAdd[1] * 100 + "%"]));
            }
        }
        if (inteAdd) {
            if (inteAdd[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd2", [inteAdd[1]]));
            }
            else if (inteAdd[0] == 2) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd2", [inteAdd[1] * 100 + "%"]));
            }
            else if (inteAdd[0] == 3) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd15", [inteAdd[1]]));
            }
            else if (inteAdd[0] == 4) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd15", [inteAdd[1] * 100 + "%"]));
            }
        }
        if (politicsAdd) {
            if (politicsAdd[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd3", [politicsAdd[1]]));
            }
            else if (politicsAdd[0] == 2) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd3", [politicsAdd[1] * 100 + "%"]));
            }
            else if (politicsAdd[0] == 3) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd16", [politicsAdd[1]]));
            }
            else if (politicsAdd[0] == 4) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd16", [politicsAdd[1] * 100 + "%"]));
            }
        }
        if (charmAdd) {
            if (charmAdd[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd4", [charmAdd[1]]));
            }
            else if (charmAdd[0] == 2) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd4", [charmAdd[1] * 100 + "%"]));
            }
            else if (charmAdd[0] == 3) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd17", [charmAdd[1]]));
            }
            else if (charmAdd[0] == 4) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd17", [charmAdd[1] * 100 + "%"]));
            }
        }
        var wifeCfg = Config.WifeCfg.getWifeCfgById(skinCfg.wifeId);
        var servantName = LanguageManager.getlocal("servant_name" + wifeCfg.servantId);
        if (atkAdd2) {
            if (atkAdd2[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd10", [servantName, atkAdd2[1]]));
            }
            else {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd10", [servantName, atkAdd2[1] * 100 + "%"]));
            }
        }
        if (inteAdd2) {
            if (inteAdd2[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd11", [servantName, inteAdd2[1]]));
            }
            else {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd11", [servantName, inteAdd2[1] * 100 + "%"]));
            }
        }
        if (politicsAdd2) {
            if (politicsAdd2[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd12", [servantName, politicsAdd2[1]]));
            }
            else {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd12", [servantName, politicsAdd2[1] * 100 + "%"]));
            }
        }
        if (charmAdd2) {
            if (charmAdd2[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd13", [servantName, charmAdd2[1]]));
            }
            else {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd13", [servantName, charmAdd2[1] * 100 + "%"]));
            }
        }
        if (wifeIntimacy && wifeIntimacy > 0) {
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd5", [wifeIntimacy.toString()]));
        }
        if (wifeGlamour && wifeGlamour > 0) {
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd6", [wifeGlamour.toString()]));
        }
        if (childReduce && childReduce > 0) {
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd7", [childReduce.toString()]));
        }
        if (searchReduce && searchReduce > 0) {
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd8", [searchReduce.toString()]));
        }
        if (wifeReduce && wifeReduce > 0) {
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd9", [wifeReduce.toString()]));
        }
        return resultStr;
    };
    AcCommonRewardClothesView.prototype.getTitleContainer = function (type) {
        var container = new BaseDisplayObjectContainer();
        var frames = 0;
        var effW = 0;
        var effH = 0;
        var titleBgStr = "servant_skin_title_" + type;
        if (type == 2) { // 147 64
            frames = 13;
            effW = 147;
            effH = 64;
        }
        else if (type == 3) {
            frames = 16; // 167, 65
            effW = 167;
            effH = 65;
        }
        if (!ResourceManager.hasRes(titleBgStr)) {
            return null;
        }
        var title = BaseLoadBitmap.create(titleBgStr); // 161 62
        container.addChild(title);
        title.width = 161;
        title.height = 62;
        container.width = title.width;
        container.height = title.height;
        var titleEffStr = "servant_skin_titleeffect" + type;
        if (ResourceManager.hasRes(titleEffStr)) {
            var titleEffect = ComponentManager.getCustomMovieClip(titleEffStr + "_", frames, 70);
            titleEffect.setPosition(title.x + title.width / 2 - effW / 2, title.y + title.height / 2 - effH / 2);
            titleEffect.playWithTime(0);
            container.addChild(titleEffect);
        }
        container.setScale(1);
        return container;
    };
    AcCommonRewardClothesView.prototype.getResourceList = function () {
        var arr = [];
        arr = [
            "skin_detail_namebg",
            "servant_star",
            'wife_doublefly_namebg'
        ];
        return arr;
    };
    // protected getParent():egret.DisplayObjectContainer
    // {
    // 	return null;
    // }
    AcCommonRewardClothesView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCommonRewardClothesView;
}(CommonViewTab));
//# sourceMappingURL=AcCommonRewardClothesView.js.map