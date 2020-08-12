/**
 * author 陈可
 * date 2017/9/18
 * @class MainUI
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
var MainUI = (function (_super) {
    __extends(MainUI, _super);
    function MainUI() {
        var _this = _super.call(this) || this;
        _this._topContiner = undefined;
        _this._bottomContiner = undefined;
        _this.cellWidth = 112;
        _this.bottomBtns = [];
        _this.bottomTexts = [];
        _this.slipts = [];
        _this.seleteIndex = 2;
        _this.selTw = null;
        _this.btnTws = [];
        _this.sliptTws = [];
        _this.txtTws = [];
        _this._readyBtn = null;
        _this.bottomBtnCfg = [
            {
                id: 1,
                btnName: "shop",
                btnIconImg: "mainui_shop_btn",
                isOPen: true,
                able: true,
            },
            {
                id: 2,
                btnName: "dice",
                btnIconImg: "ab_mainui_shop_icon",
                isOPen: true,
                able: true,
            },
            {
                id: 3,
                btnName: "ready",
                btnIconImg: "ab_mainui_fight_btn",
                isOPen: true,
                able: true,
            },
            {
                id: 4,
                btnName: "active",
                btnIconImg: "mainui_activity_btn",
                isOPen: false,
                able: false,
            },
            {
                id: 5,
                btnName: "team",
                btnIconImg: "mainui_team_btn",
                isOPen: false,
                able: false,
            },
        ];
        return _this;
    }
    /**
     * 填内容
     */
    MainUI.prototype.init = function () {
        this.name = "MainUI";
        this.initButtom();
        this.initTop();
        this.freshDice();
        if (!Api.GameinfoVoApi.getIsFinishNewGuide()) {
        }
        else {
            // NOTE: 公告图还没有出，这个先注释
            // this.showAnnoView();
        }
        //this.testHashCount();
    };
    MainUI.prototype.testHashCount = function () {
        var count = egret.$hashCount;
        setInterval(function () {
            var newcount = egret.$hashCount;
            var diff = newcount - count;
            count = newcount;
            console.log("hashcount:" + diff);
        }, 1000);
    };
    MainUI.prototype.preInit = function () {
        _super.prototype.preInit.call(this);
        if (!Api.GameinfoVoApi.getIsFinishNewGuide()) {
            var id = Api.GameinfoVoApi.getCurGudingId();
            if (id < 16) {
                App.CommonUtil.sendAnlyId(10);
                Api.GameinfoVoApi.setCurGudingId(1);
                App.CommonUtil.sendAnlyId(20);
                App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
            }
            else if (id == 16) {
                Api.GameinfoVoApi.setCurGudingId(16);
                App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
            }
            else if (id > 16 && id < 27) {
                Api.GameinfoVoApi.setCurGudingId(25);
                App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
            }
        }
        else {
            // NOTE: 公告图还没有出，这个先注释
            // this.showAnnoView();
        }
    };
    MainUI.prototype.initTop = function () {
        this._topContiner = new MainUITop();
        this.addChild(this._topContiner);
        //声音区分
        var type = LocalStorageMgr.get(LocalStorageConst.LOCAL_VIOICE_SWITCH);
        if (type == "true") {
            SoundMgr.setVoiceOn(true);
        }
        else {
            SoundMgr.setVoiceOn(false);
        }
    };
    MainUI.prototype.watchAd = function (evt) {
        if (evt.data && evt.data.ret) {
            var adtype = Api.AdvertiseVoApi.getAdtype();
            var rewards = evt.data.data.data.rewards;
            switch (adtype) {
                case AdConst.ADV_5:
                    ViewController.getInstance().openView(ViewConst.GETREWARDPOPUPVIEW, {
                        rewards: rewards,
                        title: LangMger.getlocal("sysGetReward"),
                        isBoxBuy: false,
                        specialBoxId: "1007",
                        handler: this,
                        needCancel: true,
                        closecallback: function () {
                            App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                        },
                    });
                    break;
                default:
                    break;
            }
        }
    };
    MainUI.prototype.freshDice = function () {
        //红点的规则是，当玩家有新获得、尚未点击的色子或战场皮肤时，这个位置将用红点数字标示；同时，对应的色子左上角将标一个【新】的icon，点击后消除，数字-1
        //绿点的规则是，标示玩家有可以升级的色子的数值。优先显示红点，红点消失后才会显示绿点
        if (!this.seizhiTxt || !this.seziCon) {
            return;
        }
        var bgres = "";
        var num = Api.DiceVoApi.getNewGetNum();
        if (num) {
            bgres = "task_reward_bg";
        }
        else {
            bgres = "sezhi_tip";
            num = Api.DiceVoApi.getDiceCanLevelUpNum();
        }
        this.seizhigreedBg.setRes(bgres);
        if (num > 0) {
            this.seizhiTxt.text = String(num);
            this.seziCon.visible = true;
        }
        else {
            this.seziCon.visible = false;
        }
    };
    MainUI.prototype.showAnnoView = function () {
        // let flag = localStorage.getItem(LocalStorageConst.LOCAL_ANNOUNCEMENT_LOGIN_SHOW);
        // let ts = localStorage.getItem(LocalStorageConst.LOCAL_ANNO_LAST_TIME);
        // if(!ts || !flag){
        // 	ViewController.getInstance().openView(ViewConst.GAMEANNOUNCEMENTVIEW);
        // 	return;
        // }
        // let f = flag == "true";
        // let tsnum = parseInt(ts);
        // let dts = Date.parse((new Date()).toString()) / 1000;
        // if(!f && App.DateUtil.isSameDay(dts, tsnum)){
        // 	return;
        // }
        // ViewController.getInstance().openView(ViewConst.GAMEANNOUNCEMENTVIEW);
    };
    MainUI.prototype.checkRedPointByModel = function (e) {
        if (!this._bottomContiner) {
            return;
        }
        var modelName = (e instanceof egret.Event) ? e.data : e;
        var btn = this._bottomContiner.getChildByName(modelName);
        if (btn) {
            if (Api[modelName + "VoApi"] && Api[modelName + "VoApi"].checkRedPoint) {
                var showRedPoint = Api[modelName + "VoApi"].checkRedPoint();
                var redSp = void 0;
                if (showRedPoint) {
                    App.CommonUtil.addIconToBDOC(btn);
                    var redpoint = btn.getChildByName("reddot");
                }
                else {
                    App.CommonUtil.removeIconFromBDOC(btn);
                }
            }
        }
    };
    MainUI.prototype.tick = function () {
    };
    MainUI.prototype.initButtom = function () {
        this._bottomContiner = new BaseDisplayObjectContainer();
        // this._bottomContiner.alpha = 0;
        //填内容
        this._bottomContiner.setPosition(0, GameConfig.stageHeigth - this._bottomContiner.height);
        this.addChild(this._bottomContiner);
        this.bottomBtnCfg[3].isOPen = this.bottomBtnCfg[3].able = Api.SwitchVoApi.getFairarenStatus();
        var bottomBg = BaseBitmap.create("ab_mainui_bottom_bg");
        bottomBg.x = 0;
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.y = -bottomBg.height;
        this._bottomContiner.addChild(bottomBg);
        var boss = new BaseDisplayObjectContainer();
        this.selcontiner = new BaseDisplayObjectContainer();
        // this.selecetBg = BaseBitmap.create("mainui_bottom_selected");
        this.selecetBg = BaseBitmap.create("ab_mainui_seleceted");
        this.selcontiner.addChild(this.selecetBg);
        this.selecetBg.x = 0;
        this.selecetBg.y = -this.selecetBg.height;
        this.leftArrow = BaseBitmap.create("mainui_bottom_arrow");
        this.leftArrow.x = this.selecetBg.x + 10;
        this.leftArrow.y = this.selecetBg.y + (this.selecetBg.height - this.leftArrow.width) / 2;
        this.selcontiner.addChild(this.leftArrow);
        this.rightArrow = BaseBitmap.create("mainui_bottom_arrow");
        this.rightArrow.x = this.selecetBg.x + this.selecetBg.width - 10;
        this.rightArrow.y = this.leftArrow.y + this.rightArrow.height;
        this.rightArrow.rotation = 180;
        this.selcontiner.addChild(this.rightArrow);
        this.selcontiner.x = this.cellWidth * 2;
        this._bottomContiner.addChild(this.selcontiner);
        var x = -5;
        for (var i = 0; i < this.bottomBtnCfg.length; i++) {
            var btncfg = this.bottomBtnCfg[i];
            var res = btncfg.btnIconImg;
            var imgBtn = ComponentMgr.getButton(res, "", this.bottomBtnClickHandler, this, [btncfg]);
            if (i != 2) {
                imgBtn.x = x + (this.cellWidth - imgBtn.width) / 2;
                x += this.cellWidth;
                imgBtn.y = -this.selecetBg.height;
            }
            else {
                imgBtn.x = x + (this.selecetBg.width - imgBtn.width) / 2;
                x += this.selecetBg.width;
                imgBtn.y = -this.selecetBg.height - 20;
                this._readyBtn = imgBtn;
            }
            imgBtn.name = btncfg.btnName;
            this._bottomContiner.addChild(imgBtn);
            // imgBtn.setEnable(btncfg.able);
            imgBtn.setGray(!btncfg.able);
            this.bottomBtns.push(imgBtn);
            //暂时开启未完成的活动与战队功能标签 以接受点击事件弹出提示”正在制作中“标签
            // if(imgBtn.name == "active" || imgBtn.name == "team")
            // {
            // 	imgBtn.setEnable(true);
            // 	imgBtn.setGray(true);
            // }
            var slipt = BaseBitmap.create("ab_mainui_bottom_slipt");
            this.slipts.push(slipt);
            this._bottomContiner.addChild(slipt);
            slipt.y = -this.selecetBg.height;
            slipt.x = x;
            var text = BaseBitmap.create(res + "2");
            text.anchorOffsetX = text.width / 2;
            text.x = imgBtn.x + text.width / 2;
            text.y = i == 2 ? -text.height - 5 : -text.height + 5;
            text.setScale(i == 2 ? 1 : 0.7);
            this._bottomContiner.addChild(text);
            this.bottomTexts.push(text);
        }
        //task_reward_bg
        var con = new BaseDisplayObjectContainer();
        var greedBg = BaseBitmap.create("sezhi_tip");
        con.addChild(greedBg);
        greedBg.x = 0;
        greedBg.y = 0;
        var seizhiTxt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_18, ColorEnums.white, false);
        con.addChild(seizhiTxt);
        seizhiTxt.textAlign = egret.HorizontalAlign.CENTER;
        seizhiTxt.width = greedBg.width;
        seizhiTxt.text = "99";
        seizhiTxt.x = 0;
        seizhiTxt.y = (greedBg.height - seizhiTxt.height) / 2;
        this.bottomBtns[1].addChild(con);
        con.x = this.bottomBtns[1].width - 30;
        con.y = 0;
        con.scaleX = 1.2;
        con.scaleY = 1.2;
        this.seizhiTxt = seizhiTxt;
        this.seizhigreedBg = greedBg;
        this.seziCon = con;
        this.seziCon.visible = false;
    };
    MainUI.prototype.bottomBtnClickHandler = function (param) {
        var _this = this;
        //提示活动与战队正在制作中
        if (!param.able) {
            var point = new egret.Point(this.bottomBtns[param.id - 1].localToGlobal().x + this.bottomBtns[param.id - 1].width / 2, this.bottomBtns[param.id - 1].localToGlobal().y);
            App.CommonUtil.showExtendTipForSecound(LangMger.getlocal("mainui_inpro_des"), 2, point, false);
            return;
        }
        this.updateLocation(param.id - 1, function () {
            var btnName = _this.getSceneName(param.btnName);
            if (btnName) {
                _this.jumpSceneByName(btnName);
            }
        });
        if (param.id == 3 && Api.GameinfoVoApi.checlIsInGuideId(24)) {
            App.CommonUtil.sendNewGuideId(24);
            Api.GameinfoVoApi.setCurGudingId(25);
            App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
        }
    };
    MainUI.prototype.getSceneName = function (btnName) {
        var scene = btnName;
        if (btnName === "active") {
            scene = Api.FairArenaVoApi.sceneName;
        }
        return scene;
    };
    /**
     * 重新计算按钮选定背景位置
     * @param index 按钮序号
     */
    MainUI.prototype.updateLocation = function (index, cb) {
        if (index == this.seleteIndex) {
            cb && cb();
            return;
        }
        var dt = 100;
        egret.Tween.removeTweens(this.selcontiner);
        this.leftArrow.visible = !(index == 0);
        this.rightArrow.visible = !(index == 4);
        egret.Tween.get(this.selcontiner)
            .to({ x: this.cellWidth * index }, dt)
            .call(function () {
            cb && cb();
        });
        var x = 0;
        for (var i = 0; i < this.bottomBtns.length; i++) {
            var btn = this.bottomBtns[i];
            var slipt = this.slipts[i];
            var txt = this.bottomTexts[i];
            egret.Tween.removeTweens(btn);
            egret.Tween.removeTweens(slipt);
            egret.Tween.removeTweens(txt);
            if (i == index) {
                egret.Tween.get(btn).to({ x: x + (this.selecetBg.width - btn.width) / 2, y: -this.selecetBg.height - 20 }, dt);
                egret.Tween.get(txt).to({ x: x + (this.selecetBg.width) / 2 }, dt);
                x += this.selecetBg.width;
                // txt.visible = true;
                txt.y = -48;
                txt.setScale(1);
            }
            else {
                egret.Tween.get(btn).to({ x: x + (this.cellWidth - btn.width) / 2, y: -this.selecetBg.height }, dt);
                egret.Tween.get(txt).to({ x: x + this.cellWidth / 2 }, dt);
                x += this.cellWidth;
                // txt.visible = false;
                txt.y = -38;
                txt.setScale(0.7);
            }
            egret.Tween.get(slipt).to({ x: x }, dt);
        }
        this.seleteIndex = index;
    };
    MainUI.prototype.jumpSceneByName = function (modelName, params) {
        var sceneName = App.StringUtil.firstCharToUper(modelName) + "Scene";
        SceneController.getInstance().go(sceneName, params);
    };
    MainUI.prototype.getResourceList = function () {
        return [];
    };
    MainUI.prototype.goShop = function (event) {
        var _this = this;
        this.updateLocation(0, function () {
            _this.jumpSceneByName(_this.bottomBtnCfg[0].btnName, { index: event.data.index });
            if (event.data.index) {
                App.MsgHelper.dispEvt(MsgConst.SCROLLTOINDEX, { index: event.data.index });
                if (!Api.SwitchVoApi.checkWxShenhe()) {
                    Api.ShopVoApi.setLightType(event.data.type);
                    App.MsgHelper.dispEvt(MsgConst.SHOWSTRESSLIGHT, { index: event.data.type });
                }
            }
        });
    };
    MainUI.prototype.goShopRoyalPass = function (evt) {
        var unit = this.bottomBtnCfg[0];
        this.updateLocation(unit.id - 1);
        var btnName = unit.btnName;
        if (btnName) {
            this.jumpSceneByName(btnName);
            if (!Api.SwitchVoApi.checkWxShenhe()) {
                Api.ShopVoApi.setLightType(ShopConst.SHOP_SPECIALVIP);
                App.MsgHelper.dispEvt(MsgConst.SHOWSTRESSLIGHT, { index: ShopConst.SHOP_SPECIALVIP });
            }
        }
    };
    MainUI.prototype.goDiceRoyalpass = function (evt) {
        var unit = this.bottomBtnCfg[1];
        this.updateLocation(unit.id - 1);
        var btnName = unit.btnName;
        if (btnName) {
            this.jumpSceneByName(btnName);
        }
    };
    MainUI.prototype.getParent = function () {
        return LayerMgr.uiLayer;
    };
    MainUI.prototype.getMsgConstEventArr = function () {
        return [
            MsgConst.REFRESH_MODEl, MsgConst.ROYAL_GOSHOP, MsgConst.ROYAL_GODICE, MsgConst.GOSHOP, MsgConst.MODEL_DICE, MsgConst.SHOW_GUIDE, MsgConst.CLOSE_GUIDE
        ];
    };
    MainUI.prototype.msgEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case MsgConst.REFRESH_MODEl:
                view.checkRedPointByModel(evt.type);
                break;
            case MsgConst.ROYAL_GOSHOP:
                view.goShopRoyalPass(evt);
                break;
            case MsgConst.ROYAL_GODICE:
                view.goDiceRoyalpass(evt);
                break;
            case MsgConst.GOSHOP:
                view.goShop(evt);
                break;
            case MsgConst.MODEL_DICE:
                view.freshDice();
                break;
            case MsgConst.SHOW_GUIDE:
                view.showGuideView(evt);
                break;
            case MsgConst.CLOSE_GUIDE:
                view.closeGuide(evt);
                break;
        }
    };
    MainUI.prototype.showGuideView = function (evt) {
        var cfg = GuideCfg.rookieCfg[Api.GameinfoVoApi.getCurGudingId()];
        var view = LayerMgr.guideLayer.getChildByName(ViewConst.GUIDEVIEW);
        if (!view) {
            var viewClass = egret.getDefinitionByName(ViewConst.GUIDEVIEW);
            if (viewClass) {
                view = new viewClass(cfg);
                LayerMgr.guideLayer.addChild(view);
            }
        }
        else {
            view.freshView(cfg);
        }
    };
    MainUI.prototype.closeGuide = function (evt) {
        var view = LayerMgr.guideLayer.getChildByName(ViewConst.GUIDEVIEW);
        if (view) {
            view.dispose();
            view = null;
        }
    };
    MainUI.prototype.dispose = function () {
        TickMgr.removeTick(this.tick, this);
        //添加需要释放的内容
        this._topContiner = null;
        this._bottomContiner = null;
        this.bottomTexts = [];
        this.seizhigreedBg = null;
        this._readyBtn = null;
        _super.prototype.dispose.call(this);
    };
    MainUI.getInstance = function () {
        if (!MainUI._instance) {
            MainUI._instance = new MainUI();
        }
        return MainUI._instance;
    };
    return MainUI;
}(BaseLoadDisplayObjectContiner));
__reflect(MainUI.prototype, "MainUI");
//# sourceMappingURL=MainUI.js.map