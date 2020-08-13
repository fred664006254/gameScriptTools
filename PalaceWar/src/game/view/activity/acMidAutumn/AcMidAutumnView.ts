/**
  * 中秋活动
  * @author 张朝阳
  * date 2018/8/28
  * @class AcMidAutumnView
  */
class AcMidAutumnView extends AcCommonView {

	private _midBg:BaseLoadBitmap = null;
	private _butttomBg:BaseLoadBitmap = null;
	public constructor() {
		super();
	}


	protected getContainerY():number
	{
		return 0;
	}

		/**获取资源数组 */
	protected getResourceList(): string[]
	{
		let list:string[] =[];
		if (this.code == "5" || this.code == '6'){
			list = [
				'herosavebeauty_rewordshowbtn-5', 'herosavebeauty_rewordshowbtn-5_down', 'herosavebeauty_dongzhuo_1-5','herosavebeauty_dongzhuo_2-5',
			];
		}
		return super.getResourceList().concat(["common_box_1","common_box_2","common_box_3","common_boxbg","common_numbg",
		"progress7_bg","progress7","acturantable_taskbox_light","gress3","gress2","gress1",
		'herosavebeauty_introbtn','herosavebeauty_introbtn_down','herosavebeauty_rewordshowbtn_down','herosavebeauty_rewordshowbtn',
		'herosavebeauty_dongzhuo_1','herosavebeauty_dongzhuo_2', 'herosavebeauty_introbtn-5', 'herosavebeauty_introbtn-5_down'
		]).concat(list);
	}
	public initView()
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACMIDAUTUMN_TASKANDRECHARGE,this.refreshView,this);
		let topBg = BaseLoadBitmap.create("acmidautumnview_topbg")
		topBg.height = 70;
		topBg.width = 640;
		topBg.setPosition(0,- this.getTabbarGroupY() - this.getContainerY() - 60 - 5);
		this.addChildToContainer(topBg);

		this._butttomBg = BaseLoadBitmap.create("dragonboattab1bg");
		this._butttomBg.width = 640;
		this._butttomBg.height = GameConfig.stageHeigth - topBg.height - this.getTabbarGroupY() - this.getContainerY() - 70 ;
		this._butttomBg.setPosition(topBg.x,topBg.y + topBg.height - 8);
		this.addChildToContainer(this._butttomBg);
		this.refreshView();
	}
	/**
	 * 刷新UI
	 */
	private refreshView()
	{
		let vo  = <AcMidAutumnVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		if(vo.isFree||vo.isHaveBoxDot())
		{
			this.addRedPoint(0);
		}
		else
		{
			this.removeRedPoint(0);
		}
		if(vo.isHaveTaskRedDot())
		{
			this.addRedPoint(1);
		}
		else
		{
			this.removeRedPoint(1);
		}
		if(vo.isHaveRechargeRedDot())
		{
			this.addRedPoint(2);
		}
		else
		{
			this.removeRedPoint(2);
		}
		
	}
	/**
	 * tabbar 的监听事件
	 */
	protected clickTabbarHandler(data:any):void
	{
        super.clickTabbarHandler(data);
    }
	/**
	 * 设置tabbar 的文本
	 */
	protected getTabbarTextArr():Array<string>
	{
		return [
			"acMidAutumnTitleTab1"+this.getLangCode(),
			"acMidAutumnTitleTab2",
			"acMidAutumnTitleTab3",
		];
	}

	private getLangCode():string{
		let code = '';
		if(this.code == '3'||this.code == '4' || this.code == '5' || this.code == '6'){
			code = '-'+this.code;
		}
		return code;
	}
	protected getRuleInfo():string
	{
		if(this.code == '3'||this.code == '4' || this.code == "5" || this.code == '6'){
			if(Api.switchVoApi.checkServantRefuseBattle()){
				return `acMidAutumnRule-${this.code}_with_OpenRefusal`;
			}
			return `acMidAutumnRule-${this.code}`;
		}else{
			if(Api.switchVoApi.checkServantRefuseBattle()){
				return "acMidAutumnRule_with_OpenRefusal";
			}
			return "acMidAutumnRule";
		}

    } 
	public dispose()
	{
		this._midBg = null;
		this._butttomBg = null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACMIDAUTUMN_TASKANDRECHARGE,this.refreshView,this);
		super.dispose();
	}
	
}