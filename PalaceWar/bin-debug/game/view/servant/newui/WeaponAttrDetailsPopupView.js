/**
 * 神器属性详情
 * author shaoliang
 * date 2019/8/6
 * @class WeaponAttrDetailsPopupView
 */
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
var WeaponAttrDetailsPopupView = /** @class */ (function (_super) {
    __extends(WeaponAttrDetailsPopupView, _super);
    function WeaponAttrDetailsPopupView() {
        var _this = _super.call(this) || this;
        _this._weaponId = null;
        _this._weaponVo = null;
        _this._weaponCfg = null;
        _this._container = null;
        _this._scrollview = null;
        _this._lookPromationText = null;
        return _this;
    }
    WeaponAttrDetailsPopupView.prototype.getCloseBtnName = function () {
        return "sharepopupview_closebtn";
    };
    WeaponAttrDetailsPopupView.prototype.getBgName = function () {
        return "servant_detailsbg";
    };
    WeaponAttrDetailsPopupView.prototype.getTitleStr = function () {
        return null;
    };
    WeaponAttrDetailsPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "servant_detailsbg",
            "weapon_attrinfo_bg",
            "servant_namebg2",
            "servant_fl",
            "servant_detailstitles",
            "servant_detailsline",
            "servant_detailsfontbg",
            "weapon_attrinfo_title",
            "sharepopupview_closebtn",
            "weapon_attrinfo_line1", "weapon_attrinfo_line2",
            "weapon_diamond"
        ]);
    };
    WeaponAttrDetailsPopupView.prototype.initView = function () {
        // this.resetBgSize();
    };
    WeaponAttrDetailsPopupView.prototype.resetBgSize = function () {
        this.viewBg.height = 810;
        this.viewBg.x = (this.width - this.viewBg.width) * 0.5;
        this.viewBg.y = (this.height - this.viewBg.height) * 0.5;
        if (GameConfig.stageHeigth > 960) {
            this.viewBg.y = (GameConfig.stageHeigth - this.viewBg.height + 60) * 0.5;
        }
        this._container = new BaseDisplayObjectContainer();
        // this._container.setPosition(60,this.viewBg.y+45);
        // this.addChild(this._container);
        var rect = new egret.Rectangle();
        rect.setTo(0, 0, 520, 707);
        var scrollView = ComponentManager.getScrollView(this._container, rect);
        scrollView.x = 60;
        scrollView.y = this.viewBg.y + 35;
        scrollView.horizontalScrollPolicy = "off";
        this.addChild(scrollView);
        this.closeBtn.x = this.closeBtn.x - 20;
        this.closeBtn.y = this.viewBg.y - 30;
        this._weaponId = this.param.data.id;
        this._weaponVo = Api.weaponVoApi.getWeaponInfoVoById(this._weaponId);
        this._weaponCfg = Config.ServantweaponCfg.getWeaponItemById(this._weaponId);
        var itemBg = BaseBitmap.create("weapon_attrinfo_bg");
        itemBg.width = 520;
        itemBg.height = 202;
        this._container.addChild(itemBg);
        //翅膀
        var titlefont2 = BaseBitmap.create("servant_detailstitles");
        this.addChildToContainer(titlefont2);
        var titlefont = BaseBitmap.create("weapon_attrinfo_title");
        titlefont.x = (this.width - titlefont.width) * 0.5;
        titlefont.y = this.viewBg.y - titlefont.height + 40;
        this.addChildToContainer(titlefont);
        titlefont2.width = 520;
        titlefont2.x = 60;
        titlefont2.y = titlefont.y + 5;
        var picName = this._weaponCfg.icon;
        var weapon = BaseLoadBitmap.create(picName);
        weapon.setScale(0.55);
        weapon.x = 10;
        weapon.y = 5;
        this._container.addChild(weapon);
        //人物名称
        var penameTxt = ComponentManager.getTextField(this._weaponCfg.name, 26, 0x3f1f10);
        penameTxt.y = 20;
        this._container.addChild(penameTxt);
        var flimg = BaseBitmap.create("servant_fl");
        flimg.x = 210;
        flimg.y = penameTxt.y + 5;
        this._container.addChild(flimg);
        penameTxt.x = flimg.x + flimg.width + 10;
        var flimg2 = BaseBitmap.create("servant_fl");
        flimg2.x = penameTxt.x + penameTxt.width + 10;
        flimg2.y = flimg.y;
        this._container.addChild(flimg2);
        //神器详情
        var peDesTxt = ComponentManager.getTextField(LanguageManager.getlocal("weapon_pesc_" + this._weaponId), 20, TextFieldConst.COLOR_BROWN);
        peDesTxt.x = flimg.x;
        peDesTxt.y = 60;
        peDesTxt.width = 300;
        peDesTxt.lineSpacing = 5;
        this._container.addChild(peDesTxt);
        //线条
        for (var i = 0; i < 1; i++) {
            var lineBit = BaseBitmap.create("servant_detailsline");
            lineBit.x = peDesTxt.x;
            lineBit.y = 82 + i * 25;
            this._container.addChild(lineBit);
        }
        //神器描述
        var weaponDesc = ComponentManager.getTextField(this._weaponCfg.desc, 20, 0x775108);
        weaponDesc.x = 210;
        weaponDesc.y = peDesTxt.y + peDesTxt.height + 16;
        weaponDesc.width = 300;
        weaponDesc.lineSpacing = 5;
        this._container.addChild(weaponDesc);
        //神器属性
        var desFontBg1 = BaseBitmap.create("servant_detailsfontbg");
        desFontBg1.width = 520;
        desFontBg1.height = 114;
        desFontBg1.y = itemBg.y + itemBg.height + 25;
        this._container.addChild(desFontBg1);
        var namebg1 = BaseBitmap.create("servant_namebg2");
        namebg1.y = desFontBg1.y - 13;
        namebg1.width = 236;
        namebg1.x = (desFontBg1.width - namebg1.width) * 0.5;
        this._container.addChild(namebg1);
        var title1 = ComponentManager.getTextField(LanguageManager.getlocal("weapon_attr"), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x943e0d);
        title1.x = namebg1.x + (namebg1.width - title1.width) * 0.5;
        title1.y = namebg1.y + (namebg1.height - title1.height) * 0.5;
        this._container.addChild(title1);
        var flower11 = BaseBitmap.create("servant_fl");
        flower11.x = 6;
        flower11.y = desFontBg1.y + 27;
        this._container.addChild(flower11);
        var attrTotal = ComponentManager.getTextField(LanguageManager.getlocal("servant_newui_attr0", [String(this._weaponVo.total)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        attrTotal.x = flower11.x + flower11.width + 3;
        attrTotal.y = desFontBg1.y + 25;
        this._container.addChild(attrTotal);
        for (var i_1 = 1; i_1 <= 4; i_1++) {
            var oneAttr = ComponentManager.getTextField(LanguageManager.getlocal("servant_newui2_attr" + i_1, [String(this._weaponVo.attr[i_1 - 1])]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
            oneAttr.x = 50 + Math.floor((i_1 - 1) % 2) * 200;
            oneAttr.y = attrTotal.y + 4 + Math.ceil(i_1 / 2) * 27;
            this._container.addChild(oneAttr);
        }
        //神器特性
        var posY = desFontBg1.y + desFontBg1.height + 26;
        var desFontBg2 = BaseBitmap.create("servant_detailsfontbg");
        desFontBg2.width = 520;
        desFontBg2.height = 275;
        desFontBg2.y = posY;
        this._container.addChild(desFontBg2);
        var namebg2 = BaseBitmap.create("servant_namebg2");
        namebg2.y = desFontBg2.y - 13;
        namebg2.width = 236;
        namebg2.x = (desFontBg2.width - namebg1.width) * 0.5;
        this._container.addChild(namebg2);
        var title2 = ComponentManager.getTextField(LanguageManager.getlocal("weapon_speciality"), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x943e0d);
        title2.x = namebg2.x + (namebg2.width - title2.width) * 0.5;
        title2.y = namebg2.y + (namebg2.height - title2.height) * 0.5;
        this._container.addChild(title2);
        //机缘特性
        var flower12 = BaseBitmap.create("servant_fl");
        flower12.x = 6;
        flower12.y = desFontBg2.y + 27;
        this._container.addChild(flower12);
        var attribute3 = ComponentManager.getTextField(LanguageManager.getlocal("weapon_attribute3", [String(this._weaponVo.total)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        attribute3.x = flower12.x + flower12.width + 3;
        attribute3.y = desFontBg2.y + 25;
        this._container.addChild(attribute3);
        for (var i_2 = 1; i_2 <= 1; i_2++) {
            var oneSpeciality = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_YELLOW2);
            var str = LanguageManager.getlocal("weapon_attribute_type" + i_2 + "_power" + this._weaponCfg.attributeType1, [String(this._weaponVo.getAttributeValueByType(i_2))]);
            var vo = Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_THREEKINGDOMS);
            str += (vo ? LanguageManager.getlocal("weapon_attribute_status1") : LanguageManager.getlocal("weapon_attribute_status2"));
            oneSpeciality.text = str;
            oneSpeciality.x = 130;
            oneSpeciality.y = attribute3.y + (i_2 - 1) * 27 + 2;
            this._container.addChild(oneSpeciality);
        }
        var flower13 = BaseBitmap.create("servant_fl");
        flower13.x = 6;
        flower13.y = attribute3.y + 33;
        this._container.addChild(flower13);
        var attr1 = ComponentManager.getTextField(LanguageManager.getlocal("weapon_attribute1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        attr1.x = flower12.x + flower12.width + 3;
        attr1.y = flower13.y - 2;
        this._container.addChild(attr1);
        for (var i_3 = 5; i_3 <= 8; i_3++) {
            var oneSpeciality = ComponentManager.getTextField(LanguageManager.getlocal("weapon_speciality2_" + i_3, [String(this._weaponVo.getSpecialityByType(i_3))]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, 0xe16a32);
            oneSpeciality.x = 130;
            oneSpeciality.y = attr1.y + (i_3 - 5) * 27 + 2;
            this._container.addChild(oneSpeciality);
        }
        var flower14 = BaseBitmap.create("servant_fl");
        flower14.x = 6;
        flower14.y = attr1.y + 113;
        this._container.addChild(flower14);
        var attr2 = ComponentManager.getTextField(LanguageManager.getlocal("weapon_attribute2"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        attr2.x = flower12.x + flower12.width + 3;
        attr2.y = flower14.y - 2;
        this._container.addChild(attr2);
        for (var i_4 = 1; i_4 <= 4; i_4++) {
            var oneSpeciality = ComponentManager.getTextField(LanguageManager.getlocal("weapon_speciality2_" + i_4, [String(this._weaponVo.getSpecialityByType(i_4))]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
            oneSpeciality.x = 130;
            oneSpeciality.y = attr2.y + (i_4 - 1) * 27 + 2;
            this._container.addChild(oneSpeciality);
        }
        //神器提升引导
        posY = desFontBg2.y + desFontBg2.height + 26;
        var desFontBg3 = BaseBitmap.create("servant_detailsfontbg");
        desFontBg3.width = 520;
        desFontBg3.height = 688;
        desFontBg3.y = posY;
        this._container.addChild(desFontBg3);
        var namebg3 = BaseBitmap.create("servant_namebg2");
        namebg3.y = desFontBg3.y - 8 - 5;
        namebg3.width = 236;
        namebg3.x = (desFontBg3.width - namebg3.width) * 0.5;
        this._container.addChild(namebg3);
        var fontTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("weapon_popdesfont"), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x943e0d);
        fontTxt1.x = namebg3.x + (namebg3.width - fontTxt1.width) * 0.5;
        fontTxt1.y = 1 + namebg3.y + (namebg3.height - fontTxt1.height) * 0.5;
        this._container.addChild(fontTxt1);
        var flower1 = BaseBitmap.create("servant_fl");
        flower1.x = 6;
        flower1.y = desFontBg3.y + 29;
        this._container.addChild(flower1);
        var popName1 = ComponentManager.getTextField(LanguageManager.getlocal("weapon_pop_name1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x3f1f10);
        popName1.setPosition(flower1.x + flower1.width + 3, flower1.y - 2);
        this._container.addChild(popName1);
        var popeDesc1 = ComponentManager.getTextField(LanguageManager.getlocal("weapon_pop_desc1", [String(this._weaponCfg.getMaxLv())]), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x775108);
        popeDesc1.width = 485;
        popeDesc1.lineSpacing = 6;
        popeDesc1.setPosition(popName1.x, popName1.y + popName1.height + 8);
        this._container.addChild(popeDesc1);
        var line1 = BaseBitmap.create("public_line1");
        line1.setPosition(flower1.x, popeDesc1.y + popeDesc1.height + 10);
        this._container.addChild(line1);
        var flower2 = BaseBitmap.create("servant_fl");
        flower2.x = 6;
        flower2.y = line1.y + 16;
        this._container.addChild(flower2);
        var popName2 = ComponentManager.getTextField(LanguageManager.getlocal("weapon_pop_name2"), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x3f1f10);
        popName2.setPosition(popName1.x, flower2.y - 2);
        this._container.addChild(popName2);
        var popeDesc2 = ComponentManager.getTextField(LanguageManager.getlocal("weapon_pop_desc2", [String(this._weaponCfg.getMaxPromotionLv())]), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x775108);
        popeDesc2.width = 485;
        popeDesc2.lineSpacing = 6;
        popeDesc2.setPosition(popName2.x, popName2.y + popName2.height + 8);
        this._container.addChild(popeDesc2);
        posY = popeDesc2.y + popeDesc2.height + 10;
        var cellheght = 218;
        var attrTab = [
            ["5", "6", "7", "8", "1"],
            ["5", "6", "7", "8", "2"],
            ["5", "6", "7", "8", "3"],
            ["5", "6", "7", "8", "4"]
        ];
        if (this._weaponCfg.attributeType1 == 2 || this._weaponCfg.attributeType1 == 5) {
            attrTab[1].splice(0, 0, "a" + this._weaponCfg.attributeType1);
        }
        else {
            attrTab[0].splice(0, 0, "a" + this._weaponCfg.attributeType1);
        }
        for (var i_5 = 0; i_5 < 4; i_5++) {
            var oneNode = new BaseDisplayObjectContainer();
            oneNode.setPosition(8 + i_5 % 2 * 256, posY + Math.floor(i_5 / 2) * (cellheght + 7));
            this._container.addChild(oneNode);
            var onebg = BaseBitmap.create("public_9_bg78");
            onebg.width = 250;
            onebg.height = cellheght;
            oneNode.addChild(onebg);
            var oneIcon = BaseBitmap.create("weapon_infopro" + (i_5 + 1));
            oneIcon.setPosition(18, 12);
            var onenamebg = BaseBitmap.create("weapon_star_bg");
            onenamebg.height = 30;
            onenamebg.width = 134;
            onenamebg.setPosition(oneIcon.x + oneIcon.width - 14, oneIcon.y + oneIcon.height / 2 - onenamebg.height / 2);
            oneNode.addChild(onenamebg);
            oneNode.addChild(oneIcon);
            var oneName = ComponentManager.getTextField(LanguageManager.getlocal("weapon_speciality_name" + (i_5 + 1)), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            oneName.setPosition(onenamebg.x + 20, oneIcon.y + oneIcon.height / 2 - oneName.height / 2);
            oneNode.addChild(oneName);
            onenamebg.width = oneName.width + 40;
            // let oneDesc = ComponentManager.getTextField(LanguageManager.getlocal("weapon_speciality_desc"+(i+1)),
            // 18,TextFieldConst.COLOR_BROWN);
            // oneDesc.width = 200;
            // oneDesc.lineSpacing =5;
            // oneDesc.setPosition(20,oneIcon.y+oneIcon.height+6);
            // oneNode.addChild(oneDesc);
            var colorArray1 = ["1", "2", "3", "4"];
            var colorArray2 = ["5", "6", "7", "8"];
            for (var j = 0; j < attrTab[i_5].length; j++) {
                var diamond = BaseBitmap.create("weapon_diamond");
                diamond.setPosition(25, oneIcon.y + oneIcon.height + 6 + j * 22);
                oneNode.addChild(diamond);
                var v = attrTab[i_5][j];
                var oneSpeciality = ComponentManager.getTextField(LanguageManager.getlocal("weapon_speciality_type_" + v), 18);
                if (GameData.isInArray(v, colorArray1)) {
                    oneSpeciality.textColor = TextFieldConst.COLOR_BROWN;
                }
                else if (GameData.isInArray(v, colorArray2)) {
                    oneSpeciality.textColor = 0xe16a32;
                }
                else {
                    oneSpeciality.textColor = TextFieldConst.COLOR_WARN_YELLOW2;
                }
                oneSpeciality.x = diamond.x + diamond.width + 5;
                oneSpeciality.y = diamond.y + 5 - oneSpeciality.height / 2;
                oneNode.addChild(oneSpeciality);
            }
        }
        this._lookPromationText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
        this._lookPromationText.width = desFontBg3.width;
        this._lookPromationText.textAlign = egret.HorizontalAlign.CENTER;
        var lineStr = LanguageManager.getlocal("weapon_line_text");
        this._lookPromationText.textFlow = new Array({ text: lineStr, style: { "underline": true } });
        this._lookPromationText.setPosition(0, posY + cellheght * 2 + 20);
        this._lookPromationText.addTouchTap(this.clickLookPromation, this, []);
        this._container.addChild(this._lookPromationText);
        var line2 = BaseBitmap.create("public_line1");
        line2.setPosition(line1.x, this._lookPromationText.y + this._lookPromationText.height + 12);
        this._container.addChild(line2);
        var flower3 = BaseBitmap.create("servant_fl");
        flower3.x = 6;
        flower3.y = line2.y + 16;
        this._container.addChild(flower3);
        var popName3 = ComponentManager.getTextField(LanguageManager.getlocal("weapon_pop_name3"), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x3f1f10);
        popName3.setPosition(popName1.x, flower3.y - 2);
        this._container.addChild(popName3);
        var popeDesc3 = ComponentManager.getTextField(LanguageManager.getlocal("weapon_pop_desc3", [String(this._weaponCfg.getMaxSoulLv())]), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x775108);
        popeDesc3.width = 485;
        popeDesc3.lineSpacing = 6;
        popeDesc3.setPosition(popName3.x, popName3.y + popName3.height + 8);
        this._container.addChild(popeDesc3);
        desFontBg3.height = popeDesc3.y + popeDesc3.height + 20 - desFontBg3.y;
        var descTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("weapon_storyTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTipTxt.x = (this.viewBg.width - descTipTxt.width);
        descTipTxt.y = this.viewBg.y + this.viewBg.height - 12;
        this.addChildToContainer(descTipTxt);
        if (this.param.data.showAttr) {
            scrollView.setScrollTop(850);
        }
    };
    WeaponAttrDetailsPopupView.prototype.clickLookPromation = function (evt) {
        ViewController.getInstance().openView(ViewConst.POPUP.WEAPONPROMATIONLISTPOPUPVIEW, this._weaponVo.id);
    };
    WeaponAttrDetailsPopupView.prototype.getShowHeight = function () {
        return 880;
    };
    WeaponAttrDetailsPopupView.prototype.isShowOpenAni = function () {
        return false;
    };
    WeaponAttrDetailsPopupView.prototype.dispose = function () {
        this._weaponId = null;
        this._container = null;
        this._scrollview = null;
        this._lookPromationText = null;
        _super.prototype.dispose.call(this);
    };
    return WeaponAttrDetailsPopupView;
}(PopupView));
//# sourceMappingURL=WeaponAttrDetailsPopupView.js.map