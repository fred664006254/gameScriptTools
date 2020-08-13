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
    /**生成新标头 */
    ServantAttrDetailPopupView.prototype.isHaveTitle = function () {
        return true;
    };
    ServantAttrDetailPopupView.prototype.initView = function () {
        this._servantId = this.param.data;
        var servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        this._servantInfoObj = servantInfoObj;
        var ofy = 51;
        var bg = BaseBitmap.create("public_9v_bg12");
        bg.width = 530;
        bg.height = 415;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 126 - ofy;
        this._nodeContainer.addChild(bg);
        // let topBg = BaseBitmap.create("public_tc_bg02");
        // topBg.width = 272;
        // topBg.x =  this.viewBg.x + this.viewBg.width/2 - topBg.width/2;
        // topBg.y = 65-ofy;
        // this._nodeContainer.addChild(topBg)
        var totalProTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW_NEW);
        totalProTxt.text = LanguageManager.getlocal("servant_attrComplex") + App.StringUtil.changeIntToText(servantInfoObj.total);
        totalProTxt.x = this.viewBg.width / 2 - totalProTxt.width / 2;
        totalProTxt.y = this.viewBg.y + 30;
        this._nodeContainer.addChild(totalProTxt);
        var attrCfg = [
            {
                txt1: LanguageManager.getlocal("playerview_force") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.forceTotal),
                txt1Color: TextFieldConst.COLOR_WARN_GREEN_NEW,
                txt2: LanguageManager.getlocal("servantAttr_add1") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.forceAdd_1),
                txt2Color: TextFieldConst.COLOR_BROWN_NEW,
                txt3: LanguageManager.getlocal("servantAttr_add2") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.forceAdd_2),
                txt4: LanguageManager.getlocal("servantAttr_add3") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.forceAdd_3),
                txt5: LanguageManager.getlocal("servantAttr_add4") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.forceAdd_4),
            },
            {
                txt1: LanguageManager.getlocal("playerview_inte") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.brainsTotal),
                txt1Color: TextFieldConst.COLOR_WARN_GREEN_NEW,
                txt2: LanguageManager.getlocal("servantAttr_add1") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.brainsAdd_1),
                txt2Color: TextFieldConst.COLOR_BROWN_NEW,
                txt3: LanguageManager.getlocal("servantAttr_add2") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.brainsAdd_2),
                txt4: LanguageManager.getlocal("servantAttr_add3") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.brainsAdd_3),
                txt5: LanguageManager.getlocal("servantAttr_add4") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.brainsAdd_4),
            },
            {
                txt1: LanguageManager.getlocal("playerview_policy") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.politicsTotal),
                txt1Color: TextFieldConst.COLOR_WARN_GREEN_NEW,
                txt2: LanguageManager.getlocal("servantAttr_add1") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.politicsAdd_1),
                txt2Color: TextFieldConst.COLOR_BROWN_NEW,
                txt3: LanguageManager.getlocal("servantAttr_add2") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.politicsAdd_2),
                txt4: LanguageManager.getlocal("servantAttr_add3") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.politicsAdd_3),
                txt5: LanguageManager.getlocal("servantAttr_add4") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.politicsAdd_4),
            },
            {
                txt1: LanguageManager.getlocal("playerview_charm") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.charmTotal),
                txt1Color: TextFieldConst.COLOR_WARN_GREEN_NEW,
                txt2: LanguageManager.getlocal("servantAttr_add1") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.charmAdd_1),
                txt2Color: TextFieldConst.COLOR_BROWN_NEW,
                txt3: LanguageManager.getlocal("servantAttr_add2") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.charmAdd_2),
                txt4: LanguageManager.getlocal("servantAttr_add3") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.charmAdd_3),
                txt5: LanguageManager.getlocal("servantAttr_add4") + App.StringUtil.changeIntToText(servantInfoObj.attrVo.charmAdd_4),
            },
        ];
        var attrPoxY = 135 - ofy;
        for (var index = 0; index < attrCfg.length; index++) {
            var lineImg = BaseBitmap.create("public_line4");
            lineImg.width = 500;
            // lineImg.height =90;
            lineImg.x = this.viewBg.width / 2 - lineImg.width / 2;
            lineImg.y = attrPoxY - 10;
            this._nodeContainer.addChild(lineImg);
            if (index == 0) {
                lineImg.visible = false;
            }
            var element = attrCfg[index];
            var attrTxt1 = ComponentManager.getTextField("", 20);
            attrTxt1.text = element.txt1;
            attrTxt1.textColor = element.txt1Color;
            attrTxt1.x = 100;
            attrTxt1.y = attrPoxY + 10;
            this._nodeContainer.addChild(attrTxt1);
            var attrTxt2 = ComponentManager.getTextField("", 18);
            attrTxt2.text = element.txt2;
            attrTxt2.textColor = element.txt2Color;
            attrTxt2.x = attrTxt1.x;
            attrTxt2.y = attrPoxY + 38;
            this._nodeContainer.addChild(attrTxt2);
            var attrTxt3 = ComponentManager.getTextField("", 18);
            attrTxt3.text = element.txt3;
            attrTxt3.textColor = element.txt2Color;
            attrTxt3.x = attrTxt2.x + 280;
            attrTxt3.y = attrTxt2.y;
            this._nodeContainer.addChild(attrTxt3);
            var attrTxt4 = ComponentManager.getTextField("", 18);
            attrTxt4.text = element.txt4;
            attrTxt4.textColor = element.txt2Color;
            attrTxt4.x = attrTxt1.x;
            attrTxt4.y = attrTxt2.y + 27;
            this._nodeContainer.addChild(attrTxt4);
            var attrTxt5 = ComponentManager.getTextField("", 18);
            attrTxt5.text = element.txt5;
            attrTxt5.textColor = element.txt2Color;
            attrTxt5.x = attrTxt3.x;
            attrTxt5.y = attrTxt4.y;
            this._nodeContainer.addChild(attrTxt5);
            attrPoxY += 100;
        }
        var bottomBg = BaseBitmap.create("public_9v_bg12");
        bottomBg.width = 530;
        bottomBg.height = 250;
        bottomBg.x = bg.x + bg.width / 2 - bottomBg.width / 2;
        bottomBg.y = attrPoxY + 10; //20;
        this._nodeContainer.addChild(bottomBg);
        // let public_v_huawen01 = BaseBitmap.create("public_v_huawen01"); 
        // public_v_huawen01.x =  bottomBg.x
        // public_v_huawen01.y =  bottomBg.y+10
        // this._nodeContainer.addChild(public_v_huawen01); 
        // let public_v_huawen02 = BaseBitmap.create("public_v_huawen01"); 
        // public_v_huawen02.x =  bottomBg.x+470;
        // public_v_huawen02.y =  bottomBg.y+10;
        // public_v_huawen02.scaleX =-1; 
        // this._nodeContainer.addChild(public_v_huawen02); 
        var descTxtBg = BaseBitmap.create("public_ts_bg01");
        this._nodeContainer.addChild(descTxtBg);
        //门客简介
        var descTxt = ComponentManager.getTextField("", 20);
        descTxt.text = LanguageManager.getlocal("servant_storyTxt");
        descTxt.textColor = TextFieldConst.COLOR_BROWN_NEW;
        descTxt.x = this.viewBg.width / 2 - descTxt.width / 2;
        descTxt.y = bottomBg.y + 30;
        this._nodeContainer.addChild(descTxt);
        descTxtBg.width = descTxt.width + 150;
        descTxtBg.x = descTxt.x + descTxt.width / 2 - descTxtBg.width / 2;
        descTxtBg.y = descTxt.y + descTxt.height / 2 - descTxtBg.height / 2;
        var descTxt2 = ComponentManager.getTextField("", 18);
        descTxt2.text = LanguageManager.getlocal("servant_story" + this._servantId);
        descTxt2.multiline = true;
        descTxt2.lineSpacing = 5;
        descTxt2.width = bottomBg.width - 20;
        descTxt2.textColor = TextFieldConst.COLOR_BROWN_NEW;
        var txtNode = new BaseDisplayObjectContainer();
        descTxt2.y = 5;
        txtNode.height = descTxt2.height + 15;
        txtNode.addChild(descTxt2);
        var sRect = new egret.Rectangle(0, 0, bottomBg.width - 20, bottomBg.height - 85);
        var scrollV = ComponentManager.getScrollView(txtNode, sRect); // 522  111
        scrollV.x = bottomBg.x + 10;
        scrollV.y = bottomBg.y + 65;
        this._nodeContainer.addChild(scrollV);
        // let descTipTxt =  ComponentManager.getTextField("",18);
        // descTipTxt.text = LanguageManager.getlocal("servant_storyTip");
        // descTipTxt.x = this.viewBg.x + this.viewBg.width - descTipTxt.width-10 ;
        // descTipTxt.y =  bottomBg.y + bottomBg.height+ 45 ; 
        // this._nodeContainer.addChild( descTipTxt);
    };
    ServantAttrDetailPopupView.prototype.getShowHeight = function () {
        return 850;
    };
    ServantAttrDetailPopupView.prototype.dispose = function () {
        this._nodeContainer = null;
        this._servantId = null;
        _super.prototype.dispose.call(this);
    };
    return ServantAttrDetailPopupView;
}(PopupView));
__reflect(ServantAttrDetailPopupView.prototype, "ServantAttrDetailPopupView");
