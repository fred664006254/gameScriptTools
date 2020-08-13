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
  * 洗澡详情
  * @author jiangliuyang
  * date 2019/4/1
  * @class AcLanternDetailPopupView
  */
var AcLanternDetailPopupView = (function (_super) {
    __extends(AcLanternDetailPopupView, _super);
    function AcLanternDetailPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcLanternDetailPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLanternDetailPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 重写 初始化viewbg
     *
     */
    AcLanternDetailPopupView.prototype.initBg = function () {
        this.viewBg = BaseLoadBitmap.create(this.getDefaultRes("acwifebathingview_detailbg"));
        this.viewBg.width = 640;
        this.viewBg.height = 861;
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        var leftBorder = BaseBitmap.create(this.getDefaultRes("acwifebathingview_detailborder"));
        leftBorder.scaleX = -1;
        leftBorder.x = leftBorder.width;
        leftBorder.y = this.viewBg.y + 50;
        this.addChild(leftBorder);
        var rightBorder = BaseBitmap.create(this.getDefaultRes("acwifebathingview_detailborder"));
        rightBorder.x = GameConfig.stageWidth - rightBorder.width;
        rightBorder.y = leftBorder.y;
        this.addChild(rightBorder);
        this.addChild(this.viewBg);
    };
    AcLanternDetailPopupView.prototype.resetBgSize = function () {
        // this.closeBtn.setPosition(this.viewBg.x + this.viewBg.width - this.closeBtn.width + 10,this.viewBg.y + 50);
        this.titleTF.y = this.viewBg.y + 30;
        this.closeBtn.y = this.viewBg.y;
    };
    AcLanternDetailPopupView.prototype.initView = function () {
        this.aid = this.param.data.aid;
        this.code = this.param.data.code;
        var bg = BaseLoadBitmap.create(this.getDefaultRes("aclanternview_detailcontext"));
        bg.width = 548;
        bg.height = 504;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this.viewBg.y + 25 + 50);
        this.addChildToContainer(bg);
        var lanternNum = this.cfg.lanternNum;
        var maxDrawNum = this.cfg.lanternNum[this.cfg.lanternNum.length - 1]["needNum"];
        var acDesc = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acLanternViewDetailDesc"), [String(maxDrawNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        acDesc.width = 450;
        acDesc.lineSpacing = 5;
        acDesc.setPosition(this.viewBg.width / 2 - acDesc.width / 2, bg.y + bg.height + 25);
        this.addChildToContainer(acDesc);
        var detailBg1 = BaseBitmap.create(this.getDefaultRes("acwifebathingview_detaildescbg"));
        detailBg1.width = 400;
        if (PlatformManager.checkIsViSp()) {
            detailBg1.width = 430;
        }
        detailBg1.x = this.viewBg.width / 2 - detailBg1.width / 2;
        detailBg1.y = bg.y + bg.height + 140;
        this.addChildToContainer(detailBg1);
        var icon1 = BaseBitmap.create("wifeview_charmicon");
        icon1.x = detailBg1.x + 25;
        icon1.y = detailBg1.y + detailBg1.height / 2 - icon1.height / 2;
        this.addChildToContainer(icon1);
        var sceneItemCfg = Config.WifebathsceneCfg.getSceneCfgById(this.cfg.wifeBathSceneID);
        // let sceneItemCfg:Config.WifeBathSceneItemCfg =Config.WifebathsceneCfg.getSceneCfgById("31001");
        var detailText1 = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acLanternViewDetailDescText1"), [String(sceneItemCfg.wifeBathingGlamour)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        detailText1.x = detailBg1.x + 80;
        detailText1.y = detailBg1.y + detailBg1.height / 2 - detailText1.height / 2;
        this.addChildToContainer(detailText1);
        var detailBg2 = BaseBitmap.create(this.getDefaultRes("acwifebathingview_detaildescbg"));
        detailBg2.width = detailBg1.width;
        if (PlatformManager.checkIsViSp()) {
            detailBg2.width = 430;
        }
        detailBg2.x = this.viewBg.width / 2 - detailBg2.width / 2;
        detailBg2.y = detailBg1.y + detailBg1.height + 15;
        this.addChildToContainer(detailBg2);
        var icon2 = BaseBitmap.create("acwifebathingview_expicon");
        icon2.x = detailBg2.x + 25;
        icon2.y = detailBg2.y + detailBg2.height / 2 - icon2.height / 2;
        this.addChildToContainer(icon2);
        var detailText2 = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acLanternViewDetailDescText2"), [String(sceneItemCfg.wifeBathingExpRate * 100) + "%"]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        detailText2.x = detailBg2.x + 80;
        detailText2.y = detailBg2.y + detailBg2.height / 2 - detailText2.height / 2;
        this.addChildToContainer(detailText2);
    };
    AcLanternDetailPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            this.getDefaultRes("acwifebathingview_detailborder"),
            this.getDefaultRes("acwifebathingview_detaildescbg"),
            "acwifebathingview_expicon",
            "wifeview_charmicon"
        ]);
    };
    // protected getShowHeight():number
    // {
    // 	return 700;
    // }
    // 关闭按钮图标名称
    AcLanternDetailPopupView.prototype.getCloseBtnName = function () {
        return "load_closebtn";
    };
    // 背景图名称
    AcLanternDetailPopupView.prototype.getBgName = function () {
        return null;
    };
    AcLanternDetailPopupView.prototype.getTitleStr = function () {
        return this.getDefaultCn("acLanternViewDetailTitle", this.param.data.code);
    };
    AcLanternDetailPopupView.prototype.getDefaultCn = function (cnName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (LanguageManager.checkHasKey(cnName + "-" + this.code)) {
            return cnName + "-" + this.code;
        }
        else {
            return cnName + "-" + defaultCode;
        }
    };
    //根据资源名字得到完整资源名字
    AcLanternDetailPopupView.prototype.getDefaultRes = function (resName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (ResourceManager.hasRes(resName + "-" + this.code)) {
            return resName + "-" + this.code;
        }
        else {
            return resName + "-" + defaultCode;
        }
    };
    AcLanternDetailPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcLanternDetailPopupView;
}(PopupView));
__reflect(AcLanternDetailPopupView.prototype, "AcLanternDetailPopupView");
