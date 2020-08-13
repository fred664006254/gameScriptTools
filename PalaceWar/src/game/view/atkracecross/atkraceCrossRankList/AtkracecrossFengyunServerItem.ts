class AtkracecrossFengyunServerItem extends ScrollListItem
{
	public constructor() {
		super();
	}

	protected initItem(index:number,data:any)
    {
		this.width = 520;;
		this.height = 75;
		this._data = data;

        let tarColor = TextFieldConst.COLOR_BROWN;
        if(data.id){
            if( data.id == Api.playerVoApi.getPlayerAllianceId())
            {
                tarColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
        }

		let rankTxt = ComponentManager.getTextField(String(index+1),TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor);
	   
		let namestr = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,data.zid);
        let nameTxt = ComponentManager.getTextField(namestr,TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor);

		let scoreTxt = ComponentManager.getTextField(String(data.point),TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor);
		
		if(data.type && data.type == 'rank'){
			this.width = 520;
			let desc = (570 - this.width) / 2;
			let param = [65 - desc , 236 - desc, 407 - desc];
			if (index < 3)
			{
				let rankbg = BaseBitmap.create("rankbgs_"+String(index+1));
				rankbg.width = 520;
				rankbg.height = 75;
				this.addChild(rankbg);				

				let rankImg = BaseBitmap.create("rankinglist_rankn" + String(index+1))
				rankImg.x = param[0] + (44 - rankImg.width) / 2;;//GameConfig.stageWidth/2 - 155 - rankImg.width / 2;
				rankImg.y = this.height/2 - rankImg.height/2;
				this.addChild(rankImg);
				rankTxt.visible = false;
			}else
			{
				let rankbg = BaseBitmap.create("rankbgs_4");
				rankbg.width = 520;
				rankbg.height = 75;
				this.addChild(rankbg);

				rankTxt.x = param[0] + (44 - rankTxt.textWidth) / 2;
				rankTxt.y = this.height/2 - rankTxt.height/2;
			}
			nameTxt.x = param[1] + (44 - nameTxt.textWidth) / 2;;//GameConfig.stageWidth/2 - serverTxt.textWidth/2;
			nameTxt.y = this.height/2 - nameTxt.textHeight/2;
	
			scoreTxt.x = param[2] + (88 - scoreTxt.textWidth) / 2;//GameConfig.stageWidth/2 + 155 - scoreTxt.textWidth/2;
			scoreTxt.y = this.height/2 - scoreTxt.textHeight/2;
		}
		else{
			rankTxt.setPosition(GameConfig.stageWidth/2 - 155 - rankTxt.width/2, this.height/2 - rankTxt.height/2);
			nameTxt.x = GameConfig.stageWidth/2 - nameTxt.width/2;
			nameTxt.y =  rankTxt.y;
			scoreTxt.x = GameConfig.stageWidth/2 + 155 - scoreTxt.width/2;
			scoreTxt.y = rankTxt.y;
		}

		this.addChild(rankTxt);
		this.addChild(nameTxt);
		this.addChild(scoreTxt);
	
		// if(Api.mergeServerVoApi.judgeIsSameServer(data.zid, Api.mergeServerVoApi.getTrueZid())){
		// 	nameTxt.textColor = scoreTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN; 
        //     if(rankTxt){
        //         rankTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
        //     }
        // }
		
		this.addTouchTap(this.rankClick, this);
	}

	private _data : any = null;

	private rankClick():void{
		let view = this;
		if(this._data.type == 'rank'){
			ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSRANKLISTVIEW, {
				zid : this._data.zid,
				acid : this._data.acid
			});
		}
    }

	public dispose():void
    {
		this.removeTouchTap();
		super.dispose();
    }
}