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
var MainUITop = (function (_super) {
    __extends(MainUITop, _super);
    function MainUITop() {
        var _this = _super.call(this) || this;
        // need dispose end
        _this.level = 1;
        _this.gold = 0;
        _this.diamod = 0;
        _this.levelexp = 0;
        _this.init();
        _this.initEventListener();
        return _this;
    }
    MainUITop.prototype.init = function () {
        var topinfobg = BaseBitmap.create("mainui_topbg2");
        // topinfobg.width = GameConfig.stageWidth;
        // topinfobg.x =( GameConfig.stageWidth - topinfobg.width) / 2;
        // topinfobg.y = 0;
        // this.addChild(topinfobg);
        var lvgruop = new BaseDisplayObjectContainer();
        this.addChild(lvgruop);
        // 等级信息部分
        this.progress = ComponentMgr.getProgressBar("ab_mainui_progress", "ab_mainui_progress_bg", 160);
        this.progress.touchEnabled = true;
        // this.progress.addEventListener(egret.TouchEvent.TOUCH_TAP, this.levelProgressOnClick, this);
        this.progress.setPercentage(0.2);
        lvgruop.addChild(this.progress);
        // let levelIcon = BaseBitmap.create("public_level_1");
        var levelIcon = BaseLoadBitmap.create("levelicon1");
        // levelIcon.x = 421 ;
        levelIcon.setScale(0.175);
        lvgruop.y = topinfobg.y + (topinfobg.height - levelIcon.height * levelIcon.scaleY) / 2 - 3;
        lvgruop.addChild(levelIcon);
        levelIcon.touchEnabled = true;
        // levelIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.levelIconOnClick, this);
        this.levelIcon = levelIcon;
        this.progress.x = levelIcon.x + levelIcon.width * levelIcon.scaleX / 2;
        this.progress.y = levelIcon.y + (levelIcon.height * levelIcon.scaleY - this.progress.height) / 2;
        lvgruop.addTouch(this.lvgruopOnClick, this);
        this.lvgruop = lvgruop;
        lvgruop.anchorOffsetX = lvgruop.width / 2;
        lvgruop.anchorOffsetY = lvgruop.height / 2;
        lvgruop.x = 421 + lvgruop.width / 2;
        lvgruop.y = lvgruop.y + lvgruop.height / 2;
        // 金币信息部分
        var goldURLs = {
            iconURL: "ab_mainui_gold",
            textBgURL: "ab_mainui_progress_bg",
            tailURL: "ab_public_add_btn"
        };
        var goldRect = {
            x: 10,
            y: levelIcon.y + 10,
            width: 160
        };
        var goldCBs = {
            iconCB: this.goldIconOnClick,
            textBgCB: this.goldTextOnClick,
            tailCB: this.goldAddBtnOnClick
        };
        this.goldgruop = new BaseDisplayObjectContainer;
        this.addChild(this.goldgruop);
        this.goldText = this.createInfoBar(goldURLs, goldRect, goldCBs, this, this.goldgruop);
        this.goldText.text = this.gold.toFixed(0);
        this.goldgruop.anchorOffsetX = this.goldgruop.width / 2 + goldRect.x;
        this.goldgruop.anchorOffsetY = this.goldgruop.height / 2 + goldRect.y;
        this.goldgruop.x += this.goldgruop.width / 2 + goldRect.x;
        this.goldgruop.y += this.goldgruop.height / 2 + goldRect.y;
        this.goldgruop.addTouch(this.goldOnTouch, this);
        // 钻石信息部分
        var diamodURLs = {
            iconURL: "ab_mainui_gem",
            textBgURL: "ab_mainui_progress_bg",
            tailURL: "ab_public_add_btn"
        };
        var diamodRect = {
            x: 224,
            y: levelIcon.y + 10,
            width: 160
        };
        var diamodCBs = {
            iconCB: this.diamodIconOnClick,
            textBgCB: this.diamodTextOnClick,
            tailCB: this.diamodAddBtnOnClick
        };
        this.diamodgruop = new BaseDisplayObjectContainer();
        this.addChild(this.diamodgruop);
        this.diamodText = this.createInfoBar(diamodURLs, diamodRect, diamodCBs, this, this.diamodgruop);
        this.diamodText.text = this.diamod.toFixed(0);
        this.diamodgruop.anchorOffsetX = this.diamodgruop.width / 2 + diamodRect.x;
        this.diamodgruop.anchorOffsetY = this.diamodgruop.height / 2 + diamodRect.y;
        this.diamodgruop.x += this.diamodgruop.width / 2 + diamodRect.x;
        this.diamodgruop.y += this.diamodgruop.height / 2 + diamodRect.y;
        this.diamodgruop.addTouch(this.diamodOnTouch, this);
        // DEBUG: 每次提交的时候要记得把这个放开
        // 气泡部分
        // let mask = BaseBitmap.create("public_9_viewmask");
        // this.addChild(mask);
        // mask.x = 0;
        // mask.y = 0;
        // mask.width = GameConfig.stageWidth;
        // mask.height = GameConfig.stageHeigth;
        // mask.visible = false;
        // mask.addTouchTap(this.hideBox, this);
        // this.boxmask = mask;
        // let box = new BubbleBox();
        // box.initView("public_triangle", "public_update_bg", 250, 200);
        // this.box = box;
        // this.addChild(box);
        // box.visible = false;
        // let boxinfo = ComponentMgr.getTextField('11', TextFieldConst.SIZE_22, ColorEnums.black);
        // box.addChildCon(boxinfo);
        // boxinfo.width = box.width;
        // boxinfo.textAlign = TextFieldConst.ALIGH_CENTER;
        // boxinfo.x = 0;
        // boxinfo.y = 0;
        // this.boxinfo = boxinfo;
        this.refresh();
    };
    /**
     * 生成mainUI 顶部元素
     * @param urls 资源的url
     * @param rect 位置矩形
     * @param cbs 点击不同地方的回调
     * @param target 回调调对象
     */
    MainUITop.prototype.createInfoBar = function (urls, rect, cbs, target, container) {
        var textbg = BaseBitmap.create(urls.textBgURL);
        textbg.width = rect.width;
        textbg.touchEnabled = true;
        //textbg.addEventListener(egret.TouchEvent.TOUCH_TAP, cbs.textBgCB, target);
        container.addChild(textbg);
        var icon = BaseBitmap.create(urls.iconURL);
        // icon.width = icon.height = 100;
        // icon.x = rect.x;
        // icon.y = rect.y;
        icon.touchEnabled = true;
        //icon.addEventListener(egret.TouchEvent.TOUCH_TAP, cbs.iconCB, target);
        container.addChild(icon);
        // icon.setScale(0.51);
        var tail = ComponentMgr.getButton(urls.tailURL, "", cbs.tailCB, this);
        this.addChild(tail);
        textbg.x = rect.x; // + icon.width * icon.scaleX / 2;
        textbg.y = rect.y; // + (icon.height * icon.scaleY- textbg.height) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, textbg, [0, 0]);
        tail.x = textbg.x + textbg.width - tail.width / 2;
        tail.y = rect.y + (textbg.height - tail.height) / 2;
        var text = ComponentMgr.getTextField("12", TextFieldConst.SIZE_BUTTON_COMMON);
        text.width = rect.width - icon.width * icon.scaleX - tail.width * tail.scaleX / 2;
        text.x = icon.x + icon.width * icon.scaleX;
        text.y = textbg.y + (textbg.height - text.height) / 2;
        ;
        text.textAlign = egret.HorizontalAlign.CENTER;
        container.addChild(text);
        return text;
    };
    MainUITop.prototype.goldOnTouch = function (e) {
        switch (e.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                SoundMgr.playEffect(SoundConst.EFFECT_CLICK);
                this.goldgruop.setScale(0.8);
                var point = new egret.Point(this.goldText.localToGlobal().x + this.goldText.width / 2, this.goldText.localToGlobal().y + this.goldText.height);
                App.CommonUtil.showExtendTip(LangMger.getlocal("mainui_gold_des", [String(Config.GamebaseCfg.maxGold)]), point, true, 250, egret.HorizontalAlign.LEFT);
                break;
            case egret.TouchEvent.TOUCH_END:
                this.goldgruop.setScale(1);
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                this.goldgruop.setScale(1);
            default:
                break;
        }
    };
    MainUITop.prototype.diamodOnTouch = function (e) {
        switch (e.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                SoundMgr.playEffect(SoundConst.EFFECT_CLICK);
                this.diamodgruop.setScale(0.8);
                var point = new egret.Point(this.diamodText.localToGlobal().x + this.diamodText.width / 2, this.diamodText.localToGlobal().y + this.diamodText.height);
                App.CommonUtil.showExtendTip(LangMger.getlocal("mainui_gem_des", [String(Config.GamebaseCfg.maxGem)]), point, true, 250, egret.HorizontalAlign.LEFT);
                break;
            case egret.TouchEvent.TOUCH_END:
                this.diamodgruop.setScale(1);
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                this.diamodgruop.setScale(1);
            default:
                break;
        }
    };
    MainUITop.prototype.lvgruopOnClick = function (e) {
        switch (e.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                SoundMgr.playEffect(SoundConst.EFFECT_CLICK);
                this.lvgruop.setScale(0.8);
                break;
            case egret.TouchEvent.TOUCH_END:
                this.lvgruop.setScale(1);
                this.levelIconOnClick(e);
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                this.lvgruop.setScale(1);
                this.levelIconOnClick(e);
            default:
                break;
        }
    };
    // gold info click
    MainUITop.prototype.goldIconOnClick = function (event) {
        var point = new egret.Point(this.goldText.localToGlobal().x + this.goldText.width / 2, this.goldText.localToGlobal().y + this.goldText.height);
        App.CommonUtil.showExtendTip(LangMger.getlocal("mainui_gold_des", [String(Config.GamebaseCfg.maxGold)]), point, true, 250);
    };
    MainUITop.prototype.goldTextOnClick = function (event) {
        var point = new egret.Point(this.goldText.localToGlobal().x + this.goldText.width / 2, this.goldText.localToGlobal().y + this.goldText.height);
        App.CommonUtil.showExtendTip(LangMger.getlocal("mainui_gold_des", [String(Config.GamebaseCfg.maxGold)]), point, true, 250);
    };
    MainUITop.prototype.goldAddBtnOnClick = function (event) {
        App.MsgHelper.dispEvt(MsgConst.GOSHOP, { index: ShopConst.SHOP_GOLD_INDEX, type: ShopConst.SHOP_GOLD });
    };
    // diamod info click
    MainUITop.prototype.diamodIconOnClick = function (event) {
        var point = new egret.Point(this.diamodText.localToGlobal().x + this.diamodText.width / 2, this.diamodText.localToGlobal().y + this.diamodText.height);
        App.CommonUtil.showExtendTip(LangMger.getlocal("mainui_gem_des", [String(Config.GamebaseCfg.maxGem)]), point, true, 250);
    };
    MainUITop.prototype.diamodTextOnClick = function (event) {
        var point = new egret.Point(this.diamodText.localToGlobal().x + this.diamodText.width / 2, this.diamodText.localToGlobal().y + this.diamodText.height);
        App.CommonUtil.showExtendTip(LangMger.getlocal("mainui_gem_des", [String(Config.GamebaseCfg.maxGem)]), point, true, 250);
    };
    MainUITop.prototype.diamodAddBtnOnClick = function (event) {
        App.MsgHelper.dispEvt(MsgConst.GOSHOP, { index: ShopConst.SHOP_GEM_INDEX, type: ShopConst.SHOP_GEM });
    };
    // level info click
    MainUITop.prototype.levelIconOnClick = function (event) {
        var point = new egret.Point(this.progress.localToGlobal().x + this.progress.width / 2, this.progress.localToGlobal().y + this.progress.height);
        App.CommonUtil.showExtendTip(LangMger.getlocal("mainui_level_des"), point, true, 250, egret.HorizontalAlign.LEFT);
    };
    MainUITop.prototype.levelProgressOnClick = function (event) {
        var point = new egret.Point(this.progress.localToGlobal().x + this.progress.width / 2, this.progress.localToGlobal().y + this.progress.height);
        App.CommonUtil.showExtendTip(LangMger.getlocal("mainui_level_des"), point, true, 250);
    };
    /**
     * 显示气泡
     * @param text 气泡文字
     * @param x 气泡 x
     * @param y 气泡 y
     */
    MainUITop.prototype.showBox = function (text, x, y) {
        if (x < 0 || x > GameConfig.stageWidth)
            return;
        if (this.box.width / 2 < x && x < GameConfig.stageWidth - this.box.width / 2) {
            this.box.x = x - this.box.width / 2;
            this.box.TryangleX = this.box.width / 2;
        }
        else if (x < this.box.width / 2) {
            this.box.x = 0;
            this.box.TryangleX = x;
        }
        else {
            this.box.x = GameConfig.stageWidth - this.box.width;
            this.box.TryangleX = x - this.box.x;
        }
        this.box.y = y;
        this.boxinfo.text = text;
        this.boxinfo.y = 5;
        this.box.BgHeight = this.boxinfo.height + 20;
        this.boxmask.visible = true;
        this.box.visible = true;
        ;
    };
    /**
     * 隐藏气泡
     */
    MainUITop.prototype.hideBox = function () {
        this.boxmask.visible = false;
        this.box.visible = false;
    };
    /**
     * 刷新mainui上的数据
     */
    MainUITop.prototype.refresh = function () {
        this.gold = Api.UserinfoVoApi.getGold();
        this.diamod = Api.UserinfoVoApi.getGem();
        this.levelexp = Api.UserinfoVoApi.getCurLevelExp();
        this.level = Api.UserinfoVoApi.getLevel();
        this.goldText.text = App.StringUtil.formatIntToStringWith3figure(Api.UserinfoVoApi.getGold(), 6);
        this.diamodText.text = App.StringUtil.formatIntToStringWith6figure(Api.UserinfoVoApi.getGem());
        // this.levelIcon.texture = RES.getRes(`public_level_${Api.UserinfoVoApi.getLevel()}`);
        this.levelIcon.setload("levelicon" + Api.UserinfoVoApi.getLevel());
        // 刷新
        this.progress.setPercentage(Api.UserinfoVoApi.getLevelExppro(), Api.UserinfoVoApi.getCurLevelExp() + "/" + Config.LevelCfg.getUpgradeNS(Api.UserinfoVoApi.getLevel()));
    };
    MainUITop.prototype.resFly = function (evt) {
        var _this = this;
        var view = this;
        var gold = Api.UserinfoVoApi.getGold();
        var point = Api.UserinfoVoApi.getFyStartPoint() ? Api.UserinfoVoApi.getFyStartPoint() : new egret.Point(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
        if (evt && evt.data && evt.data.type && evt.data.type == "fight") {
            //战斗后的结算
            var exp = Api.UserinfoVoApi.getCurLevelExp();
            var level = Api.UserinfoVoApi.getLevel();
            if ((level > view.level) || (level == view.level && exp > view.levelexp)) {
                if (level > view.level && App.CommonUtil.check_dragon()) {
                    ViewController.getInstance().openView(ViewConst.SCORELEVELCHANGEVIEW, {
                        type: 1,
                        callback: view.showScoreFly,
                        handler: view,
                        level: view.level
                    });
                }
                else {
                    view.showScoreFly();
                }
            }
            else {
                if (level < view.level) {
                    //播放降低特效
                    ViewController.getInstance().openView(ViewConst.SCORELEVELCHANGEVIEW, {
                        type: 2,
                        handler: view,
                        level: view.level,
                        callback: function () {
                            view.checkGold();
                            view.checkGem();
                            if (Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_5) && !PlatMgr.checkIsIOSShenheSp()) {
                                ViewController.getInstance().openView(ViewConst.BOXREWARDDETAILPOPUPVIEW, {
                                    title: LangMger.getlocal("boxname_1007"),
                                    handler: _this,
                                    needCancel: true,
                                    callback: function () {
                                        App.CommonUtil.watchAd(AdConst.ADV_5);
                                    },
                                    needClose: 1,
                                    boxId: "1007",
                                    isbuy: false,
                                });
                            }
                        }
                    });
                }
                else {
                    if (level == view.level && exp < view.levelexp) {
                        if (Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_5) && !PlatMgr.checkIsIOSShenheSp()) {
                            ViewController.getInstance().openView(ViewConst.BOXREWARDDETAILPOPUPVIEW, {
                                title: LangMger.getlocal("boxname_1007"),
                                handler: this,
                                needCancel: true,
                                callback: function () {
                                    App.CommonUtil.watchAd(AdConst.ADV_5);
                                },
                                needClose: 1,
                                boxId: "1007",
                                isbuy: false,
                            });
                        }
                    }
                }
                // view.levelIcon.texture = RES.getRes(`public_level_${Api.UserinfoVoApi.getLevel()}`);
                view.levelIcon.setload("levelicon" + Api.UserinfoVoApi.getLevel());
                view.progress.setPercentage(Api.UserinfoVoApi.getLevelExppro(), Api.UserinfoVoApi.getCurLevelExp() + "/" + Config.LevelCfg.getUpgradeNS(Api.UserinfoVoApi.getLevel()));
            }
            view.levelexp = exp;
            view.level = level;
        }
        else {
            var type = (evt && evt.data && evt.data.type) ? evt.data.type : null;
            view.checkGold(type);
            view.checkGem(type);
        }
    };
    MainUITop.prototype.checkGold = function (type) {
        var view = this;
        var gold = Api.UserinfoVoApi.getGold();
        var point = Api.UserinfoVoApi.getFyStartPoint() ? Api.UserinfoVoApi.getFyStartPoint() : new egret.Point(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
        if (gold > view.gold || type == 'mail') {
            App.CommonUtil.showCollectEffect("ab_mainui_gold", point, new egret.Point(ResFlyPosEnums.goldX, (ResFlyPosEnums.goldY)), function () {
                view.goldText.text = App.StringUtil.formatIntToStringWith3figure(Api.UserinfoVoApi.getGold(), 6);
                Api.UserinfoVoApi.setFreshInfo(false, null);
            }, view);
        }
        else {
            view.goldText.text = App.StringUtil.formatIntToStringWith3figure(Api.UserinfoVoApi.getGold(), 6);
        }
        view.gold = gold;
    };
    MainUITop.prototype.checkGem = function (type) {
        var view = this;
        var point = Api.UserinfoVoApi.getFyStartPoint() ? Api.UserinfoVoApi.getFyStartPoint() : new egret.Point(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
        var gem = Api.UserinfoVoApi.getGem();
        if (gem > view.diamod || type == 'mail') {
            App.CommonUtil.showCollectEffect("public_icon1", point, new egret.Point(ResFlyPosEnums.gemX, (ResFlyPosEnums.gemY)), function () {
                view.diamodText.text = App.StringUtil.formatIntToStringWith6figure(Api.UserinfoVoApi.getGem());
                Api.UserinfoVoApi.setFreshInfo(false, null);
            }, view);
        }
        else {
            view.diamodText.text = App.StringUtil.formatIntToStringWith6figure(Api.UserinfoVoApi.getGem());
        }
        view.diamod = gem;
    };
    MainUITop.prototype.showScoreFly = function () {
        var view = this;
        var point = Api.UserinfoVoApi.getFyStartPoint() ? Api.UserinfoVoApi.getFyStartPoint() : new egret.Point(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
        App.CommonUtil.showCollectEffect("trophy_icon", point, new egret.Point(ResFlyPosEnums.scoreX, (ResFlyPosEnums.scoreY)), function () {
            // view.levelIcon.texture = RES.getRes(`public_level_${Api.UserinfoVoApi.getLevel()}`);
            view.levelIcon.setload("levelicon" + Api.UserinfoVoApi.getLevel());
            view.progress.setPercentage(Api.UserinfoVoApi.getLevelExppro(), Api.UserinfoVoApi.getCurLevelExp() + "/" + Config.LevelCfg.getUpgradeNS(Api.UserinfoVoApi.getLevel()));
            Api.UserinfoVoApi.setFreshInfo(false, null);
        }, view);
        view.checkGold();
        view.checkGem();
    };
    MainUITop.prototype.resChange = function () {
        var view = this;
        var gold = Api.UserinfoVoApi.getGold();
        if (gold <= view.gold) {
            view.goldText.text = App.StringUtil.formatIntToStringWith3figure(Api.UserinfoVoApi.getGold(), 6);
            view.gold = gold;
        }
        var gem = Api.UserinfoVoApi.getGem();
        if (gem <= view.diamod) {
            view.diamodText.text = App.StringUtil.formatIntToStringWith6figure(Api.UserinfoVoApi.getGem());
            view.diamod = gem;
        }
        if (Api.UserinfoVoApi.getFreshNow()) {
            view.resFly(null);
        }
        else {
            if (!Api.UserinfoVoApi.getFyStartPoint()) {
                view.refresh();
            }
        }
    };
    MainUITop.prototype.getMsgConstEventArr = function () {
        return [
            MsgConst.USERRES_CHANGE, MsgConst.MODEL_USERINFO,
        ];
    };
    MainUITop.prototype.msgEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case MsgConst.USERRES_CHANGE:
                view.resFly(evt);
                break;
            case MsgConst.MODEL_USERINFO:
                view.resChange();
                break;
        }
    };
    MainUITop.prototype.dispose = function () {
        this.goldText = null;
        this.diamodText = null;
        this.levelIcon = null;
        this.progress = null;
        this.level = 1;
        this.gold = 0;
        this.diamod = 0;
        this.boxmask = null;
        this.box = null;
        this.boxinfo = null;
        this.levelexp = 0;
        _super.prototype.dispose.call(this);
    };
    return MainUITop;
}(BaseDisplayObjectContainer));
__reflect(MainUITop.prototype, "MainUITop");
//# sourceMappingURL=MainUITop.js.map