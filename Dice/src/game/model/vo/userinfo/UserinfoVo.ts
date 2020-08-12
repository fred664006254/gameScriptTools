class UserinfoVo extends BaseVo
{
	public uid:number = 0;
	public name:string = "";
	/** 公会ID */
	public mygid:number = 0;
	/** 公会名称 */
	public mygname:string ="";
	/** 等级 */
	public level:number = 0;
	/** 目前的奖杯 */
	public score:number = 0;
	/** 最大的奖杯数 */
	public maxscore:number = 0;
	/** 金币 */
	public gold:number = 0;
	/** 钻石 */
	public gem:number = 0;
	/** 卡的数量 */
	public card:number = 0;
	/** 胜利次数 */	
	public win:number = 0;
	/** 失败次数 */
	public lose:number = 0;
	/** 最大回合数 */
	public maxturn:number = 0;
	/** 购买货币 */
	public buyg:number = 0;
	/** 最后购买时间 */
	public buyt:number = 0;
	/** 累计购买次数 */
	public buyn:number = 0;
	/** 免费获得货币 */
	public freeg:number = 0;
	/** 总对战次数 */
	public sumb:number = 0;
	
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			for(let key in data)
			{
				this[key]=data[key];
			}
		}
		// this.score = App.MathUtil.getRandom(0,5000);
	}

	public dispose():void
	{
		this.uid=0;
		this.name="";
		this.mygid = 0;
		this.mygname = "";
		this.level=0;
		this.score = 0;
		this.maxscore = 0;
		this.gold = 0;
		this.gem = 0;
		this.card = 0;
		this.win = 0;
		this.lose = 0;
		this.maxturn = 0;
		this.buyg = 0;
		this.buyt = 0;
		this.buyn = 0;
		this.freeg = 0;
		this.sumb = 0;
	}
}