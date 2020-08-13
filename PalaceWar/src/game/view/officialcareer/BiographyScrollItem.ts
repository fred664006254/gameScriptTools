class BiographyScrollItem extends ScrollListItem
{

    public constructor() 
	{
		super();
	}

	protected initItem(index:number,data:any)
	{	
		let type = 0;
		if (index == 0 || data.newType)
		{
			type = data.type;
		}

		let posY = 10;
		//大标题
		if (type)
		{
			posY += 115;

			let topbg = BaseBitmap.create("biographyview_bg"+(type+1));
			topbg.setPosition(GameConfig.stageWidth/2-topbg.width/2,0);
			this.addChild(topbg);

			let namebitmap = BaseBitmap.create("biography_name"+type);
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter,namebitmap,topbg,[45,0]);
			this.addChild(namebitmap);

			let textbg = BaseBitmap.create("acluckycarpviewcommonwordbg");
			textbg.width = 612;
			textbg.setPosition(GameConfig.stageWidth/2-textbg.width/2,topbg.y+topbg.height+7);
			this.addChild(textbg);

			let desctext = ComponentManager.getTextField(LanguageManager.getlocal("biography_desc_type"+type),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW); 
			desctext.width = textbg.width-40;
			desctext.textAlign = egret.HorizontalAlign.CENTER;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,desctext,textbg);
			this.addChild(desctext);

		}

		if (data.empty)
		{	
			this.height = GameConfig.stageHeigth/2-100;

			let emptytext = ComponentManager.getTextField(LanguageManager.getlocal("biography_empty"),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_WHITE); 
			emptytext.setPosition(GameConfig.stageWidth/2-emptytext.width/2,this.height/2+45);
			this.addChild(emptytext);
			return;
		}
		
		if (data.btype)
		{
			
			let topbg = BaseBitmap.create("biographyview_titlebg"+data.btype);
			topbg.setPosition(GameConfig.stageWidth/2-topbg.width/2,posY-3);
			this.addChild(topbg);

			let name = ComponentManager.getTextField(LanguageManager.getlocal("biography_type"+data.btype),TextFieldConst.FONTSIZE_CONTENT_SMALL);
			if (data.btype == 1)
			{
				name.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
			}
			else
			{
				name.textColor = TextFieldConst.COLOR_QUALITY_YELLOW;
			}
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,name,topbg);
			this.addChild(name);

			posY += 50;
		}

		// let bg1 = BaseBitmap.create("biographyview_bg5");
		// bg1.y = posY-10;
        // this.addChild(bg1);

		let bg = BaseBitmap.create("biography_shelf");
		bg.y = posY-10;
        this.addChild(bg);

		// bg1.height = bg.height;

		let leftContainer = Api.biographyVoApi.getBookInfoContainerByInfo(data.info[0],true);
        leftContainer.setPosition(43,posY);
        this.addChild(leftContainer);
		leftContainer.addTouchTap(this.showInfo,this,data.info[0]);

		if (data.info[1])
		{
			let rightContainer = Api.biographyVoApi.getBookInfoContainerByInfo(data.info[1],true);
			rightContainer.setPosition(328,posY);
			this.addChild(rightContainer);

			rightContainer.addTouchTap(this.showInfo,this,data.info[1]);
		}
        
        this.height =bg.y+ bg.height+10;
	}

	private showInfo(event:egret.Event,data:any):void
	{	
		let info = {
			zid:Api.mergeServerVoApi.getTrueZid(Api.playerVoApi.getPlayerID()),
			name:Api.playerVoApi.getPlayerName(),
			level:Api.playerVoApi.getPlayerLevel(),
			uid:Api.playerVoApi.getPlayerID(),
			pic:Api.playerVoApi.getPlayePicId(),
			id:data.id,
			st:data.ts,
			title:Api.playerVoApi.getTitleInfo(),
		}

		Api.biographyVoApi.showInfo = info;

		ViewController.getInstance().openView(ViewConst.COMMON.BIOGRAPHYSHOWVIEW,{});
	}

	public dispose():void
	{

		super.dispose();
	}
}