/**
 * 财神驾到
 * author qianjun
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
var AcTreasureHuntWealthSucView = (function (_super) {
    __extends(AcTreasureHuntWealthSucView, _super);
    function AcTreasureHuntWealthSucView() {
        return _super.call(this) || this;
    }
    AcTreasureHuntWealthSucView.prototype.getResourceList = function () {
        var rewardPic = _super.prototype.getResourceList.call(this);
        return rewardPic.concat([
            "caishen_tex_png", "caishen_tex_json", "caishen_ske"
        ]);
    };
    Object.defineProperty(AcTreasureHuntWealthSucView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureHuntWealthSucView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcTreasureHuntWealthSucView.prototype.getTitleBgName = function () {
        return null;
    };
    AcTreasureHuntWealthSucView.prototype.getTitleStr = function () {
        return null;
    };
    AcTreasureHuntWealthSucView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    Object.defineProperty(AcTreasureHuntWealthSucView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureHuntWealthSucView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcTreasureHuntWealthSucView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AcTreasureHuntWealthSucView.prototype.isShowMask = function () {
        return true;
    };
    AcTreasureHuntWealthSucView.prototype.initView = function () {
        var view = this;
        view.addTouchTap(view.hide, view);
        var title = BaseBitmap.create("treasurewealthtitle-" + view.code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, title, view, [0, 150]);
        view.addChild(title);
        if (App.CommonUtil.check_dragon()) {
            var dgbone_1 = App.DragonBonesUtil.getLoadDragonBones('caishen', -1, 'guanghuan1');
            dgbone_1.setAnchorOffset(-240, -150);
            dgbone_1.x = 70;
            dgbone_1.y = 323;
            //App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, dgbone, title, [0,title.height + 85]);
            dgbone_1.playDragonMovie('guanghuan1', 1);
            dgbone_1.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function () {
                dgbone_1.playDragonMovie('guanghuan2', 0);
            }, view);
            view.addChild(dgbone_1);
            var dgbone2_1 = App.DragonBonesUtil.getLoadDragonBones('caishen', -1, 'jinbi1');
            dgbone2_1.setAnchorOffset(-240, -150);
            dgbone2_1.x = 70;
            dgbone2_1.y = 323;
            dgbone2_1.playDragonMovie('jinbi1', 1);
            dgbone2_1.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function () {
                dgbone2_1.playDragonMovie('jinbi2', 0);
            }, view);
            view.addChild(dgbone2_1);
            var dgbone3_1 = App.DragonBonesUtil.getLoadDragonBones('caishen', -1, 'juese1');
            dgbone3_1.setAnchorOffset(-240, -150);
            //App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, dgbone3, title, [0,title.height + 85]);
            dgbone3_1.x = 70;
            dgbone3_1.y = 323;
            dgbone3_1.playDragonMovie('juese1', 1);
            dgbone3_1.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function () {
                dgbone3_1.playDragonMovie('juese2', 0);
            }, view);
            view.addChild(dgbone3_1);
            // guanghuan1          光环出现
            // guanghuan2          光环循环
            // jinbi1                     金币出现
            // jinbi2                     金币循环
            // juese1                    角色出现
            // juese2                    角色循环
        }
        else {
        }
        var tipBg = BaseBitmap.create("public_9_bg15");
        tipBg.width = 360;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipBg, title, [0, title.height + 450]);
        view.addChild(tipBg);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acTreasureWealthTip1-" + view.code, [view.cfg.wealthGodTimes.toString()]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipBg);
        view.addChild(tipTxt);
    };
    AcTreasureHuntWealthSucView.prototype.sureBtnClick = function () {
        ViewController.getInstance().hideAllView();
        // ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
    };
    AcTreasureHuntWealthSucView.prototype.noBtnClick = function () {
        this.hide();
        // ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
    };
    AcTreasureHuntWealthSucView.prototype.touchTap = function () {
        this.hide();
    };
    AcTreasureHuntWealthSucView.prototype.hide = function () {
        _super.prototype.hide.call(this);
        if (this.param.data && this.param.data.confirmCallback) {
            this.param.data.confirmCallback.apply(this.param.data.handler, []);
        }
    };
    AcTreasureHuntWealthSucView.prototype.dispose = function () {
        this.removeTouchTap();
        _super.prototype.dispose.call(this);
    };
    return AcTreasureHuntWealthSucView;
}(BaseView));
__reflect(AcTreasureHuntWealthSucView.prototype, "AcTreasureHuntWealthSucView");
//# sourceMappingURL=AcTreasureHuntWealthSucView.js.map