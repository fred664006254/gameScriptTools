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
        _this.public_dot1 = null;
        _this.public_dot2 = null;
        _this.public_dot3 = null;
        _this._suffix = "1"; //this.param.data.code;
        return _this;
    }
    AcSingleDayBuild1View.prototype.init = function () {
        var code = this.param.data.code;
        if (Number(code) <= 4) {
            this._suffix = "1"; //;
        }
        else {
            this._suffix = code;
        }
        _super.prototype.init.call(this);
    };
    AcSingleDayBuild1View.prototype.getBgName = function () {
        return "acsingleday_bg" + this._suffix;
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
    //创建底部通用切换按钮，由 initBottom，bottomBtnHandler 两个接口一起完成
    AcSingleDayBuild1View.prototype.initBottom = function () {
        var btNode = new AcSingleDayBottomNode({ selectIdx: 1, switchCallback: this.bottomBtnHandler, callbackOgj: this });
        btNode.y = -this.container.y;
        this.addChildToContainer(btNode);
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
    AcSingleDayBuild1View.prototype.initView = function () {
        // NetManager.request(NetRequestConst.REQUEST_ITEM_GETMODEL,{});
        var view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        //红点
        for (var i = 1; i < 4; ++i) {
            var public_dot = BaseBitmap.create("public_dot2");
            view.addChild(public_dot);
            public_dot.x = view.tabbarGroup.getChildAt(i + 1).x + this.tabbarGroup.getChildAt(i + 1).width - 10;
            public_dot.y = view.tabbarGroup.y + 10;
            view["public_dot" + i] = public_dot;
        }
        view.update();
        view.initBottom();
        // let npc = BaseLoadBitmap.create('wife_full_101');
        // npc.width = 640;
        // npc.height = 840;
        // npc.setScale(0.4);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, npc, view, [0,0]);
        // view.addChildToContainer(npc);
        // view._npc = npc;
        if (PlatformManager.checkHideIconByIP()) {
            this.tabbarGroup.setLocked(1, true);
        }
    };
    // (有页签加锁时，需要重新该方法)检查该页签条件是否满足切换条件
    AcSingleDayBuild1View.prototype.checkTabCondition = function (index) {
        if (index == 1 && PlatformManager.checkHideIconByIP()) {
            return false;
        }
        return true;
    };
    AcSingleDayBuild1View.prototype.clickTabbarHandler = function (data) {
        var view = this;
        var viewBg = view.viewBg;
        viewBg.setRes(data.index == 0 ? "acsingleday_bg" + this._suffix : "public_9_bg20");
        if (data.index > 0) {
            viewBg.height = 1136;
        }
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
        return "buildtxt1_" + this._suffix;
    };
    AcSingleDayBuild1View.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "common_shopmark", "rechargevie_db_01", "itemview_daoju_bg01", "itemview_daoju_bg02", "itemview_daoju_bg03", "itembg_0", "progress_type3_bg", "progress_type1_yellow2", "collectflag",
            "acsingleday_cdbg", "acsingleday_couponIcon", "acsingleday_cd_num1", "acsingleday_cd_num2", "acsingleday_cd_num3", "acsingledayredpt"
        ]);
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
            view["public_dot" + i].visible = vo["getpublicRedhot" + i]();
        }
    };
    AcSingleDayBuild1View.prototype.tick = function () {
        var view = this;
        view.update();
    };
    AcSingleDayBuild1View.prototype.getTabbarTextArr = function () {
        return ["buildtxt1Tab1_" + this._suffix, "buildtxt1Tab2_" + this._suffix, "buildtxt1Tab3_" + this._suffix, "buildtxt1Tab4_" + this._suffix];
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
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        view.public_dot1 = null;
        view.public_dot2 = null;
        view.public_dot3 = null;
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ITEM_DOCOMPOSE,this.checkRedPoint,this);
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ITEM_GETCOMPOSE,this.checkRedPoint,this);
        this._suffix = null;
        _super.prototype.dispose.call(this);
    };
    return AcSingleDayBuild1View;
}(CommonView));
__reflect(AcSingleDayBuild1View.prototype, "AcSingleDayBuild1View");
