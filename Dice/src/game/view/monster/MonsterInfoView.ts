/*
 *@description: boss 详情的列表信息
 *@author: hwc 
 *@date: 2020-04-21 13:06:23
 *@version 1.0.0
 */

class MonsterInfoView extends PopupView 
{

    public initView(){
        let bossData = Config.MonsterCfg.getBossKeys();
        let h = this.getShowHeight() - this._titleBg.height;
        let bosslist = ComponentMgr.getScrollList(MonsterItem,bossData,new egret.Rectangle(0,0,504,h));
        this.addChildToContainer(bosslist);
        bosslist.x = 9;
        bosslist.y = 0;
    }

    protected initBg(){
		super.initBg();
		this.viewBg.width = this.getShowWidth();
	}

    // 弹框面板高度，重新该方法后，不会动态计算高度
    protected getShowHeight():number
    {
        return 841;
    }

    // protected getTitleStr(){
    //     return "经典战场";
    // }

    // 背景图名称
    protected getBgName():string
    {
        return "ab_task_view_bg";
    }

    public dispose():void
    {
        super.dispose();
    }
}