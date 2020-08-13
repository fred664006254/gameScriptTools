class AcActivityExchangeVo extends AcBaseVo {
    public constructor() {
        super();
    }

    private exchange: any = {};

    public buyPoint: egret.Point = null;

    public initData(data: any): void {
		for (let key in data) {
			this[key] = data[key];
		}
	}

    /**
     * 根据ID查询剩余兑换次数
     */
    public getSurNumById(sortId: number): number {
        const limit: number = this.config.getLimitById(sortId);
        const has: number = this.exchange[sortId] || 0;
        return limit - has > 0 ? limit - has : 0;
    }

    public get config(): Config.AcCfg.ActivityExchangeCfg {
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

    public dispose() {
        super.dispose();
    }
}