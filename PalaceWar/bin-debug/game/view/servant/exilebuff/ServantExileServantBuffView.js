/**
 * 门客出海舰队buff 选择门客
 * author shaolaing
 * date 2020/5/21
 * @class ServantExileServantBuffView
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
var ServantExileServantBuffView = (function (_super) {
    __extends(ServantExileServantBuffView, _super);
    function ServantExileServantBuffView() {
        var _this = _super.call(this) || this;
        _this._list = null;
        _this._addBtn = null;
        _this._servantIcon = null;
        _this._posId = null;
        /**
         * "3":{
                "servantId":"1007",
                "st":1595815367,
                "freeEndTime":1595901767,
                "et":1604455367,
                "buffSid":"1001"
            }
        */
        _this._seatInfo = null;
        return _this;
    }
    ServantExileServantBuffView.prototype.getTitleStr = function () {
        return "exileBuff_choose_title";
    };
    ServantExileServantBuffView.prototype.getResourceList = function () {
        var resArr = ["exile_buff_choose_top", "public_popupscrollitembg"];
        return _super.prototype.getResourceList.call(this).concat(resArr);
    };
    ServantExileServantBuffView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    ServantExileServantBuffView.prototype.getBuffSid = function () {
        var sid = "";
        if (this._seatInfo && this._seatInfo.servantId) {
            sid = this._seatInfo.servantId;
        }
        return sid;
    };
    ServantExileServantBuffView.prototype.initView = function () {
        this._posId = this.param.data.pos;
        this._seatInfo = Api.servantExileVoApi.getServantExileInfoForKey(String(this._posId));
        var toppic = BaseBitmap.create("exile_buff_choose_top");
        toppic.setPosition(this.viewBg.width / 2 - toppic.width / 2, 10);
        this.addChildToContainer(toppic);
        var itembg = BaseLoadBitmap.create("itembg_0");
        itembg.width = 110;
        itembg.height = 110;
        itembg.setPosition(this.viewBg.width / 2 - itembg.width / 2, toppic.y + 1);
        this.addChildToContainer(itembg);
        itembg.addTouchTap(this.addTouchHandle, this);
        var add = BaseLoadBitmap.create("childview_addicon");
        add.width = 64;
        add.height = 64;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, add, itembg);
        this.addChildToContainer(add);
        this._addBtn = add;
        var sicon = BaseLoadBitmap.create("childview_addicon");
        sicon.width = 105;
        sicon.height = 105;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, sicon, itembg);
        this.addChildToContainer(sicon);
        this._servantIcon = sicon;
        this.resetIcon();
        var desc = ComponentManager.getTextField(LanguageManager.getlocal("exileBuff_choose_desc"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        desc.lineSpacing = 6;
        desc.setPosition(this.viewBg.width / 2 - desc.width / 2, toppic.y + 135);
        this.addChildToContainer(desc);
        var itemBg = BaseBitmap.create("public_9_bg4");
        itemBg.width = 530;
        itemBg.setPosition(this.viewBg.width / 2 - itemBg.width / 2, toppic.y + toppic.height + 8);
        this.addChildToContainer(itemBg);
        var stringArray = Api.servantVoApi.getOneExileBuffStrings(this.getBuffSid());
        var h = stringArray.length * 132 + 16;
        if (h > 490) {
            h = 490;
        }
        itemBg.height = h;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 510, itemBg.height - 16);
        var list = ComponentManager.getScrollList(ServantExileServantBuffItem, stringArray, rect);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, list, itemBg);
        this.addChildToContainer(list);
        this._list = list;
    };
    ServantExileServantBuffView.prototype.addTouchHandle = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.SERVANTEXILEBUFFCHOOSEVIEW, { pos: this._posId, f: this.chooseCallback, o: this });
    };
    ServantExileServantBuffView.prototype.chooseCallback = function (sid) {
        this.request(NetRequestConst.REQUEST_SERVANT_BANISHBUFF, { servantId: sid, pos: this._posId });
    };
    ServantExileServantBuffView.prototype.receiveData = function (data) {
        if (data.ret) {
            this._seatInfo = Api.servantExileVoApi.getServantExileInfoForKey(String(this._posId));
            this.resetIcon();
            var stringArray = Api.servantVoApi.getOneExileBuffStrings(this.getBuffSid());
            this._list.refreshData(stringArray);
        }
    };
    ServantExileServantBuffView.prototype.resetIcon = function () {
        if (this._seatInfo && this._seatInfo.buffSid) {
            this._addBtn.visible = false;
            this._servantIcon.visible = true;
            var servantcfg = Api.servantVoApi.getServantObj(this._seatInfo.buffSid);
            this._servantIcon.setload(servantcfg.halfImgPath);
        }
        else {
            this._addBtn.visible = true;
            this._servantIcon.visible = false;
        }
    };
    ServantExileServantBuffView.prototype.dispose = function () {
        this._list = null;
        this._addBtn = null;
        this._servantIcon = null;
        this._posId = null;
        this._seatInfo = null;
        _super.prototype.dispose.call(this);
    };
    return ServantExileServantBuffView;
}(PopupView));
__reflect(ServantExileServantBuffView.prototype, "ServantExileServantBuffView");
//# sourceMappingURL=ServantExileServantBuffView.js.map