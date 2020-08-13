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
var AcThreeKingdomsTaskServantItem = (function (_super) {
    __extends(AcThreeKingdomsTaskServantItem, _super);
    function AcThreeKingdomsTaskServantItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._numTxt = null;
        _this._cityid = 0;
        _this._sid = '';
        return _this;
    }
    AcThreeKingdomsTaskServantItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._data = data;
        view.width = 90 + 6;
        view.height = 90;
        var temW = 90;
        var cityid = itemparam;
        view._cityid = cityid;
        if (data.empty) {
            var iconBgBt = BaseBitmap.create("mlservantempty-1");
            iconBgBt.x = 0;
            iconBgBt.y = 0;
            this.addChild(iconBgBt);
            iconBgBt.scaleX = temW / 194;
            iconBgBt.scaleY = temW / 192;
        }
        else {
            var servantinfo_1 = Api.servantVoApi.getServantObj(data.data.servantId);
            view._sid = String(data.data.servantId);
            var iconBgBt = BaseLoadBitmap.create(servantinfo_1.qualityBoxImgPath);
            iconBgBt.x = 0;
            iconBgBt.y = 0;
            this.addChild(iconBgBt);
            iconBgBt.scaleX = temW / 194;
            iconBgBt.scaleY = temW / 192;
            var iconBt = BaseLoadBitmap.create(servantinfo_1.halfImgPath);
            iconBt.x = iconBgBt.x + 5;
            iconBt.y = iconBgBt.y + 5;
            this.addChild(iconBt);
            iconBt.scaleX = (temW - 10) / 180;
            iconBt.scaleY = (temW - 10) / 177;
            var numbg = BaseBitmap.create("servant_namebg");
            numbg.width = 88;
            numbg.height = 24;
            numbg.setPosition(2, 65);
            this.addChild(numbg);
            //2武3知4政5魅1全属性
            var total = servantinfo_1.getTotalBookValue(cityid - 1);
            var numTxt = ComponentManager.getTextField(App.StringUtil.changeIntToText(total), 18);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, numTxt, numbg);
            numTxt.x = (view.width - numTxt.textWidth) / 2;
            this.addChild(numTxt);
            view._numTxt = numTxt;
            view.addTouchTap(function () {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MAINLAND_SERVANT_CHANGE, { type: 'delete', servantId: servantinfo_1.servantId });
            }, view, null);
        }
    };
    AcThreeKingdomsTaskServantItem.prototype.refresh = function () {
        var view = this;
        var data = view._data;
        if (!data.empty) {
            var servantinfo = data.data;
            var total = servantinfo.getTotalBookValue(view._cityid - 1);
            view._numTxt.text = App.StringUtil.changeIntToText(total);
            view._numTxt.x = (view.width - view._numTxt.textWidth) / 2;
        }
    };
    AcThreeKingdomsTaskServantItem.prototype.getSpaceX = function () {
        return 0;
    };
    AcThreeKingdomsTaskServantItem.prototype.getSpaceY = function () {
        return 0;
    };
    AcThreeKingdomsTaskServantItem.prototype.dispose = function () {
        var view = this;
        view.removeTouchTap();
        view._numTxt = null;
        view._sid = '';
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsTaskServantItem;
}(ScrollListItem));
__reflect(AcThreeKingdomsTaskServantItem.prototype, "AcThreeKingdomsTaskServantItem");
//# sourceMappingURL=AcThreeKingdomsTaskServantItem.js.map