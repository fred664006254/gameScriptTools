/**
 * author jiangliuyang
 */
class AcStargazerSingleVo extends AcBaseVo
{

	public v:number;//"搜查奸臣 玩家充值元宝数",
	public tennum:number;//" "搜查奸臣 玩家十连次数",
	public attacknum:number;//""搜查奸臣 玩家剩余可搜索次数",
	public singlenum:number;//""搜查奸臣 玩家单抽次数",
	public singlechipnum:number;//""搜查奸臣 玩家单抽获得证物数",
	public chipnum:number;//"搜查奸臣 得到证物数",

	public constructor() 
	{
		super();
	}
	public initData(data:any):void
	{
	    super.initData(data);
		this.v = data.v;
		this.tennum = data.tennum;
		this.attacknum = data.attacknum;
		this.singlenum = data.singlenum;
		this.singlechipnum = data.singlechipnum;
		this.chipnum = data.chipnum;
		
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_STARGAZERSINGLEVO_REFRESH);

	}

	public isFineAll()
	{
		let allNum = this.config.RansackItemNum;
        let itemNum:number = this.getItemNumByIndex(this.config.RansackItemID);
		return this.chipnum >= allNum ;
	}

	public get isShowRedDot(): boolean
	{
		if(this.isExchangeEnable()){
			return true;
		}
		if(this.attacknum > 0 && !this.isFineAll()){
			return true;
		}
		return false;
	}
    // public checkSearchAll(){
	// 	let shopCfgList:any[] = this.config.exchangeShop;
	// 	//默认
	// 	// let isSearch = false;

	// 	for(let i = 0;i < shopCfgList.length; i++){
	// 		let itemNum:number = this.getItemNumByIndex(shopCfgList[i]["itemID"]);
	// 		let proofNum:number = shopCfgList[i]["proofNum"];
	// 		let skinID:number = shopCfgList[i]["skinID"];
	// 		if(!Api.servantVoApi.isOwnSkinOfSkinId(String(skinID))){
	// 			if(itemNum < proofNum ){
	// 				return false;
	// 			} 
	// 		}

	// 	}
	// 	return true;

	// }
    public getItemNumByIndex(itemId:string):number
	{
		
		
		let itemNum = Api.itemVoApi.getItemNumInfoVoById(itemId);
		return itemNum;

	}
	public isExchangeEnable()
	{
		return this.isFineAll() && !Api.servantVoApi.isOwnSkinOfSkinId(this.config.getRewardSkinId());
	}
	public dispose():void
	{
		this.v = 0;
		this.tennum = 0;
		this.attacknum = 0;
		this.singlenum = 0;
		this.singlechipnum = 0;
		this.chipnum = 0;
        super.dispose();
	}
}