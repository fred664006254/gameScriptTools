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
var BureauceratGuideItem = (function (_super) {
    __extends(BureauceratGuideItem, _super);
    function BureauceratGuideItem() {
        var _this = _super.call(this) || this;
        _this._rowIdx = 0;
        _this._uiData = undefined;
        _this.url = "";
        return _this;
    }
    BureauceratGuideItem.prototype.initItem = function (index, data) {
        this._uiData = data;
        this.width = 600;
        //大背景，待补充
        this.item_bg = BaseBitmap.create("public_9_bg14");
        this.item_bg.width = 600;
        this.item_bg.x = this.item_bg.y = 0;
        this.addChild(this.item_bg);
        //步骤数及其背景,背景待补充
        var limitbg = BaseBitmap.create("common_titlebg");
        limitbg.x = 3;
        limitbg.y = 5;
        this.addChild(limitbg);
        this.lb_step = ComponentManager.getTextField(LanguageManager.getlocal(data.index), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this.lb_step.x = 22;
        this.lb_step.y = 16;
        this.addChild(this.lb_step);
        //介绍文本
        this.lb_des = ComponentManager.getTextField(LanguageManager.getlocal(data.des), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        this.lb_des.x = 30;
        this.lb_des.y = 62;
        this.addChild(this.lb_des);
        if (index == 0) {
            this.item_bg.height = this.height = 157;
            //网址、网址背景，网址背景待补充
            this.bg = BaseBitmap.create("public_9_bg20");
            this.bg.x = 18, this.bg.y = 103, this.bg.width = 430, this.bg.height = 36;
            this.addChild(this.bg);
            this.lb_url = ComponentManager.getTextField(data.url, TextFieldConst.FONTSIZE_CONTENT_SMALL);
            this.lb_url.x = 37;
            this.lb_url.y = 110;
            this.addChild(this.lb_url);
            this.url = data.url;
            //按键
            this.copy_btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "bureaucratGuide_copy", this.BtnClick, this);
            this.copy_btn.x = 460, this.copy_btn.y = 97;
            this.addChild(this.copy_btn);
        }
        else {
            this.item_bg.height = this.height = 445;
            this.bg = BaseBitmap.create(data.bg);
            this.bg.x = 14, this.bg.y = 96;
            this.addChild(this.bg);
        }
    };
    BureauceratGuideItem.prototype.BtnClick = function () {
        //复制文本
        if (App.DeviceUtil.IsHtml5()) {
            var input = document.createElement("input");
            input.value = this.url;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, input.value.length),
                document.execCommand('Copy');
            document.body.removeChild(input);
            App.CommonUtil.showTip(LanguageManager.getlocal("welfareViewQQGroup5"));
        }
    };
    BureauceratGuideItem.prototype.getSpaceX = function () {
        return 10;
    };
    /**
     * 不同格子Y间距
     */
    BureauceratGuideItem.prototype.getSpaceY = function () {
        return 10;
    };
    BureauceratGuideItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._maskImg = null;
        this._rowIdx = null;
        this._uiData = null;
        this.cacheAsBitmap = false;
        this.item_bg = null;
        this.lb_step = null;
        this.lb_des = null;
        this.lb_url = null;
        this.copy_btn = null;
        this.bg = null;
        this.step_bg = null;
    };
    return BureauceratGuideItem;
}(ScrollListItem));
__reflect(BureauceratGuideItem.prototype, "BureauceratGuideItem");
//# sourceMappingURL=BureauceratGuideItem.js.map