
/**
 * 擂台api
 * author shaoliang
 * date 2017/11/23
 * @class AtkraceVoApi
 */

class AtkraceVoApi extends BaseVoApi {
	private atkraceVo: AtkraceVo;
	public revengeIdx: number = 0;
	private _inithand = false;

	public constructor() {
		super();
	}
	/**
	 * 战斗信息
	 */
	public getMyFightInfo(): AtkraceAtkInfoVo {
		return this.atkraceVo.ainfo;
	}
	/**
	 * 武馆信息息
	 */
	public getMyInfo(): AtkraceInfoVo {
		return this.atkraceVo.info;
	}

	public isShowNpc(): boolean {
		return Api.servantVoApi.getServantCountLevel60Plus() >= 1 && Api.servantVoApi.getServantCount() >= Config.AtkraceCfg.getUnlock();
		// return true;
	}

	/**
	 * 当前是否可以打开 擂台view， 如果已开启可以打开
	 */
	public getOpenViewMessage():string
	{
		if (!this.isShowNpc()) {
			return this.getLockedString();
		}
		else{
			if (Api.unlocklist2VoApi.checkShowOpenFunc()){
				if (Api.unlocklist2VoApi.isInNeedShowEffect("atkrace")){
					return this.getLockedString();
				}
			}
		}
		return null;
	}

	public getLockedString(): string {
		return LanguageManager.getlocal("atkraceUnlcok", [Config.AtkraceCfg.getUnlock().toString()]);
	}

	public getPoint(): number {
		return this.atkraceVo.point;
	}

	public getRewardc(): any {
		return this.atkraceVo.rewardc;
	}

	public getLastKillerInfo(): any {
		return this.atkraceVo.info.lastKillerInfo;
	}

	public checkNpcMessage(): boolean {
		let flag: boolean = false;
		if (this.isShowNpc()) {
			if (this.atkraceVo.ainfo && this.atkraceVo.ainfo.mesid) {
				flag = true;
			}
			else {
				let maxCount: number = Config.AtkraceCfg.getDailyNum();
				if(this.atkraceVo&&this.atkraceVo.info)
				{
					let myNum: number = this.atkraceVo.info.num;
					let countDownTime: number = this.atkraceVo.info.lasttime + Config.AtkraceCfg.getIntervalTime() - GameData.serverTime;
					if ((myNum < maxCount && countDownTime <= 0)) {
						flag = true;
					}
				}
			}

			//门客名望
			if (Api.switchVoApi.checkServantFame() && this.checkHaveServantCanUpFame()) {
				flag = true;
			}
		}
		return flag;
	}

	//门客免战
	public checkHaveAvoidServant(): boolean {
		let idList = Api.servantVoApi.getServantInfoIdListWithSort(1);
		for (let i = 0, j = idList.length; i < j; i++) {
			if (Config.ServantCfg.checkCanAvoidAtkrace(idList[i])) {
				return true;
			}
		}
		return false;
	}


	//门客免战红点
	public checkOpenAvoidReddot(): boolean {
		let idList = Api.servantVoApi.getServantInfoIdListWithSort(1);
		for (let i = 0, j = idList.length; i < j; i++) {
			if (Config.ServantCfg.checkCanAvoidAtkrace(idList[i])) {
				if (!Api.servantVoApi.getServantObj(idList[i]).avoid) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * 获取门客名望列表
	 */
	public getServantListByFame(): any {

		let list: any = {};
		let servantInfoList = Api.servantVoApi.getServantInfoList();
		for (const key in servantInfoList) {
			let servantItem = servantInfoList[key];
			// servantItem.fameLv = Math.floor(Math.random()*13);
			if (servantItem.fameLv && servantItem.fameLv > 0) {
				list[servantItem.fameLv] = list[servantItem.fameLv] || [];
				list[servantItem.fameLv].push(servantItem.servantId);
			}
		}
		return list;
	}
	/**
	 * 检测门客名望是否可升级
	*/
	public checkServantCanUpFame(servantId: string): boolean {
		const servantInfo = Api.servantVoApi.getServantObj(servantId);
		const nowFame = servantInfo.fame;
		let fameLv = servantInfo.fameLv || 1;
		const curNeedFame = Config.AtkraceCfg.getNeedFameBylevel(fameLv);
		if (fameLv < Config.AtkraceCfg.getFameList().length && nowFame >= curNeedFame) {
			return true;
		}
		return false;
	}

	/**
	 * 检测是否有可升级名望的门客
	*/
	public checkHaveServantCanUpFame(): boolean {
		if (this.getCanUpFameServantIdList() && this.getCanUpFameServantIdList().length > 0) {
			return true;
		}
		return false;
	}

	/**
 * 检测是否有可升级名望的门客
*/
	public getCanUpFameServantIdList(): Array<string> {
		let idList = [];
		let servantList = Api.servantVoApi.getServantInfoList();
		for (const key in servantList) {
			if (servantList.hasOwnProperty(key)) {
				const element = servantList[key];
				if (this.checkServantCanUpFame(element.servantId)) {
					idList.push(element.servantId);
				}

			}
		}
		return idList;
	}

	//根据type获取门课名望攻击力加成
	public getFameTotalAddAtkByType(attrType: 1 | 2): number {
		let totalAtk = 0
		let servantList = Api.servantVoApi.getServantInfoList();
		for (const key in servantList) {
			if (servantList.hasOwnProperty(key)) {
				const element = servantList[key];
				let fameCfg = Config.AtkraceCfg.getFameCfgBylevel(element.fameLv);
				if (fameCfg.att1Type == attrType) {
					totalAtk += fameCfg.att1;
				}
			}
		}
		if (attrType === 2) {
			totalAtk = totalAtk * 100;
		}
		return totalAtk;
	}
	//获取门课名望暴击伤害加成
	public getFameTotalAddCrt(): number {
		let totalCrt = 0
		let servantList = Api.servantVoApi.getServantInfoList();
		for (const key in servantList) {
			if (servantList.hasOwnProperty(key)) {
				const element = servantList[key];
				let fameCfg = Config.AtkraceCfg.getFameCfgBylevel(element.fameLv);
				if (fameCfg.att2) {
					totalCrt += fameCfg.att2 * 100;
				}
			}
		}
		return totalCrt;
	}


	public get inithand(): boolean {
		return this._inithand;
	}

	public setInitHand(flag: boolean): void {
		this._inithand = flag
	}

	public getDecreePolicyAddAttrInfo() {
		return Api.promoteVoApi.getDecreePolicyAddAttrInfo("atkrace", 5);
	}

	public dateErrorHandle(): void {
		let atkraceView = <AtkraceView>ViewController.getInstance().getView(ViewConst.COMMON.ATKRACEVIEW);
		if (atkraceView) {
			atkraceView.refreshServant();
		}

		let rewardPopupView = ViewController.getInstance().getView(ViewConst.POPUP.ATKRACEREWARDPOPUPVIEW);
		if (rewardPopupView) {
			rewardPopupView.hide();
		}

		let autoFightPopupView = ViewController.getInstance().getView(ViewConst.POPUP.ATKRACEAUTOFIGHTPOPUPVIEW);
		if (autoFightPopupView) {
			autoFightPopupView.hide();
		}

		let buyPopupView = ViewController.getInstance().getView(ViewConst.POPUP.ATKRACEBUYPOPUPVIEW);
		if (buyPopupView) {
			buyPopupView.hide();
		}

		let agreePopupDialog = ViewController.getInstance().getView(ViewConst.POPUP.ATKRACEAGREEPOPUPVIEW);
		if (agreePopupDialog) {
			agreePopupDialog.hide();
		}

		let arrestView = ViewController.getInstance().getView(ViewConst.COMMON.ATKRACEARRESTVIEW);
		if (arrestView) {
			arrestView.hide();
		}
		App.CommonUtil.showTip(LanguageManager.getlocal("atkracedesErrorTip"));
	}

	public dispose(): void {
		this.revengeIdx = 0;
		this._inithand = false;
		super.dispose();
	}
}