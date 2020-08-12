/**
 * 邮件详情
 * author dmj
 * date 2017/10/31
 * @class MailInfoVo
 */
class MailInfoVo extends BaseVo
{
	/**邮件发送时间 */
	public ts:number = 0;
	/**是否读过 */
	public isread:number = 0;
	/**邮件库id */
	public mid:number = 0;
	/**邮件标题 */
	public title:string = "";
	/**邮件奖励 */
	public rewards:string = "";
	/**邮件内容 */
	public content:string = null;

	public constructor() 
	{
		super();
	}
	public initData(data:any):void
	{
		if(data){
			this.mid = data.id || this.mid;
			this.title = data.title || "";
			this.content = data.content || "";
			this.ts = data.ts || "";
			this.rewards = data.rewards || "";
			this.isread = data.isread || 0;
		}
	}
	/**接收邮件的时间 */
	public get timeStr():string
	{
		return App.DateUtil.getFormatBySecond(this.ts,6);
	}
	public dispose():void
	{
		this.ts = 0;
		this.isread = 0;
		this.mid = 0;
		this.title = "";
		this.content = null;
	}
}