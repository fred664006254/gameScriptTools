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
 * 门客属性详情
 * author yanyuling
 * date 2017/9/27
 * @class ServantAttrDetailPopupView
 */
var ServantAttrDetailsPopupView = (function (_super) {
    __extends(ServantAttrDetailsPopupView, _super);
    function ServantAttrDetailsPopupView() {
        var _this = _super.call(this) || this;
        _this._servantId = null;
        _this._servantInfoObj = null;
        _this._container = null;
        _this._rect2 = null;
        return _this;
    }
    ServantAttrDetailsPopupView.prototype.getCloseBtnName = function () {
        return "sharepopupview_closebtn";
    };
    ServantAttrDetailsPopupView.prototype.getBgName = function () {
        return "servant_detailsbg";
    };
    ServantAttrDetailsPopupView.prototype.getTitleStr = function () {
        return null;
    };
    ServantAttrDetailsPopupView.prototype.initView = function () {
        // this.resetBgSize();
    };
    ServantAttrDetailsPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "servant_detailsbg",
            "servant_peoplebg",
            "servant_namebg2",
            "servant_fl",
            "servant_detailstitles",
            "servant_detailsline",
            "servant_detailsfontbg",
            "servant_detailsfont",
            "sharepopupview_closebtn"
        ]);
    };
    ServantAttrDetailsPopupView.prototype.resetBgSize = function () {
        this.viewBg.height = 830;
        this.viewBg.x = (this.width - this.viewBg.width) * 0.5;
        this.viewBg.y = 100; // (this.height-this.viewBg.height)*0.5;
        if (GameConfig.stageHeigth > 960) {
            this.viewBg.y = (GameConfig.stageHeigth - this.viewBg.height + 60) * 0.5;
        }
        this._container = new BaseDisplayObjectContainer();
        this._container.setPosition(0, this.viewBg.y + 45);
        this.addChild(this._container);
        this.closeBtn.x = this.closeBtn.x - 20;
        this.closeBtn.y = this.viewBg.y - 30;
        // this.viewBg.y = this.viewBg.y+20
        this._servantId = this.param.data;
        var servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
        this._servantInfoObj = servantInfoObj;
        var itemBg = BaseBitmap.create("servant_peoplebg");
        itemBg.width = 520;
        itemBg.height = 251;
        this._container.addChild(itemBg);
        //翅膀
        var titlefont2 = BaseBitmap.create("servant_detailstitles");
        this.addChildToContainer(titlefont2);
        var titlefont = BaseBitmap.create("servant_detailsfont");
        titlefont.x = (this.width - titlefont.width) * 0.5;
        titlefont.y = this.viewBg.y - titlefont.height + 40;
        this.addChildToContainer(titlefont);
        titlefont2.width = 520;
        titlefont2.x = 60;
        titlefont2.y = titlefont.y + 5;
        var boneName = "servant_full_" + this._servantId;
        var wear = Api.servantVoApi.getservantSkinIdInWear(this._servantId);
        if (wear && wear != "") {
            boneName = "skin_full_" + wear;
        }
        var servant = BaseLoadBitmap.create(boneName);
        servant.setScale(0.55);
        servant.x = 10;
        this._container.addChild(servant);
        var rect2 = new egret.Shape();
        rect2.graphics.beginFill(0x0000ff);
        rect2.graphics.drawRect(4, 0, 240, itemBg.height - 2);
        rect2.graphics.endFill();
        this._rect2 = rect2;
        this._rect2.visible = false;
        this._container.addChild(rect2);
        servant.mask = this._rect2;
        //人物名称
        var penameTxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_name" + this._servantId), 26, 0x3f1f10);
        penameTxt.y = 20;
        this._container.addChild(penameTxt);
        var flimg = BaseBitmap.create("servant_fl");
        flimg.x = 250;
        flimg.y = penameTxt.y + 5;
        this._container.addChild(flimg);
        penameTxt.x = flimg.x + flimg.width + 10;
        var flimg2 = BaseBitmap.create("servant_fl");
        flimg2.x = penameTxt.x + penameTxt.width + 10;
        flimg2.y = flimg.y;
        this._container.addChild(flimg2);
        //人物详情
        var peDesTxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_" + this._servantId + "_pdes"), 20, 0x3f1f10);
        peDesTxt.x = 250;
        peDesTxt.y = 60;
        peDesTxt.width = 260;
        peDesTxt.lineSpacing = 5;
        peDesTxt.height = 185;
        this._container.addChild(peDesTxt);
        //线条
        for (var i = 0; i < 6; i++) {
            var lineBit = BaseBitmap.create("servant_detailsline");
            lineBit.x = peDesTxt.x;
            lineBit.y = 82 + i * 25;
            this._container.addChild(lineBit);
        }
        var desFontBg = BaseBitmap.create("servant_detailsfontbg");
        desFontBg.width = 520;
        desFontBg.y = itemBg.y + itemBg.height + 25;
        this._container.addChild(desFontBg);
        var desFontBg2 = BaseBitmap.create("servant_detailsfontbg");
        desFontBg2.width = 520;
        this._container.addChild(desFontBg2);
        //背景故事
        var namebg2 = BaseBitmap.create("servant_namebg2");
        namebg2.y = desFontBg.y - 8 - 5;
        namebg2.width = 236;
        namebg2.x = (desFontBg.width - namebg2.width) * 0.5;
        this._container.addChild(namebg2);
        var fontTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("servantpopdesfont1"), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0x943e0d);
        fontTxt1.x = namebg2.x + (namebg2.width - fontTxt1.width) * 0.5;
        fontTxt1.y = 1 + namebg2.y + (namebg2.height - fontTxt1.height) * 0.5;
        this._container.addChild(fontTxt1);
        var descTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("servant_newstory" + this._servantId), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x775108);
        descTxt2.multiline = true;
        descTxt2.lineSpacing = 5;
        descTxt2.width = desFontBg.width - 20;
        descTxt2.x = desFontBg.x + 10;
        descTxt2.y = namebg2.y + namebg2.height + 10;
        this._container.addChild(descTxt2);
        desFontBg.height = descTxt2.height + 45;
        //综合属性 
        desFontBg2.y = desFontBg.y + desFontBg.height + 25;
        var namebg3 = BaseBitmap.create("servant_namebg2");
        namebg3.y = desFontBg2.y - 8 - 5;
        namebg3.width = 236;
        namebg3.x = (desFontBg.width - namebg3.width) * 0.5;
        this._container.addChild(namebg3);
        var fontTxt2 = ComponentManager.getTextField((LanguageManager.getlocal("servant_attrComplex") + servantInfoObj.total), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0x943e0d);
        fontTxt2.x = namebg3.x + (namebg3.width - fontTxt2.width) * 0.5;
        fontTxt2.y = 1 + namebg3.y + (namebg3.height - fontTxt2.height) * 0.5;
        this._container.addChild(fontTxt2);
        if (fontTxt2.width > namebg3.width - 20) {
            namebg3.width = fontTxt2.width + 50;
            namebg3.x = (desFontBg.width - namebg3.width) * 0.5;
            fontTxt2.x = namebg3.x + (namebg3.width - fontTxt2.width) * 0.5;
        }
        var auraOpen = Api.switchVoApi.checkOpenServantSkinAura();
        var attrCfg = [
            {
                txt1: LanguageManager.getlocal("playerview_force") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.forceTotal),
                txt1Color: 0x3f1f10,
                txt2: LanguageManager.getlocal("servantAttr_add1") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.forceAdd_1),
                txt2Color: 0x775108,
                txt3: LanguageManager.getlocal("servantAttr_add2") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.forceAdd_2),
                txt4: LanguageManager.getlocal("servantAttr_add3") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.forceAdd_3),
                txt5: LanguageManager.getlocal("servantAttr_add4") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.forceAdd_4),
                txt6: LanguageManager.getlocal("servantAttr_add5") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.forceAdd_5),
                txt7: LanguageManager.getlocal("servantAttr_add6") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.forceAdd_6),
                txt8: LanguageManager.getlocal("servantAttr_add7") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.forceAdd_7),
                txt9: LanguageManager.getlocal("servantAttr_add8") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.forceAdd_8),
                txt10: LanguageManager.getlocal("servantAttr_add9") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.forceAdd_9),
            },
            {
                txt1: LanguageManager.getlocal("playerview_inte") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.brainsTotal),
                txt1Color: 0x3f1f10,
                txt2: LanguageManager.getlocal("servantAttr_add1") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.brainsAdd_1),
                txt2Color: 0x775108,
                txt3: LanguageManager.getlocal("servantAttr_add2") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.brainsAdd_2),
                txt4: LanguageManager.getlocal("servantAttr_add3") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.brainsAdd_3),
                txt5: LanguageManager.getlocal("servantAttr_add4") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.brainsAdd_4),
                txt6: LanguageManager.getlocal("servantAttr_add5") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.brainsAdd_5),
                txt7: LanguageManager.getlocal("servantAttr_add6") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.brainsAdd_6),
                txt8: LanguageManager.getlocal("servantAttr_add7") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.brainsAdd_7),
                txt9: LanguageManager.getlocal("servantAttr_add8") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.brainsAdd_8),
                txt10: LanguageManager.getlocal("servantAttr_add9") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.brainsAdd_9),
            },
            {
                txt1: LanguageManager.getlocal("playerview_policy") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.politicsTotal),
                txt1Color: 0x3f1f10,
                txt2: LanguageManager.getlocal("servantAttr_add1") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.politicsAdd_1),
                txt2Color: 0x775108,
                txt3: LanguageManager.getlocal("servantAttr_add2") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.politicsAdd_2),
                txt4: LanguageManager.getlocal("servantAttr_add3") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.politicsAdd_3),
                txt5: LanguageManager.getlocal("servantAttr_add4") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.politicsAdd_4),
                txt6: LanguageManager.getlocal("servantAttr_add5") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.politicsAdd_5),
                txt7: LanguageManager.getlocal("servantAttr_add6") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.politicsAdd_6),
                txt8: LanguageManager.getlocal("servantAttr_add7") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.politicsAdd_7),
                txt9: LanguageManager.getlocal("servantAttr_add8") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.politicsAdd_8),
                txt10: LanguageManager.getlocal("servantAttr_add9") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.politicsAdd_9),
            },
            {
                txt1: LanguageManager.getlocal("playerview_charm") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.charmTotal),
                txt1Color: 0x3f1f10,
                txt2: LanguageManager.getlocal("servantAttr_add1") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.charmAdd_1),
                txt2Color: 0x775108,
                txt3: LanguageManager.getlocal("servantAttr_add2") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.charmAdd_2),
                txt4: LanguageManager.getlocal("servantAttr_add3") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.charmAdd_3),
                txt5: LanguageManager.getlocal("servantAttr_add4") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.charmAdd_4),
                txt6: LanguageManager.getlocal("servantAttr_add5") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.charmAdd_5),
                txt7: LanguageManager.getlocal("servantAttr_add6") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.charmAdd_6),
                txt8: LanguageManager.getlocal("servantAttr_add7") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.charmAdd_7),
                txt9: LanguageManager.getlocal("servantAttr_add8") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.charmAdd_8),
                txt10: LanguageManager.getlocal("servantAttr_add9") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.charmAdd_9),
            },
        ];
        var weaponvo = Api.weaponVoApi.getWeaponInfoVoByServantId(this._servantId);
        var attrPoxY = namebg3.y + namebg3.height + 10;
        for (var index = 0; index < attrCfg.length; index++) {
            var element = attrCfg[index];
            var len = 10;
            var lenArray = [];
            for (var i_1 = 1; i_1 <= len; ++i_1) {
                if (i_1 == 7 && !auraOpen) {
                    continue;
                }
                if (i_1 == 8 && !Api.switchVoApi.checkOpenQingYuanHuiJuan()) {
                    continue;
                }
                //门客神器加成暂无
                if (i_1 == 9 && !Api.switchVoApi.checkWeaponFunction()) {
                    continue;
                }
                if (i_1 == 10 && !Api.switchVoApi.checkServantFame()) {
                    continue;
                }
                lenArray.push(i_1);
            }
            // if (weaponvo)
            // {
            //     lenArray.push({txt11:LanguageManager.getlocal("servantAttr_add10") +  App.StringUtil.changeIntToText(weaponvo.attr[index])});
            // }
            for (var i_2 = 0; i_2 < lenArray.length; ++i_2) {
                // if(i == 7 && !auraOpen){
                //     continue;
                // }
                // if(i == 8 && !Api.switchVoApi.checkOpenQingYuanHuiJuan()){
                //     continue;
                // }
                // //门客神器加成暂无
                // if(i == 9 && !weaponvo){
                //     continue;
                // }
                // if(i == 10 && !Api.switchVoApi.checkServantFame()){
                //     continue;
                // }
                var posI = i_2 + 1;
                var contentI = lenArray[i_2];
                var attrTxt = ComponentManager.getTextField(element["txt" + contentI], TextFieldConst.FONTSIZE_CONTENT_SMALL);
                if (posI == 1) {
                    attrTxt.textColor = element.txt1Color;
                    attrTxt.x = 40;
                    attrTxt.size = 22;
                    attrTxt.y = attrPoxY;
                }
                else {
                    attrTxt.textColor = element.txt2Color;
                    attrTxt.x = posI % 2 == 0 ? 40 : 310;
                    attrTxt.y = attrPoxY + (Math.floor(posI / 2) * 27);
                }
                this._container.addChild(attrTxt);
            }
            if (index <= 3) {
                var moveY = 0;
                if (index < 3) {
                    var lineImg = BaseBitmap.create("public_line1");
                    lineImg.x = 30;
                    lineImg.y = attrPoxY + ((Math.floor((len - 2) / 2) + 2) * 27);
                    this._container.addChild(lineImg);
                    //标题花
                    var flb = BaseBitmap.create("servant_fl");
                    flb.x = lineImg.x = 20;
                    flb.y = attrPoxY; //lineImg.y- 108;
                    this._container.addChild(flb);
                    moveY = flb.y;
                }
                else {
                    var flb = BaseBitmap.create("servant_fl");
                    flb.x = 20;
                    flb.y = attrPoxY; //+300;
                    this._container.addChild(flb);
                }
            }
            attrPoxY += (((Math.floor(len / 2) + 1) * 27) + 18);
        }
        desFontBg2.height = attrPoxY + 20 - fontTxt2.y;
        this._container.y = 0;
        var eheight = 715;
        var sRect = new egret.Rectangle(0, 0, 520, eheight);
        var scrollV = ComponentManager.getScrollView(this._container, sRect);
        scrollV.x = 60;
        scrollV.y = this.viewBg.y + 40;
        scrollV.horizontalScrollPolicy = "off";
        this.addChildToContainer(scrollV);
        var descTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_storyTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTipTxt.x = (this.viewBg.width - descTipTxt.width);
        descTipTxt.y = this.viewBg.y + this.viewBg.height - 12;
        this.addChildToContainer(descTipTxt);
    };
    ServantAttrDetailsPopupView.prototype.isShowOpenAni = function () {
        return false;
    };
    ServantAttrDetailsPopupView.prototype.dispose = function () {
        this._servantId = null;
        this._container = null;
        _super.prototype.dispose.call(this);
    };
    return ServantAttrDetailsPopupView;
}(PopupView));
__reflect(ServantAttrDetailsPopupView.prototype, "ServantAttrDetailsPopupView");
//# sourceMappingURL=ServantAttrDetailsPopupView.js.map