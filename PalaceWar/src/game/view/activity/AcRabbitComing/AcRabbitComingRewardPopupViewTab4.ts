class AcRabbitComingRewardPopupViewTab4 extends CommonViewTab{  

	public constructor(data) 
	{
		super();
		this.param = data;
		this.initView();
	}
	private get cfg() : Config.AcCfg.RabbitComingCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
  
	private get vo() : AcRabbitComingVo{
		return <AcRabbitComingVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
	}
  
	private get acTivityId() : string{
		return `${this.aid}-${this.code}`;
	}
	
	private get aid() : string{
		return `${this.param.data.aid}`;
	}
  
	private get code() : string{
		return `${this.param.data.code}`;
	}
  
	protected getUiCode():string{
		let code = '';
		switch(Number(this.code)){
			case 1:
			case 2:
				code = `1`;
				break;
			default:
				code = this.code;
				break;
		}
		return code;
	}

    protected initView():void{
		let view = this;
		view.height = 675;
        view.width = 535;
        
		let Bg = BaseBitmap.create("public_9_bg4");
		Bg.width = 530;
		Bg.height = 660;
        Bg.x = 25;
        Bg.y = 55;
		view.addChild(Bg);
		
		let code = view.getUiCode();
		let topbg = BaseBitmap.create(App.CommonUtil.getResByCode(`rabitrewardtopbg`, code));
		view.addChild(topbg);
		topbg.width = 532;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, Bg, [0,3]);

		// if(this.cfg.corePrize){
		// 	let wcfg = Config.WifeskinCfg.getWifeCfgById(this.cfg.corePrize);
		// 	let wife = BaseLoadBitmap.create(wcfg.body);
		// 	wife.width = 640;
		// 	wife.height = 840;
		// 	wife.setScale(0.3);
		// 	view.addChild(wife);
		// 	App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, wife, topbg, [0,6]);
		// }

        
        let vo = this.vo;
		let arr = [view.cfg.poolList[1].prizePool, view.cfg.poolList[2].prizePool];//
 		let tmpRect =  new egret.Rectangle(0,0,530,Bg.height - 10 - topbg.height);
		let scrollList = ComponentManager.getScrollList(AcRabbitComingPoolItem,arr,tmpRect,view.code);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, topbg, [0,topbg.height+3]);
		view.addChild(scrollList); 
	}
	
    public dispose(): void {
		let view = this;
		super.dispose();
	}
}
