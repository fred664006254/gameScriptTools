class AcFourPeopleVo extends AcBaseVo {

	//  --getServant  兑换的门客ID
	//   --getWife  兑换的红颜ID
	//   --needItem  兑换所需道具
	//   --needNum  兑换所需数量
	private getServant: number = 0;
	private getWife: number = 0;
	private needItem: number = 0;
	private needNum: number = 0;

	public constructor() {
		super();
	}

	public get isShowRedDot(): boolean {

		let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(!cfg)
		{
			return false;
		}
		let fourPeoplelist = cfg.getPeopleList();
		let currBoo:boolean =false;
		for (var i: number = 0; i < fourPeoplelist.length; i++) {
			// 当前拥有多少道具
			var data: any = fourPeoplelist[i];
			let _itemNum = Api.itemVoApi.getItemNumInfoVoById(data.needItem);
			let servantInfoVo: ServantInfoVo = Api.servantVoApi.getServantObj(data.getServant);
	       	if (servantInfoVo) 
			{
				currBoo =false;
			}
			else
			{
				if (_itemNum >= data.needNum) 
				{
				    return true;
				}
			}
		}
		return false;
	}

	public checkRedByPeopleType(type:number):boolean{
		let cfg:Config.AcCfg.FourPeopleCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(!cfg)
		{
			return false;
		}
		let data = cfg.getPeopleListByType(type);
		if (data && data.length > 0){
			for (let i=0; i < data.length; i++){
				let itemNum = Api.itemVoApi.getItemNumInfoVoById(data[i].needItem);
				let servantInfoVo: ServantInfoVo = Api.servantVoApi.getServantObj(data[i].getServant);
				if (!servantInfoVo && itemNum >= data[i].needNum) 
				{	
					return true;	
				}
			}
		}
		return false;
	}

	public dispose(): void {
		this.getServant =0;
		this.getWife =0;
		this.needItem =0;
		this.needNum =0;
	}
}