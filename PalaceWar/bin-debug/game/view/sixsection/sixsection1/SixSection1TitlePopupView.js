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
* 兵部头衔
* date 2020.5.11
* author ycg
* @name SixSection1TitlePopupView
*/
var SixSection1TitlePopupView = /** @class */ (function (_super) {
    __extends(SixSection1TitlePopupView, _super);
    function SixSection1TitlePopupView() {
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
        _this._infoBtn = null;
        return _this;
    }
    SixSection1TitlePopupView.prototype.getTitleStr = function () {
        return "sixSection1TitlePopupViewTitle";
    };
    SixSection1TitlePopupView.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat("common_arrow_1", "common_select_frame", "common_select_frame_down", "head_circle_bg", "user_head999").concat(list);
    };
    SixSection1TitlePopupView.prototype.getRequestData = function () {
        var view = this;
        this._currIndexs = [0, 1, 2];
        return { requestType: NetRequestConst.REQUEST_SIXSECTION1_TITLEGETMAP, requestData: {
                indexs: [0, 1, 2]
            } };
    };
    SixSection1TitlePopupView.prototype.receiveData = function (data) {
        if (data.ret) {
            console.log("receivedata ", data.data.data.map);
            Api.sixsection1VoApi.setTitleInfo(data.data.data.map);
        }
    };
    SixSection1TitlePopupView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SIXSECTION1_TITLEGETMAP, this.titleMapCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SIXSECTION1_TITLE_REFRESH, this.refreshTitle, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SIXSECTION1_CLOSE_REFRESH, this.hide, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SIXSECTION_DIRADDTIME, this.addFightNumCallback, this);
        NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_CLICK, { stype: 3 });
        var bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 635;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 55;
        this.addChildToContainer(bg);
        var data = Api.sixsection1VoApi.formatTitleCfg();
        this._dataList = data;
        // this.freshTitleItemHeightArr();
        var scrollList = ComponentManager.getScrollList(SixSection1TitlePopupScrollItem, data, new egret.Rectangle(0, 0, bg.width - 8, bg.height - 8), {});
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
        //下拉选择
        var dropDownBg = BaseBitmap.create("common_select_frame");
        dropDownBg.width = 200;
        dropDownBg.setPosition(bg.x + bg.width - dropDownBg.width - 5, 10);
        this.addChildToContainer(dropDownBg);
        this._dropDownBg = dropDownBg;
        dropDownBg.addTouchTap(this.dropDownBtnClickHandler, this, [0]);
        this._dropDownBgList.push(this._dropDownBg);
        var dropDownTxt = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1TitlePopupItemName1"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
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
        //称号
        // let titleTf = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1PtitleInfo1", [Api.sixsection1VoApi.getPlayerMaxTitleStr()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        // titleTf.setPosition(bg.x + 5, bg.y - titleTf.height - 11);
        // this.addChildToContainer(titleTf);
        var freeNum = Api.sixsection1VoApi.getHoldTitleFreeNum();
        var fightNumTxt = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldTitleFightNum", ["" + freeNum, "" + Config.Sixsection1Cfg.freeTime]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        fightNumTxt.setPosition(bg.x + 5, bg.y - fightNumTxt.height - 11);
        this.addChildToContainer(fightNumTxt);
        this._fightNumTxt = fightNumTxt;
        var infoBtn = ComponentManager.getButton("sixsectionmainui_addbtn", "", this.infoBtnClick, this);
        infoBtn.setScale(0.9);
        infoBtn.setPosition(fightNumTxt.x + fightNumTxt.width + 5, fightNumTxt.y + fightNumTxt.height / 2 - infoBtn.height * infoBtn.scaleY / 2 - 2);
        this.addChildToContainer(infoBtn);
        this._infoBtn = infoBtn;
        if (freeNum > 0) {
            infoBtn.visible = false;
        }
        var topTip = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1TitlePopupTopTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        // topTip.setPosition(bg.x, bg.y - topTip.height - 13);
        topTip.setPosition(bg.x + bg.width / 2 - topTip.width / 2, bg.y + bg.height + 5);
        this.addChildToContainer(topTip);
        var dropCfg = [
            "sixSection1TitlePopupItemName1", "sixSection1TitlePopupItemName2", "sixSection1TitlePopupItemName3", "sixSection1TitlePopupItemName4", "sixSection1TitlePopupItemName5", "sixSection1TitlePopupItemName6", "sixSection1TitlePopupItemName7"
        ];
        for (var index = 1; index <= dropCfg.length; index++) {
            var dropDownBg_1 = BaseBitmap.create("common_select_frame");
            dropDownBg_1.width = dropDownBg_1.width + 40;
            dropDownBg_1.y = (index - 1) * dropDownBg_1.height + 3;
            this._dropDownContainer.addChild(dropDownBg_1);
            this._dropDownBgList.push(dropDownBg_1);
            dropDownBg_1.addTouchTap(this.dropDownBtnClickHandler, this, [index]);
            var downTxt = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1TitlePopupItemName" + index), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            downTxt.setPosition(dropDownBg_1.x + dropDownBg_1.width / 2 - downTxt.width / 2, dropDownBg_1.y + dropDownBg_1.height / 2 - downTxt.height / 2);
            this._dropDownContainer.addChild(downTxt);
        }
        this.freshTitleItemHeightArr();
        if (this.param && this.param.data && this.param.data.lineNum) {
            var lineNum = this.param.data.lineNum;
            var colNum = this.param.data.colNum;
            App.LogUtil.log("lineNum " + lineNum + " coco " + colNum);
            this._jumpData = { x: lineNum, y: colNum };
            this.jumpToFloor(lineNum);
        }
    };
    //下拉列表
    SixSection1TitlePopupView.prototype.dropDownBtnClickHandler = function (evt, btnIdx) {
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
            this._dropDownTxt.text = LanguageManager.getlocal("sixSection1TitlePopupItemName" + btnIdx);
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
                    // let scrollY = this.getDropDownFloorScrollTop(i);
                    // App.LogUtil.log("scrollY "+scrollY);
                    // this._scrollList.setScrollTop(scrollY, 300);
                    break;
                }
            }
        }
    };
    SixSection1TitlePopupView.prototype.getDropDownFloorScrollTop = function (index) {
        var offY = 0;
        var totalH = 0;
        for (var i = 0; i < this._titleItemHeightArr.length; i++) {
            if (i < index) {
                offY += this._titleItemHeightArr[i];
            }
            else {
                totalH += this._titleItemHeightArr[i];
            }
        }
        if (totalH - this._scrollList.height < offY) {
            offY = totalH - this._scrollList.height;
        }
        return offY;
    };
    SixSection1TitlePopupView.prototype.freshTitleItemHeightArr = function () {
        this._titleItemHeightArr = {};
        var list = {};
        var isFirst = false;
        for (var i = 0; i < this._dataList.length; i++) {
            // let item = new SixSection1TitlePopupScrollItem();
            // item.initItem(i, this._dataList[i], null);
            // this._titleItemHeightArr[i] = item.height;
            if (this._dataList[i].isFirst) {
                isFirst = true;
                var item = new SixSection1TitlePopupScrollItem();
                item.initItem(i, this._dataList[i], null);
                list[i] = item.height;
            }
            else {
                if (isFirst) {
                    isFirst = false;
                    var item = new SixSection1TitlePopupScrollItem();
                    item.initItem(i, this._dataList[i], null);
                    list[i] = item.height;
                }
            }
        }
        this._titleItemHeightArr = list;
        console.log("freshTitleItemHeightArr ", list);
    };
    SixSection1TitlePopupView.prototype.getCurFloor = function () {
        var list = this._scrollList;
        var top = list.scrollTop;
        var offY = 0;
        var floor = 1;
        // for (let i=0; i < this._titleItemHeightArr.length; i++){
        //     if (offY >= top){
        //         floor = i + 1;  ∂
        //         break;
        //     }
        //     offY += this._titleItemHeightArr[i];
        // }
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
    SixSection1TitlePopupView.prototype.getIndexs = function (num, isLast) {
        var view = this;
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
    SixSection1TitlePopupView.prototype.getMoveMapData = function (currFloor) {
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
            // for(let i = startIdx; i <= endIdx; i++){
            //     let data = Api.sixsection1VoApi.getTitleInfoByFloor(i);
            //     if(!data){
            //         empty = true;
            //         break;
            //     }
            // }
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
            // for(let i = startIdx; i <= endIdx; ++ i){
            //     let data = Api.sixsection1VoApi.getTitleInfoByFloor(i);
            //     if(!data){
            //         empty = true;
            //         break;
            //     }
            // }
            var nextPage = pageNum - 1 >= 0 ? pageNum - 1 : 0;
            if (!GameData.isInArray(nextPage, this._currIndexs)) {
                empty = true;
            }
        }
        App.LogUtil.log("empety " + empty);
        if (empty) {
            var indexs = this.getIndexs(pageNum, isLast);
            //发请求
            NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_TITLEGETMAP, { indexs: indexs });
        }
        else {
            this.freshMapData(currFloor);
        }
    };
    SixSection1TitlePopupView.prototype.jumpToFloor = function (floor) {
        this._isJump = true;
        this._jumpFloor = floor;
        App.LogUtil.log("jumpToFloor " + floor);
        this._scrollList.setScrollTopByIndex(this._jumpFloor - 1, 0, true);
        this.getMoveMapData(floor);
    };
    SixSection1TitlePopupView.prototype.titleMapCallback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var data = evt.data.data.data;
            console.log("titleMapCallback ", data);
            Api.sixsection1VoApi.setTitleInfo(data.map);
            //刷新数据
            view.freshMapData(view.getCurFloor());
        }
    };
    //默认刷新30层数据
    SixSection1TitlePopupView.prototype.freshMapData = function (floor, floorNum) {
        if (floorNum === void 0) { floorNum = 30; }
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
    SixSection1TitlePopupView.prototype.refreshTitle = function (evt) {
        var freeNum = Api.sixsection1VoApi.getHoldTitleFreeNum();
        if (freeNum > 0) {
            this._infoBtn.visible = false;
        }
        else {
            this._infoBtn.visible = true;
        }
        this._fightNumTxt.text = LanguageManager.getlocal("sixSection1HoldTitleFightNum", ["" + freeNum, "" + Config.Sixsection1Cfg.freeTime]);
        this._infoBtn.x = this._fightNumTxt.x + this._fightNumTxt.width + 5;
        if (evt && evt.data && evt.data.isNum) {
        }
        else {
            this._scrollList.refreshData(this._dataList);
        }
    };
    //头衔详情
    SixSection1TitlePopupView.prototype.infoBtnClick = function () {
        //判断抢夺次数
        var freeNum = Api.sixsection1VoApi.getHoldTitleFreeNum();
        if (freeNum < 1) {
            var itemId = Config.Sixsection1Cfg.item1;
            var itemCfg = Config.ItemCfg.getItemCfgById(itemId);
            var itemInfoVo = Api.itemVoApi.getItemInfoVoById(Number(itemId));
            var num = 0;
            if (itemInfoVo) {
                num = itemInfoVo.num;
            }
            var message = LanguageManager.getlocal("sixSection1HoldTitleUseToolTip", ["" + itemCfg.name, "" + 1]);
            var mesObj = {
                confirmCallback: this.addFightNum,
                handler: this,
                icon: itemCfg.icon,
                iconBg: itemCfg.iconBg,
                num: num,
                useNum: 1,
                msg: message,
                id: itemId
            };
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, mesObj);
        }
    };
    SixSection1TitlePopupView.prototype.addFightNum = function () {
        NetManager.request(NetRequestConst.REQUEST_SIXSECTION_DIRADDTIME, {});
    };
    SixSection1TitlePopupView.prototype.addFightNumCallback = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        var freeNum = Api.sixsection1VoApi.getHoldTitleFreeNum();
        if (freeNum > 0) {
            this._infoBtn.visible = false;
        }
        else {
            this._infoBtn.visible = true;
        }
        this._fightNumTxt.text = LanguageManager.getlocal("sixSection1HoldTitleFightNum", ["" + freeNum, "" + Config.Sixsection1Cfg.freeTime]);
        this._infoBtn.x = this._fightNumTxt.x + this._fightNumTxt.width + 5;
    };
    SixSection1TitlePopupView.prototype.getShowHeight = function () {
        return 800;
    };
    SixSection1TitlePopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SIXSECTION1_TITLEGETMAP, this.titleMapCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SIXSECTION1_TITLE_REFRESH, this.refreshTitle, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SIXSECTION1_CLOSE_REFRESH, this.hide, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SIXSECTION_DIRADDTIME, this.addFightNumCallback, this);
        Api.sixsection1VoApi.clearTitleMapInfo();
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
        this._infoBtn = null;
        _super.prototype.dispose.call(this);
    };
    return SixSection1TitlePopupView;
}(PopupView));
//# sourceMappingURL=SixSection1TitlePopupView.js.map