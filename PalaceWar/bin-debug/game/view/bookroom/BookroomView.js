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
 * 政务
 * author yanyuling
 * date 2017/11/24
 * @class BookroomView
 */
var BookroomView = (function (_super) {
    __extends(BookroomView, _super);
    function BookroomView() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this.bigType = 0;
        _this.baseArr = [];
        _this.monthArr = [];
        _this.yearArr = [];
        _this.bigArr = [];
        _this.bg = null;
        _this.floorArr = [];
        _this._mainTaskHandKey = null;
        _this.itemArr = [];
        return _this;
    }
    Object.defineProperty(BookroomView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    BookroomView.prototype.getContainerY = function () {
        return 10;
    };
    BookroomView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_BUY), this.buySeatHandlerCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_FINISH), this.refreshSeatNum, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY), this.refreshSeatNum, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.useCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REST_BOOKROOM, this.restList, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_BOOKROOM_ONEKEYSTUDY, this.onekeyCallback, this);
        Api.mainTaskVoApi.checkShowGuide();
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        this._nodeContainer2 = new BaseDisplayObjectContainer();
        var bg = BaseBitmap.create("bookroom_bg");
        this._nodeContainer.addChild(bg);
        this.bg = bg;
        var posNum = Api.bookroomVoApi.getSeatNum();
        this.baseArr = this.getBaseArray();
        var curPosNumTxt = ComponentManager.getTextField("", 20);
        curPosNumTxt.x = 30;
        curPosNumTxt.y = 10;
        curPosNumTxt.name = "curPosNumTxt";
        this._nodeContainer2.addChild(curPosNumTxt);
        var addBtn = ComponentManager.getButton("mainui_btn1", "", this.addBtnClickHandler, this);
        addBtn.x = 180;
        addBtn.y = curPosNumTxt.y - 7;
        addBtn.visible = false;
        addBtn.name = "addBtn";
        this._nodeContainer2.addChild(addBtn);
        // if(Api.switchVoApi.checkOpenAutoStudy())
        // {
        //     this.makeStudyBtn();
        // } 
        if (!Api.rookieVoApi.isGuiding && (!Api.rookieVoApi.isInGuiding)) {
            egret.callLater(function () {
                _this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(_this.parent, addBtn.x, addBtn.y + 100, [addBtn], 501, true, function () {
                    var posNum = 0;
                    if (Api.switchVoApi.checkOpenSeat()) {
                        posNum = Api.bookroomVoApi.getMaxleng();
                    }
                    else {
                        posNum = Api.bookroomVoApi.getSeatNum();
                    }
                    return posNum < GameConfig.config.bookroomCfg.maxPos;
                }, _this);
            }, this);
        }
        this.upData();
        this.showFloor(this._data.maxNum);
        this.bigArr = this.getbigArr();
        // this.makeBatchBtn(this.bigArr.length); 
        for (var index = 0; index < this.bigArr.length; index++) {
            var currObj = this.bigArr[index];
            var num = Number(currObj.posId);
            this.makeSeatItem(num, currObj, index);
        }
        var scrollH = GameConfig.stageHeigth - this.container.y + 10;
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, scrollH);
        var scrollView = ComponentManager.getScrollView(this._nodeContainer, rect);
        scrollView.y = -15;
        scrollView.bounces = false;
        this.addChildToContainer(scrollView);
        var mask = BaseLoadBitmap.create("servant_mask");
        mask.width = GameConfig.stageWidth;
        mask.scaleY = -1;
        mask.y = 120;
        this.addChildToContainer(mask);
        this.addChildToContainer(this._nodeContainer2);
        //一键太学 一键完成合并
        this.showAutoMake();
        if (!Api.rookieVoApi.isInGuiding && (!Api.rookieVoApi.isGuiding)) {
            var indexData = this.getFirstEmptySeat();
            var taskId = Api.mainTaskVoApi.getCurMainTaskId();
            var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
            if (taskCfg && taskCfg.questType == 502 && indexData.index > -1) {
                var top_1 = Math.min(Math.max(0, 200 * (indexData.index - 2)), this._nodeContainer.height - scrollView.height);
                scrollView.setScrollTop(top_1);
            }
        }
    };
    /**
     * 一键太学 一键完成合并
     */
    BookroomView.prototype.showAutoMake = function () {
        var forpeople_bottom = BaseBitmap.create("forpeople_bottom");
        forpeople_bottom.x = GameConfig.stageWidth - forpeople_bottom.width - 20;
        forpeople_bottom.y = 5;
        this._nodeContainer2.addChild(forpeople_bottom);
        var autoBtn = ComponentManager.getButton("bookroom_visitIcon", "", this.autoMakeBtnHandler, this);
        autoBtn.x = forpeople_bottom.x + forpeople_bottom.width / 2 - autoBtn.width / 2;
        autoBtn.y = forpeople_bottom.y + forpeople_bottom.height / 2 - autoBtn.height / 2;
        autoBtn.name = "autoRoomBtn";
        this._nodeContainer2.addChild(autoBtn);
        var batchFlag = BaseBitmap.create("bookroom_batch");
        batchFlag.x = forpeople_bottom.x + forpeople_bottom.width / 2 - batchFlag.width / 2;
        batchFlag.y = forpeople_bottom.y + forpeople_bottom.height - batchFlag.height;
        this._nodeContainer2.addChild(batchFlag);
        batchFlag.name = "autoBatchFlag";
        var studyFlag = BaseBitmap.create("bookroomview_study_text");
        studyFlag.x = forpeople_bottom.x + forpeople_bottom.width / 2 - studyFlag.width / 2;
        studyFlag.y = forpeople_bottom.y + forpeople_bottom.height - studyFlag.height;
        this._nodeContainer2.addChild(studyFlag);
        studyFlag.name = "studyFlag";
        this.refreshSeatNum();
        this.freshAutoMake();
    };
    BookroomView.prototype.freshAutoMake = function () {
        var autoBtn = this._nodeContainer2.getChildByName("autoRoomBtn");
        var batchFlag = this._nodeContainer2.getChildByName("autoBatchFlag");
        var studyFlag = this._nodeContainer2.getChildByName("studyFlag");
        var bookroomCfg = GameConfig.config.bookroomCfg;
        var vipLevel = Api.playerVoApi.getPlayerVipLevel();
        var maxPosNum = Api.bookroomVoApi.getMaxleng();
        var studyNum = Api.bookroomVoApi.getInStudyServantNum();
        this.baseArr = this.getBaseArray();
        // App.LogUtil.log("freshAutoMake "+ Api.bookroomVoApi.isBatchenable() + " maxPosNum "+maxPosNum + " studyNum "+studyNum);
        if (Api.bookroomVoApi.isBatchenable()) {
            batchFlag.visible = true;
            studyFlag.visible = false;
            //一键完成
            if (vipLevel < bookroomCfg.needVip) {
                if (maxPosNum < 5) {
                    autoBtn.setGray(true);
                }
                else {
                    autoBtn.setGray(false);
                }
            }
            else {
                autoBtn.setGray(false);
            }
        }
        else {
            if (vipLevel < bookroomCfg.needVip) {
                //座位数已满
                if (maxPosNum <= studyNum) {
                    autoBtn.setGray(true);
                    batchFlag.visible = true;
                    studyFlag.visible = false;
                }
                else {
                    autoBtn.setGray(true);
                    batchFlag.visible = false;
                    studyFlag.visible = true;
                }
            }
            else {
                if (maxPosNum > studyNum) {
                    //一键学习
                    batchFlag.visible = false;
                    studyFlag.visible = true;
                    autoBtn.setGray(false);
                }
                else {
                    //一键完成
                    batchFlag.visible = true;
                    studyFlag.visible = false;
                    autoBtn.setGray(true);
                }
            }
        }
        if (this.baseArr.length == bookroomCfg.maxPos) {
            this._nodeContainer2.getChildByName("addBtn").visible = false;
        }
        else {
            this._nodeContainer2.getChildByName("addBtn").visible = true;
        }
    };
    BookroomView.prototype.tick = function () {
        this.freshAutoMake();
    };
    /**
     * 一键太学、完成 按钮事件
     */
    BookroomView.prototype.autoMakeBtnHandler = function () {
        var bookroomCfg = GameConfig.config.bookroomCfg;
        var vipLevel = Api.playerVoApi.getPlayerVipLevel();
        var maxPosNum = Api.bookroomVoApi.getMaxleng();
        var studyNum = Api.bookroomVoApi.getInStudyServantNum();
        if (Api.bookroomVoApi.isBatchenable()) {
            //一键完成
            if (vipLevel < bookroomCfg.needVip) {
                if (maxPosNum < 5) {
                    App.CommonUtil.showTip(LanguageManager.getlocal('bookRoomServant_batchTip'));
                    return;
                }
                else {
                    //调用一键完成接口
                    NetManager.request(NetRequestConst.REQUEST_BOOKROOM_FINISH, { isbatch: 1, pos: 0 });
                }
            }
            else {
                //调用一键完成接口
                NetManager.request(NetRequestConst.REQUEST_BOOKROOM_FINISH, { isbatch: 1, pos: 0 });
            }
        }
        else {
            if (vipLevel < bookroomCfg.needVip) {
                //座位数已满
                if (maxPosNum <= studyNum) {
                    if (maxPosNum < 5) {
                        App.CommonUtil.showTip(LanguageManager.getlocal('bookRoomServant_batchTip'));
                    }
                    else {
                        App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_batchNotEnable"));
                    }
                }
                else {
                    App.CommonUtil.showTip(LanguageManager.getlocal("bookRoomServant_studyTip", [bookroomCfg.needVip]));
                }
            }
            else {
                if (maxPosNum > studyNum) {
                    //调用一键学习接口
                    var data = this.getbigArr();
                    var canUseData = Api.bookroomVoApi.getCanUseSeat(data);
                    ViewController.getInstance().openView(ViewConst.POPUP.BOOKROOMAUTOSELECTSERVANTPOPUPVIEW, { data: data, seatNum: canUseData.length });
                }
                else {
                    //一键完成
                    App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_batchNotEnable"));
                }
            }
        }
    };
    /**
     * 一键太学
     */
    BookroomView.prototype.makeStudyBtn = function () {
        var bookroomCfg = GameConfig.config.bookroomCfg;
        var vipLevel = Api.playerVoApi.getPlayerVipLevel();
        var forpeople_bottom = BaseBitmap.create("forpeople_bottom");
        forpeople_bottom.x = GameConfig.stageWidth - (forpeople_bottom.width + 20) * 2;
        forpeople_bottom.y = 5;
        this._nodeContainer2.addChild(forpeople_bottom);
        var bookroom_study = ComponentManager.getButton("bookroomview_study", "", this.studyClick, this);
        bookroom_study.x = forpeople_bottom.x + forpeople_bottom.width / 2 - bookroom_study.width / 2;
        bookroom_study.y = forpeople_bottom.y + forpeople_bottom.height / 2 - bookroom_study.height / 2;
        this._nodeContainer2.addChild(bookroom_study);
        var studyFlag = BaseBitmap.create("bookroomview_study_text");
        studyFlag.x = forpeople_bottom.x + forpeople_bottom.width / 2 - studyFlag.width / 2;
        studyFlag.y = forpeople_bottom.y + forpeople_bottom.height - studyFlag.height;
        this._nodeContainer2.addChild(studyFlag);
        if (vipLevel >= bookroomCfg.needVip) {
            bookroom_study.setGray(false);
        }
        else {
            bookroom_study.setGray(true);
        }
    };
    /**
     * 学习的监听事件
     */
    BookroomView.prototype.studyClick = function () {
        var bookroomCfg = GameConfig.config.bookroomCfg;
        var vipLevel = Api.playerVoApi.getPlayerVipLevel();
        if (vipLevel < bookroomCfg.needVip) {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoomServant_studyTip", [bookroomCfg.needVip]));
            return;
        }
        if (Api.bookroomVoApi.isServantStudy()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoomViewStudyTip2"));
        }
        else {
            NetManager.request(NetRequestConst.REQUEST_BOOKROOM_STUDY, { "onekey": 1 });
        }
    };
    BookroomView.prototype.makeSeatItem = function (index, data, _length) {
        if (data === void 0) { data = null; }
        var bookRoomInfoItem = new BookroomInfoItem();
        bookRoomInfoItem.init(index, data);
        var posX = 20;
        if ((_length % 2) == 1) {
            //如果是比较长的语言  bookRoomInfoItem中的容器会被文本撑开  所以默认固定间隔是桌子的宽度 284 
            //    posX = GameConfig.stageWidth -bookRoomInfoItem.width - posX ;
            posX = GameConfig.stageWidth - 304;
        }
        var posY = 500 + Math.floor(_length / 2) * 200;
        bookRoomInfoItem.x = posX;
        bookRoomInfoItem.y = posY;
        this._nodeContainer.addChild(bookRoomInfoItem);
        this.itemArr.push(bookRoomInfoItem);
    };
    BookroomView.prototype.makeBatchBtn = function (posNum) {
        var posNum2 = Api.bookroomVoApi.getMaxleng();
        var bookroomCfg = GameConfig.config.bookroomCfg;
        this.baseArr = this.getBaseArray();
        // posNum >= 5 && 
        var bookroom_batch = null;
        if (!this._nodeContainer2.getChildByName("bookroom_batch")) {
            var forpeople_bottom = BaseBitmap.create("forpeople_bottom");
            forpeople_bottom.x = GameConfig.stageWidth - forpeople_bottom.width - 20;
            forpeople_bottom.y = 5;
            this._nodeContainer2.addChild(forpeople_bottom);
            bookroom_batch = ComponentManager.getButton("bookroom_visitIcon", "", this.batchHandler, this);
            var batchFlag = BaseBitmap.create("bookroom_batch");
            batchFlag.x = forpeople_bottom.x + forpeople_bottom.width / 2 - batchFlag.width / 2;
            batchFlag.y = forpeople_bottom.y + forpeople_bottom.height - batchFlag.height;
            bookroom_batch.x = forpeople_bottom.x + forpeople_bottom.width / 2 - bookroom_batch.width / 2;
            bookroom_batch.y = forpeople_bottom.y + forpeople_bottom.height / 2 - bookroom_batch.height / 2;
            bookroom_batch.name = "bookroom_batch";
            this._nodeContainer2.addChild(bookroom_batch);
            this._nodeContainer2.addChild(batchFlag);
        }
        else {
            bookroom_batch = this._nodeContainer2.getChildByName("bookroom_batch");
        }
        // let batchTipTxt = this._nodeContainer2.getChildByName("batchTipTxt");&& batchTipTxt
        if (posNum2 >= 5) {
            // batchTipTxt.visible = false;
            bookroom_batch.setGray(false);
        }
        else {
            bookroom_batch.setGray(true);
        }
        this.refreshSeatNum();
        if (this.baseArr.length == bookroomCfg.maxPos) {
            this._nodeContainer2.getChildByName("addBtn").visible = false;
        }
        else {
            this._nodeContainer2.getChildByName("addBtn").visible = true;
        }
    };
    BookroomView.prototype.batchHandler = function () {
        var posNum = Api.bookroomVoApi.getMaxleng();
        if (posNum < 5) {
            App.CommonUtil.showTip(LanguageManager.getlocal('bookRoomServant_batchTip'));
            return;
        }
        var keys = Api.bookroomVoApi.getPosListInStudy();
        if (keys.length > 0) {
            if (Api.bookroomVoApi.isBatchenable() == false) {
                App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_batchNotEnable"));
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_BOOKROOM_FINISH, { isbatch: 1, pos: 0 });
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_batchEmptyTip"));
        }
    };
    BookroomView.prototype.refreshSeatNum = function (event) {
        var _this = this;
        if (event && event.data && event.data.ret) {
            var rdata = event.data.data.data;
            var luckys = rdata.luckys;
            var bookroomstat = rdata.bookroomstat;
            if (bookroomstat) {
                if (bookroomstat == 3) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("bookRoomViewStudyTip1"));
                }
                else if (bookroomstat == 2) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("bookRoomViewStudyTip2"));
                }
            }
            // luckys = [1,2,3];
            if (luckys) {
                var luckLen_1 = luckys.length;
                if (luckLen_1 > 0) {
                    var num_1 = 0;
                    var ths = this;
                    var timerNum_1 = egret.setInterval(function () {
                        num_1 += 1;
                        _this.playLucky();
                        if (num_1 >= luckLen_1) {
                            egret.clearInterval(timerNum_1);
                        }
                    }, ths, 1500, 1);
                }
            }
        }
        var posNum = 0;
        if (Api.switchVoApi.checkOpenSeat()) {
            posNum = Api.bookroomVoApi.getMaxleng();
        }
        else {
            posNum = Api.bookroomVoApi.getSeatNum();
        }
        var curPosNumTxt = this._nodeContainer2.getChildByName("curPosNumTxt");
        var posStr = Api.bookroomVoApi.getPosListInStudy().length + "/" + posNum;
        curPosNumTxt.text = LanguageManager.getlocal("bookRoom_posNUm", [posStr]);
    };
    BookroomView.prototype.buySeatHandlerCallback = function (event) {
        if (event && event.data && event.data.ret) {
            var rdata = event.data.data;
            if (rdata.ret == 0) {
                this.restList();
                var posNum = 0;
                if (Api.switchVoApi.checkOpenSeat()) {
                    posNum = Api.bookroomVoApi.getMaxleng();
                }
                else {
                    posNum = Api.bookroomVoApi.getSeatNum();
                }
                var curPosNumTxt = this._nodeContainer2.getChildByName("curPosNumTxt");
                var posStr = Api.bookroomVoApi.getPosListInStudy().length + "/" + posNum;
                curPosNumTxt.text = LanguageManager.getlocal("bookRoom_posNUm", [posStr]);
                if (posNum == GameConfig.config.bookroomCfg.maxPos) {
                    this._nodeContainer2.getChildByName("addBtn").visible = false;
                }
                else {
                    this._nodeContainer2.getChildByName("addBtn").visible = true;
                }
                //    if(Api.switchVoApi.checkOpenSeat()==false)
                //    {
                //         // let posNum = Api.bookroomVoApi.getSeatNum();
                //         // this.makeSeatItem2(posNum -1);
                //         // this.makeBatchBtn(posNum); 
                //         this.restList();
                //    }
                //    else
                //    {
                //         this.restList();
                //    }
                //重新布置背景 
                App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_buySeatTip1"));
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_buySeatTip2"));
            }
        }
        /**
         * 扩充席位后，需要调整展示
         */
    };
    BookroomView.prototype.buySeatHandler = function () {
        NetManager.request(NetRequestConst.REQUEST_BOOKROOM_BUY, {});
    };
    BookroomView.prototype.addBtnClickHandler = function () {
        var bookroomCfg = GameConfig.config.bookroomCfg;
        var needNum = bookroomCfg.needGem[Api.bookroomVoApi.getSeatNum() - 1];
        // if (Api.playerVoApi.getPlayerGem() < needNum)
        // {
        //     App.CommonUtil.showTip(LanguageManager.getlocal("bookRoomServant_gemNotEncouch"));
        //     return;
        // }
        var message = LanguageManager.getlocal("bookRoomServant_buySeat", [String(needNum)]);
        var mesObj = {
            confirmCallback: this.buySeatHandler,
            handler: this,
            icon: "itemicon1",
            iconBg: "itembg_1",
            num: Api.playerVoApi.getPlayerGem(),
            useNum: needNum,
            msg: message,
            id: 1,
        };
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, mesObj);
    };
    BookroomView.prototype.playLucky = function () {
        var boomPic = BaseBitmap.create("manage_boomtext");
        boomPic.anchorOffsetX = boomPic.width / 2;
        boomPic.anchorOffsetY = boomPic.height / 2;
        var picX = 500;
        var picY = 250;
        boomPic.setPosition(picX, picY);
        LayerManager.msgLayer.addChild(boomPic);
        egret.Tween.get(boomPic).to({ scaleX: 1.1, scaleY: 1.1 }, 50).to({ scaleX: 1, scaleY: 1 }, 70).to({ y: picY - 50, alpha: 0.7 }, 600).call(function (boomPic) {
            boomPic.dispose();
        }.bind(this, boomPic), this);
        App.CommonUtil.showGodbless("bookRoom");
    };
    BookroomView.prototype.onekeyCallback = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        var rData = evt.data.data.data;
        if (rData && rData.posPast) {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_autoDataChangeTip"));
        }
        this.refreshSeatNum(evt);
        this.restList();
    };
    BookroomView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "bookroom_batch", "bookroom_bg", "bookroom_cdbg", "bookroom_desk",
            "bookroom_desk_1",
            "bookroom_desk_2",
            "bookroom_desk_1_b",
            "bookroom_desk_2_b",
            "bookroom_yf",
            "bookroom_mf",
            "bookbanish_floor",
            "bookroom_tipbg", "bookroom_visitIcon", "forpeople_bottom", "bookroom_visitIcon_down",
            "bookroomview_study_down", "bookroomview_study", "bookroomview_study_text"
        ]);
    };
    BookroomView.prototype.upData = function () {
        //额外 需要扩充的席位 
        var additionalNum = 0;
        this._data = null;
        if (Api.switchVoApi.checkOpenSeat()) {
            var yearNum = Api.bookroomVoApi.getYearlengh;
            var monthNum = Api.bookroomVoApi.getMonthNum;
            var itemnum = Api.bookroomVoApi.geItemNum;
            var posNum = Api.bookroomVoApi.getSeatNum();
            //未拥有月卡，年卡时候
            additionalNum = 2;
            if (yearNum == 0) {
                additionalNum = 3;
            }
            posNum += additionalNum;
            posNum += yearNum; //年卡数量
            posNum += monthNum; //月卡数量  
            posNum += itemnum; //道具卡数量  
            var data = {};
            if (yearNum > 0) {
                //年卡开了
                data.yearType = 1;
            }
            else {
                data.yearType = 0;
            }
            if (monthNum > 0) {
                data.monthType = 1; //月卡开了
                posNum -= Api.bookroomVoApi.vipmonthMaxnum; //数量2 
            }
            else {
                data.monthType = 0;
            }
            data.maxNum = posNum;
            this._data = data;
        }
        else {
            var data = {};
            data.maxNum = Api.bookroomVoApi.getSeatNum();
            this._data = data;
        }
    };
    BookroomView.prototype.showFloor = function (posNum) {
        if (posNum === void 0) { posNum = 0; }
        this.clearFloor();
        var moveN = 0;
        if (posNum > 10) {
            moveN = posNum - 10;
        }
        var floorNum = Math.ceil(moveN / 2);
        for (var i = 0; i < floorNum + 1; i++) {
            var floorTile = BaseBitmap.create("bookbanish_floor");
            floorTile.y = this.bg.height + floorTile.height * i;
            this._nodeContainer.addChild(floorTile);
            if (this.floorArr) {
                this.floorArr.push(floorTile);
            }
        }
    };
    BookroomView.prototype.clearFloor = function () {
        if (this.floorArr) {
            for (var i = 0; i < this.floorArr.length; i++) {
                var floor = this.floorArr[i];
                if (floor && floor.parent) {
                    floor.dispose();
                    floor = null;
                }
            }
            this.floorArr = [];
        }
    };
    BookroomView.prototype.getBaseArray = function () {
        var posNumArr = Api.bookroomVoApi.getSeatNum();
        var newArr = [];
        for (var i = 0; i < posNumArr; i++) {
            var mesObj = {};
            mesObj.year = 0;
            mesObj.month = 0;
            mesObj.posId = i + 1 + "";
            newArr.push(mesObj);
        }
        return newArr;
    };
    BookroomView.prototype.getbigArr = function () {
        var data = this._data;
        var baseArr = this.getBaseArray();
        var monthArr = Api.bookroomVoApi.getMothBookList();
        var yearArr = Api.bookroomVoApi.getYearBookList();
        var unlockArr = Api.bookroomVoApi.getUnlockArr();
        var itemarr = Api.bookroomVoApi.getItemBookList();
        var tmparr = [];
        for (var j_1 = 0; j_1 < itemarr.length; j_1++) {
            var unit = itemarr[j_1];
            if (unit.lock == 0 && unit.lastet > 0 && (unit.lastet > GameData.serverTime || unit.et > 0)) {
                unit.year = 0;
                unit.month = 0;
                unit.item = true;
                tmparr.push(itemarr[j_1]);
            }
        }
        // if(Api.switchVoApi.checkOpenSeat())
        // {   
        //都解锁
        if (data.yearType == 1 && data.monthType == 1) {
            var arr_1 = [];
            var monthLock = [];
            for (var j = 0; j < monthArr.length; j++) {
                var deskObj3 = monthArr[j];
                if (deskObj3.lock == 0) {
                    deskObj3.month = 1;
                    arr_1.push(deskObj3);
                }
                else {
                    deskObj3.month = 2;
                    monthLock.push(deskObj3);
                }
                // arr.push(deskObj3);
            }
            for (var i = 0; i < yearArr.length; i++) {
                var deskObj2 = yearArr[i];
                deskObj2.year = 1;
                arr_1.push(deskObj2);
            }
            this.bigArr = baseArr.concat(arr_1);
            this.bigArr = this.bigArr.concat(tmparr).concat(monthLock);
        }
        else if (data.yearType == 1 && data.monthType != 1) {
            var arr_2 = [];
            for (var i = 0; i < yearArr.length; i++) {
                var deskObj2 = yearArr[i];
                deskObj2.year = 1;
                arr_2.push(deskObj2);
            }
            var arr1 = [];
            for (var j = 0; j < monthArr.length; j++) {
                var deskObj3 = monthArr[j];
                deskObj3.month = 2; //月卡未解锁
                arr1.push(deskObj3);
            }
            // this.bigArr =  baseArr.concat(arr1);
            this.bigArr = baseArr.concat(arr_2).concat(tmparr).concat(arr1);
        }
        else if (data.yearType != 1 && data.monthType == 1) {
            var arr_3 = [];
            var monthLock = [];
            for (var j = 0; j < monthArr.length; j++) {
                var deskObj3 = monthArr[j];
                // deskObj3.month = 1; 
                if (deskObj3.lock == 0) {
                    deskObj3.month = 1;
                    arr_3.push(deskObj3);
                }
                else {
                    deskObj3.month = 2;
                    monthLock.push(deskObj3);
                }
                // arr.push(deskObj3);
            }
            // //未来解锁年卡
            // for(var i:number=0;i<1;i++)
            // {
            //     var deskObj2:any={};
            //     deskObj2.year = 2;
            //     arr.push(deskObj2);
            // } 
            this.bigArr = baseArr.concat(arr_3).concat(tmparr).concat(monthLock);
        }
        else {
            var arr = [];
            for (var j = 0; j < Api.bookroomVoApi.vipmonthMaxnum; j++) {
                var deskObj3 = {};
                deskObj3.month = 2;
                arr.push(deskObj3);
            }
            this.bigArr = baseArr.concat(tmparr).concat(arr);
        }
        var lastArr = this.bigArr.concat(unlockArr);
        // let tmparr = [];
        // for(let j:number=0;j<itemarr.length;j++)
        // {
        //     let unit:any=itemarr[j]; 
        //     if(unit.lock == 0 && unit.lastet > 0 && (unit.lastet > GameData.serverTime || unit.et > 0)){
        //         unit.year=0;
        //         unit.month=0; 
        //         unit.item = true;
        //         tmparr.push(itemarr[j]);
        //     }
        // }  
        // lastArr = lastArr.concat(tmparr);
        if (Api.switchVoApi.checkOpenSeat()) {
            return lastArr;
        }
        else {
            return baseArr.concat(tmparr);
        }
    };
    BookroomView.prototype.restList = function () {
        //清空之前列表
        this.upData();
        for (var i = 0; i < this.itemArr.length; i++) {
            var item = this.itemArr[i];
            if (item) {
                item.dispose(); //parent.removeChild(item);
                item = null;
            }
            // this._nodeContainer.removeChild(item);
        }
        this.itemArr = [];
        //重新布局列表排序
        this.bigArr = this.getbigArr();
        this.showFloor(this.bigArr.length);
        for (var index = 0; index < this.bigArr.length; index++) {
            var currObj = this.bigArr[index];
            var num = Number(currObj.posId);
            this.makeSeatItem(num, currObj, index);
        }
        // this.makeBatchBtn(this.bigArr.length); 
    };
    BookroomView.prototype.useCallback = function (event) {
        if (event === void 0) { event = null; }
        var isBuy = Api.shopVoApi.ifBuyMonthCard();
        var isyearBuy = Api.shopVoApi.ifBuyYearCard();
        if (isBuy || isyearBuy) {
            this.restList();
        }
    };
    //原来逻辑
    BookroomView.prototype.makeSeatItem2 = function (index) {
        var bookRoomInfoItem = new BookroomInfoItem();
        bookRoomInfoItem.init(index + 1);
        var posX = 20;
        if ((index % 2) == 1) {
            //如果是比较长的语言  bookRoomInfoItem中的容器会被文本撑开  所以默认固定间隔是桌子的宽度 284 
            //    posX = GameConfig.stageWidth -bookRoomInfoItem.width - posX ;
            posX = GameConfig.stageWidth - 304;
        }
        var posY = 500 + Math.floor(index / 2) * 200;
        bookRoomInfoItem.x = posX;
        bookRoomInfoItem.y = posY;
        this._nodeContainer.addChild(bookRoomInfoItem);
    };
    //主线任务引导 最靠上的空位置
    BookroomView.prototype.getFirstEmptySeat = function () {
        var data = this.bigArr;
        for (var i = 0; i < data.length; i++) {
            var bRoomInfoVo = Api.bookroomVoApi.getSeatInfoByPosId(Number(data[i].posId));
            if (!bRoomInfoVo) {
                if (data[i].year == 1 || data[i].month == 1) {
                    if (data[i].item) {
                        if (data[i].lastet - GameData.serverTime > 0) {
                            return { index: i, data: data[i] };
                        }
                    }
                    else {
                        return { index: i, data: data[i] };
                    }
                }
                else if (data[i].year == 0 && data[i].month == 0) {
                    if (data[i].item) {
                        if (data[i].lastet - GameData.serverTime > 0) {
                            return { index: i, data: data[i] };
                        }
                    }
                    else {
                        return { index: i, data: data[i] };
                    }
                }
            }
        }
        return { index: -1, data: null };
    };
    BookroomView.prototype.getRuleInfo = function () {
        if (Api.switchVoApi.checkOpenSeat()) {
            return "bookroomRuleInfo_withNewMonthYear";
        }
        return "bookroomRuleInfo";
    };
    BookroomView.prototype.getExtraRuleInfo = function () {
        var params = [];
        if (Api.switchVoApi.checkOpenSeat()) {
            params.push(LanguageManager.getlocal("bookroomRuleInfoPart1"));
        }
        else {
            params.push("");
        }
        return LanguageManager.getlocal("bookroomRuleInfoSpell", params);
    };
    BookroomView.prototype.dispose = function () {
        Api.mainTaskVoApi.hideGuide();
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_BUY), this.buySeatHandlerCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_FINISH), this.refreshSeatNum, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY), this.refreshSeatNum, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.useCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REST_BOOKROOM, this.restList, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_BOOKROOM_ONEKEYSTUDY, this.onekeyCallback, this);
        this._nodeContainer = null;
        this._nodeContainer2 = null;
        this.bigArr = null;
        this.floorArr = null;
        this.baseArr = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        _super.prototype.dispose.call(this);
    };
    return BookroomView;
}(CommonView));
__reflect(BookroomView.prototype, "BookroomView");
//# sourceMappingURL=BookroomView.js.map