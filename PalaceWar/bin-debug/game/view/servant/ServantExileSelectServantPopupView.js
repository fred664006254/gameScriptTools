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
 * 选择出海的门客
 * @author 张朝阳
 * date 2019/2/19
 * @class ServantExileSelectServantPopupView
 */
var ServantExileSelectServantPopupView = (function (_super) {
    __extends(ServantExileSelectServantPopupView, _super);
    function ServantExileSelectServantPopupView() {
        return _super.call(this) || this;
    }
    ServantExileSelectServantPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_BANISH, this.servantExileHandle, this);
        var topTip = ComponentManager.getTextField(LanguageManager.getlocal("servantExileSelectServantPopupViewTopTip", [String(Config.ExileCfg.unitGem)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        topTip.width = 520;
        topTip.lineSpacing = 3;
        topTip.setPosition(this.viewBg.x + this.viewBg.width / 2 - topTip.width / 2, 15);
        this.addChildToContainer(topTip);
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 530;
        bg.height = this.getShowHeight() - topTip.height - 140;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, topTip.y + topTip.height + 15);
        this.addChildToContainer(bg);
        var rect = new egret.Rectangle(0, 0, bg.width - 10, bg.height - 10);
        var scrollList = ComponentManager.getScrollList(ServantExileSelectServantScrollItem, this.sortServant(), rect, { posId: this.param.data.posId, days: this.param.data.days });
        scrollList.setPosition(bg.x + 5, bg.y + 5);
        this.addChildToContainer(scrollList);
        scrollList.bounces = false;
    };
    ServantExileSelectServantPopupView.prototype.sortServant = function () {
        var servantInfoVoList = Api.servantVoApi.getServantInfoListWithSort(5);
        // let servantInfoList: { servantId: string, servantName: string, level: number, fightValue: number, qualityBoxImgPath: string, halfImgPath: string }[] = [];
        // for (let key in servantInfoVoList) {
        //     let item = servantInfoVoList[key];
        //     let fightValue = item.total;
        //     let servantInfo = { servantId: item.servantId, servantName: item.servantName, level: item.level, fightValue: fightValue, qualityBoxImgPath: item.qualityBoxImgPath, halfImgPath: item.halfImgPath };
        //     servantInfoList.push(servantInfo);
        // }
        // servantInfoList.sort((a, b) => {
        //     return a.fightValue - b.fightValue;
        // })
        // return servantInfoList;
        // servantInfoVoList.sort((a, b) => {
        //     return a.total - b.total;
        // })
        return servantInfoVoList;
    };
    ServantExileSelectServantPopupView.prototype.servantExileHandle = function (event) {
        if (event.data.ret) {
            App.CommonUtil.showTip(LanguageManager.getlocal("servantExileSelectServantPopupViewShowTip2"));
            this.hide();
        }
    };
    ServantExileSelectServantPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "servantexileview_servantexile",
        ]);
    };
    ServantExileSelectServantPopupView.prototype.getTitleBgName = function () {
        return null;
    };
    ServantExileSelectServantPopupView.prototype.getShowHeight = function () {
        return 910;
    };
    ServantExileSelectServantPopupView.prototype.getShowWidth = function () {
        return 570;
    };
    ServantExileSelectServantPopupView.prototype.getTitleStr = function () {
        return 'servantExileSelectServantPopupViewTitle';
    };
    ServantExileSelectServantPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_BANISH, this.servantExileHandle, this);
        _super.prototype.dispose.call(this);
    };
    return ServantExileSelectServantPopupView;
}(PopupView));
__reflect(ServantExileSelectServantPopupView.prototype, "ServantExileSelectServantPopupView");
//# sourceMappingURL=ServantExileSelectServantPopupView.js.map