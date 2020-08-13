class AcIcebreakingGiftVo extends AcBaseVo {
    public ainfo: any = null;
    public addgem:number = 0;
    private  get cfg ():Config.AcCfg.IcebreakingGiftCfg
    {
		let cfg = <Config.AcCfg.IcebreakingGiftCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		return cfg;
	}
    public initData(data: any): void {
        super.initData(data);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACICEBREAKINGGIFT_REFRESHVO);
        this.addgem=data["ainfo"].v;
    }
    public setAddgem(num:number):void
    {
        this.addgem = num;
    }
    public getAddgem():number
    {
        
        return this.addgem;
    }
    public get isClose():boolean
    {
        // let f = this.ainfo ? this.ainfo.f:0;
        let v = this.ainfo ? this.ainfo.v:0;
        return v == 0;
    }
    //0-->跳转充值 1-->可领取 2-->已经领取
    public get btnStatus():number
    {
        let f = this.ainfo ? this.ainfo.f:0;
        return f;

        // return this.ainfo ? this.ainfo.f:0;
    }
    //剩余元宝
    // public getResidue():number
    // {
    //     this.cfg.getGemGet() - 

    // }
    
	/**
	 * 检测活动是否显示红点，true：显示
	 */
    public get isShowRedDot(): boolean {
        if(this.btnStatus==1 && this.ainfo && this.ainfo.v > 0){
            return true;
        } else {
            return false;
        }
        
    }
    public dispose(): void {
        this.ainfo = null;
        this.addgem = 0;
        super.dispose();
    }
}