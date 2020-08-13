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
  * @class WifeBathSceneConfirmPopupView
  */
var WifeBathSceneConfirmPopupView = (function (_super) {
    __extends(WifeBathSceneConfirmPopupView, _super);
    function WifeBathSceneConfirmPopupView() {
        return _super.call(this) || this;
    }
    /**
     * 重写 初始化viewbg
     *
     */
    WifeBathSceneConfirmPopupView.prototype.initBg = function () {
        this.viewBg = BaseLoadBitmap.create("wifebathsceneconfirm_bg");
        this.viewBg.width = 640;
        this.viewBg.height = 630;
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    WifeBathSceneConfirmPopupView.prototype.resetBgSize = function () {
        // this.closeBtn.setPosition(this.viewBg.x + this.viewBg.width - this.closeBtn.width + 10,this.viewBg.y + 50);
        // this.titleTF.y = this.viewBg.y + 30;
        this.closeBtn.x = GameConfig.stageWidth - this.closeBtn.width - 50;
        this.closeBtn.y = this.viewBg.y + 30 + 88;
    };
    WifeBathSceneConfirmPopupView.prototype.initView = function () {
        var data = this.param.data;
        var useNum = data.useNum; //  使用元宝数
        var num = data.num; //玩家元宝数
        var wifename = data.wifename;
        this._wifeInfoVo = data.wifeInfoVo;
        var sceneId = null;
        for (var key in this._wifeInfoVo.scene) {
            sceneId = key;
        }
        this._baseLoveCallback = data.baseLoveCallback;
        this._sceneLoveCallback = data.sceneLoveCallback;
        this._handler = data.handler;
        var baseBtn = ComponentManager.getButton("wifebathsceneconfirm_btn", null, this.baseLoveBtnHandler, this);
        baseBtn.x = 5;
        baseBtn.y = this.viewBg.y + 385;
        var baseText = ComponentManager.getTextField(LanguageManager.getlocal("wifeBathSceneConfirmBaseLoveBtn"), 40, TextFieldConst.COLOR_BLACK);
        baseText.textAlign = egret.HorizontalAlign.CENTER;
        baseText.x = baseBtn.x + baseBtn.width / 2 - baseText.width / 2;
        baseText.y = baseBtn.y + baseBtn.height / 2 - baseText.height / 2 + 35;
        this.addChildToContainer(baseBtn);
        this.addChildToContainer(baseText);
        var baseBtnBg = BaseBitmap.create("wifebathsceneconfirm_btnbg");
        baseBtnBg.x = baseBtn.x + baseBtn.width / 2 - baseBtnBg.width / 2;
        baseBtnBg.y = baseBtn.y + baseBtn.height - 7;
        this.addChildToContainer(baseBtnBg);
        var sceneBtn = ComponentManager.getButton("wifebathsceneconfirm_btn", null, this.sceneLoveBtnHandler, this);
        sceneBtn.x = GameConfig.stageWidth - 5 - sceneBtn.width;
        sceneBtn.y = this.viewBg.y + 385;
        var sceneText = ComponentManager.getTextField(LanguageManager.getlocal("wifeBathSceneConfirmSceneLoveBtn" + sceneId), 40, TextFieldConst.COLOR_BLACK);
        sceneText.x = sceneBtn.x + sceneBtn.width / 2 - sceneText.width / 2;
        sceneText.y = sceneBtn.y + sceneBtn.height / 2 - sceneText.height / 2 + 35;
        this.addChildToContainer(sceneBtn);
        this.addChildToContainer(sceneText);
        var sceneBtnBg = BaseBitmap.create("wifebathsceneconfirm_btnbg");
        sceneBtnBg.x = sceneBtn.x + sceneBtn.width / 2 - sceneBtnBg.width / 2;
        sceneBtnBg.y = sceneBtn.y + sceneBtn.height - 7;
        this.addChildToContainer(sceneBtnBg);
        var costText1 = ComponentManager.getTextField(LanguageManager.getlocal("wifeBathSceneConfirmCostText1", [String(useNum), wifename]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        costText1.x = this.viewBg.width / 2 - costText1.width / 2;
        costText1.y = this.viewBg.y + this.viewBg.height + 50;
        this.addChildToContainer(costText1);
        var costText2 = ComponentManager.getTextField(LanguageManager.getlocal("wifeBathSceneConfirmCostText2", [String(num)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        costText2.x = this.viewBg.width / 2 - costText2.width / 2;
        costText2.y = costText1.y + costText1.height + 6;
        this.addChildToContainer(costText2);
        var detailBtn = ComponentManager.getButton("btn_rule", null, this.detailBtnHandler, this);
        detailBtn.x = sceneBtnBg.x + sceneBtnBg.width - detailBtn.width - 60;
        detailBtn.y = sceneBtnBg.y - detailBtn.height + 15;
        this.addChildToContainer(detailBtn);
        var mark2 = BaseBitmap.create("wifebathsceneconfirm_mark2");
        mark2.x = baseBtnBg.x + baseBtnBg.width / 2 - mark2.width / 2;
        mark2.y = baseBtnBg.y + mark2.height / 2 - 163;
        this.addChildToContainer(mark2);
        var mark3 = BaseBitmap.create("wifebathsceneconfirm_mark3");
        mark3.x = sceneBtnBg.x + sceneBtnBg.width / 2 - mark3.width / 2;
        mark3.y = sceneBtnBg.y + mark3.height / 2 - 163;
        this.addChildToContainer(mark3);
        var mark1 = BaseBitmap.create("wifebathsceneconfirm_mark1");
        mark1.x = 0;
        mark1.y = baseBtnBg.y - mark1.y;
        this.addChildToContainer(mark1);
    };
    WifeBathSceneConfirmPopupView.prototype.detailBtnHandler = function () {
        var sceneId = null;
        for (var key in this._wifeInfoVo.scene) {
            sceneId = key;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.WIFEBATHSCENEDETAILPOPUPVIEW, { sceneId: sceneId, wifename: this._wifeInfoVo.name });
    };
    WifeBathSceneConfirmPopupView.prototype.baseLoveBtnHandler = function () {
        if (this.checkNeedGem()) {
            if (this._baseLoveCallback && this._handler) {
                this._baseLoveCallback.apply(this._handler);
            }
        }
        this.hide();
    };
    WifeBathSceneConfirmPopupView.prototype.sceneLoveBtnHandler = function () {
        if (this.checkNeedGem()) {
            if (this._sceneLoveCallback && this._handler) {
                var sceneId = null;
                for (var key in this._wifeInfoVo.scene) {
                    sceneId = key;
                }
                this._sceneLoveCallback.apply(this._handler, [sceneId]);
            }
        }
        this.hide();
    };
    WifeBathSceneConfirmPopupView.prototype.checkNeedGem = function () {
        if (this.param.data.useNum && this.param.data.useNum > this.param.data.num) {
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            return false;
        }
        return true;
    };
    // protected getShowHeight():number
    // {
    // 	return 700;
    // }
    // 关闭按钮图标名称
    WifeBathSceneConfirmPopupView.prototype.getCloseBtnName = function () {
        return "btn_win_closebtn";
    };
    // 背景图名称
    WifeBathSceneConfirmPopupView.prototype.getBgName = function () {
        return null;
    };
    WifeBathSceneConfirmPopupView.prototype.getTitleStr = function () {
        return null;
    };
    WifeBathSceneConfirmPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifebathsceneconfirm_btn",
            "wifebathsceneconfirm_btnbg",
            "wifebathsceneconfirm_mark1",
            "wifebathsceneconfirm_mark2",
            "wifebathsceneconfirm_mark3"
        ]);
    };
    WifeBathSceneConfirmPopupView.prototype.dispose = function () {
        this._baseLoveCallback = null;
        this._sceneLoveCallback = null;
        this._handler = null;
        this._wifeInfoVo = null;
        _super.prototype.dispose.call(this);
    };
    return WifeBathSceneConfirmPopupView;
}(PopupView));
__reflect(WifeBathSceneConfirmPopupView.prototype, "WifeBathSceneConfirmPopupView");
