/**
 * 红颜vo
 * author dmj
 * date 2017/9/22
 * @class WifeInfoVo
 */
class WifeInfoVo extends BaseVo
{
	// id
	public id:number = 0;
	// 亲密度
	public intimacy:number = 0;
	// 魅力
	public glamour:number = 0;
	// 经验
	public exp:number = 0;
	// 儿子数量
	public child:number = 0;
	// 技能信息
	public skill:number[] ;
	public skill2:number[];
	public bgId:string='';
	public artistry:number =0;
	public talent:number =0;
	// "红颜的性别 大于等于1表示男红颜 否则为正常",
	public sexflag:number = 0;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			if(data.intimacy != null)
			{	
				let oldIntimacy = this.intimacy;
				this.intimacy = Number(data.intimacy);
				if (oldIntimacy && Api.switchVoApi.checkOpenWifeExSkill() && this.intimacy>=Config.WifebaseCfg.exSkillNeed)
				{
					let curEXLv = this.getExSkillLevel();
					let oldLv = Math.floor(oldIntimacy/Config.WifebaseCfg.exSkill);
					if (curEXLv>oldLv)
					{	
						ViewController.getInstance().openView(ViewConst.POPUP.WIFEEXSKILLUNLOCKVIEW, {wifeId:String(this.id),old:oldIntimacy});
					}
				}
			}
			if(data.exp != null)
			{
				this.exp = Number(data.exp);
			}
			if(data.child != null)
			{
				this.child = Number(data.child);
			}
			if(data.skill != null)
			{
				this.skill = data.skill;
			}
			if(data.skill2 != null)
			{
				this.skill2 = data.skill2;
			}
			if(data.glamour != null)
			{
				this.glamour = Number(data.glamour);
			}
			if(data.bgId)
			{
				this.bgId = data.bgId;
			}
			else{
				this.bgId = ``;
			}
			if(data.artistry != null){
				this.artistry = Number(data.artistry);
			}
		
			//才情值 = 参数1*魅力 + 参数2*亲密 + 参数3*才情
			this.talent = Config.WifebaseCfg.talentParam1 * this.glamour + Config.WifebaseCfg.talentParam2 * this.intimacy + Config.WifebaseCfg.talentParam3 * this.artistry;
			
			if(data.sexflag != null){
				this.sexflag = data.sexflag;
			}
			else{
				this.sexflag = 0;
			}
		}
	}
	/**红颜名称 */
	public get name():string
	{
		return this.cfg.name;
	}
	/**红颜描述 */
	public get desc():string
	{			
		return this.cfg.desc;
	}

	/**红颜说的话 */
	public get words():string
	{
		return this.cfg.words;
	}
	/**红颜解锁条件 */
	public get unlock():string
	{
		
		return this.cfg.wifeunlock;
	}
	/**红颜背景 */
	public get bg():string
	{
		return this.cfg.bg;
	}

	/**红颜icon */
	public get icon():string
	{
		return this.cfg.icon;
	}

	/**红颜半身像 */
	public get body():string
	{
		return this.cfg.body;
	}

		/**红颜脱衣半身像 */
	public get body2():string
	{
		return this.cfg.body2;
	}

		/**红颜骨骼 */
	public get bone():string
	{
		return this.cfg.bone;
	}
		/**红颜脱衣服骨骼 */
	public get bone2():string
	{
		return this.cfg.bone2;
	}
	public get sound():string
	{
		return this.cfg.sound;
	}
	//根据序号去蓝颜声音,默认随机前3句
	public getBlueSound(index?:number):string
	{
		if(!index){
			//随机取前3句
			index = App.MathUtil.getRandom(1,4)
		}
		return this.cfg.getBlueSoundBySoundId(index);
	}
	public get bgRes():string
	{
		let bgres = `wifeview_optbg`;
		if(this.bgId && this.bgId != ``){
			bgres = `wifeskinbg${this.bgId}`
		}
		else{
			if(this.cfg.isBule()){
				bgres = `malewifebg`;
			}
		}
		return bgres;
	}


	public get cfg()
	{

		return Config.WifeCfg.getWifeCfgById(this.id.toString());
	}

	public isUnlockExSkill():boolean
	{	
		if (Api.switchVoApi.checkOpenWifeExSkill() && this.intimacy>= Config.WifebaseCfg.exSkillNeed)
		{
			return true;
		}
		return false;
	}

	public getExSkillLevel():number
	{	
		if (this.intimacy < Config.WifebaseCfg.exSkillNeed)
		{
			return 0;
		}
		let need = Config.WifebaseCfg.exSkill;
		let intimacy = this.intimacy;
		if (intimacy>Config.WifebaseCfg.exSkillMax)
		{
			intimacy = Config.WifebaseCfg.exSkillMax;
		}
		return Math.floor(intimacy/need);
	}

	public isExSkillLevelMax():boolean
	{
		return this.intimacy>=Config.WifebaseCfg.exSkillMax;
	}	

	public dispose():void
	{
		this.id = 0;
		this.intimacy = 0;
		this.exp = 0;
		this.child = 0;
		this.skill = null;
		this.skill2 = [];
		this.glamour = 0;
		this.artistry = 0;
		this.talent = 0;
		this.sexflag = 0;
	}
}