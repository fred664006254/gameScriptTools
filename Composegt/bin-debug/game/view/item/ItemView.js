/**
 * 道具
 * author dmj
 * date 2017/9/22
 * @class ItemView
 */
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
var ItemView = (function (_super) {
    __extends(ItemView, _super);
    function ItemView() {
        return _super.call(this) || this;
    }
    ItemView.prototype.initView = function () {
        this.checkRedPoint();
        // NetManager.request(NetRequestConst.REQUEST_ITEM_GETMODEL,{});
    };
    ItemView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ITEM_GETMODEL, requestData: {} };
    };
    // protected getRuleInfo():string
    // {
    // 	return "itemRuleInfo";
    // }
    ItemView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "common_shopmark2", "itemview_daoju_bg01", "itemview_daoju_bg02", "itemview_daoju_bg03", "itembg_0",
            "itemview_detailbg", "commonview_bottom", "commonview_border1", "commonview_item1", "commonview_woodbg",
            "commonview_border2",
        ]);
    };
    ItemView.prototype.getTabbarTextArr = function () {
        return ["itemBtn", "composeBtn",
            "fashionBtn",
        ];
    };
    ItemView.prototype.checkRedPoint = function () {
        if (Api.itemVoApi.checkRedPoint()) {
            this.tabbarGroup.addRedPoint(1, null, null, -12, 4);
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ITEM_DOCOMPOSE, this.checkRedPoint, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ITEM_GETCOMPOSE, this.checkRedPoint, this);
    };
    ItemView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ITEM_DOCOMPOSE, this.checkRedPoint, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ITEM_GETCOMPOSE, this.checkRedPoint, this);
        _super.prototype.dispose.call(this);
    };
    // 大于等于5时，需要弹2次确认板
    ItemView.MAX_NUM = 5;
    return ItemView;
}(CommonView));
__reflect(ItemView.prototype, "ItemView");
