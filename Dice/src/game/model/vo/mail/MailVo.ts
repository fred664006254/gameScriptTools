/**
 * 邮件vo
 * author dmj
 * date 2017/10/31
 * @class MailVo
 */
class MailVo extends BaseVo
{
	public mailInfoMap = {};
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
		if(data && data.system){
			let keys = Object.keys(data.system);
			this.totalNum = keys.length;
			this.unread = 0;
			for (const key in data.system) {
				if (data.system.hasOwnProperty(key)) {
					const element = data.system[key];
					this.mailInfoMap[key] = element;
					if(element.isread == 0){
						this.unread++;
					}
				}
			}
		}
	}

	public dispose():void
	{
		this.mailInfoMap = null;
		this.unread = 0;
		this.totalNum = 0;
	}
}