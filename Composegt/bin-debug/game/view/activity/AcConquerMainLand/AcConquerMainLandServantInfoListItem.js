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
 * 排行列表节点
 */
var AcConquerMainLandServantInfoListItem = (function (_super) {
    __extends(AcConquerMainLandServantInfoListItem, _super);
    function AcConquerMainLandServantInfoListItem() {
        var _this = _super.call(this) || this;
        _this._code = '';
        _this.servantInfo = null;
        _this._name = null;
        _this._add = null;
        _this._total = null;
        return _this;
    }
    Object.defineProperty(AcConquerMainLandServantInfoListItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandServantInfoListItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandServantInfoListItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandServantInfoListItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_CONQUERMAINLAND;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandServantInfoListItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandServantInfoListItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcConquerMainLandServantInfoListItem.prototype.initItem = function (index, data, item) {
        this._code = item.code;
        this.width = 600;
        this.height = 50; //rankbg_1
        this.servantInfo = Api.servantVoApi.getServantObj(data);
        var tarColor = TextFieldConst.COLOR_BROWN_NEW;
        var pos = item.pos[0];
        var rankTxt = ComponentManager.getTextField(this.servantInfo.servantName, TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        rankTxt.x = pos.x + (pos.width - rankTxt.width) / 2 - 25;
        rankTxt.y = this.height / 2 - rankTxt.height / 2;
        this.addChild(rankTxt);
        this._name = rankTxt;
        pos = item.pos[1];
        var nameTxt = ComponentManager.getTextField(App.StringUtil.changeIntToText3(this.vo.extraAttr[data] || 0), TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        nameTxt.x = pos.x + (pos.width - nameTxt.width) / 2 - 25;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(nameTxt);
        this._add = nameTxt;
        pos = item.pos[2];
        var extraStren = (this.vo.extraAttr[data] || 0) * this.vo.getPowerAddBuff();
        var str = LanguageManager.getlocal('acConquerMainLandServantNumWithAdd', [App.StringUtil.changeIntToText3((Number(this.servantInfo.total) + Number(extraStren))) + '', App.StringUtil.changeIntToText3(extraStren) + '']);
        var serverTxt = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        serverTxt.x = pos.x + (pos.width - serverTxt.width) / 2 - 25;
        serverTxt.y = nameTxt.y;
        this.addChild(serverTxt);
        this._total = serverTxt;
        var line = BaseBitmap.create("public_line4");
        this.addChild(line);
        line.width = this.width - 10;
        line.x = 8;
        line.y = this.height - line.height;
    };
    AcConquerMainLandServantInfoListItem.prototype.refreshData = function (data) {
        this.servantInfo = Api.servantVoApi.getServantObj(data);
        this._name.text = this.servantInfo.servantName;
        this._add.text = this.vo.extraAttr[data] || 0;
        var extraStren = (this.vo.extraAttr[data] || 0) * this.vo.getPowerAddBuff();
        var str = LanguageManager.getlocal('acConquerMainLandServantNumWithAdd', [this.servantInfo.total + extraStren + '', extraStren + '']);
        this._total.text = str;
    };
    /**
     * 不同格子Y间距
     */
    AcConquerMainLandServantInfoListItem.prototype.getSpaceY = function () {
        return 0;
    };
    AcConquerMainLandServantInfoListItem.prototype.dispose = function () {
        this.servantInfo = null;
        this._name = null;
        this._add = null;
        this._total = null;
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandServantInfoListItem;
}(ScrollListItem));
__reflect(AcConquerMainLandServantInfoListItem.prototype, "AcConquerMainLandServantInfoListItem");
