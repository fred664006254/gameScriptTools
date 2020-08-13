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
var AcJarukaiDetailInfoView = (function (_super) {
    __extends(AcJarukaiDetailInfoView, _super);
    function AcJarukaiDetailInfoView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcJarukaiDetailInfoView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcJarukaiDetailInfoView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcJarukaiDetailInfoView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcJarukaiDetailInfoView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcJarukaiDetailInfoView.prototype.getUiCode = function () {
        return this.code;
    };
    AcJarukaiDetailInfoView.prototype.initView = function () {
        var view = this;
        var sid = 1;
        var uicode = view.getUiCode();
        var arr = [2015, 2016, 2017, 2018, 2014];
        var cfg = Config.ServantCfg.getServantItemById(arr[sid - 1]);
        var npc = BaseLoadBitmap.create(cfg.fullIcon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, npc, view, [0, 190]);
        view.addChild(npc);
        var namebg = BaseBitmap.create(App.CommonUtil.getResByCode("jurakudainamebg", uicode));
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, namebg, view, [78, 161]);
        view.addChild(namebg);
        var nameTxt = ComponentManager.getTextField(cfg.name, 28, 0xFFF0BB);
        nameTxt.width = 28;
        nameTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, namebg, [0, 0]);
        view.addChild(nameTxt);
        var tag = BaseLoadBitmap.create("servant_qualitytag" + cfg.quality);
        tag.width = 148;
        tag.height = 230;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tag, view, [4, 99]);
        view.addChild(tag);
        var bg = BaseBitmap.create(App.CommonUtil.getResByCode("jurakudaipopbg", uicode));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, npc, [0, npc.height]);
        view.addChild(bg);
        var leftbtn = ComponentManager.getButton(App.CommonUtil.getResByCode("jurakudaiarrow", uicode), '', function () {
            --sid;
            if (sid < 1) {
                sid = 5;
            }
            var tmpcfg = Config.ServantCfg.getServantItemById(arr[sid - 1]);
            npc.setload(tmpcfg.fullIcon);
            nameTxt.text = cfg.name;
        }, view);
        leftbtn.anchorOffsetX = leftbtn.width / 2;
        leftbtn.scaleX = -1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.left, leftbtn, view, [27]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.verticalCenter, leftbtn, npc, [0, 0]);
        view.addChild(leftbtn);
        var rightbtn = ComponentManager.getButton(App.CommonUtil.getResByCode("jurakudaiarrow", uicode), '', function () {
            ++sid;
            if (sid > 5) {
                sid = 1;
            }
            var tmpcfg = Config.ServantCfg.getServantItemById(arr[sid - 1]);
            npc.setload(tmpcfg.fullIcon);
            nameTxt.text = cfg.name;
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.right, rightbtn, view, [27]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.verticalCenter, rightbtn, npc, [0, 0]);
        view.addChild(rightbtn);
    };
    AcJarukaiDetailInfoView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "commonview_woodbg", "shopview_redbg"
        ]);
    };
    AcJarukaiDetailInfoView.prototype.getTitleStr = function () {
        return null;
    };
    AcJarukaiDetailInfoView.prototype.getBgName = function () {
        return null;
    };
    AcJarukaiDetailInfoView.prototype.getTitleBgName = function () {
        return null;
    };
    AcJarukaiDetailInfoView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcJarukaiDetailInfoView;
}(PopupView));
__reflect(AcJarukaiDetailInfoView.prototype, "AcJarukaiDetailInfoView");
