class AcRabbitComingRewardPopupViewTab2 extends CommonViewTab{  
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
		Bg.height = 565;
        Bg.x = 25;
        Bg.y = 55;
        view.addChild(Bg);
        
        let vo = this.vo;
		let arr = vo.getArr("allianceRank");//
 		let tmpRect =  new egret.Rectangle(0,0,530,Bg.height - 10);
		let scrollList = ComponentManager.getScrollList(AcRabbitComingARankItem,arr,tmpRect,view.code);    
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, Bg, [0,3]);
		view.addChild(scrollList); 
		
		let bottombg = BaseBitmap.create(`public_9_bg1`);
		view.addChild(bottombg);
		bottombg.width = 540;
		bottombg.height = 112;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, bottombg, Bg, [0,Bg.height+5]);

		let myrank = view.vo.getMyAllPrank();
		let str = ``;
		if(myrank == 0){
			str = LanguageManager.getlocal(`acMaChaoRankPopupViewTab2Unrank-1`);
		}
		else{
			str = myrank.toString();
		}
		let rankTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acrabbitcomingtip9`,view.getUiCode()), [str]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
		view.addChild(rankTxt);

		let scoreTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acrabbitcomingtip8`,view.getUiCode()), [view.vo.getMyAScore().toString()]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
		view.addChild(scoreTxt);

		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rankTxt, bottombg, [13,30]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, scoreTxt, rankTxt, [0,rankTxt.textHeight+10]);

		let btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, `acPunishRankTab2`, ()=>{
			ViewController.getInstance().openView(ViewConst.POPUP.ACRABBITCOMINGRANKVIEW2,{
				aid : view.aid,
				code : view.code
			});
		}, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, btn, bottombg, [10,0]);
		view.addChild(btn);
	}
	
    public dispose(): void {
		super.dispose();
	}
}
