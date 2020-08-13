class AcAskGodVo extends AcBaseVo
{   
	private ainfo:any = null;   
	private claim:any = null;

	public isfree:number=0;
	public slimit:number=0;

    public constructor() 
	{
		super();
	}

    public initData(data:any):void
	{
        for(let key in data)
		{
			this[key] = data[key];
		}
    }

	public getExchangeTimes(id:string):number
	{
		if(this.claim && this.claim[id])
		{
			return this.claim[id];
		}
		return 0;
	}

	public showExchangeDot():boolean
	{
		let dataList = this.cfg.getShopList();
		for(let i = 0; i < dataList.length; i++)
		{
			if(this.getExchangeTimes(dataList[i].id+"") < dataList[i].limitTime)
			{
				if(Api.itemVoApi.getItemNumInfoVoById(dataList[i].needItem) >= dataList[i].needNum)
				{
					return true;
				}
			}
		}
		return false;
	}

	private get cfg() : Config.AcCfg.AskGodCfg
	{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public getSortAchievementCfg(isSort:boolean=true):Config.AcCfg.AskGodAchieveItem[]
	{
		let data = this.cfg.getAchieveList();
		for (let i = 0; i < data.length; i++) 
		{
			if (this.isGetAchievementById(String(data[i].id))) 
			{
				data[i].sortId = data.length + Number(data[i].id);
			}
			else if (this.getAchieveNum() >= data[i].needNum) 
			{
				data[i].sortId = (Number(data[i].id)) - data.length - 1;
			}
			else 
			{
				data[i].sortId = Number(data[i].id);
			}
        }		
		if(isSort)
		{
			data.sort((a, b) => { return a.sortId - b.sortId });
		}else
		{
			data.sort((a, b) => { return a.id - b.id });
		}
		return data;
	}
    //是否已领取进度奖励
    public isGetAchievementById(id:string):boolean
	{
		if(this.ainfo&&this.ainfo.flags && this.ainfo.flags[id])
		{
			return true; 
		}
		return false;
    }	

	public getAchieveNum():number
	{
		let num = 0;
		if(this.ainfo && this.ainfo.v){
			num = this.ainfo.v;
		}
		return num;
	}
    public isShowAchieveDot():boolean
	{
        let data = this.cfg.getAchieveList();
        for (let i=0; i < data.length; i++)
		{
            if (!this.isGetAchievementById(String(data[i].id)))
			{
                if (this.getAchieveNum() >= data[i].needNum)
				{
                    return true;
                }
            }
        }
        return false;
    }
	public getAchieveStatus(i:number):number
	{
		let data = this.cfg.getAchieveList();
		data.sort((a:any,b:any)=>
		{
			return a.id - b.id;
		});
		if (!this.isGetAchievementById(String(data[i].id)))
		{
			if (this.getAchieveNum() >= data[i].needNum)
			{
				return 2;
			}else
			{
				return 1;
			}
		}
		return 3;	
	}
	public get isShowRedDot():boolean
	{
		let b = this.isShowAchieveDot() || this.showExchangeDot();
		if(b)
		{
			return b;
		}
		if(!this.checkIsInEndShowTime())
		{
			return this.isfree > 0;
		}
		return false;
	} 


	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
	}

    public dispose():void 
	{ 
		this.ainfo = null;
		this.claim = null;
		this.isfree = null;
		super.dispose();
	}
}