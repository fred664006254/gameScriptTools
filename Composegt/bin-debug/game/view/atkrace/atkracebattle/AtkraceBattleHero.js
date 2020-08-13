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
var AtkraceBattleHero = (function (_super) {
    __extends(AtkraceBattleHero, _super);
    function AtkraceBattleHero() {
        var _this = _super.call(this) || this;
        _this._hero = null;
        _this._progress = null;
        _this._ownType = 0;
        _this._posIdx = 0;
        _this._initAttr = 0;
        _this._sid = null;
        _this._damageNum = 0;
        // private checkShowSkillIcon(skillId:string):void
        // {
        // 	let childName="skill"+skillId;
        // 	if(!this.getChildByName(childName))
        // 	{
        // 		let skillIconKey = Config.ServantskillCfg.getSkillIconKeyById(skillId);
        // 		let icon=BaseLoadBitmap.create(skillIconKey);
        // 		icon.width=108;
        // 		icon.height=109;
        // 		icon.alpha=0.1;
        // 		icon.setScale(32/icon.width);
        // 		let skillTipy=-this._hero.height*this._hero.scaleY-icon.height*icon.scaleY*0.5;
        // 		icon.y=skillTipy;
        // 		icon.x=-icon.width*icon.scaleX*2;
        // 		this.addChild(icon);
        // 		egret.Tween.get(icon).to({alpha:1},300).call(()=>{
        // 			icon.stopAllActions();
        // 		},this);
        // 	}
        // }
        _this._damageList = [];
        return _this;
    }
    AtkraceBattleHero.prototype.init = function (data, ownType, posIdx) {
        this.stopAllActions();
        if (!data) {
            this._ownType = ownType;
            this._posIdx = posIdx;
            this.visible = false;
            var cfg_1 = Config.AtkraceCfg.servantPosCfg[ownType][posIdx];
            this.initPos(cfg_1);
            return;
        }
        // this.visible=true;
        this._data = data;
        this._ownType = ownType;
        this._posIdx = posIdx;
        this._sid = data.sid;
        this._initAttr = this._data.attr;
        this.visible = (!Api.atkraceVoApi.dieSidList[this._ownType][this._data.sid]);
        // console.log(this._ownType,this._data.sid,(!Api.atkraceVoApi.dieSidList[this._ownType][this._data.sid]));
        var servantCfg = Config.ServantCfg.getServantItemById(data.sid);
        var iconKey = servantCfg.fullIcon;
        if (this._hero) {
            this._hero.setload(iconKey);
            var nameLb = this.getChildByName("nameLb");
            nameLb.setString(servantCfg.name);
            var quiltyTxt = this.getChildByName("quiltyTxt");
            quiltyTxt.setString(data.ability + "");
        }
        else {
            this._hero = BaseLoadBitmap.create(iconKey);
            this._hero.anchorOffsetX = this._hero.width * 0.5;
            this._hero.anchorOffsetY = this._hero.height;
            this.addChild(this._hero);
            this._hero.setScale(0.45);
            var bg = BaseBitmap.create("atkrace_heroinfobg");
            bg.anchorOffsetX = bg.width * 0.5;
            bg.y = -8;
            this.addChild(bg);
            var pro = ComponentManager.getProgressBar("progress_atkhp0", "progress_atkhpbg", 252);
            this._progress = pro;
            pro.x = bg.x - pro.width * 0.5;
            pro.y = 5;
            this.addChild(pro);
            var nameLb = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
            nameLb.setPosition(pro.x + (pro.width - nameLb.width) * 0.5, pro.y + pro.height + 5);
            this.addChild(nameLb);
            nameLb.name = "nameLb";
            var quiltyBg = BaseBitmap.create("atkrace_quiltybg");
            quiltyBg.x = bg.x - bg.anchorOffsetX + bg.width - quiltyBg.width;
            quiltyBg.y = bg.y - bg.anchorOffsetY - quiltyBg.height - 93;
            this.addChild(quiltyBg);
            var quiltyTxt = ComponentManager.getTextField(data.ability + "", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            quiltyTxt.setPosition(quiltyBg.x + 45, quiltyBg.y + (quiltyBg.height - quiltyTxt.height) * 0.5);
            this.addChild(quiltyTxt);
            quiltyTxt.name = "quiltyTxt";
        }
        var percent = this._initAttr / this._data.fullattr;
        if (percent > 0) {
            percent = Math.max(0.03, percent);
        }
        this._progress.setPercentage(percent);
        if (!this._skillIconContainer) {
            this._skillIconContainer = new BaseDisplayObjectContainer();
            this.addChild(this._skillIconContainer);
        }
        var cfg = Config.AtkraceCfg.servantPosCfg[ownType][posIdx];
        this.initPos(cfg);
    };
    AtkraceBattleHero.prototype.initPos = function (cfg) {
        this.setPosition(cfg.x, GameConfig.stageHeigth - cfg.y);
        this.setScale(cfg.scale);
    };
    AtkraceBattleHero.prototype.showSkillEffect = function (endCallback, thisObj, firstRound) {
        var skillActive = Config.ServantCfg.getServantItemById(this._data.sid).skillActive;
        var skillTip = BaseLoadBitmap.create("atkraceskill_" + skillActive);
        skillTip.anchorOffsetX = skillTip.width * 0.5;
        skillTip.anchorOffsetY = skillTip.height * 0.5;
        var skillTipy = -this._hero.height * this._hero.scaleY - skillTip.height * 0.5;
        skillTip.y = skillTipy;
        skillTip.setScale(0.3);
        skillTip.alpha = 0.1;
        this.addChild(skillTip);
        egret.Tween.get(skillTip).to({ scaleX: 1.1, scaleY: 1.1, alpha: 1 }, 250, egret.Ease.quadIn).to({ scaleX: 1, scaleY: 1 }, 150, egret.Ease.quadOut).call(function () {
            // if(!firstRound)
            // {
            // 	this.checkShowSkillIcon(skillActive);
            // }
        }, this).wait(300).to({ y: skillTipy - 50, alpha: 0.1 }, 500).call(function () {
            skillTip && skillTip.dispose();
            if (endCallback) {
                endCallback.call(thisObj);
            }
        }, this);
    };
    AtkraceBattleHero.prototype.setDamageData = function (dmgNum, fntName) {
        // console.log("设置伤害",this._ownType,this._posIdx);
        this._damageList.push({ dmgNum: dmgNum, fntName: fntName });
    };
    AtkraceBattleHero.prototype.showDamage = function (endCallback, thisObj) {
        var _this = this;
        var dmgL = this._damageList.length;
        // console.log("播放伤害特效",this._ownType,this._posIdx,dmgL);
        if (dmgL > 0) {
            var hasplayEnd_1 = 0;
            var _loop_1 = function (index) {
                var dmg = this_1._damageList[index];
                var dmgNum = dmg.dmgNum;
                var fntName = dmg.fntName;
                this_1._initAttr -= dmgNum;
                this_1._initAttr = Math.max(0, this_1._initAttr);
                var percent = this_1._initAttr / this_1._data.fullattr;
                if (percent > 0) {
                    percent = Math.max(0.03, percent);
                }
                this_1._progress.setPercentage(percent);
                var dmgTxt = ComponentManager.getBitmapText((-dmgNum) + "", fntName);
                dmgTxt.anchorOffsetX = dmgTxt.width * 0.5;
                dmgTxt.anchorOffsetY = dmgTxt.height;
                var dy = -this_1._hero.height * this_1._hero.scaleY - this_1._damageNum * 30;
                dmgTxt.y = dy;
                this_1.addChild(dmgTxt);
                egret.Tween.get(dmgTxt).to({ y: dy - 60, alpha: 0.3 }, 800).call(function () {
                    dmgTxt.dispose();
                    if (_this._initAttr <= 0) {
                        _this.visible = false;
                        Api.atkraceVoApi.dieSidList[_this._ownType][_this._data.sid] = 1;
                        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ATKRACE_SER_DIE, _this._ownType);
                    }
                    hasplayEnd_1++;
                    if (hasplayEnd_1 == dmgL) {
                        if (endCallback) {
                            endCallback.call(thisObj);
                        }
                    }
                    else if (hasplayEnd_1 > dmgL) {
                        console.error(hasplayEnd_1, dmgL);
                    }
                }, this_1);
                this_1._damageNum++;
            };
            var this_1 = this;
            for (var index = 0; index < dmgL; index++) {
                _loop_1(index);
            }
        }
        else {
            if (endCallback) {
                egret.callLater(endCallback, thisObj);
                // endCallback.call(thisObj);
            }
        }
        this._damageList.length = 0;
    };
    AtkraceBattleHero.prototype.setSkillStatus = function (skillsData) {
        var childNameList = [];
        if (skillsData) {
            for (var skillId in skillsData) {
                if (Object.prototype.hasOwnProperty.call(skillsData, skillId)) {
                    var skillData = skillsData[skillId];
                    if (skillData) {
                        var _loop_2 = function (skillType) {
                            if (Object.prototype.hasOwnProperty.call(skillData, skillType)) {
                                var skillTypeData = skillData[skillType];
                                var childName = skillId + "_" + skillType;
                                childNameList.push(childName);
                                var icon_1 = this_2._skillIconContainer.getChildByName(childName);
                                if (!icon_1) {
                                    var childNum = this_2._skillIconContainer.numChildren;
                                    var skillIconKey = Config.ServantskillCfg.getSkillIconKeyById(skillId);
                                    icon_1 = BaseLoadBitmap.create(skillIconKey);
                                    icon_1.name = childName;
                                    icon_1.width = 108;
                                    icon_1.height = 109;
                                    icon_1.alpha = 0.1;
                                    icon_1.setScale(32 / icon_1.width);
                                    var skillTipy = -this_2._hero.height * this_2._hero.scaleY - icon_1.height * icon_1.scaleY * 0.5;
                                    icon_1.y = skillTipy;
                                    icon_1.x = -icon_1.width * icon_1.scaleX * 2 + childNum * (icon_1.width * icon_1.scaleX + 2);
                                    this_2._skillIconContainer.addChild(icon_1);
                                    egret.Tween.get(icon_1).wait(400).to({ alpha: 1 }, 300).call(function () {
                                        icon_1.stopAllActions();
                                    }, this_2);
                                }
                                console.log(skillTypeData.length + "层");
                            }
                        };
                        var this_2 = this;
                        for (var skillType in skillData) {
                            _loop_2(skillType);
                        }
                    }
                }
            }
        }
        var numchild = this._skillIconContainer.numChildren;
        for (var i = numchild - 1; i >= 0; i--) {
            var item = this._skillIconContainer.getChildAt(i);
            if (childNameList.indexOf(item.name) < 0) {
                BaseLoadBitmap.release(item);
            }
        }
    };
    AtkraceBattleHero.prototype.checkIsDie = function () {
        return Api.atkraceVoApi.dieSidList[this._ownType][this._posIdx] == 1 || this.visible == false;
        ;
    };
    AtkraceBattleHero.prototype.playAtkAction = function (endCallback, thisObj) {
        var _this = this;
        this._damageNum = 0;
        var atkCfg = Config.AtkraceCfg.servantAtkPosCfg;
        var cfg = Config.AtkraceCfg.servantPosCfg[this._ownType][this._posIdx];
        var y = GameConfig.stageHeigth - cfg.y;
        if (this._posIdx < 3) {
            egret.Tween.get(this).to({
                y: y + atkCfg.atkb1[this._ownType].y, scaleX: atkCfg.atkb1[this._ownType].scale, scaleY: atkCfg.atkb1[this._ownType].scale
            }, 300).to({
                y: this.y + atkCfg.atk1[this._ownType].y, scaleX: atkCfg.atk1[this._ownType].scale, scaleY: atkCfg.atk1[this._ownType].scale
            }, 100, egret.Ease.quadIn).call(function () {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ATKRACE_SER_HIT, _this._posIdx);
            }, this).to({
                y: y, scaleX: cfg.scale, scaleY: cfg.scale
            }, 200).call(function () {
                egret.Tween.removeTweens(_this);
                if (endCallback) {
                    endCallback.call(thisObj);
                }
            }, this);
        }
        else {
            if (this._ownType == 1) {
                this.parent && this.parent.setChildIndex(this, 4);
            }
            egret.Tween.get(this).wait(600).to({
                y: this.y + atkCfg.atkb2[this._ownType].y, scaleX: atkCfg.atkb2[this._ownType].scale, scaleY: atkCfg.atkb2[this._ownType].scale
            }, 300).to({
                y: this.y + atkCfg.atk2[this._ownType].y, scaleX: atkCfg.atk2[this._ownType].scale, scaleY: atkCfg.atk2[this._ownType].scale
            }, 100, egret.Ease.quadIn).call(function () {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ATKRACE_SER_HIT, _this._posIdx);
            }, this).to({ y: y, scaleX: cfg.scale, scaleY: cfg.scale }, 100).call(function () {
                if (_this._ownType == 1) {
                    _this.parent && _this.parent.setChildIndex(_this, _this._posIdx);
                }
                egret.Tween.removeTweens(_this);
                if (endCallback) {
                    endCallback.call(thisObj);
                }
            }, this);
        }
        // egret.Tween.get(this).to({
        // 	y:y+atkCfg.atkb1[this._ownType].y,scaleX:atkCfg.atkb1[this._ownType].scale,scaleY:atkCfg.atkb1[this._ownType].scale
        // },300).to({
        // 	y:this.y+atkCfg.atk1[this._ownType].y,scaleX:atkCfg.atk1[this._ownType].scale,scaleY:atkCfg.atk1[this._ownType].scale
        // },100).to({
        // 	y:y,scaleX:cfg.scale,scaleY:cfg.scale
        // },200).to({
        // 	y:this.y+atkCfg.atkb2[this._ownType].y,scaleX:atkCfg.atkb2[this._ownType].scale,scaleY:atkCfg.atkb2[this._ownType].scale
        // },300).to({
        // 	y:this.y+atkCfg.atk2[this._ownType].y,scaleX:atkCfg.atk2[this._ownType].scale,scaleY:atkCfg.atk2[this._ownType].scale
        // },100).wait(200).to({y:y,scaleX:cfg.scale,scaleY:cfg.scale},100).call(()=>{
        // 	egret.Tween.removeTweens(this);
        // 	if(endCallback)
        // 	{
        // 		endCallback.call(thisObj);
        // 	}
        // },this);
    };
    AtkraceBattleHero.prototype.dispose = function () {
        this._data = null;
        this._ownType = 0;
        this._posIdx = 0;
        this._initAttr = 0;
        this._sid = null;
        this._skillIconContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AtkraceBattleHero;
}(BaseDisplayObjectContainer));
__reflect(AtkraceBattleHero.prototype, "AtkraceBattleHero");
