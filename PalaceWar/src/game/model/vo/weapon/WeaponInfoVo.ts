class WeaponInfoVo extends BaseVo
{   
    public id:string = "";
    // 强化等级
	public lv:number = 0;
    // 加工等级
	public clv:number = 0;

    public attrAdd:number[] = [];
    // 总属性
	public total:number = 0;
    // 四种属性
    public attr:number[] = [];
    // 资质值
	public ability:number[] = [];
    // 技能等级
	public skill2:number = 0;

    public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
        if(data)
		{
			if(data.lv != null)
			{
				this.lv = Number(data.lv);
			}
            if(data.clv != null)
			{
				this.clv = Number(data.clv);
			}
            if(data.attrAdd != null)
			{
				this.attrAdd = data.attrAdd;
			}
            if(data.total != null)
			{
				this.total = Number(data.total);
			}
            if(data.attr != null)
			{
				this.attr = data.attr;
			}
            if(data.ability != null)
			{
				this.ability = data.ability;
			}
            if(data.skill2 != null)
			{
				this.skill2 = Number(data.skill2);
			}
        }
    }

	public getTotalAbility():number
	{
		let t = 0;
		for (let key in this.ability)
		{
			t+=this.ability[key];
		}
		return t;
	}

	/**
	 * t : 类型 1～8 。 1本服擂台攻击 2雁门关战斗力 3帮会争霸战力 4八王夺帝攻击 5削藩平乱势力 6跨服擂台攻击 7绝地擂台攻击 8定军中原攻击
	 */
	public getSpecialityByType(t:number):number
	{	
		let value = 0;
		let pTab:number[] = this.cfg.getWeaponPromotionValue(this.clv);
		if (t == 1)
		{
			value = pTab[0] * 30 + this.lv * 2;
		}
		else if (t == 2)
		{
			value = pTab[1] * 1000 * this.lv + pTab[1] * 5000 + 1000 * this.lv;
		}
		else if (t == 3)
		{
			value = pTab[2] * 1000 * this.lv + pTab[2] * 5000 + 1000 * this.lv;
		}
		else if (t == 4)
		{
			value = pTab[3] * 30 + this.lv * 2;
		}
		else if (t == 5)
		{
			value = Math.floor( 0.5 * (pTab[4] * (this.lv * this.lv + this.lv + 98) / 10));
		}
		else if (t == 6)
		{
			value = pTab[4] * 30 + this.lv * 2;
		}
		else if (t == 7)
		{
			value = pTab[4] * 30 + this.lv * 2;
		}
		else if (t == 8)
		{
			value = Math.floor( 0.5 * (pTab[4] * (this.lv * this.lv + this.lv + 98) / 10));
		}
		return value;
	}
	

	//门客洁面神器按钮的红点
	public checkRedDot():boolean
	{
		if (this.lv == 1 && this.clv==1 && this.skill2 == 1)
		{
			if(LocalStorageManager.get('weapon_reddot'+this.id) == '')
			{
				return true; 
			}
		}

		return false;
	}

	public setRedDot():void
	{
		LocalStorageManager.set('weapon_reddot'+this.id, '1');
	}

	public get cfg():Config.ServantWeaponItemCfg
	{
		return Config.ServantweaponCfg.getWeaponItemById(this.id);
	}

	//小红点
	public checkCanMakeUp():boolean
	{
		if (this.checkLevelUp1() || this.checkLevelUp2() || this.checkLevelUp3())
		{
			return true;
		}
		return false; 
	}
	//锻造
	public checkLevelUp1():boolean
	{
		if (this.lv >= this.cfg.getMaxLv())
        {
			return false;
        }
        let servantInfoObj = Api.servantVoApi.getServantObj(String(this.cfg.servantID));
		if (this.lv >= servantInfoObj.level)
        {
            return false;
        }

		let itemString = Config.ServantweaponCfg.weaponLv[String(this.lv)].needItem;
		let itemsVo = GameData.formatRewardItem(itemString);
		let canLevlup = true;
		for (let i = 0; i<itemsVo.length; i++)
		{
			let oneVo = itemsVo[i];
			let hasNum = Api.itemVoApi.getItemNumInfoVoById(oneVo.id);
			if (hasNum<oneVo.num)
			{
				canLevlup = false;
				break;
			}
		}
		if (canLevlup)
		{
			return true;
		}

		return false;
	}
	//加工
	public checkLevelUp2():boolean
	{
		if (this.clv >= this.cfg.getMaxPromotionLv())
        {
			return false;
        }
		if (this.clv >= this.lv)
        {
            return false;
        }

		let itemString:string= Config.ServantweaponCfg.getWeaponPromotionItemById(String(this.clv)).needItem;
		let itemsVo = GameData.formatRewardItem(itemString);
		let canLevlup = true;
		for (let i = 0; i<itemsVo.length; i++)
		{
			let oneVo = itemsVo[i];
			let hasNum = Api.itemVoApi.getItemNumInfoVoById(oneVo.id);
			if (hasNum<oneVo.num)
			{
				canLevlup = false;
				break;
			}
		}
		if (canLevlup)
		{
			return true;
		}

		return false;
	}

	public checkLevelUp3():boolean
	{	
		if (this.skill2 >= this.cfg.getMaxSoulLv())
        {
			return false;
        }

		let servantCfg = Config.ServantCfg.getServantItemById(this.cfg.servantID);
		if(servantCfg.aura){
			let sids:string[] = servantCfg.aura["1"]["growNeed1"];
            for (let i=0; i<sids.length; i++)
            {
                let sid = sids[i];
                let oneweaponVo = Api.weaponVoApi.getWeaponInfoVoByServantId(sid);
                if (!oneweaponVo || oneweaponVo.skill2 < this.skill2)
                {
                   return false;
                }
            }
		}

		let needNum = Config.ServantweaponCfg.weaponSoul[String(this.skill2)].needItem;
        let hasNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.itemID);
		if (hasNum>=needNum)
		{
			return true;
		}

		return false;
	}

	public getAttributeValueByType(t:number):string
	{	
		if (this["getAttributeValueType"+t])
		{
			return this["getAttributeValueType"+t]();
		}
		return "0";
	}
	/**
	 * 三国争霸神器属性 暴击是百分比
	*/
	public getAttributeValueType1():string
	{
		
		let type = this.cfg.attributeType1;
		let add = 0;
		let total = this.getTotalAbility();
		switch (type)
		{
			case 1:
				add = total * 200 + this.lv * 5;
				break;
			case 2:
				add = Math.floor(1*(total*(this.lv*this.lv + this.lv +98)/10));
				break;
			case 3:
				add = total * 0.01 + this.lv * 0.005;
				break;
			case 4:
				add = total * 4 + this.lv * 0.1;
				break;
			case 5:
				add = Math.floor(0.02*(total*(this.lv*this.lv + this.lv +98)/10));
				break;
			case 6:
				add = total * 0.0002 + this.lv * 0.0001;
				break;
			case 7:
				add = total * 400 + this.lv * 10;
				break;
		}

		let v = this.cfg.attribute1 + add;
		let strV:string;
		if (type == 3 || type == 6)
		{	
			v *= 10000;
			v = Math.floor(v+0.5);
			strV = String(v/100)+"%";
		}
		else
		{	
			v = Math.floor(v+0.5);
			strV = String(v);
		}
		return strV;
	}

    public dispose():void
	{   
        this.id = "";
        this.lv = 0;
        this.clv = 0;
        this.attrAdd.length = 0;
        this.total = 0;
        this.attr.length = 0;
        this.ability.length = 0;
        this.total = 0;
    }   
}