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
  * 除夕
  * author 张朝阳
  * date 2018/12/20
  * @class AcNewYearSignUpSharkView
  */
var AcNewYearSignUpSharkView = (function (_super) {
    __extends(AcNewYearSignUpSharkView, _super);
    function AcNewYearSignUpSharkView() {
        var _this = _super.call(this) || this;
        _this.l = 0;
        _this.timer = 0;
        _this._isHide = false;
        _this._isTouch = false;
        _this._isHaveLantern = false;
        // private _
        _this._lihuaContainer = null;
        _this._handleRewards = null;
        _this._isInitSucceed = false;
        /**礼花配置 */
        _this._lihuaCfg = [
            { name: "lihua_hong000", scale: 2.4, x: 406, y: 80 },
            { name: "lihua_lan000", scale: 1.5, x: 148, y: 198 },
            { name: "lihua_huang000", scale: 2.4, x: 516, y: 274 },
            { name: "lihua_hong000", scale: 1.5, x: 235, y: 140 },
            { name: "lihua_lan000", scale: 2.4, x: 126, y: 272 },
            { name: "lihua_huang000", scale: 1.5, x: 497, y: 139 },
            { name: "lihua_hong000", scale: 2.4, x: 295, y: 225 },
            { name: "lihua_lan000", scale: 1.5, x: 459, y: 329 },
            { name: "lihua_huang000", scale: 2.4, x: 103, y: 243 },
            { name: "lihua_hong000", scale: 1.5, x: 447, y: 113 },
            { name: "lihua_lan000", scale: 2.4, x: 259, y: 243 },
            { name: "lihua_huang000", scale: 1.5, x: 430, y: 338 },
            { name: "lihua_hong000", scale: 2.4, x: 156, y: 137 },
            { name: "lihua_lan000", scale: 1.5, x: 402, y: 172 },
            { name: "lihua_huang000", scale: 2.4, x: 258, y: 259 },
        ];
        _this._lihuaIndex = 0;
        /**灯的配置 */
        _this._lanternCfg = [
            { scale: 0.2, x: 443, waitTime: 0, time: 8830, depth: 101 },
            { scale: 0.39, x: 517, waitTime: 600, time: 5870, depth: 104 },
            { scale: 0.50, x: 180, waitTime: 1630, time: 4440, depth: 106 },
            { scale: 0.31, x: 87, waitTime: 1370, time: 9230, depth: 103 },
            { scale: 0.26, x: 535, waitTime: 2400, time: 9100, depth: 102 },
            { scale: 0.56, x: 263, waitTime: 2800, time: 5130, depth: 105 },
        ];
        _this._lanternDescTF = null;
        return _this;
    }
    AcNewYearSignUpSharkView.prototype.initView = function () {
        var _this = this;
        if (ViewController.getInstance().getShowedView().length > 1) {
            this._isInitSucceed = false;
            this.dispose();
            return;
        }
        else {
            this._isInitSucceed = true;
        }
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETNEWYEARSIGNUPBALLON, this.receiveHandle, this);
        var vo = Api.acVoApi.getActivityVoListByAid(AcConst.AID_NEWYRARSIGNUP)[0];
        App.LogUtil.log("AcNewYearSignUpSharkView: " + vo.aid + " code:" + vo.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(vo.aid, vo.code);
        this._lihuaContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._lihuaContainer);
        egret.Tween.get(this, { loop: true }).call(this.playAniLiHua, this).wait(330);
        this._lanternDescTF = ComponentManager.getTextField(LanguageManager.getlocal("acNewYearSignUpSharkViewDesc"), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_QUALITY_YELLOW);
        this._lanternDescTF.setPosition(GameConfig.stageWidth / 2 - this._lanternDescTF.width / 2, GameConfig.stageHeigth - this._lanternDescTF.height - 22);
        this.container.addChildAt(this._lanternDescTF, 200);
        this._lihuaContainer.alpha = 0;
        this._maskBmp.alpha = 0;
        this._lanternDescTF.alpha = 0;
        egret.Tween.get(this._maskBmp).to({ alpha: 1 }, 1200).call(function () {
            egret.Tween.removeTweens(_this._maskBmp);
        }, this);
        egret.Tween.get(this._lanternDescTF).to({ alpha: 1 }, 1200).call(function () {
            egret.Tween.removeTweens(_this._lanternDescTF);
        }, this);
        egret.Tween.get(this._lihuaContainer).to({ alpha: 0.5 }, 600).call(function () {
            // this.l = cfg.ballonNum[Math.floor(cfg.ballonNum.length * Math.random())];
            _this.l = 6;
            for (var i = 0; i < _this.l; i++) {
                _this.playLanternAni(i);
            }
            _this.addTouchTap(_this.touchClick, _this);
        }, this).to({ alpha: 1 }, 600).call(function () {
            egret.Tween.removeTweens(_this._lihuaContainer);
        }, this);
    };
    /**领取奖励 */
    AcNewYearSignUpSharkView.prototype.receiveHandle = function (event) {
        if (event && event.data && event.data.ret) {
            this._handleRewards = event.data.data.data.rewards;
            this.playNewLanternAni();
        }
        else {
            this.dispose();
        }
    };
    /** 点击view事件 */
    AcNewYearSignUpSharkView.prototype.touchClick = function () {
        var vo = Api.acVoApi.getActivityVoListByAid(AcConst.AID_NEWYRARSIGNUP)[0];
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(vo.aid, vo.code);
        if (this._isHide) {
            if (!this._isTouch) {
                this.hide();
            }
        }
        else {
            if (!this._isHaveLantern) {
                this._isTouch = true;
                this._isHaveLantern = true;
                this.request(NetRequestConst.REQUST_ACTIVITY_GETNEWYEARSIGNUPBALLON, { activeId: vo.aidAndCode, mType: 1 });
                // this.playNewLanternAni();
            }
        }
    };
    AcNewYearSignUpSharkView.prototype.playEndAni = function () {
        var _this = this;
        egret.Tween.get(this._maskBmp).to({ alpha: 0 }, 1200).call(function () {
            egret.Tween.removeTweens(_this._maskBmp);
        }, this);
        egret.Tween.get(this._lanternDescTF).to({ alpha: 0 }, 1200).call(function () {
            egret.Tween.removeTweens(_this._lanternDescTF);
        }, this);
        egret.Tween.get(this._lihuaContainer).to({ alpha: 0 }, 1200).call(function () {
            egret.Tween.removeTweens(_this._lihuaContainer);
            _this.hide();
        }, this);
    };
    /**生成新的灯笼 */
    AcNewYearSignUpSharkView.prototype.playNewLanternAni = function () {
        var _this = this;
        var lanternContainer = this.getLanternContainer();
        this.container.addChildAt(lanternContainer, 150);
        var lantern = lanternContainer.getChildByName("lantern");
        var lanternLight = lanternContainer.getChildByName("lanternLight");
        var bag = lanternContainer.getChildByName("bag");
        lanternContainer.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth + 403);
        egret.Tween.get(lanternContainer).to({ y: GameConfig.stageHeigth / 2 + 200 }, 1500).call(function () {
            egret.Tween.removeTweens(lanternContainer);
            var lanternPosY = lantern.y;
            var lanternLightPosY = lanternLight.y;
            var bagPosY = bag.y;
            var movePosY = lanternContainer.y > GameConfig.stageHeigth / 2 ? -(lanternContainer.y - GameConfig.stageHeigth / 2) / 2 : (GameConfig.stageHeigth / 2 - lanternContainer.y) / 2;
            //灯笼
            egret.Tween.get(lantern).to({ rotation: 0 }, 30).to({ rotation: 1 }, 30).to({ rotation: 2 }, 30).to({ rotation: -3 }, 30).to({ rotation: 4 }, 30).to({ rotation: -5 }, 30).to({ rotation: 6 }, 30).to({ rotation: -10 }, 30).to({ rotation: 0 }, 30).to({
                y: lanternPosY - lanternContainer.y / 2
            }, 500).to({ y: lanternPosY - lanternContainer.y - (lantern.height - lantern.anchorOffsetY) - 20 }, 1000).call(function () {
                egret.Tween.removeTweens(lantern);
            }, _this);
            //灯笼灯光
            egret.Tween.get(lanternLight).to({ rotation: 0 }, 30).to({ rotation: 1 }, 30).to({ rotation: 2 }, 30).to({ rotation: -3 }, 30).to({ rotation: 4 }, 30).to({ rotation: -5 }, 30).to({ rotation: 6 }, 30).to({ rotation: -10 }, 30).to({ rotation: 0 }, 30).to({
                y: lanternLightPosY - lanternContainer.y / 2
            }, 500).to({ y: lanternLightPosY - lanternContainer.y - (lanternLight.height - lanternLight.anchorOffsetY) - 20 }, 1000).call(function () {
                egret.Tween.removeTweens(lanternLight);
            }, _this);
            //包裹
            egret.Tween.get(bag).to({ rotation: 0 }, 30).to({ rotation: -1 }, 30).to({ rotation: -2 }, 30).to({ rotation: 3 }, 30).to({ rotation: -4 }, 30).to({ rotation: 5 }, 30).to({ rotation: -6 }, 30).to({ rotation: 10 }, 30).to({ rotation: 0 }, 30).to({ scaleY: 3, scaleX: 3, y: movePosY }, 700).call(function () {
                egret.Tween.removeTweens(bag);
                var effectBM = BaseBitmap.create("acnewyearsignupview_bag_effect7");
                var effect = ComponentManager.getCustomMovieClip("acnewyearsignupview_bag_effect", 11, 30);
                effect.setPosition(bag.x - effectBM.width / 2 + 4, bag.y - effectBM.height / 2 + 120);
                effect.playWithTime(1);
                lanternContainer.addChild(effect);
                effect.setEndCallBack(function () {
                    lanternContainer.removeChild(effect);
                    effect.dispose();
                    effect = null;
                    egret.Tween.get(bag).to({ scaleY: 1, scaleX: 1, alpha: 0 }, 600).call(function () {
                        egret.Tween.removeTweens(bag);
                        _this.playEndAni();
                    }, _this);
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { rewards: _this._handleRewards, isPlayAni: true });
                    // this._isTouch = false;
                    _this._isHide = true;
                }, _this);
            }, _this);
        }, this);
    };
    AcNewYearSignUpSharkView.prototype.playLanternAni = function (index) {
        var _this = this;
        var lanternCfg = this._lanternCfg[index];
        var lanternContainer = this.getLanternContainer();
        this.container.addChildAt(lanternContainer, lanternCfg.depth);
        // let random = Math.random();
        // let containerScale = 0.25 + random * 0.75;
        // let containerTime = 6 - random * 3;
        lanternContainer.setScale(lanternCfg.scale);
        lanternContainer.setPosition(lanternCfg.x, GameConfig.stageHeigth + 403);
        // lanternContainer.setPosition(lanternContainer.width * containerScale / 2 + (GameConfig.stageWidth - lanternContainer.width * containerScale) * Math.random(), GameConfig.stageHeigth + 403)
        egret.Tween.get(lanternContainer).wait(lanternCfg.waitTime).to({ y: -lanternContainer.height * lanternCfg.scale }, lanternCfg.time).call(function () {
            egret.Tween.removeTweens(lanternContainer);
            _this.timer++;
            if (_this.timer == _this.l) {
                _this._isHide = true;
                if (!_this._isTouch) {
                    _this.playEndAni();
                }
            }
        }, this);
    };
    /**
     * 礼花动画
     */
    AcNewYearSignUpSharkView.prototype.playAniLiHua = function () {
        var _this = this;
        var lihuaCfg = this._lihuaCfg[this._lihuaIndex % this._lihuaCfg.length];
        var lihuaBM = BaseBitmap.create("lihua_hong0001");
        var lihuaclip = ComponentManager.getCustomMovieClip(lihuaCfg.name, 9, 115);
        lihuaclip.setScale(lihuaCfg.scale);
        lihuaclip.setPosition(lihuaCfg.x - lihuaBM.width * lihuaCfg.scale / 2, lihuaCfg.y - lihuaBM.height * lihuaCfg.scale / 2);
        lihuaclip.playWithTime(1);
        this._lihuaContainer.addChild(lihuaclip);
        lihuaclip.setEndCallBack(function () {
            _this._lihuaContainer.removeChild(lihuaclip);
            lihuaclip.dispose();
            lihuaclip = null;
        }, this);
        this._lihuaIndex++;
    };
    /**获得灯笼的Container */
    AcNewYearSignUpSharkView.prototype.getLanternContainer = function () {
        var lanternContainer = new BaseDisplayObjectContainer();
        var lantern = BaseLoadBitmap.create("acnewyearsignupview_common_lantern");
        lantern.width = 245;
        lantern.height = 477;
        lantern.anchorOffsetX = lantern.width / 2;
        lantern.anchorOffsetY = 403;
        lanternContainer.addChild(lantern);
        lantern.name = "lantern";
        var lanternLight = BaseLoadBitmap.create("acnewyearsignupview_common_lantern_light");
        lanternLight.width = 384;
        lanternLight.height = 532;
        lanternLight.anchorOffsetX = lanternLight.width / 2;
        lanternLight.anchorOffsetY = 388;
        lanternLight.setPosition(lantern.x, lantern.y);
        lanternContainer.addChild(lanternLight);
        egret.Tween.get(lanternLight, { loop: true }).to({ alpha: 0 }, 1000).to({ alpha: 1 }, 1000);
        lanternLight.name = "lanternLight";
        var bag = BaseLoadBitmap.create("acnewyearsignupview_common_bag");
        bag.width = 151;
        bag.height = 167;
        bag.anchorOffsetX = bag.width / 2;
        bag.anchorOffsetY = bag.height / 2;
        // bag.setPosition(lantern.x + lantern.width / 2 - bag.width / 2, lantern.y + lantern.height - 100);
        bag.setPosition(lantern.x, lantern.y);
        lanternContainer.addChild(bag);
        bag.name = "bag";
        return lanternContainer;
    };
    AcNewYearSignUpSharkView.prototype.getBgName = function () {
        return null;
    };
    // 标题背景名称
    AcNewYearSignUpSharkView.prototype.getTitleBgName = function () {
        return null;
    };
    AcNewYearSignUpSharkView.prototype.getCloseBtnName = function () {
        return null;
        ;
    };
    AcNewYearSignUpSharkView.prototype.getTitleStr = function () {
        return null;
    };
    AcNewYearSignUpSharkView.prototype.isShowLoadingMask = function () {
        return false;
    };
    /**获取资源数组 */
    AcNewYearSignUpSharkView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["lihua_hong0001", "lihua_hong0002", "lihua_hong0003", "lihua_hong0004", "lihua_hong0005",
            "lihua_hong0006", "lihua_hong0007", "lihua_hong0008", "lihua_hong0009",
            "lihua_huang0001", "lihua_huang0002", "lihua_huang0003", "lihua_huang0004", "lihua_huang0005",
            "lihua_huang0006", "lihua_huang0007", "lihua_huang0008", "lihua_huang0009",
            "lihua_lan0001", "lihua_lan0002", "lihua_lan0003", "lihua_lan0004", "lihua_lan0005",
            "lihua_lan0006", "lihua_lan0007", "lihua_lan0008", "lihua_lan0009",
            "acnewyearsignupview_bag_effect"
        ]);
    };
    AcNewYearSignUpSharkView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETNEWYEARSIGNUPBALLON, this.receiveHandle, this);
        var vo = Api.acVoApi.getActivityVoListByAid(AcConst.AID_NEWYRARSIGNUP)[0];
        egret.Tween.removeTweens(this);
        if (this._isInitSucceed) {
            if (!this._isTouch) {
                this.request(NetRequestConst.REQUST_ACTIVITY_GETNEWYEARSIGNUPBALLON, { activeId: vo.aidAndCode, mType: 0 });
            }
            // else {
            // 	this.request(NetRequestConst.REQUST_ACTIVITY_GETNEWYEARSIGNUPBALLON, { activeId: vo.aidAndCode, mType: 1 });
            // }
        }
        this.l = 0;
        this.timer = 0;
        this._isHide = false;
        this._isTouch = false;
        this._isHaveLantern = false;
        this._lihuaContainer = null;
        this._handleRewards = null;
        this._isInitSucceed = false;
        GameData.isOpenNewYearSignUpView = true;
        this._lihuaIndex = 0;
        this._lanternDescTF = null;
        _super.prototype.dispose.call(this);
    };
    return AcNewYearSignUpSharkView;
}(BaseView));
__reflect(AcNewYearSignUpSharkView.prototype, "AcNewYearSignUpSharkView");
//# sourceMappingURL=AcNewYearSignUpSharkView.js.map