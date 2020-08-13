/**
 * 姻缘记录
 * author 钱竣
 */
class AdultYinYuanRecordView extends PopupView
{
	
	public constructor() 
	{
		super();
	}

	private get cfg() : any{
        return Config.SadunCfg;
    }

    private get api() : AdultVoApi{
        return <AdultVoApi>Api.adultVoApi;
    }
	
	protected getTitleStr() : string{
		let type = this.param.data.type;
		return type == 'marry' ? 'adultMarryOnsundan' : 'adultyinyuanrecord';
	}

	
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"public_listbtn","friends_arrow2","progress_type1_yellow2","progress_type3_bg",
		]);
	}

	// protected resetBgSize() : void{
	// 	if(this.getBgName() != "public_rule_bg")
	// 	{
	// 		this.closeBtn.y = this.viewBg.y - 40;
	// 		this.closeBtn.x = PlatformManager.hasSpcialCloseBtn()? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 40);
	// 	}
	// 	else
	// 	{
	// 		this.closeBtn.y = this.viewBg.y - 18;
	// 		this.closeBtn.x = PlatformManager.hasSpcialCloseBtn()? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 37);
	// 	}
	// }

	protected initView():void
	{
		let view = this;
		let type = view.param.data.type;
		view.viewBg.height = 850;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULT_CHOOSE_SADUNMARRY,this.chooseSadunMarry,this);
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.viewBg, view);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, view.titleTF, view.viewBg, [0,12]);

		let bg : BaseBitmap = BaseBitmap.create("public_tc_bg01");
		bg.width = 550;
		bg.height = 740;
		bg.x = this.viewBg.width/2 - bg.width/2;
		bg.y = 10;
		view.addChildToContainer(bg);

		let rbg:BaseBitmap = BaseBitmap.create("public_9v_bg02");
		rbg.width = bg.width - 20;
		rbg.height = bg.height - 20;
		rbg.setPosition(bg.x+(bg.width-rbg.width)/2,bg.y + 10);
		this.addChildToContainer(rbg);

		let arr = [];
		let info = Api.adultVoApi.getALlMarryPlayerInfo();
        for(let i = 0; i < 2; ++ i){
			arr.push({
				index : Number(i),
				param : i == 0 ? 'sadun' : 'notsadun',
				type : type,
				show : true,
				childid : this.param.data.childid
			});
		}
        let tmpRect =  new egret.Rectangle(0,0,530,bg.height - 20);
		let scrollList = ComponentManager.getScrollList(AdultYinYuanRecordScrollItem, arr, tmpRect);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, bg, [0, 10]);
		view.addChildToContainer(scrollList);
	}

	private chooseSadunMarry(evt):void{
		let data = evt.data;
		this.param.data.confirmCallback.apply(this.param.data.handler,[data.fuid]);
		this.hide();
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ADULT_CHOOSE_SADUNMARRY,this.chooseSadunMarry,this);
		super.dispose();
	}
}