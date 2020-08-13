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
 * author yanyuling
 * date 2017/11/23
 * @class ServantInfoBookItems
 */
var ServantInfoBookItems = (function (_super) {
    __extends(ServantInfoBookItems, _super);
    function ServantInfoBookItems() {
        var _this = _super.call(this) || this;
        _this._servantId = null;
        _this._bookNameTxtList = [];
        _this._servantInfoObj = null;
        _this._redPList = [];
        _this._isPractice = false;
        _this._mainTaskHandKey = null;
        return _this;
    }
    ServantInfoBookItems.prototype.init = function (servantId, bottomH, isPractice) {
        if (isPractice === void 0) { isPractice = false; }
        if (isPractice) {
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UNLOCK), this.practiceLevelupCallBackHandler, this);
            // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_INDEX),this.checkRedPoints,this);
            App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED, this.checkRedPoints, this);
        }
        else {
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY), this.refreshBookLevelup, this);
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_CHANGE), this.checkRedPoints, this);
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UPGRADE), this.practiceLevelupCallBackHandler, this);
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_UPSKILLABILITY), this.refreshBookLevelup, this);
        }
        this._isPractice = isPractice;
        this._servantId = servantId;
        var servantCfg = GameConfig.config.servantCfg[this._servantId];
        // proNode.y = this._bottomBg.y+ 100;
        //下部信息
        var ability = [];
        if (this._isPractice == false) {
            this._servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
            var attrVo = this._servantInfoObj.attrVo;
            ability = this._servantInfoObj.getAbilityIdList();
        }
        else {
            ability = this.getcfgWhenPractice();
        }
        var lineNum = Math.ceil(ability.length / 2);
        var starNumTxt = null;
        var titleTxt = null;
        titleTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        titleTxt.name = "titleTxt";
        titleTxt.x = 160; //40;
        titleTxt.y = 90; //100;
        this.addChild(titleTxt);
        if (this._isPractice) {
            var line1 = BaseBitmap.create("public_line3");
            line1.width = 460;
            line1.x = GameConfig.stageWidth / 2 - line1.width / 2;
            line1.y = 75;
            this.addChild(line1);
            titleTxt.textColor = TextFieldConst.COLOR_BROWN;
            titleTxt.y = 75;
        }
        if (this._isPractice == false) {
            var titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_title2"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
            titleTxt2.x = 360; //GameConfig.stageWidth/2 -15;
            titleTxt2.y = 90; //titleTxt.y ;
            this.addChild(titleTxt2);
            var starImg = BaseBitmap.create("servant_star");
            starImg.width = 30;
            starImg.height = 28;
            starImg.x = titleTxt2.x + titleTxt2.width + 10;
            starImg.y = titleTxt2.y + titleTxt2.height / 2 - starImg.height / 2 - 3;
            this.addChild(starImg);
            starNumTxt = ComponentManager.getTextField("100", titleTxt.size, titleTxt.textColor);
            starNumTxt.x = starImg.x + starImg.width + 2;
            starNumTxt.y = titleTxt2.y;
            this.addChild(starNumTxt);
        }
        else {
            titleTxt.y = 80;
            if (this._isPractice) {
                titleTxt.y = 75;
            }
            titleTxt.x = GameConfig.stageWidth / 2;
        }
        var posX = 25;
        var posY = 0;
        var totalStar = 0;
        var totalBookV = 0;
        //需支持滑动，属性数量并不固定
        var proNode = new BaseDisplayObjectContainer();
        this.addChild(proNode);
        proNode.y = 10;
        // 找第一个未满级的书
        var firstFlag = false;
        var firstPosX = 0;
        var firstPosY = 0;
        var firstIndex2 = -1;
        var firstAttrBg = null;
        for (var index2 = 0; index2 < ability.length; index2++) {
            if (index2 == 0) {
                App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
            }
            var aid = ability[index2];
            if (index2 % 2 == 1) {
                posX = GameConfig.stageWidth / 2 + 4;
            }
            else {
                posX = 23;
            }
            var probg = "public_9_managebg";
            if (this._isPractice) {
                probg = "public_9_bg44";
            }
            var attrbg = BaseBitmap.create(probg);
            attrbg.width = 280;
            attrbg.height = 71; //100;
            attrbg.x = posX + 10;
            attrbg.y = posY;
            proNode.addChild(attrbg);
            var tmpAcfg = undefined;
            var aLv = 0;
            if (this._isPractice == false) {
                tmpAcfg = GameConfig.config.abilityCfg[aid];
                var tmpability = servantCfg.ability;
                var oriidx = tmpability.indexOf(aid);
                if (oriidx > -1) {
                    aLv = this._servantInfoObj.ability[String(oriidx)];
                }
                else {
                    aLv = this._servantInfoObj.getSkinBookLv2(aid);
                }
                var curClvCfg = Config.ServantBaseCfg.getServantLvList()[String(this._servantInfoObj.clv)];
                if (aLv < curClvCfg.abilityLv && !firstFlag) {
                    firstFlag = true;
                    //第一个未满级
                    firstPosX = posX;
                    firstPosY = posY;
                    firstIndex2 = index2;
                    firstAttrBg = attrbg;
                }
            }
            else {
                tmpAcfg = ability[index2];
                aLv = 1;
            }
            attrbg.addTouchTap(this.showBookLvup, this, [{ aid: aid, servantId: this._servantId, aLv: aLv, index: index2, firstBook: (firstIndex2 === index2) }]);
            var attrIcon = BaseBitmap.create("servant_infoPro" + tmpAcfg.type);
            attrIcon.x = posX - 3; //+15;
            attrIcon.y = posY + attrbg.height / 2 - attrIcon.height / 2;
            proNode.addChild(attrIcon);
            var attrColor = TextFieldConst.COLOR_LIGHT_YELLOW;
            if (this._isPractice == false) {
                attrColor = TextFieldConst.COLOR_BLACK;
                var starImg = this.getStars(tmpAcfg.num);
                starImg.x = attrIcon.x + attrIcon.width / 2 - starImg.width / 2;
                starImg.y = attrIcon.y + 65;
                proNode.addChild(starImg);
                var attrNameTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BLACK);
                attrNameTxt.text = LanguageManager.getlocal("servant_attrNameTxt" + aid) + "Lv" + String(aLv);
                attrNameTxt.x = attrIcon.x + 77;
                attrNameTxt.y = posY + 10; //25;
                proNode.addChild(attrNameTxt);
                this._bookNameTxtList.push(attrNameTxt);
            }
            var attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_attrTxt" + tmpAcfg.type), 18, attrColor);
            attrTxt.x = attrIcon.x + 90;
            attrTxt.y = attrbg.y + attrbg.height / 2 - attrTxt.height / 2;
            if (this._isPractice == false) {
                attrTxt.y = posY + 40;
            }
            proNode.addChild(attrTxt);
            var attrValueTxt = ComponentManager.getTextField((aLv * tmpAcfg.num).toString(), 18, attrColor);
            attrValueTxt.x = attrTxt.x + attrTxt.width + 5;
            attrValueTxt.y = attrTxt.y;
            proNode.addChild(attrValueTxt);
            this._bookNameTxtList.push(attrValueTxt);
            totalStar += tmpAcfg.num;
            if (index2 % 2 == 1) {
                posY += 92;
            }
            totalBookV += aLv * tmpAcfg.num;
            // if (this._isPractice == false)
            {
                var redP = BaseBitmap.create("public_dot2");
                redP.x = attrbg.x + attrbg.width - 15;
                redP.y = attrbg.y - 5;
                redP.name = "redP" + index2;
                proNode.addChild(redP);
                this._redPList.push(redP);
            }
        }
        if (firstFlag) {
            this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(proNode, firstPosX + 50, firstPosY + 50, [firstAttrBg], 204, true, function () {
                if (this._servantId === Api.servantVoApi.getIdOfTotalMax()) {
                    return true;
                }
                else {
                    return false;
                }
            }, this);
        }
        titleTxt.text = LanguageManager.getlocal("servantInfo_title", [totalBookV.toString()]);
        if (this._isPractice) {
            titleTxt.anchorOffsetX = titleTxt.width / 2;
        }
        if (starNumTxt) {
            starNumTxt.text = totalStar.toString();
        }
        var tmpY = 110;
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomH - tmpY - 10);
        var scrolView = ComponentManager.getScrollView(proNode, rect);
        scrolView.y = tmpY;
        this.addChild(scrolView);
        this.checkRedPoints();
    };
    ServantInfoBookItems.prototype.checkRedPoints = function () {
        var idxList = undefined;
        if (this._isPractice) {
            idxList = Api.practiceVoApi.practiceAttrRedList();
        }
        else {
            idxList = this._servantInfoObj.isBookLvUpEnable();
        }
        for (var index = 0; index < this._redPList.length; index++) {
            var isSHow = false;
            if (this._isPractice) {
                isSHow = idxList[String(index + 1)];
            }
            else {
                isSHow = idxList[String(index)] != null;
            }
            if (Api.servantExileVoApi.getServantExileInfoForServantId(this._servantId)) {
                isSHow = false;
            }
            this._redPList[index].visible = isSHow;
        }
    };
    ServantInfoBookItems.prototype.getStars = function (num) {
        var objContainer = new BaseDisplayObjectContainer;
        for (var index = 1; index <= num; index++) {
            var starImg = BaseBitmap.create("servant_star");
            starImg.width = 30;
            starImg.height = 28;
            starImg.setScale(0.5);
            starImg.x = (index - 1) * starImg.width * 0.5;
            starImg.y = 0;
            objContainer.addChild(starImg);
        }
        return objContainer;
    };
    ServantInfoBookItems.prototype.showBookLvup = function (param1, params) {
        if (this._isPractice) {
            var type = params["index"];
            ViewController.getInstance().openView(ViewConst.COMMON.PRACTICEABILITYVIEW, { type: type });
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.SERVANTBOOKLEVELUPPOPUPVIEW, params);
        }
    };
    ServantInfoBookItems.prototype.doGuide = function () {
        // this.showBookLvup(this,[{aid:"201",servantId:this._servantId,aLv:1,index:0}])
        ViewController.getInstance().openView(ViewConst.POPUP.SERVANTBOOKLEVELUPPOPUPVIEW, { aid: "201", servantId: this._servantId, aLv: 1, index: 0 });
    };
    ServantInfoBookItems.prototype.getcfgWhenPractice = function () {
        var attrV = Api.practiceVoApi.geAbilityValues();
        var ability = [{ type: 1, num: attrV[0] }, { type: 2, num: attrV[1] }, { type: 3, num: attrV[2] }, { type: 4, num: attrV[3] }];
        return ability;
    };
    /**
 * 资质升级后刷新
 */
    ServantInfoBookItems.prototype.refreshBookLevelup = function () {
        var ability = undefined;
        var servantCfg = GameConfig.config.servantCfg[this._servantId];
        if (this._isPractice) {
            ability = this.getcfgWhenPractice();
        }
        else {
            ability = this._servantInfoObj.getAbilityIdList();
        }
        var totalBookV = 0;
        for (var index2 = 0; index2 < ability.length; index2++) {
            var tmpAcfg = undefined;
            var aLv = 0;
            var aid = ability[index2];
            if (this._isPractice == false) {
                tmpAcfg = GameConfig.config.abilityCfg[aid];
                var tmpability = servantCfg.ability;
                var oriidx = tmpability.indexOf(aid);
                if (oriidx > -1) {
                    aLv = this._servantInfoObj.ability[String(oriidx)];
                }
                else {
                    aLv = this._servantInfoObj.getSkinBookLv2(aid);
                }
            }
            else {
                tmpAcfg = ability[index2];
                aLv = 1;
            }
            var txtIdx = index2;
            var attrValueTxt = this._bookNameTxtList[txtIdx];
            if (this._isPractice == false) {
                txtIdx = index2 * 2;
                var attrNameTxt = this._bookNameTxtList[txtIdx];
                attrValueTxt = this._bookNameTxtList[txtIdx + 1];
                attrNameTxt.text = LanguageManager.getlocal("servant_attrNameTxt" + aid) + "Lv" + String(aLv);
            }
            // let attrValueTxt = this._bookNameTxtList[txtIdx+1];
            attrValueTxt.text = String(aLv * tmpAcfg.num);
            totalBookV += aLv * tmpAcfg.num;
        }
        var titleTxt = this.getChildByName("titleTxt");
        titleTxt.text = LanguageManager.getlocal("servantInfo_title", [totalBookV.toString()]);
        if (this._isPractice) {
            titleTxt.anchorOffsetX = titleTxt.width / 2;
        }
        else {
            this.checkRedPoints();
        }
    };
    ServantInfoBookItems.prototype.practiceLevelupCallBackHandler = function (event) {
        var rdata = event.data.data;
        if (rdata.ret == 0 && this._isPractice) {
            this.refreshBookLevelup();
            this.checkRedPoints();
        }
    };
    ServantInfoBookItems.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY), this.refreshBookLevelup, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_CHANGE), this.checkRedPoints, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UPGRADE), this.practiceLevelupCallBackHandler, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UNLOCK), this.practiceLevelupCallBackHandler, this);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_INDEX),this.checkRedPoints,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED, this.checkRedPoints, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_UPSKILLABILITY), this.refreshBookLevelup, this);
        this._bookNameTxtList = [];
        this._servantInfoObj = null;
        this._redPList = null;
        this._isPractice = false;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        _super.prototype.dispose.call(this);
    };
    return ServantInfoBookItems;
}(BaseDisplayObjectContainer));
__reflect(ServantInfoBookItems.prototype, "ServantInfoBookItems");
//# sourceMappingURL=ServantInfoBookItems.js.map