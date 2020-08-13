/**
 * 一键公务面板 
 */
class AffairViewChoicePopupView  extends PopupView
{
	private _useCallback:Function;
	private _handler:any;
	private _useNum:number = 1;
	private _selectedNumTF:BaseTextField;
	private _maxNumTF:BaseTextField;
	private _maxNum:number = 0;
	private _numBg:BaseBitmap;

	private _goldCheckBox:CheckBox;
	private _dragProgressBar:DragProgressBar =null;
	private _checkFlag:BaseBitmap;
	private _checkFlagArray:Array<CheckBox>=[];
	private _bg:BaseBitmap = null;

	private _checkTypeNum:number =1;
	private _typeDes:BaseTextField =null;
	private _itemNum:number =0; 
	private _selectionTxt:BaseTextField =null;
	private _bg1:BaseBitmap =null;

	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		let itemId:number = this.param.data.itemId
		let itemInfoVo:ItemInfoVo = Api.itemVoApi.getItemInfoVoById(itemId);
		this._useCallback = this.param.data.callback;
		this._handler = this.param.data.handler; 
		let itemNum = 0;
		if(itemInfoVo&&itemInfoVo.num)
		{
			itemNum =  itemInfoVo.num;
			this._itemNum = itemNum;
		}

		this._maxNum = 	Api.manageVoApi.getCurAffairNums();//+ itemNum;
	 	if(this._maxNum >100)
		{
			this._maxNum = 100;
		}

		let bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		bg.width = 530;
		bg.height = 320;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this.addChildToContainer(bg);
		this._bg =bg;

		let bg2:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		bg2.width = 510;
		bg2.height = 134;
		bg2.x = this.viewBg.x + this.viewBg.width/2 - bg2.width/2;
		bg2.y = 180;
		this.addChildToContainer(bg2);

		let temX = 35;
		let temY = 50;
		let temW = 100;
		let temH = 120; 

		//优先选择奖励文字
		let firstTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("affairfirst"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		// this.setLayoutPosition(LayoutConst.horizontalCentertop,firstTF,bg,[0,11]);
		firstTF.x = bg2.x+30;
		firstTF.y = bg2.y+10;
		this.addChildToContainer(firstTF);
		

		// let bg1:BaseBitmap = BaseBitmap.create("public_9_bg1");
		// bg1.width = 510;
		// bg1.height = temH;
		// bg1.x = 30;
		// bg1.y = temY;
		// this._bg1 =bg1;
		// this.addChildToContainer(bg1);
	

		this.showType(); 

		let dragProgressBar:DragProgressBar = ComponentManager.getDragProgressBar("progress4tc_01","progress4tc_02",this._maxNum,this.dragCallback,this,null,null,240);
		dragProgressBar.x = bg.x + 95;
		dragProgressBar.y = bg.y + 30;
		this.addChildToContainer(dragProgressBar); 
		this._dragProgressBar = dragProgressBar;
		

		let selectBox:CheckBox=ComponentManager.getCheckBox();
		selectBox.setPosition(100,dragProgressBar.y+45);
		this.addChildToContainer(selectBox); 
		this._goldCheckBox=selectBox;
		this._goldCheckBox.addTouch(this.onClick,this);

		//type描述
		let typeDes:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("affairTypeDes1",[0+"",itemNum+""]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		typeDes.x = selectBox.x+selectBox.width+5;
		typeDes.y = dragProgressBar.y+50;
		this._typeDes = typeDes;
		this.addChildToContainer(typeDes);
	
		//type描述
		let typeDes2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("affairTypeDes2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		typeDes2.x = typeDes.x;
		typeDes2.y = typeDes.y+typeDes.height+ 9;
		this.addChildToContainer(typeDes2);

		if(this._selectionTxt.y + this._selectionTxt.height >= bg.y+bg.height-20)
		{

			bg.height = this._selectionTxt.y + this._selectionTxt.height+15;
			bg2.height = bg.height - 180;
		}


		this._numBg = BaseBitmap.create("public_9_bg5");
		this._numBg.width = 100;
		this._numBg.x = bg.x + bg.width - 10 - this._numBg.width;
		this._numBg.y = bg.y + 20;
		this.addChildToContainer(this._numBg);

		

		this._selectedNumTF = ComponentManager.getTextField(this._useNum + "",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._selectedNumTF.textAlign = TextFieldConst.ALIGH_LEFT;
		this._selectedNumTF.setColor(TextFieldConst.COLOR_WARN_YELLOW);
		
		this._selectedNumTF.y = this._numBg.y + this._numBg.height/2 - this._selectedNumTF.height/2;
		this.addChildToContainer(this._selectedNumTF);

		this._maxNumTF = ComponentManager.getTextField("/" + this._maxNum.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._maxNumTF.textAlign = TextFieldConst.ALIGH_RIGHT; 
		this._maxNumTF.y = this._numBg.y + this._numBg.height/2 - this._maxNumTF.height/2;
		this.addChildToContainer(this._maxNumTF);

		let numTFW:number = this._selectedNumTF.width + this._maxNumTF.width; 
		this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW)/2;
		this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;

		let useBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"affairViewTitle",this.useHandler,this);
		useBtn.x = bg.x + bg.width/2 - useBtn.width/2;
		useBtn.y = bg.y + bg.height + 15;
		useBtn.setColor(TextFieldConst.COLOR_BROWN);
		this.addChildToContainer(useBtn); 
		this._dragProgressBar.setDragPercent(this._maxNum,this._maxNum);

	}
	 
	private showType():void
	{
		let posXArr:Array<number> =[97,248,399];
		this._checkFlagArray =[];
		for(var i:number =1; i<4; i++)
		{
			//勾选底
			// let probg = BaseBitmap.create("public_dot3");
			// probg.x =posXArr[i-1];
			// probg.y = 68;
			// this.addChildToContainer(probg);

			// //勾选状态
			// this._checkFlag = BaseBitmap.create("public_dot4");
			// this._checkFlag.x = probg.x;
			// this._checkFlag.y = probg.y;
			// this.addChildToContainer(this._checkFlag); 

			let selectBox:CheckBox=ComponentManager.getCheckBox(null,true);
			selectBox.setPosition(posXArr[i-1],215);
			this.addChildToContainer(selectBox); 
			
			if(i==1)
			{
				selectBox.setSelected(true);
			} 
			this._checkTypeNum =1;
			// this._checkFlag.addTouchTap(this.changeCheckFlagStatus,this);
			selectBox.addTouch(this.changeCheckFlagStatus,this);
			this._checkFlagArray.push(selectBox);
		
			//类型名字
			let typeName:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("affairReward"+i),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
			typeName.x =posXArr[i-1]+selectBox.width+5;
			typeName.y = selectBox.y+8;
			this.addChildToContainer(typeName);
		}  

		//选择描述
       	this._selectionTxt= ComponentManager.getTextField(LanguageManager.getlocal("selectionDes"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK); 
		this._selectionTxt.width =460;
		this._selectionTxt.x =80;
		this._selectionTxt.y =260;
		this.addChildToContainer(this._selectionTxt);   
	}

	protected changeCheckFlagStatus(e:egret.TouchEvent):void
	{	
		let currIndex =  this._checkFlagArray.indexOf(e.currentTarget); 
		if(this._checkTypeNum == currIndex+1 || !this._checkFlagArray[currIndex])
		{
			return;
		}
		// for(let i:number =0;i<this._checkFlagArray.length; i++)
		// {
		  	this._checkFlagArray[this._checkTypeNum-1].setSelected(false);
		// }
		this._checkFlagArray[currIndex].setSelected(true);
		this._checkTypeNum = currIndex+1;  
		// egret.log(this._checkTypeNum+"this._checkTypeNum"+currIndex);
	}
 
	private dragCallback(curNum:number):void
	{  
		if(curNum<=1)
		{
			curNum=1;
		}
		this._useNum = curNum;
		this._selectedNumTF.text = this._useNum + "/";
		let numTFW:number = this._selectedNumTF.width + this._maxNumTF.width;
		this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW)/2;
		this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;
		this._maxNumTF.text = this._maxNum+""; 

		if(this._goldCheckBox.checkSelected()==true)
		{
			var num =0;
			if(this._itemNum>=100)
			{
				num =  100-(this._maxNum - this._useNum);
			}
			else
			{
				num =  this._itemNum-(this._maxNum - this._useNum);
			}
			let newNum =num-Api.manageVoApi.getCurAffairNums();
			if(newNum>0)
			{
				this._typeDes.text =LanguageManager.getlocal("affairTypeDes1",[(newNum)+"",this._itemNum+""]);
			}
			else
			{
				this._typeDes.text =LanguageManager.getlocal("affairTypeDes1",[(0)+"",this._itemNum+""]);
			}
		}	  
	}

	private onClick():void
	{ 
		//未勾选状态下
		if(this._goldCheckBox.checkSelected()==true)
		{	
			let currNum = Api.manageVoApi.getCurAffairNums();
			this._maxNum = currNum;
			this._dragProgressBar.setDragPercent(currNum,this._maxNum);
			this._typeDes.text =LanguageManager.getlocal("affairTypeDes1",[(0)+"",this._itemNum+""]);
		}
		else
		{
			let num = Api.manageVoApi.getCurAffairNums();
			this._maxNum =  num+this._itemNum;
			if(this._maxNum>100)
			{
				var newNum:number =(100-num);
				this._typeDes.text =LanguageManager.getlocal("affairTypeDes1",[newNum+"",this._itemNum+""]);
			}
			else
			{
				this._typeDes.text =LanguageManager.getlocal("affairTypeDes1",[this._itemNum+"",this._itemNum+""]);
			} 

			if(this._maxNum>100)
			{
				this._maxNum =100;
			}
			this._dragProgressBar.setDragPercent(this._maxNum,this._maxNum);
		}
		let numTFW:number = this._selectedNumTF.width + this._maxNumTF.width; 
		this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW)/2;
		this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;
	}

	private useHandler(param:any):void
	{
		let data:any ={};
		if(this._useNum - Api.manageVoApi.getCurAffairNums()>=0)
		{
			data.useitemnum = this._useNum - Api.manageVoApi.getCurAffairNums();
		}
		else
		{
			data.useitemnum =  0;
		} 
		data.totalnum = this._useNum;
		data.opt = this._checkTypeNum;

		this._useCallback.apply(this._handler,[data,this.param.data.itemId]);
		this.hide();
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
				"progress2_bg","progress2",
				"progress4tc_01","progress4tc_02"
		]);
	}
	private clearcheckFlagArray():void
	{
		if(this._checkFlagArray&&this._checkFlagArray.length>0)
		{
			for(var i:number =0;i<this._checkFlagArray.length;i++)
			{
				let currBitmap=this._checkFlagArray[i];
				if(currBitmap&&currBitmap.parent)
				{
					currBitmap.parent.removeChild(currBitmap);
					currBitmap.dispose();
				} 
			}
		}
	}

	public dispose():void
	{	
		this.clearcheckFlagArray();
		this._bg =null;
		this._checkTypeNum=1;
		this._handler=null;
		this._useCallback=null;
		this._useNum = 1;
		this._selectedNumTF =null;
		this._maxNumTF=null;
		this._maxNum =0;
		this._numBg =null;
		this._goldCheckBox =null;
		this._dragProgressBar=null;
		this._checkFlag =null;
		this._checkFlagArray =[];
		this._typeDes =null;
		this._itemNum =0; 
		this._bg1 =null;
	
		super.dispose();
	}
}