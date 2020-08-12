/*
 *@description: 龙珠公告面板
 *@author: hwc
 *@date: 2020-04-16 17:36:15
 *@version 0.0.1
 */
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
var GameAnnouncementView = (function (_super) {
    __extends(GameAnnouncementView, _super);
    function GameAnnouncementView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameAnnouncementView.prototype.initView = function () {
        var listview = ComponentMgr.getScrollList(AnnoListItem, [1, 2, 3], new egret.Rectangle(0, 0, 552, 560));
        this.addChildToContainer(listview);
        listview.x = (this.getShowWidth() - listview.width) / 2;
        listview.y = 10;
        var tiptxt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_CONTENT_NORMAL_POPUP, ColorEnums.white);
        this.addChildToContainer(tiptxt);
        tiptxt.text = LangMger.getlocal("game_anno_tip");
        tiptxt.x = this.getShowWidth() - tiptxt.width - 10;
        var checkBox = ComponentMgr.getCheckBox();
        this.addChildToContainer(checkBox);
        checkBox.x = tiptxt.x - checkBox.width - 10;
        ;
        checkBox.y = this.getShowHeight() - 50;
        tiptxt.y = checkBox.y + (checkBox.height - tiptxt.height) / 2;
        this.checkBox = checkBox;
        checkBox.setSelected(this.checkFlag());
        // BaseBitmap.create("public_img_mm")
    };
    GameAnnouncementView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.setConfirmBtnPosition(205, 650);
    };
    GameAnnouncementView.prototype.show = function (data) {
        _super.prototype.show.call(this, data);
    };
    GameAnnouncementView.prototype.closeHandler = function () {
        localStorage.setItem(LocalStorageConst.LOCAL_ANNOUNCEMENT_LOGIN_SHOW, (!this.checkBox.checkSelected()).toString());
        var ts = Date.parse((new Date()).toString()) / 1000;
        localStorage.setItem(LocalStorageConst.LOCAL_ANNO_LAST_TIME, ts.toString());
        _super.prototype.closeHandler.call(this);
    };
    GameAnnouncementView.prototype.clickConfirmHandler = function () {
        this.closeHandler();
    };
    GameAnnouncementView.prototype.checkFlag = function () {
        var flag = localStorage.getItem(LocalStorageConst.LOCAL_ANNOUNCEMENT_LOGIN_SHOW);
        var ts = localStorage.getItem(LocalStorageConst.LOCAL_ANNO_LAST_TIME);
        if (!ts || !flag) {
            return false;
        }
        var f = flag == "true";
        var tsnum = parseInt(ts);
        var dts = Date.parse((new Date()).toString()) / 1000;
        if (!f && App.DateUtil.isSameDay(dts, tsnum)) {
            return true;
        }
        return false;
    };
    // 需要加载的资源
    GameAnnouncementView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "annou_0"
        ]);
    };
    // 弹框面板高度，重新该方法后，不会动态计算高度
    GameAnnouncementView.prototype.getShowHeight = function () {
        return 660;
    };
    // 关闭按钮图标名称
    GameAnnouncementView.prototype.getCloseBtnName = function () {
        return _super.prototype.getCloseBtnName.call(this);
    };
    // 确认按钮名称
    GameAnnouncementView.prototype.getConfirmBtnName = function () {
        return _super.prototype.getConfirmBtnName.call(this);
    };
    GameAnnouncementView.prototype.getConfirmBtnStr = function () {
        return "确定";
    };
    GameAnnouncementView.prototype.dispose = function () {
        this.checkBox = null;
        _super.prototype.dispose.call(this);
    };
    return GameAnnouncementView;
}(PopupView));
__reflect(GameAnnouncementView.prototype, "GameAnnouncementView");
//# sourceMappingURL=GameAnnouncementView.js.map