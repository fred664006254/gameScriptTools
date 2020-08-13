/**
 * 皮肤vo
 * author yanyuling
 * date 2018/08/13
 * @class SkinVo
 */
class SkinVoApi extends BaseVoApi
{
	private skinVo:SkinVo;
	public constructor() 
	{
		super();
	}

	public checkServantExchange():boolean{
		let flag = false;
		if(Api.switchVoApi.checkOpenExchangeSkin()){
			if(Api.switchVoApi.checkOpenServantSkin()){
				let list = Config.ServantskinCfg.getServantSkinList();
				for (var index = 0; index < list.length; index++) {
					let tmp = list[index];
					let id = tmp.id;
					if(typeof tmp.displayTime != `undefined` && this.getShowTime() >= tmp.displayTime){
						if(Api.servantVoApi.getServantObj(tmp.servantId) ){//&& !Api.servantVoApi.isOwnSkinOfSkinId(id)
							let exchange = tmp.exchangeItem ;
							let itemvo = GameData.formatRewardItem(exchange);
							let needNum = itemvo[0].num;
							let have = Api.itemVoApi.getItemNumInfoVoById(itemvo[0].id);

							if(tmp.canExchangeItem() && have >= needNum){
								flag = true;
								break;
							}
						}
					}
				}
			}
		}
		return flag;
	}

	public checkWifeExchange():boolean{
		let flag = false;
		if(Api.switchVoApi.checkOpenExchangeSkin()){
			if(!Api.switchVoApi.checkCloseWifeskin()){
				let list = Config.WifeskinCfg.getWifeCfgList();
				for (var index = 0; index < list.length; index++) {
					let tmp = list[index];
					let id = tmp.id;
					if(typeof tmp.displayTime != `undefined` && this.getShowTime() >= tmp.displayTime){
						if(Api.wifeVoApi.getWifeInfoVoById(tmp.wifeId) && !Api.wifeSkinVoApi.isOwnSkinOfSkinId(id)){
							let exchange = tmp.claim ;
							let itemvo = GameData.formatRewardItem(exchange);
							let needNum = itemvo[0].num;
							let have = Api.itemVoApi.getItemNumInfoVoById(itemvo[0].id);
							if(have >= needNum){
								flag = true;
								break;
							}
						}
					}	
				}
			}
		}
		return flag;
	}

	public checkNpcMessage():boolean
	{
		let flag = false;
		if(Api.switchVoApi.checkOpenExchangeSkin()){
			flag =  this.checkWifeExchange();//this.checkServantExchange() ||
		}
		return flag;
	}

	public checkNpcMessage2():boolean
	{
		let flag = false;
		if(Api.switchVoApi.checkOpenExchangeSkin()){
			flag =  this.checkServantExchange() || this.checkWifeExchange();
		}
		return flag;
	}

	public isShowNpc():boolean
	{
		if(Api.switchVoApi.openCrossChat())
			return true;
		else
		{
			return false;
		}
	}

	public getServantSkinFirstInfo(skinId:string)
	{
		if(!this.skinVo || !this.skinVo.sinfo || !this.skinVo.sinfo[skinId])
		{
			return null;
		}
		return this.skinVo.sinfo[skinId];
	}

	public getWifeSkinFirstInfo(skinId:string)
	{
		if(!this.skinVo || !this.skinVo.winfo || !this.skinVo.winfo[skinId])
		{
			return null;
		}
		return this.skinVo.winfo[skinId];
	}
	//开服时间至今多少天
	public getShowTime():number
	{
		return Api.otherInfoVoApi.getServerOpenDay();
	}

	public dispose():void
	{
		super.dispose();
	}
}