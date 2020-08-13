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
 *  门客布阵item
 * author qianjun
 */
var EmperorWarBuzhenItem = (function (_super) {
    __extends(EmperorWarBuzhenItem, _super);
    function EmperorWarBuzhenItem() {
        var _this = _super.call(this) || this;
        _this._empty_g = null;
        _this._info_g = null;
        _this._cardbg = null;
        _this._servantImg = null;
        _this._addText = null;
        _this._delBtn = null;
        _this._nameText = null;
        _this._mainatrText = null;
        _this._zzhitext = null;
        _this._sxingtext = null;
        _this._mainAtr = '';
        _this._alvImg = null;
        _this._itemIndex = 0;
        _this._addIcon = null;
        return _this;
    }
    EmperorWarBuzhenItem.prototype.initItem = function (index, data) {
        var view = this;
        view.cacheAsBitmap = true;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_EMPWEAR_BUZHEN_CHANGE, this.checkBuzhen, this);
        view._data = data;
        view._itemIndex = index;
        view.width = 622;
        view.height = 159;
        var bg = BaseBitmap.create("empmanbg");
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bg, view);
        view.addChild(bg);
        //属性
        var sxing = BaseBitmap.create("emp" + data.image);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, sxing, bg, [7, -2]);
        view.addChild(sxing);
        //门客信息
        view._curServantId = data.servantID;
        var servantInfoObj = data.empty ? null : Api.servantVoApi.getServantObj(data.servantID);
        var servantQuality = '';
        var servantPic = '';
        var addIcon = BaseBitmap.create("childview_addicon");
        view._addIcon = addIcon;
        if (data.empty) {
            servantQuality = "servant_cardbg_0";
            // servantPic = `childview_addicon`;
            addIcon.visible = true;
        }
        else {
            servantQuality = servantInfoObj.qualityBoxImgPath;
            servantPic = servantInfoObj.halfImgPath;
            addIcon.visible = false;
        }
        var cardbg = BaseLoadBitmap.create(servantQuality);
        cardbg.width = 194;
        cardbg.height = 192;
        cardbg.setScale(0.67);
        cardbg.addTouchTap(view.servantTouch, view);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, cardbg, view, [sxing.x + sxing.width + 30, 0]);
        view.addChild(cardbg);
        view._cardbg = cardbg;
        view._servantImg = BaseLoadBitmap.create(servantPic);
        view._servantImg.width = 180;
        view._servantImg.height = 177;
        view._servantImg.setScale(0.67);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._servantImg, cardbg);
        view._servantImg.addTouchTap(view.servantTouch, view);
        view.addChild(view._servantImg);
        view._servantImg.visible = !addIcon.visible;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, addIcon, cardbg);
        view.addChild(addIcon);
        view._empty_g = new BaseDisplayObjectContainer();
        view._empty_g.width = view.width;
        view._empty_g.height = view.height;
        view.addChild(view._empty_g);
        view._info_g = new BaseDisplayObjectContainer();
        view._info_g.width = view.width;
        view._info_g.height = view.height;
        view.addChild(view._info_g);
        var addText = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarBuzhenAdd"), 22, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, addText, view);
        addText.visible = false;
        view._empty_g.addChild(addText);
        view._addText = addText;
        var nameTxt = ComponentManager.getTextField('', 22, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.lefttop, nameTxt, cardbg, [cardbg.width * 0.67 + 20, 10]);
        view._info_g.addChild(nameTxt);
        view._nameText = nameTxt;
        var sxbg = BaseBitmap.create("public_9_managebg");
        sxbg.height = 80;
        sxbg.width = 230;
        if (PlatformManager.checkIsThSp()) {
            sxbg.width = 300;
        }
        view.setLayoutPosition(LayoutConst.lefttop, sxbg, nameTxt, [-3, 22 + 5]);
        view._info_g.addChild(sxbg);
        var mainsxText = ComponentManager.getTextField('', 20, 0x3e9b00);
        view.setLayoutPosition(LayoutConst.lefttop, mainsxText, sxbg, [10, 5]);
        view._mainatrText = mainsxText;
        view._info_g.addChild(mainsxText);
        var zzhitext = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.lefttop, zzhitext, mainsxText, [0, 20 + 5]);
        view._info_g.addChild(zzhitext);
        view._zzhitext = zzhitext;
        var sxingtext = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.lefttop, sxingtext, zzhitext, [0, 20 + 5]);
        view._info_g.addChild(sxingtext);
        view._sxingtext = sxingtext;
        //爵位
        var alvImg = BaseLoadBitmap.create("");
        alvImg.width = 91;
        alvImg.height = 81;
        view.setLayoutPosition(LayoutConst.rightverticalCenter, alvImg, view, [20, 0]);
        view._info_g.addChild(alvImg);
        view._alvImg = alvImg;
        var delbtn = ComponentManager.getButton("button_del1", "", view.clearServant, view);
        view.setLayoutPosition(LayoutConst.righttop, delbtn, cardbg, [-20, -10]);
        view._info_g.addChild(delbtn);
        view._delBtn = delbtn;
        if (!data.empty) {
            view._empty_g.visible = false;
            view._info_g.visible = true;
            view.fresh_servant({ id: data.servantID });
        }
        else {
            view._empty_g.visible = true;
            view._info_g.visible = false;
        }
    };
    Object.defineProperty(EmperorWarBuzhenItem.prototype, "api", {
        get: function () {
            return Api.emperorwarVoApi;
        },
        enumerable: true,
        configurable: true
    });
    EmperorWarBuzhenItem.prototype.fresh_servant = function (params) {
        var view = this;
        view._addIcon.visible = false;
        view._servantImg.visible = true;
        var data = view._data;
        var servantId = params.id;
        view._curServantId = servantId;
        var servantInfoObj = Api.servantVoApi.getServantObj(servantId);
        //品质 头像 名称
        view._cardbg.setload("" + servantInfoObj.qualityBoxImgPath);
        view._servantImg.setload("" + servantInfoObj.halfImgPath);
        view._info_g.visible = true;
        view._empty_g.visible = false;
        view._nameText.text = servantInfoObj.servantName;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._servantImg, view._cardbg);
        //主属性 1 武力 2 智力 3政治 4魅力
        var mainAtr = '';
        var attr = '';
        switch (data.type) {
            case 1:
                mainAtr = App.StringUtil.changeIntToText(servantInfoObj.attrVo.forceTotal);
                attr = "emperorWarBuzhen_forceAtt";
                break;
            case 2:
                mainAtr = App.StringUtil.changeIntToText(servantInfoObj.attrVo.brainsTotal);
                attr = "emperorWarBuzhen_inteAtt";
                break;
            case 4:
                mainAtr = App.StringUtil.changeIntToText(servantInfoObj.attrVo.charmTotal);
                attr = "emperorWarBuzhen_charmAtt";
                break;
            case 3:
                mainAtr = App.StringUtil.changeIntToText(servantInfoObj.attrVo.politicsTotal);
                attr = "emperorWarBuzhen_policyAtt";
                break;
        }
        view._mainatrText.text = LanguageManager.getlocal(attr, [mainAtr]);
        view._mainAtr = mainAtr;
        var totalV = String(servantInfoObj.getTotalBookValue(data.type));
        view._zzhitext.text = LanguageManager.getlocal("emperorWarBuzhenZzhi", [totalV]);
        view._sxingtext.text = LanguageManager.getlocal("emperorWarBuzhenSx", [mainAtr.toString()]);
        //爵位
        if (servantInfoObj.clv > 0) {
            view._alvImg.setload("servant_alv_" + servantInfoObj.clv);
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_EMPWEAR_BUZHEN_CHANGE, { itemIndex: view._itemIndex, servantId: servantId });
    };
    //下阵
    EmperorWarBuzhenItem.prototype.clearServant = function () {
        var view = this;
        view._addIcon.visible = true;
        view._servantImg.visible = false;
        view._cardbg.setload("servant_cardbg_0");
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._servantImg, view._cardbg);
        view._info_g.visible = false;
        view._empty_g.visible = true;
        view._curServantId = null;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_EMPWEAR_BUZHEN_CHANGE);
    };
    Object.defineProperty(EmperorWarBuzhenItem.prototype, "curServantId", {
        get: function () {
            return this._curServantId;
        },
        enumerable: true,
        configurable: true
    });
    EmperorWarBuzhenItem.prototype.servantTouch = function () {
        var view = this;
        var data = view._data;
        var allServantInfo = {};
        var allKey = Api.servantVoApi.getServantInfoIdListByProperty(data.type);
        var showTab = [];
        for (var k in allKey) {
            var key = allKey[k];
            var mainAtr = 0;
            var attr = '';
            var servantInfoObj = Api.servantVoApi.getServantObj(key);
            var weaponAdd = 0;
            var weaponvo = Api.weaponVoApi.getWeaponInfoVoByServantId(key);
            if (weaponvo) {
                weaponAdd = weaponvo.getSpecialityByType(4);
            }
            switch (data.type) {
                case 1:
                    mainAtr = servantInfoObj.attrVo.forceTotal + weaponAdd; //App.StringUtil.changeIntToText(servantInfoObj.attrVo.forceTotal);
                    attr = "playerview_forceAtt";
                    break;
                case 2:
                    mainAtr = servantInfoObj.attrVo.brainsTotal + weaponAdd; //App.StringUtil.changeIntToText(servantInfoObj.attrVo.brainsTotal);
                    attr = "playerview_inteAtt";
                    break;
                case 4:
                    mainAtr = servantInfoObj.attrVo.charmTotal + weaponAdd; //App.StringUtil.changeIntToText(servantInfoObj.attrVo.charmTotal);
                    attr = "playerview_charmAtt";
                    break;
                case 3:
                    mainAtr = servantInfoObj.attrVo.politicsTotal + weaponAdd; //App.StringUtil.changeIntToText(servantInfoObj.attrVo.politicsTotal);
                    attr = "playerview_policyAtt";
                    break;
            }
            showTab.push({
                'servantId': key,
                'text': LanguageManager.getlocal(attr) + App.StringUtil.changeIntToText(mainAtr),
                'inBuzhen': view.api.haveInBuzhen(key),
                'value': mainAtr
            });
        }
        showTab.sort(function (a, b) {
            if (a.inBuzhen && b.inBuzhen) {
                return b.value - a.value;
            }
            else if (a.inBuzhen) {
                return 1;
            }
            else if (b.inBuzhen) {
                return -1;
            }
            else {
                return b.value - a.value;
            }
        });
        ViewController.getInstance().openView(ViewConst.POPUP.SERVANTSELECTEDPOPUPVIEW, { type: ServantSelectedPopupView.TYPE_EMPWAR, "info": showTab, callback: this.fresh_servant, handler: this });
    };
    EmperorWarBuzhenItem.prototype.checkBuzhen = function (event) {
        var data = event.data;
        var view = this;
        if (!data) {
            return;
        }
        if (view._itemIndex == data.itemIndex) {
            return;
        }
        if (view._curServantId == data.servantId) {
            view.clearServant();
        }
    };
    EmperorWarBuzhenItem.prototype.getSpaceX = function () {
        return 10;
    };
    /**
     * 不同格子Y间距
     */
    EmperorWarBuzhenItem.prototype.getSpaceY = function () {
        return 5;
    };
    EmperorWarBuzhenItem.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_EMPWEAR_BUZHEN_CHANGE, this.checkBuzhen, this);
        view.cacheAsBitmap = false;
        view._servantImg.removeTouchTap();
        view._cardbg.removeTouchTap();
        view._empty_g.dispose();
        view._info_g.dispose();
        view._empty_g = null;
        view._info_g = null;
        BaseLoadBitmap.release(view._cardbg);
        view._cardbg = null;
        BaseLoadBitmap.release(view._servantImg);
        view._servantImg = null;
        view._addText = null;
        view._delBtn = null;
        view._nameText = null;
        view._mainatrText = null;
        view._zzhitext = null;
        view._sxingtext = null;
        view._data = null;
        BaseLoadBitmap.release(view._alvImg);
        view._alvImg = null;
        view._addIcon = null;
        _super.prototype.dispose.call(this);
    };
    return EmperorWarBuzhenItem;
}(ScrollListItem));
__reflect(EmperorWarBuzhenItem.prototype, "EmperorWarBuzhenItem");
//# sourceMappingURL=EmperorWarBuzhenItem.js.map