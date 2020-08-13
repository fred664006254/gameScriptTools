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
var ServantAttrDetailPopupView = (function (_super) {
    __extends(ServantAttrDetailPopupView, _super);
    function ServantAttrDetailPopupView() {
        var _this = _super.call(this) || this;
        _this._servantId = null;
        _this._servantInfoObj = null;
        return _this;
    }
    ServantAttrDetailPopupView.prototype.initView = function () {
        this._servantId = this.param.data;
        var servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
        this._servantInfoObj = servantInfoObj;
        var itemBg = BaseBitmap.create("public_9_bg4");
        itemBg.width = 528;
        itemBg.height = 510;
        itemBg.setPosition(this.viewBg.width / 2 - itemBg.width / 2, 10);
        this.addChildToContainer(itemBg);
        var titleBg = BaseBitmap.create("public_9_cell_title");
        titleBg.width = itemBg.width - 4;
        titleBg.height = 34;
        titleBg.x = itemBg.x + 2;
        titleBg.y = itemBg.y + 2;
        this.addChildToContainer(titleBg);
        var line = BaseBitmap.create("public_line3");
        line.width = 500;
        line.setPosition(this.viewBg.width / 2 - line.width / 2, titleBg.y + 8);
        this.addChildToContainer(line);
        var totalProTxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_attrComplex") + servantInfoObj.total, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
        totalProTxt.setPosition(10, titleBg.y + 6);
        totalProTxt.width = this.viewBg.width - 20;
        totalProTxt.textAlign = egret.HorizontalAlign.CENTER;
        this.addChildToContainer(totalProTxt);
        var attrNode = new BaseDisplayObjectContainer();
        this.addChildToContainer(attrNode);
        var Rect = new egret.Rectangle(0, 0, 510, 465);
        var scrollView = ComponentManager.getScrollView(attrNode, Rect);
        scrollView.x = itemBg.x;
        scrollView.y = itemBg.y + 34;
        this.addChildToContainer(scrollView);
        var auraOpen = Api.switchVoApi.checkOpenServantSkinAura();
        var attrCfg = [
            {
                txt1: LanguageManager.getlocal("playerview_force") + servantInfoObj.attrVo.forceTotal,
                txt1Color: TextFieldConst.COLOR_WARN_YELLOW,
                txt2: LanguageManager.getlocal("servantAttr_add1") + servantInfoObj.attrVo.forceAdd_1,
                txt2Color: TextFieldConst.COLOR_BLACK,
                txt3: LanguageManager.getlocal("servantAttr_add2") + servantInfoObj.attrVo.forceAdd_2,
                txt4: LanguageManager.getlocal("servantAttr_add3") + servantInfoObj.attrVo.forceAdd_3,
                txt5: LanguageManager.getlocal("servantAttr_add4") + servantInfoObj.attrVo.forceAdd_4,
                txt6: LanguageManager.getlocal("servantAttr_add5") + servantInfoObj.attrVo.forceAdd_5,
                txt7: LanguageManager.getlocal("servantAttr_add6") + servantInfoObj.attrVo.forceAdd_6,
                txt8: LanguageManager.getlocal("servantAttr_add7") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.forceAdd_7),
                txt9: LanguageManager.getlocal("servantAttr_add8") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.forceAdd_8),
                txt10: LanguageManager.getlocal("servantAttr_add9") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.forceAdd_9),
            },
            {
                txt1: LanguageManager.getlocal("playerview_inte") + servantInfoObj.attrVo.brainsTotal,
                txt1Color: TextFieldConst.COLOR_WARN_YELLOW,
                txt2: LanguageManager.getlocal("servantAttr_add1") + servantInfoObj.attrVo.brainsAdd_1,
                txt2Color: TextFieldConst.COLOR_BLACK,
                txt3: LanguageManager.getlocal("servantAttr_add2") + servantInfoObj.attrVo.brainsAdd_2,
                txt4: LanguageManager.getlocal("servantAttr_add3") + servantInfoObj.attrVo.brainsAdd_3,
                txt5: LanguageManager.getlocal("servantAttr_add4") + servantInfoObj.attrVo.brainsAdd_4,
                txt6: LanguageManager.getlocal("servantAttr_add5") + servantInfoObj.attrVo.brainsAdd_5,
                txt7: LanguageManager.getlocal("servantAttr_add6") + servantInfoObj.attrVo.brainsAdd_6,
                txt8: LanguageManager.getlocal("servantAttr_add7") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.brainsAdd_7),
                txt9: LanguageManager.getlocal("servantAttr_add8") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.brainsAdd_8),
                txt10: LanguageManager.getlocal("servantAttr_add9") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.brainsAdd_9),
            },
            {
                txt1: LanguageManager.getlocal("playerview_policy") + servantInfoObj.attrVo.politicsTotal,
                txt1Color: TextFieldConst.COLOR_WARN_YELLOW,
                txt2: LanguageManager.getlocal("servantAttr_add1") + servantInfoObj.attrVo.politicsAdd_1,
                txt2Color: TextFieldConst.COLOR_BLACK,
                txt3: LanguageManager.getlocal("servantAttr_add2") + servantInfoObj.attrVo.politicsAdd_2,
                txt4: LanguageManager.getlocal("servantAttr_add3") + servantInfoObj.attrVo.politicsAdd_3,
                txt5: LanguageManager.getlocal("servantAttr_add4") + servantInfoObj.attrVo.politicsAdd_4,
                txt6: LanguageManager.getlocal("servantAttr_add5") + servantInfoObj.attrVo.politicsAdd_5,
                txt7: LanguageManager.getlocal("servantAttr_add6") + servantInfoObj.attrVo.politicsAdd_6,
                txt8: LanguageManager.getlocal("servantAttr_add7") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.politicsAdd_7),
                txt9: LanguageManager.getlocal("servantAttr_add8") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.politicsAdd_8),
                txt10: LanguageManager.getlocal("servantAttr_add9") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.politicsAdd_9),
            },
            {
                txt1: LanguageManager.getlocal("playerview_charm") + servantInfoObj.attrVo.charmTotal,
                txt1Color: TextFieldConst.COLOR_WARN_YELLOW,
                txt2: LanguageManager.getlocal("servantAttr_add1") + servantInfoObj.attrVo.charmAdd_1,
                txt2Color: TextFieldConst.COLOR_BLACK,
                txt3: LanguageManager.getlocal("servantAttr_add2") + servantInfoObj.attrVo.charmAdd_2,
                txt4: LanguageManager.getlocal("servantAttr_add3") + servantInfoObj.attrVo.charmAdd_3,
                txt5: LanguageManager.getlocal("servantAttr_add4") + servantInfoObj.attrVo.charmAdd_4,
                txt6: LanguageManager.getlocal("servantAttr_add5") + servantInfoObj.attrVo.charmAdd_5,
                txt7: LanguageManager.getlocal("servantAttr_add6") + servantInfoObj.attrVo.charmAdd_6,
                txt8: LanguageManager.getlocal("servantAttr_add7") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.charmAdd_7),
                txt9: LanguageManager.getlocal("servantAttr_add8") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.charmAdd_8),
                txt10: LanguageManager.getlocal("servantAttr_add9") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.charmAdd_9),
            },
        ];
        var attrPoxY = 12;
        for (var index = 0; index < attrCfg.length; index++) {
            var element = attrCfg[index];
            var len = 10;
            var idx = 0;
            for (var i = 1; i <= len; ++i) {
                if (i == 7 && !auraOpen) {
                    continue;
                }
                if (i == 8 && !Api.switchVoApi.checkOpenQingYuanHuiJuan()) {
                    continue;
                }
                if (i == 9 && !Api.switchVoApi.checkWeaponFunction()) {
                    continue;
                }
                if (i == 10 && !Api.switchVoApi.checkServantFame()) {
                    continue;
                }
                idx++;
                var attrTxt = ComponentManager.getTextField(element["txt" + i], TextFieldConst.FONTSIZE_CONTENT_SMALL);
                if (i == 1) {
                    attrTxt.textColor = element.txt1Color;
                    attrTxt.x = 39;
                    attrTxt.y = attrPoxY;
                }
                else {
                    attrTxt.textColor = element.txt2Color;
                    attrTxt.x = idx % 2 == 0 ? 39 : 289;
                    attrTxt.y = attrPoxY + (Math.floor(idx / 2) * 27);
                }
                attrNode.addChild(attrTxt);
            }
            if (index < 3) {
                var lineImg = BaseBitmap.create("public_line1");
                lineImg.width = 475;
                lineImg.x = 30;
                lineImg.y = attrPoxY + ((Math.floor(idx / 2) + 1) * 27);
                attrNode.addChild(lineImg);
            }
            attrPoxY += (((Math.floor(idx / 2) + 1) * 27) + 8);
        }
        var bg = BaseBitmap.create("public_alphabg");
        bg.width = attrNode.width;
        bg.height = attrNode.height;
        attrNode.addChild(bg);
        var itemBg2 = BaseBitmap.create("public_9_bg4");
        itemBg2.width = 528;
        itemBg2.height = 190;
        itemBg2.setPosition(this.viewBg.width / 2 - itemBg2.width / 2, itemBg.y + itemBg.height + 6);
        this.addChildToContainer(itemBg2);
        var titleBg2 = BaseBitmap.create("public_9_cell_title");
        titleBg2.width = itemBg2.width - 4;
        titleBg2.height = 34;
        titleBg2.x = itemBg2.x + 2;
        titleBg2.y = itemBg2.y + 2;
        this.addChildToContainer(titleBg2);
        var line2 = BaseBitmap.create("public_line3");
        line2.width = 400;
        line2.setPosition(this.viewBg.width / 2 - line2.width / 2, titleBg2.y + 8);
        this.addChildToContainer(line2);
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_storyTxt"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
        descTxt.setPosition(10, titleBg2.y + 6);
        descTxt.width = this.viewBg.width - 20;
        descTxt.textAlign = egret.HorizontalAlign.CENTER;
        this.addChildToContainer(descTxt);
        var descTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("servant_story" + this._servantId), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        descTxt2.multiline = true;
        descTxt2.lineSpacing = 5;
        descTxt2.width = this.viewBg.width - 60 - GameData.popupviewOffsetX * 2;
        var txtNode = new BaseDisplayObjectContainer();
        descTxt2.y = 8;
        txtNode.height = descTxt2.height + 15;
        txtNode.addChild(descTxt2);
        var sRect = new egret.Rectangle(0, 0, this.viewBg.width - 60, 140);
        var scrollV = ComponentManager.getScrollView(txtNode, sRect);
        // scrollV.x =itemBg2.x+10;
        scrollV.x = itemBg2.x + itemBg2.width / 2 - scrollV.width / 2;
        scrollV.y = itemBg2.y + 38;
        this.addChildToContainer(scrollV);
        descTxt2.x = scrollV.x;
        var descbg = BaseBitmap.create("public_searchdescbg");
        descbg.width = 540;
        descbg.height = 46;
        descbg.setPosition(this.viewBg.width / 2 - itemBg2.width / 2, itemBg2.y + itemBg2.height + 24);
        this.addChildToContainer(descbg);
        var descTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_storyTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTipTxt.x = this.viewBg.width / 2 - descTipTxt.width / 2;
        descTipTxt.y = descbg.y + descbg.height / 2 - descTipTxt.height / 2;
        this.addChildToContainer(descTipTxt);
    };
    ServantAttrDetailPopupView.prototype.getShowHeight = function () {
        return 790;
    };
    ServantAttrDetailPopupView.prototype.dispose = function () {
        this._servantId = null;
        _super.prototype.dispose.call(this);
    };
    return ServantAttrDetailPopupView;
}(PopupView));
__reflect(ServantAttrDetailPopupView.prototype, "ServantAttrDetailPopupView");
//# sourceMappingURL=ServantAttrDetailPopupView.js.map