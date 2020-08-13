class ComposeItem extends BaseDisplayObjectContainer
{
	// private _lv:BaseDisplayObjectContainer;;
	private _cell:BaseLoadBitmap;
	// private _lvT:BaseTextField;
	private _lvbm:CustomMovieClip;
	// private _shadow:BaseBitmap;
	private _data:ComposemapItemVo;
	private _cellRect:egret.Rectangle;
	private _isautoMoving:boolean=false;
	private _waitMoveCount:number=-1;
	// public _isComposeing:boolean = false;
	constructor(data:ComposemapItemVo)
	{
		super();
		this.init(data);
		let {pixX,pixY}=ComposeStatus.isBuyStop?ComposeStatus.getPixPosByCellPos(data.x,data.y):ComposeStatus.getRandomPos();
		this.setPosition(pixX,pixY);
		if(!ComposeStatus.isBuyStop)
		{
			this.checkAutoMove(true);
		}
		else
		{
			ComposeStatus.isBuyStop=false;
		}
	}

	private stopAutoMove():void
	{
		if(this._waitMoveCount>-1)
		{
			egret.clearTimeout(this._waitMoveCount);
			this._waitMoveCount=-1;
		}
		if(this._isautoMoving)
		{
			egret.Tween.removeTweens(this);
			this._isautoMoving=false;
			this._lvbm.gotoAndStop(1);
		}
	}

	public checkAutoMove(first?:boolean):void
	{
		if(Api.composemapVoApi.checkAutoSelect())
		{
			return;
		}
		if(this._waitMoveCount==-1&&(!this._isautoMoving))
		{
			(!first)&&this._lvbm.gotoAndStop(1);
			let waitValue=first?1:10;
			this._waitMoveCount=egret.setTimeout(()=>{
				if(this._waitMoveCount>-1)
				{
					egret.clearTimeout(this._waitMoveCount);
					this._waitMoveCount=-1;
				}
				if(!this._isautoMoving)
				{
					this._isautoMoving=true;
					let {pixX,pixY}=ComposeStatus.getRandomPos();
					let diffX=pixX-this.x;
					let diffY=pixY-this.y;
					let dis=Math.sqrt(diffX*diffX+diffY*diffY);
					this._lvbm.scaleX=diffX>0?-1:1;
					this._lvbm.playWithTime(0);
					egret.Tween.get(this).to({x:pixX,y:pixY},dis/ComposeStatus.moveSpeed*1000).call(()=>{
						egret.Tween.removeTweens(this);
						this._isautoMoving=false;
						this.checkAutoMove();
					},this);
				}
			},this,100*waitValue+Math.floor(Math.random()*500*waitValue));
		}
	}

	public getLv():number
	{
		return this._data.lv;
	}

	public setMaxZindex():void
	{
		let thsIdx=this.parent.getChildIndex(this);
		this._zIndex=thsIdx;
		let maxIdx=this.parent.numChildren-1;
		if(thsIdx<maxIdx)
		{
			this.parent.setChildIndex(this,maxIdx);
		}
	}

	public setCellStatus(canPos:boolean):void
	{
		let res=canPos?"composecell1":"composecellred";
		if(this._cell)
		{
			this._cell.setload(res,this._cellRect);
		}
	}

	public showNextLvBmp():void
	{
		this.stopAutoMove();
		this._lvbm.setFramesByNamePre(this.getNextLvRes());
		// this._lvbm.playWithTime(0);
		let rect=egret.Rectangle.create();
		rect.setTo(0,0,121,70);
		let talk=<BaseLoadBitmap>this.getChildByName("talkbg");
		if(!talk)
		{
			talk=BaseLoadBitmap.create("compose_talk",rect);
		}
		talk.setPosition(this._lvbm.x+this._lvbm.width-45-30-this._lvbm.anchorOffsetX,this._lvbm.y-this._lvbm.anchorOffsetY-talk.height+30);
		talk.name="talkbg";
		let lvStr = Config.PersoninfoCfg.getPersonLocalNameByLv(this.getNextLv())+"  "+Config.PersoninfoCfg.getPersonLocalLvByLv(this.getNextLv());
		let talkTxt=<BaseTextField>this.getChildByName("talktxt");
		if(!talkTxt)
		{
			talkTxt=ComponentManager.getTextField(LanguageManager.getlocal("composeNextLvcando",[lvStr]),TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_BROWN_NEW);
		}
		talkTxt.textAlign=egret.HorizontalAlign.CENTER;
		talkTxt.lineSpacing=3;
		talkTxt.width=talk.width-10;
		talkTxt.setPosition(talk.x+(talk.width-talkTxt.width)*0.5,talk.y+(talk.height-9-talkTxt.height)*0.5);
		talkTxt.name="talktxt";
		this.addChild(talk);
		this.addChild(talkTxt);
	}
	public recoveryBmp():void
	{
		this._lvbm.setFramesByNamePre(this.getLvRes());
		// this._lvbm.playWithTime(0);
		this.checkAutoMove();
		let talk=<BaseLoadBitmap>this.getChildByName("talkbg");
		if(talk)
		{
			talk.dispose();
		}
		let talkTxt=<BaseTextField>this.getChildByName("talktxt");
		if(talkTxt)
		{
			talkTxt.dispose();
		}
	}

	public showGoldTip():void
	{
		let gold=BaseLoadBitmap.create(Config.RewardCfg.getIconByTypeAndId(ItemEnums.gold));
		let scale=0.45;
		gold.setScale(scale)
		gold.setPosition(-50*scale,-this._lvbm.height-100*scale+80);
		this.addChild(gold);
		egret.Tween.get(gold).to({y:gold.y-30,alpha:0},1200).call(()=>{
			if(gold)
			{
				gold.dispose();
			}
		},this);
	}

	private init(data:ComposemapItemVo)
	{
		this._data=data;
		// this._lv=new BaseDisplayObjectContainer();
		if(!this._cellRect)
		{
			this._cellRect=egret.Rectangle.create();
			this._cellRect.setTo(0,0,ComposeStatus.cellBgSize.w,ComposeStatus.cellBgSize.h);
		}

		//点小人地块 也能拖动小人,通过菱形透明图片避免阻挡其他小人的点击 public_9_bg11 public_alphabg
		let alphaCell = BaseBitmap.create("public_alphabg");//public_9_viewmask
		// alphaCell.alpha = 111/255;
		alphaCell.name="touchcell"
		// alphaCell.width = alphaCell.height = Math.sqrt(Math.pow(this._cellRect.width/2-5,2)+Math.pow(this._cellRect.height/2-5,2));
		alphaCell.width = 94;
		alphaCell.height = 125
		alphaCell.anchorOffsetX = alphaCell.width/2;
		alphaCell.anchorOffsetY = alphaCell.height;
		// alphaCell.skewX = 30;
		// alphaCell.rotation = 30;
		alphaCell.setPosition(0, 25);
		this.addChild(alphaCell);
		// alphaCell.pixelHitTest=true;

		let composecell = BaseLoadBitmap.create("composecell1",this._cellRect);
		this._cell=composecell;
		composecell.setPosition(-composecell.width/2,-composecell.height/2);
		this.addChild(composecell);
		composecell.visible=false;
		// let shadow:BaseBitmap=BaseBitmap.create("composeshadow");
		// this._shadow=shadow;
		// let shadowPos=this.getShadowInitPos();
		// shadow.setPosition(shadowPos.x,shadowPos.y);
		// this.addChild(shadow);
		this.width=composecell.width;
		this.height=composecell.height;
		let lvbmp=ComponentManager.getCustomMovieClip(this.getLvRes());
		lvbmp.width=100;
		lvbmp.height=150;
		// lvbmp.pixelHitTest=true;
		lvbmp.anchorOffsetX=lvbmp.width*0.5;
		lvbmp.anchorOffsetY=lvbmp.height;
		lvbmp.frameRate=33;
		this._lvbm=lvbmp;
		let pos=this.getLvBmInitPos();
		lvbmp.setPosition(pos.x,pos.y);
		this.addChild(lvbmp);
		// this.addChild(this._lv);
		// let lvbg=BaseLoadBitmap.create("composeplvbg");
		// lvbg.width=lvbg.height=31;
		// lvbg.setPosition(20,-lvbg.height/2);
		// this._lv.addChild(lvbg);
		// let t=ComponentManager.getTextField(""+data.lv,TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		// t.width=lvbg.width;
		// t.textAlign=egret.HorizontalAlign.CENTER;
		// this._lvT=t;
		// t.setPosition(lvbg.x,lvbg.y+(lvbg.height-t.height)*0.5+1);
		// this._lv.addChild(t);

		// let cc=new BaseShape();
		// cc.graphics.beginFill(0xff0000);
		// cc.graphics.drawCircle(-3,-3,3);
		// cc.graphics.endFill();
		// this.addChild(cc);	
		this.name=this._data.id;
	}

	private getLvBmInitPos():{x:number,y:number}
	{
		let x = this._cell.x+(this._cell.width-this._lvbm.width)*0.5+this._lvbm.width*0.5;
		let y = this._cell.y-this._lvbm.height+this._cell.height/2+8+this._lvbm.height+7;
		return {x:x,y:y};
	}

	// private getShadowInitPos():{x:number,y:number}
	// {
	// 	return {x:this._cell.x+(this._cell.width-this._shadow.width)/2-3,y:this._cell.y+(this._cell.height-this._shadow.height)/2+13};
	// }

	/**
	 * 拖拽移动
	 * @param offX 
	 * @param offY 
	 */
	public moveByDrag(offX:number,offY:number):void
	{
		let x:number,y:number;
		if(this._selectPos)
		{
			x=this._selectPos.x;
			y=this._selectPos.y;
		}
		else
		{
			// let {pixX,pixY}=ComposeStatus.getPixPosByCellPos(this._data.x,this._data.y);
			// x=pixX;
			// y=pixY;
			x=this.x;
			y=this.y;
		}
		this.setPosition(x+offX,y+offY);
		this.moveExcute();
	}

	public moveByDiffPos(diffX:number,diffY:number):void
	{
		this.x+=diffX;
		this.y+=diffY;
		this.moveExcute();
	}

	private moveExcute():void
	{
		// this.showCell();
		// this.removeSelected(false,true);
		this.checkMoveStatus();
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_COMPOSE_ITEM_MOVE,{pixX:this.x,pixY:this.y,x:this._data.x,y:this._data.y});
	}

	public clearMoveStatus():void
	{
		// this.hideCell();
		this.setCellStatus(true);
	}

	public showCell():void
	{
		if(this._cell)
		{
			this._cell.visible=true;
		}
	}

	public hideCell():void
	{
		if(this._cell&&this._cell.visible)
		{
			this._cell.visible=false;
		}
	}

	private _zIndex:number=-1;

	public update():void
	{
		// this._lvT.setString(""+this._data.lv);
		this.name=Config.MapinfoCfg.getIdByPos(this._data.x,this._data.y);
	}

	public updatePos():void 
	{
		this.update();
		// let {pixX,pixY}=ComposeStatus.getPixPosByCellPos(this._data.x,this._data.y);
		this.hideCell();
		let{pixX,pixY}=ComposeStatus.checkBound(this.x,this.y);
		this.x=pixX;
		this.y=pixY;
		// if(this.x!=pixX || this.y!=pixY)
		// {
		// 	egret.Tween.get(this).to({x:pixX,y:pixY},100).call(()=>{
		// 		egret.Tween.removeTweens(this);
		// 	},this);
		// 	// this.setPosition(pixX,pixY);
		// }
	}

	private getLvRes(): string
	{
		return Config.MapinfoCfg.getPersonMoveRes(this._data.lv);
	}

	private getNextLv():number
	{
		let maxLv = Math.min(Config.PersoninfoCfg.getMaxLv(),this._data.lv+1);
		return maxLv;
	}

	private getNextLvRes(): string
	{
		let maxLv = this.getNextLv();
		return Config.MapinfoCfg.getPersonMoveRes(maxLv);
	}

	private getLastLvRes(): string
	{
		return Config.MapinfoCfg.getPersonMoveRes(this._data.lv-1);
	}

	private getLastBmpLvRes():string
	{
		return Config.MapinfoCfg.getPersonRes(this._data.lv-1);
	}

	private updateEffect():void
	{
		let effect=ComponentManager.getCustomMovieClip("compose_ren",9);
		effect.setScale(2.4);
		effect.setPosition(-130,-140-ComposeStatus.cellBgSize.h*0.5);
		this.addChild(effect);
		effect.setEndCallBack(()=>{
			effect&&effect.dispose();
		},this);
		effect.playWithTime(1);
		SoundManager.playEffect(SoundConst.EFFECT_DROP);
	}
	private updateComposeEffect():void
	{
		let effect=ComponentManager.getCustomMovieClip("compose_com",8);
		effect.setPosition(-115,-170-ComposeStatus.cellBgSize.h*0.5);
		this.addChild(effect);
		effect.setEndCallBack(()=>{
			effect&&effect.dispose();
		},this);
		effect.playWithTime(1);
		SoundManager.playEffect(SoundConst.EFFECT_DROP);
		this._lvbm.bindData="updateing"
		egret.Tween.get(this._lvbm).to({scaleX:1.2,scaleY:1.2},200).to({scaleX:1.0,scaleY:1.0},200).call(()=>{
			this._lvbm&&(this._lvbm.bindData=null);
			// this._isUpgradePlaying=false;
		},this);
	}
	

	public show(parent:egret.DisplayObjectContainer,effect?:boolean):void
	{
		parent.addChild(this);
		if(effect)
		{
			this._lvbm.alpha=0;
			this._lvbm.bindData="showing";
			egret.Tween.get(this._lvbm).to({alpha:1},500).call(()=>{this._lvbm&&(this._lvbm.bindData=null);},this);
			this.updateEffect();
		}
	}

	// private _isUpgradePlaying:boolean=false;

	public updateShow(isBatch?:boolean,rewards?:string):void
	{
		this.hideComposeStatus();
		if(!isBatch)
		{
			let bm2=BaseLoadBitmap.create(this.getLastBmpLvRes());
			bm2.anchorOffsetX=this._lvbm.anchorOffsetX;
			bm2.anchorOffsetY=this._lvbm.anchorOffsetY;
			this._lvbm.setFramesByNamePre(this.getLastLvRes());
			// this._lvbm.playWithTime(0);
			let lvbmPos=this.getLvBmInitPos();
			let initX=lvbmPos.x;
			let initY=lvbmPos.y;
			bm2.setPosition(initX+50,initY);
			bm2.name="bm2";
			this.addChild(bm2);
			let idx=0;
			let effectComplete =()=>
			{
				
				idx++;
				if(idx==2)
				{
					bm2.dispose();
					this._lvbm.setFramesByNamePre(this.getLvRes());
					// this._lvbm.playWithTime(0);
					// this._lvT.setString(""+this._data.lv);
					this.updateComposeEffect();
					if(rewards)
					{
						let rewardList = GameData.formatRewardItem(rewards);
						let p=this.localToGlobal(0,0);
						p.y-=80;
						App.CommonUtil.playRewardFlyAction(rewardList,p);
					}
				}
			}
			// this._isUpgradePlaying=true;
			// egret.setTimeout(()=>{
			// 	this._isUpgradePlaying=false;
			// },this,750);
			this._lvbm.bindData="updateing"
			egret.Tween.get(this._lvbm).to({x:initX-50},250,egret.Ease.quartOut).to({x:initX},100,egret.Ease.quartIn).call(()=>{
				this._lvbm&&(this._lvbm.bindData=null);
				effectComplete.apply(this);
			},this)
			egret.Tween.get(bm2).to({x:initX+55},250,egret.Ease.quartOut).to({x:initX},100,egret.Ease.quartIn).call(()=>{
				effectComplete.apply(this);
			},this)
		}
		else
		{
			this._lvbm.setFramesByNamePre(this.getLvRes());
			// this._lvbm.playWithTime(0);
			// this._lvT.setString(""+this._data.lv);
			// let {pixX,pixY}=ComposeStatus.getPixPosByCellPos(this._data.x,this._data.y);
			this.stopAutoMove();
			let {pixX,pixY}=ComposeStatus.getRandomPos();
			if(this.x!=pixX || this.y!=pixY)
			{
				egret.Tween.get(this).to({x:pixX,y:pixY},200).call(()=>{
					egret.Tween.removeTweens(this);
					this.checkAutoMove();
				},this);
			}
			else
			{
				// this._isUpgradePlaying=true;
				// egret.setTimeout(()=>{
				// 	this._isUpgradePlaying=false;
				// },this,400);
				this.updateComposeEffect();
			}
		}

	}

	public showComposeStatus():void
	{
		let stopPos=ComposeStatus.curStopPos;
		this.hideComposeStatus();
		let lvbmPos=this.getLvBmInitPos();
		let initX=lvbmPos.x;
		let initY=lvbmPos.y;
		this._lvbm.setPosition(initX,initY);
		if(stopPos.x==this._data.x&&stopPos.y==this._data.y)
		{
		}
		else
		{
			// let {pixX,pixY}=ComposeStatus.getPixPosByCellPos(stopPos.x,stopPos.y);
			// let offX=pixX-this.x;
			// let offY=pixY-this.y;
			// let angle=Math.atan2(offY,offX);
			// let dis=20;
			// offX=dis*Math.cos(angle);
			// offY=dis*Math.sin(angle);
			this._lvbm.bindData="cancomposeing";
			// egret.Tween.get(this._lvbm,{loop:true}).to({x:offX,y:offY},500).to({x:lvbmPos.x,y:lvbmPos.y},500);
		}
	}

	public hideComposeStatus():void
	{
		// if(!this._isUpgradePlaying)
		// {
			if(this._lvbm.bindData!="updateing")
			{
				egret.Tween.removeTweens(this._lvbm);
				this._lvbm.setScale(1);
				let lvbmPos=this.getLvBmInitPos();
				let initX=lvbmPos.x;
				let initY=lvbmPos.y;
				this._lvbm.setPosition(initX, initY);
			}
		// }
		// egret.Tween.removeTweens(this._shadow);
		// egret.Tween.removeTweens(this._lvbm);
		// this.setScale(1);

		// let shadowInitPos=this.getShadowInitPos();
		// this._shadow.setPosition(shadowInitPos.x,shadowInitPos.y);
		// this._lv.setPosition(0,0);

		this.clearMoveStatus();
	}

	private _selectPos:{x:number,y:number};
	/**
	 * 设置选中状态显示
	 */
	public setSelected():void
	{
		this.stopAutoMove();
		let container=ComposeSelect.getInstant();
		container.setText(String(this._data.lv));
		if(container.parent&&container.parent.hashCode!=this.hashCode)
		{
			let item=<ComposeItem>container.parent;
			if(item)
			{
				item.removeSelected(true);
			}
		}
		if(!this.contains(container))
		{
			let bm2 = <BaseLoadBitmap>this.getChildByName("bm2")
			if(!bm2)
			{
				let lvbmPos = this.getLvBmInitPos();
				let initX=lvbmPos.x;
				let initY=lvbmPos.y;
				egret.Tween.get(this._lvbm).to({x:initX,y:initY-10},100).to({x:initX,y:initY},100).call(()=>{
					this._lvbm.setScale(1);
					egret.Tween.removeTweens(this._lvbm);
				},this);
			}

			let cellIdx=this.getChildIndex(this._cell);
			container.alpha=0;
			container.show(()=>{
				this.showCell();
			},this);
			this.addChildAt(container,cellIdx+1);
		}
		if(ComposeStatus.status==ComposeEnums.NONE)
		{
			ComposeStatus.status=ComposeEnums.ITEM;
			// let thsIdx=this.parent.getChildIndex(this);
			// this._zIndex=thsIdx;
			// let maxIdx=this.parent.numChildren-1;
			// if(thsIdx<maxIdx)
			// {
			// 	this.parent.setChildIndex(this,maxIdx);
			// }
		}
		ComposeStatus.curSelectPos={x:this._data.x,y:this._data.y};
		this._selectPos={x:this.x,y:this.y};
	}
	public removeSelected(noTween?:boolean,showCell?:boolean):void
	{
		if(ComposeSelect.hasInstant())
		{
			let container=ComposeSelect.getInstant();
			if(container&&this.contains(container))
			{
				container.hide(()=>{
					if(!showCell)
					{
						this.hideCell();
					}
				},this,noTween);
			}
			this._selectPos=null;
		}
	}

	private checkMoveStatus():void
	{
		let container=ComposeSelect.getInstant();
		if(container&&this.contains(container))
		{
			container.hideDelPs(true);
		}
	}

	public showDelPs():void
	{
		let container=ComposeSelect.getInstant();
		if(container&&this.contains(container))
		{
			
		}
	}

	public hideDelPs():void
	{
		let container=ComposeSelect.getInstant();
		if(container&&this.contains(container))
		{
			
		}
	}

	private clearStatue(): void
	{
		if(ComposeStatus.status==ComposeEnums.ITEM)
		{
			ComposeStatus.status=ComposeEnums.NONE;
		}
	}

	public resetPos():void 
	{
		// let {x,y} = ComposeStatus.curStopPos;
		// let{pixX,pixY}=ComposeStatus.getPixPosByCellPos(this._data.x,this._data.y);
		// if(x==this._data.x&&y==this._data.y)
		// {
		// 	if(this.x!=pixX||this.y!=pixY)
		// 	{
		// 		egret.Tween.get(this).to({x:pixX,y:pixY},100).call(()=>{
		// 			egret.Tween.removeTweens(this);
		// 		},this);
		// 	}
		// }
		// else
		// {
		// 	this.setPosition(pixX,pixY);
		// }
		let{pixX,pixY}=Api.composemapVoApi.checkAutoSelect()?ComposeStatus.getPixPosByCellPos(this._data.x,this._data.y):ComposeStatus.checkBound(this.x,this.y);
		this.x=pixX;
		this.y=pixY;
		this.clearMoveStatus();
		this.hideCell();
		if(this.parent)
		{
			this.parent.setChildIndex(this,this._zIndex);
		}
	}

	public checkHit(x:number,y:number):boolean
	{
		let touchcell = this.getChildByName("touchcell");
		let result=touchcell.hitTestPoint(x,y-touchcell.y*2+GameData.layerPosY,false);
		// if(result)
		// {
		// 	this.alpha=0.7;
		// }
		return result;
	}

	public move(x:number,y:number,completeCall:Function,completeCallThisObj:any):void
	{
		// let {pixX,pixY} = ComposeStatus.getPixPosByCellPos(x,y);
		let movet = 200;//Math.sqrt((x-this._data.x)*(x-this._data.x)+(y-this._data.y)*(y-this._data.y))*100;

		this.stopAutoMove();
		egret.Tween.get(this).to({x:x,y:y},movet).call(()=>{
			egret.Tween.removeTweens(this);
			if(completeCall)
			{
				completeCall.apply(completeCallThisObj);
			}
		},this);
	}

	public hideForCompose():void
	{
		egret.Tween.get(this).to({alpha:0},300).call(()=>{
			egret.Tween.removeTweens(this);
		},this);
	}

	public showForCompose():void
	{
		egret.Tween.removeTweens(this);
		this.alpha=1;
	}

	public delete():void
	{
		egret.Tween.get(this).to({scaleX:0.1,scaleY:0.1,alpha:0.1},200).call(()=>{
			this.dispose();
		},this);;
	}

	public dispose()
	{
		if(this._waitMoveCount>-1)
		{
			egret.clearTimeout(this._waitMoveCount);
			this._waitMoveCount=-1;
		}
		this.removeSelected();
		this._cell=null;
		this._data=null;
		this._cellRect=null;
		this._isautoMoving=false;
		// this._lvT=null;
		// this._lv=null;
		// this._isComposeing = false;
		super.dispose();
	}
}