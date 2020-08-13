class AcFlowerMoonVo extends AcBaseVo
{   
	public maxunlockType:number=0;
	public pos:number=0;
	public rtype:number = 0;
	private ainfo:any = null;
	public isfree:number=0;
	public v:number = 0;
	private num:number=0;
	public feel:number=0;
	public score:number = 0;
	public slimit:number = 0;
	public chouNum:number = 0;
	private info:any = null;
	private pmyrank:number = 0;
	private zmyrank:number = 0;

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

	public isSelected():boolean
	{
		return this.rtype > 0;
	}

	public isGetRankPReward():boolean
	{
		return this.info && this.info.preward;
	}

	public isGetRankZReward():boolean
	{
		return this.info && this.info.zonereward;
	}

	public canGetExchange(id:number):boolean
	{
		let changeStr:string = this.cfg.change[id].needItem;
		let have = Api.itemVoApi.getItemNumInfoVoById(changeStr.split("_")[1]);
		let need = parseInt(changeStr.split("_")[2]);
		return have >= need;
	}
	public showExchangeDot():boolean
	{
		let exData = this.cfg.change;
		for (let i=0; i < exData.length; i++)
		{
			if(this.canGetExchange(i))
			{
				return true;
			}
		}
		return false;
	}
    public getWifeNeed():number{
		let change:any = this.cfg.change[1];
		return parseInt(change.needItem.split("_")[2]);
    }	
    public getServantNeed():number{
		let change:any = this.cfg.change[0];
		return parseInt(change.needItem.split("_")[2]);
    }	
	private get cfg() : Config.AcCfg.FlowerMoonCfg
	{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public getSortAchievementCfg(isSort:boolean=true):Config.AcCfg.FlowerMoonAchieveItem[]
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
    public getProcess():number
	{
        return this.num;
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
		let data = this.cfg.getAchieveList(true);
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
		let b = this.isShowAchieveDot() || this.showExchangeDot() || this.isShowPrankDot() || this.isShowZrankDot();
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

	public isShowPrankDot():boolean
	{
		if(this.info && this.info.preward)
		{
			return false;
		}
		if(this.checkIsInEndShowTime() && this.pmyrank && this.cfg.scoreRank)
		{
			let list = this.cfg.scoreRank;
			for(let i = 0; i < list.length; i++)
			{
				if(this.pmyrank >= list[i]["rank"][0] && this.pmyrank >= list[i]["rank"][1])
				{
					return true;
				}
			}
		}
		return false;
	}
	public isShowZrankDot():boolean
	{
		if(this.info && this.info.zonereward)
		{
			return false;
		}
		if(this.checkIsInEndShowTime() && this.zmyrank && this.cfg.achievementAll)
		{
			let list = this.cfg.achievementAll;
			for(let i = 0; i < list.length; i++)
			{
				if(this.zmyrank >= list[i]["rank"][0] && this.zmyrank >= list[i]["rank"][1])
				{
					return true;
				}
			}			
			return true;
		}
		return false;
	}	

    //获取当前最大进度
    public getMaxProNum():number{
        let data = this.cfg.getAchieveList(true);
        return data[data.length - 1].needNum;
    }

    //当前进度id
    public getCurrProIndex():number{
        let data = this.cfg.getAchieveList(true);
        let currNum = this.getAchieveNum();
        for (let i=0; i < data.length; i++){
            if (currNum < data[i].needNum){
                return i;
            }
        }
        if (currNum >= this.getMaxProNum()){
            return -1;
        }
        return 0;
    }

	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
	}

    public dispose():void 
	{ 
		this.ainfo = null;
		this.isfree = null;
		this.num = 0;
		super.dispose();
	}
}