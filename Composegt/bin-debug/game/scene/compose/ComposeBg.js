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
var ComposeBg = (function (_super) {
    __extends(ComposeBg, _super);
    // private _cellRect:egret.Rectangle;
    // public _isComposeing:boolean = false;
    function ComposeBg(data) {
        var _this = _super.call(this) || this;
        _this._zIndex = -1;
        _this.init(data);
        var _a = ComposeStatus.getPixPosByCellPos(data.x, data.y), pixX = _a.pixX, pixY = _a.pixY;
        _this.setPosition(pixX, pixY - ComposeStatus.cellBgSize.h * 0.5);
        return _this;
    }
    ComposeBg.prototype.init = function (data) {
        this._data = data;
        var bg = BaseLoadBitmap.create("composetile");
        // lvbg.width=lvbg.height=31;
        bg.width = ComposeStatus.cellBgSize.w;
        bg.height = ComposeStatus.cellBgSize.h;
        bg.setPosition(-bg.width / 2, 0);
        this.addChild(bg);
        // this.name=this._data.id;
    };
    ComposeBg.prototype.update = function () {
        // this.name=Config.MapinfoCfg.getIdByPos(this._data.x,this._data.y)+"100";
    };
    ComposeBg.prototype.updatePos = function () {
        this.update();
    };
    ComposeBg.prototype.dispose = function () {
        // this.removeSelected();
        // this._cell=null;
        this._data = null;
        // this._cellRect=null;
        // this._lvT=null;
        // this._lv=null;
        // this._isComposeing = false;
        _super.prototype.dispose.call(this);
    };
    return ComposeBg;
}(BaseDisplayObjectContainer));
__reflect(ComposeBg.prototype, "ComposeBg");
