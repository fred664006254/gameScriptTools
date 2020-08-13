/*
author : qinajun
date : 2018.4.14
desc : 消除奖励
*/
class AcDestroySamePopupViewTab4 extends AcCommonViewTab
{
	//滑动列表
	public constructor(data) 
	{
		super();
		this.param = data;
		this.initView();
	}
	private get cfg() : Config.AcCfg.DestroySameCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcDestroySameVo{
        return <AcDestroySameVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}
	
	protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            case 1:
            case 2:
                code = `1`;
                break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
			case 12:
            case 13:
                code = `4`;
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }

	protected initView():void
	{	
		let view = this;
		// let boatview : any = ViewController.getInstance().getView('AcDragonBoatDayView');
		view.height = 660;
		view.width = 545;
		
		let Bg = BaseBitmap.create("public_9_bg4");
		Bg.width = 545-10;
		Bg.height = 640;
        Bg.x = 27+5;
        Bg.y = 55;
		view.addChild(Bg);

		let tipbg = BaseBitmap.create(`countrywarrewardview_itembg`);
		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`AcDestroySameRewardTip`, this.code, this.getUiCode())), 20, TextFieldConst.COLOR_LIGHT_YELLOW); 
		tipbg.width = 450;
		view.addChild(tipbg);
		view.addChild(tipTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipbg, Bg, [0,12]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipbg);

		let vo = this.vo;
		let arr = [1,2,3];

		let tmpRect =  new egret.Rectangle(0,0,530,585);
		let scrollList = ComponentManager.getScrollList(AcDestroySameRewardItem,arr,tmpRect,view.code);  
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, tipbg, [0,tipbg.height+5]);
		view.addChild(scrollList); 
		scrollList.bounces = false;
	}
	
	public dispose():void
	{	
		super.dispose();
	}
}