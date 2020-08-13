class TitleLevelUpView extends BaseView
{	

	private _myContiner:BaseDisplayObjectContainer = null;

	public constructor() {
		super();
	}

	public initView():void
	{

		let lv:number = this.param.data.lv;
		let titleId:number = Number(this.param.data.titleId);
		let titleInfo:TitleInfoVo = Api.itemVoApi.getTitleInfoVoById(titleId);
		this.initHeadContainer();


		let congratulation:BaseTextField = ComponentManager.getTextField(this.getCongratulationString(),18,TextFieldConst.COLOR_LIGHT_YELLOW);

		congratulation.x = GameConfig.stageWidth/2 - congratulation.width/2;
	
        congratulation.y = this.viewBg.y + 165;
		congratulation.textAlign = egret.HorizontalAlign.CENTER;
        this.addChildToContainer(congratulation);

	

		let innerbg:BaseBitmap = BaseBitmap.create("public_lvupcenter");
		innerbg.width = 390;
		innerbg.height = 202;
		innerbg.x = this.viewBg.width/2 - innerbg.width/2;
		innerbg.y = this.viewBg.y + 200;
		this.addChildToContainer(innerbg);
		


		this._myContiner = new BaseDisplayObjectContainer();
		this._myContiner.width = 390;
		let containerBg:BaseBitmap=BaseBitmap.create("public_alphabg");
        containerBg.width=390;
        containerBg.height = 200;
        this._myContiner.addChild(containerBg);

		let rect2:egret.Rectangle = egret.Rectangle.create();
		rect2.setTo(0,0,390,200);
		let scrollView:ScrollView = ComponentManager.getScrollView(this._myContiner,rect2);
		scrollView.setPosition(innerbg.x + innerbg.width/2-scrollView.width/2, innerbg.y);
		this.addChildToContainer(scrollView);


		let startY:number =  20;

		let valueTab:any[] = this.getInfoTab();

		for (var index = 0; index < valueTab.length; index++) {
			let infoTab:any[] = valueTab[index];
			let Txt1 = null;
			let Txt2 = null;
			let Txt3 = null;

			Txt1 = ComponentManager.getTextField(infoTab[0],18,TextFieldConst.COLOR_BROWN);
			Txt1.x = 20;
			Txt1.y = startY;
			this._myContiner.addChild(Txt1);

			Txt2 = ComponentManager.getTextField(infoTab[1],18,TextFieldConst.COLOR_BROWN);
			Txt2.x = Txt1.x + 110;
			Txt2.y = Txt1.y ;
			this._myContiner.addChild(Txt2);
			
			let color1 = TextFieldConst.COLOR_WARN_GREEN ;
			if(index > 0){
				if( infoTab[2] == infoTab[1] ){
					color1 = TextFieldConst.COLOR_BROWN;
				}
			}
			Txt3 = ComponentManager.getTextField(infoTab[2],18,color1);
			Txt3.x = Txt1.x + 275;
			Txt3.y = Txt1.y ;
			this._myContiner.addChild(Txt3);
			
			
		
			let arrowSp =  BaseBitmap.create("public_arrow");
			arrowSp.x = Txt1.x + 200;
			arrowSp.y = Txt1.y + Txt1.height/2 -  arrowSp.height/2;
			this._myContiner.addChild(arrowSp);

			startY += 21;

		}

		this._myContiner.height = startY + 30;
		containerBg.height = this._myContiner.height;


		let tipTxt1:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("titleLvupTiptxt1"),18,TextFieldConst.COLOR_BROWN);
	
		tipTxt1.lineSpacing = 5;
		tipTxt1.width = 380;
        tipTxt1.x = this.viewBg.x + this.viewBg.width/2 - tipTxt1.width/2;
        tipTxt1.y = innerbg.y + innerbg.height + 10;
        this.addChildToContainer(tipTxt1);

	

		let tipTxt2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("titleLvupTiptxt2",[Api.itemVoApi.getTitleInfoVoById(titleId).name]),18,TextFieldConst.COLOR_BROWN);
	
		if(lv >= titleInfo.lvLimit){
			tipTxt2.text = LanguageManager.getlocal("skinnextMax");

		}
		tipTxt2.lineSpacing = 5;
		tipTxt2.width = 380;
        tipTxt2.x = this.viewBg.x + this.viewBg.width/2 - tipTxt2.width/2;
        tipTxt2.y = tipTxt1.y + tipTxt1.height + 5;
        this.addChildToContainer(tipTxt2);


		let okBtn:BaseButton =  ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"skinLvupOkBtn",this.hide,this);
        okBtn.x = GameConfig.stageWidth/2 - okBtn.width/2;
        okBtn.y = innerbg.y + innerbg.height + 110;
        this.addChildToContainer(okBtn);

	}

	protected getCongratulationString():string
	{	
		let titleId:number = Number(this.param.data.titleId);
		let lv:number = this.param.data.lv;
		return LanguageManager.getlocal("levelUpCongratulation",[Api.itemVoApi.getTitleInfoVoById(titleId).name,String(lv)])
	}

	protected initHeadContainer():void
	{	

		let iconAni:BaseBitmap = BaseBitmap.create("mainui_iconani");
		
		iconAni.anchorOffsetX = iconAni.width/2;
		iconAni.anchorOffsetY = iconAni.height/2;
		iconAni.setScale(1.7);
		iconAni.y = this.viewBg.y + 55 + 51;
	
		this.addChildToContainer(iconAni);
	


		let titleId:number = Number(this.param.data.titleId);

		// let playerHead:BaseDisplayObjectContainer = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(),titleId);
		let playerHead:BaseDisplayObjectContainer = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(),titleId);
		playerHead.x = this.viewBg.width/2 - playerHead.width/2;
        playerHead.y = this.viewBg.y + 50;
		this.addChildToContainer(playerHead);

		let head = playerHead.getChildByName("myHead");
		iconAni.x = playerHead.x + playerHead.width/2 + 3;
				egret.Tween.get(iconAni,{loop:true})
			.to({rotation: 360}, 1000)
	}


	protected getInfoTab():any[]
	{	
		let lv:number = this.param.data.lv;
		let titleId:number = Number(this.param.data.titleId);
		let titleInfo:TitleInfoVo = Api.itemVoApi.getTitleInfoVoById(titleId);

		let info:any[] = [];
		info.push([LanguageManager.getlocal("skinLvuptxt1",[String(lv-1)]),"",LanguageManager.getlocal("skinLvuptxt1",[String(lv)])]);
		let v1:number = titleInfo.lvUpEffect1;
		let v2:number = titleInfo.lvUpEffect2;
		let v3:number = titleInfo.atkEffect;

		let o1:number = titleInfo.effect1;
		let o2:number = titleInfo.effect2;
		let o3:number = titleInfo.atkEffect;

		if (o1)
        {	
            for (let i:number = 2; i<=5; i++)
            {	
				let value1:string = "+"+ (v1*(lv-2)+o1);
                let value2:string = "+"+ (v1*(lv-1)+o1);
				info.push([LanguageManager.getlocal("skinLvuptxt"+i),value1,value2]);
            }
        }
		if (o2)
        {	
            for (let i:number = 2; i<=5; i++)
            {	
				let value1:string = "+"+(v2*(lv-2)+o2)*100+"%";
                let value2:string = "+"+(v2*(lv-1)+o2)*100+"%";
				info.push([LanguageManager.getlocal("skinLvuptxt"+i),value1,value2]);
            }
		}
		if(o3){
			for (let i:number = 8; i<=8; i++)
            {	
				let value1:string = "+"+Math.round((v3*(lv-1))*100)+"%";
                let value2:string = "+"+Math.round((v3*lv)*100)+"%";
				info.push([LanguageManager.getlocal("skinLvuptxt"+i),value1,value2]);
            }
		}

		return info;
	}
	protected getCloseBtnName():string
	{
		return null;
	}
	protected getTitleStr():string
	{
        

		return null;
	}
	/**
	 * 重写 初始化viewbg
	 */
	protected initBg(): void {



		this.viewBg = BaseLoadBitmap.create("itemview_titlelvupbg");
        this.viewBg.width = 640;
        this.viewBg.height = 650;
		this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
		this.addChild(this.viewBg);
  


		let title = BaseLoadBitmap.create("itemview_titlelvup");
		title.width = 640;
		title.height = 208;
		title.x = this.viewBg.width/2 - title.width/2;
		title.y = this.viewBg.y -title.height + 40 + 75;
		this.addChild(title);

	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
           
		
		

        ]);
	}

	public dispose()
    {
		this._myContiner = null;
        super.dispose();
    }
}