/**
 * 出海门客Tab2
 * @author 张朝阳
 * date 2019/2/18
 * @class ServantViewTab2
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
var ServantViewTab2 = (function (_super) {
    __extends(ServantViewTab2, _super);
    function ServantViewTab2() {
        var _this = _super.call(this) || this;
        _this._txtBg = null;
        _this._txtTF = null;
        _this._tip2TF = null;
        _this._boatContainerList = [];
        _this._svContainer = null;
        _this._sceneTopBg = null;
        _this._flagPosId = 0;
        _this._addBtn = null;
        _this._seatCount = 0;
        _this._fleetBuffBtn = null;
        egret.callLater(_this.initView, _this);
        return _this;
    }
    ServantViewTab2.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_BUYBANISHPOS, this.addSeatHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_FINISH, this.servantBackHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_BANISH, this.refreashView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_GETSERVANTBANISHMODEL, this.getmodleHandle, this);
        var topbg = BaseLoadBitmap.create("servantexileview_toptitlebg");
        topbg.width = 640;
        topbg.height = 70;
        topbg.y = 3 + 5;
        this.addChild(topbg);
        this._txtBg = BaseBitmap.create("public_9_bg59");
        this._txtBg.width = 157;
        this._txtBg.setPosition(topbg.x + 15, topbg.y + topbg.height / 2 - this._txtBg.height / 2);
        this.addChild(this._txtBg);
        this._txtTF = ComponentManager.getTextField(LanguageManager.getlocal("servantViewTab2ServantExileNum_exile"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._txtBg.width = this._txtTF.width + 20;
        this._txtTF.setPosition(this._txtBg.x + this._txtBg.width / 2 - this._txtTF.width / 2, this._txtBg.y + this._txtBg.height / 2 - this._txtTF.height / 2);
        this.addChild(this._txtTF);
        this._addBtn = ComponentManager.getButton("btn_common_add", null, this.addSeatClick, this);
        this._addBtn.setPosition(this._txtBg.x + this._txtBg.width + 3, this._txtBg.y + this._txtBg.height / 2 - this._addBtn.height / 2);
        this.addChild(this._addBtn);
        var tip1TF = ComponentManager.getTextField(LanguageManager.getlocal("servantViewTab2Tip1_exile", [String(Config.ExileCfg.servantNeed)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        tip1TF.setPosition(GameConfig.stageWidth - tip1TF.width - 30, topbg.y + 13);
        this.addChild(tip1TF);
        this._tip2TF = ComponentManager.getTextField(LanguageManager.getlocal("servantViewTab2Tip2_exile"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._tip2TF.setPosition(GameConfig.stageWidth - this._tip2TF.width - 30, tip1TF.y + tip1TF.height + 5);
        this.addChild(this._tip2TF);
        this._svContainer = new BaseDisplayObjectContainer();
        this._svContainer.x = GameConfig.stageWidth / 2;
        this._sceneTopBg = BaseLoadBitmap.create("servantexileview_scenetopbg");
        this._sceneTopBg.width = 640;
        this._sceneTopBg.height = 191;
        this._svContainer.addChild(this._sceneTopBg);
        var num = Config.ExileCfg.exileSeatItemCfgList.length;
        num += Api.servantExileVoApi.getTotalSeatNumber();
        var l = num % 2 == 0 ? num / 2 : Math.floor(num / 2) + 1;
        for (var i = 0; i < l; i++) {
            var sceneBg = BaseLoadBitmap.create("servantexileview_scenebg");
            sceneBg.width = 640;
            sceneBg.height = 199;
            sceneBg.setPosition(this._sceneTopBg.x, this._sceneTopBg.y + this._sceneTopBg.height + (i * sceneBg.height));
            this._svContainer.addChild(sceneBg);
        }
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth * 2, GameConfig.stageHeigth - this.getViewTitleButtomY() - 60);
        var scrollView = ComponentManager.getScrollView(this._svContainer, rect);
        scrollView.x = -GameConfig.stageWidth / 2;
        scrollView.y = 70;
        scrollView.bounces = false;
        this.addChild(scrollView);
        scrollView.name = "scrollView";
        this.playAni();
        this.initBoat(Api.servantExileVoApi.getTotalSeatNumber());
        this.refreashView();
        if (Api.switchVoApi.checkOpenExileBuff()) {
            var fleetBuffBtn = ComponentManager.getButton("exile_fleet_buff", null, function () {
                ViewController.getInstance().openView(ViewConst.POPUP.SERVANTEXILEFLEETBUFFVIEW);
            }, this);
            fleetBuffBtn.setPosition(15, 64);
            this.addChild(fleetBuffBtn);
            this._fleetBuffBtn = fleetBuffBtn;
        }
        this.request(NetRequestConst.REQUEST_SERVANT_GETSERVANTBANISHMODEL, {});
    };
    ServantViewTab2.prototype.initBoat = function (boatNum) {
        this._seatCount = boatNum;
        for (var i = 0; i < boatNum; i++) {
            this.addBoatPos(i);
        }
    };
    ServantViewTab2.prototype.addSeatClick = function () {
        if (Api.servantExileVoApi.getSeatNumber() < Config.ExileCfg.exileSeatItemCfgList.length) {
            // this.request(NetRequestConst.REQUEST_SERVANT_BUYBANISHPOS, {});
            // this.addBoatPos(this._boatContainerList.length);
            var needNum = Config.ExileCfg.exileSeatItemCfgList[Api.servantExileVoApi.getSeatNumber()].unlockGem;
            var message = LanguageManager.getlocal("servantViewTab2buySeat_exile", [String(needNum)]);
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, {
                confirmCallback: this.buySeatClick,
                handler: this,
                icon: "itemicon1",
                iconBg: "itembg_1",
                num: Api.playerVoApi.getPlayerGem(),
                useNum: needNum,
                msg: message,
                id: 1,
            });
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("servantViewShowTip2_exile"));
        }
    };
    ServantViewTab2.prototype.buySeatClick = function () {
        this.request(NetRequestConst.REQUEST_SERVANT_BUYBANISHPOS, {});
    };
    ServantViewTab2.prototype.addBoatPos = function (index) {
        this._flagPosId++;
        var boat = new ServantViewExileBoatContainer();
        if (index % 2 == 0) {
            boat.init(this._flagPosId, false);
            boat.setPosition(0, this._sceneTopBg.y + 108 + (Math.floor(index / 2) * 199));
        }
        else {
            boat.init(this._flagPosId, true);
            boat.setPosition(GameConfig.stageWidth - boat.width, this._sceneTopBg.y + 108 + (Math.floor(index / 2) * 199));
        }
        this._svContainer.addChild(boat);
        this._boatContainerList.push(boat);
    };
    ServantViewTab2.prototype.refreashView = function () {
        this._txtTF.text = LanguageManager.getlocal("servantViewTab2ServantExileNum_exile", [String(Api.servantExileVoApi.getUseSeatNumber()), String(Api.servantExileVoApi.getTotalSeatNumber())]);
        this._txtBg.width = this._txtTF.width + 20;
        this._txtTF.setPosition(this._txtBg.x + this._txtBg.width / 2 - this._txtTF.width / 2, this._txtBg.y + this._txtBg.height / 2 - this._txtTF.height / 2);
        this._addBtn.setPosition(this._txtBg.x + this._txtBg.width + 3, this._txtBg.y + this._txtBg.height / 2 - this._addBtn.height / 2);
        this._tip2TF.text = LanguageManager.getlocal("servantViewTab2Tip2_exile", [String(Api.servantExileVoApi.getRemainSeatNumber())]);
        this._tip2TF.x = GameConfig.stageWidth - this._tip2TF.width - 30;
        if (Api.servantExileVoApi.getSeatNumber() >= Config.ExileCfg.exileSeatItemCfgList.length) {
            this._addBtn.setVisible(false);
        }
        else {
            this._addBtn.setVisible(true);
        }
    };
    ServantViewTab2.prototype.addSeatHandle = function (event) {
        if (event.data.ret) {
            if (this._svContainer) {
                this._svContainer.dispose();
                this._svContainer = null;
            }
            this._svContainer = new BaseDisplayObjectContainer();
            this._svContainer.x = GameConfig.stageWidth / 2;
            this._sceneTopBg = BaseLoadBitmap.create("servantexileview_scenetopbg");
            this._sceneTopBg.width = 640;
            this._sceneTopBg.height = 191;
            this._svContainer.addChild(this._sceneTopBg);
            this._boatContainerList = [];
            var num = Config.ExileCfg.exileSeatItemCfgList.length;
            num += Api.servantExileVoApi.getTotalSeatNumber();
            var l = num % 2 == 0 ? num / 2 : Math.floor(num / 2) + 1;
            for (var i = 0; i < l; i++) {
                var sceneBg = BaseLoadBitmap.create("servantexileview_scenebg");
                sceneBg.width = 640;
                sceneBg.height = 199;
                sceneBg.setPosition(this._sceneTopBg.x, this._sceneTopBg.y + this._sceneTopBg.height + (i * sceneBg.height));
                this._svContainer.addChild(sceneBg);
            }
            var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth * 2, GameConfig.stageHeigth - this.getViewTitleButtomY() - 60);
            var tmp = this.getChildByName("scrollView");
            if (tmp) {
                tmp.dispose();
                tmp = null;
            }
            var scrollView = ComponentManager.getScrollView(this._svContainer, rect);
            scrollView.x = -GameConfig.stageWidth / 2;
            scrollView.y = 70;
            scrollView.bounces = false;
            scrollView.name = "scrollView";
            this.addChild(scrollView);
            // if (Api.switchVoApi.checkOpenExileBuff())
            // {
            // 	let fleetBuffBtn = ComponentManager.getButton("exile_fleet_buff", null, ()=>{
            // 		ViewController.getInstance().openView(ViewConst.POPUP.SERVANTEXILEFLEETBUFFVIEW);
            // 	}, this);
            // 	fleetBuffBtn.setPosition(15,10);
            // 	this._svContainer.addChild(fleetBuffBtn);
            // }
            this._flagPosId = 0;
            this.playAni();
            this.initBoat(Api.servantExileVoApi.getTotalSeatNumber());
            this.refreashView();
            // this.addBoatPos((Api.servantExileVoApi.getSeatNumber() - 1));
            // this.refreashView();
            App.CommonUtil.showTip(LanguageManager.getlocal("servantViewShowTip3_exile"));
            if (this._fleetBuffBtn) {
                this.removeChild(this._fleetBuffBtn);
                this.addChild(this._fleetBuffBtn);
            }
        }
    };
    ServantViewTab2.prototype.resetSeatHandle = function () {
        if (1) {
            if (this._svContainer) {
                this._svContainer.dispose();
                this._svContainer = null;
            }
            this._svContainer = new BaseDisplayObjectContainer();
            this._svContainer.x = GameConfig.stageWidth / 2;
            this._sceneTopBg = BaseLoadBitmap.create("servantexileview_scenetopbg");
            this._sceneTopBg.width = 640;
            this._sceneTopBg.height = 191;
            this._svContainer.addChild(this._sceneTopBg);
            this._boatContainerList = [];
            var num = Config.ExileCfg.exileSeatItemCfgList.length;
            num += Api.servantExileVoApi.getTotalSeatNumber();
            var l = num % 2 == 0 ? num / 2 : Math.floor(num / 2) + 1;
            for (var i = 0; i < l; i++) {
                var sceneBg = BaseLoadBitmap.create("servantexileview_scenebg");
                sceneBg.width = 640;
                sceneBg.height = 199;
                sceneBg.setPosition(this._sceneTopBg.x, this._sceneTopBg.y + this._sceneTopBg.height + (i * sceneBg.height));
                this._svContainer.addChild(sceneBg);
            }
            var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth * 2, GameConfig.stageHeigth - this.getViewTitleButtomY() - 60);
            var tmp = this.getChildByName("scrollView");
            if (tmp) {
                tmp.dispose();
                tmp = null;
            }
            var scrollView = ComponentManager.getScrollView(this._svContainer, rect);
            scrollView.x = -GameConfig.stageWidth / 2;
            scrollView.y = 70;
            scrollView.bounces = false;
            scrollView.name = "scrollView";
            this.addChild(scrollView);
            // if (Api.switchVoApi.checkOpenExileBuff())
            // {
            // 	let fleetBuffBtn = ComponentManager.getButton("exile_fleet_buff", null, ()=>{
            // 		ViewController.getInstance().openView(ViewConst.POPUP.SERVANTEXILEFLEETBUFFVIEW);
            // 	}, this);
            // 	fleetBuffBtn.setPosition(15,10);
            // 	this._svContainer.addChild(fleetBuffBtn);
            // }
            this._flagPosId = 0;
            this.initBoat(Api.servantExileVoApi.getTotalSeatNumber());
            this.refreashView();
            if (this._fleetBuffBtn) {
                this.removeChild(this._fleetBuffBtn);
                this.addChild(this._fleetBuffBtn);
            }
        }
    };
    /**门客召回的回调 */
    ServantViewTab2.prototype.servantBackHandle = function (event) {
        if (event.data.ret) {
            for (var key in this._boatContainerList) {
                this._boatContainerList[key].playServantExileBackAni(event.data.data.data.servantId);
            }
            this.refreashView();
            if (event.data.data.data.servantId) {
                var servantInfo = Api.servantVoApi.getServantObj(event.data.data.data.servantId);
                var message = LanguageManager.getlocal("servantExileServantBackPopupViewMessage", [servantInfo.servantName]);
                ViewController.getInstance().openView(ViewConst.POPUP.SERVANTEXILESERVANTBACKPOPUPVIEW, { message: message });
            }
        }
    };
    /**门客出海的modle */
    ServantViewTab2.prototype.getmodleHandle = function (event) {
        if (event.data.ret) {
            var servantIds = event.data.data.data.servantIds;
            if (servantIds && Object.keys(servantIds).length > 0) {
                var servantNames = "";
                for (var key in servantIds) {
                    var servantName = Api.servantVoApi.getServantObj(servantIds[key]).servantName;
                    servantNames += "," + servantName;
                    // for (let key in this._boatContainerList) {
                    // 	this._boatContainerList[key].playServantExileBackAni(servantIds[key]);
                    // }
                }
                // let servantInfo = Api.servantVoApi.getServantObj(event.data.data.data.servantId);
                var message = null;
                if (Object.keys(servantIds).length > 1) {
                    message = LanguageManager.getlocal("servantExileServantBackPopupViewMessage2", [servantNames.substr(1), String(Object.keys(servantIds).length)]);
                }
                else {
                    message = LanguageManager.getlocal("servantExileServantBackPopupViewMessage", [servantNames.substr(1)]);
                }
                ViewController.getInstance().openView(ViewConst.POPUP.SERVANTEXILESERVANTBACKPOPUPVIEW, { message: message });
            }
            if (this._seatCount != Api.servantExileVoApi.getTotalSeatNumber()) {
                this.resetSeatHandle();
            }
            this.refreashView();
        }
    };
    /**动画播放 */
    ServantViewTab2.prototype.playAni = function () {
        var num = Config.ExileCfg.exileSeatItemCfgList.length;
        num += Api.servantExileVoApi.getTotalSeatNumber();
        var l = num % 2 == 0 ? num / 2 : Math.floor(num / 2) + 1;
        var walkTime = 20000;
        // let waitTime = 20000;
        var movieClip = ComponentManager.getCustomMovieClip("servantexileview_frameanimation_walk", 8, 100);
        var movieClipBM = BaseBitmap.create("servantexileview_frameanimation_walk1");
        // movieClip.setPosition(this._sceneTopBg.x + this._sceneTopBg.width / 2, this._sceneTopBg.y + this._sceneTopBg.height + (l * 199) - movieClipBM.height);
        this._svContainer.addChild(movieClip);
        movieClip.playWithTime(-1);
        egret.Tween.get(movieClip, { loop: true }).to({
            x: this._sceneTopBg.x + this._sceneTopBg.width / 2,
            y: this._sceneTopBg.y + this._sceneTopBg.height + (l * 199) - movieClipBM.height,
        }, 0).to({
            y: this._sceneTopBg.y
        }, walkTime * (l + 1)).to({
            x: this._sceneTopBg.x + this._sceneTopBg.width / 2 - movieClipBM.width - movieClipBM.width / 2,
            y: this._sceneTopBg.y + this._sceneTopBg.height + (l * 199) - movieClipBM.height,
        }, 0).to({
            y: this._sceneTopBg.y
        }, walkTime * (l + 1));
        // let movieClip2 = ComponentManager.getCustomMovieClip("servantexileview_frameanimation_walk", 8, 150);
        // // movieClip2.setPosition(this._sceneTopBg.x + this._sceneTopBg.width / 2, this._sceneTopBg.y + this._sceneTopBg.height + (l * 199) - movieClipBM.height);
        // this._svContainer.addChild(movieClip2);
        // movieClip2.playWithTime(-1);
        // movieClip2.setVisible(false);
        var movieClipBack = ComponentManager.getCustomMovieClip("servantexileview_frameanimation_back", 8, 100);
        this._svContainer.addChild(movieClipBack);
        movieClipBack.playWithTime(-1);
        egret.Tween.get(movieClipBack, { loop: true }).to({
            x: this._sceneTopBg.x + this._sceneTopBg.width / 2 - movieClipBM.width - movieClipBM.width / 2,
            y: this._sceneTopBg.y,
        }, 0).to({
            y: this._sceneTopBg.y + this._sceneTopBg.height + (l * 199) - movieClipBM.height,
        }, walkTime * (l + 1)).to({
            x: this._sceneTopBg.x + this._sceneTopBg.width / 2,
            y: this._sceneTopBg.y,
        }, 0).to({
            y: this._sceneTopBg.y + this._sceneTopBg.height + (l * 199) - movieClipBM.height
        }, walkTime * (l + 1));
        // let movieClipBack2 = ComponentManager.getCustomMovieClip("servantexileview_frameanimation_back", 8, 150);
        // // movieClip2.setPosition(this._sceneTopBg.x + this._sceneTopBg.width / 2, this._sceneTopBg.y + this._sceneTopBg.height + (l * 199) - movieClipBM.height);
        // this._svContainer.addChild(movieClipBack2);
        // movieClipBack2.playWithTime(-1);
        // movieClipBack2.setVisible(false);
        // egret.Tween.get(this._sceneTopBg).wait(waitTime).call(() => {
        // 	movieClip2.setVisible(true);
        // 	movieClipBack2.setVisible(true);
        // 	egret.Tween.removeTweens(this._sceneTopBg);
        // 	egret.Tween.get(movieClip2, { loop: true }).to({
        // 		x: this._sceneTopBg.x + this._sceneTopBg.width / 2,
        // 		y: this._sceneTopBg.y + this._sceneTopBg.height + (l * 199) - movieClipBM.height,
        // 	}, 0).to({
        // 		y: this._sceneTopBg.y
        // 	}, walkTime * (l + 1)).to({
        // 		x: this._sceneTopBg.x + this._sceneTopBg.width / 2 - movieClipBM.width,
        // 		y: this._sceneTopBg.y + this._sceneTopBg.height + (l * 199) - movieClipBM.height,
        // 	}, 0).to({
        // 		y: this._sceneTopBg.y
        // 	}, walkTime * (l + 1));
        // 	egret.Tween.get(movieClipBack2, { loop: true }).to({
        // 		x: this._sceneTopBg.x + this._sceneTopBg.width / 2 - movieClipBM.width,
        // 		y: this._sceneTopBg.y,
        // 	}, 0).to({
        // 		y: this._sceneTopBg.y + this._sceneTopBg.height + (l * 199) - movieClipBM.height,
        // 	}, walkTime * (l + 1)).to({
        // 		x: this._sceneTopBg.x + this._sceneTopBg.width / 2,
        // 		y: this._sceneTopBg.y,
        // 	}, 0).to({
        // 		y: this._sceneTopBg.y + this._sceneTopBg.height + (l * 199) - movieClipBM.height,
        // 	}, walkTime * (l + 1));
        // }, this)
    };
    ServantViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_BUYBANISHPOS, this.addSeatHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_FINISH, this.servantBackHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_BANISH, this.refreashView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_GETSERVANTBANISHMODEL, this.getmodleHandle, this);
        egret.Tween.removeTweens(this._sceneTopBg);
        this._txtBg = null;
        this._txtTF = null;
        this._tip2TF = null;
        this._boatContainerList.length = 0;
        this._svContainer = null;
        this._sceneTopBg = null;
        this._flagPosId = 0;
        this._addBtn = null;
        this._seatCount = 0;
        this._fleetBuffBtn = null;
        _super.prototype.dispose.call(this);
    };
    return ServantViewTab2;
}(CommonViewTab));
__reflect(ServantViewTab2.prototype, "ServantViewTab2");
//# sourceMappingURL=ServantViewTab2.js.map