class GameinfoVoApi extends BaseVoApi
{
	private gameinfoVo:GameinfoVo;
	public constructor() 
	{
		super();
	}

	public getRegdt():number
	{
		return this.gameinfoVo?this.gameinfoVo.regdt:0;
	}
	public getGuideStep():number
	{
		return this.gameinfoVo?this.gameinfoVo.newerflag:0;
	}
	public getDownType():string {
		if (this.gameinfoVo && this.gameinfoVo.info && this.gameinfoVo.info.downType) {
			return this.gameinfoVo.info.downType;
		} else {
			return "";
		}
	} 

	 //"玩家性别 1代表是女，不存在则为男",
    public getSexnum()
    {
        return this.gameinfoVo.sexnum;
    }
    //"性转开关 大于等于1为开 否则为关",
    public getSexswitch()
    {
        if(!this.gameinfoVo)
        {
            return 0;
        }
        return this.gameinfoVo.sexswitch;
    }
	//"性转开关 大于等于1为开 否则为关",
    public setSexswitch(sex:number)
    {
        this.gameinfoVo.sexswitch =sex;
    }
    //"性转默认值 1代表有 不存在则为没有"
    public getSexdefault()
    {
        return this.gameinfoVo.sexdefault;
    }

     public setSexdefault()
    {
      this.gameinfoVo.sexdefault = 1;
    }

    public checkDailyTaskStepGuideComplete():boolean
    {
        return !!this.gameinfoVo.dailyTaskStepGuide;
    }
	
}