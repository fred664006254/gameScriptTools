class AcCostGemRankVo extends AcBaseVo
{
	public constructor(){
		super();
	}
	//排行榜
	public rankinfo : any = {};

	public initData(data:any):void{
		for(let key in data){
			this[key]=data[key];
		}
	}
	//可转盘
	public getpublicRedhot1():boolean{	
        let flag = false;
		return flag;
	}

	public get isShowRedDot(): boolean{	
        let flag = false;
		if(!this.config){
			flag = false;
		}
		for(let i = 1; i < 2; ++ i){
			if(this[`getpublicRedhot${i}`]()){
				flag = true;
			}
		}
		return flag;
	} 
	
	public get acTimeAndHour():string{	
		let et = this.et - 86400 * this.config.extraTime;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public get acCountDown():string
	{
		let et = this.et - 86400 * this.config.extraTime;
		if(et >=  GameData.serverTime)
		{
			return App.DateUtil.getFormatBySecond((et - GameData.serverTime),1);
		}
		else
		{
			return LanguageManager.getlocal("acPunishEnd");
		}
		
	}

	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.config.extraTime;
	}

	//获取消耗元宝数
	public getUseGemNum():number{
        return this.v;
    }

	/**
	 * 活动彻底结束（包括展示期）
	 */
	public isActivityEnd():boolean{
		return GameData.serverTime >= this.et;
	}

	public getArr(key):Array<any>{	
		let arr:Array<any> =[];
		let cfg : Config.AcCfg.AcCostGemRankItemCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(!cfg){
			return [];
		}
		let list = cfg;  
		for(var i in list){
			if(i == key){	
				for(var key2 in list[i]){	
					if(list[i][key2]){
						var currObj =  list[i][key2]
						if(currObj.value|| currObj.rank ||currObj.needGem||currObj.limit){
							list[i][key2].key = Number(key2)+1;
							if(list[i][key2].key){
								arr.push(list[i][key2]); 
							}
						} 
					} 
				} 
			}
		}
		return arr;  
	}

	
	public getMyPrank():number{
		let rank = 0;
		if(this.rankinfo && this.rankinfo.myrankArr && this.rankinfo.myrankArr.myrank){
			rank = this.rankinfo.myrankArr.myrank;
		}
		return rank;
	}

	public getMyPScore():number{
		let score = 0;
		if(this.rankinfo && this.rankinfo.myrankArr && this.rankinfo.myrankArr.value){
			score = this.rankinfo.myrankArr.value;
		}
		return score;
	}

	public setRankInfo(data : any):void{
		if(data.rankArr){
			this.rankinfo.rankArr = data.rankArr;
		}
		if(data.myrankArr){
			this.rankinfo.myrankArr = data.myrankArr;
		}
	}

	public getRankInfo():any[]{
		let arr = [];
		if(this.rankinfo && this.rankinfo.rankArr){
			arr = this.rankinfo.rankArr;
		}
		return arr;
	}

	public getSpecialShow():string{
		let cfg : Config.AcCfg.CostGemRankCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(!cfg){
			return null;
		}
		for (let key in cfg.gemRank){
			let rewards = cfg.gemRank[key].getReward;
			let rArr = rewards.split("|");
			for (let i=0; i < rArr.length; i++){
				let strArr = rArr[i].split("_");
				if (this.code == 1 || this.code == 2){
					if (strArr[0] == "11"){
						return strArr[1];
					}
				}
			}
		}
		return null;
	}
    
	public dispose():void{ 
		this.rankinfo = null;
		super.dispose();
	}
}