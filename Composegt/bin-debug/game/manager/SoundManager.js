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
/**
 * Created by yangsong on 15-1-14.
 * Sound管理类
 */
var SoundManager = (function (_super) {
    __extends(SoundManager, _super);
    function SoundManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 构造函数
     */
    SoundManager.init = function () {
        SoundManager.bgOn = true;
        SoundManager.effectOn = true;
        SoundManager.bgVolume = 0.5;
        SoundManager.effectVolume = 1;
        SoundManager.bg = new SoundBg();
        SoundManager.bg.setVolume(SoundManager.bgVolume);
        SoundManager.effect = new SoundEffects();
        SoundManager.effect.setVolume(SoundManager.effectVolume);
    };
    /**
    * 获取声音类型
    * true 开
    * false 关
    *
    */
    // public static getVoiceSwitch():boolean
    // {
    //     let type = LocalStorageManager.get(LocalStorageConst.LOCAL_VIOICE_SWITCH);
    //     return false;
    // }
    /**
     * 获取声音开关
     * true 开
     * false 关
     *
     */
    SoundManager.getSoundSwitch = function () {
        var type = LocalStorageManager.get(LocalStorageConst.LOCAL_SOUND_SWITCH);
        var color = TextFieldConst.COLOR_WARN_GREEN;
        if (type == "" || type == "ON") {
            return true;
        }
        return false;
    };
    /**
     * 播放音效
     * @param effectName
     */
    SoundManager.playEffect = function (effectName) {
        if (!SoundManager.getSoundSwitch()) {
            return;
        }
        if (SoundManager.isInBackground) {
            return;
        }
        if (!SoundManager.effectOn)
            return;
        if (SoundManager.VoiceOn) {
            var neweffectName = effectName + "_tw";
            if (RES.hasRes(neweffectName)) {
                effectName = neweffectName;
            }
        }
        if (SoundManager.effectLastTime[effectName] == null) {
            SoundManager.effectLastTime[effectName] = 1;
            SoundManager.effect.play(effectName);
            SoundManager.effectLastTime[effectName] = egret.getTimer() + App.MathUtil.getRandom() + 100;
        }
        else {
            if (SoundManager.effectLastTime[effectName] < egret.getTimer()) {
                SoundManager.effect.play(effectName);
                SoundManager.effectLastTime[effectName] = egret.getTimer() + App.MathUtil.getRandom() + 100;
            }
        }
        //  if (SoundManager.effectCountTab[effectName]==null || (SoundManager.effectCountTab[effectName] <  SoundManager.effectInfoTab[effectName].maxCount)) {
        //         if (SoundManager.effectCountTab[effectName] == null) {
        //              SoundManager.effectCountTab[effectName] = 1;
        //         }
        //         else {
        //              SoundManager.effectCountTab[effectName] += 1;
        //         }
        //         // TimerManager.doTimer(SoundManager.effectInfoTab[effectName].time,1,this.playEffectCallback,SoundManager);
        //         egret.setTimeout(this.playEffectCallback,SoundManager,SoundManager.effectInfoTab[effectName].time,effectName);
        //         SoundManager.effect.play(effectName);
        //     }
        //     else {
        //          SoundManager.effect.play(effectName);
        //     }
    };
    SoundManager.playEffectCallback = function (effectName) {
        SoundManager.effectCountTab[effectName] -= 1;
    };
    /**
     * 播放背景音乐
     * @param key
     */
    SoundManager.playBg = function (bgName) {
        if (!SoundManager.getSoundSwitch()) {
            return;
        }
        if (SoundManager.isInBackground) {
            return;
        }
        if (!SoundManager.bgOn)
            return;
        SoundManager.currBg = bgName;
        SoundManager.bg.play(bgName);
        egret.MainContext.instance.stage.addEventListener(egret.Event.DEACTIVATE, SoundManager.deActivateHandler, this);
    };
    /**
     * 恢复播放
     */
    SoundManager.resumeBg = function () {
        if (!SoundManager.getSoundSwitch()) {
            return;
        }
        if (SoundManager.isInBackground) {
            return;
        }
        if (App.DeviceUtil.IsHtml5()) {
            if (!SoundManager.bgOn) {
                return;
            }
            SoundManager.bg.resume();
            egret.MainContext.instance.stage.addEventListener(egret.Event.DEACTIVATE, SoundManager.deActivateHandler, this);
        }
        else {
            SoundManager.playBg(SoundManager.currBg);
        }
    };
    /**
     * 暂停播放
     */
    SoundManager.pauseBg = function () {
        if (App.DeviceUtil.IsHtml5()) {
            SoundManager.bg.pause();
            egret.MainContext.instance.stage.removeEventListener(egret.Event.DEACTIVATE, SoundManager.deActivateHandler, this);
        }
        else {
            SoundManager.stopBg();
        }
    };
    /**
     * 停止背景音乐
     */
    SoundManager.stopBg = function () {
        SoundManager.bg.stop();
        egret.MainContext.instance.stage.removeEventListener(egret.Event.DEACTIVATE, SoundManager.deActivateHandler, this);
    };
    SoundManager.stopBgByName = function (bgName) {
        if (SoundManager.currBg == bgName) {
            SoundManager.stopBg();
        }
    };
    SoundManager.stopEffect = function (effectName) {
        if (SoundManager.effect) {
            if (SoundManager.VoiceOn) {
                var neweffectName = effectName + "_tw";
                if (RES.hasRes(neweffectName)) {
                    effectName = neweffectName;
                }
            }
            SoundManager.effect.stop(effectName, App.DeviceUtil.isWXgame());
        }
    };
    /**
     * 设置音效是否开启
     * @param $isOn
     */
    SoundManager.setEffectOn = function ($isOn) {
        SoundManager.effectOn = $isOn;
    };
    /**
   * 设置音效是否开启
   * @param $isOn
   */
    SoundManager.setVoiceOn = function ($isOn) {
        SoundManager.VoiceOn = $isOn;
    };
    /**
     * 设置背景音乐是否开启
     * @param $isOn
     */
    SoundManager.setBgOn = function ($isOn) {
        SoundManager.bgOn = $isOn;
        if (!SoundManager.bgOn) {
            SoundManager.stopBg();
        }
        else {
            if (SoundManager.currBg) {
                SoundManager.playBg(SoundManager.currBg);
            }
        }
    };
    /**
     * 设置背景音乐音量
     * @param volume
     */
    SoundManager.setBgVolume = function (volume) {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        SoundManager.bgVolume = volume;
        SoundManager.bg.setVolume(SoundManager.bgVolume);
    };
    /**
     * 获取背景音乐音量
     * @returns {number}
     */
    SoundManager.getBgVolume = function () {
        return SoundManager.bgVolume;
    };
    /**
     * 设置音效音量
     * @param volume
     */
    SoundManager.setEffectVolume = function (volume) {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        SoundManager.effectVolume = volume;
        SoundManager.effect.setVolume(SoundManager.effectVolume);
    };
    SoundManager.setBgName = function (bgName) {
        SoundManager.currBg = bgName;
    };
    SoundManager.deActivateHandler = function (e) {
        SoundManager.stopBg();
        egret.MainContext.instance.stage.addEventListener(egret.Event.ACTIVATE, SoundManager.activateHandler, this);
    };
    SoundManager.activateHandler = function (e) {
        SoundManager.playBg(SoundManager.currBg);
        egret.MainContext.instance.stage.removeEventListener(egret.Event.ACTIVATE, SoundManager.activateHandler, this);
    };
    /**
     * 获取音效音量
     * @returns {number}
     */
    SoundManager.getEffectVolume = function () {
        return SoundManager.effectVolume;
    };
    SoundManager.prototype.dispose = function () {
        SoundManager.isInBackground = false;
        SoundManager.effectLastTime = {};
    };
    /**
     * 音乐文件清理时间
     * @type {number}
     */
    SoundManager.CLEAR_TIME = 3 * 60 * 1000;
    SoundManager.isInBackground = false;
    SoundManager.effectInfoTab = { "effect_battle_attack1": { "time": 350, "maxCount": 5, "curCount": 0 }, "effect_battle_attack2": { "time": 300, "maxCount": 5, "curCount": 0 }, };
    SoundManager.effectTimeOut = [];
    SoundManager.effectCountTab = {};
    SoundManager.effectLastTime = {};
    return SoundManager;
}(BaseClass));
__reflect(SoundManager.prototype, "SoundManager");
