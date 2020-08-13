class SadunVoApi extends BaseVoApi
{
	private prisonVo:PrisonVo;
	private currPrison:number=0;
	public constructor()
	{
		super();
	} 

    //  功能预览用于，判断是否完成第一次子嗣联姻／
	public isShowNpc():boolean
	{
        let achVo =Api.achievementVoApi.getAchievementInfoVoById("403");
		if(achVo)
		{
			if(achVo.v>0)
			{
				return true;
			}
		}  
        return false;
	} 
	
	public dispose():void
	{
		this.currPrison=0;
		super.dispose();
	}
}