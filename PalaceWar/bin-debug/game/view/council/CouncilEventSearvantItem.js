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
 * 议事门客item
 * author qianjun
 * date 2017/10/12
 */
var CouncilEventSearvantItem = (function (_super) {
    __extends(CouncilEventSearvantItem, _super);
    function CouncilEventSearvantItem() {
        var _this = _super.call(this) || this;
        _this._Index = 0;
        _this._cardbg = null;
        _this._icon = null;
        _this._deleteBtn = null;
        return _this;
    }
    CouncilEventSearvantItem.prototype.initItem = function (index, data) {
        var view = this;
        view._data = data;
        view._Index = index;
        view.width = view._data.select ? 104 : 90;
        view.height = view._data.select ? 104 : 90;
        view._servantInfoVo = data.data;
        view.initServantIcon(data.data);
    };
    CouncilEventSearvantItem.prototype.refreshData = function (data) {
        var view = this;
        if (data) {
            var info = Api.servantVoApi.getServantObj(data);
            view._servantInfoVo = info;
            view._cardbg.setload(info.qualityBoxImgPath);
            view._icon.setload(info.halfImgPath);
            view._deleteBtn.visible = true;
        }
        else {
            view._cardbg.setload('servant_cardbg_0');
            view._icon.setload('servant_half_empty');
            view._deleteBtn.visible = false;
        }
    };
    CouncilEventSearvantItem.prototype.initServantIcon = function (servantInfoVo) {
        var view = this;
        var temW = view._data.select ? 94 : 80;
        var iconBgBt = BaseLoadBitmap.create(servantInfoVo ? servantInfoVo.qualityBoxImgPath : 'servant_cardbg_0');
        iconBgBt.x = 10;
        iconBgBt.y = 10;
        this.addChild(iconBgBt);
        iconBgBt.scaleX = temW / 194;
        iconBgBt.scaleY = temW / 192;
        view._cardbg = iconBgBt;
        var iconBt = BaseLoadBitmap.create(servantInfoVo ? servantInfoVo.halfImgPath : 'servant_half_empty');
        iconBt.x = iconBgBt.x + 5;
        iconBt.y = iconBgBt.y + 5;
        this.addChild(iconBt);
        iconBt.scaleX = (temW - 10) / 180;
        iconBt.scaleY = (temW - 10) / 177;
        view._icon = iconBt;
        var selectBtn = ComponentManager.getButton('discussclose', '', view.deleteClick, view);
        view.setLayoutPosition(LayoutConst.righttop, selectBtn, view);
        view.addChild(selectBtn);
        view._deleteBtn = selectBtn;
        view._deleteBtn.visible = view._data.select && !view._data.empty;
    };
    CouncilEventSearvantItem.prototype.deleteClick = function () {
        var view = this;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_COUNCIL_TEAMCHANGE, { type: 'delete', idx: view._Index, servantId: view._servantInfoVo.servantId });
    };
    CouncilEventSearvantItem.prototype.getSpaceX = function () {
        return 10;
    };
    CouncilEventSearvantItem.prototype.dispose = function () {
        var view = this;
        BaseLoadBitmap.release(view._icon);
        BaseLoadBitmap.release(view._cardbg);
        view._icon = null;
        view._cardbg = null;
        view._deleteBtn = null;
        _super.prototype.dispose.call(this);
    };
    return CouncilEventSearvantItem;
}(ScrollListItem));
__reflect(CouncilEventSearvantItem.prototype, "CouncilEventSearvantItem");
//# sourceMappingURL=CouncilEventSearvantItem.js.map