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
        _this._index = 0;
        _this._posId = 0;
        _this._strenthenBtn = undefined;
        _this._cardType = 0;
        return _this;
    }
    BookroomInfoItem.prototype.init = function (index, posId, cardType) {
        if (cardType === void 0) { cardType = 0; }
        this._cardType = cardType;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY), this.refreshUI, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_FINISH), this.refreshUI, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_INTENSIVESTUDY), this.strenthenReqCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY_BATCH), this.refreshUI, this);
        this._tipNode = new BaseDisplayObjectContainer();
        this.addChild(this._tipNode);
        this._index = index;
        this._posId = posId;
        var res = "bookroom_desk";
        if (cardType != 0) {
            res = "bookroom_desk2";
        }
        var desk = BaseBitmap.create(res);
        this._desk = desk;
        this.addChild(desk);
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
        if (this._bRoomInfoVo && this._bRoomInfoVo.level > 0) {
            this.dealStrenExp();
            this.showStrenthenAni();
        }
    };
    BookroomInfoItem.prototype.setPosId = function (posId) {
        this._posId = posId;
    };
    BookroomInfoItem.prototype.getPosId = function () {
        return this._posId;
    };
    BookroomInfoItem.prototype.getCardType = function () {
        return this._cardType;
    };
    BookroomInfoItem.prototype.setIndex = function (index) {
        this._index = index;
    };
    BookroomInfoItem.prototype.getIndex = function () {
        return this._index;
    };
    //重新设置桌子的月卡年卡类型
    BookroomInfoItem.prototype.setCardType = function (cardType) {
        this._cardType = cardType;
        this.refreshDeskByCardType();
    };
    //根据桌子的月卡年卡类型 更改桌子颜色
    BookroomInfoItem.prototype.refreshDeskByCardType = function () {
        var res = "bookroom_desk";
        if (this._cardType != 0) {
            res = "bookroom_desk2";
        }
        this._desk.texture = ResourceManager.getRes(res);
    };
    BookroomInfoItem.prototype.dealStrenExp = function () {
        if (this._bRoomInfoVo && this._bRoomInfoVo.level > 0) {
            if (!this._strenExpTxt) {
                var lvbg = BaseBitmap.create("bookroom_stren_expbg");
                lvbg.x = this._desk.x + this._desk.width / 2 - lvbg.width / 2;
                lvbg.y = this._desk.y;
                this.addChild(lvbg);
                lvbg.name = "lvbg";
                this._strenExpTxt = ComponentManager.getBitmapText("", "recharge2_fnt");
                this._strenExpTxt.scaleX = this._strenExpTxt.scaleY = 0.9;
                this._strenExpTxt.x = lvbg.x + lvbg.width - 90;
                this._strenExpTxt.y = lvbg.y + 6;
                this.addChild(this._strenExpTxt);
            }
            else {
                this.getChildByName("lvbg").visible = true;
            }
            var bookroomCfg = GameConfig.config.bookroomCfg;
            var betterStudy = bookroomCfg.betterStudy;
            var level = this._bRoomInfoVo.level;
            var uptxt1 = betterStudy[level - 1].upLevel * 100 + "";
            this._strenExpTxt.text = uptxt1;
            this._strenExpTxt.anchorOffsetX = this._strenExpTxt.width * 0.9;
        }
        else {
            if (this._strenExpTxt) {
                this._strenExpTxt.text = "";
                this.getChildByName("lvbg").visible = false;
            }
        }
    };
    BookroomInfoItem.prototype.showStrenthenAni = function () {
        if (this._bRoomInfoVo && this._bRoomInfoVo.level > 0) {
            var lv = this._bRoomInfoVo.level;
            if (this._strenAni && this._strenAni.name != "" + lv) {
                this.removeChild(this._strenAni);
                this._strenAni = null;
            }
            this._strenAni = ComponentManager.getCustomMovieClip("bookroom_stren" + lv, 8, 85);
            this._strenAni.x = 0;
            this._strenAni.y = -120;
            this.addChildAt(this._strenAni, 2);
            this._strenAni.playWithTime(0);
        }
        else {
            if (this._strenAni) {
                this.removeChild(this._strenAni);
                this._strenAni = null;
            }
        }
    };
    BookroomInfoItem.prototype.strenthenHandler = function () {
        if (PlatformManager.checkIsWxCfg() && Api.playerVoApi.getPlayerVipLevel() < 4) {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookroom_strenthen_vip4Tip"));
            return;
        }
        var level = this._bRoomInfoVo.level;
        var bookroomCfg = GameConfig.config.bookroomCfg;
        var count = bookroomCfg.count;
        if (level >= count) {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_strenghenTipTxt1"));
            return;
        }
        if (!this._bRoomInfoVo || this._bRoomInfoVo.et < GameData.serverTime) {
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.BOOKROOMSTRENTHENPOPUPVIEW, { pos: this._posId, cardType: this._cardType });
    };
    BookroomInfoItem.prototype.makeStrenthenBtn = function () {
        if (!this._strenthenBtn && Api.switchVoApi.checkOpenBookRoomStrenthen()) {
            var bookroom_tipbg = this._tipNode.getChildByName("bookroom_tipbg");
            var bookroom_strenthen = ComponentManager.getButton("bookroom_strenthenBtn", "", this.strenthenHandler, this);
            bookroom_strenthen.x = bookroom_tipbg.x + bookroom_tipbg.width - bookroom_strenthen.width / 2 - 30;
            bookroom_strenthen.y = bookroom_tipbg.y + bookroom_tipbg.height / 2 - bookroom_strenthen.height / 2 - 10;
            bookroom_strenthen.name = "bookroom_strenthen";
            var idx = this.numChildren;
            this.addChildAt(bookroom_strenthen, idx);
            this._strenthenBtn = bookroom_strenthen;
            // this._strenthenBtn.visible = false;
        }
        if (this._strenthenBtn) {
            if (this._bRoomInfoVo) {
                if (this._bRoomInfoVo.et > GameData.serverTime && this._bRoomInfoVo.level < GameConfig.config.bookroomCfg.count) {
                    this._strenthenBtn.visible = true;
                }
                else {
                    this._strenthenBtn.visible = false;
                }
            }
        }
    };
    BookroomInfoItem.prototype.strenthenReqCallback = function (event) {
        this._bRoomInfoVo = Api.bookroomVoApi.getSeatInfoByPosId(this._posId);
        if (!this._bRoomInfoVo || this._bRoomInfoVo.level == 0) {
            return;
        }
        var ret = event.data.data.ret;
        if (ret == 0) {
            this.dealStrenExp();
            this.showStrenthenAni();
            this.makeStrenthenBtn();
        }
    };
    BookroomInfoItem.prototype.refreshUI = function (event) {
        if (event && this._bRoomInfoVo) {
            this._bRoomInfoVo = Api.bookroomVoApi.getSeatInfoByPosId(this._posId);
            var rData = event.data.data.data;
            var cmd = event.data.data.cmd;
            var pos = rData.bookroompos;
            var poss = rData.bookroom_poss;
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
                var lv = 0;
                if (pos == 0) {
                    if (!poss[this._posId]) {
                        return;
                    }
                    rate = poss[this._posId].luckrate;
                    lv = poss[this._posId].level;
                }
                else {
                    if (pos != this._posId) {
                        return;
                    }
                    if (poss && poss.pos) {
                        rate = poss.pos.luckrate;
                        lv = poss.pos.level;
                    }
                }
                var upLevel = 1;
                if (lv && lv > 0) {
                    var bookroomCfg = GameConfig.config.bookroomCfg;
                    var betterStudy = bookroomCfg.betterStudy;
                    upLevel = betterStudy[lv - 1].upLevel;
                }
                if (!rate || rate == 0) {
                    rate = 1;
                }
                var strList = [];
                // for (var index = 0; index < rate; index++) {
                var flyStr1 = LanguageManager.getlocal("bookRoomServant_completeFly1", [String(bookCfg.getBookExp * rate * upLevel)]);
                var flyStr2 = LanguageManager.getlocal("bookRoomServant_completeFly2", [String(bookCfg.getSkillExp * rate * upLevel)]);
                strList.push({ tipMessage: flyStr1 });
                strList.push({ tipMessage: flyStr2 });
                // }
                //  strList = [{tipMessage:flyStr1},{tipMessage:flyStr2}];
                var pos2 = this.localToGlobal(this._desk.x + this._desk.width / 2, this._desk.y - 50);
                App.CommonUtil.playRewardFlyAction(strList, pos2);
                // App.CommonUtil.showTip( LanguageManager.getlocal("bookRoomServant_completeFly",[String(bookCfg.getBookExp),String(bookCfg.getSkillExp)]) );
                // let eData:any=event.data?event.data.data:null;
                // if(eData&&eData.lucky)
                // {
                //     App.CommonUtil.showGodbless("bookRoom");
                // }
            }
        }
        this._bRoomInfoVo = Api.bookroomVoApi.getSeatInfoByPosId(this._posId);
        if (this._bRoomInfoVo) {
            this._tipTxt.visible = false;
            var servantInfoObj = Api.servantVoApi.getServantObj(this._bRoomInfoVo.servantid);
            var servantFullImg = this.getChildByName("servantFullImg");
            if (!servantFullImg) {
                servantFullImg = BaseLoadBitmap.create(servantInfoObj.fullImgPath);
                var deltaScale = 0.5;
                servantFullImg.setScale(deltaScale);
                servantFullImg.width = 640;
                servantFullImg.height = 482;
                var maskH = 400;
                servantFullImg.mask = new egret.Rectangle(0, 0, servantFullImg.width, maskH);
                servantFullImg.x = this._desk.x + this._desk.width / 2 - servantFullImg.width / 2 * deltaScale;
                servantFullImg.y = -maskH * deltaScale + 30;
                this.addChildAt(servantFullImg, 0);
                servantFullImg.name = "servantFullImg";
            }
            // let servantFullImg = BaseLoadBitmap.create(servantInfoObj.fullImgPath);
            this._tipNode.visible = false;
            // this._tipTxt.visible = false;
            var cdBg = this.getChildByName("cdBg");
            if (!cdBg) {
                cdBg = BaseBitmap.create("bookroom_cdbg");
                this.addChild(cdBg);
            }
            // let cdBg = BaseBitmap.create("bookroom_cdbg");
            cdBg.width = 136;
            cdBg.height = 30;
            cdBg.x = this._desk.x + this._desk.width / 2 - cdBg.width / 2;
            cdBg.y = -40;
            cdBg.name = "cdBg";
            if (this._strenthenBtn) {
                this.swapChildren(this._strenthenBtn, cdBg);
            }
            if (!this._cdTxt) {
                this._cdTxt = ComponentManager.getTextField("", 20);
                this.addChild(this._cdTxt);
            }
            this._cdTxt.y = cdBg.y + 10;
            this.makeStrenthenBtn();
            if (this._bRoomInfoVo.et < GameData.serverTime) {
                this._cdTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
                this._cdTxt.text = LanguageManager.getlocal("bookRoomServant_studyComplete");
                if (this._strenthenBtn) {
                    this._strenthenBtn.visible = false;
                }
            }
            else {
                var leftTimt = this._bRoomInfoVo.et - GameData.serverTime;
                this._cdTxt.text = App.DateUtil.getFormatBySecond(leftTimt).toString();
                // this.tick()
                TickManager.removeTick(this.tick, this);
                TickManager.addTick(this.tick, this);
                // if(this._strenthenBtn){
                //     this._strenthenBtn.visible = true;
                // }
            }
            this._cdTxt.x = cdBg.x + cdBg.width / 2 - this._cdTxt.width / 2;
            this._cdTxt.y = cdBg.y + cdBg.height / 2 - this._cdTxt.height / 2;
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
            if (this._strenthenBtn) {
                this._strenthenBtn.visible = false;
            }
            this._tipTxt.visible = true;
            this.dealStrenExp();
            this.showStrenthenAni();
        }
    };
    BookroomInfoItem.prototype.tick = function () {
        this._bRoomInfoVo = Api.bookroomVoApi.getSeatInfoByPosId(this._posId);
        if (this._bRoomInfoVo && this._bRoomInfoVo.et) {
            if (this._bRoomInfoVo.et > GameData.serverTime && this._cdTxt) {
                var leftTimt = this._bRoomInfoVo.et - GameData.serverTime;
                this._cdTxt.textColor = TextFieldConst.COLOR_WHITE;
                this._cdTxt.text = App.DateUtil.getFormatBySecond(leftTimt).toString();
                //  LanguageManager.getlocal("affair_cdTip",[]) ;
                var cdBg = this.getChildByName("cdBg");
                this._cdTxt.x = cdBg.x + cdBg.width / 2 - this._cdTxt.width / 2;
                this._cdTxt.y = cdBg.y + cdBg.height / 2 - this._cdTxt.height / 2;
                cdBg = null;
                if (this._strenthenBtn) {
                    if (this._bRoomInfoVo.level >= GameConfig.config.bookroomCfg.count) {
                        this._strenthenBtn.visible = false;
                    }
                    else {
                        this._strenthenBtn.visible = true;
                    }
                }
                return true;
            }
            else {
                if (this._cdTxt) {
                    this._cdTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
                    this._cdTxt.text = LanguageManager.getlocal("bookRoomServant_studyComplete");
                }
                if (this._strenthenBtn) {
                    this._strenthenBtn.visible = false;
                }
                this.dealStrenExp();
                this.showStrenthenAni();
                return false;
            }
        }
        else {
            if (this._strenthenBtn) {
                this._strenthenBtn.visible = false;
            }
        }
        return false;
    };
    Object.defineProperty(BookroomInfoItem.prototype, "isEmpty", {
        //位置是否是空的
        get: function () {
            if (this._bRoomInfoVo) {
                return false;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    BookroomInfoItem.prototype.bookRoomHandler = function () {
        if (this._bRoomInfoVo && this._bRoomInfoVo.et < GameData.serverTime) {
            NetManager.request(NetRequestConst.REQUEST_BOOKROOM_FINISH, { pos: this._posId, isbatch: 0 });
        }
        if (!this._bRoomInfoVo) {
            ViewController.getInstance().openView(ViewConst.POPUP.BOOKROOMSERVANTSELECTPOPUPVIEW, { posId: this._posId, cardType: this._cardType });
        }
    };
    BookroomInfoItem.prototype.dispose = function () {
        TickManager.removeTick(this.tick, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY), this.refreshUI, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_FINISH), this.refreshUI, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_INTENSIVESTUDY), this.strenthenReqCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY_BATCH), this.refreshUI, this);
        this._index = null;
        this._posId = null;
        this._desk = null;
        this._tipTxt = null;
        this._cdTxt = null;
        this._bRoomInfoVo = null;
        this._strenthenBtn = null;
        this._strenExpTxt = null;
        this._strenAni = null;
        this._cardType = 0;
        this._tipNode = null;
        _super.prototype.dispose.call(this);
    };
    return BookroomInfoItem;
}(BaseDisplayObjectContainer));
__reflect(BookroomInfoItem.prototype, "BookroomInfoItem");
