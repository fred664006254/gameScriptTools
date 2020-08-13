/**
 * 子嗣系统api
 * author dky
 * date 2017/10/28
 * @class AdultVoApi
 */
class AdultVoApi extends BaseVoApi
{
	private _adultVo:AdultVo;
	private _adultMarryVo:AdultMarryVo;
	public _marryList:any[];
	public _refuseData:any;
	private _sadunVo:SadunVo;
	// 子嗣扩展槽
	public posnum:number = 0;
	public param : any=null;
	public constructor() 
	{
		super();
	}



	public checkNpcMessage():boolean
	{	
		// let propNum:number = -1;

		// if (this._adultVo && this._adultVo.adultInfoVoObj)
		// {
		// 	for (let k in this._adultVo.adultInfoVoObj)
		// 	{
		// 		let info = this._adultVo.adultInfoVoObj[k];
		// 		if (info.visit == 0)
		// 		{
		// 			let itemUseCount = Api.adultVoApi.getVisitUseByQuality(info.aquality);
		// 			if (propNum == -1)
		// 			{
		// 				propNum = itemUseCount;
		// 			}
		// 			else if (propNum>itemUseCount)
		// 			{
		// 				propNum = itemUseCount;
		// 			}
		// 		}
		// 	}
		// }

		
		//this._adultVo.adultInfoVoObj;
		if((this._marryList&&this._marryList.length && this._marryList.length > 0 || (this.getVisitNum() > 0) || this.getReceiveData().length > 0)){
			// return LanguageManager.getlocal("adultTipMessage");
			return true;
		}
		return false;
	}

	/**
	 * 检测是否显示子嗣Npc
	 */
	public isShowNpc():boolean
	{
		if(this.getAdultNum()>0 || this.getAdultMarryNum()>0)
		{
			return true;
		}
		else{
			return false;
		}
	}

	public getLockedString():string
	{
		return LanguageManager.getlocal("reachConditionsUnlockDesc");
	}

	public formatData(data:any)
	{

		if(this._adultVo == null)
		{
			this._adultVo = new AdultVo();
		}

		if(this._adultMarryVo == null)
		{
			this._adultMarryVo = new AdultMarryVo();
		}

		if(this._sadunVo == null)
		{
			this._sadunVo = new SadunVo();
		}

		this._adultVo.initData(data.info)
		this._adultMarryVo.initData(data.minfo)
		this._marryList = data.marry;
		this._refuseData = data.refuse;
		super.formatData(data)
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULTFRESH);
	}

	public formatMinfo(data:any):void{
		if(this._adultMarryVo == null)
		{
			this._adultMarryVo = new AdultMarryVo();
		}
		this._adultMarryVo.initData(data.minfo);
	}
	// 获取子嗣扩展槽
	public getChildPosNum():number
	{
		let num:number = Api.childVoApi.getChildPosNum();
		return num;
	}
	// 获取成年子嗣数量
	public getAdultNum():number
	{
		let num:number = this.getAdultVoList().length;
		return num;
	}

	// 获取成年结婚子嗣数量
	public getAdultMarryNum():number
	{
		let num:number = this.getAdultMarryVoList().length;
		return num;
	}
	// 获取子嗣数组
	public getAdultVoList():Array<AdultInfoVo>
	{
		let arr:Array<AdultInfoVo> = new Array();
		if(!this._adultVo)
		{
			return arr;
		}
		let adultInfoVoObj = this._adultVo.adultInfoVoObj;
		for(let key in adultInfoVoObj)
		{
			arr.push(adultInfoVoObj[key]);
		}

		// todo对数组进行排序
		arr.sort((a:AdultInfoVo,b:AdultInfoVo)=>{
			
				if (a.aquality == b.aquality)
				{	
					return Number(b.attrVo.attTotal) - Number(a.attrVo.attTotal);
					// return Number(a.ts) - Number(b.ts);
				}else
				{
					return Number(b.aquality) -  Number(a.aquality) ;
				}
				// return 0;
			});

		return arr;
	}

		// 获取成亲子嗣数组
	public getAdultMarryVoList():Array<AdultMarryInfoVo>
	{
		let arr:Array<AdultMarryInfoVo> = new Array();
		if(!this._adultMarryVo)
		{
			return arr;
		}
		let adultInfoVoObj = this._adultMarryVo.adultInfoVoObj;
		for(let key in adultInfoVoObj)
		{
			arr.push(adultInfoVoObj[key]);
		}

		arr.sort((a:AdultMarryInfoVo,b:AdultMarryInfoVo)=>{
			
				return Number(b.mts) - Number(a.mts)  ;
				// return 0;
			});

		return arr;
	}

	/**
	 * 根据性别资质获取可以联姻的子嗣列表
	 * @param id 子嗣id
	 */
	public getAdultVoListById(quality:number,sex:number):Array<AdultInfoVo>
	{

		let arr = this.getAdultVoList()
		let arr2:Array<AdultInfoVo> = new Array();
		for (var index = 0; index < arr.length; index++) {
			var element = arr[index];
			if(element.aquality == quality && element.sex != sex && !this.getAdultIsInMarry(element.id) && this.notInVisit(element.id))
			{
				arr2.push(element)
			}
		}

		return arr2;
	}

	/**
	 * 根据性别资质获取可以联姻的子嗣列表/属性降序
	 * @param id 子嗣id
	 */
	public getAdultVoListByIdByAttr(quality:number,sex:number):Array<AdultInfoVo>
	{

		let arr = this.getAdultVoListById(quality,sex);
		arr.sort((a:AdultInfoVo,b:AdultInfoVo)=>{
			
				return Number(b.attrVo.attTotal) -  Number(a.attrVo.attTotal) ;
				// return 0;
			});

		return arr;
	}

	/**
	 * 根据子嗣id获取子嗣vo
	 * @param id 子嗣id
	 */
	public getAdultInfoVoById(id:string):AdultInfoVo
	{
		let adultInfoVoObj = this._adultVo?this._adultVo.adultInfoVoObj:null;
		if(adultInfoVoObj && adultInfoVoObj[id])
		{
			return adultInfoVoObj[id];
		}
		return null;
	}
	/**
	 * 根据子嗣id获取成亲子嗣vo
	 * @param id 子嗣id
	 */
	public getAdultMarryInfoVoById(id:string):AdultMarryInfoVo
	{
		let adultInfoVoObj = this._adultMarryVo?this._adultMarryVo.adultInfoVoObj:null;
		if(adultInfoVoObj && adultInfoVoObj[id])
		{
			return adultInfoVoObj[id];
		}
		return null;
	}
	/**
	 * 根据子嗣id获取子嗣列表位置
	 * @param id 子嗣id
	 */
	public getAdultIndexVoById(id:string):number
	{
		let adultVolist = this.getAdultVoList();

		for (var i = 0; i < adultVolist.length; i ++) {
			if(id == adultVolist[i].id ){
				return i
			}
		}
		return 0;
	}

	/**
	 * 根据子嗣id获取结婚子嗣列表位置
	 * @param id 子嗣id
	 */
	public getAdultMarryIndexVoById(id:string):number
	{
		let adultVolist = this.getAdultMarryVoList();

		for (var i = 0; i < adultVolist.length; i ++) {
			if(id == adultVolist[i].id ){
				return i
			}
		}
		return 0;
	}
	
		// 获取子嗣是否在提亲

	public getAdultIsInMarry(id):boolean
	{
		let adultInfoVo = this.getAdultInfoVoById(id);

		let lastTime = 0;
		if(adultInfoVo&&adultInfoVo.pro && adultInfoVo.pro[0] && adultInfoVo.pro[1] < 3){
			
			lastTime = adultInfoVo.pro[0] - GameData.serverTime;
		}

		if(lastTime > 0){
			return true;
		}else{
			return false;
		}
	
		
	}
	
	// 获取子嗣图片

	public getAdultPic(id):string
	{
		let adultInfoVo = this.getAdultInfoVoById(id);
		let childPic = "adult_boy";
		if(adultInfoVo.sex == 2){
			childPic = "adult_girl"
		}

		if(Api.switchVoApi.checkOpenAdultImage() && adultInfoVo.aquality != 7){
			childPic = `adult_${adultInfoVo.sex}_${adultInfoVo.aquality}`;
		}
	
		return childPic;
	}

	// 获取子嗣图片

	public getAdultHalfPic(sex,aquality):string
	{
		let childPic = "child_state_3_1";
		if(sex == 2){
			childPic = "child_state_3_2"
		}

		if(Api.switchVoApi.checkOpenAdultImage() && aquality != 7){
			childPic = `child_state_3_${sex}_${aquality}`;
		}
	
		return childPic;
	}
	// 获取子嗣说的话
	public getAdultWord(id):string
	{
		let childInfoVo = this.getAdultInfoVoById(id);
		let childCfg = GameConfig.config.childCfg[childInfoVo.quality.toString()];
		//刷新等级
		let childState =  childInfoVo.level / childCfg.lv
		let childWords = "";
		let wordIndex = 1 ;
        

		if(childState < 0.4){
			wordIndex = App.MathUtil.getRandom(1,3);
			childWords = LanguageManager.getlocal("child_words1_" + wordIndex);
		}
		else if(childState >= 0.4 || childState < 1){
			wordIndex = App.MathUtil.getRandom(1,5);
			childWords = LanguageManager.getlocal("child_words2_" + wordIndex);
		}else{
			
		}
		return childWords;
	}

	//判断某玩家是否已经正在拜访
	public isUidInVisit(uid):boolean{
		if(this._sadunVo.info && this._sadunVo.info[uid]){
			return this._sadunVo.info[uid].visiting != '';
		}
		else{
			return false;
		}
		
	}

	//判断某子嗣是否已在拜访中 或者已拜访过
	public isChildCanVisit(childid){
		if(this.getAdultIsInMarry(childid)){
			return false;
		}
		let flag1 = this.isVisited(childid);
		let flag2 = this.notInVisit(childid)
		if(!flag1 && flag2){
			return true;
		}
		else{
			return false;
		}
	}

	/**
	 * 获取某子嗣拜访所需要的礼物数目
	 */
	public getVisitUseByQuality(quality):number
	{
		let cfg = Config.SadunCfg;
		return cfg.visitNeedGift[quality - 1];
	}

	/**
	 * 判断是否是亲家
	 */
	public judgeIsSudan(uid):boolean{
		let flag = false;//
		if(this._sadunVo.info){
			if(this._sadunVo.info[uid] && this._sadunVo.info[uid].times >= Config.SadunCfg.needNum){
				flag = true;
			}
		}
		return flag;
	}

	public getLyinnum(uid):number{
		let num = 0;
		if(this._sadunVo.info && this._sadunVo.info[uid]){
			num = this._sadunVo.info[uid].times;
		}
		return num;
	}

	public getFreiendNums(uid):any{
		let quality = 1;
		let percent = 0;
		let friendnums = 0;
		if(this._sadunVo.info && this._sadunVo.info[uid]){
			friendnums = this._sadunVo.info[uid].friend;
			for(var i in Config.SadunCfg.friendlinessList){
				let unit = Config.SadunCfg.friendlinessList[i];
				if(friendnums < unit.needFriendliness){
					quality = Number(i) - 1;
					percent = friendnums / unit.needFriendliness;
					break;
				}
			}
			if(friendnums >= 5000){
				quality = 5;
				percent = 1;
			}
		}
		return {
			num : friendnums,
			quality : quality,
			percent : percent
		}
	}
	//好友中用到的,
	public getFreiendNums2(friendnums:number):any{
		let quality = 1;
		let percent = 0;
		for(let i in Config.SadunCfg.friendlinessList){
			let unit = Config.SadunCfg.friendlinessList[i];
			if(friendnums < unit.needFriendliness){
				quality = Number(i) - 1;
				percent = friendnums / unit.needFriendliness;
				break;
			}
		}
		if(friendnums >= 5000){
			quality = 5;
			percent = 1;
		}
		return {
			num : friendnums,
			quality : quality,
			percent : percent
		}
	}

	//获取访等级 0 无访问 1拜访过 2来访问过 3互访过
	public getVisitLevel(childInfo):number{
		let flag1 = 0;
		let flag2 = 0;
		let flag3 = 0;

		let info = this.getAdultVoList();
		let uid = childInfo.uid;
		for(let i in info){
			if(info[i] && info[i].visit == uid){
				flag1 = 1;
				break
			}
		}	

		if(childInfo.visit && childInfo.visit == Api.playerVoApi.getPlayerID()){
			flag2 = 1;
		}	

		if(flag1 && flag2){
			return 3;
		}
		else if(flag1){
			return 1;
		}
		else if(flag2){
			return 2;
		}
		//return flag1 + flag2;
	}
	
	public getVisitNum():number{
		if(this._sadunVo.receive){
			return Object.keys(this._sadunVo.receive).length;
		}
		else{
			return 0;
		}
	}

	public getALlMarryPlayerInfo():any{
		let arr1 = [];
		let arr2 = [];
		if(this._sadunVo.info){
			for(let i in this._sadunVo.info){
				let unit = this._sadunVo.info[i];
				if(unit.times >= Config.SadunCfg.needNum){
					arr1.push(unit);
				}
				else{
					arr2.push(unit);
				}
			}
		}
		return {
			sadun : arr1,
			notsadun : arr2
		};
	}

	public judgeWifeIsInReceive(wifeid):boolean{
		if(this._sadunVo.wife && this._sadunVo.wife[wifeid]){
			return this._sadunVo.wife[wifeid] ? true : false;
		}
		else{
			return false;
		}
	}

	public init_sadun_data(data):void{
		if(data && Object.keys(data).length ){
			if(this._sadunVo == null)
			{
				this._sadunVo = new SadunVo();
			}
			this._sadunVo.initData(data);
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_SUDANFRESH);
		}
	}

	public getQinjiaInfo():any{
		return this._sadunVo.info;
	}

	public notInVisit(cid):boolean{
		let adultInfoVo : any = this.getAdultInfoVoById(cid);
		let flag = true;
		if(adultInfoVo.pro && adultInfoVo.pro[1] == 3 && adultInfoVo.pro[0]){
			let lastTime =  GameData.serverTime - adultInfoVo.pro[0] ;
			if(lastTime < 0){
				flag = false;
			}
		}
		return flag;
	}

	public isVisited(cid):boolean{
		let adultInfoVo : any = this.getAdultInfoVoById(cid);
		let visited = false;
		if(adultInfoVo.visit){
			visited = true;
		}
		return visited;
	}

	public getChildVisitTarget(cid):any{
		if(this._sadunVo.info){
			for(let i in this._sadunVo.info){
				let unit = this._sadunVo.info[i];
				if(unit.visiting == cid){
					return i;
				}
			}
		}
		return null;
	}

	private _visitid : any;
	public setVisitId(uid):void{
		this._visitid = uid;
	}

	public getVisitId(){
		return this._visitid;
	}

	public getSadunInfoByUid(uid):any{
		if(this._sadunVo.info && this._sadunVo.info[uid]){
			return this._sadunVo.info[uid];
		}else{
			return {name : ''}
		}
		
	}

	public getVisitRequestList():any[]{
		if(this._sadunVo.receive){
			return this._sadunVo.receive;
		}else{
			return [];
		}
		
	}

	public isUidVisited(uid):boolean{
		let arr1 = this.getAdultVoList();
		for(let i in arr1){
			let unit = arr1[i];
			if(unit.visit && unit.visit == uid){
				return true;
			}
		}
		return false;
	}  

	public getReceiveData(){
		let arr = [];
		if(this._sadunVo.visited){
			for(let i in this._sadunVo.visited){
				let unit = this._sadunVo.visited[i]; 
				arr.push({
					visitwife : unit.visitwife,
					oldattr : unit.oldattr,
					childid : i,
					nowattr : unit.nowattr,
					cname : unit.cname
				});
			}
		}
		return arr;
	}

	public clearReceiveData(){
		if(this._sadunVo.visited){
			this._sadunVo.visited = {};
		}
	}

	private _receiveInfo : any = null;
	public setReceiveWifeInfo(info){
		this._receiveInfo = null;
		this._receiveInfo = info;
	}

	public getReceiveWifeInfo(){
		return this._receiveInfo;
	}

	private _getvisitInfo : any = null;
	public setVisitInfo(info){
		this._getvisitInfo = null;
		this._getvisitInfo = info;
	}

	//是否来访
	public isLaifang(uid){
		if(this._getvisitInfo){
			return typeof this._getvisitInfo[uid] != 'undefined' && this._getvisitInfo[uid] == 1;
		}
		return false;
	}

	public getSadunRefuse():string{
		if(this._sadunVo.refuse){
			return this._sadunVo.refuse;
		}
		else{
			return '';
		}
	}

	public clearSadunRefuse():void{
		if(this._sadunVo.refuse){
			this._sadunVo.refuse = '';
		}
	}

	public isSadunCanVisit(uid?,propNum?:number){

		if (propNum == -1)
		{
			return false;
		}

		if(Api.switchVoApi.checkopenSadun()){
			let adultvolist = Api.adultVoApi.getAdultVoList();
			if(this._sadunVo.info && adultvolist.length > 0){
				for(let i in this._sadunVo.info){
					let flag = false;
					if(uid){
						flag = this.isChildCanVisit(uid);
					}
					else{
						for(let j in adultvolist){
							if(this.isChildCanVisit(adultvolist[j].id)){
								flag = true;
								break;
							}
						}
					}
					if(this._sadunVo.info[i].times >= Config.SadunCfg.needNum && this._sadunVo.info[i].visiting == '' && flag && Api.itemVoApi.getItemNumInfoVoById("1411")>=propNum){
						return true;
					}
				}
			}
		}
		return false;
	}

	public isCanSendVisit(){
		let cfg = Config.SadunCfg;
		let info = this.getAdultVoList();
		let count = 0;
		for(let i in info){
			let unit = info[i];
			if(unit.pro && unit.pro[1] == 3){
				++ count;
			}
		}	
		return count < cfg.maxReception;
	}

	public dispose():void
	{
		this._adultVo = null;
		this.posnum = 0;
		this._marryList = null;
		this._refuseData = null;
		this.param = null;
		super.dispose();
	}
}