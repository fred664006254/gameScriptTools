var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 江湖声望
 * date 2020.7.8
 * author ycg
 * @class NewAtkraceCrossFamePopupView
 */
var NewAtkraceCrossFamePopupView = /** @class */ (function (_super) {
    __extends(NewAtkraceCrossFamePopupView, _super);
    function NewAtkraceCrossFamePopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._dropBtnList = [];
        _this._dropDownBtn = null;
        _this._dropDownFlag = null;
        _this._dropDownContainer = null;
        _this._lastDropIdx = 0;
        _this._titleItemHeightArr = {};
        _this._dataList = [];
        _this._scrollListTop = 0;
        _this._dropDownBg = null;
        _this._dropDownTxt = null;
        _this._dropDownBgList = [];
        _this._isJump = false;
        _this._jumpFloor = 0;
        _this._currIndexs = [];
        _this._jumpData = null;
        _this._fightNumTxt = null;
        _this._titleInfo = null;
        _this._titleRed = null;
        _this._addFightBtn = null;
        _this._fameDetailBtn = null;
        return _this;
    }
    Object.defineProperty(NewAtkraceCrossFamePopupView.prototype, "aid", {
        get: function () {
            return this.param ? this.param.data.aid : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NewAtkraceCrossFamePopupView.prototype, "code", {
        get: function () {
            return this.param ? this.param.data.code : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NewAtkraceCrossFamePopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    NewAtkraceCrossFamePopupView.prototype.getRequestData = function () {
        this._currIndexs = [0, 1, 2];
        return { requestType: NetRequestConst.REQUEST_NEWATKRACECROSS_DIRECTORGETMAP, requestData: {
                indexs: [0, 1, 2], activeId: this.vo.aidAndCode
            } };
    };
    NewAtkraceCrossFamePopupView.prototype.receiveData = function (data) {
        if (data.ret) {
            console.log("receivedata ", data.data.data.map);
            Api.atkracecrossVoApi.setFameMapInfo(data.data.data.map);
        }
    };
    NewAtkraceCrossFamePopupView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_NEWATKRACECROSS_DIRECTORGETMAP, this.fameMapCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_NEWATKRACECROSS_DIRECTOREXTRA, this.addFightCostCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ATKRACECROSSNEW_FAMESEAT_REFRESH, this.refreshSeat, this);
        var bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 630;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 80;
        this.addChildToContainer(bg);
        var data = this.vo.getFameSeatCfg();
        this._dataList = data;
        var scrollList = ComponentManager.getScrollList(NewAtkraceCrossFamePopupScrollItem, data, new egret.Rectangle(0, 0, bg.width - 8, bg.height - 10));
        scrollList.setPosition(bg.x + 4, bg.y + 4);
        this.addChildToContainer(scrollList);
        this._scrollList = scrollList;
        scrollList.horizontalScrollPolicy = "off";
        this._scrollListTop = 0;
        scrollList.bindMoveCompleteCallback(function () {
            if (!_this._isJump) {
                _this.getMoveMapData(_this.getCurFloor());
            }
            else {
                _this._isJump = false;
            }
        }, this);
        //挑战次数
        var fightNumTxt = ComponentManager.getTextField(LanguageManager.getlocal("newatkrackcross_fameChangeNum", ["" + this.vo.getFameCanUseNum(), "" + this.vo.getFameMaxNum()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        fightNumTxt.setPosition(bg.x + 8, 22);
        this.addChildToContainer(fightNumTxt);
        this._fightNumTxt = fightNumTxt;
        var addFightBtn = ComponentManager.getButton("newcrossatkrace_fameaddbtn", "", this.addFightBtnClick, this);
        addFightBtn.setScale(0.8);
        addFightBtn.setPosition(fightNumTxt.x + fightNumTxt.width + 3, fightNumTxt.y + fightNumTxt.height / 2 - addFightBtn.height * addFightBtn.scaleY / 2 - 3);
        this.addChildToContainer(addFightBtn);
        this._addFightBtn = addFightBtn;
        //当前名望称号
        var fameTitleData = this.vo.getCurrFameTitleInfo();
        var titleStr = LanguageManager.getlocal("newatkrackcross_famePtitleNothing");
        if (fameTitleData) {
            var titleCfg = this._dataList[fameTitleData.x - 1];
            var titleName = LanguageManager.getlocal("newatkrackcross_fameTitleName" + (titleCfg.baseCfg.index + 1));
            var seatNum = fameTitleData.y + titleCfg.seatCount;
            titleStr = LanguageManager.getlocal("newatkrackcross_famePtitleSeat", ["" + titleName, "" + seatNum]);
        }
        var titleInfo = ComponentManager.getTextField(LanguageManager.getlocal("newatkrackcross_famePtitle", [titleStr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        // titleInfo.setPosition(this.viewBg.x + this.viewBg.width/2 - titleInfo.width/2, 55);
        this.addChildToContainer(titleInfo);
        this._titleInfo = titleInfo;
        var fameDetailBtn = ComponentManager.getButton("newcrossatkrace_famedetailbtn", "", this.fameDetailBtnClick, this);
        fameDetailBtn.setScale(0.8);
        // fameDetailBtn.setPosition(titleInfo.x + titleInfo.width + 2, titleInfo.y + titleInfo.height/2 - fameDetailBtn.height * fameDetailBtn.scaleY/2 - 3);
        titleInfo.setPosition(this.viewBg.x + this.viewBg.width / 2 - (titleInfo.width + fameDetailBtn.width * fameDetailBtn.scaleX + 2) / 2, 60);
        fameDetailBtn.setPosition(this._titleInfo.x + this._titleInfo.width + 2, titleInfo.y + titleInfo.height / 2 - fameDetailBtn.height * fameDetailBtn.scaleY / 2 - 3);
        this.addChildToContainer(fameDetailBtn);
        this._fameDetailBtn = fameDetailBtn;
        //头衔红点
        var titleRed = BaseBitmap.create("public_dot2");
        this.addChildToContainer(titleRed);
        titleRed.setPosition(titleInfo.x - titleRed.width - 2, titleInfo.y + titleInfo.height / 2 - titleRed.height / 2 - 2);
        this._titleRed = titleRed;
        if (fameTitleData) {
            titleRed.visible = false;
        }
        //下拉选择
        var dropDownBg = BaseBitmap.create("common_select_frame");
        // dropDownBg.width = 200 - 20;
        dropDownBg.setPosition(bg.x + bg.width - dropDownBg.width - 5, 10);
        this.addChildToContainer(dropDownBg);
        this._dropDownBg = dropDownBg;
        dropDownBg.addTouchTap(this.dropDownBtnClickHandler, this, [0]);
        this._dropDownBgList.push(this._dropDownBg);
        var dropDownTxt = ComponentManager.getTextField(LanguageManager.getlocal("newatkrackcross_fameTitleName1"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        dropDownTxt.setPosition(dropDownBg.x + (dropDownBg.width - 34) / 2 - dropDownTxt.width / 2, dropDownBg.y + dropDownBg.height / 2 - dropDownTxt.height / 2);
        this.addChildToContainer(dropDownTxt);
        this._dropDownTxt = dropDownTxt;
        this._dropDownFlag = BaseBitmap.create("common_arrow_1");
        this._dropDownFlag.anchorOffsetY = this._dropDownFlag.height / 2;
        this._dropDownFlag.x = this._dropDownBg.x + this._dropDownBg.width - this._dropDownFlag.width - 2;
        this._dropDownFlag.y = this._dropDownBg.y + this._dropDownBg.height / 2;
        this.addChildToContainer(this._dropDownFlag);
        this._dropDownContainer = new BaseDisplayObjectContainer();
        this._dropDownContainer.visible = false;
        this._dropDownContainer.x = this._dropDownBg.x;
        this._dropDownContainer.y = this._dropDownBg.y + this._dropDownBg.height;
        this.addChildToContainer(this._dropDownContainer);
        var fameBaseCfg = this.vo.cfg.getFameSeatList();
        for (var index = 1; index <= fameBaseCfg.length; index++) {
            var dropDownBg_1 = BaseBitmap.create("common_select_frame");
            // dropDownBg.width = dropDownBg.width + 40;
            dropDownBg_1.y = (index - 1) * dropDownBg_1.height + 3;
            this._dropDownContainer.addChild(dropDownBg_1);
            this._dropDownBgList.push(dropDownBg_1);
            dropDownBg_1.addTouchTap(this.dropDownBtnClickHandler, this, [index]);
            var downTxt = ComponentManager.getTextField(LanguageManager.getlocal("newatkrackcross_fameTitleName" + index), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            downTxt.setPosition(dropDownBg_1.x + (dropDownBg_1.width - 34) / 2 - downTxt.width / 2, dropDownBg_1.y + dropDownBg_1.height / 2 - downTxt.height / 2);
            this._dropDownContainer.addChild(downTxt);
        }
        this.freshTitleItemHeightArr();
        // if (this.param && this.param.data && this.param.data.lineNum){
        //     let lineNum = this.param.data.lineNum;
        //     let colNum = this.param.data.colNum;
        //     App.LogUtil.log("lineNum "+lineNum + " coco "+colNum);
        //     this._jumpData = {x: lineNum, y: colNum};
        //     this.jumpToFloor(lineNum);
        // }
    };
    NewAtkraceCrossFamePopupView.prototype.refreshView = function () {
        this._fightNumTxt.text = LanguageManager.getlocal("newatkrackcross_fameChangeNum", ["" + this.vo.getFameCanUseNum(), "" + this.vo.getFameMaxNum()]);
        this._addFightBtn.x = this._fightNumTxt.x + this._fightNumTxt.width + 3;
        var fameTitleData = this.vo.getCurrFameTitleInfo();
        var titleStr = LanguageManager.getlocal("newatkrackcross_famePtitleNothing");
        if (fameTitleData) {
            var titleCfg = this._dataList[fameTitleData.x - 1];
            var titleName = LanguageManager.getlocal("newatkrackcross_fameTitleName" + (titleCfg.baseCfg.index + 1));
            var seatNum = fameTitleData.y + titleCfg.seatCount;
            titleStr = LanguageManager.getlocal("newatkrackcross_famePtitleSeat", ["" + titleName, "" + seatNum]);
            this._titleRed.visible = false;
        }
        else {
            this._titleRed.visible = true;
        }
        this._titleInfo.text = LanguageManager.getlocal("newatkrackcross_famePtitle", [titleStr]);
        this._titleInfo.x = this.viewBg.x + this.viewBg.width / 2 - (this._titleInfo.width + this._fameDetailBtn.width * this._fameDetailBtn.scaleX + 2) / 2;
        this._fameDetailBtn.x = this._titleInfo.x + this._titleInfo.width + 2;
    };
    //下拉列表
    NewAtkraceCrossFamePopupView.prototype.dropDownBtnClickHandler = function (evt, btnIdx) {
        var tmpIndex = this._lastDropIdx;
        for (var index = 1; index < this._dropBtnList.length; index++) {
            this._dropDownBgList[index].setRes("common_select_frame");
        }
        this._dropDownBgList[this._lastDropIdx].setRes("common_select_frame_down");
        if (this._dropDownContainer.visible) {
            this._dropDownFlag.scaleY = 1;
            this._dropDownContainer.visible = false;
        }
        else {
            this._dropDownFlag.scaleY = -1;
            this._dropDownContainer.visible = true;
        }
        if (btnIdx > 0) {
            this._dropDownTxt.text = LanguageManager.getlocal("newatkrackcross_fameTitleName" + btnIdx);
            this._dropDownTxt.x = this._dropDownBg.x + (this._dropDownBg.width - 34) / 2 - this._dropDownTxt.width / 2;
            this._lastDropIdx = btnIdx;
        }
        //跳转
        if (btnIdx > 0) {
            for (var i = 0; i < this._dataList.length; i++) {
                var baseCfg = this._dataList[i].baseCfg;
                if (baseCfg.index == btnIdx - 1 && this._dataList[i].isFirst) {
                    this._isJump = true;
                    this._jumpFloor = i + 1;
                    this._scrollList.setScrollTopByIndex(i, 0, true);
                    this.getMoveMapData(i + 1);
                    break;
                }
            }
        }
    };
    NewAtkraceCrossFamePopupView.prototype.freshTitleItemHeightArr = function () {
        this._titleItemHeightArr = {};
        var list = {};
        var isFirst = false;
        for (var i = 0; i < this._dataList.length; i++) {
            if (this._dataList[i].isFirst) {
                isFirst = true;
                var item = new NewAtkraceCrossFamePopupScrollItem();
                item.initItem(i, this._dataList[i], null);
                list[i] = item.height;
            }
            else {
                if (isFirst) {
                    isFirst = false;
                    var item = new NewAtkraceCrossFamePopupScrollItem();
                    item.initItem(i, this._dataList[i], null);
                    list[i] = item.height;
                }
            }
        }
        this._titleItemHeightArr = list;
        console.log("freshTitleItemHeightArr ", list);
    };
    NewAtkraceCrossFamePopupView.prototype.getCurFloor = function () {
        var list = this._scrollList;
        var top = list.scrollTop;
        App.LogUtil.log("getCurFloor top " + top);
        var offY = 0;
        var floor = 1;
        var itemH = 0;
        for (var i = 0; i < this._dataList.length; i++) {
            if (this._titleItemHeightArr[i]) {
                itemH = this._titleItemHeightArr[i];
            }
            if (offY >= top) {
                floor = i + 1;
                break;
            }
            else {
                offY += itemH;
            }
        }
        App.LogUtil.log("getCurFloor aa ", floor);
        return Math.max(floor, 1);
    };
    NewAtkraceCrossFamePopupView.prototype.getIndexs = function (num, isLast) {
        var arr = [];
        var totalFloor = this._dataList.length;
        var max = Math.ceil(totalFloor / 10);
        if (isLast) {
            for (var i = 0; i < 3; ++i) {
                if (num + i < max) {
                    arr.push(num + i);
                }
            }
        }
        else {
            for (var i = 0; i < 3; ++i) {
                if (num - i >= 0) {
                    arr.push(num - i);
                }
            }
        }
        this._currIndexs = arr;
        return arr;
    };
    NewAtkraceCrossFamePopupView.prototype.getMoveMapData = function (currFloor) {
        var isLast = true;
        var scrollOffY = this._scrollListTop - this._scrollList.scrollTop;
        this._scrollListTop = this._scrollList.scrollTop;
        if (scrollOffY > 0) {
            isLast = false;
        }
        // let pageNum = Math.max(Math.floor(currFloor/10), 1);
        var pageNum = currFloor % 10 == 0 ? Math.floor(currFloor / 10) - 1 : Math.floor(currFloor / 10);
        var totalFloor = this._dataList.length;
        var maxPage = Math.ceil(totalFloor / 10) - 1;
        var empty = false;
        var startIdx = currFloor;
        if (isLast) { //向下
            var endIdx = currFloor + 10;
            if (endIdx > totalFloor) {
                endIdx = totalFloor;
            }
            var nextPage = pageNum + 1 <= maxPage ? pageNum + 1 : maxPage;
            if (!GameData.isInArray(nextPage, this._currIndexs)) {
                empty = true;
            }
        }
        else { //向上
            var endIdx = currFloor;
            startIdx = currFloor - 10;
            if (startIdx < 1) {
                startIdx = 1;
            }
            var nextPage = pageNum - 1 >= 0 ? pageNum - 1 : 0;
            if (!GameData.isInArray(nextPage, this._currIndexs)) {
                empty = true;
            }
        }
        App.LogUtil.log("empety " + empty);
        if (empty) {
            var indexs = this.getIndexs(pageNum, isLast);
            //发请求
            NetManager.request(NetRequestConst.REQUEST_NEWATKRACECROSS_DIRECTORGETMAP, { activeId: this.vo.aidAndCode, indexs: indexs });
        }
        else {
            this.freshMapData(currFloor);
        }
    };
    NewAtkraceCrossFamePopupView.prototype.fameMapCallback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var data = evt.data.data.data;
            console.log("fameMapCallback ", data);
            Api.atkracecrossVoApi.setFameMapInfo(data.map);
            //刷新数据
            App.LogUtil.log("fameMapCallback view.getCurFloor() " + view.getCurFloor());
            view.freshMapData(view.getCurFloor());
        }
    };
    NewAtkraceCrossFamePopupView.prototype.jumpToFloor = function (floor) {
        this._isJump = true;
        this._jumpFloor = floor;
        App.LogUtil.log("jumpToFloor " + floor);
        this._scrollList.setScrollTopByIndex(this._jumpFloor - 1, 0, true);
        this.getMoveMapData(floor);
    };
    //默认刷新30层数据
    NewAtkraceCrossFamePopupView.prototype.freshMapData = function (floor, floorNum) {
        if (floorNum === void 0) { floorNum = 30; }
        App.LogUtil.log("freshMapData " + floor);
        var view = this;
        var index = Math.max(Math.floor(floor / 10) * 10, 1);
        var startFloor = index + 1;
        var endFloor = Math.min((index + floorNum), view._dataList.length);
        for (var i = startFloor; i <= endFloor; ++i) {
            var item = view._scrollList.getItemByIndex(i - 1);
            if (item) {
                item.freshData();
            }
        }
        if (view._jumpData && view._jumpData.x) {
            var item = view._scrollList.getItemByIndex(view._jumpData.x - 1);
            if (item) {
                item.playAni(view._jumpData.y);
            }
            view._jumpData = null;
        }
    };
    //增加挑战次数
    NewAtkraceCrossFamePopupView.prototype.addFightBtnClick = function () {
        var _this = this;
        if (!this.vo.isInActivity()) {
            this.vo.showAcEndTip();
            return;
        }
        //判断抢夺次数
        var fightNum = this.vo.getFameCanUseNum();
        if (fightNum < this.vo.getFameMaxNum()) {
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                msg: LanguageManager.getlocal("newatkrackcross_fameBuyHoldNumTip", ["" + this.vo.getFameFightCost()]),
                touchMaskClose: true,
                title: "itemUseConstPopupViewTitle",
                callback: function () {
                    _this.addFightCost();
                },
                handle: this,
                needClose: 1,
                needCancel: true,
                confirmTxt: "sysConfirm"
            });
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("newatkrackcross_fameBuyTip2"));
        }
    };
    NewAtkraceCrossFamePopupView.prototype.addFightCost = function () {
        var cost = this.vo.getFameFightCost();
        if (cost > Api.playerVoApi.getPlayerGem()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("newatkrackcross_fameBuyTip1"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_NEWATKRACECROSS_DIRECTOREXTRA, { activeId: this.vo.aidAndCode });
    };
    NewAtkraceCrossFamePopupView.prototype.addFightCostCallback = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        this._fightNumTxt.text = LanguageManager.getlocal("newatkrackcross_fameChangeNum", ["" + this.vo.getFameCanUseNum(), "" + this.vo.getFameMaxNum()]);
        this._addFightBtn.x = this._fightNumTxt.x + this._fightNumTxt.width + 3;
    };
    NewAtkraceCrossFamePopupView.prototype.refreshSeat = function (evt) {
        if (evt && evt.data && evt.data.isNum) {
        }
        else {
            this._scrollList.refreshData(this._dataList);
        }
        this.refreshView();
    };
    NewAtkraceCrossFamePopupView.prototype.fameDetailBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.NEWATKRACECROSSFAMEDETAILPOPUPVIEW, { aid: this.aid, code: this.code });
    };
    NewAtkraceCrossFamePopupView.prototype.getShowHeight = function () {
        return 800;
    };
    NewAtkraceCrossFamePopupView.prototype.getTitleStr = function () {
        return "newatkracecross_famePopupTitle";
    };
    NewAtkraceCrossFamePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "common_arrow_1", "common_select_frame", "common_select_frame_down", "head_circle_bg", "user_head999",
            "newcrossatkrace_fame_titlename1", "newcrossatkrace_fame_titlename2", "newcrossatkrace_fame_titlename3", "newcrossatkrace_fame_titlename4", "newcrossatkrace_fame_titlename5", "newcrossatkrace_fame_titlename6", "newcrossatkrace_fame_titlename7", "newcrossatkrace_fame_titlename8", "newcrossatkrace_fame_titlename9", "newcrossatkrace_fame_titlename10", "newcrossatkrace_fame_titlename11", "newcrossatkrace_fame_titlename12", "newcrossatkrace_fame_titlename13", "newcrossatkrace_fametitlenamebg1", "newcrossatkrace_fametitlenamebg2", "newcrossatkrace_fametitlenamebg3", "newcrossatkrace_fametitlenamebg4", "newcrossatkrace_fameaddbtn", "newcrossatkrace_famedetailbtn", "newcrossatkrace_titlenamebg"
        ]);
    };
    NewAtkraceCrossFamePopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_NEWATKRACECROSS_DIRECTORGETMAP, this.fameMapCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_NEWATKRACECROSS_DIRECTOREXTRA, this.addFightCostCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ATKRACECROSSNEW_FAMESEAT_REFRESH, this.refreshSeat, this);
        Api.atkracecrossVoApi.clearFameMapInfo();
        this._scrollList = null;
        this._dropBtnList = [];
        this._dropDownBtn = null;
        this._dropDownFlag = null;
        this._dropDownContainer = null;
        this._lastDropIdx = 0;
        this._titleItemHeightArr = {};
        this._dataList = [];
        this._scrollListTop = 0;
        this._dropDownBg = null;
        this._dropDownTxt = null;
        this._dropDownBgList = [];
        this._isJump = false;
        this._jumpFloor = 0;
        this._currIndexs = [];
        this._jumpData = null;
        this._fightNumTxt = null;
        this._titleInfo = null;
        this._titleRed = null;
        this._addFightBtn = null;
        this._fameDetailBtn = null;
        _super.prototype.dispose.call(this);
    };
    return NewAtkraceCrossFamePopupView;
}(PopupView));
//# sourceMappingURL=NewAtkraceCrossFamePopupView.js.map