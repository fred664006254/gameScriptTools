/*
    author : shaoliang
    date : 2019.10.25
    desc : 天下至尊-对手出现
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
var LadderOpponentAppearView = (function (_super) {
    __extends(LadderOpponentAppearView, _super);
    function LadderOpponentAppearView() {
        var _this = _super.call(this) || this;
        _this._boneNode = null;
        _this._playerDragon = null;
        return _this;
    }
    LadderOpponentAppearView.prototype.getTitleBgName = function () {
        return null;
    };
    LadderOpponentAppearView.prototype.getTitleStr = function () {
        return null;
    };
    LadderOpponentAppearView.prototype.isShowOpenAni = function () {
        return false;
    };
    LadderOpponentAppearView.prototype.getCloseBtnName = function () {
        return null;
    };
    LadderOpponentAppearView.prototype.isTouchMaskClose = function () {
        return true;
    };
    LadderOpponentAppearView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    LadderOpponentAppearView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "ladder_opponend_appear", "wifebattleview_enemytip", "wifebattleview_enemymask",
        ]);
    };
    LadderOpponentAppearView.prototype.initView = function () {
        var _this = this;
        this.showInitView();
        egret.Tween.get(this)
            .wait(3500)
            .call(function () {
            // this.addTouchTap(this.hide,this);
            _this.hide();
        });
    };
    LadderOpponentAppearView.prototype.showInitView = function () {
        var _this = this;
        var data = Api.laddertournamentVoApi.opponentInfo;
        if (data == null) {
            this.hide();
            return;
        }
        var title = BaseBitmap.create("wifebattleview_enemytip");
        title.x = GameConfig.stageWidth / 2 - title.width / 2;
        title.y = 70;
        title.scaleY = 0;
        this.addChildToContainer(title);
        var wifeName = ComponentManager.getTextField(data.name, 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        wifeName.x = title.x + title.width / 2 - wifeName.width / 2 - 24 - 640;
        wifeName.y = title.y + 100;
        this.addChildToContainer(wifeName);
        var wifeX = GameConfig.stageWidth / 2 - wifeName.width / 2;
        egret.Tween.get(title)
            .wait(200)
            .to({ scaleY: 1 }, 600);
        egret.Tween.get(wifeName)
            .wait(200)
            .to({ x: wifeX }, 300);
        //扇子
        if (App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes("ladderTournament_OnStage_ske")) {
            // chuxian idle
            this._boneNode = App.DragonBonesUtil.getLoadDragonBones("ladderTournament_OnStage", 1, "chuxian");
            this._boneNode.x = GameConfig.stageWidth / 2;
            this._boneNode.y = 460;
            this._boneNode.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function () {
                _this._boneNode.playDragonMovie('idle', 1);
            }, this);
            this.addChildToContainer(this._boneNode);
        }
        else {
            var shanzi = BaseBitmap.create("ladder_opponend_appear");
            shanzi.width = 587;
            shanzi.height = 552;
            shanzi.x = GameConfig.stageWidth / 2 - shanzi.width / 2;
            shanzi.y = 270; // 800 - shanzi.height;
            this.addChildToContainer(shanzi);
        }
        var wifeParent = new BaseDisplayObjectContainer();
        wifeParent.width = 640;
        wifeParent.height = 728;
        wifeParent.x = 0;
        wifeParent.y = 800 + 103 - 728;
        this.addChildToContainer(wifeParent);
        var titleId = null;
        var level = 1;
        if (data.title && data.title.clothes && data.title.clothes != "") {
            titleId = data.title.clothes;
            level = data.title.clv;
            if (level == 0) {
                level = 1;
            }
        }
        //玩家
        // let tcfg = Config.TitleCfg.getTitleCfgById(titleId);
        // let resPath = "palace_db_" + titleId + (tcfg.titleType == 7 ? `_${Api.playerVoApi.getUserSex(data.pic)}` : ``);
        // let skip = false
        // if (skip && titleId && App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes(resPath+"_ske") ) {
        //     let mask = BaseBitmap.create("wifebattleview_enemymask");
        //     mask.name = "mask";
        //     wifeParent.addChild(mask);
        //     wifeParent.mask = mask;
        //     this._playerDragon = new BaseDisplayObjectContainer();
        //     this._playerDragon.x = GameConfig.stageWidth/2;
        //     this._playerDragon.y = 700;
        //     wifeParent.addChild(this._playerDragon);
        //     let role=App.CommonUtil.getPlayerDragonRole(titleId, data.pic, level);
        //     role.name = "role";
        //     role.visible = false;
        //     this._playerDragon.addChild(role);
        //     egret.Tween.get(this._playerDragon)
        //     .wait(1200)
        //     .to({y:728-35,alpha:1},200).call(()=>{
        //         let talkBg = BaseBitmap.create("wifebattleview_talkbg"); 
        //         let talkTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
        //         talkBg.name = "talkBg";
        //         talkTxt.name = "talkTxt";
        //         talkTxt.width = 200;
        //         let key = App.MathUtil.getRandom(1,5);
        //         let talkStr = LanguageManager.getlocal("acLadder_EnemyTalk"+key);
        //         talkTxt.text = talkStr;
        //         talkBg.width = talkTxt.width + 40;
        //         talkBg.height = talkTxt.height + 40 + 20;
        //         talkBg.scaleX = -1;
        //         talkBg.x = 600;
        //         talkBg.y = title.y + title.height + 5;
        //         this.addChildToContainer(talkBg);
        //         talkTxt.x = talkBg.x - talkBg.width + talkBg.width/2 - talkTxt.width/2;
        //         talkTxt.y = talkBg.y + talkBg.height/2 - talkTxt.height/2 - 10;
        //         this.addChildToContainer(talkTxt);
        //         // if (App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes("wifebattlehudie_ske")) {
        //         //     let hudie = App.DragonBonesUtil.getLoadDragonBones("wifebattlehudie");
        //         //     hudie.x = talkBg.x - talkBg.width+20;
        //         //     hudie.y = talkBg.y+5;
        //         //     this.addChildToContainer(hudie);
        //         //     egret.Tween.get(hudie, {loop : true}).wait(5000).to({alpha : 0}, 200).wait(5000).to({alpha : 1}, 200);
        //         // }
        //         egret.Tween.get(talkBg, {loop : true}).wait(5000).to({alpha : 0}, 200).wait(5000).to({alpha : 1}, 200);
        //         egret.Tween.get(talkTxt, {loop : true}).wait(5000).to({alpha : 0}, 200).wait(5000).to({alpha : 1}, 200);        
        //         // let closeText:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("clickToClose"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        //         // closeText.textAlign = egret.HorizontalAlign.CENTER;
        //         // closeText.setPosition((GameConfig.stageWidth-closeText.width)/2,GameConfig.stageHeigth - 50);
        //         // this.addChildToContainer(closeText);
        //     }, this);
        // } else {
        if (!titleId) {
            titleId = data.level;
        }
        var mask = BaseBitmap.create("wifebattleview_enemymask");
        mask.name = "mask";
        wifeParent.addChild(mask);
        wifeParent.mask = mask;
        this._playerDragon = Api.playerVoApi.getPlayerPortrait(titleId, data.pic, 0, false, null, null, level);
        this._playerDragon.alpha = 0;
        this._playerDragon.x = GameConfig.stageWidth / 2 - this._playerDragon.width * this._playerDragon.scaleX / 2 - 15;
        this._playerDragon.y = 680;
        wifeParent.addChild(this._playerDragon);
        var posy = 680 - 840 * 0.7;
        egret.Tween.get(this._playerDragon).wait(800).to({ alpha: 1 }, 200);
        egret.Tween.get(this._playerDragon)
            .wait(1400)
            .to({ y: posy }, 300).call(function () {
            var talkBg = BaseBitmap.create("wifebattleview_talkbg");
            var talkTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
            talkBg.name = "talkBg";
            talkTxt.name = "talkTxt";
            talkTxt.width = 200;
            var key = App.MathUtil.getRandom(1, 5);
            var talkStr = LanguageManager.getlocal("acLadder_EnemyTalk" + key);
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
            // egret.Tween.get(this._playerDragon,{loop : true}).to({y : posy-10},500).to({y : posy},500);
            // egret.Tween.get(talkBg, {loop : true}).wait(5000).to({alpha : 0}, 200).wait(5000).to({alpha : 1}, 200);
            // egret.Tween.get(talkTxt, {loop : true}).wait(5000).to({alpha : 0}, 200).wait(5000).to({alpha : 1}, 200);        
        }, this);
        // }
    };
    LadderOpponentAppearView.prototype.hide = function () {
        _super.prototype.hide.call(this);
        if (Api.laddertournamentVoApi.reportVoApi) {
            ViewController.getInstance().openView(ViewConst.COMMON.LADDERFORMTIONVIEW);
        }
    };
    LadderOpponentAppearView.prototype.dispose = function () {
        egret.Tween.removeTweens(this);
        this._boneNode = null;
        this._playerDragon = null;
        _super.prototype.dispose.call(this);
    };
    return LadderOpponentAppearView;
}(BaseView));
__reflect(LadderOpponentAppearView.prototype, "LadderOpponentAppearView");
//# sourceMappingURL=LadderOpponentAppearView.js.map