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
/*
author : qianjun
date : 2018.4.14
desc : 回归活动
*/
var PlayerReturnView = (function (_super) {
    __extends(PlayerReturnView, _super);
    function PlayerReturnView() {
        var _this = _super.call(this) || this;
        _this._topBg = null;
        _this._bottomBg = null;
        _this._listBg = null;
        _this.public_dot1 = null;
        _this.public_dot2 = null;
        _this.public_dot3 = null;
        return _this;
    }
    Object.defineProperty(PlayerReturnView.prototype, "cfg", {
        get: function () {
            return Config.PlayerreturnCfg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerReturnView.prototype, "api", {
        get: function () {
            return Api.playerReturnVoApi;
        },
        enumerable: true,
        configurable: true
    });
    //
    PlayerReturnView.prototype.initView = function () {
        var view = this;
        view.width = GameConfig.stageWidth;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RETURN_FRESH_ITEM, view.update, view);
        //top背景图
        var _topBg = BaseBitmap.create("playerreturntopbg");
        view.setLayoutPosition(LayoutConst.horizontalCentertop, _topBg, view, [0, view.titleBg.height + 2]);
        view._topBg = _topBg;
        view.addChild(_topBg);
        view.swapChildren(view.closeBtn, _topBg);
        //活动描述文本
        var descBg = BaseBitmap.create('public_9_bg42');
        view.addChild(descBg);
        descBg.width = 382;
        descBg.height = 97;
        view.setLayoutPosition(LayoutConst.rightverticalCenter, descBg, _topBg, [20, 15]);
        var arrowBM = BaseBitmap.create("public_arrow");
        view.addChild(arrowBM);
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal("PlayerReturnDesc"), 20, TextFieldConst.COLOR_BLACK);
        descTxt.width = 350;
        descTxt.lineSpacing = 5;
        view.addChild(descTxt);
        view.setLayoutPosition(LayoutConst.lefttop, arrowBM, descBg, [-arrowBM.width + 3, 18]);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descBg);
        //活动时间   
        var api = view.api;
        var activityTimerText = ComponentManager.getTextField(LanguageManager.getlocal("acDoubleSeventhTime", [api.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        view.setLayoutPosition(LayoutConst.rightbottom, activityTimerText, _topBg, [10, 5]);
        view.addChild(activityTimerText);
        //targroup
        view.setLayoutPosition(LayoutConst.lefttop, view.tabbarGroup, _topBg, [15, _topBg.height]);
        //bottombg
        var _bottomBg = BaseBitmap.create("servant_bottombg");
        _bottomBg.height = GameConfig.stageHeigth - view.tabbarGroup.y + 30;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, _bottomBg, _topBg, [0, _topBg.height - 3]);
        _bottomBg.x = 0;
        view.addChild(_bottomBg);
        view._bottomBg = _bottomBg;
        view.swapChildren(view.tabbarGroup, _bottomBg);
        var listbg = BaseBitmap.create("public_9_bg32");
        listbg.width = 610;
        listbg.height = _bottomBg.height - 150;
        view.addChild(listbg);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, listbg, _bottomBg, [0, 70]);
        view._listBg = listbg;
        view.container.width = view.tabWidth;
        view.container.height = view.tabHeight;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view.container, view, [0, view.tabbarGroup.y + view.tabbarGroup.height + 13]);
        //红点1
        var public_dot1 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot1);
        ;
        public_dot1.x = this.tabbarGroup.getChildAt(0).x + this.tabbarGroup.getChildAt(0).width - 5;
        public_dot1.y = this.tabbarGroup.y + 10;
        this.public_dot1 = public_dot1;
        //红点2
        var public_dot2 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot2);
        ;
        public_dot2.x = this.tabbarGroup.getChildAt(1).x + this.tabbarGroup.getChildAt(1).width - 5;
        public_dot2.y = this.tabbarGroup.y + 10;
        this.public_dot2 = public_dot2;
        //红点3
        var public_dot3 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot3);
        ;
        public_dot3.x = this.tabbarGroup.getChildAt(2).x + this.tabbarGroup.getChildAt(2).width - 5;
        public_dot3.y = this.tabbarGroup.y + 10;
        this.public_dot3 = public_dot3;
        this.update();
    };
    PlayerReturnView.prototype.clickTabbarHandler = function (data) {
        var view = this;
        _super.prototype.clickTabbarHandler.call(this, data);
        var tabView = view.getSelectedTab();
        tabView.x = 0;
        view._listBg.height = data.index == 0 ? (view._bottomBg.height - 150) : (view._bottomBg.height - 100);
    };
    PlayerReturnView.prototype.getTabbarTextArr = function () {
        return ["PlayerReturnViewTab1",
            "PlayerReturnViewTab2",
            "PlayerReturnViewTab3",
        ];
    };
    PlayerReturnView.prototype.getRuleInfo = function () {
        return "PlayerReturnRule";
    };
    PlayerReturnView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "activity_charge_red", "accarnivalview_tab_red", "progress3", "progress3_bg", "accarnivalview_tab_green",
            "playerreturntopbg", "playerreturnvipbg", "servant_bottombg", "acmidautumnview_titlebg", "signin_had_get", "playersign"
        ]);
    };
    Object.defineProperty(PlayerReturnView.prototype, "tabHeight", {
        get: function () {
            var view = this;
            return view._bottomBg.height - 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerReturnView.prototype, "tabWidth", {
        get: function () {
            var view = this;
            return view.width;
        },
        enumerable: true,
        configurable: true
    });
    PlayerReturnView.prototype.update = function () {
        //第一页 红点
        var vo = this.api;
        if (!vo) {
            return;
        }
        if (this.public_dot1) {
            this.public_dot1.visible = vo.getpublicRedhot1();
        }
        //第二页 红点
        if (this.public_dot2) {
            this.public_dot2.visible = vo.getpublicRedhot2();
        }
        //第三页 红点
        if (this.public_dot3) {
            this.public_dot3.visible = vo.getpublicRedhot3();
        }
    };
    PlayerReturnView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RETURN_FRESH_ITEM, view.update, view);
        view._topBg = null;
        view._bottomBg = null;
        view._listBg = null;
        view.public_dot1 = null;
        view.public_dot2 = null;
        view.public_dot3 = null;
        _super.prototype.dispose.call(this);
    };
    return PlayerReturnView;
}(CommonView));
__reflect(PlayerReturnView.prototype, "PlayerReturnView");
//# sourceMappingURL=PlayerReturnView.js.map