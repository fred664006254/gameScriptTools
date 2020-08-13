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
  * 马超活动Tab1
  * author 张朝阳
  * date 2019/1/14
  * @class AcMaChaoViewTab1
  */
var AcMaChaoViewTab1 = (function (_super) {
    __extends(AcMaChaoViewTab1, _super);
    function AcMaChaoViewTab1() {
        var _this = _super.call(this) || this;
        _this._buttomBg = null;
        _this._oneNeedNumTF = null;
        _this._isPlayAni = false;
        /**是否十连抽 */
        _this._isTen = false;
        _this._isShake = false;
        _this._enemyList = [];
        /**士兵1 */
        _this._assaultList1 = [];
        /**士兵2 */
        _this._assaultList2 = [];
        /**士兵1 */
        _this._assaultList3 = [];
        _this.rewards = null;
        _this.otherRewards = null;
        _this._npcBM = null;
        _this._enemyContainer = null;
        _this._npcClip1 = null;
        _this._npcClip2 = null;
        _this._timeTF = null;
        _this._timeBg = null;
        _this._textbg = null;
        _this._textBM = null;
        _this._killText = null;
        _this._enemyPosCfg = [
            { x: 404, y: 509, width: 126, height: 97 },
            { x: 297, y: 540, width: 126, height: 97 },
            { x: 170, y: 578, width: 144, height: 79 },
            { x: 512, y: 553, width: 128, height: 78 },
            { x: 413, y: 604, width: 123, height: 72 },
            { x: 297, y: 641, width: 143, height: 76 },
        ];
        /**特效配置1 */
        _this._assaultCfg1 = [
            { x: -217, y: 313, alpha: 0, scale: 1 },
            { x: -137, y: 295, alpha: 0, scale: 1 },
            { x: -39, y: 294, alpha: 0, scale: 1 },
            { x: 11, y: 246, alpha: 0, scale: 1 },
            { x: 103, y: 238, alpha: 0, scale: 1 },
        ];
        /**特效配置2 */
        _this._assaultCfg2 = [
            { x: -180, y: 345, alpha: 1, scale: 0.985 },
            { x: -101, y: 327, alpha: 1, scale: 0.985 },
            { x: -3, y: 326, alpha: 1, scale: 0.985 },
            { x: 47, y: 278, alpha: 1, scale: 0.985 },
            { x: 139, y: 270, alpha: 1, scale: 0.985 },
        ];
        /**特效配置3 */
        _this._assaultCfg3 = [
            { x: 184, y: 605, alpha: 1, scale: 0.87 },
            { x: 264, y: 587, alpha: 1, scale: 0.87 },
            { x: 362, y: 586, alpha: 1, scale: 0.87 },
            { x: 412, y: 538, alpha: 1, scale: 0.87 },
            { x: 504, y: 530, alpha: 1, scale: 0.87 },
        ];
        /**特效配置4 */
        _this._assaultCfg4 = [
            { x: 298, y: 689, alpha: 1, scale: 0.84 },
            { x: 378, y: 671, alpha: 1, scale: 0.84 },
            { x: 476, y: 670, alpha: 1, scale: 0.84 },
            { x: 526, y: 622, alpha: 1, scale: 0.84 },
            { x: 618, y: 614, alpha: 1, scale: 0.84 },
        ];
        /**特效配置5 */
        _this._assaultCfg5 = [
            { x: 413, y: 762, alpha: 0, scale: 0.8 },
            { x: 493, y: 754, alpha: 0, scale: 0.8 },
            { x: 591, y: 753, alpha: 0, scale: 0.8 },
            { x: 641, y: 705, alpha: 0, scale: 0.8 },
            { x: 733, y: 733, alpha: 0, scale: 0.8 },
        ];
        egret.callLater(_this.initView, _this);
        return _this;
    }
    AcMaChaoViewTab1.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_MACHAOLOTTERY, this.lotteryHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_MACHAOGETRANK, this.rankClickHandler, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_MACHAOTAbANI, this.playEnemyShakeAni, this);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var timebg = BaseBitmap.create("public_9_bg8");
        timebg.width = GameConfig.stageWidth;
        this.addChild(timebg);
        var timeTF = ComponentManager.getTextField(LanguageManager.getlocal("acMaChaoViewTime-" + this.code, [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeTF.setPosition(GameConfig.stageWidth / 2 - timeTF.width / 2, timebg.y + timebg.height / 2 - timeTF.height / 2);
        this.addChild(timeTF);
        var rewardBtn = ComponentManager.getButton("acmachaoviewrewardbtn-" + this.getUiCode(), null, function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACMACHAOREWARDPOOLPOPUPVIEW, { code: _this.code, aid: _this.aid });
        }, this);
        rewardBtn.setPosition(timebg.x + 10, timebg.y + timebg.height + 15);
        this.addChild(rewardBtn);
        var rankBtn = ComponentManager.getButton("dragonboatrank", null, function () {
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_MACHAOGETRANK, { "activeId": vo.aidAndCode });
        }, this);
        rankBtn.setPosition(rewardBtn.x + rewardBtn.width / 2 - rankBtn.width / 2, rewardBtn.y + rewardBtn.height + 20);
        this.addChild(rankBtn);
        this._buttomBg = BaseLoadBitmap.create("acmachaoview_common_buttombg");
        this._buttomBg.width = 640;
        this._buttomBg.height = 139;
        this._buttomBg.setPosition(0, GameConfig.stageHeigth - this.getViewTitleButtomY() - this._buttomBg.height);
        this.addChild(this._buttomBg);
        this._textbg = BaseBitmap.create("acmazeview_textbg");
        this._textbg.setPosition(this._buttomBg.x + 160, this._buttomBg.y - this._textbg.height - 50);
        this.addChild(this._textbg);
        this._textBM = BaseBitmap.create("acmachaoview_common_text");
        this._textBM.anchorOffsetX = this._textBM.width / 2;
        this._textBM.anchorOffsetY = this._textBM.height / 2;
        this._textBM.setPosition(this._textbg.x + this._textbg.width / 2 - 15, this._textbg.y + this._textbg.height / 2 - 20);
        this.addChild(this._textBM);
        //
        this._killText = ComponentManager.getBitmapText(String(vo.getMaChaoValue()), TextFieldConst.FONTNAME_ITEMTIP);
        this._killText.anchorOffsetX = this._killText.width / 2;
        this._killText.anchorOffsetY = this._killText.height / 2;
        this._killText.rotation = -24;
        this._killText.setPosition(this._textBM.x + 10, this._textBM.y + this._textBM.height / 2 - 6);
        this.addChild(this._killText);
        this.initBtn();
        this.initEnemy();
        this.initAssault();
        this._npcBM = BaseLoadBitmap.create("acmachaoview_npc-" + this.getUiCode());
        this._npcBM.width = 493;
        this._npcBM.height = 417;
        this._npcBM.setPosition(this._buttomBg.x + this._buttomBg.width - this._npcBM.width, this._buttomBg.y - this._npcBM.height);
        this.addChild(this._npcBM);
        this._timeBg = BaseBitmap.create("public_9_bg61");
        this._timeBg.y = 41;
        this.addChild(this._timeBg);
        this._timeTF = ComponentManager.getTextField(LanguageManager.getlocal("acLuckyDrawTopTip2-1", [vo.acCountDown]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeBg.width = 60 + this._timeTF.width;
        this._timeBg.x = GameConfig.stageWidth / 2 - this._timeBg.width / 2;
        this._timeTF.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTF.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTF.height / 2);
        this.addChild(this._timeTF);
        var servantCfg = Config.ServantCfg.getServantItemById("2017");
        if (servantCfg.quality2) {
            var cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
            cornerImg.x = 555;
            cornerImg.y = GameConfig.stageHeigth - 445;
            cornerImg.setScale(1.3);
            this.addChild(cornerImg);
        }
        TickManager.addTick(this.tick, this);
        this.tick();
        this.refreshView();
    };
    AcMaChaoViewTab1.prototype.tick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (vo.checkIsInEndShowTime()) {
            this._timeTF.text = LanguageManager.getlocal("acPunishEnd");
        }
        else {
            this._timeTF.text = LanguageManager.getlocal("acLuckyDrawTopTip2-1", [vo.acCountDown]);
        }
        this._timeBg.width = 60 + this._timeTF.width;
        this._timeBg.x = GameConfig.stageWidth / 2 - this._timeBg.width / 2;
        this._timeTF.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTF.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTF.height / 2);
    };
    /**初始化btn */
    AcMaChaoViewTab1.prototype.initBtn = function () {
        var _this = this;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var rewardId = GameData.formatRewardItem(cfg.getReward)[0].id;
        //一次相关
        var oneBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", function () {
            if (vo.checkIsInEndShowTime()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (Api.playerVoApi.getPlayerGem() < cfg.cost && (!vo.isFree())) {
                App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
                return;
            }
            if (_this._isPlayAni) {
                return;
            }
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_MACHAOLOTTERY, { "activeId": vo.aidAndCode, "isTenPlay": 0 });
            _this._isPlayAni = true;
            _this._isTen = false;
        }, this);
        oneBtn.setPosition(85, this._buttomBg.y + this._buttomBg.height / 2 - oneBtn.height / 2);
        this.addChild(oneBtn);
        var oneBtnIcon = BaseLoadBitmap.create("itemicon" + rewardId);
        oneBtnIcon.width = 35;
        oneBtnIcon.height = 35;
        oneBtnIcon.setPosition(oneBtn.x + oneBtn.width / 2 - oneBtnIcon.width / 2 + 5, oneBtn.y + oneBtn.height / 2 - oneBtnIcon.height / 2);
        this.addChild(oneBtnIcon);
        var oneBtnIconTF = ComponentManager.getTextField(LanguageManager.getlocal("acMaChaoViewBuy-" + this.code), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        oneBtnIconTF.setPosition(oneBtnIcon.x - oneBtnIconTF.width, oneBtnIcon.y + oneBtnIcon.height / 2 - oneBtnIconTF.height / 2);
        this.addChild(oneBtnIconTF);
        var oneBtnIconNum = ComponentManager.getTextField("X1", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        oneBtnIconNum.setPosition(oneBtnIcon.x + oneBtnIcon.width, oneBtnIcon.y + oneBtnIcon.height / 2 - oneBtnIconNum.height / 2);
        this.addChild(oneBtnIconNum);
        var oneGemBM = BaseBitmap.create("public_icon1");
        oneGemBM.width = 42;
        oneGemBM.height = 42;
        oneGemBM.setPosition(oneBtn.x + oneBtn.width / 2 - oneGemBM.width, oneBtn.y - oneGemBM.height + 5);
        this.addChild(oneGemBM);
        this._oneNeedNumTF = ComponentManager.getTextField(String(cfg.cost), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._oneNeedNumTF.setPosition(oneGemBM.x + oneGemBM.width, oneGemBM.y + oneGemBM.height / 2 - this._oneNeedNumTF.height / 2);
        this.addChild(this._oneNeedNumTF);
        var useOneTF = ComponentManager.getTextField(LanguageManager.getlocal("acMaChaoViewUseOne-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        useOneTF.setPosition(oneBtn.x + oneBtn.width / 2 - useOneTF.width / 2, oneBtn.y + oneBtn.height + 5);
        this.addChild(useOneTF);
        //十次相关
        var tenBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", function () {
            if (vo.checkIsInEndShowTime()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (Api.playerVoApi.getPlayerGem() < cfg.cost * 10 * cfg.discount) {
                App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
                return;
            }
            if (_this._isPlayAni) {
                return;
            }
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_MACHAOLOTTERY, { "activeId": vo.aidAndCode, "isTenPlay": 1 });
            _this._isPlayAni = true;
            _this._isTen = true;
        }, this);
        tenBtn.setPosition(GameConfig.stageWidth - tenBtn.width - 90, oneBtn.y);
        this.addChild(tenBtn);
        var tenBtnIcon = BaseLoadBitmap.create("itemicon" + rewardId);
        tenBtnIcon.width = 35;
        tenBtnIcon.height = 35;
        tenBtnIcon.setPosition(tenBtn.x + tenBtn.width / 2 - tenBtnIcon.width / 2 + 5, tenBtn.y + tenBtn.height / 2 - tenBtnIcon.height / 2);
        this.addChild(tenBtnIcon);
        var tenBtnIconTF = ComponentManager.getTextField(LanguageManager.getlocal("acMaChaoViewBuy-" + this.code), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        tenBtnIconTF.setPosition(tenBtnIcon.x - tenBtnIconTF.width, tenBtnIcon.y + tenBtnIcon.height / 2 - tenBtnIconTF.height / 2);
        this.addChild(tenBtnIconTF);
        var tenBtnIconNum = ComponentManager.getTextField("X10", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        tenBtnIconNum.setPosition(tenBtnIcon.x + tenBtnIcon.width, tenBtnIcon.y + tenBtnIcon.height / 2 - tenBtnIconNum.height / 2);
        this.addChild(tenBtnIconNum);
        var tenGemBM = BaseBitmap.create("public_icon1");
        tenGemBM.width = 42;
        tenGemBM.height = 42;
        tenGemBM.setPosition(tenBtn.x + tenBtn.width / 2 - tenGemBM.width, tenBtn.y - tenGemBM.height + 5);
        this.addChild(tenGemBM);
        var tenNeedGemTF = ComponentManager.getTextField(String(cfg.cost * 10 * cfg.discount), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        tenNeedGemTF.setPosition(tenGemBM.x + tenGemBM.width, tenGemBM.y + tenGemBM.height / 2 - tenNeedGemTF.height / 2);
        this.addChild(tenNeedGemTF);
        var useTenTF = ComponentManager.getTextField(LanguageManager.getlocal("acMaChaoViewUseTen-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        useTenTF.setPosition(tenBtn.x + tenBtn.width / 2 - useTenTF.width / 2, tenBtn.y + tenBtn.height + 5);
        this.addChild(useTenTF);
    };
    /**初始化敌兵 */
    AcMaChaoViewTab1.prototype.initEnemy = function () {
        this._enemyContainer = new BaseDisplayObjectContainer();
        this.addChild(this._enemyContainer);
        this._npcClip1 = ComponentManager.getCustomMovieClip("acmachaoviewidle", 5, 300);
        this._npcClip1.setPosition(156, GameConfig.stageHeigth - this.getViewTitleButtomY() - 472);
        this._enemyContainer.addChild(this._npcClip1);
        this._npcClip1.playWithTime(-1);
        this._npcClip2 = ComponentManager.getCustomMovieClip("acmachaoviewatk", 2, 100);
        this._npcClip2.setPosition(156, GameConfig.stageHeigth - this.getViewTitleButtomY() - 482);
        this._enemyContainer.addChild(this._npcClip2);
        this._npcClip2.playWithTime(1);
        this._npcClip2.setVisible(false);
        for (var i = 0; i < this._enemyPosCfg.length; i++) {
            var posCfg = this._enemyPosCfg[i];
            var enemy = BaseLoadBitmap.create("acmachaoview_enemy" + String(i + 1) + "-" + this.getUiCode());
            enemy.setPosition(posCfg.x, GameConfig.stageHeigth - this.getViewTitleButtomY() - posCfg.height - posCfg.y);
            this._enemyContainer.addChild(enemy);
            enemy.name = String(i);
            this._enemyList.push(enemy);
        }
    };
    /**初始化骑兵 */
    AcMaChaoViewTab1.prototype.initAssault = function () {
        this._assaultList1.length = 0;
        this._assaultList2.length = 0;
        this._assaultList3.length = 0;
        for (var j = 0; j < 3; j++) {
            for (var i = 0; i < this._assaultCfg1.length; i++) {
                var assaultCfg = this._assaultCfg1[i];
                var assault = ComponentManager.getCustomMovieClip("acmachaoassaulteffect", 5, 70);
                assault.anchorOffsetX = 227;
                assault.anchorOffsetY = 40;
                assault.rotation = -35;
                assault.alpha = assaultCfg.alpha;
                assault.setPosition(assaultCfg.x, GameConfig.stageHeigth - this.getViewTitleButtomY() - assaultCfg.y);
                this.addChild(assault);
                assault.playWithTime(-1);
                var key = "_assaultList" + String(Number(j) + 1);
                this[key].push(assault);
            }
        }
    };
    /**刷新UI */
    AcMaChaoViewTab1.prototype.refreshView = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (vo.isFree()) {
            this._oneNeedNumTF.text = LanguageManager.getlocal("acMaChaoViewFree-" + this.code);
        }
        else {
            this._oneNeedNumTF.text = String(cfg.cost);
        }
        if (vo.getMaChaoValue() > 0) {
            this._textbg.setVisible(true);
            this._textBM.setVisible(true);
            this._killText.setVisible(true);
            this._killText.text = String(vo.getMaChaoValue());
            this._killText.setPosition(this._textBM.x + 10, this._textBM.y + this._textBM.height / 2 - 6);
        }
        else {
            this._textbg.setVisible(false);
            this._textBM.setVisible(false);
            this._killText.setVisible(false);
        }
    };
    /**抽奖 */
    AcMaChaoViewTab1.prototype.lotteryHandle = function (event) {
        if (event.data.ret) {
            this.rewards = event.data.data.data.rewards;
            this.otherRewards = event.data.data.data.otherRewards;
            this.playAssaultAni();
        }
    };
    /**排行榜 */
    AcMaChaoViewTab1.prototype.rankClickHandler = function (event) {
        var rankData = event.data.data.data;
        ViewController.getInstance().openView(ViewConst.POPUP.ACMACHAORANKPOPUPVIEW, { code: this.code, aid: this.aid, rankData: rankData });
    };
    /**一抽动画 */
    AcMaChaoViewTab1.prototype.playOnceAssaultAni = function () {
        this.playOneAssaultAni("_assaultList1", 2);
    };
    /**
     * 十连抽动画
     */
    AcMaChaoViewTab1.prototype.playEachAssaultAni = function (key) {
        for (var i = 0; i < this[key].length; i++) {
            this.playOneAssaultAni(key, i);
        }
    };
    /**动画 */
    AcMaChaoViewTab1.prototype.playAssaultAni = function () {
        var _this = this;
        if (this._isTen) {
            //320   180
            var index_1 = this.getChildIndex(this._npcBM);
            var flash_eff_1 = ComponentManager.getCustomMovieClip("critmyflash", 3, 30);
            // flash_eff.scaleX = flash_eff.scaleY = 2;
            flash_eff_1.x = 160;
            flash_eff_1.y = this._buttomBg.y - 226 + 40;
            this.addChildAt(flash_eff_1, index_1 - 1);
            flash_eff_1.playWithTime(1);
            flash_eff_1.setEndCallBack(function () {
                _this.removeChild(flash_eff_1);
                flash_eff_1.dispose();
                flash_eff_1 = null;
                //背景光 320 × 226
                var speed_eff = ComponentManager.getCustomMovieClip("critmyspeed", 5, 50);
                speed_eff.width = GameConfig.stageWidth;
                speed_eff.setPosition(0, _this._buttomBg.y - 226 + 15);
                _this.addChildAt(speed_eff, index_1 - 2);
                speed_eff.playWithTime(5);
                speed_eff.setEndCallBack(function () {
                    _this.removeChild(speed_eff);
                    speed_eff.dispose();
                    speed_eff = null;
                    //小幅度震动
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_MACHAOANI, { type: 1 });
                    _this._isShake = true;
                    _this._npcClip2.setVisible(true);
                    _this._npcClip1.setVisible(false);
                    _this._npcClip2.playWithTime(1);
                    egret.Tween.removeTweens(_this);
                    egret.Tween.get(_this).call(_this.playEachAssaultAni, _this, ["_assaultList1"]).wait(330).call(_this.playEachAssaultAni, _this, ["_assaultList2"]).wait(330).call(_this.playEachAssaultAni, _this, ["_assaultList3"]).call(function () {
                        egret.Tween.removeTweens(_this);
                    }, _this);
                }, _this);
                var wordTxt = BaseBitmap.create("acmachaoview_text-" + _this.getUiCode());
                wordTxt.anchorOffsetX = wordTxt.width / 2;
                wordTxt.anchorOffsetY = wordTxt.height / 2;
                wordTxt.setPosition(wordTxt.width / 2 + 50, _this._buttomBg.y - 105);
                wordTxt.setScale(3);
                wordTxt.alpha = 0;
                _this.addChildAt(wordTxt, index_1 - 1);
                egret.Tween.get(wordTxt).wait(200).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 150).wait(400).to({ x: -wordTxt.width }, 250).call(function () {
                    egret.Tween.removeTweens(wordTxt);
                    _this.removeChild(wordTxt);
                    wordTxt.dispose();
                    wordTxt = null;
                }, _this);
            }, this);
        }
        else {
            this._npcClip2.setVisible(true);
            this._npcClip1.setVisible(false);
            this._npcClip2.playWithTime(1);
            this.playOnceAssaultAni();
        }
    };
    /**一个士兵的动画 */
    AcMaChaoViewTab1.prototype.playOneAssaultAni = function (key, index) {
        var _this = this;
        this[key][index].x = this._assaultCfg1[index].x;
        this[key][index].y = GameConfig.stageHeigth - this.getViewTitleButtomY() - this._assaultCfg1[index].y;
        this[key][index].alpha = this._assaultCfg1[index].alpha;
        this[key][index].scaleX = this._assaultCfg1[index].scale;
        this[key][index].scaleY = this._assaultCfg1[index].scale;
        egret.Tween.removeTweens(this[key][index]);
        egret.Tween.get(this[key][index]).to({
            x: this._assaultCfg2[index].x,
            y: GameConfig.stageHeigth - this.getViewTitleButtomY() - this._assaultCfg2[index].y,
            alpha: this._assaultCfg2[index].alpha,
            scaleX: this._assaultCfg2[index].scale,
            scaleY: this._assaultCfg2[index].scale,
        }, 50).to({
            x: this._assaultCfg3[index].x,
            y: GameConfig.stageHeigth - this.getViewTitleButtomY() - this._assaultCfg3[index].y,
            alpha: this._assaultCfg3[index].alpha,
            scaleX: this._assaultCfg3[index].scale,
            scaleY: this._assaultCfg3[index].scale,
        }, 400).call(function () {
            if (_this._isTen) {
                //大幅度震动
                if (_this._isShake) {
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_MACHAOANI, { type: 2 });
                    _this._isShake = false;
                }
                for (var i = 0; i < 3; i++) {
                    _this.playOneEmenyAni(i);
                }
            }
            else {
                _this.playOneEmenyAni(1);
            }
        }, this).to({
            x: this._assaultCfg4[index].x,
            y: GameConfig.stageHeigth - this.getViewTitleButtomY() - this._assaultCfg4[index].y,
            alpha: this._assaultCfg4[index].alpha,
            scaleX: this._assaultCfg4[index].scale,
            scaleY: this._assaultCfg4[index].scale,
        }, 150).call(function () {
            if (_this._isTen) {
                if (_this._isTen && index == _this._assaultList3.length - 1 && key == "_assaultList3") {
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_MACHAOANI, { type: 3 });
                }
                for (var i = 3; i < 6; i++) {
                    _this.playOneEmenyAni(i);
                }
            }
            else {
                _this.playOneEmenyAni(4);
            }
        }, this).to({
            x: this._assaultCfg5[index].x,
            y: GameConfig.stageHeigth - this.getViewTitleButtomY() - this._assaultCfg5[index].y,
            alpha: this._assaultCfg5[index].alpha,
            scaleX: this._assaultCfg5[index].scale,
            scaleY: this._assaultCfg5[index].scale,
        }, 150).call(function () {
            egret.Tween.removeTweens(_this[key][index]);
            if ((!_this._isTen) || (_this._isTen && index == _this._assaultList3.length - 1 && key == "_assaultList3")) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_MACHAOANI, { type: 4 });
                _this._npcClip1.setVisible(true);
                _this._npcClip2.setVisible(false);
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
                    rewards: _this.rewards, otherRewards: _this.otherRewards, isPlayAni: true, callback: function () {
                        _this._isPlayAni = false;
                        _this.refreshView();
                    }, handler: _this
                });
            }
        }, this);
    };
    /**一个敌人的动画 */
    AcMaChaoViewTab1.prototype.playOneEmenyAni = function (index) {
        var _this = this;
        var posX = this._enemyList[index].x;
        var posY = this._enemyList[index].y;
        egret.Tween.removeTweens(this._enemyList[index]);
        egret.Tween.get(this._enemyList[index]).call(function () {
            var hurtEffect = ComponentManager.getCustomMovieClip("acmachaohurteffect", 8, 70);
            hurtEffect.anchorOffsetX = 125;
            hurtEffect.anchorOffsetY = 120;
            hurtEffect.rotation = 360 * Math.random();
            hurtEffect.setPosition(posX + _this._enemyList[index].width / 2, posY + _this._enemyList[index].height / 2);
            _this.addChild(hurtEffect);
            hurtEffect.playWithTime(1);
            hurtEffect.setEndCallBack(function () {
                _this.removeChild(hurtEffect);
                hurtEffect.dispose();
                hurtEffect = null;
            }, _this);
        }, this).to({
            x: posX + 15,
            y: posY - 12,
        }, 30).to({
            x: posX,
            y: posY,
        }, 300).call(function () {
            egret.Tween.removeTweens(_this._enemyList[index]);
        }, this);
    };
    AcMaChaoViewTab1.prototype.playEnemyShakeAni = function (event) {
        var offest = event.data.offest;
        var type = event.data.type;
        var posX = 0;
        var posY = 0;
        this._enemyContainer.setPosition(posX + offest, posY + offest);
    };
    AcMaChaoViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_MACHAOGETRANK, this.rankClickHandler, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_MACHAOLOTTERY, this.lotteryHandle, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_MACHAOTAbANI, this.playEnemyShakeAni, this);
        egret.Tween.removeTweens(this);
        TickManager.removeTick(this.tick, this);
        this.rewards = null;
        this.otherRewards = null;
        this._buttomBg = null;
        this._oneNeedNumTF = null;
        this._isPlayAni = false;
        this._enemyList.length = 0;
        this._assaultList1.length = 0;
        this._npcBM = null;
        this._enemyContainer = null;
        this._npcClip1 = null;
        this._npcClip2 = null;
        this._timeTF = null;
        this._timeBg = null;
        this._textbg = null;
        this._textBM = null;
        this._killText = null;
        _super.prototype.dispose.call(this);
    };
    return AcMaChaoViewTab1;
}(AcCommonViewTab));
__reflect(AcMaChaoViewTab1.prototype, "AcMaChaoViewTab1");
//# sourceMappingURL=AcMaChaoViewTab1.js.map