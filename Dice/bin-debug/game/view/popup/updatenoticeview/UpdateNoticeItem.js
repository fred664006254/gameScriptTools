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
var UpdateNoticeItem = (function (_super) {
    __extends(UpdateNoticeItem, _super);
    function UpdateNoticeItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        return _this;
    }
    UpdateNoticeItem.prototype.initItem = function (index, data, param) {
        var view = this;
        view._data = data;
        view.width = 516;
        view.height = 100 + 10;
        //updatenotice_bg
        var btn = BaseBitmap.create("updatenotice_tab");
        // btn.width = view.width - 2;
        // btn.height = view.height - 10;
        view.addChild(btn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, view, [0, 0], true);
        btn.addTouchTap(function () {
            App.MsgHelper.dispEvt(MsgConst.UPDATELOG_SHOWIDX, {
                show: 1,
                idx: index
            });
        }, view);
        var key = data.key;
        var main = key.split("|");
        var cn = data.content;
        var version = main[1].replace(/-/g, ".");
        var datest = main[0];
        var titleTxt = ComponentMgr.getTextField(LangMger.getlocal("updatelogtitle", [version]), TextFieldConst.SIZE_28, ColorEnums.white);
        var dateTxt = ComponentMgr.getTextField(datest, TextFieldConst.SIZE_22, ColorEnums.white);
        view.addChild(titleTxt);
        view.addChild(dateTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, titleTxt, btn, [17, 10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, dateTxt, titleTxt, [0, titleTxt.textHeight + 22]);
        if (data.show) {
            var contentBg = BaseBitmap.create("updatenotice_bg");
            // contentBg.width = view.width;
            view.addChild(contentBg);
            var contentTxt = ComponentMgr.getTextField(data.content, TextFieldConst.SIZE_22, ColorEnums.black);
            view.addChild(contentTxt);
            contentTxt.lineSpacing = 6;
            // contentBg.height = contentTxt.textHeight + 40;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, contentBg, btn, [0, 50]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, contentTxt, contentBg, [22, 0]);
            view.height = btn.height + contentBg.height + 10;
        }
    };
    UpdateNoticeItem.prototype.getSpaceY = function () {
        return 0;
    };
    UpdateNoticeItem.prototype.getSpaceX = function () {
        return 0;
    };
    UpdateNoticeItem.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return UpdateNoticeItem;
}(ScrollListItem));
__reflect(UpdateNoticeItem.prototype, "UpdateNoticeItem");
//# sourceMappingURL=UpdateNoticeItem.js.map