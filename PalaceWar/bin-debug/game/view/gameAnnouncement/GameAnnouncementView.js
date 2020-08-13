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
        // private _bg:BaseBitmap=null;
        _this._titleBmp = null;
        _this._checkBox = null;
        return _this;
    }
    GameAnnouncementView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "public_9_bg4",
            "uncompress",
            "announcement_itembg1",
            "announcement_title",
        ]);
    };
    GameAnnouncementView.prototype.initView = function () {
        // this.showBg();
        var titleBmp = BaseBitmap.create("announcement_title");
        this.addChild(titleBmp);
        this._titleBmp = titleBmp;
    };
    GameAnnouncementView.prototype.getTitleStr = function () {
        return null;
    };
    GameAnnouncementView.prototype.getBgName = function () {
        return "announcementbg";
    };
    GameAnnouncementView.prototype.resetBgSize = function () {
        this.viewBg.height = 508;
        this.viewBg.x = GameConfig.stageWidth - this.viewBg.width;
        this.viewBg.y = (GameConfig.stageHeigth - this.viewBg.height) * 0.5 - 50;
        this._titleBmp.setPosition(this.viewBg.x + (this.viewBg.width - this._titleBmp.width) / 2 - 18, this.viewBg.y + 14);
        this.closeBtn.x = this.viewBg.x + this.viewBg.width - 44 - this.closeBtn.width / 2;
        this.closeBtn.y = this.viewBg.y + 70;
        this.showList();
        this._scrollList.setPosition(this.viewBg.x + 49.5, this.viewBg.y + 100);
        this._scrollList.refreshData(this._announcementList);
        var guideBmp = BaseLoadBitmap.create("announcement_guide");
        guideBmp.y = this.viewBg.y + 52;
        this.addChild(guideBmp);
        var isLogin = false;
        if (this.param && this.param.data && this.param.data.name == "login") {
            isLogin = true;
        }
        else {
            // let shape:BaseShape=new BaseShape();
            // this.addChild(shape);
            // let checkBox:CheckBox=ComponentManager.getCheckBox(LanguageManager.getlocal("activityPopTip"));
            // this.addChild(checkBox);
            // checkBox.setPosition(this.viewBg.x+this.viewBg.width-80-checkBox.width,this.viewBg.y+this.viewBg.height);
            // checkBox.addTouchTap((e:egret.TouchEvent)=>{
            // if(checkBox.checkSelected())
            // {
            //     LocalStorageManager.set(LocalStorageConst.LOCAL_ANNOUNCEMENT_SHOW+Api.playerVoApi.getPlayerID(),String(GameData.announcementLastestT)+"-"+String(GameData.serverTime));
            // }
            // else
            // {
            //     LocalStorageManager.remove(LocalStorageConst.LOCAL_ANNOUNCEMENT_SHOW+Api.playerVoApi.getPlayerID());
            // }
            // },this);
            // this._checkBox=checkBox;
            // shape.graphics.beginFill(0,0.6);
            // shape.graphics.drawRoundRect(0,0,checkBox.width-35,30,5,5);
            // shape.graphics.endFill();
            // shape.setPosition(checkBox.x+40,checkBox.y+(checkBox.height-shape.height)/2-2);
        }
        var shape = new BaseShape();
        this.addChild(shape);
        var checkBox = ComponentManager.getCheckBox(LanguageManager.getlocal("activityPopTip"));
        this.addChild(checkBox);
        checkBox.setPosition(this.viewBg.x + this.viewBg.width - 80 - checkBox.width, this.viewBg.y + this.viewBg.height);
        checkBox.addTouchTap(function (e) {
            if (isLogin) {
                if (checkBox.checkSelected()) {
                    LocalStorageManager.set(LocalStorageConst.LOCAL_ANNOUNCEMENT_LOGIN_SHOW + LoginManager.getLocalUserName(), String(GameData.announcementLoginLastTime));
                }
                else {
                    LocalStorageManager.remove(LocalStorageConst.LOCAL_ANNOUNCEMENT_LOGIN_SHOW + LoginManager.getLocalUserName());
                }
            }
            else {
                if (checkBox.checkSelected()) {
                    LocalStorageManager.set(LocalStorageConst.LOCAL_ANNOUNCEMENT_SHOW + Api.playerVoApi.getPlayerID(), String(GameData.announcementLastestT) + "-" + String(GameData.serverTime));
                }
                else {
                    LocalStorageManager.remove(LocalStorageConst.LOCAL_ANNOUNCEMENT_SHOW + Api.playerVoApi.getPlayerID());
                }
            }
        }, this);
        this._checkBox = checkBox;
        shape.graphics.beginFill(0, 0.6);
        shape.graphics.drawRoundRect(0, 0, checkBox.width - 35, 30, 5, 5);
        shape.graphics.endFill();
        shape.setPosition(checkBox.x + 40, checkBox.y + (checkBox.height - shape.height) / 2 - 2);
        if (isLogin) {
            var localT = LocalStorageManager.get(LocalStorageConst.LOCAL_ANNOUNCEMENT_LOGIN_SHOW + LoginManager.getLocalUserName());
            if (localT && GameData.checkShowNoticeIsTodayInLogin()) {
                checkBox.setSelected(true);
            }
        }
    };
    GameAnnouncementView.prototype.getCloseBtnName = function () {
        return "sharepopupview_closebtn";
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
        rect.setTo(0, 0, 396, 508 - 138);
        this._scrollList = ComponentManager.getScrollList(AnnouncementScrollItem, this._announcementList, rect);
        this.addChildToContainer(this._scrollList);
        // this._scrollList.setPosition(this.viewBg.x+50, this.viewBg.y+88);
        this._scrollList.addTouchTap(this.clickItemHandler, this);
    };
    GameAnnouncementView.prototype.clickItemHandler = function (event) {
        GameAnnouncementView.currNum = event.data;
        this._scrollList.refreshData(this._announcementList);
    };
    GameAnnouncementView.prototype.getSheepType = function () {
        return 1;
    };
    GameAnnouncementView.prototype.dispose = function () {
        if (this._checkBox) {
            if (this._checkBox.checkSelected()) {
                LocalStorageManager.set(LocalStorageConst.LOCAL_ANNOUNCEMENT_SHOW + Api.playerVoApi.getPlayerID(), String(GameData.announcementLastestT) + "-" + String(GameData.serverTime));
            }
            else {
                LocalStorageManager.remove(LocalStorageConst.LOCAL_ANNOUNCEMENT_SHOW + Api.playerVoApi.getPlayerID());
            }
        }
        this._announcementList = [];
        GameAnnouncementView.currNum = 0;
        this._titleBmp = null;
        this._scrollList = null;
        this._checkBox = null;
        _super.prototype.dispose.call(this);
    };
    GameAnnouncementView.currNum = 0;
    GameAnnouncementView.NOTICE_LIST = null;
    return GameAnnouncementView;
}(PopupView));
__reflect(GameAnnouncementView.prototype, "GameAnnouncementView");
//# sourceMappingURL=GameAnnouncementView.js.map