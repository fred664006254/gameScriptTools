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
 * 与好友一起对战
 * author qianjun
 *
 */
var WarFriendPopupView = (function (_super) {
    __extends(WarFriendPopupView, _super);
    function WarFriendPopupView() {
        return _super.call(this) || this;
    }
    // 打开该面板时，需要传参数msg
    WarFriendPopupView.prototype.initView = function () {
        var view = this;
        var param = view.param.data;
        //type 1对战 2协同
        var type = param.type;
    };
    Object.defineProperty(WarFriendPopupView.prototype, "isWave", {
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
    WarFriendPopupView.prototype.resetBgSize = function () {
        var _this = this;
        var view = this;
        view.viewBg.width = this.getShowWidth();
        view.viewBg.height = this.getShowHeight();
        _super.prototype.resetBgSize.call(this);
        var param = view.param.data;
        //type 1对战 2协同
        var type = param.type;
        // let titlebg = BaseBitmap.create(`public_poptittle${view.isWave ? `purple` : `red`}`);
        // view.addChildAt(titlebg, view.getChildIndex(view.titleTF));
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titlebg, view.viewBg);
        // let icon = BaseBitmap.create(`joinwarfriend`);
        // view.addChild(icon);
        // icon.setScale(0.8);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, view._titleBg, [15,-5]);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.titleTF, titlebg);
        // if(view._line){
        //     view._line.visible = false;
        // }
        // view.closeBtn.y += 5;
        var tipTxt = ComponentMgr.getTextField(LangMger.getlocal("wartip2type" + type), TextFieldConst.SIZE_CONTENT_SMALL_POPUP, ColorEnums.fight_color_1);
        view.addChildToContainer(tipTxt);
        tipTxt.bold = true;
        tipTxt.stroke = 1.5;
        tipTxt.strokeColor = ColorEnums.fight_strokeColor_1;
        tipTxt.x = (view.viewBg.width - tipTxt.width) / 2;
        tipTxt.y = 45;
        //创建房间
        var btn1 = ComponentMgr.getButton(ButtonConst.BTN_CANCEL, "", function () {
            //创建房间弹窗
            ViewController.getInstance().openView(ViewConst.WARCREATEROOMPOPVIEW, {
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
        view.addChildToContainer(btn1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, btn1, tipTxt, [0, tipTxt.textHeight + 110]);
        var group1 = new BaseDisplayObjectContainer();
        group1.width = btn1.width;
        group1.height = btn1.height;
        var btn1Txt = ComponentMgr.getTextField(LangMger.getlocal("warcreateroom"), TextFieldConst.SIZE_28, ColorEnums.white);
        group1.addChild(btn1Txt);
        btn1Txt.strokeColor = ColorEnums.strokeBlue;
        btn1Txt.stroke = 1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn1Txt, group1, [0, 15], true);
        var icon1 = BaseBitmap.create("joinwarcreateroom");
        group1.addChild(icon1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, icon1, group1, [0, -25], true);
        btn1.addGroup(group1);
        //加入
        var btn2 = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, "", function () {
            //加入弹窗
            ViewController.getInstance().openView(ViewConst.WARJOINROOMPOPVIEW, {
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
        view.addChildToContainer(btn2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, btn2, tipTxt, [0, tipTxt.textHeight + 110]);
        var group2 = new BaseDisplayObjectContainer();
        group2.width = btn2.width;
        group2.height = btn2.height;
        var btn2Txt = ComponentMgr.getTextField(LangMger.getlocal("warjoinroom"), TextFieldConst.SIZE_28, ColorEnums.white);
        group2.addChild(btn2Txt);
        btn2Txt.strokeColor = ColorEnums.btnStrokeOrange;
        ;
        btn2Txt.stroke = 1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn2Txt, group2, [0, 15], true);
        var icon2 = BaseBitmap.create("joinwarjoinroom");
        group2.addChild(icon2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, icon2, btn2, [0, -25], true);
        btn2.addGroup(group2);
    };
    WarFriendPopupView.prototype.isTouchMaskClose = function () {
        return false;
    };
    // protected getTitleBgName():string{
    //     return `public_poptittle${this.isWave ? `purple` : `red`}`;
    // }
    WarFriendPopupView.prototype.getTitleStr = function () {
        var param = this.param.data;
        //type 1对战 2协同
        var type = param.type;
        return LangMger.getlocal("warfriendtitle");
    };
    // protected getCloseBtnName():string{
    //     return `popupview_closebtn${this.isWave ? `purple` : `red`}`;
    // }
    WarFriendPopupView.prototype.closeHandler = function () {
        var param = this.param;
        if (param.data.cancelcallback) {
            param.data.cancelcallback.apply(param.data.handler, [this]);
        }
        _super.prototype.closeHandler.call(this);
    };
    // protected getShowWidth():number{
    // 	return 552;
    // }
    WarFriendPopupView.prototype.getShowHeight = function () {
        return 350;
    };
    WarFriendPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    WarFriendPopupView.prototype.getResourceList = function () {
        var array = [];
        array.concat(_super.prototype.getResourceList.call(this));
        return array.concat([
            "joinwarfriend", "joinwarcreateroom", "joinwarjoinroom"
        ]);
    };
    WarFriendPopupView.prototype.getParent = function () {
        if (this.param.data.inLayer) {
            return this.param.data.inLayer;
        }
        else {
            return _super.prototype.getParent.call(this);
        }
    };
    WarFriendPopupView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return WarFriendPopupView;
}(PopupView));
__reflect(WarFriendPopupView.prototype, "WarFriendPopupView");
//# sourceMappingURL=WarFriendPopupView.js.map