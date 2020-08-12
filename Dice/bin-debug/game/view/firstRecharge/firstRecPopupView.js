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
 * 首冲
 */
var firstRecPopupView = (function (_super) {
    __extends(firstRecPopupView, _super);
    function firstRecPopupView() {
        return _super.call(this) || this;
    }
    firstRecPopupView.prototype.initView = function () {
        this._effect = ComponentMgr.getCustomMovieClip("firstrec_effect3_", 15, 70);
        this._effect.scaleX = this._effect.scaleY = 2;
        this._effect.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(this._effect);
        this._effect.playWithTime(0);
        this._effect.y = -269;
        var _bird = BaseLoadBitmap.create("firstrec_bird");
        this.addChildToContainer(_bird);
        _bird.x = 320;
        _bird.y = -35;
        egret.Tween.get(_bird, { loop: true })
            .to({ y: -45 }, 2000)
            .to({ y: -35 }, 2000);
        var _ruleBtn = ComponentMgr.getButton("ab_public_rulebtn", "", this.onRuleBtnTap, this);
        _ruleBtn.setBtnSize(36, 36);
        this.addChildToContainer(_ruleBtn);
        _ruleBtn.x = 380;
        _ruleBtn.y = 194;
        this._ruleTipBox = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._ruleTipBox);
        this._ruleTipBox.x = _ruleBtn.x - 167;
        this._ruleTipBox.y = _ruleBtn.y - 115;
        this._ruleTipBox.visible = false;
        var _tipBg = BaseLoadBitmap.create("firstrec_tipBg");
        this._ruleTipBox.addChild(_tipBg);
        var _tipLabel = ComponentMgr.getTextField(LangMger.getlocal("firstRecText4"), TextFieldConst.SIZE_20, 0x000000);
        this._ruleTipBox.addChild(_tipLabel);
        _tipLabel.width = 382;
        _tipLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        _tipLabel.y = (109 - _tipLabel.height) / 2;
        this.initRewList();
    };
    firstRecPopupView.prototype.onRuleBtnTap = function () {
        this._ruleTipBox.visible = !this._ruleTipBox.visible;
    };
    firstRecPopupView.prototype.initRewList = function () {
        var __rews = Config.FirstrechargeCfg.getFirstRecReward();
        this._rewList = this.rewSort(GameData.formatRewardItem(__rews));
        var _rewHeight = 135;
        var _rewWidth = 133;
        var _rewY = 275;
        var _lw = _rewWidth * this._rewList.length + (24 * (this._rewList.length - 1));
        var _rewX = (this.getShowWidth() - _lw) / 2;
        var _item_d = 24;
        for (var i = 0; i < this._rewList.length; i++) {
            var _item = new firstRectItem(this._rewList[i]);
            _item.x = _rewX + (_rewWidth + _item_d) * i;
            _item.y = _rewY;
            this.addChildToContainer(_item);
        }
    };
    firstRecPopupView.prototype.rewSort = function (rew) {
        var _format = [100, 1, 2];
        var _rsl = [];
        var _loop_1 = function (i) {
            _rsl = _rsl.concat(rew.filter(function (v) { return v.type == _format[i]; }));
        };
        for (var i = 0; i < _format.length; i++) {
            _loop_1(i);
        }
        return _rsl;
    };
    firstRecPopupView.prototype.initTitle = function () {
        return;
    };
    firstRecPopupView.prototype.initBg = function () {
        this.viewBg = BaseBitmap.create(this.getBgName());
        this.addChild(this.viewBg);
    };
    firstRecPopupView.prototype.getNetConstEventArr = function () {
        return [
            NetConst.SIGNINFO_GETFIRSTRECHARGE
        ];
    };
    firstRecPopupView.prototype.netEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case NetConst.SIGNINFO_GETFIRSTRECHARGE:
                this.onRewardGet(evt);
                break;
            default:
                break;
        }
    };
    firstRecPopupView.prototype.getBgName = function () {
        return "firstrec_bg";
    };
    firstRecPopupView.prototype.getCloseBtnName = function () {
        return "firstrec_closeBtn";
    };
    firstRecPopupView.prototype.getShowWidth = function () {
        return 636;
    };
    firstRecPopupView.prototype.getShowHeight = function () {
        return 598;
    };
    firstRecPopupView.prototype.getConfirmBtnStr = function () {
        var _status = Api.SigninfoVoApi.isFirstRecharge();
        return LangMger.getlocal(_status == 0 ? "firstRecText1" : "firstRecText2");
    };
    firstRecPopupView.prototype.updateConfirmBtnStatus = function () {
        var _status = Api.SigninfoVoApi.isFirstRecharge();
        this._confirmBtn.setEnable(_status != 2);
    };
    firstRecPopupView.prototype.clickConfirmHandler = function (data) {
        var _status = Api.SigninfoVoApi.isFirstRecharge();
        switch (_status) {
            case 0:
                App.MsgHelper.dispEvt(MsgConst.GOSHOP, { index: ShopConst.SHOP_GEM_INDEX, type: ShopConst.SHOP_GEM });
                _super.prototype.clickConfirmHandler.call(this, data);
                break;
            case 1:
                this.getRewards();
                break;
            default:
                _super.prototype.clickConfirmHandler.call(this, data);
                break;
        }
    };
    firstRecPopupView.prototype.getRewards = function () {
        Api.UserinfoVoApi.setFreshInfo(false, new egret.Point(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2));
        NetManager.request(NetConst.SIGNINFO_GETFIRSTRECHARGE, {});
    };
    firstRecPopupView.prototype.onRewardGet = function (e) {
        var _this = this;
        var view = this;
        if (e.data.ret) {
            var __rews = e.data.data.data.rewards;
            ViewController.getInstance().openView(ViewConst.COMMONREWARDPOPUPVIEW, {
                rewards: __rews,
                title: LangMger.getlocal("sysGetReward"),
                handler: view,
                callback: function () {
                    App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                    _this.updateConfirmBtnStatus();
                    ViewController.getInstance().hideView(ViewConst.FIRSTRECPOPUPVIEW);
                },
                closecallback: function () {
                    App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                    _this.updateConfirmBtnStatus();
                    ViewController.getInstance().hideView(ViewConst.FIRSTRECPOPUPVIEW);
                },
            });
        }
    };
    firstRecPopupView.prototype.isTouchMaskClose = function () {
        return false;
    };
    firstRecPopupView.prototype.getResourceList = function () {
        var effs = [];
        for (var i = 1; i <= 15; i++) {
            if (i <= 8) {
                effs.push("firstrec_effect1_" + i);
                effs.push("firstrec_effect2_" + i);
            }
            effs.push("firstrec_effect3_" + i);
        }
        return _super.prototype.getResourceList.call(this).concat([
            "firstrec_bg",
            "firstrec_btnBg",
            "firstrec_closeBtn",
            "firstrec_rewardBg",
            "firstrec_bird",
            "firstrec_tipBg",
            "ab_public_rulebtn"
        ]).concat(effs);
    };
    firstRecPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.closeBtn.x = 555;
        this.closeBtn.y = this.viewBg.y - 40;
        this._confirmBtn.setBtnBitMap("firstrec_btnBg");
        this._confirmBtn.setBtnSize(240, 77);
        this._confirmBtn.x = (this.getShowWidth() - 240) / 2;
        this._confirmBtn.y -= 60;
        this._confirmBtn.setTextPos(0, 20);
        this._confirmBtn.setTextSize(30);
        this._confirmBtn.setTextStrokeColor(0x0665c3, 2);
        this.updateConfirmBtnStatus();
    };
    firstRecPopupView.prototype.dispose = function () {
        this._rewList = null;
        this._rechargeBtn = null;
        this._reciveBtn = null;
        this._ruleTipBox = null;
        this._effect = null;
        _super.prototype.dispose.call(this);
    };
    return firstRecPopupView;
}(PopupView));
__reflect(firstRecPopupView.prototype, "firstRecPopupView");
//# sourceMappingURL=firstRecPopupView.js.map