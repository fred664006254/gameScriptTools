class WeaponVo extends BaseVo
{
    public weaponInfoVoObj:{[key:string]:WeaponInfoVo} = null;
    public discuss:Object = {};
    public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
        if(data)
		{
			if(data.info)
			{
				if(this.weaponInfoVoObj == null)
				{
					this.weaponInfoVoObj = {};
				}
				
				for(var key in data.info)
				{
					if (this.weaponInfoVoObj[key])
					{
						this.weaponInfoVoObj[key].initData(data.info[key]);
					}else
					{
						let weaponInfoVo:WeaponInfoVo = new WeaponInfoVo();
						weaponInfoVo.id = key;
						weaponInfoVo.initData(data.info[key]);
						this.weaponInfoVoObj[key] = weaponInfoVo;
					}
				}
            }
            if (data.discuss)
            {
                this.discuss = data.discuss;
            }
        }
    }

    public haveWeaponById(id:string):boolean
    {
        if (this.getWeaponInfoVoById(id))
        {
            return true;
        }
        return false;
    }

    public getWeaponInfoVoById(id:string):WeaponInfoVo
    {
        return this.weaponInfoVoObj[id];
    }
    public getWeaponInfoVo():Object
    {
        return this.weaponInfoVoObj;
    }
	public getWeaponInfoVoByServantId(sid:string|number):WeaponInfoVo
    {	
		for (let key in this.weaponInfoVoObj)
		{
			let cfg = Config.ServantweaponCfg.getWeaponItemById(key);
			if (cfg.servantID == Number(sid))
			{
				return this.weaponInfoVoObj[key];
			}
		}
        return null;
    }

    public dispose():void
	{
		this.weaponInfoVoObj = null;
        this.discuss = null;
	}
}