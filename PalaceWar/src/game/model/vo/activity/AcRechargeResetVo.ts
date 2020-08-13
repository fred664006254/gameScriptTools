/**
 * 首冲重置VO
 */
class AcRechargeResetVo extends AcBaseVo {

	private _lastOpenTime:number =-1;
	public constructor() {
		super();
	}
	public initData(data: any): void {
		for (let key in data) {
			this[key] = data[key];
		}
	}

	public setOpenTime():void
	{
		this._lastOpenTime = GameData.serverTime;
		let localkey:string = "AcOpenTime_"+this.aidAndCode+Api.playerVoApi.getPlayerID();
		LocalStorageManager.set(localkey,String(this._lastOpenTime));
	}

	/**
 	* 红点显示
 	*/
	public get isShowRedDot(): boolean {
		if (this.isStart == false) {
			return false;
		}

		if (this._lastOpenTime == -1)
		{
			let localkey:string = "AcOpenTime_"+this.aidAndCode+Api.playerVoApi.getPlayerID();
			let timeStr:string = LocalStorageManager.get(localkey);
			if (timeStr && timeStr!="")
			{
				this._lastOpenTime = Number(timeStr);
			}
			else
			{
				this._lastOpenTime = 0;
			}
		}
		
		if (App.DateUtil.checkIsToday(this._lastOpenTime))
		{
			return false;
		}

		return true;
	}
	public get acCountDown(): string {
		let et = this.et
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acPunishEnd");
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
	}
	public dispose(): void {

		this._lastOpenTime = 0;

		super.dispose();
	}
}