/**
 * 门客出海舰队buff
 * author shaolaing
 * date 2020/5/21
 * @class ServantExileFleetBuffView
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
var ServantExileFleetBuffView = (function (_super) {
    __extends(ServantExileFleetBuffView, _super);
    function ServantExileFleetBuffView() {
        return _super.call(this) || this;
    }
    ServantExileFleetBuffView.prototype.getBgName = function () {
        return "exile_fleet_buff_bg";
    };
    ServantExileFleetBuffView.prototype.getResourceList = function () {
        var resArr = ["exile_fleet_buff_title",];
        return _super.prototype.getResourceList.call(this).concat(resArr);
    };
    ServantExileFleetBuffView.prototype.getTitleStr = function () {
        return null;
    };
    ServantExileFleetBuffView.prototype.initView = function () {
        this.viewBg.width = 634;
        var titlepic = BaseBitmap.create("exile_fleet_buff_title");
        titlepic.setPosition(this.viewBg.width / 2 - titlepic.width / 2, 6);
        this.addChildToContainer(titlepic);
        var desc = ComponentManager.getTextField(LanguageManager.getlocal("exileBuff_fleet_desc"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        desc.lineSpacing = 4;
        desc.width = 560;
        desc.textAlign = egret.HorizontalAlign.CENTER;
        desc.setPosition(this.viewBg.width / 2 - desc.width / 2, 254);
        this.addChildToContainer(desc);
        var num = Api.servantVoApi.getServantCountExiled();
        var count = ComponentManager.getTextField(LanguageManager.getlocal("exileBuff_fleet_count", [String(num)]), 22, TextFieldConst.COLOR_BLACK);
        count.setPosition(this.viewBg.width / 2 - count.width / 2, 356);
        this.addChildToContainer(count);
        var buffStrings = Api.servantVoApi.getExileBuffStrings();
        var posy = count.y + count.height + 25;
        for (var i = 0; i < buffStrings.length; i++) {
            var onebuff = ComponentManager.getTextField(buffStrings[i], 20, TextFieldConst.COLOR_BLACK);
            onebuff.width = 470;
            onebuff.lineSpacing = 5;
            onebuff.textAlign = egret.HorizontalAlign.CENTER;
            onebuff.setPosition(this.viewBg.width / 2 - onebuff.width / 2, posy);
            this.addChildToContainer(onebuff);
            posy += onebuff.height + 7;
        }
        this.viewBg.height = posy + 75;
    };
    ServantExileFleetBuffView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ServantExileFleetBuffView;
}(PopupView));
__reflect(ServantExileFleetBuffView.prototype, "ServantExileFleetBuffView");
//# sourceMappingURL=ServantExileFleetBuffView.js.map