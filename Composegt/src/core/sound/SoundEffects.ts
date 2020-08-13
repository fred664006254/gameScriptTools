/**
 * Created by yangsong on 15-1-14.
 * 音效类
 */
class SoundEffects extends BaseSound 
{
    private _volume:number=1;
    private _channelList:Object={};
    private _effectLength:Object={};

    /**
     * 构造函数
     */
    public constructor() {
        super();
    }

    /**
     * 播放一个音效
     * @param effectName
     */
    public play(effectName:string):void
	{
        var sound:egret.Sound = this.getSound(effectName);
        if (sound)
		{
            sound.type = egret.Sound.EFFECT;
            if(!this._effectLength[effectName])
            {
                this._effectLength[effectName]=sound.length;
            }
            if(this._channelList[effectName]==null)
            {
                this._channelList[effectName]={};
            }
            let soundCHannel:egret.SoundChannel=this.playSound(sound);
            if(soundCHannel)
            {
                soundCHannel["effectName"]=effectName;
                this._channelList[effectName][soundCHannel.hashCode]=soundCHannel;
            }
        }
    }

    public stop(effectName:string, force):void
    {
        let soundList:Object=this._channelList[effectName];
        if(soundList)
        {
            for(let key in soundList)
            {
                let sound:egret.SoundChannel=soundList[key];
                if(sound)
                {
                    if(!this._effectLength[effectName])
                    {
                        this._effectLength[effectName]=0;
                    }
                    if(sound.position<this._effectLength[effectName] || force)
                    {
                        sound.stop();
                    }
                }
                sound.removeEventListener(egret.Event.SOUND_COMPLETE,this.removeSoundChannel,this);
                delete this._channelList[effectName][key];
            }
        }
    }

    /**
     * 播放
     * @param sound
     */
    private playSound(sound:egret.Sound):egret.SoundChannel 
	{
        try{
            var channel:egret.SoundChannel = sound.play(0, 1);
            channel.addEventListener(egret.Event.SOUND_COMPLETE,this.removeSoundChannel,this);
            channel.volume = this._volume;
            return channel;
        }
        catch(e)
        {
        }
    }

    private removeSoundChannel(e:egret.Event):void
    {
        let soundChannel:egret.SoundChannel=e.target;
        if(soundChannel)
        {
            soundChannel.removeEventListener(egret.Event.SOUND_COMPLETE,this.removeSoundChannel,this)
            let effectName:string=soundChannel["effectName"];
            if(effectName&&this._channelList[effectName])
            {
                delete this._channelList[effectName][soundChannel.hashCode];
            }
        }
    }

    /**
     * 设置音量
     * @param volume
     */
    public setVolume(volume:number):void 
	{
        this._volume = volume;
    }


    /**
     * 资源加载完成后处理播放
     * @param key
     */
    public loadedPlay(key:string):void 
	{
        // this.playSound(ResourceManager.getRes(key));
        var sound:egret.Sound = ResourceManager.getRes(key);
        if (sound)
		{
            sound.type = egret.Sound.EFFECT;
            if(!this._effectLength[key])
            {
                this._effectLength[key]=sound.length;
            }
            if(this._channelList[key]==null)
            {
                this._channelList[key]={};
            }
            let soundCHannel:egret.SoundChannel=this.playSound(sound);
            if(soundCHannel)
            {
                soundCHannel["effectName"]=key;
                this._channelList[key][soundCHannel.hashCode]=soundCHannel;
            }
        }
    }
}