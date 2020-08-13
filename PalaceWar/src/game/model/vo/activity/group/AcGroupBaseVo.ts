/**
 * 活动集合Vo基类
 * author 陈可
 * date 2018/12/3
 * @class AcGroupBaseVo
 */
class AcGroupBaseVo extends AcBaseVo
{
	private _allAidList:string[]=[];
	private _acList:{[aid:string]:AcBaseVo}={};
	private _theLastVo:AcBaseVo = null;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		super.initData(data);
		if(this.aid)
		{
			if(this._allAidList.length<1)
			{
				this._allAidList=Config.IconorderCfg.getAcNameListByIcon(this.aid);
			}
			let tmpSt:number=91543845929;
			let tmpEt:number=0;
			for(var i:number=0;i<this._allAidList.length;i++)
			{
				let aidAndCode:string[] =  this._allAidList[i].split("-");
				
				// let aid = this._allAidList[i];

				let aid:string = aidAndCode[0];

				let code:string = aidAndCode[1];

				if(!this._acList[aid])
				{ 
					// let vo:AcBaseVo=Api.acVoApi.getActivityVoByAidAndCode(aid);
					// if(vo)
					// {
					// 	this._acList[aid]=vo;
					// }
					//有code情况下直接取vo;
					if(code)
					{
						let vo:AcBaseVo=Api.acVoApi.getActivityVoByAidAndCode(aid,code);
						if(vo)
						{
							this._acList[aid]=vo;
						}
					}
					else
					{
						//取到list 集合
						let voList:AcBaseVo[]=Api.acVoApi.getActivityVoListByAid(aid);
						for(let i = 0; i < voList.length;i++)
						{
							let vo:AcBaseVo = voList[i];
							//当取到的icon == 当前aid的时候，ps：处理iconOrderCfg 没有配置 aid-code情况
							if(Config.IconorderCfg.getIconNameByName(vo.aid,String(vo.code)) == this.aid)
							{
								this._acList[aid]=vo;
								break;
							}
						}
						
					}

				}


				if(this._acList[aid]&&this._acList[aid].isStart)
				{
					tmpSt=Math.min(tmpSt,this._acList[aid].st);
					if (tmpEt < this._acList[aid].et)
					{
						tmpEt = this._acList[aid].et
						this._theLastVo = this._acList[aid];
					}
				}
			}
			this.st=tmpSt;
			this.et=tmpEt;
		}
	}

	/**
	 * 获取有数据的活动，包含正在开启的活动和等待开启的活动
	 */
	public getAcVoList():{[aid:string]:AcBaseVo}
	{
		return this._acList;
	}

	// /**
	//  * 获取到所有控制的活动id列表，和配置里面一样是所有的
	//  */
	// public getAllCfgAidList():string[]
	// {
	// 	return this._allAidList||[];
	// }

	public get isShowRedDot():boolean
	{
		let result:boolean=false;
		for(let aid in this._acList)
		{
			result=this._acList[aid].isShowRedDot;
			if(result)
			{
				break;
			}
		}
		return result;
	}

	/**
	 * 活动结束倒计时剔除展示期，格式：00：00：00
	 */
	public get acCountDownNoExtra():string
	{	
		let et = this.et
		if(this._theLastVo && Config.AcCfg.getExtraTimeByIdAndCode(this._theLastVo.aid,this._theLastVo.code)){
			et = this.et - Config.AcCfg.getExtraTimeByIdAndCode(this._theLastVo.aid,this._theLastVo.code)*86400;
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime),1);
	}

	/**
	 * 活动展示期
	 */
	public checkIsInEndShowTime():boolean
	{	
		let v:boolean = false;
		let extraTime:number = 0;
		if (this._theLastVo)
		{
			extraTime = Config.AcCfg.getExtraTimeByIdAndCode(this._theLastVo.aid,this._theLastVo.code);
		}
		
		if(extraTime && (GameData.serverTime >= (this.et - extraTime*86400)))
		{
			v = true;
		}
		return v;
	}

	public dispose():void
	{
		this._allAidList=[];
		this._acList={};
		this._theLastVo = null;
		super.dispose();
	}
}