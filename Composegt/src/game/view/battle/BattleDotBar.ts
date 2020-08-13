/**
 * author shaoliang
 * date 2017/9/28
 * @class BattleDotBar
 */



class BattleDotBar extends BaseDisplayObjectContainer
{

	private _allDots:BaseBitmap[] = [];
	private _totalNum:number;
	private _curNum:number;
	private _isMiaosha:boolean = false;
	private _aniDelay = 0;

	public constructor() {
		super();
	}

	public init(m:number):void
	{
		this._totalNum = m;

		let bg:BaseBitmap = BaseBitmap.create("public_9v_bg10");
		bg.width = 640;
		bg.height= 80;
		bg.y = -10;
		this.addChild(bg);

		let barWidth:number = 460;
		let perX:number = 120;

		let sectionName:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("challengeSectionName"+Api.challengeVoApi.getCurMiddleChannelId()),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		sectionName.setPosition(30,bg.height/2 - sectionName.height /2);
		sectionName.textColor = TextFieldConst.COLOR_WHITE;
		this.addChild(sectionName);

		for (let i:number=0; i<this._totalNum ; i++)
		{
			let dot1:BaseBitmap = BaseBitmap.create("battle_dot_none");
			dot1.setPosition(perX +  (barWidth /8) * (0.5+ i) - dot1.width /2, bg.height/2 - dot1.height /2 );
			this.addChild(dot1);

			let dot2:BaseBitmap = BaseBitmap.create("battle_dot_full");
			dot2.setPosition(perX +  ( barWidth /8) * (0.5+ i) - dot2.width /2, bg.height/2 - dot2.height /2 );
			this.addChild(dot2);

			// 关卡版本2
			// if (i == this._totalNum - 1) {
			// 	let dot3:BaseBitmap = BaseBitmap.create("battle_dot_boss");
			// 	dot3.setPosition( perX +  (barWidth / this._totalNum) * (0.5+ i) - dot3.width /2, bg.height/2 - dot3.height /2 );
			// 	this.addChild(dot3);
			// }

			this._allDots.push(dot2);
		}
	}

	public set curNum(n:number)
	{
		this._curNum = n;
		if(this._isMiaosha){
			this._aniDelay = 500;
			for (let i:number=0; i<this._totalNum ; i++)
			{
				if (n > i) {
					if (this._allDots[i].visible == false) {
						this._aniDelay += 200;
						let delay = this._aniDelay+1;
						setTimeout(() => {
							this._allDots[i].visible = true;
							let dotClip = ComponentManager.getCustomMovieClip('miaosha_dotani_',7);
							dotClip.setPosition(this._allDots[i].x + 43/2-93/2, 20+42/2-93/2);
							this.addChild(dotClip);
							dotClip.playWithTime(1);
							dotClip.setEndCallBack(()=>{
								dotClip.dispose();
								dotClip = null;
								if(i == n-1){
									this.isMiaosha = false;
								}
							},this)
						}, delay);

					}
				}
				else {
					if (this._allDots[i].visible == true) {
						this._allDots[i].visible = false;
					}
				}
			}
		}else{
			for (let i:number=0; i<this._totalNum ; i++)
			{
				if (n > i) {
					if (this._allDots[i].visible == false) {
						this._allDots[i].visible = true;
					}
				}
				else {
					if (this._allDots[i].visible == true) {
						this._allDots[i].visible = false;
					}
				}
			}
		}
	}

	public miaoshaSetNum(n:number,addCid?:number){
		let isFull =  n===0 && addCid>0;
		if(isFull){
			this.curNum = this._totalNum;
		}else{
			this.curNum = n;
		}
	}

	public set isMiaosha(isMiaosha:boolean){
		this._isMiaosha = isMiaosha;
	}

	public dispose():void
	{	
		this._totalNum = null;
		this._curNum = null;
		this._allDots.length = 0;
		this._isMiaosha = false;
		this._aniDelay = 0;
		super.dispose();		
	}

}