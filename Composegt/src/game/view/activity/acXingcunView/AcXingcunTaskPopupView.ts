class AcXingcunTaskPopupView  extends PopupView
{
    public constructor() {
		super();
	}
    public static THEDAY:number = 1;
    protected initView():void
	{
        let aid = this.param.data.aid;
        let code = this.param.data.code;
        let day = this.param.data.day;

        let cfg = <Config.AcCfg.XingcunCfg>Config.AcCfg.getCfgByActivityIdAndCode(aid,code);
        let task = cfg.dailyTask[""+day];
        AcXingcunTaskPopupView.THEDAY = day;
  
        task.sort((dataA:any,dataB:any)=>{
            return Number(dataA.id) < Number(dataB.id);
        });
        let tmpList = [];
        for (var index = 0; index < task.length; index++) {
            var element = task[index]; //过滤第一条任务
            if (element.questType != 1001){
                 tmpList.push(task[index]);
            }
        }
        // task.shift();
        let titleImg = BaseLoadBitmap.create("xingcun_day"+day);
        titleImg.width = 154;
        titleImg.height = 68;
        titleImg.x = GameConfig.stageWidth/2 - titleImg.width/2;
        titleImg.y = 30;
        this.addChildToContainer(titleImg);

        let rect = new egret.Rectangle(0,0,560,700);
        let scrollView = ComponentManager.getScrollList(AcXingcunTaskScrollItem,tmpList,rect);
        scrollView.horizontalScrollPolicy = "off";
        scrollView.x = GameConfig.stageWidth/2-scrollView.width/2;
        scrollView.y = 112;
        this.addChildToContainer(scrollView);
    }

    protected getShowHeight():number
	{
		return 850;
	}

   protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		]);
	}
   // 背景图名称
	protected getBgName():string
	{
		return "xingcun_bg2";
	}
	// 标题背景名称
	protected getTitleBgName():string
	{
		return null;
	}
    protected getTitleStr():string
	{
		return null;
	}
	// 关闭按钮图标名称
	protected getCloseBtnName():string
	{
		return "btn_lantern";
	}
    public dispose()
    {
        super.dispose()
    }
}