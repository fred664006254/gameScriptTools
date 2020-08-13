class AcLimitedRewardVo extends AcBaseVo
{
	private flags:Object;
	/**
	 * 限时类活动是否有红点奖励 true 有 false 没有
	 */
	public red:boolean = false;
	public limitedRewardInfoVoList:Array<AcLimitedRewardInfoVo> = [];
	public level:any = null;
	
	/** 展示期，后端返的  */
	private extraSec:number=0;
	public constructor() 
	{
		super();
	}

	public get acTimeAndHour():string
	{	
		let et = this.et
		if(this.extraSec){
			et = this.et - this.extraSec;
		}
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}
	

	/**
	 * 活动展示期
	 */
	public checkIsInEndShowTime():boolean
	{	
		let v:boolean = false;
		if(this.extraSec && (GameData.serverTime >= (this.et - this.extraSec)))
		{
			v = true;
		}
		return v;
	}

	/**
	 * 活动展示期 剩余时间
	 */
	public getShowTime():number
	{	
		this.extraSec =this.extraSec ||0;
		let v:number = GameData.serverTime - (this.et - this.extraSec);
		return v;
	}

	public get acCountDown():string
	{
		this.extraSec=this.extraSec||0;
		return App.DateUtil.getFormatBySecond((this.et - GameData.serverTime-this.extraSec),1);
	}

	public checkIsHasExtraTime():boolean
	{	
		return Boolean(this.extraSec&&this.extraSec>0);
	}

	public checkIsAtEndShowTime():boolean
	{	
		let v:boolean = false;
		this.extraSec =this.extraSec ||0;
		if(this.isShowed==false && this.extraSec && (GameData.serverTime >= (this.et - this.extraSec)))
		{	
			this.isShowed = true;
			v = true;
		}
		return v;
	}

	/**
	 * 获取所有档位信息
	 */
	public getLimitedRewardInfoVoList():Array<AcLimitedRewardInfoVo>
	{
		if(this.limitedRewardInfoVoList.length == 0)
		{
			for(let key in this.config.value)
			{
				if(this.config.value[key] && this.config.reward[key])
				{
					let infoVo:AcLimitedRewardInfoVo = new AcLimitedRewardInfoVo();
					infoVo.id = Number(key);
					infoVo.aid = this.aid;
					infoVo.code = this.code;
					infoVo.type = this.config.type;
					infoVo.level = this.level;
					infoVo.condition = Number(this.config.value[key]);
					infoVo.reward = String(this.config.reward[key]);
					this.limitedRewardInfoVoList.push(infoVo);
				}
			}
		}
		
		return this.limitedRewardInfoVoList;
	}

	/**
	 * 根据id和条件判断该档位的领取状态
	 * @param id 
	 * @param condition 条件
	 */
	public getFlagByIdAndCondition(id:number,condition:number):number
	{
		if(this.flags && this.flags[id])
		{
			return this.flags[id];
		}
		if(this.v < condition)
		{
			return 2;
		}
		return 0;
	}

	/**
	 * 获取当前领取到第几档
	 */
	public getMaxGrade():number
	{
		let max:number = 0;
		for(let key in this.flags)
		{
			if(Number(this.flags[key]) == 1)
			{
				if((max + 1) == Number(key))
				{
					max = Number(key);
				}
			}
		}
		return max;
	}

	public get isShowRedDot():boolean
	{
		return this.red;
	}

	/**
	 * icon图标
	 */
	public get icon():string
	{
		let incoCfg =GameConfig.config.limitedrewardbaseCfg[this.atype];
		return incoCfg.icon;
	}

	public get getTitleStr():string
	{
		return LanguageManager.getlocal("ac"+App.StringUtil.firstCharToUper(this.aid + "-" +this.atype)+"_Title");
	}

	public dispose()
	{
		this.flags = {};

		this.red = false;
		this.limitedRewardInfoVoList = [];
		this.level = null;
		this.extraSec=0;
		super.dispose();
	}
}