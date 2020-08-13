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
 * 书院门客自动选择
 * author ycg
 * date 2020.3.2
 * @class BookroomAutoSelectServantPopupView
 */
var BookroomAutoSelectServantPopupView = (function (_super) {
    __extends(BookroomAutoSelectServantPopupView, _super);
    function BookroomAutoSelectServantPopupView() {
        var _this = _super.call(this) || this;
        _this._currSelNum = null;
        _this._selectSerList = [];
        _this._allServant = [];
        return _this;
    }
    BookroomAutoSelectServantPopupView.prototype.initView = function () {
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY),this.studyCallBack,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_AUTOSTUDY_SELECTSERVANT, this.selectServant, this);
        var bookCfg = GameConfig.config.bookroomCfg;
        var txt1 = ComponentManager.getTextField(LanguageManager.getlocal("bookRoomServantSelecttxt1", [String(bookCfg.getBookExp), String(bookCfg.getSkillExp)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        txt1.x = 40 + GameData.popupviewOffsetX;
        txt1.y = 20;
        this.addChildToContainer(txt1);
        // let maxPosNum =  Api.bookroomVoApi.getMaxleng();
        // let lastData = this.getLastSelectData();
        // let studyNum = Api.bookroomVoApi.getInStudyServantNum();
        var selNum = ComponentManager.getTextField(LanguageManager.getlocal("bookRoomSelectServantNum", ["", ""]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        selNum.x = txt1.x;
        selNum.y = txt1.y + 30;
        this.addChildToContainer(selNum);
        this._currSelNum = selNum;
        var timeTf = ComponentManager.getTextField(LanguageManager.getlocal("bookRoomServantSelecttxt2", ["3" + LanguageManager.getlocal("date_hour2")]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        timeTf.x = this.viewBg.x + this.viewBg.width - 40 - timeTf.width - GameData.popupviewOffsetX;
        timeTf.y = selNum.y;
        this.addChildToContainer(timeTf);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 528;
        bg.height = 574; // 634
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = selNum.y + 30;
        this.addChildToContainer(bg);
        var studyBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "bookRoom_autoStudyBtnName", this.studyBtnClick, this);
        studyBtn.setPosition(bg.x + bg.width / 2 - studyBtn.width / 2, bg.y + bg.height + 8);
        this.addChildToContainer(studyBtn);
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
        var data = idList1.concat(idList2);
        this._allServant = data;
        var maxPosNum = Api.bookroomVoApi.getMaxleng();
        var lastData = this.getLastSelectData();
        var studyNum = Api.bookroomVoApi.getInStudyServantNum();
        var num = 0;
        if (studyNum + lastData.length > maxPosNum) {
            num = maxPosNum;
        }
        else {
            num = studyNum + lastData.length;
        }
        this.initSelectServant();
        selNum.text = LanguageManager.getlocal("bookRoomSelectServantNum", ["" + (num), "" + maxPosNum]);
        var canUseData = Api.bookroomVoApi.getCanUseSeat(this.param.data.data);
        if (this.param.data && this.param.data.seatNum && canUseData.length != Number(this.param.data.seatNum)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_autoDataChangeTip"));
        }
        var scrollList = ComponentManager.getScrollList(BookroomAutoSelServantScrollItem, data, rect, { data: lastData });
        scrollList.x = bg.x;
        scrollList.y = bg.y + 5;
        this.addChildToContainer(scrollList);
    };
    BookroomAutoSelectServantPopupView.prototype.initSelectServant = function () {
        var maxPosNum = Api.bookroomVoApi.getMaxleng();
        var lastData = this.getLastSelectData();
        var studyNum = Api.bookroomVoApi.getInStudyServantNum();
        var num = lastData.length;
        if (studyNum + lastData.length > maxPosNum) {
            num = maxPosNum - studyNum;
        }
        else {
            num = lastData.length;
        }
        for (var i = 0; i < num; i++) {
            this._selectSerList.push(lastData[i]);
        }
    };
    //是否可以选择
    BookroomAutoSelectServantPopupView.prototype.isCanSelect = function () {
        var maxPosData = Api.bookroomVoApi.getCanUseSeat(this.param.data.data);
        var maxPosNum = maxPosData.length;
        if (maxPosNum > this._selectSerList.length) {
            return true;
        }
        return false;
    };
    //上次已选的数据
    BookroomAutoSelectServantPopupView.prototype.getLastSelectData = function () {
        var posData = Api.bookroomVoApi.getCanUseSeat(this.param.data.data);
        var lastData = Api.bookroomVoApi.getLastSelectServant(this._allServant);
        var count = posData.length > lastData.length ? lastData.length : posData.length;
        var arr = [];
        for (var i = 0; i < count; i++) {
            arr.push(lastData[i]);
        }
        App.LogUtil.log("getlastsel " + arr.length);
        return arr;
    };
    BookroomAutoSelectServantPopupView.prototype.selectServant = function (data) {
        if (data && data.data) {
            App.LogUtil.log("data.data.servantId " + data.data.servantId);
            if (data.data.isSelect) {
                this._selectSerList.push(data.data.servantId);
            }
            else {
                this.removeServantFromList(data.data.servantId);
            }
            App.LogUtil.log("this._selectSerList.length " + this._selectSerList.length);
            var maxPosNum = Api.bookroomVoApi.getMaxleng();
            var studyNum = Api.bookroomVoApi.getInStudyServantNum();
            this._currSelNum.text = LanguageManager.getlocal("bookRoomSelectServantNum", ["" + (studyNum + this._selectSerList.length), "" + maxPosNum]);
        }
    };
    BookroomAutoSelectServantPopupView.prototype.removeServantFromList = function (id) {
        for (var i = 0; i < this._selectSerList.length; i++) {
            if (this._selectSerList[i] == id) {
                this._selectSerList.splice(i, 1);
                return;
            }
        }
    };
    BookroomAutoSelectServantPopupView.prototype.studyBtnClick = function () {
        if (this._selectSerList.length <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_autoNotSelect"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_BOOKROOM_ONEKEYSTUDY, { sids: this._selectSerList });
        this._selectSerList = [];
        this.hide();
    };
    BookroomAutoSelectServantPopupView.prototype.getShowHeight = function () {
        return 800;
    };
    BookroomAutoSelectServantPopupView.prototype.getTitleStr = function () {
        return "bookRoom_autoSelectTitleStr";
    };
    BookroomAutoSelectServantPopupView.prototype.dispose = function () {
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY),this.studyCallBack,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_AUTOSTUDY_SELECTSERVANT, this.selectServant, this);
        this._currSelNum = null;
        this._selectSerList = [];
        this._allServant = [];
        _super.prototype.dispose.call(this);
    };
    return BookroomAutoSelectServantPopupView;
}(PopupView));
__reflect(BookroomAutoSelectServantPopupView.prototype, "BookroomAutoSelectServantPopupView");
//# sourceMappingURL=BookroomAutoSelectServantPopupView.js.map