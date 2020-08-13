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
* 皇城六部 兵部
* date 2020.5.7
* author ycg
* @name SixSection1View
*/
var SixSection1View = /** @class */ (function (_super) {
    __extends(SixSection1View, _super);
    function SixSection1View() {
        var _this = _super.call(this) || this;
        _this._dropBtnList = [];
        _this._dropDownBtn = null;
        _this._dropDownFlag = null;
        _this._dropDownContainer = null;
        _this._lastDropIdx = 0;
        _this._showMore = null;
        _this._moreArrow = null;
        _this._bottomLogTxt = null;
        _this._isShowMore = false;
        _this._isTouchMore = false;
        _this._showMoreContainer = null;
        _this._bottomBg = null;
        _this._currMaskBmp = null;
        _this._buildContainer = null;
        _this._scaleBtn = null;
        _this._isBig = false;
        _this._scrollList = null;
        _this._scrollLeft = 0;
        _this._lineScroll = null;
        _this._dataList = [];
        _this._buildItemHeightArr = {};
        _this._buildItemHeightList = {};
        _this._scrollListTop = 0;
        _this._currShowFloor = 1;
        _this._powerNum = null;
        _this._powerSpeed = null;
        _this._titleInfo = null;
        _this._titleRed = null;
        _this._currPowerNum = 0;
        _this._isJump = false;
        _this._jumpFloor = 0;
        _this._holdLogList = [];
        _this._tipName = null;
        _this._tipPoint = null;
        _this._seatBtn = null;
        _this._sectionTitleBtn = null;
        _this._rechargeBtn = null;
        _this._isCrossDay = false;
        _this._crossTime = 0;
        _this._currIndexs = [];
        _this._timeBg = null;
        _this._time = null;
        _this._isFirst = true;
        _this._jumpData = null;
        _this._isCanJump = false;
        _this._isNeedClose = false;
        _this._useInfluenceNum = 0;
        _this._addPowerBtn = null;
        _this._battleAtk = null;
        _this._teamNum = null;
        return _this;
    }
    // protected getBgName():string{
    //     return "searchbg1";
    // }
    SixSection1View.prototype.getTitleStr = function () {
        return "sixSectionBuildName2";
    };
    // protected getTitleBgName():string{
    //     return "";
    // }
    SixSection1View.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    SixSection1View.prototype.getRuleInfo = function () {
        return "sixSection1RuleInfo";
    };
    SixSection1View.prototype.getProbablyInfo = function () {
        return "";
    };
    Object.defineProperty(SixSection1View.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    SixSection1View.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat("common_select_frame", "common_arrow_1", "common_select_frame_down", "arena_bottom_bg", "battlepassfntbg-1").concat(list);
    };
    SixSection1View.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SIXSECTION1_GETMAP), this.mapCallBack, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SIXSECTION1_ADDINFLUENCE, this.addPowerCallback, this); //增加影响力
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SIXSECTION1_ATTACK, this.holdSeatCallback, this); //占领席位
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SIXSECTION1_SEAT_REFRESH, this.refreshSeat, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SIXSECTION1_GETLIST, this.getLogListCallback, this); //log
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SIXSECTION1_TITLE_REFRESH, this.refreshTitle, this); //头衔
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SIXSECTION1_SHOW, this.resetCrossTimeCallback, this);
        Api.sixsection1VoApi.clearBuildMapInfo();
        this._dropBtnList = [];
        this._dropDownBtn = null;
        this._dropDownFlag = null;
        this._dropDownContainer = null;
        this._lastDropIdx = 0;
        this._showMore = null;
        this._moreArrow = null;
        this._bottomLogTxt = null;
        this._isShowMore = false;
        this._isTouchMore = false;
        this._showMoreContainer = null;
        this._bottomBg = null;
        this._currMaskBmp = null;
        this._buildContainer = null;
        this._scaleBtn = null;
        this._isBig = false;
        this._scrollList = null;
        this._scrollLeft = 0;
        this._lineScroll = null;
        this._dataList = [];
        this._buildItemHeightArr = {};
        this._buildItemHeightList = {};
        this._scrollListTop = 0;
        this._currShowFloor = 1;
        this._powerNum = null;
        this._powerSpeed = null;
        this._titleInfo = null;
        this._titleRed = null;
        this._currPowerNum = 0;
        this._isJump = false;
        this._jumpFloor = 0;
        this._holdLogList = [];
        this._tipName = null;
        this._tipPoint = null;
        this._seatBtn = null;
        this._sectionTitleBtn = null;
        this._rechargeBtn = null;
        this._isCrossDay = false;
        this._crossTime = 0;
        this._currIndexs = [];
        this._timeBg = null;
        this._time = null;
        this._isFirst = true;
        this._jumpData = null;
        this._isCanJump = false;
        this._isNeedClose = true;
        this._useInfluenceNum = 0;
        this._addPowerBtn = null;
        this._battleAtk = null;
        this._teamNum = null;
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(SixSection1View.prototype, "cfg", {
        get: function () {
            return Config.Sixsection1Cfg;
        },
        enumerable: true,
        configurable: true
    });
    SixSection1View.prototype.getRequestData = function () {
        var view = this;
        var index = [0, 1, 2];
        this._currIndexs = index;
        return { requestType: NetRequestConst.REQUEST_SIXSECTION1_GETMAP, requestData: {
                indexs: index
            } };
    };
    SixSection1View.prototype.receiveData = function (data) {
        if (data.ret) {
            if (this._isFirst) {
                console.log("receivedata ", data.data.data.map);
                Api.sixsection1VoApi.setMapInfo(data.data.data.map);
                Api.sixsection1VoApi.setLogList(data.data.data.list);
            }
        }
        // view.vo.setBossNumInfo(data.data.data);
    };
    SixSection1View.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SIXSECTION1_ADDINFLUENCE, this.addPowerCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SIXSECTION1_GETLIST, this.getLogListCallback, this); //抢夺记录
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SIXSECTION1_SEAT_REFRESH, this.refreshSeat, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SIXSECTION1_TITLE_REFRESH, this.refreshTitle, this); //头衔
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SIXSECTION1_SHOW, this.resetCrossTimeCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SIXSECTION1_GETMAP), this.mapCallBack, this);
        App.LogUtil.log("section1 initView " + this.container.y);
        // this._crossTime = App.DateUtil.getWeeTs(GameData.serverTime);
        var buildContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(buildContainer);
        this._buildContainer = buildContainer;
        buildContainer.width = GameConfig.stageWidth;
        var infoBg = BaseBitmap.create("sixsectionmainui_topbg");
        infoBg.setPosition(GameConfig.stageWidth / 2 - infoBg.width / 2, -15);
        this.addChildToContainer(infoBg);
        //影响力值
        var powerData = Api.sixsection1VoApi.getInfluenceData();
        this._currPowerNum = Math.floor(powerData.num);
        var powerNum = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1Power", ["" + Math.floor(powerData.num), "" + powerData.max]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        powerNum.setPosition(infoBg.x + 25, infoBg.y + 15);
        this.addChildToContainer(powerNum);
        this._powerNum = powerNum;
        //影响力
        var addBtn = ComponentManager.getButton("sixsectionmainui_addbtn", "", this.addBtnClick, this);
        addBtn.setScale(0.9);
        addBtn.setPosition(powerNum.x + powerNum.width + 5, powerNum.y + powerNum.height / 2 - addBtn.height * addBtn.scaleY / 2 - 2);
        this.addChildToContainer(addBtn);
        this._addPowerBtn = addBtn;
        //影响力速度
        var powerSpeed = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1PowerSpeed", ["" + powerData.speed]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        powerSpeed.setPosition(addBtn.x + addBtn.width * addBtn.scaleX, powerNum.y);
        this.addChildToContainer(powerSpeed);
        this._powerSpeed = powerSpeed;
        //称号
        // let titleTf = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1PtitleInfo1", [Api.sixsection1VoApi.getPlayerMaxTitleStr()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        // titleTf.setPosition(powerNum.x, infoBg.y + infoBg.height/2 + 10);
        // this.addChildToContainer(titleTf);
        var infoBtn = ComponentManager.getButton("sixsectionmainui_detailbtn", "", this.infoBtnClick, this);
        infoBtn.setScale(0.9);
        // infoBtn.setPosition(titleTf.x + titleTf.width + 5, titleTf.y + titleTf.height/2 - infoBtn.height * infoBtn.scaleY /2 - 2);
        infoBtn.setPosition(infoBg.x + infoBg.width - infoBtn.width * infoBtn.scaleX - 10, infoBg.y + infoBg.height / 2 + 21 - infoBtn.height * infoBtn.scaleY / 2 - 2);
        this.addChildToContainer(infoBtn);
        //出战攻击力
        var addValues = Api.sixsection1VoApi.getBaseBuff();
        var addAtk = Math.floor(addValues[0] * 1000 + 0.5) / 10;
        var battleAtk = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1BattleDetail_itembuff1", ["" + addAtk]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        battleAtk.setPosition(GameConfig.stageWidth - 33 - 15 - battleAtk.width, infoBg.y + infoBg.height / 2 + 10);
        this.addChildToContainer(battleAtk);
        this._battleAtk = battleAtk;
        //兵部头衔
        var titleId = Api.sixsection1VoApi.getCurrTitleId();
        var sectionTitleStr = LanguageManager.getlocal("sixSection1PNoHoldTitle");
        App.LogUtil.log("titleid " + titleId);
        if (titleId) {
            var titleCfg = Api.sixsection1VoApi.formatTitleCfg();
            var index = titleCfg[titleId - 1].baseCfg.index;
            sectionTitleStr = LanguageManager.getlocal("sixSection1PHoldTitle", [LanguageManager.getlocal("sixSection1TitlePopupItemName" + (index + 1))]);
        }
        var sectionTitle = ComponentManager.getTextField(sectionTitleStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        // sectionTitle.setPosition(infoBg.x + infoBg.width/2 + 35, infoBg.y + infoBg.height/2 + 10);
        sectionTitle.setPosition(powerNum.x, infoBg.y + infoBg.height / 2 + 10);
        this.addChildToContainer(sectionTitle);
        this._titleInfo = sectionTitle;
        //红点
        var titleRed = BaseBitmap.create("public_dot2");
        titleRed.setPosition(sectionTitle.x - titleRed.width - 1, sectionTitle.y + sectionTitle.height / 2 - titleRed.height / 2 - 1);
        this.addChildToContainer(titleRed);
        this._titleRed = titleRed;
        if (titleId) {
            titleRed.visible = false;
        }
        //头衔点击
        var sectionTitleAlpha = BaseBitmap.create("public_alphabg");
        // sectionTitleAlpha.width = infoBg.width - sectionTitle.x + 25;
        sectionTitleAlpha.width = GameConfig.stageWidth / 2 - 25;
        sectionTitleAlpha.height = sectionTitle.height + 12;
        this.addChildToContainer(sectionTitleAlpha);
        sectionTitleAlpha.setPosition(sectionTitle.x - 25, sectionTitle.y - 7);
        sectionTitleAlpha.addTouchTap(this.sectionTitleBtnClick, this);
        //下拉选择
        this._dropDownBtn = ComponentManager.getButton("common_select_frame", "", this.dropDownBtnClickHandler, this, [0]);
        this._dropDownBtn.x = GameConfig.stageWidth - this._dropDownBtn.width - 5;
        this._dropDownBtn.y = infoBg.y + infoBg.height - 3;
        this._dropDownBtn.setColor(ServantView.DROPBTN_COLOR1);
        this.addChildToContainer(this._dropDownBtn);
        this._dropDownBtn.setTextOffX(-15);
        this._dropDownBtn.setText("sixSection1BuildName1");
        this._dropBtnList.push(this._dropDownBtn);
        this._dropDownFlag = BaseBitmap.create("common_arrow_1");
        this._dropDownFlag.anchorOffsetY = this._dropDownFlag.height / 2;
        this._dropDownFlag.x = this._dropDownBtn.x + this._dropDownBtn.width - this._dropDownFlag.width - 3;
        this._dropDownFlag.y = this._dropDownBtn.y + this._dropDownBtn.height - this._dropDownFlag.height / 2 - 3;
        this.addChildToContainer(this._dropDownFlag);
        this._dropDownContainer = new BaseDisplayObjectContainer();
        this._dropDownContainer.visible = false;
        this._dropDownContainer.x = this._dropDownBtn.x;
        this._dropDownContainer.y = this._dropDownBtn.y + this._dropDownBtn.height;
        this.addChildToContainer(this._dropDownContainer);
        var dropCfg = [
            "sixSection1BuildName1", "sixSection1BuildName2", "sixSection1BuildName3", "sixSection1BuildName4", "sixSection1BuildName5", "sixSection1BuildName6", "sixSection1BuildName7"
        ];
        for (var index = 1; index <= dropCfg.length; index++) {
            var tmpBtn = ComponentManager.getButton("common_select_frame", "", this.dropDownBtnClickHandler, this, [index]);
            this._dropBtnList.push(tmpBtn);
            tmpBtn.setColor(ServantView.DROPBTN_COLOR1);
            tmpBtn.y = tmpBtn.height * (index - 1) + 3;
            this._dropDownContainer.addChild(tmpBtn);
            tmpBtn.setTextOffX(-15);
            tmpBtn.setText(dropCfg[index - 1]);
        }
        //倒计时
        var timeBg = BaseBitmap.create("public_itemtipbg2");
        this.addChildToContainer(timeBg);
        this._timeBg = timeBg;
        var time = ComponentManager.getTextField(this.getTimeCountDown(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this.addChildToContainer(time);
        this._time = time;
        // timeBg.width = time.width + 40;
        timeBg.height = time.height + 10;
        timeBg.setPosition(powerNum.x - 10, infoBg.y + infoBg.height + 3);
        time.setPosition(timeBg.x + 10, timeBg.y + timeBg.height / 2 - time.height / 2 + 1);
        var teamNum = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1UseServantTeam", ["" + Api.sixsection1VoApi.getHoldTeamNum(), "" + Api.sixsection1VoApi.getHoldTeamMaxNum()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        teamNum.setPosition(time.x + time.width + 30, time.y);
        timeBg.width = time.width + teamNum.width + 70;
        this.addChildToContainer(teamNum);
        this._teamNum = teamNum;
        //bottom
        this.initBottom();
        //bottom btn
        //兵部头衔
        var sectionTitleBtn = ComponentManager.getButton("sixsection1_titlebtn", "", this.sectionTitleBtnClick, this);
        sectionTitleBtn.setPosition(40, GameConfig.stageHeigth - this.container.y - this._bottomBg.height - sectionTitleBtn.height);
        this.addChildToContainer(sectionTitleBtn);
        this._sectionTitleBtn = sectionTitleBtn;
        //席位信息
        var seatBtn = ComponentManager.getButton("sixsection1_seatinfobtn", "", this.holdBattleBtnClick, this);
        seatBtn.setPosition(sectionTitleBtn.x + sectionTitleBtn.width + 10, sectionTitleBtn.y);
        this.addChildToContainer(seatBtn);
        this._seatBtn = seatBtn;
        //物资供应
        var rechargeBtn = ComponentManager.getButton("sixsection1_rechargebtn", "", this.rechargeBtnClick, this);
        rechargeBtn.setPosition(seatBtn.x + seatBtn.width + 10, seatBtn.y);
        this.addChildToContainer(rechargeBtn);
        this._rechargeBtn = rechargeBtn;
        //缩放按钮
        var scaleBtn = ComponentManager.getButton("sixsectionmainui_bigbtn", "", this.scaleBtnClick, this);
        scaleBtn.setPosition(GameConfig.stageWidth - scaleBtn.width - 40, GameConfig.stageHeigth - this.container.y - this._bottomBg.height - scaleBtn.height - 10);
        this.addChildToContainer(scaleBtn);
        this._scaleBtn = scaleBtn;
        //建筑
        App.LogUtil.log("this.contane. y " + this.container.y);
        // buildContainer.height = GameConfig.stageHeigth - infoBg.height + 15 - this._bottomBg.height - this.container.y + 10 + 3;
        // buildContainer.setPosition(0, infoBg.y + infoBg.height - 3);
        buildContainer.height = GameConfig.stageHeigth - this._bottomBg.height + 10;
        buildContainer.setPosition(0, -this.container.y);
        this.initBuild();
        //结算弹窗
        var resultData = Api.sixsection1VoApi.getResultSeat();
        if (resultData.length > 0) {
            ViewController.getInstance().openView(ViewConst.COMMON.SIXSECTION1HOLDRESULTVIEW);
        }
        this.checkTitleRed();
        this.checkSeatInfoRed();
        this.checkRechargeRed();
        this._isFirst = false;
    };
    //建筑
    SixSection1View.prototype.initBuild = function () {
        var _this = this;
        var dataList = Api.sixsection1VoApi.formatBuildCfg();
        this._dataList = dataList;
        console.log("intbuild ", dataList);
        this.freshBuildItemHeightArr();
        // let scrollList = ComponentManager.getScrollList(SixSection1BuildScrollItem, dataList, new egret.Rectangle(0, 0, this._buildContainer.width, this._buildContainer.height), {});
        var scrollList = ComponentManager.getScrollList(SixSection1BuildScrollItem, dataList, new egret.Rectangle(0, 0, this._buildContainer.width, this._buildContainer.height), {}, 20, false, false);
        scrollList.setPosition(0, 0);
        this._buildContainer.addChild(scrollList);
        this._scrollList = scrollList;
        scrollList.horizontalScrollPolicy = "off";
        scrollList.bounces = false;
        scrollList.setShowArrow(false);
        scrollList.bindMoveCompleteCallback(function () {
            if (!_this._isJump) {
                _this.getMoveMapData(_this.getCurFloor());
            }
            else {
                _this._isJump = false;
            }
        }, this);
        this._scrollListTop = scrollList.scrollTop;
        var lineScroll = ComponentManager.getScrollList(SixSection1BuildLineItem, dataList, new egret.Rectangle(0, 0, 40, this._buildContainer.height));
        this._buildContainer.addChild(lineScroll);
        lineScroll.horizontalScrollPolicy = "off";
        lineScroll.verticalScrollPolicy = "off";
        this._lineScroll = lineScroll;
        scrollList.bindChangeCallback(function () {
            lineScroll.scrollTop = scrollList.scrollTop;
            // lineScroll.setScrollTop(scrollList.scrollTop);
        }, this);
        // console.log("this._builditem ",this._buildItemHeightArr);
        this.freshMapData(this.getCurFloor());
        if (this.param && this.param.data && this.param.data.lineNum) {
            this.jumpToFloor(this.param.data.lineNum);
        }
    };
    SixSection1View.prototype.freshBuildItemHeightArr = function () {
        this._buildItemHeightArr = {};
        this._buildItemHeightList = {};
        var list = {};
        var isFirst = false;
        for (var i = 0; i < this._dataList.length; i++) {
            if (this._dataList[i].isFirst) {
                isFirst = true;
                var item = new SixSection1BuildScrollItem();
                item.initItem(i, this._dataList[i], { isBig: this._isBig });
                list[i] = item.height;
                this._buildItemHeightList[i] = { itemH: item.height, seatH: item.getSeatItemHeight() };
            }
            else if (this._dataList[i].isLast) {
                var item = new SixSection1BuildScrollItem();
                item.initItem(i, this._dataList[i], { isBig: this._isBig });
                list[i] = item.height;
                this._buildItemHeightList[i] = { itemH: item.height, seatH: item.getSeatItemHeight() };
            }
            this._buildItemHeightArr = list;
        }
        // console.log("freshBuildItemHeightArr ", this._buildItemHeightArr);
    };
    SixSection1View.prototype.getCurFloor = function () {
        var list = this._scrollList;
        var top = list.scrollTop;
        var offY = 0;
        var floor = 1;
        var itemH = 0;
        for (var i = 0; i < this._dataList.length; i++) {
            if (this._buildItemHeightArr[i]) {
                itemH = this._buildItemHeightArr[i];
            }
            if (offY >= top) {
                floor = i + 1;
                break;
            }
            offY += itemH;
        }
        App.LogUtil.log("getCurFloor " + floor);
        return Math.max(floor, 1);
    };
    SixSection1View.prototype.getIndexs = function (num, isLast) {
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
    SixSection1View.prototype.getMoveMapData = function (currFloor) {
        // let currFloor = this.getCurFloor();
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
        App.LogUtil.log("getMoveMapData " + isLast + " currFloor " + currFloor + " totalFloor " + totalFloor);
        if (isLast) {
            var endIdx = currFloor + 10;
            if (endIdx > totalFloor) {
                endIdx = totalFloor;
            }
            // for(let i = startIdx; i <= endIdx; i++){
            //     let data = Api.sixsection1VoApi.getMapInfoByFloor(i);
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
        else {
            var endIdx = currFloor;
            startIdx = currFloor - 10;
            if (startIdx < 1) {
                startIdx = 1;
            }
            // for(let i = startIdx; i <= endIdx; ++ i){
            //     let data = Api.sixsection1VoApi.getMapInfoByFloor(i);
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
            // if(this._scrollList.checkIsAtButtom()){
            //     indexs = this.getIndexs(pageNum, true);
            // }
            // else if(this._scrollList.scrollTop <= 0){
            //     indexs = this.getIndexs(pageNum, false);
            // }
            //发请求
            NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_GETMAP, { indexs: indexs });
        }
        else {
            if (this._isJump) {
                this.moveJump();
            }
        }
    };
    SixSection1View.prototype.jumpToFloor = function (floor, colNum) {
        this._isJump = true;
        // let num = floor -1;
        this._jumpFloor = floor;
        App.LogUtil.log("jumpToFloor " + floor + "  colNum " + colNum);
        if (colNum) {
            this._jumpData = { x: floor, y: colNum };
            if (this._isBig) {
                this.scaleBtnClick();
                return;
            }
            // else{
            //     this._isCanJump = true;
            //     if (this._jumpData.y <= 3){
            //         this._scrollList.scrollLeft = 0;
            //     }
            //     else{
            //         let item = this._scrollList.getItemByIndex(0);
            //         this._scrollList.scrollLeft = item.width - this._scrollList.width; 
            //     }
            // }
        }
        App.LogUtil.log("jumpto floor " + floor);
        // this._scrollList.setScrollTopByIndex(this._jumpFloor - 1, 200, true);
        // this._lineScroll.setScrollTopByIndex(this._jumpFloor - 1, 200, true);
        // this.getMoveMapData(floor);
        var offIndex = 2;
        if (this._jumpFloor <= 3) {
            offIndex = 1;
        }
        var showFloor = this._jumpFloor - offIndex >= 1 ? this._jumpFloor - offIndex : 1;
        this._jumpFloor = showFloor;
        if (floor <= 3 && floor != 1) {
            this._scrollList.setScrollTop(200 + (floor - 2) * 100);
            this._lineScroll.setScrollTop(200 + (floor - 2) * 100);
        }
        else {
            this._scrollList.setScrollTopByIndex(showFloor - 1, 100, true);
            this._lineScroll.setScrollTopByIndex(showFloor - 1, 100, true);
        }
        this.getMoveMapData(showFloor);
    };
    SixSection1View.prototype.moveJump = function () {
        App.LogUtil.log("movejump " + this._isJump);
        this.freshMapData(this._jumpFloor);
    };
    SixSection1View.prototype.mapCallBack = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var data = evt.data.data.data;
            console.log("mapCallBack ", data);
            Api.sixsection1VoApi.setMapInfo(data.map);
            Api.sixsection1VoApi.setLogList(data.list);
            App.LogUtil.log("mapCallBack " + this._isJump);
            //刷新数据
            // if (this._isJump){
            //     this.moveJump();
            // }
            // else{
            //     view.freshMapData(view.getCurFloor());
            // }
            view.freshMapData(view.getCurFloor());
            this.refreshLogTxt();
        }
    };
    //默认刷新30层数据
    SixSection1View.prototype.freshMapData = function (floor, floorNum) {
        if (floorNum === void 0) { floorNum = 30; }
        App.LogUtil.log("freshMapData floor " + floor);
        var view = this;
        var index = Math.max(Math.floor(floor / 10) * 10, 1);
        var startFloor = index;
        var endFloor = Math.min((index + floorNum), this._dataList.length);
        for (var i = startFloor; i <= endFloor; ++i) {
            var item = view._scrollList.getItemByIndex(i - 1);
            if (item) {
                item.freshData();
            }
        }
        if (this._jumpData && this._jumpData.x) {
            var item = view._scrollList.getItemByIndex(this._jumpData.x - 1);
            if (item) {
                item.playAni(this._jumpData.y);
            }
            this._jumpData = null;
            // this._isCanJump = false;
        }
    };
    //底部
    SixSection1View.prototype.initBottom = function () {
        var bottomBg = BaseBitmap.create("sixsectionmainui_bottombg");
        bottomBg.setPosition(GameConfig.stageWidth / 2 - bottomBg.width / 2, GameConfig.stageHeigth - bottomBg.height);
        this.addChildAt(bottomBg, this.getChildIndex(this._ruleBtn) + 1);
        this._bottomBg = bottomBg;
        var showMore = ComponentManager.getButton("sixsectionmainui_moretxt", "", this.showMoreHandle, this);
        showMore.setPosition(GameConfig.stageWidth - showMore.width - 40, bottomBg.y + bottomBg.height / 2 - showMore.height / 2);
        this.addChild(showMore);
        this._showMore = showMore;
        this._moreArrow = BaseBitmap.create("sixsectionmainui_downflag");
        this._moreArrow.anchorOffsetY = this._moreArrow.height / 2;
        this._moreArrow.scaleY = -1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, this._moreArrow, showMore, [-this._moreArrow.width + 10, 0]);
        this.addChild(this._moreArrow);
        //文本
        var tipContainer = new BaseDisplayObjectContainer();
        tipContainer.setPosition(0, bottomBg.y);
        this.addChild(tipContainer);
        var tipName = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipName.setPosition(25, 20);
        tipContainer.addChild(tipName);
        this._tipName = tipName;
        var tipTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.height = 20;
        tipTxt.setPosition(25, tipName.y + 30);
        tipContainer.addChild(tipTxt);
        this._bottomLogTxt = tipTxt;
        var tipPoint = ComponentManager.getTextField("...", 20, TextFieldConst.COLOR_WHITE);
        tipPoint.setPosition(tipName.x + 385, tipName.y + 30);
        tipContainer.addChild(tipPoint);
        this._tipPoint = tipPoint;
        tipPoint.visible = false;
        this.refreshLogTxt();
    };
    SixSection1View.prototype.refreshLogTxt = function () {
        var list = Api.sixsection1VoApi.getLogList();
        if (list && list.length > 0) {
            console.log("refreshlogtxt ", list);
            var atkInfo = null;
            var atkSv = null;
            // let defenInfo:any = null;
            // let buildName:string = null;
            var infoStr = null;
            if (list[0].type == "director") {
                atkInfo = list[0].uinfo;
                atkSv = Api.mergeServerVoApi.getAfterMergeSeverName(atkInfo.uid);
                var defenInfo = list[0].fuinfo;
                var defenSv = Api.mergeServerVoApi.getAfterMergeSeverName(defenInfo.uid);
                var titleCfg = Api.sixsection1VoApi.getTitleCfgByLine(list[0].x);
                var buildName = LanguageManager.getlocal("sixSection1TitlePopupItemName" + (titleCfg.baseCfg.index + 1));
                infoStr = LanguageManager.getlocal("sixSection1HoldLogInfo2", [defenInfo.name, defenSv, buildName]);
            }
            else {
                // atkInfo = list[0].pklogs[0][3];
                atkInfo = list[0].minfo;
                atkSv = Api.mergeServerVoApi.getAfterMergeSeverName(atkInfo.uid);
                //info
                // let defenInfo = list[0].pklogs[0][4];
                var defenInfo = list[0].finfo;
                var defenSv = Api.mergeServerVoApi.getAfterMergeSeverName(defenInfo.uid);
                var buildCfg = Api.sixsection1VoApi.getBuildCfgByLine(list[0].x);
                var buildName = LanguageManager.getlocal("sixSection1BuildName" + (buildCfg.baseCfg.index + 1));
                infoStr = LanguageManager.getlocal("sixSection1HoldLogInfo1", [defenInfo.name, defenSv, buildName]);
            }
            this._tipName.text = atkInfo.name + "(" + atkSv + ")";
            this._bottomLogTxt.text = infoStr;
            this._tipPoint.visible = true;
            if (this._bottomLogTxt.width >= 380) {
                this._bottomLogTxt.width = 380;
            }
            else {
                this._tipPoint.visible = false;
            }
        }
    };
    SixSection1View.prototype.showMoreHandle = function () {
        if (!this._isTouchMore) {
            this._isShowMore = !this._isShowMore;
            if (this._isShowMore == true) {
                NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_GETLIST, {});
            }
            else {
                this._moreArrow.scaleY = -1;
                this.closeList();
            }
        }
    };
    SixSection1View.prototype.getLogListCallback = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        var rData = evt.data.data.data;
        console.log(" getLogListCallback ", rData);
        this._holdLogList = rData.list;
        this._moreArrow.scaleY = 1;
        this.showList();
    };
    SixSection1View.prototype.showList = function () {
        var currMaskBmp = BaseBitmap.create("public_9_viewmask");
        currMaskBmp.width = GameConfig.stageWidth;
        currMaskBmp.height = GameConfig.stageHeigth;
        currMaskBmp.touchEnabled = true;
        this.addChild(currMaskBmp);
        this.setChildIndex(currMaskBmp, this.getChildIndex(this._bottomBg));
        this._currMaskBmp = currMaskBmp;
        this._showMoreContainer = new BaseDisplayObjectContainer();
        this.addChild(this._showMoreContainer);
        var moreBg = BaseBitmap.create("arena_bottom_bg"); //arena_bottom_bg
        moreBg.width = 640;
        moreBg.height = GameConfig.stageHeigth - 89 - this._bottomBg.height - 160;
        moreBg.touchEnabled = true;
        this._showMoreContainer.addChild(moreBg);
        App.LogUtil.log("moreBg.h " + moreBg.height);
        this._showMoreContainer.height = moreBg.height;
        // 增加 点击区域
        var touchBg = BaseBitmap.create("public_9_bg25");
        touchBg.width = 640;
        touchBg.height = GameConfig.stageHeigth - (this._bottomBg.height - 10 + moreBg.height) + 40;
        touchBg.x = 0;
        touchBg.y = -touchBg.height + 30;
        touchBg.alpha = 0;
        touchBg.addTouchTap(this.showMoreHandle, this);
        this._showMoreContainer.addChild(touchBg);
        if (this._holdLogList.length > 0) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 5, 620, moreBg.height - 20);
            var moreScrollList = ComponentManager.getScrollList(SixSection1HoldLogItem, this._holdLogList, rect);
            this._showMoreContainer.addChild(moreScrollList);
            moreScrollList.bounces = false;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, moreScrollList, moreBg, [0, 10]);
            Api.sixsection1VoApi.setLogList(this._holdLogList[0]);
            this.refreshLogTxt();
        }
        else {
            var noDataTip = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1NoHoldLog"), 20);
            noDataTip.x = moreBg.x + moreBg.width / 2 - noDataTip.width / 2;
            noDataTip.y = moreBg.y + moreBg.height / 2 - noDataTip.height / 2;
            this._showMoreContainer.addChild(noDataTip);
        }
        this._showMoreContainer.y = GameConfig.stageHeigth + 30;
        this._isTouchMore = true;
        var desY = GameConfig.stageHeigth - (this._bottomBg.height - 10 + moreBg.height);
        egret.Tween.get(this._showMoreContainer).to({ y: desY }, 500).call(function () {
            egret.Tween.removeTweens(this._showMoreContainer);
            this._isTouchMore = false;
        }, this);
    };
    SixSection1View.prototype.closeList = function () {
        if (this._showMoreContainer) {
            this._isTouchMore = true;
            egret.Tween.get(this._showMoreContainer).to({ y: GameConfig.stageHeigth + 30 }, 500).call(function () {
                this._isTouchMore = false;
                egret.Tween.removeTweens(this._showMoreContainer);
                this._showMoreContainer.dispose();
                this._showMoreContainer = null;
            }, this);
        }
        if (this._currMaskBmp) {
            this._currMaskBmp.dispose();
            this._currMaskBmp = null;
        }
        // if(this._bottomLogTxt){
        //     this._bottomLogTxt.visible = true;
        // }
    };
    //下拉列表
    SixSection1View.prototype.dropDownBtnClickHandler = function (btnIdx) {
        var tmpIndex = this._lastDropIdx;
        for (var index = 1; index < this._dropBtnList.length; index++) {
            this._dropBtnList[index].updateButtonImage(BaseButton.BTN_STATE1);
        }
        this._dropBtnList[this._lastDropIdx].updateButtonImage(BaseButton.BTN_STATE2);
        if (this._dropDownContainer.visible) {
            this._dropDownFlag.scaleY = 1;
            this._dropDownContainer.visible = false;
        }
        else {
            this._dropDownFlag.scaleY = -1;
            this._dropDownContainer.visible = true;
        }
        if (btnIdx > 0) {
            this._dropDownBtn.setText("sixSection1BuildName" + btnIdx);
            this._lastDropIdx = btnIdx;
        }
        App.LogUtil.log("tmpIndex " + tmpIndex + " this.last " + this._lastDropIdx);
        // if (tmpIndex == this._lastDropIdx){
        //     return ;
        // }
        App.LogUtil.log("btnindex " + btnIdx);
        //跳转
        if (btnIdx > 0) {
            for (var i = 0; i < this._dataList.length; i++) {
                var baseCfg = this._dataList[i].baseCfg;
                if (baseCfg.index == btnIdx - 1 && this._dataList[i].isFirst) {
                    this._isJump = true;
                    this._jumpFloor = i + 1;
                    // this._scrollList.setScrollTopByIndex(i, 100, true);
                    // this._lineScroll.setScrollTopByIndex(i, 100, true);
                    if (!this._isBig) {
                        var offIndex = 2;
                        if (i <= 2) {
                            offIndex = 1;
                        }
                        var showFloor = i - offIndex >= 0 ? i - offIndex : 0;
                        this._jumpFloor = showFloor + 1;
                        if (i <= 2 && i != 0) {
                            this._scrollList.setScrollTop(200 + (i - 1) * 100);
                            this._lineScroll.setScrollTop(200 + (i - 1) * 100);
                        }
                        else {
                            this._scrollList.setScrollTopByIndex(showFloor, 100, true);
                            this._lineScroll.setScrollTopByIndex(showFloor, 100, true);
                        }
                        App.LogUtil.log("dropdwon " + i);
                        this.getMoveMapData(showFloor + 1);
                    }
                    else {
                        if (i <= 1) {
                            this._scrollList.setScrollTop(i * 600);
                            this._lineScroll.setScrollTop(i * 600);
                        }
                        else {
                            this._jumpFloor = i;
                            this._scrollList.setScrollTopByIndex(i - 1, 100, true);
                            this._lineScroll.setScrollTopByIndex(i - 1, 100, true);
                            App.LogUtil.log("dropdwon " + i);
                            this.getMoveMapData(i);
                        }
                    }
                    break;
                }
            }
        }
    };
    //增加影响力
    SixSection1View.prototype.addBtnClick = function () {
        NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_CLICK, { stype: 13 });
        if (!Api.sixsection1VoApi.isInPeriousTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1EndTip"));
            return;
        }
        var titleData = Api.sixsection1VoApi.getInfluenceData();
        if (this._currPowerNum >= titleData.max || titleData.num >= titleData.max) {
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1PowerAddTip"));
            return;
        }
        var itemId = Config.Sixsection1Cfg.item2;
        var itemCfg = Config.ItemCfg.getItemCfgById(itemId);
        var itemInfoVo = Api.itemVoApi.getItemInfoVoById(Number(itemId));
        var num = 0;
        if (itemInfoVo) {
            num = itemInfoVo.num;
        }
        //     let message = LanguageManager.getlocal("sixSection1PowerUseItem",[""+itemCfg.name]);
        //     let mesObj = {
        //         confirmCallback: this.addBtnCallback, 
        //         handler: this, 
        //         icon:  itemCfg.icon,
        //         iconBg: itemCfg.iconBg, 
        //         num: num, 
        //         useNum:1,
        //         msg: message ,
        //         id : itemId,
        //    };
        //    ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, mesObj);
        if (num <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1PowerUseItemTip"));
            return;
        }
        var useMaxNum = Math.ceil((titleData.max - this._currPowerNum) / this.cfg.infAdd);
        var canUseNum = num > useMaxNum ? useMaxNum : num;
        App.LogUtil.log("titleData.max " + titleData.max + "  curr " + this._currPowerNum + "  canuseNum " + canUseNum);
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSEPOPUPVIEW, { itemId: itemInfoVo.id, maxNum: canUseNum, effectNum: this.cfg.infAdd, useTipKey: "sixSection1PowerUseItem1", callback: this.addBtnCallback, handler: this });
    };
    //增加影响力回调
    SixSection1View.prototype.addBtnCallback = function (itemNum) {
        var titleData = Api.sixsection1VoApi.getInfluenceData();
        if (this._currPowerNum >= titleData.max) {
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1PowerAddTip"));
            return;
        }
        var itemId = Config.Sixsection1Cfg.item2;
        var itemInfoVo = Api.itemVoApi.getItemInfoVoById(Number(itemId));
        var num = 0;
        if (itemInfoVo) {
            num = itemInfoVo.num;
        }
        if (num <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1PowerUseItemTip"));
            return;
        }
        //增加影响力 调接口
        this._useInfluenceNum = itemNum;
        NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_ADDINFLUENCE, { num: itemNum });
    };
    SixSection1View.prototype.addPowerCallback = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        var rData = evt.data.data.data;
        if (rData.SS1stat == 6) {
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1PowerAddTip"));
            return;
        }
        var influence = Api.sixsection1VoApi.getInfluenceData();
        this._currPowerNum = Math.floor(influence.num);
        App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1PowerUseSuccessTip", ["" + (this._useInfluenceNum * this.cfg.infAdd)]));
        this.freshTopInfo();
    };
    //头衔详情
    SixSection1View.prototype.infoBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.SIXSECTION1BATTLEFORMATIONVIEW);
        // let container = new BaseDisplayObjectContainer();
        // container.width = GameConfig.stageWidth;
        // container.height = GameConfig.stageHeigth;
        // this.addChild(container);
        // let mask = BaseBitmap.create("public_9_viewmask");
        // mask.width=GameConfig.stageWidth;
        // mask.height=GameConfig.stageHeigth;
        // container.addChild(mask);
        // mask.addTouchTap(()=>{
        //     container.dispose();
        // }, this);
        // let bg = BaseBitmap.create("public_9_wordbg");
        // bg.touchEnabled = true;
        // bg.width = GameConfig.stageWidth;
        // bg.height = 300;
        // container.addChild(bg);
        // bg.y = container.height/2 - bg.height/2;
        // let title = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1TitleRuleTitle"), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WHITE);
        // title.setPosition(bg.x + bg.width/2 - title.width/2, bg.y + 10);
        // container.addChild(title);
        // // let scrollCon = new BaseDisplayObjectContainer();
        // let info:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1TitleRuleInfo"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        // info.width = 620;
        // info.lineSpacing = 5;
        // info.setPosition(bg.x + bg.width/2 - info.width/2, title.y + title.height + 20);
        // container.addChild(info);
        // bg.height = info.height + info.y - bg.y + 40;
    };
    //兵部头衔
    SixSection1View.prototype.sectionTitleBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.SIXSECTION1TITLEPOPUPVIEW, {});
    };
    //席位信息
    SixSection1View.prototype.holdBattleBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.SIXSECTION1SEATINFOPOPUPVIEW, {});
    };
    //物资供应
    SixSection1View.prototype.rechargeBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.SIXSECTION1RECHARGEVIEW, {});
    };
    //缩放按钮
    SixSection1View.prototype.scaleBtnClick = function () {
        this._isBig = !this._isBig;
        var dataList = Api.sixsection1VoApi.formatBuildCfg();
        this._currShowFloor = this.getCurFloor();
        this.freshBuildItemHeightArr();
        if (this._isBig) {
            this._scaleBtn.setBtnBitMap("sixsectionmainui_smallbtn");
            this._scrollList.refreshData(dataList, { isBig: true });
            // this._scrollList.setContentScale(2, 2);
            // this._lineScroll.setContentScale(2, 2);
            this._lineScroll.refreshData(dataList, { isBig: true, itemArr: this._buildItemHeightList });
            this._scrollList.horizontalScrollPolicy = "on";
            var item = this._scrollList.getItemByIndex(0);
            App.LogUtil.log("item.with " + item.width);
            this._scrollList.scrollLeft = item.width - this._scrollList.width;
        }
        else {
            this._scaleBtn.setBtnBitMap("sixsectionmainui_bigbtn");
            this._scrollList.refreshData(dataList, { isBig: false });
            // this._scrollList.setContentScale(1, 1);
            // this._lineScroll.setContentScale(1, 1);
            this._lineScroll.refreshData(dataList, { isBig: false, itemArr: this._buildItemHeightList });
            this._scrollList.horizontalScrollPolicy = "off";
            this._scrollList.scrollLeft = 0;
        }
        this._isJump = true;
        this._jumpFloor = this._currShowFloor;
        var floor = this._currShowFloor;
        // console.log("scaleBtnClick jumpdata ", this._jumpData);
        if (this._jumpData) {
            floor = this._jumpData.x;
        }
        App.LogUtil.log("scaleBtnClick " + floor);
        this.jumpToFloor(floor);
    };
    SixSection1View.prototype.tick = function () {
        //倒计时
        this._time.text = this.getTimeCountDown();
        // this._timeBg.width = this._time.width + 40;
        this._teamNum.x = this._time.x + this._time.width + 30;
        this._timeBg.width = this._time.width + this._teamNum.width + 70;
        // this._timeBg.x = this._dropDownBtn.x - this._timeBg.width - 10;
        // this._time.x = this._timeBg.x + this._timeBg.width/2 - this._time.width/2;
        //不在进行时间内
        if (!Api.sixsection1VoApi.isInPeriousTime()) {
            if (!this._isNeedClose) {
                this._isNeedClose = true;
                App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1EndTip"));
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SIXSECTION1_CLOSE_REFRESH);
                this.hide();
            }
            return;
        }
        var svTime = GameData.serverTime;
        var titleData = Api.sixsection1VoApi.getInfluenceData();
        if (titleData && (svTime - titleData.st) % 60 == 0) {
            var dt = Math.floor((svTime - titleData.st) / 60);
            var currNum = Math.floor(titleData.num + dt * titleData.speed / 60);
            if (titleData.max <= currNum) {
                currNum = titleData.max;
                if (titleData.num > titleData.max) {
                    currNum = titleData.num;
                }
            }
            this._currPowerNum = Math.floor(currNum);
            this._powerNum.text = LanguageManager.getlocal("sixSection1Power", ["" + Math.floor(currNum), "" + titleData.max]);
            this._addPowerBtn.x = this._powerNum.x + this._powerNum.width + 5;
            this._powerSpeed.x = this._addPowerBtn.x + this._addPowerBtn.width * this._addPowerBtn.scaleX;
        }
        this.checkSeatInfoRed();
        this.checkRechargeRed();
        this.resetCrossTime();
    };
    //功能倒计时
    SixSection1View.prototype.getTimeCountDown = function () {
        var str = "";
        var et = Api.sixsection1VoApi.et - GameData.serverTime;
        if (et < 0) {
            str = LanguageManager.getlocal("sixSection1EndTip");
        }
        else {
            str = App.DateUtil.getFormatBySecond(et, 17);
        }
        return LanguageManager.getlocal("sixSection1TimeDown", [str]);
    };
    //跨天处理
    SixSection1View.prototype.resetCrossTime = function () {
        var time0 = App.DateUtil.getWeeTs(GameData.serverTime);
        var et = time0 + this.cfg.resetTime * 3600;
        if (GameData.serverTime >= et) {
            if (Api.sixsection1VoApi.isInPeriousTime()) {
                // NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_SHOW, {show: 0});
                if (this._isCrossDay && time0 != this._crossTime) {
                    App.LogUtil.log("resetCrossTime");
                    this._crossTime = App.DateUtil.getWeeTs(GameData.serverTime);
                    this._isCrossDay = false;
                    if (this._currIndexs.length > 0) {
                        NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_GETMAP, { indexs: this._currIndexs });
                    }
                    else {
                        this.getMoveMapData(this.getCurFloor());
                    }
                }
            }
        }
        else {
            this._isCrossDay = true;
        }
    };
    SixSection1View.prototype.resetCrossTimeCallback = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        if (this._isCrossDay) {
            this._isCrossDay = false;
            this._scrollList.refreshData(this._dataList);
        }
    };
    //刷新顶部数据
    SixSection1View.prototype.freshTopInfo = function () {
        var influenceData = Api.sixsection1VoApi.getInfluenceData();
        if (influenceData) {
            this._powerNum.text = LanguageManager.getlocal("sixSection1Power", ["" + Math.floor(influenceData.num), "" + influenceData.max]);
            this._powerSpeed.text = LanguageManager.getlocal("sixSection1PowerSpeed", ["" + influenceData.speed]);
            this._addPowerBtn.x = this._powerNum.x + this._powerNum.width + 5;
            this._powerSpeed.x = this._addPowerBtn.x + this._addPowerBtn.width * this._addPowerBtn.scaleX;
            // this._powerSpeed.x = this._powerNum.x + this._powerNum.width;
            this._currPowerNum = Math.floor(influenceData.num);
        }
        var titleId = Api.sixsection1VoApi.getCurrTitleId();
        var sectionTitleStr = LanguageManager.getlocal("sixSection1PNoHoldTitle");
        if (titleId) {
            var titleCfg = Api.sixsection1VoApi.formatTitleCfg();
            var index = titleCfg[titleId - 1].baseCfg.index;
            sectionTitleStr = LanguageManager.getlocal("sixSection1PHoldTitle", [LanguageManager.getlocal("sixSection1TitlePopupItemName" + (index + 1))]);
            this._titleRed.visible = false;
        }
        else {
            this._titleRed.visible = true;
        }
        this._titleInfo.text = sectionTitleStr;
        this._teamNum.text = LanguageManager.getlocal("sixSection1UseServantTeam", ["" + Api.sixsection1VoApi.getHoldTeamNum(), "" + Api.sixsection1VoApi.getHoldTeamMaxNum()]);
        this._teamNum.x = this._timeBg.x + this._timeBg.width + 10;
        this.checkTitleRed();
    };
    //占领席位 回调
    SixSection1View.prototype.holdSeatCallback = function (evt) {
        if (evt.data.ret) {
            var data = evt.data.data.data;
            Api.sixsection1VoApi.setMapInfo(data.map);
            this.freshMapData(this.getCurFloor());
        }
    };
    SixSection1View.prototype.refreshSeat = function (evt) {
        var data = evt.data;
        // console.log("refreshSeat ",evt.data);
        // App.LogUtil.log("refreshSEAT "+data.)
        var item = this._scrollList.getItemByIndex(data.lineNum - 1);
        if (item) {
            item.freshData();
        }
        this.refreshLogTxt();
        this.freshTopInfo();
    };
    SixSection1View.prototype.refreshTitle = function (evt) {
        App.LogUtil.log("refreshTitle");
        this.refreshLogTxt();
        this.freshTopInfo();
    };
    //红点 席位信息
    SixSection1View.prototype.checkSeatInfoRed = function () {
        if (Api.sixsection1VoApi.isInPeriousTime() && Api.sixsection1VoApi.checkSeatInfoRed()) {
            App.CommonUtil.addIconToBDOC(this._seatBtn);
            var reddot = this._seatBtn.getChildByName("reddot");
            reddot.x = 70;
            reddot.y = 2;
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._seatBtn);
        }
    };
    //无头衔红点
    SixSection1View.prototype.checkTitleRed = function () {
        //兵部头衔红点
        if (Api.sixsection1VoApi.checkTitleRed() && Api.sixsection1VoApi.isInPeriousTime()) {
            App.CommonUtil.addIconToBDOC(this._sectionTitleBtn);
            var reddot = this._sectionTitleBtn.getChildByName("reddot");
            reddot.x = 70;
            reddot.y = 2;
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._sectionTitleBtn);
        }
    };
    //充值奖励
    SixSection1View.prototype.checkRechargeRed = function () {
        if (Api.sixsection1VoApi.checkRechargeRed() && Api.sixsection1VoApi.isInPeriousTime()) {
            App.CommonUtil.addIconToBDOC(this._rechargeBtn);
            var reddot = this._rechargeBtn.getChildByName("reddot");
            reddot.x = 70;
            reddot.y = 2;
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._rechargeBtn);
        }
    };
    return SixSection1View;
}(CommonView));
//# sourceMappingURL=SixSection1View.js.map