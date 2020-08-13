/**
 * 红颜系统api
 * author dmj
 * date 2017/9/22
 * @class WifeVoApi
 */
class WifeVoApi extends BaseVoApi
{
	private wifeVo:WifeVo;
	private waitShowWife:any;
	public constructor() 
	{
		super();
	}


	public checkNpcMessage():boolean
	{
		if(this.getEnergyNum() > 0||Api.wifestatusVoApi.getIsConfer()){
			// return LanguageManager.getlocal("wifeTipMessage");
			return true;
		}
		return false;
	}

	public setWaitShowWife(data:any)
	{
		this.waitShowWife = data;
	}
	public getWaitShowWife()
	{
		let wafe = this.waitShowWife
		this.waitShowWife = null;
		return wafe;
	}

	// 
	public getWifes():Array<string>
	{
		let obj:Object = this.wifeVo.wifeInfoVoObj;
		return Object.keys(obj)
	}
	// 获取妻子数量
	public getWifeNum():number
	{
		let obj:Object = this.wifeVo.wifeInfoVoObj;
		return Object.keys(obj).length
	}
	// 获取孩子数量
	public getChildrenNum():number
	{
		let num = 0;
		for (var key in this.wifeVo.wifeInfoVoObj) {
			num  += this.wifeVo.wifeInfoVoObj[key].child;
		}
		return num;
	}
	/**获取红颜列表 */
	public getWifeInfoVoList():Array<WifeInfoVo>
	{
		let arr:Array<WifeInfoVo> = new Array();
		let wifeInfoVoObj:Object = this.wifeVo.wifeInfoVoObj;
		for(let key in wifeInfoVoObj)
		{
			arr.push(wifeInfoVoObj[key]);
		}
		return arr;
	}

	/**
	 * 获取未解锁红颜列表
	 */
	public getUnlockWifeInfoVoList():Array<Config.WifeItemCfg>
	{
		let arr:Array<Config.WifeItemCfg> = new Array();
		let wifeListCfg = Config.WifeCfg.getWifeCfgList();
		// let vipBoo = Api.switchVoApi.checkVip1Privilege();
		
		for(let key in wifeListCfg)
		{
			if(this.getWifeInfoVoById(Number(key)) == null)
			{	
				var curr_wifeItemCfg=wifeListCfg[key];

				if(curr_wifeItemCfg.unlock&&curr_wifeItemCfg.unlock["needVip"])
				{
					 let needVip:number =curr_wifeItemCfg.unlock["needVip"];
					 let openVipNum:number =Api.vipVoApi.getMaxbtnNum();

					 if(openVipNum>=needVip)
					 {
						 arr.push(curr_wifeItemCfg);
					 }
				} 
				else
				{
					arr.push(curr_wifeItemCfg);
				}
				
			}
			
		}
		
		arr.sort((a:Config.WifeItemCfg,b:Config.WifeItemCfg)=>{
			
				return  a.sortId -  b.sortId;
			});
		return arr;
	}

	/**
	 * 检测是否显示子嗣Npc
	 */
	public isShowNpc():boolean
	{
		// return Api.playerVoApi.getPlayerLevel()>=Config.WifebaseCfg.unlockLv;
		if(this.getWifeNum()<=0)
		{
			return false;
		}
		return true;
	}

	/**
	 * 检测是否有有骨骼
	 */
	public isHaveBone(boneName:string):boolean
	{
		//部分骨骼韩国不用
		if(PlatformManager.checkIsKRSp()){
			let krBones = {
				"wife_full_101_ske":1,
				"wife_full2_101_ske":1,
				"wife_full3_1011_ske":1
			}
			if(!krBones[boneName]){
				return false;
			}
		}
		//部分骨骼只给韩国加速版用

		if(!PlatformManager.checkIsKRNewSp()){
			let krBones = {
				"wife_full2_310_ske":1,
				"wife_full_310_ske":1,
			}
			if(krBones[boneName]){
				return false;
			}
		}

		if(RES.hasRes(boneName)&&App.DeviceUtil.CheckWebglRenderMode()&&!Api.switchVoApi.checkCloseBone()){
			let skinId = boneName.split("_")[2];
			if(Config.WifeCfg.getWifeCfgById(skinId) && Api.switchVoApi.checkWifeBone(skinId)){
				return false;
			}
			return true;
		}
		return false;
	}
	/**
	 * 根据红颜id获取红颜vo
	 * @param id 红颜id
	 */
	public getWifeInfoVoById(id:number|string):WifeInfoVo
	{
		let wifeInfoVoObj = this.wifeVo.wifeInfoVoObj;
		if(wifeInfoVoObj && wifeInfoVoObj[id.toString()])
		{
			return wifeInfoVoObj[id.toString()];
		}
		return null;
	}

	/**
	 * 根据红颜id获取红颜列表位置
	 * @param id 红颜id
	 */
	public getWifeIndexVoById(id:number):number
	{
		let wifeVolist = this.getWifeInfoVoList();

		for (var i = 0; i < wifeVolist.length; i ++) {
			if(id == wifeVolist[i].id ){
				return i
			}
		}
		return 0;
	}
	/**获取剩余精力次数 */
	public getEnergyNum():number
	{	
		let num:number = this.wifeVo.energy_num;
		let maxNum = this.getEnergyMaxNum();
		let serverTime = GameData.serverTime;
		let needTime = GameConfig.config.wifebaseCfg.needTime;
		if(num >= maxNum)
		{
			num = maxNum;
		}
		else
		{
			let count = Math.floor((serverTime - this.wifeVo.energy_st)/needTime);
			if((num + count) >= maxNum)
			{
				num = maxNum;
			}
			else
			{
				num += count;
			}
		}
		return num;
	}
	/**获取精力最大次数 */
	public getEnergyMaxNum():number
	{
		let num:number = GameConfig.config.vipCfg[Api.playerVoApi.getPlayerVipLevel()].maxEnergy;
		return num;
	}

	/**获取恢复精力倒计时 */
	public getRecoverEnergyTime():number
	{
		let time:number = 0;
		let needTime = GameConfig.config.wifebaseCfg.needTime;
		let st:number = this.wifeVo.energy_st;
		if((st + needTime) > GameData.serverTime)
		{
			time = st + needTime - GameData.serverTime;
		}
		return time;
	}

	/**
	 * 宠幸消耗的元宝公式（跟亲密度相关）
	 * 亲密度 * 10 最大值为1000元宝
	 * @param intimacy 亲密度
	 */
	public getLoveNeedGem(intimacy:number):number
	{
		let needGem:number = intimacy * 10
		if (needGem > 1000){
			needGem = 1000
		}
		return needGem
	}

	/**
	 * 获取红颜赏赐红点

	 */
	public getGiveRed():boolean
	{
		let cfg = Config.WifebaseCfg.wifeGift;
		for (var index = 1; index < 5; index++) {
			let key = index.toString();
			let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(Number(cfg[key].item));
			if(hasNum > 0 ){
				return true;
			}
		}
		return false;
	}
	/**
	 * 获取红颜技能红点

	 */
	public getSkillRed(wifeId):boolean
	{	
		let wifeVo = Api.wifeVoApi.getWifeInfoVoById(wifeId);
		let list = wifeVo.cfg.wifeSkill;
		for (var index = 0; index < list.length; index++) {
			var element = list[index];
			if(element.condition <= wifeVo.intimacy){
				//解锁了

				let needExp = Config.WifebaseCfg["wifeSkill" + (index + 1)][wifeVo.skill[index]-1];
				let hasNum:number = wifeVo.exp;
				if(needExp <= hasNum)
				{
					return true;
				}

			}
			
		}
		return false;
	}

	public getWifeIcon(wifeId:string):string
	{
		let wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
		let icon = wifeCfg.icon;
		if(Api.wifeSkinVoApi.isHaveSkin(wifeId))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeId);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				icon = skinCfg.icon;
			}
		}
		return icon;
	}

	public getWifeIsBlue(wifeId:string|number):boolean
	{
		let wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
		return wifeCfg.isBule();
	}
	public getLockedString():string
	{
		return LanguageManager.getlocal("reachLvelUnlockDesc",[Api.playerVoApi.getPlayerOfficeByLevel(Config.WifebaseCfg.unlockLv)]);
	}
	/** 得到亲密度最高的红颜id */
	public getIdOfIntimacyMax():string
	{
		var maxIntimacy = null;
		var maxId = null;
		for(var key in this.wifeVo.wifeInfoVoObj) {
			if (this.wifeVo.wifeInfoVoObj.hasOwnProperty(key)) {
				var element = this.wifeVo.wifeInfoVoObj[key];
				if (!maxIntimacy || maxIntimacy < element.intimacy || (maxIntimacy === element.intimacy && parseInt(maxId) > parseInt(key))) {
					maxIntimacy = element.intimacy;
					maxId = key;
				}
			}
		}
		return maxId;
	}
	public checkOpenHexieTuoyi():boolean
	{
		if(Api.switchVoApi.checkOpenSettingWife()&&GameData.wifeSwitch)
		{
			return true;
		}
		return  false;
	}
		/**
	 * 检测奖励是否包含门客，且发生门客转换
	 * cfgRewards://原本应该获取的奖励
	 * realRewards:实际获得的奖励，如果发生了转换，则和cfgRewards不一致，否则一致
	 */
	public checkWifeChangeRewards(cfgRewards:string,realRewards:string,otherrewards?:string)
	{
		if(!cfgRewards || cfgRewards == realRewards)
		{
			ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":realRewards,"otherRewards":otherrewards,"isPlayAni":true});
			return;
		}
		let rewardItemvo:RewardItemVo[] = GameData.formatRewardItem(cfgRewards);
		for (var index = 0; index < rewardItemvo.length; index++) {
			var element = rewardItemvo[index];
			if(element.type == 10){
				let wifecfg = Config.WifeCfg.getWifeCfgById(element.id);
				if(wifecfg.exchange){
					ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD,{"name":wifecfg.name,"touch":wifecfg.exchange,"message":"changeOtherRewardTip","callback":()=>{
						ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":realRewards,"otherRewards":otherrewards,"isPlayAni":true});
					},"handler":this});
					break;
				}
			}
		}
	}
	
	//检测红颜是否可以性转
	checkWifeCanChangeSex(wifeId: string): boolean{
		let wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
		if(wifeCfg.isBlueFunction){
			return true;
		}
		return false;
	}
}