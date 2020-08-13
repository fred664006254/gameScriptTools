/**
 * 除夕7天签到vo
 */
class AcNewYearSignUpVo extends AcBaseVo {

	private cinfo: any;

	private diffday: number;
	private ballonTs: number;
	private ballonNum: number;
	private buySign: number;
	public constructor() {
		super();
	}

	public initData(data: any): void {
		for (let key in data) {
			this[key] = data[key];
		}
	}
	/**购买的次数 */
	public getBuySign() {
		return this.buySign;
	}
	/**获得cd时间 */
	public getBallonTs() {
		return this.ballonTs;
	}
	/** 获得领取次数 */
	public getBallonValue() {
		return this.ballonNum;
	}
	/**
	 * 	当前第几天
	 */
	public getNowDay(): number {
		return this.diffday;
	}
	/**
	 * 奖励是否被领取
	 */
	public isReceiveReward(id: string) {
		if (this.cinfo[id]) {
			if (this.cinfo[id] == 0) {
				return false;
			}
			else {
				return true;
			}
		}
		return false;
	}
	/**是否有这个奖励 */
	public isHaveReward(id: string): boolean {
		if (this.cinfo[id] == null) {
			return false;
		}
		else {
			return true;
		}
	}
	/**是否领取了七日奖励 */
	public isReceiveSevenReward() {
		if (this.cinfo["all"]) {
			return true;
		}
		return false;
	}
	/**是否有领取七日奖励的资格 */
	public isHaveReceiveSevenReward() {
		let cfg = <Config.AcCfg.NewYearSignUpCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if (this.et - 86400 * cfg.extraTime - GameData.serverTime < 0) {
			return false;
		}
		if (this.cinfo["all"] == null) {
			let totalDay = 7;
			if (this.code == 2){
				totalDay = 3;
			}
			let day = 0;
			for (let key in this.cinfo) {
				if (this.cinfo[key] == 1 && Number(key) > 0) {
					day++;
				}
				else {
					if (Number(key) <= totalDay){
						return false;
					}
				}

			}
			
			if (day >= totalDay) {

				return true;
			}
			else {
				return false;
			}
		}
		return false;
	}
	/**是否可以打开板子 */
	public isShowSharkView() {
		let cfg = <Config.AcCfg.NewYearSignUpCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		return cfg && (this.getBallonTs() + cfg.rewardCD) <= GameData.serverTime && GameData.isOpenNewYearSignUpView && this.getBallonValue() < cfg.limitation && ViewController.getInstance().checkHasShowedView() == false && (this.et - cfg.extraTime * 86400) > GameData.serverTime;
	}
	/**
	 * 红点显示
	 */
	public get isShowRedDot(): boolean {
		let cfg = <Config.AcCfg.NewYearSignUpCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if (this.et - 86400 * cfg.extraTime - GameData.serverTime < 0) {
			return false;
		}
		let totalDay = 7;
		if (this.code == 2){
			totalDay = 3;
		}
		for (let key in this.cinfo) {
			if (this.cinfo[key] == 0 && Number(key) <= totalDay && Number(key) > 0) {
				return true;
			}
		}
		return (!this.isReceiveSevenReward()) && this.isHaveReceiveSevenReward();
	}

	//倒计时
    public getCountDown():string{
		let cfg = <Config.AcCfg.NewYearSignUpCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        let et = this.et - cfg.extraTime * 86400;
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acPunishEnd");
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
	}

	//活动日期时间显示
    public get acTimeAndHour(): string {
		let cfg = <Config.AcCfg.NewYearSignUpCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let et = this.et - 86400 * cfg.extraTime;
		return App.DateUtil.getOpenLocalTime(this.st, et, true);
    }
	
	public dispose(): void {
		this.cinfo = null;
		this.diffday = 0;
		this.ballonTs = 0;
		this.ballonNum = 0;
		this.buySign = 0;
		super.dispose();
	}
}