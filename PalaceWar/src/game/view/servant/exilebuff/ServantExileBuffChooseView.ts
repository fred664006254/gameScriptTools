/**
 * 门客出海舰队buff 选择门客
 * author shaolaing
 * date 2020/5/21
 * @class ServantExileBuffChooseView
 */

class ServantExileBuffChooseView  extends PopupView
{
    public constructor() {
		super();
	}

    protected getBgExtraHeight():number
	{
		return 20;
	}

    protected getTitleStr():string
	{
		return "allianceWarSelectServantPopupViewTitle";
	}

    public initView():void
    {

        let itemBg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		itemBg.width = 530;
		itemBg.height = 710;
        itemBg.setPosition(this.viewBg.width/2-itemBg.width/2,8);
		this.addChildToContainer(itemBg);

        let servantList = Api.servantVoApi.getServantInfoIdListWithSort(2);

        let posId = this.param.data.pos;
        let seatInfo = Api.servantExileVoApi.getServantExileInfoForKey(String(posId));

        if (!seatInfo)
        {
            this.hide();
            return;
        }

        let lisInfo:any[] = [];
        // 1,选择中 2,正常 3，已选择 。4，已免战 。 5，已流放
        for (let i = 0 ; i < servantList.length; i++)
        {
            let sid = servantList[i];
            let type = 2;
            let avoidState = Api.servantVoApi.getServantObj(sid).avoid;
            if (sid == seatInfo.buffSid)
            {
                type = 1;
            }
            else if (Api.servantExileVoApi.getIsBuffed(sid))
            {
                type = 3;
            }
            else if (avoidState == 2)
            {
                type = 4;
            }
            else if (Api.servantExileVoApi.getServantExileInfoForServantId(sid))
            {
                type = 5;
            }
            lisInfo.push([sid,type,seatInfo.buffSid?true:false]);
        }


          lisInfo.sort((a,b)=>{
                return a[1] - b[1]; 
            });


        let rect = egret.Rectangle.create();
        rect.setTo(0,0,510,itemBg.height-16);
        let list = ComponentManager.getScrollList(ServantExileBuffChooseItem, lisInfo, rect,{f:this.itemCallback,o:this});
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, list, itemBg);
        this.addChildToContainer(list);
    }

    private itemCallback(sid:string):void
    {
        let f:Function = this.param.data.f;
        let o:any = this.param.data.o;
        f.apply(o,[sid]);
        this.hide();
    }

    public dispose():void
	{
		super.dispose();
	}
}