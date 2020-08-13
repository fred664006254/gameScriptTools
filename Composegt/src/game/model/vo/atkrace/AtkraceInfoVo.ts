class AtkraceInfoVo extends BaseVo
{

	/**
	 * 上次出战时间
	 */
	public lasttime:number = 0;

	/**
	 * 战斗次数
	 */
	public num:number = 0;

	/**
	 * 是否使用出师令
	 */
	public isuse:number = 0;

	/**
	 * {id1,id2}战斗过的门客
	 */
	public asids:string[] = [];

	/**
	 * 额外出师次数
	 */
	public extranum:number = 0;

	/**
	 * 连胜次数
	 */
	public streak:number = 0;

	/**
	 * 士气值
	 */
	public morale:number = 0;

	/**
	 * 连续上榜次数
	 */
	public rankover:number = 0;

	/**记录上阵门客 */
	public combatlist: string[] = [];

	public constructor() {
		super();
	}
	public initData(data:any):void
	{
		if (data) {
			this.lasttime =data.lasttime;
			this.num =data.num;
			this.isuse =data.isuse;
			this.asids =data.asids;
			this.extranum =data.extranum;
			this.streak =data.streak;
			this.morale =data.morale;
			this.rankover =data.rankover;
			this.combatlist = data.combatlist || [];
		}
	}

	public dispose()
    {
       this.lasttime = 0;
	   this.num = 0;
	   this.isuse = 0;
	   this.asids.length = 0;
	   this.extranum = 0;
	   this.streak = 0;
	   this.morale = 0;
	   this.rankover = 0;
    }
}