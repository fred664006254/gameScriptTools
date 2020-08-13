class AcMouseTreasureVo extends AcBaseVo
{   
	/*
    flags: {}
    v: 0
    */
    public ainfo : any = null;
    public rinfo : any = null;
	/** 地图信息{} */
	arr/** 本关地图数组{pos:x,pos:x,...} */
	public map:any= {
		arr: null,
	};
	//体力
    public num : number = 0;
	public tnum : number = 0;

    //积分翻倍剩余次数
	public addtime : number = 0;
    //是积分多少
    public score:number = 0;
    //购买了多少次，初始是0
	public buyLimit : number = 0;
	/*
    st: 0
    num: 5
    */
	public refresh : any = null;
    public rankData:any = null;
	public buylimit:number = 0;

    public constructor() 
	{
		super();
	}

    public initData(data: any): void {
		for (let key in data) 
		{
			if(key == "map")
			{
				this.map.arr = data[key];
				continue;
			}
			this[key] = data[key];
		}
	}

	public getMapType(key:number):number
	{
		let t = 0;
		if (this.map.arr)
		{
			t= this.map.arr[key];
		}
		return t;
	}

	//再充值x可获得一次游戏次数
	public getNextTimeNeedRecharge():number
	{
		let v = this.cfg.cost2 - this.rinfo.v%this.cfg.cost2;
		if (v == 0)
		{
			v = this.cfg.cost2;
		}
		return v;
	}

	public getMapTotalCouple():number
	{
		let v = 0;
		if (this.map && this.map.arr)
		{
			v = Math.ceil(Object.keys(this.map.arr).length/2);
		}
		return v;
	}

     public getShowSkinData():RewardItemVo{
        let data = this.cfg.change;
        let itemVo = GameData.formatRewardItem(data["changeItem"])[0];
        return itemVo;
    }

    private get cfg() : Config.AcCfg.MouseTreasureCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

     public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
	}

	public getCountDown():string{
        let et = this.et - this.cfg.extraTime * 86400;
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acPunishEnd");
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    }

	//红点
    public get isShowRedDot():boolean{
        return this.isCangetAchieveReward() || this.isCanPlay() || this.isCangetRechargeReward();
    }

    //当前分数
    public getProcess():number{
        if (this.ainfo && this.ainfo.v){
            return this.ainfo.v;
        }
        return 0;
    }

	 //当前分数
    public getScore():number{
        return this.score;
    }

    public getTimes():number
	{
		return this.num;
	}
	//总的可消除次数，免费次数➕ 体力
	public getTotalTimes():number
	{
		return this.getTimes()+this.getFreeTimes();
	}

	public getAddItemNum():number
	{
		 return Api.itemVoApi.getItemNumInfoVoById(this.cfg.getAddItemVo().id);
	}


	 //是否有免费次数
    public isCanPlay():boolean{
        if (this.isInActivity() && (this.num>0 || this.getFreeTimes() > 0)){
            return true;
        }
        return false;
    }

	public getFreeTimes():number
	{
		let v = 0;
        if (this.refresh)
        {	
			v =  this.refresh.num;
			if (v < this.cfg.baseChance)
			{
				let addtime = Math.floor((GameData.serverTime-this.refresh.st)/this.cfg.cdTime);
				v = Math.min(this.cfg.baseChance,(v+addtime));
			}
        }
		return v;
	}

	public getNextFreeNeedTime():number
	{
		let v = 0;
		if (this.refresh)
        {	
			if (this.refresh.num < this.cfg.baseChance)
			{
				v = this.cfg.cdTime  -  (GameData.serverTime-this.refresh.st)%this.cfg.cdTime;
			}
        }
		return v;
	}

	//是否有可领取充值奖励
    public isCangetRechargeReward():boolean{
        let data = this.cfg.rechargeList;
        for (let i=0; i < data.length; i++){
            if (!this.isGetRechargeRewardById(data[i].id)){
                if (this.rinfo && this.rinfo.v >= data[i].needGem){
                    return true;
                }
            }
        }
        return false;
    }

	/**当前充值奖励是否领取 */
    public isGetRechargeRewardById(id:string|number):boolean{
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]){
            return true;
        }
        return false;
    }

	//是否有可领取进度奖励
    public isCangetAchieveReward():boolean{
        let data = this.cfg.achievementList;
        for (let i=0; i < data.length; i++){
            if (!this.isGetAchieveRewardById(data[i].id)){
                if (this.ainfo && this.ainfo.v >= data[i].needScore){
                    return true;
                }
            }
        }
        return false;
    }

	public getSortRechargeCfg():Config.AcCfg.MouseTreasureRecharageItem[]{
        let achieveData = this.cfg.rechargeList;
        let count = achieveData.length;
        let data:Config.AcCfg.MouseTreasureRecharageItem[] = [];
        for (let i = 0; i < count; i++){
            if (this.isGetRechargeRewardById(achieveData[i].id)){
                achieveData[i].sortId = achieveData[i].id + count;
            }
            else if (this.rinfo.v >= achieveData[i].needGem){
                achieveData[i].sortId = achieveData[i].id - count;
            }
            else{
                achieveData[i].sortId = achieveData[i].id;
            }
            data.push(achieveData[i]);
        }
        data.sort((a, b)=>{
            return a.sortId - b.sortId;
        })
        return data;
    }

	 /**当前进度奖励是否领取 */
    public isGetAchieveRewardById(id:string|number):boolean{
        if (this.ainfo && this.ainfo.flags && this.ainfo.flags[id]){
            return true;
        }
        return false;
    }

	 // 1, 2,可领，3,已领
    public getAchievementType(id:number):number
    {   
        let type = 1;
        if (this.isGetAchieveRewardById(id))
        {
            type = 3;
        }
        else
        {
            let neednum = this.cfg.achievementList[id-1].needScore;
            if (this.ainfo.v >= neednum){
                type = 2;
            }
        }
        return type;
    }

    public getSortAchievementCfg():Config.AcCfg.MouseTreasureAchievementItem[]{
        let achieveData = this.cfg.achievementList;
        let count = achieveData.length;
        let data:Config.AcCfg.MouseTreasureAchievementItem[] = [];
        for (let i = 0; i < count; i++){
            if (this.isGetAchieveRewardById(achieveData[i].id)){
                achieveData[i].sortId = achieveData[i].id + count;
            }
            else if (this.ainfo.v >= achieveData[i].needScore){
                achieveData[i].sortId = achieveData[i].id - count;
            }
            else{
                achieveData[i].sortId = achieveData[i].id;
            }
            data.push(achieveData[i]);
        }
        data.sort((a, b)=>{
            return a.sortId - b.sortId;
        })
        return data;
    }

    /** 是否正在游戏中 */
	public inGaming(): boolean {
		if (this.map && this.map.arr && Object.keys(this.map.arr).length > 0) {
			return true;
		} else {
			return false;
		}
	}

    public isCanExchange():boolean{
        let str = this.cfg.change["changeItem"];
        let itemVo = GameData.formatRewardItem(str)[0];
        let itemData = Api.itemVoApi.getItemInfoVoById(itemVo.id);
        let currNum = 0;
        if (itemData){
            currNum = itemData.num;
        }
        if (currNum >= itemVo.num){
            return true;
        }
        return false;
    }

    	/** 扫描，找到能连接的 */
	public scanForLink(): false | [{ x: number, y: number }, { x: number, y: number }] {
		for (let i1 = 0; i1 < Object.keys(this.map.arr).length; i1++) {
			let pos1 = parseInt(Object.keys(this.map.arr)[i1]);
			for (let i2 = 0; i2 < Object.keys(this.map.arr).length; i2++) {
				let pos2 = parseInt(Object.keys(this.map.arr)[i2]);
				let p1 = { x: pos1 % this.cfg.GRID_WIDTH, y: Math.floor(pos1 / this.cfg.GRID_WIDTH) };
				let p2 = { x: pos2 % this.cfg.GRID_WIDTH, y: Math.floor(pos2 / this.cfg.GRID_WIDTH) }
				let ret = this.checkLink(p1, p2);
				if (ret) {
					return [p1, p2];
				}
			}
		}
		return false;// 没找到（需要后端重置了）
	}

	public getDestroyArray():any
	{
		let obj = {};
		let allkeys = Object.keys(this.map.arr)
		for (let i = 0; i < allkeys.length; i++) {
			let key:string = allkeys[i];
			let icon = String(this.map.arr[key]);
			let v = Number(key);
			let p =  { x: v % this.cfg.GRID_WIDTH, y: Math.floor(v / this.cfg.GRID_WIDTH) };
			if (!obj[icon])
			{
				obj[icon] = [];
			}
			obj[icon].push(p);
		}

		return obj;
	}

	/** 检测两个点是否可以连接（是否可消除）*/
	public checkLink(p1: { x: number, y: number }, p2: { x: number, y: number }): false | [{ x: number, y: number }, { x: number, y: number }] {
		// 两个点是同一个点，不能消除
		if (p1.x == p2.x && p1.y == p2.y) {
			return false;
		}
		// 两个点，不是同一个物品，不能消除
		if (this.map.arr[p1.x + p1.y * this.cfg.GRID_WIDTH] != this.map.arr[p2.x + p2.y * this.cfg.GRID_WIDTH]) {
			return false;
		}
		// 转折点数组
		let t1Arr: Array<{ x: number, y: number }> = [];
		let t2Arr: Array<{ x: number, y: number }> = [];
		t1Arr.push(p1);
		for (let x = p1.x - 1; x >= 0; x--) {
			let p = { x: x, y: p1.y };
			if (this.checkEmpty(p)) {
				t1Arr.push(p);
			} else {
				break;
			}
		}
		for (let x = p1.x + 1; x < this.cfg.GRID_WIDTH; x++) {
			let p = { x: x, y: p1.y };
			if (this.checkEmpty(p)) {
				t1Arr.push(p);
			} else {
				break;
			}
		}
		for (let y = p1.y - 1; y >= 0; y--) {
			let p = { x: p1.x, y: y };
			if (this.checkEmpty(p)) {
				t1Arr.push(p);
			} else {
				break;
			}
		}
		for (let y = p1.y + 1; y < this.cfg.GRID_HEIGHT; y++) {
			let p = { x: p1.x, y: y };
			if (this.checkEmpty(p)) {
				t1Arr.push(p);
			} else {
				break;
			}
		}
		t2Arr.push(p2);
		for (let x = p2.x - 1; x >= 0; x--) {
			let p = { x: x, y: p2.y };
			if (this.checkEmpty(p)) {
				t2Arr.push(p);
			} else {
				break;
			}
		}
		for (let x = p2.x + 1; x < this.cfg.GRID_WIDTH; x++) {
			let p = { x: x, y: p2.y };
			if (this.checkEmpty(p)) {
				t2Arr.push(p);
			} else {
				break;
			}
		}
		for (let y = p2.y - 1; y >= 0; y--) {
			let p = { x: p2.x, y: y };
			if (this.checkEmpty(p)) {
				t2Arr.push(p);
			} else {
				break;
			}
		}
		for (var y = p2.y + 1; y < this.cfg.GRID_HEIGHT; y++) {
			let p = { x: p2.x, y: y };
			if (this.checkEmpty(p)) {
				t2Arr.push(p);
			} else {
				break;
			}
		}

		for (let t1Index = 0; t1Index < t1Arr.length; t1Index++) {
			let t1 = t1Arr[t1Index];
			for (let t2Index = 0; t2Index < t2Arr.length; t2Index++) {
				let t2 = t2Arr[t2Index];
				if (this.checkTwoPointOneLine(t1, t2)) {
					return [t1, t2];
				}
			}
		}
		return false;
	}
	// 判断一个位置是不是空的
	private checkEmpty(p: { x: number, y: number }) {
		if (this.map.arr[p.x + p.y * this.cfg.GRID_WIDTH]) {
			return false;
		} else {
			return true;
		}
	}
	// 检测两个点是否可以相连（直线相连）(p1的xy都不大于p2的xy，且p1p2的xy，至少有一个是相同的)
	private checkTwoPointOneLine(p1: { x: number, y: number }, p2: { x: number, y: number }): boolean {
		let pos1: { x: number, y: number };
		let pos2: { x: number, y: number };
		if (p1.x == p2.x) {
			if (p1.y > p2.y) {
				pos1 = p2;
				pos2 = p1;
			} else {
				pos1 = p1;
				pos2 = p2;
			}
		} else if (p1.y == p2.y) {
			if (p1.x > p2.x) {
				pos1 = p2;
				pos2 = p1;
			} else {
				pos1 = p1;
				pos2 = p2;
			}
		} else {
			return false;
		}
		if (!pos1) {
			console.log("not pos1");
		}
		if (pos1.x == pos2.x) {
			// x相同
			for (var y = pos1.y + 1; y <= pos2.y - 1; y++) {
				if (!this.checkEmpty({ x: pos1.x, y: y })) {
					return false;
				}
			}
		} else {
			// y相同
			for (var x = pos1.x + 1; x <= pos2.x - 1; x++) {
				if (!this.checkEmpty({ x: x, y: pos1.y })) {
					return false;
				}
			}
		}
		return true;
	}

	public dispose():void 
	{ 
		this.ainfo = null;
		this.rinfo = null;
		this.map = null;
		this.num = 0;
		this.tnum = 0;
		this.addtime = 0;
		this.refresh = null;

		super.dispose();
	}
}
    