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
//
var WifeSkillPopupViewTab1 = (function (_super) {
    __extends(WifeSkillPopupViewTab1, _super);
    function WifeSkillPopupViewTab1(param) {
        var _this = _super.call(this) || this;
        _this._index = 0;
        _this.param = param;
        _this.initView();
        return _this;
    }
    // protected getListType():number
    // {
    // 	return 1;
    // }
    WifeSkillPopupViewTab1.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_WIFE_SKILLUPD, this.doGive, this);
        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(WifeSkillPopupView.wifeId);
        var cfg = Config.WifeCfg.getWifeCfgById(WifeSkillPopupView.wifeId);
        var serCfg = Config.ServantCfg.getServantItemById(cfg.servantId);
        // public_listbg3
        var topBg = BaseBitmap.create("public_listbg3");
        topBg.width = 530;
        topBg.height = 130;
        topBg.x = GameConfig.stageWidth / 2 - topBg.width / 2 - 5; //51;//GameConfig.stageWidth/2 - topBg.width/2;
        topBg.y = 70;
        this.addChild(topBg);
        // let cor1 = BaseBitmap.create("public_tcdw_bg01");
        // cor1.skewX = 180;
        // cor1.x = topBg.x;
        // cor1.y = topBg.y + topBg.height;
        // this.addChild(cor1);
        // let cor2 = BaseBitmap.create("public_tcdw_bg02");
        // cor2.x = topBg.x + topBg.width-cor2.width;
        // cor2.y = topBg.y;
        // this.addChild(cor2);
        var serBg = serCfg.qualityBoxImgPath;
        if (Api.servantVoApi.getServantObj(cfg.servantId)) {
            var serVo = Api.servantVoApi.getServantObj(cfg.servantId);
            serBg = serVo.qualityBoxImgPath;
        }
        var temW = 108;
        var iconBgBt = BaseLoadBitmap.create(serBg);
        iconBgBt.x = topBg.x + 15;
        iconBgBt.y = topBg.y + 12;
        this.addChild(iconBgBt);
        iconBgBt.scaleX = temW / 194;
        iconBgBt.scaleY = temW / 192;
        var obj = Api.servantVoApi.getServantObj(cfg.servantId);
        var halfIcon = obj ? obj.halfImgPath : serCfg.halfIcon;
        var iconBt = BaseLoadBitmap.create(halfIcon);
        iconBt.x = iconBgBt.x + 1.5;
        iconBt.y = iconBgBt.y + 2;
        this.addChild(iconBt);
        iconBt.scaleX = (temW - 10) / 180;
        iconBt.scaleY = (temW - 10) / 177;
        var nameStr = LanguageManager.getlocal("wifeSkillServant", [serCfg.name]);
        var nameTF = ComponentManager.getTextField(nameStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        nameTF.x = iconBt.x + 130;
        nameTF.y = topBg.y + 25;
        this.addChild(nameTF);
        if (!Api.servantVoApi.getServantObj(cfg.servantId)) {
            var getTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeServantGet"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
            getTF.x = nameTF.x + nameTF.width + 5;
            getTF.y = nameTF.y;
            this.addChild(getTF);
            var maskBt = BaseBitmap.create("wifeview_mask");
            maskBt.x = iconBgBt.x;
            maskBt.y = iconBgBt.y;
            this.addChild(maskBt);
        }
        var expStr = LanguageManager.getlocal("wifeExp") + " " + App.StringUtil.changeIntToText(this._wifeInfoVo.exp);
        this._text1 = ComponentManager.getTextField(expStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        this._text1.x = nameTF.x;
        this._text1.y = nameTF.y + nameTF.height + 10;
        this.addChild(this._text1);
        var tipTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkilTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        tipTF.x = nameTF.x;
        tipTF.y = this._text1.y + this._text1.height + 10;
        this.addChild(tipTF);
        var list = this._wifeInfoVo.cfg.wifeSkill;
        var newList = [];
        if (PlatformManager.checkIsWxCfg()) {
            newList = list;
        }
        else {
            for (var i = 0; i < list.length; i++) {
                if (list[i].condition) {
                    newList.push(list[i]);
                }
            }
        }
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 530, 595);
        this._scrollList = ComponentManager.getScrollList(WifeSkillScrollItem, newList, rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(GameConfig.stageWidth / 2 - this._scrollList.width / 2 - 5, topBg.y + topBg.height + 5);
    };
    WifeSkillPopupViewTab1.prototype.doGive = function (event) {
        var data = event.data;
        this._index = data.index;
        this.request(NetRequestConst.REQUEST_WIFE_UPGRADESKILL, { wifeId: this.param.data.id.toString(), key: data.index });
    };
    //请求回调
    WifeSkillPopupViewTab1.prototype.receiveData = function (data) {
        if (data.data.cmd == NetRequestConst.REQUEST_WIFE_UPGRADESKILL) {
            if (data.data.data && data.data.data.rewards) {
                var rewards = GameData.formatRewardItem(data.data.data.rewards);
                if (rewards && rewards.length > 0) {
                    App.CommonUtil.playRewardFlyAction(rewards);
                }
            }
            var index = this._index;
            var wideItem = this._scrollList.getItemByIndex(index);
            wideItem.refreshData(index);
            var id = this.param.data.id;
            this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
            var expStr = LanguageManager.getlocal("wifeExp") + " " + this._wifeInfoVo.exp.toString();
            this._text1.text = expStr;
            // this._text2.text = this._wifeInfoVo.glamour.toString();
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeSkillUpdSuccess"));
        }
    };
    WifeSkillPopupViewTab1.prototype.dispose = function () {
        this._wifeInfoVo = null;
        this._text1 = null;
        this._scrollList = null;
        this._index = 0;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_WIFE_SKILLUPD, this.doGive, this);
        _super.prototype.dispose.call(this);
    };
    return WifeSkillPopupViewTab1;
}(CommonViewTab));
__reflect(WifeSkillPopupViewTab1.prototype, "WifeSkillPopupViewTab1");
