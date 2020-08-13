

class EmperorwarReplayPopupView extends PopupView
{	

	private _reportVoApi:EmperorwarReportVoApi = null;
    public constructor() {
		super();
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "emphfangbg",
			"atkrace_vs",
			"atkracecross_win",
			"atkracecross_loss",
        ]);
	}

	protected getRequestData():{requestType:string,requestData:any}
	{	
		return {requestType:NetRequestConst.REQUEST_EMPEROR_GETFIGHTLOG,requestData:{pos:this.param.data.id,version:Api.emperorwarVoApi.getVersion()}};

		// this.param = {data: {id:2}};
		// return {requestType:NetRequestConst.REQUEST_EMPEROR_GETFIGHTLOG,requestData:{pos:this.param.data.id,version:1530403200}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{	
		if(data.ret==true&&data.data&&data.data.data.log)	
		{
			this._reportVoApi = new EmperorwarReportVoApi();

			if (data.data.data.log.length < 1)
			{	
				this.requestLoadError();
				return;
			}

			this._reportVoApi.formatData(data.data.data.log);
		}
	}


    protected initView():void
	{
		let replayBg:BaseBitmap = BaseBitmap.create("emphfangbg");
		replayBg.setPosition(this.viewBg.width/2  - replayBg.width/2, 0);
		this.addChildToContainer(replayBg);

		this.container.height = replayBg.height;

		let vsIcon:BaseBitmap = BaseBitmap.create("atkrace_vs");
		vsIcon.setScale(130/vsIcon.width);
		vsIcon.setPosition(this.viewBg.width/2  - vsIcon.width/2*vsIcon.scaleX, replayBg.y+30);
		this.addChildToContainer(vsIcon);

		let lun:number = Number(this.param.data.id);
		if (lun <=4) 
		{
			lun =1;
		}
		else if (lun <=6)
		{
			lun =2;
		} 
		else {
			lun =3;
		}

		let someFight:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarSomeFight",[String(lun)]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		someFight.setPosition(this.viewBg.width/2  - someFight.width/2, replayBg.y+15);
		this.addChildToContainer(someFight);

		let resultIcon1:string ;
		let resultIcon2:string ;
		if ( this._reportVoApi.getBattleWin()==1)
		{
			resultIcon1 = "atkracecross_win";
			resultIcon2 = "atkracecross_loss";
		}
		else 
		{
			resultIcon2 = "atkracecross_win";
			resultIcon1 = "atkracecross_loss";
		}
		let result1:BaseBitmap = BaseBitmap.create(resultIcon1);
		result1.setPosition(185+GameData.popupviewOffsetX, replayBg.y+120);
		this.addChildToContainer(result1);

		let result2:BaseBitmap = BaseBitmap.create(resultIcon2);
		result2.setPosition(350+GameData.popupviewOffsetX, result1.y);
		this.addChildToContainer(result2);

		let info:any[] = this._reportVoApi.getCompetitorInfo(1);

		// let playerHead1 = Api.playerVoApi.getPlayerCircleHead(info[0].pic,info[0].phototitle);
		let playerHead1 = Api.playerVoApi.getPlayerCircleHead(info[0].pic,info[0].phototitle);
		playerHead1.setPosition(25+GameData.popupviewOffsetX ,replayBg.y+35);
		this.addChildToContainer(playerHead1);

		if (info[1].pic)  
		{
			// let playerHead2 = Api.playerVoApi.getPlayerCircleHead(info[1].pic,info[1].phototitle);
			let playerHead2 = Api.playerVoApi.getPlayerCircleHead(info[1].pic,info[1].phototitle);
			playerHead2.setPosition(this.viewBg.width-playerHead2.width-25 -GameData.popupviewOffsetX,playerHead1.y);
			this.addChildToContainer(playerHead2);
		}
		
		let playerName1:BaseTextField = ComponentManager.getTextField(info[0].name,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		playerName1.setPosition(25+GameData.popupviewOffsetX, replayBg.y+140);
		this.addChildToContainer(playerName1);

		let playerName2:BaseTextField = ComponentManager.getTextField(info[1].name ? info[1].name : LanguageManager.getlocal("nothing"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		playerName2.setPosition(this.viewBg.width-playerName2.width-25-GameData.popupviewOffsetX, playerName1.y);
		this.addChildToContainer(playerName2);

		if (playerName1.width < 86)
		{
			playerName1.x = 25 + (86 - playerName1.width)/2+GameData.popupviewOffsetX;
		}
		if (playerName2.width < 120)
		{
			playerName2.x = this.viewBg.width-playerName2.width-25 - (120 - playerName2.width)/2-GameData.popupviewOffsetX;
		}

		
		let rankpower1:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankpower")+":"+info[0].power,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankpower1.setPosition(replayBg.x+142-rankpower1.width/2, replayBg.y+184);
		this.addChildToContainer(rankpower1);

		let pwer2:number = info[1].power ? info[1].power : 0;
		let rankpower2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankpower")+":"+pwer2,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankpower2.setPosition(replayBg.x+replayBg.width-142-rankpower2.width/2, rankpower1.y);
		this.addChildToContainer(rankpower2);

		let popular1:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarPopular")+":"+info[0].cheer,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		popular1.setPosition(replayBg.x+142-popular1.width/2,  replayBg.y+208);
		this.addChildToContainer(popular1);

		let cheer2:number = info[1].cheer ? info[1].cheer : 0;
		let popular2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarPopular")+":"+cheer2,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		popular2.setPosition(replayBg.x+replayBg.width-142-popular2.width/2, popular1.y);
		this.addChildToContainer(popular2);

		let beatStr:string;
		if (info[1].name)
		{	
			if ( this._reportVoApi.getBattleWin()==1)
			{
				beatStr = LanguageManager.getlocal("emperorWarBeat",[info[0].name,info[1].name]);
			}
			else
			{
				beatStr = LanguageManager.getlocal("emperorWarBeat",[info[1].name,info[0].name]);
			}
		}
		else 
		{
			beatStr = LanguageManager.getlocal("emperorWarBeat2",[info[0].name]);
		}

		let beat:BaseTextField = ComponentManager.getTextField(beatStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		beat.width = 520; 
		beat.textAlign = egret.HorizontalAlign.CENTER;
		beat.setPosition(this.viewBg.width/2-beat.width/2, replayBg.y+265);
		this.addChildToContainer(beat);

		let replayBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"emperorWarReplay",this.doReplay,this);
		replayBtn.setPosition(this.viewBg.width/2-replayBtn.width/2, beat.y+beat.height+21);
		this.addChildToContainer(replayBtn);

		if (!info[0].name || !info[1].name)
		{
			replayBtn.setEnable(false);
		}
		if(PlatformManager.checkIsEnSp())
		{
			replayBtn.setPosition(this.viewBg.width/2-replayBtn.width/2, beat.y+beat.height+14);
		}
    }

	private doReplay():void
	{
		ViewController.getInstance().openView(ViewConst.BATTLE.EMPERORWARBATTLEVIEW,{voApi:this._reportVoApi});
	}

	protected getTitleStr():string
	{
		return "emperorWarReplay";
	}
	

	public getBgExtraHeight():number
	{
		return 2;
	}

	public dispose():void
	{	
		this._reportVoApi = null;

		super.dispose();
	}
}