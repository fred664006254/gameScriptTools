class AcSkySoundVo extends AcBaseVo
{   
	private sinfo:any = null;
	private ainfo:any = null;   
	private claim:any = null;

	public isfree:number=0;
	public v:number = 0;
	private num:number=0;

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

	public getSpecialNum(name:string):number
	{
		if(name == "costSpecial2")
		{
			if(this.ainfo&&this.ainfo["v1"])
			{
				return this.ainfo["v1"];
			}
		}else if(name == "costSpecial4")
		{
			if(this.ainfo&&this.ainfo["v2"])
			{
				return this.ainfo["v2"];
			}			
		}else if(name == "costSpecial8")
		{
			if(this.ainfo&&this.ainfo["v3"])
			{
				return this.ainfo["v3"];
			}			
		}
		return 0;
	}
	public getExchangeTimes(id:string):number
	{
		if(this.claim && this.claim[id])
		{
			return this.claim[id];
		}
		return 0;
	}
	public canGetExchange(id:string):number
	{
		let exData = this.cfg.getExchangeList();
		if (exData && exData.length > 0)
		{
			for (let i=0; i < exData.length; i++)
			{
				if(String(exData[i].id) == id)
				{
					if(this.claim && this.claim[id] && exData[i].limit && this.claim[id] >= exData[i].limit)
					{
						return 2;
					}else
					{
						let keys = ["costSpecial2","costSpecial4","costSpecial8"];
						if(!exData[i][keys[0]] || this.getSpecialNum(keys[0]) >= exData[i][keys[0]])
						{
							if(!exData[i][keys[1]] || this.getSpecialNum(keys[1]) >= exData[i][keys[1]])
							{
								if(!exData[i][keys[2]] || this.getSpecialNum(keys[2]) >= exData[i][keys[2]])
								{
									return 1;
								}
							}
						}
						return 0;
					}
				}
			}
		}
		return 0;
	}
	public showExchangeDot():boolean
	{
		let exData = this.cfg.getExchangeList();
		for (let i=0; i < exData.length; i++)
		{
			if(this.canGetExchange(String(exData[i].id)) == 1)
			{
				return true;
			}
		}
		return false;
	}
	public showExchangeWifeDot():boolean
	{
        let change:string = this.cfg.change[0];
        let changearr:string[] = change.split("_");

		let have = Api.itemVoApi.getItemNumInfoVoById(changearr[1]);
		let need = parseInt(changearr[2]);

		return have >= need;
	}	
	public getSortExchangeCfg():Config.AcCfg.SkySoundExchangeItem[]
	{
		let data = this.cfg.getExchangeList();
		for (let i = 0; i < data.length; i++) 
		{
			if (this.canGetExchange(String(data[i].id)) == 2) 
			{
				data[i].sortId = data.length + Number(data[i].id);
			}
			else 
			{
				data[i].sortId = Number(data[i].id);
			}
        }		
		data.sort((a, b) => { return a.sortId - b.sortId });
		return data;
	}
    public getWifeNeed():number{
		let change:string = this.cfg.change[0];
		return parseInt(change.split("_")[2]);
    }	

	private get cfg() : Config.AcCfg.SkySoundCfg
	{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public getSortAchievementCfg(isSort:boolean=true):Config.AcCfg.SkySoundAchieveItem[]
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
		if(this.sinfo&&this.sinfo.flags && this.sinfo.flags[id])
		{
			return true; 
		}
		return false;
    }	
    public getProcess():number
	{
        return this.num;
    }	
	public getAchieveNum():number
	{
		let num = 0;
		if(this.sinfo && this.sinfo.v){
			num = this.sinfo.v;
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
    public getAchRewardNum():number
	{
        let data = this.cfg.getAchieveList();
		let count = 0;
        for (let i=0; i < data.length; i++)
		{
            if (this.isGetAchievementById(String(data[i].id)))
			{
                count++;
            }
        }
        return count;
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
		let b = this.isShowAchieveDot() || this.showExchangeDot() || this.showExchangeWifeDot();
		if(b)
		{
			return b;
		}
		if(!this.checkIsInEndShowTime())
		{
			return this.getProcess() > 0 || this.isfree > 0;
		}
		return false;
	} 


	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
	}

    public dispose():void 
	{ 
		this.sinfo = null;
		this.ainfo = null;
		this.isfree = null;
		this.num = 0;
		super.dispose();
	}
}