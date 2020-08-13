/**
 * 红颜省亲vo
 * author shaoliang
 * date 2019/2/20
 * @class WifebanishVo
 */
class WifebanishVo extends BaseVo
{   
    public pos_num:number = Config.BanishCfg.getDefaultSeatNum();
    public wifeBanishInfoVo:Object = null;
    public constructor() 
	{
		super();
	}

    public initData(data:any):void
	{
        if(data)
		{
            if (data.pos_num != null)
            {
                this.pos_num = data.pos_num;
            }
            this.wifeBanishInfoVo = {};
            if(data.info )
			{
				for(var key in data.info)
				{
					if(this.wifeBanishInfoVo[key])
					{
						this.wifeBanishInfoVo[key].initData(data.info[key]);
					}
					else
					{
						let wifeInfoVo:WifeBanishInfoVo = new WifeBanishInfoVo();
						wifeInfoVo.id = String(key);
						wifeInfoVo.initData(data.info[key]);
						this.wifeBanishInfoVo[key] = wifeInfoVo;
					}
                }
            }
        }
    }

    public dispose():void
	{
        this.pos_num = Config.BanishCfg.getDefaultSeatNum();
        this.wifeBanishInfoVo = null;
    }
}

class WifeBanishInfoVo extends BaseVo
{  
    public wifeId:string = null;
    public id:string = null;
    public et:number = 0;
    public constructor() 
	{
		super();
	}

    public initData(data:any):void
	{
        if(data)
		{
            this.wifeId = data.wifeId;
            this.et = data.st + Config.BanishCfg.getExileTime();
        }
    }
    public dispose():void
	{   
        this.id = null;
        this.wifeId = null;
        this.et = 0;
    }
}