class TitleupgradeVoApi extends BaseVoApi
{
    private titleupgradeVo:TitleupgradeVo;
    
	public constructor(){
		super();
	}

	public formatData(data:any):void{
		super.formatData(data);
	}
	public checkPalaceMessage():boolean{
		let flag = false;
		if(Api.switchVoApi.checkTitleUpgrade()){
			let arr = Config.TitleupgradeCfg.getDiOrder().concat(Config.TitleupgradeCfg.getWangOrder()).concat(Config.TitleupgradeCfg.getHuangOrder());
			for(let i in arr){
				if(this.canTitleLevelUp(arr[i]) && this.isinTitle(arr[i])){
					flag = true;
					break;
				}	
			}
		}
		return flag
	}

	public checkNpcMessage():boolean{
		let flag = false;
		if(Api.switchVoApi.checkTitleUpgrade()){
			let arr = Config.TitleupgradeCfg.getDiOrder().concat(Config.TitleupgradeCfg.getWangOrder()).concat(Config.TitleupgradeCfg.getHuangOrder());
			for(let i in arr){
				if(this.canTitleLevelUp(arr[i])){
					flag = true;
					break;
				}	
			}
		}
		return flag
	}

	public isunlock(titleid):boolean{
		let flag = false;
		if(this.getTitleInfo(titleid).level > 0 || this.isinTitle(titleid)){
			flag = true;
		}
		return flag;
	}

	//是否在位
	public isinTitle(titleid):boolean{
		let flag = false;
		let titleCfg = Config.TitleCfg.getTitleCfgById(titleid);
		let titleVo = Api.itemVoApi.getTitleInfoVoById(Number(titleid));
		//自己有的戴着 并且物品栏有的
		if(titleCfg.isTitle == 1 && titleVo.num > -1){
			flag = true;
		}
		return flag;
	}

	public getTitleInfo(titleid):any{
		let obj = null;
		obj = Api.itemVoApi.getTitleUpgradeInfo(titleid);
		return obj
	}

	public canTitleLevelUp(titleid, level = 0):boolean{
		let obj = false;
		if(Config.TitleCfg){
			let titlecfg = Config.TitleCfg.getTitleCfgById(titleid);
			if(titlecfg && (titlecfg.titleType == 1 || titlecfg.titleType == 2 || titlecfg.titleType == 7)){
				let isdi = titlecfg.titleType == 1;
				let arr = [];
				switch(titlecfg.titleType){
					case 1:
						arr = Config.TitleupgradeCfg.diList;
						break;
					case 2:
						arr = Config.TitleupgradeCfg.wangList;
						break;
					case 7:
						arr = Config.TitleupgradeCfg.huangList;
						break;
				}
				let info = this.getTitleInfo(titleid);
				let curlv = info.level;
				if(level){
					if(arr[level - 1]){
						if(curlv < level && info.num >= arr[level - 1].timesNeed){
							obj = true;
						}
					}
				}
				else{
					for(let i in arr){
						if(curlv < Number(i) + 1 && info.num >= arr[i].timesNeed){
							obj = true;
							break;
						}
					}
				}
			}
		}
		return obj
	}
	
	public dispose():void{
		super.dispose();
	}
}