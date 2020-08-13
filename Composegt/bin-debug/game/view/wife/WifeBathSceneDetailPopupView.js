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
  * @class WifeBathSceneDetailPopupView
  */
var WifeBathSceneDetailPopupView = (function (_super) {
    __extends(WifeBathSceneDetailPopupView, _super);
    function WifeBathSceneDetailPopupView() {
        return _super.call(this) || this;
    }
    /**
     * 重写 初始化viewbg
     *
     */
    WifeBathSceneDetailPopupView.prototype.initBg = function () {
        this.viewBg = BaseLoadBitmap.create("acwifebathingview_detailbg-1");
        this.viewBg.width = 640;
        this.viewBg.height = 500;
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    WifeBathSceneDetailPopupView.prototype.resetBgSize = function () {
        // this.closeBtn.setPosition(this.viewBg.x + this.viewBg.width - this.closeBtn.width + 10,this.viewBg.y + 50);
        this.titleTF.y = this.viewBg.y + 30;
        this.closeBtn.y = this.viewBg.y;
    };
    WifeBathSceneDetailPopupView.prototype.initView = function () {
        var sceneId = this.param.data.sceneId;
        var wifename = this.param.data.wifename;
        var bg = BaseLoadBitmap.create("wifescene_detail_" + sceneId);
        bg.width = 548;
        bg.height = 216;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this.viewBg.y + 25 + 50);
        this.addChildToContainer(bg);
        var acDesc = ComponentManager.getTextField(LanguageManager.getlocal("wifeBathSceneDetailText"), 22, TextFieldConst.COLOR_BROWN);
        acDesc.setPosition(this.viewBg.width / 2 - acDesc.width / 2, bg.y + bg.height + 18);
        this.addChildToContainer(acDesc);
        var detailBg1 = BaseBitmap.create("acwifebathingview_detaildescbg-1");
        detailBg1.width = 400;
        if (PlatformManager.checkIsViSp()) {
            detailBg1.width = 430;
        }
        detailBg1.x = this.viewBg.width / 2 - detailBg1.width / 2;
        detailBg1.y = bg.y + bg.height + 60;
        this.addChildToContainer(detailBg1);
        var icon1 = BaseBitmap.create("wifeview_charmicon");
        icon1.x = detailBg1.x + 25;
        icon1.y = detailBg1.y + detailBg1.height / 2 - icon1.height / 2;
        this.addChildToContainer(icon1);
        var sceneItemCfg = Config.WifebathsceneCfg.getSceneCfgById(sceneId);
        var detailText1 = ComponentManager.getTextField(LanguageManager.getlocal("wifeBathSceneDetailDescText1", [wifename, String(sceneItemCfg.wifeBathingGlamour)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        detailText1.x = detailBg1.x + 80;
        detailText1.y = detailBg1.y + detailBg1.height / 2 - detailText1.height / 2;
        this.addChildToContainer(detailText1);
        var detailBg2 = BaseBitmap.create("acwifebathingview_detaildescbg-1");
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
        var detailText2 = ComponentManager.getTextField(LanguageManager.getlocal("wifeBathSceneDetailDescText2", [wifename, String(sceneItemCfg.wifeBathingExpRate * 100) + "%"]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        detailText2.x = detailBg2.x + 80;
        detailText2.y = detailBg2.y + detailBg2.height / 2 - detailText2.height / 2;
        this.addChildToContainer(detailText2);
    };
    // protected getShowHeight():number
    // {
    // 	return 700;
    // }
    // 关闭按钮图标名称
    WifeBathSceneDetailPopupView.prototype.getCloseBtnName = function () {
        return "load_closebtn"; //btn_win_closebtn
    };
    // 背景图名称
    WifeBathSceneDetailPopupView.prototype.getBgName = function () {
        return null;
    };
    WifeBathSceneDetailPopupView.prototype.getTitleStr = function () {
        return "wifeBathSceneDetailTitle";
    };
    WifeBathSceneDetailPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acwifebathingview_expicon",
            "wifeview_charmicon",
            "acwifebathingview_detaildescbg-1"
        ]);
    };
    WifeBathSceneDetailPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return WifeBathSceneDetailPopupView;
}(PopupView));
__reflect(WifeBathSceneDetailPopupView.prototype, "WifeBathSceneDetailPopupView");
