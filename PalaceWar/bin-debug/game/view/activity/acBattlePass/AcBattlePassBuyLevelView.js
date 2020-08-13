/**
 * 励精图治 购买等级
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
var AcBattlePassBuyLevelView = (function (_super) {
    __extends(AcBattlePassBuyLevelView, _super);
    function AcBattlePassBuyLevelView() {
        var _this = _super.call(this) || this;
        _this._buyLvTxt = null;
        return _this;
    }
    Object.defineProperty(AcBattlePassBuyLevelView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassBuyLevelView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassBuyLevelView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassBuyLevelView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassBuyLevelView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattlePassBuyLevelView.prototype.getRuleBtnName = function () {
        return ButtonConst.BTN2_RULE;
    };
    AcBattlePassBuyLevelView.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            case 2:
                code = '1';
                break;
            case 7:
                code = '4';
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcBattlePassBuyLevelView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "countrywarrewardview_itembg"
        ]);
    };
    AcBattlePassBuyLevelView.prototype.getTitleStr = function () {
        var view = this;
        var code = view.getUiCode();
        return App.CommonUtil.getCnByCode("acBattlePassBuyLevelTitle", code);
    };
    AcBattlePassBuyLevelView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEPASS_BUYLV), view.buyCallback, view);
        var code = view.getUiCode();
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassTip6", code)), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        tipTxt.lineSpacing = 5;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, view.viewBg, [0, 20]);
        view.addChildToContainer(tipTxt);
        var tmpY = 0;
        if (this.cfg.lvLimit) {
            var tipbg = BaseBitmap.create("countrywarrewardview_itembg");
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipbg, tipTxt, [0, tipTxt.textHeight + 5]);
            view.addChildToContainer(tipbg);
            var buyTipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(view.vo.getCurBuyLevelNum() < view.cfg.lvLimit ? "battlepasscanbuy" : "battlepasscanbuymax", code), [view.vo.getCurBuyLevelNum().toString(), view.cfg.lvLimit.toString()]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, buyTipTxt, tipbg);
            view.addChildToContainer(buyTipTxt);
            view._buyLvTxt = buyTipTxt;
            tmpY = tipbg.height + 10;
        }
        var rankBg = BaseBitmap.create("public_9_probiginnerbg");
        rankBg.width = 540;
        rankBg.height = 250;
        rankBg.setPosition(view.viewBg.width / 2 - rankBg.width / 2, tipTxt.y + tipTxt.textHeight + 10 + tmpY);
        view.addChildToContainer(rankBg);
        var curBattleLevel = view.vo.getMyBattleLevel();
        /*
        --战令分级显示
        --open:是否开启政令版本(1-开启，0不开启)
        --unlockBP:解锁的战令。Primary-初级。Intermediate-中级。Advanced-高级
        --unlockRecharge:解锁充值。玩家购买advanced后直接解锁intermediate
        --lvAdd:购买后直接赠送等级
        --unlockTask:open=1时，开放的任务
        **/
        // let arr = [1, 10, 20, 30];
        // let recharge = [`g1`, `g2`, `g3`, `g4`];
        var arr = view.cfg.getBattleCostArr();
        var _loop_1 = function (i) {
            var num = arr[i].lvAdd;
            var bg = BaseBitmap.create(App.CommonUtil.getResByCode("battlepassbuylevelbg", code));
            view.setLayoutPosition(LayoutConst.lefttop, bg, rankBg, [8 + (Number(i) * (bg.width)), 7]);
            view.addChildToContainer(bg);
            var tipTxt_1 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassLevelUp", code), ["" + num]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            view.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt_1, bg, [0, 20]);
            view.addChildToContainer(tipTxt_1);
            var icon = BaseBitmap.create(App.CommonUtil.getResByCode("battlepassbuylevel" + (Number(i) + 1), code));
            view.setLayoutPosition(LayoutConst.horizontalCenterbottom, icon, bg, [0, 25]);
            view.addChildToContainer(icon);
            var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "", function () {
                //购买
                if (!view.vo.isInActivity()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal('acBattlePassTimeEnd'));
                    return;
                }
                if (Api.playerVoApi.getPlayerGem() < Number(arr[i].cost)) {
                    App.CommonUtil.showTip(LanguageManager.getlocal('practice_batchBuyNotenoughdes'));
                    return;
                }
                var index = arr[i].index;
                var curBuylevel = view.vo.getCurBuyLevelNum();
                if (view.cfg.lvLimit > 0 && view.vo.getCurBuyLevelNum() >= view.cfg.lvLimit) {
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("battlepasscanbuymax2", code)));
                    return;
                }
                var curLevel = view.vo.getLevel();
                if (curLevel >= view.cfg.maxlevel) {
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassMaxLevel", code)));
                    return;
                }
                var tmp = curLevel + num - view.cfg.maxlevel;
                var tmp2 = view.cfg.lvLimit > 0 ? (curBuylevel + num - view.cfg.lvLimit) : 0;
                var tmp3 = view.cfg.lvLimit - curBuylevel;
                var tmp4 = view.cfg.maxlevel - curLevel;
                var showMaxLeveltip = false;
                var showBuyLeveltip = false;
                if (tmp > 0 && tmp2 > 0) {
                    showBuyLeveltip = tmp3 <= tmp4;
                    showMaxLeveltip = tmp4 < tmp3;
                }
                else if (tmp > 0) {
                    showMaxLeveltip = true;
                }
                else if (tmp2 > 0) {
                    showBuyLeveltip = true;
                }
                var msg = "";
                if (showMaxLeveltip) {
                    msg = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassTip7", code), ["" + view.cfg.maxlevel, "" + tmp]);
                }
                else if (showBuyLeveltip) {
                    msg = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassTip18", code), [tmp3.toString(), tmp2.toString(), (curLevel + num - tmp2).toString()]);
                }
                else {
                    msg = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassTip17", code), [arr[i].cost.toString(), num.toString()]);
                }
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: msg,
                    title: "itemUseConstPopupViewTitle",
                    touchMaskClose: true,
                    callback: function () {
                        if (!view.vo.isInActivity()) {
                            App.CommonUtil.showTip(LanguageManager.getlocal('acBattlePassTimeEnd'));
                            return;
                        }
                        //购买
                        NetManager.request(NetRequestConst.REQUEST_BATTLEPASS_BUYLV, {
                            activeId: view.acTivityId,
                            shownum: index
                        });
                    },
                    handle: view,
                    needClose: 1,
                    needCancel: true
                });
            }, view);
            btn.name = "btn" + i;
            btn.setText(arr[i].cost, false);
            btn.addTextIcon("public_icon1");
            view.addChildToContainer(btn);
            view.setLayoutPosition(LayoutConst.horizontalCentertop, btn, bg, [0, bg.height + 10]);
            if (view.cfg.lvLimit > 0 && view.vo.getCurBuyLevelNum() >= view.cfg.lvLimit) {
                btn.setGray(true);
            }
        };
        for (var i in arr) {
            _loop_1(i);
        }
        var tip2Txt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassTip8", code)), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        tip2Txt.lineSpacing = 5;
        tip2Txt.textAlign = egret.HorizontalAlign.CENTER;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, tip2Txt, rankBg, [0, rankBg.height + 20]);
        view.addChildToContainer(tip2Txt);
    };
    AcBattlePassBuyLevelView.prototype.buyCallback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            if (evt.data.data.ret >= 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal('allianceTaskBuffBuyTip2'));
            }
            if (view._buyLvTxt) {
                view._buyLvTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(view.vo.getCurBuyLevelNum() < view.cfg.lvLimit ? "battlepasscanbuy" : "battlepasscanbuymax", this.getUiCode()), [view.vo.getCurBuyLevelNum().toString(), view.cfg.lvLimit.toString()]);
            }
            var arr = view.cfg.getBattleCostArr();
            for (var i = 0; i < arr.length; ++i) {
                var btn = view.container.getChildByName("btn" + i);
                if (view.cfg.lvLimit > 0 && view.vo.getCurBuyLevelNum() >= view.cfg.lvLimit) {
                    btn.setGray(true);
                }
            }
        }
    };
    AcBattlePassBuyLevelView.prototype.getShowWidth = function () {
        return 580;
    };
    AcBattlePassBuyLevelView.prototype.getShowHeight = function () {
        return Number(this.cfg.maxlevel) > 0 ? 530 : 490;
    };
    AcBattlePassBuyLevelView.prototype.dispose = function () {
        var view = this;
        view._buyLvTxt = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEPASS_BUYLV), view.buyCallback, view);
        _super.prototype.dispose.call(this);
    };
    return AcBattlePassBuyLevelView;
}(PopupView));
__reflect(AcBattlePassBuyLevelView.prototype, "AcBattlePassBuyLevelView");
//# sourceMappingURL=AcBattlePassBuyLevelView.js.map