
class ConquestVo extends BaseVo
{

	/**
	 * 玩家uid
	 */
	public uid:number = 0;
	/**
	 * 征伐分数
	 */
	public point:number = 0;
	/**
	 * 累计征伐次数
	 */
	public tnum:number = 0;

	/**
	 *  ["model.conquest.info.*"] = "征伐战斗相关信息",
		["model.conquest.info.cid"] = "当前征伐的波数",
		["model.conquest.info.cinfo"] = "征伐战斗对手相关信息",
		["model.conquest.info.cinfo.*.rewards.*"] = "随机对手的奖励信息(奖励格式)"
	 */
	public info:any;

	public constructor() {
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			if(data.uid != null)
			{	
				this.uid = data.uid
			}
			if(data.point != null)
			{	
				this.point = data.point
			}
			if(data.tnum != null)
			{	
				this.tnum = data.tnum
			}
			if(data.info != null)
			{	
				this.info = data.info
			}
	
		}
	}

	public dispose():void
	{
		this.uid = 0;
		this.point = 0;
		this.tnum = 0;
		this.info = null;
	}
}