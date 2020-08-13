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
 * author:qianjun
 * desc:规则详情弹窗
*/
var AcCrossServerServantDetailView = (function (_super) {
    __extends(AcCrossServerServantDetailView, _super);
    function AcCrossServerServantDetailView() {
        var _this = _super.call(this) || this;
        _this._ruleBg = null;
        return _this;
    }
    AcCrossServerServantDetailView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcCrossServerServantDetailView.prototype.getTitleStr = function () {
        return "atkracecrossDetailTitle";
    };
    Object.defineProperty(AcCrossServerServantDetailView.prototype, "api", {
        get: function () {
            return Api.crossServerServantVoApi;
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerServantDetailView.prototype.initView = function () {
        var view = this;
        view.width = 558;
        view.height = 567;
        var ruleBg = BaseBitmap.create("crossservantrulebg");
        ruleBg.setPosition(view.viewBg.width / 2 - ruleBg.width / 2, 12);
        view.addChildToContainer(ruleBg);
        view._ruleBg = ruleBg;
        view.createVS(1);
        view.createVS(2);
        var vbsg = BaseBitmap.create("crossservantrulevs");
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, vbsg, ruleBg);
        view.addChildToContainer(vbsg);
        var bottombg = BaseBitmap.create("public_9_bg44");
        bottombg.width = 516;
        bottombg.height = 183;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, bottombg, ruleBg, [0, ruleBg.height + 20]);
        view.addChildToContainer(bottombg);
        var dateTxt = ComponentManager.getTextField(LanguageManager.getlocal('acDoubleSeventhTime', [view.api.acTimeAndHour]), 20, TextFieldConst.COLOR_WARN_GREEN);
        view.setLayoutPosition(LayoutConst.lefttop, dateTxt, bottombg, [50, 15]);
        view.addChildToContainer(dateTxt);
        var zid_arr = view.api.getCrossServer();
        var serveStr = '';
        var temp = [];
        for (var i in zid_arr) {
            var zidname = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, Number(zid_arr[i]));
            if (temp.indexOf(zidname) == -1) {
                temp.push(zidname);
                serveStr += (zidname + ('、'));
            }
        }
        serveStr = serveStr.substring(0, serveStr.length - 1);
        var joinTxt = ComponentManager.getTextField(LanguageManager.getlocal('crossserverJoinList', [serveStr]), 20, TextFieldConst.COLOR_WARN_GREEN);
        view.setLayoutPosition(LayoutConst.lefttop, joinTxt, dateTxt, [0, dateTxt.textHeight + 10]);
        view.addChildToContainer(joinTxt);
        var ruleTxt = ComponentManager.getTextField(LanguageManager.getlocal('crossserverRule'), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        ruleTxt.width = 420;
        ruleTxt.lineSpacing = 5;
        view.setLayoutPosition(LayoutConst.lefttop, ruleTxt, joinTxt, [0, joinTxt.textHeight + 10]);
        view.addChildToContainer(ruleTxt);
    };
    AcCrossServerServantDetailView.prototype.createVS = function (area) {
        var _this = this;
        var view = this;
        //门客图像
        var cfg = Config.ServantskinCfg.getServantSkinItemById(view.api.getVsServantSkin(area));
        //门客图像
        var man = BaseLoadBitmap.create(cfg.body, null, {
            callback: function () {
                man.scaleX = -0.6;
                man.scaleY = 0.6;
                man.mask = new egret.Rectangle(0, 0, 405, 467);
                view.setLayoutPosition(area == 1 ? LayoutConst.leftbottom : LayoutConst.rightbottom, man, view._ruleBg, [area == 1 ? 250 : 250, 5]);
                view.addChildToContainer(man);
                //名字背景
                var zchiImg = BaseBitmap.create('crossservantnamebg');
                view.setLayoutPosition(area == 1 ? LayoutConst.lefttop : LayoutConst.righttop, zchiImg, man, [-230, 10]);
                view.addChildToContainer(zchiImg);
                //名字
                var nameTxt = ComponentManager.getTextField(Config.ServantCfg.getServantItemById(view.api.getVsServant(area)).name, 20);
                if (PlatformManager.checkIsTextHorizontal()) {
                    zchiImg.width = nameTxt.width + 20;
                    if (area == 1) {
                        zchiImg.setPosition(_this._ruleBg.x + 6, _this._ruleBg.y + 10);
                        nameTxt.setPosition(zchiImg.x + 5, zchiImg.y + zchiImg.height / 2 - nameTxt.height / 2);
                    }
                    else {
                        zchiImg.anchorOffsetX = zchiImg.width / 2;
                        zchiImg.anchorOffsetY = zchiImg.height / 2;
                        zchiImg.rotation = 180;
                        zchiImg.setPosition(_this._ruleBg.x + _this._ruleBg.width - zchiImg.width / 2 - 6, _this._ruleBg.y + 10 + zchiImg.height / 2);
                        nameTxt.setPosition(zchiImg.x + zchiImg.width / 2 - nameTxt.width - 5, zchiImg.y - nameTxt.height / 2);
                    }
                }
                else {
                    nameTxt.width = 20;
                    view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, zchiImg);
                }
                view.addChildToContainer(nameTxt);
            },
            callbackThisObj: view
        });
    };
    AcCrossServerServantDetailView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    AcCrossServerServantDetailView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerServantDetailView;
}(PopupView));
__reflect(AcCrossServerServantDetailView.prototype, "AcCrossServerServantDetailView");
//# sourceMappingURL=AcCrossServerServantDetailView.js.map