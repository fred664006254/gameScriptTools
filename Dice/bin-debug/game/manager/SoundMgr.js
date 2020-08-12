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
var SoundMgr = (function (_super) {
    __extends(SoundMgr, _super);
    function SoundMgr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 构造函数
     */
    SoundMgr.init = function () {
        SoundMgr.bgOn = true;
        SoundMgr.effectOn = true;
        if (LocalStorageMgr.get(LocalStorageConst.LOCAL_MUSIC_SWITCH) != "") {
            SoundMgr.bgOn = LocalStorageMgr.get(LocalStorageConst.LOCAL_MUSIC_SWITCH) == "ON";
        }
        if (LocalStorageMgr.get(LocalStorageConst.LOCAL_SOUND_SWITCH) != "") {
            SoundMgr.effectOn = LocalStorageMgr.get(LocalStorageConst.LOCAL_SOUND_SWITCH) == "ON";
        }
        SoundMgr.bgVolume = 0.5;
        if (LocalStorageMgr.get(LocalStorageConst.LOCAL_MUSIC_NUM) != "") {
            SoundMgr.bgVolume = parseInt(LocalStorageMgr.get(LocalStorageConst.LOCAL_MUSIC_NUM)) / 100;
        }
        SoundMgr.effectVolume = 0.5;
        if (LocalStorageMgr.get(LocalStorageConst.LOCAL_SOUND_NUM) != "") {
            SoundMgr.effectVolume = parseInt(LocalStorageMgr.get(LocalStorageConst.LOCAL_SOUND_NUM)) / 100;
        }
        SoundMgr.bg = new SoundBg();
        SoundMgr.bg.setVolume(SoundMgr.bgVolume);
        SoundMgr.effect = new SoundEffects();
        SoundMgr.effect.setVolume(SoundMgr.effectVolume);
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
    SoundMgr.getSoundSwitch = function () {
        var type = LocalStorageMgr.get(LocalStorageConst.LOCAL_SOUND_SWITCH);
        if (type == "" || type == "ON") {
            return true;
        }
        return false;
    };
    /**
     * 获取的背景音乐的开关
     */
    SoundMgr.getMusicSwitch = function () {
        var type = LocalStorageMgr.get(LocalStorageConst.LOCAL_MUSIC_SWITCH);
        if (type == "" || type == "ON") {
            return true;
        }
        return false;
    };
    /**
     * 播放音效
     * @param effectName
     */
    SoundMgr.playEffect = function (effectName) {
        if (!SoundMgr.getSoundSwitch()) {
            return;
        }
        if (SoundMgr.isInBackground) {
            return;
        }
        if (!SoundMgr.effectOn)
            return;
        if (SoundMgr.VoiceOn) {
            var neweffectName = effectName + "_tw";
            if (RES.hasRes(neweffectName)) {
                effectName = neweffectName;
            }
        }
        if (SoundMgr.effectLastTime[effectName] == null) {
            SoundMgr.effectLastTime[effectName] = 1;
            SoundMgr.effect.play(effectName);
            SoundMgr.effectLastTime[effectName] = egret.getTimer() + App.MathUtil.getRandom() + 100;
        }
        else {
            if (SoundMgr.effectLastTime[effectName] < egret.getTimer()) {
                SoundMgr.effect.play(effectName);
                SoundMgr.effectLastTime[effectName] = egret.getTimer() + App.MathUtil.getRandom() + 100;
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
    SoundMgr.playEffectCallback = function (effectName) {
        SoundMgr.effectCountTab[effectName] -= 1;
    };
    /**
     * 播放背景音乐
     * @param key
     */
    SoundMgr.playBg = function (bgName) {
        SoundMgr.currBg = bgName;
        if (!SoundMgr.getMusicSwitch()) {
            return;
        }
        if (SoundMgr.isInBackground) {
            return;
        }
        if (!SoundMgr.bgOn)
            return;
        SoundMgr.bg.play(bgName);
        egret.MainContext.instance.stage.addEventListener(egret.Event.DEACTIVATE, SoundMgr.deActivateHandler, this);
    };
    /**
     * 恢复播放
     */
    SoundMgr.resumeBg = function () {
        if (!SoundMgr.getSoundSwitch()) {
            return;
        }
        if (SoundMgr.isInBackground) {
            return;
        }
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isWXgame() || App.DeviceUtil.isRuntime2()) {
            if (!SoundMgr.bgOn) {
                return;
            }
            SoundMgr.bg.resume();
            egret.MainContext.instance.stage.addEventListener(egret.Event.DEACTIVATE, SoundMgr.deActivateHandler, this);
        }
        else {
            SoundMgr.playBg(SoundMgr.currBg);
        }
    };
    /**
     * 暂停播放
     */
    SoundMgr.pauseBg = function () {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isWXgame() || App.DeviceUtil.isRuntime2()) {
            SoundMgr.bg.pause();
            egret.MainContext.instance.stage.removeEventListener(egret.Event.DEACTIVATE, SoundMgr.deActivateHandler, this);
        }
        else {
            SoundMgr.stopBg();
        }
    };
    /**
     * 停止背景音乐
     */
    SoundMgr.stopBg = function () {
        SoundMgr.bg.stop();
        egret.MainContext.instance.stage.removeEventListener(egret.Event.DEACTIVATE, SoundMgr.deActivateHandler, this);
    };
    SoundMgr.stopBgByName = function (bgName) {
        if (SoundMgr.currBg == bgName) {
            SoundMgr.stopBg();
        }
    };
    SoundMgr.stopEffect = function (effectName) {
        if (SoundMgr.effect) {
            if (SoundMgr.VoiceOn) {
                var neweffectName = effectName + "_tw";
                if (RES.hasRes(neweffectName)) {
                    effectName = neweffectName;
                }
            }
            SoundMgr.effect.stop(effectName, App.DeviceUtil.isWXgame());
        }
    };
    /**
     * 设置音效是否开启
     * @param $isOn
     */
    SoundMgr.setEffectOn = function ($isOn) {
        SoundMgr.effectOn = $isOn;
    };
    /**
   * 设置音效是否开启
   * @param $isOn
   */
    SoundMgr.setVoiceOn = function ($isOn) {
        SoundMgr.VoiceOn = $isOn;
    };
    /**
     * 设置背景音乐是否开启
     * @param $isOn
     */
    SoundMgr.setBgOn = function ($isOn) {
        SoundMgr.bgOn = $isOn;
        if (!SoundMgr.bgOn) {
            SoundMgr.stopBg();
        }
        else {
            if (SoundMgr.currBg) {
                SoundMgr.playBg(SoundMgr.currBg);
            }
        }
    };
    /**
     * 设置背景音乐音量
     * @param volume
     */
    SoundMgr.setBgVolume = function (volume) {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        SoundMgr.bgVolume = volume;
        SoundMgr.bg.setVolume(SoundMgr.bgVolume);
    };
    /**
     * 获取背景音乐音量
     * @returns {number}
     */
    SoundMgr.getBgVolume = function () {
        return SoundMgr.bgVolume;
    };
    /**
     * 设置音效音量
     * @param volume
     */
    SoundMgr.setEffectVolume = function (volume) {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        SoundMgr.effectVolume = volume;
        SoundMgr.effect.setVolume(SoundMgr.effectVolume);
    };
    SoundMgr.setBgName = function (bgName) {
        SoundMgr.currBg = bgName;
    };
    SoundMgr.deActivateHandler = function (e) {
        SoundMgr.stopBg();
        egret.MainContext.instance.stage.addEventListener(egret.Event.ACTIVATE, SoundMgr.activateHandler, this);
    };
    SoundMgr.activateHandler = function (e) {
        SoundMgr.playBg(SoundMgr.currBg);
        egret.MainContext.instance.stage.removeEventListener(egret.Event.ACTIVATE, SoundMgr.activateHandler, this);
    };
    /**
     * 获取音效音量
     * @returns {number}
     */
    SoundMgr.getEffectVolume = function () {
        return SoundMgr.effectVolume;
    };
    SoundMgr.prototype.dispose = function () {
        SoundMgr.isInBackground = false;
        SoundMgr.effectLastTime = {};
    };
    /**
     * 音乐文件清理时间
     * @type {number}
     */
    SoundMgr.CLEAR_TIME = 3 * 60 * 1000;
    SoundMgr.isInBackground = false;
    SoundMgr.effectInfoTab = { "effect_battle_attack1": { "time": 350, "maxCount": 5, "curCount": 0 }, "effect_battle_attack2": { "time": 300, "maxCount": 5, "curCount": 0 }, };
    SoundMgr.effectTimeOut = [];
    SoundMgr.effectCountTab = {};
    SoundMgr.effectLastTime = {};
    return SoundMgr;
}(BaseClass));
__reflect(SoundMgr.prototype, "SoundMgr");
//# sourceMappingURL=SoundMgr.js.map