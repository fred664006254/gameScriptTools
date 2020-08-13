/**
 * author yanyuling
 */
class AcRansackTraitorVo extends AcBaseVo
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
		
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RANSACTARTIOR_REFRESH);

	}

	public isFineAll()
	{
		let allNum = this.config.RansackItemNum;
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