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
 * 三国争霸 军令城市选择
 * author qianjun
 */
var AcThreeKingdomsOrderCitySelectView = (function (_super) {
    __extends(AcThreeKingdomsOrderCitySelectView, _super);
    function AcThreeKingdomsOrderCitySelectView() {
        var _this = _super.call(this) || this;
        _this._cityId = 1;
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsOrderCitySelectView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsOrderCitySelectView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsOrderCitySelectView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsOrderCitySelectView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsOrderCitySelectView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsOrderCitySelectView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcThreeKingdomsOrderCitySelectView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcThreeKingdomsOrderCitySelectView.prototype.getBgName = function () {
        return "popupview_bg3";
    };
    AcThreeKingdomsOrderCitySelectView.prototype.getCloseBtnName = function () {
        return "popupview_closebtn2";
    };
    AcThreeKingdomsOrderCitySelectView.prototype.initView = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        var id = view.param.data.id;
        var selctcity = view.param.data.selectcity;
        var selectkingdom = view.param.data.selectkingdom;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_ORDER, view.selectBack, view);
        var code = view.getUiCode();
        var cfg = view.cfg;
        var tipTxt1 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsmeetingtip16", code)), 20, TextFieldConst.COLOR_BROWN);
        view.addChildToContainer(tipTxt1);
        tipTxt1.setPosition((view.viewBg.x + (view.viewBg.width - tipTxt1.width) / 2), 20);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 515;
        bg.height = 210;
        view.addChildToContainer(bg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, tipTxt1, [0, tipTxt1.height + 10]);
        var arr = [1, 2, 3];
        arr.splice(view.vo.getMyKingdoms() - 1, 1);
        //选择框
        var selectKuang = BaseBitmap.create("threekingdomsordercurselect");
        //egret.Tween.get(selectKuang, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
        view._cityId = 1;
        var _loop_1 = function (i) {
            var kingdomid = i < 3 ? arr[0] : arr[1];
            var cityid = (kingdomid - 1) * 2 + (i % 2 == 0 ? 2 : 1);
            var citygroup = new BaseDisplayObjectContainer();
            citygroup.width = 125;
            citygroup.height = 125;
            view.addChildToContainer(citygroup);
            citygroup.addTouchTap(function () {
                // selectKuang.width = citygroup.width + 10;
                // selectKuang.height = citygroup.height + 14;
                // selectKuang.setPosition(citygroup.x - 6, citygroup.y - 36);
                // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, selectKuang, citygroup);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, selectKuang, citygroup, [0, -30]);
                view._cityId = cityid;
            }, view);
            var city = BaseBitmap.create("threekingdoms" + kingdomid + "city" + (cityid + 3 - (Math.ceil(cityid / 2) - 1) * 2));
            // city.setScale(0.5);
            citygroup.addChild(city);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, city, citygroup, [0, 0], true);
            // if(selctcity == cityid){
            //     //当前选择
            //     let curselect = BaseBitmap.create(`threekingdomsordercurselect`);
            //     citygroup.addChild(curselect);
            //     App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, curselect, city, [0,-30]);
            // }
            var namebg = BaseBitmap.create("threekingdomscitynamebg" + kingdomid);
            var nameSize = 18;
            if (PlatformManager.checkIsEnLang()) {
                nameSize = 14;
            }
            var nameTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdoms" + kingdomid + "City" + ((i % 2 == 0 ? 2 : 1) + 3) + "Name", code)), nameSize, TextFieldConst.COLOR_LIGHT_YELLOW);
            citygroup.addChild(namebg);
            namebg.name = "namebg" + i;
            nameTxt.name = "nameTxt" + i;
            var font = BaseBitmap.create("threekingdomsfont" + kingdomid);
            citygroup.addChild(font);
            font.setScale(0.7);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, namebg, city, [0, 80]);
            citygroup.addChild(nameTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, namebg);
            if (PlatformManager.checkIsEnLang()) {
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt, namebg, [53, 0]);
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, font, namebg, [3, 0]);
            citygroup.setPosition(bg.x + (10 + (i - 1) * 125), bg.y + 40);
            if (i == 1) {
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, selectKuang, citygroup, [0, -30]);
            }
        };
        for (var i = 1; i < 5; ++i) {
            _loop_1(i);
        }
        view.addChildToContainer(selectKuang);
        var btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "confirmBtn", function () {
            //确认
            if (view._cityId) {
                NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_ORDER, {
                    activeId: view.acTivityId,
                    mainland: view._cityId,
                    ftype: id % 2 == 1 ? 3 : 4,
                    day: id < 3 ? 6 : 7,
                });
            }
            else {
                view.hide();
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, bg, [0, bg.height + 20]);
        view.addChildToContainer(btn);
    };
    AcThreeKingdomsOrderCitySelectView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acThreeKingdomsmeetingtip15", this.getUiCode());
    };
    AcThreeKingdomsOrderCitySelectView.prototype.selectBack = function (evt) {
        var view = this;
        if (evt.data.ret) {
            NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_GOVERMENTINFO, {
                activeId: view.acTivityId,
            });
            App.CommonUtil.showTip(LanguageManager.getlocal("acThreeKingdomsmeetingtip18-" + view.getUiCode()));
            view.hide();
        }
    };
    AcThreeKingdomsOrderCitySelectView.prototype.dispose = function () {
        var view = this;
        view._cityId = 1;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_ORDER, view.selectBack, view);
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsOrderCitySelectView;
}(PopupView));
__reflect(AcThreeKingdomsOrderCitySelectView.prototype, "AcThreeKingdomsOrderCitySelectView");
//# sourceMappingURL=AcThreeKingdomsOrderCitySelectView.js.map