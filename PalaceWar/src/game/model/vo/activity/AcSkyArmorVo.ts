class AcSkyArmorVo extends AcBaseVo
{   
	private ainfo:any = null;
    public specialNum:number;//特殊道具数量
    public specialCount:number;//获得次数
	public isfree:number=0;
	public v:number = 0;
	public buyGem:number=0;

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

	public showExchangeWifeDot():boolean
	{
        let str = this.cfg.change.needItem;
        let itemVo = GameData.formatRewardItem(str)[0];
        let itemData = Api.itemVoApi.getItemInfoVoById(itemVo.id);
        let currNum = 0;
        if (itemData){
            currNum = itemData.num;
        }
        if (currNum >= itemVo.num){
            return true;
        }
        return false;
	}	

    public getWifeNeed():number{
		let change:string = this.cfg.change.needItem;
		return parseInt(change.split("_")[2]);
    }	

	private get cfg() : Config.AcCfg.SkyArmorCfg
	{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public getSortAchievementCfg(isSort:boolean=true):Config.AcCfg.SkyArmorAchieveItem[]
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
        return this.v;
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
		let b = this.isShowAchieveDot() || this.showExchangeWifeDot();
		if(b)
		{
			return b;
		}
		if(!this.checkIsInEndShowTime())
		{
			return this.v > 0 || this.isfree > 0;
		}
		return false;
	} 


	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
	}

	public getAuraCon():BaseDisplayObjectContainer
	{
		let con = new BaseDisplayObjectContainer();
		let texticon = BaseBitmap.create("acskyarmor_aura");
		
		let servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(this.cfg.show);
		let icon = BaseBitmap.create("servant_aura_Icon"+ servantSkinCfg.specialAuraCfg.auraIcon);
		icon.touchEnabled = true;
		icon.addTouchTap((event:egret.TouchEvent)=>
		{
			ViewController.getInstance().openView(ViewConst.POPUP.SKINAURAINFOPOPUPVIEW,this.cfg.show);
		},this);		

		con.addChild(texticon);
		con.addChild(icon);

		icon.setPosition(0,0);
		texticon.setPosition(icon.x+icon.width/2-texticon.width/2, icon.y+icon.height+5);

		let effect = ComponentManager.getCustomMovieClip(`acskyarmor_titleeff`, 10, 150);
		effect.width = 257;
		effect.height = 257;
		effect.x = icon.width/2 - effect.width/2;
		effect.y = icon.height/2 - effect.height/2;
		effect.playWithTime(-1);
		con.addChild(effect);
		effect.blendMode = egret.BlendMode.ADD;

		con.width = icon.width;
		con.height = texticon.y+texticon.height;

		con.setScale(0.8);
		return con;
	}

    public dispose():void 
	{ 
		this.ainfo = null;
		this.isfree = null;
		super.dispose();
	}
}