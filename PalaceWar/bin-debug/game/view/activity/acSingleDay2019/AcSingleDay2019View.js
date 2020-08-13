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
desc : 2019双十一
*/
var AcSingleDay2019View = (function (_super) {
    __extends(AcSingleDay2019View, _super);
    function AcSingleDay2019View() {
        var _this = _super.call(this) || this;
        _this._stop = false;
        _this._btn1 = null;
        _this._btn2 = null;
        _this._btn3 = null;
        _this._btn4 = null;
        _this._btn5 = null;
        return _this;
    }
    Object.defineProperty(AcSingleDay2019View.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019View.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019View.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcSingleDay2019View.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcSingleDay2019View.prototype.getRuleInfo = function () {
        var code = this.getUiCode();
        return "acSingleDay2019Rule-" + code;
    };
    AcSingleDay2019View.prototype.getRuleInfoParam = function () {
        return [
            this.cfg.needGemCost.toString(),
            this.cfg.getMaxRank().toString(),
        ];
    };
    AcSingleDay2019View.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    //背景图名称
    AcSingleDay2019View.prototype.getBgName = function () {
        return null;
    };
    AcSingleDay2019View.prototype.getTitleBgName = function () {
        return null;
    };
    AcSingleDay2019View.prototype.getTitleStr = function () {
        return null;
    };
    // /**
    //  * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
    //  */
    // protected getReportTipData(): { title: { key: string, param?: string[] }, msg: { key: string, param?: string[] } } {
    //     return { title: { key: `acDechuanshidaireporttitle-${this.getUiCode()}` }, msg: { key: `acDechuanshidaireportmsg-${this.getUiCode()}` } };
    // }
    AcSingleDay2019View.prototype.getResourceList = function () {
        var view = this;
        var code = view.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "singleday2019code" + code
        ]);
    };
    AcSingleDay2019View.prototype.getContainerY = function () {
        return 0;
    };
    AcSingleDay2019View.prototype.initView = function () {
        var view = this;
        var code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        view.container.width = view.width;
        view.container.height = view.height;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACDESTORYSAME_MAKELINE, view.makePointLine, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DECHUAN_REMIND), view.attackCallback, view);
        //top背景图
        var topbg = BaseBitmap.create("newsingledaytopbg-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.container, [0, 0], true);
        var midbg = BaseBitmap.create("newsingledaybg-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, midbg, topbg, [0, topbg.height - 50]);
        view.addChildToContainer(midbg);
        view.addChildToContainer(topbg);
        var eff = ComponentManager.getCustomMovieClip("newsingledaytitleeff", 12);
        eff.width = 430;
        eff.height = 250;
        eff.blendMode = egret.BlendMode.ADD;
        eff.playWithTime(-1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, eff, topbg, [0, 170]);
        view.addChildToContainer(eff);
        var bottombg = BaseBitmap.create("newsingledaybottombg-" + code);
        view.addChildToContainer(bottombg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view.container, [0, 0], true);
        var selectbg = BaseBitmap.create("newsingledaybtnselect-" + code);
        var _loop_1 = function (i) {
            var group = new BaseDisplayObjectContainer();
            group.width = 337;
            group.height = 142;
            view.addChildToContainer(group);
            group.setScale(0.9);
            group.x = i & 1 ? 7 : 320;
            group.y = topbg.y + topbg.height + 10 + (i - 1) * 85;
            if (i == 1) {
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, selectbg, group);
            }
            var btn = ComponentManager.getButton("newsingledaybtn" + i + "-" + code, "", function () {
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, selectbg, group);
                ViewController.getInstance().openView(ViewConst.POPUP["ACSINGLEDAY2019DETAILVIEW" + i], {
                    aid: view.aid,
                    code: view.code
                });
            }, view);
            group.addChild(btn);
            view["_btn" + i] = btn;
            var txt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDay2019btn" + i + "-" + code), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, txt, btn, [i & 1 ? 40 : -40, 30]);
            group.addChild(txt);
            var eff_1 = ComponentManager.getCustomMovieClip(i & 1 ? "newsingledaybtnlefteff" : "newsingledaybtnrighteff", 12);
            eff_1.width = i & 1 ? 400 : 420;
            eff_1.height = i & 1 ? 200 : 300;
            eff_1.anchorOffsetX = eff_1.width / 2;
            eff_1.anchorOffsetY = eff_1.height / 2;
            eff_1.blendMode = egret.BlendMode.ADD;
            eff_1.playWithTime(-1);
            eff_1.scaleX = 1.15;
            eff_1.scaleY = 1.2;
            eff_1.x = i & 1 ? 160 : 165;
            eff_1.y = i & 1 ? 66 : 77;
            group.addChild(eff_1);
        };
        for (var i = 1; i < 6; ++i) {
            _loop_1(i);
        }
        view.addChildToContainer(selectbg);
        view.freshView();
    };
    AcSingleDay2019View.prototype.freshView = function () {
        var view = this;
        if (view.vo.getpublicRedhot1()) {
            App.CommonUtil.addIconToBDOC(view._btn1);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._btn1);
        }
        if (view.vo.getpublicRedhot2()) {
            App.CommonUtil.addIconToBDOC(view._btn2);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._btn2);
        }
    };
    AcSingleDay2019View.prototype.tick = function () {
        var view = this;
        var str = view.vo.isInActivity() ? "acLuckyDrawTopTip2-1" : "acLaborDaytime-1";
    };
    AcSingleDay2019View.prototype.hide = function () {
        if (this._stop) {
            return;
        }
        _super.prototype.hide.call(this);
    };
    AcSingleDay2019View.prototype.attackCallback = function (evt) {
        var view = this;
        var data = evt.data.data.data;
        view._stop = false;
        if (data) {
            ViewController.getInstance().openView(ViewConst.POPUP.ACMOTHERDAYREWARDSHOWVIEW, {
                aid: view.aid,
                code: view.code,
                rewards: data.rewards,
                msg: LanguageManager.getlocal("acDechuanshidaitip4-" + this.getUiCode()),
            });
        }
    };
    AcSingleDay2019View.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DECHUAN_REMIND), view.attackCallback, view);
        view._stop = false;
        view._btn1 = null;
        view._btn2 = null;
        view._btn3 = null;
        view._btn4 = null;
        view._btn5 = null;
        _super.prototype.dispose.call(this);
    };
    return AcSingleDay2019View;
}(AcCommonView));
__reflect(AcSingleDay2019View.prototype, "AcSingleDay2019View");
//# sourceMappingURL=AcSingleDay2019View.js.map