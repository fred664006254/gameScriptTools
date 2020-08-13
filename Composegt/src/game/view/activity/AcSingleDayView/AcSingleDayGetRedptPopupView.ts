/**
 * 获得代金券
 * author qianjun
 */
class AcSingleDayGetRedptPopupView extends PopupView
{

	public constructor() 
	{
		super();
	}

	private get cfg() : Config.AcCfg.SingleDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcSingleDayVo{
        return <AcSingleDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

    private get acTivityId() : string{
        return `${this.param.data.aid}-${this.param.data.code}`;
	}

	protected getTitleStr():string{
		return 'itemBtn';
	}

	protected initView():void
	{
		let view = this;
		let data = this.param.data;
		let itemid = data.id;

		let bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		bg.width = 540;
		bg.height = 250;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		view.addChildToContainer(bg);

		let itemcfg = view.cfg.coupon[itemid - 1];
		let descTxt1 = ComponentManager.getTextField(LanguageManager.getlocal('acSingleDayGetRed'), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descTxt1, bg, [0,20]);
		view.addChildToContainer(descTxt1);
		// let iconPic:string = data.icon;
		// let iconBg:string = data.iconBg;
		// let msg:string = data.msg;
		// let num = data.num;
		// let useNum = data.useNum || 0;

		let bg2:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		bg2.width = 515;
		bg2.height = 150;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg2, descTxt1, [0,descTxt1.textHeight + 10]);
		view.addChildToContainer(bg2);

		let cor1 = BaseBitmap.create("public_tcdw_bg01");
		cor1.x = bg2.x;
		cor1.y = bg2.y;
		this.addChildToContainer(cor1);

		let cor2 = BaseBitmap.create("public_tcdw_bg02");
		cor2.x = bg2.x + bg2.width-cor2.width;
		cor2.y = bg2.y;
		this.addChildToContainer(cor2);

		let icon = GameData.getRewardItemIcons(`25_${itemid}_1_${view.cfg.coupon[itemid - 1].value}`, true, false)[0];
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, bg2);
		view.addChildToContainer(icon);
	}

	protected resetBgSize():void
	{
		super.resetBgSize();
		let view : any = this;
		// view.setLayoutPosition(LayoutConst.leftbottom, view._cancelBtn, view._bg, [65,10]);
		// view.setLayoutPosition(LayoutConst.rightbottom, view._confirmBtn, view._bg, [65,10]);
		//this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/4*3 - this._cancelBtn.width/2 - 35,this._cancelBtn.y);
	}

	protected clickConfirmHandler(data:any):void
	{
		this.hide();
	}

	protected getConfirmBtnStr():string
	{
		return "sysConfirm";
	}

	// protected getContainerY():number
	// {
	// 	return 0;
	// }

	private clickCancelHandler(param:any):void
	{
		this.hide();
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		]);
	}

	protected getConfirmBtnName():string
	{
		return ButtonConst.BTN_NORMAL_YELLOW;
	}

	public dispose():void
	{
		super.dispose();
	}
}