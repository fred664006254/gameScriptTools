/**
 * 活动详情介绍
 * author qianjun
 */
class AcNewYearCrackerDetailPopupView extends PopupView
{
	public constructor(){
		super();
	}
	
	private get cfg() : Config.AcCfg.NewYearCrackerCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcNewYearCrackerVo{
        return <AcNewYearCrackerVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			`accrackerpopdescbg-${this.code}`,`accrackerdetailbg1-${this.code}`,`accrackerdetailbg2-${this.code}`
		]);
    }

	public initView():void
	{		
		// let tabName = ["acPunishRankRewardTab1"];
		let view = this;
		let descbg = BaseBitmap.create(`accrackerpopdescbg-${view.code}`);
		descbg.setPosition(view.viewBg.x + view.viewBg.width / 2 - descbg.width / 2,0);
		view.addChildToContainer(descbg);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acNewYearCrackerDetailTip-${view.code}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		tipTxt.lineSpacing = 5;
		tipTxt.width = 475;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,tipTxt,descbg,[0,10]);
		view.addChildToContainer(tipTxt);

		let bg = BaseBitmap.create(`accrackerpopbg-${view.code}`);
		bg.width = 530;
		bg.height = 538;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,bg,descbg,[0, descbg.height + 8]);
		view.addChildToContainer(bg);

		let scene1 = BaseBitmap.create(`accrackerdetailbg1-${view.code}`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,scene1,bg,[0,5]);
		view.addChildToContainer(scene1);

		let scene2 = BaseBitmap.create(`accrackerdetailbg2-${view.code}`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,scene2,scene1,[0,scene1.height]);
		view.addChildToContainer(scene2);

		let btn1 = ComponentManager.getButton(`accrackerckan-${view.code}`, '', ()=>{
			//打开爆竹奖励界面
			//打开奖励弹窗
            ViewController.getInstance().openView(ViewConst.POPUP.ACNEWYEARCRACKERREWARDPOPUPVIEW,{
                aid : view.aid,
                code : view.code,
            });
		}, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, btn1, scene1, [85, 15]);
		view.addChildToContainer(btn1);

		let tipTxt1 = ComponentManager.getTextField(LanguageManager.getlocal(`acNewYearCrackerDetailTip1-${view.code}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		tipTxt1.lineSpacing = 5;
		tipTxt1.width = 275;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop,tipTxt1,scene1,[210,85]);
		view.addChildToContainer(tipTxt1);

		let btn2 = ComponentManager.getButton(`accrackerckan-${view.code}`, '', ()=>{
			//打开任务奖励界面
			//打开奖励弹窗
			ViewController.getInstance().openView(ViewConst.COMMON.ACNEWYEARDAILYPACKAGEVIEW,{
				aid : view.aid,
				code : view.code,
			});
		}, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, btn2, scene2, [80, 15]);
		view.addChildToContainer(btn2);

		let tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(`acNewYearCrackerDetailTip2-${view.code}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		tipTxt2.lineSpacing = 5;
		tipTxt2.width = 275;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop,tipTxt2,scene2,[42,85]);
		view.addChildToContainer(tipTxt2);
		
	}
	
	protected getShowHeight():number{
		return 745;
	}

	protected getShowWidth():number{
		return 560;
	}

	protected getTitleStr():string{
		return `acNewYearCrackerDetailTitle-${this.code}`;
	}

	public dispose():void{
		super.dispose();
	}
}