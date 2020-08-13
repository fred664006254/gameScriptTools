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
 * 门客详情 资质信息部分
 * author jiangliuyang
 *
 * @class ServantWifeBookItem
 */
var ServantWifeBookItem = (function (_super) {
    __extends(ServantWifeBookItem, _super);
    function ServantWifeBookItem() {
        var _this = _super.call(this) || this;
        _this._servantId = null;
        _this._bookNameTxtList = [];
        _this._servantInfoObj = null;
        _this._isPractice = false;
        _this._mainTaskHandKey = null;
        return _this;
    }
    ServantWifeBookItem.prototype.init = function (servantId, bottomH, isPractice) {
        if (isPractice === void 0) { isPractice = false; }
        this._servantId = servantId;
        //下部信息
        var ability = [];
        var servantCfg = GameConfig.config.servantCfg[this._servantId];
        ability = servantCfg.ability;
        var lineNum = Math.ceil(ability.length / 2);
        var starNumTxt = null;
        var titleTxt = null;
        titleTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        titleTxt.name = "titleTxt";
        titleTxt.x = 160;
        titleTxt.y = 78;
        this.addChild(titleTxt);
        var posX = 10;
        var posY = 0;
        var totalStar = 0;
        var totalBookV = 0;
        //需支持滑动，属性数量并不固定
        var proNode = new BaseDisplayObjectContainer();
        this.addChild(proNode);
        proNode.y = 0;
        // 找第一个未满级的书
        var firstFlag = false;
        var firstPosX = 0;
        var firstPosY = 0;
        var firstIndex2 = -1;
        var firstAttrBg = null;
        for (var index2 = 0; index2 < ability.length; index2++) {
            var aid = ability[index2];
            if (index2 % 2 == 1) {
                posX = GameConfig.stageWidth / 2 + 2;
            }
            else {
                posX = 21;
            }
            // let probg = "public_listbg";
            // let probg = "public_9v_bg04";
            var probg = "servant_wifebookbg";
            var attrbg = BaseBitmap.create(probg);
            attrbg.width = 297;
            // attrbg.height = 127;
            attrbg.height = 120;
            attrbg.x = posX;
            attrbg.y = posY;
            proNode.addChild(attrbg);
            var leftBg = BaseBitmap.create("public_left");
            leftBg.width = 119;
            leftBg.height = 108;
            leftBg.x = attrbg.x + 5;
            leftBg.y = attrbg.y + 6;
            proNode.addChild(leftBg);
            var tmpAcfg = undefined;
            var aLv = 1;
            tmpAcfg = GameConfig.config.abilityCfg[aid];
            var attrIcon = BaseBitmap.create("servant_infoPro" + tmpAcfg.type);
            attrIcon.x = posX + 15;
            attrIcon.y = posY + attrbg.height / 2 - attrIcon.height / 2; //-10;
            proNode.addChild(attrIcon);
            var attrColor = TextFieldConst.COLOR_LIGHT_YELLOW;
            if (this._isPractice == false) {
                attrColor = TextFieldConst.COLOR_BLACK;
                var starImg = this.getStars(tmpAcfg.num);
                starImg.x = attrIcon.x + attrIcon.width / 2 - starImg.width / 2 + 140;
                starImg.y = attrIcon.y + 105 - 40;
                proNode.addChild(starImg);
                //书名字
                var attrNameTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
                attrNameTxt.text = LanguageManager.getlocal("servant_attrNameTxt" + aid) + "Lv" + String(aLv);
                attrNameTxt.x = attrIcon.x + 47 + 70 - 15;
                attrNameTxt.y = posY + 13;
                attrNameTxt.width = 175;
                // if(PlatformManager.checkIsViSp()||PlatformManager.checkIsViSp())
                // {
                attrNameTxt.size = 18;
                // }
                attrNameTxt.textAlign = TextFieldConst.ALIGH_CENTER;
                proNode.addChild(attrNameTxt);
                this._bookNameTxtList.push(attrNameTxt);
            }
            var attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_attrTxt" + tmpAcfg.type), 18, TextFieldConst.COLOR_BROWN);
            attrTxt.x = attrIcon.x + 130;
            if (PlatformManager.checkIsViSp()) {
                attrTxt.x = attrIcon.x + 130 - 3;
            }
            attrTxt.y = attrbg.y + attrbg.height / 2 - attrTxt.height / 2 - 40;
            if (this._isPractice == false) {
                attrTxt.y = posY + 50;
            }
            proNode.addChild(attrTxt);
            var attrValueTxt = ComponentManager.getTextField((aLv * tmpAcfg.num).toString(), 18, TextFieldConst.COLOR_BROWN);
            attrValueTxt.x = attrTxt.x + attrTxt.width + 15;
            attrValueTxt.y = attrTxt.y;
            proNode.addChild(attrValueTxt);
            this._bookNameTxtList.push(attrValueTxt);
            totalStar += tmpAcfg.num;
            if (index2 % 2 == 1) {
                // posY += 132;
                posY += 125;
            }
            totalBookV += aLv * tmpAcfg.num;
            if (starNumTxt) {
                starNumTxt.text = totalStar.toString();
            }
        }
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomH);
        var scrolView = ComponentManager.getScrollView(proNode, rect);
        scrolView.y = 0;
        this.addChild(scrolView);
    };
    ServantWifeBookItem.prototype.getStars = function (num) {
        var objContainer = new BaseDisplayObjectContainer;
        for (var index = 1; index <= num; index++) {
            var starImg = BaseBitmap.create("servant_star");
            starImg.setScale(0.6);
            starImg.x = (index - 1) * starImg.width * 0.6;
            starImg.y = 0;
            objContainer.addChild(starImg);
        }
        return objContainer;
    };
    ServantWifeBookItem.prototype.dispose = function () {
        this._bookNameTxtList = [];
        this._servantInfoObj = null;
        this._isPractice = false;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        _super.prototype.dispose.call(this);
    };
    return ServantWifeBookItem;
}(BaseDisplayObjectContainer));
__reflect(ServantWifeBookItem.prototype, "ServantWifeBookItem");
