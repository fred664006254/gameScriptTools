 
class VoicePopupView  extends PopupView
{ 

	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		 
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg44");
		bg.width = 520;
		bg.height = 224;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this.addChildToContainer(bg); 

		let  voiceTxt:BaseTextField= ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		voiceTxt.text =LanguageManager.getlocal("voiceDes");
		voiceTxt.x= 180+GameData.popupviewOffsetX;
		voiceTxt.y =110; 
		this.addChildToContainer(voiceTxt);
		

		let nationalBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"",this.clickRanomHandler,this);
		nationalBtn.x = 80+GameData.popupviewOffsetX;
		nationalBtn.y = bg.y+bg.height+20;
		nationalBtn.setText("national");
		this.addChildToContainer(nationalBtn);
    
		let cantoneseBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"",this.clickRanomHandler2,this);
		cantoneseBtn.x = 330+GameData.popupviewOffsetX;
		cantoneseBtn.y = bg.y+bg.height+20;
		cantoneseBtn.setText("cantonese");
		this.addChildToContainer(cantoneseBtn);
		
		this.closeBtn.visible =false;
	}
	private clickRanomHandler():void
	{
		SoundManager.setVoiceOn(false);
		LocalStorageManager.set(LocalStorageConst.LOCAL_VIOICE_SWITCH,"false"); 
		this.hide();
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SOUND_CATEGORY);
	}

	private clickRanomHandler2():void
	{
		SoundManager.setVoiceOn(true);
		LocalStorageManager.set(LocalStorageConst.LOCAL_VIOICE_SWITCH,"true");
		this.hide();
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SOUND_CATEGORY);
	}

	public dispose():void
	{
		 
		super.dispose();
	}
}