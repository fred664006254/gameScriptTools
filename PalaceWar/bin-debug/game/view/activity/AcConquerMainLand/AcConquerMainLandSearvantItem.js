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
 * 定军中原出战门客item
 * author qianjun
 * date 2017/10/12
 */
var AcConquerMainLandSearvantItem = (function (_super) {
    __extends(AcConquerMainLandSearvantItem, _super);
    function AcConquerMainLandSearvantItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._numTxt = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcConquerMainLandSearvantItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandSearvantItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandSearvantItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandSearvantItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_CONQUERMAINLAND;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandSearvantItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandSearvantItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcConquerMainLandSearvantItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._data = data;
        var servantinfo = data.data;
        view._code = itemparam;
        view.width = 108 + 6;
        view.height = 108 + 6;
        var temW = 108;
        if (data.empty) {
            var iconBgBt = BaseBitmap.create("mlservantempty-" + view.getUiCode());
            iconBgBt.x = 0;
            iconBgBt.y = 0;
            this.addChild(iconBgBt);
            iconBgBt.scaleX = temW / 194;
            iconBgBt.scaleY = temW / 192;
        }
        else {
            var iconBgBt = BaseLoadBitmap.create(servantinfo.qualityBoxImgPath);
            iconBgBt.x = 0;
            iconBgBt.y = 0;
            this.addChild(iconBgBt);
            iconBgBt.scaleX = temW / 194;
            iconBgBt.scaleY = temW / 192;
            var iconBt = BaseLoadBitmap.create(servantinfo.halfImgPath);
            iconBt.x = iconBgBt.x + 5;
            iconBt.y = iconBgBt.y + 5;
            this.addChild(iconBt);
            iconBt.scaleX = (temW - 10) / 180;
            iconBt.scaleY = (temW - 10) / 177;
            var numbg = BaseBitmap.create("servant_namebg");
            numbg.width = 108;
            numbg.setPosition(0, 72);
            this.addChild(numbg);
            var total = view.vo.getAddpower(data.army) + servantinfo.total;
            var numTxt = ComponentManager.getTextField(App.StringUtil.changeIntToText(total), 18);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, numTxt, numbg);
            numTxt.x = (view.width - numTxt.textWidth) / 2;
            this.addChild(numTxt);
            view._numTxt = numTxt;
            view.addTouchTap(function () {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MAINLAND_SERVANT_CHANGE, { type: 'delete', servantId: servantinfo.servantId });
            }, view, null);
        }
    };
    AcConquerMainLandSearvantItem.prototype.refresh = function () {
        var view = this;
        var data = view._data;
        if (!data.empty) {
            var servantinfo = data.data;
            var total = view.vo.getAddpower(data.army) + servantinfo.total;
            view._numTxt.text = App.StringUtil.changeIntToText(total);
            view._numTxt.x = (view.width - view._numTxt.textWidth) / 2;
        }
    };
    AcConquerMainLandSearvantItem.prototype.getSpaceX = function () {
        return 0;
    };
    AcConquerMainLandSearvantItem.prototype.getSpaceY = function () {
        return 0;
    };
    AcConquerMainLandSearvantItem.prototype.dispose = function () {
        var view = this;
        view.removeTouchTap();
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandSearvantItem;
}(ScrollListItem));
__reflect(AcConquerMainLandSearvantItem.prototype, "AcConquerMainLandSearvantItem");
//# sourceMappingURL=AcConquerMainLandSearvantItem.js.map