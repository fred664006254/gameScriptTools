/**
 * author:xz
 * desc:跨服权势--点兵遣将
*/
class AcCrossPowerDbPopupView extends PopupView
{
	private _txt:BaseTextField = null;
	private _btn1:BaseBitmap = null;
	private _btn2:BaseBitmap = null;
	private _btn3:BaseBitmap = null;
	private _img1:BaseBitmap = null;
	private _img2:BaseBitmap = null;
	private _img3:BaseBitmap = null;

	public constructor() {
		super();
	}

	protected getTitleStr():string
	{
		return "acCrossServerPowerDbTitle";
	}
	private get api() : CrossPowerVoApi{
        return Api.crossPowerVoApi;
    }
	
	private get cfg() : Config.AcCfg.CrossServerPowerCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcCrossServerPowerVo{
        return <AcCrossServerPowerVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

	private get code() : string{
        return this.param.data.code;
	}
	
	protected getUiCode():string
	{
		let code = `1`;
		switch(Number(this.code)){
			default:
				code = `1`;
				if (this.vo.checkIsFengyun()){
					code = `7`;
				}
				break;
		}
		return code;
	}

	protected initView():void
	{
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);

		let typeBg:BaseBitmap = BaseBitmap.create("crosspower_numbg");
		typeBg.width = 500;
		typeBg.setPosition(this.viewBg.width/2-typeBg.width/2, 10);
		this.addChildToContainer(typeBg);

		let bg:BaseBitmap = BaseBitmap.create("crosspower_dbbg");
		bg.setPosition(this.viewBg.width/2-bg.width/2, typeBg.y+typeBg.height+10);
		this.addChildToContainer(bg);

		let txt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerPowerDbAcTxt1",["111"]), TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
		txt.setPosition(typeBg.x+typeBg.width/2-txt.width/2,typeBg.y+typeBg.height/2-txt.height/2);
		this.addChildToContainer(txt);
		this._txt = txt;

		let btn1bg:BaseBitmap = BaseBitmap.create("crosspower_addbtn1");
		btn1bg.setPosition(bg.x+95,bg.y+240);
		this.addChildToContainer(btn1bg);

		let btn2bg:BaseBitmap = BaseBitmap.create("crosspower_addbtn2");
		btn2bg.setPosition(bg.x+47,bg.y+210);
		this.addChildToContainer(btn2bg);

		let btn3bg:BaseBitmap = BaseBitmap.create("crosspower_addbtn3");
		btn3bg.setPosition(bg.x+419,bg.y+467);
		this.addChildToContainer(btn3bg);

		let btn4bg:BaseBitmap = BaseBitmap.create("crosspower_addbtn4");
		btn4bg.setPosition(bg.x+10,bg.y+530);
		this.addChildToContainer(btn4bg);							
		
		let btn1:BaseBitmap = BaseBitmap.create("crosspower_addbtnmask1");
		btn1.setScale(4);
		btn1.alpha = 0;
		btn1.addTouch((e:egret.TouchEvent)=>
		{
			let target = e.currentTarget;
			if(e.type == egret.TouchEvent.TOUCH_BEGIN)
			{
				target.alpha = 0.5;
			}else if(e.type == egret.TouchEvent.TOUCH_END || e.type == egret.TouchEvent.TOUCH_CANCEL || e.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE)
			{
				target.alpha = 0;
			}
		},this);
		btn1.addTouchTap((e:egret.TouchEvent)=>
		{
			ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSPOWERDBSUB1POPUPVIEW,{
				aid : this.param.data.aid,
				code : this.param.data.code,
				uiCode : this.param.data.getUiCode,
				index:1
			});
		},this);
		btn1.setPosition(bg.x+145,bg.y+250);
		this.addChildToContainer(btn1);
		this._btn1 = btn1;

		let img1 = BaseBitmap.create("crosspower_dbtxt1");
		img1.setPosition(btn1.x+btn1.width*btn1.scaleX/2-img1.width/2,btn1.y+btn1.height*btn1.scaleY-img1.height/2);
		this.addChildToContainer(img1);
		this._img1 = img1;

		let btn2:BaseBitmap = BaseBitmap.create("crosspower_addbtnmask2");
		btn2.setScale(4);
		btn2.alpha = 0;
		btn2.addTouch((e:egret.TouchEvent)=>
		{
			let target = e.currentTarget;
			if(e.type == egret.TouchEvent.TOUCH_BEGIN)
			{
				target.alpha = 0.5;
			}else if(e.type == egret.TouchEvent.TOUCH_END || e.type == egret.TouchEvent.TOUCH_CANCEL || e.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE)
			{
				target.alpha = 0;
			}
		},this);
		btn2.addTouchTap((e:egret.TouchEvent)=>
		{
			ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSPOWERDBSUB1POPUPVIEW,{
				aid : this.param.data.aid,
				code : this.param.data.code,
				uiCode : this.param.data.getUiCode,
				index:2
			});
		},this);
		btn2.setPosition(bg.x+87,bg.y+210);
		this.addChildToContainer(btn2);
		this._btn2 = btn2;

		let img2 = BaseBitmap.create("crosspower_dbtxt2");
		img2.setPosition(btn2.x+btn2.width*btn2.scaleX/2-img2.width/2,btn2.y+btn2.height*btn2.scaleY-img2.height/2);
		this.addChildToContainer(img2);	
		this._img2 = img2;

		let btn3:BaseBitmap = BaseBitmap.create("crosspower_addbtnmask3");
		btn3.setScale(4);
		btn3.alpha = 0;
		btn3.addTouch((e:egret.TouchEvent)=>
		{
			let target = e.currentTarget;
			if(e.type == egret.TouchEvent.TOUCH_BEGIN)
			{
				target.alpha = 0.5;
			}else if(e.type == egret.TouchEvent.TOUCH_END || e.type == egret.TouchEvent.TOUCH_CANCEL || e.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE)
			{
				target.alpha = 0;
			}
		},this);
		btn3.addTouchTap((e:egret.TouchEvent)=>
		{
			ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSPOWERDBSUB1POPUPVIEW,{
				aid : this.param.data.aid,
				code : this.param.data.code,
				uiCode : this.param.data.getUiCode,
				index:3
			});
		},this);
		btn3.setPosition(bg.x+419,bg.y+467);
		this.addChildToContainer(btn3);
		this._btn3 = btn3;

		let img3 = BaseBitmap.create("crosspower_dbtxt3");
		img3.setPosition(btn3.x+btn3.width*btn3.scaleX/2-img3.width/2-15,btn3.y+btn3.height*btn3.scaleY-img3.height+10);
		this.addChildToContainer(img3);	
		this._img3 = img3;

		let btn4:BaseBitmap = BaseBitmap.create("crosspower_addbtnmask4");
		btn4.setScale(4);
		btn4.alpha = 0;
		btn4.addTouch((e:egret.TouchEvent)=>
		{
			let target = e.currentTarget;
			if(e.type == egret.TouchEvent.TOUCH_BEGIN)
			{
				target.alpha = 0.5;
			}else if(e.type == egret.TouchEvent.TOUCH_END || e.type == egret.TouchEvent.TOUCH_CANCEL || e.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE)
			{
				target.alpha = 0;
			}
		},this);
		btn4.addTouchTap((e:egret.TouchEvent)=>
		{
			ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSPOWERDBSUB2POPUPVIEW,{
				aid : this.param.data.aid,
				code : this.param.data.code,
				uiCode : this.param.data.getUiCode,
			});
		},this);
		btn4.setPosition(bg.x+15,bg.y+530);
		this.addChildToContainer(btn4);

		let img4 = BaseBitmap.create("crosspower_dbtxt4");
		img4.setPosition(bg.x+2,btn4.y+btn4.height*btn4.scaleY-img4.height+10);
		this.addChildToContainer(img4);			

		this.refreshView();			
	}

	private refreshView():void
	{
		let count = 0;
		for(let i = 1; i <= 3; i++)
		{
			let obj = this.vo.getDbProcessObjByNum(i,true);
			if(obj)
			{
				count += obj["buffValue"];
			}
		}

		let num = parseFloat((count*100).toFixed(2));
		this._txt.text = LanguageManager.getlocal("acCrossServerPowerDbAcTxt1",[num+""]);

		if(this.vo.showDbDotByNum(1))
		{
			let red = <BaseBitmap>this.container.getChildByName("reddot1");
			if(red)
			{
				red.visible = true;
			}else
			{
				let reddot:BaseBitmap = BaseBitmap.create("public_dot2");
				reddot.name = "reddot1";
				this.addChildToContainer(reddot);
				reddot.setPosition(this._img1.x+this._img1.width-10,this._img1.y);
			}
		}else
		{
			let red = <BaseBitmap>this.container.getChildByName("reddot1");
			if(red)
			{
				red.visible = false;
			}
		}
		if(this.vo.showDbDotByNum(2))
		{
			let red = <BaseBitmap>this.container.getChildByName("reddot2");
			if(red)
			{
				red.visible = true;
			}else
			{
				let reddot:BaseBitmap = BaseBitmap.create("public_dot2");
				reddot.name = "reddot2";
				this.addChildToContainer(reddot);
				reddot.setPosition(this._img2.x+this._img2.width-10,this._img2.y);
			}
		}else
		{
			let red = <BaseBitmap>this.container.getChildByName("reddot2");
			if(red)
			{
				red.visible = false;
			}
		}
		if(this.vo.showDbDotByNum(3))
		{
			let red = <BaseBitmap>this.container.getChildByName("reddot3");
			if(red)
			{
				red.visible = true;
			}else
			{
				let reddot:BaseBitmap = BaseBitmap.create("public_dot2");
				reddot.name = "reddot3";
				this.addChildToContainer(reddot);
				reddot.setPosition(this._img3.x+this._img3.width-10,this._img3.y);
			}
		}else
		{
			let red = <BaseBitmap>this.container.getChildByName("reddot3");
			if(red)
			{
				red.visible = false;
			}
		}				
	}


	protected getBgExtraHeight():number
	{
		return 20;
	}

	public dispose():void
	{
		super.dispose();
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this); 
		this._txt = null;
		this._btn1 = null
		this._btn2 = null;
		this._btn3 = null;
		this._img1 = null;
		this._img2 = null;
		this._img3 = null;
	}
}