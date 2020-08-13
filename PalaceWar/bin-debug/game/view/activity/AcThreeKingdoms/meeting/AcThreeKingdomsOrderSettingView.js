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
 * 三国争霸 军令显示
 * author qianjun
 */
var AcThreeKingdomsOrderSettingView = (function (_super) {
    __extends(AcThreeKingdomsOrderSettingView, _super);
    function AcThreeKingdomsOrderSettingView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcThreeKingdomsOrderSettingView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsOrderSettingView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsOrderSettingView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsOrderSettingView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsOrderSettingView.prototype.getUiCode = function () {
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
    AcThreeKingdomsOrderSettingView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcThreeKingdomsOrderSettingView.prototype.getBgName = function () {
        return "popupview_bg3";
    };
    AcThreeKingdomsOrderSettingView.prototype.getCloseBtnName = function () {
        return "popupview_closebtn2";
    };
    AcThreeKingdomsOrderSettingView.prototype.initView = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        //App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_UPGRADEREWARD, view.attackBack, view);
        var code = view.getUiCode();
        var cfg = view.cfg;
        var tipTxt1 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsmeetingtip10", code)), 20, TextFieldConst.COLOR_BROWN);
        view.addChildToContainer(tipTxt1);
        tipTxt1.setPosition(view.viewBg.x + 65, 10);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsmeetingtip11", code)), 20, TextFieldConst.COLOR_BROWN);
        view.addChildToContainer(tipTxt);
        tipTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, tipTxt1, [0, tipTxt1.height + 6]);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 450;
        view.addChildToContainer(bg);
        bg.setPosition(view.viewBg.x + (view.viewBg.width - bg.width) / 2, 90);
        var week = view.vo.getCurWeek();
        var _loop_1 = function (i) {
            var citygroup = new BaseDisplayObjectContainer();
            citygroup.width = 220;
            citygroup.height = 150;
            view.addChildToContainer(citygroup);
            citygroup.name = "citygroup" + i;
            var ordercityinfo = view.vo.getOrderCityInfo(i);
            var cityid = ordercityinfo ? ordercityinfo.targetcity : 0;
            var targetkingdom = ordercityinfo ? ordercityinfo.targetkingdom : 1;
            var descbg = BaseBitmap.create("threekingdomsrectbg1");
            descbg.width = 220;
            descbg.height = 50;
            descbg.name = "descbg" + i;
            citygroup.addChild(descbg);
            citygroup.addTouchTap(function () {
                if (GameData.serverTime < st) {
                    //打开选择弹窗
                    ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSORDERCITYSELECTVIEW, {
                        aid: view.aid,
                        code: view.code,
                        selectcity: cityid,
                        selectkingdom: ordercityinfo ? ordercityinfo.targetkingdom : 0,
                        id: i
                    });
                }
                else {
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsmeetingtip14", code)));
                }
            }, view);
            var start = view.vo.activeSt + (week - 1) * (7 * 86400);
            var unit = cfg.activeTime[(i % 2 == 1 ? 3 : 4) - 1];
            var tmp = i < 3 ? 6 : 7;
            var st = start + (tmp - 1) * 86400 + unit.popularityRange[0] * 3600;
            var et = start + (tmp - 1) * 86400 + unit.popularityRange[1] * 3600;
            var timeparam = App.DateUtil.getFormatBySecond(st, 15) + "-" + App.DateUtil.getFormatBySecond(et, 15);
            var descTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsmeetingtip13", code), [i.toString(), timeparam]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            descTxt.lineSpacing = 6;
            descTxt.textAlign = egret.HorizontalAlign.CENTER;
            citygroup.addChild(descTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descbg);
            var city = BaseBitmap.create("threekingdoms" + targetkingdom + "city" + 4);
            citygroup.addChild(city);
            city.name = "city" + i;
            city.anchorOffsetX = city.width / 2;
            city.x = 110;
            var font = BaseBitmap.create("threekingdomsfont" + targetkingdom);
            citygroup.addChild(font);
            font.name = "font" + i;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, font, city, [-16, 0]);
            var stateflag = BaseBitmap.create("");
            citygroup.addChild(stateflag);
            stateflag.name = "stateflag" + i;
            var namebg = BaseBitmap.create("public_itemtipbg2");
            var nameTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdoms" + targetkingdom + "City" + (cityid + 3 - (Math.ceil(cityid / 2) - 1) * 2) + "Name", code)), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            namebg.width = nameTxt.width + 40;
            citygroup.addChild(namebg);
            namebg.name = "namebg" + i;
            nameTxt.name = "nameTxt" + i;
            citygroup.addChild(nameTxt);
            if (ordercityinfo) {
                font.visible = stateflag.visible = true;
                var cityid_1 = ordercityinfo.targetcity;
                App.DisplayUtil.changeToNormal(city);
                city.setRes("threekingdoms" + ordercityinfo.targetkingdom + "city" + (cityid_1 + 3 - (Math.ceil(cityid_1 / 2) - 1) * 2));
                font.setRes("threekingdomsfont" + ordercityinfo.targetkingdom);
                nameTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdoms" + ordercityinfo.targetkingdom + "City" + (cityid_1 + 3 - (Math.ceil(cityid_1 / 2) - 1) * 2) + "Name", code));
            }
            else {
                nameTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsmeetingtip19", code));
                App.DisplayUtil.changeToBlack(city);
                font.visible = false;
                stateflag.visible = false;
                if (GameData.serverTime >= et) {
                    namebg.visible = nameTxt.visible = false;
                    stateflag.visible = true;
                }
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, city, descbg, [0, descbg.height]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, stateflag, city, [-16, 0]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, namebg, city);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, namebg);
            citygroup.setPosition(bg.x + (i & 1 ? 40 : 290), bg.y + (i - 1) * 90 + 10);
        };
        for (var i = 1; i < 5; ++i) {
            _loop_1(i);
        }
        var tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsmeetingtip12", code)), 20, TextFieldConst.COLOR_BROWN);
        view.addChildToContainer(tipTxt2);
        tipTxt2.lineSpacing = 6;
        tipTxt2.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt2, bg, [0, bg.height + 12]);
        var btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "confirmBtn", function () {
            view.hide();
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, tipTxt2, [0, tipTxt2.textHeight + 7]);
        view.addChildToContainer(btn);
        view.tick();
    };
    AcThreeKingdomsOrderSettingView.prototype.freshCity = function () {
        var view = this;
        var code = view.getUiCode();
        var week = view.vo.getCurWeek();
        for (var i = 1; i < 5; ++i) {
            var citygroup = view.container.getChildByName("citygroup" + i);
            var start = view.vo.activeSt + (week - 1) * (7 * 86400);
            var unit = view.cfg.activeTime[(i % 2 == 1 ? 3 : 4) - 1];
            var tmp = i < 3 ? 6 : 7;
            var st = start + (tmp - 1) * 86400 + unit.popularityRange[0] * 3600;
            var et = start + (tmp - 1) * 86400 + unit.popularityRange[1] * 3600;
            var timeparam = App.DateUtil.getFormatBySecond(st, 15) + "-" + App.DateUtil.getFormatBySecond(et, 15);
            var descbg = citygroup.getChildByName("descbg" + i);
            var city = citygroup.getChildByName("city" + i);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, city, descbg, [0, descbg.height]);
            var font = citygroup.getChildByName("font" + i);
            var stateflag = citygroup.getChildByName("stateflag" + i);
            var state = 1;
            //1未生效 2生效中 3已过期
            if (GameData.serverTime < st) {
                state = 1;
            }
            else if (GameData.serverTime >= st && GameData.serverTime < et) {
                state = 2;
            }
            else if (GameData.serverTime >= et) {
                state = 3;
            }
            if (state > 1) {
                stateflag.setRes("threekingdomsorderstate" + (state == 2 ? 1 : 3));
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, stateflag, city, [-16, 0]);
            var namebg = citygroup.getChildByName("namebg" + i);
            var nameTxt = citygroup.getChildByName("nameTxt" + i);
            var ordercityinfo = view.vo.getOrderCityInfo(i);
            if (ordercityinfo) {
                font.visible = stateflag.visible = true;
                var cityid = ordercityinfo.targetcity;
                App.DisplayUtil.changeToNormal(city);
                city.setRes("threekingdoms" + ordercityinfo.targetkingdom + "city" + (cityid + 3 - (Math.ceil(cityid / 2) - 1) * 2));
                font.setRes("threekingdomsfont" + ordercityinfo.targetkingdom);
                nameTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdoms" + ordercityinfo.targetkingdom + "City" + (cityid + 3 - (Math.ceil(cityid / 2) - 1) * 2) + "Name", code));
            }
            else {
                nameTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsmeetingtip19", code));
                App.DisplayUtil.changeToBlack(city);
                font.visible = false;
                stateflag.visible = false;
                if (GameData.serverTime >= et) {
                    namebg.visible = nameTxt.visible = false;
                    stateflag.visible = true;
                }
            }
            city.anchorOffsetX = city.width / 2;
            city.x = 110;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, font, city, [-16, 0]);
            namebg.width = nameTxt.width + 40;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, namebg, city, [0, -30]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, namebg);
        }
    };
    AcThreeKingdomsOrderSettingView.prototype.tick = function () {
        var view = this;
        view.freshCity();
    };
    AcThreeKingdomsOrderSettingView.prototype.getShowHeight = function () {
        return 750;
    };
    AcThreeKingdomsOrderSettingView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acThreeKingdomsmeetingtip9", this.getUiCode());
    };
    // private attackBack(evt : egret.Event):void{
    //     let view = this;
    //     let code = view.getUiCode();
    //     if(evt.data.ret){
    //         let data = evt.data.data.data;
    //         App.CommonUtil.showTip(LanguageManager.getlocal(`wifeSkillUpdSuccess`));
    //         let info = view.vo.getCityTaskStaus(view.cityId);
    //         let tasklevel = info.level;
    //         let tmp = [];
    //         for(let i in view.cfg.taskList){
    //             tmp.push(view.cfg.taskList[i]);
    //         }
    //         // tmp.sort((a,b)=>{
    //         //     if(a.id == tasklevel){
    //         //         return -1;
    //         //     }
    //         //     else if(b.id == tasklevel){
    //         //         return 1;
    //         //     }
    //         //     else{
    //         //         if(a.id > tasklevel && b.id < tasklevel){
    //         //             return -1;
    //         //         }
    //         //         else if(a.id < tasklevel && b.id > tasklevel){
    //         //             return 1;
    //         //         }
    //         //         else{
    //         //             return a.id - b.id;
    //         //         }
    //         //     }
    //         // });
    //         view._showlist.refreshData(tmp,{
    //             code : view.code,
    //             cityId : view.cityId
    //         });
    //         view._haveTxt.text = Api.playerVoApi.getPlayerGemStr();
    //         App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._haveTxt, view._havebg, [15,0])
    //         if(tasklevel == view.cfg.taskList.length){
    //             view._costIcon.visible = view._upBtn.visible = false;
    //             view._costTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstasktip16`, code));
    //             App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._costTxt, view._bg, [0,view._bg.height+20]);
    //         }
    //     }
    // }
    AcThreeKingdomsOrderSettingView.prototype.dispose = function () {
        var view = this;
        //App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_UPGRADEREWARD, view.attackBack, view);
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsOrderSettingView;
}(PopupView));
__reflect(AcThreeKingdomsOrderSettingView.prototype, "AcThreeKingdomsOrderSettingView");
//# sourceMappingURL=AcThreeKingdomsOrderSettingView.js.map