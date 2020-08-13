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
 * 选择门客弹板
 * author 钱竣
 * date 2017/9/28
 * @class ZhenqifangSelectServantView
 */
var ZhenqifangSelectServantView = (function (_super) {
    __extends(ZhenqifangSelectServantView, _super);
    function ZhenqifangSelectServantView() {
        var _this = _super.call(this) || this;
        // 道具id	
        _this._itemId = 0;
        _this._scrollList = null;
        _this._callback = null;
        _this._handler = null;
        _this._selectedServantId = 0;
        return _this;
    }
    ZhenqifangSelectServantView.prototype.getTitleStr = function () {
        return "servantSelectedPopupViewTitle";
    };
    ZhenqifangSelectServantView.prototype.isShowOpenAni = function () {
        if (Api.rookieVoApi.isGuiding) {
            return false;
        }
        return true;
    };
    ZhenqifangSelectServantView.prototype.getResourceList = function () {
        var resArr = ["mlservantselected-1", "acchristmasview_smalldescbg", "countrywarrewardview_itembg"];
        return _super.prototype.getResourceList.call(this).concat(resArr);
    };
    /**
     * 需要传的参数{callback：回调函数，handler:回调函数所属对下，type：面板类型（1，2，3），itemId：使用道具时传}
     */
    ZhenqifangSelectServantView.prototype.initView = function () {
        this.height = GameConfig.stageHeigth;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SELECTED_SERVANT, this.clickItemHandler, this);
        this._callback = this.param.data.callback;
        this._handler = this.param.data.handler;
        if (this.param.data.needtext) {
            var bg_1 = BaseBitmap.create("countrywarrewardview_itembg");
            bg_1.width = 520;
            bg_1.x = this.viewBg.x + this.viewBg.width / 2 - bg_1.width / 2;
            bg_1.y = 10;
            this.addChildToContainer(bg_1);
            var descTF = ComponentManager.getTextField(LanguageManager.getlocal("zhenqifangcdtip20", [this.param.data.needtext]), 20);
            descTF.textAlign = TextFieldConst.ALIGH_LEFT;
            descTF.x = (this.viewBg.width - descTF.width) / 2;
            descTF.y = bg_1.y + (bg_1.height - descTF.textHeight) / 2 + 1;
            this.addChildToContainer(descTF);
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("zhenqifangcdtip4", [((this.param.data.friend ? Config.ZhenqifangCfg.friend.deduction : Config.ZhenqifangCfg.individual.deduction) * 100).toFixed(0)]), 20, TextFieldConst.COLOR_BROWN);
            tipTxt.textAlign = TextFieldConst.ALIGH_CENTER;
            tipTxt.width = 480;
            tipTxt.lineSpacing = 5;
            tipTxt.x = (this.viewBg.width - tipTxt.width) / 2;
            tipTxt.y = descTF.y + descTF.textHeight + 10;
            tipTxt.setColor(TextFieldConst.COLOR_BLACK);
            this.addChildToContainer(tipTxt);
        }
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = this.param.data.needtext ? 650 : 730;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = this.param.data.needtext ? 95 : 15;
        this.addChildToContainer(bg);
        var servantInfoVoList = Api.servantVoApi.getServantInfoListWithSort(2);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, bg.width - 10, bg.height - 20);
        var list = null;
        list = ComponentManager.getScrollList(ZhenqifangSelectServantItem, this.param.data.info, rect);
        list.setPosition(bg.x + 10, bg.y + 10);
        this.addChildToContainer(list);
        this._scrollList = list;
    };
    ZhenqifangSelectServantView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        if (Api.rookieVoApi.getIsGuiding()) {
            if (Api.rookieVoApi.getIsGuiding()) {
                this._scrollList.verticalScrollPolicy = "off";
            }
            RookieCfg.rookieCfg["zhenqifang_8"].clickRect.x = 393;
            RookieCfg.rookieCfg["zhenqifang_8"].clickRect.y = this.viewBg.y + 113;
            if (this.param.data.needtext) {
                RookieCfg.rookieCfg["zhenqifang_8"].clickRect.y += 80;
            }
            RookieCfg.rookieCfg["zhenqifang_8"].handPos.x = RookieCfg.rookieCfg["zhenqifang_8"].clickRect.x + 80;
            RookieCfg.rookieCfg["zhenqifang_8"].handPos.y = RookieCfg.rookieCfg["zhenqifang_8"].clickRect.y + 31;
            Api.rookieVoApi.checkNextStep();
        }
    };
    ZhenqifangSelectServantView.prototype.getShowHeight = function () {
        return 839;
    };
    /**点击具体门客按钮事件 */
    ZhenqifangSelectServantView.prototype.clickItemHandler = function (event) {
        var data = event.data;
        this._index = Number(data.index);
        this._selectedServantId = Number(data.id);
        this._callback.apply(this._handler, [{
                id: data.id,
                uid: this.param.data.uid,
                clv: data.clv,
                equip: data.equip,
                value: data.value
            }]);
        this.hide();
    };
    ZhenqifangSelectServantView.prototype.getBgExtraHeight = function () {
        return 40;
    };
    ZhenqifangSelectServantView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SELECTED_SERVANT, this.clickItemHandler, this);
        this._itemId = 0;
        this._scrollList = null;
        this._callback = null;
        this._handler = null;
        this._selectedServantId = 0;
        this._index = 0;
        _super.prototype.dispose.call(this);
    };
    return ZhenqifangSelectServantView;
}(PopupView));
__reflect(ZhenqifangSelectServantView.prototype, "ZhenqifangSelectServantView");
//# sourceMappingURL=ZhenqifangSelectServantView.js.map