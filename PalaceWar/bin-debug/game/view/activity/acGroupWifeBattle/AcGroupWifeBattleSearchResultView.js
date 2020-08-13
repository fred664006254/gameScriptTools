/**
 * 风华群芳--搜索到敌人
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcGroupWifeBattleSearchResultView = /** @class */ (function (_super) {
    __extends(AcGroupWifeBattleSearchResultView, _super);
    function AcGroupWifeBattleSearchResultView() {
        var _this = _super.call(this) || this;
        _this._callback = null;
        _this._target = null;
        _this._boneNode = null;
        _this._wifeDragon = null;
        _this.aid = null;
        _this.code = null;
        return _this;
    }
    Object.defineProperty(AcGroupWifeBattleSearchResultView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleSearchResultView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleSearchResultView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcGroupWifeBattleSearchResultView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AcGroupWifeBattleSearchResultView.prototype.isShowOpenAni = function () {
        return false;
    };
    AcGroupWifeBattleSearchResultView.prototype.initView = function () {
        var _this = this;
        this.titleTF.visible = false;
        if (this.param.data.callback && this.param.data.target) {
            this._callback = this.param.data.callback;
            this._target = this.param.data.target;
        }
        this.aid = this.param.data.aid;
        this.code = this.param.data.code;
        this.showInitView();
        egret.Tween.get(this)
            .wait(500)
            .call(function () {
            _this.addTouchTap(_this.hide, _this);
        });
        // egret.Tween.get(this)
        // .wait(3000)
        // .call(this.hide,this);
    };
    AcGroupWifeBattleSearchResultView.prototype.hide = function () {
        if (this._callback && this._target) {
            this._callback.apply(this._target);
        }
        _super.prototype.hide.call(this);
    };
    /**
     * 显示初始化View
     */
    AcGroupWifeBattleSearchResultView.prototype.showInitView = function () {
        var _this = this;
        var vo = this.vo;
        var maxInfo = vo.getEnemyMaxInfo();
        if (maxInfo == null) {
            this.hide();
            return;
        }
        var isBlue = false;
        if (maxInfo.sexflag && maxInfo.sexflag >= 1) {
            isBlue = true;
        }
        var wifeCfg = null;
        if (maxInfo.wifeid) {
            wifeCfg = Config.WifeCfg.getWifeCfgById(maxInfo.wifeid);
        }
        var server;
        if (this.vo.wifebattlecross.ainfo.qu > 0) {
            server = LanguageManager.getlocal("mergeServerOnlyqu", [String(this.vo.wifebattlecross.ainfo.qu)]);
        }
        else {
            server = LanguageManager.getlocal("ranserver2", [String(this.vo.wifebattlecross.ainfo.zid)]);
        }
        var playerName = String(this.vo.wifebattlecross.ainfo.fname + " (" + server + ")");
        var title = BaseBitmap.create("acgroupwifebattle_enemytip");
        title.x = GameConfig.stageWidth / 2 - title.width / 2 - 640;
        title.y = 70;
        this.addChildToContainer(title);
        var wifeName = ComponentManager.getTextField(playerName, 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        wifeName.x = title.x + title.width / 2 - wifeName.width / 2;
        wifeName.y = title.y + 90;
        this.addChildToContainer(wifeName);
        var titleX = GameConfig.stageWidth / 2 - title.width / 2;
        var wifeX = titleX + title.width / 2 - wifeName.width / 2;
        egret.Tween.get(title)
            .wait(1000)
            .to({ x: titleX }, 200);
        egret.Tween.get(wifeName)
            .wait(1000)
            .to({ x: wifeX }, 200);
        //扇子
        if (App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes("hydzsz_ske")) {
            this._boneNode = App.DragonBonesUtil.getLoadDragonBones("hydzsz", 1);
            this._boneNode.x = GameConfig.stageWidth / 2;
            this._boneNode.y = 800;
            this._boneNode.stop();
            this._boneNode.visible = false;
            this.addChildToContainer(this._boneNode);
            egret.Tween.get(this._boneNode)
                .wait(300)
                .call(function () {
                _this._boneNode.visible = true;
                _this._boneNode.playDragonMovie('idle', 1);
            });
        }
        else {
            var shanzi = BaseLoadBitmap.create("acgroupwifebattlesearch_bg");
            shanzi.width = 640;
            shanzi.height = 418;
            shanzi.x = GameConfig.stageWidth / 2 - shanzi.width / 2;
            shanzi.y = 468; // 800 - shanzi.height;
            this.addChildToContainer(shanzi);
        }
        //let wifeImg = "wife_full_" + wifeCfg.id;
        var wifeImg = wifeCfg.getBody(maxInfo.sexflag && maxInfo.sexflag >= 1);
        if (maxInfo.skin) {
            var myWifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(maxInfo.skin);
            wifeImg = myWifeSkinCfg.getBone(maxInfo.sexflag && maxInfo.sexflag >= 1);
            //wifeImg = myWifeSkinCfg.bone;//"wife_full3_" + maxInfo.skin;
        }
        var wifeParent = new BaseDisplayObjectContainer();
        wifeParent.width = 640;
        wifeParent.height = 728;
        wifeParent.x = 0;
        wifeParent.y = 800 + 103 - 728;
        this.addChildToContainer(wifeParent);
        var doubleGragon = App.CommonUtil.getDoubleGragon(wifeCfg.id); //
        var boneName = '';
        if (wifeImg) {
            boneName = wifeImg + "_ske";
            if (doubleGragon) {
                boneName = "wife_full_" + wifeCfg.id + "_1" + "_ske"; //wifeCfg.id
            }
        }
        //红颜
        if (App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes(boneName) && Api.wifeVoApi.isHaveBone(boneName)) {
            var mask = BaseBitmap.create("acgroupwifebattle_enemymask");
            mask.name = "mask";
            wifeParent.addChild(mask);
            wifeParent.mask = mask;
            if (doubleGragon) {
                this._wifeDragon = doubleGragon;
            }
            else {
                this._wifeDragon = App.DragonBonesUtil.getLoadDragonBones(wifeImg);
            }
            this._wifeDragon.x = GameConfig.stageWidth / 2;
            this._wifeDragon.y = 715; //728;
            wifeParent.addChild(this._wifeDragon);
            this._wifeDragon.alpha = 0;
            egret.Tween.get(this._wifeDragon)
                .wait(800)
                .to({ y: 728 - 35, alpha: 1 }, 200).call(function () {
                var talkBg = BaseBitmap.create("acgroupwifebattle_talkbg");
                var talkTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
                talkBg.name = "talkBg";
                talkTxt.name = "talkTxt";
                talkTxt.width = 200;
                var talkStr = LanguageManager.getlocal("wifeBattleEnemyTalk" + (isBlue ? "_blueType" : ""));
                talkTxt.text = talkStr;
                talkBg.width = talkTxt.width + 40;
                talkBg.height = talkTxt.height + 40 + 20;
                talkBg.scaleX = -1;
                talkBg.x = 600;
                talkBg.y = title.y + title.height + 5;
                _this.addChildToContainer(talkBg);
                talkTxt.x = talkBg.x - talkBg.width + talkBg.width / 2 - talkTxt.width / 2;
                talkTxt.y = talkBg.y + talkBg.height / 2 - talkTxt.height / 2 - 10;
                _this.addChildToContainer(talkTxt);
                if (App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes("wifebattlehudie_ske")) {
                    var hudie = App.DragonBonesUtil.getLoadDragonBones("wifebattlehudie");
                    hudie.x = talkBg.x - talkBg.width + 20;
                    hudie.y = talkBg.y + 5;
                    _this.addChildToContainer(hudie);
                    egret.Tween.get(hudie, { loop: true }).wait(5000).to({ alpha: 0 }, 200).wait(5000).to({ alpha: 1 }, 200);
                }
                egret.Tween.get(talkBg, { loop: true }).wait(5000).to({ alpha: 0 }, 200).wait(5000).to({ alpha: 1 }, 200);
                egret.Tween.get(talkTxt, { loop: true }).wait(5000).to({ alpha: 0 }, 200).wait(5000).to({ alpha: 1 }, 200);
                var closeText = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattle_clickToFight"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
                closeText.textAlign = egret.HorizontalAlign.CENTER;
                closeText.setPosition((GameConfig.stageWidth - closeText.width) / 2, GameConfig.stageHeigth - 50);
                _this.addChildToContainer(closeText);
            }, this);
        }
        else {
            if (maxInfo.skin) {
                var myWifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(maxInfo.skin);
                wifeImg = myWifeSkinCfg.getBody(maxInfo.sexflag && maxInfo.sexflag >= 1); //"wife_skin_" + maxInfo.skin;
            }
            var mask = BaseBitmap.create("acgroupwifebattle_enemymask");
            // mask.setScale(0.7);
            mask.name = "mask";
            // mask.x = wifeParent.width/2 - mask.width * 0.7/2;
            // mask.y = -88;
            wifeParent.addChild(mask);
            wifeParent.mask = mask;
            this._wifeDragon = BaseLoadBitmap.create(wifeImg);
            // this._wifeDragon.x = GameConfig.stageWidth/2;
            // this._wifeDragon.y = 715;//728;
            this._wifeDragon.width = 640;
            this._wifeDragon.height = 840;
            this._wifeDragon.setScale(0.7);
            this._wifeDragon.alpha = 0;
            this._wifeDragon.x = GameConfig.stageWidth / 2 - this._wifeDragon.width * this._wifeDragon.scaleX / 2;
            this._wifeDragon.y = 715 - 840 * 0.7; //0;//715 - 840 * 0.7;//35;
            wifeParent.addChild(this._wifeDragon);
            // this._wifeDragon.alpha = 0;
            egret.Tween.get(this._wifeDragon)
                .wait(800)
                .to({ y: 693 - 840 * 0.7, alpha: 1 }, 200).call(function () {
                var talkBg = BaseBitmap.create("acgroupwifebattle_talkbg");
                var talkTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
                talkBg.name = "talkBg";
                talkTxt.name = "talkTxt";
                talkTxt.width = 200;
                var talkStr = LanguageManager.getlocal("wifeBattleEnemyTalk" + (isBlue ? "_blueType" : ""));
                talkTxt.text = talkStr;
                talkBg.width = talkTxt.width + 40;
                talkBg.height = talkTxt.height + 40 + 20;
                talkBg.scaleX = -1;
                talkBg.x = 600;
                talkBg.y = title.y + title.height + 5;
                _this.addChildToContainer(talkBg);
                talkTxt.x = talkBg.x - talkBg.width + talkBg.width / 2 - talkTxt.width / 2;
                talkTxt.y = talkBg.y + talkBg.height / 2 - talkTxt.height / 2 - 10;
                _this.addChildToContainer(talkTxt);
                if (App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes("wifebattlehudie_ske")) {
                    var hudie = App.DragonBonesUtil.getLoadDragonBones("wifebattlehudie");
                    hudie.x = talkBg.x - talkBg.width + 20;
                    hudie.y = talkBg.y + 5;
                    _this.addChildToContainer(hudie);
                    egret.Tween.get(hudie, { loop: true }).wait(5000).to({ alpha: 0 }, 200).wait(5000).to({ alpha: 1 }, 200);
                }
                egret.Tween.get(talkBg, { loop: true }).wait(5000).to({ alpha: 0 }, 200).wait(5000).to({ alpha: 1 }, 200);
                egret.Tween.get(talkTxt, { loop: true }).wait(5000).to({ alpha: 0 }, 200).wait(5000).to({ alpha: 1 }, 200);
                var closeText = ComponentManager.getTextField(LanguageManager.getlocal("clickToClose"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
                closeText.textAlign = egret.HorizontalAlign.CENTER;
                closeText.setPosition((GameConfig.stageWidth - closeText.width) / 2, GameConfig.stageHeigth - 50);
                _this.addChildToContainer(closeText);
            }, this);
        }
    };
    AcGroupWifeBattleSearchResultView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcGroupWifeBattleSearchResultView.prototype.dispose = function () {
        egret.Tween.removeTweens(this);
        this._callback = null;
        this._target = null;
        this._boneNode = null;
        this._wifeDragon = null;
        this.aid = null;
        this.code = null;
        _super.prototype.dispose.call(this);
    };
    return AcGroupWifeBattleSearchResultView;
}(BaseView));
//# sourceMappingURL=AcGroupWifeBattleSearchResultView.js.map