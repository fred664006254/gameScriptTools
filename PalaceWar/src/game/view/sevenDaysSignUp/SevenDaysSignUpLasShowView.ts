/**
 * 七日签到 佳人展示-后
 * @author wxz
 * date 2020/6/9
 * @class SevenDaysSignUpLasShowView
 */
class SevenDaysSignUpLasShowView extends PopupView 
{
	private _wifeCon1:BaseDisplayObjectContainer=null;
	private _isBone:boolean = false;
	public constructor()
	{
		super();
	}
	protected getBgName():string
	{	
		return null;;
	}
	protected getTitleBgName():string
	{
		return null;
	}
	protected getTitleStr():string
	{
		return null;
	}		
	protected getCloseBtnName():string
	{
		return null;
	}	
	protected resetBgSize():void
	{

	}
	protected initView(): void 
	{
		let bg = BaseBitmap.create("sevendayssignupshowbg");
		bg.x = GameConfig.stageWidth/2 - bg.width/2;
		bg.y = GameConfig.stageHeigth/2 - bg.height/2-50;
		this.addChild(bg);

		let title = BaseBitmap.create("sevendayssignupshowtitle");
		this.setLayoutPosition(LayoutConst.horizontalCentertop,title,bg,[0,-45]);
		this.addChild(title);

		let wifeCon1 = new BaseDisplayObjectContainer();
		this.addChild(wifeCon1);
		this._wifeCon1 = wifeCon1;

		let wifeCfg = Config.WifeCfg.getWifeCfgById(this.wifeIds[0]);
		let bonename = wifeCfg.bone;
		if(!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon())
		{
			this._wifeCon1.x = 35;
			this._wifeCon1.y = 770;
			this._isBone = true;
		}else
		{
			this._wifeCon1.x = -120;
			this._wifeCon1.y = 340;	
			this._isBone = false;			
		}
		this._wifeCon1.y += (GameConfig.stageHeigth-1136)/4;
		
		let bot = BaseBitmap.create("sevendayssignupshowbot");
		this.setLayoutPosition(LayoutConst.horizontalCenterbottom,bot,bg,[0,-130]);
		this.addChild(bot);	

		let txtimg = BaseBitmap.create("sevendayssignupshowtxt2");
		this.setLayoutPosition(LayoutConst.horizontalCenterbottom,txtimg,bot,[0,110]);
		this.addChild(txtimg);

        var shp:egret.Shape = new egret.Shape();
        shp.graphics.beginFill(0xff0000,1);
        shp.graphics.drawRect(0,0,640,txtimg.y);
        shp.graphics.endFill();
        this.addChild(shp);
		this._wifeCon1.mask = shp;

		let txt = ComponentManager.getTextField(LanguageManager.getlocal("sevenDaysSignUpShowDesctxt1"),20,TextFieldConst.COLOR_LIGHT_YELLOW);	
		txt.x = txtimg.x + txtimg.width/2 - txt.width/2;
		txt.y = txtimg.y + txtimg.height + 15;
		txt.lineSpacing = 3;
		txt.textAlign = egret.HorizontalAlign.CENTER;
		this.addChild(txt);

		let btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sevenDaysSignUpShowbtn", ()=>
		{
			this.hide();
			ViewController.getInstance().openView(ViewConst.COMMON.SEVENDAYSSIGNUPVIEW);
		}, this)
		btn.setPosition(txtimg.x+txtimg.width/2-btn.width/2, txt.y + txt.height+20);
		this.addChild(btn);

		let closebtn = ComponentManager.getButton(ButtonConst.COMMON_CLOSE_2,"",()=>
		{
			this.hide();
		},this)
		closebtn.x = GameConfig.stageWidth - closebtn.width - 15;
		closebtn.y = title.y - 125;
		this.addChild(closebtn);

		this.clickRightBtn1();
	}

	private wifeIds = ["310"];
	private wifePos = [200,385];
	private wifeSkinId = 3101;
	private clickRightBtn1():void
	{
		if(this._wifeCon1.numChildren == 0)
		{
			for(let i = 0; i < 2; i++)
			{
				let wifeCfg = Config.WifeCfg.getWifeCfgById(this.wifeIds[0]);
				let wifeskinCfg = Config.WifeskinCfg.getWifeCfgById(this.wifeSkinId);
				let bonename = i == 0 ? wifeskinCfg.bone : wifeCfg.bone2;
				if(this._isBone)
				{
					let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(bonename);
					droWifeIcon.scaleX = 0.75;
					droWifeIcon.scaleY = 0.75;
					droWifeIcon.x = this.wifePos[i];
					droWifeIcon.y = 10;
					this._wifeCon1.addChild(droWifeIcon);
				}else
				{
					let droWifeIcon = BaseLoadBitmap.create(i==0?wifeskinCfg.body:wifeCfg.body2);
					droWifeIcon.scaleX = 0.5;
					droWifeIcon.scaleY = 0.5;
					droWifeIcon.x = this.wifePos[i];
					droWifeIcon.y = 10;
					this._wifeCon1.addChild(droWifeIcon);					
				}		
			}
		}
	}

	protected getResourceList(): string[] {
		let arr = ["sevendayssignupshowbg","sevendayssignupshowtxt2","sevendayssignupshowtitle",
			"sevendayssignupshowbot","sevendayssignup_btn1","sevendayssignup_btn2",ButtonConst.COMMON_CLOSE_2];
		if(PlatformManager.checkIsEnSp())
		{
			arr = ["sevendayssignupshowbg","sevendayssignupshowtxt2","sevendayssignupshowtitle",
			"sevendayssignupshowbot","sevendayssignup_btn1","sevendayssignup_btn2",ButtonConst.COMMON_CLOSE_2];
		}
		return super.getResourceList().concat(arr);
	}
	public dispose(): void {
		super.dispose();
		this._wifeCon1 = null;
	}
}

