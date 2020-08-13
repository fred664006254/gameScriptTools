class AcDestroySameVo extends AcBaseVo
{	
	public lastidx : number = -1;
	public lastpos : any = null;
	public pointidx : number = -1;
	public taskid : string = '';
	
    private round = 1;
	private rinfo = null;
	public bossrwd = null;
	private task = null;
	private grid = null;
	private _curHp = [];
	private isfree = 0;
	private shop = null;

	public constructor() 
	{
		super();
    }
    
	public initData(data:any):void{
		for(let key in data)
		{
			this[key]=data[key];
		}
	}

	/**商品购买的数量 */
	public getShopValue(id: number) {
		return this.shop && this.shop[id] ? this.shop[id] : 0;
	}

	//充值奖励
	public getpublicRedhot1():boolean{	
		//充值
		let cfg = this.cfg;
		if(this.isEnd)
		{
			return false;
		}
		let curCharge = this.getChargeNum();
		for(let i in cfg.recharge){
			let unit = cfg.recharge[i];
			if(curCharge >= unit.needGem && this.isGetRecharge(Number(i)) == false){
				return true;
			}
		}
		return false;
	}
	//任务奖励
	public getpublicRedhot2():boolean{	
		//任务
		let cfg = this.cfg;
		if(this.isEnd)
		{
			return false;
		}
		let task = cfg.task;
		for(let i in task){
			let unit = task[i];
			let id = Number(i);
			for(let j = 0; j < 3; ++ j){
				let tasknum = this.getTask(id+1, j+1);
				let isget = this.isGetTaskReward(id+1,j+1);
				let tmp = unit[j];
				if(!isget && tasknum >= unit[j].value){
					return true;
				}
			}
		}
		return false; 
	}

	//击杀首领
	public getpublicRedhot3():boolean{	
		if(this.isEnd)
		{
			return false;
		}
		let curround = this.getCurround();
		for(let i = 1; i < curround; ++ i){
			if(this.bossrwd && typeof this.bossrwd[i] != `undefined` && !this.isGetRoundReward(i)){
				return true;
			}
		}
		if(curround == Object.keys(this.cfg.bossList).length && this.bossrwd && typeof this.bossrwd[curround] != `undefined` && this.getCurbossHp() == 0){
			return true;
		}
		return false; 
	}

	//免费
	public getpublicRedhot4():boolean{	
		if(this.isEnd){
			return false;
		}
		return this.isfree > 0; 
	}

	public get isShowRedDot(): boolean{	
		for(let i = 1; i <= 4; ++ i){
			if(this[`getpublicRedhot${i}`]()){
				return true
			}
		}
		return false; 
	} 

	private get cfg() : Config.AcCfg.DestroySameCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
	public get acTimeAndHour():string{	
		let et = this.et - 86400 * this.cfg.extraTime;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
	}

	public getCountDown():number{
		let num = 0;
		if(this.isInActivity()){
			num = this.et - this.cfg.extraTime * 86400 - GameData.serverTime;
		}
		else{
			num = 0;
		}
		return num;
	}

	public getItemNum():number{
		let num = this.v;
		return num;
	}

	public getFreeNum():number{
		let num = this.isfree;
		return num;
	}

	//充值
	public getChargeNum():number{
		let charge = 0;
		if(this.rinfo && this.rinfo.v){
			charge = this.rinfo.v;
		}
		return charge;
	}

	//获取任务完成次数
	public getTask(id1,id2):number{
		let num = 0;
		if(this.task[id1] && this.task[id1][id2]){
			num = this.task[id1][id2].v;
		}
		return num;
	} 

	/*任务奖励是否领取*/
	public isGetTaskReward(id1,id2):boolean{
		let flag = false;
		if(this.task[id1] && this.task[id1][id2]){
			flag = this.task[id1][id2].f == 1;
		}
		return flag;
	} 

	/*累积充值领取判断*/
	public isGetRecharge(id:number):boolean{
		let flag = false;
		if(this.rinfo && this.rinfo.flags && this.rinfo.flags[id]){
			flag = this.rinfo.flags[id] == 1;
		}	
		return flag;
	}

	/*获取位置上的南瓜*/
	public getPopPos(x:number, y:number):number{	
		let type = 0;
		if(this.grid[x - 1] && this.grid[x - 1][y - 1]){
			type = this.grid[x - 1][y - 1];
		}
		return type;
	}

	public getArr(key):Array<any> {	
		let arr:Array<any> =[];
		let cfg : Config.AcCfg.DestroySameCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(!cfg){
			return [];
		}
		let list = cfg;  
		for(var i in list){
			if(i == key){	
				for(var key2 in list[i]){	
					if(list[i][key2]){
						var currObj =  list[i][key2]
						if(currObj.getReward){
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

	//当前多少轮
	public getCurround():number{
		let round = this.round;
		return round;
	}

	//当前boss血量

	public setBosshp(num:number[]):void{
		this._curHp = num;
	}

	public getCurbossHp():number{
		let hp = this._curHp[this.round - 1];
		return hp;
	}

	//轮数奖励
	public isGetRoundReward(round):boolean{
		if(this.bossrwd && this.bossrwd[round]){
			return true;
		}
		return false;
	}

	public dispose():void{
		this.lastidx = -1;
		this.lastpos = null;
		this. round = 1;
		this. rinfo = null;
		this. task = null;
		this. grid = null;
		this._curHp = null;
		this.bossrwd=null;
		this.pointidx = -1;
		this.taskid = '';
		this.shop = null;
		super.dispose();
	}
}