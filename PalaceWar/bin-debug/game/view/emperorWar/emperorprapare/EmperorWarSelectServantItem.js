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
 * 称帝战门客弹板单个模块，可继承
 * author qianjun
 * date 2017/9/28
 */
var EmperorWarSelectServantItem = (function (_super) {
    __extends(EmperorWarSelectServantItem, _super);
    // 属性文本
    function EmperorWarSelectServantItem() {
        return _super.call(this) || this;
    }
    EmperorWarSelectServantItem.prototype.initItem = function (index, data) {
        this._selectedIndex = index;
        this._data = data;
        var servantInfoVo = Api.servantVoApi.getServantObj(data.servantId);
        this._servantInfoVo = servantInfoVo;
        var bg = BaseBitmap.create("public_9_bg1");
        bg.width = 500;
        bg.height = 120;
        this.addChild(bg);
        this.initServantIcon(servantInfoVo);
        this.initServantInfo();
        var useBtn = ComponentManager.getButton(this.getBtnResName(), this.getBtnLocalName(), this.clickBtnHandler, this);
        useBtn.setColor(TextFieldConst.COLOR_BLACK);
        useBtn.x = bg.width - useBtn.width - 10;
        useBtn.y = bg.height / 2 - useBtn.height / 2;
        useBtn.setEnable(!this.api.haveInBuzhen(data.servantId));
        this.addChild(useBtn);
    };
    Object.defineProperty(EmperorWarSelectServantItem.prototype, "api", {
        get: function () {
            return Api.emperorwarVoApi;
        },
        enumerable: true,
        configurable: true
    });
    EmperorWarSelectServantItem.prototype.getAttrStr = function () {
        return this._data.text;
    };
    /**按钮文字 */
    EmperorWarSelectServantItem.prototype.getBtnLocalName = function () {
        var view = this;
        view.api.haveInBuzhen(view._data.servantId);
        return view.api.haveInBuzhen(view._data.servantId) ? "emperorWarBuzhenHaveUp" : "emperorWarBuzhenUp";
    };
    EmperorWarSelectServantItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return EmperorWarSelectServantItem;
}(ServantSelectedScrollItem));
__reflect(EmperorWarSelectServantItem.prototype, "EmperorWarSelectServantItem");
//# sourceMappingURL=EmperorWarSelectServantItem.js.map