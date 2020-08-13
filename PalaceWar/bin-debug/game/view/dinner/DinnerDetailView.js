/**
 * 宴会详情 带桌子的 view
 * author shaoliang
 * date 2017/11/6
 * @class DinnerDetailView
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
var DinnerDetailView = (function (_super) {
    __extends(DinnerDetailView, _super);
    function DinnerDetailView() {
        var _this = _super.call(this) || this;
        _this.voApi = null;
        _this._uid = 0;
        _this._seatText = null;
        _this._scoreText = null;
        _this._timeText = null;
        _this._scrollList = null;
        _this._scrollView = null;
        _this._scrollContiner = null;
        _this._intoSeatBtn = null;
        _this._headTab = [];
        _this._joinedDtype = 0;
        _this._clickUid = 0;
        _this._canShare = true;
        _this._timestext = null;
        _this._needPay = 0;
        _this._paymentIds = [];
        return _this;
    }
    DinnerDetailView.prototype.getTitleStr = function () {
        return "dinnerTitle" + this.voApi.getDtype();
    };
    DinnerDetailView.prototype.getResourceList = function () {
        this.voApi = new DinnerVoApi();
        this.voApi.formatData(this.param.data.info.dinnerdetail);
        this._uid = Number(this.param.data.uid);
        if (this.voApi.getDtype() == 1) {
            this._bgPreStr = "dinner_scroll_";
        }
        else {
            this._bgPreStr = "dinner_scroll2_";
        }
        return _super.prototype.getResourceList.call(this).concat([
            "dinner_head_arrow",
            this._bgPreStr + "1",
            this._bgPreStr + "2",
            this._bgPreStr + "3",
            "palace_titlebg",
            "countrywarrewardview_itembg",
            "dinner_onekey_type1",
            "dinner_onekey_type2", "dinner_onekey_type3", "dinner_onekey_type4"
        ]);
    };
    DinnerDetailView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_JOINDINNER), this.requiestCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_USEITEM), this.useItemCallback, this);
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        this._scrollContiner = new BaseDisplayObjectContainer();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth, (GameConfig.stageHeigth - 238 - this.getTitleButtomY()));
        this._scrollView = ComponentManager.getScrollView(this._scrollContiner, rect);
        this._scrollView.y = -13;
        this._scrollView.bounces = false;
        this.addChildToContainer(this._scrollView);
        //上部玩家信息
        var playerInfoBg = BaseBitmap.create("palace_titlebg");
        // playerInfoBg.width = 540;
        // playerInfoBg.height = 150;
        playerInfoBg.setPosition(GameConfig.stageWidth / 2 - playerInfoBg.width / 2, -10);
        this.addChildToContainer(playerInfoBg);
        var playerName = ComponentManager.getTextField(this.voApi.getName(), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BLACK);
        playerName.setPosition(playerInfoBg.x + playerInfoBg.width / 2 - playerName.width / 2, playerInfoBg.y + 30);
        this.addChildToContainer(playerName);
        var dinnerSeat = ComponentManager.getTextField(LanguageManager.getlocal("dinnerSeat") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        dinnerSeat.setPosition(playerInfoBg.x + 43, playerInfoBg.y + 64);
        this.addChildToContainer(dinnerSeat);
        this._seatText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        this._seatText.setPosition(dinnerSeat.x + dinnerSeat.width + 10, dinnerSeat.y);
        this.addChildToContainer(this._seatText);
        this.resetSeatText();
        var playerId = ComponentManager.getTextField(LanguageManager.getlocal("playerId", [this._uid.toString()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        playerId.setPosition(dinnerSeat.x, dinnerSeat.y + 32);
        this.addChildToContainer(playerId);
        var playerScore = ComponentManager.getTextField(LanguageManager.getlocal("playerScore") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        playerScore.setPosition(dinnerSeat.x + 248, dinnerSeat.y);
        this.addChildToContainer(playerScore);
        this._scoreText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
        this._scoreText.setPosition(playerScore.x + playerScore.width + 10, playerScore.y);
        this.addChildToContainer(this._scoreText);
        this.resetScoreText();
        var donwTime = ComponentManager.getTextField(LanguageManager.getlocal("adultMarryTime"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        donwTime.setPosition(playerScore.x, playerId.y);
        this.addChildToContainer(donwTime);
        this._timeText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        this._timeText.setPosition(donwTime.x + donwTime.width, donwTime.y);
        this.addChildToContainer(this._timeText);
        var topSeat = BaseBitmap.create(this._bgPreStr + "2");
        this._scrollContiner.addChild(topSeat);
        var totalNum = Config.DinnerCfg.getFeastItemCfg(this.voApi.getDtype()).contain;
        var posY = topSeat.height;
        var middleNum = (totalNum - 4) / 2;
        if (PlatformManager.checkIsKRSp()) {
            middleNum++;
        }
        for (var i = 1; i <= middleNum; i++) {
            var middleSeat = BaseBitmap.create(this._bgPreStr + "1");
            middleSeat.y = posY;
            this._scrollContiner.addChild(middleSeat);
            posY += middleSeat.height;
        }
        var bottomSeat = BaseBitmap.create(this._bgPreStr + "3");
        bottomSeat.y = posY;
        this._scrollContiner.addChild(bottomSeat);
        this.initBottom();
        this.initPlayerInfo();
        if (this.param.data.info.resReport && this.param.data.info.resReport.length > 0) {
            ViewController.getInstance().openView(ViewConst.POPUP.DINNERMESSAGEPOPUPVIEW, { info: this.param.data.info.resReport });
        }
        //test code 
        // let hahah = [{"join_time":1510028530,"uid":1000788,"dtype":4,"name":"夹谷思嘉","pic":3},{"join_time":1510028719,"uid":1000566,"dtype":2,"name":"相里斌蔚","pic":3},{"join_time":1510042954,"pic":4,"dtype":2,"name":"郦元纬","uid":1000534}
        // 	,{"join_time":1510028530,"uid":1000788,"dtype":4,"name":"夹谷思嘉","pic":3},{"join_time":1510028719,"uid":1000566,"dtype":2,"name":"相里斌蔚","pic":3},{"join_time":1510042954,"pic":4,"dtype":2,"name":"郦元纬","uid":1000534}];
        // 	ViewController.getInstance().openView(ViewConst.POPUP.DINNERMESSAGEPOPUPVIEW,{info:hahah});
        //开宴成功
        if (this.param.data.needOpen) {
            ViewController.getInstance().openView(ViewConst.BASE.DINNEROPENEDVIEW, { type: this.param.data.needOpen.type });
        }
        //一键收宴
        if (Api.switchVoApi.checkOpenFinishDinner() && this.param.data.uid == Api.playerVoApi.getPlayerID() && Api.playerVoApi.getPlayerVipLevel() >= Config.DinnerCfg.getUnlockVipNum()) {
            var leftSecond = 86400 - App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
            TimerManager.doTimer(leftSecond * 1000 + 3000, 1, this.receivePushData, this);
            TimerManager.doTimer(leftSecond * 1000 + 10000, 1, this.receivePushData, this);
            var timesbg = BaseBitmap.create("countrywarrewardview_itembg");
            timesbg.scaleX = 260 / timesbg.width;
            timesbg.setPosition(GameConfig.stageWidth - 260, playerInfoBg.y + playerInfoBg.height + 80);
            this.addChildToContainer(timesbg);
            var releaseNum_1 = Config.DinnerCfg.getVipNum(Api.playerVoApi.getPlayerVipLevel()) - Api.dinnerVoApi.getOneKeyNum();
            var textColor = TextFieldConst.COLOR_WARN_GREEN;
            if (releaseNum_1 <= 0) {
                textColor = TextFieldConst.COLOR_WARN_RED;
            }
            var timestext = ComponentManager.getTextField(LanguageManager.getlocal("dinnerFinishNum", [String(releaseNum_1), String(textColor), String(Config.DinnerCfg.getVipNum(Api.playerVoApi.getPlayerVipLevel()))]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            timestext.width = 250;
            timestext.textAlign = egret.HorizontalAlign.CENTER;
            timestext.lineSpacing = 4;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, timestext, timesbg);
            this.addChildToContainer(timestext);
            this._timestext = timestext;
            var rechargeId1 = Config.DinnerCfg.getFinishRechargeId(this.voApi.getDtype() == 1 ? 1 : 3);
            var rechargeId2 = Config.DinnerCfg.getFinishRechargeId(this.voApi.getDtype() == 1 ? 2 : 4);
            // let rechargeCfg1 = Config.RechargeCfg.getRechargeItemCfgByKey(rechargeId1);
            // let rechargeCfg2 = Config.RechargeCfg.getRechargeItemCfgByKey(rechargeId2);
            this._paymentIds = [rechargeId1, rechargeId2];
            var button2 = ComponentManager.getButton("dinner_onekey_type" + (this.voApi.getDtype() == 1 ? 2 : 4), "", function () {
                releaseNum_1 = Config.DinnerCfg.getVipNum(Api.playerVoApi.getPlayerVipLevel()) - Api.dinnerVoApi.getOneKeyNum();
                if (releaseNum_1 <= 0) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("dinnerFinishTip"));
                    return;
                }
                _this._needPay = 2;
                _this.receivePushData();
                //PlatformManager.checkPay(rechargeId2);
            }, this);
            // button2.setText(btnstr2,false);
            button2.setPosition(490, playerInfoBg.y + playerInfoBg.height);
            this.addChildToContainer(button2);
            // let btnstr1 = LanguageManager.getlocal("AcRechargeGiftBtnText", [String(rechargeCfg1.cost)]);
            var button1 = ComponentManager.getButton("dinner_onekey_type" + (this.voApi.getDtype() == 1 ? 1 : 3), "", function () {
                releaseNum_1 = Config.DinnerCfg.getVipNum(Api.playerVoApi.getPlayerVipLevel()) - Api.dinnerVoApi.getOneKeyNum();
                if (releaseNum_1 <= 0) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("dinnerFinishTip"));
                    return;
                }
                _this._needPay = 1;
                _this.receivePushData();
                //PlatformManager.checkPay(rechargeId1);
            }, this);
            // button1.setText(btnstr1,false);
            button1.setPosition(button2.x - button2.width + 20, button2.y);
            this.addChildToContainer(button1);
            // let btnstr2 = LanguageManager.getlocal("AcRechargeGiftBtnText", [String(rechargeCfg2.cost)]);
        }
        this.tick();
    };
    DinnerDetailView.prototype.resetSeatText = function () {
        if (!this.voApi.getDtype()) {
            return;
        }
        var num = this.voApi.getNum();
        var totalNum = Config.DinnerCfg.getFeastItemCfg(this.voApi.getDtype()).contain;
        this._seatText.text = num + "/" + totalNum;
    };
    DinnerDetailView.prototype.resetScoreText = function () {
        this._scoreText.text = this.voApi.getPoint().toString();
    };
    DinnerDetailView.prototype.tick = function () {
        var time = this.voApi.getEndTime() - GameData.serverTime; //+ Config.DinnerCfg.getFeastItemCfg(this.voApi.()).lastTime
        if (time < 0) {
            time = 0;
        }
        this._timeText.text = App.DateUtil.getFormatBySecond(time);
        if (this._uid == Api.playerVoApi.getPlayerID()) {
            var lastShareTime = Api.dinnerVoApi.getShareTime();
            if (GameData.serverTime - lastShareTime >= GameData.sharechatcd) {
                if (this._canShare == false) {
                    this._canShare = true;
                    App.DisplayUtil.changeToNormal(this._intoSeatBtn);
                }
            }
            else {
                if (this._canShare == true) {
                    this._canShare = false;
                    App.DisplayUtil.changeToGray(this._intoSeatBtn);
                }
            }
            if (time == 0) {
                this.receivePushData();
            }
        }
        if (this._timestext) {
            var todaynum = Api.dinnerVoApi.getOneKeyNum();
            var releaseNum = Config.DinnerCfg.getVipNum(Api.playerVoApi.getPlayerVipLevel()) - todaynum;
            var textColor = TextFieldConst.COLOR_WARN_GREEN;
            if (releaseNum <= 0) {
                textColor = TextFieldConst.COLOR_WARN_RED;
            }
            this._timestext.text = LanguageManager.getlocal("dinnerFinishNum", [String(releaseNum), String(textColor), String(Config.DinnerCfg.getVipNum(Api.playerVoApi.getPlayerVipLevel()))]);
        }
    };
    DinnerDetailView.prototype.setBottomButton = function () {
        if (this._intoSeatBtn) {
            this.removeChildFromContainer(this._intoSeatBtn);
            this._intoSeatBtn = null;
        }
        var btnStr;
        var btnpic;
        if (this._uid == Api.playerVoApi.getPlayerID()) {
            btnStr = "dinner_share";
            btnpic = ButtonConst.BTN_NORMAL_BLUE;
        }
        else {
            var numJoin = Api.dinnerVoApi.getDayNum();
            var numJoinTotal = Config.DinnerCfg.getGoToFeastNum();
            if (numJoin >= numJoinTotal) {
                btnStr = "manageRecoveryBtn";
                btnpic = ButtonConst.BTN_NORMAL_RED;
            }
            else {
                btnStr = "intoSeat";
                btnpic = ButtonConst.BTN_NORMAL_BLUE;
            }
        }
        this._intoSeatBtn = ComponentManager.getButton(btnpic, btnStr, this.intoSeat, this);
        this._intoSeatBtn.setPosition(GameConfig.stageWidth / 2 - this._intoSeatBtn.width / 2, GameConfig.stageHeigth - 238 - this.getTitleButtomY() - 12 - 20 - this._intoSeatBtn.height);
        this.addChildToContainer(this._intoSeatBtn);
    };
    DinnerDetailView.prototype.initBottom = function () {
        var buttomContiner = new BaseDisplayObjectContainer();
        buttomContiner.y = GameConfig.stageHeigth - 238 - this.getTitleButtomY() - 12;
        this.addChildToContainer(buttomContiner);
        this.setBottomButton();
        var buttomBg = BaseBitmap.create("public_9_bg22");
        buttomBg.setPosition(0, 0);
        buttomBg.width = GameConfig.stageWidth;
        buttomBg.height = 238;
        buttomContiner.addChild(buttomBg);
        var line1 = BaseBitmap.create("public_line3");
        line1.width = 480;
        line1.x = GameConfig.stageWidth / 2 - line1.width / 2;
        line1.y = 35;
        buttomContiner.addChild(line1);
        var titleText = ComponentManager.getTextField(LanguageManager.getlocal("dinnerInfo"), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_BLACK);
        titleText.setPosition(GameConfig.stageWidth / 2 - titleText.width / 2, 32);
        buttomContiner.addChild(titleText);
        var bottomBg = BaseBitmap.create("public_9_bg21");
        bottomBg.width = 590;
        bottomBg.height = 150;
        bottomBg.setPosition(GameConfig.stageWidth / 2 - bottomBg.width / 2, 60);
        buttomContiner.addChild(bottomBg);
        this._scroRect = new egret.Rectangle(bottomBg.x, 0, bottomBg.width, bottomBg.height - 10);
        this._scrollList = ComponentManager.getScrollList(DinnerInfoItem, this.voApi.getJinfo(), this._scroRect);
        this._scrollList.x = bottomBg.x;
        this._scrollList.y = bottomBg.y + 5;
        this._scrollList.setEmptyTip(LanguageManager.getlocal("dinnerMsgPopupEmptyTip"));
        buttomContiner.addChild(this._scrollList);
    };
    DinnerDetailView.prototype.initPlayerInfo = function () {
        var hostHead = this.getPlayerInfo(this.voApi.getName(), this.voApi.getPic(), this._uid, this.voApi.getPhototitle());
        hostHead.setPosition(GameConfig.stageWidth / 2 - hostHead.width / 2 + 4, 205);
        this._scrollContiner.addChild(hostHead);
        var heightEach;
        if (this.voApi.getDtype() == 1) {
            heightEach = 180;
        }
        else {
            heightEach = 153;
        }
        var dis = 310;
        if (PlatformManager.checkIsKRSp()) {
            dis = dis + heightEach + 10;
        }
        var jinfo = this.voApi.getJinfo();
        for (var k in jinfo) {
            var info = jinfo[k];
            var guestHead = this.getPlayerInfo(info.name, info.pic, info.uid, info.ptitle);
            guestHead.setPosition(70 + (Number(k) % 2 * 344), dis + Math.floor(Number(k) / 2) * heightEach);
            this._scrollContiner.addChild(guestHead);
            this._headTab.push(guestHead);
            if (info.uid == Api.playerVoApi.getPlayerID()) {
                this._intoSeatBtn.visible = false;
                this._scrollView.setScrollTop(guestHead.y - 180);
            }
        }
    };
    DinnerDetailView.prototype.resetPlayerInfo = function () {
        var jinfo = this.voApi.getJinfo();
        var heightEach;
        if (this.voApi.getDtype() == 1) {
            heightEach = 180;
        }
        else {
            heightEach = 153;
        }
        var dis = 310;
        if (PlatformManager.checkIsKRSp()) {
            dis = dis + heightEach + 10;
        }
        for (var k = this._headTab.length; k < jinfo.length; k++) {
            var info = jinfo[k];
            var guestHead = this.getPlayerInfo(info.name, info.pic, info.uid, info.ptitle);
            guestHead.setPosition(70 + (Number(k) % 2 * 344), dis + Math.floor(Number(k) / 2) * heightEach);
            this._scrollContiner.addChild(guestHead);
            this._headTab.push(guestHead);
            egret.Tween.get(guestHead).to({ scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 1, scaleY: 1 }, 200).to({ scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 1, scaleY: 1 }, 200);
            this._scrollView.setScrollTop(guestHead.y - 180);
            if (info.uid == Api.playerVoApi.getPlayerID()) {
                this._intoSeatBtn.visible = false;
            }
        }
    };
    DinnerDetailView.prototype.getPlayerInfo = function (name, pic, uid, title) {
        var bgContainer = new BaseDisplayObjectContainer();
        var nameBg = BaseBitmap.create("public_numbg");
        nameBg.width = 160;
        bgContainer.addChild(nameBg);
        // if (uid == Api.playerVoApi.getPlayerID())
        // {
        // 	title = ""
        // }
        if (title == null) {
            title = "";
        }
        if (pic == "") {
            pic = 0;
        }
        // let playerHead = Api.playerVoApi.getPlayerCircleHead(Number(pic),title);
        var playerHead = Api.playerVoApi.getPlayerCircleHead(Number(pic), title);
        playerHead.x = nameBg.width / 2 - playerHead.width / 2;
        bgContainer.addChild(playerHead);
        nameBg.y = playerHead.height;
        var headArrow = BaseBitmap.create("dinner_head_arrow");
        headArrow.setPosition(playerHead.x + 45 - headArrow.width / 2, playerHead.height - 14);
        bgContainer.addChild(headArrow);
        var nameText = ComponentManager.getTextField(name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
        nameText.setPosition(nameBg.width / 2 - nameText.width / 2, nameBg.y + nameBg.height / 2 - nameText.height / 2);
        bgContainer.addChild(nameText);
        bgContainer.addTouchTap(this.clickHead, this, [uid]);
        return bgContainer;
    };
    DinnerDetailView.prototype.clickHead = function (event, uid) {
        this._clickUid = uid;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT, { ruid: uid });
    };
    DinnerDetailView.prototype.userShotCallback = function (event) {
        if (!Api.switchVoApi.checkOpenShenhe()) {
            var data = event.data.data.data;
            if (this._uid == this._clickUid) {
                data["isDinnerHost"] = true;
            }
            data["isFromDinner"] = true;
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
        }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
    };
    DinnerDetailView.prototype.shareCallback = function () {
        Api.dinnerVoApi.setShareTime(GameData.serverTime);
        this.tick();
    };
    DinnerDetailView.prototype.intoSeat = function () {
        if (this._uid == Api.playerVoApi.getPlayerID()) {
            //分享
            var lastShareTime = Api.dinnerVoApi.getShareTime();
            if (GameData.serverTime - lastShareTime >= GameData.sharechatcd) {
                ViewController.getInstance().openView(ViewConst.POPUP.DINNERSHAREPOPUPVIEW, { f: this.shareCallback, o: this, stype: 1, num: this.voApi.getNum() });
            }
            else {
                var timeStr = App.DateUtil.getFormatBySecond(GameData.sharechatcd - GameData.serverTime + lastShareTime, 8);
                App.CommonUtil.showTip(LanguageManager.getlocal("dinner_share_time2", [timeStr]));
            }
        }
        else {
            var num = this.voApi.getNum();
            var totalNum = Config.DinnerCfg.getFeastItemCfg(this.voApi.getDtype()).contain;
            if (num >= totalNum) {
                App.CommonUtil.showTip(LanguageManager.getlocal("dinnerSeatFull"));
                return;
            }
            var numJoin = Api.dinnerVoApi.getDayNum();
            var numJoinTotal = Config.DinnerCfg.getGoToFeastNum();
            if (numJoin >= numJoinTotal) {
                var itemId = Api.dinnerVoApi.getNeedItem();
                var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(itemId));
                if (hasNum > 0) {
                    var itemInfoVo = Api.itemVoApi.getItemInfoVoById(Number(itemId));
                    var tipMsg = LanguageManager.getlocal("dinnerTimesExtra", [itemInfoVo.name]);
                    ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, {
                        title: "itemUseConstPopupViewTitle",
                        msg: tipMsg,
                        icon: itemInfoVo.icon,
                        iconBg: itemInfoVo.iconBg, num: itemInfoVo.num,
                        confirmCallback: this.useItemExtra,
                        handler: this,
                        needCancel: true,
                        id: Number(itemId),
                        useNum: 1,
                    });
                }
                else {
                    App.CommonUtil.showTip(LanguageManager.getlocal("dinnerTimesFull"));
                }
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.DINNERTYPEPOPUPVIEW, { o: this, f: this.joinDinnerRequest });
        }
    };
    DinnerDetailView.prototype.useItemExtra = function () {
        NetManager.request(NetRequestConst.REQUEST_DINNER_USEITEM, {});
    };
    DinnerDetailView.prototype.useItemCallback = function (p) {
        if (p.data.ret == true) {
            App.CommonUtil.showTip(LanguageManager.getlocal("recoverLeftSuccess"));
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_DINNER);
            this.setBottomButton();
        }
    };
    DinnerDetailView.prototype.joinDinnerRequest = function (dtype) {
        this._joinedDtype = dtype;
        NetManager.request(NetRequestConst.REQUEST_DINNER_JOINDINNER, { "joinuid": this._uid, "dtype": dtype });
    };
    DinnerDetailView.prototype.getRewardCallback = function () {
        this.resetPlayerInfo();
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_DINNER);
    };
    DinnerDetailView.prototype.requiestCallback = function (p) {
        if (p.data.ret == true) {
            this.voApi.formatData(p.data.data.data.joindetail);
            if (!this) {
                return;
            }
            this.resetSeatText();
            this.resetScoreText();
            this._scrollList.refreshData(this.voApi.getJinfo());
            var totalNum = Config.DinnerCfg.getGoToFeastItemCfg(this._joinedDtype).getScore;
            var rewards = p.data.data.data.reward;
            ViewController.getInstance().openView(ViewConst.COMMON.DINNERREWARDVIEW, { o: this, f: this.getRewardCallback, reward: rewards, name: this.voApi.getName(),
                pic: this.voApi.getPic(), level: this.voApi.getLevel(), title: this.voApi.getTitle(), point: totalNum });
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("dinner_is_over"));
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_DINNER);
            this.hide();
        }
    };
    DinnerDetailView.prototype.receivePushData = function () {
        if (!this) {
            return;
        }
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_GETDINNERDETAIL), this.requiestCallback2, this);
        NetManager.request(NetRequestConst.REQUEST_DINNER_GETDINNERDETAIL, { "getuid": Api.playerVoApi.getPlayerID() });
    };
    DinnerDetailView.prototype.requiestCallback2 = function (p) {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_GETDINNERDETAIL), this.requiestCallback2, this);
        if (!this) {
            return;
        }
        if (p.data.ret == true) {
            if (this._uid == Api.playerVoApi.getPlayerID()) {
                Api.dinnerVoApi.formatData(p.data.data.data.dinnerdetail);
            }
            if (p.data.data.data.dinnerReport) {
                ViewController.getInstance().openView(ViewConst.BASE.DINNERFINISHVIEW, { "info": p.data.data.data.dinnerReport, "baodi": p.data.data.data.baodiNum });
                this.hide();
                NetManager.request(NetRequestConst.REQUEST_DINNER_CANVIEWDINNER, {});
            }
            else {
                if (this._needPay) {
                    PlatformManager.checkPay(this._paymentIds[this._needPay - 1]);
                    this._needPay = 0;
                }
            }
        }
    };
    DinnerDetailView.prototype.dispose = function () {
        TimerManager.remove(this.receivePushData, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_JOINDINNER), this.requiestCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_USEITEM), this.useItemCallback, this);
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        if (this._intoSeatBtn) {
            App.DisplayUtil.changeToNormal(this._intoSeatBtn);
        }
        this.voApi.dispose();
        this.voApi = null;
        this._seatText = null;
        this._scoreText = null;
        this._timeText = null;
        this._scroRect = null;
        this._uid = 0;
        this._scrollContiner = null;
        this._intoSeatBtn = null;
        this._headTab.length = 0;
        this._bgPreStr = null;
        this._joinedDtype = 0;
        this._scrollView = null;
        this._clickUid = 0;
        this._canShare = true;
        this._timestext = null;
        this._needPay = 0;
        this._paymentIds.length = 0;
        _super.prototype.dispose.call(this);
    };
    return DinnerDetailView;
}(CommonView));
__reflect(DinnerDetailView.prototype, "DinnerDetailView");
//# sourceMappingURL=DinnerDetailView.js.map