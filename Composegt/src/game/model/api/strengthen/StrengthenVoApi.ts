 
class StrengthenVoApi extends BaseVoApi
{
	private studyatkVo:StudyatkVo;
	public constructor() 
	{
		super();
	} 
    public checkNpcMessage():boolean
    {
        let arr =["challenge","manage","affair","search","wife","servant","bookroom","studyatk"];
        for(let i:number =0;i < arr.length;i++)
		{ 
			let openType =arr[i]
		 
				if(openType=="servant")
				{
					if([openType+"VoApi"]&&Api[openType+"VoApi"].checkRedPoint())
					{   
						return true;
					}
				} 
				else if(openType=="affair")
				{
					// if (Api.manageVoApi.getCurAffairNums() > 0)
					// {
					// 	return true;
					// } 
				}
				else if(openType=="bookroom")  //太学 门客不需要解锁
				{
					if(Api[openType+"VoApi"]&&Api[openType+"VoApi"].checkNpcMessage())
					{
						return true;
					}
				}
				else if(Api[openType+"VoApi"]&&Api[openType+"VoApi"].isShowNpc)
				{
					let isShowNpc:boolean=Api[openType+"VoApi"].isShowNpc(); 
					if(isShowNpc&&Api[openType+"VoApi"]&&Api[openType+"VoApi"].checkNpcMessage())
					{ 
						return true;
					}   
				}   
		}
        return false;
    } 
    
}