
class ActrackMoreItem extends AtkLogScrollItem {


	private _mainTaskHandKey:string = null;
	public constructor() {
		super();
	}

	protected initItem(index: number, data: any,itemParam?:any) 
    {
		super.initItem(index,data,)
		let challengeBtn=this.challengeBtn;
		egret.callLater(()=>{
			this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(
				challengeBtn,
				challengeBtn.width/2,
				challengeBtn.height/2, 
				[challengeBtn],
				603, 
				true, 
				function() {
					if (challengeBtn.visible && !Api.atkraceVoApi.inithand) {
						this.parent.setChildIndex(this, 100);
						Api.atkraceVoApi.setInitHand(true);
						return true;
					} else {
						return false;
					}
				}, 
				this
			);
		},this);

	}
	//挑战
	protected challengBtnHandler(evt:egret.TouchEvent):void
	{
		var data:any =[];
		data.type=1;//挑战
		data.uid=this.data.uid;
		AtkraceChallengeItem.data =data;
		ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECHALLENGEVIEW);
	}
    
	public dispose(): void {
		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
		this._mainTaskHandKey = null;
		Api.atkraceVoApi.setInitHand(false);
		super.dispose();
	}
}