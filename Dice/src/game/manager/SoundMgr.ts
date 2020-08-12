/**
 * Created by yangsong on 15-1-14.
 * Sound管理类
 */
class SoundMgr extends BaseClass 
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
    private static currBg:string;
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
        SoundMgr.bgOn = true;
        SoundMgr.effectOn = true;
        if(LocalStorageMgr.get(LocalStorageConst.LOCAL_MUSIC_SWITCH) != ""){
            SoundMgr.bgOn = LocalStorageMgr.get(LocalStorageConst.LOCAL_MUSIC_SWITCH) == "ON";
        }
        if(LocalStorageMgr.get(LocalStorageConst.LOCAL_SOUND_SWITCH) != ""){
            SoundMgr.effectOn = LocalStorageMgr.get(LocalStorageConst.LOCAL_SOUND_SWITCH) == "ON";
        }

        SoundMgr.bgVolume = 0.5;
        if(LocalStorageMgr.get(LocalStorageConst.LOCAL_MUSIC_NUM)!=""){
            SoundMgr.bgVolume = parseInt(LocalStorageMgr.get(LocalStorageConst.LOCAL_MUSIC_NUM)) / 100;
        }
        SoundMgr.effectVolume = 0.5;
        if(LocalStorageMgr.get(LocalStorageConst.LOCAL_SOUND_NUM)!=""){
            SoundMgr.effectVolume = parseInt(LocalStorageMgr.get(LocalStorageConst.LOCAL_SOUND_NUM)) / 100;
        }

        SoundMgr.bg = new SoundBg();
        SoundMgr.bg.setVolume(SoundMgr.bgVolume);

        SoundMgr.effect = new SoundEffects();
        SoundMgr.effect.setVolume(SoundMgr.effectVolume);
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
        let type = LocalStorageMgr.get(LocalStorageConst.LOCAL_SOUND_SWITCH);
		if(type == "" || type == "ON"){
			return true;
		}
        return false;
    }

    /**
     * 获取的背景音乐的开关
     */
    public static getMusicSwitch():boolean{
        let type = LocalStorageMgr.get(LocalStorageConst.LOCAL_MUSIC_SWITCH);
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
        if(!SoundMgr.getSoundSwitch())
        {
            return;
        }
        if(SoundMgr.isInBackground)
        {
            return;
        }
        if (!SoundMgr.effectOn)
            return;
        
        if(SoundMgr.VoiceOn)
        {
             let neweffectName=effectName+"_tw";
             if(RES.hasRes(neweffectName))
             {
                 effectName = neweffectName;
             } 
        }
        

        if ( SoundMgr.effectLastTime[effectName] == null ) {
            SoundMgr.effectLastTime[effectName] = 1;
            SoundMgr.effect.play(effectName);
            SoundMgr.effectLastTime[effectName] = egret.getTimer() + App.MathUtil.getRandom() + 100;
        }
        else {
            if ( SoundMgr.effectLastTime[effectName] < egret.getTimer()) {
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
        
    }

    public static playEffectCallback(effectName:string):void 
	{
         SoundMgr.effectCountTab[effectName] -= 1;
    }

    /**
     * 播放背景音乐
     * @param key
     */
    public static playBg(bgName:string):void 
	{
        SoundMgr.currBg = bgName;
        if(!SoundMgr.getMusicSwitch())
        {
            return;
        }
        if(SoundMgr.isInBackground)
        {
            return;
        }
        if (!SoundMgr.bgOn)
            return;

        SoundMgr.bg.play(bgName);
        egret.MainContext.instance.stage.addEventListener(egret.Event.DEACTIVATE, SoundMgr.deActivateHandler, this);
    }
    
    /**
     * 恢复播放
     */ 
    public static resumeBg():void
    {
        if(!SoundMgr.getSoundSwitch())
        {
            return;
        }
        if(SoundMgr.isInBackground)
        {
            return;
        }
        if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isWXgame()||App.DeviceUtil.isRuntime2())
        {
            if (!SoundMgr.bgOn)
            {
                return;
            }
            SoundMgr.bg.resume();
            egret.MainContext.instance.stage.addEventListener(egret.Event.DEACTIVATE, SoundMgr.deActivateHandler, this);
        }
        else
        {
            SoundMgr.playBg(SoundMgr.currBg);
        }
    }
    /**
     * 暂停播放
     */ 
    public static pauseBg():void
    {
        if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isWXgame()||App.DeviceUtil.isRuntime2())
        {
            SoundMgr.bg.pause();
            egret.MainContext.instance.stage.removeEventListener(egret.Event.DEACTIVATE, SoundMgr.deActivateHandler, this);
        }
        else
        {
            SoundMgr.stopBg();
        }
    }

    /**
     * 停止背景音乐
     */
    public static stopBg():void 
	{
        SoundMgr.bg.stop();
        egret.MainContext.instance.stage.removeEventListener(egret.Event.DEACTIVATE, SoundMgr.deActivateHandler, this);
    }

    public static stopBgByName(bgName:string):void
    {
        if(SoundMgr.currBg==bgName)
        {
            SoundMgr.stopBg();
        }
    }

    public static stopEffect(effectName:string):void
    {
        if(SoundMgr.effect)
        {   
            if(SoundMgr.VoiceOn)
            {
                let neweffectName=effectName+"_tw";
                if(RES.hasRes(neweffectName))
                {
                    effectName = neweffectName;
                } 
            }
            SoundMgr.effect.stop(effectName, App.DeviceUtil.isWXgame());
        }
    }

    /**
     * 设置音效是否开启
     * @param $isOn
     */
    public static setEffectOn($isOn:boolean):void 
	{
        SoundMgr.effectOn = $isOn;
    }

      /**
     * 设置音效是否开启
     * @param $isOn
     */
    public static setVoiceOn($isOn:boolean):void 
	{
        SoundMgr.VoiceOn = $isOn;
    }


    /**
     * 设置背景音乐是否开启
     * @param $isOn
     */
    public static setBgOn($isOn:boolean):void
	 {
        SoundMgr.bgOn = $isOn;
        if (!SoundMgr.bgOn) 
		{
            SoundMgr.stopBg();
        } 
		else 
		{
            if (SoundMgr.currBg) 
			{
                SoundMgr.playBg(SoundMgr.currBg);
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
        SoundMgr.bgVolume = volume;
        SoundMgr.bg.setVolume(SoundMgr.bgVolume);
    }

    /**
     * 获取背景音乐音量
     * @returns {number}
     */
    public static getBgVolume():number 
	{
        return SoundMgr.bgVolume;
    }

    /**
     * 设置音效音量
     * @param volume
     */
    public static setEffectVolume(volume:number):void 
	{
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        SoundMgr.effectVolume = volume;
        SoundMgr.effect.setVolume(SoundMgr.effectVolume);
    }
    
    public static setBgName(bgName: string):void
    {
        SoundMgr.currBg = bgName;
    }
    
    private static deActivateHandler(e:egret.Event):void
    {
        SoundMgr.stopBg();
        egret.MainContext.instance.stage.addEventListener(egret.Event.ACTIVATE, SoundMgr.activateHandler, this);
    }
    
    private static activateHandler(e:egret.Event):void
    {
        SoundMgr.playBg(SoundMgr.currBg);
        egret.MainContext.instance.stage.removeEventListener(egret.Event.ACTIVATE, SoundMgr.activateHandler, this);
    }

    /**
     * 获取音效音量
     * @returns {number}
     */
    public static getEffectVolume():number 
	{
        return SoundMgr.effectVolume;
    }

	public dispose():void
	{   
        SoundMgr.isInBackground = false;
        SoundMgr.effectLastTime = {};
	}
}