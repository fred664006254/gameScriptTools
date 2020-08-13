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
 * 	七日好礼item
 * author 张朝阳
 * date 2019/3/19
 * @class SevenDaysSignUpScrollItem
 */
var SevenDaysSignUpLoginScrollItem = (function (_super) {
    __extends(SevenDaysSignUpLoginScrollItem, _super);
    function SevenDaysSignUpLoginScrollItem() {
        var _this = _super.call(this) || this;
        _this._receiveBtn = null;
        _this._curBtnCdSecond = 0;
        _this._cdTxt = null;
        return _this;
    }
    SevenDaysSignUpLoginScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    SevenDaysSignUpLoginScrollItem.prototype.initItem = function (index, data, itemParam) {
        var isEnSp = Api.sevenDaysSignupLoginVoApi.isEnSp();
        this.width = 610;
        this.height = 190;
        var isloginTask = false;
        var cfg = itemParam.signUpItemCfg;
        var isspecial = false;
        if (PlatformManager.checkIsRuSp()) {
            if (cfg.id == "1") {
                isloginTask = index < 2;
                isspecial = index == 0;
            }
            else {
                if (index == 0) {
                    isloginTask = true;
                }
            }
        }
        else if (isEnSp) {
            if (cfg.id == "1") {
                isloginTask = index < 2;
                isspecial = index == 0;
            }
            else {
                if (index == 0) {
                    isloginTask = true;
                }
            }
        }
        else {
            if (index == 0) {
                isloginTask = true;
            }
        }
        var bgstr = isEnSp ? "public_popupscrollitembg" : "public_9_bg14";
        var itembg = BaseBitmap.create(bgstr);
        itembg.width = this.width;
        itembg.height = this.height;
        itembg.setPosition(this.x + this.width / 2 - itembg.width / 2, 0);
        this.addChild(itembg);
        var titlebgStr = isEnSp ? "shopview_itemtitle" : "activity_charge_red";
        var titleBg = BaseBitmap.create(titlebgStr);
        titleBg.setPosition(itembg.x, itembg.y + 5);
        this.addChild(titleBg);
        var rewardbg = null;
        if (isEnSp) {
            titleBg.width = 370;
            rewardbg = BaseBitmap.create("public_scrolllistbg");
            this.addChild(rewardbg);
        }
        var titleTxtStr = isspecial ? LanguageManager.getlocal("sevenDaysSignUpViewTip2") : (isloginTask ? LanguageManager.getlocal("sevenDaysSignUpViewLogin" + cfg.id) : LanguageManager.getlocal("sevenDaysSignUpViewVipTitle", [cfg.needVip]));
        var titleTxt = ComponentManager.getTextField(titleTxtStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt.setPosition(titleBg.x + 20, titleBg.y + titleBg.height / 2 - titleTxt.height / 2);
        this.addChild(titleTxt);
        var rewards = isspecial ? cfg.specialReward : (isloginTask ? cfg.getReward : cfg.vipReward);
        var rewardsVoList = GameData.formatRewardItem(rewards);
        for (var i = 0; i < rewardsVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardsVoList[i], true, true);
            rewardDB.setPosition(itembg.x + i * (rewardDB.width + 5) + 20, titleBg.y + titleBg.height + 5);
            if (isEnSp) {
                rewardDB.setPosition(rewardDB.x + 10, rewardDB.y + 13);
                if (i == 0) {
                    rewardbg.x = rewardDB.x - 10;
                    rewardbg.y = rewardDB.y - 10;
                    rewardbg.height = rewardDB.y + rewardDB.height + 10 - rewardbg.y;
                }
                if (i == rewardsVoList.length - 1) {
                    rewardbg.width = rewardDB.x + rewardDB.width + 10 - rewardbg.x;
                }
            }
            this.addChild(rewardDB);
        }
        if (Number(cfg.id) <= Api.sevenDaysSignupLoginVoApi.nowDay()) {
            if (isloginTask) {
                if ((isspecial && Api.sevenDaysSignupLoginVoApi.checkSpecialReward()) || (!isspecial && Api.sevenDaysSignupLoginVoApi.checkLoginReward(Number(cfg.id)))) {
                    var receiveBMScale = 0.69;
                    var receiveBM = BaseBitmap.create("collectflag");
                    receiveBM.setScale(receiveBMScale);
                    receiveBM.setPosition(itembg.x + itembg.width - receiveBM.width * receiveBMScale - 30, itembg.y + itembg.height - receiveBM.height * receiveBMScale - 30);
                    this.addChild(receiveBM);
                }
                else {
                    var receiveBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", function () {
                        if (Api.sevenDaysSignupLoginVoApi.checkTimeEnd()) {
                            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                            return;
                        }
                        if (isspecial && !Api.sevenDaysSignupLoginVoApi.canGetRewardRu() && PlatformManager.checkIsRuSp()) {
                            App.CommonUtil.showTip(LanguageManager.getlocal("sevenDaysSignUpViewTip1", [String(Config.SevendayssignupCfg.firstDayNeedTime / 3600)]));
                            return;
                        }
                        if (isspecial && !Api.sevenDaysSignupLoginVoApi.canGetRewardEn() && isEnSp) {
                            App.CommonUtil.showTip(LanguageManager.getlocal("sevenDaysSignUpViewTip1_en", [String(Config.SevendayssignupCfg.firstDayNeedTime / 3600)]));
                            return;
                        }
                        if (isspecial) {
                            NetManager.request(NetRequestConst.REQUEST_SEVENDAYSIGNUP_GEREWARD, {});
                        }
                        else {
                            NetManager.request(NetRequestConst.REQUEST_SEVENDAYSIGN_GETSEVENDAYSIGNREWARD, { "rKey": Number(cfg.id) });
                        }
                    }, this);
                    this._receiveBtn = receiveBtn;
                    receiveBtn.setPosition(itembg.x + itembg.width - receiveBtn.width - 30, itembg.y + itembg.height - receiveBtn.height - 30);
                    this.addChild(receiveBtn);
                    if (isspecial && !Api.sevenDaysSignupLoginVoApi.canGetRewardRu()) {
                        var regdt = Api.gameinfoVoApi.getRegdt();
                        receiveBtn.setBtnBitMap(ButtonConst.BTN_NORMAL_RED);
                        this._curBtnCdSecond = regdt + Config.SevendayssignupCfg.firstDayNeedTime - GameData.serverTime;
                        var text = ComponentManager.getTextField(App.DateUtil.getFormatBySecond(this._curBtnCdSecond, 3), 20, TextFieldConst.COLOR_BLACK);
                        //启动定时器
                        this._cdTxt = text;
                        this.addChild(text);
                        text.setPosition(receiveBtn.x + receiveBtn.width / 2 - text.width / 2, receiveBtn.y - text.height - 5);
                        TickManager.addTick(this.tick, this);
                    }
                    else if (isspecial && !Api.sevenDaysSignupLoginVoApi.canGetRewardEn()) {
                        var regdt = Api.gameinfoVoApi.getRegdt();
                        receiveBtn.setBtnBitMap(ButtonConst.BTN_NORMAL_RED);
                        this._curBtnCdSecond = regdt + Config.SevendayssignupCfg.firstDayNeedTime - GameData.serverTime;
                        var text = ComponentManager.getTextField(App.DateUtil.getFormatBySecond(this._curBtnCdSecond, 3), 20, TextFieldConst.COLOR_BLACK);
                        //启动定时器
                        this._cdTxt = text;
                        this.addChild(text);
                        text.setPosition(receiveBtn.x + receiveBtn.width / 2 - text.width / 2, receiveBtn.y - text.height - 5);
                        TickManager.addTick(this.tick, this);
                    }
                    else {
                        var dayTxt = ComponentManager.getTextField(LanguageManager.getlocal("sevenDaysSignUpViewValueTip1", [String(Api.sevenDaysSignupLoginVoApi.nowDay()), cfg.id]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
                        dayTxt.setPosition(receiveBtn.x + receiveBtn.width / 2 - dayTxt.width / 2, receiveBtn.y - dayTxt.height - 5);
                        this.addChild(dayTxt);
                    }
                }
            }
            else {
                if (Api.sevenDaysSignupLoginVoApi.checkVIPReward(Number(cfg.id))) {
                    var receiveBMScale = 0.69; //0.67---0.69
                    var receiveBM = BaseBitmap.create("collectflag");
                    receiveBM.setScale(receiveBMScale);
                    receiveBM.setPosition(itembg.x + itembg.width - receiveBM.width * receiveBMScale - 30, itembg.y + itembg.height - receiveBM.height * receiveBMScale - 30);
                    this.addChild(receiveBM);
                }
                else {
                    var rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "sevenDaysSignUpViewRechargeBtn", function () {
                        if (Api.sevenDaysSignupLoginVoApi.checkTimeEnd()) {
                            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                            return;
                        }
                        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                    }, this);
                    rechargeBtn.setPosition(itembg.x + itembg.width - rechargeBtn.width - 30, itembg.y + itembg.height - rechargeBtn.height - 30);
                    this.addChild(rechargeBtn);
                    var receiveBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", function () {
                        if (Api.sevenDaysSignupLoginVoApi.checkTimeEnd()) {
                            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                            return;
                        }
                        NetManager.request(NetRequestConst.REQUEST_SEVENDAYSIGN_GETSEVENDAYSIGNREWARD, { "rKey": Number(cfg.id), "isVip": 1 });
                    }, this);
                    receiveBtn.setPosition(itembg.x + itembg.width - receiveBtn.width - 30, itembg.y + itembg.height - receiveBtn.height - 30);
                    this.addChild(receiveBtn);
                    var vipLvTxt = ComponentManager.getTextField(LanguageManager.getlocal("sevenDaysSignUpViewVipLv", [String(Api.playerVoApi.getPlayerVipLevel())]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
                    vipLvTxt.setPosition(rechargeBtn.x + rechargeBtn.width / 2 - vipLvTxt.width / 2, rechargeBtn.y - vipLvTxt.height - 5);
                    this.addChild(vipLvTxt);
                    if (Api.playerVoApi.getPlayerVipLevel() < Number(cfg.needVip)) {
                        vipLvTxt.setColor(TextFieldConst.COLOR_WARN_RED);
                        rechargeBtn.setVisible(true);
                        receiveBtn.setVisible(false);
                    }
                    else {
                        vipLvTxt.setColor(TextFieldConst.COLOR_WARN_GREEN2);
                        rechargeBtn.setVisible(false);
                        receiveBtn.setVisible(true);
                    }
                }
            }
        }
        else {
            var unBegin = BaseBitmap.create("sevendayssignupview_common_unbegin");
            unBegin.setPosition(itembg.x + itembg.width - unBegin.width - 30, itembg.y + itembg.height - unBegin.height - 30);
            this.addChild(unBegin);
        }
    };
    SevenDaysSignUpLoginScrollItem.prototype.tick = function () {
        var regdt = Api.gameinfoVoApi.getRegdt();
        var text = App.DateUtil.getFormatBySecond(regdt + Config.SevendayssignupCfg.firstDayNeedTime - GameData.serverTime, 3);
        if (this._curBtnCdSecond > 0) {
            this._curBtnCdSecond--;
            var text_1 = App.DateUtil.getFormatBySecond(this._curBtnCdSecond, 3);
            this._cdTxt.text = text_1;
        }
        else {
            //倒计时结束
            this._receiveBtn.setBtnBitMap(ButtonConst.BTN_NORMAL_YELLOW);
            this._cdTxt.text = LanguageManager.getlocal("sevenDaysSignUpViewValueTip1", [String(Api.sevenDaysSignupLoginVoApi.nowDay()), '1']);
            this._cdTxt.setPosition(this._receiveBtn.x + this._receiveBtn.width / 2 - this._cdTxt.width / 2, this._receiveBtn.y - this._cdTxt.height - 5);
            TickManager.removeTick(this.tick, this);
        }
    };
    SevenDaysSignUpLoginScrollItem.prototype.dispose = function () {
        this._receiveBtn = null;
        this._cdTxt = null;
        this._curBtnCdSecond = 0;
        TickManager.removeTick(this.tick, this);
        _super.prototype.dispose.call(this);
    };
    return SevenDaysSignUpLoginScrollItem;
}(ScrollListItem));
__reflect(SevenDaysSignUpLoginScrollItem.prototype, "SevenDaysSignUpLoginScrollItem");
//# sourceMappingURL=SevenDaysSignUpLoginScrollItem.js.map