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
        var _this = _super.call(this) || this;
        _this._announcementList = [];
        _this._notice = null;
        return _this;
    }
    GameAnnouncementView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "uncompress",
        ]);
    };
    GameAnnouncementView.prototype.initView = function () {
        this.closeBtn.y = 45;
        this.titleTF.x = 294;
        if (PlatformManager.checkIsViSp()) {
            this.titleTF.x = 264;
        }
        else if (PlatformManager.checkIsJPSp()) {
            this.titleTF.x = 264;
        }
        this.titleTF.y = 85;
        this.titleTF.size = TextFieldConst.FONTSIZE_BUTTON_COMMON;
        this.showBg();
        this.showList();
    };
    GameAnnouncementView.prototype.isShowOpenAni = function () {
        return false;
    };
    GameAnnouncementView.prototype.showBg = function () {
        var bg = BaseBitmap.create("load_2");
        bg.width = 538;
        bg.height = 630;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 75;
        this.addChildToContainer(bg);
    };
    GameAnnouncementView.prototype.showList = function () {
        if (this.param.data.name == "login") {
            if (this.param.data && this.param.data.notice) {
                this._notice = this.param.data.notice;
                this._announcementList = this._notice;
                GameAnnouncementView.NOTICE_LIST = this._announcementList;
            }
            else {
                this._announcementList = GameAnnouncementView.NOTICE_LIST;
            }
        }
        else {
            this._announcementList = this.param.data;
        }
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 518, 590);
        this._scrollList = ComponentManager.getScrollList(AnnouncementScrollItem, this._announcementList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(65, 90);
        this._scrollList.addTouchTap(this.clickItemHandler, this);
        var _announcementScrollItem = this._scrollList.getItemByIndex(0);
        _announcementScrollItem.itemListType = true;
        _announcementScrollItem.touchNum += 1;
        this._scrollList.refreshData(this._announcementList);
    };
    GameAnnouncementView.prototype.clickItemHandler = function (event) {
        GameAnnouncementView.currNum = event.data;
        var _announcementScrollItem = this._scrollList.getItemByIndex(event.data);
        _announcementScrollItem.touchNum += 1;
        if (_announcementScrollItem.touchNum % 2 == 0) {
            _announcementScrollItem.itemListType = false;
        }
        else {
            _announcementScrollItem.itemListType = true;
        }
        this._scrollList.refreshData(this._announcementList);
        // this._scrollList.setScrollTopByIndex(event.data);
    };
    GameAnnouncementView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        // 	this.viewBg.height = 775;
        // 	this.viewBg.y = 40;
        // this.closeBtn.y = 45;
        this.titleTF.x = 294;
        if (PlatformManager.checkIsViSp()) {
            this.titleTF.x = 264;
        }
        else if (PlatformManager.checkIsJPSp()) {
            this.titleTF.x = 264;
        }
        this.titleTF.y = this.viewBg.y + 30;
        this.titleTF.size = TextFieldConst.FONTSIZE_BUTTON_COMMON;
        //     this.y = 0;
        //     this.y = this.y+GameConfig.stageHeigth/2 -this.viewBg.height/2;
        //     this._maskBmp.y = -this.y;
    };
    GameAnnouncementView.prototype.getShowHeight = function () {
        return 775;
    };
    GameAnnouncementView.prototype.getCloseBtnName = function () {
        return "load_closebtn";
    };
    GameAnnouncementView.prototype.getBgName = function () {
        return "load_bg";
    };
    // protected getSheepType(): number {
    //     return 1;
    // }
    GameAnnouncementView.prototype.dispose = function () {
        this._announcementList = [];
        _super.prototype.dispose.call(this);
    };
    GameAnnouncementView.currNum = 0;
    GameAnnouncementView.NOTICE_LIST = null;
    return GameAnnouncementView;
}(PopupView));
__reflect(GameAnnouncementView.prototype, "GameAnnouncementView");
