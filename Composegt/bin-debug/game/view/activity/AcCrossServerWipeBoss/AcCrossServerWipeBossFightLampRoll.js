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
var AcCrossServerWipeBossFightLampRoll = (function (_super) {
    __extends(AcCrossServerWipeBossFightLampRoll, _super);
    function AcCrossServerWipeBossFightLampRoll(code) {
        var _this = _super.call(this) || this;
        _this._lampBg = null;
        _this._lampInfo = null;
        _this._rollingType = 0; //0,隐藏， 1,滚动  2,滚完正在隐藏
        _this._lampText = null;
        _this._rollInfo = null;
        _this._isRolling = false;
        _this._code = '1';
        _this._index = 0;
        _this._code = code;
        _this.init();
        return _this;
    }
    Object.defineProperty(AcCrossServerWipeBossFightLampRoll.prototype, "api", {
        get: function () {
            return Api.crossServerWipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossFightLampRoll.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_CROSSSERVERWIPEBOSS, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossFightLampRoll.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_CROSSSERVERWIPEBOSS, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWipeBossFightLampRoll.prototype.init = function () {
        //App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SHOW_LAMP,this.checkShowLamp,this);
        this._lampBg = BaseBitmap.create("mainui_chatbg");
        this._lampBg.width = GameConfig.stageWidth - 150;
        this._lampBg.height = 30;
        this.addChild(this._lampBg);
        this._lampBg.alpha = 0;
        this.checkShowLamp();
    };
    AcCrossServerWipeBossFightLampRoll.prototype.checkShowLamp = function () {
        this._rollInfo = Api.crossServerWipeBossVoApi.getShowFightInfo(0);
        ++this._index;
        if (this._rollingType == 0) {
            //隐藏
            if (this._rollInfo) {
                this._rollingType = 1;
                egret.Tween.get(this._lampBg).to({ alpha: 1 }, 1000).call(this.startRolling, this);
            }
            else {
                this._index = 0;
            }
        }
        else if (this._rollingType == 1) {
            if (this._rollInfo) {
                if (this._isRolling == false) {
                    this.startRolling();
                }
            }
            else {
                this._index = 0;
                this._rollingType = 2;
                egret.Tween.get(this._lampBg).to({ alpha: 0 }, 1000).call(this.hiddenLamp, this);
            }
        }
        else if (this._rollingType == 2) {
            if (this._rollInfo) {
                this._lampBg.alpha = 1;
                this.startRolling();
            }
            else {
                this._index = 0;
            }
        }
    };
    AcCrossServerWipeBossFightLampRoll.prototype.startRolling = function () {
        if (this._lampInfo == null) {
            this._lampInfo = new BaseDisplayObjectContainer();
            this.addChild(this._lampInfo);
            var icon = BaseBitmap.create("public_chatnoticeicon");
            icon.setScale(30 / icon.width);
            this._lampInfo.addChild(icon);
            this._lampText = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_SMALL);
            this._lampText.setPosition(60, this._lampBg.height / 2 - this._lampText.height / 2);
            this._lampInfo.addChild(this._lampText);
            // this._lampText.mask = this._lampInfo;
            //this._lampInfo.mask = maskGroup;
        }
        this._isRolling = true;
        egret.Tween.removeTweens(this._lampInfo);
        this._lampText.text = this.getRollingText();
        this._lampInfo.x = this._lampBg.width;
        var moveDis = this._lampText.width + 100 + GameConfig.stageWidth;
        var moveTiem = moveDis / 100 * 1000;
        egret.Tween.get(this._lampInfo).to({ x: -this._lampText.width - 100 }, moveTiem).call(this.rollingEnd, this);
    };
    AcCrossServerWipeBossFightLampRoll.prototype.rollingEnd = function () {
        this._isRolling = false;
        // if(this._index ){
        // }
        // this.checkShowLamp();
    };
    AcCrossServerWipeBossFightLampRoll.prototype.getRollingText = function () {
        var rollingString = "";
        if (this._rollInfo) {
            // if (this._rollInfo.dtype == 1) {
            // 	rollingString = LanguageManager.getlocal("lampInfoType1",[this._rollInfo.name, LanguageManager.getlocal("wifeName_"+this._rollInfo.need)]);
            // }
            // else if (this._rollInfo.dtype == 2) {
            // 	rollingString = LanguageManager.getlocal("lampInfoType2",[this._rollInfo.name, LanguageManager.getlocal("servant_name"+this._rollInfo.need)]);
            // }
            // else if (this._rollInfo.dtype == 3) {
            // 	rollingString = LanguageManager.getlocal("lampInfoType3",[this._rollInfo.name, this._rollInfo.need]);
            // }
            // else if (this._rollInfo.dtype == 4) {
            // 	rollingString = LanguageManager.getlocal("lampInfoType4",[this._rollInfo.name, this._rollInfo.need]);
            // }
            // else if (this._rollInfo.dtype == 5) {
            // 	rollingString = LanguageManager.getlocal("lampInfoType5",[this._rollInfo.name, LanguageManager.getlocal("officialTitle"+this._rollInfo.need)]);
            // }
            // else if (this._rollInfo.dtype == 100) {
            // 	rollingString = this._rollInfo.msg;
            // }
            // else 
            // {
            // 	let strTab:string[] = App.StringUtil.formatStringParms(this._rollInfo.info);
            // 	rollingString = LanguageManager.getlocal("lampInfoType"+this._rollInfo.dtype,strTab);
            // }
            //击杀奖励
            var icon = GameData.formatRewardItem(this._rollInfo.reward);
            var reward_str = '';
            for (var i in icon) {
                reward_str += ("\u3001" + icon[i].name + "+" + icon[i].num);
            }
            var bosscfg = this.cfg.getBossNpcItemCfgById(this._rollInfo.bossId);
            if (bosscfg.type == 2) {
                reward_str = reward_str.substring(1, reward_str.length);
            }
            var servant = Config.ServantCfg.getServantItemById(this._rollInfo.servantId);
            rollingString = bosscfg.type == 1 ? (LanguageManager.getlocal('accrossserverwipeBossAllKillSuccessInfo', [this._rollInfo.name, servant.name, bosscfg.npcName, bosscfg.killScore, reward_str])) : (LanguageManager.getlocal('acwipeBossAllOpenSuccessInfo', [this._rollInfo.name, bosscfg.npcName, reward_str]));
        }
        return rollingString;
    };
    AcCrossServerWipeBossFightLampRoll.prototype.hiddenLamp = function () {
        if (this._lampInfo && this._rollingType == 2) {
            this._rollingType = 0;
            this.removeChild(this._lampInfo);
            this._lampInfo = null;
        }
    };
    AcCrossServerWipeBossFightLampRoll.prototype.dispose = function () {
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SHOW_LAMP,this.checkShowLamp,this);
        egret.Tween.removeTweens(this._lampBg);
        this._lampBg = null;
        this._lampInfo = null;
        this._rollingType = 0;
        this._lampText = null;
        this._rollInfo = null;
        this._isRolling = false;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWipeBossFightLampRoll;
}(BaseDisplayObjectContainer));
__reflect(AcCrossServerWipeBossFightLampRoll.prototype, "AcCrossServerWipeBossFightLampRoll");
