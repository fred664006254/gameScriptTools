class AcNewPackVo extends AcBaseVo 
{
	public initData(data: any): void 
	{
		for (let key in data) 
		{
			this[key] = data[key];
		}
	}
	private get cfg(): Config.AcCfg.NewPackCfg {
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public get isShowRedDot(): boolean 
	{
		let num = this.isGetReward();
		return num == 1;
	}
	public isGetReward():number
	{
		if(this["flag"] == 0)
		{
			let version = GameConfig.version;
			if(!version)
			{
				return 0;
			}
			let needVerion = this.cfg.version;
			let varr:string[] = version.split(".");
			let needvarr:string[] = needVerion.split(".");
			for(let i = 0; i < varr.length; i++)
			{
				if(parseInt(varr[i]) < parseInt(needvarr[i]))
				{
					return 0;
				}
			}
			return 1;
		}	
		if(this["flag"] == 1)
		{
			return 2;
		}
		return -1;
	}
	public isInActivity(): boolean {
		return GameData.serverTime >= this.st && GameData.serverTime < this.et;
	}
	public dispose(): void {
		super.dispose();
	}
}