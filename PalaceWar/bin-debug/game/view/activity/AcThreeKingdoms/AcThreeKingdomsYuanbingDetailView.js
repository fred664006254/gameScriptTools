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
 * 三国争霸城市援兵详情说明弹窗
 * author qianjun
 */
var AcThreeKingdomsYuanbingDetailView = (function (_super) {
    __extends(AcThreeKingdomsYuanbingDetailView, _super);
    function AcThreeKingdomsYuanbingDetailView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcThreeKingdomsYuanbingDetailView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsYuanbingDetailView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsYuanbingDetailView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsYuanbingDetailView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsYuanbingDetailView.prototype.getUiCode = function () {
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
    Object.defineProperty(AcThreeKingdomsYuanbingDetailView.prototype, "cityId", {
        get: function () {
            return this.param.data.cityId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsYuanbingDetailView.prototype, "kingdomid", {
        get: function () {
            return this.param.data.kingdomid;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsYuanbingDetailView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "titleupgradearrow"
        ]);
    };
    AcThreeKingdomsYuanbingDetailView.prototype.getBgName = function () {
        return "popupview_bg3";
    };
    AcThreeKingdomsYuanbingDetailView.prototype.getCloseBtnName = function () {
        return "popupview_closebtn2";
    };
    AcThreeKingdomsYuanbingDetailView.prototype.initView = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        var code = view.getUiCode();
        var vo = view.vo;
        var cfg = view.cfg;
        //顶部描述
        var descbg = BaseBitmap.create(App.CommonUtil.getResByCode("threekingdomsdescbg", code));
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip32", code)), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt.lineSpacing = 5;
        descTxt.width = 450;
        descbg.width = descTxt.width + 80;
        descbg.height = descTxt.height + 30;
        view.addChildToContainer(descbg);
        view.addChildToContainer(descTxt);
        descbg.x = view.viewBg.x + (view.viewBg.width - descbg.width) / 2;
        descbg.y = 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descbg);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip33", code)), 20, TextFieldConst.COLOR_WARN_GREEN2);
        view.addChildToContainer(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, descbg, [0, descbg.height + 20]);
        tipTxt.addTouchTap(function () {
            //打开加成详情弹窗
            ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSYUANBBUFFPOPUPVIEW, {
                aid: view.aid,
                code: view.code,
            });
        }, view, null);
        var listbg = BaseBitmap.create("public_9_bg4");
        listbg.width = 530;
        listbg.height = 430;
        view.addChildToContainer(listbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, tipTxt, [0, tipTxt.height + 25]);
        var isCentercity = view.kingdomid == 0;
        var armynumArray = [];
        for (var i = 1; i <= 3; i++) {
            armynumArray.push(view.vo.getCityKingdomArmy(view.kingdomid, view.cityId, i));
        }
        armynumArray.sort(function (a, b) {
            return b - a;
        });
        var arr = [{
                id: 1,
                point: view.vo.getCityYuanBingPercent(view.kingdomid, view.cityId, 1, isCentercity)
            }, {
                id: 2,
                point: view.vo.getCityYuanBingPercent(view.kingdomid, view.cityId, 2, isCentercity)
            }, {
                id: 3,
                point: view.vo.getCityYuanBingPercent(view.kingdomid, view.cityId, 3, isCentercity)
            }];
        arr.sort(function (a, b) {
            if (a.point == b.point) {
                return a.id - b.id;
            }
            else {
                return b.point - a.point;
            }
        });
        var uidata = view.kingdomid == 0 ? view.cfg.troop2 : view.cfg.troop1;
        var rankdata = view.kingdomid == 0 ? view.cfg.troopRank2 : view.cfg.troopRank1;
        for (var k = 1; k <= arr.length; ++k) {
            var kingdomid = arr[k - 1].id;
            var armygroup = new BaseDisplayObjectContainer();
            view.addChildToContainer(armygroup);
            armygroup.width = 515;
            armygroup.x = listbg.x + 7.5;
            armygroup.y = listbg.y + 10 + (k - 1) * 140;
            var bg = BaseBitmap.create("public_9_bg94");
            bg.width = 515;
            bg.height = 130;
            armygroup.addChild(bg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, armygroup, [0, 0], true);
            var armyicon = BaseBitmap.create("threekingdomarmyicon" + kingdomid);
            armygroup.addChild(armyicon);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, armyicon, bg, [25, 0]);
            var threekingdomsfont = BaseBitmap.create("threekingdomsfont" + kingdomid);
            armygroup.addChild(threekingdomsfont);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, threekingdomsfont, armyicon, [0, 5]);
            var curlv = 0;
            var add1 = 0;
            var add2 = 0;
            //援军数
            var armynum = view.vo.getCityKingdomArmy(view.kingdomid, view.cityId, kingdomid);
            for (var index = 0; index < uidata.length; index++) {
                var element = uidata[index];
                if (armynum < (element.needNum * 100000000)) {
                    break;
                }
                add1 = element.addAtk;
                ++curlv;
            }
            var yuanbingpercentTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip37", code), [App.StringUtil.changeIntToText(armynum), add1.toString()]), 20, TextFieldConst.COLOR_BROWN);
            armygroup.addChild(yuanbingpercentTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, yuanbingpercentTxt, bg, [0, 40]);
            for (var index = 0; index < rankdata.length; index++) {
                var element = rankdata[index];
                if (armynum < (element.needNum * 100000000)) {
                    break;
                }
                add2 = element["rank" + k];
            }
            var rankStr = String(armynumArray.indexOf(armynum) + 1);
            var armynumTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip38", code), [rankStr, add2.toString()]), 18, TextFieldConst.COLOR_BROWN);
            armygroup.addChild(armynumTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, armynumTxt, yuanbingpercentTxt, [0, yuanbingpercentTxt.textHeight + 12]);
            var arrow = BaseBitmap.create("titleupgradearrow");
            armygroup.addChild(arrow);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, arrow, bg, [100, 0]);
            var totaladd = ComponentManager.getBitmapText("+" + (add1 + add2), TextFieldConst.FONTNAME_ITEMTIP);
            armygroup.addChild(totaladd);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, totaladd, bg, [20, 0]);
        }
    };
    // protected getShowHeight() : number{
    //     return 760;
    // }
    AcThreeKingdomsYuanbingDetailView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acThreeKingdomsTip39", this.getUiCode());
    };
    AcThreeKingdomsYuanbingDetailView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsYuanbingDetailView;
}(PopupView));
__reflect(AcThreeKingdomsYuanbingDetailView.prototype, "AcThreeKingdomsYuanbingDetailView");
//# sourceMappingURL=AcThreeKingdomsYuanbingDetailView.js.map