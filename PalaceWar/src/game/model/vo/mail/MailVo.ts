/**
 * 邮件vo
 * author dmj
 * date 2017/10/31
 * @class MailVo
 */
class MailVo extends BaseVo
{
	public mailInfoVoObj:Object = null;
	/**未读取邮件数量 */
	public unread:number = 0;
	/**邮件总数  */
	public totalNum:number = 0;
	public constructor() 
	{
		super();
	}
	public initData(data:any):void
	{
		if(data)
		{
			if(data.system)
			{
				if(this.mailInfoVoObj == null)
				{
					this.mailInfoVoObj = {};
				}
				if(data.system.c)
				{
					let list = data.system.c;
					
					for(var key in list)
					{
						let mid = list[key].mid
						if(this.mailInfoVoObj[mid])
						{
							this.mailInfoVoObj[mid].initData(list[key]);
						}
						else
						{
							let mailInfoVo:MailInfoVo = new MailInfoVo();
							mailInfoVo.initData(list[key]);
							this.mailInfoVoObj[mid] = mailInfoVo;
						}
					}
					
					if(Object.keys(data.system.c).length==0)
					{
						this.totalNum =0;
					}
					else
					{
						this.totalNum = list.length;
					}
				} 
			}

			if(data.unread)
			{
				this.unread = data.unread.system;
			}
		}
	}

	public dispose():void
	{
		this.mailInfoVoObj = null;
		this.unread = null;
		this.totalNum = 0;
	}
}