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
 * 音效类
 */
var SoundEffects = (function (_super) {
    __extends(SoundEffects, _super);
    /**
     * 构造函数
     */
    function SoundEffects() {
        var _this = _super.call(this) || this;
        _this._volume = 1;
        _this._channelList = {};
        _this._effectLength = {};
        _this._loadingList = {}; //正在加载的音效
        _this._stopList = {}; //正在加载，但需要停止的音效
        return _this;
    }
    /**
     * 播放一个音效
     * @param effectName
     */
    SoundEffects.prototype.play = function (effectName) {
        var sound = this.getSound(effectName);
        if (sound) {
            sound.type = egret.Sound.EFFECT;
            if (!this._effectLength[effectName]) {
                this._effectLength[effectName] = sound.length;
            }
            if (this._channelList[effectName] == null) {
                this._channelList[effectName] = {};
            }
            var soundCHannel = this.playSound(sound);
            if (soundCHannel) {
                soundCHannel["effectName"] = effectName;
                this._channelList[effectName][soundCHannel.hashCode] = soundCHannel;
            }
            this._loadingList[effectName] = 1;
        }
    };
    SoundEffects.prototype.stop = function (effectName, force) {
        var soundList = this._channelList[effectName];
        if (soundList) {
            for (var key in soundList) {
                var sound = soundList[key];
                if (sound) {
                    if (!this._effectLength[effectName]) {
                        this._effectLength[effectName] = 0;
                    }
                    if (sound.position < this._effectLength[effectName] || force) {
                        sound.stop();
                    }
                }
                sound.removeEventListener(egret.Event.SOUND_COMPLETE, this.removeSoundChannel, this);
                delete this._channelList[effectName][key];
            }
        }
        if (this._loadingCache.indexOf(effectName) != -1) {
            delete this._loadingList[effectName];
            this._stopList[effectName] = 1;
        }
    };
    /**
     * 播放
     * @param sound
     */
    SoundEffects.prototype.playSound = function (sound) {
        try {
            var channel = sound.play(0, 1);
            channel.addEventListener(egret.Event.SOUND_COMPLETE, this.removeSoundChannel, this);
            channel.volume = this._volume;
            return channel;
        }
        catch (e) {
        }
    };
    SoundEffects.prototype.removeSoundChannel = function (e) {
        var soundChannel = e.target;
        if (soundChannel) {
            soundChannel.removeEventListener(egret.Event.SOUND_COMPLETE, this.removeSoundChannel, this);
            var effectName = soundChannel["effectName"];
            if (effectName && this._channelList[effectName]) {
                delete this._channelList[effectName][soundChannel.hashCode];
            }
        }
    };
    /**
     * 设置音量
     * @param volume
     */
    SoundEffects.prototype.setVolume = function (volume) {
        this._volume = volume;
    };
    /**
     * 资源加载完成后处理播放
     * @param key
     */
    SoundEffects.prototype.loadedPlay = function (key) {
        // this.playSound(ResourceManager.getRes(key));
        var sound = ResourceManager.getRes(key);
        if (sound) {
            if (this._stopList[key] == 1) {
                delete this._stopList[key];
                return;
            }
            sound.type = egret.Sound.EFFECT;
            if (!this._effectLength[key]) {
                this._effectLength[key] = sound.length;
            }
            if (this._channelList[key] == null) {
                this._channelList[key] = {};
            }
            var soundCHannel = this.playSound(sound);
            if (soundCHannel) {
                soundCHannel["effectName"] = key;
                this._channelList[key][soundCHannel.hashCode] = soundCHannel;
            }
            if (this._loadingList[key]) {
                delete this._loadingList[key];
            }
        }
    };
    return SoundEffects;
}(BaseSound));
__reflect(SoundEffects.prototype, "SoundEffects");
//# sourceMappingURL=SoundEffects.js.map