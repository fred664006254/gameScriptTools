/**
 *帮会任务buff
 * author yanyuling
 * date 2018/07/20
 * @class AllianceTaskBatchResultPopupView

 */
class AllianceTaskBatchResultPopupView extends PopupView
{
	private _containerTab = [];
	private _scrollView:ScrollView = null;
	private _tmpNode:BaseDisplayObjectContainer;
	private _confirmBtn2:BaseButton;
	public constructor() 
	{
		super();
	}

	public initView():void
	{
		let taskid = this.param.data.taskId;
		let attackinfo = this.param.data.attackinfo;
		
		let taskcfg = Config.AlliancetaskCfg.getAllianceTaskById(taskid);
		let bg1:BaseBitmap = BaseBitmap.create("public_tc_bg01");//("public_tc_bg01");
		bg1.width = 540;
		bg1.height = 540;
		bg1.x = this.viewBg.width/2 - bg1.width/2;
		bg1.y =  10;
		this.addChildToContainer(bg1);

		let bg2:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		bg2.width = bg1.width -20;
		bg2.height = bg1.height - 20;
		bg2.x =  bg1.x + 10;
		bg2.y = bg1.y + 10;
		this.addChildToContainer(bg2);

		let txtLists = [];
		let tmpNode = new  BaseDisplayObjectContainer();
		this._tmpNode = tmpNode;

		let tname = LanguageManager.getlocal( "allianceTaskName" + taskid ) ; 
		let startY = 20;
		for (let sid in attackinfo) {
			var element = attackinfo[sid];
			let txt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
			txt2.width = bg1.width - 40;
			txt2.multiline = true;
			txt2.lineSpacing = 5;
			txt2.textAlign = egret.HorizontalAlign.LEFT;
			let sername = LanguageManager.getlocal("servant_name" + sid);
			txt2.text = LanguageManager.getlocal("alliancetaskbatch_restxt1",[sername,tname,element.atkV,element.rewards ]);
			txt2.x = 20;
			txt2.y = startY;//20 + (txt2.height + 25) * index;
			startY = startY + txt2.height + 25;
			
			this._containerTab.push(txt2);
		}

		let txt3 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		// txt3.width = bg1.width;
		// txt3.multiline = true;
		// txt3.lineSpacing = 5;
		// txt3.textAlign = egret.HorizontalAlign.LEFT;
		let rewards = this.param.data.rewards;
		let rewardsNum = rewards.split("_")[2];
		txt3.text = LanguageManager.getlocal("alliancetaskbatch_restxt2",[this.param.data.atkv,rewardsNum ]);
		txt3.x = bg1.width/2 - txt3.width/2;
		txt3.y = startY+20;
		startY = startY + txt3.height + 40;
		this._containerTab.push(txt3);
		
		let rect = new egret.Rectangle(0,0,bg2.width,bg2.height-20);
		let scrolV = ComponentManager.getScrollView(tmpNode,rect);
		scrolV.x = bg2.x;
		scrolV.y = bg2.y + 10;
		this.addChildToContainer(scrolV);
		this._scrollView = scrolV;

		let confirmBtn =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"confirmBtn",this.hide,this);
		confirmBtn.x = this.viewBg.x + this.viewBg.width/2 - confirmBtn.width/2;
		confirmBtn.y =  bg1.y + bg1.height + 10 ;
		confirmBtn.alpha = 0;
		this.addChildToContainer(confirmBtn);
		this._confirmBtn2 = confirmBtn;
		this.closeBtn.alpha = 0;
		this.showContainerAnim();
	}
	
	private showContainerAnim():void
	{
		let len = this._containerTab.length ;
		if (len > 0) 
		{
			var element = <BaseTextField>this._containerTab.shift();
			element.alpha = 0;
			this._tmpNode.addChild(element);
			if(len == 1){
				this._tmpNode.height += element.height + 30;
			}
			this._scrollView.setScrollTop(this._scrollView.getMaxScrollTop(),100);
			egret.Tween.get(element).wait(500).to({alpha:1},500);
			egret.Tween.get(this._tmpNode).wait(600).call(this.showContainerAnim,this);
		}
		else 
		{
			egret.Tween.get(this._confirmBtn2,{loop:false}).wait(500).to({alpha:1},500);
			egret.Tween.get(this.closeBtn,{loop:false}).wait(500).to({alpha:1},500);
		}
	}

	protected getShowHeight():number
	{
		return 700;
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		]);
	}
	
	public dispose():void
	{
		this._containerTab = [];
		this._scrollView = null;
		this._tmpNode = null;
		this._confirmBtn2 = null;
		
		super.dispose();
	}
}