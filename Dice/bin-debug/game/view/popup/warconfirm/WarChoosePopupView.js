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
 * 选择对战模式
 * author qianjun
 *
 */
var WarChoosePopupView = (function (_super) {
    __extends(WarChoosePopupView, _super);
    function WarChoosePopupView() {
        var _this = _super.call(this) || this;
        _this.findBtn = null;
        return _this;
    }
    // 打开该面板时，需要传参数msg
    WarChoosePopupView.prototype.initView = function () {
        var view = this;
        view.name = ViewConst.WARCHOOSEPOPUPVIEW;
        var param = view.param.data;
        //type 1对战 2协同
        var type = param.type;
    };
    WarChoosePopupView.prototype.preInit = function () {
        _super.prototype.preInit.call(this);
    };
    WarChoosePopupView.prototype.resetBgSize = function () {
        var _this = this;
        var view = this;
        view.viewBg.width = this.getShowWidth();
        view.viewBg.height = this.getShowHeight();
        _super.prototype.resetBgSize.call(this);
        var param = view.param.data;
        //type 1对战 2协同
        var type = param.type;
        // let titlebg = BaseBitmap.create(`public_poptittle${this.isWave ? `purple` : `red`}`);
        // view.addChildAt(titlebg, view.getChildIndex(view.titleTF));
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titlebg, view.viewBg);
        // let icon:BaseBitmap = null;
        // if(this.isWave){
        //     icon = BaseBitmap.create(`joinwarwave`);
        // } else {
        //     icon = BaseBitmap.create(`trophy_icon`);
        //     icon.setScale(0.42);
        // }
        // view.addChild(icon);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, view._titleBg, [15,0]);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.titleTF, titlebg);
        var tipTxt = ComponentMgr.getTextField(LangMger.getlocal("wartip1type" + type), TextFieldConst.SIZE_CONTENT_SMALL_POPUP, ColorEnums.fight_color_1);
        view.addChild(tipTxt);
        tipTxt.bold = true;
        tipTxt.stroke = 1.5;
        tipTxt.strokeColor = ColorEnums.fight_strokeColor_1;
        tipTxt.width = 355;
        tipTxt.lineSpacing = 11;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        tipTxt.x = view.container.x + (view.viewBg.width - tipTxt.width) / 2;
        tipTxt.y = view.container.y + 45;
        //好友战斗
        var btn1 = ComponentMgr.getButton(ButtonConst.BTN_CANCEL, "", function () {
            //好友战斗弹窗
            ViewController.getInstance().openView(ViewConst.WARFRIENDPOPVIEW, {
                type: type,
                cancelcallback: function () {
                    view.alpha = 1;
                },
                findcallback: function () {
                    if (param.findcallback) {
                        param.findcallback.apply(param.handler, [_this]);
                    }
                    view.hide();
                },
                handler: view
            });
            view.alpha = 0;
        }, view);
        view.addChild(btn1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, btn1, tipTxt, [0, tipTxt.textHeight + 80]);
        var group1 = new BaseDisplayObjectContainer();
        group1.width = btn1.width;
        group1.height = btn1.height;
        var btn1Txt = ComponentMgr.getTextField(LangMger.getlocal("warfriend"), TextFieldConst.SIZE_28, ColorEnums.white);
        group1.addChild(btn1Txt);
        // btn1Txt.strokeColor = type == 1 ? ColorEnums.btnStrokeRed : ColorEnums.btnStrokePurple;
        btn1Txt.strokeColor = ColorEnums.strokeBlue;
        btn1Txt.stroke = 1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn1Txt, group1, [0, 15], true);
        var icon1 = BaseBitmap.create("joinwarfriend");
        group1.addChild(icon1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, icon1, group1, [0, -25], true);
        btn1.addGroup(group1);
        //快速匹配
        var btn2 = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, "", function () {
            App.MsgHelper.dispEvt(MsgConst.CLOSE_GUIDE);
            //快速匹配战斗弹窗
            ViewController.getInstance().openView(ViewConst.WARWAITINGPOPVIEW, {
                type: type,
                cancelcallback: function () {
                    view.alpha = 1;
                },
                findcallback: function () {
                    if (param.findcallback) {
                        param.findcallback.apply(param.handler, [_this]);
                    }
                    Api.AdvertiseVoApi.notfriend = true;
                    view.hide();
                },
                handler: view
            });
            view.alpha = 0;
        }, view);
        view.addChild(btn2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, btn2, tipTxt, [0, tipTxt.textHeight + 80]);
        view.findBtn = btn2;
        if (type == 1 && Api.AdvertiseVoApi.getPlayHuo()) {
            // 对战模式下加特效
            var huo = ComponentMgr.getCustomMovieClip("huo", 10, 80);
            huo.scaleX = 0.7;
            huo.scaleY = 0.64;
            huo.playWithTime(0);
            btn2.addChild(huo);
            huo.x = -37;
            huo.y = -48;
        }
        var group2 = new BaseDisplayObjectContainer();
        group2.width = btn2.width;
        group2.height = btn2.height;
        var btn2Txt = ComponentMgr.getTextField(LangMger.getlocal("warquiclplay"), TextFieldConst.SIZE_28, ColorEnums.white);
        group2.addChild(btn2Txt);
        btn2Txt.strokeColor = ColorEnums.btnStrokeBlue;
        ;
        btn2Txt.stroke = 1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn2Txt, group2, [0, 15], true);
        var icon2 = BaseBitmap.create("joinwarquickplay");
        group2.addChild(icon2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, icon2, btn2, [0, -25], true);
        if (type == 1 && Api.AdvertiseVoApi.getPlayHuo()) {
            group2.setPosition(30, 0);
            btn2Txt.setPosition(-10, 40);
            icon2.setPosition(5, -25);
        }
        btn2.addGroup(group2);
    };
    // protected getTitleBgName():string{
    //     return `public_poptittle${this.isWave ? `purple` : `red`}`;
    // }
    WarChoosePopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    WarChoosePopupView.prototype.getTitleStr = function () {
        var param = this.param.data;
        //type 1对战 2协同
        var type = param.type;
        return LangMger.getlocal(type == 1 ? "fight_model" : "operation_model_title");
    };
    // protected getCloseBtnName():string{
    //     return `popupview_closebtn${this.isWave ? `purple` : `red`}`;
    // }
    WarChoosePopupView.prototype.closeHandler = function () {
        _super.prototype.closeHandler.call(this);
    };
    // protected getShowWidth():number{
    // 	return 552;
    // }
    WarChoosePopupView.prototype.getShowHeight = function () {
        return 350;
    };
    WarChoosePopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    WarChoosePopupView.prototype.getResourceList = function () {
        var array = [];
        array.concat(_super.prototype.getResourceList.call(this));
        var param = this.param.data;
        //type 1对战 2协同
        var type = param.type;
        return array.concat([
            // `joinwarfriend${this.isWave ? `_wave` : ``}`,`joinwarquickplay`, `joinwarwave`
            "joinwarfriend", "joinwarquickplay"
        ]);
    };
    Object.defineProperty(WarChoosePopupView.prototype, "isWave", {
        get: function () {
            var view = this;
            var param = view.param.data;
            //type 1对战 2协同
            var type = param.type;
            return type == 2;
        },
        enumerable: true,
        configurable: true
    });
    WarChoosePopupView.prototype.getParent = function () {
        if (this.param.data.inLayer) {
            return this.param.data.inLayer;
        }
        else {
            return _super.prototype.getParent.call(this);
        }
    };
    WarChoosePopupView.prototype.dispose = function () {
        var view = this;
        view.findBtn = null;
        _super.prototype.dispose.call(this);
    };
    return WarChoosePopupView;
}(PopupView));
__reflect(WarChoosePopupView.prototype, "WarChoosePopupView");
//# sourceMappingURL=WarChoosePopupView.js.map