class ServantSkinVo  extends BaseVo
{
	public skinid:string = ""; //皮肤id
	public slv:number = 0;//皮肤等级
	public ability:{string:{alv:number}}[] //书籍信息
	public aura:{} = undefined //书籍信息
	public amuletAura:{} = undefined //书籍信息
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			this.slv = data.slv;
			this.ability = data.ability;
			this.aura = data.aura;
			this.amuletAura = data.amuletAura;
		}
	}
	public getbookLv(bid:string):number
	{
		let lv = this.ability[bid].alv;
		lv = lv ? lv : 0;
		return lv;
	}

	public getbookIdList():string[]
	{
		return Object.keys(this.ability);
	}

	public getSkinStarNum()
	{
		let num = 0;
		for (var key in this.ability) {
			if (this.ability.hasOwnProperty(key)) {
				let tmpAcfg = GameConfig.config.abilityCfg[key];
				num += tmpAcfg.num;
			}
		}
		return num;
	}

	public getSkinBookValue()
	{
		let num = 0;
		for (var key in this.ability) {
			if (this.ability.hasOwnProperty(key)) {
				let tmpAcfg = GameConfig.config.abilityCfg[key];
				num += tmpAcfg.num * this.getbookLv(key);
			}
		}
		return num;
	}
	
	public getSkinAuraIdList()
	{
		let cfg = Config.ServantskinCfg.getServantSkinItemById(this.skinid);
		return cfg.aura;
	}
	
	// public getAmura
	public dispose():void
	{
		this.skinid = "";
		this.slv = 0;
		this.ability = null;
	}
}