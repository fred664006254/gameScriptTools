//
class AcRabbitComingRankViewTab1 extends CommonViewTab
{
	public constructor(param?) 
	{
		super();
		this.param = param;
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


	protected getListType():number
	{
		return 1;
	}

	protected initView():void
	{
		let view = this;
		let rankList = view.vo.getMyPrankInfo();

		let rect2 = egret.Rectangle.create();
		rect2.setTo(0,0,508,520);
        let scrollList = ComponentManager.getScrollList(AcRabbitComingRankItem,rankList,rect2);
		scrollList.x = 21;
		scrollList.y = 90;
		view.addChild(scrollList);
		scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
		
		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acrabbitcomingtip18`,view.code), [view.cfg.pointsOwned1.toString()]), 22, TextFieldConst.COLOR_BROWN);
		App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, tipTxt, scrollList, [30,scrollList.height+110]);
        view.addChild(tipTxt);
	}

	public dispose():void
	{
		super.dispose();
	}

}