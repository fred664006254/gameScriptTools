/**
 * 建筑详情
 * author 钱竣
 * date 2017/9/28
 * @class ZhenqifangSelectServantView
 */
class ZhenqifangBuildLevelDetailView extends PopupView
{

	public constructor() 
	{
		super();
	}

    protected getTitleStr():string{
        return `zhengqifangleveldetail`;
    }

	protected getResourceList():string[]
	{
		let resArr:string[]=[`zqffinished`, `rankactivenamebg`,`battlepassline-1`,`zqffinished2`,`zqfselected`];
		return super.getResourceList().concat(resArr);
	}
	/**
	 * 需要传的参数{callback：回调函数，handler:回调函数所属对下，type：面板类型（1，2，3），itemId：使用道具时传}
	 */
	protected initView():void
	{
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 670;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 15;
		this.addChildToContainer(bg);

        let rect = egret.Rectangle.create();
        let arr = [];
        for(let i in Config.ZhenqifangCfg.taskHouse){
            arr.push(Config.ZhenqifangCfg.taskHouse[i]);
        }
        rect.setTo(0,0,bg.width - 10,bg.height - 20);
        let list : ScrollList = null;
        list = ComponentManager.getScrollList(ZhenqifangBuildLevelItem,arr,rect);
        list.setPosition(bg.x + 10,bg.y + 10);
        this.addChildToContainer(list);


        let level = Api.zhenqifangVoApi.ZhenqifangLevel;
        if(level){
            list.setScrollTopByIndex(level - 1);
        }
	}

	protected getBgExtraHeight():number
	{
		return 40;
	}

	public dispose():void
	{
		super.dispose();
	}
}