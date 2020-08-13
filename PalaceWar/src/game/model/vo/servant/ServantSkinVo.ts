class ServantSkinVo  extends BaseVo
{
	public skinid:string = ""; //皮肤id
	public slv:number = 0;//皮肤等级
	public aura:number[] = [];//皮肤光环等级
	public specialAura:number = 1;//皮肤开启门客光环等级
	public ability:{string:{alv:number}}[] //书籍信息
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
			this.aura = data.aura ? data.aura : [];
			this.specialAura = data.specialAura ? data.specialAura : 1;
		}
	}
	public getbookLv(bid:string):number
	{
		let lv = 0;
		if(this.ability[bid] && this.ability[bid].alv){
			lv = this.ability[bid].alv;
		}
		return lv;
	}

	public getbookIdList():string[]
	{
		return Object.keys(this.ability);
	}

	/**
	 * 是否还有可以学习的书籍
	 */
	public hasBookCanGet():boolean
	{
		let skincfg = Config.ServantskinCfg.getServantSkinItemById(this.skinid);
		return this.getbookIdList().length < skincfg.ability.length;
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
	
	//书籍资质加成
	public getSkinBookNum(_servantId):number
	{ 	
		let _servantInfoObj = Api.servantVoApi.getServantObj(_servantId);
		let servantCfg = GameConfig.config.servantCfg[_servantId];
		let ability = _servantInfoObj.getAbilityIdList();
		let tmpAcfg =undefined;
		let totalBookV = 0;
		for (var index2 = 0; index2 < ability.length; index2++) 
		{ 
			let aid = ability[index2]; 
			let tmpability = servantCfg.ability;
			let aLv:number =0;
			let oriidx = tmpability.indexOf(aid) ;
			if( oriidx> -1){

			}else
			{
				aLv =  _servantInfoObj.getSkinBookLv2(aid);
			} 
			tmpAcfg = GameConfig.config.abilityCfg[aid];
			totalBookV += aLv * tmpAcfg.num;
		} 
		return totalBookV;
	}

	public getSkinAuraLv(id)
	{
		let num = 0;
		if(this.aura[id]){
			num = this.aura[id];
		}
		return num;
	}


	
	public dispose():void
	{
		this.skinid = "";
		this.slv = 0;
		this.ability = null;
		this.aura = [];
	}
}