/**
 * 邮件api
 * author dky
 * date 2017/11/4
 * @class AchievementVoApi
 */
class AchievementVoApi extends BaseVoApi
{
	private achievementVo:AchievementVo;

	private _achInfoVo:any;
	private _achCfg:any;
	private _stage:any;
	private _curValue:any;
	private _value:any;

	private _itemId:any;
	public constructor() 
	{
		super();
	}

	public getSortAchInfoVo():any
	{
		return this._achInfoVo;
	}
	public setSortAchInfoVo(achInfoVo:any)
	{
		this._achInfoVo = achInfoVo;
	}
	public getSortAchCfg():any
	{
		return this._achCfg;
	}
	public setSortAchCfg(achCfg:any)
	{
		this._achCfg = achCfg;
	}
	public getSortStage():any
	{
		return this._stage;
	}
	public setSortStage(stage:any)
	{
		this._stage = stage;
	}
	public getSortCurValue():any
	{
		return this._curValue;
	}
	public setSortCurValue(curValue:any)
	{
		this._curValue = curValue;
	}
	public getSortValue():any
	{
		return this._value;
	}
	public setSortValue(value:any)
	{
		this._value = value;
	}

	public getUIItemId():any
	{
		return this._itemId;
	}
	public setUIItemId(itemId:any)
	{
		this._itemId = itemId;
	}
	/**
	 * 获取成就列表
	 */
	public getAchievementInfoVoList():Array<AchievementInfoVo>
	{
		let achievementInfoVoObj = this.achievementVo.achievementInfoVoObj;
		let arr:Array<AchievementInfoVo> = new Array();
		for(let key in achievementInfoVoObj)
		{
			let acvCfg =Config.AchievementCfg.getAchievementCfgById(key);
			if(Api.switchVoApi.checkIsOlyShenheFile())
			{
				if(acvCfg.id == "112")
				{
					continue;
				}
			}
			if(Api.switchVoApi.checkOpenShenhe())
			{
				if(! acvCfg.isShieldWhenShenhe )
				{
					arr.push(achievementInfoVoObj[key]);
				}
			}else
			{
				//过滤商贸和征伐
				if(acvCfg.id == "118" && !Api.switchVoApi.checkOpenTrade())
				{
					continue;
				}
				if(acvCfg.id == "117" && !Api.switchVoApi.checkOpenConquest())
				{
					continue;
				}
				if(acvCfg.id == "120" && Api.switchVoApi.checkNewDailyBoss())
				{
					continue;
				}
				arr.push(achievementInfoVoObj[key]);
			}
		}
		arr.sort(this.sortA); 
		return arr;
	}
	/**
	 * 获取可以领取的成就数量
	 */
	public getAchGetNum():number
	{
		let num = 0
		let achVolist = this.getAchievementInfoVoList();
		for (var index = 0; index < achVolist.length; index++) {
			var element = achVolist[index];
			if(element.f == 1)
			{	
				if(element.id == "120" && Api.switchVoApi.checkNewDailyBoss())
				{
					continue;
				}
				num ++
			}
		}
		return num;
	}

	private sortA(a:AchievementInfoVo,b:AchievementInfoVo):number
	{
		
		if(a.f == b.f)
		{
			let achCfgA = Config.AchievementCfg.getAchievementCfgById(a.id);
			let curValueA = achCfgA.value[Api.achievementVoApi.getAchProById(a.id)];
			let perA = a.v/curValueA;
			if(perA > 1){
				perA = 1;
			}

			let achCfgB = Config.AchievementCfg.getAchievementCfgById(b.id);
			let curValueB = achCfgB.value[Api.achievementVoApi.getAchProById(b.id)];
			let perB = b.v/curValueB;
			if(perB > 1){
				perB = 1;
			}

			if(perA == perB){
				return a.cfg.sort - b.cfg.sort;
			}
			return perB - perA;
			
		}
		let af:number;
		let bf:number;
		if(a.f==1)
		{
			af=3;
		}
		else if(a.f==0)
		{
			af=2;
		}
		else
		{
			af=1;
		}
		if(b.f==1)
		{
			bf=3;
		}
		else if(b.f==0)
		{
			bf=2;
		}
		else
		{
			bf=1;
		}
		
		return bf - af;
	}

	/**
	 * 获取成就详情列表
	 */
	public getAchDetailList(aid:string):Array<number>
	{
		let achCfg = Api.achievementVoApi.getSortAchCfg();
		let arr:Array<number> = new Array();
		let length = achCfg.value.length
		for (var index = 0; index < length; index++) {
			// var element = achCfg.value[index];
			arr.push(index);
		}
		// let achInfoVo = Api.achievementVoApi.getAchievementInfoVoById(aid);
		// let stage = achInfoVo.stage;
		// let curValue = achCfg.value[Api.achievementVoApi.getAchProById(aid)];
		//todo对数组进行排序
		arr.sort((a:number,b:number)=>{

				let stateA = this.getAchDetailState(aid,a);
				let stateB = this.getAchDetailState(aid,b);
				if(stateA == stateB){
					return a - b;
				}
				return stateA - stateB;
				// return 0;
			});

		return arr;
	}

	/**
	 * 获取成就详情列表某个完成状态
	 * 1可领取 2进行种 3未完成 4 已领取
	 */

	 public getAchDetailState(aid:string,index:number):number
	 {

		let state = 3;
		let achInfoVo = Api.achievementVoApi.getSortAchInfoVo();
		let achCfg = Api.achievementVoApi.getSortAchCfg();
		let stage = Api.achievementVoApi.getSortStage();
		let curValue = Api.achievementVoApi.getSortCurValue();

		let curF = achInfoVo.f
		
		if(index < stage - 1)
		{
			//不是最後一個
			state = 4;
		}
		else{
			if(Api.achievementVoApi.getSortValue()[index] > achInfoVo.v )
			{
			
				if(index == stage - 1)
				{
						 //2进行种
					state = 2;
				}else{
						//未完成
					state = 3;
				}

			}
			else{
				
				
				if(index == stage - 1)
				{
					//可领取0未完成 1已完成 2已领取",
					
					if(curF == 0)
					{
						state = 3;
					}
					else if(curF == 1)
					{
						state = 1;
					}
					else if(curF == 2)
					{
						state = 4;
					}
				}
				else{
					//进行中
					state = 2;
				}
			}
		}
		return state;
	 }

	/**
	 * 根据成就index获取成就详情列表位置
	 * @param id 子嗣id
	 */
	public getAchDetailIndexVoById(aid:string,index:number):number
	{
		let achVolist = this.getAchDetailList(aid);

		for (var i = 0; i < achVolist.length; i ++) {
			if(index == achVolist[i] ){
				return i
			}
		}
		return 0;
	}

	/**
	 * 根据成就index获取成就详情列表位置2
	 * @param id 子嗣id
	 */
	public getAchDetailIndexVoById2(aid:string,index:number,achVolist:Array<number>):number
	{
		// let achVolist = this.getAchDetailList(aid);

		for (var i = 0; i < achVolist.length; i ++) {
			if(index == achVolist[i] ){
				return i
			}
		}
		return 0;
	}
	/**
	 * 根据成就id获取成就列表位置
	 * @param id 子嗣id
	 */
	public getAchIndexVoById(id:string):number
	{
		let achVolist = this.getAchievementInfoVoList();

		for (var i = 0; i < achVolist.length; i ++) {
			if(id == achVolist[i].id ){
				return i
			}
		}
		return 0;
	}

	/**
	 * 根据成就id获取成就列表位置2
	 * @param id 子嗣id
	 */
	public getAchIndexVoById2(id:string,achVolist:Array<AchievementInfoVo>):number
	{
		// let achVolist = this.getAchievementInfoVoList();

		for (var i = 0; i < achVolist.length; i ++) {
			if(id == achVolist[i].id ){
				return i
			}
		}
		return 0;
	}

	/**
	 * 根据成就id获取完成到几阶段了
	 * 
	 */
	public getAchProById(mid:string):number
	{
		let achCfg = Config.AchievementCfg.getAchievementCfgById(mid);
		let achVo = this.getAchievementInfoVoById(mid);

		let stage = achVo.stage;
		
	
		// if(achVo.f == 1 || achVo.f == 2)
		// {
		// 	return achVo.stage;
		// }
		// if(){

		// }
		return achVo.stage - 1;
	}
	/**
	 * 根据成就id获取vo
	 * @param id  邮件id 
	 */
	public getAchievementInfoVoById(mid:string):AchievementInfoVo
	{
		if(this.achievementVo)
		{
			let achievementInfoVoObj = this.achievementVo.achievementInfoVoObj;
			if(achievementInfoVoObj && achievementInfoVoObj[mid])
			{
				return achievementInfoVoObj[mid];
			}
		}
		return null;
	}



	public dispose():void
	{
		this.achievementVo = null;
		super.dispose();
	}
}