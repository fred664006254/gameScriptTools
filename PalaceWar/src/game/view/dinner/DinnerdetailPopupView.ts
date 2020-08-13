/**
 * 宴会记录详情
 * author sl
 * date 2019/3/28
 * @class DinnerdetailPopupView
 */

class DinnerdetailPopupView extends PopupView
{   
    private _scrollList:ScrollList;
    public constructor() {
		super();
	}

    protected getResourceList():string[]
	{

		return super.getResourceList().concat([
			"dinner_seat_special1",
			"dinner_seat_special2",
		]);
	}

    protected initView():void
	{
        let rankBg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		rankBg.width = 520;
		rankBg.height = 618;
		rankBg.setPosition(this.viewBg.width/2  - rankBg.width/2, 20);
		this.addChildToContainer(rankBg);

        let dtype:number = this.param.data.dtype;
        let info:any = this.param.data.info;
        let infoTab:any[] = [];
        for (let key in info)
        {
            infoTab.push(info[key]);
        }
        let totalSeat:number = Config.DinnerCfg.getFeastItemCfg(dtype).contain;
        for (let k:number = infoTab.length ; k<totalSeat; k++)
        {
            infoTab.push({});
        }

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,508,rankBg.height - 20);
		this._scrollList = ComponentManager.getScrollList(DinnerdetailPopupScollItem,infoTab,rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(rankBg.x + 5 ,rankBg.y + 10);
    }

    protected getBgExtraHeight():number
	{
		return 10;
	}

    public dispose():void
	{
        this._scrollList = null;

		super.dispose();
	}
}