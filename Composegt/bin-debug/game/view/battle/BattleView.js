/**
 * 小兵战基类
 * author shaoliang
 * date 2017/9/14
 * @class BattleView
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
var BattleView = (function (_super) {
    __extends(BattleView, _super);
    function BattleView() {
        var _this = _super.call(this) || this;
        _this._leftSoldiers = [];
        _this._rightSoldiers = [];
        /**
         *  当前死亡数量
         */
        _this._curLost = [0, 0];
        /**
         *  每条线上相遇点的坐标
         */
        _this._meetPointTab = [];
        //固定数据
        _this._preLineNum = 8;
        _this._maxLineNum = 5;
        _this._unitNunberTab = [30000, 500000, 250000];
        /**
         * 原始数量
         */
        _this._totalNum = [];
        /**
         * 原始总数量
         */
        _this._totalOldNum = [];
        /**
         * 原始损伤数量
         */
        _this._lostNum = [];
        /**
         * 显示的数量
         */
        _this._showCount = [];
        /**
         * 死亡士兵数量
         */
        _this._lostSoldier = [];
        /**
         * 平均数
         */
        _this._averageNum = [];
        /**
         * 死亡顺序
         */
        _this._lostOrder = [];
        /**
         * 当前死亡哪方  负数=左边   正数=右边 ， 0=需要获取下个
         */
        _this._curOrder = 0;
        _this._battleInfoTab = [];
        _this._isLuanzPlay = false;
        //震动开始时间
        _this._shakeStTime = 0;
        _this._isShakeing = false;
        _this._callbackF = null;
        _this._obj = null;
        _this._lastDeathTime = 0;
        _this._deathRate = 0;
        _this._rewards = null;
        _this._skipBtn = undefined;
        _this._isGameEnd = false;
        _this._bgPosY = 0;
        return _this;
    }
    // 背景图名称
    BattleView.prototype.getBgName = function () {
        return null;
    };
    BattleView.prototype.resetConfig = function () {
    };
    BattleView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "hero_anim_1", "npc_anim_1"
        ]);
    };
    BattleView.prototype.battleBgName = function () {
        return "battlebg";
    };
    BattleView.prototype.init = function () {
        _super.prototype.init.call(this);
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        this._battleBg = new BaseDisplayObjectContainer();
        this.addChildAt(this._battleBg, 1);
        var battleBg = BaseBitmap.create(this.battleBgName());
        battleBg.scaleX = (640 + 30) / 640;
        battleBg.scaleY = (1136 + 30) / 1136;
        battleBg.x = -10;
        battleBg.y = -10;
        this._battleBg.addChild(battleBg); //addChild(battleBg);
        if (GameConfig.stageHeigth < 1060) {
            this._battleBg.y -= (1060 - GameConfig.stageHeigth);
        }
        this._bgPosY = this._battleBg.y;
        this.resetConfig();
        this.calculateSoldierNumber();
        this.initRightSoldiers();
        this.initLeftSoldiers();
        this.calculateMeetPoint();
        // 开始游戏
        this._gameBtn = BaseBitmap.create(ButtonConst.BATTLE_START_BTN_1);
        this._gameBtn.addTouchTap(this.btnClick, this);
        this._gameBtn.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2 + 20);
        this.addChild(this._gameBtn);
        this._gameBtn.anchorOffsetX = this._gameBtn.width / 2;
        this._gameBtn.anchorOffsetY = this._gameBtn.height / 2;
        this.btnAnim();
    };
    BattleView.prototype.subclassInit = function () {
    };
    BattleView.prototype.btnAnim = function () {
        if (this._gameBtn) {
            egret.Tween.get(this._gameBtn).to({ scaleX: 0.9, scaleY: 0.9 }, 600).to({ scaleX: 1, scaleY: 1 }, 600).call(this.btnAnim, this);
        }
    };
    BattleView.prototype.clipAnim = function () {
        if (this._luanziClip) {
            egret.Tween.get(this._luanziClip).to({ scaleX: 2.5, scaleY: 2.5 }, 500).to({ scaleX: 2, scaleY: 2 }, 500).call(this.clipAnim, this);
        }
    };
    BattleView.prototype.btnClick = function () {
    };
    BattleView.prototype.initLeftSoldiers = function () {
        var nameTab = this.getSoldierKinds();
        var totalLine = Math.floor((this._showCount[0] - 1) / this._preLineNum);
        for (var i = 1; i <= this._showCount[0]; i++) {
            var h = (i - 1) % this._preLineNum + 1;
            var v = Math.floor((i - 1) / this._preLineNum);
            var oneMan = new Soldier();
            oneMan.init(nameTab[i - 1]);
            this._leftSoldiers.push(oneMan);
            oneMan.speed = 250 + App.MathUtil.getRandom(0, 50);
            oneMan.area = SoldierArea.LEFT;
            //斜着跑
            //  oneMan.x = 10 + h * 50 - v * 50;
            //  oneMan.y = 530 + h * 30  + v * 30;
            //横着跑
            oneMan.myIndex = i;
            if (v == totalLine) {
                var gapNum = this._preLineNum - (this._showCount[0] - this._preLineNum * v);
                h = Math.floor(gapNum / 2) + h;
            }
            oneMan.endlong = v + 1;
            oneMan.lineNumber = h;
            oneMan.x = 15 - v * 50 - (h - 1) * 10;
            oneMan.y = GameConfig.stageHeigth / 2 - 60 + (h - 1) * 45;
            oneMan.standBy();
        }
        for (var i_1 = totalLine + 1; i_1 >= 1; i_1--) {
            for (var k in this._leftSoldiers) {
                var v_1 = this._leftSoldiers[k];
                if (v_1.endlong == i_1) {
                    this._battleBg.addChild(v_1);
                }
            }
        }
    };
    BattleView.prototype.clearRightSoldiers = function () {
        for (var index = 0; index < this._rightSoldiers.length; index++) {
            var rightSoldier = this._rightSoldiers[index];
            rightSoldier.dispose();
            rightSoldier = null;
        }
        this._rightSoldiers = [];
    };
    BattleView.prototype.clearLeftSoldiers = function () {
        for (var index = 0; index < this._leftSoldiers.length; index++) {
            var leftSoldier = this._leftSoldiers[index];
            leftSoldier.dispose();
            leftSoldier = null;
        }
        this._leftSoldiers = [];
    };
    BattleView.prototype.initRightSoldiers = function () {
        var totalLine = Math.floor((this._showCount[1] - 1) / this._preLineNum);
        for (var i = 1; i <= this._showCount[1]; i++) {
            var h = (i - 1) % this._preLineNum + 1;
            var v = Math.floor((i - 1) / this._preLineNum);
            var oneMan = new Soldier();
            oneMan.init("npc1");
            this._rightSoldiers.push(oneMan);
            oneMan.speed = 200 + App.MathUtil.getRandom(0, 50);
            oneMan.myIndex = i;
            //斜着跑
            //  oneMan.x = 350 + h * 50 + v * 50;
            //  oneMan.y = 350 + h * 30 - v * 30;
            //横着跑
            if (v == totalLine) {
                var gapNum = this._preLineNum - (this._showCount[1] - this._preLineNum * v);
                h = Math.floor(gapNum / 2) + h;
            }
            oneMan.lineNumber = h;
            oneMan.endlong = v + 1;
            oneMan.area = SoldierArea.RIGHT;
            oneMan.x = 310 + v * 50 + (h - 1) * 10;
            oneMan.y = GameConfig.stageHeigth / 2 - 60 + (h - 1) * 45;
            oneMan.standBy();
            //横跑
            this.addChild(oneMan);
        }
        for (var i_2 = totalLine + 1; i_2 >= 1; i_2--) {
            for (var k in this._rightSoldiers) {
                var v_2 = this._rightSoldiers[k];
                if (v_2.endlong == i_2) {
                    this._battleBg.addChild(v_2);
                }
            }
        }
        // 斜跑时用
        // for (var i:number = this._showCount[1]-1; i>=0 ; i--) {
        // 	var oneMan:Soldier = this._rightSoldiers[i];
        // 	this.addChild(oneMan);
        // }
    };
    BattleView.prototype.calculateMeetPoint = function () {
        //计算所有相遇点的坐标
        for (var i = 0; i < this._preLineNum; i++) {
            var l = this.getSoldierWithLineNumber(i + 1, 0);
            var r = this.getSoldierWithLineNumber(i + 1, 1);
            if (l && r) {
                var d = App.MathUtil.getDistance(egret.Point.create(l.x, l.y), egret.Point.create(r.x, r.y));
                var dl = d / (l.speed + r.speed) * l.speed;
                //写着跑
                // var mx = Math.sqrt(dl * dl / 34 * 25);
                // var my = Math.sqrt(dl * dl / 34 * 9);
                //横着跑
                var mx = dl;
                var my = 0; // ((this._preLineNum - 1) / 2 - i) * 20 ;
                this._meetPointTab.push(egret.Point.create(l.x + mx, l.y + my));
            }
            else {
                this._meetPointTab.push(egret.Point.create(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2 - 60 + i * 45));
            }
        }
    };
    BattleView.prototype.getSoldierWithLineNumber = function (n, a) {
        var s = null;
        for (var i = 0; i < this._preLineNum; i++) {
            if (a == 0) {
                if (this._leftSoldiers[i] && this._leftSoldiers[i].lineNumber == n) {
                    s = this._leftSoldiers[i];
                    break;
                }
            }
            else if (a == 1) {
                if (this._rightSoldiers[i] && this._rightSoldiers[i].lineNumber == n) {
                    s = this._rightSoldiers[i];
                    break;
                }
            }
        }
        return s;
    };
    BattleView.prototype.gameBegin = function () {
        this._isGameEnd = false;
        for (var k in this._leftSoldiers) {
            var v = this._leftSoldiers[k];
            this.gotoFight(v);
        }
        for (var k in this._rightSoldiers) {
            var v = this._rightSoldiers[k];
            this.gotoFight(v);
        }
    };
    /**
     * @param sa 攻击者方位
     * @param index 被攻击者的 index
     */
    BattleView.prototype.getBeattacker = function (sa, index) {
        if (sa == SoldierArea.LEFT) {
            return this._rightSoldiers[index - 1];
        }
        else {
            return this._leftSoldiers[index - 1];
        }
    };
    BattleView.prototype.gotoFight = function (s) {
        var targetSoldierIndex = this.getTagetEnemy(s);
        if (targetSoldierIndex == 0) {
            s.standBy();
            return;
        }
        var t = this.getBeattacker(s.area, targetSoldierIndex);
        s.lineNumber = t.lineNumber;
        s.targetIndex = targetSoldierIndex;
        t.attackerTab.push(s.myIndex);
        if (s.lineNumber == s.curMeetIndex) {
            s.attack(this.attackCallBack, this);
            return;
        }
        s.curMeetIndex = 0;
        var targetPonint = this._meetPointTab[s.lineNumber - 1];
        var realPoint = egret.Point.create(targetPonint.x, targetPonint.y);
        //随机坐标
        if (s.x > realPoint.x) {
            realPoint.x += App.MathUtil.getRandom(30, 45);
        }
        else {
            realPoint.x -= App.MathUtil.getRandom(30, 45);
        }
        realPoint.y += (App.MathUtil.getRandom(0, 30) - 15);
        // if (s.y >  realPoint.y) {
        // 	realPoint.y += App.MathUtil.getRandom(10,20);
        // }
        // else {
        // 	realPoint.y -= App.MathUtil.getRandom(10,20);
        // }
        s.run(realPoint, this.attackCallBack, this);
    };
    BattleView.prototype.getTagetEnemy = function (s) {
        var lessIndex = 0;
        var lessDis;
        if (s.area == SoldierArea.LEFT) {
            for (var k in this._rightSoldiers) {
                var v = this._rightSoldiers[k];
                if (v.myStatus == SoldierStatus.GODIE) {
                    continue;
                }
                if (v.lineNumber == s.lineNumber) {
                    lessIndex = v.myIndex;
                    break;
                }
                var tempDis = App.MathUtil.getDistance(egret.Point.create(s.x, s.y), egret.Point.create(v.x, v.y));
                if (!lessDis || tempDis < lessDis) {
                    lessDis = tempDis;
                    lessIndex = v.myIndex;
                }
            }
        }
        else {
            for (var k in this._leftSoldiers) {
                var v = this._leftSoldiers[k];
                if (v.myStatus == SoldierStatus.GODIE) {
                    continue;
                }
                if (v.lineNumber == s.lineNumber) {
                    lessIndex = v.myIndex;
                    break;
                }
                var tempDis = App.MathUtil.getDistance(egret.Point.create(s.x, s.y), egret.Point.create(v.x, v.y));
                if (!lessDis || tempDis < lessDis) {
                    lessDis = tempDis;
                    lessIndex = v.myIndex;
                }
            }
        }
        return lessIndex;
    };
    BattleView.prototype.attackCallBack = function (s) {
        if (this._isLuanzPlay == false) {
            this.showLuanziClip();
        }
        //战斗卡死临时处理
        if (this._lastDeathTime > egret.getTimer()) {
            s.attack(this.attackCallBack, this);
            SoundManager.playEffect(SoundConst.EFFECT_BATTLE_ATTACK2);
        }
        else {
            var targetSoldier = this.getBeattacker(s.area, s.targetIndex);
            if (this._curOrder == 0) {
                this._curOrder = this._lostOrder[0];
                this._lostOrder.splice(0, 1);
            }
            if (targetSoldier.area == SoldierArea.LEFT && this._curOrder < 0) {
                this._curOrder++;
                this.killedTarget(s);
                SoundManager.playEffect(SoundConst.EFFECT_BATTLE_ATTACK1);
            }
            else if (targetSoldier.area == SoldierArea.RIGHT && this._curOrder > 0) {
                this._curOrder--;
                this.killedTarget(s);
                SoundManager.playEffect(SoundConst.EFFECT_BATTLE_ATTACK1);
            }
            else {
                s.attack(this.attackCallBack, this);
                SoundManager.playEffect(SoundConst.EFFECT_BATTLE_ATTACK2);
                // this.checkEnd();
            }
        }
    };
    BattleView.prototype.killedTarget = function (s) {
        var t = this.getBeattacker(s.area, s.targetIndex);
        this._curLost[t.area]++;
        t.goDie();
        for (var k in t.attackerTab) {
            var v = t.attackerTab[k];
            var a = this.getBeattacker(t.area, v);
            if (a.myStatus != SoldierStatus.GODIE) {
                this.gotoFight(a);
            }
        }
        var curResidue = this._totalNum[t.area] - this._curLost[t.area] * this._averageNum[t.area];
        if (curResidue < 0) {
            curResidue = 0;
        }
        this._battleInfoTab[t.area].curNumber = curResidue;
        // this.checkEnd();
    };
    BattleView.prototype.checkEnd = function () {
        if (this._curLost[0] == this._lostSoldier[0] && this._curLost[1] == this._lostSoldier[1]) {
            // TimerManager.doTimer(300,1,this.gameEnd,this);
            this.gameEnd();
            return;
        }
    };
    BattleView.prototype.calculateSoldierNumber = function () {
        //最大的小人总数
        var maxNumber = this._preLineNum * this._maxLineNum;
        //计算显示数量，一个兵代表数量，
        for (var i = 0; i <= 1; i++) {
            if (i == 0 && this._totalOldNum[0] <= 0) {
                this._showCount[i] = 0;
                this._averageNum[i] = 0;
                continue;
            }
            this._showCount[i] = 3 + Math.ceil(this._totalNum[i] / this._unitNunberTab[0]) - 1;
            this._showCount[i] = this._showCount[i] > maxNumber ? maxNumber : this._showCount[i];
            this._averageNum[i] = Math.ceil(this._totalNum[i] / this._showCount[i]);
        }
    };
    BattleView.prototype.calculateLostSoldierNumber = function () {
        //计算，死亡数量
        for (var i = 0; i <= 1; i++) {
            if (this._totalNum[i] <= this._lostNum[i]) {
                this._lostSoldier[i] = this._showCount[i];
            }
            else {
                this._lostSoldier[i] = Math.floor(this._lostNum[i] / this._averageNum[i]);
            }
        }
    };
    BattleView.prototype.getSoldierKinds = function () {
        //士兵图片数组
        var maxLevel = 2;
        var maxNum = 0;
        var tempTotalNum = this._totalNum[0] + this._unitNunberTab[0] * 2;
        if (tempTotalNum >= (this._unitNunberTab[1] * (this._showCount[0] - 1) + this._unitNunberTab[2])) {
            maxLevel = 3;
            maxNum = Math.floor((tempTotalNum - this._unitNunberTab[1] * this._showCount[0]) / this._unitNunberTab[2]);
        }
        else if (tempTotalNum >= (this._unitNunberTab[0] * (this._showCount[0] - 1) + this._unitNunberTab[1])) {
            maxLevel = 2;
            maxNum = Math.floor((tempTotalNum - this._unitNunberTab[0] * this._showCount[0]) / this._unitNunberTab[1]);
        }
        var nameTab = [];
        for (var i = 1; i <= this._showCount[0]; i++) {
            var level;
            if (maxNum >= i) {
                level = maxLevel - 1;
            }
            else {
                level = maxLevel;
            }
            //test code
            level = 1;
            nameTab.push("hero" + level);
        }
        return nameTab;
    };
    //计算死亡顺序
    BattleView.prototype.calculateLostTab = function () {
        //最大回合数 可调
        var maxRound = 10;
        //平均每回合死亡数量 向上取整
        var lostAverageTab = [];
        for (var i = 0; i <= 1; i++) {
            lostAverageTab[i] = Math.ceil(this._lostSoldier[i] / maxRound);
        }
        var leftOrder = [];
        //临时的 
        var tempLeftLost = this._lostSoldier[0];
        var tempRightLost = this._lostSoldier[1];
        // 两边的死亡数组 循环里可以加随机
        while (tempLeftLost > 0) {
            var value = tempLeftLost >= lostAverageTab[0] ? lostAverageTab[0] : tempLeftLost;
            value *= -1;
            leftOrder.push(value);
            tempLeftLost += value;
        }
        while (tempRightLost > 0) {
            var value = tempRightLost >= lostAverageTab[1] ? lostAverageTab[1] : tempRightLost;
            this._lostOrder.push(value);
            tempRightLost -= value;
        }
        // 把左边的数组随机插入
        var ll = leftOrder.length - 1;
        if (leftOrder.length > 0) {
            for (var i = 0; i < leftOrder.length; i++) {
                var tempValue = leftOrder[i];
                if (this._isAttackWin) {
                    var randIdx = App.MathUtil.getRandom(0, (this._lostOrder.length - 1));
                    this._lostOrder.splice(randIdx, 0, tempValue);
                }
                else {
                    var randIdx = App.MathUtil.getRandom(0, this._lostOrder.length);
                    if (ll == i) {
                        this._lostOrder.push(tempValue);
                        //  randIdx = this._lostOrder.length;
                    }
                    else {
                        this._lostOrder.splice(randIdx, 0, tempValue);
                    }
                }
            }
        }
    };
    BattleView.prototype.skipBattle = function () {
    };
    BattleView.prototype.gameEnd = function (isSkip) {
        if (isSkip === void 0) { isSkip = false; }
        if (this._isGameEnd) {
            return;
        }
        this._isGameEnd = true;
        if (this._skipBtn) {
            this._skipBtn.visible = false;
        }
        for (var k in this._leftSoldiers) {
            var v = this._leftSoldiers[k];
            if (v.myStatus != SoldierStatus.GODIE) {
                v.standBy();
            }
        }
        for (var k in this._rightSoldiers) {
            var v = this._rightSoldiers[k];
            if (v.myStatus != SoldierStatus.GODIE) {
                v.standBy();
            }
        }
        this._battleInfoTab[0].curNumber = Api.playerVoApi.getSoldier();
        this._battleInfoTab[1].curNumber = this._totalNum[1] - this._lostNum[1];
        if (this.closeBtn) {
            this.closeBtn.setEnable(true);
        }
        this.hiddenLuanziClip();
        SoundManager.stopEffect(SoundConst.EFFECT_BATTLE);
        if (isSkip == true) {
            this.showResultView();
        }
        else {
            TimerManager.doTimer(500, 1, this.showResultView, this);
        }
    };
    BattleView.prototype.showResultView = function () {
    };
    BattleView.prototype.endCallBack = function () {
    };
    BattleView.prototype.showLuanziClip = function () {
        if (!this._luanziClip) {
            var tempBitmap = BaseBitmap.create("luanz_1");
            this._luanziClip = ComponentManager.getCustomMovieClip("luanz_", 17, 50);
            this._luanziClip.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2 + tempBitmap.height / 2 + 50);
            this._luanziClip.anchorOffsetX = tempBitmap.width / 2;
            this._luanziClip.anchorOffsetY = tempBitmap.height / 2;
            // this._luanziClip.x = GameConfig.stageWidth/2 - tempBitmap.width;
            // this._luanziClip.y = GameConfig.stageHeigth/2 - tempBitmap.height/2 + 50;
            BaseBitmap.release(tempBitmap);
            this._luanziClip.setScale(2);
        }
        this.addChild(this._luanziClip);
        this._luanziClip.playWithTime(0);
        this._isLuanzPlay = true;
        this._luanziClip.alpha = 0.9;
        this.clipAnim();
        egret.startTick(this.shakeScreen, this);
    };
    BattleView.prototype.disappear = function () {
        if (this._luanziClip) {
            this._luanziClip.stop();
            egret.Tween.removeTweens(this._luanziClip);
            this.removeChild(this._luanziClip);
            this._luanziClip = null;
        }
        this._isLuanzPlay = false;
    };
    BattleView.prototype.hiddenLuanziClip = function () {
        if (!this._luanziClip) {
            return;
        }
        egret.stopTick(this.shakeScreen, this);
        egret.Tween.removeTweens(this._luanziClip);
        var picArray = [];
        for (var i = 18; i <= 20; i++) {
            picArray.push("luanz_" + i);
        }
        this._luanziClip.stop();
        this._luanziClip.goToAndPlay(0);
        this._luanziClip.frameImages = picArray;
        this._luanziClip.playFrameRate = 80;
        this._luanziClip.playWithTime(1);
        egret.Tween.get(this._luanziClip).to({ alpha: 0, scale: 4 }, 800).call(this.disappear, this);
    };
    BattleView.prototype.shakeScreen = function (timeStamp) {
        var spaceTime = 100;
        if (timeStamp < this._shakeStTime) {
            if (this._isShakeing == true && (timeStamp - this._shakeStTime) > spaceTime / 5) {
                this._battleBg.x = -10;
                this._battleBg.y = this._bgPosY;
                this._isShakeing = false;
            }
        }
        else {
            this._shakeStTime = timeStamp + 100;
            this._isShakeing = true;
            this._battleBg.x = -5 - App.MathUtil.getRandom(0, 10);
            this._battleBg.y = this._bgPosY + 5 - App.MathUtil.getRandom(0, 10);
        }
        this.checkEnd();
        return false;
    };
    BattleView.prototype.initView = function () {
    };
    BattleView.prototype.resetGameAfterWin = function () {
    };
    BattleView.prototype.hide = function (isGuid) {
        if (Api.rookieVoApi.isInGuiding == true && isGuid == null) {
            return;
        }
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        _super.prototype.hide.call(this);
        Api.rookieVoApi.checkNextStep();
    };
    BattleView.prototype.dispose = function () {
        egret.stopTick(this.shakeScreen, this);
        TimerManager.remove(this.gameEnd, this);
        TimerManager.remove(this.showResultView, this);
        for (var k1 in this._leftSoldiers) {
            var v1 = this._leftSoldiers[k1];
            egret.Tween.removeTweens(v1);
            v1.dispose();
        }
        for (var k2 in this._rightSoldiers) {
            var v2 = this._rightSoldiers[k2];
            egret.Tween.removeTweens(v2);
            v2.dispose();
        }
        this._leftSoldiers.length = 0;
        this._rightSoldiers.length = 0;
        this._curLost.length = 0;
        this._curLost = [0, 0];
        this._meetPointTab.length = 0;
        this._showCount.length = 0;
        egret.Tween.removeTweens(this._gameBtn);
        this._gameBtn.dispose();
        this._gameBtn = null;
        this._averageNum.length = 0;
        this._lostOrder.length = 0;
        this._totalOldNum.length = 0;
        this._totalNum.length = 0;
        if (this._luanziClip) {
            this._luanziClip.stop();
            egret.Tween.removeTweens(this._luanziClip);
            this._luanziClip.dispose();
        }
        this._luanziClip = null;
        this._isLuanzPlay = false;
        this._shakeStTime = 0;
        this._isShakeing = false;
        this._battleBg = null;
        this._curOrder = 0;
        for (var k3 in this._battleInfoTab) {
            var v3 = this._battleInfoTab[k3];
            v3.dispose();
        }
        this._battleInfoTab.length = 0;
        this._callbackF = null;
        this._obj = null;
        this._isAttackWin = null;
        this._lastDeathTime = 0;
        this._deathRate = 0;
        this._rewards = null;
        if (this._skipBtn) {
            this._skipBtn.dispose();
        }
        this._skipBtn = undefined;
        this._isGameEnd = false;
        _super.prototype.dispose.call(this);
    };
    return BattleView;
}(CommonView));
__reflect(BattleView.prototype, "BattleView");
