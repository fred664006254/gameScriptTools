
class DinnerMsgPopupScollItem extends ScrollListItem
{
	private _data;

	public constructor() {
		super();
	}

	protected initItem(index:number,data:any)
    {		
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_HISTORYDETAILS),this.clickCallback,this);

		this.width = 502;
        this.height = 124;
		this._data = data;

         let rankImg = BaseBitmap.create("dinner_rankbg")
		rankImg.x = 37-rankImg.width/2;
		rankImg.y = 20;
		this.addChild(rankImg);

		let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		rankTxt.text = String(index+1);
		rankTxt.x = rankImg.x + rankImg.width/2 - rankTxt.width/2;
		rankTxt.y = rankImg.y + rankImg.height/2 - rankTxt.height/2;
		this.addChild(rankTxt);
		
		let type = LanguageManager.getlocal("dinnerTitle" + data.dtype);
		let descStr = LanguageManager.getlocal("dinnerMsgDesc",[type,data.num,data.enemy_num])
        let descTxt = ComponentManager.getTextField(descStr,TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
		descTxt.x = 70;
        descTxt.y =  rankImg.y;
		descTxt.width = 435;
        this.addChild(descTxt);


		let timeStr = LanguageManager.getlocal("dinnerMsgTime",[App.DateUtil.getFormatBySecond(data.start_time,2)]) ;
		let timeTxt = ComponentManager.getTextField(timeStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		timeTxt.textColor = TextFieldConst.COLOR_QUALITY_ORANGE;
		timeTxt.x = descTxt.x;
        timeTxt.y =  descTxt.y + descTxt.height + 13;
        this.addChild(timeTxt);

		let score1 = data.point;
		let score2 = data.score;
		if(score1 >= 0){
			score1 = "+" + score1; 
		}
		if(score2 >= 0){
			score2 = "+" + score2; 
		}

		let scoreStr = LanguageManager.getlocal("dinnerMsgInfo",[score1,score2]);
		let scoreTxt = ComponentManager.getTextField(scoreStr,TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
		scoreTxt.x = descTxt.x;
		scoreTxt.width = 435;
		scoreTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
        scoreTxt.y =  timeTxt.y + timeTxt.height + 13;
        this.addChild(scoreTxt);
		
		//描述文本过长换行，增加整体高度
		this.height += scoreTxt.height - 20;
		this.height += descTxt.height - 20;

        let lineImg = BaseBitmap.create("dinner_line");
        lineImg.x = 520 /2 - lineImg.width/2;
        lineImg.y = this.height;

		this.addChild(lineImg);
		
		if (data.hasDetail)
		{
			// if (this.getDinnerDetailScore() == data.score)
			// {
				let btn:BaseButton = ComponentManager.getButton("dinner_detail","",this.clickBtnHandler,this);
				btn.setPosition(this.width-btn.width -16, this.height/2 - btn.height/2);
				this.addChild(btn);
			// }
		}

		rankImg.y += 20;
		rankTxt.y += 20;
	}

	private getDinnerDetailScore():number
	{
		let s:number = 0;
		let dtype:number = this._data.dtype;
        let info:any = this._data.detail;
		let k:number =0;
        for (let key in info)
        {	
			let itemCfg:any = Config.DinnerCfg.getGoToFeastItemCfg(info[key].dtype);
            let point:number = itemCfg.getPoint;
			s+=point;

            k++;
        }
        let totalSeat:number = Config.DinnerCfg.getFeastItemCfg(dtype).contain;
		let addScore:number = Config.DinnerCfg.getAddScore();
        for (; k<totalSeat; k++)
        {
            s+=addScore;
        }

		return s;
	}

	private clickBtnHandler():void
	{	
		NetManager.request(NetRequestConst.REQUEST_DINNER_HISTORYDETAILS,{dinnerId:this._data.id});
	}

	private clickCallback(event: egret.Event):void
	{	
		if(event.data.ret)
		{
			if(event.data.data.data.dinnerDetails)
			{
				ViewController.getInstance().openView(ViewConst.POPUP.DINNERDETAILPOPUPVIEW,{dtype:this._data.dtype, info:event.data.data.data.dinnerDetails})
			}
			else
			{
				
			}
		}	
	}

	public dispose():void
    {

		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_HISTORYDETAILS),this.clickCallback,this);
		this._data = null;

        super.dispose();
    }
}