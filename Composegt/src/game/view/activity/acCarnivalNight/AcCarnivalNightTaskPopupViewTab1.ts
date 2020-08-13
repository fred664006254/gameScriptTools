
class AcCarnivalNightTaskPopupViewTab1 extends PopupViewTab
{


	public _bg:BaseBitmap=null;
    private _scrollList:ScrollList = null;
    private code = null;
    private aid = null;
	private _taskList :any[] = null;
    public constructor(param:any) 
	{
       
		super();
        this.aid = param.data.aid;
        this.code = param.data.code;
        
        
		this.initView();
	}
	
	public initView():void
	{

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_CARNIVALNIGHT_FRESH_ITEM,this.refreshData,this);
		this._bg= BaseBitmap.create("public_tc_bg01");
		this._bg.width=535;
		this._bg.height=608;
		// this._bg.x =45;
		// this._bg.y =55;

		this._bg.x =GameConfig.stageWidth/2 - this._bg.width/2 -5;
		this._bg.y =75;

		this.addChild(this._bg);
		
        this.showList();
    }

    private get cfg() : Config.AcCfg.CarnivalNightCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcCarnivalNightVo{
        return <AcCarnivalNightVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }
   public showList(): void 
   {
	
	   if(this._scrollList==null)
	   {
			let dayTaskList = this.vo.getSortTask(1);//this.cfg.getTaskListById(1);
			// this._taskList = dayTaskList;
			dayTaskList.sort((a:Config.AcCfg.CarnivalNightTaskItemCfg,b:Config.AcCfg.CarnivalNightTaskItemCfg) =>{return a.sortId - b.sortId});

		    let rect = egret.Rectangle.create();
			rect.setTo(0, 0, 516, 585);
			this._scrollList = ComponentManager.getScrollList(AcCarnivalNightTaskScrollItem, dayTaskList, rect,{aid:this.aid,code:this.code});
			this.addChild(this._scrollList);
			this._scrollList.setPosition(GameConfig.stageWidth/2 - this._scrollList.width/2 - 5, 85); 
	   }
	}
	private refreshData()
	{
		if(this._scrollList){
			let dayTaskList = this.vo.getSortTask(1);
			dayTaskList.sort((a:Config.AcCfg.CarnivalNightTaskItemCfg,b:Config.AcCfg.CarnivalNightTaskItemCfg) =>{return a.sortId - b.sortId});
			this._scrollList.refreshData(dayTaskList,{aid:this.aid,code:this.code});
		}
	}


    public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CARNIVALNIGHT_FRESH_ITEM,this.refreshData,this);
		this._scrollList=null;

	
		this._bg = null;
        this.aid = null;
        this.code = null;
        this._taskList = null;
		super.dispose();
   }
}