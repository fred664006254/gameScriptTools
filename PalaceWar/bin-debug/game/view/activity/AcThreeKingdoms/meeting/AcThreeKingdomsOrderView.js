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
 * 三国争霸军令弹窗
 * author qianjun
 */
var AcThreeKingdomsOrderView = (function (_super) {
    __extends(AcThreeKingdomsOrderView, _super);
    function AcThreeKingdomsOrderView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcThreeKingdomsOrderView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsOrderView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsOrderView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsOrderView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsOrderView.prototype.getUiCode = function () {
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
    AcThreeKingdomsOrderView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "public_textbrownbg",
        ]);
    };
    AcThreeKingdomsOrderView.prototype.getBgName = function () {
        return "threekingdomsorderbg";
    };
    AcThreeKingdomsOrderView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcThreeKingdomsOrderView.prototype.initView = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        if (view.vo.getTodayWeek() > 5 && view.vo.getMyKingdoms() && view.vo.getCurPeriod() == 2 && view.vo.isInWarTime() && view.vo.getCurWarPeriod() > 0 && view.vo.getCurWarPeriod() < 3) {
            var info = view.vo.getOrderInfo();
            if (info.state == 2) {
                var key = ServerCfg.selectServer.zid + "_pId_" + Api.playerVoApi.getPlayerID() + AcConst.AID_THREEKINGDOMS + "order" + view.vo.getCurWeek() + view.vo.getTodayWeek() + view.vo.getCurWarPeriod();
                var value = LocalStorageManager.get(key);
                if (!value) {
                    LocalStorageManager.set(key, "1");
                }
            }
        }
        var code = view.getUiCode();
        var vo = view.vo;
        var cfg = view.cfg;
        var title = BaseBitmap.create("threekingdomsordertitle");
        view.addChildToContainer(title);
        title.setPosition(view.viewBg.x + (view.viewBg.width - title.width) / 2, 0);
        //顶部描述
        var week = view.vo.getCurWeek();
        var end = view.vo.activeSt + 1 * (7 * 86400);
        var descbg = BaseBitmap.create("public_textbrownbg");
        var str = "";
        var color;
        var minfo = view.vo.getOfficalInfo(1);
        if (week >= 2) {
            if (minfo) {
                str = minfo.name;
            }
            else {
                str = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsmeetingtip2", code));
            }
        }
        else {
            str = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsmeetingtip1", code), [App.DateUtil.getFormatBySecond(end, 7)]);
        }
        var topTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsmeetingtip3", code), [str]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        topTxt.lineSpacing = 5;
        descbg.width = topTxt.width + 100;
        view.addChildToContainer(descbg);
        view.addChildToContainer(topTxt);
        descbg.x = view.viewBg.x + (view.viewBg.width - descbg.width) / 2;
        descbg.y = 110;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, topTxt, descbg);
        //头像框信息
        var headContainer = null;
        var orderinfo = view.vo.getOrderInfo();
        if (minfo && orderinfo.state == 2) {
            headContainer = Api.playerVoApi.getPlayerCircleHead(Number(minfo.pic), (minfo.ptitleid));
            headContainer.setScale(1);
            headContainer.setPosition(60, 160);
            view.addChildToContainer(headContainer);
        }
        //未发布
        var tipstr = '';
        var param = [];
        var width = 0;
        var cityid = orderinfo.targetcity;
        if (orderinfo.state == 1) {
            tipstr = "acThreeKingdomsmeetingtip4";
        }
        else {
            tipstr = "acThreeKingdomsmeetingtip5";
            width = 400;
            param = [
                LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTeam" + orderinfo.targetkingdom, code)),
                LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdoms" + orderinfo.targetkingdom + "City" + (cityid + 3 - (Math.ceil(cityid / 2) - 1) * 2) + "Name", code)),
            ];
            var line = BaseBitmap.create("public_cut_line");
            view.addChildToContainer(line);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, descbg, [0, descbg.height + 110]);
            //第一场攻城战中（xx-xx）
            //本周周一0点
            var start = view.vo.activeSt + (week - 1) * (7 * 86400);
            var round = orderinfo.targetround;
            var unit = cfg.activeTime[(round == 1 ? 3 : 4) - 1];
            var st = start + (orderinfo.targetweekday - 1) * 86400 + unit.popularityRange[0] * 3600;
            var et = start + (orderinfo.targetweekday - 1) * 86400 + unit.popularityRange[1] * 3600;
            var timeparam = App.DateUtil.getFormatBySecond(st, 15) + "-" + App.DateUtil.getFormatBySecond(et, 15);
            var desctxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsmeetingtip6", code), [orderinfo.targetnum, timeparam, LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdoms" + orderinfo.targetkingdom + "City" + (cityid + 3 - (Math.ceil(cityid / 2) - 1) * 2) + "Name", code)), (view.cfg.order * 100).toFixed(0)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            desctxt.lineSpacing = 6;
            desctxt.textAlign = egret.HorizontalAlign.CENTER;
            view.addChildToContainer(desctxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, desctxt, line, [0, line.height + 10]);
        }
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(tipstr, code), param), 20);
        view.addChildToContainer(tipTxt);
        tipTxt.lineSpacing = 6;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        if (width) {
            tipTxt.width = width;
        }
        if (headContainer) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, headContainer, [headContainer.width, 7]);
        }
        else {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, descbg, [0, descbg.height + 30]);
        }
        //自己是大都督
        if (minfo && minfo.uid == Api.playerVoApi.getPlayerID()) {
            var btn_1 = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "acThreeKingdomsmeetingtip9-" + code, function () {
                if (view.vo.getCurPeriod() == 3) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acThreeKingdomsEnter4-1"));
                    return;
                }
                //发布
                App.CommonUtil.removeIconFromBDOC(btn_1);
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSORDERSETTINGVIEW, {
                    aid: view.aid,
                    code: view.code
                });
            }, view);
            view.addChildToContainer(btn_1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn_1, descbg, [0, descbg.height + 220]);
            if (view.vo.getTodayWeek() > 5) {
                var localkey = Api.playerVoApi.getPlayerID() + "-" + view.vo.st + "-" + view.vo.getCurWeek() + "-" + view.vo.getCurWarPeriod();
                var timeStr = LocalStorageManager.get(localkey);
                if (timeStr && timeStr != "") {
                    LocalStorageManager.set(localkey, "true");
                    App.CommonUtil.addIconToBDOC(btn_1);
                }
            }
        }
        else {
            var str_1 = '';
            if (view.vo.isInActivity()) {
                str_1 = "acThreeKingdomsmeetingtip7";
            }
            else {
                str_1 = "acThreeKingdomsmeetingtip8";
            }
            var btipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(str_1, code)), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            view.addChildToContainer(btipTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btipTxt, descbg, [0, descbg.height + 220]);
        }
    };
    AcThreeKingdomsOrderView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        var zhangyin = BaseBitmap.create("threekingdomsorderzhang");
        this.addChild(zhangyin);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, zhangyin, this.viewBg, [40, 18]);
    };
    AcThreeKingdomsOrderView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AcThreeKingdomsOrderView.prototype.getTitleStr = function () {
        return null;
    };
    AcThreeKingdomsOrderView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsOrderView;
}(PopupView));
__reflect(AcThreeKingdomsOrderView.prototype, "AcThreeKingdomsOrderView");
//# sourceMappingURL=AcThreeKingdomsOrderView.js.map