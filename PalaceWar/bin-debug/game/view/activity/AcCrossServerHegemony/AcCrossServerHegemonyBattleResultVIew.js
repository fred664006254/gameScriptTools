/**
 * 战斗结果展示
 * author qianjun
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
var AcCrossServerHegemonyBattleResultVIew = (function (_super) {
    __extends(AcCrossServerHegemonyBattleResultVIew, _super);
    function AcCrossServerHegemonyBattleResultVIew() {
        var _this = _super.call(this) || this;
        _this._type = null;
        _this._callbackF = null;
        _this._obj = null;
        return _this;
    }
    AcCrossServerHegemonyBattleResultVIew.prototype.getResourceList = function () {
        var rewardPic = _super.prototype.getResourceList.call(this);
        return rewardPic.concat([
            "battle_win_word",
            "battle_win_light",
            "battle_fail_word"
        ]);
    };
    AcCrossServerHegemonyBattleResultVIew.prototype.getTitleBgName = function () {
        return null;
    };
    AcCrossServerHegemonyBattleResultVIew.prototype.getTitleStr = function () {
        return null;
    };
    AcCrossServerHegemonyBattleResultVIew.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    AcCrossServerHegemonyBattleResultVIew.prototype.isTouchMaskClose = function () {
        return true;
    };
    AcCrossServerHegemonyBattleResultVIew.prototype.initView = function () {
    };
    AcCrossServerHegemonyBattleResultVIew.prototype.init = function () {
        var view = this;
        _super.prototype.init.call(this);
        NetLoading.hide();
        view.viewBg.addTouchTap(view.hide, view);
        // if (this.param.data && this.param.data.f && this.param.data.o)
        // {
        // 	this._obj = this.param.data.o;
        // 	this._callbackF = this.param.data.f;
        // }
        var resultInfo = view.param.data;
        var isWin = resultInfo.type == 'win';
        var winBg = BaseBitmap.create("public_rule_bg");
        winBg.setPosition(GameConfig.stageWidth / 2 - winBg.width, GameConfig.stageHeigth - 568 - winBg.height / 2);
        this.addChildToContainer(winBg);
        var winBg2 = BaseBitmap.create("public_rule_bg");
        winBg2.scaleX = -1;
        winBg2.setPosition(GameConfig.stageWidth / 2 + winBg2.width - 1, GameConfig.stageHeigth - 568 - winBg2.height / 2);
        this.addChildToContainer(winBg2);
        if (!isWin) {
            App.DisplayUtil.changeToGray(winBg);
            App.DisplayUtil.changeToGray(winBg2);
        }
        var winText = BaseBitmap.create(isWin ? "battle_win_word" : "battle_fail_word");
        winText.setPosition(GameConfig.stageWidth / 2 - winText.width / 2, GameConfig.stageHeigth - 568 - winBg.height / 2 - 35);
        view.addChildToContainer(winText);
        var battleFail = ComponentManager.getTextField('', TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        var str = '';
        // if(view.param.data.wartype == 'countrywar'){
        // 	let code = Math.abs(Api.countryWarVoApi.getCityResult(view.param.data.cityId));
        // 	str = LanguageManager.getlocal(`CountryWarResult${resultInfo.type}Desc_${code}`, [LanguageManager.getlocal(`CountryWarCityName${view.param.data.cityId}`), resultInfo.alliname]);
        // 	battleFail.lineSpacing = 5;
        // }
        // else{
        str = view.param.data.lunkong ? LanguageManager.getlocal('acCrossServerHegemonyBattleReslut1') : LanguageManager.getlocal("acCrossServerHegemonyBattleReslut" + resultInfo.type + "Desc", [resultInfo.alliname]);
        battleFail.lineSpacing = 15;
        // }
        battleFail.text = str;
        battleFail.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, battleFail, winText, [0, winText.height + 25]);
        view.addChildToContainer(battleFail);
        //SoundManager.playEffect(SoundConst.EFFECT_BATTLE_FAIL);
        this.container.anchorOffsetX = GameConfig.stageWidth / 2;
        this.container.anchorOffsetY = GameConfig.stageHeigth / 2;
        this.container.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
        var showBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'allianceWarPlayBack', view.showAntiClick, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, showBtn, winBg, [20, 60]);
        view.addChildToContainer(showBtn);
        var rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'allianceWarDamageRankViewTitle', view.showDamageRankClick, view);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, rankBtn, winBg2, [-20, 60]);
        view.addChildToContainer(rankBtn);
        rankBtn.setEnable(!view.param.data.lunkong);
        this.container.scaleX = 0.1;
        this.container.scaleY = 1;
        egret.Tween.get(this.container).to({ scaleX: 1, scaleY: 1 }, 120); //.to({scaleX:1.1,scaleY:1.1},100) 
    };
    AcCrossServerHegemonyBattleResultVIew.prototype.showAntiClick = function () {
        var view = this;
        // if(view.param.data.wartype == 'countrywar'){
        // 	ViewController.getInstance().openView(ViewConst.COMMON.COUNTRYWARSHOWVIEW,{
        // 		test : view.param.data.test,
        // 		cityId : view.param.data.cityId
        // 	});
        // }
        // else{
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERHEGEMONYBATTLESHOWVIEW, {
            activeId: view.param.data.activeId,
            allianceid: view.param.data.allianceid,
            rid: view.param.data.rid,
            test: view.param.data.test
        });
        // }
    };
    AcCrossServerHegemonyBattleResultVIew.prototype.showDamageRankClick = function () {
        var view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEWARDAMAGERANKVIEW, view.param.data);
    };
    AcCrossServerHegemonyBattleResultVIew.prototype.dispose = function () {
        var view = this;
        view.viewBg.removeTouchTap();
        this._type = null;
        this._callbackF = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonyBattleResultVIew;
}(BaseView));
__reflect(AcCrossServerHegemonyBattleResultVIew.prototype, "AcCrossServerHegemonyBattleResultVIew");
//# sourceMappingURL=AcCrossServerHegemonyBattleResultVIew.js.map