/**
 * 至劲 下载新包
 * author shaoliang
 * date 2018/03/15
 * @class SetPasswordPopupView
 */

class DownloadPackagePopupView extends PopupView
{
	public constructor() 
	{
		super();
	}

	protected getTitleStr():string
	{
		return "downloadPackage";
	}

	protected getCloseBtnName():string
	{
		return null;
	}

	protected initView():void
	{
		if (App.DeviceUtil.isIOS() == false)
		{
			this.initViewAndroid();
		}
		else
		{
			this.initViewIos();
		}
	}

	private initViewIos():void
	{

		let bg2:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg2.width = 520;
		bg2.height = 240;
		bg2.x = this.viewBg.x + this.viewBg.width/2 - bg2.width/2;
		bg2.y = 10;
		this.addChildToContainer(bg2);


		let msgTF2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("copyUrlDesc2",[this.getDownloadUrl()]),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		msgTF2.width = 480;
		msgTF2.setColor(TextFieldConst.COLOR_BLACK);
		msgTF2.textAlign = TextFieldConst.ALIGH_CENTER;
		msgTF2.x = this.viewBg.x + this.viewBg.width/2 - msgTF2.width/2;
		msgTF2.y = bg2.y + bg2.height/2 - msgTF2.height/2 - 20;
		msgTF2.lineSpacing = 10;
		this.addChildToContainer(msgTF2);

		let copyBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"copyUrl",this.clickCopyHandler,this);
		copyBtn.setColor(TextFieldConst.COLOR_BLACK);
		copyBtn.x = bg2.x + bg2.width/2 -copyBtn.width/2;
		copyBtn.y =  bg2.y + bg2.height + 20;
		this.addChildToContainer(copyBtn);
	}

	private initViewAndroid():void
	{
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 120;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this.addChildToContainer(bg);


		let msgTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("downloadPackageDesc"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		msgTF.width = 480;
		msgTF.setColor(TextFieldConst.COLOR_BLACK);
		msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
		msgTF.x = this.viewBg.x + this.viewBg.width/2 - msgTF.width/2;
		msgTF.y = bg.y + bg.height/2 - msgTF.height/2;
		msgTF.lineSpacing = 10;
		this.addChildToContainer(msgTF);


		let conBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"downloadPackage",this.clickConHandler,this);
		conBtn.setColor(TextFieldConst.COLOR_BLACK);
		conBtn.x = bg.x + bg.width/2 -conBtn.width/2;
		conBtn.y = bg.y + bg.height + 20;
		this.addChildToContainer(conBtn);


		let bg2:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg2.width = 520;
		bg2.height = 240;
		bg2.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg2.y = conBtn.y+80;
		this.addChildToContainer(bg2);


		let msgTF2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("copyUrlDesc",[this.getDownloadUrl()]),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		msgTF2.width = 480;
		msgTF2.setColor(TextFieldConst.COLOR_BLACK);
		msgTF2.textAlign = TextFieldConst.ALIGH_CENTER;
		msgTF2.x = this.viewBg.x + this.viewBg.width/2 - msgTF2.width/2;
		msgTF2.y = bg2.y + bg2.height/2 - msgTF2.height/2 - 20;
		msgTF2.lineSpacing = 10;
		this.addChildToContainer(msgTF2);

		let copyBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"copyUrl",this.clickCopyHandler,this);
		copyBtn.setColor(TextFieldConst.COLOR_BLACK);
		copyBtn.x = bg.x + bg.width/2 -copyBtn.width/2;
		copyBtn.y =  bg2.y + bg2.height + 20;
		this.addChildToContainer(copyBtn);
	}	

	protected clickConHandler(data:any):void
	{	
		if(App.DeviceUtil.IsHtml5())
		{	
			window.open(this.getDownloadUrl());
		}
		// this.hide();		
	}

	protected clickCopyHandler(data:any):void
	{	
		var str:string = this.getDownloadUrl();
		var input = document.createElement("input");
		input.value = str;
		document.body.appendChild(input);
		input.select();
		input.setSelectionRange(0, input.value.length),
		document.execCommand('Copy');
		document.body.removeChild(input);
		App.CommonUtil.showTip(LanguageManager.getlocal("copyUrlSuccessed"));
	}

	private getDownloadUrl():string
	{
		var str:string;
		if (App.DeviceUtil.isIOS() == false)
		{
			str = ("http://yxfile.gowan8.com/apk/lyjd/zjwl_lyjd_ly_gwhf.apk");
		}
		else
		{
			str = ("https://itunes.apple.com/cn/app/id1330534234");
		}
		return str;
	}

	protected getBgExtraHeight():number
	{
		return 20;
	}

}