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
var WifebattleResultView = (function (_super) {
    __extends(WifebattleResultView, _super);
    function WifebattleResultView() {
        var _this = _super.call(this) || this;
        _this._callback = null;
        _this._target = null;
        return _this;
    }
    WifebattleResultView.prototype.isTouchMaskClose = function () {
        return true;
    };
    WifebattleResultView.prototype.initView = function () {
        var winflag = 1; //1胜利 0失败
        // this.addTouchTap(this.hide,this);
        if (this.param.data && this.param.data.target && this.param.data.callback) {
            this._target = this.param.data.target;
            this._callback = this.param.data.callback;
        }
        winflag = this.param.data.winflag;
        var point = this.param.data.point;
        var rewardnum = this.param.data.rewardnum;
        var isReview = this.param.data.isReview;
        var tip = null;
        // type = 1;
        if (winflag == 1) {
            if (App.CommonUtil.check_dragon() && RES.hasRes("shengli_ske")) {
                var bg_1 = App.DragonBonesUtil.getLoadDragonBones("shengli", -1, "appear");
                // let bg = App.DragonBonesUtil.getLoadDragonBones("shengli",{callback:()=>{
                //     bg.playAnimBehindAnim("appear","idle",0);
                // },callbackThisObj:this});     
                bg_1.playDragonMovie('appear', 1);
                bg_1.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function () {
                    bg_1.playDragonMovie('idle', 0);
                }, this);
                bg_1.x = GameConfig.stageWidth / 2 - bg_1.width / 2;
                // bg.y = 420;
                bg_1.y = GameConfig.stageHeigth / 2 - 60;
                // bg.stop();
                this.addChildToContainer(bg_1);
            }
            else {
                var bg = BaseLoadBitmap.create("wifebattlewin_bg");
                bg.width = 640;
                bg.height = 270;
                bg.x = GameConfig.stageWidth / 2 - bg.width / 2;
                // bg.y = 320;
                bg.y = GameConfig.stageHeigth / 2 - 160;
                this.addChildToContainer(bg);
                var icon = BaseLoadBitmap.create("wifebattlewin_icon");
                icon.width = 640;
                icon.height = 210;
                icon.x = GameConfig.stageWidth / 2 - icon.width / 2;
                icon.y = bg.y - icon.height + 75;
                this.addChildToContainer(icon);
                var txt = BaseLoadBitmap.create("wifebattlewin_txt");
                txt.width = 310;
                txt.height = 178;
                txt.x = GameConfig.stageWidth / 2 - txt.width / 2;
                txt.y = icon.y + 15;
                this.addChildToContainer(txt);
            }
            tip = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleResultWinTip"), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        }
        else {
            if (App.CommonUtil.check_dragon() && RES.hasRes("shibai_ske")) {
                var bg_2 = App.DragonBonesUtil.getLoadDragonBones("shibai", -1, 'appear');
                // let bg = App.DragonBonesUtil.getLoadDragonBones("shibai",{callback:()=>{
                //     bg.playAnimBehindAnim("appear","idle",0);
                // },callbackThisObj:this});
                bg_2.playDragonMovie('appear', 1);
                bg_2.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function () {
                    bg_2.playDragonMovie('idle', 0);
                }, this);
                bg_2.x = GameConfig.stageWidth / 2 - bg_2.width / 2;
                bg_2.y = GameConfig.stageHeigth / 2 - 60;
                // bg.stop();
                this.addChildToContainer(bg_2);
            }
            else {
                var bg = BaseLoadBitmap.create("wifebattlefail_bg");
                bg.width = 640;
                bg.height = 264;
                bg.x = GameConfig.stageWidth / 2 - bg.width / 2;
                bg.y = GameConfig.stageHeigth / 2 - 160;
                this.addChildToContainer(bg);
                var icon = BaseLoadBitmap.create("wifebattlefail_icon");
                icon.width = 606;
                icon.height = 198;
                icon.x = GameConfig.stageWidth / 2 - icon.width / 2;
                icon.y = bg.y - icon.height + 70;
                this.addChildToContainer(icon);
                var txt = BaseLoadBitmap.create("wifebattlefail_txt");
                txt.width = 330;
                txt.height = 186;
                txt.x = GameConfig.stageWidth / 2 - txt.width / 2;
                txt.y = icon.y + 15;
                this.addChildToContainer(txt);
            }
            tip = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleResultFailTip"), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        }
        tip.x = GameConfig.stageWidth / 2 - tip.width / 2;
        tip.y = GameConfig.stageHeigth / 2 - 90; // 400;
        this.addChildToContainer(tip);
        var scoreTip = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleResultScoreTip", [String(point), String(rewardnum)]), 24, 0x17f925);
        scoreTip.x = GameConfig.stageWidth / 2 - scoreTip.width / 2;
        scoreTip.y = tip.y + tip.height + 5;
        this.addChildToContainer(scoreTip);
        var expTip = null;
        if (!isReview) {
            var exp = Api.wifebattleVoApi.wifebattleVo.info.ylinfo ? Api.wifebattleVoApi.wifebattleVo.info.ylinfo.upexp : 0;
            expTip = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleResultPlusExp", [String(exp)]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
            expTip.x = GameConfig.stageWidth / 2 - expTip.width / 2;
            expTip.y = scoreTip.y + scoreTip.height + 5;
            this.addChildToContainer(expTip);
        }
        var rankBtn = ComponentManager.getButton("btn_common", "sysConfirm", this.hide, this);
        rankBtn.setColor(TextFieldConst.COLOR_BROWN);
        rankBtn.x = GameConfig.stageWidth / 2 - rankBtn.width / 2;
        if (expTip) {
            rankBtn.y = expTip.y + expTip.height + 10;
        }
        else {
            rankBtn.y = scoreTip.y + scoreTip.height + 20;
        }
        this.addChildToContainer(rankBtn);
    };
    WifebattleResultView.prototype.getTitleStr = function () {
        return null;
    };
    // private rankBtnHandler():void
    // {
    // }
    WifebattleResultView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    WifebattleResultView.prototype.hide = function () {
        if (this._target && this._callback) {
            this._callback.apply(this._target);
        }
        _super.prototype.hide.call(this);
    };
    WifebattleResultView.prototype.dispose = function () {
        this._callback = null;
        this._target = null;
        _super.prototype.dispose.call(this);
    };
    return WifebattleResultView;
}(BaseView));
__reflect(WifebattleResultView.prototype, "WifebattleResultView");
