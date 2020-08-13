/**
 * 群芳会搜索到敌人
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
var WifebattleSearchResultView = (function (_super) {
    __extends(WifebattleSearchResultView, _super);
    function WifebattleSearchResultView() {
        var _this = _super.call(this) || this;
        _this._callback = null;
        _this._target = null;
        _this._boneNode = null;
        _this._wifeDragon = null;
        return _this;
    }
    WifebattleSearchResultView.prototype.getCloseBtnName = function () {
        return null;
    };
    WifebattleSearchResultView.prototype.isTouchMaskClose = function () {
        return true;
    };
    WifebattleSearchResultView.prototype.isShowOpenAni = function () {
        return false;
    };
    WifebattleSearchResultView.prototype.initView = function () {
        var _this = this;
        this.titleTF.visible = false;
        if (this.param.data.callback && this.param.data.target) {
            this._callback = this.param.data.callback;
            this._target = this.param.data.target;
        }
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
    WifebattleSearchResultView.prototype.hide = function () {
        if (this._callback && this._target) {
            this._callback.apply(this._target);
        }
        _super.prototype.hide.call(this);
    };
    /**
     * 显示初始化View
     */
    WifebattleSearchResultView.prototype.showInitView = function () {
        var _this = this;
        var vo = Api.wifebattleVoApi.wifebattleVo;
        var maxInfo = vo.getEnemyMaxInfo();
        if (maxInfo == null) {
            this.hide();
            return;
        }
        var wifeCfg = null;
        if (maxInfo.wifeid) {
            wifeCfg = Config.WifeCfg.getWifeCfgById(maxInfo.wifeid);
        }
        var playerName = vo.ainfo.fname;
        var title = BaseBitmap.create("wifebattleview_enemytip");
        title.x = GameConfig.stageWidth / 2 - title.width / 2 - 640;
        title.y = 70;
        this.addChildToContainer(title);
        var wifeName = ComponentManager.getTextField(playerName, 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        wifeName.x = title.x + title.width / 2 - wifeName.width / 2;
        wifeName.y = title.y + 80;
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
            var shanzi = BaseLoadBitmap.create("wifebattleviewsearch_bg");
            shanzi.width = 640;
            shanzi.height = 418;
            shanzi.x = GameConfig.stageWidth / 2 - shanzi.width / 2;
            shanzi.y = 468; // 800 - shanzi.height;
            this.addChildToContainer(shanzi);
        }
        // let wifeImg = wifeCfg.body;//"wife_full_" + wifeCfg.id;
        var wifeImg = wifeCfg.getBody(maxInfo.sexflag && maxInfo.sexflag >= 1);
        if (maxInfo.skin) {
            var myWifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(maxInfo.skin);
            wifeImg = myWifeSkinCfg.getBone(maxInfo.sexflag && maxInfo.sexflag >= 1); //"wife_full3_" + maxInfo.skin;
        }
        var wifeParent = new BaseDisplayObjectContainer();
        wifeParent.width = 640;
        wifeParent.height = 728;
        wifeParent.x = 0;
        wifeParent.y = 800 + 103 - 728;
        this.addChildToContainer(wifeParent);
        //红颜
        if (App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes(wifeImg + "_ske") && Api.wifeVoApi.isHaveBone(wifeImg + "_ske")) {
            var mask = BaseBitmap.create("wifebattleview_enemymask");
            mask.name = "mask";
            wifeParent.addChild(mask);
            wifeParent.mask = mask;
            this._wifeDragon = App.DragonBonesUtil.getLoadDragonBones(wifeImg);
            this._wifeDragon.x = GameConfig.stageWidth / 2;
            this._wifeDragon.y = 715; //728;
            wifeParent.addChild(this._wifeDragon);
            this._wifeDragon.alpha = 0;
            egret.Tween.get(this._wifeDragon)
                .wait(800)
                .to({ y: 728 - 35, alpha: 1 }, 200);
        }
        else {
            if (maxInfo.skin) {
                var myWifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(maxInfo.skin);
                wifeImg = myWifeSkinCfg.getBody(maxInfo.sexflag && maxInfo.sexflag >= 1); //"wife_skin_" + maxInfo.skin;
            }
            var mask = BaseBitmap.create("wifebattleview_enemymask");
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
                .to({ y: 693 - 840 * 0.7, alpha: 1 }, 200);
        }
    };
    WifebattleSearchResultView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    WifebattleSearchResultView.prototype.dispose = function () {
        egret.Tween.removeTweens(this);
        this._callback = null;
        this._target = null;
        _super.prototype.dispose.call(this);
    };
    return WifebattleSearchResultView;
}(BaseView));
__reflect(WifebattleSearchResultView.prototype, "WifebattleSearchResultView");
