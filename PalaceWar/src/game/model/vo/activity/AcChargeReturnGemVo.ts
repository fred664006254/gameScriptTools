class AcChargeReturnGemVo extends AcBaseVo {
    public flag: number = 0;
    public red: number = 0;
    private num:number =0
    public initData(data: any): void {
        super.initData(data);
        // console.log("AcChargeReturnGemVo initData", data);
    }
    public getNum()
    {
        return this.num;
    }
	/**
	 * 是否显示活动icon，设置后自动显示或者隐藏活动
	 */
    public get isShowIcon(): boolean {
        // return this.flag <= 0;
        let cfg: Config.AcCfg.ChargeReturnGemCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!cfg){
            return false;
        }
        return this.getNum()<cfg.rebateLimit;
    }

    //倒计时
    public getCountDown():string{
        let et = this.et;
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acPunishEnd");
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    }

	/**
	 * 检测活动是否显示红点，true：显示
	 */
    public get isShowRedDot(): boolean {
        return this.red === 1;
    }
    public dispose(): void {
        super.dispose();
    }
}