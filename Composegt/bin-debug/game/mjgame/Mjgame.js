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
var Mjgame = (function (_super) {
    __extends(Mjgame, _super);
    function Mjgame() {
        var _this = _super.call(this) || this;
        _this.bulletRotateDirection = 1;
        _this.bulletCount = 10;
        _this.airplaneList = [];
        _this.airAddTime = 0;
        _this.fps = 60;
        _this.score = 0;
        _this.playing = false;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Mjgame.prototype.onAddToStage = function (event) {
        var _this = this;
        console.log("mjgame");
        LoginLoading.hideDivLoading();
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.stageWidth = egret.MainContext.instance.stage.stageWidth;
        this.stageHeight = egret.MainContext.instance.stage.stageHeight;
        var fullScreenStartY = 50;
        //  白色背景
        var skyBg = new BaseShape();
        skyBg.graphics.beginFill(0x5281A0, 1);
        skyBg.graphics.drawRect(0, 0, this.stageWidth, this.stageHeight);
        skyBg.graphics.endFill();
        this.addChild(skyBg);
        skyBg.addTouch(function (e) {
            if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
                _this.onTouch();
            }
        }, LayerManager);
        // bullet
        this.bullet = new BaseShape();
        this.bullet.graphics.beginFill(0xCFCFCF, 0.8);
        this.bullet.graphics.drawRect(0, 0, 3, 2000);
        this.bullet.graphics.endFill();
        this.bullet.anchorOffsetY = 2000;
        this.bullet.setPosition(this.stageWidth / 2, this.stageHeight + 300);
        this.addChild(this.bullet);
        // 子弹ui
        var bulletIcon = BaseLoadBitmap.create("mjgame_bullet");
        bulletIcon.width = 50;
        bulletIcon.height = 50;
        bulletIcon.setPosition(20, 20 + fullScreenStartY);
        this.addChild(bulletIcon);
        this.bulletCountLabel = ComponentManager.getTextField("10", 40, TextFieldConst.COLOR_WHITE);
        this.bulletCountLabel.setPosition(100, 20 + fullScreenStartY);
        this.addChild(this.bulletCountLabel);
        // 分数ui
        var scoreIcon = BaseLoadBitmap.create("mjgame_score");
        scoreIcon.width = 40;
        scoreIcon.height = 40;
        scoreIcon.setPosition(200, 20 + fullScreenStartY);
        this.addChild(scoreIcon);
        this.scoreLabel = ComponentManager.getTextField("0", 40, TextFieldConst.COLOR_WHITE);
        this.scoreLabel.setPosition(280, 20 + fullScreenStartY);
        this.addChild(this.scoreLabel);
        // 文字提示1
        this.tipStartLabel = ComponentManager.getTextField("点击屏幕 消灭飞机", 40, TextFieldConst.COLOR_WHITE);
        this.tipStartLabel.setPosition(this.stageWidth / 2 - this.tipStartLabel.width / 2, this.stageHeight / 2 - this.tipStartLabel.height / 2);
        this.addChild(this.tipStartLabel);
        // 文字提示2
        this.tipEmptyLabel = ComponentManager.getTextField("没子弹了 请等待子弹回复", 40, TextFieldConst.COLOR_WHITE);
        this.tipEmptyLabel.setPosition(this.stageWidth / 2 - this.tipEmptyLabel.width / 2, this.stageHeight / 2 - this.tipEmptyLabel.height / 2);
        this.addChild(this.tipEmptyLabel);
        // 结束弹板
        this.gameOverPanel = new BaseDisplayObjectContainer();
        this.addChild(this.gameOverPanel);
        // 结束文字
        var gameoverLabel = ComponentManager.getTextField("游戏结束", 80, TextFieldConst.COLOR_WHITE);
        gameoverLabel.setPosition(this.stageWidth / 2 - gameoverLabel.width / 2, this.stageHeight / 2 - 200 - gameoverLabel.height / 2);
        this.gameOverPanel.addChild(gameoverLabel);
        // 结束时分数
        this.scoreLabelInGameOver = ComponentManager.getTextField("0分", 80, TextFieldConst.COLOR_WHITE);
        this.scoreLabelInGameOver.setPosition(this.stageWidth / 2 - this.scoreLabelInGameOver.width / 2, this.stageHeight / 2 - this.scoreLabelInGameOver.height / 2);
        this.gameOverPanel.addChild(this.scoreLabelInGameOver);
        // 重新开始按钮
        var restartButton = BaseLoadBitmap.create("mjgame_restart");
        restartButton.width = 128;
        restartButton.height = 128;
        restartButton.setPosition(this.stageWidth / 2 - restartButton.width / 2, this.stageHeight / 2 + 200 - restartButton.height / 2);
        restartButton.addTouchTap(this.initAndStartGame, this);
        this.gameOverPanel.addChild(restartButton);
        // 重新开始文字
        var restartLabel = ComponentManager.getTextField("重新开始", 30, TextFieldConst.COLOR_WHITE);
        restartLabel.setPosition(this.stageWidth / 2 - restartLabel.width / 2, this.stageHeight / 2 + 290 - restartLabel.height / 2);
        this.gameOverPanel.addChild(restartLabel);
        // 飞机列表
        this.airplaneList = [];
        this.initAndStartGame();
    };
    Mjgame.prototype.onEnterFrame = function (event) {
        if (!this.playing) {
            return;
        }
        if (this.bullet.x > this.stageWidth) {
            this.bulletRotateDirection = -1;
        }
        else if (this.bullet.x < 0) {
            this.bulletRotateDirection = 1;
        }
        this.bullet.x += this.bulletRotateDirection * 1 / this.fps * this.stageWidth / 2;
        if (new Date().getTime() - this.airAddTime > 1000) {
            this.airAddTime = new Date().getTime();
            var airplaneNode = BaseLoadBitmap.create("mjgame_airplane80");
            airplaneNode.rotation = 180;
            airplaneNode.width = 80;
            airplaneNode.height = 80;
            this.addChild(airplaneNode);
            airplaneNode.setPosition(Math.random() * (this.stageWidth - airplaneNode.width) + airplaneNode.width, 0);
            this.airplaneList.push({ bitmap: airplaneNode, info: { focusing: false, willDestroy: false } });
        }
        for (var index = 0; index < this.airplaneList.length; index++) {
            var element = this.airplaneList[index];
            element.bitmap.y += 1 / this.fps * 150;
            if (element.bitmap.y > this.stageHeight) {
                this.gameOver();
            }
            if (this.bullet.x > element.bitmap.x - element.bitmap.width && this.bullet.x < element.bitmap.x) {
                App.DisplayUtil.changeToDark(element.bitmap);
                element.info.focusing = true;
            }
            else {
                App.DisplayUtil.changeToNormal(element.bitmap);
                element.info.focusing = false;
            }
        }
        // 移除一个
        for (var index = 0; index < this.airplaneList.length; index++) {
            var element = this.airplaneList[index];
            if (element.info.willDestroy) {
                this.removeChild(element.bitmap);
                element.bitmap.dispose();
                this.airplaneList.splice(index, 1);
                break;
            }
        }
        this.bulletCount = Math.min(10, this.bulletCount + 1 / this.fps);
        this.bulletCountLabel.text = Math.floor(this.bulletCount) + "";
        if (this.bulletCount >= 1) {
            this.tipEmptyLabel.x = 10000;
        }
        else {
            this.tipEmptyLabel.x = this.stageWidth / 2 - this.tipEmptyLabel.width / 2;
        }
    };
    Mjgame.prototype.onTouch = function () {
        if (this.bulletCount >= 1) {
            var focusFlag = false;
            for (var index = 0; index < this.airplaneList.length; index++) {
                var element = this.airplaneList[index];
                if (element.info.focusing) {
                    element.info.willDestroy = true;
                    this.score++;
                    focusFlag = true;
                }
            }
            if (focusFlag) {
                this.scoreLabel.text = this.score + "分";
                this.bulletCount -= 1;
                this.tipStartLabel.x = 10000;
            }
        }
    };
    Mjgame.prototype.initAndStartGame = function () {
        this.gameOverPanel.x = 10000;
        for (var index = 0; index < this.airplaneList.length; index++) {
            var element = this.airplaneList[index];
            this.removeChild(element.bitmap);
            element.bitmap.dispose();
        }
        this.airplaneList = [];
        this.playing = true;
        this.bulletCount = 10;
        this.score = 0;
        this.scoreLabel.text = this.score + "分";
        this.tipStartLabel.x = this.stageWidth / 2 - this.tipStartLabel.width / 2;
        // this.tipDoubleLabel.x = 10000;
        this.tipEmptyLabel.x = 10000;
    };
    ;
    Mjgame.prototype.gameOver = function () {
        this.gameOverPanel.x = 0;
        this.playing = false;
        this.scoreLabelInGameOver.text = this.score + "分";
        this.tipEmptyLabel.x = 10000;
        this.tipStartLabel.x = 10000;
    };
    ;
    return Mjgame;
}(egret.DisplayObjectContainer));
__reflect(Mjgame.prototype, "Mjgame");
