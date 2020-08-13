/**
 * 帮会勤王除恶api
 * author 张朝阳
 * date 2019/4/16
 * @class AllianceWeekVoApi
 */
class AllianceWeekVoApi extends BaseVoApi {

	private info: any = null;

	private id: number = 0;

	private lastday: number = 0;

	private version: number = 0;

	/**活动时间 */
	private weekActiveTime: number[] = [];

	public constructor() {
		super();
	}
	public formatData(data: any): void {
		this.info = data.info;
		this.id = data.id;
		this.lastday = data.lastday;
		this.version = data.version;
	}
	/**获得当前boss信息 */
	public getNowBoss() {
		if (this.info.boss && this.info.boss.id && this.info.boss.id != Config.AllianceweekendCfg.lastFoeItemCfg().id) {
			return this.info.boss;
		}
		return null;
	}

	/**获取击杀数 和 总数量 */
	public getKillValueAndSumValue(): { kill: number, sum: number } {
		let cfg = Config.AllianceweekendCfg.getFoeItemCfgList();
		let sum = cfg.length - 1;

		let kill: number = 0
		let boss = this.getNowBoss();
		if (boss) {
			for (let i = 0; i < cfg.length; i++) {
				if (cfg[i].id == boss.id) {
					kill = i;
					break;
				}
			}
		}
		else {
			kill = sum;
		}
		return { kill: kill, sum: sum }
	}
	/**buff 数量 */
	public getbuffValue() {
		return this.info.buynum;
	}
	/**加成buff百分值 */
	public getAdditionBuff() {
		return Math.round(this.getbuffValue() * Config.AllianceweekendCfg.powerUp.powerAdd * 100);
	}

	/**加成buff百分值 */
	public getNextAdditionBuff() {

		let num = (this.getbuffValue() + 1) > Config.AllianceweekendCfg.powerUp.limit ? Config.AllianceweekendCfg.powerUp.limit : (this.getbuffValue() + 1);
		return Math.round(num * Config.AllianceweekendCfg.powerUp.powerAdd * 100);
	}







	/**时间 */
	public formatDataWeekActiveTime(data: any) {
		this.weekActiveTime = data;
	}
	/**是否在活动期间内 包含展示期 */
	public checkActivityStart() {
		if (this.weekActiveTime.length > 0 && this.weekActiveTime[0] <= GameData.serverTime && this.weekActiveTime[this.weekActiveTime.length - 1] >= GameData.serverTime) {
			return true;
		}
		return false;
	}
	/**是否在战斗时间 */
	public checkBattleTime() {
		if ((GameData.serverTime >= this.weekActiveTime[0] && GameData.serverTime <= this.weekActiveTime[1]) || (GameData.serverTime >= this.weekActiveTime[2] && GameData.serverTime <= this.weekActiveTime[3])) {
			return true;
		}
		return false;
	}
	/**是否在休战期 */
	public checkRestTime() {
		if ((GameData.serverTime > this.weekActiveTime[1] && GameData.serverTime < this.weekActiveTime[2])) {
			return true;
		}
		return false;
	}
	/**获得休战剩余的时间 */
	public getRestTime() {
		return App.DateUtil.getFormatBySecond(this.weekActiveTime[2] - GameData.serverTime, 1);
	}


	/**活动时间 */
	public acTimeAndHour() {
		let st = this.weekActiveTime[0];
		let et = this.weekActiveTime[this.weekActiveTime.length - 2];
		return App.DateUtil.getOpenLocalTime(st, et, true);
	}
	/**活动时间 */
	public acTimeAndHourUnBattle() {
		let st = this.weekActiveTime[1];
		let et = this.weekActiveTime[2];
		return App.DateUtil.getOpenLocalTime(st, et, true);
	}
	/**
	 * 活动结束倒计时，格式：00：00：00
	 */
	public acCountDown(): string {
		let st = this.weekActiveTime[0];
		let et = this.weekActiveTime[this.weekActiveTime.length - 2];
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
	}
	/**是否在活动期间 */
	public checkActiveStart() {
		let st = this.weekActiveTime[0];
		let et = this.weekActiveTime[this.weekActiveTime.length - 2];
		if (st <= GameData.serverTime && et >= GameData.serverTime) {
			return true;
		}
		return false;
	}
	/**是否在展示期 */
	public checkIsHasExtraTime() {
		let acet = this.weekActiveTime[this.weekActiveTime.length - 2];
		let et = this.weekActiveTime[this.weekActiveTime.length - 1];
		if (GameData.serverTime > acet && GameData.serverTime <= et) {
			return true;
		}
		return false;

	}
	/**本地化开启时间 */
	public formatOpenHour():string[]{
		let time = Config.AllianceweekendCfg.openTime[0].duration;
		let stHour = Math.floor(time[0]/3600) % 24;
		let etHour = Math.floor(time[1]/3600) % 24;
		return App.DateUtil.getLocalTimeZoneTime(stHour, etHour);
	}

	/**战斗开启期间显示红点 */
	public checkInBattleRedDot():boolean{
		if (Api.playerVoApi.getPlayerAllianceId() > 0 && Api.switchVoApi.checkAllianceweekend() && Api.allianceVoApi && Api.allianceVoApi.getAllianceVo() && Api.allianceVoApi.getAllianceVo().level >= Config.AllianceweekendCfg.allianceLv && Api.myAllianceWeekVoApi.checkUserJoinAllianceTime()){
			if (this.checkActivityStart() && this.checkBattleTime()){
				if ((GameData.serverTime >= this.weekActiveTime[0] && GameData.serverTime <= this.weekActiveTime[1])) {
					let key = Api.playerVoApi.getPlayerID()+"allianceWeekBoss1";
					let st = LocalStorageManager.get(key);
					if (st && Number(st) == this.weekActiveTime[0]){
						return false;
					}
				}
				else if (GameData.serverTime >= this.weekActiveTime[2] && GameData.serverTime <= this.weekActiveTime[3]) {
					let key = Api.playerVoApi.getPlayerID()+"allianceWeekBoss2";
					let st = LocalStorageManager.get(key);
					if (st && Number(st) == this.weekActiveTime[2]){
						return false;
					}
				}
				return true;
			}
		}
		return false;
	}

	//设置在战斗中红点标志位
	public setinBattleRedDotFlag():void{
		if (this.weekActiveTime && this.weekActiveTime.length > 0){
			if (this.checkBattleTime()){
				if ((GameData.serverTime >= this.weekActiveTime[0] && GameData.serverTime <= this.weekActiveTime[1])) {
					let key = Api.playerVoApi.getPlayerID()+"allianceWeekBoss1";
					LocalStorageManager.set(key, String(this.weekActiveTime[0]));
				}
				else if (GameData.serverTime >= this.weekActiveTime[2] && GameData.serverTime <= this.weekActiveTime[3]) {
					let key = Api.playerVoApi.getPlayerID()+"allianceWeekBoss2";
					LocalStorageManager.set(key, String(this.weekActiveTime[2]));
				}
			}
		}
	}

	public dispose(): void {
		this.info = null;
		this.id = 0;
		this.lastday = 0;
		this.version = 0;
		this.weekActiveTime = [];
		super.dispose();
	}
}