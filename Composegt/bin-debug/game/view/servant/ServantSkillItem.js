/**
 * 门客信息，道具部分
 * author yanyuling
 * date 2017/11/20
 * @class ServantInfoItemsScrollItem
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
var ServantSkillItem = (function (_super) {
    __extends(ServantSkillItem, _super);
    function ServantSkillItem() {
        return _super.call(this) || this;
    }
    ServantSkillItem.prototype.initItem = function (index, data, param) {
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM),this.useBtnHandlerCallBaclk,this);
        this.width = 97 + 27;
        this.height = 98;
        var sid = param;
        var res = "servant_skill_icon" + data;
        if (!RES.hasRes(res)) {
            res = 'servant_skill_icon1';
        }
        var skillIcon = BaseLoadBitmap.create(res);
        skillIcon.width = 108;
        skillIcon.height = 109;
        skillIcon.setScale(97 / 108);
        this.addChild(skillIcon);
        var lvbg = BaseBitmap.create("servant_skilllvbg");
        this.addChild(lvbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, lvbg, skillIcon, [64, -3]);
        var skill = Api.servantVoApi.getServantSkillLv(sid, data);
        var skilllvTxt = ComponentManager.getTextField("" + skill, 22);
        this.addChild(skilllvTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skilllvTxt, lvbg);
        this.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.SERVANTSKILLLEVELUPPOPUPVUEW, {
                skillid: data,
                servantId: sid
            });
        }, this);
    };
    ServantSkillItem.prototype.dispose = function () {
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM),this.useBtnHandlerCallBaclk,this);
        _super.prototype.dispose.call(this);
    };
    return ServantSkillItem;
}(ScrollListItem));
__reflect(ServantSkillItem.prototype, "ServantSkillItem");
