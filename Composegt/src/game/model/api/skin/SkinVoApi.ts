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

             
	public checkNpcMessage():boolean
	{
		return false;
	}

	public isShowNpc():boolean
	{
		// return true;
		return Api.switchVoApi.checkOpenSkinBuilding();
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

	public dispose():void
	{
		super.dispose();
	}
}