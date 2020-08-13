/**
 * 门客神器系统api
 * author shaoliang & qianjun
 * date 2019/7/22
 * @class WeaponVoApi
 */
class WeaponVoApi extends BaseVoApi
{
    private weaponVo:WeaponVo;
    //最近一次升级的类型，飘字用
    public recentUpType:number = 0;
    public constructor() 
	{
		super();
	}


    public haveWeaponById(id:string | number):boolean
    {
        if (this.weaponVo && this.weaponVo.haveWeaponById(String(id)))
        {
            return true;
        }
        return false;
    }

    public getWeaponInfoVoById(id:string):WeaponInfoVo
    {
        return this.weaponVo.getWeaponInfoVoById(id);
    }

    public getWeaponInfoVoByServantId(sid:string|number):WeaponInfoVo
    {
        return this.weaponVo.getWeaponInfoVoByServantId(sid);
    }
    public getWeaponVo():WeaponVo
    {
        return this.weaponVo;
    }
    public isShowNpc():boolean
    {
		if ( Config.ServantweaponCfg.lvNeed <= Api.playerVoApi.getPlayerLevel() && Api.switchVoApi.checkWeaponFunction()){
			return true;
		}
        return false;
    }

    public dispose():void
	{
		this.weaponVo = null;
        this.recentUpType = 0;
 
		super.dispose();
	}
}