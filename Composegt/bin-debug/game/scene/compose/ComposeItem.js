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
var ComposeItem = (function (_super) {
    __extends(ComposeItem, _super);
    // public _isComposeing:boolean = false;
    function ComposeItem(data) {
        var _this = _super.call(this) || this;
        _this._zIndex = -1;
        _this.init(data);
        var _a = ComposeStatus.getPixPosByCellPos(data.x, data.y), pixX = _a.pixX, pixY = _a.pixY;
        _this.setPosition(pixX, pixY);
        return _this;
    }
    ComposeItem.prototype.getLv = function () {
        return this._data.lv;
    };
    ComposeItem.prototype.setMaxZindex = function () {
        var thsIdx = this.parent.getChildIndex(this);
        this._zIndex = thsIdx;
        var maxIdx = this.parent.numChildren - 1;
        if (thsIdx < maxIdx) {
            this.parent.setChildIndex(this, maxIdx);
        }
    };
    ComposeItem.prototype.setCellStatus = function (canPos) {
        var res = canPos ? "composecell1" : "composecellred";
        if (this._cell) {
            this._cell.setload(res, this._cellRect);
        }
    };
    ComposeItem.prototype.showNextLvBmp = function () {
        this._lvbm.setload(this.getNextLvRes(), ComposeStatus.renSize);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 121, 70);
        var talk = this.getChildByName("talkbg");
        if (!talk) {
            talk = BaseLoadBitmap.create("compose_talk", rect);
        }
        talk.setPosition(this._lvbm.x + this._lvbm.width - 45 - 30 - this._lvbm.anchorOffsetX, this._lvbm.y - this._lvbm.anchorOffsetY - talk.height + 30);
        talk.name = "talkbg";
        var lvStr = Config.PersoninfoCfg.getPersonLocalNameByLv(this.getNextLv()) + "  " + Config.PersoninfoCfg.getPersonLocalLvByLv(this.getNextLv());
        var talkTxt = this.getChildByName("talktxt");
        if (!talkTxt) {
            talkTxt = ComponentManager.getTextField(LanguageManager.getlocal("composeNextLvcando", [lvStr]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        }
        talkTxt.textAlign = egret.HorizontalAlign.CENTER;
        talkTxt.lineSpacing = 3;
        talkTxt.width = talk.width - 10;
        talkTxt.setPosition(talk.x + (talk.width - talkTxt.width) * 0.5, talk.y + (talk.height - 9 - talkTxt.height) * 0.5);
        talkTxt.name = "talktxt";
        this.addChild(talk);
        this.addChild(talkTxt);
    };
    ComposeItem.prototype.recoveryBmp = function () {
        this._lvbm.setload(this.getLvRes(), ComposeStatus.renSize);
        var talk = this.getChildByName("talkbg");
        if (talk) {
            talk.dispose();
        }
        var talkTxt = this.getChildByName("talktxt");
        if (talkTxt) {
            talkTxt.dispose();
        }
    };
    ComposeItem.prototype.showGoldTip = function () {
        var gold = BaseLoadBitmap.create(Config.RewardCfg.getIconByTypeAndId(ItemEnums.gold));
        var scale = 0.45;
        gold.setScale(scale);
        gold.setPosition(-50 * scale, -this._lvbm.height - 100 * scale + 80);
        this.addChild(gold);
        egret.Tween.get(gold).to({ y: gold.y - 30, alpha: 0 }, 1200).call(function () {
            if (gold) {
                gold.dispose();
            }
        }, this);
    };
    ComposeItem.prototype.init = function (data) {
        this._data = data;
        // this._lv=new BaseDisplayObjectContainer();
        if (!this._cellRect) {
            this._cellRect = egret.Rectangle.create();
            this._cellRect.setTo(0, 0, ComposeStatus.cellBgSize.w, ComposeStatus.cellBgSize.h);
        }
        //点小人地块 也能拖动小人,通过菱形透明图片避免阻挡其他小人的点击 public_9_bg11 public_alphabg
        var alphaCell = BaseBitmap.create("public_alphabg");
        // alphaCell.alpha = 111/255;
        alphaCell.name = "touchcell";
        // alphaCell.width = alphaCell.height = Math.sqrt(Math.pow(this._cellRect.width/2-5,2)+Math.pow(this._cellRect.height/2-5,2));
        alphaCell.width = 94;
        alphaCell.height = 125;
        alphaCell.anchorOffsetX = alphaCell.anchorOffsetY = alphaCell.width / 2;
        // alphaCell.skewX = 30;
        // alphaCell.rotation = 30;
        alphaCell.setPosition(3, this._cellRect.height / 2 - 75);
        this.addChild(alphaCell);
        // alphaCell.pixelHitTest=true;
        var composecell = BaseLoadBitmap.create("composecell1", this._cellRect);
        this._cell = composecell;
        composecell.setPosition(-composecell.width / 2, -composecell.height / 2);
        this.addChild(composecell);
        composecell.visible = false;
        // let shadow:BaseBitmap=BaseBitmap.create("composeshadow");
        // this._shadow=shadow;
        // let shadowPos=this.getShadowInitPos();
        // shadow.setPosition(shadowPos.x,shadowPos.y);
        // this.addChild(shadow);
        this.width = composecell.width;
        this.height = composecell.height;
        var lvbmp = BaseLoadBitmap.create(this.getLvRes(), ComposeStatus.renSize);
        // lvbmp.pixelHitTest=true;
        lvbmp.anchorOffsetX = lvbmp.width * 0.5;
        lvbmp.anchorOffsetY = lvbmp.height;
        this._lvbm = lvbmp;
        var pos = this.getLvBmInitPos();
        lvbmp.setPosition(pos.x, pos.y);
        this.addChild(lvbmp);
        // this.addChild(this._lv);
        // let lvbg=BaseLoadBitmap.create("composeplvbg");
        // lvbg.width=lvbg.height=31;
        // lvbg.setPosition(20,-lvbg.height/2);
        // this._lv.addChild(lvbg);
        // let t=ComponentManager.getTextField(""+data.lv,TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        // t.width=lvbg.width;
        // t.textAlign=egret.HorizontalAlign.CENTER;
        // this._lvT=t;
        // t.setPosition(lvbg.x,lvbg.y+(lvbg.height-t.height)*0.5+1);
        // this._lv.addChild(t);
        this.name = this._data.id;
    };
    ComposeItem.prototype.getLvBmInitPos = function () {
        var x = this._cell.x + (this._cell.width - this._lvbm.width) * 0.5 + this._lvbm.width * 0.5;
        var y = this._cell.y - this._lvbm.height + this._cell.height / 2 + 8 + this._lvbm.height;
        return { x: x, y: y };
    };
    // private getShadowInitPos():{x:number,y:number}
    // {
    // 	return {x:this._cell.x+(this._cell.width-this._shadow.width)/2-3,y:this._cell.y+(this._cell.height-this._shadow.height)/2+13};
    // }
    /**
     * 拖拽移动
     * @param offX
     * @param offY
     */
    ComposeItem.prototype.moveByDrag = function (offX, offY) {
        var x, y;
        if (this._selectPos) {
            x = this._selectPos.x;
            y = this._selectPos.y;
        }
        else {
            var _a = ComposeStatus.getPixPosByCellPos(this._data.x, this._data.y), pixX = _a.pixX, pixY = _a.pixY;
            x = pixX;
            y = pixY;
        }
        this.setPosition(x + offX, y + offY);
        this.moveExcute();
    };
    ComposeItem.prototype.moveByDiffPos = function (diffX, diffY) {
        this.x += diffX;
        this.y += diffY;
        this.moveExcute();
    };
    ComposeItem.prototype.moveExcute = function () {
        // this.showCell();
        // this.removeSelected(false,true);
        this.checkMoveStatus();
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_COMPOSE_ITEM_MOVE, { pixX: this.x, pixY: this.y, x: this._data.x, y: this._data.y });
    };
    ComposeItem.prototype.clearMoveStatus = function () {
        // this.hideCell();
        this.setCellStatus(true);
    };
    ComposeItem.prototype.showCell = function () {
        if (this._cell) {
            this._cell.visible = true;
        }
    };
    ComposeItem.prototype.hideCell = function () {
        if (this._cell && this._cell.visible) {
            this._cell.visible = false;
        }
    };
    ComposeItem.prototype.update = function () {
        // this._lvT.setString(""+this._data.lv);
        this.name = Config.MapinfoCfg.getIdByPos(this._data.x, this._data.y);
    };
    ComposeItem.prototype.updatePos = function () {
        var _this = this;
        this.update();
        var _a = ComposeStatus.getPixPosByCellPos(this._data.x, this._data.y), pixX = _a.pixX, pixY = _a.pixY;
        this.hideCell();
        if (this.x != pixX || this.y != pixY) {
            egret.Tween.get(this).to({ x: pixX, y: pixY }, 100).call(function () {
                egret.Tween.removeTweens(_this);
            }, this);
            // this.setPosition(pixX,pixY);
        }
    };
    ComposeItem.prototype.getLvRes = function () {
        return Config.MapinfoCfg.getPersonRes(this._data.lv);
    };
    ComposeItem.prototype.getNextLv = function () {
        var maxLv = Math.min(Config.PersoninfoCfg.getMaxLv(), this._data.lv + 1);
        return maxLv;
    };
    ComposeItem.prototype.getNextLvRes = function () {
        var maxLv = this.getNextLv();
        return Config.MapinfoCfg.getPersonRes(maxLv);
    };
    ComposeItem.prototype.getLastLvRes = function () {
        return Config.MapinfoCfg.getPersonRes(this._data.lv - 1);
    };
    ComposeItem.prototype.updateEffect = function () {
        var effect = ComponentManager.getCustomMovieClip("compose_ren", 9);
        effect.setScale(2.4);
        effect.setPosition(-130, -140 - ComposeStatus.cellBgSize.h * 0.5);
        this.addChild(effect);
        effect.setEndCallBack(function () {
            effect && effect.dispose();
        }, this);
        effect.playWithTime(1);
        SoundManager.playEffect(SoundConst.EFFECT_DROP);
    };
    ComposeItem.prototype.updateComposeEffect = function () {
        var _this = this;
        var effect = ComponentManager.getCustomMovieClip("compose_com", 8);
        effect.setPosition(-115, -170 - ComposeStatus.cellBgSize.h * 0.5);
        this.addChild(effect);
        effect.setEndCallBack(function () {
            effect && effect.dispose();
        }, this);
        effect.playWithTime(1);
        SoundManager.playEffect(SoundConst.EFFECT_DROP);
        this._lvbm.bindData = "updateing";
        egret.Tween.get(this._lvbm).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1.0, scaleY: 1.0 }, 200).call(function () {
            _this._lvbm && (_this._lvbm.bindData = null);
            // this._isUpgradePlaying=false;
        }, this);
    };
    ComposeItem.prototype.show = function (parent, effect) {
        var _this = this;
        parent.addChild(this);
        if (effect) {
            this._lvbm.alpha = 0;
            this._lvbm.bindData = "showing";
            egret.Tween.get(this._lvbm).to({ alpha: 1 }, 500).call(function () { _this._lvbm && (_this._lvbm.bindData = null); }, this);
            this.updateEffect();
        }
    };
    // private _isUpgradePlaying:boolean=false;
    ComposeItem.prototype.updateShow = function (isBatch, rewards) {
        var _this = this;
        this.hideComposeStatus();
        if (!isBatch) {
            var bm2_1 = BaseLoadBitmap.create(this.getLastLvRes(), ComposeStatus.renSize);
            bm2_1.anchorOffsetX = this._lvbm.anchorOffsetX;
            bm2_1.anchorOffsetY = this._lvbm.anchorOffsetY;
            this._lvbm.setload(this.getLastLvRes(), ComposeStatus.renSize);
            var lvbmPos = this.getLvBmInitPos();
            var initX = lvbmPos.x;
            var initY = lvbmPos.y;
            bm2_1.setPosition(initX + 50, initY);
            bm2_1.name = "bm2";
            this.addChild(bm2_1);
            var idx_1 = 0;
            var effectComplete_1 = function () {
                idx_1++;
                if (idx_1 == 2) {
                    bm2_1.dispose();
                    _this._lvbm.setload(_this.getLvRes(), ComposeStatus.renSize);
                    // this._lvT.setString(""+this._data.lv);
                    _this.updateComposeEffect();
                    if (rewards) {
                        var rewardList = GameData.formatRewardItem(rewards);
                        var p = _this.localToGlobal(0, 0);
                        p.y -= 80;
                        App.CommonUtil.playRewardFlyAction(rewardList, p);
                    }
                }
            };
            // this._isUpgradePlaying=true;
            // egret.setTimeout(()=>{
            // 	this._isUpgradePlaying=false;
            // },this,750);
            this._lvbm.bindData = "updateing";
            egret.Tween.get(this._lvbm).to({ x: initX - 50 }, 250, egret.Ease.quartOut).to({ x: initX }, 100, egret.Ease.quartIn).call(function () {
                _this._lvbm && (_this._lvbm.bindData = null);
                effectComplete_1.apply(_this);
            }, this);
            egret.Tween.get(bm2_1).to({ x: initX + 55 }, 250, egret.Ease.quartOut).to({ x: initX }, 100, egret.Ease.quartIn).call(function () {
                effectComplete_1.apply(_this);
            }, this);
        }
        else {
            this._lvbm.setload(this.getLvRes(), ComposeStatus.renSize);
            // this._lvT.setString(""+this._data.lv);
            var _a = ComposeStatus.getPixPosByCellPos(this._data.x, this._data.y), pixX = _a.pixX, pixY = _a.pixY;
            if (this.x != pixX || this.y != pixY) {
                egret.Tween.get(this).to({ x: pixX, y: pixY }, 200).call(function () {
                    egret.Tween.removeTweens(_this);
                }, this);
            }
            else {
                // this._isUpgradePlaying=true;
                // egret.setTimeout(()=>{
                // 	this._isUpgradePlaying=false;
                // },this,400);
                this.updateComposeEffect();
            }
        }
    };
    ComposeItem.prototype.showComposeStatus = function () {
        var stopPos = ComposeStatus.curStopPos;
        this.hideComposeStatus();
        var lvbmPos = this.getLvBmInitPos();
        var initX = lvbmPos.x;
        var initY = lvbmPos.y;
        this._lvbm.setPosition(initX, initY);
        if (stopPos.x == this._data.x && stopPos.y == this._data.y) {
        }
        else {
            var _a = ComposeStatus.getPixPosByCellPos(stopPos.x, stopPos.y), pixX = _a.pixX, pixY = _a.pixY;
            var offX = pixX - this.x;
            var offY = pixY - this.y;
            var angle = Math.atan2(offY, offX);
            var dis = 20;
            offX = dis * Math.cos(angle);
            offY = dis * Math.sin(angle);
            // egret.Tween.get(this._lvbm,{loop:true}).to({x:initX+offX,y:initY+offY},500).to({x:initX,y:initY},500);
            // let shadowInitPos=this.getShadowInitPos();
            // egret.Tween.get(this._shadow,{loop:true}).to({x:shadowInitPos.x+offX,y:shadowInitPos.y+offY},500).to({x:shadowInitPos.x,y:shadowInitPos.y},500);
            this._lvbm.bindData = "cancomposeing";
            egret.Tween.get(this._lvbm, { loop: true }).to({ x: offX, y: offY }, 500).to({ x: lvbmPos.x, y: lvbmPos.y }, 500);
        }
        // this._cell.visible=true;
    };
    ComposeItem.prototype.hideComposeStatus = function () {
        // if(!this._isUpgradePlaying)
        // {
        if (this._lvbm.bindData != "updateing") {
            egret.Tween.removeTweens(this._lvbm);
            this._lvbm.setScale(1);
            var lvbmPos = this.getLvBmInitPos();
            var initX = lvbmPos.x;
            var initY = lvbmPos.y;
            this._lvbm.setPosition(initX, initY);
        }
        // }
        // egret.Tween.removeTweens(this._shadow);
        // egret.Tween.removeTweens(this._lvbm);
        // this.setScale(1);
        // let shadowInitPos=this.getShadowInitPos();
        // this._shadow.setPosition(shadowInitPos.x,shadowInitPos.y);
        // this._lv.setPosition(0,0);
        this.clearMoveStatus();
    };
    /**
     * 设置选中状态显示
     */
    ComposeItem.prototype.setSelected = function () {
        var _this = this;
        var container = ComposeSelect.getInstant();
        container.setText(String(this._data.lv));
        if (container.parent && container.parent.hashCode != this.hashCode) {
            var item = container.parent;
            if (item) {
                item.removeSelected(true);
            }
        }
        if (!this.contains(container)) {
            var bm2 = this.getChildByName("bm2");
            if (!bm2) {
                var lvbmPos = this.getLvBmInitPos();
                var initX = lvbmPos.x;
                var initY = lvbmPos.y;
                egret.Tween.get(this._lvbm).to({ x: initX, y: initY - 10 }, 100).to({ x: initX, y: initY }, 100).call(function () {
                    _this._lvbm.setScale(1);
                    egret.Tween.removeTweens(_this._lvbm);
                }, this);
            }
            var cellIdx = this.getChildIndex(this._cell);
            container.alpha = 0;
            container.show(function () {
                _this.showCell();
            }, this);
            this.addChildAt(container, cellIdx + 1);
        }
        if (ComposeStatus.status == ComposeEnums.NONE) {
            ComposeStatus.status = ComposeEnums.ITEM;
            // let thsIdx=this.parent.getChildIndex(this);
            // this._zIndex=thsIdx;
            // let maxIdx=this.parent.numChildren-1;
            // if(thsIdx<maxIdx)
            // {
            // 	this.parent.setChildIndex(this,maxIdx);
            // }
        }
        ComposeStatus.curSelectPos = { x: this._data.x, y: this._data.y };
        this._selectPos = { x: this.x, y: this.y };
    };
    ComposeItem.prototype.removeSelected = function (noTween, showCell) {
        var _this = this;
        if (ComposeSelect.hasInstant()) {
            var container = ComposeSelect.getInstant();
            if (container && this.contains(container)) {
                container.hide(function () {
                    if (!showCell) {
                        _this.hideCell();
                    }
                }, this, noTween);
            }
            this._selectPos = null;
        }
    };
    ComposeItem.prototype.checkMoveStatus = function () {
        var container = ComposeSelect.getInstant();
        if (container && this.contains(container)) {
            container.hideDelPs(true);
        }
    };
    ComposeItem.prototype.showDelPs = function () {
        var container = ComposeSelect.getInstant();
        if (container && this.contains(container)) {
        }
    };
    ComposeItem.prototype.hideDelPs = function () {
        var container = ComposeSelect.getInstant();
        if (container && this.contains(container)) {
        }
    };
    ComposeItem.prototype.clearStatue = function () {
        if (ComposeStatus.status == ComposeEnums.ITEM) {
            ComposeStatus.status = ComposeEnums.NONE;
        }
    };
    ComposeItem.prototype.resetPos = function () {
        var _this = this;
        var _a = ComposeStatus.curStopPos, x = _a.x, y = _a.y;
        var _b = ComposeStatus.getPixPosByCellPos(this._data.x, this._data.y), pixX = _b.pixX, pixY = _b.pixY;
        if (x == this._data.x && y == this._data.y) {
            if (this.x != pixX || this.y != pixY) {
                egret.Tween.get(this).to({ x: pixX, y: pixY }, 100).call(function () {
                    egret.Tween.removeTweens(_this);
                }, this);
            }
        }
        else {
            this.setPosition(pixX, pixY);
        }
        this.clearMoveStatus();
        this.hideCell();
        if (this.parent) {
            this.parent.setChildIndex(this, this._zIndex);
        }
    };
    ComposeItem.prototype.move = function (x, y, completeCall, completeCallThisObj) {
        var _this = this;
        var _a = ComposeStatus.getPixPosByCellPos(x, y), pixX = _a.pixX, pixY = _a.pixY;
        // let curPos=ComposeStatus.getPixPosByCellPos(this._data.x,this._data.y);
        var movet = 200; //Math.sqrt((x-this._data.x)*(x-this._data.x)+(y-this._data.y)*(y-this._data.y))*100;
        egret.Tween.get(this).to({ x: pixX, y: pixY }, movet).call(function () {
            egret.Tween.removeTweens(_this);
            if (completeCall) {
                completeCall.apply(completeCallThisObj);
            }
        }, this);
    };
    ComposeItem.prototype.hideForCompose = function () {
        var _this = this;
        egret.Tween.get(this).to({ alpha: 0 }, 300).call(function () {
            egret.Tween.removeTweens(_this);
        }, this);
    };
    ComposeItem.prototype.showForCompose = function () {
        egret.Tween.removeTweens(this);
        this.alpha = 1;
    };
    ComposeItem.prototype.delete = function () {
        var _this = this;
        egret.Tween.get(this).to({ scaleX: 0.1, scaleY: 0.1, alpha: 0.1 }, 200).call(function () {
            _this.dispose();
        }, this);
        ;
    };
    ComposeItem.prototype.dispose = function () {
        this.removeSelected();
        this._cell = null;
        this._data = null;
        this._cellRect = null;
        // this._lvT=null;
        // this._lv=null;
        // this._isComposeing = false;
        _super.prototype.dispose.call(this);
    };
    return ComposeItem;
}(BaseDisplayObjectContainer));
__reflect(ComposeItem.prototype, "ComposeItem");
