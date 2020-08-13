/**
 * 出海门客 船相关
 * @author 张朝阳
 * date 2019/2/19
 * @class ServantViewExileBoatContainer
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
var ServantViewExileBoatContainer = (function (_super) {
    __extends(ServantViewExileBoatContainer, _super);
    function ServantViewExileBoatContainer() {
        var _this = _super.call(this) || this;
        _this._boatContainer = null;
        _this._exileContainer = null;
        _this._posId = 0;
        _this._posIdx = 0;
        _this._iconBgBt = null;
        _this._iconBt = null;
        _this._timeTF = null;
        _this._recallServantBtn = null;
        _this._servantState = null;
        _this._gemCostNum = 0;
        _this._isPlayAni = false;
        _this._isPlayAni2 = false;
        _this._tipContainer = null;
        _this._isRight = false;
        _this._servantId = null;
        _this._dayTxt = null;
        _this._dropDescTxt = null;
        _this._buffBg = null;
        _this._buffText = null;
        _this.frameCfg = [
            { idle: true, idleX: 63, idleY: 144, talk: true, talkX: 183, talkY: 152 },
            { idle: true, idleX: 121, idleY: 155, talk: true, talkX: 108, talkY: 142 },
            { idle: false, idleX: 0, idleY: 0, talk: true, talkX: 135, talkY: 149 },
            { idle: true, idleX: 145, idleY: 134, talk: false, talkX: 0, talkY: 0 },
            { idle: false, idleX: 0, idleY: 0, talk: true, talkX: 65, talkY: 139 },
            { idle: true, idleX: 194, idleY: 166, talk: false, talkX: 0, talkY: 0 },
        ];
        _this._timeDesc = null;
        _this._bg = null;
        _this._chooseServantContainer = null;
        _this._nowCode = 1;
        _this._isCardSeat = false;
        return _this;
    }
    ServantViewExileBoatContainer.prototype.init = function (posId, isRight) {
        var _this = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_BANISH, this.servantExileHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_BANISHBUFF, this.resetReddot, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_GETSERVANTBANISHMODEL, this.getmodleHandle, this);
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_BANISH, this.refreshView, this);
        this._posId = posId;
        this._posIdx = posId;
        this._isCardSeat = false;
        var totalnum = Api.servantExileVoApi.getTotalSeatNumber();
        var actnum = totalnum - Api.servantExileVoApi.getSeatNumber2();
        if (this._posId > Api.servantExileVoApi.getSeatNumber()) {
            if (posId <= (Api.servantExileVoApi.getSeatNumber() + actnum)) {
                var list = Api.acVoApi.getActivityVoListByAid(AcConst.AID_BATTLEPASS);
                list.sort(function (a, b) {
                    return a.et - b.et;
                });
                var end = Api.servantExileVoApi.getSeatNumber();
                for (var i in list) {
                    var vo = list[i];
                    end += vo.getServantBanPos();
                    if (this._posId <= end) {
                        this._nowCode = vo.code;
                        if (vo && vo.isInActivity()) {
                            this._posId = vo.svtBanPos[this._posId - (end - vo.getServantBanPos())];
                            break;
                        }
                    }
                }
            }
            else {
                this._posId = Api.servantExileVoApi.getCardSeatIndex(posId);
                this._isCardSeat = true;
            }
        }
        // let vo = <AcBattlePassVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEPASS);
        // if(this._posId > Api.servantExileVoApi.getSeatNumber() && vo && vo.svtBanPos){
        // 	this._posId = Number(vo.svtBanPos[this._posId - Api.servantExileVoApi.getSeatNumber()]);
        // }
        this._isRight = isRight;
        this.width = 289;
        this.height = 155;
        //船相关
        this._boatContainer = new BaseDisplayObjectContainer();
        var boat = BaseLoadBitmap.create("servantexileview_leftboat");
        boat.width = 289;
        boat.height = 155;
        if (this._isRight) {
            boat.setload("servantexileview_rightboat");
        }
        this._boatContainer.addChild(boat);
        boat.addTouchTap(function () {
            if (!_this._isPlayAni && !_this._isPlayAni2) {
                if (Config.ExileCfg.numNeed >= (Api.servantVoApi.getServantCount() - Api.servantExileVoApi.getUseSeatNumber())) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("servantExileSelectServantPopupViewShowTip", [String(Config.ExileCfg.numNeed)]));
                    return;
                }
                var totalnum_1 = Api.servantExileVoApi.getTotalSeatNumber();
                var tid = posId;
                var curvo = Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEPASS, _this._nowCode.toString());
                if (_this._posId > Api.servantExileVoApi.getSeatNumber2() && curvo && !curvo.isInActivity()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("servantExileSelectServantPopupViewShowTip4"));
                    return;
                }
                if (_this._isCardSeat) {
                    var seatinfo = Api.servantExileVoApi.getServantExileInfoForKey(String(_this._posId));
                    if (seatinfo && seatinfo.lastet && seatinfo.lastet < GameData.serverTime) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("servantExileSelectServantPopupViewShowTip4"));
                        return;
                    }
                }
                var dayss = 0;
                if (_this._isCardSeat) {
                    var curvo_1 = Api.servantExileVoApi.getServantExileInfoForKey(String(_this._posId));
                    if (curvo_1 && curvo_1.lastet) {
                        var endtime = curvo_1.lastet;
                        dayss = Math.ceil((endtime - GameData.serverTime) / 86400);
                    }
                }
                else if (_this._posId > Api.servantExileVoApi.getSeatNumber()) {
                    var curvo_2 = Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEPASS, _this._nowCode.toString());
                    if (curvo_2 && curvo_2.isInActivity) {
                        var endtime = curvo_2.et - 86400 * 1;
                        dayss = Math.ceil((endtime - GameData.serverTime) / 86400);
                    }
                }
                ViewController.getInstance().openView(ViewConst.POPUP.SERVANTEXILESELECTSERVANTPOPUPVIEW, {
                    posId: _this._posId,
                    days: dayss
                });
            }
        }, this);
        this._tipContainer = new BaseDisplayObjectContainer();
        this._boatContainer.addChild(this._tipContainer);
        var tipbg = BaseBitmap.create("bookroom_tipbg");
        tipbg.setPosition(boat.x + boat.width / 2 - tipbg.width / 2, boat.y + 10);
        this._tipContainer.addChild(tipbg);
        var tipTF = ComponentManager.getTextField(LanguageManager.getlocal("servantViewExileBoatTip_exile"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        tipTF.setPosition(tipbg.x + tipbg.width / 2 - tipTF.width / 2, tipbg.y + tipbg.height / 2 - tipTF.height / 2 - 5);
        this._tipContainer.addChild(tipTF);
        egret.Tween.get(this._tipContainer, { loop: true }).to({ y: -10 }, 1000).to({ y: 0 }, 1000);
        //出海门客相关
        this._exileContainer = new BaseDisplayObjectContainer();
        this._exileContainer.width = 288;
        this._exileContainer.height = 120;
        var bg = BaseLoadBitmap.create("exile_servantinfo__bg");
        bg.width = 266 / 0.85;
        bg.height = 132 / 0.85;
        bg.setPosition(this.x + this.width / 2 - bg.width / 2, this.y + this.height / 2 - bg.height / 2);
        this._exileContainer.addChild(bg);
        var scaleVale = 95 / 184;
        this._iconBgBt = BaseLoadBitmap.create("servant_cardbg_0");
        this._iconBgBt.width = 184;
        this._iconBgBt.height = 184;
        this._iconBgBt.setScale(scaleVale);
        this._iconBgBt.setPosition(bg.x + 25, bg.y + bg.height / 2 - this._iconBgBt.height / 2 * scaleVale);
        this._exileContainer.addChild(this._iconBgBt);
        this._iconBt = BaseLoadBitmap.create("servant_half_1030");
        this._iconBt.width = 180 - 3;
        this._iconBt.height = 177 - 3;
        this._iconBt.setScale(scaleVale);
        this._iconBt.setPosition(this._iconBgBt.x + this._iconBgBt.width / 2 * scaleVale - this._iconBt.width / 2 * scaleVale, this._iconBgBt.y + this._iconBgBt.height / 2 * scaleVale - this._iconBt.height / 2 * scaleVale);
        this._exileContainer.addChild(this._iconBt);
        this._recallServantBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "servantViewExileBoatRecallServantBtn_exile", function () {
            // ViewController.getInstance().openView(ViewConst.POPUP.SERVANTEXILESERVANTBACKPOPUPVIEW);
            if (_this._isPlayAni2 || _this._isPlayAni) {
                return;
            }
            if (Api.servantExileVoApi.getServantExileInfoForKey(String(_this._posId))) {
                var servantExileInfo = Api.servantExileVoApi.getServantExileInfoForKey(String(_this._posId));
                var servantInfo = Api.servantVoApi.getServantObj(servantExileInfo.servantId);
                // let titleKey = "servantExileServantGoOutPopupViewSevantExileFinishTitle";
                var backTime = Api.servantExileVoApi.getServantBackTime(servantExileInfo.servantId);
                var backDay = backTime % 86400 == 0 ? backTime / 86400 : Math.floor(backTime / 86400) + 1;
                _this._gemCostNum = backDay * Config.ExileCfg.unitGem;
                var topMessage = LanguageManager.getlocal("servantExileServantGoOutPopupViewSevantExileFinishTopMessage", [servantInfo.servantName, String(_this._gemCostNum)]);
                var freeBackTime = Api.servantExileVoApi.getServantFreeTimeBack(Api.servantExileVoApi.getServantExileInfoForKey(String(_this._posId)).servantId);
                if (Api.switchVoApi.checkOpenBanishFreeTime() && freeBackTime) {
                    _this._gemCostNum = 0;
                    topMessage = LanguageManager.getlocal("servantExileServantGoOutPopupViewSevantExileFinishTopMessage2", [servantInfo.servantName]);
                }
                // let buttomMessage = LanguageManager.getlocal("servantExileServantGoOutPopupViewSevantExileFinishButtomMessage", [String(this._gemCostNum)]);
                // ViewController.getInstance().openView(ViewConst.POPUP.SERVANTEXILESERVANTGOOUTPOPUPVIEW, {
                // 	titleKey: titleKey,
                // 	topMessage: topMessage,
                // 	buttomMessage: buttomMessage,
                // 	confirmCallback: this.servantExileFinishClick,
                // 	handle: this,
                // });
                ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, {
                    confirmCallback: _this.servantExileFinishClick,
                    handler: _this,
                    icon: "itemicon1",
                    iconBg: "itembg_1",
                    num: Api.playerVoApi.getPlayerGem(),
                    useNum: _this._gemCostNum,
                    msg: topMessage,
                    id: 1,
                });
            }
        }, this);
        this._recallServantBtn.setPosition(bg.x + bg.width - this._recallServantBtn.width - 25 - 12, bg.y + bg.height - this._recallServantBtn.height - 7 - 21);
        this._exileContainer.addChild(this._recallServantBtn);
        this._timeTF = ComponentManager.getTextField(LanguageManager.getlocal("servantViewExileBoatServantTime_exile", ["123"]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeTF.setPosition(this._recallServantBtn.x + this._recallServantBtn.width / 2 - this._timeTF.width / 2, this._recallServantBtn.y - this._timeTF.height - 13 - 14);
        this._exileContainer.addChild(this._timeTF);
        this._bg = bg;
        this._timeDesc = ComponentManager.getTextField(LanguageManager.getlocal("servantViewExileBoatServantTime_FreeTimeBack", ["123"]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeDesc.setPosition(this._bg.x + this._bg.width / 2 - this._timeDesc.width / 2, this._bg.y + this._bg.height + 5 - 10 - 15);
        this._exileContainer.addChild(this._timeDesc);
        this._servantState = ComponentManager.getTextField(LanguageManager.getlocal("servantViewExileBoatServantState_exile"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        this._servantState.setPosition(this._recallServantBtn.x + this._recallServantBtn.width / 2 - this._servantState.width / 2, this._timeTF.y - this._servantState.height + 20);
        this._exileContainer.addChild(this._servantState);
        //岸上面的小人
        if (Math.random() < 0.5) {
            var index = Math.floor(Math.random() * 7);
            var aniCfg = this.frameCfg[index];
            if (aniCfg) {
                if (aniCfg.talk) {
                    var talk = ComponentManager.getCustomMovieClip("servantexileview_frameanimation_talk", 6, 250);
                    talk.setPosition(boat.x + aniCfg.talkX, boat.y + aniCfg.talkY);
                    this.addChild(talk);
                    talk.playWithTime(-1);
                }
                if (aniCfg.idle) {
                    var idle = BaseBitmap.create("servantexileview_frameanimation_idle");
                    idle.setPosition(boat.x + aniCfg.idleX, boat.y + aniCfg.idleY);
                    this.addChild(idle);
                }
            }
        }
        this.addChild(this._boatContainer);
        this._exileContainer.setScale(0.85);
        this._exileContainer.setPosition(this.x + 12, this.y + 18);
        if (this._isRight) {
            this._exileContainer.setPosition(this.x + 30, this.y + 18);
        }
        this.addChild(this._exileContainer);
        this.refreshView();
        //限时
        if (this._isCardSeat) {
            bg.height = 148 / 0.85;
            var tipbg_1 = BaseBitmap.create("servantexiletiipbg");
            var day = "";
            var curvo = Api.servantExileVoApi.getServantExileInfoForKey(String(this._posId));
            var endtime = curvo.lastet;
            if ((endtime - GameData.serverTime) / 86400 >= 1) {
                day = Math.max(0, Math.ceil((endtime - GameData.serverTime) / 86400)) + LanguageManager.getlocal("date_day2");
            }
            else {
                day = Math.max(0, Math.ceil((endtime - GameData.serverTime) / 3600)) + LanguageManager.getlocal("date_hour");
            }
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("limitDayTime", [day]), 18, TextFieldConst.COLOR_WHITE);
            if (this._isRight) {
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, tipbg_1, this._boatContainer, [0, -35]);
            }
            else {
                App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, tipbg_1, this._boatContainer, [0, -35]);
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipbg_1, [0, 0]);
            this.addChild(tipbg_1);
            this.addChild(tipTxt);
            this._dayTxt = tipTxt;
            var dropDescTxt = ComponentManager.getTextField(LanguageManager.getlocal("exileCard_dropdesc"), 20);
            dropDescTxt.textColor = TextFieldConst.COLOR_QUALITY_YELLOW;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, dropDescTxt, this._boatContainer, [this._isRight ? 20 : -20, this._boatContainer.height - 27]);
            this.addChild(dropDescTxt);
            this._dropDescTxt = dropDescTxt;
        }
        else if (this._posId > Api.servantExileVoApi.getSeatNumber()) {
            bg.height = 148 / 0.85;
            var tipbg_2 = BaseBitmap.create("servantexiletiipbg");
            var day = "";
            var curvo = Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEPASS, this._nowCode.toString());
            if (curvo && curvo.isInActivity) {
                var endtime = curvo.et - 86400 * 1;
                if ((endtime - GameData.serverTime) / 86400 >= 1) {
                    day = Math.max(0, Math.ceil((endtime - GameData.serverTime) / 86400)) + LanguageManager.getlocal("date_day2");
                }
                else {
                    day = Math.max(0, Math.ceil((endtime - GameData.serverTime) / 3600)) + LanguageManager.getlocal("date_hour");
                }
            }
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("limitDayTime", [day]), 18, TextFieldConst.COLOR_WHITE);
            if (this._isRight) {
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, tipbg_2, this._boatContainer, [0, -35]);
            }
            else {
                App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, tipbg_2, this._boatContainer, [0, -35]);
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipbg_2, [0, 0]);
            this.addChild(tipbg_2);
            this.addChild(tipTxt);
            this._dayTxt = tipTxt;
            var dropDescTxt = ComponentManager.getTextField(LanguageManager.getlocal("battlepassdropdesc", [LanguageManager.getlocal("acBattlePassTitle-" + this._nowCode)]), 20);
            dropDescTxt.textColor = TextFieldConst.COLOR_QUALITY_YELLOW;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, dropDescTxt, this._boatContainer, [this._isRight ? 20 : -20, this._boatContainer.height - 27]);
            this.addChild(dropDescTxt);
            this._dropDescTxt = dropDescTxt;
        }
        //门客加成
        if (Api.switchVoApi.checkOpenExileBuff()) {
            this._chooseServantContainer = new BaseDisplayObjectContainer();
            this._chooseServantContainer.y = 5;
            this.addChild(this._chooseServantContainer);
            var topbg = BaseLoadBitmap.create("exile_buff_setbg");
            topbg.width = 203;
            topbg.height = 39;
            topbg.setPosition(this._exileContainer.x + 22, -12);
            this._chooseServantContainer.addChild(topbg);
            this._buffBg = topbg;
            topbg.addTouchTap(function () {
                ViewController.getInstance().openView(ViewConst.POPUP.SERVANTEXILESERVANTBUFFVIEW, { pos: _this._posId });
            }, this);
            var clickSetText = ComponentManager.getTextField(LanguageManager.getlocal("exileBuffSetServnat"), 20, TextFieldConst.COLOR_BLACK);
            clickSetText.width = topbg.width;
            clickSetText.textAlign = egret.HorizontalAlign.CENTER;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, clickSetText, topbg);
            this._chooseServantContainer.addChild(clickSetText);
            this._buffText = clickSetText;
            if (Api.servantExileVoApi.hasServantExileForKey(String(this._posId))) {
                this._chooseServantContainer.visible = true;
            }
            else {
                this._chooseServantContainer.visible = false;
            }
            this.resetReddot();
        }
    };
    ServantViewExileBoatContainer.prototype.refreshView = function () {
        TickManager.removeTick(this.tick, this);
        if (!this._boatContainer) {
            return;
        }
        this._boatContainer.setPosition(0, 0);
        this._exileContainer.alpha = 1;
        var servantExileInfo = Api.servantExileVoApi.getServantExileInfoForKey(String(this._posId));
        if (servantExileInfo && servantExileInfo.servantId || this._posId > 100) {
            TickManager.addTick(this.tick, this);
        }
        if (servantExileInfo && servantExileInfo.servantId) {
            this._exileContainer.setVisible(true);
            this._boatContainer.setVisible(false);
            var servantInfo = Api.servantVoApi.getServantObj(servantExileInfo.servantId);
            this._servantId = servantExileInfo.servantId;
            this._iconBgBt.setload(servantInfo.qualityBoxImgPath);
            this._iconBt.setload(servantInfo.halfImgPath);
            this.tick();
        }
        else {
            this._exileContainer.setVisible(false);
            this._boatContainer.setVisible(true);
            this._tipContainer.setVisible(true);
        }
        if (Config.ExileCfg.numNeed >= (Api.servantVoApi.getServantCount() - Api.servantExileVoApi.getUseSeatNumber())) {
            this._tipContainer.setVisible(false);
        }
        else {
            this._tipContainer.setVisible(true);
        }
    };
    /**门客提前回归 */
    ServantViewExileBoatContainer.prototype.servantExileFinishClick = function () {
        if (!this._posId) {
            App.CommonUtil.showTip(LanguageManager.getlocal("servantExileSelectServantPopupViewShowTip4"));
            return;
        }
        var curvo = Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEPASS, this._nowCode.toString());
        if (this._posId > 1000 && curvo && !curvo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("servantExileSelectServantPopupViewShowTip4"));
            return;
        }
        if (this._isCardSeat) {
            var seatinfo = Api.servantExileVoApi.getServantExileInfoForKey(String(this._posId));
            if (seatinfo && seatinfo.lastet && seatinfo.lastet < GameData.serverTime) {
                App.CommonUtil.showTip(LanguageManager.getlocal("servantExileSelectServantPopupViewShowTip4"));
                return;
            }
        }
        if (Api.playerVoApi.getPlayerGem() < this._gemCostNum) {
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            return;
        }
        var servantId = Api.servantExileVoApi.getServantExileInfoForKey(String(this._posId)).servantId;
        NetManager.request(NetRequestConst.REQUEST_SERVANT_FINISH, { servantId: servantId });
    };
    ServantViewExileBoatContainer.prototype.servantExileHandle = function (event) {
        if (event.data.ret) {
            this.refreshView();
            if (this._posId == event.data.data.data.pos) {
                this.playServantExileAni();
            }
        }
    };
    /**门客出海动画 */
    ServantViewExileBoatContainer.prototype.playServantExileAni = function () {
        var _this = this;
        this._isPlayAni = true;
        this._exileContainer.setVisible(true);
        this._boatContainer.setVisible(true);
        this._tipContainer.setVisible(false);
        this._exileContainer.alpha = 0;
        if (this._isRight) {
            egret.Tween.get(this._boatContainer).to({ x: 193 }, 2000).call(function () {
                egret.Tween.get(_this._exileContainer).to({ alpha: 1 }, 500).call(function () {
                    _this._exileContainer.alpha = 1;
                    egret.Tween.removeTweens(_this._exileContainer);
                }, _this);
            }, this).to({ x: 289 }, 1000).call(function () {
                _this._boatContainer.setVisible(false);
                if (_this._chooseServantContainer) {
                    _this._chooseServantContainer.visible = true;
                    _this.resetReddot();
                }
            }, this).wait(1000).call(function () {
                _this._isPlayAni = false;
                egret.Tween.removeTweens(_this._boatContainer);
            });
        }
        else {
            egret.Tween.get(this._boatContainer).to({ x: -193 }, 2000).call(function () {
                egret.Tween.get(_this._exileContainer).to({ alpha: 1 }, 500).call(function () {
                    _this._exileContainer.alpha = 1;
                    egret.Tween.removeTweens(_this._exileContainer);
                }, _this);
            }, this).to({ x: -289 }, 1000).call(function () {
                _this._boatContainer.setVisible(false);
                // this._isPlayAni = false;
                // egret.Tween.removeTweens(this._boatContainer);
                if (_this._chooseServantContainer) {
                    _this._chooseServantContainer.visible = true;
                    _this.resetReddot();
                }
            }, this).wait(1000).call(function () {
                _this._isPlayAni = false;
                egret.Tween.removeTweens(_this._boatContainer);
            });
        }
    };
    /**门客出海动画 */
    ServantViewExileBoatContainer.prototype.playServantExileBackAni = function (servantId) {
        var _this = this;
        if (servantId != this._servantId) {
            this.refreshView();
            return;
        }
        if (this._chooseServantContainer) {
            this._chooseServantContainer.visible = false;
        }
        this._servantId = null;
        TickManager.removeTick(this.tick, this);
        this._isPlayAni2 = true;
        this._exileContainer.setVisible(true);
        this._boatContainer.setVisible(true);
        this._tipContainer.setVisible(false);
        if (this._isRight) {
            this._boatContainer.x = 289;
            egret.Tween.get(this._boatContainer).to({ x: 0 }, 3000).call(function () {
                _this._isPlayAni2 = false;
                _this._tipContainer.setVisible(true);
                _this.refreshView();
                egret.Tween.removeTweens(_this._boatContainer);
            }, this);
            this._exileContainer.alpha = 1;
            egret.Tween.get(this._exileContainer).to({ alpha: 0 }, 500).call(function () {
                egret.Tween.removeTweens(_this._exileContainer);
            }, this);
        }
        else {
            this._boatContainer.x = -289;
            egret.Tween.get(this._boatContainer).to({ x: 0 }, 3000).call(function () {
                _this._isPlayAni2 = false;
                _this._tipContainer.setVisible(true);
                _this.refreshView();
                egret.Tween.removeTweens(_this._boatContainer);
            }, this);
            this._exileContainer.alpha = 1;
            egret.Tween.get(this._exileContainer).to({ alpha: 0 }, 500).call(function () {
                egret.Tween.removeTweens(_this._exileContainer);
            }, this);
        }
    };
    ServantViewExileBoatContainer.prototype.getmodleHandle = function (event) {
        if (event.data.ret) {
            var servantIds = event.data.data.data.servantIds;
            if (servantIds && Object.keys(servantIds).length > 0) {
                for (var key in servantIds) {
                    // let servantName = Api.servantVoApi.getServantObj(servantIds[key]).servantName;
                    this.playServantExileBackAni(servantIds[key]);
                }
            }
            // this.refreshView();
        }
    };
    ServantViewExileBoatContainer.prototype.tick = function () {
        var time = -1;
        if (Api.servantExileVoApi.getServantExileInfoForKey(String(this._posId)) && Api.servantExileVoApi.getServantExileInfoForKey(String(this._posId)).servantId) {
            time = Api.servantExileVoApi.getServantBackTime(Api.servantExileVoApi.getServantExileInfoForKey(String(this._posId)).servantId);
        }
        if (time > 0) {
            var timeStr = App.DateUtil.getFormatBySecondIntoTime(time);
            this._timeTF.text = LanguageManager.getlocal("servantViewExileBoatServantTime_exile", [timeStr]);
            this._timeTF.setPosition(this._recallServantBtn.x + this._recallServantBtn.width / 2 - this._timeTF.width / 2, this._recallServantBtn.y - this._timeTF.height - 3);
            var freeBackTime = Api.servantExileVoApi.getServantFreeTimeBack(Api.servantExileVoApi.getServantExileInfoForKey(String(this._posId)).servantId);
            if (freeBackTime) {
                var timeDesc = App.DateUtil.getFormatBySecond(freeBackTime, 1);
                this._timeDesc.text = LanguageManager.getlocal("servantViewExileBoatServantTime_FreeTimeBack", [timeDesc]);
                // if (this._dropDescTxt)
                // {
                // 	this._timeDesc.setPosition(this._bg.x + this._bg.width / 2 - this._timeDesc.width / 2, this._exileContainer.y+this._dropDescTxt.y + this._dropDescTxt.height-2);
                // }
                // else
                // {
                this._timeDesc.setPosition(this._bg.x + this._bg.width / 2 - this._timeDesc.width / 2, this._bg.y + this._bg.height - 2);
                // }
                this._timeDesc.setVisible(true);
            }
            else {
                this._timeDesc.setVisible(false);
            }
        }
        else {
            if (time == 0) {
                TickManager.removeTick(this.tick, this);
                NetManager.request(NetRequestConst.REQUEST_SERVANT_GETSERVANTBANISHMODEL, {});
            }
        }
        var totalnum = Api.servantExileVoApi.getTotalSeatNumber();
        var vo = Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEPASS, this._nowCode.toString());
        if (this._isCardSeat) {
            var day = '';
            var curvo = Api.servantExileVoApi.getServantExileInfoForKey(String(this._posId));
            var endtime = curvo.lastet;
            if ((endtime - GameData.serverTime) / 86400 >= 1) {
                day = Math.max(0, Math.ceil((endtime - GameData.serverTime) / 86400)) + LanguageManager.getlocal("date_day2");
            }
            else {
                day = Math.max(0, Math.ceil((endtime - GameData.serverTime) / 3600)) + LanguageManager.getlocal("date_hour");
            }
            if (endtime - GameData.serverTime < 0) {
                TickManager.removeTick(this.tick, this);
                NetManager.request(NetRequestConst.REQUEST_SERVANT_GETSERVANTBANISHMODEL, {});
            }
            if (this._dayTxt) {
                this._dayTxt.text = LanguageManager.getlocal("limitDayTime", [day]);
            }
        }
        else if (this._posIdx > Api.servantExileVoApi.getSeatNumber2()) {
            var day = '';
            if (vo && vo.isInActivity) {
                var endtime = vo.et - 86400 * 1;
                if ((endtime - GameData.serverTime) / 86400 >= 1) {
                    day = Math.max(0, Math.ceil((endtime - GameData.serverTime) / 86400)) + LanguageManager.getlocal("date_day2");
                }
                else {
                    day = Math.max(0, Math.ceil((endtime - GameData.serverTime) / 3600)) + LanguageManager.getlocal("date_hour");
                }
                if (endtime - GameData.serverTime <= 0) {
                    TickManager.removeTick(this.tick, this);
                    NetManager.request(NetRequestConst.REQUEST_SERVANT_GETSERVANTBANISHMODEL, {});
                }
            }
            if (this._dayTxt) {
                this._dayTxt.text = LanguageManager.getlocal("limitDayTime", [day]);
            }
        }
    };
    ServantViewExileBoatContainer.prototype.resetReddot = function () {
        if (this._chooseServantContainer) {
            if (Api.servantExileVoApi.getIsBuffedBySeat(this._posId) == false) {
                App.CommonUtil.addIconToBDOC(this._chooseServantContainer);
                var reddot = this._chooseServantContainer.getChildByName("reddot");
                if (this._isRight) {
                    reddot.x = 236;
                }
                else {
                    reddot.x = 216;
                }
                reddot.y = -15;
                this._buffBg.setload("exile_buff_setbg");
                this._buffText.text = LanguageManager.getlocal("exileBuffSetServnat");
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._chooseServantContainer);
                this._buffBg.setload("exile_buff_setbg2");
                this._buffText.text = LanguageManager.getlocal("exileBuffSetServnat2");
            }
        }
    };
    ServantViewExileBoatContainer.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_BANISH, this.servantExileHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_BANISHBUFF, this.resetReddot, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_GETSERVANTBANISHMODEL, this.getmodleHandle, this);
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_BANISH, this.refreshView, this);
        TickManager.removeTick(this.tick, this);
        egret.Tween.removeTweens(this._tipContainer);
        egret.Tween.removeTweens(this._boatContainer);
        egret.Tween.removeTweens(this._exileContainer);
        this._boatContainer = null;
        this._exileContainer = null;
        this._tipContainer = null;
        this._posId = 0;
        this._iconBgBt = null;
        this._iconBt = null;
        this._recallServantBtn = null;
        this._timeTF = null;
        this._gemCostNum = 0;
        this._isPlayAni = false;
        this._isPlayAni2 = false;
        this._isRight = false;
        this._servantId = null;
        this._timeDesc = null;
        this._bg = null;
        this._dayTxt = null;
        this._nowCode = 1;
        this._chooseServantContainer = null;
        this._posIdx = 0;
        this._dropDescTxt = null;
        this._isCardSeat = false;
        this._buffBg = null;
        this._buffText = null;
        _super.prototype.dispose.call(this);
    };
    return ServantViewExileBoatContainer;
}(BaseDisplayObjectContainer));
__reflect(ServantViewExileBoatContainer.prototype, "ServantViewExileBoatContainer");
//# sourceMappingURL=ServantViewExileBoatContainer.js.map