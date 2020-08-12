/*
 *@description: 菜单弹出框
 *@author: hwc
 *@date: 2020-04-11 10:29:00
 *@version 0.0.1
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
var MenuPopupView = (function (_super) {
    __extends(MenuPopupView, _super);
    function MenuPopupView() {
        var _this = _super.call(this) || this;
        _this.btnList = [];
        _this.menuList = [
            {
                btnID: 7,
                btnName: "menu_fight_rank",
                url: "menu_list_btn_yellow",
                icon: "battlelogicon",
                color: ColorEnums.white,
                strokeColor: ColorEnums.strokeOrange,
                size: 24,
                enable: true,
                popview: ViewConst.BATTLERANKPOPUPVIEW,
                param: "pvp",
            },
            {
                btnID: 8,
                btnName: "menu_operation_rank",
                url: "menu_list_btn_purple",
                icon: "battlelogicon_wave",
                color: ColorEnums.white,
                strokeColor: ColorEnums.strokePurple,
                size: 24,
                enable: true,
                popview: ViewConst.BATTLERANKPOPUPVIEW,
                param: "pve",
            },
            {
                btnID: 3,
                btnName: "menu_sing_in",
                url: "menu_list_btn_blue",
                icon: "menu_sing_in",
                color: ColorEnums.white,
                strokeColor: ColorEnums.strokeBlue,
                size: 24,
                enable: Api.SwitchVoApi.checkOpenSign(),
                popview: ViewConst.SINGINPOPUPVIEW,
            },
            {
                btnID: 1,
                btnName: "mailPopupViewTitle",
                url: "menu_list_btn_blue",
                icon: "menu_mail_icon",
                color: ColorEnums.white,
                strokeColor: ColorEnums.strokeBlue,
                size: 24,
                enable: true,
                popview: ViewConst.MAILPOPUPVIEW,
            },
            {
                btnID: 6,
                btnName: "menu_fight_history",
                url: "menu_list_btn_blue",
                icon: "menu_fight_history",
                color: ColorEnums.white,
                strokeColor: ColorEnums.strokeBlue,
                size: 24,
                enable: true,
                popview: ViewConst.BATTLELOGPOPUPVIEW,
            },
            {
                btnID: 5,
                btnName: "menu_update",
                url: "menu_list_btn_blue",
                icon: "menu_update",
                color: ColorEnums.white,
                strokeColor: ColorEnums.strokeBlue,
                size: 24,
                enable: true,
                popview: ViewConst.UPDATENOTICEVIEW,
            },
            {
                btnID: 4,
                btnName: "menu_gonggao",
                url: "menu_list_btn_blue",
                icon: "menu_gonggao",
                color: ColorEnums.white,
                strokeColor: ColorEnums.strokeBlue,
                size: 24,
                enable: false,
                popview: ViewConst.NOTICEPOPUPVIEW,
            },
            {
                btnID: 2,
                btnName: "menu_setting",
                url: "menu_list_btn_blue",
                icon: "menu_setting",
                color: ColorEnums.white,
                strokeColor: ColorEnums.strokeBlue,
                size: 24,
                enable: true,
                popview: ViewConst.SETTINGPOPOPVIEW,
            },
        ];
        return _this;
    }
    MenuPopupView.prototype.getResourceList = function () {
        return [];
    };
    MenuPopupView.prototype.getParent = function () {
        return LayerMgr.panelLayer;
    };
    MenuPopupView.prototype.initTitle = function () {
        // 不用title
    };
    MenuPopupView.prototype.initView = function () {
        var menu = this;
        var bg = this.viewBg;
        this._maskBmp.alpha = 0;
        bg.width = 274;
        bg.x = GameConfig.stageWidth - bg.width - 5;
        bg.y = 156;
        bg.height = 495 + 160;
        menu.addChild(bg);
        var cellH = 80;
        for (var index = 0; index < this.menuList.length; index++) {
            var item = this.menuList[index];
            var btn = ComponentMgr.getButton(item.url, "", this.menuBtnHandler, this, [item]);
            menu.addChild(btn);
            btn.setBtnSize(236, 70);
            btn.y = cellH * index + bg.y + 15;
            btn.x = bg.x + (bg.width - btn.width) / 2;
            btn.setEnable(item.enable);
            this.btnList.push(btn);
            var icon = BaseBitmap.create(item.icon);
            btn.addChild(icon);
            icon.x = 10;
            App.DisplayUtil.setLayoutPosition(LayoutConst.verticalCenter, icon, btn, [0, 0]);
            var txt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_24, ColorEnums.white);
            btn.addChild(txt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.verticalCenter, txt, btn, [0, 0]);
            txt.width = btn.width - icon.width - icon.x;
            txt.textAlign = egret.HorizontalAlign.CENTER;
            txt.x = icon.x + icon.width;
            txt.text = LangMger.getlocal(item.btnName);
            txt.strokeColor = item.strokeColor;
            if ((Api.SigninfoVoApi.getSignHsa() && this.menuList[index].btnID == 3 && Api.SwitchVoApi.checkOpenSign()) || (Api.RedpointVoApi.checkRedPoint("mymail") && this.menuList[index].btnID == 1)) {
                var red = BaseBitmap.create("red_point");
                btn.addChild(red);
                icon.x = 10;
                App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, red, btn, [0, 0]);
            }
        }
        // bg.height = cellH * this.menuList.length + 30;
    };
    MenuPopupView.prototype.menuBtnHandler = function (data) {
        if (data.popview) {
            this.closeHandler();
            var param = {};
            if (data.param) {
                param = data.param;
            }
            ViewController.getInstance().openView(data.popview, param);
        }
        console.log(data.popview);
    };
    MenuPopupView.prototype.getBgName = function () {
        return "menu_view_bg";
    };
    MenuPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    MenuPopupView.prototype.getMaskName = function () {
        return "";
    };
    MenuPopupView.prototype.isShowMask = function () {
        return true;
    };
    MenuPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    MenuPopupView.prototype.dispose = function () {
        this.btnList = [];
        _super.prototype.dispose.call(this);
    };
    return MenuPopupView;
}(BaseView));
__reflect(MenuPopupView.prototype, "MenuPopupView");
//# sourceMappingURL=MenuPopupView.js.map