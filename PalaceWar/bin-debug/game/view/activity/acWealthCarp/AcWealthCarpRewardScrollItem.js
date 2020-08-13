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
 * 	彩蛋奖励item
 * author 张朝阳
 * date 2019/3/13
 * @class AcWealthCarpRewardScrollItem
 */
var AcWealthCarpRewardScrollItem = (function (_super) {
    __extends(AcWealthCarpRewardScrollItem, _super);
    function AcWealthCarpRewardScrollItem() {
        var _this = _super.call(this) || this;
        _this.code = null;
        _this.aid = null;
        _this.rkey = null;
        _this.rankList = null;
        _this._data = null;
        _this._isRequest = false;
        _this._isQualification = false;
        return _this;
    }
    AcWealthCarpRewardScrollItem.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPINFO, this.rankHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPLUCKYINFO, this.rewardsNameHandle, this);
        this.aid = itemParam.aid;
        this.code = itemParam.code;
        this._data = data;
        for (var key in itemParam.joiner) {
            if (key == String(index)) {
                this.rankList = itemParam.joiner[key];
                break;
            }
        }
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        this.width = 640;
        this.height = 310;
        if (Number(this.code) >= 5) {
            this.height = 335;
            var itembg_1 = BaseLoadBitmap.create("acwealthcarpview_itembg-" + this.code);
            itembg_1.width = 616;
            itembg_1.height = 332;
            itembg_1.setPosition(this.x + this.width / 2 - itembg_1.width / 2, 0);
            this.addChild(itembg_1);
            var titlebg = BaseLoadBitmap.create("acwealthcarpview_common_bluebg");
            titlebg.width = 600;
            titlebg.height = 35;
            titlebg.setPosition(itembg_1.x + itembg_1.width / 2 - titlebg.width / 2, 2);
            this.addChild(titlebg);
            var titleTF_1 = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpRewardViewCharge-" + this.code, [String(data.needGem)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            titleTF_1.setPosition(titlebg.x + titlebg.width / 2 - titleTF_1.width / 2, titlebg.y + titlebg.height / 2 - titleTF_1.height / 2);
            this.addChild(titleTF_1);
            var rewardVoList_1 = GameData.formatRewardItem(data.getReward1);
            var rewardScale_1 = 0.80;
            for (var i = 0; i < rewardVoList_1.length; i++) {
                var rewardDB = GameData.getItemIcon(rewardVoList_1[i], true, true);
                rewardDB.setScale(rewardScale_1);
                rewardDB.setPosition(itembg_1.x + (i % 3) * (rewardDB.width * rewardScale_1 + 10) + 287, itembg_1.y + Math.floor(i / 3) * (rewardDB.height * rewardScale_1 + 5) + 60);
                this.addChild(rewardDB);
            }
            var progress = ComponentManager.getProgressBar("progress7", "progress7_bg", 425);
            progress.setPosition(itembg_1.x + 15, itembg_1.y + itembg_1.height - progress.height / 2 - 46);
            this.addChild(progress);
            progress.setPercentage(vo.getChargeNum() / data.needGem, LanguageManager.getlocal("acWealthCarpViewRechargeValue-" + this.code, [String(vo.getChargeNum()), String(data.needGem)]), TextFieldConst.COLOR_LIGHT_YELLOW);
            if (vo.getChargeNum() >= data.needGem) {
                this._isQualification = true;
                if (vo.isReceive(data.id)) {
                    var receiveflagScale = 0.6;
                    var receiveflag = BaseBitmap.create("collectflag");
                    receiveflag.setScale(receiveflagScale);
                    receiveflag.setPosition(progress.x + progress.width + 25, progress.y + progress.height / 2 - receiveflag.height / 2 * receiveflagScale);
                    this.addChild(receiveflag);
                }
                else {
                    var receiveBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", function () {
                        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCARPREWARD, { activeId: vo.aidAndCode, rkey: Number(data.id) });
                    }, this);
                    receiveBtn.setPosition(progress.x + progress.width + 25, progress.y + progress.height / 2 - receiveBtn.height / 2);
                    this.addChild(receiveBtn);
                }
            }
            else {
                this._isQualification = false;
                var chargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "gotocharge", function () {
                    var v = Api.acVoApi.getActivityVoByAidAndCode(_this.aid, _this.code);
                    if (v.checkIsInEndShowTime() || (!v.isStart)) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                        return;
                    }
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                }, this);
                chargeBtn.setPosition(progress.x + progress.width + 25, progress.y + progress.height / 2 - chargeBtn.height / 2);
                this.addChild(chargeBtn);
            }
            var aureoleClip = ComponentManager.getCustomMovieClip("acwealthcarpeffect", 10, 70);
            var aureoleBM = BaseBitmap.create("acwealthcarpeffect1");
            aureoleClip.blendMode = egret.BlendMode.ADD;
            aureoleClip.anchorOffsetX = aureoleBM.width / 2;
            aureoleClip.anchorOffsetY = aureoleBM.height / 2;
            aureoleClip.setPosition(itembg_1.x + 130, itembg_1.y + 153);
            this.addChild(aureoleClip);
            aureoleClip.playWithTime(-1);
            var showItem = BaseLoadBitmap.create("acwealthcarpview_showitem_" + data.id + "-" + this.getUiCode());
            showItem.setPosition(itembg_1.x + 80, itembg_1.y + 90);
            if (this.code == "7" || this.code == "8" || this.code == "11" || this.code == "12") {
                showItem.setPosition(itembg_1.x + 90, itembg_1.y + 70);
            }
            this.addChild(showItem);
            var lottyStatus = BaseLoadBitmap.create("acwealthcarpview_lottystatus");
            lottyStatus.width = 167;
            lottyStatus.height = 55;
            var posY = showItem.y + 62 - lottyStatus.height / 2;
            if (this.code == "7" || this.code == "8" || this.code == "11" || this.code == "12") {
                posY += 20;
            }
            lottyStatus.setPosition(showItem.x + 53 - lottyStatus.width / 2 - 10, posY);
            this.addChild(lottyStatus);
            egret.Tween.get(lottyStatus, { loop: true }).to({ y: posY - 3 }, 1000).to({ y: posY }, 1000);
            //57
            if (vo.checkIsInEndShowTime()) {
                aureoleClip.setVisible(false);
                lottyStatus.setVisible(false);
            }
            else {
                if (vo.getChargeNum() >= data.needGem) {
                    aureoleClip.setVisible(true);
                    lottyStatus.setVisible(true);
                }
                else {
                    aureoleClip.setVisible(false);
                    lottyStatus.setVisible(false);
                }
            }
            var showItemTitle = BaseBitmap.create("acwealthcarpview_showitem_title_" + data.id + "-" + this.getUiCode());
            showItemTitle.setPosition(itembg_1.x + 130 - showItemTitle.width / 2, titlebg.y + titlebg.height + 5);
            this.addChild(showItemTitle);
            // let rankTxt = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpViewRankTxt-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            // rankTxt.setPosition(itembg.x + 130 - rankTxt.width / 2, itembg.y + 240 - rankTxt.height / 2);
            // this.addChild(rankTxt)
            // rankTxt.addTouchTap(() => {
            //     NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPINFO, { activeId: vo.aidAndCode, rKey: Number(data.id) });
            //     this._isRequest = true;
            // }, this, []);
            var openRewardBtn = ComponentManager.getButton("acwealthcarpview_openrewardbtn-" + this.getUiCode(), "", function () {
                var v = Api.acVoApi.getActivityVoByAidAndCode(_this.aid, _this.code);
                _this._isRequest = true;
                if (v.checkIsInEndShowTime()) {
                    NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPLUCKYINFO, { activeId: vo.aidAndCode });
                    return;
                }
                // NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPLUCKYINFO, { activeId: vo.aidAndCode });
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPINFO, { activeId: vo.aidAndCode, rKey: Number(data.id) });
            }, this);
            openRewardBtn.setPosition(itembg_1.x + 10, progress.y - 5 - openRewardBtn.height);
            this.addChild(openRewardBtn);
            return;
        }
        var itembg = BaseBitmap.create("public_9_bg14");
        itembg.width = 606;
        itembg.height = 310;
        itembg.setPosition(this.x + this.width / 2 - itembg.width / 2, 0);
        this.addChild(itembg);
        var titleBg = BaseLoadBitmap.create("acwealthcarpview_common_txtbg");
        titleBg.width = 358;
        titleBg.height = 35;
        titleBg.setPosition(itembg.x + 242, itembg.y + 5);
        this.addChild(titleBg);
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpViewItemEggType" + data.id + "-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        var itemTopLine = BaseBitmap.create("acwealthcarpview_common_line");
        itemTopLine.width += titleTF.width;
        itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
        this.addChild(itemTopLine);
        var eggbg = BaseLoadBitmap.create("acwealthcarpview_eggbg");
        eggbg.width = 235;
        eggbg.height = 298;
        eggbg.setPosition(itembg.x + 10, itembg.y + itembg.height / 2 - eggbg.height / 2);
        this.addChild(eggbg);
        var eggtitleStr = "acwealthcarpview_easteregg_" + data.id + "_title";
        if (!this.isCode1Ande2()) {
            eggtitleStr = "acwealthcarpview_balloon_title_" + data.id + "-" + this.getUiCode();
        }
        var eggtitle = BaseBitmap.create(eggtitleStr);
        eggtitle.setPosition(eggbg.x + eggbg.width / 2 - eggtitle.width / 2, eggbg.y + 20 - eggtitle.height / 2);
        this.addChild(eggtitle);
        if (vo.checkIsInEndShowTime()) {
            //擂奖得主
            var eggRankTxtStr = LanguageManager.getlocal("acWealthCarpViewRewardsNobady-" + this.code);
            if (data.name) {
                eggRankTxtStr = LanguageManager.getlocal("acWealthCarpViewRewardsName-" + this.code, [data.name]);
            }
            var eggRankTxt = ComponentManager.getTextField(eggRankTxtStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            eggRankTxt.setPosition(eggbg.x + eggbg.width / 2 - eggRankTxt.width / 2, eggbg.y + eggbg.height - 24 - eggRankTxt.height / 2);
            this.addChild(eggRankTxt);
            eggRankTxt.addTouchTap(function () {
                // ViewController.getInstance().openView(ViewConst.POPUP.ACWEALTHCARPRANKPOPUPVIEW, { aid: this.aid, code: this.code, rewards: data.getReward2, rankList: this.rankList });
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPINFO, { activeId: vo.aidAndCode, rKey: Number(data.id) });
                _this._isRequest = true;
            }, this, []);
            if (this.isCode1Ande2()) {
                var eggcushion = BaseLoadBitmap.create("acwealthcarpview_buttomcushion");
                eggcushion.width = 203;
                eggcushion.height = 111;
                eggcushion.setPosition(eggbg.x + 23, eggbg.y + eggbg.height - eggcushion.height - 48);
                this.addChild(eggcushion);
                var eggbuttom = BaseLoadBitmap.create("acwealthcarpview_easteregg_" + data.id + "_buttom");
                eggbuttom.width = 96;
                eggbuttom.height = 92;
                eggbuttom.setPosition(eggbg.x + eggbg.width / 2 - eggbuttom.width / 2, eggbg.y + eggbg.height - eggbuttom.height - 90);
                this.addChild(eggbuttom);
                var topcushion = BaseLoadBitmap.create("acwealthcarpview_topcushion");
                topcushion.width = 203;
                topcushion.height = 111;
                topcushion.setPosition(eggcushion.x, eggcushion.y + eggcushion.height - topcushion.height);
                this.addChild(topcushion);
            }
            else {
                var balloon = BaseLoadBitmap.create("acwealthcarpview_balloon_" + data.id + "-" + this.getUiCode());
                balloon.width = 119;
                balloon.height = 185;
                balloon.setPosition(eggbg.x + eggbg.width / 2 - balloon.width / 2, eggbg.y + eggbg.height / 2 - balloon.height / 2);
                this.addChild(balloon);
            }
        }
        else {
            //rank 入口
            var eggRankTxt = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpViewRankTxt-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            eggRankTxt.setPosition(eggbg.x + eggbg.width / 2 - eggRankTxt.width / 2, eggbg.y + eggbg.height - 24 - eggRankTxt.height / 2);
            this.addChild(eggRankTxt);
            eggRankTxt.addTouchTap(function () {
                // ViewController.getInstance().openView(ViewConst.POPUP.ACWEALTHCARPRANKPOPUPVIEW, { aid: this.aid, code: this.code, rewards: data.getReward2, rankList: this.rankList });
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPINFO, { activeId: vo.aidAndCode, rKey: Number(data.id) });
                _this._isRequest = true;
            }, this, []);
            if (vo.getChargeNum() >= data.needGem) {
                if (this.isCode1Ande2()) {
                    var mask1 = BaseLoadBitmap.create("acwealthcarpview_effect_mask1");
                    mask1.width = 235;
                    mask1.height = 298;
                    mask1.setPosition(eggbg.x + eggbg.width / 2 - mask1.width / 2, eggbg.y + eggbg.height / 2 - mask1.height / 2);
                    this.addChild(mask1);
                    mask1.blendMode = egret.BlendMode.ADD;
                    mask1.alpha = 0;
                    egret.Tween.get(mask1, { loop: true }).to({ alpha: 1 }, 1250).to({ alpha: 0 }, 1250);
                    var aureoleClip = ComponentManager.getCustomMovieClip("acwealthcarpeffect", 10, 70);
                    var aureoleBM = BaseBitmap.create("acwealthcarpeffect1");
                    aureoleClip.blendMode = egret.BlendMode.ADD;
                    aureoleClip.anchorOffsetX = aureoleBM.width / 2;
                    aureoleClip.anchorOffsetY = aureoleBM.height / 2;
                    aureoleClip.setPosition(eggbg.x + eggbg.width / 2, eggbg.y + eggbg.height - 150);
                    this.addChild(aureoleClip);
                    aureoleClip.playWithTime(-1);
                    var eggcushion = BaseLoadBitmap.create("acwealthcarpview_buttomcushion");
                    eggcushion.width = 203;
                    eggcushion.height = 111;
                    eggcushion.setPosition(eggbg.x + 23, eggbg.y + eggbg.height - eggcushion.height - 48);
                    this.addChild(eggcushion);
                    var eggbuttom = BaseLoadBitmap.create("acwealthcarpview_easteregg_" + data.id + "_buttom");
                    eggbuttom.width = 96;
                    eggbuttom.height = 92;
                    eggbuttom.setPosition(eggbg.x + eggbg.width / 2 - eggbuttom.width / 2, eggbg.y + eggbg.height - eggbuttom.height - 100);
                    this.addChild(eggbuttom);
                    var eggtop = BaseLoadBitmap.create("acwealthcarpview_easteregg_" + data.id + "_top");
                    eggtop.width = 96;
                    eggtop.height = 66;
                    eggtop.setPosition(eggbuttom.x, eggbuttom.y - 24);
                    this.addChild(eggtop);
                    var eggEffect = BaseLoadBitmap.create("acwealthcarpview_effect_egg");
                    eggEffect.width = 136;
                    eggEffect.height = 158;
                    eggEffect.setPosition(eggbuttom.x + eggbuttom.width / 2 - eggEffect.width / 2, eggbg.y + eggbg.height - eggEffect.height - 77);
                    this.addChild(eggEffect);
                    eggEffect.blendMode = egret.BlendMode.ADD;
                    egret.Tween.get(eggEffect, { loop: true }).to({ alpha: 0.2 }, 750).to({ alpha: 1 }, 750);
                    var mask2 = BaseLoadBitmap.create("acwealthcarpview_effect_mask2");
                    mask2.width = 235;
                    mask2.height = 298;
                    mask2.setPosition(eggbg.x + eggbg.width / 2 - mask2.width / 2, eggbg.y + eggbg.height / 2 - mask2.height / 2);
                    this.addChild(mask2);
                    mask2.blendMode = egret.BlendMode.ADD;
                    mask2.alpha = 1;
                    egret.Tween.get(mask2, { loop: true }).to({ alpha: 0 }, 1250).to({ alpha: 1 }, 1250);
                    var lottyStatus = BaseLoadBitmap.create("acwealthcarpview_lottystatus");
                    lottyStatus.width = 167;
                    lottyStatus.height = 55;
                    var posY = eggEffect.y + eggEffect.height / 2 - lottyStatus.height / 2;
                    lottyStatus.setPosition(eggEffect.x + eggEffect.width / 2 - lottyStatus.width / 2 - 5, posY);
                    this.addChild(lottyStatus);
                    egret.Tween.get(lottyStatus, { loop: true }).to({ y: posY - 3 }, 1000).to({ y: posY }, 1000);
                    var topcushion = BaseLoadBitmap.create("acwealthcarpview_topcushion");
                    topcushion.width = 203;
                    topcushion.height = 111;
                    topcushion.setPosition(eggcushion.x, eggcushion.y + eggcushion.height - topcushion.height);
                    this.addChild(topcushion);
                }
                else {
                    var mask1 = BaseLoadBitmap.create("acwealthcarpview_effect_mask1");
                    mask1.width = 235;
                    mask1.height = 298;
                    mask1.setPosition(eggbg.x + eggbg.width / 2 - mask1.width / 2, eggbg.y + eggbg.height / 2 - mask1.height / 2);
                    this.addChild(mask1);
                    mask1.blendMode = egret.BlendMode.ADD;
                    mask1.alpha = 0;
                    egret.Tween.get(mask1, { loop: true }).to({ alpha: 1 }, 1250).to({ alpha: 0 }, 1250);
                    var aureoleClip = ComponentManager.getCustomMovieClip("acwealthcarpeffect", 10, 70);
                    var aureoleBM = BaseBitmap.create("acwealthcarpeffect1");
                    aureoleClip.blendMode = egret.BlendMode.ADD;
                    aureoleClip.anchorOffsetX = aureoleBM.width / 2;
                    aureoleClip.anchorOffsetY = aureoleBM.height / 2;
                    aureoleClip.setPosition(eggbg.x + eggbg.width / 2, eggbg.y + eggbg.height - 150);
                    this.addChild(aureoleClip);
                    aureoleClip.playWithTime(-1);
                    var mask2 = BaseLoadBitmap.create("acwealthcarpview_effect_mask2");
                    mask2.width = 235;
                    mask2.height = 298;
                    mask2.setPosition(eggbg.x + eggbg.width / 2 - mask2.width / 2, eggbg.y + eggbg.height / 2 - mask2.height / 2);
                    this.addChild(mask2);
                    mask2.blendMode = egret.BlendMode.ADD;
                    mask2.alpha = 1;
                    egret.Tween.get(mask2, { loop: true }).to({ alpha: 0 }, 1250).to({ alpha: 1 }, 1250);
                    var balloon = BaseLoadBitmap.create("acwealthcarpview_balloon_" + data.id + "-" + this.getUiCode());
                    balloon.width = 119;
                    balloon.height = 185;
                    balloon.setPosition(eggbg.x + eggbg.width / 2 - balloon.width / 2, eggbg.y + eggbg.height / 2 - balloon.height / 2);
                    this.addChild(balloon);
                    var lottyStatus = BaseLoadBitmap.create("acwealthcarpview_lottystatus");
                    lottyStatus.width = 167;
                    lottyStatus.height = 55;
                    var posY = balloon.y + balloon.height / 2 - lottyStatus.height / 2 - 10;
                    lottyStatus.setPosition(eggbg.x + eggbg.width / 2 - lottyStatus.width / 2 - 5, posY);
                    this.addChild(lottyStatus);
                    egret.Tween.get(lottyStatus, { loop: true }).to({ y: posY - 3 }, 1000).to({ y: posY }, 1000);
                }
            }
            else {
                if (this.isCode1Ande2()) {
                    var eggcushion = BaseLoadBitmap.create("acwealthcarpview_buttomcushion");
                    eggcushion.width = 203;
                    eggcushion.height = 111;
                    eggcushion.setPosition(eggbg.x + 23, eggbg.y + eggbg.height - eggcushion.height - 48);
                    this.addChild(eggcushion);
                    var eggbuttom = BaseLoadBitmap.create("acwealthcarpview_easteregg_" + data.id + "_buttom");
                    eggbuttom.width = 96;
                    eggbuttom.height = 92;
                    eggbuttom.setPosition(eggbg.x + eggbg.width / 2 - eggbuttom.width / 2, eggbg.y + eggbg.height - eggbuttom.height - 90);
                    this.addChild(eggbuttom);
                    var eggtop = BaseLoadBitmap.create("acwealthcarpview_easteregg_" + data.id + "_top");
                    eggtop.width = 96;
                    eggtop.height = 66;
                    eggtop.setPosition(eggbuttom.x, eggbuttom.y - 24);
                    this.addChild(eggtop);
                    var topcushion = BaseLoadBitmap.create("acwealthcarpview_topcushion");
                    topcushion.width = 203;
                    topcushion.height = 111;
                    topcushion.setPosition(eggcushion.x, eggcushion.y + eggcushion.height - topcushion.height);
                    this.addChild(topcushion);
                }
                else {
                    var balloon = BaseLoadBitmap.create("acwealthcarpview_balloon_" + data.id + "-" + this.getUiCode());
                    balloon.width = 119;
                    balloon.height = 185;
                    balloon.setPosition(eggbg.x + eggbg.width / 2 - balloon.width / 2, eggbg.y + eggbg.height / 2 - balloon.height / 2);
                    this.addChild(balloon);
                }
            }
        }
        var rewardbg = BaseBitmap.create("public_9_managebg");
        rewardbg.width = 340;
        rewardbg.height = 195;
        rewardbg.setPosition(eggbg.x + eggbg.width + 3, titleBg.y + titleBg.height + 5);
        this.addChild(rewardbg);
        var rewardVoList = GameData.formatRewardItem(data.getReward1);
        var rewardScale = 0.85;
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
            rewardDB.setScale(rewardScale);
            rewardDB.setPosition(rewardbg.x + (i % 3) * (rewardDB.width * rewardScale + 14) + 20, rewardbg.y + Math.floor(i / 3) * (rewardDB.height * rewardScale + 5) + 5);
            this.addChild(rewardDB);
        }
        if (vo.getChargeNum() >= data.needGem) {
            if (vo.isReceive(data.id)) {
                var receiveflagScale = 0.6;
                var receiveflag = BaseBitmap.create("collectflag");
                receiveflag.setScale(receiveflagScale);
                receiveflag.setPosition(rewardbg.x + rewardbg.width / 2 - receiveflag.width / 2 * receiveflagScale, rewardbg.y + rewardbg.height + 30 - receiveflag.height / 2 * receiveflagScale);
                this.addChild(receiveflag);
            }
            else {
                var receiveBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", function () {
                    NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCARPREWARD, { activeId: vo.aidAndCode, rkey: Number(data.id) });
                }, this);
                receiveBtn.setPosition(rewardbg.x + rewardbg.width / 2 - receiveBtn.width / 2, rewardbg.y + rewardbg.height + 30 - receiveBtn.height / 2);
                this.addChild(receiveBtn);
            }
        }
        else {
            var progress = ComponentManager.getProgressBar("progress7", "progress7_bg", 335);
            progress.setPosition(rewardbg.x + rewardbg.width / 2 - progress.width / 2, rewardbg.y + rewardbg.height + 30 - progress.height / 2);
            this.addChild(progress);
            progress.setPercentage(vo.getChargeNum() / data.needGem, LanguageManager.getlocal("acWealthCarpViewRechargeValue-" + this.code, [String(vo.getChargeNum()), String(data.needGem)]), TextFieldConst.COLOR_LIGHT_YELLOW);
        }
        var frame = BaseBitmap.create("acwealthcarpview_common_frame");
        frame.width = 352;
        frame.height = 298;
        frame.setPosition(this.x + this.width - frame.width - 5 - 23, this.y + this.height / 2 - frame.height / 2);
        this.addChild(frame);
        var addBM = BaseBitmap.create("acwealthcarpview_common_add");
        addBM.setPosition(frame.x - addBM.width / 2, frame.y + frame.height / 2 - addBM.height / 2);
        this.addChild(addBM);
    };
    AcWealthCarpRewardScrollItem.prototype.rankHandle = function (event) {
        if (event.data.ret && this._isRequest) {
            if (Number(this.code) >= 5) {
                this._isRequest = false;
                ViewController.getInstance().openView(ViewConst.POPUP.ACWEALTHCARPLOTTERYREWARDSPOPUPVIEW, { aid: this.aid, code: this.code, rewards: this._data.getReward2, luckyinfo: event.data.data.data.luckyinfo, isQualification: this._isQualification, data: this._data });
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACWEALTHCARPRANKPOPUPVIEW, { aid: this.aid, code: this.code, rewards: this._data.getReward2, luckyinfo: event.data.data.data.luckyinfo });
            this._isRequest = false;
        }
    };
    AcWealthCarpRewardScrollItem.prototype.rewardsNameHandle = function (event) {
        if (event.data.ret && this._isRequest) {
            var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPINFO, { activeId: vo.aidAndCode, rKey: Number(this._data.id) });
        }
    };
    AcWealthCarpRewardScrollItem.prototype.isCode1Ande2 = function () {
        if (this.code == "1" || this.code == "2") {
            return true;
        }
        return false;
    };
    AcWealthCarpRewardScrollItem.prototype.getUiCode = function () {
        if (this.code == "4") {
            return "3";
        }
        return this.code;
    };
    AcWealthCarpRewardScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPINFO, this.rankHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPLUCKYINFO, this.rewardsNameHandle, this);
        this.aid = null;
        this.code = null;
        this.rkey = null;
        this.rankList = null;
        this._data = null;
        this._isRequest = false;
        this._isQualification = false;
        _super.prototype.dispose.call(this);
    };
    return AcWealthCarpRewardScrollItem;
}(ScrollListItem));
__reflect(AcWealthCarpRewardScrollItem.prototype, "AcWealthCarpRewardScrollItem");
//# sourceMappingURL=AcWealthCarpRewardScrollItem.js.map