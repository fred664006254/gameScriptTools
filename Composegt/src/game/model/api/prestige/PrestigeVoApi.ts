
/**
 * 称帝api
 * author shaoliang
 * date 2018/04/08
 * @class PrestigeVoApi
 */

class PrestigeVoApi extends BaseVoApi
{
	private prestigeVo:PrestigeVo;

	public constructor() {
		super();
	}

	public getPem():number
	{
		return this.prestigeVo.pem;
	}

	public getInfo():Object
	{
		return this.prestigeVo.info;
	}

	public getLog():any[]
	{
		return this.prestigeVo.log;
	}

	/**
	 * 检测是否显示红点，true：显示
	 */
	public get isShowRedDot():boolean
	{	
		// return true;
		if (this.prestigeVo.info)
		{	
			let infoTab:any = this.prestigeVo.info;
			if (Number(infoTab.pid)<4 && Number(infoTab.v)>= Config.PrestigeCfg.getPrestigeCfgById(Number(infoTab.pid)).prestige)
			{
				return true;
			}
		}
		return false;
	}
}