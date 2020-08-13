/**
 * 门客出海舰队buff 选择门客
 * author shaolaing
 * date 2020/5/21
 * @class ServantExileBuffChooseView
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
var ServantExileBuffChooseView = (function (_super) {
    __extends(ServantExileBuffChooseView, _super);
    function ServantExileBuffChooseView() {
        return _super.call(this) || this;
    }
    ServantExileBuffChooseView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    ServantExileBuffChooseView.prototype.getTitleStr = function () {
        return "allianceWarSelectServantPopupViewTitle";
    };
    ServantExileBuffChooseView.prototype.initView = function () {
        var itemBg = BaseBitmap.create("public_9_bg4");
        itemBg.width = 530;
        itemBg.height = 710;
        itemBg.setPosition(this.viewBg.width / 2 - itemBg.width / 2, 8);
        this.addChildToContainer(itemBg);
        var servantList = Api.servantVoApi.getServantInfoIdListWithSort(2);
        var posId = this.param.data.pos;
        var seatInfo = Api.servantExileVoApi.getServantExileInfoForKey(String(posId));
        if (!seatInfo) {
            this.hide();
            return;
        }
        var lisInfo = [];
        // 1,选择中 2,正常 3，已选择 。4，已免战 。 5，已流放
        for (var i = 0; i < servantList.length; i++) {
            var sid = servantList[i];
            var type = 2;
            var avoidState = Api.servantVoApi.getServantObj(sid).avoid;
            if (sid == seatInfo.buffSid) {
                type = 1;
            }
            else if (Api.servantExileVoApi.getIsBuffed(sid)) {
                type = 3;
            }
            else if (avoidState == 2) {
                type = 4;
            }
            else if (Api.servantExileVoApi.getServantExileInfoForServantId(sid)) {
                type = 5;
            }
            lisInfo.push([sid, type, seatInfo.buffSid ? true : false]);
        }
        lisInfo.sort(function (a, b) {
            return a[1] - b[1];
        });
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 510, itemBg.height - 16);
        var list = ComponentManager.getScrollList(ServantExileBuffChooseItem, lisInfo, rect, { f: this.itemCallback, o: this });
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, list, itemBg);
        this.addChildToContainer(list);
    };
    ServantExileBuffChooseView.prototype.itemCallback = function (sid) {
        var f = this.param.data.f;
        var o = this.param.data.o;
        f.apply(o, [sid]);
        this.hide();
    };
    ServantExileBuffChooseView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ServantExileBuffChooseView;
}(PopupView));
__reflect(ServantExileBuffChooseView.prototype, "ServantExileBuffChooseView");
//# sourceMappingURL=ServantExileBuffChooseView.js.map