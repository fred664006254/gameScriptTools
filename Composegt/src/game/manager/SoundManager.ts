/**
 * Created by yangsong on 15-1-14.
 * Sound管理类
 */
class SoundManager extends BaseClass 
{
    /**
     * 音乐文件清理时间
     * @type {number}
     */
    public static CLEAR_TIME:number = 3 * 60 * 1000;

    private static effect:SoundEffects;
    private static bg:SoundBg;
    private static effectOn:boolean;
    private static bgOn:boolean;
    public static currBg:string;
    private static bgVolume:number;
    private static effectVolume:number;
    public static isInBackground:boolean = false;
	
    private static effectInfoTab = {"effect_battle_attack1":{"time":350,"maxCount":5,"curCount":0},"effect_battle_attack2":{"time":300,"maxCount":5,"curCount":0},};
    private static effectTimeOut:number[] = [];
    private static effectCountTab:any = {};

    private static effectLastTime:any = {};

     private static VoiceOn:boolean;
    /**
     * 构造函数
     */
    public static init():void
    {
        SoundManager.bgOn = true;
        SoundManager.effectOn = true;

        SoundManager.bgVolume = 0.5;
        SoundManager.effectVolume = 1;

        SoundManager.bg = new SoundBg();
        SoundManager.bg.setVolume(SoundManager.bgVolume);

        SoundManager.effect = new SoundEffects();
        SoundManager.effect.setVolume(SoundManager.effectVolume);
    }
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
    public static getSoundSwitch():boolean
    {

        let type = LocalStorageManager.get(LocalStorageConst.LOCAL_SOUND_SWITCH);
		let color = TextFieldConst.COLOR_WARN_GREEN;
		if(type == "" || type == "ON"){
			return true;
		}
        return false;
    }
    /**
     * 播放音效
     * @param effectName
     */
    public static playEffect(effectName:string):void 
	{   
        if(!SoundManager.getSoundSwitch())
        {
            return;
        }
        if(SoundManager.isInBackground)
        {
            return;
        }
        if (!SoundManager.effectOn)
            return;
        
        if(SoundManager.VoiceOn)
        {
             let neweffectName=effectName+"_tw";
             if(RES.hasRes(neweffectName))
             {
                 effectName = neweffectName;
             } 
        }
        

        if ( SoundManager.effectLastTime[effectName] == null ) {
            SoundManager.effectLastTime[effectName] = 1;
            SoundManager.effect.play(effectName);
            SoundManager.effectLastTime[effectName] = egret.getTimer() + App.MathUtil.getRandom() + 100;
        }
        else {
            if ( SoundManager.effectLastTime[effectName] < egret.getTimer()) {
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
        
    }

    public static playEffectCallback(effectName:string):void 
	{
         SoundManager.effectCountTab[effectName] -= 1;
    }

    /**
     * 播放背景音乐
     * @param key
     */
    public static playBg(bgName:string):void 
	{
        
        if(!SoundManager.getSoundSwitch())
        {
            return;
        }
        if(SoundManager.isInBackground)
        {
            return;
        }
       
        if (!SoundManager.bgOn)
            return;
         SoundManager.currBg = bgName;
        SoundManager.bg.play(bgName);
        egret.MainContext.instance.stage.addEventListener(egret.Event.DEACTIVATE, SoundManager.deActivateHandler, this);
    }
    
    /**
     * 恢复播放
     */ 
    public static resumeBg():void
    {
        if(!SoundManager.getSoundSwitch())
        {
            return;
        }
        if(SoundManager.isInBackground)
        {
            return;
        }
        if(App.DeviceUtil.IsHtml5())
        {
            if (!SoundManager.bgOn)
            {
                return;
            }
            SoundManager.bg.resume();
            egret.MainContext.instance.stage.addEventListener(egret.Event.DEACTIVATE, SoundManager.deActivateHandler, this);
        }
        else
        {
            SoundManager.playBg(SoundManager.currBg);
        }
    }
    /**
     * 暂停播放
     */ 
    public static pauseBg():void
    {
        if(App.DeviceUtil.IsHtml5())
        {
            SoundManager.bg.pause();
            egret.MainContext.instance.stage.removeEventListener(egret.Event.DEACTIVATE, SoundManager.deActivateHandler, this);
        }
        else
        {
            SoundManager.stopBg();
        }
    }

    /**
     * 停止背景音乐
     */
    public static stopBg():void 
	{
        SoundManager.bg.stop();
        egret.MainContext.instance.stage.removeEventListener(egret.Event.DEACTIVATE, SoundManager.deActivateHandler, this);
    }

    public static stopBgByName(bgName:string):void
    {
        if(SoundManager.currBg==bgName)
        {
            SoundManager.stopBg();
        }
    }

    public static stopEffect(effectName:string):void
    {
        if(SoundManager.effect)
        {   
            if(SoundManager.VoiceOn)
            {
                let neweffectName=effectName+"_tw";
                if(RES.hasRes(neweffectName))
                {
                    effectName = neweffectName;
                } 
            }
            SoundManager.effect.stop(effectName, App.DeviceUtil.isWXgame());
        }
    }

    /**
     * 设置音效是否开启
     * @param $isOn
     */
    public static setEffectOn($isOn:boolean):void 
	{
        SoundManager.effectOn = $isOn;
    }

      /**
     * 设置音效是否开启
     * @param $isOn
     */
    public static setVoiceOn($isOn:boolean):void 
	{
        SoundManager.VoiceOn = $isOn;
    }


    /**
     * 设置背景音乐是否开启
     * @param $isOn
     */
    public static setBgOn($isOn:boolean):void
	 {
        SoundManager.bgOn = $isOn;
        if (!SoundManager.bgOn) 
		{
            SoundManager.stopBg();
        } 
		else 
		{
            if (SoundManager.currBg) 
			{
                SoundManager.playBg(SoundManager.currBg);
            }
        }
    }

    /**
     * 设置背景音乐音量
     * @param volume
     */
    public static setBgVolume(volume:number):void 
	{
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        SoundManager.bgVolume = volume;
        SoundManager.bg.setVolume(SoundManager.bgVolume);
    }

    /**
     * 获取背景音乐音量
     * @returns {number}
     */
    public static getBgVolume():number 
	{
        return SoundManager.bgVolume;
    }

    /**
     * 设置音效音量
     * @param volume
     */
    public static setEffectVolume(volume:number):void 
	{
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        SoundManager.effectVolume = volume;
        SoundManager.effect.setVolume(SoundManager.effectVolume);
    }
    
    public static setBgName(bgName: string):void
    {
        SoundManager.currBg = bgName;
    }
    
    private static deActivateHandler(e:egret.Event):void
    {
        SoundManager.stopBg();
        egret.MainContext.instance.stage.addEventListener(egret.Event.ACTIVATE, SoundManager.activateHandler, this);
    }
    
    private static activateHandler(e:egret.Event):void
    {
        SoundManager.playBg(SoundManager.currBg);
        egret.MainContext.instance.stage.removeEventListener(egret.Event.ACTIVATE, SoundManager.activateHandler, this);
    }

    /**
     * 获取音效音量
     * @returns {number}
     */
    public static getEffectVolume():number 
	{
        return SoundManager.effectVolume;
    }

	public dispose():void
	{   
        SoundManager.isInBackground = false;
        SoundManager.effectLastTime = {};
	}
}