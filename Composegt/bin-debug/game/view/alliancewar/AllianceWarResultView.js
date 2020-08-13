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
var AllianceWarResultView = (function (_super) {
    __extends(AllianceWarResultView, _super);
    function AllianceWarResultView() {
        var _this = _super.call(this) || this;
        _this._type = null;
        _this._callbackF = null;
        _this._obj = null;
        return _this;
    }
    AllianceWarResultView.prototype.getResourceList = function () {
        var rewardPic = _super.prototype.getResourceList.call(this);
        return rewardPic.concat([
            "battle_win_word",
            "battle_win_light",
            "battle_fail_word"
        ]);
    };
    AllianceWarResultView.prototype.getTitleBgName = function () {
        return null;
    };
    AllianceWarResultView.prototype.getTitleStr = function () {
        return null;
    };
    AllianceWarResultView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    AllianceWarResultView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AllianceWarResultView.prototype.initView = function () {
    };
    AllianceWarResultView.prototype.init = function () {
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
        str = view.param.data.lunkong ? LanguageManager.getlocal('allianceWarTip3', [resultInfo.score]) : LanguageManager.getlocal("allianceResult" + resultInfo.type + "Desc", [resultInfo.alliname, view.param.data.draw ? '0' : resultInfo.score]);
        battleFail.lineSpacing = 15;
        // }
        battleFail.text = str;
        battleFail.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, battleFail, winText, [0, winText.height + (view.param.data.wartype == 'countrywar' ? 25 : 5)]);
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
    AllianceWarResultView.prototype.showAntiClick = function () {
        var view = this;
        // if(view.param.data.wartype == 'countrywar'){
        // 	ViewController.getInstance().openView(ViewConst.COMMON.COUNTRYWARSHOWVIEW,{
        // 		test : view.param.data.test,
        // 		cityId : view.param.data.cityId
        // 	});
        // }
        // else{
        ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCEWARSHOWANTIVIEW, {
            id: view.param.data.id,
            test: view.param.data.test
        });
        // }
    };
    AllianceWarResultView.prototype.showDamageRankClick = function () {
        var view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEWARDAMAGERANKVIEW, view.param.data);
    };
    AllianceWarResultView.prototype.dispose = function () {
        var view = this;
        view.viewBg.removeTouchTap();
        this._type = null;
        this._callbackF = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceWarResultView;
}(BaseView));
__reflect(AllianceWarResultView.prototype, "AllianceWarResultView");
