/**
 * 获得门客 红颜对话框基础类
 * author jiangliuyang
 * date 2018/4/20
 * @class DialogueGetBaseView
 */

class DialogueGetBaseView  extends BaseView
{

	// private _nodeContainer:BaseDisplayObjectContainer;

	//对话框node
	private _dialogNode: BaseDisplayObjectContainer;
	//对话框背景颜色图片
	private _dialogBlackBgImg: BaseBitmap;
	//对话框场景背景图片
	private _dialogSceneBgImg: BaseBitmap;
	//对话框文本背景图
	private _dialogDetailBgImg: BaseBitmap;
	//对话框点击继续标识
	private _continueText: BaseTextField;
	//名字背景
	private _nameBg: BaseBitmap;
	//名字文本
	private _nameText: BaseTextField;
	//对话文本
	private _descText: BaseTextField;
	//半身像所在节点
	private _mainImgNode: BaseDisplayObjectContainer;
	//对话人物id
	protected _personId:any;
	//对话人物config
	private _personCfg:any;
	//人物所有对话id
	private _dialogueIds:string[];
	//人物半身像
	private _personImg:BaseLoadBitmap;
	//我的半身像
	private _myImg:any;
	//当前对话dialogueItemCfg
	private _curDialogueItemCfg: any;
	//描述内容
	private _descContent: string;
	//当前描述长度
	private _curDescLength: number = 0;
	//描述是否完毕  描述没有结束的时候点击文字全显示， 文字描述完毕的时候进入下一步
	private _isDescOver: boolean = false;
	private _targetType: string;

    private _nextFunc:Function;
	public constructor() {
		super();
	}
	protected initTitle():void
	{

	}
	public initView():void
    {
        
    }
	public get targetType():string
	{
		return this._targetType;
	}
	public set targetType(v:string)
	{
		this._targetType = v;
	}
    public startView():void
    {
		//判断是否开启了对话框功能
		let openTalkDialog = Api.switchVoApi.checkOpenTalkDialog();
		// console.log("openTalkDialog->"+openTalkDialog);
		if (openTalkDialog) {
			this.checkHasDialogue();
		} else {
			this.doNextStep();
		}
        
    }
    public initCallbackFunc(nextFunc:Function ):void
	{
        this._nextFunc = nextFunc;
		//检测dialogue信息
		

    }

	//检测dialogue信息
	private checkHasDialogue(): void
	{
		//当前门课id
		// this._personId =  this.param.data.shift();
		//门客config
		if (this._targetType == "1"){

			this._personCfg = Config.ServantCfg.getServantItemById(this._personId);
		} else if(this._targetType == "2")
		{
			this._personCfg = Config.WifeCfg.getWifeCfgById(this._personId);
		}

		
		

		this._dialogueIds = this._personCfg.dialogIds;
		if(this._dialogueIds == null)
		{
			//原来的获得界面
			this.doNextStep();
		} else {
			this.checkDialogueLength();
		}
		
	}
	//检查dialogueIds的长度
	private checkDialogueLength(): void
	{
		if(this._dialogueIds.length == 0)
		{

			this.doNextStep();
		} else {
			if (!this._dialogNode || this._dialogNode == null){
				this.createDialogView();
			}
			this.refreshData();
		}

	}
	//创建对话框窗口
	private createDialogView(): void
	{
		
		this._dialogNode = new BaseDisplayObjectContainer();
		this._dialogNode.height = GameConfig.stageHeigth;
		this._dialogNode.width = GameConfig.stageWidth;
		this.addChildToContainer(this._dialogNode);

		this._dialogBlackBgImg = BaseBitmap.create("public_9_black");
		this._dialogBlackBgImg.height = this._dialogNode.height;
		this._dialogBlackBgImg.width = this._dialogNode.width;

		this._dialogNode.addChild(this._dialogBlackBgImg);

		//背景
		this._dialogSceneBgImg = BaseBitmap.create("");
		this._dialogNode.addChild(this._dialogSceneBgImg);

		//人像节点
		this._mainImgNode = new BaseDisplayObjectContainer();
		this._mainImgNode.height = this._dialogNode.height;
		this._mainImgNode.width = this._dialogNode.width;
		this._dialogNode.addChild(this._mainImgNode);

		//对话背景
		this._dialogDetailBgImg = BaseBitmap.create("public_9_wordbg");
		this._dialogDetailBgImg.height = 170;
		this._dialogDetailBgImg.y = this._dialogNode.height - this._dialogDetailBgImg.height;
		this._dialogNode.addChild(this._dialogDetailBgImg);
		//名字背景
		this._nameBg = BaseBitmap.create("guideNameBg");
		this._nameBg.x = 25;
		this._nameBg.y = this._dialogDetailBgImg.y-50;
		this._dialogNode.addChild(this._nameBg);

		//名字文本
		this._nameText= ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this._nameText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		this._nameText.x = this._nameBg.x + this._nameBg.width/2 - this._nameText.width/2;
		this._nameText.y = this._dialogDetailBgImg.y-42;
		this._dialogNode.addChild(this._nameText);

		this._continueText = ComponentManager.getTextField(LanguageManager.getlocal("clickContinue"),20);
		this._continueText.x = this._dialogNode.width - this._continueText.width - 50;
		this._continueText.y = this._dialogNode.height - this._continueText.height - 20;
		this._continueText.textColor = TextFieldConst.COLOR_WARN_GREEN;
		this._dialogNode.addChild(this._continueText);
		this.textAnim(this._continueText);


		this._descText= ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._descText.width = GameConfig.stageWidth - 60;
		this._descText.lineSpacing = 8;
		this._descText.setPosition(30,this._dialogDetailBgImg.y+38);
		this._dialogNode.addChild(this._descText);
		// this.refreshData();
		
	}
	private refreshData(): void 
	{
		// _curDialogueItemCfg
		let curId = this._dialogueIds.shift();
		this._curDialogueItemCfg = Config.DialogueCfg.getDialogueItemById(curId);
		this._curDialogueItemCfg.targetType = this.targetType;
		this._curDialogueItemCfg.targetId = this._personId;
		//对话框文字
		this._descContent = this._curDialogueItemCfg.dialogStr;//"水电费水电费水电费水电费水电费水电费水电费闻风丧胆水电费水电费";
		this._isDescOver = false;
		this._curDescLength = 0;

		//刷新背景图片
		this._dialogSceneBgImg.texture = ResourceManager.getRes(this._curDialogueItemCfg.bgName);

		//刷新名字
		let curNameStr = this._curDialogueItemCfg.nameStr;
		if(curNameStr == null)
		{
			this._nameBg.visible = false;
			this._nameText.text = "";
		} else {
			this._nameBg.visible = true;
			this._nameText.text = curNameStr;
			this._nameText.x = this._nameBg.x + this._nameBg.width/2 - this._nameText.width/2;
		}

		//刷新形象
		let curIcon = this._curDialogueItemCfg.icon;
		switch(curIcon)
		{
			case "0":
				if (this._personImg != null)
				{
					this._personImg.visible = false;
				}
				if (this._myImg != null)
				{
					this._myImg.visible = false;	
				}

				break;
			case "1":
				if (this._personImg != null)
				{
					this._personImg.visible = false;
				}
				if(!this._myImg ||this._myImg == null)
				{
					this._myImg = Api.playerVoApi.getMyPortrait();
					this._myImg.x = this._dialogNode.width/2 - this._myImg.width/2;
					this._myImg.y = this._dialogNode.height - this._dialogDetailBgImg.height - 467;
			
					this._mainImgNode.addChild(this._myImg);

				}
				this._myImg.visible = true;
				break;
			case "2":
				if (this._myImg != null)
				{
					this._myImg.visible = false;	
				}
				if(!this._personImg ||this._personImg == null)
				{
					this._personImg = BaseLoadBitmap.create(this._curDialogueItemCfg.fullIconStr);
					
					if(this._targetType=="1"){
						this._personImg.width = 405;
						this._personImg.height = 467;
					} else if (this._targetType == "2")
					{
						this._personImg.width = 640 * 0.7;
						this._personImg.height = 840 * 0.7;
					}

					this._personImg.x = this._dialogNode.width/2 - this._personImg.width/2;
					this._personImg.y = this._dialogNode.height - this._dialogDetailBgImg.height - this._personImg.height;
					this._mainImgNode.addChild(this._personImg);
				}
				this._personImg.visible = true;
				break;
		}


		//逐字显示描述
		egret.Tween.get(this).wait(0).call(this.textShootAnim,this);
		this.addTouchTap(this.clickPage,this);
	}
	private textShootAnim():void
	{	
		if (this._isDescOver) {
			return;
		}

		this._curDescLength +=1;
		if (this._curDescLength > this._descContent.length) {
			this._isDescOver = true;
			this._descText.text = this._descContent
		}
		else {
			this._descText.text = this._descContent.substr(0,this._curDescLength);
			egret.Tween.get(this._descText).wait(100).call(this.textShootAnim,this);
		}
	}
	private textAnim(t):void
	{
		egret.Tween.removeTweens(t);

		let oldx:number = t.x;
		let oldy:number = t.y;
		let newx:number = t.x - t.width*0.1;
		let newy:number = t.y - t.height*0.1;

		egret.Tween.get(t).to({scaleX:1.2,scaleY:1.2,x:newx,y:newy},600).to({scaleX:1,scaleY:1,x:oldx,y:oldy},600).to({scaleX:1.2,scaleY:1.2,x:newx,y:newy},600).to({scaleX:1,scaleY:1,x:oldx,y:oldy},600).call(this.textAnim,this,[t]);
	}

	private clickPage(): void
	{
		if(!this._isDescOver){
			this._isDescOver = true;
			this._descText.text = this._descContent;
		} else {

			this.checkDialogueLength()
		}


	}

	private doNextStep(){

		this.removeTouchTap();
		if(this._dialogNode != null)
		{
			this._dialogNode.visible = false;
		}
		// this.createView();
        if(this._nextFunc != null)
        {
            // this._nextFunc();
            this._nextFunc.call(this);
        }

	}



  

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"guideNameBg",
			"searchbg1",
			"homescene"
		]);
	}

	public releaseFunc():void
	{
		this._dialogNode = null;
		this._dialogBlackBgImg = null;
		this._dialogSceneBgImg = null;
		this._dialogDetailBgImg = null;
		this._continueText = null;
		this._nameBg = null;
		this._nameText = null;
		this._descText = null;
		this._mainImgNode = null;
		this._personId = null;
		this._personCfg = null;
		this._dialogueIds = null;
		this._personImg = null;
		this._myImg = null;
		this._curDialogueItemCfg = null;
		this._descContent = null;
		this._curDescLength = 0;
		this._isDescOver = false;
        this._nextFunc = null;
		this._targetType = null;
	}

	// protected getParent():egret.DisplayObjectContainer
	// {
	// 	// let viewIns = ViewController.getInstance().getView(ViewConst.COMMON.PLAYERVIEW);
	// 	// if (viewIns && viewIns.isShow())
	// 	// {
	// 		// return PlayerBottomUI.getInstance().getParent();
	// 		return LayerManager.maskLayer
	// 	// }else{
	// 	// 	return super.getParent();
	// 	// }
	// }

	public dispose():void
	{
		
		this.releaseFunc();

		

		super.dispose();
	}
}