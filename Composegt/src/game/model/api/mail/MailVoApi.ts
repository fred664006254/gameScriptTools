/**
 * 邮件api
 * author dmj
 * date 2017/10/31
 * @class ShopVoApi
 */
class MailVoApi extends BaseVoApi
{
	private mailVo:MailVo;
	public constructor() 
	{
		super();
	}

	/**
	 * 解析邮件详情
	 * @param data {content:内容，mid:邮件id，touch:附件}
	 */
	public formatDetailData(data:any):void
	{
		if(data)
		{
			let mid:number = Number(data.mid);
			let mailInfoVo = this.getMailInfoVoById(mid);
			if(mailInfoVo)
			{
				mailInfoVo.initData(data);
			}
		}
	}

	/**
	 * 获取邮件列表
	 */
	public getMailInfoVoList():Array<MailInfoVo>
	{
		let mailInfoVoObj = this.mailVo.mailInfoVoObj;
		let arr:Array<MailInfoVo> = new Array();
		for(let key in mailInfoVoObj)
		{
			arr.push(mailInfoVoObj[key]);
		}
		arr.sort(this.sortA);
		return arr;
	}

	private sortA(a:MailInfoVo,b:MailInfoVo):number
	{
		if(a.isread == b.isread)
		{
			return b.mid - a.mid;
		}
		return a.isread - b.isread;
	}

	/**
	 * 未读取的邮件数量
	 */
	public getUnreadNum():number
	{
		return this.mailVo.unread;
	}

	/**
	 * 根据邮件mid获取邮件vo
	 * @param mid  邮件id 
	 */
	public getMailInfoVoById(mid:number):MailInfoVo
	{
		if(this.mailVo)
		{
			let mailInfoVoObj = this.mailVo.mailInfoVoObj;
			if(mailInfoVoObj && mailInfoVoObj[mid.toString()])
			{
				return mailInfoVoObj[mid.toString()];
			}
		}
		return null;
	}

	/**
	 * 邮件总数
	 */
	public getTotalNum():number
	{
		return this.mailVo.totalNum;
	}

	public dispose():void
	{
		this.mailVo=null;
		super.dispose();
	}
}