class AcWeiZhengVo extends AcBaseVo{
	private task : any = {};
	private binfo : any = {};
	private bqnum : number = 0;
	private diffday : number = 0;
	public lastidx = -1;
	public lastpos = null;

	public constructor(){
		super();
	}

	public initData(data:any):void{
		for(let key in data){
			this[key]=data[key];
		}
	}

	public get acTimeAndHour():string{	
		let et = this.et - 86400 * this.config.extraTime;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public getpublicRedhot1():boolean{
		let flag = false;
		//任务
        for(let i = 1; i < 4; ++ i){
			if(this.canDayRewardLq(i)){
				flag = true;
				break;
			}
        }
		return flag;
	}

	public canDayRewardLq(day : number):boolean{
		let flag = false;
		for(let j in this.config.task[day]){
			let unit = this.config.task[day][j];
			if(this.canTaskLq(unit.questType, day)){
				flag = true;
				break;
			}
		}
		return flag;
	}

	public getpublicRedhot2():boolean{
		let flag = false;
		let num = this.getChargeNum();
		for(let i in this.config.recharge){
			let unit = this.config.recharge[i];
			let id = Number(i) + 1;
			if(num >= unit.needGem && !this.getChargeLq(id)){
				flag = true;
				break;
			}
		}
		//充值
		return flag;
	}

	private getUiCode():string{
        let code = ``;
        switch(Number(this.code)){
            case 1:
            case 2:
                code = `1`;
                break;
            default:
                code = this.code + ``;
                break;
        }
		return code;
	}

	//可兑换
	public getpublicRedhot3():boolean{
		let flag = false;
		let sid = this.config.getSkinId(this.getUiCode())
        let scfg = Config.ServantskinCfg.getServantSkinItemById(sid);
		let haveskin = !scfg.canExchangeItem()//this.haveSkin(this.getUiCode());

        let item = GameData.formatRewardItem(this.config.claim[haveskin ? 1 : 0].costShu)[0];
        let num = Api.itemVoApi.getItemNumInfoVoById(item.id);
        if(!haveskin && num >= item.num){
			flag = true;
        }
		return flag;
	}

	public get isShowRedDot(): boolean {	
		for(let i = 1; i < 4; ++ i){
			if(this[`getpublicRedhot${i}`]()){
				return true
			}
		}
		return false; 
	}

	public isInActy():boolean{
		let flag = false;
		if(GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400){
			flag = true;
		}
		return flag;
	}

	public getCountDown():number{
		let num = 0;
		if(this.isInActy()){
			num = this.et - this.config.extraTime * 86400 - GameData.serverTime;
		}
		else{
			num = 0;
		}
		return num;
	}

	//任务完成进度
	public getTaskValue(taskType : string, day : number):number{
		let num = 0;
		if(this.task[day] && this.task[day][taskType] && this.task[day][taskType].v){
			num = this.task[day][taskType].v;
		}
        return num;
    }

    //任务完成进度
    public getTaskLq(taskType : number, day : number):boolean{
		let flag = false;
		if(this.task[day] && this.task[day][taskType] && this.task[day][taskType].flag){
			flag = this.task[day][taskType].flag == 2;
		}
        return flag;
	}

	//能否领取
	public canTaskLq(taskType : number, day : number):boolean{
		let flag = false;
		if(this.task[day] && this.task[day][taskType] && this.task[day][taskType].flag){
			flag = this.task[day][taskType].flag == 1;
		}
        return flag;
	}

	//充值进度
	public getChargeNum():number{
		let num = 0;
		if(this.binfo && this.binfo.v){
			num = this.binfo.v;
		}
        return num;
	}

	public getChargeLq(id : number):boolean{
		let flag = false;
		if(this.binfo && this.binfo.flags){
			flag = this.binfo.flags[id] == 1;
		}
        return flag;
	}

	public getBqNum():number{
		return this.bqnum;
	}

	public getBqCost():number{
		let bqnum = Math.min(this.bqnum, this.config.missCost.length - 1);
		return this.config.missCost[bqnum]
	}
	
	//获取进度日期
	public getNowDay():number{
		let day = this.diffday;
		return day;//Math.min(day , 3);
	}

	//是否已获得此皮肤
	public haveSkin(code):boolean{
		let flag =false;
		let rewardvo = GameData.formatRewardItem(this.config.claim[0].getReward)[0];
		let skinid = this.config.getSkinId(code);
		if(Api.itemVoApi.getItemNumInfoVoById(rewardvo.id) > 0 || Api.servantVoApi.isOwnSkinOfSkinId(skinid)){
			flag = true;
		}
		return flag;
	}
	 
	public dispose():void{ 
		this.task = null;
		this.binfo = null;
		this.bqnum = 0;
		this.diffday = 0;
		super.dispose();
	}
}