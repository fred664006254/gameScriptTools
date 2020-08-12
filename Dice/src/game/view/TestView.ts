class TestView extends BaseView
{
	public constructor() 
	{
		super();
	}
	private _sp:BaseShape;
	private nameCfgArr:{[key:string]:string}[]=null;
	private _curl:string;
	private _newurl:string;
	protected initView():void
	{
		this.nameCfgArr=[];
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			this._curl=window.location.href;
			this._newurl=App.CommonUtil.getTestUrl();
			if(this._newurl!=this._curl)
			{
				this.nameCfgArr.push({"test":"进测试环境"});
			}
			else
			{
				console.log("already in test");
			}
		}
		this.nameCfgArr.push({"pid":"用pid登录"});
		
		if(PlatMgr.checkIsWeiduan()&&App.DeviceUtil.isAndroid()&&PlatMgr.checkIsUseSDK()&&PlatMgr.checkUseRSDKSocket()==false)
		{
			this.nameCfgArr.push({"clientsocket":"使用壳子websocket"});
		}
		this.nameCfgArr.push({"consolelog":"输出log"});
		this.nameCfgArr.push({"vconsole":"打开调试工具"});
		if(App.DeviceUtil.isRuntime2())
		{
			this.nameCfgArr.push({"disnativerender":"禁用原生渲染"});
		}

		let sp:BaseShape=new BaseShape();
		sp.graphics.beginFill(0,0.8);
		let w:number=300;
		let h:number=60+(40+20)*this.nameCfgArr.length;
		sp.graphics.drawRoundRect((GameConfig.stageWidth-w)/2,(GameConfig.stageHeigth-h)/2,w,h,20,20);
		sp.graphics.endFill();
		this.addChildToContainer(sp);
		this._sp=sp;
		this.initTool();		
	}


	private initTool():void
	{
		let maxH:number=0;
		for(let i:number=0;i<this.nameCfgArr.length;i++)
		{
			let iData:{[key:string]:string}=this.nameCfgArr[i];
			for(let key in iData)
			{
				let checkBox:CheckBox=ComponentMgr.getCheckBox(iData[key]);
				checkBox.setPosition((GameConfig.stageWidth-this._sp.width)/2+20,(GameConfig.stageHeigth-this._sp.height)/2+30+i*(20+checkBox.height));
				checkBox.addTouchTap(this.testHandler,this,[key]);
				this.addChildToContainer(checkBox);
				if(key=="clientsocket")
				{
					checkBox.setSelected(GameData.testUseClientSocket);
				}
			}
		}
	}
	private testHandler(event:egret.TouchEvent,key:string):void
	{
		let checkBox:CheckBox=<CheckBox>event.target.parent;
		let ths=this;
		StatisticsHelper.reportOwnNameLog("select:"+key,"testcmd");
		switch (key)
		{
			case "test":
				LocalStorageMgr.set("gametest1000",this._curl);
				if(App.DeviceUtil.isRuntime2())
				{
					RSDKHelper.setRuntime2State({game_mark:"test"});
				}
				else
				{
					window.location.href=this._newurl;
				}
				ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW,{
						title:LangMger.getlocal("sysTip"),
						msg:"已切换到测试环境，请清除进程后重新进入游戏。",
						callback:this.hide,
						handler:this,
						needCancel:false
					});

			break;
			case "pid":
				this.createPanel((pid:string)=>{
					LoginMgr.setLoginByPID(pid);
				},"进入游戏");
			break;
			case "clientsocket":
				GameData.testUseClientSocket=checkBox.checkSelected();
				this.hide();
			case "consolelog":
				App.LogUtil.isTestShowLog=true;
				this.hide();
			case "vconsole":
				App.ResourceUtil.loadSingleScript("./vconsole.min.js",()=>{
					var vConsole = new window["VConsole"]();
					ths.hide();
				},this);
			break;
			case "disnativerender":
				RSDKHelper.setRuntime2State({disable_native_render:(checkBox.checkSelected()?"yes":"no")});
			break;
		}
	}



	private createPanel(callback:(...args)=>void,btnStr?:string):void
	{

		let maskSp = new BaseShape();
		maskSp.graphics.beginFill(ColorEnums.black,0.5);
		maskSp.graphics.drawRect(0,0,GameConfig.stageWidth,GameConfig.stageHeigth);
		maskSp.graphics.endFill();
		maskSp.touchEnabled = true;
		this.addChild(maskSp);

		let panel:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
		this.addChild(panel);

		var bg:BaseShape=new BaseShape();
		bg.graphics.beginFill(ColorEnums.black,1);
		bg.graphics.drawRect(0,0,400,300);
		bg.graphics.endFill();
		panel.addChild(bg);
		panel.x = GameConfig.stageWidth/2  - bg.width/2;
		panel.y = GameConfig.stageHeigth/2 - bg.height/2;

		let pidBox:Test.TestBox = new Test.TestBox("PID:")
		pidBox.x=20;
		pidBox.y=50;
		panel.addChild(pidBox);
		// let zidBox:Test.TestBox = new Test.TestBox("ZID:")
		// zidBox.x=pidBox.x;
		// zidBox.y=pidBox.y+20+pidBox.height;
		// panel.addChild(zidBox);
		let ths=this;

		var confirmBtn:BaseButton = ComponentMgr.getButton("loginres_btn3","",()=>{
			let pidStr:string=pidBox.getStr();
			if(callback&&pidStr)
			{
				
			}
			else
			{
				if(!pidStr)
				{
					egret.Tween.get(pidBox).to({scaleX:1.05,scaleY:1.05},150).to({scaleX:1,scaleY:1},150);
				}
				// if(!zidBox.getStr())
				// {
				// 	egret.Tween.get(zidBox).to({scaleX:1.05,scaleY:1.05},150).to({scaleX:1,scaleY:1},150);
				// }
			}
		},this);
		confirmBtn.setText(btnStr);
		confirmBtn.x = panel.width/2 - confirmBtn.width/2;
		confirmBtn.y = panel.height - 70;
		panel.addChild(confirmBtn);
	}
}
namespace Test
{
	export class TestBox extends BaseDisplayObjectContainer
	{
		public constructor(txtStr:string) 
		{
			super();
			this.init(txtStr);
		}

		private init(txtStr:string):void
		{
			var usernameTF:BaseTextField = new BaseTextField();
			usernameTF.text = txtStr;
			this.addChild(usernameTF);
			
			var usernameBg:BaseShape=new BaseShape();
			usernameBg.graphics.lineStyle(2,ColorEnums.white);
			usernameBg.graphics.moveTo(0,0);
			usernameBg.graphics.lineTo(250,0);
			usernameBg.graphics.lineTo(250,50);
			usernameBg.graphics.lineTo(0,50);
			usernameBg.graphics.lineTo(0,0);
			usernameBg.graphics.endFill();

			usernameBg.x = 110;
			usernameBg.y = usernameTF.y + usernameTF.height/2 - usernameBg.height/2;
			this.addChild(usernameBg);

			var usernameInput:BaseTextField = new BaseTextField();
			usernameInput.type = egret.TextFieldType.INPUT;
			usernameInput.width = 230;
			usernameInput.height = usernameTF.height;
			usernameInput.x = usernameBg.x+10;
			usernameInput.y = usernameBg.y+10;
			usernameInput.name="testInput";
			this.addChild(usernameInput);
		}
		public getStr():string
		{
			let str:string="";
			let txt:BaseTextField=<BaseTextField>this.getChildByName("testInput");
			if(txt)
			{
				str=txt.text;
			}
			return str;
		}
	}
}