/**
 * 珍器坊api
 * author shaoliang & qianjun
 * date 2019/7/22
 */
class ZhenqifangVoApi extends BaseVoApi
{
	private zhenqifangVo:ZhenqifangVo;
	public selIdx = 0;
	public freshlist = false;
	public freshfriendlist = false;
	public freshshop = false;
	public sendList = [];
	public friendsendList = {};
	public friendobj = {};
	public otherinfo : any = null;
    public constructor(){
		super();
	}

    public get ZhenqifangLevel():number{
        return this.zhenqifangVo.level;
	}
	
	public get ZhenqifangTaskFreshTime():number{
        return this.zhenqifangVo.freeitask;
    }

    public get curBuildExp():number{
      return this.zhenqifangVo.exp;
	}
	  
	public get curFreeNum():number{
		return this.zhenqifangVo.freefresh;
	}

	public get curTaskNum():number{
		let num = 0;
		let task = this.zhenqifangVo.itask;
		if(task && task.length){
			num = task.length;
		}
		return num;
	}

	public get curFTaskNum():number{
		let num = 0;
		let task = this.zhenqifangVo.ftask;
		if(task && task.length){
			num = task.length;
		}
		return num;
	}

	public getCurTaskarr():any[]{
		let task = this.zhenqifangVo.itask;
		let cfg = Config.ZhenqifangCfg; 
		let arr = [];
		if(task && task.length){
			for(let i in task){
				let unit = task[i];
				if(unit){
					arr.push({
						friend : 0,
						type : unit.quality,
						data : cfg.indivT[unit.quality][unit.taskId],
						st : unit.start,
						svtInfo : unit.svtInfo,
						taskId : unit.taskId,
						getReward : unit.getReward,
						cts : unit.cts,
						time : unit.time,
						first : unit.first,
					});
				}
			}
		}

		//任务数量
		let level = this.ZhenqifangLevel;
        let curcfg = cfg.getTaskHouseCfgByLevel(level);
		if(arr.length < curcfg.taskSlotIndiv){
			arr.push({
				empty : true
			});
		}
		return arr;
	}

	public getCurFTaskarr():any[]{
		let task = this.zhenqifangVo.ftask;
		let cfg = Config.ZhenqifangCfg; 
		let arr = [];
		if(task && task.length){
			for(let i in task){
				let unit = task[i];
				if(unit){
					arr.push({
						friend : 1,
						type : unit.quality,
						data : cfg.fridT[unit.quality][unit.taskId],
						st : unit.start,
						svtInfo : unit.svtInfo,
						taskId : unit.taskId,
						getReward : unit.getReward,
						cts : unit.cts,
						time : unit.time,
						index : unit.index
					});
				}
			}
		}
		return arr;
	}

	public haveInBuzhen(servantid:string, isfriend:boolean=false, uid:number=0):boolean{
		let task = [];
		for(let i in this.zhenqifangVo.itask){
			task.push(this.zhenqifangVo.itask[i]);
		}
		// for(let i in this.zhenqifangVo.ftask){
		// 	task.push(this.zhenqifangVo.ftask[i]);
		// }
		if(task){
			for(let i in task){
				let unit = task[i];
				if(unit.svtInfo){
					for(let j in unit.svtInfo){
						let tmp = unit.svtInfo[j];
						if(isfriend){
							// if(tmp.sid && Number(tmp.sid) == Number(servantid) && tmp.friend == 1 && tmp.uid == uid){
							// 	return true;
							// }
						}
						else{
							if(tmp.sid && Number(tmp.sid) == Number(servantid)){
								return true;
							}
						}
					}
				}
			}
		}
		return false;
	}

	public getShopNum(id:number):number{
		let num = 0;
		if(this.zhenqifangVo.shop && this.zhenqifangVo.shop[id]){
			num = this.zhenqifangVo.shop[id];
		}
		return num;
	}
	
	public getFriendSupportTimes(uid):number{
		let num = 0;
		if(this.zhenqifangVo.friend && this.zhenqifangVo.friend[uid]){
			num = this.zhenqifangVo.friend[uid];
		}
		return num;
	}

	public checkNpcMessage():boolean{
		let flag = false;
		if(Api.switchVoApi.checkZhenQiFangOpen() && this.isShowNpc()){
			//任务满了没
			if(this.getTaskMax(1) || this.getTaskMax(2)){
				flag = true;
			}
			//可领取的
			if(this.getRedPoint(1) || this.getRedPoint(2)){
				flag = true;
			}
		}
		return flag;
	}

	public getTaskMax(tasktype):boolean{
		let flag = false;
		let level = this.ZhenqifangLevel;
		let curcfg = Config.ZhenqifangCfg.getTaskHouseCfgByLevel(level);
		let tasknum = tasktype == 1 ? this.curTaskNum : this.curFTaskNum;
		let taskmax =  tasktype == 1 ? curcfg.taskSlotIndiv : curcfg.taskSlotFid;
		let insend = 0;
		let task = tasktype == 1 ? this.zhenqifangVo.itask :  this.zhenqifangVo.ftask;
		for(let i in task){
			let unit = task[i];
			if(unit.start > 0){
				++ insend
			}
		}
		if(insend < task.length){
			if(tasktype == 1){
				let servantlist : ServantInfoVo[] = Api.servantVoApi.getServantInfoListWithSort(1);
				if((servantlist.length - insend * 5 )>= 5){
					flag = true;
				}
			}
			else{
				flag = true;
			}

		}
		return flag;
	}

	public isShowNpc():boolean
    {
		// return true;
		if ( Config.ServantweaponCfg.lvNeed <= Api.playerVoApi.getPlayerLevel() ){
			return true;
		}
        return false;
    }

	public getRedPoint(tasktype : number):boolean{
		//1个人 2好友
		let flag = false;
		//领奖
		let task = tasktype == 1 ? this.zhenqifangVo.itask :  this.zhenqifangVo.ftask;
		for(let i in task){
			let unit = task[i];
			let cfg = Config.ZhenqifangCfg.getTaskCfgById(unit.quality, unit.taskId);
			let num = unit.start + unit.time - GameData.serverTime;
			if(num <= 0 && unit.start > 0){
				flag = true;
				break;
			}
		}

		//有任务可以做
		if(this.getTaskMax(tasktype)){
			flag = true;
		}
		return flag;
	}

	public canGetTakReward(tasktype : number):boolean{
			//1个人 2好友
			let flag = false;
			//领奖
			let task = tasktype == 1 ? this.zhenqifangVo.itask :  this.zhenqifangVo.ftask;
			for(let i in task){
				let unit = task[i];
				let cfg = Config.ZhenqifangCfg.getTaskCfgById(unit.quality, unit.taskId);
				let num = unit.start + unit.time - GameData.serverTime;
				if(num <= 0 && unit.start > 0){
					flag = true;
					break;
				}
			}
			return flag;
	}

	public getTaskData(friend : boolean, idx : number):any{
		let arr = friend ? this.getCurFTaskarr() : this.getCurTaskarr();
		return arr[idx];
	}

	public getInitial():boolean{
		let flag = false;
		if(this.zhenqifangVo && this.zhenqifangVo.info && this.zhenqifangVo.info.initialGuide && this.zhenqifangVo.info.initialGuide == 1){
			flag = true;
		}
		return flag;
	}

	public getFriendHistoryList():any{
		let obj = null;
		if(this.zhenqifangVo && this.zhenqifangVo.info && this.zhenqifangVo.info.historySlist){
			for(let i in this.zhenqifangVo.info.historySlist){
				let list = this.zhenqifangVo.info.historySlist[i];
				let isdelete = false;
				for(let j in list){
					let unit = list[j];
					unit.id = unit.sid;
					if(!Api.friendVoApi.isFriendByUid(unit.uid) && !Api.friendVoApi.isSadunByUid(unit.uid)){
						isdelete = true;
						break;
					}
				}
				if(!isdelete){
					if(!obj){
						obj = {};
					}
					obj[i] = list;
				}
			}
		}
		return obj;
	}

	public getIsInFuidUseList(uid:number):boolean{
		let flag = false;
		if(this.zhenqifangVo && this.zhenqifangVo.info && this.zhenqifangVo.info.fuidInUse && this.zhenqifangVo.info.fuidInUse[uid]){
			flag = true;
		}
		return flag;
	}
	//管家一键处理
	public getBatchTaskObject():Object
	{
		let servantObj = {};
		let taskArray = this.getCurTaskarr();
		let canselectservant = [];
		let haveservant = [];

		for (let i = 0 ; i<taskArray.length; i++ )
		{
			let oneTask = taskArray[i];
			if (oneTask.svtInfo)
			{
				let arr = oneTask.svtInfo;
				for(let k in arr){
					if (arr[Number(k)].sid)
					{
						haveservant.push(Number(arr[Number(k)].sid));
					}
				}
			}
		}

		let servantlist : ServantInfoVo[] = Api.servantVoApi.getServantInfoListWithSort(1);
		for(let i in servantlist){
			let sid = Number(servantlist[i].servantId);
			if(haveservant.indexOf(sid) == -1){
				canselectservant.push(sid);
			}
		}

		// let servantIdx:number = 0;
		for (let i = 0 ; i<taskArray.length; i++ )
		{
			let oneTask = taskArray[i];
			if (oneTask.st == 0)
			{
				if (canselectservant.length  >= oneTask.svtInfo.length)
				{
					let idArry = [];
					for (let j = 0; j < oneTask.svtInfo.length; j++)
					{	
						/**
						 * note:"total"
						   requirement:3500000
						 */
						let oneSvtInfo = oneTask.svtInfo[j];

						let tmp = [];
						if(oneSvtInfo.note){
                            for(let i in canselectservant){
                                let info = Api.servantVoApi.getServantObj(canselectservant[i]);
                                if(info[oneSvtInfo.note] >= oneSvtInfo.requirement){
                                    tmp.push(canselectservant[i]);
                                }
                            }
                            if(tmp.length){
                                tmp.sort((a,b)=>{
                                    let infoa = Api.servantVoApi.getServantObj(a);
                                    let infob = Api.servantVoApi.getServantObj(b);
                                    return infoa[oneSvtInfo.note] - infob[oneSvtInfo.note]
                                });
                            }
                            else{
                                canselectservant.sort((a,b)=>{
                                    let infoa = Api.servantVoApi.getServantObj(a);
                                    let infob = Api.servantVoApi.getServantObj(b);
                                    return infoa[oneSvtInfo.note] - infob[oneSvtInfo.note]
                                });
                            }
                            
                        }
                        else{
                            canselectservant.sort((a,b)=>{
                                let infoa = Api.servantVoApi.getServantObj(a);
                                let infob = Api.servantVoApi.getServantObj(b);
                                return infoa.total - infob.total;
                            });
                        }

						let sid = tmp.length ? tmp[0] : canselectservant[0];
                        canselectservant.splice(canselectservant.indexOf(sid), 1);
                        idArry.push({sid:String(sid)});

						// idArry.push({sid:String(canselectservant[servantIdx+j])});
					}
					servantObj[i+1] = idArry;
					// servantIdx+=oneTask.svtInfo.length;
				}
			}
		}

		return servantObj;
	}

	public getBatchTaskObject2():Object
	{
		let servantObj = {};
		let canselectservant = [];
		let historylist = Api.zhenqifangVoApi.getFriendHistoryList();
		let haveservant = [];
		let taskArray = this.getCurFTaskarr();

		for (let i = 0 ; i<taskArray.length; i++ )
		{
			let oneTask = taskArray[i];
			if (oneTask.svtInfo)
			{
				let arr = oneTask.svtInfo;
				for(let k in arr){
					if (arr[Number(k)].sid)
					{
						haveservant.push(Number(arr[Number(k)].uid));
					}
				}
			}
		}
		for(let i in historylist){
			let oneInfo = historylist[i];
			for (let j in oneInfo)
			{
				let sid = oneInfo[j].sid;
				let info = {sid:Number(sid),uid:Number(oneInfo[j].uid)};
				if(sid && haveservant.indexOf(Number(oneInfo[j].uid)) == -1 ){
					canselectservant.push(info);
				}
			}
			
		}

		let servantIdx:number = 0;
		for (let i = 0 ; i<taskArray.length; i++ )
		{
			let oneTask = taskArray[i];
			if (oneTask.st == 0)
			{
				if (canselectservant.length - servantIdx >= oneTask.svtInfo.length)
				{
					let idArry = [];
					for (let j = 0; j < oneTask.svtInfo.length; j++)
					{
						idArry.push({sid:String(canselectservant[servantIdx+j].sid),uid:String(canselectservant[servantIdx+j].uid)});
					}
					servantObj[i+1] = idArry;
					servantIdx+=oneTask.svtInfo.length;
				}
			}
		}

		return servantObj;
	}

    public dispose():void{
		this.zhenqifangVo = null;
		this.freshlist = false;
		this.freshfriendlist = false;
		this.freshshop = false;
		this.selIdx = -1;
		this.sendList = [];
		this.friendsendList = {};
		this.otherinfo = null;
		this.friendobj ={};
		super.dispose();
	}
}