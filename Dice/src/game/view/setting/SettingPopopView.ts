/**
 * 设置
 * author dky
 * date 201711/10
 * @class SettingPopopView
 */
class SettingPopopView  extends PopupView
{   
    private _type:string = "";

	private _soundBB:BaseBitmap;
	private _soundState:BaseTextField;
	private _soundText:BaseTextField;
	private _checkFlag:BaseBitmap;
	private _checkFlag2:BaseBitmap;

	private _soundProgres:DragProgressBar;
	private _musicProgres:DragProgressBar;
	private _musicText:BaseTextField;
	private _soundCheckBox:CheckBox;
	private _musicCheckBox:CheckBox;
	private _openSound:boolean = true;
	private _openMusic:boolean = true;
	private _soundNum: number = 0.5;
	private _musicNum: number = 0.5;

	private progressMaxWidth:number = 300;

	public constructor() 
	{
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat(
			[
			"hold_dinner_box", 
			"hold_dinner_check",
			]);
	}

	protected initView():void
	{
	
		this.getLocalSettings();

		let btn = {
			x: 100,
			y: 20
		}

		let soundEffectstring = this._openSound ?  LangMger.getlocal("settingSound") : LangMger.getlocal("settingSoundClose") ;
		let soundEffectText = ComponentMgr.getTextField(soundEffectstring, TextFieldConst.SIZE_20, 0x2B58AB);
		soundEffectText.x = btn.x;
		soundEffectText.y = btn.y;
		this.addChildToContainer(soundEffectText);

		this._soundProgres = ComponentMgr.getDragProgressBar("sound_progress", "sound_progerss_bar", 100, this.changeSoundValue, this, [], 0, this.progressMaxWidth);
		this.addChildToContainer(this._soundProgres);
		this._soundProgres.setBtnVisible(false);
		this._soundProgres.setDragIcon("sound_slide");
		this._soundProgres.setGray(!this._openSound);
		this._soundProgres.setPercentage(this._soundNum);

		this._soundCheckBox = ComponentMgr.getCheckBox(null, "sound_btn");
		this._soundCheckBox.x = btn.x;
		this._soundCheckBox.y = soundEffectText.y + soundEffectText.height + 5;
		this._soundCheckBox.setSelected(!this._openSound);
		this._soundCheckBox.addChangeStatusHanlder(function(target, args){
			this._openSound = !this._openSound;
			let tem = this._openSound ? "ON" : "OFF"
			LocalStorageMgr.set(LocalStorageConst.LOCAL_SOUND_SWITCH, tem);
			this._soundProgres.setGray(!this._openSound);
			SoundMgr.setEffectOn(this._openSound);
			soundEffectText.text = this._openSound ?  LangMger.getlocal("settingSound") : LangMger.getlocal("settingSoundClose") ;
		}, this); 
		this.addChildToContainer(this._soundCheckBox);

		this._soundProgres.x = this._soundCheckBox.x + this._soundCheckBox.width - 5;
		this._soundProgres.y = this._soundCheckBox.y + (this._soundCheckBox.height - this._soundProgres.getBgHeight()) / 2;

		let musicStr = this._openMusic ? LangMger.getlocal("settingMusic") : LangMger.getlocal("settingMusicClose") ;
		let musicText = ComponentMgr.getTextField(musicStr, TextFieldConst.SIZE_20, 0x2B58AB);
		musicText.x = btn.x;
		musicText.y = this._soundCheckBox.y + this._soundCheckBox.height + 20;
		this.addChildToContainer(musicText);

		this._musicProgres = ComponentMgr.getDragProgressBar("sound_progress", "sound_progerss_bar", 100, this.changeMusicValue, this, [], 0, this.progressMaxWidth);
		this.addChildToContainer(this._musicProgres);
		this._musicProgres.setBtnVisible(false);
		this._musicProgres.setDragIcon("sound_slide");
		this._musicProgres.setGray(!this._openMusic);
		this._musicProgres.setPercentage(this._musicNum);

		this._musicCheckBox = ComponentMgr.getCheckBox(null, "music_btn");
		this._musicCheckBox.x = btn.x;
		this._musicCheckBox.y = musicText.y + musicText.height + 5;	
		this._musicCheckBox.setSelected(!this._openMusic);
		this._musicCheckBox.addChangeStatusHanlder(function(target, args){
			this._openMusic = !this._openMusic;
			let tem = this._openMusic ? "ON" : "OFF";
			LocalStorageMgr.set(LocalStorageConst.LOCAL_MUSIC_SWITCH, tem);
			SoundMgr.setBgOn(this._openMusic);
			this._musicProgres.setGray(!this._openMusic);
			musicText.text = this._openMusic ? LangMger.getlocal("settingMusic") : LangMger.getlocal("settingMusicClose");
		}, this);
		this.addChildToContainer(this._musicCheckBox);

		this._musicProgres.x = this._musicCheckBox.x + this._musicCheckBox.width - 5;
		this._musicProgres.y = this._musicCheckBox.y + (this._musicCheckBox.height - this._musicProgres.getBgHeight()) / 2;

		let userIDStr = "UID:" + Api.UserinfoVoApi.getShowUid();
		let userIDText = ComponentMgr.getTextField(userIDStr,  TextFieldConst.SIZE_22, 0xCFDEFF);
		userIDText.width = this.viewBg.width;
		userIDText.x = 0;
		userIDText.y = 270;
		userIDText.textAlign = egret.HorizontalAlign.CENTER;
		userIDText.stroke = 2;
		userIDText.strokeColor = 0x0C2C77;
		this.addChildToContainer(userIDText);

	}

	protected checkShowContentBg():boolean
	{
		return true;
	}
	private getLocalSettings(){
		if(LocalStorageMgr.get(LocalStorageConst.LOCAL_SOUND_NUM) != ""){
			this._soundNum = parseInt(LocalStorageMgr.get(LocalStorageConst.LOCAL_SOUND_NUM)) / 100;
			this._soundNum = parseFloat(this._soundNum.toFixed(2));
		}
		if(LocalStorageMgr.get(LocalStorageConst.LOCAL_MUSIC_NUM) != ""){
			this._musicNum = parseInt(LocalStorageMgr.get(LocalStorageConst.LOCAL_MUSIC_NUM)) / 100;
			this._musicNum = parseFloat(this._musicNum.toFixed(2));
		}
		this._openMusic = !(LocalStorageMgr.get(LocalStorageConst.LOCAL_MUSIC_SWITCH) == "OFF");
		this._openSound = !(LocalStorageMgr.get(LocalStorageConst.LOCAL_SOUND_SWITCH) == "OFF");
	}

	private changeSoundValue(curNum, ...args){
		// this._soundText.text = curNum + "%";
		// this._soundText.x = this._soundProgres._dragIcon.x + (this._soundProgres._dragIcon.width - this._soundText.width) / 2
		LocalStorageMgr.set(LocalStorageConst.LOCAL_SOUND_NUM, curNum.toString());
		SoundMgr.setEffectVolume(curNum / 100);
	}

	private changeMusicValue(curNum, ...args){
		// this._musicText.text = curNum + "%";
		// this._musicText.x = this._musicProgres._dragIcon.x + (this._musicProgres._dragIcon.width - this._musicText.width) / 2;
		LocalStorageMgr.set(LocalStorageConst.LOCAL_MUSIC_NUM, curNum.toString());
		SoundMgr.setBgVolume(curNum / 100);
	}

	private soundBtnHander(){
		
	}

	private musicBtnHander(){

	}
	protected getShowHeight(){
		return 420;
	}

	private changeCheckFlagStatus(evt:egret.TouchEvent):void
	{
		this._checkFlag.alpha = (this._checkFlag.alpha+1)%2;  
		if (this._checkFlag.alpha == 1)
		{
			SoundMgr.setVoiceOn(false);
			LocalStorageMgr.set(LocalStorageConst.LOCAL_VIOICE_SWITCH,"false");
			this._checkFlag2.alpha =0; 
			App.CommonUtil.showTip(LangMger.getlocal("national"));
		} 
		 
	}

	protected idTouchHandler() {
		PlatMgr.client.getGUID();
	}

	protected openUserCenter() {
		PlatMgr.openUserCenter();
	}

    private changeHandler(param:any):void
	{
		LoginMgr.changeServer();
	}

	protected getBgExtraHeight():number{
		return 0;
	}

	public dispose():void
	{
		this._type = null;
		this._soundBB = null;
		this._soundState = null;
		this._type = "";
		this._musicText = null;
		this._musicProgres = null;
		this._soundProgres = null;
		this._soundText = null;
		super.dispose();
	}
}