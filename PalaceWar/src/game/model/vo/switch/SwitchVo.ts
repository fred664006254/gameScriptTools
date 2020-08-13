class SwitchVo extends BaseVo
{
	public switchList:any={};
	public changeOpen:number[] = [350,200];
	public openWeapon:boolean = false;
	public constructor() 
	{
		super();
		if (PlatformManager.checkIsKRSp())
		{
			this.changeOpen[0] = 250;
		}
	}

	public initData(data:any):void
	{
		for(let key in data)
		{	
			if (key.split("_")[0] == "challengeOpen")
			{
				let keys = key.split("_");
				if (Number(keys[1]) > this.changeOpen[0])
				{
					this.changeOpen[0] = Number(keys[1]);
				}
				if (Number(keys[2]) > this.changeOpen[1])
				{
					this.changeOpen[1] = Number(keys[2]);
				}
			}
			else if(key != "lockinfo"){
				this.switchList[key]=data[key]?Number(data[key]):0;
			}
			else{
				this.switchList[key]=data[key] ;
			}

			if (!this.openWeapon && key.split("_")[0] == "weapon" && key.split("_")[1] == "name")
			{
				this.openWeapon = true;
			} 
		}
	}

	public dispose():void
	{
		this.switchList={};
		if (PlatformManager.checkIsKRSp())
		{
			this.changeOpen = [200,200];
		}
		else
		{
			this.changeOpen = [350,200];
		}
		this.openWeapon = false;
	} 
}