class SearchBiographyScrollItem extends ScrollListItem
{

    public constructor() 
	{
		super();
	}

	protected initItem(index:number,data:any)
	{	
        let bg = BaseBitmap.create("biographyview_atticbg2");
        this.addChild(bg);

        /*
        {
                "name":"张三",
                "title":"{"clothes":"3806","title":"3806","clv":1,"tlv":1}",
                "id":"1001",
                "st":"1580572800",
                "uid":"1000563",
                "power":"978017",
                "pic":"5",
                "zid":"1"
            },
            */

        //玩家形象
        let titleId = data.level;
        if (data.title && data.title.clothes && data.title.clothes!="")
        {
            titleId  = data.title.clothes;
        }
        // titleId="3151";
        let player = Api.playerVoApi.getPlayerPortrait(titleId,data.pic);
        player.y = 25;

        let rect = new egret.Rectangle();
        player.y = 25;
        rect.setTo(0,0,player.width,240);
        if ( titleId=="3151")
        {   
            if (Api.playerVoApi.getUserSex(data.pic) == 1)
            {
                player.y = 0;
                rect.setTo(0,0,player.width,267);
            }
            else
            {
                player.y = -20;
                rect.setTo(0,0,player.width,288);
            }
            
        }

        if (player.width>340)
        {
            player.x = (340-player.width)/2;
        }
        
        player.setScale(0.9);
        this.addChild(player);
        player.mask = rect;

        // if (titleId)
        // {
        //     if (Config.TitleCfg.checkHasSpecialHead(titleId))
        //     {
        //         player.y = -75;

        //         let rect = new egret.Rectangle();
        //         rect.setTo(player.width/2-141,0,player.width,240+110);
        //         player.mask = rect;
        //     }

        // }

        if (data.title && data.title.title && data.title.title!="")
        {
            let titleIcon:BaseDisplayObjectContainer = App.CommonUtil.getTitlePic( data.title.title,data.title.tlv);
            // BaseLoadBitmap.create(Config.TitleCfg.getTitleCfgById(data.title.title).titleIcon3);
			titleIcon.setScale(0.8);
			titleIcon.setPosition(70,190);
			this.addChild(titleIcon);
        }

        //右侧信息
        let rightContainer = Api.biographyVoApi.getBookInfoContainerByInfo(data);
        rightContainer.setPosition(228,28);
        this.addChild(rightContainer);

        rightContainer.addTouchTap(this.showInfo,this,data);
        
        this.height = bg.height+10;
    }

    private showInfo(event:egret.Event,data:any):void
	{	
		// let info = {
		// 	zid:Api.mergeServerVoApi.getTrueZid(Api.playerVoApi.getPlayerID()),
		// 	name:Api.playerVoApi.getPlayerName(),
		// 	level:Api.playerVoApi.getPlayerLevel(),
		// 	uid:Api.playerVoApi.getPlayerID(),
		// 	pic:Api.playerVoApi.getPlayePicId(),
		// 	id:data.id,
		// 	st:data.ts,
		// 	title:Api.playerVoApi.getTitleInfo(),
		// }

		Api.biographyVoApi.showInfo = data;

		ViewController.getInstance().openView(ViewConst.COMMON.BIOGRAPHYSHOWVIEW,{});
	}

    public getSpaceY():number
	{
		return 10;
	}

	public dispose():void
	{

		super.dispose();
	}
}