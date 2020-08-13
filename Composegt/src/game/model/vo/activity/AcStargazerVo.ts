/**
 * author yanyuling
 */
class AcStargazerVo extends AcBaseVo
{
	//"搜查奸臣 玩家充值元宝数",
	public v:number;
	//ackinfo = {init={"1606"：xx} 继承初始化罪证个数,info={} 当前罪证信息}  
	public ackinfo:any;
	//已抽总次数
	public anum:number;
	//可抽次数
	public cannum:number;
	//是否展示标记
	public showflag:number;

	
	
	
	
	
	// public tennum:number;//" "搜查奸臣 玩家十连次数",
	// public attacknum:number;//""搜查奸臣 玩家剩余可搜索次数",
	// public singlenum:number;//""搜查奸臣 玩家单抽次数",
	// public singlechipnum:number;//""搜查奸臣 玩家单抽获得证物数",
	// public chipnum:number;//"搜查奸臣 得到证物数",


	public constructor() 
	{
		super();
	}
	public initData(data:any):void
	{
	    super.initData(data);
		this.v = data.v;
		this.ackinfo = data.ackinfo;
		this.anum = data.anum;
		this.cannum = data.cannum;
		this.showflag = data.showflag;

		// this.tennum = data.tennum;
		// this.attacknum = data.attacknum;
		// this.singlenum = data.singlenum;
		// this.singlechipnum = data.singlechipnum;
		// this.chipnum = data.chipnum;
		
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_STARGAZER_REFRESH);

	}

	public isFineAllByIndex(index:number)
	{
		let allNum = this.config.RansackItemNum;
		let itemList:any[] = this.config.RansackItemID;

		// for(let i = 0;i < itemList.length;i++){
			if(this.getItemNumByIndex(itemList[index]) < allNum){
				return false;
			}
			return true;
		// }
		// return true;
		// return this.chipnum >= allNum ;
	}
	public isFineAll()
	{
		let allNum = this.config.RansackItemNum;
		let itemList:any[] = this.config.RansackItemID;

		for(let i = 0;i < itemList.length;i++){
			if(this.getItemNumByIndex(itemList[i]) < allNum){
				return false;
			}
			
		}
		return true;
		// return this.chipnum >= allNum ;
	}
	public get isShowRedDot(): boolean
	{
		// if(!this.checkSearchAll()){
		// 	return true;
		// } 
		if(this.isExchangeEnable()){
			return true;
		}
		if(this.cannum > 0 && !this.checkSearchAll()){
			return true;
		}
		// 		if(this.cannum > 0 && !this.isFineAll()){
		// 	return true;
		// }
		return false;
	}
	public get isShowIcon():boolean
	{
		return this.showflag > 0;
		// return true;
	}

	public getItemNumByIndex(itemId:string):number
	{
		
		
		let itemNum = Api.itemVoApi.getItemNumInfoVoById(itemId);
		return itemNum;

	}


	//检测是否可以兑换
	public checkCanExchangeByIndex(index:number):boolean
	{
		let shopCfgList:any[] = this.config.exchangeShop;

		let itemNum:number = this.getItemNumByIndex(shopCfgList[index]["itemID"]);
		let proofNum:number = shopCfgList[index]["proofNum"];
		let skinID:number = shopCfgList[index]["skinID"];
		if(itemNum >= proofNum && !Api.servantVoApi.isOwnSkinOfSkinId(String(skinID))){
			return true
		}
		return false;
	}
	//获得最近的可兑换Index 如果没有，按顺序
	public canExchangeIndex()
	{
		let shopCfgList:any[] = this.config.exchangeShop;
		//默认
		let normalIndex = -1;

		for(let i = 0;i < shopCfgList.length; i++){
			let itemNum:number = this.getItemNumByIndex(shopCfgList[i]["itemID"]);
			let proofNum:number = shopCfgList[i]["proofNum"];
			let skinID:number = shopCfgList[i]["skinID"];
			if(itemNum >= proofNum && !Api.servantVoApi.isOwnSkinOfSkinId(String(skinID))){
				return i;
			} else if(itemNum < proofNum && !Api.servantVoApi.isOwnSkinOfSkinId(String(skinID))){
				if(normalIndex == -1){
					normalIndex = i;
				}
			}
		}
		if(normalIndex == -1){
			return 0;
		} else {
			return normalIndex;
		}
	}
	//搜索出所有的 没有这个皮肤的道具 
	public checkSearchAll(){
		let shopCfgList:any[] = this.config.exchangeShop;
		//默认
		// let isSearch = false;

		for(let i = 0;i < shopCfgList.length; i++){
			let itemNum:number = this.getItemNumByIndex(shopCfgList[i]["itemID"]);
			let proofNum:number = shopCfgList[i]["proofNum"];
			let skinID:number = shopCfgList[i]["skinID"];
			if(!Api.servantVoApi.isOwnSkinOfSkinId(String(skinID))){
				if(itemNum < proofNum ){
					return false;
				} 
			}

		}
		return true;

	}

	public isExchangeEnable()
	{

		let shopCfgList:any[] = this.config.exchangeShop;
		for(let i = 0; i < shopCfgList.length; i++){
			let itemNum:number = this.getItemNumByIndex(shopCfgList[i]["itemID"]);
			let proofNum:number = shopCfgList[i]["proofNum"];
			let skinID:number = shopCfgList[i]["skinID"];
			if(itemNum >= proofNum && !Api.servantVoApi.isOwnSkinOfSkinId(String(skinID))){
				return true
			}

		}
		return false;


	}
	public dispose():void
	{
		this.v = 0;

		this.ackinfo = null;
	
		this.anum = 0;
	
		this.cannum = 0;
	
		this.showflag = 0;
        super.dispose();
	}
}