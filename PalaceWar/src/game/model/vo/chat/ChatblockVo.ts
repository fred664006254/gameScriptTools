/**
 * 聊天屏蔽VO
 * author dky
 * date 2018/3/13
 * @class ChatblockVo
 */
class ChatblockVo extends BaseVo
{
	// 屏蔽vo列表
	public chatblockVoObj:Object = null;
	public info:any[];
	public list:any[];
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			
			if(data.info)
			{
				this.info = data.info
				
			}
			if(data.list)
			{
				this.list = data.list
				
			}
		}
	}
	public dispose():void
	{
	
		this.chatblockVoObj = null;
		this.info = [];
		this.list = [];
	}
}