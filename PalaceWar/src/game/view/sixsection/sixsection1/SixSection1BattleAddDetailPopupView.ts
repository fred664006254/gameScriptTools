/**
 * 门客加成详情
 * author ycg
 * date 2020.7.6
 */
class SixSection1BattleAddDetailPopupView extends PopupView
{
    public constructor() 
	{
		super();
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "threekingdomstaskflag","public_popupscrollitembg",
		]);
	}

    protected getTitleStr():string
    {
        return "sixSection1BattleDetail_buffdetail";
    }
    public initView():void
    {

        let itemBg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		itemBg.width = 530;
		itemBg.height = 660;
        itemBg.setPosition(this.viewBg.x+this.viewBg.width/2-itemBg.width/2,10);
		this.addChildToContainer(itemBg);

        let rect = egret.Rectangle.create();
		rect.setTo(0,0,522,itemBg.height-10);

        let info = this.param.data.info;
        let list = Api.sixsection1VoApi.getBaseBuffListById(info.id);
		let scrollList = ComponentManager.getScrollList(SixSection1BattleAddDetailScrollItem,list,rect,info);
		this.addChildToContainer(scrollList);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,scrollList,itemBg,[6,0]);
        
        let index = 0;
        for (let i=0; i < list.length; i++){
            if (i+1 == info.lv){
                index = i;
                break;
            }
        }
        scrollList.setScrollTopByIndex(index, 100);
    }
}