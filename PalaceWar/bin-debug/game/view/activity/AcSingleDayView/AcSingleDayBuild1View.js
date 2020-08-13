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
var AcSingleDayBuild1View = (function (_super) {
    __extends(AcSingleDayBuild1View, _super);
    function AcSingleDayBuild1View() {
        var _this = _super.call(this) || this;
        _this._bottom = null;
        return _this;
    }
    AcSingleDayBuild1View.prototype.getBgName = function () {
        return "acsingleday_bg" + this.getUiCode();
    };
    AcSingleDayBuild1View.prototype.getUiCode = function () {
        var code = this.param.data.code;
        if (code == "3") {
            return "2";
        }
        return code;
    };
    AcSingleDayBuild1View.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseBitmap.create(bgName);
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.viewBg.y = GameConfig.stageHeigth - 1136;
        }
    };
    AcSingleDayBuild1View.prototype.initView = function () {
        // NetManager.request(NetRequestConst.REQUEST_ITEM_GETMODEL,{});
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.update, this);
        // let tarGroupBg:BaseBitmap = BaseBitmap.create('dragonboattarbg');
        // tarGroupBg.width = view.width;
        // tarGroupBg.height = GameConfig.stageHeigth - view.tabbarGroup.y + 15;
        // view.setLayoutPosition(LayoutConst.horizontalCentertop, tarGroupBg, view, [0, view.titleBg.height - 10]);
        // view.addChild(tarGroupBg);
        // view.swapChildren(view.tabbarGroup, tarGroupBg);
        var topBg = BaseLoadBitmap.create("acmidautumnview_topbg");
        topBg.height = 70;
        topBg.width = 640;
        topBg.setPosition(0, -this.getTabbarGroupY() - this.getContainerY() - 60 - 5 + 14);
        this.addChildToContainer(topBg);
        view.tabbarGroup.y += 2;
        //红点
        view.update();
        view.initBottom();
        // let npc = BaseLoadBitmap.create('wife_full_101');
        // npc.width = 640;
        // npc.height = 840;
        // npc.setScale(0.4);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, npc, view, [0,0]);
        // view.addChildToContainer(npc);
        // view._npc = npc;
    };
    AcSingleDayBuild1View.prototype.clickTabbarHandler = function (data) {
        var view = this;
        var viewBg = view.viewBg;
        viewBg.setRes(data.index == 0 ? "acsingleday_bg" + this.getUiCode : "public_9_bg40");
        _super.prototype.clickTabbarHandler.call(this, data);
    };
    Object.defineProperty(AcSingleDayBuild1View.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDayBuild1View.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDayBuild1View.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    // protected getRequestData():{requestType:string,requestData:any}
    // {
    // 	return {requestType:NetRequestConst.REQUEST_ITEM_GETMODEL,requestData:{}};
    // }
    // protected getRuleInfo():string
    // {
    // 	return "itemRuleInfo";
    // }
    AcSingleDayBuild1View.prototype.getTitleStr = function () {
        return "buildtxt1_" + this.getUiCode();
    };
    AcSingleDayBuild1View.prototype.getRuleInfo = function () {
        return "acSingleDayRuleInfo-" + this.getUiCode();
    };
    AcSingleDayBuild1View.prototype.getRuleInfoParam = function () {
        var vo = this.vo;
        var cfg = this.cfg;
        return [
            (cfg.startTime / 3600).toString(),
            ((cfg.startTime + cfg.luckyPacketCD) / 3600).toString(),
            String(cfg.luckyPacketPurchase / 3600),
            cfg.couponLimit.toString()
        ];
    };
    AcSingleDayBuild1View.prototype.getResourceList = function () {
        var list = [];
        if (this.getUiCode() == "2") {
            list = [
                "acsingleday_tokenicon-" + this.getUiCode(),
            ];
        }
        return _super.prototype.getResourceList.call(this).concat([
            "common_shopmark", "rechargevie_db_01", "itemview_daoju_bg01", "itemview_daoju_bg02", "itemview_daoju_bg03", "itembg_0", "progress7", "progress7_bg", "signin_had_get", "progress7_2",
            "acsingleday_cdbg", "acsingleday_couponIcon", "acsingleday_cd_num1", "acsingleday_cd_num2", "acsingleday_cd_num3", "acsingledayredpt", "dragonboattarbg",
            "tailor_get_light", "acmidautumnview_topbg", "acsingledayline", "acsearchproofview_common_skintxt"
        ]).concat(list);
    };
    AcSingleDayBuild1View.prototype.update = function () {
        //第一页 红点
        var vo = this.vo;
        var view = this;
        if (!vo) {
            return;
        }
        //红点
        for (var i = 1; i < 4; ++i) {
            if (vo["getpublicRedhot" + i]()) {
                this.tabbarGroup.addRedPoint(i - 1);
            }
            else {
                this.tabbarGroup.removeRedPoint(i - 1);
            }
        }
    };
    AcSingleDayBuild1View.prototype.tick = function () {
        var view = this;
        view.update();
    };
    //创建底部通用切换按钮，由 initBottom，bottomBtnHandler 两个接口一起完成
    AcSingleDayBuild1View.prototype.initBottom = function () {
        var btNode = new AcSingleDayBottomNode({ selectIdx: 1, switchCallback: this.bottomBtnHandler, callbackOgj: this });
        btNode.y = -this.container.y;
        this.addChildToContainer(btNode);
        this._bottom = btNode;
    };
    AcSingleDayBuild1View.prototype.bottomBtnHandler = function (index) {
        if (index == 1) {
            return;
        }
        else if (index == 2) {
            ViewController.getInstance().openView(ViewConst.COMMON.ACSINGLEDAYSKINVIEW, {
                code: this.param.data.code,
                aid: this.param.data.aid
            });
        }
        else if (index == 3) {
            ViewController.getInstance().openView(ViewConst.COMMON.ACSINGLEDAYBUILD3VIEW, {
                code: this.param.data.code,
                aid: this.param.data.aid
            });
        }
        this.hide();
    };
    AcSingleDayBuild1View.prototype.getTabbarTextArr = function () {
        return ["buildtxt1Tab1_" + this.getUiCode(), "buildtxt1Tab2_" + this.getUiCode(), "buildtxt1Tab3_" + this.getUiCode(), "buildtxt1Tab4_" + this.getUiCode()];
    };
    AcSingleDayBuild1View.prototype.checkRedPoint = function () {
        if (Api.itemVoApi.checkRedPoint()) {
            this.tabbarGroup.addRedPoint(1);
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ITEM_DOCOMPOSE,this.checkRedPoint,this);
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ITEM_GETCOMPOSE,this.checkRedPoint,this);
    };
    AcSingleDayBuild1View.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.update, this);
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ITEM_DOCOMPOSE,this.checkRedPoint,this);
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ITEM_GETCOMPOSE,this.checkRedPoint,this);
        _super.prototype.dispose.call(this);
    };
    return AcSingleDayBuild1View;
}(CommonView));
__reflect(AcSingleDayBuild1View.prototype, "AcSingleDayBuild1View");
//# sourceMappingURL=AcSingleDayBuild1View.js.map