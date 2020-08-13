/**
 * 皇宫api
 * author yanyuling
 * date 2017/11/01
 * @class PalaceVoApi
 */
class PalaceVoApi extends BaseVoApi
{
	private palaceVo:PalaceVo;
	public constructor() 
	{
		super();
	}

	public getRoleInfoByTitleId(id:string)
	{
		if(Number(id) == 3201){
			return this.palaceVo.palace[id];
		}
		else{
			return this.palaceVo.palace[id];
		}
	}
	public getRoleInfoList()
	{
		return this.palaceVo.palace;
	}
	public updateRoleSign(titleId:string,sign:string)
	{
		 this.palaceVo.palace[titleId].sign = sign;
	}
	/**
	 * 判断自己是否在宫殿之中
	 */
	public isInThePalace()
	{
		 for (var key in this.palaceVo.palace) {
			var element:PalaceRoleInfoVo = this.palaceVo.palace[key];
		    if(element.uid == Api.playerVoApi.getPlayerID() )
			{
				return key;
			}
		 }
		 return false;
	}

	public isInThePalaceByPalaceId(id:string|number):boolean
	{
		if (this.palaceVo && this.palaceVo.palace && this.palaceVo.palace[id]){
			let vo:PalaceRoleInfoVo = this.palaceVo.palace[id];
		    if(vo.uid && vo.uid == Api.playerVoApi.getPlayerID() )
			{
				return true;
			}
		}
		return false;
	}
	
	public checkNpcMessage():boolean
	{
		let boo:boolean =false;
		if(Api.titleupgradeVoApi.checkPalaceMessage())
		{
			boo=true;
		}
		else
		{
			boo=false;
		}

		//帝王成就
		if (!boo && Api.switchVoApi.checkTitleUpgrade() && Api.switchVoApi.checkOpenEmperorsAchievement() && Api.emperorAchieveVoApi.isShowKingAchieveRedDot()){
			boo = true;
		}
		
		//帝王霸业
		if (!boo && Api.switchVoApi.checkTitleUpgrade() && Api.titleupgradeVoApi.checkNpcMessage()){
			boo = true;
		}

		return Api.otherInfoVoApi.getOtherInfo().palace_flag == 0 || boo;
	}

	public isDataInit()
	{	
		return  (this.palaceVo && this.palaceVo.isInit);
	}
	/**宫殿是否有人 */
	public isHasMan(titleid: string[]) {

		let has: boolean = false;
		if (titleid) {
			for (let i = 0; i < titleid.length; i++) {
				if(Number(titleid[i]) == 3201){
					if(Api.promoteVoApi._ishaveking == 1){
						has = true;
						break;
					}
				}
				else{
					if (this.palaceVo.palace[titleid[i]] && this.palaceVo.palace[titleid[i]].uid && this.palaceVo.palace[titleid[i]].uid != 0) {
						has = true;
						break;
					}
				}
			}
		}

		return has;
	}
	/**
	 * 是否开启跨服职称
	 */
	public isCrossOpen()
	{
		return Api.switchVoApi.isCrossOpen();
	}
	public openMainView()
	{
		if (Api.switchVoApi.checkNewPalace()) {
			ViewController.getInstance().openView(ViewConst.COMMON.PALACENEWVIEW);
		} 
		else
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("palace_buildingNotOpen"));
		}
	}

	/**
	 *  是否显示特殊标示
	 */
	public isShowBuildingFlag(buildingId:string)
	{
		if(buildingId == "31")
		{
			return  Api.promoteVoApi._ishaveking == 1;
		}
		let buicfg = GameConfig.config.buildingCfg[buildingId];
		let title = buicfg.title;
		for (var key in title) {
			let rinfo = this.palaceVo.palace[title[key]];
			if (rinfo && rinfo.uid) {
				return true;
			}
		}
		return false;
	}
	//自己是否在金銮殿中
	public isInKingsHouse()
	{
		// let titleId = "3201"
		// let rinfo = this.palaceVo?this.palaceVo.palace[titleId]:null;
		// if (rinfo && rinfo.uid == Api.playerVoApi.getPlayerID()) {
		// 	return true;
		// }
		// return false;
		return Api.promoteVoApi.isKing();
	}

	public enterKingsHouse(tid:string="3201",buildingId:string="31")
	{
		if(Api.promoteVoApi.isKing() ){
			ViewController.getInstance().openView(ViewConst.COMMON.PALACEKINGSHOUSEGROUPVIEW,{titleId:tid,buildingId:buildingId});
		} else{
			ViewController.getInstance().openView(ViewConst.COMMON.PALACEHOUSEVIEW,{titleId:tid,buildingId:buildingId});
		}
	}
	
}