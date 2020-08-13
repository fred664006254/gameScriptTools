class AcLimitGiftVo extends AcBaseVo {
    public constructor() {
        super();
    }

    private buyNum: {[index: string]: number} = {}

    public initData(data: any): void {
		for (let key in data) {
			this[key] = data[key];
		}
	}

    public get config(): Config.AcCfg.LimitGiftCfg {
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

    /**
     * 是否有可领取的免费礼包
     * 借此判断tab红点
     */
    public get isHasFreeCharge(): boolean {
        let _mf = this.config.GiftList.filter(v => v.cost == "0");
        if (_mf[0]) {
            let _has = this.getBuyNumByCost(_mf[0].cost);
            return _has < _mf[0].limit;
        } else {
            return false;
        }
    }

    public getBuyNumByCost(cost: string) {
        return this.buyNum[cost] || 0;
    }

    /**
	 * 检测活动是否显示红点，true：显示
	 */
	public get isShowRedDot(): boolean {
        let _volist = <AcLimitGiftVo[]>Api.acVoApi.getActivityVoListByAid(this.aid);
        for (let i=0;i<_volist.length;i++) {
            if (_volist[i].isHasFreeCharge && !_volist[i].isEnd) {
                return true;
            }
        }
		return false;
	}

    public dispose() {
        super.dispose();
    }
}