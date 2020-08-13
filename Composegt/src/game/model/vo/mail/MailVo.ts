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
	/**索引列表 排重  */
	public constructor() 
	{
		super();
	}
	public initData(data:any):void
	{
		// this._aidList = new Array();
		if(data)
		{
			if(data.system)
			{
				// if(this.mailInfoVoObj == null)
				// {
					this.mailInfoVoObj = {};
				// }
				if(data.system.c)
				{
					let list = data.system.c
					
					var aidList = {};
					for(var key in list)
					{
						//邮件排除重复
						if(list[key].extra&&list[key].extra.aid)
						{
							let aid = list[key].extra.aid+"#"+list[key].extra.mt
							if(!aidList[aid] )
							{
								if(aid.indexOf("punish") != -1 || aid.indexOf("rankActive") != -1||aid.indexOf("rescue") != -1)
								{
									aidList[aid]= 1;
								}
								
							}else{
								continue
							}
						}
						
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
					this.totalNum = list.length;
					if(!this.totalNum)
					{
						this.totalNum = 0;
					}
				}
				// if(data.system.mids && data.system.mids[0])
				// {
				// 	this.totalNum =data.system.mids.length;// Number(data.system.mids[0])
				// }
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
		this.totalNum = null;
	}
}