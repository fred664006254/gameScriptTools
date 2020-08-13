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
 * 书院 各作为部分部分
 * author yanyuling
 * date 2017/11/23
 * @class BookroomInfoItem
 */
var BookroomInfoItem = (function (_super) {
    __extends(BookroomInfoItem, _super);
    function BookroomInfoItem() {
        var _this = _super.call(this) || this;
        _this._posId = 0;
        _this.yearState = 0;
        _this.monthState = 0;
        _this.bigType = 0;
        _this._data = null;
        _this._bigData = {};
        _this._yfImage = null;
        _this._itemCdTxt = null;
        _this._numTxt = null;
        _this._leftTime = 0;
        _this._isMonthFresh = false;
        _this._mainTaskHandKey1 = null;
        return _this;
    }
    BookroomInfoItem.prototype.init = function (posId, data) {
        if (data === void 0) { data = null; }
        this._data = data;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY), this.refreshUI, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_FINISH), this.refreshUI, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_ONEKEYSTUDY), this.refreshUI, this);
        this._tipNode = new BaseDisplayObjectContainer();
        this.addChild(this._tipNode);
        var bRoomInfoVo = Api.bookroomVoApi.getSeatInfoByPosId(this._posId);
        if (Api.switchVoApi.checkOpenSeat() == false) {
            var bookstr = "bookroom_desk";
            var desk = BaseBitmap.create(bookstr);
            this._desk = desk;
            this.addChild(desk);
        }
        if (data) {
            if (data && data.year) {
                bookstr = "bookroom_desk_1_b";
                if (data.year == 1) {
                    bookstr = "bookroom_desk_1";
                }
            }
            if (data && data.month) {
                if (data.month == 1) {
                    bookstr = "bookroom_desk_2";
                }
                if (data.month == 2) {
                    bookstr = "bookroom_desk_2_b";
                }
            }
            if (data) {
                if (data.month == 0 && data.year == 0) {
                    bookstr = "bookroom_desk";
                }
            }
            this._posId = posId;
            this._bigData.posId = posId; //data.posId;
            this._bigData.data = data;
            var desk = BaseBitmap.create(bookstr);
            this._desk = desk;
            this.addChild(desk);
            if (data && data.month) {
                var mfImage = BaseBitmap.create("bookroom_mf");
                mfImage.x = desk.x + desk.width / 2 - mfImage.width / 2;
                mfImage.y = desk.y + 65;
                this.addChild(mfImage);
                mfImage.name = "mfImage";
                var monthTxt = null;
                var monthTimeTxt = null;
                if (data.month == 2) {
                    mfImage.visible = false;
                    monthTxt = ComponentManager.getTextField("", 18);
                    monthTxt.text = LanguageManager.getlocal("bookroommonthtype1");
                    monthTxt.width = mfImage.width;
                    monthTxt.textAlign = TextFieldConst.ALIGH_CENTER;
                    monthTxt.x = mfImage.x;
                    monthTxt.y = mfImage.y + mfImage.height + 2 - 40;
                    monthTxt.name = "monthTxt";
                    this.addChild(monthTxt);
                }
                //解锁状态
                if (data.month == 1) {
                    mfImage.visible = true;
                    monthTimeTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_WARN_YELLOW2);
                    if (data.lastet && data.lastet < 86400 * 7) {
                        monthTimeTxt.text = App.DateUtil.getFormatBySecondIntoTime(data.lastet);
                        monthTimeTxt.width = mfImage.width;
                        monthTimeTxt.textAlign = TextFieldConst.ALIGH_CENTER;
                        monthTimeTxt.x = mfImage.x;
                        monthTimeTxt.y = mfImage.y + mfImage.height + 18;
                        monthTimeTxt.name = "monthTimeTxt";
                        this.addChild(monthTimeTxt);
                    }
                }
            }
            if (data.year) {
                this._yfImage = BaseBitmap.create("bookroom_yf");
                this._yfImage.x = desk.x + desk.width / 2 - this._yfImage.width / 2;
                this._yfImage.y = desk.y + 65;
                this.addChild(this._yfImage);
                if (data.year == 2) {
                    var yearTxt = ComponentManager.getTextField("", 18);
                    yearTxt.text = LanguageManager.getlocal("bookroomyeartype1");
                    yearTxt.width = this._yfImage.width;
                    yearTxt.textAlign = TextFieldConst.ALIGH_CENTER;
                    yearTxt.x = this._yfImage.x;
                    yearTxt.y = this._yfImage.y + this._yfImage.height + 2 - 40;
                    this.addChild(yearTxt);
                    this._yfImage.visible = false;
                    if (this._posId != 201) {
                        var num = data.needLevel;
                        var offStr = LanguageManager.getlocal("officialTitle" + num);
                        yearTxt.text = LanguageManager.getlocal("bookroomyearunlock", [offStr]);
                    }
                }
            }
            if (data.item) {
                this._leftTime = data.lastet - GameData.serverTime;
                var str = '';
                if (this._leftTime > 0) {
                    str = LanguageManager.getlocal("bookRoom_useSeatTip4", [App.DateUtil.getFormatBySecond(this._leftTime, 18)]);
                }
                else {
                    str = LanguageManager.getlocal("bookRoom_useSeatTip5");
                }
                var itemUseCDTxt = ComponentManager.getTextField(str, 18);
                itemUseCDTxt.textAlign = TextFieldConst.ALIGH_CENTER;
                itemUseCDTxt.lineSpacing = 5;
                this.addChild(itemUseCDTxt);
                this._itemCdTxt = itemUseCDTxt;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itemUseCDTxt, desk, [0, 50]);
                TickManager.addTick(this.tick, this);
                var numTxt = ComponentManager.getTextField("\uFF08" + Api.bookroomVoApi.geItemNum + "/" + Api.bookroomVoApi.itemMaxnum + "\uFF09", 18);
                this.addChild(numTxt);
                this._numTxt = numTxt;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, numTxt, desk, [0, 30]);
            }
        }
        //已经进入学习状态 屏蔽图片文字
        if (bRoomInfoVo) {
            if (monthTimeTxt) {
                monthTimeTxt.visible = false;
            }
        }
        var bookroom_tipbg = BaseBitmap.create("bookroom_tipbg");
        bookroom_tipbg.x = desk.x + desk.width / 2 - bookroom_tipbg.width / 2;
        bookroom_tipbg.y = desk.y - 40;
        this._tipNode.addChild(bookroom_tipbg);
        bookroom_tipbg.name = "bookroom_tipbg";
        var tipTxt = ComponentManager.getTextField("", 20);
        tipTxt.text = LanguageManager.getlocal("bookRoomClickTip");
        tipTxt.x = bookroom_tipbg.x + bookroom_tipbg.width / 2 - tipTxt.width / 2;
        tipTxt.y = bookroom_tipbg.y + bookroom_tipbg.height / 2 - tipTxt.height / 2 - 5;
        this._tipNode.addChild(tipTxt);
        this._tipTxt = tipTxt;
        this.addTouchTap(this.bookRoomHandler, this);
        this.refreshUI();
        this.isShowtip(data);
        //主线任务引导
        var taskId = Api.mainTaskVoApi.getCurMainTaskId();
        if (taskId) {
            var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
            if (taskCfg && taskCfg.questType == 502 && !Api.rookieVoApi.isGuiding && !Api.rookieVoApi.isInGuiding) {
                var baseView = ViewController.getInstance().getView("BookroomView");
                var indexData = baseView.getFirstEmptySeat();
                if (indexData.index > -1 && indexData.data && Number(indexData.data.posId) == posId) {
                    this._mainTaskHandKey1 = App.MainTaskHandUtil.addHandNode(this, this._desk.x + this._desk.width / 2 - 10, this._desk.y, [this], 502, true, function () {
                        return true;
                    }, this, 0.8);
                }
            }
        }
    };
    BookroomInfoItem.prototype.refreshMonthCard = function () {
        var mfImage = this.getChildByName("mfImage");
        var monthTxt1 = this.getChildByName("monthTxt");
        var monthTimeTxt = this.getChildByName("monthTimeTxt");
        if (this._data) {
            if (this._data.month && this._data.month == 1 && this._data.lastet && this._data.lastet <= GameData.serverTime) {
                if (mfImage) {
                    mfImage.visible = false;
                }
                if (!monthTxt1) {
                    var monthTxt = ComponentManager.getTextField("", 18);
                    monthTxt.text = LanguageManager.getlocal("bookroommonthtype1");
                    monthTxt.width = mfImage.width;
                    monthTxt.textAlign = TextFieldConst.ALIGH_CENTER;
                    monthTxt.x = mfImage.x;
                    monthTxt.y = mfImage.y + mfImage.height + 2 - 40;
                    monthTxt.name = "monthTxt";
                    this.addChild(monthTxt);
                }
                else {
                    monthTxt1.visible = true;
                }
                if (monthTimeTxt) {
                    monthTimeTxt.visible = false;
                }
                this.setImgType(this._data);
            }
        }
    };
    BookroomInfoItem.prototype.setImgType = function (data) {
        var bookstr = "bookroom_desk";
        if (data && data.year) {
            bookstr = "bookroom_desk_1_b";
            if (data.year == 1) {
                bookstr = "bookroom_desk_1";
            }
        }
        if (data && data.month) {
            if (data.month == 1) {
                bookstr = "bookroom_desk_2";
                if (data.lastet && data.lastet <= GameData.serverTime) {
                    bookstr = "bookroom_desk_2_b";
                }
            }
            if (data.month == 2) {
                bookstr = "bookroom_desk_2_b";
            }
        }
        if (data) {
            if (data.month == 0 && data.year == 0) {
                bookstr = "bookroom_desk";
            }
        }
        if (this._desk) {
            this._desk.texture = ResourceManager.getRes(bookstr);
        }
    };
    BookroomInfoItem.prototype.isShowtip = function (data) {
        if (data != null) {
            // if(data.year==1||data.month==1)//解锁状态
            // {
            //     this._tipTxt.visible =true;
            //     this._tipNode.visible = true;
            // }  
            if (data.month == 2 || data.year == 2) {
                this._tipTxt.visible = false;
                this._tipNode.visible = false;
            }
        }
    };
    BookroomInfoItem.prototype.refreshUI = function (event) {
        // if(event.data.data.data&&event.data.data.data.monthPast==1)
        // {
        //     App.CommonUtil.showTip( LanguageManager.getlocal("bookMonthPastdes"));
        //     App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REST_BOOKROOM); 
        //     return;
        // }
        if (event && event.data && event.data.ret && event.data.data.data.monthPast == 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookMonthPastdes"));
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REST_BOOKROOM);
            return;
        }
        if (event && event.data && event.data.ret && event.data.data.data.itemPast == 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookMonthPastdes"));
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REST_BOOKROOM);
            return;
        }
        if (event && event.data && event.data.ret && this._bRoomInfoVo) {
            this._bRoomInfoVo = Api.bookroomVoApi.getSeatInfoByPosId(this._posId);
            var rData = event.data.data.data;
            var cmd = event.data.data.cmd;
            var pos = rData.bookroompos;
            var poss = rData.bookroom_poss;
            var batchFlag = rData.batchFlag;
            var monthPast = rData.monthPast;
            if (batchFlag == 1) {
                //月卡到期
                App.CommonUtil.showTip(LanguageManager.getlocal("bookbatchdes"));
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REST_BOOKROOM);
                return;
            }
            if (monthPast) {
                App.CommonUtil.showTip(LanguageManager.getlocal("bookMonthPastdes"));
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REST_BOOKROOM);
            }
            //批量完成，
            if (pos == 0 && this._bRoomInfoVo) {
                return;
            }
            if (pos > 0 && pos != this._posId) {
                return;
            }
            var bookCfg = GameConfig.config.bookroomCfg;
            /**
             * 完成学习飘文字
             */
            if (cmd == "bookroom.finish" && !this._bRoomInfoVo) {
                var rate = 1;
                var addStr = "";
                if (pos == 0 && poss[this._posId] && poss[this._posId].pos) {
                    rate = poss[this._posId].pos;
                }
                else {
                    if (poss && poss.pos) {
                        rate = poss.pos;
                    }
                }
                if (Api.otherInfoVoApi.isHasScene("204", "cityScene")) {
                    var abilitycfg = Config.SceneCfg.getSceneCfgBySceneName("cityScene", "204").personalityCfg;
                    rate = rate * (1 + abilitycfg.buffValue);
                }
                var strList = [];
                var flyStr1 = LanguageManager.getlocal("bookRoomServant_completeFly1", [String(Math.floor(bookCfg.getBookExp * rate + 0.5))]);
                var flyStr2 = LanguageManager.getlocal("bookRoomServant_completeFly2", [String(Math.floor(bookCfg.getSkillExp * rate + 0.5))]);
                strList.push({ tipMessage: flyStr1 });
                strList.push({ tipMessage: flyStr2 });
                var pos2 = this.localToGlobal(this._desk.x + this._desk.width / 2, this._desk.y - 50);
                App.CommonUtil.playRewardFlyAction(strList, pos2);
                // var monthNum  = Api.bookroomVoApi.getMonthNum; 
                // if(monthNum!=2)
                // {   
                //     if(this._posId==101||this._posId==102)
                //     {
                //         this._desk.texture  = ResourceManager.getRes("bookroom_desk_1_b");
                //         this._tipTxt.visible =false;
                //         this._tipNode.visible =false;
                //     } 
                // }
                //非一键的时候刷新界面
                if (!rData.isbatch && Api.switchVoApi.checkOpenSeat()) {
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REST_BOOKROOM);
                }
                else {
                    if (rData.isbatch) {
                        egret.Tween.get(this).wait(1000).call(function () {
                            App.LogUtil.log("一键事件");
                            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REST_BOOKROOM);
                        });
                    }
                }
            }
        }
        this._bRoomInfoVo = Api.bookroomVoApi.getSeatInfoByPosId(this._posId);
        if (this._bRoomInfoVo) {
            // if(this._itemCdTxt){
            //     this._itemCdTxt.visible = false;
            //     this._numTxt.visible = false;
            // }
            this._tipTxt.visible = false;
            var servantInfoObj = Api.servantVoApi.getServantObj(this._bRoomInfoVo.servantid);
            var servantFullImg = BaseLoadBitmap.create(servantInfoObj.fullImgPath);
            var deltaScale = 0.5;
            servantFullImg.setScale(deltaScale);
            servantFullImg.width = 405;
            servantFullImg.height = 467;
            var maskH = 400;
            servantFullImg.mask = new egret.Rectangle(0, 0, servantFullImg.width, maskH);
            servantFullImg.x = this._desk.x + this._desk.width / 2 - servantFullImg.width / 2 * deltaScale;
            servantFullImg.y = -maskH * deltaScale + 30;
            this.addChildAt(servantFullImg, 0);
            servantFullImg.name = "servantFullImg";
            this._tipNode.visible = false;
            // this._tipTxt.visible = false;
            var cdBg = BaseBitmap.create("bookroom_cdbg");
            cdBg.x = this._desk.x + this._desk.width / 2 - cdBg.width / 2;
            cdBg.y = -40;
            cdBg.name = "cdBg";
            this.addChild(cdBg);
            this._cdTxt = ComponentManager.getTextField("", 20);
            this._cdTxt.y = cdBg.y + 10;
            this.addChild(this._cdTxt);
            if (this._bRoomInfoVo.et < GameData.serverTime) {
                this._cdTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
                this._cdTxt.text = LanguageManager.getlocal("bookRoomServant_studyComplete");
            }
            else {
                var leftTimt = this._bRoomInfoVo.et - GameData.serverTime;
                this._cdTxt.text = App.DateUtil.getFormatBySecond(leftTimt).toString();
                // this.tick()
                TickManager.removeTick(this.tick, this);
                TickManager.addTick(this.tick, this);
            }
            this._cdTxt.x = cdBg.x + cdBg.width / 2 - this._cdTxt.width / 2;
        }
        else {
            var servantFullImg = this.getChildByName("servantFullImg");
            var cdBg = this.getChildByName("cdBg");
            if (cdBg) {
                this.removeChild(cdBg);
            }
            if (servantFullImg) {
                this.removeChild(servantFullImg);
            }
            this._tipNode.visible = true;
            egret.Tween.get(this._tipNode, { loop: true }).to({ y: -10 }, 1000).to({ y: 0 }, 1000);
            if (this._cdTxt) {
                this.removeChild(this._cdTxt);
                this._cdTxt = null;
            }
            if (this._tipTxt) {
                this._tipTxt.visible = true;
            }
            if (this._data) {
                if (this._data.month == 2 || this._data.year == 2) {
                    this._tipTxt.visible = false;
                    this._tipNode.visible = false;
                }
                else if (this._data.month == 1 && this._data.lastet) {
                    if (this._data.lastet <= GameData.serverTime) {
                        this._tipTxt.visible = false;
                        this._tipNode.visible = false;
                        this.refreshMonthCard();
                    }
                    else {
                        TickManager.removeTick(this.tick, this);
                        TickManager.addTick(this.tick, this);
                    }
                }
            }
        }
    };
    BookroomInfoItem.prototype.tick = function () {
        if (this._itemCdTxt) {
            --this._leftTime;
            this._itemCdTxt.textColor = TextFieldConst.COLOR_WHITE;
            if (this._leftTime > 0) {
                this._itemCdTxt.text = LanguageManager.getlocal("bookRoom_useSeatTip4", [App.DateUtil.getFormatBySecond(this._leftTime, 18)]);
            }
            else {
                this._itemCdTxt.text = LanguageManager.getlocal("bookRoom_useSeatTip5");
            }
            this._itemCdTxt.x = (this.width - this._itemCdTxt.width) / 2;
        }
        this._bRoomInfoVo = Api.bookroomVoApi.getSeatInfoByPosId(this._posId);
        if (this._bRoomInfoVo) {
            if (this._bRoomInfoVo.et > GameData.serverTime) {
                var leftTimt = this._bRoomInfoVo.et - GameData.serverTime;
                if (this._cdTxt) {
                    this._cdTxt.textColor = TextFieldConst.COLOR_WHITE;
                    this._cdTxt.text = App.DateUtil.getFormatBySecond(leftTimt).toString();
                    var cdBg = this.getChildByName("cdBg");
                    this._cdTxt.x = cdBg.x + cdBg.width / 2 - this._cdTxt.width / 2;
                    cdBg = null;
                }
                return true;
            }
            else {
                if (this._cdTxt) {
                    this._cdTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
                    this._cdTxt.text = LanguageManager.getlocal("bookRoomServant_studyComplete");
                }
                return false;
            }
        }
        else {
            if (this._data && this._data.month == 1 && this._data.lastet && this._data.lastet <= GameData.serverTime) {
                if (!this._isMonthFresh) {
                    this._isMonthFresh = true;
                    this.refreshUI();
                }
            }
        }
        return false;
    };
    BookroomInfoItem.prototype.bookRoomHandler = function () {
        if (this._data) {
            if (this._data.year == 2 || this._data.month == 2) {
                if (this._data.year == 2 && this._posId != 201) {
                    var num = this._data.needLevel;
                    if (num == 0) {
                        num = Api.bookroomVoApi.needVip();
                    }
                    var offStr = LanguageManager.getlocal("officialTitle" + num);
                    App.CommonUtil.showTip(LanguageManager.getlocal("bookroomyearunlock", [offStr]));
                    return;
                }
                var mesObj = {
                    confirmCallback: this.buySeatHandler,
                    handler: this,
                    type: 1,
                    month: this._data.month,
                    year: this._data.year,
                };
                ViewController.getInstance().openView(ViewConst.POPUP.BOOKROOMTIPPOPUPVIEW, mesObj);
                return;
            }
            else if (this._data.month == 1 && this._data.lastet && this._data.lastet <= GameData.serverTime) {
                var bookInfo = Api.bookroomVoApi.getSeatInfoByPosId(this._posId);
                if (!bookInfo) {
                    var mesObj = {
                        confirmCallback: this.buySeatHandler,
                        handler: this,
                        type: 1,
                        month: 2,
                        year: this._data.year,
                    };
                    ViewController.getInstance().openView(ViewConst.POPUP.BOOKROOMTIPPOPUPVIEW, mesObj);
                    return;
                }
            }
        }
        // var monthNum  = Api.bookroomVoApi.getMonthNum; 
        // if(monthNum!=2)
        // {   
        //     if(this._posId==101||this._posId==102)
        //     {
        //         let mesObj = {
        //         confirmCallback: this.buySeatHandler, 
        //         handler: this,  
        //         type: 1, 
        //         month:this._data.month,
        //         year:this._data.year,
        //         }; 
        //         ViewController.getInstance().openView(ViewConst.POPUP.BOOKROOMTIPPOPUPVIEW,mesObj);
        //         return; 
        //     } 
        // } 
        if (this._bRoomInfoVo && this._bRoomInfoVo.et < GameData.serverTime) {
            NetManager.request(NetRequestConst.REQUEST_BOOKROOM_FINISH, { pos: this._posId, isbatch: 0 });
            return;
        }
        if (this._data.item && this._leftTime <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_useSeatTip5"));
            return;
        }
        if (!this._bRoomInfoVo) {
            ViewController.getInstance().openView(ViewConst.POPUP.BOOKROOMSERVANTSELECTPOPUPVIEW, this._bigData);
        }
    };
    BookroomInfoItem.prototype.buySeatHandler = function () {
        //  var monthNum  = Api.bookroomVoApi.getMonthNum; 
        //   if(monthNum!=2)
        //     {   
        //         if(this._posId==201||this._posId==202)
        //         {
        //             ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWMONTHCARD); 
        //             return;
        //         }
        //     }
        if (this._data.month == 2) {
            ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWMONTHCARD);
        }
        if (this._data.year == 2) {
            ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWYEARCARD);
        }
    };
    BookroomInfoItem.prototype.dispose = function () {
        TickManager.removeTick(this.tick, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY), this.refreshUI, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_FINISH), this.refreshUI, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_ONEKEYSTUDY), this.refreshUI, this);
        this._posId = null;
        this._desk = null;
        this._tipTxt = null;
        this._cdTxt = null;
        this._bRoomInfoVo = null;
        this._data = null;
        this._yfImage = null;
        this._itemCdTxt = null;
        this._numTxt = null;
        this._leftTime = 0;
        this._isMonthFresh = false;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey1);
        this._mainTaskHandKey1 = null;
        _super.prototype.dispose.call(this);
    };
    return BookroomInfoItem;
}(BaseDisplayObjectContainer));
__reflect(BookroomInfoItem.prototype, "BookroomInfoItem");
//# sourceMappingURL=BookroomInfoItem.js.map