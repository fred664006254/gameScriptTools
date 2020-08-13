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
var AcTreasureHuntFightView = (function (_super) {
    __extends(AcTreasureHuntFightView, _super);
    function AcTreasureHuntFightView() {
        return _super.call(this) || this;
    }
    AcTreasureHuntFightView.prototype.getResourceList = function () {
        var tempArray = _super.prototype.getResourceList.call(this);
        return tempArray.concat([
            "treasurebg-" + this.param.data.code, 'atkrace_battle_info', 'progress8', 'progress7_bg'
        ]);
    };
    AcTreasureHuntFightView.prototype.getBgName = function () {
        return "treasurebg-" + this.param.data.code;
    };
    // 标题背景名称
    AcTreasureHuntFightView.prototype.initTitle = function () {
        return null;
    };
    // 标题背景名称
    AcTreasureHuntFightView.prototype.getTitleStr = function () {
        return null;
    };
    AcTreasureHuntFightView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseBitmap.create(bgName);
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            this.viewBg.y = (GameConfig.stageHeigth - 1136) / 2;
        }
    };
    AcTreasureHuntFightView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcTreasureHuntFightView.prototype.initView = function () {
        var view = this;
        var upHeroPic = view.param.data.npc;
        var upInfo = [
            [view.param.data.npcName, TextFieldConst.COLOR_WHITE],
        ];
        this.setUpHero(upHeroPic, upInfo, 2);
        this.setTopProgress(1000000, 1000000, GameConfig.stageWidth, 2);
        this._topProgress.y = 0;
        this._upHero.setScale(0.8);
        this._upHero.x = GameConfig.stageWidth / 2 - this._upHero.width * this._upHero.scaleX / 2;
        var downHeroPic = null;
        var downInfo = null;
        var attrV = Api.practiceVoApi.geAbilityValues();
        var totalV = String(attrV[0] + attrV[1] + attrV[2] + attrV[3]);
        downInfo = {
            level: Api.playerVoApi.getPlayerLevel(),
            title: Api.playerVoApi.getTitleid(),
            pic: Api.playerVoApi.getPlayePicId(),
            quality: totalV,
            name: Api.playerVoApi.getPlayerName(),
            plevel: Api.playerVoApi.getPlayerLevel(),
        };
        this.setDownHero(null, downInfo, 4);
        this._downHero.setScale(1);
        this._downHero.x = GameConfig.stageWidth / 2 - this._downHero.width * this._downHero.scaleX / 2 + 20;
        this._downHero.y = GameConfig.stageHeigth - 350; //- this.getTitleButtomY();
        this._upPositon = egret.Point.create(this._upHero.x, this._upHero.y);
        this._downPositon = egret.Point.create(this._downHero.x, this._downHero.y);
        egret.Tween.get(this._heroArray).wait(1500).call(function () {
            view.gameBegin();
        }, view);
    };
    AcTreasureHuntFightView.prototype.gameBegin = function () {
        this.attackHandle(1, 1000000);
    };
    AcTreasureHuntFightView.prototype.attackHandle = function (area, damage, isCrit) {
        if (this._isMoving == true) {
            return;
        }
        this._isMoving = true;
        this._heroArray.length = 0;
        this._damage = damage;
        this._area = area;
        var offsetY;
        var moveY;
        var scaleTo = 0.75;
        var offsetX;
        if (area == 1) {
            this._heroArray = [this._downHero, this._upHero];
            offsetY = 50;
            moveY = this._upHero.y + 100;
            offsetX = offsetY * (this._downHero.x - this._upHero.x) / (this._downHero.y - this._upHero.y);
        }
        else {
            this._heroArray = [this._upHero, this._downHero];
            offsetY = -50;
            moveY = this._downHero.y - 100 + this._downHero.height * (1 - scaleTo);
            offsetX = offsetY * (this._downHero.x - this._upHero.x) / (this._downHero.y - this._upHero.y);
        }
        if (this.container.getChildIndex(this._heroArray[0]) < this.container.getChildIndex(this._heroArray[1])) {
            this.container.swapChildren(this._heroArray[0], this._heroArray[1]);
        }
        var critTime = 0;
        var moveTime1 = 60;
        var moveTime2 = 260;
        var moveTo = egret.Point.create(this._heroArray[1].x + (1 - scaleTo) * this._heroArray[0].width / 2, moveY);
        var scaleBig = 1.06;
        var moveFirst = egret.Point.create(this._heroArray[0].x - (scaleBig - 1) * this._heroArray[0].width / 2, this._heroArray[0].y - (scaleBig - 1) * this._heroArray[0].height / 2);
        //hero
        egret.Tween.get(this._heroArray[0]).wait(critTime).
            to({ y: this._heroArray[0].y + (area == 1 ? 20 : -20), }, 300).
            //to({x:moveFirst.x,y:moveFirst.y,alpha : 1,scaleX:scaleBig, scaleY:scaleBig},500).
            to({ y: moveTo.y }, moveTime1).
            //to({x:moveFirst.x+offsetX, y:moveFirst.y+offsetY},150).
            to({ y: this._heroArray[0].y }, moveTime2);
        TimerManager.doTimer(critTime + 300 + moveTime1, 1, this.showBeAttackAnim, this);
    };
    AcTreasureHuntFightView.prototype.atkEndCallback = function () {
        this._upHero.setScale(0.8);
        this._upHero.x = GameConfig.stageWidth / 2 - this._upHero.width * this._upHero.scaleX / 2;
        this._downHero.x = GameConfig.stageWidth / 2 - this._downHero.width * this._downHero.scaleX / 2 + 20;
        this._downHero.y = GameConfig.stageHeigth - 350; //- this.getTitleButtomY();
        this.hide();
    };
    AcTreasureHuntFightView.prototype.hide = function () {
        this.param.data.callBack.apply(this.param.data.obj);
        _super.prototype.hide.call(this);
    };
    AcTreasureHuntFightView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcTreasureHuntFightView;
}(BaseBattleView));
__reflect(AcTreasureHuntFightView.prototype, "AcTreasureHuntFightView");
//# sourceMappingURL=AcTreasureHuntFightView.js.map