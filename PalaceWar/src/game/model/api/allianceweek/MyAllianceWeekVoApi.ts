/**
 * my 帮会勤王除恶api
 * author 张朝阳
 * date 2019/4/16
 * @class MyAllianceWeekVoApi
 */
class MyAllianceWeekVoApi extends BaseVoApi {

	private info: any = null;
	private lastday: number = 0;
	private score: number = 0;
	private servant: any = 0;
	private uid: number = 0;
	private version: number = 0;
	public constructor() {
		super();
	}

	public formatData(data: any): void {
		this.info = data.info;
		this.lastday = data.lastday;
		this.score = data.score;
		this.servant = data.servant;
		this.uid = data.uid;
		this.version = data.version;
	}
	/**个人贡献 */
	public getScore() {
		return this.score;
	}
	public getShowFlag() {
		return this.info.showflag;
	}
	/**boss 分数 */
	public getBossScore(id: number) {
		let killAndScore: { score: number, killscore: number } = { score: 0, killscore: 0 };
		if (this.info.getScores[id]) {
			killAndScore = { score: this.info.getScores[id][0], killscore: this.info.getScores[id][1] }

		}
		return killAndScore
	}
	/**门客是否已经出战过 */
	public checkServantState(servantId: string) {
		if (this.servant[servantId] && (this.servant[servantId] == 1 || this.servant[servantId] == 2)) {
			return true;
		}
		return false;
	}
	/**门客是否可恢复 */
	public checkServantRecover(servantId: string) {
		if (this.servant[servantId] && (this.servant[servantId] == 1)) {
			return true;
		}
		return false;
	}

	public checkServantUnRecover(servantId: string) {
		if (this.servant[servantId] && (this.servant[servantId] == 2)) {
			return true;
		}
		return false;
	}
	/**获得排序后的门客数据 */
	public getServantList() {
		let servantList: { servantInfoVo: ServantInfoVo, servantCombat: number, servantState: number }[] = [];
		let servantKey = Api.servantVoApi.getServantInfoIdListWithSort(1);
		for (let key in servantKey) {
			let servantInfoVo: ServantInfoVo = Api.servantVoApi.getServantObj(servantKey[key]);
			let servantCombat: number = Math.floor(Api.servantVoApi.getServantCombatWithId(servantKey[key]) * (Api.allianceWeekVoApi.getAdditionBuff() + 100) / 100);
			let servantState: number = this.checkServantUnRecover(servantKey[key]) ? 2 : this.checkServantState(servantKey[key]) ? 1 : 0;
			let servant = { servantInfoVo: servantInfoVo, servantCombat: servantCombat, servantState: servantState };
			servantList.push(servant);
		}
		servantList.sort((a, b) => {
			if (a.servantState == b.servantState) {
				if (Api.switchVoApi.checkOpenExile()) {
					if (a.servantInfoVo.banishSt && (!b.servantInfoVo.banishSt)) {
						return 1;
					}
					else if (a.servantInfoVo.banishSt && b.servantInfoVo.banishSt) {
						return b.servantCombat - a.servantCombat;;
					}
					else if ((!a.servantInfoVo.banishSt) && b.servantInfoVo.banishSt) {
						return -1;
					}
					else if ((!a.servantInfoVo.banishSt) && (!b.servantInfoVo.banishSt)) {
						return b.servantCombat - a.servantCombat;;
					}

				}
				else {
					return b.servantCombat - a.servantCombat;
				}

			}
			else {
				return a.servantState - b.servantState;
			}
		});
		return servantList;
	}
	/**获得门客出战的信息 */
	public getGoFightServant(): ServantInfoVo {
		let servantList = this.getServantList();
		let servantKillBossList: { servantInfoVo: ServantInfoVo, servantCombat: number, servantState: number }[] = [];
		let bossInfo = Api.allianceWeekVoApi.getNowBoss()

		if (bossInfo) {
			for (let key in servantList) {
				if (servantList[key].servantState == 0 && servantList[key].servantCombat >= bossInfo.hp) {
					servantKillBossList.push(servantList[key]);
				}
			}
		}
		if (servantKillBossList.length > 0) {
			return servantKillBossList[servantKillBossList.length - 1].servantInfoVo;
		}
		else if (servantList[0].servantState == 0) {
			return servantList[0].servantInfoVo;
		}
		return null;
	}
	/**宝箱是否已经领取了 */
	public checkBoxReceive(id: number) {
		if (this.info.scorerewards[id]) {
			return true;
		}
		return false;
	}
	/**
	* 获得充值奖励的配置
	*/
	public getSortScoreCfg(): Config.AllianceweekendCfg.PeScoreItemCfg[] {
		let rechargeData = Config.AllianceweekendCfg.peScoreItemCfgList;
		for (let i = 0; i < rechargeData.length; i++) {
			if (this.checkBoxReceive(rechargeData[i].id)) {
				rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
				continue;
			}
			else if (this.getScore() >= rechargeData[i].score) {
				rechargeData[i].sortId = (Number(rechargeData[i].id)) - rechargeData.length - 1;
				continue;
			}
			else {
				rechargeData[i].sortId = Number(rechargeData[i].id);
				continue;
			}
		}
		return rechargeData;
	}

	/**npc奖励是否已经领取了 */
	public checkNpcReceive(id: number) {
		if (this.info.killrewards[id]) {
			return true;
		}
		return false;
	}
	/**红点显示 */
	public checkShowDot(): boolean {
		if (!Api.allianceWeekVoApi.checkActivityStart()) {
			return false;
		}
		return this.checkBoxDot() || this.checkNpcDot();
	}
	/**玩家加入帮会时间是否满足48小时 */
	public checkUserJoinAllianceTime() {
		let myAllianceVo = Api.allianceVoApi.getMyAllianceVo();
		let joint = myAllianceVo.joint + 2 * 86400;
		if (joint <= GameData.serverTime) {
			return true;
		}
		return false;
	}
	/**剩余时间 */
	public getJoinBattleTime() {
		let myAllianceVo = Api.allianceVoApi.getMyAllianceVo();
		let t = myAllianceVo.joint + 2 * 86400 - GameData.serverTime;
		return App.DateUtil.getFormatBySecond(t, 1);
	}
	/**宝箱红点 */
	public checkBoxDot(): boolean {
		let cfg = Config.AllianceweekendCfg.peScoreItemCfgList;
		for (let i = 0; i < cfg.length; i++) {
			if (this.getScore() >= cfg[i].score && (!this.checkBoxReceive(cfg[i].id))) {
				return true;
			}
		}
		return false;
	}

	/**npc红点 */
	public checkNpcDot(): boolean {
		let cfg = Config.AllianceweekendCfg.getFoeItemCfgList();
		let bossId = Api.allianceWeekVoApi.getNowBoss() ? Api.allianceWeekVoApi.getNowBoss().id : Config.AllianceweekendCfg.lastFoeItemCfg().id;
		for (let i = 0; i < cfg.length; i++) {
			if (bossId > cfg[i].id && (!this.checkNpcReceive(cfg[i].id))) {
				return true;
			}
		}
		return false;
	}

	public dispose(): void {
		this.info = null;
		this.lastday = 0;
		this.score = 0;
		this.servant = 0;
		this.uid = 0;
		this.version = 0;
		super.dispose();
	}
}