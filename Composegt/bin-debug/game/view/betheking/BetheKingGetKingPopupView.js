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
var BetheKingGetKingPopupView = (function (_super) {
    __extends(BetheKingGetKingPopupView, _super);
    function BetheKingGetKingPopupView() {
        var _this = _super.call(this) || this;
        _this._isExAnable = false;
        return _this;
    }
    BetheKingGetKingPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_KINGS_CONVERT, this.exchangeCallBackHandler, this);
        this._aid = this.param.data.aid;
        this._code = this.param.data.code;
        this._acVo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        var rankBg = BaseLoadBitmap.create("betheking_getking_bg");
        rankBg.width = 537;
        rankBg.height = 514;
        rankBg.setPosition(39, 10);
        this.addChildToContainer(rankBg);
        var bg02 = BaseBitmap.create("public_tc_bg02");
        bg02.x = this.viewBg.width / 2 - bg02.width / 2;
        bg02.y = rankBg.y + rankBg.height + 10;
        this.addChildToContainer(bg02);
        this._cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        var servantExchange = this._cfg.servantExchange["1"];
        var servantID = servantExchange.servantID;
        //综合资质
        var forpeople_qualifications = BaseBitmap.create("forpeople_qualifications");
        this.addChildToContainer(forpeople_qualifications);
        forpeople_qualifications.x = bg02.x + 30;
        forpeople_qualifications.y = bg02.y + bg02.height / 2 - forpeople_qualifications.height / 2;
        //综合资质数字
        var starNum = Api.servantVoApi.getServantStarsNumWithId(servantID);
        var numLb = ComponentManager.getBitmapText(starNum + "", "recharge_fnt");
        this.addChildToContainer(numLb);
        numLb.x = forpeople_qualifications.x + 130;
        numLb.y = bg02.y + bg02.height / 2 - numLb.height / 2;
        var sercfg = Config.ServantCfg.getServantItemById(servantID);
        if (sercfg.wifeId) {
            //综合资质
            var forpeople_qualifications2 = BaseBitmap.create("forpeople_qualifications2");
            this.addChildToContainer(forpeople_qualifications2);
            forpeople_qualifications2.x = numLb.x + numLb.width + 40;
            forpeople_qualifications2.y = forpeople_qualifications.y;
            //综合资质数字	
            var starNum2 = Config.WifeCfg.getWifeCfgById(sercfg.wifeId).glamour; //  Api.servantVoApi.getServantStarsNumWithId(data.getServant);
            var numLb2 = ComponentManager.getBitmapText(starNum2 + "", "recharge_fnt");
            this.addChildToContainer(numLb2);
            numLb2.x = forpeople_qualifications2.x + 130;
            numLb2.y = numLb.y;
        }
        var innerBg = BaseBitmap.create("public_tc_bg01");
        innerBg.width = 360;
        innerBg.height = 120;
        innerBg.x = rankBg.x + 20;
        innerBg.y = bg02.y + bg02.height + 10;
        this.addChildToContainer(innerBg);
        var forpeople_bottom = BaseBitmap.create("forpeople_bottom");
        this.addChildToContainer(forpeople_bottom);
        forpeople_bottom.x = innerBg.x + innerBg.width + 20;
        ;
        forpeople_bottom.y = innerBg.y + 20;
        ;
        //道具图片
        var needItem = servantExchange.needItem;
        var iconTab = needItem.split("_");
        var itemBitmap = BaseLoadBitmap.create("itemicon" + iconTab[1]);
        itemBitmap.x = forpeople_bottom.x + forpeople_bottom.width / 2 - 40;
        itemBitmap.y = forpeople_bottom.y + forpeople_bottom.height / 2 - 50;
        itemBitmap.addTouchTap(this.exchangeHandler, this);
        this.addChildToContainer(itemBitmap);
        //名字底图
        var bottomName = BaseBitmap.create("fourpeople_bottom");
        bottomName.x = itemBitmap.x;
        bottomName.y = itemBitmap.y + 70;
        this.addChildToContainer(bottomName);
        //道具数量
        var itemNumberText = ComponentManager.getTextField("1", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this._itemNumberText = itemNumberText;
        itemNumberText.x = bottomName.x + bottomName.width / 2;
        itemNumberText.y = bottomName.y + bottomName.height / 2 - itemNumberText.height / 2;
        this.addChildToContainer(itemNumberText);
        this.refreshNums();
        var tipTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.text = LanguageManager.getlocal("acFourPeoplea_light");
        tipTxt.x = innerBg.x + innerBg.width / 2 - tipTxt.width / 2;
        tipTxt.y = innerBg.y + 20;
        this.addChildToContainer(tipTxt);
        var line = BaseBitmap.create("public_huawen_bg");
        this.addChild(line);
        line.x = innerBg.x + innerBg.width / 2 - line.width / 2;
        line.y = tipTxt.y + 25;
        this.addChildToContainer(line);
        //武力描述
        var forceText = ComponentManager.getTextField("", 18);
        var aura1 = sercfg.aura["1"];
        var message = LanguageManager.getlocal("servant_fourPeopleaura" + aura1.auraIcon);
        var attStr = "";
        if (aura1.att.length == 4) {
            attStr = LanguageManager.getlocal("wifeSkillAllAttAdd");
        }
        else {
            for (var index1 = 0; index1 < aura1.att.length; index1++) {
                var element = aura1.att[index1];
                if (index1 == 0) {
                    attStr = LanguageManager.getlocal("servantInfo_speciality" + element);
                }
                else {
                    attStr = attStr + "、" + LanguageManager.getlocal("servantInfo_speciality" + element);
                }
            }
            attStr = attStr + LanguageManager.getlocal("wifeSkillAttAdd");
        }
        if (aura1.growAtt < 1) {
            attStr = attStr + (aura1.growAtt * 100) + "%";
        }
        else {
            attStr = attStr + (aura1.growAtt).toString();
        }
        forceText.text = message + ": " + App.StringUtil.formatStringColor(LanguageManager.getlocal("betheKing_perlv") + attStr, TextFieldConst.COLOR_WARN_GREEN2);
        if (PlatformManager.checkIsTextHorizontal()) {
            forceText.x = innerBg.x + 12;
            forceText.y = innerBg.y + 60;
            forceText.width = innerBg.width - 24;
        }
        else {
            forceText.x = innerBg.x + 30;
            forceText.y = innerBg.y + 60;
            forceText.width = innerBg.width;
        }
        this.addChildToContainer(forceText);
        //属性描述
        var forceText2 = ComponentManager.getTextField("", 18);
        var aura2 = sercfg.aura["2"];
        var message2 = LanguageManager.getlocal("servant_fourPeopleaura" + aura2.auraIcon);
        var attStr2 = "";
        if (aura2.att.length == 4) {
            attStr2 = LanguageManager.getlocal("wifeSkillAllAttAdd");
        }
        else {
            for (var index1 = 0; index1 < aura2.att.length; index1++) {
                var element = aura2.att[index1];
                if (index1 == 0) {
                    attStr2 = LanguageManager.getlocal("servantInfo_speciality" + element);
                }
                else {
                    attStr2 = attStr2 + "、" + LanguageManager.getlocal("servantInfo_speciality" + element);
                }
            }
            attStr2 = attStr2 + LanguageManager.getlocal("wifeSkillAttAdd");
        }
        if (aura2.growAtt < 1) {
            attStr2 = attStr2 + (aura2.growAtt * 100) + "%";
        }
        else {
            attStr2 = attStr2 + (aura2.growAtt).toString();
        }
        forceText2.text = message2 + ": " + App.StringUtil.formatStringColor(LanguageManager.getlocal("betheKing_perlv") + attStr2, TextFieldConst.COLOR_WARN_GREEN2);
        if (PlatformManager.checkIsTextHorizontal()) {
            forceText2.x = innerBg.x + 12;
            forceText2.y = forceText.y + forceText.height + 3;
            forceText2.width = innerBg.width - 24;
            innerBg.height = forceText2.y + forceText2.height - innerBg.y + 12;
        }
        else {
            forceText2.x = innerBg.x + 30;
            forceText2.y = innerBg.y + 90;
            forceText2.width = innerBg.width;
        }
        this.addChildToContainer(forceText2);
    };
    BetheKingGetKingPopupView.prototype.refreshNums = function () {
        var servantExchange = this._cfg.servantExchange["1"];
        var needItem = servantExchange.needItem;
        var iconTab = needItem.split("_");
        var needN = Number(iconTab[2]);
        var owdn = Api.itemVoApi.getItemNumInfoVoById(iconTab[1]);
        if (owdn >= needN) {
            this._isExAnable = true;
            this._itemNumberText.textColor = TextFieldConst.COLOR_WARN_GREEN2;
        }
        else {
            this._isExAnable = false;
            this._itemNumberText.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        }
        this._itemNumberText.text = owdn + "/" + needN;
        this._itemNumberText.anchorOffsetX = this._itemNumberText.width / 2;
    };
    BetheKingGetKingPopupView.prototype.exchangeCallBackHandler = function (event) {
        var data = event.data;
        var ret = data.data.ret;
        if (ret == 0) {
            this.refreshNums();
            // this._tipTxt.text = LanguageManager.getlocal("betheking_my_popularity2",[""+this._acVo.cnum]);
            // NetManager.request(NetRequestConst.REQUEST_KINGS_KINGINFO,{activeId:this._acVo.aidAndCode});
        }
    };
    BetheKingGetKingPopupView.prototype.exchangeHandler = function () {
        var convStatus = this._acVo.getConvertStatus();
        if (convStatus == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("betheKing_convertTip1"));
            return;
        }
        var servantExchange = this._cfg.servantExchange["1"];
        var servantID = servantExchange.servantID;
        if (convStatus == 2) {
            App.CommonUtil.showTip(LanguageManager.getlocal("betheKing_convertTip2"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_KINGS_CONVERT, { activeId: this._acVo.aidAndCode, vertId: "1" });
    };
    BetheKingGetKingPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "forpeople_qualifications", "forpeople_qualifications2", "recharge_fnt", "fourpeople_bottom", "forpeople_bottom",
        ]);
    };
    BetheKingGetKingPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_KINGS_CONVERT, this.exchangeCallBackHandler, this);
        this._aid = null;
        this._code = null;
        this._acVo = null;
        this._tipTxt = null;
        this._isExAnable = false;
        this._itemNumberText = null;
        this._cfg = null;
        _super.prototype.dispose.call(this);
    };
    return BetheKingGetKingPopupView;
}(PopupView));
__reflect(BetheKingGetKingPopupView.prototype, "BetheKingGetKingPopupView");
