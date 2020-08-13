class ComposeSelect extends BaseDisplayObjectContainer
{
	private _lvt:BaseTextField;
	private _selectbg:BaseBitmap;
	private _lvbg:BaseBitmap;
	private _delBtn:BaseButton;
	private _press:BaseDisplayObjectContainer;
	private _pressList:BaseBitmap[]=[];
	private _psIntervalNum:number=-1;
	constructor()
	{
		super();
		this.init();
	}
	private init():void
	{
		let selectbg = BaseBitmap.create("composeselected");
		this._selectbg=selectbg;
		selectbg.anchorOffsetX=selectbg.width/2;
		selectbg.anchorOffsetY=selectbg.height/2;
		this.addChild(selectbg);
		selectbg.setPosition(0,0);
		this.initLv();
		this._delBtn=ComponentManager.getButton("btn_composedel","",this.delHandler,this);
		this._delBtn.setPosition(-this._delBtn.width/2,-ComposeStatus.renSize.height-this._delBtn.height+15+20);
		this.addChild(this._delBtn);
		this._delBtn.visible=false;
		this.initPress();
	}

	private initLv():void
	{
		let lvBg=BaseBitmap.create("composelvbg");
		this._lvbg=lvBg;
		lvBg.setPosition(-lvBg.width/2,15+20-ComposeStatus.renSize.height-lvBg.height-10);
		this.addChild(lvBg);
		let lvt=ComponentManager.getTextField("1",TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._lvt=lvt;
		lvt.lineSpacing=2;
		lvt.width=lvBg.width;
		lvt.height=lvBg.height-3;
		lvt.setPosition(lvBg.x,lvBg.y);
		lvt.textAlign=egret.HorizontalAlign.CENTER;
		lvt.verticalAlign=egret.VerticalAlign.MIDDLE;
		lvt.name="selecttxt";
		this.addChild(lvt);
	}

	private showLv():void
	{
		this._lvbg.visible=true;
		this._lvt.visible=true;
	}

	private hideLv():void
	{
		if(this._lvbg)
		{
			this._lvbg.visible=false;
		}
		if(this._lvt)
		{
			this._lvt.visible=false;
		}
	}
	
	private initPress():void
	{
		this._press=new BaseDisplayObjectContainer();
		for(let i=0;i<4;i++)
		{
			let bg=BaseBitmap.create("composewtdelbg");
			bg.setPosition(0,bg.height*4/5*i);
			this._press.addChild(bg);
			let psbg=BaseBitmap.create("composewtdelps");
			psbg.setPosition(bg.x,bg.y);
			psbg.visible=false;
			this._press.addChild(psbg);
			this._pressList.push(psbg);
		}
		this._press.setPosition(-this._press.width/2,-ComposeStatus.renSize.height-this._press.height+15+20);
		this.addChild(this._press);
		this._press.visible=false;
	}

	public isDelStatus():boolean
	{
		return this._delBtn&&this._delBtn.visible;
	}

	public showDelPs():void
	{
		this.hideLv();
		let psIdx=0;
		this._press.visible=true;
		if(this._psIntervalNum==-1)
		{
			this._psIntervalNum = egret.setInterval(()=>{
				psIdx++;
				let l=this._pressList.length;
				this._pressList[l-psIdx].visible=true;
				if(psIdx==l)
				{
					this.onlyHideDelPs();
					this._delBtn.visible=true;
				}
			},this,200);
		}
	}

	private onlyHideDelPs():void
	{
		if(this._psIntervalNum!=-1)
		{
			egret.clearInterval(this._psIntervalNum);
			this._psIntervalNum=-1;
			let l=this._pressList.length;
			for(let i=0;i<l;i++)
			{
				this._pressList[i].visible=false;
			}
			this._press.visible=false;
		}
	}

	public hideDelPs(must?:boolean):void
	{
		let isWaiting=this._psIntervalNum!=-1;
		this.onlyHideDelPs();
		if(isWaiting||must)
		{
			this._delBtn.visible=false;
			this.showLv();
		}
	}

	private delHandler(e:egret.Event):void
	{
		if(this.parent)
		{
			ComposeStatus.delId=this.parent.name;
			Api.composemapVoApi.showConfirmDel(ComposeStatus.delId,()=>{
				NetManager.request(NetRequestConst.REQUEST_MAP_DELPERSON,{pos:ComposeStatus.delId});
			},this);
		}
	}

	public show(callback:()=>void,thisObj:any):void
	{
		if(!this.parent)
		{
			this._delBtn.visible=false;
			this.showLv();
			if(this._selectbg)
			{
				egret.Tween.get(this._selectbg,{loop:true}).to({scaleX:0.95,scaleY:0.95,alpha:0.5},500).to({scaleX:1,scaleY:1,alpha:1},500);
			}
			egret.Tween.get(this).to({alpha:1},200).call(()=>{
				egret.Tween.removeTweens(this);
				if(callback)
				{
					callback.apply(thisObj);
				}
			},this);
		}
	}

	public hide(callback:()=>void,thisObj:any,noTween?:boolean):void
	{
		egret.Tween.removeTweens(this);
		this.hideDelPs();
		if(this._selectbg)
		{
			egret.Tween.removeTweens(this._selectbg);
			this._selectbg.setScale(1);
			this._selectbg.alpha=1;
		}
		if(this.alpha==1&&(!noTween))
		{
			egret.Tween.get(this).to({alpha:0},200).call(()=>{
				this._delBtn.visible=false;
				this.showLv();
				if(this.parent)
				{
					this.parent.removeChild(this);
				}
				if(callback)
				{
					callback.apply(thisObj);
				}
			},this);
		}
		else
		{
			if(this.parent)
			{
				this._delBtn.visible=false;
				this.showLv();
				this.parent.removeChild(this);
				if(callback)
				{
					callback.apply(thisObj);
				}
			}
		}
	}

	public setText(lv:string):void
	{
		if(this._lvt)
		{
			let lvStr=Config.PersoninfoCfg.getPersonLocalLvByLv(Number(lv));
			let nameStr=Config.PersoninfoCfg.getPersonLocalNameByLv(Number(lv));
			this._lvt.setString(nameStr+"\n"+lvStr);
		}
	}

	public dispose():void
	{
		ComposeSelect._instant=null;
		this._lvt=null;
		this._selectbg=null;
		this._delBtn=null;
		this._lvbg=null;
		this._press=null;
		this._pressList.length=0;
		if(this._psIntervalNum!=-1)
		{
			egret.clearInterval(this._psIntervalNum);
			this._psIntervalNum=-1;
		}
		super.dispose();
	}

	private static _instant:ComposeSelect;

	public static getInstant():ComposeSelect
	{
		if(!ComposeSelect._instant)
		{
			ComposeSelect._instant=new ComposeSelect();
		}
		return ComposeSelect._instant;
	}

	public static hasInstant():boolean
	{
		return !!ComposeSelect._instant;
	}
}