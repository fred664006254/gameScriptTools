
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

	public getPid()
	{
		return this.prestigeVo.info.pid;
	}
	public getPValue()
	{
		return this.prestigeVo.info.v;
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
		return this.isBallLightUpEnable();

		
		// return true;
		// if (this.prestigeVo.info)
		// {	
		// 	let infoTab:any = this.prestigeVo.info;
		// 	if (Number(infoTab.pid)<4 && Number(infoTab.v)>= Config.PrestigeCfg.getPrestigeCfgById(Number(infoTab.pid)).prestige)
		// 	{
		// 		return true;
		// 	}
		// }
		// return false;
	}

	public getUnlockStr()
	{
		return LanguageManager.getlocal("prestige_unlockStr");
	}

	public canEmperor()
	{
		return this.prestigeVo.canemper > 0;
	}

	public getAinfo()
	{
		return this.prestigeVo.info.ainfo;
	}
	public isBallLightUpEnable(id : number = -1)
	{	
		if(id == -1 || id == 0){
			id = this.getPid();
		}
		if (this.getPid() == Config.PrestigeCfg.getMax())
		{
			return false;
		}
		let cfg = Config.PrestigeCfg.getPrestigeCfgById(id);
		if(cfg )
		{
			if( this.getPValue() >= cfg.prestige)
			{
				return true;
			}
		}
		return false;
	}
	public isShowRedForPBottom()
	{
		 if (this.isShowRedDot && Api.switchVoApi.checkOpenPrestige())
		 {
			 return true;
		 }
		 return false;
	}

	public isFirst()
	{
		let first = this.prestigeVo.info.first;
		if (!first || first == 1){
			return true;
		}
		return false;
	}
}