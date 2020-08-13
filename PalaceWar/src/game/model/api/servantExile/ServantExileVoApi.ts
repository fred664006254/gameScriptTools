/**
 * 门客出海系统api
 * author 张朝阳
 * date 2019/2/22
 * @class ServantExileVoApi
 */
class ServantExileVoApi extends BaseVoApi {

	/**
	 * "3":{
			"servantId":"1007",
			"st":1595815367,
			"freeEndTime":1595901767,
			"et":1604455367,
			"buffSid":"1001"
		}
	*/

	private info = null;
	/**席位 */
	private pos_num: number = 0;
	public constructor() {
		super();
	}

	public formatData(data: any): void {
		this.info = data.info;
		this.pos_num = data.pos_num;
	}
	/**获得席位的个数 */
	public getSeatNumber(): number {
		return this.pos_num;
	}

	public getSeatNumber2(): number {
		return this.pos_num + this.getCardSeatNumber();
	}

	public getCardSeatNumber(): number {
		let num = 0;
		for (let key in this.info) {
			if (this.info[key].lastet && this.info[key].lastet > GameData.serverTime ) {
				num++;
			}
		}
		return num;
	}

	public getCardSeatIndex(idx:number): number {
		let num = this.getActNumber();
		for (let key in this.info) {
			if (this.info[key].lastet && this.info[key].lastet > GameData.serverTime ) {
				num++;
				if (this.pos_num+num == idx)
				{
					return Number(key);
				}
			}
		}
		return null;
	}

	public getTotalSeatNumber(): number {
		let num = this.pos_num;
		let list:AcBaseVo[] = Api.acVoApi.getActivityVoListByAid(AcConst.AID_BATTLEPASS);
        list.sort((a,b)=>{
            return a.et - b.et;
        });
        for(let i in list){
            let vo = <AcBattlePassVo>list[i];
            if(vo && vo.isInActivity() && vo.getServantBanPos()){
                num += vo.getServantBanPos();
            }
		}

		for (let key in this.info) {
			if (this.info[key].lastet && this.info[key].lastet > GameData.serverTime ) {
				num++;
			}
		}

		return num;
	}

	public getActNumber(): number 
	{
		let num = 0;

		let list:AcBaseVo[] = Api.acVoApi.getActivityVoListByAid(AcConst.AID_BATTLEPASS);
        list.sort((a,b)=>{
            return a.et - b.et;
        });
        for(let i in list){
            let vo = <AcBattlePassVo>list[i];
            if(vo && vo.isInActivity() && vo.getServantBanPos()){
                num += vo.getServantBanPos();
            }
		}

		return num;
	}

	/**正在使用的席位数量 */
	public getUseSeatNumber(): number {

		let num = 0;
		for (let key in this.info) {
			if (this.info[key] && this.info[key].servantId) {
				num++;
			}
		}
		return num;
	}

	public getServantsExiled():string[]
	{	
		let sids:string[] = [];
		let sid1:string[] = [];
		for (let key  in this.info) 
		{
			if (this.info[key] && this.info[key].servantId) 
			{	
				let nkey = Number(key);	
				if (nkey>100 && nkey<1000)
				{
					sid1.push(this.info[key].servantId);
				}
				else
				{
					sids.push(this.info[key].servantId);
				}
				
			}
		}
		return sids.concat(sid1);
	}

	/**剩余的席位数量 */
	public getRemainSeatNumber(): number {
		// let remainNumber = Api.servantVoApi.getServantCount() - Config.ExileCfg.servantNeed - this.getUseSeatNumber();
		let remainNumber = Api.servantVoApi.getServantCount() - this.getUseSeatNumber();
		return remainNumber;
	}
	/**门客出海的信息
	 * @param servantId
	 *  */
	public getServantExileInfoForServantId(servantId: string) {
		for (let key in this.info) {
			if (this.info[key].servantId == servantId) {
				return this.info[key];
			}
		}
		return null;
	}
	/**
	 * 门客出海的信息
	 * @param key
	 */
	public getServantExileInfoForKey(key: string) {
		if (this.info[key]) {
			return this.info[key]
		}
		return null;
	}

	public hasServantExileForKey(key: string):boolean
	{
		if (this.info[key] && this.info[key].servantId)  {
			return true;
		}
		return false;
	}

	public getServantBackTime(servantId: string) {
		let servantInfo = this.getServantExileInfoForServantId(servantId)
		let backTime: number = 0;
		if (servantInfo) {
			let et = 0;
			if (servantInfo.et)
			{
				et= servantInfo.et;
			}
			else
			{
				et= servantInfo.st + Config.ExileCfg.exileTime * 86400;
			}
			backTime =  et- GameData.serverTime;
			if (backTime > 0) {
				return backTime
			}
		}
		return null;
	}
	/**门客免费撤回的时间 */
	public getServantFreeTimeBack(servantId: string) {
		let servantInfo = this.getServantExileInfoForServantId(servantId);
		if (servantInfo.freeEndTime) {
			if (servantInfo.freeEndTime > GameData.serverTime) {
				return servantInfo.freeEndTime - GameData.serverTime;
			}

		}
		return null;
	}

	public isShowExileRedDot(): boolean {
		for (let key in this.info) {
			let oneinfo = this.info[key];
			if (oneinfo.servantId)
			{	
				let servantInfoVo: ServantInfoVo = Api.servantVoApi.getServantObj(oneinfo.servantId);
				if (servantInfoVo && servantInfoVo.banishSt == null) {
					return true;
				}
			}
			
		}
		return false;
	}

	public isShowNpc(): boolean {
		if (Api.switchVoApi.checkOpenExile() && Config.ExileCfg.numNeed < Api.servantVoApi.getServantCount()) {
			return true;
		}
		return false;
	}


	public getIsBuffed(servantId: string):boolean
	{
		for (let key in this.info) {
			if (this.info[key].buffSid == servantId) {
				return true;
			}
		}
		return false;
	}

	public getIsBuffedBySeat(seat: string|number):boolean
	{	
		let theinfo = this.info[String(seat)];

		if (theinfo && theinfo.buffSid) {
			return true;
		}
		return false;
	}

	public getPosIdByServantId(servantId: string):number
	{
		for (let key in this.info) {
			if (this.info[key].servantId == servantId) {
				return Number(key);
			}
		}
		return 0;
	}

	public getExileBuffRed():boolean
	{	
		if (!Api.switchVoApi.checkOpenExileBuff())
		{
			return false;
		}

		for (let key in this.info) {
			if (this.info[key] && this.info[key].servantId &&  this.getIsBuffedBySeat(key)== false) {
				return true;
			}
		}

		return false;
	}

	public dispose(): void {
		
		this.info = null;
		this.pos_num = 0;

		super.dispose();
	}
}