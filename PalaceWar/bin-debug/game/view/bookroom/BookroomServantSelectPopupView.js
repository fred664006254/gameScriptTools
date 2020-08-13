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
 * 书院选择门客
 * author yanyuling
 * date 2017/11/24
 * @class BookroomServantSelectPopupView
 */
var BookroomServantSelectPopupView = (function (_super) {
    __extends(BookroomServantSelectPopupView, _super);
    function BookroomServantSelectPopupView() {
        return _super.call(this) || this;
    }
    BookroomServantSelectPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY), this.studyCallBack, this);
        this._posId = this.param.data.posId;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var bookCfg = GameConfig.config.bookroomCfg;
        var txt1 = ComponentManager.getTextField("", 20);
        txt1.textColor = TextFieldConst.COLOR_BROWN;
        txt1.text = LanguageManager.getlocal("bookRoomServantSelecttxt1", [String(bookCfg.getBookExp), String(bookCfg.getSkillExp)]);
        txt1.x = 40 + GameData.popupviewOffsetX;
        txt1.y = 20;
        this._nodeContainer.addChild(txt1);
        var txt2 = ComponentManager.getTextField("", 20);
        txt2.textColor = txt1.textColor;
        txt2.text = LanguageManager.getlocal("bookRoomServantSelecttxt2", ["3" + LanguageManager.getlocal("date_hour2")]);
        txt2.x = txt1.x;
        txt2.y = txt1.y + 30;
        this._nodeContainer.addChild(txt2);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 528;
        bg.height = 634;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = txt2.y + 30;
        this._nodeContainer.addChild(bg);
        var rect = new egret.Rectangle(0, 0, bg.width, bg.height - 10);
        var idList = Api.servantVoApi.getServantInfoIdListWithSort(2);
        var idList1 = [];
        var idList2 = [];
        for (var index = 0; index < idList.length; index++) {
            var key = idList[index];
            if (!Api.bookroomVoApi.isStudying(key)) {
                idList1.push(key);
            }
            else {
                idList2.push(key);
            }
        }
        var keys = idList1.concat(idList2);
        BookroomServantScrollItem._posId = this._posId;
        BookroomServantScrollItem._data = this.param.data;
        var scrollList = ComponentManager.getScrollList(BookroomServantScrollItem, keys, rect);
        scrollList.x = bg.x;
        scrollList.y = bg.y + 5;
        this._nodeContainer.addChild(scrollList);
    };
    BookroomServantSelectPopupView.prototype.getShowHeight = function () {
        return 800;
    };
    BookroomServantSelectPopupView.prototype.studyCallBack = function (event) {
        // let rdata = event.data.data;
        // egret.log(">>>>>>>");
        this.hide();
    };
    BookroomServantSelectPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY), this.studyCallBack, this);
        this._nodeContainer = null;
        this._posId = null;
        _super.prototype.dispose.call(this);
    };
    return BookroomServantSelectPopupView;
}(PopupView));
__reflect(BookroomServantSelectPopupView.prototype, "BookroomServantSelectPopupView");
//# sourceMappingURL=BookroomServantSelectPopupView.js.map