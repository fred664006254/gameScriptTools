
/**
 * 选择列表
 * author shaoliang
 */
class ChooseList extends BaseDisplayObjectContainer
{   

   
    public constructor() {
		super();
	}
    
    public init(strings:string[],w:number,f:Function,o:any):void
	{   
        
        let max = 8;
        let h = 32*max;
        if (strings.length < max)
        {
            h = 32*strings.length;
        }

        let bg = BaseBitmap.create("public_9_bg8");
        bg.width = w+3;
        bg.height = h+2;
        bg.setPosition(-1,-1);
        this.addChild(bg);

        let rect = new egret.Rectangle(0, 0, w+1, h);
        let list = ComponentManager.getScrollList(ChooseListItem, strings, rect , {w:w,o:o,f:f});
        list.bounces = false;
        this.addChild(list)
    }

    public dispose():void
	{
		super.dispose();
	}
}