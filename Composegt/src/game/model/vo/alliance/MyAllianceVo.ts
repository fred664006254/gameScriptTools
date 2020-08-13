/**
 * 军团系统vo
 * author dky
 * date 2017/11/27
 * @class MyAllianceVo
 */
class MyAllianceVo extends BaseVo
{

	//玩家uid
	public uid:number = 0;
	//记录玩家的帮派信息
	public info:any = null;
	//玩家申请信息
	public apply:any[] = null;
	//玩家职位 1普通成员 2精英 3副盟主 4盟主
	public po:number = 0;
	//总贡献值
	public tctv:number = 0;
	//当前贡献值
	public ctv:number = 0;
	//最后捐献时间
	public donate:any;
	//玩家成员
	public joint:number = 0;
	//下次可以加入帮派的时间
	public nextt:number = 0;
	//特殊数据重置时间
	public lastday:number = 0;
	//下次可以加入帮派的时间
	public updated_at:number = 0;
	public shop:any[] = null;

	/**
	 *  "攻击过的门客信息 1001 ＝ 1已攻击过 可恢复 2攻击过 不可恢复
	 */
	public servant:Object = {};

	
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			if(data.uid != null)
			{
				this.uid = Number(data.uid);
			}
			if(data.info != null)
			{
				this.info = data.info;
			}
			if(data.apply != null)
			{
				this.apply = data.apply;
			}
			if(data.po != null)
			{
				this.po = data.po;
			}
			if(data.tctv != null)
			{
				this.tctv = data.tctv;
			}
			if(data.ctv != null)
			{
				this.ctv = data.ctv;
			}
			if(data.donate != null)
			{
				this.donate = data.donate;
			}
			if(data.joint != null)
			{
				this.joint = data.joint;
			}
			if(data.nextt != null)
			{
				this.nextt = data.nextt;
			}
			if(data.lastday != null)
			{
				this.lastday = data.lastday;
			}
			if(data.updated_at != null)
			{
				this.updated_at = data.updated_at;
			}
			if(data.shop != null)
			{
				this.shop = data.shop;
			}
			if(data.servant != null)
			{
				this.servant = data.servant;
			}
		}
	}

	public dispose():void
	{
		
		//玩家uid
		this.uid = 0;
		//记录玩家的帮派信息
		this.info = null;
		//玩家申请信息
		this.apply = null;
		//玩家职位 1普通成员 2精英 3副盟主 4盟主
		this.po = 0;
		//总贡献值
		this.tctv = 0;
		//最后捐献时间
		this.donate = null;
		//玩家成员
		this.joint = 0;
		//下次可以加入帮派的时间
		this.nextt = 0;
		//特殊数据重置时间
		this.lastday = 0;
		//下次可以加入帮派的时间
		this.updated_at = 0;
		this.shop = null;
		this.ctv = 0;
		this.servant = null;

	}
}