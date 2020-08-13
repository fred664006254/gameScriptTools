class PrisonVoApi extends BaseVoApi
{
	private prisonVo:PrisonVo;
	private currPrison:number=0;
	public constructor()
	{
		super();
	}

	//获取名望
	public getMypre():number
	{
		return this.prisonVo.mypre;
	}
	//获取名望上限
	public getMaxpre():number
	{
		return this.prisonVo.maxpre;
	}
	
	//获取每日产出
	public getDailypre():number
	{
		return this.prisonVo.dailypre;
	}

	//获取牢房囚犯列表 
	public getPrisonInfo():Array<number>
	{
		// return this.prisonVo.info;
		let  prisonArr:Array<number> =[];
		for (var key in this.prisonVo.info) 
		{
			prisonArr.push(this.prisonVo.info[key]);
		}
		return prisonArr
	}

	//获取当前可以惩罚牢房囚个数 
	public getcurrPrisonNumber():number
	{
	   let  currPrisonIdArr:Array<any> =[];
		for (var key in this.prisonVo.info) 
		{
			if(this.prisonVo.info[key]!=0)
			{
				currPrisonIdArr.push(key);	
			}	
		}
		return currPrisonIdArr.length;
	}


	//获取牢房中囚犯id 返回剩余惩罚次数
	public getIndexPrisonNum(id:number=0):number
	{
	 
		let  num:number =0;
		for (var key in this.prisonVo.info) 
		{	
			if(""+id==key)
			{
				return this.prisonVo.info[key];
			}
		}
	}

	// 获取当前的囚犯Id
	public getCurrPrisonId():number
	{
		let  currPrisonId:number =0;
		for (var key in this.prisonVo.info) 
		{
			if(this.prisonVo.info[key]!=0)
			{
				currPrisonId =Number(key);
				this.currPrison= currPrisonId;
				break
				
			}	
		}
		return currPrisonId
	}
	//获取当前犯人第几个
	public getPrisonTitleStr():string
	{
		// let boo= Api.switchVoApi.checkOpenNewPrison();
		// if(boo)
		// {
		// 	return  "prisonerIndex"+this.currPrison+"_hexieType";
		// }
		// else
		// {
			return  "prisonerIndex"+this.currPrison;
		// }
	
	}
	//获取当前犯人名字
	public getPrisonName():string
	{
		return  "prisonerName"+this.currPrison;
	}


	public isShowNpc():boolean
	{
		let boo:boolean =false;
		var unlock:number =Config.PrisonCfg.getIndexPrisonItemCfg(1).unlock;
		if(Api.challengeVoApi.getCurChannelId()>unlock)
		{
			boo=true;
		}
		else
		{
			boo=false;
		}
		return  boo
	}

	public getLockedString():string
	{
		var unlock  =Config.PrisonCfg.getIndexPrisonItemCfg(1).unlock/41;
		return LanguageManager.getlocal("prisonUnlockDesc",[unlock+""]);
	}
	public checkNpcMessage():boolean
	{	
		var  cost:number = 0;
		if(Config.PrisonCfg.getIndexPrisonItemCfg(this.getCurrPrisonId())!=null)
		{
		 	cost= Config.PrisonCfg.getIndexPrisonItemCfg(this.getCurrPrisonId()).cost;
		}   

		if(this.getcurrPrisonNumber()>=1&&this.prisonVo.mypre>=cost&&cost>0)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	public dispose():void
	{
		this.currPrison=0;
		super.dispose();
	}
}