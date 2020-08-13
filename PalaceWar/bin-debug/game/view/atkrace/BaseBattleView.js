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
/**
 * boss战基类
 */
var BaseBattleView = /** @class */ (function (_super) {
    __extends(BaseBattleView, _super);
    function BaseBattleView() {
        var _this = _super.call(this) || this;
        /**
         * 顶部血条
         */
        _this._topProgress = null;
        _this._topMaxValue = 0;
        _this._topCurValue = 0;
        _this._topProgressType = 1; // 1 ,分数  2 百分比
        /**
         * 底部血条
         */
        _this._bottomProgress = null;
        _this._bottomMaxValue = 0;
        _this._bottomCurValue = 0;
        /**
         * 上面的人物
         */
        _this._upHero = null;
        _this._upPositon = null;
        /**
         * 下面的人物
         */
        _this._downHero = null;
        _this._downPositon = null;
        _this._isMoving = false;
        _this._heroArray = [];
        _this._damage = 0;
        _this._area = 0;
        _this._isCrit = false;
        _this._damageText = null;
        _this._beAttackClip = null;
        return _this;
    }
    BaseBattleView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            this.getHitAnimSources(), "weapon_info_title", "damage_fnt", "atkrace_crit_bg", "atkrace_crit_text", "enermycrit_circle", "enermycrit_light", "critenermyflash1", "critenermyflash2", "critenermyflash3", "critenermyspeed1", "critenermyspeed2", "critenermyspeed3", "critenermyspeed4", "critenermyspeed5", "mycrit_circle", "mycrit_light", "critmyflash1", "critmyflash2", "critmyflash3", "critmyspeed1", "critmyspeed2", "critmyspeed3", "critmyspeed4", "critmyspeed5", "acwealthcarpeffect", "skinshowkuang3",
        ]);
    };
    BaseBattleView.prototype.getHitAnimSources = function () {
        return "battle_attack_anim";
    };
    BaseBattleView.prototype.getHitAnimInfo = function () {
        return ["atk_anim_", 7];
    };
    BaseBattleView.prototype.getBgName = function () {
        return this.getClassName().toLowerCase().replace("view", "") + "_bg";
    };
    BaseBattleView.prototype.init = function () {
        _super.prototype.init.call(this);
        this.container.y = this.getTitleButtomY();
        this._beAttackClip = ComponentManager.getCustomMovieClip(this.getHitAnimInfo()[0], this.getHitAnimInfo()[1], 70);
        this._beAttackClip.setEndCallBack(this.clipEndCallback, this);
    };
    // 初始化背景
    BaseBattleView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 640, 1136);
            this.viewBg = BaseLoadBitmap.create(bgName, rect);
            this.viewBg.setPosition(0, (GameConfig.stageHeigth - this.viewBg.height) / 2);
            this.addChild(this.viewBg);
        }
    };
    BaseBattleView.prototype.setTopProgress = function (value, maxValue, progressWidth, type) {
        if (type === void 0) { type = 1; }
        if (value < 0) {
            value = 0;
        }
        if (maxValue) {
            this._topMaxValue = Math.ceil(maxValue);
        }
        if (this._topProgress == null) {
            this._topProgress = ComponentManager.getProgressBar("progress8", "progress7_bg", progressWidth ? progressWidth : GameConfig.stageWidth);
            this._topProgress.setPosition((GameConfig.stageWidth - this._topProgress.width) / 2, 0);
            this.addChildToContainer(this._topProgress);
            if (!maxValue) {
                this._topMaxValue = value;
            }
            if (type) {
                this._topProgressType = type;
            }
        }
        this._topCurValue = value; //Math.ceil(value);
        if (this._topProgressType == 1) {
            this._topCurValue = Math.ceil(this._topCurValue * 100) / 100;
            var attrValue = Math.ceil(this._topCurValue);
            this._topProgress.setText(attrValue.toString() + "/" + this._topMaxValue);
            this._topProgress.setPercentage(this._topCurValue / this._topMaxValue);
        }
        else if (this._topProgressType == 3) {
            this._topProgress.setText(LanguageManager.getlocal("allianceBoss_progressTxt3"));
            this._topProgress.setPercentage(1);
        }
        else {
            var valueTemp = Math.ceil(this._topCurValue * 10000 / this._topMaxValue);
            var str = (valueTemp / 100).toString() + "%";
            this._topProgress.setText(str);
            this._topProgress.setPercentage(this._topCurValue / this._topMaxValue);
        }
    };
    BaseBattleView.prototype.setBottomProgress = function (value, maxValue, progressWidth) {
        if (value < 0) {
            value = 0;
        }
        if (this._bottomProgress == null) {
            this._bottomProgress = ComponentManager.getProgressBar("progress8", "progress7_bg", progressWidth ? progressWidth : GameConfig.stageWidth);
            this._bottomProgress.y = GameConfig.stageHeigth - this._bottomProgress.height;
            this.addChildToContainer(this._bottomProgress);
            if (maxValue) {
                this._bottomMaxValue = maxValue;
            }
            else {
                this._bottomMaxValue = value;
            }
        }
        this._bottomCurValue = value; //Math.floor(value);
        this._bottomCurValue = Math.ceil(this._bottomCurValue * 100) / 100;
        var attrValue = Math.ceil(this._bottomCurValue);
        this._bottomProgress.setText(attrValue.toString() + "/" + this._bottomMaxValue);
        this._bottomProgress.setPercentage(this._bottomCurValue / this._bottomMaxValue);
    };
    BaseBattleView.prototype.setUpHero = function (picName, info, type, eff) {
        if (this._upHero) {
            this._upHero.dispose();
            this._upHero = null;
        }
        this._upHero = new BattleHero();
        this._upHero.init(picName, info, type, 0, eff);
        this._upHero.setPosition(GameConfig.stageWidth / 2 - this._upHero.width / 2, 60);
        this._upPositon = egret.Point.create(this._upHero.x, this._upHero.y);
        this.addChildToContainer(this._upHero);
    };
    BaseBattleView.prototype.setDownHero = function (picName, info, type, eff) {
        if (this._downHero) {
            this._downHero.dispose();
            this._downHero = null;
        }
        this._downHero = new BattleHero();
        this._downHero.init(picName, info, type, 1, eff);
        this._downHero.setPosition(GameConfig.stageWidth / 2 - this._upHero.width / 2, GameConfig.stageHeigth - this._downHero.height - 60 - this.getTitleButtomY());
        this._downPositon = egret.Point.create(this._downHero.x, this._downHero.y);
        this.addChildToContainer(this._downHero);
    };
    /**
     * 攻击动画
     * @param area  1,我房  2 敌方
     */
    BaseBattleView.prototype.attackHandle = function (area, damage, isCrit) {
        var _this = this;
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
        if (isCrit == true) {
            critTime = 1530;
            this._isCrit = true;
            this.showCritAnim(area);
        }
        else {
            this._isCrit = false;
        }
        var moveTime1 = 60;
        var moveTime2 = 260;
        var moveTo = egret.Point.create(this._heroArray[1].x + (1 - scaleTo) * this._heroArray[0].width / 2, moveY);
        var scaleBig = 1.06;
        var moveFirst = egret.Point.create(this._heroArray[0].x - (scaleBig - 1) * this._heroArray[0].width / 2, this._heroArray[0].y - (scaleBig - 1) * this._heroArray[0].height / 2);
        //hero
        egret.Tween.get(this._heroArray[0]).wait(critTime).call(function () {
            if (_this._isCrit) {
                if (_this._heroArray[0]._type != 4) {
                    egret.Tween.get(_this._heroArray[0].tmpMap).to({ alpha: 1 }, 300).call(function () {
                        _this._heroArray[0].tmpMap.alpha = 0;
                        egret.Tween.removeTweens(_this._heroArray[0].tmpMap);
                    }, _this);
                }
            }
        }, this).
            to({ x: this._heroArray[0].x + (area == 1 ? 20 : -20), y: this._heroArray[0].y + (area == 1 ? 20 : -20) }, 300). //后移
            //to({x:moveFirst.x,y:moveFirst.y,alpha : 1,scaleX:scaleBig, scaleY:scaleBig},500).
            call(function () {
            if (_this._isCrit && _this._heroArray[0]._type != 4) {
                _this._heroArray[0].setMaskOffSet();
            }
        }, this).
            to({ x: moveTo.x, y: moveTo.y, scaleX: scaleTo, scaleY: scaleTo }, moveTime1).
            //to({x:moveFirst.x+offsetX, y:moveFirst.y+offsetY},150).
            call(function () {
            egret.Tween.get(_this._heroArray[0]).to({ scaleX: 1, scaleY: 1 }, 400);
        }, this).
            to({ x: this._heroArray[0].x, y: this._heroArray[0].y }, moveTime2).call(function () {
            if (_this._isCrit && _this._heroArray[0]._type != 4) {
                _this._heroArray[0].resetMaskOffSet();
            }
        }, this);
        if (this._isCrit) {
            //暴击 残影效果
        }
        TimerManager.doTimer(critTime + 300 + moveTime1, 1, this.showBeAttackAnim, this);
    };
    BaseBattleView.prototype.playHitEffcet = function () {
        SoundManager.playEffect(SoundConst.EFFECT_BATTLE_HIT);
    };
    BaseBattleView.prototype.resetTopProgressAfterDamage = function () {
        this.setTopProgress(this._topCurValue - this._damage);
    };
    /**
     * 受吉动画
     */
    BaseBattleView.prototype.showBeAttackAnim = function () {
        if (this._heroArray.length == 0) {
            return;
        }
        var beAttackHero = this._heroArray[1];
        var offsetY;
        if (this._area == 1) {
            offsetY = -30;
            this.resetTopProgressAfterDamage();
        }
        else {
            offsetY = 30;
            this.setBottomProgress(this._bottomCurValue - this._damage);
        }
        egret.Tween.get(beAttackHero).to({ y: beAttackHero.y + offsetY }, 100).to({ y: beAttackHero.y }, 120);
        var tempBitmap = BaseBitmap.create(this.getHitAnimInfo()[0] + "1");
        var hitY = beAttackHero.y + beAttackHero.height / 2 - tempBitmap.height / 2;
        if (beAttackHero._type == 4) {
            hitY = beAttackHero.y + 150 - tempBitmap.height / 2;
        }
        var posx = this._heroArray[1].x + this._heroArray[1].width / 2;
        if (this._heroArray[1].width > 460) {
            posx = this._heroArray[1].x + 200;
        }
        this._beAttackClip.setPosition(posx - tempBitmap.width / 2, hitY);
        this.addChildToContainer(this._beAttackClip);
        this._beAttackClip.goToAndPlay(0);
        this._beAttackClip.playWithTime(1);
        var fontName;
        var isBMfont = false;
        if (this._isCrit) {
            fontName = "crit_fnt";
        }
        else {
            fontName = "damage_fnt";
            isBMfont = true;
        }
        var damageY = beAttackHero.y + beAttackHero.height / 2 - 50;
        if (beAttackHero._type == 4) {
            damageY = beAttackHero.y + 200;
        }
        this._damageText = ComponentManager.getBitmapText("-" + Math.floor(this._damage).toString(), fontName, undefined, undefined, isBMfont);
        this._damageText.setPosition(posx - this._damageText.width / 2, damageY);
        this.addChildToContainer(this._damageText);
        egret.Tween.get(this._damageText).to({ y: this._damageText.y + offsetY * 3 }, 300).to({ y: this._damageText.y + offsetY * 6, alpha: 0.1 }, 600).call(this.playEnd, this);
        this.playHitEffcet();
    };
    BaseBattleView.prototype.clipEndCallback = function () {
        if (this._beAttackClip) {
            this.removeChildFromContainer(this._beAttackClip);
        }
    };
    /**
     * 暴击动画
     */
    BaseBattleView.prototype.showCritAnim = function (area) {
        var _this = this;
        var pref = area == 1 ? 'my' : 'enermy';
        var baseobject = area == 1 ? this._downHero : this._upHero;
        //黑色遮罩出现 透明度0%-70% 用时0.13秒。   
        var crit_bg = new BaseShape();
        crit_bg.graphics.beginFill(0x000000, 0.7);
        crit_bg.graphics.drawRect(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth);
        crit_bg.graphics.endFill();
        this.container.addChildAt(crit_bg, 0);
        crit_bg.alpha = 0;
        egret.Tween.get(crit_bg).to({ alpha: 0.7 }, 130).call(function () {
            //播放 闪光 序列帧
            var flash_eff = ComponentManager.getCustomMovieClip("crit" + pref + "flash", 3, 60);
            flash_eff.scaleX = flash_eff.scaleY = 2;
            flash_eff.x = baseobject.x + baseobject.width / 2 - 160 * 2;
            flash_eff.y = baseobject.y + baseobject.height / 2 - 90 * 2;
            _this.addChildToContainer(flash_eff);
            flash_eff.setEndCallBack(function () {
                _this.container.removeChild(flash_eff);
                flash_eff.dispose();
                flash_eff = null;
            }, _this);
            flash_eff.playWithTime(1);
        }, this).wait(2500).to({ alpha: 0 }, 170).call(function () {
            egret.Tween.get(crit_bg);
            _this.container.removeChild(crit_bg);
            crit_bg.dispose();
            crit_bg = null;
        }, this);
        //速度线序列帧从 X：202%  Y：15% 放大至 X：202  Y：200   （用时0.13秒）。循环1秒，然后Y轴缩放至1%后消失（用时0.13秒）
        var speed_eff = ComponentManager.getCustomMovieClip("crit" + pref + "speed", 5, 100);
        var speed_endX = (GameConfig.stageWidth - 320 * 2) / 2;
        var speed_endY = baseobject.y - (226 * 1.6 - baseobject.height) / 2;
        speed_eff.x = speed_endX;
        speed_eff.y = speed_endY;
        speed_eff.scaleX = 2;
        speed_eff.scaleY = 0.15;
        speed_eff.alpha = 0;
        var index = this.container.getChildIndex(baseobject);
        this.container.addChildAt(speed_eff, index - 1);
        speed_eff.playWithTime(-1);
        egret.Tween.get(speed_eff).wait(200).to({ scaleY: 1.6, alpha: 1 }, 130).call(function () {
            //三个光圈
            var circle_arr = [{
                    x: area == 1 ? (baseobject.x + baseobject.width / 2) : (baseobject.x - 30),
                    y: speed_eff.y + 50,
                    moveX: 10,
                    moveY: 15,
                    scale: 0.5
                }, {
                    x: area == 1 ? (baseobject.x + baseobject.width / 2 + 40) : (baseobject.x - 60),
                    y: speed_eff.y + 53,
                    moveX: -15,
                    moveY: -20,
                    scale: 0.7
                }, {
                    x: area == 1 ? (baseobject.x - 234) : (baseobject.x + baseobject.width + 80),
                    y: speed_eff.y + 100,
                    moveX: -30,
                    moveY: 0,
                    scale: 1
                }];
            var _loop_1 = function (unit) {
                var circle = BaseBitmap.create(pref + "crit_circle");
                circle.scaleX = circle.scaleY = unit.scale;
                circle.alpha = 0.7;
                var index_1 = _this.container.getChildIndex(baseobject);
                circle.x = unit.x;
                circle.y = unit.y;
                _this.container.addChildAt(circle, index_1 - 1);
                egret.Tween.get(circle).to({ x: circle.x + unit.moveX, y: circle.y + unit.moveY }, 1000).to({ scaleY: 0.01, y: circle.y + circle.height * (unit.scale - 0.01) / 2, alpha: 0 }, 130).call(function () {
                    egret.Tween.removeTweens(circle);
                    _this.container.removeChild(circle);
                    BaseBitmap.release(circle);
                    circle = null;
                }, _this);
            };
            for (var _i = 0, circle_arr_1 = circle_arr; _i < circle_arr_1.length; _i++) {
                var unit = circle_arr_1[_i];
                _loop_1(unit);
            }
            //三个横线
            var light_arr = [{
                    x: -100,
                    y: baseobject.y + 50,
                    moveX: 30
                }, {
                    x: GameConfig.stageWidth - 240 * 2 + 140,
                    y: baseobject.y + 160,
                    moveX: 30
                }, {
                    x: -50,
                    y: baseobject.y + 270,
                    moveX: 30
                }];
            var _loop_2 = function (unit) {
                var light = BaseBitmap.create(pref + "crit_light");
                var index_2 = _this.container.getChildIndex(baseobject);
                light.scaleX = 2.5;
                light.x = area == 1 ? unit.x : (GameConfig.stageWidth - unit.x - light.width * 2.5);
                light.y = unit.y;
                _this.container.addChildAt(light, index_2 + 1);
                egret.Tween.get(light).to({ x: light.x + unit.moveX }, 1000).to({ scaleY: 0.01, y: light.y + light.height * (1 - 0.01) / 2, alpha: 0 }, 130).call(function () {
                    egret.Tween.removeTweens(light);
                    _this.container.removeChild(light);
                    BaseBitmap.release(light);
                    light = null;
                }, _this);
            };
            for (var _a = 0, light_arr_1 = light_arr; _a < light_arr_1.length; _a++) {
                var unit = light_arr_1[_a];
                _loop_2(unit);
            }
        }, this).wait(1000).to({ scaleY: 0.01, x: speed_endX, y: speed_endY + 226 * (2 - 0.01) / 2, alpha: 0 }, 130).call(function () {
            egret.Tween.removeTweens(speed_eff);
            _this.container.removeChild(speed_eff);
            speed_eff.dispose();
            speed_eff = null;
        }, this);
        //暴击字体从尺寸400%，透明度33% 至  尺寸125% 透明度100%。（用时0.13秒） 再放大至135%（0.06秒）
        var crittext_eff = BaseBitmap.create("atkrace_crit_text");
        crittext_eff.alpha = 0;
        crittext_eff.scaleX = crittext_eff.scaleY = 4;
        var endX = area == 1 ? (80) : (baseobject.x + baseobject.width);
        var endY = baseobject.y + baseobject.height / 2 - 75 * 0.7;
        crittext_eff.x = endX - (4 - 1) * 137 / 2;
        crittext_eff.y = endY - (4 - 1) * 75 / 2;
        this.addChildToContainer(crittext_eff);
        egret.Tween.get(crittext_eff).
            to({ alpha: 0.33 }, 260).
            to({ alpha: 1, scaleX: 1.25, scaleY: 1.25, x: endX - (1.25 - 1) * 137 / 2, y: endY - (1.25 - 1) * 75 / 2 }, 130).
            to({ scaleX: 1.35, scaleY: 1.35, x: endX - (1.35 - 1) * 137 / 2, y: endY - (1.35 - 1) * 75 / 2 }, 60).
            wait(880).
            to({ x: (area == 1 ? (0 - 1.35 * 137) : (GameConfig.stageWidth)), alpha: 0 }, 200).
            call(function () {
            //后续移除
            egret.Tween.removeTweens(crittext_eff);
            _this.container.removeChild(crittext_eff);
            BaseBitmap.release(crittext_eff);
            crittext_eff = null;
        }, this);
        //暴击字体黑色背景淡入出现（用时0.13秒）
        var fontbg = BaseBitmap.create("atkrace_crit_bg");
        var ftindex = this.container.getChildIndex(crittext_eff);
        fontbg.x = endX - (1.35 - 1) * 137 / 2 - (258 - 1.35 * 137) / 2;
        fontbg.y = endY - (1.35 - 1) * 75 / 2 - (80 - 1.35 * 75) / 2;
        fontbg.alpha = 0;
        this.container.addChildAt(fontbg, ftindex - 1);
        egret.Tween.get(fontbg).wait(400).to({ alpha: 1 }, 130).wait(800).
            to({ x: (area == 1 ? (0 - 258) : (GameConfig.stageWidth)), alpha: 0 }, 200).
            call(function () {
            egret.Tween.removeTweens(fontbg);
            _this.container.removeChild(fontbg);
            BaseBitmap.release(fontbg);
            fontbg = null;
        }, this);
        //0.26秒 角色变色，持续0.06秒，然后变回原色（0.2秒）
        if (baseobject._type == 4) {
        }
        else {
            egret.Tween.get(baseobject.tmpMap).wait(260).to({ alpha: 1 }, 10).wait(60).to({ alpha: 0 }, 200).call(function () {
                egret.Tween.removeTweens(baseobject.tmpMap);
            }, this);
        }
    };
    BaseBattleView.prototype.playEnd = function () {
        this.removeChildFromContainer(this._damageText);
        this._damageText = null;
        this._isMoving = false;
        egret.Tween.removeTweens(this._upHero);
        egret.Tween.removeTweens(this._downHero);
        this._upHero.setScale(1);
        this._downHero.setScale(1);
        this._upHero.setPosition(this._upPositon.x, this._upPositon.y);
        this._downHero.setPosition(this._downPositon.x, this._downPositon.y);
        this.atkEndCallback();
    };
    BaseBattleView.prototype.atkEndCallback = function () {
    };
    BaseBattleView.prototype.initView = function () {
    };
    /**
     * @param type 1,下面， 2上面
     * @param sid 门客ID
     * @param value 加成，没有的话取自己的神器
     * @param atype 战斗类型
     */
    BaseBattleView.prototype.setDownWeaponInfo = function (sid, value, atype) {
        var oneinfo = new WeaponInfoNode();
        oneinfo.init(sid, value, atype);
        oneinfo.setPosition(20, GameConfig.stageHeigth - 300);
        this.addChild(oneinfo);
    };
    BaseBattleView.prototype.setUpWeaponInfo = function (sid, value, atype) {
        var oneinfo = new WeaponInfoNode();
        oneinfo.init(sid, value, atype);
        oneinfo.setPosition(GameConfig.stageWidth - 10 - oneinfo.width, 180);
        this.addChild(oneinfo);
    };
    BaseBattleView.prototype.dispose = function () {
        this._topProgress = null;
        this._bottomProgress = null;
        this._topMaxValue = 0;
        this._bottomMaxValue = 0;
        this._topCurValue = 0;
        this._bottomCurValue = 0;
        this._upHero = null;
        this._downHero = null;
        this._isMoving = false;
        this._heroArray.length = 0;
        this._damage = 0;
        this._damageText = null;
        this._area = 0;
        if (this._beAttackClip) {
            this._beAttackClip.dispose();
        }
        this._beAttackClip = null;
        this._isCrit = false;
        this._upPositon = null;
        this._downPositon = null;
        this._topProgressType = null;
        _super.prototype.dispose.call(this);
    };
    return BaseBattleView;
}(CommonView));
//# sourceMappingURL=BaseBattleView.js.map