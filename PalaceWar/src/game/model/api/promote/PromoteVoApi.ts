class PromoteVoApi extends BaseVoApi{
    private _promoteVo:PromoteVo;
    private _promoteList : any[] = [];//{uid = 10001,vip = 1,level =3,pic = 4,name = "aa"}
	private _promotePlayerList : any[] = [];//{uid = 10001,vip = 1,level =3,pic = 4,name = "aa"}
	public _showNotice : boolean = false;
	public _ishaveking:number = 0;

	public constructor(){
		super();
    }

    public formatData(data:any):void{
		let view = this;
		if (!view._promoteVo){
			view._promoteVo = new PromoteVo();
		}
		view._promoteVo.initData(data);
    }

    public initListData(data:any):void{
		if(data && data.promoteList){
			this._promoteList = [];
			this._promoteList = data.promoteList;   
		}
    }

    public initPlayerListData(data:any){
		if(data && data.userList){
			this._promotePlayerList = [];
			for(let i in data.userList){
			//userList = { 1 = {uid,权势,名称,称号,头像}}
				let unit = data.userList[i];
				this._promotePlayerList.push({
					'uid' : unit[0],
					'power' : unit[1],
					'name' : unit[2],
					'title' : unit[3],
					'pic' : unit[4],
					'phototitle' : unit[5]
				});
			}
		}
    }

    public getPromoteList() : any[]{
		return this.arr2obj(this._promoteList, 'position');
    }
	
    public getPromotePlayerList() : any[]{
		return this._promotePlayerList;
    }
	
    public isKing() : boolean{
        return this._promoteVo.king == 1;
    }

	 public getKingEndtime() : number{
        return this._promoteVo.et;
    }

    public isInPromoteList(uid) : boolean{
		let list = this.arr2obj(this._promoteList, 'uid');
		if(list[uid]){
			return true;
		}
		return false;
	}
	
	public getSelfPosition() : number{
		return this._promoteVo.position;
	}

	public isPositionEmpty() : boolean{
		if(!this._promoteList.length){
			return false;
		}
		let list = this.arr2obj(this._promoteList, 'position');
		for(let i = 1; i < 8; ++i){
			if(!list[i] || !list[i].uid){
				return true;
			}
		}
		return false;
	}

    public arr2obj(arr: Array<any>, key: string): any {
		let obj: any = {};
		if (arr) {
			let ln = arr.length;

			if (ln) {
			for (let i = 0; i < ln; i++) {
				let cd: any = arr[i];
				obj[cd[key]] = cd;
			}
			}
		}
		return obj;
    }

	public getSpid():string
	{
		return this._promoteVo.spinfo.spid;
	}
	public getSinfo()
	{
		return this._promoteVo.spinfo;
	}
	protected getSpidLastTimes()
	{

	}
	public getGdinfo()
	{
		return this._promoteVo.gdinfo;
	}


	public isDuringDiscussionTime()
	{
		let leveeTime = Config.PolicyCfg.leveeTime;
		let serSecs = GameData.serverTime;
		let dayZeroSec = App.DateUtil.getWeeTs(serSecs);

		if(serSecs >= dayZeroSec + leveeTime[0] *60*60 && serSecs <= dayZeroSec + leveeTime[1] *60*60)
		{
			return true;
		}
		return false;
	}
	
	public getDecreeAddInfo(paperType:number,policyType:number)
	{
		let decreeId = this.getGdinfo().gdid;
		let policyId = this.getSpid();
		if(Number(decreeId) == 0 && Number(policyId) == 0)
		{
			return null;
		}
		let times = 0;
		let extent = 0;
		let decdg = Config.PolicyCfg.getGovDecreeById(decreeId);
		let paperStr = "";
		if(paperType == decdg.type)
		{
			paperStr = LanguageManager.getlocal("decreePaperTxt");
			times = decdg.addTimes1;
			extent = decdg.addExtent1;
			if(! this.isKing())
			{
				times = decdg.addTimes2;
				extent = decdg.addExtent2;
			}
		}
		
		let strKey = "decreeAttrAddTxt0";
		let policyStr = "";

		if(Number(policyId) > 0 && policyType == Number(policyId))
		{
			policyStr = LanguageManager.getlocal("decreePolicyTxt") + ",";
			let policyCfg = Config.PolicyCfg.getPolicyById(policyId);
			if(Api.palaceVoApi.isInKingsHouse()){
				times += policyCfg.emAddTimes;
				extent += policyCfg.emAddExtent;
			}else{
				times += policyCfg.addTimes;
				extent += policyCfg.addExtent;
			}
			
			// strKey = "decreeAttrAddTxt2";
		}

		if(paperType == 6 || paperType == 7)
		{
			strKey = "decreeAttrAddTxt" + paperType;
		}
		
		let useTimes = Api.promoteVoApi.getGdinfo().effinfo[decdg.id] || 0;
		return {addTimes:times,addExtent:extent,strKey:strKey,lastTimes:times-useTimes};

	}

	/**
	 * type: 政令类型不同，作用的数据类型不同
	 * 1 日前X次 经营银两
	 * 2 日前X次 经营粮食
	 * 3 日前X次 经营士兵
	 * 4 日前X次 关卡+武力
	 * 5 日前X次 擂台+攻击力
	 * 6 日前X次 征伐+武力
	 * 7 日前X次宠信红颜，减少Y的元宝消耗
	 * 8 每日前X次商贸，智力提升Y
	 */
	public getDecreeAddAttrInfo(paperType:number|string)
	{
		let decreeId = this.getGdinfo().gdid;
		if(Number(decreeId) == 0 )
		{
			return null;
		}
		let times = 0;
		let extent = 0;
		let decdg = Config.PolicyCfg.getGovDecreeById(decreeId);
		if(paperType == decdg.type)
		{			
			if(this.ismore())
			{
				extent = decdg.leveeTimeEff1;
				times = decdg.addTimes1;
				if(! this.isKing())
				{
					times = decdg.addTimes2;
					extent = decdg.leveeTimeEff2;
				}
			}else{
				extent = decdg.addExtent1;
				times = decdg.addTimes1;
				if(! this.isKing())
				{
					times = decdg.addTimes2;
					extent = decdg.addExtent2;
				}
			}
		}
		return {addTimes:times,addExtent:extent};
	}
	/**
	 * 目前国策在不同的大功能下起作用
	 */
	public getPolicyAddAttrInfo()
	{
		let policyId = this.getSpid();
		let policyCfg = Config.PolicyCfg.getPolicyById(policyId);
		let times = 0;
		let extent = 0;
		if(Api.palaceVoApi.isInKingsHouse()){
			times = policyCfg.emAddTimes;
			extent = policyCfg.emAddExtent;
		}else{
			times = policyCfg.addTimes;
			extent = policyCfg.addExtent;
		}
		return {addTimes:times,addExtent:extent};
	}

	public getDecreePolicyAddAttrInfo(policyStr:string,decreeType:number)
	{
		let policyId = this.getSpid();
		let times = 0;
		let extent = 0;
		let strKey = "";
		let strKey2 = "";
		let useTimes = 0;
		let suTimes = 0;
		let duTimes = 0;
		if( policyStr && Number(policyId) > 0)
		{
			let policyCfg = Config.PolicyCfg.getPolicyById(policyId);
			if(policyStr == policyCfg.type2)
			{
				let attrInfo = this.getPolicyAddAttrInfo();
				suTimes = Api.promoteVoApi.getSinfo().effinfo[policyId];
				if(!suTimes)
					suTimes = 0;
				// if(suTimes < attrInfo.addTimes)
				{
					times += attrInfo.addTimes;
					extent += attrInfo.addExtent;
					strKey2 = LanguageManager.getlocal("decree_rescriptTxt1");
					if(PlatformManager.checkIsThSp())
					{
						 strKey2 = strKey2.replace(/\n/g,"");
					}
					//大臣加成
					let selfPos = this.getSelfPosition();
					if (selfPos > 0)
					{
						let promoCfg = Config.PromoteCfg.positionList[selfPos-1];
						if(promoCfg && promoCfg["effect1"]){
							if(Number(policyId) == 2)
							{
								times += promoCfg["effect" + policyId];
							}else{
								extent += promoCfg["effect" + policyId];
							}
						}
					}
				}
				// useTimes += suTimes;
			}
		}
		
		let decreeId = this.getGdinfo().gdid;
		strKey = "decreeAttrAddTxt0";
		if(Number(decreeId) > 0)
		{
			let decdg = Config.PolicyCfg.getGovDecreeById(decreeId);
			if(decreeType == decdg.type)
			{
				let attrInfo = this.getDecreeAddAttrInfo(decreeType);
				duTimes = Api.promoteVoApi.getGdinfo().effinfo[decreeId];
				if(!duTimes)
					duTimes = 0;
				// if(duTimes < attrInfo.addTimes){
					times += attrInfo.addTimes;
					extent += attrInfo.addExtent;
					// strKey = "decreeAttrAddTxt2";
					if(strKey2 != ""){
						if(PlatformManager.checkIsThSp())
						{
							let str = LanguageManager.getlocal("decree_rescriptTxt2");
							str = str.replace(/\n/g,"");
							strKey2 = strKey2  + "," + str;
						}
						else
						{
							strKey2 = strKey2  + "," + LanguageManager.getlocal("decree_rescriptTxt2");
						}
						
					}else{
						if(PlatformManager.checkIsThSp())
						{
							let str = LanguageManager.getlocal("decree_rescriptTxt2");
							str = str.replace(/\n/g,"");
							strKey2 = str;
						}
						else
						{
							strKey2 = LanguageManager.getlocal("decree_rescriptTxt2");
						}
						
					}
				// }
			}
		}
		useTimes = Math.max(suTimes,duTimes);
		// if( !policyStr || Number(policyId) == 0)
		// {

		// }else
		if(decreeType == 6 || decreeType == 7)
		{
			strKey = "decreeAttrAddTxt" + decreeType;
		}

		return {addTimes:times,addExtent:extent,strKey:strKey,strKey2:strKey2,lastTimes:times-useTimes};
	}

	public isShowRedForPolicyRead()
	{
		if(Number(this._promoteVo.spinfo.spid) != 0 && this._promoteVo.spinfo.isread != 1)
		{
			return true;
		}
		return  false
	}
	public isShowRedForDecreeRead()
	{
		if(Number(this._promoteVo.gdinfo.gdid) != 0 && this._promoteVo.gdinfo.isread != 1)
		{
			return true;
		}
		return  false
	}
	
	public ismore(){
		return this._promoteVo.gdinfo.ismore == 1 ;
	}
    public dispose():void{
		this._ishaveking = 0;
		super.dispose();
    }


}