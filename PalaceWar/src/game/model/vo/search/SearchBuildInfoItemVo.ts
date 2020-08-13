class SearchBuildInfoItemVo extends BaseVo
{
	/**
	 * 所属建筑ID
	 */
	public build:number;

	/**
	 * 类型 1：普通  2：红颜
	 */
	public type:number;

	/**
	 * 红颜ID
	 */
	public wifeId:string;

	/**
	 * 解锁条件  条件会有VIP等级，势力值，关注官微等特殊条件  解锁寻访
	 */
	public unlock:{needVip?:number,needPower?:number,needQQ?:number,needActive?:number,signUp?:number}={};

	/**
	 * 红颜获得的进度
	 */
	public maxValue:number;

	/**
	 * 人物Id
	 */
	public personId:string;
	public constructor() 
	{
		super();
	}
	public initData(personId:string):void
	{
		let itemCfg=Config.SearchCfg.getPersonItemCfgByPersonId(personId);
		this.build=itemCfg.build;
		this.type=itemCfg.type;
		this.wifeId=itemCfg.wifeId;
		if(itemCfg.unlock)
		{
			if(!isNaN(itemCfg.unlock.needVip))
			{
				this.unlock.needVip=itemCfg.unlock.needVip;
			}
			if(!isNaN(itemCfg.unlock.needPower))
			{
				this.unlock.needPower=itemCfg.unlock.needPower;
			}
			if(!isNaN(itemCfg.unlock.needPower))
			{
				this.unlock.needPower=itemCfg.unlock.needPower;
			}
			if(!isNaN(itemCfg.unlock.needQQ))
			{
				this.unlock.needQQ=itemCfg.unlock.needQQ;
			}
			if(!isNaN(itemCfg.unlock.needActive))
			{
				this.unlock.needActive = itemCfg.unlock.needActive;
			}
			if(!isNaN(itemCfg.unlock.needSignUp))
			{
				this.unlock.signUp = itemCfg.unlock.needSignUp;
			}
		}
		this.maxValue=itemCfg.value;
		this.personId=itemCfg.personId;
	}

	public get value():number
	{
		return Api.searchVoApi.getWifeValueById(this.personId);
	}

	public get eventDesc():string
	{
		let localStr:string="";
		if(this.type==1)
		{
			return localStr;
		}
		if(this.isUnlock)
		{
			let isOwned:boolean=false;
			if(this.wifeId)
			{
				if(Api.wifeVoApi.getWifeInfoVoById(Number(this.wifeId)))
				{
					isOwned=true;
				}
			}

			if(this.unlock.needVip && Api.playerVoApi.getPlayerVipLevel()>=this.unlock.needVip && isOwned==false)
			{
				localStr=LanguageManager.getlocal("searchLockVipDesc",[String(this.unlock.needVip)]);
			}
			else if(isOwned==false)
			{	
				if (this.unlock.needQQ == 1)
				{
					localStr=LanguageManager.getlocal("searchLockQQ");
				}
				else
				{
					localStr=LanguageManager.getlocal("searchEventDesc");
				}
				
			}
			else
			{
				localStr=LanguageManager.getlocal("searchAlreadyMarried");	//已经迎娶
			}
		}
		else
		{
			if(this.unlock.needVip)
			{
				if(Api.playerVoApi.getPlayerVipLevel()<this.unlock.needVip)
				{
					localStr=LanguageManager.getlocal("searchLockVipDesc",[String(this.unlock.needVip)]);
				}
			}
			else if(this.unlock.needPower)
			{
				if(Api.playerVoApi.getPlayerPower()<this.unlock.needPower)
				{
					localStr=LanguageManager.getlocal("searchLockPowerDesc",[String(this.unlock.needPower)]);
				}
			}
			else if(this.unlock.needActive)
			{	
				if(!Api.acVoApi.checkActiveIsUnlock(this.unlock.needActive))
				{
					localStr=LanguageManager.getlocal("searchLockActiveDesc");
				}
			}
			else if(this.unlock.signUp)
			{	
				if(!Api.arrivalVoApi.isShowed500Rewards())
				{
					localStr=LanguageManager.getlocal("searchLockSignUpDesc",[String(this.unlock.signUp)]);
				}
			}
		}
		return localStr;
	}

	public get isUnlock():boolean
	{
		let unlock:boolean=false;
		if(this.unlock)
		{
			let isHasValue:boolean=false;
			if(this.unlock.needVip)
			{
				isHasValue=true;
				unlock = Api.playerVoApi.getPlayerVipLevel()>=this.unlock.needVip;
			}
			if(this.unlock.needPower)
			{
				isHasValue=true;
				unlock = Api.playerVoApi.getPlayerPower()>=this.unlock.needPower;
			}
			if(this.unlock.needActive)
			{
				isHasValue = true;
				if(Api.wifeVoApi.getWifeInfoVoById(Number(this.wifeId)))
				{
					unlock = true;
				} else {
					unlock = Api.acVoApi.checkActiveIsUnlock(this.unlock.needActive);
				}
			}
			if(this.unlock.signUp)
			{
				isHasValue=true;
				unlock = Api.arrivalVoApi.isShowed500Rewards();
			}

			if(!isHasValue)
			{
				unlock=true;
			}
		}
		else
		{
			unlock=true;
		}
		return unlock;
	}

	public get isShowProgress():boolean
	{
		return isNaN(this.value)==false&&this.value>0;
	}

	public dispose():void
	{

	}
}